export type SectionId = "about" | "projects" | "contact";

export type Site = {
  name: string;
  title: string;
  nav: { id: SectionId; label: string }[];
  email: string;
  links: { github: string; linkedin: string };
};

export const site: Site = {
  name: "Skye Grossman",
  title: "Full-stack developer",
  nav: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  email: "skye.grossman@gmail.com",
  links: {
    github: "https://github.com/Skye967",
    linkedin: "https://www.linkedin.com/in/skye-grossman",
  },
};
