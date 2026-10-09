"use client";

import { IconMenu2 } from "@tabler/icons-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// The links are server-rendered children, rendered once and only hidden below
// md while closed, so aria-controls always points at an element. Open state
// survives a resize: from md it changes nothing, but narrowing again shows the
// menu still open. The links can't take handlers,
// so the wrapper closes the menu on an unmodified click that lands on a link.
// Accepted cost: below md the links work only once this has hydrated. Without
// JavaScript the sections are still reached by scrolling, but the Resume link,
// which appears nowhere else, is not.
export function NavMenu({
  navLabel,
  menuLabel,
  children,
}: {
  navLabel: string;
  menuLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Safari doesn't focus a button on click, so while the menu is open focus
  // may still be on body: a tap outside blurs nothing, and Escape's keydown
  // never reaches the nav. Both are listened for on the document. A pointerup
  // outside closes it, as with a native popover; a scroll swipe ends in
  // pointercancel, so it doesn't.
  useEffect(() => {
    if (!open) return;
    function onPointerUp(e: PointerEvent) {
      if (!nav.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    }
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <nav
      ref={nav}
      aria-label={navLabel}
      // Only when focus moves to another element: a null relatedTarget is a
      // click on something unfocusable, which pointerup already handles,
      // focus leaving the page, or in Safari a click on the toggle itself.
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={menuLabel}
        onClick={() => setOpen(!open)}
        className="p-2 md:hidden"
      >
        <IconMenu2 aria-hidden="true" />
      </button>
      <div
        id="nav-menu"
        onClick={(e) => {
          if (
            e.target instanceof Element &&
            e.target.closest("a") &&
            !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
          ) {
            setOpen(false);
          }
        }}
        className={`${open ? "" : "max-md:hidden"} max-md:absolute max-md:inset-x-0 max-md:top-full max-md:mt-px max-md:max-h-[calc(100dvh-var(--spacing-header))] max-md:overflow-y-auto max-md:border-b max-md:border-white/10 max-md:bg-black`}
      >
        {children}
      </div>
    </nav>
  );
}
