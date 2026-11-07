import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { CoreStrengths } from "@/components/core-strengths";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Technology } from "@/components/technology";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <CoreStrengths />
      <Projects />
      <Technology />
      <Contact />
    </main>
  );
}
