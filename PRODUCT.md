# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: recruiters and companies evaluating Kolotioloma Mamadou TUO, and clients looking for a freelance full stack / AI automation developer. They skim quickly, want to know who he is, what he has built and led, and how to reach him.
Secondary: hackathon juries and partners.

## Product Purpose
Personal portfolio of Kolotioloma Mamadou TUO, Abidjan, Côte d'Ivoire. Success = a visitor understands within seconds that he is a full stack & AI developer (software engineer, Master SIGL ESATIC) who is often the project lead, trusts it from real evidence, and contacts him.

## Positioning
Title (confirmed 2026-09-29, matches CV of 2026-09-28): "Développeur full stack & IA". Current focus: AI automation (n8n workflows, LLM and RAG integration) at Orange since May 2026. Leadership is the proof, not the title: nine competition awards since 2022, two first prizes (ICESCO 2025, Moov Application 2025), most of them as team lead; project lead at Orange Digital Center, Full Stack Lead at IzySend.
Availability (confirmed): available for freelance missions.

## Operating Context
Visitors arrive from a CV, LinkedIn, or an email link, often on mobile. Site content is editable through an admin backoffice (`app/admin`, Supabase `site_content` and collection tables) with fallback data in `lib/fallback-data.ts`. Language: French.

## Capabilities and Constraints
- Next.js 16 / React 19 / Tailwind v4. Content comes from `useSiteContent` / `useTable` hooks; any redesign must keep reading from these so the backoffice keeps working.
- Sections with data: hero, about (parcours / philosophie / objectifs), skills, tools, experiences, education, projects, awards, certifications, professional gallery, contact.
- Primary action: contact (email, phone). Secondary: CV PDF download (`/KOLOTIOLOMA_MAMADOU_TUO.pdf`, replaced by the CV of 2026-09-28).

## Brand Commitments
- Name: Kolotioloma Mamadou TUO; short form "Tuo".
- Existing logo `/public/logo.png` ("</Tuo>" script mark). Not binding for the redesign.

## Evidence on Hand
- Portraits: `/public/BD7A6739_1.JPG` (at desk, ODC), `/public/mamadou-profile.png` (kente-style stole, ceremony), `/public/mamadou.jpg`.
- Project screenshots: `/public/kania.png`, `/public/flot.jpg`, `/public/kulture360.png`, `/public/mahourFarm.jpg`, `/public/an-nour.jpg`, `/public/bini.png`, `/public/e-citoyen.png`.
- Event/team photos under `/public/{mass,sara,adw,jma,cid,sd,l3,odc,sdi}`.
- Coursera certificates under `/public/certificates`.
- No testimonials. Do not invent client satisfaction figures, client counts, or quotes. The existing "100% Satisfaction Clients" stat is unverified and must not be shown.

## Product Principles
1. Full stack & AI first; leadership proven by what he led and won.
2. Evidence over adjectives: real photos, screenshots, prizes, dates.
3. Contact is never more than one gesture away.
4. Content stays editable from the backoffice.
