import React, { useEffect, useRef } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { ExternalLink, Sparkles, Monitor, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const { setCursor, resetCursor } = useCursor();
  const containerRef = useRef(null);
  const mockupRef = useRef(null);

  const liveUrl = "https://myibh.in";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mockup scale up on scroll
      gsap.fromTo(
        mockupRef.current,
        { scale: 0.95, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'center center',
            scrub: 0.8,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-36 px-3 sm:px-6 lg:px-8 xl:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED CASE STUDY SPOTLIGHT</span>
          </div>

          {/* Main Heading in Clash Display Bold with clamp typography */}
          <h2 className="font-display text-[clamp(2.1rem,6vw,4.8rem)] font-extrabold text-[#111111] tracking-tight leading-tight">
            INDIA BUSINESS HELPLINE
          </h2>

          {/* Tagline in Playfair Display Italic */}
          <p className="font-serif italic text-[clamp(1rem,3vw,1.6rem)] text-[#2457FF] mt-2 font-normal leading-snug max-w-3xl mx-auto">
            The complete business support ecosystem for entrepreneurs, startups & MSMEs.
          </p>
        </div>

        {/* Browser Mockup Showcase Container */}
        <div
          ref={mockupRef}
          onMouseEnter={() => setCursor('view', 'EXPLORE')}
          onMouseLeave={resetCursor}
          className="relative rounded-2xl sm:rounded-3xl light-card border border-[#2457FF]/40 overflow-hidden shadow-2xl group cursor-pointer bg-white w-full"
        >
          {/* Top Browser Bar */}
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-[#EFECE6] border-b border-[#111111]/10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-400" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-400" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-400" />
            </div>

            {/* URL bar: myibh.in */}
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="px-3 sm:px-6 py-1.5 rounded-full bg-white border border-[#111111]/10 text-xs font-display text-[#111111]/80 hover:text-[#2457FF] font-bold flex items-center gap-2 max-w-[200px] sm:max-w-sm w-full justify-center shadow-xs transition-colors truncate"
            >
              <Monitor className="w-3.5 h-3.5 text-[#2457FF] shrink-0" />
              <span className="truncate">myibh.in</span>
            </a>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2457FF]/10 text-[#2457FF] border border-[#2457FF]/30 text-xs font-display font-bold hover:bg-[#2457FF] hover:text-white transition-all shrink-0"
            >
              <span>LIVE SITE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Actual India Business Helpline Website Screenshot Visual Centerpiece */}
          <div className="relative w-full p-3 sm:p-8 md:p-12 bg-white flex flex-col justify-between overflow-hidden">
            <div className="relative z-10 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#111111]/10 shadow-md mb-6 sm:mb-10 bg-[#F5F3EE]">
              <img
                src="/projects/india-business-helpline.png"
                alt="India Business Helpline Website Screenshot"
                className="w-full h-auto max-h-[380px] sm:max-h-[560px] md:max-h-[720px] object-contain object-top mx-auto transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            </div>

            {/* Supporting Copy & Key Impact Metrics */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pt-6 border-t border-[#111111]/10 w-full">
              <div className="max-w-2xl w-full">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-xs font-display text-[#2457FF] font-bold">
                    Web Platform & Ecosystem
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-xs font-display text-[#111111]/80 font-bold">
                    2026 Production Release
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] mb-2 leading-tight">
                  One Platform. Complete Business Support.
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-[#6F6F6A] font-sans leading-relaxed">
                  From your first idea to scaling crores in revenue — IBH connects founders, MSMEs and entrepreneurs with helpline support, vetted experts, funding networks, and a thriving business community.
                </p>
              </div>

              {/* Key Metrics Cards from Screenshot */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4 shrink-0 w-full lg:w-auto">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F5F3EE] border border-[#111111]/10 text-center shadow-xs">
                  <span className="block font-display text-xl sm:text-3xl font-extrabold text-[#2457FF]">₹11.5Cr+</span>
                  <span className="text-[10px] sm:text-[11px] font-display text-[#6F6F6A] font-bold">Funding Processed</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F5F3EE] border border-[#111111]/10 text-center shadow-xs">
                  <span className="block font-display text-xl sm:text-3xl font-extrabold text-[#E06D53]">25+</span>
                  <span className="text-[10px] sm:text-[11px] font-display text-[#6F6F6A] font-bold">Vetted Experts</span>
                </div>

                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="col-span-2 sm:col-span-1 w-full sm:w-auto text-center justify-center px-6 py-3.5 rounded-xl sm:rounded-2xl bg-[#111111] hover:bg-[#2457FF] text-white font-display font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg mt-1 sm:mt-0"
                >
                  <span>VISIT MYIBH.IN</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
