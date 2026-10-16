import React, { useState, useEffect } from 'react';
import { StudioSettings } from '../../types';
import {
  X,
  Check,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  HelpCircle,
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

export const AVAILABLE_SERVICES_LIST = [
  'PODCAST STUDIO (Multicam 4K & Son Broadcast)',
  'SHOOTING PHOTO & VIDÉO (Mode & Lookbook)',
  'SOCIAL MEDIA CONTENT (Formats Verticaux 9:16)',
  'BRANDING & MOTION DESIGN (Animation 2D/3D)',
  'VIDÉO CLIP & TEASER (Cinématique)',
  'CORPORATE & INTERVIEWS (Portraits d’Entreprise)',
  'Projet Sur-Mesure / Autre',
];

const TIME_SLOTS = [
  '10:00 - 12:00 (Matinée)',
  '12:00 - 14:00 (Midi)',
  '14:00 - 16:00 (Après-midi)',
  '16:00 - 18:00 (Fin de journée)',
  '18:00 - 20:00 (Soirée)',
  'Créneau flexible / À convenir',
];

const BUDGET_RANGES = [
  'Moins de 2 000 DH',
  '2 000 - 4 000 DH',
  '4 000 - 8 000 DH',
  'Plus de 8 000 DH',
  'À définir selon devis',
];

interface StudioBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: StudioSettings;
  initialService?: string | null;
  /**
   * Optional alternative submission hook (e.g. for future external webhook/formspree)
   */
  onExternalSubmit?: (payload: Record<string, any>) => Promise<void>;
}

export const StudioBookingModal: React.FC<StudioBookingModalProps> = ({
  isOpen,
  onClose,
  settings,
  initialService,
  onExternalSubmit,
}) => {
  // Form step: 'form' | 'review' | 'sent'
  const [step, setStep] = useState<'form' | 'review' | 'sent'>('form');

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+212 ');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState<string>(AVAILABLE_SERVICES_LIST[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState<string>(TIME_SLOTS[0]);
  const [budgetRange, setBudgetRange] = useState<string>(BUDGET_RANGES[0]);
  const [projectDescription, setProjectDescription] = useState('');

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');

  // Sync initial service when opened
  useEffect(() => {
    if (initialService) {
      const match = AVAILABLE_SERVICES_LIST.find((s) =>
        s.toLowerCase().includes(initialService.toLowerCase()) ||
        initialService.toLowerCase().includes(s.toLowerCase().split(' ')[0])
      );
      if (match) {
        setSelectedService(match);
      } else {
        setSelectedService(initialService);
      }
    }
    // Reset to form view when reopening
    if (isOpen) {
      setStep('form');
      setValidationErrors([]);
    }
  }, [initialService, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validate form before review
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!fullName.trim()) {
      errors.push('Veuillez renseigner votre nom complet.');
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone === '+212' || cleanPhone.length < 8) {
      errors.push('Veuillez renseigner un numéro de téléphone valide.');
    }

    if (!selectedService) {
      errors.push('Veuillez sélectionner une prestation.');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    // Generate the professional French WhatsApp message
    const lines = [
      'Bonjour TRA Studio ! 🎬',
      'Je souhaite faire une demande de réservation pour une session en studio.',
      '',
      '📋 DÉTAILS DE MA DEMANDE :',
      `• Prestation souhaitée : ${selectedService}`,
    ];

    if (preferredDate.trim()) {
      lines.push(`• Date souhaitée : ${preferredDate.trim()}`);
    }
    if (preferredTime) {
      lines.push(`• Créneau horaire : ${preferredTime}`);
    }
    if (budgetRange) {
      lines.push(`• Budget indicatif : ${budgetRange}`);
    }

    lines.push('');
    lines.push('👤 MES COORDONNÉES :');
    lines.push(`• Nom complet : ${fullName.trim()}`);
    lines.push(`• Téléphone : ${cleanPhone}`);
    if (email.trim()) {
      lines.push(`• Email : ${email.trim()}`);
    }

    if (projectDescription.trim()) {
      lines.push('');
      lines.push(`📝 DESCRIPTION DU PROJET :`);
      lines.push(projectDescription.trim());
    }

    lines.push('');
    lines.push('Je souhaite vérifier les disponibilités du plateau avec vous et finaliser les détails. Merci !');

    const messageText = lines.join('\n');
    const waNumber = (settings?.whatsappNumber || '212660719968').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageText)}`;

    setGeneratedWhatsAppUrl(waUrl);
    setStep('review');
  };

  // Final submission on WhatsApp
  const handleSendOnWhatsApp = async () => {
    // If an alternative external hook is provided, call it in the background
    if (onExternalSubmit) {
      try {
        await onExternalSubmit({
          fullName,
          phone,
          email,
          service: selectedService,
          preferredDate,
          preferredTime,
          budgetRange,
          projectDescription,
          submittedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('External submit hook failed, continuing to WhatsApp:', err);
      }
    }

    // Launch WhatsApp
    if (generatedWhatsAppUrl) {
      window.open(generatedWhatsAppUrl, '_blank', 'noopener,noreferrer');
    }
    setStep('sent');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-all cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* =========================================================================
            HEADER OF MODAL
           ========================================================================= */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-red/10 border border-studio-red/30 text-studio-red text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Demande de Réservation • TRA Studio Témara</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            {step === 'review'
              ? 'Vérifiez votre demande'
              : step === 'sent'
              ? 'Message préparé avec succès'
              : 'Réserver votre session'}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400">
            {step === 'review'
              ? 'Vérifiez les informations ci-dessous avant d’ouvrir WhatsApp pour transmettre votre demande.'
              : step === 'sent'
              ? 'Votre message a été rédigé. Envoyez-le sur WhatsApp pour échanger avec notre équipe.'
              : 'Remplissez le formulaire ci-dessous pour vérifier les disponibilités et planifier votre tournage.'}
          </p>
        </div>

        {/* =========================================================================
            VIEW 1: FORM ENTRY
           ========================================================================= */}
        {step === 'form' && (
          <form onSubmit={handleProceedToReview} className="space-y-5">
            
            {/* Validation errors */}
            {validationErrors.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-studio-red/25 border border-studio-red text-xs text-zinc-100 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-white">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Veuillez corriger les points suivants :</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5">
                  {validationErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Service selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                Prestation souhaitée <span className="text-studio-red">*</span>
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full h-11 px-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors cursor-pointer"
              >
                {AVAILABLE_SERVICES_LIST.map((srv, idx) => (
                  <option key={idx} value={srv} className="bg-zinc-950 text-white">
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid 2 Columns: Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Nom complet */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Nom complet <span className="text-studio-red">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Yasmine Alaoui"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3.5 h-11 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors"
                  />
                </div>
              </div>

              {/* Téléphone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Téléphone / WhatsApp <span className="text-studio-red">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+212 6 XX XX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 h-11 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Date souhaitée */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Date souhaitée <span className="text-zinc-600 font-normal">(Optionnel)</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Ex: Samedi 24 Octobre, ou au plus vite"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-3.5 h-11 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors"
                  />
                </div>
              </div>

              {/* Créneau horaire */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Créneau horaire préféré <span className="text-zinc-600 font-normal">(Optionnel)</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full pl-10 pr-3.5 h-11 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors cursor-pointer"
                  >
                    {TIME_SLOTS.map((t, idx) => (
                      <option key={idx} value={t} className="bg-zinc-950 text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget indicatif */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Budget indicatif <span className="text-zinc-600 font-normal">(Optionnel)</span>
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full pl-10 pr-3.5 h-11 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-studio-red transition-colors cursor-pointer"
                  >
                    {BUDGET_RANGES.map((b, idx) => (
                      <option key={idx} value={b} className="bg-zinc-950 text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email (Optionnel) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Adresse email <span className="text-zinc-600 font-normal">(Optionnel)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 h-11 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Description du projet */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Description / Détails du projet <span className="text-zinc-600 font-normal">(Optionnel)</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  placeholder="Ex: Nombre d’invités, thématique du podcast, besoin de montage ou de retouches..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-studio-red transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit button: Proceed to Review */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full h-13 rounded-2xl bg-studio-red hover:bg-studio-redHover text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-studio-red/30 transition-all cursor-pointer group"
              >
                <span>Vérifier et continuer vers WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-[11px] text-zinc-500">
                Vous pourrez vérifier l’intégralité de vos informations à l'étape suivante.
              </p>
            </div>
          </form>
        )}

        {/* =========================================================================
            VIEW 2: REVIEW & CONFIRMATION
           ========================================================================= */}
        {step === 'review' && (
          <div className="space-y-6">
            {/* Recap Box */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3.5 text-xs text-zinc-300">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <span className="font-bold text-white uppercase text-xs tracking-wider">
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
                  <span className="text-zinc-500 font-semibold block text-[11px]">Prestation choisie :</span>
                  <span className="text-white font-bold text-studio-red">{selectedService}</span>
                </div>

                {preferredDate && (
                  <div>
                    <span className="text-zinc-500 font-semibold block text-[11px]">Date souhaitée :</span>
                    <span className="text-white">{preferredDate}</span>
                  </div>
                )}

                {preferredTime && (
                  <div>
                    <span className="text-zinc-500 font-semibold block text-[11px]">Créneau :</span>
                    <span className="text-white">{preferredTime}</span>
                  </div>
                )}

                {budgetRange && (
                  <div>
                    <span className="text-zinc-500 font-semibold block text-[11px]">Budget indicatif :</span>
                    <span className="text-white">{budgetRange}</span>
                  </div>
                )}

                {email && (
                  <div>
                    <span className="text-zinc-500 font-semibold block text-[11px]">Email :</span>
                    <span className="text-white">{email}</span>
                  </div>
                )}

                {projectDescription && (
                  <div className="sm:col-span-2 pt-1 border-t border-zinc-800/60">
                    <span className="text-zinc-500 font-semibold block text-[11px]">Détails du projet :</span>
                    <p className="text-zinc-300 leading-relaxed italic mt-0.5">{projectDescription}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Instruction Notice */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-400">
              <HelpCircle className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
              <div className="space-y-0.5 leading-relaxed">
                <span className="font-bold text-white block">Important :</span>
                <span>
                  Votre demande n'est transmise qu’une fois le message WhatsApp envoyé. L’équipe TRA Studio confirmera la disponibilité du plateau avant validation définitive.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleSendOnWhatsApp}
                className="w-full h-13 sm:h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Envoyer ma demande sur WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full py-2.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Modifier mes informations</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: DISPATCHED / SENT CONFIRMATION
           ========================================================================= */}
        {step === 'sent' && (
          <div className="space-y-6 py-4 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
                Votre message a été généré !
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                WhatsApp s’est ouvert avec vos coordonnées pré-remplies. Cliquez sur <strong>« Envoyer »</strong> dans l'application pour démarrer l'échange avec l'équipe TRA Studio.
              </p>
            </div>

            {/* Re-open WhatsApp button if blocked by browser */}
            <div className="space-y-3 max-w-md mx-auto pt-2">
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-13 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Ouvrir à nouveau WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Fermer cette fenêtre
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
