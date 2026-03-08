"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {PortfolioItem, PortfolioProps} from "@/types";
import Image from "next/image";

/**
 * Portfolio — Grille de photos asymétrique (masonry-like).
 */

export default function Portfolio({ portfolioItems }: PortfolioProps) {
    return (
        <section id="portfolio" className="bg-cream-light px-[4%] py-28">
            <SectionHeader label="Réalisations" title="Mon" titleAccent="portfolio" />

            {/* Grille asymétrique */}
            <div
                className="
          mx-auto grid max-w-[1200px] gap-4
          grid-cols-2
          md:grid-cols-4 md:grid-rows-[280px_280px] md:grid-flow-dense
        "
            >
                {portfolioItems.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`
                          group relative cursor-pointer overflow-hidden
                          bg-gradient-to-br from-nude to-cream
                          ${index === 0 ? "md:row-span-2" : ""}
                          ${index === 3 ? "md:col-span-2" : ""}
                          ${index === 0 ? "aspect-auto min-h-[280px]" : "aspect-square md:aspect-auto"}
                        `}
                    >
                        {/* Image */}
                        <Image
                            src={item.imageUrl}
                            alt={item.imageAlt ?? item.title}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Overlay au hover */}
                        <div
                            className="
                            absolute inset-0
                            flex items-end p-6
                            bg-gradient-to-t from-burgundy/70 via-transparent to-transparent
                            opacity-0 transition-opacity duration-400
                            group-hover:opacity-100
                          "
                        >
                            <span className="font-heading text-lg italic text-cream">
                                {item.title}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
