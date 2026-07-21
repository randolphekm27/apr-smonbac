import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, Sparkles, BookOpen, GraduationCap, Trophy, Award,
  Briefcase, CheckCircle, ArrowRight, Bell, Star, ArrowUpRight, 
  ChevronRight, Smile, Users, Heart
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { University } from '../types';
import ImageWithFallback from './ImageWithFallback';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface AccueilPageProps {
  setActivePage: (page: AppActivePage) => void;
  setNavigationState?: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
  onSearch: (query: string) => void;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = value;
    if (end === 0) return;
    
    const duration = 0.9; // seconds
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
  }, [value, hasStarted]);

  return (
    <span ref={elementRef} className="font-extrabold tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function AccueilPage({ setActivePage, setNavigationState, onSearch }: AccueilPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const { data, error } = await supabase
          .from('universites')
          .select('*')
          .limit(4);
        if (error) throw error;
        setUniversities(data || []);
      } catch (err) {
        console.error("Error fetching universities on home page:", err);
      }
    }
    fetchUniversities();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    onSearch(term);
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

  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

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
    <div className="bg-bg-main text-text-main overflow-hidden selection:bg-accent/30 selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 md:py-24">
        {/* Soft elegant background live ambient light */}
        <div className="absolute top-0 right-1/4 -z-20 h-125 w-125 rounded-full bg-linear-to-tr from-accent/10 to-yellow-200/5 blur-3xl opacity-60 animate-pulse duration-8000" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Framer-motion staggered text reveal */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                className="inline-flex items-center gap-2 rounded-full bg-accent-light px-4 py-1.5 text-xs font-black text-accent uppercase tracking-wider"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>L'excellence universitaire au Bénin</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6.5xl font-black tracking-tight text-text-main leading-[1.05]">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                  className="block"
                >
                  Ton avenir
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
                  className="block"
                >
                  commence
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
                  className="text-accent relative inline-block mt-1"
                >
                  après le BAC.
                  <span className="absolute left-0 bottom-2 h-2.5 w-full bg-accent/20 -z-10 rounded-full" />
                </motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="text-[14.5px] text-text-main/60 leading-relaxed max-w-xl font-medium"
              >
                Explorez plus de 200 filières d'avenir, découvrez les 4 grandes universités publiques, préparez vos concours d'excellence, postulez à des bourses exclusives et saisissez des opportunités de stages au Bénin.
              </motion.p>
            </div>

            {/* Action-Oriented Search Bar Form with Glow Effect */}
            <motion.form 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
              onSubmit={handleSearchSubmit} 
              className="relative max-w-xl group"
            >
              <div className="flex items-center rounded-full bg-white p-2 border border-black/5 shadow-xl shadow-black/5 backdrop-blur-lg focus-within:border-accent/50 focus-within:ring-4 focus-within:ring-accent/$1 transition-all duration-300">
                <div className="pl-4 text-text-main/65 group-focus-within:text-accent transition-colors">
                  <Search className="h-5 w-5 stroke-$1" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Trouvez votre formation..."
                  className="w-full min-w-0 bg-transparent px-3 py-3 text-sm font-bold text-text-main placeholder-black/30 outline-none"
                  id="hero-search-input"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex h-12 w-12 sm:w-auto px-0 sm:px-6 shrink-0 items-center justify-center gap-2 rounded-full bg-accent text-black font-extrabold text-xs shadow-md shadow-accent/$1 hover:bg-accent-hover hover:shadow-lg transition-all cursor-pointer"
                  id="hero-search-btn"
                >
                  <span className="hidden sm:inline">Rechercher</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-$1" />
                </motion.button>
              </div>
            </motion.form>

            {/* Popular searches */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
              className="flex flex-wrap items-center gap-2.5 text-xs"
            >
              <span className="text-text-main/65 font-extrabold uppercase tracking-wide text-[10px]">Recherches fréquentes :</span>
              {['Informatique', 'Médecine', 'Droit', 'Ingénierie', 'Gestion'].map((tag) => (
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  key={tag}
                  type="button"
                  onClick={() => handlePopularSearch(tag)}
                  className="rounded-full border border-black/5 bg-white px-3.5 py-2 font-bold text-text-main/70 shadow-sm hover:border-accent/40 hover:bg-accent/5 hover:text-black transition-all cursor-pointer"
                  id={`popular-tag-${tag.toLowerCase()}`}
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Photograph & Halo with Zoom and Rotation */}
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
              className="absolute -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" 
            />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute -z-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border border-accent/10 animate-rotate-slow"
            />

            {/* Student Image Container (Scale-down zoom out enter) */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.08, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: easeOutExpo, delay: 0.2 }}
              className="relative w-full max-w-92.5 aspect-$1/$2 rounded-[2.5rem] p-3.5 border border-white bg-white/40 shadow-2xl backdrop-blur-sm overflow-hidden group"
            >
              <div className="w-full h-full rounded-4xl overflow-hidden relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Étudiant béninois"
                  className="w-full h-full object-cover transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
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
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-4"
              >
                <BookOpen className="h-6 w-6 stroke-$1" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-text-main">
                <Counter value={213} />
              </span>
              <span className="text-xs text-text-main/60 font-bold tracking-tight mt-1.5 uppercase">Filières d'Orientation</span>
            </div>

            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 p-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-4"
              >
                <GraduationCap className="h-6 w-6 stroke-$1" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-text-main">
                <Counter value={4} />
              </span>
              <span className="text-xs text-text-main/60 font-bold tracking-tight mt-1.5 uppercase">Universités publiques</span>
            </div>

            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 p-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-4"
              >
                <Users className="h-6 w-6 stroke-$1" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-text-main">
                <Counter value={64} />
              </span>
              <span className="text-xs text-text-main/60 font-bold tracking-tight mt-1.5 uppercase">Écoles & Instituts</span>
            </div>

            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 p-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-4"
              >
                <Star className="h-6 w-6 stroke-$1" />
              </motion.div>
              <span className="text-3xl md:text-4xl font-black text-text-main">
                <Counter value={6670} />
              </span>
              <span className="text-xs text-text-main/60 font-bold tracking-tight mt-1.5 uppercase">Places boursières (guide 2025-2026)</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. SECTION "QUE RECHERCHEZ-VOUS ?" (Staggered cards on scroll) */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-16 md:py-24"
      >
        <div className="text-center space-y-3 mb-12 animate-fade-in">
          <h2 className="text-3xl font-black tracking-tight text-text-main">Que recherchez-vous ?</h2>
          <p className="text-sm text-text-main/60 font-medium">Naviguez facilement au cœur des parcours d'avenir au Bénin.</p>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {[
            { page: 'universites' as const, icon: BookOpen, title: 'Filières', desc: 'Explorer les formations', id: 'search-card-filieres' },
            { page: 'universites' as const, icon: GraduationCap, title: 'Universités', desc: 'Découvrir les campus', id: 'search-card-universites' },
            { page: 'concours' as const, icon: Trophy, title: 'Concours', desc: 'Préparez votre d\'élite', id: 'search-card-concours' },
            { page: 'bourses' as const, icon: Award, title: 'Bourses d\'études', desc: 'Financer vos ambitions', id: 'search-card-bourses' },
            { page: 'stages' as const, icon: Briefcase, title: 'Stages', desc: 'Saisir le premier emploi', id: 'search-card-stages' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } }
                }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  borderColor: 'rgba(239,191,36,0.4)',
                  boxShadow: '0 20px 25px -5px rgba(25,24,26,0.05)'
                }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (setNavigationState) {
                    setNavigationState({ page: item.page, majorId: (item as any).majorId });
                  } else {
                    setActivePage(item.page);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (setNavigationState) {
                      setNavigationState({ page: item.page, majorId: (item as any).majorId });
                    } else {
                      setActivePage(item.page);
                    }
                  }
                }}
                className="group flex flex-col items-center text-center p-7 bg-white rounded-4xl border border-black/5 shadow-sm transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                id={item.id}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300 mb-6">
                  <Icon className="h-6 w-6 stroke-$1" />
                </div>
                <h3 className="text-sm font-black text-text-main mb-1.5">{item.title}</h3>
                <p className="text-[11px] font-bold text-text-main/65 group-hover:text-black/60 transition-colors leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* 3. SECTION "POURQUOI CHOISIR ?" (Encarté avec coins de 40px) */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-12"
      >
        <div className="rounded-[2.5rem] bg-text-main text-white p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-112.5 w-112.5 rounded-full bg-accent/5 blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-12 relative">
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest bg-accent/10 px-3.5 py-1.5 rounded-full">Atouts d'Excellence</span>
                <h2 className="text-3xl md:text-5.5xl font-black tracking-tight leading-tight">
                  Pourquoi choisir <br />
                  <span className="text-accent">Après Mon Bac ?</span>
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
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-black font-black text-xs mt-0.5 shadow-md shadow-accent/$1">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-accent transition-colors">
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
              <div className="relative w-80 h-80 rounded-4xl bg-linear-to-tr from-white/5 to-white/10 border border-white/10 shadow-2xl backdrop-blur-md flex items-center justify-center">
                <svg className="w-44 h-44 text-accent drop-shadow-[0_0_20px_rgba(239,191,36,0.3)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>

                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 h-8 w-8 rounded-full bg-linear-to-tr from-accent to-yellow-300 text-black flex items-center justify-center text-xs font-black shadow-lg animate-float-slow"
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

                {/* Floating Rate Card with continuous float oscillation */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-6 -right-4 md:-right-8 rounded-2xl border border-white/10 bg-black/80 p-5.5 shadow-2xl backdrop-blur-xl w-52 space-y-3 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-white/50 uppercase font-extrabold tracking-wider">Taux d'insertion</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-extrabold text-emerald-400">
                      +12% cette année
                    </span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-accent tracking-tight">78%</span>
                    <span className="text-[9px] text-white/55 block mt-0.5">Moyenne nationale diplômés</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-8 pt-1">
                    {[30, 45, 35, 60, 50, 78, 65].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-full rounded-sm ${i === 5 ? 'bg-accent' : 'bg-white/20'}`} 
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

      {/* 4. SECTION "LES UNIVERSITÉS PUBLIQUES" (Premium design system cards) */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-16 md:py-24"
      >
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-black tracking-tight text-text-main">
              Les universités publiques du Bénin
            </h2>
            <p className="text-sm text-text-main/60 font-medium">
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
            className="hidden sm:flex items-center gap-1.5 text-xs font-black text-black hover:text-accent cursor-pointer"
            id="view-all-univ-link"
          >
            <span>Explorer tout</span>
            <ArrowRight className="h-4 w-4 stroke-$1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.map((univ) => (
            <motion.div
              key={univ.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (setNavigationState) {
                  setNavigationState({ page: 'university-detail', universityId: univ.slug });
                } else {
                  setActivePage('universites');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (setNavigationState) {
                    setNavigationState({ page: 'university-detail', universityId: univ.slug });
                  } else {
                    setActivePage('universites');
                  }
                }
              }}
              className="group card-premium overflow-hidden cursor-pointer flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              id={`univ-card-home-${univ.id}`}
            >
              <div className="h-44 overflow-hidden relative">
                <ImageWithFallback
                  src={univ.banner_url || univ.logo_url}
                  alt={univ.nom}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 text-[10px] font-black text-black shadow-sm uppercase">
                  {univ.nom.split(' ')[0]}
                </div>
              </div>
              <div className="p-7 flex flex-col grow justify-between">
                <div>
                  <h3 className="text-sm font-black text-text-main group-hover:text-accent transition-colors leading-tight">
                    {univ.nom}
                  </h3>
                  <p className="text-xs text-text-main/60 mt-2.5 line-clamp-2 leading-relaxed font-medium">
                    {univ.description || 'Information à venir'}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[10px] font-extrabold text-text-main/65 group-hover:text-black uppercase tracking-wider transition-colors">
                  <span>Tout savoir sur cette université</span>
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 stroke-$1" />
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
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-black text-black shadow-md shadow-accent/$1 hover:bg-accent-hover hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider"
            id="explore-univ-cta"
          >
            <span>Explorer les universités</span>
            <ArrowRight className="h-4 w-4 stroke-$1" />
          </motion.button>
        </div>
      </motion.section>

      {/* 5. POURQUOI CETTE PLATEFORME */}
      <motion.section
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-black tracking-tight text-text-main">Des informations sourcées, pas des promesses</h2>
          <p className="text-sm text-text-main/60 font-medium max-w-2xl mx-auto">Tout ce que tu lis ici vient du Guide d'information universitaire 2025-2026 du Ministère de l'Enseignement Supérieur.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: '213 filières détaillées', text: "Conditions d'admission, débouchés, quotas de bourses : extraits du guide officiel, pas de texte générique." },
            { icon: GraduationCap, title: '64 écoles et instituts', text: "Rattachés à leur université, avec leurs propres filières et conditions d'entrée." },
            { icon: Star, title: 'Mis à jour pour 2025-2026', text: "Les quotas de bourses et places FPP affichés correspondent à l'édition la plus récente du guide MESRS." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, boxShadow: '0 15px 30px -5px rgba(0,0,0,0.03)' }}
              className="p-8 bg-white/75 rounded-[2.5rem] border border-black/5 shadow-sm transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-black text-text-main">{item.title}</h4>
              <p className="text-xs text-text-main/60 leading-relaxed font-medium">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 6. NEWSLETTER (Encarté avec coins de 40px) */}
      <motion.section 
        variants={viewportVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl px-6 py-12"
      >
        <div className="rounded-[2.5rem] bg-text-main text-white p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 -right-10 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest bg-white/5 px-3.5 py-1.5 rounded-full">Ne ratez rien</span>
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
                    className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-3.5 text-xs text-white placeholder-white/30 outline-none focus:bg-white/10 focus:border-accent transition-all font-bold"
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
                  className="w-full sm:w-auto shrink-0 rounded-full bg-accent px-6 py-3.5 text-xs font-black text-black hover:bg-accent-hover transition-all cursor-pointer uppercase tracking-wider"
                  id="newsletter-submit-btn"
                >
                  S'abonner
                </motion.button>
              </form>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative flex h-32 w-32 items-center justify-center rounded-4xl bg-linear-to-tr from-white/5 to-white/10 border border-white/10 shadow-2xl backdrop-blur-md"
              >
                <div className="animate-bell-swing">
                  <Bell className="h-14 w-14 text-accent stroke-$1 drop-shadow-[0_0_12px_rgba(239,191,36,0.4)]" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 animate-pulse" />
                <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] font-black text-white">
                  1
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
