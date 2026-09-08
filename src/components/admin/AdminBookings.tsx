import React, { useState, useMemo } from 'react';
import { Booking, BookingStatus } from '../../types';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Phone,
  Mail,
  Instagram,
  User,
  MoreHorizontal,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  MessageCircle,
} from 'lucide-react';

interface AdminBookingsProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: BookingStatus) => void;
  onEditBooking: (booking: Booking) => void;
  onDeleteBooking: (id: string) => void;
}

export const AdminBookings: React.FC<AdminBookingsProps> = ({
  bookings,
  onUpdateStatus,
  onEditBooking,
  onDeleteBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Status match
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;

      // Search match
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = b.fullName.toLowerCase().includes(q);
        const matchesPhone = b.phone.toLowerCase().includes(q);
        const matchesEmail = b.email.toLowerCase().includes(q);
        const matchesIg = b.instagram.toLowerCase().includes(q);
        const matchesPkg = b.packageName.toLowerCase().includes(q);
        const matchesDate = b.date.includes(q);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesIg && !matchesPkg && !matchesDate) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, searchTerm, statusFilter]);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'new':
        return { label: 'Nouvelle', bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30' };
      case 'confirmed':
        return { label: 'Confirmée', bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
      case 'pending':
        return { label: 'En attente', bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
      case 'completed':
        return { label: 'Terminée', bg: 'bg-zinc-700/40 text-zinc-300 border-zinc-600/40' };
      case 'cancelled':
        return { label: 'Annulée', bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30' };
      default:
        return { label: status, bg: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-studio-card border border-studio-border p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone, @instagram, date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 h-10 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-studio-red"
          />
        </div>

        {/* Status Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'new', label: 'Nouvelles' },
            { id: 'confirmed', label: 'Confirmées' },
            { id: 'pending', label: 'En attente' },
            { id: 'completed', label: 'Terminées' },
            { id: 'cancelled', label: 'Annulées' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List / Table */}
      {filteredBookings.length === 0 ? (
        <div className="bg-studio-card border border-studio-border rounded-2xl p-12 text-center space-y-2">
          <FileText className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-semibold text-white">Aucune réservation trouvée</h3>
          <p className="text-xs text-zinc-500">
            Modifiez vos filtres ou effectuez une nouvelle recherche.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((b) => {
            const badge = getStatusBadge(b.status);
            const formattedDate = new Date(b.date + 'T00:00:00').toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={b.id}
                className="bg-studio-card border border-studio-border hover:border-zinc-700 rounded-2xl p-4 sm:p-5 transition-all shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-bold text-sm">
                      {b.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{b.fullName}</h4>
                        <span className="text-xs font-semibold text-studio-red">
                          {b.instagram}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                        <a href={`tel:${b.phone}`} className="hover:text-white flex items-center gap-1 font-medium">
                          <Phone className="w-3 h-3 text-studio-red" />
                          <span>{b.phone}</span>
                        </a>

                        {b.phone && (
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Bonjour ${b.fullName}, c'est TRA Studio concernant votre réservation pour « ${b.packageName} » prévue le ${b.date} à ${b.timeSlot}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800 text-emerald-400 hover:text-emerald-300 font-semibold"
                            title="Envoyer un message WhatsApp au client"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        <span className="hidden sm:inline text-zinc-600">•</span>
                        <span className="hidden sm:inline">{b.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-right">
                      <span className="text-base font-extrabold text-white">
                        {b.packagePrice.toLocaleString('fr-FR')}
                      </span>
                      <span className="text-xs font-bold text-studio-red ml-1">DH</span>
                    </div>

                    <select
                      value={b.status}
                      onChange={(e) => onUpdateStatus(b.id, e.target.value as BookingStatus)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-studio-red ${badge.bg}`}
                    >
                      <option value="new">Nouvelle</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="pending">En attente</option>
                      <option value="completed">Terminée</option>
                      <option value="cancelled">Annulée</option>
                    </select>

                    <button
                      onClick={() => onEditBooking(b)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                      title="Modifier les détails"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteBooking(b.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-studio-red" />
                    <span>{formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-studio-red" />
                    <span>{b.timeSlot} ({b.packageDuration}h)</span>
                  </div>

                  <div className="text-zinc-300">
                    <span className="text-zinc-500">Pack : </span>
                    <span className="font-semibold text-white">{b.packageName}</span>
                  </div>

                  <div className="text-zinc-300">
                    <span className="text-zinc-500">Personnes : </span>
                    <span>{b.peopleCount}</span>
                  </div>
                </div>

                {/* Client Notes & Admin Notes */}
                {(b.projectNotes || b.adminNotes) && (
                  <div className="pt-2 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {b.projectNotes && (
                      <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                        <span className="text-[10px] font-bold uppercase text-zinc-500 block mb-0.5">
                          Note du client :
                        </span>
                        <p className="text-zinc-300 italic">{b.projectNotes}</p>
                      </div>
                    )}
                    {b.adminNotes && (
                      <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                        <span className="text-[10px] font-bold uppercase text-studio-red block mb-0.5">
                          Note interne Studio :
                        </span>
                        <p className="text-zinc-300">{b.adminNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
