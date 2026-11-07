import { headingFont } from "@/components/heading-font";
import { RevealSection } from "@/components/reveal-section";
import { bio } from "@/content/bio";
import { site, type SectionId } from "@/content/site";

const bioLine = "reveal mt-2.5 indent-10 text-[15px] leading-[34px]";

export function About() {
  const id: SectionId = "about";
  const [first, last] = site.name.split(" ");

  return (
    <RevealSection
      id={id}
      className="px-page pt-16 pb-12 sm:px-side-tab-gutter"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <h2
          className={`${headingFont.className} mb-5 reveal text-5xl tracking-tight text-white`}
        >
          {site.about.heading}
        </h2>
        <p
          className={`${headingFont.className} mb-5 reveal text-center text-xl`}
        >
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
      </div>
    </RevealSection>
  );
}
