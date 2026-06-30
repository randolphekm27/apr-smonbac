import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { UNIVERSITIES, SCHOOLS, MAJORS } from '../data';

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
  if (activePage === 'accueil') return null;

  // Helper to transition state in App
  const navigateTo = (page: AppActivePage, uId?: string, sId?: string, mId?: string) => {
    if (setNavigationState) {
      setNavigationState({ page, universityId: uId, schoolId: sId, majorId: mId });
    } else {
      setActivePage(page);
    }
  };

  const university = universityId ? UNIVERSITIES.find(u => u.id === universityId) : null;
  const school = schoolId ? SCHOOLS.find(s => s.id === schoolId) : null;
  const major = majorId ? MAJORS.find(m => m.id === majorId) : null;

  return (
    <div className="bg-[#FAFAF8] py-4 border-b border-[#1A1A1A]/5" id="breadcrumb-navigation-container">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]/50 flex-wrap">
          {/* Home Node */}
          <button
            onClick={() => navigateTo('accueil')}
            className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
            id="breadcrumb-home"
          >
            <Home className="h-3.5 w-3.5 text-[#E8B923]" />
            <span>Accueil</span>
          </button>

          <ChevronRight className="h-3.5 w-3.5 text-[#1A1A1A]/30 shrink-0" />

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
                Mon Orientation
              </button>

              {/* Level 1: University Detail */}
              {university && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-[#1A1A1A]/30 shrink-0" />
                  <button
                    onClick={() => navigateTo('university-detail', university.id)}
                    className={`hover:text-black transition-colors cursor-pointer ${
                      activePage === 'university-detail' ? 'text-black font-extrabold' : ''
                    }`}
                    id={`breadcrumb-univ-${university.id}`}
                  >
                    {university.fullName}
                  </button>
                </>
              )}

              {/* Level 2: School Detail */}
              {school && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-[#1A1A1A]/30 shrink-0" />
                  <button
                    onClick={() => navigateTo('school-detail', school.universityId, school.id)}
                    className={`hover:text-black transition-colors cursor-pointer ${
                      activePage === 'school-detail' ? 'text-black font-extrabold' : ''
                    }`}
                    id={`breadcrumb-school-${school.id}`}
                  >
                    {school.name}
                  </button>
                </>
              )}

              {/* Level 3: Major Detail (if navigating inside school/university context) */}
              {major && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-[#1A1A1A]/30 shrink-0" />
                  <span className="text-black font-extrabold" id={`breadcrumb-major-${major.id}`}>
                    {major.name}
                  </span>
                </>
              )}

              {/* Direct Major Detail (e.g. from general search/explore, without school context) */}
              {activePage === 'filiere-detail' && !school && major && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-[#1A1A1A]/30 shrink-0" />
                  <span className="text-black font-extrabold" id={`breadcrumb-major-direct-${major.id}`}>
                    {major.name}
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
