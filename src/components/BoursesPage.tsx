import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, Globe, GraduationCap, HelpCircle, FileText, Sparkles } from 'lucide-react';

interface BoursesPageProps {
  setActivePage: (page: any) => void;
}

export default function BoursesPage({ setActivePage }: BoursesPageProps) {
  const [activeTab, setActiveTab] = useState<'national' | 'cooperation'>('national');

  const boursesNationales = [
    {
      title: 'Bourse d\'Excellence du Gouvernement Béninois',
      sub: 'Attribuée aux meilleurs bacheliers',
      amount: 'Prise en charge intégrale + Allocation mensuelle de 40 000 FCFA',
      duration: '36 mois (durée de la Licence)',
      criteria: 'Avoir obtenu le BAC béninois avec mention Très Bien ou Excellente, faire partie des premiers classés par filière.',
      steps: [
        'Classement automatique par le MESRS après délibération du BAC',
        'Publication des listes des allocataires au rectorat de l\'UAC, UP, UNA, et UNSTIM',
        'Signature de la fiche d\'engagement décennal auprès de la Direction des Bourses et Aides Universitaires (DBAU)'
      ],
      badge: 'Excellence'
    },
    {
      title: 'Bourse Nationale d\'Études (Attribution Classique)',
      sub: 'Critère social et académique combinés',
      amount: 'Allocation de 25 000 FCFA par mois',
      duration: '10 mois par année universitaire',
      criteria: 'Avoir obtenu le BAC avec mention Bien ou Assez Bien, et respecter les quotas d\'âge fixés (moins de 21 ans). Enquête sociale DBAU.',
      steps: [
        'Dépôt de dossier en ligne sur la plateforme DBAU du Ministère',
        'Fournir les pièces : attestation du BAC, relevé de notes, certificat de nationalité, fiche de renseignements familiaux'
      ],
      badge: 'Social'
    },
    {
      title: 'Secours Financier Universitaire',
      sub: 'Aide d\'accompagnement social',
      amount: 'Aide ponctuelle de 100 000 FCFA à 150 000 FCFA par an',
      duration: 'Versement annuel unique',
      criteria: 'Être inscrit régulièrement dans une entité publique et justifier de difficultés sociales particulières ou de handicap.',
      steps: [
        'Demande adressée au Directeur du Centre National des Œuvres Universitaires (COUS)',
        'Rapport d\'enquête du service social universitaire'
      ],
      badge: 'Secours'
    }
  ];

  const boursesCooperation = [
    {
      title: 'Bourses de Coopération Bénino-Marocaine',
      sub: 'Études d\'ingénierie et sciences de la santé au Maroc',
      amount: 'Exonération des frais d\'inscription + Logement universitaire + Bourse mensuelle',
      duration: 'Durée du cycle d\'étude complet (jusqu\'à 5 ou 7 ans)',
      criteria: 'Avoir le BAC avec mention Bien ou Très Bien. Séries C, D ou E.',
      steps: [
        'Dépôt de dossier physique au Ministère de l\'Enseignement Supérieur (Cotonou)',
        'Sélection rigoureuse basée sur les notes des matières spécifiques (Maths, Physique, SVT)'
      ],
      badge: 'Bénin-Maroc'
    },
    {
      title: 'Bourses d\'Excellence du Gouvernement Algérien',
      sub: 'Formation scientifique et technologique en Algérie',
      amount: 'Prise en charge des frais académiques + Pécule mensuel',
      duration: '3 à 5 ans selon la filière d\'ingénierie',
      criteria: 'Obtention du BAC avec au moins 14/20 de moyenne générale. Moins de 21 ans.',
      steps: [
        'Formulaires à retirer auprès de la DBAU',
        'Tests ou entretiens de sélection le cas échéant'
      ],
      badge: 'Bénin-Algérie'
    },
    {
      title: 'Bourses d\'Excellence de la République de Chine (CSC)',
      sub: 'Études supérieures en Chine',
      amount: 'Bourse complète (Frais de scolarité, logement, assurance médicale, 3000 RMB par mois)',
      duration: '4 à 5 ans (incluant 1 an de cours de langue chinoise)',
      criteria: 'BAC avec mention Bien ou supérieure. Excellent dossier académique.',
      steps: [
        'Candidature en ligne sur le portail d\'inscription CSC de l\'ambassade de Chine',
        'Lettres de recommandation de vos enseignants ou du proviseur'
      ],
      badge: 'Bénin-Chine'
    }
  ];

  const docsRequis = [
    'Une copie légalisée du certificat de nationalité béninoise',
    'Un extrait d\'acte de naissance sécurisé (ANIP)',
    'Deux copies légalisées de l\'attestation et du relevé de notes du BAC',
    'Deux photos d\'identité récentes',
    'Un certificat médical d\'aptitude délivré par un médecin officiel',
    'Une attestation de résidence des parents ou tuteurs'
  ];

  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A] py-10 min-h-screen selection:bg-[#F4C430]/30 selection:text-black" id="bourses-page-container">
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4C430]/10 px-3.5 py-1.5 text-xs font-black text-[#E8B923] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Soutien à l'Excellence Béninoise</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1A1A1A] leading-tight">
            Bourses d'Études & Aides
          </h1>
          <p className="text-sm text-[#1A1A1A]/50 font-medium leading-relaxed">
            Le gouvernement béninois et ses partenaires internationaux récompensent le mérite et soutiennent l'inclusion. Découvrez les opportunités d'allocations et bourses adaptées à votre profil.
          </p>
        </motion.div>

        {/* Tabs with slide active backplate */}
        <div className="flex justify-center">
          <div className="flex whitespace-nowrap bg-[#FAFAF8]/50 p-1.5 rounded-2xl border border-black/5">
            {[
              { id: 'national', label: 'Bourses Nationales (Bénin)' },
              { id: 'cooperation', label: 'Bourses de Coopération' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 text-xs font-bold relative transition-all duration-300 cursor-pointer rounded-xl ${
                    isActive ? 'text-black' : 'text-[#1A1A1A]/50 hover:text-black'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="boursesActiveTabBg"
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
                      <GraduationCap className="h-5 w-5 text-[#E8B923]" />
                      Allocations d'État au Bénin (DBAU)
                    </h2>

                    {boursesNationales.map((bourse, idx) => (
                      <motion.div 
                        whileHover={{ y: -4, borderColor: 'rgba(244,196,48,0.3)' }}
                        key={idx} 
                        className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                          <h3 className="text-sm font-black text-black leading-snug">{bourse.title}</h3>
                          <span className="bg-[#F4C430]/15 text-[#E8B923] text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {bourse.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#1A1A1A]/40 font-bold mb-4">{bourse.sub}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-[#FAFAF8] p-5 rounded-2xl text-xs font-medium border border-black/5">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 block uppercase tracking-wider">Montant / Avantages</span>
                            <span className="font-extrabold text-[#E8B923] text-sm mt-0.5 block">{bourse.amount}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 block uppercase tracking-wider">Durée de versement</span>
                            <span className="font-extrabold text-black text-sm mt-0.5 block">{bourse.duration}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 uppercase block tracking-wider">Critères d'attribution :</span>
                            <p className="text-xs text-[#1A1A1A]/60 leading-relaxed font-medium mt-1">{bourse.criteria}</p>
                          </div>

                          <div className="pt-2">
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 uppercase block mb-2 tracking-wider">Processus de candidature :</span>
                            <ul className="space-y-1.5 text-xs text-[#1A1A1A]/60 font-medium">
                              {bourse.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex gap-2">
                                  <span className="text-[#E8B923] font-black shrink-0">{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-black text-black flex items-center gap-2 uppercase tracking-wide">
                      <Globe className="h-5 w-5 text-[#E8B923]" />
                      Bourses de Coopération d'État (Étranger)
                    </h2>

                    {boursesCooperation.map((bourse, idx) => (
                      <motion.div 
                        whileHover={{ y: -4, borderColor: 'rgba(244,196,48,0.3)' }}
                        key={idx} 
                        className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                          <h3 className="text-sm font-black text-black leading-snug">{bourse.title}</h3>
                          <span className="bg-[#F4C430]/15 text-[#E8B923] text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {bourse.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#1A1A1A]/40 font-bold mb-4">{bourse.sub}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-[#FAFAF8] p-5 rounded-2xl text-xs font-medium border border-black/5">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 block uppercase tracking-wider">Prise en charge</span>
                            <span className="font-extrabold text-[#E8B923] text-sm mt-0.5 block">{bourse.amount}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 block uppercase tracking-wider">Durée</span>
                            <span className="font-extrabold text-black text-sm mt-0.5 block">{bourse.duration}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 uppercase block tracking-wider">Conditions requises :</span>
                            <p className="text-xs text-[#1A1A1A]/60 leading-relaxed font-medium mt-1">{bourse.criteria}</p>
                          </div>

                          <div className="pt-2">
                            <span className="text-[9px] font-extrabold text-[#1A1A1A]/40 uppercase block mb-2 tracking-wider">Comment postuler :</span>
                            <ul className="space-y-1.5 text-xs text-[#1A1A1A]/60 font-medium">
                              {bourse.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex gap-2">
                                  <span className="text-[#E8B923] font-black shrink-0">{sIdx + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
                <FileText className="h-4.5 w-4.5 text-[#E8B923]" />
                Dossier Type DBAU
              </h3>
              <p className="text-xs text-[#1A1A1A]/50 leading-relaxed mb-4 font-medium">
                Originaux et copies certifiées requis pour postuler à une allocation nationale au Bénin :
              </p>
              <ul className="space-y-3 text-xs text-[#1A1A1A]/70 font-medium">
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
              className="bg-gradient-to-br from-[#1A1A1A] to-neutral-950 text-white rounded-[2.5rem] p-7 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#F4C430]/5 blur-2xl" />
              <h3 className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2 text-[#F4C430]">
                <HelpCircle className="h-4.5 w-4.5" />
                Le Saviez-vous ?
              </h3>
              <div className="space-y-5 text-xs font-medium leading-relaxed">
                <div>
                  <h4 className="font-extrabold text-white mb-1.5">Cumul des allocations d'État</h4>
                  <p className="text-white/50">
                    Il est strictement interdit par la réglementation DBAU de cumuler une bourse nationale d'études et une autre aide publique d'État pour une même année académique.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <h4 className="font-extrabold text-white mb-1.5">Date limite de dépôt</h4>
                  <p className="text-white/50">
                    Les dépôts de candidatures ouvrent généralement fin Septembre et se clôturent courant Novembre de chaque année universitaire.
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
