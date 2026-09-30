-- ============================================================
-- SCHÉMA SUPABASE — Portfolio Mamadou TUO
-- À exécuter dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ---------- TABLES ----------

-- Contenu éditorial du site (hero, à propos, contact, réseaux sociaux…)
create table if not exists site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  "updatedAt" timestamptz not null default now()
);

-- Expériences professionnelles (emplois, freelance, hackathons, projets académiques…)
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null default '',
  location text not null default '',
  period text not null default '',
  duration text not null default '',
  type text not null default 'Projet',
  logo text not null default '💼',
  description text not null default '',
  achievements jsonb not null default '[]'::jsonb,
  technologies jsonb not null default '[]'::jsonb,
  impact text not null default '',
  "impactLabel" text not null default '',
  color text not null default '#5B8BFF',
  proofs jsonb not null default '[]'::jsonb,
  trophy text not null default '',
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Formation académique
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  "fullDegree" text not null default '',
  school text not null default '',
  location text not null default '',
  year text not null default '',
  status text not null default 'En cours',
  icon text not null default '🎓',
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Projets & réalisations
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image text not null default '',
  technologies jsonb not null default '[]'::jsonb,
  year text not null default '',
  role text not null default '',
  category text not null default 'Full Stack',
  color text not null default '#5B8BFF',
  award boolean not null default false,
  "awardLabel" text not null default '',
  "demoUrl" text not null default '',
  "githubUrl" text not null default '',
  trophy text not null default '',
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Prix & reconnaissances
create table if not exists awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon text not null default 'Trophy',
  date text not null default '',
  color text not null default '#FFBE0B',
  details jsonb not null default '[]'::jsonb,
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Certifications (avec PDF/image du certificat)
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  provider text not null default '',
  logo text not null default '📜',
  color text not null default '#0668E1',
  year text not null default '',
  skills jsonb not null default '[]'::jsonb,
  "certificateUrl" text not null default '',
  "certificateType" text not null default 'pdf',
  "verificationUrl" text not null default '',
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Galerie professionnelle (événements, leadership, mentorat)
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'events',
  title text not null,
  description text not null default '',
  images jsonb not null default '[]'::jsonb,
  date text not null default '',
  location text not null default '',
  color text not null default '#5B8BFF',
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Catégories de compétences (chaque catégorie contient sa liste de skills)
create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null default '',
  title text not null,
  icon text not null default 'Code2',
  color text not null default '#5B8BFF',
  description text not null default '',
  skills jsonb not null default '[]'::jsonb,
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Outils & méthodologies
create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text not null default '🛠️',
  category text not null default '',
  "sortOrder" int not null default 0,
  "createdAt" timestamptz not null default now()
);

-- Messages reçus via le formulaire de contact
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  subject text not null default '',
  message text not null default '',
  read boolean not null default false,
  "createdAt" timestamptz not null default now()
);

-- ---------- MISES À JOUR ----------
-- Colonnes ajoutées après la création des tables : relancer ce fichier les ajoute sans rien effacer.

-- Photo du trophée (PNG sans fond) sous les missions et projets primés.
alter table experiences add column if not exists trophy text not null default '';
alter table projects add column if not exists trophy text not null default '';

-- ---------- SÉCURITÉ (RLS) ----------
-- Lecture publique du contenu, écriture réservée à l'utilisateur connecté (toi).

alter table site_content enable row level security;
alter table experiences enable row level security;
alter table education enable row level security;
alter table projects enable row level security;
alter table awards enable row level security;
alter table certifications enable row level security;
alter table gallery_items enable row level security;
alter table skill_categories enable row level security;
alter table tools enable row level security;
alter table contact_messages enable row level security;

do $$
declare t text;
begin
  foreach t in array array['site_content','experiences','education','projects','awards','certifications','gallery_items','skill_categories','tools']
  loop
    execute format('drop policy if exists "public read" on %I', t);
    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('drop policy if exists "auth write" on %I', t);
    execute format('create policy "auth write" on %I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- Messages : tout le monde peut envoyer, seul l'admin peut lire/gérer
drop policy if exists "anyone can insert" on contact_messages;
create policy "anyone can insert" on contact_messages for insert with check (true);
drop policy if exists "auth manage" on contact_messages;
create policy "auth manage" on contact_messages for all to authenticated using (true) with check (true);

-- ---------- STOCKAGE (images, PDF) ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media auth insert" on storage.objects;
create policy "media auth insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "media auth update" on storage.objects;
create policy "media auth update" on storage.objects
  for update to authenticated using (bucket_id = 'media');

drop policy if exists "media auth delete" on storage.objects;
create policy "media auth delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
