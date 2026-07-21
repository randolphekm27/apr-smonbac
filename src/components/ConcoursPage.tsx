import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, AlertCircle, Search, ArrowRight, MapPin, Sparkles, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ConcoursPageProps {
  setActivePage: (page: any) => void;
}

type EcoleConcours = {
  slug: string;
  nom: string;
  universite_nom: string;
  universite_slug: string;
  filieres: {
    nom: string;
    bourse: number;
    bac_recommande: string[];
  }[];
};

export default function ConcoursPage({ setActivePage }: ConcoursPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [ecoles, setEcoles] = useState<EcoleConcours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConcours() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('filieres')
          .select(`
            nom, bourse, bac_recommande,
            ecoles ( slug, nom, universites ( nom, slug ) )
          `)
          .eq('mode_entree', 'Concours');

        if (error) throw error;

        const grouped = new Map<string, EcoleConcours>();
        (data || []).forEach((row: any) => {
          const ecole = Array.isArray(row.ecoles) ? row.ecoles[0] : row.ecoles;
          if (!ecole) return;
          const universite = Array.isArray(ecole.universites) ? ecole.universites[0] : ecole.universites;
          if (!grouped.has(ecole.slug)) {
            grouped.set(ecole.slug, {
              slug: ecole.slug,
              nom: ecole.nom,
              universite_nom: universite?.nom || '',
              universite_slug: universite?.slug || '',
              filieres: [],
            });
          }
          grouped.get(ecole.slug)!.filieres.push({
            nom: row.nom,
            bourse: row.bourse || 0,
            bac_recommande: row.bac_recommande || [],
          });
        });
        setEcoles(Array.from(grouped.values()));
      } catch (err) {
        console.error('Error fetching concours:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchConcours();
  }, []);

  const filtered = ecoles.filter((e) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      e.nom.toLowerCase().includes(q) ||
      e.universite_nom.toLowerCase().includes(q) ||
      e.filieres.some((f) => f.nom.toLowerCase().includes(q))
    );
  });

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

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
              <span>Guide d'orientation 2025-2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main leading-none">
              Filières sur concours
            </h1>
            <p className="text-sm text-text-main/50 max-w-2xl leading-relaxed font-medium">
              Certaines écoles publiques recrutent sur concours plutôt que par classement du bac. Voici les établissements concernés d'après le guide officiel du MESRS, avec leurs quotas de bourses.
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
              <h4 className="text-xs font-black text-text-main">Calendrier des concours</h4>
              <p className="text-[10px] text-text-main/50 leading-relaxed font-medium">
                Les dates précises changent chaque année. Le choix des filières se fait sur le portail <span className="font-bold text-accent">apresmonbac.bj</span>, l'inscription au concours lui-même auprès de l'établissement ou sur e-Services Bénin.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-black/5 p-4 shadow-sm">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40 group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Rechercher une école ou une filière..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 hover:bg-black/10 focus:bg-white pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-accent/30 outline-none text-xs font-bold text-black transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative min-h-75 items-start">
          {loading ? (
            <div className="col-span-1 lg:col-span-2 text-center py-20 text-xs font-bold text-text-main/40">Chargement…</div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="group card-premium p-8 flex flex-col justify-between cursor-pointer"
                    onClick={() => setActivePage({ page: 'school-detail', universityId: item.universite_slug, schoolId: item.slug })}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] text-text-main/40 font-bold uppercase tracking-wider">
                        <GraduationCap className="h-3.5 w-3.5 text-accent" />
                        <span>{item.universite_nom}</span>
                      </div>
                      <h3 className="text-base font-black text-text-main group-hover:text-accent transition-colors leading-snug">
                        {item.nom}
                      </h3>
                    </div>

                    <div className="mt-6 border-t border-dashed border-black/10 pt-5 space-y-3">
                      <h4 className="text-xs font-black text-text-main uppercase tracking-wider">Filières sur concours :</h4>
                      <ul className="space-y-2 text-xs text-text-main/60 font-medium">
                        {item.filieres.map((f, i) => (
                          <li key={i} className="flex items-center justify-between gap-2 bg-bg-main rounded-xl px-3 py-2">
                            <span className="font-bold text-text-main">{f.nom}</span>
                            <span className="text-[10px] font-black text-accent shrink-0 flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {f.bourse > 0 ? `${f.bourse} places` : 'quota variable'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-text-main/50">
                        <MapPin className="h-4 w-4 text-accent" />
                        Voir l'école
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-accent group-hover:translate-x-1 transition-transform" />
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
                  <h4 className="text-sm font-black">Aucune école ne correspond à ta recherche</h4>
                  <p className="text-xs text-text-main/40 max-w-sm mx-auto font-medium">
                    Essaie un autre nom d'école, d'université ou de filière.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
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
            Bon à savoir
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-text-main/70 font-medium">
            <div className="space-y-2">
              <h4 className="font-extrabold text-black">1. Classement ou concours</h4>
              <p className="leading-relaxed text-text-main/60">
                Selon la filière, l'entrée se fait soit par classement national du bac, soit par concours propre à l'établissement. Vérifie le mode d'entrée sur la fiche de chaque filière.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-black">2. Prépare tes dossiers tôt</h4>
              <p className="leading-relaxed text-text-main/60">
                Certificat de nationalité, relevés de notes, extrait de naissance : mieux vaut les rassembler dès la publication des résultats du bac.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-black">3. Suis les canaux officiels</h4>
              <p className="leading-relaxed text-text-main/60">
                Le calendrier exact (dates d'épreuves, pièces à fournir) est publié par le MESRS et par chaque établissement : ce sont les seules sources à considérer comme définitives.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
