import React from 'react';
import { Booking, StudioSettings } from '../../types';
import { CheckCircle2, Instagram, Phone, Calendar, Clock, Sparkles, MessageCircle, RotateCcw } from 'lucide-react';

interface Step5SuccessProps {
  booking: Booking;
  settings: StudioSettings;
  onNewBooking: () => void;
}

export const Step5Success: React.FC<Step5SuccessProps> = ({
  booking,
  settings,
  onNewBooking,
}) => {
  const formattedDate = React.useMemo(() => {
    const d = new Date(booking.date + 'T00:00:00');
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [booking.date]);

  // Direct Instagram DM link
  const instagramDmUrl = settings.instagramUrl || 'https://www.instagram.com/tra__studio?igsi=MThkb3NqdzBmODVuYQ==';
  const phoneTelUrl = `tel:${settings.phone.replace(/[\s-]/g, '')}`;

  // WhatsApp Pre-filled text
  const whatsappNumber = settings.whatsappNumber || '212660719968';
  const whatsappMessage = encodeURIComponent(
    `Bonjour TRA Studio ! Je viens de réserver ma séance sur votre plateforme :\n\n` +
    `👤 Nom : ${booking.fullName}\n` +
    `📸 Prestation : Pack ${booking.packageName} (${booking.packageDuration}h)\n` +
    `📅 Date : ${booking.date} à ${booking.timeSlot}\n` +
    `📱 Instagram : ${booking.instagram}\n` +
    `💰 Tarif : ${booking.packagePrice} DH\n\n` +
    `Pouvez-vous me confirmer la disponibilité ? Merci !`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="w-full space-y-6 text-center animate-in fade-in zoom-in-95 duration-400 pt-2">
      {/* Success Badge */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-11 h-11" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-studio-red flex items-center justify-center text-white">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Réservation reçue ✓
          </h1>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Votre demande a bien été transmise à notre équipe.
            <br />
            Nous vous recontactons très rapidement pour confirmer votre créneau.
          </p>
        </div>
      </div>

      {/* Recap Box */}
      <div className="bg-studio-card border border-studio-border rounded-3xl p-6 sm:p-7 max-w-xl mx-auto text-left shadow-2xl space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 border-b border-studio-border/50 pb-3 flex items-center justify-between">
          <span>Récapitulatif de votre séance</span>
          <span className="text-studio-red font-bold">#{booking.id.slice(-6).toUpperCase()}</span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-studio-red" />
              <span>Date de la séance</span>
            </span>
            <span className="text-white font-bold capitalize">{formattedDate}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-studio-red" />
              <span>Horaire</span>
            </span>
            <span className="text-white font-bold">{booking.timeSlot}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Formule choisie</span>
            <span className="text-white font-semibold">{booking.packageName} ({booking.packageDuration}h)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Tarif studio</span>
            <span className="text-white font-black text-base">{booking.packagePrice} DH</span>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-studio-border/40">
            <span className="text-zinc-400">Client</span>
            <span className="text-zinc-200 font-semibold">{booking.fullName} ({booking.instagram})</span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3 max-w-xl mx-auto pt-2">
        {/* WhatsApp Fast Confirmation (Instant Owner Ping) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-13 py-3.5 px-4 w-full rounded-2xl font-bold text-sm tracking-wide bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 active:scale-[0.99] transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Confirmer ma séance sur WhatsApp</span>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {/* Instagram Direct Message */}
          <a
            href={instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 py-2.5 px-3 rounded-xl font-semibold text-xs tracking-wide bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-md"
          >
            <Instagram className="w-4 h-4" />
            <span>Contacter sur Instagram</span>
          </a>

          {/* Call Studio Direct */}
          <a
            href={phoneTelUrl}
            className="h-12 py-2.5 px-3 rounded-xl font-semibold text-xs tracking-wide bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Appeler TRA Studio</span>
          </a>
        </div>

        {/* Restart button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onNewBooking}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Faire une autre réservation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
