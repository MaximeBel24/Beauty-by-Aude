import { defineType, defineField } from "sanity";

/**
 * Singleton : un seul document de ce type existe.
 * C'est le "panneau de contrôle" du site — Aude y configure
 * les textes principaux, les liens, et les infos de contact.
 */
export default defineType({
    name: "siteSettings",
    title: "Paramètres du site",
    type: "document",
    icon: () => "⚙️",
    fields: [
        // ===== HERO =====
        defineField({
            name: "heroTitle",
            title: "Titre principal",
            type: "string",
            description: "Le grand titre sur la page d'accueil",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "heroSubtitle",
            title: "Sous-titre",
            type: "text",
            description: "Le texte sous le titre principal",
            rows: 3,
        }),
        defineField({
            name: "heroImage",
            title: "Image Hero",
            type: "image",
            description: "Image principale de la page d'accueil",
            options: { hotspot: true },
        }),

        // ===== BRANDING =====
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            description: "Le logo du site (affiché dans la navbar et le footer)",
        }),

        // ===== À PROPOS =====
        defineField({
            name: "aboutText",
            title: "Texte de présentation",
            type: "text",
            description: "Courte présentation d'Aude et de son activité",
            rows: 5,
        }),

        // ===== LIENS EXTERNES =====
        defineField({
            name: "planityUrl",
            title: "Lien Planity",
            type: "url",
            description: "URL de la page de réservation Planity",
            validation: (rule) =>
                rule.uri({
                    scheme: ["http", "https"],
                }),
        }),
        defineField({
            name: "instagramUrl",
            title: "Lien Instagram",
            type: "url",
            description: "URL du profil Instagram",
        }),
        defineField({
            name: "instagramHandle",
            title: "Handle Instagram",
            type: "string",
            description: 'Sans le @, ex: "beautybyaude"',
        }),

        // ===== CONTACT =====
        defineField({
            name: "phone",
            title: "Téléphone",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (rule) =>
                rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                    name: "email",
                    invert: false,
                }),
        }),
        defineField({
            name: "address",
            title: "Adresse",
            type: "text",
            rows: 2,
            description: "Adresse complète du salon / lieu d'exercice",
        }),
        defineField({
            name: "city",
            title: "Ville",
            type: "string",
            description: "Important pour le SEO local (ex: Noisy-le-Grand)",
        }),

        // ===== SEO =====
        defineField({
            name: "seoTitle",
            title: "Titre SEO",
            type: "string",
            description: "Titre qui apparaît dans l'onglet du navigateur et les résultats Google",
            validation: (rule) => rule.max(60),
        }),
        defineField({
            name: "seoDescription",
            title: "Description SEO",
            type: "text",
            description: "Description pour les résultats Google (max 160 caractères)",
            rows: 3,
            validation: (rule) => rule.max(160),
        }),
    ],

    preview: {
        prepare() {
            return {
                title: "Paramètres du site",
                subtitle: "Configuration générale",
            };
        },
    },
});
