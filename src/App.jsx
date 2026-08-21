import React from 'react';
import { CursorProvider } from './hooks/useCursorContext';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroStatement from './components/IntroStatement';
import DuoSection from './components/DuoSection';
import Timeline from './components/Timeline';
import SelectedWorks from './components/SelectedWorks';
import FeaturedProject from './components/FeaturedProject';
import StatsSection from './components/StatsSection';
import PhilosophySection from './components/PhilosophySection';
import TechToolbox from './components/TechToolbox';
import Playground from './components/Playground';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function MainContent() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#F5F3EE] text-[#111111] bg-paper-noise overflow-x-hidden">
      <CustomCursor />
      <InteractiveBackground />
      <Navbar />
      <main>
        <Hero />
        <IntroStatement />
        <DuoSection />
        <Timeline />
        <SelectedWorks />
        <FeaturedProject />
        <StatsSection />
        <PhilosophySection />
        <TechToolbox />
        <Playground />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <MainContent />
    </CursorProvider>
  );
}
