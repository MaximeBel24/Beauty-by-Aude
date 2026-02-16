import {Service} from "@/types";
import Link from "next/link";
import {formatPrice} from "@/lib/utils";
import { motion } from "framer-motion";
import {getCategoryIcon} from "@/lib/categories";

interface ServiceCardProps {
    service: Service;
    index: number;
}

export default function ServiceCard({service, index}: ServiceCardProps) {

    return (
        <Link href={`/services/${service.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="
                          group relative cursor-pointer overflow-hidden
                          border border-taupe/10 bg-[#FFF7EF]
                          px-8 py-10
                          transition-all duration-500
                          ease-[cubic-bezier(0.25,0.8,0.25,1)]
                          hover:-translate-y-1
                          hover:bg-[#FFFBF6]
                          hover:shadow-[0_20px_60px_rgba(64,18,22,0.08)]
                        "
            >
                {/* Ligne accent top — apparaît au hover */}
                <div
                    className="
                absolute left-0 top-0 h-0.5 w-full
                origin-left scale-x-0
                bg-gradient-to-r from-taupe to-rosewood
                transition-transform duration-500
                ease-[cubic-bezier(0.25,0.8,0.25,1)]
                group-hover:scale-x-100
              "
                />

                {/* Icône */}
                <div
                    className="
                mb-6 flex h-[42px] w-[42px] items-center justify-center
                border border-nude text-taupe
                transition-all duration-400
                group-hover:border-burgundy group-hover:bg-burgundy
                group-hover:text-cream
              "
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        {getCategoryIcon(service.category ?? "").map((d, i) => (
                            <path key={i} d={d}/>
                        ))}
                    </svg>
                </div>

                {/* Nom du service */}
                <h3 className="mb-2 font-heading text-[1.3rem] font-medium text-burgundy">
                    {service.title}
                </h3>

                {/* Description */}
                <p className="mb-5 text-[0.88rem] leading-relaxed text-[#5C3D42]">
                    {service.description}
                </p>

                {/* Prix + Durée */}
                <div className="flex items-baseline gap-2">
                            <span className="font-heading text-[1.4rem] font-medium text-taupe">
                                {formatPrice(service.price)}
                            </span>
                    {service.duration && (
                        <span className="text-[0.8rem] font-light text-[#5C3D42]">
                            · {service.duration}
                        </span>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}