"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  addEventListener("load", onChange);
  return () => removeEventListener("load", onChange);
}

// For holding decorative assets until the window's load event, since they are
// fetched as soon as they're styled, below the fold or not, and alongside the
// hero photo they push back LCP. Without JavaScript this never turns true.
export function useWindowLoaded() {
  return useSyncExternalStore(
    subscribe,
    () => document.readyState === "complete",
    () => false,
  );
}
