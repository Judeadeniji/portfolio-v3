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

export const mockProjects: Project[] = [
  {
    name: "Project 1",
    description: "A dedicated platform offering comprehensive diabetes and cardiovascular counselling services.",
    techStack: ["react", "typescript", "tailwindcss"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    name: "Project 2",
    description: "This is a description of project 2",
    techStack: ["svelte", "typescript", "tailwindcss"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    name: "Project 3",
    description: "This is a description of project 3",
    techStack: ["nextjs", "typescript", "tailwindcss"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
];

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

