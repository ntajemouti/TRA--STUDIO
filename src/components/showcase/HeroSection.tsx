import React from 'react';
import { StudioSettings } from '../../types';
import { ArrowRight, Phone } from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios?: () => void;
}

const HERO_BACKGROUND_IMAGE = '/images/hero-mockup/tra-hero-vintage-decor.jpg';

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onStartBooking,
}) => {
  const phoneCallNumber = (settings?.phone || '+212660719968').replace(/\s+/g, '');
  const displayPhone = settings?.phone || '+212 660-719968';

  return (
    <section className="relative w-full bg-[#0A0A0A] text-white select-none overflow-hidden h-[calc(100svh-80px)] sm:h-[calc(100svh-88px)] lg:h-[calc(100dvh-96px)] min-h-[540px] lg:min-h-[600px] max-h-[960px] 2xl:max-h-[1100px] flex items-center justify-center">
      
      {/* =========================================================================
          1. MOBILE & TABLET BACKGROUND (Preserved exactly as validated — "Perfect")
          - object-contain ensures 100% of decor is visible without cropping
          - Ambient blur fills the background
         ========================================================================= */}
      <div className="lg:hidden absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A]">
        {/* Ambient blurred backdrop for portrait / tablet screens */}
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
        />

        {/* High-quality studio photograph (100% uncropped on mobile/tablet) */}
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt="TRA Studio Plateau Décor Vintage"
          className="relative w-full h-full object-contain object-center filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Mobile top and bottom vignettes so text and CTAs stay crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent via-45% to-black/95 pointer-events-none" />

        {/* Edge fades */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Ambient glow on PC */}
      <div className="hidden lg:block absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-[#8B0000]/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* =========================================================================
          2. CONTENT CONTAINER
          - Mobile / Tablet: Top text + Bottom docked buttons (as user loved)
          - PC Screen (lg+): 2-Column Editorial Grid with sharp, uncropped, high-res photo
         ========================================================================= */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 lg:items-center py-6 sm:py-8 lg:py-0">
        
        {/* LEFT COLUMN / TEXT CONTENT */}
        <div className="max-w-3xl lg:max-w-none lg:col-span-6 xl:col-span-5 space-y-3 sm:space-y-4 lg:space-y-5 pt-2 sm:pt-4 lg:pt-0 text-left">
          
          {/* Eyebrow */}
          <p className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.22em] text-white uppercase select-none drop-shadow-md">
            PODCAST <span className="text-[#8B0000] font-black">//</span> REELS <span className="text-[#8B0000] font-black">//</span> YOUTUBE VIDEO
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.8rem] xl:text-[5.5rem] tracking-wide uppercase leading-[0.92] drop-shadow-2xl">
            <span className="block text-white">VOTRE PROCHAINE</span>
            <span className="block text-[#8B0000] drop-shadow-[0_4px_20px_rgba(139,0,0,0.5)]">
              IDÉE FORTE COMMENCE ICI.
            </span>
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="font-sans text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-lg drop-shadow-md">
            Studio créatif d'exception à Témara pour donner vie à vos projets audio, vidéo et photo.
          </p>

          {/* CTAs ON DESKTOP (PC Screen) */}
          <div className="hidden lg:flex items-center gap-3.5 pt-3">
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

        {/* RIGHT COLUMN ON DESKTOP (PC Screen): Crystal-Clear, High-Res, Native 4:3 Studio Photo */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 items-center justify-center relative">
          {/* Ambient red backlight */}
          <div className="absolute -inset-4 bg-[#8B0000]/15 rounded-3xl blur-3xl pointer-events-none" />

          {/* Uncropped, High-definition Studio Showcase Frame */}
          <div className="relative w-full max-w-[660px] xl:max-w-[720px] aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-950 group">
            <img
              src={HERO_BACKGROUND_IMAGE}
              alt="TRA Studio Plateau Décor Vintage à Témara"
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Subtle bottom gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CTAs ON MOBILE / TABLET (Docked at bottom, phone button first + reserve button) */}
        <div className="lg:hidden pt-4 pb-2 flex items-center gap-3">
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


