import React, { useEffect } from 'react';
import { PortfolioProject } from '../../data/portfolioData';
import { X, ExternalLink, Calendar, Film, CheckCircle2 } from 'lucide-react';

interface VideoPlayerModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onBookSimilar: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  project,
  onClose,
  onBookSimilar,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-900/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full bg-studio-red/20 text-studio-red border border-studio-red/30 text-[11px] font-bold uppercase tracking-wider shrink-0">
              {project.categoryLabel}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Fermer le lecteur"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          {project.localVideoUrl ? (
            <video
              src={project.localVideoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={project.previewEmbedUrl}
              title={project.title}
              allow="autoplay; fullscreen"
              className="w-full h-full border-0"
            />
          )}
        </div>

        {/* Bottom Details & Actions */}
        <div className="p-4 sm:p-6 border-t border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Film className="w-3.5 h-3.5 text-studio-red" />
              <span>Fichier master : <strong className="text-zinc-200">{project.originalFilename}</strong></span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Qualité Studio HD/4K
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Captation, cadrage, éclairage et post-production assurés par l’équipe technique TRA Studio Témara.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial h-10 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Source Drive HD</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookSimilar();
              }}
              className="flex-1 sm:flex-initial h-10 px-5 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-studio-red/25 transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver ce type de session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
