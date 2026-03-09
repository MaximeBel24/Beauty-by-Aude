import {defineField, defineType} from "sanity";

export default defineType({
    name: "portfolioCategory",
    title: "Catégorie Portfolio",
    type: "document",
    icon: () => "🏷️",
    fields: [
        defineField({
            name: "title",
            title: "Titre",
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
        defineField({
            name: "order",
            title: "Ordre d'affichage",
            type: "number",
            description: "Les boutons sont triés par ce numéro (1 = premier affiché)",
            initialValue: 0,
        }),
    ],

    preview: {
        select: {
            title: "title",
            order: "order",
        },
        prepare({ title, order }) {
            return {
                title: title,
                subtitle: `Ordre : ${order ?? 0}`,
            };
        },
    },

})