import { ContactForm } from "@/components/contact-form";
import { ContactWind } from "@/components/contact-wind";
import { site, type SectionId } from "@/content/site";
import { eyebrow } from "@/components/eyebrow";

export function Contact() {
  const id: SectionId = "contact";

  return (
    <section
      id={id}
      className="relative isolate [clip-path:polygon(0_0,50%_3rem,100%_0,100%_calc(100%-3rem),50%_100%,0_calc(100%-3rem))]"
    >
      {/* The heading's red needs near-black for 4.5:1, so the lines are masked
          out around its line, 6rem to 7.25rem (py-24 plus text-sm's 1.25rem).
          Move the stops if py-24 or the heading's text-sm changes. */}
      <ContactWind className="absolute inset-0 -z-10 size-full mask-[linear-gradient(black_3rem,transparent_5rem,transparent_7.5rem,black_16rem)]" />
      {/* py-24 keeps the content clear of the 3rem notches in the clip-path
          above, which cut into the middle of the top edge and the corners of
          the bottom one. */}
      <div className="mx-auto max-w-5xl px-page py-24">
        <h2 className={eyebrow}>{site.contact.heading}</h2>
        <div className="mt-8">
          <ContactForm copy={site.contact} email={site.email} />
        </div>
      </div>
    </section>
  );
}
