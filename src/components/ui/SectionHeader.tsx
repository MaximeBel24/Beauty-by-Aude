"use client";

import { motion } from "framer-motion";
import {fadeInUp, viewportConfig} from "@/lib/animations";

/**
 * SectionHeader — En-tête de section réutilisable.
 *
 * Utilisé par : Services, Portfolio, Avis, Instagram, CTA
 * Chaque section a le même pattern : label + titre (avec mot en italique) + ligne décorative.
 *
 * 💡 On utilise Framer Motion pour animer l'apparition au scroll.
 * `whileInView` déclenche l'animation quand l'élément entre dans le viewport.
 * `viewport={{ once: true }}` = l'animation ne se joue qu'une fois (pas à chaque scroll).
 */

interface SectionHeaderProps {
    label: string; // Petit texte au-dessus (ex: "Prestations")
    title: string; // Titre principal (ex: "Nos services")
    titleAccent?: string; // Mot en italique/accent (ex: "services")
    light?: boolean; // true = texte clair (pour sections à fond sombre)
}

export default function SectionHeader({
    label,
    title,
    titleAccent,
    light = false,
}: SectionHeaderProps) {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12 text-center"
        >
            {/* Label */}
            <p
                className={`
          mb-4 text-[0.7rem] font-normal uppercase tracking-[0.35em]
          ${light ? "text-nude" : "text-[var(--text-accent)]"}
        `}
            >
                {label}
            </p>

            {/* Titre */}
            <h2
                className={`
          font-heading text-[clamp(2rem,3.5vw,2.8rem)] font-light leading-tight
          ${light ? "text-cream" : "text-[var(--text-heading)]"}
        `}
            >
                {title}{" "}
                {titleAccent && (
                    <em className={`italic ${light ? "text-nude" : "text-[var(--text-accent)]"}`}>
                        {titleAccent}
                    </em>
                )}
            </h2>

            {/* Ligne décorative */}
            <div
                className={`
          mx-auto mt-5 h-px w-12
          ${light ? "bg-nude/40" : "bg-[var(--text-accent)] opacity-40"}
        `}
            />
        </motion.div>
    );
}
