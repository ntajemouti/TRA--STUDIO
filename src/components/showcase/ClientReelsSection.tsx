import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles, Film, Maximize2, X } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export interface ClientReelItem {
  id: string;
  videoUrl: string;
  posterUrl: string;
  title: string;
  category: string;
  tag: string;
  duration?: string;
}

const CLIENT_REELS: ClientReelItem[] = [
  {
    id: 'reel-1',
    videoUrl: '/reels/reel-1.mp4',
    posterUrl: '/reels/reel-1-poster.jpg',
    title: 'Session Création Studio',
    category: 'TRA Studio Témara',
    tag: 'Production 4K',
    duration: '0:21',
  },
  {
    id: 'reel-2',
    videoUrl: '/reels/reel-2.mp4',
    posterUrl: '/reels/reel-2-poster.jpg',
    title: 'Tournage True Detective',
    category: 'Set Cinématographique',
    tag: 'Ambiance Dark',
    duration: '0:18',
  },
  {
    id: 'reel-3',
    videoUrl: '/reels/reel-3.mp4',
    posterUrl: '/reels/reel-3-poster.jpg',
    title: 'Production & Set Lumineux',
    category: 'Benda Media',
    tag: 'Reel Viral',
    duration: '0:17',
  },
  {
    id: 'reel-4',
    videoUrl: '/reels/reel-4.mp4',
    posterUrl: '/reels/reel-4-poster.jpg',
    title: 'Projet Vidéo & Décor',
    category: 'XDV Nature',
    tag: 'Commercial',
    duration: '0:14',
  },
  {
    id: 'reel-5',
    videoUrl: '/reels/reel-5.mp4',
    posterUrl: '/reels/reel-5-poster.jpg',
    title: 'Podcast Talk & Interview',
    category: 'Émission Invité',
    tag: 'Setup Shure',
    duration: '0:18',
  },
  {
    id: 'reel-6',
    videoUrl: '/reels/reel-6.mp4',
    posterUrl: '/reels/reel-6-poster.jpg',
    title: 'Interview Portrait & Éclairage',
    category: 'Créateur de Contenu',
    tag: 'Interview 4K',
    duration: '0:24',
  },
];

interface ClientReelsSectionProps {
  onStartBooking?: () => void;
}

export const ClientReelsSection: React.FC<ClientReelsSectionProps> = ({ onStartBooking }) => {
  const [activeUnmutedId, setActiveUnmutedId] = useState<string | null>(null);
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({});
  const [modalReel, setModalReel] = useState<ClientReelItem | null>(null);
  const [modalMuted, setModalMuted] = useState(false);

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

  // Scroll controls for mobile/tablet horizontal row
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenModal = (reel: ClientReelItem) => {
    if (activeUnmutedId) {
      const vid = videoRefs.current[activeUnmutedId];
      if (vid) vid.muted = true;
      setActiveUnmutedId(null);
    }
    setModalMuted(false);
    setModalReel(reel);
  };

  const handleCloseModal = () => {
    setModalReel(null);
  };

  return (
    <section id="reels" className="py-16 sm:py-24 bg-studio-bg text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient background glow matching podcasty vibe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-orange-600/10 via-rose-600/10 to-pink-600/10 rounded-full blur-[160px] pointer-events-none" />

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
            REELS GALLERY / CAROUSEL - 6 SLEEK VERTICAL CARDS (9:16)
           ========================================================================= */}
        <ScrollReveal animation="fade-up">
          <div className="relative group/carousel">
            {/* Scroll navigation arrows for touch/scroll screens */}
            <button
              type="button"
              onClick={() => scroll('left')}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-30 hover:scale-110 hover:border-studio-red hover:bg-zinc-800 cursor-pointer"
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-30 hover:scale-110 hover:border-studio-red hover:bg-zinc-800 cursor-pointer"
              aria-label="Défiler vers la droite"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Container: Horizontal smooth snap scroll on mobile, sleek 6-card grid on desktop */}
            <div
              ref={containerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-4 no-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CLIENT_REELS.map((reel) => {
                const isMuted = activeUnmutedId !== reel.id;
                const isPaused = !!pausedMap[reel.id];

                return (
                  <div
                    key={reel.id}
                    className="flex-shrink-0 w-[68vw] max-w-[260px] sm:w-[45vw] md:w-[30vw] lg:w-auto snap-center group relative cursor-pointer"
                    onClick={() => handleTogglePlay(reel.id)}
                  >
                    {/* Card container with exact rounded-3xl and border */}
                    <div className="relative aspect-[9/16] rounded-[24px] sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-2xl transition-all duration-300 group-hover:border-zinc-600 group-hover:shadow-studio-red/10 group-hover:shadow-2xl">
                      {/* Active playing video */}
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

                      {/* Top floating sound & fullscreen controls */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-auto">
                        <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white/90 border border-white/10 uppercase tracking-wider">
                          TRA Studio
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Sound Toggle Button */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleMute(reel.id, e)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 border cursor-pointer ${
                              !isMuted
                                ? 'bg-studio-red text-white border-studio-red shadow-lg shadow-studio-red/40 scale-105'
                                : 'bg-black/60 text-white/80 border-white/15 hover:bg-black/80 hover:text-white'
                            }`}
                            title={isMuted ? 'Activer le son' : 'Couper le son'}
                          >
                            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                          </button>

                          {/* Fullscreen Expand Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(reel);
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md text-white/80 border border-white/15 hover:bg-black/80 hover:text-white transition-all duration-200 cursor-pointer"
                            title="Agrandir la vidéo"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Pause Indicator overlay (when paused) */}
                      {isPaused && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-15">
                          <div className="w-12 h-12 rounded-full bg-studio-red/90 text-white flex items-center justify-center shadow-xl shadow-studio-red/30 pl-0.5 animate-in zoom-in-75 duration-200">
                            <Play className="w-6 h-6 fill-white" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Gradient Overlay & Video Info */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3 px-3 z-15 flex flex-col justify-end text-left pointer-events-none">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
                          <span className="text-[10px] font-semibold text-studio-red uppercase tracking-wider">
                            {reel.tag}
                          </span>
                        </div>

                        <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">
                          {reel.title}
                        </h3>

                        <p className="text-[11px] text-zinc-400 font-medium line-clamp-1">
                          {reel.category}
                        </p>
                      </div>

                      {/* Subtle Glow Ring on hover */}
                      <div className="absolute inset-0 rounded-[24px] sm:rounded-3xl border-2 border-transparent group-hover:border-studio-red/40 transition-colors pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile swipe hint */}
            <div className="flex items-center justify-center gap-2 mt-4 lg:hidden text-zinc-500 text-xs">
              <Film className="w-3.5 h-3.5" />
              <span>Glissez horizontalement pour voir tous les reels</span>
            </div>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            BOTTOM CALL TO ACTION
           ========================================================================= */}
        <ScrollReveal animation="fade-up">
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-studio-red" />
                <h4 className="text-base font-bold text-white">
                  Envie de tourner vos propres Reels ou Vidéos ?
                </h4>
              </div>
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
            className="relative w-full max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Video Player */}
            <video
              src={modalReel.videoUrl}
              poster={modalReel.posterUrl}
              autoPlay
              controls
              playsInline
              muted={modalMuted}
              className="w-full h-full object-cover"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-studio-red hover:border-studio-red transition-all cursor-pointer z-30"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Info Pill */}
            <div className="absolute top-4 left-4 z-30 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                {modalReel.title}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
