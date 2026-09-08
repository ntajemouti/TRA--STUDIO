import React, { useState } from 'react';
import { Booking, ClientUser } from '../../types';
import { CheckCircle2, Key, Lock, ArrowRight, Sparkles, ShieldCheck, Mail, Phone } from 'lucide-react';
import { registerClientUser } from '../../data/storage';

interface PostBookingAccountPromptProps {
  booking: Booking;
  onAccountCreated: (user: ClientUser) => void;
  onContinueAsGuest: () => void;
}

export const PostBookingAccountPrompt: React.FC<PostBookingAccountPromptProps> = ({
  booking,
  onAccountCreated,
  onContinueAsGuest,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = registerClientUser({
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        instagram: booking.instagram,
        password: password,
      });

      onAccountCreated(newUser);
    } catch (err) {
      setError('Une erreur est survenue lors de la création du compte.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Success Badge */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
          <span>Demande Enregistrée avec Succès</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Votre séance est pré-réservée !
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Nous avons bien reçu votre demande pour <strong className="text-white font-bold">{booking.packageName}</strong> le <strong className="text-white font-bold">{booking.date}</strong> à <strong className="text-white font-bold">{booking.timeSlot}</strong>.
        </p>
      </div>

      {/* Optional Account Creation Card */}
      <div className="bg-studio-card border border-studio-border rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-start gap-3.5 pb-4 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-studio-red shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-white">
              Créer votre espace client personnel
            </h3>
            <p className="text-xs text-zinc-400">
              Définissez un mot de passe pour suivre l'état de validation en direct et retrouver facilement toutes vos séances futures.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs font-semibold animate-in fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateAccount} className="space-y-4">
          <div className="space-y-1 text-left">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Votre Identifiant (Email)
            </label>
            <div className="px-3.5 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-xs text-zinc-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              <span>{booking.email}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Mot de passe <span className="text-studio-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Min. 6 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Confirmer le mot de passe <span className="text-studio-red">*</span>
              </label>
              <input
                type="password"
                required
                placeholder="Répétez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-studio-red/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Key className="w-4 h-4" />
            <span>Créer mon espace & Suivre ma réservation</span>
          </button>
        </form>

        <div className="pt-3 border-t border-zinc-800/80 text-center">
          <button
            type="button"
            onClick={onContinueAsGuest}
            className="text-xs text-zinc-500 hover:text-zinc-300 underline transition-colors cursor-pointer"
          >
            Continuer sans créer de mot de passe (mode invité)
          </button>
        </div>
      </div>
    </div>
  );
};
