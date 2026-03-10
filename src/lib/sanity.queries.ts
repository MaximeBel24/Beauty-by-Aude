import { client } from "./sanity.client";
import {PortfolioCategory, PortfolioItem, Review, Salon, Service, SiteSettings} from "@/types";

/**
 * Requêtes GROQ centralisées — Beauty by Aude
 *
 * 💡 Parallèle Spring : ce fichier est l'équivalent d'un @Repository.
 * Chaque fonction encapsule une requête GROQ (≈ SQL) vers Sanity.
 *
 * orderRank : champ généré par le plugin drag & drop.
 * On trie par orderRank au lieu de l'ancien champ "order" manuel.
 */

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
    `*[_type == "service"] | order(orderRank) {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      duration,
      category,
      "gallery": gallery[] { "imageUrl": asset->url, alt }
    }`, []);
}

export async function getFeaturedServices(): Promise<Service[]> {
    return await safeFetch(
        `*[_type == "service" && featured == true] | order(orderRank) {
        _id,
        title,
        "slug": slug.current,
        description,
        price,
        duration,
        category
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
           "gallery": gallery[] { "imageUrl": asset->url, alt }
        }`,
        null,
        { slug }
    );
}

// ===== PORTFOLIO =====
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    return await safeFetch(
        `*[_type == "portfolio"] | order(orderRank) {
      _id,
      title,
      "category": category-> { title, "value": value.current },
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`, []
    );
}

export async function getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
    return await safeFetch(
        `*[_type == "portfolio" && featured == true] | order(orderRank) {
      _id,
      title,
      "category": category-> { title, "value": value.current },
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
      }`, [],
    );
}

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
    return await safeFetch(
        `*[_type == "portfolioCategory"] | order(orderRank) {
        _id,
        title,
        "value": value.current
    }`, []
    );
}

// ===== SALON  =====
/**
 * Singleton query — on cherche par _id fixe au lieu de _type.
 *
 * 💡 Parallèle Spring : c'est comme faire un findById("salon") au lieu
 * d'un findAll() puis prendre le premier. Plus sûr car un seul résultat possible.
 *
 * Pourquoi ? Le structure.ts crée le document avec documentId("salon").
 * Si on cherchait par _type, on pourrait tomber sur un ancien doublon.
 */
export async function getSalon(): Promise<Salon | null> {
    return await safeFetch(
        `*[_id == "salon"][0] {
      openingHours,
    }`, null
    );
}

// ===== AVIS CLIENTS =====
export async function getReviews(): Promise<Review[]> {
    return await safeFetch(
        `*[_type == "review"] | order(orderRank) {
      _id,
      rating,
      text,
      date,
      featured
    }`, []
    );
}

// Avis mis en avant par Aude (affichés sur la page d'accueil)
export async function getFeaturedReviews(): Promise<Review[]> {
    return await safeFetch(
        `*[_type == "review" && featured == true] | order(orderRank) {
      _id,
      rating,
      text,
      date,
      featured
    }`, []
    );
}

// ===== PARAMÈTRES DU SITE =====
/**
 * Singleton query — même pattern que getSalon().
 * On cible l'ID fixe "siteSettings" défini dans structure.ts.
 *
 * 💡 C'est le pattern recommandé pour les singletons Sanity :
 * structure.ts définit l'ID → la query le cible directement.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
    return await safeFetch(
        `*[_id == "siteSettings"][0] {
      aboutText,
      planityUrl,
      instagramUrl,
      instagramHandle,
      phone,
      email,
      address,
      "heroImage1": { "url": heroImage1.asset->url, "alt": heroImage1.alt },
      "heroImage2": { "url": heroImage2.asset->url, "alt": heroImage2.alt },
      "heroImage3": { "url": heroImage3.asset->url, "alt": heroImage3.alt },
      "heroImage4": { "url": heroImage4.asset->url, "alt": heroImage4.alt },
      "aboutImageUrl": aboutImage.asset->url,
      "logoUrl": logo.asset->url
    }`, null
    );
}
