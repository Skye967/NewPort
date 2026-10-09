import type { StaticImageData } from "next/image";
import heroPhoto from "@/public/hero.webp";

export type SectionId = "about" | "projects" | "contact";

export type Site = {
  name: string;
  title: string;
  hero: {
    greeting: string;
    photo: { src: StaticImageData; alt: string };
  };
  about: {
    heading: string;
    tagline: string;
    greeting: string;
    closing: string;
    skillsHeading: string;
  };
  nav: { id: SectionId; label: string }[];
  email: string;
  links: { label: string; href: string }[];
};

export const site: Site = {
  name: "Skye Grossman",
  title: "Full Stack Software Developer",
  hero: {
    greeting: "Hey there, I'm Skye Grossman",
    photo: {
      src: heroPhoto,
      alt: "Skye Grossman seated in an armchair by tall windows",
    },
  },
  about: {
    heading: "About Me",
    tagline: "Who I am and what I do",
    greeting: "Hello, I'm",
    closing:
      "If you have any questions or just want to chat, feel free to get in touch. Mahalo!",
    skillsHeading: "Skills",
  },
  nav: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  email: "skye.grossman@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/skye-grossman" },
    { label: "GitHub", href: "https://github.com/Skye967" },
  ],
};
