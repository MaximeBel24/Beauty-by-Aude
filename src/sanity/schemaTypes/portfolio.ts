import { defineType, defineField } from "sanity";

export default defineType({
    name: "portfolio",
    title: "Portfolio",
    type: "document",
    icon: () => "🖼️",
    fields: [
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
                hotspot: true, // Permet à Aude de choisir le point focal de l'image
            },
            validation: (rule) => rule.required(),
            fields: [
                // Sous-champ pour le texte alternatif (SEO + accessibilité)
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
            type: "string",
            options: {
                list: [
                    { title: "Manucure", value: "manucure" },
                    { title: "Pose Gel", value: "gel" },
                    { title: "Nail Art", value: "nailart" },
                    { title: "Semi-Permanent", value: "semipermanent" },
                    { title: "French", value: "french" },
                    { title: "Autre", value: "autre" },
                ],
            },
        }),
        defineField({
            name: "order",
            title: "Ordre d'affichage",
            type: "number",
            description: "Les photos sont triées par ce numéro (1 = première affichée)",
            initialValue: 0,
        }),
    ],

    preview: {
        select: {
            title: "title",
            media: "image",
            category: "category",
        },
        prepare({ title, media, category }) {
            return {
                title: title,
                subtitle: category || "",
                media: media,
            };
        },
    },
});