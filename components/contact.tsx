import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { site, type SectionId } from "@/content/site";
import background from "@/public/contact-background.webp";

export function Contact() {
  const id: SectionId = "contact";

  return (
    <section
      id={id}
      className="relative isolate [clip-path:polygon(0_0,50%_3rem,100%_0,100%_calc(100%-3rem),50%_100%,0_calc(100%-3rem))]"
    >
      {/* Drawn full width from a 1792px source, so below 2x on wide
          high-density screens; at 30% opacity the softness doesn't show.

          The heading's red needs near-black for 4.5:1, so the image is masked
          out around its line, 6rem to 7.25rem (py-24 plus text-sm's 1.25rem).
          It stays shown down to 3rem so the clip-path's top notch still shows
          against the black behind. Move the stops if py-24 or the heading's
          text-sm changes. */}
      <Image
        src={background}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 mask-[linear-gradient(black_3rem,transparent_5rem,transparent_7.5rem,black_16rem)] object-cover opacity-30"
      />
      {/* py-24 keeps the content clear of the 3rem notches in the clip-path
          above, which cut into the middle of the top edge and the corners of
          the bottom one. */}
      <div className="mx-auto max-w-5xl px-page py-24">
        <h2 className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-[red] uppercase before:h-px before:w-8 before:bg-[red]">
          {site.contact.heading}
        </h2>
        <div className="mt-8">
          <ContactForm copy={site.contact} email={site.email} />
        </div>
      </div>
    </section>
  );
}
