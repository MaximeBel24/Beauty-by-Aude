# Beauty by Aude — Projet Web

## Contexte

Site vitrine professionnel sur mesure pour **Aude**, manucurière indépendante. 
Le projet est réalisé bénévolement par **Maxime** (développeur), et sert également de **projet portfolio** et de **montée en compétences** sur Next.js, Tailwind CSS, Sanity et Stripe.

Le projet est découpé en deux versions :
- **V1 (en cours)** — Site vitrine avec CMS headless
- **V2 (future)** — Plateforme de vente de formations et ebooks

## Consignes pour Claude Code

**Ce projet est avant tout un projet d'apprentissage.** Claude Code ne doit pas fournir du code tout fait à copier-coller. À la place :

- **Guider Maxime pas à pas** : expliquer le raisonnement, le "pourquoi" avant le "comment"
- **Faire des parallèles avec Java/Spring** qu'il connaît déjà (ex: schéma Sanity ≈ @Entity, GROQ ≈ SQL, Server Component ≈ Controller, etc.)
- **Proposer des exercices** : demander à Maxime d'écrire le code d'abord, puis corriger et expliquer
- **Expliquer les concepts** : quand un pattern Next.js, React ou Tailwind est nouveau, prendre le temps d'expliquer avant de l'implémenter
- **Commenter le code** : chaque fichier doit contenir des commentaires pédagogiques expliquant les choix techniques
- **Ne pas surcharger** : avancer à un rythme adapté, une étape à la fois

## Identité visuelle

- **Logo** : "Beauty by Aude" — ligne élégante, or/caramel sur crème
- **Palette** :
    - Burgundy `#401216` — couleur principale
    - Rosewood `#63333A` — accent secondaire
    - Taupe `#9C7961` — accents, étoiles, détails
    - Cream `#FFEDDA` — fond principal des sections
    - Nude/Beige `#D5BCAD` — fond secondaire, éléments décoratifs
    - White `#FFFBF6` — fond body
    - Text Dark `#2A0E11` — fond footer
    - Text Body `#5C3D42` — couleur de texte par défaut
- **Typographies** :
    - Cormorant Garamond (titres, headings) — serif élégant, variable `--font-heading`
    - Jost (body, interface) — sans-serif moderne, variable `--font-body`
- **Design sélectionné** : Design 1 — Premium Classique (glassmorphism nav, split hero, cartes services, grille portfolio asymétrique, avis avec guillemets, CTA burgundy)

## Stack technique

### V1 — Site vitrine (en cours)
| Couche | Technologie | Rôle |
|---|---|---|
| Frontend | Next.js 16.1.6 (App Router, Turbopack) | Framework React SSR/SSG |
| Styling | Tailwind CSS v4 | Utilitaires CSS (config via `@theme` dans globals.css) |
| Animations | Framer Motion | Animations d'entrée, scroll, menu mobile |
| CMS | Sanity (embedded Studio) | Gestion du contenu par la cliente |
| Images | @sanity/image-url | Optimisation et redimensionnement à la volée |
| Hébergement | Vercel (gratuit) | Déploiement frontend |

### V2 — Plateforme de formations (futur)
| Couche | Technologie | Rôle |
|---|---|---|
| Backend | Spring Boot (Java) | API REST |
| Auth | Spring Security + JWT | Authentification utilisateurs |
| Base de données | PostgreSQL | Stockage utilisateurs, commandes, formations |
| Paiement | Stripe (Checkout + Webhooks) | Paiement en ligne |
| Hébergement | Railway | Backend + DB |

### IDE et outils
- **IDE** : WebStorm (JetBrains)
- **Versioning** : Git (convention branches : `feature/`, `fix/`, `chore/`)
- **Package manager** : npm

## Structure du projet

```
beauty-by-aude/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout racine (fonts, Navbar, Footer)
│   │   ├── page.tsx                # Page d'accueil (assemble les sections)
│   │   ├── globals.css             # Config Tailwind v4 (@theme, couleurs, animations)
│   │   └── studio/[[...tool]]/
│   │       └── page.tsx            # Route Sanity Studio (/studio)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Nav fixe glassmorphism + menu mobile animé
│   │   │   └── Footer.tsx          # Footer 3 colonnes (Server Component)
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Hero split 2 colonnes + animations cascade
│   │   │   ├── Services.tsx        # Grille 3 colonnes de cartes prestations
│   │   │   ├── Portfolio.tsx       # Grille asymétrique photos (masonry-like)
│   │   │   ├── Reviews.tsx         # Cartes avis clients avec étoiles
│   │   │   ├── Instagram.tsx       # Grille 6 colonnes feed Instagram
│   │   │   └── CTA.tsx             # Section burgundy "Réserver sur Planity"
│   │   └── ui/
│   │       └── SectionHeader.tsx   # En-tête de section réutilisable (label + titre + ligne)
│   ├── lib/
│   │   ├── sanity.client.ts        # Client API Sanity (connexion au projet)
│   │   ├── sanity.queries.ts       # Requêtes GROQ centralisées
│   │   └── utils.ts                # Helpers (urlFor pour images, formatPrice)
│   ├── sanity/
│   │   └── schemas/
│   │       ├── service.ts          # Schéma prestations (titre, prix, durée, catégorie)
│   │       ├── portfolio.ts        # Schéma photos (image + hotspot, catégorie)
│   │       ├── review.ts           # Schéma avis (nom, note 1-5, texte, featured)
│   │       ├── siteSettings.ts     # Schéma singleton (hero, contact, SEO, liens)
│   │       └── index.ts            # Export de tous les schémas
│   └── types/
│       └── index.ts                # Interfaces TypeScript (Service, PortfolioItem, Review, SiteSettings)
├── public/images/                  # Assets statiques
├── sanity.config.ts                # Configuration Sanity Studio
├── .env.local                      # Variables d'environnement (Sanity project ID, dataset)
└── package.json
```

## Conventions de code

- **Server Components** par défaut (pas de `"use client"` sauf si interactivité nécessaire)
- **Client Components** uniquement pour : useState, useEffect, Framer Motion, event handlers
- Les données Sanity sont fetchées dans les Server Components (page.tsx) et passées en props aux Client Components
- Imports avec alias `@/` (ex: `@/components/layout/Navbar`)
- Couleurs utilisées via les noms Tailwind définis dans globals.css : `text-burgundy`, `bg-cream`, `text-taupe`, etc.
- Fonts via variables CSS : `font-heading` (Cormorant Garamond), `font-body` (Jost)

## Schémas Sanity (types de contenu)

### Service (💅)
Prestations proposées par Aude.
- `title` (string, required) — Nom du service
- `description` (text) — Courte description
- `price` (number, required) — Prix en euros
- `duration` (string) — Durée (ex: "1h30")
- `category` (string, list) — manucure, pose, nailart, soins, autre
- `order` (number) — Ordre d'affichage

### Portfolio (🖼️)
Photos des réalisations.
- `title` (string, required) — Titre
- `image` (image + hotspot, required) — Photo avec sous-champ `alt`
- `category` (string, list) — manucure, gel, nailart, semipermanent, french, autre
- `order` (number) — Ordre d'affichage

### Review (⭐)
Avis clients.
- `name` (string, required) — Prénom de la cliente
- `rating` (number 1-5, required) — Note en étoiles
- `text` (text, required) — Commentaire
- `date` (date) — Date de l'avis
- `featured` (boolean) — Mettre en avant sur la page d'accueil

### SiteSettings (⚙️)
Document singleton — configuration générale du site.
- Hero : `heroTitle`, `heroSubtitle`, `heroImage`
- Branding : `logo`
- À propos : `aboutText`
- Liens : `planityUrl`, `instagramUrl`, `instagramHandle`
- Contact : `phone`, `email`, `address`, `city`
- SEO : `seoTitle`, `seoDescription`

## Fonctionnalités V1

- [x] Présentation des services et tarifs (gérés via CMS)
- [ ] Portfolio photo des réalisations (connecté à Sanity)
- [ ] Section avis clients (connectée à Sanity)
- [ ] Intégration du feed Instagram
- [ ] Lien de prise de rendez-vous Planity
- [ ] Espace admin pour modifications autonomes (/studio)
- [ ] SEO optimisé pour le référencement local ("manucure + ville")
- [ ] Responsive mobile

## Fonctionnalités V2 (futur)

- [ ] Système d'authentification (inscription / connexion)
- [ ] Catalogue de formations et ebooks
- [ ] Paiement en ligne via Stripe (Checkout + Webhooks)
- [ ] Espace client avec accès aux formations achetées

## Roadmap V1

| # | Étape | Statut | Branche |
|---|---|---|---|
| 1 | Client Sanity (`sanity.client.ts`, `sanity.queries.ts`, `utils.ts`) | ✅ Terminé | `feature/sanity-schemas` |
| 2 | Schémas Sanity (service, portfolio, review, siteSettings) | ✅ Terminé | `feature/sanity-schemas` |
| 3 | Découpage composants React (Navbar, Footer, SectionHeader, 6 sections) | ✅ Terminé | `feature/sanity-schemas` |
| 4 | Intégration Tailwind + Framer Motion (toutes sections) | ✅ Terminé | `feature/sanity-schemas` |
| 5 | Connecter Sanity aux composants (remplacer données en dur) | ⬜ À faire | — |
| 6 | Déployer sur Vercel (preview continue) | ⬜ À faire | — |
| 7 | SEO (metadata dynamiques, sitemap, JSON-LD) | ⬜ À faire | — |
| 8 | Responsive mobile (ajustements fins) | ⬜ À faire | — |
| 9 | Intégration feed Instagram | ⬜ À faire | — |
| 10 | Mise en production | ⬜ À faire | — |

## État actuel

**Dernière étape terminée : Étape 4 — Intégration complète des sections**

Le site est visuellement complet avec des données en dur (hardcoded). Toutes les sections du mockup Design 1 (Premium Classique) sont implémentées en composants React avec Tailwind CSS et animations Framer Motion. Sanity Studio est accessible à `/studio` avec les 4 types de contenu configurés.

**Prochaine étape : Étape 5 — Connecter Sanity aux composants**

Transformer `page.tsx` en composant async, appeler les fonctions GROQ (`getServices`, `getPortfolioItems`, `getReviews`, `getSiteSettings`), et passer les données en props aux composants de section. Remplacer toutes les données en dur par le contenu dynamique de Sanity.