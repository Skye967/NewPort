import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PageBackground } from "@/components/page-background";
import { SideTab } from "@/components/side-tab";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
  description: site.description,
  openGraph: { type: "website", siteName: site.name },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="scheme-dark">
      <body className="flex min-h-dvh flex-col bg-black text-white">
        <PageBackground />
        <Nav />
        {children}
        <Footer />
        <SideTab />
      </body>
    </html>
  );
}
