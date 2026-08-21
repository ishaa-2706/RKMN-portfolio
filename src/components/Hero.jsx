import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { ArrowDown, Sparkles, Code2, Zap } from 'lucide-react';
import MagneticHeading from './MagneticHeading';
import gsap from 'gsap';

export default function Hero() {
  const { setCursor, resetCursor } = useCursor();
  const heroRef = useRef(null);
  const tagRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldPlayVideo(!mediaQuery.matches);

    const handleMotionChange = (e) => setShouldPlayVideo(!e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.1 } });

      tl.fromTo(
        tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    }, heroRef);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
      ctx.revert();
    };
  }, []);

  const handleScrollTo = (e, target) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -20, duration: 1.2 });
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] min-h-[100dvh] flex flex-col justify-between items-center px-3 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8 z-10 w-full max-w-full box-border overflow-hidden"
    >
      {/* Background Hero Video Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full h-full">
        {shouldPlayVideo && (
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center scale-[1.02] transition-opacity duration-1000"
          />
        )}
        {/* Subtle Warm Ivory/White Softening Overlay for Typography Contrast */}
        <div className="absolute inset-0 bg-[#F5F3EE]/60 backdrop-blur-[1px] mix-blend-normal" />
      </div>

      {/* Floating Editorial Badges (Desktop/XL Only to prevent 1024px collision) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="absolute top-4 left-0 hidden xl:flex items-center gap-2 px-4 py-2 rounded-full light-card text-xs font-mono text-[#111111]/80 animate-float border border-[#111111]/10 backdrop-blur-md shadow-xs pointer-events-auto">
          <Code2 className="w-4 h-4 text-[#2457FF]" />
          <span>Design Technologists</span>
        </div>

        <div className="absolute top-10 right-0 hidden xl:flex items-center gap-2 px-4 py-2 rounded-full light-card text-xs font-mono text-[#111111]/80 animate-float border border-[#111111]/10 backdrop-blur-md shadow-xs pointer-events-auto" style={{ animationDelay: '2s' }}>
          <Zap className="w-4 h-4 text-[#E06D53]" />
          <span>60 FPS Motion Physics</span>
        </div>
      </div>

      {/* Center Studio Hero Content */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-6xl w-full mx-auto px-1 sm:px-4 box-border">
        {/* Studio Tagline Badge */}
        <div
          ref={tagRef}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-[10px] sm:text-xs md:text-sm font-mono tracking-wider text-[#2457FF] font-semibold uppercase mb-2.5 sm:mb-4 md:mb-6 backdrop-blur-md shadow-xs max-w-full text-center"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Two minds. One digital canvas.</span>
        </div>

        {/* Oversized Clash Display Duo Title */}
        <div
          onMouseEnter={() => setCursor('magnet')}
          onMouseLeave={resetCursor}
          className="my-1 sm:my-2 w-full max-w-full text-center flex justify-center items-center"
        >
          <MagneticHeading
            text="ROUNAK × MANISHA"
            as="h1"
            accentChar="×"
            accentColor="#2457FF"
            noWrap={true}
            className="font-display font-extrabold text-[#111111] text-[clamp(1.65rem,7.5vw,3.6rem)] sm:text-5xl md:text-5xl lg:text-[clamp(2.4rem,4.2vw,4.8rem)] xl:text-[clamp(2.6rem,4.8vw,5.8rem)] 2xl:text-[clamp(3rem,5vw,6.4rem)] tracking-tight leading-[1.05] sm:leading-none drop-shadow-xs max-w-full text-center justify-center sm:whitespace-nowrap"
            strength={0.4}
            radius={180}
          />
        </div>

        {/* Main Supporting Headline */}
        <h2 className="mt-2.5 sm:mt-4 md:mt-5 text-sm sm:text-xl md:text-2xl lg:text-3xl font-display font-bold tracking-tight text-[#111111] max-w-3xl leading-tight sm:leading-snug text-center px-1">
          WE BUILD DIGITAL EXPERIENCES.
        </h2>

        {/* Playfair Display Editorial Accent Subtitle */}
        <p className="mt-1 sm:mt-2 text-[11px] sm:text-base md:text-lg lg:text-xl font-serif italic text-[#2457FF] font-normal tracking-normal sm:tracking-wide max-w-xl text-center px-1">
          where design intuition meets engineering precision
        </p>

        {/* Studio Description */}
        <p className="mt-2 sm:mt-3 md:mt-4 text-[11px] sm:text-sm md:text-base text-[#6F6F6A] max-w-xl w-full font-sans font-normal leading-relaxed text-center px-1 sm:px-0">
          Crafting modern websites, digital design systems, and spatial brand experiences at the intersection of aesthetic direction and production engineering.
        </p>

        {/* Action CTAs: Stacked vertically on mobile (<640px), row on tablet/desktop */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, '#work')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#111111] text-white font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#2457FF] hover:scale-105 shadow-md hover:shadow-lg text-center flex items-center justify-center"
          >
            Explore Selected Works
          </a>

          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, '#about')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full light-card text-[#111111] font-display text-xs tracking-wider uppercase transition-all duration-300 hover:border-[#111111]/30 font-bold bg-white/90 backdrop-blur-md text-center flex items-center justify-center"
          >
            Meet The Duo
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#intro"
        onClick={(e) => handleScrollTo(e, '#intro')}
        onMouseEnter={() => setCursor('link')}
        onMouseLeave={resetCursor}
        className="mt-4 sm:mt-6 lg:mt-2 relative z-10 group flex flex-col items-center gap-1 sm:gap-1.5 text-[#111111]/60 hover:text-[#2457FF] transition-colors font-mono text-[10px] tracking-widest uppercase cursor-pointer select-none"
      >
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-[#2457FF]" />
      </a>
    </section>
  );
}
