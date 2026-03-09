"use client";

/**
 * Lightbox — Modale plein écran avec navigation entre photos.
 *
 * Composant réutilisable "contrôlé" : le parent gère l'état,
 * la Lightbox reçoit tout via ses props.
 *
 * Parallèle Java/Spring :
 * - item + items = comme un Iterator<PortfolioItem> avec index courant
 * - onNavigate = callback pour changer l'élément courant (next/previous)
 * - onClose = callback pour fermer la modale
 *
 * Utilisation :
 *   const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
 *   <Lightbox
 *       item={selectedItem}
 *       items={filteredItems}
 *       onClose={() => setSelectedItem(null)}
 *       onNavigate={(item) => setSelectedItem(item)}
 *   />
 */

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioItem } from "@/types";

interface LightboxProps {
    item: PortfolioItem | null;     // Photo actuellement affichée (null = fermé)
    items: PortfolioItem[];         // Liste complète (filtrée) pour la navigation
    onClose: () => void;            // Callback pour fermer la modale
    onNavigate: (item: PortfolioItem) => void;  // Callback pour changer de photo
}

export default function Lightbox({ item, items, onClose, onNavigate }: LightboxProps) {

    // Calcul de l'index courant dans la liste
    const currentIndex = item ? items.findIndex(i => i._id === item._id) : -1;
    // Navigation visible uniquement si plus d'une photo
    const canNavigate = items.length > 1;

    /**
     * Navigation circulaire avec l'opérateur modulo (%).
     * - Sur la dernière photo, "suivant" revient à la première (index 0)
     * - Sur la première photo, "précédent" va à la dernière
     *
     * Parallèle Java : comme Collections.rotate() — la liste boucle sur elle-même.
     */
    const goToPrev = useCallback(() => {
        if (!canNavigate) return;
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onNavigate(items[prevIndex]);
    }, [canNavigate, items, currentIndex, onNavigate]);

    const goToNext = useCallback(() => {
        if (!canNavigate) return;
        const nextIndex = (currentIndex + 1) % items.length;
        onNavigate(items[nextIndex]);
    }, [canNavigate, items, currentIndex, onNavigate]);

    /**
     * useEffect — Écoute les touches clavier :
     * - Escape : fermer la modale
     * - ArrowLeft / ArrowRight : naviguer entre les photos
     */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, goToPrev, goToNext]);

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={onClose}
                >
                    {/* Bouton fermer ✕ */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 cursor-pointer text-cream/70 transition-colors hover:text-cream"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Flèche gauche (précédent) — navigation circulaire */}
                    {canNavigate && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-4 z-10 cursor-pointer rounded-full bg-black/40 p-3 text-cream/70 transition-all hover:bg-black/60 hover:text-cream md:left-8"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Flèche droite (suivant) — navigation circulaire */}
                    {canNavigate && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-4 z-10 cursor-pointer rounded-full bg-black/40 p-3 text-cream/70 transition-all hover:bg-black/60 hover:text-cream md:right-8"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Conteneur image avec animation de transition */}
                    <motion.div
                        key={item._id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-h-[85vh] max-w-[90vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.imageUrl}
                            alt={item.imageAlt ?? item.title}
                            className="max-h-[85vh] max-w-[90vw] object-contain"
                        />

                        {/* Titre + compteur (ex: "Nail Art Floral — 3/12") */}
                        <p className="mt-4 text-center font-heading text-lg italic text-cream">
                            {item.title}
                            <span className="ml-3 font-body text-sm not-italic text-cream/50">
                                {currentIndex + 1}/{items.length}
                            </span>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
