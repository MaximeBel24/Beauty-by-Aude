"use client";

import {PortfolioCategory, PortfolioItem} from "@/types";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import CategoryDropdown from "@/components/ui/CategoryDropdown";

interface PortfolioGridProps {
    items: PortfolioItem[];
    categories: PortfolioCategory[];
}

export default function PortfolioGrid({ items, categories }: PortfolioGridProps) {

    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

    const filteredItems = activeCategory === "all"
        ? items
        : items.filter(i => i.categories?.some(cat => cat.value === activeCategory));

    return (
        <div>
            {/* Dropdown filtre */}
            <CategoryDropdown
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
            />

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