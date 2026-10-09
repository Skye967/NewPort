import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Projects />
      <div className="mx-auto w-full max-w-5xl px-4">
        {site.nav
          .filter(({ id }) => id === "contact")
          .map(({ id, label }) => (
            <section key={id} id={id} className="py-16">
              <h2 className="text-2xl font-semibold">{label}</h2>
            </section>
          ))}
      </div>
    </main>
  );
}
