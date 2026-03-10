import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

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

// Layout racine : partagé par TOUTES les routes (site + studio)
// Navbar et Footer sont dans (site)/layout.tsx pour ne pas apparaître dans le Studio
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fr"
            className={`${cormorant.variable} ${jost.variable}`}
            suppressHydrationWarning
        >
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                (function() {
                    var theme = localStorage.getItem('theme');
                    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                        document.documentElement.classList.add('dark', 'no-transition');
                    } else {
                        document.documentElement.classList.add('no-transition');
                    }
                    window.addEventListener('DOMContentLoaded', function() {
                        requestAnimationFrame(function() {
                            document.documentElement.classList.remove('no-transition');
                        });
                    });
                })();
            `,
                }}
            />
        </head>
        <body className="font-body bg-[var(--bg-primary)] text-[var(--text-body-color)] antialiased">
                {children}
            </body>
        </html>
    );
}
