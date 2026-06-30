export interface University {
  id: string; // e.g. "uac", "up", "una", "upf"
  name: string; // e.g. "UAC"
  fullName: string; // e.g. "Université d'Abomey-Calavi"
  description: string;
  image: string;
  bannerImage: string;
  stats: {
    creationYear: string;
    students: string;
    schools: string;
    campuses: string;
  };
  history?: string;
  presentation?: string;
  admissionInfo?: string;
  contacts?: {
    address: string;
    phone: string;
    email: string;
  };
}

export interface School {
  id: string; // e.g. "irsp", "imsp", "fsa", "flash", "faseg", "epac"
  name: string; // e.g. "IRSP"
  fullName: string; // e.g. "Institut Régional de Santé Publique"
  universityId: string;
  description: string;
  themeColor: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo';
  majorsCount?: number; // Calculated or hardcoded
  history?: string;
  domains?: string[];
  usefulInfo?: string;
  contacts?: {
    address: string;
    phone: string;
    email: string;
  };
  location?: string;
}

export interface Major {
  id: string; // e.g. "licence-informatique"
  name: string; // e.g. "Licence en Informatique"
  description: string;
  duration: string;
  level: string;
  format: string;
  credits: string;
  language: string;
  careers: {
    name: string;
    salary: string;
    themeColor: string;
  }[];
  competences?: string[];
  programme?: { semester: string; details: string }[];
  salairesInfo?: string;
  faq?: { q: string; a: string }[];
}

export interface SchoolMajor {
  schoolId: string;
  majorId: string;
}

export interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  quote: string;
}
