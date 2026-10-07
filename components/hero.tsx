import Image from "next/image";
import { HeroParticles } from "@/components/hero-particles";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--spacing-header))] items-end overflow-hidden">
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-black via-black/50 to-transparent" />
      <div className="mx-auto w-full max-w-5xl px-4 pb-16">
        <h1 className="text-4xl font-bold sm:text-6xl">{site.name}</h1>
        <p className="mt-2 text-lg text-white/80 sm:text-xl">{site.title}</p>
        <a
          href={`#${site.hero.cta.target}`}
          className="mt-6 inline-block rounded-md bg-red-600 px-5 py-3 font-semibold hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {site.hero.cta.label}
        </a>
      </div>
    </section>
  );
}
