/**
 * =========================================================================
 * TRA STUDIO — CENTRAL BOOKING & WHATSAPP CONFIGURATION
 * =========================================================================
 * 
 * To update the official WhatsApp number for TRA Studio:
 * 1. Change the value of `STUDIO_WHATSAPP_NUMBER` below.
 * 2. FORMAT: Pure international digits ONLY (no '+', no spaces, no dashes).
 *    Example: '212660719968' for (+212 660-719968)
 * 
 * =========================================================================
 */
export const STUDIO_WHATSAPP_NUMBER = '212660719968';

export interface BookingFormData {
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  duration?: string;
  message?: string;
}

/**
 * Builds the official Click-to-Chat WhatsApp URL
 * Uses clean, universal markdown bullets to prevent encoding corruption () across devices.
 * Format: https://wa.me/NUMBER?text=ENCODED_MESSAGE
 */
export function buildWhatsAppBookingUrl(data: BookingFormData, customNumber?: string): string {
  const targetNumber = (customNumber || STUDIO_WHATSAPP_NUMBER).replace(/[^0-9]/g, '');

  const lines: string[] = [
    '*NOUVELLE DEMANDE DE RÉSERVATION — TRA STUDIO*',
    '',
    `• *Nom complet :* ${data.fullName.trim()}`,
    `• *Téléphone :* ${data.phone.trim()}`,
  ];

  if (data.email && data.email.trim()) {
    lines.push(`• *Email :* ${data.email.trim()}`);
  }

  lines.push(`• *Prestation :* ${data.service}`);

  if (data.preferredDate && data.preferredDate.trim()) {
    lines.push(`• *Date prévue :* ${data.preferredDate.trim()}`);
  }

  if (data.preferredTime && data.preferredTime.trim()) {
    lines.push(`• *Heure de début :* ${data.preferredTime.trim()}`);
  }

  if (data.duration && data.duration.trim()) {
    lines.push(`• *Durée souhaitée :* ${data.duration.trim()}`);
  }

  if (data.message && data.message.trim()) {
    lines.push('');
    lines.push(`• *Précisions / Projet :*`);
    lines.push(data.message.trim());
  }

  lines.push('');
  lines.push('___');
  lines.push('*TRA Studio — Témara, Maroc*');
  lines.push('_Demande transmise depuis le site web_');

  const fullText = lines.join('\n');
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(fullText)}`;
}
