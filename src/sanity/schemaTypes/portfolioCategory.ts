import { defineField, defineType } from "sanity";
import {
    orderRankField,
    orderRankOrdering,
} from "@sanity/orderable-document-list";

/**
 * Catégories Photos — Types de réalisations pour le portfolio.
 *
 * 💡 Renommé de "Catégorie Portfolio" à "Catégories Photos" pour
 * être plus parlant pour Aude. Le name technique reste "portfolioCategory"
 * (pas de breaking change côté données).
 */
export default defineType({
    name: "portfolioCategory",
    // title visible dans le Studio — plus clair pour Aude
    title: "Catégories Photos",
    type: "document",
    icon: () => "🏷️",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "portfolioCategory" }),
        defineField({
            name: "title",
            title: "Nom de la catégorie",
            type: "string",
            description: "Le label affiché ('Nail Art', 'Semi Permanent')",
            validation: (rule) => rule.required().max(80),
        }),
        defineField({
            name: "value",
            title: "Valeur",
            type: "slug",
            description: "Identifiant URL (cliquez Generate pour le créer automatiquement)",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
    ],

    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                title: title,
            };
        },
    },
});
