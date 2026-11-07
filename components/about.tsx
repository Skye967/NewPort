import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import { AboutSection } from "@/components/about-section";
import { bio } from "@/content/bio";
import { site, type SectionId } from "@/content/site";
import { skillGroups } from "@/content/skills";

// Not preloaded, same as the hero's font: a preload would be fetched ahead
// of the hero photo, which is the LCP element. Exposed as a variable and only
// referenced once About has loaded; see AboutSection.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "600",
  preload: false,
  variable: "--font-heading",
});
const heading =
  "font-semibold group-data-loaded/about:font-(family-name:--font-heading)";

const hexagon =
  "[clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]";

const bioLine = "reveal mt-2.5 indent-10 text-[15px] leading-[34px]";

function hexagonPoints(x: number, y: number) {
  return [
    [x + 38, y],
    [x + 76, y + 22],
    [x + 76, y + 66],
    [x + 38, y + 88],
    [x, y + 66],
    [x, y + 22],
  ].join(" ");
}

function Lattice() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 size-full mask-[radial-gradient(circle_900px_at_50%_65%,black,transparent),linear-gradient(transparent,black_4rem,black_calc(100%-4rem),transparent)] [mask-composite:intersect]"
    >
      <defs>
        <pattern
          id="about-lattice"
          width={78}
          height={136}
          patternUnits="userSpaceOnUse"
        >
          {[
            [1, 0],
            [-38, 68],
            [40, 68],
            [-38, -68],
            [40, -68],
          ].map(([x, y]) => (
            <polygon
              key={`${x},${y}`}
              points={hexagonPoints(x, y)}
              className="fill-white/3 stroke-white/15"
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#about-lattice)" />
    </svg>
  );
}

// One entry per skillGroups entry, in order: a zigzag down the page, then two
// staggered pairs from sm, then one staggered row. The negative margins are
// what make the hexagons nest and overlap; each depends on the hexagon height
// in TechStacks and the 90px drop. The delay only applies where they share a row. Below 22rem the zigzag is too narrow for a
// hexagon's tip to clear the labels above it, so they barely touch.
const stagger = [
  "justify-self-start",
  "-mt-1 min-[22rem]:-mt-6 justify-self-end sm:mt-[90px] sm:justify-self-auto min-[70rem]:[--reveal-delay:100ms]",
  "-mt-1 min-[22rem]:-mt-6 justify-self-start sm:-mt-[120px] sm:justify-self-auto min-[70rem]:mt-0 min-[70rem]:[--reveal-delay:200ms]",
  "-mt-1 min-[22rem]:-mt-6 justify-self-end sm:-mt-[30px] sm:justify-self-auto min-[70rem]:mt-[90px] min-[70rem]:[--reveal-delay:300ms]",
];

function TechStacks() {
  // Hover turns a tile light so the near-black logos stay visible in their
  // brand colour. The hover target is the hexagon, since clip-path also clips
  // hit testing, and the overlaps would otherwise go to the later tile; for the
  // same reason the unclipped li takes no pointer events.
  // [&:hover] rather than hover: — Tailwind's hover: only applies under
  // (hover: hover), which rules out touch. cursor-pointer, on coarse pointers
  // only, is what makes iOS Safari apply :hover on tap to a non-interactive
  // element.
  return (
    <ul className="group/stacks mx-auto grid max-w-76 grid-cols-1 sm:max-w-none sm:grid-cols-[repeat(2,248px)] sm:justify-center min-[70rem]:grid-cols-[repeat(4,248px)]">
      {skillGroups.map(({ name, skills }, i) => (
        <li
          key={name}
          className={`${stagger[i]} pointer-events-none relative group-has-[[data-tile]:hover]/stacks:opacity-60 has-[[data-tile]:hover]:z-10 has-[[data-tile]:hover]:opacity-100! motion-safe:transition-opacity motion-safe:duration-300 sm:-mx-1.5`}
        >
          <div className="reveal">
            <div
              data-tile
              className={`${hexagon} group pointer-events-auto h-65 w-56 bg-white/35 p-px motion-safe:transition-[scale,background-color] motion-safe:duration-300 sm:h-75 sm:w-65 pointer-coarse:cursor-pointer [&:hover]:bg-[red] motion-safe:[&:hover]:scale-105`}
            >
              <div
                className={`${hexagon} flex size-full flex-col items-center justify-center gap-2 bg-linear-to-b from-neutral-700 to-neutral-900 px-3 group-[&:hover]:from-white group-[&:hover]:to-neutral-300 motion-safe:transition-colors motion-safe:duration-300`}
              >
                <h4
                  className={`${heading} text-xl text-white group-[&:hover]:text-neutral-900`}
                >
                  {name}
                </h4>
                <ul className="flex flex-wrap justify-center gap-y-1.5">
                  {skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex w-15 flex-col items-center gap-1"
                    >
                      <span className="size-6">
                        <Image
                          src={skill.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="hidden brightness-0 invert group-data-loaded/about:block group-[&:hover]:filter-none"
                        />
                      </span>
                      <span className="text-[11px] text-white group-[&:hover]:text-neutral-800">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  const id: SectionId = "about";
  const [first, last] = site.name.split(" ");

  return (
    // Below sm, px-page's asymmetric padding centres the column 1rem left of
    // the viewport's centre, which keeps TechStacks clear of SideTab.
    <AboutSection
      id={id}
      className={`${jetBrainsMono.variable} group/about relative isolate overflow-clip px-page pt-16 pb-12 sm:px-side-tab-gutter`}
    >
      <Lattice />
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <h2
          className={`${heading} mb-5 reveal text-5xl tracking-tight text-white`}
        >
          {site.about.heading}
        </h2>
        <p className={`${heading} mb-5 reveal text-center text-xl`}>
          {site.about.tagline}
        </p>
        <div className="w-full max-w-2xl">
          <p className="mb-5 reveal text-center text-xl font-bold text-white">
            {site.about.greeting} <span className="text-[red]">{first[0]}</span>
            {first.slice(1)} <span className="text-[red]">{last}</span>
          </p>
          {bio.map((paragraph, i) => (
            <p key={i} className={bioLine}>
              {paragraph}
            </p>
          ))}
          <p className={bioLine}>{site.about.closing}</p>
        </div>
        <div className="mt-12 w-full">
          <h3
            className={`${heading} mb-8 reveal text-center text-[40px] text-white`}
          >
            {site.about.skillsHeading}
          </h3>
          <TechStacks />
        </div>
      </div>
    </AboutSection>
  );
}
