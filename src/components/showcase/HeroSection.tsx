import React, { useState, useEffect, useRef } from 'react';
import { StudioSettings } from '../../types';
import { Calendar, ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios: () => void;
}

interface StudioPhoto {
  id: string;
  image: string;
  title: string;
  category: string;
}

const TRA_STUDIO_PHOTOS: StudioPhoto[] = [
  {
    id: 'studio-retro',
    image: '/images/studios/studio-retro-creative.jpg',
    title: 'Studio Rétro & Velours',
    category: 'CRÉATIF & PODCAST',
  },
  {
    id: 'studio-prestige',
    image: '/images/studios/studio-prestige-dark.jpg',
    title: 'Studio Acoustique Or & Noir',
    category: 'PODCAST PRESTIGE',
  },
  {
    id: 'studio-boucle',
    image: '/images/studios/studio-boucle-intimate.jpg',
    title: 'Studio Warm Bouclé',
    category: 'INTERVIEW & TALK',
  },
  {
    id: 'studio-roundtable',
    image: '/images/studios/studio-roundtable-broadcast.jpg',
    title: 'Plateau Table Ronde',
    category: 'DÉBAT MULTICAM',
  },
  {
    id: 'studio-tra-neon',
    image: '/catalog-photos/tra-studio-desktop-modern-official-logo.jpg',
    title: 'Plateau Signature TRA',
    category: 'PLATEAU TRA',
  },
  {
    id: 'studio-production',
    image: '/catalog-photos/tra-studio-desktop-frontal.jpg',
    title: 'Plateau Broadcast 4K',
    category: 'PRODUCTION & REELS',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBooking,
  onExploreStudios,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Automatic slideshow transition every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TRA_STUDIO_PHOTOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Smooth scroll carousel container to keep active square visible and centered
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    const activeChild = container.children[currentIndex] as HTMLElement;
    if (activeChild) {
      activeChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TRA_STUDIO_PHOTOS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TRA_STUDIO_PHOTOS.length);
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
    <section 
      className="relative w-full h-[86vh] min-h-[660px] max-h-[960px] bg-[#0A0A0A] overflow-hidden flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================================================
          1. FULL-WIDTH CINEMATIC HERO SLIDESHOW (Edge-to-edge, NO horizontal margins)
         ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {TRA_STUDIO_PHOTOS.map((photo, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none -z-10'
              }`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.05]"
              />
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          2. SUBTLE OVERLAYS (No 35% heavy box! Photography remains 100% visible)
         ========================================================================= */}
      {/* Delicate global tint for text legibility without crushing the photo */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none z-1" />
      
      {/* Subtle top vignette for header contrast */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-1" />

      {/* Subtle bottom vignette to anchor the square photo carousel */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 via-40% to-transparent pointer-events-none z-1" />

      {/* Gentle deep burgundy ambient glow in the top-left */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-studio-red/15 rounded-full blur-[160px] pointer-events-none z-1" />

      {/* =========================================================================
          3. HERO EDITORIAL TEXT (Clean, focused, separated from photos)
         ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-24 pt-10 sm:pt-14 lg:pt-16 max-w-4xl space-y-4 sm:space-y-6">
        
        {/* Eyebrow Label: Audiovisual, podcast, photo */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-studio-red animate-pulse" />
          <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-zinc-300 uppercase">
            PODCAST <span className="text-studio-burgundyLight font-semibold">//</span> PRODUCTION <span className="text-studio-burgundyLight font-semibold">//</span> PHOTO
          </p>
        </div>

        {/* Main Headline: Bebas Neue, bold, cinematic, unforgettable */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-wide uppercase leading-[0.92] text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)]">
          <span className="block">VOTRE PROCHAINE</span>
          <span className="block">IDÉE FORTE</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9E232B] via-[#75141B] to-[#C0392B] drop-shadow-md">
            COMMENCE ICI.
          </span>
        </h1>

        {/* Minimal CTAs (Clean, uncluttered, no heavy paragraphs blocking the photo) */}
        <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Primary CTA: Deep Burgundy Accent */}
          <button
            type="button"
            onClick={onStartBooking}
            className="h-12 sm:h-14 px-7 sm:px-9 rounded-full bg-studio-red hover:bg-studio-redHover text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-studio-red/40 hover:shadow-studio-red/60 transition-all duration-200 active:scale-95 flex items-center gap-2.5 cursor-pointer border border-[#75141B]/50 hover:scale-[1.02]"
          >
            <Calendar className="w-4 h-4" />
            <span>Réserver un studio</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          {/* Secondary CTA: Sleek Minimal Glass */}
          <button
            type="button"
            onClick={handleDiscoverClick}
            className="h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/50 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white/90" />
            <span>Découvrir nos réalisations</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          4. SQUARE PHOTO CAROUSEL (Consistent equal squares, auto-moves every ~5s)
         ========================================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 xl:px-24 pb-6 sm:pb-8 pt-4">
        
        {/* Carousel Header Bar: Minimal Label + Counter & Manual Controls */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-bold tracking-widest text-zinc-300 uppercase">
              Nos Plateaux &amp; Environnements de Tournage
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400 font-semibold tracking-wider hidden sm:inline">
              0{currentIndex + 1} / 0{TRA_STUDIO_PHOTOS.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Plateau précédent"
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-studio-red border border-zinc-800 hover:border-studio-red text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Plateau suivant"
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-studio-red border border-zinc-800 hover:border-studio-red text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* The Square Carousel Strip: All items exactly SQUARE with equal dimensions */}
        <div 
          ref={carouselRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2"
        >
          {TRA_STUDIO_PHOTOS.map((photo, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Afficher ${photo.title}`}
                className={`group relative shrink-0 aspect-square w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 snap-center cursor-pointer select-none bg-zinc-950 text-left ${
                  isActive
                    ? 'ring-2 ring-studio-red ring-offset-2 ring-offset-[#0A0A0A] scale-[1.03] shadow-2xl shadow-studio-red/40 z-10'
                    : 'border border-zinc-800/80 hover:border-zinc-500 opacity-65 hover:opacity-100 hover:scale-[1.02]'
                }`}
              >
                {/* Square Image */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100"
                />

                {/* Subtle base vignette for title readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity" />

                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-studio-red text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                    Actif
                  </div>
                )}

                {/* Clean Label at the bottom of the square */}
                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5">
                  <p className="font-sans text-[9px] sm:text-[10px] font-bold tracking-wider text-white uppercase truncate drop-shadow">
                    {photo.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
