import { client } from "./sanity.client";
import {PortfolioItem, Review, Salon, Service, SiteSettings} from "@/types";

async function safeFetch<T>(query: string, fallback: T, params?: object): Promise<T> {
    try {
        return await client.fetch(query, params);
    } catch (error) {
        console.error("Sanity fetch failed:", error);
        return fallback;
    }
}

// ===== SERVICES =====
export async function getServices(): Promise<Service[]> {

    return await safeFetch(
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
    }`, []);
}

export async function getFeaturedServices(): Promise<Service[]> {
    return await safeFetch(
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
      }`, [],
    );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    return await safeFetch(
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
        }`,
        null,
        { slug }
    );
}

// ===== PORTFOLIO =====
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    return await safeFetch(
        `*[_type == "portfolio"] | order(order asc) {
      _id,
      title,
      category,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      order
    }`, []
    );
}

// ===== SALON  =====
export async function getSalon(): Promise<Salon | null> {
    return await safeFetch(
        `*[_type == "salon"][0] {
      openingHours,
    }`, null
    );
}

// ===== AVIS CLIENTS =====
export async function getReviews(): Promise<Review[]> {
    return await safeFetch(
        `*[_type == "review"] | order(date desc) {
      _id,
      rating,
      text,
      date
    }`, []
    );
}

// ===== PARAMÈTRES DU SITE =====
// Document singleton (un seul document de ce type)
export async function getSiteSettings(): Promise<SiteSettings | null> {
    return await safeFetch(
        `*[_type == "siteSettings"][0] {
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
    }`, null
    );
}
