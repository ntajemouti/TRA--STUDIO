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
  tag: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  pills: string[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/catalog-photos/tra-studio-desktop-frontal.jpg',
    tag: 'PLATEAU 1 • TÉMARA',
    badge: 'Standard Broadcast 4K',
    title: 'Votre studio podcast & vidéo',
    titleHighlight: 'à Témara',
    subtitle: 'Plateau multicaméra 4K insonorisé, micros de référence Shure SM7B, retours vidéo et régisseur dédié pour vos talk-shows et interviews.',
    pills: ['3 Caméras 4K Cinéma', 'Micros Shure SM7B', 'Régie Live'],
  },
  {
    id: 'slide-2',
    image: '/catalog-photos/tra-studio-desktop-angled.jpg',
    tag: 'RÉGIE DIRECTE • POST-PRODUCTION',
    badge: 'Export Immédiat SSD',
    title: 'Commutation live & prise de son',
    titleHighlight: 'haute fidélité',
    subtitle: 'Table de mixage multipiste, contrôle vidéo en temps réel et remise immédiate de vos fichiers 4K sur support SSD dès la fin du tournage.',
    pills: ['Enregistrement multipiste', 'Export 4K instantané', 'Étalonnage soigné'],
  },
  {
    id: 'slide-3',
    image: '/catalog-photos/tra-studio-desktop-modern-official-logo.jpg',
    tag: 'CRÉATIVITÉ & MARQUES',
    badge: 'Production Audiovisuelle',
    title: 'Donnez une dimension cinéma',
    titleHighlight: 'à vos projets',
    subtitle: 'Spots publicitaires, formats verticaux TikTok & Reels 9:16, animations motion design et identité visuelle pour marques et créateurs.',
    pills: ['Formats 9:16 Percutants', 'Lumières RGB Nanlite', 'Montage Express'],
  },
  {
    id: 'slide-4',
    image: '/images/studio-hero-bg.jpg',
    tag: 'ESPACE PRIVATISÉ • CONFORT',
    badge: 'Privatisation Complète',
    title: 'Un espace de création exclusif',
    titleHighlight: 'en plein Témara',
    subtitle: 'Situé sur le Boulevard Hassan II à Témara, notre studio allie atmosphère feutrée, insonorisation acoustique et équipements de premier ordre.',
    pills: ['Accès Boulevard Hassan II', 'Parking à proximité', 'Ambiance lounge'],
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
          <div className="relative h-[72vh] sm:h-[80vh] lg:h-[84vh] min-h-[540px] max-h-[860px] w-full overflow-hidden">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Authentic Studio Photo Background */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover object-center filter brightness-65 contrast-110 transition-transform duration-1000 ease-out ${
                      isActive ? 'scale-100' : 'scale-105'
                    }`}
                  />

                  {/* Dark Gradients for Content Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none"></div>

                  {/* Red Atmospheric Ambient Glow in Corner */}
                  <div className="absolute top-10 left-10 w-96 h-96 bg-studio-red/20 rounded-full blur-[140px] pointer-events-none"></div>

                  {/* Slide Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-16 z-20 flex flex-col justify-end text-left max-w-4xl space-y-4 sm:space-y-6 pointer-events-auto">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-studio-red text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span>{slide.tag}</span>
                      </span>

                      <span className="px-3.5 py-1 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-zinc-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-lg leading-tight">
                      {slide.title}{' '}
                      <span className="text-studio-red">{slide.titleHighlight}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-base lg:text-lg text-zinc-200 font-normal leading-relaxed max-w-3xl drop-shadow">
                      {slide.subtitle}
                    </p>

                    {/* Pills Specs */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {slide.pills.map((pill, pIdx) => (
                        <div
                          key={pIdx}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-zinc-800 text-xs font-bold text-zinc-200"
                        >
                          <span className="w-2 h-2 rounded-full bg-studio-red"></span>
                          <span>{pill}</span>
                        </div>
                      ))}
                    </div>

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
                        <span className="hidden sm:inline">WhatsApp Direct</span>
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
              );
            })}
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

        {/* Mini Preview Thumbnails Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {HERO_SLIDES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`group relative h-20 sm:h-24 rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200 bg-zinc-900 ${
                currentSlide === idx
                  ? 'border-studio-red ring-1 ring-studio-red scale-[1.02]'
                  : 'border-zinc-800 hover:border-zinc-600'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-2 left-2.5 right-2.5 z-10 text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-studio-red">
                  {item.tag}
                </span>
                <p className="text-xs font-bold text-white leading-tight drop-shadow truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
