import { Fragment } from "react";
import { eyebrow, intro, tagline } from "@/components/eyebrow";
import { headingFont } from "@/components/heading-font";
import { RevealSection } from "@/components/reveal-section";
import { bio } from "@/content/bio";
import { site, type SectionId } from "@/content/site";

export function About() {
  const id: SectionId = "about";
  const [first, last] = site.name.split(" ");

  return (
    <RevealSection id={id} className="mx-auto w-full max-w-5xl px-page py-16">
      <h2 className={`${eyebrow} reveal`}>{site.about.heading}</h2>
      <p className={tagline}>{site.about.tagline}</p>
      <p className={intro}>{site.about.intro}</p>
      <div className="mt-10 grid gap-10 md:grid-cols-5">
        <div className="reveal md:col-span-2">
          <p className={`${headingFont.className} text-sm text-white/60`}>
            <span aria-hidden="true" className="mr-[1ch] text-[red]">
              $
            </span>
            {site.about.prompt}
          </p>
          <p
            className={`${headingFont.className} mt-2 text-4xl tracking-tight sm:text-5xl`}
          >
            {first} <span className="text-[red]">{last}</span>
          </p>
          <ul className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-6">
            {site.about.facts.map((fact) => (
              <li
                key={fact}
                className={`${headingFont.className} flex items-start gap-3 text-sm text-white/70 before:mt-[7px] before:size-1.5 before:shrink-0 before:bg-[red]`}
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative pl-6 md:col-span-3">
          <BioRule />
          <div className="flex max-w-[65ch] flex-col gap-6 text-[17px] leading-relaxed text-white/80">
            {bio.map((paragraph, i) => (
              <Fragment key={i}>
                <p className="reveal">{paragraph}</p>
                {i === 0 && (
                  // aria-hidden: the quote repeats a line of the bio, which
                  // screen readers have just read.
                  <p
                    aria-hidden="true"
                    className="w-fit reveal bg-linear-to-r from-[#b5b5ab] to-[red] bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl"
                  >
                    {site.about.pullQuote}
                  </p>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

// A rule down the bio's left edge that draws downward when it scrolls in, then
// a spark runs down it on a loop, as on the Process line in Core Strengths.
// The spark rides a wrapper the rule's full height, translated from -100% to
// 100%, so it crosses the whole rule whatever the bio's length. A rule already
// on screen at load, and reduced motion, start drawn; reduced motion has no
// spark.
function BioRule() {
  return (
    <span
      aria-hidden="true"
      className="group/rule absolute inset-y-0 left-0 w-px reveal bg-white/10"
    >
      <span className="absolute inset-0 origin-top bg-[red]/60 group-data-[reveal=shown]/rule:animate-rule-draw" />
      <span className="absolute -inset-x-1 inset-y-0 overflow-hidden">
        <span className="absolute inset-0 -translate-y-full group-data-[reveal=pending]/rule:animate-none motion-safe:animate-rule-spark">
          <span className="absolute bottom-0 left-1 h-20 w-px bg-linear-to-b from-transparent via-[red] to-transparent drop-shadow-[0_0_3px_red]" />
        </span>
      </span>
    </span>
  );
}
