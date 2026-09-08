import React, { useState, useEffect, useCallback } from 'react';
import { Booking, BookingDraft, BookingStatus, QuoteRequest, Step, StudioPackage, StudioSettings, ClientUser } from './types';
import {
  getBookings,
  getQuotes,
  getPackages,
  getSettings,
  addBooking,
  updateBooking,
  deleteBooking,
  updateQuote,
  deleteQuote,
  savePackages,
  saveSettings,
  getAdminPassword,
  fetchAndSyncFromCloud,
  syncFullStateToCloud,
  getLastClientBookingId,
  setLastClientBookingId,
  updateBookingClientInfo,
  getCurrentClientUser,
  setCurrentClientUser,
} from './data/storage';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { StepProgress } from './components/client/StepProgress';
import { Step1DateSlot } from './components/client/Step1DateSlot';
import { Step2Package } from './components/client/Step2Package';
import { Step3ClientInfo } from './components/client/Step3ClientInfo';
import { Step4Summary } from './components/client/Step4Summary';
import { ClientDashboard } from './components/client/ClientDashboard';
import { PostBookingAccountPrompt } from './components/client/PostBookingAccountPrompt';
import { ClientAuthModal } from './components/client/ClientAuthModal';
import { QuoteModal } from './components/client/QuoteModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { HeroSection } from './components/showcase/HeroSection';
import { ExperienceSection } from './components/showcase/ExperienceSection';
import { EquipmentSection } from './components/showcase/EquipmentSection';
import { FaqSection } from './components/showcase/FaqSection';
import { LocationSection } from './components/showcase/LocationSection';
import { Lock, ShieldCheck, Eye, EyeOff, KeyRound, Megaphone, CheckCircle2, ArrowLeft, Mail, X } from 'lucide-react';

const ADMIN_HASH = '#admin';
const ADMIN_SESSION_KEY = 'tra_admin_session_auth_v2';

export function App() {
  // Global Data States
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => getQuotes());
  const [packages, setPackages] = useState<StudioPackage[]>(() => getPackages());
  const [settings, setSettings] = useState<StudioSettings>(() => getSettings());

  // Secret Admin Authentication States
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => window.location.hash.toLowerCase() === ADMIN_HASH);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true'
  );
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Client User & Modal States
  const [currentUser, setCurrentUser] = useState<ClientUser | null>(() => getCurrentClientUser());
  const [showClientAuthModal, setShowClientAuthModal] = useState(false);
  const [showPostBookingPrompt, setShowPostBookingPrompt] = useState(false);
  const [toastNotification, setToastNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'info';
  } | null>(null);

  // Client Funnel State
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isQuoteMode, setIsQuoteMode] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(() => {
    const lastId = getLastClientBookingId();
    if (lastId) {
      const all = getBookings();
      return all.find((b) => b.id === lastId) || null;
    }
    return null;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Draft Booking State: default with first active package
  const [draft, setDraft] = useState<BookingDraft>(() => {
    const pkgs = getPackages();
    const popularOrFirst = pkgs.find((p) => p.popular && p.active) || pkgs[0];
    return {
      date: null,
      timeSlot: null,
      selectedPackage: popularOrFirst || null,
      fullName: '',
      phone: '',
      email: '',
      instagram: '',
      peopleCount: 1,
      projectNotes: '',
    };
  });

  // Listen for hash changes (#admin, #my-booking)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === ADMIN_HASH) {
        setIsAdminRoute(true);
      } else if (hash === '#my-booking') {
        const lastId = getLastClientBookingId();
        if (lastId) {
          const all = getBookings();
          const found = all.find((b) => b.id === lastId);
          if (found) {
            setConfirmedBooking(found);
            setCurrentStep(5);
          }
        }
      } else {
        setIsAdminRoute(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reload local data
  const reloadData = useCallback(() => {
    setBookings(getBookings());
    setQuotes(getQuotes());
    setPackages(getPackages());
    setSettings(getSettings());
  }, []);

  // Real-time Cloud Sync Poller (Immediate on load + every 8s)
  useEffect(() => {
    const syncWithCloud = async () => {
      try {
        const cloudData = await fetchAndSyncFromCloud();
        if (cloudData.bookings) setBookings(cloudData.bookings);
        if (cloudData.quotes) setQuotes(cloudData.quotes);
        if (cloudData.packages && cloudData.packages.length > 0) {
          setPackages(cloudData.packages);
        }
        if (cloudData.settings) {
          setSettings(cloudData.settings);
        }
      } catch (err) {
        console.warn('Background cloud poll skipped', err);
      }
    };

    // Run immediately when website opens on mobile or desktop!
    syncWithCloud();

    const interval = setInterval(syncWithCloud, 8000);
    return () => clearInterval(interval);
  }, []);

  // Step 1: Prestations & Services
  const handleSelectPackage = (pkg: StudioPackage) => {
    setDraft((prev) => ({ ...prev, selectedPackage: pkg }));
  };

  const handleStep1Continue = () => {
    if (draft.selectedPackage) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Step 2: Coordonnées Client
  const handleStep2Submit = (clientInfo: {
    fullName: string;
    phone: string;
    email: string;
    instagram: string;
    peopleCount: number;
    projectNotes: string;
  }) => {
    setDraft((prev) => ({
      ...prev,
      ...clientInfo,
    }));
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Date & Créneau
  const handleSelectDate = (date: string) => {
    setDraft((prev) => ({ ...prev, date, timeSlot: null }));
  };

  const handleSelectSlot = (timeSlot: string) => {
    setDraft((prev) => ({ ...prev, timeSlot }));
  };

  const handleStep3Continue = () => {
    if (draft.date && draft.timeSlot) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Step 4: Confirmation finale
  const handleConfirmBooking = () => {
    if (!draft.date || !draft.timeSlot || !draft.selectedPackage) return;
    setIsSubmitting(true);

    setTimeout(() => {
      // Saves locally AND automatically broadcasts to the cloud sync pipeline!
      const created = addBooking({
        date: draft.date!,
        timeSlot: draft.timeSlot!,
        packageId: draft.selectedPackage!.id,
        packageName: draft.selectedPackage!.name,
        packageDuration: draft.selectedPackage!.duration,
        packagePrice: draft.selectedPackage!.price,
        fullName: draft.fullName,
        phone: draft.phone,
        email: draft.email,
        instagram: draft.instagram,
        peopleCount: draft.peopleCount,
        projectNotes: draft.projectNotes,
        status: 'new',
      });

      // Save for client portal return
      setLastClientBookingId(created.id);

      setBookings(getBookings());
      setConfirmedBooking(created);
      setIsSubmitting(false);

      // Email Notification Alert
      setToastNotification({
        show: true,
        title: 'Confirmation de réservation envoyée !',
        message: `Un email récapitulatif avec vos détails de séance a été envoyé à ${created.email}.`,
        type: 'success',
      });

      // Check if client has an account: if not, display optional prompt
      if (!currentUser) {
        setShowPostBookingPrompt(true);
      } else {
        setCurrentStep(5);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  // Step 5: Client Dashboard Update
  const handleClientUpdateInfo = (updates: Partial<Booking>) => {
    if (!confirmedBooking) return;
    const updated = updateBookingClientInfo(confirmedBooking.id, updates);
    if (updated) {
      setConfirmedBooking(updated);
      setBookings(getBookings());
    }
  };

  const handleNewBooking = () => {
    const popularOrFirst = packages.find((p) => p.popular && p.active) || packages[0];
    setDraft({
      date: null,
      timeSlot: null,
      selectedPackage: popularOrFirst || null,
      fullName: '',
      phone: '',
      email: '',
      instagram: '',
      peopleCount: 1,
      projectNotes: '',
    });
    setConfirmedBooking(null);
    setShowPostBookingPrompt(false);
    setCurrentStep(1);
    setIsQuoteMode(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- SECRET ADMIN ACTIONS ---

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = getAdminPassword();

    if (adminPasswordInput === correctPassword) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setPasswordError(false);
      setAdminPasswordInput('');
      fetchAndSyncFromCloud().then((cloudData) => {
        if (cloudData.bookings) setBookings(cloudData.bookings);
        if (cloudData.quotes) setQuotes(cloudData.quotes);
        if (cloudData.packages && cloudData.packages.length > 0) setPackages(cloudData.packages);
        if (cloudData.settings) setSettings(cloudData.settings);
      });
      syncFullStateToCloud();
    } else {
      setPasswordError(true);
    }
  };

  const handleExitAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.hash = '';
    setIsAdminRoute(false);
  };

  const handleUpdateBookingStatus = (id: string, status: BookingStatus) => {
    updateBooking(id, { status });
    reloadData();
    syncFullStateToCloud();
  };

  const handleSaveBookingAdmin = (data: Partial<Booking>, existingId?: string) => {
    if (existingId) {
      updateBooking(existingId, data);
    } else {
      addBooking({
        date: data.date || new Date().toISOString().split('T')[0],
        timeSlot: data.timeSlot || '10:00',
        packageId: data.packageId || 'pack-standard',
        packageName: data.packageName || 'STANDARD',
        packageDuration: data.packageDuration || 2,
        packagePrice: data.packagePrice || 1500,
        fullName: data.fullName || 'Client Studio',
        phone: data.phone || '+212 6 00 00 00 00',
        email: data.email || 'client@example.com',
        instagram: data.instagram || '@client',
        peopleCount: data.peopleCount || 1,
        projectNotes: data.projectNotes || '',
        status: data.status || 'confirmed',
        adminNotes: data.adminNotes || '',
      });
    }
    reloadData();
    syncFullStateToCloud();
  };

  const handleDeleteBookingAdmin = (id: string) => {
    deleteBooking(id);
    reloadData();
    syncFullStateToCloud();
  };

  const handleUpdateQuoteAdmin = (id: string, updates: Partial<QuoteRequest>) => {
    updateQuote(id, updates);
    reloadData();
    syncFullStateToCloud();
  };

  const handleDeleteQuoteAdmin = (id: string) => {
    deleteQuote(id);
    reloadData();
    syncFullStateToCloud();
  };

  const handleSavePackagesAdmin = (newPackages: StudioPackage[]) => {
    savePackages(newPackages);
    setPackages(newPackages);
    syncFullStateToCloud();
  };

  const handleSaveSettingsAdmin = (newSettings: StudioSettings) => {
    saveSettings(newSettings);
    setSettings(newSettings);
    syncFullStateToCloud();
  };

  const showAdminDashboard = isAdminRoute && isAdminAuthenticated;
  const showAdminLoginGate = isAdminRoute && !isAdminAuthenticated;

  return (
    <div className="min-h-screen bg-studio-bg text-zinc-100 flex flex-col selection:bg-studio-red selection:text-white">
      {/* Studio Header */}
      <Header
        isAdmin={isAdminAuthenticated && isAdminRoute}
        settings={settings}
        onExitAdmin={handleExitAdmin}
        onResetClient={handleNewBooking}
        onStartBooking={() => {
          if (currentStep !== 1) {
            setCurrentStep(1);
          }
          setShowPostBookingPrompt(false);
          setTimeout(() => {
            const el = document.getElementById('studios');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
        }}
        onOpenClientAuth={() => setShowClientAuthModal(true)}
        hasActiveBooking={!!confirmedBooking}
        onViewMyBooking={() => {
          setShowPostBookingPrompt(false);
          setCurrentStep(5);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Dynamic Announcement Banner Configured by Admin */}
      {!isAdminRoute && settings.announcement?.enabled && settings.announcement?.text && (
        <div className="w-full bg-gradient-to-r from-amber-600 via-studio-red to-amber-600 text-white text-xs font-bold py-2.5 px-4 text-center shadow-lg flex items-center justify-center gap-2">
          <Megaphone className="w-3.5 h-3.5 shrink-0 animate-bounce" />
          <span>{settings.announcement.text}</span>
        </div>
      )}

      {/* Client Authentication & Lookup Modal */}
      <ClientAuthModal
        isOpen={showClientAuthModal}
        onClose={() => setShowClientAuthModal(false)}
        onSuccessLogin={(user, userBookings) => {
          setCurrentUser(user);
          if (userBookings.length > 0) {
            setConfirmedBooking(userBookings[0]);
            setShowPostBookingPrompt(false);
            setCurrentStep(5);
          }
          setToastNotification({
            show: true,
            title: `Espace de ${user.fullName}`,
            message: `${userBookings.length} réservation(s) synchronisée(s). Bienvenue sur votre espace !`,
            type: 'success',
          });
          setTimeout(() => setToastNotification(null), 5000);
        }}
      />

      {/* Sleek Floating Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-zinc-950/95 backdrop-blur-md border border-zinc-700 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div
            className={`p-2 rounded-xl shrink-0 ${
              toastNotification.type === 'success'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : 'bg-studio-red/20 text-studio-red border border-studio-red/40'
            }`}
          >
            {toastNotification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {toastNotification.title}
            </h4>
            <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
              {toastNotification.message}
            </p>
          </div>
          <button
            onClick={() => setToastNotification(null)}
            className="text-zinc-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Secret Admin Route - Authenticated Dashboard */}
      {showAdminDashboard ? (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <AdminDashboard
            bookings={bookings}
            quotes={quotes}
            packages={packages}
            settings={settings}
            onRefreshData={reloadData}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onSaveBooking={handleSaveBookingAdmin}
            onDeleteBooking={handleDeleteBookingAdmin}
            onUpdateQuote={handleUpdateQuoteAdmin}
            onDeleteQuote={handleDeleteQuoteAdmin}
            onSavePackages={handleSavePackagesAdmin}
            onSaveSettings={handleSaveSettingsAdmin}
            onExitAdmin={handleExitAdmin}
          />
        </main>
      ) : showAdminLoginGate ? (
        /* Secret Admin Route - Strong Password Gate */
        <main className="flex-1 w-full flex items-center justify-center px-4 py-12">
          <div className="bg-studio-card border border-studio-border rounded-3xl w-full max-w-md p-7 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-studio-red shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Espace Propriétaire TRA Studio
              </h2>
              <p className="text-xs text-zinc-400">
                Accès restreint. Veuillez entrer votre mot de passe administrateur.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase text-zinc-300 tracking-wide">
                  Mot de passe Studio
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    autoFocus
                    required
                    placeholder="Entrez le mot de passe studio"
                    value={adminPasswordInput}
                    onChange={(e) => {
                      setAdminPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    className={`w-full pl-10 pr-10 h-12 bg-zinc-900 border rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-studio-red transition-all ${
                      passwordError ? 'border-studio-red ring-1 ring-studio-red' : 'border-zinc-700 focus:border-zinc-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300"
                  >
                    {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-studio-red font-medium animate-in fade-in">
                    Mot de passe incorrect. Veuillez réessayer.
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl font-semibold text-sm bg-studio-red hover:bg-studio-redHover text-white flex items-center justify-center gap-2 shadow-lg shadow-studio-red/30 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Accéder à mon espace</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      ) : showPostBookingPrompt && confirmedBooking ? (
        /* POST-BOOKING OPTIONAL ACCOUNT CREATION STEP */
        <main className="flex-1 w-full flex flex-col items-center justify-center px-4 py-8 sm:py-14">
          <PostBookingAccountPrompt
            booking={confirmedBooking}
            onAccountCreated={(user) => {
              setCurrentUser(user);
              setShowPostBookingPrompt(false);
              setCurrentStep(5);
              setToastNotification({
                show: true,
                title: 'Compte créé avec succès !',
                message: `Bienvenue ${user.fullName}. Vos identifiants sont sauvegardés.`,
                type: 'success',
              });
              setTimeout(() => setToastNotification(null), 5000);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContinueAsGuest={() => {
              setShowPostBookingPrompt(false);
              setCurrentStep(5);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        /* CLIENT INTERFACE & BOOKING FUNNEL */
        <main className="flex-1 w-full flex flex-col items-center justify-start">
          {/* Modal Demande de devis */}
          {isQuoteMode && (
            <QuoteModal
              settings={settings}
              onClose={() => setIsQuoteMode(false)}
            />
          )}

          {/* LANDING PAGE & SHOWCASE SECTIONS */}
          {!isQuoteMode && currentStep === 1 && (
            <div className="w-full space-y-4">
              {/* 1. Hero Atmosphere Showcase with Carousel */}
              <div id="hero">
                <HeroSection
                  settings={settings}
                  onStartBooking={() => {
                    const el = document.getElementById('studios');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onExploreStudios={() => {
                    const el = document.getElementById('studios');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              {/* 2. Formules & Studios de Tournage (id="studios") */}
              <section id="studios" className="py-12 sm:py-16 bg-studio-bg scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Step2Package
                    packages={packages}
                    selectedPackage={draft.selectedPackage}
                    onSelectPackage={handleSelectPackage}
                    onRequestQuote={() => setIsQuoteMode(true)}
                    onContinue={handleStep1Continue}
                  />
                </div>
              </section>

              {/* 3. L'Expérience TRA Studio (id="experience") */}
              <div id="experience" className="scroll-mt-20">
                <ExperienceSection />
              </div>

              {/* 4. Fiche Technique Équipements (id="equipment") */}
              <div id="equipment" className="scroll-mt-20">
                <EquipmentSection />
              </div>

              {/* 5. Questions Fréquentes FAQ (id="faq") */}
              <div id="faq" className="scroll-mt-20">
                <FaqSection />
              </div>

              {/* 6. Plan d'Accès & Localisation Studio (id="location") */}
              <div id="location" className="scroll-mt-20">
                <LocationSection settings={settings} />
              </div>
            </div>
          )}

          {/* ÉTAPES 2, 3, 4 : TUNNEL DE RÉSERVATION FOCALISÉ */}
          {!isQuoteMode && currentStep >= 2 && currentStep <= 4 && (
            <div className="w-full max-w-xl lg:max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
              {/* Back to Showcase Button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Changer de formule / Revenir à l’accueil</span>
                </button>

                <span className="text-xs text-zinc-500 font-medium">
                  Formule : <strong className="text-white">{draft.selectedPackage?.name}</strong> ({draft.selectedPackage?.price} DH)
                </span>
              </div>

              {/* Step Progress Indicator */}
              <StepProgress
                currentStep={currentStep}
                onStepClick={(s) => {
                  if (s < currentStep) setCurrentStep(s);
                }}
              />

              {/* ÉTAPE 2 : INFORMATIONS & COORDONNÉES DU CLIENT */}
              {currentStep === 2 && (
                <Step3ClientInfo
                  initialData={{
                    fullName: draft.fullName,
                    phone: draft.phone,
                    email: draft.email,
                    instagram: draft.instagram,
                    peopleCount: draft.peopleCount,
                    projectNotes: draft.projectNotes,
                  }}
                  selectedPackage={draft.selectedPackage}
                  onSubmit={handleStep2Submit}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {/* ÉTAPE 3 : DATE & CRÉNEAU */}
              {currentStep === 3 && (
                <Step1DateSlot
                  selectedDate={draft.date}
                  selectedSlot={draft.timeSlot}
                  onSelectDate={handleSelectDate}
                  onSelectSlot={handleSelectSlot}
                  onContinue={handleStep3Continue}
                  onBack={() => setCurrentStep(2)}
                  bookings={bookings}
                  settings={settings}
                />
              )}

              {/* ÉTAPE 4 : RÉCAPITULATIF & VALIDATION */}
              {currentStep === 4 && (
                <Step4Summary
                  draft={draft}
                  onConfirm={handleConfirmBooking}
                  onBack={() => setCurrentStep(3)}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          )}

          {/* ÉTAPE 5 : ESPACE CLIENT / DASHBOARD RÉSERVATION PERSONNEL */}
          {!isQuoteMode && currentStep === 5 && confirmedBooking && (
            <div className="w-full max-w-xl lg:max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
              <ClientDashboard
                booking={confirmedBooking}
                settings={settings}
                onUpdateClientInfo={handleClientUpdateInfo}
                onNewBooking={handleNewBooking}
              />
            </div>
          )}
        </main>
      )}

      {/* Dynamic Studio Footer */}
      {!isAdminRoute && (
        <Footer
          settings={settings}
          onOpenAdmin={() => {
            window.location.hash = '#admin';
            setIsAdminRoute(true);
          }}
        />
      )}
    </div>
  );
}
