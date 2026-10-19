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
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Users,
  Sparkles,
  MessageCircle,
  Check,
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

export const DEFAULT_STUDIO_SERVICES = [
  {
    id: 'podcast-montage',
    name: 'Podcast + Montage',
    rate: '1500 DH/h',
    badge: 'Populaire',
    desc: 'Studio tout équipé, 3 caméras 4K, 2 micros Shure & monteur dédié inclus.',
  },
  {
    id: 'podcast-brut',
    name: 'Podcast Tournage Brut',
    rate: '1000 DH/h',
    badge: 'Essentiel',
    desc: 'Captation multicam 4K avec opérateur studio, rushs audio & vidéo bruts remis sans montage.',
  },
  {
    id: 'reels-montage',
    name: 'Reels + Montage',
    rate: '1900 DH/h',
    badge: 'Réseaux Sociaux',
    desc: 'Captation verticale intensive, jusqu’à 10 reels montés et sous-titrés.',
  },
  {
    id: 'cyclorama-shooting',
    name: 'Plateau Cyclorama & Shooting',
    rate: 'Sur devis',
    badge: 'Photo & Vidéo',
    desc: 'Cyclorama blanc infini, éclairage broadcast et direction artistique.',
  },
  {
    id: 'sur-mesure',
    name: 'Projet Sur-Mesure / Demi-Journée',
    rate: 'Devis sous 24h',
    badge: 'Personnalisé',
    desc: 'Production d’envergure, format institutionnel ou configuration de plateau spécifique.',
  },
];

const TIME_SLOTS = [
  '10:00 (Matinée)',
  '11:00 (Matinée)',
  '12:00 (Midi)',
  '14:00 (Après-midi)',
  '15:00 (Après-midi)',
  '16:00 (Après-midi)',
  '17:00 (Fin de journée)',
  '18:00 (Soirée)',
  'Flexible / À convenir',
];

const CONTACT_PREFERENCES = [
  { id: 'whatsapp', label: 'WhatsApp', hint: 'Réponse rapide & échange direct', icon: MessageCircle },
  { id: 'phone', label: 'Téléphone', hint: 'Appel vocal direct', icon: Phone },
  { id: 'email', label: 'E-mail', hint: 'Devis formel & proposition détaillée', icon: Mail },
];

const DRAFT_STORAGE_KEY = 'tra_booking_draft_2026';

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
  packages,
  initialService,
}) => {
  // DOM Mounting state for smooth transition
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Step state: 1 = Project & Dates, 2 = Client Information, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields with draft restoration
  const [service, setService] = useState<string>(DEFAULT_STUDIO_SERVICES[0].name);
  const [participants, setParticipants] = useState<string>('1-2 personnes');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+212 ');
  const [email, setEmail] = useState<string>('');
  const [contactPref, setContactPref] = useState<string>('whatsapp');

  // Submission & Validation States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Restore draft from sessionStorage on initial load
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
      // Ignore parsing errors
    }
  }, []);

  // Save draft on change (when not in success view)
  useEffect(() => {
    if (step === 3) return;
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
      // Ignore quota errors
    }
  }, [fullName, phone, email, service, participants, preferredDate, preferredTime, message, contactPref, step]);

  // Synchronize initialService prop when opening
  useEffect(() => {
    if (initialService) {
      const matched = DEFAULT_STUDIO_SERVICES.find((s) =>
        s.name.toLowerCase().includes(initialService.toLowerCase()) ||
        initialService.toLowerCase().includes(s.name.toLowerCase())
      );
      if (matched) {
        setService(matched.name);
      } else {
        setService(initialService);
      }
    }
  }, [initialService]);

  // Handle Opening / Closing Animation Transitions
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
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

  // Reset scroll on step changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  if (!isRendered) return null;

  // Today string for date input min
  const todayStr = new Date().toISOString().split('T')[0];

  // Validation for Step 1
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!service) {
      newErrors.service = 'Veuillez sélectionner un type de prestation.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 2
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Votre nom complet est obligatoire.';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '').trim();
    if (!cleanPhone || cleanPhone === '+212' || cleanPhone.length < 8) {
      newErrors.phone = 'Un numéro de téléphone ou WhatsApp valide est obligatoire.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Veuillez renseigner une adresse e-mail valide.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBackToStep1 = () => {
    setErrors({});
    setStep(1);
  };

  // Final Form Submission Handler
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // 1. Prepare structured notes
      const notesArray: string[] = [];
      if (participants) notesArray.push(`👥 Intervenants : ${participants}`);
      if (contactPref) {
        const prefLabel = CONTACT_PREFERENCES.find((p) => p.id === contactPref)?.label || contactPref;
        notesArray.push(`📲 Préférence contact : ${prefLabel}`);
      }
      if (message.trim()) notesArray.push(`💬 Détails : ${message.trim()}`);

      const fullMessage = notesArray.join('\n');

      // 2. Persist in local storage for quote tracking
      try {
        addQuote({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          instagram: '',
          projectType: service,
          desiredDate: preferredDate || '',
          peopleCount: participants.includes('5') ? 5 : participants.includes('3') ? 3 : 2,
          budgetRange: 'Standard',
          description: fullMessage,
          services: [service],
        });
      } catch (err) {
        console.warn('Quote storage skipped', err);
      }

      // 3. Generate official WhatsApp Click-to-Chat URL
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

      // Simulate a brief refined network check for smooth cinematic feel
      await new Promise((r) => setTimeout(r, 600));

      // 4. Clear draft from session storage upon confirmed transmission
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);

      // 5. Switch to Confirmation Step
      setStep(3);

      // Try opening WhatsApp automatically if preferred
      if (contactPref === 'whatsapp') {
        try {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } catch {
          // Popup blocked; user can click the button on the confirmation screen
        }
      }
    } catch {
      setErrors({
        general: "Une erreur est survenue lors de l'enregistrement de votre demande. Veuillez réessayer ou nous contacter directement.",
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

      {/* 2. EDITORIAL BOOKING SIDE DRAWER (Desktop) / FULL-SCREEN INTERFACE (Mobile) */}
      <div className="fixed inset-0 pointer-events-none flex justify-end">
        <div
          ref={panelRef}
          className={`pointer-events-auto relative w-full max-w-2xl h-full bg-[#09090b] text-white border-l border-zinc-800/90 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* =========================================================================
              DRAWER HEADER (Sticky at Top)
             ========================================================================= */}
          <div className="flex-shrink-0 px-6 sm:px-8 pt-7 pb-5 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md relative z-20">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse" />
                  <span>TRA Studio • Témara</span>
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

            {/* Discreet 2-Step Progress Indicator (Visible in Form Steps) */}
            {step !== 3 && (
              <div className="pt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex-1 flex items-center gap-2 text-xs font-mono pb-2 border-b-2 transition-all text-left cursor-pointer ${
                    step === 1
                      ? 'border-studio-red text-white font-bold'
                      : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] font-bold">
                    01
                  </span>
                  <span>Projet & Créneau</span>
                </button>

                <div
                  className={`flex-1 flex items-center gap-2 text-xs font-mono pb-2 border-b-2 transition-all text-left ${
                    step === 2
                      ? 'border-studio-red text-white font-bold'
                      : 'border-zinc-800 text-zinc-500'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] font-bold">
                    02
                  </span>
                  <span>Vos Coordonnées</span>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              DRAWER SCROLLABLE BODY
             ========================================================================= */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {/* Error Banner */}
            {errors.general && (
              <div className="p-4 rounded-2xl bg-studio-red/10 border border-studio-red/40 text-xs text-zinc-200 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                <p className="leading-relaxed">{errors.general}</p>
              </div>
            )}

            {/* =========================================================================
                STEP 1: PROJECT DETAILS & PREFERRED DATES
               ========================================================================= */}
            {step === 1 && (
              <form id="booking-step-1" onSubmit={handleNextToStep2} className="space-y-6">
                
                {/* GROUP: TYPE DE PRESTATION */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>Type de prestation <span className="text-studio-red">*</span></span>
                    </label>
                    <span className="text-[11px] text-zinc-500 font-mono">Options disponibles</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DEFAULT_STUDIO_SERVICES.map((srv) => {
                      const isSelected = service === srv.name;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setService(srv.name)}
                          className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left relative ${
                            isSelected
                              ? 'bg-zinc-900/90 border-studio-red shadow-lg shadow-studio-red/10'
                              : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-xs font-bold tracking-tight ${
                                  isSelected ? 'text-white' : 'text-zinc-200'
                                }`}
                              >
                                {srv.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                                {srv.rate}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                              {srv.desc}
                            </p>
                          </div>

                          <div className="pt-2 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-zinc-500">{srv.badge}</span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-studio-red bg-studio-red text-white'
                                  : 'border-zinc-700 bg-transparent'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <span className="text-[11px] text-studio-red font-semibold block">{errors.service}</span>
                  )}
                </div>

                {/* GROUP: PARTICIPANTS */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-studio-red" />
                    <span>Nombre de participants / intervenants</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['1 personne', '2 personnes', '3-4 personnes', '5+ personnes'].map((count) => {
                      const isSelected = participants === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setParticipants(count)}
                          className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'bg-studio-red/15 border-studio-red text-white font-bold'
                              : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          {count}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* GROUP: PREFERRED DATE & TIME SLOT */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-studio-red" />
                    <span>Créneau & Date souhaitée</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Date picker */}
                    <div className="space-y-1">
                      <span className="text-[11px] text-zinc-400 font-mono block">Date idéale :</span>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          min={todayStr}
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full pl-10 pr-3.5 h-11 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors"
                        />
                      </div>
                    </div>

                    {/* Time slot picker */}
                    <div className="space-y-1">
                      <span className="text-[11px] text-zinc-400 font-mono block">Créneau horaire :</span>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full pl-10 pr-3.5 h-11 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors cursor-pointer"
                        >
                          <option value="">Sélectionner un horaire...</option>
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t} className="bg-zinc-950 text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    Ouvert du Lundi au Samedi de 10h00 à 18h00. Les dates sont validées selon la disponibilité de la régie.
                  </p>
                </div>

                {/* GROUP: DESCRIPTION DU PROJET */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-studio-red" />
                    <span>Description courte de votre projet</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Enregistrement d'une série de 4 épisodes de podcast avec 2 invités. Besoin de cadrage multicam et d'étalonnage rapide..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors resize-none leading-relaxed font-light"
                  />
                </div>

              </form>
            )}

            {/* =========================================================================
                STEP 2: CLIENT INFORMATION & CONTACT PREFERENCE
               ========================================================================= */}
            {step === 2 && (
              <form id="booking-step-2" onSubmit={handleFinalSubmit} className="space-y-6">
                
                {/* Summary Pill of selected service from Step 1 */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-studio-red shrink-0" />
                    <div>
                      <span className="text-zinc-400 block text-[11px] font-mono">Service sélectionné :</span>
                      <span className="font-bold text-white">{service}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleBackToStep1}
                    className="text-[11px] font-mono text-studio-red hover:underline cursor-pointer"
                  >
                    Modifier
                  </button>
                </div>

                {/* CLIENT INFORMATION FIELDS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-red" />
                      <span>Coordonnées du responsable</span>
                    </label>
                    <span className="text-[11px] text-zinc-500 font-mono">* Champs obligatoires</span>
                  </div>

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
                        placeholder="Ex: Yasmine Alaoui"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                        }}
                        className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/80 rounded-xl text-xs text-white placeholder-zinc-500 transition-colors focus:outline-none ${
                          errors.fullName
                            ? 'border-2 border-studio-red focus:border-studio-red'
                            : 'border border-zinc-800 focus:border-studio-red'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <span className="text-[11px] text-studio-red font-medium block">{errors.fullName}</span>
                    )}
                  </div>

                  {/* Numéro de téléphone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Numéro de téléphone / WhatsApp <span className="text-studio-red">*</span>
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
                        className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/80 rounded-xl text-xs text-white placeholder-zinc-500 font-mono transition-colors focus:outline-none ${
                          errors.phone
                            ? 'border-2 border-studio-red focus:border-studio-red'
                            : 'border border-zinc-800 focus:border-studio-red'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-[11px] text-studio-red font-medium block">{errors.phone}</span>
                    )}
                  </div>

                  {/* Adresse e-mail */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-zinc-300">
                      Adresse e-mail <span className="text-zinc-600 font-normal">(Recommandé pour le devis)</span>
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
                        className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/80 rounded-xl text-xs text-white placeholder-zinc-600 transition-colors focus:outline-none ${
                          errors.email
                            ? 'border-2 border-studio-red focus:border-studio-red'
                            : 'border border-zinc-800 focus:border-studio-red'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-[11px] text-studio-red font-medium block">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* CONTACT PREFERENCE */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5 text-studio-red" />
                    <span>Canal de réponse souhaité</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {CONTACT_PREFERENCES.map((pref) => {
                      const isSelected = contactPref === pref.id;
                      const Icon = pref.icon;
                      return (
                        <div
                          key={pref.id}
                          onClick={() => setContactPref(pref.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-zinc-900/90 border-studio-red shadow-md shadow-studio-red/10'
                              : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon
                              className={`w-3.5 h-3.5 ${
                                isSelected ? 'text-studio-red' : 'text-zinc-500'
                              }`}
                            />
                            <span
                              className={`text-xs font-bold ${
                                isSelected ? 'text-white' : 'text-zinc-300'
                              }`}
                            >
                              {pref.label}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-light">
                            {pref.hint}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </form>
            )}

            {/* =========================================================================
                STEP 3: REFINED CONFIRMATION STATE
               ========================================================================= */}
            {step === 3 && (
              <div className="py-4 space-y-6 animate-in zoom-in-95 duration-300">
                {/* Header Icon & Title */}
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
                      Nous avons bien reçu votre projet. Votre réservation sera confirmée après vérification technique des créneaux par notre équipe.
                    </p>
                  </div>
                </div>

                {/* Status Notice: Explicitly stating that booking requires confirmation */}
                <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white uppercase text-[11px] tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Statut : En attente de confirmation manuelle</span>
                  </div>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    Un responsable de TRA Studio va étudier vos contraintes techniques (configuration des caméras 4K, micros, régie) et vous contactera sous 24h via{' '}
                    <strong className="text-white">
                      {CONTACT_PREFERENCES.find((p) => p.id === contactPref)?.label || 'WhatsApp'}
                    </strong>{' '}
                    pour valider la date et l’heure définitive de votre séance.
                  </p>
                </div>

                {/* Recap Card */}
                <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3 text-xs">
                  <div className="border-b border-zinc-800 pb-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Récapitulatif de votre demande :
                    </span>
                    <span className="text-studio-red font-mono text-[10px] font-bold">
                      TÉMARA STUDIO
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
                        <span className="text-white">{preferredDate} {preferredTime && `(${preferredTime})`}</span>
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

                {/* Direct WhatsApp Call to Action */}
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
              DRAWER FOOTER (Sticky Navigation / Primary Action Bar)
             ========================================================================= */}
          {step !== 3 && (
            <div className="flex-shrink-0 px-6 sm:px-8 py-5 border-t border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md flex items-center justify-between gap-4">
              {step === 1 ? (
                <>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    form="booking-step-1"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-studio-red hover:bg-studio-redHover text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-studio-red/25 transition-all cursor-pointer active:scale-95 group"
                  >
                    <span>Continuer</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleBackToStep1}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Retour</span>
                  </button>

                  <button
                    type="submit"
                    form="booking-step-2"
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
                        <span>Envoyer ma demande</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
