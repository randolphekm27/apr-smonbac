import React from 'react';
import { motion } from 'motion/react';
import { 
  Building, BookOpen, Clock, Award, Landmark, 
  MapPin, Phone, Mail, Sparkles, Compass, History, Info, ArrowRight
} from 'lucide-react';
import { SCHOOLS, UNIVERSITIES, getMajorsBySchool, getUniversityBySchool } from '../data';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface SchoolPageProps {
  schoolId: string;
  setNavigationState: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

export default function SchoolPage({ schoolId, setNavigationState }: SchoolPageProps) {
  const school = SCHOOLS.find(s => s.id === schoolId) || SCHOOLS[0];
  const university = getUniversityBySchool(school.id) || UNIVERSITIES[0];
  const majors = getMajorsBySchool(school.id);

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

  const colors = getPastelColorClass(school.themeColor);
  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A] py-10 min-h-screen selection:bg-[#F4C430]/30 selection:text-black" id={`school-detail-page-${school.id}`}>
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Back navigation & Header */}
        <div className="space-y-4">
          <button
            onClick={() => setNavigationState({ page: 'university-detail', universityId: university.id })}
            className="inline-flex items-center gap-1 text-xs font-black text-black/50 hover:text-[#E8B923] transition-colors cursor-pointer uppercase tracking-wider"
          >
            ← Retour à {university.fullName}
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F4C430]/10 px-3.5 py-1.5 text-xs font-black text-[#E8B923] uppercase tracking-wider">
                <Landmark className="h-3.5 w-3.5" />
                <span>{university.name} • École Spécialisée</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight">
                {school.fullName} ({school.name})
              </h1>
              <p className="text-xs text-[#1A1A1A]/40 font-bold uppercase tracking-wider">
                Affilié à l'université : <span className="text-black font-black">{university.fullName}</span>
              </p>
            </div>

            {/* Quick stats box */}
            <div className="bg-white border border-black/5 rounded-3xl p-5 shadow-sm flex items-center gap-4 shrink-0 lg:max-w-xs">
              <div className={`h-12 w-12 rounded-2xl ${colors.bg} flex items-center justify-center font-black text-lg shadow-inner`}>
                {school.name[0]}
              </div>
              <div>
                <span className="text-xl font-black text-[#1A1A1A] block leading-none">
                  {majors.length}
                </span>
                <span className="text-[9px] text-[#1A1A1A]/40 font-extrabold uppercase tracking-wider mt-1 block">
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
                <h2 className="text-lg font-black text-[#1A1A1A] flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#E8B923]" />
                  Présentation Générale
                </h2>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-medium">
                  {school.description}
                </p>
              </div>

              {school.history && (
                <div className="pt-6 border-t border-black/5 space-y-3">
                  <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                    <History className="h-4 w-4 text-[#E8B923]" />
                    Historique de l'Établissement
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/50 leading-relaxed font-medium">
                    {school.history}
                  </p>
                </div>
              )}

              {/* Domains Badges */}
              {school.domains && school.domains.length > 0 && (
                <div className="pt-6 border-t border-black/5 space-y-3">
                  <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                    <Compass className="h-4 w-4 text-[#E8B923]" />
                    Domaines et Secteurs d'Enseignement
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {school.domains.map((dom, dIdx) => (
                      <span 
                        key={dIdx}
                        className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-bold ${colors.bg} border ${colors.border}`}
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* list of all majors in this school */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-[#1A1A1A] flex items-center gap-2.5">
                  <BookOpen className="h-5.5 w-5.5 text-[#E8B923]" />
                  Catalogue des formations de l'école
                </h2>
                <p className="text-xs text-[#1A1A1A]/50 font-medium">
                  Explorez les diplômes de Licence officiels dispensés par {school.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {majors.map((major) => (
                  <motion.div
                    whileHover={{ 
                      y: -4, 
                      scale: 1.02,
                      borderColor: 'rgba(244,196,48,0.3)',
                      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
                    }}
                    key={major.id}
                    onClick={() => setNavigationState({ 
                      page: 'filiere-detail', 
                      universityId: university.id, 
                      schoolId: school.id, 
                      majorId: major.id 
                    })}
                    className="group bg-white rounded-[2rem] border border-black/5 p-6 shadow-sm transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    id={`major-card-link-${major.id}`}
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-[#F4C430]/10 px-2 py-1 text-[9px] font-black text-[#E8B923] uppercase tracking-wider">
                          Licence LMD
                        </span>
                        <span className="text-[10px] text-black/40 font-bold">• {major.duration}</span>
                      </div>
                      <h3 className="text-sm font-black text-[#1A1A1A] group-hover:text-[#E8B923] transition-colors leading-tight">
                        {major.name}
                      </h3>
                      <p className="text-xs text-[#1A1A1A]/50 line-clamp-2 leading-relaxed font-medium">
                        {major.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-black text-[#1A1A1A]/70 group-hover:text-black uppercase tracking-wider">
                      <span>Consulter la fiche formation</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#E8B923] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Useful info, contacts, location */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Useful info */}
            {school.usefulInfo && (
              <div className="bg-white border border-black/5 rounded-[2rem] p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#E8B923]" />
                  Infos Utiles & Ressources
                </h3>
                <p className="text-xs text-[#1A1A1A]/60 leading-relaxed font-medium">
                  {school.usefulInfo}
                </p>
              </div>
            )}

            {/* Contacts card */}
            {school.contacts && (
              <div className="bg-white border border-black/5 rounded-[2rem] p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#E8B923]" />
                  Secrétariat & Contacts
                </h3>
                <div className="space-y-3.5 text-xs text-[#1A1A1A]/60 font-medium">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#E8B923] shrink-0 mt-0.5" />
                    <p>{school.contacts.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#E8B923] shrink-0" />
                    <p>{school.contacts.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#E8B923] shrink-0" />
                    <p className="truncate">{school.contacts.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Location / Physical Map info */}
            {school.location && (
              <div className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-black/5">
                  <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#E8B923]" />
                    Localisation de l'école
                  </h3>
                  <p className="text-[11px] text-[#1A1A1A]/50 mt-1 font-medium">
                    {school.location}
                  </p>
                </div>
                {/* Simulated clean modern layout map */}
                <div className="h-40 bg-neutral-100 flex flex-col items-center justify-center p-4 text-center space-y-2 relative">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="h-10 w-10 rounded-full bg-[#F4C430]/10 text-[#E8B923] flex items-center justify-center text-sm relative z-10">
                    📍
                  </div>
                  <span className="text-[11px] font-extrabold text-black relative z-10">{school.name} - Ouest Afrique</span>
                  <span className="text-[9px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider relative z-10">République du Bénin</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
