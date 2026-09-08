import { Booking, QuoteRequest, StudioPackage, StudioSettings, ClientUser } from '../types';
import { DEFAULT_ADMIN_PASSWORD, INITIAL_BOOKINGS, INITIAL_PACKAGES, INITIAL_QUOTES, INITIAL_SETTINGS } from './initialData';

const STORAGE_KEYS = {
  BOOKINGS: 'tra_bookings_prod_v2',
  QUOTES: 'tra_quotes_prod_v2',
  PACKAGES: 'tra_packages_prod_v8',
  SETTINGS: 'tra_settings_prod_v4',
  PASSWORD: 'tra_admin_pwd_prod_v2',
  USERS: 'tra_client_users_prod_v1',
  CURRENT_USER: 'tra_current_client_user_v1',
};

// Global High-Entropy Cloud Sync Topic (Ensures all devices stay in sync)
const CLOUD_SYNC_TOPIC = 'tra_studio_cloud_sync_prod_99f47a82c1b5';

// --- CLOUD SYNC ENGINE ---

export type CloudSyncEvent =
  | { type: 'new_booking'; data: any }
  | { type: 'new_quote'; data: any }
  | { type: 'update_booking'; data: any }
  | { type: 'delete_booking'; data: any }
  | { type: 'update_quote'; data: any }
  | { type: 'delete_quote'; data: any }
  | { type: 'update_packages'; data: StudioPackage[] }
  | { type: 'update_settings'; data: Partial<StudioSettings> }
  | { type: 'full_sync_snapshot'; data: any };

export async function pushToCloud(event: CloudSyncEvent): Promise<void> {
  try {
    const title =
      event.type === 'new_booking'
        ? `📸 Nouvelle Réservation: ${event.data.fullName} (${event.data.packageName})`
        : event.type === 'new_quote'
        ? `📝 Demande de Devis: ${event.data.fullName}`
        : event.type === 'update_packages'
        ? `✨ Mise à jour des Prestations Studio`
        : event.type === 'update_settings'
        ? `⚙️ Mise à jour Disponibilités Studio`
        : `🔄 Mise à jour Studio: ${event.type}`;

    await fetch(`https://ntfy.sh/${CLOUD_SYNC_TOPIC}`, {
      method: 'POST',
      headers: {
        'Title': title,
        'Tags': 'camera,bell',
        'Priority': 'urgent',
        'X-Cache': 'retain',
      },
      body: JSON.stringify(event),
    });
  } catch (err) {
    console.error('Failed to push update to cloud sync channel:', err);
  }
}

export async function fetchAndSyncFromCloud(): Promise<{
  bookings: Booking[];
  quotes: QuoteRequest[];
  packages: StudioPackage[];
  settings: StudioSettings;
}> {
  try {
    const res = await fetch(`https://ntfy.sh/${CLOUD_SYNC_TOPIC}/json?poll=1&since=all`);
    if (!res.ok) throw new Error('Cloud sync request failed');

    const text = await res.text();
    let localBookings = getBookings();
    let localQuotes = getQuotes();
    let localPackages = getPackages();
    let localSettings = getSettings();

    if (!text.trim()) {
      return {
        bookings: localBookings,
        quotes: localQuotes,
        packages: localPackages,
        settings: localSettings,
      };
    }

    const lines = text.trim().split('\n');
    for (const line of lines) {
      try {
        const item = JSON.parse(line);
        if (item.event === 'message' && item.message) {
          const payload = JSON.parse(item.message);

          if (payload.type === 'new_booking' && payload.data?.id) {
            const exists = localBookings.some((b) => b.id === payload.data.id);
            if (!exists) {
              localBookings.unshift(payload.data);
            }
          } else if (payload.type === 'update_booking' && payload.data?.id) {
            const idx = localBookings.findIndex((b) => b.id === payload.data.id);
            if (idx !== -1) {
              localBookings[idx] = { ...localBookings[idx], ...payload.data };
            }
          } else if (payload.type === 'delete_booking' && payload.data?.id) {
            localBookings = localBookings.filter((b) => b.id !== payload.data.id);
          } else if (payload.type === 'new_quote' && payload.data?.id) {
            const exists = localQuotes.some((q) => q.id === payload.data.id);
            if (!exists) {
              localQuotes.unshift(payload.data);
            }
          } else if (payload.type === 'update_quote' && payload.data?.id) {
            const idx = localQuotes.findIndex((q) => q.id === payload.data.id);
            if (idx !== -1) {
              localQuotes[idx] = { ...localQuotes[idx], ...payload.data };
            }
          } else if (payload.type === 'delete_quote' && payload.data?.id) {
            localQuotes = localQuotes.filter((q) => q.id !== payload.data.id);
          } else if (payload.type === 'update_packages' && Array.isArray(payload.data)) {
            localPackages = payload.data;
            try {
              localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(localPackages));
            } catch (e) {}
          } else if (payload.type === 'update_settings' && payload.data) {
            localSettings = { ...localSettings, ...payload.data };
            try {
              localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(localSettings));
            } catch (e) {}
          } else if (payload.type === 'full_sync_snapshot' && payload.data) {
            if (Array.isArray(payload.data.packages)) {
              localPackages = payload.data.packages;
              try {
                localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(localPackages));
              } catch (e) {}
            }
            if (payload.data.settings) {
              localSettings = { ...localSettings, ...payload.data.settings };
              try {
                localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(localSettings));
              } catch (e) {}
            }
            if (Array.isArray(payload.data.bookings)) {
              for (const b of payload.data.bookings) {
                if (!localBookings.some((x) => x.id === b.id)) {
                  localBookings.push(b);
                }
              }
            }
          }
        }
      } catch (lineErr) {
        // Ignore malformed line
      }
    }

    // Persist merged data
    saveBookings(localBookings);
    saveQuotes(localQuotes);

    return {
      bookings: localBookings,
      quotes: localQuotes,
      packages: localPackages,
      settings: localSettings,
    };
  } catch (e) {
    console.warn('Cloud sync error, falling back to local data:', e);
    return {
      bookings: getBookings(),
      quotes: getQuotes(),
      packages: getPackages(),
      settings: getSettings(),
    };
  }
}

// --- BOOKINGS ---
export function getBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) return INITIAL_BOOKINGS;
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_BOOKINGS;
  }
}

export function saveBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e);
  }
}

export function addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const all = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: 'tra-bk-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
    createdAt: new Date().toISOString(),
  };
  all.unshift(newBooking);
  saveBookings(all);

  // Broadcast to cloud in background so other devices receive it immediately!
  pushToCloud({ type: 'new_booking', data: newBooking });

  return newBooking;
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const all = getBookings();
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates };
  saveBookings(all);

  // Broadcast update to cloud
  pushToCloud({ type: 'update_booking', data: { id, ...updates } });

  return all[idx];
}

export function getBookingById(id: string): Booking | null {
  const all = getBookings();
  return all.find((b) => b.id === id) || null;
}

export function updateBookingClientInfo(id: string, updates: Partial<Booking>): Booking | null {
  return updateBooking(id, updates);
}

export function getLastClientBookingId(): string | null {
  try {
    return localStorage.getItem('tra_last_client_booking_id');
  } catch {
    return null;
  }
}

export function setLastClientBookingId(id: string): void {
  try {
    localStorage.setItem('tra_last_client_booking_id', id);
  } catch (e) {
    console.error('Failed to set last client booking id', e);
  }
}

export function deleteBooking(id: string): void {
  const all = getBookings().filter((b) => b.id !== id);
  saveBookings(all);

  // Broadcast delete to cloud
  pushToCloud({ type: 'delete_booking', data: { id } });
}

// --- QUOTE REQUESTS ---
export function getQuotes(): QuoteRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTES);
    if (!raw) return INITIAL_QUOTES;
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_QUOTES;
  }
}

export function saveQuotes(quotes: QuoteRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  } catch (e) {
    console.error('Failed to save quotes to localStorage', e);
  }
}

export function addQuote(quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
  const all = getQuotes();
  const newQuote: QuoteRequest = {
    ...quote,
    id: 'tra-qt-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  all.unshift(newQuote);
  saveQuotes(all);

  // Broadcast to cloud
  pushToCloud({ type: 'new_quote', data: newQuote });

  return newQuote;
}

export function updateQuote(id: string, updates: Partial<QuoteRequest>): QuoteRequest | null {
  const all = getQuotes();
  const idx = all.findIndex((q) => q.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates };
  saveQuotes(all);

  pushToCloud({ type: 'update_quote', data: { id, ...updates } });

  return all[idx];
}

export function deleteQuote(id: string): void {
  const all = getQuotes().filter((q) => q.id !== id);
  saveQuotes(all);

  pushToCloud({ type: 'delete_quote', data: { id } });
}

// --- PACKAGES ---
export function getPackages(): StudioPackage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (!raw) return INITIAL_PACKAGES;
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_PACKAGES;
  }
}

export function savePackages(packages: StudioPackage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  } catch (e) {
    console.error('Failed to save packages to localStorage', e);
  }
  // Broadcast update to cloud so all devices (phones, tablets, PCs) update in real-time!
  pushToCloud({ type: 'update_packages', data: packages });
}

// --- SETTINGS ---
export function getSettings(): StudioSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return INITIAL_SETTINGS;
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: StudioSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
  }
  // Broadcast update to cloud
  pushToCloud({ type: 'update_settings', data: settings });
}

// Force-sync full snapshot across all devices
export function syncFullStateToCloud(): void {
  pushToCloud({
    type: 'full_sync_snapshot',
    data: {
      packages: getPackages(),
      settings: getSettings(),
      bookings: getBookings(),
      quotes: getQuotes(),
    },
  });
}

// --- ADMIN PASSWORD ---
export function getAdminPassword(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PASSWORD);
    return saved || DEFAULT_ADMIN_PASSWORD;
  } catch {
    return DEFAULT_ADMIN_PASSWORD;
  }
}

export function saveAdminPassword(password: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PASSWORD, password);
  } catch (e) {
    console.error('Failed to save password', e);
  }
}

// --- AVAILABILITY LOGIC ---

export function isDateAvailable(dateStr: string, settings: StudioSettings): boolean {
  const todayStr = new Date().toISOString().split('T')[0];
  if (dateStr < todayStr) return false;

  if (settings.blockedDates.includes(dateStr)) return false;

  const d = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = d.getDay();
  if (!settings.openDays.includes(dayOfWeek)) return false;

  return true;
}

export function isSlotAvailable(dateStr: string, slot: string, bookings: Booking[], settings: StudioSettings): boolean {
  if (!isDateAvailable(dateStr, settings)) return false;

  const isBlocked = settings.blockedSlots.some(
    (b) => b.date === dateStr && b.slot === slot
  );
  if (isBlocked) return false;

  const isBooked = bookings.some(
    (b) => b.date === dateStr && b.timeSlot === slot && b.status !== 'cancelled'
  );
  if (isBooked) return false;

  return true;
}

// --- CLIENT ACCOUNTS & AUTH ---

export function getClientUsers(): ClientUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveClientUsers(users: ClientUser[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save client users', e);
  }
}

export function registerClientUser(data: {
  fullName: string;
  email: string;
  phone: string;
  instagram?: string;
  password?: string;
}): ClientUser {
  const users = getClientUsers();
  const normalizedEmail = data.email.trim().toLowerCase();
  
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);
  if (existingIdx !== -1) {
    // Update existing user
    users[existingIdx] = {
      ...users[existingIdx],
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      instagram: data.instagram?.trim(),
      password: data.password || users[existingIdx].password,
    };
    saveClientUsers(users);
    setCurrentClientUser(users[existingIdx]);
    return users[existingIdx];
  }

  const newUser: ClientUser = {
    id: 'user-' + Date.now().toString(36),
    fullName: data.fullName.trim(),
    email: normalizedEmail,
    phone: data.phone.trim(),
    instagram: data.instagram?.trim(),
    password: data.password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveClientUsers(users);
  setCurrentClientUser(newUser);
  return newUser;
}

export function loginClientUser(email: string, password?: string): ClientUser | null {
  const users = getClientUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!found) return null;

  if (password && found.password && found.password !== password) {
    return null;
  }

  setCurrentClientUser(found);
  return found;
}

export function getCurrentClientUser(): ClientUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentClientUser(user: ClientUser | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (e) {
    console.error('Failed to set current client user', e);
  }
}

export function getBookingsByEmail(email: string): Booking[] {
  const all = getBookings();
  const normalized = email.trim().toLowerCase();
  return all.filter((b) => b.email.trim().toLowerCase() === normalized);
}

