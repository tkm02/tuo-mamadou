---
version: 1
slug: "app-admin-page-tsx"
primary_target: "app/admin/page.tsx"
related_targets: ["app/admin/layout.tsx","components/admin/resource-manager.tsx"]
---

## Scope
/admin backoffice (login, poste de contrôle, contenu, collections, messages). Mode: Operate.

## Audience and job
Kolotioloma Mamadou TUO alone, on desktop and phone. Frequent jobs, all confirmed: change texts and photos, add/edit missions and projects, reorder items, read and answer contact messages.

## Chosen structure
- Home = « Poste de contrôle »: reads the data and lists what needs attention (unread messages, items without image, ongoing missions to confirm, empty collections, import when the base is empty), each alert linking straight to the fix.
- Collections = board list (search, reorder by drag or keyboard) + side-panel editor with the list still visible; full screen on phone. Dirty-state bar, Ctrl/Cmd+S, leave warning, inline delete confirmation.
- Navigation mirrors the public site's section names (Parcours, Projets, Distinctions, Réseau, Terrain…).

## Constraints
- Same world as the site (DESIGN.md), Operate register: Overpass everywhere, Big Shoulders only for page titles, no emoji, no icon tiles.
- Fields the public site no longer renders are hidden (values kept in the DB).
- Selects accept values outside their suggestion list (no silent loss).

## Memorable moment
The control room catching a stale fact before a recruiter does.
