# kAIros. — Site Web Landing Page

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-brightgreen)
![Last Commit](https://img.shields.io/github/last-commit/AnthonyMlns/SiteWebKairosIA)

Landing page pour **kAIros.**, cabinet de conseil en transformation IA pour TPE/PME françaises.

> Du bon moment à la bonne action — accompagnement opérationnel, technique et pédagogique de la découverte à la mise en œuvre concrète.

## Description

Site vitrine statique (HTML/CSS/JS vanilla) avec cinq pages :
- **`index.html`** — page d'accueil (hero, cible, méthode, FAQ, contact)
- **`simulateur.html`** — simulateur de ROI IA (2 panneaux, sliders, métriques)
- **`cas-dusage.html`** — cas d'usage concrets (3 colonnes : gagner du temps, amplifier l'activité, construire sur mesure)
- **`about.html`** — À propos (étymologie, vision, posture, engagement, CTA)
- **`404.html`** — page d'erreur personnalisée (404)

## Stack

- HTML/CSS/JS vanilla
- Design system : tokens CSS (variables) · [`design-system.md`](design-system.md) · `#cc2c22` rouge accent · Inter 800 (titres) + JetBrains Mono (labels)
- SEO : schema.org JSON-LD (Organization, LocalBusiness, ProfessionalService) · Open Graph · Twitter Card · `llms.txt`
- Responsive : hamburger menu mobile full-screen · breakpoints 900 px / 640 px
- Animations : `heroIn` page-load stagger · IntersectionObserver scroll · `prefers-reduced-motion`

## Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Aucun serveur ni dépendance requis

## Installation

```bash
git clone https://github.com/AnthonyMlns/SiteWebKairosIA.git
cd SiteWebKairosIA
```

## Utilisation

Ouvrez `index.html` dans votre navigateur :

```bash
# macOS
open index.html

# Windows
start index.html
```

## Structure du projet

```
├── index.html          # Accueil — hero, cible, méthode, FAQ, contact
├── about.html          # À propos — étymologie, vision, posture, équipe
├── cas-dusage.html     # Cas d'usage concrets (3 colonnes)
├── simulateur.html     # Simulateur de ROI IA
├── 404.html            # Page d'erreur personnalisée
├── design-system.md    # Tokens et principes du design system
├── llms.txt            # Indexation LLM
├── LICENSE
└── README.md
```

## Roadmap

- [x] **MVP** — Landing page statique
- [x] **v2 — Mise en production** — about.html, simulateur ROI, cas-dusage.html, rebranding kAIros., design system, déploiement GitHub Pages
- [ ] **v2.1** — Pages services dédiées + témoignages clients
- [ ] **v3** — Back-office CMS léger + formulaire de contact fonctionnel

## Contribuer

Les contributions ne sont pas ouvertes pour le moment. Ce projet est un site vitrine privé.

## Licence

All Rights Reserved — voir le fichier [`LICENSE`](LICENSE).
