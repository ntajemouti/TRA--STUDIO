import React, { useState } from 'react';
import { StudioSettings } from '../../types';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios: () => void;
}

interface HeroThumbnail {
  id: string;
  image: string;
  alt: string;
}

const DEFAULT_STAGE_BG = '/images/hero-mockup/clean-hero-stage-bg.jpg';

const HERO_THUMBNAILS: HeroThumbnail[] = [
  { id: 'thumb-1', image: '/images/hero-mockup/thumb-1.jpg', alt: 'Studio Cheminée & Fauteuil' },
  { id: 'thumb-2', image: '/images/hero-mockup/thumb-2.jpg', alt: 'Studio Néon Bleu' },
  { id: 'thumb-3', image: '/images/hero-mockup/thumb-3.jpg', alt: 'Studio Salon Épuré' },
  { id: 'thumb-4', image: '/images/hero-mockup/thumb-4.jpg', alt: 'Studio Briques & Canapé' },
  { id: 'thumb-5', image: '/images/hero-mockup/thumb-5.jpg', alt: 'Studio Cuir & Lampe' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBooking,
  onExploreStudios,
}) => {
  const [activeBg, setActiveBg] = useState<string>(DEFAULT_STAGE_BG);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleThumbnailClick = (thumb: HeroThumbnail) => {
    if (activeId === thumb.id) {
      setActiveBg(DEFAULT_STAGE_BG);
      setActiveId(null);
    } else {
      setActiveBg(thumb.image);
      setActiveId(thumb.id);
    }
  };

  const handleDiscoverClick = () => {
    const el = document.getElementById('reels') || document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExploreStudios();
    }
  };

  return (
    <section className="relative w-full bg-[#0A0A0A] text-white py-3 sm:py-5 px-3 sm:px-6 lg:px-8 select-none">
      {/* Outer Card Enclosing the Hero (Exact Reference Composition) */}
      <div className="max-w-[1720px] mx-auto relative rounded-2xl sm:rounded-3xl lg:rounded-[28px] overflow-hidden border border-zinc-900 bg-[#0A0A0A] shadow-2xl min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] xl:min-h-[740px] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16">
        
        {/* =========================================================================
            BACKGROUND IMAGE: Brick studio, RØDE boom arm & microphone, warm globe lamp
           ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={activeBg}
            src={activeBg}
            alt="TRA Studio Plateau & Micro RØDE"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.04] transition-all duration-700 ease-out"
          />
        </div>

        {/* Cinematic Vignettes: Dark left area for crisp text readability */}
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/95 via-black/80 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-black via-black/60 via-30% to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-1" />

        {/* Subtle dark red ambient atmospheric glow */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#5A0F14]/20 rounded-full blur-[140px] pointer-events-none z-1" />

        {/* =========================================================================
            TOP & MIDDLE: EXACT TYPOGRAPHY & MESSAGING (Matching Mockup)
           ========================================================================= */}
        <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-5 pt-2 sm:pt-4">
          
          {/* Eyebrow: PODCAST // REELS // YOUTUBE VIDEO with dark red slashes */}
          <p className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.25em] text-white uppercase select-none">
            PODCAST <span className="text-[#8E1B24] font-black">//</span> REELS <span className="text-[#8E1B24] font-black">//</span> YOUTUBE VIDEO
          </p>

          {/* Main Headline: Bebas Neue, 2 lines, VOTRE PROCHAINE (White) / IDÉE FORTE COMMENCE ICI. (Dark Red) */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.4rem] xl:text-[6.2rem] tracking-wide uppercase leading-[0.92] drop-shadow-2xl">
            <span className="block text-white">VOTRE PROCHAINE</span>
            <span className="block text-[#8E1B24] drop-shadow-[0_4px_20px_rgba(142,27,36,0.5)]">
              IDÉE FORTE COMMENCE ICI.
            </span>
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="font-sans text-xs sm:text-sm text-zinc-300/90 font-normal leading-relaxed max-w-lg">
            Studio créatif à Casablanca et Marrakech pour donner vie à vos projets audio, vidéo et photo.
          </p>

          {/* CTAs: Dark Red Pill Button + Underlined Text Link with Arrow */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-5 sm:gap-6">
            {/* Primary: Dark Red Pill Button */}
            <button
              type="button"
              onClick={onStartBooking}
              className="h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-[#5A0F14] hover:bg-[#75141B] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#5A0F14]/40 hover:shadow-[#5A0F14]/60 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer border border-[#75141B]/40 hover:scale-[1.02]"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Réserver un studio</span>
            </button>

            {/* Secondary: Underlined Text Link with Arrow */}
            <button
              type="button"
              onClick={handleDiscoverClick}
              className="text-xs sm:text-sm font-semibold text-white hover:text-zinc-200 transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <span className="underline decoration-white/70 underline-offset-4 group-hover:decoration-white transition-all">
                Découvrir nos réalisations
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM: HORIZONTAL THUMBNAIL STRIP (Exact 5 Landscape Rounded Cards)
           ========================================================================= */}
        <div className="relative z-10 pt-8 sm:pt-10">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2">
            {HERO_THUMBNAILS.map((thumb) => {
              const isActive = activeId === thumb.id;
              return (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => handleThumbnailClick(thumb)}
                  aria-label={thumb.alt}
                  className={`group relative shrink-0 aspect-[16/10] w-36 sm:w-44 md:w-48 lg:w-52 xl:w-56 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 snap-start cursor-pointer select-none bg-zinc-950 ${
                    isActive
                      ? 'ring-2 ring-[#8E1B24] ring-offset-2 ring-offset-black scale-[1.03] shadow-xl shadow-[#5A0F14]/50'
                      : 'border border-zinc-800/80 hover:border-zinc-500 opacity-80 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
