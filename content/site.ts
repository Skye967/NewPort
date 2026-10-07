export type SectionId = "about" | "projects" | "contact";

export type Site = {
  name: string;
  title: string;
  nav: { id: SectionId; label: string }[];
  email: string;
  links: { label: string; href: string }[];
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
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/skye-grossman" },
    { label: "GitHub", href: "https://github.com/Skye967" },
  ],
};
