import { School, Major, SchoolMajor } from './types';

export const UNA_NEW_SCHOOLS: School[] = [
  {
    "id": "una-ecole-d-aquaculture-eaq",
    "name": "EAq",
    "fullName": "Ecole d'Aquaculture (EAq)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "blue",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-d-horticulture-et-d-amenagement-des-espaces-verts-ehaev",
    "name": "EHAEV",
    "fullName": "Ecole d'Horticulture et d'Aménagement des Espaces Verts (EHAEV)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "purple",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-de-gestion-et-de-production-vegetale-et-semenciere-egpvs",
    "name": "EGPVS",
    "fullName": "Ecole de Gestion et de Production Végétale et Semencière (EGPVS)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "green",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa",
    "name": "ESTCTPA",
    "fullName": "Ecole des Sciences et Techniques de Conservation et de Transformation des Produits Agricoles (ESTCTPA)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "orange",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-de-genie-rural-egr",
    "name": "EGR",
    "fullName": "Ecole de Génie Rural (EGR)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "red",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-de-gestion-et-d-exploitation-des-systemes-d-elevage-egese",
    "name": "EGESE",
    "fullName": "Ecole de Gestion et d'Exploitation des Systèmes d'Elevage (EGESE)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "indigo",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa",
    "name": "EAPA",
    "fullName": "Ecole d'Agrobusiness et de Politiques Agricoles (EAPA)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "blue",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-de-sociologie-rurale-et-de-vulgarisation-agricole-esrva",
    "name": "ESRVA",
    "fullName": "Ecole de Sociologie rurale et de Vulgarisation Agricole (ESRVA)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "purple",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  },
  {
    "id": "una-ecole-de-foresterie-tropicale-efort",
    "name": "EForT",
    "fullName": "Ecole de Foresterie Tropicale (EForT)",
    "universityId": "una",
    "description": "Établissement spécialisé de l'Université Nationale d'Agriculture.",
    "themeColor": "green",
    "domains": [
      "Agriculture",
      "Sciences"
    ],
    "contacts": {
      "address": "République du Bénin",
      "phone": "+229 21 00 84 92",
      "email": "sec.general@una.bj"
    }
  }
];

export const UNA_NEW_MAJORS: Major[] = [
  {
    "id": "una-ecole-d-aquaculture-eaq-aquaculture",
    "name": "Aquaculture",
    "description": "Formation en Aquaculture à Ecole d'Aquaculture (EAq)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Chargé des entreprises aquacoles",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Technicien en production de poissons",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Technicien en production de crevettes, crabes, huitres et de moules",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien en conception et fabrication des aliments pour espèces aquacoles",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien en conception, fabrication et entretien d'aquarium",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Technicien en aquariologie",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Technicien en production, gestion et certification de semences aquacoles",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Conseiller/Assistant en aquaculture",
        "salary": "Variable",
        "themeColor": "green"
      }
    ],
    "bourse": 31,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Pêche et aquaculture",
      "DEAT/Production animale"
    ],
    "matieres": [
      "Pour C et D: SVT, Maths, SPCT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-d-aquaculture-eaq",
    "schoolName": "Ecole d'Aquaculture (EAq)"
  },
  {
    "id": "una-ecole-d-horticulture-et-d-amenagement-des-espaces-verts-ehaev-horticulture-et-amenagement-des-espaces-verts",
    "name": "Horticulture et Aménagement des espaces Verts",
    "description": "Formation en Horticulture et Aménagement des espaces Verts à Ecole d'Horticulture et d'Aménagement des Espaces Verts (EHAEV)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien en gestion des entreprises horticoles (cultures maraîchères, fruitières et ornementales)",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Conseiller des exploitations des secteurs horticoles",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Technicien en aménagement des Espaces Verts",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Technicien en production de semences et plants horticoles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Technicien en installation et gestion des systèmes d'irrigation en horticulture et espaces verts",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Technicien en gestion des ravageurs et nuisibles en horticulture et espaces verts",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Technicien en conception, installation et réalisation des plans d'aménagement des Espaces Verts",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien en production et distribution d'intrants et de produits horticoles",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Technicien en stockage et conditionnement des produits horticoles",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien en cultures hydroponiques et Aquaponiques",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Technicien en biotechnologies horticoles et création variétale",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Conseiller technique en construction des infrastructures et équipements horticoles",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Agent des cabinets d'expertise",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien de recherche en horticulture",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Fonctionnaire des organisations internationales de développement (Bioversity, ICRAF, World Vegetable, IRD, CIRAD, IITA etc.)",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Enseignant dans les établissements de formation (Ecoles, Lycées Agricoles, Universités, Instituts de formation)",
        "salary": "Variable",
        "themeColor": "red"
      }
    ],
    "bourse": 55,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/PV",
      "DEAT/Foresterie"
    ],
    "matieres": [
      "Pour C et D: SVT, Maths, SPCT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-d-horticulture-et-d-amenagement-des-espaces-verts-ehaev",
    "schoolName": "Ecole d'Horticulture et d'Aménagement des Espaces Verts (EHAEV)"
  },
  {
    "id": "una-ecole-de-gestion-et-de-production-vegetale-et-semenciere-egpvs-gestion-et-production-vegetale-et-semenciere",
    "name": "Gestion et Production Végétale et Semencière",
    "description": "Formation en Gestion et Production Végétale et Semencière à Ecole de Gestion et de Production Végétale et Semencière (EGPVS)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Entrepreneur en production végétale",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Technicien en production végétale",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Technicien en production de semences et gestionnaire des banques de semences",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien en gestion de la fertilité des sols",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Assistants en élaboration des plans d'entreprise de production végétale et semencière",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Technicien en protection des végétaux",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Technicien en biotechnologie végétale",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Assistant de recherche agricole",
        "salary": "Variable",
        "themeColor": "purple"
      }
    ],
    "bourse": 60,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/PV"
    ],
    "matieres": [
      "Pour C et D: SVT, Maths, SPCT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-de-gestion-et-de-production-vegetale-et-semenciere-egpvs",
    "schoolName": "Ecole de Gestion et de Production Végétale et Semencière (EGPVS)"
  },
  {
    "id": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa-industrie-des-produits-agro-alimentaires-et-nutrition-humaine-ipa-nh",
    "name": "Industrie des Produits Agro-Alimentaires et Nutrition Humaine (IPA-NH)",
    "description": "Formation en Industrie des Produits Agro-Alimentaires et Nutrition Humaine (IPA-NH) à Ecole des Sciences et Techniques de Conservation et de Transformation des Produits Agricoles (ESTCTPA)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur en Industrie et entreprises agroalimentaires (productions laitières, céréalières, viande, poissons, fruits et légumes, etc.)",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Producteur et conservateur de produits agroalimentaires",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Concepteur et fabricant d'aliments à base des produits agricoles",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Contrôleur de la qualité des produits agricoles et agroalimentaires",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Conseiller/Assistant/Encadreur en conservation et transformation des produits agricoles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Technicien en éducation nutritionnelle (ONG, entreprises, associations, autres)",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien des projets de nutrition",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Enseignant dans les lycées techniques agricoles",
        "salary": "Variable",
        "themeColor": "red"
      }
    ],
    "bourse": 23,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Nutrition et Technologie Alimentaire"
    ],
    "matieres": [
      "Pour C et D: SVT, Maths, SPCT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa",
    "schoolName": "Ecole des Sciences et Techniques de Conservation et de Transformation des Produits Agricoles (ESTCTPA)"
  },
  {
    "id": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa-industrie-des-bio-ressources-ibr",
    "name": "Industrie des Bio-Ressources (IBR)",
    "description": "Formation en Industrie des Bio-Ressources (IBR) à Ecole des Sciences et Techniques de Conservation et de Transformation des Produits Agricoles (ESTCTPA)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur en industrie des Bio-Ressources",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Technicien supérieur dans les industries cosmétiques et de phytothérapie: savons, lotion, huiles essentielles, parfums",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Producteur de biogaz",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Fabricant d'huiles végétales et de corps gras",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Fabricant d'aliments pour bétail domestique",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Conseiller en gestion des procédés post récoltes",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Technicien en traitements chimiques et organiques des produits agricoles en stock",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Enseignant dans les lycées techniques agricoles",
        "salary": "Variable",
        "themeColor": "blue"
      }
    ],
    "bourse": 22,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Nutrition et Technologie Alimentaire"
    ],
    "matieres": [
      "Pour C et D: SVT, Maths, SPCT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa",
    "schoolName": "Ecole des Sciences et Techniques de Conservation et de Transformation des Produits Agricoles (ESTCTPA)"
  },
  {
    "id": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa-genie-de-conditionnement-emballage-et-stockage-des-produits-alimentaires-gces",
    "name": "Génie de Conditionnement Emballage et Stockage des Produits Alimentaires (GCES)",
    "description": "Formation en Génie de Conditionnement Emballage et Stockage des Produits Alimentaires (GCES) à Ecole des Sciences et Techniques de Conservation et de Transformation des Produits Agricoles (ESTCTPA)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien en génie du conditionnement-emballages et stockage des produits agroalimentaires",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Technicien en contrôle de qualité et normes des produits agroalimentaires",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Concepteur d'étiquettes, d'emballages et conditionnements alimentaires",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Concepteur de structures de stockage et de conservation: greniers, cribs, silos, magasins/entrepôts",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Conseiller en emballages divers pour le conditionnement",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Enseignant dans les lycées techniques agricoles",
        "salary": "Variable",
        "themeColor": "blue"
      }
    ],
    "bourse": 24,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Nutrition et Technologie Alimentaire"
    ],
    "matieres": [
      "Pour C et D: SVT, Maths, SPCT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa",
    "schoolName": "Ecole des Sciences et Techniques de Conservation et de Transformation des Produits Agricoles (ESTCTPA)"
  },
  {
    "id": "una-ecole-de-genie-rural-egr-agroequipement",
    "name": "Agroéquipement",
    "description": "Formation en Agroéquipement à Ecole de Génie Rural (EGR)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Entreprise de conception et de fabrication des machines agricoles",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Société de maintenance des engins et équipements agricoles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Entreprise de motorisée",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Gérant de parc d'engins ou de machines agricoles",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Entreprise d'Installation et maintenance d'équipements agroindustriels",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Entreprises et Fermes mécanisées agricoles",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Industries de transformation et Unités de production agroalimentaire (usine d'égrenage, Brasseries, Huileries...)",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Sociétés de maintenance de Tracteurs et de machines agricoles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Cabinets d'audit et de Conseils agricoles",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Garage de réparation d'automobiles",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Administration publique",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Établissements d'enseignement technique",
        "salary": "Variable",
        "themeColor": "purple"
      }
    ],
    "bourse": 16,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F1",
      "F2",
      "F3",
      "DT/FM",
      "DT/CEMS",
      "DT/MA",
      "DT/Electrotech",
      "DEAT/AER"
    ],
    "matieres": [
      "Pour C et D: Maths, SPCT, Anglais",
      "Pour E, F1, DT/FM, DT/CEMS: Maths, SPCT, Construction mécanique",
      "Pour DT/MA, F2, F3 et DT/Electrotech: Maths, SPCT, Mécanique (DT/MA) ou Electrotechnique (F3, DT/Electrotech) ou EST (F2)",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-de-genie-rural-egr",
    "schoolName": "Ecole de Génie Rural (EGR)"
  },
  {
    "id": "una-ecole-de-genie-rural-egr-electrification-rurale-et-energies-renouvelables-erer",
    "name": "Electrification Rurale et Energies Renouvelables (ERER)",
    "description": "Formation en Electrification Rurale et Energies Renouvelables (ERER) à Ecole de Génie Rural (EGR)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Industries de transformation et Unités de Production (agroalimentaire, cimenterie, production de sucre, lait, brasserie, coton, huile de palme, etc.)",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Cabinets d'audit et de Conseils en énergies renouvelables",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Projets de construction de lignes électriques",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Projets d'électrification rurale",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Entreprises de BTP",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Garages automobiles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Entreprises travaillant dans le secteur du biogaz et autres énergies vertes",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Fermes et entreprises agropastorales",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Administration publique",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Établissements d'enseignement technique",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Entreprenariat sur les énergies vertes et le développement durable",
        "salary": "Variable",
        "themeColor": "purple"
      }
    ],
    "bourse": 17,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "F1",
      "F2",
      "F3",
      "DT/Electrotech",
      "DT/EAp"
    ],
    "matieres": [
      "Pour C, D, E et F1: Maths, SPCT, Français",
      "Pour F2, F3, et DT/Electrotech: Maths, SPCT, Electrotechnique ou EST (F2)",
      "Pour DT/EAp: Sciences Appliquées, Français, Etude Electronique"
    ],
    "schoolId": "una-ecole-de-genie-rural-egr",
    "schoolName": "Ecole de Génie Rural (EGR)"
  },
  {
    "id": "una-ecole-de-genie-rural-egr-infrastructures-rurales-et-assainissement",
    "name": "Infrastructures Rurales et Assainissement",
    "description": "Formation en Infrastructures Rurales et Assainissement à Ecole de Génie Rural (EGR)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Entreprise de travaux de constructions d'ouvrages / Réseaux hydrauliques ou hydro-agricoles",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Entreprise de travaux d'irrigation et de drainage",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Entreprise d'aménagement hydro-agricole",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Entreprise de travaux de voirie et réseaux d'adduction d'eau potable",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Sociétés d'eau et d'assainissement",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Stations d'épuration d'eaux usées",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Stations de traitements d'eau",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Services Techniques des Mairies",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Entreprises ou Sociétés de BTP",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Mission de contrôle",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Cabinets d'Architecture",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Laboratoires de Génie Civil",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Cabinets/Bureaux d'études et de conseils",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Établissements d'enseignement technique",
        "salary": "Variable",
        "themeColor": "blue"
      }
    ],
    "bourse": 16,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "E",
      "EA",
      "F1",
      "F4",
      "DT/BTP",
      "DT/DPB",
      "DT/OG",
      "DEAT/AER"
    ],
    "matieres": [
      "Pour C, D, F1 et E: Maths, SPCT, Français",
      "Pour F4, DT/BTP et DT/DPB: Maths, SPCT, RDM",
      "Pour EA et DT/OG: Maths, SPCT, Mobilisation des ressources en eau (EA)/DRT (DT/OG)",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-de-genie-rural-egr",
    "schoolName": "Ecole de Génie Rural (EGR)"
  },
  {
    "id": "una-ecole-de-gestion-et-d-exploitation-des-systemes-d-elevage-egese-productions-et-sante-animales",
    "name": "Productions et santé animales",
    "description": "Formation en Productions et santé animales à Ecole de Gestion et d'Exploitation des Systèmes d'Elevage (EGESE)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien des fermes d'embouche de bovins, ovins et caprins porcs, lapins et aulacodes",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Technicien des fermes de production de laits de vaches et chèvres",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Technicien en production des œufs de consommation",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien des centres d'accouvage pour la fourniture des poussins d'un jour",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Agent technique des Cliniques et pharmacies vétérinaires",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Entrepreneur en fabrication des aliments bétail",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Gestionnaire des Fermes Agro-vétérinaire",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Assistant des structures d'audites des systèmes de production animale",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Technicien des entreprises agro-alimentaires de transformation des produits animaux",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Assistant des structures de contrôle de qualité des Denrées Alimentaires d'Origine Animale",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Enseignant des lycées techniques agricoles",
        "salary": "Variable",
        "themeColor": "orange"
      }
    ],
    "bourse": 57,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/PA"
    ],
    "matieres": [
      "Pour C et D: Maths, SPCT, SVT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-de-gestion-et-d-exploitation-des-systemes-d-elevage-egese",
    "schoolName": "Ecole de Gestion et d'Exploitation des Systèmes d'Elevage (EGESE)"
  },
  {
    "id": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa-finance-agricole-fa",
    "name": "Finance Agricole (FA)",
    "description": "Formation en Finance Agricole (FA) à Ecole d'Agrobusiness et de Politiques Agricoles (EAPA)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Entrepreneur agricole",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Gestionnaire d'entreprises agricoles et agro-industrielles",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Gestionnaire de coopératives et associations de producteurs",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Analyste du marché des produits et intrants agricoles",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Mercaticien d'entreprises agricoles et agro-industrielles",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Agent commercial d'entreprise agricole et agroindustrielles",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Banquier agricole",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Assureur agricole",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Gestionnaire d'institutions de financement agricole",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Assistant de recherche et d'études socioéconomiques",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Conseiller en gestion d'entreprises agricoles et agroindustrielles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Assistant planificateur du développement agricole",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Analyste des politiques de développement agricole",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Enseignant de collèges et lycées agricoles",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Consultant",
        "salary": "Variable",
        "themeColor": "red"
      }
    ],
    "bourse": 16,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Toutes les options"
    ],
    "matieres": [
      "Pour C, D: Maths, SPCT, SVT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa",
    "schoolName": "Ecole d'Agrobusiness et de Politiques Agricoles (EAPA)"
  },
  {
    "id": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa-gestion-des-exploitations-agricoles-et-entreprises-agroalimentaires-geaea",
    "name": "Gestion des Exploitations Agricoles et Entreprises Agroalimentaires (GEAEA)",
    "description": "Formation en Gestion des Exploitations Agricoles et Entreprises Agroalimentaires (GEAEA) à Ecole d'Agrobusiness et de Politiques Agricoles (EAPA)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Entrepreneur agricole",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Gestionnaire d'entreprises agricoles et agro-industrielles",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Gestionnaire de coopératives et associations de producteurs",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Analyste du marché des produits et intrants agricoles",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Mercaticien d'entreprises agricoles et agro-industrielles",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Conseiller en gestion d'entreprises agricoles et agroindustrielles",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Consultant",
        "salary": "Variable",
        "themeColor": "indigo"
      }
    ],
    "bourse": 36,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Toutes les options"
    ],
    "matieres": [
      "Pour C, D: Maths, SPCT, SVT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa",
    "schoolName": "Ecole d'Agrobusiness et de Politiques Agricoles (EAPA)"
  },
  {
    "id": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa-marketing-des-intrants-et-produits-agricoles-mipa",
    "name": "Marketing des Intrants et Produits Agricoles (MIPA)",
    "description": "Formation en Marketing des Intrants et Produits Agricoles (MIPA) à Ecole d'Agrobusiness et de Politiques Agricoles (EAPA)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Analyste du marché des produits et intrants agricoles",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Mercaticien d'entreprises agricoles et agro-industrielles",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Agent commercial d'entreprise agricole et agroindustrielles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Assistant planificateur du développement agricole",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Analyste des politiques de développement agricole",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Consultant",
        "salary": "Variable",
        "themeColor": "indigo"
      }
    ],
    "bourse": 36,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Toutes les options"
    ],
    "matieres": [
      "Pour C, D: Maths, SPCT, SVT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa",
    "schoolName": "Ecole d'Agrobusiness et de Politiques Agricoles (EAPA)"
  },
  {
    "id": "una-ecole-de-sociologie-rurale-et-de-vulgarisation-agricole-esrva-sociologie-rurale-et-vulgarisation-agricole",
    "name": "Sociologie rurale et Vulgarisation Agricole",
    "description": "Formation en Sociologie rurale et Vulgarisation Agricole à Ecole de Sociologie rurale et de Vulgarisation Agricole (ESRVA)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Technicien supérieur des entreprises agricoles",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Technicien supérieur en Vulgarisateur/conseil agricole",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Technicien de recherche dans les institutions de recherche nationales et internationales dans le domaine de la sociologie rurale",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Conseiller technique de cabinet de conseil agricole et vulgarisation",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Conseiller technique de cabinet d'expertise agricole",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Conseiller technique aux affaires techniques et financières des banques",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Fonctionnaire d'Etat (ministères)",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Fonctionnaire des collectivités décentralisées et faitières paysannes",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien spécialisé en gestion des organisations paysannes et syndicats paysans",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Technicien spécialisé en gestion des parcs et aires protégées",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Conseiller technique en nutrition humaine",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Enseignants des établissements et lycées agricoles",
        "salary": "Variable",
        "themeColor": "indigo"
      },
      {
        "name": "Technicien en gouvernance des filières et chaines de valeur agricole",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Fonctionnaire des organisations de développement international (PNUD, Banque Mondiale, SNV, USAID etc.)",
        "salary": "Variable",
        "themeColor": "indigo"
      }
    ],
    "bourse": 43,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/(toutes options)"
    ],
    "matieres": [
      "Pour C, D: Maths, SPCT, SVT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-de-sociologie-rurale-et-de-vulgarisation-agricole-esrva",
    "schoolName": "Ecole de Sociologie rurale et de Vulgarisation Agricole (ESRVA)"
  },
  {
    "id": "una-ecole-de-foresterie-tropicale-efort-foresterie-tropicale",
    "name": "Foresterie Tropicale",
    "description": "Formation en Foresterie Tropicale à Ecole de Foresterie Tropicale (EForT)",
    "duration": "3 ans",
    "level": "Licence Professionnelle",
    "format": "Présentiel",
    "credits": "180",
    "language": "Français",
    "careers": [
      {
        "name": "Forestier Gestionnaire des ressources naturelles (Forêts, Eaux et Chasse)",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Forestier Gestionnaire des réserves de faune et des aires protégées",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Cartographe forestier",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Sylviculteur (Planteur de bois d'œuvre, de service et énergie d'essences autochtones et exotiques)",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Gestionnaire des Unités de productions sylvicoles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Opérateur pilote de drones (Véhicule aérien sans humain à bord) pour les collectes de données en forêt et traitement d'images",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Ebéniste d'art et designer",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Producteur de biocharbon et dendroénergie",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Spécialiste de la domestication et élevage des gibiers",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Spécialiste des façonnages et transformations du bois",
        "salary": "Variable",
        "themeColor": "blue"
      },
      {
        "name": "Producteur des produits forestiers non ligneux (PFNL y compris miel, viande d'élevage non conventionnel et champignons)",
        "salary": "Variable",
        "themeColor": "purple"
      },
      {
        "name": "Environnementaliste",
        "salary": "Variable",
        "themeColor": "red"
      },
      {
        "name": "Chercheur des cabinets d'étude d'impact environnemental et de laboratoire de recherche",
        "salary": "Variable",
        "themeColor": "green"
      },
      {
        "name": "Enseignant des lycées techniques agricoles",
        "salary": "Variable",
        "themeColor": "orange"
      },
      {
        "name": "Fonctionnaire dans les Ministères (MCVDD, MAEP), et des Organisations Non Gouvernementales (ONG)",
        "salary": "Variable",
        "themeColor": "red"
      }
    ],
    "bourse": 27,
    "aide_fpp": 0,
    "mode_entree": "Classement",
    "bac_recommande": [
      "C",
      "D",
      "DEAT/Foresterie"
    ],
    "matieres": [
      "Pour C, D: Maths, SPCT, SVT",
      "Pour DEAT: prendre en compte toutes les trois matières écrites"
    ],
    "schoolId": "una-ecole-de-foresterie-tropicale-efort",
    "schoolName": "Ecole de Foresterie Tropicale (EForT)"
  }
];

export const UNA_NEW_SCHOOL_MAJORS: SchoolMajor[] = [
  {
    "schoolId": "una-ecole-d-aquaculture-eaq",
    "majorId": "una-ecole-d-aquaculture-eaq-aquaculture"
  },
  {
    "schoolId": "una-ecole-d-horticulture-et-d-amenagement-des-espaces-verts-ehaev",
    "majorId": "una-ecole-d-horticulture-et-d-amenagement-des-espaces-verts-ehaev-horticulture-et-amenagement-des-espaces-verts"
  },
  {
    "schoolId": "una-ecole-de-gestion-et-de-production-vegetale-et-semenciere-egpvs",
    "majorId": "una-ecole-de-gestion-et-de-production-vegetale-et-semenciere-egpvs-gestion-et-production-vegetale-et-semenciere"
  },
  {
    "schoolId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa",
    "majorId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa-industrie-des-produits-agro-alimentaires-et-nutrition-humaine-ipa-nh"
  },
  {
    "schoolId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa",
    "majorId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa-industrie-des-bio-ressources-ibr"
  },
  {
    "schoolId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa",
    "majorId": "una-ecole-des-sciences-et-techniques-de-conservation-et-de-transformation-des-produits-agricoles-estctpa-genie-de-conditionnement-emballage-et-stockage-des-produits-alimentaires-gces"
  },
  {
    "schoolId": "una-ecole-de-genie-rural-egr",
    "majorId": "una-ecole-de-genie-rural-egr-agroequipement"
  },
  {
    "schoolId": "una-ecole-de-genie-rural-egr",
    "majorId": "una-ecole-de-genie-rural-egr-electrification-rurale-et-energies-renouvelables-erer"
  },
  {
    "schoolId": "una-ecole-de-genie-rural-egr",
    "majorId": "una-ecole-de-genie-rural-egr-infrastructures-rurales-et-assainissement"
  },
  {
    "schoolId": "una-ecole-de-gestion-et-d-exploitation-des-systemes-d-elevage-egese",
    "majorId": "una-ecole-de-gestion-et-d-exploitation-des-systemes-d-elevage-egese-productions-et-sante-animales"
  },
  {
    "schoolId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa",
    "majorId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa-finance-agricole-fa"
  },
  {
    "schoolId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa",
    "majorId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa-gestion-des-exploitations-agricoles-et-entreprises-agroalimentaires-geaea"
  },
  {
    "schoolId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa",
    "majorId": "una-ecole-d-agrobusiness-et-de-politiques-agricoles-eapa-marketing-des-intrants-et-produits-agricoles-mipa"
  },
  {
    "schoolId": "una-ecole-de-sociologie-rurale-et-de-vulgarisation-agricole-esrva",
    "majorId": "una-ecole-de-sociologie-rurale-et-de-vulgarisation-agricole-esrva-sociologie-rurale-et-vulgarisation-agricole"
  },
  {
    "schoolId": "una-ecole-de-foresterie-tropicale-efort",
    "majorId": "una-ecole-de-foresterie-tropicale-efort-foresterie-tropicale"
  }
];
