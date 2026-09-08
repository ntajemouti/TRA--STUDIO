import React, { useState } from 'react';
import { StudioSettings } from '../../types';
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Mail, 
  MapPin, 
  Megaphone, 
  KeyRound, 
  Save, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff,
  Navigation
} from 'lucide-react';
import { getAdminPassword, saveAdminPassword } from '../../data/storage';

interface AdminStudioSettingsProps {
  settings: StudioSettings;
  onSaveSettings: (settings: StudioSettings) => void;
}

export const AdminStudioSettings: React.FC<AdminStudioSettingsProps> = ({
  settings,
  onSaveSettings,
}) => {
  // Studio Info States
  const [studioName, setStudioName] = useState(settings.studioName || 'TRA Studio');
  const [tagline, setTagline] = useState(settings.tagline || '');
  const [address, setAddress] = useState(settings.address || 'Hay Al Alaouiyine, Boulevard Hassan II, Imm. B, 1er Étage, Témara');
  const [mapsUrl, setMapsUrl] = useState(
    settings.mapsUrl && !settings.mapsUrl.includes('share.google')
      ? settings.mapsUrl
      : 'https://www.google.com/maps/search/?api=1&query=TRA+STUDIO,+Boulevard+Hassan+II,+Temara'
  );
  const [phone, setPhone] = useState(settings.phone || '+212 660-719968');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '212660719968');
  const [instagramUrl, setInstagramUrl] = useState(
    settings.instagramUrl || 'https://www.instagram.com/tra__studio?igsi=MThkb3NqdzBmODVuYQ=='
  );
  const [instagramHandle, setInstagramHandle] = useState(settings.instagramHandle || 'tra__studio');
  const [email, setEmail] = useState(settings.email || 'Tawfiqbennani@tra-studio.com');

  // Announcement Banner
  const [announcementEnabled, setAnnouncementEnabled] = useState(
    settings.announcement?.enabled || false
  );
  const [announcementText, setAnnouncementText] = useState(
    settings.announcement?.text || '✨ Bienvenue chez TRA Studio • Réservez votre séance en direct'
  );

  // Password Management States
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // General Settings Save State
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean WhatsApp number (digits only)
    const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');

    const updated: StudioSettings = {
      ...settings,
      studioName: studioName.trim(),
      tagline: tagline.trim(),
      address: address.trim(),
      mapsUrl: mapsUrl.trim(),
      phone: phone.trim(),
      whatsappNumber: cleanWa,
      instagramUrl: instagramUrl.trim(),
      instagramHandle: instagramHandle.trim().replace(/^@/, ''),
      email: email.trim(),
      announcement: {
        enabled: announcementEnabled,
        text: announcementText.trim(),
      },
    };

    onSaveSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    const actualPwd = getAdminPassword();

    if (currentPasswordInput !== actualPwd) {
      setPasswordError('Le mot de passe actuel est incorrect.');
      return;
    }

    if (newPasswordInput.length < 6) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('La confirmation ne correspond pas au nouveau mot de passe.');
      return;
    }

    saveAdminPassword(newPasswordInput);
    setPasswordSuccess(true);
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  const testWaUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-studio-card border border-studio-border p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-studio-red" />
            <span>Contrôle Total du Studio</span>
          </div>
          <h2 className="text-xl font-black text-white">Paramètres Généraux & Contact</h2>
          <p className="text-xs text-zinc-400">
            Modifiez ici l'identité, vos liens de contact et la sécurité. Tout changement est immédiatement synchronisé pour les clients.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Modifications enregistrées & synchronisées !</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveGeneral} className="space-y-8">
        {/* Section 1: Identité du Studio */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-studio-border/60">
            <Building2 className="w-4 h-4 text-studio-red" />
            <span>Identité & Localisation</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Nom du Studio
              </label>
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                placeholder="TRA Studio"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Slogan / Sous-titre
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Studio de création photo & vidéo minimaliste et premium"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            <div className="space-y-1.5 md:col-span-3">
              <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-studio-red" />
                <span>Adresse & Ville</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Hay Al Alaouiyine, Boulevard Hassan II, Témara"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
              />
            </div>

            {/* Google Maps Link */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-studio-red" />
                <span>Lien de Localisation Google Maps (Itinéraire)</span>
              </label>
              <input
                type="url"
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                placeholder="https://www.google.com/maps/search/?api=1&query=TRA+STUDIO,+Boulevard+Hassan+II,+Temara"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-mono text-[11px]"
              />
              <p className="text-[10px] text-zinc-500">
                Ce lien est cliquable par les clients dans le footer et la section "Plan d'Accès" pour lancer l'itinéraire direct sur Google Maps.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Coordonnées de Contact & Réseaux Sociaux */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-studio-border/60">
            <Phone className="w-4 h-4 text-studio-red" />
            <span>Coordonnées de Contact & Réseaux Sociaux</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Numéro de Téléphone (Appels)</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+212 660-719968"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Numéro WhatsApp (Format international)</span>
                </label>
                <a
                  href={testWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
                >
                  <span>Tester le lien</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="212660719968"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
              <span className="text-[10px] text-zinc-400">
                Saisissez l'indicatif sans le « + » (ex: 212660719968 pour le Maroc).
              </span>
            </div>

            {/* Instagram URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Lien Profil Instagram</span>
                </label>
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-1 underline"
                  >
                    <span>Ouvrir</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://www.instagram.com/tra__studio"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
            </div>

            {/* Instagram Handle */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Nom d'utilisateur Instagram (sans @)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-xs text-zinc-500 font-mono">
                  @
                </span>
                <input
                  type="text"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                  placeholder="tra__studio"
                  className="w-full pl-8 pr-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                  required
                />
              </div>
            </div>

            {/* Official Email */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-300 uppercase flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Email Officiel du Studio</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tawfiqbennani@tra-studio.com"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bandeau Annonce / Message Client */}
        <div className="bg-studio-card border border-studio-border rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border/60">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Bandeau Annonce Client (Promo / Alerte)</span>
            </h3>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-studio-red"></div>
              <span className="ml-2 text-xs font-bold text-zinc-300">
                {announcementEnabled ? 'Actif' : 'Désactivé'}
              </span>
            </label>
          </div>

          <p className="text-xs text-zinc-400">
            Lorsque ce bandeau est activé, il s'affiche tout en haut de la page de réservation pour tous les visiteurs (ex: réductions, fermeture temporaire, ou nouveautés).
          </p>

          <input
            type="text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            disabled={!announcementEnabled}
            placeholder="ex: 🔥 Offre de la semaine : 1 heure offerte pour toute session de 3h !"
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs transition-all ${
              announcementEnabled
                ? 'bg-zinc-900 border border-zinc-700 text-white focus:ring-1 focus:ring-studio-red'
                : 'bg-zinc-950/60 border border-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          />
        </div>

        {/* Global Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer Tous les Paramètres</span>
          </button>
        </div>
      </form>

      {/* Section 4: Sécurité & Mot de Passe Admin */}
      <div className="bg-studio-card border border-red-900/30 rounded-3xl p-6 shadow-xl space-y-5 mt-10">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-studio-red" />
              <span>Sécurité & Mot de Passe Administrateur</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Modifiez le mot de passe maître qui protège l'accès à ce tableau de bord.
            </p>
          </div>
        </div>

        {passwordError && (
          <div className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs font-semibold">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Mot de passe administrateur modifié avec succès !</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-zinc-300 uppercase">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                placeholder="Saisissez votre mot de passe actuel"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Nouveau mot de passe
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="Minimum 6 caractères"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300 uppercase">
                Confirmer le mot de passe
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                placeholder="Répétez le nouveau mot de passe"
                className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-studio-red" />
            <span>Mettre à jour le mot de passe</span>
          </button>
        </form>
      </div>
    </div>
  );
};
