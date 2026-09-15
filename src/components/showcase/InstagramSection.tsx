import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { StudioSettings } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';

interface InstagramSectionProps {
  settings?: StudioSettings;
}

const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    image: '/instagram/tra-insta-1.jpg',
    alt: 'TRA Studio plateau podcast rouge à Témara',
    likes: '842',
    comments: '46',
  },
  {
    id: 'post-2',
    image: '/instagram/tra-insta-2.jpg',
    alt: 'TRA Studio session tournage setup bleu et régie',
    likes: '694',
    comments: '38',
  },
  {
    id: 'post-3',
    image: '/instagram/tra-insta-3.jpg',
    alt: 'TRA Studio retour caméra 4K et réalisation',
    likes: '528',
    comments: '29',
  },
  {
    id: 'post-4',
    image: '/instagram/tra-insta-4.jpg',
    alt: 'TRA Studio shooting mode et commercial',
    likes: '715',
    comments: '51',
  },
  {
    id: 'post-5',
    image: '/instagram/tra-insta-5.jpg',
    alt: 'TRA Studio interview et talk-show podcast',
    likes: '931',
    comments: '64',
  },
  {
    id: 'post-6',
    image: '/instagram/tra-insta-6.jpg',
    alt: 'TRA Studio campagne visuelle Sony Alpha 7',
    likes: '1.2K',
    comments: '88',
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
            6 INSTAGRAM POSTS GRID (Simple, Aesthetic, Pure Visuals, No Text Over Cards)
           ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 70}>
              <div
                onClick={handlePostClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePostClick();
                }}
                className="group relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/90 hover:border-pink-500/60 shadow-xl hover:shadow-2xl hover:shadow-pink-500/15 transition-all duration-300 cursor-pointer"
                title="Voir cette publication sur le compte Instagram de TRA Studio"
              >
                {/* Pure Authentic Photo from @tra__studio — No Text Overlay */}
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Subtle Interactive Instagram Hover State */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5 text-white p-3 select-none">
                  <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs font-bold text-white">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                      {post.comments}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                    Instagram <ExternalLink className="w-2.5 h-2.5 text-pink-400" />
                  </span>
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
