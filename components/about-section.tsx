"use client";

import { useSyncExternalStore, type ComponentProps } from "react";

function subscribe(onChange: () => void) {
  addEventListener("load", onChange);
  return () => removeEventListener("load", onChange);
}

// Sets data-loaded once the window's load event has fired, so About can hold
// its decorative assets until then: the background image, the skill icons and
// the Yatra One face. The background and the font are fetched as soon as they
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

  return <section {...props} data-loaded={loaded || undefined} />;
}
