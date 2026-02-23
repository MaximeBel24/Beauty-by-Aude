import { defineType, defineField } from "sanity";

export default defineType({
    name: "review",
    title: "Avis Clients",
    type: "document",
    icon: () => "⭐",
    fields: [
        defineField({
            name: "rating",
            title: "Note (étoiles)",
            type: "number",
            description: "Note de 1 à 5",
            validation: (rule) => rule.required().min(1).max(5).integer(),
            initialValue: 5,
        }),
        defineField({
            name: "text",
            title: "Commentaire",
            type: "text",
            rows: 4,
            validation: (rule) => rule.required().max(500),
        }),
        defineField({
            name: "date",
            title: "Date de l'avis",
            type: "date",
            initialValue: () => new Date().toISOString().split("T")[0],
            options: {
                dateFormat: "DD/MM/YYYY",
            },
        }),
        defineField({
            name: "featured",
            title: "Mettre en avant",
            type: "boolean",
            description: "Si activé, cet avis apparaîtra en priorité sur la page d'accueil",
            initialValue: false,
        }),
    ],

    preview: {
        select: {
            rating: "rating",
            text: "text",
            featured: "featured",
        },
        prepare({ rating, text, featured }) {
            const stars = "★".repeat(rating || 0) + "☆".repeat(5 - (rating || 0));
            return {
                title: `${stars}${featured ? " 📌" : ""}`,
                subtitle: `${text?.slice(0, 60) || ""}...`,
            };
        },
    },
});
