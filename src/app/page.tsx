import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Page d'accueil temporaire — pour tester le layout (Navbar + Footer).
 *
 * 💡 C'est un Server Component (pas de "use client").
 * Il peut être async si on a besoin de fetch des données.
 * Les composants enfants comme SectionHeader et Navbar
 * peuvent être des Client Components — Next.js gère le mix.
 */

export default function Home() {
    return (
        <>
            {/* HERO — placeholder pour tester l'espacement avec la navbar */}
            <section className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="mb-4 text-xs font-normal uppercase tracking-[0.35em] text-taupe">
                        Manucure professionnelle
                    </p>
                    <h1 className="font-heading text-[clamp(3rem,5vw,4.5rem)] font-light leading-[1.1] text-burgundy">
                        La beauté au bout
                        <br />
                        des <em className="italic text-taupe">doigts</em>
                    </h1>
                    <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-rosewood">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <a
                        href="#services"
                        className="
              mt-8 inline-flex items-center gap-3
              bg-burgundy px-8 py-4 text-xs
              uppercase tracking-[0.2em] text-cream
              no-underline transition-all duration-300
              hover:bg-rosewood
            "
                    >
                        Découvrir mes services
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>

            {/* SERVICES — placeholder */}
            <section id="services" className="px-[5%] py-28">
                <SectionHeader
                    label="Prestations"
                    title="Nos"
                    titleAccent="services"
                />
                <p className="text-center text-rosewood opacity-60">
                    Section services à implémenter...
                </p>
            </section>

            {/* PORTFOLIO — placeholder */}
            <section
                id="portfolio"
                className="bg-cream-dark px-[5%] py-28"
            >
                <SectionHeader
                    label="Réalisations"
                    title="Mon"
                    titleAccent="portfolio"
                />
                <p className="text-center text-rosewood opacity-60">
                    Section portfolio à implémenter...
                </p>
            </section>

            {/* AVIS — placeholder */}
            <section id="avis" className="px-[5%] py-28">
                <SectionHeader
                    label="Témoignages"
                    title="Ce qu'elles"
                    titleAccent="en pensent"
                />
                <p className="text-center text-rosewood opacity-60">
                    Section avis à implémenter...
                </p>
            </section>

            {/* CTA — placeholder fond burgundy */}
            <section
                id="contact"
                className="bg-burgundy px-[5%] py-28"
            >
                <SectionHeader
                    label="Prête à vous faire belle ?"
                    title="Réservez votre"
                    titleAccent="rendez-vous"
                    light
                />
                <div className="text-center">
                    <a
                        href="#"
                        className="
              inline-flex items-center gap-3
              bg-cream px-8 py-4 text-xs
              uppercase tracking-[0.2em] text-burgundy
              no-underline transition-all duration-300
              hover:bg-white
            "
                    >
                        Réserver sur Planity
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>
        </>
    );
}