"use client";

import {PortfolioCategory, PortfolioItem} from "@/types";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

interface PortfolioGridProps {
    items: PortfolioItem[];
    categories: PortfolioCategory[];
}

export default function PortfolioGrid({ items, categories }: PortfolioGridProps) {

    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

    const filteredItems = activeCategory === "all"
        ? items
        : items.filter(i => i.category?.value === activeCategory);

    return (
        <div>
            <div className="mx-auto mb-12 flex max-w-[1100px] flex-wrap justify-center gap-3">
                <button
                    onClick={() => setActiveCategory("all")}
                    className={`
                        cursor-pointer rounded-full px-4 py-2 sm:px-5 sm:py-2.5
                        text-[0.75rem] sm:text-[0.8rem] tracking-wide
                        transition-all duration-300
                        ${activeCategory === "all"
                        ? "bg-burgundy text-cream"
                        : "border border-[var(--border-medium)] text-[var(--text-body-color)] hover:border-[var(--text-heading)] hover:text-[var(--text-heading)]"
                    }
                    `}
                >
                    Toutes
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat._id}
                        onClick={() => setActiveCategory(cat.value)}
                        className={`
                            flex cursor-pointer items-center gap-2 rounded-full
                            px-4 py-2 sm:px-5 sm:py-2.5 text-[0.75rem] sm:text-[0.8rem] tracking-wide
                            transition-all duration-300
                            ${activeCategory === cat.value
                            ? "bg-burgundy text-cream"
                            : "border border-[var(--border-medium)] text-[var(--text-body-color)] hover:border-[var(--text-heading)] hover:text-[var(--text-heading)]"
                        }
                        `}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>
            <AnimatePresence mode={"wait"}>
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto grid max-w-[1200px] gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                >
                    {filteredItems.length === 0 ? (
                        <p className="col-span-full py-16 text-center text-[var(--text-body-color)] opacity-60 text-[0.95rem]">
                            Aucune réalisation dans cette catégorie pour le moment.
                        </p>
                    ) : filteredItems.map((item) => (
                        <motion.div
                            key={item._id}
                            onClick={() => setSelectedItem(item)}
                            className="group relative cursor-pointer overflow-hidden aspect-square"
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
                    </motion.div>
            </AnimatePresence>
            <Lightbox
                item={selectedItem}
                items={filteredItems}
                onClose={() => setSelectedItem(null)}
                onNavigate={(item) => setSelectedItem(item)}
            />
        </div>
    )
}