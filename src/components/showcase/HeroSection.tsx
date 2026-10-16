import React from 'react';
import { StudioSettings } from '../../types';
import { ArrowRight, Phone } from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios?: () => void;
}

const HERO_BACKGROUND_IMAGE_HD = '/images/hero-mockup/tra-hero-vintage-decor-hd.jpg';
const HERO_BACKGROUND_IMAGE_ORIGINAL = '/images/hero-mockup/tra-hero-vintage-decor.jpg';

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onStartBooking,
}) => {
  const phoneCallNumber = (settings?.phone || '+212660719968').replace(/\s+/g, '');
  const displayPhone = settings?.phone || '+212 660-719968';

  return (
    <section className="relative w-full bg-[#0A0A0A] text-white select-none overflow-hidden h-[calc(100svh-80px)] sm:h-[calc(100svh-88px)] md:h-[calc(100dvh-96px)] min-h-[540px] max-h-[960px] 2xl:max-h-[1100px] flex flex-col justify-between md:justify-center">
      
      {/* =========================================================================
          BACKGROUND IMAGE: Authentic TRA Studio Vintage Decor Setup
          - On mobile (phones): object-contain ensures 100% of the decor (chairs, rug, table, clock, mics)
            is completely visible with zero cropping, paired with ambient blurred backdrop.
          - On PC screen (desktop): 2048x1528 2K HD Master Photo spanning the full background,
            with crisp contrast, bright authentic tones, and soft gradient.
         ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A]">
        {/* Ambient blurred backdrop for mobile portrait screens */}
        <img
          src={HERO_BACKGROUND_IMAGE_ORIGINAL}
          alt=""
          aria-hidden="true"
          className="md:hidden absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
        />

        {/* High-quality studio photograph:
            - Mobile/Tablet: 100% uncropped object-contain
            - PC / Desktop: 2K HD Master (2048x1528) object-cover with crisp contrast
        */}
        <picture>
          <source media="(min-width: 768px)" srcSet={HERO_BACKGROUND_IMAGE_HD} />
          <img
            src={HERO_BACKGROUND_IMAGE_ORIGINAL}
            alt="TRA Studio Plateau Décor Vintage à Témara"
            className="w-full h-full object-contain md:object-cover object-center filter brightness-[0.98] contrast-[1.04]"
          />
        </picture>

        {/* Desktop left-to-right gradient: soft & translucent so the photo stays crisp & bright */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-45% to-transparent pointer-events-none" />
        
        {/* Mobile top and bottom vignettes so text and CTAs stay crystal clear */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/90 via-transparent via-45% to-black/95 pointer-events-none" />

        {/* Edge fades for seamless blend with navbar and next section */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

        {/* Subtle dark red ambient atmospheric glow (#8B0000) */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* =========================================================================
          EDITORIAL CONTENT CONTAINER
         ========================================================================= */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between md:justify-center py-6 sm:py-8 md:py-0">
        
        {/* Text Block */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 md:space-y-5 pt-2 sm:pt-4 text-left">
          
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
          <div className="hidden md:flex items-center gap-3.5 pt-3 sm:pt-4">
            {/* 1. Phone Button (First, Red Icon Button) */}
            <a
              href={`tel:${phoneCallNumber}`}
              title={`Appeler TRA Studio (${displayPhone})`}
              aria-label="Appeler TRA Studio"
              className="w-12 h-12 shrink-0 rounded-full bg-[#8B0000] hover:bg-[#A00000] text-white flex items-center justify-center shadow-xl shadow-[#8B0000]/40 hover:shadow-[#8B0000]/60 transition-all duration-200 active:scale-95 border border-[#A00000]/40 hover:scale-[1.06] cursor-pointer"
            >
              <Phone className="w-5 h-5 text-white" />
            </a>

            {/* 2. Réserver une séance Button (Second) */}
            <button
              type="button"
              onClick={onStartBooking}
              className="h-12 px-7 rounded-full bg-[#8B0000] hover:bg-[#A00000] text-white font-semibold text-sm tracking-wide shadow-xl shadow-[#8B0000]/40 hover:shadow-[#8B0000]/60 transition-all duration-200 active:scale-95 flex items-center gap-2.5 cursor-pointer border border-[#A00000]/40 hover:scale-[1.02]"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Réserver une séance</span>
            </button>
          </div>
        </div>

        {/* CTAs on mobile (Docked cleanly at the bottom without blocking the decor) */}
        <div className="md:hidden pt-4 pb-2 flex items-center gap-3">
          {/* 1. Phone Button (First, Red Icon Button) */}
          <a
            href={`tel:${phoneCallNumber}`}
            aria-label="Appeler TRA Studio"
            className="w-11 h-11 shrink-0 rounded-full bg-[#8B0000] hover:bg-[#A00000] text-white flex items-center justify-center shadow-xl shadow-[#8B0000]/40 active:scale-95 border border-[#A00000]/40 transition-transform cursor-pointer"
          >
            <Phone className="w-5 h-5 text-white" />
          </a>

          {/* 2. Réserver une séance Button (Second) */}
          <button
            type="button"
            onClick={onStartBooking}
            className="flex-1 h-11 px-5 rounded-full bg-[#8B0000] hover:bg-[#A00000] text-white font-semibold text-xs tracking-wide shadow-xl shadow-[#8B0000]/40 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-[#A00000]/40"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Réserver une séance</span>
          </button>
        </div>

      </div>
    </section>
  );
};


