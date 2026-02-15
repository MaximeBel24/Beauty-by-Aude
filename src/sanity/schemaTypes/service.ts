import { defineType, defineField } from "sanity";

export default defineType({
    name: "service",
    title: "Services",
    type: "document",
    icon: () => "💅",
    fields: [
        defineField({
            name: "title",
            title: "Nom du service",
            type: "string",
            description: 'Ex: "Pose Semi-Permanent", "Nail Art"',
            validation: (rule) => rule.required().max(80),
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
                    { title: "Manucure", value: "manucure" },
                    { title: "Pose & Extensions", value: "pose" },
                    { title: "Nail Art", value: "nailart" },
                    { title: "Soins", value: "soins" },
                    { title: "Autre", value: "autre" },
                ],
            },
        }),
        defineField({
            name: "order",
            title: "Ordre d'affichage",
            type: "number",
            description: "Les services sont triés par ce numéro (1 = premier affiché)",
            initialValue: 0,
        }),
    ],

    // Personnalise l'aperçu dans la liste de Sanity Studio
    preview: {
        select: {
            title: "title",
            price: "price",
            duration: "duration",
            category: "category",
        },
        prepare({ title, price, duration, category }) {
            return {
                title: title,
                subtitle: `${price}€ · ${duration || ""} · ${category || ""}`,
            };
        },
    },
});
