import React, { useState, useEffect } from 'react';
import { Calendar, Instagram } from 'lucide-react';
import { StudioSettings } from '../../types';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

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
  const igUrl = settings?.instagramUrl || 'https://www.instagram.com/tra__studio';

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

          {/* Simple WhatsApp & Instagram Logos (Format Téléphone uniquement) */}
          <div className="pt-4 border-t border-zinc-900/90 flex items-center justify-center gap-5">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Contacter sur WhatsApp"
              className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-950/30 transition-all duration-200 active:scale-95 shadow-md"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
            </a>

            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Page Instagram @tra__studio"
              className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-950/30 transition-all duration-200 active:scale-95 shadow-md"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
