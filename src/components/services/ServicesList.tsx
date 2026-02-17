"use client"

import {ServicesProps} from "@/types";
import {useState} from "react";
import {CATEGORY_MAP, CATEGORY_ORDER} from "@/lib/categories";
import {AnimatePresence, motion} from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";

export default function Services({ services }: ServicesProps)  {

    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredServices = activeCategory === "all"
        ? services
        : services.filter(s => s.category === activeCategory);

    return (
        <div>
            <div className="mx-auto mb-12 flex max-w-[1100px] flex-wrap justify-center gap-3">
                <button
                    onClick={() => setActiveCategory("all")}
                    className={`
                        cursor-pointer rounded-full px-5 py-2.5
                        text-[0.8rem] tracking-wide
                        transition-all duration-300
                        ${activeCategory === "all"
                            ? "bg-burgundy text-cream"
                            : "border border-taupe/20 text-body hover:border-burgundy/40 hover:text-burgundy"
                        }
                    `}
                >
                    Toutes
                </button>
                {CATEGORY_ORDER.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            flex cursor-pointer items-center gap-2 rounded-full
                            px-5 py-2.5 text-[0.8rem] tracking-wide
                            transition-all duration-300
                            ${activeCategory === cat
                                ? "bg-burgundy text-cream"
                                : "border border-taupe/20 text-body hover:border-burgundy/40 hover:text-burgundy"
                            }
                        `}
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            {CATEGORY_MAP[cat].iconPaths.map((d, i) => (
                                <path key={i} d={d} />
                            ))}
                        </svg>
                        {CATEGORY_MAP[cat].label}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={service._id} service={service} index={index} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}