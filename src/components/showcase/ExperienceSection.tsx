import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface ChapterItem {
  id: string;
  title: string;
  description: string;
  specs: string[];
  image: string;
  imageAlt: string;
  imagePosition: string;
}

const CHAPTERS: ChapterItem[] = [
  {
    id: 'podcast',
    title: "L'espace acoustique où chaque voix trouve sa pureté.",
    description:
      "Conçu spécifiquement pour l'enregistrement de podcasts, talk-shows et interviews haut de gamme, notre plateau insonorisé neutralise toute réverbération parasite. Équipé de microphones broadcast de référence et baigné d'une lumière chaude et feutrée, chaque échange se déroule dans une atmosphère intimiste et propice à la spontanéité.",
    specs: ['Traitement acoustique feutré', 'Micros broadcast Shure SM7B', 'Ambiance lumineuse chaleureuse'],
    image: '/images/why-choose/chapter-1-podcast.jpg',
    imageAlt: 'Plateau podcast professionnel avec sofa émeraude et microphones studio à TRA Studio',
    imagePosition: 'object-center',
  },
  {
    id: 'filming',
    title: "Une scénographie visuelle pensée pour capter l'attention.",
    description:
      "Des formats courts percutants pour les réseaux sociaux aux capsules de marque et shootings éditoriaux, nos caméras 4K grand capteur et notre éclairage Godox modulable sculptent chaque plan avec une précision chirurgicale. Du cyclorama blanc épuré aux décors thématiques, votre identité visuelle s'exprime sans compromis.",
    specs: ['Captation multicaméra 4K', 'Projecteurs Godox à lumière modelée', 'Cyclorama & décors modulables'],
    image: '/images/why-choose/chapter-2-filming.jpg',
    imageAlt: 'Session de tournage audiovisuel et shooting avec éclairage Godox et caméra à TRA Studio',
    imagePosition: 'object-[center_20%]',
  },
  {
    id: 'postprod',
    title: "Un accompagnement millimétré et des rushs prêts à l'emploi.",
    description:
      "De la régie de monitoring aux postes de montage dédiés, notre assistance technique veille en direct sur le calibrage sonore, l'étalonnage et le cadrage. À la fin de chaque séance, repartez sans attendre avec l'intégralité de vos fichiers haute résolution bruts ou montés, immédiatement exploitables pour vos diffusions.",
    specs: ['Monitoring son & image en direct', 'Livraison instantanée des rushs', 'Assistance technique continue'],
    image: '/images/why-choose/chapter-3-postprod.jpg',
    imageAlt: 'Poste de régie, monitoring et post-production avec vue sur plateau à TRA Studio',
    imagePosition: 'object-[center_42%]',
  },
];

export const ExperienceSection: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingManual = useRef<boolean>(false);

  // Mobile / Tablet touch swipe gesture tracking
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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
      // Swipe left -> Next
      setActiveChapter((prev) => (prev + 1) % CHAPTERS.length);
    } else if (deltaX < -45) {
      // Swipe right -> Prev
      setActiveChapter((prev) => (prev - 1 + CHAPTERS.length) % CHAPTERS.length);
    }
  };

  // Scroll-triggered chapter transitions on desktop using IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (window.innerWidth < 1024 || isScrollingManual.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-chapter-index'));
          if (!isNaN(idx)) {
            setActiveChapter(idx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0.15,
    });

    chapterRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectChapter = (index: number) => {
    setActiveChapter(index);
    isScrollingManual.current = true;
    const target = chapterRefs.current[index];
    if (target && window.innerWidth >= 1024) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      isScrollingManual.current = false;
    }, 700);
  };

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 lg:py-32 bg-studio-bg text-white relative overflow-x-clip border-t border-zinc-900/80"
    >
      {/* Subtle ambient lighting glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-studio-red/8 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-zinc-800/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16 lg:space-y-20">
        
        {/* =========================================================================
            SECTION HEADER: Clean & Editorial
           ========================================================================= */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight text-white leading-[1.05]">
              Pourquoi choisir <span className="text-studio-red">TRA Studio</span> ?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
              Trois piliers fondamentaux conçus pour offrir à vos créations une signature visuelle, acoustique et technique irréprochable.
            </p>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            DESKTOP COMPOSITION (lg+):
            - Pure cinematic image (no text, no numbers on top of the photo)
            - Smooth image-mask reveal transition
            - Clean aligned text column with the 3 big titles
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start relative">
          
          {/* Left Column: Sticky Cinematic Image Viewport (Pure Photo, No text overlays) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="relative aspect-[16/11] xl:aspect-[4/3] w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-2xl shadow-black/90 group">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <div
                    key={ch.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'opacity-100 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 scale-[1.05] pointer-events-none z-0'
                    }`}
                    style={{
                      clipPath: isActive
                        ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                        : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                      transition:
                        'clip-path 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out',
                    }}
                  >
                    <img
                      src={ch.image}
                      alt={ch.imageAlt}
                      className={`w-full h-full object-cover ${ch.imagePosition}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />

                    {/* Pure subtle vignette - NO text, NO numbers on photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                  </div>
                );
              })}
            </div>

            {/* Ambient reflection beneath the frame */}
            <div className="h-6 w-3/4 mx-auto bg-gradient-to-r from-transparent via-studio-red/20 to-transparent blur-xl pointer-events-none -mt-3" />
          </div>

          {/* Right Column: Text Area with the 3 Big Titles Only */}
          <div className="lg:col-span-5 space-y-4 pt-2">
            
            {/* Minimalist Progress Bar (Slim Lines Only, No Numbers) */}
            <div className="sticky top-28 z-30 pb-5 mb-2 border-b border-zinc-800/80 bg-studio-bg/95 backdrop-blur-md flex items-center gap-3">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(idx)}
                  className="flex-1 py-2 cursor-pointer transition-all group"
                  aria-label={`Volet ${idx + 1}`}
                >
                  <div className="h-[3px] w-full bg-zinc-800 rounded-full overflow-hidden transition-colors group-hover:bg-zinc-700">
                    <div
                      className="h-full bg-studio-red transition-all duration-500 ease-out"
                      style={{
                        width: activeChapter === idx ? '100%' : activeChapter > idx ? '100%' : '0%',
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* 3 Vertically Arranged Chapters (Big Titles Dominant) */}
            <div className="divide-y divide-zinc-900/60">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <div
                    key={ch.id}
                    data-chapter-index={idx}
                    ref={(el) => {
                      chapterRefs.current[idx] = el;
                    }}
                    onClick={() => handleSelectChapter(idx)}
                    className={`py-10 xl:py-14 transition-all duration-500 cursor-pointer select-none ${
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-40 hover:opacity-75 translate-x-1'
                    }`}
                  >
                    {/* Big Title ONLY (Clean, bold, impactful) */}
                    <h3
                      className={`text-2xl xl:text-3xl font-display font-black uppercase tracking-tight leading-tight mb-4 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    >
                      {ch.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-300 font-light text-sm xl:text-base leading-relaxed mb-6">
                      {ch.description}
                    </p>

                    {/* Discreet Bullet Points */}
                    <div className="space-y-2 pt-1 border-t border-zinc-900/80">
                      {ch.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-studio-red flex-shrink-0" />
                          <span className="font-normal tracking-wide">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET VERSION (< lg):
            - Single cinematic photo container with the EXACT SAME image-mask reveal!
            - Touch swipe support on photo (swipe left/right)
            - Clean minimalist dash progress lines
            - 3 Big Titles below (tap to switch photo and expand details)
            - Pure photo with NO numbers, NO text overlay!
           ========================================================================= */}
        <div className="lg:hidden space-y-6 pt-2">
          
          {/* 1. Single Cinematic Photo Viewport with Mask Reveal Transition */}
          <div
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-2xl shadow-black/90 select-none cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapter === idx;
              return (
                <div
                  key={ch.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? 'opacity-100 scale-100 pointer-events-auto z-10'
                      : 'opacity-0 scale-[1.05] pointer-events-none z-0'
                  }`}
                  style={{
                    clipPath: isActive
                      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                      : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                    transition:
                      'clip-path 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out',
                  }}
                >
                  <img
                    src={ch.image}
                    alt={ch.imageAlt}
                    className={`w-full h-full object-cover ${ch.imagePosition}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Pure subtle vignette - NO text, NO numbers on photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* 2. Minimalist Progress Lines (Tap to switch) */}
          <div className="flex items-center gap-2.5 px-1">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChapter(idx)}
                className="flex-1 py-2 cursor-pointer transition-all"
                aria-label={`Volet ${idx + 1}`}
              >
                <div className="h-[3px] w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-studio-red transition-all duration-500 ease-out"
                    style={{ width: activeChapter === idx ? '100%' : '0%' }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* 3. The 3 Big Titles (Tap any title to trigger mask transition) */}
          <div className="space-y-3">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapter === idx;
              return (
                <div
                  key={ch.id}
                  onClick={() => setActiveChapter(idx)}
                  className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-zinc-900/80 border-zinc-700/80 shadow-xl'
                      : 'bg-zinc-900/25 border-zinc-900/60 hover:border-zinc-800 opacity-60 hover:opacity-90'
                  }`}
                >
                  {/* Big Title ONLY */}
                  <h3
                    className={`text-xl sm:text-2xl font-display font-black uppercase tracking-tight leading-snug transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {ch.title}
                  </h3>

                  {/* Expanded description & specs for active title */}
                  {isActive && (
                    <div className="space-y-3 pt-3 mt-2 border-t border-zinc-800/80 animate-in fade-in duration-300">
                      <p className="text-zinc-300 font-light text-xs sm:text-sm leading-relaxed">
                        {ch.description}
                      </p>
                      <div className="space-y-1.5 pt-1">
                        {ch.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-studio-red flex-shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL FOOTER NOTE: Discreet and premium
           ========================================================================= */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="pt-8 sm:pt-12 border-t border-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Envie de visiter le studio à Témara avant votre premier tournage ?
            </p>
            <button
              type="button"
              onClick={() => {
                const contactEl = document.getElementById('contact') || document.getElementById('location');
                contactEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-white/30 text-xs text-white font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-md"
            >
              <span>Voir l'adresse et planifier une visite</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-studio-red" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
