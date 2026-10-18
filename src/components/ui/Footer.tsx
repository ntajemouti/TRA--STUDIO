import React from 'react';
import { StudioSettings } from '../../types';
import { STUDIO_WHATSAPP_NUMBER } from '../../config/booking';
import {
  MapPin,
  ExternalLink,
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  ArrowUp,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface FooterProps {
  settings?: StudioSettings;
  onSelectService?: (serviceName: string) => void;
  onStartBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onSelectService, onStartBooking }) => {
  const currentYear = new Date().getFullYear();

  // Studio Verified Details
  const studioName = settings?.studioName || 'TRA Studio';
  const waNumber = settings?.whatsappNumber || STUDIO_WHATSAPP_NUMBER;
  const cleanWaNumber = waNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    'Bonjour TRA Studio, je souhaite obtenir des informations sur vos prestations et disponibilités.'
  )}`;
  const phone = settings?.phone || '+212 660-719968';
  const igUrl =
    settings?.instagramUrl || 'https://www.instagram.com/tra__studio?igsi=MThkb3NqdzBmODVuYQ==';
  const email = settings?.email || 'Tawfiqbennani@tra-studio.com';
  const address =
    settings?.address || 'Hay Al Alaouiyine, Boulevard Hassan II, Imm. B, 1er Étage, Témara';
  const mapsUrl =
    settings?.mapsUrl && !settings.mapsUrl.includes('share.google')
      ? settings.mapsUrl
      : 'https://www.google.com/maps/search/?api=1&query=TRA+STUDIO,+Boulevard+Hassan+II,+Temara';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'hero') {
      scrollToTop();
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, serviceName: string) => {
    e.preventDefault();
    if (onSelectService) {
      onSelectService(serviceName);
    } else if (onStartBooking) {
      onStartBooking();
    } else {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="contact"
      className="w-full bg-zinc-950 text-zinc-300 border-t border-zinc-900/90 relative overflow-hidden scroll-mt-10"
    >
      {/* Subtle ambient red/zinc glow in the footer background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-studio-red/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 pb-14 border-b border-zinc-900/90">
          
          {/* =========================================================================
              COLUMN 1 — TRA STUDIO
             ========================================================================= */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="inline-block transition-opacity hover:opacity-90 cursor-pointer"
              title={studioName}
            >
              <img
                src="/tra-logo.png"
                alt={studioName}
                className="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Short, elegant description */}
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              Studio de création et de production audiovisuelle à Témara. Plateaux insonorisés, captation multicam 4K, micros broadcast Shure et accompagnement artistique sur mesure.
            </p>

            {/* Social media icons with valid verified links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram TRA Studio"
                className="w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-studio-red hover:bg-studio-red/10 transition-all duration-200 cursor-pointer group shadow-sm"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp TRA Studio"
                className="w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-studio-red hover:bg-studio-red/10 transition-all duration-200 cursor-pointer group shadow-sm"
              >
                <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={`mailto:${email}`}
                aria-label="Email TRA Studio"
                className="w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-studio-red hover:bg-studio-red/10 transition-all duration-200 cursor-pointer group shadow-sm"
              >
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>

              <a
                href={`tel:${phone}`}
                aria-label="Téléphone TRA Studio"
                className="w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-studio-red hover:bg-studio-red/10 transition-all duration-200 cursor-pointer group shadow-sm"
              >
                <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>

            {/* Availability status badge */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Plateau disponible sur réservation</span>
              </span>
            </div>
          </div>

          {/* =========================================================================
              COLUMN 2 — NAVIGATION
             ========================================================================= */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
              <span>Navigation</span>
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => handleNavClick(e, 'hero')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <span>Accueil</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a
                  href="#reels"
                  onClick={(e) => handleNavClick(e, 'reels')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <span>Nos réalisations</span>
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleNavClick(e, 'experience')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <span>Pourquoi TRA Studio ?</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, 'faq')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              COLUMN 3 — NOS SERVICES
             ========================================================================= */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
              <span>Nos Services</span>
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleServiceClick(e, 'Podcast + Montage')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-studio-red transition-colors" />
                  <span>Podcast Multicam 4K & Montage</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleServiceClick(e, 'Podcast Tournage Brut')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-studio-red transition-colors" />
                  <span>Podcast Tournage Brut (Rushs 4K)</span>
                </a>
              </li>
              <li>
                <a
                  href="#reels"
                  onClick={(e) => handleNavClick(e, 'reels')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-studio-red transition-colors" />
                  <span>Formats Verticaux (Reels & TikTok)</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleServiceClick(e, 'Cyclorama Blanc & Shooting')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-studio-red transition-colors" />
                  <span>Plateau Cyclorama & Shooting Photo</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-zinc-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150 cursor-pointer group"
                >
                  <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-studio-red transition-colors" />
                  <span>Post-Production & Étalonnage</span>
                </a>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              COLUMN 4 — NOUS TROUVER
             ========================================================================= */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
              <span>Nous Trouver</span>
            </h4>

            <div className="space-y-3.5 text-xs">
              {/* Studio Address */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <MapPin className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-white text-xs">Studio Témara</div>
                  <p className="text-zinc-400 leading-relaxed font-light">
                    {address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>Lun – Sam : 10h00 – 18h00 (sur réservation)</span>
              </div>

              {/* Verified Google Maps Action Link */}
              <div className="pt-1">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-studio-red/40 text-xs font-medium text-white transition-all group shadow-sm cursor-pointer"
                  title="Ouvrir la fiche Google Maps de TRA Studio dans un nouvel onglet"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-studio-red group-hover:scale-110 transition-transform" />
                    <span>Voir sur Google Maps</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-studio-red transition-colors" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM BAR: Copyright, Legal & Back to Top
           ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 text-center sm:text-left">
            <p>© {currentYear} {studioName}. Tous droits réservés.</p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <p className="text-zinc-500 font-light">Studio de production & création audiovisuelle — Témara, Maroc</p>
          </div>

          {/* Discreet Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Retourner en haut de la page"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-[11px] font-mono tracking-wide transition-all cursor-pointer select-none"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3 h-3 text-studio-red" />
          </button>
        </div>

      </div>
    </footer>
  );
};
