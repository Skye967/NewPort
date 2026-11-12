import type { CSSProperties } from "react";
import { headingFont } from "@/components/heading-font";
import { NavLink } from "@/components/nav-link";
import { NavShell } from "@/components/nav-shell";
import { site } from "@/content/site";

const link =
  "text-white/70 text-shadow-[1px_1px_0_black] hover:text-white focus-visible:text-white motion-safe:transition-colors motion-safe:duration-300";

const links = [
  ...site.nav.map(({ id, label }) => ({
    href: `#${id}`,
    label,
    newTab: false,
  })),
  { href: site.resume.href, label: site.resume.label, newTab: true },
];

function items(className: string, rise: boolean) {
  return links.map(({ href, label, newTab }, i) => (
    <li key={href} className={rise ? "overflow-hidden" : undefined}>
      <NavLink
        href={href}
        target={newTab ? "_blank" : undefined}
        label={label}
        className={className}
        style={rise ? ({ "--i": i } as CSSProperties) : undefined}
      >
        {newTab && (
          <>
            {" "}
            <span className="sr-only">{site.newTabHint}</span>
          </>
        )}
      </NavLink>
    </li>
  ));
}

export function Nav() {
  return (
    <NavShell
      navLabel={site.navLabel}
      menuLabel={site.menuLabel}
      closeMenuLabel={site.closeMenuLabel}
      mark={
        // The visible mark is initials, so the link is named in full.
        <NavLink
          href="#top"
          label={site.mark}
          aria-label={site.name}
          className={`${headingFont.className} block text-lg text-white text-shadow-[2px_2px_0_black]`}
        >
          <span aria-hidden="true" className="text-[red]">
            _
          </span>
        </NavLink>
      }
      inline={items(
        `${headingFont.className} block px-2 py-1.5 text-sm ${link}`,
        false,
      )}
      panel={items(
        `${headingFont.className} inline-block text-5xl tracking-tight text-white hover:text-[red] focus-visible:text-[red] motion-safe:transition-colors motion-safe:duration-300 motion-safe:group-open/menu:animate-menu-rise sm:text-7xl`,
        true,
      )}
    />
  );
}
