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
    category?: PortfolioCategory;
    imageUrl: string;
    imageAlt?: string;
    featured?: boolean;
    order?: number;
}

export interface PortfolioCategory {
    _id: string;
    title: string;
    value: string;
    order?: number;
}

export interface Review {
    _id: string;
    rating: number;
    text: string;
    date?: string;
}

interface OpeningHours {
    day: string;
    hours: string;
}

export interface Salon {
    openingHours: OpeningHours[];
}

/**
 * HeroImage — Une image de la grille bento du Hero.
 * Chaque position (1 à 4) a sa propre URL et son alt text.
 */
export interface HeroImage {
    url: string;
    alt?: string;
}

export interface SiteSettings {
    heroImage1?: HeroImage;
    heroImage2?: HeroImage;
    heroImage3?: HeroImage;
    heroImage4?: HeroImage;
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
    settings: SiteSettings | null;
}

export interface ServicesProps {
    services: Service[];
}

export interface SalonProps {
    salon: Salon | null;
    settings: SiteSettings | null;
}

export interface ReviewsProps {
    reviews: Review[];
}

export interface PortfolioProps {
    portfolioItems: PortfolioItem[];
}
