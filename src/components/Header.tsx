import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface HeaderProps {
  activePage: AppActivePage;
  setActivePage: (page: AppActivePage) => void;
  onOpenSearch?: () => void;
}

export default function Header({ activePage, setActivePage, onOpenSearch }: HeaderProps) {
  const menuItems = [
    { label: 'Accueil', value: 'accueil' as const },
    { label: 'Orientation', value: 'universites' as const },
    { label: 'Concours', value: 'concours' as const },
    { label: 'Bourses', value: 'bourses' as const },
    { label: 'Stages', value: 'stages' as const },
    { label: 'Actualités', value: 'actualites' as const },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-[#1A1A1A]/5 bg-white/80 backdrop-blur-xl transition-all duration-300"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => setActivePage('accueil')}
          className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
          id="logo-button"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4C430] text-black shadow-md shadow-[#F4C430]/20 font-extrabold rotate-6 group-hover:rotate-12 transition-transform duration-300">
            <span className="text-lg font-black select-none -rotate-6">A</span>
            <div className="absolute inset-0 rounded-xl border border-white/20" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-lg font-extrabold tracking-tight text-[#1A1A1A] leading-tight group-hover:text-[#E8B923] transition-colors duration-200">
              Après Mon Bac
            </span>
            <span className="text-[10px] font-extrabold tracking-widest text-[#1A1A1A]/50 uppercase leading-none">
              BÉNIN ORIENTATION
            </span>
          </div>
        </button>

        {/* Center horizontal menu with spring indicator */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#FAFAF8]/50 p-1.5 rounded-full border border-black/5">
          {menuItems.map((item, index) => {
            const isSelected = activePage === item.value || 
              (item.value === 'universites' && ['university-detail', 'school-detail', 'filiere-detail'].includes(activePage));

            return (
              <button
                key={index}
                onClick={() => setActivePage(item.value)}
                className={`relative px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer rounded-full ${
                  isSelected
                    ? 'text-black font-extrabold'
                    : 'text-[#1A1A1A]/60 hover:text-black hover:bg-black/5'
                }`}
                id={`menu-nav-${item.label.toLowerCase()}`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeHeaderPill"
                    className="absolute inset-0 bg-[#F4C430] rounded-full -z-10 shadow-sm shadow-[#F4C430]/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side: Search */}
        <div className="flex items-center gap-4">
          {/* Search Icon button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenSearch}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm hover:border-[#F4C430]/30 hover:bg-[#F4C430]/5 hover:text-[#E8B923] transition-all cursor-pointer"
            title="Recherche"
            id="search-toggle"
          >
            <Search className="h-4.5 w-4.5 stroke-[2.2]" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
