import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { TrustSection } from '../components/Sections/TrustSection';
import { Features } from '../components/Features/Features';
import { InteractiveDemo } from '../components/InteractiveDemo/InteractiveDemo';
import { Integrations } from '../components/Integrations/Integrations';
import { Statistics } from '../components/Statistics/Statistics';
import { Testimonials } from '../components/Testimonials/Testimonials';
import { Pricing } from '../components/Pricing/Pricing';
import { FAQ } from '../components/FAQ/FAQ';
import { Waitlist } from '../components/Waitlist/Waitlist';
import { Footer } from '../components/Footer/Footer';
import { CustomCursor } from '../components/Common/CustomCursor';
import { ScrollProgress } from '../components/Common/ScrollProgress';
import { BackToTop } from '../components/Common/BackToTop';
import { AuroraBackground } from '../components/Common/AuroraBackground';
import { GridPattern } from '../components/Common/GridPattern';
import { NoiseOverlay } from '../components/Common/NoiseOverlay';
import { TermsModal } from '../components/Common/TermsModal';

export function Home() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Helmet SEO Meta */}
      <Helmet>
        <title>Rofiozag Chat — Next-Gen Messaging Infrastructure for Creators & Communities</title>
        <meta name="description" content="Unifying real-time messaging, native AI automation, creator channels, social crossposting, and monetization into one lightning-fast, encrypted platform." />
      </Helmet>

      {/* Global Aesthetics */}
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />
      <AuroraBackground />
      <GridPattern />

      {/* Layout Content */}
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Features />
        <InteractiveDemo />
        <Integrations />
        <Statistics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />

      {/* Utilities */}
      <BackToTop />
      <TermsModal />
    </div>
  );
}
