/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Milind Kurma",
  description:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  og: {
    title: "Milind Kurma Portfolio",
    type: "website",
    url: "http://milindkurma.com/",
  },
};

//Home Page
const greeting = {
  title: "Milind Kurma",
  logo_name: "MilindKurma",
  subTitle:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  resumeLink:
    "https://drive.google.com/file/d/1ciwTOZo-7k9ya_KNQE6IFGwlUltD472I/view?usp=sharing",
  
  githubProfile: "https://github.com/mkurma2",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  // github: "https://github.com/mkurma2",
  // linkedin: "https://www.linkedin.com/in/milindkurma/",
  // gmail: "milindkurma@gmail.com",

  // facebook: "https://www.facebook.com/laymanbrother.19/",
  // twitter: "https://twitter.com/ashutosh_1919",
  // instagram: "https://www.instagram.com/layman_brother/"

  {
    name: "Github",
    link: "https://github.com/mkurma2",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/milindkurma/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  
  {
    name: "Gmail",
    link: "mailto:milindkurma@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  
  
  {
    name: "Instagram",
    link: "https://www.instagram.com/_k.milind_/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
];

const skills = {
  data: [
    {
      title: "UI/UX Design",
      fileName: "DesignImg",
      skills: [
        "⚡ Designing highly attractive user interface for mobile and web applications",
        "⚡ Customizing logo designs and building logos from scratch",
        "⚡ Creating the flow of application functionalities to optimize user experience",
      ],
      softwareSkills: [
        {
          skillName: "Adobe XD",
          fontAwesomeClassname: "simple-icons:adobexd",
          style: {
            color: "#FF2BC2",
          },
        },

        {
          skillName: "WordPress",
          fontAwesomeClassname: "simple-icons:wordpress",
          style: {
            color: "Blue",
          },
        },
        {
          skillName: "Drupal",
          fontAwesomeClassname: "simple-icons:drupal",
          style: {
            color: "Blue",
          },
        },
        {
          skillName: "Figma",
          fontAwesomeClassname: "simple-icons:figma",
          style: {
            color: "#F24E1E",
          },
        },
        {
          skillName: "Adobe Illustrator",
          fontAwesomeClassname: "simple-icons:adobeillustrator",
          style: {
            color: "#FF7C00",
          },
        },
        {
          skillName: "Inkscape",
          fontAwesomeClassname: "simple-icons:inkscape",
          style: {
            color: "#000000",
          },
        },
      ],
    },
    {
      title: "Full Stack Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building responsive website front end using React-Redux",
        "⚡ Developing mobile applications using Flutter, React, Native and solo android apps using Kotlin",
        "⚡ Creating application backend in Node, Express & Flask",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "Sass",
          fontAwesomeClassname: "simple-icons:sass",
          style: {
            color: "#CC6699",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "NPM",
          fontAwesomeClassname: "simple-icons:npm",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "Yarn",
          fontAwesomeClassname: "simple-icons:yarn",
          style: {
            color: "#2C8EBB",
          },
        },
        {
          skillName: "Gatsby",
          fontAwesomeClassname: "simple-icons:gatsby",
          style: {
            color: "#663399",
          },
        },
        {
          skillName: "Flutter",
          fontAwesomeClassname: "simple-icons:flutter",
          style: {
            color: "#02569B",
          },
        },
      ],
    },
    {
      title: "Data Science & AI",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Developing highly scalable production ready models for various deeplearning and statistical use cases",
        "⚡ Experience of working with Computer Vision and NLP projects",
        "⚡ Complex quantitative modelling for dynamic forecasting and time series analysis",
      ],
      softwareSkills: [
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "logos-tensorflow",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Keras",
          fontAwesomeClassname: "simple-icons:keras",
          style: {
            backgroundColor: "white",
            color: "#D00000",
          },
        },
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "logos-pytorch",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "Deeplearning",
          imageSrc: "deeplearning_ai_logo.png",
        },
      ],
    },
    
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Experience working on multiple cloud platforms",
        "⚡ Hosting and maintaining websites on virtual machine instances along with integration of databases",
        "⚡ Deploying deep learning models on cloud to use on mobile devices",
        "⚡ Setting up streaming jobs from DB to Server or vice-versa on GCP and AWS",
      ],
      softwareSkills: [
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: {
            color: "#0089D6",
          },
        },
        {
          skillName: "Firebase",
          fontAwesomeClassname: "simple-icons:firebase",
          style: {
            color: "#FFCA28",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: {
            color: "#326CE5",
          },
        },
      ],
    },
    
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    
  ],
};
const degrees = {
  degrees: [
    {
      title: "University of Illinois at chicago",
      subtitle: "M.S. in Computer Science",
      logo_path: "UIC_logo.png",
      alt_name: "UIC",
      duration: "2022 - 2024",
      descriptions: [
        "⚡ Skilled in UI/UX design and web development, crafting intuitive and aesthetically pleasing interfaces that enhance user engagement and provide seamless navigation across various digital platforms.",
        "⚡ Proficient in Data Science and Artificial Intelligence, utilizing advanced algorithms to analyze large datasets and develop intelligent systems that improve decision-making processes in real-world applications.",
        "⚡ Extensive experience in developing innovative computer algorithms, specializing in Graph Machine Learning and Network Science, to solve complex problems and optimize operations within diverse sectors.",
      ],
      website_link: "https://www.uic.edu/",
    },
    {
      title: "Gokaraju Rangaraju Institute of Engineering Technology",
      subtitle: "B.Tech. in Computer Science Engineering",
      logo_path: "griet_logo.png",
      alt_name: "GRIET",
      duration: "2016 - 2020",
      descriptions: [
        "⚡ I completed a comprehensive curriculum in Computer Science and Engineering, including courses in Database Systems, Java, Web Applications using HTML, CSS, JS, Data Structures, Cyber Security, Object-Oriented Programming, and Software Engineering.",
        "⚡ My studies were further enriched by advanced coursework in areas like Deep Learning, Data Science, Cloud Computing, and Full Stack Development, preparing me for diverse challenges in the tech industry.",
      ],
      website_link: "https://www.griet.ac.in/",
    },
    
  ],
};

const certifications = {
  certifications: [
    {
      title: "Microsoft Azure AI Engineer Associate",
      subtitle: "",
      logo_path: "Azure.png",
      certificate_link:
        "https://drive.google.com/file/d/1LOY6zOxBRUUsJRfo0aKvaD4wzNUGrFpw/view?usp=sharing",
      alt_name: "",
      color_code: "#8C151599",
    },
    {
      title: "Data Science for Engineers",
      subtitle: "",
      logo_path: "nptel_logo.png",
      certificate_link:
        "https://nptel.ac.in/courses/106106179",
      alt_name: "",
      color_code: "#8C151599",
    },
    {
      title: "User-centric Computing for Human-Computer Interaction",
      subtitle: "",
      logo_path: "nptel_logo.png",
      certificate_link:
        "https://onlinecourses.nptel.ac.in/noc24_cs50/preview",
      alt_name: "NPTEL",
      color_code: "#00000099",
    },
    {
      title: "Cyber Security",
      subtitle: "",
      logo_path: "verzeo.png",
      certificate_link:
        "https://www.verzeo.com/all-courses",
      alt_name: "Verzeo",
      color_code: "#0C9D5899",
    },
    
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description:
    "I'm passionately immersed in the world of web development, where the art of UI/UX design meets the thrill of front-end development! At the University of Illinois Chicago, I channel my enthusiasm into crafting engaging, user-centric digital experiences using Drupal and WordPress. Each line of code and design element is a step towards perfecting interactive platforms that not only look great but function seamlessly. For me, every project is a new canvas to innovate, engage, and excite!",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Graduate Assitant",
          company: "UIC - Patient Safety Leadership",
          company_url: "https://psl.uic.edu/",
          logo_path: "UIC_logo.png",
          duration: "March 2022 - Present",
          location: "Chicago, Illinois",
          
          description:
            "I administered and optimized WordPress and Drupal websites, significantly enhancing communication and resource sharing among faculty and program participants. My responsibilities also included overseeing website security measures such as updates, patching, backups, and performance optimizations to ensure robust and reliable digital platforms. I provided comprehensive IT support, managing both hardware and software issues, and maintained AV equipment for various seminars and conferences, ensuring seamless technological operations. Additionally, I supported the Program Director and Coordinator by maintaining website integrity, optimizing SEO, updating Blackboard content, and staying current with industry advancements to enhance the program's technology infrastructure and develop IT support protocols.",
          color: "#0879bf",
        },       
        {
          title: "Network Security Analyst",
          company: "Verzeo Pvt. Ltd.",
          company_url: "https://www.verzeo.com/",
          logo_path: "verzeo.png",
          duration: "March 2021 - August 2022",
          location: "Hyderabad, Telangana",
          description:
            "As a Cybersecurity Specialist, I enrolled devices in Defender for Endpoint to manage threat detections and incident responses, significantly enhancing security measures and compliance across the organization. I efficiently administered Azure Active Directory, optimizing system security and user management through strategic group policy management and replication. My role involved implementing robust security controls and backup solutions that align with industry standards and regulatory requirements, complemented by managing compliance using Purview. I spearheaded comprehensive penetration tests and phishing campaigns using NMAP, Metasploit, and SEToolkit to identify and mitigate vulnerabilities in over 250 devices, alongside developing security solution prototypes like Mobile-tracker-free and Ophcrack to showcase innovative product features and enforce stringent password policies.",
          color: "#fc1f20",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Network Security Intern",
          company: "Verzeo.pvt",
          company_url: "https://www.verzeo.com/",
          logo_path: "verzeo.png",
          duration: "March 2021 - June 2021",
          location: "Hyderabad, Telangana",
          description:
            "Cybersecurity Intern dedicated to safeguarding digital assets, conducting thorough risk assessments, and deploying strategic measures to preempt potential security threats. Gained hands-on experience in threat analysis and developed a keen acumen for emerging security technologies and trends.",
          color: "#000000",
        },
        
      
      ],
    },
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "President",
          company: "Street Cause - GRIET",
          company_url: "https://www.streetcause.org/",
          logo_path: "street.jpg",
          duration: "June 2017 - April 2018",
          location: "Hyderabad, Telangana",
          description:
            "As the President of Street Cause, I spearheaded initiatives to support underserved communities, focusing on renovating government schools and orphanages to provide better educational and living conditions for children. My leadership extended to organizing medical camps in rural villages, offering essential health services to populations with limited access to medical care. Through these efforts, we not only improved physical infrastructures but also enhanced the well-being and future prospects of countless individuals in need, demonstrating a deep commitment to social responsibility and community support.",
          color: "#4285F4",
        },
        
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My projects makes use of vast variety of latest technology tools. My best experience is to create Data Science projects and deploy them to web applications using cloud infrastructure.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Publications",
  description:
    "I have worked on and published a few research papers and publications of my own.",
  avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzQ=",
      name: "Artificial Intelligence Paper",
      createdAt: "2020-03-06T16:26:54Z",
      description: "Paper Written on Artificial Intelligence published in xyz ",
      url:
        "https://www.andrewng.org/publications/building-high-level-features-using-large-scale-unsupervised-learning/",
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzi=",
      name: "Artificial Intelligence Paper",
      createdAt: "2020-03-06T16:26:54Z",
      description: "Paper Written on Artificial Intelligence published in xyz ",
      url:
        "https://www.andrewng.org/publications/building-high-level-features-using-large-scale-unsupervised-learning/",
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNze=",
      name: "Artificial Intelligence Paper",
      createdAt: "2020-03-06T16:26:54Z",
      description: "Paper Written on Artificial Intelligence published in xyz ",
      url:
        "https://www.andrewng.org/publications/building-high-level-features-using-large-scale-unsupervised-learning/",
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzt=",
      name: "Artificial Intelligence Paper",
      createdAt: "2020-03-06T16:26:54Z",
      description: "Paper Written on Artificial Intelligence published in xyz ",
      url:
        "https://www.andrewng.org/publications/building-high-level-features-using-large-scale-unsupervised-learning/",
    },
    {
      id: "MDEwOlJlcG9zaXRvcnkyNDU0NjcyNzb=",
      name: "Artificial Intelligence Paper",
      createdAt: "2020-03-06T16:26:54Z",
      description: "Paper Written on Artificial Intelligence published in xyz ",
      url:
        "https://www.andrewng.org/publications/building-high-level-features-using-large-scale-unsupervised-learning/",
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "prof1.jpg",
    description:
      "I am available on almost every social media. You can message me!",
  },
  blogSection: {
  },
  addressSection: {
    title: "Address",
    subtitle:
      "1347 West Flournoy Street Apt 2, Chicago, Illinois - 60607",
    locality: "Chicago",
    country: "US",
    region: "Illinois",
    postalCode: "60607",
    streetAddress: "1347 West Flournoy Street Apt 2",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://www.google.com/maps/place/1347+W+Flournoy+St,+Chicago,+IL+60607/@41.8729841,-87.6610655,17z/data=!3m1!4b1!4m6!3m5!1s0x880e2d1efa81cfc7:0x375d114be934ad67!8m2!3d41.8729841!4d-87.6610655!16s%2Fg%2F11c14k1fnk?entry=ttu",
  },
  phoneSection: {
    title: "Phone number",
    subtitle: "+1(312)6874565",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  contactPageData,
};
