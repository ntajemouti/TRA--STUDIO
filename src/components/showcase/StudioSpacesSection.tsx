import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface StudioSpacesSectionProps {
  onExploreSpaces?: () => void;
  onExploreServices?: () => void;
}

export const StudioSpacesSection: React.FC<StudioSpacesSectionProps> = ({
  onExploreSpaces,
  onExploreServices,
}) => {
  const handleScrollToSpaces = () => {
    if (onExploreSpaces) {
      onExploreSpaces();
    } else {
      const el = document.getElementById('services') || document.getElementById('catalogue');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="univers"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#0A0A0A] text-zinc-100 overflow-hidden scroll-mt-20 border-b border-zinc-900 select-none"
    >
      {/* Subtle deep red ambient atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[580px] h-[360px] bg-studio-red/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: REFINED TEXT BLOCK (Editorial Minimalist Agency Style)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left">
            
            {/* 1. Small Uppercase Eyebrow Label */}
            <ScrollReveal animation="fade-down" duration={600}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-bold tracking-[0.25em] text-zinc-300 uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
                <span>ESPACES CRÉATIFS</span>
              </div>
            </ScrollReveal>

            {/* 2. Elegant and Eye-catching Headline */}
            <ScrollReveal animation="fade-up" delay={80} duration={700}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.02]">
                Un espace.{' '}
                <span className="block text-studio-red">
                  Mille possibilités.
                </span>
              </h2>
            </ScrollReveal>

            {/* 3. Short Narrative Paragraph */}
            <ScrollReveal animation="fade-up" delay={150} duration={700}>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-xl">
                Chez TRA Studio, chaque espace est pensé pour donner vie à vos idées. Podcasts, interviews, tournages et créations audiovisuelles : profitez d’un environnement professionnel conçu pour produire du contenu qui marque les esprits.
              </p>
            </ScrollReveal>

            {/* 4. Subtle Key Highlights / Badges */}
            <ScrollReveal animation="fade-up" delay={200} duration={650}>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-studio-red/20 border border-studio-red/40 flex items-center justify-center text-studio-red shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Acoustique broadcast traitée</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-studio-red/20 border border-studio-red/40 flex items-center justify-center text-studio-red shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Captation multicam 4K</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-studio-red/20 border border-studio-red/40 flex items-center justify-center text-studio-red shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Éclairages cinéma modulables</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-studio-red/20 border border-studio-red/40 flex items-center justify-center text-studio-red shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Prise de son Shure SM7B</span>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Subtle CTA Button: “Découvrir nos espaces” */}
            <ScrollReveal animation="fade-up" delay={250} duration={600}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleScrollToSpaces}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-studio-red/30 hover:shadow-studio-red/50 hover:scale-[1.02] active:scale-95 group cursor-pointer border border-studio-redHover/40"
                >
                  <span>Découvrir nos espaces</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {onExploreServices && (
                  <button
                    type="button"
                    onClick={onExploreServices}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer py-2 px-1"
                  >
                    <span>Consulter les tarifs</span>
                    <ArrowRight className="w-3 h-3 text-studio-red" />
                  </button>
                )}
              </div>
            </ScrollReveal>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: ASYMMETRICAL 3-PHOTO COMPOSITION
              - 1 Large Dominant Landscape Image (Top)
              - 2 Smaller Photographs Arranged Horizontally (Bottom)
             ========================================================================= */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            {/* PHOTO 1: LARGE DOMINANT LANDSCAPE IMAGE (Top) */}
            <ScrollReveal animation="fade-left" delay={100} duration={750}>
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/90 hover:border-studio-red/50 shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                  <img
                    src="/catalog-photos/tra-studio-desktop-modern-official-logo.jpg"
                    alt="Plateau principal TRA Studio avec logo néon et caméras 4K à Témara"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Editorial Tag Pill (Top Left) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-studio-red" />
                      <span>Plateau Central & Régie 4K</span>
                    </span>
                  </div>

                  {/* Caption & Location (Bottom Left) */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3 text-left">
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-studio-red">
                        Plateau Principal 01
                      </p>
                      <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                        Espace Podcast Broadcast & Talk-Show
                      </h3>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-md border border-white/5 shrink-0">
                      Témara Hub
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* PHOTOS 2 & 3: TWO SMALLER PHOTOGRAPHS ARRANGED HORIZONTALLY (Bottom) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* PHOTO 2: LEFT SMALL PHOTOGRAPH */}
              <ScrollReveal animation="fade-up" delay={250} duration={750}>
                <div className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/90 hover:border-studio-red/50 shadow-xl transition-all duration-500">
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/catalog-photos/tra-studio-desktop-angled.jpg"
                      alt="Régie de contrôle et micros Shure TRA Studio"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 uppercase">
                        Configuration 02
                      </span>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                      <p className="text-[10px] uppercase font-bold text-studio-red">
                        Audio Shure SM7B
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                        Régie & Prise de Son Directe
                      </h4>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* PHOTO 3: RIGHT SMALL PHOTOGRAPH */}
              <ScrollReveal animation="fade-up" delay={320} duration={750}>
                <div className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/90 hover:border-studio-red/50 shadow-xl transition-all duration-500">
                  <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/catalog-photos/tra-studio-desktop-frontal.jpg"
                      alt="Table de tournage multicam et éclairages cinéma TRA Studio"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 uppercase">
                        Configuration 03
                      </span>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
                      <p className="text-[10px] uppercase font-bold text-studio-red">
                        Plateau Face-à-Face
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                        Interviews & Table Ronde 4K
                      </h4>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
