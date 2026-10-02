import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
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

interface NavItem {
  id: string;
  label: string;
  targetId: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'accueil', label: 'Accueil', targetId: 'hero' },
  { id: 'studios', label: 'Nos Studios', targetId: 'studios' },
  { id: 'services', label: 'Services', targetId: 'catalogue' },
  { id: 'realisations', label: 'Réalisations', targetId: 'reels' },
  { id: 'a-propos', label: 'A propos de nous', targetId: 'experience' },
  { id: 'contact', label: 'Contact', targetId: 'location' },
];

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  settings,
  onExitAdmin,
  onResetClient,
  onStartBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      const contactEl = document.getElementById('location');
      const aboutEl = document.getElementById('experience');
      const portfolioEl = document.getElementById('reels') || document.getElementById('portfolio');
      const servicesEl = document.getElementById('catalogue');
      const studiosEl = document.getElementById('studios');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('a-propos');
      } else if (portfolioEl && scrollPos >= portfolioEl.offsetTop) {
        setActiveSection('realisations');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else if (studiosEl && scrollPos >= studiosEl.offsetTop) {
        setActiveSection('studios');
      } else {
        setActiveSection('accueil');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, sectionKey: string) => {
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
            LEFT: OFFICIAL LOGO (Exact Podcasty Size & Space)
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
            MIDDLE: NAVIGATION LINKS (Podcasty Style with Interactive Mouse Hover)
            - Accueil, Services, Réalisations, A propos de nous, Contact
            - White words by default on black background
            - On mouse hover (ghir b la souris, bla click):
              Word turns RED + red underline appears dynamically under it!
           ========================================================================= */}
        {!isAdmin && (
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-9 text-[15px] font-medium"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isHovered = hoveredNav === item.id;
              const isActive = !hoveredNav && activeSection === item.id;
              const isHighlighted = isHovered || isActive;

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onClick={() => scrollToSection(item.targetId, item.id)}
                  className="relative py-2.5 px-1 transition-colors duration-200 cursor-pointer group select-none"
                >
                  {/* The Word: White -> Red on hover */}
                  <span
                    className={`transition-colors duration-200 ${
                      isHighlighted ? 'text-studio-red font-semibold' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* The Red Underline: appears/transitions smoothly under hovered word */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2.5px] bg-studio-red rounded-full transition-all duration-200 ease-out origin-center ${
                      isHighlighted
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        )}

        {/* =========================================================================
            RIGHT: "Je réserve 📅" BUTTON ONLY (Mon Espace completely removed)
           ========================================================================= */}
        <div className="flex items-center gap-3">
          {!isAdmin ? (
            <>
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
          MOBILE DRAWER MENU (Clean: 5 items + Je réserve, no Mon Espace)
         ========================================================================= */}
      {!isAdmin && mobileMenuOpen && (
        <div className="lg:hidden bg-black/98 border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-base font-semibold text-white">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.targetId, item.id)}
                className={`text-left py-2.5 border-b border-zinc-900 transition-colors flex items-center justify-between ${
                  activeSection === item.id ? 'text-studio-red font-bold' : 'hover:text-studio-red'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                )}
              </button>
            ))}
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
