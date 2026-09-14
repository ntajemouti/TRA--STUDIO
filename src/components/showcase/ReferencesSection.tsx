import React from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const ReferencesSection: React.FC = () => {
  const STATS = [
    { value: '+150', label: 'Sessions Studio Réalisées', sub: 'Tournages podcast & vidéo' },
    { value: '+50', label: 'Marques & Créateurs', sub: 'Partenaires accompagnés' },
    { value: '4K', label: 'Standard Broadcast', sub: 'Caméras cinéma & régie live' },
    { value: '100%', label: 'Fichiers Remis Immédiatement', sub: 'Rushs bruts exportés sur SSD' },
  ];

  const REFERENCES = [
    {
      id: 'ref-1',
      category: 'INSTITUTIONNEL & MINISTÈRES',
      name: 'Communication Publique & Événements',
      description: 'Captation officielle, interviews protocolaires et spots de sensibilisation nationale.',
      badge: 'Institutionnel',
      highlight: 'Standard Broadcast 4K',
    },
    {
      id: 'ref-2',
      category: 'HÔTELLERIE & MARQUES DE PRESTIGE',
      name: 'Sofitel Luxury & Hôtellerie Haut de Gamme',
      description: 'Vidéos de promotion, captations événementielles et visuels de marque premium.',
      badge: 'Luxe & Hospitalité',
      highlight: 'Direction Artistique Cinéma',
    },
    {
      id: 'ref-3',
      category: 'INDUSTRIE & DÉVELOPPEMENT',
      name: 'Al Moutmir & Grands Groupes',
      description: 'Reportages de terrain, témoignages d’experts et valorisation des initiatives d’entreprise.',
      badge: 'Corporate',
      highlight: 'Équipe Mobile Terrain',
    },
    {
      id: 'ref-4',
      category: 'SÉCURITÉ & ORGANISMES NATIONAUX',
      name: 'Narsa, CNDP & Solamta',
      description: 'Animations motion design 2D/3D, campagnes de sensibilisation et protection des données.',
      badge: 'Sensibilisation',
      highlight: 'Motion Design & 3D',
    },
    {
      id: 'ref-5',
      category: 'CRÉATEURS & TALK-SHOWS',
      name: 'Podcasteurs, Créateurs de Contenu & Média',
      description: 'Émissions hebdomadaires, interviews en table ronde et formats courts 9:16 pour TikTok & Reels.',
      badge: 'Digital & Média',
      highlight: 'Multicam Shure SM7B',
    },
    {
      id: 'ref-6',
      category: 'SANTÉ & EXPERTISES DIRIGEANTS',
      name: 'Dr Azzouzi & Entretiens Professionnels',
      description: 'Masterclasses spécialisées, prise de parole de dirigeants et vidéos éducatives de référence.',
      badge: 'Professionnel',
      highlight: 'Plateau Privatisé',
    },
  ];

  return (
    <section id="references" className="py-14 sm:py-20 bg-zinc-950 text-white scroll-mt-20 relative overflow-hidden">
      {/* Ambient Red Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-studio-red/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* =========================================================================
            HEADER
           ========================================================================= */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-bold text-zinc-300 shadow-md">
              <Award className="w-4 h-4 text-studio-red" />
              <span className="text-white font-black tracking-wider uppercase">CONFIANCE & EXPERTISE</span>
              <span className="text-zinc-600">•</span>
              <span className="text-studio-red">TRA STUDIO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Ils font confiance à <span className="text-studio-red">TRA Studio</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Entreprises, institutions, marques prestigieuses et créateurs indépendants nous confient leurs productions audiovisuelles à Témara.
            </p>
          </div>
        </ScrollReveal>

        {/* =========================================================================
            KEY STATS BAR
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <ScrollReveal key={idx} animation="zoom-in" delay={idx * 100}>
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 shadow-xl flex flex-col justify-between space-y-2 text-center sm:text-left h-full">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="text-studio-red">{stat.value}</span>
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-zinc-200">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-medium pt-0.5">
                    {stat.sub}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* =========================================================================
            REFERENCES GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {REFERENCES.map((ref, idx) => (
            <ScrollReveal key={ref.id} animation="fade-up" delay={idx * 80}>
              <div className="rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg text-left group h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-[10px] font-black uppercase tracking-wider">
                      {ref.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Référence Validée</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-studio-red font-bold uppercase tracking-wider">
                      {ref.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-studio-red transition-colors">
                      {ref.name}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {ref.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/70 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 text-[11px]">Compétence clé :</span>
                  <span className="font-semibold text-zinc-300 text-[11px] px-2 py-0.5 rounded bg-zinc-800/60">
                    {ref.highlight}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Studio Commitment Banner */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-studio-red/10 border border-studio-red/20 flex items-center justify-center text-studio-red shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Engagement Qualité & Confidentialité Broadcast
                </h4>
                <p className="text-xs text-zinc-400">
                  Vos données, fichiers bruts et créations sont sécurisés et sauvegardés sur SSD haute vitesse.
                </p>
              </div>
            </div>

            <span className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider shrink-0 border border-zinc-700">
              TRA Studio Certified
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
