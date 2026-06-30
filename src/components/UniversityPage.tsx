import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Users, Landmark, MapPin, ArrowRight, 
  ChevronRight, Award, Sparkles, Phone, Mail, BookOpen
} from 'lucide-react';
import { UNIVERSITIES, getSchoolsByUniversity, getMajorsBySchool } from '../data';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface UniversityPageProps {
  universityId: string;
  setNavigationState: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

type TabType = 'presentation' | 'ecoles' | 'admission' | 'vie' | 'actualites' | 'contact';

export default function UniversityPage({ universityId, setNavigationState }: UniversityPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('ecoles');
  
  const university = UNIVERSITIES.find(u => u.id === universityId) || UNIVERSITIES[0];
  const schools = getSchoolsByUniversity(university.id);

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

  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A] py-10 min-h-screen selection:bg-[#F4C430]/30 selection:text-black" id={`univ-detail-page-${university.id}`}>
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Top Header section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="lg:col-span-7 space-y-5"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#E8B923] uppercase bg-[#F4C430]/10 px-3.5 py-1.5 rounded-full tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Pôle Universitaire d'État
            </span>
            <h1 className="text-3xl md:text-5.5xl font-black text-[#1A1A1A] leading-tight tracking-tight">
              {university.fullName} ({university.name})
            </h1>
            <p className="text-sm text-[#1A1A1A]/50 leading-relaxed max-w-xl font-medium">
              {university.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2.5rem] overflow-hidden border border-white p-2.5 bg-white/40 shadow-2xl h-64 group">
              <img
                src={university.bannerImage}
                alt={`Campus de ${university.fullName}`}
                className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
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
              <Calendar className="h-4.5 w-4.5 text-[#E8B923] mb-2.5" />
              <span className="text-xl font-black text-[#1A1A1A]">{university.stats.creationYear}</span>
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase mt-1 tracking-wider">Année de création</span>
            </div>

            <div className="flex flex-col items-center text-center pt-5 lg:pt-0 p-3">
              <Users className="h-4.5 w-4.5 text-[#E8B923] mb-2.5" />
              <span className="text-xl font-black text-[#1A1A1A]">{university.stats.students}</span>
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase mt-1 tracking-wider">Étudiants</span>
            </div>

            <div className="flex flex-col items-center text-center pt-5 lg:pt-0 p-3">
              <Landmark className="h-4.5 w-4.5 text-[#E8B923] mb-2.5" />
              <span className="text-xl font-black text-[#1A1A1A]">{schools.length}</span>
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase mt-1 tracking-wider">Écoles & Instituts d'élite</span>
            </div>

            <div className="flex flex-col items-center text-center pt-5 lg:pt-0 p-3">
              <MapPin className="h-4.5 w-4.5 text-[#E8B923] mb-2.5" />
              <span className="text-xl font-black text-[#1A1A1A]">{university.stats.campuses}</span>
              <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase mt-1 tracking-wider">Campus principaux</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Bar */}
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
                  id={`univ-tab-trigger-${tab.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="univActiveTabBg"
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

        {/* Animated Tabs Content */}
        <div className="min-h-[400px]">
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
                    <h3 className="text-xl font-black text-[#1A1A1A]">Écoles et Instituts d'Excellence</h3>
                    <p className="text-xs text-[#1A1A1A]/50 font-medium">
                      Découvrez les écoles spécialisées de {university.fullName}. Cliquez sur une école pour en explorer les filières et l'identité.
                    </p>
                  </div>

                  {/* Dynamic Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {schools.map((school) => {
                      const colors = getPastelColorClass(school.themeColor);
                      const schoolMajors = getMajorsBySchool(school.id);
                      return (
                        <motion.div
                          whileHover={{ 
                            y: -6, 
                            scale: 1.02,
                            borderColor: 'rgba(244,196,48,0.3)',
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
                          }}
                          key={school.id}
                          className="group bg-white rounded-[2.5rem] border border-black/5 p-7 shadow-sm transition-all duration-300 flex flex-col justify-between cursor-pointer"
                          onClick={() => setNavigationState({ page: 'school-detail', universityId: university.id, schoolId: school.id })}
                          id={`school-card-${school.id}`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${colors.bg} font-black text-sm shadow-inner`}>
                                {school.name[0]}
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-[#1A1A1A] group-hover:text-[#E8B923] transition-colors leading-snug">
                                  {school.name}
                                </h4>
                                <p className="text-[9px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider mt-0.5">
                                  {school.fullName}
                                </p>
                              </div>
                            </div>

                            <p className="text-xs text-[#1A1A1A]/60 leading-relaxed font-medium line-clamp-2">
                              {school.description}
                            </p>

                            {/* Domaine principal */}
                            {school.domains && school.domains.length > 0 && (
                              <div className="pt-2">
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-black/40 block mb-1">Domaine Principal</span>
                                <span className="inline-block text-[10px] font-bold px-2.5 py-1 bg-black/5 rounded-md text-[#1A1A1A]/70">
                                  {school.domains[0]}
                                </span>
                              </div>
                            )}

                            {/* Principales filières interactives */}
                            {schoolMajors.length > 0 && (
                              <div className="pt-2 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-black/40 block">Formations dispensées</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {schoolMajors.slice(0, 3).map((major) => (
                                    <button
                                      key={major.id}
                                      onClick={() => setNavigationState({ 
                                        page: 'filiere-detail', 
                                        universityId: university.id, 
                                        schoolId: school.id, 
                                        majorId: major.id 
                                      })}
                                      className="text-[9px] font-bold bg-[#F4C430]/10 hover:bg-[#F4C430] text-[#E8B923] hover:text-black px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap"
                                    >
                                      {major.name}
                                    </button>
                                  ))}
                                  {schoolMajors.length > 3 && (
                                    <span className="text-[9px] font-bold text-black/40 bg-black/5 px-2 py-1 rounded-md">
                                      +{schoolMajors.length - 3} de plus
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                            <span className="font-extrabold text-[#1A1A1A]/50 bg-[#FAFAF8] px-3 py-1.5 rounded-lg text-[9px] tracking-wider uppercase">
                              {schoolMajors.length} {schoolMajors.length > 1 ? 'filières' : 'filière'}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-black text-[#E8B923] uppercase tracking-wider">
                              Explorer l'école
                              <ChevronRight className="h-4 w-4 shrink-0 stroke-[2.5]" />
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
                  <h3 className="text-lg font-black text-[#1A1A1A]">Présentation Institutionnelle</h3>
                  <div className="text-xs text-[#1A1A1A]/60 space-y-4 leading-relaxed max-w-3xl font-medium">
                    <p>
                      {university.presentation || university.description}
                    </p>
                    {university.history && (
                      <div className="pt-4 border-t border-black/5 space-y-2">
                        <span className="font-extrabold text-black block text-xs">Notre Histoire</span>
                        <p>{university.history}</p>
                      </div>
                    )}
                    <p className="font-black text-black flex items-center gap-1.5 text-xs mt-6">
                      <Award className="h-4.5 w-4.5 text-[#E8B923]" />
                      Diplômes reconnus au niveau national et certifiés par le CAMES.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'admission' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-[#1A1A1A]">Grilles d'Admission & Conditions d'Entrée</h3>
                  <div className="text-xs text-[#1A1A1A]/60 space-y-4 leading-relaxed max-w-3xl font-medium">
                    <p>
                      {university.admissionInfo || "L'admission dans les universités publiques du Bénin se fait sur concours national, classement sur la plateforme numérique d'orientation du MESRS, ou sélection directe sur dossier pour l'inscription à titre payant."}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="p-6 rounded-2xl border border-black/5 bg-[#FAFAF8] space-y-2.5">
                        <span className="font-black text-black block text-sm">Bourse d'Excellence d'État</span>
                        <p className="text-[11px] leading-relaxed text-[#1A1A1A]/60">
                          Sélection automatique gérée par le Ministère. Attribuée selon les performances exceptionnelles obtenues au Baccalauréat et le classement national.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-black/5 bg-[#FAFAF8] space-y-2.5">
                        <span className="font-black text-black block text-sm">Inscription à Titre Privé</span>
                        <p className="text-[11px] leading-relaxed text-[#1A1A1A]/60">
                          Examen de dossier personnalisé. L'étudiant prend en charge ses frais de formation. Les tarifs annuels sont modérés et encadrés par le Ministère de l'Enseignement Supérieur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vie' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-[#1A1A1A]">Vie Universitaire & Communautaire</h3>
                  <p className="text-xs text-[#1A1A1A]/60 leading-relaxed max-w-3xl font-medium">
                    Chaque campus de l'université propose des installations sportives, des résidences universitaires, un restaurant universitaire à tarif social et des bibliothèques d'étude équipées. La vie associative y est riche et permet aux étudiants de développer leurs passions artistiques, citoyennes et scientifiques.
                  </p>
                </div>
              )}

              {activeTab === 'actualites' && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-[#1A1A1A]">Actualités de l'Université</h3>
                  <ul className="space-y-4">
                    {[
                      { date: '30 Juin 2026', title: 'Plan d\'orientation numérique 2026 opérationnel' },
                      { date: '18 Juin 2026', title: 'Inauguration de nouveaux laboratoires d\'expérimentation scientifique' },
                      { date: '05 Mai 2026', title: 'Renforcement des partenariats industriels pour l\'immersion professionnelle' }
                    ].map((actu, idx) => (
                      <li key={idx} className="flex gap-4 items-center border-b border-black/5 pb-4 last:border-b-0">
                        <span className="text-[9px] font-black text-[#E8B923] bg-[#F4C430]/10 px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider">
                          {actu.date}
                        </span>
                        <span className="text-xs font-bold text-black hover:text-[#E8B923] cursor-pointer">
                          {actu.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'contact' && university.contacts && (
                <div className="rounded-[2.5rem] bg-white border border-black/5 p-8 md:p-12 space-y-6">
                  <h3 className="text-lg font-black text-[#1A1A1A]">Contact & Localisation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#1A1A1A]/60 leading-relaxed font-medium">
                    <div className="space-y-2">
                      <span className="font-extrabold text-black block text-xs">📍 Adresse Physique</span>
                      <p>{university.contacts.address}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-extrabold text-black block text-xs">📞 Secrétariat Général</span>
                      <p className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-[#E8B923]" />
                        {university.contacts.phone}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="font-extrabold text-black block text-xs">✉ Adresse Email</span>
                      <p className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-[#E8B923]" />
                        {university.contacts.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
