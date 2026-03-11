"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioCategory } from "@/types";

/**
 * CategoryDropdown — Select custom animé pour filtrer par catégorie.
 *
 * Pourquoi un composant dédié ?
 * - Sépare la logique UI (ouverture, click-outside, animation)
 *   de la logique métier (filtrage des items)
 * - Réutilisable si on ajoute d'autres filtres plus tard
 *
 * Props :
 * - categories : liste des catégories Sanity
 * - activeCategory : valeur courante ("all" ou un slug)
 * - onSelect : callback quand l'utilisateur choisit une catégorie
 */

interface CategoryDropdownProps {
    categories: PortfolioCategory[];
    activeCategory: string;
    onSelect: (value: string) => void;
}

export default function CategoryDropdown({ categories, activeCategory, onSelect }: CategoryDropdownProps) {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Ferme le dropdown quand on clique en dehors
    // Même pattern que le menu mobile de la Navbar
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Label affiché dans le bouton
    const activeLabel = activeCategory === "all"
        ? "Toutes les catégories"
        : categories.find(c => c.value === activeCategory)?.title ?? "Toutes les catégories";

    // Toutes les options : "all" + chaque catégorie Sanity
    const options = [
        { value: "all", label: "Toutes les catégories" },
        ...categories.map(cat => ({ value: cat.value, label: cat.title })),
    ];

    function handleSelect(value: string) {
        onSelect(value);
        setIsOpen(false);
    }

    return (
        <div ref={ref} className="relative mx-auto mb-12 w-[280px]">

            {/* Bouton trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex w-full items-center justify-between
                    cursor-pointer px-5 py-3
                    border text-[0.85rem] tracking-wide
                    transition-all duration-300
                    ${isOpen
                    ? "border-[var(--text-heading)] text-[var(--text-heading)]"
                    : "border-[var(--border-medium)] text-[var(--text-body-color)] hover:border-[var(--text-heading)] hover:text-[var(--text-heading)]"
                }
                `}
            >
                {activeLabel}
                <svg
                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Liste déroulante animée */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="
                            absolute left-0 right-0 top-full z-20 mt-1
                            overflow-hidden border border-[var(--border-medium)]
                            bg-[var(--bg-card)] shadow-lg
                        "
                    >
                        {options.map((option) => {
                            const isActive = activeCategory === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`
                                        flex w-full cursor-pointer items-center
                                        px-5 py-3 text-left text-[0.85rem]
                                        transition-all duration-200
                                        ${isActive
                                        ? "bg-burgundy text-cream font-medium"
                                        : "text-[var(--text-body-color)] hover:bg-burgundy/10 hover:text-[var(--text-heading)] hover:pl-7"
                                    }
                                    `}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
