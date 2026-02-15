"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Instagram — Grille de 6 photos Instagram avec lien vers le profil.
 *
 * 💡 Plus tard, on pourra intégrer le vrai feed Instagram
 * via l'API Meta (Instagram Basic Display API) ou un widget
 * comme Behold / Elfsight. Pour l'instant, ce sont des placeholders.
 */

export default function Instagram() {
    return (
        <section className="bg-[#FFF7EF] px-[4%] py-28 text-center">
            <SectionHeader
                label="Instagram"
                title="Suivez-moi sur"
                titleAccent="Instagram"
            />

            {/* Grille 6 colonnes (3 sur mobile) */}
            <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-2 md:grid-cols-6">
                {Array.from({ length: 6 }, (_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="
              group relative aspect-square cursor-pointer
              overflow-hidden
              bg-gradient-to-br from-nude to-cream
              transition-transform duration-300
              hover:scale-[0.96]
            "
                    >
                        {/* Icône placeholder */}
                        <div className="flex h-full w-full items-center justify-center">
                            <svg
                                className="h-6 w-6 text-taupe opacity-25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="5" />
                                <circle cx="17.5" cy="6.5" r="1.5" />
                            </svg>
                        </div>

                        {/* Overlay sombre au hover */}
                        <div
                            className="
                absolute inset-0 bg-burgundy/30
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              "
                        />
                    </motion.div>
                ))}
            </div>

            {/* Lien handle */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10"
            >
                <a
                    href="#"
                    className="
            text-[0.85rem] font-normal uppercase tracking-[0.15em]
            text-rosewood no-underline
            transition-colors duration-300
            hover:text-burgundy
          "
                >
                    @beautybyaude →
                </a>
            </motion.div>
        </section>
    );
}