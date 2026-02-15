"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Portfolio — Grille de photos asymétrique (masonry-like).
 *
 * 💡 La grille utilise grid-row: span 2 et grid-column: span 2
 * sur certains items pour créer un effet de mise en page dynamique,
 * comme dans le mockup original.
 *
 * Plus tard, les images viendront de Sanity via urlFor() pour
 * servir des images optimisées (redimensionnées, format WebP).
 */

// Données temporaires
const portfolioData = [
    { _id: "1", title: "Nail Art Floral", category: "nailart" },
    { _id: "2", title: "French Manucure", category: "french" },
    { _id: "3", title: "Pose Gel", category: "gel" },
    { _id: "4", title: "Manucure Nude", category: "manucure" },
    { _id: "5", title: "Nail Art Géométrique", category: "nailart" },
];

export default function Portfolio() {
    return (
        <section id="portfolio" className="bg-[#FFF7EF] px-[4%] py-28">
            <SectionHeader
                label="Réalisations"
                title="Mon"
                titleAccent="portfolio"
            />

            {/* Grille asymétrique */}
            <div
                className="
          mx-auto grid max-w-[1200px] gap-4
          grid-cols-2
          md:grid-cols-4 md:grid-rows-[280px_280px]
        "
            >
                {portfolioData.map((item, index) => (
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
                        {/* Placeholder image */}
                        <div className="flex h-full w-full items-center justify-center">
                            <svg
                                className="h-8 w-8 text-taupe opacity-30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </div>

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