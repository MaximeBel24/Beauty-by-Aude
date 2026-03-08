import { createClient } from "next-sanity";
import {apiVersion, dataset, projectId} from "@/sanity/env";

/**
 * Client Sanity pour les requêtes côté serveur (Server Components).
 *
 * 💡 Explication :
 * - `projectId` et `dataset` viennent de ton .env.local (générés par `sanity init`)
 * - `apiVersion` : Sanity versione son API par date. En figeant la date,
 *   tu évites que ton site casse si Sanity modifie son API plus tard.
 * - `useCdn: conditionnel` : false en dev -> données fraîches / true en prod -> cache CDN rapide
 */
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",

});