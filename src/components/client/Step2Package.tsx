import React, { useState } from 'react';
import { StudioPackage } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import {
  Check,
  Minus,
  Calendar,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface Step2PackageProps {
  packages: StudioPackage[];
  onSelectService: (serviceName: string) => void;
}

export const Step2Package: React.FC<Step2PackageProps> = ({
  packages,
  onSelectService,
}) => {
  // Only ONE service card is active/lit in red at a time; moves with mouse hover
  const [activeCardId, setActiveCardId] = useState<string>('srv-podcast-montage');

  return (
    <div className="w-full space-y-10 sm:space-y-14 animate-in fade-in duration-300 pb-10">
      
      {/* =========================================================================
          SECTION HEADER: "Choisissez votre prestation" + Elegant Descriptive Paragraph
         ========================================================================= */}
      <ScrollReveal animation="fade-down" duration={600}>
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-wide text-white uppercase drop-shadow-md">
            Choisissez votre prestation
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-xl mx-auto">
            Des formules transparentes et prêtes à tourner, conçues pour sublimer vos podcasts, interviews et créations vidéo dans un cadre professionnel insonorisé.
          </p>
        </div>
      </ScrollReveal>

      {/* =========================================================================
          PRICING CARDS: DYNAMIC HOVER RED GLOW (Only hovered card lights up in red)
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch text-left">
        {packages.map((pkg, idx) => {
          const isActive = activeCardId === pkg.id;

          return (
            <ScrollReveal
              key={pkg.id}
              animation="fade-up"
              delay={idx * 100}
              duration={650}
              className="h-full flex"
            >
              <div
                onMouseEnter={() => setActiveCardId(pkg.id)}
                onClick={() => setActiveCardId(pkg.id)}
                className={`relative w-full rounded-[24px] sm:rounded-3xl flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 border-2 border-[#8B0000] shadow-[0_0_35px_rgba(139,0,0,0.32)] -translate-y-1.5 scale-[1.015]'
                    : 'bg-zinc-950 border border-zinc-800/90 shadow-xl opacity-90 hover:opacity-100'
                }`}
              >
                {/* 1. Top Highlight Banner (Turns red ONLY when this card is active) */}
                {pkg.badge && (
                  <div
                    className={`w-full text-xs sm:text-sm font-extrabold uppercase tracking-wider py-2.5 px-4 flex items-center justify-center gap-1.5 transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#8B0000] text-white shadow-md'
                        : 'bg-zinc-900 text-zinc-400 border-b border-zinc-800'
                    }`}
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Meilleur Option</span>
                  </div>
                )}

                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-6">
                  {/* Top Block: Title, Subtitle, Price & Button */}
                  <div className="space-y-4">
                    
                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-zinc-200'
                      }`}>
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                        {pkg.subtitle}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1 pb-1">
                      <span className="text-4xl sm:text-[2.6rem] font-extrabold text-white tracking-tight leading-none">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        Dhs/ par heure
                      </span>
                    </div>

                    {/* Réservez Action Button (Red when card is active, dark when inactive) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(pkg.name);
                      }}
                      className={`w-full py-3.5 px-4 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer ${
                        isActive
                          ? 'bg-[#8B0000] hover:bg-[#A00000] text-white shadow-[#8B0000]/40'
                          : 'bg-[#1E232E] hover:bg-zinc-800 text-white border border-zinc-700/80 hover:border-zinc-600'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Réservez</span>
                    </button>

                    {/* Checklist 1: Studio & Equipment */}
                    <div className="space-y-2.5 pt-4">
                      {pkg.equipmentItems?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs leading-snug">
                          {item.included ? (
                            <span className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-[#EF4444] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Minus className="w-2.5 h-2.5 stroke-[3.5]" />
                            </span>
                          )}
                          <span className={item.included ? 'text-zinc-200 font-normal' : 'text-zinc-400 font-normal'}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Subheading: Ce que vous recevez après la session : */}
                    <div className="pt-3 pb-1 border-t border-zinc-800/80">
                      <p className="text-xs font-bold text-white tracking-wide">
                        Ce que vous recevez après la session :
                      </p>
                    </div>

                    {/* Checklist 2: Deliverables */}
                    <div className="space-y-2.5">
                      {pkg.deliverablesItems?.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs leading-snug">
                          {item.included ? (
                            <span className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-[#EF4444] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Minus className="w-2.5 h-2.5 stroke-[3.5]" />
                            </span>
                          )}
                          <span className={item.included ? 'text-zinc-200 font-normal' : 'text-zinc-400 font-normal'}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* =========================================================================
          SUR-MESURE QUOTE BANNER (Volume / Projets Spécifiques)
         ========================================================================= */}
      <ScrollReveal animation="fade-up" delay={150} duration={650} className="pt-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl text-left">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8B0000]">
              PROJET SPÉCIFIQUE OU VOLUME MENSUEL
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Vous avez un projet sur-mesure ou une série d'épisodes ?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pour les tournages longue durée, les séries récurrentes de podcasts, les formats vidéo spécifiques ou les productions corporate d'entreprise, nous établissons un devis personnalisé adapté à vos besoins.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectService('Projet Sur-Mesure / Demande de Devis')}
            className="shrink-0 px-6 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-[#8B0000]/50 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-4 h-4 text-[#8B0000]" />
          </button>
        </div>
      </ScrollReveal>

    </div>
  );
};
