import React, { useState } from 'react';
import { Sparkles, Calendar, User, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { StudioSettings } from '../../types';

interface HeaderProps {
  isAdmin: boolean;
  settings?: StudioSettings;
  onExitAdmin: () => void;
  onResetClient?: () => void;
  onStartBooking?: () => void;
  onOpenClientAuth?: () => void;
  hasActiveBooking?: boolean;
  onViewMyBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  settings,
  onExitAdmin,
  onResetClient,
  onStartBooking,
  onOpenClientAuth,
  hasActiveBooking,
  onViewMyBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onResetClient) onResetClient();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const waNumber = settings?.whatsappNumber || '212660719968';
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;

  return (
    <header className="sticky top-0 z-40 w-full bg-studio-bg/95 backdrop-blur-md border-b border-studio-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Studio Identity */}
        <button
          onClick={onResetClient}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          title={settings?.studioName || 'TRA Studio'}
        >
          <div className="relative flex items-center justify-center h-10 w-auto">
            <img
              src="/tra-logo.png"
              alt={settings?.studioName || 'TRA Studio'}
              className="h-9 w-auto object-contain brightness-105 group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-white group-hover:text-white transition-colors">
              {settings?.studioName || 'TRA STUDIO'}
            </span>
            <span className="text-[10px] text-studio-muted tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-red inline-block animate-pulse"></span>
              {isAdmin ? 'Espace Administrateur' : 'Témara • Production & Podcast'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        {!isAdmin && (
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-zinc-300">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('catalogue')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Catalogue & Formules
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('references')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Références
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('instagram')}
              className="hover:text-pink-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Instagram</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('location')}
              className="hover:text-white transition-colors cursor-pointer text-studio-red font-extrabold"
            >
              Accès Studio
            </button>
          </nav>
        )}

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {!isAdmin && (
            <>
              {/* Espace Client / Login Button */}
              {onOpenClientAuth && (
                <button
                  type="button"
                  onClick={onOpenClientAuth}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all cursor-pointer shadow-sm"
                  title="Accéder à mon espace client"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Mon Espace</span>
                </button>
              )}

              {/* Has Active Booking Button */}
              {hasActiveBooking && onViewMyBooking && (
                <button
                  onClick={onViewMyBooking}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full transition-all cursor-pointer shadow-sm"
                  title="Voir l'état de ma réservation"
                >
                  <Sparkles className="w-3.5 h-3.5 text-studio-red" />
                  <span>Ma séance</span>
                </button>
              )}

              {/* Main Booking CTA */}
              {onStartBooking && (
                <button
                  type="button"
                  onClick={onStartBooking}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-studio-red/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Réserver</span>
                </button>
              )}

              {/* Mobile Animated Hamburger Toggle (3 Chertat -> X animation) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu de navigation"
                className="lg:hidden relative w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-all duration-300 hover:border-zinc-700 active:scale-95 cursor-pointer"
                title="Menu"
              >
                <span
                  className={`block w-5 h-[2px] rounded-full transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                      ? 'translate-y-2 rotate-45 bg-studio-red'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`block w-5 h-[2px] rounded-full transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0 -translate-x-2' : 'bg-white opacity-100'
                  }`}
                />
                <span
                  className={`block w-5 h-[2px] rounded-full transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                      ? '-translate-y-2 -rotate-45 bg-studio-red'
                      : 'bg-white'
                  }`}
                />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {!isAdmin && mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-bold uppercase tracking-wider text-zinc-300">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 hover:text-white border-b border-zinc-900"
            >
              Accueil
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('catalogue')}
              className="text-left py-2 hover:text-white border-b border-zinc-900 flex items-center justify-between"
            >
              <span>Catalogue & Formules</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono">TARIFS</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className="text-left py-2 hover:text-white border-b border-zinc-900 flex items-center justify-between"
            >
              <span>Portfolio & Réalisations</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-studio-red text-white font-bold">PROJETS</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('references')}
              className="text-left py-2 hover:text-white border-b border-zinc-900"
            >
              Références & Partenaires
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('instagram')}
              className="text-left py-2 hover:text-pink-400 border-b border-zinc-900 flex items-center justify-between text-pink-400 font-bold"
            >
              <span>Instagram @tra__studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">FEED</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('location')}
              className="text-left py-2 text-studio-red font-bold hover:text-white border-b border-zinc-900"
            >
              Plan d’Accès & Localisation
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {onOpenClientAuth && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-bold uppercase flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-studio-red" />
                <span>Mon Espace Client</span>
              </button>
            )}

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-400 text-xs font-bold uppercase flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
