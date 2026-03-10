import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity.queries";

/**
 * Footer — Pas besoin de "use client" ici, c'est un composant statique.
 *
 * 💡 C'est donc un Server Component (par défaut en App Router).
 * Avantage : il est rendu côté serveur, pas de JS envoyé au navigateur
 * pour ce composant → meilleure performance.
 *
 * Plus tard, quand on connectera Sanity, les données (email, liens)
 * viendront du CMS via des props. Les Server Components peuvent
 * être async et fetch directement les données — pas besoin de useEffect.
 */

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#about", label: "Qui suis-je" },
    { href: "/#services", label: "Services" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#avis", label: "Avis" },
    { href: "/#salon", label: "Salon" },
    { href: "/#contact", label: "Contact" },
];

export default async function Footer() {
    const settings = await getSiteSettings();
    if (!settings) return null;
    return (
        <footer className="bg-[var(--bg-footer)] px-[8%] pt-16 pb-8 text-nude">
            {/* Grille 3 colonnes */}
            <div
                className="
          mx-auto grid max-w-[1100px] gap-8 md:gap-12
          border-b border-nude/10 pb-12
          grid-cols-1 md:grid-cols-[2fr_1fr_1fr]
        "
            >
                {/* Colonne 1 — Branding + slogan */}
                <div>
                    <Link href="/" className="no-underline">
                        <span className="font-heading text-2xl font-medium tracking-[0.15em] text-cream">
                            BEAUTY
                        </span>
                        <span className="font-heading -mt-0.5 block text-sm font-light tracking-[0.3em] text-nude">
                            BY AUDE
                        </span>
                    </Link>
                    <p className="mt-4 max-w-[280px] text-[0.85rem] font-light leading-relaxed text-nude/60">
                        L&apos;art de sublimer vos mains avec passion et minutie.
                        Manucure professionnelle à domicile.
                    </p>
                </div>

                {/* Colonne 2 — Navigation */}
                <div>
                    <h4 className="mb-5 font-heading text-lg font-medium text-cream">Navigation</h4>
                    <ul className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="
                    text-[0.85rem] font-light text-nude no-underline
                    opacity-70 transition-all duration-300
                    hover:text-cream hover:opacity-100
                  "
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Colonne 3 — Contact */}
                <div>
                    <h4 className="mb-5 font-heading text-lg font-medium text-cream">Contact</h4>
                    <ul className="flex flex-col gap-3">
                        <li>
                            <Link
                                href={settings.planityUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                  text-[0.85rem] font-light text-nude no-underline
                  opacity-70 transition-all duration-300
                  hover:text-cream hover:opacity-100
                "
                            >
                                Prendre rendez-vous
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={settings.instagramUrl ?? "#"}
                                className="
                  text-[0.85rem] font-light text-nude no-underline
                  opacity-70 transition-all duration-300
                  hover:text-cream hover:opacity-100
                "
                            >
                                Instagram
                            </Link>
                        </li>
                        {/* Téléphone — lien tel: cliquable sur mobile */}
                        {settings.phone && (
                            <li>
                                <Link
                                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                                    className="
                      text-[0.85rem] font-light text-nude no-underline
                      opacity-70 transition-all duration-300
                      hover:text-cream hover:opacity-100
                    "
                                >
                                    {settings.phone}
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                href={settings.email ? `mailto:${settings.email}` : "#"}
                                className="
                  text-[0.85rem] font-light text-nude no-underline
                  opacity-70 transition-all duration-300
                  hover:text-cream hover:opacity-100
                "
                            >
                                {settings.email ?? "contact@beautybyaude.fr"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bas de page — centré */}
            <div
                className="
          mx-auto flex max-w-[1100px] justify-center
          pt-8 text-xs opacity-50
        "
            >
                <span>© 2025 Beauty by Aude — Tous droits réservés</span>
            </div>
        </footer>
    );
}
