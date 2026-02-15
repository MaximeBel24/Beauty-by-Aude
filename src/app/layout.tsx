import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-heading",
    display: "swap",
});

const jost = Jost({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

// Metadata SEO (à personnaliser plus tard)
export const metadata: Metadata = {
    title: "Beauty by Aude | Manucure Professionnelle",
    description:
        "Manucure professionnelle : pose gel, semi-permanent, nail art. Réservez votre rendez-vous en ligne.",
    keywords: ["manucure", "nail art", "pose gel", "semi-permanent", "beauté"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="fr"
          className={`${cormorant.variable} ${jost.variable}`}
          suppressHydrationWarning // nécessaire si tu gères le dark mode côté client
      >
          <body className="font-body bg-cream text-burgundy antialiased">
          <Navbar />
            {children}
          <Footer />
          </body>
      </html>
  );
}
