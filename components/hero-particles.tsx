"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

// ssr: false keeps tsparticles out of the server HTML and the initial JS; the
// chunk is requested after hydration. A failed load renders nothing: the
// effect is decorative and must not take the page down with it.
const Particles = dynamic(
  () => import("./particles").then((m) => m.Particles).catch(() => () => null),
  { ssr: false },
);

const reducedMotion = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = matchMedia(reducedMotion);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function HeroParticles() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => matchMedia(reducedMotion).matches,
    () => true,
  );

  return reduced ? null : <Particles />;
}
