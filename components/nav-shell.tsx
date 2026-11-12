"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { eyebrow } from "@/components/eyebrow";

// A corner over the page. Over the hero it's bare; past it, it gets a backdrop
// so it stays legible on the sections below.
const corner =
  "pointer-events-auto flex items-center gap-1 border border-transparent px-2.5 py-1 group-data-past:border-white/10 group-data-past:bg-black/60 group-data-past:backdrop-blur motion-safe:transition-colors motion-safe:duration-300";

const iconButton =
  "p-2 text-white/70 hover:text-white focus-visible:text-white motion-safe:transition-colors motion-safe:duration-300";

// No bar: the mark sits in the top-left corner, the links in the top-right.
// From md, over the hero, the links show inline; past the hero, and always
// below md, they fold into a button that opens them in a full-screen modal
// dialog. Without JavaScript nothing counts as past the hero, so from md the
// inline links always show. Accepted cost: below md the menu needs
// JavaScript, and the Resume link appears nowhere else.
//
// "Past the hero" is the element with id "top" leaving the viewport; Hero
// sets that id.
export function NavShell({
  mark,
  inline,
  panel,
  navLabel,
  menuLabel,
  closeMenuLabel,
}: {
  mark: ReactNode;
  inline: ReactNode;
  panel: ReactNode;
  navLabel: string;
  menuLabel: string;
  closeMenuLabel: string;
}) {
  const [past, setPast] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) =>
      setPast(!entry.isIntersecting),
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-past={past || undefined}
      className="group pointer-events-none fixed inset-x-0 top-0 z-20 flex h-header items-center justify-between px-3 print:hidden"
    >
      <div className={corner}>{mark}</div>
      <nav aria-label={navLabel} className={corner}>
        <ul className="flex items-center gap-1 max-md:hidden md:group-data-past:hidden">
          {inline}
        </ul>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={menuLabel}
          onClick={() => dialog.current?.showModal()}
          className={`${iconButton} md:hidden md:group-data-past:block`}
        >
          <IconMenu2 aria-hidden="true" />
        </button>
        {/* A modal dialog brings focus containment, Escape to close, an inert
            page behind it, and focus back on the menu button when it closes.
            A link closes it on an unmodified click, so a hash link scrolls
            the page once the dialog is gone. */}
        <dialog
          ref={dialog}
          aria-label={menuLabel}
          onClick={(e) => {
            if (
              e.target instanceof Element &&
              e.target.closest("a") &&
              !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
            ) {
              dialog.current?.close();
            }
          }}
          className="group/menu pointer-events-auto fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-black p-0 text-white backdrop:bg-transparent motion-safe:open:animate-menu-wipe"
        >
          <div className="flex h-header items-center justify-end px-3">
            <div className="border border-transparent px-2.5 py-1">
              <button
                type="button"
                aria-label={closeMenuLabel}
                onClick={() => dialog.current?.close()}
                className={iconButton}
              >
                <IconX aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="px-page pt-[10vh] pb-16 sm:pl-8">
            <p aria-hidden="true" className={eyebrow}>
              {menuLabel}
            </p>
            <ul className="mt-5 flex flex-col gap-1.5">{panel}</ul>
          </div>
        </dialog>
      </nav>
    </header>
  );
}
