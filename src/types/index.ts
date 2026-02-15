export interface Service {
    _id: string;
    title: string;
    description?: string;
    price: number;
    duration?: string;
    category?: string;
    order?: number;
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