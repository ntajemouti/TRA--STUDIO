import React, { useState } from 'react';
import { StudioSettings } from '../../types';
import { Calendar, ArrowRight, Play, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios: () => void;
}

interface GalleryAtmosphere {
  id: string;
  image: string;
  category: string;
  title: string;
  atmosphere: string;
}

const DEFAULT_HERO_IMAGE = '/images/studios/studio-retro-creative.jpg';

const GALLERY_ATMOSPHERES: GalleryAtmosphere[] = [
  {
    id: 'studio-prestige',
    image: '/images/studios/studio-prestige-dark.jpg',
    category: 'PODCAST PRESTIGE',
    title: 'Acoustique Or & Noir',
    atmosphere: 'Setup Shure broadcast & fauteuils feutrés',
  },
  {
    id: 'studio-boucle',
    image: '/images/studios/studio-boucle-intimate.jpg',
    category: 'INTERVIEW & TALK',
    title: 'Warm & Minimalist',
    atmosphere: 'Canapé bouclé, bois noble & éclairage chaud',
  },
  {
    id: 'studio-roundtable',
    image: '/images/studios/studio-roundtable-broadcast.jpg',
    category: 'TABLE RONDE',
    title: 'Débat 3 Intervenants',
    atmosphere: 'Drapé profond & micros broadcast studio',
  },
  {
    id: 'studio-tra-neon',
    image: '/catalog-photos/tra-studio-desktop-modern-official-logo.jpg',
    category: 'PLATEAU TRA',
    title: 'Signature Lumineuse',
    atmosphere: 'Ambiance néon TRA & panneaux acoustiques',
  },
  {
    id: 'studio-production',
    image: '/catalog-photos/tra-studio-desktop-frontal.jpg',
    category: 'PRODUCTION & REELS',
    title: 'Cadre Caméra 4K',
    atmosphere: 'Direction artistique & optiques cinéma',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBooking,
  onExploreStudios,
}) => {
  const [activeImage, setActiveImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleAtmosphereClick = (item: GalleryAtmosphere) => {
    if (activeId === item.id) {
      setActiveImage(DEFAULT_HERO_IMAGE);
      setActiveId(null);
    } else {
      setActiveImage(item.image);
      setActiveId(item.id);
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
    <section className="relative w-full bg-[#0A0A0A] text-white pt-2 sm:pt-4 pb-8 sm:pb-12 overflow-hidden">
      {/* Container with ample editorial breathing room */}
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            LARGE IMMERSIVE HERO CARD (Reference Inspired Composition, 100% TRA Identity)
           ========================================================================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden border border-zinc-800/80 bg-[#0A0A0A] shadow-2xl min-h-[660px] sm:min-h-[720px] lg:min-h-[780px] xl:min-h-[820px] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16">
          
          {/* Main Background Image (Cross-fading with smooth cinematic transition) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              key={activeImage}
              src={activeImage}
              alt="TRA Studio Atmosphère"
              className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.08] transition-all duration-700 ease-out scale-100 hover:scale-[1.01]"
            />
          </div>

          {/* Cinematic Dark Overlays (Ensures razor-sharp text readability without masking photography) */}
          {/* 1. Left-to-right gradient for typographic hierarchy */}
          <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/85 via-45% to-[#0A0A0A]/30 lg:to-transparent pointer-events-none" />
          
          {/* 2. Bottom-to-top gradient for gallery strip grounding */}
          <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 via-35% to-transparent pointer-events-none" />
          
          {/* 3. Subtle brand red ambient glow in the background */}
          <div className="absolute top-1/4 left-1/12 w-[420px] h-[420px] bg-[#B00000]/12 rounded-full blur-[140px] pointer-events-none z-1" />

          {/* =========================================================================
              TOP & MIDDLE: TRA STUDIO EDITORIAL MESSAGING
             ========================================================================= */}
          <div className="relative z-10 max-w-3xl xl:max-w-4xl space-y-4 sm:space-y-6 pt-2 sm:pt-4">
            
            {/* Eyebrow Label: Confident, minimal & distinctive */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#B00000] animate-pulse" />
              <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-zinc-300 uppercase select-none">
                PODCAST <span className="text-[#B00000] font-semibold">//</span> VIDÉO <span className="text-[#B00000] font-semibold">//</span> PHOTO
              </p>
            </div>

            {/* Main Display Heading: Bebas Neue, tall, cinematic, impactful */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-wide uppercase leading-[0.92] text-white drop-shadow-2xl">
              ON CAPTURE CE QUI <span className="text-[#B00000]">MÉRITE DE RESTER.</span>
            </h1>

            {/* Supporting Copy: Short, elegant, specific to TRA Studio */}
            <p className="font-sans text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl drop-shadow">
              Un studio de création audiovisuelle &amp; podcast d'exception à Témara. Nous transformons vos idées en images, en voix et en contenu qui marque.
            </p>

            {/* Clear Primary & Secondary CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary CTA: TRA Red Accent */}
              <button
                type="button"
                onClick={onStartBooking}
                className="h-12 sm:h-14 px-7 sm:px-9 rounded-full bg-[#B00000] hover:bg-[#8F0000] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#B00000]/30 hover:shadow-[#B00000]/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver un studio</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              {/* Secondary CTA: Minimal Premium Border */}
              <button
                type="button"
                onClick={handleDiscoverClick}
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/50 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-white/90" />
                <span>Découvrir nos réalisations</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              BOTTOM: HORIZONTAL EDITORIAL IMAGE GALLERY STRIP
              - 5 distinct TRA atmospheres (no duplicates)
              - Desktop: horizontal grid of preview cards
              - Mobile: smooth horizontal scroll (never vertical stack)
              - Interactive: click any card to preview full-screen in hero backdrop
             ========================================================================= */}
          <div className="relative z-10 pt-10 sm:pt-12">
            {/* Gallery Label with subtle pulse */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="font-sans text-[11px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B00000]" />
                <span>Nos environnements de tournage</span>
              </span>
              <span className="hidden sm:inline font-sans text-[11px] text-zinc-400 tracking-wide">
                Cliquez pour prévisualiser l'atmosphère
              </span>
            </div>

            {/* The Horizontal Gallery Strip */}
            <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 sm:gap-4 pb-2 md:grid md:grid-cols-5 md:overflow-visible">
              {GALLERY_ATMOSPHERES.map((item) => {
                const isSelected = activeId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleAtmosphereClick(item)}
                    className={`relative h-28 sm:h-32 lg:h-36 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 bg-zinc-950 shrink-0 w-[230px] sm:w-[260px] md:w-auto snap-start select-none ${
                      isSelected
                        ? 'ring-2 ring-[#B00000] ring-offset-2 ring-offset-[#0A0A0A] scale-[1.02] shadow-xl shadow-[#B00000]/20'
                        : 'border border-zinc-800/80 hover:border-zinc-500/80 opacity-85 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  >
                    {/* Background image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.80] group-hover:brightness-95"
                    />

                    {/* Gradient Overlay for Clean Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/80 transition-colors duration-300" />

                    {/* Bottom Labeling */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 flex flex-col justify-end space-y-0.5">
                      <span className="font-sans text-[10px] font-bold tracking-widest text-[#B00000] uppercase">
                        {item.category}
                      </span>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-white tracking-tight leading-tight line-clamp-1">
                        {item.title}
                      </h4>
                    </div>

                    {/* Active Indicator Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#B00000] text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                        Actif
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
