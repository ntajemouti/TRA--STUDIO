import React from 'react';
import { Camera, Mic, Sun, Cpu, Sparkles, Headphones } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export const EquipmentSection: React.FC = () => {
  const equipmentCards = [
    {
      name: 'Caméras Sony 4K (FX3 & FX30)',
      category: 'Vidéo',
      icon: Camera,
      specs: 'Capteurs plein format et Super 35, optiques cinéma G-Master pour un piqué chirurgical.',
      tag: '4K Multicam',
      image: '/catalog-photos/tra-studio-desktop-frontal.jpg',
    },
    {
      name: 'Micros Shure SM7B Broadcast',
      category: 'Audio',
      icon: Mic,
      specs: 'Standard mondial des studios d’enregistrement pour une présence vocale chaude et sans bruits parasites.',
      tag: 'Voix Broadcast',
      image: '/catalog-photos/tra-studio-desktop-frontal.jpg',
    },
    {
      name: 'Régie & Table de Mixage Multipiste',
      category: 'Régie',
      icon: Cpu,
      specs: 'Monitoring en direct, enregistrement séparé des pistes audio/vidéo et export direct SSD.',
      tag: 'Contrôle Live',
      image: '/catalog-photos/tra-studio-desktop-angled.jpg',
    },
    {
      name: 'Éclairage Aputure & Boîtes à Lumière',
      category: 'Lumière',
      icon: Sun,
      specs: 'Projecteurs cinéma continus avec dômes diffuseurs pour un rendu de peau soyeux et flatteur.',
      tag: 'Lumière Cinéma',
      image: '/images/studio-hero-bg.jpg',
    },
    {
      name: 'Tubes LED Nanlite Pavotube RGB',
      category: 'Ambiance',
      icon: Sparkles,
      specs: 'Éclairages immersifs programmables pour personnaliser l’ambiance colorimétrique de votre décor.',
      tag: 'Ambiance RGB',
      image: '/catalog-photos/tra-studio-desktop-modern-official-logo.jpg',
    },
    {
      name: 'Casques Audio-Technica & Monitoring',
      category: 'Monitoring',
      icon: Headphones,
      specs: 'Retour audio individuel ultra-fidèle pour chaque intervenant et contrôle du mixage en régie.',
      tag: 'Retour Casque',
      image: '/catalog-photos/tra-studio-desktop-angled.jpg',
    },
  ];

  return (
    <section id="equipment" className="py-14 sm:py-20 bg-studio-bg relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Section Heading */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-studio-red">
              Fiche technique studio
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Le matériel de production
            </h2>
            
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Une configuration broadcast éprouvée garantissant une qualité visuelle et acoustique irréprochable.
            </p>
          </div>
        </ScrollReveal>

        {/* Visual Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipmentCards.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 80}>
                <div className="group relative bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-studio-red/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-studio-red/10 flex flex-col justify-between text-left h-full">
                  {/* Visual Header with Authentic Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-75 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent"></div>
                    
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-950/90 backdrop-blur-md text-white border border-zinc-700 shadow-md">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center justify-center text-studio-red shadow-md">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-studio-red transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.specs}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
