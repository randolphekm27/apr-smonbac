-- ============================================
-- UNIVERSITÉS
-- ============================================
CREATE TABLE universites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT NOT NULL,          -- texte propre, jamais réutilisé ailleurs
  logo_url TEXT,
  banner_url TEXT,
  adresse TEXT,
  ville TEXT,
  site_web TEXT,
  annee_creation INT,
  statut TEXT,                        -- publique / privée
  frais_inscription_info TEXT,        -- texte libre, spécifique à CETTE université
  contact_email TEXT,
  contact_telephone TEXT,
  stats_etudiants TEXT,
  stats_ecoles TEXT,
  stats_campuses TEXT,
  histoire TEXT,
  presentation TEXT,
  admission_info TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ÉCOLES / FACULTÉS
-- ============================================
CREATE TABLE ecoles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  universite_id UUID NOT NULL REFERENCES universites(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT NOT NULL,          -- PROPRE à cette école, pas héritée de l'université
  logo_url TEXT,
  batiment_info TEXT,
  contact_email TEXT,
  contact_telephone TEXT,
  contact_adresse TEXT,
  theme_color TEXT,
  histoire TEXT,
  programmes_count INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
-- universite_id sert UNIQUEMENT à savoir "cette école appartient à quelle université"
-- Il ne doit jamais être utilisé pour aller chercher un texte de description à afficher

-- ============================================
-- FILIÈRES
-- ============================================
CREATE TABLE filieres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ecole_id UUID NOT NULL REFERENCES ecoles(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  description TEXT NOT NULL,          -- PROPRE à cette filière
  duree_etudes TEXT,
  niveau_entree TEXT,                 -- ex: "Bac toutes séries", "Bac C, D, E"
  conditions_admission TEXT,          -- texte libre, unique
  debouches TEXT,                     -- texte libre, unique
  cout_annuel_info TEXT,
  competences_visees TEXT,
  programme_resume TEXT,
  bourse INT DEFAULT 0,
  aide_fpp INT DEFAULT 0,
  mode_entree TEXT,
  bac_recommande JSONB DEFAULT '[]'::jsonb,
  matieres JSONB DEFAULT '[]'::jsonb,
  careers JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE universites ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecoles ENABLE ROW LEVEL SECURITY;
ALTER TABLE filieres ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Universites sont publiques" ON universites FOR SELECT USING (true);
CREATE POLICY "Ecoles sont publiques" ON ecoles FOR SELECT USING (true);
CREATE POLICY "Filieres sont publiques" ON filieres FOR SELECT USING (true);

-- Politiques TEMPORAIRES pour autoriser l'insertion via l'API (pour le script de migration)
CREATE POLICY "Autoriser insertion universites" ON universites FOR INSERT WITH CHECK (true);
CREATE POLICY "Autoriser insertion ecoles" ON ecoles FOR INSERT WITH CHECK (true);
CREATE POLICY "Autoriser insertion filieres" ON filieres FOR INSERT WITH CHECK (true);
