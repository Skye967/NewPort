import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  type Icon,
} from "@tabler/icons-react";
import { site, type SocialId } from "@/content/site";

const icons: Record<SocialId, Icon> = {
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
};

// block: a scale transform doesn't apply to an inline box.
const link =
  "block text-white hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:transition-transform motion-safe:duration-300";

// Fixed over the right edge; content keeps clear of it with px-page. Centred
// on the space below the header, so it clears the header down to a viewport
// of header + tab height. z-10: under Nav's z-20 header, so the open menu
// covers it.
export function SideTab() {
  return (
    <nav
      aria-label={site.socialLabel}
      className="fixed top-[calc(50%+var(--spacing-header)/2)] right-0 z-10 w-side-tab -translate-y-1/2 rounded-l-md bg-[red] py-4 print:hidden"
    >
      <ul className="flex flex-col items-center gap-5">
        {site.links.map(({ id, label, href }) => {
          const Icon = icons[id];
          return (
            <li key={id}>
              <a href={href} aria-label={label} className={link}>
                <Icon aria-hidden="true" size={24} />
              </a>
            </li>
          );
        })}
        <li>
          <a
            href={`mailto:${site.email}`}
            aria-label={site.emailLabel}
            className={link}
          >
            <IconMail aria-hidden="true" size={24} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
