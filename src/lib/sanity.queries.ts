import { client } from "./sanity.client";
import { PortfolioItem, Review, Service, SiteSettings } from "@/types";

/**
 * 💡 GROQ en 30 secondes :
 * - `*` = tous les documents
 * - `[_type == "service"]` = filtre par type
 * - `| order(order asc)` = tri
 * - `{ title, price }` = projection (quels champs retourner)
 * - `"imageUrl": image.asset->url` = résoudre une référence d'image
 */

// ===== SERVICES =====
export async function getServices(): Promise<Service[]> {
    return client.fetch(
        `*[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      duration,
      category,
      icon,
      "gallery": gallery[] { "imageUrl": asset->url, alt },
      order
    }`,
    );
}

export async function getFeaturedServices(): Promise<Service[]> {
    return client.fetch(
      `*[_type == "service" && featured == true] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        price,
        duration,
        category,
        icon,
        order
      }`,
    );
}

export async function getServiceBySlug(slug: string): Promise<Service> {
    return client.fetch(
        `*[_type == "service" && slug.current == $slug][0] {
           _id,
           title,
           "slug": slug.current,
           description,
           longDescription,
           price,
           duration,
           category,
           icon,
           "gallery": gallery[] { "imageUrl": asset->url, alt },
           order
        }`,{ slug }
    );
}

// ===== PORTFOLIO =====
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    return client.fetch(
        `*[_type == "portfolio"] | order(order asc) {
      _id,
      title,
      category,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      order
    }`,
    );
}

// ===== AVIS CLIENTS =====
export async function getReviews(): Promise<Review[]> {
    return client.fetch(
        `*[_type == "review"] | order(date desc) {
      _id,
      name,
      rating,
      text,
      date
    }`,
    );
}

// ===== PARAMÈTRES DU SITE =====
// Document singleton (un seul document de ce type)
export async function getSiteSettings(): Promise<SiteSettings> {
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
      "aboutImageUrl": aboutImage.asset->url,
      "logoUrl": logo.asset->url
    }`,
    );
}
