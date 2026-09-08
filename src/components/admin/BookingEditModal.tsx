import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus, StudioPackage, StudioSettings } from '../../types';
import { X, Calendar, Clock, User, Phone, Mail, Instagram, FileText, Check, AlertTriangle } from 'lucide-react';

interface BookingEditModalProps {
  booking: Booking | null; // null if creating
  packages: StudioPackage[];
  settings: StudioSettings;
  existingBookings: Booking[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Booking>) => void;
}

export const BookingEditModal: React.FC<BookingEditModalProps> = ({
  booking,
  packages,
  settings,
  existingBookings,
  isOpen,
  onClose,
  onSave,
}) => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [packageId, setPackageId] = useState('');
  const [price, setPrice] = useState<number>(1500);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [status, setStatus] = useState<BookingStatus>('confirmed');
  const [adminNotes, setAdminNotes] = useState('');
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  useEffect(() => {
    if (booking) {
      setDate(booking.date);
      setTimeSlot(booking.timeSlot);
      setPackageId(booking.packageId);
      setPrice(booking.packagePrice);
      setFullName(booking.fullName);
      setPhone(booking.phone);
      setEmail(booking.email);
      setInstagram(booking.instagram);
      setPeopleCount(booking.peopleCount);
      setStatus(booking.status);
      setAdminNotes(booking.adminNotes || '');
    } else {
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      setTimeSlot(settings.availableTimeSlots[0] || '10:00');
      const defaultPkg = packages[0];
      setPackageId(defaultPkg?.id || 'pack-standard');
      setPrice(defaultPkg?.price || 1500);
      setFullName('');
      setPhone('+212 ');
      setEmail('');
      setInstagram('@');
      setPeopleCount(1);
      setStatus('confirmed');
      setAdminNotes('');
    }
  }, [booking, packages, settings, isOpen]);

  // Check conflicts whenever date or slot changes
  useEffect(() => {
    if (!date || !timeSlot) {
      setConflictWarning(null);
      return;
    }

    // Is there another active booking at this date & slot?
    const conflict = existingBookings.find(
      (b) =>
        b.date === date &&
        b.timeSlot === timeSlot &&
        b.status !== 'cancelled' &&
        (!booking || b.id !== booking.id)
    );

    if (conflict) {
      setConflictWarning(
        `Attention : un créneau actif existe déjà pour ${conflict.fullName} (${conflict.packageName}) à cette heure.`
      );
    } else {
      setConflictWarning(null);
    }
  }, [date, timeSlot, existingBookings, booking]);

  if (!isOpen) return null;

  const handlePackageChange = (id: string) => {
    setPackageId(id);
    const selected = packages.find((p) => p.id === id);
    if (selected) {
      setPrice(selected.price);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPkg = packages.find((p) => p.id === packageId) || packages[0];

    let formattedIg = instagram.trim();
    if (formattedIg && !formattedIg.startsWith('@')) {
      formattedIg = '@' + formattedIg;
    }

    onSave({
      date,
      timeSlot,
      packageId: selectedPkg?.id || 'pack-standard',
      packageName: selectedPkg?.name || 'STANDARD',
      packageDuration: selectedPkg?.duration || 2,
      packagePrice: price,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      instagram: formattedIg,
      peopleCount,
      status,
      adminNotes: adminNotes.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-studio-card border border-studio-border rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-studio-red" />
            <span>{booking ? 'Modifier la réservation' : 'Ajouter une réservation manuelle'}</span>
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Double-booking Warning */}
        {conflictWarning && (
          <div className="bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{conflictWarning}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Date de séance
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Créneau horaire
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-mono"
              >
                {settings.availableTimeSlots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Package & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Prestation
              </label>
              <select
                value={packageId}
                onChange={(e) => handlePackageChange(e.target.value)}
                className="w-full px-3 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              >
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.duration}h) — {p.price} DH
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Prix facturé (DH)
              </label>
              <input
                type="number"
                min={0}
                step={50}
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-mono"
              />
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Nom complet
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Téléphone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Instagram @
              </label>
              <input
                type="text"
                required
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>
          </div>

          {/* People & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Nombre de personnes
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full px-3.5 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BookingStatus)}
                className="w-full px-3 h-10 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-semibold"
              >
                <option value="new">Nouvelle</option>
                <option value="confirmed">Confirmée</option>
                <option value="pending">En attente</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          </div>

          {/* Internal Studio Note */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Note interne Studio (matériel, acompte, demandes...)
            </label>
            <textarea
              rows={2}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full p-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-800 text-zinc-300 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-studio-red hover:bg-studio-redHover text-white flex items-center gap-1.5 transition-all shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{booking ? 'Mettre à jour' : 'Enregistrer la séance'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
