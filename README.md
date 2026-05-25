# KairosIA — Site Web Landing Page

Landing page pour **.kairos**, cabinet de conseil en transformation IA pour TPE/PME françaises.

> Du bon moment à la bonne action — accompagnement opérationnel, technique et pédagogique de la découverte à la mise en œuvre concrète.

## Stack

- HTML/CSS/JS vanilla — `index.html` (homepage) + `about.html` (page À propos)
- Design system light : `#ffffff` / `#f5f5f3` background · `#cc2c22` rouge accent · Inter 800 (titres) + JetBrains Mono (labels)
- SEO : schema.org JSON-LD (Organization, LocalBusiness, ProfessionalService) · Open Graph · Twitter Card · `llms.txt`
- Responsive : hamburger menu mobile full-screen · breakpoints 900 px (tablette) / 640 px (mobile)
- Animations : `heroIn` page-load stagger · IntersectionObserver scroll · `prefers-reduced-motion`

## Sections — `index.html`

1. Navbar sticky (logo Inter 800, drawer mobile 100vh)
2. Hero — 100vh, centrage vertical, eyebrow « Accompagnement à la transformation par l'IA », quote « Posture » ancrée en bas
3. Cible — pour qui / pour qui pas
4. Méthode — 4 étapes (Comprendre · Prioriser · Expérimenter · Ancrer)
5. Offres — 3 cartes mod box avec tarifs *à partir de* + note Gouvernance des données
6. Simulateur ROI — 2 panneaux (structure + sliders | métriques dark)
7. FAQ — 6 questions, accordéon natif `<details>`
8. Limites — ce que .kairos ne fait pas
9. Contact — fond gris-100, CTA « Parlons de votre kairos »
10. Footer

## Sections — `about.html`

1. Navbar (même structure que homepage, lien Contact inclus)
2. Hero — titre éditorial, deux colonnes de texte
3. Étymologie & Vision — origine du nom .kairos + vision marché
4. Pourquoi maintenant — 3 arguments sur fond noir
5. Ce qui nous différencie — comparatif Intégrateur / Consultant / .kairos
6. Posture & Engagements — 4 engagements en grille 2×2
7. Équipe — Anthony Milans & Alexis Pissinier (placeholders photo)
8. CTA — « Parlons de votre kairos »
9. Footer

## Mise en ligne

| Branche | URL | Statut |
|---|---|---|
| `v2-new-brief` (preview) | https://anthonymlns.github.io/KairosIA/ | ✅ En ligne |
| `master` (production) | — | ⏳ Après validation |

## Fichiers notables

| Fichier | Rôle |
|---|---|
| `index.html` | Homepage — HTML, CSS, JS en fichier unique |
| `about.html` | Page À propos — même stack, deux membres d'équipe |
| `llms.txt` | Indexation LLM (standard llmstxt.org) |
| `references/` | Brief v2, template design, maquette simulateur |

## Lancer en local

```bash
# Aucune dépendance, aucun build requis
open index.html
```

## Suivi

Voir [Issue #2](../../issues/2) pour le détail complet des modifications de la v2 et la checklist de mise en production.
