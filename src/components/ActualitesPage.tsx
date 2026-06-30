import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowRight, Share2, Sparkles, Clock, Megaphone, X, BookOpen, Check } from 'lucide-react';

interface ActualitesPageProps {
  setActivePage: (page: any) => void;
}

interface NewsItem {
  id: number;
  category: string;
  categoryLabel: string;
  title: string;
  date: string;
  time: string;
  author: string;
  desc: string;
  image: string;
  badge: string;
  fullContent?: string;
}

export default function ActualitesPage({ setActivePage }: ActualitesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ministere' | 'campus' | 'conseils'>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const newsList: NewsItem[] = [
    {
      id: 1,
      category: 'ministere',
      categoryLabel: 'Ministère (MESRS)',
      title: 'Lancement officiel du portail d\'orientation numérique pour l\'année académique 2026-2027',
      date: '28 Juin 2026',
      time: 'Il y a 2 jours',
      author: 'MESRS Bénin',
      desc: 'Le Ministère de l\'Enseignement Supérieur a annoncé l\'ouverture de la plateforme d\'orientation universitaire. Les bacheliers sont invités à formuler leurs trois choix de filière avant la fin de la semaine prochaine.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&h=350&q=80',
      badge: 'Urgent',
      fullContent: `Le Ministère de l'Enseignement Supérieur et de la Recherche Scientifique (MESRS) du Bénin a procédé ce matin au lancement officiel de la plateforme numérique d'orientation pour les bacheliers de la session de Juin 2026.

Ce nouvel outil vise à simplifier et à rendre totalement transparent le processus d'allocation des bourses d'études et de sélection des filières dans les universités publiques du Bénin (UAC, UP, UNA, UNSTIM).

Les bacheliers disposent d'un délai de deux semaines pour s'inscrire, soumettre leurs pièces justificatives numérisées et exprimer leurs trois vœux par ordre de préférence. Des séances d'accompagnement sont prévues dans tous les départements pour assister les candidats n'ayant pas un accès facile à internet.`
    },
    {
      id: 2,
      category: 'campus',
      categoryLabel: 'Vie de Campus',
      title: 'UAC : Journées Portes Ouvertes d\'orientation sur le campus d\'Abomey-Calavi',
      date: '25 Juin 2026',
      time: 'Il y a 5 jours',
      author: 'Rectorat UAC',
      desc: 'Les écoles et facultés classiques de l\'Université d\'Abomey-Calavi ouvrent leurs portes aux futurs étudiants pour les aider à comprendre les parcours LMD, les débouchés professionnels et les options de bourses d\'études.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=350&q=80',
      badge: 'Événement',
      fullContent: `Le Rectorat de l'Université d'Abomey-Calavi (UAC) a le plaisir d'inviter les bacheliers et leurs parents aux Journées Portes Ouvertes (JPO) qui se tiendront du 2 au 5 Juillet 2026 sur le campus principal d'Abomey-Calavi.

Cet événement annuel est l'occasion parfaite pour rencontrer les doyens, directeurs, enseignants et étudiants des différents instituts d'élite (ENEAM, ENS, FAST, FLASH, EPAC). Des stands d'information présenteront en détail les maquettes pédagogiques, les critères d'accès, ainsi que le fonctionnement du système LMD.`
    },
    {
      id: 3,
      category: 'conseils',
      categoryLabel: 'Conseils pratiques',
      title: 'Comment choisir sa filière selon sa série de BAC (C, D, G2, G3) ?',
      date: '20 Juin 2026',
      time: 'Il y a 10 jours',
      author: 'Après Mon BAC',
      desc: 'Évitez les erreurs courantes d\'orientation : ne choisissez pas une filière uniquement par effet de mode. Analyse des critères d\'âge et de notes minimales exigées pour chaque école publique béninoise.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&h=350&q=80',
      badge: 'Guide',
      fullContent: `L'obtention du baccalauréat est une étape charnière. Cependant, la réussite future dépend grandement de la qualité de votre orientation académique.

Dans ce guide détaillé, nos experts analysent les meilleures correspondances de filières pour chaque série :
- BAC C & E : Idéal pour l'ingénierie, les mathématiques pures, la cybersécurité et l'informatique de pointe.
- BAC D : Recommandé pour la médecine, l'agronomie, la bio-informatique et les sciences environnementales.
- BAC G2 & G3 : Excellente transition vers la comptabilité, la finance d'entreprise, le management stratégique et la logistique.

Ne subissez pas votre choix d'études. Évaluez vos passions réelles, le marché de l'emploi béninois et les prérequis de chaque établissement avant de valider votre formulaire d'inscription.`
    },
    {
      id: 4,
      category: 'ministere',
      categoryLabel: 'Ministère (MESRS)',
      title: 'Nouvelle liste des écoles d\'ingénieurs et instituts agréés au Bénin pour 2026',
      date: '15 Juin 2026',
      time: 'Il y a 15 jours',
      author: 'Direction de l\'Enseignement Supérieur',
      desc: 'Consultez la liste validée par l\'État des universités privées et écoles d\'ingénieurs autorisées à délivrer des diplômes de Licence et Master reconnus par la DEC et le CAMES.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=350&q=80',
      badge: 'Officiel',
      fullContent: `Le Ministère de l'Enseignement Supérieur et de la Recherche Scientifique a publié la liste révisée et officielle des Établissements Privés d'Enseignement Supérieur (EPES) ayant obtenu l'agrément de l'État béninois pour l'année universitaire 2026-2027.

Cette mesure vise à protéger les étudiants contre les diplômes non reconnus et à assainir l'écosystème de l'enseignement supérieur au Bénin. Tous les parents sont vivement encouragés à vérifier la présence de l'école choisie sur cette liste officielle avant tout versement de frais de scolarité.`
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsList 
    : newsList.filter(item => item.category === selectedCategory);

  const shareNews = (id: number, title: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/actualite/${id}`);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A] py-10 min-h-screen selection:bg-[#F4C430]/30 selection:text-black" id="actualites-page-container">
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4C430]/10 px-3.5 py-1.5 text-xs font-black text-[#E8B923] uppercase tracking-wider">
              <Megaphone className="h-3.5 w-3.5" />
              <span>Actualités Officielles</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight">
              Actualités & Publications
            </h1>
            <p className="text-sm text-[#1A1A1A]/50 max-w-2xl leading-relaxed font-medium">
              Restez informé en temps réel des réformes, des communiqués officiels du Ministère (MESRS), et des opportunités d'études supérieures au Bénin.
            </p>
          </div>
        </motion.div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-black/5 pb-4">
          {[
            { label: 'Tous les communiqués', val: 'all' },
            { label: 'Ministère (MESRS)', val: 'ministere' },
            { label: 'Vie des Campus (UAC, UP)', val: 'campus' },
            { label: 'Conseils & Guides', val: 'conseils' }
          ].map(cat => (
            <button
              key={cat.val}
              onClick={() => setSelectedCategory(cat.val as any)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.val
                  ? 'bg-[#F4C430] text-black shadow-sm'
                  : 'bg-black/5 hover:bg-black/10 text-black/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNews.map(item => (
            <motion.div 
              layout
              whileHover={{ y: -4, borderColor: 'rgba(244,196,48,0.3)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}
              key={item.id}
              className="bg-white border border-black/5 rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-48 sm:h-56 bg-neutral-100 overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-black/75 text-white backdrop-blur-sm text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">
                  {item.categoryLabel}
                </span>

                {item.badge && (
                  <span className="absolute top-4 right-4 bg-[#F4C430] text-black font-black text-[9px] px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Content area */}
              <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-[10px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#E8B923]" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#E8B923]" />
                      {item.time}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#1A1A1A] hover:text-[#E8B923] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#1A1A1A]/60 leading-relaxed line-clamp-3 font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer actions */}
                <div className="pt-5 border-t border-black/5 flex items-center justify-between mt-5">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-wider">
                    Par <span className="text-black font-black">{item.author}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => shareNews(item.id, item.title)}
                      className="p-2.5 rounded-xl bg-[#FAFAF8] hover:bg-[#F4C430]/10 hover:text-black text-black/60 transition-all cursor-pointer relative"
                      title="Partager l'actualité"
                    >
                      {copiedId === item.id ? (
                        <Check className="h-4 w-4 text-emerald-500 stroke-[3]" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="flex items-center gap-1.5 bg-[#F4C430]/10 hover:bg-[#F4C430] hover:text-black text-[#E8B923] px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer uppercase tracking-wider"
                    >
                      <span>Lire</span>
                      <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elegant Modal for reading news */}
        <AnimatePresence>
          {selectedNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNews(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Content modal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-white rounded-[2.5rem] border border-black/5 w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors cursor-pointer z-20"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Hero image in modal */}
                <div className="h-48 sm:h-64 relative bg-neutral-100 shrink-0">
                  <img 
                    src={selectedNews.image} 
                    alt={selectedNews.title} 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <span className="bg-[#F4C430] text-black text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {selectedNews.categoryLabel}
                    </span>
                    <h3 className="text-white text-base md:text-lg font-black leading-tight drop-shadow-sm">
                      {selectedNews.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content in modal */}
                <div className="p-6 md:p-8 space-y-4 overflow-y-auto text-xs text-[#1A1A1A]/70 leading-relaxed font-medium">
                  <div className="flex items-center gap-3 text-[10px] text-[#1A1A1A]/40 font-bold uppercase tracking-wider">
                    <span>Par {selectedNews.author}</span>
                    <span>•</span>
                    <span>{selectedNews.date}</span>
                  </div>

                  <p className="whitespace-pre-line font-medium text-sm text-[#1A1A1A]/80 leading-relaxed pt-2">
                    {selectedNews.fullContent || selectedNews.desc}
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
