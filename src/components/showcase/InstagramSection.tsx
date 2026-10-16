import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { StudioSettings } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';

interface InstagramSectionProps {
  settings?: StudioSettings;
}

interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image: '/instagram/tra-insta-1.jpg',
    alt: 'TRA Studio décor vintage studio podcast',
  },
  {
    id: 'post-2',
    image: '/instagram/tra-insta-2.jpg',
    alt: 'TRA Studio session tournage interview',
  },
  {
    id: 'post-3',
    image: '/instagram/tra-insta-3.jpg',
    alt: 'TRA Studio retour caméra 4K et réalisation',
  },
  {
    id: 'post-4',
    image: '/instagram/tra-insta-4.jpg',
    alt: 'TRA Studio shooting plateau frontal',
  },
  {
    id: 'post-5',
    image: '/instagram/tra-insta-5.jpg',
    alt: 'TRA Studio plateau podcast perspective',
  },
  {
    id: 'post-6',
    image: '/instagram/tra-insta-6.jpg',
    alt: 'TRA Studio interview et talk-show podcast',
  },
  {
    id: 'post-7',
    image: '/instagram/tra-insta-7.jpg',
    alt: 'TRA Studio production audiovisuelle broadcast',
  },
  {
    id: 'post-8',
    image: '/instagram/tra-insta-8.jpg',
    alt: 'TRA Studio néon officiel et plateau moderne',
  },
];

export const InstagramSection: React.FC<InstagramSectionProps> = ({ settings }) => {
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/tra__studio?igsi=MThkb3NqdzBmODVuYQ==';
  const handle = settings?.instagramHandle || 'tra__studio';

  const handlePostClick = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="instagram" className="pt-6 sm:pt-8 pb-14 sm:pb-20 bg-studio-bg text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-studio-red/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12 space-y-8 sm:space-y-10 relative z-10">
        {/* =========================================================================
            SECTION HEADER: Balanced spacing right after reels section
           ========================================================================= */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto px-4 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold text-zinc-300 shadow-md">
              <Instagram className="w-4 h-4 text-studio-red" />
              <span className="text-white font-black tracking-wider uppercase">COMMUNAUTÉ & COULISSES</span>
              <span className="text-zinc-600">•</span>
              <span className="text-studio-red font-semibold">@{handle}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Suivez-nous sur <span className="text-studio-red">Instagram</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Découvrez nos coulisses de tournage, les nouveaux setups d'éclairage et les projets réalisés au studio au quotidien.
            </p>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            8 LATEST INSTAGRAM POSTS:
            - 4 columns x 2 rows on desktop (large cards, spans corner to corner)
            - 2 columns on mobile
            - Pure visual post with transparent white Instagram logo on hover
           ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 50}>
              <div
                onClick={handlePostClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePostClick();
                }}
                className="group relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/90 hover:border-white/40 shadow-xl hover:shadow-2xl hover:shadow-studio-red/20 transition-all duration-300 cursor-pointer"
                title="Voir cette publication sur le compte Instagram de TRA Studio"
              >
                {/* Pure Authentic Photo from @tra__studio */}
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Transparent White Instagram Logo on hover with photo still visible behind */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center select-none pointer-events-none">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                    <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md stroke-[1.8]" />
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
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-studio-red hover:bg-studio-redHover text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-studio-red/30 active:scale-95 transition-all cursor-pointer"
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
