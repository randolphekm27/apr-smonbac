import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart, Share2, Award, Clock, GraduationCap, BookOpen,
  ChevronRight, Sparkles, Wallet, Check, Briefcase, Star,
  Building2, TrendingUp, Target, GitBranch, Globe2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Major, School, University } from '../types';
import ImageWithFallback from './ImageWithFallback';
import { getDomainImage } from '../lib/domainImages';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface FilierePageProps {
  majorId?: string;
  setNavigationState: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

type TabType = 'presentation' | 'competences' | 'debouches' | 'matieres';

export default function FilierePage({ majorId, setNavigationState }: FilierePageProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('presentation');

  type MajorWithSchool = Major & { ecoles: School & { universites: { nom: string, slug: string } } };
  const [major, setMajor] = useState<MajorWithSchool | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchMajor() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('filieres')
          .select(`
            *,
            ecoles (
              *,
              universites (nom, slug)
            )
          `)
          .eq('slug', majorId)
          .single();
          
        if (error) throw error;
        if (data) {
          // Flatten Supabase relation objects
          setMajor({
            ...data,
            ecoles: Array.isArray(data.ecoles) ? data.ecoles[0] : data.ecoles
          });
        }
      } catch (err) {
        console.error("Error fetching major:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMajor();
  }, [majorId]);

  if (loading) return <div className="min-h-screen bg-bg-main flex items-center justify-center font-bold">Chargement...</div>;
  if (!major) return <div className="min-h-screen bg-bg-main flex items-center justify-center font-bold">Filière introuvable.</div>;

  const school = major.ecoles;
  const university = school?.universites;

  const tabs = [
    { id: 'presentation', label: 'Présentation' },
    { id: 'competences', label: 'Compétences' },
    { id: 'debouches', label: 'Débouchés' },
    { id: 'matieres', label: 'Programme' },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
    }, 4000);
  };

  // Helper to parse debouches formatted with '### Title \n description'
  const parseDebouches = (text: string) => {
    if (!text) return [];
    if (text.includes('###')) {
      const blocks = text.split('###').filter(b => b.trim() !== '');
      return blocks.map(block => {
        const lines = block.split('\n').map(l => l.trim()).filter(l => l !== '');
        const title = lines[0];
        const desc = lines.slice(1).join(' ');
        return { title, desc };
      });
    }
    return text.split('\n')
      .map(d => d.replace(/^[-*•]\s*/, '').trim())
      .filter(d => d !== '')
      .map(d => ({ title: d, desc: '' }));
  };

  // Helper to parse standard text blocks with '### ' headings
  const renderTextWithHeadings = (text: string | null | undefined) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <span key={idx} className="block h-2"></span>;
      if (trimmed.startsWith('###')) {
        return <span key={idx} className="block font-black text-black mt-3 mb-1 text-[13px]">{trimmed.replace(/^###\s*/, '')}</span>;
      }
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
        return <span key={idx} className="block mb-1 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:h-1.5 before:w-1.5 before:bg-accent/50 before:rounded-full">{trimmed.replace(/^[-*•]\s*/, '')}</span>;
      }
      return <span key={idx} className="block mb-2">{trimmed}</span>;
    });
  };

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  const formatFcfa = (amount: number | null | undefined) => {
    if (!amount) return null;
    return `${amount.toLocaleString('fr-FR')} FCFA`;
  };

  // Short teaser for the hero (first sentence only) so the full text isn't repeated
  // verbatim in the "Présentation" tab just below.
  const getTeaser = (text: string | null | undefined) => {
    if (!text) return null;
    const firstSentence = text.split(/(?<=[.!?])\s+/)[0];
    return firstSentence.length < text.length ? firstSentence : text;
  };

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black" id={`major-detail-page-${major.id}`}>
      <div className="mx-auto max-w-7xl px-6 space-y-12">

        {/* Hero banner : photo dédiée si connue, sinon visuel de secours par domaine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="relative w-full h-48 md:h-64 rounded-[2.5rem] overflow-hidden shadow-xl border border-white p-2 bg-white/40"
        >
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
            <ImageWithFallback
              src={major.photo_couverture_url || getDomainImage(school?.theme_color)}
              alt={`Illustration de la filière ${major.nom}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-3">
              <span className="text-white font-black text-sm md:text-base drop-shadow">{school?.nom}</span>
              {major.niveau_difficulte && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-black text-black shadow-sm shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < major.niveau_difficulte! ? 'fill-accent text-accent' : 'text-black/15'}`} />
                  ))}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Header container with enter animation */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-6"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-accent uppercase bg-accent-light px-3.5 py-1.5 rounded-full tracking-wider">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                Filière d'Avenir • Formation Professionnelle
              </span>
              {major.nombre_avis && major.nombre_avis > 0 && major.note_moyenne && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-black bg-white border border-black/5 px-3 py-1.5 rounded-full shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  {major.note_moyenne.toFixed(1)}/5
                  <span className="text-text-main/60 font-bold">({major.nombre_avis} avis)</span>
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5.5xl font-black text-text-main leading-tight tracking-tight">
              {major.nom}
            </h1>
            {school && (
              <p className="text-xs text-text-main/65 font-bold uppercase tracking-wider">
                Établissement :{' '}
                <button
                  onClick={() =>
                    setNavigationState({
                      page: 'school-detail',
                      universityId: university?.slug || '',
                      schoolId: school.slug,
                    })
                  }
                  className="text-black hover:text-accent font-black underline decoration-accent/30 decoration-2 transition-colors cursor-pointer"
                >
                  {school.nom}
                </button>
              </p>
            )}
            
            {/* Horizontal tags/badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { icon: GraduationCap, text: major.niveau_entree || '-' },
                { icon: Clock, text: major.duree_etudes || '-' },
                { icon: Award, text: major.mode_entree || '-' },
                { icon: BookOpen, text: 'Français' }
              ].map((badge, bIdx) => (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * bIdx, ease: easeOutExpo }}
                  key={bIdx}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-black/5 px-4 py-2 text-xs font-bold text-text-main/70 shadow-sm"
                >
                  <badge.icon className="h-3.5 w-3.5 text-accent" />
                  {badge.text}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Favoris & Share Actions */}
          <div className="flex items-center gap-3 self-start">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsFavorited(!isFavorited)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-black transition-all duration-300 cursor-pointer ${
                isFavorited 
                  ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-md shadow-rose-100'
                  : 'bg-white border-black/5 text-text-main/70 hover:border-accent/30 hover:bg-accent/5 hover:text-black'
              }`}
              id="favorite-btn"
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-rose-600 stroke-rose-600' : ''}`} />
              <span>{isFavorited ? 'Ajouté aux favoris' : 'Favori'}</span>
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-xs font-black text-text-main/70 hover:border-accent/30 hover:bg-accent/5 hover:text-black transition-all cursor-pointer"
                id="share-btn"
              >
                <Share2 className="h-4 w-4" />
                <span>Partager</span>
              </motion.button>
              <AnimatePresence>
                {shareSuccess && (
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-0 -top-11 bg-text-main text-white px-3.5 py-2 rounded-xl text-[10px] font-bold z-20 whitespace-nowrap shadow-xl"
                  >
                    ✓ Lien copié !
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Description paragraph */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm text-text-main/60 leading-relaxed max-w-3xl font-medium"
        >
          {getTeaser(major.description) || 'Information à venir'}
        </motion.p>

        {/* Coût annuel / financement, quand disponible */}
        {major.cout_annuel_info && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
            className="rounded-[2.5rem] bg-white border border-black/5 p-6 md:p-8 shadow-md flex items-start gap-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-light text-accent">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-text-main/65 font-extrabold uppercase tracking-wider block mb-1">Financement de la formation</span>
              <p className="text-xs text-text-main/70 leading-relaxed font-medium">{major.cout_annuel_info}</p>
            </div>
          </motion.div>
        )}

        {/* Admission Info Grid if UAC major */}
        {(major.bourse !== undefined || major.aide_fpp !== undefined || major.mode_entree) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: easeOutExpo }}
            className="rounded-[2.5rem] bg-linear-to-br from-accent/5 to-transparent border border-accent/10 p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-2.5">
              <Award className="h-6 w-6 text-accent" />
              <div>
                <h3 className="text-base font-black text-text-main">
                  Conditions d'Admission & Quotas
                </h3>
                <p className="text-[10px] text-text-main/60 font-bold uppercase tracking-wider">
                  Données Officielles • Guide d'Information Universitaire 2025-2026
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm border border-black/5 rounded-2xl p-5 shadow-sm space-y-1">
                <span className="text-[9px] text-text-main/65 font-extrabold uppercase tracking-wider block">Places Boursières</span>
                <span className="text-2xl font-black text-emerald-600 block">
                  {major.bourse} place{major.bourse !== undefined && major.bourse > 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-black/5 rounded-2xl p-5 shadow-sm space-y-1">
                <span className="text-[9px] text-text-main/65 font-extrabold uppercase tracking-wider block">Places Aide / FPP</span>
                <span className="text-2xl font-black text-amber-600 block">
                  {major.aide_fpp} place{major.aide_fpp !== undefined && major.aide_fpp > 1 ? 's' : ''}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-black/5 rounded-2xl p-5 shadow-sm space-y-1">
                <span className="text-[9px] text-text-main/65 font-extrabold uppercase tracking-wider block">Mode d'Entrée</span>
                <span className="text-2xl font-black text-blue-600 block">
                  {major.mode_entree}
                </span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-black/5 rounded-2xl p-5 shadow-sm space-y-1">
                <span className="text-[9px] text-text-main/65 font-extrabold uppercase tracking-wider block">Séries de BAC</span>
                <span className="text-sm font-black text-text-main block truncate" title={major.bac_recommande?.join(', ')}>
                  {major.bac_recommande?.join(', ')}
                </span>
              </div>
            </div>

            {major.matieres && major.matieres.length > 0 && (
              <div className="pt-4 border-t border-black/5">
                <span className="text-[10px] text-text-main/65 font-extrabold uppercase tracking-wider block mb-2">
                  Matières d'évaluation / classement :
                </span>
                <div className="flex flex-wrap gap-2">
                  {major.matieres.map((subject, sIdx) => (
                    <span key={sIdx} className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-accent">
                      <Check className="h-3 w-3" />
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Horizontal tabs */}
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
                  id={`filiere-tab-${tab.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filiereActiveTabBg"
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

        {/* Dynamic tabs content area */}
        <div className="min-h-62.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            >
              {activeTab === 'presentation' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-6 shadow-sm">
                  <h3 className="text-sm font-black text-text-main uppercase tracking-wider">Présentation de la formation</h3>
                  <div className="text-xs text-text-main/60 leading-relaxed max-w-3xl font-medium">
                    {renderTextWithHeadings(major.description) || "Descriptif en cours de complément."}
                  </div>
                  {major.objectifs_pedagogiques && (
                    <div className="pt-4 border-t border-black/5 space-y-2">
                      <span className="font-extrabold text-xs text-black flex items-center gap-2">
                        <Target className="h-4 w-4 text-accent" />
                        Objectifs pédagogiques
                      </span>
                      <p className="text-[11px] text-text-main/60 leading-relaxed font-medium max-w-3xl">{major.objectifs_pedagogiques}</p>
                    </div>
                  )}
                  {major.conditions_admission && (
                    <div className="pt-4 border-t border-black/5 space-y-2">
                      <span className="font-extrabold text-xs text-black block">Comment on y entre</span>
                      <div className="text-[11px] text-text-main/60 leading-relaxed font-medium max-w-3xl">{renderTextWithHeadings(major.conditions_admission)}</div>
                    </div>
                  )}
                  {major.equivalence_internationale && (
                    <div className="pt-4 border-t border-black/5 space-y-2">
                      <span className="font-extrabold text-xs text-black flex items-center gap-2">
                        <Globe2 className="h-4 w-4 text-accent" />
                        Équivalence internationale
                      </span>
                      <p className="text-[11px] text-text-main/60 leading-relaxed font-medium max-w-3xl">{major.equivalence_internationale}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'competences' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-6 shadow-sm">
                  <h3 className="text-sm font-black text-text-main uppercase tracking-wider">Compétences visées</h3>
                  <div className="text-xs text-text-main/60 leading-relaxed max-w-3xl font-medium">
                    {renderTextWithHeadings(major.competences_visees) || "Informations en cours de complément."}
                  </div>
                  {major.projets_typiques && major.projets_typiques.length > 0 && (
                    <div className="pt-4 border-t border-black/5 space-y-3">
                      <span className="font-extrabold text-xs text-black flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-accent" />
                        Projets typiques réalisés durant la formation
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {major.projets_typiques.map((projet, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[11px] text-text-main/70 font-medium leading-relaxed bg-bg-main/60 border border-black/5 rounded-xl p-3">
                            <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            {projet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'debouches' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-2xl bg-accent-light text-accent flex items-center justify-center">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-text-main uppercase tracking-wider">Débouchés & Carrières</h3>
                      <p className="text-[10px] text-text-main/65 font-bold uppercase tracking-wider">Les métiers qui s'offrent à toi</p>
                    </div>
                  </div>

                  {major.debouches ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {parseDebouches(major.debouches).map((debouche, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-bg-main/40 border border-black/5 hover:border-accent/30 hover:bg-white hover:shadow-sm transition-all group">
                          <span className="shrink-0 mt-1 h-2 w-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors"></span>
                          <div>
                            <span className="text-xs text-text-main/90 font-bold leading-relaxed block">{debouche.title}</span>
                            {debouche.desc && <span className="text-[11px] text-text-main/60 font-medium mt-1.5 block leading-relaxed">{debouche.desc}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-text-main/60 leading-relaxed max-w-2xl font-medium">
                      Débouchés en cours de complément : renseigne-toi directement auprès de l'établissement.
                    </p>
                  )}

                  {(major.salaire_debutant_min || major.salaire_5ans_min) && (
                    <div className="pt-5 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {major.salaire_debutant_min && (
                        <div className="bg-bg-main rounded-2xl p-5 border border-black/5 space-y-1">
                          <span className="text-[9px] font-extrabold text-text-main/65 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingUp className="h-3.5 w-3.5 text-accent" />
                            Salaire estimé en début de carrière
                          </span>
                          <span className="text-sm font-black text-black block">
                            {formatFcfa(major.salaire_debutant_min)}{major.salaire_debutant_max ? ` – ${formatFcfa(major.salaire_debutant_max)}` : ''}
                          </span>
                        </div>
                      )}
                      {major.salaire_5ans_min && (
                        <div className="bg-bg-main rounded-2xl p-5 border border-black/5 space-y-1">
                          <span className="text-[9px] font-extrabold text-text-main/65 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingUp className="h-3.5 w-3.5 text-accent" />
                            Salaire estimé après 5 ans d'expérience
                          </span>
                          <span className="text-sm font-black text-black block">
                            {formatFcfa(major.salaire_5ans_min)}{major.salaire_5ans_max ? ` – ${formatFcfa(major.salaire_5ans_max)}` : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {(major.stage_obligatoire || major.stage_duree || major.stages_possibles) && (
                    <div className="pt-5 border-t border-black/5 space-y-2">
                      <span className="font-extrabold text-xs text-black block">Stages en entreprise</span>
                      <p className="text-[11px] text-text-main/60 leading-relaxed font-medium max-w-3xl">
                        {major.stage_obligatoire ? 'Stage obligatoire dans le cursus. ' : ''}
                        {major.stage_duree || major.stages_possibles}
                      </p>
                    </div>
                  )}

                  {major.entreprises_cibles && major.entreprises_cibles.length > 0 && (
                    <div className="pt-5 border-t border-black/5 space-y-2.5">
                      <span className="font-extrabold text-xs text-black flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-accent" />
                        Employeurs qui recrutent dans ce domaine au Bénin
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {major.entreprises_cibles.map((entreprise, i) => (
                          <span key={i} className="text-[11px] font-bold px-3 py-1.5 bg-bg-main border border-black/5 rounded-lg text-text-main/70">
                            {entreprise}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {major.poursuite_etudes && (
                    <div className="pt-5 border-t border-black/5 space-y-2">
                      <span className="font-extrabold text-xs text-black block">Poursuite d'études après le diplôme</span>
                      <p className="text-[11px] text-text-main/60 leading-relaxed font-medium max-w-3xl">{major.poursuite_etudes}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'matieres' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-6 shadow-sm">
                  <h3 className="text-sm font-black text-text-main uppercase tracking-wider">Programme d'études</h3>
                  <div className="text-xs text-text-main/60 leading-relaxed max-w-3xl font-medium">
                    {renderTextWithHeadings(major.programme_resume) || "Le contenu détaillé du programme est à demander directement à l'établissement."}
                  </div>

                  {major.cours_principaux && major.cours_principaux.length > 0 && (
                    <div className="pt-4 border-t border-black/5 space-y-3">
                      <span className="font-extrabold text-xs text-black block">Cours principaux, semestre par semestre</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {major.cours_principaux.map((cours, i) => (
                          <li key={i} className="flex items-center justify-between gap-2 text-[11px] text-text-main/70 font-medium bg-bg-main rounded-xl px-3.5 py-2.5 border border-black/5">
                            <span>{cours.nom}</span>
                            {cours.semestre && (
                              <span className="shrink-0 text-[9px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-md uppercase">S{cours.semestre}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {major.cours_optionnels && major.cours_optionnels.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="font-extrabold text-xs text-black block">Options & spécialisations</span>
                      <div className="flex flex-wrap gap-2">
                        {major.cours_optionnels.map((cours, i) => (
                          <span key={i} className="text-[11px] font-bold px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-accent">
                            {cours.nom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {major.matieres && major.matieres.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {major.matieres.map((subject, sIdx) => (
                        <span key={sIdx} className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 bg-bg-main border border-black/5 rounded-lg text-text-main/70">
                          {subject}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section "Établissements proposant cette filière" (Bidirectionnal Navigation) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-text-main">Établissements proposant cette formation</h3>
            <p className="text-xs text-text-main/60 font-medium">Cette filière d'excellence est accréditée par l'État dans les écoles suivantes. Cliquez sur une carte pour explorer l'école.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {school && (
              <motion.div
                whileTap={{ scale: 0.98 }}
                key={school.id}
                role="button"
                tabIndex={0}
                onClick={() => setNavigationState({
                  page: 'school-detail',
                  universityId: university?.slug || '',
                  schoolId: school.slug
                })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setNavigationState({ page: 'school-detail', universityId: university?.slug || '', schoolId: school.slug });
                  }
                }}
                className="group card-premium p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                id={`major-school-offering-${school.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm shrink-0 border border-black/5 shadow-inner uppercase`}>
                    {school.nom.substring(0,3)}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-text-main group-hover:text-accent transition-colors">
                      {school.nom}
                    </h4>
                    <span className="text-[9px] font-bold text-black/65 block tracking-tight uppercase">
                      {university?.nom}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-black text-accent uppercase tracking-wider">
                  <span>Voir l'école</span>
                  <ChevronRight className="h-4 w-4 shrink-0 stroke-$1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
