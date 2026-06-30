import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Share2, Award, Clock, GraduationCap, BookOpen, 
  ChevronRight, ArrowRight, Laptop, Server, Database, Briefcase, Sparkles, Building
} from 'lucide-react';
import { MAJORS, getSchoolsByMajor } from '../data';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface FilierePageProps {
  majorId?: string;
  setNavigationState: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

type TabType = 'presentation' | 'competences' | 'debouches' | 'matieres' | 'salaires' | 'faq';

export default function FilierePage({ majorId, setNavigationState }: FilierePageProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('presentation');

  const major = MAJORS.find(m => m.id === majorId) || MAJORS[0];
  const offeringSchools = getSchoolsByMajor(major.id);

  const tabs = [
    { id: 'presentation', label: 'Présentation' },
    { id: 'competences', label: 'Compétences' },
    { id: 'debouches', label: 'Débouchés' },
    { id: 'matieres', label: 'Programme' },
    { id: 'salaires', label: 'Salaires' },
    { id: 'faq', label: 'Questions fréquentes' },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
    }, 4000);
  };

  const getPastelColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'green': return 'bg-emerald-50 text-emerald-600';
      case 'orange': return 'bg-amber-50 text-amber-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getCareerIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('dev') || lower.includes('informatique') || lower.includes('programmeur')) return <Laptop className="h-5 w-5" />;
    if (lower.includes('système') || lower.includes('réseau') || lower.includes('cloud')) return <Server className="h-5 w-5" />;
    if (lower.includes('analyste') || lower.includes('qualité') || lower.includes('contrôle')) return <Database className="h-5 w-5" />;
    return <Briefcase className="h-5 w-5" />;
  };

  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A] py-10 min-h-screen selection:bg-[#F4C430]/30 selection:text-black" id={`major-detail-page-${major.id}`}>
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Header container with enter animation */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-6"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#E8B923] uppercase bg-[#F4C430]/10 px-3.5 py-1.5 rounded-full tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Filière d'Avenir • Formation Professionnelle
            </span>
            <h1 className="text-3xl md:text-5.5xl font-black text-[#1A1A1A] leading-tight tracking-tight">
              {major.name}
            </h1>
            
            {/* Horizontal tags/badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { icon: GraduationCap, text: major.level },
                { icon: Clock, text: major.duration },
                { icon: Award, text: major.credits },
                { icon: BookOpen, text: major.format }
              ].map((badge, bIdx) => (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * bIdx, ease: easeOutExpo }}
                  key={bIdx}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-black/5 px-4 py-2 text-xs font-bold text-[#1A1A1A]/70 shadow-sm"
                >
                  <badge.icon className="h-3.5 w-3.5 text-[#E8B923]" />
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
                  : 'bg-white border-black/5 text-[#1A1A1A]/70 hover:border-[#F4C430]/30 hover:bg-[#F4C430]/5 hover:text-black'
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
                className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-xs font-black text-[#1A1A1A]/70 hover:border-[#F4C430]/30 hover:bg-[#F4C430]/5 hover:text-black transition-all cursor-pointer"
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
                    className="absolute left-0 -top-11 bg-[#0B0B0A] text-white px-3.5 py-2 rounded-xl text-[10px] font-bold z-20 whitespace-nowrap shadow-xl"
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
          className="text-sm text-[#1A1A1A]/50 leading-relaxed max-w-3xl font-medium"
        >
          {major.description}
        </motion.p>

        {/* Row of 4 key info cells */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
          className="rounded-[2.5rem] bg-white border border-black/5 p-6 shadow-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-black/5 text-center">
            <div className="flex flex-col items-center justify-center p-3 lg:p-0">
              <Clock className="h-5 w-5 text-[#E8B923] mb-2" />
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase tracking-wider block">Durée d'étude</span>
              <span className="text-sm font-black text-[#1A1A1A] mt-1">{major.duration}</span>
            </div>

            <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 p-3">
              <GraduationCap className="h-5 w-5 text-[#E8B923] mb-2" />
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase tracking-wider block">Niveau d'accès</span>
              <span className="text-sm font-black text-[#1A1A1A] mt-1">{major.level}</span>
            </div>

            <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 p-3">
              <Award className="h-5 w-5 text-[#E8B923] mb-2" />
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase tracking-wider block">Crédits ECTS</span>
              <span className="text-sm font-black text-[#1A1A1A] mt-1">{major.credits}</span>
            </div>

            <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 p-3">
              <BookOpen className="h-5 w-5 text-[#E8B923] mb-2" />
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase tracking-wider block">Langue d'étude</span>
              <span className="text-sm font-black text-[#1A1A1A] mt-1">{major.language}</span>
            </div>
          </div>
        </motion.div>

        {/* Horizontal tabs */}
        <div className="border-b border-[#1A1A1A]/5 overflow-x-auto scrollbar-none flex whitespace-nowrap bg-[#FAFAF8]/50 p-1.5 rounded-2xl">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-5 py-3 text-xs font-bold relative transition-all duration-300 cursor-pointer rounded-xl ${
                    isActive ? 'text-black' : 'text-[#1A1A1A]/50 hover:text-black'
                  }`}
                  id={`filiere-tab-${tab.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filiereActiveTabBg"
                      className="absolute inset-0 bg-[#F4C430] rounded-xl -z-10 shadow-sm shadow-[#F4C430]/20"
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
        <div className="min-h-[250px]">
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
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Descriptif Général du Programme</h3>
                  <p className="text-xs text-[#1A1A1A]/60 leading-relaxed max-w-3xl font-medium">
                    Le cursus de {major.name} est conçu sur mesure pour répondre aux normes régionales et internationales d'insertion. Axé sur une approche pédagogique par projet, il garantit l'acquisition d'un solide socle théorique complété par de nombreuses applications pratiques de terrain.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="p-5 rounded-2xl bg-[#FAFAF8] space-y-2">
                      <span className="font-extrabold text-xs text-black block">🚀 Normes CAMES</span>
                      <p className="text-[11px] text-[#1A1A1A]/50 leading-relaxed font-medium">Diplôme et maquettes de cours agréés par l'État béninois et certifiés par le CAMES.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#FAFAF8] space-y-2">
                      <span className="font-extrabold text-xs text-black block">💼 Immersion en Entreprise</span>
                      <p className="text-[11px] text-[#1A1A1A]/50 leading-relaxed font-medium">Stages professionnalisants et travaux pratiques réguliers pour une employabilité immédiate.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#FAFAF8] space-y-2">
                      <span className="font-extrabold text-xs text-black block">🛡️ Compétences Pratiques</span>
                      <p className="text-[11px] text-[#1A1A1A]/50 leading-relaxed font-medium">Conduite autonome de mini-projets de spécialité de bout en bout et mémoire de fin de cycle.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'competences' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-6 shadow-sm">
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Compétences Visées</h3>
                  {major.competences && major.competences.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#1A1A1A]/60 font-medium">
                      {major.competences.map((comp, cIdx) => (
                        <li key={cIdx} className="flex gap-3 items-start bg-[#FAFAF8] p-4 rounded-xl border border-black/5">
                          <span className="text-[#E8B923] font-black">✓</span>
                          {comp}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-[#1A1A1A]/60 font-medium">Informations sur les compétences en cours d'actualisation par le Ministère.</p>
                  )}
                </div>
              )}

              {activeTab === 'debouches' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-4 shadow-sm">
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Débouchés & Carrières</h3>
                  <p className="text-xs text-[#1A1A1A]/60 leading-relaxed max-w-2xl font-medium">
                    Ce secteur d'enseignement en pleine mutation offre d'excellents taux d'insertion professionnelle dans toute la sous-région ouest-africaine. Les diplômés intègrent rapidement le marché du travail dans les secteurs public et privé ou s'orientent vers des projets entrepreneuriaux innovants.
                  </p>
                </div>
              )}

              {activeTab === 'matieres' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-6 shadow-sm">
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Programme d'Études</h3>
                  {major.programme && major.programme.length > 0 ? (
                    <div className="divide-y divide-black/5 text-xs text-[#1A1A1A]/60 font-medium">
                      {major.programme.map((prog, pIdx) => (
                        <div key={pIdx} className="py-4 flex justify-between gap-4 flex-col sm:flex-row">
                          <span className="font-extrabold text-black shrink-0">{prog.semester}</span>
                          <span className="text-xs text-left sm:text-right">{prog.details}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#1A1A1A]/60 font-medium">Le programme détaillé par semestre est en cours de validation finale.</p>
                  )}
                </div>
              )}

              {activeTab === 'salaires' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-4 shadow-sm">
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Analyse des Salaires</h3>
                  <p className="text-xs text-[#1A1A1A]/60 leading-relaxed max-w-2xl font-medium">
                    {major.salairesInfo || "Le marché de l'emploi pour cette filière offre des grilles salariales stables avec des perspectives d'évolution rapides au sein des entreprises et agences nationales ou des institutions de coopération."}
                  </p>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-10 space-y-6 shadow-sm">
                  <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Questions Fréquentes</h3>
                  {major.faq && major.faq.length > 0 ? (
                    <div className="space-y-4 text-xs text-[#1A1A1A]/60 font-medium">
                      {major.faq.map((faqItem, fIdx) => (
                        <div key={fIdx} className={`space-y-1 ${fIdx > 0 ? 'pt-4 border-t border-black/5' : ''}`}>
                          <h4 className="font-black text-black">{faqItem.q}</h4>
                          <p className="leading-relaxed">{faqItem.a}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#1A1A1A]/60 font-medium">Aucune question fréquente enregistrée pour l'instant.</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section "Débouchés professionnels" */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#1A1A1A]">Débouchés professionnels</h3>
            <p className="text-xs text-[#1A1A1A]/50 font-medium">Explorez les rôles d'excellence accessibles immédiatement après l'obtention du diplôme.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {major.careers.map((career, idx) => {
              const bgClass = getPastelColorClass(career.themeColor);
              return (
                <motion.div
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    borderColor: 'rgba(244,196,48,0.3)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
                  }}
                  key={idx}
                  className="bg-white rounded-[2.5rem] border border-black/5 p-7 shadow-sm transition-all duration-300 flex flex-col justify-between"
                  id={`career-card-${idx}`}
                >
                  <div>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${bgClass} mb-5 shadow-inner`}>
                      {getCareerIcon(career.name)}
                    </div>
                    <h4 className="text-xs font-black text-[#1A1A1A] leading-snug">{career.name}</h4>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/5">
                    <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase block tracking-wider">Rémunération estimée</span>
                    <span className="text-xs font-black text-[#E8B923] block mt-1">{career.salary}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Section "Établissements proposant cette filière" (Bidirectionnal Navigation) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#1A1A1A]">Établissements proposant cette formation</h3>
            <p className="text-xs text-[#1A1A1A]/50 font-medium">Cette filière d'excellence est accréditée par l'État dans les écoles suivantes. Cliquez sur une carte pour explorer l'école.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offeringSchools.map((school) => {
              const colors = getPastelColorClass(school.themeColor);
              return (
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(244,196,48,0.3)', boxShadow: '0 15px 25px -5px rgba(0,0,0,0.03)' }}
                  key={school.id}
                  onClick={() => setNavigationState({ 
                    page: 'school-detail', 
                    universityId: school.universityId, 
                    schoolId: school.id 
                  })}
                  className="group bg-white rounded-[2.5rem] border border-black/5 p-6 shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  id={`major-school-offering-${school.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl ${colors} flex items-center justify-center font-black text-sm shrink-0 border border-black/5 shadow-inner`}>
                      {school.name[0]}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-[#1A1A1A] group-hover:text-[#E8B923] transition-colors">
                        {school.fullName} ({school.name})
                      </h4>
                      <span className="text-[9px] font-bold text-black/40 block tracking-tight uppercase">
                        {school.universityName}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-black text-[#E8B923] uppercase tracking-wider">
                    <span>Voir l'école</span>
                    <ChevronRight className="h-4 w-4 shrink-0 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
