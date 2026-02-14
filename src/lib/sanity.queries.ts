import { client } from "./sanity.client";

/**
 * 💡 GROQ en 30 secondes :
 * - `*` = tous les documents
 * - `[_type == "service"]` = filtre par type
 * - `| order(order asc)` = tri
 * - `{ title, price }` = projection (quels champs retourner)
 * - `"imageUrl": image.asset->url` = résoudre une référence d'image
 */

// ===== SERVICES =====
export async function getServices() {
    return client.fetch(
        `*[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      price,
      duration,
      category,
      order
    }`
    );
}

// ===== PORTFOLIO =====
export async function getPortfolioItems() {
    return client.fetch(
        `*[_type == "portfolio"] | order(order asc) {
      _id,
      title,
      category,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      order
    }`
    );
}

// ===== AVIS CLIENTS =====
export async function getReviews() {
    return client.fetch(
        `*[_type == "review"] | order(date desc) {
      _id,
      name,
      rating,
      text,
      date
    }`
    );
}

// ===== PARAMÈTRES DU SITE =====
// Document singleton (un seul document de ce type)
export async function getSiteSettings() {
    return client.fetch(
        `*[_type == "siteSettings"][0] {
      heroTitle,
      heroSubtitle,
      aboutText,
      planityUrl,
      instagramUrl,
      instagramHandle,
      phone,
      email,
      address,
      "heroImageUrl": heroImage.asset->url,
      "logoUrl": logo.asset->url
    }`
    );
}