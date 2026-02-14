Projet : Site Manucure — V1 Vitrine / V2 Formations
Contexte développeur

Développeur junior++ spécialisé Java / Spring Boot
Bonne maîtrise de React (via React Native), Angular, MySQL, AWS
Première utilisation de Next.js, Tailwind CSS, Sanity, Framer Motion et Stripe — guide-moi étape par étape sur ces technos
Langue principale : français. Code et noms de variables/fonctions en anglais

Stack technique
V1 — Site vitrine (phase actuelle)

Framework : Next.js (App Router, SSG/SSR)
Styling : Tailwind CSS + Framer Motion (animations)
CMS : Sanity (contenu géré par la cliente : services, tarifs, photos, textes)
Hébergement : Vercel (front)
Pas de backend custom en V1

V2 — Plateforme de formations (future)

Backend : Spring Boot (Java 21+), Spring Security (JWT)
Base de données : PostgreSQL (Railway)
Paiement : Stripe (Checkout Sessions + Webhooks)
Hébergement back : Railway

Fonctionnalités V1

Pages : Accueil, Services/Tarifs, Portfolio (galerie photo), Avis clients, Contact
Lien Planity (prise de RDV) mis en avant
Intégration feed Instagram
Espace admin Sanity pour autonomie de la cliente
SEO local optimisé (balises meta, SSG, images optimisées)
Responsive mobile-first
UI soignée et moderne, design premium adapté à l'univers manucure/beauté

Fonctionnalités V2

Authentification (inscription / connexion)
Catalogue de formations et ebooks avec paiement Stripe
Espace client sécurisé avec accès au contenu acheté
Webhooks Stripe pour valider les achats côté backend
Vérification des signatures webhooks
Clés API et secrets en variables d'environnement (jamais en dur)

Règles et préférences

Explique-moi les concepts nouveaux (Next.js, Tailwind, Sanity, Stripe) quand tu les utilises pour la première fois. 
Des rappels sur des notions de React sont les bienvenues
Pas besoin de réexpliquer les bases Java/Spring
Privilégie les bonnes pratiques : architecture propre, typage, composants réutilisables
Commente le code quand la logique n'est pas évidente
Propose une approche progressive : fais fonctionner d'abord, optimise ensuite
Pour le design UI : vise un rendu premium, moderne, dans l'univers beauté/nail art. Pas de template générique
Si un choix technique se présente, explique les options avec les pour/contre avant de trancher
En cas d'erreur ou de bug, aide-moi à comprendre le problème plutôt que juste donner la solution

Structure du projet (à mettre à jour au fil du développement)
/
├── src/
│   ├── app/            # Pages Next.js (App Router)
│   ├── components/     # Composants React réutilisables
│   ├── lib/            # Utilitaires, config Sanity, helpers
│   └── styles/         # Config Tailwind, styles globaux
├── sanity/             # Schémas et config Sanity Studio
├── public/             # Assets statiques
└── README.md