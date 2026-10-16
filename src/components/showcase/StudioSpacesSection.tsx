import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface StudioSpacesSectionProps {
  onExploreSpaces?: () => void;
  onExploreServices?: () => void;
}

export const StudioSpacesSection: React.FC<StudioSpacesSectionProps> = ({
  onExploreSpaces,
  onExploreServices,
}) => {
  const handleScrollToCatalogue = () => {
    if (onExploreServices) {
      onExploreServices();
    } else {
      const el = document.getElementById('services') || document.getElementById('catalogue');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToReels = () => {
    const el = document.getElementById('realisations') || document.getElementById('reels');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="univers"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#0A0A0A] text-zinc-100 overflow-hidden scroll-mt-20 border-b border-zinc-900 select-none"
    >
      {/* Subtle deep red ambient glow behind the section */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[520px] h-[340px] bg-studio-red/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: REFINED EDITORIAL PRESENTATION (Clear, Minimalist & Meaningful)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* 1. Discreet Uppercase Label */}
            <ScrollReveal animation="fade-down" duration={600}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-bold tracking-[0.22em] text-zinc-300 uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
                <span>ESPACES DE TOURNAGE & PODCAST</span>
              </div>
            </ScrollReveal>

            {/* 2. Bold, Confident Headline */}
            <ScrollReveal animation="fade-up" delay={80} duration={700}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                Un espace.{' '}
                <span className="block text-studio-red">
                  Mille possibilités.
                </span>
              </h2>
            </ScrollReveal>

            {/* 3. Meaningful, Clear Narrative */}
            <ScrollReveal animation="fade-up" delay={140} duration={700}>
              <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed font-normal">
                À Témara, <strong>TRA Studio</strong> met à votre disposition un plateau insonorisé et équipé aux normes broadcast. De l’enregistrement de podcast multicam 4K aux interviews d’experts et formats réseaux sociaux, chaque détail acoustique, lumineux et scénographique est pré-calibré pour que vous puissiez simplement vous installer et enregistrer.
              </p>
            </ScrollReveal>

            {/* 4. Minimalist Studio Specifications (Clean, subtle & informative) */}
            <ScrollReveal animation="fade-up" delay={190} duration={650}>
              <div className="pt-3 pb-1 flex items-center gap-6 sm:gap-8 border-t border-zinc-900 text-xs text-left">
                <div>
                  <span className="block font-black text-white text-base sm:text-lg font-mono">4K</span>
                  <span className="text-zinc-500 text-[11px] uppercase tracking-wider">Multicam Cinéma</span>
                </div>
                <div className="w-px h-8 bg-zinc-800/80" />
                <div>
                  <span className="block font-black text-white text-base sm:text-lg font-mono">Shure</span>
                  <span className="text-zinc-500 text-[11px] uppercase tracking-wider">Micros SM7B Pro</span>
                </div>
                <div className="w-px h-8 bg-zinc-800/80" />
                <div>
                  <span className="block font-black text-studio-red text-base sm:text-lg font-mono">SSD</span>
                  <span className="text-zinc-500 text-[11px] uppercase tracking-wider">Rushs Immédiats</span>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Direct Action CTA: Découvrir nos formules */}
            <ScrollReveal animation="fade-up" delay={240} duration={600}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleScrollToCatalogue}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-studio-red/30 hover:shadow-studio-red/50 hover:scale-[1.02] active:scale-95 group cursor-pointer border border-studio-redHover/40"
                >
                  <span>Découvrir nos formules</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleScrollToReels}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer py-2 px-1"
                >
                  <span>Voir nos réalisations</span>
                  <ArrowRight className="w-3 h-3 text-studio-red" />
                </button>
              </div>
            </ScrollReveal>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: PURE ASYMMETRICAL 3-PHOTO COMPOSITION
              - 1 Large Landscape Image on Top (Pure authentic photo, zero text on it)
              - 2 Smaller Photos Underneath (Pure authentic photos, zero text on them)
              - Clean rounded borders, subtle hover zoom, no clutter
             ========================================================================= */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            
            {/* PHOTO 1: LARGE DOMINANT LANDSCAPE PHOTO (Top) — PURE PHOTO, NO TEXT */}
            <ScrollReveal animation="fade-left" delay={100} duration={750}>
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-studio-red/50 shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                  <img
                    src="/catalog-photos/tra-studio-desktop-modern-official-logo.jpg"
                    alt="Plateau principal TRA Studio avec logo néon et caméras 4K à Témara"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* PHOTOS 2 & 3: TWO SMALLER PHOTOGRAPHS (Bottom Grid) — PURE PHOTOS, NO TEXT */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              
              {/* PHOTO 2: BOTTOM LEFT (Microphones Shure & Table Setup) */}
              <ScrollReveal animation="fade-up" delay={220} duration={750}>
                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-studio-red/50 shadow-xl transition-all duration-500">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/catalog-photos/tra-studio-desktop-frontal.jpg"
                      alt="Plateau podcast TRA Studio table avec micros Shure SM7B et éclairage cinéma"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* PHOTO 3: BOTTOM RIGHT (Régie & Audio Monitoring) */}
              <ScrollReveal animation="fade-up" delay={280} duration={750}>
                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-studio-red/50 shadow-xl transition-all duration-500">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/catalog-photos/tra-studio-desktop-angled.jpg"
                      alt="Régie de contrôle et équipement son TRA Studio Témara"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
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
