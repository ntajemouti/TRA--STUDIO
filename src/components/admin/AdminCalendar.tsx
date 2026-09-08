import React, { useState, useMemo } from 'react';
import { Booking, StudioSettings } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Ban,
  User,
  Instagram,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock4
} from 'lucide-react';

interface AdminCalendarProps {
  bookings: Booking[];
  settings: StudioSettings;
  onAddBooking: () => void;
  onEditBooking: (booking: Booking) => void;
  onBlockDateToggle: (date: string) => void;
  onBlockSlotToggle: (date: string, slot: string) => void;
}

type CalendarView = 'month' | 'week' | 'day';

export const AdminCalendar: React.FC<AdminCalendarProps> = ({
  bookings,
  settings,
  onAddBooking,
  onEditBooking,
  onBlockDateToggle,
  onBlockSlotToggle,
}) => {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDayDate, setSelectedDayDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Month navigation
  const handlePrev = () => {
    const d = new Date(currentDate);
    if (view === 'month') d.setMonth(d.getMonth() - 1);
    else if (view === 'week') d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (view === 'month') d.setMonth(d.getMonth() + 1);
    else if (view === 'week') d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDayDate(new Date().toISOString().split('T')[0]);
  };

  // Status color helpers
  const getStatusBadge = (status: Booking['status']) => {
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

  // Monthly grid generation
  const monthData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startOffset = firstDay.getDay() - 1;
    if (startOffset === -1) startOffset = 6;

    const daysInMonth = lastDay.getDate();

    const cells: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];

    // Prev month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const prevD = new Date(year, month - 1, d);
      const str = `${prevD.getFullYear()}-${String(prevD.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ dateStr: str, dayNum: d, isCurrentMonth: false });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const str = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ dateStr: str, dayNum: d, isCurrentMonth: true });
    }

    // Next month padding
    const remainder = (7 - (cells.length % 7)) % 7;
    for (let d = 1; d <= remainder; d++) {
      const nextD = new Date(year, month + 1, d);
      const str = `${nextD.getFullYear()}-${String(nextD.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ dateStr: str, dayNum: d, isCurrentMonth: false });
    }

    return cells;
  }, [currentDate]);

  // Selected day's bookings & slots
  const selectedDayBookings = useMemo(() => {
    return bookings.filter((b) => b.date === selectedDayDate && b.status !== 'cancelled');
  }, [bookings, selectedDayDate]);

  const isSelectedDateBlocked = settings.blockedDates.includes(selectedDayDate);

  return (
    <div className="space-y-6">
      {/* Calendar Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-studio-card border border-studio-border p-4 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg border border-zinc-700 transition-all"
          >
            Aujourd'hui
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white capitalize pl-1">
            {currentDate.toLocaleDateString('fr-FR', {
              month: 'long',
              year: 'numeric',
            })}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="bg-zinc-900 border border-zinc-800 p-0.5 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-lg transition-all ${
                view === 'month' ? 'bg-zinc-800 text-white font-medium shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded-lg transition-all ${
                view === 'day' ? 'bg-zinc-800 text-white font-medium shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Jour
            </button>
          </div>

          <button
            onClick={onAddBooking}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-studio-red hover:bg-studio-redHover text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      {/* Main Calendar View */}
      {view === 'month' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Table (2 cols on desktop) */}
          <div className="lg:col-span-2 bg-studio-card border border-studio-border rounded-2xl p-4 shadow-xl">
            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 pb-2 border-b border-zinc-800 text-center text-[11px] font-semibold uppercase text-zinc-500">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mer</span>
              <span>Jeu</span>
              <span>Ven</span>
              <span>Sam</span>
              <span>Dim</span>
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7 gap-1.5 pt-2">
              {monthData.map((cell) => {
                const isSelected = selectedDayDate === cell.dateStr;
                const isBlocked = settings.blockedDates.includes(cell.dateStr);
                const dayBookings = bookings.filter(
                  (b) => b.date === cell.dateStr && b.status !== 'cancelled'
                );

                return (
                  <button
                    key={cell.dateStr}
                    type="button"
                    onClick={() => setSelectedDayDate(cell.dateStr)}
                    className={`
                      min-h-[70px] sm:min-h-[85px] p-1.5 rounded-xl flex flex-col justify-between text-left transition-all border
                      ${
                        isSelected
                          ? 'border-white bg-zinc-800/80 shadow-md ring-1 ring-white/40'
                          : isBlocked
                          ? 'border-rose-950/40 bg-rose-950/10 opacity-70'
                          : cell.isCurrentMonth
                          ? 'border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800/50'
                          : 'border-transparent opacity-25'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-white' : isBlocked ? 'text-rose-400' : 'text-zinc-300'
                        }`}
                      >
                        {cell.dayNum}
                      </span>
                      {isBlocked && (
                        <span title="Date bloquée">
                          <Ban className="w-3 h-3 text-rose-400" />
                        </span>
                      )}
                    </div>

                    {/* Booking Chips */}
                    <div className="space-y-1 w-full overflow-hidden mt-1">
                      {dayBookings.slice(0, 2).map((bk) => (
                        <div
                          key={bk.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditBooking(bk);
                          }}
                          className={`text-[9px] px-1.5 py-0.5 rounded truncate font-medium flex items-center gap-1 ${
                            bk.status === 'confirmed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-studio-red/20 text-red-200 border border-studio-red/30'
                          }`}
                        >
                          <span className="font-mono">{bk.timeSlot}</span>
                          <span className="truncate">{bk.fullName}</span>
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <span className="text-[9px] text-zinc-400 font-mono block pl-1">
                          +{dayBookings.length - 2} autre(s)
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Date Inspector Sidebar (1 col on desktop) */}
          <div className="bg-studio-card border border-studio-border rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                  Détails de la journée
                </span>
                <h3 className="text-sm font-bold text-white capitalize">
                  {new Date(selectedDayDate + 'T00:00:00').toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h3>
              </div>

              {/* Block/Unblock Day Button */}
              <button
                type="button"
                onClick={() => onBlockDateToggle(selectedDayDate)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  isSelectedDateBlocked
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
                }`}
              >
                <Ban className="w-3 h-3" />
                <span>{isSelectedDateBlocked ? 'Débloquer date' : 'Bloquer date'}</span>
              </button>
            </div>

            {/* List of slots & booking status */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                Créneaux & Réservations
              </span>

              {settings.availableTimeSlots.map((slot) => {
                const booking = selectedDayBookings.find((b) => b.timeSlot === slot);
                const isSlotBlocked = settings.blockedSlots.some(
                  (s) => s.date === selectedDayDate && s.slot === slot
                );

                return (
                  <div
                    key={slot}
                    className={`
                      p-3 rounded-xl border text-xs flex items-center justify-between transition-all
                      ${
                        booking
                          ? 'bg-zinc-900/90 border-zinc-700/80 hover:border-zinc-500 cursor-pointer'
                          : isSlotBlocked
                          ? 'bg-rose-950/20 border-rose-900/40 text-rose-300'
                          : isSelectedDateBlocked
                          ? 'bg-zinc-950/30 border-zinc-900 text-zinc-600'
                          : 'bg-zinc-900/30 border-zinc-800/60 text-zinc-400'
                      }
                    `}
                    onClick={() => {
                      if (booking) onEditBooking(booking);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-white text-xs">{slot}</span>

                      {booking ? (
                        <div className="space-y-0.5">
                          <p className="font-semibold text-white flex items-center gap-1.5">
                            <User className="w-3 h-3 text-studio-red" />
                            <span>{booking.fullName}</span>
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            {booking.packageName} • {booking.packagePrice} DH
                          </p>
                        </div>
                      ) : isSlotBlocked ? (
                        <span className="text-rose-400 font-medium">Créneau bloqué (admin)</span>
                      ) : isSelectedDateBlocked ? (
                        <span className="text-zinc-600">Journée complète bloquée</span>
                      ) : (
                        <span className="text-emerald-500/80 font-medium">Créneau libre</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {booking ? (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            getStatusBadge(booking.status).bg
                          }`}
                        >
                          {getStatusBadge(booking.status).label}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBlockSlotToggle(selectedDayDate, slot);
                          }}
                          className={`text-[10px] px-2 py-1 rounded border transition-all ${
                            isSlotBlocked
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                          }`}
                        >
                          {isSlotBlocked ? 'Débloquer' : 'Bloquer'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Day View Detailed */
        <div className="bg-studio-card border border-studio-border rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Vue Journalière
              </span>
              <h3 className="text-lg font-bold text-white capitalize">
                {currentDate.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
            </div>
            <button
              onClick={() => {
                const dateStr = currentDate.toISOString().split('T')[0];
                onBlockDateToggle(dateStr);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition-all flex items-center gap-1.5"
            >
              <Ban className="w-3.5 h-3.5 text-studio-red" />
              <span>
                {settings.blockedDates.includes(currentDate.toISOString().split('T')[0])
                  ? 'Journée bloquée (cliquer pour débloquer)'
                  : 'Bloquer cette journée'}
              </span>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {settings.availableTimeSlots.map((slot) => {
              const dateStr = currentDate.toISOString().split('T')[0];
              const booking = bookings.find((b) => b.date === dateStr && b.timeSlot === slot && b.status !== 'cancelled');
              const isBlocked = settings.blockedSlots.some((s) => s.date === dateStr && s.slot === slot);

              return (
                <div
                  key={slot}
                  className={`
                    p-4 rounded-xl border flex items-center justify-between transition-all
                    ${
                      booking
                        ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-500 cursor-pointer'
                        : isBlocked
                        ? 'bg-rose-950/20 border-rose-900/40 text-rose-300'
                        : 'bg-zinc-950/30 border-zinc-800/70 text-zinc-400'
                    }
                  `}
                  onClick={() => booking && onEditBooking(booking)}
                >
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-sm font-bold text-white w-14">{slot}</div>

                    {booking ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{booking.fullName}</span>
                          <span className="text-xs text-studio-red font-semibold">{booking.instagram}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {booking.packageName} ({booking.packageDuration}h) • {booking.packagePrice} DH • {booking.phone}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-500 italic">
                        {isBlocked ? 'Créneau manuellement bloqué' : 'Disponible à la réservation'}
                      </span>
                    )}
                  </div>

                  <div>
                    {booking && (
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${
                          getStatusBadge(booking.status).bg
                        }`}
                      >
                        {getStatusBadge(booking.status).label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
