import { url } from "inspector";
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from "solid-icons/ai";
import { FaSolidEnvelope } from "solid-icons/fa";

const socials = [
  {
    name: "github",
    url: "https://github.com/Judeadeniji",
    Icon: AiFillGithub,
  },
  {
    name: "twitter",
    url: "https://twitter.com/FeranmiWebDev",
    Icon: AiOutlineTwitter,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/oluwaferanmi-adeniji-537416252",
    Icon: AiFillLinkedin,
  },
  {
    name: "mail",
    url: "mailto:adeniiferanmi64@gamil.com",
    Icon: FaSolidEnvelope,
  },
] as const;

export { socials };

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
};

export type Post = {
  _id: string;
  title: string;
  body: string;
  repo: string;
  category: string;
  img_url: string;
  link: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PostsResponse = {
  posts: Post[];
  count: number;
};

export type Project2 = {
  name: string;
  img_url?: string;
  description?: string;
  technologies?: string[];
  repo?: string;
  live_url?: string;
  features?: string[];
};

type Contact = {
  email: string;
  phone: string;
  location: string;
};

export type Resume = {
  name: string;
  contact: Contact;
  projects: Project2[];
};


export const myStacksData = [
  {
    sectionName: "Languages",
    stacks: ["javascript", "typescript", "go"],
  },
  {
    sectionName: "Frameworks",
    stacks: [
      "react",
      "solidjs",
      "svelte",
      "tailwindcss",
      "css3",
      "bun",
      "express",
      "nextjs",
    ],
  },
  {
    sectionName: "tools & software",
    stacks: [
      "git",
      "vscode",
      "figma",
      "postgresql",
      "supabase",
      "vercel",
      "netlify",
      "firebase",
    ],
  },
];

const github = (repo: string ) => `https://github.com/Judeadeniji/${repo}`;

export const Experiences = [
  {
    title: "Frontend Developer",
    company: "RCCG Banner of Love Parish",
    duration: "2023",
    description: "Led frontend development of the church's official website using Next.js and Tailwind. Implemented key features including responsive design, event management, sermon archive, online giving, and member registration. Collaborated with backend developers and delivered the project within timeline.",
    url: "https://rccgbanneroflovelagos.org",
    achievements: [
      "Successfully integrated various functionalities while maintaining a cohesive UI",
      "Received positive feedback from church community for enhanced online engagement",
      "Implemented complete content management system"
    ],
  },
  {
    title: "Open Source Developer",
    company: "Personal Projects",
    duration: "2023 - Present",
    description: "Developed multiple open-source projects including Paystack SDK for edge computing and Servex, a high-performance HTTP server framework.",
    projects: [
      {
        name: "Paystack SDK",
        tech: ["TypeScript"],
        type: "Edge Computing Framework",
        url: github("paystack-egde")
      },
      {
        name: "Servex",
        tech: ["TypeScript"],
        type: "HTTP Server Framework",
        url: github("servex")
      }
    ]
  },
  {
    title: "Freelance Web Developer",
    company: "Independent",
    duration: "2022 - Present",
    description: "Developed various web applications and e-commerce platforms using modern technologies including SvelteKit, React, Next.js, and Tailwind CSS.",
    projects: [
      {
        name: "Personal Blog",
        tech: ["SvelteKit", "JavaScript", "Tailwind CSS"],
        type: "Content Platform",
        url: "https://the-lazy-dev.netlify.app"
      },
      {
        name: "The Ordinary",
        tech: ["JavaScript", "Tailwind CSS"],
        type: "E-commerce Platform",
        url: "https://the-ordinary.onrender.com"
      },
      {
        name: "Portfolio Website",
        tech: ["SolidJS", "TypeScript", "Tailwind CSS", "ExpressJS"],
        type: "Personal Website",
        url: "https://feranmi-v3.netlify.app"
      }
    ]
  },
  {
    title: "Frontend Developer",
    company: "Frontend Mentor Projects",
    duration: "2022 - Present",
    description: "Built multiple frontend applications focusing on responsive design and user experience.",
    projects: [
      {
        name: "REST Country API",
        tech: ["React", "Tailwind CSS", "RC Extended"],
        type: "Web Application",
        url: "https://country-api-with-signals.netlify.app/"
      },
      {
        name: "Doodle Cam",
        tech: ["JavaScript", "BraceJS"],
        type: "Web Application",
        url: "https://doodle-cam.netlify.app"
      },
      {
        name: "Rick and Morty DB",
        tech: ["JavaScript", "React", "Tailwind CSS"],
        type: "Web Application",
        url: "https://rick-mort-db.netlify.app",
      }
    ]
  }
];
export const navLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about-me",
  },
  {
    name: "Blog",
    url: "https://the-lazy-dev.netlify.app/",
  },
  {
    name: "GitHub",
    url: "https://github.com/Judeadeniji",
  },
];
