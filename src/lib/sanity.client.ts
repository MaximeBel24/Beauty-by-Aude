import { createClient } from "next-sanity";

// Configuration partagée
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = "2025-02-14"; // Date du jour, fige la version de l'API Sanity

/**
 * Client Sanity pour les requêtes côté serveur (Server Components).
 *
 * 💡 Explication :
 * - `projectId` et `dataset` viennent de ton .env.local (générés par `sanity init`)
 * - `apiVersion` : Sanity versione son API par date. En figeant la date,
 *   tu évites que ton site casse si Sanity modifie son API plus tard.
 * - `useCdn: false` : en dev on veut les données fraîches, pas du cache.
 *   On passera à `true` en prod pour la performance.
 */
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // `true` en production pour des réponses plus rapides (données cachées en CDN)
    // Pas besoin de `token` pour lire du contenu public
});
