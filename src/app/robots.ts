import { MetadataRoute } from "next";

/**
 * Robots.txt — Servi automatiquement sur /robots.txt par Next.js.
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beautybyaude.fr";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/studio/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
