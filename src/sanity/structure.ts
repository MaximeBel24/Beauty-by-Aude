/**
 * Structure personnalisée du Sanity Studio — Beauty by Aude
 *
 * 💡 Parallèle Spring : c'est comme configurer quels endpoints exposer
 * dans un @RestController. On choisit ce qu'Aude voit dans la sidebar.
 *
 * Organisation :
 * - Singletons (Paramètres, Salon) → accès direct sans liste intermédiaire
 * - Documents ordinaires → listes avec drag & drop (orderable)
 * - Regroupement Portfolio + Catégories Photos ensemble
 */
import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Types singleton : un seul document existe, pas besoin de liste
const SINGLETON_TYPES = ["siteSettings", "salon"];

export const structure: StructureResolver = (S, context) =>
    S.list()
        .title("Contenu")
        .items([
            // ===== SINGLETONS — Accès direct au formulaire =====
            // Pas de liste intermédiaire : clic = formulaire directement
            S.listItem()
                .title("Paramètres du site")
                .icon(() => "⚙️")
                .child(
                    S.document()
                        .schemaType("siteSettings")
                        .documentId("siteSettings")
                        .title("Paramètres du site"),
                ),

            S.listItem()
                .title("Salon de beauté")
                .icon(() => "💇")
                .child(
                    S.document()
                        .schemaType("salon")
                        .documentId("salon")
                        .title("Salon de beauté"),
                ),

            S.divider(),

            // ===== SERVICES — Liste orderable (drag & drop) =====
            orderableDocumentListDeskItem({
                type: "service",
                title: "Services",
                icon: () => "💅",
                S,
                context,
            }),

            S.divider(),

            // ===== PORTFOLIO — Regroupé avec ses catégories =====
            S.listItem()
                .title("Portfolio")
                .icon(() => "🖼️")
                .child(
                    S.list()
                        .title("Portfolio")
                        .items([
                            // Photos (orderable)
                            orderableDocumentListDeskItem({
                                type: "portfolio",
                                title: "Photos",
                                icon: () => "📷",
                                S,
                                context,
                            }),
                            // Catégories de photos (orderable)
                            orderableDocumentListDeskItem({
                                type: "portfolioCategory",
                                title: "Catégories Photos",
                                icon: () => "🏷️",
                                S,
                                context,
                            }),
                        ]),
                ),

            S.divider(),

            // ===== AVIS CLIENTS — Liste orderable =====
            orderableDocumentListDeskItem({
                type: "review",
                title: "Avis Clients",
                icon: () => "⭐",
                S,
                context,
            }),
        ]);
