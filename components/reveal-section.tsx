"use client";

import { useEffect, useRef, type ComponentProps } from "react";

// Sets data-reveal on the section's .reveal elements as they scroll in.
// Scripted hiding rather than a hidden default, so that without JavaScript, or
// under reduced motion, everything simply stays visible. Only what starts
// below the viewport is hidden, so nothing on screen vanishes on hydration.
// Each reveal is one-way: it unobserves and never hides again.
export function RevealSection(props: ComponentProps<"section">) {
  const section = useRef<HTMLElement>(null);

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

  return <section {...props} ref={section} />;
}
