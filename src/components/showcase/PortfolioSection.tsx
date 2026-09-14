import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Film, 
  Clapperboard, 
  Layers, 
  Camera, 
  Calendar, 
  CheckCircle2,
  X
} from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

interface PortfolioSectionProps {
  onStartBooking: () => void;
  onRequestQuote: () => void;
}

interface PortfolioItem {
  id: string;
  category: 'podcast' | 'spot' | 'motion' | 'moto';
  categoryLabel: string;
  slotNumber: string;
  title: string;
  subtitle: string;
  badge: string;
  specs: string[];
}

const PORTFOLIO_SLOTS: PortfolioItem[] = [
  {
    id: 'slot-1',
    category: 'podcast',
    categoryLabel: 'Podcast & Talk-Show',
    slotNumber: '01',
    title: 'Session Podcast Multicam 4K',
    subtitle: 'Captation 3 caméras synchronisées, micros Shure SM7B et son broadcast.',
    badge: 'Plateau 1',
    specs: ['3 Angles 4K', 'Micros Shure', 'Régie Live'],
  },
  {
    id: 'slot-2',
    category: 'spot',
    categoryLabel: 'Spot & Publicité',
    slotNumber: '02',
    title: 'Spot Publicitaire & Campagne Marque',
    subtitle: 'Direction artistique, éclairages cinéma et étalonnage couleur soigné.',
    badge: 'Commercial',
    specs: ['Éclairage Cinéma', 'Cadreurs Dédiés', 'Rendu 4K Master'],
  },
  {
    id: 'slot-3',
    category: 'motion',
    categoryLabel: 'Motion Design & 3D',
    slotNumber: '03',
    title: 'Animation Graphique & Modélisation 3D',
    subtitle: 'Animations 2D/3D sur-mesure, habillage graphique et sound design dynamique.',
    badge: 'Motion Graphics',
    specs: ['Animation 2D/3D', 'Sound Design', 'Export Broadcast'],
  },
  {
    id: 'slot-4',
    category: 'moto',
    categoryLabel: 'Tournage Moto & Action',
    slotNumber: '04',
    title: 'Tournage Extérieur Dynamique & Action',
    subtitle: 'Prises de vue embarquées, stabilisation gimbal et équipe mobile tout terrain.',
    badge: 'Action & Véhicules',
    specs: ['Stabilisation Ronin', 'Haute Vitesse 120fps', 'Tournage Terrain'],
  },
  {
    id: 'slot-5',
    category: 'podcast',
    categoryLabel: 'Podcast & Talk-Show',
    slotNumber: '05',
    title: 'Formats Courts Réseaux Sociaux 9:16',
    subtitle: 'Création de Reels et TikToks verticaux à fort impact algorithmique.',
    badge: 'Contenu Vertical',
    specs: ['Format 9:16', 'Tubes Nanlite RGB', 'Montage Express'],
  },
  {
    id: 'slot-6',
    category: 'spot',
    categoryLabel: 'Spot & Publicité',
    slotNumber: '06',
    title: 'Shooting Photo & Packshot Cyclo Blanc',
    subtitle: 'Photos éditoriales et produits sur fond blanc infini avec flashs haute vitesse.',
    badge: 'Studio Cyclo',
    specs: ['Cyclo Infini', 'Flashs Studio', 'Retouche HD'],
  },
  {
    id: 'slot-7',
    category: 'motion',
    categoryLabel: 'Motion Design & 3D',
    slotNumber: '07',
    title: 'Générique & Identité Visuelle Animée',
    subtitle: 'Création d’intro vidéo, logos animés 3D et signatures de marque percutantes.',
    badge: 'Identité de Marque',
    specs: ['Intro 4K', 'Animation Typo', 'Sound FX'],
  },
  {
    id: 'slot-8',
    category: 'moto',
    categoryLabel: 'Tournage Moto & Action',
    slotNumber: '08',
    title: 'Teasers & Vidéos Promo Événementielles',
    subtitle: 'Clips promotionnels au rythme intense pour vos lancements et événements.',
    badge: 'Cinématique',
    specs: ['Montage Rythmé', 'Color Grading', 'Licences Musique'],
  },
];

const CATEGORIES = [
  { key: 'all', label: 'Tous les projets' },
  { key: 'podcast', label: 'Podcasts & Talk-Shows' },
  { key: 'spot', label: 'Spots & Publicités' },
  { key: 'motion', label: 'Motion Design & 3D' },
  { key: 'moto', label: 'Tournages Moto & Action' },
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onStartBooking,
  onRequestQuote,
}) => {
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeSlot, setActiveSlot] = useState<PortfolioItem | null>(null);

  const filteredSlots = useMemo(() => {
    if (selectedCat === 'all') return PORTFOLIO_SLOTS;
    return PORTFOLIO_SLOTS.filter((s) => s.category === selectedCat);
  }, [selectedCat]);

  return (
    <section id="portfolio" className="py-14 sm:py-20 bg-zinc-950 text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-studio-red/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* =========================================================================
            SECTION HEADER
           ========================================================================= */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold text-zinc-300 shadow-md">
              <Sparkles className="w-4 h-4 text-studio-red" />
              <span className="text-white font-black tracking-wider uppercase">PORTFOLIO & CRÉATIONS</span>
              <span className="text-zinc-600">•</span>
              <span className="text-studio-red">TRA STUDIO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Nos réalisations <span className="text-studio-red">& productions</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Découvrez nos catégories de projets : podcasts, tournages publicitaires, formats courts réseaux sociaux et animations 3D.
            </p>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            CATEGORY TABS
           ========================================================================= */}
        <ScrollReveal animation="fade-up" delay={80}>
          <div className="flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl max-w-full">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCat === cat.key;
                const count = cat.key === 'all' 
                  ? PORTFOLIO_SLOTS.length 
                  : PORTFOLIO_SLOTS.filter((s) => s.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCat(cat.key)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-studio-red text-white shadow-lg shadow-studio-red/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            PORTFOLIO GRID (Clean Minimalist Studio Placeholders)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredSlots.map((slot, idx) => (
            <ScrollReveal key={slot.id} animation="fade-up" delay={idx * 70}>
              <div
                onClick={() => setActiveSlot(slot)}
                className="group relative rounded-2xl bg-zinc-900/70 border border-zinc-800/90 hover:border-zinc-700 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 text-left h-full"
              >
                {/* Card Media Frame / Atmospheric Placeholder */}
                <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-5 flex flex-col justify-between border-b border-zinc-800/70 overflow-hidden">
                  {/* Subtle Studio Grid pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                  
                  {/* Red ambient corner glow on hover */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-studio-red/10 rounded-full blur-2xl group-hover:bg-studio-red/25 transition-colors"></div>

                  {/* Top badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 border border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      PROJET #{slot.slotNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-studio-red/20 text-studio-red border border-studio-red/30 text-[10px] font-black uppercase tracking-wider">
                      {slot.badge}
                    </span>
                  </div>

                  {/* Center Iconography */}
                  <div className="relative z-10 flex items-center justify-center my-3">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 group-hover:border-studio-red group-hover:bg-studio-red/10 flex items-center justify-center text-zinc-400 group-hover:text-studio-red transition-all duration-300 shadow-inner">
                      {slot.category === 'podcast' && <Camera className="w-6 h-6" />}
                      {slot.category === 'spot' && <Film className="w-6 h-6" />}
                      {slot.category === 'motion' && <Layers className="w-6 h-6" />}
                      {slot.category === 'moto' && <Clapperboard className="w-6 h-6" />}
                    </div>
                  </div>

                  {/* Bottom spec pill */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                    <span className="font-semibold text-zinc-300">{slot.categoryLabel}</span>
                    <span className="text-studio-red font-bold group-hover:translate-x-0.5 transition-transform">Détails →</span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 space-y-3 bg-zinc-900/40 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-studio-red transition-colors leading-snug">
                      {slot.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {slot.subtitle}
                    </p>
                  </div>

                  {/* Features Pills */}
                  <div className="pt-2 border-t border-zinc-800/70 flex flex-wrap gap-1.5">
                    {slot.specs.map((sp, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-zinc-800/70 text-[10px] font-medium text-zinc-400 border border-zinc-700/50"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Banner */}
        <ScrollReveal animation="fade-up" delay={120}>
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Prêt à concrétiser votre prochain projet vidéo ?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                Que ce soit pour un talk-show régulier, un spot publicitaire ou un shooting de marque, notre plateau et nos régisseurs sont à votre service.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onRequestQuote}
                className="h-11 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
              >
                Demander un devis sur-mesure
              </button>
              <button
                type="button"
                onClick={onStartBooking}
                className="h-11 px-6 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-studio-red/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Réserver une session</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Details Lightbox Modal */}
      {activeSlot && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveSlot(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-studio-red uppercase tracking-wider font-bold">
                  {activeSlot.categoryLabel}
                </span>
                <h3 className="text-xl font-black uppercase text-white">
                  {activeSlot.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSlot(null)}
                className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {activeSlot.subtitle}
            </p>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">
                Configuration technique prévue :
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {activeSlot.specs.map((sp, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-studio-red shrink-0" />
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveSlot(null);
                  onStartBooking();
                }}
                className="flex-1 h-11 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-studio-red/25 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Réserver ce type de session</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
