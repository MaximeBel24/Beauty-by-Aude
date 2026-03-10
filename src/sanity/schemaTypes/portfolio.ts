import { defineType, defineField } from "sanity";
import {
    orderRankField,
    orderRankOrdering,
} from "@sanity/orderable-document-list";

/**
 * Portfolio — Photos des réalisations d'Aude.
 *
 * 💡 orderRankField remplace le champ "order" manuel.
 * Aude peut réorganiser ses photos par drag & drop dans le Studio.
 */
export default defineType({
    name: "portfolio",
    title: "Portfolio",
    type: "document",
    icon: () => "🖼️",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "portfolio" }),
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            description: 'Ex: "Nail Art Floral", "French Manucure"',
            validation: (rule) => rule.required().max(80),
        }),
        defineField({
            name: "image",
            title: "Photo",
            type: "image",
            description: "Photo de la réalisation (format carré ou portrait recommandé)",
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
            fields: [
                defineField({
                    name: "alt",
                    title: "Texte alternatif",
                    type: "string",
                    description: "Description de l'image pour le SEO et l'accessibilité",
                }),
            ],
        }),
        defineField({
            name: "category",
            title: "Catégorie",
            type: "reference",
            description: "Catégorie de l'image du portfolio",
            to: [{ type: "portfolioCategory" }],
        }),
        defineField({
            name: "featured",
            title: "Mettre en avant",
            type: "boolean",
            description: "Afficher cette photo sur la page d'accueil (6 max recommandé)",
            initialValue: false,
            validation: (rule) =>
                rule.custom(async (value, context) => {
                    if (!value) return true;
                    const client = context.getClient({ apiVersion: "2024-01-01" });
                    const count = await client.fetch(
                        `count(*[_type == "portfolio" && featured == true && _id != $id])`,
                        { id: context.document?._id },
                    );
                    return count >= 7
                        ? "Maximum 6 photos peuvent être mises en avant"
                        : true;
                }),
        }),
    ],

    preview: {
        select: {
            title: "title",
            media: "image",
            categoryTitle: "category.title",
        },
        prepare({ title, media, categoryTitle }) {
            return {
                title: title,
                subtitle: categoryTitle || "",
                media: media,
            };
        },
    },
});
