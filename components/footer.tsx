import { IconMail } from "@tabler/icons-react";
import { socialIcons } from "@/components/social-icons";
import { site } from "@/content/site";

const link =
  "inline-flex items-center gap-1.5 text-white/70 hover:text-white hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <ul className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 px-page py-6 text-sm">
        {site.links.map(({ id, label, href }) => {
          const Icon = socialIcons[id];
          return (
            <li key={id}>
              <a href={href} target="_blank" className={link}>
                <Icon aria-hidden="true" size={16} />
                {label} <span className="sr-only">{site.newTabHint}</span>
              </a>
            </li>
          );
        })}
        <li>
          <a href={`mailto:${site.email}`} className={link}>
            <IconMail aria-hidden="true" size={16} />
            {site.emailLabel}
          </a>
        </li>
      </ul>
    </footer>
  );
}
