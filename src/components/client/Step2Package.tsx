import React, { useState } from 'react';
import { StudioPackage } from '../../types';
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
  Flame,
  Layers,
  Zap,
  HelpCircle,
} from 'lucide-react';

interface Step2PackageProps {
  packages: StudioPackage[];
  selectedPackage: StudioPackage | null;
  onSelectPackage: (pkg: StudioPackage) => void;
  onRequestQuote: () => void;
  onContinue: () => void;
  onBack?: () => void;
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
  selectedPackage,
  onSelectPackage,
  onRequestQuote,
  onContinue,
  onBack,
}) => {
  // Service detail sub-page state
  const [activeDetail, setActiveDetail] = useState<StudioPackage | null>(null);

  // Interactive session duration estimator
  const [estimatedHours, setEstimatedHours] = useState<number>(2);

  const handleOpenDetail = (pkg: StudioPackage) => {
    onSelectPackage(pkg);
    setActiveDetail(pkg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setActiveDetail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // VIEW 2: SERVICE DETAIL & CONFIRMATION SUB-PAGE (When client clicks a service)
  // =========================================================================
  if (activeDetail) {
    return (
      <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 pb-12 text-left">
        {/* Navigation Back to Catalog */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackToCatalog}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à toutes les prestations</span>
          </button>
        </div>

        {/* Hero Card for the Selected Service */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Transparent Atmospheric Service Photo in Background */}
          {activeDetail.imageUrl && (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src={activeDetail.imageUrl}
                alt={activeDetail.name}
                className="w-full h-full object-cover object-center opacity-45 filter contrast-110 saturate-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-studio-card via-studio-card/75 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-studio-card via-studio-card/80 to-transparent"></div>
            </div>
          )}

          {/* Subtle ambient glow in background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-studio-red/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  {getServiceIcon(activeDetail.icon)}
                </div>
                {(activeDetail.badge || activeDetail.popular) && (
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-studio-red text-white shadow-md">
                    {activeDetail.badge || 'Populaire'}
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

            {/* Price badge */}
            <div className="bg-zinc-900/90 border border-zinc-800 p-4 sm:p-5 rounded-2xl text-left sm:text-right shrink-0">
              <div className="text-xs uppercase font-semibold text-zinc-500 tracking-wider">Tarif séance</div>
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="text-3xl sm:text-4xl font-black text-white">{activeDetail.price.toLocaleString('fr-FR')}</span>
                <span className="text-sm font-bold text-studio-red">DH</span>
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1 mt-1 sm:justify-end">
                <Clock className="w-3.5 h-3.5 text-studio-red" />
                <span>{activeDetail.duration} {activeDetail.duration > 1 ? 'heures' : 'heure'} en studio</span>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="pt-4 border-t border-studio-border/60 relative z-10 space-y-2">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">Présentation du service</h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
              {activeDetail.description}
            </p>
          </div>

          {/* Detailed Features List */}
          {activeDetail.features && activeDetail.features.length > 0 && (
            <div className="pt-4 border-t border-studio-border/60 relative z-10 space-y-3">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">
                Ce qui est inclus dans votre séance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeDetail.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-3 bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-xl"
                  >
                    <Check className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-zinc-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Pledge Banner */}
          <div className="pt-4 border-t border-studio-border/40 relative z-10 flex items-center gap-2.5 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-studio-red shrink-0" />
            <span>Studio insonorisé, matériel broadcast 4K et accompagnement direct par l’équipe TRA Studio.</span>
          </div>
        </div>

        {/* Floating Confirm / Continue button */}
        <div className="pt-2 sticky bottom-4 z-20">
          <button
            type="button"
            onClick={onContinue}
            className="w-full h-14 rounded-2xl font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 active:scale-[0.99] transition-all duration-200 shadow-2xl shadow-white/10 cursor-pointer"
          >
            <span>Réserver ce créneau pour {activeDetail.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: COMPLETE CATALOG WITH DISTINCTIVE TRA STUDIO FORMULAS
  // =========================================================================
  return (
    <div className="w-full space-y-8 sm:space-y-10 animate-in fade-in duration-300 pb-10">
      {/* Ticker Banner */}
      <div className="w-full overflow-hidden py-2 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl backdrop-blur-md shadow-inner">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[11px] font-extrabold uppercase tracking-widest text-zinc-400">
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Studio Broadcast Multicam 4K</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Prise de Son Shure SM7B</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Éclairages Cinéma Profoto & Aputure</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Studio Cyclo Insonorisé Témara</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Formats Verticaux Reels & TikTok 9:16</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Direction Artistique & Étalonnage Pro</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Studio Broadcast Multicam 4K</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Prise de Son Shure SM7B</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Éclairages Cinéma Profoto & Aputure</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Studio Cyclo Insonorisé Témara</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Formats Verticaux Reels & TikTok 9:16</span>
          <span className="flex items-center gap-2"><span className="text-studio-red">●</span> Direction Artistique & Étalonnage Pro</span>
        </div>
      </div>

      {/* Main Formules Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-studio-red">
          Nos formules
        </span>
        
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
          Choisissez votre formule
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
          Plateaux équipés, matériel de qualité et régisseur dédié pour vous accompagner.
        </p>
      </div>

      {/* =========================================================================
          INTERACTIVE DURATION ESTIMATOR (Exclusive TRA Studio Feature)
         ========================================================================= */}
      <div className="max-w-2xl mx-auto bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="text-left space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
            <Clock className="w-4 h-4 text-studio-red" />
            <span>Estimez votre temps de tournage</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            Sélectionnez la durée typique de votre session :
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          {[1, 2, 3].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setEstimatedHours(h)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                estimatedHours === h
                  ? 'bg-studio-red text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {h}h {h === 2 && '★'}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3 DISTINCTIVE FEATURED PRICING CARDS
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 text-left">
        {/* CARD 1: TRA SIGNATURE — PODCAST BROADCAST CLÉ-EN-MAIN (1500 DH) */}
        <div className="relative rounded-3xl bg-zinc-900/80 border-2 border-studio-red p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl shadow-studio-red/20 transform lg:-translate-y-2">
          {/* Top Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-studio-red text-white text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            <span>Formule Recommandée</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Podcast & Montage Complet
              </h3>
              <p className="text-xs text-zinc-300 font-semibold">
                Tournage 4K + Montage prêt à diffuser
              </p>
              <p className="text-[11px] text-zinc-400 pt-1">
                Tournez en toute sérénité, notre équipe s'occupe de la captation et du montage complet de votre épisode.
              </p>
            </div>

            {/* Price block */}
            <div className="pt-2 pb-1 border-b border-zinc-800">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white">1 500</span>
                <span className="text-base font-bold text-studio-red">Dhs</span>
                <span className="text-xs text-zinc-400 font-medium">/ par heure</span>
              </div>
              {estimatedHours > 1 && (
                <div className="text-[11px] text-zinc-400 pt-1">
                  Total estimé pour {estimatedHours}h : <span className="text-white font-bold">{(1500 * estimatedHours).toLocaleString('fr-FR')} Dhs</span>
                </div>
              )}
            </div>

            {/* Reserve CTA */}
            <button
              type="button"
              onClick={() => {
                const target = packages.find((p) => p.id === 'srv-podcast') || packages[0];
                onSelectPackage({ ...target, name: 'TRA Signature — Podcast Broadcast', price: 1500 });
                onContinue();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-studio-red/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Clock className="w-4 h-4" />
              <span>Réserver cette formule</span>
            </button>

            {/* Features list */}
            <div className="space-y-2.5 text-xs text-zinc-300 pt-2">
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Plateau insonorisé acoustique traitée au choix.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>3 Caméras 4K cinéma synchronisées en régie live.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Micros Shure SM7B broadcast & console dédiée.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Régisseur opérateur audio/vidéo présent toute la session.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Monteur vidéo dédié sur place pour rythmer votre épisode.</span>
              </p>
              
              <div className="pt-2 font-bold text-white text-xs border-t border-zinc-800">
                Livrables inclus post-séance :
              </div>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Fichiers bruts audio et vidéo complets (SSD / Cloud).</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Montage multicam, étalonnage cinéma & mastering vocal.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Suppression des hésitations et bafouillages.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1 Tour de révision inclus pour vos retouches.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sauvegarde sécurisée des masters pendant 7 jours.</span>
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2: TOURNAGE SEUL (1000 DH) */}
        <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl hover:border-zinc-700 transition-all">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Tournage Seul
              </h3>
              <p className="text-xs text-zinc-300 font-semibold">
                Captation 4K & Rushs Bruts
              </p>
              <p className="text-[11px] text-zinc-400 pt-1">
                Idéal si vous avez votre propre équipe de montage et souhaitez uniquement la captation en studio.
              </p>
            </div>

            {/* Price block */}
            <div className="pt-2 pb-1 border-b border-zinc-800">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white">1 000</span>
                <span className="text-base font-bold text-studio-red">Dhs</span>
                <span className="text-xs text-zinc-400 font-medium">/ par heure</span>
              </div>
              {estimatedHours > 1 && (
                <div className="text-[11px] text-zinc-400 pt-1">
                  Total estimé pour {estimatedHours}h : <span className="text-white font-bold">{(1000 * estimatedHours).toLocaleString('fr-FR')} Dhs</span>
                </div>
              )}
            </div>

            {/* Reserve CTA */}
            <button
              type="button"
              onClick={() => {
                const target = packages.find((p) => p.id === 'srv-podcast') || packages[0];
                onSelectPackage({ ...target, price: 1000, name: 'Tournage Seul 4K' });
                onContinue();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-studio-red" />
              <span>Réserver cette formule</span>
            </button>

            {/* Features list */}
            <div className="space-y-2.5 text-xs text-zinc-300 pt-2">
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Plateau studio insonorisé entièrement équipé.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>3 Caméras 4K et 2 micros Shure SM7B broadcast.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Régisseur opérateur de plateau pour la captation.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Table de mixage et enregistrement multipiste.</span>
              </p>
              <p className="flex items-start gap-2 text-zinc-500">
                <span className="w-4 h-4 flex items-center justify-center text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>Sans monteur vidéo dédié sur place.</span>
              </p>
              
              <div className="pt-2 font-bold text-white text-xs border-t border-zinc-800">
                Livrables inclus post-séance :
              </div>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Fichiers bruts audio et vidéo remis en fin de tournage.</span>
              </p>
              <p className="flex items-start gap-2 text-zinc-500">
                <span className="w-4 h-4 flex items-center justify-center text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>Sans montage vidéo ni étalonnage.</span>
              </p>
              <p className="flex items-start gap-2 text-zinc-500">
                <span className="w-4 h-4 flex items-center justify-center text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>Sans tour de révision.</span>
              </p>
              <p className="flex items-start gap-2 text-zinc-500">
                <span className="w-4 h-4 flex items-center justify-center text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>Sans suppression des parties indésirables.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sauvegarde des fichiers bruts pendant 7 jours.</span>
              </p>
            </div>
          </div>
        </div>

        {/* CARD 3: FORMATS COURTS 9:16 (1900 DH) */}
        <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl hover:border-zinc-700 transition-all">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Formats Courts 9:16
              </h3>
              <p className="text-xs text-zinc-300 font-semibold">
                Pack Reels, TikTok & Shorts
              </p>
              <p className="text-[11px] text-zinc-400 pt-1">
                Enregistrement vertical dynamique avec éclairage adapté et montage court rythmé pour les réseaux.
              </p>
            </div>

            {/* Price block */}
            <div className="pt-2 pb-1 border-b border-zinc-800">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white">1 900</span>
                <span className="text-base font-bold text-studio-red">Dhs</span>
                <span className="text-xs text-zinc-400 font-medium">/ par heure</span>
              </div>
              {estimatedHours > 1 && (
                <div className="text-[11px] text-zinc-400 pt-1">
                  Total estimé pour {estimatedHours}h : <span className="text-white font-bold">{(1900 * estimatedHours).toLocaleString('fr-FR')} Dhs</span>
                </div>
              )}
            </div>

            {/* Reserve CTA */}
            <button
              type="button"
              onClick={() => {
                const target = packages.find((p) => p.id === 'srv-social-media') || packages[0];
                onSelectPackage({ ...target, price: 1900, name: 'Pack Reels & TikTok 9:16' });
                onContinue();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-studio-red" />
              <span>Réserver cette formule</span>
            </button>

            {/* Features list */}
            <div className="space-y-2.5 text-xs text-zinc-300 pt-2">
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Plateau studio au choix entièrement équipé.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Cadreur dédié spécialisé en dynamisme vertical 9:16.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Éclairages LED et tubes RGB dynamiques Nanlite.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Prise de son cravate sans fil haute fidélité.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Monteur vidéo expert en rétention d'attention.</span>
              </p>
              
              <div className="pt-2 font-bold text-white text-xs border-t border-zinc-800">
                Livrables inclus post-séance :
              </div>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Fichiers bruts vidéo 4K et pistes audio séparées.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jusqu’à 10 Reels montés avec sous-titres animés captivants.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>1 Tour de révision inclus.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>2 Photos professionnelles retouchées incluses.</span>
              </p>
              <p className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sauvegarde des fichiers bruts pendant 7 jours.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          OTHER SERVICES CATALOG (Shooting, Branding, Clips, Corporate)
         ========================================================================= */}
      <div className="pt-8 space-y-4 text-left">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
            Autres prestations disponibles
          </h3>
          <span className="text-xs text-zinc-400 font-semibold hidden sm:inline">
            Cliquez pour voir les détails et équipements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages
            .filter(
              (p) =>
                p.active &&
                p.id !== 'srv-podcast' &&
                p.id !== 'srv-social-media'
            )
            .map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => handleOpenDetail(pkg)}
                  className={`group relative rounded-2xl bg-studio-card border transition-all duration-300 p-5 flex flex-col justify-between space-y-4 cursor-pointer hover:scale-[1.01] ${
                    isSelected
                      ? 'border-studio-red ring-1 ring-studio-red bg-zinc-900/90 shadow-xl'
                      : 'border-studio-border hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        {getServiceIcon(pkg.icon)}
                      </div>
                      {pkg.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-studio-red/20 text-studio-red border border-studio-red/30">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-studio-red transition-colors">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                        {pkg.subtitle}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-2xl font-black text-white">{pkg.price.toLocaleString('fr-FR')}</span>
                      <span className="text-xs font-bold text-studio-red">DH</span>
                      <span className="text-zinc-500 text-[11px] ml-1">/ {pkg.duration}h</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                    <span>Voir les équipements</span>
                    <ArrowRight className="w-3.5 h-3.5 text-studio-red group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Sur-Mesure Quote Modal Trigger */}
      <div className="pt-6">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl text-left">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-studio-red">
              PROJET SPÉCIFIQUE OU VOLUME MENSUEL
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Vous avez un projet sur-mesure ou une série d'épisodes ?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pour les tournages longue durée, les séries de podcasts récurrentes, les clips scénarisés ou les productions d'entreprise, nous établissons un devis personnalisé sous 24h.
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestQuote}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            <span>Demander un Devis Sur-Mesure</span>
            <ArrowRight className="w-4 h-4 text-studio-red" />
          </button>
        </div>
      </div>
    </div>
  );
};
