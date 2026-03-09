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
        // ===== HERO — Grille Bento (4 images) =====
        // heroTitle et heroSubtitle ont été retirés : le titre et le sous-titre du hero
        // sont codés en dur dans Hero.tsx pour permettre un stylage fin par mot.
        //
        // Les 4 images correspondent aux 4 positions fixes de la grille bento :
        // ┌──────────────┬────────┐
        // │   Image 1    │Image 2 │
        // │  (grande)    │(petite)│
        // ├──────────────┤────────┤
        // │   Image 3    │Image 4 │
        // │  (petite)    │(moyenne)│
        // └──────────────┴────────┘
        defineField({
            name: "heroImage1",
            title: "Hero — Image principale (haut gauche)",
            type: "image",
            description: "Grande image dominante en haut à gauche de la grille",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroImage2",
            title: "Hero — Image secondaire (haut droite)",
            type: "image",
            description: "Petite image en haut à droite de la grille",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroImage3",
            title: "Hero — Image tertiaire (bas gauche)",
            type: "image",
            description: "Petite image en bas à gauche de la grille",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroImage4",
            title: "Hero — Image quaternaire (bas droite)",
            type: "image",
            description: "Image moyenne en bas à droite de la grille",
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
        defineField({
            name: "aboutImage",
            title: "Photo de présentation",
            type: "image",
            description: "Photo d'Aude pour la section Qui suis-je",
            options: { hotspot: true },
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
