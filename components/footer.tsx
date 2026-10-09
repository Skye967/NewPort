import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <ul className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 px-page py-6 text-sm">
        {site.links.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="text-white/70 hover:text-white hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${site.email}`}
            className="break-all text-white/70 hover:text-white hover:underline"
          >
            {site.email}
          </a>
        </li>
      </ul>
    </footer>
  );
}
