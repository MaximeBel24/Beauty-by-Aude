import {getPortfolioCategories, getPortfolioItems, getSiteSettings} from "@/lib/sanity.queries";
import SectionHeader from "@/components/ui/SectionHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CTA from "@/components/sections/CTA";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export const metadata = {
    title: "Nos Réalisations | Beauty by Aude",
    description: "On vera plus tard"
}

export default async function PortfolioPage() {

    const [items, categories, settings] = await Promise.all([
        getPortfolioItems(),
        getPortfolioCategories(),
        getSiteSettings()
    ]);

    return (
        <main className="bg-[var(--bg-primary)]">
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