"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Reviews — Grille de cartes d'avis clients.
 *
 * 💡 Les étoiles sont générées dynamiquement avec un Array.
 * Plus tard, `rating` viendra de Sanity et on affichera le bon nombre.
 */

// Données temporaires
const reviewsData = [
    {
        _id: "1",
        name: "Sophie M.",
        rating: 5,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        date: "Il y a 2 semaines",
    },
    {
        _id: "2",
        name: "Laura D.",
        rating: 5,
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
        date: "Il y a 1 mois",
    },
    {
        _id: "3",
        name: "Camille R.",
        rating: 5,
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
        date: "Il y a 1 mois",
    },
];

export default function Reviews() {
    return (
        <section id="avis" className="bg-[#FFFBF6] px-[8%] py-28">
            <SectionHeader
                label="Témoignages"
                title="Ce qu'elles"
                titleAccent="en pensent"
            />

            <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-3">
                {reviewsData.map((review, index) => (
                    <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="
              border border-taupe/8 bg-[#FFF7EF]
              p-10
              transition-all duration-400
              hover:-translate-y-1
              hover:shadow-[0_15px_40px_rgba(64,18,22,0.06)]
            "
                    >
                        {/* Guillemet décoratif */}
                        <div className="mb-2 font-heading text-5xl leading-none text-nude">
                            &ldquo;
                        </div>

                        {/* Étoiles */}
                        <div className="mb-4 text-[0.85rem] tracking-[2px] text-taupe">
                            {Array.from({ length: review.rating }, (_, i) => (
                                <span key={i}>★ </span>
                            ))}
                        </div>

                        {/* Texte */}
                        <p className="mb-6 text-[0.95rem] italic leading-[1.8] text-[#5C3D42]">
                            {review.text}
                        </p>

                        {/* Auteur */}
                        <p className="text-[0.85rem] font-medium tracking-[0.05em] text-burgundy">
                            {review.name}
                        </p>

                        {/* Date */}
                        <p className="mt-1 text-xs text-taupe">{review.date}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}