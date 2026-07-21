import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, GraduationCap, ChevronRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { University } from '../types';
import ImageWithFallback from './ImageWithFallback';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface UniversitesPageProps {
  setActivePage: (page: any) => void;
  setNavigationState?: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

export default function UniversitesPage({ setActivePage, setNavigationState }: UniversitesPageProps) {
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: easeOutExpo }
    }
  };

  const handleUniversityClick = (univId: string) => {
    if (setNavigationState) {
      setNavigationState({ page: 'university-detail', universityId: univId });
    } else {
      setActivePage('uac');
    }
  };

  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const { data, error } = await supabase.from('universites').select('*').order('nom');
        if (error) throw error;
        if (data) setUniversities(data);
      } catch (err) {
        console.error("Error fetching universities:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUniversities();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-bg-main flex items-center justify-center text-text-main font-bold">Chargement des universités...</div>;
  }

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black">
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Title and Header section with smooth slide in */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3.5 py-1.5 text-xs font-black text-accent uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Pôles Académiques de l'État</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main leading-tight">
            Les Hauts Lieux de Savoir du Bénin
          </h1>
          <p className="text-sm text-text-main/60 max-w-2xl font-medium leading-relaxed">
            Découvrez les quatre grandes universités publiques de la République du Bénin. Explorez les campus d'excellence, les écoles d'ingénierie et de médecine, et choisissez l'environnement idéal pour propulser votre parcours d'avenir.
          </p>
        </motion.div>
 
        {/* Large Panoramic Banner with smooth scale-up (Encarté avec coins de 40px) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOutExpo }}
          className="relative w-full h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white p-2.5 bg-white/40 backdrop-blur-sm"
        >
          <div className="w-full h-full rounded-4xl overflow-hidden relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"
              alt="Bâtiment Universitaire Béninois"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            {/* Elegant Dark/gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/40 to-transparent" />
            
            {/* Information inside banner */}
            <div className="absolute inset-y-0 left-8 md:left-14 flex flex-col justify-center space-y-4 text-white max-w-lg z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-accent uppercase">
                <Landmark className="h-3.5 w-3.5" />
                Patrimoine Académique National
              </span>
              <h2 className="text-2xl md:text-3.5xl font-black leading-snug">
                L'excellence académique à la portée de tous les bacheliers.
              </h2>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                Les universités d'Abomey-Calavi (UAC), de Parakou (UP), des Sciences, Technologies, Ingénierie et Mathématiques (UNSTIM) et Nationale d'Agriculture (UNA) accueillent et forment les futurs cadres, ingénieurs et leaders de notre république.
              </p>
            </div>
          </div>
        </motion.div>
 
        {/* 4 University Large Cards Grid with staggering */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {universities.map((univ) => {
            return (
              <motion.div
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                key={univ.id}
                role="button"
                tabIndex={0}
                onClick={() => handleUniversityClick(univ.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleUniversityClick(univ.slug);
                  }
                }}
                className="group card-premium overflow-hidden cursor-pointer flex flex-col h-full justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                id={`large-univ-card-${univ.id}`}
              >
                {/* Photo with beautiful overlay */}
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback
                    src={univ.banner_url || univ.logo_url}
                    alt={univ.nom}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-black text-black shadow-sm tracking-wider uppercase">
                    {univ.nom}
                  </div>
                </div>
 
                {/* Content Section */}
                <div className="p-7 grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-black text-text-main group-hover:text-accent transition-colors leading-tight">
                      {univ.nom}
                    </h3>
                    <p className="text-[11px] font-bold text-text-main/65 leading-tight">
                      {univ.nom}
                    </p>
                    <p className="text-xs text-text-main/60 leading-relaxed pt-2 line-clamp-3 font-medium">
                      {univ.description || 'Information à venir'}
                    </p>
                  </div>
 
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-black/5 text-center bg-bg-main/80 rounded-2xl p-3">
                    <div>
                      <span className="text-xs font-black text-text-main">{univ.stats_etudiants || '-'}</span>
                      <span className="text-[9px] text-text-main/65 block uppercase font-bold tracking-tight mt-0.5">Étudiants</span>
                    </div>
                    <div>
                      <span className="text-xs font-black text-text-main">{univ.stats_ecoles || '-'}</span>
                      <span className="text-[9px] text-text-main/65 block uppercase font-bold tracking-tight mt-0.5">Écoles</span>
                    </div>
                  </div>
                </div>
 
                {/* Bottom Interactive Link */}
                <div className="border-t border-black/5 px-7 py-4.5 flex items-center justify-between text-[11px] font-black tracking-wider uppercase text-text-main/70 group-hover:text-black group-hover:bg-accent/5 transition-all">
                  <span>Explorer les écoles et instituts</span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1.5 text-accent stroke-$1" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
 
        {/* Informative Help Box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] bg-white border border-black/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-1.5 max-w-xl">
            <h4 className="text-sm font-black text-text-main">Vous hésitez encore entre plusieurs universités ?</h4>
            <p className="text-xs text-text-main/60 font-medium leading-relaxed">
              Explorez la fiche de la "Licence en Métier de l'Informatique" à l'EPITECH (Sèmè City) pour voir un exemple concret de matières, de débouchés et de compétences visées.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (setNavigationState) {
                setNavigationState({ page: 'filiere-detail', majorId: 'licence-en-metier-de-linformatique' });
              } else {
                setActivePage('informatique');
              }
            }}
            className="rounded-full bg-accent hover:bg-accent-hover px-6 py-3.5 text-xs font-black text-black transition-all cursor-pointer whitespace-nowrap shadow-sm shadow-accent/$1 uppercase tracking-wider"
            id="compare-btn"
          >
            Découvrir la formation
          </motion.button>
        </motion.div>
 
      </div>
    </div>
  );
}
