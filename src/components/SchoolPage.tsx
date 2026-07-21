import React from 'react';
import { motion } from 'motion/react';
import {
  Building, BookOpen, Clock, Award, Landmark,
  MapPin, Phone, Mail, Sparkles, Compass, History, Info, ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { School, Major, University } from '../types';
import ImageWithFallback from './ImageWithFallback';
import { getDomainImage } from '../lib/domainImages';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface SchoolPageProps {
  schoolId: string;
  setNavigationState: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

export default function SchoolPage({ schoolId, setNavigationState }: SchoolPageProps) {
  const [school, setSchool] = React.useState<(School & { filieres: Major[], universite: { nom: string, slug: string } }) | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchSchool() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ecoles')
          .select(`
            *,
            filieres(*),
            universite:universites(nom, slug)
          `)
          .eq('slug', schoolId)
          .single();
          
        if (error) throw error;
        // Supabase foreign table comes as object or array of objects depending on relation
        // 'universite' is a many-to-one so it's a single object (or null)
        if (data) {
          setSchool({
            ...data,
            universite: Array.isArray(data.universite) ? data.universite[0] : data.universite
          });
        }
      } catch (err) {
        console.error("Error fetching school:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchool();
  }, [schoolId]);

  if (loading) return <div className="min-h-screen bg-bg-main flex items-center justify-center font-bold">Chargement...</div>;
  if (!school) return <div className="min-h-screen bg-bg-main flex items-center justify-center font-bold">École introuvable.</div>;

  const university = school.universite;
  const majors = school.filieres || [];

  const getPastelColorClass = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50 text-blue-600', border: 'border-blue-100', text: 'text-blue-700' };
      case 'purple': return { bg: 'bg-purple-50 text-purple-600', border: 'border-purple-100', text: 'text-purple-700' };
      case 'green': return { bg: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100', text: 'text-emerald-700' };
      case 'orange': return { bg: 'bg-amber-50 text-amber-600', border: 'border-amber-100', text: 'text-amber-700' };
      case 'red': return { bg: 'bg-rose-50 text-rose-600', border: 'border-rose-100', text: 'text-rose-700' };
      case 'indigo': return { bg: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100', text: 'text-indigo-700' };
      default: return { bg: 'bg-gray-50 text-gray-600', border: 'border-gray-100', text: 'text-gray-700' };
    }
  };

  const colors = getPastelColorClass(school.theme_color || 'blue');
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black" id={`school-detail-page-${school.id}`}>
      <div className="mx-auto max-w-7xl px-6 space-y-12">

        {/* Hero banner : identité visuelle par domaine (école n'a pas encore de photo dédiée) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="relative w-full h-40 md:h-56 rounded-[2.5rem] overflow-hidden shadow-lg border border-white p-2 bg-white/40"
        >
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
            <ImageWithFallback
              src={school.photo_couverture_url || getDomainImage(school.theme_color)}
              alt={`Illustration de ${school.nom}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
          </div>
        </motion.div>

        {/* Back navigation & Header */}
        <div className="space-y-4">
          <button
            onClick={() => setNavigationState({ page: 'university-detail', universityId: university?.slug || '' })}
            className="inline-flex items-center gap-1 text-xs font-black text-black/65 hover:text-accent transition-colors cursor-pointer uppercase tracking-wider"
          >
            ← Retour à l'université
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3.5 py-1.5 text-xs font-black text-accent uppercase tracking-wider">
                <Landmark className="h-3.5 w-3.5" />
                <span>{university?.nom || 'Université'} • École Spécialisée</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main leading-tight">
                {school.nom}
              </h1>
              <p className="text-xs text-text-main/65 font-bold uppercase tracking-wider">
                Affilié à l'université : <span className="text-black font-black">{university?.nom}</span>
              </p>
            </div>

            {/* Quick stats box */}
            <div className="bg-white border border-black/5 rounded-3xl p-5 shadow-sm flex items-center gap-4 shrink-0 lg:max-w-xs">
              <div className={`h-12 w-12 rounded-2xl ${colors.bg} flex items-center justify-center font-black text-lg shadow-inner uppercase`}>
                {school.nom.substring(0, 3)}
              </div>
              <div>
                <span className="text-xl font-black text-text-main block leading-none">
                  {majors.length}
                </span>
                <span className="text-[9px] text-text-main/65 font-extrabold uppercase tracking-wider mt-1 block">
                  {majors.length > 1 ? 'Filières accréditées' : 'Filière accréditée'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Layout: Presentation & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Presentation & Domains & Majors */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* General presentation & history */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-10 space-y-6 shadow-sm"
            >
              <div className="space-y-2">
                <h2 className="text-lg font-black text-text-main flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  Présentation Générale
                </h2>
                <p className="text-sm text-text-main/70 leading-relaxed font-medium">
                  {school.description || 'Information à venir'}
                </p>
              </div>

                {school.histoire && (
                  <div className="pt-6 border-t border-black/5 space-y-3">
                    <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                      <History className="h-4 w-4 text-accent" />
                      Historique de l'établissement
                    </h3>
                    <p className="text-xs text-text-main/60 leading-relaxed font-medium">
                      {school.histoire}
                    </p>
                  </div>
                )}

            </motion.div>

            {/* list of all majors in this school */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-text-main flex items-center gap-2.5">
                  <BookOpen className="h-5.5 w-5.5 text-accent" />
                  Catalogue des formations de l'école
                </h2>
                <p className="text-xs text-text-main/60 font-medium">
                  Explorez les diplômes de Licence officiels dispensés par l'établissement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {majors.map((major) => (
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    key={major.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setNavigationState({
                      page: 'filiere-detail',
                      universityId: university?.slug || '',
                      schoolId: school.slug,
                      majorId: major.slug
                    })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setNavigationState({ page: 'filiere-detail', universityId: university?.slug || '', schoolId: school.slug, majorId: major.slug });
                      }
                    }}
                    className="group card-premium p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    id={`major-card-link-${major.id}`}
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-accent/10 px-2 py-1 text-[9px] font-black text-accent uppercase tracking-wider">
                          Licence LMD
                        </span>
                        <span className="text-[10px] text-black/65 font-bold">• {major.duree_etudes || '3 ans'}</span>
                      </div>
                      <h3 className="text-sm font-black text-text-main group-hover:text-accent transition-colors leading-tight">
                        {major.nom}
                      </h3>
                      <p className="text-xs text-text-main/60 line-clamp-2 leading-relaxed font-medium">
                        {major.description || 'Information à venir'}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-black text-text-main/70 group-hover:text-black uppercase tracking-wider">
                      <span>Consulter la fiche formation</span>
                      <ArrowRight className="h-3.5 w-3.5 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Useful info, contacts, location */}
          <div className="lg:col-span-4 space-y-6">
            


            {/* Contacts card : n'affiche que ce qu'on sait vraiment */}
            {(school.contact_adresse || school.contact_telephone || school.contact_email) && (
              <div className="bg-white border border-black/5 rounded-4xl p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  Secrétariat & contacts
                </h3>
                <div className="space-y-3.5 text-xs text-text-main/60 font-medium">
                  {school.contact_adresse && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p>{school.contact_adresse}</p>
                    </div>
                  )}
                  {school.contact_telephone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-accent shrink-0" />
                      <p>{school.contact_telephone}</p>
                    </div>
                  )}
                  {school.contact_email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-accent shrink-0" />
                      <p className="truncate">{school.contact_email}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rattachement / repère géographique, basé sur l'université de tutelle */}
            <div className="bg-white border border-black/5 rounded-4xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-black/5">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  Rattachement
                </h3>
                <p className="text-[11px] text-text-main/60 mt-1 font-medium">
                  Établissement de {university?.nom || 'l\'université'}
                </p>
              </div>
              <div className="h-32 bg-neutral-100 flex flex-col items-center justify-center p-4 text-center space-y-2 relative">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#19181A_1px,transparent_1px)] bg-size-[16px_16px]" />
                <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm relative z-10">
                  📍
                </div>
                <span className="text-[11px] font-extrabold text-black relative z-10">République du Bénin</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
