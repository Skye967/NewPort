import type { StaticImageData } from "next/image";
import heroPhoto from "@/public/hero.webp";

export type SectionId = "about" | "projects" | "contact";

export type Site = {
  name: string;
  title: string;
  hero: {
    photo: { src: StaticImageData; alt: string };
    cta: { label: string; target: SectionId };
  };
  nav: { id: SectionId; label: string }[];
  email: string;
  links: { label: string; href: string }[];
};

export const site: Site = {
  name: "Skye Grossman",
  title: "Full-stack developer",
  hero: {
    photo: {
      src: heroPhoto,
      alt: "Skye Grossman seated in an armchair by tall windows",
    },
    cta: { label: "See my work", target: "projects" },
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
