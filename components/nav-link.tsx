"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

const glyphs = "!<>-_/[]{}=+*^?#$%&";
const decodeMs = 420;
const swapMs = 45;

// On hover or keyboard focus, the label scrambles through red glyphs and
// resolves left to right. The visible glyphs are aria-hidden, so the sr-only
// copy is the label that's read and indexed. The loop stops once every
// character resolves, so no frame stays scheduled at rest. Under reduced
// motion it never starts. The label needs a monospace face, or a glyph wider
// than its letter would reflow the row.
export function NavLink({
  label,
  children,
  ...props
}: ComponentProps<"a"> & { label: string }) {
  // One entry per character: the glyph it shows, or null once resolved.
  const [scramble, setScramble] = useState<(string | null)[] | null>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function decode() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);

    const chars = [...label];
    const start = performance.now();
    let swapped = -Infinity;
    let shown: string[] = [];

    function tick(now: number) {
      if (now - swapped >= swapMs) {
        shown = chars.map(
          () => glyphs[Math.floor(Math.random() * glyphs.length)],
        );
        swapped = now;
      }
      const elapsed = now - start;
      const next = chars.map((char, i) =>
        char === " " || elapsed >= (decodeMs * (i + 1)) / chars.length
          ? null
          : shown[i],
      );
      if (next.every((glyph) => glyph === null)) {
        setScramble(null);
        return;
      }
      setScramble(next);
      frame.current = requestAnimationFrame(tick);
    }

    frame.current = requestAnimationFrame(tick);
  }

  return (
    <a
      {...props}
      onPointerEnter={decode}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) decode();
      }}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        {[...label].map((char, i) => {
          const glyph = scramble?.[i];
          return (
            <span key={i} className={glyph ? "text-[red]" : undefined}>
              {glyph ?? char}
            </span>
          );
        })}
      </span>
      {children}
    </a>
  );
}
