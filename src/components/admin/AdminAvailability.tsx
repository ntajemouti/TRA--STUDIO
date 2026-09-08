import React, { useState } from 'react';
import { StudioSettings } from '../../types';
import { Clock, Calendar, Ban, Check, Plus, Trash2, ShieldCheck, AlertTriangle } from 'lucide-react';

interface AdminAvailabilityProps {
  settings: StudioSettings;
  onSaveSettings: (settings: StudioSettings) => void;
}

const DAYS_MAP = [
  { id: 1, name: 'Lundi' },
  { id: 2, name: 'Mardi' },
  { id: 3, name: 'Mercredi' },
  { id: 4, name: 'Jeudi' },
  { id: 5, name: 'Vendredi' },
  { id: 6, name: 'Samedi' },
  { id: 0, name: 'Dimanche' },
];

export const AdminAvailability: React.FC<AdminAvailabilityProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [newSlotInput, setNewSlotInput] = useState('');
  const [newBlockedDateInput, setNewBlockedDateInput] = useState('');

  // Toggle open days
  const toggleDay = (dayId: number) => {
    let updated: number[];
    if (settings.openDays.includes(dayId)) {
      updated = settings.openDays.filter((d) => d !== dayId);
    } else {
      updated = [...settings.openDays, dayId].sort();
    }
    onSaveSettings({ ...settings, openDays: updated });
  };

  // Add slot
  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newSlotInput.trim();
    if (!clean) return;

    // Check format (e.g. "10:00")
    if (!settings.availableTimeSlots.includes(clean)) {
      const sorted = [...settings.availableTimeSlots, clean].sort();
      onSaveSettings({ ...settings, availableTimeSlots: sorted });
    }
    setNewSlotInput('');
  };

  // Remove slot
  const handleRemoveSlot = (slot: string) => {
    const updated = settings.availableTimeSlots.filter((s) => s !== slot);
    onSaveSettings({ ...settings, availableTimeSlots: updated });
  };

  // Add blocked date
  const handleAddBlockedDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedDateInput) return;
    if (!settings.blockedDates.includes(newBlockedDateInput)) {
      const updated = [...settings.blockedDates, newBlockedDateInput].sort();
      onSaveSettings({ ...settings, blockedDates: updated });
    }
    setNewBlockedDateInput('');
  };

  // Remove blocked date
  const handleRemoveBlockedDate = (dateStr: string) => {
    const updated = settings.blockedDates.filter((d) => d !== dateStr);
    onSaveSettings({ ...settings, blockedDates: updated });
  };

  // Remove blocked slot
  const handleRemoveBlockedSlot = (date: string, slot: string) => {
    const updated = settings.blockedSlots.filter(
      (s) => !(s.date === date && s.slot === slot)
    );
    onSaveSettings({ ...settings, blockedSlots: updated });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-studio-card border border-studio-border p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-studio-red" />
            <span>Disponibilités & Horaires du Studio</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Définissez les jours ouverts, les créneaux proposés et les jours exceptionnellement fermés.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/60 px-3.5 py-1.5 rounded-xl text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Protection anti double-réservation activée</span>
        </div>
      </div>

      {/* Grid: Open days & Available Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Open Days */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-4 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-studio-red" />
              <span>Jours d'ouverture hebdomadaire</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Les jours désactivés seront automatiquement grisés pour vos clients.
            </p>
          </div>

          <div className="space-y-2">
            {DAYS_MAP.map((d) => {
              const isOpen = settings.openDays.includes(d.id);
              return (
                <div
                  key={d.id}
                  onClick={() => toggleDay(d.id)}
                  className={`
                    p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all
                    ${
                      isOpen
                        ? 'bg-zinc-900 border-zinc-700 text-white'
                        : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'
                    }
                  `}
                >
                  <span className="text-xs font-semibold">{d.name}</span>
                  <div
                    className={`
                      w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors
                      ${
                        isOpen
                          ? 'bg-studio-red text-white'
                          : 'border border-zinc-800 bg-zinc-900'
                      }
                    `}
                  >
                    {isOpen && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Time Slots */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-4 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-studio-red" />
              <span>Créneaux horaires proposés</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Horaires de début de séance affichés sur l'Écran 1.
            </p>
          </div>

          {/* Add new slot */}
          <form onSubmit={handleAddSlot} className="flex gap-2">
            <input
              type="text"
              placeholder="ex. 19:00"
              value={newSlotInput}
              onChange={(e) => setNewSlotInput(e.target.value)}
              className="px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red flex-1 font-mono"
            />
            <button
              type="submit"
              className="px-4 h-10 bg-white text-black hover:bg-zinc-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter</span>
            </button>
          </form>

          {/* Existing Slots chips */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
            {settings.availableTimeSlots.map((slot) => (
              <div
                key={slot}
                className="bg-zinc-900 border border-zinc-700/80 rounded-xl p-2.5 flex items-center justify-between text-xs group hover:border-zinc-500 transition-colors"
              >
                <span className="font-mono font-bold text-white">{slot}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(slot)}
                  className="text-zinc-600 group-hover:text-rose-400 hover:scale-110 transition-all"
                  title="Supprimer ce créneau"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blocked Dates & Blocked Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blocked Dates (Fermetures exceptionnelles) */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-4 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-400" />
              <span>Dates fermées / Bloquées</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Jours fériés, maintenance studio, vacances ou tournages réservés en externe.
            </p>
          </div>

          <form onSubmit={handleAddBlockedDate} className="flex gap-2">
            <input
              type="date"
              value={newBlockedDateInput}
              onChange={(e) => setNewBlockedDateInput(e.target.value)}
              className="px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red flex-1"
            />
            <button
              type="submit"
              className="px-4 h-10 bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Bloquer</span>
            </button>
          </form>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {settings.blockedDates.length === 0 ? (
              <p className="text-xs text-zinc-600 italic">Aucune date bloquée actuellement.</p>
            ) : (
              settings.blockedDates.map((dStr) => (
                <div
                  key={dStr}
                  className="bg-zinc-900/60 border border-rose-950/40 rounded-xl p-2.5 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-rose-200">
                    {new Date(dStr + 'T00:00:00').toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlockedDate(dStr)}
                    className="text-zinc-500 hover:text-white text-xs px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700"
                  >
                    Débloquer
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Specific Blocked Slots */}
        <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-4 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Créneaux ponctuels bloqués</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Créneaux verrouillés depuis le calendrier pour un jour donné.
            </p>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {settings.blockedSlots.length === 0 ? (
              <p className="text-xs text-zinc-600 italic">
                Aucun créneau individuel bloqué. Vous pouvez aussi bloquer un créneau directement en un clic depuis le calendrier.
              </p>
            ) : (
              settings.blockedSlots.map((bs, idx) => (
                <div
                  key={`${bs.date}-${bs.slot}-${idx}`}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-2.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{bs.slot}</span>
                    <span className="text-zinc-400">le {bs.date}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlockedSlot(bs.date, bs.slot)}
                    className="text-zinc-500 hover:text-white text-xs px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700"
                  >
                    Libérer
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Studio Contact Settings Card */}
      <div className="bg-studio-card border border-studio-border rounded-2xl p-5 space-y-4 shadow-xl">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-studio-red" />
            <span>Coordonnées Officielles du Studio</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Informations utilisées pour les liens WhatsApp, Appels téléphoniques et profil Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-zinc-300 uppercase">
              Téléphone & Appels direct
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => onSaveSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-zinc-300 uppercase">
              Numéro WhatsApp (sans + ni espaces)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber || ''}
              onChange={(e) => onSaveSettings({ ...settings, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
              placeholder="ex. 212660719968"
              className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-zinc-300 uppercase">
              Email Officiel
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => onSaveSettings({ ...settings, email: e.target.value })}
              className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-zinc-300 uppercase">
              Lien Profil Instagram
            </label>
            <input
              type="url"
              value={settings.instagramUrl}
              onChange={(e) => onSaveSettings({ ...settings, instagramUrl: e.target.value })}
              className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
