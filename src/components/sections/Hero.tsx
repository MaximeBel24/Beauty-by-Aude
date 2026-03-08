"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SettingsProps } from "@/types";
import HeroBentoGrid from "@/components/hero/HeroBentoGrid";

/**
 * Hero — Section d'accroche plein écran, split en 2 colonnes.
 *
 * 💡 Framer Motion :
 * - `initial` = état de départ (invisible, décalé)
 * - `animate` = état final (visible, en place)
 * - `transition` = comment passer de l'un à l'autre (durée, délai, easing)
 *
 * Les délais décalés (0.2, 0.4, 0.6...) créent un effet de cascade
 * où chaque élément apparaît l'un après l'autre.
 */

export default function Hero({ settings }: SettingsProps) {
    if (!settings) return null;
    return (
        <section className="relative grid h-screen grid-cols-1 overflow-hidden md:grid-cols-2">
            {/* Colonne gauche — Contenu */}
            <div className="z-2 flex flex-col justify-center px-[6%] pt-32 pb-16 md:px-[8%] md:pt-32 md:pb-16">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8 flex items-center gap-4"
                >
                    <span className="h-px w-10 bg-taupe" />
                    <span className="text-[0.7rem] font-normal uppercase tracking-[0.35em] text-taupe">
                        Manucure professionnelle
                    </span>
                </motion.div>

                {/* Titre — codé en dur pour styler chaque mot indépendamment */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-heading text-[clamp(3rem,5vw,4.5rem)] font-light leading-[1.1] text-burgundy"
                >
                    Des mains<br />
                    qui <em className="italic">subliment</em><br />
                    les vôtres
                </motion.h1>

                {/* Sous-titre — codé en dur comme le titre */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-10 mt-6 max-w-[420px] text-[1.05rem] leading-[1.8] text-body"
                >
                    Experte en manucure, pose de gel et semi-permanent.
                    Des prestations sur mesure, réalisées avec passion et minutie.
                </motion.p>
                {/* Boutons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center gap-5"
                >
                    {/* CTA Principal */}
                    <Link
                        href={settings.planityUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group inline-flex items-center gap-3
                          bg-burgundy px-9 py-4
                          text-[0.8rem] font-normal uppercase tracking-[0.18em]
                          text-cream no-underline
                          transition-all duration-400
                          hover:-translate-y-0.5 hover:bg-rosewood
                          hover:shadow-[0_8px_30px_rgba(64,18,22,0.2)]
                        "
                    >
                        Réserver sur Planity
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    {/* Lien secondaire */}
                    <Link
                        href="#services"
                        className="
              group relative px-0 py-4
              text-[0.8rem] font-normal uppercase tracking-[0.15em]
              text-rosewood no-underline
              transition-colors duration-300
              hover:text-burgundy
            "
                    >
                        Découvrir Mes services
                        <span
                            className="
                absolute bottom-3 left-0 h-px w-full
                bg-nude transition-colors duration-300
                group-hover:bg-taupe
              "
                        />
                    </Link>
                </motion.div>
            </div>

            {/* Colonne droite — Image placeholder */}
            <HeroBentoGrid />

        </section>
    );
}
