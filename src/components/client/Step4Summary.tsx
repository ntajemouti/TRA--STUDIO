import React from 'react';
import { BookingDraft } from '../../types';
import { ArrowLeft, Calendar, Clock, Sparkles, User, Phone, Mail, Instagram, ShieldCheck, Check } from 'lucide-react';

interface Step4SummaryProps {
  draft: BookingDraft;
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const Step4Summary: React.FC<Step4SummaryProps> = ({
  draft,
  onConfirm,
  onBack,
  isSubmitting = false,
}) => {
  // Format date in French
  const formattedDate = React.useMemo(() => {
    if (!draft.date) return 'Date non sélectionnée';
    const d = new Date(draft.date + 'T00:00:00');
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [draft.date]);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-studio-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modifier la date ou l'heure</span>
        </button>
      </div>

      <div className="text-center sm:text-left space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Votre réservation
        </h1>
        <p className="text-sm text-studio-muted">
          Vérifiez les détails avant de confirmer votre créneau.
        </p>
      </div>

      {/* Summary Responsive Grid (1 col mobile, 2 col desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start">
        {/* Session Details Card */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-6 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border/60">
            <span className="text-xs uppercase font-extrabold tracking-widest text-studio-red flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Séance TRA Studio</span>
            </span>
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full font-semibold">
              Créneau réservable
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block">
                Date
              </span>
              <p className="text-sm font-semibold text-white capitalize flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-studio-red shrink-0" />
                <span className="truncate">{formattedDate}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block">
                Heure
              </span>
              <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-studio-red shrink-0" />
                <span>{draft.timeSlot || '--:--'}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block">
                Prestation
              </span>
              <p className="text-sm font-bold text-white">
                {draft.selectedPackage?.name || 'Standard'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block">
                Durée
              </span>
              <p className="text-sm font-medium text-zinc-200">
                {draft.selectedPackage?.duration || 2} {draft.selectedPackage?.duration === 1 ? 'heure' : 'heures'}
              </p>
            </div>
          </div>

          {/* Price Row */}
          <div className="pt-4 border-t border-studio-border/60 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold">
              Tarif séance
            </span>
            <div className="text-right">
              <span className="text-3xl font-black text-white">
                {draft.selectedPackage?.price.toLocaleString('fr-FR') || '1 500'}
              </span>
              <span className="text-sm font-bold text-studio-red ml-1.5">DH</span>
            </div>
          </div>
        </div>

        {/* Client Info Card */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-6 space-y-4 shadow-2xl">
          <h2 className="text-xs uppercase font-extrabold tracking-wider text-zinc-300 pb-2 border-b border-studio-border/40">
            Coordonnées du client
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Nom complet</span>
              </span>
              <span className="text-zinc-100 font-semibold">{draft.fullName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Téléphone</span>
              </span>
              <span className="text-zinc-100 font-semibold">{draft.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </span>
              <span className="text-zinc-100 font-semibold">{draft.email}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-studio-red" />
                <span>Instagram</span>
              </span>
              <span className="text-studio-red font-bold">{draft.instagram}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Participants</span>
              <span className="text-zinc-100 font-semibold">
                {draft.peopleCount} {draft.peopleCount > 1 ? 'personnes' : 'personne'}
              </span>
            </div>

            {draft.projectNotes && (
              <div className="pt-2.5 border-t border-studio-border/40">
                <span className="text-zinc-500 block mb-1">Précisions :</span>
                <p className="text-zinc-300 italic bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                  "{draft.projectNotes}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Micro-guarantee */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
        <ShieldCheck className="w-4 h-4 text-studio-red" />
        <span>Confirmation rapide par notre équipe sous 2h ouvrées</span>
      </div>

      {/* Sticky Primary CTA */}
      <div className="pt-2 sticky bottom-4 z-20">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onConfirm}
          className="w-full h-14 rounded-2xl font-bold text-base tracking-wide flex items-center justify-center gap-2 bg-studio-red hover:bg-studio-redHover text-white shadow-xl shadow-studio-red/30 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Enregistrement en cours...</span>
            </span>
          ) : (
            <>
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Confirmer la réservation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
