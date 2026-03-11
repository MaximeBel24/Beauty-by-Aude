"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Service, SiteSettings } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getCategoryLabel, getCategoryIcon } from "@/lib/categories";
import PlanityButton from "@/components/ui/PlanityButton";
import {fadeInUp, viewportConfig} from "@/lib/animations";

/**
 * ServiceDetail — Page détail d'un service.
 *
 * Équivalent Spring MVC : c'est la "vue" d'un service individuel.
 * Le "controller" (page.tsx) a déjà fetch les données et les passe en props.
 *
 * Le breadcrumb a été extrait dans un composant <Breadcrumb> réutilisable,
 * rendu côté serveur dans page.tsx (Server Component) pour le SEO.
 *
 * Layout en 4 blocs :
 * 1. Hero centré : badge catégorie, titre, prix, durée, description, CTA
 * 2. Galerie photos (si renseignée dans Sanity)
 * 3. Lien retour vers /services
 */

interface ServiceDetailProps {
    service: Service;
    settings: SiteSettings | null;
}

export default function ServiceDetail({ service, settings }: ServiceDetailProps) {
    if (!settings) return null;
    return (
        <div className="px-[8%] pb-20">
            <div className="mx-auto max-w-[1100px]">

                {/* ═══════════════════════════════════════════
                    1. HERO — Infos centrées
                    Layout centré sur une seule colonne.
                    Badge catégorie, titre, prix, durée, description, CTA
                ═══════════════════════════════════════════ */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto max-w-[700px] text-center"
                >
                    {/* Badge catégorie — pilule avec icône, même style que les filtres */}
                    {service.category && (
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-medium)] px-4 py-1.5 text-[0.75rem] uppercase tracking-wider text-[var(--text-accent)]">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                {getCategoryIcon(service.category).map((d, i) => (
                                    <path key={i} d={d} />
                                ))}
                            </svg>
                            {getCategoryLabel(service.category)}
                        </div>
                    )}

                    {/* Titre du service */}
                    <h1 className="mb-6 font-heading text-[clamp(2rem,4vw,3rem)] font-light leading-tight text-[var(--text-heading)]">
                        {service.title}
                    </h1>

                    {/* Prix + Durée */}
                    <div className="mb-6 flex items-baseline justify-center gap-3">
                        <span className="font-heading text-[2.2rem] font-semibold text-[var(--text-heading)]">
                            {formatPrice(service.price)}
                        </span>
                        {service.duration && (
                            <span className="text-[0.9rem] text-[var(--text-body-color)]">
                                · {service.duration}
                            </span>
                        )}
                    </div>

                    {/* Description longue */}
                    <p className="mb-8 text-[0.95rem] leading-relaxed text-[var(--text-body-color)]">
                        {service.longDescription ?? service.description}
                    </p>

                    {/* Bouton Réserver — redirige vers Planity */}
                    <PlanityButton
                        href={settings.planityUrl ?? "#"}
                        label="Réserver ce service"
                        className="
                        bg-burgundy px-8 py-3.5
                        text-cream no-underline
                        hover:shadow-[0_10px_40px_rgba(64,18,22,0.15)]"
                    />
                </motion.div>

                {/* ═══════════════════════════════════════════
                    4. GALERIE PHOTOS
                    Affichée si plus d'une image (la première est dans le hero).
                    .slice(1) retire la première image du tableau,
                    comme .subList(1, list.size()) en Java.
                ═══════════════════════════════════════════ */}
                {service.gallery && service.gallery.length > 0 && (
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        className="mt-20"
                    >
                        <h2 className="mb-8 text-center font-heading text-[1.5rem] font-light text-[var(--text-heading)]">
                            Réalisations
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {service.gallery.slice(1).map((image, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportConfig}
                                    custom={index}
                                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden sm:h-[250px] sm:aspect-auto lg:h-[350px]"
                                >
                                    {/* Image — h-full w-full force l'image à remplir le conteneur,
                                        object-cover recadre proprement (comme background-size: cover en CSS) */}
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.alt ?? `${service.title} - photo ${index + 2}`}
                                        width={400}
                                        height={400}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay au hover — même pattern que le Portfolio.
                                        "group" sur le parent + "group-hover:opacity-100" ici :
                                        quand on survole le conteneur parent, l'overlay apparaît.
                                        C'est le même principe qu'un :hover en CSS, mais propagé au parent. */}
                                    <div className="image-overlay">
                                        <span className="font-heading text-base italic text-cream">
                                            {image.alt ?? service.title}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ═══════════════════════════════════════════
                    5. LIEN RETOUR
                    UX : évite que l'utilisateur doive utiliser
                    le bouton "retour" du navigateur.
                ═══════════════════════════════════════════ */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className="mt-16"
                >
                    <Link
                        href="/services"
                        className="text-[0.85rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text-heading)]"
                    >
                        ← Retour aux services
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
