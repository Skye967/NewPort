import { Caveat } from "next/font/google";
import Image from "next/image";
import { HeroParticles } from "@/components/hero-particles";
import { site } from "@/content/site";

// Not preloaded: a preload is fetched ahead of the hero photo, which is the
// LCP element. The cost is a swap from the fallback font when Caveat arrives,
// which can rewrap the title.
const caveat = Caveat({ subsets: ["latin"], weight: "700", preload: false });

const charMs = 50;
const lineGapMs = 300;

// The visible glyphs are ::before content in an aria-hidden subtree, so the
// sr-only copy is the only text: what's read, indexed and found. Accepted
// costs: the visible title can't be selected or machine-translated, and
// find-in-page highlights nothing visible.
function Typed({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((char, i) => (
          <span
            key={i}
            data-char={char}
            className="before:content-[attr(data-char)] motion-safe:not-print:animate-type-in"
            style={{ animationDelay: `${delay + i * charMs}ms` }}
          />
        ))}
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
        className={`${caveat.className} pointer-events-none mx-auto max-w-5xl px-4 pt-12 pb-hero-notch sm:pt-16`}
      >
        <h1 className="text-3xl text-shadow-[3px_3px_0_black] sm:text-5xl">
          <Typed text={site.hero.greeting} />
        </h1>
        <p className="mt-2 text-xl text-red-500 text-shadow-[2px_2px_0_black] sm:text-3xl">
          <Typed
            text={site.title}
            delay={[...site.hero.greeting].length * charMs + lineGapMs}
          />
        </p>
      </div>
    </section>
  );
}
