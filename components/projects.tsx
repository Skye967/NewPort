import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import { Fragment } from "react";
import { projects } from "@/content/projects";
import { site, type SectionId } from "@/content/site";

const link =
  "inline-flex items-center gap-1.5 text-white/70 hover:text-white hover:underline";

export function Projects() {
  const id: SectionId = "projects";

  return (
    <section id={id} className="mx-auto w-full max-w-5xl px-page py-16">
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
                    <IconExternalLink aria-hidden="true" size={16} />
                    {site.projects.liveLabel}
                  </a>
                </li>
                {repoUrl && (
                  <li>
                    <a href={repoUrl} className={link}>
                      <IconBrandGithub aria-hidden="true" size={16} />
                      {site.projects.repoLabel}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            {/* sizes follows from the section's max-w-5xl and px-page, whose
                right padding is --spacing-side-tab-gutter below 70rem, and
                the article's gap-4 and sm:grid-cols-2. */}
            {screenshots.map(({ src, alt }) => (
              <Image
                key={src.src}
                src={src}
                alt={alt}
                sizes="(min-width: 70rem) 488px, (min-width: 1024px) 472px, (min-width: 640px) calc(50vw - 40px), calc(100vw - 64px)"
                className="rounded-lg border border-white/10"
              />
            ))}
          </article>
        ),
      )}
    </section>
  );
}
