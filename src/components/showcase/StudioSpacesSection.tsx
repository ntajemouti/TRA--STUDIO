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
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#0A0A0A] text-zinc-100 overflow-hidden scroll-mt-20 border-b border-zinc-900 select-none"
    >
      {/* Subtle deep red ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-studio-red/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* FULL-WIDTH SCREEN CONTAINER (Edge to Edge / t3mer screen f 3ard) */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 max-w-[1920px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: REFINED EDITORIAL PRESENTATION (Clear, Minimalist & Meaningful)
             ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 text-left">
            
            {/* 1. Uppercase Eyebrow Label */}
            <ScrollReveal animation="fade-down" duration={600}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-bold tracking-[0.22em] text-zinc-300 uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
                <span>ESPACES DE TOURNAGE & PODCAST</span>
              </div>
            </ScrollReveal>

            {/* 2. Headline */}
            <ScrollReveal animation="fade-up" delay={80} duration={700}>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl font-black uppercase tracking-tight text-white leading-[1.02]">
                Un espace.{' '}
                <span className="block text-studio-red">
                  Mille possibilités.
                </span>
              </h2>
            </ScrollReveal>

            {/* 3. Meaningful, Clear Narrative */}
            <ScrollReveal animation="fade-up" delay={140} duration={700}>
              <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed font-normal">
                À Témara, <strong>TRA Studio</strong> met à votre disposition des décors et plateaux immersifs pensés pour vos podcasts, interviews d’experts et formats vidéo réseaux sociaux. Un cadre insonorisé et prêt à tourner avec micros Shure broadcast, caméras 4K et éclairages cinéma calibrés.
              </p>
            </ScrollReveal>

            {/* 4. Minimalist Technical Metrics */}
            <ScrollReveal animation="fade-up" delay={190} duration={650}>
              <div className="pt-3 pb-1 flex items-center gap-6 sm:gap-8 border-t border-zinc-900 text-xs text-left">
                <div>
                  <span className="block font-black text-white text-base sm:text-lg font-mono">4K</span>
                  <span className="text-zinc-500 text-[11px] uppercase tracking-wider">Multicam Broadcast</span>
                </div>
                <div className="w-px h-8 bg-zinc-800/80" />
                <div>
                  <span className="block font-black text-white text-base sm:text-lg font-mono">Shure</span>
                  <span className="text-zinc-500 text-[11px] uppercase tracking-wider">Micros SM7B</span>
                </div>
                <div className="w-px h-8 bg-zinc-800/80" />
                <div>
                  <span className="block font-black text-studio-red text-base sm:text-lg font-mono">SSD</span>
                  <span className="text-zinc-500 text-[11px] uppercase tracking-wider">Rushs Immédiats</span>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. CTAs */}
            <ScrollReveal animation="fade-up" delay={240} duration={600}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleScrollToCatalogue}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-studio-red/30 hover:shadow-studio-red/50 hover:scale-[1.02] active:scale-95 group cursor-pointer border border-studio-redHover/40"
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
              RIGHT COLUMN: FULL-WIDTH ASYMMETRICAL 3-PHOTO COMPOSITION
              - Using the 3 authentic user-provided photos
              - ZERO text overlay on photos
              - Top: 1 large landscape shot (monitor camera view)
              - Bottom: 2 photos side by side (podcast interview + vintage set decor)
             ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3.5 sm:space-y-4">
            
            {/* PHOTO 1: LARGE DOMINANT LANDSCAPE PHOTO (Top) — Camera view of podcast recording */}
            <ScrollReveal animation="fade-left" delay={100} duration={750}>
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-studio-red/50 shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/9] sm:aspect-[16/9] md:aspect-[16/8.5] w-full overflow-hidden">
                  <img
                    src="/images/studio-spaces/tra-podcast-camera-monitor.jpg"
                    alt="Tournage podcast en direct avec retour caméra Sony à TRA Studio Témara"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* PHOTOS 2 & 3: TWO PHOTOGRAPHS SIDE BY SIDE (Bottom Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              
              {/* PHOTO 2: BOTTOM LEFT — Wide angle of podcast session & softbox lighting */}
              <ScrollReveal animation="fade-up" delay={200} duration={750}>
                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-studio-red/50 shadow-xl transition-all duration-500">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/images/studio-spaces/tra-podcast-interview-session.jpg"
                      alt="Session d'enregistrement podcast avec micros Shure et éclairage boîte à lumière à TRA Studio"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* PHOTO 3: BOTTOM RIGHT — Vintage Moroccan set decor with carpet & warm lighting */}
              <ScrollReveal animation="fade-up" delay={260} duration={750}>
                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-studio-red/50 shadow-xl transition-all duration-500">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                    <img
                      src="/images/studio-spaces/tra-podcast-vintage-set.jpg"
                      alt="Décor salon vintage et ambiance chaleureuse pour interviews et talk-shows à TRA Studio"
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
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
