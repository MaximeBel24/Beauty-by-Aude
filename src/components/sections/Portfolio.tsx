"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {PortfolioItem, PortfolioProps} from "@/types";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import Lightbox from "@/components/ui/Lightbox";
import {fadeInScale, fadeInUp, viewportConfig} from "@/lib/animations";

/**
 * Portfolio — Grille de photos asymétrique (masonry-like).
 */

export default function Portfolio({ portfolioItems }: PortfolioProps) {

    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

    return (
        <section id="portfolio" className="bg-[var(--bg-secondary)] px-[4%] py-20">
            <SectionHeader label="Réalisations" title="Mon" titleAccent="portfolio" />

            {/* Grille asymétrique */}
            <div
                className="
          mx-auto grid max-w-[1200px] gap-2 sm:gap-4
          grid-cols-2
          md:grid-cols-4 md:grid-rows-[280px_280px] md:grid-flow-dense
        "
            >
                {portfolioItems.map((item, index) => (
                    <motion.div
                        key={item._id}
                        variants={fadeInScale}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        custom={index}
                        onClick={() => setSelectedItem(item)}
                        className={`
                          group relative cursor-pointer overflow-hidden
                          bg-gradient-to-br from-nude to-cream
                          ${index === 0 ? "md:row-span-2" : ""}
                          ${index === 3 ? "md:col-span-2" : ""}
                          ${index === 0 ? "aspect-square md:aspect-auto md:min-h-[280px]" : "aspect-square md:aspect-auto"}
                        `}
                    >
                        {/* Image */}
                        <Image
                            src={item.imageUrl}
                            alt={item.imageAlt ?? item.title}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Overlay au hover */}
                        <div
                            className="image-overlay"
                        >
                            <span className="font-heading text-lg italic text-cream">
                                {item.title}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lien voir toutes les réalisations */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                custom={3}
                className="mt-12 text-center"
            >
                <Link
                    href="/portfolio"
                    className="
            text-[0.8rem] font-normal uppercase tracking-[0.15em]
            text-[var(--text-muted)] no-underline
            transition-colors duration-300
            hover:text-[var(--text-heading)]
          "
                >
                    Voir toutes les réalisations →
                </Link>
            </motion.div>
            <Lightbox
                item={selectedItem ? { id: selectedItem._id, imageUrl: selectedItem.imageUrl, alt: selectedItem.imageAlt, title: selectedItem.title } : null}
                items={portfolioItems.map((p) => ({ id: p._id, imageUrl: p.imageUrl, alt: p.imageAlt, title: p.title }))}
                onClose={() => setSelectedItem(null)}
                onNavigate={(lbItem) => {
                    const found = portfolioItems.find((p) => p._id === lbItem.id);
                    if (found) setSelectedItem(found);
                }}
            />

        </section>

    );
}
