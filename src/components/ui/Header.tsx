import React, { useState, useEffect } from 'react';
import { Calendar, User, MessageCircle, X } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<'accueil' | 'services' | 'a-propos' | 'contact'>('accueil');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const contactEl = document.getElementById('location');
      const aboutEl = document.getElementById('experience') || document.getElementById('portfolio');
      const servicesEl = document.getElementById('catalogue') || document.getElementById('studios');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('a-propos');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else {
        setActiveSection('accueil');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, sectionKey: 'accueil' | 'services' | 'a-propos' | 'contact') => {
    setMobileMenuOpen(false);
    setActiveSection(sectionKey);
    if (onResetClient) onResetClient();

    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  const handleBookingClick = () => {
    setMobileMenuOpen(false);
    if (onStartBooking) {
      onStartBooking();
    } else {
      const el = document.getElementById('catalogue');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const waNumber = settings?.whatsappNumber || '212660719968';
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-zinc-900/90 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] sm:h-[88px] md:h-[96px] flex items-center justify-between">
        
        {/* =========================================================================
            LEFT: OFFICIAL LOGO (Exact Podcasty Size & Prominence)
           ========================================================================= */}
        <button
          onClick={() => scrollToSection('hero', 'accueil')}
          className="flex items-center py-2 pr-6 focus:outline-none group cursor-pointer transition-all hover:opacity-95"
          title={settings?.studioName || 'TRA Studio'}
        >
          <img
            src="/tra-logo.png"
            alt={settings?.studioName || 'TRA Studio'}
            className="h-[52px] sm:h-[60px] md:h-[66px] lg:h-[69px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
          {isAdmin && (
            <span className="ml-3 px-2 py-0.5 rounded text-[10px] font-bold bg-studio-red/20 text-studio-red border border-studio-red/40 uppercase tracking-wider">
              Admin
            </span>
          )}
        </button>

        {/* =========================================================================
            MIDDLE: NAVIGATION LINKS (Podcasty Style: Accueil, Services, A propos de nous, Contact)
            - Pure white words
            - Generous spacing between each item (gap-8 to gap-10)
            - Clean Title Case
            - Red accent on active link
           ========================================================================= */}
        {!isAdmin && (
          <nav className="hidden lg:flex items-center gap-8 xl:gap-11 text-[15px] font-medium text-white">
            {/* 1. Accueil */}
            <button
              type="button"
              onClick={() => scrollToSection('hero', 'accueil')}
              className={`relative py-2 transition-all cursor-pointer ${
                activeSection === 'accueil'
                  ? 'text-studio-red font-semibold'
                  : 'text-white hover:text-studio-red'
              }`}
            >
              <span>Accueil</span>
              {activeSection === 'accueil' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-studio-red rounded-full animate-in fade-in" />
              )}
            </button>

            {/* 2. Services */}
            <button
              type="button"
              onClick={() => scrollToSection('catalogue', 'services')}
              className={`relative py-2 transition-all cursor-pointer ${
                activeSection === 'services'
                  ? 'text-studio-red font-semibold'
                  : 'text-white hover:text-studio-red'
              }`}
            >
              <span>Services</span>
              {activeSection === 'services' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-studio-red rounded-full animate-in fade-in" />
              )}
            </button>

            {/* 3. A propos de nous */}
            <button
              type="button"
              onClick={() => scrollToSection('experience', 'a-propos')}
              className={`relative py-2 transition-all cursor-pointer ${
                activeSection === 'a-propos'
                  ? 'text-studio-red font-semibold'
                  : 'text-white hover:text-studio-red'
              }`}
            >
              <span>A propos de nous</span>
              {activeSection === 'a-propos' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-studio-red rounded-full animate-in fade-in" />
              )}
            </button>

            {/* 4. Contact */}
            <button
              type="button"
              onClick={() => scrollToSection('location', 'contact')}
              className={`relative py-2 transition-all cursor-pointer ${
                activeSection === 'contact'
                  ? 'text-studio-red font-semibold'
                  : 'text-white hover:text-studio-red'
              }`}
            >
              <span>Contact</span>
              {activeSection === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-studio-red rounded-full animate-in fade-in" />
              )}
            </button>
          </nav>
        )}

        {/* =========================================================================
            RIGHT: "Je réserve 📅" BUTTON (Red Pill, Exact Podcasty Style)
           ========================================================================= */}
        <div className="flex items-center gap-3">
          {!isAdmin ? (
            <>
              {/* Espace Client (Subtle User Icon for logged in / returning clients) */}
              {onOpenClientAuth && (
                <button
                  type="button"
                  onClick={onOpenClientAuth}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Mon Espace Client"
                >
                  <User className="w-4 h-4 text-zinc-400 hover:text-white" />
                  <span>Mon Espace</span>
                </button>
              )}

              {/* Active Booking status pill */}
              {hasActiveBooking && onViewMyBooking && (
                <button
                  onClick={onViewMyBooking}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 border border-zinc-700 rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
                  title="Voir ma réservation"
                >
                  <span className="w-2 h-2 rounded-full bg-studio-red animate-pulse" />
                  <span>Ma séance</span>
                </button>
              )}

              {/* The "Je réserve 📅" Button (Red Pill Outline & Glow) */}
              <button
                type="button"
                onClick={handleBookingClick}
                className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border-2 border-studio-red text-studio-red hover:bg-studio-red hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-studio-red/20 hover:shadow-studio-red/40 hover:scale-105 active:scale-95"
              >
                <span>Je réserve</span>
                <Calendar className="w-4 h-4 ml-0.5" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu de navigation"
                className="lg:hidden relative w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-all duration-300 hover:border-zinc-700 active:scale-95 cursor-pointer ml-1"
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
          ) : (
            <button
              type="button"
              onClick={onExitAdmin}
              className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-colors"
            >
              Quitter l'administration
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          MOBILE DRAWER MENU (Clean, matched to 4 items + Je réserve)
         ========================================================================= */}
      {!isAdmin && mobileMenuOpen && (
        <div className="lg:hidden bg-black/98 border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-base font-semibold text-white">
            <button
              type="button"
              onClick={() => scrollToSection('hero', 'accueil')}
              className={`text-left py-2.5 border-b border-zinc-900 transition-colors ${
                activeSection === 'accueil' ? 'text-studio-red font-bold' : 'hover:text-studio-red'
              }`}
            >
              Accueil
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('catalogue', 'services')}
              className={`text-left py-2.5 border-b border-zinc-900 transition-colors ${
                activeSection === 'services' ? 'text-studio-red font-bold' : 'hover:text-studio-red'
              }`}
            >
              Services
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('experience', 'a-propos')}
              className={`text-left py-2.5 border-b border-zinc-900 transition-colors ${
                activeSection === 'a-propos' ? 'text-studio-red font-bold' : 'hover:text-studio-red'
              }`}
            >
              A propos de nous
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('location', 'contact')}
              className={`text-left py-2.5 border-b border-zinc-900 transition-colors ${
                activeSection === 'contact' ? 'text-studio-red font-bold' : 'hover:text-studio-red'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleBookingClick}
              className="w-full py-3 rounded-full border-2 border-studio-red text-studio-red hover:bg-studio-red hover:text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-studio-red/20 transition-all cursor-pointer"
            >
              <span>Je réserve</span>
              <Calendar className="w-4 h-4 ml-0.5" />
            </button>

            {onOpenClientAuth && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenClientAuth();
                }}
                className="w-full py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-studio-red" />
                <span>Mon Espace Client</span>
              </button>
            )}

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2"
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
