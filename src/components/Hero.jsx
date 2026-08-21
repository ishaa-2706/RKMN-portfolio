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
      className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 pt-28 pb-10 z-10 w-full box-border overflow-hidden"
    >
      {/* Background Hero Video Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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

      {/* Floating Editorial Badges */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="absolute top-8 left-0 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full light-card text-xs font-mono text-[#111111]/80 animate-float border border-[#111111]/10 backdrop-blur-md shadow-xs pointer-events-auto">
          <Code2 className="w-4 h-4 text-[#2457FF]" />
          <span>Design Technologists</span>
        </div>

        <div className="absolute top-16 right-0 hidden lg:flex items-center gap-2 px-4 py-2 rounded-full light-card text-xs font-mono text-[#111111]/80 animate-float border border-[#111111]/10 backdrop-blur-md shadow-xs pointer-events-auto" style={{ animationDelay: '2s' }}>
          <Zap className="w-4 h-4 text-[#E06D53]" />
          <span>60 FPS Motion Physics</span>
        </div>
      </div>

      {/* Center Studio Hero Content */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-7xl w-full mx-auto px-2 sm:px-4 box-border">
        {/* Studio Tagline Badge */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-xs md:text-sm font-mono tracking-wider text-[#2457FF] font-semibold uppercase mb-6 md:mb-8 backdrop-blur-md shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Two minds. One digital canvas.</span>
        </div>

        {/* Oversized Clash Display Duo Title */}
        <div
          onMouseEnter={() => setCursor('magnet')}
          onMouseLeave={resetCursor}
          className="my-2 md:my-4 w-full text-center"
        >
          <MagneticHeading
            text="ROUNAK × MANISHA"
            as="h1"
            accentChar="×"
            accentColor="#2457FF"
            className="font-display font-extrabold text-[#111111] text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.2rem,4.5vw,5.2rem)] xl:text-[clamp(2.6rem,4.8vw,5.8rem)] 2xl:text-[clamp(3rem,5vw,6.4rem)] tracking-tight leading-none drop-shadow-xs"
            strength={0.4}
            radius={180}
          />
        </div>

        {/* Main Supporting Headline & Playfair Display Italic Accent */}
        <h2 className="mt-6 text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-[#111111] max-w-3xl">
          WE BUILD DIGITAL EXPERIENCES.
        </h2>

        {/* Playfair Display Editorial Accent Subtitle */}
        <p className="mt-2 text-base sm:text-lg md:text-xl font-serif italic text-[#2457FF] font-normal tracking-wide">
          where design intuition meets engineering precision
        </p>

        <p className="mt-4 text-sm sm:text-base text-[#6F6F6A] max-w-xl font-sans font-normal leading-relaxed">
          Crafting modern websites, digital design systems, and spatial brand experiences at the intersection of aesthetic direction and production engineering.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            onClick={(e) => handleScrollTo(e, '#work')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="px-8 py-3.5 rounded-full bg-[#111111] text-white font-display font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-[#2457FF] hover:scale-105 shadow-md hover:shadow-lg"
          >
            Explore Selected Works
          </a>

          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, '#about')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="px-8 py-3.5 rounded-full light-card text-[#111111] font-display text-xs tracking-wider uppercase transition-all duration-300 hover:border-[#111111]/30 font-bold bg-white/90 backdrop-blur-md"
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
        className="relative z-10 group flex flex-col items-center gap-2 text-[#111111]/60 hover:text-[#2457FF] transition-colors font-mono text-[10px] tracking-widest uppercase cursor-pointer"
      >
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 text-[#2457FF]" />
      </a>
    </section>
  );
}
