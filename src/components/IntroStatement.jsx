import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function IntroStatement() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  const text = "WE DON'T JUST BUILD WEBSITES. WE BUILD EXPERIENCES PEOPLE REMEMBER.";
  const words = text.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven word reveal
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: 0.2,
          filter: 'blur(4px)',
          y: 15,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.6,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#F5F3EE] flex items-center justify-center border-t border-b border-[#111111]/10 z-10"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Pill-Style Section Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STUDIO PHILOSOPHY</span>
        </div>

        <p className="font-serif italic text-xl md:text-2xl text-[#2457FF] mb-6 font-normal">
          crafting lasting digital impressions
        </p>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-[#111111] flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, index) => {
            const isHighlight = word.includes("EXPERIENCES") || word.includes("REMEMBER.");
            return (
              <span
                key={index}
                ref={(el) => (wordsRef.current[index] = el)}
                className={`inline-block transition-all ${
                  isHighlight
                    ? 'text-[#2457FF] font-black'
                    : 'text-[#111111]'
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
