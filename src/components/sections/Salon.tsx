"use client";

import {Salon as SalonType, SalonProps, SiteSettings} from "@/types";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import {fadeInLeft, fadeInRight, viewportConfig} from "@/lib/animations";

export default function Salon({salon, settings}: SalonProps) {
    if (!settings) return null;
    if (!salon) return null;
    return (
        <section id="salon" className="bg-[var(--bg-primary)] px-[4%] py-20">
            <SectionHeader label={"Le salon"} title={"Venez"} titleAccent={"nous voir"} />

            <div className="mx-auto mt-8 grid max-w-[1100px] grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
                {/* — Colonne gauche : Horaires — */}
                <motion.div
                    variants={fadeInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                >
                    <h3 className="mb-6 font-heading text-[1.4rem] font-light text-[var(--text-heading)]">
                        Horaires d'ouverture
                    </h3>
                    <div className="space-y-3">
                        {salon.openingHours?.map((item, index) => (
                            <div key={index} className="flex justify-between border-b border-[var(--border-medium)] pb-3">
                                <span className="text-[0.9rem] font-medium text-[var(--text-heading)]">{item.day ?? ""}</span>
                                <span className="text-[0.9rem] text-[var(--text-body-color)]">{item.hours ?? ""}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* — Colonne droite : Carte Google Maps — */}
                <motion.div
                    variants={fadeInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    custom={2}
                    className="h-[280px] overflow-hidden md:h-[400px]"
                >
                    {/* 💡 Dark mode Maps — astuce CSS sans API payante !
                        La classe .maps-dark-mode (définie dans globals.css) applique
                        invert(1) + hue-rotate(180deg) quand .dark est sur <html>.
                        Ça inverse les couleurs (blanc → noir) puis re-décale la teinte
                        pour retrouver les bonnes couleurs (routes, parcs, eau) sur fond sombre.

                        Pourquoi une classe CSS plutôt que dark:invert de Tailwind ?
                        Les utilitaires Tailwind décomposent filter en variables internes
                        (--tw-invert, etc.) qui composent mal sur les iframes au toggle.
                        Une règle CSS directe est plus fiable. */}
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address ?? "")}&output=embed&z=15`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="maps-dark-mode"
                    />
                </motion.div>
            </div>
        </section>
    )

}