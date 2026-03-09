"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Heavy 3D component — dynamic import, no SSR
const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

// Below-fold sections — lazy loaded so they don't block initial paint
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const TeamSection = dynamic(() => import("@/components/TeamSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const WorkSection = dynamic(() => import("@/components/WorkSection"));
const StaffAugmentation = dynamic(
  () => import("@/components/StaffAugmentation")
);
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const Footer = dynamic(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="min-h-[200px]" aria-hidden />
);

export default function Home() {
  return (
    <>
      {/* Fixed globe background — isolated error boundary */}
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </ErrorBoundary>

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main>
        <Hero />

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <TeamSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <WorkSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <StaffAugmentation />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
