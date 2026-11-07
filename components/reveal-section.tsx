"use client";

import { useEffect, useRef, type ComponentProps } from "react";

const pending = '.reveal[data-reveal="pending"]';

// Sets data-reveal on the section's .reveal elements as they scroll in.
// Scripted hiding rather than a hidden default, so that without JavaScript, or
// under reduced motion, everything simply stays visible. Only what starts
// below the viewport is hidden, so nothing on screen vanishes on hydration.
// Each reveal is one-way: it unobserves and never hides again. Focus reveals
// too, since a browser may scroll a focused link only to the viewport's edge,
// inside the margin the observer ignores, and leave it focused but invisible.
export function RevealSection(props: ComponentProps<"section">) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (isIntersecting) show(target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    function show(element: HTMLElement) {
      element.dataset.reveal = "shown";
      observer.unobserve(element);
    }

    function onFocusIn({ target }: FocusEvent) {
      let element = (target as Element).closest<HTMLElement>(pending);
      while (element) {
        show(element);
        element = element.parentElement?.closest<HTMLElement>(pending) ?? null;
      }
    }

    const root = section.current!;
    for (const element of root.querySelectorAll<HTMLElement>(".reveal")) {
      if (element.getBoundingClientRect().top < innerHeight) continue;
      element.dataset.reveal = "pending";
      observer.observe(element);
    }

    root.addEventListener("focusin", onFocusIn);

    return () => {
      observer.disconnect();
      root.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  return <section {...props} ref={section} />;
}
