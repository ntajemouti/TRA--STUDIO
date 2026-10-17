import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { STUDIO_WHATSAPP_NUMBER } from '../../config/booking';

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  onStartBooking?: () => void;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    number: '01',
    question: 'Quels types de prestations propose TRA Studio ?',
    answer:
      "Nous accompagnons créateurs, entreprises et marques à travers plusieurs expertises : l'enregistrement de podcasts multicaméras 4K (avec micros broadcast Shure), la production de formats courts verticaux pour les réseaux sociaux (Reels, TikTok, shorts), les interviews de fond, ainsi que les shootings photo et vidéo sur notre cyclorama blanc. Selon vos objectifs, vous pouvez opter pour une formule avec rushs bruts remis immédiatement, ou pour une prise en charge complète avec montage, étalonnage et mastering sonore.",
  },
  {
    id: 'faq-2',
    number: '02',
    question: 'Comment réserver une séance au studio ?',
    answer:
      "La réservation s'effectue directement en ligne en toute simplicité : parcourez nos formules dans la section Services, choisissez votre prestation et sélectionnez votre date et votre créneau horaire parmi nos disponibilités du lundi au samedi (de 10h à 18h). Dès validation, notre équipe prépare le plateau technique pour votre venue. Vous pouvez également réserver directement via WhatsApp.",
  },
  {
    id: 'faq-3',
    number: '03',
    question: 'Puis-je venir avec mon propre concept ou scénario ?',
    answer:
      "Tout à fait. Vous conservez l'entière direction artistique et éditoriale de vos contenus. Que vous arriviez avec un conducteur détaillé, un script ou simplement une idée directrice, nous adaptons le plateau (disposition des micros, cadrages, ambiance lumineuse et néons) pour sublimer votre univers sans jamais le dénaturer.",
  },
  {
    id: 'faq-4',
    number: '04',
    question: 'Comment obtenir un devis personnalisé ?',
    answer:
      "Pour les projets d'envergure, les besoins de tournage sur une demi-journée ou journée complète, ou les formats nécessitant des décors et configurations sur mesure, contactez-nous par WhatsApp ou via notre formulaire de contact. Nous analysons vos contraintes techniques et vous transmettons un devis précis sous 24 à 48 heures.",
  },
  {
    id: 'faq-5',
    number: '05',
    question: 'Combien de temps à l’avance faut-il réserver ?',
    answer:
      "Nous vous conseillons de réserver entre 3 et 7 jours à l'avance afin de vous assurer de la disponibilité du créneau qui vous convient le mieux. Pour les demandes urgentes ou les opportunités de dernière minute, écrivez-nous directement sur WhatsApp : nous faisons le maximum pour vous proposer une solution selon le planning du jour.",
  },
  {
    id: 'faq-6',
    number: '06',
    question: 'Puis-je demander des modifications après la production ?',
    answer:
      'Oui. Toutes nos formules incluant la post-production comprennent un tour de révision complet. Vous recevez une première version de travail pour vérifier le rythme, les coupes, le mixage voix et le titrage. Nous appliquons vos retours avec soin avant de vous livrer la version finale masterisée en très haute définition.',
  },
  {
    id: 'faq-7',
    number: '07',
    question: 'Comment contacter TRA Studio pour un projet spécifique ?',
    answer:
      'Vous pouvez nous joindre en direct sur WhatsApp au +212 660-719968, par e-mail à Tawfiqbennani@tra-studio.com, ou prendre rendez-vous pour visiter nos installations à Témara (Boulevard Hassan II). Nous serons ravis d’échanger autour de vos ambitions créatives.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onStartBooking }) => {
  // First item open by default for immediate discoverability
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIdx((current) => (current === index ? null : index));
  };

  const whatsappHref = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Bonjour TRA Studio, j'ai une question concernant vos prestations et disponibilités au studio."
  )}`;

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 bg-studio-bg text-white relative overflow-hidden border-t border-zinc-900/80 scroll-mt-20">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[450px] bg-studio-red/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            EDITORIAL SPLIT LAYOUT (Desktop & Tablet):
            - Left: Introduction + Authentic TRA Studio photo + Subtle Contact CTA
            - Right: Editorial Q&A list with minimal dividers & plus/minus
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column: Sticky Editorial Introduction */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <ScrollReveal animation="fade-down" duration={600}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono tracking-widest text-zinc-300 uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                  <span>AIDE & INFORMATIONS • TÉMARA</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight leading-[1.05]">
                  Questions <span className="text-studio-red">fréquentes</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-md">
                  Retrouvez ici les réponses essentielles pour préparer votre tournage, choisir votre formule et collaborer avec notre équipe en toute clarté.
                </p>
              </div>
            </ScrollReveal>

            {/* Carefully selected realistic TRA Studio photograph */}
            <ScrollReveal animation="fade-up" delay={100} duration={600}>
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-2xl shadow-black/80 group">
                <img
                  src="/images/studio-spaces/tra-podcast-camera-monitor.jpg"
                  alt="Plateau de tournage et caméra 4K en régie chez TRA Studio"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
                
                {/* Subtle caption */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                  <span>Plateau en direct • Témara</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Desktop Contact CTA Card */}
            <div className="hidden lg:block">
              <ScrollReveal animation="fade-up" delay={150} duration={600}>
                <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Vous avez un projet en tête ? Parlons-en.
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Notre équipe est à votre écoute pour évaluer vos besoins, adapter le plateau et planifier votre prochaine session.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-studio-red hover:bg-studio-redHover text-white text-xs font-semibold tracking-wide shadow-lg shadow-studio-red/25 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Échanger sur WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3 opacity-80" />
                    </a>

                    {onStartBooking && (
                      <button
                        type="button"
                        onClick={onStartBooking}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-medium tracking-wide transition-all cursor-pointer"
                      >
                        <span>Réserver une séance</span>
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Refined Editorial FAQ List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-0 divide-y divide-zinc-800/80 border-t border-b border-zinc-800/80">
              {FAQS.map((item, idx) => {
                const isOpen = openIdx === idx;
                const answerId = `faq-answer-${item.id}`;
                const buttonId = `faq-btn-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className="group transition-colors duration-200 hover:bg-zinc-900/30"
                  >
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="w-full py-6 sm:py-7 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-studio-red/70 rounded-lg select-none"
                    >
                      {/* Number + Question */}
                      <div className="flex items-baseline gap-4 sm:gap-6 flex-1 pr-2">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-500 group-hover:text-studio-red transition-colors flex-shrink-0">
                          {item.number}
                        </span>
                        <span
                          className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight transition-colors duration-200 leading-snug ${
                            isOpen ? 'text-studio-red' : 'text-white group-hover:text-zinc-200'
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>

                      {/* Minimalist Plus / Minus Indicator */}
                      <div
                        aria-hidden="true"
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 mt-0.5 ${
                          isOpen ? 'text-studio-red' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                      >
                        <span className="relative w-3.5 h-3.5 flex items-center justify-center">
                          {/* Horizontal stroke (always visible) */}
                          <span className="absolute w-3.5 h-[1.5px] bg-current rounded-full transition-transform duration-300" />
                          {/* Vertical stroke (scales down to 0 on open to reveal minus) */}
                          <span
                            className={`absolute h-3.5 w-[1.5px] bg-current rounded-full transition-transform duration-300 ${
                              isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
                            }`}
                          />
                        </span>
                      </div>
                    </button>

                    {/* Smooth, Accessible Accordion Body */}
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out overflow-hidden ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 sm:pb-7 pl-8 sm:pl-12 pr-2 sm:pr-8 text-xs sm:text-sm lg:text-base text-zinc-300 font-light leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Contact CTA Card (Positioned naturally at the end of the FAQ on mobile) */}
            <div className="lg:hidden pt-4">
              <ScrollReveal animation="fade-up" delay={150} duration={600}>
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Vous avez un projet en tête ? Parlons-en.
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Notre équipe est à votre écoute pour évaluer vos besoins, adapter le plateau et planifier votre prochaine session.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-studio-red hover:bg-studio-redHover text-white text-xs font-semibold tracking-wide shadow-lg shadow-studio-red/25 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Échanger sur WhatsApp</span>
                      <ArrowUpRight className="w-3 h-3 opacity-80" />
                    </a>

                    {onStartBooking && (
                      <button
                        type="button"
                        onClick={onStartBooking}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-medium tracking-wide transition-all cursor-pointer"
                      >
                        <span>Réserver une séance</span>
                      </button>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
