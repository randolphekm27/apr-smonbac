import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, GraduationCap, BookOpen, ExternalLink, ArrowRight, Home, Award, Briefcase, Megaphone } from 'lucide-react';

// Components
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Footer from './components/Footer';

// Pages
import AccueilPage from './components/AccueilPage';
import UniversitesPage from './components/UniversitesPage';
import UniversityPage from './components/UniversityPage';
import SchoolPage from './components/SchoolPage';
import FilierePage from './components/FilierePage';
import ConcoursPage from './components/ConcoursPage';
import BoursesPage from './components/BoursesPage';
import StagesPage from './components/StagesPage';
import ActualitesPage from './components/ActualitesPage';

import { UNIVERSITIES, SCHOOLS, MAJORS } from './data';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface NavigationState {
  page: AppActivePage;
  universityId?: string;
  schoolId?: string;
  majorId?: string;
}

export default function App() {
  const [activePage, setActivePage] = useState<AppActivePage>('accueil');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | undefined>(undefined);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | undefined>(undefined);
  const [selectedMajorId, setSelectedMajorId] = useState<string | undefined>(undefined);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Pre-configured dynamic search index from our relational data
  const dynamicSuggestions = [
    ...UNIVERSITIES.map(u => ({
      title: u.fullName + ' (' + u.name + ')',
      type: 'Université',
      desc: u.description,
      action: { page: 'university-detail' as const, universityId: u.id }
    })),
    ...SCHOOLS.map(s => ({
      title: s.fullName + ' (' + s.name + ')',
      type: 'Établissement',
      desc: s.description,
      action: { page: 'school-detail' as const, universityId: s.universityId, schoolId: s.id }
    })),
    ...MAJORS.map(m => ({
      title: m.name,
      type: 'Filière',
      desc: m.description,
      action: { page: 'filiere-detail' as const, majorId: m.id }
    }))
  ];

  // Sync scroll to top on page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activePage, selectedUniversityId, selectedSchoolId, selectedMajorId]);

  // Handle URL parsing on mount and popstate events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      
      if (path === '/' || path === '/accueil') {
        setActivePage('accueil');
        setSelectedUniversityId(undefined);
        setSelectedSchoolId(undefined);
        setSelectedMajorId(undefined);
      } else if (path === '/orientation/universites') {
        setActivePage('universites');
        setSelectedUniversityId(undefined);
        setSelectedSchoolId(undefined);
        setSelectedMajorId(undefined);
      } else if (path.startsWith('/orientation/universites/')) {
        const parts = path.split('/');
        // Format: /orientation/universites/:univId/ecoles/:schoolId
        if (parts.length === 6 && parts[4] === 'ecoles') {
          setActivePage('school-detail');
          setSelectedUniversityId(parts[3]);
          setSelectedSchoolId(parts[5]);
          setSelectedMajorId(undefined);
        } else {
          // Format: /orientation/universites/:univId
          setActivePage('university-detail');
          setSelectedUniversityId(parts[3]);
          setSelectedSchoolId(undefined);
          setSelectedMajorId(undefined);
        }
      } else if (path.startsWith('/orientation/filiere/')) {
        const parts = path.split('/');
        setActivePage('filiere-detail');
        setSelectedUniversityId(undefined);
        setSelectedSchoolId(undefined);
        setSelectedMajorId(parts[3]);
      } else if (path === '/concours') {
        setActivePage('concours');
      } else if (path === '/bourses') {
        setActivePage('bourses');
      } else if (path === '/stages') {
        setActivePage('stages');
      } else if (path === '/actualites') {
        setActivePage('actualites');
      }
    };

    // Parse once on page load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update navigation state dynamically & push to browser history
  const setNavigationState = (state: NavigationState) => {
    setActivePage(state.page);
    setSelectedUniversityId(state.universityId);
    setSelectedSchoolId(state.schoolId);
    setSelectedMajorId(state.majorId);

    // Formulate a clean, professional path structure
    let path = '/';
    if (state.page === 'accueil') path = '/';
    else if (state.page === 'universites') path = '/orientation/universites';
    else if (state.page === 'university-detail' && state.universityId) {
      path = `/orientation/universites/${state.universityId}`;
    }
    else if (state.page === 'school-detail' && state.universityId && state.schoolId) {
      path = `/orientation/universites/${state.universityId}/ecoles/${state.schoolId}`;
    }
    else if (state.page === 'filiere-detail' && state.majorId) {
      path = `/orientation/filiere/${state.majorId}`;
    }
    else if (state.page === 'concours') path = '/concours';
    else if (state.page === 'bourses') path = '/bourses';
    else if (state.page === 'stages') path = '/stages';
    else if (state.page === 'actualites') path = '/actualites';

    // Push the state into the browser's window history object
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  const handleSimplePageChange = (page: AppActivePage) => {
    setNavigationState({ page });
  };

  // Handle searching inside the modal
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = dynamicSuggestions.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.type.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleSelectResult = (action: NavigationState) => {
    setNavigationState(action);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] flex flex-col justify-between selection:bg-[#F4C430]/30 selection:text-black">
      
      {/* Header element */}
      <Header 
        activePage={activePage} 
        setActivePage={handleSimplePageChange} 
        onOpenSearch={() => setIsSearchOpen(true)} 
      />

      {/* breadcrumb under header */}
      <Breadcrumb 
        activePage={activePage} 
        setActivePage={handleSimplePageChange} 
        universityId={selectedUniversityId}
        schoolId={selectedSchoolId}
        majorId={selectedMajorId}
        setNavigationState={setNavigationState}
      />

      {/* Main Pages router inside AnimatePresence */}
      <main className="flex-grow pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePage}-${selectedUniversityId || ''}-${selectedSchoolId || ''}-${selectedMajorId || ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activePage === 'accueil' && (
              <AccueilPage 
                setActivePage={handleSimplePageChange} 
                setNavigationState={setNavigationState}
                onSearch={handleHeroSearch} 
              />
            )}
            
            {activePage === 'universites' && (
              <UniversitesPage 
                setActivePage={handleSimplePageChange} 
                setNavigationState={setNavigationState}
              />
            )}
            
            {activePage === 'university-detail' && selectedUniversityId && (
              <UniversityPage 
                universityId={selectedUniversityId}
                setNavigationState={setNavigationState}
              />
            )}
            
            {activePage === 'school-detail' && selectedSchoolId && (
              <SchoolPage 
                schoolId={selectedSchoolId}
                setNavigationState={setNavigationState}
              />
            )}
            
            {activePage === 'filiere-detail' && selectedMajorId && (
              <FilierePage 
                majorId={selectedMajorId}
                setNavigationState={setNavigationState}
              />
            )}

            {activePage === 'concours' && (
              <ConcoursPage 
                setActivePage={handleSimplePageChange} 
              />
            )}

            {activePage === 'bourses' && (
              <BoursesPage 
                setActivePage={handleSimplePageChange} 
              />
            )}

            {activePage === 'stages' && (
              <StagesPage 
                setActivePage={handleSimplePageChange} 
              />
            )}

            {activePage === 'actualites' && (
              <ActualitesPage 
                setActivePage={handleSimplePageChange} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Premium Mobile Navigation Bar */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-white/90 backdrop-blur-xl border border-[#1A1A1A]/10 px-3 py-2 rounded-2xl shadow-xl shadow-black/5 flex items-center justify-around gap-1 md:hidden">
        {[
          { icon: Home, page: 'accueil' as const, label: 'Accueil' },
          { icon: GraduationCap, page: 'universites' as const, label: 'Orientation' },
          { icon: Award, page: 'concours' as const, label: 'Concours' },
          { icon: BookOpen, page: 'bourses' as const, label: 'Bourses' },
          { icon: Briefcase, page: 'stages' as const, label: 'Stages' },
          { icon: Megaphone, page: 'actualites' as const, label: 'Actu' }
        ].map((item) => {
          const IconComponent = item.icon;
          // Determine if this mobile navigation item is considered selected
          const isSelected = activePage === item.page || 
            (item.page === 'universites' && ['university-detail', 'school-detail', 'filiere-detail'].includes(activePage));
          
          return (
            <button
              key={item.page}
              onClick={() => handleSimplePageChange(item.page)}
              className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-300 group cursor-pointer"
              id={`mobile-nav-${item.page}`}
            >
              {/* Highlight background pill */}
              {isSelected && (
                <motion.div
                  layoutId="mobileActivePill"
                  className="absolute inset-0 bg-[#F4C430]/10 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <IconComponent 
                className={`h-5 w-5 transition-transform duration-200 group-active:scale-95 ${
                  isSelected ? 'text-[#E8B923] stroke-[2.5]' : 'text-black/50 group-hover:text-black'
                }`} 
              />
              <span className={`text-[9px] mt-1 font-bold tracking-tight transition-colors ${
                isSelected ? 'text-black' : 'text-black/40 group-hover:text-black'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer element */}
      <Footer setActivePage={handleSimplePageChange} />

      {/* Elegant Finder/Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 md:pt-28 backdrop-blur-md"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -15 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-black/5 shadow-2xl"
              id="search-finder-modal"
            >
              {/* Search input header */}
              <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4">
                <Search className="h-5 w-5 text-black/40 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une école, filière (ex: informatique)..."
                  className="w-full bg-transparent text-sm text-[#1A1A1A] placeholder-black/40 outline-none"
                  autoFocus
                  id="finder-input"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="rounded-full bg-black/5 hover:bg-black/10 p-1.5 text-[#1A1A1A]/60 transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Suggestions / Results list */}
              <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-[#E8B923] uppercase tracking-wider pl-2 block">
                      Résultats trouvés ({searchResults.length})
                    </span>
                    {searchResults.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectResult(item.action)}
                        className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#F4C430]/5 hover:text-black border border-transparent hover:border-[#F4C430]/10 transition-all group cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-black">{item.title}</span>
                            <span className="rounded-md bg-[#F4C430]/10 px-1.5 py-0.5 text-[8px] font-extrabold text-[#E8B923] uppercase tracking-wider">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-[10px] text-black/50 line-clamp-1 group-hover:text-black/70">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-black/30 group-hover:text-black group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="h-12 w-12 rounded-full bg-amber-500/10 text-[#E8B923] flex items-center justify-center mx-auto text-lg">
                      🔎
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold">Aucun résultat exact</h4>
                      <p className="text-[11px] text-black/40 mt-1 max-w-xs mx-auto leading-relaxed">
                        Notre catalogue comprend toutes les universités publiques, instituts et filières d'orientation.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Standard Quick Suggestions when input is empty */
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 pl-2 mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#E8B923]" />
                      <span className="text-[10px] font-extrabold text-black/40 uppercase tracking-wider">
                        Recommandations d'Orientation
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dynamicSuggestions.slice(0, 5).map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectResult(item.action)}
                          className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-black/5 hover:text-black transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-black/5 flex items-center justify-center text-xs group-hover:bg-[#F4C430] group-hover:text-black transition-colors">
                              {item.type === 'Filière' ? <BookOpen className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-black block">{item.title}</span>
                              <span className="text-[9px] text-black/40 font-medium line-clamp-1">{item.desc}</span>
                            </div>
                          </div>
                          <div className="text-[10px] font-extrabold text-black/30 group-hover:text-black flex items-center gap-0.5">
                            <span>Ouvrir</span>
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
