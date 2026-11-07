import Image from "next/image";
import type { CSSProperties } from "react";
import { headingFont } from "@/components/heading-font";
import { HeroParticles } from "@/components/hero-particles";
import { site } from "@/content/site";

const charMs = 50;
const lineGapMs = 300;

const cursorBox =
  "after:absolute after:top-0 after:left-full after:h-full after:w-[1ch] after:bg-current after:opacity-0 print:after:hidden";

// The visible glyphs are ::before content in an aria-hidden subtree, so the
// sr-only copy is the only text: what's read, indexed and found. Accepted
// costs: the visible title can't be selected or machine-translated, and
// find-in-page highlights nothing visible.
// The cursor is one ::after per character, each shown only while its character
// is the newest, so it needs no script. The last character of a line holds it
// for holdMs. With endsTyping, the last character blinks it five times instead,
// and the cursor ends hidden. Under reduced motion no cursor shows.
function Typed({
  text,
  delay = 0,
  holdMs = charMs,
  endsTyping = false,
}: {
  text: string;
  delay?: number;
  holdMs?: number;
  endsTyping?: boolean;
}) {
  const chars = [...text];
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, i) => {
          const last = i === chars.length - 1;
          return (
            <span
              key={i}
              data-char={char}
              className={`relative before:content-[attr(data-char)] motion-safe:not-print:animate-type-in ${cursorBox} ${
                last && endsTyping
                  ? "motion-safe:not-print:after:animate-cursor-blink"
                  : "motion-safe:not-print:after:animate-cursor-step"
              }`}
              style={
                {
                  animationDelay: `${delay + i * charMs}ms`,
                  "--type-delay": `${delay + i * charMs}ms`,
                  "--cursor-ms": `${last ? holdMs : charMs}ms`,
                } as CSSProperties
              }
            />
          );
        })}
      </span>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative isolate min-h-hero overflow-hidden [clip-path:polygon(100%_0,100%_calc(100%-var(--spacing-hero-notch)),50%_100%,0_calc(100%-var(--spacing-hero-notch)),0_0)]">
      <Image
        src={site.hero.photo.src}
        alt={site.hero.photo.alt}
        fill
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <HeroParticles />
      </div>
      {/* The bottom padding only matters when large text makes the title
          outgrow the hero: it keeps the text above the V crop. */}
      <div
        className={`${headingFont.className} pointer-events-none px-page pt-4 pb-hero-notch`}
      >
        <h1 className="text-base text-shadow-[2px_2px_0_black] min-[390px]:text-lg sm:text-3xl lg:text-5xl">
          <span aria-hidden="true" className="mr-[1ch] text-red-500">
            $
          </span>
          <Typed text={site.hero.greeting} holdMs={charMs + lineGapMs} />
        </h1>
        <p className="mt-2 text-sm text-red-500 text-shadow-[2px_2px_0_black] min-[390px]:text-base sm:text-xl lg:text-3xl">
          <Typed
            text={site.title}
            delay={[...site.hero.greeting].length * charMs + lineGapMs}
            endsTyping
          />
        </p>
      </div>
    </section>
  );
}
