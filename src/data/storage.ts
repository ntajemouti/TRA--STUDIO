import { StudioPackage, StudioSettings, QuoteRequest } from '../types';
import { INITIAL_PACKAGES, INITIAL_SETTINGS } from './initialData';

const STORAGE_KEYS = {
  PACKAGES: 'tra_packages_prod_v8',
  SETTINGS: 'tra_settings_prod_v4',
  QUOTES: 'tra_quotes_prod_v2',
};

// --- PURE FRONTEND STORAGE (Zero backend / Zero external runtime dependencies) ---

export function getPackages(): StudioPackage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (!raw) return INITIAL_PACKAGES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PACKAGES;
  } catch {
    return INITIAL_PACKAGES;
  }
}

export function savePackages(packages: StudioPackage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  } catch (err) {
    console.warn('Failed to save packages locally', err);
  }
}

export function getSettings(): StudioSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return INITIAL_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_SETTINGS, ...parsed };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: StudioSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save settings locally', err);
  }
}

export function getQuotes(): QuoteRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addQuote(data: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
  const quotes = getQuotes();
  const newQuote: QuoteRequest = {
    ...data,
    id: `quote-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  quotes.unshift(newQuote);
  try {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  } catch (err) {
    console.warn('Failed to save quote locally', err);
  }
  return newQuote;
}
