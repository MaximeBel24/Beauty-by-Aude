import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Reviews from "@/components/sections/Reviews";
import CTA from "@/components/sections/CTA";
import {
    getFeaturedPortfolioItems,
    getFeaturedServices,
    getFeaturedReviews,
    getSalon,
    getSiteSettings
} from "@/lib/sanity.queries";
import About from "@/components/sections/About";
import Salon from "@/components/sections/Salon";
import {generateLocalBusinessJsonLd} from "@/lib/jsonld";

/**
 * Page d'accueil — Assemble toutes les sections.
 *
 * 💡 C'est un Server Component (pas de "use client").
 * Les sections enfants qui ont besoin d'interactivité (animations)
 * sont elles-mêmes des Client Components.
 *
 * Plus tard, cette page deviendra async pour fetch les données Sanity :
 *
 */

export default async function Home() {

    const [services, portfolioItems, reviews, salon, settings] = await Promise.all([
        getFeaturedServices(),
        getFeaturedPortfolioItems(),
        getFeaturedReviews(),
        getSalon(),
        getSiteSettings(),
    ]);

    return (
        <main>
            {/* JSON-LD — invisible pour l'utilisateur, lu par Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateLocalBusinessJsonLd(settings!)),
                }}
            />
            <Hero settings={settings} />
            <About settings={settings} />
            <Services services={services} />
            <Portfolio portfolioItems={portfolioItems} />
            <Reviews reviews={reviews} />
            <Salon salon={salon} settings={settings}/>
            <CTA settings={settings} />
        </main>
    );
}
