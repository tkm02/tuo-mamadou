---
name: Kolotioloma Mamadou TUO — Portfolio
description: Le capot du champion. Le portfolio comme le couvercle d'un laptop qui a fait neuf hackathons et s'est couvert d'autocollants.
colors:
  noir: "#141414"
  orange: "#FF6A13"
  papier: "#F4F4F0"
  blanc: "#FFFFFF"
  jaune: "#FFD23F"
  sapin: "#0F7B5F"
  bleu: "#3A5BFF"
  vert: "#19C37D"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "clamp(3.5rem, 11.5vw, 9.5rem)"
    fontWeight: 800
    lineHeight: 0.84
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  sticker:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1
  small:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  focus: "6px"
  field: "14px"
  photo-inner: "14px"
  photo: "22px"
  panel: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(5rem, 11vw, 9rem)"
  cut: "5px"
components:
  button-primary:
    backgroundColor: "{colors.noir}"
    textColor: "{colors.blanc}"
    rounded: "{rounded.pill}"
    padding: "18px 28px"
  button-secondary:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.noir}"
    rounded: "{rounded.pill}"
    padding: "18px 28px"
  sticker:
    backgroundColor: "{colors.jaune}"
    textColor: "{colors.noir}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  photo-sticker:
    backgroundColor: "{colors.blanc}"
    rounded: "{rounded.photo}"
    padding: "10px"
  panel:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.noir}"
    rounded: "{rounded.panel}"
    padding: "28px"
  field:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.noir}"
    rounded: "{rounded.field}"
    padding: "14px 16px"
---

# Design System: Kolotioloma Mamadou TUO — Portfolio

## Overview

**Creative North Star: « Le capot du champion »**

Le laptop d'un développeur qui enchaîne les hackathons finit couvert d'autocollants : les technos qu'il utilise, les événements qu'il a faits, les prix qu'il a gagnés. Ce capot raconte une carrière mieux qu'un CV. Le site est ce capot : un fond clair, des aplats de couleur franche section par section, et des stickers découpés qui se posent, se décollent, brillent.

Noir et orange sont la signature (bouton principal noir, premier écran orange, logo). Quatre couleurs vives (jaune, vert sapin, bleu, vert) donnent à chaque section sa couleur et à chaque catégorie son sticker. Les victoires sont des stickers holographiques irisés qui réagissent à la souris.

**Key Characteristics:**
- **Premier écran calme** (confirmé par Tuo le 2026-09-30) : fond blanc, texte noir, un seul point orange après le nom, photo droite dans un cadre arrondi, trois chiffres clés en texte. Ni stickers, ni aplat de couleur, ni photo détourée, ni mouvement continu. Le capot se couvre d'autocollants à partir de la section suivante.
- Un aplat de couleur par section ensuite : orange (Parcours), papier, noir (scène des victoires), bleu, vert sapin, orange, puis le pied de page noir avec le grand logo </Tuo>. Une seule section noire.
- Stickers partout où il y a une étiquette : technos, catégories, rôles, prix, chiffres.
- Scotch défilant (bandes inclinées) avant Victoires et avant Contact, jamais sous le premier écran.
- Du mouvement à chaque section, mais un geste différent chaque fois.

## Colors

Stratégie : palette pleine, quatre rôles vifs autour du couple noir + orange. **Toutes les couleurs sont réglables dans le backoffice** (Contenu > Apparence, `site_content.theme`). `lib/theme.ts` normalise la palette et calcule pour chaque couleur `--on-<couleur>` : noir ou blanc, celui qui se lit le mieux. Aucun composant ne code une couleur en dur.

### Primary
- **Orange** (#FF6A13) : sections Parcours et Contact, point après le nom, chiffres d'impact, sélection de texte.
- **Noir** (#141414) : le texte, le bouton principal, la scène des victoires, le pied de page.

### Secondary
- **Jaune** (#FFD23F) : surligneur par défaut, étiquettes, bandes de scotch.
- **Vert sapin** (#0F7B5F) : section Terrain (galerie), texte blanc. Remplace le rose, refusé par Tuo le 2026-09-30.
- **Bleu** (#3A5BFF) : section Boîte à outils.
- **Vert** (#19C37D) : « en cours », « disponible », succès du formulaire.

### Neutral
- **Papier** (#F4F4F0) : fond des sections de respiration (À propos, Projets).
- **Blanc** (#FFFFFF) : la découpe des stickers, les panneaux, les champs.

### Named Rules
**The Cut Rule.** Tout sticker porte un liseré blanc (5px, `--cut`) et une ombre décalée douce. Jamais de halo coloré sans décalage.
**The On-Color Rule.** Le texte sur un aplat utilise `--fg` (ou `--on-<couleur>`), et le texte secondaire `--soft`, teinté de la couleur du fond. Jamais de gris sur couleur.
**The One Night Rule.** Une seule section noire : les victoires. Le site reste clair.

## Typography

**Display Font:** Bricolage Grotesque (opsz, wdth variables), 800, souvent condensée (`.display-tight`, wdth 80).
**Body Font:** Figtree.

**Character:** Bricolage a des contre-formes vivantes et un dessin un peu bricolé, comme du lettrage d'autocollant ; Figtree reste net et lisible pour les paragraphes.

### Hierarchy
- **Display** (800, clamp(3.5rem, 11.5vw, 9.5rem), 0.84, condensée) : le nom dans le premier écran uniquement.
- **Headline** (800, clamp(2.75rem, 7vw, 6rem), 0.9) : titres de section.
- **Title** (800, 1.5–2rem) : projets, missions, prix.
- **Figure** (800, 3rem) : chiffres clés dans les stickers étoile et les disques.
- **Lead** (500, 1.25rem) : chapeaux.
- **Body** (400, 1.0625rem, 1.6) : paragraphes, 65ch max.
- **Sticker** (Bricolage 800, 1rem ; 1.25rem pour les grands) : étiquettes dans les stickers. Pas de petites capitales espacées.
- **Small** (Figtree 600, 0.875rem) : métadonnées, compteurs, légendes.

## Layout

Largeur max 1320px, gouttière fluide. Sections séparées par clamp(5rem, 11vw, 9rem). Les titres de section sont énormes et alignés à gauche ; un sticker de données (compte, période) se colle à côté. Les stickers sont posés avec une inclinaison propre (`--r`, entre -8° et 8°) ; le texte courant, lui, reste droit.

## Elevation & Depth

Deux niveaux d'ombre, toujours décalés vers le bas : `--lift` (posé) et `--lift-hi` (soulevé au survol). Le portrait détouré porte une ombre `drop-shadow` qui suit sa silhouette.

## Shapes

Tout est arrondi : pilule pour les stickers et les boutons, 22px pour les photo-stickers (14px à l'intérieur), 28px pour les panneaux et les vitrines, 14px pour les champs.

## Components

- **Sticker** (`.sticker` + `.s-<couleur>`, `components/kit.tsx`) : pilule, disque ou étoile ; liseré blanc ; `sticker-peel` ajoute le coin qui se décolle et le soulèvement au survol.
- **Photo-sticker** (`.photo-sticker`) : photo avec marge blanche, inclinée.
- **Portraits détourés** (`/tuo/sticker-*.png`) : disponibles, mais écartés du premier écran (Tuo ne veut pas sa photo détourée). Ne pas les réintroduire sans qu'il le demande.
- **Holo** (`.holo`, `HoloCard`) : fond irisé calculé à partir de la palette, reflet qui suit le pointeur, inclinaison 3D légère. Réservé aux prix.
- **Scotch** (`Tape`) : bande inclinée qui défile, s'arrête au survol.
- **Boutons** : principal noir (texte blanc), secondaire blanc ; tous en pilule avec flèche « → » typographiée.
- **Champs** : fond blanc, bord noir 2px, arrondi 14px, anneau orange au focus.
- **Parcours (liste + détail)** : liste compacte à gauche (initiale de la structure sur la couleur du type, rôle, structure, durée · type ; la mission choisie passe en noir), fiche détaillée collante à droite. Sur téléphone, la fiche s'ouvre sous la mission et la liste se replie après 6 missions. Demandé par Tuo pour gagner de la place.
- **Lightbox** : `<dialog>` natif, panneau blanc arrondi, flèches clavier et Échap.
- **Confettis** (`burst()` dans `components/motion.tsx`) : aux couleurs de la palette, au clic sur un 1er prix et à l'envoi du formulaire.

### Motion
- Premier écran : une seule entrée douce (les blocs montent, la photo s'ouvre du bas), puis plus rien ne bouge.
- À propos : surligneur qui passe, stickers d'engagements qui se posent.
- Parcours : la fiche de droite monte doucement quand on change de mission.
- Projets : vitrines qui s'ouvrent du bas (`wipe`).
- Victoires : reflets holographiques, confettis.
- Boîte à outils : stickers qui se claquent sur leurs planches.
- Terrain : photos jetées sur le mur, qui pivotent en traversant l'écran (`animation-timeline: view()`).
- Easing : `--ease-out-expo` pour toutes les entrées, y compris la pose des stickers (pas de rebond : Tuo trouve que ça bouge trop). Aucune courbe à rebond dans le site.
- `prefers-reduced-motion` : tout est posé immédiatement, rien ne bouge.

### Backoffice (/admin)

Le backoffice garde son monde de nuit (jetons sous `.theme-night`, ambre pour l'action) et adopte les polices du site. La page **Contenu > Apparence** règle les huit couleurs avec un aperçu en direct et un contrôle de lisibilité. Le site lit la palette côté serveur (`app/layout.tsx`, revalidation 60 s) : un changement apparaît en ligne en une minute au plus.

## Do's and Don'ts

- Do : des photos réelles (portraits, événements, captures) ; le détourage pour le portrait principal.
- Do : un aplat franc par section ; les couleurs par position dans `ACCENTS` (`components/kit.tsx`) ; les couleurs des lignes du backoffice (anciennes) sont ignorées.
- Do : retirer les emoji du contenu (`clean()`), les stickers les remplacent.
- Don't : texte en dégradé, verre dépoli décoratif, barres de pourcentage de compétences, chiffres non vérifiés (pas de « 100 % satisfaction »).
- Don't : plus d'une section noire ; le site doit rester clair.
- Don't : incliner les paragraphes. Seuls les stickers et les photos penchent.
