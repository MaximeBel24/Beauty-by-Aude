import {getPortfolioCategories, getPortfolioItems, getSiteSettings} from "@/lib/sanity.queries";
import SectionHeader from "@/components/ui/SectionHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CTA from "@/components/sections/CTA";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import {Metadata} from "next";
import {generateBreadcrumbJsonLd} from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "Nos Réalisations",
    description: "Galerie photo de nos réalisations en manucure, nail art et pose de gel à Villecresnes. Inspirez-vous pour votre prochain rendez-vous.",
    alternates: {
        canonical: "/portfolio",
    },
};


export default async function PortfolioPage() {

    const [items, categories, settings] = await Promise.all([
        getPortfolioItems(),
        getPortfolioCategories(),
        getSiteSettings()
    ]);

    return (
        <main className="bg-[var(--bg-primary)]">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbJsonLd([
                        { label: "Accueil", href: "/" },
                        { label: "Portfolio" },
                    ])),
                }}
            />

            <div className="px-[8%] pt-32 pb-20">
                <div className="mx-auto max-w-[1100px]">
                    <Breadcrumb items={[
                        { label: "Accueil", href: "/" },
                        { label: "Portfolio" },
                    ]} />
                </div>
                <SectionHeader label="Portfolio" title="Toutes nos" titleAccent="réalisations" />
                <PortfolioGrid items={items} categories={categories} />
            </div>
            <CTA settings={settings} />
        </main>
    );
}