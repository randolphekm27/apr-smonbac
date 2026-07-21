export interface University {
  id: string; // uuid
  slug: string;
  nom: string;
  description: string;
  logo_url: string | null;
  banner_url: string | null;
  adresse: string | null;
  ville: string | null;
  site_web: string | null;
  annee_creation: number | null;
  statut: string | null;
  frais_inscription_info: string | null;
  contact_email: string | null;
  contact_telephone: string | null;
  stats_etudiants: string | null;
  stats_ecoles: string | null;
  stats_campuses: string | null;
  histoire: string | null;
  presentation: string | null;
  admission_info: string | null;
}

export interface School {
  id: string; // uuid
  universite_id: string;
  slug: string;
  nom: string;
  description: string;
  logo_url: string | null;
  batiment_info: string | null;
  contact_email: string | null;
  contact_telephone: string | null;
  contact_adresse: string | null;
  theme_color: string | null;
  histoire: string | null;
  programmes_count: number | null;
  photo_couverture_url: string | null;
}

export interface Major {
  id: string; // uuid
  ecole_id: string;
  slug: string;
  nom: string;
  description: string;
  duree_etudes: string | null;
  niveau_entree: string | null;
  conditions_admission: string | null;
  debouches: string | null;
  cout_annuel_info: string | null;
  competences_visees: string | null;
  programme_resume: string | null;
  
  // Specific admission fields
  bourse: number | null;
  aide_fpp: number | null;
  mode_entree: string | null;
  bac_recommande: string[] | null;
  matieres: string[] | null;
  careers: {
    name: string;
    salary: string;
    themeColor: string;
  }[] | null;

  // Contenu pédagogique détaillé (guide d'orientation 2025-2026)
  objectifs_pedagogiques: string | null;
  cours_principaux: { nom: string; semestre?: number; credits?: number }[] | null;
  cours_optionnels: { nom: string }[] | null;
  projets_typiques: string[] | null;

  // Stages & insertion professionnelle
  stage_obligatoire: boolean | null;
  stage_duree: string | null;
  stages_possibles: string | null;
  entreprises_cibles: string[] | null;

  // Rémunération estimée (FCFA)
  salaire_debutant_min: number | null;
  salaire_debutant_max: number | null;
  salaire_5ans_min: number | null;
  salaire_5ans_max: number | null;

  // Poursuite d'études & reconnaissance
  poursuite_etudes: string | null;
  equivalence_internationale: string | null;

  // Admission & coûts complémentaires
  places_payantes: number | null;
  places_totales: number | null;
  frais_inscription: number | null;
  frais_mensuel: number | null;

  // Médias & découverte
  photo_couverture_url: string | null;
  video_presentation_url: string | null;
  brochure_pdf_url: string | null;
  mots_cles: string[] | null;

  // Statistiques
  niveau_difficulte: number | null;
  note_moyenne: number | null;
  nombre_avis: number | null;
  genre_dominant: string | null;
}

export interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  quote: string;
}

export interface Concours {
  id: string;
  title: string;
  shortTitle: string;
  type: 'sciences' | 'lettres' | 'administration';
  institution: string;
  status: string;
  statusColor: string;
  dateLimite: string;
  places: string;
  location: string;
  badge: string;
  description: string;
  conditions: string[];
  epreuves: string[];
}
