import type { StaticImageData } from "next/image";

export type Screenshot = { src: StaticImageData; alt: string };

export type Project = {
  name: string;
  description: string;
  nextStep: string;
  liveUrl: string;
  repoUrl?: string;
  screenshots: Screenshot[];
};

export const projects: Project[] = [
  {
    name: "Holster",
    description: "TODO: description",
    nextStep: "TODO: what I'd do next",
    liveUrl: "https://holster.up.railway.app",
    screenshots: [],
  },
];
