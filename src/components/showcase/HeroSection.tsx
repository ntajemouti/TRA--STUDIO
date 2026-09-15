import React, { useState, useEffect, useRef } from 'react';
import { StudioSettings } from '../../types';
import { 
  ArrowRight, 
  Calendar, 
  MessageCircle, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Film
} from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios: () => void;
}

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/catalog-photos/tra-studio-desktop-frontal.jpg',
    alt: 'TRA Studio plateau podcast frontal',
  },
  {
    id: 'slide-2',
    image: '/catalog-photos/tra-studio-desktop-angled.jpg',
    alt: 'TRA Studio régie et plateau en angle',
  },
  {
    id: 'slide-3',
    image: '/catalog-photos/tra-studio-desktop-modern-official-logo.jpg',
    alt: 'TRA Studio logo officiel et acoustique',
  },
  {
    id: 'slide-4',
    image: '/images/studio-hero-bg.jpg',
    alt: 'TRA Studio ambiance lumières et caméras',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onStartBooking,
  onExploreStudios,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<any>(null);

  // Auto-play carousel every 6 seconds
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const phoneNum = settings.phone || '+212660719968';
  const waNumber = settings.whatsappNumber || '212660719968';
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    "Bonjour TRA Studio Témara, je souhaite réserver une session en studio."
  )}`;

  return (
    <div className="relative w-full bg-studio-bg text-white overflow-hidden pt-2 sm:pt-4 pb-8 sm:pb-12">
      {/* =========================================================================
          IMMERSIVE FULL-WIDTH HERO CAROUSEL (First thing visible upon entry)
         ========================================================================= */}
      <div className="w-[96%] xl:w-[94%] 2xl:max-w-[1780px] mx-auto space-y-4 sm:space-y-6">
        <div 
          className="relative w-full rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950 shadow-2xl group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slide Screen (Full visual height) */}
          <div className="relative h-[68vh] sm:h-[75vh] lg:h-[80vh] min-h-[500px] max-h-[820px] w-full overflow-hidden">
            {/* Background Images Carousel */}
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className={`w-full h-full object-cover object-center filter brightness-60 contrast-110 transition-transform duration-1000 ease-out ${
                      isActive ? 'scale-100' : 'scale-105'
                    }`}
                  />
                </div>
              );
            })}

            {/* Dark Cinematic Gradients for clean text contrast */}
            <div className="absolute inset-0 z-15 bg-gradient-to-t from-black via-black/50 to-black/20 pointer-events-none"></div>
            <div className="absolute inset-0 z-15 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none"></div>

            {/* Subtle Studio Red Atmospheric Ambient Glow */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-studio-red/15 rounded-full blur-[140px] pointer-events-none z-15"></div>

            {/* Unified Clean Title & Simple Paragraph Overlay (No Clutter) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-16 z-20 flex flex-col justify-end text-left max-w-4xl space-y-4 sm:space-y-5 pointer-events-auto">
              {/* Clean Location / Category Tag */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-studio-red/20 border border-studio-red/40 text-studio-red text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-studio-red animate-pulse"></span>
                  <span>Plateau Audiovisuel • Témara</span>
                </span>
              </div>

              {/* Clean Impactful Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-xl leading-tight">
                TRA STUDIO <span className="text-studio-red">TÉMARA</span>
              </h1>

              {/* Simple Context-Rich Paragraph */}
              <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl drop-shadow">
                Plateau de tournage insonorisé, caméras 4K de référence, micros Shure SM7B et régie multicam en direct à Témara. Donnez à vos podcasts, interviews et productions audiovisuelles un standard professionnel d'exception.
              </p>

              {/* Primary Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Reserve Button */}
                <button
                  type="button"
                  onClick={onStartBooking}
                  className="h-12 sm:h-13 px-7 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-studio-red/40 flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Réserver une session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Explore Catalog */}
                <button
                  type="button"
                  onClick={onExploreStudios}
                  className="h-12 sm:h-13 px-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  Découvrir le Catalogue
                </button>

                {/* WhatsApp Quick */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 sm:h-13 px-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white flex items-center gap-2 text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                  title="Discuter directement sur WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>

                {/* Phone Call */}
                <a
                  href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
                  className="w-12 sm:w-13 h-12 sm:h-13 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                  title={`Appeler directement (${phoneNum})`}
                >
                  <Phone className="w-4 h-4 text-studio-red" />
                </a>
              </div>
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide précédente"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-950/70 hover:bg-studio-red border border-zinc-700 hover:border-studio-red text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide suivante"
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-950/70 hover:bg-studio-red border border-zinc-700 hover:border-studio-red text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Bar: Slide Counter & Pagination Dots */}
          <div className="absolute bottom-5 right-6 sm:right-12 z-30 flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-mono text-zinc-300 font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-zinc-800">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>

            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Aller à la slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-8 sm:w-10 bg-studio-red shadow-lg shadow-studio-red/40'
                      : 'w-2.5 bg-zinc-600 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Minimalist Preview Thumbnails (Pure Visual, No Text Clutter) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {HERO_SLIDES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`group relative h-18 sm:h-22 rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200 bg-zinc-900 ${
                currentSlide === idx
                  ? 'border-studio-red ring-1 ring-studio-red scale-[1.02]'
                  : 'border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-85"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
