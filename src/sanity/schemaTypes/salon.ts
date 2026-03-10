import { defineField, defineType } from "sanity";

/**
 * Salon — Document singleton pour les infos du salon.
 *
 * 💡 Le preview avec un titre statique évite l'affichage brut
 * "openingHours: [{day: ..., hours: ...}]" dans la liste.
 * De toute façon, c'est un singleton (accès direct via la structure),
 * donc la preview ne sert que comme titre dans l'éditeur.
 */
export default defineType({
    name: "salon",
    title: "Salon de beauté",
    type: "document",
    icon: () => "💇",
    fields: [
        defineField({
            name: "openingHours",
            title: "Horaires d'ouvertures",
            type: "array",
            description: "Jours et horaires d'ouverture et de fermeture du salon",
            of: [
                {
                    type: "object",
                    // Preview des items de l'array : "Lundi — 9h-18h"
                    preview: {
                        select: {
                            day: "day",
                            hours: "hours",
                        },
                        prepare({ day, hours }) {
                            return {
                                title: day || "Jour",
                                subtitle: hours || "Horaires non renseignés",
                            };
                        },
                    },
                    fields: [
                        defineField({
                            name: "day",
                            title: "Jour",
                            type: "string",
                            description: "Jour de la semaine",
                        }),
                        defineField({
                            name: "hours",
                            title: "Horaires",
                            type: "string",
                            description:
                                "Horaires d'ouverture et de fermeture du salon",
                        }),
                    ],
                },
            ],
        }),
    ],

    // Titre statique — c'est un singleton, pas besoin de titre dynamique
    preview: {
        prepare() {
            return {
                title: "Salon de beauté",
                subtitle: "Horaires d'ouverture",
            };
        },
    },
});
