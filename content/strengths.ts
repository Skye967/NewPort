export type StrengthId = "full-stack" | "rapid-learning" | "mission-driven";
export type Strength = { id: StrengthId; name: string; description: string };

export type ProcessStepId = "think" | "design" | "build" | "scale";
export type ProcessStep = {
  id: ProcessStepId;
  name: string;
  description: string;
};

export type TraitId = "communication" | "tradeoffs" | "ownership";
export type Trait = { id: TraitId; name: string; description: string };

export const strengths: Strength[] = [
  {
    id: "full-stack",
    name: "Full-Stack Development",
    description:
      "From database schema to the last pixel of the UI, I build features across every layer of the stack. Fewer handoffs means ideas reach production faster, with nothing lost in translation.",
  },
  {
    id: "rapid-learning",
    name: "Rapid Learning and Execution",
    description:
      "New framework, unfamiliar codebase, tight deadline. I ramp up fast and contribute early, because I learn by building. What I pick up turns into shipped work, not just notes.",
  },
  {
    id: "mission-driven",
    name: "Mission-Driven Development",
    description:
      "Code is only as good as the problem it solves. I start with the user and the goal, build what moves the needle, and skip the shiny detours that don't.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "think",
    name: "Think",
    description:
      "Start with the why. Define the problem, the user, and what success looks like.",
  },
  {
    id: "design",
    name: "Design",
    description:
      "Map the data, the API, and the screens before writing a line.",
  },
  {
    id: "build",
    name: "Build",
    description:
      "Ship in small, tested, reviewed steps, so progress is real and visible.",
  },
  {
    id: "scale",
    name: "Scale",
    description:
      "Automate deploys, watch what matters, and stay fast as usage grows.",
  },
];

export const workingTraits: Trait[] = [
  {
    id: "communication",
    name: "Clear Communication",
    description:
      "Good code still needs a good story. I write pull requests that explain the why, raise risks before they become surprises, and keep stakeholders in the loop without the jargon.",
  },
  {
    id: "tradeoffs",
    name: "Tradeoff Awareness",
    description:
      "There's no best solution, only the right one for now. I weigh cost, complexity, and reversibility, write the reasoning down, and choose the simplest design that won't box us in later.",
  },
  {
    id: "ownership",
    name: "Ownership Mindset",
    description:
      "Shipping is the start, not the finish. I watch what I release, chase down the bugs I cause, and leave every codebase a little better than I found it.",
  },
];
