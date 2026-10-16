import React, { useState } from 'react';
import { StudioPackage } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import {
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Mic,
  Camera,
  Smartphone,
  Film,
  Briefcase,
  Clapperboard,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface Step2PackageProps {
  packages: StudioPackage[];
  onSelectService: (serviceName: string) => void;
}

const getServiceIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Mic':
      return <Mic className="w-5 h-5 text-studio-red" />;
    case 'Camera':
      return <Camera className="w-5 h-5 text-studio-red" />;
    case 'Smartphone':
      return <Smartphone className="w-5 h-5 text-studio-red" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-studio-red" />;
    case 'Film':
      return <Film className="w-5 h-5 text-studio-red" />;
    case 'Briefcase':
      return <Briefcase className="w-5 h-5 text-studio-red" />;
    default:
      return <Clapperboard className="w-5 h-5 text-studio-red" />;
  }
};

export const Step2Package: React.FC<Step2PackageProps> = ({
  packages,
  onSelectService,
}) => {
  const [activeDetail, setActiveDetail] = useState<StudioPackage | null>(null);

  const handleOpenDetail = (pkg: StudioPackage) => {
    setActiveDetail(pkg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setActiveDetail(null);
  };

  // =========================================================================
  // VIEW 2: SERVICE DETAIL & SPECIFICATIONS VIEW
  // =========================================================================
  if (activeDetail) {
    return (
      <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 pb-12 text-left">
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackToCatalog}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à toutes les formules</span>
          </button>
        </div>

        {/* Hero Card for the Selected Service */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle ambient photo background */}
          {activeDetail.imageUrl && (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src={activeDetail.imageUrl}
                alt={activeDetail.name}
                className="w-full h-full object-cover object-center opacity-30 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  {getServiceIcon(activeDetail.icon)}
                </div>
                {activeDetail.badge && (
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-studio-red text-white shadow-md">
                    {activeDetail.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
                {activeDetail.name}
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 font-medium max-w-xl">
                {activeDetail.subtitle}
              </p>
            </div>

            {/* Price block */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 rounded-2xl text-left sm:text-right shrink-0">
              <div className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">Tarif de base</div>
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="text-3xl sm:text-4xl font-black text-white">{activeDetail.price.toLocaleString('fr-FR')}</span>
                <span className="text-sm font-bold text-studio-red">DH</span>
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1 mt-1 sm:justify-end">
                <Clock className="w-3.5 h-3.5 text-studio-red" />
                <span>{activeDetail.duration} {activeDetail.duration > 1 ? 'heures' : 'heure'} de session</span>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="pt-4 border-t border-zinc-800/80 relative z-10 space-y-2">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">Présentation du service</h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
              {activeDetail.description}
            </p>
          </div>

          {/* Detailed Features List */}
          {activeDetail.features && activeDetail.features.length > 0 && (
            <div className="pt-4 border-t border-zinc-800/80 relative z-10 space-y-3">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">
                Ce qui est inclus dans votre prestation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeDetail.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-3 bg-zinc-900/70 border border-zinc-800 p-3 rounded-xl"
                  >
                    <Check className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Pledge Banner */}
          <div className="pt-4 border-t border-zinc-800/60 relative z-10 flex items-center gap-2.5 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-studio-red shrink-0" />
            <span>Plateau insonorisé, matériel broadcast 4K et accompagnement direct par l’équipe TRA Studio à Témara.</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2 sticky bottom-4 z-20">
          <button
            type="button"
            onClick={() => onSelectService(activeDetail.name)}
            className="w-full h-14 rounded-2xl font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 bg-studio-red hover:bg-studio-redHover text-white active:scale-[0.99] transition-all duration-200 shadow-2xl shadow-studio-red/30 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Réserver cette prestation ({activeDetail.name})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: COMPLETE SERVICES CATALOG (6 OFFICIAL SERVICES)
  // =========================================================================
  return (
    <div className="w-full space-y-8 sm:space-y-12 animate-in fade-in duration-300 pb-10">
      
      {/* Ticker Banner */}
      <ScrollReveal animation="fade-in" duration={800}>
        <div className="w-full overflow-hidden py-2.5 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl backdrop-blur-md shadow-inner">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] font-extrabold uppercase tracking-widest text-zinc-400">
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Studio Broadcast Multicam 4K</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Prise de Son Shure SM7B</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Éclairages Cinéma Profoto & Aputure</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Plateau Cyclo Insonorisé Témara</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Formats Verticaux Reels & TikTok 9:16</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Direction Artistique & Étalonnage Pro</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Studio Broadcast Multicam 4K</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Prise de Son Shure SM7B</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Éclairages Cinéma Profoto & Aputure</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Plateau Cyclo Insonorisé Témara</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Formats Verticaux Reels & TikTok 9:16</span>
            <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Direction Artistique & Étalonnage Pro</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Section Header */}
      <ScrollReveal animation="fade-down" duration={600}>
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-red">
            Nos Prestations & Formules
          </span>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
            Choisissez votre prestation
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Des formules conçues pour répondre avec précision aux besoins des créateurs, entreprises et artistes.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid of 6 Complete Studio Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {packages.map((pkg, idx) => (
          <ScrollReveal
            key={pkg.id}
            animation="fade-up"
            delay={idx * 70}
            duration={650}
            className="h-full"
          >
            <div className="group relative rounded-3xl bg-zinc-950 border border-zinc-800/90 hover:border-studio-red/50 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-studio-red/15 h-full">
              
              <div className="space-y-4">
                {/* Header of Card */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    {getServiceIcon(pkg.icon)}
                  </div>
                  {pkg.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-studio-red/20 text-studio-red border border-studio-red/30">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-studio-red transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-300">
                    {pkg.subtitle}
                  </p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1 line-clamp-2">
                    {pkg.description}
                  </p>
                </div>

                {/* Price & Duration */}
                <div className="pt-2 pb-2 border-y border-zinc-800/80 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{pkg.price.toLocaleString('fr-FR')}</span>
                    <span className="text-xs font-bold text-studio-red">DH</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-studio-red" />
                    <span>{pkg.duration}h en studio</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 text-xs text-zinc-300 pt-1">
                  {pkg.features.slice(0, 4).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-studio-red shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Details & Booking */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => onSelectService(pkg.name)}
                  className="w-full py-3 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-studio-red/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Réserver cette prestation</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenDetail(pkg)}
                  className="w-full py-2 text-center text-[11px] font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Voir tous les équipements inclus</span>
                  <ArrowRight className="w-3 h-3 text-studio-red" />
                </button>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Sur-Mesure Quote Banner */}
      <ScrollReveal animation="fade-up" delay={100} duration={650} className="pt-4">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl text-left">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-studio-red">
              PROJET SPÉCIFIQUE OU VOLUME MENSUEL
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Vous avez un projet sur-mesure ou une série d'épisodes ?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pour les tournages longue durée, les séries récurrentes de podcasts, les clips scénarisés ou les productions corporate d'entreprise, nous établissons un accompagnement personnalisé.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectService('Projet Sur-Mesure')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <span>Demander un Devis Sur-Mesure</span>
            <ArrowRight className="w-4 h-4 text-studio-red" />
          </button>
        </div>
      </ScrollReveal>

    </div>
  );
};
