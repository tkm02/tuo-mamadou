-- ============================================================
-- CONTENU INITIAL — généré depuis lib/fallback-data.ts
-- À exécuter APRÈS schema.sql, dans SQL Editor > New query.
-- Chaque table n'est remplie que si elle est encore vide (aucun doublon).
-- ============================================================

do $seed$
begin
  if not exists (select 1 from experiences) then
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Développeur Full Stack & Automatisation IA', 'Orange', 'Maccory, Abidjan', 'Depuis mai 2026', '5+ mois', 'Entreprise', '', 'Développement full stack d''applications web et mobiles, et automatisation des processus métiers par l''intelligence artificielle.', '["ARIA : plateforme ITSM de la DSI (tickets, routage intelligent, SLA, incidents, assistant IA avec RAG)","Cockpit Projets : collecte des expressions de besoin des directions, workflow de validation et détection IA des projets similaires","Parc IT : inventaire synchronisé SCCM, stock, demandes de matériel (DMI) et assistant qui interroge le parc","Module de détection, sur image, de l''action à effectuer par un chatbot (n8n)","Agents et automatisations n8n, recherche vectorielle Qdrant"]'::jsonb, '["n8n","Qdrant","RAG","LLM","Next.js","FastAPI","PostgreSQL","Docker"]'::jsonb, 'IA', 'Processus automatisés', '#5B8BFF', '[]'::jsonb, 0);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Full Stack Lead - Freelance', 'IzySend', 'Abidjan', 'Décembre 2025 - 2026', '', 'Freelance', '', 'Plateforme de transfert hybride de l''Europe vers l''Afrique : bons d''achat et cash via Mobile Money et Visa.', '["Architecture modulaire NestJS (TypeScript) + PostgreSQL (Prisma / TypeORM)","Paiements Stripe, Mobile Money pawaPay, bons d''achat Zendit / Prizy","Intégration des maquettes Figma en Next.js / React (PWA responsive)","Pipeline CI/CD (Docker, GitHub Actions) et déploiement sur VPS OVH"]'::jsonb, '["NestJS","TypeScript","PostgreSQL","Prisma","TypeORM","Stripe","pawaPay","Next.js","React","Docker","GitHub Actions"]'::jsonb, 'Lead', 'Architecture full stack', '#5B8BFF', '[]'::jsonb, 1);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Développeur Full Stack', 'NEXORA', 'Cocody, Abidjan', 'Janvier - Mai 2026', '5 mois', 'Entreprise', '', 'Conception et développement d''une plateforme de digitalisation et d''exécution des procédures d''entreprise.', '["Conception de l''architecture et développement full stack de la plateforme (frontend et backend)","Workflows digitalisés : création, exécution et suivi des procédures d''entreprise"]'::jsonb, '[]'::jsonb, '', '', '#5B8BFF', '[]'::jsonb, 2);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('1er Prix & Prix d''innovation - Compétition Moov Application', 'Moov', 'Abidjan', 'Décembre 2025', '', 'Compétition', '', 'Plateforme d''écoute anonyme, de suivi, de sensibilisation et d''orientation vers des experts en santé mentale.', '["Chef d''équipe, en charge de la coordination et du pilotage du projet","Développement d''une PWA avec Next.js et Supabase","UX optimisée et mise en relation avec des experts certifiés"]'::jsonb, '["Next.js","Supabase","PWA"]'::jsonb, '1er', 'Prix Moov', '#5B8BFF', '[]'::jsonb, 3);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Chef de Projet / Développeur Full Stack', 'Orange Digital Center', 'Abidjan, Côte d''Ivoire', 'Avril - Décembre 2024', '9 mois', 'Projet', '🍊', 'Pilotage d''un projet de surveillance énergétique temps réel des sites d''Orange CI avec détection d''anomalies pour optimiser la consommation.', '["Rédaction du cahier des charges fonctionnel et technique","Système complet de monitoring avec alertes temps réel","Dashboard interactif avec visualisations Highcharts","Réduction de 30% des anomalies énergétiques détectées","Documentation technique et coordination avec les tuteurs"]'::jsonb, '["Node.js","Express.js","React js","Flutter","MongoDB","ESP32","Socket.io","Highcharts"]'::jsonb, '100%', 'Données temps réel', '#5B8BFF', '[]'::jsonb, 4);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Développeur Backend - Freelance', 'Système de Gestion de Flotte', 'Treichville', 'Septembre 2024 - Mars 2026', '19 mois', 'Freelance', '🚗', 'Développement d''une API REST robuste pour le suivi temps réel de flottes avec websockets, géolocalisation et authentification JWT sécurisée.', '["API REST complète avec 30+ endpoints","Suivi temps réel de +25 véhicules (pannes, trajets, géolocalisation)","Architecture scalable avec Prisma ORM","API REST sécurisées : authentification, gestion des véhicules et des chauffeurs","Tests fonctionnels, documentation et livraison d''un backend prêt à l''intégration"]'::jsonb, '["Express.js","Prisma","MongoDB","Socket.io","JWT","Postman"]'::jsonb, '25+', 'Véhicules suivis', '#5B8BFF', '[]'::jsonb, 5);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Instructeur de Programmation', 'GOMYCODE', 'Abidjan, Maccory Zone 4', 'Septembre 2023 - Juin 2025', '2 ans', 'Enseignement', '👨‍🏫', 'Cours d''introduction au développement web et au Full Stack JavaScript, encadrement et accompagnement des apprenants.', '["Préparation et animation de séances sur les fondamentaux HTML, CSS, JavaScript","Encadrement des apprenants sur des projets web dynamiques (portfolios, to-do apps…)","Conception de projets pédagogiques full stack : React + Express avec base de données","Accompagnement personnalisé : code review, corrections, conseils techniques"]'::jsonb, '["JavaScript","ES6+","React","Node.js","Git/GitHub","Pédagogie"]'::jsonb, '5+', 'Étudiants formés', '#5B8BFF', '[]'::jsonb, 6);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Développeur Frontend - Freelance', 'MahouFarm', 'Abidjan', 'Août - Novembre 2023', '4 mois', 'Freelance', '🌾', 'Construction d''une interface responsive pour application de mise en relation agriculteurs-entreprises avec intégration API.', '["Interface moderne responsive (mobile-first) avec React.js","Intégration API REST pour profils, offres et messagerie","UX fluide et composants dynamiques","Optimisation performance (Lighthouse 95+)"]'::jsonb, '["React.js","Tailwind CSS","React Router","JavaScript","REST API","Axios"]'::jsonb, 'API', 'REST intégrée', '#5B8BFF', '[]'::jsonb, 7);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('1er Prix - Hackathon ICESCO', 'MASS 2025 (MARCHÉ AFRICAIN DES SOLUTIONS SPATIALES)', 'Treichville', 'Mai 2025', '3 jours', 'Hackathon', '🏆', 'Conception d''une solution intelligente pour l''agriculture durable en Afrique combinant IoT, IA et télédétection.', '["1er Prix du Hackathon ICESCO","Système IoT avec capteurs, IA et télédétection","Analyse qualité des sols et de l''eau pour agriculture optimisée","Plateforme de suivi et aide à la décision pour agriculteurs","Simulation des rendements et recommandations de culture"]'::jsonb, '["IoT","IA","Capteurs","Télédétection","Data Analysis","React js","Express.js","MongoDB"]'::jsonb, '1er', 'Prix ICESCO', '#5B8BFF', '[]'::jsonb, 8);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('2ème Prix - African Digital Week Hackathon', 'ADW 2025', 'Yamoussoukro', 'Mai - Juin 2025', '1 mois', 'Hackathon', '🥈', 'Chef d''équipe - Conception d''une solution pour des services publics accessibles en Côte d''Ivoire avec IA multilingue.', '["2ème Prix du Hackathon ADW","Chef d''équipe et coordination du projet","Développement frontend de la plateforme citoyenne","Intégration d''un LLM pour assistance intelligente multilingue"]'::jsonb, '["React","LLM","IA","Frontend","Leadership"]'::jsonb, '2ème', 'Prix ADW', '#5B8BFF', '[]'::jsonb, 9);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Lead Frontend Developer', 'Séminaire An-Nour', 'Abidjan / Remote', 'Août 2025 - En cours', '4+ mois', 'Freelance', '🕌', 'Chef d''équipe frontend pour la digitalisation complète du Séminaire Islamique An-Nour : gestion administrative, financière, scientifique et inscriptions.', '["Lead frontend d''une équipe de 3 développeurs","Développement UI/UX pour 4 commissions (Admin, Finance, Scientifique, Séminaristes)","Interface de vente de tickets avec panier et paiement Mobile Money","Système d''inscription intelligent avec upload/capture photos et validation multi-étapes","Dashboard SuperAdmin avec gestion des rôles et permissions","UI gestion des emplois du temps et suivi académique des séminaristes"]'::jsonb, '["React","TypeScript","Tailwind CSS","React Query","React Hook Form","Figma","Axios"]'::jsonb, '75%', 'Frontend complété', '#5B8BFF', '[]'::jsonb, 10);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Chef de Projet / Développeur Full Stack - Intech Challenge 2025', 'Domaine Bini (ESATIC)', 'Abidjan', 'Août - Décembre 2025', '5 mois', 'Compétition', '🏞️', 'Digitalisation de l''écotourisme du Domaine Bini (11 sites) : réservations en ligne, paiements intégrés, visites immersives 360°, dashboard IA et CRM multisite.', '["Système de réservation multisite avec calendrier temps réel","Intégration paiements Mobile Money (CinetPay) et cartes bancaires (Stripe)","Visites immersives 360° avec A-Frame et Marzipano","Cartographie interactive avec Leaflet (11 sites géolocalisés)","Dashboard PDG avec IA : analyse des avis clients, recommandations stratégiques, alertes proactives"]'::jsonb, '["React","TypeScript","Express.js","MongoDB","Prisma","A-Frame","Leaflet","WebVR","IA/ML"]'::jsonb, '3e', 'Place Intech Challenge', '#5B8BFF', '[]'::jsonb, 11);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('2ème Prix - APPRENTISSAGE PAR PROJET 03', 'ESATIC', 'Treichville', 'Octobre 2023 - Février 2024', '5 mois', 'Projet Académique', '📚', 'Valorisation du secteur du vivrier en Côte d''Ivoire de la production à la commercialisation.', '["2ème Prix du concours APP03","Analyse des besoins des producteurs et commerçants","Développement d''une application web pour la vente","Conception d''un tableau de bord de suivi des activités"]'::jsonb, '["React","Express.js","MongoDB","Mongoose","Dashboard","Analyse métier"]'::jsonb, '2ème', 'Prix APP03', '#5B8BFF', '[]'::jsonb, 12);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('APPRENTISSAGE PAR PROJET 02', 'ESATIC', 'Treichville', 'Janvier - Mai 2023', '5 mois', 'Projet Académique', '⚙️', 'Mise en place d''un système d''enchère en ligne sécurisée avec gestion temps réel.', '["Architecture technique et base de données complètes","Backend Node.js avec système d''authentification","Intégration frontend HTML/CSS","Logique d''enchère en temps réel"]'::jsonb, '["Node.js","WebSocket","HTML","CSS","JavaScript","MongoDB"]'::jsonb, '100%', 'Projet validé', '#5B8BFF', '[]'::jsonb, 13);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('APPRENTISSAGE PAR PROJET 01', 'ESATIC', 'Treichville', 'Janvier - Juin 2022', '6 mois', 'Projet Académique', '💡', 'Mise en place d''une plateforme de valorisation des performances scolaires en Côte d''Ivoire.', '["Plateforme complète de gestion des performances","Système de suivi et d''analyse des résultats","Interface intuitive pour enseignants et élèves","Base de données relationnelle optimisée"]'::jsonb, '["HTML","CSS","JavaScript","Adobe xd"]'::jsonb, '100%', 'Projet validé', '#5B8BFF', '[]'::jsonb, 14);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('2ème Prix - Hackathon Gestion Consommation Électrique', 'GS2E', 'Treichville', 'Janvier 2022', '3 jours', 'Hackathon', '⚡', 'Mise en place d''un système de gestion de la consommation électrique dans une maison connectée.', '["Système IoT de monitoring énergétique","Dashboard temps réel de consommation","Alertes automatiques de surconsommation","Intégration capteurs ESP32"]'::jsonb, '["ESP32","Node-RED","Figma","Arduino","IoT"]'::jsonb, '100%', 'Prototype validé', '#5B8BFF', '[]'::jsonb, 15);
    insert into experiences ("role", "company", "location", "period", "duration", "type", "logo", "description", "achievements", "technologies", "impact", "impactLabel", "color", "proofs", "sortOrder")
    values ('Projet Interne - Chat Club Informatique', 'Club Info ESATIC', 'Treichville', 'Décembre 2022 - Janvier 2023', '2 mois', 'Projet Associatif', '💬', 'Mise en place d''un chat instantané pour le club informatique (messagerie instantanée).', '["Application de messagerie temps réel","Interface utilisateur moderne et responsive","Système de notifications instantanées","Gestion des conversations de groupe"]'::jsonb, '["Socket.io","CSS","ejs","JavaScript","Express.js","MongoDB"]'::jsonb, '35+', 'Utilisateurs actifs', '#5B8BFF', '[]'::jsonb, 16);
  end if;
end $seed$;

do $seed$
begin
  if not exists (select 1 from education) then
    insert into education ("degree", "fullDegree", "school", "location", "year", "status", "icon", "sortOrder")
    values ('Master SIGL', 'Master Systèmes d''Information et Génie Logiciel', 'ESATIC', 'Abidjan, CI', '2024 - 2026', 'Diplômé', '🎓', 0);
    insert into education ("degree", "fullDegree", "school", "location", "year", "status", "icon", "sortOrder")
    values ('Licence SRIT', 'Licence Systèmes de Réseaux Informatiques et de Télécommunications', 'ESATIC', 'Abidjan, CI', '2021 - 2024', 'Diplômé', '📡', 1);
    insert into education ("degree", "fullDegree", "school", "location", "year", "status", "icon", "sortOrder")
    values ('Formation Data Science', 'Formation Data Science & IA', 'Africa TechUp Tour', 'Online', '2024 - En cours', 'En cours', '📊', 2);
    insert into education ("degree", "fullDegree", "school", "location", "year", "status", "icon", "sortOrder")
    values ('Baccalauréat Scientifique', 'Baccalauréat série D', 'Lycée Municipal Adjamé Williamsville', 'Abidjan, CI', '2021', 'Obtenu', '🎒', 3);
  end if;
end $seed$;

do $seed$
begin
  if not exists (select 1 from projects) then
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('ARIA - Gestion des services IT, DSI Orange CI', 'Agent de Résolution Intelligente des Anomalies : le service desk de la DSI d''Orange Côte d''Ivoire. Portail demandeur et backoffice DSI : tickets, qualification et routage IA vers la bonne corbeille (nomenclature GLPI, règles métier, recherche vectorielle), incidents, problèmes et changements, SLA (TTO / TTR), météo DSI avec QoS et NPS, assistant ARIA avec RAG et laboratoire IA entraîné sur les tickets validés.', '/orange/aria-accueil.jpg', '["Next.js","React","TypeScript","FastAPI","Python","PostgreSQL","n8n","Qdrant","Docker","Nginx","SSE","JWT","Alembic"]'::jsonb, '2026', 'Développeur Full Stack & IA', 'IA & Automatisation', '#ff7900', false, '', '', '', 0);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Cockpit Projets - Expressions de besoin, Orange CI', 'Chaque direction exprime ses besoins par campagne, dans un parcours en 6 étapes aligné sur la stratégie « Trust the Future ». Centralisation, workflow de validation, suivi budgétaire (estimé, approuvé, consommé) et assistant IA qui fait ressortir les projets similaires.', '/orange/cockpit-projets-dashboard.jpg', '["n8n","Qdrant","IA"]'::jsonb, '2026', 'Développeur Full Stack & IA', 'IA & Automatisation', '#ff7900', false, '', '', '', 1);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Parc IT - Gestion du parc informatique, Orange CI', 'Pilotage du parc bureautique de la DSI : inventaire consolidé depuis SCCM, stock, carte du parc par ville, demandes de matériel (DMI) transmises par n8n, packs d''équipement, retours et assistant qui interroge le parc en français avec des chiffres calculés par l''API.', '/orange/parc-it-tableau-de-bord.jpg', '["n8n","SCCM","API REST","Agent IA"]'::jsonb, '2026', 'Développeur Full Stack', 'Full Stack', '#ff7900', false, '', '', '', 2);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Vision pour chatbot - Orange CI', 'Module en cours : détecte sur une image le type d''action que le chatbot doit effectuer, orchestré avec n8n.', '', '["n8n","Qdrant","LLM","Vision"]'::jsonb, '2026', 'Automatisation IA', 'IA & Automatisation', '#ff7900', false, '', '', '', 3);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Système de Surveillance Énergétique Orange CI', 'Système IoT complet pour la surveillance énergétique temps réel avec détection d''anomalies et alertes.', '/kania.png', '["Node.js","React.js","Express.js","ESP32","Socket.io","Highcharts"]'::jsonb, '2024', 'Chef de Projet', 'Full Stack', '#ff7900', false, '', '', '', 4);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('IzySend', 'Plateforme de transfert hybride de l''Europe vers l''Afrique : bons d''achat et cash via Mobile Money et Visa. Architecture modulaire, paiements multi-fournisseurs, PWA responsive.', '', '["NestJS","TypeScript","PostgreSQL","Prisma","Stripe","pawaPay","Next.js","Docker","GitHub Actions"]'::jsonb, '2025-2026', 'Full Stack Lead', 'Full Stack', '#5B8BFF', false, '', '', '', 5);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Plateforme santé mentale - Moov Application', '1er prix et Prix d''innovation. Écoute anonyme, suivi, sensibilisation et orientation vers des experts certifiés en santé mentale.', '', '["Next.js","Supabase","PWA"]'::jsonb, '2025', 'Chef d''Équipe', 'Full Stack', '#5B8BFF', true, '1er Prix', '', '', 6);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Digitalisation des procédures - NEXORA', 'Plateforme de digitalisation et d''exécution des procédures d''entreprise : création, exécution et suivi des workflows.', '', '[]'::jsonb, '2026', 'Développeur Full Stack', 'Full Stack', '#5B8BFF', false, '', '', '', 7);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Plateforme Gestion de Flotte', 'API REST sécurisée avec suivi temps réel des véhicules, authentification JWT et dashboards analytics.', '/flot.jpg', '["Express.js","Prisma","MongoDB","Socket.io","React"]'::jsonb, '2024-2025', 'Développeur Backend', 'Backend', '#00FF94', false, '', '', '', 8);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Solution Agriculture Durable - ICESCO', '1er Prix du Hackathon ICESCO. Système IoT intelligent pour l''agriculture durable en Afrique.', '/kulture360.png', '["IoT","IA","Télédétection","ESP32","Mobile App"]'::jsonb, '2025', 'Tech Lead', 'IoT', '#FFBE0B', true, '1er Prix', '', '', 9);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Application MahouFarm', 'Application web responsive pour gestion agricole avec intégration API et interface intuitive.', '/mahourFarm.jpg', '["React","Tailwind CSS","TypeScript","REST API"]'::jsonb, '2023', 'Développeur Frontend', 'Frontend', '#5B8BFF', false, '', '', '', 10);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Digitalisation Séminaire An-Nour', 'Plateforme complète de gestion administrative, financière et académique pour un séminaire islamique.', '/an-nour.jpg', '["React","TypeScript","Tailwind CSS","React Query","Django"]'::jsonb, '2025', 'Lead Frontend', 'Frontend', '#FF6B3D', false, '', '', '', 11);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Écotourisme Domaine Bini', 'Plateforme de réservation multisite avec visites immersives 360°, paiements intégrés et dashboard IA.', '/bini.png', '["Next.js","React.js","Express.js","LLM"]'::jsonb, '2025', 'Chef de Projet', 'Full Stack', '#00D9FF', false, '', '', '', 12);
    insert into projects ("title", "description", "image", "technologies", "year", "role", "category", "color", "award", "awardLabel", "demoUrl", "githubUrl", "sortOrder")
    values ('Plateforme CitoyenneCI - African Digital Week', '2ème Prix du Hackathon ADW. Solution innovante pour des services publics accessibles en Côte d''Ivoire avec IA multilingue.', '/e-citoyen.png', '["React","LLM","IA","TypeScript","API"]'::jsonb, '2025', 'Chef d''Équipe', 'Full Stack', '#F653FF', true, '2ème Prix', '', '', 13);
  end if;
end $seed$;

do $seed$
begin
  if not exists (select 1 from awards) then
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('Prix de la meilleure innovation inclusive', 'Sahel Tech Innovation Challenge (STIC''26), Burkina Faso. Le projet INA (I''m Not Alone) remporte le prix de l''innovation inclusive parmi près de 60 équipes, avec une présentation en ligne.', 'Award', 'Mai 2026', '#F653FF', '["Près de 60 équipes en compétition","Projet INA (I''m Not Alone)","Présentation en ligne"]'::jsonb, 0);
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('1er Prix Compétition Moov Application', '1er prix et Prix d''innovation de la compétition Moov Application', 'Trophy', 'Déc. 2025', '#FFBE0B', '["Plateforme d''écoute anonyme et d''orientation en santé mentale","Chef d''équipe : coordination et pilotage du projet","PWA Next.js et Supabase"]'::jsonb, 1);
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('3ème Place Intech Challenge', 'Solution d''amélioration du service client des sites du Domaine Bini, avec le contrôle et la gestion des sites intégrés. 3e face à plusieurs écoles, et meilleure équipe à présenter un projet terminé.', 'Award', 'Déc. 2025', '#5B8BFF', '["Service client des sites du Domaine Bini","Contrôle et gestion des sites intégrés","Meilleure équipe avec un projet terminé"]'::jsonb, 2);
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('3ème Meilleure application de Côte d''Ivoire', 'Prix FAO, Journée mondiale de l''alimentation, Ministère de l''Agriculture. Application IoT pour la gestion agricole intelligente', 'Award', 'Oct. 2025', '#00FF94', '["Surveillance en temps réel des cultures","Alertes automatisées pour les agriculteurs","Optimisation des rendements agricoles"]'::jsonb, 3);
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('2ème Prix African Digital Week Hackathon', 'Services publics accessibles avec IA multilingue en Côte d''Ivoire', 'Award', 'Mai–juin 2025', '#F653FF', '["Chef d''équipe et coordination du projet","Plateforme citoyenne innovante","Intégration LLM pour assistance intelligente"]'::jsonb, 4);
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('1er Prix Hackathon ICESCO (MASS 2025)', 'Solution intelligente pour l''agriculture durable en Afrique', 'Trophy', 'Mai 2025', '#FFBE0B', '["Système IoT avec capteurs et télédétection","Intégration d''Intelligence Artificielle","Impact social en milieu agricole africain"]'::jsonb, 5);
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('2ème Prix Apprentissage par Projet 03', 'ESATIC. Valorisation du secteur vivrier en Côte d''Ivoire', 'Award', '2023–2024', '#5B8BFF', '["Solution web interactive","Data visualization avancée","Impact économique et social"]'::jsonb, 6);
    insert into awards ("title", "description", "icon", "date", "color", "details", "sortOrder")
    values ('2ème Prix Hackathon GS2E', 'Système de gestion de la consommation électrique dans une maison connectée', 'Award', 'Janv. 2022', '#5B8BFF', '[]'::jsonb, 7);
  end if;
end $seed$;

do $seed$
begin
  if not exists (select 1 from certifications) then
    insert into certifications ("name", "provider", "logo", "color", "year", "skills", "certificateUrl", "certificateType", "verificationUrl", "sortOrder")
    values ('Project Management Fundamentals', 'Google', '🔵', '#0668E1', '2025', '["Gestion","Planning","Agile"]'::jsonb, '/certificates/Coursera project_manager.pdf', 'pdf', 'https://coursera.org/verify/BJUPR1V6QHSW', 0);
    insert into certifications ("name", "provider", "logo", "color", "year", "skills", "certificateUrl", "certificateType", "verificationUrl", "sortOrder")
    values ('Agile and Scrum Development', 'IBM', '🔷', '#0668E1', '2025', '["Scrum","Sprint","Kanban"]'::jsonb, '/certificates/Coursera agile.pdf', 'pdf', 'https://coursera.org/verify/FHLELI3UIQ0X', 1);
    insert into certifications ("name", "provider", "logo", "color", "year", "skills", "certificateUrl", "certificateType", "verificationUrl", "sortOrder")
    values ('Programming with JavaScript', 'Meta', '⚛️', '#0668E1', '2025', '["ES6+","Async","DOM"]'::jsonb, '/certificates/Coursera met_javascript.pdf', 'pdf', 'https://coursera.org/verify/UFP41QX8T5PU', 2);
    insert into certifications ("name", "provider", "logo", "color", "year", "skills", "certificateUrl", "certificateType", "verificationUrl", "sortOrder")
    values ('Front-End Development', 'Meta', '🎨', '#0668E1', '2025', '["React","HTML","CSS"]'::jsonb, '/certificates/Coursera frontend.pdf', 'pdf', 'https://coursera.org/verify/GJE0UQC5Q9LW', 3);
    insert into certifications ("name", "provider", "logo", "color", "year", "skills", "certificateUrl", "certificateType", "verificationUrl", "sortOrder")
    values ('Back-End Development', 'Meta', '⚙️', '#0668E1', '2025', '["Node.js","API","Database"]'::jsonb, '/certificates/Coursera meta_backend.pdf', 'pdf', 'https://coursera.org/verify/VVW428ROC83W', 4);
    insert into certifications ("name", "provider", "logo", "color", "year", "skills", "certificateUrl", "certificateType", "verificationUrl", "sortOrder")
    values ('Data Science Fundamentals', 'Africa TechUp Tour', '📊', '#0668E1', '2025 - En cours', '["Python","ML","Analytics"]'::jsonb, '/certificates/techup-datascience.png', 'image', '', 5);
  end if;
end $seed$;

do $seed$
begin
  if not exists (select 1 from gallery_items) then
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('events', 'Hackathon ICESCO 2024', '1er Prix - Solution IoT Agriculture', '["/mass/IMG-20250510-WA0006.jpg","/mass/IMG-20250328-WA0000.jpg","/mass/IMG-20250507-WA0004.jpg"]'::jsonb, 'Avril 2025', 'Abidjan, Côte d''Ivoire', '#FFBE0B', 0);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('events', 'Hackathon IA SARA 2025', 'Application IA pour l''agriculture', '["/sara/IMG-20250525-WA0004.jpg","/sara/IMG-20250528-WA0003.jpg","/sara/IMG-20250528-WA0011.jpg"]'::jsonb, 'Mai 2025', 'Parc d''exposition', '#5B8BFF', 1);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('events', 'Hackathon ADW GEEK 2025', '2ème Prix - Solution intelligente pour les services publics', '["/adw/WhatsApp Image 2025-12-10 at 20.45.10_15dd37bf.jpg","/adw/WhatsApp Image 2025-12-10 at 20.45.06_48710759.jpg","/adw/WhatsApp Image 2025-12-10 at 20.45.09_23defe9c.jpg"]'::jsonb, 'Juin 2025', 'ADW 2025', '#00C897', 2);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('events', 'Journée mondiale de l''alimentation 2025', '3ème meilleur application agricole en Côte d''Ivoire', '["/jma/IMG-20251128-WA0003.jpg","/jma/FB_IMG_1764283243602.jpg"]'::jsonb, 'Novembre 2025', 'JMA 2025', '#F653FF', 3);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('team', 'Cellule d''Innovation et de Developpement de l''ESATIC (CID)', 'Membre actif de la CID', '["/cid/IMG-20250315-WA0002.jpg","/cid/Screenshot_2025-07-05-01-50-43-623_com.whatsapp.jpg"]'::jsonb, 'Depuis 2022', 'CID ESATIC', '#FF6B3D', 4);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('mentoring', 'Formation securité digitale', 'Atelier de formation sur la sécurité digitale pour les étudiants de l''AEEMCI', '["/sd/IMG-20251031-WA0021.jpg"]'::jsonb, 'Novembre 2024', 'ESATIC', '#00D9FF', 5);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('events', 'Soutenance de Projet de Fin d''Études', 'Présentation réussie de mon projet de fin d''études en Systèmes Réseaux Informatique et Télécommunications (SRIT)', '["/l3/BD7A4058.jpg","/l3/BD7A4087.jpg","/l3/BD7A4017.jpg","/l3/BD7A4073.jpg"]'::jsonb, 'Novembre 2024', 'ESATIC', '#00D9FF', 6);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('team', 'Chef de l''Équipe KANIA - Orange Digital Center', 'Equipe de travail à l''Orange Digital Center (ODC) Equipe KANIA', '["/odc/BD7A1399.jpg","/odc/BD7A1274.jpg","/odc/BD7A1415.jpg"]'::jsonb, 'Depuis 2022', 'CID ESATIC', '#FF6B3D', 7);
    insert into gallery_items ("category", "title", "description", "images", "date", "location", "color", "sortOrder")
    values ('events', 'Panel SDI 2025 - ESATIC', 'Intervention lors du panel sur les innovations technologiques locales au service la préservation de l''environnement et du développement durable.', '["/sdi/8E9A1822.jpg","/sdi/8E9A2003.jpg","/sdi/8E9A2030.jpg"]'::jsonb, 'Depuis 2022', 'CID ESATIC', '#FF6B3D', 8);
  end if;
end $seed$;

do $seed$
begin
  if not exists (select 1 from skill_categories) then
    insert into skill_categories ("slug", "title", "icon", "color", "description", "skills", "sortOrder")
    values ('frontend', 'Frontend & Mobile', 'Code2', '#5B8BFF', 'Interfaces modernes et réactives', '[{"name":"React.js","level":95,"icon":"⚛️"},{"name":"Next.js","level":85,"icon":"▲"},{"name":"TypeScript","level":80,"icon":"📘"},{"name":"Flutter","level":70,"icon":"📲"},{"name":"React Native","level":88,"icon":"📱"},{"name":"CSS","level":98,"icon":"🎨"},{"name":"JavaScript vanilla","level":98,"icon":"⚡"},{"name":"Vue.js","level":90,"icon":"💚"}]'::jsonb, 0);
    insert into skill_categories ("slug", "title", "icon", "color", "description", "skills", "sortOrder")
    values ('backend', 'Backend & API', 'Zap', '#06c776', 'Architectures scalables et performantes', '[{"name":"Node.js","level":92,"icon":"🟢"},{"name":"Express.js","level":90,"icon":"🚂"},{"name":"Nest.js","level":60,"icon":"🦉"},{"name":"Fastify","level":85,"icon":"⚡"},{"name":"Socket.io","level":88,"icon":"🔌"},{"name":"Prisma ORM","level":88,"icon":"🔷"},{"name":"Mongoose ORM","level":90,"icon":"🌲"},{"name":"REST API","level":93,"icon":"🔗"},{"name":"FastAPI","level":70,"icon":"🚀"},{"name":"Spring Boot","level":40,"icon":"🌳"},{"name":"Flask","level":65,"icon":"🐍"}]'::jsonb, 1);
    insert into skill_categories ("slug", "title", "icon", "color", "description", "skills", "sortOrder")
    values ('ia', 'Automatisation IA', 'Bot', '#9D7BFF', 'Workflows et intégration de LLM au service des processus métiers', '[{"name":"n8n","level":85,"icon":""},{"name":"LLM","level":80,"icon":""},{"name":"RAG","level":75,"icon":""},{"name":"Qdrant","level":70,"icon":""},{"name":"Claude","level":80,"icon":""}]'::jsonb, 2);
    insert into skill_categories ("slug", "title", "icon", "color", "description", "skills", "sortOrder")
    values ('database', 'Bases de Données', 'Database', '#FF6B3D', 'Stockage et gestion des données', '[{"name":"MongoDB","level":88,"icon":"🍃"},{"name":"PostgreSQL","level":85,"icon":"🐘"},{"name":"Firebase","level":82,"icon":"🔥"},{"name":"MySQL","level":85,"icon":"🐬"},{"name":"SQLite","level":80,"icon":"💾"},{"name":"Cassandra","level":70,"icon":"🧠"}]'::jsonb, 3);
    insert into skill_categories ("slug", "title", "icon", "color", "description", "skills", "sortOrder")
    values ('devops', 'DevOps', 'Server', '#3DDC84', 'Conteneurs, intégration continue et déploiement', '[{"name":"Docker","level":80,"icon":""},{"name":"Docker Compose","level":80,"icon":""},{"name":"GitHub Actions","level":80,"icon":""},{"name":"Jenkins","level":65,"icon":""},{"name":"1Panel","level":70,"icon":""}]'::jsonb, 4);
    insert into skill_categories ("slug", "title", "icon", "color", "description", "skills", "sortOrder")
    values ('iot', 'IoT & Systèmes Embarqués', 'Cpu', '#F653FF', 'Internet des objets et hardware', '[{"name":"ESP32","level":85,"icon":"📡"},{"name":"Arduino","level":82,"icon":"🤖"},{"name":"Node-RED","level":82,"icon":"🔴"},{"name":"C++","level":80,"icon":"⚙️"}]'::jsonb, 5);
    insert into skill_categories ("slug", "title", "icon", "color", "description", "skills", "sortOrder")
    values ('datascience', 'Data Science', 'TrendingUp', '#FFBE0B', 'Analyse de données et intelligence artificielle', '[{"name":"Python","level":90,"icon":"🐍"},{"name":"Pandas","level":55,"icon":"🐼"},{"name":"NumPy","level":60,"icon":"🔢"},{"name":"Hugging Face","level":50,"icon":"🦙"},{"name":"Google Colab","level":80,"icon":"📓"}]'::jsonb, 6);
  end if;
end $seed$;

do $seed$
begin
  if not exists (select 1 from tools) then
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Agile/Scrum', '🔄', 'Méthodologie', 0);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Trello', '📋', 'Méthodologie', 1);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Git/GitHub', '🐙', 'Versioning', 2);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Figma', '🎨', 'Design', 3);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Adobe Premiere', '🎥', 'Design', 4);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Photoshop', '', 'Design', 5);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Microsoft PowerPoint', '📝', 'Design', 6);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Adobe XD', '💎', 'Design', 7);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Power BI', '📊', 'Data', 8);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('Postman', '📮', 'API', 9);
    insert into tools ("name", "icon", "category", "sortOrder")
    values ('VS Code', '💻', 'IDE', 10);
  end if;
end $seed$;

insert into site_content (key, value) values ('hero', '{"badge":"Développeur full stack & IA · Abidjan","nameLine1":"Kolotioloma","nameLine2":"Mamadou TUO","title":"Développeur Full Stack & IA","description":"Ingénieur logiciel diplômé du Master SIGL de l''ESATIC. Je développe des applications web et mobiles et j''automatise les processus métiers par l''IA : workflows n8n, LLM, RAG. Neuf fois primé depuis 2022, le plus souvent comme chef de projet.","image":"/tuo/portrait-desk.jpg","cardTitle":"Full Stack Developer","cardSubtitle":"Web • Mobile • IA","availableBadge":"Disponible pour des missions freelance"}'::jsonb) on conflict (key) do nothing;
insert into site_content (key, value) values ('about', '{"badge":"À Propos de Moi","headingLine1":"Full stack & IA,","headingLine2":"souvent chef de projet","subtitle":"Ingénieur logiciel spécialisé en développement full stack et en automatisation par l''intelligence artificielle.","profileImage":"/tuo/portrait-kente.jpg","name":"Mamadou Tuo","caption":"Ingénieur logiciel • Master SIGL ESATIC • Abidjan","cvUrl":"/KOLOTIOLOMA_MAMADOU_TUO.pdf","githubUrl":"https://github.com/tkm02","linkedinUrl":"https://linkedin.com/in/mamadou-tuo","tabs":[{"id":"parcours","label":"Parcours","title":"Un parcours marqué par le leadership","text":"De la Licence SRIT au Master SIGL de l''ESATIC, dont je suis diplômé, j''ai construit une double compétence : développer et piloter. Chef de projet à l''Orange Digital Center, lead full stack chez IzySend, chef d''équipe sur la plupart des compétitions que j''ai remportées. Aujourd''hui chez Orange, je me concentre sur l''automatisation par l''IA : workflows n8n, intégration de LLM et de systèmes RAG au service des processus métiers.","highlight":"🌍 1er Prix International ICESCO · 🏆 1er Prix Moov Application · 🌱 Prix Inclusion SahelTech · 🇨🇮 2ème Prix National ADW"},{"id":"philosophie","label":"Philosophie","title":"Code avec impact, tech avec sens","text":"Je crois que la technologie doit servir un objectif plus grand : résoudre des problèmes réels et améliorer des vies. Mon approche combine excellence technique, pensée systémique et impact mesurable. Chaque ligne de code est une opportunité de créer quelque chose de significatif.","highlight":"💡 Innovation · 🎯 Impact · ⚡ Excellence"},{"id":"objectifs","label":"Objectifs","title":"Construire l''avenir tech africain","text":"Mon ambition est de contribuer à l''écosystème tech africain en tant que développeur expert et leader technologique. À travers l''enseignement (GOMYCODE), le leadership (Président club digital ESATIC, GDSC Project Planner) et des projets innovants, je veux inspirer la prochaine génération de développeurs.","highlight":"🚀 Leadership · 🌍 Impact Africain · 📚 Transmission"}],"stats":[{"value":"9","label":"Distinctions depuis 2022"},{"value":"2","label":"Premiers prix (ICESCO, Moov)"},{"value":"3+","label":"Années d''expérience"}],"recognitionsText":"🌱 Meilleure innovation inclusive SahelTech • 🏆 1er Prix Moov Application • 🏆 1er Prix ICESCO • 🥈 2ème Prix ADW • 🥉 3ème Intech Challenge • 🥉 Prix FAO (Journée mondiale de l''alimentation) • 🎓 2ème Prix APP03 • 🥈 2ème Prix GS2E","leadershipText":"Président du club communication digitale ESATIC • Chargé du digital au C2E • Project Planner GDSC ESATIC • Membre de la CID"}'::jsonb) on conflict (key) do nothing;
insert into site_content (key, value) values ('contact', '{"email":"mamadoutuo77@gmail.com","phone":"+225 07 58 02 42 50","phoneHref":"tel:+2250758024250","location":"Abidjan, Côte d''Ivoire"}'::jsonb) on conflict (key) do nothing;
insert into site_content (key, value) values ('socials', '{"github":"https://github.com/tkm02","linkedin":"https://linkedin.com/in/mamadou-tuo","email":"mamadoutuo77@gmail.com"}'::jsonb) on conflict (key) do nothing;
insert into site_content (key, value) values ('theme', '{"noir":"#141414","orange":"#FF6A13","papier":"#F4F4F0","blanc":"#FFFFFF","jaune":"#FFD23F","sapin":"#0F7B5F","bleu":"#3A5BFF","vert":"#19C37D"}'::jsonb) on conflict (key) do nothing;
insert into site_content (key, value) values ('awards', '{"backgroundImage":"/awards/trophees.jpg","trophies":[{"image":"/awards/trophees/sahel-tech-2026.png","title":"Prix de l''innovation inclusive","caption":"Sahel Tech Innovation Challenge, 2026"},{"image":"/awards/trophees/mass-icesco-2025.png","title":"1er Prix, Grand Prix ICESCO","caption":"Hackathon MASS, 2025"},{"image":"/awards/trophees/aeemci-ina.png","title":"Projet INA (I''m Not Alone)","caption":"AEEMCI ESATIC"}]}'::jsonb) on conflict (key) do nothing;

-- Trophées : n'écrase jamais une photo déjà choisie dans le backoffice.
update experiences set trophy = '/awards/trophees/mass-icesco-2025.png' where role = '1er Prix - Hackathon ICESCO' and trophy = '';
update projects set trophy = '/awards/trophees/mass-icesco-2025.png' where title = 'Solution Agriculture Durable - ICESCO' and trophy = '';
