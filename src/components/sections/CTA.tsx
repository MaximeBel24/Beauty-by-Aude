"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { SettingsProps } from "@/types";
import PlanityButton from "@/components/ui/PlanityButton";
import {fadeInUp, viewportConfig} from "@/lib/animations";

/**
 * CTA — Section d'appel à l'action avec fond burgundy.
 *
 * 💡 Les pseudo-éléments ::before du mockup (radial-gradient)
 * sont recréés ici avec des divs positionnés en absolute.
 * Tailwind ne supporte pas nativement les pseudo-éléments complexes,
 * donc on utilise des divs dédiées pour les effets de fond.
 */

export default function CTA({ settings }: SettingsProps) {
    if (!settings) return null;
    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-[var(--bg-cta)] px-[8%] py-16 text-center md:py-24"
        >
            {/* Effets de fond — radial gradients */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradients tokenisés — s'adaptent au dark mode via --bg-cta-gradient-* */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,var(--bg-cta-gradient-1)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,var(--bg-cta-gradient-2)_0%,transparent_60%)]" />
            </div>

            {/* Contenu */}
            <div className="relative z-10">
                <SectionHeader
                    label="Prête à vous faire belle ?"
                    title="Réservez votre"
                    titleAccent="rendez-vous"
                    light
                />

                {/* Texte */}
                <motion.p
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    custom={2}
                    className="-mt-6 mb-10 text-[1.05rem] leading-[1.7] text-nude"
                >
                    Prenez rendez-vous en ligne en quelques clics.
                </motion.p>

                {/* Bouton Planity */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    custom={4}
                    className="flex flex-col items-center gap-5"
                >
                    <PlanityButton
                        href={settings.planityUrl ?? "#"}
                        label="Réserver en ligne"
                        className="
                          bg-cream px-8 py-3.5 sm:px-11 sm:py-4
                          text-burgundy no-underline
                            hover:bg-cream-dark
                            hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]
                        "
                    />

                    {/* Téléphone — lien tel: cliquable sur mobile */}
                    {settings.phone && (
                        <a
                            href={`tel:${settings.phone.replace(/\s/g, "")}`}
                            className="
                              group text-[0.9rem] text-nude/80 no-underline
                              transition-all duration-300
                              hover:text-cream
                            "
                        >
                            Ou appelez-nous au{" "}
                            <span className="
                                font-medium text-cream
                                underline underline-offset-4
                                lg:no-underline lg:bg-[linear-gradient(currentColor,currentColor)]
                                lg:bg-[length:0%_1px] lg:bg-left-bottom lg:bg-no-repeat
                                lg:transition-[background-size] lg:duration-300
                                lg:group-hover:bg-[length:100%_1px]
                            ">
                                {settings.phone}
                            </span>
                        </a>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
