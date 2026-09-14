import React, { useState, useEffect, useRef } from 'react';
import { StudioSettings } from '../../types';
import { 
  ArrowRight, 
  Calendar, 
  MessageCircle, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Film
} from 'lucide-react';

interface HeroSectionProps {
  settings: StudioSettings;
  onStartBooking: () => void;
  onExploreStudios: () => void;
}

interface CarouselSlide {
  id: string;
  image: string;
  video?: string;
  tag: string;
  badge: string;
  title: string;
  subtitle: string;
  details: string[];
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'plateau-1',
    video: '/videos/hero/hero-studio-cut.mp4',
    image: '/services/podcast.jpg',
    tag: 'PLATEAU 1 • VIDÉO 4K LIVE',
    badge: 'Standard Broadcast',
    title: 'Podcast & Talk-Show Multicam 4K',
    subtitle: '3 caméras 4K cinéma synchronisées, micros Shure SM7B et régisseur dédié pour une captation nette et fluide.',
    details: ['3 Caméras 4K Sync', 'Micros Shure SM7B', 'Régie en direct'],
  },
  {
    id: 'motion-design',
    video: '/videos/hero/hero-motion-design.mp4',
    image: '/services/branding.jpg',
    tag: 'ANIMATION & 3D',
    badge: 'Motion Graphics & Spots',
    title: 'Motion Design, Habillage & Spots TV',
    subtitle: 'Conception graphique animée, modélisation 3D, effets visuels et sound design sur-mesure pour vos campagnes de marque.',
    details: ['Animation 2D/3D', 'Sound design percutant', 'Diffusion broadcast'],
  },
  {
    id: 'tournage-moto',
    video: '/videos/hero/hero-moto-shoot.mp4',
    image: '/services/clip-teaser.jpg',
    tag: 'TOURNAGE ACTION & MOTO',
    badge: 'Prises de Vue Mobiles',
    title: 'Tournage Extérieur & Cadreurs Mobiles',
    subtitle: 'Cadreurs stabilisés Ronin, caméras embarquées haute vitesse et réalisation dynamique sur le terrain.',
    details: ['Stabilisation gimbal', 'Haute vitesse 120fps', 'Équipe mobile terrain'],
  },
  {
    id: 'plateau-2',
    video: '/videos/hero/hero-dynamic-action.mp4',
    image: '/services/social-media.jpg',
    tag: 'PLATEAU 2 • FORMATS COURTS',
    badge: 'Contenu Vertical',
    title: 'Formats Courts Reels & TikTok 9:16',
    subtitle: 'Éclairages tubes LED Nanlite RGB programmables et cadrage chirurgical optimisé pour capter l’attention.',
    details: ['Format 9:16 Ultra-net', 'Lumières RGB sur-mesure', 'Montage court rapide'],
  },
  {
    id: 'studio-cyclo',
    image: '/services/shooting.jpg',
    tag: 'STUDIO CYCLO BLANC',
    badge: 'Shooting & Mode',
    title: 'Studio Photo Cyclo Blanc & Lookbook',
    subtitle: 'Cyclo blanc infini, flashs haute vitesse et projecteurs continus pour des portraits et visuels impeccables.',
    details: ['Cyclo blanc infini', 'Flashs studio pro', 'Éclairage diffusé'],
  },
  {
    id: 'regie',
    image: '/catalog-photos/tra-studio-desktop-angled.jpg',
    tag: 'RÉGIE DIRECTE',
    badge: 'Export Immédiat SSD',
    title: 'Régie Technique & Commutation Live',
    subtitle: 'Table de mixage multipiste, contrôle vidéo en temps réel et remise immédiate de vos fichiers 4K sur SSD.',
    details: ['Enregistrement multipiste', 'Export 4K instantané', 'Sauvegarde sécurisée'],
  },
];

const MINI_EXPLORE = [
  { image: '/services/podcast.jpg', title: 'Podcast 4K', tag: 'Vidéo Live', hasVideo: true },
  { image: '/services/branding.jpg', title: 'Motion Design', tag: 'Animation 3D', hasVideo: true },
  { image: '/services/clip-teaser.jpg', title: 'Tournage Moto', tag: 'Action Extérieure', hasVideo: true },
  { image: '/services/social-media.jpg', title: 'Reels 9:16', tag: 'RGB Néon', hasVideo: true },
  { image: '/services/shooting.jpg', title: 'Photo Cyclo', tag: 'Fond Blanc', hasVideo: false },
  { image: '/catalog-photos/tra-studio-desktop-angled.jpg', title: 'Régie & SSD', tag: 'Export Immédiat', hasVideo: false },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onStartBooking,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const timerRef = useRef<any>(null);

  // Auto-play carousel every 6.5 seconds
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
      }, 6500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const currentSlideData = CAROUSEL_SLIDES[currentSlide];

  const phoneNum = settings.phone || '+212660719968';
  const waNumber = settings.whatsappNumber || '212660719968';
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    "Bonjour TRA Studio Témara, je souhaite réserver une session en studio."
  )}`;

  return (
    <div className="relative w-full bg-studio-bg text-white overflow-hidden pt-6 sm:pt-10 pb-14">
      {/* =========================================================================
          BACKGROUND PHOTO & AMBIENT ATMOSPHERE
         ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/studio-hero-bg.jpg"
          alt="Studio Background"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-125 brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Gradients to blend seamlessly into studio dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-studio-bg via-studio-bg/85 to-studio-bg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-studio-bg via-transparent to-studio-bg"></div>
        {/* Soft Red Radial Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-studio-red/15 rounded-full blur-[160px]"></div>
      </div>

      <div className="relative z-10 space-y-8 sm:space-y-10">
        {/* =========================================================================
            HERO TOP — Clean, Punchy & Centered
           ========================================================================= */}
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          {/* Studio Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold text-zinc-300 shadow-xl backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-studio-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-studio-red"></span>
            </span>
            <span className="text-white font-black tracking-wider">TRA STUDIO</span>
            <span className="text-zinc-600">•</span>
            <span className="tracking-wide">TÉMARA</span>
          </div>

          {/* Clean, Modern Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            Votre studio podcast & vidéo{' '}
            <span className="text-studio-red">à Témara</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto font-normal leading-relaxed">
            Tournage multicam 4K, micros professionnels, réalisation dynamique et régie dédiée. Réservez votre créneau en toute simplicité.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {/* Phone Quick Button */}
            <a
              href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
              className="w-12 h-12 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-md"
              title={`Appeler directement (${phoneNum})`}
            >
              <Phone className="w-5 h-5 text-studio-red" />
            </a>

            {/* Primary Reserve Button */}
            <button
              type="button"
              onClick={onStartBooking}
              className="h-12 px-7 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-bold text-sm tracking-wide shadow-xl shadow-studio-red/25 flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver une session</span>
            </button>

            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            IMMERSIVE FULL-SCREEN CAROUSEL CONTAINER (Takes 80% to 95% of screen)
           ========================================================================= */}
        <div className="w-[95%] xl:w-[94%] 2xl:max-w-[1780px] mx-auto space-y-6">
          <div 
            className="relative w-full rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950/90 shadow-2xl group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Slide Display (Takes 80% of Viewport Height) */}
            <div className="relative h-[70vh] sm:h-[78vh] lg:h-[82vh] min-h-[520px] max-h-[850px] w-full overflow-hidden">
              {CAROUSEL_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    {/* Slide Media: Video if available, else Image */}
                    {slide.video ? (
                      <video
                        src={slide.video}
                        poster={slide.image}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className={`w-full h-full object-cover object-center filter brightness-85 contrast-105 transition-transform duration-1000 ease-out ${
                          isActive ? 'scale-100' : 'scale-105'
                        }`}
                      />
                    ) : (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className={`w-full h-full object-cover object-center filter brightness-75 contrast-105 transition-transform duration-1000 ease-out ${
                          isActive ? 'scale-100' : 'scale-105'
                        }`}
                      />
                    )}

                    {/* Dark Gradients for Content Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none"></div>

                    {/* Slide Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-12 lg:p-16 z-20 flex flex-col justify-end text-left max-w-4xl space-y-3 sm:space-y-5 pointer-events-auto">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3.5 py-1 rounded-full bg-studio-red text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                          {slide.tag}
                        </span>
                        <span className="px-3.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-zinc-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                          {slide.badge}
                        </span>
                        {slide.video && (
                          <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md flex items-center gap-1.5 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-white"></span>
                            ● CLIP 4K
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-md leading-tight">
                        {slide.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl drop-shadow">
                        {slide.subtitle}
                      </p>

                      {/* Features Pills & CTA Button */}
                      <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                        {slide.details.map((detail, dIdx) => (
                          <div
                            key={dIdx}
                            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-zinc-800 text-xs font-bold text-zinc-200"
                          >
                            <span className="w-2 h-2 rounded-full bg-studio-red"></span>
                            <span>{detail}</span>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={onStartBooking}
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all active:scale-95 cursor-pointer mt-1 sm:mt-0"
                        >
                          <span>Réserver ce plateau</span>
                          <ArrowRight className="w-4 h-4 text-studio-red" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left / Right Carousel Arrows */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Slide précédente"
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-950/70 hover:bg-studio-red border border-zinc-700 hover:border-studio-red text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Slide suivante"
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-950/70 hover:bg-studio-red border border-zinc-700 hover:border-studio-red text-white flex items-center justify-center transition-all shadow-2xl backdrop-blur-md active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Audio Toggle Button for Active Video Slide */}
            {currentSlideData.video && (
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Activer le son de la vidéo" : "Couper le son"}
                className="absolute bottom-5 left-6 sm:left-12 z-30 px-3.5 py-1.5 rounded-xl bg-black/75 hover:bg-zinc-800 border border-zinc-700/80 text-white flex items-center gap-2 text-xs font-bold shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-zinc-400" />
                    <span className="hidden sm:inline text-zinc-300">Activer le son</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-studio-red animate-pulse" />
                    <span className="hidden sm:inline text-white font-semibold">Son activé</span>
                  </>
                )}
              </button>
            )}

            {/* Bottom Bar: Dots Pagination & Slide Counter */}
            <div className="absolute bottom-5 right-6 sm:right-12 z-30 flex items-center gap-3 sm:gap-4">
              {/* Slide Index Counter */}
              <span className="text-xs sm:text-sm font-mono text-zinc-300 font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-zinc-800">
                0{currentSlide + 1} / 0{CAROUSEL_SLIDES.length}
              </span>

              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {CAROUSEL_SLIDES.map((_, idx) => (
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

          {/* =========================================================================
              6 MINI EXPLORE CARDS — Fast Jump to Slides or Booking
             ========================================================================= */}
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Aperçu des univers de tournage & vidéos
              </span>
              <span className="text-[11px] text-zinc-500 font-semibold hidden sm:inline">
                Cliquez pour afficher dans le carrousel
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {MINI_EXPLORE.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (idx < CAROUSEL_SLIDES.length) {
                      setCurrentSlide(idx);
                    } else {
                      onStartBooking();
                    }
                  }}
                  className={`group relative h-28 sm:h-32 rounded-2xl overflow-hidden cursor-pointer border transition-all duration-200 bg-zinc-900 ${
                    currentSlide === idx
                      ? 'border-studio-red ring-1 ring-studio-red scale-[1.02]'
                      : 'border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter brightness-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                  {/* Top indicator if video */}
                  {item.hasVideo && (
                    <div className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-studio-red/90 flex items-center justify-center shadow">
                      <Play className="w-2.5 h-2.5 fill-white text-white translate-x-0.2" />
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-left">
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
      </div>
    </div>
  );
};
