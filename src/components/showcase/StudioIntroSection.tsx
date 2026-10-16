import React from 'react';
import { ScrollReveal } from '../ui/ScrollReveal';
import {
  Sparkles,
  ArrowRight,
  Mic,
  Camera,
  Layers,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface StudioIntroSectionProps {
  onExplorePortfolio: () => void;
  onExploreServices: () => void;
}

export const StudioIntroSection: React.FC<StudioIntroSectionProps> = ({
  onExplorePortfolio,
  onExploreServices,
}) => {
  return (
    <section
      id="univers"
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#0A0A0A] text-zinc-100 overflow-hidden scroll-mt-20 border-b border-zinc-900 select-none"
    >
      {/* Subtle deep ambient glow behind the section */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-studio-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* =========================================================================
            PART A & B & C: EDITORIAL LABEL, HEADLINE & INTRODUCTORY NARRATIVE
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Label + Headline */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            {/* A. Elegant introductory label */}
            <ScrollReveal animation="fade-down" duration={600}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-studio-red animate-pulse" />
                <span>L'UNIVERS TRA STUDIO</span>
              </div>
            </ScrollReveal>

            {/* B. Powerful headline */}
            <ScrollReveal animation="fade-up" delay={80} duration={700}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
                Nous donnons vie aux idées{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-red via-studio-redHover to-[#F5F5F5]">
                  qui méritent d'être vues.
                </span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Right Column: Meaningful French presentation paragraph + Action CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <ScrollReveal animation="fade-up" delay={140} duration={700}>
              <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed font-normal">
                Implanté à Témara, <strong>TRA Studio</strong> est un écrin de création audiovisuelle pensé pour les marques, créateurs et professionnels exigeants. De la captation de podcasts multicam broadcast à la photographie de mode, en passant par les formats verticaux pour réseaux sociaux, le motion design et les interviews d’entreprise, nous combinons précision technique et sensibilité artistique pour sublimer votre vision.
              </p>
            </ScrollReveal>

            {/* E. Clear call to action */}
            <ScrollReveal animation="fade-up" delay={180} duration={600}>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={onExplorePortfolio}
                  className="px-6 py-3.5 rounded-full bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-studio-red/30 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <span>Découvrir nos réalisations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExploreServices}
                  className="px-5 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>Consulter nos formules</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* =========================================================================
            PART D: ASYMMETRICAL EDITORIAL VISUAL ARRANGEMENT (Real TRA Studio Assets)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Main Large Visual: The Official TRA Studio Stage & Control Station */}
          <ScrollReveal animation="fade-right" delay={100} duration={750} className="lg:col-span-8 h-full">
            <div className="group relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full shadow-2xl flex flex-col justify-between p-6 sm:p-8">
              {/* Background Photo */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src="/catalog-photos/tra-studio-desktop-modern-official-logo.jpg"
                  alt="TRA Studio Plateau Régie & Logo Officiel Néon"
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
              </div>

              {/* Top Editorial Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-studio-red animate-ping" />
                  <span>PLATEAU CENTRAL & RÉGIE 4K</span>
                </span>

                <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md">
                  TÉMARA HUB
                </span>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="relative z-10 space-y-1.5 text-left max-w-xl">
                <span className="text-xs uppercase font-extrabold tracking-widest text-studio-red">
                  Excellence Broadcast
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight drop-shadow-md">
                  Le Setup Idéal Pour Vos Émissions & Podcasts
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Régie multicam synchronisée en direct, prise de son Shure SM7B haute fidélité et monitoring en régie pour des productions calibrées au millimètre.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: 2 Asymmetrical Supporting Studio Atmosphere Visuals */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 justify-between">
            
            {/* Supporting Visual 1: Salon Prestige Dark */}
            <ScrollReveal animation="fade-left" delay={150} duration={750} className="h-full">
              <div className="group relative rounded-3xl overflow-hidden border border-zinc-800/80 hover:border-studio-red/50 bg-zinc-950 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full w-full shadow-xl flex flex-col justify-end p-5 sm:p-6 min-h-[200px] transition-all duration-300">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src="/images/studios/studio-prestige-dark.jpg"
                    alt="Salon Prestige Dark & Gold TRA Studio"
                    className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-studio-red">
                    Décor 01 • Talk-Show
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                    Salon Club Prestige & Velours
                  </h4>
                  <p className="text-[11px] text-zinc-300 line-clamp-2">
                    Fauteuils velours grand confort et acoustique traitée pour grands entretiens.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Supporting Visual 2: Table Ronde Broadcast */}
            <ScrollReveal animation="fade-left" delay={200} duration={750} className="h-full">
              <div className="group relative rounded-3xl overflow-hidden border border-zinc-800/80 hover:border-studio-red/50 bg-zinc-950 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full w-full shadow-xl flex flex-col justify-end p-5 sm:p-6 min-h-[200px] transition-all duration-300">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src="/images/studios/studio-roundtable-broadcast.jpg"
                    alt="Table Ronde Débat TRA Studio"
                    className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 text-left space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-studio-red">
                    Décor 02 • Débat & Équipe
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                    La Table Ronde Multicam
                  </h4>
                  <p className="text-[11px] text-zinc-300 line-clamp-2">
                    Velours acoustique pourpre et disposition circulaire pour 3 à 4 intervenants.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* =========================================================================
            TECHNICAL PILLARS: 4 PILLARS OF TRA STUDIO EXCELLENCE
           ========================================================================= */}
        <ScrollReveal animation="fade-up" delay={150} duration={600}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2 text-left">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-studio-red">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                  Son Shure SM7B
                </h5>
                <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                  Micros de référence radio & console broadcast sans réverbération.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-studio-red">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                  Multicam 4K Cinéma
                </h5>
                <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                  Jusqu’à 3 angles synchronisés pour un découpage ultra dynamique.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-studio-red">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                  Régisseur Sur Place
                </h5>
                <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                  Un technicien dédié veille sur votre captation à chaque instant.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-studio-red">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                  Décors Modulables
                </h5>
                <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                  Prestige, minimaliste, rétro ou table ronde selon votre identité.
                </p>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
