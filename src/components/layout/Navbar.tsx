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

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Liens de navigation — facile à modifier
const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#avis", label: "Avis" },
    { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Détecte le scroll pour renforcer le fond de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
          ${isScrolled ? "border-taupe/15 bg-[#FFFBF6]/90" : "border-taupe/10 bg-[#FFFBF6]/85"}
        `}
            >
                {/* Logo */}
                <Link href="/" className="no-underline">
                    <span className="font-heading text-2xl font-medium tracking-[0.15em] text-burgundy">
                        BEAUTY
                    </span>
                    <span className="font-heading -mt-0.5 block text-sm font-light tracking-[0.3em] text-taupe">
                        BY AUDE
                    </span>
                </Link>

                {/* Liens desktop */}
                <ul className="hidden items-center gap-10 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="
                  group relative pb-1 text-[0.85rem] font-normal
                  uppercase tracking-[0.12em] text-rosewood
                  no-underline transition-colors duration-300
                  hover:text-burgundy
                "
                            >
                                {link.label}
                                {/* Underline animé au hover */}
                                <span
                                    className="
                    absolute bottom-0 left-0 h-px w-0 bg-taupe
                    transition-all duration-400
                    ease-[cubic-bezier(0.25,0.8,0.25,1)]
                    group-hover:w-full
                  "
                                />
                            </Link>
                        </li>
                    ))}

                    {/* Bouton CTA */}
                    <li>
                        <Link
                            href="#"
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
            gap-1.5 md:hidden
            w-10 h-10 bg-transparent border-none cursor-pointer
          "
                    aria-label="Menu"
                >
                    <motion.span
                        animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="block h-[1.5px] w-6 bg-burgundy"
                    />
                    <motion.span
                        animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="block h-[1.5px] w-6 bg-burgundy"
                    />
                    <motion.span
                        animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="block h-[1.5px] w-6 bg-burgundy"
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
              bg-[#FFFBF6]/98 backdrop-blur-md
              md:hidden
            "
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="
                    font-heading text-3xl font-light italic
                    text-burgundy no-underline
                    transition-colors duration-300
                    hover:text-taupe
                  "
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                        >
                            <Link
                                href="#"
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
