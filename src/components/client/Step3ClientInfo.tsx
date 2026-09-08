import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Phone, Mail, Instagram, Users, FileText } from 'lucide-react';

import { StudioPackage } from '../../types';

interface Step3ClientInfoProps {
  initialData: {
    fullName: string;
    phone: string;
    email: string;
    instagram: string;
    peopleCount: number;
    projectNotes: string;
  };
  selectedPackage?: StudioPackage | null;
  onSubmit: (data: {
    fullName: string;
    phone: string;
    email: string;
    instagram: string;
    peopleCount: number;
    projectNotes: string;
  }) => void;
  onBack: () => void;
}

export const Step3ClientInfo: React.FC<Step3ClientInfoProps> = ({
  initialData,
  selectedPackage,
  onSubmit,
  onBack,
}) => {
  const [fullName, setFullName] = useState(initialData.fullName);
  const [phone, setPhone] = useState(initialData.phone || '+212 ');
  const [email, setEmail] = useState(initialData.email);
  const [instagram, setInstagram] = useState(initialData.instagram);
  const [peopleCount, setPeopleCount] = useState<number>(initialData.peopleCount || 1);
  const [projectNotes, setProjectNotes] = useState(initialData.projectNotes);

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Le nom complet est obligatoire';
    if (!phone.trim() || phone.trim() === '+212') errs.phone = 'Le numéro de téléphone est obligatoire';
    if (!email.trim() || !email.includes('@')) errs.email = 'Adresse email valide requise';
    if (!instagram.trim()) errs.instagram = 'Le compte Instagram est requis';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let formattedIg = instagram.trim();
    if (!formattedIg.startsWith('@')) {
      formattedIg = '@' + formattedIg;
    }

    onSubmit({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      instagram: formattedIg,
      peopleCount,
      projectNotes: projectNotes.trim(),
    });
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-8 text-left">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Changer de prestation</span>
        </button>
      </div>

      {/* Selected Package Visual Preview Mini-Card */}
      {selectedPackage && (
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-3xl p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            {selectedPackage.imageUrl && (
              <img
                src={selectedPackage.imageUrl}
                alt={selectedPackage.name}
                className="w-12 h-12 rounded-2xl object-cover border border-zinc-800 shrink-0 shadow-md"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white uppercase tracking-wide">
                  {selectedPackage.name}
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-studio-red text-white shadow-sm">
                  {selectedPackage.duration}h
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Tarif : <strong className="text-white font-bold">{selectedPackage.price.toLocaleString('fr-FR')} DH</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-zinc-400 hover:text-white underline cursor-pointer shrink-0 relative z-10"
          >
            Changer
          </button>
        </div>
      )}

      <div className="text-center sm:text-left space-y-1 mb-6">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Vos coordonnées
        </h1>
        <p className="text-sm text-studio-muted">
          Renseignez vos coordonnées pour confirmer votre session à TRA Studio.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-6">
        <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 tracking-wide uppercase">
                Nom complet <span className="text-studio-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="ex. Sara El Amrani"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 h-12 bg-zinc-900/80 border rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red transition-all
                    ${errors.fullName ? 'border-studio-red' : 'border-zinc-700/80 focus:border-zinc-400'}
                  `}
                />
              </div>
              {errors.fullName && <p className="text-xs text-studio-red">{errors.fullName}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 tracking-wide uppercase">
                Numéro de téléphone <span className="text-studio-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="+212 6 XX XX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 h-12 bg-zinc-900/80 border rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red transition-all
                    ${errors.phone ? 'border-studio-red' : 'border-zinc-700/80 focus:border-zinc-400'}
                  `}
                />
              </div>
              {errors.phone && <p className="text-xs text-studio-red">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 tracking-wide uppercase">
                Email <span className="text-studio-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="sara@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 h-12 bg-zinc-900/80 border rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red transition-all
                    ${errors.email ? 'border-studio-red' : 'border-zinc-700/80 focus:border-zinc-400'}
                  `}
                />
              </div>
              {errors.email && <p className="text-xs text-studio-red">{errors.email}</p>}
            </div>

            {/* Instagram Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 tracking-wide uppercase">
                Instagram @username <span className="text-studio-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Instagram className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="@votre_compte"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className={`
                    w-full pl-10 pr-4 h-12 bg-zinc-900/80 border rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red transition-all
                    ${errors.instagram ? 'border-studio-red' : 'border-zinc-700/80 focus:border-zinc-400'}
                  `}
                />
              </div>
              {errors.instagram && <p className="text-xs text-studio-red">{errors.instagram}</p>}
            </div>
          </div>

          {/* Nombre de personnes */}
          <div className="space-y-2 pt-2 border-t border-studio-border/50">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-studio-red" />
                <span>Nombre de participants au shooting</span>
              </label>
              <span className="text-xs font-mono text-zinc-400">
                {peopleCount} {peopleCount > 1 ? 'personnes' : 'personne'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-w-md">
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = peopleCount === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPeopleCount(num)}
                    className={`
                      h-11 rounded-xl text-sm font-semibold flex items-center justify-center transition-all
                      ${
                        isSelected
                          ? 'bg-white text-black font-bold shadow-md shadow-white/10 ring-1 ring-studio-red'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                      }
                    `}
                  >
                    {num === 5 ? '5+' : num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Notes (Optional) */}
          <div className="space-y-1.5 pt-2 border-t border-studio-border/50">
            <label className="block text-xs font-semibold text-zinc-300 tracking-wide uppercase flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Précisions sur votre projet (optionnel)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Idée de shooting, moodboard, tenues, type d'éclairage souhaité..."
              value={projectNotes}
              onChange={(e) => setProjectNotes(e.target.value)}
              className="w-full p-3.5 bg-zinc-900/80 border border-zinc-700/80 rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red resize-none transition-all"
            />
          </div>
        </div>

        {/* Sticky CTA Button */}
        <div className="pt-2 sticky bottom-4 z-20">
          <button
            type="submit"
            className="w-full h-14 rounded-2xl font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 active:scale-[0.99] transition-all duration-200 shadow-xl shadow-white/10 cursor-pointer"
          >
            <span>Continuer vers le calendrier & créneau</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
