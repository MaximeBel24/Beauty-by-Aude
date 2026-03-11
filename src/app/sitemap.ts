import { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/lib/sanity.queries";

/**
 * Sitemap dynamique — Next.js le sert automatiquement sur /sitemap.xml.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beautybyaude.fr";

    // Pages statiques — toujours présentes
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
    ];

    // Pages dynamiques — un slug par service Sanity
    const slugs = await getAllServiceSlugs();
    const servicePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...servicePages];
}
