import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SideTab } from "@/components/side-tab";
import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="scheme-dark">
      <body className="flex min-h-dvh flex-col bg-black text-white">
        <Nav />
        {children}
        <Footer />
        <SideTab />
      </body>
    </html>
  );
}
