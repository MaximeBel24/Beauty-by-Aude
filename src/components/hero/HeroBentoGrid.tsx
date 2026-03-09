"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
 * Les 4 images sont gérées dynamiquement via Sanity (siteSettings).
 * Chaque position a un champ dédié (heroImage1 à heroImage4) pour
 * qu'Aude sache exactement quelle image elle modifie.
 *
 * Parallèle Java : comme 4 @Column(name = "hero_image_X") dans l'entity
 * SiteSettings, chacun mappé à une position fixe dans la grille.
 *
 * 💡 Framer Motion :
 * - Chaque image part d'un scale réduit (0.92) + opacity 0
 * - Arrive à scale(1) + opacity 1 avec un délai décalé (cascade)
 * - L'easing [0.25, 0.1, 0.25, 1] donne un mouvement naturel et fluide
 * - Hover : léger zoom (1.05) pour ajouter de l'interactivité
 */

/**
 * BentoImage — Structure pour une image de la grille hero.
 * Chaque image a une URL (depuis Sanity CDN) et un texte alternatif.
 */
interface BentoImage {
    src: string;
    alt: string;
}

interface HeroBentoGridProps {
    images: BentoImage[];
}

// ── Images par défaut (fallback si Sanity ne retourne rien) ──────────
const defaultImages: BentoImage[] = [
    { src: "/images/hero/hero-1.jpg", alt: "Manucure gel élégante — Beauty by Aude" },
    { src: "/images/hero/hero-2.jpg", alt: "Nail art détaillé — Beauty by Aude" },
    { src: "/images/hero/hero-3.jpg", alt: "Pose semi-permanent soignée — Beauty by Aude" },
    { src: "/images/hero/hero-4.jpg", alt: "Mains soignées après manucure — Beauty by Aude" },
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

export default function HeroBentoGrid({ images }: HeroBentoGridProps) {

    // Fallback : si Sanity ne fournit pas d'image pour une position,
    // on utilise l'image locale par défaut
    const resolvedImages = defaultImages.map((def, i) =>
        images[i]?.src ? images[i] : def
    );

    return (
        <>
        {/* Images hero mobile — mini grille 2 colonnes arrondie, visible sous lg:
            On montre 2 images (au lieu de 4) pour un aperçu visuel
            sans surcharger l'écran mobile. Les coins arrondis + gap
            donnent un rendu "carte photo" premium. */}
        <div className="grid grid-cols-2 gap-2 px-[6%] pb-8 sm:gap-3 lg:hidden">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                    src={resolvedImages[0].src}
                    alt={resolvedImages[0].alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority
                />
                <div className="pointer-events-none absolute inset-0 bg-burgundy/[0.06]" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                    src={resolvedImages[1].src}
                    alt={resolvedImages[1].alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-burgundy/[0.06]" />
            </div>
        </div>

        {/* Grille bento desktop — visible uniquement à partir de lg: */}
        <div className="relative hidden h-full w-full overflow-hidden lg:block">
            {/* Grille CSS asymétrique — pt-28 pour dégager la navbar fixe */}
            <div className="grid h-full grid-cols-[1.4fr_1fr] grid-rows-[1.2fr_0.8fr] gap-2 px-4 pt-28 pb-4">
                {/* Image principale — dominante, coin haut gauche */}
                <motion.div
                    custom={0.3}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    className="group relative overflow-hidden rounded-xl"
                >
                    <Image
                        src={resolvedImages[0].src}
                        alt={resolvedImages[0].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <Image
                        src={resolvedImages[1].src}
                        alt={resolvedImages[1].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <Image
                        src={resolvedImages[2].src}
                        alt={resolvedImages[2].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    <Image
                        src={resolvedImages[3].src}
                        alt={resolvedImages[3].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-burgundy/[0.06]" />
                </motion.div>
            </div>
        </div>
        </>
    );
}