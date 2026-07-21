import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, ChevronUp } from 'lucide-react';

type AppActivePage = 'accueil' | 'universites' | 'university-detail' | 'school-detail' | 'filiere-detail' | 'concours' | 'bourses' | 'stages' | 'actualites';

interface FooterProps {
  setActivePage: (page: AppActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-text-main/$1 text-text-main mt-20">
      {/* Top Footer Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Logo & Desc */}
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => { setActivePage('accueil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 text-left cursor-pointer"
              id="footer-logo"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-black shadow-sm font-extrabold rotate-6">
                <span className="text-base select-none">A</span>
              </div>
              <span className="text-base font-extrabold tracking-tight">Après Mon Bac</span>
            </button>
            <p className="text-xs text-text-main/60 leading-relaxed max-w-xs">
              La plateforme d'orientation d'excellence n°1 pour les bacheliers béninois. Conçue pour guider votre parcours universitaire au Bénin.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-extrabold tracking-wider text-black uppercase mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => { setActivePage('accueil'); window.scrollTo({ top: 0 }); }}
                  className="text-text-main/60 hover:text-accent transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-home"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('universites'); window.scrollTo({ top: 0 }); }}
                  className="text-text-main/60 hover:text-accent transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-orientation"
                >
                  Orientation & Campus
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('concours'); window.scrollTo({ top: 0 }); }}
                  className="text-text-main/60 hover:text-accent transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-concours"
                >
                  Concours d'État
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('bourses'); window.scrollTo({ top: 0 }); }}
                  className="text-text-main/60 hover:text-accent transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-bourses"
                >
                  Bourses & Allocations
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('stages'); window.scrollTo({ top: 0 }); }}
                  className="text-text-main/60 hover:text-accent transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-stages"
                >
                  Premier Stage
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('actualites'); window.scrollTo({ top: 0 }); }}
                  className="text-text-main/60 hover:text-accent transition-colors cursor-pointer text-left font-semibold"
                  id="footer-nav-actualites"
                >
                  Actualités & MESRS
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Ressources */}
          <div>
            <h4 className="text-xs font-extrabold tracking-wider text-black uppercase mb-4">Ressources</h4>
            <ul className="space-y-2.5 text-xs text-text-main/60">
              <li><button type="button" className="hover:text-accent cursor-pointer transition-colors font-semibold text-left" onClick={() => setActivePage('universites')}>Conseils d'orientation</button></li>
              <li><button type="button" className="hover:text-accent cursor-pointer transition-colors font-semibold text-left" onClick={() => setActivePage('bourses')}>Guides et Outils</button></li>
              <li><button type="button" className="hover:text-accent cursor-pointer transition-colors font-semibold text-left" onClick={() => setActivePage('accueil')}>FAQ Bacheliers</button></li>
              <li><button type="button" className="hover:text-accent cursor-pointer transition-colors font-semibold text-left" onClick={() => setActivePage('actualites')}>Blog Actualités</button></li>
            </ul>
          </div>

          {/* Column 4: Légal */}
          <div>
            <h4 className="text-xs font-extrabold tracking-wider text-black uppercase mb-4">Légal</h4>
            <ul className="space-y-2.5 text-xs text-text-main/60">
              <li><span className="font-semibold">Conditions d'utilisation</span></li>
              <li><span className="font-semibold">Politique de confidentialité</span></li>
              <li><span className="font-semibold">Mentions légales</span></li>
            </ul>
            <p className="text-[10px] text-text-main/60 font-medium pt-1">Documents légaux en cours de publication.</p>
          </div>

          {/* Column 5: Suivez-nous */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-wider text-black uppercase">Suivez-nous</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook (bientôt disponible)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-main border border-black/5 hover:bg-accent hover:text-black transition-all"
                title="Facebook — bientôt disponible"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram (bientôt disponible)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-main border border-black/5 hover:bg-accent hover:text-black transition-all"
                title="Instagram — bientôt disponible"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube (bientôt disponible)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-main border border-black/5 hover:bg-accent hover:text-black transition-all"
                title="YouTube — bientôt disponible"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn (bientôt disponible)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-main border border-black/5 hover:bg-accent hover:text-black transition-all"
                title="LinkedIn — bientôt disponible"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 rounded-xl border border-black/5 bg-bg-main px-3.5 py-2 text-xs font-bold text-text-main/70 hover:bg-accent/10 hover:text-black transition-all cursor-pointer"
              id="footer-scroll-top-btn"
            >
              <ChevronUp className="h-3.5 w-3.5" />
              Retour en haut
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-text-main/$1 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-main/65">
          <p>© 2026 Après Mon Bac (Bénin). Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu avec excellence pour les bacheliers du Bénin 🇧🇯
          </p>
        </div>
      </div>
    </footer>
  );
}
