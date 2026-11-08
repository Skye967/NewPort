import type { StaticImageData } from "next/image";
import apollo from "@/public/icons/apollographql.svg";
import claude from "@/public/icons/claude.svg";
import css from "@/public/icons/css.svg";
import database from "@/public/icons/database.svg";
import docker from "@/public/icons/docker.svg";
import figma from "@/public/icons/figma.svg";
import git from "@/public/icons/git.svg";
import github from "@/public/icons/github.svg";
import githubCopilot from "@/public/icons/githubcopilot.svg";
import go from "@/public/icons/go.svg";
import gemini from "@/public/icons/googlegemini.svg";
import graphql from "@/public/icons/graphql.svg";
import html from "@/public/icons/html5.svg";
import javascript from "@/public/icons/javascript.svg";
import langchain from "@/public/icons/langchain.svg";
import neon from "@/public/icons/neon.svg";
import nextjs from "@/public/icons/nextdotjs.svg";
import nodejs from "@/public/icons/nodedotjs.svg";
import postgresql from "@/public/icons/postgresql.svg";
import postman from "@/public/icons/postman.svg";
import prisma from "@/public/icons/prisma.svg";
import python from "@/public/icons/python.svg";
import react from "@/public/icons/react.svg";
import supabase from "@/public/icons/supabase.svg";
import tailwind from "@/public/icons/tailwindcss.svg";
import typescript from "@/public/icons/typescript.svg";

export type Skill = { name: string; icon: StaticImageData };
export type SkillGroup = { name: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    skills: [
      { name: "TypeScript", icon: typescript },
      { name: "JavaScript", icon: javascript },
      { name: "React.js", icon: react },
      { name: "Next.js", icon: nextjs },
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "Tailwind", icon: tailwind },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Go", icon: go },
      { name: "Python", icon: python },
      { name: "Node.js", icon: nodejs },
      { name: "GraphQL", icon: graphql },
      { name: "Apollo", icon: apollo },
    ],
  },
  {
    name: "Data",
    skills: [
      { name: "SQL", icon: database },
      { name: "PostgreSQL", icon: postgresql },
      { name: "Supabase", icon: supabase },
      { name: "Prisma", icon: prisma },
      { name: "Neon", icon: neon },
    ],
  },
  {
    name: "AI",
    skills: [
      { name: "Claude", icon: claude },
      { name: "LangChain", icon: langchain },
      { name: "Copilot", icon: githubCopilot },
      { name: "Gemini", icon: gemini },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Docker", icon: docker },
      { name: "Git", icon: git },
      { name: "GitHub", icon: github },
      { name: "Postman", icon: postman },
      { name: "Figma", icon: figma },
    ],
  },
];
