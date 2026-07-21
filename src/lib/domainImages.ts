// Visuels de secours par grand domaine (même banque de photos Unsplash que
// celle déjà utilisée pour les bannières d'université dans la migration
// 003_images_et_couleurs.sql), pour donner une identité visuelle aux écoles
// et filières qui n'ont pas encore leur propre photo_couverture_url en base.
export type ThemeColor = 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'red';

const DOMAIN_IMAGES: Record<ThemeColor, string> = {
  blue: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', // ingénierie / numérique
  green: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80', // agriculture / santé
  purple: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', // lettres / arts / langues
  orange: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80', // économie / gestion
  indigo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80', // droit / administration
  red: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', // sport / communication
};

export function getDomainImage(themeColor?: string | null): string {
  const key = (themeColor as ThemeColor) in DOMAIN_IMAGES ? (themeColor as ThemeColor) : 'blue';
  return DOMAIN_IMAGES[key];
}
