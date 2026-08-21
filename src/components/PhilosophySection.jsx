import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import MagneticHeading from './MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const pillars = [
    { num: "01", title: "DESIGN WITH PURPOSE.", desc: "Form follows intent. Every layout, typography scale, and color choice must serve a story.", color: "#2457FF" },
    { num: "02", title: "CODE WITH PRECISION.", desc: "Clean TypeScript architecture, zero bloated dependencies, and 100% Lighthouse audit standard.", color: "#E06D53" },
    { num: "03", title: "ANIMATE WITH INTENTION.", desc: "Physics-based easing curves that feel natural, non-distracting, and butter-smooth at 60 FPS.", color: "#5B8266" },
    { num: "04", title: "BUILD FOR PEOPLE.", desc: "Human-centric digital interfaces engineered for absolute accessibility and delight.", color: "#D97706" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 md:py-36 px-3 sm:px-6 lg:px-8 xl:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          {/* Pill-Style Section Eyebrow Badge — Placed strictly on its own line above main heading */}
          <div className="mb-3 flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE PRINCIPLES</span>
            </div>
          </div>

          <MagneticHeading
            text="WE BELIEVE GOOD WEBSITES SHOULD FEEL ALIVE."
            as="h2"
            className="font-display text-[clamp(1.5rem,3.8vw,3.8rem)] xl:text-[clamp(2.2rem,4.5vw,4.8rem)] font-extrabold tracking-tight text-[#111111] max-w-5xl mx-auto leading-[1.15] text-center justify-center"
          />
          <p className="font-serif italic text-[clamp(1.1rem,4vw,1.5rem)] text-[#2457FF] mt-2 font-normal">
            principles that guide every line of code & visual decision
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl light-card border border-[#111111]/10 relative overflow-hidden group hover:border-[#2457FF]/50 transition-all duration-500 bg-white shadow-xs"
            >
              {/* Pillar Number */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <span
                  className="font-display text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full text-white shadow-xs"
                  style={{ backgroundColor: pillar.color }}
                >
                  {pillar.num}
                </span>
                <span className="text-xs font-serif italic text-[#6F6F6A]">
                  Principle {pillar.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111111] mb-3 sm:mb-4 group-hover:text-[#2457FF] transition-colors leading-snug">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base font-sans text-[#6F6F6A] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
