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
  projects: {
    heading: string;
    nextStepLabel: string;
    stackLabel: string;
    liveLabel: string;
    repoLabel: string;
  };
  contact: {
    heading: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    // Enforced by the form's maxLength and again by sendMessage, which
    // anyone can call with a hand-built request.
    maxLength: { name: number; email: number; message: number };
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    invalidMessage: string;
    errorMessage: string;
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
  projects: {
    heading: "Projects",
    nextStepLabel: "What I'd do next:",
    stackLabel: "Stack",
    liveLabel: "Live site",
    repoLabel: "Source code",
  },
  contact: {
    heading: "Contact",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    maxLength: { name: 100, email: 254, message: 5000 },
    submitLabel: "Send message",
    sendingLabel: "Sending…",
    successMessage: "Thanks — your message is on its way.",
    invalidMessage: "Please fill in your name, email and message.",
    errorMessage:
      "Your message may not have been sent. You can email me directly instead:",
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
