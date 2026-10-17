import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { StudioSettings } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';

interface InstagramSectionProps {
  settings?: StudioSettings;
}

interface InstagramPost {
  id: string;
  type: 'video' | 'image';
  image: string;
  videoUrl?: string;
  alt: string;
  postUrl: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    type: 'video',
    image: '/instagram/tra-insta-1.jpg',
    videoUrl: '/instagram/tra-reel-1.mp4',
    alt: 'TRA Studio x Podcast 3adi',
    postUrl: 'https://www.instagram.com/podcast3adi/reel/DeKYJPlB10S/',
  },
  {
    id: 'post-2',
    type: 'video',
    image: '/instagram/tra-insta-2.jpg',
    videoUrl: '/instagram/tra-reel-2.mp4',
    alt: 'TRA Studio clapperboard tournage cinéma',
    postUrl: 'https://www.instagram.com/tra__studio/reel/Dd6di1pAMFn/',
  },
  {
    id: 'post-3',
    type: 'image',
    image: '/instagram/tra-insta-3.jpg',
    alt: 'TRA Studio x Douae Eddebbarh shooting cyclo',
    postUrl: 'https://www.instagram.com/douaeinmotion/p/DdzxLVQDBEs/',
  },
  {
    id: 'post-4',
    type: 'video',
    image: '/instagram/tra-insta-4.jpg',
    videoUrl: '/instagram/tra-reel-4.mp4',
    alt: 'TRA Studio The shoot BTS studio et éclairage',
    postUrl: 'https://www.instagram.com/tra_agency/reel/Dcokix0sLeC/',
  },
  {
    id: 'post-5',
    type: 'video',
    image: '/instagram/tra-insta-5.jpg',
    videoUrl: '/instagram/tra-reel-5.mp4',
    alt: 'TRA Studio cadrage caméra cinéma Tawfiq Bennani',
    postUrl: 'https://www.instagram.com/framesbytawfiq/reel/Dbk8gLzI0oO/',
  },
  {
    id: 'post-6',
    type: 'video',
    image: '/instagram/tra-insta-6.jpg',
    videoUrl: '/instagram/tra-reel-6.mp4',
    alt: 'TRA Studio interview et talk-show podcast',
    postUrl: 'https://www.instagram.com/tra__studio/reel/DZ487JUgykl/',
  },
  {
    id: 'post-7',
    type: 'video',
    image: '/instagram/tra-insta-7.jpg',
    videoUrl: '/instagram/tra-reel-7.mp4',
    alt: 'TRA Studio plateau rouge éclairage Godox et fauteuil jaune',
    postUrl: 'https://www.instagram.com/tra__studio/reel/DZPwhe1ASQf/',
  },
  {
    id: 'post-8',
    type: 'video',
    image: '/instagram/tra-insta-8.jpg',
    videoUrl: '/instagram/tra-reel-8.mp4',
    alt: 'TRA Studio session tournage setup bleu et régie DJ',
    postUrl: 'https://www.instagram.com/tra__studio/reel/DZPx6MAAbZL/',
  },
];

export const InstagramSection: React.FC<InstagramSectionProps> = ({ settings }) => {
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/tra__studio?igsi=MThkb3NqdzBmODVuYQ==';
  const handle = settings?.instagramHandle || 'tra__studio';

  const handlePostClick = (targetUrl?: string) => {
    window.open(targetUrl || instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="instagram" className="pt-6 sm:pt-8 pb-14 sm:pb-20 bg-studio-bg text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-studio-red/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
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
            - Reels play continuously on loop, muted without sound ("videowat kithrko bla sout")
            - Static photos remain photos ("postes tabtin 3ibara 3la des photos")
            - 4 columns x 2 rows on desktop (large edge-to-edge cards)
            - 2 columns on mobile
            - Pure visual post with semi-transparent white Instagram logo on hover (content stays visible behind)
            - No likes, no views, no comments
            - Direct link to authentic Instagram post on click
           ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 50}>
              <div
                onClick={() => handlePostClick(post.postUrl)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePostClick(post.postUrl);
                }}
                className="group relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/90 hover:border-white/50 shadow-xl hover:shadow-2xl hover:shadow-studio-red/20 transition-all duration-300 cursor-pointer"
                title="Voir cette publication sur Instagram (@tra__studio)"
              >
                {/* Visual Media: Playing muted video for Reels OR static photo for image posts */}
                {post.type === 'video' && post.videoUrl ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        if (el.paused) el.play().catch(() => {});
                      }
                    }}
                    src={post.videoUrl}
                    poster={post.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                  />
                ) : (
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                )}

                {/* Semi-transparent white Instagram logo on hover (photo/video stays completely visible behind) */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center select-none pointer-events-none z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] stroke-[1.8]" />
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
