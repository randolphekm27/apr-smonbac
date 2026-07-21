import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Landmark, MapPin, ArrowRight,
  ChevronRight, Sparkles, Phone, Mail, BadgeCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { University, School, Major } from '../types';
import ImageWithFallback from './ImageWithFallback';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface UniversityPageProps {
  universityId: string;
  setNavigationState: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

type TabType = 'presentation' | 'ecoles' | 'admission' | 'vie' | 'actualites' | 'contact';

export default function UniversityPage({ universityId, setNavigationState }: UniversityPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ecoles');
  
  const [university, setUniversity] = useState<University | null>(null);
  const [schools, setSchools] = useState<(School & { filieres: Major[] })[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: univData, error: univError } = await supabase
          .from('universites')
          .select('*')
          .eq('slug', universityId)
          .single();
          
        if (univError) throw univError;
        setUniversity(univData);

        if (univData) {
          const { data: schoolsData, error: schoolsError } = await supabase
            .from('ecoles')
            .select('*, filieres(*)')
            .eq('universite_id', univData.id);
            
          if (schoolsError) throw schoolsError;
          setSchools(schoolsData || []);
        }
      } catch (err) {
        console.error("Error fetching university data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [universityId]);

  if (loading) return <div className="min-h-screen bg-bg-main flex items-center justify-center font-bold">Chargement...</div>;
  if (!university) return <div className="min-h-screen bg-bg-main flex items-center justify-center font-bold">Université introuvable.</div>;

  const tabs = [
    { id: 'presentation', label: 'Présentation' },
    { id: 'ecoles', label: 'Écoles et Instituts' },
    { id: 'admission', label: 'Admissions' },
    { id: 'vie', label: 'Vie Étudiante' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'contact', label: 'Contact' },
  ];

  const getPastelColorClass = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50 text-blue-600', border: 'border-blue-100' };
      case 'purple': return { bg: 'bg-purple-50 text-purple-600', border: 'border-purple-100' };
      case 'green': return { bg: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' };
      case 'orange': return { bg: 'bg-amber-50 text-amber-600', border: 'border-amber-100' };
      case 'red': return { bg: 'bg-rose-50 text-rose-600', border: 'border-rose-100' };
      case 'indigo': return { bg: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-100' };
      default: return { bg: 'bg-gray-50 text-gray-600', border: 'border-gray-100' };
    }
  };

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black" id={`univ-detail-page-${university.id}`}>
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Top Header section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-accent uppercase bg-accent-light px-3.5 py-1.5 rounded-full tracking-wider">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Pôle Universitaire d'État
            </span>
            <h1 className="text-3xl md:text-5.5xl font-black text-text-main leading-tight tracking-tight">
              {university.nom}
            </h1>
            <p className="text-sm text-text-main/60 leading-relaxed max-w-xl font-medium">
              {university.description || 'Information à venir'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2.5rem] overflow-hidden border border-white p-2.5 bg-white/40 shadow-2xl h-64 group">
              <ImageWithFallback
                src={university.banner_url || university.logo_url}
                alt={`Campus de ${university.nom}`}
                className="w-full h-full object-cover rounded-4xl transition-transform duration-700 group-hover:scale-103"
              />
            </div>
          </motion.div>
        </div>

        {/* Horizontal strip of 4 statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
          className="rounded-[2.5rem] bg-white border border-black/5 p-6 shadow-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-black/5">
            <div className="flex flex-col items-center text-center p-3 lg:p-0">
              <Calendar className="h-4.5 w-4.5 text-accent mb-2.5" />
              <span className="text-xl font-black text-text-main">{university.annee_creation || '-'}</span>
              <span className="text-[9px] text-text-main/65 font-extrabold uppercase mt-1 tracking-wider">Année de création</span>
            </div>

            <div className="flex flex-col items-center text-center pt-5 lg:pt-0 p-3">
              <BadgeCheck className="h-4.5 w-4.5 text-accent mb-2.5" />
              <span className="text-xl font-black text-text-main">{university.statut || '-'}</span>
              <span className="text-[9px] text-text-main/65 font-extrabold uppercase mt-1 tracking-wider">Statut</span>
            </div>

            <div className="flex flex-col items-center text-center pt-5 lg:pt-0 p-3">
              <Landmark className="h-4.5 w-4.5 text-accent mb-2.5" />
              <span className="text-xl font-black text-text-main">{schools.length}</span>
              <span className="text-[9px] text-text-main/65 font-extrabold uppercase mt-1 tracking-wider">Écoles & Instituts d'élite</span>
            </div>

            <div className="flex flex-col items-center text-center pt-5 lg:pt-0 p-3">
              <MapPin className="h-4.5 w-4.5 text-accent mb-2.5" />
              <span className="text-xl font-black text-text-main">{university.stats_campuses || '-'}</span>
              <span className="text-[9px] text-text-main/65 font-extrabold uppercase mt-1 tracking-wider">Campus principaux</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Bar */}
        <div className="border-b border-text-main/$1 overflow-x-auto scrollbar-none flex whitespace-nowrap bg-bg-main/50 p-1.5 rounded-2xl">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-5 py-3 text-xs font-bold relative transition-all duration-300 cursor-pointer rounded-xl ${
                    isActive ? 'text-black font-extrabold' : 'text-text-main/60 hover:text-black font-semibold'
                  }`}
                  id={`univ-tab-trigger-${tab.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="univActiveTabBg"
                      className="absolute inset-0 bg-accent rounded-xl -z-10 shadow-sm shadow-accent/$1"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Tabs Content */}
        <div className="min-h-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            >
              {activeTab === 'ecoles' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-text-main">Écoles et Instituts d'Excellence</h3>
                    <p className="text-xs text-text-main/60 font-medium">
                      Découvrez les écoles spécialisées de {university.nom}. Cliquez sur une école pour en explorer les filières et l'identité.
                    </p>
                  </div>

                  {/* Dynamic Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {schools.map((school) => {
                      const colors = getPastelColorClass(school.theme_color || 'blue');
                      const schoolMajors = school.filieres || [];
                      return (
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          key={school.id}
                          role="button"
                          tabIndex={0}
                          className="group card-premium p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          onClick={() => setNavigationState({ page: 'school-detail', universityId: university.slug, schoolId: school.slug })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setNavigationState({ page: 'school-detail', universityId: university.slug, schoolId: school.slug });
                            }
                          }}
                          id={`school-card-${school.id}`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colors.bg} font-black text-sm shadow-inner uppercase`}>
                                {school.nom.substring(0, 3)}
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-text-main group-hover:text-accent transition-colors leading-snug">
                                  {school.nom}
                                </h4>
                              </div>
                            </div>

                            <p className="text-xs text-text-main/60 leading-relaxed font-medium line-clamp-2">
                              {school.description || 'Information à venir'}
                            </p>

                            {/* Principales filières interactives */}
                            {schoolMajors.length > 0 && (
                              <div className="pt-2 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-black/65 block">Formations dispensées</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {schoolMajors.slice(0, 3).map((major) => (
                                    <button
                                      key={major.id}
                                      onClick={() => setNavigationState({ 
                                        page: 'filiere-detail', 
                                        universityId: university.slug, 
                                        schoolId: school.slug, 
                                        majorId: major.slug 
                                      })}
                                      className="text-[9px] font-bold bg-accent/10 hover:bg-accent text-accent hover:text-black px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap"
                                    >
                                      {major.nom}
                                    </button>
                                  ))}
                                  {schoolMajors.length > 3 && (
                                    <span className="text-[9px] font-bold text-black/65 bg-black/5 px-2 py-1 rounded-md">
                                      +{schoolMajors.length - 3} de plus
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                            <span className="font-extrabold text-text-main/60 bg-bg-main px-3 py-1.5 rounded-lg text-[9px] tracking-wider uppercase">
                              {schoolMajors.length} {schoolMajors.length > 1 ? 'filières' : 'filière'}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-black text-accent uppercase tracking-wider">
                              Explorer l'école
                              <ChevronRight className="h-4 w-4 shrink-0 stroke-$1" />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'presentation' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-text-main">Présentation Institutionnelle</h3>
                  <div className="text-xs text-text-main/60 space-y-4 leading-relaxed max-w-3xl font-medium">
                    <p>
                      {university.presentation || 'Information à venir'}
                    </p>
                    {university.histoire && (
                      <div className="pt-4 border-t border-black/5 space-y-2">
                        <span className="font-extrabold text-black block text-xs">Notre Histoire</span>
                        <p>{university.histoire}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'admission' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-text-main">Grilles d'Admission & Conditions d'Entrée</h3>
                  <div className="text-xs text-text-main/60 space-y-4 leading-relaxed max-w-3xl font-medium">
                    <p>
                      {university.admission_info || "L'admission dans les universités publiques du Bénin se fait sur concours national, classement sur la plateforme numérique d'orientation du MESRS, ou sélection directe sur dossier pour l'inscription à titre payant."}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="p-6 rounded-2xl border border-black/5 bg-bg-main space-y-2.5">
                        <span className="font-black text-black block text-sm">Bourse d'Excellence d'État</span>
                        <p className="text-[11px] leading-relaxed text-text-main/60">
                          Sélection automatique gérée par le Ministère. Attribuée selon les performances exceptionnelles obtenues au Baccalauréat et le classement national.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-black/5 bg-bg-main space-y-2.5">
                        <span className="font-black text-black block text-sm">Inscription à Titre Privé</span>
                        <p className="text-[11px] leading-relaxed text-text-main/60">
                          Examen de dossier personnalisé. L'étudiant prend en charge ses frais de formation. Les tarifs annuels sont modérés et encadrés par le Ministère de l'Enseignement Supérieur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vie' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-text-main">Vie Universitaire & Communautaire</h3>
                  <p className="text-xs text-text-main/60 leading-relaxed max-w-3xl font-medium">
                    Chaque campus de l'université propose des installations sportives, des résidences universitaires, un restaurant universitaire à tarif social et des bibliothèques d'étude équipées. La vie associative y est riche et permet aux étudiants de développer leurs passions artistiques, citoyennes et scientifiques.
                  </p>
                </div>
              )}

              {activeTab === 'actualites' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-4">
                  <h3 className="text-lg font-black text-text-main">Actualités de l'université</h3>
                  <p className="text-xs text-text-main/60 leading-relaxed max-w-2xl font-medium">
                    Nous ne publions pas encore de fil d'actualités propre à chaque université. Pour les communiqués et échéances officielles (portail Après Mon Bac, calendrier de classement, journées portes ouvertes), consulte directement le site du MESRS ou le rectorat de l'établissement.
                  </p>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-text-main">Contact & localisation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-text-main/60 leading-relaxed font-medium">
                    <div className="space-y-2">
                      <span className="font-extrabold text-black block text-xs">📍 Ville</span>
                      <p>{university.ville || university.adresse || 'Information à venir'}</p>
                    </div>
                    {university.contact_telephone && (
                      <div className="space-y-2">
                        <span className="font-extrabold text-black block text-xs">📞 Secrétariat général</span>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5 text-accent" />
                          {university.contact_telephone}
                        </p>
                      </div>
                    )}
                    {university.contact_email && (
                      <div className="space-y-2">
                        <span className="font-extrabold text-black block text-xs">✉ Adresse email</span>
                        <p className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-accent" />
                          {university.contact_email}
                        </p>
                      </div>
                    )}
                  </div>
                  {!university.contact_telephone && !university.contact_email && (
                    <p className="text-[11px] text-text-main/65 font-medium pt-2 border-t border-black/5">
                      Coordonnées précises non communiquées dans le guide officiel : contacte directement le rectorat ou la scolarité de l'établissement.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
