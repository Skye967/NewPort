import Image from "next/image";
import { Fragment } from "react";
import { projects } from "@/content/projects";
import { site, type SectionId } from "@/content/site";

const link =
  "inline-flex items-center gap-1.5 text-white/70 hover:text-white hover:underline";

// Inline rather than an <Image> from public/icons/ so the icons take the
// link's currentColor; the Simple Icons GitHub mark there is filled
// near-black, which disappears on this background.
function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function Projects() {
  const id: SectionId = "projects";

  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-4 py-16">
      <h2 className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-[red] uppercase before:h-px before:w-8 before:bg-[red]">
        {site.projects.heading}
      </h2>
      {projects.map(
        ({
          name,
          description,
          nextStep,
          stack,
          liveUrl,
          repoUrl,
          screenshots,
        }) => (
          <article
            key={name}
            className="mt-8 grid items-center gap-4 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {name}
              </h3>
              <p className="text-white/80">{description}</p>
              <p className="text-white/80">
                <span className="font-semibold text-[red]">
                  {site.projects.nextStepLabel}
                </span>{" "}
                {nextStep}
              </p>
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                  {site.projects.stackLabel}
                </h4>
                <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2">
                  {stack.map(({ group, items }) => (
                    <Fragment key={group}>
                      <dt className="text-sm text-white/60">{group}</dt>
                      <dd>
                        <ul className="flex flex-wrap gap-1.5">
                          {items.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-white/80"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                <li>
                  <a href={liveUrl} className={link}>
                    <ExternalIcon />
                    {site.projects.liveLabel}
                  </a>
                </li>
                {repoUrl && (
                  <li>
                    <a href={repoUrl} className={link}>
                      <GitHubIcon />
                      {site.projects.repoLabel}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            {/* sizes follows from the section's max-w-5xl and px-4 and the
                article's gap-4 and sm:grid-cols-2: 488px columns once the
                section is at full width. */}
            {screenshots.map(({ src, alt }) => (
              <Image
                key={src.src}
                src={src}
                alt={alt}
                sizes="(min-width: 1024px) 488px, (min-width: 640px) calc(50vw - 24px), calc(100vw - 32px)"
                className="rounded-lg border border-white/10"
              />
            ))}
          </article>
        ),
      )}
    </section>
  );
}
