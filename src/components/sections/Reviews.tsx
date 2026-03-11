"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {Review, ReviewsProps} from "@/types";
import {fadeInUp, viewportConfig} from "@/lib/animations";

/**
 * Reviews — Grille de cartes d'avis clients.
 *
 * 💡 Les étoiles sont générées dynamiquement avec un Array.
 */

export default function Reviews({ reviews }: ReviewsProps) {
    return (
        <section id="avis" className="bg-[var(--bg-primary)] px-[8%] py-20">
            <SectionHeader label="Témoignages" title="Ce qu'elles" titleAccent="en pensent" />

            <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review._id}
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        custom={index}
                        className="
                          border border-[var(--border-subtle)] bg-[var(--bg-card)]
                          p-6 md:p-10
                          transition-all duration-400
                          hover:-translate-y-1
                          hover:shadow-[0_15px_40px_rgba(64,18,22,0.06)]
                        "
                    >
                        {/* Guillemet décoratif */}
                        <div className="mb-2 font-heading text-5xl leading-none text-[var(--text-decorative)]">
                            &ldquo;
                        </div>

                        {/* Étoiles */}
                        <div className="mb-4 text-[0.85rem] tracking-[2px] text-[var(--text-accent)]">
                            {Array.from({ length: review.rating }, (_, i) => (
                                <span key={i}>★ </span>
                            ))}
                        </div>

                        {/* Texte */}
                        <p className="mb-6 text-[0.95rem] italic leading-[1.8] text-[var(--text-body-color)]">
                            {review.text}
                        </p>

                        {/* Date */}
                        <p className="mt-1 text-xs text-[var(--text-accent)]">{review.date}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
