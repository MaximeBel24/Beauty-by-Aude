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
            type: "reference",
            description: "Catégorie de l'image du portfolio",
            to: [{ type: "portfolioCategory" }],
        }),
        defineField({
            name: "featured",
            title: "Mettre en avant",
            type: "boolean",
            description: "Afficher ce service sur la page d'accueil (4-6 max recommandé)",
            initialValue: false,
            validation: (rule) =>
                rule.custom(async (value, context) => {
                    // Si on décoche, pas de problème
                    if (!value) return true;

                    const client = context.getClient({ apiVersion: "2024-01-01" });
                    const count = await client.fetch(
                        `count(*[_type == "portfolio" && featured == true && _id != $id])`,
                        { id: context.document?._id },
                    );

                    return count >= 7 ? "Maximum 6 photos peuvent être mis en avant" : true;
                }),
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
            categoryTitle: "category.title",  // ← suit la référence !
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
