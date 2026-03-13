import {getServiceBySlug, getServices, getSiteSettings} from "@/lib/sanity.queries";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ServiceDetail from "@/components/services/ServiceDetail";
import CTA from "@/components/sections/CTA";
import {Metadata} from "next";
import {generateBreadcrumbJsonLd, generateServiceJsonLd} from "@/lib/jsonld";

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

// Revalide la page toutes les 60 secondes
// → Si un visiteur arrive 61s après le dernier cache, Next.js
//   reconstruit la page en arrière-plan avec les données Sanity à jour
export const revalidate = 60;

/**
 * generateMetadata — SEO dynamique par service.
 *
 * Chaque page /services/[slug] aura son propre <title> et <meta description>.
 * Google verra "Pose Semi-Permanent | Beauty by Aude" au lieu d'un titre générique.
 */
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return { title: "Service introuvable" };
    }

    return {
        title: service.title,
        description: service.longDescription ?? service.description,
        alternates: {
            canonical: `/services/${service.slug}`,
        },
        openGraph: {
            title: service.title,
            description: service.longDescription ?? service.description,
            // Si le service a des images dans sa galerie, on prend la première
            ...(service.gallery?.[0]?.imageUrl && {
                images: [{ url: service.gallery[0].imageUrl }],
            }),
        },
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

    if (!service) {
        return <main className="bg-[var(--bg-primary)] py-20 text-center text-[var(--text-body-color)]">Service introuvable</main>;
    }

    return (
        <main className="bg-[var(--bg-primary)]">

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbJsonLd([
                        { label: "Accueil", href: "/" },
                        { label: "Services", href: "/services" },
                        { label: service.title },
                    ])),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateServiceJsonLd(service, settings!)),
                }}
            />

            {/* Breadcrumb dans le Server Component — pas de JS client,
                bon pour le SEO (Google indexe le fil d'Ariane). */}
            <div className="mx-auto max-w-[1100px] px-[8%] pt-32">
                <Breadcrumb items={[
                    { label: "Accueil", href: "/" },
                    { label: "Services", href: "/services" },
                    { label: service.title },
                ]} />
            </div>
            <ServiceDetail service={service} settings={settings} />
            <CTA settings={settings} />
        </main>
    );
}
