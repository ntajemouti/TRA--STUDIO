import React, { useState, useRef } from 'react';
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
  const [activeUnmutedId, setActiveUnmutedId] = useState<string | null>(null);
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({});
  const [modalReel, setModalReel] = useState<ClientReelItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

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

  // Scroll controls for big reel carousel
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const cardWidth = 360;
      const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
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
      {/* Ambient background glow matching podcasty vibe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-600/10 via-rose-600/10 to-pink-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        {/* =========================================================================
            HEADER - PODCASTY STYLE
            - Eyebrow: DES CONTENUS PRÊTS À IMPRESSIONNER
            - Title: Des reels et vidéos de nos clients (Pink/Orange Gradient)
            - Description: Explorez les vidéos produites dans nos studios...
           ========================================================================= */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-zinc-400 uppercase block">
              DES CONTENUS PRÊTS À IMPRESSIONNER
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-[#ff5722] via-[#f50057] to-[#d81b60] bg-clip-text text-transparent">
                Des reels et vidéos de nos clients
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
              Explorez les vidéos produites dans nos studios et découvrez ce que nos clients ont créé avec notre expertise.
              Inspirez-vous et laissez-nous sublimer vos projets !
            </p>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            REELS CAROUSEL - LARGE FORMAT (kber la form dyal format reel)
            - Clean pure video with zero text overlays (simple mfihch ktaba)
            - Extra big and prominent 9:16 vertical cards
           ========================================================================= */}
        <ScrollReveal animation="fade-up">
          <div className="relative group/carousel">
            {/* Carousel Navigation Arrows - Always visible & prominent on desktop */}
            <button
              type="button"
              onClick={() => scroll('left')}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 z-30 hover:scale-110 hover:border-studio-red hover:bg-zinc-800 cursor-pointer"
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 z-30 hover:scale-110 hover:border-studio-red hover:bg-zinc-800 cursor-pointer"
              aria-label="Défiler vers la droite"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Reel Cards Container - Large format horizontal scrolling with smooth snap */}
            <div
              ref={containerRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-2 sm:px-4 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CLIENT_REELS.map((reel) => {
                const isMuted = activeUnmutedId !== reel.id;
                const isPaused = !!pausedMap[reel.id];

                return (
                  <div
                    key={reel.id}
                    className="flex-shrink-0 w-[80vw] sm:w-[320px] md:w-[340px] lg:w-[360px] snap-center group relative cursor-pointer select-none"
                    onClick={() => handleTogglePlay(reel.id)}
                  >
                    {/* Large 9:16 vertical card with rounded-3xl and deep luxury shadow */}
                    <div className="relative aspect-[9/16] w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-2xl transition-all duration-300 group-hover:border-zinc-500 group-hover:shadow-studio-red/20 group-hover:shadow-2xl">
                      {/* Authentic Video Playing Seamlessly */}
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

                      {/* Discreet Top Action Controls (Clean, minimal, no cluttering text) */}
                      <div className="absolute top-4 inset-x-4 flex items-center justify-end gap-2 z-20 pointer-events-auto">
                        {/* Sound Toggle Button */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleMute(reel.id, e)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 border cursor-pointer ${
                            !isMuted
                              ? 'bg-studio-red text-white border-studio-red shadow-lg shadow-studio-red/40 scale-105'
                              : 'bg-black/60 text-white/90 border-white/20 hover:bg-black/80 hover:text-white'
                          }`}
                          title={isMuted ? 'Activer le son' : 'Couper le son'}
                        >
                          {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>

                        {/* Fullscreen Expand Button */}
                        <button
                          type="button"
                          onClick={(e) => handleOpenModal(reel, e)}
                          className="w-9 h-9 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md text-white/90 border border-white/20 hover:bg-black/80 hover:text-white transition-all duration-200 cursor-pointer"
                          title="Agrandir la vidéo"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pause Indicator overlay (only appears when video is paused) */}
                      {isPaused && (
                        <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex items-center justify-center z-15">
                          <div className="w-14 h-14 rounded-full bg-studio-red/90 text-white flex items-center justify-center shadow-xl shadow-studio-red/40 pl-0.5 animate-in zoom-in-75 duration-200">
                            <Play className="w-7 h-7 fill-white" />
                          </div>
                        </div>
                      )}

                      {/* Subtle hover border glow */}
                      <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] border-2 border-transparent group-hover:border-studio-red/40 transition-colors pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile swipe and drag hint */}
            <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500 text-xs font-medium">
              <span>Glissez horizontalement pour découvrir tous les reels</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">9 vidéos uniques</span>
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
                  const el = document.getElementById('catalogue');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-shrink-0 px-5 py-3 rounded-xl bg-studio-red hover:bg-studio-redHover text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-studio-red/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
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
