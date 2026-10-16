import { Booking, QuoteRequest, StudioPackage, StudioSettings } from '../types';
import { STUDIO_WHATSAPP_NUMBER } from '../config/booking';

export const INITIAL_PACKAGES: StudioPackage[] = [
  {
    id: 'srv-podcast-montage',
    name: 'Podcast + Montage',
    duration: 1,
    price: 1500,
    subtitle: 'Parfait pour un rendu fini et professionnel.',
    description: 'Studio au choix entièrement équipé avec 3 caméras 4K, 2 micros Shure et un monteur vidéo dédié pour un épisode prêt à diffuser.',
    popular: true,
    active: true,
    icon: 'Mic',
    badge: '⚡ Meilleur Option',
    features: [
      'Studio au choix entièrement équipé',
      '3 caméras et 2 micros Shure',
      'Monteur vidéo dédié inclus',
      'Montage complet + étalonnage + mixage',
      'Fichiers bruts remis + 1 tour de révision',
    ],
    equipmentItems: [
      { text: 'Studio au choix entièrement équipé.', included: true },
      { text: 'Un opérateur de studio pour la captation audio et vidéo.', included: true },
      { text: '3 caméras et 2 micros Shure.', included: true },
      { text: 'Une table de mixage audio professionnelle.', included: true },
      { text: 'Un monteur vidéo dédié pour monter votre épisode.', included: true },
    ],
    deliverablesItems: [
      { text: 'Les fichiers bruts audio et vidéo.', included: true },
      { text: 'Montage avec mastering audio et étalonnage.', included: true },
      { text: '1 tour de révision.', included: true },
      { text: 'Suppression des parties indésirables.', included: true },
      { text: 'Une sauvegarde des fichiers bruts pendant 7 jours.', included: true },
    ],
  },
  {
    id: 'srv-podcast-brut',
    name: 'Podcast Tournage Brut',
    duration: 1,
    price: 1000,
    subtitle: 'Séquences brutes du tournage.',
    description: 'Enregistrement de podcast en studio tout équipé avec opérateur et régie multicam, rushs audio et vidéo bruts remis sans montage.',
    popular: false,
    active: true,
    icon: 'Camera',
    features: [
      'Studio au choix entièrement équipé',
      '3 caméras et 2 micros Shure',
      'Opérateur de studio dédié',
      'Fichiers bruts audio et vidéo remis',
      'Sauvegarde des rushs pendant 7 jours',
    ],
    equipmentItems: [
      { text: 'Studio au choix entièrement équipé.', included: true },
      { text: 'Un opérateur de studio pour la captation audio et vidéo.', included: true },
      { text: '3 caméras et 2 micros Shure.', included: true },
      { text: 'Une table de mixage audio professionnelle.', included: true },
      { text: 'Un monteur vidéo dédié pour monter votre épisode.', included: false },
    ],
    deliverablesItems: [
      { text: 'Les fichiers bruts audio et vidéo.', included: true },
      { text: 'Montage avec mastering audio et étalonnage.', included: false },
      { text: '1 tour de révision.', included: false },
      { text: 'Suppression des parties indésirables.', included: false },
      { text: 'Une sauvegarde des fichiers bruts pendant 7 jours.', included: true },
    ],
  },
  {
    id: 'srv-reels-montage',
    name: 'Reels + Montage',
    duration: 1,
    price: 1900,
    subtitle: 'Idéal pour une publication immédiate.',
    description: 'Production intensive de contenus verticaux pour réseaux sociaux : captation multi-angles et jusqu’à 10 reels montés et sous-titrés.',
    popular: false,
    active: true,
    icon: 'Smartphone',
    features: [
      'Studio au choix entièrement équipé',
      'Jusqu’à 10 reels montés avec sous-titres',
      '2 Photos professionnelles offertes',
      'Opérateur et monteur vidéo dédiés',
      'Sauvegarde des rushs pendant 7 jours',
    ],
    equipmentItems: [
      { text: 'Studio au choix entièrement équipé.', included: true },
      { text: 'Un opérateur de studio pour la captation audio et vidéo.', included: true },
      { text: '3 caméras et 2 micros Shure.', included: true },
      { text: 'Une table de mixage audio professionnelle.', included: true },
      { text: 'Un monteur vidéo dédié pour monter votre épisode.', included: true },
    ],
    deliverablesItems: [
      { text: 'Les fichiers bruts audio et vidéo.', included: true },
      { text: 'Jusqu’à 10 reels professionnels montés avec sous titrage', included: true },
      { text: '1 tour de révision.', included: true },
      { text: '2 Photos professionnels.', included: true },
      { text: 'Une sauvegarde des fichiers bruts pendant 7 jours.', included: true },
    ],
  },
];

export const INITIAL_SETTINGS: StudioSettings = {
  studioName: 'TRA Studio',
  tagline: 'Studio de création photo & vidéo minimaliste et premium',
  phone: '+212 660-719968',
  email: 'Tawfiqbennani@tra-studio.com',
  instagramHandle: 'tra__studio',
  instagramUrl: 'https://www.instagram.com/tra__studio?igsi=MThkb3NqdzBmODVuYQ==',
  whatsappNumber: STUDIO_WHATSAPP_NUMBER,
  availableTimeSlots: [
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ],
  openDays: [1, 2, 3, 4, 5, 6], // Lundi au Samedi
  blockedDates: [],
  blockedSlots: [],
  address: 'Hay Al Alaouiyine, Boulevard Hassan II, Imm. B, 1er Étage, Témara',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=TRA+STUDIO,+Boulevard+Hassan+II,+Temara',
  announcement: {
    enabled: false,
    text: '✨ Bienvenue chez TRA Studio • Réservez votre séance de production en direct',
  },
};

// Start with 100% EMPTY bookings and quotes for real production launch
export const INITIAL_BOOKINGS: Booking[] = [];
export const INITIAL_QUOTES: QuoteRequest[] = [];

// Strong default master password for admin
export const DEFAULT_ADMIN_PASSWORD = 'TRA@Studio#Master2026!';
