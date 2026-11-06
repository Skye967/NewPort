"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ComponentProps,
} from "react";

function subscribe(onChange: () => void) {
  addEventListener("load", onChange);
  return () => removeEventListener("load", onChange);
}

// Sets data-loaded once the window's load event has fired, so About can hold
// its decorative assets until then: the background image, the skill icons and
// the heading face. The background and the font are fetched as soon as they
// are styled, below the fold or not, and the lazy icons as soon as they come
// within the browser's lazy-load distance, which About is from the first
// screen; alongside the hero photo they push back LCP.
// Accepted costs: without JavaScript none of the three appears; anyone who
// reaches About before load sees the headings reflow when the font swaps in;
// and reloading with the scroll restored into About makes the late background
// the page's LCP.
export function AboutSection(props: ComponentProps<"section">) {
  const loaded = useSyncExternalStore(
    subscribe,
    () => document.readyState === "complete",
    () => false,
  );

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
