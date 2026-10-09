import { Yatra_One } from "next/font/google";
import Image from "next/image";
import type { CSSProperties } from "react";
import { AboutSection } from "@/components/about-section";
import { bio } from "@/content/bio";
import { site, type SectionId } from "@/content/site";
import { skills } from "@/content/skills";
import background from "@/public/about-background.webp";

// Not preloaded, same as Caveat in the hero: a preload would be fetched ahead
// of the hero photo, which is the LCP element. Exposed as a variable and only
// referenced once About has loaded; see AboutSection.
const yatraOne = Yatra_One({
  subsets: ["latin"],
  weight: "400",
  preload: false,
  variable: "--font-yatra",
});
const yatra = "group-data-loaded/about:font-(family-name:--font-yatra)";

const hexagon =
  "[clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]";

// The highlight goes on an inline span with box-decoration-clone so each
// wrapped line gets its own box; a background on the block would be one
// rectangle.
const bioLine = "mt-2.5 indent-10 text-[15px] leading-[34px]";

function SkillGrid() {
  // Eight 37px half-columns, each tile spanning two. Every seventh tile from
  // the first starts one half-column in, so auto-placement wraps 3-4-3-4-3
  // with the short rows offset by half a tile. Tiles are 76x88 (regular
  // hexagon) so a 60° turn maps each one onto itself.
  // The grid is 310px wide, so with About's px-page padding below sm it only
  // fits between the page edge and SideTab from 358px. Below 360px it is
  // zoomed to 85%, which fits down to about 312px; the accepted cost is
  // 8.5px labels there.
  return (
    <ul className="grid grid-cols-[repeat(8,37px)] justify-center gap-x-0.5 pb-5 max-[360px]:zoom-85 [&>li:nth-child(7n+1)]:col-start-2">
      {skills.map(({ name, icon }) => (
        // The li is the hover target and never moves; only the hexagon inside
        // turns, so the pointer can't drop off a corner mid-turn and flicker.
        // Rows overlap, so near a corner the later tile's box takes the hover.
        // [&:hover] rather than hover: — Tailwind's hover: only applies under
        // (hover: hover), which rules out touch. cursor-pointer, on coarse
        // pointers only, is what makes iOS Safari apply :hover on tap to a
        // non-interactive element.
        // The turning hexagon is raised over its neighbours and stays raised
        // for the 700ms it takes to turn back; it is raised rather than the li
        // so the raised layer is clipped to the hexagon and the overlap band
        // keeps going to the later tile. z-0, not auto, so the change can be
        // delayed at all.
        <li
          key={name}
          className="group col-span-2 -mb-5 h-[88px] w-[76px] pointer-coarse:cursor-pointer"
        >
          <div
            className={`${hexagon} relative z-0 size-full bg-neutral-500 p-px group-[&:hover]:z-1 motion-safe:transition-[rotate,z-index] motion-safe:delay-[0s,700ms] motion-safe:duration-[700ms,0s] motion-safe:group-[&:hover]:rotate-60 motion-safe:group-[&:hover]:delay-0`}
          >
            <div
              className={`${hexagon} flex size-full flex-col items-center justify-center gap-1 bg-linear-to-b from-white to-neutral-400`}
            >
              <span className="size-7">
                <Image
                  src={icon}
                  alt=""
                  width={28}
                  height={28}
                  className="hidden group-data-loaded/about:block"
                />
              </span>
              <span className="text-[10px] text-neutral-700">{name}</span>
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
    // the viewport's centre; centred on the viewport, SkillGrid would only
    // clear SideTab from 390px.
    <AboutSection
      id={id}
      className={`${yatraOne.variable} group/about relative bg-white/80 px-page pt-16 pb-12 sm:px-side-tab-gutter`}
    >
      {/* A flat fill of the image's average colour stands in until load.
          Unpinned, it is drawn at least 896px wide, half the source, for
          high-density screens. Pinned only for a fine primary pointer, since
          iOS and iPadOS Safari ignore background-attachment: fixed; there it
          covers the viewport, roughly 1x because the source is no larger. */}
      <div
        aria-hidden="true"
        style={
          { "--about-background": `url(${background.src})` } as CSSProperties
        }
        className="absolute inset-0 -z-10 bg-[#b5b5ab] bg-size-[max(896px,100%)_auto] bg-top group-data-loaded/about:bg-(image:--about-background) pointer-fine:bg-cover pointer-fine:bg-fixed"
      />
      {/* The white glow out of the hero: solid white from the top of the
          hero's V-shaped clip down to the seam, so the hero's edge meets plain
          white, then fading into the background over 4rem, which pt-16 keeps
          the heading clear of. Its top part is hidden beneath the hero only
          while this section is not a stacking context, so its -z-10 resolves
          in the root context, and no ancestor that isn't one paints a
          background: body's black reaches the canvas only because <html> has
          none. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-hero-notch -z-10 h-[calc(var(--spacing-hero-notch)+4rem)] bg-[linear-gradient(white_var(--spacing-hero-notch),transparent)]"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <h2
          className={`${yatra} mb-5 text-5xl text-white [-webkit-text-stroke:2px_black] text-shadow-[3px_3px_1px_black]`}
        >
          {site.about.heading}
        </h2>
        <p
          className={`${yatra} mb-5 w-3/4 bg-red-600 p-2.5 text-center text-xl`}
        >
          {site.about.tagline}
        </p>
        <div className="flex w-full flex-col gap-10 min-[900px]:flex-row-reverse">
          <div className="flex-1">
            <p className="mb-5 text-center text-xl font-bold text-[#4d4d4d]">
              {site.about.greeting}{" "}
              <span className="text-[red]">{first[0]}</span>
              {first.slice(1)} <span className="text-[red]">{last}</span>
            </p>
            {bio.map((paragraph, i) => (
              <p key={i} className={bioLine}>
                <span className="bg-black/60 box-decoration-clone px-1.5 py-1">
                  {paragraph}
                </span>
              </p>
            ))}
            <p className={bioLine}>
              <span className="bg-[rgb(206_2_2/0.85)] box-decoration-clone px-2.5 py-1">
                {site.about.closing}
              </span>
            </p>
          </div>
          <div>
            <h3
              className={`${yatra} mb-5 text-center text-[40px] text-[#3883fc] [-webkit-text-stroke:2px_black] text-shadow-[1px_1px_1px_black]`}
            >
              {site.about.skillsHeading}
            </h3>
            <SkillGrid />
          </div>
        </div>
      </div>
    </AboutSection>
  );
}
