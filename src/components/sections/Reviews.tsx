"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {Review, ReviewsProps} from "@/types";

/**
 * Reviews — Grille de cartes d'avis clients.
 *
 * 💡 Les étoiles sont générées dynamiquement avec un Array.
 */

export default function Reviews({ reviews }: ReviewsProps) {
    return (
        <section id="avis" className="bg-white-warm px-[8%] py-20">
            <SectionHeader label="Témoignages" title="Ce qu'elles" titleAccent="en pensent" />

            <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-3">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="
              border border-taupe/8 bg-cream-light
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
                        <p className="mb-6 text-[0.95rem] italic leading-[1.8] text-body">
                            {review.text}
                        </p>

                        {/* Date */}
                        <p className="mt-1 text-xs text-taupe">{review.date}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
