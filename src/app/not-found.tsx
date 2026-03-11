import Link from "next/link";

/**
 * Page 404 — Affichée quand aucune route ne correspond.
 * Fichier spécial Next.js : src/app/not-found.tsx
 */
export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-primary)] px-6 text-center">
            <h1 className="font-heading text-6xl font-bold text-burgundy">404</h1>
            <p className="mt-4 font-body text-lg text-[var(--text-body-color)]">
                Cette page n&apos;existe pas ou a été déplacée.
            </p>
            <Link
                href="/"
                className="mt-8 inline-block rounded-sm bg-burgundy px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-rosewood"
            >
                Retour à l&apos;accueil
            </Link>
        </main>
    );
}
