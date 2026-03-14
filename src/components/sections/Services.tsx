"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {ServicesProps} from "@/types";
import ServiceCard from "@/components/ui/ServiceCard";
import Link from "next/link";

/**
 * Services — Grille de cartes de prestations.
 */

export default function Services({ services }: ServicesProps) {
    return (
        <section id="services" className="bg-[var(--bg-primary)] px-[8%] py-20">
            <SectionHeader label="Prestations" title="Nos" titleAccent="services" />

            {/* Scroll horizontal mobile / Grille desktop
                - Mobile : flex horizontal avec scroll snap pour un swipe naturel
                - sm+ : grille classique 2 puis 3 colonnes */}
            <div className="
                mx-auto max-w-[1100px]
                flex gap-5 overflow-x-auto snap-x snap-mandatory
                pb-4 -mx-[8%] px-[8%]
                sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-auto sm:px-0
                lg:grid-cols-3
                scrollbar-hide
            ">
                {services.map((service, index) => (
                    <div key={service._id} className="min-w-[80vw] snap-center sm:min-w-0">
                        <ServiceCard service={service} index={index} />
                    </div>
                ))}
            </div>

            {/* Indicateur de swipe — visible uniquement sur mobile */}
            <div className="mt-2 flex items-center justify-center gap-2 text-[0.75rem] text-[var(--text-muted)] sm:hidden">
                <span>Glissez pour voir plus</span>
                <span>→</span>
            </div>

            {/* Lien voir tous les services */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 text-center"
            >
                <Link
                    href="/services"
                    className="
                        text-[0.8rem] font-normal uppercase tracking-[0.15em]
                        text-[var(--text-muted)] no-underline
                        transition-colors duration-300
                        hover:text-[var(--text-heading)]
                      "
                >
                    Voir tous les services →
                </Link>
            </motion.div>
        </section>
    );
}
