import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Globe, GraduationCap, HelpCircle, FileText, Sparkles, ExternalLink } from 'lucide-react';

interface BoursesPageProps {
  setActivePage: (page: any) => void;
}

export default function BoursesPage({ setActivePage }: BoursesPageProps) {
  const [activeTab, setActiveTab] = useState<'national' | 'cooperation'>('national');

  const boursesNationales = [
    {
      title: 'Bourse (allocation complète)',
      sub: 'Classement national du bac, par filière',
      amount: 'Gratuité des études + allocation versée par l\'État',
      criteria: 'Attribuée aux meilleurs classés par filière, dans la limite du quota fixé chaque année par le Ministère pour cette filière précise (visible sur la fiche de chaque formation).',
      steps: [
        'Choix de 3 filières sur la plateforme apresmonbac.bj après le bac',
        'Classement national automatique selon la moyenne au bac et les coefficients de la série',
        'Publication du résultat sur la plateforme, puis inscription auprès de l\'université concernée'
      ],
      badge: 'Bourse'
    },
    {
      title: 'Aide / FPP (Formation Partiellement Payante)',
      sub: 'Pour les candidats classés juste après les boursiers',
      amount: 'Scolarité partiellement prise en charge par l\'État',
      criteria: 'Attribuée aux candidats suivants dans le classement de la filière, une fois le quota de bourses épuisé.',
      steps: [
        'Même procédure que pour la bourse : le classement détermine automatiquement qui obtient une place aide/FPP',
        'Inscription auprès de l\'université concernée'
      ],
      badge: 'Aide / FPP'
    },
    {
      title: 'Inscription à titre payant',
      sub: 'Au-delà des quotas bourse et FPP',
      amount: 'Frais de scolarité à la charge de l\'étudiant, selon le tarif de l\'établissement',
      criteria: 'Ouverte à tout candidat ne rentrant pas dans les quotas bourse/FPP de sa filière, sous réserve des places disponibles.',
      steps: [
        'Inscription directement auprès de l\'établissement choisi',
      ],
      badge: 'Payant'
    }
  ];

  const boursesCooperation = [
    {
      title: 'Accords de coopération avec le Maroc',
      sub: 'Filières scientifiques, médicales et d\'ingénierie',
      badge: 'Bénin-Maroc'
    },
    {
      title: 'Accords de coopération avec l\'Algérie',
      sub: 'Filières scientifiques et technologiques',
      badge: 'Bénin-Algérie'
    },
    {
      title: 'Bourses du gouvernement chinois (CSC)',
      sub: 'Études supérieures en Chine, toutes disciplines',
      badge: 'Bénin-Chine'
    }
  ];

  const docsRequis = [
    'Certificat de nationalité béninoise',
    'Extrait d\'acte de naissance',
    'Attestation et relevé de notes du BAC',
    'Photos d\'identité récentes',
    'Certificat médical d\'aptitude',
    'Justificatif de domicile des parents ou tuteurs'
  ];

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="bg-bg-main text-text-main py-10 min-h-screen selection:bg-accent/30 selection:text-black" id="bourses-page-container">
      <div className="mx-auto max-w-7xl px-6 space-y-12">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3.5 py-1.5 text-xs font-black text-accent uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Comment fonctionnent les allocations d'études</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-text-main leading-tight">
            Bourses & aides aux études
          </h1>
          <p className="text-sm text-text-main/50 font-medium leading-relaxed">
            Au Bénin, l'attribution des bourses se fait par classement national après le bac, filière par filière — pas de dossier de demande séparé. Les montants exacts et les dates de campagne sont fixés chaque année par le Ministère : cette page explique le mécanisme, pas des chiffres figés.
          </p>
        </motion.div>

        {/* Tabs with slide active backplate */}
        <div className="overflow-x-auto scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex sm:justify-center">
          <div className="flex whitespace-nowrap bg-bg-main/50 p-1.5 rounded-2xl border border-black/5 w-max">
            {[
              { id: 'national', label: 'Allocations nationales (Bénin)' },
              { id: 'cooperation', label: 'Bourses de coopération' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 text-xs font-bold relative transition-all duration-300 cursor-pointer rounded-xl ${
                    isActive ? 'text-black font-extrabold' : 'text-text-main/50 hover:text-black font-semibold'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="boursesActiveTabBg"
                      className="absolute inset-0 bg-accent rounded-xl -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Scholarship Listings */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="space-y-6"
              >
                {activeTab === 'national' ? (
                  <>
                    <h2 className="text-lg font-black text-black flex items-center gap-2 uppercase tracking-wide">
                      <GraduationCap className="h-5 w-5 text-accent" />
                      Les 3 régimes possibles, par filière
                    </h2>

                    {boursesNationales.map((bourse, idx) => (
                      <motion.div
                        whileTap={{ scale: 0.99 }}
                        key={idx}
                        className="group card-premium p-8 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                          <h3 className="text-sm font-black text-text-main group-hover:text-accent transition-colors leading-snug">{bourse.title}</h3>
                          <span className="bg-accent-light text-accent text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {bourse.badge}
                          </span>
                        </div>
                        <p className="text-xs text-text-main/40 font-bold mb-4">{bourse.sub}</p>

                        <div className="mb-4 bg-bg-main p-5 rounded-2xl text-xs font-medium border border-black/5">
                          <span className="text-[9px] font-extrabold text-text-main/40 block uppercase tracking-wider">Ce que ça change</span>
                          <span className="font-extrabold text-accent text-sm mt-0.5 block">{bourse.amount}</span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-extrabold text-text-main/40 uppercase block tracking-wider">Qui l'obtient :</span>
                            <p className="text-xs text-text-main/60 leading-relaxed font-medium mt-1">{bourse.criteria}</p>
                          </div>

                          <div className="pt-2">
                            <span className="text-[9px] font-extrabold text-text-main/40 uppercase block mb-2 tracking-wider">Comment ça se passe :</span>
                            <ul className="space-y-1.5 text-xs text-text-main/60 font-medium">
                              {bourse.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex gap-2">
                                  <span className="text-accent font-black shrink-0">{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <p className="text-[11px] text-text-main/40 font-medium px-2">
                      Le nombre exact de places bourse et aide/FPP est fixé chaque année, filière par filière : retrouve les quotas actuels sur la fiche de chaque formation dans la rubrique Orientation.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-black text-black flex items-center gap-2 uppercase tracking-wide">
                      <Globe className="h-5 w-5 text-accent" />
                      Bourses d'études à l'étranger
                    </h2>
                    <p className="text-xs text-text-main/50 font-medium leading-relaxed">
                      Le Bénin a des accords de coopération avec plusieurs pays pour l'envoi d'étudiants méritants à l'étranger. Les places, montants et conditions varient chaque année : ce qui suit liste les partenariats connus, pas une offre figée.
                    </p>

                    {boursesCooperation.map((bourse, idx) => (
                      <motion.div
                        whileTap={{ scale: 0.99 }}
                        key={idx}
                        className="group card-premium p-8 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                          <h3 className="text-sm font-black text-text-main group-hover:text-accent transition-colors leading-snug">{bourse.title}</h3>
                          <span className="bg-accent-light text-accent text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {bourse.badge}
                          </span>
                        </div>
                        <p className="text-xs text-text-main/60 font-medium">{bourse.sub}</p>
                      </motion.div>
                    ))}

                    <div className="flex items-start gap-3 bg-white border border-black/5 rounded-2xl p-5">
                      <ExternalLink className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-xs text-text-main/60 leading-relaxed font-medium">
                        Pour les montants, quotas et modalités de candidature à jour, contacte la Direction des Bourses et Aides Universitaires (DBAU) du MESRS ou l'ambassade du pays concerné.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Guide & Requirements */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white border border-black/5 rounded-[2.5rem] p-7 shadow-sm"
            >
              <h3 className="text-xs font-black text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-accent" />
                Pièces généralement demandées
              </h3>
              <p className="text-xs text-text-main/50 leading-relaxed mb-4 font-medium">
                À confirmer auprès de l'université au moment de l'inscription, mais on te demandera à peu près toujours :
              </p>
              <ul className="space-y-3 text-xs text-text-main/70 font-medium">
                {docsRequis.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-linear-to-br from-text-main to-neutral-950 text-white rounded-[2.5rem] p-7 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-accent/5 blur-2xl" />
              <h3 className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2 text-accent">
                <HelpCircle className="h-4.5 w-4.5" />
                À retenir
              </h3>
              <div className="space-y-5 text-xs font-medium leading-relaxed">
                <div>
                  <h4 className="font-extrabold text-white mb-1.5">Un changement de filière fait perdre l'allocation</h4>
                  <p className="text-white/50">
                    D'après le guide officiel du MESRS, tout changement de filière après le classement entraîne la perte de la bourse ou de l'aide/FPP obtenue.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <h4 className="font-extrabold text-white mb-1.5">Où suivre le calendrier réel</h4>
                  <p className="text-white/50">
                    Les dates d'ouverture de la plateforme apresmonbac.bj changent chaque année : c'est la seule source à considérer comme définitive.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
