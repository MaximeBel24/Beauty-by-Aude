import { defineType, defineField } from "sanity";
import {
    orderRankField,
    orderRankOrdering,
} from "@sanity/orderable-document-list";

/**
 * Service — Prestations proposées par Aude.
 *
 * 💡 orderRankField remplace le champ "order" manuel.
 * Il génère un champ caché "orderRank" que le plugin drag & drop
 * met à jour automatiquement. Plus de doublons d'ordre possibles !
 */
export default defineType({
    name: "service",
    title: "Services",
    type: "document",
    icon: () => "💅",
    // Tri par défaut dans le Studio (menu "Sort by")
    orderings: [orderRankOrdering],
    fields: [
        // Champ caché géré par le plugin drag & drop
        orderRankField({ type: "service" }),
        defineField({
            name: "title",
            title: "Nom du service",
            type: "string",
            description: 'Ex: "Pose Semi-Permanent", "Nail Art"',
            validation: (rule) => rule.required().max(80),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "Identifiant URL (cliquez Generate pour le créer automatiquement)",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            description: "Courte description du service (1-2 phrases)",
            rows: 3,
            validation: (rule) => rule.max(200),
        }),
        defineField({
            name: "longDescription",
            title: "Description Longue",
            type: "text",
            description: "Description détaillée affichée sur la page du service",
            rows: 6,
        }),
        defineField({
            name: "price",
            title: "Prix (€)",
            type: "number",
            description: "Prix en euros (ex: 35)",
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: "duration",
            title: "Durée",
            type: "string",
            description: 'Ex: "45 min", "1h", "1h30"',
        }),
        defineField({
            name: "category",
            title: "Catégorie",
            type: "string",
            options: {
                list: [
                    { title: "Semi-Permanent", value: "semipermanent" },
                    { title: "Pose & Extensions Gel", value: "gel-extensions" },
                    { title: "Entretien et Retouches", value: "entretien" },
                    { title: "Beauté des Pieds", value: "pieds" },
                    { title: "Extras & Nail Art", value: "extras" },
                ],
            },
        }),
        defineField({
            name: "featured",
            title: "Mettre en avant",
            type: "boolean",
            description: "Afficher ce service sur la page d'accueil (6 max recommandé)",
            initialValue: false,
            validation: (rule) =>
                rule.custom(async (value, context) => {
                    if (!value) return true;
                    const client = context.getClient({ apiVersion: "2024-01-01" });
                    const count = await client.fetch(
                        `count(*[_type == "service" && featured == true && _id != $id])`,
                        { id: context.document?._id },
                    );
                    return count >= 7
                        ? "Maximum 6 services peuvent être mis en avant"
                        : true;
                }),
        }),
        defineField({
            name: "gallery",
            title: "Galerie",
            type: "array",
            description: "Photos de réalisations liées à ce service",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alternative",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),
    ],

    preview: {
        select: {
            title: "title",
            price: "price",
            duration: "duration",
            category: "category",
            featured: "featured",
        },
        prepare({ title, price, duration, category, featured }) {
            return {
                title: `${featured ? "⭐ " : ""}${title}`,
                subtitle: `${price}€ · ${duration || ""} · ${category || ""}`,
            };
        },
    },
});
