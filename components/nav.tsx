import { site } from "@/content/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-10 h-header border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4">
        <a href="#top" className="font-semibold whitespace-nowrap">
          {site.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-4 text-sm">
            {site.nav.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-white/70 hover:text-white hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
