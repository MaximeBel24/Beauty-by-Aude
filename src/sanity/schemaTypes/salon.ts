import {defineField, defineType} from "sanity";

export default defineType({
    name: "salon",
    title: "Salon de beauté",
    type: "document",
    icon: () => "💅",
    fields: [
        defineField({
            name: "openingHours",
            title: "Horaires d'ouvertures",
            type: "array",
            description: "Jours et horaires d'ouverture et de fermeture du salon",
            of: [{
                type: "object",
                fields: [
                    defineField({
                        name: "day",
                        title: "Jour",
                        type: "string",
                        description: "Jour de la semaine"
                    }),
                    defineField({
                        name: "hours",
                        title: "Horaires",
                        type: "string",
                        description: "Horaires d'ouverture et de fermeture du salon",
                    })
                ]
            }]
        }),
    ],
})