"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {Service, ServicesProps} from "@/types";
import ServiceCard from "@/components/ui/ServiceCard";

/**
 * Services — Grille de cartes de prestations.
 */

export default function Services({ services }: ServicesProps) {
    return (
        <section id="services" className="bg-[#FFFBF6] px-[8%] py-28">
            <SectionHeader label="Prestations" title="Nos" titleAccent="services" />

            {/* Grille de cartes */}
            <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <ServiceCard key={service._id} service={service} index={index} />
                ))}
            </div>

            {/* Lien voir tous les services */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 text-center"
            >
                <a
                    href="/services"
                    className="
            text-[0.8rem] font-normal uppercase tracking-[0.15em]
            text-rosewood no-underline
            transition-colors duration-300
            hover:text-burgundy
          "
                >
                    Voir tous les services →
                </a>
            </motion.div>
        </section>
    );
}
