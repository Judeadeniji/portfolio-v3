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
    url: "https://twitter.com/iam_feranmi_",
    Icon: AiOutlineTwitter,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/feranmi-adeniji",
    Icon: AiFillLinkedin,
  },
  {
    name: "mail",
    url: "mailto:adenijiferanmi64@gmail.com",
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
    sectionName: "Frameworks & Libraries",
    stacks: [
      "react",
      "solidjs",
      "svelte",
      "astro",
      "nextjs",
      "tailwindcss",
      "express",
      "bun",
    ],
  },
  {
    sectionName: "Tools & Infrastructure",
    stacks: [
      "git",
      "docker",
      "postgresql",
      "redis",
      "vercel",
      "netlify",
      "cloudflare",
      "figma",
      "vscode",
    ],
  },
];

const github = (repo: string) => `https://github.com/Judeadeniji/${repo}`;

export const Experiences = [
  {
    title: "Lead Frontend Developer",
    company: "Hospio360",
    duration: "2025 – Present · Remote",
    description:
      "Leading all frontend architecture for a pre-launch hotel management SaaS. Own the entire frontend across two surfaces — a Next.js marketing site and a TanStack Start operations dashboard. Responsible for component design, UI decisions, performance, and all frontend tooling.",
    achievements: [
      "Architected the full frontend from scratch across marketing and dashboard surfaces",
      "Established component system and design tokens used across the product",
      "Optimized performance and responsiveness across all breakpoints",
    ],
  },
  {
    title: "Co-Founder & Founding Engineer",
    company: "Permi",
    duration: "2024 – Present · Remote",
    description:
      "Co-founded and engineered a SaaS platform for tracking CSLB contractor licenses in the US market. Led a full frontend and backend overhaul — migrating the database schema, rewriting core services, rebuilding the marketing site, and shipping billing and email infrastructure.",
    url: "https://permi.app",
    achievements: [
      "Migrated schema from user-level to org-level licensing with member preferences",
      "Rewrote license service and expiration worker from scratch",
      "Set up billing via Polar, infra on Railway, and email routing via Cloudflare + Resend",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "AcuSys",
    duration: "Jul 2025 – Present · Remote",
    description:
      "Built the full marketing and product site for an EdTech platform from scratch. Handles service pages, course listings, and content management via Strapi CMS.",
    projects: [
      {
        name: "AcuSys Platform Site",
        tech: ["TanStack Start", "Strapi CMS", "TypeScript", "Tailwind CSS"],
        type: "EdTech Marketing & Product Site",
        url: "",
      },
    ],
  },
  {
    title: "Frontend Developer",
    company: "RCCG Banner of Love Parish",
    duration: "2023 · Lagos",
    description:
      "Led frontend development of the church's official website. Implemented event management, sermon archive, online giving, and member registration. Delivered on time and within scope.",
    url: "https://rccgbanneroflovelagos.org",
    achievements: [
      "Built a full CMS-backed content system for church leadership to manage independently",
      "Implemented online giving and member registration flows",
      "Delivered a fully responsive site across all devices",
    ],
  },
  {
    title: "Freelance Web Developer",
    company: "Independent",
    duration: "2022 – Present",
    description:
      "Delivered production web applications for clients across Nigeria — e-commerce platforms, agency sites, and marketing pages. Handle full project lifecycle from requirements through to deployment and handoff.",
    projects: [
      {
        name: "Socratic Ink",
        tech: ["Astro", "TypeScript", "Tailwind CSS"],
        type: "Ghostwriting Agency Site",
        url: "https://socraticink.netlify.app",
      },
      {
        name: "Servex",
        tech: ["TypeScript", "Bun"],
        type: "HTTP Server Framework",
        url: github("servex"),
      },
      {
        name: "Paystack SDK (Edge)",
        tech: ["TypeScript"],
        type: "Edge-compatible Paystack SDK",
        url: github("paystack-edge"),
      },
    ],
  },
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
    name: "GitHub",
    url: "https://github.com/Judeadeniji",
  },
];
