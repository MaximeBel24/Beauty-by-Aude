"use client";

import { motion } from "framer-motion";

/**
 * HeroBentoGrid — Grille asymétrique d'images pour la section Hero.
 *
 * Layout (desktop) :
 * ┌──────────────┬────────┐
 * │              │        │
 * │   Grande     │ Petite │
 * │   (dominante)│  top   │
 * │              ├────────┤
 * ├──────────────┤        │
 * │    Petite    │ Moyenne│
 * │    bottom    │        │
 * └──────────────┴────────┘
 *
 * 💡 Framer Motion :
 * - Chaque image part d'un scale réduit (0.92) + opacity 0
 * - Arrive à scale(1) + opacity 1 avec un délai décalé (cascade)
 * - L'easing [0.25, 0.1, 0.25, 1] donne un mouvement naturel et fluide
 * - Hover : léger zoom (1.05) pour ajouter de l'interactivité
 *
 * 📦 TODO Sanity : Remplacer le tableau `images` hardcodé par une
 *    query GROQ pour récupérer les images dynamiquement.
 */

interface BentoImage {
    src: string;
    alt: string;
}

// ── Images hardcodées (à remplacer par Sanity plus tard) ─────────────
const images: BentoImage[] = [
    {
        src: "/images/hero/hero-1.jpg",
        alt: "Manucure gel élégante — Beauty by Aude",
    },
    {
        src: "/images/hero/hero-2.jpg",
        alt: "Nail art détaillé — Beauty by Aude",
    },
    {
        src: "/images/hero/hero-3.jpg",
        alt: "Pose semi-permanent soignée — Beauty by Aude",
    },
    {
        src: "/images/hero/hero-4.jpg",
        alt: "Mains soignées après manucure — Beauty by Aude",
    },
];

// ── Animation variants ───────────────────────────────────────────────
const imageVariants = {
    hidden: {
        opacity: 0,
        scale: 0.92,
    },
    visible: (delay: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            delay,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    }),
};

export default function HeroBentoGrid() {
    return (
        <div className="relative hidden h-full w-full overflow-hidden md:block">
            {/* Grille CSS asymétrique : asymétrie renforcée pour hiérarchie visuelle */}
            <div className="grid h-full grid-cols-[1.4fr_1fr] grid-rows-[1.2fr_0.8fr] gap-2 px-4 pt-20 pb-4">
                {/* Image principale — dominante, coin haut gauche */}
                <motion.div
                    custom={0.3}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    className="group relative overflow-hidden rounded-xl"
                >
                    <img
                        src={images[0].src}
                        alt={images[0].alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay pour harmoniser les fonds hétérogènes */}
                    <div className="pointer-events-none absolute inset-0 bg-burgundy/[0.06]" />
                </motion.div>

                {/* Image secondaire — petite, coin haut droit */}
                <motion.div
                    custom={0.5}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    className="group relative overflow-hidden rounded-xl"
                >
                    <img
                        src={images[1].src}
                        alt={images[1].alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-burgundy/[0.06]" />
                </motion.div>

                {/* Image tertiaire — petite, coin bas gauche */}
                <motion.div
                    custom={0.7}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    className="group relative overflow-hidden rounded-xl"
                >
                    <img
                        src={images[2].src}
                        alt={images[2].alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-burgundy/[0.06]" />
                </motion.div>

                {/* Image quaternaire — moyenne, coin bas droit */}
                <motion.div
                    custom={0.9}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    className="group relative overflow-hidden rounded-xl"
                >
                    <img
                        src={images[3].src}
                        alt={images[3].alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-burgundy/[0.06]" />
                </motion.div>
            </div>

            {/* Élément décoratif — trait vertical */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute top-8 left-0 h-24 w-px origin-top bg-taupe/30"
            />
        </div>
    );
}