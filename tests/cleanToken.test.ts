typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import {
  printRevocationInstructions,
  rotateToken,
  scrubGitHistory,
  addGitEnvToGitignore,
  main,
} from '../cleanToken';
import { createLogger, Logger } from '../logger'; // assumed logger module

jest.mock('child_process');
jest.mock('../logger');

// ---------------------------------------------------------------------------
// Types and helpers
// ---------------------------------------------------------------------------
type ExecCallback = (error: Error | null, stdout: string, stderr: string) => void;
type ExecOptions = Record<string, unknown>;
type ExecImplementation = (command: string, options: ExecOptions, callback: ExecCallback) => object;

const mockedExec = jest.mocked(exec) as jest.Mock<ExecImplementation>;
const mockedLogger = jest.mocked(createLogger);

const DEFAULT_NOTE = 'rotated-token';
const MOCK_TOKEN = 'ghp_generated_abc123';

/**
 * Simulates a successful exec callback.
 * @param stdout - simulated stdout
 * @param stderr - optional stderr (default '')
 */
function mockExecSuccess(stdout: string, stderr: string = ''): void {
  mockedExec.mockImplementation(
    (_cmd: string, _opts: ExecOptions, cb: ExecCallback): object => {
      cb(null, stdout, stderr);
      return {} as ReturnType<typeof exec>;
    },
  );
}

/**
 * Simulates a failed exec callback.
 * @param errorMsg - error message for the Error object
 */
function mockExecError(errorMsg: string): void {
  mockedExec.mockImplementation(
    (_cmd: string, _opts: ExecOptions, cb: ExecCallback): object => {
      cb(new Error(errorMsg), '', '');
      return {} as ReturnType<typeof exec>;
    },
  );
}

// ---------------------------------------------------------------------------
// Logger mock setup
// ---------------------------------------------------------------------------
const mockLogger: jest.Mocked<Logger> = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  (createLogger as jest.Mock).mockReturnValue(mockLogger);
});

// ===========================================================================
// cleanToken module – full test suite
// ===========================================================================
describe('cleanToken module', () => {
  // -------------------------------------------------------------------------
  // printRevocationInstructions
  // -------------------------------------------------------------------------
  describe('printRevocationInstructions', () => {
    /**
     * Validates that the function logs instructions with the correct masked suffix.
     * @param tokenInput - token passed to the function
     * @param expectedSuffix - expected displayed suffix
     */
    function assertLogsWithSuffix(tokenInput: string, expectedSuffix: string): void {
      printRevocationInstructions(tokenInput);
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining(expectedSuffix),
      );
    }

    /** @test Should display last 7 characters for a long token */
    it('should log instructions with the last 7 characters of the token', () => {
      const token = 'ghp_test123abc';
      printRevocationInstructions(token);
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Revocation instructions printed for token ending in: ...t123abc',
      );
    });

    /** @test Should handle empty string gracefully */
    it('should log empty suffix when token is empty', () => {
      assertLogsWithSuffix('', '...');
    });

    /** @test Should show full token if length is 7 or less */
    it('should show full token when length is ≤7', () => {
      assertLogsWithSuffix('short', '...short');
    });

    /** @test Should handle null token by converting to empty string */
    it('should handle null token', () => {
      printRevocationInstructions(null as unknown as string);
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('...'),
      );
    });

    /** @test Should handle undefined token by converting to empty string */
    it('should handle undefined token', () => {
      printRevocationInstructions(undefined as unknown as string);
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('...'),
      );
    });

    /** @test Should not log if logger is not available */
    it('should not throw when logger.info is undefined', () => {
      const backup = mockLogger.info;
      mockLogger.info = undefined as unknown as jest.Mock;
      expect(() => printRevocationInstructions('any')).not.toThrow();
      mockLogger.info = backup;
    });
  });

  // -------------------------------------------------------------------------
  // rotateToken
  // -------------------------------------------------------------------------
  describe('rotateToken', () => {
    /** @test Should call `gh` with correct arguments and return new token */
    it('should construct correct command and return the token', async () => {
      mockExecSuccess(MOCK_TOKEN);
      const result = await rotateToken(DEFAULT_NOTE);
      expect(mockedExec).toHaveBeenCalledWith(
        `gh auth token create --scopes repo --note "${DEFAULT_NOTE}"`,
        expect.any(Object),
        expect.any(Function),
      );
      expect(result).toBe(MOCK_TOKEN);
    });

    /** @test Should throw when `gh` command fails */
    it('should throw when token creation fails', async () => {
      mockExecError('create failed');
      await expect(rotateToken(DEFAULT_NOTE)).rejects.toThrow('create failed');
    });

    /** @test Should reject empty note */
    it('should reject an empty note', async () => {
      await expect(rotateToken('')).rejects.toThrow('Note cannot be empty');
    });

    /** @test Should reject whitespace-only note */
    it('should reject a whitespace-only note', async () => {
      await expect(rotateToken('   ')).rejects.toThrow('Note cannot be empty');
    });

    /** @test Should reject null note */
    it('should reject null note', async () => {
      await expect(rotateToken(null as unknown as string)).rejects.toThrow(
        'Note cannot be empty',
      );
    });

    /** @test Should reject undefined note */
    it('should reject undefined note', async () => {
      await expect(rotateToken(undefined as unknown as string)).rejects.toThrow(
        'Note cannot be empty',
      );
    });
  });

  // -------------------------------------------------------------------------
  // scrubGitHistory
  // -------------------------------------------------------------------------
  describe('scrubGitHistory', () => {
    /** @test Should call git filter-repo with token content */
    it('should construct correct git filter-repo command', async () => {
      const token = 'ghp_remove_token';
      mockExecSuccess('');
      await scrubGitHistory(token);
      expect(mockedExec).toHaveBeenCalledWith(
        `git filter-repo --force --replace-text /dev/stdin <<< "${token}"`,
        expect.any(Object),
        expect.any(Function),
      );
    });

    /** @test Should throw on filter-repo failure */
    it('should throw when filter-repo fails', async () => {
      mockExecError('filter failed');
      await expect(scrubGitHistory('ghp_err')).rejects.toThrow('filter failed');
    });

    /** @test Should reject empty token */
    it('should reject an empty token', async () => {
      await expect(scrubGitHistory('')).rejects.toThrow(
        'Token is required for scrubbing',
      );
    });

    /** @test Should reject whitespace-only token */
    it('should reject a whitespace-only token', async () => {
      await expect(scrubGitHistory('   ')).rejects.toThrow(
        'Token is required for scrubbing',
      );
    });

    /** @test Should reject null token */
    it('should reject null token', async () => {
      await expect(scrubGitHistory(null as unknown as string)).rejects.toThrow(
        'Token is required for scrubbing',
      );
    });

    /** @test Should reject undefined token */
    it('should reject undefined token', async () => {
      await expect(
        scrubGitHistory(undefined as unknown as string),
      ).rejects.toThrow('Token is required for scrubbing');
    });
  });

  // -------------------------------------------------------------------------
  // addGitEnvToGitignore
  // -------------------------------------------------------------------------
  describe('addGitEnvToGitignore', () => {
    /** @test Should execute three git commands in sequence */
    it('should perform echo, stage, and commit', async () => {
      const execCalls: string[] = [];
      mockedExec.mockImplementation(
        (_cmd: string, _opts: ExecOptions, cb: ExecCallback): object => {
          execCalls.push(_cmd);
          cb(null, '', '');
          return {} as ReturnType<typeof exec>;
        },
      );

      await addGitEnvToGitignore();

      expect(execCalls.length).toBe(3);
      expect(execCalls[0]).toBe('echo "git.env" >> .gitignore');
      expect(execCalls[1]).toBe('git add .gitignore');
      expect(execCalls[2]).toMatch(/^git commit -m/);
    });

    /** @test Should throw if any git command fails */
    it('should throw on first command failure', async () => {
      mockExecError('file not found');
      await expect(addGitEnvToGitignore()).rejects.toThrow('file not found');
    });

    /** @test Should throw on stage failure */
    it('should throw on `git add` failure', async () => {
      let callCount = 0;
      mockedExec.mockImplementation(
        (_cmd: string, _opts: ExecOptions, cb: ExecCallback): object => {
          callCount++;
          if (callCount === 2) {
            cb(new Error('stage failed'), '', '');
          } else {
            cb(null, '', '');
          }
          return {} as ReturnType<typeof exec>;
        },
      );
      await expect(addGitEnvToGitignore()).rejects.toThrow('stage failed');
    });
  });

  // -------------------------------------------------------------------------
  // main
  // -------------------------------------------------------------------------
  describe('main', () => {
    /** @test Should call all sub-functions in order */
    it('should execute all steps and return success message', async () => {
      mockExecSuccess('ghp_main_token');
      mockExecSuccess('');
      mockExecSuccess('');

      const result = await main();

      expect(result).toBe('Token cleaned successfully');
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Starting token cleanup'),
      );
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('Token cleanup completed'),
      );
    });

    /** @test Should propagate error if rotation fails */
    it('should throw on rotation failure', async () => {
      mockExecError('rotation error');
      await expect(main()).rejects.toThrow('rotation error');
      expect(mockLogger.error).toHaveBeenCalled();
    });

    /** @test Should propagate error if scrubbing fails */
    it('should throw on scrubbing failure', async () => {
      mockExecSuccess('ghp_main_token');
      mockExecError('scrub error');
      await expect(main()).rejects.toThrow('scrub error');
    });
  });
});