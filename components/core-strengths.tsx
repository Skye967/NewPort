import {
  IconBolt,
  IconBulb,
  IconCode,
  IconMessages,
  IconPalette,
  IconRocket,
  IconScale,
  IconShieldCheck,
  IconStack2,
  IconTarget,
  type Icon,
} from "@tabler/icons-react";
import type { CSSProperties } from "react";
import { RevealSection } from "@/components/reveal-section";
import { SpotlightList } from "@/components/spotlight-list";
import { site, type SectionId } from "@/content/site";
import {
  processSteps,
  strengths,
  workingTraits,
  type ProcessStepId,
  type StrengthId,
  type TraitId,
} from "@/content/strengths";
import { eyebrow } from "@/components/eyebrow";

const strengthIcons: Record<StrengthId, Icon> = {
  "full-stack": IconStack2,
  "rapid-learning": IconBolt,
  "mission-driven": IconTarget,
};

const stepIcons: Record<ProcessStepId, Icon> = {
  think: IconBulb,
  design: IconPalette,
  build: IconCode,
  scale: IconRocket,
};

const traitIcons: Record<TraitId, Icon> = {
  communication: IconMessages,
  tradeoffs: IconScale,
  ownership: IconShieldCheck,
};

const subheading = "mt-16 reveal text-2xl font-bold tracking-tight sm:text-3xl";
const intro =
  "mt-3 w-fit reveal bg-linear-to-r from-[#b5b5ab] to-[red] bg-clip-text text-lg text-transparent";

// The three groups get lighter from top to bottom: raised cards, a line of
// steps, then open columns under a rule. Red marks the same things in each:
// icons, and the lines that join or underline them.
export function CoreStrengths() {
  const id: SectionId = "strengths";

  return (
    <RevealSection id={id} className="mx-auto w-full max-w-5xl px-page py-16">
      <h2 className={`${eyebrow} reveal`}>{site.strengths.heading}</h2>
      <p className="mt-4 reveal text-3xl font-bold tracking-tight sm:text-4xl">
        {site.strengths.tagline}
      </p>
      <p className={intro}>{site.strengths.intro}</p>
      <StrengthCards />
      <h3 className={subheading}>{site.strengths.processHeading}</h3>
      <p className={intro}>{site.strengths.processIntro}</p>
      <ProcessLine />
      <h3 className={subheading}>{site.strengths.traitsHeading}</h3>
      <p className={intro}>{site.strengths.traitsIntro}</p>
      <Traits />
    </RevealSection>
  );
}

// A bento from md: the first card takes the left two-fifths across both rows,
// the other two stack to its right. The border is the li's 1px padding, so
// the red glow behind the card shows only there; a fainter one lights the
// card itself. Both follow the pointer; see SpotlightList.
function StrengthCards() {
  return (
    <SpotlightList className="mt-8 grid gap-4 md:grid-cols-5">
      {strengths.map(({ id, name, description }, i) => {
        const Icon = strengthIcons[id];
        return (
          <li
            key={id}
            style={{ "--i": i } as CSSProperties}
            className="group/card relative reveal overflow-hidden rounded-2xl bg-white/10 p-px md:col-span-3 md:[--reveal-delay:calc(var(--i)*100ms)] md:first:col-span-2 md:first:row-span-2"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--x)_var(--y),rgb(255_0_0/0.7),transparent_70%)] opacity-0 group-hover/card:opacity-100 motion-safe:transition-opacity motion-safe:duration-300"
            />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-neutral-950 p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(480px_circle_at_var(--x)_var(--y),rgb(255_0_0/0.08),transparent_70%)] opacity-0 group-hover/card:opacity-100 motion-safe:transition-opacity motion-safe:duration-300"
              />
              <span
                aria-hidden="true"
                className="absolute top-4 right-6 text-6xl font-bold text-white/5 tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex size-12 items-center justify-center rounded-xl bg-[red]/10 text-[red] ring-1 ring-[red]/30">
                <Icon aria-hidden="true" size={24} />
              </span>
              <div className="relative mt-6 md:mt-auto md:pt-6">
                <h3 className="text-xl font-bold group-first/card:md:text-2xl">
                  {name}
                </h3>
                <p className="mt-3 text-white/80">{description}</p>
              </div>
            </div>
          </li>
        );
      })}
    </SpotlightList>
  );
}

// Each step's segment runs from its icon's centre to the next one's: down the
// icons when stacked, across them from md. The icon, later in paint order,
// covers its end. md:w-full relies on the grid having no gap.
//
// Played on reveal: from md, where the steps share a row, each step waits
// --step for the line to reach it, then its icon pops and its segment draws
// on to the next. Stacked, each plays as it scrolls in. A spark then loops
// along the line, segment by segment, --spark apart. Hovering a step lights
// it and everything before it, and hides the spark. Steps already on screen
// at load, and reduced motion, skip the reveal and start drawn; reduced
// motion has no spark. The spark timings must match spark-x and spark-y in
// globals.css.
function ProcessLine() {
  return (
    <ol className="group/process mt-8 grid md:grid-cols-4">
      {processSteps.map(({ id, name, description }, i) => {
        const Icon = stepIcons[id];
        return (
          <li
            key={id}
            style={{ "--i": i } as CSSProperties}
            className={`group/step relative flex reveal gap-4 pb-8 [--spark:calc(2s+var(--i)*600ms)] [--step:0ms] last:pb-0 md:flex-col md:items-center md:px-3 md:pb-0 md:text-center md:[--reveal-delay:var(--step)] md:[--step:calc(var(--i)*400ms)]`}
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-6 h-full w-px bg-white/10 group-last/step:hidden md:top-6 md:left-1/2 md:h-px md:w-full"
            >
              <span className="absolute inset-0 origin-top bg-[red]/60 group-data-[reveal=shown]/step:animate-step-draw motion-safe:transition-colors md:origin-left [li:has(~li:hover)_&]:bg-[red]" />
              <span className="absolute -inset-x-1 inset-y-0 overflow-hidden group-hover/process:opacity-0 motion-safe:transition-opacity md:inset-x-0 md:-inset-y-1">
                <span className="absolute top-0 left-1 h-1/4 w-px -translate-y-full bg-linear-to-b from-transparent via-[red] to-transparent drop-shadow-[0_0_3px_red] group-data-[reveal=pending]/step:animate-none motion-safe:animate-spark-y md:top-1 md:left-0 md:h-px md:w-1/4 md:-translate-x-full md:translate-y-0 md:bg-linear-to-r md:motion-safe:animate-spark-x" />
              </span>
            </span>
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-[red]/50 bg-black text-[red] group-hover/step:border-[red] group-hover/step:bg-[red]/10 group-hover/step:shadow-[0_0_24px_rgb(255_0_0/0.5)] group-data-[reveal=shown]/step:animate-step-pop motion-safe:transition-[border-color,background-color,box-shadow] motion-safe:duration-300 [li:has(~li:hover)_&]:border-[red] [li:has(~li:hover)_&]:shadow-[0_0_16px_rgb(255_0_0/0.35)]">
              <span className="absolute inset-0 rounded-full border border-[red] opacity-0 group-data-[reveal=shown]/step:animate-step-ping" />
              <Icon aria-hidden="true" size={24} />
            </span>
            <div>
              <h4 className="text-lg font-bold">{name}</h4>
              <p className="mt-1 text-sm text-white/80">{description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// No box: a rule across the top, with a red stretch that runs the full width
// on hover, echoing the process line above.
function Traits() {
  return (
    <ul className="mt-8 grid gap-8 md:grid-cols-3">
      {workingTraits.map(({ id, name, description }, i) => {
        const Icon = traitIcons[id];
        return (
          <li
            key={id}
            style={{ "--i": i } as CSSProperties}
            className="relative reveal border-t border-white/15 pt-6 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:bg-[red] hover:before:w-full motion-safe:before:transition-[width] motion-safe:before:duration-500 md:[--reveal-delay:calc(var(--i)*100ms)]"
          >
            <div className="flex items-center gap-3 text-[red]">
              <Icon aria-hidden="true" size={22} />
              <h4 className="text-lg font-bold text-white">{name}</h4>
            </div>
            <p className="mt-3 text-white/70">{description}</p>
          </li>
        );
      })}
    </ul>
  );
}
