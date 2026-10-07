import { site } from "@/content/site";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4">
      {site.nav.map(({ id, label }) => (
        <section key={id} id={id} className="py-16">
          <h2 className="text-2xl font-semibold">{label}</h2>
        </section>
      ))}
    </main>
  );
}
