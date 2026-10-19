import React, { useState, useEffect, useRef } from 'react';
import { StudioPackage, StudioSettings } from '../../types';
import { STUDIO_WHATSAPP_NUMBER, buildWhatsAppBookingUrl } from '../../config/booking';
import { addQuote } from '../../data/storage';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Users,
  MessageCircle,
  Film,
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

// PURE SERVICES LIST WITHOUT ANY PRICES
export const STUDIO_SERVICES = [
  'Podcast Multicam 4K + Montage',
  'Podcast Tournage Brut (Rushs 4K)',
  'Formats Courts (Reels & TikTok)',
  'Plateau Cyclorama & Shooting Photo',
  'Projet Sur-Mesure / Production Complète',
];

const TIME_SLOTS = [
  'Matinée (10:00 - 12:00)',
  'Midi (12:00 - 14:00)',
  'Après-midi (14:00 - 16:00)',
  'Fin de journée (16:00 - 18:00)',
  'Flexible / À convenir',
];

const CONTACT_PREFERENCES = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'phone', label: 'Téléphone', icon: Phone },
  { id: 'email', label: 'E-mail', icon: Mail },
];

const DRAFT_STORAGE_KEY = 'tra_booking_draft_clean_2026';

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
  // DOM Mounting & Animation State
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // View: 'form' | 'success'
  const [view, setView] = useState<'form' | 'success'>('form');

  // Form Fields (WITHOUT ANY PRICES)
  const [service, setService] = useState<string>(STUDIO_SERVICES[0]);
  const [participants, setParticipants] = useState<string>('1-2 personnes');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('Matinée (10:00 - 12:00)');
  const [message, setMessage] = useState<string>('');

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+212 ');
  const [email, setEmail] = useState<string>('');
  const [contactPref, setContactPref] = useState<string>('whatsapp');

  // Validation & Submission
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Restore draft from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft.fullName) setFullName(draft.fullName);
        if (draft.phone) setPhone(draft.phone);
        if (draft.email) setEmail(draft.email);
        if (draft.service) setService(draft.service);
        if (draft.participants) setParticipants(draft.participants);
        if (draft.preferredDate) setPreferredDate(draft.preferredDate);
        if (draft.preferredTime) setPreferredTime(draft.preferredTime);
        if (draft.message) setMessage(draft.message);
        if (draft.contactPref) setContactPref(draft.contactPref);
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
        participants,
        preferredDate,
        preferredTime,
        message,
        contactPref,
      };
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore
    }
  }, [fullName, phone, email, service, participants, preferredDate, preferredTime, message, contactPref, view]);

  // Sync initialService prop
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

  // Handle Opening / Closing Animation Transitions
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setView('form');
      setErrors({});

      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 20);

      // Lock body scroll with padding compensation
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

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  // Validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Le nom complet est obligatoire.';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '').trim();
    if (!cleanPhone || cleanPhone === '+212' || cleanPhone.length < 8) {
      newErrors.phone = 'Le numéro de téléphone / WhatsApp est obligatoire.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Veuillez saisir une adresse e-mail valide.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const notesArray: string[] = [];
      if (participants) notesArray.push(`👥 Intervenants : ${participants}`);
      if (contactPref) {
        const prefLabel = CONTACT_PREFERENCES.find((p) => p.id === contactPref)?.label || contactPref;
        notesArray.push(`📲 Contact souhaité via : ${prefLabel}`);
      }
      if (message.trim()) notesArray.push(`💬 Détails : ${message.trim()}`);

      const fullMessage = notesArray.join('\n');

      // 1. Persist quote locally
      try {
        addQuote({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          instagram: '',
          projectType: service,
          desiredDate: preferredDate || '',
          peopleCount: participants.includes('5') ? 5 : participants.includes('3') ? 3 : 2,
          budgetRange: 'À définir',
          description: fullMessage,
          services: [service],
        });
      } catch (err) {
        console.warn('Quote storage skipped', err);
      }

      // 2. Generate WhatsApp Click-to-Chat URL
      const targetNumber = settings?.whatsappNumber || STUDIO_WHATSAPP_NUMBER;
      const waUrl = buildWhatsAppBookingUrl(
        {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          service,
          preferredDate: preferredDate || undefined,
          preferredTime: preferredTime || undefined,
          message: fullMessage || undefined,
        },
        targetNumber
      );

      setGeneratedWhatsAppUrl(waUrl);

      // Brief delay for smooth UX transition
      await new Promise((r) => setTimeout(r, 400));

      // 3. Clear draft upon confirmed submission
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);

      // 4. Show refined confirmation
      setView('success');

      // Auto-open WhatsApp if preference is WhatsApp
      if (contactPref === 'whatsapp') {
        try {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } catch {
          // Handled via confirmation view button
        }
      }
    } catch {
      setErrors({
        general: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
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

      {/* 2. ORGANIZED SIDE DRAWER (Desktop) / FULL SCREEN (Mobile) */}
      <div className="fixed inset-0 pointer-events-none flex justify-end">
        <div
          ref={panelRef}
          className={`pointer-events-auto relative w-full max-w-xl lg:max-w-2xl h-full bg-[#09090b] text-white border-l border-zinc-800/90 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* =========================================================================
              HEADER
             ========================================================================= */}
          <div className="flex-shrink-0 px-6 sm:px-8 pt-7 pb-5 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md relative z-20">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
                  <span>TRA STUDIO • TÉMARA</span>
                </div>
                <h2
                  id="booking-drawer-title"
                  className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight uppercase"
                >
                  Parlons de votre projet.
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-lg">
                  Remplissez ce formulaire pour nous décrire vos ambitions créatives. Notre équipe étudie vos besoins et vous répond sous 24h avec une proposition sur-mesure.
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

          {/* =========================================================================
              SCROLLABLE BODY: BEAUTIFULLY ORGANIZED FORM (NO PRICES)
             ========================================================================= */}
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

            {/* FORM VIEW */}
            {view === 'form' && (
              <form id="booking-clean-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* -------------------------------------------------------------
                    SECTION 01: PRESTATION & CRÉNEAU
                   ------------------------------------------------------------- */}
                <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="flex items-center justify-between border-b border-zinc-800/70 pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>01. Prestation & Créneau</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Configuration</span>
                  </div>

                  {/* Prestation selection (Clean pills without any prices) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Type de prestation <span className="text-studio-red">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {STUDIO_SERVICES.map((srv) => {
                        const isSelected = service === srv;
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setService(srv)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-studio-red/10 border-studio-red text-white font-bold shadow-sm'
                                : 'bg-zinc-950/70 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            <span className="truncate pr-2">{srv}</span>
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-studio-red bg-studio-red' : 'border-zinc-700'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date & Heure in clean 2-column grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-studio-red" />
                        <span>Date souhaitée</span>
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 h-11 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors"
                      />
                    </div>

                    {/* Heure */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-studio-red" />
                        <span>Créneau horaire</span>
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3.5 h-11 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors cursor-pointer"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t} className="bg-zinc-950 text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-studio-red" />
                      <span>Nombre d'intervenants / invités</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['1-2 personnes', '3-4 personnes', '5+ personnes'].map((count) => {
                        const isSelected = participants === count;
                        return (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setParticipants(count)}
                            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                              isSelected
                                ? 'bg-studio-red/15 border-studio-red text-white font-bold'
                                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                            }`}
                          >
                            {count}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    SECTION 02: VOS COORDONNÉES
                   ------------------------------------------------------------- */}
                <div className="space-y-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="flex items-center justify-between border-b border-zinc-800/70 pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>02. Vos Coordonnées</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">* Obligatoire</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Nom complet */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-300">
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
                          className={`w-full pl-10 pr-3.5 h-11 bg-zinc-950/80 rounded-xl text-xs text-white placeholder-zinc-500 transition-colors focus:outline-none ${
                            errors.fullName
                              ? 'border-2 border-studio-red focus:border-studio-red'
                              : 'border border-zinc-800 focus:border-studio-red'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <span className="text-[11px] text-studio-red font-medium block">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Téléphone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-zinc-300">
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
                          className={`w-full pl-10 pr-3.5 h-11 bg-zinc-950/80 rounded-xl text-xs text-white placeholder-zinc-500 font-mono transition-colors focus:outline-none ${
                            errors.phone
                              ? 'border-2 border-studio-red focus:border-studio-red'
                              : 'border border-zinc-800 focus:border-studio-red'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <span className="text-[11px] text-studio-red font-medium block">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
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
                        className={`w-full pl-10 pr-3.5 h-11 bg-zinc-950/80 rounded-xl text-xs text-white placeholder-zinc-600 transition-colors focus:outline-none ${
                          errors.email
                            ? 'border-2 border-studio-red focus:border-studio-red'
                            : 'border border-zinc-800 focus:border-studio-red'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-[11px] text-studio-red font-medium block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Canal de réponse préféré */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Canal de réponse souhaité :
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {CONTACT_PREFERENCES.map((pref) => {
                        const isSelected = contactPref === pref.id;
                        const Icon = pref.icon;
                        return (
                          <button
                            key={pref.id}
                            type="button"
                            onClick={() => setContactPref(pref.id)}
                            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-studio-red/15 border-studio-red text-white font-bold'
                                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-studio-red' : 'text-zinc-500'}`} />
                            <span>{pref.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    SECTION 03: DÉTAILS DU PROJET (OPTIONNEL)
                   ------------------------------------------------------------- */}
                <div className="space-y-3 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="flex items-center justify-between border-b border-zinc-800/70 pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>03. Message / Détails (Optionnel)</span>
                    </span>
                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Précisez votre concept, nombre d'épisodes souhaités, ou besoins techniques spécifiques..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors resize-none leading-relaxed font-light"
                  />
                </div>

              </form>
            )}

            {/* CONFIRMATION VIEW */}
            {view === 'success' && (
              <div className="py-4 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-studio-red/15 border border-studio-red/40 text-studio-red flex items-center justify-center mx-auto shadow-xl shadow-studio-red/20">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1.5 max-w-md mx-auto">
                    <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      Demande enregistrée
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      Votre demande est entre nos mains.
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                      Nous avons bien reçu votre projet. Notre équipe technique va vérifier la régie et vous répond sous 24h.
                    </p>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white uppercase text-[11px] tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Statut : En attente de validation</span>
                  </div>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    Un responsable de TRA Studio va étudier votre configuration et vous contactera via{' '}
                    <strong className="text-white">
                      {CONTACT_PREFERENCES.find((p) => p.id === contactPref)?.label || 'WhatsApp'}
                    </strong>{' '}
                    pour valider définitivement votre créneau et vos besoins de tournage.
                  </p>
                </div>

                {/* Recap Card (Without prices) */}
                <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3 text-xs">
                  <div className="border-b border-zinc-800 pb-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Récapitulatif de votre demande :
                    </span>
                    <span className="text-studio-red font-mono text-[10px] font-bold">
                      TRA STUDIO TÉMARA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Service :</span>
                      <span className="text-white font-semibold">{service}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Responsable :</span>
                      <span className="text-white font-semibold">{fullName}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 font-mono text-[10px] block">Téléphone :</span>
                      <span className="text-white font-mono">{phone}</span>
                    </div>

                    {preferredDate && (
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] block">Date & Heure :</span>
                        <span className="text-white">{preferredDate} ({preferredTime})</span>
                      </div>
                    )}

                    {email && (
                      <div className="sm:col-span-2">
                        <span className="text-zinc-500 font-mono text-[10px] block">E-mail :</span>
                        <span className="text-white font-mono">{email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
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

          {/* =========================================================================
              DRAWER FOOTER (Sticky Action Bar for Form View)
             ========================================================================= */}
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
                form="booking-clean-form"
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
