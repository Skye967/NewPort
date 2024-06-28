
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skye Grossman",
  description: "Skye Grossman's work portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="scroll-smooth w-full">
        <body className="scroll-smooth w-full">
          {children}
        </body>
    </html>
  );
}
