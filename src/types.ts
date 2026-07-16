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
