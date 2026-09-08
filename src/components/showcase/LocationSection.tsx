import React from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Car } from 'lucide-react';
import { StudioSettings } from '../../types';

interface LocationSectionProps {
  settings: StudioSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings }) => {
  const mapsUrl = settings.mapsUrl && !settings.mapsUrl.includes('share.google')
    ? settings.mapsUrl
    : 'https://www.google.com/maps/search/?api=1&query=TRA+STUDIO,+Boulevard+Hassan+II,+Temara';

  const itineraryUrl = 'https://www.google.com/maps/dir/?api=1&destination=TRA+STUDIO,+Boulevard+Hassan+II,+Temara';
  const address = settings.address || 'Hay Al Alaouiyine, Boulevard Hassan II, Imm. B, 1er Étage, Témara';

  return (
    <section id="location" className="py-16 sm:py-20 bg-zinc-950 border-t border-zinc-900 scroll-mt-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-studio-red/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-extrabold uppercase tracking-widest text-zinc-300 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-studio-red" />
            <span>Plan d'Accès & Situation</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Localisation de <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-white">TRA Studio</span>
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Situé au cœur de Témara sur le Boulevard Hassan II. Studios insonorisés haut de gamme facilement accessibles depuis Témara, Rabat et toute la région.
          </p>
        </div>

        {/* 2-Column Card: Information & Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-studio-card border border-studio-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl text-left">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-studio-red bg-studio-red/10 px-3 py-1 rounded-full border border-studio-red/20 inline-block">
                  Studio Officiel Témara
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  TRA Studio Témara
                </h3>
                <p className="text-xs text-zinc-400">
                  Plateau de production audiovisuelle, podcast multicam 4K et shooting professionnel.
                </p>
              </div>

              {/* Details List */}
              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                  <MapPin className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-xs uppercase tracking-wide">Adresse précise</div>
                    <p className="text-zinc-400 mt-0.5 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                  <Car className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-xs uppercase tracking-wide">Accès & Transport</div>
                    <p className="text-zinc-400 mt-0.5 leading-relaxed">
                      Boulevard Hassan II, Hay Al Alaouiyine. À 15 min du centre de Rabat. Stationnement et taxis à proximité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                  <Clock className="w-4 h-4 text-studio-red shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-xs uppercase tracking-wide">Horaires des séances</div>
                    <p className="text-zinc-400 mt-0.5 leading-relaxed">
                      Du Lundi au Samedi de 10h00 à 20h00 (sur réservation confirmée).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action CTA */}
            <div className="pt-2">
              <a
                href={itineraryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-13 rounded-2xl bg-studio-red hover:bg-studio-redHover text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-studio-red/30 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Lancer l'Itinéraire sur Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Right Map Embed Card */}
          <div className="lg:col-span-7 bg-studio-card border border-studio-border rounded-3xl overflow-hidden shadow-2xl relative min-h-[350px] sm:min-h-[420px] flex flex-col">
            <iframe
              title="Google Maps TRA Studio Témara"
              src="https://maps.google.com/maps?q=TRA+STUDIO,+Boulevard+Hassan+II,+Temara,+Morocco&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            ></iframe>

            {/* Floating Overlay Badge on Map */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-zinc-950/95 backdrop-blur-md border border-zinc-800 p-3.5 rounded-2xl shadow-2xl flex items-center justify-between sm:justify-start gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-studio-red animate-pulse"></div>
                <div className="text-xs text-left">
                  <span className="font-bold text-white">TRA Studio</span>
                  <span className="text-zinc-400 text-[11px] block">Témara, Maroc</span>
                </div>
              </div>

              <a
                href={itineraryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-studio-red hover:bg-studio-redHover text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg shadow-studio-red/30"
              >
                <span>Y aller (GPS)</span>
                <Navigation className="w-3 h-3 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
