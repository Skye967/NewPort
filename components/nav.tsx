import Image from "next/image";
import { headingFont } from "@/components/heading-font";
import { NavLink } from "@/components/nav-link";
import { NavMenu } from "@/components/nav-menu";
import { site } from "@/content/site";
import logo from "@/public/logo.webp";

const link =
  "text-white/70 hover:text-white focus-visible:text-white motion-safe:transition-colors motion-safe:duration-300";

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
          <ul
            className={`${headingFont.className} flex flex-col items-center gap-4 py-5 text-sm md:flex-row md:flex-wrap md:justify-end md:gap-y-2 md:py-0`}
          >
            {site.nav.map(({ id, label }) => (
              <li key={id}>
                <NavLink href={`#${id}`} label={label} className={link} />
              </li>
            ))}
            <li>
              <NavLink
                href={site.resume.href}
                target="_blank"
                label={site.resume.label}
                className={link}
              >
                {" "}
                <span className="sr-only">{site.newTabHint}</span>
              </NavLink>
            </li>
          </ul>
        </NavMenu>
      </div>
    </header>
  );
}
