import React, { useState, useEffect } from 'react';
import { StudioPackage, StudioSettings } from '../../types';
import { STUDIO_WHATSAPP_NUMBER, buildWhatsAppBookingUrl } from '../../config/booking';
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

export const DEFAULT_STUDIO_SERVICES = [
  'Podcast + Montage (1500 Dhs/h)',
  'Podcast Tournage Brut (1000 Dhs/h)',
  'Reels + Montage (1900 Dhs/h)',
  'Projet Sur-Mesure / Demande de Devis',
];

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
  // Available services list derived from website packages or default list
  const availableServices = packages && packages.length > 0
    ? [...packages.map((p) => p.name), 'Projet Sur-Mesure / Demande de Devis']
    : DEFAULT_STUDIO_SERVICES;

  // View state: 'form' | 'success'
  const [view, setView] = useState<'form' | 'success'>('form');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+212 ');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<string>(availableServices[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');

  // Validation
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; general?: string }>({});
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Synchronize initial service when modal opens
  useEffect(() => {
    if (initialService) {
      const match = availableServices.find(
        (s) =>
          s.toLowerCase().includes(initialService.toLowerCase()) ||
          initialService.toLowerCase().includes(s.toLowerCase().split(' ')[0])
      );
      if (match) {
        setService(match);
      } else {
        setService(initialService);
      }
    } else if (availableServices.length > 0) {
      setService(availableServices[0]);
    }

    if (isOpen) {
      setView('form');
      setErrors({});
    }
  }, [initialService, isOpen]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Today's date in YYYY-MM-DD for datepicker min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; phone?: string; general?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Le nom complet est obligatoire.';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '').trim();
    if (!cleanPhone || cleanPhone === '+212' || cleanPhone.length < 8) {
      newErrors.phone = 'Un numéro de téléphone valide est obligatoire.';
    }

    if (Object.keys(newErrors).length > 0) {
      newErrors.general = 'Veuillez renseigner tous les champs obligatoires (Nom complet et Numéro de téléphone).';
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Target WhatsApp number from central configuration or settings
    const targetNumber = settings?.whatsappNumber || STUDIO_WHATSAPP_NUMBER;

    // Generate Click-to-Chat URL
    const url = buildWhatsAppBookingUrl(
      {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        service,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
        message: message.trim() || undefined,
      },
      targetNumber
    );

    setGeneratedWhatsAppUrl(url);
    setView('success');

    // Automatically trigger opening WhatsApp in a new tab
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Browser popup blocked; user can click the prominent button in the success view
    }
  };

  const handleOpenWhatsAppManually = () => {
    if (generatedWhatsAppUrl) {
      window.open(generatedWhatsAppUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0A0A0A] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-left space-y-6 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-studio-red flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Fermer la fenêtre de réservation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* =========================================================================
            VIEW 1: BOOKING & QUOTE FORM
           ========================================================================= */}
        {view === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Modal Header */}
            <div className="space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-red/15 border border-studio-red/30 text-studio-red text-[11px] font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Réservation & Devis Studio</span>
              </div>
              <h3 id="booking-modal-title" className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Réservez votre séance
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                Indiquez vos besoins ci-dessous pour être mis en relation directe avec l'équipe TRA Studio via WhatsApp.
              </p>
            </div>

            {/* Validation Alert Box if required fields are missing */}
            {errors.general && (
              <div className="p-3.5 rounded-2xl bg-studio-red/20 border border-studio-red text-zinc-100 flex items-start gap-2.5 text-xs animate-in shake duration-200">
                <AlertCircle className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{errors.general}</span>
              </div>
            )}

            {/* FORM INPUTS */}
            <div className="space-y-4">
              
              {/* Row 1: Nom complet (Required) & Téléphone (Required) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* 1. Nom complet — Required */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                    Nom complet <span className="text-studio-red font-black">*</span>
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
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined, general: undefined }));
                      }}
                      className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 rounded-xl text-xs text-white placeholder-zinc-500 transition-colors focus:outline-none ${
                        errors.fullName
                          ? 'border-2 border-studio-red focus:border-studio-red'
                          : 'border border-zinc-800 focus:border-studio-red'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-[10px] text-studio-red font-semibold block">{errors.fullName}</span>
                  )}
                </div>

                {/* 2. Numéro de téléphone — Required */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                    Numéro de téléphone <span className="text-studio-red font-black">*</span>
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
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined, general: undefined }));
                      }}
                      className={`w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 rounded-xl text-xs text-white placeholder-zinc-500 font-mono transition-colors focus:outline-none ${
                        errors.phone
                          ? 'border-2 border-studio-red focus:border-studio-red'
                          : 'border border-zinc-800 focus:border-studio-red'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-studio-red font-semibold block">{errors.phone}</span>
                  )}
                </div>

              </div>

              {/* Row 2: Service souhaité (Required dropdown) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                  Service souhaité <span className="text-studio-red font-black">*</span>
                </label>
                <div className="relative">
                  <Film className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-10 pr-4 h-11 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors cursor-pointer"
                  >
                    {availableServices.map((srv, idx) => (
                      <option key={idx} value={srv} className="bg-[#0A0A0A] text-white py-1">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Date souhaitée & Heure souhaitée (Both Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* 4. Date souhaitée — Optional */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Date souhaitée <span className="text-zinc-600 font-normal">(Optionnel)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors"
                    />
                  </div>
                </div>

                {/* 5. Heure souhaitée — Optional */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Heure souhaitée <span className="text-zinc-600 font-normal">(Optionnel)</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Ex: 14:00 ou Matinée"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors"
                    />
                  </div>
                </div>

              </div>

              {/* Row 4: Adresse e-mail (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Adresse e-mail <span className="text-zinc-600 font-normal">(Optionnel)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="contact@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 h-11 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors"
                  />
                </div>
              </div>

              {/* Row 5: Message / Détails supplémentaires (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Message / Détails supplémentaires <span className="text-zinc-600 font-normal">(Optionnel)</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3 pointer-events-none" />
                  <textarea
                    rows={2}
                    placeholder="Précisez votre projet, nombre d'intervenants, besoins de montage..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors resize-none"
                  />
                </div>
              </div>

            </div>

            {/* Submit Button: “Continuer sur WhatsApp” */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full h-13 rounded-2xl bg-studio-red hover:bg-studio-redHover text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-studio-red/30 transition-all cursor-pointer group active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Continuer sur WhatsApp</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              
              <p className="text-center text-[11px] text-zinc-500">
                La demande sera pré-remplie dans WhatsApp. Vous confirmerez l'envoi en direct avec le studio.
              </p>
            </div>
          </form>
        )}

        {/* =========================================================================
            VIEW 2: SUCCESS STYLE MESSAGE & WHATSAPP REDIRECTION CONFIRMATION
           ========================================================================= */}
        {view === 'success' && (
          <div className="space-y-6 py-2 animate-in zoom-in-95 duration-200">
            {/* Top Success Badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-studio-red/15 border border-studio-red/40 text-studio-red flex items-center justify-center mx-auto shadow-xl shadow-studio-red/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Demande préparée avec succès !
                </h3>
                {/* EXACT REQUIRED MESSAGE */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                  Votre demande est prête. Envoyez le message sur WhatsApp pour finaliser votre demande.
                </p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3 text-xs text-zinc-300">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                <span className="font-bold text-white uppercase text-[11px] tracking-wider">
                  Récapitulatif de votre demande :
                </span>
                <span className="px-2 py-0.5 rounded bg-studio-red/20 text-studio-red font-mono text-[10px] font-bold">
                  Prêt à envoyer
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-zinc-500 font-semibold block text-[11px]">Nom complet :</span>
                  <span className="text-white font-bold">{fullName}</span>
                </div>

                <div>
                  <span className="text-zinc-500 font-semibold block text-[11px]">Téléphone :</span>
                  <span className="text-white font-mono font-bold">{phone}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-zinc-500 font-semibold block text-[11px]">Service souhaité :</span>
                  <span className="text-studio-red font-bold">{service}</span>
                </div>

                {preferredDate && (
                  <div>
                    <span className="text-zinc-500 font-semibold block text-[11px]">Date souhaitée :</span>
                    <span className="text-white">{preferredDate}</span>
                  </div>
                )}

                {preferredTime && (
                  <div>
                    <span className="text-zinc-500 font-semibold block text-[11px]">Heure souhaitée :</span>
                    <span className="text-white">{preferredTime}</span>
                  </div>
                )}

                {email && (
                  <div className="sm:col-span-2">
                    <span className="text-zinc-500 font-semibold block text-[11px]">Email :</span>
                    <span className="text-white">{email}</span>
                  </div>
                )}

                {message && (
                  <div className="sm:col-span-2 pt-1 border-t border-zinc-800/60">
                    <span className="text-zinc-500 font-semibold block text-[11px]">Message / Détails :</span>
                    <p className="text-zinc-300 leading-relaxed italic mt-0.5">{message}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleOpenWhatsAppManually}
                className="w-full h-13 rounded-2xl bg-studio-red hover:bg-studio-redHover text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-studio-red/30 transition-all cursor-pointer active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Ouvrir WhatsApp pour envoyer</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setView('form')}
                  className="py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modifier mes informations</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
