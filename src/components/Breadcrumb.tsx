import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface BreadcrumbProps {
  activePage: AppActivePage;
  setActivePage: (page: AppActivePage) => void;
  universityId?: string;
  schoolId?: string;
  majorId?: string;
  setNavigationState?: (state: { page: AppActivePage; universityId?: string; schoolId?: string; majorId?: string }) => void;
}

export default function Breadcrumb({ 
  activePage, 
  setActivePage, 
  universityId, 
  schoolId, 
  majorId,
  setNavigationState
}: BreadcrumbProps) {
  const [univName, setUnivName] = React.useState<string>('');
  const [schoolName, setSchoolName] = React.useState<string>('');
  const [majorName, setMajorName] = React.useState<string>('');

  React.useEffect(() => {
    async function fetchNames() {
      if (universityId) {
        const { data } = await supabase.from('universites').select('nom').eq('slug', universityId).single();
        if (data) setUnivName(data.nom);
      }
      if (schoolId) {
        const { data } = await supabase.from('ecoles').select('nom').eq('slug', schoolId).single();
        if (data) setSchoolName(data.nom);
      }
      if (majorId) {
        const { data } = await supabase.from('filieres').select('nom').eq('slug', majorId).single();
        if (data) setMajorName(data.nom);
      }
    }
    fetchNames();
  }, [universityId, schoolId, majorId]);

  if (activePage === 'accueil') return null;

  // Helper to transition state in App
  const navigateTo = (page: AppActivePage, uId?: string, sId?: string, mId?: string) => {
    if (setNavigationState) {
      setNavigationState({ page, universityId: uId, schoolId: sId, majorId: mId });
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className="bg-bg-main py-4 border-b border-text-main/$1" id="breadcrumb-navigation-container">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center gap-2 text-xs font-bold text-text-main/50 flex-wrap">
          {/* Home Node */}
          <button
            onClick={() => navigateTo('accueil')}
            className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
            id="breadcrumb-home"
          >
            <Home className="h-3.5 w-3.5 text-accent" />
            <span>Accueil</span>
          </button>

          <ChevronRight className="h-3.5 w-3.5 text-text-main/30 shrink-0" />

          {/* Actualités / Concours / Bourses / Stages specific breadcrumbs */}
          {activePage === 'actualites' && (
            <span className="text-black font-extrabold">Actualités & Communiqués</span>
          )}
          {activePage === 'concours' && (
            <span className="text-black font-extrabold">Concours d'Excellence</span>
          )}
          {activePage === 'bourses' && (
            <span className="text-black font-extrabold">Bourses d'Études</span>
          )}
          {activePage === 'stages' && (
            <span className="text-black font-extrabold">Stages & Immersion</span>
          )}

          {/* Orientation dynamic flows */}
          {['universites', 'university-detail', 'school-detail', 'filiere-detail'].includes(activePage) && (
            <>
              {/* Orientation Root */}
              <button
                onClick={() => navigateTo('universites')}
                className={`hover:text-black transition-colors cursor-pointer ${
                  activePage === 'universites' ? 'text-black font-extrabold' : ''
                }`}
                id="breadcrumb-orientation-root"
              >
                Orientation
              </button>

              {/* Level 1: University Detail */}
              {universityId && univName && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-text-main/30 shrink-0" />
                  <button
                    onClick={() => navigateTo('university-detail', universityId)}
                    className={`hover:text-black transition-colors cursor-pointer ${
                      activePage === 'university-detail' ? 'text-black font-extrabold' : ''
                    }`}
                    id={`breadcrumb-univ-${universityId}`}
                  >
                    {univName}
                  </button>
                </>
              )}

              {/* Level 2: School Detail */}
              {schoolId && schoolName && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-text-main/30 shrink-0" />
                  <button
                    onClick={() => navigateTo('school-detail', universityId, schoolId)}
                    className={`hover:text-black transition-colors cursor-pointer ${
                      activePage === 'school-detail' ? 'text-black font-extrabold' : ''
                    }`}
                    id={`breadcrumb-school-${schoolId}`}
                  >
                    {schoolName}
                  </button>
                </>
              )}

              {/* Level 3: Major Detail (if navigating inside school/university context) */}
              {schoolId && majorId && majorName && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-text-main/30 shrink-0" />
                  <span className="text-black font-extrabold" id={`breadcrumb-major-${majorId}`}>
                    {majorName}
                  </span>
                </>
              )}

              {/* Direct Major Detail (e.g. from general search/explore, without school context) */}
              {activePage === 'filiere-detail' && !schoolId && majorId && majorName && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-text-main/30 shrink-0" />
                  <span className="text-black font-extrabold" id={`breadcrumb-major-direct-${majorId}`}>
                    {majorName}
                  </span>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
