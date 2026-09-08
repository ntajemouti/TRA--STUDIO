import React from 'react';
import { 
  ShieldCheck, 
  Video, 
  Sparkles, 
  Sliders, 
  Volume2, 
  Coffee
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const points = [
    {
      icon: Volume2,
      title: 'Son & Acoustique Studio',
      description: 'Espace insonorisé et micros de qualité professionnelle pour une voix nette, claire et sans aucun écho.',
    },
    {
      icon: Video,
      title: 'Tournage Multicam 4K',
      description: 'Plusieurs angles de vue synchronisés pour donner du dynamisme à vos discussions et présentations.',
    },
    {
      icon: Sparkles,
      title: 'Éclairage & Décor Modulables',
      description: 'Lumières douces et touches de couleurs LED adaptées à l’ambiance de votre marque ou de votre chaîne.',
    },
    {
      icon: Sliders,
      title: 'Assistance Technique Dédiée',
      description: 'Un technicien prépare le plateau et s’assure du bon déroulement de votre enregistrement.',
    },
    {
      icon: ShieldCheck,
      title: 'Rushs Livrés Directement',
      description: 'Repartez avec l’intégralité de vos fichiers vidéo 4K et pistes audio brutes dès la fin de votre session.',
    },
    {
      icon: Coffee,
      title: 'Espace Accueil & Confort',
      description: 'Salon confortable et café pour préparer vos notes et recevoir vos invités dans un cadre agréable.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-zinc-950 border-t border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-red">
            L’expérience studio
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Pourquoi choisir TRA Studio ?
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Un plateau équipé et prêt à tourner pour vous permettre de vous concentrer sur vos idées.
          </p>
        </div>

        {/* 6 Clean Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-studio-red/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-studio-red/10 text-left cursor-default"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-studio-red shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
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
