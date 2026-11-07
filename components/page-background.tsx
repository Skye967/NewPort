"use client";

import { useWindowLoaded } from "@/components/use-window-loaded";
import background from "@/public/page-background.webp";

// A fixed element rather than background-attachment: fixed, which iOS and
// iPadOS Safari ignore. Tiled at a set size and anchored to the top, so nothing
// rescales when mobile toolbars resize the viewport; the source is cross-faded
// at its edges so the joins don't show.
//
// A flat fill of the image's average colour stands in until load. Accepted
// cost: reloading with the scroll restored below the hero makes the late image
// the page's LCP.
//
// The red headings in Core Strengths, Projects and Contact sit directly on
// this, and drop below 4.5:1 on the image's lightest tiles past about 8%
// opacity.
export function PageBackground() {
  const loaded = useWindowLoaded();

  return (
    <div
      aria-hidden="true"
      style={loaded ? { backgroundImage: `url(${background.src})` } : undefined}
      className="fixed inset-0 -z-10 bg-[#b5b5ab] bg-size-[1080px_auto] bg-top opacity-7"
    />
  );
}
