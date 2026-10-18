import React from 'react';
import { StudioSettings } from '../../types';
import { STUDIO_WHATSAPP_NUMBER } from '../../config/booking';
import {
  MapPin,
  ExternalLink,
  MessageCircle,
  Instagram,
  Phone,
  Navigation,
  Clock,
  ArrowUp,
} from 'lucide-react';

interface FooterProps {
  settings?: StudioSettings;
  onSelectService?: (serviceName: string) => void;
  onStartBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
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
  const igHandle = settings?.instagramHandle || 'tra__studio';
  const address =
    settings?.address || 'Hay Al Alaouiyine, Boulevard Hassan II, Imm. B, 1er Étage, Témara';
  const mapsUrl =
    settings?.mapsUrl && !settings.mapsUrl.includes('share.google')
      ? settings.mapsUrl
      : 'https://www.google.com/maps/search/?api=1&query=TRA+STUDIO,+Boulevard+Hassan+II,+Temara';
  const itineraryUrl =
    'https://www.google.com/maps/dir/?api=1&destination=TRA+STUDIO,+Boulevard+Hassan+II,+Temara';

  const mapEmbedSrc =
    'https://maps.google.com/maps?q=TRA+STUDIO,+Boulevard+Hassan+II,+Temara,+Morocco&t=&z=15&ie=UTF8&iwloc=&output=embed';

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

  return (
    <footer
      id="contact"
      className="w-full bg-zinc-950 text-zinc-300 border-t border-zinc-900/90 relative overflow-hidden scroll-mt-10"
    >
      {/* Subtle ambient red/zinc glow in the footer background */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-studio-red/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* =========================================================================
            3-PART BALANCED EDITORIAL LAYOUT (Desktop) / STACKED (Mobile)
            - Left: Studio Identity & Navigation
            - Middle: Contact Details (WhatsApp, Tel, Instagram, Address)
            - Right: Compact Studio Photo + Map Preview Card
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 pb-14 border-b border-zinc-900/90 items-start">
          
          {/* =========================================================================
              LEFT SIDE: TRA STUDIO IDENTITY & NAVIGATION
             ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Official Logo */}
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

            {/* Short, attractive description */}
            <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
              Studio de création et de production audiovisuelle à Témara. Plateaux insonorisés haut de gamme, captation podcast multicam 4K et direction artistique sur mesure.
            </p>

            {/* Clean navigation menu */}
            <div className="pt-2 space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block">
                Plan du site
              </span>
              <nav aria-label="Navigation secondaire" className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm">
                <a
                  href="#hero"
                  onClick={(e) => handleNavClick(e, 'hero')}
                  className="text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  Accueil
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  Services
                </a>
                <a
                  href="#reels"
                  onClick={(e) => handleNavClick(e, 'reels')}
                  className="text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  Nos réalisations
                </a>
                <a
                  href="#experience"
                  onClick={(e) => handleNavClick(e, 'experience')}
                  className="text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  Pourquoi TRA Studio ?
                </a>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, 'faq')}
                  className="text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                >
                  FAQ
                </a>
              </nav>
            </div>
          </div>

          {/* =========================================================================
              MIDDLE: CONTACT DETAILS (WhatsApp, Tel, Instagram, Address)
             ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
              <span>Contact & Réservations</span>
            </h4>

            <div className="space-y-3">
              {/* WhatsApp Item */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-studio-red/40 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-850 flex items-center justify-center text-studio-red group-hover:bg-studio-red group-hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wide block">
                      WhatsApp direct
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-studio-red transition-colors">
                      {phone}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                  Discuter ↗
                </span>
              </a>

              {/* Phone Item */}
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-850 flex items-center justify-center text-zinc-300 group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wide block">
                      Appel direct
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {phone}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                  Appeler
                </span>
              </a>

              {/* Instagram Item */}
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-850 flex items-center justify-center text-zinc-300 group-hover:text-pink-400 transition-all">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wide block">
                      Instagram officiel
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-zinc-200">
                      @{igHandle}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors">
                  Suivre ↗
                </span>
              </a>

              {/* Address with Itinerary Link */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300 leading-relaxed font-light">
                    {address}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[11px]">
                  <span className="inline-flex items-center gap-1.5 text-zinc-500 font-mono">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    <span>Lun – Sam : 10h – 18h</span>
                  </span>
                  <a
                    href={itineraryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-studio-red hover:underline font-semibold font-mono"
                  >
                    <span>Voir l'itinéraire</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT SIDE: COMPACT LOCATION VISUAL — PHOTO + GOOGLE MAPS PREVIEW
              Forms one coherent visual element with refined proportions & hover effect
             ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
              <span>Le Studio à Témara</span>
            </h4>

            {/* Coherent Visual Container: Photo + Map Preview */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-900/60 shadow-xl group hover:border-zinc-700 transition-all duration-300">
              
              {/* Top: Authentic Studio Photograph */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                <img
                  src="/catalog-photos/tra-studio-desktop-modern-official-logo.jpg"
                  alt="Régie de production et plateau TRA Studio à Témara"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
                
                {/* Discreet Studio Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                  <span>TRA Studio • Régie & Plateau</span>
                </div>
              </div>

              {/* Middle: Compact Map Thumbnail / Preview */}
              <div className="relative h-28 w-full border-t border-zinc-800/80 bg-zinc-950 overflow-hidden">
                <iframe
                  title="Carte Google Maps TRA Studio Témara"
                  src={mapEmbedSrc}
                  className="w-full h-full border-0 filter contrast-105 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>

              {/* Bottom Card Bar: Location Label & Direct Google Maps Action */}
              <div className="p-3.5 bg-zinc-900/90 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-studio-red shrink-0" />
                  <span className="text-xs text-zinc-300 font-medium truncate">
                    Boulevard Hassan II, Témara
                  </span>
                </div>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studio-red hover:bg-studio-redHover text-white text-xs font-semibold tracking-wide shadow-md shadow-studio-red/20 transition-all shrink-0 active:scale-95 cursor-pointer"
                  title="Ouvrir dans Google Maps dans un nouvel onglet"
                >
                  <span>Ouvrir Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-90" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM BAR: Copyright, Legal & Back to Top
           ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 text-center sm:text-left">
            <p>© {currentYear} TRA Studio — Tous droits réservés.</p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <p className="text-zinc-500 font-light">Témara, Maroc</p>
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
