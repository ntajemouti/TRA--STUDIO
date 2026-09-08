import React, { useState } from 'react';
import { ClientUser, Booking } from '../../types';
import { X, Mail, Lock, LogIn, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { loginClientUser, getBookingsByEmail, setCurrentClientUser } from '../../data/storage';

interface ClientAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: ClientUser, bookings: Booking[]) => void;
}

export const ClientAuthModal: React.FC<ClientAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const user = loginClientUser(normalizedEmail, password.trim() || undefined);
    const clientBookings = getBookingsByEmail(normalizedEmail);

    if (user) {
      setCurrentClientUser(user);
      onSuccessLogin(user, clientBookings);
      onClose();
    } else if (clientBookings.length > 0) {
      // User has bookings under this email, let them access as verified guest
      const guestUser: ClientUser = {
        id: 'guest-' + Date.now().toString(36),
        fullName: clientBookings[0].fullName,
        email: normalizedEmail,
        phone: clientBookings[0].phone,
        instagram: clientBookings[0].instagram,
        createdAt: new Date().toISOString(),
      };
      setCurrentClientUser(guestUser);
      onSuccessLogin(guestUser, clientBookings);
      onClose();
    } else {
      setError('Aucune réservation trouvée pour cette adresse email.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="space-y-0.5 text-left">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-studio-red" />
              <span>Espace Client Personnel</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Accédez au suivi de vos réservations et gérez vos séances.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Adresse Email de réservation
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="votre-email@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Mot de passe (si configuré)
              </label>
              <span className="text-[10px] text-zinc-500 font-medium">Optionnel</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Accéder à mes réservations</span>
          </button>
        </form>
      </div>
    </div>
  );
};
