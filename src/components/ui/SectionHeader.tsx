"use client";

import { motion } from "framer-motion";

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 text-center"
        >
            {/* Label */}
            <p
                className={`
          mb-4 text-[0.7rem] font-normal uppercase tracking-[0.35em]
          ${light ? "text-nude" : "text-taupe"}
        `}
            >
                {label}
            </p>

            {/* Titre */}
            <h2
                className={`
          font-heading text-[clamp(2rem,3.5vw,2.8rem)] font-light leading-tight
          ${light ? "text-cream" : "text-burgundy"}
        `}
            >
                {title}{" "}
                {titleAccent && (
                    <em className={`italic ${light ? "text-nude" : "text-taupe"}`}>
                        {titleAccent}
                    </em>
                )}
            </h2>

            {/* Ligne décorative */}
            <div
                className={`
          mx-auto mt-5 h-px w-12
          ${light ? "bg-nude/40" : "bg-taupe/40"}
        `}
            />
        </motion.div>
    );
}
