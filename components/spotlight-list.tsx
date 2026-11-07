"use client";

import type { ComponentProps, PointerEvent } from "react";

// Tracks the pointer over each li as --x and --y, relative to that li, for a
// glow that follows it. Without JavaScript or a hovering pointer the glow
// simply never shows.
export function SpotlightList(props: ComponentProps<"ul">) {
  function onPointerMove(e: PointerEvent<HTMLUListElement>) {
    const item = (e.target as Element).closest("li");
    if (!item) return;
    const { left, top } = item.getBoundingClientRect();
    item.style.setProperty("--x", `${e.clientX - left}px`);
    item.style.setProperty("--y", `${e.clientY - top}px`);
  }

  return <ul {...props} onPointerMove={onPointerMove} />;
}
