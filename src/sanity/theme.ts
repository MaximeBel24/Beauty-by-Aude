import {buildLegacyTheme} from "sanity";

const props = {
    '--black': '#2A0E11',
    '--white': '#FFFBF6',
    '--gray-base': '#7a4950',
    '--gray': '#5C3D42',
    '--burgundy': '#401216',
    '--rosewood': '#63333A',
    '--taupe': '#9C7961',
    '--cream': '#FFEDDA',
    '--nude': '#D5BCAD',
}

export const beautyTheme = buildLegacyTheme({
    // Base
    '--black': props['--black'],
    '--white': props['--white'],
    '--gray': props['--gray'],
    '--gray-base': props['--gray-base'],

    // Composants
    '--component-bg': props['--white'],
    '--component-text-color': props['--black'],

    // Marque — la couleur principale du Studio
    '--brand-primary': props['--burgundy'],

    // Navbar du Studio
    '--main-navigation-color': props['--burgundy'],
    '--main-navigation-color--inverted': props['--cream'],

    // Focus (quand tu cliques dans un champ)
    '--focus-color': props['--taupe'],

    // Boutons
    '--default-button-color': props['--rosewood'],
    '--default-button-primary-color': props['--burgundy'],
    '--default-button-success-color': '#0f9d58',
    '--default-button-warning-color': props['--taupe'],
    '--default-button-danger-color': '#db4437',

    // États (messages de feedback)
    '--state-info-color': props['--taupe'],
    '--state-success-color': '#0f9d58',
    '--state-warning-color': props['--taupe'],
    '--state-danger-color': '#db4437',
})