type ServiceIcons = "paintbrush" | "hand" | "wrench" | "footprints" | "sparkles";

export interface Service {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    longDescription?: string;
    price: number;
    duration?: string;
    category?: string;
    featured?: boolean;
    icon?: ServiceIcons;
    gallery?: SanityImage[];
    order?: number;
}

export interface SanityImage {
    imageUrl: string;
    alt?: string;
}

export interface PortfolioItem {
    _id: string;
    title: string;
    category?: string;
    imageUrl: string;
    imageAlt?: string;
    order?: number;
}

export interface Review {
    _id: string;
    name: string;
    rating: number;
    text: string;
    date?: string;
}

export interface SiteSettings {
    heroTitle: string;
    heroSubtitle?: string;
    heroImageUrl?: string;
    logoUrl?: string;
    aboutText?: string;
    aboutImageUrl?: string;
    planityUrl?: string;
    instagramUrl?: string;
    instagramHandle?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface SettingsProps {
    settings: SiteSettings;
}

export interface ServicesProps {
    services: Service[];
}