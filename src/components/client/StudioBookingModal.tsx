import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StudioPackage, StudioSettings } from '../../types';
import { STUDIO_WHATSAPP_NUMBER, buildWhatsAppBookingUrl } from '../../config/booking';
import { addQuote } from '../../data/storage';
import {
  X,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// SERVICES (WITHOUT PRICES)
export const STUDIO_SERVICES = [
  'Podcast Multicam 4K + Montage',
  'Podcast Tournage Brut (Rushs 4K)',
  'Formats Courts (Reels & TikTok)',
  'Plateau Cyclorama & Shooting Photo',
  'Projet Sur-Mesure / Production Complète',
];

// DURATIONS ("kmiya we9t")
const DURATION_OPTIONS = [
  { id: '1h', label: '1 heure' },
  { id: '2h', label: '2 heures' },
  { id: '3h', label: '3 heures' },
  { id: '4h', label: 'Demi-journée (4h)' },
  { id: '8h', label: 'Journée complète (8h)' },
  { id: 'custom', label: 'Sur-mesure' },
];

// TIME SLOTS ("we9t")
const TIME_SLOTS = [
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  'Flexible',
];

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DRAFT_STORAGE_KEY = 'tra_booking_draft_modern_cal_2026';

interface StudioBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: StudioSettings;
  packages?: StudioPackage[];
  initialService?: string | null;
}

export const StudioBookingModal: React.FC<StudioBookingModalProps> = ({
  isOpen,
  onClose,
  settings,
  initialService,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [view, setView] = useState<'form' | 'success'>('form');

  // Form Fields (WITHOUT PRICES)
  const [service, setService] = useState<string>(STUDIO_SERVICES[0]);
  const [duration, setDuration] = useState<string>('2 heures');
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    // Default to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // If tomorrow is Sunday, skip to Monday
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    return d;
  });
  const [selectedTime, setSelectedTime] = useState<string>('14:00');

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+212 ');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Calendar month navigation
  const [viewMonth, setViewMonth] = useState<Date>(() => new Date());

  // Validation & Submission
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Restore draft
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft.fullName) setFullName(draft.fullName);
        if (draft.phone) setPhone(draft.phone);
        if (draft.email) setEmail(draft.email);
        if (draft.service) setService(draft.service);
        if (draft.duration) setDuration(draft.duration);
        if (draft.selectedTime) setSelectedTime(draft.selectedTime);
        if (draft.selectedDateStr) setSelectedDate(new Date(draft.selectedDateStr));
        if (draft.message) setMessage(draft.message);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save draft
  useEffect(() => {
    if (view === 'success') return;
    try {
      const draft = {
        fullName,
        phone,
        email,
        service,
        duration,
        selectedTime,
        selectedDateStr: selectedDate ? selectedDate.toISOString() : null,
        message,
      };
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore
    }
  }, [fullName, phone, email, service, duration, selectedTime, selectedDate, message, view]);

  // Sync initialService
  useEffect(() => {
    if (initialService) {
      const matched = STUDIO_SERVICES.find(
        (s) =>
          s.toLowerCase().includes(initialService.toLowerCase()) ||
          initialService.toLowerCase().includes(s.toLowerCase().split(' ')[0])
      );
      if (matched) {
        setService(matched);
      } else {
        setService(initialService);
      }
    }
  }, [initialService]);

  // Handle drawer open/close
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setView('form');
      setErrors({});

      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 20);

      const originalOverflow = document.body.style.overflow;
      const originalPadding = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPadding;
      };
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // CALENDAR COMPUTATIONS
  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Monday-based week index (0 = Monday, 6 = Sunday)
    let startDay = firstDayOfMonth.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const daysCount = lastDayOfMonth.getDate();
    const cells: (Date | null)[] = [];

    // Empty cells before start of month
    for (let i = 0; i < startDay; i++) {
      cells.push(null);
    }

    // Days of month
    for (let d = 1; d <= daysCount; d++) {
      cells.push(new Date(year, month, d));
    }

    return cells;
  }, [viewMonth]);

  const isToday = (d: Date) => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (d: Date) => {
    if (!selectedDate) return false;
    return (
      d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPast = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isSunday = (d: Date) => d.getDay() === 0;

  const handlePrevMonth = () => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Human readable date format
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return 'Aucune date sélectionnée';
    const dayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][selectedDate.getDay()];
    return `${dayName} ${selectedDate.getDate()} ${MONTHS_FR[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  }, [selectedDate]);

  if (!isRendered) return null;

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Votre nom complet est obligatoire.';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '').trim();
    if (!cleanPhone || cleanPhone === '+212' || cleanPhone.length < 8) {
      newErrors.phone = 'Le numéro de téléphone / WhatsApp est obligatoire.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Veuillez saisir une adresse e-mail valide.';
    }

    if (!selectedDate) {
      newErrors.date = 'Veuillez sélectionner une date sur le calendrier.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const dateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
      const notesArray: string[] = [
        `⏱️ Durée souhaitée : ${duration}`,
        `📅 Date : ${formattedSelectedDate}`,
        `⏰ Heure de début : ${selectedTime}`,
      ];

      if (message.trim()) {
        notesArray.push(`💬 Précisions : ${message.trim()}`);
      }

      const fullMessage = notesArray.join('\n');

      // 1. Persist quote
      try {
        addQuote({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          instagram: '',
          projectType: service,
          desiredDate: dateStr,
          peopleCount: 2,
          budgetRange: 'À définir',
          description: fullMessage,
          services: [service],
        });
      } catch (err) {
        console.warn('Quote storage skipped', err);
      }

      // 2. Build WhatsApp Click-to-Chat URL
      const targetNumber = settings?.whatsappNumber || STUDIO_WHATSAPP_NUMBER;
      const waUrl = buildWhatsAppBookingUrl(
        {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          service,
          preferredDate: formattedSelectedDate,
          preferredTime: selectedTime,
          duration: duration,
          message: message.trim() || undefined,
        },
        targetNumber
      );

      setGeneratedWhatsAppUrl(waUrl);

      await new Promise((r) => setTimeout(r, 400));
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      setView('success');

      // Auto-open WhatsApp
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Handled via confirmation view button
      }
    } catch {
      setErrors({
        general: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsAppDirectly = () => {
    if (generatedWhatsAppUrl) {
      window.open(generatedWhatsAppUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* 1. CINEMATIC DARK BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-500 ease-out cursor-pointer ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. MODERN AIRY SIDE DRAWER (Desktop) / FULL SCREEN (Mobile) */}
      <div className="fixed inset-0 pointer-events-none flex justify-end">
        <div
          ref={panelRef}
          className={`pointer-events-auto relative w-full max-w-xl lg:max-w-2xl h-full bg-[#09090b] text-white border-l border-zinc-800/90 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER (Sticky) */}
          <div className="flex-shrink-0 px-6 sm:px-8 pt-7 pb-5 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md relative z-20">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
                  <span>TRA Studio • Réservation</span>
                </div>
                <h2
                  id="booking-drawer-title"
                  className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight uppercase"
                >
                  Planifiez votre séance.
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  Choisissez votre date, votre horaire et la durée souhaitée. Notre équipe technique prépare le plateau pour votre venue.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le formulaire de réservation"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-studio-red/60 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 select-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SCROLLABLE BODY */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {errors.general && (
              <div className="p-4 rounded-2xl bg-studio-red/10 border border-studio-red/40 text-xs text-zinc-200 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                <p className="leading-relaxed">{errors.general}</p>
              </div>
            )}

            {view === 'form' && (
              <form id="booking-modern-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* -------------------------------------------------------------
                    1. TYPE DE PRESTATION (Clean & No Prices)
                   ------------------------------------------------------------- */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>Prestation souhaitée <span className="text-studio-red">*</span></span>
                    </label>
                  </div>

                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 h-12 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-studio-red transition-colors cursor-pointer"
                  >
                    {STUDIO_SERVICES.map((srv) => (
                      <option key={srv} value={srv} className="bg-zinc-950 text-white py-1">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* -------------------------------------------------------------
                    2. DURÉE DE LA SÉANCE ("kmiya we9t")
                   ------------------------------------------------------------- */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-studio-red" />
                      <span>Durée de la séance</span>
                    </label>
                    <span className="text-[11px] font-mono text-zinc-400">Temps réservé</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {DURATION_OPTIONS.map((opt) => {
                      const isSelectedDuration = duration === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDuration(opt.label)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                            isSelectedDuration
                              ? 'bg-studio-red border-studio-red text-white font-bold shadow-md shadow-studio-red/20'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    3. CALENDRIER INTERACTIF & HORAIRE ("calendrier & we9t")
                   ------------------------------------------------------------- */}
                <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>Calendrier des séances</span>
                    </div>

                    {/* Month Switcher */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Mois précédent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white min-w-[120px] text-center">
                        {MONTHS_FR[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Mois suivant"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="space-y-2">
                    {/* Days of week */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {WEEKDAYS.map((w, idx) => (
                        <span
                          key={w}
                          className={`text-[10px] font-mono uppercase font-bold py-1 ${
                            idx === 6 ? 'text-zinc-600' : 'text-zinc-400'
                          }`}
                        >
                          {w}
                        </span>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {calendarDays.map((d, index) => {
                        if (!d) {
                          return <div key={`empty-${index}`} className="h-9" />;
                        }

                        const disabled = isPast(d) || isSunday(d);
                        const active = isSelected(d);
                        const current = isToday(d);

                        return (
                          <button
                            key={d.toISOString()}
                            type="button"
                            disabled={disabled}
                            onClick={() => setSelectedDate(d)}
                            className={`h-9 w-full rounded-xl text-xs font-mono transition-all flex items-center justify-center cursor-pointer select-none relative ${
                              active
                                ? 'bg-studio-red text-white font-bold shadow-lg shadow-studio-red/30 scale-105 z-10'
                                : disabled
                                ? 'text-zinc-700 cursor-not-allowed bg-transparent'
                                : 'text-zinc-200 hover:bg-zinc-800 hover:text-white bg-zinc-950/60'
                            } ${current && !active ? 'border border-studio-red/50 text-studio-red font-bold' : ''}`}
                          >
                            <span>{d.getDate()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Date Indicator Banner */}
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-light">Date sélectionnée :</span>
                    <span className="font-semibold text-white font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-studio-red" />
                      <span>{formattedSelectedDate}</span>
                    </span>
                  </div>
                  {errors.date && (
                    <span className="text-[11px] text-studio-red font-medium block">{errors.date}</span>
                  )}

                  {/* TIME SLOTS SELECTION ("we9t") */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800/70">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Heure de début souhaitée :
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const isSlotSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 px-2 rounded-xl border text-xs font-mono transition-all text-center cursor-pointer ${
                              isSlotSelected
                                ? 'bg-studio-red border-studio-red text-white font-bold shadow-md shadow-studio-red/20'
                                : 'bg-zinc-950/70 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    4. VOS COORDONNÉES (Clean, Uncluttered)
                   ------------------------------------------------------------- */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between border-b border-zinc-800/70 pb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>Vos coordonnées</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">* Obligatoire</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Nom complet */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-zinc-300">
                        Nom complet <span className="text-studio-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="Ex: Tariq Bennani"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                          }}
                          className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                            errors.fullName
                              ? 'border-2 border-studio-red'
                              : 'border border-zinc-800 focus:border-studio-red'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <span className="text-[10px] text-studio-red font-medium block">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Téléphone / WhatsApp */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-zinc-300">
                        Téléphone / WhatsApp <span className="text-studio-red">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          placeholder="+212 6 XX XX XX XX"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                          }}
                          className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 rounded-xl text-xs text-white placeholder-zinc-500 font-mono focus:outline-none transition-colors ${
                            errors.phone
                              ? 'border-2 border-studio-red'
                              : 'border border-zinc-800 focus:border-studio-red'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <span className="text-[10px] text-studio-red font-medium block">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* E-mail (Optionnel) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-zinc-300">
                      Adresse e-mail <span className="text-zinc-600 font-normal">(Optionnel)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="contact@exemple.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-2 border-studio-red'
                            : 'border border-zinc-800 focus:border-studio-red'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Message (Optionnel) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-zinc-300">
                      Précisions / Thématique du projet <span className="text-zinc-600 font-normal">(Optionnel)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Émission de 45 minutes, 2 micros nécessaires, montage rapide..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors resize-none leading-relaxed font-light"
                    />
                  </div>
                </div>

              </form>
            )}

            {/* CONFIRMATION VIEW */}
            {view === 'success' && (
              <div className="py-6 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-studio-red/15 border border-studio-red/40 text-studio-red flex items-center justify-center mx-auto shadow-xl shadow-studio-red/20">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1.5 max-w-md mx-auto">
                    <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      Demande enregistrée
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      Votre demande est transmise.
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      L'équipe technique de TRA Studio vérifie la régie et vous répond sous 24h pour confirmer votre créneau.
                    </p>
                  </div>
                </div>

                {/* Recap Card */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3 text-xs">
                  <div className="border-b border-zinc-800 pb-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Récapitulatif de votre séance :
                    </span>
                    <span className="text-studio-red font-mono text-[10px] font-bold">
                      TRA STUDIO TÉMARA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Prestation :</span>
                      <span className="text-white font-semibold">{service}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Durée prévue :</span>
                      <span className="text-studio-red font-semibold">{duration}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Date :</span>
                      <span className="text-white font-mono">{formattedSelectedDate}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Heure :</span>
                      <span className="text-white font-mono">{selectedTime}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Responsable :</span>
                      <span className="text-white font-semibold">{fullName}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Téléphone :</span>
                      <span className="text-white font-mono">{phone}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirectly}
                    className="w-full h-13 rounded-2xl bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-studio-red/30 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                    <span>Échanger directement sur WhatsApp</span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Fermer et retourner au site
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STICKY FOOTER (Action Bar) */}
          {view === 'form' && (
            <div className="flex-shrink-0 px-6 sm:px-8 py-5 border-t border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="submit"
                form="booking-modern-form"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-studio-red hover:bg-studio-redHover disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-studio-red/25 transition-all cursor-pointer active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmission...</span>
                  </>
                ) : (
                  <>
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Envoyer ma demande de réservation</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
