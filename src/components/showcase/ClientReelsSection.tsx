import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play } from 'lucide-react';
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

const TOTAL_ORIGINAL = CLIENT_REELS.length; // 9
const SET_COUNT = 4; // 4 sets = 36 items for foolproof infinite buffer

interface DisplayReelItem extends ClientReelItem {
  virtualIndex: number;
  uniqueKey: string;
  originalIndex: number;
}

const DISPLAY_REELS: DisplayReelItem[] = Array.from({ length: SET_COUNT }).flatMap((_, setIdx) =>
  CLIENT_REELS.map((reel, rIdx) => ({
    ...reel,
    virtualIndex: setIdx * TOTAL_ORIGINAL + rIdx,
    uniqueKey: `set-${setIdx}-reel-${reel.id}`,
    originalIndex: rIdx,
  }))
);

export const ClientReelsSection: React.FC<ClientReelsSectionProps> = ({ onStartBooking }) => {
  // Start at Set 2 (middle set) so infinite navigation works smoothly in both directions
  const [currentIndex, setCurrentIndex] = useState<number>(TOTAL_ORIGINAL * 2);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeUnmutedId, setActiveUnmutedId] = useState<string | null>(null);
  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({});

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Responsive visible count: 1 on mobile, 3 on tablet, 6 on desktop
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Re-enable CSS transition after instantaneous position resets
  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  // Synchronize audio mute state across all video instances
  useEffect(() => {
    DISPLAY_REELS.forEach((item, idx) => {
      const vid = videoRefs.current[idx];
      if (vid) {
        vid.muted = activeUnmutedId !== item.id;
      }
    });
  }, [activeUnmutedId]);

  // Efficient playback: only play visible and near-visible videos to conserve resources
  useEffect(() => {
    DISPLAY_REELS.forEach((item, idx) => {
      const vid = videoRefs.current[idx];
      if (!vid) return;

      const isNear = idx >= currentIndex - 1 && idx <= currentIndex + visibleCount + 1;
      if (isNear) {
        if (!pausedMap[item.id] && vid.paused) {
          vid.play().catch(() => {});
        }
      } else {
        if (!vid.paused) {
          vid.pause();
        }
      }
    });
  }, [currentIndex, visibleCount, pausedMap]);

  // Auto-advance carousel every 6 seconds in an endless circular loop (KOUL 6 SECONDS)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Seamless snap when crossing boundary: imperceptibly normalizes index without rewind
  const handleTransitionEnd = (e?: React.TransitionEvent<HTMLDivElement>) => {
    if (e && e.target !== e.currentTarget) return;

    // If we advanced past Set 2 into Set 3 (index >= 27)
    if (currentIndex >= TOTAL_ORIGINAL * 3) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - TOTAL_ORIGINAL);
    }
    // If we moved back into Set 0 (index < 9)
    else if (currentIndex < TOTAL_ORIGINAL) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + TOTAL_ORIGINAL);
    }
  };

  // Active original index for pagination indicators (0 to 8)
  const activeOriginalIndex = ((currentIndex % TOTAL_ORIGINAL) + TOTAL_ORIGINAL) % TOTAL_ORIGINAL;

  // Shortest circular path when clicking a pagination dot
  const handleDotClick = (targetOriginalIdx: number) => {
    let diff = targetOriginalIdx - activeOriginalIndex;
    if (diff > TOTAL_ORIGINAL / 2) {
      diff -= TOTAL_ORIGINAL;
    } else if (diff < -TOTAL_ORIGINAL / 2) {
      diff += TOTAL_ORIGINAL;
    }
    if (diff === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + diff);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 45) {
      handleNext();
    } else if (deltaX < -45) {
      handlePrev();
    }
  };

  // Toggle Mute on a specific reel
  const handleToggleMute = (reelId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeUnmutedId === reelId) {
      setActiveUnmutedId(null);
    } else {
      setActiveUnmutedId(reelId);
    }
  };

  // Toggle Play / Pause on a specific reel
  const handleTogglePlay = (reelId: string, idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRefs.current[idx];
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setPausedMap((prev) => ({ ...prev, [reelId]: false }));
    } else {
      video.pause();
      setPausedMap((prev) => ({ ...prev, [reelId]: true }));
    }
  };

  return (
    <section id="reels" className="py-16 sm:py-24 bg-studio-bg text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-studio-red/10 via-studio-red/15 to-studio-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full space-y-8 sm:space-y-10 relative z-10">
        
        {/* =========================================================================
            HEADER: Title & Paragraph ONLY
           ========================================================================= */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto px-4 space-y-3">
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
            INFINITE CIRCULAR REELS CAROUSEL:
            - Desktop: 6 reels visible at once spanning wide from corner to corner ("chadin mn 9nt")
            - Mobile: Exactly 1 reel visible at a time
            - Continuous infinite circle like Podcasty without rewind ("boucle infinie / da2ira")
            - Auto-scrolls every 10 seconds smoothly
           ========================================================================= */}
        <ScrollReveal animation="fade-up">
          <div
            className="relative group/carousel w-full px-2 sm:px-4 lg:px-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Carousel Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="hidden md:flex absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/95 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 z-30 hover:scale-110 hover:border-[#8B0000] hover:bg-zinc-800 cursor-pointer"
              aria-label="Reel précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="hidden md:flex absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/95 border border-zinc-700/80 text-white items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-200 z-30 hover:scale-110 hover:border-[#8B0000] hover:bg-zinc-800 cursor-pointer"
              aria-label="Reel suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Overflow viewport container */}
            <div
              className="overflow-hidden w-full py-4 select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Continuous Sliding Infinite Track */}
              <div
                className="flex items-center"
                style={{
                  width: `${(DISPLAY_REELS.length * 100) / visibleCount}%`,
                  transform: `translate3d(-${(currentIndex * 100) / DISPLAY_REELS.length}%, 0, 0)`,
                  transition: isTransitioning ? 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                  willChange: 'transform',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {DISPLAY_REELS.map((item, idx) => {
                  const isMuted = activeUnmutedId !== item.id;
                  const isPaused = !!pausedMap[item.id];
                  const isCurrentActive = idx === currentIndex;
                  const isNearViewport = idx >= currentIndex - 1 && idx <= currentIndex + visibleCount + 1;

                  return (
                    <div
                      key={item.uniqueKey}
                      style={{ width: `${100 / DISPLAY_REELS.length}%` }}
                      className="flex-shrink-0 px-1 sm:px-1.5 md:px-2 flex justify-center"
                    >
                      {/* Compact vertical 9:16 reel card */}
                      <div
                        className={`reel-card-item relative aspect-[9/16] w-full max-w-[270px] sm:max-w-none rounded-2xl sm:rounded-[22px] overflow-hidden bg-zinc-950 border shadow-xl transition-all duration-300 group cursor-pointer ${
                          isCurrentActive && visibleCount === 1
                            ? 'border-[#8B0000] shadow-[#8B0000]/30'
                            : 'border-zinc-800/90 group-hover:border-zinc-600'
                        }`}
                        onClick={(e) => handleTogglePlay(item.id, idx, e)}
                      >
                        {/* Video Player */}
                        <video
                          ref={(el) => {
                            videoRefs.current[idx] = el;
                          }}
                          src={item.videoUrl}
                          poster={item.posterUrl}
                          autoPlay
                          muted={isMuted}
                          loop
                          playsInline
                          preload={isNearViewport ? 'auto' : 'metadata'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                        />

                        {/* Top Action Control: Sound Toggle ONLY */}
                        <div className="absolute top-3 right-3 z-20 pointer-events-auto">
                          <button
                            type="button"
                            onClick={(e) => handleToggleMute(item.id, e)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 border cursor-pointer ${
                              !isMuted
                                ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md shadow-[#8B0000]/40 scale-105'
                                : 'bg-black/60 text-white/90 border-white/20 hover:bg-black/80 hover:text-white'
                            }`}
                            title={isMuted ? 'Activer le son' : 'Couper le son'}
                          >
                            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Pause Indicator overlay */}
                        {isPaused && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-15">
                            <div className="w-12 h-12 rounded-full bg-[#8B0000]/95 text-white flex items-center justify-center shadow-xl shadow-[#8B0000]/50 pl-0.5 animate-in zoom-in-75 duration-200">
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
            </div>

            {/* Pagination / 6s auto-advancing progress pills (9 original reels) */}
            <div className="flex items-center justify-center gap-1.5 pt-3">
              {CLIENT_REELS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDotClick(i)}
                  aria-label={`Aller au reel ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeOriginalIndex === i
                      ? 'w-6 h-1.5 bg-[#8B0000] shadow-sm shadow-[#8B0000]/50'
                      : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>

            {/* Hint for mobile */}
            <div className="sm:hidden flex items-center justify-center gap-2 mt-2 text-zinc-500 text-[11px] font-medium">
              <span>Reel {activeOriginalIndex + 1} sur {TOTAL_ORIGINAL} • Boucle continue toutes les 6s</span>
            </div>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            BOTTOM CALL TO ACTION
           ========================================================================= */}
        <ScrollReveal animation="fade-up">
          <div className="pt-2 px-4 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

