import { University, School, Major, SchoolMajor, Testimonial, Concours } from './types';
import { UNA_NEW_SCHOOLS, UNA_NEW_MAJORS, UNA_NEW_SCHOOL_MAJORS } from './una_data';
import { EXTRA_UNIVERSITIES, EXTRA_SCHOOLS, EXTRA_MAJORS, EXTRA_SCHOOL_MAJORS } from './extra_data';

export const UNIVERSITIES: University[] = [
  {
    id: 'uac',
    name: 'UAC',
    fullName: "Université d'Abomey-Calavi",
    description: "L'UAC est la plus grande université du Bénin, offrant une large gamme de programmes dans diverses disciplines.",
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    stats: {
      creationYear: '1970',
      students: '+45 000',
      schools: '27',
      campuses: '1',
    },
    history: "Créée à l'origine sous le nom d'Université Nationale du Bénin (UNB) en 1970, elle a été rebaptisée en Université d'Abomey-Calavi (UAC) en 2001. C'est le plus ancien et le plus grand pôle d'enseignement supérieur public du pays.",
    presentation: "L'UAC regroupe des facultés classiques de lettres, droit, sciences économiques, médecine, ainsi que des écoles professionnelles de formation d'ingénieurs (EPAC), d'agronomie (FSA), de mathématiques (IMSP) et d'administration. Elle contribue activement au rayonnement scientifique de la sous-région ouest-africaine.",
    admissionInfo: "L'admission se fait soit à titre de boursier de l'État (classement national après le BAC selon les moyennes obtenues et les quotas d'attribution), soit à titre payant (sélection sur dossier). Les frais d'inscription à titre privé varient selon l'établissement.",
    contacts: {
      address: "Campus Universitaire d'Abomey-Calavi, République du Bénin",
      phone: "+229 21 36 11 19",
      email: "contact@uac.bj"
    }
  },
  {
    id: 'up',
    name: 'UP',
    fullName: 'Université de Parakou',
    description: "Deuxième université publique du Bénin, l'UP dessert les régions du nord avec une expertise reconnue en médecine et agronomie.",
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
    stats: {
      creationYear: '2001',
      students: '+20 000',
      schools: '3',
      campuses: '3',
    },
    history: "L'Université de Parakou a été créée par décret en 2001 pour décentraliser l'enseignement supérieur public et offrir un pôle d'excellence académique de proximité aux départements septentrionaux.",
    presentation: "L'UP est réputée pour sa rigueur académique dans les domaines de la santé, de l'agronomie tropicale, des sciences économiques et juridiques, ainsi que pour son Institut Universitaire de Technologie.",
    admissionInfo: "Admission nationale gérée par le MESRS pour les bacheliers méritants, et processus d'admission directe sur dossier pour les auditeurs libres à titre payant.",
    contacts: {
      address: "Quartier Okédama, Parakou, République du Bénin",
      phone: "+229 23 61 07 12",
      email: "info@univ-parakou.bj"
    }
  },
  {
    id: 'una',
    name: 'UNA',
    fullName: "Université Nationale d'Agriculture",
    description: "Établissement thématique d'excellence dédié à la formation agricole, au développement durable et à la recherche agronomique.",
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1600&q=80',
    stats: {
      creationYear: '2016',
      students: '+8 000',
      schools: '2',
      campuses: '4',
    },
    history: "Née de la restructuration de la carte universitaire de 2016, l'UNA est une université spécialisée de premier ordre, entièrement dédiée à l'atteinte de la souveraineté alimentaire nationale.",
    presentation: "L'UNA prépare les futurs cadres agricoles, agro-entrepreneurs et biotechnologistes grâce à des fermes d'application, des laboratoires de biotechnologie moderne et des partenariats internationaux de recherche.",
    admissionInfo: "Sélection sur concours d'entrée et classement national du BAC. Les filières sont ouvertes aux séries scientifiques (C, D, DEAT, etc.).",
    contacts: {
      address: "Kétou, République du Bénin",
      phone: "+229 21 00 84 92",
      email: "sec.general@una.bj"
    }
  },
  {
    id: "unstim",
    name: "UNSTIM",
    fullName: "Université Nationale des Sciences, Technologies, Ingénierie et Mathématiques",
    description: "Université technique d'excellence formant les ingénieurs, techniciens supérieurs et enseignants techniques du Bénin dans les domaines des STIM.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    stats: {
      creationYear: "2014",
      students: "+15 000",
      schools: "8",
      campuses: "5",
    },
    history: "Créée en 2014, l'UNSTIM est la principale université technique et technologique du Bénin. Elle regroupe des écoles nationales supérieures et des instituts spécialisés dans les sciences appliquées, l'ingénierie et les mathématiques.",
    presentation: "L'UNSTIM forme des techniciens supérieurs, ingénieurs de conception et enseignants techniques dans des domaines variés : génie civil, électrotechnique, informatique, biotechnologie, énergies renouvelables et bien d'autres. Ses campus sont répartis sur plusieurs villes du Bénin.",
    admissionInfo: "L'admission se fait soit par concours national (ENSET, INSPEI, ENS/Nati) soit par classement sur la base des moyennes du BAC (INSTI, ENSBBA, FAST, ENSGEP, ENSTP). Les quotas de bourses d'État sont fixés annuellement par le MESRS.",
    contacts: {
      address: "Abomey-Calavi / Natitingou / Lokossa, République du Bénin",
      phone: "+229 21 36 00 00",
      email: "contact@unstim.bj"
    }
  },
  ...EXTRA_UNIVERSITIES
];

export const SCHOOLS: School[] = [
  {
    "id": "irsp",
    "name": "IRSP",
    "fullName": "Institut Régional de Santé Publique",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "blue",
    "domains": [
      "Santé"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "flash-adjarra",
    "name": "FLASH-Adjarra",
    "fullName": "Faculté des Lettres, Arts et Sciences Humaines-Adjarra",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "purple",
    "domains": [
      "Géographie",
      "Socio-Anthropologie",
      "Anglais"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Adjarra, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Adjarra, Bénin"
  },
  {
    "id": "imsp",
    "name": "IMSP",
    "fullName": "Institut de Mathématiques et de Sciences Physiques",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "green",
    "domains": [
      "Classes"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "fllac",
    "name": "FLLAC",
    "fullName": "Faculté des Lettres, Langues, Arts et Communications",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "orange",
    "domains": [
      "Allemand",
      "Anglais",
      "Espagnol"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "inmaac",
    "name": "INMAAC",
    "fullName": "Institut National des Métiers d'Arts, d'Archéologie et de la Culture",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "red",
    "domains": [
      "Administration",
      "Arts",
      "Musique"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "cifred",
    "name": "CIFRED",
    "fullName": "Centre Inter Facultaire de Formation et de Recherche en Environnement pour le Développement Durable",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "indigo",
    "domains": [
      "Environnement,"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "igate",
    "name": "IGATE",
    "fullName": "Institut de Cadre de Vie",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "blue",
    "domains": [
      "Gestion",
      "Géomatique",
      "Planification"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "inmes",
    "name": "INMeS",
    "fullName": "Institut National Médico-Sanitaire",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "purple",
    "domains": [
      "Sciences"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "ine",
    "name": "INE",
    "fullName": "Institut National de l'Eau",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "green",
    "domains": [
      "Hydrologie",
      "Hydrogéologie",
      "Ecohydrologie"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "eneam",
    "name": "ENEAM",
    "fullName": "Ecole Nationale d'Economie Appliquée et de Management",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "orange",
    "domains": [
      "Administration",
      "Analyse",
      "Assurance"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "ine",
    "name": "EPA",
    "fullName": "École du Patrimoine Africain",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "red",
    "domains": [
      "Gestion"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "ine",
    "name": "FASHS Calavi",
    "fullName": "Faculté des Sciences Humaines et Sociales",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "indigo",
    "domains": [
      "Géographie",
      "Psychologie",
      "Sciences"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "enstic",
    "name": "ENSTIC",
    "fullName": "Ecole Nationale des Sciences et Techniques de l'Information et de la Communication",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "blue",
    "domains": [
      "Journalisme",
      "Métiers"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "enam",
    "name": "Ecole Nationale d'Administration et de Magistrature ENAM",
    "fullName": "Ecole Nationale d'Administration",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "purple",
    "domains": [
      "Administration",
      "Secrétariat",
      "Sciences"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "ifri",
    "name": "IFRI",
    "fullName": "Institut de Formation et de Recherche en Informatique",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "green",
    "domains": [
      "Génie",
      "Internet",
      "Intelligence"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "fsa",
    "name": "FSA",
    "fullName": "Faculté des Sciences Agronomiques",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "orange",
    "domains": [
      "Sciences",
      "Aménagement",
      "Génie"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "fss",
    "name": "FSS",
    "fullName": "Faculté des Sciences de la Santé",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "red",
    "domains": [
      "Médecine",
      "Pharmacie",
      "Kinésithérapie"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "epa",
    "name": "EPAC",
    "fullName": "Ecole Polytechnique d'Abomey-Calavi",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "indigo",
    "domains": [
      "Génie",
      "Production",
      "Machinisme"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "ceforp",
    "name": "CEFORP",
    "fullName": "Centre de Formation et de Recherche en matière de Population",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "blue",
    "domains": [
      "Dynamique"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "herci",
    "name": "HERCI",
    "fullName": "Haute Ecole Régionale de Commerce International",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "purple",
    "domains": [
      "Négoce",
      "Gestion",
      "Commerce"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "injeps",
    "name": "Institut National de la Jeunesse de l'Education Physique et Sportive - INJEPS",
    "fullName": "Institut National de l'Education Physique et Sportive",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "green",
    "domains": [
      "Education",
      "Entrainement",
      "Développement"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "ens-porto-novo",
    "name": "ENS Porto-Novo",
    "fullName": "Ecole Normale Supérieure / Porto-Novo",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "orange",
    "domains": [
      "Histoire",
      "Espagnol",
      "Allemand"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Porto-Novo, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Porto-Novo, Bénin"
  },
  {
    "id": "fadesp",
    "name": "FADESP",
    "fullName": "Faculté de Droit et de Science Politique",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "red",
    "domains": [
      "Droit",
      "Sciences"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "faseg",
    "name": "FASEG",
    "fullName": "Faculté des Sciences Economiques et de Gestion",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "indigo",
    "domains": [
      "Sciences",
      "Econométrie"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "fast",
    "name": "FAST",
    "fullName": "Faculté des Sciences Techniques",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "blue",
    "domains": [
      "Sciences",
      "Physique-Chimie",
      "Mathématiques"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "confucius",
    "name": "Confucius",
    "fullName": "Institut Confucius",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "purple",
    "domains": [
      "Langue",
      "Didactique"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "ilaci",
    "name": "ILACI",
    "fullName": "Institut de Langue Arabe et Culture Islamique",
    "universityId": "uac",
    "description": "Établissement officiel de formation de l'UAC spécialisé dans les domaines des filières associées.",
    "themeColor": "green",
    "domains": [
      "Langue",
      "Culture"
    ],
    "usefulInfo": "Ressources de formation de pointe pour l'apprentissage théorique et pratique.",
    "contacts": {
      "address": "Campus d'Abomey-Calavi, Bénin",
      "phone": "+229 21 36 11 19",
      "email": "contact@uac.bj"
    },
    "location": "Campus d'Abomey-Calavi, Bénin"
  },
  {
    "id": "fm",
    "name": "FM (UP)",
    "fullName": "Faculté de Médecine de Parakou",
    "universityId": "up",
    "description": "Formation de médecins, cliniciens et professionnels de santé pour les structures hospitalières d'Afrique.",
    "themeColor": "red",
    "history": "Créée pour former les praticiens hospitaliers directement au contact des réalités du Nord et du Centre-Bénin. Travaille en étroite collaboration avec le Centre Hospitalier Universitaire Départemental (CHUD) de Parakou.",
    "domains": [
      "Médecine Générale",
      "Pédiatrie",
      "Gynécologie-Obstétrique",
      "Chirurgie Générale"
    ],
    "usefulInfo": "Le stage d'immersion commence dès la troisième année au CHUD Parakou, permettant une pratique clinique rapide sous supervision professorale.",
    "contacts": {
      "address": "Quartier CHUD, Parakou",
      "phone": "+229 23 61 02 11",
      "email": "facmed@univ-parakou.bj"
    },
    "location": "Quartier CHUD, Parakou, Bénin"
  },
  {
    "id": "fa",
    "name": "FA (UP)",
    "fullName": "Faculté d'Agronomie de Parakou",
    "universityId": "up",
    "description": "Expertise universitaire en sciences agronomiques avec une spécialisation en agro-économie et technologies alimentaires des zones de savane.",
    "themeColor": "green",
    "history": "Fondée en 2002 pour répondre aux défis climatiques spécifiques des savanes et encourager le développement des filières cotonnières, de cajou et de céréales au Bénin.",
    "domains": [
      "Agronomie Tropicale",
      "Technologie Alimentaire",
      "Agro-économie",
      "Production Animale en Zone Sèche"
    ],
    "usefulInfo": "L'école dispose d'un laboratoire de nutrition animale réputé dans toute l'Afrique de l'Ouest.",
    "contacts": {
      "address": "Campus Central UP, Bloc Agronomie",
      "phone": "+229 23 61 09 88",
      "email": "fa.up@univ-parakou.bj"
    },
    "location": "Campus Okédama, Parakou, Bénin"
  },
  {
    "id": "iut",
    "name": "IUT (UP)",
    "fullName": "Institut Universitaire de Technologie",
    "universityId": "up",
    "description": "Formations technologiques courtes et intensives en gestion des entreprises et informatique d'organisation.",
    "themeColor": "blue",
    "history": "L'IUT de Parakou a été créé pour combler le manque de techniciens supérieurs et d'assistants de gestion hautement qualifiés dans le tissu industriel et tertiaire national.",
    "domains": [
      "Informatique de Gestion",
      "Gestion des Entreprises & Administrations",
      "Gestion des Transports & Logistique"
    ],
    "usefulInfo": "Le cursus dure 3 ans et comprend un stage obligatoire d'au moins 3 mois en entreprise pour l'obtention de la Licence Professionnelle.",
    "contacts": {
      "address": "Campus de l'IUT, Parakou",
      "phone": "+229 23 61 14 05",
      "email": "iut@univ-parakou.bj"
    },
    "location": "Quartier Okédama, Parakou, Bénin"
  },
  {
    "id": "ensta",
    "name": "ENSTA",
    "fullName": "École Nationale Supérieure des Sciences et Techniques Agronomiques",
    "universityId": "una",
    "description": "Formation d'ingénieurs spécialisés en horticulture, aménagement paysager et foresterie durable.",
    "themeColor": "green",
    "history": "Cette école d'élite a été créée sous l'égide de l'UNA pour former des experts capables de révolutionner l'horticulture maraîchère béninoise et de concevoir des aménagements éco-paysagers urbains et ruraux.",
    "domains": [
      "Horticulture et Cultures Maraîchères",
      "Foresterie et Aménagement des Espaces Naturels",
      "Génie des Systèmes Irrigués"
    ],
    "usefulInfo": "Dispose d'une station horticole expérimentale pilote dotée de systèmes de micro-irrigation automatiques de pointe.",
    "contacts": {
      "address": "Campus de Djougou, République du Bénin",
      "phone": "+229 21 11 00 12",
      "email": "ensta@una.bj"
    },
    "location": "Djougou, Bénin"
  },
  {
    "id": "ensbba",
    "name": "ENSBBA",
    "fullName": "École Nationale Supérieure de Biosciences et de Biotechnologies Appliquées",
    "universityId": "una",
    "description": "Pôle d'excellence thématique pour la bio-ingénierie, la sécurité sanitaire des aliments et l'analyse biomoléculaire.",
    "themeColor": "indigo",
    "history": "Créée pour accompagner l'industrie agroalimentaire nationale et la recherche pharmaceutique grâce à la maîtrise des outils biotechnologiques modernes.",
    "domains": [
      "Biotechnologies Végétales & Animales",
      "Contrôle Qualité & Sécurité Alimentaire",
      "Biochimie Appliquée"
    ],
    "usefulInfo": "Possède des laboratoires d'analyses de microbiologie alimentaire agréés par l'Agence Béninoise de Sécurité Sanitaire des Aliments (ABSSA).",
    "contacts": {
      "address": "Campus de Dassa-Zoumé, République du Bénin",
      "phone": "+229 21 02 33 44",
      "email": "ensbba@una.bj"
    },
    "location": "Dassa-Zoumé, Bénin"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "name": "ENSET",
    "fullName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 14,
    "themeColor": "blue"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "name": "INSTI",
    "fullName": "Institut National Supérieur de Technologie Industrielle (INSTI)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 7,
    "themeColor": "purple"
  },
  {
    "id": "unstim-institut-national-superieur-des-classes-preparatoires-aux-etudes-d-ingenieurs-inspei",
    "name": "INSPEI",
    "fullName": "Institut National Supérieur des Classes Préparatoires aux Etudes d'Ingénieurs (INSPEI)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 1,
    "themeColor": "green"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-natitingou-ens-nati",
    "name": "ENS/Nati",
    "fullName": "Ecole Normale Supérieure de Natitingou (ENS/Nati)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 3,
    "themeColor": "orange"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "name": "ENSBBA",
    "fullName": "Ecole Nationale Supérieure des Biosciences et Biotechnologies Appliquées (ENSBBA)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 5,
    "themeColor": "red"
  },
  {
    "id": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou",
    "name": "FAST/Natitingou",
    "fullName": "Faculté des Sciences et Techniques de Natitingou (FAST/Natitingou)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 2,
    "themeColor": "indigo"
  },
  {
    "id": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep",
    "name": "ENSGEP",
    "fullName": "Ecole Nationale Supérieure de Génie Energétique et Procédés (ENSGEP)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 2,
    "themeColor": "blue"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "name": "ENSTP",
    "fullName": "Ecole Nationale Supérieure des Travaux Publics (ENSTP)",
    "universityId": "unstim",
    "description": "Formation d'excellence proposée par l'UNSTIM dans le domaine des sciences, technologies, ingénierie et mathématiques.",
    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    "location": "Bénin",
    "programs": 4,
    "themeColor": "purple"
  },
  ...UNA_NEW_SCHOOLS,
  ...EXTRA_SCHOOLS
];

export const MAJORS: Major[] = [
  {
    "id": "uac-irsp-sant-publique-polyvalente",
    "name": "Santé publique polyvalente",
    "description": "Le programme en Santé publique polyvalente à l'établissement IRSP prépare les étudiants aux carrières de : Agent de santé communautaire, Responsable de surveillance épidémiologique, Attaché de recherche en santé.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Agent de santé communautaire",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Responsable de surveillance épidémiologique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Attaché de recherche en santé",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Assistant en planification, suivi et évaluation en santé",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Agent d'hygiène et d'assainissement du milieu",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Santé publique polyvalente.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Santé publique polyvalente."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : SVT, PCT, Maths."
      }
    ],
    "bourse": 17,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Maths"
    ]
  },
  {
    "id": "uac-flash-adjarra-g-ographie-et-am-nagement-du-ter",
    "name": "Géographie et Aménagement du Territoire",
    "description": "Le programme en Géographie et Aménagement du Territoire à l'établissement FLASH-Adjarra prépare les étudiants aux carrières de : Enseignement, Laboratoires et institutions de recherche, Assainissement.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, DEAT (toutes spécialités), DT/STI)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Laboratoires et institutions de recherche",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Assainissement",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Géographie et Aménagement du Territoire.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Géographie et Aménagement du Territoire."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, DEAT (toutes spécialités), DT/STI."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Hist-Géo/Anglais (DT/STI), Maths, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 60,
    "aide_fpp": 340,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DEAT (toutes spécialités)",
      "DT/STI"
    ],
    "matieres": [
      "Français",
      "Hist-Géo/Anglais (DT/STI)",
      "Maths",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-flash-adjarra-socio-anthropologie",
    "name": "Socio-Anthropologie",
    "description": "Le programme en Socio-Anthropologie à l'établissement FLASH-Adjarra prépare les étudiants aux carrières de : Agent dans les centres sociaux, Ministères, Recherche.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, DEAT (toutes spécialités), DT/STI)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Agent dans les centres sociaux",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Ministères",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Recherche",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Socio-Anthropologie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Socio-Anthropologie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, DEAT (toutes spécialités), DT/STI."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Hist-Géo/Maths (DT/STI), Anglais (LV1), Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 63,
    "aide_fpp": 323,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DEAT (toutes spécialités)",
      "DT/STI"
    ],
    "matieres": [
      "Français",
      "Hist-Géo/Maths (DT/STI)",
      "Anglais (LV1)",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-flash-adjarra-anglais",
    "name": "Anglais",
    "description": "Le programme en Anglais à l'établissement FLASH-Adjarra prépare les étudiants aux carrières de : Interprétariat, Tourisme, Enseignements.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, DEAT (toutes spécialités), DT/STI)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Interprétariat",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Tourisme",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Enseignements",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Anglais.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Anglais."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, DEAT (toutes spécialités), DT/STI."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Hist-Géo/Maths (DT/STI), Anglais (LV1), Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 134,
    "aide_fpp": 667,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DEAT (toutes spécialités)",
      "DT/STI"
    ],
    "matieres": [
      "Français",
      "Hist-Géo/Maths (DT/STI)",
      "Anglais (LV1)",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-imsp-classes-pr-paratoires-math-matiques-physi",
    "name": "Classes préparatoires Mathématiques, Physiques et Science de l'Ingénieur (MPSI) et Physique-Chimie et Science de l'Ingénieur (PCSI)",
    "description": "Le programme en Classes préparatoires Mathématiques, Physiques et Science de l'Ingénieur (MPSI) et Physique-Chimie et Science de l'Ingénieur (PCSI) à l'établissement IMSP prépare les étudiants aux carrières de : Entrée dans les grandes écoles d'ingénieurs, Entrée dans les Masters de Mathématiques, de Physique et Informatique.",
    "duration": "2 ans",
    "level": "Niveau Bac (C, D, E, F)",
    "format": "Formation initiale",
    "credits": "120 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Entrée dans les grandes écoles d'ingénieurs",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Entrée dans les Masters de Mathématiques, de Physique et Informatique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Classes préparatoires Mathématiques, Physiques et Science de l'Ingénieur (MPSI) et Physique-Chimie et Science de l'Ingénieur (PCSI).",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Classes préparatoires Mathématiques, Physiques et Science de l'Ingénieur (MPSI) et Physique-Chimie et Science de l'Ingénieur (PCSI)."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, F."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Français."
      }
    ],
    "bourse": 81,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Français"
    ]
  },
  {
    "id": "uac-fllac-allemand",
    "name": "Allemand",
    "description": "Le programme en Allemand à l'établissement FLLAC prépare les étudiants aux carrières de : Interprétariat, Tourisme, Enseignants dans les collèges et lycées.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Interprétariat",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Tourisme",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Enseignants dans les collèges et lycées",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Lecteur correcteur des maisons d'édition",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Allemand.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Allemand."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Allemand (LV1), Anglais (LV2)/Hist-Géo (B), Français."
      }
    ],
    "bourse": 12,
    "aide_fpp": 75,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B"
    ],
    "matieres": [
      "Allemand (LV1)",
      "Anglais (LV2)/Hist-Géo (B)",
      "Français"
    ]
  },
  {
    "id": "uac-fllac-anglais",
    "name": "Anglais",
    "description": "Le programme en Anglais à l'établissement FLLAC prépare les étudiants aux carrières de : Interprétariat, Tourisme, Enseignants dans les collèges et lycées.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Interprétariat",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Tourisme",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Enseignants dans les collèges et lycées",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Lecteur correcteur des maisons d'édition",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Anglais.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Anglais."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Anglais (LV1), Français, Hist-Géo."
      }
    ],
    "bourse": 82,
    "aide_fpp": 640,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Anglais (LV1)",
      "Français",
      "Hist-Géo"
    ]
  },
  {
    "id": "uac-fllac-espagnol",
    "name": "Espagnol",
    "description": "Le programme en Espagnol à l'établissement FLLAC prépare les étudiants aux carrières de : Interprétariat, Tourisme, Enseignement.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Interprétariat",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Tourisme",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Enseignement",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Espagnol.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Espagnol."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Espagnol (LV1), Anglais (LV2)/Hist-Géo (B), Français."
      }
    ],
    "bourse": 12,
    "aide_fpp": 69,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B"
    ],
    "matieres": [
      "Espagnol (LV1)",
      "Anglais (LV2)/Hist-Géo (B)",
      "Français"
    ]
  },
  {
    "id": "uac-fllac-lettres-modernes",
    "name": "Lettres Modernes",
    "description": "Le programme en Lettres Modernes à l'établissement FLLAC prépare les étudiants aux carrières de : Enseignement, Recherche littéraire, Métiers de l'édition.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Recherche littéraire",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Métiers de l'édition",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Lettres Modernes.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Lettres Modernes."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Philo."
      }
    ],
    "bourse": 88,
    "aide_fpp": 60,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Philo"
    ]
  },
  {
    "id": "uac-fllac-sciences-du-langage-et-de-la-communicati",
    "name": "Sciences du Langage et de la Communication",
    "description": "Le programme en Sciences du Langage et de la Communication à l'établissement FLLAC prépare les étudiants aux carrières de : Didacticien de langue française et langues africaines, Consultant en éducation bi plurilingues et interculturelle.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G1, G3)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Didacticien de langue française et langues africaines",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Consultant en éducation bi plurilingues et interculturelle",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences du Langage et de la Communication.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences du Langage et de la Communication."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G1, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Philo/Etude de cas (G)."
      }
    ],
    "bourse": 82,
    "aide_fpp": 311,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G1",
      "G3"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Philo/Etude de cas (G)"
    ]
  },
  {
    "id": "uac-inmaac-administration-culturelle",
    "name": "Administration Culturelle",
    "description": "Le programme en Administration Culturelle à l'établissement INMAAC prépare les étudiants aux carrières de : Production ou assistance de production, Diffusion et communication, Assistant programmateur.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Production ou assistance de production",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Diffusion et communication",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Assistant programmateur",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Manager d'artistes",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Administration Culturelle.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Administration Culturelle."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Hist-Géo, Philo."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Hist-Géo",
      "Philo"
    ]
  },
  {
    "id": "uac-inmaac-arts-dramatiques",
    "name": "Arts dramatiques",
    "description": "Le programme en Arts dramatiques à l'établissement INMAAC prépare les étudiants aux carrières de : Comédien, Metteur en scène, Régisseur.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Comédien",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Metteur en scène",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Régisseur",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Voix off",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Doublage vocal",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Arts dramatiques.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Arts dramatiques."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Hist-Géo, Philo."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Hist-Géo",
      "Philo"
    ]
  },
  {
    "id": "uac-inmaac-arts-plastiques",
    "name": "Arts Plastiques",
    "description": "Le programme en Arts Plastiques à l'établissement INMAAC prépare les étudiants aux carrières de : Dessinateur, Peintre, Sculpteur.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, DT/Arts textile, DT/Communication graphique)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Dessinateur",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Peintre",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Sculpteur",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Designer",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Illustrateur",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Maquettiste",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Critique d'art",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Arts Plastiques.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Arts Plastiques."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, DT/Arts textile, DT/Communication graphique."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : A1,A2,B,C,D: Français, Philo, Maths, Pour les DT: Dissertation française, Histoire de l'Art, Art Appliqué."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DT/Arts textile",
      "DT/Communication graphique"
    ],
    "matieres": [
      "A1,A2,B,C,D: Français, Philo, Maths",
      "Pour les DT: Dissertation française, Histoire de l'Art, Art Appliqué"
    ]
  },
  {
    "id": "uac-inmaac-musique-et-musicologie",
    "name": "Musique et Musicologie",
    "description": "Le programme en Musique et Musicologie à l'établissement INMAAC prépare les étudiants aux carrières de : Chanteur, Chef de chœur, Designer sonore.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, DT/Musique, DT/MAO)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Chanteur",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Chef de chœur",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Designer sonore",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Compositeur de musique et paroles",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Musicien",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Musique et Musicologie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Musique et Musicologie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, DT/Musique, DT/MAO."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Maths, Pour les DT: Harmonie, Théorie musicale, Histoire de la musique et organologie."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DT/Musique",
      "DT/MAO"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Maths",
      "Pour les DT: Harmonie, Théorie musicale, Histoire de la musique et organologie"
    ]
  },
  {
    "id": "uac-inmaac-cin-ma-et-audiovisuel",
    "name": "Cinéma et Audiovisuel",
    "description": "Le programme en Cinéma et Audiovisuel à l'établissement INMAAC prépare les étudiants aux carrières de : Scénariste, Storyboardeur, Scénographe.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Scénariste",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Storyboardeur",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Scénographe",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Régisseur",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Monteur image",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Création, gestion et diffusion",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Cinéma et Audiovisuel.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Cinéma et Audiovisuel."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, PCT (Maths pour A), Philo."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "PCT (Maths pour A)",
      "Philo"
    ]
  },
  {
    "id": "uac-cifred-environnement-hygi-ne-et-sant-publique",
    "name": "Environnement, Hygiène et Santé publique",
    "description": "Le programme en Environnement, Hygiène et Santé publique à l'établissement CIFRED prépare les étudiants aux carrières de : Inspecteur d'action sanitaire.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, EA)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Inspecteur d'action sanitaire",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Environnement, Hygiène et Santé publique.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Environnement, Hygiène et Santé publique."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, EA."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : SVT (Mobilisation des ressources en eau pour EA), PCT (LV1 pour A et Economie pour B), Hist-Géo (Assainissement pour EA)."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "EA"
    ],
    "matieres": [
      "SVT (Mobilisation des ressources en eau pour EA)",
      "PCT (LV1 pour A et Economie pour B)",
      "Hist-Géo (Assainissement pour EA)"
    ]
  },
  {
    "id": "uac-igate-gestion-du-cadre-de-vie",
    "name": "Gestion du cadre de vie",
    "description": "Le programme en Gestion du cadre de vie à l'établissement IGATE prépare les étudiants aux carrières de : Aménagement, reboisement, sauvegarde environnemental et social, Gestion et restauration de l'environnement.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Aménagement, reboisement, sauvegarde environnemental et social",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Gestion et restauration de l'environnement",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion du cadre de vie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion du cadre de vie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths (LV1 pour A et Economie pour B), Français, Hist-Géo."
      }
    ],
    "bourse": 56,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Maths (LV1 pour A et Economie pour B)",
      "Français",
      "Hist-Géo"
    ]
  },
  {
    "id": "uac-igate-gestion-des-changements-climatiques-et-d",
    "name": "Gestion des changements climatiques et des écosystèmes",
    "description": "Le programme en Gestion des changements climatiques et des écosystèmes à l'établissement IGATE prépare les étudiants aux carrières de : Changement Climatique, Aménagement et Gestion des Ressources Naturelles.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, EA)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Changement Climatique",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Aménagement et Gestion des Ressources Naturelles",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion des changements climatiques et des écosystèmes.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion des changements climatiques et des écosystèmes."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, EA."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, Hist-Géo (Mobilisation des ressources en eau pour EA)."
      }
    ],
    "bourse": 9,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "EA"
    ],
    "matieres": [
      "Maths",
      "Français",
      "Hist-Géo (Mobilisation des ressources en eau pour EA)"
    ]
  },
  {
    "id": "uac-igate-g-omatique-et-environnement",
    "name": "Géomatique et Environnement",
    "description": "Le programme en Géomatique et Environnement à l'établissement IGATE prépare les étudiants aux carrières de : Spécialiste en géomantique.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Spécialiste en géomantique",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Géomatique et Environnement.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Géomatique et Environnement."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, Hist-Géo."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "Français",
      "Hist-Géo"
    ]
  },
  {
    "id": "uac-igate-planification-et-gestion-des-espaces-urb",
    "name": "Planification et Gestion des espaces urbains et ruraux",
    "description": "Le programme en Planification et Gestion des espaces urbains et ruraux à l'établissement IGATE prépare les étudiants aux carrières de : Spécialiste en planification et gestion des espaces urbains.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Spécialiste en planification et gestion des espaces urbains",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Planification et Gestion des espaces urbains et ruraux.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Planification et Gestion des espaces urbains et ruraux."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths (LV1 pour A et Economie pour B), Français, Hist-Géo."
      }
    ],
    "bourse": 32,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Maths (LV1 pour A et Economie pour B)",
      "Français",
      "Hist-Géo"
    ]
  },
  {
    "id": "uac-inmes-sciences-infirmi-res",
    "name": "Sciences Infirmières",
    "description": "Le programme en Sciences Infirmières à l'établissement INMeS prépare les étudiants aux carrières de : Soins infirmiers dans les hôpitaux et centres de santé.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Soins infirmiers dans les hôpitaux et centres de santé",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences Infirmières.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences Infirmières."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 35,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-inmes-sciences-obst-tricales",
    "name": "Sciences Obstétricales",
    "description": "Le programme en Sciences Obstétricales à l'établissement INMeS prépare les étudiants aux carrières de : Soins obstétricaux dans les hôpitaux et centres de santé.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Soins obstétricaux dans les hôpitaux et centres de santé",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences Obstétricales.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences Obstétricales."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 41,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-ine-hydrologie-quantitative-et-gestion-int-gr-",
    "name": "Hydrologie quantitative et Gestion intégrée des Ressources",
    "description": "Le programme en Hydrologie quantitative et Gestion intégrée des Ressources à l'établissement INE prépare les étudiants aux carrières de : Hydrologues, hydrogéologues, Chimistes des eaux, Analyse, contrôle de qualité.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Hydrologues, hydrogéologues",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Chimistes des eaux",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Analyse, contrôle de qualité",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Hydrologie quantitative et Gestion intégrée des Ressources.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Hydrologie quantitative et Gestion intégrée des Ressources."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 34,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-ine-hydrog-ologie-et-gestion-int-gr-e-des-ress",
    "name": "Hydrogéologie et Gestion intégrée des Ressources",
    "description": "Le programme en Hydrogéologie et Gestion intégrée des Ressources à l'établissement INE prépare les étudiants aux carrières de : Hydrogéologues, Hydrogéophysiciens.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Hydrogéologues",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Hydrogéophysiciens",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Hydrogéologie et Gestion intégrée des Ressources.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Hydrogéologie et Gestion intégrée des Ressources."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 20,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-ine-ecohydrologie-et-gestion-int-gr-e-des-ress",
    "name": "Ecohydrologie et Gestion intégrée des Ressources",
    "description": "Le programme en Ecohydrologie et Gestion intégrée des Ressources à l'établissement INE prépare les étudiants aux carrières de : Ecohydrologues, Contrôle de qualité hygiénique.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Ecohydrologues",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Contrôle de qualité hygiénique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Ecohydrologie et Gestion intégrée des Ressources.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Ecohydrologie et Gestion intégrée des Ressources."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-ine-gestion-des-crises-et-risques-li-s-l-eau-e",
    "name": "Gestion des crises et risques liés à l'eau et au climat",
    "description": "Le programme en Gestion des crises et risques liés à l'eau et au climat à l'établissement INE prépare les étudiants aux carrières de : Contrôleur des travaux d'assainissement de base, Action communautaire en génie sanitaire.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, EA, DEAT/AER)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Contrôleur des travaux d'assainissement de base",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Action communautaire en génie sanitaire",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion des crises et risques liés à l'eau et au climat.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion des crises et risques liés à l'eau et au climat."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, EA, DEAT/AER."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT (PE pour EA), Pour les DEAT/AER: toutes les trois matières écrites."
      }
    ],
    "bourse": 27,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "EA",
      "DEAT/AER"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT (PE pour EA)",
      "Pour les DEAT/AER: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-ine-g-nie-rural-et-ma-trise-de-l-eau",
    "name": "Génie rural et Maîtrise de l'Eau",
    "description": "Le programme en Génie rural et Maîtrise de l'Eau à l'établissement INE prépare les étudiants aux carrières de : Contrôleur du Génie rural, Contrôleur des travaux d'aménagement hydro agricoles.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, EA, DEAT/AER)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Contrôleur du Génie rural",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Contrôleur des travaux d'aménagement hydro agricoles",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie rural et Maîtrise de l'Eau.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie rural et Maîtrise de l'Eau."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, EA, DEAT/AER."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT (PE pour EA), Pour les DEAT/AER: toutes les trois matières écrites."
      }
    ],
    "bourse": 19,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "EA",
      "DEAT/AER"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT (PE pour EA)",
      "Pour les DEAT/AER: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-ine-hydraulique-et-assainissement",
    "name": "Hydraulique et Assainissement",
    "description": "Le programme en Hydraulique et Assainissement à l'établissement INE prépare les étudiants aux carrières de : Gestion des réseaux d'égouts, Technicien en assainissement, Distribution d'eau potable.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, EA)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Gestion des réseaux d'égouts",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Technicien en assainissement",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Distribution d'eau potable",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Hydraulique et Assainissement.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Hydraulique et Assainissement."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, EA."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT (PE pour EA)."
      }
    ],
    "bourse": 55,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "EA"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT (PE pour EA)"
    ]
  },
  {
    "id": "uac-ine-eau-hygi-ne-et-assainissement-eha-",
    "name": "Eau Hygiène et Assainissement (EHA)",
    "description": "Le programme en Eau Hygiène et Assainissement (EHA) à l'établissement INE prépare les étudiants aux carrières de : Technicien en eau et assainissement, Promoteur d'hygiène publique, Gestionnaire de réseaux d'eau ruraux.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, EA, DEAT/AER)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien en eau et assainissement",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Promoteur d'hygiène publique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Gestionnaire de réseaux d'eau ruraux",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Eau Hygiène et Assainissement (EHA).",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Eau Hygiène et Assainissement (EHA)."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, EA, DEAT/AER."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT (PE pour EA), Pour les DEAT/AER: toutes les trois matières écrites."
      }
    ],
    "bourse": 54,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "EA",
      "DEAT/AER"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT (PE pour EA)",
      "Pour les DEAT/AER: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-eneam-administration-des-r-seaux-informatiques",
    "name": "Administration des Réseaux informatiques",
    "description": "Le programme en Administration des Réseaux informatiques à l'établissement ENEAM prépare les étudiants aux carrières de : Technicien en réseaux informatiques, Technicien en maintenance informatique, Développeur d'applications.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DT/IMI)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien en réseaux informatiques",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Technicien en maintenance informatique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Développeur d'applications",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Administration des Réseaux informatiques.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Administration des Réseaux informatiques."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DT/IMI."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, Anglais, Pour DT/IMI: Maths appliquées, Français, Technologie des systèmes informatiques."
      }
    ],
    "bourse": 50,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DT/IMI"
    ],
    "matieres": [
      "Maths",
      "Français",
      "Anglais",
      "Pour DT/IMI: Maths appliquées, Français, Technologie des systèmes informatiques"
    ]
  },
  {
    "id": "uac-eneam-analyse-informatique-et-programmation",
    "name": "Analyse Informatique et Programmation",
    "description": "Le programme en Analyse Informatique et Programmation à l'établissement ENEAM prépare les étudiants aux carrières de : Analyste programmeur, Développeur de logiciels, Administrateur de bases de données.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DT/IMI)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Analyste programmeur",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Développeur de logiciels",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Administrateur de bases de données",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Analyse Informatique et Programmation.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Analyse Informatique et Programmation."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DT/IMI."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, Anglais."
      }
    ],
    "bourse": 34,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DT/IMI"
    ],
    "matieres": [
      "Maths",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-assurance",
    "name": "Assurance",
    "description": "Le programme en Assurance à l'établissement ENEAM prépare les étudiants aux carrières de : Chargés de clientèle, Conseillers en négoce, Gestionnaire de patrimoine.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Chargés de clientèle",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Conseillers en négoce",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Gestionnaire de patrimoine",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Assurance.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Assurance."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths ou Etude de Cas (G), Français, Anglais."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths ou Etude de Cas (G)",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-banque-et-finance-de-march-",
    "name": "Banque et Finance de Marché",
    "description": "Le programme en Banque et Finance de Marché à l'établissement ENEAM prépare les étudiants aux carrières de : Conseiller financier, Analyste de crédit, Opérateur de marché junior.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Conseiller financier",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Analyste de crédit",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Opérateur de marché junior",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Banque et Finance de Marché.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Banque et Finance de Marché."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths ou Etude de Cas (G), Français, Anglais."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths ou Etude de Cas (G)",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-banque-et-institutions-des-micro-finance",
    "name": "Banque et Institutions des Micro finances",
    "description": "Le programme en Banque et Institutions des Micro finances à l'établissement ENEAM prépare les étudiants aux carrières de : Gestionnaire de portefeuille de microfinance, Agent de crédit, Responsable d'agence locale.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Gestionnaire de portefeuille de microfinance",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Agent de crédit",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Responsable d'agence locale",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Banque et Institutions des Micro finances.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Banque et Institutions des Micro finances."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths ou Etude de Cas (G), Français, Anglais."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths ou Etude de Cas (G)",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-marketing",
    "name": "Marketing",
    "description": "Le programme en Marketing à l'établissement ENEAM prépare les étudiants aux carrières de : Chef de produit, Community manager, Responsable marketing digital.",
    "duration": "3 ans",
    "level": "Niveau Bac (B, C, D, G2, G3, DT/CoM)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Chef de produit",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Community manager",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Responsable marketing digital",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Digital planner",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Marketing.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Marketing."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : B, C, D, G2, G3, DT/CoM."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Economie (B)/Maths (C-D)/Etude de Cas (G), Français, Anglais (LV pour B)."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "B",
      "C",
      "D",
      "G2",
      "G3",
      "DT/CoM"
    ],
    "matieres": [
      "Economie (B)/Maths (C-D)/Etude de Cas (G)",
      "Français",
      "Anglais (LV pour B)"
    ]
  },
  {
    "id": "uac-eneam-gestion-des-ressources-humaines",
    "name": "Gestion des Ressources Humaines",
    "description": "Le programme en Gestion des Ressources Humaines à l'établissement ENEAM prépare les étudiants aux carrières de : Gestion du personnel et des ressources humaines dans les entreprises.",
    "duration": "3 ans",
    "level": "Niveau Bac (B, C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Gestion du personnel et des ressources humaines dans les entreprises",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion des Ressources Humaines.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion des Ressources Humaines."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : B, C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Economie (B)/Maths (C-D)/Etude de Cas (G), Français, Anglais (LV1 pour B)."
      }
    ],
    "bourse": 4,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "B",
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Economie (B)/Maths (C-D)/Etude de Cas (G)",
      "Français",
      "Anglais (LV1 pour B)"
    ]
  },
  {
    "id": "uac-eneam-gestion-des-transports",
    "name": "Gestion des Transports",
    "description": "Le programme en Gestion des Transports à l'établissement ENEAM prépare les étudiants aux carrières de : Entreprises maritimes, Logistiques, administrations, Agences de voyage.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Entreprises maritimes",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Logistiques, administrations",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Agences de voyage",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion des Transports.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion des Transports."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths ou Etude de Cas (G), Français, Anglais."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths ou Etude de Cas (G)",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-gestion-de-logistique",
    "name": "Gestion de Logistique",
    "description": "Le programme en Gestion de Logistique à l'établissement ENEAM prépare les étudiants aux carrières de : Responsable d'entrepôt, Gestionnaire de stocks, Coordonnateur logistique.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Responsable d'entrepôt",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Gestionnaire de stocks",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Coordonnateur logistique",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion de Logistique.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion de Logistique."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths ou Etude de Cas (G), Français, Anglais."
      }
    ],
    "bourse": 11,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths ou Etude de Cas (G)",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-statistique-economique-et-sectorielle",
    "name": "Statistique Economique et Sectorielle",
    "description": "Le programme en Statistique Economique et Sectorielle à l'établissement ENEAM prépare les étudiants aux carrières de : Statisticien, Cabinets d'études et de conseils.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Statisticien",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Cabinets d'études et de conseils",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Statistique Economique et Sectorielle.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Statistique Economique et Sectorielle."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Maths."
      }
    ],
    "bourse": 22,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Maths"
    ]
  },
  {
    "id": "uac-eneam-statistique-d-mographique-et-sociale",
    "name": "Statistique Démographique et Sociale",
    "description": "Le programme en Statistique Démographique et Sociale à l'établissement ENEAM prépare les étudiants aux carrières de : Démographe, Analyste de données sociales, Enquêteur de recensement.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Démographe",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Analyste de données sociales",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Enquêteur de recensement",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Statistique Démographique et Sociale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Statistique Démographique et Sociale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Maths."
      }
    ],
    "bourse": 31,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Maths"
    ]
  },
  {
    "id": "uac-eneam-planification-et-gestion-des-projets",
    "name": "Planification et Gestion des Projets",
    "description": "Le programme en Planification et Gestion des Projets à l'établissement ENEAM prépare les étudiants aux carrières de : Planificateur, Gestionnaire de projets, Cabinets d'études et conseils.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Planificateur",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Gestionnaire de projets",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Cabinets d'études et conseils",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Planification et Gestion des Projets.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Planification et Gestion des Projets."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, Anglais."
      }
    ],
    "bourse": 23,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-planification-et-economie-du-d-veloppeme",
    "name": "Planification et Economie du Développement Durable",
    "description": "Le programme en Planification et Economie du Développement Durable à l'établissement ENEAM prépare les étudiants aux carrières de : Conseiller en développement durable, Chargé d'études d'impact socio-économique.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Conseiller en développement durable",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Chargé d'études d'impact socio-économique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Planification et Economie du Développement Durable.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Planification et Economie du Développement Durable."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, Anglais."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-d-veloppement-local-et-r-gional",
    "name": "Développement Local et Régional",
    "description": "Le programme en Développement Local et Régional à l'établissement ENEAM prépare les étudiants aux carrières de : Agent de développement local, Conseiller en planification communale.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Agent de développement local",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Conseiller en planification communale",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Développement Local et Régional.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Développement Local et Régional."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, Anglais."
      }
    ],
    "bourse": 5,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-eneam-gestion-financi-re-et-comptable",
    "name": "Gestion Financière et Comptable",
    "description": "Le programme en Gestion Financière et Comptable à l'établissement ENEAM prépare les étudiants aux carrières de : Comptable, Responsable financier, Auditeur financier.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, G2)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Comptable",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Responsable financier",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Auditeur financier",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Auditeur interne",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion Financière et Comptable.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion Financière et Comptable."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, G2."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths (Etude de cas pour les G2), Français, Anglais."
      }
    ],
    "bourse": 20,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "G2"
    ],
    "matieres": [
      "Maths (Etude de cas pour les G2)",
      "Français",
      "Anglais"
    ]
  },
  {
    "id": "uac-ine-gestion-du-patrimoine-culturel",
    "name": "Gestion du patrimoine culturel",
    "description": "Le programme en Gestion du patrimoine culturel à l'établissement EPA prépare les étudiants aux carrières de : Droit du patrimoine, Patrimoniteurs, Gestionnaires de musées.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G1, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Droit du patrimoine",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Patrimoniteurs",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Gestionnaires de musées",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Communicateurs culturels",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion du patrimoine culturel.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion du patrimoine culturel."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G1, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Hist-Géo (Etude de cas pour les G), Français, Anglais (LV1 pour les A et B), Pour DT/Tourisme: Anglais, Mercatique du tourisme, Législation du tourisme."
      }
    ],
    "bourse": 33,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G1",
      "G2",
      "G3"
    ],
    "matieres": [
      "Hist-Géo (Etude de cas pour les G)",
      "Français",
      "Anglais (LV1 pour les A et B)",
      "Pour DT/Tourisme: Anglais, Mercatique du tourisme, Législation du tourisme"
    ]
  },
  {
    "id": "uac-ine-g-ographie-et-am-nagement-du-territoire",
    "name": "Géographie et Aménagement du Territoire",
    "description": "Le programme en Géographie et Aménagement du Territoire à l'établissement FASHS Calavi prépare les étudiants aux carrières de : Enseignants, Laboratoires et institutions de recherche, Responsables d'assainissement.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, DEAT (toutes spécialités))",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignants",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Laboratoires et institutions de recherche",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Responsables d'assainissement",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Géographie et Aménagement du Territoire.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Géographie et Aménagement du Territoire."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, DEAT (toutes spécialités)."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Anglais (LV1), Maths, Hist-Géo, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 82,
    "aide_fpp": 667,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DEAT (toutes spécialités)"
    ],
    "matieres": [
      "Anglais (LV1)",
      "Maths",
      "Hist-Géo",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-ine-psychologie",
    "name": "Psychologie",
    "description": "Le programme en Psychologie à l'établissement FASHS Calavi prépare les étudiants aux carrières de : Psychologue scolaire, Conseiller en orientation, Assistant RH.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Psychologue scolaire",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Conseiller en orientation",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Assistant RH",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Psychologie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Psychologie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Français, SVT."
      }
    ],
    "bourse": 44,
    "aide_fpp": 252,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "D"
    ],
    "matieres": [
      "Maths",
      "Français",
      "SVT"
    ]
  },
  {
    "id": "uac-ine-sciences-de-l-education-et-de-la-formation",
    "name": "Sciences de l'Education et de la Formation",
    "description": "Le programme en Sciences de l'Education et de la Formation à l'établissement FASHS Calavi prépare les étudiants aux carrières de : Formation des enseignants, Centres d'accueil et de formation des sourds et muets, amblyopes et non-voyants.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, C, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Formation des enseignants",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Centres d'accueil et de formation des sourds et muets, amblyopes et non-voyants",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences de l'Education et de la Formation.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences de l'Education et de la Formation."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Philo (A) ou SVT (C,D)."
      }
    ],
    "bourse": 52,
    "aide_fpp": 189,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Philo (A) ou SVT (C,D)"
    ]
  },
  {
    "id": "uac-ine-philosophie",
    "name": "Philosophie",
    "description": "Le programme en Philosophie à l'établissement FASHS Calavi prépare les étudiants aux carrières de : Enseignants dans les collèges et lycées, Chargé de relations publiques, Conseiller en éthique.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignants dans les collèges et lycées",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Chargé de relations publiques",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Conseiller en éthique",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Philosophie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Philosophie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1 pour A), Philo."
      }
    ],
    "bourse": 37,
    "aide_fpp": 176,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1 pour A)",
      "Philo"
    ]
  },
  {
    "id": "uac-ine-socio-anthropologie",
    "name": "Socio-Anthropologie",
    "description": "Le programme en Socio-Anthropologie à l'établissement FASHS Calavi prépare les étudiants aux carrières de : Centres sociaux, Ministères, Recherche.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G1, G2, G3)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Centres sociaux",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Ministères",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Recherche",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Socio-Anthropologie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Socio-Anthropologie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G1, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Philo (Droit Admin et du Travail pour les G1, Maths pour G2-G3), Hist-Géo (Anglais pour les G)."
      }
    ],
    "bourse": 36,
    "aide_fpp": 649,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G1",
      "G2",
      "G3"
    ],
    "matieres": [
      "Français",
      "Philo (Droit Admin et du Travail pour les G1, Maths pour G2-G3)",
      "Hist-Géo (Anglais pour les G)"
    ]
  },
  {
    "id": "uac-ine-histoire-et-arch-ologie",
    "name": "Histoire et Archéologie",
    "description": "Le programme en Histoire et Archéologie à l'établissement FASHS Calavi prépare les étudiants aux carrières de : Enseignement, Conservateur de musée, Recherche documentaire.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Conservateur de musée",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Recherche documentaire",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Gestionnaire du patrimoine culturel",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Histoire et Archéologie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Histoire et Archéologie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Hist-Géo, Anglais (LV1 pour A et B)."
      }
    ],
    "bourse": 69,
    "aide_fpp": 151,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Hist-Géo",
      "Anglais (LV1 pour A et B)"
    ]
  },
  {
    "id": "uac-ine-psychologie-du-travail-et-des-organisation",
    "name": "Psychologie du travail et des Organisations",
    "description": "Le programme en Psychologie du travail et des Organisations à l'établissement FASHS Calavi prépare les étudiants aux carrières de : Psychologue du travail et des Organisations dans les Sociétés, Responsable du recrutement, Consultant en bien-être au travail.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Psychologue du travail et des Organisations dans les Sociétés",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Responsable du recrutement",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Consultant en bien-être au travail",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Psychologie du travail et des Organisations.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Psychologie du travail et des Organisations."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, SVT, Anglais (LV1 pour A et B)."
      }
    ],
    "bourse": 29,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "SVT",
      "Anglais (LV1 pour A et B)"
    ]
  },
  {
    "id": "uac-enstic-journalisme",
    "name": "Journalisme",
    "description": "Le programme en Journalisme à l'établissement ENSTIC prépare les étudiants aux carrières de : Journaliste (Presse écrite, en ligne, Radio, Télévision), Chargé de relations presse, Gestionnaire d'entreprise/agence de presse.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G1, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Journaliste (Presse écrite, en ligne, Radio, Télévision)",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Chargé de relations presse",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Gestionnaire d'entreprise/agence de presse",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Journalisme.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Journalisme."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G1, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Hist-Géo."
      }
    ],
    "bourse": 16,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G1",
      "G2",
      "G3"
    ],
    "matieres": [
      "Culture générale",
      "Hist-Géo"
    ]
  },
  {
    "id": "uac-enstic-m-tiers-de-l-audiovisuel-et-du-multim-d",
    "name": "Métiers de l'Audiovisuel et du Multimédia",
    "description": "Le programme en Métiers de l'Audiovisuel et du Multimédia à l'établissement ENSTIC prépare les étudiants aux carrières de : Community manager, Producteur audio-visuel, Graphiste-monteur.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G1, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Community manager",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Producteur audio-visuel",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Graphiste-monteur",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Réalisateur",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Métiers de l'Audiovisuel et du Multimédia.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Métiers de l'Audiovisuel et du Multimédia."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G1, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Hist-Géo."
      }
    ],
    "bourse": 20,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G1",
      "G2",
      "G3"
    ],
    "matieres": [
      "Culture générale",
      "Hist-Géo"
    ]
  },
  {
    "id": "uac-enam-administration-g-n-rale",
    "name": "Administration Générale",
    "description": "Le programme en Administration Générale à l'établissement Ecole Nationale d'Administration et de Magistrature ENAM prépare les étudiants aux carrières de : Attaché des affaires étrangères, Attaché des services administratifs, Inspecteur du Travail et de la Sécurité Sociale.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G1, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Attaché des affaires étrangères",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Attaché des services administratifs",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Inspecteur du Travail et de la Sécurité Sociale",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Administration Générale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Administration Générale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G1, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français (A-B-C-D) ou Étude de cas (G1-G2-G3), Hist-Géo (A-B-C-D) ou Français (G1-G2-G3), Philo (A-B-C-D) ou Économie (G1-G2-G3)."
      }
    ],
    "bourse": 70,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G1",
      "G2",
      "G3"
    ],
    "matieres": [
      "Français (A-B-C-D) ou Étude de cas (G1-G2-G3)",
      "Hist-Géo (A-B-C-D) ou Français (G1-G2-G3)",
      "Philo (A-B-C-D) ou Économie (G1-G2-G3)"
    ]
  },
  {
    "id": "uac-enam-administration-des-finances",
    "name": "Administration des Finances",
    "description": "Le programme en Administration des Finances à l'établissement Ecole Nationale d'Administration et de Magistrature ENAM prépare les étudiants aux carrières de : Attaché des services financiers, Inspecteur des Impôts, Personne responsable des Marchés publics.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Attaché des services financiers",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Inspecteur des Impôts",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Personne responsable des Marchés publics",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Administration des Finances.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Administration des Finances."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths (C-D) ou Etude de cas (G2-G3), Français (C-D-G2-G3), Économie (G2-G3) ou Hist-Géo (C-D)."
      }
    ],
    "bourse": 69,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths (C-D) ou Etude de cas (G2-G3)",
      "Français (C-D-G2-G3)",
      "Économie (G2-G3) ou Hist-Géo (C-D)"
    ]
  },
  {
    "id": "uac-enam-secr-tariat-de-gestion",
    "name": "Secrétariat de Gestion",
    "description": "Le programme en Secrétariat de Gestion à l'établissement Ecole Nationale d'Administration et de Magistrature ENAM prépare les étudiants aux carrières de : Attaché des services administratifs (Secrétariat et assistant de Gestion), Secrétaire de direction, Assistant administratif.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, G1, G2, G3, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Attaché des services administratifs (Secrétariat et assistant de Gestion)",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Secrétaire de direction",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Assistant administratif",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Secrétariat de Gestion.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Secrétariat de Gestion."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, G1, G2, G3, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Anglais (LV1 pour A et B), Français, Hist-Géo (A-C-D) ou Économie (B) ou Etude de cas (G1-G2-G3)."
      }
    ],
    "bourse": 40,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "G1",
      "G2",
      "G3",
      "C",
      "D"
    ],
    "matieres": [
      "Anglais (LV1 pour A et B)",
      "Français",
      "Hist-Géo (A-C-D) ou Économie (B) ou Etude de cas (G1-G2-G3)"
    ]
  },
  {
    "id": "uac-enam-sciences-et-techniques-de-l-information-d",
    "name": "Sciences et Techniques de l'Information documentaire",
    "description": "Le programme en Sciences et Techniques de l'Information documentaire à l'établissement Ecole Nationale d'Administration et de Magistrature ENAM prépare les étudiants aux carrières de : Technicien supérieur en archivistique, Technicien supérieur - Documentariste.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, G1, G2, G3, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur en archivistique",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Technicien supérieur - Documentariste",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences et Techniques de l'Information documentaire.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences et Techniques de l'Information documentaire."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, G1, G2, G3, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Anglais (LV1 pour A et B), Français, Hist-Géo (A-C-D) ou Économie (pour B et G)."
      }
    ],
    "bourse": 38,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "G1",
      "G2",
      "G3",
      "C",
      "D"
    ],
    "matieres": [
      "Anglais (LV1 pour A et B)",
      "Français",
      "Hist-Géo (A-C-D) ou Économie (pour B et G)"
    ]
  },
  {
    "id": "uac-ifri-g-nie-logiciel",
    "name": "Génie Logiciel",
    "description": "Le programme en Génie Logiciel à l'établissement IFRI prépare les étudiants aux carrières de : Analystes et concepteurs, Architectes logiciels, Administrateurs de bases de données.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, DT/IMI, DT/DWM)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Analystes et concepteurs",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Architectes logiciels",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Administrateurs de bases de données",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Développeurs d'applications métiers",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie Logiciel.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie Logiciel."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, DT/IMI, DT/DWM."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Anglais ou Etude de Fabrication (E), Français, Pour les DT: Maths appliquées, Français, Technologie des systèmes informatiques (DT/IMI) ou Sites et Applications Web (DT/DWM)."
      }
    ],
    "bourse": 17,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "DT/IMI",
      "DT/DWM"
    ],
    "matieres": [
      "Maths",
      "Anglais ou Etude de Fabrication (E)",
      "Français",
      "Pour les DT: Maths appliquées, Français, Technologie des systèmes informatiques (DT/IMI) ou Sites et Applications Web (DT/DWM)"
    ]
  },
  {
    "id": "uac-ifri-internet-et-multim-dia",
    "name": "Internet et Multimédia",
    "description": "Le programme en Internet et Multimédia à l'établissement IFRI prépare les étudiants aux carrières de : Concepteurs d'applications mobiles, Designers, Monteurs vidéo et multimédia.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, DT/IMI, DT/DWM, DT/PM)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Concepteurs d'applications mobiles",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Designers",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Monteurs vidéo et multimédia",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Techniciens de web TV et web Radio",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Internet et Multimédia.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Internet et Multimédia."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, DT/IMI, DT/DWM, DT/PM."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Anglais ou Etude de Fabrication (E), Français."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "DT/IMI",
      "DT/DWM",
      "DT/PM"
    ],
    "matieres": [
      "Maths",
      "Anglais ou Etude de Fabrication (E)",
      "Français"
    ]
  },
  {
    "id": "uac-ifri-intelligence-artificielle-ia-",
    "name": "Intelligence artificielle (IA)",
    "description": "Le programme en Intelligence artificielle (IA) à l'établissement IFRI prépare les étudiants aux carrières de : Développeurs des solutions intelligentes, Analystes des données décisionnelles, Architecte des données massives.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Développeurs des solutions intelligentes",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Analystes des données décisionnelles",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Architecte des données massives",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Intelligence artificielle (IA).",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Intelligence artificielle (IA)."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Anglais ou Etude de Fabrication (E), Français."
      }
    ],
    "bourse": 19,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E"
    ],
    "matieres": [
      "Maths",
      "Anglais ou Etude de Fabrication (E)",
      "Français"
    ]
  },
  {
    "id": "uac-ifri-syst-mes-embarqu-s-et-internet-des-objets",
    "name": "Systèmes embarqués et Internet des Objets (SEIoT)",
    "description": "Le programme en Systèmes embarqués et Internet des Objets (SEIoT) à l'établissement IFRI prépare les étudiants aux carrières de : Concepteurs de solutions embarquées, Développeurs de solutions domotiques, Concepteurs de solutions électroniques.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, DT/IMI, DT/EAP)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Concepteurs de solutions embarquées",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Développeurs de solutions domotiques",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Concepteurs de solutions électroniques",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Systèmes embarqués et Internet des Objets (SEIoT).",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Systèmes embarqués et Internet des Objets (SEIoT)."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, DT/IMI, DT/EAP."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Anglais ou Etude de Fabrication (E), Français."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "DT/IMI",
      "DT/EAP"
    ],
    "matieres": [
      "Anglais ou Etude de Fabrication (E)",
      "Français"
    ]
  },
  {
    "id": "uac-ifri-s-curit-informatique",
    "name": "Sécurité Informatique",
    "description": "Le programme en Sécurité Informatique à l'établissement IFRI prépare les étudiants aux carrières de : Réseaux et systèmes informatiques, Sécurité informatique, Contrôle systèmes d'information.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, DT/IMI)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Réseaux et systèmes informatiques",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Sécurité informatique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Contrôle systèmes d'information",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sécurité Informatique.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sécurité Informatique."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, DT/IMI."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Anglais ou Etude de Fabrication (E), Français."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "DT/IMI"
    ],
    "matieres": [
      "Maths",
      "Anglais ou Etude de Fabrication (E)",
      "Français"
    ]
  },
  {
    "id": "uac-fsa-sciences-et-techniques-de-production-v-g-t",
    "name": "Sciences et Techniques de Production Végétale",
    "description": "Le programme en Sciences et Techniques de Production Végétale à l'établissement FSA prépare les étudiants aux carrières de : Entrepreneur agricole, Contrôle de qualité des cultures, Technicien en gestion et conservation.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/PV)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Entrepreneur agricole",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Contrôle de qualité des cultures",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Technicien en gestion et conservation",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences et Techniques de Production Végétale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences et Techniques de Production Végétale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/PV."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/PV"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-fsa-sciences-et-techniques-de-production-anima",
    "name": "Sciences et Techniques de Production Animale",
    "description": "Le programme en Sciences et Techniques de Production Animale à l'établissement FSA prépare les étudiants aux carrières de : Technicien en gestion et conduite des élevages, Technicien de laboratoire, Technicien en Zootechnie.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/PA)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien en gestion et conduite des élevages",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Technicien de laboratoire",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Technicien en Zootechnie",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences et Techniques de Production Animale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences et Techniques de Production Animale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/PA."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/PA"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-fsa-am-nagement-et-gestion-des-for-ts-et-parco",
    "name": "Aménagement et Gestion des Forêts et Parcours Naturels",
    "description": "Le programme en Aménagement et Gestion des Forêts et Parcours Naturels à l'établissement FSA prépare les étudiants aux carrières de : Gestionnaire des forêts et parcours naturels, Gestion des travaux d'inventaire forestier, Gestion des plans d'aménagement des forêts.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Foresterie)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Gestionnaire des forêts et parcours naturels",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Gestion des travaux d'inventaire forestier",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Gestion des plans d'aménagement des forêts",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Aménagement et Gestion des Forêts et Parcours Naturels.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Aménagement et Gestion des Forêts et Parcours Naturels."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Foresterie."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 20,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Foresterie"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-fsa-g-nie-rural-m-canisation-agricole-p-che-et",
    "name": "Génie Rural, Mécanisation Agricole, Pêche et Aquaculture",
    "description": "Le programme en Génie Rural, Mécanisation Agricole, Pêche et Aquaculture à l'établissement FSA prépare les étudiants aux carrières de : Périmètres irrigués, Assainissement agricole, Mécanisation agricole.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Pêche et aquaculture, DEAT/Aménagement et équipement rural)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Périmètres irrigués",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Assainissement agricole",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Mécanisation agricole",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Aménagement des pêches en Aquaculture",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Concepteur des fermes piscicoles",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie Rural, Mécanisation Agricole, Pêche et Aquaculture.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie Rural, Mécanisation Agricole, Pêche et Aquaculture."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Pêche et aquaculture, DEAT/Aménagement et équipement rural."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 35,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Pêche et aquaculture",
      "DEAT/Aménagement et équipement rural"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-fsa-nutrition-et-technologie-alimentaires",
    "name": "Nutrition et Technologie Alimentaires",
    "description": "Le programme en Nutrition et Technologie Alimentaires à l'établissement FSA prépare les étudiants aux carrières de : Technique de diététique, Nutrition dans les hôpitaux, centres de santé et industries agroalimentaires.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Nutrition et technologie alimentaire)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technique de diététique",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Nutrition dans les hôpitaux, centres de santé et industries agroalimentaires",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Nutrition et Technologie Alimentaires.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Nutrition et Technologie Alimentaires."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Nutrition et technologie alimentaire."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 17,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Nutrition et technologie alimentaire"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-fsa-agro-conomie-sociologie-et-vulgarisation-r",
    "name": "Agroéconomie, Sociologie et Vulgarisation Rurales",
    "description": "Le programme en Agroéconomie, Sociologie et Vulgarisation Rurales à l'établissement FSA prépare les étudiants aux carrières de : Entreprise et ferme agricole, Structures de recherches et vulgarisation, Enseignant des Lycées agricoles.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Entreprise et ferme agricole",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Structures de recherches et vulgarisation",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Enseignant des Lycées agricoles",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Agroéconomie, Sociologie et Vulgarisation Rurales.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Agroéconomie, Sociologie et Vulgarisation Rurales."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-fsa-entreprenariat-agricole",
    "name": "Entreprenariat Agricole",
    "description": "Le programme en Entreprenariat Agricole à l'établissement FSA prépare les étudiants aux carrières de : Gestionnaire de ferme.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Gestionnaire de ferme",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Entreprenariat Agricole.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Entreprenariat Agricole."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-fss-m-decine-g-n-rale",
    "name": "Médecine Générale",
    "description": "Le programme en Médecine Générale à l'établissement FSS prépare les étudiants aux carrières de : Médecin généraliste, Possibilités de spécialisations dans un domaine spécifique en sciences de la santé.",
    "duration": "6 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "360 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Médecin généraliste",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Possibilités de spécialisations dans un domaine spécifique en sciences de la santé",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Médecine Générale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Médecine Générale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 150,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-fss-pharmacie",
    "name": "Pharmacie",
    "description": "Le programme en Pharmacie à l'établissement FSS prépare les étudiants aux carrières de : Pharmacien, Spécialisations en sciences de la santé, option pharmacie.",
    "duration": "5 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "300 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Pharmacien",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Spécialisations en sciences de la santé, option pharmacie",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Pharmacie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Pharmacie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 16,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-fss-kin-sith-rapie",
    "name": "Kinésithérapie",
    "description": "Le programme en Kinésithérapie à l'établissement FSS prépare les étudiants aux carrières de : Kinésithérapie, Spécialisations en sciences de la santé, option kinésithérapie.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Kinésithérapie",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Spécialisations en sciences de la santé, option kinésithérapie",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Kinésithérapie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Kinésithérapie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : PCT, SVT, Maths."
      }
    ],
    "bourse": 15,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "PCT",
      "SVT",
      "Maths"
    ]
  },
  {
    "id": "uac-fss-assistance-sociale",
    "name": "Assistance sociale",
    "description": "Le programme en Assistance sociale à l'établissement FSS prépare les étudiants aux carrières de : Technicien supérieur de l'action sociale.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur de l'action sociale",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Assistance sociale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Assistance sociale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Philo, Hist-Géo, SVT."
      }
    ],
    "bourse": 10,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "D"
    ],
    "matieres": [
      "Philo",
      "Hist-Géo",
      "SVT"
    ]
  },
  {
    "id": "uac-fss-nutrition-et-di-t-tique",
    "name": "Nutrition et Diététique",
    "description": "Le programme en Nutrition et Diététique à l'établissement FSS prépare les étudiants aux carrières de : Nutrition clinique dans les hôpitaux et formations sanitaires, Programme de nutrition, Consultant en nutrition et diététique.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Nutrition clinique dans les hôpitaux et formations sanitaires",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Programme de nutrition",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Consultant en nutrition et diététique",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Nutrition et Diététique.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Nutrition et Diététique."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 10,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-fss-analyse-biom-dicale",
    "name": "Analyse Biomédicale",
    "description": "Le programme en Analyse Biomédicale à l'établissement FSS prépare les étudiants aux carrières de : Technicien de laboratoire des centres de santé, Assistant de recherche.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien de laboratoire des centres de santé",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Assistant de recherche",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Analyse Biomédicale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Analyse Biomédicale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 15,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-epa-g-nie-de-technologie-alimentaire",
    "name": "Génie de Technologie Alimentaire",
    "description": "Le programme en Génie de Technologie Alimentaire à l'établissement EPAC prépare les étudiants aux carrières de : Industries alimentaires, Industrie de fabrication de farines infantiles (UBETA), Audit et conseil en agroalimentaire.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Nutrition et Technologie Alimentaire)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Industries alimentaires",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Industrie de fabrication de farines infantiles (UBETA)",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Audit et conseil en agroalimentaire",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie de Technologie Alimentaire.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie de Technologie Alimentaire."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Nutrition et Technologie Alimentaire."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 20,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Nutrition et Technologie Alimentaire"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-epa-production-et-sant-animales",
    "name": "Production et Santé animales",
    "description": "Le programme en Production et Santé animales à l'établissement EPAC prépare les étudiants aux carrières de : Cliniques et Pharmacie vétérinaires, Contrôle vétérinaire, Recherche en production et santé animales et halieutiques.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Production Animale)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Cliniques et Pharmacie vétérinaires",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Contrôle vétérinaire",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Recherche en production et santé animales et halieutiques",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Production et Santé animales.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Production et Santé animales."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Production Animale."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 37,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Production Animale"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-epa-g-nie-de-l-environnement",
    "name": "Génie de l'Environnement",
    "description": "Le programme en Génie de l'Environnement à l'établissement EPAC prépare les étudiants aux carrières de : Aménagement et protection de l'Environnement, Assainissement, Bureau d'études d'impact environnemental.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Forest, DEAT/PV)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Aménagement et protection de l'Environnement",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Assainissement",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Bureau d'études d'impact environnemental",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Cabinet QHSE",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie de l'Environnement.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie de l'Environnement."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Forest, DEAT/PV."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 28,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Forest",
      "DEAT/PV"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-epa-g-nie-d-imagerie-m-dicale-et-de-radiobiolo",
    "name": "Génie d'Imagerie médicale et de Radiobiologie",
    "description": "Le programme en Génie d'Imagerie médicale et de Radiobiologie à l'établissement EPAC prépare les étudiants aux carrières de : Radiologie et Echographie dans les centres hospitaliers, Recherche en radiobiologie.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Radiologie et Echographie dans les centres hospitaliers",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Recherche en radiobiologie",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie d'Imagerie médicale et de Radiobiologie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie d'Imagerie médicale et de Radiobiologie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, SVT."
      }
    ],
    "bourse": 16,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "SVT"
    ]
  },
  {
    "id": "uac-epa-g-nie-civil",
    "name": "Génie Civil",
    "description": "Le programme en Génie Civil à l'établissement EPAC prépare les étudiants aux carrières de : Chefs chantiers, Techniciens d'étude en entreprise, Conducteurs des travaux.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, F4, DT Bâtiments et Travaux publics)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Chefs chantiers",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens d'étude en entreprise",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Conducteurs des travaux",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Laboratoires",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie Civil.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie Civil."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, F4, DT Bâtiments et Travaux publics."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Anglais ou Français (E, F et DT/BTP)."
      }
    ],
    "bourse": 25,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F4",
      "DT Bâtiments et Travaux publics"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Anglais ou Français (E, F et DT/BTP)"
    ]
  },
  {
    "id": "uac-epa-machinisme-agricole",
    "name": "Machinisme Agricole",
    "description": "Le programme en Machinisme Agricole à l'établissement EPAC prépare les étudiants aux carrières de : Fabrication mécanique, Parcs machines, Contrôle qualité.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, F3, DEAT/AER)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Fabrication mécanique",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Parcs machines",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Contrôle qualité",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Maintenance des engins agricoles",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Mécanisation agricole",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Machinisme Agricole.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Machinisme Agricole."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, F3, DEAT/AER."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Anglais ou Français (E et F), Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 27,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F3",
      "DEAT/AER"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Anglais ou Français (E et F)",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-epa-g-nie-biom-dical-maintenance-biom-dicale-e",
    "name": "Génie Biomédical (Maintenance Biomédicale et Hospitalière)",
    "description": "Le programme en Génie Biomédical (Maintenance Biomédicale et Hospitalière) à l'établissement EPAC prépare les étudiants aux carrières de : Technicien de laboratoire des centres de santé, Maintenance hospitalière et contrôle des équipements médicaux et vétérinaires, Maintenance des équipements électroniques.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, F2, F3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien de laboratoire des centres de santé",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Maintenance hospitalière et contrôle des équipements médicaux et vétérinaires",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Maintenance des équipements électroniques",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génie Biomédical (Maintenance Biomédicale et Hospitalière).",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génie Biomédical (Maintenance Biomédicale et Hospitalière)."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, E, F2, F3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Anglais ou Français (E et F)."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F2",
      "F3"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Anglais ou Français (E et F)"
    ]
  },
  {
    "id": "uac-ceforp-dynamique-de-population-et-planificatio",
    "name": "Dynamique de Population et Planification Régionale",
    "description": "Le programme en Dynamique de Population et Planification Régionale à l'établissement CEFORP prépare les étudiants aux carrières de : Spécialiste en développement local, Spécialiste des questions de population, Technicien supérieur en planification.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Spécialiste en développement local",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Spécialiste des questions de population",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Technicien supérieur en planification",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Gestionnaire de base de données",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      },
      {
        "name": "Assistant en gestion et suivi de projets et programmes",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Dynamique de Population et Planification Régionale.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Dynamique de Population et Planification Régionale."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Hist-Géo, Anglais."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "Hist-Géo",
      "Anglais"
    ]
  },
  {
    "id": "uac-herci-n-goce-international",
    "name": "Négoce International",
    "description": "Le programme en Négoce International à l'établissement HERCI prépare les étudiants aux carrières de : Technicien en négoce international, Agent commercial import-export, Chef de zone import-export.",
    "duration": "3 ans",
    "level": "Niveau Bac (B, C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien en négoce international",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Agent commercial import-export",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Chef de zone import-export",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Négoce International.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Négoce International."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : B, C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Anglais, Economie (B)/Hist-Géo (C-D)/Etude de Cas (G2 et G3)."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "B",
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths",
      "Anglais",
      "Economie (B)/Hist-Géo (C-D)/Etude de Cas (G2 et G3)"
    ]
  },
  {
    "id": "uac-herci-gestion-des-relations-maritimes-internat",
    "name": "Gestion des Relations Maritimes Internationales",
    "description": "Le programme en Gestion des Relations Maritimes Internationales à l'établissement HERCI prépare les étudiants aux carrières de : Gestionnaire des relations maritimes internationales, Assistant responsable import-export.",
    "duration": "3 ans",
    "level": "Niveau Bac (B, C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Gestionnaire des relations maritimes internationales",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Assistant responsable import-export",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Gestion des Relations Maritimes Internationales.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Gestion des Relations Maritimes Internationales."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : B, C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Anglais, Economie (B)/Hist-Géo (C-D)/Etude de Cas (G2 et G3)."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "B",
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths",
      "Anglais",
      "Economie (B)/Hist-Géo (C-D)/Etude de Cas (G2 et G3)"
    ]
  },
  {
    "id": "uac-herci-commerce-international",
    "name": "Commerce International",
    "description": "Le programme en Commerce International à l'établissement HERCI prépare les étudiants aux carrières de : Technicien commercial, Chef de produits import-export, Acheteurs International.",
    "duration": "3 ans",
    "level": "Niveau Bac (B, C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien commercial",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Chef de produits import-export",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Acheteurs International",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Courtier international",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Commerce International.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Commerce International."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : B, C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, Anglais, Economie (B)/Hist-Géo (C-D)/Etude de Cas (G2 et G3)."
      }
    ],
    "bourse": 7,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "B",
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Maths",
      "Anglais",
      "Economie (B)/Hist-Géo (C-D)/Etude de Cas (G2 et G3)"
    ]
  },
  {
    "id": "uac-injeps-education-physique-et-sportive",
    "name": "Education Physique et Sportive",
    "description": "Le programme en Education Physique et Sportive à l'établissement Institut National de la Jeunesse de l'Education Physique et Sportive - INJEPS prépare les étudiants aux carrières de : Professeur (PA/PC) d'EPS, Master / Education Physique, Sport et Développement Humain.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur (PA/PC) d'EPS",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Master / Education Physique, Sport et Développement Humain",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Education Physique et Sportive.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Education Physique et Sportive."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, SVT, Pratique EPS."
      }
    ],
    "bourse": 40,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "SVT",
      "Pratique EPS"
    ]
  },
  {
    "id": "uac-injeps-entrainement-sportif",
    "name": "Entrainement Sportif",
    "description": "Le programme en Entrainement Sportif à l'établissement Institut National de la Jeunesse de l'Education Physique et Sportive - INJEPS prépare les étudiants aux carrières de : Certificat d'Aptitude au Professorat de Sport (CAPS), Entraîneur, Préparateur physique.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Certificat d'Aptitude au Professorat de Sport (CAPS)",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Entraîneur",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Préparateur physique",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Entrainement Sportif.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Entrainement Sportif."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, SVT, Pratique EPS."
      }
    ],
    "bourse": 15,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "SVT",
      "Pratique EPS"
    ]
  },
  {
    "id": "uac-injeps-d-veloppement-communautaire",
    "name": "Développement communautaire",
    "description": "Le programme en Développement communautaire à l'établissement Institut National de la Jeunesse de l'Education Physique et Sportive - INJEPS prépare les étudiants aux carrières de : Technicien Supérieur d'Action Socio-Educative, Administrateur en programmes et projets de développement, Chef de projets.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien Supérieur d'Action Socio-Educative",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Administrateur en programmes et projets de développement",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Chef de projets",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Développement communautaire.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Développement communautaire."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Philo."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Philo"
    ]
  },
  {
    "id": "uac-injeps-andragogie",
    "name": "Andragogie",
    "description": "Le programme en Andragogie à l'établissement Institut National de la Jeunesse de l'Education Physique et Sportive - INJEPS prépare les étudiants aux carrières de : Spécialiste en ingénierie de formation, Educateur et formateur d'adultes.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Spécialiste en ingénierie de formation",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Educateur et formateur d'adultes",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Andragogie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Andragogie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Philo."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Philo"
    ]
  },
  {
    "id": "uac-injeps-r-cr-ologie",
    "name": "Récréologie",
    "description": "Le programme en Récréologie à l'établissement Institut National de la Jeunesse de l'Education Physique et Sportive - INJEPS prépare les étudiants aux carrières de : Administrateur en programmes et projets de loisir et tourisme, Spécialiste en gestion du patrimoine.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Administrateur en programmes et projets de loisir et tourisme",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Spécialiste en gestion du patrimoine",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Récréologie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Récréologie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Philo."
      }
    ],
    "bourse": 9,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Philo"
    ]
  },
  {
    "id": "uac-injeps-entrepreneuriat-social",
    "name": "Entrepreneuriat social",
    "description": "Le programme en Entrepreneuriat social à l'établissement Institut National de la Jeunesse de l'Education Physique et Sportive - INJEPS prépare les étudiants aux carrières de : Spécialiste en création et gestion d'entreprise.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Spécialiste en création et gestion d'entreprise",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Entrepreneuriat social.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Entrepreneuriat social."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Philo."
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Philo"
    ]
  },
  {
    "id": "uac-ens-porto-novo-histoire-et-g-ographie",
    "name": "Histoire et Géographie",
    "description": "Le programme en Histoire et Géographie à l'établissement ENS Porto-Novo prépare les étudiants aux carrières de : Professeur Adjoint des Lycées et collèges.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint des Lycées et collèges",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Histoire et Géographie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Histoire et Géographie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Commentaire de texte en Histoire ou Géographie."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Commentaire de texte en Histoire ou Géographie"
    ]
  },
  {
    "id": "uac-ens-porto-novo-espagnol",
    "name": "Espagnol",
    "description": "Le programme en Espagnol à l'établissement ENS Porto-Novo prépare les étudiants aux carrières de : Professeur Adjoint, Interprète et Traducteur.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Interprète et Traducteur",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Espagnol.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Espagnol."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Commentaire de texte en Espagnol."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Commentaire de texte en Espagnol"
    ]
  },
  {
    "id": "uac-ens-porto-novo-allemand",
    "name": "Allemand",
    "description": "Le programme en Allemand à l'établissement ENS Porto-Novo prépare les étudiants aux carrières de : Professeur Adjoint, Interprète et Traducteur.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Interprète et Traducteur",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Allemand.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Allemand."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Commentaire de texte en Allemand."
      }
    ],
    "bourse": 11,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Commentaire de texte en Allemand"
    ]
  },
  {
    "id": "uac-ens-porto-novo-anglais",
    "name": "Anglais",
    "description": "Le programme en Anglais à l'établissement ENS Porto-Novo prépare les étudiants aux carrières de : Professeur Adjoint d'Anglais, Traducteur, Interprète.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint d'Anglais",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Traducteur",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Interprète",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Anglais.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Anglais."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Commentaire de texte en Anglais."
      }
    ],
    "bourse": 17,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Commentaire de texte en Anglais"
    ]
  },
  {
    "id": "uac-ens-porto-novo-fran-ais",
    "name": "Français",
    "description": "Le programme en Français à l'établissement ENS Porto-Novo prépare les étudiants aux carrières de : Professeur Adjoint de Français, Correcteur en maison d'édition, Rédacteur.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint de Français",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Correcteur en maison d'édition",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Rédacteur",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Français.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Français."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Commentaire de texte en Français."
      }
    ],
    "bourse": 22,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Commentaire de texte en Français"
    ]
  },
  {
    "id": "uac-ens-porto-novo-philosophie",
    "name": "Philosophie",
    "description": "Le programme en Philosophie à l'établissement ENS Porto-Novo prépare les étudiants aux carrières de : Professeur Adjoint de Philosophie, Conseiller culturel, Rédacteur de presse.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint de Philosophie",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Conseiller culturel",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Rédacteur de presse",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Philosophie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Philosophie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Culture générale, Commentaire de texte en Philo."
      }
    ],
    "bourse": 9,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Commentaire de texte en Philo"
    ]
  },
  {
    "id": "uac-fadesp-droit",
    "name": "Droit",
    "description": "Le programme en Droit à l'établissement FADESP prépare les étudiants aux carrières de : Attaché des services administratifs, Juriste des affaires, d'entreprise, Avocat, huissier, notaire.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G2)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Attaché des services administratifs",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Juriste des affaires, d'entreprise",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Avocat, huissier, notaire",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Magistrature",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Droit.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Droit."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G2."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Hist-Géo/Etude de cas (G2)."
      }
    ],
    "bourse": 104,
    "aide_fpp": 999,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G2"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Hist-Géo/Etude de cas (G2)"
    ]
  },
  {
    "id": "uac-fadesp-sciences-politiques",
    "name": "Sciences Politiques",
    "description": "Le programme en Sciences Politiques à l'établissement FADESP prépare les étudiants aux carrières de : Diplomate, Spécialiste des relations internationales, Spécialiste des politiques publiques.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D, G2)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Diplomate",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Spécialiste des relations internationales",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Spécialiste des politiques publiques",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Gestionnaire des projets",
        "salary": "1 200 000 - 3 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences Politiques.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences Politiques."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D, G2."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Français, Anglais (LV1), Hist-Géo/Etude de cas (G2)."
      }
    ],
    "bourse": 38,
    "aide_fpp": 183,
    "mode_entree": "Classement",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "G2"
    ],
    "matieres": [
      "Français",
      "Anglais (LV1)",
      "Hist-Géo/Etude de cas (G2)"
    ]
  },
  {
    "id": "uac-faseg-sciences-economiques-et-de-gestion-tronc",
    "name": "Sciences Economiques et de Gestion (Tronc commun)",
    "description": "Le programme en Sciences Economiques et de Gestion (Tronc commun) à l'établissement FASEG prépare les étudiants aux carrières de : Services déconcentrés de l'Etat, Collectivités locales, associations et ONG, Statisticien économiste, Agent de banque, d'assurance.",
    "duration": "3 ans",
    "level": "Niveau Bac (B, C, D, G2, G3, DT/CoM)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Services déconcentrés de l'Etat, Collectivités locales, associations et ONG",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Statisticien économiste",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Agent de banque, d'assurance",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences Economiques et de Gestion (Tronc commun).",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences Economiques et de Gestion (Tronc commun)."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : B, C, D, G2, G3, DT/CoM."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Pour C et D: Maths, PCT, Français, Pour B et G: Economie, Etude de cas(G)/Maths (B), Français, Pour DT/Com: Techn Compta et Mercatique, Organisation et Administration rationnelle des ressources, Français."
      }
    ],
    "bourse": 207,
    "aide_fpp": 1407,
    "mode_entree": "Classement",
    "bac_recommande": [
      "B",
      "C",
      "D",
      "G2",
      "G3",
      "DT/CoM"
    ],
    "matieres": [
      "Pour C et D: Maths, PCT, Français",
      "Pour B et G: Economie, Etude de cas(G)/Maths (B), Français",
      "Pour DT/Com: Techn Compta et Mercatique, Organisation et Administration rationnelle des ressources, Français"
    ]
  },
  {
    "id": "uac-faseg-econom-trie-et-statistiques-appliqu-es",
    "name": "Econométrie et Statistiques Appliquées",
    "description": "Le programme en Econométrie et Statistiques Appliquées à l'établissement FASEG prépare les étudiants aux carrières de : Statisticien, économètre, Analyste économiste, Conseiller en stratégies et prise de décisions.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Statisticien, économètre, Analyste économiste",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Conseiller en stratégies et prise de décisions",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Econométrie et Statistiques Appliquées.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Econométrie et Statistiques Appliquées."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Français."
      }
    ],
    "bourse": 18,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Français"
    ]
  },
  {
    "id": "uac-faseg-sciences-et-techniques-comptables-et-fin",
    "name": "Sciences et Techniques Comptables et Financières (STCF)",
    "description": "Le programme en Sciences et Techniques Comptables et Financières (STCF) à l'établissement FASEG prépare les étudiants aux carrières de : Audits comptable ou Financier, Contrôleur interne en banque et Entreprise, Agent comptable.",
    "duration": "3 ans",
    "level": "Niveau Bac (B, C, D, G2, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Audits comptable ou Financier",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Contrôleur interne en banque et Entreprise",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Agent comptable",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences et Techniques Comptables et Financières (STCF).",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences et Techniques Comptables et Financières (STCF)."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : B, C, D, G2, G3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Pour C et D: Maths, PCT, Français, Pour B et G: Economie, Etude de cas(G)/Maths (B), Français."
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "B",
      "C",
      "D",
      "G2",
      "G3"
    ],
    "matieres": [
      "Pour C et D: Maths, PCT, Français",
      "Pour B et G: Economie, Etude de cas(G)/Maths (B), Français"
    ]
  },
  {
    "id": "uac-fast-sciences-de-la-vie-et-de-la-terre",
    "name": "Sciences de la Vie et de la Terre",
    "description": "Le programme en Sciences de la Vie et de la Terre à l'établissement FAST prépare les étudiants aux carrières de : Enseignement des SVT, Techniciens de laboratoires et institutions de recherche, Ecoles d'ingénieurs.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement des SVT",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens de laboratoires et institutions de recherche",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Ecoles d'ingénieurs",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Sciences de la Vie et de la Terre.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Sciences de la Vie et de la Terre."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : SVT, PCT, Français."
      }
    ],
    "bourse": 65,
    "aide_fpp": 245,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Français"
    ]
  },
  {
    "id": "uac-fast-physique-chimie",
    "name": "Physique-Chimie",
    "description": "Le programme en Physique-Chimie à l'établissement FAST prépare les étudiants aux carrières de : Enseignement des PCT, Techniciens de laboratoires et institutions de recherche, Ecoles d'ingénieurs.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement des PCT",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens de laboratoires et institutions de recherche",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Ecoles d'ingénieurs",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Physique-Chimie.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Physique-Chimie."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Français."
      }
    ],
    "bourse": 254,
    "aide_fpp": 405,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Français"
    ]
  },
  {
    "id": "uac-fast-math-matiques-informatique-et-application",
    "name": "Mathématiques Informatique et Applications",
    "description": "Le programme en Mathématiques Informatique et Applications à l'établissement FAST prépare les étudiants aux carrières de : Enseignement Maths, Techniciens de laboratoires et institutions de recherche, Ecoles d'ingénieurs.",
    "duration": "3 ans",
    "level": "Niveau Bac (C)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement Maths",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens de laboratoires et institutions de recherche",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Ecoles d'ingénieurs",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Mathématiques Informatique et Applications.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Mathématiques Informatique et Applications."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Français."
      }
    ],
    "bourse": 247,
    "aide_fpp": 119,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Français"
    ]
  },
  {
    "id": "uac-fast-energies-renouvelables-et-syst-mes-energ-",
    "name": "Energies Renouvelables et Systèmes Energétiques",
    "description": "Le programme en Energies Renouvelables et Systèmes Energétiques à l'établissement FAST prépare les étudiants aux carrières de : Production et fourniture d'énergie électrique, Fourniture de services.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, F2, F3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Production et fourniture d'énergie électrique",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Fourniture de services",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Energies Renouvelables et Systèmes Energétiques.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Energies Renouvelables et Systèmes Energétiques."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, F2, F3."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : Maths, PCT, Français."
      }
    ],
    "bourse": 27,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "F2",
      "F3"
    ],
    "matieres": [
      "Maths",
      "PCT",
      "Français"
    ]
  },
  {
    "id": "uac-fast-g-n-tique-biotechnologies-et-ressources-b",
    "name": "Génétique, Biotechnologies et Ressources Biologiques",
    "description": "Le programme en Génétique, Biotechnologies et Ressources Biologiques à l'établissement FAST prépare les étudiants aux carrières de : Recherche en Génétique et biotechnologies appliquées, Gestion des ressources génétiques, Entrepreneuriat en sélections végétales et animales.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Recherche en Génétique et biotechnologies appliquées",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Gestion des ressources génétiques",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Entrepreneuriat en sélections végétales et animales",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Génétique, Biotechnologies et Ressources Biologiques.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Génétique, Biotechnologies et Ressources Biologiques."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : SVT, PCT, Français."
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Français"
    ]
  },
  {
    "id": "uac-fast-microbiologie-et-biotechnologie-alimentai",
    "name": "Microbiologie et Biotechnologie Alimentaire",
    "description": "Le programme en Microbiologie et Biotechnologie Alimentaire à l'établissement FAST prépare les étudiants aux carrières de : Chef de production dans les industries, Laboratoire en Contrôle de qualité, Transformations agroalimentaires.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Nutrition et Technologie Alimentaire)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Chef de production dans les industries",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Laboratoire en Contrôle de qualité",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Transformations agroalimentaires",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Microbiologie et Biotechnologie Alimentaire.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Microbiologie et Biotechnologie Alimentaire."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Nutrition et Technologie Alimentaire."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : SVT, PCT, Français, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 17,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Nutrition et Technologie Alimentaire"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Français",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-fast-hydrobiologie-appliqu-e",
    "name": "Hydrobiologie Appliquée",
    "description": "Le programme en Hydrobiologie Appliquée à l'établissement FAST prépare les étudiants aux carrières de : Techniciens de laboratoire de biologie, Spécialiste en qualité de l'eau et surveillance des écosystèmes aquatiques, Chef Production en pisciculture, pêche et Aquaculture.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, DEAT/Pêche et aquaculture)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens de laboratoire de biologie",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Spécialiste en qualité de l'eau et surveillance des écosystèmes aquatiques",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Chef Production en pisciculture, pêche et Aquaculture",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Hydrobiologie Appliquée.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Hydrobiologie Appliquée."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : C, D, DEAT/Pêche et aquaculture."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Les matières principales prises en compte pour le classement sont : SVT, PCT, Français, Pour DEAT: toutes les trois matières écrites."
      }
    ],
    "bourse": 16,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Pêche et aquaculture"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Français",
      "Pour DEAT: toutes les trois matières écrites"
    ]
  },
  {
    "id": "uac-confucius-langue-chinoise",
    "name": "Langue Chinoise",
    "description": "Le programme en Langue Chinoise à l'établissement Confucius prépare les étudiants aux carrières de : Entreprise chinoise au Bénin ou dans la sous-région, Interprète ou guide touristique, Bourses d'études pour étudier dans des Universités chinoises.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Entreprise chinoise au Bénin ou dans la sous-région",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Interprète ou guide touristique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Bourses d'études pour étudier dans des Universités chinoises",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Langue Chinoise.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Langue Chinoise."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B, C, D."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Le classement prend en compte les matières scientifiques ou littéraires principales selon les séries de bac."
      }
    ],
    "bourse": 0,
    "aide_fpp": 0,
    "mode_entree": "N/A",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D"
    ],
    "matieres": []
  },
  {
    "id": "uac-confucius-didactique-du-chinois",
    "name": "Didactique du Chinois",
    "description": "Le programme en Didactique du Chinois à l'établissement Confucius prépare les étudiants aux carrières de : Entreprise chinoise au Bénin ou dans la sous-région, Interprète ou guide touristique.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Entreprise chinoise au Bénin ou dans la sous-région",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Interprète ou guide touristique",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Didactique du Chinois.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Didactique du Chinois."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : A1, A2, B."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Le classement prend en compte les matières scientifiques ou littéraires principales selon les séries de bac."
      }
    ],
    "bourse": 0,
    "aide_fpp": 0,
    "mode_entree": "N/A",
    "bac_recommande": [
      "A1",
      "A2",
      "B"
    ],
    "matieres": []
  },
  {
    "id": "uac-ilaci-langue-arabe",
    "name": "Langue Arabe",
    "description": "Le programme en Langue Arabe à l'établissement ILACI prépare les étudiants aux carrières de : Enseignement, Traducteur/Interprétation, Journalisme et communication, Culture, Tourisme/Agence de voyage.",
    "duration": "3 ans",
    "level": "Niveau Bac (Toutes séries confondues)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement, Traducteur/Interprétation",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Journalisme et communication",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Culture, Tourisme/Agence de voyage",
        "salary": "2 000 000 - 5 000 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Langue Arabe.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Langue Arabe."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : Toutes séries confondues."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Le classement prend en compte les matières scientifiques ou littéraires principales selon les séries de bac."
      }
    ],
    "bourse": 0,
    "aide_fpp": 0,
    "mode_entree": "N/A",
    "bac_recommande": [
      "Toutes séries confondues"
    ],
    "matieres": []
  },
  {
    "id": "uac-ilaci-culture-islamique",
    "name": "Culture Islamique",
    "description": "Le programme en Culture Islamique à l'établissement ILACI prépare les étudiants aux carrières de : Enseignement, Traducteur/Interprétation, Recherche et analyse.",
    "duration": "3 ans",
    "level": "Niveau Bac (Toutes séries confondues)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Enseignement, Traducteur/Interprétation",
        "salary": "1 500 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Recherche et analyse",
        "salary": "1 800 000 - 4 000 000 FCFA / an",
        "themeColor": "purple"
      }
    ],
    "competences": [
      "Acquérir une maîtrise approfondie des fondamentaux en Culture Islamique.",
      "Développer des compétences techniques et opérationnelles immédiatement applicables en milieu professionnel.",
      "Mener à bien des projets appliqués et s'adapter aux exigences du marché de l'emploi."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Cours d'introduction, méthodologie d'études, sciences fondamentales et langues."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Enseignements pratiques de spécialité, projets tuteurés et ateliers pratiques."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Stage de fin de cycle et approfondissements liés aux débouchés de Culture Islamique."
      }
    ],
    "salairesInfo": "Les salaires dans ce domaine varient en fonction de la spécialité, de l'expérience et du type de structure (publique, privée, ONG).",
    "faq": [
      {
        "q": "Quels sont les baccalauréats requis ?",
        "a": "Les bacheliers recommandés pour cette formation sont les baccalauréats : Toutes séries confondues."
      },
      {
        "q": "Quels sont les matières à fort coefficient ?",
        "a": "Le classement prend en compte les matières scientifiques ou littéraires principales selon les séries de bac."
      }
    ],
    "bourse": 0,
    "aide_fpp": 0,
    "mode_entree": "N/A",
    "bac_recommande": [
      "Toutes séries confondues"
    ],
    "matieres": []
  },
  {
    "id": "licence-informatique",
    "name": "Licence en Informatique",
    "description": "La licence en informatique forme des professionnels capables de concevoir, développer, sécuriser et gérer des systèmes informatiques et d'ingénierie logicielle d'envergure.",
    "duration": "3 ans",
    "level": "Niveau Bac (C, D, E, G3, DEAT)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Développeur Full-Stack",
        "salary": "2 000 000 - 4 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Administrateur Réseaux & Cloud",
        "salary": "2 200 000 - 3 800 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Analyste Programmeur",
        "salary": "1 800 000 - 3 500 000 FCFA / an",
        "themeColor": "green"
      },
      {
        "name": "Chef de projet IT Junior",
        "salary": "2 500 000 - 5 000 000 FCFA / an",
        "themeColor": "orange"
      }
    ],
    "competences": [
      "Concevoir et développer des architectures web réactives et applications mobiles niches.",
      "Administrer des serveurs d'entreprise, réseaux locaux sécurisés et plateformes Cloud.",
      "Modéliser et interroger des bases de données relationnelles (SQL) et volumétries NoSQL.",
      "Conduire des cycles projets Agiles (Scrum, Kanban) au sein d'équipes pluridisciplinaires."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Introduction à l'algorithmique, structures de données linéaires, architecture des ordinateurs, anglais technique, mathématiques pour l'informatique."
      },
      {
        "semester": "Semestre 3 & 4",
        "details": "Programmation orientée objet (Java, Python), bases de données relationnelles, réseaux informatiques fondamentaux, développement web front-end."
      },
      {
        "semester": "Semestre 5 & 6",
        "details": "Cybersécurité opérationnelle, développement d'applications mobiles, initiation au Cloud Computing, stage pratique de 3 mois et soutenance de mémoire."
      }
    ],
    "salairesInfo": "L'informatique est l'un des secteurs les plus dynamiques et rémunérateurs au Bénin.",
    "faq": [
      {
        "q": "Quel type d'ordinateur est requis ?",
        "a": "Un Core i5 avec 8Go RAM est recommandé."
      }
    ]
  },
  {
    "id": "licence-sante-publique",
    "name": "Licence en Santé Publique",
    "description": "Ce cursus pluridisciplinaire dote les étudiants d'expertises pointues pour planifier, évaluer et piloter des programmes de santé communautaire, d'épidémiologie et de nutrition.",
    "duration": "3 ans",
    "level": "Niveau Bac (D, C, G3, DEAT)",
    "format": "Formation initiale & continue",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Coordonnateur de Projets de Santé",
        "salary": "2 500 000 - 5 500 000 FCFA / an",
        "themeColor": "blue"
      },
      {
        "name": "Analyste Épidémiologiste de terrain",
        "salary": "3 000 000 - 6 000 000 FCFA / an",
        "themeColor": "purple"
      },
      {
        "name": "Responsable Nutrition Communautaire",
        "salary": "2 000 000 - 4 200 000 FCFA / an",
        "themeColor": "green"
      }
    ],
    "competences": [
      "Concevoir et déployer des campagnes d'information pour la santé des populations.",
      "Réaliser des enquêtes épidémiologiques."
    ],
    "programme": [
      {
        "semester": "Semestre 1 & 2",
        "details": "Introduction à la santé publique."
      }
    ]
  },
  {
    "id": "licence-agronomie",
    "name": "Licence en Agronomie",
    "description": "Formation d'ingénieurs d'exécution capables de piloter des exploitations agricoles modernes.",
    "duration": "3 ans",
    "level": "Niveau Bac (D, C, DEAT, E)",
    "format": "Formation initiale & par alternance",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Gérant d'Exploitation Agricole",
        "salary": "2 400 000 - 4 800 000 FCFA / an",
        "themeColor": "blue"
      }
    ]
  },
  {
    "id": "licence-economie",
    "name": "Licence en Économie et Gestion",
    "description": "Prépare les bacheliers aux métiers de la finance d'entreprise.",
    "duration": "3 ans",
    "level": "Niveau Bac (G2, G3, C, D)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Analyste Financier",
        "salary": "2 400 000 - 5 000 000 FCFA / an",
        "themeColor": "blue"
      }
    ]
  },
  {
    "id": "licence-biotechnologie",
    "name": "Licence en Biosciences et Biotechnologies",
    "description": "Une formation de pointe combinant biologie, biochimie.",
    "duration": "3 ans",
    "level": "Niveau Bac (D, C)",
    "format": "Formation initiale d'excellence",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien de Laboratoire R&D",
        "salary": "2 200 000 - 4 000 000 FCFA / an",
        "themeColor": "blue"
      }
    ]
  },
  {
    "id": "licence-lettres",
    "name": "Licence en Lettres Modernes",
    "description": "Formation académique de haut niveau centrée sur la maîtrise de la communication écrite.",
    "duration": "3 ans",
    "level": "Niveau Bac (A1, A2, B, D, G3)",
    "format": "Formation initiale",
    "credits": "180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Chargé de Communication",
        "salary": "1 800 000 - 3 500 000 FCFA / an",
        "themeColor": "blue"
      }
    ]
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-comptabilite",
    "name": "Comptabilité",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Comptabilité.",
    "duration": "2 à 3 ans",
    "level": "B, G2, G3, C, D, DT/COM",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 9,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "B",
      "G2",
      "G3",
      "C",
      "D",
      "DT/COM"
    ],
    "matieres": [
      "Culture générale",
      "Etude de cas (G)/Maths (C,D)/Economie (B)/Techn Compta et Mercatique (DT/COM)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-economie",
    "name": "Economie",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Economie.",
    "duration": "2 à 3 ans",
    "level": "B, G2, G3, C, D, DT/COM",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "B",
      "G2",
      "G3",
      "C",
      "D",
      "DT/COM"
    ],
    "matieres": [
      "Culture générale",
      "Etude de cas (G)/Maths (C,D)/Economie (B)/Techn Compta et Mercatique (DT/COM)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-electrotechnique",
    "name": "Electrotechnique",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Electrotechnique.",
    "duration": "2 à 3 ans",
    "level": "C, D, F2, F3, DT/Electricité, DT/Electrotechnique Appliqué",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 30,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "F2",
      "F3",
      "DT/Electricité",
      "DT/Electrotechnique Appliqué"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)",
      "Electrotech (F2,F3, DT/Electricité, DT/Electrotech Appliqué)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-genie-civil",
    "name": "Génie Civil",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Génie Civil.",
    "duration": "2 à 3 ans",
    "level": "C, D, F4, DT/BTP",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 34,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "F4",
      "DT/BTP"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/RDM (F4, DT/BTP)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-secretariat",
    "name": "Secrétariat",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Secrétariat.",
    "duration": "2 à 3 ans",
    "level": "A1, A2, B, G1",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 6,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "G1"
    ],
    "matieres": [
      "Culture générale",
      "BS (G1)/Histoire (A1,A2)/Economie (B)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-mecanique-automobile",
    "name": "Mécanique Automobile",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Mécanique Automobile.",
    "duration": "2 à 3 ans",
    "level": "C, D, F2, DT/MA",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 28,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "F2",
      "DT/MA"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/Technologie Automobile (DT/MA)/Dessin Industriel (F2)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-fabrication-mecanique",
    "name": "Fabrication Mécanique",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Fabrication Mécanique.",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F1, DT/FM",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 22,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F1",
      "DT/FM"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/RDM (E, F1, DT/FM)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-economie-familiale-et-sociale",
    "name": "Economie Familiale et Sociale",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Economie Familiale et Sociale.",
    "duration": "2 à 3 ans",
    "level": "A1, A2, B, C, D, DT/EFS",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 5,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DT/EFS"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/Educ santé (DT/EFS)/Anglais (A1,A2)",
      "Economie (B)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-hotellerie-restauration",
    "name": "Hôtellerie-Restauration",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Hôtellerie-Restauration.",
    "duration": "2 à 3 ans",
    "level": "A1, A2, B, C, D, DT/HR, DT/Tourisme, DT/EFS",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 36,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "A1",
      "A2",
      "B",
      "C",
      "D",
      "DT/HR",
      "DT/Tourisme",
      "DT/EFS"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/Tech BR (DT/HR)/Hist (A1,A2)/Economie (B)/Anglais (DT/Tourisme)/Puériculture (DT/EFS)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-froid-et-climatisation",
    "name": "Froid et Climatisation",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Froid et Climatisation.",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F3, DT/FC",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 27,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F3",
      "DT/FC"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/Tech Froid (DT/FC)",
      "Electrotechnique (F3)",
      "RDM (E)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-electronique",
    "name": "Electronique",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Electronique.",
    "duration": "2 à 3 ans",
    "level": "C, D, F2, DT/EAp",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 14,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "F2",
      "DT/EAp"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/EST (F2)",
      "Pour DT/EAp: Sciences Appliquées, Français, Etude Electronique"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-energies-renouvelables",
    "name": "Energies Renouvelables",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Energies Renouvelables.",
    "duration": "2 à 3 ans",
    "level": "C, D, F2, F3, DT/Electricité, DT/EAp",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 34,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "F2",
      "F3",
      "DT/Electricité",
      "DT/EAp"
    ],
    "matieres": [
      "Culture générale",
      "PCT (C,D)/Mathématiques Appliquées (F2,F3,DT/Electricité)",
      "Pour DT/EAp: Sciences Appliquées, Français, Etude Electronique"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-production-animale",
    "name": "Production Animale",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Production Animale.",
    "duration": "2 à 3 ans",
    "level": "C, D, DEAT/PA, DEAT/PV",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 13,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/PA",
      "DEAT/PV"
    ],
    "matieres": [
      "Culture générale",
      "SVT (D)/PCT (C)",
      "Agriculture spéciale (DEAT/PV)/Zootechnie spéciale (DEAT/PA)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-production-vegetale",
    "name": "Production végétale",
    "description": "Filière de l'ENSET (UNSTIM) - Formation de niveau BAC+2/3 en Production végétale.",
    "duration": "2 à 3 ans",
    "level": "C, D, DEAT/PA, DEAT/PV",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur adjoint des Lycées et Collèges",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 8,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/PA",
      "DEAT/PV"
    ],
    "matieres": [
      "Culture générale",
      "SVT (D)/PCT (C)",
      "Agriculture spéciale (DEAT/PV)/Zootechnie spéciale (DEAT/PA)"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "schoolName": "Ecole Normale Supérieure de l'Enseignement Technique (ENSET)"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-civil",
    "name": "Génie Civil",
    "description": "Filière de l'INSTI (UNSTIM) - Formation de niveau BAC+2/3 en Génie Civil.",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F4, DT/BTP, DT/OG, DT/DPB",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens de Travaux du Génie Civil",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Contrôleurs de chantiers",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Assistant des Experts Géomètres, cabinets d'architecture, agences immobilières et notaires",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 68,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F4",
      "DT/BTP",
      "DT/OG",
      "DT/DPB"
    ],
    "matieres": [
      "Maths",
      "SPCT",
      "Anglais (C,D)/Construction Mécanique (E)/Béton Armé (F4)",
      "RDM (DT/BTP, DT/DPB)/Technologie (DT/OG)"
    ],
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "schoolName": "Institut National Supérieur de Technologie Industrielle (INSTI)"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-energetique-energies-renouvelables-et-systemes-energetiques",
    "name": "Génie Energétique (Energies Renouvelables et Systèmes Energétiques)",
    "description": "Filière de l'INSTI (UNSTIM) - Formation de niveau BAC+2/3 en Génie Energétique (Energies Renouvelables et Systèmes Energétiques).",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F2, F3, DT/(Electrotech), DT/Eap",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens en Industrie électrique, électrotechniques et électroniques",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Installations et systèmes pour énergies renouvelables",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Audit et Efficacité énergétique",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 37,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F2",
      "F3",
      "DT/(Electrotech)",
      "DT/Eap"
    ],
    "matieres": [
      "Maths",
      "SPCT",
      "Anglais (C,D)/Construction Mécanique (E)/Electrotech (F3, DT/Electrotech)/EST (F2)",
      "Pour DT/EAP: Sciences Appliquées, Français, Etude Electronique"
    ],
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "schoolName": "Institut National Supérieur de Technologie Industrielle (INSTI)"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-energetique-froid-et-climatisation",
    "name": "Génie Energétique (Froid et climatisation)",
    "description": "Filière de l'INSTI (UNSTIM) - Formation de niveau BAC+2/3 en Génie Energétique (Froid et climatisation).",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F3, DT/(Electrotech, Froid et Climatisation)",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens en Froid et climatisation de bâtiment et automobile",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Métiers du bâtiment, Appareillage, instrumentation",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 30,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F3",
      "DT/(Electrotech, Froid et Climatisation)"
    ],
    "matieres": [
      "Maths",
      "SPCT(C,D,E,F3) ou Technique de Froid (DT/FC)",
      "Anglais (C,D)/Technologie de spécialité (DT-Froid et climatisation)/Electrotech (F3, DT/Electrotech)/Construction mécanique (E)"
    ],
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "schoolName": "Institut National Supérieur de Technologie Industrielle (INSTI)"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-electrique-et-informatique-informatique-et-telecommunications",
    "name": "Génie Electrique et Informatique (Informatique et Télécommunications)",
    "description": "Filière de l'INSTI (UNSTIM) - Formation de niveau BAC+2/3 en Génie Electrique et Informatique (Informatique et Télécommunications).",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F3, DT/(Electrotech, Appliquée)",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Service informatique d'entreprise",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Cabinets d'audit ou ingénierie informatique",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Sociétés de téléphonie mobile, systèmes embarqués, télésurveillance",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 24,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F3",
      "DT/(Electrotech, Appliquée)"
    ],
    "matieres": [
      "Maths",
      "Anglais (C,D)/Construction Mécanique (E)/Electrotech (F3, DT/Electrotech)",
      "SPCT"
    ],
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "schoolName": "Institut National Supérieur de Technologie Industrielle (INSTI)"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-electrique-et-informatique-electronique-et-electrotechnique",
    "name": "Génie Electrique et Informatique (Electronique et Electrotechnique)",
    "description": "Filière de l'INSTI (UNSTIM) - Formation de niveau BAC+2/3 en Génie Electrique et Informatique (Electronique et Electrotechnique).",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F3, DT/Electrotech",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Electricité Industrielle et de bâtiments",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Contrôle de procédés dans le domaine électrique",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Systèmes embarqués, Télésurveillance",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 26,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F3",
      "DT/Electrotech"
    ],
    "matieres": [
      "Maths",
      "SPCT",
      "Anglais (C,D)/Construction Mécanique (E)/Electrotech (F3, DT/Electrotech)"
    ],
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "schoolName": "Institut National Supérieur de Technologie Industrielle (INSTI)"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti-maintenance-des-systemes-maintenance-industrielle",
    "name": "Maintenance des Systèmes (Maintenance Industrielle)",
    "description": "Filière de l'INSTI (UNSTIM) - Formation de niveau BAC+2/3 en Maintenance des Systèmes (Maintenance Industrielle).",
    "duration": "2 à 3 ans",
    "level": "F1, F2, F3, DT/Froid et Climatisation, DT/Electrotechnique",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens des industries de transformation et Unités de production alimentaire",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Auditeurs/Conseils des Entreprises ou Sociétés de TP",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Responsable service après-vente",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 21,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "F1",
      "F2",
      "F3",
      "DT/Froid et Climatisation",
      "DT/Electrotechnique"
    ],
    "matieres": [
      "F1,F2,F3",
      "Maths",
      "SPCT",
      "Construction Mécanique (F1,F2)/EST(F3)",
      "Pour les DT: Maths, Technique de Froid (DT/FC)/Electrotech (DT-Electrotech), Technologie de Spécialité (DT/FC)/EST(DT-Electrotech)"
    ],
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "schoolName": "Institut National Supérieur de Technologie Industrielle (INSTI)"
  },
  {
    "id": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-mecanique-et-productique",
    "name": "Génie Mécanique et productique",
    "description": "Filière de l'INSTI (UNSTIM) - Formation de niveau BAC+2/3 en Génie Mécanique et productique.",
    "duration": "2 à 3 ans",
    "level": "C, D, E, F1, DT/MA, DT/FM",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Maintenance industrielle",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Fabrication mécanique",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Parcs machines",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Maintenance des engins agricoles",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Mécanisation agricole",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 38,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F1",
      "DT/MA",
      "DT/FM"
    ],
    "matieres": [
      "Maths",
      "SPCT",
      "Anglais (C,D)/Construction Mécanique (E,F1,DT/FM)/Mécanique (DT/MA)"
    ],
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "schoolName": "Institut National Supérieur de Technologie Industrielle (INSTI)"
  },
  {
    "id": "unstim-institut-national-superieur-des-classes-preparatoires-aux-etudes-d-ingenieurs-inspei-sciences-et-techniques-de-l-ingenieur",
    "name": "Sciences et Techniques de l'Ingénieur",
    "description": "Filière de l'INSPEI (UNSTIM) - Formation de niveau BAC+2/3 en Sciences et Techniques de l'Ingénieur.",
    "duration": "2 à 3 ans",
    "level": "C, D, E",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Ingénieur de conception (après 3 ans d'études dans les écoles d'ingénieur au sein de l'UNSTIM)",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 83,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D",
      "E"
    ],
    "matieres": [
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-institut-national-superieur-des-classes-preparatoires-aux-etudes-d-ingenieurs-inspei",
    "schoolName": "Institut National Supérieur des Classes Préparatoires aux Etudes d'Ingénieurs (INSPEI)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-natitingou-ens-nati-mathematiques-et-informatique-mi",
    "name": "Mathématiques et Informatique (MI)",
    "description": "Filière de l'ENS/Nati (UNSTIM) - Formation de niveau BAC+2/3 en Mathématiques et Informatique (MI).",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint de Maths",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 29,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "Maths"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati",
    "schoolName": "Ecole Normale Supérieure de Natitingou (ENS/Nati)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-natitingou-ens-nati-physique-chimie-et-technologie-pct",
    "name": "Physique, Chimie et Technologie (PCT)",
    "description": "Filière de l'ENS/Nati (UNSTIM) - Formation de niveau BAC+2/3 en Physique, Chimie et Technologie (PCT).",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint de PCT",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 17,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "PCT"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati",
    "schoolName": "Ecole Normale Supérieure de Natitingou (ENS/Nati)"
  },
  {
    "id": "unstim-ecole-normale-superieure-de-natitingou-ens-nati-sciences-de-la-vie-et-de-la-terre-svt",
    "name": "Sciences de la Vie et de la Terre (SVT)",
    "description": "Filière de l'ENS/Nati (UNSTIM) - Formation de niveau BAC+2/3 en Sciences de la Vie et de la Terre (SVT).",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Concours national",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Professeur Adjoint de SVT",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 12,
    "aide_fpp": 0,
    "mode_entree": "Concours",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Culture générale",
      "SVT"
    ],
    "schoolId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati",
    "schoolName": "Ecole Normale Supérieure de Natitingou (ENS/Nati)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-biotechnologie-medicale",
    "name": "Biotechnologie Médicale",
    "description": "Filière de l'ENSBBA (UNSTIM) - Formation de niveau BAC+2/3 en Biotechnologie Médicale.",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens supérieurs dans les Laboratoires de diagnostics biomédicaux et de contrôle de qualité des analyses",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Laboratoires de recherche universitaire ou privés",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Auto-emploi",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 11,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "schoolName": "Ecole Nationale Supérieure des Biosciences et Biotechnologies Appliquées (ENSBBA)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-biotechnologie-pharmaceutique-bp",
    "name": "Biotechnologie Pharmaceutique (BP)",
    "description": "Filière de l'ENSBBA (UNSTIM) - Formation de niveau BAC+2/3 en Biotechnologie Pharmaceutique (BP).",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens supérieurs de valorisation des ressources biologiques et de l'Environnement dans les industries pharmaceutiques et cosmétiques",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens des laboratoires de contrôle de qualité",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Auto-emploi",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 10,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "schoolName": "Ecole Nationale Supérieure des Biosciences et Biotechnologies Appliquées (ENSBBA)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-genetique-biotechnologies-et-applications",
    "name": "Génétique Biotechnologies et Applications",
    "description": "Filière de l'ENSBBA (UNSTIM) - Formation de niveau BAC+2/3 en Génétique Biotechnologies et Applications.",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Recherches en génétique et biotechnologies appliquées",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Technicien supérieur en gestion des ressources génétiques",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Entreprenariat et sélections végétales et animales",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 10,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "schoolName": "Ecole Nationale Supérieure des Biosciences et Biotechnologies Appliquées (ENSBBA)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-genie-biologique-et-bioprocedes-gbb",
    "name": "Génie Biologique et Bioprocédés (GBB)",
    "description": "Filière de l'ENSBBA (UNSTIM) - Formation de niveau BAC+2/3 en Génie Biologique et Bioprocédés (GBB).",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens supérieurs dans les laboratoires d'analyse ou de recherche",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens des centres de recherche en biologie appliquée",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Auto-emploi",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 15,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "schoolName": "Ecole Nationale Supérieure des Biosciences et Biotechnologies Appliquées (ENSBBA)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-dietetique-des-aliments-et-nutrition",
    "name": "Diététique des aliments et Nutrition",
    "description": "Filière de l'ENSBBA (UNSTIM) - Formation de niveau BAC+2/3 en Diététique des aliments et Nutrition.",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur en diététique",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Technicien supérieur en contrôle de qualité des aliments",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Technicien dans les sociétés de restauration collective",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Auto-emploi",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 9,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "SVT",
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "schoolName": "Ecole Nationale Supérieure des Biosciences et Biotechnologies Appliquées (ENSBBA)"
  },
  {
    "id": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou-mathematiques-informatiques",
    "name": "Mathématiques Informatiques",
    "description": "Filière de l'FAST/Natitingou (UNSTIM) - Formation de niveau BAC+2/3 en Mathématiques Informatiques.",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Cadres de télécommunications optiques et des nouvelles technologies de l'information et de la communication",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Enseignants des lycées et collèges (BAPES et CAPES en MI)",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Accès aux écoles d'ingénieur",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Accès à un master recherche ou professionnel",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 83,
    "aide_fpp": 43,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Anglais",
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou",
    "schoolName": "Faculté des Sciences et Techniques de Natitingou (FAST/Natitingou)"
  },
  {
    "id": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou-physique-chimie",
    "name": "Physique Chimie",
    "description": "Filière de l'FAST/Natitingou (UNSTIM) - Formation de niveau BAC+2/3 en Physique Chimie.",
    "duration": "2 à 3 ans",
    "level": "C, D",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Cadres de télécommunications optiques",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Cadres en Météorologie, océanographie et balistique",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Enseignants des lycées et collèges (BAPES et CAPES en PCT)",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Accès à un master recherche en physique ou chimie fondamentale et thèse de doctorat",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Cadres des industries chimiques, agroalimentaires et pharmaceutiques",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 66,
    "aide_fpp": 28,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D"
    ],
    "matieres": [
      "Anglais",
      "PCT",
      "Maths"
    ],
    "schoolId": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou",
    "schoolName": "Faculté des Sciences et Techniques de Natitingou (FAST/Natitingou)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep-froid-et-climatisation",
    "name": "Froid et Climatisation",
    "description": "Filière de l'ENSGEP (UNSTIM) - Formation de niveau BAC+2/3 en Froid et Climatisation.",
    "duration": "2 à 3 ans",
    "level": "C, D, DT/Froid et Clim",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur en Installation, mise en service et maintenance d'équipements de froid et climatisation",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 25,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DT/Froid et Clim"
    ],
    "matieres": [
      "Maths",
      "Anglais",
      "SPCT(C,D)/TF (DT/Froid et Clim)"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep",
    "schoolName": "Ecole Nationale Supérieure de Génie Energétique et Procédés (ENSGEP)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep-equipements-motorises",
    "name": "Equipements motorisés",
    "description": "Filière de l'ENSGEP (UNSTIM) - Formation de niveau BAC+2/3 en Equipements motorisés.",
    "duration": "2 à 3 ans",
    "level": "C, D, E, DT/MA, DT/FM",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur en Installation et maintenance des équipements motorisés",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Electromécanique",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Mécanique automobile",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Maintenance des systèmes hydrauliques et pneumatiques des gros engins des travaux publics",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 24,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "DT/MA",
      "DT/FM"
    ],
    "matieres": [
      "Maths",
      "Anglais/Français (E)",
      "SPCT (C,D)/Mécanique (DT/MA)/Construction Mécanique (E, DT/FM)"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep",
    "schoolName": "Ecole Nationale Supérieure de Génie Energétique et Procédés (ENSGEP)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-genie-civil",
    "name": "Génie Civil",
    "description": "Filière de l'ENSTP (UNSTIM) - Formation de niveau BAC+2/3 en Génie Civil.",
    "duration": "2 à 3 ans",
    "level": "C, D, E, EA, F4, DT/BTP",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Assistants dans les bureaux d'études",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens contrôleurs de travaux du Génie Civil (routes, bâtiments, ouvrages d'art, assainissement)",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Entrepreneur, chef de chantier",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Conducteur de travaux",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 21,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "EA",
      "F4",
      "DT/BTP"
    ],
    "matieres": [
      "Maths",
      "Anglais/Français (E,F4)",
      "SPCT (C,D,E)/RDM (F4,DT/BTP)/Assainissement (EA)"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "schoolName": "Ecole Nationale Supérieure des Travaux Publics (ENSTP)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-genie-geomatique-appliquee",
    "name": "Génie Géomatique Appliquée",
    "description": "Filière de l'ENSTP (UNSTIM) - Formation de niveau BAC+2/3 en Génie Géomatique Appliquée.",
    "duration": "2 à 3 ans",
    "level": "C, D, F4, DT/OG, DT/BTP",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Assistants des Experts Géomètres, des architectes, agences immobilières et notaires",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens en Système d'Information Géographique (SIG)",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Technicien-Cartographes",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 21,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "F4",
      "DT/OG",
      "DT/BTP"
    ],
    "matieres": [
      "Maths",
      "Anglais/Français (F4)",
      "SPCT (C,D)/RDM (F4,DT/BTP)/Technologie (DT/OG)"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "schoolName": "Ecole Nationale Supérieure des Travaux Publics (ENSTP)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-architecture-et-urbanisme",
    "name": "Architecture et Urbanisme",
    "description": "Filière de l'ENSTP (UNSTIM) - Formation de niveau BAC+2/3 en Architecture et Urbanisme.",
    "duration": "2 à 3 ans",
    "level": "C, D, F4, DT/OG, DT/BTP",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens Architectes-Urbanistes",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens Contrôleurs de chantiers de bâtiments",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Assistants dans les Cabinets d'Architecture, agences immobilières et notaires",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 26,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "F4",
      "DT/OG",
      "DT/BTP"
    ],
    "matieres": [
      "Maths",
      "Anglais/Français (F4)",
      "SPCT (C,D)/RDM (F4,DT/BTP)/Technologie (DT/OG)"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "schoolName": "Ecole Nationale Supérieure des Travaux Publics (ENSTP)"
  },
  {
    "id": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-hydraulique-et-assainissement",
    "name": "Hydraulique et Assainissement",
    "description": "Filière de l'ENSTP (UNSTIM) - Formation de niveau BAC+2/3 en Hydraulique et Assainissement.",
    "duration": "2 à 3 ans",
    "level": "C, D, E, EA, F4",
    "format": "Classement national BAC",
    "credits": "120-180 ECTS",
    "language": "Français",
    "careers": [
      {
        "name": "Techniciens en Hydraulique et Assainissement",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Techniciens de Laboratoires d'analyse d'eau",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      },
      {
        "name": "Assistants des experts hydrauliciens, hydrologues et en gestion des eaux",
        "salary": "Variable selon secteur",
        "themeColor": "blue"
      }
    ],
    "bourse": 25,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "EA",
      "F4"
    ],
    "matieres": [
      "Maths",
      "Anglais/Français (E,F4)",
      "SPCT (C,D,E)/RDM (F4)/Assainissement (EA)"
    ],
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "schoolName": "Ecole Nationale Supérieure des Travaux Publics (ENSTP)"
  },
  ...UNA_NEW_MAJORS,
  ...EXTRA_MAJORS
];

export const SCHOOL_MAJORS: SchoolMajor[] = [
  {
    "schoolId": "irsp",
    "majorId": "uac-irsp-sant-publique-polyvalente"
  },
  {
    "schoolId": "flash-adjarra",
    "majorId": "uac-flash-adjarra-g-ographie-et-am-nagement-du-ter"
  },
  {
    "schoolId": "flash-adjarra",
    "majorId": "uac-flash-adjarra-socio-anthropologie"
  },
  {
    "schoolId": "flash-adjarra",
    "majorId": "uac-flash-adjarra-anglais"
  },
  {
    "schoolId": "imsp",
    "majorId": "uac-imsp-classes-pr-paratoires-math-matiques-physi"
  },
  {
    "schoolId": "fllac",
    "majorId": "uac-fllac-allemand"
  },
  {
    "schoolId": "fllac",
    "majorId": "uac-fllac-anglais"
  },
  {
    "schoolId": "fllac",
    "majorId": "uac-fllac-espagnol"
  },
  {
    "schoolId": "fllac",
    "majorId": "uac-fllac-lettres-modernes"
  },
  {
    "schoolId": "fllac",
    "majorId": "uac-fllac-sciences-du-langage-et-de-la-communicati"
  },
  {
    "schoolId": "inmaac",
    "majorId": "uac-inmaac-administration-culturelle"
  },
  {
    "schoolId": "inmaac",
    "majorId": "uac-inmaac-arts-dramatiques"
  },
  {
    "schoolId": "inmaac",
    "majorId": "uac-inmaac-arts-plastiques"
  },
  {
    "schoolId": "inmaac",
    "majorId": "uac-inmaac-musique-et-musicologie"
  },
  {
    "schoolId": "inmaac",
    "majorId": "uac-inmaac-cin-ma-et-audiovisuel"
  },
  {
    "schoolId": "cifred",
    "majorId": "uac-cifred-environnement-hygi-ne-et-sant-publique"
  },
  {
    "schoolId": "igate",
    "majorId": "uac-igate-gestion-du-cadre-de-vie"
  },
  {
    "schoolId": "igate",
    "majorId": "uac-igate-gestion-des-changements-climatiques-et-d"
  },
  {
    "schoolId": "igate",
    "majorId": "uac-igate-g-omatique-et-environnement"
  },
  {
    "schoolId": "igate",
    "majorId": "uac-igate-planification-et-gestion-des-espaces-urb"
  },
  {
    "schoolId": "inmes",
    "majorId": "uac-inmes-sciences-infirmi-res"
  },
  {
    "schoolId": "inmes",
    "majorId": "uac-inmes-sciences-obst-tricales"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-hydrologie-quantitative-et-gestion-int-gr-"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-hydrog-ologie-et-gestion-int-gr-e-des-ress"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-ecohydrologie-et-gestion-int-gr-e-des-ress"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-gestion-des-crises-et-risques-li-s-l-eau-e"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-g-nie-rural-et-ma-trise-de-l-eau"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-hydraulique-et-assainissement"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-eau-hygi-ne-et-assainissement-eha-"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-administration-des-r-seaux-informatiques"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-analyse-informatique-et-programmation"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-assurance"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-banque-et-finance-de-march-"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-banque-et-institutions-des-micro-finance"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-marketing"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-gestion-des-ressources-humaines"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-gestion-des-transports"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-gestion-de-logistique"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-statistique-economique-et-sectorielle"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-statistique-d-mographique-et-sociale"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-planification-et-gestion-des-projets"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-planification-et-economie-du-d-veloppeme"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-d-veloppement-local-et-r-gional"
  },
  {
    "schoolId": "eneam",
    "majorId": "uac-eneam-gestion-financi-re-et-comptable"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-gestion-du-patrimoine-culturel"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-g-ographie-et-am-nagement-du-territoire"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-psychologie"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-sciences-de-l-education-et-de-la-formation"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-philosophie"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-socio-anthropologie"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-histoire-et-arch-ologie"
  },
  {
    "schoolId": "ine",
    "majorId": "uac-ine-psychologie-du-travail-et-des-organisation"
  },
  {
    "schoolId": "enstic",
    "majorId": "uac-enstic-journalisme"
  },
  {
    "schoolId": "enstic",
    "majorId": "uac-enstic-m-tiers-de-l-audiovisuel-et-du-multim-d"
  },
  {
    "schoolId": "enam",
    "majorId": "uac-enam-administration-g-n-rale"
  },
  {
    "schoolId": "enam",
    "majorId": "uac-enam-administration-des-finances"
  },
  {
    "schoolId": "enam",
    "majorId": "uac-enam-secr-tariat-de-gestion"
  },
  {
    "schoolId": "enam",
    "majorId": "uac-enam-sciences-et-techniques-de-l-information-d"
  },
  {
    "schoolId": "ifri",
    "majorId": "uac-ifri-g-nie-logiciel"
  },
  {
    "schoolId": "ifri",
    "majorId": "uac-ifri-internet-et-multim-dia"
  },
  {
    "schoolId": "ifri",
    "majorId": "uac-ifri-intelligence-artificielle-ia-"
  },
  {
    "schoolId": "ifri",
    "majorId": "uac-ifri-syst-mes-embarqu-s-et-internet-des-objets"
  },
  {
    "schoolId": "ifri",
    "majorId": "uac-ifri-s-curit-informatique"
  },
  {
    "schoolId": "fsa",
    "majorId": "uac-fsa-sciences-et-techniques-de-production-v-g-t"
  },
  {
    "schoolId": "fsa",
    "majorId": "uac-fsa-sciences-et-techniques-de-production-anima"
  },
  {
    "schoolId": "fsa",
    "majorId": "uac-fsa-am-nagement-et-gestion-des-for-ts-et-parco"
  },
  {
    "schoolId": "fsa",
    "majorId": "uac-fsa-g-nie-rural-m-canisation-agricole-p-che-et"
  },
  {
    "schoolId": "fsa",
    "majorId": "uac-fsa-nutrition-et-technologie-alimentaires"
  },
  {
    "schoolId": "fsa",
    "majorId": "uac-fsa-agro-conomie-sociologie-et-vulgarisation-r"
  },
  {
    "schoolId": "fsa",
    "majorId": "uac-fsa-entreprenariat-agricole"
  },
  {
    "schoolId": "fss",
    "majorId": "uac-fss-m-decine-g-n-rale"
  },
  {
    "schoolId": "fss",
    "majorId": "uac-fss-pharmacie"
  },
  {
    "schoolId": "fss",
    "majorId": "uac-fss-kin-sith-rapie"
  },
  {
    "schoolId": "fss",
    "majorId": "uac-fss-assistance-sociale"
  },
  {
    "schoolId": "fss",
    "majorId": "uac-fss-nutrition-et-di-t-tique"
  },
  {
    "schoolId": "fss",
    "majorId": "uac-fss-analyse-biom-dicale"
  },
  {
    "schoolId": "epa",
    "majorId": "uac-epa-g-nie-de-technologie-alimentaire"
  },
  {
    "schoolId": "epa",
    "majorId": "uac-epa-production-et-sant-animales"
  },
  {
    "schoolId": "epa",
    "majorId": "uac-epa-g-nie-de-l-environnement"
  },
  {
    "schoolId": "epa",
    "majorId": "uac-epa-g-nie-d-imagerie-m-dicale-et-de-radiobiolo"
  },
  {
    "schoolId": "epa",
    "majorId": "uac-epa-g-nie-civil"
  },
  {
    "schoolId": "epa",
    "majorId": "uac-epa-machinisme-agricole"
  },
  {
    "schoolId": "epa",
    "majorId": "uac-epa-g-nie-biom-dical-maintenance-biom-dicale-e"
  },
  {
    "schoolId": "ceforp",
    "majorId": "uac-ceforp-dynamique-de-population-et-planificatio"
  },
  {
    "schoolId": "herci",
    "majorId": "uac-herci-n-goce-international"
  },
  {
    "schoolId": "herci",
    "majorId": "uac-herci-gestion-des-relations-maritimes-internat"
  },
  {
    "schoolId": "herci",
    "majorId": "uac-herci-commerce-international"
  },
  {
    "schoolId": "injeps",
    "majorId": "uac-injeps-education-physique-et-sportive"
  },
  {
    "schoolId": "injeps",
    "majorId": "uac-injeps-entrainement-sportif"
  },
  {
    "schoolId": "injeps",
    "majorId": "uac-injeps-d-veloppement-communautaire"
  },
  {
    "schoolId": "injeps",
    "majorId": "uac-injeps-andragogie"
  },
  {
    "schoolId": "injeps",
    "majorId": "uac-injeps-r-cr-ologie"
  },
  {
    "schoolId": "injeps",
    "majorId": "uac-injeps-entrepreneuriat-social"
  },
  {
    "schoolId": "ens-porto-novo",
    "majorId": "uac-ens-porto-novo-histoire-et-g-ographie"
  },
  {
    "schoolId": "ens-porto-novo",
    "majorId": "uac-ens-porto-novo-espagnol"
  },
  {
    "schoolId": "ens-porto-novo",
    "majorId": "uac-ens-porto-novo-allemand"
  },
  {
    "schoolId": "ens-porto-novo",
    "majorId": "uac-ens-porto-novo-anglais"
  },
  {
    "schoolId": "ens-porto-novo",
    "majorId": "uac-ens-porto-novo-fran-ais"
  },
  {
    "schoolId": "ens-porto-novo",
    "majorId": "uac-ens-porto-novo-philosophie"
  },
  {
    "schoolId": "fadesp",
    "majorId": "uac-fadesp-droit"
  },
  {
    "schoolId": "fadesp",
    "majorId": "uac-fadesp-sciences-politiques"
  },
  {
    "schoolId": "faseg",
    "majorId": "uac-faseg-sciences-economiques-et-de-gestion-tronc"
  },
  {
    "schoolId": "faseg",
    "majorId": "uac-faseg-econom-trie-et-statistiques-appliqu-es"
  },
  {
    "schoolId": "faseg",
    "majorId": "uac-faseg-sciences-et-techniques-comptables-et-fin"
  },
  {
    "schoolId": "fast",
    "majorId": "uac-fast-sciences-de-la-vie-et-de-la-terre"
  },
  {
    "schoolId": "fast",
    "majorId": "uac-fast-physique-chimie"
  },
  {
    "schoolId": "fast",
    "majorId": "uac-fast-math-matiques-informatique-et-application"
  },
  {
    "schoolId": "fast",
    "majorId": "uac-fast-energies-renouvelables-et-syst-mes-energ-"
  },
  {
    "schoolId": "fast",
    "majorId": "uac-fast-g-n-tique-biotechnologies-et-ressources-b"
  },
  {
    "schoolId": "fast",
    "majorId": "uac-fast-microbiologie-et-biotechnologie-alimentai"
  },
  {
    "schoolId": "fast",
    "majorId": "uac-fast-hydrobiologie-appliqu-e"
  },
  {
    "schoolId": "confucius",
    "majorId": "uac-confucius-langue-chinoise"
  },
  {
    "schoolId": "confucius",
    "majorId": "uac-confucius-didactique-du-chinois"
  },
  {
    "schoolId": "ilaci",
    "majorId": "uac-ilaci-langue-arabe"
  },
  {
    "schoolId": "ilaci",
    "majorId": "uac-ilaci-culture-islamique"
  },
  {
    "schoolId": "iut",
    "majorId": "licence-informatique"
  },
  {
    "schoolId": "iut",
    "majorId": "licence-economie"
  },
  {
    "schoolId": "fa",
    "majorId": "licence-agronomie"
  },
  {
    "schoolId": "fm",
    "majorId": "licence-sante-publique"
  },
  {
    "schoolId": "ensta",
    "majorId": "licence-agronomie"
  },
  {
    "schoolId": "ensbba",
    "majorId": "licence-biotechnologie"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-comptabilite"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-economie"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-electrotechnique"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-genie-civil"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-secretariat"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-mecanique-automobile"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-fabrication-mecanique"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-economie-familiale-et-sociale"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-hotellerie-restauration"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-froid-et-climatisation"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-electronique"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-energies-renouvelables"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-production-animale"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset",
    "majorId": "unstim-ecole-normale-superieure-de-l-enseignement-technique-enset-production-vegetale"
  },
  {
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "majorId": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-civil"
  },
  {
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "majorId": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-energetique-energies-renouvelables-et-systemes-energetiques"
  },
  {
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "majorId": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-energetique-froid-et-climatisation"
  },
  {
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "majorId": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-electrique-et-informatique-informatique-et-telecommunications"
  },
  {
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "majorId": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-electrique-et-informatique-electronique-et-electrotechnique"
  },
  {
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "majorId": "unstim-institut-national-superieur-de-technologie-industrielle-insti-maintenance-des-systemes-maintenance-industrielle"
  },
  {
    "schoolId": "unstim-institut-national-superieur-de-technologie-industrielle-insti",
    "majorId": "unstim-institut-national-superieur-de-technologie-industrielle-insti-genie-mecanique-et-productique"
  },
  {
    "schoolId": "unstim-institut-national-superieur-des-classes-preparatoires-aux-etudes-d-ingenieurs-inspei",
    "majorId": "unstim-institut-national-superieur-des-classes-preparatoires-aux-etudes-d-ingenieurs-inspei-sciences-et-techniques-de-l-ingenieur"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati",
    "majorId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati-mathematiques-et-informatique-mi"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati",
    "majorId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati-physique-chimie-et-technologie-pct"
  },
  {
    "schoolId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati",
    "majorId": "unstim-ecole-normale-superieure-de-natitingou-ens-nati-sciences-de-la-vie-et-de-la-terre-svt"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "majorId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-biotechnologie-medicale"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "majorId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-biotechnologie-pharmaceutique-bp"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "majorId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-genetique-biotechnologies-et-applications"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "majorId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-genie-biologique-et-bioprocedes-gbb"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba",
    "majorId": "unstim-ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba-dietetique-des-aliments-et-nutrition"
  },
  {
    "schoolId": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou",
    "majorId": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou-mathematiques-informatiques"
  },
  {
    "schoolId": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou",
    "majorId": "unstim-faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou-physique-chimie"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep",
    "majorId": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep-froid-et-climatisation"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep",
    "majorId": "unstim-ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep-equipements-motorises"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "majorId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-genie-civil"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "majorId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-genie-geomatique-appliquee"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "majorId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-architecture-et-urbanisme"
  },
  {
    "schoolId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp",
    "majorId": "unstim-ecole-nationale-superieure-des-travaux-publics-enstp-hydraulique-et-assainissement"
  },
  ...UNA_NEW_SCHOOL_MAJORS,
  ...EXTRA_SCHOOL_MAJORS
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aminatou S.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    role: "Étudiante à l'IRSP Ouidah",
    quote: "Grâce à Après Mon Bac, j'ai découvert ma passion pour la santé publique et trouvé toutes les informations nécessaires.",
  },
  {
    name: "Kais D.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    role: "Étudiant à l'IMSP Porto-Novo",
    quote: "La plateforme m'a aidé à comprendre les débouchés de l'informatique théorique et à faire le bon choix d'institut.",
  },
  {
    name: "Eunice T.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80",
    role: "Diplômée de l'IUT Parakou",
    quote: "J'ai pu comparer les offres de gestion entre la FASEG de l'UAC et l'IUT de Parakou pour choisir celle qui correspondait le mieux à mon projet d'insertion.",
  },
];

export const CONCOURS: Concours[] = [
  {
    id: "ens-porto-novo",
    title: "Concours d'Entrée à l'École Normale Supérieure (ENS) de Porto-Novo",
    shortTitle: "ENS Porto-Novo",
    type: "sciences",
    institution: "ENS Porto-Novo",
    status: "Inscriptions ouvertes",
    statusColor: "bg-emerald-500",
    dateLimite: "15 Juillet 2026",
    places: "120 places disponibles",
    location: "Porto-Novo, Bénin",
    badge: "Haute Demande",
    description: "Formation de professeurs certifiés pour les lycées et collèges du Bénin (Mathématiques, Physique, SVT, Chimie).",
    conditions: [
      "Être de nationalité béninoise",
      "Avoir obtenu le BAC de l'année en cours (séries C, D, E)",
      "Âge maximal : 21 ans au 31 décembre"
    ],
    epreuves: ["Mathématiques", "Physique-Chimie", "Français"],
  },
  {
    id: "enene-calavi",
    title: "Concours National de l'École Nationale d'Économie Appliquée et de Management (ENEAM)",
    shortTitle: "ENEAM UAC",
    type: "administration",
    institution: "ENEAM - Abomey-Calavi",
    status: "Inscriptions ouvertes",
    statusColor: "bg-emerald-500",
    dateLimite: "22 Juillet 2026",
    places: "80 places sur concours",
    location: "Abomey-Calavi, Bénin",
    badge: "Prestigieux",
    description: "Formation de cadres supérieurs en Statistique, Planification, Analyse Économique et Management des Entreprises.",
    conditions: [
      "Avoir le BAC G2, G3, C, D avec mention Assez Bien minimum",
      "Dossier de candidature physique ou en ligne sur e-Services"
    ],
    epreuves: ["Mathématiques générales / financières", "Français / Épreuve d'actualité"],
  },
  {
    id: "instec-cotonou",
    title: "Concours d'Entrée à l'Institut National Supérieur de Technologie (INSTEC)",
    shortTitle: "INSTEC",
    type: "sciences",
    institution: "INSTEC - Cotonou",
    status: "Bientôt disponible",
    statusColor: "bg-amber-500",
    dateLimite: "Début Août 2026",
    places: "60 places",
    location: "Cotonou, Bénin",
    badge: "Technique",
    description: "Formation d'ingénieurs de conception et de techniciens supérieurs en génie électrique, informatique industrielle et réseaux.",
    conditions: [
      "Réservé aux bacheliers des séries C, D, E, F1, F2, F3",
      "Moyenne minimale de 12/20 dans les matières scientifiques"
    ],
    epreuves: ["Mathématiques appliquées", "Sciences physiques / Électronique"],
  },
  {
    id: "enam-calavi",
    title: "Concours d'Entrée à l'École Nationale d'Administration (ENAM)",
    shortTitle: "ENAM",
    type: "administration",
    institution: "ENAM - Abomey-Calavi",
    status: "Fermé",
    statusColor: "bg-rose-500",
    dateLimite: "Clos le 10 Juin 2026",
    places: "100 places d'État",
    location: "Abomey-Calavi, Bénin",
    badge: "Fonction Publique",
    description: "Préparation d'élite aux carrières de l'administration publique béninoise, diplomatie, douanes et impôts.",
    conditions: [
      "Être titulaire du BAC toutes séries confondues",
      "Casier judiciaire vierge, nationalité béninoise obligatoire"
    ],
    epreuves: ["Culture Générale", "Histoire-Géographie", "Droit Constitutionnel de base"],
  },
  {
    id: "ensbba-dassa",
    title: "Concours d'Entrée à l'École Normale Supérieure des Sciences et Techniques Agricoles de Dassa",
    shortTitle: "ENSSAP Dassa",
    type: "sciences",
    institution: "ENSSAP - Dassa-Zoumè",
    status: "Bientôt disponible",
    statusColor: "bg-amber-500",
    dateLimite: "10 Août 2026",
    places: "50 places d'État",
    location: "Dassa-Zoumè, Bénin",
    badge: "Agronomie",
    description: "Formation des enseignants des lycées techniques agricoles et conseillers en développement rural.",
    conditions: [
      "Être titulaire du BAC agricole (série DEAT) ou BAC C, D",
      "Aptitude physique certifiée"
    ],
    epreuves: ["Biologie / SVT", "Chimie organique", "Français"],
  }
];

// Helper functions for dynamic querying of our relational data
export function getSchoolsByUniversity(universityId: string): School[] {
  return SCHOOLS.filter(school => school.universityId === universityId);
}

export function getMajorsBySchool(schoolId: string): Major[] {
  const majorIds = SCHOOL_MAJORS
    .filter(sm => sm.schoolId === schoolId)
    .map(sm => sm.majorId);
  return MAJORS.filter(major => majorIds.includes(major.id));
}

export function getSchoolsByMajor(majorId: string): (School & { universityName: string; universityId: string })[] {
  const schoolIds = SCHOOL_MAJORS
    .filter(sm => sm.majorId === majorId)
    .map(sm => sm.schoolId);
  
  return SCHOOLS
    .filter(school => schoolIds.includes(school.id))
    .map(school => {
      const univ = UNIVERSITIES.find(u => u.id === school.universityId);
      return {
        ...school,
        universityName: univ ? univ.name : 'Université',
        universityId: school.universityId
      };
    });
}

export function getUniversityBySchool(schoolId: string): University | undefined {
  const school = SCHOOLS.find(s => s.id === schoolId);
  if (!school) return undefined;
  return UNIVERSITIES.find(u => u.id === school.universityId);
}
