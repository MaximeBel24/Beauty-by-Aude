import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Reviews from "@/components/sections/Reviews";
import CTA from "@/components/sections/CTA";
import {getFeaturedServices, getPortfolioItems, getReviews, getServices, getSiteSettings} from "@/lib/sanity.queries";
import About from "@/components/sections/About";

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

    const [services, portfolioItems, reviews, settings] = await Promise.all([
        getFeaturedServices(),
        getPortfolioItems(),
        getReviews(),
        getSiteSettings(),
    ]);

    return (
        <>
            <Hero settings={settings} />
            <About settings={settings} />
            <Services services={services} />
            <Portfolio portfolioItems={portfolioItems} />
            <Reviews reviews={reviews} />
            {/*<Instagram />*/}
            <CTA settings={settings} />
        </>
    );
}
