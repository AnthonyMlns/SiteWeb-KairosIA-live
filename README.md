# kAIros. — Site Web Landing Page

![Vercel](https://img.shields.io/badge/Vercel-deployed-brightgreen)
![Domain](https://img.shields.io/badge/domain-kairos--digital.com-blue)
![Last Commit](https://img.shields.io/github/last-commit/AnthonyMlns/SiteWebKairosIA-live)

Landing page pour **kAIros.**, cabinet de conseil en transformation IA pour TPE/PME françaises.

> Du bon moment à la bonne action — accompagnement opérationnel, technique et pédagogique de la découverte à la mise en œuvre concrète.

## Description

Site vitrine statique (HTML/CSS/JS vanilla) avec **6 pages**, alimenté dynamiquement via **Sanity CMS** :

- **`index.html`** — page d'accueil (hero avec image, cible, méthode avec image, FAQ)
- **`simulateur.html`** — simulateur de ROI IA (2 panneaux, sliders, métriques)
- **`cas-dusage.html`** — cas d'usage concrets (3 colonnes statiques + section dynamique via Sanity)
- **`about.html`** — À propos (étymologie, vision, posture, équipe avec photo)
- **`contact.html`** — Page contact dédiée (formulaire → Sanity, image-4, infos)
- **`404.html`** — page d'erreur personnalisée (404)

## Stack

- **Frontend** : HTML/CSS/JS vanilla
- **CMS** : Sanity (`sanity/`) — headless CMS, projectId `deh20epq`, dataset `production`
- **Studio** : Déployé sur `kairos-ia.sanity.studio`
- **Hébergement** : Vercel (Speed Insights + Analytics)
- **Domaine** : `kairos-digital.com`
- **Design system** : tokens CSS (variables) · [`design-system.md`](design-system.md) · `#cc2c22` rouge accent · Inter 800 (titres) + JetBrains Mono (labels)
- **SEO** : schema.org JSON-LD (Organization, LocalBusiness, ProfessionalService) · Open Graph · Twitter Card · `llms.txt`
- **Responsive** : hamburger menu mobile full-screen · breakpoints 900 px / 640 px · images en background sur mobile
- **Animations** : `heroIn` page-load stagger · IntersectionObserver scroll · `prefers-reduced-motion`

## Installation

```bash
git clone https://github.com/AnthonyMlns/SiteWebKairosIA-live.git
cd SiteWebKairosIA-live
```

### Lancer le site

```bash
npx serve .
```

### Lancer Sanity Studio

```bash
cd sanity
npm install
npm run dev
```

Configurez votre `.env` à partir de `.env.example`.

## Structure du projet

```
├── index.html              # Accueil — hero + image, cible, méthode + image, FAQ
├── about.html              # À propos — étymologie, vision, posture, équipe + photo
├── cas-dusage.html         # Cas d'usage (statique + dynamique Sanity)
├── simulateur.html         # Simulateur de ROI IA
├── contact.html            # Contact — formulaire → Sanity + image-4
├── blog.html               # Blog — liste d'articles (inspiré d'agentcommunity.org/blog)
├── article.html            # Article individuel (slug en query param, inspiré d'agentcommunity.org/blog/aid-v2)
├── 404.html                # Page d'erreur personnalisée
│
├── images/                 # Images du site
│   ├── image-1.png         # Hero section
│   ├── image-2.png         # Méthode section
│   ├── image-4.png         # Contact page
│   └── Anthony Milans - Profil.png
│
├── js/
│   ├── sanity.js           # Client Sanity CDN (fetch + render)
│   └── contact.js          # Formulaire de contact (POST → /api/contact)
│
├── api/
│   └── contact.js          # Vercel Function → écrit dans Sanity
│
├── sanity/                 # Sanity CMS Studio
│   ├── package.json
│   ├── sanity.cli.js
│   ├── sanity.config.js
│   └── schemas/
│       ├── index.js
│       ├── useCaseCategory.js    # Schéma : catégorie de cas d'usage
│       ├── contactSubmission.js  # Schéma : soumissions formulaire
│       └── post.js               # Schéma : articles de blog
│
├── package.json
├── package-lock.json
├── design-system.md
├── llms.txt
├── .env.example
├── LICENSE
└── README.md
```

## Roadmap

- [x] **MVP** — Landing page statique
- [x] **v2** — about.html, simulateur ROI, cas-dusage.html, rebranding kAIros., design system, déploiement
- [x] **v2.1** — Page 404, animations unifiées, navigation simplifiée (4 liens)
- [x] **v3.5 — Blog** — Schéma Sanity `post`, blog.html, article.html, TOC sidebar, navigation à 5 liens
- [x] **v3 — Sanity CMS** — Intégration Sanity, schéma useCaseCategory, chargement dynamique
- [x] **v3.1 — Images** — Hero + méthode + contact visuels, responsive background mobile
- [x] **v3.2 — Formulaire de contact** — Page contact dédiée, Vercel Function, schéma contactSubmission
- [x] **v3.3 — Studio en ligne** — Déploiement Sanity Studio sur kairos-ia.sanity.studio
- [x] **v3.4 — Vercel Analytics** — Scripts Analytics injectés dans toutes les pages HTML
- [ ] **Témoignages clients** — Section témoignages dynamiques via Sanity
- [ ] **Services dédiés** — Pages services individuelles
- [ ] **Contenu rédactionnel** — Rédiger et publier des articles depuis le Studio Sanity

## Contribuer

Les contributions ne sont pas ouvertes pour le moment. Ce projet est un site vitrine privé.

## Licence

All Rights Reserved — voir le fichier [`LICENSE`](LICENSE).
