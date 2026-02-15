import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./sanity.client";

/**
 * Builder d'URL d'images Sanity.
 *
 * 💡 Pourquoi ne pas utiliser directement l'URL de l'image ?
 * Sanity permet de transformer les images à la volée :
 * - Redimensionner (width, height)
 * - Recadrer (crop, hotspot)
 * - Changer le format (webp, avif)
 * - Ajuster la qualité
 *
 * Exemple d'utilisation :
 *   urlFor(image).width(400).height(300).format("webp").url()
 *   → retourne une URL optimisée de 400x300 en WebP
 */
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

/**
 * Formate un prix en euros.
 * 25 → "25€"
 * 25.5 → "25,50€"
 */
export function formatPrice(price: number): string {
    if (Number.isInteger(price)) {
        return `${price}€`;
    }
    return `${price.toFixed(2).replace(".", ",")}€`;
}
