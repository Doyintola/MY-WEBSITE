import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EdgeLabel from "@/components/EdgeLabel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oladoyin-akintola.vercel.app"),
  title: {
    default: "Oladoyin A. Akintola — Researcher in Net-Zero Infrastructure",
    template: "%s · Oladoyin A. Akintola",
  },
  description:
    "Editorial portfolio of Oladoyin A. Akintola — researcher and consultant working on net-zero infrastructure, decision intelligence, and circular construction in developing economies.",
  keywords: [
    "Oladoyin Akintola",
    "Net-Zero Infrastructure",
    "Construction Management",
    "Circular Economy",
    "Quantity Surveying",
    "Decision Intelligence",
    "Sustainability Research",
  ],
  authors: [{ name: "Oladoyin A. Akintola" }],
  openGraph: {
    title: "Oladoyin A. Akintola",
    description:
      "Academic | Consultant | Infrastructure Innovator pioneering net-zero solutions and decision intelligence in construction.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="grain relative flex min-h-screen flex-col font-sans">
        <Navbar />
        <EdgeLabel side="left" text="ISSUE Nº 01 — VOLUME I — MMXXVI" />
        <EdgeLabel side="right" text="OLADOYIN A. AKINTOLA · FIELD NOTES" />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
