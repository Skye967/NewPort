"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import { useWindowLoaded } from "@/components/use-window-loaded";

// Sets data-loaded once the window has loaded, so About can hold the skill
// icons and the heading face until then. The lazy icons are fetched as soon as
// they come within the browser's lazy-load distance, which About is from the
// first screen.
// Accepted costs: without JavaScript neither appears, and anyone who reaches
// About before load sees the headings reflow when the font swaps in.
export function AboutSection(props: ComponentProps<"section">) {
  const loaded = useWindowLoaded();

  const section = useRef<HTMLElement>(null);

  // Scripted hiding rather than a hidden default, so that without JavaScript,
  // or under reduced motion, everything simply stays visible. Only what starts
  // below the viewport is hidden, so nothing on screen vanishes on hydration.
  // Each reveal is one-way: it unobserves and never hides again.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (!isIntersecting) continue;
          (target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const element of section.current!.querySelectorAll<HTMLElement>(
      ".reveal",
    )) {
      if (element.getBoundingClientRect().top < innerHeight) continue;
      element.dataset.reveal = "pending";
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return <section {...props} ref={section} data-loaded={loaded || undefined} />;
}
