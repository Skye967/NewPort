import type { StaticImageData } from "next/image";
import css from "@/public/icons/css.svg";
import docker from "@/public/icons/docker.svg";
import figma from "@/public/icons/figma.svg";
import git from "@/public/icons/git.svg";
import github from "@/public/icons/github.svg";
import go from "@/public/icons/go.svg";
import html from "@/public/icons/html5.svg";
import javascript from "@/public/icons/javascript.svg";
import langchain from "@/public/icons/langchain.svg";
import nextjs from "@/public/icons/nextdotjs.svg";
import nodejs from "@/public/icons/nodedotjs.svg";
import postgresql from "@/public/icons/postgresql.svg";
import postman from "@/public/icons/postman.svg";
import python from "@/public/icons/python.svg";
import react from "@/public/icons/react.svg";
import tailwind from "@/public/icons/tailwindcss.svg";
import typescript from "@/public/icons/typescript.svg";

export type Skill = { name: string; icon: StaticImageData };

export const skills: Skill[] = [
  { name: "TypeScript", icon: typescript },
  { name: "JavaScript", icon: javascript },
  { name: "Python", icon: python },
  { name: "Go", icon: go },
  { name: "HTML", icon: html },
  { name: "CSS", icon: css },
  { name: "React.js", icon: react },
  { name: "Next.js", icon: nextjs },
  { name: "Node.js", icon: nodejs },
  { name: "Tailwind", icon: tailwind },
  { name: "LangChain", icon: langchain },
  { name: "PostgreSQL", icon: postgresql },
  { name: "Docker", icon: docker },
  { name: "Git", icon: git },
  { name: "GitHub", icon: github },
  { name: "Postman", icon: postman },
  { name: "Figma", icon: figma },
];
