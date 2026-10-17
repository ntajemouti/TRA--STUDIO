import React, { useState } from 'react';
import { StudioPackage, StudioSettings } from './types';
import { getPackages, getSettings } from './data/storage';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { HeroSection } from './components/showcase/HeroSection';
import { StudioSpacesSection } from './components/showcase/StudioSpacesSection';
import { Step2Package } from './components/client/Step2Package';
import { ClientReelsSection } from './components/showcase/ClientReelsSection';
import { InstagramSection } from './components/showcase/InstagramSection';
import { ExperienceSection } from './components/showcase/ExperienceSection';
import { FaqSection } from './components/showcase/FaqSection';
import { LocationSection } from './components/showcase/LocationSection';
import { StudioBookingModal } from './components/client/StudioBookingModal';

export function App() {
  // Static Studio Data States
  const [packages] = useState<StudioPackage[]>(() => getPackages());
  const [settings] = useState<StudioSettings>(() => getSettings());

  // Direct Frontend Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | null>(null);

  // Trigger Booking Modal
  const handleOpenBooking = (serviceName?: string) => {
    setSelectedServiceForModal(serviceName || null);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg text-zinc-100 flex flex-col selection:bg-studio-red selection:text-white">
      {/* Real-time Interactive Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 1. Header Navigation */}
      <Header
        settings={settings}
        onStartBooking={() => handleOpenBooking()}
      />

      {/* Main Public Website Sections */}
      <main className="flex-1 w-full flex flex-col items-center justify-start">
        {/* 1. Hero Showcase (Full Width Edge-to-Edge, Flush with Header) */}
        <div id="hero" className="w-full">
          <HeroSection
            settings={settings}
            onStartBooking={() => handleOpenBooking()}
            onExploreStudios={() => handleScrollTo('univers')}
          />
        </div>

        <div className="w-full space-y-4">

          {/* 2. “Our Studio Spaces” Section (Positioned immediately before Services) */}
          <StudioSpacesSection
            onExploreSpaces={() => handleScrollTo('services')}
            onExploreServices={() => handleScrollTo('services')}
          />

          {/* 3. Existing Studio Services Section (Preserved with descriptions, details and pricing) */}
          <section id="services" className="py-12 sm:py-16 bg-studio-bg scroll-mt-20">
            <div id="catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Step2Package
                packages={packages}
                onSelectService={(serviceName) => handleOpenBooking(serviceName)}
              />
            </div>
          </section>

          {/* 4. Client Reels & Authentic TRA Videos */}
          <div id="reels" className="scroll-mt-20">
            <ClientReelsSection
              onStartBooking={() => handleOpenBooking('SOCIAL MEDIA CONTENT (Formats Verticaux 9:16)')}
            />
          </div>

          {/* 5. Instagram Feed 6 Posts */}
          <div id="instagram" className="scroll-mt-20">
            <InstagramSection settings={settings} />
          </div>

          {/* 8. Studio Experience */}
          <div id="a-propos" className="scroll-mt-20">
            <div id="experience">
              <ExperienceSection />
            </div>
          </div>

          {/* 9. Frequently Asked Questions */}
          <div id="faq" className="scroll-mt-20">
            <FaqSection />
          </div>

          {/* 11. Location & Direct Access in Témara */}
          <div id="contact" className="scroll-mt-20">
            <div id="location">
              <LocationSection settings={settings} />
            </div>
          </div>

        </div>
      </main>

      {/* 12. Footer */}
      <Footer settings={settings} />

      {/* 13. Direct Frontend-Only Booking Modal (Connected to WhatsApp) */}
      <StudioBookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        settings={settings}
        packages={packages}
        initialService={selectedServiceForModal}
      />
    </div>
  );
}

export default App;
