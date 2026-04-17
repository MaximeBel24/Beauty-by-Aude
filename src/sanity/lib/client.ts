import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Client "CDN" — lectures côté serveur/client classiques, cachées
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
});

// Client "direct" — pour Live Content API / listeners
export const liveClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // ← listeners = PAS de CDN
});