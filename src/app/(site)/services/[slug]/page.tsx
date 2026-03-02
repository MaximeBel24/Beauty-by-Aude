import {getServiceBySlug, getServices, getSiteSettings} from "@/lib/sanity.queries";
import ServiceDetail from "@/components/services/ServiceDetail";
import CTA from "@/components/sections/CTA";

/**
 * Type des props de la page.
 * Dans Next.js 15+, les params sont asynchrones (Promise).
 * Équivalent Spring : @PathVariable String slug
 */
type ServicePageProps = {
    params: Promise<{ slug: string }>;
};

/**
 * generateStaticParams — Pré-génère toutes les pages au build.
 *
 * Équivalent Spring : comme si tu listais toutes les valeurs possibles
 * de @PathVariable pour générer un fichier HTML par service à l'avance.
 * Next.js appelle cette fonction au build et crée une page statique par slug.
 */
export async function generateStaticParams() {
    const services = await getServices();
    return services.map((service) => ({ slug: service.slug }));
}

/**
 * generateMetadata — SEO dynamique par service.
 *
 * Chaque page /services/[slug] aura son propre <title> et <meta description>.
 * Google verra "Pose Semi-Permanent | Beauty by Aude" au lieu d'un titre générique.
 */
export async function generateMetadata({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    return {
        title: `${service.title} | Beauty by Aude`,
        description: service.description,
    };
}

/**
 * ServicePage — Page détail d'un service.
 *
 * Server Component async : fetch les données côté serveur,
 * puis passe tout au Client Component ServiceDetail pour l'interactivité.
 */
export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;

    // Fetch en parallèle : le service ciblé + les settings (pour le CTA Planity)
    const [service, settings] = await Promise.all([
        getServiceBySlug(slug),
        getSiteSettings(),
    ]);

    return (
        <main className="bg-[#FFFBF6]">
            <ServiceDetail service={service} settings={settings} />
            <CTA settings={settings} />
        </main>
    );
}
