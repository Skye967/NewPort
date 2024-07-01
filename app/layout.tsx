
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skye Grossman",
  description: "Skye Grossman's work portfolio",
  
};

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="scroll-smooth w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
        <body className="scroll-smooth w-full">
          {children}
        </body>
    </html>
  );
}
