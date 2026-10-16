import React from 'react';
import { StudioSettings } from '../../types';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios: () => void;
}

const HERO_BACKGROUND_IMAGE = '/images/hero-mockup/tra-hero-vintage-decor.jpg';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBooking,
  onExploreStudios,
}) => {
  const handleDiscoverClick = () => {
    const el = document.getElementById('reels') || document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExploreStudios();
    }
  };

  return (
    <section className="relative w-full bg-[#0A0A0A] text-white select-none overflow-hidden h-[calc(100svh-80px)] sm:h-[calc(100svh-88px)] md:h-[calc(100dvh-96px)] min-h-[540px] max-h-[960px] 2xl:max-h-[1100px] flex flex-col justify-between md:justify-center">
      
      {/* =========================================================================
          BACKGROUND IMAGE: Authentic TRA Studio Vintage Decor Setup
          - On mobile (phones): object-contain ensures 100% of the decor (chairs, rug, table, clock, mics)
            is completely visible with zero cropping.
          - An ambient blurred backdrop fills the portrait frame seamlessly.
          - On desktop (md+): object-cover fills the wide aspect ratio with full cinematic immersion.
         ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A]">
        {/* Ambient blurred backdrop for mobile portrait screens */}
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none md:hidden"
        />

        {/* High-quality studio photograph */}
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt="TRA Studio Plateau Décor Vintage"
          className="relative w-full h-full object-contain md:object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Vignette Gradients for Editorial Contrast & Legibility */}
        {/* Desktop left-to-right vignette for crisp text contrast */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 via-45% to-transparent pointer-events-none" />
        
        {/* Mobile top and bottom vignettes so text and CTAs stay crystal clear */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/90 via-transparent via-45% to-black/95 pointer-events-none" />

        {/* Top/bottom edge fades for seamless transitions with header and next section */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

        {/* Subtle dark red ambient atmospheric glow (#8B0000) */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* =========================================================================
          EDITORIAL CONTENT CONTAINER
         ========================================================================= */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between md:justify-center py-6 sm:py-8 md:py-0">
        
        {/* Top Text Block */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 md:space-y-5 pt-2 sm:pt-4">
          
          {/* Eyebrow: PODCAST // REELS // YOUTUBE VIDEO with dark red slashes */}
          <p className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.22em] text-white uppercase select-none drop-shadow-md">
            PODCAST <span className="text-[#8B0000] font-black">//</span> REELS <span className="text-[#8B0000] font-black">//</span> YOUTUBE VIDEO
          </p>

          {/* Main Headline: Bebas Neue, 2 lines, VOTRE PROCHAINE (White) / IDÉE FORTE COMMENCE ICI. (Dark Red) */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem] tracking-wide uppercase leading-[0.92] drop-shadow-2xl">
            <span className="block text-white">VOTRE PROCHAINE</span>
            <span className="block text-[#8B0000] drop-shadow-[0_4px_20px_rgba(139,0,0,0.5)]">
              IDÉE FORTE COMMENCE ICI.
            </span>
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="font-sans text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-lg drop-shadow-md">
            Studio créatif d'exception à Témara pour donner vie à vos projets audio, vidéo et photo.
          </p>

          {/* CTAs on desktop/tablet (Grouped with text on left) */}
          <div className="hidden md:flex pt-2 sm:pt-3 flex-wrap items-center gap-5 sm:gap-6">
            {/* Primary: Dark Red Pill Button */}
            <button
              type="button"
              onClick={onStartBooking}
              className="h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-[#8B0000] hover:bg-[#A00000] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#8B0000]/40 hover:shadow-[#8B0000]/60 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer border border-[#A00000]/40 hover:scale-[1.02]"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Réserver une séance</span>
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

        {/* CTAs on mobile (Docked cleanly at the bottom without blocking the decor) */}
        <div className="md:hidden pt-4 pb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onStartBooking}
            className="h-11 px-6 rounded-full bg-[#8B0000] hover:bg-[#A00000] text-white font-semibold text-xs tracking-wide shadow-xl shadow-[#8B0000]/40 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-[#A00000]/40"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Réserver une séance</span>
          </button>

          <button
            type="button"
            onClick={handleDiscoverClick}
            className="h-10 text-xs font-semibold text-white hover:text-zinc-200 transition-colors flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span className="underline decoration-white/70 underline-offset-4">
              Découvrir nos réalisations
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};

