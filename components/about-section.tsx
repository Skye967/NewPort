"use client";

import type { ComponentProps } from "react";
import { RevealSection } from "@/components/reveal-section";
import { useWindowLoaded } from "@/components/use-window-loaded";

// Sets data-loaded once the window has loaded, so About can hold the skill
// icons and the heading face until then. The lazy icons are fetched as soon as
// they come within the browser's lazy-load distance, which About is from the
// first screen.
// Accepted costs: without JavaScript neither appears, and anyone who reaches
// About before load sees the headings reflow when the font swaps in.
export function AboutSection(props: ComponentProps<"section">) {
  const loaded = useWindowLoaded();

  return <RevealSection {...props} data-loaded={loaded || undefined} />;
}
