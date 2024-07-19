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
    "https://drive.google.com/file/d/1YONz0K20lrJyJ9ykseBdkWTgaS8VabqO/view?usp=sharing",
  
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
      title: "Full Stack Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building responsive website front end using React-Redux",
        "⚡ Developing mobile applications using Flutter, React Native and solo android apps using Kotlin",
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
          skillName: "NodeJS",
          fontAwesomeClassname: "simple-icons:node-dot-js",
          style: {
            color: "#339933",
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
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    
  ]
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
        "⚡ I have taken varity of courses related to Artificial Intelligence which correspond to Explainable AI, Graph Machine Learning, Computer Vision etc.",
        "⚡ Apart from this, I have also done research assistantship. As part of it, I have worked on creating new algorithms in Graph ML and Network Science.",
        "⚡ Developed various projects which solve real time problems in various sectors.",
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
        "⚡ I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.",
        "⚡ Apart from this, I have done courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development.",
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
        "https://nptel.ac.in/courses/106106179",
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
    "I have worked with many evolving startups as ML and DL Developer, Designer and Software Architect. I have also worked with some well established companies mostly as AI Developer. I love organising events and that is why I am also involved with many opensource communities as a representative.",
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
            "Actively contributing to the development and optimization of the Patient Safety Leadership's digital presence. Pioneered SEO strategies enhancing web traffic and student engagement significantly. Collaborated with academic staff to improve backend processes, thereby elevating operational efficiency and course delivery.",
          color: "#0879bf",
        },        
        {
          title: "Generative AI Engineer",
          company: "JK Projects",
          company_url: "https://www.jkprojects.in/",
          logo_path: "UIC_logo.png",
          duration: "February 2020 - July 2022",
          location: "Hyderbad, India",
          description:
            "Designed and deployed a RAG system for energy consumption forecasting, integrating LLMs for dynamic updates, boosting accuracy by 20%. Implemented vector store technologies for efficient data retrieval. Developed semantic search algorithms, reducing costs by 15%. Led AI model integration with TensorFlow and PyTorch, enhancing scalability and reliability.",
          color: "#0879bf",
        },
        {
          title: "Network Security Analyst",
          company: "Verzeo Pvt. Ltd.",
          company_url: "https://www.verzeo.com/",
          logo_path: "verzeo.png",
          duration: "June 2021 - August 2021",
          location: "Hyderabad, Telangana",
          description:
            "As a Network Security Analyst at Verzeo Pvt. Ltd., led pivotal cybersecurity initiatives, including comprehensive penetration testing and robust phishing defenses. Instrumental in identifying and mitigating critical vulnerabilities, which fortified security protocols and data integrity across the organization.",
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
            "Working as the President at Street Cause- GRIET, I helped the underprivigled people of the state to have a better life.",
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
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with ML, AI, React, Android, Cloud and Opensource Development.",
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
