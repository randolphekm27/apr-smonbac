import { University, School, Major, SchoolMajor, Testimonial } from './types';

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
      schools: '6', // representing principal elite schools in our data
      campuses: '1',
    },
    history: "Créée à l'origine sous le nom d'Université Nationale du Bénin (UNB) en 1970, elle a été rebondie en Université d'Abomey-Calavi (UAC) en 2001. C'est le plus ancien et le plus grand pôle d'enseignement supérieur public du pays.",
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
    id: 'upf',
    name: 'UPF',
    fullName: 'Université de Porto-Novo',
    description: "Établissement public de formation technique, technologique et professionnelle de référence, situé dans la capitale administrative.",
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1600&q=80',
    stats: {
      creationYear: '2016',
      students: '+12 000',
      schools: '1',
      campuses: '2',
    },
    history: "L'Université de Porto-Novo a été instituée pour consolider l'excellence des formations techniques et technologiques de l'Ouémé-Plateau, formant des techniciens supérieurs immédiatement opérationnels.",
    presentation: "Spécialisée dans l'enseignement professionnel, elle abrite des laboratoires d'électrotechnique, de génie civil et d'informatique appliquée de haut niveau.",
    admissionInfo: "L'entrée se fait sur examen de dossiers pour les bacheliers F1, F2, F3, F4, C, D et G2, avec des frais de scolarité modérés fixés par l'État.",
    contacts: {
      address: "Porto-Novo, République du Bénin",
      phone: "+229 20 22 55 12",
      email: "contact@upf.bj"
    }
  },
];

export const SCHOOLS: School[] = [
  // --- UAC SCHOOLS ---
  {
    id: 'irsp',
    name: 'IRSP',
    fullName: 'Institut Régional de Santé Publique',
    universityId: 'uac',
    description: 'Formation de référence régionale en santé publique, nutrition, épidémiologie et gestion des systèmes de santé.',
    themeColor: 'blue',
    history: "L'IRSP Comlan Alfred Quenum a été créé par l'Organisation Mondiale de la Santé (OMS) et l'État béninois pour servir de centre d'excellence inter-États pour la formation des professionnels de la santé en Afrique francophone.",
    domains: ["Santé Publique", "Épidémiologie", "Nutrition Humaine", "Santé Environnementale"],
    usefulInfo: "L'institut possède un centre de documentation moderne connecté aux bases de données de l'OMS et des laboratoires d'analyse biologique de pointe.",
    contacts: {
      address: "Ouidah, République du Bénin (Campus Annexe UAC)",
      phone: "+229 21 34 12 02",
      email: "info@irsp-ouidah.org"
    },
    location: "Route de Ouidah, Ouidah, Bénin"
  },
  {
    id: 'imsp',
    name: 'IMSP',
    fullName: 'Institut de Mathématiques et de Sciences Physiques',
    universityId: 'uac',
    description: 'Pôle d\'excellence africain pour les sciences fondamentales et l\'informatique appliquée de haut niveau.',
    themeColor: 'purple',
    history: "Fondé en 1988 sous l'impulsion du célèbre mathématicien d'origine béninoise, l'IMSP est aujourd'hui un Centre d'Excellence d'Afrique de l'Ouest soutenu par la Banque Mondiale pour les mathématiques et le numérique.",
    domains: ["Mathématiques Fondamentales", "Informatique Mathématique", "Sécurité Réseau", "Physique Théorique"],
    usefulInfo: "L'IMSP offre des conditions d'étude privilégiées : bourses spéciales, logements sur place pour les doctorants et infrastructures de calcul haute performance.",
    contacts: {
      address: "Porto-Novo, République du Bénin (Campus Annexe UAC)",
      phone: "+229 20 22 41 50",
      email: "contact@imsp-uac.org"
    },
    location: "Dandji, Porto-Novo, Bénin"
  },
  {
    id: 'fsa',
    name: 'FSA',
    fullName: 'Faculté des Sciences Agronomiques',
    universityId: 'uac',
    description: 'Formation d\'ingénieurs agronomes spécialisés dans la production végétale, animale, l\'économie rurale et l\'agroforesterie.',
    themeColor: 'green',
    history: "Créée dans les premières années de l'UAC, la FSA est la plus ancienne faculté d'agronomie du Bénin. Elle a formé l'essentiel des cadres du Ministère de l'Agriculture et de l'Élevage.",
    domains: ["Agronomie Générale", "Production Végétale", "Génie Rural", "Économie et Sociologie Rurales"],
    usefulInfo: "La FSA dispose de parcelles expérimentales, de serres climatisées et d'une ferme universitaire à Calavi pour la pratique immédiate.",
    contacts: {
      address: "Campus d'Abomey-Calavi, Bâtiment FSA",
      phone: "+229 21 36 01 26",
      email: "fsa.uac@uac.bj"
    },
    location: "Campus d'Abomey-Calavi, Abomey-Calavi, Bénin"
  },
  {
    id: 'flash',
    name: 'FLASH',
    fullName: 'Faculté des Lettres, Arts et Sciences Humaines',
    universityId: 'uac',
    description: 'Formation pluridisciplinaire en langues, géographie, histoire, sociologie et médiation culturelle.',
    themeColor: 'orange',
    history: "Pilier historique de l'université classique, la FLASH est la faculté qui accueille le plus grand effectif d'étudiants, développant la pensée critique et l'analyse sociologique indispensables au développement.",
    domains: ["Lettres Modernes", "Sociologie & Anthropologie", "Géographie", "Histoire & Archéologie"],
    usefulInfo: "Partenariats actifs avec des centres culturels nationaux et internationaux pour faciliter les stages de recherche en histoire et linguistique.",
    contacts: {
      address: "Campus Principal d'Abomey-Calavi, Zone FLASH",
      phone: "+229 21 36 03 30",
      email: "flash.contact@uac.bj"
    },
    location: "Campus d'Abomey-Calavi, Abomey-Calavi, Bénin"
  },
  {
    id: 'faseg',
    name: 'FASEG',
    fullName: 'Faculté des Sciences Économiques et de Gestion',
    universityId: 'uac',
    description: 'Formation de haut niveau en sciences de gestion, comptabilité, audit, finance internationale et micro-économie.',
    themeColor: 'red',
    history: "La FASEG a été instituée pour doter les entreprises publiques et privées d'économistes chevronnés et de gestionnaires capables de piloter le développement économique national.",
    domains: ["Gestion des Entreprises", "Finance d'Entreprise", "Économie Internationale", "Comptabilité, Contrôle & Audit"],
    usefulInfo: "Organise régulièrement des Forums Emploi en partenariat avec l'association des banques et de la Chambre de Commerce et d'Industrie du Bénin.",
    contacts: {
      address: "Campus Principal d'Abomey-Calavi, Secteur FASEG",
      phone: "+229 21 36 02 40",
      email: "faseg.uac@uac.bj"
    },
    location: "Campus d'Abomey-Calavi, Abomey-Calavi, Bénin"
  },
  {
    id: 'epac',
    name: 'EPAC',
    fullName: 'École Polytechnique d\'Abomey-Calavi',
    universityId: 'uac',
    description: 'Grande école d\'ingénieurs préparant aux métiers du génie civil, génie électrique, informatique appliquée, biologie humaine et environnement.',
    themeColor: 'indigo',
    history: "Anciennement Collège Polytechnique Universitaire (CPU) fondé sous coopération canadienne, l'EPAC est devenue l'école polytechnique publique de référence formant les élites d'ingénieurs au Bénin.",
    domains: ["Génie Civil", "Génie Électrique & Informatique", "Production Halieutique", "Génie Chimique & Procédés"],
    usefulInfo: "Les études d'ingénieur durent 5 ans (Cycle préparatoire intégré de 2 ans puis cycle d'ingénieur de 3 ans) débouchant sur un diplôme reconnu par l'Ordre National des Ingénieurs du Bénin.",
    contacts: {
      address: "Campus d'Abomey-Calavi, Entrée Est EPAC",
      phone: "+229 21 36 12 10",
      email: "direction@epac.uac.bj"
    },
    location: "Campus d'Abomey-Calavi, Abomey-Calavi, Bénin"
  },

  // --- UP SCHOOLS ---
  {
    id: 'fm',
    name: 'FM (UP)',
    fullName: 'Faculté de Médecine de Parakou',
    universityId: 'up',
    description: 'Formation de médecins, cliniciens et professionnels de santé pour les structures hospitalières d\'Afrique.',
    themeColor: 'red',
    history: "Créée pour former les praticiens hospitaliers directement au contact des réalités du Nord et du Centre-Bénin. Travaille en étroite collaboration avec le Centre Hospitalier Universitaire Départemental (CHUD) de Parakou.",
    domains: ["Médecine Générale", "Pédiatrie", "Gynécologie-Obstétrique", "Chirurgie Générale"],
    usefulInfo: "Le stage d'immersion commence dès la troisième année au CHUD Parakou, permettant une pratique clinique rapide sous supervision professorale.",
    contacts: {
      address: "Secteur Hospitalier, Parakou",
      phone: "+229 23 61 02 11",
      email: "facmed@univ-parakou.bj"
    },
    location: "Quartier CHUD, Parakou, Bénin"
  },
  {
    id: 'fa',
    name: 'FA (UP)',
    fullName: 'Faculté d\'Agronomie de Parakou',
    universityId: 'up',
    description: 'Expertise universitaire en sciences agronomiques avec une spécialisation en agro-économie et technologies alimentaires des zones de savane.',
    themeColor: 'green',
    history: "Fondée en 2002 pour répondre aux défis climatiques spécifiques des savanes et encourager le développement des filières cotonnières, de cajou et de céréales au Bénin.",
    domains: ["Agronomie Tropicale", "Technologie Alimentaire", "Agro-économie", "Production Animale en Zone Sèche"],
    usefulInfo: "L'école dispose d'un laboratoire de nutrition animale réputé dans toute l'Afrique de l'Ouest.",
    contacts: {
      address: "Campus Central UP, Bloc Agronomie",
      phone: "+229 23 61 09 88",
      email: "fa.up@univ-parakou.bj"
    },
    location: "Campus Okédama, Parakou, Bénin"
  },
  {
    id: 'iut',
    name: 'IUT (UP)',
    fullName: 'Institut Universitaire de Technologie',
    universityId: 'up',
    description: 'Formations technologiques courtes et intensives en gestion des entreprises et informatique d\'organisation.',
    themeColor: 'blue',
    history: "L'IUT de Parakou a été créé pour combler le manque de techniciens supérieurs et d'assistants de gestion hautement qualifiés dans le tissu industriel et tertiaire national.",
    domains: ["Informatique de Gestion", "Gestion des Entreprises & Administrations", "Gestion des Transports & Logistique"],
    usefulInfo: "Le cursus dure 3 ans et comprend un stage obligatoire d'au moins 3 mois en entreprise pour l'obtention de la Licence Professionnelle.",
    contacts: {
      address: "Campus de l'IUT, Parakou",
      phone: "+229 23 61 14 05",
      email: "iut@univ-parakou.bj"
    },
    location: "Quartier Okédama, Parakou, Bénin"
  },

  // --- UNA SCHOOLS ---
  {
    id: 'ensta',
    name: 'ENSTA',
    fullName: 'École Nationale Supérieure des Sciences et Techniques Agronomiques',
    universityId: 'una',
    description: 'Formation d\'ingénieurs spécialisés en horticulture, aménagement paysager et foresterie durable.',
    themeColor: 'green',
    history: "Cette école d'élite a été créée sous l'égide de l'UNA pour former des experts capables de révolutionner l'horticulture maraîchère béninoise et de concevoir des aménagements éco-paysagers urbains et ruraux.",
    domains: ["Horticulture et Cultures Maraîchères", "Foresterie et Aménagement des Espaces Naturels", "Génie des Systèmes Irrigués"],
    usefulInfo: "Dispose d'une station horticole expérimentale pilote dotée de systèmes de micro-irrigation automatiques de pointe.",
    contacts: {
      address: "Campus de Djougou, République du Bénin",
      phone: "+229 21 11 00 12",
      email: "ensta@una.bj"
    },
    location: "Djougou, Bénin"
  },
  {
    id: 'ensbba',
    name: 'ENSBBA',
    fullName: 'École Nationale Supérieure de Biosciences et de Biotechnologies Appliquées',
    universityId: 'una',
    description: 'Pôle d\'excellence thématique pour la bio-ingénierie, la sécurité sanitaire des aliments et l\'analyse biomoléculaire.',
    themeColor: 'indigo',
    history: "Créée pour accompagner l'industrie agroalimentaire nationale et la recherche pharmaceutique grâce à la maîtrise des outils biotechnologiques modernes.",
    domains: ["Biotechnologies Végétales & Animales", "Contrôle Qualité & Sécurité Alimentaire", "Biochimie Appliquée"],
    usefulInfo: "Possède des laboratoires d'analyses de microbiologie alimentaire agréés par l'Agence Béninoise de Sécurité Sanitaire des Aliments (ABSSA).",
    contacts: {
      address: "Campus de Dassa-Zoumé, République du Bénin",
      phone: "+229 21 02 33 44",
      email: "ensbba@una.bj"
    },
    location: "Dassa-Zoumé, Bénin"
  },

  // --- UPF SCHOOLS ---
  {
    id: 'enset',
    name: 'ENSET',
    fullName: 'École Nationale Supérieure de l\'Enseignement Technique',
    universityId: 'upf',
    description: 'Formation d\'ingénieurs technologues et de professeurs d\'enseignement technique en informatique industrielle et ingénierie mécanique.',
    themeColor: 'blue',
    history: "L'ENSET de Porto-Novo est l'établissement pionnier au Bénin pour la formation des cadres et formateurs de l'enseignement technique professionnel.",
    domains: ["Génie Informatique & Systèmes", "Génie Électrotechnique", "Génie Mécanique & Robotique"],
    usefulInfo: "Bénéficie d'ateliers de fabrication mécanique assistée par ordinateur et de bancs d'essais d'électronique de puissance.",
    contacts: {
      address: "Campus de Lokossa / Porto-Novo, Bénin",
      phone: "+229 20 22 18 19",
      email: "enset@upf.bj"
    },
    location: "Porto-Novo, Bénin"
  },
];

export const MAJORS: Major[] = [
  {
    id: 'licence-informatique',
    name: 'Licence en Informatique',
    description: "La licence en informatique forme des professionnels capables de concevoir, développer, sécuriser et gérer des systèmes informatiques et d'ingénierie logicielle d'envergure.",
    duration: '3 ans',
    level: 'Niveau Bac (C, D, E, G3, DEAT)',
    format: 'Formation initiale',
    credits: '180 ECTS',
    language: 'Français',
    careers: [
      {
        name: 'Développeur Full-Stack',
        salary: '2 000 000 - 4 500 000 FCFA / an',
        themeColor: 'blue',
      },
      {
        name: 'Administrateur Réseaux & Cloud',
        salary: '2 200 000 - 3 800 000 FCFA / an',
        themeColor: 'purple',
      },
      {
        name: 'Analyste Programmeur',
        salary: '1 800 000 - 3 500 000 FCFA / an',
        themeColor: 'green',
      },
      {
        name: 'Chef de projet IT Junior',
        salary: '2 500 000 - 5 000 000 FCFA / an',
        themeColor: 'orange',
      },
    ],
    competences: [
      "Concevoir et développer des architectures web réactives et applications mobiles natives.",
      "Administrer des serveurs d'entreprise, réseaux locaux sécurisés et plateformes Cloud.",
      "Modéliser et interroger des bases de données relationnelles (SQL) et volumétries NoSQL.",
      "Conduire des cycles projets Agiles (Scrum, Kanban) au sein d'équipes pluridisciplinaires."
    ],
    programme: [
      { semester: "Semestre 1 & 2", details: "Introduction à l'algorithmique, structures de données linéaires, architecture des ordinateurs, anglais technique, mathématiques pour l'informatique." },
      { semester: "Semestre 3 & 4", details: "Programmation orientée objet (Java, Python), bases de données relationnelles, réseaux informatiques fondamentaux, développement web front-end." },
      { semester: "Semestre 5 & 6", details: "Cybersécurité opérationnelle, développement d'applications mobiles, initiation au Cloud Computing, stage pratique de 3 mois et soutenance de mémoire." }
    ],
    salairesInfo: "L'informatique est l'un des secteurs les plus dynamiques et rémunérateurs au Bénin. Les diplômés en informatique appliquée connaissent un taux d'insertion professionnelle de plus de 90% dans l'année suivant l'obtention du diplôme, que ce soit en entreprise privée, agence d'État, ou en freelance international.",
    faq: [
      { q: "Quel type d'ordinateur est requis pour cette formation ?", a: "Un ordinateur portable avec un processeur Core i5 ou Ryzen 5 minimum, 8 à 16 Go de RAM, et un disque dur SSD de 256 Go est vivement recommandé pour effectuer les travaux pratiques de programmation et de virtualisation." },
      { q: "Peut-on travailler en télétravail après ce diplôme ?", a: "Absolument. De nombreux développeurs formés dans nos instituts d'élite (IMSP, EPAC, IUT) travaillent depuis le Bénin pour des entreprises en Europe, au Canada ou aux États-Unis." }
    ]
  },
  {
    id: 'licence-sante-publique',
    name: 'Licence en Santé Publique',
    description: "Ce cursus pluridisciplinaire dote les étudiants d'expertises pointues pour planifier, évaluer et piloter des programmes de santé communautaire, d'épidémiologie et de nutrition.",
    duration: '3 ans',
    level: 'Niveau Bac (D, C, G3, DEAT)',
    format: 'Formation initiale & continue',
    credits: '180 ECTS',
    language: 'Français',
    careers: [
      {
        name: 'Coordonnateur de Projets de Santé',
        salary: '2 500 000 - 5 500 000 FCFA / an',
        themeColor: 'blue',
      },
      {
        name: 'Analyste Épidémiologiste de terrain',
        salary: '3 000 000 - 6 000 000 FCFA / an',
        themeColor: 'purple',
      },
      {
        name: 'Responsable Nutrition Communautaire',
        salary: '2 000 000 - 4 200 000 FCFA / an',
        themeColor: 'green',
      },
    ],
    competences: [
      "Concevoir et déployer des campagnes d'information et d'éducation pour la santé des populations.",
      "Réaliser des enquêtes épidémiologiques de terrain et analyser des données sanitaires à l'aide de logiciels spécialisés (EpiInfo, SPSS).",
      "Évaluer l'impact environnemental sur la santé humaine et planifier des mesures d'assainissement.",
      "Gérer les aspects budgétaires et logistiques de programmes de santé soutenus par des bailleurs internationaux."
    ],
    programme: [
      { semester: "Semestre 1 & 2", details: "Introduction à la santé publique, sociologie de la santé, anatomie et physiologie humaines, notions fondamentales d'hygiène et assainissement." },
      { semester: "Semestre 3 & 4", details: "Biostatistiques appliquées, bases de l'épidémiologie, nutrition et biochimie alimentaire, santé de la reproduction." },
      { semester: "Semestre 5 & 6", details: "Planification sanitaire, gestion de projet de santé, droit de la santé et éthique, stage professionnel obligatoire en hôpital de zone ou ONG." }
    ],
    salairesInfo: "Les diplômés intègrent principalement des ONG nationales et internationales, des agences de l'ONU (OMS, UNICEF), ou des structures étatiques de santé (Ministère de la Santé, directions départementales, hôpitaux de zone).",
    faq: [
      { q: "Quelles sont les qualités pour réussir dans cette filière ?", a: "Le sens de l'écoute, l'esprit d'équipe, une bonne maîtrise de l'analyse logique des données, et un réel intérêt pour les actions d'impact communautaire de terrain." },
      { q: "La formation donne-t-elle accès à des masters ?", a: "Oui, la formation permet de poursuivre en Master de Santé Publique, Master d'Épidémiologie, ou Master en Santé Environnementale à l'IRSP Ouidah." }
    ]
  },
  {
    id: 'licence-agronomie',
    name: 'Licence en Agronomie',
    description: "Formation d'ingénieurs d'exécution capables de piloter des exploitations agricoles modernes, de conduire la recherche d'amélioration variétale et de promouvoir l'agroécologie.",
    duration: '3 ans',
    level: 'Niveau Bac (D, C, DEAT, E)',
    format: 'Formation initiale & par alternance',
    credits: '180 ECTS',
    language: 'Français',
    careers: [
      {
        name: 'Gérant d\'Exploitation Agricole',
        salary: '2 400 000 - 4 800 000 FCFA / an',
        themeColor: 'blue',
      },
      {
        name: 'Conseiller Agricole de Territoire',
        salary: '1 800 000 - 3 600 000 FCFA / an',
        themeColor: 'purple',
      },
      {
        name: 'Responsable Production Agroalimentaire',
        salary: '2 200 000 - 4 200 000 FCFA / an',
        themeColor: 'green',
      },
    ],
    competences: [
      "Diagnostiquer la fertilité des sols et élaborer des plans de fertilisation écologique.",
      "Concevoir et installer des systèmes d'irrigation optimisés et économes en eau.",
      "Gérer l'élevage et l'amélioration de la santé animale d'une exploitation agricole.",
      "Planifier des stratégies de commercialisation à court et moyen terme des intrants et récoltes agricoles."
    ],
    programme: [
      { semester: "Semestre 1 & 2", details: "Biologie végétale, chimie organique, notions de pédologie, mathématiques appliquées aux sciences du vivant, agroclimatologie." },
      { semester: "Semestre 3 & 4", details: "Phytotechnie générale, agronomie des cultures de rente (coton, anacarde), zootechnie générale, machines et équipements agricoles." },
      { semester: "Semestre 5 & 6", details: "Économie rurale, gestion de l'exploitation, aménagement hydraulique, stage long de 4 mois en milieu paysan avec rédaction de rapport." }
    ],
    salairesInfo: "L'agriculture représentant le moteur principal du PIB béninois, la demande pour des compétences managériales et techniques en agronomie est très soutenue. De nombreux diplômés s'auto-emploient également en créant leurs propres fermes horticoles d'excellence.",
    faq: [
      { q: "Quelles sont les opportunités de bourses d'études pour ce cursus ?", a: "Le gouvernement béninois octroie de nombreuses bourses et allocations spéciales d'excellence aux étudiants méritants des séries scientifiques s'inscrivant en agronomie à l'UNA ou à la FSA UAC." },
      { q: "Le travail se fait-il uniquement sur le terrain ?", a: "Le travail allie harmonieusement analyses de laboratoires scientifiques (recherche biotechnologique), management de bureau (finance rurale, gestion), et accompagnement de terrain." }
    ]
  },
  {
    id: 'licence-economie',
    name: 'Licence en Économie et Gestion',
    description: "Prépare les bacheliers aux métiers de la finance d'entreprise, du contrôle de gestion, de la gestion des ressources humaines et de la banque commerciale.",
    duration: '3 ans',
    level: 'Niveau Bac (G2, G3, C, D)',
    format: 'Formation initiale',
    credits: '180 ECTS',
    language: 'Français',
    careers: [
      {
        name: 'Analyste Financier',
        salary: '2 400 000 - 5 000 000 FCFA / an',
        themeColor: 'blue',
      },
      {
        name: 'Contrôleur de Gestion Junior',
        salary: '2 100 000 - 4 200 000 FCFA / an',
        themeColor: 'purple',
      },
      {
        name: 'Gestionnaire de Portefeuille Client',
        salary: '1 800 000 - 3 600 000 FCFA / an',
        themeColor: 'green',
      },
    ],
    competences: [
      "Élaborer et interpréter des états financiers d'entreprises selon les normes SYSCOHADA révisées.",
      "Calculer et analyser les coûts de production pour proposer des mesures de réduction budgétaire.",
      "Construire et analyser des modèles macro-économiques pour guider des investissements stratégiques.",
      "Manager une force de vente ou superviser la gestion administrative du personnel d'une PME."
    ],
    programme: [
      { semester: "Semestre 1 & 2", details: "Microéconomie fondamentale, comptabilité générale de l'entreprise, mathématiques financières, sociologie économique, droit civil." },
      { semester: "Semestre 3 & 4", details: "Macroéconomie intermédiaires, comptabilité de gestion, statistique descriptive et probabilités, droit des affaires, marketing fondamental." },
      { semester: "Semestre 5 & 6", details: "Analyse financière d'entreprise, fiscalité des affaires, audit comptable et contrôle de gestion, stage de 3 mois dans une banque ou un cabinet d'expertise." }
    ],
    salairesInfo: "La finance et le management constituent des métiers d'une grande stabilité. Les diplômés de la FASEG ou de l'IUT de Parakou s'insèrent rapidement au sein des cabinets comptables, compagnies d'assurances, institutions de microfinance (PADME, ALIDe, etc.), et grandes entreprises de services.",
    faq: [
      { q: "La filière requiert-elle d'être excellent en mathématiques ?", a: "Un bon niveau d'arithmétique et d'analyse logique est nécessaire, notamment pour les examens d'économétrie, de statistique et de recherche opérationnelle." },
      { q: "Est-il possible d'ouvrir son propre cabinet après la licence ?", a: "La licence constitue le premier cycle. Pour ouvrir son cabinet d'expertise agréé CEMAC/ECOWAS, il est fortement conseillé de poursuivre jusqu'au Master et d'obtenir le Diplôme d'Expertise Comptable (DEC)." }
    ]
  },
  {
    id: 'licence-biotechnologie',
    name: 'Licence en Biosciences et Biotechnologies',
    description: "Une formation de pointe combinant biologie, biochimie et génie des procédés pour maîtriser l'utilisation de micro-organismes dans les secteurs médical, agronomique et alimentaire.",
    duration: '3 ans',
    level: 'Niveau Bac (D, C)',
    format: 'Formation initiale d\'excellence',
    credits: '180 ECTS',
    language: 'Français',
    careers: [
      {
        name: 'Technicien de Laboratoire R&D',
        salary: '2 200 000 - 4 000 000 FCFA / an',
        themeColor: 'blue',
      },
      {
        name: 'Responsable Contrôle Qualité Alimentaire',
        salary: '2 000 000 - 3 800 000 FCFA / an',
        themeColor: 'purple',
      },
      {
        name: 'Consultant en Bioprocédés',
        salary: '2 500 000 - 5 500 000 FCFA / an',
        themeColor: 'green',
      },
    ],
    competences: [
      "Maîtriser les techniques de manipulation et d'analyse d'ADN, ARN et protéines (PCR, électrophorèse).",
      "Isoler et cultiver des micro-organismes d'intérêt industriel (levures, bactéries lactiques) en bioréacteur.",
      "Auditer et certifier la sécurité microbiologique de lignes de production agroalimentaire.",
      "Rédiger des protocoles d'expérimentation biologique en respectant strictement les règles de biosécurité."
    ],
    programme: [
      { semester: "Semestre 1 & 2", details: "Biologie cellulaire, chimie générale et organique, biochimie structurale, mathématiques générales pour la biologie, biophysique." },
      { semester: "Semestre 3 & 4", details: "Génétique classique, microbiologie générale, biologie moléculaire fondamentale, enzymologie appliquée, statistiques biologiques." },
      { semester: "Semestre 5 & 6", details: "Génie génétique et bioprocédés, contrôle qualité alimentaire, biotechnologies végétales, stage de fin d'études de 3 mois en laboratoire agréé." }
    ],
    salairesInfo: "La biotechnologie est un domaine stratégique émergent en Afrique de l'Ouest. Les diplômés trouvent d'excellentes opportunités au sein des industries brassicoles (SOBEBRA), des laboratoires de contrôle qualité d'État (ANM), des cliniques de procréation médicalement assistée et des instituts de recherche agronomique.",
    faq: [
      { q: "Quelles sont les opportunités de poursuite d'études à l'international ?", a: "Le diplôme étant aligné sur le système LMD (180 ECTS), il bénéficie d'une excellente équivalence européenne et mondiale, facilitant l'accès à des bourses de Master en Europe ou au Canada." },
      { q: "Y a-t-il beaucoup de théorie ?", a: "La formation met un point d'honneur sur la pratique. Plus de 40% du volume horaire global est réalisé sous forme de Travaux Pratiques (TP) dans les laboratoires de l'ENSBBA à Dassa-Zoumé." }
    ]
  },
  {
    id: 'licence-lettres',
    name: 'Licence en Lettres Modernes',
    description: "Formation académique de haut niveau centrée sur la maîtrise de la communication écrite, l'histoire littéraire, l'analyse des médias et la sémiologie.",
    duration: '3 ans',
    level: 'Niveau Bac (A1, A2, B, D, G3)',
    format: 'Formation initiale',
    credits: '180 ECTS',
    language: 'Français',
    careers: [
      {
        name: 'Chargé de Communication',
        salary: '1 800 000 - 3 500 000 FCFA / an',
        themeColor: 'blue',
      },
      {
        name: 'Journaliste Rédacteur Web',
        salary: '1 500 000 - 3 200 000 FCFA / an',
        themeColor: 'purple',
      },
      {
        name: 'Enseignant de Lettres au Secondaire',
        salary: '1 400 000 - 2 800 000 FCFA / an',
        themeColor: 'green',
      },
    ],
    competences: [
      "Rédiger des contenus textuels complexes de manière fluide, persuasive, et dénuée d'imperfections syntaxiques.",
      "Analyser et synthétiser des corpus littéraires ou d'articles de presse pour en extraire les idées stratégiques.",
      "Piloter des projets d'édition éditoriale papier et administrer des contenus numériques de portails d'information.",
      "Animer des ateliers de communication verbale et conduire des séances de médiation interculturelle."
    ],
    programme: [
      { semester: "Semestre 1 & 2", details: "Grammaire descriptive du français, histoire de la littérature africaine, initiation à la linguistique générale, techniques d'expression écrite." },
      { semester: "Semestre 3 & 4", details: "Littérature française du XVIIe au XIXe siècle, sémiologie de l'image, théorie littéraire, communication de masse et journalisme, latin littéraire." },
      { semester: "Semestre 5 & 6", details: "Littérature comparée, communication d'entreprise, écriture numérique et SEO, stage professionnel de 2 mois en maison d'édition ou agence média." }
    ],
    salairesInfo: "La maîtrise parfaite du verbe et de la plume écrite reste recherchée à l'ère du digital. Les diplômés de la FLASH s'insèrent avec brio dans les métiers de l'éducation (enseignants de collèges), de la presse écrite et radiophonique, des agences de relations publiques, ou en tant que rédacteurs de contenus Web SEO.",
    faq: [
      { q: "Peut-on passer des concours après cette licence ?", a: "Absolument, ce diplôme est un excellent tremplin pour les concours de l'ENA (Administration), des écoles de Journalisme et de l'ENS pour devenir professeur certifié." },
      { q: "Quelles sont les options de spécialisation ?", a: "En troisième année, l'étudiant choisit une option parmi : Littérature & Enseignement, Journalisme & Communication, ou Sciences du Langage." }
    ]
  },
];

export const SCHOOL_MAJORS: SchoolMajor[] = [
  // --- IMSP (UAC) ---
  { schoolId: 'imsp', majorId: 'licence-informatique' },
  
  // --- EPAC (UAC) ---
  { schoolId: 'epac', majorId: 'licence-informatique' },
  
  // --- FSA (UAC) ---
  { schoolId: 'fsa', majorId: 'licence-agronomie' },

  // --- FASEG (UAC) ---
  { schoolId: 'faseg', majorId: 'licence-economie' },

  // --- FLASH (UAC) ---
  { schoolId: 'flash', majorId: 'licence-lettres' },

  // --- IRSP (UAC) ---
  { schoolId: 'irsp', majorId: 'licence-sante-publique' },

  // --- IUT (UP) ---
  { schoolId: 'iut', majorId: 'licence-informatique' },
  { schoolId: 'iut', majorId: 'licence-economie' },

  // --- FA (UP) ---
  { schoolId: 'fa', majorId: 'licence-agronomie' },

  // --- FM (UP) ---
  { schoolId: 'fm', majorId: 'licence-sante-publique' },

  // --- ENSTA (UNA) ---
  { schoolId: 'ensta', majorId: 'licence-agronomie' },

  // --- ENSBBA (UNA) ---
  { schoolId: 'ensbba', majorId: 'licence-biotechnologie' },

  // --- ENSET (UPF) ---
  { schoolId: 'enset', majorId: 'licence-informatique' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Aminatou S.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    role: 'Étudiante à l\'IRSP Ouidah',
    quote: "Grâce à Après Mon Bac, j'ai découvert ma passion pour la santé publique et trouvé toutes les informations nécessaires.",
  },
  {
    name: 'Kais D.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    role: 'Étudiant à l\'IMSP Porto-Novo',
    quote: "La plateforme m'a aidé à comprendre les débouchés de l'informatique théorique et à faire le bon choix d'institut.",
  },
  {
    name: 'Eunice T.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80',
    role: 'Diplômée de l\'IUT Parakou',
    quote: "J'ai pu comparer les offres de gestion entre la FASEG de l'UAC et l'IUT de Parakou pour choisir celle qui correspondait le mieux à mon projet d'insertion.",
  },
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
