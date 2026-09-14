import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, Play, Layers } from 'lucide-react';
import { StudioSettings } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';

interface InstagramSectionProps {
  settings?: StudioSettings;
}

const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    type: 'reel',
    tag: 'REEL • PODCAST',
    title: 'Setup Podcast 3 Caméras 4K & micros Shure SM7B 🎙️',
    caption: 'Immersion au cœur de notre plateau multicam à Témara. Cadrage cinéma, son broadcast et régie en temps réel.',
    likes: '342',
    comments: '28',
    date: 'Il y a 2 jours',
    accentColor: 'from-purple-600/20 to-pink-600/20',
  },
  {
    id: 'post-2',
    type: 'carousel',
    tag: 'SHOOTING • CYCLO',
    title: 'Shooting Photo Cyclo Blanc & Éclairages Nanlite RGB 📸',
    caption: 'Packshots produits et portraits éditoriaux sur notre cyclo infini avec éclairages continus et flashs haute vitesse.',
    likes: '489',
    comments: '41',
    date: 'Il y a 4 jours',
    accentColor: 'from-amber-600/20 to-red-600/20',
  },
  {
    id: 'post-3',
    type: 'reel',
    tag: 'BACKSTAGE • RÉGIE',
    title: 'Backstage Régie : Commutation en direct & export SSD 🎛️',
    caption: 'Contrôle live multipiste, étalonnage instantané et remise immédiate de tous vos rushs 4K dès la fin de votre session.',
    likes: '276',
    comments: '19',
    date: 'Il y a 6 jours',
    accentColor: 'from-red-600/20 to-indigo-600/20',
  },
  {
    id: 'post-4',
    type: 'reel',
    tag: 'FORMATS COURTS • 9:16',
    title: 'Tournage Format Vertical 9:16 pour TikTok & Reels 📱',
    caption: 'Des vidéos ultra-dynamiques calibrées pour capter l’attention des algorithmes en moins de 3 secondes.',
    likes: '615',
    comments: '53',
    date: 'Il y a 1 semaine',
    accentColor: 'from-pink-600/20 to-rose-600/20',
  },
  {
    id: 'post-5',
    type: 'photo',
    tag: 'STUDIO • TÉMARA',
    title: 'Bienvenue à Témara : Votre nouveau studio de référence 📍',
    caption: 'Un espace insonorisé et privatisé au cœur de Témara pour donner vie à toutes vos ambitions audiovisuelles.',
    likes: '524',
    comments: '36',
    date: 'Il y a 1 semaine',
    accentColor: 'from-blue-600/20 to-purple-600/20',
  },
  {
    id: 'post-6',
    type: 'carousel',
    tag: 'POST-PRODUCTION • 4K',
    title: 'Direction Artistique, Étalonnage Cinéma & Sound Design ✨',
    caption: 'De la prise de vue jusqu’au rendu final prêt pour la diffusion sur vos réseaux sociaux et plateformes streaming.',
    likes: '398',
    comments: '22',
    date: 'Il y a 2 semaines',
    accentColor: 'from-purple-600/20 to-amber-600/20',
  },
];

export const InstagramSection: React.FC<InstagramSectionProps> = ({ settings }) => {
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/tra__studio?igsi=MThkb3NqdzBmODVuYQ==';
  const handle = settings?.instagramHandle || 'tra__studio';

  const handlePostClick = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="instagram" className="py-14 sm:py-20 bg-studio-bg text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/10 via-pink-600/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* =========================================================================
            SECTION HEADER
           ========================================================================= */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold text-zinc-300 shadow-md">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span className="text-white font-black tracking-wider uppercase">COMMUNAUTÉ & COULISSES</span>
              <span className="text-zinc-600">•</span>
              <span className="text-pink-400">@{handle}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Suivez-nous sur <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">Instagram</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Découvrez nos coulisses de tournage, les nouveaux setups d'éclairage et les projets réalisés au studio au quotidien.
            </p>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            6 INSTAGRAM POSTS GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 90}>
              <div
                onClick={handlePostClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePostClick();
                }}
                className="group relative rounded-2xl bg-zinc-900/80 border border-zinc-800/90 hover:border-pink-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 flex flex-col cursor-pointer text-left hover:-translate-y-1 h-full"
              >
                {/* Post Visual Box with Stylized Studio Frame */}
                <div className="relative aspect-square w-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col justify-between p-5 overflow-hidden border-b border-zinc-800/60">
                  {/* Background ambient gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.accentColor} opacity-40 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  
                  {/* Subtle studio crosshair / grid background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

                  {/* Top bar: Type badge & Instagram mini icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-zinc-700/80 text-[10px] font-black uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
                      {post.type === 'reel' && <Play className="w-2.5 h-2.5 text-pink-400 fill-pink-400" />}
                      {post.type === 'carousel' && <Layers className="w-2.5 h-2.5 text-amber-400" />}
                      {post.type === 'photo' && <Sparkles className="w-2.5 h-2.5 text-blue-400" />}
                      <span>{post.tag}</span>
                    </span>

                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-zinc-700/80 flex items-center justify-center text-zinc-400 group-hover:text-pink-400 group-hover:border-pink-500/40 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center Content: Title & Aesthetic Studio Typography */}
                  <div className="relative z-10 space-y-2 py-4">
                    <div className="w-8 h-1 bg-pink-500/80 rounded-full group-hover:w-12 transition-all duration-300"></div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-pink-200 transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                  </div>

                  {/* Bottom preview metrics */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-medium text-zinc-400">@{handle}</span>
                    <span className="text-[11px] text-zinc-400 font-mono">{post.date}</span>
                  </div>

                  {/* Hover Overlay with Instagram Interaction Counters */}
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-6 text-white font-bold text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-white" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-500/20">
                      <span>Ouvrir sur Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Post Caption Footer */}
                <div className="p-4 bg-zinc-900/40 space-y-2 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                    {post.caption}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-pink-400 font-bold group-hover:text-pink-300">
                    <span>Voir la publication complète</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* =========================================================================
            BOTTOM CALL TO ACTION: DIRECT FOLLOW
           ========================================================================= */}
        <ScrollReveal animation="zoom-in" delay={150}>
          <div className="text-center pt-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-pink-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Suivre @{handle} sur Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
