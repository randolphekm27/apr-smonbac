import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Play, Sparkles, BookOpen, GraduationCap, Trophy, Award, 
  Briefcase, CheckCircle, ArrowRight, Bell, Star, ArrowUpRight, 
  ChevronRight, Smile, Users, Heart
} from 'lucide-react';
import { TESTIMONIALS, UNIVERSITIES } from '../data';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface AccueilPageProps {
  setActivePage: (page: AppActivePage) => void;
  setNavigationState?: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
  onSearch: (query: string) => void;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    
    const duration = 1.2; // seconds
    const totalSteps = Math.min(end, 60);
    const stepTime = (duration * 1000) / totalSteps;
    const increment = Math.ceil(end / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-extrabold tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function AccueilPage({ setActivePage, setNavigationState, onSearch }: AccueilPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    if (term === 'Informatique') {
      if (setNavigationState) {
        setNavigationState({ page: 'filiere-detail', majorId: 'licence-informatique' });
      } else {
        setActivePage('filiere-detail');
      }
    } else {
      onSearch(term);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail.trim()) {
      setSubscriptionSuccess(true);
      setTimeout(() => {
        setSubscriptionSuccess(false);
        setSubscribedEmail('');
      }, 5000);
    }
  };

  const easeOutExpo = [0.16, 1, 0.3, 1];

  const viewportVariant = {
    hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: easeOutExpo }
    }
  };

  return (
    <div className="bg-[#FAFAF8] text-[#1A1A1A] overflow-hidden selection:bg-[#F4C430]/30 selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 md:py-24">
        {/* Soft elegant background live ambient light */}
        <div className="absolute top-0 right-1/4 -z-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#F4C430]/10 to-yellow-200/5 blur-3xl opacity-60 animate-pulse duration-[8000ms]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Framer-motion staggered text reveal */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                className="inline-flex items-center gap-2 rounded-full bg-[#F4C430]/10 px-4 py-1.5 text-xs font-black text-[#E8B923] uppercase tracking-wider"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>L'excellence universitaire au Bénin</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1A1A1A] leading-[1.08]">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                  className="block"
                >
                  Dessinez votre avenir
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
                  className="text-[#F4C430] relative inline-block mt-1"
                >
                  après le BAC.
                  <span className="absolute left-0 bottom-2 h-2.5 w-full bg-[#F4C430]/20 -z-10 rounded-full" />
                </motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
                className="text-base text-[#1A1A1A]/60 leading-relaxed max-w-xl font-medium"
              >
                Explorez plus de 300 filières d'avenir, découvrez les 4 grandes universités publiques, préparez vos concours d'excellence, postulez à des bourses exclusives et saisissez des opportunités de stages au Bénin.
              </motion.p>
            </div>

            {/* Action-Oriented Search Bar Form with Glow Effect */}
            <motion.form 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
              onSubmit={handleSearchSubmit} 
              className="relative max-w-xl group"
            >
              <div className="flex items-center rounded-2xl bg-white p-2.5 shadow-xl shadow-black/5 border border-black/5 backdrop-blur-lg focus-within:border-[#F4C430]/50 focus-within:ring-4 focus-within:ring-[#F4C430]/10 transition-all duration-300">
                <div className="pl-4 text-[#1A1A1A]/40 group-focus-within:text-[#E8B923] transition-colors">
                  <Search className="h-5 w-5 stroke-[2.2]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Trouvez la formation qui vous ressemble..."
                  className="w-full bg-transparent px-3 py-3 text-sm font-bold text-[#1A1A1A] placeholder-black/30 outline-none"
                  id="hero-search-input"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex h-12 px-6 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F4C430] text-black font-extrabold text-xs shadow-md shadow-[#F4C430]/20 hover:bg-[#E8B923] hover:shadow-lg transition-all cursor-pointer"
                  id="hero-search-btn"
                >
                  <span>Rechercher</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </motion.button>
              </div>
            </motion.form>

            {/* Popular searches */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
              className="flex flex-wrap items-center gap-2.5 text-xs"
            >
              <span className="text-[#1A1A1A]/40 font-extrabold uppercase tracking-wide text-[10px]">Recherches fréquentes :</span>
              {['Informatique', 'Médecine', 'Droit', 'Ingénierie', 'Gestion'].map((tag) => (
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  key={tag}
                  type="button"
                  onClick={() => handlePopularSearch(tag)}
                  className="rounded-xl border border-black/5 bg-white px-3.5 py-2 font-bold text-[#1A1A1A]/70 shadow-sm hover:border-[#F4C430]/40 hover:bg-[#F4C430]/5 hover:text-black transition-all cursor-pointer"
                  id={`popular-tag-${tag.toLowerCase()}`}
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Photograph & Halo */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.12, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -z-10 h-80 w-80 rounded-full bg-[#F4C430]/20 blur-3xl" 
            />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -z-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-[3.5rem] border border-[#F4C430]/10"
            />

            {/* Student Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
              className="relative w-full max-w-[370px] aspect-[4/5] rounded-[2.5rem] p-3.5 border border-white bg-white/40 shadow-2xl backdrop-blur-sm overflow-hidden group"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Étudiant"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideoModal(true)}
                  className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl hover:scale-110 active:scale-95 cursor-pointer transition-transform duration-300 z-10"
                  id="play-video-hero"
                >
                  <Play className="h-5 w-5 fill-black stroke-black ml-0.5" />
                  <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-70" />
                </motion.button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black tracking-widest text-black uppercase shadow-lg select-none">
                  Découvrir en vidéo
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 STATS ROW */}
        <motion.div 
          variants={viewportVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-20 rounded-[2.5rem] border border-black/5 bg-white/60 p-8 md:p-12 shadow-xl backdrop-blur-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-black/5">
            <div className="flex flex-col items-center text-center p-2 lg:p-0">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C430]/15 text-[#E8B923] mb-4"
              >
                <BookOpen className="h-6 w-6 stroke-[2.2]" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
                <Counter value={300} suffix="+" />
              </span>
              <span className="text-xs text-[#1A1A1A]/50 font-bold tracking-tight mt-1.5 uppercase">Filières d'Orientation</span>
            </div>

            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 p-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C430]/15 text-[#E8B923] mb-4"
              >
                <GraduationCap className="h-6 w-6 stroke-[2.2]" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
                <Counter value={4} />
              </span>
              <span className="text-xs text-[#1A1A1A]/50 font-bold tracking-tight mt-1.5 uppercase">Universités publiques</span>
            </div>

            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 p-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C430]/15 text-[#E8B923] mb-4"
              >
                <Users className="h-6 w-6 stroke-[2.2]" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
                <Counter value={45} suffix="+" />
              </span>
              <span className="text-xs text-[#1A1A1A]/50 font-bold tracking-tight mt-1.5 uppercase">Écoles & Instituts</span>
            </div>

            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 p-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C430]/15 text-[#E8B923] mb-4"
              >
                <Star className="h-6 w-6 stroke-[2.2]" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
                <Counter value={1000} suffix="+" />
              </span>
              <span className="text-xs text-[#1A1A1A]/50 font-bold tracking-tight mt-1.5 uppercase">Opportunités Annuelles</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. SECTION "QUE RECHERCHEZ-VOUS ?" */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A]">Que recherchez-vous ?</h2>
          <p className="text-sm text-[#1A1A1A]/50 font-medium">Naviguez facilement au cœur des parcours d'avenir au Bénin.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { page: 'filiere-detail' as const, majorId: 'licence-informatique', icon: BookOpen, title: 'Filières', desc: 'Explorer les formations', id: 'search-card-filieres' },
            { page: 'universites' as const, icon: GraduationCap, title: 'Universités', desc: 'Découvrir les campus', id: 'search-card-universites' },
            { page: 'concours' as const, icon: Trophy, title: 'Concours', desc: 'Préparez votre d\'élite', id: 'search-card-concours' },
            { page: 'bourses' as const, icon: Award, title: 'Bourses d\'études', desc: 'Financer vos ambitions', id: 'search-card-bourses' },
            { page: 'stages' as const, icon: Briefcase, title: 'Stages', desc: 'Saisir le premier emploi', id: 'search-card-stages' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  borderColor: 'rgba(244,196,48,0.4)',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (setNavigationState) {
                    setNavigationState({ page: item.page, majorId: (item as any).majorId });
                  } else {
                    setActivePage(item.page);
                  }
                }}
                className="group flex flex-col items-center text-center p-7 bg-white/75 rounded-[2.5rem] border border-black/5 shadow-sm transition-all duration-300 cursor-pointer"
                id={item.id}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4C430]/10 text-[#E8B923] group-hover:bg-[#F4C430] group-hover:text-black transition-all duration-300 mb-6">
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>
                <h3 className="text-sm font-black text-[#1A1A1A] mb-1.5">{item.title}</h3>
                <p className="text-[11px] font-bold text-[#1A1A1A]/40 group-hover:text-black/60 transition-colors leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* 3. SECTION "POURQUOI CHOISIR ?" */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-12"
      >
        <div className="rounded-[3rem] bg-[#0B0B0A] text-white p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[450px] w-[450px] rounded-full bg-[#F4C430]/5 blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-12 relative">
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold text-[#F4C430] uppercase tracking-widest bg-[#F4C430]/10 px-3.5 py-1.5 rounded-full">Atouts d'Excellence</span>
                <h2 className="text-3xl md:text-5.5xl font-black tracking-tight leading-tight">
                  Pourquoi choisir <br />
                  <span className="text-[#F4C430]">Après Mon Bac ?</span>
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'Information fiable et à jour',
                    desc: 'Des données vérifiées et régulièrement mises à jour par des experts en orientation académique.'
                  },
                  {
                    title: 'Orientation personnalisée',
                    desc: 'Trouvez la voie d\'excellence qui correspond à vos ambitions réelles et à vos aptitudes.'
                  },
                  {
                    title: 'Opportunités exclusives',
                    desc: 'Accédez aux concours d\'État, bourses internationales et stages d\'immersion de premier ordre.'
                  },
                  {
                    title: 'Accompagnement continu',
                    desc: 'Une boussole digitale à chaque étape de votre transition entre le lycée et le monde professionnel.'
                  }
                ].map((item, idx) => (
                  <motion.div 
                    whileHover={{ x: 4 }}
                    key={idx} 
                    className="flex gap-4 items-start group"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4C430] text-black font-black text-xs mt-0.5 shadow-md shadow-[#F4C430]/20">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-[#F4C430] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/50 leading-relaxed mt-1 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center py-10 lg:py-0">
              <div className="relative w-80 h-80 rounded-[2.5rem] bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 shadow-2xl backdrop-blur-md flex items-center justify-center">
                <svg className="w-44 h-44 text-[#F4C430] drop-shadow-[0_0_20px_rgba(244,196,48,0.3)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>

                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 h-8 w-8 rounded-full bg-gradient-to-tr from-[#F4C430] to-yellow-300 text-black flex items-center justify-center text-xs font-black shadow-lg"
                >
                  ★
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-6 h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg text-lg"
                >
                  🎓
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-6 -right-4 md:-right-8 rounded-2xl border border-white/10 bg-black/80 p-5.5 shadow-2xl backdrop-blur-xl w-52 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-white/50 uppercase font-extrabold tracking-wider">Taux d'insertion</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-extrabold text-emerald-400">
                      +12% cette année
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-[#F4C430] tracking-tight">78%</span>
                    <span className="text-[9px] text-white/40 block mt-0.5">Moyenne nationale diplômés</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-8 pt-1">
                    {[30, 45, 35, 60, 50, 78, 65].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-full rounded-sm ${i === 5 ? 'bg-[#F4C430]' : 'bg-white/20'}`} 
                        style={{ height: `${h}%` }} 
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. SECTION "LES UNIVERSITÉS PUBLIQUES" */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A]">
              Les universités publiques du Bénin
            </h2>
            <p className="text-sm text-[#1A1A1A]/50 font-medium">
              Découvrez les 4 pôles majeurs d'enseignement supérieur d'État.
            </p>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => {
              if (setNavigationState) {
                setNavigationState({ page: 'universites' });
              } else {
                setActivePage('universites');
              }
            }}
            className="hidden sm:flex items-center gap-1.5 text-xs font-black text-black hover:text-[#E8B923] cursor-pointer"
            id="view-all-univ-link"
          >
            <span>Explorer tout</span>
            <ArrowRight className="h-4 w-4 stroke-[2.2]" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIVERSITIES.map((univ) => (
            <motion.div
              key={univ.id}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                borderColor: 'rgba(244,196,48,0.4)',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.06)'
              }}
              onClick={() => {
                if (setNavigationState) {
                  setNavigationState({ page: 'university-detail', universityId: univ.id });
                } else {
                  setActivePage('universites');
                }
              }}
              className="group bg-white/75 rounded-[2.5rem] border border-black/5 shadow-sm transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
              id={`univ-card-home-${univ.id}`}
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={univ.image}
                  alt={univ.fullName}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 text-[10px] font-black text-black shadow-sm">
                  {univ.name}
                </div>
              </div>
              <div className="p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A] group-hover:text-[#E8B923] transition-colors leading-tight">
                    {univ.fullName}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/50 mt-2.5 line-clamp-2 leading-relaxed font-medium">
                    {univ.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[10px] font-extrabold text-[#1A1A1A]/40 group-hover:text-black uppercase tracking-wider transition-colors">
                  <span>Tout savoir sur cette filière</span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (setNavigationState) {
                setNavigationState({ page: 'universites' });
              } else {
                setActivePage('universites');
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#F4C430] px-6 py-3.5 text-xs font-black text-black shadow-md shadow-[#F4C430]/20 hover:bg-[#E8B923] hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider"
            id="explore-univ-cta"
          >
            <span>Explorer les universités</span>
            <ArrowRight className="h-4 w-4 stroke-[2.2]" />
          </motion.button>
        </div>
      </motion.section>

      {/* 5. TESTIMONIALS SECTION */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A]">Ils ont trouvé leur voie</h2>
          <p className="text-sm text-[#1A1A1A]/50 font-medium">Découvrez les retours d'expérience et témoignages de nos lauréats post-bac.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => {
            const isActive = activeTestimonialIndex === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: 'rgba(244,196,48,0.3)', boxShadow: '0 15px 30px -5px rgba(0,0,0,0.03)' }}
                onClick={() => setActiveTestimonialIndex(idx)}
                className={`p-8 bg-white/75 rounded-[2.5rem] border transition-all duration-300 cursor-pointer relative flex flex-col justify-between h-full ${
                  isActive ? 'border-[#F4C430] bg-white shadow-md' : 'border-black/5 shadow-sm'
                }`}
                id={`testimonial-card-${idx}`}
              >
                <div className="absolute top-6 right-8 text-[#F4C430]/20 font-serif text-5xl select-none leading-none">
                  “
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed italic font-medium">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-5 border-t border-black/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-[#F4C430]/30"
                  />
                  <div>
                    <h4 className="text-xs font-black text-[#1A1A1A]">{t.name}</h4>
                    <span className="text-[10px] text-[#1A1A1A]/50 font-bold block mt-0.5">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2.5 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonialIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeTestimonialIndex === idx ? 'w-8 bg-[#F4C430]' : 'w-2.5 bg-black/10'
              }`}
              title={`Témoignage ${idx + 1}`}
              id={`testimonial-dot-${idx}`}
            />
          ))}
        </div>
      </motion.section>

      {/* 6. NEWSLETTER */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-12"
      >
        <div className="rounded-[3rem] bg-[#0B0B0A] text-white p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 -right-10 h-80 w-80 rounded-full bg-[#F4C430]/5 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-[#F4C430] uppercase tracking-widest bg-white/5 px-3.5 py-1.5 rounded-full">Ne ratez rien</span>
                <h2 className="text-2xl md:text-3.5xl font-black tracking-tight leading-tight">
                  Restez informé des dernières opportunités
                </h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-lg font-medium">
                  Concours d'excellence, bourses d'études, offres de stages exclusifs... Ne manquez aucune opportunité majeure en vous abonnant.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md">
                <div className="w-full relative">
                  <input
                    type="email"
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 text-xs text-white placeholder-white/30 outline-none focus:bg-white/10 focus:border-[#F4C430] transition-all font-bold"
                    id="newsletter-email-input"
                  />
                  {subscriptionSuccess && (
                    <motion.span 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 -bottom-5 text-[9px] font-bold text-emerald-400"
                    >
                      ✓ Inscription réussie ! Merci pour votre confiance.
                    </motion.span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full sm:w-auto shrink-0 rounded-xl bg-[#F4C430] px-6 py-3.5 text-xs font-black text-black hover:bg-[#E8B923] transition-all cursor-pointer uppercase tracking-wider"
                  id="newsletter-submit-btn"
                >
                  S'abonner
                </motion.button>
              </form>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="relative flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 shadow-2xl backdrop-blur-md"
              >
                <motion.div
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bell className="h-14 w-14 text-[#F4C430] stroke-[1.2] drop-shadow-[0_0_12px_rgba(244,196,48,0.4)]" />
                </motion.div>
                <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 animate-pulse" />
                <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] font-black text-white">
                  1
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Video Teaser Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] bg-[#0B0B0A] border border-white/10 p-6 md:p-8 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#F4C430] flex items-center justify-center text-black font-extrabold text-[10px]">
                    ★
                  </div>
                  <span className="text-sm font-extrabold tracking-tight">Découvrez "Après Mon Bac"</span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="rounded-full bg-white/10 hover:bg-white/20 p-1.5 text-xs cursor-pointer"
                  id="close-video-modal"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video w-full rounded-[1.5rem] bg-zinc-900 border border-white/5 relative flex flex-col items-center justify-center overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                  alt="Student Video Cover"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 m-auto flex flex-col items-center justify-center z-10 text-center px-6">
                  <Play className="h-16 w-16 text-[#F4C430] fill-[#F4C430]/10 mb-4 animate-pulse cursor-pointer" />
                  <h3 className="text-lg font-bold">Présentation Officielle Après Mon Bac Bénin</h3>
                  <p className="text-xs text-white/60 max-w-md mt-1">
                    Découvrez comment la plateforme simplifie l'orientation pour les nouveaux bacheliers.
                  </p>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 flex items-center justify-between text-[10px] font-bold z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-[#F4C430]">0:00 / 2:34</span>
                    <span className="text-white/40">● LIVE</span>
                  </div>
                  <div className="h-1 w-32 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F4C430] w-1/4" />
                  </div>
                  <div>
                    <span>1080p HD</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-white/50 text-center">
                Ce teaser présente les ressources interactives et le simulateur de moyenne de la plateforme.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
