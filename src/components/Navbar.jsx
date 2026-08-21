import React, { useState, useEffect } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { setCursor, resetCursor } = useCursor();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROCESS', href: '#process' },
    { label: 'PLAYGROUND', href: '#playground' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    if (href === '#') {
      if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (window.lenis) {
      window.lenis.scrollTo(href, { offset: -20, duration: 1.2 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? 'py-3 sm:py-3.5 light-panel border-b border-[#111111]/10 bg-[#F5F3EE]/95 shadow-sm backdrop-blur-md'
            : 'py-4 sm:py-5 lg:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-2 lg:gap-4 w-full">
          {/* Logo in Clash Display Bold */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="group flex flex-col items-start shrink-0"
          >
            <div className="flex items-center gap-1 sm:gap-2 font-display text-xs sm:text-base lg:text-lg xl:text-xl font-extrabold tracking-tight text-[#111111] group-hover:text-[#2457FF] transition-colors">
              <span>ROUNAK</span>
              <span className="inline-block transition-transform duration-500 group-hover:rotate-180 text-[#2457FF] font-black">
                ×
              </span>
              <span>MANISHA</span>
            </div>
            <span className="hidden sm:block font-serif italic text-[10px] lg:text-[11px] text-[#2457FF] -mt-0.5 font-normal">
              creative technology duo
            </span>
          </a>

          {/* Desktop Nav Links in Clash Display Bold */}
          <nav className="hidden md:flex items-center gap-3.5 lg:gap-5 xl:gap-8 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className="relative text-[11px] lg:text-xs font-display tracking-wider lg:tracking-widest text-[#111111]/80 hover:text-[#2457FF] transition-colors py-1 group font-extrabold"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2457FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Availability Status Badge & CTA */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3.5 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-[#111111] text-[11px] lg:text-xs font-display font-semibold whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#2457FF] animate-pulse shrink-0" />
              <span>Available for Projects</span>
              <span className="hidden xl:inline font-serif italic text-[#2457FF] ml-0.5 text-xs font-normal">
                (Q3/Q4)
              </span>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              onMouseEnter={() => setCursor('magnet')}
              onMouseLeave={resetCursor}
              className="group flex items-center gap-1.5 px-3.5 sm:px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-[#111111] text-white font-display font-extrabold text-[11px] lg:text-xs tracking-wider hover:bg-[#2457FF] transition-all duration-300 shadow-sm hover:shadow-md uppercase shrink-0"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-lg bg-[#111111]/5 border border-[#111111]/10 text-[#111111] hover:bg-[#2457FF] hover:text-white transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-[#F5F3EE]/98 backdrop-blur-2xl flex flex-col justify-between px-4 sm:px-10 pt-24 pb-8 md:hidden overflow-y-auto">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#2457FF]" />
              <span className="font-serif italic text-base sm:text-lg text-[#2457FF]">
                explore the studio
              </span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-2xl sm:text-5xl font-extrabold text-[#111111] hover:text-[#2457FF] transition-colors leading-tight"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-[#111111]/10 pt-6">
            <div className="flex items-center gap-2 text-[#2457FF] text-xs font-display font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2457FF] animate-pulse" />
              <span className="font-serif italic text-sm">taking new project inquiries</span>
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-3.5 rounded-xl bg-[#2457FF] text-white font-display font-extrabold text-sm shadow-md uppercase tracking-wider"
            >
              START A PROJECT →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
