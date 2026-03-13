import {getServices, getSiteSettings} from "@/lib/sanity.queries";
import SectionHeader from "@/components/ui/SectionHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CTA from "@/components/sections/CTA";
import ServicesList from "@/components/services/ServicesList";
import {Metadata} from "next";
import {generateBreadcrumbJsonLd} from "@/lib/jsonld";

export const metadata: Metadata = {
    title: "Nos Services",
    description: "Découvrez nos prestations de manucure, pose de gel, nail art et soins des pieds à Villecresnes. Tarifs et détails de chaque service.",
    alternates: {
        canonical: "/services",
    },
};

// Revalide la page toutes les 60 secondes
// → Si un visiteur arrive 61s après le dernier cache, Next.js
//   reconstruit la page en arrière-plan avec les données Sanity à jour
export const revalidate = 60;

export default async function ServicesPage() {

    const [services, settings] = await Promise.all([getServices(), getSiteSettings()])

    return (

        <main className="bg-[var(--bg-primary)]">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbJsonLd([
                        { label: "Accueil", href: "/" },
                        { label: "Services" },
                    ])),
                }}
            />

            <div className="px-[8%] pt-32 pb-20">
                <div className="mx-auto max-w-[1100px]">
                    <Breadcrumb items={[
                        { label: "Accueil", href: "/" },
                        { label: "Services" },
                    ]} />
                </div>
                <SectionHeader label="Prestations" title="Tous nos" titleAccent="services" />
                <ServicesList services={services} />
            </div>
            <CTA settings={settings} />
        </main>
    );
}