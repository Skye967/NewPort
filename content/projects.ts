import type { StaticImageData } from "next/image";
import holsterChatResults from "@/public/projects/holster-chat-results.webp";
import holsterConnections from "@/public/projects/holster-connections.webp";
import holsterWatchlist from "@/public/projects/holster-watchlist.webp";

export type Screenshot = { src: StaticImageData; alt: string };

export type Project = {
  name: string;
  description: string;
  nextStep: string;
  stack: { group: string; items: string[] }[];
  liveUrl: string;
  repoUrl?: string;
  screenshots: Screenshot[];
};

export const projects: Project[] = [
  {
    name: "Holster",
    description:
      "Holster is one search across every streaming service you already pay for. Say what you're in the mood for and it comes back with something you can watch tonight, on a service you have, with the poster, rating, cast, and where it's streaming.",
    nextStep:
      "multiple watchlists, so you can sort what you want to watch into your own lists.",
    stack: [
      {
        group: "Frontend",
        items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "shadcn/ui"],
      },
      { group: "Backend", items: ["Go", "Python", "FastAPI"] },
      { group: "AI", items: ["LangChain", "Gemini"] },
      {
        group: "Data & auth",
        items: ["PostgreSQL (Supabase)", "Clerk", "TMDB API"],
      },
      { group: "Infra", items: ["Docker", "Railway", "GitHub Actions"] },
    ],
    liveUrl: "https://holster.up.railway.app",
    repoUrl: "https://github.com/Skye967/holster",
    screenshots: [
      {
        src: holsterChatResults,
        alt: "Holster's chat: a request for a movie about the sea, the agent's reply listing the services it searched, and result cards for Life of Pi, Dead Sea and Blue Crush showing rating, cast and where each is streaming",
      },
      {
        src: holsterConnections,
        alt: "Holster's Connections page: a list of streaming services, from Netflix to Crunchyroll, each with a toggle for whether you subscribe",
      },
      {
        src: holsterWatchlist,
        alt: "Holster's Watchlist page: saved titles such as The Drama and Predator: Badlands, each with where to watch it",
      },
    ],
  },
];
