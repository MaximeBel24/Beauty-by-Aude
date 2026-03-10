import Link from "next/link";

/**
 * Breadcrumb — Fil d'Ariane réutilisable (Server Component).
 *
 * 💡 Pourquoi un Server Component ?
 * Le breadcrumb est un contenu statique au-dessus du fold (above the fold),
 * important pour le SEO (Google l'affiche dans les résultats de recherche).
 * Pas besoin de "use client" — zéro JS envoyé au navigateur.
 *
 * Parallèle Spring : c'est comme un fragment Thymeleaf `th:replace`
 * qu'on inclut dans chaque vue avec des paramètres différents.
 *
 * Pattern : chaque item a un label + href optionnel.
 * Le dernier item (sans href) = page courante, affiché en gras.
 * Ex : Accueil / Services / Manucure Gel  ← "Manucure Gel" non cliquable
 */

interface BreadcrumbItem {
    label: string;
    href?: string; // undefined = page courante (dernier élément)
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="mb-12 flex items-center gap-2 text-[0.8rem] text-[var(--text-body-color)]">
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    {/* Séparateur "/" — affiché avant chaque item sauf le premier */}
                    {index > 0 && (
                        <span className="text-[var(--text-accent)]">/</span>
                    )}

                    {/* Si href existe → lien cliquable ; sinon → page courante (texte bold) */}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="transition-colors hover:text-[var(--text-heading)]"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-[var(--text-heading)]">
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    );
}
