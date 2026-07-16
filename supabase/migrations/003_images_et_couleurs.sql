-- Ajoute des visuels de campus (photographie générique libre de droits) pour les 8 universités
-- et une couleur de repère visuel par domaine pour les 64 écoles/instituts.
-- Aucune donnée factuelle n'est modifiée par cette migration.

UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'uac';
UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'up';
UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'unstim';
UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'una';
UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'uadc';
UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'iuep';
UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'ecoles-inter-etats';
UPDATE universites SET banner_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80' WHERE slug = 'seme-city';

-- Couleurs par grand domaine (ingénierie/numérique, agriculture/santé, lettres/arts, économie/gestion, droit/administration, sport/communication)

UPDATE ecoles SET theme_color = 'blue' WHERE slug IN (
  'centre-dappui-aux-ecoles-africaines-de-statistique-capesa',
  'institut-de-formation-et-de-recherche-demographique-iford',
  'ecole-africaine-des-metiers-de-larchitecture-et-de-lurbanisme-eamau',
  'ecole-centrale-de-casablanca',
  'ecole-superieure-multinationale-de-telecommunications-esmt',
  'ecole-de-linnovation-et-de-lexpertise-en-informatique-epitech',
  'institut-national-de-leau-ine',
  'institut-de-formation-et-de-recherche-en-informatique-ifri',
  'institut-de-mathematiques-et-de-sciences-physiques-imsp',
  'institut-du-cadre-de-vie-igate',
  'ecole-polytechnique-dabomey-calavi-epac',
  'faculte-des-sciences-techniques-fast',
  'faculte-des-sciences-et-techniques-de-natitingou-fast-natitingou',
  'institut-national-superieur-de-technologie-industrielle-insti',
  'institut-national-superieur-des-classes-preparatoires-aux-etudes-dingenieurs-ins',
  'ecole-nationale-superieure-de-genie-energetique-et-procedes-ensgep',
  'ecole-nationale-superieure-des-travaux-publics-enstp',
  'ecole-normale-superieure-de-lenseignement-technique-enset',
  'institut-universitaire-de-technologie-iut',
  'ecole-nationale-de-statistique-de-planification-et-de-demographie-enspd'
);

UPDATE ecoles SET theme_color = 'green' WHERE slug IN (
  'ecole-inter-etats-des-sciences-et-de-medecine-veterinaires-eismv',
  'metiers-de-lagriculture-iuep',
  'centre-inter-facultaire-de-formation-et-de-recherche-en-environnement-pour-le-de',
  'faculte-des-sciences-agronomiques-fsa',
  'faculte-des-sciences-de-la-sante-fss',
  'institut-national-medico-sanitaire-inmes',
  'institut-regional-de-sante-publique-irsp',
  'ecole-dagrobusiness-et-de-politiques-agricoles-eapa',
  'ecole-daquaculture-eaq',
  'ecole-dhorticulture-et-damenagement-des-espaces-verts-ehaev',
  'ecole-de-foresterie-tropicale-efort',
  'ecole-de-gestion-et-de-production-vegetale-et-semenciere-egpvs',
  'ecole-de-genie-rural-egr',
  'ecole-de-sociologie-rurale-et-de-vulgarisation-agricole-esrva',
  'ecole-des-sciences-et-techniques-de-conservation-et-transformation-des-produits-',
  'ecole-nationale-superieure-des-biosciences-et-biotechnologies-appliquees-ensbba',
  'faculte-dagronomie-fa',
  'faculte-de-medecine-fm',
  'institut-de-formation-en-soins-infirmiers-et-obstetricaux-ifsio',
  'ecole-nationale-de-formation-des-techniciens-superieurs-en-sante-publique-et-sur'
);

UPDATE ecoles SET theme_color = 'purple' WHERE slug IN (
  'africa-design-school',
  'faculte-des-lettres-arts-et-sciences-humaines-adjarra-flash-adjarra',
  'faculte-des-lettres-arts-langues-et-communications-fllac',
  'faculte-des-sciences-humaines-et-sociales-fashs-calavi',
  'institut-confucius',
  'institut-national-des-metiers-darts-darcheologie-et-de-la-culture-inmaac',
  'institut-de-langue-arabe-et-culture-islamique-ilaci',
  'ecole-normale-superieure-porto-novo-ens',
  'ecole-du-patrimoine-africain-epa',
  'ecole-normale-superieure-de-natitingou-ens-nati',
  'faculte-des-lettres-arts-et-sciences-humaines-flash'
);

UPDATE ecoles SET theme_color = 'orange' WHERE slug IN (
  'centre-de-formation-et-de-recherche-en-population-et-planification-regionale-cef',
  'faculte-des-sciences-economiques-et-de-gestion-faseg',
  'haute-ecole-regionale-de-commerce-international-herci',
  'ecole-nationale-deconomie-appliquee-et-de-management-eneam',
  'ufr-developpement-ufr-gd',
  'ufr-economie-et-gestion-cooperatives-ufr-egc',
  'ufr-financement-et-micro-financement-ufr-fmf',
  'faculte-de-sciences-economiques-et-de-gestion-faseg'
);

UPDATE ecoles SET theme_color = 'indigo' WHERE slug IN (
  'faculte-de-droit-et-de-science-politique-fadesp',
  'ecole-nationale-dadministration-ena',
  'faculte-de-droit-et-sciences-politiques-fdsp'
);

UPDATE ecoles SET theme_color = 'red' WHERE slug IN (
  'institut-national-de-la-jeunesse-de-leducation-physique-et-sportive-injeps',
  'ecole-nationale-des-sciences-et-techniques-de-la-communication-enstic'
);
