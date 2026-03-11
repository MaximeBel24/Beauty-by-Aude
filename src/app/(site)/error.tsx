"use client";

/**
 * Error Boundary — Attrape les erreurs runtime dans les routes (site).
 * "use client" est OBLIGATOIRE (exigence Next.js pour les Error Boundaries).
 * Équivalent Spring : @ExceptionHandler(Exception.class)
 *
 * Props :
 * - error : l'erreur survenue
 * - reset : fonction pour réessayer le rendu
 */
export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg-primary)] px-6 text-center">
            <h1 className="font-heading text-4xl font-bold text-burgundy">
                Oups, une erreur est survenue
            </h1>
            <p className="mt-4 font-body text-lg text-[var(--text-body-color)]">
                Quelque chose s&apos;est mal passé. Veuillez réessayer.
            </p>
            <button
                onClick={reset}
                className="mt-8 inline-block rounded-sm bg-burgundy px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-rosewood"
            >
                Réessayer
            </button>
        </main>
    );
}
