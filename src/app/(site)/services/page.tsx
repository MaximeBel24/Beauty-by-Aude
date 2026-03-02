import {getServices, getSiteSettings} from "@/lib/sanity.queries";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import ServicesList from "@/components/services/ServicesList";

export const metadata = {
    title: "Nos Services | Beauty by Aude",
    description: "On vera plus tard"
}

export default async function ServicesPage() {

    const [services, settings] = await Promise.all([getServices(), getSiteSettings()])

    return (
        <main className="bg-[#FFFBF6]">
            <div className="px-[8%] pt-32 pb-20">
                <SectionHeader label="Prestations" title="Tous nos" titleAccent="services" />
                <ServicesList services={services} />
            </div>
            <CTA settings={settings} />
        </main>
    );
}