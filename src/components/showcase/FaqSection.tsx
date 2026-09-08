import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Faut-il créer un compte pour réserver un créneau ?',
      a: 'Non, aucune inscription n’est requise au départ ! Vous choisissez simplement votre formule, votre date et vous renseignez vos coordonnées. Une fois la réservation validée, vous aurez l’option de créer un mot de passe en 1 clic pour suivre l’état de votre séance dans votre espace client personnel.',
    },
    {
      q: 'Comment et quand reçois-je mes rushs après la séance ?',
      a: 'La livraison est immédiate ! Dès la fin de votre session, nous exportons l’ensemble de vos fichiers vidéo 4K (tous les angles) et vos pistes audio brutes directement sur votre disque dur SSD externe, ou via un lien Cloud haut débit.',
    },
    {
      q: 'Combien de personnes peuvent participer au tournage ?',
      a: 'Notre plateau podcast peut accueillir confortablement jusqu’à 4 intervenants au micro simultanément. Pour les shootings photo et tournages vidéo, le plateau et l’espace lounge peuvent accueillir votre équipe ou vos invités.',
    },
    {
      q: 'Puis-je personnaliser les lumières et le décor selon ma marque ?',
      a: 'Tout à fait. Nos éclairages LED et tubes RGB Nanlite sont entièrement programmables à la teinte exacte de votre charte graphique (couleurs néons, contrastes, intensité). Le mobilier est également modulable.',
    },
    {
      q: 'Un technicien est-il présent pendant la session ?',
      a: 'Oui, une assistance technique studio est incluse pour calibrer les caméras, ajuster vos niveaux de voix au micro Shure, gérer les lumières et vous assurer un enregistrement fluide et sans stress.',
    },
    {
      q: 'Que faire si je souhaite un projet sur mesure ou une journée complète ?',
      a: 'Vous pouvez utiliser notre bouton « Demande de Devis » sur le site ou nous contacter directement sur WhatsApp. Nous concevons des forfaits demi-journée, journée ou abonnements récurrents adaptés à vos besoins.',
    },
  ];

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section className="py-16 sm:py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-zinc-400">
            Une question ? On y répond ici.
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Questions fréquentes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Retrouvez les réponses aux questions les plus posées par nos créateurs et entreprises clientes.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-studio-card border border-studio-border rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-studio-red border-studio-red/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-900/60 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
