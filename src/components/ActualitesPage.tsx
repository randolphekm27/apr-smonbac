import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Megaphone, X, Check, ExternalLink, BookOpen } from 'lucide-react';

interface ActualitesPageProps {
  setActivePage: (page: any) => void;
}

interface GuideItem {
  id: number;
  title: string;
  desc: string;
  badge: string;
  fullContent: string;
}

export default function ActualitesPage({ setActivePage }: ActualitesPageProps) {
  const [selectedNews, setSelectedNews] = useState<GuideItem | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const guides: GuideItem[] = [
    {
      id: 1,
      title: 'Classement, concours, ou les deux : comment savoir ce qui s\'applique à ta filière ?',
      desc: 'La majorité des filières publiques recrutent par classement national du bac, mais certaines (santé, journalisme, sport...) passent par un concours propre à l\'établissement.',
      badge: 'Guide',
      fullContent: `Sur ce site, chaque fiche filière indique clairement son "mode d'entrée" : classement ou concours.

Le classement se fait automatiquement à partir de ta moyenne au bac (calculée avec les coefficients de ta série) une fois que tu as fait tes choix sur apresmonbac.bj. Le concours, lui, est propre à l'établissement : il faut s'y inscrire séparément et passer des épreuves écrites spécifiques.

Avant de faire tes choix, vérifie bien le mode d'entrée de chaque filière qui t'intéresse — ça change complètement la manière de te préparer.`
    },
    {
      id: 2,
      title: 'Bourse, aide/FPP ou titre payant : ce que ça veut vraiment dire',
      desc: 'Trois régimes existent pour financer ta scolarité dans le public, attribués automatiquement selon ton classement dans la filière choisie.',
      badge: 'Guide',
      fullContent: `Selon le guide officiel du MESRS, chaque filière publique a un quota de places boursières et un quota de places "aide/FPP" (formation partiellement payante), fixés chaque année.

Le classement se fait par filière, de la moyenne la plus forte à la plus faible. Les places boursières vont aux mieux classés, puis les places aide/FPP aux suivants. Au-delà de ces deux quotas, l'inscription se fait à titre entièrement payant.

Ces quotas sont différents pour chaque filière : tu les retrouves sur la fiche de chaque formation, dans la rubrique Orientation.`
    },
    {
      id: 3,
      title: 'Ce qui fait perdre ta bourse une fois attribuée',
      desc: 'Une règle simple mais stricte du classement national : le changement de filière après coup.',
      badge: 'À savoir',
      fullContent: `D'après le guide officiel d'information universitaire, tout changement de filière après le classement national entraîne la perte de l'allocation (bourse ou aide/FPP) qui avait été attribuée.

Autrement dit : une fois que tu es classé(e) dans une filière, mieux vaut être sûr(e) de ton choix avant de demander à en changer. Prends le temps de bien comparer les filières avant de valider tes 3 vœux sur la plateforme.`
    },
    {
      id: 4,
      title: 'Bac technique (DEAT) : quelles filières te sont ouvertes ?',
      desc: 'Le bac DEAT (technique agricole) donne accès à des filières spécifiques, en plus de certaines filières scientifiques classiques.',
      badge: 'Guide',
      fullContent: `Le DEAT (diplôme d'études agricoles tropicales) donne accès à de nombreuses filières agricoles, agroalimentaires et environnementales — notamment à l'Université Nationale d'Agriculture (UNA), à la Faculté des Sciences Agronomiques de l'UAC et à la Faculté d'Agronomie de l'UP.

Pour ces filières, les candidats DEAT sont évalués sur les trois matières écrites du diplôme plutôt que sur les matières classiques du bac général. Vérifie bien la mention "DEAT" dans le bac recommandé de chaque filière qui t'intéresse.`
    },
  ];

  const shareNews = (id: number, title: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/actualites`);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black" id="actualites-page-container">
      <div className="mx-auto max-w-7xl px-6 space-y-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3.5 py-1.5 text-xs font-black text-accent uppercase tracking-wider">
              <Megaphone className="h-3.5 w-3.5" />
              <span>Guides & Conseils</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main leading-tight">
              Comprendre le système d'orientation
            </h1>
            <p className="text-sm text-text-main/50 max-w-2xl leading-relaxed font-medium">
              Nous ne publions pas encore de fil d'actualités en direct. En attendant, voici des explications sourcées du guide officiel du MESRS pour t'aider à mieux comprendre le fonctionnement du classement, des bourses et des concours.
            </p>
          </div>
        </motion.div>

        {/* Pointer to official channels */}
        <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm flex items-start gap-3">
          <ExternalLink className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <p className="text-xs text-text-main/60 leading-relaxed font-medium">
            Pour les communiqués officiels et le calendrier de l'année en cours, consulte directement <span className="font-bold text-accent">apresmonbac.bj</span> et le site du MESRS. Nous ne relayons pas encore leurs communiqués en temps réel ici.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative min-h-75">
          <AnimatePresence mode="popLayout">
            {guides.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="group card-premium p-7 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-light text-accent">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <span className="bg-accent text-black font-black text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-text-main group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-text-main/60 leading-relaxed line-clamp-3 font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-black/5 flex items-center justify-between mt-5">
                  <span className="text-[10px] font-bold text-text-main/40 uppercase tracking-wider">
                    Par <span className="text-black font-black">Après Mon Bac</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => shareNews(item.id, item.title)}
                      className="p-2.5 rounded-xl bg-bg-main hover:bg-accent/10 hover:text-black text-black/60 transition-all cursor-pointer relative border border-black/5"
                      title="Partager"
                    >
                      {copiedId === item.id ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="flex items-center gap-1.5 bg-accent/10 hover:bg-accent hover:text-black text-accent px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer uppercase tracking-wider"
                    >
                      <span>Lire</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Elegant Modal for reading guide */}
        <AnimatePresence>
          {selectedNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNews(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-bg-main rounded-[2.5rem] border border-black/5 w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
              >
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors cursor-pointer z-20"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="p-8 pb-4 space-y-2 shrink-0 border-b border-black/5">
                  <span className="bg-accent text-black text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {selectedNews.badge}
                  </span>
                  <h3 className="text-black text-base md:text-lg font-black leading-tight">
                    {selectedNews.title}
                  </h3>
                </div>

                <div className="p-6 md:p-8 space-y-4 overflow-y-auto text-xs text-text-main/70 leading-relaxed font-medium">
                  <p className="whitespace-pre-line font-medium text-sm text-text-main/80 leading-relaxed">
                    {selectedNews.fullContent}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
