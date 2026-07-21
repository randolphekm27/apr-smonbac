-- ============================================================
-- FICHIER CONSOLIDÉ COMPLET — Plateforme d'orientation universitaire Bénin
-- Généré à partir de 18 fichiers, dans l'ordre d'exécution.
-- Contient : schéma d'enrichissement + vue + enrichissement de
-- 213 filières (descriptions + débouchés + champs enrichis).
-- ============================================================


-- ================================================================
-- >>> FICHIER SOURCE : 01_schema_enrichissement.sql
-- ================================================================

-- ============================================================
-- SCHÉMA D'ENRICHISSEMENT — Plateforme d'orientation universitaire (Bénin)
-- Compatible avec le dump existant (universites, ecoles, filieres)
-- Toutes les opérations sont idempotentes : ce script peut être
-- rejoué sans erreur sur une base déjà enrichie.
-- Cible : PostgreSQL / Supabase
-- ============================================================

-- Extension nécessaire pour gen_random_uuid() (activée par défaut sur Supabase)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- 1. UNIVERSITÉS — enrichissement identité visuelle & localisation
-- ============================================================

ALTER TABLE universites
  ADD COLUMN IF NOT EXISTS logo_url             TEXT,
  ADD COLUMN IF NOT EXISTS photo_couverture_url TEXT,
  ADD COLUMN IF NOT EXISTS latitude             NUMERIC(9,6),
  ADD COLUMN IF NOT EXISTS longitude            NUMERIC(9,6),
  ADD COLUMN IF NOT EXISTS reseaux_sociaux       JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS created_at            TIMESTAMPTZ DEFAULT now();

COMMENT ON COLUMN universites.reseaux_sociaux IS
  'Ex: {"facebook": "url", "tiktok": "url", "instagram": "url", "linkedin": "url"}';

-- ============================================================
-- 2. ÉCOLES — enrichissement pratique complet
-- ============================================================

ALTER TABLE ecoles
  -- Localisation
  ADD COLUMN IF NOT EXISTS adresse               TEXT,
  ADD COLUMN IF NOT EXISTS ville                 TEXT,
  ADD COLUMN IF NOT EXISTS latitude              NUMERIC(9,6),
  ADD COLUMN IF NOT EXISTS longitude             NUMERIC(9,6),
  -- Horaires & contact
  ADD COLUMN IF NOT EXISTS horaires_ouverture    JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS contact_email         TEXT,
  ADD COLUMN IF NOT EXISTS contact_telephone     TEXT,
  ADD COLUMN IF NOT EXISTS site_web              TEXT,
  ADD COLUMN IF NOT EXISTS reseaux_sociaux       JSONB DEFAULT '{}'::jsonb,
  -- Infrastructures
  ADD COLUMN IF NOT EXISTS laboratoires          JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS bibliotheques         JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS salles_informatique    JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS amphitheatres         JSONB DEFAULT '[]'::jsonb,
  -- Vie étudiante
  ADD COLUMN IF NOT EXISTS associations_etudiantes JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS clubs_sportifs        JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS evenements_annuels    JSONB DEFAULT '[]'::jsonb,
  -- Médias
  ADD COLUMN IF NOT EXISTS logo_url              TEXT,
  ADD COLUMN IF NOT EXISTS photo_couverture_url  TEXT,
  ADD COLUMN IF NOT EXISTS created_at            TIMESTAMPTZ DEFAULT now();

COMMENT ON COLUMN ecoles.horaires_ouverture IS
  'Ex: {"lun_ven": "08h00-17h30", "sam": "08h00-12h00", "dim": "fermé"}';
COMMENT ON COLUMN ecoles.laboratoires IS
  'Ex: [{"nom": "Labo Génie Civil", "description": "...", "photo_url": "..."}]';
COMMENT ON COLUMN ecoles.associations_etudiantes IS
  'Ex: [{"nom": "AEEP", "description": "...", "contact": "..."}]';
COMMENT ON COLUMN ecoles.evenements_annuels IS
  'Ex: [{"nom": "Journée Portes Ouvertes", "periode": "Mars", "description": "..."}]';

-- ============================================================
-- 3. FILIÈRES — enrichissement pédagogique, financier, statistique
-- ============================================================

ALTER TABLE filieres
  -- Contenu pédagogique
  ADD COLUMN IF NOT EXISTS objectifs_pedagogiques TEXT,
  ADD COLUMN IF NOT EXISTS cours_principaux       JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS cours_optionnels       JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS projets_typiques       JSONB DEFAULT '[]'::jsonb,

  -- Stages & insertion professionnelle
  ADD COLUMN IF NOT EXISTS stage_obligatoire      BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS stage_duree            TEXT,
  ADD COLUMN IF NOT EXISTS stages_possibles       TEXT,
  ADD COLUMN IF NOT EXISTS entreprises_cibles     JSONB DEFAULT '[]'::jsonb,

  -- Rémunération (en FCFA)
  ADD COLUMN IF NOT EXISTS salaire_debutant_min   INTEGER,
  ADD COLUMN IF NOT EXISTS salaire_debutant_max   INTEGER,
  ADD COLUMN IF NOT EXISTS salaire_5ans_min        INTEGER,
  ADD COLUMN IF NOT EXISTS salaire_5ans_max        INTEGER,

  -- Poursuite d'études & reconnaissance
  ADD COLUMN IF NOT EXISTS poursuite_etudes       TEXT,
  ADD COLUMN IF NOT EXISTS equivalence_internationale TEXT,

  -- Admission & coûts
  ADD COLUMN IF NOT EXISTS places_payantes        INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS frais_inscription      INTEGER,
  ADD COLUMN IF NOT EXISTS frais_mensuel          INTEGER,

  -- Dates clés (année académique courante)
  ADD COLUMN IF NOT EXISTS date_candidature_debut DATE,
  ADD COLUMN IF NOT EXISTS date_candidature_fin   DATE,
  ADD COLUMN IF NOT EXISTS date_resultats         DATE,
  ADD COLUMN IF NOT EXISTS date_rentree           DATE,

  -- Médias
  ADD COLUMN IF NOT EXISTS video_presentation_url TEXT,
  ADD COLUMN IF NOT EXISTS brochure_pdf_url       TEXT,
  ADD COLUMN IF NOT EXISTS photo_couverture_url   TEXT,

  -- Recherche & découverte
  ADD COLUMN IF NOT EXISTS mots_cles              TEXT[] DEFAULT '{}',

  -- Statistiques (dénormalisées pour la performance, tenues à jour par trigger)
  ADD COLUMN IF NOT EXISTS popularite_vues        INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS note_moyenne           NUMERIC(2,1),
  ADD COLUMN IF NOT EXISTS nombre_avis            INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS niveau_difficulte      SMALLINT,
  ADD COLUMN IF NOT EXISTS genre_dominant         TEXT,

  ADD COLUMN IF NOT EXISTS created_at             TIMESTAMPTZ DEFAULT now();

-- Colonne générée : total des places toutes catégories confondues
ALTER TABLE filieres
  ADD COLUMN IF NOT EXISTS places_totales INTEGER
  GENERATED ALWAYS AS (
    COALESCE(bourse, 0) + COALESCE(aide_fpp, 0) + COALESCE(places_payantes, 0)
  ) STORED;

COMMENT ON COLUMN filieres.cours_principaux IS
  'Ex: [{"nom": "Algorithmique", "semestre": 1, "credits": 6}]';
COMMENT ON COLUMN filieres.entreprises_cibles IS
  'Ex: ["MTN Bénin", "Ecobank", "Moov Africa"]';
COMMENT ON COLUMN filieres.mots_cles IS
  'Mots-clés de recherche libre, ex: {"informatique","data","reseaux"}';
COMMENT ON COLUMN filieres.genre_dominant IS
  'Valeurs attendues: masculin | feminin | mixte';
COMMENT ON COLUMN filieres.niveau_difficulte IS
  'Échelle de 1 (accessible) à 5 (très exigeant)';

-- Contraintes de cohérence (créées via DO block pour être rejouables sans erreur)
DO $$ BEGIN
  ALTER TABLE filieres ADD CONSTRAINT chk_filieres_note_moyenne
    CHECK (note_moyenne IS NULL OR (note_moyenne >= 0 AND note_moyenne <= 5));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE filieres ADD CONSTRAINT chk_filieres_difficulte
    CHECK (niveau_difficulte IS NULL OR niveau_difficulte BETWEEN 1 AND 5);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE filieres ADD CONSTRAINT chk_filieres_genre
    CHECK (genre_dominant IS NULL OR genre_dominant IN ('masculin','feminin','mixte'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE filieres ADD CONSTRAINT chk_filieres_salaires_debutant
    CHECK (
      salaire_debutant_min IS NULL OR salaire_debutant_max IS NULL
      OR salaire_debutant_min <= salaire_debutant_max
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE filieres ADD CONSTRAINT chk_filieres_salaires_5ans
    CHECK (
      salaire_5ans_min IS NULL OR salaire_5ans_max IS NULL
      OR salaire_5ans_min <= salaire_5ans_max
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- 4. TABLE AVIS — notes et commentaires (alimentent note_moyenne)
-- ============================================================

CREATE TABLE IF NOT EXISTS avis (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filiere_id     UUID NOT NULL REFERENCES filieres(id) ON DELETE CASCADE,
  auteur_nom     TEXT,
  auteur_type    TEXT NOT NULL DEFAULT 'etudiant',
  note           SMALLINT NOT NULL,
  titre          TEXT,
  commentaire    TEXT,
  statut         TEXT NOT NULL DEFAULT 'en_attente',
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE avis ADD CONSTRAINT chk_avis_note CHECK (note BETWEEN 1 AND 5);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE avis ADD CONSTRAINT chk_avis_type
    CHECK (auteur_type IN ('etudiant','ancien_etudiant','enseignant','parent'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE avis ADD CONSTRAINT chk_avis_statut
    CHECK (statut IN ('en_attente','approuve','rejete'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- 5. TABLE TÉMOIGNAGES — contenu éditorial mis en avant
-- ============================================================

CREATE TABLE IF NOT EXISTS temoignages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filiere_id        UUID NOT NULL REFERENCES filieres(id) ON DELETE CASCADE,
  auteur_nom        TEXT NOT NULL,
  auteur_role       TEXT NOT NULL,
  auteur_photo_url  TEXT,
  promotion_annee   INTEGER,
  contenu           TEXT NOT NULL,
  video_url         TEXT,
  mis_en_avant      BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT now()
);

DO $$ BEGIN
  ALTER TABLE temoignages ADD CONSTRAINT chk_temoignages_role
    CHECK (auteur_role IN ('etudiant','ancien_etudiant','enseignant'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- 6. TRIGGER — mise à jour automatique de note_moyenne / nombre_avis
-- ============================================================

CREATE OR REPLACE FUNCTION fn_update_filiere_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_filiere_id UUID;
BEGIN
  target_filiere_id := COALESCE(NEW.filiere_id, OLD.filiere_id);

  UPDATE filieres f
  SET
    note_moyenne = sub.avg_note,
    nombre_avis  = sub.total
  FROM (
    SELECT
      ROUND(AVG(note)::numeric, 1) AS avg_note,
      COUNT(*) AS total
    FROM avis
    WHERE filiere_id = target_filiere_id
      AND statut = 'approuve'
  ) sub
  WHERE f.id = target_filiere_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_avis_after_change ON avis;
CREATE TRIGGER trg_avis_after_change
AFTER INSERT OR UPDATE OR DELETE ON avis
FOR EACH ROW EXECUTE FUNCTION fn_update_filiere_rating();

-- ============================================================
-- 7. INDEX — recherche, filtrage, tri
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_ecoles_universite_id      ON ecoles(universite_id);
CREATE INDEX IF NOT EXISTS idx_filieres_ecole_id          ON filieres(ecole_id);

CREATE INDEX IF NOT EXISTS idx_avis_filiere_id            ON avis(filiere_id);
CREATE INDEX IF NOT EXISTS idx_avis_statut                ON avis(statut);
CREATE INDEX IF NOT EXISTS idx_temoignages_filiere_id     ON temoignages(filiere_id);

CREATE INDEX IF NOT EXISTS idx_filieres_note_moyenne      ON filieres(note_moyenne DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_filieres_popularite        ON filieres(popularite_vues DESC);
CREATE INDEX IF NOT EXISTS idx_filieres_difficulte        ON filieres(niveau_difficulte);
CREATE INDEX IF NOT EXISTS idx_filieres_mots_cles         ON filieres USING GIN (mots_cles);

-- Recherche plein texte sur le nom + description de la filière
CREATE INDEX IF NOT EXISTS idx_filieres_recherche_texte
  ON filieres USING GIN (to_tsvector('french', coalesce(nom,'') || ' ' || coalesce(description,'')));

-- ============================================================
-- FIN DU SCHÉMA — voir 02_vue_fiche_complete.sql pour la vue combinée
-- ============================================================


-- ================================================================
-- >>> FICHIER SOURCE : 02_vue_fiche_complete.sql
-- ================================================================

-- ============================================================
-- VUE fiche_complete_filiere
-- Rassemble université + école + filière + statistiques calculées
-- À exécuter APRÈS 01_schema_enrichissement.sql
-- ============================================================

CREATE OR REPLACE VIEW fiche_complete_filiere AS
SELECT
  -- Identifiants
  f.id                          AS filiere_id,
  f.slug                        AS filiere_slug,
  e.id                          AS ecole_id,
  e.slug                        AS ecole_slug,
  u.id                          AS universite_id,
  u.slug                        AS universite_slug,

  -- ---------- FILIÈRE ----------
  f.nom                         AS filiere_nom,
  f.description                 AS filiere_description,
  f.duree_etudes,
  f.niveau_entree,
  f.conditions_admission,
  f.debouches,
  f.cout_annuel_info,
  f.competences_visees,
  f.programme_resume,
  f.objectifs_pedagogiques,
  f.cours_principaux,
  f.cours_optionnels,
  f.projets_typiques,
  f.stage_obligatoire,
  f.stage_duree,
  f.stages_possibles,
  f.entreprises_cibles,
  f.salaire_debutant_min,
  f.salaire_debutant_max,
  f.salaire_5ans_min,
  f.salaire_5ans_max,
  f.poursuite_etudes,
  f.equivalence_internationale,
  f.bourse                      AS places_boursieres,
  f.aide_fpp                    AS places_aide_fpp,
  f.places_payantes,
  f.places_totales,
  f.mode_entree,
  f.bac_recommande,
  f.matieres,
  f.careers,
  f.frais_inscription,
  f.frais_mensuel,
  f.date_candidature_debut,
  f.date_candidature_fin,
  f.date_resultats,
  f.date_rentree,
  f.video_presentation_url,
  f.brochure_pdf_url,
  f.photo_couverture_url        AS filiere_photo_couverture_url,
  f.mots_cles,
  f.popularite_vues,
  f.note_moyenne,
  f.nombre_avis,
  f.niveau_difficulte,
  f.genre_dominant,

  -- ---------- STATISTIQUES CALCULÉES (live, à partir de avis) ----------
  stats.taux_satisfaction,
  stats.repartition_notes,

  -- ---------- ÉCOLE ----------
  e.nom                         AS ecole_nom,
  e.description                 AS ecole_description,
  e.programmes_count            AS ecole_programmes_count,
  e.adresse                     AS ecole_adresse,
  e.ville                       AS ecole_ville,
  e.latitude                    AS ecole_latitude,
  e.longitude                   AS ecole_longitude,
  e.horaires_ouverture          AS ecole_horaires_ouverture,
  e.contact_email               AS ecole_contact_email,
  e.contact_telephone           AS ecole_contact_telephone,
  e.site_web                    AS ecole_site_web,
  e.reseaux_sociaux             AS ecole_reseaux_sociaux,
  e.laboratoires                AS ecole_laboratoires,
  e.bibliotheques               AS ecole_bibliotheques,
  e.salles_informatique         AS ecole_salles_informatique,
  e.amphitheatres               AS ecole_amphitheatres,
  e.associations_etudiantes     AS ecole_associations_etudiantes,
  e.clubs_sportifs              AS ecole_clubs_sportifs,
  e.evenements_annuels          AS ecole_evenements_annuels,
  e.logo_url                    AS ecole_logo_url,
  e.photo_couverture_url        AS ecole_photo_couverture_url,

  -- ---------- UNIVERSITÉ ----------
  u.nom                         AS universite_nom,
  u.description                 AS universite_description,
  u.ville                       AS universite_ville,
  u.site_web                    AS universite_site_web,
  u.annee_creation              AS universite_annee_creation,
  u.statut                      AS universite_statut,
  u.contact_email               AS universite_contact_email,
  u.contact_telephone           AS universite_contact_telephone,
  u.stats_etudiants             AS universite_stats_etudiants,
  u.stats_ecoles                AS universite_stats_ecoles,
  u.stats_campuses              AS universite_stats_campuses,
  u.histoire                    AS universite_histoire,
  u.presentation                AS universite_presentation,
  u.admission_info              AS universite_admission_info,
  u.logo_url                    AS universite_logo_url,
  u.photo_couverture_url        AS universite_photo_couverture_url,
  u.latitude                    AS universite_latitude,
  u.longitude                   AS universite_longitude,
  u.reseaux_sociaux             AS universite_reseaux_sociaux

FROM filieres f
JOIN ecoles e       ON e.id = f.ecole_id
JOIN universites u  ON u.id = e.universite_id
LEFT JOIN LATERAL (
  SELECT
    -- % d'avis approuvés avec note >= 4
    CASE WHEN COUNT(*) FILTER (WHERE statut = 'approuve') = 0 THEN NULL
      ELSE ROUND(
        100.0 * COUNT(*) FILTER (WHERE statut = 'approuve' AND note >= 4)
        / COUNT(*) FILTER (WHERE statut = 'approuve'), 1
      )
    END AS taux_satisfaction,
    -- Répartition des notes 1 à 5, ex: {"1":0,"2":1,"3":4,"4":12,"5":20}
    jsonb_build_object(
      '1', COUNT(*) FILTER (WHERE statut = 'approuve' AND note = 1),
      '2', COUNT(*) FILTER (WHERE statut = 'approuve' AND note = 2),
      '3', COUNT(*) FILTER (WHERE statut = 'approuve' AND note = 3),
      '4', COUNT(*) FILTER (WHERE statut = 'approuve' AND note = 4),
      '5', COUNT(*) FILTER (WHERE statut = 'approuve' AND note = 5)
    ) AS repartition_notes
  FROM avis
  WHERE avis.filiere_id = f.id
) stats ON true;

COMMENT ON VIEW fiche_complete_filiere IS
  'Fiche complète d''une filière : université + école + filière + stats d''avis calculées en direct. Une seule requête pour tout afficher côté frontend.';

-- ============================================================
-- Exemples d'utilisation côté application
-- ============================================================

-- Fiche d'une filière précise (par son slug)
-- SELECT * FROM fiche_complete_filiere WHERE filiere_slug = 'genie-logiciel';

-- Recherche + tri par popularité
-- SELECT filiere_nom, ecole_nom, universite_nom, note_moyenne, popularite_vues
-- FROM fiche_complete_filiere
-- WHERE 'informatique' = ANY(mots_cles)
-- ORDER BY popularite_vues DESC
-- LIMIT 20;

-- Comparateur de filières par débouchés/salaire
-- SELECT filiere_nom, universite_nom, salaire_debutant_min, salaire_debutant_max, note_moyenne
-- FROM fiche_complete_filiere
-- WHERE filiere_id IN ('uuid1', 'uuid2', 'uuid3');


-- ================================================================
-- >>> FICHIER SOURCE : 03_enrichissement_ifri.sql
-- ================================================================

-- ============================================================
-- ENRICHISSEMENT DÉTAILLÉ — Lot 1 : IFRI (UAC)
-- Filières : Génie Logiciel, Internet et Multimédia, IA,
--            Systèmes embarqués et IoT, Sécurité Informatique
-- Contenu spécifique par filière, pas de texte générique.
-- ============================================================

-- ---------- GÉNIE LOGICIEL ----------
UPDATE filieres SET
  objectifs_pedagogiques = 'Former des ingénieurs capables de concevoir, développer et maintenir des applications logicielles robustes, de la spécification des besoins jusqu''au déploiement, en maîtrisant le cycle de vie complet du logiciel (analyse, conception, tests, industrialisation).',
  cours_principaux = '[
    {"nom": "Algorithmique et structures de données", "semestre": 1},
    {"nom": "Programmation orientée objet (Java)", "semestre": 1},
    {"nom": "Bases de données relationnelles (SQL)", "semestre": 2},
    {"nom": "Génie logiciel et cycles de développement (UML, Merise)", "semestre": 3},
    {"nom": "Développement web back-end (PHP/Node.js)", "semestre": 3},
    {"nom": "Architecture logicielle et design patterns", "semestre": 4},
    {"nom": "Bases de données NoSQL (MongoDB)", "semestre": 4},
    {"nom": "Gestion de projet logiciel (méthodes agiles, Scrum)", "semestre": 5},
    {"nom": "Tests logiciels et intégration continue (CI/CD)", "semestre": 5},
    {"nom": "Projet tutoré de fin d''études", "semestre": 6}
  ]'::jsonb,
  cours_optionnels = '[
    {"nom": "Développement mobile (Flutter/React Native)"},
    {"nom": "DevOps et conteneurisation (Docker)"},
    {"nom": "Anglais technique informatique"}
  ]'::jsonb,
  projets_typiques = '[
    "Application web de gestion pour une PME béninoise (facturation, stock)",
    "Système de réservation en ligne (billetterie, hôtellerie)",
    "Plateforme de e-learning avec suivi des apprenants",
    "API REST sécurisée pour une application mobile bancaire"
  ]'::jsonb,
  stage_obligatoire = true,
  stage_duree = '2 à 3 mois en fin de L3, en entreprise ou cabinet informatique',
  entreprises_cibles = '["MTN Bénin", "Moov Africa Bénin", "Ecobank", "Orabank", "SGGG (cabinets de développement locaux)", "GIZ Bénin (projets numériques)", "startups tech de Cotonou (Sèmè City)"]'::jsonb,
  poursuite_etudes = 'Master en Génie Logiciel, Master en Architecture des Systèmes d''Information, ou spécialisation à l''international (France, Maroc, Canada) en développement full-stack ou architecture cloud.',
  equivalence_internationale = 'Reconnue dans l''espace UEMOA/CAMES ; équivalence généralement admise avec une Licence Informatique (mention Génie Logiciel) en France sous réserve d''évaluation des crédits ECTS.',
  niveau_difficulte = 4
WHERE slug = 'genie-logiciel';

-- ---------- INTERNET ET MULTIMÉDIA ----------
UPDATE filieres SET
  objectifs_pedagogiques = 'Former des professionnels capables de concevoir des interfaces web et mobiles, produire du contenu multimédia (audio, vidéo, animation) et gérer des projets numériques créatifs alliant technique et design.',
  cours_principaux = '[
    {"nom": "Algorithmique et programmation web (HTML/CSS/JavaScript)", "semestre": 1},
    {"nom": "Infographie et design d''interfaces (Photoshop, Figma)", "semestre": 2},
    {"nom": "Développement web front-end (frameworks JS)", "semestre": 3},
    {"nom": "Production audiovisuelle et montage numérique", "semestre": 3},
    {"nom": "Bases de données pour le web", "semestre": 4},
    {"nom": "Animation 2D/3D et motion design", "semestre": 4},
    {"nom": "Ergonomie et expérience utilisateur (UX/UI)", "semestre": 5},
    {"nom": "Gestion de projets numériques et community management", "semestre": 5},
    {"nom": "Projet tutoré de fin d''études", "semestre": 6}
  ]'::jsonb,
  cours_optionnels = '[
    {"nom": "Développement d''applications mobiles hybrides"},
    {"nom": "Référencement naturel (SEO) et marketing digital"}
  ]'::jsonb,
  projets_typiques = '[
    "Site vitrine et catalogue en ligne pour une entreprise locale",
    "Web-série ou capsule vidéo promotionnelle montée de A à Z",
    "Application mobile de mise en relation (livraison, services)",
    "Refonte UX/UI d''un site existant avec tests utilisateurs"
  ]'::jsonb,
  stage_obligatoire = true,
  stage_duree = '2 à 3 mois, en agence de communication digitale ou studio multimédia',
  entreprises_cibles = '["agences de communication digitale de Cotonou", "chaînes de télévision et web TV locales", "studios de production audiovisuelle", "ONG et projets de sensibilisation numérique"]'::jsonb,
  poursuite_etudes = 'Master en Multimédia et Communication Digitale, ou spécialisation en motion design / UX design à l''étranger.',
  equivalence_internationale = 'Équivalence CAMES/UEMOA reconnue ; correspond globalement à une Licence Communication et Médias Numériques dans le système LMD français.',
  niveau_difficulte = 3
WHERE slug = 'internet-et-multimedia';

-- ---------- INTELLIGENCE ARTIFICIELLE (IA) ----------
UPDATE filieres SET
  objectifs_pedagogiques = 'Former des spécialistes capables de concevoir des systèmes intelligents (apprentissage automatique, traitement de données massives) et de les appliquer à des problématiques concrètes : santé, agriculture, finance, administration publique.',
  cours_principaux = '[
    {"nom": "Algorithmique avancée et complexité", "semestre": 1},
    {"nom": "Mathématiques pour l''IA (algèbre linéaire, probabilités)", "semestre": 2},
    {"nom": "Programmation Python scientifique (NumPy, Pandas)", "semestre": 2},
    {"nom": "Introduction au Machine Learning", "semestre": 3},
    {"nom": "Bases de données et Big Data", "semestre": 3},
    {"nom": "Deep Learning et réseaux de neurones", "semestre": 4},
    {"nom": "Traitement automatique du langage (NLP)", "semestre": 4},
    {"nom": "Vision par ordinateur", "semestre": 5},
    {"nom": "Éthique et gouvernance des systèmes IA", "semestre": 5},
    {"nom": "Projet tutoré de fin d''études", "semestre": 6}
  ]'::jsonb,
  cours_optionnels = '[
    {"nom": "Data visualisation et tableaux de bord (Power BI)"},
    {"nom": "MLOps et déploiement de modèles"}
  ]'::jsonb,
  projets_typiques = '[
    "Modèle de prédiction des rendements agricoles à partir de données climatiques",
    "Chatbot en langue locale pour l''information administrative",
    "Système de détection de fraude bancaire par apprentissage automatique",
    "Outil de diagnostic d''aide à la décision médicale (imagerie ou symptômes)"
  ]'::jsonb,
  stage_obligatoire = true,
  stage_duree = '2 à 3 mois, en laboratoire de recherche ou entreprise tech',
  entreprises_cibles = '["banques et institutions financières (Ecobank, UBA, BOA)", "opérateurs télécoms (MTN, Moov)", "instituts de recherche (IRD, universités partenaires)", "startups IA de la sous-région"]'::jsonb,
  poursuite_etudes = 'Master en Intelligence Artificielle / Data Science, avec possibilité de thèse de doctorat ; nombreuses passerelles vers des masters en France, au Canada ou au Maroc (ENSIAS, INSA).',
  equivalence_internationale = 'Filière encore récente au Bénin mais alignée sur les standards internationaux (Python, ML, Deep Learning) ; équivalence à évaluer au cas par cas selon les crédits ECTS validés.',
  niveau_difficulte = 5
WHERE slug = 'intelligence-artificielle-ia';

-- ---------- SYSTÈMES EMBARQUÉS ET INTERNET DES OBJETS (SEIoT) ----------
UPDATE filieres SET
  objectifs_pedagogiques = 'Former des ingénieurs capables de concevoir des systèmes électroniques intelligents et connectés (capteurs, microcontrôleurs, objets connectés) pour des applications domotiques, industrielles ou agricoles.',
  cours_principaux = '[
    {"nom": "Électronique numérique et analogique", "semestre": 1},
    {"nom": "Programmation en langage C embarqué", "semestre": 2},
    {"nom": "Microcontrôleurs (Arduino, ESP32)", "semestre": 2},
    {"nom": "Systèmes d''exploitation temps réel", "semestre": 3},
    {"nom": "Réseaux de capteurs et protocoles IoT (MQTT, LoRa)", "semestre": 4},
    {"nom": "Traitement du signal", "semestre": 4},
    {"nom": "Sécurité des objets connectés", "semestre": 5},
    {"nom": "Cloud computing pour l''IoT", "semestre": 5},
    {"nom": "Projet tutoré de fin d''études", "semestre": 6}
  ]'::jsonb,
  cours_optionnels = '[
    {"nom": "Robotique embarquée"},
    {"nom": "Intelligence artificielle embarquée (Edge AI)"}
  ]'::jsonb,
  projets_typiques = '[
    "Système d''irrigation automatisé piloté par capteurs d''humidité",
    "Prototype de compteur électrique intelligent (smart meter)",
    "Système domotique de contrôle à distance (éclairage, sécurité)",
    "Dispositif de suivi de température pour la chaîne du froid (vaccins, produits agricoles)"
  ]'::jsonb,
  stage_obligatoire = true,
  stage_duree = '2 à 3 mois, en entreprise industrielle ou bureau d''études électronique',
  entreprises_cibles = '["SBEE (électricité)", "opérateurs télécoms pour l''IoT industriel", "sociétés d''ingénierie électronique", "projets agri-tech et smart city au Bénin"]'::jsonb,
  poursuite_etudes = 'Master en Systèmes Embarqués et IoT, ou écoles d''ingénieurs en électronique/informatique industrielle à l''étranger.',
  equivalence_internationale = 'Correspond à une Licence Électronique / Informatique Industrielle du système LMD ; équivalences généralement admises dans l''espace CAMES.',
  niveau_difficulte = 4
WHERE slug = 'systemes-embarques-et-internet-des-objets-seiot';

-- ---------- SÉCURITÉ INFORMATIQUE ----------
UPDATE filieres SET
  objectifs_pedagogiques = 'Former des experts capables de sécuriser les systèmes d''information : protection des réseaux, audit de vulnérabilités, réponse aux incidents et mise en conformité des organisations face aux cybermenaces.',
  cours_principaux = '[
    {"nom": "Réseaux informatiques (modèle OSI, TCP/IP)", "semestre": 1},
    {"nom": "Systèmes d''exploitation (Linux/Windows Server)", "semestre": 2},
    {"nom": "Cryptographie appliquée", "semestre": 3},
    {"nom": "Sécurité des réseaux (pare-feux, VPN)", "semestre": 3},
    {"nom": "Administration systèmes et virtualisation", "semestre": 4},
    {"nom": "Audit de sécurité et tests d''intrusion (pentest)", "semestre": 4},
    {"nom": "Droit du numérique et protection des données", "semestre": 5},
    {"nom": "Gestion des risques et continuité d''activité", "semestre": 5},
    {"nom": "Projet tutoré de fin d''études", "semestre": 6}
  ]'::jsonb,
  cours_optionnels = '[
    {"nom": "Sécurité des applications web (OWASP)"},
    {"nom": "Investigation numérique (forensic)"}
  ]'::jsonb,
  projets_typiques = '[
    "Audit de sécurité et test d''intrusion sur une infrastructure simulée",
    "Mise en place d''une politique de sécurité pour une PME",
    "Déploiement d''un système de détection d''intrusion (IDS)",
    "Plan de reprise après sinistre pour un service informatique"
  ]'::jsonb,
  stage_obligatoire = true,
  stage_duree = '2 à 3 mois, en direction informatique d''entreprise ou cabinet de cybersécurité',
  entreprises_cibles = '["banques et institutions financières", "opérateurs télécoms", "administrations publiques (ASIN, ministères)", "cabinets d''audit et de conseil en cybersécurité"]'::jsonb,
  poursuite_etudes = 'Master en Cybersécurité, certifications professionnelles reconnues (CEH, CompTIA Security+), poursuite possible en France ou au Maroc.',
  equivalence_internationale = 'Domaine à forte demande internationale ; correspond à une Licence Sécurité Informatique du système LMD, équivalence CAMES/UEMOA reconnue.',
  niveau_difficulte = 4
WHERE slug = 'securite-informatique';


-- ================================================================
-- >>> FICHIER SOURCE : 04_uac_lot1_irsp_flash-adjarra.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 1 : IRSP, FLASH-Adjarra
-- Format : description ("La filière de X est...") + debouches
-- (fiche par domaines, avec repère "pour qui" et priorisation)
-- ============================================================

-- ---------- SANTÉ PUBLIQUE POLYVALENTE (IRSP) ----------
UPDATE filieres SET
  description = 'La filière de Santé publique polyvalente est une licence proposée par l''IRSP (Institut Régional de Santé Publique), rattaché à l''UAC, qui forme des professionnels capables d''agir sur la santé des populations à l''échelle communautaire plutôt qu''individuelle. Contrairement à une formation médicale classique où l''on soigne un patient à la fois, tu apprends ici à analyser des données épidémiologiques, à concevoir des campagnes de prévention, à organiser la surveillance sanitaire d''une zone, et à coordonner des interventions de terrain (vaccination, hygiène, assainissement). Le programme mêle sciences de la vie, sciences physiques et statistique sanitaire. À la sortie, tu peux devenir agent de santé communautaire, chargé de surveillance épidémiologique, ou intervenir dans la planification et l''évaluation de programmes de santé publique — des métiers essentiels pour un pays qui doit anticiper les épidémies et améliorer l''accès aux soins de base.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux agir sur la santé des gens à grande échelle — prévention, hygiène, organisation — plutôt que de soigner un patient à la fois comme le ferait un médecin ou un infirmier.

Le secteur qui recrute le plus aujourd''hui au Bénin : la surveillance épidémiologique et la santé communautaire, portées par les besoins croissants de prévention (paludisme, choléra, épidémies saisonnières) et de couverture sanitaire universelle.

### Santé communautaire et prévention
Le cœur de métier de cette filière : tu interviens directement dans les villages et quartiers pour organiser des campagnes de sensibilisation, de vaccination ou de dépistage. Tu travailles pour les centres de santé, les mairies, ou des ONG de santé publique.

### Surveillance épidémiologique
Tu surveilles l''apparition et la propagation de maladies sur un territoire donné, tu collectes et analyses des données de terrain, et tu alertes les autorités sanitaires en cas de risque. Un métier stratégique pour les Directions Départementales de la Santé.

### Recherche en santé publique
Pour ceux qui préfèrent l''analyse au terrain : tu peux rejoindre des instituts de recherche (comme l''IRSP lui-même, ou des programmes internationaux) pour produire des données qui orientent les politiques de santé.

### Planification, suivi et évaluation de programmes
Un domaine plus administratif mais très demandé : évaluer l''efficacité de programmes de santé (vaccination, lutte contre le VIH, nutrition) pour des ministères, ONG internationales (OMS, UNICEF, GIZ) ou bailleurs de fonds.

### Hygiène et assainissement du milieu
Un secteur de niche mais essentiel : veiller aux conditions d''hygiène des lieux publics, marchés et écoles, souvent en lien avec les services communaux ou des projets d''assainissement urbain.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers coordinateur de programme de santé, responsable d''une zone sanitaire, ou consultant pour des organisations internationales.

### Poursuivre ses études
Master en Santé Publique, en Épidémiologie, ou spécialisation en gestion de programmes de santé — souvent proposés par l''IRSP lui-même ou des écoles partenaires de la sous-région (EISMV Dakar, universités françaises).'
WHERE slug = 'sante-publique-polyvalente';

-- ---------- GÉOGRAPHIE ET AMÉNAGEMENT DU TERRITOIRE (FLASH-Adjarra) ----------
UPDATE filieres SET
  description = 'La filière de Géographie et Aménagement du Territoire est une licence proposée par FLASH-Adjarra (UAC) qui forme à la lecture et à l''organisation de l''espace : comment une ville s''étend, comment un territoire rural se développe, comment on planifie l''implantation d''infrastructures. Tu y étudies la cartographie, l''analyse des dynamiques urbaines et rurales, les enjeux climatiques et environnementaux liés au territoire, avec une bonne dose de méthode (statistiques, enquêtes de terrain, systèmes d''information géographique). C''est une filière à la croisée des sciences humaines et des sciences de l''environnement : on n''y étudie pas la géographie comme une matière scolaire, mais comme un outil pour comprendre et anticiper l''organisation des villes et des campagnes béninoises. À la sortie, les débouchés vont de l''enseignement à l''aménagement urbain, en passant par la gestion des risques environnementaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes comprendre comment les villes se construisent, comment les territoires évoluent, et que tu veux avoir un impact concret sur l''aménagement de l''espace béninois.

Le secteur qui recrute le plus aujourd''hui : l''enseignement (via les concours de l''éducation nationale), suivi de près par l''aménagement urbain, un domaine en pleine expansion avec l''urbanisation rapide des villes béninoises.

### Enseignement
Le débouché le plus direct et le plus accessible : devenir professeur de géographie dans les collèges et lycées, après une formation complémentaire ou un concours de l''enseignement.

### Aménagement du territoire et urbanisme
Tu participes à la planification de l''extension des villes, à la conception de plans d''occupation des sols, ou à des projets d''aménagement pour des mairies, des cabinets d''urbanisme ou des projets de développement urbain.

### Gestion des risques environnementaux et climatiques
Un domaine en forte croissance : analyse des zones inondables, cartographie des risques d''érosion côtière, appui aux politiques d''adaptation au changement climatique — pour des structures publiques ou des ONG environnementales.

### Recherche et institutions de recherche
Pour ceux qui veulent approfondir : rejoindre des laboratoires de recherche en géographie ou des observatoires du territoire, souvent en lien avec des projets universitaires ou internationaux.

### Assainissement et gestion de l''eau
Un secteur connexe où la formation en géographie est valorisée : appui à la planification de réseaux d''assainissement ou de gestion des ressources en eau au niveau communal.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chef de projet d''aménagement, responsable d''un service technique communal, ou consultant en urbanisme.

### Poursuivre ses études
Master en Géographie, en Aménagement du Territoire, ou en Urbanisme, au Bénin ou dans des écoles spécialisées de la sous-région et d''Europe francophone.'
WHERE slug = 'geographie-et-amenagement-du-territoire';

-- ---------- SOCIO-ANTHROPOLOGIE (FLASH-Adjarra) ----------
UPDATE filieres SET
  description = 'La filière de Socio-Anthropologie est une licence proposée par FLASH-Adjarra (UAC) qui forme à l''étude des sociétés humaines : comment les groupes se structurent, comment les cultures et les traditions se transmettent, comment les comportements collectifs évoluent. Tu y apprends des méthodes d''enquête de terrain (entretiens, observation participante), des outils d''analyse sociale, et tu développes une capacité à comprendre les dynamiques d''une communauté de l''intérieur — que ce soit un village, un quartier urbain ou une organisation. Ce n''est pas une filière abstraite : elle prépare concrètement à intervenir dans des projets de développement, où comprendre les réalités sociales locales est indispensable avant d''agir. À la sortie, les débouchés touchent aussi bien le développement communautaire que le tourisme culturel ou l''enseignement.',
  debouches = 'Pour qui ? Cette filière te convient si tu es curieux des dynamiques humaines et sociales, que tu aimes aller sur le terrain écouter et observer les gens, et que tu veux mettre cette compréhension au service de projets concrets.

Le secteur qui recrute le plus aujourd''hui : le développement communautaire et les ONG, qui ont constamment besoin de personnes capables de comprendre le contexte social avant de lancer un projet.

### Développement communautaire et ONG
Le débouché principal : tu interviens dans des projets de développement (santé, éducation, agriculture) en apportant une expertise sur les réalités sociales et culturelles locales, indispensable pour que les projets soient adaptés et acceptés par les communautés.

### Tourisme et médiation culturelle
Un secteur en croissance au Bénin, porté par la valorisation du patrimoine culturel (vaudou, royaumes historiques, artisanat) : guide culturel, médiateur pour des sites touristiques ou des musées, accompagnement de projets de valorisation patrimoniale.

### Enseignement
Comme pour beaucoup de filières de sciences humaines, l''enseignement en collège et lycée reste une voie accessible, via les concours de l''éducation nationale.

### Recherche en sciences sociales
Pour ceux qui veulent approfondir : intégrer un laboratoire de recherche universitaire ou un institut d''études sociales, souvent en lien avec des projets de recherche internationaux sur les sociétés ouest-africaines.

### Institutions publiques et administration
Un domaine moins visible mais réel : les ministères et collectivités locales recrutent parfois des profils en sciences sociales pour l''élaboration de politiques publiques adaptées au contexte social.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chargé de projet dans une ONG internationale, consultant en anthropologie appliquée, ou responsable d''études sociales pour des bailleurs de fonds.

### Poursuivre ses études
Master en Sociologie, en Anthropologie, ou en Développement communautaire — au Bénin ou dans des universités partenaires en Afrique francophone et en Europe.'
WHERE slug = 'socio-anthropologie';


-- ================================================================
-- >>> FICHIER SOURCE : 05_uac_lot2_imsp_cifred_inmes_igate.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 2 : IMSP, CIFRED, INMeS, IGATE
-- ============================================================

-- ---------- CLASSES PRÉPARATOIRES MPSI/PCSI (IMSP) ----------
UPDATE filieres SET
  description = 'La filière de Classes préparatoires Mathématiques, Physique-Chimie et Sciences de l''Ingénieur (MPSI/PCSI) est un cursus proposé par l''IMSP (Institut de Mathématiques et de Sciences Physiques), rattaché à l''UAC, qui prépare en deux ans intensifs à l''entrée dans les grandes écoles d''ingénieurs. Contrairement à une licence classique, ce n''est pas un diplôme en soi mais un tremplin : tu y approfondis les mathématiques, la physique-chimie et les sciences de l''ingénieur à un niveau très exigeant, avec un rythme de travail proche de celui des classes préparatoires françaises. L''objectif est clair : t''armer pour réussir les concours d''entrée aux écoles d''ingénieurs, béninoises ou internationales, ou pour intégrer directement un master en mathématiques, physique ou informatique. C''est une filière pour les bacheliers scientifiques qui visent haut et qui sont prêts à un travail personnel soutenu.',
  debouches = 'Pour qui ? Ce cursus te convient si tu es un bachelier scientifique solide (série C, D, E ou F), que tu vises une grande école d''ingénieurs, et que tu es prêt à un rythme de travail intense pendant deux ans avant de voir les débouchés concrets.

Contrairement aux autres filières, il n''y a pas de métier direct à la sortie : l''essentiel des étudiants poursuivent immédiatement vers un cycle ingénieur ou un master.

### Entrée dans les grandes écoles d''ingénieurs
Le débouché quasi systématique : à l''issue des deux années, tu intègres un cycle ingénieur de 3 ans, à l''UNSTIM (INSTI, ENSGEP) ou dans des écoles partenaires de la sous-région et d''ailleurs, selon ton classement au concours.

### Master en Mathématiques, Physique ou Informatique
Si tu préfères une voie plus académique que l''ingénierie pure, cette classe prépare aussi solidement à intégrer un master universitaire dans ces disciplines, avec de bonnes bases pour la recherche.

### Poursuites à l''international
Le niveau exigé par cette formation ouvre des portes vers des écoles d''ingénieurs ou des universités à l''étranger (France, Maroc, Canada), notamment via des concours communs ou des équivalences reconnues.

### Ce que tu deviens au final
Les débouchés réels arrivent après le cycle ingénieur ou le master : ingénieur en génie civil, en électromécanique, en informatique, chercheur, enseignant-chercheur — selon la spécialité choisie ensuite.

### Le vrai enjeu de cette filière
Plus que le contenu, c''est la méthode de travail acquise (rigueur, autonomie, capacité à résoudre des problèmes complexes sous contrainte de temps) qui constitue le principal acquis, valorisé quel que soit le domaine choisi par la suite.'
WHERE slug = 'classes-preparatoires-mathematiques-physique-chimie-et-sciences-de-lingenieur-mp';

-- ---------- ENVIRONNEMENT, HYGIÈNE ET SANTÉ PUBLIQUE (CIFRED) ----------
UPDATE filieres SET
  description = 'La filière d''Environnement, Hygiène et Santé publique est une licence proposée par le CIFRED (Centre Inter-Facultaire de Formation et de Recherche en Environnement pour le Développement Durable), rattaché à l''UAC, qui forme à l''intersection de deux domaines souvent traités séparément : la protection de l''environnement et la santé publique. Tu y apprends à évaluer l''impact environnemental d''activités humaines, à concevoir des solutions d''assainissement, et à comprendre le lien entre pollution, hygiène du milieu et santé des populations. Le programme mêle sciences de la vie, sciences physiques et géographie humaine. C''est une filière pertinente pour un pays confronté à des enjeux concrets : gestion des déchets, assainissement des villes, pollution des zones côtières et lagunaires. À la sortie, tu peux intervenir aussi bien dans l''aménagement environnemental que dans la gestion de l''hygiène publique.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler à la croisée de l''environnement et de la santé, avec un fort ancrage terrain — assainissement, gestion des déchets, protection des milieux naturels.

Le secteur qui recrute le plus : l''assainissement urbain et la gestion des risques environnementaux, portés par la croissance rapide des villes béninoises et les projets internationaux de développement durable.

### Assainissement et gestion des déchets
Le débouché le plus direct : tu interviens dans la conception et le suivi de systèmes d''assainissement (eaux usées, déchets solides), pour des mairies, des sociétés d''assainissement ou des projets financés par des bailleurs internationaux.

### Aménagement et sauvegarde environnementale
Tu participes à des projets de reboisement, de restauration de zones dégradées, ou d''études d''impact environnemental avant la construction d''infrastructures — un passage obligé pour de nombreux grands projets aujourd''hui.

### Gestion et restauration de l''environnement
Un domaine plus spécialisé, tourné vers la préservation des écosystèmes (zones humides, littoral), en lien avec des ONG environnementales ou des structures publiques comme le Ministère du Cadre de Vie.

### Laboratoires et institutions de recherche
Pour ceux qui préfèrent l''analyse : rejoindre un laboratoire de recherche environnementale ou de santé publique, souvent en lien avec des projets universitaires internationaux.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chef de projet environnemental, responsable hygiène-sécurité-environnement (HSE) en entreprise, ou consultant en évaluation environnementale.

### Poursuivre ses études
Master en Sciences de l''Environnement, en Santé Publique, ou en Gestion des Risques Environnementaux, au CIFRED lui-même ou dans des universités partenaires.'
WHERE slug = 'environnement-hygiene-et-sante-publique';

-- ---------- SCIENCES INFIRMIÈRES (INMeS) ----------
UPDATE filieres SET
  description = 'La filière de Sciences Infirmières est une licence proposée par l''INMeS (Institut National Médico-Sanitaire), rattaché à l''UAC, qui forme les futurs infirmiers diplômés d''État. Tu y apprends les soins de base et spécialisés, la pharmacologie appliquée, les techniques de prise en charge des patients, ainsi que la gestion des situations d''urgence, avec une large part de stages pratiques en milieu hospitalier dès les premières années. C''est une filière exigeante physiquement et humainement : tu es en contact direct et quotidien avec les malades, souvent dans des conditions de forte charge de travail. L''entrée se fait sur concours, gage de la sélectivité de la formation. À la sortie, le débouché est clair et la demande forte : les hôpitaux et centres de santé du Bénin manquent structurellement de personnel infirmier qualifié.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux être au contact direct des patients, que tu as le sens du soin et de l''écoute, et que tu es prêt à un rythme de travail exigeant (gardes, urgences, contact avec la maladie et la souffrance).

Le secteur qui recrute le plus, sans concurrence : les soins infirmiers en milieu hospitalier, avec une demande qui dépasse largement l''offre de diplômés au Bénin.

### Soins infirmiers en hôpitaux et centres de santé
Le débouché quasi automatique de cette filière : infirmier diplômé d''État dans un hôpital public, une clinique privée, ou un centre de santé communal — la voie la plus directe et la plus demandée.

### Soins spécialisés
Après une première expérience, tu peux te spécialiser dans un service particulier : urgences, bloc opératoire, pédiatrie, ou soins intensifs, avec souvent une formation complémentaire courte.

### Santé communautaire
Certains diplômés s''orientent vers des postes en dehors de l''hôpital : agents infirmiers dans des programmes de santé communautaire, des ONG médicales, ou des campagnes de vaccination.

### Secteur privé et cliniques
La demande croissante de structures de santé privées au Bénin ouvre aussi des postes dans des cliniques, avec parfois de meilleures conditions salariales que dans le public.

### Évoluer dans sa carrière
Avec l''ancienneté, tu peux évoluer vers infirmier major (responsable d''un service), formateur en école d''infirmiers, ou poursuivre vers des fonctions de cadre de santé.

### Poursuivre ses études
Master en Sciences Infirmières, spécialisation en anesthésie-réanimation ou en santé publique, notamment via des passerelles avec des écoles de la sous-région.'
WHERE slug = 'sciences-infirmieres';

-- ---------- SCIENCES OBSTÉTRICALES (INMeS) ----------
UPDATE filieres SET
  description = 'La filière de Sciences Obstétricales est une licence proposée par l''INMeS (Institut National Médico-Sanitaire), rattaché à l''UAC, qui forme les futures sages-femmes diplômées d''État. Tu y apprends le suivi de grossesse, l''accompagnement de l''accouchement, les soins postnataux à la mère et au nouveau-né, ainsi que la détection précoce des complications obstétricales. Comme pour les Sciences Infirmières, l''entrée se fait sur concours et le cursus comprend une forte proportion de stages pratiques en maternité. C''est une filière à très forte responsabilité : la mortalité maternelle et infantile reste un enjeu majeur de santé publique au Bénin, ce qui rend ce métier particulièrement stratégique. À la sortie, la demande est structurellement forte dans les maternités publiques et privées du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux accompagner les femmes à un moment clé de leur vie (grossesse, accouchement), que tu as un sens aigu des responsabilités, et que tu es prête à un métier d''urgence où chaque décision compte.

Le secteur qui recrute le plus, sans équivalent : les soins obstétricaux en maternité, un besoin critique et constant dans le système de santé béninois.

### Sage-femme en maternité (public ou privé)
Le débouché quasi systématique : poste de sage-femme diplômée d''État dans une maternité d''hôpital public, une clinique privée, ou un centre de santé communal — la voie la plus directe et la plus urgente en termes de besoins.

### Santé maternelle et infantile en zone rurale
Un secteur prioritaire pour l''État et les ONG internationales, où les sages-femmes jouent un rôle central dans la réduction de la mortalité maternelle, notamment via des programmes de santé communautaire.

### Planification familiale
Certaines sages-femmes se spécialisent dans le conseil et l''accompagnement en matière de contraception et de planification familiale, en lien avec des structures publiques ou des ONG comme l''ABPF.

### Formation et supervision
Avec l''expérience, tu peux devenir formatrice de futures sages-femmes dans les écoles de santé, ou superviseure de maternité.

### Évoluer dans sa carrière
Vers des postes de sage-femme major, responsable d''une unité de maternité, ou coordinatrice de programmes de santé maternelle pour des organisations internationales.

### Poursuivre ses études
Master en Sciences Obstétricales ou en Santé de la Reproduction, souvent en lien avec des écoles partenaires de la sous-région ouest-africaine.'
WHERE slug = 'sciences-obstetricales';

-- ---------- GESTION DU CADRE DE VIE (IGATE) ----------
UPDATE filieres SET
  description = 'La filière de Gestion du cadre de vie est une licence proposée par IGATE (Institut du Cadre de Vie), rattaché à l''UAC, qui forme à la gestion des espaces de vie collectifs : propreté urbaine, organisation des espaces publics, qualité environnementale des quartiers. Tu y apprends des bases en économie, en droit de l''environnement, et en gestion de projets liés au cadre de vie, avec une approche pratique orientée vers les collectivités locales. C''est une filière moins connue que l''urbanisme classique, mais tout aussi concrète : elle prépare à des métiers qui touchent directement la qualité de vie quotidienne dans les villes et communes du Bénin, un enjeu croissant avec l''urbanisation rapide du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la vie quotidienne des villes et des quartiers — propreté, organisation, qualité de vie — et que tu veux travailler concrètement pour les collectivités locales.

Le secteur qui recrute le plus : les services techniques des mairies et communes, en pleine structuration avec la décentralisation au Bénin.

### Gestion du cadre de vie en mairie et commune
Le débouché principal : intégrer un service technique communal chargé de la propreté urbaine, de l''entretien des espaces publics ou de la gestion des nuisances environnementales.

### Cadre de vie et environnement en entreprise
Certaines grandes entreprises ou zones industrielles recrutent des profils formés à la gestion environnementale de leurs sites et de leur cadre de travail.

### Projets de développement urbain
Tu peux intervenir dans des projets financés par des bailleurs internationaux (Banque Mondiale, AFD) visant à améliorer les conditions de vie dans les quartiers défavorisés ou les villes secondaires.

### Sensibilisation et éducation environnementale
Un métier de niche mais utile : animer des campagnes de sensibilisation sur la propreté et l''environnement auprès des populations, pour des ONG ou des collectivités.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable des services techniques d''une mairie, chef de projet cadre de vie, ou consultant en gestion environnementale urbaine.

### Poursuivre ses études
Master en Gestion de l''Environnement, en Urbanisme, ou en Politiques Publiques Locales.'
WHERE slug = 'gestion-du-cadre-de-vie';

-- ---------- GESTION DES CHANGEMENTS CLIMATIQUES ET DES ÉCOSYSTÈMES (IGATE) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des changements climatiques et des écosystèmes est une licence proposée par IGATE (Institut du Cadre de Vie), rattaché à l''UAC, qui forme à un enjeu devenu incontournable : comprendre et gérer les impacts du changement climatique sur les territoires et les écosystèmes. Tu y étudies les dynamiques climatiques, la gestion des ressources naturelles, et les stratégies d''adaptation (agriculture résiliente, gestion de l''eau, protection des zones côtières menacées par l''érosion). C''est une filière scientifique tournée vers l''action : elle prépare à intervenir concrètement dans des projets d''adaptation climatique, un secteur en forte croissance au Bénin comme dans toute l''Afrique de l''Ouest, particulièrement exposée aux effets du changement climatique.',
  debouches = 'Pour qui ? Cette filière te convient si les enjeux climatiques et environnementaux te préoccupent, que tu veux travailler sur des solutions concrètes (adaptation, gestion des ressources), et que tu es à l''aise avec une approche scientifique du territoire.

Le secteur qui recrute le plus aujourd''hui : les projets d''adaptation au changement climatique financés par des bailleurs internationaux, en forte expansion au Bénin.

### Adaptation au changement climatique
Le cœur de métier : conception et suivi de projets d''adaptation (résilience agricole, gestion de l''eau, protection côtière), souvent pour des ONG internationales, des agences des Nations Unies, ou des ministères.

### Aménagement et gestion des ressources naturelles
Tu interviens dans la gestion durable des forêts, des zones humides ou des sols, en lien avec des structures publiques comme le Ministère du Cadre de Vie et du Développement Durable.

### Recherche sur le climat et les écosystèmes
Pour ceux qui veulent approfondir : rejoindre des laboratoires de recherche universitaire ou des observatoires climatiques régionaux.

### Bureaux d''études environnementales
Un secteur privé en croissance : réalisation d''études d''impact climatique pour des projets d''infrastructures, exigées de plus en plus par les bailleurs de fonds.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chargé de programme climat pour une organisation internationale, expert en résilience climatique, ou consultant indépendant.

### Poursuivre ses études
Master en Sciences du Climat, en Gestion des Ressources Naturelles, ou en Développement Durable, au Bénin ou dans des universités partenaires africaines et européennes.'
WHERE slug = 'gestion-des-changements-climatiques-et-des-ecosystemes';

-- ---------- GÉOMATIQUE ET ENVIRONNEMENT (IGATE) ----------
UPDATE filieres SET
  description = 'La filière de Géomatique et Environnement est une licence proposée par IGATE (Institut du Cadre de Vie), rattaché à l''UAC, qui forme à l''utilisation des outils numériques de cartographie et d''analyse spatiale (SIG, télédétection, GPS) appliqués aux questions environnementales. Tu y apprends à produire des cartes précises, à analyser des images satellites, et à modéliser des phénomènes territoriaux (déforestation, urbanisation, érosion) à partir de données géographiques. C''est une filière technique et numérique, à la croisée de la géographie et de l''informatique appliquée, qui répond à un besoin croissant : la plupart des grands projets d''aménagement ou de gestion environnementale nécessitent aujourd''hui des données géospatiales fiables.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes autant la technique numérique que les questions de territoire et d''environnement, et que tu veux devenir la personne qui produit les cartes et données sur lesquelles se basent les décisions d''aménagement.

Le secteur qui recrute le plus : les bureaux d''études et projets d''aménagement, qui ont systématiquement besoin de spécialistes en systèmes d''information géographique (SIG).

### Spécialiste en géomatique / SIG
Le débouché principal : produire et analyser des données cartographiques pour des bureaux d''études, des projets d''aménagement, ou des administrations publiques (cadastre, urbanisme).

### Cartographie environnementale et suivi des ressources
Tu peux intervenir dans le suivi de la déforestation, de l''évolution du littoral, ou de l''occupation des sols, pour des ONG environnementales ou des instituts de recherche.

### Projets d''infrastructures et de développement
Les grands projets (routes, barrages, zones industrielles) nécessitent des études géospatiales préalables — un travail confié de plus en plus à des spécialistes en géomatique.

### Administrations publiques et cadastre
Les services de l''État en charge du foncier et de l''urbanisme recrutent des techniciens en géomatique pour moderniser leurs bases de données territoriales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable SIG d''une structure, chef de projet cartographie, ou consultant indépendant en géomatique.

### Poursuivre ses études
Master en Géomatique, en Télédétection, ou en Systèmes d''Information Géographique, au Bénin ou à l''international.'
WHERE slug = 'geomatique-et-environnement';

-- ---------- PLANIFICATION ET GESTION DES ESPACES URBAINS ET RURAUX (IGATE) ----------
UPDATE filieres SET
  description = 'La filière de Planification et Gestion des espaces urbains et ruraux est une licence proposée par IGATE (Institut du Cadre de Vie), rattaché à l''UAC, qui forme à la planification territoriale à l''échelle des villes comme des campagnes. Tu y apprends à élaborer des plans d''aménagement, à gérer les projets de développement local, et à concilier les besoins des populations urbaines et rurales avec les contraintes économiques et environnementales. C''est une filière de gestion appliquée au territoire : elle mêle économie, droit et méthodes de planification, avec pour objectif de former des cadres capables de piloter des projets d''aménagement à l''échelle communale ou régionale — un profil recherché dans un Bénin en pleine transformation urbaine.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux piloter des projets concrets d''aménagement du territoire, que tu es à l''aise avec la gestion et l''économie, et que tu vises des postes à responsabilité dans les collectivités locales.

Le secteur qui recrute le plus : les collectivités territoriales (mairies, préfectures), avec la montée en puissance de la décentralisation au Bénin.

### Planification urbaine et rurale en collectivité
Le débouché principal : intégrer un service de planification d''une mairie ou d''une intercommunalité, chargé de l''élaboration des plans de développement communal.

### Gestion de projets de développement local
Tu peux piloter des projets financés par l''État ou des bailleurs internationaux (infrastructures, équipements publics), souvent en tant que chargé de projet ou coordinateur.

### Spécialiste en planification et gestion des espaces urbains
Un poste plus technique, orienté vers l''analyse et la conception des documents de planification (plans d''occupation des sols, schémas d''aménagement).

### Bureaux d''études en aménagement
Le secteur privé recrute aussi des diplômés de cette filière pour accompagner des projets d''aménagement pour le compte de clients publics ou privés.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur des services techniques d''une mairie, chef de projet d''aménagement régional, ou consultant en planification territoriale.

### Poursuivre ses études
Master en Urbanisme, en Aménagement du Territoire, ou en Gestion des Collectivités Locales, au Bénin ou dans des écoles spécialisées à l''international.'
WHERE slug = 'planification-et-gestion-des-espaces-urbains-et-ruraux';


-- ================================================================
-- >>> FICHIER SOURCE : 06_uac_lot3_fllac_inmaac.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 3 : FLLAC, INMAAC
-- ============================================================

-- ---------- ALLEMAND (FLLAC) ----------
UPDATE filieres SET
  description = 'La filière d''Allemand est une licence proposée par FLLAC (Faculté des Lettres, Arts, Langues et Communications), rattachée à l''UAC, qui forme à la maîtrise approfondie de la langue et de la culture allemandes. Tu y étudies la grammaire et l''expression avancées, la littérature et la civilisation des pays germanophones, ainsi que des techniques de traduction et d''interprétation. C''est une filière de spécialisation linguistique poussée, différente d''un simple apprentissage de langue : l''objectif est de devenir capable de travailler professionnellement en allemand, à l''oral comme à l''écrit. Le Bénin entretient des liens économiques et de coopération croissants avec l''Allemagne (via la GIZ notamment), ce qui ouvre des débouchés concrets à cette filière encore peu fréquentée mais valorisée par sa rareté.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une vraie appétence pour l''allemand et que tu veux en faire un outil professionnel — traduction, enseignement, coopération internationale — plutôt qu''une simple compétence secondaire.

Le secteur qui recrute le plus : la coopération internationale germano-béninoise, portée notamment par la présence active de la GIZ et d''autres structures allemandes au Bénin.

### Coopération internationale et organisations allemandes
Le débouché le plus recherché : travailler comme interprète, traducteur ou assistant de projet pour des structures allemandes présentes au Bénin (GIZ, ambassade d''Allemagne, fondations politiques allemandes).

### Enseignement
Devenir professeur d''allemand dans les collèges et lycées qui proposent cette langue — un débouché stable, bien que le nombre d''établissements concernés reste limité.

### Traduction et interprétariat
Traducteur indépendant ou salarié pour des documents techniques, juridiques ou commerciaux entre le français et l''allemand, notamment pour des entreprises ayant des partenaires allemands.

### Tourisme et accueil
Un secteur de niche mais réel : accompagnement de visiteurs germanophones, guide touristique spécialisé, ou poste dans l''hôtellerie internationale.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chargé de projet dans une organisation de coopération, traducteur assermenté, ou responsable pédagogique en langue allemande.

### Poursuivre ses études
Master en Langues Étrangères Appliquées, en Traduction, ou séjour d''étude en Allemagne via des bourses DAAD, très accessibles aux étudiants germanistes.'
WHERE slug = 'allemand';

-- ---------- ANGLAIS (FLLAC) ----------
UPDATE filieres SET
  description = 'La filière d''Anglais est une licence proposée par FLLAC (Faculté des Lettres, Arts, Langues et Communications), rattachée à l''UAC, qui forme à la maîtrise avancée de la langue anglaise et à la connaissance des cultures anglophones. Tu y approfondis la grammaire, l''expression écrite et orale, la littérature et la civilisation des pays anglophones, avec des modules de traduction et de communication interculturelle. Contrairement à ce qu''on pourrait croire, ce n''est pas une filière "facile" parce que l''anglais est enseigné dès le collège : le niveau exigé est celui d''une véritable expertise linguistique et culturelle, utilisable professionnellement. C''est l''une des filières de langues les plus demandées, portée par l''anglais comme langue des affaires internationales et par la proximité du Bénin avec le Nigeria anglophone.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux faire de l''anglais un vrai métier — enseignement, traduction, tourisme, business international — et non simplement une compétence annexe.

Le secteur qui recrute le plus : l''enseignement, largement en tête compte tenu du nombre d''élèves apprenant l''anglais dans le système scolaire béninois.

### Enseignement
Le débouché le plus direct et le plus accessible : professeur d''anglais dans les collèges et lycées, un poste avec une forte demande structurelle au Bénin.

### Traduction et interprétariat
Traducteur ou interprète pour des entreprises, des institutions internationales, ou des événements (conférences, séminaires) impliquant des partenaires anglophones.

### Tourisme et hôtellerie internationale
L''anglais étant la langue du tourisme international, ce secteur recrute activement des guides, agents d''accueil et personnels d''hôtellerie maîtrisant parfaitement la langue.

### Édition et correction
Devenir traducteur-correcteur pour des maisons d''édition, des ONG internationales, ou des médias qui publient en français et en anglais.

### Commerce et échanges avec le Nigeria
Un débouché spécifique au contexte béninois : les échanges commerciaux avec le Nigeria voisin (premier partenaire économique informel du Bénin) valorisent fortement la maîtrise de l''anglais.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique, traducteur assermenté, ou chargé de communication internationale dans une organisation.

### Poursuivre ses études
Master en Langues Étrangères Appliquées, en Traduction, ou en Communication Interculturelle, au Bénin ou dans des pays anglophones.'
WHERE slug = 'anglais';

-- ---------- ESPAGNOL (FLLAC) ----------
UPDATE filieres SET
  description = 'La filière d''Espagnol est une licence proposée par FLLAC (Faculté des Lettres, Arts, Langues et Communications), rattachée à l''UAC, qui forme à la maîtrise avancée de la langue espagnole et à la connaissance des cultures hispanophones. Tu y étudies la grammaire et l''expression approfondies, la littérature et la civilisation d''Espagne et d''Amérique latine, ainsi que des techniques de traduction. C''est une filière de spécialisation linguistique moins fréquentée que l''anglais, ce qui en fait une compétence plus rare et donc valorisée sur le marché de l''emploi, notamment dans l''enseignement et la traduction. L''espagnol étant la langue de plus de 20 pays, cette filière ouvre aussi des perspectives vers des relations internationales avec l''Amérique latine et l''Espagne.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans une langue moins courante mais très parlée dans le monde, avec des débouchés stables dans l''enseignement et la traduction.

Le secteur qui recrute le plus : l''enseignement, dans les collèges et lycées qui proposent l''espagnol comme deuxième ou troisième langue.

### Enseignement
Le débouché principal : professeur d''espagnol dans le secondaire, un poste stable compte tenu de la présence de l''espagnol dans le programme scolaire béninois.

### Traduction et interprétariat
Traducteur pour des documents ou événements impliquant des partenaires hispanophones (Espagne, Amérique latine), un créneau moins saturé que la traduction anglais-français.

### Tourisme
Guide ou agent d''accueil spécialisé pour des visiteurs hispanophones, un marché de niche mais réel dans le secteur touristique béninois.

### Relations internationales et coopération
Des postes ponctuels existent dans des ambassades hispanophones ou des projets de coopération avec l''Espagne et l''Amérique latine.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique en langue espagnole, traducteur spécialisé, ou chargé de mission dans une structure de coopération hispano-béninoise.

### Poursuivre ses études
Master en Langues Étrangères Appliquées, en Traduction, ou séjour d''études en Espagne ou en Amérique latine via des programmes d''échange.'
WHERE slug = 'espagnol';

-- ---------- LETTRES MODERNES (FLLAC) ----------
UPDATE filieres SET
  description = 'La filière de Lettres Modernes est une licence proposée par FLLAC (Faculté des Lettres, Arts, Langues et Communications), rattachée à l''UAC, qui forme à la maîtrise approfondie de la langue française et des littératures francophones et africaines. Tu y étudies l''analyse littéraire, la linguistique, la rédaction avancée, et les langues africaines dans une perspective de valorisation culturelle. Contrairement à une idée reçue, ce n''est pas une filière tournée uniquement vers l''enseignement du français classique : elle prépare aussi à des métiers de la rédaction, de l''édition et de la médiation culturelle bi-plurilingue, dans un pays où le français côtoie de nombreuses langues nationales.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une vraie passion pour la langue française et les littératures, que tu écris bien, et que tu veux en faire un métier — enseignement, rédaction, édition.

Le secteur qui recrute le plus : l''enseignement du français, socle du système scolaire béninois.

### Enseignement
Le débouché le plus direct : professeur de français dans les collèges et lycées, un poste avec une demande constante et structurelle.

### Rédaction et édition
Rédacteur pour des maisons d''édition, des journaux, ou des structures de communication, notamment dans la production de contenus en français et en langues nationales.

### Éducation bi-plurilingue et interculturelle
Un débouché spécifique et porteur : concevoir des supports pédagogiques ou des programmes qui articulent français et langues béninoises, pour des ONG éducatives ou le Ministère de l''Éducation.

### Correction et relecture
Correcteur professionnel pour des maisons d''édition, des administrations, ou des entreprises ayant besoin de documents en français irréprochable.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable éditorial, formateur en pédagogie du français, ou chargé de programme en éducation bilingue.

### Poursuivre ses études
Master en Lettres Modernes, en Sciences du Langage, ou en Édition, au Bénin ou dans des universités francophones.'
WHERE slug = 'lettres-modernes';

-- ---------- SCIENCES DU LANGAGE ET DE LA COMMUNICATION (FLLAC) ----------
UPDATE filieres SET
  description = 'La filière de Sciences du Langage et de la Communication est une licence proposée par FLLAC (Faculté des Lettres, Arts, Langues et Communications), rattachée à l''UAC, qui forme à l''analyse du langage et à la conception de stratégies de communication. Tu y étudies la linguistique, la sociolinguistique (comment les langues cohabitent dans une société multilingue comme le Bénin), et des outils pratiques de communication (rédaction, animation, gestion d''événements culturels). C''est une filière hybride entre les sciences du langage pures et la communication appliquée, qui prépare à des métiers créatifs et organisationnels dans le secteur culturel et de la communication.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la manière dont les gens communiquent et échangent, et que tu veux évoluer dans des métiers créatifs liés à l''organisation d''événements ou à la production culturelle.

Le secteur qui recrute le plus : la production et diffusion culturelle et événementielle, un domaine dynamique porté par la scène artistique béninoise.

### Production et diffusion culturelle
Le débouché principal : organisation et gestion de projets culturels (concerts, festivals, expositions) pour des structures publiques ou privées du secteur culturel.

### Management d''artistes et diffusion
Devenir manager d''artistes, agent programmateur, ou chargé de diffusion pour des maisons de production musicale ou artistique.

### Communication d''entreprise
Chargé de communication interne ou externe pour des entreprises ou des institutions, en mobilisant les compétences en analyse du discours et en stratégie de communication.

### Recherche en linguistique
Pour ceux qui préfèrent l''aspect théorique : poursuivre en recherche sur le multilinguisme béninois, un domaine d''étude riche compte tenu de la diversité linguistique du pays.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur artistique, responsable de la communication d''une institution culturelle, ou consultant en stratégie de communication.

### Poursuivre ses études
Master en Sciences du Langage, en Communication, ou en Management Culturel, au Bénin ou à l''international.'
WHERE slug = 'sciences-du-langage-et-de-la-communication';

-- ---------- ADMINISTRATION CULTURELLE (INMAAC) ----------
UPDATE filieres SET
  description = 'La filière d''Administration Culturelle est une licence proposée par l''INMAAC (Institut National des Métiers d''Arts, d''Archéologie et de la Culture), rattaché à l''UAC, qui forme à la gestion administrative et juridique des institutions et projets culturels. Tu y étudies le droit appliqué au secteur culturel, la gestion administrative, et l''organisation d''événements et de structures artistiques (musées, centres culturels, compagnies). C''est une filière de gestion appliquée à la culture, différente d''une formation purement artistique : elle prépare à être la personne qui structure, finance et organise les projets, plutôt que celle qui crée directement l''œuvre. Un profil essentiel pour un secteur culturel béninois riche mais qui manque souvent de professionnels de la gestion.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes le secteur culturel et artistique sans forcément vouloir créer toi-même, et que tu préfères organiser, gérer et faire fonctionner des structures culturelles.

Le secteur qui recrute le plus : les institutions culturelles publiques et privées (musées, centres culturels, festivals), en développement au Bénin avec la valorisation croissante du patrimoine.

### Gérance et régie de structures culturelles
Le débouché principal : gérant ou régisseur d''un centre culturel, d''un musée, ou d''une salle de spectacle, en charge du fonctionnement administratif et logistique.

### Production audiovisuelle et culturelle (doublage, vox off)
Un débouché plus créatif : intervenir dans la production de contenus audiovisuels culturels, notamment en doublage ou voix off pour des projets locaux.

### Institutions publiques de la culture
Postes dans les structures étatiques en charge du patrimoine culturel (ministères, directions départementales de la culture), pour la gestion de projets et de budgets culturels.

### Événementiel culturel
Organisation de festivals, expositions ou événements artistiques pour des structures privées ou des collectivités locales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur d''une institution culturelle, chargé de mission au Ministère de la Culture, ou consultant en ingénierie culturelle.

### Poursuivre ses études
Master en Management des Institutions Culturelles, en Droit de la Culture, ou en Gestion de Projets Artistiques.'
WHERE slug = 'administration-culturelle';

-- ---------- ARTS DRAMATIQUES (INMAAC) ----------
UPDATE filieres SET
  description = 'La filière d''Arts dramatiques est une licence proposée par l''INMAAC (Institut National des Métiers d''Arts, d''Archéologie et de la Culture), rattaché à l''UAC, qui forme aux métiers de la scène : jeu d''acteur, mise en scène, écriture dramatique. Tu y pratiques le théâtre concrètement (interprétation, expression corporelle et vocale) tout en étudiant l''histoire et la théorie du spectacle vivant. C''est une filière artistique exigeante, où la pratique occupe une place centrale dès la première année, avec des mises en scène et représentations publiques qui rythment le cursus. Elle prépare à une diversité de métiers de la scène, du jeu d''acteur pur à la régie technique en passant par la gestion de compagnies théâtrales.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une véritable passion pour la scène et le jeu théâtral, que tu es prêt à un parcours artistique exigeant, et que tu acceptes que les débouchés directs demandent souvent de la persévérance et de la polyvalence.

Le secteur qui recrute le plus : le milieu associatif et culturel local (compagnies, centres culturels), plus que des postes salariés stables — beaucoup de diplômés combinent plusieurs activités.

### Comédien et régie de spectacle
Le cœur de métier : jouer sur scène pour des compagnies théâtrales, ou assurer la régie technique de spectacles (son, lumière, plateau).

### Gérance de structures culturelles
Comme pour d''autres filières de l''INMAAC, tu peux évoluer vers la gestion administrative de structures artistiques (compagnies, centres culturels).

### Doublage et voix off
Un débouché connexe qui valorise le travail vocal appris en art dramatique : doublage de films, publicités, ou contenus audiovisuels.

### Enseignement artistique
Animateur d''ateliers théâtre pour des écoles, des centres culturels ou des associations, un débouché accessible et complémentaire aux activités de jeu.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers metteur en scène, directeur artistique d''une compagnie, ou fondateur de ta propre structure théâtrale.

### Poursuivre ses études
Master en Arts du Spectacle, formations spécialisées en mise en scène ou en écriture dramatique, au Bénin ou dans des écoles de théâtre à l''international.'
WHERE slug = 'arts-dramatiques';

-- ---------- ARTS PLASTIQUES (INMAAC) ----------
UPDATE filieres SET
  description = 'La filière d''Arts Plastiques est une licence proposée par l''INMAAC (Institut National des Métiers d''Arts, d''Archéologie et de la Culture), rattaché à l''UAC, qui forme aux métiers de la création visuelle : dessin, peinture, sculpture, design. Tu y développes une pratique artistique personnelle tout en acquérant des bases techniques solides (histoire de l''art, techniques picturales, arts appliqués) et une culture visuelle large. C''est une filière qui accueille des profils variés, du bac littéraire au bac technique en arts appliqués, ce qui en fait l''une des plus accessibles en termes de séries de bac. Elle prépare aussi bien à une pratique artistique indépendante qu''à des métiers plus appliqués comme le design ou l''illustration.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une pratique artistique (dessin, peinture, sculpture) et que tu veux en faire un métier, que ce soit en tant qu''artiste indépendant ou dans des métiers plus appliqués comme le design.

Le secteur qui recrute le plus : le design et l''illustration, plus stables financièrement que la pratique artistique pure, notamment pour l''industrie publicitaire et éditoriale.

### Dessinateur, illustrateur, designer
Le débouché le plus applicable directement : travailler comme illustrateur pour l''édition, designer graphique pour des agences de communication, ou concepteur visuel pour des marques.

### Artiste plasticien indépendant
La voie classique mais plus incertaine financièrement : peintre, sculpteur exposant en galerie, avec un revenu qui dépend fortement de la notoriété et du réseau construit au fil du temps.

### Maquettiste et production visuelle
Un débouché technique et recherché : maquettiste pour des maisons d''édition, des agences de publicité, ou des studios de design.

### Critique d''art et médiation
Pour ceux qui préfèrent l''analyse à la pratique : critique d''art pour des médias culturels, ou médiateur dans des galeries et musées.

### Évoluer dans sa carrière
Avec l''expérience et un réseau construit, tu peux évoluer vers directeur artistique, galeriste, ou artiste reconnu internationalement.

### Poursuivre ses études
Master en Arts Plastiques, en Design, ou spécialisation dans une école d''art à l''étranger (souvent un passage obligé pour une reconnaissance internationale).'
WHERE slug = 'arts-plastiques';

-- ---------- MUSIQUE ET MUSICOLOGIE (INMAAC) ----------
UPDATE filieres SET
  description = 'La filière de Musique et Musicologie est une licence proposée par l''INMAAC (Institut National des Métiers d''Arts, d''Archéologie et de la Culture), rattaché à l''UAC, qui forme aux métiers de la musique : pratique instrumentale et vocale, composition, mais aussi théorie et histoire de la musique. Tu y développes une pratique musicale personnelle (chant, instrument) tout en étudiant l''harmonie, la théorie musicale et l''histoire des musiques africaines et occidentales. C''est une filière qui valorise à la fois le talent artistique et la culture musicale théorique, avec un accès ouvert aux bacheliers de nombreuses séries, y compris technique (DT/Musique, DT/MAO), ce qui en fait une porte d''entrée accessible pour des profils passionnés de musique.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une pratique musicale (chant, instrument, composition) et que tu veux structurer ce talent avec une vraie formation théorique et technique.

Le secteur qui recrute le plus : la production musicale et le spectacle vivant, portés par une scène musicale béninoise particulièrement dynamique.

### Chanteur, musicien, compositeur
Le débouché le plus direct pour les profils artistiques : carrière d''interprète ou de créateur musical, seul ou en groupe, en s''appuyant sur la scène musicale locale et la diffusion numérique.

### Chef de chœur et direction musicale
Pour ceux qui aiment diriger et coordonner : postes dans des chorales, des orchestres, ou des institutions religieuses et culturelles.

### Composition de musique et paroles
Créer pour d''autres artistes : compositeur ou parolier travaillant pour des interprètes, des productions audiovisuelles, ou de la publicité.

### Enseignement musical
Professeur de musique dans des écoles, conservatoires, ou centres culturels — un débouché stable qui complète souvent une activité de musicien.

### Évoluer dans sa carrière
Avec l''expérience et un réseau construit, tu peux évoluer vers directeur artistique, producteur musical, ou fondateur d''un label ou d''une structure de formation musicale.

### Poursuivre ses études
Master en Musicologie, spécialisation en composition ou en direction musicale, au Bénin ou dans des conservatoires internationaux.'
WHERE slug = 'musique-et-musicologie';

-- ---------- CINÉMA ET AUDIOVISUEL (INMAAC) ----------
UPDATE filieres SET
  description = 'La filière de Cinéma et Audiovisuel est une licence proposée par l''INMAAC (Institut National des Métiers d''Arts, d''Archéologie et de la Culture), rattaché à l''UAC, qui forme aux métiers de la création cinématographique et audiovisuelle : écriture de scénario, réalisation, montage, production. Tu y apprends les techniques de narration visuelle, la mise en scène, le montage image et son, ainsi que les bases de la gestion de production audiovisuelle. C''est une filière en plein essor, portée par la croissance de l''industrie audiovisuelle africaine (Nollywood au Nigeria voisin, essor du cinéma béninois) et par la demande croissante de contenus vidéo pour les plateformes numériques et les réseaux sociaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes raconter des histoires en images, que tu es curieux des techniques de tournage et de montage, et que tu veux évoluer dans un secteur en pleine croissance porté par le numérique.

Le secteur qui recrute le plus aujourd''hui : la production de contenus vidéo pour les plateformes numériques et les réseaux sociaux, en plus du cinéma et de la télévision classiques.

### Scénariste et storyboarder
Le point de départ de nombreux projets audiovisuels : écrire des histoires et les structurer visuellement avant le tournage, pour des films, séries ou publicités.

### Réalisation et régie de tournage
Réalisateur ou régisseur sur des tournages de films, de clips musicaux, ou de contenus publicitaires, un secteur dynamisé par la scène créative béninoise et ouest-africaine.

### Montage image et post-production
Monteur pour des studios de production, des chaînes de télévision, ou en indépendant pour des créateurs de contenus numériques.

### Création, gestion et diffusion de contenus
Un débouché en pleine expansion : gérer la production et la diffusion de contenus vidéo pour des marques, des influenceurs, ou des médias digitaux.

### Évoluer dans sa carrière
Avec l''expérience et un réseau construit, tu peux évoluer vers réalisateur reconnu, producteur indépendant, ou fondateur d''un studio de production audiovisuelle.

### Poursuivre ses études
Master en Cinéma et Audiovisuel, spécialisation en réalisation ou en production, au Bénin ou dans des écoles de cinéma reconnues (Afrique, France, Canada).'
WHERE slug = 'cinema-et-audiovisuel';


-- ================================================================
-- >>> FICHIER SOURCE : 07_uac_lot4_eneam.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 4 : ENEAM (15 filières)
-- ============================================================

-- ---------- ADMINISTRATION DES RÉSEAUX INFORMATIQUES ----------
UPDATE filieres SET
  description = 'La filière d''Administration des Réseaux Informatiques est une licence proposée par l''ENEAM (École Nationale d''Économie Appliquée et de Management), rattachée à l''UAC, qui forme à l''installation, la configuration et la maintenance des réseaux et infrastructures informatiques d''entreprise. Tu y apprends l''architecture réseau, les systèmes d''exploitation serveurs, la sécurité informatique de base, et le dépannage matériel et logiciel. Contrairement à une filière de développement logiciel, ici l''accent est mis sur le fonctionnement et la fiabilité des infrastructures qui font tourner les systèmes d''information des entreprises. C''est une filière très concrète et directement opérationnelle : toute entreprise, quelle que soit sa taille, a besoin de quelqu''un capable de faire fonctionner son réseau informatique.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes le côté technique et pratique de l''informatique — câblage, configuration, dépannage — plus que la programmation pure.

Le secteur qui recrute le plus : les PME et administrations publiques, qui ont toutes besoin d''un technicien réseau, souvent en interne ou via des prestataires.

### Technicien en réseaux informatiques
Le débouché le plus direct : gérer l''infrastructure réseau d''une entreprise ou d''une administration (câblage, serveurs, connexions internet, sécurité de base).

### Technicien en maintenance informatique
Assurer le bon fonctionnement du parc informatique (ordinateurs, imprimantes, serveurs) d''une organisation, avec une forte demande dans les PME qui n''ont pas de service informatique dédié.

### Développeur d''applications (Desktop, Web, Mobile)
Certains diplômés évoluent vers le développement logiciel après avoir consolidé leurs bases techniques, notamment en autoformation ou via des certifications complémentaires.

### Prestation informatique indépendante
Un débouché courant au Bénin : technicien informatique indépendant, intervenant pour plusieurs petites structures qui n''ont pas les moyens d''un poste à temps plein.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers administrateur systèmes et réseaux senior, responsable informatique d''une entreprise, ou te spécialiser en cybersécurité.

### Poursuivre ses études
Master en Réseaux et Télécommunications, ou certifications professionnelles reconnues (Cisco CCNA, Microsoft) pour renforcer l''employabilité technique.'
WHERE slug = 'administration-des-reseaux-informatiques';

-- ---------- ANALYSE INFORMATIQUE ET PROGRAMMATION ----------
UPDATE filieres SET
  description = 'La filière d''Analyse Informatique et Programmation est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme aux bases du développement logiciel et de l''analyse de systèmes d''information, avec une orientation plus généraliste que les filières spécialisées comme le Génie Logiciel d''IFRI. Tu y apprends la programmation (algorithmique, langages de base), l''analyse des besoins informatiques d''une organisation, et la conception de petites applications de gestion. C''est une filière qui prépare à des postes techniques polyvalents plutôt qu''à une spécialisation pointue, adaptée aux besoins informatiques courants des entreprises et administrations béninoises.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux une formation informatique généraliste et opérationnelle, qui te permette de travailler rapidement sur des besoins concrets d''entreprise sans viser d''emblée une spécialisation très pointue.

Le secteur qui recrute le plus : les PME et administrations ayant besoin de compétences informatiques polyvalentes, sans nécessairement un poste de développeur spécialisé.

### Technicien en réseaux informatiques et support
Comme pour la filière voisine, un débouché fréquent : maintenance et support informatique au sein d''une structure.

### Développeur d''applications de gestion
Concevoir de petites applications (Desktop, Web, Mobile) adaptées aux besoins internes d''une entreprise : gestion de stock, facturation, suivi client.

### Analyste des besoins informatiques
Faire le lien entre les besoins métier d''une organisation et les solutions informatiques à mettre en place — un rôle souvent occupé en interne dans les moyennes entreprises.

### Auto-entrepreneuriat informatique
Beaucoup de diplômés développent une activité indépendante : création de petits logiciels ou sites pour des commerçants et PME locales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chef de projet informatique, développeur senior, ou responsable des systèmes d''information d''une PME.

### Poursuivre ses études
Master en Informatique de Gestion ou en Systèmes d''Information, avec possibilité de se spécialiser davantage en développement ou en analyse de données.'
WHERE slug = 'analyse-informatique-et-programmation';

-- ---------- ASSURANCE ----------
UPDATE filieres SET
  description = 'La filière d''Assurance est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme aux métiers techniques et commerciaux du secteur des assurances : évaluation des risques, tarification des contrats, gestion des sinistres, relation client. Tu y étudies le droit des assurances, les mathématiques financières appliquées, et les techniques commerciales spécifiques à ce secteur. C''est une filière de spécialisation dans un secteur financier en pleine structuration au Bénin, où la culture de l''assurance reste à développer, mais où la demande de professionnels qualifiés augmente avec la formalisation progressive de l''économie et l''essor de la micro-assurance.',
  debouches = 'Pour qui ? Cette filière te convient si tu es à l''aise avec les chiffres et le conseil client, et que tu veux travailler dans un secteur financier stable, en pleine croissance au Bénin.

Le secteur qui recrute le plus : les compagnies d''assurance elles-mêmes, encore en développement mais de plus en plus structurées au Bénin.

### Chargé de clientèle en assurance
Le débouché le plus direct : conseiller et vendre des contrats d''assurance (auto, santé, habitation) à des particuliers ou des entreprises, pour une compagnie d''assurance.

### Conseiller en marché et gestion des risques
Évaluer et tarifer les risques à assurer, un poste plus technique au sein des compagnies d''assurance, essentiel à leur rentabilité.

### Gestionnaire de patrimoine
Pour les profils plus orientés conseil financier global, accompagner des clients dans la gestion de leur patrimoine, en lien avec des produits d''assurance-vie ou d''épargne.

### Micro-assurance
Un secteur spécifique et en croissance au Bénin : développement de produits d''assurance adaptés aux populations à faibles revenus, souvent en lien avec des institutions de microfinance.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''agence, actuaire junior (avec une spécialisation complémentaire), ou directeur commercial d''une compagnie d''assurance.

### Poursuivre ses études
Master en Assurance, en Actuariat, ou en Gestion des Risques, au Bénin ou dans des écoles spécialisées de la sous-région (IIA Dakar notamment).'
WHERE slug = 'assurance';

-- ---------- BANQUE ET FINANCE DE MARCHÉ ----------
UPDATE filieres SET
  description = 'La filière de Banque et Finance de Marché est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme aux métiers bancaires et à la compréhension des marchés financiers. Tu y étudies les techniques bancaires (crédit, épargne, opérations de guichet), les marchés financiers internationaux, et la gestion de la relation client en milieu bancaire. C''est une filière tournée vers le secteur bancaire, particulièrement développé au Bénin avec la présence de nombreuses banques régionales et internationales (Ecobank, UBA, BOA, Orabank), qui recrutent régulièrement des jeunes diplômés pour leurs réseaux d''agences.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler dans le secteur bancaire, un domaine relativement stable et structuré au Bénin, avec des perspectives d''évolution claires.

Le secteur qui recrute le plus : les banques commerciales, qui constituent l''essentiel des débouchés directs de cette filière.

### Chargé de clientèle en banque
Le débouché le plus courant : conseiller des particuliers ou des entreprises sur leurs produits bancaires (comptes, crédits, épargne) en agence.

### Conseiller en marché et gestion de portefeuille
Un poste plus technique pour ceux qui s''intéressent aux marchés financiers : suivi de placements, gestion de portefeuilles clients.

### Gestionnaire de patrimoine
Accompagner des clients fortunés ou des entreprises dans la structuration de leur patrimoine financier, un poste généralement accessible après quelques années d''expérience bancaire.

### Opérations bancaires et back-office
Des postes moins visibles mais nombreux existent dans le traitement des opérations bancaires (virements, compensation, conformité).

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chef d''agence bancaire, responsable clientèle entreprise, ou analyste crédit senior.

### Poursuivre ses études
Master en Banque et Finance, en Finance de Marché, ou certifications professionnelles bancaires (AMF, formations internes des groupes bancaires).'
WHERE slug = 'banque-et-finance-de-marche';

-- ---------- BANQUE ET INSTITUTIONS DES MICRO FINANCES ----------
UPDATE filieres SET
  description = 'La filière de Banque et Institutions des Micro finances est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme spécifiquement aux métiers de la microfinance : octroi de microcrédits, épargne de proximité, accompagnement financier des petits entrepreneurs et populations non bancarisées. Tu y étudies les techniques bancaires classiques adaptées au contexte de la microfinance, la gestion des risques de crédit à petite échelle, et l''analyse de la clientèle informelle. C''est une filière très ancrée dans la réalité économique béninoise, où une large partie de la population et des petites entreprises dépendent des institutions de microfinance plutôt que des banques classiques pour leurs besoins financiers.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler au plus près des réalités économiques des populations et petits entrepreneurs béninois, dans un secteur financier de proximité en forte croissance.

Le secteur qui recrute le plus : les institutions de microfinance (IMF), très nombreuses et actives dans tout le pays, en particulier hors des grandes villes.

### Chargé de clientèle en microfinance
Le débouché principal : accompagner des clients (souvent des commerçants, artisans ou agriculteurs) dans l''octroi de microcrédits et la gestion de leur épargne.

### Conseiller en marché pour populations non bancarisées
Un rôle d''évaluation et de conseil adapté à une clientèle qui n''a pas accès aux services bancaires classiques, avec une approche de terrain importante.

### Gestion de patrimoine à petite échelle
Accompagner des clients dans la structuration de leur épargne, même modeste, un enjeu important pour la stabilité financière des ménages béninois.

### Développement de produits de micro-assurance
Certains postes combinent microfinance et micro-assurance, pour proposer des produits financiers complets et adaptés aux populations vulnérables.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''agence de microfinance, chargé de programme pour une ONG financière, ou directeur régional d''une IMF.

### Poursuivre ses études
Master en Microfinance, en Développement Économique, ou en Gestion des Institutions Financières.'
WHERE slug = 'banque-et-institutions-des-micro-finances';

-- ---------- MARKETING ----------
UPDATE filieres SET
  description = 'La filière de Marketing est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme aux techniques de vente, de communication commerciale et de stratégie de marque. Tu y étudies l''étude de marché, la stratégie commerciale, la publicité, et de plus en plus le marketing digital (réseaux sociaux, référencement, gestion de communautés en ligne). C''est une filière large qui ouvre sur une grande diversité de métiers, du commercial terrain au spécialiste du marketing digital, avec une forte évolution ces dernières années vers les compétences numériques, portées par la digitalisation croissante des entreprises béninoises.',
  debouches = 'Pour qui ? Cette filière te convient si tu es à l''aise avec la communication et la persuasion, que tu as un bon sens commercial, et que tu t''intéresses de plus en plus aux outils numériques (réseaux sociaux, contenu digital).

Le secteur qui recrute le plus aujourd''hui : le marketing digital, en forte croissance avec la digitalisation des entreprises et l''essor des réseaux sociaux comme canal commercial.

### Marketing digital et community management
Le secteur le plus dynamique actuellement : gestion des réseaux sociaux d''une marque, stratégie de contenu, publicité en ligne, pour des entreprises ou des agences spécialisées.

### Marketing et communication commerciale classique
Chargé d''études marketing, chef de publicité, ou responsable du développement commercial d''une entreprise, dans une approche plus traditionnelle du métier.

### Analyse de données marketing
Un métier émergent : data miner ou analyste marketing, exploitant les données clients pour orienter les stratégies commerciales des entreprises.

### E-commerce et gestion de projets digitaux
Responsable e-commerce, chef de projet web/mobile pour des entreprises qui développent leur présence en ligne — un secteur en forte expansion au Bénin.

### Relation client et chargé de clientèle
Un débouché plus classique mais toujours recherché : accompagner les clients d''une entreprise, en présentiel ou à distance.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable marketing, directeur commercial, ou consultant en stratégie digitale.

### Poursuivre ses études
Master en Marketing, en Marketing Digital, ou en Communication d''Entreprise, au Bénin ou à l''international.'
WHERE slug = 'marketing';

-- ---------- MARKETING (2e MENTION) ----------
UPDATE filieres SET
  description = 'La filière de Marketing (2e mention) est une licence proposée par l''ENEAM, rattachée à l''UAC, qui constitue une seconde voie d''accès au marketing, avec un accent plus marqué sur le marketing digital et les métiers émergents du numérique (community management, chef de produit web/mobile, marketing relationnel). Tu y retrouves les fondamentaux du marketing classique, complétés par une orientation plus poussée vers les outils digitaux et la gestion de la relation client à l''ère numérique. C''est une filière pensée pour répondre à la demande croissante d''entreprises qui cherchent des profils capables de gérer leur présence et leurs ventes en ligne.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser directement dans les métiers du marketing digital et de la relation client numérique, plutôt que dans le marketing traditionnel.

Le secteur qui recrute le plus : les entreprises en pleine digitalisation, à la recherche de profils capables de gérer leur présence en ligne et leurs ventes digitales.

### Consultant en référencement (SEO/SEM) et marketing digital
Optimiser la visibilité d''une entreprise sur les moteurs de recherche et les plateformes publicitaires en ligne, un métier très recherché par les entreprises qui se digitalisent.

### Community management et réseaux sociaux
Gérer la présence et l''image d''une marque sur les réseaux sociaux, créer du contenu et animer une communauté de clients ou prospects.

### Chef de produit Web/Mobile
Piloter le développement et la promotion de produits digitaux (applications, sites e-commerce) pour des entreprises ou des startups.

### Chargé de clientèle en entreprises privées et publiques
Un débouché plus classique mais toujours présent : accompagner et fidéliser les clients d''une organisation.

### Chef de rayon et conseil clientèle
Pour ceux qui préfèrent une approche plus terrain : gestion commerciale en point de vente, un débouché courant dans le secteur de la distribution.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable marketing digital, social media manager senior, ou consultant indépendant en stratégie digitale.

### Poursuivre ses études
Master en Marketing Digital, en Communication Digitale, ou en Management de Produits Numériques.'
WHERE slug = 'marketing-2e-mention';

-- ---------- GESTION DES RESSOURCES HUMAINES ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Ressources Humaines est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme aux métiers de la gestion du personnel en entreprise : recrutement, formation, paie, droit du travail, gestion des carrières. Tu y étudies le droit social, les techniques de recrutement, la gestion administrative du personnel, et les fondamentaux du management d''équipe. C''est une filière transversale, utile dans tous les secteurs d''activité, puisque toute organisation ayant des salariés a besoin de fonctions RH — un profil recherché aussi bien dans les grandes entreprises que dans les administrations et ONG.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes l''humain, l''organisation, et que tu veux jouer un rôle clé dans le fonctionnement interne des entreprises, indépendamment de leur secteur d''activité.

Le secteur qui recrute le plus : les grandes entreprises et administrations (maritimes, industrielles, publiques), qui disposent de services RH structurés.

### Gestion du personnel en entreprise
Le débouché principal : gérer les dossiers administratifs des salariés (contrats, paie, congés) au sein d''entreprises, notamment dans les secteurs maritime et logistique où cette filière est particulièrement reconnue.

### Recrutement et gestion des carrières
Participer au processus de recrutement, à l''évaluation et à l''évolution professionnelle des salariés au sein d''une organisation.

### Logistique et approvisionnement
Un débouché connexe pour les profils polyvalents : coordination logistique en lien avec la gestion des équipes et des ressources humaines opérationnelles.

### Agences de voyage et secteur des services
Des postes de gestion administrative et RH existent aussi dans les agences de voyage et le secteur des services, en lien avec la gestion du personnel.

### Administrations publiques
Les administrations béninoises recrutent également des profils RH pour la gestion de leurs agents.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable RH, directeur des ressources humaines, ou consultant en recrutement.

### Poursuivre ses études
Master en Gestion des Ressources Humaines, en Droit Social, ou en Management des Organisations.'
WHERE slug = 'gestion-des-ressources-humaines';

-- ---------- GESTION DES TRANSPORTS ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Transports est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme à l''organisation et à la gestion des flux de transport de personnes et de marchandises. Tu y étudies la logistique appliquée aux transports, la gestion administrative du secteur (douane, réglementation), et les techniques d''optimisation des coûts et des délais. C''est une filière stratégique pour un pays comme le Bénin, dont le Port autonome de Cotonou constitue l''un des piliers de l''économie régionale, avec un rôle de porte d''entrée pour de nombreux pays enclavés d''Afrique de l''Ouest (Niger, Burkina Faso, Mali).',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à l''organisation logistique et aux flux commerciaux, dans un secteur stratégique pour l''économie béninoise autour du Port de Cotonou.

Le secteur qui recrute le plus : le secteur portuaire et logistique, moteur économique majeur du Bénin de par sa position régionale.

### Gestion logistique en entreprise maritime et portuaire
Le débouché le plus stratégique : coordination des opérations de transport et de logistique pour des sociétés maritimes, des transitaires, ou des structures liées au Port de Cotonou.

### Agences de voyage et transport de personnes
Organisation et gestion administrative pour des agences de voyage ou des sociétés de transport de personnes (aérien, routier).

### Approvisionnement et supply chain
Gestion des flux d''approvisionnement pour des entreprises industrielles ou commerciales, un métier de plus en plus stratégique avec la complexification des chaînes logistiques.

### Gestion du personnel dans le secteur des transports
Comme pour la GRH classique, une partie des diplômés s''oriente vers la gestion administrative du personnel dans les entreprises de transport et de logistique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable logistique, directeur d''exploitation transport, ou consultant en chaîne d''approvisionnement.

### Poursuivre ses études
Master en Logistique et Transport, en Supply Chain Management, ou spécialisation portuaire et maritime.'
WHERE slug = 'gestion-des-transports';

-- ---------- GESTION DE LOGISTIQUE ----------
UPDATE filieres SET
  description = 'La filière de Gestion de Logistique est une licence proposée par l''ENEAM, rattachée à l''UAC, à laquelle on accède sur concours, qui forme aux méthodes quantitatives et statistiques appliquées à l''organisation des flux logistiques et à l''analyse économique. Contrairement à ce que son nom pourrait suggérer, cette filière met davantage l''accent sur la culture générale et les mathématiques que sur la logistique opérationnelle pure : elle prépare à des postes d''analyse et de conseil dans des cabinets d''études, où la maîtrise des chiffres et des méthodes statistiques est centrale. C''est une filière sélective (accès par concours) qui vise des profils rigoureux et analytiques.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux avec les chiffres, que tu réussis bien les épreuves de culture générale et de mathématiques, et que tu vises des métiers d''analyse plutôt que de terrain logistique pur.

Le secteur qui recrute le plus : les cabinets d''études et de conseil, qui valorisent fortement cette double compétence chiffres/analyse.

### Statisticien en entreprise ou administration
Le débouché le plus direct compte tenu du contenu de la formation : analyser des données économiques et logistiques pour orienter les décisions d''une organisation.

### Cabinets d''études et de conseil
Intégrer un cabinet d''études économiques ou logistiques comme analyste, pour accompagner des entreprises ou institutions dans leurs choix stratégiques.

### Gestion et optimisation des chaînes logistiques
Pour les profils qui souhaitent tout de même une orientation plus opérationnelle : optimisation des flux de marchandises et des coûts logistiques en entreprise.

### Administrations publiques et institutions
Des postes d''analyste statistique existent également dans les administrations publiques ayant besoin de données fiables pour la planification.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers consultant senior, responsable d''études logistiques, ou statisticien référent dans une grande organisation.

### Poursuivre ses études
Master en Statistique Appliquée, en Logistique, ou en Économie Quantitative.'
WHERE slug = 'gestion-de-logistique';

-- ---------- STATISTIQUE ÉCONOMIQUE ET SECTORIELLE ----------
UPDATE filieres SET
  description = 'La filière de Statistique Économique et Sectorielle est une licence proposée par l''ENEAM, rattachée à l''UAC, à laquelle on accède sur concours, qui forme à l''analyse statistique appliquée à l''économie et à des secteurs d''activité spécifiques (agriculture, industrie, services). Tu y développes une solide culture des méthodes statistiques et de la culture générale économique, avec pour objectif de former des experts capables de produire et d''interpréter des données économiques fiables. C''est une filière exigeante en mathématiques, qui prépare à des métiers d''analyse recherchés par les cabinets d''études et les institutions économiques du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu as un vrai goût pour les chiffres et l''analyse économique, et que tu vises des postes d''expertise plutôt que des métiers de terrain.

Le secteur qui recrute le plus : les cabinets d''études économiques, ainsi que les institutions publiques en charge des statistiques nationales.

### Statisticien sectoriel
Le débouché le plus direct : analyser des données statistiques propres à un secteur (agriculture, industrie, commerce) pour des institutions publiques ou privées.

### Cabinets d''études et de conseils économiques
Intégrer un cabinet d''études pour produire des analyses économiques destinées à des entreprises, des bailleurs de fonds, ou des administrations.

### Institutions nationales de statistique
Un débouché institutionnel important : contribuer à la production des statistiques officielles du pays, notamment via l''Institut National de la Statistique et de la Démographie (INStaD).

### Analyse économique sectorielle en entreprise
Certaines grandes entreprises recrutent des statisticiens pour analyser leur marché et leur secteur d''activité en interne.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers économiste sectoriel, responsable d''études statistiques, ou consultant senior en analyse économique.

### Poursuivre ses études
Master en Statistique Économique, en Économétrie, ou en Analyse de Données, notamment dans des écoles régionales spécialisées comme l''ENSEA (Abidjan) ou l''ISSEA (Yaoundé).'
WHERE slug = 'statistique-economique-et-sectorielle';

-- ---------- STATISTIQUE DÉMOGRAPHIQUE ET SOCIALE ----------
UPDATE filieres SET
  description = 'La filière de Statistique Démographique et Sociale est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme à l''analyse statistique des populations et des phénomènes sociaux : évolution démographique, migrations, données de santé et d''éducation. Tu y apprends les méthodes de collecte et d''analyse de données sociales, avec des applications concrètes pour la planification publique (recensements, enquêtes de population, indicateurs de développement). C''est une filière essentielle pour un pays qui doit planifier ses infrastructures et politiques publiques (santé, éducation, logement) en fonction de l''évolution réelle de sa population.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses aux dynamiques de population et aux enjeux sociaux, avec une approche rigoureuse et quantitative de ces questions.

Le secteur qui recrute le plus : les institutions publiques de planification et les organisations internationales travaillant sur les questions démographiques.

### Institutions nationales de statistique et de démographie
Le débouché institutionnel principal : contribuer aux recensements et enquêtes démographiques nationales, notamment via l''INStaD.

### Organisations internationales et agences des Nations Unies
Les agences comme l''UNFPA (Fonds des Nations Unies pour la population) ou l''UNICEF recrutent des profils formés à la statistique démographique pour leurs études de population.

### Planification des politiques publiques
Appuyer les ministères (Santé, Éducation, Aménagement du Territoire) dans la planification de leurs politiques en fonction des données démographiques disponibles.

### ONG et bureaux d''études sociaux
Réaliser des enquêtes sociales pour des ONG ou des cabinets spécialisés dans l''évaluation de programmes de développement.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers démographe senior, responsable d''études de population, ou expert consultant pour des organisations internationales.

### Poursuivre ses études
Master en Démographie, en Statistique Sociale, ou en Population et Développement — l''IFORD à Yaoundé étant une référence régionale pour cette spécialisation.'
WHERE slug = 'statistique-demographique-et-sociale';

-- ---------- PLANIFICATION LOCAL ET GESTION DES PROJETS ----------
UPDATE filieres SET
  description = 'La filière de Planification Local et Gestion des Projets est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme à la conception, la planification et le suivi de projets de développement à l''échelle locale (communale, régionale). Tu y étudies les méthodes de gestion de projet, l''analyse économique territoriale, et les outils de planification participative. C''est une filière de gestion appliquée au développement local, particulièrement pertinente dans le contexte béninois de décentralisation, où les communes ont de plus en plus la responsabilité de planifier et mettre en œuvre leurs propres projets de développement.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux piloter des projets concrets de développement au niveau local, en lien avec les collectivités et les bailleurs de fonds.

Le secteur qui recrute le plus : les projets de développement financés par des bailleurs internationaux, en forte activité au Bénin.

### Planificateur en collectivité locale
Le débouché direct : intégrer les services de planification d''une mairie ou d''une intercommunalité pour concevoir et suivre les projets de développement communal.

### Gestionnaire de projets de développement
Piloter des projets financés par des bailleurs internationaux (Banque Mondiale, Union Européenne, coopérations bilatérales) pour le compte d''ONG ou d''administrations.

### Cabinets d''études et de conseil en développement local
Intégrer un cabinet spécialisé dans l''accompagnement des collectivités locales et des projets de développement territorial.

### Coordination de programmes pour ONG
Un débouché fréquent : coordonner des programmes de développement local pour des ONG nationales ou internationales présentes au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chef de projet senior, responsable de programme pour une organisation internationale, ou consultant indépendant en développement local.

### Poursuivre ses études
Master en Gestion de Projets, en Développement Local, ou en Politiques Publiques Territoriales.'
WHERE slug = 'planification-local-et-gestion-des-projets';

-- ---------- PLANIFICATION ET ÉCONOMIE DU DÉVELOPPEMENT RÉGIONAL ----------
UPDATE filieres SET
  description = 'La filière de Planification et Économie du Développement Régional est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme à l''analyse économique et à la planification du développement à l''échelle régionale, au-delà de la seule commune. Tu y étudies l''économie territoriale, les mécanismes de développement régional, et les outils de diagnostic économique appliqués à des zones géographiques plus larges (départements, régions transfrontalières). C''est une filière qui prépare à penser le développement à une échelle intermédiaire entre le local et le national, un niveau souvent négligé mais stratégique pour équilibrer le développement du pays entre ses différentes régions.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux comprendre et agir sur les déséquilibres économiques entre régions, avec une approche à la fois économique et territoriale.

Le secteur qui recrute le plus : les structures publiques de planification régionale et les projets de développement territorial financés par des bailleurs internationaux.

### Planificateur régional
Le débouché principal : appuyer la planification économique à l''échelle départementale ou régionale, pour des structures publiques ou des projets de développement.

### Gestionnaire de projets de développement territorial
Piloter des projets visant à réduire les inégalités de développement entre régions, souvent financés par des bailleurs internationaux.

### Cabinets d''études économiques régionales
Réaliser des diagnostics économiques territoriaux pour des cabinets d''études, des collectivités ou des organismes de coopération régionale.

### Institutions de coopération régionale et transfrontalière
Un débouché spécifique : travailler sur des enjeux de développement partagés entre le Bénin et ses voisins, en lien avec des structures comme l''UEMOA ou la CEDEAO.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers économiste régional senior, responsable de programme de développement territorial, ou consultant pour des organisations sous-régionales.

### Poursuivre ses études
Master en Économie du Développement, en Planification Régionale, ou en Politiques Territoriales.'
WHERE slug = 'planification-et-economie-du-developpement-regional';

-- ---------- DÉVELOPPEMENT LOCAL ET RÉGIONAL ----------
UPDATE filieres SET
  description = 'La filière de Développement Local et Régional est une licence proposée par l''ENEAM, rattachée à l''UAC, qui forme de façon plus généraliste aux enjeux du développement territorial, combinant des bases en économie, gestion et planification appliquées aux échelles locale et régionale. Tu y étudies les mécanismes du développement économique territorial, les outils de diagnostic et d''intervention, avec une approche qui couvre à la fois les dynamiques communales et les enjeux régionaux plus larges. C''est une filière charnière entre la Planification Locale et la Planification Régionale, offrant une vision d''ensemble utile pour ceux qui ne veulent pas se spécialiser trop tôt sur une échelle territoriale précise.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses aux questions de développement territorial de façon large, sans vouloir te spécialiser immédiatement sur l''échelle communale ou régionale.

Le secteur qui recrute le plus : les structures de développement territorial, qu''elles soient publiques, associatives ou liées à la coopération internationale.

### Chargé de développement local
Un débouché polyvalent : accompagner des collectivités ou des structures locales dans leurs projets de développement économique et social.

### Gestion de projets de coopération décentralisée
Le Bénin bénéficie de nombreux partenariats de coopération décentralisée (jumelages avec des collectivités françaises notamment) qui recrutent des profils formés au développement territorial.

### ONG et structures associatives de développement
Coordonner des programmes de développement au niveau local pour des ONG béninoises ou internationales.

### Institutions publiques de développement territorial
Intégrer des structures étatiques chargées d''accompagner le développement des différentes régions du pays.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de programme de développement territorial, consultant en développement local, ou coordinateur régional pour une ONG internationale.

### Poursuivre ses études
Master en Développement Local, en Économie Territoriale, ou en Gestion de la Coopération Décentralisée.'
WHERE slug = 'developpement-local-et-regional';


-- ================================================================
-- >>> FICHIER SOURCE : 08_uac_lot5_epa_fashs.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 5 : EPA, FASHS-Calavi
-- ============================================================

-- ---------- GESTION FINANCIÈRE ET COMPTABLE (EPA) ----------
UPDATE filieres SET
  description = 'La filière de Gestion Financière et Comptable est une licence proposée par l''EPA (École du Patrimoine Africain), rattachée à l''UAC, qui forme aux techniques comptables et de gestion financière applicables à toute organisation. Tu y étudies la comptabilité générale et analytique, la fiscalité, l''analyse financière, et les outils de gestion budgétaire. Même si elle est portée par une école tournée vers le patrimoine culturel, cette filière forme en réalité à un métier transversal, utilisable dans n''importe quel secteur d''activité : toute entreprise, association ou institution a besoin de professionnels capables de tenir ses comptes et d''en analyser la santé financière.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux avec les chiffres, méthodique, et que tu veux un métier avec des débouchés stables dans tous les secteurs d''activité, culturel comme classique.

Le secteur qui recrute le plus : les entreprises et institutions de toute nature, puisque la comptabilité est un besoin universel — c''est l''un des profils les plus recherchés sur le marché de l''emploi béninois.

### Comptable en entreprise
Le débouché le plus direct et le plus demandé : tenir la comptabilité d''une entreprise, gérer les déclarations fiscales et sociales, produire les états financiers.

### Responsable financier
Piloter la stratégie financière d''une organisation, superviser les budgets, analyser la rentabilité — un poste accessible après quelques années d''expérience comptable.

### Auditeur financier
Vérifier la fiabilité des comptes d''une entreprise pour le compte d''un cabinet d''audit, un métier exigeant mais très valorisé.

### Auditeur interne
Contrôler les procédures et la conformité financière au sein d''une organisation, souvent dans de grandes entreprises ou administrations.

### Gestion financière du secteur culturel
Un débouché spécifique lié à l''école : gérer les finances d''institutions culturelles (musées, festivals), un secteur qui a justement besoin de rigueur financière pour se pérenniser.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur financier, expert-comptable (avec une certification complémentaire), ou consultant en audit et gestion.

### Poursuivre ses études
Master en Comptabilité, Contrôle, Audit (CCA), ou préparation au diplôme d''expertise comptable (DECOFI, DSCG) pour les plus ambitieux.'
WHERE slug = 'gestion-financiere-et-comptable';

-- ---------- GESTION DU PATRIMOINE CULTUREL (EPA) ----------
UPDATE filieres SET
  description = 'La filière de Gestion du patrimoine culturel est une licence proposée par l''EPA (École du Patrimoine Africain), rattachée à l''UAC, qui forme à la préservation, la valorisation et la gestion des biens culturels : sites historiques, musées, objets d''art, traditions immatérielles. Tu y étudies le droit du patrimoine, l''histoire et la géographie culturelles, ainsi que des bases en gestion touristique et muséale. C''est une filière unique en son genre au Bénin, dans un pays dont le patrimoine culturel est exceptionnellement riche (royaumes historiques, tradition vaudoue, route de l''esclave), mais encore insuffisamment valorisé sur le plan économique et touristique — un vrai gisement de débouchés pour les années à venir.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné par l''histoire et la culture béninoises, et que tu veux contribuer à préserver et valoriser ce patrimoine tout en en faisant un moteur économique (tourisme culturel notamment).

Le secteur qui recrute le plus : le tourisme culturel et patrimonial, en développement au Bénin avec la valorisation croissante de sites comme Ouidah, Abomey ou Ganvié.

### Droit et gestion administrative du patrimoine
Un débouché institutionnel : veiller au respect du cadre légal de protection des biens culturels, pour des structures publiques ou des ONG patrimoniales.

### Conservation et gestion de musées
Devenir patrimoniaire de musée : gestion des collections, conservation des objets, organisation d''expositions, pour des musées publics ou privés.

### Gestion et médiation de sites patrimoniaux
Coordonner la gestion de sites historiques ou culturels (palais royaux, sites classés UNESCO comme Abomey), en lien avec les autorités locales et le tourisme.

### Tourisme culturel
Concevoir et accompagner des circuits touristiques valorisant le patrimoine béninois, pour des agences de tourisme ou des structures publiques de promotion touristique.

### Recherche et documentation patrimoniale
Pour ceux qui préfèrent la recherche : contribuer à documenter et faire reconnaître des éléments du patrimoine immatériel béninois (traditions, savoir-faire).

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur de musée, chef de projet patrimoine pour une organisation internationale (UNESCO, ICCROM), ou consultant en valorisation touristique et culturelle.

### Poursuivre ses études
Master en Gestion du Patrimoine, en Muséologie, ou en Tourisme Culturel, au Bénin ou dans des institutions internationales spécialisées.'
WHERE slug = 'gestion-du-patrimoine-culturel';

-- ---------- GÉOGRAPHIE ET AMÉNAGEMENT DU TERRITOIRE (FASHS-Calavi) ----------
UPDATE filieres SET
  description = 'La filière de Géographie et Aménagement du Territoire est une licence proposée par la Faculté des Sciences Humaines et Sociales (FASHS-Calavi), rattachée à l''UAC, qui forme — comme sa version à FLASH-Adjarra — à la lecture et à l''organisation de l''espace, mais avec une orientation davantage centrée sur les sciences humaines et sociales que sur l''environnement. Tu y étudies la géographie humaine et économique, les dynamiques de population, et les méthodes d''analyse territoriale, avec un accès ouvert notamment aux bacheliers techniques agricoles (DEAT), ce qui en fait une filière avec un profil d''entrants plus large.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux comprendre les liens entre populations, territoires et activités économiques, avec une approche davantage centrée sur les sciences humaines que sur la technique environnementale.

Le secteur qui recrute le plus aujourd''hui : l''enseignement, débouché le plus direct pour les diplômés de cette filière.

### Enseignement
Le débouché principal : devenir professeur de géographie dans les collèges et lycées, via les concours de l''enseignement.

### Recherche en géographie humaine
Intégrer des laboratoires ou institutions de recherche travaillant sur les dynamiques de population et les territoires béninois.

### Assainissement et gestion territoriale
Un débouché connexe : appuyer des projets d''assainissement urbain ou de gestion territoriale pour des collectivités locales.

### Bureaux d''études territoriaux
Réaliser des études de terrain (démographie, usages du territoire) pour des cabinets ou des projets de développement.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique, chercheur en géographie, ou consultant en études territoriales.

### Poursuivre ses études
Master en Géographie Humaine, en Population et Développement, ou en Aménagement du Territoire.'
WHERE slug = 'geographie-et-amenagement-du-territoire-2';

-- ---------- PSYCHOLOGIE (FASHS-Calavi) ----------
UPDATE filieres SET
  description = 'La filière de Psychologie est une licence proposée par la Faculté des Sciences Humaines et Sociales (FASHS-Calavi), rattachée à l''UAC, qui forme à la compréhension du comportement humain, des processus mentaux et des dynamiques relationnelles. Tu y étudies la psychologie générale, la psychologie du développement, les méthodes d''observation et d''entretien, avec des bases en neurosciences et en statistiques appliquées aux sciences humaines. C''est une filière exigeante, où la licence seule ne suffit généralement pas à exercer comme psychologue clinicien (un master est nécessaire), mais qui ouvre déjà des débouchés dans l''accompagnement social et éducatif.',
  debouches = 'Pour qui ? Cette filière te convient si tu es à l''écoute des autres, curieux du fonctionnement humain, et que tu es prêt à poursuivre en master pour accéder aux métiers les plus qualifiés de la psychologie.

Le secteur qui recrute le plus dès la licence : l''éducation spécialisée et l''accompagnement de publics à besoins particuliers.

### Accompagnement éducatif spécialisé
Un débouché accessible dès la licence : intervenir dans des structures de formation pour enfants sourds, muets, amblyopes ou non-voyants, en appui pédagogique et psychologique.

### Centres d''accueil en santé mentale
Travailler dans des centres d''accueil et de formation pour adultes en difficulté psychiatrique, en soutien aux équipes soignantes.

### Enseignement
Formation des enseignants sur les aspects psychologiques de l''apprentissage, ou poste dans des structures de formation pédagogique.

### Ressources humaines et accompagnement en entreprise
Certains diplômés s''orientent vers des fonctions RH, valorisant leur compréhension du comportement humain dans un contexte professionnel.

### Psychologue clinicien (après master)
Le métier le plus connu associé à la psychologie nécessite impérativement une poursuite en master : accompagnement thérapeutique de patients, en cabinet ou en institution.

### Évoluer dans sa carrière
Avec l''expérience et une spécialisation, tu peux évoluer vers psychologue clinicien, psychologue du travail, ou responsable d''un centre d''accompagnement spécialisé.

### Poursuivre ses études
Master en Psychologie Clinique, en Psychologie du Développement, ou en Psychologie du Travail — une poursuite quasi indispensable pour exercer pleinement ce métier.'
WHERE slug = 'psychologie';

-- ---------- SCIENCES DE L'ÉDUCATION ET DE LA FORMATION (FASHS-Calavi) ----------
UPDATE filieres SET
  description = 'La filière de Sciences de l''Éducation et de la Formation est une licence proposée par la Faculté des Sciences Humaines et Sociales (FASHS-Calavi), rattachée à l''UAC, qui forme aux processus d''apprentissage et à l''ingénierie pédagogique. Tu y étudies la pédagogie, la psychologie de l''apprentissage, les politiques éducatives, et des méthodes de conception de formations. C''est une filière différente de la formation initiale des professeurs (qui passe généralement par les ENS) : elle prépare davantage à penser, organiser et évaluer les systèmes éducatifs et les dispositifs de formation, dans une perspective plus large que la seule salle de classe.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la façon dont on apprend et dont on éduque, au-delà du simple métier d''enseignant, et que tu veux travailler sur la conception et l''organisation de dispositifs éducatifs.

Le secteur qui recrute le plus : l''enseignement, en particulier dans les collèges et lycées.

### Enseignement en collège et lycée
Le débouché le plus direct : professeur, avec une bonne compréhension des processus d''apprentissage acquise durant la formation.

### Conception de programmes de formation
Travailler pour des organismes de formation professionnelle ou des ONG éducatives à la conception de programmes pédagogiques adaptés à différents publics.

### Politiques éducatives et administration scolaire
Intégrer les services du Ministère de l''Éducation pour contribuer à la conception ou l''évaluation des politiques éducatives.

### Formation d''adultes
Concevoir et animer des formations pour adultes en entreprise ou en organisme de formation continue, un secteur en développement au Bénin.

### Recherche en sciences de l''éducation
Pour ceux qui veulent approfondir : rejoindre des programmes de recherche sur les systèmes éducatifs béninois et leurs enjeux.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers conseiller pédagogique, responsable de programme de formation, ou inspecteur de l''éducation.

### Poursuivre ses études
Master en Sciences de l''Éducation, en Ingénierie de la Formation, ou en Politiques Éducatives.'
WHERE slug = 'sciences-de-leducation-et-de-la-formation';

-- ---------- PHILOSOPHIE (FASHS-Calavi) ----------
UPDATE filieres SET
  description = 'La filière de Philosophie est une licence proposée par la Faculté des Sciences Humaines et Sociales (FASHS-Calavi), rattachée à l''UAC, qui forme à l''analyse critique, à l''argumentation rigoureuse et à la réflexion sur les grandes questions humaines : éthique, politique, épistémologie, philosophie africaine. Tu y développes des compétences de rédaction, de dissertation et de débat argumenté, des compétences transversales très valorisées au-delà même de l''enseignement de la philosophie. C''est une filière exigeante intellectuellement, qui prépare avant tout à l''enseignement, mais dont les compétences de raisonnement et d''expression restent utiles dans de nombreux autres contextes professionnels.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes réfléchir en profondeur, argumenter et écrire, et que tu es prêt à te diriger principalement vers l''enseignement à l''issue de ce cursus.

Le secteur qui recrute le plus, quasiment sans alternative directe : l''enseignement de la philosophie dans le secondaire.

### Enseignement en collège et lycée
Le débouché quasi unique et direct de cette filière : professeur de philosophie, une matière présente dans les programmes de terminale au Bénin comme en France.

### Rédaction et médias
Les compétences d''analyse et de rédaction développées en philosophie sont valorisées dans le journalisme d''opinion, la rédaction éditoriale, ou la communication institutionnelle.

### Administration publique et conseil
Certains diplômés en philosophie évoluent vers des fonctions d''analyse ou de conseil dans l''administration, en s''appuyant sur leur capacité de raisonnement structuré.

### Recherche académique
Pour les plus passionnés : poursuivre en recherche philosophique, notamment sur des thématiques de philosophie africaine encore peu explorées.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique, inspecteur de philosophie, ou chercheur universitaire.

### Poursuivre ses études
Master en Philosophie, avec des spécialisations possibles en éthique appliquée, philosophie politique, ou philosophie africaine.'
WHERE slug = 'philosophie';

-- ---------- SOCIO-ANTHROPOLOGIE (FASHS-Calavi) ----------
UPDATE filieres SET
  description = 'La filière de Socio-Anthropologie est une licence proposée par la Faculté des Sciences Humaines et Sociales (FASHS-Calavi), rattachée à l''UAC, qui forme — comme sa version à FLASH-Adjarra — à l''étude des sociétés humaines, avec un accès plus large ouvert notamment aux bacheliers de séries gestion (G1, G3). Tu y développes des méthodes d''enquête sociale, d''analyse des dynamiques collectives, et une compréhension fine des réalités culturelles béninoises, avec pour objectif de former des professionnels capables d''intervenir sur des projets sociaux à partir d''une compréhension solide du terrain.',
  debouches = 'Pour qui ? Cette filière te convient si tu es curieux des dynamiques sociales et culturelles, que tu aimes le travail de terrain, et que tu veux mettre cette compréhension au service de projets concrets, souvent dans le champ social ou associatif.

Le secteur qui recrute le plus : les centres sociaux, ministères et projets sociaux, où la compréhension fine du contexte local est indispensable.

### Intervention dans les centres sociaux
Le débouché le plus direct : travailler dans des structures d''accompagnement social, en lien avec des publics vulnérables ou des projets communautaires.

### Ministères et administrations sociales
Intégrer des services publics chargés des politiques sociales, où l''expertise en dynamiques sociales est valorisée pour concevoir des interventions adaptées.

### ONG et projets de développement
Comme pour la version FLASH-Adjarra de cette filière, un débouché fréquent dans l''accompagnement de projets de développement nécessitant une bonne compréhension du contexte social local.

### Recherche en sciences sociales
Poursuivre en recherche sur les sociétés béninoises et ouest-africaines, au sein de laboratoires universitaires.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de projets sociaux, consultant en anthropologie appliquée, ou chargé d''études pour une institution publique.

### Poursuivre ses études
Master en Sociologie, en Anthropologie, ou en Travail Social et Développement Communautaire.'
WHERE slug = 'socio-anthropologie-2';

-- ---------- HISTOIRE ET ARCHÉOLOGIE (FASHS-Calavi) ----------
UPDATE filieres SET
  description = 'La filière d''Histoire et Archéologie est une licence proposée par la Faculté des Sciences Humaines et Sociales (FASHS-Calavi), rattachée à l''UAC, qui forme à l''étude du passé béninois et africain : histoire politique, sociale et culturelle, méthodes de recherche archéologique et de fouille. Tu y développes des compétences de recherche documentaire, d''analyse critique de sources, et une connaissance approfondie de l''histoire précoloniale, coloniale et contemporaine de l''Afrique de l''Ouest. C''est une filière particulièrement pertinente au Bénin, riche en sites et vestiges historiques (royaumes du Dahomey, route de l''esclave), qui offre à la fois des débouchés académiques et patrimoniaux.',
  debouches = 'Pour qui ? Cette filière te convient si l''histoire et l''archéologie te passionnent, que tu aimes la recherche documentaire et de terrain, et que tu veux contribuer à faire connaître et préserver l''histoire riche du Bénin et de la sous-région.

Le secteur qui recrute le plus : l''enseignement, débouché le plus direct, mais avec des opportunités réelles dans la valorisation du patrimoine.

### Enseignement
Le débouché le plus accessible : professeur d''histoire-géographie dans les collèges et lycées.

### Conservation de musée
Travailler dans un musée en tant que conservateur ou chargé des collections historiques et archéologiques, pour des institutions publiques ou privées.

### Recherche documentaire et archives
Un débouché en institution : archiviste ou chercheur documentaliste pour des centres d''archives nationales ou des institutions de recherche historique.

### Gestion du patrimoine culturel
En lien avec la richesse historique du Bénin, tu peux évoluer vers la gestion et la valorisation de sites historiques (palais royaux, sites de mémoire).

### Recherche archéologique de terrain
Pour ceux qui aiment la pratique de fouille : participer à des campagnes archéologiques, souvent en lien avec des programmes de recherche internationaux.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers conservateur en chef, directeur d''un site patrimonial, ou chercheur reconnu en histoire ouest-africaine.

### Poursuivre ses études
Master en Histoire, en Archéologie, ou en Gestion du Patrimoine, avec possibilité de poursuivre en doctorat pour la voie académique.'
WHERE slug = 'histoire-et-archeologie';

-- ---------- PSYCHOLOGIE DU TRAVAIL ET DES ORGANISATIONS (FASHS-Calavi) ----------
UPDATE filieres SET
  description = 'La filière de Psychologie du travail et des Organisations est une licence proposée par la Faculté des Sciences Humaines et Sociales (FASHS-Calavi), rattachée à l''UAC, à laquelle on accède sur concours, qui forme spécifiquement à l''application de la psychologie au monde professionnel : comportement des salariés, dynamique des équipes, bien-être au travail, gestion des conflits organisationnels. Tu y étudies la psychologie du travail, les méthodes d''évaluation et de recrutement, ainsi que les théories des organisations. C''est une filière de spécialisation qui répond à un besoin croissant des entreprises et administrations béninoises de mieux comprendre et gérer les dynamiques humaines internes.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses au comportement humain spécifiquement dans le contexte professionnel, et que tu veux intervenir sur le bien-être et l''efficacité des équipes en entreprise.

Le secteur qui recrute le plus : les grandes entreprises et administrations, qui développent progressivement une approche plus structurée de la gestion humaine.

### Psychologue du travail en entreprise
Le débouché le plus direct : accompagner les entreprises dans le recrutement, l''évaluation et la gestion des équipes, en apportant une expertise psychologique.

### Postes en administration
Certaines administrations publiques recrutent des profils formés à la psychologie des organisations pour améliorer le fonctionnement de leurs services.

### Recrutement et évaluation des compétences
Intervenir dans des cabinets de recrutement pour l''évaluation psychologique des candidats à des postes à responsabilité.

### Formation et développement des compétences
Concevoir des programmes de formation ou de développement personnel pour des salariés, en lien avec les services RH des entreprises.

### Prévention des risques psychosociaux
Un domaine émergent au Bénin : accompagner les entreprises dans la prévention du stress professionnel et des conflits au travail.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable du développement des talents, consultant en psychologie organisationnelle, ou directeur des ressources humaines.

### Poursuivre ses études
Master en Psychologie du Travail, en Gestion des Ressources Humaines, ou en Comportement Organisationnel.'
WHERE slug = 'psychologie-du-travail-et-des-organisations';


-- ================================================================
-- >>> FICHIER SOURCE : 09_uac_lot6_enstic_ena.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 6 : ENSTIC, ENA
-- ============================================================

-- ---------- JOURNALISME (ENSTIC) ----------
UPDATE filieres SET
  description = 'La filière de Journalisme est une licence proposée par l''ENSTIC (École Nationale des Sciences et Techniques de la Communication), rattachée à l''UAC, à laquelle on accède sur concours, qui forme aux techniques de collecte, de vérification et de production de l''information : écriture journalistique, enquête, présentation radio et télévision. Tu y étudies le droit de la presse, les techniques rédactionnelles, la production audiovisuelle, et de plus en plus les nouveaux formats numériques (journalisme en ligne, réseaux sociaux). C''est une filière sélective et exigeante, qui forme des professionnels capables d''informer le public dans un paysage médiatique béninois en pleine mutation, entre presse écrite traditionnelle, chaînes de télévision, et explosion des médias numériques.',
  debouches = 'Pour qui ? Cette filière te convient si tu es curieux, tu aimes écrire et enquêter, et que tu veux informer le public à travers différents formats (presse écrite, radio, télévision, digital).

Le secteur qui recrute le plus aujourd''hui : les médias numériques et le community management, en pleine croissance à côté des médias traditionnels.

### Journaliste presse écrite, radio, télévision
Le débouché classique : reporter, présentateur ou rédacteur pour des journaux, radios ou chaînes de télévision béninoises, publiques comme privées.

### Journalisme en ligne
Un secteur en forte croissance : rédacteur pour des sites d''information ou des médias digitaux, qui prennent une place croissante dans le paysage médiatique béninois.

### Chargé de relations presse
Gérer la communication médiatique d''une entreprise, d''une institution ou d''une personnalité publique, en faisant le lien avec les journalistes.

### Community management et gestion de communauté virtuelle
Animer les réseaux sociaux d''un média ou d''une organisation, un métier hybride entre journalisme et communication digitale.

### Réalisation et production audiovisuelle
Pour ceux qui s''orientent vers l''image : réalisateur ou spécialiste multimédia, en charge de la production et post-production de contenus d''information.

### Gestion d''entreprise ou agence de presse
Avec l''expérience, diriger sa propre structure de presse ou une agence de communication médiatique.

### Évoluer dans sa carrière
Vers rédacteur en chef, directeur de publication, ou correspondant pour des médias internationaux.

### Poursuivre ses études
Master en Journalisme, en Communication, ou spécialisation en journalisme d''investigation ou en journalisme de données (data journalism), au Bénin ou dans des écoles de journalisme reconnues d''Afrique et d''Europe.'
WHERE slug = 'journalisme';

-- ---------- MÉTIERS DE L'AUDIOVISUEL ET DU MULTIMÉDIA (ENSTIC) ----------
UPDATE filieres SET
  description = 'La filière de Métiers de l''Audiovisuel et du Multimédia est une licence proposée par l''ENSTIC (École Nationale des Sciences et Techniques de la Communication), rattachée à l''UAC, qui forme aux techniques de production audiovisuelle et de création de contenus multimédias : prise de vue, montage, réalisation, production de contenus numériques. Tu y développes des compétences techniques (caméra, montage, son) associées à une compréhension des enjeux de communication et de diffusion. C''est une filière technique et créative, complémentaire du Journalisme au sein de la même école, mais davantage tournée vers la production de contenus que vers l''information journalistique elle-même.',
  debouches = 'Pour qui ? Cette filière te convient si tu es attiré par la technique de production audiovisuelle (caméra, montage, son) et que tu veux créer des contenus pour la télévision, le web ou les productions publicitaires.

Le secteur qui recrute le plus : la production de contenus vidéo pour le digital, en croissance constante avec l''essor des plateformes en ligne et des réseaux sociaux.

### Cadreur, monteur, technicien audiovisuel
Le débouché technique de base : intervenir sur des tournages et en post-production pour des chaînes de télévision, des studios de production, ou des agences de communication.

### Production de contenus pour le digital
Créer des vidéos pour des marques, des influenceurs ou des médias en ligne — un secteur en forte demande avec la digitalisation de la communication.

### Réalisation publicitaire et institutionnelle
Concevoir et produire des spots publicitaires ou des films institutionnels pour des entreprises et organisations.

### Technicien de studio (radio, web TV)
Un débouché stable dans les structures médiatiques : technicien pour des studios de web TV ou de web radio, un format en développement au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers réalisateur, directeur de production, ou fondateur d''un studio de production audiovisuelle indépendant.

### Poursuivre ses études
Master en Production Audiovisuelle, spécialisation en réalisation ou en production multimédia, au Bénin ou dans des écoles spécialisées d''Afrique et d''Europe.'
WHERE slug = 'metiers-de-laudiovisuel-et-du-multimedia';

-- ---------- ADMINISTRATION GÉNÉRALE (ENA) ----------
UPDATE filieres SET
  description = 'La filière d''Administration Générale est une licence proposée par l''ENA (École Nationale d''Administration), rattachée à l''UAC, qui forme aux métiers de l''administration publique béninoise : gestion administrative, procédures de l''État, coordination de services publics. Tu y étudies le droit administratif, la gestion des ressources publiques, et les procédures de fonctionnement de l''État. C''est la filière historique de formation des futurs cadres de l''administration béninoise, offrant un accès direct à la fonction publique via des concours dédiés — une voie recherchée pour sa stabilité et son prestige dans le contexte béninois.',
  debouches = 'Pour qui ? Cette filière te convient si tu vises une carrière dans l''administration publique, avec la stabilité de l''emploi et les responsabilités que cela implique, et que tu es prêt à passer des concours de la fonction publique.

Le secteur qui recrute le plus, sans surprise : la fonction publique béninoise, qui reste la voie de sortie quasi naturelle de cette filière.

### Attaché des affaires étrangères
Un débouché prestigieux : intégrer le corps diplomatique béninois après concours, avec des postes possibles dans les ambassades et représentations à l''international.

### Attaché des services administratifs
Le débouché le plus courant : occuper des postes de gestion administrative dans les ministères, préfectures et autres structures étatiques.

### Inspecteur du Travail et de la Sécurité Sociale
Un poste spécialisé de contrôle et de médiation dans les relations employeurs-employés, au sein du Ministère du Travail.

### Collectivités locales
Avec la décentralisation, des postes administratifs s''ouvrent aussi au sein des mairies et intercommunalités.

### Organisations internationales
Certains diplômés, notamment après une spécialisation, intègrent des organisations régionales ou internationales (CEDEAO, UEMOA, agences onusiennes).

### Évoluer dans sa carrière
Avec l''ancienneté et la réussite à des concours supérieurs, tu peux évoluer vers directeur de cabinet, secrétaire général d''une administration, ou haut fonctionnaire.

### Poursuivre ses études
Master en Administration Publique, ou concours de cycle supérieur de l''ENA pour accéder aux postes de haute administration.'
WHERE slug = 'administration-generale';

-- ---------- ADMINISTRATION DES FINANCES (ENA) ----------
UPDATE filieres SET
  description = 'La filière d''Administration des Finances est une licence proposée par l''ENA (École Nationale d''Administration), rattachée à l''UAC, qui forme aux métiers de la gestion financière publique : fiscalité, gestion budgétaire, marchés publics. Tu y étudies les finances publiques, le droit fiscal, et les procédures de gestion budgétaire de l''État et des collectivités locales. C''est une filière spécialisée qui prépare à des postes à forte responsabilité financière au sein de l''administration, un domaine sensible et stratégique puisqu''il touche directement à la gestion des ressources publiques du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux, méthodique, et que tu veux occuper des postes à responsabilité dans la gestion des finances publiques, un domaine sensible et valorisant au sein de l''administration.

Le secteur qui recrute le plus : les administrations financières de l''État (impôts, trésor, marchés publics).

### Attaché des services financiers dans les Impôts
Le débouché le plus direct : intégrer la Direction Générale des Impôts pour la gestion et le contrôle de la fiscalité, un poste stratégique pour les recettes de l''État.

### Attaché des services financiers dans les Collectivités locales
Gérer les finances d''une commune ou d''une préfecture, un enjeu croissant avec la décentralisation financière au Bénin.

### Gestion des marchés publics
Superviser la planification et le contrôle des marchés publics, un poste sensible qui exige rigueur et intégrité, essentiel à la bonne gestion des projets publics.

### Trésor public
Intégrer les services du Trésor pour la gestion de la comptabilité publique et des flux financiers de l''État.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers inspecteur des finances, directeur départemental des impôts, ou conseiller financier au sein d''un ministère.

### Poursuivre ses études
Master en Finances Publiques, en Fiscalité, ou en Administration Financière, avec possibilité de concours pour des postes de haute administration financière.'
WHERE slug = 'administration-des-finances';

-- ---------- SECRÉTARIAT DE GESTION (ENA) ----------
UPDATE filieres SET
  description = 'La filière de Secrétariat de Gestion est une licence proposée par l''ENA (École Nationale d''Administration), rattachée à l''UAC, qui forme aux fonctions d''organisation et de coordination administrative au sein d''une structure : gestion documentaire, organisation d''agendas, coordination de réunions, appui aux directions. Tu y étudies les techniques de gestion administrative, la bureautique avancée, et les bases du droit administratif. C''est une filière moins prestigieuse en apparence que l''Administration Générale, mais dont les débouchés sont concrets et immédiats : toute structure, publique comme privée, a besoin de personnes capables d''organiser efficacement son fonctionnement quotidien.',
  debouches = 'Pour qui ? Cette filière te convient si tu es organisé, rigoureux et à l''aise avec la gestion administrative au quotidien, et que tu veux un métier avec des débouchés rapides et concrets.

Le secteur qui recrute le plus : les services administratifs de l''État, mais aussi les entreprises privées qui ont besoin de fonctions de secrétariat qualifié.

### Attaché des services administratifs (Secrétariat et Gestion)
Le débouché principal : assurer l''organisation administrative d''un service ou d''une direction, dans une administration publique ou une grande entreprise.

### Assistanat de direction
Accompagner un dirigeant ou une direction dans la gestion de son emploi du temps, de sa correspondance, et de ses dossiers, un poste à forte responsabilité malgré son intitulé.

### Gestion documentaire et archivage
Organiser et sécuriser les documents administratifs d''une structure, un enjeu croissant avec la digitalisation des archives.

### Secteur privé
Les entreprises de toute taille recherchent des profils formés à la gestion administrative rigoureuse, notamment dans les PME qui n''ont pas de service dédié.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable administratif, chef de bureau, ou assistant de direction générale.

### Poursuivre ses études
Master en Gestion Administrative, ou spécialisation en Management des Organisations pour évoluer vers des postes de coordination plus larges.'
WHERE slug = 'secretariat-de-gestion';

-- ---------- SCIENCES ET TECHNIQUES DE L'INFORMATION DOCUMENTAIRE (ENA) ----------
UPDATE filieres SET
  description = 'La filière de Sciences et Techniques de l''Information documentaire est une licence proposée par l''ENA (École Nationale d''Administration), rattachée à l''UAC, qui forme aux métiers de la gestion documentaire et archivistique : classement, conservation, indexation et diffusion de documents et d''archives. Tu y étudies les techniques d''archivage, la gestion des bibliothèques et centres de documentation, et de plus en plus les outils numériques de gestion de l''information. C''est une filière de niche mais essentielle : toute institution qui produit et conserve des documents (administrations, entreprises, ONG) a besoin de professionnels capables d''organiser cette information de façon fiable et accessible.',
  debouches = 'Pour qui ? Cette filière te convient si tu es méthodique, tu aimes organiser et classer l''information, et que tu veux un métier de niche mais stable, essentiel au bon fonctionnement de toute grande organisation.

Le secteur qui recrute le plus : les administrations publiques et les grandes institutions, qui ont besoin de professionnels pour structurer leurs archives et centres de documentation.

### Technicien supérieur en archivistique
Le débouché principal : organiser, classer et conserver les archives d''une administration, d''une entreprise ou d''une institution publique.

### Technicien supérieur documentaliste
Gérer un centre de documentation ou une bibliothèque spécialisée, en assurant l''indexation et l''accessibilité des ressources documentaires.

### Gestion électronique de documents
Un débouché en croissance avec la digitalisation : mise en place de systèmes numériques de gestion documentaire pour des institutions publiques et privées.

### ONG et organisations internationales
Ces structures, qui produisent beaucoup de rapports et documents de projets, recrutent aussi des profils formés à la gestion documentaire.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un service d''archives, chef de projet de numérisation documentaire, ou consultant en gestion de l''information.

### Poursuivre ses études
Master en Sciences de l''Information et des Bibliothèques, ou en Archivistique, avec des poursuites possibles à l''international dans ce domaine spécialisé.'
WHERE slug = 'sciences-et-techniques-de-linformation-documentaire';


-- ================================================================
-- >>> FICHIER SOURCE : 10_uac_lot7_fsa_fss.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 7 : FSA (Sciences Agronomiques), FSS (Sciences de la Santé)
-- ============================================================

-- ---------- SCIENCES ET TECHNIQUES DE PRODUCTION VÉGÉTALE (FSA) ----------
UPDATE filieres SET
  description = 'La filière de Sciences et Techniques de Production Végétale est une licence proposée par la FSA (Faculté des Sciences Agronomiques), rattachée à l''UAC, qui forme aux techniques modernes de culture : sélection variétale, itinéraires techniques, protection des cultures, gestion de la fertilité des sols. Tu y étudies l''agronomie appliquée, la phytopathologie, et les pratiques agricoles adaptées au contexte tropical béninois. C''est une filière au cœur des enjeux de souveraineté alimentaire du pays : améliorer les rendements agricoles tout en préservant les sols, dans un contexte où l''agriculture reste le premier secteur d''emploi du Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler concrètement sur l''amélioration de l''agriculture béninoise, entre le terrain et le conseil technique aux producteurs.

Le secteur qui recrute le plus : les projets d''appui agricole et les coopératives, qui ont besoin de techniciens capables de conseiller les producteurs sur le terrain.

### Entrepreneuriat agricole
Un débouché de plus en plus valorisé : créer ou gérer sa propre exploitation agricole en appliquant des techniques modernes de production végétale.

### Contrôle de qualité des cultures
Travailler pour des structures de certification ou d''exportation, en veillant à la qualité et à la conformité des productions végétales.

### Technicien en gestion et conservation
Accompagner les producteurs dans la gestion post-récolte et la conservation des cultures, un enjeu majeur pour réduire les pertes agricoles au Bénin.

### Conseil agricole et vulgarisation
Intervenir auprès des exploitations agricoles pour diffuser les bonnes pratiques, souvent au sein de structures publiques (CARDER) ou d''ONG agricoles.

### Recherche agronomique
Pour ceux qui veulent approfondir : rejoindre des instituts de recherche agricole (INRAB) travaillant sur l''amélioration des variétés et des pratiques culturales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une coopérative agricole, chef de projet agricole pour une ONG, ou exploitant agricole reconnu.

### Poursuivre ses études
Master en Agronomie, en Production Végétale, ou en Amélioration des Plantes, au Bénin ou dans des écoles agronomiques régionales.'
WHERE slug = 'sciences-et-techniques-de-production-vegetale';

-- ---------- SCIENCES ET TECHNIQUES DE PRODUCTION ANIMALE (FSA) ----------
UPDATE filieres SET
  description = 'La filière de Sciences et Techniques de Production Animale est une licence proposée par la FSA (Faculté des Sciences Agronomiques), rattachée à l''UAC, qui forme à l''élevage moderne : alimentation animale, reproduction, santé du bétail, gestion des exploitations d''élevage (bovins, volailles, petits ruminants). Tu y étudies la zootechnie, la nutrition animale, et les bases de la santé vétérinaire appliquée. C''est une filière stratégique pour le développement de l''élevage béninois, un secteur en croissance face à la demande croissante en produits animaux (viande, lait, œufs) d''une population urbaine en expansion.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à l''élevage et à la santé animale, et que tu veux contribuer au développement d''un secteur en croissance au Bénin.

Le secteur qui recrute le plus : les exploitations d''élevage et les laboratoires liés à la santé animale, en particulier dans les filières avicole et bovine.

### Technicien de laboratoire vétérinaire
Un débouché technique : analyses de laboratoire liées à la santé animale, pour des structures publiques ou des cliniques vétérinaires.

### Technicien en conduite et gestion des élevages
Le débouché le plus direct : accompagner des exploitations d''élevage dans l''optimisation de leur production (alimentation, reproduction, santé du cheptel).

### Technicien en zootechnie
Un rôle de conseil technique auprès des éleveurs, souvent pour des structures publiques d''appui agricole ou des coopératives d''éleveurs.

### Industries agroalimentaires liées à l''élevage
Travailler pour des entreprises de transformation de produits animaux (viande, lait, œufs), un secteur en structuration au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une exploitation d''élevage, chef de projet dans une filière animale, ou consultant en zootechnie.

### Poursuivre ses études
Master en Zootechnie, en Production Animale, ou passerelle vers les études vétérinaires via l''EISMV de Dakar.'
WHERE slug = 'sciences-et-techniques-de-production-animale';

-- ---------- AMÉNAGEMENT ET GESTION DES FORÊTS ET PARCOURS NATURELS (FSA) ----------
UPDATE filieres SET
  description = 'La filière d''Aménagement et Gestion des Forêts et Parcours Naturels est une licence proposée par la FSA (Faculté des Sciences Agronomiques), rattachée à l''UAC, qui forme à la gestion durable des ressources forestières et des espaces naturels : inventaire forestier, plans d''aménagement, lutte contre la déforestation. Tu y étudies la foresterie, l''écologie appliquée, et les techniques de gestion des espaces naturels protégés. C''est une filière essentielle face aux enjeux de préservation des forêts béninoises, menacées par la déforestation et l''expansion agricole, dans un contexte de changement climatique qui rend cette gestion durable de plus en plus urgente.',
  debouches = 'Pour qui ? Cette filière te convient si la préservation des ressources naturelles et de l''environnement te tient à cœur, et que tu veux travailler concrètement sur la gestion des forêts et espaces naturels béninois.

Le secteur qui recrute le plus : les structures publiques et internationales de gestion environnementale, face à l''urgence de la préservation forestière.

### Gestionnaire des forêts et parcours naturels
Le débouché principal : gérer et surveiller des espaces forestiers ou des aires protégées, pour des structures publiques comme l''Office National du Bois ou des ONG environnementales.

### Inventaire forestier
Réaliser des relevés et inventaires des ressources forestières, une donnée essentielle pour la planification de leur exploitation durable.

### Plans d''aménagement forestier
Concevoir des documents de planification pour une gestion équilibrée entre exploitation et préservation des forêts.

### ONG et projets de conservation
De nombreuses organisations internationales financent des projets de préservation forestière au Bénin, avec des postes de terrain pour les diplômés de cette filière.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''une réserve forestière, chef de projet de reboisement, ou expert en gestion durable des forêts.

### Poursuivre ses études
Master en Foresterie, en Gestion des Ressources Naturelles, ou en Écologie Appliquée, au Bénin ou dans des écoles forestières régionales.'
WHERE slug = 'amenagement-et-gestion-des-forets-et-parcours-naturels';

-- ---------- GÉNIE RURAL, MÉCANISATION AGRICOLE, PÊCHE ET AQUACULTURE (FSA) ----------
UPDATE filieres SET
  description = 'La filière de Génie Rural, Mécanisation Agricole, Pêche et Aquaculture est une licence proposée par la FSA (Faculté des Sciences Agronomiques), rattachée à l''UAC, qui forme à la modernisation technique de l''agriculture : irrigation, mécanisation des exploitations, aménagements hydro-agricoles, et développement de l''aquaculture. Tu y étudies le génie rural, les techniques d''irrigation, et les bases de la production piscicole. C''est une filière technique et polyvalente, à la croisée de l''ingénierie et de l''agriculture, qui répond à un double enjeu béninois : moderniser une agriculture encore largement manuelle, et développer l''aquaculture comme alternative à une pêche traditionnelle en tension.',
  debouches = 'Pour qui ? Cette filière te convient si tu es intéressé par la technique appliquée à l''agriculture (machines, irrigation) autant que par le développement de l''aquaculture, un secteur en pleine expansion.

Le secteur qui recrute le plus : les projets d''aménagement de périmètres irrigués et le développement de l''aquaculture, deux domaines soutenus par l''État et les bailleurs internationaux.

### Périmètres irrigués
Le débouché principal : concevoir et gérer des systèmes d''irrigation pour des exploitations agricoles, un enjeu clé pour sécuriser les productions face aux aléas climatiques.

### Aquaculture des pêches
Développer et gérer des fermes piscicoles, un secteur en forte croissance face à la pression sur les ressources halieutiques naturelles du Bénin.

### Mécanisation agricole
Accompagner les exploitations dans l''adoption d''équipements mécanisés, encore peu répandus dans l''agriculture béninoise mais en développement.

### Concepteur de fermes piscicoles
Un métier plus spécialisé : conception technique de structures d''aquaculture pour des entreprises ou des coopératives de pêcheurs.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''un grand périmètre irrigué, chef de projet aquacole, ou consultant en génie rural.

### Poursuivre ses études
Master en Génie Rural, en Aquaculture, ou en Gestion des Ressources Halieutiques, au Bénin ou dans des écoles spécialisées régionales.'
WHERE slug = 'genie-rural-mecanisation-agricole-peche-et-aquaculture';

-- ---------- NUTRITION ET TECHNOLOGIE ALIMENTAIRES (FSA) ----------
UPDATE filieres SET
  description = 'La filière de Nutrition et Technologie Alimentaires est une licence proposée par la FSA (Faculté des Sciences Agronomiques), rattachée à l''UAC, qui forme aux enjeux de la transformation et de la valorisation nutritionnelle des produits agricoles : techniques de transformation alimentaire, conservation, contrôle qualité, et éducation nutritionnelle. Tu y étudies la biochimie alimentaire, les procédés de transformation, et les bases de la nutrition humaine. C''est une filière charnière entre l''agriculture et la santé, essentielle dans un pays où la transformation locale des produits agricoles reste un levier majeur de développement économique et de lutte contre la malnutrition.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la fois à l''agriculture et à la santé, en particulier à la façon dont les aliments sont transformés et valorisés du champ à l''assiette.

Le secteur qui recrute le plus : les industries agroalimentaires locales, en croissance avec la volonté nationale de transformer davantage les produits agricoles sur place plutôt que de les exporter bruts.

### Technique de diététique
Le débouché lié à la santé : accompagner des patients ou des programmes de nutrition dans des hôpitaux, centres de santé ou industries agroalimentaires.

### Industries agroalimentaires
Travailler dans la transformation des produits agricoles (farines, jus, produits laitiers), un secteur en pleine structuration au Bénin.

### Contrôle qualité alimentaire
Veiller à la conformité et à la sécurité sanitaire des produits alimentaires, pour des industries ou des structures de certification.

### Nutrition dans les hôpitaux et centres de santé
Intervenir dans des programmes de lutte contre la malnutrition, en particulier infantile, en lien avec des structures de santé publique ou des ONG.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable qualité d''une industrie agroalimentaire, chef de projet nutrition pour une ONG, ou consultant en technologie alimentaire.

### Poursuivre ses études
Master en Nutrition, en Technologie Alimentaire, ou en Sécurité Sanitaire des Aliments.'
WHERE slug = 'nutrition-et-technologie-alimentaires';

-- ---------- AGROÉCONOMIE, SOCIOLOGIE ET VULGARISATION RURALES (FSA) ----------
UPDATE filieres SET
  description = 'La filière d''Agroéconomie, Sociologie et Vulgarisation Rurales est une licence proposée par la FSA (Faculté des Sciences Agronomiques), rattachée à l''UAC, qui forme à la dimension économique et sociale de l''agriculture : analyse des filières agricoles, accompagnement des producteurs, diffusion des innovations techniques auprès des communautés rurales. Tu y étudies l''économie agricole, la sociologie rurale, et les méthodes de vulgarisation agricole (comment transmettre efficacement des savoirs techniques aux agriculteurs). C''est une filière qui fait le pont entre la technique agricole et les réalités humaines et économiques du monde rural béninois, un profil essentiel pour que les innovations agricoles soient réellement adoptées sur le terrain.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux comprendre les réalités économiques et sociales du monde agricole béninois, et jouer un rôle de pont entre la recherche technique et les producteurs sur le terrain.

Le secteur qui recrute le plus : les structures de vulgarisation agricole et les projets de développement rural, très présents au Bénin.

### Entreprise et ferme agricole
Un débouché direct : accompagner la gestion économique d''exploitations agricoles, en apportant une expertise en analyse de filières et rentabilité.

### Structures de recherche et vulgarisation
Le débouché le plus caractéristique de cette filière : travailler pour des structures comme le CARDER, chargées de diffuser les innovations agricoles auprès des producteurs.

### Enseignement dans les lycées agricoles
Transmettre les bases de l''agroéconomie et de la sociologie rurale aux futurs techniciens agricoles, dans les établissements techniques.

### ONG de développement rural
Coordonner des projets d''appui aux producteurs, en intégrant les dimensions économiques, sociales et techniques du développement agricole.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable régional de vulgarisation agricole, chef de projet de développement rural, ou consultant en économie agricole.

### Poursuivre ses études
Master en Économie Agricole, en Sociologie Rurale, ou en Développement Rural.'
WHERE slug = 'agroeconomie-sociologie-et-vulgarisation-rurales';

-- ---------- ENTREPRENARIAT AGRICOLE (FSA) ----------
UPDATE filieres SET
  description = 'La filière d''Entreprenariat Agricole est une licence proposée par la FSA (Faculté des Sciences Agronomiques), rattachée à l''UAC, qui forme spécifiquement à la création et à la gestion d''entreprises dans le secteur agricole. Tu y étudies les techniques agronomiques de base, complétées par une solide formation en gestion d''entreprise, en business plan et en accès au financement agricole. C''est une filière pensée pour former non pas des techniciens salariés, mais des porteurs de projets capables de monter leur propre exploitation ou entreprise agricole, dans un contexte béninois où l''auto-emploi agricole est à la fois une nécessité économique et une opportunité de développement.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux devenir ton propre patron dans le secteur agricole, avec l''ambition de monter et développer ta propre exploitation ou entreprise agricole.

Le secteur qui recrute le plus : en réalité, cette filière prépare davantage à l''auto-emploi qu''à un poste salarié classique — c''est sa spécificité et son objectif assumé.

### Gestionnaire de ferme
Le débouché principal : créer et diriger sa propre exploitation agricole, en appliquant à la fois des compétences techniques et de gestion d''entreprise.

### Entrepreneuriat dans la transformation agroalimentaire
Développer une petite entreprise de transformation de produits agricoles (jus, farines, produits séchés), un secteur porteur au Bénin.

### Accompagnement à l''entrepreneuriat agricole
Pour ceux qui préfèrent le conseil : accompagner d''autres porteurs de projets agricoles, au sein de structures d''incubation ou de microfinance agricole.

### Accès au financement et montage de projets
Un savoir-faire clé de cette filière : monter des dossiers de financement pour des projets agricoles, auprès de banques, d''IMF ou de bailleurs internationaux.

### Évoluer dans sa carrière
Avec la réussite de ton entreprise, tu peux évoluer vers dirigeant d''une exploitation de taille croissante, ou vers la diversification de tes activités agricoles.

### Poursuivre ses études
Master en Entrepreneuriat Agricole, ou formations spécialisées en gestion d''entreprise et financement agricole, au Bénin ou via des programmes d''incubation internationaux.'
WHERE slug = 'entreprenariat-agricole';

-- ---------- MÉDECINE GÉNÉRALE (FSS) ----------
UPDATE filieres SET
  description = 'La filière de Médecine Générale est une licence (premier cycle d''un parcours plus long) proposée par la FSS (Faculté des Sciences de la Santé), rattachée à l''UAC, qui forme les futurs médecins. Tu y étudies l''anatomie, la physiologie, la pathologie et les bases cliniques de la médecine, avant de te spécialiser lors des cycles supérieurs. C''est la filière la plus longue et la plus exigeante de cette liste : au-delà de la licence, il faut poursuivre plusieurs années supplémentaires pour devenir médecin praticien. L''accès y est très sélectif et la formation exige un engagement personnel considérable, mais elle mène à l''un des métiers les plus valorisés et les plus recherchés du système de santé béninois.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une vocation forte pour la médecine, une grande capacité de travail sur le long terme, et que tu es prêt à un parcours d''études long (bien au-delà de la licence) avant d''exercer.

Le secteur qui recrute le plus, avec une pénurie chronique au Bénin : la médecine générale dans les hôpitaux et centres de santé publics et privés.

### Médecin généraliste
Le débouché final de ce long parcours : exercer en tant que médecin généraliste dans un hôpital, un centre de santé, ou en cabinet privé — un métier avec une forte demande dans tout le pays.

### Spécialisations médicales
Après le cycle de médecine générale, poursuite possible vers de nombreuses spécialités (chirurgie, pédiatrie, gynécologie, cardiologie...) via des concours d''internat.

### Médecine communautaire et rurale
Le Bénin manque particulièrement de médecins dans les zones rurales : un engagement dans ces régions offre souvent des conditions d''installation facilitées.

### Santé publique et administration sanitaire
Certains médecins évoluent vers des fonctions de gestion de la santé publique, au sein de directions départementales de la santé ou d''organisations internationales.

### Recherche médicale
Pour ceux qui s''orientent vers l''académique : intégrer des programmes de recherche clinique, souvent en lien avec des partenariats internationaux.

### Évoluer dans sa carrière
Avec l''expérience et la spécialisation, tu peux évoluer vers chef de service hospitalier, professeur de médecine, ou praticien reconnu dans une spécialité.

### Poursuivre ses études
Poursuite obligatoire au-delà de la licence : cycle clinique complet, puis internat pour se spécialiser, sur plusieurs années supplémentaires.'
WHERE slug = 'medecine-generale';

-- ---------- PHARMACIE (FSS) ----------
UPDATE filieres SET
  description = 'La filière de Pharmacie est une licence (premier cycle) proposée par la FSS (Faculté des Sciences de la Santé), rattachée à l''UAC, qui forme les futurs pharmaciens. Tu y étudies la chimie pharmaceutique, la pharmacologie, et les bases de la dispensation des médicaments, avant de poursuivre vers un cycle plus long pour obtenir le diplôme d''État de pharmacien. C''est une filière exigeante scientifiquement, qui allie chimie, biologie et connaissance approfondie des médicaments, avec un rôle essentiel dans la chaîne de santé béninoise : le pharmacien est souvent le premier interlocuteur de santé accessible pour la population.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en sciences (chimie, biologie) et que tu veux exercer un métier de santé au contact direct du public, avec un rôle de conseil essentiel dans l''accès aux médicaments.

Le secteur qui recrute le plus : les officines pharmaceutiques, présentes dans toutes les villes du pays.

### Pharmacien titulaire ou assistant d''officine
Le débouché le plus courant : exercer en pharmacie, dispenser des médicaments et conseiller les patients, avec la possibilité à terme d''ouvrir sa propre officine.

### Spécialisations en sciences de la santé, option pharmacie
Après le premier cycle, poursuite possible vers des spécialisations en pharmacie hospitalière, industrie pharmaceutique, ou biologie médicale.

### Industrie pharmaceutique
Travailler pour des laboratoires ou des distributeurs de médicaments, dans des fonctions de contrôle qualité, de production ou commerciales.

### Pharmacie hospitalière
Gérer l''approvisionnement et la dispensation des médicaments au sein d''un hôpital, un rôle stratégique pour la bonne prise en charge des patients.

### Santé publique et régulation pharmaceutique
Certains pharmaciens évoluent vers des fonctions de contrôle et de régulation du médicament, au sein d''agences publiques de santé.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers propriétaire de ta propre officine, responsable pharmaceutique d''un hôpital, ou cadre dans l''industrie pharmaceutique.

### Poursuivre ses études
Poursuite obligatoire vers le diplôme d''État de pharmacien, avec possibilité de spécialisation complémentaire.'
WHERE slug = 'pharmacie';

-- ---------- KINÉSITHÉRAPIE (FSS) ----------
UPDATE filieres SET
  description = 'La filière de Kinésithérapie est une licence proposée par la FSS (Faculté des Sciences de la Santé), rattachée à l''UAC, qui forme aux techniques de rééducation physique et de traitement des troubles musculo-squelettiques. Tu y étudies l''anatomie, la physiologie du mouvement, et les techniques de massage et de rééducation fonctionnelle. C''est une filière paramédicale exigeante, à la fois scientifique et manuelle, qui prépare à accompagner des patients dans leur récupération physique après une blessure, une opération, ou dans le cadre de maladies chroniques.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler au contact direct des patients dans un rôle de soin manuel et de rééducation, avec une bonne compréhension du corps humain et de ses mouvements.

Le secteur qui recrute le plus : les hôpitaux et centres de rééducation, avec une demande croissante liée à l''augmentation des accidents et maladies chroniques.

### Kinésithérapeute en hôpital ou centre de santé
Le débouché principal : accompagner la rééducation de patients après une opération, un accident, ou dans le cadre de pathologies chroniques (arthrose, AVC).

### Spécialisations en sciences de la santé, option kinésithérapie
Après la licence, poursuite possible vers des spécialisations (kinésithérapie sportive, pédiatrique, respiratoire).

### Cabinet privé
Comme pour d''autres professions paramédicales, l''exercice en cabinet indépendant est une voie fréquente après quelques années d''expérience hospitalière.

### Kinésithérapie sportive
Un débouché spécifique pour ceux qui s''intéressent au sport : accompagner des athlètes dans leur préparation physique et leur récupération après blessure.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers kinésithérapeute référent d''un service hospitalier, ou fondateur de ton propre cabinet.

### Poursuivre ses études
Spécialisations complémentaires en kinésithérapie sportive, pédiatrique, ou respiratoire, au Bénin ou à l''international.'
WHERE slug = 'kinesitherapie';

-- ---------- ASSISTANCE SOCIALE (FSS) ----------
UPDATE filieres SET
  description = 'La filière d''Assistance sociale est une licence proposée par la FSS (Faculté des Sciences de la Santé), rattachée à l''UAC, qui forme aux métiers de l''accompagnement social des personnes en difficulté : familles en précarité, personnes malades, personnes en situation de handicap. Tu y étudies le travail social, la psychologie sociale, et les dispositifs d''aide et de protection sociale existants au Bénin. C''est une filière humaine et engagée, à la croisée du social et du sanitaire, qui prépare à accompagner concrètement des personnes vulnérables dans leurs démarches et leur quotidien.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une forte envie d''aider les personnes en difficulté, que tu es à l''écoute, et que tu veux exercer un métier engagé sur le plan humain et social.

Le secteur qui recrute le plus : les hôpitaux et centres de santé, où l''accompagnement social des patients est de plus en plus reconnu comme essentiel.

### Technicien supérieur de l''action sociale
Le débouché principal : accompagner des patients ou des familles en difficulté au sein d''un hôpital, d''un centre de santé, ou d''un service social communal.

### ONG et associations d''aide sociale
Travailler pour des structures associatives ou humanitaires accompagnant des publics vulnérables (enfants, personnes âgées, personnes handicapées).

### Protection de l''enfance
Un secteur spécifique en développement : accompagnement social des enfants en difficulté ou en situation de vulnérabilité familiale.

### Institutions publiques de protection sociale
Intégrer des services étatiques en charge des politiques sociales et de la protection des populations vulnérables.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un service social hospitalier, coordinateur de programme social pour une ONG, ou cadre dans une institution de protection sociale.

### Poursuivre ses études
Master en Travail Social, en Santé Publique, ou en Politiques Sociales.'
WHERE slug = 'assistance-sociale';

-- ---------- NUTRITION ET DIÉTÉTIQUE (FSS) ----------
UPDATE filieres SET
  description = 'La filière de Nutrition et Diététique est une licence proposée par la FSS (Faculté des Sciences de la Santé), rattachée à l''UAC, qui forme aux métiers de la nutrition clinique : élaboration de régimes alimentaires adaptés, prévention et prise en charge de la malnutrition, conseil nutritionnel. Tu y étudies la biochimie de la nutrition, les pathologies liées à l''alimentation, et les techniques de conseil diététique. C''est une filière de santé appliquée à l''alimentation, particulièrement pertinente dans un pays confronté à la fois à la malnutrition infantile et à la montée des maladies liées à une alimentation déséquilibrée (diabète, obésité).',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler à la croisée de la santé et de l''alimentation, en accompagnant des patients ou des populations vers de meilleures pratiques nutritionnelles.

Le secteur qui recrute le plus : les hôpitaux et formations sanitaires, où la prise en charge nutritionnelle des patients est de plus en plus intégrée aux soins.

### Nutrition dans les hôpitaux et formations sanitaires
Le débouché principal : accompagner la prise en charge nutritionnelle de patients hospitalisés, notamment pour des pathologies chroniques (diabète, insuffisance rénale).

### Programme de nutrition
Coordonner des programmes de lutte contre la malnutrition infantile, souvent pour des structures publiques ou des ONG internationales (UNICEF, PAM).

### Consultant en nutrition et diététique
Accompagner des particuliers dans l''élaboration de régimes alimentaires adaptés, en cabinet privé ou en tant qu''indépendant.

### Industries agroalimentaires
Un débouché émergent : conseiller des entreprises agroalimentaires sur la composition nutritionnelle de leurs produits.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un service de nutrition hospitalier, coordinateur de programme de nutrition pour une organisation internationale, ou consultant reconnu.

### Poursuivre ses études
Master en Nutrition Humaine, en Santé Publique, ou en Nutrition et Sécurité Alimentaire.'
WHERE slug = 'nutrition-et-dietetique';

-- ---------- ANALYSE BIOMÉDICALE (FSS) ----------
UPDATE filieres SET
  description = 'La filière d''Analyse Biomédicale est une licence proposée par la FSS (Faculté des Sciences de la Santé), rattachée à l''UAC, qui forme aux techniques de laboratoire médical : analyses sanguines, microbiologiques et biochimiques, essentielles au diagnostic des maladies. Tu y étudies la biologie médicale, les techniques d''analyse de laboratoire, et le contrôle qualité des examens biomédicaux. C''est une filière technique et scientifique, en coulisses du parcours de soin : les techniciens de laboratoire produisent les résultats sur lesquels s''appuient les médecins pour établir leurs diagnostics, un maillon essentiel mais souvent moins visible du système de santé.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux, précis, et que tu préfères le travail de laboratoire (analyses, manipulations techniques) au contact direct et permanent avec les patients.

Le secteur qui recrute le plus : les laboratoires d''analyses médicales, publics comme privés, présents dans tous les centres de santé du pays.

### Technicien de laboratoire des centres de santé
Le débouché principal : réaliser des analyses médicales (sang, urines, prélèvements) dans un hôpital, une clinique, ou un laboratoire d''analyses indépendant.

### Assistant de recherche
Travailler dans des laboratoires de recherche biomédicale, souvent en lien avec des programmes de recherche sur les maladies tropicales ou infectieuses.

### Contrôle qualité en laboratoire
Veiller à la fiabilité des analyses réalisées, un rôle essentiel pour garantir des diagnostics médicaux fiables.

### Laboratoires privés indépendants
Avec l''expérience, possibilité de travailler ou même de créer son propre laboratoire d''analyses médicales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un laboratoire d''analyses, superviseur technique, ou chercheur en biologie médicale.

### Poursuivre ses études
Master en Biologie Médicale, en Sciences Biomédicales, ou spécialisation en microbiologie ou biochimie clinique.'
WHERE slug = 'analyse-biomedicale';


-- ================================================================
-- >>> FICHIER SOURCE : 11_uac_lot8_ine_epac_ceforp_herci_injeps.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 8 : INE, EPAC, CEFORP, HERCI, INJEPS (22 filières)
-- ============================================================

-- ---------- HYDROGÉOLOGIE ET GESTION INTÉGRÉE DES RESSOURCES (INE) ----------
UPDATE filieres SET
  description = 'La filière d''Hydrogéologie et Gestion intégrée des Ressources est une licence proposée par l''INE (Institut National de l''Eau), rattaché à l''UAC, qui forme à l''étude des eaux souterraines : localisation des nappes phréatiques, forage, gestion durable des ressources en eau. Tu y étudies la géologie, l''hydrogéologie, et les techniques d''exploration et de gestion des eaux souterraines. C''est une filière stratégique pour un pays où l''accès à l''eau potable reste un enjeu majeur, en particulier dans les zones rurales dépendantes des forages.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses aux sciences de la terre appliquées à une ressource vitale : l''eau souterraine, dont dépend une large partie de la population béninoise.

Le secteur qui recrute le plus : les projets d''accès à l''eau potable, financés par l''État et de nombreux bailleurs internationaux au Bénin.

### Hydrogéologue et hydrologue
Le débouché principal : localiser et évaluer les ressources en eaux souterraines pour des projets de forage, publics ou privés.

### Chimiste des eaux et contrôle de qualité
Analyser la qualité de l''eau destinée à la consommation, un enjeu sanitaire essentiel pour les structures publiques et privées de distribution d''eau.

### Ecohydrologie
Un domaine plus spécialisé, à la croisée de l''hydrologie et de l''écologie, pour comprendre les interactions entre eau et écosystèmes.

### Contrôleur de qualité hygiénique
Veiller aux normes sanitaires des points d''eau, notamment dans le cadre de programmes publics d''approvisionnement rural.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un programme d''hydraulique villageoise, expert en ressources en eau, ou consultant pour des ONG spécialisées.

### Poursuivre ses études
Master en Hydrogéologie, en Gestion des Ressources en Eau, ou en Sciences de l''Environnement.'
WHERE slug = 'hydrogeologie-et-gestion-integree-des-ressources';

-- ---------- ECOHYDROLOGIE ET GESTION INTÉGRÉE DES RESSOURCES (INE) ----------
UPDATE filieres SET
  description = 'La filière d''Ecohydrologie et Gestion intégrée des Ressources est une licence proposée par l''INE (Institut National de l''Eau), rattaché à l''UAC, qui forme à l''étude des interactions entre l''eau et les écosystèmes : zones humides, cours d''eau, lacs, dans une perspective de préservation environnementale. Tu y étudies l''écologie aquatique, l''hydrologie, et les méthodes de gestion durable des écosystèmes liés à l''eau. C''est une filière au croisement de l''environnement et des sciences de l''eau, pertinente pour la préservation des zones humides béninoises (lac Nokoué, lagunes côtières) menacées par la pollution et le changement climatique.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux allier sciences de l''eau et préservation des écosystèmes naturels, dans un pays riche en zones humides fragiles.

Le secteur qui recrute le plus : les projets de préservation des écosystèmes aquatiques, financés par des ONG environnementales et des bailleurs internationaux.

### Ecohydrologue
Le débouché principal : étudier et proposer des solutions pour préserver les écosystèmes liés à l''eau (lacs, lagunes, zones humides) face aux pressions environnementales.

### Hydrologue et hydrogéologue
Comme pour la filière voisine, un débouché large en gestion des ressources en eau, avec ici une orientation plus environnementale.

### Contrôleur de qualité hygiénique des milieux aquatiques
Surveiller la qualité de l''eau dans les écosystèmes naturels, en lien avec les enjeux de santé publique et de biodiversité.

### ONG environnementales et projets internationaux
De nombreuses organisations financent des projets de restauration de zones humides au Bénin, recrutant des profils formés à cette filière.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de programme de préservation des écosystèmes aquatiques, ou expert en gestion intégrée des ressources en eau.

### Poursuivre ses études
Master en Ecohydrologie, en Écologie Aquatique, ou en Gestion des Zones Humides.'
WHERE slug = 'ecohydrologie-et-gestion-integree-des-ressources';

-- ---------- GESTION DES CRISES ET RISQUES LIÉS À L'EAU ET AU CLIMAT (INE) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des crises et risques liés à l''eau et au climat est une licence proposée par l''INE (Institut National de l''Eau), rattaché à l''UAC, qui forme à l''anticipation et la gestion des risques liés à l''eau : inondations, sécheresses, pénuries. Tu y étudies l''hydrologie appliquée à la gestion des risques, les systèmes d''alerte précoce, et les stratégies d''adaptation climatique. C''est une filière stratégique dans un contexte de changement climatique où le Bénin est de plus en plus exposé à des événements extrêmes (inondations récurrentes, notamment dans les zones lagunaires et le nord du pays).',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur l''anticipation et la gestion des catastrophes liées à l''eau, un enjeu de plus en plus critique avec le changement climatique.

Le secteur qui recrute le plus : les structures publiques et internationales de gestion des risques et catastrophes, en renforcement constant au Bénin.

### Hydrologue et hydrogéologue spécialisé en gestion des risques
Le débouché principal : analyser les risques d''inondation ou de sécheresse pour anticiper et limiter leur impact sur les populations.

### Contrôleur des travaux d''assainissement de base
Superviser des projets d''assainissement visant à limiter les risques d''inondation en milieu urbain.

### Auto-emploi en conseil environnemental
Un débouché pour les profils entrepreneurs : conseil indépendant pour des collectivités ou entreprises sur la gestion des risques liés à l''eau.

### Contrôleur du génie rural
Un poste technique lié à la sécurisation des infrastructures rurales face aux risques climatiques et hydriques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de la gestion des risques pour une agence publique, ou expert en résilience climatique pour une organisation internationale.

### Poursuivre ses études
Master en Gestion des Risques et Catastrophes, en Hydrologie Appliquée, ou en Adaptation au Changement Climatique.'
WHERE slug = 'gestion-des-crises-et-risques-lies-a-leau-et-au-climat';

-- ---------- GÉNIE RURAL ET MAÎTRISE DE L'EAU (INE) ----------
UPDATE filieres SET
  description = 'La filière de Génie rural et Maîtrise de l''Eau est une licence proposée par l''INE (Institut National de l''Eau), rattaché à l''UAC, qui forme à l''aménagement hydraulique en milieu rural : irrigation, drainage, aménagements agricoles liés à l''eau. Tu y étudies le génie rural, l''hydraulique agricole, et les techniques d''aménagement de périmètres irrigués. C''est une filière technique appliquée au monde agricole, essentielle pour sécuriser les productions face aux aléas climatiques et améliorer la maîtrise de l''eau dans les exploitations rurales béninoises.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux allier ingénierie de l''eau et agriculture, en contribuant concrètement à sécuriser les productions rurales grâce à une meilleure maîtrise de l''eau.

Le secteur qui recrute le plus : les projets d''aménagement hydro-agricole, soutenus par l''État et les bailleurs internationaux pour renforcer la sécurité alimentaire.

### Hydrologue et hydrogéologue en milieu rural
Le débouché principal : concevoir des solutions de maîtrise de l''eau adaptées aux exploitations agricoles (irrigation, drainage).

### Contrôleur des travaux d''assainissement de base
Superviser les infrastructures d''assainissement en milieu rural, en lien avec les enjeux agricoles et sanitaires.

### Auto-emploi en aménagement hydro-agricole
Créer sa propre activité de conseil ou de réalisation de petits aménagements hydrauliques pour les exploitations agricoles.

### Contrôleur du génie rural
Un poste technique de suivi et de contrôle des infrastructures rurales liées à l''eau, pour des structures publiques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''un grand périmètre irrigué, ou consultant en génie rural pour des projets internationaux.

### Poursuivre ses études
Master en Génie Rural, en Hydraulique Agricole, ou en Aménagement Hydro-agricole.'
WHERE slug = 'genie-rural-et-maitrise-de-leau';

-- ---------- HYDRAULIQUE ET ASSAINISSEMENT (INE) ----------
UPDATE filieres SET
  description = 'La filière d''Hydraulique et Assainissement est une licence proposée par l''INE (Institut National de l''Eau), rattaché à l''UAC, qui forme à la conception et la gestion des réseaux d''eau potable et d''assainissement : adduction d''eau, traitement des eaux usées, infrastructures sanitaires. Tu y étudies l''hydraulique urbaine et rurale, le traitement de l''eau, et les techniques d''assainissement. C''est une filière particulièrement demandée dans un pays où l''accès à l''eau potable et à l''assainissement reste un défi majeur, tant en zone urbaine que rurale.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler concrètement sur l''accès à l''eau potable et à l''assainissement, des besoins de base encore largement insatisfaits dans de nombreuses zones du Bénin.

Le secteur qui recrute le plus : les projets d''adduction d''eau et d''assainissement, un des domaines les plus financés par les bailleurs internationaux au Bénin.

### Hydrologue et hydrogéologue
Le débouché large : concevoir et suivre des projets d''approvisionnement en eau potable, en zone urbaine comme rurale.

### Contrôleur des travaux d''assainissement de base
Superviser la construction et le fonctionnement des infrastructures d''assainissement (latrines, réseaux d''évacuation).

### Auto-emploi dans les métiers de l''eau
Créer une activité indépendante liée à l''installation ou la maintenance de systèmes d''eau et d''assainissement.

### Contrôleur du génie rural
Un poste technique pour superviser les infrastructures hydrauliques rurales, en lien avec les projets d''État ou d''ONG.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un programme national d''accès à l''eau, ou ingénieur hydraulicien senior pour un bureau d''études.

### Poursuivre ses études
Master en Hydraulique et Assainissement, ou spécialisation en gestion des services publics d''eau.'
WHERE slug = 'hydraulique-et-assainissement';

-- ---------- EAU HYGIÈNE ET ASSAINISSEMENT (EHA) (INE) ----------
UPDATE filieres SET
  description = 'La filière d''Eau Hygiène et Assainissement (EHA) est une licence proposée par l''INE (Institut National de l''Eau), rattaché à l''UAC, qui forme à l''intersection de l''eau, de l''hygiène et de la santé publique : promotion des bonnes pratiques d''hygiène, gestion des points d''eau, assainissement des lieux de vie. Tu y étudies l''hydraulique, les enjeux sanitaires liés à l''eau, et les techniques de sensibilisation communautaire à l''hygiène. C''est une filière particulièrement mobilisée dans les programmes de prévention des maladies liées à l''eau (choléra, diarrhées), un enjeu de santé publique majeur au Bénin, surtout en période de forte pluviométrie.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur la prévention sanitaire liée à l''eau, à la croisée de l''ingénierie hydraulique et de la santé publique communautaire.

Le secteur qui recrute le plus : les programmes de santé communautaire et d''hygiène publique, très actifs au Bénin via l''État et les ONG internationales.

### Contrôleur des travaux d''aménagement hydro-agricole
Le débouché mentionné pour cette filière : superviser des aménagements liés à l''eau avec une attention particulière aux enjeux d''hygiène.

### Promotion de l''hygiène communautaire
Sensibiliser les populations aux bonnes pratiques d''hygiène liées à l''eau, souvent au sein de programmes portés par l''État ou des ONG (UNICEF, Croix-Rouge).

### Gestion des points d''eau communautaires
Veiller au bon fonctionnement et à l''hygiène des points d''eau publics, en zone urbaine comme rurale.

### Réponse aux urgences sanitaires liées à l''eau
Intervenir dans des contextes de crise (épidémies de choléra, inondations) pour rétablir des conditions d''hygiène et d''accès à l''eau sûres.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers coordinateur de programme EHA pour une ONG internationale, ou expert en santé environnementale.

### Poursuivre ses études
Master en Santé Environnementale, en Eau Hygiène et Assainissement, ou en Santé Publique.'
WHERE slug = 'eau-hygiene-et-assainissement-eha';

-- ---------- GÉNIE DE TECHNOLOGIE ALIMENTAIRE (EPAC) ----------
UPDATE filieres SET
  description = 'La filière de Génie de Technologie Alimentaire est une licence proposée par l''EPAC (École Polytechnique d''Abomey-Calavi), rattachée à l''UAC, qui forme à la conception et la gestion de procédés industriels de transformation alimentaire. Tu y étudies le génie des procédés, la biochimie alimentaire, et les normes de qualité industrielle. C''est une filière plus technique et industrielle que la Nutrition et Technologie Alimentaires de la FSA : elle prépare à travailler directement dans les usines et unités de production, sur la conception et l''optimisation des lignes de fabrication de produits alimentaires.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler dans l''industrie alimentaire au sens propre — usines, lignes de production — plutôt que dans le conseil ou la santé nutritionnelle.

Le secteur qui recrute le plus : les industries agroalimentaires béninoises, en croissance avec la volonté nationale de transformer davantage sur place les matières premières agricoles.

### Industries alimentaires
Le débouché principal : ingénieur ou technicien de production dans une usine de transformation alimentaire (farines infantiles, jus, produits laitiers, huileries).

### Industrie de fabrication de farines infantiles
Un secteur spécifique et stratégique au Bénin, notamment via des structures comme l''UBETA, pour la lutte contre la malnutrition infantile.

### Structures chargées des normes
Travailler dans le contrôle et la certification des normes de qualité pour les produits alimentaires transformés.

### Audit et conseil en agroalimentaire
Accompagner des entreprises agroalimentaires dans l''amélioration de leurs processus de production et leur conformité réglementaire.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de production, directeur qualité d''une usine agroalimentaire, ou consultant en génie des procédés.

### Poursuivre ses études
Master en Génie des Procédés Alimentaires, en Ingénierie Agroalimentaire, ou en Qualité Industrielle.'
WHERE slug = 'genie-de-technologie-alimentaire';

-- ---------- PRODUCTION ET SANTÉ ANIMALES (EPAC) ----------
UPDATE filieres SET
  description = 'La filière de Production et Santé animales est une licence proposée par l''EPAC (École Polytechnique d''Abomey-Calavi), rattachée à l''UAC, qui forme à un double aspect de l''élevage : optimisation de la production animale et prévention/prise en charge sanitaire du bétail. Tu y étudies la zootechnie, les bases de la santé vétérinaire, et l''hygiène en élevage. C''est une filière proche de celle proposée par la FSA, mais avec une orientation davantage technique et sanitaire, préparant à des débouchés variés entre la production pure, la santé animale, et la recherche.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses autant à la production animale qu''à la santé du bétail, avec une orientation technique et sanitaire marquée.

Le secteur qui recrute le plus : les cliniques vétérinaires et l''industrie agroalimentaire liée à l''élevage, en développement constant au Bénin.

### Cliniques et pharmacies vétérinaires
Le débouché sanitaire principal : accompagner le suivi de santé des animaux au sein de cliniques ou de pharmacies vétérinaires.

### Abattoirs et contrôle des produits halieutiques
Veiller à la conformité sanitaire des produits d''origine animale, un enjeu de sécurité alimentaire important.

### Industries agro-alimentaires et halieutiques
Travailler pour des entreprises de transformation de produits animaux (viande, poisson), un secteur en structuration.

### Fermes agro-pastorales
Un débouché direct : accompagner techniquement des exploitations d''élevage dans l''optimisation de leur production.

### Enseignement et recherche
Enseigner dans des lycées agricoles, ou poursuivre en recherche sur la production et la santé animales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une exploitation d''élevage de grande taille, ou expert en santé animale pour une organisation internationale.

### Poursuivre ses études
Master en Production Animale, ou passerelle vers les études vétérinaires complètes via l''EISMV de Dakar.'
WHERE slug = 'production-et-sante-animales';

-- ---------- GÉNIE DE L'ENVIRONNEMENT (EPAC) ----------
UPDATE filieres SET
  description = 'La filière de Génie de l''Environnement est une licence proposée par l''EPAC (École Polytechnique d''Abomey-Calavi), rattachée à l''UAC, qui forme à des solutions techniques et industrielles pour la protection de l''environnement : traitement de la pollution, gestion des déchets industriels, études d''impact. Tu y étudies le génie environnemental, les technologies de dépollution, et la réglementation environnementale. C''est une filière technique et industrielle, différente des approches plus sociales ou territoriales du CIFRED ou d''IGATE : elle prépare à concevoir des solutions concrètes de traitement environnemental, notamment pour les industries.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux appliquer des solutions techniques et industrielles aux problèmes environnementaux, en particulier ceux liés à l''activité industrielle et urbaine.

Le secteur qui recrute le plus : les études d''impact environnemental, désormais exigées pour de nombreux projets d''infrastructure au Bénin.

### Aménagement et protection de l''environnement
Le débouché principal : concevoir des solutions techniques de protection environnementale pour des projets industriels ou urbains.

### Assainissement industriel
Gérer le traitement des rejets et déchets industriels, un enjeu croissant avec le développement de l''industrie béninoise.

### Recherche en environnement
Pour ceux qui veulent approfondir : rejoindre des laboratoires de recherche en génie environnemental.

### Bureau d''études d''impact environnemental
Réaliser des études d''impact obligatoires pour les grands projets d''infrastructures (routes, usines, barrages).

### Cabinet QHSE (Qualité, Hygiène, Sécurité, Environnement)
Accompagner des entreprises dans leur conformité environnementale et leur gestion des risques industriels.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable environnement d''une industrie, expert en études d''impact, ou consultant QHSE senior.

### Poursuivre ses études
Master en Génie de l''Environnement, en Gestion des Risques Industriels, ou en Ingénierie Environnementale.'
WHERE slug = 'genie-de-lenvironnement';

-- ---------- GÉNIE D'IMAGERIE MÉDICALE ET DE RADIOBIOLOGIE (EPAC) ----------
UPDATE filieres SET
  description = 'La filière de Génie d''Imagerie médicale et de Radiobiologie est une licence proposée par l''EPAC (École Polytechnique d''Abomey-Calavi), rattachée à l''UAC, qui forme aux techniques d''imagerie médicale : radiologie, échographie, et aux bases de la radiobiologie. Tu y étudies la physique appliquée à l''imagerie, la manipulation des équipements médicaux d''imagerie, et les principes de radioprotection. C''est une filière technique et médicale à la fois, à la croisée de la physique et de la santé, essentielle au bon fonctionnement des services de diagnostic dans les hôpitaux béninois qui se modernisent progressivement.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en physique et que tu veux travailler dans un environnement médical technique, au service du diagnostic des patients.

Le secteur qui recrute le plus : les centres hospitaliers, qui développent progressivement leurs capacités d''imagerie médicale.

### Radiologie et échographie en centres hospitaliers
Le débouché principal : manipuler les équipements d''imagerie médicale (radiographie, échographie) pour appuyer le diagnostic des médecins.

### Techniciens d''étude en entreprise
Un débouché technique connexe, pour ceux qui souhaitent évoluer vers la maintenance ou l''installation d''équipements médicaux.

### Chefs de chantiers et conducteurs de travaux
Un débouché plus inattendu mentionné pour cette filière, pour les profils qui bifurquent vers le BTP grâce à leurs bases techniques.

### Recherche en radiobiologie
Pour ceux qui s''orientent vers la recherche : étudier les effets biologiques des rayonnements, un domaine encore émergent au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un service d''imagerie médicale, ou spécialiste en radioprotection.

### Poursuivre ses études
Master en Imagerie Médicale, en Radiophysique, ou spécialisation en radioprotection.'
WHERE slug = 'genie-dimagerie-medicale-et-de-radiobiologie';

-- ---------- GÉNIE CIVIL (EPAC) ----------
UPDATE filieres SET
  description = 'La filière de Génie Civil est une licence proposée par l''EPAC (École Polytechnique d''Abomey-Calavi), rattachée à l''UAC, qui forme aux métiers de la construction : conception, calcul et supervision d''ouvrages (bâtiments, routes, ponts). Tu y étudies la résistance des matériaux, le calcul de structures, et la gestion de chantier. C''est une filière très demandée dans un Bénin en plein développement d''infrastructures (routes, logements, bâtiments publics), avec des débouchés solides pour des techniciens capables de superviser des chantiers de construction.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes la construction et l''organisation de chantiers, et que tu veux contribuer concrètement au développement des infrastructures béninoises.

Le secteur qui recrute le plus : le BTP, en plein essor avec les grands projets d''infrastructures publiques et le développement immobilier privé au Bénin.

### Chefs de chantiers
Le débouché principal : superviser l''exécution de travaux de construction (bâtiments, routes), en veillant au respect des délais, des coûts et des normes.

### Techniciens d''étude en entreprise
Participer à la conception technique des projets de construction, au sein de bureaux d''études en génie civil.

### Conducteurs de travaux
Coordonner l''ensemble des équipes et des ressources sur un chantier, un poste à responsabilité croissante avec l''expérience.

### Laboratoires de contrôle
Travailler dans des laboratoires de contrôle des matériaux de construction, garantissant leur conformité aux normes.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers ingénieur travaux senior, directeur de chantier, ou fondateur de ta propre entreprise de BTP.

### Poursuivre ses études
Cycle ingénieur en Génie Civil, Master en Structures ou en Génie Civil, au Bénin ou à l''international.'
WHERE slug = 'genie-civil';

-- ---------- MACHINISME AGRICOLE (EPAC) ----------
UPDATE filieres SET
  description = 'La filière de Machinisme Agricole est une licence proposée par l''EPAC (École Polytechnique d''Abomey-Calavi), rattachée à l''UAC, qui forme à la conception, l''utilisation et la maintenance des machines agricoles. Tu y étudies la mécanique appliquée à l''agriculture, l''hydraulique des engins, et les techniques de maintenance d''équipements agricoles. C''est une filière technique qui répond à un enjeu clé de la modernisation agricole béninoise : la mécanisation, encore peu répandue, qui pourrait considérablement améliorer la productivité des exploitations agricoles du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu es intéressé par la mécanique appliquée à l''agriculture, et que tu veux contribuer à la modernisation technique des exploitations béninoises.

Le secteur qui recrute le plus : la maintenance et la fabrication mécanique liées aux équipements agricoles, un secteur encore en développement mais stratégique.

### Fabrication mécanique et parcs machines
Le débouché principal : concevoir, réparer et entretenir des machines agricoles, pour des entreprises de matériel agricole ou des coopératives.

### Contrôle qualité des équipements
Veiller à la conformité et à la performance des équipements agricoles mécanisés.

### Maintenance des engins agricoles
Assurer le bon fonctionnement des tracteurs et machines agricoles, un métier de plus en plus recherché avec la mécanisation croissante.

### Mécanisation agricole
Accompagner les exploitations et coopératives dans l''adoption de solutions mécanisées adaptées à leurs besoins.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une société de matériel agricole, ou consultant en mécanisation agricole pour des projets de développement.

### Poursuivre ses études
Master en Machinisme Agricole, en Génie Mécanique, ou spécialisation en mécanisation agricole.'
WHERE slug = 'machinisme-agricole';

-- ---------- GÉNIE BIOMÉDICAL (MAINTENANCE BIOMÉDICALE ET HOSPITALIÈRE) (EPAC) ----------
UPDATE filieres SET
  description = 'La filière de Génie Biomédical (Maintenance Biomédicale et Hospitalière) est une licence proposée par l''EPAC (École Polytechnique d''Abomey-Calavi), rattachée à l''UAC, qui forme à la maintenance des équipements médicaux hospitaliers : appareils de diagnostic, matériel chirurgical, dispositifs médicaux électroniques. Tu y étudies l''électronique appliquée à la santé, la mécanique des équipements médicaux, et les protocoles de maintenance hospitalière. C''est une filière technique essentielle mais souvent méconnue : sans techniciens de maintenance biomédicale qualifiés, de nombreux équipements hospitaliers tombent en panne et restent inutilisés, un problème récurrent dans les hôpitaux africains.',
  debouches = 'Pour qui ? Cette filière te convient si tu es à l''aise avec l''électronique et la mécanique, et que tu veux mettre ces compétences techniques au service du bon fonctionnement des hôpitaux.

Le secteur qui recrute le plus : les hôpitaux et cliniques, où la panne d''équipements médicaux est un problème récurrent faute de techniciens qualifiés.

### Technicien de laboratoire des centres de santé
Un débouché lié à la maintenance des équipements de laboratoire médical, essentiel au bon fonctionnement des analyses.

### Maintenance des équipements de laboratoires médicaux et vétérinaires
Le débouché le plus direct : assurer la réparation et l''entretien préventif des équipements médicaux dans les hôpitaux et laboratoires.

### Maintenance des équipements électroniques
Un débouché plus large, applicable aussi en dehors du secteur de la santé, pour la maintenance d''équipements électroniques complexes.

### Distributeurs d''équipements médicaux
Travailler pour des entreprises important et distribuant du matériel médical, en support technique après-vente.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de la maintenance biomédicale d''un grand hôpital, ou consultant en équipement médical.

### Poursuivre ses études
Master en Génie Biomédical, en Ingénierie Hospitalière, ou spécialisation en maintenance d''équipements médicaux.'
WHERE slug = 'genie-biomedical-maintenance-biomedicale-et-hospitaliere';

-- ---------- DYNAMIQUE DE POPULATION ET PLANIFICATION RÉGIONALE (CEFORP) ----------
UPDATE filieres SET
  description = 'La filière de Dynamique de Population et Planification Régionale est une licence proposée par le CEFORP (Centre de Formation et de Recherche en Population et Planification Régionale), rattaché à l''UAC, qui forme à l''étude des populations et à leur intégration dans la planification territoriale : migrations, croissance démographique, répartition spatiale des populations. Tu y étudies la démographie, les méthodes d''analyse spatiale, et les outils de planification régionale. C''est une filière qui prépare à comprendre et anticiper les dynamiques de population pour mieux planifier les infrastructures et services publics d''un territoire.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses aux questions de population et à leur impact sur l''aménagement du territoire, avec une approche à la fois quantitative et spatiale.

Le secteur qui recrute le plus : les institutions publiques de planification et les organismes de développement régional.

### Spécialiste en développement local
Le débouché principal : appuyer la planification du développement en tenant compte des dynamiques de population d''un territoire.

### Spécialiste des questions de population
Travailler sur l''analyse démographique pour des institutions publiques ou des organisations internationales (UNFPA notamment).

### Technicien supérieur en démographie/SIG et cartographie
Un poste technique combinant démographie et outils cartographiques pour la planification territoriale.

### Assistant en gestion et suivi de projets et programmes
Accompagner la mise en œuvre de projets de développement intégrant la dimension démographique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers démographe senior, responsable de planification régionale, ou consultant en population et développement.

### Poursuivre ses études
Master en Démographie, en Planification Régionale, ou en Population et Développement.'
WHERE slug = 'dynamique-de-population-et-planification-regionale';

-- ---------- NÉGOCE INTERNATIONAL (CEFORP) ----------
UPDATE filieres SET
  description = 'La filière de Négoce International est une licence proposée par le CEFORP, rattaché à l''UAC, qui forme aux techniques du commerce international : import-export, logistique commerciale, réglementation douanière. Tu y étudies l''économie internationale, les techniques commerciales, et les bases du droit du commerce international. C''est une filière pertinente pour un pays comme le Bénin, dont l''économie repose fortement sur les échanges commerciaux régionaux et internationaux, en particulier via le Port autonome de Cotonou.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses au commerce international et à la logistique des échanges, dans un contexte béninois où le commerce régional est un pilier économique majeur.

Le secteur qui recrute le plus : les sociétés d''import-export et le secteur logistique lié au commerce international.

### Technicien en négoce international
Le débouché principal : accompagner les opérations d''import-export pour des entreprises commerciales, en lien avec les procédures douanières.

### Gestionnaire des relations maritimes internationales
Coordonner les opérations liées au transport maritime international, un secteur clé compte tenu du rôle du Port de Cotonou.

### Sociétés de transit et de manutention
Travailler pour des entreprises spécialisées dans le transit de marchandises entre le Bénin et les pays voisins enclavés.

### Cabinets de commerce international
Conseiller des entreprises sur leurs stratégies d''exportation ou d''importation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable import-export, directeur commercial international, ou consultant en commerce international.

### Poursuivre ses études
Master en Commerce International, en Logistique Internationale, ou en Relations Économiques Internationales.'
WHERE slug = 'negoce-international';

-- ---------- GESTION DES RELATIONS MARITIMES INTERNATIONALES (HERCI) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Relations Maritimes Internationales est une licence proposée par la HERCI (Haute École Régionale de Commerce International), rattachée à l''UAC, qui forme aux métiers du commerce international lié au transport maritime : gestion des flux import-export, relation avec les compagnies maritimes, logistique portuaire. Tu y étudies l''économie internationale, la logistique maritime, et les techniques commerciales appliquées au secteur portuaire. C''est une filière fortement ancrée dans l''économie béninoise, où le Port autonome de Cotonou joue un rôle central pour les échanges régionaux ouest-africains.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses au commerce international par voie maritime, un secteur stratégique pour le Bénin de par sa position portuaire régionale.

Le secteur qui recrute le plus : les entreprises liées au Port de Cotonou et au commerce import-export.

### Agent commercial import-export
Le débouché principal : gérer les opérations commerciales d''importation et d''exportation pour des entreprises béninoises ou internationales.

### Assistant responsable import-export
Un poste d''appui dans les structures import-export, souvent une première étape avant des responsabilités plus larges.

### Technicien commercial
Accompagner les négociations et le suivi commercial des opérations d''import-export.

### Chef de produits import-export
Gérer une gamme de produits spécifiques dans le cadre d''opérations commerciales internationales.

### Achats internationaux
Gérer les approvisionnements internationaux pour des entreprises industrielles ou commerciales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable import-export, directeur des achats internationaux, ou consultant en commerce maritime.

### Poursuivre ses études
Master en Commerce International, en Logistique Maritime, ou en Relations Économiques Internationales.'
WHERE slug = 'gestion-des-relations-maritimes-internationales';

-- ---------- COMMERCE INTERNATIONAL (HERCI) ----------
UPDATE filieres SET
  description = 'La filière de Commerce International est une licence proposée par la HERCI (Haute École Régionale de Commerce International), rattachée à l''UAC, qui forme plus largement aux techniques du commerce à l''échelle internationale : négociation commerciale, stratégies d''exportation, gestion de la relation client à l''international. Tu y étudies l''économie internationale, les techniques de vente à l''export, et la gestion de projets commerciaux internationaux. C''est une filière généraliste sur le commerce international, complémentaire de la Gestion des Relations Maritimes Internationales, mais avec une portée plus large que le seul secteur portuaire.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur des stratégies commerciales à l''international, sans te limiter au secteur maritime et portuaire.

Le secteur qui recrute le plus : les entreprises exportatrices et importatrices, dans divers secteurs de l''économie béninoise.

### Chef de zone import-export
Le débouché le plus stratégique : gérer les opérations commerciales d''une entreprise sur une zone géographique définie (Afrique de l''Ouest, international).

### Responsable de force de vente international
Piloter les équipes commerciales chargées de développer les ventes à l''international pour une entreprise.

### Chargé international
Accompagner le développement des activités internationales d''une entreprise, de la prospection à la négociation.

### Cabinets de conseil en commerce international
Accompagner des entreprises béninoises souhaitant se développer sur des marchés étrangers.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur commercial international, ou fondateur de ta propre entreprise d''import-export.

### Poursuivre ses études
Master en Commerce International, en Marketing International, ou en Management des Affaires Internationales.'
WHERE slug = 'commerce-international';

-- ---------- EDUCATION PHYSIQUE ET SPORTIVE (INJEPS) ----------
UPDATE filieres SET
  description = 'La filière d''Education Physique et Sportive est une licence proposée par l''INJEPS (Institut National de la Jeunesse de l''Éducation Physique et Sportive), rattaché à l''UAC, à laquelle on accède sur concours, qui forme les futurs professeurs d''EPS. Tu y étudies la physiologie du sport, la pédagogie de l''activité physique, et pratiques une large variété de disciplines sportives. C''est une filière exigeante physiquement autant qu''intellectuellement, qui prépare à transmettre le goût du sport et à encadrer des activités physiques dans un cadre scolaire, avec une forte dimension pratique tout au long du cursus.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné de sport, physiquement à l''aise, et que tu veux transmettre cette passion en enseignant l''éducation physique dans les établissements scolaires.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement de l''EPS dans les collèges et lycées.

### Professeur (PA/PCI d''EPS)
Le débouché quasi automatique de cette filière : enseigner l''éducation physique et sportive dans les collèges et lycées, avec un statut de professeur adjoint ou certifié selon le niveau de concours.

### Encadrement d''activités sportives scolaires
Organiser et encadrer les compétitions sportives scolaires, un rôle complémentaire à l''enseignement.

### Master Éducation Physique, Sport et Développement Humain
Une poursuite d''études fréquente pour approfondir les liens entre sport et développement humain, ouvrant vers des postes de recherche ou de formation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers inspecteur d''EPS, formateur de futurs enseignants, ou responsable pédagogique national du sport scolaire.

### Poursuivre ses études
Master en Éducation Physique, Sport et Développement Humain, à l''INJEPS lui-même.'
WHERE slug = 'education-physique-et-sportive';

-- ---------- ENTRAINEMENT SPORTIF (INJEPS) ----------
UPDATE filieres SET
  description = 'La filière d''Entrainement Sportif est une licence proposée par l''INJEPS, rattaché à l''UAC, à laquelle on accède sur concours, qui forme aux métiers de l''entraînement et de la préparation physique des sportifs. Tu y étudies la physiologie de l''effort, les méthodes d''entraînement spécifiques à différents sports, et la préparation physique et mentale des athlètes. Contrairement à la filière EPS tournée vers l''enseignement, celle-ci prépare directement aux métiers de terrain dans le sport de performance, avec des débouchés vers l''encadrement de sportifs et d''équipes.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler directement dans le sport de performance, en entraînant et en préparant physiquement des sportifs plutôt qu''en enseignant en milieu scolaire.

Le secteur qui recrute le plus : les clubs sportifs et fédérations, en développement au Bénin avec la professionnalisation progressive du sport local.

### Certificat d''Aptitude au Professorat Adjoint de Sport (CAPAS)
Une voie de sortie vers l''enseignement du sport, avec un statut légèrement différent de l''EPS classique.

### Entraîneur / Préparateur physique
Le débouché le plus direct : accompagner des athlètes ou des équipes dans leur préparation physique et leur performance sportive.

### Master Éducation Physique, Sport et Développement Humain
Une poursuite d''études classique pour approfondir les aspects scientifiques de l''entraînement sportif.

### Clubs sportifs et fédérations
Intégrer une structure sportive en tant qu''entraîneur ou préparateur physique, pour différentes disciplines.

### Évoluer dans sa carrière
Avec l''expérience et des résultats probants, tu peux évoluer vers entraîneur d''une équipe nationale, ou préparateur physique de renom pour des sportifs de haut niveau.

### Poursuivre ses études
Master en Éducation Physique, Sport et Développement Humain, ou formations spécialisées en préparation physique.'
WHERE slug = 'entrainement-sportif';

-- ---------- DÉVELOPPEMENT COMMUNAUTAIRE (INJEPS) ----------
UPDATE filieres SET
  description = 'La filière de Développement communautaire est une licence proposée par l''INJEPS, rattaché à l''UAC, qui forme à l''animation et à l''accompagnement de projets communautaires, avec une dimension sportive et socio-éducative. Tu y étudies les méthodes d''animation de groupes, la conception de projets sociaux, et les bases de la sociologie communautaire. C''est une filière qui utilise le sport et l''activité physique comme leviers de développement social et communautaire, un profil de plus en plus recherché pour les programmes de cohésion sociale via le sport.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux utiliser le sport et l''activité physique comme outils de développement social, au service de communautés locales.

Le secteur qui recrute le plus : les projets de développement local intégrant une dimension sportive et socio-éducative, souvent financés par des ONG ou des collectivités.

### Technicien Supérieur d''Action Socio-Educative
Le débouché principal : concevoir et animer des programmes socio-éducatifs pour des communautés, souvent en lien avec le sport et les loisirs.

### Administrateur de programmes et projets de développement local
Coordonner des projets de développement communautaire intégrant des activités physiques et sportives.

### Chef de projets
Piloter des initiatives de développement local pour des ONG ou des collectivités, avec une approche participative et communautaire.

### Spécialiste en planification et développement local
Un poste plus stratégique pour ceux qui veulent orienter les politiques de développement communautaire.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers coordinateur régional de programmes de développement, ou consultant en développement communautaire par le sport.

### Poursuivre ses études
Master en Développement Communautaire, en Sciences Sociales du Sport, ou en Gestion de Projets Sociaux.'
WHERE slug = 'developpement-communautaire';

-- ---------- ANDRAGOGIE (INJEPS) ----------
UPDATE filieres SET
  description = 'La filière d''Andragogie est une licence proposée par l''INJEPS, rattaché à l''UAC, qui forme spécifiquement à la formation et l''accompagnement des adultes (l''andragogie est la pédagogie appliquée aux adultes, par opposition à la pédagogie des enfants). Tu y étudies les méthodes de formation pour adultes, l''accompagnement au changement, et des bases en développement communautaire. C''est une filière de niche, utile pour concevoir des programmes de formation continue ou d''alphabétisation adaptés aux besoins spécifiques des adultes, un enjeu important dans un pays où une partie de la population adulte n''a pas eu accès à une éducation complète.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans la formation des adultes plutôt que des enfants, un domaine spécifique mais utile dans de nombreux contextes de développement.

Le secteur qui recrute le plus : les organismes de formation continue et les programmes d''alphabétisation, portés par l''État et des ONG.

### Technicien Supérieur d''Action Socio-Educative
Comme pour la filière voisine, un débouché en animation et accompagnement socio-éducatif, ici davantage orienté vers les adultes.

### Administrateur d''Action Socio-Educative
Coordonner des programmes de formation ou d''alphabétisation pour adultes, au sein d''institutions publiques ou d''ONG.

### Spécialiste en création et gestion d''entreprise
Un débouché pour ceux qui accompagnent des adultes dans des démarches entrepreneuriales.

### Chef de projets en formation d''adultes
Piloter des programmes de formation continue pour des entreprises ou des institutions publiques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de programme national de formation des adultes, ou consultant en ingénierie de la formation.

### Poursuivre ses études
Master en Andragogie, en Formation d''Adultes, ou en Ingénierie de la Formation.'
WHERE slug = 'andragogie';

-- ---------- RÉCRÉOLOGIE (INJEPS) ----------
UPDATE filieres SET
  description = 'La filière de Récréologie est une licence proposée par l''INJEPS, rattaché à l''UAC, qui forme aux métiers du loisir et de l''animation récréative : organisation d''activités de loisirs, gestion de programmes récréatifs, tourisme de loisir. Tu y étudies l''animation socio-récréative, la gestion d''événements de loisirs, et des bases en tourisme. C''est une filière originale, encore peu développée au Bénin, qui prépare à structurer et professionnaliser le secteur des loisirs, un domaine appelé à se développer avec l''urbanisation et l''émergence d''une classe moyenne disposant de plus de temps libre.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes organiser des activités et du divertissement pour différents publics, dans un secteur des loisirs encore émergent mais porteur au Bénin.

Le secteur qui recrute le plus : le tourisme de loisir et l''événementiel, en développement dans les grandes villes béninoises.

### Technicien Supérieur d''Action Socio-Educative
Un débouché commun avec les autres filières de l''INJEPS, orienté ici vers l''animation récréative.

### Coordonnateur en programmes et projets de loisir et tourisme
Le débouché le plus spécifique : concevoir et gérer des programmes d''activités de loisirs, pour des structures touristiques ou culturelles.

### Chef de projets en gestion du patrimoine
Un débouché lié au tourisme culturel et récréatif, en lien avec la valorisation des sites patrimoniaux béninois.

### Administrateur d''Action Socio-Educative
Coordonner des structures d''animation ou de loisirs pour différents publics (jeunes, familles).

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur d''un centre de loisirs, responsable d''un parc récréatif, ou consultant en développement du tourisme de loisir.

### Poursuivre ses études
Master en Loisirs et Tourisme, en Animation Socio-Culturelle, ou en Gestion des Événements.'
WHERE slug = 'recreologie';


-- ================================================================
-- >>> FICHIER SOURCE : 12_uac_lot9_final_ensPN_fadesp_faseg_fast_confucius_ilaci.sql
-- ================================================================

-- ============================================================
-- UAC — LOT 9 (FINAL) : ENS Porto-Novo, FADESP, FASEG, FAST,
-- Institut Confucius, ILACI (23 filières)
-- ============================================================

-- ---------- ENTREPRENARIAT SOCIAL (ENS Porto-Novo) ----------
UPDATE filieres SET
  description = 'La filière d''Entreprenariat social est une licence proposée par l''ENS (École Normale Supérieure de Porto-Novo), rattachée à l''UAC, à laquelle on accède par classement, qui forme à la création et la gestion de projets à impact social : structures d''insertion, coopératives, initiatives combinant rentabilité économique et utilité sociale. Tu y étudies la gestion de projet, l''économie sociale, et des bases en pédagogie et action socio-éducative, dans le prolongement de la vocation de formation d''enseignants de l''ENS mais avec une ouverture vers l''entrepreneuriat à finalité sociale.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux entreprendre, mais avec une finalité sociale — créer des structures qui répondent à des besoins communautaires tout en étant économiquement viables.

Le secteur qui recrute le plus : les structures d''action socio-éducative et l''entrepreneuriat social, en émergence au Bénin.

### Technicien Supérieur d''Action Socio-Educative
Le débouché principal : concevoir et animer des projets socio-éducatifs à finalité sociale, pour des associations ou des collectivités.

### Administrateur d''Action Socio-Educative
Coordonner des structures d''entrepreneuriat social, en articulant gestion administrative et impact communautaire.

### Création d''entreprise sociale
Pour les profils les plus entreprenants : monter sa propre structure à impact social (insertion professionnelle, économie circulaire, artisanat solidaire).

### ONG et structures de développement communautaire
Travailler pour des organisations qui accompagnent l''entrepreneuriat social au niveau local.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur d''une structure d''entrepreneuriat social, ou consultant en économie sociale et solidaire.

### Poursuivre ses études
Master en Entrepreneuriat Social, en Économie Sociale et Solidaire, ou en Gestion de Projets à Impact.'
WHERE slug = 'entreprenariat-social';

-- ---------- HISTOIRE ET GÉOGRAPHIE (ENS Porto-Novo) ----------
UPDATE filieres SET
  description = 'La filière d''Histoire et Géographie est une licence proposée par l''ENS de Porto-Novo, rattachée à l''UAC, à laquelle on accède sur concours, qui forme spécifiquement les futurs professeurs de collège et lycée en histoire-géographie. Tu y étudies l''histoire du Bénin et du monde, la géographie physique et humaine, et surtout des méthodes pédagogiques pour enseigner ces disciplines. Contrairement à une licence classique d''histoire, cette filière intègre dès le départ une forte dimension de formation à l''enseignement, avec des stages en établissement.',
  debouches = 'Pour qui ? Cette filière te convient si tu sais déjà que tu veux enseigner l''histoire-géographie, et que tu préfères une formation intégrant directement la dimension pédagogique plutôt qu''une licence classique suivie d''un master d''enseignement.

Le secteur qui recrute le plus, sans surprise pour une ENS : l''enseignement secondaire.

### Professeur Adjoint des lycées et collèges
Le débouché quasi automatique de cette filière : enseigner l''histoire-géographie en collège ou lycée, avec un statut de professeur adjoint.

### Interprète et notaire
D''autres débouchés existent, plus rares, valorisant les compétences d''analyse et de rédaction acquises.

### Recherche historique et géographique
Pour les plus passionnés : poursuivre en recherche sur l''histoire ou la géographie du Bénin.

### Évoluer dans sa carrière
Avec l''expérience et des concours complémentaires, tu peux évoluer vers professeur certifié, inspecteur pédagogique, ou formateur de futurs enseignants.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation disciplinaire en histoire ou géographie pour la voie académique.'
WHERE slug = 'histoire-et-geographie';

-- ---------- ESPAGNOL (ENS Porto-Novo) ----------
UPDATE filieres SET
  description = 'La filière d''Espagnol est une licence proposée par l''ENS de Porto-Novo, rattachée à l''UAC, à laquelle on accède sur concours, qui forme spécifiquement les futurs professeurs d''espagnol pour le secondaire. Contrairement à la licence d''Espagnol de FLLAC plus généraliste, cette filière intègre dès le départ une forte dimension pédagogique, avec des stages d''enseignement en établissement. C''est la voie la plus directe pour devenir professeur d''espagnol au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu sais déjà vouloir enseigner l''espagnol, et que tu préfères une formation intégrant l''aspect pédagogique dès la licence.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement de l''espagnol en collège et lycée.

### Professeur Adjoint des lycées et collèges
Le débouché principal et quasi automatique : enseigner l''espagnol dans le secondaire.

### Interprète (Espagnol, Allemand et Anglais)
Un débouché complémentaire pour ceux qui maîtrisent plusieurs langues, en traduction ou interprétariat.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, formateur, ou responsable pédagogique en langue espagnole.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation en didactique des langues.'
WHERE slug = 'espagnol-2';

-- ---------- ALLEMAND (ENS Porto-Novo) ----------
UPDATE filieres SET
  description = 'La filière d''Allemand est une licence proposée par l''ENS de Porto-Novo, rattachée à l''UAC, à laquelle on accède sur concours, qui forme spécifiquement les futurs professeurs d''allemand pour le secondaire, avec une forte dimension pédagogique intégrée dès la licence, contrairement à la filière équivalente de FLLAC. C''est la voie la plus directe pour devenir professeur d''allemand au Bénin, un profil rare et donc recherché compte tenu du faible nombre d''établissements proposant cette langue.',
  debouches = 'Pour qui ? Cette filière te convient si tu sais déjà vouloir enseigner l''allemand, et que tu veux une formation directement tournée vers la pédagogie.

Le secteur qui recrute le plus : l''enseignement de l''allemand, un profil rare et donc valorisé.

### Professeur Adjoint des lycées et collèges
Le débouché principal : enseigner l''allemand dans le secondaire, avec une demande stable compte tenu du petit nombre de germanistes formés chaque année.

### Interprète (Espagnol, Allemand et Anglais)
Un débouché complémentaire pour les profils plurilingues, en traduction ou interprétariat pour des structures allemandes présentes au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, ou formateur pédagogique en langue allemande.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou séjour d''études en Allemagne via des bourses DAAD.'
WHERE slug = 'allemand-2';

-- ---------- ANGLAIS (ENS Porto-Novo) ----------
UPDATE filieres SET
  description = 'La filière d''Anglais est une licence proposée par l''ENS de Porto-Novo, rattachée à l''UAC, à laquelle on accède sur concours, qui forme spécifiquement les futurs professeurs d''anglais pour le secondaire. Comme les autres filières de langues de cette école, elle intègre une forte dimension pédagogique dès la licence, avec des stages en établissement. C''est la voie la plus directe et la plus sélective (par concours) pour devenir professeur d''anglais au Bénin, une matière avec une forte demande structurelle.',
  debouches = 'Pour qui ? Cette filière te convient si tu sais déjà vouloir enseigner l''anglais, et que tu préfères une formation exigeante mais directement tournée vers ce métier.

Le secteur qui recrute le plus, débouché quasi assuré : l''enseignement de l''anglais en collège et lycée.

### Professeur Adjoint des lycées et collèges
Le débouché principal de cette filière très demandée : enseigner l''anglais dans le secondaire, avec une forte demande structurelle au Bénin.

### Interprète (Espagnol, Allemand et Anglais)
Un débouché complémentaire pour ceux qui souhaitent exercer en dehors de l''enseignement.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, formateur pédagogique, ou inspecteur d''anglais.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation en didactique des langues étrangères.'
WHERE slug = 'anglais-2';

-- ---------- FRANÇAIS (ENS Porto-Novo) ----------
UPDATE filieres SET
  description = 'La filière de Français est une licence proposée par l''ENS de Porto-Novo, rattachée à l''UAC, à laquelle on accède sur concours, qui forme spécifiquement les futurs professeurs de français pour le secondaire. Tu y étudies la littérature, la linguistique, et surtout les méthodes pédagogiques d''enseignement du français, avec des stages en établissement dès le cursus. C''est la voie la plus directe pour devenir professeur de français, une matière au cœur du système scolaire béninois francophone.',
  debouches = 'Pour qui ? Cette filière te convient si tu sais déjà vouloir enseigner le français, et que tu veux une formation qui intègre directement la pédagogie plutôt qu''une licence classique suivie d''une formation d''enseignant.

Le secteur qui recrute le plus, avec une demande structurelle constante : l''enseignement du français, socle du système scolaire béninois.

### Professeur Adjoint des lycées et collèges
Le débouché quasi automatique : enseigner le français en collège ou lycée.

### Interprète (Espagnol, Allemand et Anglais)
Un débouché plus rare pour les profils plurilingues issus de cette filière.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, inspecteur de français, ou formateur d''enseignants.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation en didactique du français langue seconde.'
WHERE slug = 'francais';

-- ---------- PHILOSOPHIE (ENS Porto-Novo) ----------
UPDATE filieres SET
  description = 'La filière de Philosophie est une licence proposée par l''ENS de Porto-Novo, rattachée à l''UAC, à laquelle on accède sur concours, qui forme spécifiquement les futurs professeurs de philosophie pour le secondaire. Comme les autres filières de cette école, elle intègre une forte dimension pédagogique dès la licence, contrairement à la filière équivalente de la FASHS-Calavi davantage tournée vers la philosophie académique pure. C''est la voie la plus directe pour devenir professeur de philosophie au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu sais déjà vouloir enseigner la philosophie, et que tu veux une formation qui articule directement contenu disciplinaire et pédagogie.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement de la philosophie en classe de terminale.

### Professeur Adjoint des lycées et collèges
Le débouché quasi unique et direct de cette filière : enseigner la philosophie, matière présente en classe de terminale.

### Interprète (Espagnol, Allemand et Anglais)
Un débouché marginal pour les profils plurilingues.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, ou formateur pédagogique en philosophie.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation académique en philosophie.'
WHERE slug = 'philosophie-2';

-- ---------- DROIT (FADESP) ----------
UPDATE filieres SET
  description = 'La filière de Droit est une licence proposée par la FADESP (Faculté de Droit et de Science Politique), rattachée à l''UAC, qui forme à la maîtrise du droit dans toutes ses branches : droit civil, pénal, administratif, commercial. Tu y étudies les grands principes juridiques, les procédures légales, et développes une capacité d''analyse et d''argumentation juridique rigoureuse. C''est l''une des filières les plus emblématiques et les plus demandées de l''UAC, qui ouvre vers une grande diversité de métiers du droit et de l''administration, avec un très fort volume d''étudiants inscrits chaque année.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux, tu aimes argumenter et analyser des textes complexes, et que tu vises des métiers prestigieux du droit ou de l''administration.

Le secteur qui recrute le plus, très large : l''administration publique, suivie par les professions juridiques libérales.

### Attaché des services administratifs
Le débouché le plus courant : intégrer l''administration publique après un concours de la fonction publique.

### Attaché des affaires étrangères
Un débouché prestigieux : le corps diplomatique béninois, accessible via concours après cette formation.

### Auxiliaires de justice (avocat, huissier, notaire)
Après une formation complémentaire spécifique, ces professions libérales du droit restent parmi les débouchés les plus recherchés.

### Magistrature
Accessible après un master et un concours d''entrée à l''École Nationale de la Magistrature, la magistrature reste un débouché de prestige pour les meilleurs étudiants en droit.

### Consultant, policier, militaire
Des débouchés plus variés existent également, valorisant les compétences juridiques dans des contextes de conseil ou de sécurité.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers avocat associé, magistrat, ou haut fonctionnaire.

### Poursuivre ses études
Master en Droit (Privé, Public, des Affaires...), indispensable pour accéder aux professions les plus qualifiées du droit.'
WHERE slug = 'droit';

-- ---------- SCIENCES POLITIQUES (FADESP) ----------
UPDATE filieres SET
  description = 'La filière de Sciences Politiques est une licence proposée par la FADESP (Faculté de Droit et de Science Politique), rattachée à l''UAC, qui forme à l''analyse des systèmes politiques, des institutions et des relations internationales. Tu y étudies la science politique, les relations internationales, et les politiques publiques, avec une approche plus analytique que le droit pur. C''est une filière qui prépare à comprendre et intervenir dans le fonctionnement des institutions et des politiques publiques, avec des débouchés vers la diplomatie, l''analyse politique et la gestion de projets publics.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses au fonctionnement des institutions, à la politique et aux relations internationales, et que tu veux comprendre et influencer les décisions publiques.

Le secteur qui recrute le plus : la diplomatie et les organisations internationales, débouchés emblématiques de cette filière.

### Diplomate
Le débouché le plus prestigieux : intégrer le corps diplomatique béninois après concours, pour représenter le pays à l''international.

### Spécialiste des relations internationales
Travailler pour des organisations internationales ou régionales (CEDEAO, UEMOA, agences des Nations Unies) sur des questions politiques et diplomatiques.

### Spécialiste des politiques publiques
Analyser et évaluer les politiques publiques pour des ministères ou des think tanks.

### Sociologue des comportements politiques
Pour les profils plus analytiques : étudier les comportements électoraux et les dynamiques politiques béninoises.

### Évaluateur des politiques publiques
Un débouché technique : mesurer l''efficacité des politiques publiques pour des institutions ou des bailleurs internationaux.

### Gestionnaire de projets
Piloter des projets à dimension politique ou institutionnelle pour des ONG ou des organisations internationales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers ambassadeur, conseiller politique senior, ou expert en relations internationales.

### Poursuivre ses études
Master en Sciences Politiques, en Relations Internationales, ou en Politiques Publiques.'
WHERE slug = 'sciences-politiques';

-- ---------- SCIENCES ÉCONOMIQUES ET DE GESTION (TRONC COMMUN) (FASEG UAC) ----------
UPDATE filieres SET
  description = 'La filière de Sciences Economiques et de Gestion (Tronc commun) est une licence proposée par la FASEG (Faculté des Sciences Economiques et de Gestion), rattachée à l''UAC, qui forme aux bases larges de l''économie et de la gestion avant une spécialisation ultérieure. Tu y étudies la microéconomie, la macroéconomie, la comptabilité et les statistiques appliquées, avec une approche généraliste qui ouvre vers une grande diversité de métiers de la gestion et de l''analyse économique. C''est l''une des filières les plus suivies de l''UAC, un vrai tronc commun avant spécialisation en économétrie, comptabilité, ou autres branches économiques.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux une base solide et généraliste en économie et gestion, sans te spécialiser immédiatement, avec de nombreuses portes ouvertes ensuite.

Le secteur qui recrute le plus : les administrations publiques et le secteur bancaire/financier, qui valorisent largement ce profil généraliste.

### Services déconcentrés de l''État, collectivités locales, ONG
Le débouché le plus large : intégrer des fonctions économiques et administratives dans le secteur public ou associatif.

### Analystes et statisticiens
Travailler sur l''analyse économique de données, pour des institutions publiques ou des cabinets d''études.

### Comptable et planification des ressources financières
Un débouché technique classique, notamment dans les collectivités et administrations.

### Conseiller en microfinance et gestion des PME
Accompagner les petites entreprises et institutions de microfinance dans leur gestion économique.

### Agent de banque ou d''assurance
Un débouché courant pour les diplômés de ce tronc commun, dans le secteur financier béninois.

### Entrepreneur
Certains diplômés utilisent cette base économique généraliste pour créer et gérer leur propre entreprise.

### Évoluer dans sa carrière
Avec l''expérience et une spécialisation ultérieure, tu peux évoluer vers économiste, directeur financier, ou cadre supérieur dans une administration.

### Poursuivre ses études
Master en Économie, en Gestion, ou spécialisation dans l''une des branches de l''économie appliquée (économétrie, finance, économie du développement).'
WHERE slug = 'sciences-economiques-et-de-gestion-tronc-commun';

-- ---------- ÉCONOMÉTRIE ET STATISTIQUES APPLIQUÉES (FASEG UAC) ----------
UPDATE filieres SET
  description = 'La filière d''Econométrie et Statistiques Appliquées est une licence proposée par la FASEG, rattachée à l''UAC, qui forme à l''analyse quantitative avancée des phénomènes économiques : modélisation statistique, prévisions économiques, analyse de données. Tu y étudies les mathématiques appliquées à l''économie, les statistiques inférentielles, et les logiciels de traitement de données économiques. C''est une filière plus technique et exigeante en mathématiques que le tronc commun, qui prépare à des métiers d''analyse économique de haut niveau.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en mathématiques et statistiques, et que tu veux te spécialiser dans l''analyse quantitative de l''économie plutôt que dans la gestion pure.

Le secteur qui recrute le plus : les cabinets d''études économiques et les institutions financières.

### Statisticien, économètre
Le débouché principal : analyser et modéliser des données économiques pour des institutions publiques, des banques, ou des cabinets d''études.

### Analyste économiste
Produire des analyses et prévisions économiques pour des entreprises ou des institutions financières.

### Conseiller en stratégies et prise de décisions
Accompagner des dirigeants d''entreprise ou des décideurs publics avec des analyses économiques rigoureuses.

### Institutions publiques de statistique
Un débouché institutionnel via l''INStaD ou d''autres structures publiques d''analyse économique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers économiste senior, chef d''un service d''études économiques, ou consultant en modélisation économique.

### Poursuivre ses études
Master en Économétrie, en Statistique Appliquée, ou en Économie Quantitative, notamment dans des écoles régionales comme l''ENSEA (Abidjan).'
WHERE slug = 'econometrie-et-statistiques-appliquees';

-- ---------- SCIENCES ET TECHNIQUES COMPTABLES ET FINANCIÈRES (STCF) (FASEG UAC) ----------
UPDATE filieres SET
  description = 'La filière de Sciences et Techniques Comptables et Financières (STCF) est une licence proposée par la FASEG, rattachée à l''UAC, qui forme spécifiquement aux métiers de la comptabilité et de la finance d''entreprise. Tu y étudies la comptabilité générale et analytique approfondie, l''audit, et l''analyse financière. C''est une filière de spécialisation directe vers les métiers du chiffre en entreprise, avec des débouchés concrets et une forte demande sur le marché de l''emploi béninois, où les compétences comptables qualifiées restent recherchées.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser directement dans la comptabilité et la finance d''entreprise, avec des débouchés rapides et concrets.

Le secteur qui recrute le plus : les entreprises et banques, où les compétences comptables qualifiées sont systématiquement recherchées.

### Audits comptable ou financier
Le débouché le plus recherché : intervenir en tant qu''auditeur pour vérifier la fiabilité des comptes d''entreprises, pour un cabinet d''audit.

### Contrôleur interne en banque et entreprise
Veiller à la conformité des procédures financières internes d''une organisation.

### Comptable dans banque et entreprise
Le débouché le plus direct : tenir la comptabilité d''une entreprise ou d''une institution financière.

### Agent comptable
Un poste stable dans des administrations ou de grandes structures, en charge de la gestion comptable quotidienne.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur financier, expert-comptable (avec certification complémentaire), ou associé dans un cabinet d''audit.

### Poursuivre ses études
Master en Comptabilité, Contrôle, Audit (CCA), ou préparation aux diplômes d''expertise comptable.'
WHERE slug = 'sciences-et-techniques-comptables-et-financieres-stcf';

-- ---------- SCIENCES DE LA VIE ET DE LA TERRE (FAST UAC) ----------
UPDATE filieres SET
  description = 'La filière de Sciences de la Vie et de la Terre est une licence proposée par la FAST (Faculté des Sciences Techniques), rattachée à l''UAC, qui forme aux sciences fondamentales du vivant et de la terre : biologie, géologie, écologie. Tu y étudies la biologie cellulaire et moléculaire, la géologie, et les méthodes de recherche scientifique en laboratoire et sur le terrain. C''est une filière académique de base, qui prépare aussi bien à l''enseignement qu''à la recherche scientifique ou à la poursuite en écoles d''ingénieurs, avec une solide culture scientifique généraliste.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné de sciences du vivant et de la terre, avec un goût pour la recherche et l''expérimentation en laboratoire ou sur le terrain.

Le secteur qui recrute le plus : l''enseignement des SVT, débouché le plus direct et le plus accessible.

### Enseignement des SVT
Le débouché principal : devenir professeur de sciences de la vie et de la terre dans les collèges et lycées.

### Techniciens de laboratoires et institutions de recherche
Travailler dans des laboratoires de recherche biologique ou géologique, universitaires ou publics.

### Écoles d''ingénieurs
Cette licence sert aussi de tremplin vers des cycles d''ingénieurs dans des domaines liés aux sciences du vivant ou de l''environnement.

### Recherche scientifique
Pour les plus passionnés : poursuivre en recherche fondamentale, en biologie ou géologie appliquée aux enjeux béninois.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chercheur senior, professeur certifié, ou responsable d''un laboratoire de recherche.

### Poursuivre ses études
Master en Biologie, en Sciences de la Terre, ou en Écologie, avec possibilité de poursuivre en doctorat.'
WHERE slug = 'sciences-de-la-vie-et-de-la-terre';

-- ---------- PHYSIQUE CHIMIE (FAST UAC) ----------
UPDATE filieres SET
  description = 'La filière de Physique Chimie est une licence proposée par la FAST, rattachée à l''UAC, qui forme aux sciences physiques et chimiques fondamentales. Tu y étudies la physique générale, la chimie organique et minérale, avec une part importante de travaux pratiques en laboratoire. C''est l''une des filières scientifiques les plus suivies de l''UAC (avec un volume important de places boursières), qui prépare aussi bien à l''enseignement qu''à la poursuite vers des écoles d''ingénieurs ou des carrières dans l''industrie chimique.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en physique et chimie, et que tu veux une base scientifique large ouvrant sur l''enseignement, la recherche, ou l''ingénierie.

Le secteur qui recrute le plus : l''enseignement des PCT, débouché le plus accessible pour un grand nombre de diplômés.

### Enseignement des PCT
Le débouché le plus direct : devenir professeur de physique-chimie-technologie dans les collèges et lycées.

### Techniciens de laboratoires et institutions de recherche
Travailler dans des laboratoires d''analyse physico-chimique, publics ou industriels.

### Écoles d''ingénieurs
Une solide base pour poursuivre en cycle ingénieur, notamment en génie chimique, énergétique ou des matériaux.

### Recherche scientifique
Pour les plus passionnés : poursuivre en recherche fondamentale en physique ou en chimie.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chercheur, ingénieur chimiste, ou professeur certifié.

### Poursuivre ses études
Master en Physique, en Chimie, ou spécialisation en génie chimique ou énergétique.'
WHERE slug = 'physique-chimie';

-- ---------- MATHÉMATIQUES INFORMATIQUE ET APPLICATIONS (FAST UAC) ----------
UPDATE filieres SET
  description = 'La filière de Mathématiques Informatique et Applications est une licence proposée par la FAST, rattachée à l''UAC, qui forme aux mathématiques fondamentales et appliquées, couplées à des bases en informatique. Tu y étudies l''algèbre, l''analyse, les probabilités-statistiques, et l''algorithmique, avec pour objectif de former des profils polyvalents capables d''évoluer aussi bien vers l''enseignement des mathématiques que vers des applications informatiques ou de recherche. C''est l''une des filières scientifiques les plus demandées de l''UAC, avec un très fort volume de places boursières, signe de l''importance accordée à cette discipline.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide et à l''aise en mathématiques, et que tu veux une formation polyvalente ouvrant sur l''enseignement, l''informatique appliquée, ou la recherche.

Le secteur qui recrute le plus : l''enseignement des mathématiques, débouché massif compte tenu du grand nombre de diplômés et des besoins constants en professeurs de maths.

### Enseignement Maths
Le débouché le plus direct et le plus courant : devenir professeur de mathématiques dans les collèges et lycées.

### Techniciens de laboratoires et institutions de recherche
Travailler sur des projets de recherche mathématique ou d''application informatique des mathématiques.

### Écoles d''ingénieurs
Une base solide pour poursuivre en cycle ingénieur, notamment en informatique, statistique, ou ingénierie mathématique.

### Applications informatiques
Certains diplômés évoluent vers des métiers du numérique (data science, développement) grâce à leurs bases en algorithmique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chercheur en mathématiques, professeur certifié, ou data scientist après une spécialisation complémentaire.

### Poursuivre ses études
Master en Mathématiques, en Informatique, ou en Statistique Appliquée.'
WHERE slug = 'mathematiques-informatique-et-applications';

-- ---------- ENERGIES RENOUVELABLES ET SYSTÈMES ÉNERGÉTIQUES (FAST UAC) ----------
UPDATE filieres SET
  description = 'La filière d''Energies Renouvelables et Systèmes Energétiques est une licence proposée par la FAST, rattachée à l''UAC, qui forme aux technologies de production et de gestion de l''énergie, avec un accent particulier sur les énergies renouvelables (solaire, biomasse, éolien). Tu y étudies la physique de l''énergie, les technologies de production électrique renouvelable, et les systèmes énergétiques. C''est une filière stratégique pour un pays confronté à des défis d''accès à l''énergie, où le développement du solaire et d''autres énergies renouvelables constitue une priorité nationale et internationale.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses aux enjeux énergétiques et aux solutions renouvelables, un secteur d''avenir porté par les priorités nationales et internationales de transition énergétique.

Le secteur qui recrute le plus : la production et fourniture d''énergie électrique, notamment via le développement du solaire au Bénin.

### Production et fourniture d''énergie électrique
Le débouché principal : travailler sur des projets de production d''énergie, notamment renouvelable, pour des sociétés publiques ou privées.

### Fourniture de services énergétiques
Accompagner des entreprises ou des particuliers dans l''installation et la gestion de solutions énergétiques (panneaux solaires notamment).

### Bureaux d''études en énergie
Réaliser des études techniques pour des projets énergétiques, publics ou privés.

### Projets internationaux d''accès à l''énergie
De nombreux bailleurs internationaux financent des projets d''électrification rurale par énergies renouvelables au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers ingénieur énergéticien, chef de projet solaire, ou consultant en transition énergétique.

### Poursuivre ses études
Master en Énergies Renouvelables, en Génie Énergétique, ou en Systèmes Électriques.'
WHERE slug = 'energies-renouvelables-et-systemes-energetiques';

-- ---------- GÉNÉTIQUE, BIOTECHNOLOGIES ET RESSOURCES BIOLOGIQUES (FAST UAC) ----------
UPDATE filieres SET
  description = 'La filière de Génétique, Biotechnologies et Ressources Biologiques est une licence proposée par la FAST, rattachée à l''UAC, qui forme aux sciences du vivant appliquées : génétique, biotechnologies, valorisation des ressources biologiques. Tu y étudies la biologie moléculaire, la génétique, et les applications biotechnologiques (amélioration végétale et animale, biotechnologies industrielles). C''est une filière scientifique de pointe, encore émergente au Bénin, qui prépare à des métiers de recherche et d''innovation dans un domaine appelé à se développer avec les enjeux d''amélioration agricole et de santé.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné de biologie moléculaire et de génétique, et que tu veux travailler sur des applications de pointe dans un domaine scientifique encore émergent au Bénin.

Le secteur qui recrute le plus : la recherche en génétique et biotechnologies appliquées, portée par des instituts de recherche nationaux et internationaux.

### Recherche en Génétique et biotechnologies appliquées
Le débouché principal : intégrer un institut de recherche travaillant sur l''amélioration génétique des plantes ou des animaux.

### Laboratoire des industries
Travailler dans des laboratoires industriels appliquant les biotechnologies (agroalimentaire, pharmaceutique).

### Gestion des ressources génétiques
Contribuer à la préservation et à la valorisation de la biodiversité génétique béninoise.

### Entrepreneuriat en sélections végétales et animales
Un débouché plus appliqué : développer des activités de sélection variétale ou animale pour améliorer les productions agricoles.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chercheur senior en biotechnologies, responsable d''un laboratoire de recherche, ou consultant en amélioration génétique.

### Poursuivre ses études
Master en Génétique, en Biotechnologies, ou en Biologie Moléculaire, avec possibilité de poursuivre en doctorat.'
WHERE slug = 'genetique-biotechnologies-et-ressources-biologiques';

-- ---------- MICROBIOLOGIE ET BIOTECHNOLOGIE ALIMENTAIRE (FAST UAC) ----------
UPDATE filieres SET
  description = 'La filière de Microbiologie et Biotechnologie Alimentaire est une licence proposée par la FAST, rattachée à l''UAC, qui forme à l''étude des micro-organismes et à leurs applications dans l''industrie alimentaire : fermentation, conservation, contrôle qualité microbiologique. Tu y étudies la microbiologie, la biochimie alimentaire, et les techniques de transformation biotechnologique des aliments. C''est une filière scientifique appliquée à l''agroalimentaire, essentielle pour garantir la sécurité sanitaire des aliments transformés et développer de nouveaux produits, dans un secteur agroalimentaire béninois en pleine structuration.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la biologie appliquée à l''industrie alimentaire, avec un fort ancrage en laboratoire et en contrôle qualité.

Le secteur qui recrute le plus : l''industrie agroalimentaire, en croissance au Bénin avec la volonté de transformer davantage les produits agricoles sur place.

### Chef de production dans les industries
Le débouché principal : superviser la production dans des usines agroalimentaires, en veillant à la qualité microbiologique des produits.

### Laboratoire en contrôle de qualité
Réaliser des analyses microbiologiques pour garantir la sécurité sanitaire des produits alimentaires.

### Transformations agroalimentaires
Travailler sur le développement de nouveaux produits transformés (fermentés, conservés) pour des entreprises agroalimentaires.

### Auditeur de qualité
Vérifier la conformité des processus de production aux normes sanitaires et de qualité.

### Formateurs agricoles
Transmettre ces compétences techniques dans des lycées agricoles ou des centres de formation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable qualité d''une usine agroalimentaire, ou chercheur en microbiologie appliquée.

### Poursuivre ses études
Master en Microbiologie, en Biotechnologie Alimentaire, ou en Sécurité Sanitaire des Aliments.'
WHERE slug = 'microbiologie-et-biotechnologie-alimentaire';

-- ---------- HYDROBIOLOGIE APPLIQUÉE (FAST UAC) ----------
UPDATE filieres SET
  description = 'La filière d''Hydrobiologie Appliquée est une licence proposée par la FAST, rattachée à l''UAC, qui forme à l''étude des organismes vivants aquatiques et de leurs écosystèmes, avec des applications concrètes en pêche, aquaculture et surveillance de la qualité de l''eau. Tu y étudies la biologie aquatique, l''écologie des milieux d''eau douce et marins, et les techniques d''analyse de la qualité de l''eau. C''est une filière scientifique appliquée particulièrement pertinente pour le Bénin, riche en écosystèmes lagunaires et côtiers, et confronté à des enjeux de gestion durable de ses ressources halieutiques.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la biologie des milieux aquatiques, avec des applications concrètes en pêche, aquaculture et surveillance environnementale.

Le secteur qui recrute le plus : les structures liées à la pêche et à l''aquaculture, en développement au Bénin.

### Techniciens de laboratoire de biologie
Le débouché principal : réaliser des analyses biologiques sur des échantillons aquatiques, pour des laboratoires publics ou de recherche.

### Spécialiste de la qualité de l''eau et surveillance des écosystèmes
Surveiller la santé des écosystèmes aquatiques (lagunes, cours d''eau), un enjeu croissant face à la pollution.

### Chef Production en pisciculture, pêche et Aquaculture
Un débouché opérationnel : gérer la production dans des structures d''aquaculture.

### Technicien en Aménagement des zones humides
Contribuer à la gestion et la préservation des zones humides béninoises.

### Technicien Inspection des produits halieutiques
Veiller à la qualité sanitaire des produits de la pêche destinés à la consommation ou à l''exportation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''une structure aquacole, expert en gestion des ressources halieutiques, ou chercheur en hydrobiologie.

### Poursuivre ses études
Master en Hydrobiologie, en Aquaculture, ou en Gestion des Ressources Halieutiques.'
WHERE slug = 'hydrobiologie-appliquee';

-- ---------- LANGUE CHINOISE (Institut Confucius) ----------
UPDATE filieres SET
  description = 'La filière de Langue Chinoise est une licence proposée par l''Institut Confucius, rattaché à l''UAC, qui forme à la maîtrise du mandarin et à la connaissance de la culture chinoise. Tu y étudies la langue chinoise (écriture, grammaire, expression orale), ainsi que des éléments de civilisation et d''histoire de la Chine. C''est une filière rare et stratégique au Bénin, dans un contexte de relations économiques croissantes entre l''Afrique et la Chine, qui investit massivement dans les infrastructures et le commerce sur le continent.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans une langue rare mais stratégique, avec des perspectives concrètes liées à l''essor des relations économiques Chine-Afrique.

Le secteur qui recrute le plus : les entreprises chinoises présentes au Bénin et dans la sous-région, en forte expansion.

### Entreprise chinoise au Bénin ou dans la sous-région
Le débouché le plus recherché : travailler comme interprète ou intermédiaire pour des entreprises chinoises investissant au Bénin (BTP, commerce, industrie).

### Interprète ou guide touristique
Accompagner des visiteurs ou des délégations chinoises, un métier de niche mais bien rémunéré compte tenu de la rareté de la compétence.

### Bourses d''études pour universités chinoises
Un débouché académique : obtenir des bourses pour poursuivre des études en Chine, une opportunité facilitée par la maîtrise du mandarin.

### Coopération sino-béninoise
Travailler pour des structures de coopération économique ou diplomatique entre le Bénin et la Chine.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable des relations avec des partenaires chinois pour une grande entreprise, ou traducteur spécialisé reconnu.

### Poursuivre ses études
Poursuite d''études en Chine via des bourses, ou Master en Langues Étrangères Appliquées avec spécialisation chinoise.'
WHERE slug = 'langue-chinoise';

-- ---------- DIDACTIQUE DU CHINOIS (Institut Confucius) ----------
UPDATE filieres SET
  description = 'La filière de Didactique du Chinois est une licence proposée par l''Institut Confucius, rattaché à l''UAC, qui forme spécifiquement à l''enseignement du mandarin, avec une orientation pédagogique en plus de la maîtrise de la langue. Tu y étudies le chinois avancé, ainsi que des méthodes de pédagogie appliquées à l''enseignement de cette langue à des apprenants non-sinophones. C''est une filière de niche, complémentaire à la Langue Chinoise, pour ceux qui veulent transmettre cette compétence rare plutôt que l''utiliser directement en entreprise.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux enseigner le chinois plutôt que de l''utiliser directement en contexte professionnel ou commercial.

Le secteur qui recrute le plus : les établissements proposant l''apprentissage du chinois, en développement au Bénin avec l''Institut Confucius lui-même.

### Enseignement du chinois
Le débouché principal : enseigner le mandarin dans des établissements scolaires ou des centres de langues, notamment via l''Institut Confucius.

### Entreprise chinoise au Bénin ou dans la sous-région
Comme pour la filière voisine, un débouché possible en entreprise pour ceux qui souhaitent une carrière plus commerciale.

### Interprète ou guide touristique
Un débouché complémentaire, valorisant la maîtrise linguistique acquise.

### Bourses d''études pour universités chinoises
Poursuite d''études en Chine, notamment en didactique des langues, facilitée par cette spécialisation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique d''un centre de langue chinoise, ou formateur reconnu.

### Poursuivre ses études
Master en Didactique des Langues, avec spécialisation en chinois, souvent en lien avec des bourses d''études en Chine.'
WHERE slug = 'didactique-du-chinois';

-- ---------- LANGUE ARABE (ILACI) ----------
UPDATE filieres SET
  description = 'La filière de Langue Arabe est une licence proposée par l''ILACI (Institut de Langue Arabe et Culture Islamique), rattaché à l''UAC, qui forme à la maîtrise de la langue arabe et à la connaissance de la culture et de la civilisation arabo-musulmane. Tu y étudies la grammaire et l''expression arabes avancées, ainsi que la littérature et l''histoire du monde arabo-musulman. C''est une filière de spécialisation linguistique et culturelle, pertinente dans un Bénin qui compte une importante communauté musulmane et entretient des relations avec le monde arabe (coopération, commerce, tourisme religieux).',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans la langue et la culture arabes, avec des débouchés dans l''enseignement, la traduction et les relations avec le monde arabo-musulman.

Le secteur qui recrute le plus : l''enseignement, dans les établissements confessionnels et publics proposant l''arabe.

### Enseignement
Le débouché le plus direct : professeur d''arabe dans des établissements scolaires, notamment les écoles franco-arabes présentes au Bénin.

### Traducteur, interprétation, journalisme et communication
Travailler comme traducteur ou interprète pour des structures ayant des liens avec le monde arabe, ou dans le journalisme spécialisé.

### Recherche et analyse
Poursuivre en recherche sur les études arabes ou islamiques, dans des institutions académiques.

### Culture, tourisme et agence de voyage
Un débouché lié au tourisme religieux et culturel, notamment pour l''accompagnement de voyages vers des pays arabes.

### Écriture et rédaction en publicité
Un débouché plus créatif pour ceux qui combinent compétences linguistiques et rédactionnelles.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique en langue arabe, traducteur spécialisé, ou chargé de coopération avec des pays arabophones.

### Poursuivre ses études
Master en Langue et Civilisation Arabes, ou poursuite d''études dans des universités du monde arabe.'
WHERE slug = 'langue-arabe';

-- ---------- CULTURE ISLAMIQUE (ILACI) ----------
UPDATE filieres SET
  description = 'La filière de Culture Islamique est une licence proposée par l''ILACI, rattaché à l''UAC, qui forme à l''étude approfondie de la civilisation, de l''histoire et des sciences islamiques. Tu y étudies la culture et l''histoire du monde musulman, en complément de la langue arabe, avec une approche académique et non confessionnelle de ces disciplines. C''est une filière qui répond à un besoin éducatif réel au Bénin, pays où l''islam est l''une des principales religions pratiquées, et qui prépare à des métiers d''enseignement, de médiation culturelle et de recherche.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux approfondir tes connaissances de la civilisation et de la culture islamiques, dans une perspective académique, avec des débouchés dans l''enseignement et la médiation culturelle.

Le secteur qui recrute le plus : l''enseignement, dans les établissements confessionnels et les structures éducatives proposant cette discipline.

### Enseignement
Le débouché le plus direct : enseigner la culture islamique dans des établissements scolaires, notamment confessionnels.

### Traducteur, interprétation, journalisme et communication
Un débouché combinant les compétences linguistiques et culturelles acquises, pour des médias ou des structures de communication.

### Recherche et analyse
Poursuivre en recherche sur les études islamiques, dans des institutions académiques nationales ou internationales.

### Culture, tourisme et agence de voyage
Accompagner des projets de tourisme religieux ou culturel liés au monde musulman.

### Écriture et rédaction en publicité
Un débouché créatif pour ceux qui combinent expertise culturelle et compétences rédactionnelles.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique, chercheur en études islamiques, ou médiateur culturel reconnu.

### Poursuivre ses études
Master en Études Islamiques, en Civilisation Arabo-Musulmane, ou poursuite dans des universités spécialisées du monde arabe.'
WHERE slug = 'culture-islamique';


-- ================================================================
-- >>> FICHIER SOURCE : 13_up_lot10_fa_fm_enatse_ifsio_iut.sql
-- ================================================================

-- ============================================================
-- UP (Université de Parakou) — LOT 10 : FA, FM, ENATSE, IFSIO, IUT (14 filières)
-- ============================================================

-- ---------- SCIENCES ET TECHNIQUES DE PRODUCTION VÉGÉTALE (FA, UP) ----------
UPDATE filieres SET
  description = 'La filière de Sciences et Techniques de Production Végétale est une licence proposée par la Faculté d''Agronomie de l''Université de Parakou (UP), qui forme aux techniques de culture adaptées au contexte agro-écologique du Nord-Bénin : sélection variétale, itinéraires techniques, gestion de la fertilité des sols. Tu y étudies l''agronomie appliquée et la phytopathologie, avec un ancrage régional fort puisque l''UP forme spécifiquement des cadres pour accompagner l''agriculture des départements septentrionaux, une zone à fort potentiel céréalier (maïs, sorgho, coton) mais confrontée à des défis climatiques spécifiques.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur le développement agricole du Nord-Bénin, une région à forte vocation céréalière et cotonnière avec des besoins techniques importants.

Le secteur qui recrute le plus : les structures d''appui agricole régionales (CARDER Nord, sociétés cotonnières) et les coopératives de producteurs.

### Entrepreneuriat agricole
Créer ou gérer sa propre exploitation, notamment dans les filières céréalières et cotonnières dominantes de la région.

### Contrôleur de qualité des cultures
Un débouché lié à la filière coton, particulièrement structurée et exigeante en matière de contrôle qualité dans le Nord-Bénin.

### Technicien en gestion et conservation
Accompagner les producteurs dans la gestion post-récolte, un enjeu majeur pour réduire les pertes après les récoltes céréalières.

### Conseil agricole et vulgarisation
Intervenir auprès des exploitations pour diffuser les bonnes pratiques, souvent via les structures régionales d''appui agricole.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une coopérative, chef de zone pour une société cotonnière, ou exploitant agricole reconnu.

### Poursuivre ses études
Master en Agronomie ou en Production Végétale, à l''UP ou dans d''autres universités agronomiques du pays.'
WHERE slug = 'sciences-et-techniques-de-production-vegetale-2';

-- ---------- SCIENCES ET TECHNIQUES DE PRODUCTION ANIMALE ET HALIEUTIQUE (FA, UP) ----------
UPDATE filieres SET
  description = 'La filière de Sciences et Techniques de Production Animale et Halieutique est une licence proposée par la Faculté d''Agronomie de l''UP, qui forme à l''élevage et à la pêche adaptés au contexte du Nord-Bénin : zootechnie, gestion des troupeaux, initiation à la pisciculture. Tu y étudies la nutrition animale, la santé du bétail, et les bases de la production halieutique. C''est une filière particulièrement pertinente pour une région où l''élevage bovin et la transhumance jouent un rôle économique et culturel important, avec des enjeux spécifiques de gestion des conflits agriculteurs-éleveurs.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à l''élevage, dans une région du Bénin où le pastoralisme et la transhumance occupent une place économique et sociale importante.

Le secteur qui recrute le plus : les structures d''appui à l''élevage et les coopératives d''éleveurs du Nord-Bénin.

### Technicien en gestion et conduite d''élevage/gestion agricole
Le débouché principal : accompagner les éleveurs dans l''optimisation de leurs troupeaux, un enjeu clé dans une région à forte tradition pastorale.

### Vétérinaire agricole
Un débouché de terrain pour le suivi sanitaire des troupeaux, en complément ou en lien avec des vétérinaires diplômés.

### Enseignant des lycées agricoles
Transmettre les compétences en production animale dans les établissements techniques agricoles de la région.

### Halieutique et pisciculture
Accompagner le développement de l''aquaculture, encore émergente dans le Nord-Bénin, comme alternative de diversification.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une grande exploitation d''élevage, ou expert en gestion pastorale pour des projets régionaux.

### Poursuivre ses études
Master en Production Animale, avec passerelle possible vers les études vétérinaires complètes.'
WHERE slug = 'sciences-et-techniques-de-production-animale-et-halieutique';

-- ---------- AMÉNAGEMENT ET GESTION DES RESSOURCES NATURELLES (FA, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Aménagement et Gestion des Ressources Naturelles est une licence proposée par la Faculté d''Agronomie de l''UP, qui forme à la gestion durable des ressources naturelles du Nord-Bénin : sols, forêts, ressources en eau, dans un contexte de pression croissante liée à l''agriculture et à l''élevage. Tu y étudies l''écologie appliquée, la gestion des terroirs, et les techniques de conservation des ressources naturelles. C''est une filière essentielle pour une région confrontée à des enjeux de désertification progressive et de gestion des conflits d''usage des terres entre agriculture et pastoralisme.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur la préservation des ressources naturelles dans une région du Bénin particulièrement exposée aux pressions environnementales et aux conflits d''usage des terres.

Le secteur qui recrute le plus : les structures publiques et ONG de gestion environnementale actives dans le Nord-Bénin.

### Gestion et restauration de l''environnement
Le débouché principal : participer à des projets de restauration des sols dégradés ou de gestion durable des terroirs.

### Aménagement des espaces ruraux
Contribuer à la planification de l''usage des terres pour limiter les conflits entre agriculteurs et éleveurs.

### ONG environnementales régionales
De nombreuses organisations interviennent sur la gestion des ressources naturelles dans le Nord-Bénin, un contexte prioritaire face au changement climatique.

### Structures publiques de gestion territoriale
Intégrer des services décentralisés en charge de l''aménagement du territoire rural.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de programme de gestion des ressources naturelles, ou expert en résolution de conflits agropastoraux.

### Poursuivre ses études
Master en Gestion des Ressources Naturelles, en Écologie Appliquée, ou en Développement Rural.'
WHERE slug = 'amenagement-et-gestion-des-ressources-naturelles';

-- ---------- SOCIOLOGIE ET ECONOMIE RURALES (FA, UP) ----------
UPDATE filieres SET
  description = 'La filière de Sociologie et Economie Rurales est une licence proposée par la Faculté d''Agronomie de l''UP, qui forme à la dimension sociale et économique du monde rural du Nord-Bénin : dynamiques communautaires, économie des exploitations familiales, accompagnement au changement. Tu y étudies la sociologie rurale, l''économie agricole, et les méthodes d''intervention communautaire. C''est une filière qui fait le pont entre technique agricole et réalités humaines, essentielle pour accompagner efficacement le développement rural d''une région où les traditions communautaires jouent un rôle central dans l''organisation de la production.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux comprendre les réalités sociales et économiques du monde rural du Nord-Bénin, pour mieux accompagner son développement.

Le secteur qui recrute le plus : les projets de développement rural et les structures de vulgarisation agricole régionales.

### Entreprise et ferme agricole
Accompagner la gestion économique et sociale d''exploitations agricoles familiales, courantes dans la région.

### Structures de recherches et vulgarisation
Travailler pour des structures publiques ou de recherche chargées de diffuser les innovations agricoles dans le Nord-Bénin.

### Enseignant des lycées agricoles
Transmettre les bases de la sociologie et de l''économie rurales aux futurs techniciens agricoles.

### ONG de développement rural
Coordonner des projets d''accompagnement des communautés rurales, en intégrant les dimensions sociales du développement.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable régional de développement rural, ou consultant en économie agricole du Nord-Bénin.

### Poursuivre ses études
Master en Économie Agricole, en Sociologie Rurale, ou en Développement Rural.'
WHERE slug = 'sociologie-et-economie-rurales';

-- ---------- NUTRITION ET SCIENCES AGRO-ALIMENTAIRES (FA, UP) ----------
UPDATE filieres SET
  description = 'La filière de Nutrition et Sciences Agro-alimentaires est une licence proposée par la Faculté d''Agronomie de l''UP, qui forme à la transformation et la valorisation nutritionnelle des produits agricoles issus du Nord-Bénin (céréales, produits laitiers, arachide). Tu y étudies la biochimie alimentaire, les procédés de transformation, et les bases de la nutrition humaine. C''est une filière importante pour une région où la sécurité alimentaire et la lutte contre la malnutrition infantile restent des priorités de santé publique.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la transformation des produits agricoles régionaux et aux enjeux nutritionnels, dans une zone où la sécurité alimentaire reste un défi majeur.

Le secteur qui recrute le plus : les initiatives de transformation agroalimentaire locale et les programmes de lutte contre la malnutrition.

### Technique de diététique
Accompagner des programmes de nutrition dans des centres de santé de la région, en lien avec les enjeux de malnutrition infantile.

### Industries agroalimentaires locales
Travailler dans la transformation des produits agricoles régionaux (céréales, arachide, produits laitiers).

### Nutrition dans les hôpitaux, centres de santé et industries agroalimentaires
Un débouché mixte entre santé publique et industrie, valorisant l''expertise en nutrition appliquée.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable qualité d''une unité de transformation locale, ou coordinateur de programme de nutrition régional.

### Poursuivre ses études
Master en Nutrition ou en Technologie Alimentaire, à l''UP ou dans d''autres universités du pays.'
WHERE slug = 'nutrition-et-sciences-agro-alimentaires';

-- ---------- MÉDECINE HUMAINE (FM, UP) ----------
UPDATE filieres SET
  description = 'La filière de Médecine Humaine est un cursus long proposé par la Faculté de Médecine de l''UP, qui forme les futurs médecins pour le Nord-Bénin. Comme à l''UAC, tu y étudies l''anatomie, la physiologie et les bases cliniques avant de te spécialiser sur plusieurs années. La particularité de cette faculté est sa vocation régionale explicite : elle a été créée précisément pour former des médecins qui exerceront dans les départements du Nord, une zone historiquement moins bien dotée en personnel médical que le Sud du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une vocation médicale forte et que tu es prêt à un parcours d''études long, avec la perspective de contribuer à combler le déficit de médecins dans le Nord-Bénin.

Le secteur qui recrute le plus, avec un besoin particulièrement criant : la médecine générale dans les hôpitaux et centres de santé du Nord-Bénin.

### Médecin généraliste en zone Nord
Le débouché prioritaire de cette faculté : exercer dans les hôpitaux et centres de santé des départements septentrionaux, où le déficit médical reste important.

### Spécialisations médicales
Comme à l''UAC, poursuite possible vers de nombreuses spécialités après le cycle général, via concours d''internat.

### Médecine rurale
Un engagement particulièrement valorisé dans le contexte de cette faculté, avec parfois des conditions d''installation facilitées par l''État pour les zones sous-dotées.

### Santé publique régionale
Certains médecins évoluent vers la gestion de la santé publique au niveau départemental.

### Évoluer dans sa carrière
Avec l''expérience et la spécialisation, tu peux évoluer vers chef de service hospitalier ou médecin de référence régional.

### Poursuivre ses études
Poursuite obligatoire au-delà de la licence : cycle clinique complet, puis internat pour se spécialiser.'
WHERE slug = 'medecine-humaine';

-- ---------- SANTÉ PUBLIQUE ET SURVEILLANCE ÉPIDÉMIOLOGIQUE (ENATSE, UP) ----------
UPDATE filieres SET
  description = 'La filière de Santé publique et surveillance épidémiologique est une licence proposée par l''ENATSE (École Nationale de formation des Techniciens Supérieurs en Santé Publique et Surveillance Epidémiologique), rattachée à l''UP, qui forme des techniciens supérieurs capables de surveiller l''état de santé des populations et de détecter précocement les risques épidémiques. Tu y étudies l''épidémiologie appliquée, les statistiques sanitaires, et les méthodes de surveillance de terrain. C''est une filière stratégique pour le Nord-Bénin, une zone frontalière avec le Niger et le Burkina Faso, particulièrement exposée aux risques de propagation d''épidémies transfrontalières.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux jouer un rôle de vigie sanitaire, en surveillant et anticipant les risques épidémiques dans une région frontalière particulièrement exposée.

Le secteur qui recrute le plus : les structures de surveillance sanitaire régionale, renforcées face aux risques épidémiques transfrontaliers.

### Biostatisticien dans les services de Santé
Le débouché principal : analyser des données sanitaires pour orienter les décisions de santé publique au niveau régional.

### Agent de Surveillance épidémiologique
Détecter et signaler les risques d''épidémie sur le terrain, un rôle particulièrement stratégique dans le Nord-Bénin.

### Attaché de Recherche des instituts de Recherche en Santé
Contribuer à des programmes de recherche sur les maladies infectieuses et leur propagation régionale.

### Agent des collectivités locales
Appuyer les communes dans la mise en place de dispositifs de veille sanitaire.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de la surveillance épidémiologique d''un département, ou expert pour des organisations internationales de santé.

### Poursuivre ses études
Master en Épidémiologie ou en Santé Publique, à l''ENATSE, à l''IRSP (UAC), ou à l''international.'
WHERE slug = 'sante-publique-et-surveillance-epidemiologique';

-- ---------- SOINS INFIRMIERS (IFSIO, UP) ----------
UPDATE filieres SET
  description = 'La filière de Soins Infirmiers est une licence proposée par l''IFSIO (Institut de Formation en Soins Infirmiers et Obstétricaux), rattaché à l''UP, qui forme les futurs infirmiers diplômés d''État pour le Nord-Bénin. Comme à l''INMeS de l''UAC, tu y apprends les soins de base et spécialisés, avec une large part de stages pratiques. La formation répond à un besoin particulièrement aigu dans les départements septentrionaux, où le manque de personnel infirmier qualifié est encore plus marqué que dans le Sud du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux être au contact direct des patients dans une région où le besoin en personnel infirmier qualifié est particulièrement fort.

Le secteur qui recrute le plus, sans concurrence : les hôpitaux et centres de santé du Nord-Bénin, avec une demande qui dépasse largement l''offre de diplômés.

### Soins infirmiers en hôpitaux et centres de santé du Nord
Le débouché quasi automatique : infirmier diplômé d''État dans un hôpital public ou un centre de santé communal des départements septentrionaux.

### Santé communautaire en zone rurale
Un débouché fréquent compte tenu du caractère rural de la région : agent infirmier dans des programmes de santé communautaire.

### Soins spécialisés
Après une première expérience, spécialisation possible en urgences, pédiatrie ou soins intensifs.

### Évoluer dans sa carrière
Avec l''ancienneté, tu peux évoluer vers infirmier major, ou formateur en école d''infirmiers.

### Poursuivre ses études
Master en Sciences Infirmières, ou spécialisation en santé publique.'
WHERE slug = 'soins-infirmiers';

-- ---------- SOINS OBSTÉTRICAUX (IFSIO, UP) ----------
UPDATE filieres SET
  description = 'La filière de Soins obstétricaux est une licence proposée par l''IFSIO, rattaché à l''UP, qui forme les futures sages-femmes diplômées d''État pour le Nord-Bénin. Comme à l''UAC, tu y apprends le suivi de grossesse, l''accompagnement de l''accouchement et les soins postnataux, avec une forte proportion de stages en maternité. Cette formation répond à un enjeu de santé publique majeur dans les départements du Nord, où l''accès aux soins de maternité qualifiés reste inégal, notamment en zone rurale éloignée des grands centres hospitaliers.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux accompagner les femmes du Nord-Bénin à un moment clé de leur vie, dans une région où l''accès à des soins de maternité qualifiés reste un défi.

Le secteur qui recrute le plus, sans équivalent : les soins obstétricaux en maternité, un besoin critique dans les départements septentrionaux.

### Sage-femme en maternité du Nord-Bénin
Le débouché quasi systématique : poste de sage-femme diplômée d''État dans une maternité publique ou un centre de santé communal de la région.

### Santé maternelle en zone rurale
Un secteur prioritaire, où les sages-femmes jouent un rôle central pour réduire la mortalité maternelle, particulièrement élevée dans les zones rurales éloignées.

### Planification familiale
Conseil et accompagnement en matière de contraception, en lien avec des structures publiques ou des ONG.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers sage-femme major, ou coordinatrice de programme de santé maternelle régionale.

### Poursuivre ses études
Master en Sciences Obstétricales ou en Santé de la Reproduction.'
WHERE slug = 'soins-obstetricaux';

-- ---------- GESTION DES BANQUES (IUT, UP) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Banques est une licence proposée par l''IUT (Institut Universitaire de Technologie), rattaché à l''UP, qui forme aux métiers bancaires pour le Nord-Bénin. Tu y étudies les techniques bancaires, la gestion de la relation client, et les bases du crédit et de l''épargne. C''est une filière qui répond au développement progressif du réseau bancaire dans les départements septentrionaux, où les banques et institutions financières étendent leur présence pour accompagner le développement économique régional.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler dans le secteur bancaire, avec des perspectives d''emploi liées au développement du réseau financier dans le Nord-Bénin.

Le secteur qui recrute le plus : les agences bancaires en expansion dans les départements du Nord.

### Organismes financiers ou de gestion
Le débouché principal : travailler pour des établissements de crédit, des banques centrales ou des entreprises commerciales de banque dans la région.

### Chargé de clientèle en banque
Conseiller des particuliers ou des entreprises locales sur leurs produits bancaires.

### Institutions de microfinance
Un débouché complémentaire, particulièrement pertinent dans une région où la microfinance joue un rôle important pour les petits producteurs et commerçants.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chef d''agence bancaire régionale, ou responsable clientèle entreprise.

### Poursuivre ses études
Master en Banque et Finance, à l''UP ou dans d''autres universités du pays.'
WHERE slug = 'gestion-des-banques';

-- ---------- GESTION COMMERCIALE (IUT, UP) ----------
UPDATE filieres SET
  description = 'La filière de Gestion Commerciale est une licence proposée par l''IUT, rattaché à l''UP, qui forme aux techniques commerciales et à la gestion des échanges dans le contexte économique du Nord-Bénin. Tu y étudies le marketing, la gestion des ventes, et les techniques commerciales adaptées aux réalités régionales, notamment les échanges transfrontaliers avec le Niger et le Burkina Faso, importants pour l''économie de la région.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler dans le commerce, avec une pertinence particulière dans une région marquée par des échanges transfrontaliers actifs.

Le secteur qui recrute le plus : les entreprises commerciales locales et les acteurs du commerce transfrontalier.

### Entreprises commerciales aux services logistiques internationale
Un débouché lié aux échanges avec les pays voisins enclavés, où le Nord-Bénin joue un rôle de carrefour commercial.

### Chef commercial ou attaché commercial
Le débouché le plus direct : gérer les ventes et la relation client pour une entreprise commerciale ou un centre commercial.

### Sociétés de transit et de manutention
Un secteur pertinent compte tenu du rôle de transit du Nord-Bénin vers les pays sahéliens.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable commercial régional, ou directeur d''une structure de distribution.

### Poursuivre ses études
Master en Marketing ou en Gestion Commerciale.'
WHERE slug = 'gestion-commerciale';

-- ---------- GESTION DES ENTREPRISES (IUT, UP) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Entreprises est une licence proposée par l''IUT, rattaché à l''UP, qui forme aux bases de la gestion d''entreprise : comptabilité, management, stratégie, adaptées au tissu économique du Nord-Bénin (PME agricoles, commerciales, artisanales). Tu y étudies les fondamentaux de la gestion, avec une approche généraliste utile pour accompagner le développement des petites et moyennes entreprises de la région.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux une formation généraliste en gestion, utile pour accompagner le tissu de PME du Nord-Bénin.

Le secteur qui recrute le plus : les cabinets de conseil et les administrations locales.

### Cabinets de conseil et administrations
Le débouché principal : accompagner la gestion de petites structures publiques ou privées de la région.

### Petites et moyennes entreprises
Intégrer directement des PME locales pour leur gestion administrative et financière.

### ONG
Les nombreuses ONG actives dans le Nord-Bénin recherchent également des profils formés à la gestion pour leurs opérations locales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable administratif et financier, ou consultant en gestion de PME.

### Poursuivre ses études
Master en Management des Organisations ou en Gestion d''Entreprise.'
WHERE slug = 'gestion-des-entreprises';

-- ---------- GESTION DES TRANSPORTS ET LOGISTIQUES (IUT, UP) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Transports et Logistiques est une licence proposée par l''IUT, rattaché à l''UP, qui forme à l''organisation des flux de transport dans le contexte particulier du Nord-Bénin, zone de transit vers les pays sahéliens enclavés (Niger, Burkina Faso, Mali). Tu y étudies la logistique, la gestion administrative des transports, et les techniques d''optimisation des flux commerciaux régionaux. C''est une filière stratégique pour une région dont l''économie dépend fortement des échanges transfrontaliers.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la logistique et aux flux commerciaux, dans une région du Bénin qui constitue un carrefour de transit vers les pays sahéliens.

Le secteur qui recrute le plus : les entreprises de transport et de logistique liées au commerce transfrontalier.

### Banque, Société d''assurance et administrations
Un débouché large en gestion, valorisant la double compétence transport-administration.

### Service en charge de la logistique auprès des entreprises et compagnies aériennes
Coordonner les flux logistiques pour des entreprises régionales ou des compagnies de transport.

### Agent de fret dans les aéroports
Un débouché lié aux infrastructures de transport régionales.

### Structures des études et de l''exploitation du réseau national
Contribuer à la planification des infrastructures de transport pour la région.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable logistique régional, ou consultant en transport transfrontalier.

### Poursuivre ses études
Master en Logistique et Transport, ou en Supply Chain Management.'
WHERE slug = 'gestion-des-transports-et-logistiques';

-- ---------- INFORMATIQUE DE GESTION (IUT, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Informatique de Gestion est une licence proposée par l''IUT, rattaché à l''UP, qui forme aux outils informatiques appliqués à la gestion d''entreprise : développement d''applications de gestion, bases de données, systèmes d''information. Tu y étudies la programmation, la gestion de bases de données, et l''analyse des besoins informatiques d''une organisation, avec un accès aux bacheliers scientifiques du Nord-Bénin qui souhaitent une formation informatique appliquée sans quitter la région pour Cotonou.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux une formation informatique appliquée à la gestion d''entreprise, accessible dans le Nord-Bénin sans nécessiter de déplacement vers le Sud du pays.

Le secteur qui recrute le plus : les entreprises et administrations locales ayant besoin de compétences informatiques de gestion.

### Génie informatique en entreprise
Le débouché principal : développer et maintenir des systèmes informatiques de gestion pour des entreprises ou administrations régionales.

### Banque, entreprise de prestation de service, éditeur de logiciels
Un large éventail de structures qui recrutent ce profil polyvalent.

### Analyste programmeur, ingénieur logiciel
Pour les profils les plus techniques, développement de solutions informatiques sur mesure.

### Administrateur de réseau
Assurer la maintenance des infrastructures informatiques d''une organisation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable informatique d''une entreprise régionale, ou développeur senior.

### Poursuivre ses études
Master en Informatique de Gestion ou en Systèmes d''Information.'
WHERE slug = 'informatique-de-gestion';


-- ================================================================
-- >>> FICHIER SOURCE : 14_up_lot11_final_enspd_faseg_fdsp_flash.sql
-- ================================================================

-- ============================================================
-- UP (Université de Parakou) — LOT 11 (FINAL) : ENSPD, FASEG, FDSP, FLASH (19 filières)
-- ============================================================

-- ---------- GESTION DES RESSOURCES HUMAINES (ENSPD, UP) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Ressources Humaines est une licence proposée par l''ENSPD (École Nationale de Statistique, de Planification et de Démographie), rattachée à l''UP, qui forme aux métiers de la gestion du personnel : recrutement, paie, droit du travail. Tu y étudies le droit social et les techniques de gestion administrative du personnel, une compétence transversale recherchée par toute organisation, publique ou privée, du Nord-Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes l''humain et l''organisation, et que tu veux jouer un rôle clé dans le fonctionnement interne des entreprises et administrations du Nord-Bénin.

Le secteur qui recrute le plus : les entreprises, assurances nationales et organismes présents dans la région.

### Gestion du personnel en entreprise et organisme
Le débouché principal : gérer les dossiers administratifs des salariés (contrats, paie, congés) au sein d''entreprises ou d''organismes régionaux.

### Assurances nationales
Un secteur qui recrute spécifiquement ce profil pour la gestion de son personnel et de ses agences régionales.

### ONG
Les nombreuses ONG présentes dans le Nord-Bénin recherchent également des profils RH pour la gestion de leurs équipes locales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable RH, ou consultant en recrutement pour la région.

### Poursuivre ses études
Master en Gestion des Ressources Humaines, en Droit Social, ou en Management des Organisations.'
WHERE slug = 'gestion-des-ressources-humaines-2';

-- ---------- STATISTIQUES APPLIQUÉES (ENSPD, UP) ----------
UPDATE filieres SET
  description = 'La filière de Statistiques Appliquées est une licence proposée par l''ENSPD, rattachée à l''UP, à laquelle on accède sur concours, qui forme à l''analyse statistique et à la planification pour la région Nord du Bénin. Tu y développes des compétences quantitatives poussées en mathématiques et culture générale, avec pour objectif de former des experts capables de produire et d''interpréter des données fiables pour orienter les décisions publiques régionales.',
  debouches = 'Pour qui ? Cette filière te convient si tu as un vrai goût pour les chiffres et l''analyse, et que tu vises des postes d''expertise statistique dans le contexte régional du Nord-Bénin.

Le secteur qui recrute le plus : les ministères sectoriels et les administrations nationales et cabinets d''études.

### Planificateur dans les ministères sectoriels
Le débouché principal : appuyer la planification de politiques publiques à partir de données statistiques fiables.

### Administrations nationales et cabinets
Intégrer des services statistiques publics ou des cabinets d''études économiques.

### Centres ou laboratoires de recherche et cabinets d''études
Contribuer à des travaux de recherche statistique appliquée, notamment sur les dynamiques régionales du Nord-Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers statisticien régional référent, ou responsable d''études pour une institution publique.

### Poursuivre ses études
Master en Statistique Appliquée, en Planification, ou en Économétrie, notamment dans des écoles régionales spécialisées.'
WHERE slug = 'statistiques-appliquees';

-- ---------- PLANIFICATION ET SUIVI ÉVALUATION (ENSPD, UP) ----------
UPDATE filieres SET
  description = 'La filière de Planification et Suivi Evaluation est une licence proposée par l''ENSPD, rattachée à l''UP, qui forme à l''évaluation des politiques et projets publics : conception d''indicateurs, suivi de la mise en œuvre, mesure d''impact. Tu y étudies les méthodes de planification, l''économie du développement, et les techniques d''évaluation de programmes. C''est une filière essentielle pour mesurer l''efficacité des nombreux projets de développement mis en œuvre dans le Nord-Bénin par l''État et les bailleurs internationaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux évaluer l''efficacité des politiques et projets publics, un métier stratégique pour orienter les investissements de développement dans le Nord-Bénin.

Le secteur qui recrute le plus : les centres de recherche, cabinets d''études et projets de développement financés par des bailleurs internationaux.

### Centres de laboratoires/recherche et cabinets d''études
Le débouché principal : réaliser des études d''évaluation pour des institutions publiques ou des bailleurs de fonds.

### Projets de développement et ONG
Suivre et évaluer l''impact de projets de développement mis en œuvre dans la région, un besoin constant compte tenu du nombre de programmes actifs.

### Services de consultation
Accompagner des institutions ou des entreprises dans l''évaluation de leurs actions, en indépendant ou au sein d''un cabinet.

### Structures de finance et de microfinance
Un débouché connexe pour l''évaluation de programmes financiers régionaux.

### Direction Nationale de la Statistique
Contribuer aux travaux de planification et d''évaluation au niveau national.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers expert en évaluation de programmes, ou responsable régional de suivi-évaluation pour une organisation internationale.

### Poursuivre ses études
Master en Suivi-Évaluation de Projets, en Économie du Développement, ou en Planification.'
WHERE slug = 'planification-et-suivi-evaluation';

-- ---------- ANALYSE ET POLITIQUE ÉCONOMIQUES (APE) (FASEG, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Analyse et Politique Economiques (APE) est une licence proposée par la FASEG de l''UP, qui forme à l''analyse économique appliquée aux politiques publiques, avec une attention particulière aux enjeux économiques du Nord-Bénin (agriculture, échanges transfrontaliers). Tu y étudies la macroéconomie, l''économie du développement, et les méthodes d''analyse des politiques publiques. C''est une filière qui prépare à comprendre et influencer les choix économiques à l''échelle régionale et nationale.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux analyser et influencer les politiques économiques, avec un ancrage particulier sur les enjeux du développement régional du Nord-Bénin.

Le secteur qui recrute le plus : les cabinets conseils en politiques économiques et les structures de développement local.

### Cabinets Conseils en Politiques Economiques
Le débouché principal : analyser et conseiller sur les politiques économiques, pour des institutions publiques ou des bailleurs internationaux.

### Cabinets Conseils en Projets de Développement
Accompagner la conception et l''évaluation économique de projets de développement régional.

### Structures Chargées de Questions Liées aux Affaires Economiques
Intégrer des ONG ou des ministères travaillant sur les questions économiques.

### Auto emploi
Un débouché entrepreneurial pour ceux qui souhaitent développer leur propre activité de conseil économique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers économiste senior, ou consultant reconnu en politiques économiques régionales.

### Poursuivre ses études
Master en Économie du Développement, ou en Politiques Économiques.'
WHERE slug = 'analyse-et-politique-economiques-ape';

-- ---------- ECONOMIE AGRICOLE (EA) (FASEG, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Economie Agricole (EA) est une licence proposée par la FASEG de l''UP, qui forme à l''analyse économique appliquée spécifiquement au secteur agricole, particulièrement pertinent pour une région où l''agriculture (coton, céréales, élevage) constitue le pilier économique. Tu y étudies l''économie agricole, l''analyse de filières, et les mécanismes de commercialisation des produits agricoles. C''est une filière stratégique pour accompagner la structuration et la rentabilité des filières agricoles du Nord-Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux analyser et accompagner économiquement le secteur agricole, pilier de l''économie du Nord-Bénin.

Le secteur qui recrute le plus : les cabinets conseils en politiques économiques et projets de développement agricole.

### Cabinets Conseils en Politiques Economiques
Le débouché principal : conseiller sur les politiques agricoles régionales, un enjeu central pour le développement du Nord-Bénin.

### Cabinets Conseils en Projets de Développement
Accompagner des projets de développement agricole, notamment dans les filières coton et céréales.

### Structures Chargées de Questions Liées aux Affaires Economiques
Intégrer des structures publiques ou des ONG travaillant sur l''économie agricole régionale.

### Auto emploi
Développer sa propre activité de conseil en économie agricole.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers expert en économie des filières agricoles, ou responsable de programme agricole pour une organisation internationale.

### Poursuivre ses études
Master en Économie Agricole, ou en Économie du Développement Rural.'
WHERE slug = 'economie-agricole-ea';

-- ---------- ECONOMIE ET FINANCE DES COLLECTIVITÉS LOCALES (EFCL) (FASEG, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Economie et Finance des Collectivités Locales (EFCL) est une licence proposée par la FASEG de l''UP, qui forme à la gestion financière des communes et intercommunalités, un enjeu croissant avec la décentralisation au Bénin. Tu y étudies les finances publiques locales, la fiscalité communale, et la gestion budgétaire territoriale. C''est une filière particulièrement utile dans le contexte du Nord-Bénin, où les collectivités locales ont un rôle croissant dans le développement territorial.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans la gestion financière des collectivités locales, un domaine en pleine structuration avec la décentralisation béninoise.

Le secteur qui recrute le plus : les structures décentralisées (ministères, administrations, collectivités territoriales).

### Gestion Financière et Economie des Structures Décentralisées
Le débouché principal : gérer les finances d''une commune ou d''une intercommunalité, pour le compte de ministères, administrations ou collectivités territoriales.

### Structures Chargées de la Fiscalité des Collectivités Décentralisées
Intervenir dans la fiscalité locale, un enjeu croissant pour l''autonomie financière des communes.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur financier d''une intercommunalité, ou expert en finances locales.

### Poursuivre ses études
Master en Finances Publiques Locales, ou en Gestion des Collectivités Territoriales.'
WHERE slug = 'economie-et-finance-des-collectivites-locales-efcl';

-- ---------- ECONOMIE ET FINANCE INTERNATIONALES (EFI) (FASEG, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Economie et Finance Internationales (EFI) est une licence proposée par la FASEG de l''UP, qui forme à l''analyse économique et financière internationale, avec une pertinence particulière pour une région dont l''économie dépend fortement des échanges transfrontaliers avec le Niger, le Burkina Faso et le Mali. Tu y étudies l''économie internationale, la finance de marché, et les mécanismes des échanges régionaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses aux enjeux économiques et financiers internationaux, particulièrement pertinents dans une région de transit commercial vers les pays sahéliens.

Le secteur qui recrute le plus : les structures de conseil économique et financier, dans un contexte de forte activité commerciale régionale.

### Auto emploi
Développer une activité de conseil en économie ou finance internationale.

### Cabinets Conseils Création et Gestion d''Activités
Accompagner la création et le développement d''activités économiques transfrontalières.

### Structures Commerciales et Financières
Travailler pour des entreprises actives dans les échanges commerciaux avec les pays voisins.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers économiste spécialisé en commerce international, ou consultant en finance régionale.

### Poursuivre ses études
Master en Économie Internationale, en Finance, ou en Commerce International.'
WHERE slug = 'economie-et-finance-internationales-efi';

-- ---------- ENTREPRENARIAT ET GESTION DES ENTREPRISES (EGE) (FASEG, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Entreprenariat et Gestion des Entreprises (EGE) est une licence proposée par la FASEG de l''UP, qui forme à la création et à la gestion d''entreprises, avec une attention particulière aux opportunités économiques du Nord-Bénin. Tu y étudies la gestion d''entreprise, le montage de projets, et l''accompagnement à l''entrepreneuriat, avec pour objectif de former des porteurs de projets capables de créer et développer leur propre activité dans la région.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux devenir entrepreneur ou accompagner d''autres porteurs de projets dans le Nord-Bénin, une région avec des opportunités économiques encore peu exploitées.

Le secteur qui recrute le plus : l''auto-entrepreneuriat et les structures d''accompagnement à la création d''entreprise.

### Auto emploi
Le débouché principal : créer et diriger sa propre entreprise, dans divers secteurs de l''économie régionale.

### Cabinets Conseils en Etudes de Faisabilité
Accompagner d''autres porteurs de projets dans le montage de leur activité.

### PME et PMI
Intégrer ou accompagner la gestion de petites et moyennes entreprises locales.

### Évoluer dans sa carrière
Avec le succès de ton entreprise, tu peux évoluer vers dirigeant d''une entreprise en croissance, ou consultant reconnu en accompagnement entrepreneurial.

### Poursuivre ses études
Master en Entrepreneuriat, ou en Management des Organisations.'
WHERE slug = 'entreprenariat-et-gestion-des-entreprises-ege';

-- ---------- MARKETING ET MANAGEMENT DES ORGANISATIONS (MMO) (FASEG, UP) ----------
UPDATE filieres SET
  description = 'La filière de Marketing et Management des Organisations (MMO) est une licence proposée par la FASEG de l''UP, qui forme aux techniques de marketing et de gestion des organisations, adaptées au contexte économique du Nord-Bénin. Tu y étudies le marketing, le management, et l''organisation des entreprises, avec des débouchés dans la gestion commerciale et administrative de structures régionales.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux accompagner des entreprises et organisations dans leur gestion et leur développement commercial, dans le contexte spécifique du Nord-Bénin.

Le secteur qui recrute le plus : les entreprises, structures publiques et projets de développement de la région.

### Auto emploi
Un débouché fréquent pour les profils entrepreneurs formés à cette filière.

### Cabinets Conseils en Management et en Marketing
Accompagner des entreprises régionales dans leur stratégie commerciale et organisationnelle.

### Structures Chargées des Questions Liées aux Affaires
Intégrer des ministères ou administrations en charge des questions économiques régionales.

### Projets de Développement et entreprises de tous genres
Un large éventail de débouchés dans la gestion et le marketing appliqués à divers secteurs.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable marketing d''une entreprise régionale, ou consultant en management.

### Poursuivre ses études
Master en Marketing, ou en Management des Organisations.'
WHERE slug = 'marketing-et-management-des-organisations-mmo';

-- ---------- FINANCE ET COMPTABILITÉ (FC) (FASEG, UP) ----------
UPDATE filieres SET
  description = 'La filière de Finance et Comptabilité (FC) est une licence proposée par la FASEG de l''UP, qui forme aux métiers comptables et financiers pour le tissu économique du Nord-Bénin. Tu y étudies la comptabilité générale et analytique, la fiscalité, et l''analyse financière, avec des débouchés stables dans les entreprises et administrations de la région, où les compétences comptables qualifiées restent recherchées.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux avec les chiffres, et que tu veux un métier avec des débouchés stables dans le tissu économique du Nord-Bénin.

Le secteur qui recrute le plus : les entreprises et structures publiques régionales, ayant systématiquement besoin de compétences comptables.

### Auto emploi
Créer sa propre activité de conseil comptable ou financier, notamment pour les nombreuses PME de la région.

### Cabinets Conseils Financiers
Accompagner des entreprises dans leur gestion financière et fiscale.

### Structures Chargées des Questions Liées aux Finances
Intégrer des ministères ou administrations locales en charge des questions financières.

### Entreprises de tous genres
Le débouché le plus large : tenir la comptabilité de toute organisation ayant besoin de ce type de compétence.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur financier, ou expert-comptable après une certification complémentaire.

### Poursuivre ses études
Master en Comptabilité, Contrôle, Audit, ou préparation aux diplômes d''expertise comptable.'
WHERE slug = 'finance-et-comptabilite-fc';

-- ---------- DROIT PRIVÉ (FDSP, UP) ----------
UPDATE filieres SET
  description = 'La filière de Droit Privé est une licence proposée par la FDSP (Faculté de Droit et Sciences Politiques), rattachée à l''UP, qui forme au droit civil, commercial et des affaires pour le Nord-Bénin. Tu y étudies les grands principes du droit privé, avec les mêmes débouchés que la version équivalente de l''UAC, mais avec l''avantage d''une formation accessible sans nécessiter de déplacement vers le Sud du pays pour les bacheliers du Nord.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux, tu aimes argumenter, et que tu veux une formation juridique complète accessible dans le Nord-Bénin.

Le secteur qui recrute le plus : l''administration publique et les professions juridiques.

### Attaché des services administratifs
Le débouché le plus courant : intégrer l''administration publique après concours.

### Juristes des affaires
Accompagner des entreprises dans leurs questions juridiques et contractuelles.

### Greffier, collaborateurs de profession judiciaire
Intégrer le monde judiciaire comme greffier, ou collaborer avec des avocats, huissiers ou notaires.

### Magistrature
Accessible après un master et un concours, pour les meilleurs étudiants.

### Consultant, policier, militaire
Des débouchés variés valorisant les compétences juridiques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers avocat, magistrat, ou haut fonctionnaire.

### Poursuivre ses études
Master en Droit Privé ou en Droit des Affaires.'
WHERE slug = 'droit-prive';

-- ---------- DROIT PUBLIC (FDSP, UP) ----------
UPDATE filieres SET
  description = 'La filière de Droit Public est une licence proposée par la FDSP, rattachée à l''UP, qui forme au droit administratif, constitutionnel et des collectivités publiques pour le Nord-Bénin. Tu y étudies le fonctionnement de l''État et des institutions publiques, avec des débouchés orientés vers l''administration et les collectivités territoriales, particulièrement pertinents dans un contexte de décentralisation croissante.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses au fonctionnement des institutions publiques et de l''administration, avec une pertinence particulière pour les enjeux de décentralisation du Nord-Bénin.

Le secteur qui recrute le plus : l''administration publique et les collectivités territoriales.

### Attaché des services administratifs
Le débouché principal : intégrer l''administration publique, notamment au niveau des collectivités décentralisées.

### Juristes des affaires publiques
Accompagner des institutions publiques dans leurs questions juridiques.

### Magistrature
Un débouché de prestige accessible après un master et un concours.

### Collectivités territoriales
Un débouché particulièrement pertinent dans le contexte de décentralisation, pour la gestion juridique des communes.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers haut fonctionnaire, ou expert en droit des collectivités locales.

### Poursuivre ses études
Master en Droit Public, ou en Droit des Collectivités Territoriales.'
WHERE slug = 'droit-public';

-- ---------- SCIENCES POLITIQUES ET RELATIONS INTERNATIONALES (FLASH, UP) ----------
UPDATE filieres SET
  description = 'La filière de Sciences Politiques et Relations Internationales est une licence proposée par la FLASH (Faculté des Lettres, Arts et Sciences Humaines) de l''UP, qui forme à l''analyse des systèmes politiques et des relations internationales, avec un intérêt particulier pour les dynamiques régionales ouest-africaines (CEDEAO, relations avec les pays sahéliens voisins). Tu y étudies la science politique, les relations internationales, et les enjeux géopolitiques régionaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la politique et aux relations internationales, avec un ancrage particulier sur les dynamiques régionales ouest-africaines.

Le secteur qui recrute le plus : la diplomatie et les organisations régionales.

### Attaché de services administratifs
Un débouché large dans l''administration publique.

### Diplomate
Le débouché le plus prestigieux, via concours du corps diplomatique béninois.

### Consultant en politique publique
Analyser et conseiller sur les politiques publiques régionales.

### Médiateur, conseiller politique
Des débouchés dans l''accompagnement des processus politiques et institutionnels locaux.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers ambassadeur, ou expert en relations internationales régionales.

### Poursuivre ses études
Master en Sciences Politiques ou en Relations Internationales.'
WHERE slug = 'sciences-politiques-et-relations-internationales';

-- ---------- ALLEMAND (FLASH, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Allemand est une licence proposée par la FLASH de l''UP, qui forme à la maîtrise de la langue et de la culture allemandes pour les bacheliers du Nord-Bénin. Comme à FLLAC (UAC), tu y étudies la grammaire avancée, la littérature et la civilisation germanophones, avec des débouchés dans l''enseignement, la traduction et la coopération germano-béninoise.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une appétence pour l''allemand et que tu veux en faire un outil professionnel, avec une formation accessible dans le Nord-Bénin.

Le secteur qui recrute le plus : la coopération internationale et l''enseignement.

### Enseignement
Le débouché principal : devenir professeur d''allemand dans les collèges et lycées de la région.

### Traducteur, interprète
Un débouché complémentaire pour ceux qui souhaitent travailler avec des structures allemandes présentes dans le pays.

### Agent dans le tourisme
Accompagnement de visiteurs germanophones dans le secteur touristique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, ou traducteur spécialisé.

### Poursuivre ses études
Master en Langues Étrangères Appliquées, ou séjour d''études en Allemagne via des bourses DAAD.'
WHERE slug = 'allemand-3';

-- ---------- ANGLAIS (FLASH, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Anglais est une licence proposée par la FLASH de l''UP, qui forme à la maîtrise avancée de la langue anglaise pour les bacheliers du Nord-Bénin. Tu y étudies la grammaire, la littérature et la civilisation anglophones, avec des débouchés dans l''enseignement, la traduction et le commerce transfrontalier — l''anglais étant particulièrement valorisé dans une région où les échanges avec le Nigeria anglophone jouent un rôle économique important.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux faire de l''anglais un vrai métier, avec une pertinence particulière pour les échanges commerciaux régionaux avec les pays anglophones.

Le secteur qui recrute le plus : l''enseignement, en tête des débouchés compte tenu du nombre d''élèves apprenant l''anglais.

### Enseignement
Le débouché le plus direct : professeur d''anglais dans les collèges et lycées de la région.

### Traducteur, interprète
Un débouché pour accompagner les échanges commerciaux et institutionnels avec les pays anglophones voisins.

### Agent dans le tourisme
Accueil de visiteurs anglophones dans le secteur touristique régional.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique, ou traducteur spécialisé en commerce international.

### Poursuivre ses études
Master en Langues Étrangères Appliquées, ou en Traduction.'
WHERE slug = 'anglais-3';

-- ---------- ESPAGNOL (FLASH, UP) ----------
UPDATE filieres SET
  description = 'La filière d''Espagnol est une licence proposée par la FLASH de l''UP, qui forme à la maîtrise avancée de la langue espagnole pour les bacheliers du Nord-Bénin. Tu y étudies la grammaire, la littérature et la civilisation hispanophones, avec des débouchés principalement dans l''enseignement, une compétence rare et valorisée dans la région.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans une langue moins courante mais recherchée, avec des débouchés stables dans l''enseignement.

Le secteur qui recrute le plus : l''enseignement, dans les collèges et lycées proposant l''espagnol.

### Enseignement
Le débouché principal : professeur d''espagnol dans le secondaire.

### Traducteur, interprète
Un débouché complémentaire pour des documents ou événements impliquant des partenaires hispanophones.

### Agent dans le tourisme
Un marché de niche pour l''accueil de visiteurs hispanophones.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique en langue espagnole.

### Poursuivre ses études
Master en Langues Étrangères Appliquées, ou séjour d''études en Espagne ou Amérique latine.'
WHERE slug = 'espagnol-3';

-- ---------- GÉOGRAPHIE ET AMÉNAGEMENT DU TERRITOIRE (FLASH, UP) ----------
UPDATE filieres SET
  description = 'La filière de Géographie et Aménagement du Territoire est une licence proposée par la FLASH de l''UP, qui forme à la lecture et à l''organisation de l''espace, avec un ancrage particulier sur les problématiques territoriales du Nord-Bénin : gestion des risques climatiques, enjeux de désertification, organisation de l''espace rural et pastoral. Tu y étudies la géographie humaine et physique, avec une pertinence directe pour comprendre les dynamiques spécifiques de cette région.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux comprendre et agir sur l''organisation du territoire du Nord-Bénin, une région aux enjeux climatiques et fonciers spécifiques.

Le secteur qui recrute le plus : l''enseignement, suivi par l''aménagement territorial régional.

### Enseignement
Le débouché principal : professeur de géographie dans les collèges et lycées.

### Urbaniste, climatologue, géomorphologue, hydrologue
Des débouchés techniques pour ceux qui s''orientent vers l''aménagement ou l''analyse environnementale régionale.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chercheur en géographie régionale, ou expert en aménagement territorial du Nord-Bénin.

### Poursuivre ses études
Master en Géographie, en Aménagement du Territoire, ou en Climatologie.'
WHERE slug = 'geographie-et-amenagement-du-territoire-3';

-- ---------- SOCIOLOGIE ANTHROPOLOGIE (FLASH, UP) ----------
UPDATE filieres SET
  description = 'La filière de Sociologie Anthropologie est une licence proposée par la FLASH de l''UP, qui forme à l''étude des sociétés humaines, avec une pertinence particulière pour comprendre les dynamiques sociales et culturelles spécifiques du Nord-Bénin, marquées par une grande diversité ethnique et des enjeux de cohabitation entre communautés agricoles et pastorales. Tu y développes des méthodes d''enquête de terrain adaptées à ce contexte régional riche et complexe.',
  debouches = 'Pour qui ? Cette filière te convient si tu es curieux des dynamiques sociales, en particulier dans un contexte régional marqué par une grande diversité culturelle et des enjeux de cohabitation intercommunautaire.

Le secteur qui recrute le plus : le développement communautaire et les ONG actives dans le Nord-Bénin.

### Centres sociaux, ministères
Le débouché principal : intervenir dans des structures d''accompagnement social ou des administrations locales.

### Recherche
Contribuer à des travaux de recherche sur les dynamiques sociales et culturelles du Nord-Bénin.

### ONG et projets de développement
Un débouché fréquent, notamment pour des projets nécessitant une compréhension fine des réalités sociales locales et de la gestion des conflits intercommunautaires.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chargé de projet dans une ONG internationale, ou consultant en médiation communautaire.

### Poursuivre ses études
Master en Sociologie, en Anthropologie, ou en Développement Communautaire.'
WHERE slug = 'sociologie-anthropologie';

-- ---------- LETTRES MODERNES (FLASH, UP) ----------
UPDATE filieres SET
  description = 'La filière de Lettres Modernes est une licence proposée par la FLASH de l''UP, qui forme à la maîtrise approfondie de la langue française et des littératures francophones et africaines. Tu y étudies l''analyse littéraire, la linguistique, et la rédaction avancée, avec des débouchés principalement orientés vers l''enseignement du français, essentiel dans tout le système scolaire béninois y compris dans les départements du Nord.',
  debouches = 'Pour qui ? Cette filière te convient si tu as une vraie passion pour la langue française et les littératures, et que tu veux en faire un métier accessible depuis le Nord-Bénin.

Le secteur qui recrute le plus : l''enseignement du français, socle du système scolaire béninois.

### Enseignement
Le débouché le plus direct : professeur de français dans les collèges et lycées de la région.

### Rédaction et édition
Un débouché complémentaire pour ceux qui s''orientent vers la production de contenus écrits.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable pédagogique, ou formateur en didactique du français.

### Poursuivre ses études
Master en Lettres Modernes, ou en Sciences du Langage.'
WHERE slug = 'lettres-modernes-2';


-- ================================================================
-- >>> FICHIER SOURCE : 15_unstim_lot12_enset_insti.sql
-- ================================================================

-- ============================================================
-- UNSTIM — LOT 12 : ENSET (13), INSTI (5)
-- Note : Électronique (ENSET) déjà enrichie précédemment.
-- ============================================================

-- ---------- ÉLECTRONIQUE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière d''Électronique est une licence proposée par l''ENSET (UNSTIM) qui forme à la conception, la réalisation et la maintenance de circuits électroniques, analogiques comme numériques. Concrètement, tu y apprends à lire et dessiner des schémas électroniques, à manier les instruments de mesure (oscilloscope, multimètre), à monter des circuits imprimés, à programmer des microcontrôleurs (Arduino, ESP32) et à diagnostiquer les pannes sur des équipements électroniques — bref, à comprendre et faire fonctionner tout ce qui est électronique, du petit circuit domestique aux systèmes plus complexes. Ce qui distingue cette filière des autres formations techniques, c''est sa double orientation : une moitié du cursus est consacrée à la pratique technique pure, l''autre à la pédagogie et à la didactique, avec des stages d''observation en lycée technique.',
  objectifs_pedagogiques = 'Former des professeurs adjoints et techniciens capables de concevoir, réaliser et dépanner des circuits électroniques (analogiques et numériques), avec une double compétence : maîtrise technique du matériel électronique et pédagogie pour l''enseignement technique dans les lycées et collèges.',
  cours_principaux = '[
    {"nom": "Électronique analogique (composants, amplificateurs)", "semestre": 1},
    {"nom": "Électronique numérique (portes logiques, bascules)", "semestre": 1},
    {"nom": "Mathématiques appliquées à l''électronique", "semestre": 2},
    {"nom": "Mesures électriques et instrumentation (oscilloscope, multimètre)", "semestre": 2},
    {"nom": "Systèmes automatisés et microcontrôleurs", "semestre": 3},
    {"nom": "Électrotechnique appliquée", "semestre": 3},
    {"nom": "Technologie des composants et circuits imprimés", "semestre": 4},
    {"nom": "Pédagogie de l''enseignement technique", "semestre": 4},
    {"nom": "Didactique et stage d''observation en lycée", "semestre": 5},
    {"nom": "Projet tutoré de fin d''études", "semestre": 6}
  ]'::jsonb,
  cours_optionnels = '[
    {"nom": "Maintenance des équipements électroniques industriels"},
    {"nom": "Initiation à la robotique"}
  ]'::jsonb,
  projets_typiques = '[
    "Réalisation d''un circuit de commande automatisée (ex : éclairage à détection de mouvement)",
    "Montage d''une alimentation stabilisée",
    "Séquence pédagogique complète sur un thème du programme de lycée technique",
    "Diagnostic et réparation d''un appareil électronique défectueux"
  ]'::jsonb,
  stage_obligatoire = true,
  stage_duree = '1 mois d''observation en lycée technique + 1 mois en entreprise/atelier électronique',
  entreprises_cibles = '["lycées techniques publics et privés", "SBEE", "ateliers de maintenance électronique", "sociétés de télécommunications pour la partie technique"]'::jsonb,
  poursuite_etudes = 'CAPET (Certificat d''Aptitude au Professorat de l''Enseignement Technique), Master en Sciences de l''Éducation option technique, ou spécialisation en électronique industrielle.',
  equivalence_internationale = 'Proche d''une Licence Sciences de l''Éducation, parcours Sciences et Techniques Industrielles, dans le système LMD français — reconnaissance CAMES/UEMOA.',
  niveau_difficulte = 3,
  debouches = 'Pour qui ? Cette filière te convient si tu aimes autant bricoler des circuits que transmettre ce que tu sais, cette filière te donne un métier concret des deux côtés — sur le terrain technique, et devant une classe.

Le secteur qui recrute le plus : l''enseignement technique, débouché principal et le plus direct à la sortie de cette licence.

### Enseignement technique
Le débouché le plus direct et le plus recherché : **professeur adjoint d''électronique** dans les lycées et collèges techniques. Tu enseignes les bases de l''électronique aux élèves des filières techniques, tu encadres les travaux pratiques en atelier, et tu peux évoluer vers un poste de professeur titulaire en passant le CAPET après quelques années d''expérience ou une formation complémentaire.

### Maintenance et réparation électronique
Technicien de maintenance électronique dans l''industrie, les hôpitaux (matériel médical), ou les entreprises de services ; ou réparateur/dépanneur électronique en atelier ou en auto-entrepreneuriat, une activité très demandée localement pour l''électroménager et les équipements informatiques.

### Instrumentation et mesures
Technicien en instrumentation et mesures, notamment chez des opérateurs comme la SBEE ou les sociétés de télécommunications, pour l''installation et l''entretien d''équipements électroniques.

### Réseaux et télécoms
Technicien réseaux et télécoms pour la maintenance d''infrastructures électroniques chez des opérateurs mobiles (MTN Bénin, Moov Africa).

### Formation professionnelle
Formateur senior dans un centre de formation professionnelle ou une ONG technique, en dehors du système scolaire classique.

### Évoluer dans sa carrière
Après quelques années d''expérience, les débouchés s''élargissent vers professeur titulaire (via le CAPET), chef d''atelier/responsable technique dans une entreprise de maintenance, ou entrepreneur en électronique (atelier de réparation, revente d''équipements).

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), spécialisation en électronique industrielle, ou CAPET pour intégrer le corps professoral titulaire.'
WHERE slug = 'electronique';

-- ---------- COMPTABILITÉ (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Comptabilité est une licence proposée par l''ENSET (École Normale Supérieure de l''Enseignement Technique), rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de comptabilité pour les lycées techniques. Tu y étudies la comptabilité générale et analytique approfondie, ainsi que la pédagogie de l''enseignement technique. C''est une filière à double vocation, technique et pédagogique, qui prépare à transmettre les bases comptables aux futurs bacheliers technique-gestion du Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu es rigoureux avec les chiffres et que tu veux transmettre ces compétences en enseignant dans les lycées techniques.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique de la comptabilité.

### Professeur adjoint des Lycées et Collèges
Le débouché principal et quasi automatique : enseigner la comptabilité dans les lycées techniques et établissements de formation professionnelle.

### Comptabilité en entreprise
Un débouché alternatif pour ceux qui souhaitent finalement exercer en entreprise plutôt qu''enseigner, en s''appuyant sur les mêmes bases techniques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou formateur pédagogique en comptabilité.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou spécialisation en comptabilité et gestion.'
WHERE slug = 'comptabilite';

-- ---------- ÉCONOMIE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière d''Économie est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints d''économie pour les lycées techniques. Tu y étudies l''économie générale et appliquée, ainsi que la pédagogie de l''enseignement technique. C''est une filière qui prépare à enseigner les fondamentaux économiques dans les filières technique-gestion, avec une double compétence disciplinaire et pédagogique.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné d''économie et que tu veux transmettre ces connaissances en enseignant dans les lycées techniques.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique de l''économie.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner l''économie dans les lycées techniques et établissements de formation professionnelle.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou formateur pédagogique.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou en Économie Appliquée.'
WHERE slug = 'economie';

-- ---------- ÉLECTROTECHNIQUE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière d''Électrotechnique est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints d''électrotechnique. Tu y étudies l''électrotechnique appliquée (moteurs, réseaux électriques, installations), avec une double compétence technique et pédagogique. Contrairement à la filière Électronique de la même école, l''électrotechnique se concentre davantage sur les systèmes de puissance électrique (installations, moteurs) que sur les circuits de signal.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes autant la technique électrique de puissance (installations, moteurs) que la transmission de ce savoir à de futurs techniciens.

Le secteur qui recrute le plus : l''enseignement technique, avec des débouchés annexes en installation électrique.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner l''électrotechnique dans les lycées techniques.

### Technicien en installation électrique
Un débouché technique alternatif pour ceux qui souhaitent exercer en entreprise plutôt qu''enseigner.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou responsable technique en entreprise.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou spécialisation en électrotechnique industrielle.'
WHERE slug = 'electrotechnique';

-- ---------- GÉNIE CIVIL (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Génie Civil est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de génie civil pour les lycées techniques. Tu y étudies les bases de la construction (résistance des matériaux, calcul de structures), avec une double compétence technique et pédagogique. C''est une filière qui prépare à former les futurs techniciens du BTP béninois, un secteur en forte demande de main-d''œuvre qualifiée.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes la construction et que tu veux transmettre ces compétences techniques aux futurs professionnels du BTP.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique du génie civil.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner le génie civil dans les lycées techniques, formant les futurs techniciens du BTP béninois.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou vers le secteur du BTP en tant que technicien.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou spécialisation en génie civil.'
WHERE slug = 'genie-civil-2';

-- ---------- SECRÉTARIAT (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Secrétariat est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de secrétariat pour les lycées techniques. Tu y étudies les techniques de secrétariat et de bureautique avancées, avec une double compétence technique et pédagogique, pour former les futurs bacheliers technique-gestion aux compétences administratives.',
  debouches = 'Pour qui ? Cette filière te convient si tu es organisé et à l''aise en gestion administrative, et que tu veux transmettre ces compétences en enseignant dans les lycées techniques.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique du secrétariat.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner le secrétariat et la bureautique dans les lycées techniques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou vers des fonctions de secrétariat de direction en entreprise.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou en Gestion Administrative.'
WHERE slug = 'secretariat';

-- ---------- MÉCANIQUE AUTOMOBILE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Mécanique Automobile est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de mécanique automobile. Tu y étudies la technologie automobile, la mécanique appliquée aux véhicules, avec une double compétence technique et pédagogique. C''est une filière qui répond à un besoin structurel : former de futurs techniciens automobiles qualifiés dans un pays où le parc automobile (majoritairement importé d''occasion) nécessite une main-d''œuvre technique compétente.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné de mécanique automobile et que tu veux transmettre ce savoir-faire aux futurs techniciens du secteur.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique de la mécanique automobile.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner la mécanique automobile dans les lycées techniques, formant les futurs mécaniciens du pays.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou vers le secteur privé de la maintenance automobile.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou spécialisation en mécanique automobile avancée.'
WHERE slug = 'mecanique-automobile';

-- ---------- FABRICATION MÉCANIQUE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Fabrication Mécanique est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de fabrication mécanique. Tu y étudies l''usinage, la conception mécanique, et les techniques de production industrielle, avec une double compétence technique et pédagogique, pour former les futurs techniciens de l''industrie mécanique béninoise.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes la mécanique de production (usinage, fabrication) et que tu veux transmettre ce savoir-faire technique.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique de la fabrication mécanique.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner la fabrication mécanique dans les lycées techniques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou vers l''industrie mécanique en tant que technicien.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou spécialisation en génie mécanique et productique.'
WHERE slug = 'fabrication-mecanique';

-- ---------- ÉCONOMIE FAMILIALE ET SOCIALE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière d''Économie Familiale et Sociale est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints en économie familiale et sociale : gestion du foyer, alimentation, éducation à la santé, économie domestique. Tu y étudies ces disciplines dans une perspective pédagogique, pour former des futurs enseignants capables de transmettre des compétences de vie pratique et de gestion familiale.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la gestion du foyer, à l''alimentation et à l''économie domestique, et que tu veux enseigner ces compétences pratiques.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique en économie familiale et sociale.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner l''économie familiale et sociale dans les lycées techniques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou formateur en économie domestique et éducation à la santé.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou en Nutrition et Économie Familiale.'
WHERE slug = 'economie-familiale-et-sociale';

-- ---------- HÔTELLERIE-RESTAURATION (ENSET) ----------
UPDATE filieres SET
  description = 'La filière d''Hôtellerie-Restauration est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints en hôtellerie-restauration. Tu y étudies les techniques culinaires et hôtelières, ainsi que la pédagogie de l''enseignement technique. C''est une filière qui répond à la fois à un besoin d''enseignement et au développement du secteur touristique et hôtelier béninois, dans lequel les débouchés dépassent le seul enseignement.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné par la cuisine et le service hôtelier, et que tu veux transmettre ces compétences ou évoluer dans le secteur hôtelier lui-même.

Le secteur qui recrute le plus : l''enseignement technique, mais aussi directement l''hôtellerie-restauration, en croissance avec le développement du tourisme béninois.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner l''hôtellerie-restauration dans les lycées techniques.

### Secteur hôtelier et restauration
Un débouché direct pour ceux qui préfèrent exercer dans des hôtels, restaurants ou structures de restauration collective plutôt qu''enseigner.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou chef de cuisine/responsable d''établissement hôtelier.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou spécialisation en gestion hôtelière.'
WHERE slug = 'hotellerie-restauration';

-- ---------- FROID ET CLIMATISATION (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Froid et Climatisation est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints en froid et climatisation. Tu y étudies les techniques frigorifiques et de climatisation, avec une double compétence technique et pédagogique. C''est une filière avec un fort potentiel de débouchés hors enseignement, tant le secteur de la climatisation et de la chaîne du froid se développe rapidement au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu es intéressé par les techniques frigorifiques et de climatisation, un secteur technique en forte croissance au Bénin.

Le secteur qui recrute le plus : l''enseignement technique, mais aussi directement l''installation et la maintenance de systèmes de climatisation, en plein essor.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner le froid et la climatisation dans les lycées techniques.

### Technicien en installation et maintenance de froid et climatisation
Un débouché direct très recherché, avec la démocratisation de la climatisation dans les foyers et entreprises béninoises.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou entrepreneur dans l''installation frigorifique.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou spécialisation en génie frigorifique.'
WHERE slug = 'froid-et-climatisation';

-- ---------- ÉNERGIES RENOUVELABLES (ENSET) ----------
UPDATE filieres SET
  description = 'La filière d''Énergies Renouvelables est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints en énergies renouvelables. Tu y étudies les technologies solaires et d''autres énergies vertes, avec une double compétence technique et pédagogique. C''est une filière d''avenir, à la fois pour l''enseignement technique et pour un secteur en forte croissance au Bénin, porté par les besoins d''électrification et la transition énergétique.',
  debouches = 'Pour qui ? Cette filière te convient si les enjeux de transition énergétique t''intéressent, et que tu veux à la fois enseigner et potentiellement travailler dans ce secteur d''avenir.

Le secteur qui recrute le plus : l''enseignement technique, avec un fort potentiel dans l''installation de systèmes d''énergies renouvelables.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner les énergies renouvelables dans les lycées techniques.

### Technicien en installation d''équipements solaires
Un débouché direct et en croissance, avec le développement des projets d''électrification solaire au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou entrepreneur dans l''installation de systèmes solaires.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou en Énergies Renouvelables.'
WHERE slug = 'energies-renouvelables';

-- ---------- PRODUCTION ANIMALE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Production Animale est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints en production animale pour les lycées agricoles. Tu y étudies les techniques d''élevage, avec une double compétence technique et pédagogique, pour former les futurs techniciens agricoles béninois en zootechnie.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à l''élevage et que tu veux transmettre ces compétences aux futurs techniciens agricoles.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique en production animale.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner la production animale dans les lycées agricoles.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou technicien d''élevage.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou en Zootechnie.'
WHERE slug = 'production-animale';

-- ---------- PRODUCTION VÉGÉTALE (ENSET) ----------
UPDATE filieres SET
  description = 'La filière de Production Végétale est une licence proposée par l''ENSET, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints en production végétale pour les lycées agricoles. Tu y étudies les techniques de culture, avec une double compétence technique et pédagogique, pour former les futurs techniciens agricoles béninois en agronomie.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à l''agriculture et que tu veux transmettre ces compétences techniques aux futurs techniciens agricoles.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement technique en production végétale.

### Professeur adjoint des Lycées et Collèges
Le débouché principal : enseigner la production végétale dans les lycées agricoles.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur titulaire via le CAPET, ou technicien agricole.

### Poursuivre ses études
Master en Sciences de l''Éducation (option technique), ou en Agronomie.'
WHERE slug = 'production-vegetale';

-- ---------- GÉNIE CIVIL (INSTI) ----------
UPDATE filieres SET
  description = 'La filière de Génie Civil est une licence proposée par l''INSTI (Institut National Supérieur de Technologie Industrielle), rattaché à l''UNSTIM, qui forme des techniciens supérieurs en construction, différents des professeurs formés par l''ENSET. Tu y étudies le calcul de structures, la résistance des matériaux, et la gestion de chantier, avec une orientation exclusivement technique et industrielle, sans dimension pédagogique. C''est une filière fortement demandée dans le secteur du BTP béninois en plein développement.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux exercer directement dans le BTP, sur le terrain, sans passer par l''enseignement.

Le secteur qui recrute le plus : les entreprises de BTP et bureaux d''études, en forte activité avec les grands projets d''infrastructures publiques.

### Techniciens de Travaux du Génie Civil
Le débouché principal : superviser des travaux de construction (bâtiments, routes, ouvrages), pour des entreprises de BTP.

### Contrôleurs de chantiers
Veiller à la conformité et à la qualité des travaux de construction, un rôle de contrôle important sur les grands chantiers.

### Assistant des Experts Géomètres, agences immobilières et notaires
Un débouché connexe dans le secteur immobilier et foncier.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers conducteur de travaux, chef de projet BTP, ou fondateur de ta propre entreprise de construction.

### Poursuivre ses études
Cycle ingénieur en Génie Civil, ou Master en Structures et Construction.'
WHERE slug = 'genie-civil-3';

-- ---------- GÉNIE ÉLECTRIQUE ET INFORMATIQUE (INFORMATIQUE ET TÉLÉCOMMUNICATIONS) (INSTI) ----------
UPDATE filieres SET
  description = 'La filière de Génie Électrique et Informatique (Informatique et Télécommunications) est une licence proposée par l''INSTI, rattaché à l''UNSTIM, qui forme des techniciens supérieurs en informatique et télécommunications appliquées à l''ingénierie électrique. Tu y étudies les réseaux informatiques, les télécommunications, et les bases de l''électronique, avec une orientation industrielle et technique. C''est une filière au croisement de l''informatique et de l''électricité, particulièrement adaptée aux besoins des opérateurs télécoms et des industries qui digitalisent leurs infrastructures.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler à la croisée de l''informatique et des télécommunications, dans un secteur industriel en forte croissance.

Le secteur qui recrute le plus : les entreprises de services informatiques et les opérateurs télécoms.

### Service informatique d''entreprise
Le débouché principal : gérer les infrastructures informatiques et réseau d''une entreprise industrielle ou de services.

### Sociétés de développement d''applications web et mobiles
Un débouché pour les profils plus orientés développement, valorisant les bases informatiques acquises.

### Fournisseurs d''accès internet, télésurveillance
Des débouchés spécifiques dans le secteur des télécommunications et de la sécurité des réseaux.

### Systèmes embarqués
Un débouché technique pour ceux qui s''orientent vers l''électronique embarquée industrielle.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable réseau et télécoms, ou chef de projet informatique industriel.

### Poursuivre ses études
Cycle ingénieur en Télécommunications, ou Master en Réseaux et Systèmes Informatiques.'
WHERE slug = 'genie-electrique-et-informatique-informatique-et-telecommunications';

-- ---------- GÉNIE ÉLECTRIQUE ET INFORMATIQUE (ÉLECTRONIQUE ET ÉLECTROTECHNIQUE) (INSTI) ----------
UPDATE filieres SET
  description = 'La filière de Génie Électrique et Informatique (Électronique et Électrotechnique) est une licence proposée par l''INSTI (Institut National Supérieur de Technologie Industrielle), rattaché à l''UNSTIM, qui forme des techniciens supérieurs et futurs ingénieurs en électricité industrielle et systèmes de commande automatique : installation électrique, automatisme, systèmes embarqués. Tu y étudies l''électrotechnique appliquée, l''électronique de puissance et les systèmes de contrôle-commande industriels, avec une orientation exclusivement technique et professionnelle, sans dimension d''enseignement contrairement à la filière équivalente de l''ENSET.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes autant le côté théorique des circuits que le travail de terrain, câbles et tableaux électriques à l''appui.

Le secteur qui recrute le plus aujourd''hui au Bénin : l''électricité industrielle et de bâtiment, suivi de près par l''automatisation industrielle, deux domaines en forte demande avec la modernisation progressive de l''industrie locale. Les domaines de niche (télésurveillance, électronique embarquée) recrutent moins massivement mais offrent des postes plus spécialisés.

### Électricité industrielle et bâtiment
C''est le secteur le plus naturel pour cette filière. Tu interviens sur l''installation, la mise en service et la maintenance des systèmes électriques : tableaux électriques, câblage, moteurs, réseaux basse et haute tension. Concrètement, tu peux travailler pour des entreprises de BTP sur les lots électriques de chantiers (bâtiments, usines), ou directement pour la SBEE sur la production et la distribution d''électricité.

### Automatisation industrielle
Dans les usines (agroalimentaire, textile, cimenteries béninoises), les chaînes de production sont pilotées par des automates programmables. Ton rôle serait de programmer, surveiller et dépanner ces systèmes de commande automatique — un métier très recherché à mesure que l''industrie locale se modernise.

### Énergie électrique
Un poste plus spécialisé, tourné vers la production, le transport et le traitement de l''énergie : centrales électriques, postes de transformation, réseaux de distribution. C''est le domaine des grandes structures comme la SBEE ou des sociétés régionales d''électrification.

### Électronique embarquée et objets connectés
Si tu préfères la conception plus que l''installation : ce domaine consiste à créer des circuits électroniques intégrés à des équipements — industriels ou grand public. C''est un secteur en croissance au Bénin, porté par les projets de smart city, d''agri-tech et de compteurs intelligents.

### Sécurité et télésurveillance
Domaine moins connu mais bien présent localement : la supervision à distance d''installations électriques et industrielles, pour des sociétés de sécurité ou des grandes entreprises qui ont besoin de surveiller leurs infrastructures en continu.

### Contrôle qualité et normes
Un poste plus transversal, où tu vérifies que les installations et équipements électriques respectent les normes en vigueur — utile dans l''industrie comme dans les bureaux d''études.

### Entrepreneuriat
Beaucoup de diplômés de cette filière finissent par se mettre à leur compte, en particulier dans l''installation électrique et l''automatisme : c''est un des secteurs techniques où l''auto-entrepreneuriat est le plus courant au Bénin, une fois l''expérience terrain acquise.

### Évoluer dans sa carrière
Après quelques années, les postes évoluent naturellement vers chef d''équipe ou responsable maintenance, chargé d''études dans un bureau d''ingénierie électrique, ou responsable qualité dans une unité industrielle.

### Poursuivre ses études
Cycle ingénieur en électrotechnique, automatisme ou systèmes embarqués (à l''UNSTIM ou à l''international), ou Master en Génie Électrique pour ceux qui veulent aller plus loin techniquement.'
WHERE slug = 'genie-electrique-et-informatique-electronique-et-electrotechnique';

-- ---------- MAINTENANCE DES SYSTÈMES (MAINTENANCE INDUSTRIELLE) (INSTI) ----------
UPDATE filieres SET
  description = 'La filière de Maintenance des Systèmes (Maintenance Industrielle) est une licence proposée par l''INSTI, rattaché à l''UNSTIM, qui forme des techniciens supérieurs en maintenance d''équipements industriels : machines de production, systèmes électromécaniques, chaînes de fabrication. Tu y étudies la mécanique, l''électrotechnique, et les méthodes de diagnostic de pannes industrielles. C''est une filière stratégique pour l''industrie béninoise naissante, où la maintenance préventive et curative des équipements est essentielle pour éviter les arrêts de production coûteux.',
  debouches = 'Pour qui ? Cette filière te convient si tu aimes le diagnostic technique et la résolution de pannes complexes sur des équipements industriels.

Le secteur qui recrute le plus : les industries de transformation (agroalimentaire, textile, cimenteries), qui ont besoin de techniciens de maintenance qualifiés.

### Techniciens des industries de transformation et Unités de production alimentaire
Le débouché principal : assurer la maintenance préventive et curative des équipements de production dans les usines béninoises.

### Auditeurs/Conseils en Entreprises ou Sociétés de TP
Un débouché de conseil pour les profils qui souhaitent évoluer vers l''audit technique d''équipements.

### Responsable service après-vente
Coordonner le service de maintenance pour des entreprises vendant des équipements industriels.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable maintenance d''une usine, ou consultant en fiabilité industrielle.

### Poursuivre ses études
Cycle ingénieur en Maintenance Industrielle, ou Master en Génie Industriel.'
WHERE slug = 'maintenance-des-systemes-maintenance-industrielle';

-- ---------- GÉNIE MÉCANIQUE ET PRODUCTIQUE (INSTI) ----------
UPDATE filieres SET
  description = 'La filière de Génie Mécanique et productique est une licence proposée par l''INSTI, rattaché à l''UNSTIM, qui forme des techniciens supérieurs en conception mécanique et production industrielle : usinage, fabrication assistée par ordinateur, gestion de la production. Tu y étudies la mécanique appliquée et les techniques de fabrication industrielle modernes, avec une orientation exclusivement technique. C''est une filière transversale qui ouvre sur de nombreux secteurs industriels, de la mécanique générale à la maintenance agricole.',
  debouches = 'Pour qui ? Cette filière te convient si tu es intéressé par la conception et la fabrication mécanique, avec des débouchés variés dans l''industrie et l''agriculture mécanisée.

Le secteur qui recrute le plus : les industries mécaniques et le secteur de la maintenance industrielle.

### Maintenance industrielle
Le débouché le plus fréquent : assurer la maintenance d''équipements industriels de production.

### Fabrication mécanique, parcs machines
Travailler sur la conception ou l''entretien de parcs de machines industrielles.

### Méthodes et contrôle de la qualité
Un débouché plus technique orienté vers l''optimisation des processus de production.

### Maintenance des engins agricoles
Un débouché connexe pour ceux qui souhaitent travailler dans la mécanisation agricole.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de production, ou ingénieur méthodes en industrie.

### Poursuivre ses études
Cycle ingénieur en Génie Mécanique et Productique.'
WHERE slug = 'genie-mecanique-et-productique';


-- ================================================================
-- >>> FICHIER SOURCE : 16_unstim_lot13_final_inspei_ensnati_ensbba_fastnati_ensgep_enstp.sql
-- ================================================================

-- ============================================================
-- UNSTIM — LOT 13 (FINAL) : INSPEI, ENS/Nati, ENSBBA,
-- FAST/Natitingou, ENSGEP, ENSTP (17 filières)
-- ============================================================

-- ---------- SCIENCES ET TECHNIQUES DE L'INGÉNIEUR (INSPEI) ----------
UPDATE filieres SET
  description = 'La filière de Sciences et Techniques de l''Ingénieur est un cursus de classes préparatoires proposé par l''INSPEI (Institut National Supérieur des Classes Préparatoires aux Études d''Ingénieurs), rattaché à l''UNSTIM, à laquelle on accède sur concours. Comme la prépa MPSI/PCSI de l''IMSP (UAC), ce n''est pas un diplôme final mais un tremplin intensif de deux ans vers un cycle ingénieur. Tu y approfondis mathématiques, physique et sciences de l''ingénieur à un rythme soutenu, avec pour objectif de préparer aux concours d''entrée des écoles d''ingénieurs de l''UNSTIM (INSTI, ENSGEP, ENSTP notamment).',
  debouches = 'Pour qui ? Ce cursus te convient si tu es un bachelier scientifique solide, que tu vises une école d''ingénieurs de l''UNSTIM, et que tu es prêt à un travail intensif pendant deux ans avant les débouchés concrets.

Il n''y a pas de métier direct à la sortie : l''essentiel des étudiants poursuivent immédiatement vers un cycle ingénieur.

### Entrée dans les écoles d''ingénieurs de l''UNSTIM
Le débouché quasi systématique : intégrer un cycle ingénieur de 3 ans à l''INSTI, l''ENSGEP ou l''ENSTP, selon ton classement au concours.

### Poursuites à l''international
Le niveau exigé ouvre aussi des portes vers des écoles d''ingénieurs à l''étranger, via des concours communs ou des équivalences.

### Ce que tu deviens au final
Les débouchés réels arrivent après le cycle ingénieur : ingénieur en génie civil, énergétique, industriel — selon la spécialité choisie ensuite.

### Le vrai enjeu de cette filière
La méthode de travail acquise (rigueur, autonomie sous contrainte de temps) constitue l''acquis principal, valorisé quel que soit le domaine choisi ensuite.'
WHERE slug = 'sciences-et-techniques-de-lingenieur';

-- ---------- MATHÉMATIQUES ET INFORMATIQUE (MI) (ENS/Nati) ----------
UPDATE filieres SET
  description = 'La filière de Mathématiques et Informatique (MI) est une licence proposée par l''ENS de Natitingou, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de mathématiques pour le Nord du Bénin. Tu y étudies les mathématiques fondamentales et des bases en informatique, avec une double compétence disciplinaire et pédagogique, dans le prolongement de la vocation de cette école implantée pour former des enseignants pour les départements septentrionaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en mathématiques et que tu veux enseigner cette matière dans le Nord-Bénin, une région qui manque de professeurs qualifiés.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement des mathématiques dans le Nord-Bénin.

### Professeur Adjoint de Maths
Le débouché principal : enseigner les mathématiques dans les collèges et lycées des départements septentrionaux, où le besoin en professeurs qualifiés reste important.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, ou formateur pédagogique en mathématiques.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation académique en mathématiques.'
WHERE slug = 'mathematiques-et-informatique-mi';

-- ---------- PHYSIQUE, CHIMIE ET TECHNOLOGIE (PCT) (ENS/Nati) ----------
UPDATE filieres SET
  description = 'La filière de Physique, Chimie et Technologie (PCT) est une licence proposée par l''ENS de Natitingou, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de physique-chimie pour le Nord du Bénin. Tu y étudies la physique et la chimie fondamentales, avec une double compétence disciplinaire et pédagogique, pour répondre au besoin d''enseignants qualifiés dans les départements septentrionaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en physique-chimie et que tu veux enseigner ces matières dans le Nord-Bénin.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement de la physique-chimie dans le Nord-Bénin.

### Professeur Adjoint de PCT
Le débouché principal : enseigner la physique-chimie-technologie dans les collèges et lycées des départements septentrionaux.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, ou formateur pédagogique en sciences physiques.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation académique en physique ou chimie.'
WHERE slug = 'physique-chimie-et-technologie-pct';

-- ---------- SCIENCES DE LA VIE ET DE LA TERRE (SVT) (ENS/Nati) ----------
UPDATE filieres SET
  description = 'La filière de Sciences de la Vie et de la Terre (SVT) est une licence proposée par l''ENS de Natitingou, rattachée à l''UNSTIM, à laquelle on accède sur concours, qui forme les futurs professeurs adjoints de SVT pour le Nord du Bénin. Tu y étudies la biologie et les sciences de la terre, avec une double compétence disciplinaire et pédagogique, pour répondre au besoin d''enseignants qualifiés dans les départements septentrionaux.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné de sciences du vivant et que tu veux enseigner cette matière dans le Nord-Bénin.

Le secteur qui recrute le plus, quasi exclusivement : l''enseignement des SVT dans le Nord-Bénin.

### Professeur Adjoint de SVT
Le débouché principal : enseigner les sciences de la vie et de la terre dans les collèges et lycées des départements septentrionaux.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, ou formateur pédagogique en SVT.

### Poursuivre ses études
Master en Sciences de l''Éducation, ou spécialisation académique en biologie.'
WHERE slug = 'sciences-de-la-vie-et-de-la-terre-svt';

-- ---------- BIOTECHNOLOGIE MÉDICALE (ENSBBA) ----------
UPDATE filieres SET
  description = 'La filière de Biotechnologie Médicale est une licence proposée par l''ENSBBA (École Nationale Supérieure des Biosciences et Biotechnologies Appliquées), rattachée à l''UNSTIM, qui forme aux techniques de laboratoire appliquées au diagnostic médical : analyses biomédicales, biologie moléculaire appliquée à la santé. Tu y étudies la biochimie, la biologie moléculaire, et les techniques de diagnostic biomédical. C''est une filière technique de pointe, différente d''une simple formation de technicien de laboratoire, qui prépare à des postes de recherche et de production dans le secteur biomédical.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné de biologie médicale et de techniques de laboratoire avancées, avec une orientation recherche et innovation.

Le secteur qui recrute le plus : les laboratoires de diagnostic et de recherche biomédicale.

### Techniciens sup. Labo diagnostic biomédicaux et contrôle qualité des analyses
Le débouché principal : travailler dans des laboratoires spécialisés dans le diagnostic médical de pointe.

### Techniciens sup. Labo recherche universitaire ou privés
Contribuer à des programmes de recherche biomédicale, dans des universités ou des laboratoires privés.

### Technicien sup. production de bioproduits
Un débouché industriel : participer à la production de produits biologiques à usage médical.

### Auto-emploi
Un débouché entrepreneurial pour ceux qui créent leur propre laboratoire d''analyses spécialisées.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un laboratoire de biotechnologie médicale, ou chercheur senior.

### Poursuivre ses études
Master en Biotechnologie Médicale, ou en Sciences Biomédicales, avec possibilité de doctorat.'
WHERE slug = 'biotechnologie-medicale';

-- ---------- BIOTECHNOLOGIE PHARMACEUTIQUE (BP) (ENSBBA) ----------
UPDATE filieres SET
  description = 'La filière de Biotechnologie Pharmaceutique (BP) est une licence proposée par l''ENSBBA, rattachée à l''UNSTIM, qui forme aux techniques biotechnologiques appliquées à la production pharmaceutique et cosmétique : valorisation de ressources naturelles, fabrication de bioproduits. Tu y étudies la chimie pharmaceutique, la biotechnologie, et les procédés de fabrication de produits pharmaceutiques et cosmétiques. C''est une filière de pointe qui prépare à des métiers industriels et de recherche dans un secteur pharmaceutique béninois encore émergent mais à fort potentiel.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la chimie et à la biologie appliquées à la production de médicaments et cosmétiques, un secteur industriel de pointe encore émergent au Bénin.

Le secteur qui recrute le plus : les industries pharmaceutiques et cosmétiques, et les laboratoires de recherche.

### Techniciens sup. valorisation des ressources naturelles et industries pharmaceutiques et cosmétiques
Le débouché principal : contribuer à la production de médicaments et cosmétiques à partir de ressources naturelles locales.

### Techniciens sup. Labo fabrication de bioproduits pharmaceutiques et cosmétiques
Travailler en production dans une usine ou un laboratoire de fabrication pharmaceutique.

### Techniciens sup. Labo pédagogiques des universités
Un débouché académique pour ceux qui souhaitent appuyer l''enseignement universitaire dans ce domaine.

### Auto-emploi
Créer sa propre activité de valorisation de produits naturels à usage pharmaceutique ou cosmétique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable qualité d''une industrie pharmaceutique, ou chercheur en biotechnologie pharmaceutique.

### Poursuivre ses études
Master en Biotechnologie Pharmaceutique, ou en Chimie des Substances Naturelles.'
WHERE slug = 'biotechnologie-pharmaceutique-bp';

-- ---------- GÉNÉTIQUE BIOTECHNOLOGIES ET APPLICATIONS (ENSBBA) ----------
UPDATE filieres SET
  description = 'La filière de Génétique Biotechnologies et Applications est une licence proposée par l''ENSBBA, rattachée à l''UNSTIM, qui forme à la génétique appliquée et ses usages en amélioration végétale, animale et humaine. Tu y étudies la génétique moléculaire, les techniques de biotechnologie, et leurs applications concrètes en sélection variétale ou en diagnostic génétique. C''est une filière scientifique de pointe qui prépare à des métiers de recherche et d''innovation dans un domaine encore émergent au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu es passionné de génétique et de biotechnologies, avec un intérêt pour leurs applications concrètes (agriculture, santé, ressources génétiques).

Le secteur qui recrute le plus : la recherche appliquée en génétique et biotechnologies.

### Recherches en génétique et biotechnologies appliquées
Le débouché principal : contribuer à des programmes de recherche sur l''amélioration génétique des plantes, animaux ou applications médicales.

### Techniciens en gestion des ressources génétiques
Un débouché lié à la préservation et la valorisation de la biodiversité génétique béninoise.

### Techniciens en conception de tests génétiques des maladies génétiques
Un débouché médical émergent, lié au diagnostic génétique.

### Entrepreneuriat et sélections végétales et animales
Développer des activités de sélection variétale ou animale pour améliorer les productions agricoles.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers chercheur senior en génétique, ou responsable d''un laboratoire spécialisé.

### Poursuivre ses études
Master en Génétique, en Biotechnologies, avec possibilité de doctorat.'
WHERE slug = 'genetique-biotechnologies-et-applications';

-- ---------- GÉNIE BIOLOGIQUE ET BIOPROCÉDÉS (GBB) (ENSBBA) ----------
UPDATE filieres SET
  description = 'La filière de Génie Biologique et Bioprocédés (GBB) est une licence proposée par l''ENSBBA, rattachée à l''UNSTIM, qui forme à l''ingénierie des procédés biologiques industriels : fermentation, production de bioproduits, optimisation de processus biotechnologiques. Tu y étudies le génie des procédés appliqué à la biologie, avec une orientation technique et industrielle. C''est une filière au croisement de la biologie et de l''ingénierie, préparant à des métiers de production et de recherche dans l''industrie biotechnologique naissante du Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux allier biologie et ingénierie industrielle, pour optimiser des processus de production biotechnologique.

Le secteur qui recrute le plus : les laboratoires de recherche appliquée et les industries utilisant des bioprocédés.

### Techniciens sup. Labo d''analyse de recherche collective ou de recherche appliquée
Le débouché principal : contribuer à des travaux de recherche appliquée en génie biologique.

### Techniciens sup. dans les centres de recherche/instituts de recherche biologique appliquée
Intégrer un institut de recherche travaillant sur les bioprocédés industriels.

### Assistant de recherche dans les instituts de recherche biologique
Un débouché académique pour ceux qui souhaitent approfondir la recherche.

### Auto-emploi
Développer une activité liée à la production de bioproduits (fermentation, biopesticides).

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''une unité de production biotechnologique, ou chercheur senior.

### Poursuivre ses études
Master en Génie des Procédés Biologiques, ou en Biotechnologie Industrielle.'
WHERE slug = 'genie-biologique-et-bioprocedes-gbb';

-- ---------- DIÉTÉTIQUE DES ALIMENTS ET NUTRITION (ENSBBA) ----------
UPDATE filieres SET
  description = 'La filière de Diététique des aliments et Nutrition est une licence proposée par l''ENSBBA, rattachée à l''UNSTIM, qui forme aux métiers de la nutrition et du contrôle qualité alimentaire. Tu y étudies la biochimie de la nutrition, les techniques de contrôle qualité des aliments, et le conseil nutritionnel. C''est une filière proche de celle proposée par la FSS (UAC), mais avec une orientation davantage technique et biotechnologique, préparant à des métiers combinant santé et industrie agroalimentaire.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler à la croisée de la nutrition et du contrôle qualité alimentaire, avec une orientation technique marquée.

Le secteur qui recrute le plus : les structures de santé et les sociétés de restauration collective.

### Technicien sup. en diététique
Le débouché principal : accompagner la prise en charge nutritionnelle de patients ou de populations.

### Technicien sup. en contrôle de qualité des aliments
Veiller à la conformité sanitaire et nutritionnelle des produits alimentaires.

### Techniciens sup. des sociétés de restauration collective des centres hospitaliers et des maisons de repos
Gérer l''aspect nutritionnel de la restauration collective dans des structures de santé.

### Conseiller en éducation nutritionnelle et alimentaire
Un débouché de sensibilisation, souvent au sein de programmes de santé publique.

### Auto-emploi
Consultant indépendant en nutrition et diététique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''un service de nutrition, ou consultant reconnu en diététique.

### Poursuivre ses études
Master en Nutrition Humaine, ou en Sécurité Sanitaire des Aliments.'
WHERE slug = 'dietetique-des-aliments-et-nutrition';

-- ---------- MATHÉMATIQUES INFORMATIQUES (FAST/Natitingou) ----------
UPDATE filieres SET
  description = 'La filière de Mathématiques Informatiques est une licence proposée par la FAST de Natitingou, rattachée à l''UNSTIM, qui forme aux mathématiques et à l''informatique appliquées, avec un ancrage régional dans le Nord-Bénin. Tu y étudies l''algèbre, l''analyse, et les bases de l''informatique, avec des débouchés vers l''enseignement, les télécommunications, ou la poursuite en écoles d''ingénieurs. C''est une filière scientifique généraliste qui répond aux besoins de formation supérieure scientifique dans les départements septentrionaux, sans nécessiter de déplacement vers le Sud.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en mathématiques et informatique, avec une formation scientifique accessible dans le Nord-Bénin.

Le secteur qui recrute le plus : l''enseignement des mathématiques et les télécommunications.

### Cadres de télécommunications optiques et des nouvelles technologies de l''information et de la communication
Un débouché technique pour les opérateurs télécoms de la région.

### Enseignants des lycées et collèges (BAPES et CAPES en Maths)
Le débouché le plus courant : enseigner les mathématiques après une formation ou un concours complémentaire.

### Accès aux écoles d''ingénieurs
Une base solide pour poursuivre en cycle ingénieur.

### Accès à un master recherche ou professionnel en mathématique ou en informatique
Pour ceux qui veulent approfondir vers la recherche, avec possibilité de thèse de doctorat.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, ingénieur télécoms, ou chercheur en mathématiques appliquées.

### Poursuivre ses études
Master en Mathématiques, en Informatique, ou en Télécommunications.'
WHERE slug = 'mathematiques-informatiques';

-- ---------- PHYSIQUE CHIMIE (FAST/Natitingou) ----------
UPDATE filieres SET
  description = 'La filière de Physique Chimie est une licence proposée par la FAST de Natitingou, rattachée à l''UNSTIM, qui forme aux sciences physiques et chimiques fondamentales, avec un ancrage régional dans le Nord-Bénin. Tu y étudies la physique générale et la chimie, avec des débouchés vers l''enseignement, la recherche, les métiers de la météorologie, ou l''industrie chimique. C''est une filière scientifique généraliste qui offre une alternative locale aux bacheliers scientifiques du Nord souhaitant une formation en sciences physiques.',
  debouches = 'Pour qui ? Cette filière te convient si tu es solide en physique-chimie, avec une formation scientifique accessible dans le Nord-Bénin.

Le secteur qui recrute le plus : l''enseignement, suivi par des métiers plus spécialisés en météorologie et industrie chimique.

### Cadres de télécommunications optiques et des nouvelles technologies de l''information et de la communication
Un débouché technique pour les opérateurs télécoms.

### Cadres en Météorologie, océanographie et balistique
Un débouché de niche mais spécifique, pour des structures publiques de météorologie.

### Enseignants des lycées et collèges (BAPES et CAPES en Physique)
Le débouché le plus courant : enseigner la physique après une formation ou un concours complémentaire.

### Accès aux écoles d''ingénieurs
Une base solide pour poursuivre en cycle ingénieur.

### Cadres des industries chimiques (cosmétique, parfumerie et cimenterie), agroalimentaires et pharmaceutiques
Un débouché industriel pour ceux qui s''orientent vers le secteur privé.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers professeur certifié, chercheur, ou cadre d''une industrie chimique.

### Poursuivre ses études
Master en Physique, en Chimie, ou spécialisation en météorologie.'
WHERE slug = 'physique-chimie-2';

-- ---------- FROID ET CLIMATISATION (ENSGEP) ----------
UPDATE filieres SET
  description = 'La filière de Froid et Climatisation est une licence proposée par l''ENSGEP (École Nationale Supérieure de Génie Energétique et Procédés), rattachée à l''UNSTIM, qui forme des techniciens supérieurs en systèmes frigorifiques et de climatisation, avec une orientation exclusivement technique, sans dimension pédagogique contrairement à la filière équivalente de l''ENSET. Tu y étudies les techniques de froid industriel et de climatisation, un secteur en pleine expansion au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux exercer directement dans l''installation et la maintenance de systèmes frigorifiques et de climatisation, un secteur technique en forte croissance.

Le secteur qui recrute le plus : les entreprises d''installation et de maintenance de systèmes de froid et climatisation.

### Technicien supérieur en Installation, mise en service et maintenance d''équipements de froid et climatisation
Le débouché principal : installer et entretenir des systèmes frigorifiques et de climatisation pour des particuliers, entreprises ou industries.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une entreprise de climatisation, ou entrepreneur dans ce secteur.

### Poursuivre ses études
Cycle ingénieur en Génie Frigorifique, ou Master en Génie Énergétique.'
WHERE slug = 'froid-et-climatisation-2';

-- ---------- ÉQUIPEMENTS MOTORISÉS (ENSGEP) ----------
UPDATE filieres SET
  description = 'La filière d''Equipements motorisés est une licence proposée par l''ENSGEP, rattachée à l''UNSTIM, qui forme des techniciens supérieurs en équipements mécaniques et hydrauliques motorisés. Tu y étudies la mécanique appliquée, l''hydraulique et la pneumatique, avec une orientation exclusivement technique et industrielle, préparant à la maintenance de matériels motorisés variés (industriels, agricoles).',
  debouches = 'Pour qui ? Cette filière te convient si tu es intéressé par la mécanique des équipements motorisés et hydrauliques, dans un secteur industriel varié.

Le secteur qui recrute le plus : la maintenance industrielle et les entreprises utilisant des équipements motorisés.

### Technicien supérieur en Installation et maintenance des matériels
Le débouché principal : installer et entretenir des équipements motorisés pour des entreprises industrielles.

### Electromécanicien
Un débouché technique classique pour les profils formés en mécanique et électricité.

### Installation et maintenance de matériels hydrauliques et pneumatiques
Un débouché spécialisé pour les systèmes hydrauliques industriels.

### Maintenance des systèmes hydrauliques et pneumatiques
Assurer le bon fonctionnement de ces systèmes dans divers secteurs industriels.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable maintenance, ou chef d''atelier technique.

### Poursuivre ses études
Cycle ingénieur en Génie Mécanique, ou Master en Maintenance Industrielle.'
WHERE slug = 'equipements-motorises';

-- ---------- GÉNIE CIVIL (ENSGEP) ----------
UPDATE filieres SET
  description = 'La filière de Génie Civil est une licence proposée par l''ENSGEP, rattachée à l''UNSTIM, qui forme des techniciens supérieurs en construction, avec une orientation exclusivement technique. Comme les autres filières de Génie Civil du dispositif, elle prépare à des métiers de terrain dans le BTP : conception, calcul et supervision de chantiers, un secteur particulièrement dynamique au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux exercer directement dans le BTP, sur le terrain, sans passer par l''enseignement.

Le secteur qui recrute le plus : le BTP, en plein essor avec les grands projets d''infrastructures publiques.

### Assistants dans les bureaux d''études
Participer à la conception technique de projets de construction.

### Techniciens contrôleurs de travaux du Génie Civil (routes, bâtiments, ouvrages d''art, assainissement) et de Mairies
Superviser la conformité des travaux de construction pour des entreprises ou des collectivités.

### Techniciens dans les laboratoires hydrauliques et géotechniques
Réaliser des analyses techniques pour des projets de construction.

### Assistants des Experts Routiers, géotechniciens
Accompagner des experts dans l''évaluation technique de projets routiers.

### Entrepreneur, chef de chantier ou conducteur de travaux
Des débouchés de terrain classiques dans le secteur de la construction.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers ingénieur travaux, directeur de chantier, ou entrepreneur en BTP.

### Poursuivre ses études
Cycle ingénieur en Génie Civil, ou Master en Structures et Construction.'
WHERE slug = 'genie-civil-4';

-- ---------- GÉNIE GÉOMATIQUE APPLIQUÉE (ENSTP) ----------
UPDATE filieres SET
  description = 'La filière de Génie Géomatique Appliquée est une licence proposée par l''ENSTP (École Nationale Supérieure des Travaux Publics), rattachée à l''UNSTIM, qui forme des techniciens supérieurs en cartographie et systèmes d''information géographique appliqués à l''ingénierie des travaux publics. Tu y étudies la géomatique, la topographie, et les systèmes d''information géographique, avec une orientation technique appliquée aux projets d''infrastructures.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux allier techniques de cartographie et projets d''infrastructures, dans le secteur des travaux publics.

Le secteur qui recrute le plus : les bureaux d''études et projets d''infrastructures nécessitant des données géospatiales.

### Assistants des Experts Géomètres, des architectes, agents immobiliers et notaires
Le débouché principal : appuyer les experts dans les études topographiques et foncières.

### Techniciens en Système d''Information Géographique (SIG)
Produire et analyser des données cartographiques pour des projets d''aménagement.

### Technicien-Cartographes
Réaliser des cartes précises pour des projets de construction ou d''aménagement.

### Assistants dans les bureaux d''études
Un débouché large dans les bureaux d''études techniques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable SIG d''un bureau d''études, ou géomètre-expert (avec certification complémentaire).

### Poursuivre ses études
Cycle ingénieur en Géomatique, ou Master en Systèmes d''Information Géographique.'
WHERE slug = 'genie-geomatique-appliquee';

-- ---------- ARCHITECTURE ET URBANISME (ENSTP) ----------
UPDATE filieres SET
  description = 'La filière d''Architecture et Urbanisme est une licence proposée par l''ENSTP, rattachée à l''UNSTIM, qui forme des techniciens supérieurs en conception architecturale et planification urbaine. Tu y étudies les bases de l''architecture, de l''urbanisme, et de la conception de bâtiments, avec une orientation technique appliquée à un secteur en forte demande avec l''urbanisation rapide des villes béninoises.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la conception de bâtiments et à la planification urbaine, dans un contexte d''urbanisation rapide au Bénin.

Le secteur qui recrute le plus : les cabinets d''architecture et les services d''urbanisme des collectivités.

### Techniciens Architectes-Urbanistes
Le débouché principal : participer à la conception de projets architecturaux et de plans d''urbanisme.

### Techniciens Contrôleurs de chantiers de bâtiments
Superviser la conformité des travaux de construction de bâtiments.

### Techniciens Contrôleurs des travaux d''aménagements urbains
Veiller à la conformité des projets d''aménagement urbain.

### Assistants des experts aménagistes
Accompagner des experts dans la planification urbaine.

### Assistants dans les Cabinets d''Architecture, agences immobilières et notaires
Un débouché large dans le secteur de la construction et de l''immobilier.

### Assistants dans les services décentrés et Mairies
Intégrer les services techniques d''une commune pour la gestion urbanistique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers architecte (avec certification complémentaire), ou responsable d''un service d''urbanisme communal.

### Poursuivre ses études
Cycle ingénieur en Architecture, ou Master en Urbanisme.'
WHERE slug = 'architecture-et-urbanisme';

-- ---------- HYDRAULIQUE ET ASSAINISSEMENT (ENSTP) ----------
UPDATE filieres SET
  description = 'La filière d''Hydraulique et Assainissement est une licence proposée par l''ENSTP, rattachée à l''UNSTIM, qui forme des techniciens supérieurs en conception et gestion de réseaux d''eau et d''assainissement, avec une orientation technique appliquée aux travaux publics. Tu y étudies l''hydraulique, l''assainissement urbain, et la gestion des infrastructures d''eau, un secteur essentiel face aux besoins d''accès à l''eau potable et d''assainissement au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler concrètement sur les infrastructures d''eau et d''assainissement, un besoin de base encore insatisfait dans de nombreuses zones du Bénin.

Le secteur qui recrute le plus : les projets d''adduction d''eau et d''assainissement, un des domaines les plus financés par les bailleurs internationaux.

### Techniciens en Hydraulique et Assainissement
Le débouché principal : concevoir et suivre des projets d''approvisionnement en eau et d''assainissement.

### Techniciens des Laboratoires d''analyse d''eau
Réaliser des analyses de qualité de l''eau pour des structures publiques ou privées.

### Techniciens Contrôleurs des travaux d''Adduction d''Eaux (barrages, pompages, etc.)
Superviser la conformité des travaux hydrauliques.

### Techniciens dans les stations d''épuration des eaux usées et de traitement de l''eau pour boisson
Un débouché technique important pour la sécurité sanitaire de l''eau.

### Assistants des experts hydrauliciens, hydrologues et en gestion des eaux
Accompagner des experts dans les projets hydrauliques d''envergure.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers ingénieur hydraulicien, ou responsable d''un programme national d''accès à l''eau.

### Poursuivre ses études
Cycle ingénieur en Hydraulique, ou Master en Gestion des Ressources en Eau.'
WHERE slug = 'hydraulique-et-assainissement-2';


-- ================================================================
-- >>> FICHIER SOURCE : 17_una_lot14_complet.sql
-- ================================================================

-- ============================================================
-- UNA (Université Nationale d'Agriculture) — LOT 14 (COMPLET)
-- EAq, EHAEV, EGPVS, ESTCTPA, EGR, EAPA, ESRVA, EForT (15 filières)
-- ============================================================

-- ---------- AQUACULTURE (EAq) ----------
UPDATE filieres SET
  description = 'La filière d''Aquaculture est une licence proposée par l''EAq (École d''Aquaculture), rattachée à l''UNA, qui forme aux techniques de production piscicole et aquacole : élevage de poissons, crevettes, mollusques, gestion des bassins et fermes aquacoles. Tu y étudies la biologie aquatique appliquée, la nutrition des espèces aquacoles, et les techniques de gestion de fermes piscicoles. C''est une filière stratégique face à la pression croissante sur les ressources halieutiques naturelles du Bénin, l''aquaculture apparaissant comme une alternative essentielle pour répondre à la demande en poisson.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux développer l''aquaculture béninoise, un secteur en croissance face à la baisse des ressources de pêche naturelle.

Le secteur qui recrute le plus : les entreprises aquacoles et les projets de développement de la pisciculture, en expansion au Bénin.

### Entreprises aquacoles
Le débouché principal : gérer ou accompagner des exploitations d''aquaculture (poissons, crevettes), un secteur en structuration.

### Production de poissons, crabes, huîtres et de moules
Technicien spécialisé dans la production de différentes espèces aquacoles.

### Conception et fabrication des aliments pour les espèces aquacoles
Un débouché technique lié à la nutrition animale appliquée à l''aquaculture.

### Conception, fabrication et entretien de semences aquacoles
Développer la production d''alevins et de semences pour les fermes aquacoles.

### Conseiller/Assistant en aquaculture
Accompagner des porteurs de projets ou des coopératives dans le développement de leur activité aquacole.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une grande ferme aquacole, ou expert en développement de l''aquaculture pour des projets internationaux.

### Poursuivre ses études
Master en Aquaculture, ou en Gestion des Ressources Halieutiques.'
WHERE slug = 'aquaculture';

-- ---------- HORTICULTURE ET AMÉNAGEMENT DES ESPACES VERTS (EHAEV) ----------
UPDATE filieres SET
  description = 'La filière d''Horticulture et Aménagement des espaces Verts est une licence proposée par l''EHAEV (École d''Horticulture et d''Aménagement des Espaces Verts), rattachée à l''UNA, qui forme aux techniques de culture maraîchère, fruitière et ornementale, ainsi qu''à l''aménagement d''espaces verts urbains. Tu y étudies l''horticulture, la production de semences et plants, et les techniques d''irrigation appliquées à ce secteur. C''est une filière qui répond à un double enjeu : la sécurité alimentaire via le maraîchage, et l''embellissement urbain croissant dans les villes béninoises en développement.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à la production maraîchère et fruitière, ainsi qu''à l''aménagement d''espaces verts, deux secteurs en croissance au Bénin.

Le secteur qui recrute le plus : les entreprises horticoles et les projets d''aménagement urbain, en expansion.

### Techniciens gestion des entreprises horticoles (cultures maraîchères, fruitières et ornementales)
Le débouché principal : gérer des exploitations horticoles pour des entreprises ou en tant qu''entrepreneur.

### Conseiller des exploitations des secteurs horticoles
Accompagner des producteurs maraîchers, fruitiers ou ornementaux dans l''amélioration de leurs pratiques.

### Technicien en aménagement des Espaces Verts
Un débouché urbain en croissance : concevoir et entretenir des espaces verts pour des villes ou des entreprises.

### Technicien en production de semences et plants horticoles
Contribuer à la production de semences et plants de qualité pour le secteur horticole.

### Technicien en installation et gestion des systèmes d''irrigation en horticulture
Un débouché technique lié à l''optimisation de l''arrosage pour les cultures horticoles.

### Technicien en cultures hydroponiques
Un débouché émergent, pour des techniques de culture sans sol de plus en plus utilisées.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une grande exploitation horticole, ou consultant en aménagement paysager.

### Poursuivre ses études
Master en Horticulture, ou en Aménagement Paysager.'
WHERE slug = 'horticulture-et-amenagement-des-espaces-verts';

-- ---------- GESTION ET PRODUCTION VÉGÉTALE ET SEMENCIÈRE (EGPVS) ----------
UPDATE filieres SET
  description = 'La filière de Gestion et Production Végétale et Semencière est une licence proposée par l''EGPVS (École de Gestion et de Production Végétale et Semencière), rattachée à l''UNA, qui forme à la production de semences agricoles de qualité et à la gestion des cultures. Tu y étudies l''agronomie, la sélection variétale, et les techniques de production semencière. C''est une filière stratégique pour la souveraineté alimentaire béninoise : disposer de semences locales de qualité est un enjeu majeur pour améliorer les rendements agricoles du pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur un maillon essentiel de l''agriculture : la production de semences de qualité, un enjeu stratégique pour la souveraineté alimentaire du Bénin.

Le secteur qui recrute le plus : les entreprises et coopératives de production semencière.

### Entrepreneur en production végétale
Le débouché principal : créer ou gérer une exploitation spécialisée dans la production de cultures ou de semences.

### Technicien en production de semences
Travailler dans la production et le contrôle de qualité des semences agricoles.

### Technicien en analyse de la fertilité des sols
Un débouché technique connexe, pour l''optimisation des rendements agricoles.

### Assistants en élaboration de plans d''entreprise de production végétale et de semences
Accompagner des porteurs de projets dans le montage de leur activité.

### Technicien en protection des végétaux
Un débouché lié à la lutte contre les maladies et ravageurs des cultures.

### Assistant de recherche agricole
Contribuer à des programmes de recherche sur l''amélioration variétale.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une entreprise semencière, ou expert en production végétale.

### Poursuivre ses études
Master en Agronomie, ou en Production Semencière.'
WHERE slug = 'gestion-et-production-vegetale-et-semenciere';

-- ---------- INDUSTRIE DES PRODUITS AGRO-ALIMENTAIRES ET NUTRITION HUMAINE (IPA-NH) (ESTCTPA) ----------
UPDATE filieres SET
  description = 'La filière d''Industrie des Produits Agro-Alimentaires et Nutrition Humaine (IPA-NH) est une licence proposée par l''ESTCTPA (École des Sciences et Techniques de Conservation et Transformation des Produits Agricoles), rattachée à l''UNA, qui forme à la transformation industrielle des produits agricoles et à leur valorisation nutritionnelle. Tu y étudies les procédés de transformation agroalimentaire, la biochimie de la nutrition, et le contrôle qualité. C''est une filière essentielle pour développer la transformation locale des matières premières agricoles béninoises, un enjeu économique majeur pour le pays.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur la transformation industrielle des produits agricoles et leurs enjeux nutritionnels, un secteur clé pour le développement économique du Bénin.

Le secteur qui recrute le plus : les industries agroalimentaires, en croissance avec la volonté de transformer davantage sur place.

### Technicien supérieur en industrie des produits agricoles carnés, céréaliers, halieutiques
Le débouché principal : superviser la transformation industrielle de divers produits agricoles.

### Producteur et conservateur de produits agroalimentaires
Un débouché entrepreneurial pour créer sa propre activité de transformation.

### Contrôleur de la qualité des produits agricoles et normes agroalimentaires
Veiller à la conformité des produits transformés aux normes de qualité.

### Conseiller/Assistant en transformation des produits agricoles
Accompagner des producteurs ou des PME dans leurs projets de transformation.

### Technicien en éducation nutritionnelle
Un débouché de santé publique, pour des ONG ou des programmes de lutte contre la malnutrition.

### Enseignant dans les lycées techniques agricoles
Transmettre ces compétences techniques aux futurs professionnels.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable qualité d''une industrie agroalimentaire, ou consultant en transformation agricole.

### Poursuivre ses études
Master en Technologie Alimentaire, ou en Nutrition et Sécurité Alimentaire.'
WHERE slug = 'industrie-des-produits-agro-alimentaires-et-nutrition-humaine-ipa-nh';

-- ---------- INDUSTRIE DES BIO-RESSOURCES (IBR) (ESTCTPA) ----------
UPDATE filieres SET
  description = 'La filière d''Industrie des Bio-Ressources (IBR) est une licence proposée par l''ESTCTPA, rattachée à l''UNA, qui forme à la valorisation industrielle des ressources biologiques : huiles végétales, cosmétiques naturels, biogaz, aliments pour bétail. Tu y étudies les procédés de transformation des bio-ressources, avec une orientation industrielle et entrepreneuriale. C''est une filière originale qui prépare à créer de la valeur ajoutée à partir de matières premières locales souvent sous-exploitées, un potentiel économique important pour le Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux créer de la valeur à partir des ressources biologiques locales (huiles, plantes, résidus agricoles), dans des secteurs variés allant de la cosmétique à l''énergie.

Le secteur qui recrute le plus : les petites industries de transformation de bio-ressources, un secteur entrepreneurial en développement.

### Industrie cosmétique et de parfumerie (savons, lotions, huiles essentielles)
Le débouché le plus créatif : développer des produits cosmétiques naturels à partir de ressources locales.

### Producteur de biogaz
Un débouché énergétique, pour la valorisation de déchets organiques en énergie.

### Fabricant d''huiles végétales et de corps gras
Un secteur traditionnel mais toujours porteur, notamment pour l''huile de palme et l''arachide.

### Fabricant d''aliments pour bétail domestique
Contribuer à l''alimentation animale à partir de sous-produits agricoles valorisés.

### Conseiller en gestion des procédés post-récoltes
Accompagner les producteurs dans la valorisation de leurs récoltes.

### Enseignant dans les lycées techniques agricoles
Transmettre ces compétences aux futurs professionnels.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers entrepreneur reconnu dans la valorisation de bio-ressources, ou consultant en économie circulaire agricole.

### Poursuivre ses études
Master en Valorisation des Bio-ressources, ou en Chimie des Substances Naturelles.'
WHERE slug = 'industrie-des-bio-ressources-ibr';

-- ---------- GÉNIE DE CONDITIONNEMENT ET EMBALLAGES ET STOCKAGE DES PRODUITS ALIMENTAIRES (GCES) (ESTCTPA) ----------
UPDATE filieres SET
  description = 'La filière de Génie de Conditionnement et Emballages et Stockage des Produits Alimentaires (GCES) est une licence proposée par l''ESTCTPA, rattachée à l''UNA, qui forme aux techniques de conditionnement, d''emballage et de conservation des produits agricoles et alimentaires. Tu y étudies les technologies de conditionnement, les matériaux d''emballage, et les techniques de stockage. C''est une filière technique qui répond à un enjeu majeur de l''agriculture béninoise : réduire les pertes post-récoltes, particulièrement élevées faute de solutions de conditionnement et de stockage adaptées.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur un enjeu clé mais méconnu de l''agriculture béninoise : réduire les pertes post-récoltes grâce à un meilleur conditionnement et stockage des produits.

Le secteur qui recrute le plus : les industries agroalimentaires et les projets de réduction des pertes post-récoltes.

### Technicien en génie du conditionnement-emballages et stockage des produits agroalimentaires
Le débouché principal : concevoir des solutions de conditionnement adaptées aux produits agricoles locaux.

### Technicien en contrôle de qualité et normes des produits agroalimentaires
Veiller à la conformité des emballages et conditionnements aux normes sanitaires.

### Concepteur d''étiquettes, d''emballages et conditionnements alimentaires
Un débouché créatif et technique, pour des entreprises agroalimentaires.

### Concepteur de structures de stockage de conservation (greniers, cribs, silos, magasins/entrepôts)
Un débouché essentiel pour réduire les pertes agricoles au Bénin.

### Conseiller en emballages divers pour le conditionnement agricole
Accompagner des producteurs ou entreprises dans le choix de solutions d''emballage adaptées.

### Enseignant dans les lycées techniques agricoles
Transmettre ces compétences techniques.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable conditionnement d''une industrie agroalimentaire, ou consultant en réduction des pertes post-récoltes.

### Poursuivre ses études
Master en Génie du Conditionnement, ou en Technologie Alimentaire.'
WHERE slug = 'genie-de-conditionnement-et-emballages-et-stockage-des-produits-alimentaires-gces';

-- ---------- AGROÉQUIPEMENT (EGR) ----------
UPDATE filieres SET
  description = 'La filière d''Agroéquipement est une licence proposée par l''EGR (École de Génie Rural), rattachée à l''UNA, qui forme à la conception, l''utilisation et la maintenance des équipements agricoles mécanisés. Tu y étudies la mécanique agricole, les systèmes motorisés, et les techniques de maintenance d''engins agricoles. C''est une filière technique clé pour la modernisation de l''agriculture béninoise, encore largement manuelle, où la mécanisation représente un levier majeur d''amélioration de la productivité.',
  debouches = 'Pour qui ? Cette filière te convient si tu es intéressé par la mécanique appliquée à l''agriculture, et que tu veux contribuer à la modernisation technique du secteur agricole béninois.

Le secteur qui recrute le plus : les entreprises de fabrication et maintenance de matériel agricole, en développement.

### Entreprise de conception et de fabrication des machines agricoles
Le débouché principal : concevoir ou fabriquer des équipements agricoles adaptés au contexte local.

### Société de maintenance des engins et équipements agricoles
Assurer l''entretien et la réparation des machines agricoles pour des exploitations ou des sociétés spécialisées.

### Entrepreneur de motoriste
Un débouché entrepreneurial pour la fourniture de services de motorisation agricole.

### Entreprise d''installation et de maintenance d''équipements de production agroindustriels
Un débouché industriel connexe, pour la maintenance d''équipements de transformation.

### Sociétés de maintenance de Tracteurs et de machines agricoles
Travailler pour des usines d''agréage, brasseries, huileries qui utilisent du matériel agricole lourd.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une société de matériel agricole, ou consultant en mécanisation agricole.

### Poursuivre ses études
Master en Machinisme Agricole, ou en Génie Mécanique Appliqué à l''Agriculture.'
WHERE slug = 'agroequipement';

-- ---------- ÉLECTRIFICATION RURALE ET ÉNERGIES RENOUVELABLES (ERER) (EGR) ----------
UPDATE filieres SET
  description = 'La filière d''Électrification Rurale et Energies Renouvelables (ERER) est une licence proposée par l''EGR, rattachée à l''UNA, qui forme aux technologies d''accès à l''énergie en milieu rural, avec un accent sur les énergies renouvelables (solaire notamment). Tu y étudies l''électrotechnique appliquée au monde rural, les énergies renouvelables, et les techniques d''électrification décentralisée. C''est une filière stratégique pour un pays où l''accès à l''électricité reste inégal, particulièrement en zone rurale, avec un fort potentiel pour les solutions solaires décentralisées.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à l''accès à l''énergie en milieu rural, un enjeu majeur au Bénin, avec les énergies renouvelables comme solution privilégiée.

Le secteur qui recrute le plus : les projets d''électrification rurale et les entreprises d''énergies renouvelables, en forte expansion.

### Industries de transformation et Unités de Production utilisant du biogaz ou autres énergies renouvelables
Un débouché industriel pour ceux qui s''orientent vers la production alimentée en énergies vertes.

### Entreprises travaillant dans le secteur des énergies vertes
Le débouché principal : installer et gérer des systèmes d''énergies renouvelables (solaire notamment) pour des projets ruraux.

### Projets d''électrification rurale
Contribuer à des projets d''accès à l''électricité pour des villages non connectés au réseau national.

### Fermes et entreprises agropastorales
Un débouché connexe pour l''équipement énergétique des exploitations agricoles.

### Entrepreneuriat sur les énergies vertes et le développement durable
Créer sa propre activité d''installation de solutions énergétiques rurales.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable de programme d''électrification rurale, ou entrepreneur reconnu en énergies renouvelables.

### Poursuivre ses études
Master en Énergies Renouvelables, ou en Électrification Rurale.'
WHERE slug = 'electrification-rurale-et-energies-renouvelables-erer';

-- ---------- INFRASTRUCTURES RURALES ET ASSAINISSEMENT (EGR) ----------
UPDATE filieres SET
  description = 'La filière d''Infrastructures Rurales et Assainissement est une licence proposée par l''EGR, rattachée à l''UNA, qui forme à la conception et la construction d''infrastructures en milieu rural : pistes, ouvrages hydrauliques, systèmes d''assainissement adaptés aux zones agricoles. Tu y étudies le génie rural, les techniques de construction adaptées au monde rural, et l''assainissement. C''est une filière essentielle pour désenclaver et sécuriser les zones rurales béninoises, où l''accès aux infrastructures de base reste souvent limité.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux contribuer à désenclaver et équiper le monde rural béninois en infrastructures de base.

Le secteur qui recrute le plus : les entreprises de travaux publics et les projets de développement rural.

### Entreprise de travaux de constructions d''ouvrages, réseaux hydrauliques ou hydro-agricoles
Le débouché principal : participer à la construction d''infrastructures rurales.

### Entreprise de travaux d''irrigation et de drainage
Un débouché technique lié à la sécurisation de l''eau pour l''agriculture.

### Entreprise d''aménagement hydro-agricole
Contribuer à des projets d''aménagement de périmètres irrigués.

### Sociétés d''eau et d''assainissement
Un débouché lié à l''accès à l''eau potable et à l''assainissement en zone rurale.

### Services Techniques des Mairies
Intégrer les services techniques d''une commune rurale pour la gestion des infrastructures.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une entreprise de travaux ruraux, ou consultant en génie rural.

### Poursuivre ses études
Master en Génie Rural, ou en Infrastructures et Aménagement.'
WHERE slug = 'infrastructures-rurales-et-assainissement';

-- ---------- PRODUCTIONS ET SANTÉ ANIMALES (EGR) ----------
UPDATE filieres SET
  description = 'La filière de Productions et santé animales est une licence proposée par l''EGR, rattachée à l''UNA, qui forme à l''élevage et à la santé animale dans une perspective de production intensive et durable. Tu y étudies la zootechnie, la nutrition animale, et les bases de la santé vétérinaire, avec une orientation combinant technique de production et prévention sanitaire. C''est une filière importante pour développer un élevage plus productif et mieux structuré au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu t''intéresses à l''élevage moderne et à la santé animale, avec une approche combinant production et prévention.

Le secteur qui recrute le plus : les exploitations d''élevage et les structures agro-vétérinaires.

### Techniciens des fermes d''embouche de bovins, ovins et caprins, lapins et autres élevages
Le débouché principal : accompagner des exploitations d''élevage dans l''optimisation de leur production.

### Technicien en production des œufs de consommation et des vaches
Un débouché spécialisé dans la filière avicole et laitière.

### Agent technique clinique et pharmacie vétérinaire
Un débouché sanitaire, en appui aux vétérinaires diplômés.

### Entrepreneur en fabrication des aliments bétail
Développer une activité de production d''aliments pour le bétail.

### Assistant des Fermes Agro-Vétérinaire
Accompagner la gestion technique et sanitaire d''exploitations d''élevage.

### Enseignant des lycées techniques agricoles
Transmettre ces compétences aux futurs professionnels.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une grande exploitation d''élevage, ou expert en santé animale.

### Poursuivre ses études
Master en Production Animale, ou passerelle vers les études vétérinaires complètes.'
WHERE slug = 'productions-et-sante-animales';

-- ---------- FINANCE AGRICOLE (FA) (EAPA) ----------
UPDATE filieres SET
  description = 'La filière de Finance Agricole (FA) est une licence proposée par l''EAPA (École d''Agrobusiness et de Politiques Agricoles), rattachée à l''UNA, qui forme à la gestion financière spécifiquement appliquée au secteur agricole : financement des exploitations, accès au crédit agricole, analyse de rentabilité des projets agricoles. Tu y étudies la finance agricole, la gestion des risques financiers en agriculture, et les mécanismes de crédit et de microfinance rurale. C''est une filière de spécialisation qui répond à un besoin criant : le financement reste l''un des principaux freins au développement de l''agriculture béninoise.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux allier finance et agriculture, en travaillant sur le financement des exploitations, un des principaux freins au développement agricole béninois.

Le secteur qui recrute le plus : les institutions financières et de microfinance spécialisées en agriculture.

### Entrepreneur agricole
Un débouché direct pour ceux qui souhaitent créer leur propre exploitation en maîtrisant ses aspects financiers.

### Gestionnaire d''entreprises agricoles et agro-industrielles
Le débouché principal : accompagner la gestion financière d''entreprises agricoles.

### Gestionnaire de coopératives et associations de producteurs
Gérer les finances de structures collectives de producteurs agricoles.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable financier d''une grande exploitation, ou expert en financement agricole pour une institution de microfinance.

### Poursuivre ses études
Master en Finance Agricole, ou en Gestion des Risques Agricoles.'
WHERE slug = 'finance-agricole-fa';

-- ---------- GESTION DES EXPLOITATIONS AGRICOLES ET AGROALIMENTAIRES (GEAEA) (EAPA) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des Exploitations Agricoles et Agroalimentaires (GEAEA) est une licence proposée par l''EAPA, rattachée à l''UNA, qui forme à la gestion globale d''exploitations agricoles et d''entreprises agroalimentaires : organisation de la production, gestion commerciale, analyse de marché. Tu y étudies l''économie agricole, la gestion d''entreprise appliquée à l''agriculture, et l''analyse de filières. C''est une filière transversale qui prépare à des postes d''encadrement et de conseil pour des exploitations et entreprises du secteur agroalimentaire béninois.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux gérer et développer des exploitations agricoles ou des entreprises agroalimentaires, avec une approche globale (production, commerce, finance).

Le secteur qui recrute le plus : les entreprises agricoles et agro-industrielles, en croissance au Bénin.

### Analyste du marché des produits agricoles et agro-industriels
Le débouché principal : étudier les marchés agricoles pour orienter les stratégies de production et de commercialisation.

### Mercatique d''entreprises agricoles et agro-industriels
Développer les stratégies commerciales d''entreprises du secteur agricole.

### Agent commercial d''entreprise agricole
Accompagner la vente de produits ou d''intrants agricoles.

### Banquier agricole
Un débouché spécifique dans le secteur financier, spécialisé sur le crédit agricole.

### Assureur agricole
Un débouché émergent lié à l''essor de l''assurance agricole au Bénin.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur d''une entreprise agroalimentaire, ou consultant en gestion agricole.

### Poursuivre ses études
Master en Agrobusiness, ou en Gestion des Entreprises Agroalimentaires.'
WHERE slug = 'gestion-des-exploitations-agricoles-et-agroalimentaires-geaea';

-- ---------- MARKETING DES INTRANTS ET PRODUITS AGRICOLES (MIPA) (EAPA) ----------
UPDATE filieres SET
  description = 'La filière de Marketing des Intrants et Produits Agricoles (MIPA) est une licence proposée par l''EAPA, rattachée à l''UNA, qui forme à la commercialisation des intrants (semences, engrais, produits phytosanitaires) et des produits agricoles. Tu y étudies le marketing appliqué à l''agriculture, l''analyse de filières agricoles, et les techniques de vente et de conseil aux producteurs. C''est une filière stratégique pour structurer les chaînes de distribution agricole, un maillon souvent défaillant qui limite l''accès des producteurs béninois aux intrants de qualité.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur la commercialisation des intrants et produits agricoles, un maillon essentiel mais souvent défaillant de la chaîne agricole béninoise.

Le secteur qui recrute le plus : les institutions de financement agricole et les entreprises de distribution d''intrants.

### Analyste d''institutions de financement agricole
Un débouché financier connexe, pour l''analyse des besoins de financement liés aux intrants agricoles.

### Gestionnaire d''institutions et d''études socioéconomiques et agroindustrielles
Le débouché principal : accompagner des institutions dans l''analyse et la structuration des marchés agricoles.

### Assistant en gestion d''entreprises agricoles et agroindustrielles
Appuyer la gestion commerciale d''entreprises du secteur.

### Conseiller en gestion d''entreprises agricoles
Accompagner des producteurs dans l''optimisation de leurs achats d''intrants et leurs ventes.

### Assistant en gestion des politiques de développement agricole
Un débouché institutionnel, pour appuyer la conception de politiques favorisant l''accès aux intrants.

### Enseignant de collèges et lycées agricoles
Transmettre ces compétences aux futurs professionnels.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable commercial d''une entreprise de distribution agricole, ou consultant en politiques agricoles.

### Poursuivre ses études
Master en Marketing Agricole, ou en Politiques de Développement Agricole.'
WHERE slug = 'marketing-des-intrants-et-produits-agricoles-mipa';

-- ---------- SOCIOLOGIE RURALE ET VULGARISATION AGRICOLE (ESRVA) ----------
UPDATE filieres SET
  description = 'La filière de Sociologie rurale et Vulgarisation Agricole est une licence proposée par l''ESRVA (École de Sociologie rurale et de Vulgarisation Agricole), rattachée à l''UNA, qui forme à l''accompagnement social des communautés rurales et à la diffusion des innovations agricoles. Tu y étudies la sociologie rurale, les méthodes de vulgarisation (comment transmettre efficacement des savoirs techniques aux producteurs), et l''accompagnement au changement en milieu rural. C''est une filière essentielle pour que les innovations agricoles soient réellement adoptées par les producteurs béninois, un enjeu souvent négligé face à la seule dimension technique.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux comprendre les réalités sociales du monde rural béninois et jouer un rôle de pont entre la recherche agricole et les producteurs sur le terrain.

Le secteur qui recrute le plus : les structures de vulgarisation agricole et les instituts de recherche.

### Technicien supérieur des entreprises agricoles
Le débouché principal : accompagner la gestion sociale et technique d''entreprises agricoles.

### Technicien supérieur en Vulgarisateur/conseil agricole
Diffuser les innovations agricoles auprès des producteurs, un métier central de cette filière.

### Technicien de recherche dans les institutions de recherche nationales et internationales
Contribuer à des programmes de recherche sur la sociologie rurale et la vulgarisation.

### Conseiller technique en gestion des organisations paysannes et syndicats paysans
Un débouché institutionnel important pour structurer les organisations de producteurs.

### Fonctionnaire des organisations de développement international (PNUD, Banque Mondiale, SNV, USAID)
Un débouché prestigieux pour ceux qui souhaitent travailler à l''international.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable régional de vulgarisation agricole, ou expert en développement rural pour une organisation internationale.

### Poursuivre ses études
Master en Sociologie Rurale, ou en Vulgarisation et Communication Agricole.'
WHERE slug = 'sociologie-rurale-et-vulgarisation-agricole';

-- ---------- FORESTERIE TROPICALE (EForT) ----------
UPDATE filieres SET
  description = 'La filière de Foresterie Tropicale est une licence proposée par l''EForT (École de Foresterie Tropicale), rattachée à l''UNA, qui forme à la gestion durable des forêts tropicales : inventaire forestier, reboisement, gestion de la faune et des aires protégées. Tu y étudies la foresterie, l''écologie tropicale, et les techniques de gestion durable des ressources forestières. C''est une filière stratégique face aux enjeux de préservation des forêts béninoises, avec des débouchés variés allant de la gestion forestière classique à des métiers plus innovants comme l''utilisation de drones pour la cartographie forestière.',
  debouches = 'Pour qui ? Cette filière te convient si la préservation des forêts tropicales et de la biodiversité te passionne, et que tu veux travailler sur des solutions concrètes de gestion durable.

Le secteur qui recrute le plus : les structures publiques et internationales de gestion forestière et de conservation.

### Forestier Gestionnaire des ressources naturelles (forêts, Eaux et Chasse)
Le débouché principal : gérer des espaces forestiers pour des structures publiques ou des ONG environnementales.

### Forestier Gestionnaire des réserves de faune et des aires protégées
Un débouché spécialisé dans la gestion de la biodiversité et des espaces protégés.

### Sylviculteur (planteur de bois d''œuvre, de service et mangrove et reboisement)
Contribuer à des projets de reboisement, un enjeu majeur face à la déforestation.

### Opérateur pilote de drones pour les relevés de données en forêt
Un débouché technique et innovant, pour la surveillance des forêts par imagerie aérienne.

### Ébéniste et designer, producteur de bois de dendroénergie
Des débouchés liés à la valorisation du bois, entre artisanat et énergie.

### Spécialiste de la domestication et élevage de gibiers
Un débouché de niche pour la gestion durable de la faune sauvage.

### Fonctionnaire dans les Ministères (MCVDD, MAEP) et ONG
Un débouché institutionnel pour la gestion des politiques forestières.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable d''une réserve forestière, ou expert international en gestion durable des forêts tropicales.

### Poursuivre ses études
Master en Foresterie Tropicale, ou en Gestion de la Biodiversité.'
WHERE slug = 'foresterie-tropicale';


-- ================================================================
-- >>> FICHIER SOURCE : 18_final_uadc_iuep_interetats_semecity.sql
-- ================================================================

-- ============================================================
-- LOT FINAL : UADC, IUEP, Écoles Inter-États, Sèmè City (15 filières)
-- Clôture complète du dump
-- ============================================================

-- ---------- ENTREPRENARIAT ET GESTION DES PROJETS DE L'ECONOMIE SOCIALE (UFR/EGC, UADC) ----------
UPDATE filieres SET
  description = 'La filière d''Entreprenariat et Gestion des Projets de l''Economie Sociale est une licence proposée par l''UFR/EGC (UADC), qui forme aux métiers de la gestion de projets dans le secteur de l''économie sociale et solidaire : coopératives, mutuelles, structures associatives. Tu y étudies la gestion de projet, l''économie sociale, et les techniques de montage de dossiers de financement. C''est une filière originale, tournée vers un modèle économique différent du secteur privé classique : celui où l''activité économique sert aussi un objectif social ou collectif, un secteur encore peu structuré mais porteur au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux allier gestion de projet et impact social, en travaillant sur des structures qui conjuguent rentabilité économique et utilité collective.

Le secteur qui recrute le plus : les entreprises publiques, privées et les ONG ayant des projets à dimension sociale.

### Chef de projets des entreprises publiques, privées et des ONG
Le débouché principal : piloter des projets à dimension sociale pour diverses structures.

### Gestionnaire et superviseur de projets
Coordonner la mise en œuvre de projets d''économie sociale, du montage au suivi.

### Analyste et évaluateur de projets
Un débouché plus technique : mesurer l''impact et l''efficacité de projets à vocation sociale.

### Consultant free-lance ou entrepreneur
Un débouché entrepreneurial pour ceux qui souhaitent développer leur propre structure d''économie sociale.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur de projets, ou expert en économie sociale et solidaire pour une organisation internationale.

### Poursuivre ses études
Master en Gestion de Projets, ou en Économie Sociale et Solidaire.'
WHERE slug = 'entreprenariat-et-gestion-des-projets-de-leconomie-sociale';

-- ---------- ECONOMIE ET GESTION DES ORGANISATIONS COOPÉRATIVES ET ASSOCIATIVES (UFR/FMF, UADC) ----------
UPDATE filieres SET
  description = 'La filière d''Economie et Gestion des Organisations Coopératives et Associatives est une licence proposée par l''UFR/FMF (UADC), qui forme spécifiquement à la gestion des coopératives et associations : gouvernance participative, mutualisation des ressources, gestion financière collective. Tu y étudies l''économie coopérative, la gestion associative, et les mécanismes de gouvernance partagée. C''est une filière de niche au Bénin, essentielle pour structurer et professionnaliser un secteur coopératif encore largement informel mais porteur d''un vrai potentiel de développement économique local.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans un modèle économique alternatif, basé sur la coopération et la mutualisation, encore peu structuré mais porteur au Bénin.

Le secteur qui recrute le plus : les coopératives et fédérations, ainsi que les ONG travaillant sur le développement communautaire.

### Gestionnaire d''entreprises coopératives
Le débouché principal : gérer une coopérative agricole, artisanale ou commerciale, un modèle en développement au Bénin.

### Dirigeants des Unions et Fédérations des Coopératives
Un débouché de plus grande envergure, pour coordonner plusieurs coopératives regroupées.

### Chargé de projet/programme
Accompagner des projets de développement du secteur coopératif pour des ONG ou des institutions.

### Animateur/facilitateur communautaire
Un débouché de terrain, pour accompagner les communautés dans la structuration de leurs projets collectifs.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur d''une fédération de coopératives, ou expert en économie coopérative.

### Poursuivre ses études
Master en Économie Sociale et Solidaire, ou en Gestion des Coopératives.'
WHERE slug = 'economie-et-gestion-des-organisations-cooperatives-et-associatives';

-- ---------- MICRO FINANCE (UFR/FMF, UADC) ----------
UPDATE filieres SET
  description = 'La filière de Micro Finance est une licence proposée par l''UFR/FMF (UADC), qui forme spécifiquement aux métiers de la microfinance : octroi de microcrédits, gestion de caisses communautaires, inspection des institutions de microfinance. Tu y étudies les techniques financières adaptées à la microfinance, la gestion des risques de crédit à petite échelle, et la régulation du secteur. C''est une filière spécialisée, complémentaire à celle proposée par l''ENEAM (UAC), avec ici une approche davantage tournée vers la gouvernance et la régulation du secteur de la microfinance béninois.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux te spécialiser dans la microfinance, un secteur financier de proximité essentiel pour l''inclusion financière au Bénin.

Le secteur qui recrute le plus : les institutions de microfinance (IMF), très présentes dans tout le pays.

### Inspecteurs des Finances, option Micro Finance
Le débouché principal : contrôler et réguler les institutions de microfinance, un rôle stratégique pour la stabilité du secteur.

### Agent des Systèmes Financiers Décentralisés (SFD)
Accompagner les opérations quotidiennes d''une institution de microfinance.

### Animateur/Facilitateur Communautaire
Un débouché de terrain pour sensibiliser et accompagner les populations vers l''inclusion financière.

### Gestionnaire des caisses communautaires
Gérer une caisse d''épargne et de crédit au niveau local.

### Chef cabinets d''Audit financier
Un débouché plus technique pour ceux qui s''orientent vers le contrôle et l''audit du secteur.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur régional d''une IMF, ou expert en régulation de la microfinance.

### Poursuivre ses études
Master en Microfinance, ou en Régulation des Institutions Financières.'
WHERE slug = 'micro-finance';

-- ---------- GESTION DES STRUCTURES DE MICRO ASSURANCE SANTÉ (UFR/FMF, UADC) ----------
UPDATE filieres SET
  description = 'La filière de Gestion des structures de Micro Assurance Santé est une licence proposée par l''UFR/FMF (UADC), qui forme à la gestion de dispositifs de micro-assurance santé : mutuelles de santé, systèmes de couverture santé pour les populations à faibles revenus. Tu y étudies la gestion des mutuelles de santé, les mécanismes d''assurance à petite échelle, et l''accompagnement communautaire. C''est une filière originale et stratégique, à la croisée de la santé et de la finance, essentielle pour améliorer l''accès aux soins des populations les plus vulnérables au Bénin.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler à la croisée de la santé et de la finance, en développant l''accès aux soins pour les populations les plus vulnérables.

Le secteur qui recrute le plus : les mutuelles de santé et les programmes de couverture sanitaire universelle.

### Inspecteurs d''Action Sanitaire
Un débouché institutionnel, pour le contrôle des dispositifs de santé communautaire.

### Agent d''Agences pour le Renforcement du Capital Humain
Accompagner des programmes publics visant à améliorer l''accès à la santé et à l''éducation.

### Facilitateur communautaire d''accès aux soins de santé
Le débouché de terrain principal : sensibiliser et accompagner les populations vers les dispositifs de micro-assurance santé.

### Gérant de mutuelles de santé
Gérer une structure de mutuelle de santé communautaire.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable régional de programme de couverture santé, ou expert en micro-assurance santé pour une organisation internationale.

### Poursuivre ses études
Master en Économie de la Santé, ou en Protection Sociale.'
WHERE slug = 'gestion-des-structures-de-micro-assurance-sante';

-- ---------- DÉVELOPPEMENT LOCAL ET DÉCENTRALISATION (UFR/GD, UADC) ----------
UPDATE filieres SET
  description = 'La filière de Développement Local et Décentralisation est une licence proposée par l''UFR/GD (UADC), qui forme aux enjeux du développement territorial dans le contexte de la décentralisation béninoise. Tu y étudies la gouvernance locale, la gestion des collectivités décentralisées, et les méthodes de développement participatif. C''est une filière pertinente pour accompagner la montée en compétence des communes béninoises, qui ont de plus en plus de responsabilités dans le développement de leur territoire depuis la réforme de décentralisation.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux travailler sur le développement des territoires à l''échelle locale, dans un contexte de décentralisation croissante au Bénin.

Le secteur qui recrute le plus : les collectivités locales, en plein renforcement de leurs capacités depuis la décentralisation.

### Inspecteurs du développement local et de décentralisation
Un débouché institutionnel de contrôle et d''appui aux collectivités locales.

### Agent des collectivités locales (Secrétaires Généraux, régisseurs)
Le débouché principal : intégrer les services administratifs d''une commune.

### Chefs services techniques
Un débouché technique dans la gestion des infrastructures communales.

### Responsables des Projets de développement local
Piloter des projets de développement au niveau communal ou intercommunal.

### Agent des Projets de développement décentralisées
Accompagner des projets financés par des bailleurs pour renforcer la décentralisation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers secrétaire général d''une mairie, ou expert en développement local pour une organisation internationale.

### Poursuivre ses études
Master en Développement Local, ou en Gestion des Collectivités Territoriales.'
WHERE slug = 'developpement-local-et-decentralisation';

-- ---------- GENRE ET DÉVELOPPEMENT (UFR/GD, UADC) ----------
UPDATE filieres SET
  description = 'La filière de Genre et Développement est une licence proposée par l''UFR/GD (UADC), qui forme aux enjeux de l''égalité entre les femmes et les hommes dans les projets de développement. Tu y étudies les concepts de genre, les méthodes d''intégration de la dimension genre dans les politiques publiques et les projets, et l''accompagnement des dynamiques d''autonomisation des femmes. C''est une filière qui répond à une demande croissante des bailleurs internationaux et des politiques publiques béninoises d''intégrer systématiquement la dimension genre dans leurs interventions.',
  debouches = 'Pour qui ? Cette filière te convient si les questions d''égalité femmes-hommes et d''inclusion sociale te tiennent à cœur, et que tu veux les intégrer dans des projets de développement concrets.

Le secteur qui recrute le plus : les ONG et projets de développement, où l''intégration du genre est désormais une exigence quasi systématique des bailleurs.

### Motivateur/leadership genre
Le débouché le plus spécifique : animer des dynamiques de leadership féminin dans des projets communautaires.

### Animateur communautaire genre
Sensibiliser les communautés aux enjeux d''égalité de genre dans le cadre de projets de développement.

### Agent des Projets de développement décentralisées
Intégrer la dimension genre dans des projets de développement local.

### Responsable de Projets de développement
Piloter des projets ayant une composante genre significative, exigence fréquente des bailleurs internationaux.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers expert genre pour une organisation internationale, ou responsable de programme sur l''autonomisation des femmes.

### Poursuivre ses études
Master en Études de Genre, ou en Développement et Inclusion Sociale.'
WHERE slug = 'genre-et-developpement';

-- ---------- MÉTIERS DE L'AGRICULTURE (IUEP) ----------
UPDATE filieres SET
  description = 'La filière de Métiers de l''agriculture est une licence proposée par l''IUEP (Institut Universitaire d''Enseignement Professionnel), à laquelle on accède sur concours, qui forme de manière très pratique et professionnalisante aux différents métiers de l''agriculture. Contrairement aux facultés d''agronomie classiques, l''IUEP privilégie une pédagogie tournée vers le terrain et l''insertion professionnelle rapide, avec moins de théorie et davantage de pratique. C''est une filière pensée pour des bacheliers qui veulent rapidement être opérationnels sur le terrain agricole plutôt que de multiplier les années d''études théoriques.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux une formation agricole très concrète et rapide, orientée vers une insertion professionnelle immédiate sur le terrain plutôt que vers la théorie.

Le secteur qui recrute le plus : les exploitations agricoles et structures d''appui à l''agriculture, à la recherche de profils immédiatement opérationnels.

### Métiers de l''agriculture (polyvalence de terrain)
Le débouché principal : exercer directement sur le terrain dans différents métiers agricoles (production, conseil, gestion d''exploitation), avec une compétence pratique large plutôt qu''une spécialisation pointue.

### Entrepreneuriat agricole
Un débouché fréquent pour cette formation professionnalisante : créer sa propre activité agricole rapidement après la formation.

### Technicien polyvalent en exploitation agricole
Accompagner la gestion quotidienne d''une exploitation, avec une compétence transversale sur plusieurs aspects de la production.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers responsable technique d''une exploitation, ou entrepreneur agricole reconnu.

### Poursuivre ses études
Possibilité de poursuivre vers une licence agronomique classique (FSA, FA) pour approfondir un domaine de spécialisation, ou intégrer directement le monde professionnel.'
WHERE slug = 'metiers-de-lagriculture';

-- ---------- FORMATIONS PROPOSÉES — EISMV (Écoles Inter-États) ----------
UPDATE filieres SET
  description = 'Cette entrée regroupe les formations proposées par l''EISMV (École Inter-États des Sciences et de Médecine Vétérinaires), basée à Dakar, une école régionale à vocation multinationale partagée entre plusieurs pays d''Afrique de l''Ouest et du Centre. Le Bénin y réserve chaque année un quota de places à ses bacheliers pour la formation de médecins vétérinaires, un cursus long et sélectif qui ne suit pas le format classique de licence en 3 ans, mais un règlement propre à l''école d''accueil au Sénégal.',
  debouches = 'Pour qui ? Cette voie te convient si tu as une vocation forte pour la médecine vétérinaire et que tu es prêt à un parcours d''études long et exigeant, loin du Bénin.

Le débouché principal, et quasiment unique, de cette formation : le métier de vétérinaire.

### Médecin vétérinaire
Le débouché quasi exclusif : exercer en tant que vétérinaire, en clinique privée, dans un cabinet, ou au sein d''une structure publique de santé animale, au Bénin ou dans d''autres pays de la sous-région.

### Santé animale et sécurité sanitaire des aliments
Un débouché institutionnel pour ceux qui s''orientent vers le contrôle sanitaire des produits d''origine animale (abattoirs, exportations).

### Recherche vétérinaire
Pour les plus académiques, poursuite possible en recherche sur les maladies animales et leur impact sur la santé publique.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers vétérinaire de référence, directeur d''une clinique vétérinaire, ou expert en santé animale pour des organisations internationales.

### Poursuivre ses études
Cursus long et intégré directement à l''EISMV ; spécialisations possibles ensuite en santé publique vétérinaire ou en recherche.'
WHERE slug = 'toutes-les-filieres';

-- ---------- FORMATIONS PROPOSÉES — EAMAU (Écoles Inter-États) ----------
UPDATE filieres SET
  description = 'Cette entrée regroupe les formations proposées par l''EAMAU (École Africaine des Métiers de l''Architecture et de l''Urbanisme), basée à Lomé, une école régionale à vocation multinationale. Le Bénin y réserve chaque année un quota de places à ses bacheliers pour la formation aux métiers de l''architecture et de l''urbanisme, avec un cursus propre à l''école d''accueil au Togo, différent du format licence classique béninois.',
  debouches = 'Pour qui ? Cette voie te convient si tu as une vocation pour l''architecture ou l''urbanisme, et que tu es prêt à étudier dans un cadre régional prestigieux, au Togo.

Le débouché principal de cette formation : les métiers d''architecte et d''urbaniste.

### Architecte
Le débouché principal : concevoir des bâtiments et projets architecturaux, en cabinet privé ou pour des structures publiques, au Bénin ou dans la sous-région.

### Urbaniste
Contribuer à la planification urbaine de villes en pleine croissance, un enjeu majeur pour de nombreuses métropoles ouest-africaines.

### Bureaux d''études en architecture et urbanisme
Intégrer un cabinet spécialisé pour accompagner des projets d''envergure.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers architecte associé, directeur d''un cabinet d''urbanisme, ou expert en aménagement urbain pour des organisations internationales.

### Poursuivre ses études
Cursus intégré à l''EAMAU ; spécialisations possibles en urbanisme durable ou en architecture patrimoniale.'
WHERE slug = 'toutes-les-filieres-2';

-- ---------- FORMATIONS PROPOSÉES — ESMT (Écoles Inter-États) ----------
UPDATE filieres SET
  description = 'Cette entrée regroupe les formations proposées par l''ESMT (École Supérieure Multinationale des Télécommunications), basée à Dakar, une école régionale à vocation multinationale. Le Bénin y réserve chaque année un quota de places à ses bacheliers pour la formation aux métiers des télécommunications et du numérique, avec un cursus propre à l''école d''accueil au Sénégal, reconnue comme une référence régionale dans ce domaine.',
  debouches = 'Pour qui ? Cette voie te convient si tu veux te spécialiser dans les télécommunications au sein d''une école régionale de référence, avec des débouchés dans un secteur en forte croissance.

Le débouché principal de cette formation : les métiers des télécommunications et du multimédia.

### Ingénieur télécoms
Le débouché principal : travailler pour des opérateurs télécoms (MTN, Moov Africa, Orange) ou des équipementiers, au Bénin ou dans la sous-région.

### Spécialiste multimédia et réseaux
Un débouché technique pour ceux qui s''orientent vers les infrastructures numériques et multimédias.

### Consultant en télécommunications
Accompagner des entreprises ou des institutions dans leurs projets de télécommunications.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur technique d''un opérateur télécom, ou expert international en télécommunications.

### Poursuivre ses études
Cursus intégré à l''ESMT ; spécialisations possibles en réseaux, sécurité des télécommunications, ou management des télécoms.'
WHERE slug = 'toutes-les-filieres-3';

-- ---------- FORMATIONS PROPOSÉES — IFORD (Écoles Inter-États) ----------
UPDATE filieres SET
  description = 'Cette entrée regroupe les formations proposées par l''IFORD (Institut de Formation et de Recherche Démographique), basé à Yaoundé, une école régionale à vocation multinationale. Le Bénin y réserve chaque année un quota de places à ses bacheliers pour la formation à la démographie et aux sciences de la population, avec un cursus propre à l''école d''accueil au Cameroun, référence régionale dans ce domaine.',
  debouches = 'Pour qui ? Cette voie te convient si les questions de population et de démographie te passionnent, et que tu veux te former dans une école régionale de référence pour ce domaine.

Le débouché principal de cette formation : l''expertise démographique appliquée aux politiques publiques.

### Démographe
Le débouché principal : analyser les dynamiques de population pour des institutions publiques ou des organisations internationales (UNFPA, agences onusiennes).

### Expert en planification démographique
Contribuer à la planification de politiques publiques tenant compte des évolutions démographiques.

### Chercheur en démographie
Poursuivre en recherche sur les questions de population, un domaine académique reconnu de cette école.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers expert senior en démographie pour une organisation internationale, ou directeur d''un institut de statistique national.

### Poursuivre ses études
Cursus intégré à l''IFORD ; spécialisations possibles en doctorat sur des thématiques démographiques spécifiques.'
WHERE slug = 'toutes-les-filieres-4';

-- ---------- FORMATIONS PROPOSÉES — CAPESA (Écoles Inter-États) ----------
UPDATE filieres SET
  description = 'Cette entrée regroupe les formations proposées par le CAPESA (Centre d''Appui aux Écoles Africaines de Statistique), une école régionale à vocation multinationale. Le Bénin y réserve chaque année un quota de places à ses bacheliers pour la formation aux métiers de la statistique appliquée, en préparation ou en complément des grandes écoles de statistique régionales (ENSEA Abidjan, ISSEA Yaoundé).',
  debouches = 'Pour qui ? Cette voie te convient si tu es solide en mathématiques et statistiques, et que tu veux accéder à une formation régionale de référence dans ce domaine.

Le débouché principal de cette formation : l''expertise statistique appliquée à l''économie et aux politiques publiques.

### Statisticien
Le débouché principal : travailler pour des institutions nationales de statistique, des cabinets d''études, ou des organisations internationales.

### Analyste de données économiques
Un débouché technique pour l''analyse quantitative appliquée à divers secteurs.

### Chercheur en statistique appliquée
Poursuivre en recherche sur des méthodes statistiques avancées.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers statisticien en chef d''une institution nationale, ou expert international en statistique.

### Poursuivre ses études
Cursus préparatoire ou intégré vers l''ENSEA (Abidjan) ou l''ISSEA (Yaoundé), grandes écoles régionales de statistique.'
WHERE slug = 'toutes-les-filieres-5';

-- ---------- FORMATIONS PROPOSÉES — ÉCOLE CENTRALE DE CASABLANCA (Écoles Inter-États) ----------
UPDATE filieres SET
  description = 'Cette entrée regroupe les formations proposées par l''École Centrale de Casablanca, au Maroc, dans le cadre d''un partenariat régional. Le Bénin y réserve chaque année un quota de places à ses bacheliers pour une formation d''ingénieur généraliste de haut niveau, sur le modèle des écoles centrales françaises, avec un cursus propre à l''école d''accueil au Maroc.',
  debouches = 'Pour qui ? Cette voie te convient si tu es un excellent bachelier scientifique visant une formation d''ingénieur généraliste de très haut niveau, avec une ouverture internationale forte.

Le débouché principal de cette formation : les métiers d''ingénieur généraliste dans des secteurs variés.

### Ingénieur généraliste
Le débouché principal : exercer dans divers secteurs industriels (énergie, industrie, conseil), au Maroc, au Bénin, ou à l''international, grâce à la reconnaissance internationale de cette école.

### Consultant en ingénierie et stratégie
Un débouché fréquent pour les diplômés de ce type d''école, valorisés pour leur polyvalence.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers directeur technique, ou dirigeant d''entreprise industrielle.

### Poursuivre ses études
Cursus intégré à l''École Centrale de Casablanca ; nombreuses possibilités de spécialisation et de double-diplôme à l''international.'
WHERE slug = 'toutes-les-filieres-6';

-- ---------- LICENCE EN DESIGN (Africa Design School, Sèmè City) ----------
UPDATE filieres SET
  description = 'La filière de Licence en Design est proposée par Africa Design School, à Sèmè City, un établissement à titre payant qui forme aux métiers créatifs du design : design graphique, design produit, design d''espace. Tu y développes une pratique de création visuelle et matérielle, avec une pédagogie orientée vers l''innovation et la créativité contemporaine, dans un cadre plus moderne et international que les formations artistiques classiques du Bénin. C''est une filière qui répond à une demande croissante de professionnels du design dans un contexte de digitalisation et de développement de l''identité visuelle des marques béninoises.',
  debouches = 'Pour qui ? Cette filière te convient si tu es créatif, que tu as une sensibilité esthétique forte, et que tu veux te former dans un cadre moderne et international aux métiers du design.

Le secteur qui recrute le plus : les agences de communication et les entreprises qui investissent dans leur identité visuelle.

### Designer graphique
Le débouché le plus direct : concevoir des identités visuelles, supports de communication, pour des agences ou des entreprises.

### Designer produit
Concevoir des objets et produits pour des entreprises industrielles ou artisanales.

### Designer d''espace
Un débouché lié à l''aménagement d''espaces commerciaux, résidentiels ou culturels.

### Freelance et entrepreneuriat créatif
Un débouché fréquent pour les designers, qui développent souvent leur propre activité indépendante.

### Évoluer dans sa carrière
Avec l''expérience et un portfolio solide, tu peux évoluer vers directeur artistique, ou fondateur de ton propre studio de design.

### Poursuivre ses études
Master en Design, dans des écoles spécialisées internationales, avec possibilité de double-diplôme selon les partenariats de l''école.'
WHERE slug = 'licence-en-design';

-- ---------- LICENCE EN MÉTIER DE L'INFORMATIQUE (EPITECH, Sèmè City) ----------
UPDATE filieres SET
  description = 'La filière de Licence en Métier de l''Informatique est proposée par EPITECH (École de l''Innovation et de l''Expertise en Informatique), à Sèmè City, un établissement à titre payant qui forme aux métiers du numérique et de l''informatique selon une pédagogie innovante, souvent basée sur l''apprentissage par projet plutôt que sur des cours magistraux classiques. Tu y développes des compétences en développement, gestion de projets numériques, et innovation technologique, dans un cadre pensé pour attirer des standards internationaux et préparer à l''écosystème tech en forte croissance en Afrique.',
  debouches = 'Pour qui ? Cette filière te convient si tu veux une formation informatique intensive et pratique, dans un cadre moderne pensé pour l''écosystème tech international.

Le secteur qui recrute le plus : les entreprises tech et startups, un secteur en forte croissance en Afrique de l''Ouest.

### Développeur logiciel
Le débouché le plus direct : développer des applications et logiciels pour des entreprises ou des startups.

### Chef de projet numérique
Piloter des projets de développement informatique, un débouché valorisant la pédagogie par projet de cette école.

### Entrepreneuriat tech
Un débouché fréquent pour les diplômés de ce type d''école, qui développent leurs propres startups.

### Consultant en transformation digitale
Accompagner des entreprises traditionnelles dans leur digitalisation.

### Évoluer dans sa carrière
Avec l''expérience, tu peux évoluer vers CTO (directeur technique) d''une entreprise, ou fondateur d''une startup tech reconnue.

### Poursuivre ses études
Master en Informatique ou spécialisations proposées par le réseau international EPITECH, avec possibilité de mobilité internationale.'
WHERE slug = 'licence-en-metier-de-linformatique';
