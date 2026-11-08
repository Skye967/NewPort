"use client";

import type { ComponentProps, PointerEvent } from "react";

// Tracks the pointer over each of the list's own li as --x and --y, relative
// to that li, for a glow that follows it. Only direct children count, so an
// item can hold a list of its own. Without JavaScript or a hovering pointer
// the glow simply never shows.
export function SpotlightList(props: ComponentProps<"ul">) {
  function onPointerMove(e: PointerEvent<HTMLUListElement>) {
    const target = e.target as Node;
    const item = [...e.currentTarget.children].find((child) =>
      child.contains(target),
    ) as HTMLElement | undefined;
    if (!item) return;
    const { left, top } = item.getBoundingClientRect();
    item.style.setProperty("--x", `${e.clientX - left}px`);
    item.style.setProperty("--y", `${e.clientY - top}px`);
  }

  return <ul {...props} onPointerMove={onPointerMove} />;
}
