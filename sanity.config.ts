'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from '@/sanity/env'
import {schema} from '@/sanity/schemaTypes'
import {structure} from '@/sanity/structure'
import {frFRLocale} from "@sanity/locale-fr-fr";
import {beautyTheme} from "@/sanity/theme";
import StudioNavbar from "@/sanity/components/StudioNavbar";

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  theme: beautyTheme,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    structureTool({structure}),
    frFRLocale(),
  ],
  studio: {
    components: {
      navbar: StudioNavbar,
      toolMenu: () => null,
    }
  }
})
