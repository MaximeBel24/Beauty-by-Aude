/**
 * Thème Sanity Studio — Beauty by Aude
 *
 * On utilise buildTheme de @sanity/ui au lieu de buildLegacyTheme
 * pour supporter automatiquement le dark mode (prefers-color-scheme).
 *
 * 💡 buildLegacyTheme génère un seul jeu de couleurs (light uniquement).
 * buildTheme génère les palettes light ET dark automatiquement.
 * C'est l'équivalent de définir des @media (prefers-color-scheme) en CSS.
 *
 * On définit ici la couleur primaire (burgundy) et les couleurs d'état.
 * Sanity génère automatiquement toutes les variantes pour chaque mode.
 *
 * Note : le runtime de buildTheme accepte des propriétés de couleur (primary, etc.)
 * que les types TS n'exposent pas encore directement. On utilise un cast
 * pour contourner cette limitation de typage.
 */
import { buildTheme } from "@sanity/ui/theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const beautyTheme = buildTheme({
    color: {
        // Couleur de marque — burgundy comme accent principal
        primary: { mid: "#401216" },
        // Couleurs d'état
        positive: { mid: "#0f9d58" },
        caution: { mid: "#9C7961" }, // taupe
        critical: { mid: "#db4437" },
    } as any,
});
