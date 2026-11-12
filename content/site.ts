import type { StaticImageData } from "next/image";
import heroPhoto from "@/public/hero.webp";

export type SectionId =
  "about" | "strengths" | "projects" | "technology" | "contact";
export type SocialId = "linkedin" | "github";

export type Site = {
  name: string;
  title: string;
  description: string;
  hero: {
    greeting: string;
    photo: { src: StaticImageData; alt: string };
  };
  about: {
    heading: string;
    tagline: string;
    intro: string;
    prompt: string;
    facts: string[];
    // Repeats a line of the first paragraph in content/bio.ts; change both
    // together.
    pullQuote: string;
  };
  strengths: {
    heading: string;
    tagline: string;
    intro: string;
    processHeading: string;
    processIntro: string;
    traitsHeading: string;
    traitsIntro: string;
  };
  projects: {
    heading: string;
    nextStepLabel: string;
    stackLabel: string;
    liveLabel: string;
    repoLabel: string;
  };
  technology: {
    heading: string;
    tagline: string;
    intro: string;
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
  // The monogram in the nav's top-left corner. The hero types the full name,
  // so the nav doesn't repeat it.
  mark: string;
  nav: { id: SectionId; label: string }[];
  navLabel: string;
  resume: { label: string; href: string };
  newTabHint: string;
  menuLabel: string;
  closeMenuLabel: string;
  socialLabel: string;
  email: string;
  emailLabel: string;
  links: { id: SocialId; label: string; href: string }[];
};

export const site: Site = {
  name: "Skye Grossman",
  title: "Full Stack Software Developer",
  // Quotes the second paragraph of bio in content/bio.ts; change both together.
  description:
    "I enjoy building solutions to real problems, with interfaces that are intuitive, performant and built to scale.",
  hero: {
    greeting: "Hey there, I'm Skye Grossman",
    photo: {
      src: heroPhoto,
      // app/opengraph-image.alt.txt repeats this; change both together.
      alt: "Skye Grossman seated in an armchair by tall windows",
    },
  },
  about: {
    heading: "About Me",
    tagline: "Who I am and what I do",
    intro:
      "I build full-stack web applications, specializing in React, Next.js, TypeScript, PostgreSQL, Python, and Go.",
    prompt: "whoami",
    facts: [
      "Maui, Hawaii native",
      "Full-stack software developer",
      "Kitchen-trained, now cooking up code",
      "Exploring architecture and AI agents",
    ],
    pullQuote: "A great chef is always working the next problem.",
  },
  strengths: {
    heading: "Core Strengths",
    tagline: "What I bring to the table",
    intro: "Skills I bring to my approach to every project.",
    processHeading: "A Process That Delivers",
    processIntro: "Ship great software with intent, clarity, and discipline.",
    traitsHeading: "How I Work",
    traitsIntro: "What you can count on from me, start to finish.",
  },
  projects: {
    heading: "Projects",
    nextStepLabel: "What I'd do next:",
    stackLabel: "Stack",
    liveLabel: "Live site",
    repoLabel: "Source code",
  },
  technology: {
    heading: "Technology",
    tagline: "The tools I build with",
    intro: "Languages, frameworks, and tools I use to ship, front to back.",
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
  mark: "SG",
  nav: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  navLabel: "Primary",
  resume: {
    label: "Resume",
    href: "/skye-grossman-resume.pdf",
  },
  newTabHint: "(opens in a new tab)",
  menuLabel: "Menu",
  closeMenuLabel: "Close menu",
  socialLabel: "Social",
  email: "skye.grossman@gmail.com",
  emailLabel: "Email",
  links: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/skye-grossman",
    },
    { id: "github", label: "GitHub", href: "https://github.com/Skye967" },
  ],
};
