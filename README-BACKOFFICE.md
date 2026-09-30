# Backoffice du Portfolio — Guide d'installation

Ton portfolio dispose maintenant d'un **backoffice complet** sur `/admin` pour modifier tout le contenu du site sans toucher au code : textes, images, PDF, expériences, projets, prix, certifications, galerie, contact…

## 1. Créer le projet Supabase (5 minutes)

1. Va sur [supabase.com](https://supabase.com) → **New project** (gratuit).
2. Choisis un nom (ex. `portfolio`) et un mot de passe de base de données, puis crée le projet.

## 2. Créer les tables et le stockage

1. Dans le dashboard Supabase, ouvre **SQL Editor** → **New query**.
2. Copie-colle **tout** le contenu du fichier [`supabase/schema.sql`](supabase/schema.sql) et clique **Run**.
   - Cela crée les tables (expériences, projets, prix, certifications, galerie…), les règles de sécurité (lecture publique, écriture réservée à toi) et le bucket `media` pour les images/PDF.

## 3. Créer ton compte administrateur

1. Dans Supabase : **Authentication** → **Users** → **Add user** → **Create new user**.
2. Renseigne ton email et un mot de passe solide. Coche **Auto Confirm User**.
   - C'est avec ces identifiants que tu te connecteras à `/admin/login`.

## 4. Configurer le projet Next.js

1. Dans Supabase : **Project Settings** → **API**, copie :
   - **Project URL**
   - **Publishable key** (`sb_publishable_…`, ou l'ancienne clé *anon*)
2. À la racine du projet, copie `.env.local.example` en `.env.local` et colle les deux valeurs :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tonprojet.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

3. Redémarre le serveur : `npm run dev`

> ⚠️ Sur Vercel, ajoute aussi ces deux variables dans **Settings → Environment Variables** puis redéploie.

## 5. Importer ton contenu actuel (1 clic)

1. Ouvre [http://localhost:3000/admin/login](http://localhost:3000/admin/login) et connecte-toi.
2. Tant que la base est vide, le **Poste de contrôle** affiche « Première mise en service » : clique **Importer**.
   - Tout le contenu intégré au code est copié dans Supabase.
   - Les sections déjà remplies ne sont jamais touchées : aucun risque de doublon.

> Sans passer par `/admin` : colle le contenu de [`supabase/seed.sql`](supabase/seed.sql) dans **SQL Editor** → **Run**. Même résultat, mêmes garde-fous contre les doublons.

## 6. Utilisation au quotidien

La navigation reprend les noms des sections du site.

| Menu | Ce que tu peux modifier |
|---|---|
| **Poste de contrôle** | Ce qui demande ton attention : fichiers introuvables, missions « en cours » à confirmer, projets sans capture, messages non lus. Chaque ligne ouvre directement l'élément à corriger. |
| **Le site** : Accueil, À propos, Contact, Réseaux sociaux | Textes fixes, portrait détouré, stickers, bandes de scotch, CV, chiffres clés, liens |
| **Le site** : Apparence | Les 8 couleurs du site (noir, orange, fond clair, blanc, jaune, vert sapin, bleu, vert), avec aperçu en direct et contrôle de lisibilité. Visible en ligne en une minute au plus. |
| **Collections** : Parcours, Projets, Distinctions, Certifications, Réseau technique, Atelier, Formation, Sur le terrain | Les listes du site |
| **Boîte** : Messages | Messages du formulaire de contact |

- **Modifier** : clique un élément ; le panneau d'édition s'ouvre à droite (plein écran sur téléphone).
- **Enregistrer** : bouton ambre ou **Ctrl/⌘ + S**. Tant qu'il y a des modifications non enregistrées, un point ambre le signale et le backoffice te prévient avant de les perdre.
- **Ajouter** : bouton ambre en haut à droite. Les nouveaux éléments arrivent en tête de liste, donc en premier sur le site.
- **Réordonner** : glisse la poignée à gauche d'une ligne, ou utilise les flèches. L'ordre de la liste est l'ordre du site.
- **Supprimer** : deux clics (le premier arme le bouton, le second confirme).
- **Listes** (réalisations, détails) : Entrée ajoute une ligne, Retour arrière sur une ligne vide la retire.
- **Technologies** : tape puis Entrée ou virgule ; tu peux coller une liste séparée par des virgules.
- **Images / PDF** : glisse le fichier sur le cadre, ou colle une adresse (`/mamadou.jpg`, `https://…`).
- Les champs que le site n'affiche plus (emoji, couleur, icône, niveau de compétence) sont masqués ; leurs valeurs restent en base.

## Comment ça marche

- Le site public lit les données dans Supabase ; **tant que la base est vide ou non configurée, il affiche le contenu d'origine** (défini dans `lib/fallback-data.ts`). Le site ne peut donc jamais être « cassé » par la base.
- La sécurité est assurée par les règles RLS de Postgres : tout le monde peut **lire** le contenu, mais seul un utilisateur **connecté** (toi) peut écrire. Le formulaire de contact peut uniquement **insérer** des messages ; leur lecture est réservée à toi.

## Fichiers ajoutés

- `supabase/schema.sql` — schéma de la base (à exécuter une fois)
- `lib/supabase/client.ts` — client Supabase + upload de fichiers
- `lib/use-portfolio.ts` — hooks de lecture avec fallback
- `lib/fallback-data.ts` — contenu d'origine du site (fallback + import initial)
- `lib/admin/resources.ts` — configuration des collections du backoffice (ajoute un champ ici pour l'avoir dans le formulaire)
- `lib/admin/content-sections.ts` — configuration des sections fixes (Accueil, À propos, Contact, Réseaux)
- `lib/admin/health.ts` — règles du poste de contrôle
- `components/admin/` — composants du backoffice (formulaires, uploads, CRUD)
- `app/admin/` — pages du backoffice (login, dashboard, contenu, sections, messages)
