import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { Booking, StudioSettings } from '../../types';
import { isDateAvailable, isSlotAvailable } from '../../data/storage';

interface Step1DateSlotProps {
  selectedDate: string | null;
  selectedSlot: string | null;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: string) => void;
  onContinue: () => void;
  onBack?: () => void;
  bookings: Booking[];
  settings: StudioSettings;
}

const MONTH_NAMES_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const WEEKDAY_NAMES_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export const Step1DateSlot: React.FC<Step1DateSlotProps> = ({
  selectedDate,
  selectedSlot,
  onSelectDate,
  onSelectSlot,
  onContinue,
  onBack,
  bookings,
  settings,
}) => {
  // Initialize view month based on selectedDate or today
  const initialDate = useMemo(() => {
    if (selectedDate) return new Date(selectedDate + 'T00:00:00');
    return new Date();
  }, [selectedDate]);

  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth()); // 0-indexed

  // Today string YYYY-MM-DD
  const todayStr = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  // Compute month days grid
  const { daysGrid, canGoPrevMonth } = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Monday as 0, Sunday as 6
    let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const totalDays = lastDayOfMonth.getDate();

    // Check if previous month is in past
    const currentFirstDate = new Date(currentYear, currentMonth, 1);
    const now = new Date();
    const thisMonthFirstDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const canPrev = currentFirstDate > thisMonthFirstDate;

    // Days grid
    const days: { dayNumber: number; dateStr: string; isCurrentMonth: boolean }[] = [];

    // Prev month padding
    const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const pDay = prevMonthLastDate - i;
      const prevDate = new Date(currentYear, currentMonth - 1, pDay);
      const y = prevDate.getFullYear();
      const m = String(prevDate.getMonth() + 1).padStart(2, '0');
      const d = String(pDay).padStart(2, '0');
      days.push({
        dayNumber: pDay,
        dateStr: `${y}-${m}-${d}`,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const y = currentYear;
      const m = String(currentMonth + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      days.push({
        dayNumber: d,
        dateStr: `${y}-${m}-${dayStr}`,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill row of 7
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextDate = new Date(currentYear, currentMonth + 1, d);
      const y = nextDate.getFullYear();
      const m = String(nextDate.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d).padStart(2, '0');
      days.push({
        dayNumber: d,
        dateStr: `${y}-${m}-${dayStr}`,
        isCurrentMonth: false,
      });
    }

    return { daysGrid: days, canGoPrevMonth: canPrev };
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Format selected date nicely in French for display
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return null;
    const d = new Date(selectedDate + 'T00:00:00');
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [selectedDate]);

  return (
    <div className="w-full space-y-6 sm:space-y-7 animate-in fade-in duration-300 pb-8">
      {/* Back button */}
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium text-studio-muted hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Modifier mes coordonnées</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center sm:text-left space-y-1.5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
          <span>Date & créneau horaire</span>
        </h1>
        <p className="text-sm sm:text-base text-studio-muted">
          Sélectionnez le jour de votre shooting et votre horaire en studio.
        </p>
      </div>

      {/* Main Responsive Layout: 1 col on mobile, 2 cols on desktop/PC (lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Calendar (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-studio-card border border-studio-border rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3">
          {/* Month Navigation */}
          <div className="flex items-center justify-between pb-4 border-b border-studio-border/50">
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="w-5 h-5 text-studio-red" />
              <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide capitalize">
                {MONTH_NAMES_FR[currentMonth]} {currentYear}
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={!canGoPrevMonth}
                onClick={handlePrevMonth}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-studio-cardHover disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Mois précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-studio-cardHover transition-all"
                aria-label="Mois suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 pt-3 pb-2 text-center">
            {WEEKDAY_NAMES_FR.map((name, i) => (
              <span
                key={name}
                className={`text-xs font-semibold tracking-wider uppercase ${
                  i >= 5 ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                {name}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
            {daysGrid.map((item, idx) => {
              const isAvailable =
                item.isCurrentMonth && isDateAvailable(item.dateStr, settings);
              const isSelected = selectedDate === item.dateStr;
              const isToday = item.dateStr === todayStr;

              return (
                <button
                  key={`${item.dateStr}-${idx}`}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => {
                    onSelectDate(item.dateStr);
                  }}
                  className={`
                    relative h-11 sm:h-13 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-xs sm:text-sm font-medium transition-all duration-150
                    ${
                      isSelected
                        ? 'bg-white text-black font-bold shadow-lg shadow-white/10 scale-[1.03] z-10 ring-2 ring-studio-red'
                        : isAvailable
                        ? 'text-zinc-100 hover:bg-studio-cardHover hover:text-white active:scale-95 bg-zinc-900/40 border border-zinc-800/60'
                        : 'text-zinc-700 bg-transparent cursor-not-allowed border border-transparent'
                    }
                    ${!item.isCurrentMonth ? 'opacity-20' : ''}
                  `}
                >
                  <span>{item.dayNumber}</span>
                  {/* Today dot indicator */}
                  {isToday && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-studio-red absolute bottom-1.5"></span>
                  )}
                  {/* Small indicator when selected */}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-studio-red absolute bottom-1.5"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-4 mt-3 border-t border-studio-border/30 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-zinc-900 border border-zinc-700"></span>
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-zinc-900/30 border border-zinc-800 opacity-40"></span>
              <span>Indisponible</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-md bg-white border border-studio-red"></span>
              <span className="text-zinc-300 font-medium">Sélectionné</span>
            </div>
          </div>
        </div>

        {/* Right Column: Time Slots (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          {selectedDate ? (
            <div className="bg-studio-card border border-studio-border rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-studio-red" />
                    <span>Créneaux du jour</span>
                  </h2>
                  <p className="text-xs text-studio-muted capitalize">
                    {formattedSelectedDate}
                  </p>
                </div>
                {selectedSlot && (
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60 font-semibold">
                    {selectedSlot} ✓
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2.5">
                {settings.availableTimeSlots.map((slot) => {
                  const available = isSlotAvailable(selectedDate, slot, bookings, settings);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!available}
                      onClick={() => onSelectSlot(slot)}
                      className={`
                        h-12 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center transition-all duration-150
                        ${
                          isSelected
                            ? 'bg-studio-red text-white shadow-lg shadow-studio-red/30 scale-[1.02] border border-studio-red font-bold'
                            : available
                            ? 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/60 active:scale-95'
                            : 'bg-zinc-950/40 text-zinc-700 border border-zinc-900/60 cursor-not-allowed line-through'
                        }
                      `}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center text-center p-8 bg-studio-card/50 border border-dashed border-studio-border/70 rounded-3xl space-y-3 min-h-[260px]">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <CalendarIcon className="w-6 h-6 text-studio-red" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200">Choisissez une date</h3>
              <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                Cliquez sur un jour disponible dans le calendrier pour afficher les créneaux horaires disponibles en studio.
              </p>
            </div>
          )}

          {/* Continue CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!selectedDate || !selectedSlot}
              onClick={onContinue}
              className={`
                w-full h-14 rounded-2xl font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-xl
                ${
                  selectedDate && selectedSlot
                    ? 'bg-white text-black hover:bg-zinc-200 active:scale-[0.99] cursor-pointer shadow-white/10'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }
              `}
            >
              <span>Continuer vers le récapitulatif</span>
              {selectedDate && selectedSlot && <span className="text-lg">→</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
