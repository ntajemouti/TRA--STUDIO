import React, { useState } from 'react';
import { StudioSettings } from '../../types';
import { addQuote } from '../../data/storage';
import { ArrowLeft, CheckCircle2, Instagram, Phone, Send, Check } from 'lucide-react';

interface QuoteModalProps {
  onClose: () => void;
  settings: StudioSettings;
}

const AVAILABLE_SERVICES = [
  'Shooting photo',
  'Shooting vidéo',
  'Reels / contenu social media',
  'Podcast',
  'Location studio',
  'Production vidéo',
  'Autre',
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ onClose, settings }) => {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+212 ');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [projectType, setProjectType] = useState('');
  const [desiredDate, setDesiredDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(2);
  const [budgetRange, setBudgetRange] = useState('< 3 000 DH');
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Shooting photo']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let formattedIg = instagram.trim();
    if (formattedIg && !formattedIg.startsWith('@')) {
      formattedIg = '@' + formattedIg;
    }

    addQuote({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      instagram: formattedIg,
      projectType: projectType.trim() || 'Projet personnalisé',
      desiredDate: desiredDate || undefined,
      peopleCount,
      budgetRange,
      description: description.trim(),
      services: selectedServices,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const instagramDmUrl = settings.instagramUrl || `https://www.instagram.com/${settings.instagramHandle}`;
  const phoneTelUrl = `tel:${settings.phone.replace(/[\s-]/g, '')}`;
  const whatsappNumber = settings.whatsappNumber || '212660719968';
  const whatsappQuoteMsg = encodeURIComponent(
    `Bonjour TRA Studio ! Je viens d'envoyer une demande de devis sur mesure :\n\n` +
    `👤 Nom : ${fullName}\n` +
    `📌 Projet : ${projectType || 'Projet personnalisé'}\n` +
    `📱 Instagram : ${instagram}\n` +
    `💰 Budget : ${budgetRange}\n\n` +
    `Merci de me recontacter pour échanger sur le projet !`
  );
  const whatsappQuoteUrl = `https://wa.me/${whatsappNumber}?text=${whatsappQuoteMsg}`;

  if (submitted) {
    return (
      <div className="w-full space-y-6 text-center animate-in fade-in duration-300 py-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Demande de devis envoyée ✓
          </h2>
          <p className="text-xs text-studio-muted max-w-sm mx-auto leading-relaxed">
            Merci {fullName}, notre équipe étudie votre projet et vous contactera sous 24h ouvrées.
          </p>
        </div>

        {/* Quick CTA */}
        <div className="space-y-2.5 max-w-sm mx-auto pt-2">
          <a
            href={whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-full rounded-xl font-bold text-xs tracking-wide bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
          >
            <span>Échanger directement sur WhatsApp</span>
          </a>

          <a
            href={instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-full rounded-xl font-semibold text-xs tracking-wide bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg"
          >
            <Instagram className="w-4 h-4" />
            <span>Échanger sur Instagram</span>
          </a>

          <a
            href={phoneTelUrl}
            className="h-12 w-full rounded-xl font-semibold text-xs tracking-wide bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Appeler TRA Studio ({settings.phone})</span>
          </a>
        </div>

        <div className="pt-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            ← Retour au calendrier de réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Header back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-medium text-studio-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux prestations</span>
        </button>
      </div>

      <div className="text-center sm:text-left space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Demander un devis
        </h1>
        <p className="text-sm text-studio-muted">
          Décrivez votre projet sur mesure. Nous vous répondons rapidement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Nom complet <span className="text-studio-red">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="ex. Omar Tazi"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 h-11 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Téléphone <span className="text-studio-red">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+212 6 XX XX XX XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 h-11 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Email <span className="text-studio-red">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="contact@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 h-11 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Instagram @username <span className="text-studio-red">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="@compte_instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full px-3.5 h-11 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>
        </div>

        {/* Services Checkboxes */}
        <div className="space-y-2 pt-1">
          <label className="block text-xs font-semibold text-zinc-300 uppercase">
            Services souhaités <span className="text-studio-red">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AVAILABLE_SERVICES.map((srv) => {
              const isChecked = selectedServices.includes(srv);
              return (
                <button
                  key={srv}
                  type="button"
                  onClick={() => toggleService(srv)}
                  className={`
                    p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 text-left transition-all
                    ${
                      isChecked
                        ? 'bg-zinc-800 border-zinc-500 text-white'
                        : 'bg-studio-card border-studio-border text-zinc-400 hover:text-zinc-200'
                    }
                  `}
                >
                  <div
                    className={`
                      w-4 h-4 rounded flex items-center justify-center shrink-0 border
                      ${
                        isChecked
                          ? 'bg-studio-red border-studio-red text-white'
                          : 'border-zinc-700 bg-zinc-900'
                      }
                    `}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{srv}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Type & Date & People */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Type de projet
            </label>
            <input
              type="text"
              placeholder="ex. Clip, Campagne..."
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3.5 h-11 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Date souhaitée
            </label>
            <input
              type="date"
              value={desiredDate}
              onChange={(e) => setDesiredDate(e.target.value)}
              className="w-full px-3.5 h-11 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Budget estimé
            </label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="w-full px-3 h-11 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
            >
              <option value="< 3 000 DH">&lt; 3 000 DH</option>
              <option value="3 000 - 6 000 DH">3 000 - 6 000 DH</option>
              <option value="6 000 - 10 000 DH">6 000 - 10 000 DH</option>
              <option value="> 10 000 DH">&gt; 10 000 DH</option>
              <option value="À définir">À définir</option>
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-1 pt-1">
          <label className="block text-xs font-semibold text-zinc-300 uppercase">
            Description du projet <span className="text-studio-red">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="Détaillez vos besoins : nombre de caméras, durée de tournage, livrables attendus..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-studio-card border border-studio-border focus:border-zinc-400 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || selectedServices.length === 0}
            className="w-full h-13 rounded-2xl font-bold text-sm tracking-wide bg-white text-black hover:bg-zinc-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Envoyer ma demande</span>
          </button>
        </div>
      </form>
    </div>
  );
};
