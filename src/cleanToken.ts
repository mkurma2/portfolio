typescript
import { exec, execSync } from "child_process";
import { promisify } from "util";
import { appendFile, readFile, access, constants } from "fs/promises";
import { existsSync } from "fs";
import { createInterface } from "readline";
import { Writable } from "stream";
import path from "path";

// ---------------------------------------------------------------------------
// Constants & Types
// ---------------------------------------------------------------------------

/** Numeric exit codes */
enum ExitCode {
  Success = 0,
  Error = 1,
  InvalidInput = 2,
  UserAbort = 3,
}

/** Log levels in ascending severity */
const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

/** Application configuration (resolved from CLI/env) */
interface AppConfig {
  /** Path to the leaked file (default: git.env) */
  leakedFile: string;
  /** The actual leaked token string (if known) */
  leakedToken?: string;
  /** Whether to attempt automatic token revocation via GitHub API */
  autoRevoke: boolean;
  /** Whether to run in dry-run mode (no destructive actions) */
  dryRun: boolean;
}

/** Standard result for shell commands */
interface CommandResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
}

// ---------------------------------------------------------------------------
// Logger
// ---------------------------------------------------------------------------

class Logger {
  private levelIndex: number;

  constructor(level: LogLevel = "info") {
    this.levelIndex = LOG_LEVELS.indexOf(level);
  }

  private log(level: LogLevel, ...args: unknown[]): void {
    const currentIndex = LOG_LEVELS.indexOf(level);
    if (currentIndex < this.levelIndex) return;

    const prefix = `[${level.toUpperCase()}]`;
    const message = args
      .map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)))
      .join(" ");

    switch (level) {
      case "error":
        console.error(prefix, message);
        break;
      case "warn":
        console.warn(prefix, message);
        break;
      default:
        console.log(prefix, message);
    }
  }

  debug(...args: unknown[]): void {
    this.log("debug", ...args);
  }
  info(...args: unknown[]): void {
    this.log("info", ...args);
  }
  warn(...args: unknown[]): void {
    this.log("warn", ...args);
  }
  error(...args: unknown[]): void {
    this.log("error", ...args);
  }
}

const logger = new Logger(
  (process.env.LOG_LEVEL as LogLevel) ?? "info"
);

// ---------------------------------------------------------------------------
// Git helpers
// ---------------------------------------------------------------------------

const execAsync = promisify(exec);

/**
 * Execute an arbitrary command (not necessarily git) and return structured result.
 *
 * @param command - Full command string to execute.
 * @param options - Optional child_process exec options.
 * @returns Promise resolving to a CommandResult.
 */
async function runCommand(
  command: string,
  options?: { cwd?: string; timeout?: number; maxBuffer?: number }
): Promise<CommandResult> {
  logger.debug(`Executing: ${command}`);
  try {
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: options?.maxBuffer ?? 10 * 1024 * 1024,
      cwd: options?.cwd,
      timeout: options?.timeout ?? 0,
    });
    return {
      success: true,
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      exitCode: 0,
    };
  } catch (error: unknown) {
    const err = error as Error & { code?: number; stdout?: string; stderr?: string };
    return {
      success: false,
      stdout: err.stdout?.toString().trim() ?? "",
      stderr: err.stderr?.toString().trim() ?? err.message,
      exitCode: err.code ?? 1,
    };
  }
}

/**
 * Run a git subcommand with optional working directory.
 *
 * @param gitArgs - Array of git arguments (e.g., ["rev-parse", "--is-inside-work-tree"]).
 * @param cwd - Working directory (defaults to process.cwd()).
 * @returns CommandResult for the git command.
 */
async function runGit(gitArgs: string[], cwd?: string): Promise<CommandResult> {
  return runCommand(`git ${gitArgs.join(" ")}`, { cwd });
}

/**
 * Check whether the current working directory is inside a git repository.
 */
async function isGitRepo(): Promise<boolean> {
  const result = await runGit(["rev-parse", "--is-inside-work-tree"]);
  return result.success && result.stdout === "true";
}

/**
 * Check whether the working tree is clean (no uncommitted changes).
 */
async function isWorkingTreeClean(): Promise<boolean> {
  const result = await runGit(["status", "--porcelain"]);
  return result.stdout === "";
}

// ---------------------------------------------------------------------------
// Interactive confirmation
// ---------------------------------------------------------------------------

/**
 * Prompt user for a yes/no answer on stdin.
 *
 * @param question - The question to display (will be suffixed with "(y/N) ").
 * @returns `true` if user answered yes, `false` otherwise.
 */
async function confirmYesNo(question: string): Promise<boolean> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout as unknown as Writable,
  });
  return new Promise<boolean>((resolve) => {
    rl.question(`${question} (y/N) `, (answer) => {
      rl.close();
      resolve(["y", "yes"].includes(answer.toLowerCase().trim()));
    });
  });
}

// ---------------------------------------------------------------------------
// Configuration resolution
// ---------------------------------------------------------------------------

/**
 * Parse command-line arguments and environment to build AppConfig.
 *
 * @param argv - Raw command-line arguments (process.argv.slice(2)).
 * @returns Resolved AppConfig object.
 */
function resolveConfig(argv: string[]): AppConfig {
  const config: AppConfig = {
    leakedFile: "git.env",
    autoRevoke: false,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--token":
      case "-t":
        config.leakedToken = argv[++i];
        break;
      case "--file":
      case "-f":
        config.leakedFile = argv[++i];
        break;
      case "--auto-revoke":
        config.autoRevoke = true;
        break;
      case "--dry-run":
        config.dryRun = true;
        break;
      case "--help":
      case "-h":
        printUsage();
        process.exit(ExitCode.Success);
      default:
        logger.warn(`Unknown argument: ${arg}`);
    }
  }

  // Fallback: try to read token from the leaked file itself
  if (!config.leakedToken) {
    // will be read later in main()
  }

  return config;
}

/** Print CLI usage information */
function printUsage(): void {
  console.log(`
Usage: node cleanup-leaked-token.js [options]

Options:
  --token, -t <token>      The leaked GitHub personal access token (ghp_...).
  --file, -f <path>        Path to the leaked file (default: git.env).
  --auto-revoke            Attempt automatic revocation via GitHub API.
  --dry-run                Show what would be done without making changes.
  --help, -h               Show this help message.
`);
}

// ---------------------------------------------------------------------------
// Token extraction from file
// ---------------------------------------------------------------------------

/**
 * Extract a GitHub personal access token from a file.
 * Scans for pattern 'ghp_' followed by 36-40 alphanumerics.
 *
 * @param filePath - Absolute or relative path to the file.
 * @returns The first matching token, or undefined if not found.
 */
async function extractTokenFromFile(filePath: string): Promise<string | undefined> {
  try {
    await access(filePath, constants.R_OK);
  } catch {
    return undefined;
  }

  const content = await readFile(filePath, "utf-8");
  const match = content.match(/ghp_[A-Za-z0-9]{36,40}/);
  return match?.[0] ?? undefined;
}

// ---------------------------------------------------------------------------
// Step 1: Token Revocation (best-effort)
// ---------------------------------------------------------------------------

/**
 * Attempt to check the token status and instruct user on revocation.
 *
 * @param token - The leaked personal access token.
 * @returns Nothing – logs all relevant information.
 *
 * @remarks
 * Classic PATs cannot be revoked programmatically without a separate PAT
 * with 'admin:personal_access_tokens' scope (typically Enterprise/Org only).
 * We check if the token is still active via GET /user and provide instructions.
 */
async function attemptTokenRevocation(token: string): Promise<void> {
  logger.info("Checking token status via GitHub API...");

  let response: Response;
  try {
    response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "git-secret-cleaner/1.0",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error("Failed to contact GitHub API.", message);
    logger.info("Please revoke the token manually at https://github.com/settings/tokens");
    return;
  }

  if (response.status === 200) {
    const body = (await response.json()) as { login?: string };
    logger.warn(
      `Token is still active (authenticated as ${body.login ?? "unknown"}).`
    );
    logger.warn(
      "Classic PATs cannot be revoked via API without a second token with admin rights."
    );
    logger.warn("Please revoke it manually at https://github.com/settings/tokens.");
  } else if (response.status === 401 || response.status === 403) {
    logger.info("Token appears already revoked or invalid.");
  } else {
    logger.warn(
      `Unexpected API response (${response.status}). Cannot verify token status.`
    );
    logger.info("Assume token may still be active; revoke manually.");
  }
}

// ---------------------------------------------------------------------------
// Step 2: Rotation instructions
// ---------------------------------------------------------------------------

/** Print instructions for creating a new token and storing it safely. */
function showRotationInstructions(): void {
  logger.info("=== Rotate Token ===");
  logger.info("1. Generate a new personal access token at https://github.com/settings/tokens");
  logger.info("2. Grant it the minimum scopes required for your workflow.");
  logger.info("3. Store the new token ONLY in a local .env file (never commit).");
  logger.info("4. Update any CI/CD or services that used the old token.");
  logger.info("");
}

// ---------------------------------------------------------------------------
// Step 3: Scrub git history (with dry-run, user confirmation, tool detection)
// ---------------------------------------------------------------------------

/**
 * Detect whether git-filter-repo is available on PATH.
 */
async function isFilterRepoAvailable(): Promise<boolean> {
  const result = await runCommand("git filter-repo --version", { timeout: 5000 });
  return result.success;
}

/**
 * Detect whether bfg.jar is available.
 */
async function isBfgAvailable(): Promise<boolean> {
  const result = await runCommand("bfg --version", { timeout: 5000 });
  return result.success;
}

/**
 * Scrub the leaked file from git history using git-filter-repo (preferred) or BFG.
 * Asks for user confirmation before executing.
 *
 * @param filePath - The relative path of the leaked file to remove from history.
 * @param config - The application configuration (used for dryRun flag).
 * @returns `true` if scrubbing was performed, `false` if skipped or failed.
 */
async function scrubGitHistory(
  filePath: string,
  config: AppConfig
): Promise<boolean> {
  const fileInRepo = filePath; // relative to repo root

  logger.info("=== Scrub Git History ===");

  // Warn about destructive nature
  logger.warn(
    "This will rewrite git history. You will need to force-push all branches afterward."
  );
  if (config.dryRun) {
    logger.info("(Dry-run – no changes will be made)");
  }

  const confirmMessage = `Remove '${fileInRepo}' from git history?`;
  const confirmed = await confirmYesNo(confirmMessage);
  if (!confirmed) {
    logger.info("Skipping history rewrite.");
    return false;
  }

  // Detect available tool
  const useFilterRepo = await isFilterRepoAvailable();
  const useBfg = !useFilterRepo && (await isBfgAvailable());

  if (!useFilterRepo && !useBfg) {
    logger.error(
      "Neither git-filter-repo nor BFG Repo-Cleaner are installed."
    );
    logger.info(
      "Install one of them: https://github.com/newren/git-filter-repo  or  https://rtyley.github.io/bfg-repo-cleaner/"
    );
    return false;
  }

  if (config.dryRun) {
    logger.info(
      `[DRY RUN] Would run: ${
        useFilterRepo
          ? `git filter-repo --path "${fileInRepo}" --invert-paths`
          : `bfg --delete-files "${fileInRepo}"`
      }`
    );
    return true;
  }

  // Execute the rewrite
  let result: CommandResult;
  if (useFilterRepo) {
    logger.info("Using git-filter-repo...");
    result = await runCommand(
      `git filter-repo --path "${fileInRepo}" --invert-paths`
    );
  } else {
    logger.info("Using BFG Repo-Cleaner...");
    result = await runCommand(`bfg --delete-files "${fileInRepo}"`);
  }

  if (result.success) {
    logger.info("Git history rewrite completed successfully.");
    logger.info(
      "You must force-push all branches: git push origin --force --all"
    );
    return true;
  } else {
    logger.error("History rewrite failed:", result.stderr);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Additional hygiene: git rm --cached, gitignore, commit removal
// ---------------------------------------------------------------------------

/**
 * Remove the leaked file from the index (git rm --cached) if it exists.
 * Also ensure the file is added to .gitignore.
 *
 * @param filePath - Relative path to the file that should not be tracked.
 * @param config - AppConfig (includes dryRun).
 */
async function cleanLocalWorkingTree(
  filePath: string,
  config: AppConfig
): Promise<void> {
  // 1. Remove from index (if tracked)
  const fileExistsInIndexResult = await runGit(["ls-files", "--error-unmatch", filePath]);
  if (fileExistsInIndexResult.success) {
    logger.info(`Removing '${filePath}' from git index...`);
    if (!config.dryRun) {
      const rmResult = await runGit(["rm", "--cached", filePath]);
      if (!rmResult.success) {
        logger.warn("Could not remove file from index:", rmResult.stderr);
      }
    } else {
      logger.info(`[DRY RUN] git rm --cached "${filePath}"`);
    }
  } else {
    logger.debug(`'${filePath}' is not currently tracked in index.`);
  }

  // 2. Ensure .gitignore contains an entry for the file
  const gitignorePath = ".gitignore";
  let gitignoreContent = "";
  try {
    await access(gitignorePath, constants.R_OK);
    gitignoreContent = await readFile(gitignorePath, "utf-8");
  } catch {
    // .gitignore may not exist yet
  }
  if (!gitignoreContent.split("\n").some((line) => line.trim() === filePath)) {
    logger.info(`Adding '${filePath}' to .gitignore...`);
    if (!config.dryRun) {
      const entry = `\n${filePath}\n`;
      await appendFile(gitignorePath, entry, "utf-8");
      logger.info("Entry added. You should commit this change.");
    } else {
      logger.info(`[DRY RUN] Would append '${filePath}' to .gitignore`);
    }
  } else {
    logger.debug(`'${filePath}' already present in .gitignore`);
  }

  // 3. Instruct user to commit removal
  if (!config.dryRun) {
    logger.info(
      "Run: git commit -m \"Remove leaked token file and add to .gitignore\""
    );
  }
}

// ---------------------------------------------------------------------------
// Main orchestration
// ---------------------------------------------------------------------------

/**
 * Entry point: validate environment, run each step with proper error handling.
 */
async function main(): Promise<void> {
  const config = resolveConfig(process.argv.slice(2));

  logger.info("=== Leaked Git Token Cleanup Tool ===");
  if (config.dryRun) {
    logger.info("DRY-RUN MODE – no destructive actions will be taken.");
  }
  logger.info("");

  // Validate that we are in a git repository
  if (!(await isGitRepo())) {
    logger.error("Not inside a git repository. Aborting.");
    process.exit(ExitCode.Error);
  }

  // Validate file existence
  const filePath = path.resolve(config.leakedFile);
  try {
    await access(filePath, constants.R_OK);
  } catch {
    logger.error(`Cannot read file: ${config.leakedFile}. Aborting.`);
    process.exit(ExitCode.InvalidInput);
  }

  // Extract token if not provided via CLI
  let token: string | undefined = config.leakedToken;
  if (!token) {
    logger.info("No token provided via --token; scanning the leaked file...");
    token = await extractTokenFromFile(filePath);
    if (!token) {
      logger.warn(
        "Could not find a GitHub token (ghp_... pattern) in the file. Proceeding with cleanup steps anyway."
      );
    } else {
      // Mask part of the token for safe logging
      logger.info(`Found token: ${token.slice(0, 4)}...${token.slice(-4)}`);
    }
  } else {
    logger.info(`Token provided: ${token.slice(0, 4)}...${token.slice(-4)}`);
  }

  // Notify the user about the nature of the tool
  logger.info("\nThis tool will:");
  logger.info("  1) Attempt to revoke the token (if token known and --auto-revoke)");
  logger.info("  2) Show instructions for token rotation");
  logger.info("  3) Remove the file from git index & add to .gitignore");
  logger.info("  4) Optionally rewrite git history to remove the file entirely");
  logger.info("");

  // -----------------------------------------------------------------------
  // Step 1: Revocation
  // -----------------------------------------------------------------------
  if (config.autoRevoke && token) {
    await attemptTokenRevocation(token);
    logger.info("");
  } else if (token) {
    logger.info("Skipping automatic revocation (use --auto-revoke to enable).");
    showRotationInstructions();
  }

  // -----------------------------------------------------------------------
  // Step 2: Rotation instructions (always show)
  // -----------------------------------------------------------------------
  if (!config.autoRevoke || !token) {
    showRotationInstructions();
  }

  // -----------------------------------------------------------------------
  // Step 3: Clean local working tree
  // -----------------------------------------------------------------------
  await cleanLocalWorkingTree(config.leakedFile, config);
  logger.info("");

  // -----------------------------------------------------------------------
  // Step 4: Scrub history
  // -----------------------------------------------------------------------
  await scrubGitHistory(config.leakedFile, config);
  logger.info("");

  // Summary
  logger.info("=== Cleanup steps completed ===");
  if (!config.dryRun) {
    logger.info(
      "Remember to force-push rewritten history if you performed the scrub."
    );
  }
  logger.info("Stay safe.");
}

// ---------------------------------------------------------------------------
// Run with global error handling
// ---------------------------------------------------------------------------

main().catch((error: unknown) => {
  logger.error("Unexpected error:", error instanceof Error ? error.message : String(error));
  process.exit(ExitCode.Error);
});