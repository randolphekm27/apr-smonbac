import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, FileText, CheckCircle, Search, Mail, ExternalLink, Sparkles, BookOpen, UserCheck, MessageSquare, Check, Trash } from 'lucide-react';

interface StagesPageProps {
  setActivePage: (page: any) => void;
}

export default function StagesPage({ setActivePage }: StagesPageProps) {
  const [selectedTopic, setSelectedTopic] = useState<'listings' | 'guide'>('listings');
  const [appliedCompany, setAppliedCompany] = useState<string | null>(null);

  // CV Builder states
  const [cvName, setCvName] = useState('');
  const [cvMajor, setCvMajor] = useState('');
  const [cvGenerated, setCvGenerated] = useState(false);

  const internships = [
    {
      company: 'Sèmè City (La Cité de l\'Innovation)',
      logoColor: 'bg-emerald-500',
      title: 'Stage d\'Immersion Jeune Talent (Tech & Design)',
      duration: '3 mois',
      location: 'Cotonou (Sèmè One), Bénin',
      tag: 'Innovation / Design',
      desc: 'Découvrez le monde des startups et participez à des projets d\'intelligence artificielle, de prototypage et d\'impression 3D au cœur de Sèmè City.',
      perks: 'Pécule mensuel de transport + accès libre aux fablabs',
      requirements: 'Jeunes bacheliers ou étudiants de 1ère année, passionnés de technologie.'
    },
    {
      company: 'MTN Bénin',
      logoColor: 'bg-accent',
      title: 'Stage Académique d\'Orientation (Génie Logiciel / Réseaux)',
      duration: '2 mois',
      location: 'Cotonou, Bénin',
      tag: 'Télécoms',
      desc: 'Intégrez la direction technique pour observer et comprendre l\'exploitation d\'un réseau télécom d\'envergure et l\'architecture cloud.',
      perks: 'Mentorat individuel par un ingénieur senior',
      requirements: 'Étudiants en tronc commun informatique/télécoms.'
    },
    {
      company: 'Isocel Telecom',
      logoColor: 'bg-cyan-500',
      title: 'Stage Découverte Systèmes et Réseaux',
      duration: '3 mois',
      location: 'Cotonou, Bénin',
      tag: 'Réseaux & Fibres',
      desc: 'Accompagnez les équipes de déploiement de la fibre optique et de maintenance des serveurs d\'accès internet résidentiels.',
      perks: 'Expérience terrain pratique',
      requirements: 'Bacheliers motivés des séries techniques (F3, E) ou informatique.'
    },
    {
      company: 'StartUp Bénin Hub',
      logoColor: 'bg-purple-500',
      title: 'Stage d\'Assistant Communication Digitale',
      duration: '3 mois',
      location: 'Calavi (Akassato / Zogbadjè), Bénin',
      tag: 'Marketing',
      desc: 'Animation de communautés, création de visuels simples avec Canva et rédaction d\'articles d\'orientation pour les bacheliers.',
      perks: 'Télétravail partiel + Bonus à la performance',
      requirements: 'Excellente maîtrise du français et des réseaux sociaux.'
    }
  ];

  const cvTips = [
    {
      title: 'Structure simple pour débutant',
      desc: 'Puisque vous venez d\'avoir le BAC, mettez en valeur vos compétences scolaires, vos projets de lycées, vos rôles de délégué de classe ou de club d\'anglais.'
    },
    {
      title: 'Mettez en avant vos soft skills',
      desc: 'Motivation, curiosité d\'apprendre, ponctualité, travail d\'équipe et maîtrise des outils de base comme Word, Excel et la recherche web.'
    },
    {
      title: 'Soignez l\'orthographe',
      desc: 'Un CV sans faute est le premier critère de sélection au Bénin. Faites relire votre CV par un aîné ou utilisez un correcteur en ligne.'
    },
    {
      title: 'La lettre de motivation personnalisée',
      desc: 'Expliquez pourquoi vous choisissez cette entreprise précise et ce que vous espérez apprendre durant ce stage d\'observation.'
    }
  ];

  const triggerApply = (company: string) => {
    setAppliedCompany(company);
    setTimeout(() => {
      setAppliedCompany(null);
    }, 4000);
  };

  const generateCV = () => {
    if (!cvName || !cvMajor) return;
    setCvGenerated(true);
  };

  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black" id="stages-page-container">
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
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Immersion Professionnelle</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main leading-tight">
              Premiers Stages & Projets
            </h1>
            <p className="text-sm text-text-main/50 max-w-2xl leading-relaxed font-medium">
              Trouvez des stages d'observation et d'immersion au Bénin. Apprenez à concevoir votre premier CV professionnel et décrochez votre première expérience pratique en entreprise.
            </p>
          </div>
        </motion.div>

        {/* Tabs with layout ID */}
        <div className="flex justify-center md:justify-start">
          <div className="flex whitespace-nowrap bg-bg-main/50 p-1.5 rounded-2xl border border-black/5">
            {[
              { id: 'listings', label: 'Opportunités de Stages' },
              { id: 'guide', label: 'Guide & Créateur de CV' }
            ].map((tab) => {
              const isActive = selectedTopic === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTopic(tab.id as any)}
                  className={`px-5 py-3 text-xs font-bold relative transition-all duration-300 cursor-pointer rounded-xl ${
                    isActive ? 'text-black font-extrabold' : 'text-text-main/50 hover:text-black font-semibold'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="stagesActiveTabBg"
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

        {selectedTopic === 'listings' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Internship Opportunities */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-lg font-black text-text-main flex items-center gap-2 uppercase tracking-wide">
                <Briefcase className="h-5 w-5 text-accent" />
                Offres d'immersion post-bac
              </h2>

              <div className="space-y-6">
                {internships.map((intern, idx) => (
                  <motion.div
                    whileTap={{ scale: 0.99 }}
                    key={idx}
                    className="group card-premium p-8 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
                  >
                    {/* Brand Initial */}
                    <div className={`h-12 w-12 rounded-2xl ${intern.logoColor} shrink-0 text-white flex items-center justify-center font-black text-xl shadow-md`}>
                      {intern.company[0]}
                    </div>

                    {/* Body info */}
                    <div className="space-y-3 grow">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-extrabold text-text-main/40 uppercase tracking-wider">{intern.company}</span>
                        <span className="bg-accent-light text-accent font-black text-[9px] px-2.5 py-1 rounded-md uppercase tracking-widest">
                          {intern.tag}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-black group-hover:text-accent transition-colors leading-snug">
                        {intern.title}
                      </h3>

                      <p className="text-xs text-text-main/60 leading-relaxed font-medium">
                        {intern.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-medium">
                        <div>
                          <span className="text-[9px] font-extrabold text-text-main/40 uppercase tracking-wider block">Durée & Lieu</span>
                          <span className="font-extrabold text-text-main block mt-0.5">{intern.duration} • {intern.location}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-extrabold text-text-main/40 uppercase tracking-wider block">Avantages</span>
                          <span className="font-extrabold text-accent block mt-0.5">{intern.perks}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-black/5 flex items-center justify-between flex-wrap gap-3">
                        <span className="text-[10px] text-text-main/50 leading-tight font-medium">
                          <span className="font-bold text-black uppercase">Critère :</span> {intern.requirements}
                        </span>
                        
                        <div className="relative">
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => triggerApply(intern.company)}
                            className={`px-4.5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                              appliedCompany === intern.company 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-accent/10 hover:bg-accent hover:text-black text-accent'
                            }`}
                          >
                            {appliedCompany === intern.company ? 'Candidature envoyée !' : 'Postuler en direct'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right sidebar info */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-linear-to-br from-text-main to-neutral-950 text-white rounded-[2.5rem] p-7 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
                <h3 className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2 text-accent">
                  <Sparkles className="h-4 w-4" />
                  Conseils Pratiques
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 font-medium">
                  Le marché béninois favorise grandement l'esprit d'initiative. N'hésitez pas à proposer une candidature spontanée directement auprès des entreprises à Cotonou ou d'utiliser vos réseaux familiaux.
                </p>
                <ul className="space-y-4 text-xs font-medium text-white/70">
                  <li className="flex gap-2">
                    <span className="text-accent font-black">✓</span>
                    <span><strong>Présentation soignée</strong> : Soyez toujours ponctuel, courtois et souriant lors du dépôt d'un dossier physique.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-black">✓</span>
                    <span><strong>Relance</strong> : Rappelez poliment l'entreprise ou le recruteur 10 à 15 jours après avoir envoyé votre dossier.</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Guide list */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-lg font-black text-text-main flex items-center gap-2 uppercase tracking-wide">
                <FileText className="h-5 w-5 text-accent" />
                Comment rédiger vos premiers documents de candidature ?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cvTips.map((tip, idx) => (
                  <motion.div 
                    whileHover={{ y: -3, borderColor: 'rgba(239,191,36,0.3)' }}
                    key={idx} 
                    className="bg-white border border-black/5 rounded-4xl p-6 shadow-sm space-y-3 transition-all duration-300"
                  >
                    <div className="h-8 w-8 rounded-full bg-accent-light text-accent flex items-center justify-center font-black text-xs">
                      {idx + 1}
                    </div>
                    <h3 className="font-black text-sm text-text-main">{tip.title}</h3>
                    <p className="text-xs text-text-main/50 leading-relaxed font-medium">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CV Generator preview placeholder */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                {!cvGenerated ? (
                  <motion.div 
                    key="builder-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-sm space-y-6"
                  >
                    <div className="border-b border-black/5 pb-4">
                      <span className="text-[9px] font-extrabold text-accent uppercase tracking-widest block">Outil Intégré</span>
                      <h3 className="text-base font-black text-black">Créateur de CV Rapide</h3>
                    </div>

                    <p className="text-xs text-text-main/50 leading-relaxed font-medium">
                      Saisissez vos informations essentielles pour générer instantanément un modèle de CV minimaliste et moderne adapté aux recruteurs du Bénin.
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-1 text-xs font-bold">
                        <label className="text-text-main/70 uppercase tracking-wider text-[9px]">Nom & Prénoms complets</label>
                        <input 
                          type="text" 
                          value={cvName}
                          onChange={(e) => setCvName(e.target.value)}
                          placeholder="Ex: Koffi Marc SOSSOU" 
                          className="w-full bg-bg-main rounded-xl px-4 py-3 border border-transparent focus:border-accent/30 outline-none text-xs font-medium" 
                        />
                      </div>
                      <div className="space-y-1 text-xs font-bold">
                        <label className="text-text-main/70 uppercase tracking-wider text-[9px]">Filière d'études souhaitée</label>
                        <input 
                          type="text" 
                          value={cvMajor}
                          onChange={(e) => setCvMajor(e.target.value)}
                          placeholder="Ex: Licence en Informatique d'Entreprise" 
                          className="w-full bg-bg-main rounded-xl px-4 py-3 border border-transparent focus:border-accent/30 outline-none text-xs font-medium" 
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={generateCV}
                        disabled={!cvName || !cvMajor}
                        className="w-full bg-accent hover:bg-accent-hover text-black text-xs font-black py-3 rounded-full shadow-md shadow-accent/$1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                      >
                        Générer mon premier CV
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="builder-preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border-2 border-accent/20 rounded-[2.5rem] p-8 shadow-md space-y-6 relative"
                  >
                    {/* CV Header simulation */}
                    <div className="border-b border-black/10 pb-4 space-y-1 text-center">
                      <h4 className="text-base font-black text-black tracking-tight uppercase">{cvName}</h4>
                      <p className="text-xs text-accent font-bold">{cvMajor}</p>
                      <span className="text-[10px] text-black/40 block">Cotonou, Bénin • email@adresse.bj</span>
                    </div>

                    {/* Resume sections */}
                    <div className="space-y-4 text-left">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase text-accent tracking-widest block">Formation</span>
                        <p className="text-xs font-extrabold text-black">Baccalauréat Scientifique</p>
                        <p className="text-[10px] text-black/50">Session de Juin 2026 • Mention Très Bien</p>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-black/5">
                        <span className="text-[9px] font-black uppercase text-accent tracking-widest block">Compétences d'avenir</span>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {['Logique & Algèbre', 'Bases d\'informatique', 'Bilingue Anglais', 'Méthode d\'équipe'].map((tag, i) => (
                            <span key={i} className="bg-black/5 text-black text-[9px] font-bold px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-black/5">
                        <span className="text-[9px] font-black uppercase text-accent tracking-widest block">Objectif personnel</span>
                        <p className="text-[10px] text-black/60 leading-relaxed italic">
                          "Bachelier dynamique et rigoureux, je souhaite rejoindre vos équipes techniques en stage d'observation pour mettre mes capacités d'apprentissage rapide au service de vos projets de développement numérique."
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => {
                          setCvGenerated(false);
                          setCvName('');
                          setCvMajor('');
                        }}
                        className="flex-1 bg-black/5 hover:bg-black/10 text-black/80 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Trash className="h-4 w-4" />
                        <span>Recommencer</span>
                      </button>
                      <button
                        onClick={() => alert("Impression PDF en cours de traitement...")}
                        className="flex-1 bg-accent hover:bg-accent-hover text-black text-xs font-black py-2.5 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Check className="h-4 w-4 stroke-$1" />
                        <span>Télécharger (PDF)</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
