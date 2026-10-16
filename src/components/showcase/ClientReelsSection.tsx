import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Maximize2, X, Play } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export interface ClientReelItem {
  id: string;
  videoUrl: string;
  posterUrl: string;
}

// 9 completely UNIQUE authentic videos from TRA without duplicates
const CLIENT_REELS: ClientReelItem[] = [
  {
    id: 'reel-1',
    videoUrl: '/reels/reel-1.mp4',
    posterUrl: '/reels/reel-1-poster.jpg',
  },
  {
    id: 'reel-2',
    videoUrl: '/reels/reel-2.mp4',
    posterUrl: '/reels/reel-2-poster.jpg',
  },
  {
    id: 'reel-3',
    videoUrl: '/reels/reel-3.mp4',
    posterUrl: '/reels/reel-3-poster.jpg',
  },
  {
    id: 'reel-4',
    videoUrl: '/reels/reel-4.mp4',
    posterUrl: '/reels/reel-4-poster.jpg',
  },
  {
    id: 'reel-5',
    videoUrl: '/reels/reel-5.mp4',
    posterUrl: '/reels/reel-5-poster.jpg',
  },
  {
    id: 'reel-6',
    videoUrl: '/reels/reel-6.mp4',
    posterUrl: '/reels/reel-6-poster.jpg',
  },
  {
    id: 'reel-7',
    videoUrl: '/reels/reel-7.mp4',
    posterUrl: '/reels/reel-7-poster.jpg',
  },
  {
    id: 'reel-8',
    videoUrl: '/reels/reel-8.mp4',
    posterUrl: '/reels/reel-8-poster.jpg',
  },
  {
    id: 'reel-9',
    videoUrl: '/reels/reel-9.mp4',
    posterUrl: '/reels/reel-9-poster.jpg',
  },
];

interface ClientReelsSectionProps {
  onStartBooking?: () => void;
}

export const ClientReelsSection: React.FC<ClientReelsSectionProps> = ({ onStartBooking }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeUnmutedId, setActiveUnmutedId] = useState<string | null>(null);
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({});
  const [modalReel, setModalReel] = useState<ClientReelItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Auto-advance carousel every 10 seconds (KOUL 10 seconds ythrko automatic)
  useEffect(() => {
    if (modalReel || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CLIENT_REELS.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [modalReel, isHovered]);

  // Smooth scroll container to currentIndex
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const items = container.querySelectorAll<HTMLElement>('.reel-card-item');
    if (items[currentIndex]) {
      const target = items[currentIndex];
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        // On phone, center the single card exactly in viewport
        const leftPos = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
        container.scrollTo({ left: Math.max(0, leftPos), behavior: 'smooth' });
      } else {
        // On PC, align smooth scroll
        const leftPos = target.offsetLeft - container.offsetLeft;
        container.scrollTo({ left: Math.max(0, leftPos), behavior: 'smooth' });
      }
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CLIENT_REELS.length) % CLIENT_REELS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CLIENT_REELS.length);
  };

  // Toggle Mute on a specific reel
  const handleToggleMute = (reelId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeUnmutedId === reelId) {
      const video = videoRefs.current[reelId];
      if (video) video.muted = true;
      setActiveUnmutedId(null);
    } else {
      // Mute others, unmute this one
      Object.entries(videoRefs.current).forEach(([id, vid]) => {
        if (vid) {
          if (id === reelId) {
            vid.muted = false;
          } else {
            vid.muted = true;
          }
        }
      });
      setActiveUnmutedId(reelId);
    }
  };

  // Toggle Play / Pause on a specific reel
  const handleTogglePlay = (reelId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRefs.current[reelId];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setPausedMap((prev) => ({ ...prev, [reelId]: false }));
    } else {
      video.pause();
      setPausedMap((prev) => ({ ...prev, [reelId]: true }));
    }
  };

  const handleOpenModal = (reel: ClientReelItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeUnmutedId) {
      const vid = videoRefs.current[activeUnmutedId];
      if (vid) vid.muted = true;
      setActiveUnmutedId(null);
    }
    setModalReel(reel);
  };

  const handleCloseModal = () => {
    setModalReel(null);
  };

  return (
    <section id="reels" className="py-16 sm:py-24 bg-studio-bg text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-studio-red/10 via-studio-red/15 to-studio-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        
        {/* =========================================================================
            HEADER: Title & Paragraph ONLY ("DES CONTENUS PRÊTS À IMPRESSIONNER" removed)
           ========================================================================= */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-wide uppercase leading-tight">
              <span className="text-white">Des reels et vidéos </span>
              <span className="text-[#8B0000] drop-shadow-[0_2px_15px_rgba(139,0,0,0.4)]">
                de nos clients
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
              Explorez les vidéos produites dans nos studios et découvrez ce que nos clients ont créé avec notre expertise.
              Inspirez-vous et laissez-nous sublimer vos projets !
            </p>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            REELS CAROUSEL:
            - Desktop: 6 reels visible at once spanning wide from corner to corner ("chadin mn 9nt"), compact format
            - Mobile: Exactly 1 reel visible at a time
            - Auto-scrolls every 10 seconds smoothly
           ========================================================================= */}
        <ScrollReveal animation="fade-up">
          <div
            className="relative group/carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/95 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 z-30 hover:scale-110 hover:border-[#8B0000] hover:bg-zinc-800 cursor-pointer"
              aria-label="Reel précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/95 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 z-30 hover:scale-110 hover:border-[#8B0000] hover:bg-zinc-800 cursor-pointer"
              aria-label="Reel suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Reel Cards Container - 6 on desktop, 1 on mobile */}
            <div
              ref={containerRef}
              className="flex items-center gap-3 sm:gap-3.5 overflow-x-auto snap-x snap-mandatory py-4 px-1 sm:px-2 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CLIENT_REELS.map((reel, idx) => {
                const isMuted = activeUnmutedId !== reel.id;
                const isPaused = !!pausedMap[reel.id];
                const isCurrentOnMobile = currentIndex === idx;

                return (
                  <div
                    key={reel.id}
                    className="reel-card-item flex-shrink-0 w-[84vw] max-w-[280px] sm:w-[calc((100%-2*14px)/3)] md:w-[calc((100%-3*14px)/4)] lg:w-[calc((100%-5*14px)/6)] snap-center group relative cursor-pointer select-none transition-all duration-300"
                    onClick={() => handleTogglePlay(reel.id)}
                  >
                    {/* Compact 9:16 vertical card with refined borders and sleek shadow */}
                    <div
                      className={`relative aspect-[9/16] w-full rounded-2xl sm:rounded-[22px] overflow-hidden bg-zinc-950 border shadow-xl transition-all duration-300 ${
                        isCurrentOnMobile
                          ? 'border-[#8B0000] sm:border-zinc-800/90 shadow-[#8B0000]/25'
                          : 'border-zinc-800/90 group-hover:border-zinc-600'
                      }`}
                    >
                      {/* Video Player */}
                      <video
                        ref={(el) => {
                          videoRefs.current[reel.id] = el;
                        }}
                        src={reel.videoUrl}
                        poster={reel.posterUrl}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Top Action Controls */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-end gap-1.5 z-20 pointer-events-auto">
                        {/* Sound Toggle */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleMute(reel.id, e)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 border cursor-pointer ${
                            !isMuted
                              ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md shadow-[#8B0000]/40 scale-105'
                              : 'bg-black/60 text-white/90 border-white/20 hover:bg-black/80 hover:text-white'
                          }`}
                          title={isMuted ? 'Activer le son' : 'Couper le son'}
                        >
                          {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        </button>

                        {/* Fullscreen Expand */}
                        <button
                          type="button"
                          onClick={(e) => handleOpenModal(reel, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md text-white/90 border border-white/20 hover:bg-black/80 hover:text-white transition-all duration-200 cursor-pointer"
                          title="Agrandir la vidéo"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Pause Indicator overlay */}
                      {isPaused && (
                        <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex items-center justify-center z-15">
                          <div className="w-12 h-12 rounded-full bg-[#8B0000]/90 text-white flex items-center justify-center shadow-xl shadow-[#8B0000]/40 pl-0.5 animate-in zoom-in-75 duration-200">
                            <Play className="w-6 h-6 fill-white" />
                          </div>
                        </div>
                      )}

                      {/* Subtle hover border glow */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-[22px] border border-transparent group-hover:border-[#8B0000]/40 transition-colors pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination / 10s auto-advancing progress pills */}
            <div className="flex items-center justify-center gap-1.5 pt-3">
              {CLIENT_REELS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Aller au reel ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === i
                      ? 'w-6 h-1.5 bg-[#8B0000] shadow-sm shadow-[#8B0000]/50'
                      : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>

            {/* Hint for mobile */}
            <div className="sm:hidden flex items-center justify-center gap-2 mt-2 text-zinc-500 text-[11px] font-medium">
              <span>Reel {currentIndex + 1} sur {CLIENT_REELS.length} • Défilement automatique toutes les 10s</span>
            </div>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            BOTTOM CALL TO ACTION
           ========================================================================= */}
        <ScrollReveal animation="fade-up">
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-base font-bold text-white">
                Envie de tourner vos propres Reels ou Vidéos ?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Nos plateaux équipés à Témara sont prêts pour vos interviews, podcasts et formats courts.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onStartBooking) {
                  onStartBooking();
                } else {
                  const el = document.getElementById('services') || document.getElementById('catalogue');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-shrink-0 px-6 py-3.5 rounded-full bg-[#8B0000] hover:bg-[#A00000] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#8B0000]/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-[#A00000]/40"
            >
              <span>Réserver mon créneau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* =========================================================================
          FULLSCREEN / EXPANDED REEL MODAL
         ========================================================================= */}
      {modalReel && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Video Player */}
            <video
              src={modalReel.videoUrl}
              poster={modalReel.posterUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-studio-red hover:border-studio-red transition-all cursor-pointer z-30"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
