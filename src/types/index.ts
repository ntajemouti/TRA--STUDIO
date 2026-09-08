export type BookingStatus = 'new' | 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface StudioPackage {
  id: string;
  name: string;
  duration: number; // in hours
  price: number; // in DH
  subtitle: string;
  description: string;
  features: string[];
  popular?: boolean;
  active: boolean;
  icon?: string;
  badge?: string;
  imageUrl?: string;
}

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm (e.g., '14:00')
  packageId: string;
  packageName: string;
  packageDuration: number;
  packagePrice: number;
  fullName: string;
  phone: string;
  email: string;
  instagram: string;
  peopleCount: number;
  projectNotes?: string;
  status: BookingStatus;
  adminNotes?: string;
  confirmationNotified?: boolean;
  createdAt: string;
}

export interface ClientUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  instagram?: string;
  password?: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  instagram: string;
  projectType: string;
  desiredDate?: string;
  peopleCount: number;
  budgetRange: string;
  description: string;
  services: string[];
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  adminNotes?: string;
  createdAt: string;
}

export interface BlockedSlot {
  date: string; // YYYY-MM-DD
  slot: string; // HH:mm
}

export interface StudioSettings {
  studioName: string;
  tagline: string;
  phone: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber?: string;
  mapsUrl?: string;
  availableTimeSlots: string[];
  openDays: number[]; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  blockedDates: string[]; // YYYY-MM-DD
  blockedSlots: BlockedSlot[];
  address?: string;
  announcement?: {
    enabled: boolean;
    text: string;
  };
}

export type Step = 1 | 2 | 3 | 4 | 5;

export interface BookingDraft {
  date: string | null;
  timeSlot: string | null;
  selectedPackage: StudioPackage | null;
  fullName: string;
  phone: string;
  email: string;
  instagram: string;
  peopleCount: number;
  projectNotes: string;
}

export interface ClientEditableInfo {
  fullName: string;
  phone: string;
  email: string;
  instagram: string;
  peopleCount: number;
  projectNotes?: string;
}
