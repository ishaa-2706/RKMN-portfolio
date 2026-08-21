import React, { useState, useEffect } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { ArrowUp, Clock } from 'lucide-react';

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-10 sm:py-16 px-3 sm:px-6 lg:px-8 xl:px-12 bg-[#141416] border-t border-white/10 text-white/70 font-display text-xs z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-12 w-full">
        {/* Main Footer Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-8 w-full">
          {/* Logo in Clash Display Bold */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="font-display text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2 mb-1.5"
            >
              <span>ROUNAK</span>
              <span className="text-[#2457FF]">×</span>
              <span>MANISHA</span>
            </a>
            <p className="font-serif italic text-white/70 text-xs sm:text-sm">
              Two minds. One digital canvas.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-display font-semibold text-xs">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-[#2457FF] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-[#2457FF] transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-[#2457FF] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="hover:text-[#2457FF] transition-colors"
            >
              Dribbble
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('magnet')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-[#2457FF] hover:text-white border border-white/15 transition-colors text-white font-display text-xs font-bold shrink-0"
            aria-label="Scroll back to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Copyright & Local Clock */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-white/40 text-[11px] text-center sm:text-left w-full">
          <div className="flex items-center gap-2 font-serif italic text-white/60">
            <span>Built with curiosity, caffeine & code.</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-white/70">
            <Clock className="w-3.5 h-3.5 text-[#2457FF]" />
            <span>Local Time: {time || '12:00:00 UTC'}</span>
          </div>

          <div className="font-display">
            © {new Date().getFullYear()} Rounak × Manisha. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
