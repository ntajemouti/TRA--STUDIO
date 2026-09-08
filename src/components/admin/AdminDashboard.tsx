import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus, QuoteRequest, StudioPackage, StudioSettings } from '../../types';
import { AdminCalendar } from './AdminCalendar';
import { AdminBookings } from './AdminBookings';
import { AdminServices } from './AdminServices';
import { AdminAvailability } from './AdminAvailability';
import { AdminQuotes } from './AdminQuotes';
import { BookingEditModal } from './BookingEditModal';
import {
  Calendar,
  ListOrdered,
  Sparkles,
  Clock,
  MessageSquare,
  TrendingUp,
  RefreshCw,
  Download,
  Key,
  ShieldCheck,
  AlertCircle,
  BarChart3,
  Sliders,
} from 'lucide-react';
import { fetchAndSyncFromCloud, getAdminPassword, saveAdminPassword } from '../../data/storage';
import { AdminStats } from './AdminStats';
import { AdminStudioSettings } from './AdminStudioSettings';

interface AdminDashboardProps {
  bookings: Booking[];
  quotes: QuoteRequest[];
  packages: StudioPackage[];
  settings: StudioSettings;
  onRefreshData: () => void;
  onUpdateBookingStatus: (id: string, status: BookingStatus) => void;
  onSaveBooking: (bookingData: Partial<Booking>, existingId?: string) => void;
  onDeleteBooking: (id: string) => void;
  onUpdateQuote: (id: string, updates: Partial<QuoteRequest>) => void;
  onDeleteQuote: (id: string) => void;
  onSavePackages: (packages: StudioPackage[]) => void;
  onSaveSettings: (settings: StudioSettings) => void;
  onExitAdmin?: () => void;
}

type AdminTab = 'calendar' | 'bookings' | 'quotes' | 'services' | 'availability' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  quotes,
  packages,
  settings,
  onRefreshData,
  onUpdateBookingStatus,
  onSaveBooking,
  onDeleteBooking,
  onUpdateQuote,
  onDeleteQuote,
  onSavePackages,
  onSaveSettings,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('calendar');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('À l\'instant');

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Auto-sync polling every 15s to get new bookings from any device
  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchAndSyncFromCloud();
      onRefreshData();
      setLastSyncTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    }, 15000);
    return () => clearInterval(interval);
  }, [onRefreshData]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await fetchAndSyncFromCloud();
    onRefreshData();
    setIsSyncing(false);
    setLastSyncTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      studioName: settings.studioName,
      bookings,
      quotes,
      packages,
      settings,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tra-studio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Change Password
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.trim().length >= 8) {
      saveAdminPassword(newPasswordInput.trim());
      setPasswordSuccess(true);
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(false);
        setNewPasswordInput('');
      }, 1500);
    }
  };

  // Quick stats
  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.packagePrice, 0);

  const newBookingsCount = bookings.filter((b) => b.status === 'new').length;
  const newQuotesCount = quotes.filter((q) => q.status === 'new').length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySessionsCount = bookings.filter(
    (b) => b.date === todayStr && b.status !== 'cancelled'
  ).length;

  const handleOpenAdd = () => {
    setEditingBooking(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (bk: Booking) => {
    setEditingBooking(bk);
    setIsModalOpen(true);
  };

  const handleSaveModal = (data: Partial<Booking>) => {
    onSaveBooking(data, editingBooking?.id);
  };

  const handleBlockDateToggle = (dateStr: string) => {
    let updatedDates = [...settings.blockedDates];
    if (updatedDates.includes(dateStr)) {
      updatedDates = updatedDates.filter((d) => d !== dateStr);
    } else {
      updatedDates.push(dateStr);
    }
    onSaveSettings({ ...settings, blockedDates: updatedDates });
  };

  const handleBlockSlotToggle = (dateStr: string, slotStr: string) => {
    let updatedSlots = [...settings.blockedSlots];
    const exists = updatedSlots.some((s) => s.date === dateStr && s.slot === slotStr);
    if (exists) {
      updatedSlots = updatedSlots.filter((s) => !(s.date === dateStr && s.slot === slotStr));
    } else {
      updatedSlots.push({ date: dateStr, slot: slotStr });
    }
    onSaveSettings({ ...settings, blockedSlots: updatedSlots });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Controls: Cloud sync status & admin actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-studio-card border border-studio-border p-3.5 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-white">
            Cloud Synchronisé
          </span>
          <span className="text-[11px] text-zinc-500">
            (Dernière synchro: {lastSyncTime})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-all disabled:opacity-50"
            title="Récupérer les nouvelles réservations faites depuis d'autres appareils"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronisation...' : 'Actualiser'}</span>
          </button>

          <button
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-all"
            title="Télécharger une sauvegarde de toutes les réservations"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exporter</span>
          </button>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-all cursor-pointer"
            title="Modifier le mot de passe du dashboard"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mot de passe</span>
          </button>
        </div>
      </div>

      {/* Real-time Statistics Suite at the very TOP of the Admin Dashboard */}
      <AdminStats bookings={bookings} quotes={quotes} packages={packages} />

      {/* Operational Tabs Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-zinc-800 text-xs">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'calendar'
              ? 'bg-white text-black shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Calendrier Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-white text-black shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>Réservations ({bookings.length})</span>
          {newBookingsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-studio-red text-white text-[10px] flex items-center justify-center font-bold">
              {newBookingsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'quotes'
              ? 'bg-white text-black shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Devis Sur Mesure ({quotes.length})</span>
          {newQuotesCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
              {newQuotesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'services'
              ? 'bg-white text-black shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Prestations & Tarifs</span>
        </button>

        <button
          onClick={() => setActiveTab('availability')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'availability'
              ? 'bg-white text-black shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Disponibilités & Blocages</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-white text-black shadow-md font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-studio-red" />
          <span>Paramètres Studio</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === 'calendar' && (
          <AdminCalendar
            bookings={bookings}
            settings={settings}
            onAddBooking={handleOpenAdd}
            onEditBooking={handleOpenEdit}
            onBlockDateToggle={handleBlockDateToggle}
            onBlockSlotToggle={handleBlockSlotToggle}
          />
        )}

        {activeTab === 'bookings' && (
          <AdminBookings
            bookings={bookings}
            onUpdateStatus={onUpdateBookingStatus}
            onEditBooking={handleOpenEdit}
            onDeleteBooking={onDeleteBooking}
          />
        )}

        {activeTab === 'quotes' && (
          <AdminQuotes
            quotes={quotes}
            onUpdateQuote={onUpdateQuote}
            onDeleteQuote={onDeleteQuote}
          />
        )}

        {activeTab === 'services' && (
          <AdminServices
            packages={packages}
            onSavePackages={onSavePackages}
          />
        )}

        {activeTab === 'availability' && (
          <AdminAvailability
            settings={settings}
            onSaveSettings={onSaveSettings}
          />
        )}

        {activeTab === 'settings' && (
          <AdminStudioSettings
            settings={settings}
            onSaveSettings={onSaveSettings}
          />
        )}
      </div>

      {/* Modal for adding/editing a booking */}
      <BookingEditModal
        booking={editingBooking}
        packages={packages}
        settings={settings}
        existingBookings={bookings}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
      />

      {/* Modal for changing admin master password */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-studio-card border border-studio-border rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-studio-red" />
              <span>Changer le mot de passe Admin</span>
            </h3>

            <form onSubmit={handleSaveNewPassword} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">
                  Nouveau mot de passe complexe
                </label>
                <input
                  type="text"
                  required
                  placeholder="Min. 8 caractères (ex. TRA#Studio2026!)"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-3.5 h-11 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-studio-red font-mono"
                />
              </div>

              {passwordSuccess && (
                <p className="text-xs text-emerald-400 font-medium text-center">
                  ✓ Mot de passe mis à jour avec succès !
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 text-zinc-300"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  disabled={newPasswordInput.trim().length < 8}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-40"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
