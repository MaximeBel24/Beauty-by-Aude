"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Service, SiteSettings } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getCategoryLabel, getCategoryIcon } from "@/lib/categories";

/**
 * ServiceDetail — Page détail d'un service.
 *
 * Équivalent Spring MVC : c'est la "vue" d'un service individuel.
 * Le "controller" (page.tsx) a déjà fetch les données et les passe en props.
 *
 * Layout en 5 blocs :
 * 1. Fil d'Ariane (Accueil > Services > Titre)
 * 2. Hero split : infos à gauche + image à droite
 * 3. Description longue (si renseignée dans Sanity)
 * 4. Galerie photos (si renseignée dans Sanity)
 * 5. Lien retour vers /services
 */

interface ServiceDetailProps {
    service: Service;
    settings: SiteSettings;
}

export default function ServiceDetail({ service, settings }: ServiceDetailProps) {
    return (
        <div className="px-[8%] pt-32 pb-20">
            <div className="mx-auto max-w-[1100px]">

                {/* ═══════════════════════════════════════════
                    1. FIL D'ARIANE (Breadcrumb)
                    Aide le SEO + l'orientation utilisateur.
                    Pattern : Accueil > Services > Page actuelle
                    Le dernier élément n'est pas cliquable (page courante).
                ═══════════════════════════════════════════ */}
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex items-center gap-2 text-[0.8rem] text-body"
                >
                    <Link href="/" className="transition-colors hover:text-burgundy">
                        Accueil
                    </Link>
                    <span className="text-taupe">/</span>
                    <Link href="/services" className="transition-colors hover:text-burgundy">
                        Services
                    </Link>
                    <span className="text-taupe">/</span>
                    <span className="font-medium text-burgundy">{service.title}</span>
                </motion.nav>

                {/* ═══════════════════════════════════════════
                    2. HERO — Infos centrées
                    Layout centré sur une seule colonne.
                    Badge catégorie, titre, prix, durée, description, CTA
                ═══════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-[700px] text-center"
                >
                    {/* Badge catégorie — pilule avec icône, même style que les filtres */}
                    {service.category && (
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-taupe/20 px-4 py-1.5 text-[0.75rem] uppercase tracking-wider text-taupe">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                {getCategoryIcon(service.category).map((d, i) => (
                                    <path key={i} d={d} />
                                ))}
                            </svg>
                            {getCategoryLabel(service.category)}
                        </div>
                    )}

                    {/* Titre du service */}
                    <h1 className="mb-6 font-heading text-[clamp(2rem,4vw,3rem)] font-light leading-tight text-burgundy">
                        {service.title}
                    </h1>

                    {/* Prix + Durée */}
                    <div className="mb-6 flex items-baseline justify-center gap-3">
                        <span className="font-heading text-[1.8rem] font-medium text-taupe">
                            {formatPrice(service.price)}
                        </span>
                        {service.duration && (
                            <span className="text-[0.9rem] text-body">
                                · {service.duration}
                            </span>
                        )}
                    </div>

                    {/* Description longue */}
                    <p className="mb-8 text-[0.95rem] leading-relaxed text-body">
                        {service.longDescription ?? service.description}
                    </p>

                    {/* Bouton Réserver — redirige vers Planity */}
                    <a
                        href={settings.planityUrl ?? "#"}
                        target="_blank"
                        className="
                            group inline-flex items-center gap-3
                            bg-burgundy px-8 py-3.5
                            text-[0.8rem] font-medium uppercase tracking-[0.15em]
                            text-cream no-underline
                            transition-all duration-400
                            hover:-translate-y-0.5
                            hover:shadow-[0_10px_40px_rgba(64,18,22,0.15)]
                        "
                    >
                        Réserver ce service
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>

                {/* ═══════════════════════════════════════════
                    4. GALERIE PHOTOS
                    Affichée si plus d'une image (la première est dans le hero).
                    .slice(1) retire la première image du tableau,
                    comme .subList(1, list.size()) en Java.
                ═══════════════════════════════════════════ */}
                {service.gallery && service.gallery.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-20"
                    >
                        <h2 className="mb-8 text-center font-heading text-[1.5rem] font-light text-burgundy">
                            Réalisations
                        </h2>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                            {service.gallery.slice(1).map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group relative h-[350px] cursor-pointer overflow-hidden"
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
                                    <div className="
                                        absolute inset-0
                                        flex items-end p-4
                                        bg-gradient-to-t from-burgundy/70 via-transparent to-transparent
                                        opacity-0 transition-opacity duration-400
                                        group-hover:opacity-100
                                    ">
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
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16"
                >
                    <Link
                        href="/services"
                        className="text-[0.85rem] text-rosewood transition-colors hover:text-burgundy"
                    >
                        ← Retour aux services
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
