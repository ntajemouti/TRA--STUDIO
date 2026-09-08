import React, { useState } from 'react';
import { Booking, StudioSettings } from '../../types';
import {
  CheckCircle2,
  Clock,
  Calendar,
  User,
  Phone,
  Mail,
  Instagram,
  Users,
  FileText,
  Edit3,
  MessageCircle,
  Share2,
  Sparkles,
  Check,
  AlertCircle,
  RotateCcw,
  X,
} from 'lucide-react';

interface ClientDashboardProps {
  booking: Booking;
  settings: StudioSettings;
  onUpdateClientInfo: (updates: Partial<Booking>) => void;
  onNewBooking: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  booking,
  settings,
  onUpdateClientInfo,
  onNewBooking,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Edit form state
  const [editFullName, setEditFullName] = useState(booking.fullName);
  const [editPhone, setEditPhone] = useState(booking.phone);
  const [editEmail, setEditEmail] = useState(booking.email);
  const [editInstagram, setEditInstagram] = useState(booking.instagram);
  const [editPeopleCount, setEditPeopleCount] = useState(booking.peopleCount || 1);
  const [editNotes, setEditNotes] = useState(booking.projectNotes || '');

  // Formatted date
  const formattedDate = React.useMemo(() => {
    const d = new Date(booking.date + 'T00:00:00');
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [booking.date]);

  const bookingCode = '#' + booking.id.slice(-6).toUpperCase();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    let formattedIg = editInstagram.trim();
    if (formattedIg && !formattedIg.startsWith('@')) {
      formattedIg = '@' + formattedIg;
    }

    onUpdateClientInfo({
      fullName: editFullName.trim(),
      phone: editPhone.trim(),
      email: editEmail.trim(),
      instagram: formattedIg,
      peopleCount: editPeopleCount,
      projectNotes: editNotes.trim(),
    });

    setIsEditing(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3500);
  };

  // WhatsApp link pre-filled
  const whatsappNumber = settings.whatsappNumber || '212660719968';
  const whatsappMsg = encodeURIComponent(
    `Bonjour TRA Studio ! Je vous contacte concernant ma réservation ${bookingCode} :\n` +
    `👤 ${booking.fullName} (@${booking.instagram.replace('@', '')})\n` +
    `📸 Pack ${booking.packageName} le ${booking.date} à ${booking.timeSlot}.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;
  const instagramUrl = settings.instagramUrl || `https://www.instagram.com/${settings.instagramHandle}`;
  const phoneTelUrl = `tel:${settings.phone.replace(/[\s-]/g, '')}`;

  // Status mapping
  const statusConfig = {
    new: {
      label: 'Demande en cours d’examen',
      badgeClass: 'bg-amber-950/60 border-amber-800/80 text-amber-300',
      dotClass: 'bg-amber-400 animate-pulse',
      desc: 'Notre équipe vérifie la disponibilité studio. Vous recevrez une validation très rapidement.',
    },
    confirmed: {
      label: 'Séance confirmée ✓',
      badgeClass: 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300',
      dotClass: 'bg-emerald-400',
      desc: 'Votre créneau studio est verrouillé. Nous vous attendons au studio à l’heure prévue !',
    },
    pending: {
      label: 'En attente d’échange',
      badgeClass: 'bg-blue-950/60 border-blue-800/80 text-blue-300',
      dotClass: 'bg-blue-400 animate-pulse',
      desc: 'Nous avons besoin d’une précision sur votre séance. Consultez vos messages WhatsApp/Instagram.',
    },
    completed: {
      label: 'Séance réalisée',
      badgeClass: 'bg-purple-950/60 border-purple-800/80 text-purple-300',
      dotClass: 'bg-purple-400',
      desc: 'Shooting terminé ! Vos photos et vidéos sont en cours de post-production.',
    },
    cancelled: {
      label: 'Réservation annulée',
      badgeClass: 'bg-rose-950/60 border-rose-800/80 text-rose-300',
      dotClass: 'bg-rose-500',
      desc: 'Cette séance a été annulée. Contactez le studio pour replanifier une date.',
    },
  }[booking.status] || {
    label: 'Statut actif',
    badgeClass: 'bg-zinc-900 border-zinc-700 text-zinc-300',
    dotClass: 'bg-zinc-400',
    desc: 'Votre séance est enregistrée.',
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Banner & Booking Reference */}
      <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-studio-border/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-studio-red flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Espace Réservation Client</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Bonjour, {booking.fullName.split(' ')[0]} 👋
            </h1>
          </div>

          {/* Reference badge with copy action */}
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 border border-zinc-700 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-zinc-200 flex items-center gap-2">
              <span>Réf : {bookingCode}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-zinc-500 hover:text-white transition-colors"
                title="Copier le numéro de réservation"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Status Card */}
        <div className={`rounded-2xl border p-4 sm:p-5 ${statusConfig.badgeClass}`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${statusConfig.dotClass}`}></span>
            <h2 className="text-sm font-bold tracking-wide uppercase">
              {statusConfig.label}
            </h2>
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            {statusConfig.desc}
          </p>
        </div>

        {updateSuccess && (
          <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Vos informations ont été modifiées et transmises au studio avec succès !</span>
          </div>
        )}
      </div>

      {/* Responsive Grid: Session Recap on Left, Client Info on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 text-left items-start">
        {/* Card 1: Session Details */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border/50">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-zinc-300">
              Détails de la séance
            </h3>
            <span className="text-[11px] font-mono text-studio-red font-bold uppercase">
              {booking.packageName}
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-studio-red" />
                <span>Date</span>
              </span>
              <span className="text-white font-bold capitalize">{formattedDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-studio-red" />
                <span>Horaire</span>
              </span>
              <span className="text-white font-bold">{booking.timeSlot}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Durée prévue</span>
              <span className="text-zinc-200 font-semibold">{booking.packageDuration} {booking.packageDuration > 1 ? 'heures' : 'heure'}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-studio-border/40">
              <span className="text-zinc-400 font-semibold">Tarif total</span>
              <span className="text-xl font-black text-white">{booking.packagePrice} <span className="text-xs text-studio-red">DH</span></span>
            </div>
          </div>
        </div>

        {/* Card 2: Client Info + Edit Action */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border/50">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-zinc-300">
              Vos coordonnées
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg border border-zinc-700 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-studio-red" />
              <span>Modifier</span>
            </button>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-500" />
                <span>Nom</span>
              </span>
              <span className="text-white font-semibold">{booking.fullName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span>Téléphone</span>
              </span>
              <span className="text-white font-semibold font-mono">{booking.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>Email</span>
              </span>
              <span className="text-white font-semibold truncate max-w-[200px]">{booking.email}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-studio-red" />
                <span>Instagram</span>
              </span>
              <span className="text-studio-red font-bold">{booking.instagram}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Participants</span>
              <span className="text-white font-semibold">{booking.peopleCount} personne(s)</span>
            </div>

            {booking.projectNotes && (
              <div className="pt-2 border-t border-studio-border/40">
                <span className="text-zinc-400 block mb-1 text-xs">Notes :</span>
                <p className="text-zinc-300 italic text-xs bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                  "{booking.projectNotes}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 text-center sm:text-left">
          Besoin d’échanger avec l’équipe TRA Studio ?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 py-3 px-4 rounded-xl font-bold text-xs tracking-wide bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Direct</span>
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 py-3 px-4 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram Direct</span>
          </a>

          <a
            href={phoneTelUrl}
            className="h-12 py-3 px-4 rounded-xl font-bold text-xs tracking-wide bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Appeler le studio</span>
          </a>
        </div>
      </div>

      {/* Restart / New Booking link */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onNewBooking}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Faire une autre réservation</span>
        </button>
      </div>

      {/* Modal: Modifier mes coordonnées */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-studio-card border border-studio-border rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-studio-border/60">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-studio-red" />
                <span>Modifier mes coordonnées</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full px-3.5 h-11 bg-zinc-900 border border-zinc-700 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 h-11 bg-zinc-900 border border-zinc-700 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase">
                    Compte Instagram
                  </label>
                  <input
                    type="text"
                    required
                    value={editInstagram}
                    onChange={(e) => setEditInstagram(e.target.value)}
                    className="w-full px-3.5 h-11 bg-zinc-900 border border-zinc-700 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 h-11 bg-zinc-900 border border-zinc-700 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Nombre de personnes ({editPeopleCount})
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setEditPeopleCount(n)}
                      className={`h-10 rounded-xl text-xs font-bold transition-all ${
                        editPeopleCount === n
                          ? 'bg-white text-black ring-1 ring-studio-red'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {n === 5 ? '5+' : n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-300 uppercase">
                  Précisions sur votre projet
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-studio-red resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-all shadow-md"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
