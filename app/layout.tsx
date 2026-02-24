import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craftopia — Crafted Beauty for Every Space.",
  description: "Discover hand-picked botanical arrangements, dried florals, artisanal ceramics and home décor at Craftopia.",
  icons: {
    icon: [
      { url: "/CraftopiaLogo/IconLogo.png", type: "image/png" },
    ],
    shortcut: "/CraftopiaLogo/IconLogo.png",
    apple: "/CraftopiaLogo/IconLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
