import React from 'react';
import { Camera, Mic, Sun, Cpu, Sparkles, Headphones } from 'lucide-react';

export const EquipmentSection: React.FC = () => {
  const equipmentCards = [
    {
      name: 'Caméras Sony 4K (FX3 & FX30)',
      category: 'Vidéo',
      icon: Camera,
      specs: 'Images nettes en 4K avec optiques professionnelles pour un beau rendu visuel.',
      tag: '4K Multicam',
      image: '/catalog-photos/tra-studio-desktop-frontal.jpg',
    },
    {
      name: 'Micros Shure SM7B',
      category: 'Audio',
      icon: Mic,
      specs: 'Micros de studio renommés pour un son vocal clair, chaleureux et précis.',
      tag: 'Voix Broadcast',
      image: '/services/podcast.jpg',
    },
    {
      name: 'Éclairage Aputure & Diffuseurs',
      category: 'Lumière',
      icon: Sun,
      specs: 'Projecteurs avec boîtes à lumière pour un éclairage doux et flatteur.',
      tag: 'Lumière Douce',
      image: '/services/shooting.jpg',
    },
    {
      name: 'Régie & Table de Mixage',
      category: 'Régie',
      icon: Cpu,
      specs: 'Contrôle des volumes en direct et enregistrement multi-pistes synchronisé.',
      tag: 'Contrôle Live',
      image: '/catalog-photos/tra-studio-desktop-angled.jpg',
    },
    {
      name: 'Tubes LED Nanlite RGB',
      category: 'Ambiance',
      icon: Sparkles,
      specs: 'Éclairages colorés personnalisables pour créer l’atmosphère de votre choix.',
      tag: 'Couleurs & Décor',
      image: '/services/social-media.jpg',
    },
    {
      name: 'Casques Audio-Technica',
      category: 'Monitoring',
      icon: Headphones,
      specs: 'Retour sonore haute fidélité pour chaque intervenant autour de la table.',
      tag: 'Retour Casque',
      image: '/services/corporate.jpg',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-studio-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-red">
            Équipement professionnel
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Le matériel du studio
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Une configuration moderne et éprouvée pour garantir une qualité sonore et visuelle irréprochable.
          </p>
        </div>

        {/* Visual Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipmentCards.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-studio-red/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-studio-red/10 flex flex-col justify-between text-left"
              >
                {/* Visual Header with Image */}
                <div className="relative h-40 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-black/20"></div>
                  
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-white border border-zinc-700">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-zinc-950/90 border border-zinc-800 flex items-center justify-center text-studio-red">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.specs}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
