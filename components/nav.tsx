import Image from "next/image";
import { NavMenu } from "@/components/nav-menu";
import { site } from "@/content/site";
import logo from "@/public/logo.webp";

// Only colour changes on the text, and the underline is absolutely
// positioned, so hovering or focusing never reflows the row.
const link =
  "relative text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[red] after:opacity-0 hover:text-[blue] hover:after:translate-y-1.5 hover:after:opacity-100 focus-visible:text-[blue] focus-visible:after:translate-y-1.5 focus-visible:after:opacity-100 motion-safe:transition-colors motion-safe:duration-300 motion-safe:after:transition-[opacity,translate] motion-safe:after:duration-300";

export function Nav() {
  return (
    // z-20 so the open menu paints over SideTab, which is z-10.
    <header className="sticky top-0 z-20 h-header border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="flex h-full items-center justify-between gap-4 px-4">
        <a href="#top">
          {/* Not preloaded: it would be fetched ahead of the hero photo, the
              LCP element. */}
          <Image
            src={logo}
            alt={site.name}
            loading="eager"
            className="h-10 w-auto hover:scale-110 motion-safe:transition-transform motion-safe:duration-300"
          />
        </a>
        <NavMenu navLabel={site.navLabel} menuLabel={site.menuLabel}>
          <ul className="flex flex-col items-center gap-4 py-5 text-sm md:flex-row md:flex-wrap md:justify-end md:gap-y-2 md:py-0">
            {site.nav.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className={link}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.resume.href} target="_blank" className={link}>
                {site.resume.label}{" "}
                <span className="sr-only">{site.resume.newTabHint}</span>
              </a>
            </li>
          </ul>
        </NavMenu>
      </div>
    </header>
  );
}
