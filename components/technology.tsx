import type { CSSProperties } from "react";
import { eyebrow, intro, tagline } from "@/components/eyebrow";
import { headingFont } from "@/components/heading-font";
import { RevealSection } from "@/components/reveal-section";
import { SpotlightList } from "@/components/spotlight-list";
import { site, type SectionId } from "@/content/site";
import { skillGroups } from "@/content/skills";

// The tile's outline in TechStacks is drawn twice: clipped with this, and as
// the matching SVG polygon in hexagonOutline. Change both together.
const hexagon =
  "[clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]";
const hexagonOutline = "50,0 100,25 100,75 50,100 0,75 0,25";

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

function Lattice({
  id,
  cellClassName,
  className,
}: {
  id: string;
  cellClassName: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 size-full ${className ?? ""}`}
    >
      <defs>
        <pattern id={id} width={78} height={136} patternUnits="userSpaceOnUse">
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
              className={cellClassName}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// A red copy of the lattice, seen only through a ring that grows out from the
// tiles once, after the first one reveals. --ripple is the ring's outer
// radius, animated by lattice-ripple in globals.css; the gradient stops are
// the ring's soft inner edge and its width. The trigger is :has() on the
// section, so the ripple needs no script of its own, and plays only when the
// tiles do.
const ripple =
  "radial-gradient(circle at 50% 60%, transparent calc(var(--ripple) - 160px), black calc(var(--ripple) - 60px), transparent var(--ripple))";

function LatticeRipple() {
  return (
    <div
      aria-hidden="true"
      style={{ maskImage: ripple, WebkitMaskImage: ripple }}
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 motion-safe:group-has-[[data-hex][data-reveal=shown]]/tech:animate-lattice-ripple"
    >
      <Lattice
        id="technology-lattice-ripple"
        cellClassName="fill-none stroke-[red]/60"
      />
    </div>
  );
}

// One entry per skillGroups entry, in order. From sm the tiles sit on a true
// honeycomb, so neighbours face each other along parallel edges 12px apart:
// two, one, two; then from 70rem three over two. Each tile spans two 136px
// tracks, half of its 260px width plus the gap, so the next row shifts half a
// tile across; it rises by 64px, the 300px tile height less the 236px row
// step, (260 + 12) × sin 60°. Change these with the tile size in TechStacks.
//
// Below sm a honeycomb is too wide, so the tiles zigzag instead, and their
// facing edges stay parallel but slide past each other. The 30px rise keeps
// the gap near 12px across the column widths up to max-w-76. Below 22rem the
// zigzag is too narrow for a hexagon's tip to clear the labels above it, so
// they barely touch. The delays apply only where tiles share a row.
const placement = [
  "justify-self-start",
  "-mt-1 min-[22rem]:-mt-[30px] justify-self-end sm:mt-0 sm:[--reveal-delay:150ms]",
  "-mt-1 min-[22rem]:-mt-[30px] justify-self-start sm:col-start-2 sm:-mt-16 min-[70rem]:col-start-auto min-[70rem]:mt-0 min-[70rem]:[--reveal-delay:300ms]",
  "-mt-1 min-[22rem]:-mt-[30px] justify-self-end sm:col-start-1 sm:-mt-16 min-[70rem]:col-start-2 min-[70rem]:[--reveal-delay:450ms]",
  "-mt-1 min-[22rem]:-mt-[30px] justify-self-start sm:-mt-16 sm:[--reveal-delay:150ms] min-[70rem]:[--reveal-delay:600ms]",
];

function TechStacks() {
  // The hover target is the hexagon, since clip-path also clips hit testing,
  // and the overlaps would otherwise go to the later tile; for the same reason
  // the unclipped li takes no pointer events. Hover keeps the tile dark: its
  // edge turns red, a red glow follows the pointer, and the logos turn red.
  // [&:hover] rather than hover: — Tailwind's hover: only applies under
  // (hover: hover), which rules out touch. cursor-pointer, on coarse pointers
  // only, is what makes iOS Safari apply :hover on tap to a non-interactive
  // element.
  //
  // Played on reveal: the outline draws in red, the tile fills in behind it,
  // then its logos pop in; see hex-draw in globals.css. Tiles already on
  // screen at load, and reduced motion, skip it and start drawn.
  //
  // Logos are masks over a solid fill rather than images, so they take the
  // tile's colour instead of their brand colours, several of which are near
  // black. Labels are monospace, tracked in so the longest names fit a 68px
  // slot; three slots and their gaps to a row need the narrow padding below sm.
  return (
    <SpotlightList className="group/stacks mx-auto grid max-w-76 grid-cols-1 sm:max-w-none sm:grid-cols-[repeat(4,136px)] sm:justify-center min-[70rem]:grid-cols-[repeat(6,136px)]">
      {skillGroups.map(({ name, skills }, i) => {
        return (
          <li
            key={name}
            className={`${placement[i]} pointer-events-none relative group-has-[[data-tile]:hover]/stacks:opacity-60 has-[[data-tile]:hover]:z-10 has-[[data-tile]:hover]:opacity-100! motion-safe:transition-opacity motion-safe:duration-300 sm:col-span-2 sm:justify-self-center`}
          >
            <div data-hex className="group/hex relative reveal">
              <div
                data-tile
                className={`${hexagon} group pointer-events-auto h-65 w-56 bg-white/35 p-px motion-safe:transition-[scale,background-color] motion-safe:duration-300 motion-safe:group-data-[reveal=shown]/hex:animate-hex-fill sm:h-75 sm:w-65 pointer-coarse:cursor-pointer [&:hover]:bg-[red] motion-safe:[&:hover]:scale-105`}
              >
                <div
                  className={`${hexagon} relative flex size-full flex-col items-center justify-center gap-2 bg-linear-to-b from-neutral-700 to-neutral-900 px-1 sm:px-3`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(220px_circle_at_var(--x)_var(--y),rgb(255_0_0/0.22),transparent_70%)] opacity-0 group-[&:hover]:opacity-100 motion-safe:transition-opacity motion-safe:duration-300"
                  />
                  <h3
                    className={`${headingFont.className} relative text-xl text-white`}
                  >
                    {name}
                  </h3>
                  <ul className="relative flex flex-wrap justify-center gap-x-1 gap-y-1.5 sm:gap-x-1.5">
                    {skills.map((skill, j) => {
                      const mask = `url(${skill.icon.src})`;
                      return (
                        <li
                          key={skill.name}
                          style={{ "--j": j } as CSSProperties}
                          className="flex w-17 flex-col items-center gap-1 motion-safe:group-data-[reveal=shown]/hex:animate-hex-pop sm:w-18"
                        >
                          <span
                            aria-hidden="true"
                            style={{ maskImage: mask, WebkitMaskImage: mask }}
                            className={`size-6 bg-white mask-contain mask-center mask-no-repeat group-[&:hover]:bg-[red] motion-safe:transition-colors motion-safe:duration-300`}
                          />
                          <span
                            className={`${headingFont.className} text-center text-xs tracking-tighter text-white`}
                          >
                            {skill.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 size-full overflow-visible opacity-0 motion-safe:group-data-[reveal=shown]/hex:animate-hex-draw"
              >
                <polygon
                  points={hexagonOutline}
                  pathLength={1}
                  strokeDasharray={1}
                  vectorEffect="non-scaling-stroke"
                  className="fill-none stroke-[red] stroke-2"
                />
              </svg>
            </div>
          </li>
        );
      })}
    </SpotlightList>
  );
}

export function Technology() {
  const id: SectionId = "technology";

  // The header lines up with the other sections' columns. Below sm,
  // px-page's asymmetric padding centres the column 1rem left of the
  // viewport's centre, which keeps TechStacks clear of SideTab. From sm until
  // px-page turns symmetric at 70rem, TechStacks' extra left padding centres
  // it on the viewport instead.
  return (
    <RevealSection
      id={id}
      className="group/tech relative isolate overflow-clip px-page py-16"
    >
      <Lattice
        id="technology-lattice"
        cellClassName="fill-white/3 stroke-white/15"
        className="mask-[radial-gradient(circle_900px_at_50%_65%,black,transparent),linear-gradient(transparent,black_4rem,black_calc(100%-4rem),transparent)] [mask-composite:intersect]"
      />
      <LatticeRipple />
      <div className="mx-auto max-w-5xl">
        <h2 className={`${eyebrow} reveal`}>{site.technology.heading}</h2>
        <p className={tagline}>{site.technology.tagline}</p>
        <p className={intro}>{site.technology.intro}</p>
        <div className="mt-10 sm:pl-8 min-[70rem]:pl-0">
          <TechStacks />
        </div>
      </div>
    </RevealSection>
  );
}
