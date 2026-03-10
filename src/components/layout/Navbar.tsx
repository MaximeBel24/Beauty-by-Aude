"use client";

/**
 * Navbar — Barre de navigation fixe avec effet glassmorphism.
 *
 * 💡 "use client" est nécessaire ici car on utilise :
 *    - useState (menu mobile)
 *    - useEffect (scroll listener)
 *    - Framer Motion (animations)
 *
 * En Next.js App Router, les composants sont "Server Components" par défaut
 * (rendus côté serveur). Dès qu'on a besoin d'interactivité (state, effets,
 * event handlers), on doit ajouter "use client" en haut du fichier pour
 * en faire un "Client Component" (rendu côté navigateur).
 */

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Liens de navigation — facile à modifier
const navLinks = [
    { href: "/#about", label: "Qui suis-je" },
    { href: "/#services", label: "Services" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#avis", label: "Avis" },
    { href: "/#salon", label: "Salon" },
    { href: "/#contact", label: "Contact" },
];

/**
 * Props passées depuis le layout (Server Component → Client Component).
 * Le layout fetch les settings Sanity et injecte logoUrl + planityUrl.
 * Parallèle Java : comme un @Controller qui injecte des données dans la vue.
 */
interface NavbarProps {
    logoUrl?: string;
    planityUrl?: string;
}

export default function Navbar({ logoUrl, planityUrl }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    /**
     * 💡 Active state — indicateur visuel du lien courant.
     *
     * Deux stratégies selon la page :
     * 1. Sur la homepage ("/") → IntersectionObserver détecte quelle section
     *    est visible dans le viewport (comme un EventListener en Java).
     * 2. Sur les sous-pages ("/services", "/portfolio") → usePathname()
     *    compare le chemin URL avec les hrefs des liens.
     *
     * Parallèle Spring MVC : c'est comme ajouter un attribut "activeTab"
     * dans le Model pour que la vue Thymeleaf mette la bonne classe CSS.
     */
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<string>("");

    /**
     * isActive — détermine si un lien doit être mis en surbrillance.
     * @param href — le href du lien (ex: "/#services")
     *
     * On vérifie deux cas :
     * - Page "/services/*" → le lien "/#services" est actif
     * - Homepage → la section visible (via IntersectionObserver) correspond
     */
    const isActive = useCallback((href: string): boolean => {
        const sectionId = href.replace("/#", "");

        // Sous-pages : /services/xxx → "services" actif, /portfolio → "portfolio" actif
        if (pathname.startsWith("/services") && sectionId === "services") return true;
        if (pathname.startsWith("/portfolio") && sectionId === "portfolio") return true;

        // Homepage : la section visible
        if (pathname === "/" && activeSection === sectionId) return true;

        return false;
    }, [pathname, activeSection]);

    // Détecte le scroll pour renforcer le fond de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /**
     * IntersectionObserver — surveille quelles sections sont visibles.
     *
     * 💡 rootMargin "-40% 0px -55% 0px" crée une "zone de détection"
     * centrée dans le viewport (top 40% ignoré, bottom 55% ignoré).
     * Seule la section au milieu de l'écran est considérée "active".
     *
     * On ne l'active que sur la homepage ("/"), car les sous-pages
     * n'ont pas ces sections. Le return () => observer.disconnect()
     * nettoie l'observer quand on quitte la page (comme un @PreDestroy).
     */
    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const sectionIds = navLinks.map(link => link.href.replace("/#", ""));
        const sections = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find(e => e.isIntersecting);
                if (visible) {
                    setActiveSection(visible.target.id);
                }
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, [pathname]);

    // Ferme le menu mobile quand on clique sur un lien
    const handleLinkClick = () => {
        setIsMobileOpen(false);
    };

    return (
        <>
            <nav
                className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-[4%] py-5
          backdrop-blur-[20px]
          border-b transition-all duration-300
          ${isScrolled ? "border-[var(--border-medium)] bg-[var(--bg-nav)]" : "border-[var(--border-subtle)] bg-[var(--bg-nav)]"}
        `}
            >
                {/* Logo — image Sanity + texte en fallback */}
                <Link href="/" className="flex items-center gap-3 no-underline">
                    {logoUrl && (
                        <Image
                            src={logoUrl}
                            alt="Logo Beauty by Aude"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    )}
                    <div>
                        <span className="font-heading text-2xl font-medium tracking-[0.15em] text-[var(--text-heading)]">
                            BEAUTY
                        </span>
                        <span className="font-heading -mt-0.5 block text-sm font-light tracking-[0.3em] text-[var(--text-accent)]">
                            BY AUDE
                        </span>
                    </div>
                </Link>

                {/* Liens desktop — lg: au lieu de md: car 6 liens + CTA débordent à 768px */}
                <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`
                                        group relative pb-1 text-[0.85rem] font-normal
                                        uppercase tracking-[0.12em] no-underline
                                        transition-colors duration-300
                                        ${active
                                            ? "text-[var(--text-heading)]"
                                            : "text-[var(--text-muted)] hover:text-[var(--text-heading)]"
                                        }
                                    `}
                                >
                                    {link.label}
                                    {/* Underline — permanent si actif (h-[2px] + w-full),
                                        animé au hover si inactif (h-px + w-0 → w-full) */}
                                    <span
                                        className={`
                                            absolute bottom-0 left-0 bg-[var(--text-accent)]
                                            transition-all duration-400
                                            ease-[cubic-bezier(0.25,0.8,0.25,1)]
                                            ${active
                                                ? "h-[2px] w-full"
                                                : "h-px w-0 group-hover:w-full"
                                            }
                                        `}
                                    />
                                </Link>
                            </li>
                        );
                    })}

                    {/* Bouton CTA — lié à Planity (dynamique depuis Sanity) */}
                    <li>
                        <Link
                            href={planityUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                bg-burgundy px-7 py-3 text-xs
                font-normal uppercase tracking-[0.15em]
                text-cream no-underline
                transition-all duration-300
                hover:bg-rosewood
              "
                        >
                            Prendre RDV
                        </Link>
                    </li>
                </ul>

                {/* Burger mobile */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="
            flex flex-col items-center justify-center
            gap-1.5 lg:hidden
            w-10 h-10 bg-transparent border-none cursor-pointer
          "
                    aria-label="Menu"
                >
                    <motion.span
                        animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="block h-[1.5px] w-6 bg-[var(--text-heading)]"
                    />
                    <motion.span
                        animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="block h-[1.5px] w-6 bg-[var(--text-heading)]"
                    />
                    <motion.span
                        animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="block h-[1.5px] w-6 bg-[var(--text-heading)]"
                    />
                </button>
            </nav>

            {/* Menu mobile — overlay plein écran */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="
              fixed inset-0 z-40
              flex flex-col items-center justify-center gap-8
              bg-[var(--bg-nav-mobile)] backdrop-blur-md
              lg:hidden
            "
                    >
                        {navLinks.map((link, i) => {
                            const active = isActive(link.href);
                            return (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={handleLinkClick}
                                        className={`
                                            font-heading text-3xl font-light italic
                                            no-underline transition-colors duration-300
                                            ${active
                                                ? "text-[var(--text-accent)]"
                                                : "text-[var(--text-heading)] hover:text-[var(--text-accent)]"
                                            }
                                        `}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            );
                        })}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                        >
                            <Link
                                href={planityUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleLinkClick}
                                className="
                  mt-4 inline-block bg-burgundy
                  px-8 py-4 text-sm uppercase
                  tracking-[0.15em] text-cream no-underline
                  transition-all duration-300
                  hover:bg-rosewood
                "
                            >
                                Prendre RDV
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
