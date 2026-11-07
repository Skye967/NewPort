import { JetBrains_Mono } from "next/font/google";

// The hero's title face, reused for section headings. Not preloaded: a preload
// is fetched ahead of the hero photo, which is the LCP element. The cost is a
// swap from the fallback font when it arrives, which can rewrap the title.
export const headingFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: "600",
  preload: false,
});
