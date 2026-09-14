import React, { useState, useMemo } from 'react';
import { 
  PORTFOLIO_PROJECTS, 
  PORTFOLIO_CATEGORIES, 
  PortfolioProject 
} from '../../data/portfolioData';
import { VideoPlayerModal } from './VideoPlayerModal';
import { 
  Play, 
  Film, 
  Sparkles, 
  FolderGit2, 
  ChevronDown, 
  Calendar, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface PortfolioSectionProps {
  onStartBooking: () => void;
  onRequestQuote: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onStartBooking,
  onRequestQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Filter projects by active tab
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const handleCategoryChange = (key: string) => {
    setSelectedCategory(key);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <section id="portfolio" className="py-14 sm:py-20 bg-zinc-950 text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-studio-red/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* =========================================================================
            SECTION HEADER
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold text-zinc-300 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-studio-red" />
            <span className="text-white font-black tracking-wider uppercase">PORTFOLIO & CATALOGUE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-studio-red">TRA STUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Nos réalisations <span className="text-studio-red">& productions</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Parcourez les tournages studio, spots publicitaires, animations 3D motion design et vidéos institutionnelles réalisés pour nos partenaires et créateurs.
          </p>
        </div>

        {/* =========================================================================
            CATEGORY FILTER TABS
           ========================================================================= */}
        <div className="flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl max-w-full">
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const count = cat.key === 'all' 
                ? PORTFOLIO_PROJECTS.length 
                : PORTFOLIO_PROJECTS.filter((p) => p.category === cat.key).length;
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-studio-red text-white shadow-lg shadow-studio-red/30 scale-102'
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

        {/* =========================================================================
            PROJECTS GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={project.posterImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-300">
                    {project.categoryLabel}
                  </span>

                  {project.localVideoUrl ? (
                    <span className="px-2 py-0.5 rounded-md bg-studio-red text-white text-[10px] font-bold flex items-center gap-1 shadow-md animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      Extrait 4K
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-zinc-400 text-[10px] font-mono border border-zinc-800">
                      HD Master
                    </span>
                  )}
                </div>

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-studio-red/90 group-hover:bg-studio-red text-white flex items-center justify-center shadow-xl shadow-studio-red/40 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-zinc-900/40">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-studio-red transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-1 font-mono">
                    {project.originalFilename}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400">
                    <Film className="w-3 h-3 text-studio-red" />
                    <span>TRA Studio Cut</span>
                  </span>
                  <span className="text-studio-red font-bold text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Visionner <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            LOAD MORE / EXPLORE ALL
           ========================================================================= */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleLoadMore}
              className="h-12 px-7 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>Afficher plus de réalisations ({filteredProjects.length - visibleCount} restants)</span>
              <ChevronDown className="w-4 h-4 text-studio-red" />
            </button>
          </div>
        )}

        {/* =========================================================================
            BOTTOM STUDIO CALLOUT BANNER
           ========================================================================= */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-950 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Vous avez un tournage ou un spot à réaliser ?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              De la captation 4K multicaméra jusqu’à la modélisation 3D et le montage cinématographique, notre équipe technique concrétise votre vision.
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
              <span>Réserver une session studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {activeProject && (
        <VideoPlayerModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onBookSimilar={() => {
            setActiveProject(null);
            onStartBooking();
          }}
        />
      )}
    </section>
  );
};
