
import type { Metadata } from "next";
import {
  Pinyon_Script,
  Cormorant_Garamond,
  EB_Garamond,
  Cinzel,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const cinzel = Cinzel({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alviyan & Cherline | Wedding Invitation",
  description:
    "With love and blessings, we invite you to celebrate the wedding of Alviyan & Cherline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pinyon.variable} ${cormorant.variable} ${ebGaramond.variable} ${cinzel.variable} ${greatVibes.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
