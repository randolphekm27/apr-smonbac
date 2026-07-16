import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Award, BookOpen, AlertCircle, Search, ArrowRight, Download, MapPin, Sparkles, Check } from 'lucide-react';

import { CONCOURS } from '../data';

interface ConcoursPageProps {
  setActivePage: (page: any) => void;
}

export default function ConcoursPage({ setActivePage }: ConcoursPageProps) {
  const [filterType, setFilterType] = useState<'all' | 'sciences' | 'lettres' | 'administration'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const concoursList = CONCOURS;

  const filteredConcours = concoursList.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const triggerDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
    }, 3000);
  };

  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black">
      <div className="mx-auto max-w-7xl px-6 space-y-12" id="concours-page-container">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3.5 py-1.5 text-xs font-black text-accent uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Calendrier Officiel 2026-2027</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main leading-none">
              Concours d'Excellence
            </h1>
            <p className="text-sm text-text-main/50 max-w-2xl leading-relaxed font-medium">
              Explorez et postulez aux concours d'entrée des grandes écoles et instituts d'élite de l'État béninois. Téléchargez les anciennes épreuves et optimisez votre préparation.
            </p>
          </motion.div>

          {/* Action / Help banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm max-w-xs flex gap-3 items-start"
          >
            <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-xs font-black text-text-main">Aide aux inscriptions</h4>
              <p className="text-[10px] text-text-main/50 leading-relaxed font-medium">
                Les dépôts officiels de dossiers se font sur le portail national <span className="font-bold text-accent underline">e-Services Bénin</span>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Filters and Live Search */}
        <div className="bg-white rounded-2xl border border-black/5 p-4 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {[
              { label: 'Tous les concours', val: 'all' },
              { label: 'Sciences & Techniques', val: 'sciences' },
              { label: 'Gestion & Administration', val: 'administration' },
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setFilterType(tab.val as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  filterType === tab.val
                    ? 'bg-accent text-black shadow-sm'
                    : 'bg-black/5 hover:bg-black/10 text-text-main/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40 group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Rechercher un concours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 hover:bg-black/10 focus:bg-white pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-accent/30 outline-none text-xs font-bold text-black transition-all"
            />
          </div>
        </div>

        {/* Concours Grid with premium cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredConcours.length > 0 ? (
              filteredConcours.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="group card-premium p-8 flex flex-col justify-between"
                >
                  {/* Badge info */}
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold text-white uppercase tracking-wider ${item.statusColor}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      {item.status}
                    </span>

                    <span className="bg-accent-light text-accent font-black text-[9px] px-2.5 py-1 rounded-md uppercase tracking-widest">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & description */}
                  <div className="space-y-3">
                    <h3 className="text-base font-black text-text-main hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-text-main/40 font-bold uppercase tracking-wider">
                      <span>{item.institution}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-main/60 leading-relaxed pt-2 font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Conditions / Details */}
                  <div className="mt-6 border-t border-dashed border-black/10 pt-5 space-y-3">
                    <h4 className="text-xs font-black text-text-main uppercase tracking-wider">Conditions d'éligibilité :</h4>
                    <ul className="space-y-1.5 text-xs text-text-main/60 font-medium">
                      {item.conditions.map((cond, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent font-black shrink-0">✔</span>
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Epreuves with clean inline downloading state */}
                  <div className="mt-5 bg-bg-main rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold text-text-main/40 block uppercase tracking-wider">Épreuves écrites indicatives</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.epreuves.map((epr, i) => (
                          <span key={i} className="bg-white border border-black/5 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                            {epr}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => triggerDownload(item.id)}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer ${
                        downloadingId === item.id 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-white hover:bg-accent hover:text-black border border-black/5 text-black/60 shadow-sm'
                      }`}
                      title="Télécharger les annales"
                    >
                      {downloadingId === item.id ? (
                        <Check className="h-4.5 w-4.5 stroke-3" />
                      ) : (
                        <Download className="h-4.5 w-4.5" />
                      )}
                    </motion.button>
                  </div>

                  {/* Footer info & Application link */}
                  <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-text-main/50">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>Limite d'inscription : <span className="text-text-main font-black">{item.dateLimite}</span></span>
                    </div>

                    <a
                      href="https://service-public.bj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-black bg-accent hover:bg-accent-hover text-black px-4.5 py-2.5 rounded-full transition-all shadow-sm shadow-accent/10 uppercase tracking-wider"
                    >
                      <span>S'inscrire</span>
                      <ArrowRight className="h-3.5 w-3.5 stroke-$1" />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="col-span-1 lg:col-span-2 text-center py-20 bg-white border border-black/5 rounded-[2.5rem] space-y-4"
              >
                <span className="text-4xl block">🔍</span>
                <h4 className="text-sm font-black">Aucun concours ne correspond à vos critères</h4>
                <p className="text-xs text-text-main/40 max-w-sm mx-auto font-medium">
                  Ajustez vos filtres de recherche ou sélectionnez une autre catégorie de concours d'État.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Informative advice strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] bg-linear-to-r from-amber-50 to-orange-50 border border-accent/10 p-8 md:p-12 shadow-sm"
        >
          <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2 uppercase tracking-tight">
            <BookOpen className="h-5 w-5 text-accent" />
            Conseils de préparation académique
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-text-main/70 font-medium">
            <div className="space-y-2">
              <h4 className="font-extrabold text-black">1. Constituez vos dossiers tôt</h4>
              <p className="leading-relaxed text-text-main/60">
                Préparez vos documents officiels (CIP certifié, certificat de nationalité) dès la sortie du BAC pour éviter les retards administratifs.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-black">2. Maîtrisez les annales</h4>
              <p className="leading-relaxed text-text-main/60">
                Les épreuves de sélection exigent une excellente maîtrise du programme de terminale avec une rigueur de rédaction universitaire.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-black">3. Suivez le calendrier d'État</h4>
              <p className="leading-relaxed text-text-main/60">
                Le Ministère publie des communiqués réguliers. Consultez fréquemment Après Mon Bac pour ne louper aucune date limite.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
