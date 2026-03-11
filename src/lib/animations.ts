/**
 * animations.ts — Variants et configs Framer Motion centralisées.
 *
 * Concepts Framer Motion :
 * - "variants" = objet avec des états nommés (hidden, visible, exit)
 * - "custom" = paramètre dynamique passé au variant (ex: index pour le delay)
 * - Le composant dit juste variants={fadeInUp} au lieu de réécrire les valeurs
 */

import type { Variants, Transition } from "framer-motion";

// ============================================
// CONFIG VIEWPORT — Quand déclencher l'animation au scroll
// ============================================

/**
 * once: true → l'animation ne joue qu'une fois (pas à chaque scroll)
 * margin: "-50px" → déclenche 50px avant que l'élément soit visible
 *                    (pour que l'animation commence un peu en avance)
 */
export const viewportConfig = {
    once: true,
    margin: "-50px" as const,
};

// ============================================
// PATTERN A — Fade + Slide Up (le plus fréquent)
// ============================================

/**
 * fadeInUp — Apparition par le bas avec fondu.
 * Utilisé pour : cards, sections, éléments au scroll.
 *
 * Le paramètre "custom" permet de passer un index pour
 * décaler les animations en cascade (stagger effect).
 * Ex: custom={0} → pas de delay, custom={2} → 0.2s de delay
 */
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: delay * 0.1,
            ease: "easeOut",
        },
    }),
};

// ============================================
// PATTERN B — Fade + Scale (Portfolio, images)
// ============================================

/**
 * fadeInScale — Apparition avec léger zoom.
 * Plus subtil que fadeInUp, adapté aux images/photos.
 */
export const fadeInScale: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: (delay: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: delay * 0.1,
            ease: "easeOut",
        },
    }),
};

// ============================================
// PATTERN C — Transition de filtre (AnimatePresence)
// ============================================

/**
 * filterTransition — Animation quand on change de catégorie.
 * L'ancien contenu sort vers le haut, le nouveau entre par le bas.
 * Utilisé avec AnimatePresence mode="wait".
 */
export const filterTransition: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
    exit: {
        opacity: 0,
        y: -15,
        transition: { duration: 0.3 },
    },
};

// ============================================
// PATTERN D — Slide horizontal (ex: Salon)
// ============================================

/**
 * fadeInLeft / fadeInRight — Entrée latérale.
 * Utilisé pour les layouts split (2 colonnes côte à côte).
 */
export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: delay * 0.1,
            ease: "easeOut",
        },
    }),
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: delay * 0.1,
            ease: "easeOut",
        },
    }),
};
