import React from 'react';
import { StudioSettings } from '../../types';
import { Phone, MessageCircle, Instagram, Mail, MapPin, Lock, Sparkles, Navigation, ExternalLink } from 'lucide-react';

interface FooterProps {
  settings: StudioSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const waNumber = settings.whatsappNumber || '212660719968';
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;
  const phone = settings.phone || '+212 660-719968';
  const igUrl = settings.instagramUrl || 'https://www.instagram.com/tra__studio';
  const igHandle = settings.instagramHandle || 'tra__studio';
  const email = settings.email || 'Tawfiqbennani@tra-studio.com';
  const address = settings.address || 'Hay Al Alaouiyine, Boulevard Hassan II, Imm. B, 1er Étage, Témara';
  const mapsUrl = settings.mapsUrl && !settings.mapsUrl.includes('share.google')
    ? settings.mapsUrl
    : 'https://www.google.com/maps/search/?api=1&query=TRA+STUDIO,+Boulevard+Hassan+II,+Temara';
  const itineraryUrl = 'https://www.google.com/maps/dir/?api=1&destination=TRA+STUDIO,+Boulevard+Hassan+II,+Temara';

  return (
    <footer className="w-full mt-16 border-t border-zinc-900 bg-zinc-950/80 text-zinc-400 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/tra-logo.png"
                alt={settings.studioName}
                className="h-8 w-auto object-contain brightness-105"
              />
              <span className="text-sm font-black tracking-widest uppercase text-white">
                {settings.studioName || 'TRA STUDIO'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              {settings.tagline ||
                'Plateau de production, podcast broadcast & shooting photo d’exception à Témara. Matériel cinéma 4K et direction artistique sur mesure.'}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors group pt-1"
              title="Ouvrir la localisation sur Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-studio-red shrink-0 group-hover:scale-110 transition-transform" />
              <span className="underline decoration-zinc-700 underline-offset-4 group-hover:decoration-studio-red">{address}</span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-studio-red transition-colors ml-0.5" />
            </a>
          </div>

          {/* Col 2: Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Réservations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={itineraryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-studio-red hover:text-white transition-colors font-bold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Itinéraire Google Maps ↗</span>
                </a>
              </li>
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp direct</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-studio-red" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="truncate">{email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Réseaux & Studio */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Réseaux Sociaux
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>@{igHandle}</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-semibold text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-studio-red animate-pulse"></span>
                  <span>Ouvert du Lundi au Samedi</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Admin access */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} {settings.studioName || 'TRA Studio'}. Tous droits réservés.</p>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-zinc-900/50"
            title="Accès réservé à la direction du studio"
          >
            <Lock className="w-3 h-3 text-studio-red/70" />
            <span>Espace Direction / Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
