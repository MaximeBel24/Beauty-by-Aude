import {Service, SiteSettings} from "@/types";

export function generateLocalBusinessJsonLd(settings: SiteSettings) {
    return {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: settings.seoTitle || "Beauty by Aude",
        description: settings.seoDescription || "Prothésiste ongulaire à Villecresnes",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://beautybyaude.fr",
        telephone: settings.phone,
        email: settings.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: settings.address,
            addressLocality: settings.city || "Villecresnes",
            addressCountry: "FR",
        },
        // Si Instagram existe, on l'ajoute dans sameAs (liens sociaux)
        ...(settings.instagramUrl && {
            sameAs: [settings.instagramUrl],
        }),
    };
}

export function generateBreadcrumbJsonLd(items: { label: string; href?: string }[]) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beautybyaude.fr";
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            // Si href existe, on construit l'URL complète
            ...(item.href && {
                item: `${baseUrl}${item.href}`,
            }),
        })),
    };
}

export function generateServiceJsonLd(service: Service, settings: SiteSettings) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.longDescription ?? service.description,
        provider: {
            "@type": "BeautySalon",
            name: settings.seoTitle || "Beauty by Aude",
        },
        offers: {
            "@type": "Offer",
            price: service.price,
            priceCurrency: "EUR",
        },
    };
}
