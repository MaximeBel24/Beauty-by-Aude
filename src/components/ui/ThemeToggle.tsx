"use client";

/**
 * ThemeToggle — Bouton flottant pour basculer entre light et dark mode.
 *
 * Positionné en bas à droite (fixed), avec des icônes soleil/lune
 * animées via Framer Motion. Le choix est persisté dans localStorage.
 *
 * Le toggle modifie la classe .dark sur <html> ce qui active
 * les tokens CSS définis dans globals.css (.dark { ... }).
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    // Évite le rendu côté serveur (le bouton apparaît après hydratation)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Lit l'état initial depuis le DOM (le script anti-FOUC a déjà appliqué .dark)
        setIsDark(document.documentElement.classList.contains("dark"));
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);

        if (newDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    // Invisible côté serveur pour éviter un mismatch d'hydratation
    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="
                fixed bottom-6 right-6 z-50
                flex h-12 w-12 items-center justify-center
                rounded-full bg-burgundy text-cream
                shadow-[0_4px_20px_rgba(64,18,22,0.3)]
                transition-transform duration-300
                hover:scale-110
                cursor-pointer
            "
            aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
        >
            <AnimatePresence mode="wait">
                {isDark ? (
                    // Icône soleil (mode clair)
                    <motion.svg
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </motion.svg>
                ) : (
                    // Icône lune (mode sombre)
                    <motion.svg
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </motion.svg>
                )}
            </AnimatePresence>
        </button>
    );
}
