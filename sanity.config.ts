'use client'

/**
 * Configuration du Sanity Studio — Beauty by Aude
 *
 * 💡 C'est le fichier central qui configure le Studio embarqué
 * sur la route /studio. Équivalent d'un application.yml en Spring Boot.
 *
 * - name/title : renomme le workspace (affiché dans la barre du haut)
 * - theme : thème avec support dark mode automatique (prefers-color-scheme)
 * - structure : navigation personnalisée (singletons, regroupements, drag & drop)
 * - visionTool retiré : c'est un outil dev pour tester des requêtes GROQ,
 *   Aude n'en a pas besoin (et ça enlève un onglet inutile dans la navbar)
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from '@/sanity/env'
import {schema} from '@/sanity/schemaTypes'
import {structure} from '@/sanity/structure'
import {frFRLocale} from "@sanity/locale-fr-fr";
import {beautyTheme} from "@/sanity/theme";
import StudioNavbar from "@/sanity/components/StudioNavbar";

export default defineConfig({
  // Nom du workspace — remplace "Default" dans la barre du haut
  name: 'beauty-by-aude',
  title: 'Beauty by Aude',

  basePath: '/studio',
  projectId,
  dataset,
  schema,

  // Thème avec support dark mode (suit la préférence OS)
  theme: beautyTheme,

  plugins: [
    structureTool({structure}),
    // frFRLocale traduit l'interface Studio en français pour Aude
    frFRLocale(),
  ],

  studio: {
    components: {
      // Navbar personnalisée avec le lien "Retourner sur le site"
      navbar: StudioNavbar,
      // Cache le menu d'outils (Structure, Vision) — une seule vue suffit
      toolMenu: () => null,
    }
  }
})
