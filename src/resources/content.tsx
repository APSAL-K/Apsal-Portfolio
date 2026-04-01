import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";



const person: Person = {
  firstName: "Apsal",
  lastName: "K",
  name: "Apsal K",
  role: "Junior Software Developer",
  avatar: "/images/avatar.jpg",
  email: "apsal.k2004@gmail.com",
  location: "Asia/Kolkata",
  languages: ["Tamil", "English", "Malayalam"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/APSAL-K",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/k-apsal",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hi, I'm {person.firstName} <br /> {person.role}</>,
  subline: (
    <>
      A professional Software Developer and AI Engineer specializing in building intelligent, scalable, and user-centric AI-powered solutions.
    </> 
  ),
  featured: {
    display: false,
    title: undefined,
    href: ""
  },
  goals: {
    display: true,
    title: "Goals & Aspirations",
    items: [
      "Continuously enhance my expertise in React and .NET to build cutting-edge web applications",
      "Contribute to innovative projects that solve real-world problems and improve user experiences",
      "Stay updated with the latest technologies and best practices in web development",
      "Build scalable, high-performance applications that make a meaningful impact",
      "Collaborate with talented teams to deliver exceptional software solutions",
    ],
  },
  featuredProjects: {
    display: true,
    title: "Featured Projects",
    projectSlugs: [
      "building-once-ui-a-customizable-design-system",
      "automate-design-handovers-with-a-figma-to-code-pipeline",
      "simple-portfolio-builder",
    ],
  },
  professional: {
    display: true,
    title: "Professional Overview",
    description: (
      <>
        Skilled React and .NET developer with experience in building scalable, high-performance web applications. 
        Proficient in React, .NET Framework, JavaScript, HTML, and CSS, with a focus on developing responsive 
        front-end interfaces and efficient backend systems.
      </>
    ),
    highlights: [
      {
        title: "Front-End Expertise",
        description: "Building responsive and performant user interfaces with React.js, ensuring cross-browser compatibility and optimal user experiences.",
      },
      {
        title: "Backend Development",
        description: "Developing robust backend systems using .NET Framework, creating efficient APIs and integrating third-party services.",
      },
      {
        title: "Collaboration",
        description: "Working effectively with cross-functional teams including designers, product managers, and developers to deliver high-quality products.",
      },
      {
        title: "Performance Focus",
        description: "Passionate about performance optimization, ensuring applications load quickly and run smoothly across all devices.",
      },
    ],
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Coimbatore, Tamil Nadu`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Skilled React and .NET developer with experience in building scalable, high-performance web applications. 
        Proficient in React, .NET Framework, JavaScript, HTML, and CSS, with a focus on developing responsive 
        front-end interfaces and efficient backend systems. Passionate about performance optimization, user 
        experience, and accessibility. Strong problem-solving skills and a quick learner of new technologies.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "DevBee Inc",
        logo: "/images/Company/devbee-logo.jpg",
        timeframe: "Apr 2024 - Present",
        role: "Front-End Developer",
        achievements: [
          "Developing and maintaining web applications using React.js and other related technologies.",
          "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
          "Implementing responsive design and ensuring cross-browser compatibility.",
          "Participating in code reviews and providing constructive feedback to other developers.",
        ],
        images: [],
      },
      {
        company: "DevBee Inc",
        logo: "/images/Company/devbee-logo.jpg",
        timeframe: "Jan 2024 - March 2024",
        role: "Web Development (Internship)",
        achievements: [
          "Completed a three-month internship focused on web development course in HTML, CSS, JavaScript, and React.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Texting Arts and Science College",
        description: <>Bachelor of Computer Science (2021-2024), Palathurai, Coimbatore</>,
      },
      {
        name: "Manbaul Uloom Higher Secondary School",
        description: <>HSC (2019-2021), Percentage: 70%, Ukkadam, Coimbatore</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend",
        description: (
          <>Proficient in React, Laravel, and Responsive Design. Building modern, interactive user interfaces with focus on performance and accessibility.</>
        ),
        tags: [
          {
            name: "React",
          },
          {
            name: "Laravel",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "HTML",
          },
          {
            name: "CSS",
          },
        ],
        images: [],
      },
      {
        title: "Backend",
        description: (
          <>Experienced in .NET Framework and API Development & Integration. Building scalable backend systems and RESTful APIs.</>
        ),
        tags: [
          {
            name: ".NET Framework",
          },
        ],
        images: [],
      },
      {
        title: "Database",
        description: (
          <>Working with SQL, PostgreSQL, and MongoDB for data storage and management.</>
        ),
        tags: [
          {
            name: "SQL",
          },
          {
            name: "PostgreSQL",
          },
          {
            name: "MongoDB",
          },
        ],
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: (
          <>Version control and collaboration using Git and GitHub.</>
        ),
        tags: [
          {
            name: "Git",
            icon: "github",
          },
          {
            name: "GitHub",
            icon: "github",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: "A showcase of innovative solutions, from AI-powered applications to full-stack platforms. Each project represents a unique challenge solved with cutting-edge technology and best practices.",
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export const workStats = [
  { label: "15+ Projects Completed", value: "15+" },
  { label: "Multiple Industries", value: "Multiple" },
  { label: "AI/ML Specialist", value: "AI/ML" },
];

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Get in touch with ${person.name} for collaborations and opportunities`,
};

export { person, social, newsletter, home, about, blog, work, gallery, contact };
