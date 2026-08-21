import React, { useState, useEffect, useRef } from 'react';
import { timelineStages } from '../data/timelineData';
import { useCursor } from '../hooks/useCursorContext';
import { CheckCircle2, ArrowRight, Layers, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticHeading from './MagneticHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const { setCursor, resetCursor } = useCursor();
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line expansion on scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-36 px-3 sm:px-6 lg:px-8 xl:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-4">
          <div className="w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {/* Pill-Style Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WORKFLOW & METHODOLOGY</span>
            </div>

            <MagneticHeading
              text="FROM IDEA → INTERNET"
              as="h2"
              noWrap={true}
              className="font-display text-[clamp(1.5rem,3.4vw,3.2rem)] md:text-[clamp(1.8rem,3vw,3.6rem)] xl:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight sm:leading-none sm:whitespace-nowrap justify-start"
            />
            <p className="font-serif italic text-base sm:text-lg lg:text-xl text-[#2457FF] mt-2">
              from the first concept to the final interaction
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#6F6F6A] font-display max-w-xs md:max-w-sm lg:max-w-md font-semibold leading-relaxed shrink-0">
            Our 6-phase engineering pipeline designed to transform raw ambition into award-winning web products.
          </p>
        </div>

        {/* Process Timeline Grid: Side-by-side columns on md+ (including 1024px) */}
        <div className="relative grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[330px_minmax(0,1fr)] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start w-full">
          {/* Vertical Progress Line (md+) */}
          <div className="hidden md:block absolute left-3.5 lg:left-4 xl:left-6 top-0 bottom-0 w-[2px] bg-[#111111]/10 origin-top">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-[#2457FF] origin-top scale-y-0"
            />
          </div>

          {/* Left Column: Stage Selectors (Timeline) */}
          <div className="flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 md:pl-7 lg:pl-8 xl:pl-10 w-full">
            {timelineStages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className={`text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 light-card flex items-center justify-between group ${
                    isActive
                      ? 'border-[#2457FF] bg-white shadow-md translate-x-1.5'
                      : 'border-[#111111]/10 hover:border-[#111111]/30 bg-white/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <span
                      className={`font-display text-xs sm:text-sm font-bold ${
                        isActive ? 'text-[#2457FF]' : 'text-[#111111]/40'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={`font-display text-sm sm:text-base font-bold transition-colors ${
                        isActive ? 'text-[#111111]' : 'text-[#111111]/60 group-hover:text-[#111111]'
                      }`}
                    >
                      {stage.title}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                      isActive ? 'text-[#2457FF] translate-x-1' : 'text-[#111111]/30 group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Stage Detail Presentation Card */}
          <div className="sticky top-24 lg:top-28 w-full">
            {timelineStages.map((stage, idx) => {
              if (idx !== activeStage) return null;

              return (
                <div
                  key={stage.step}
                  className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-8 xl:p-12 light-card border border-[#2457FF]/30 shadow-xl animate-fadeIn relative overflow-hidden bg-white w-full"
                >
                  {/* Stage Number & Title */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-display text-xs font-bold text-white bg-[#2457FF]">
                        PHASE {stage.step}
                      </span>
                      <span className="text-xs font-serif italic text-[#6F6F6A]">
                        {stage.subtitle}
                      </span>
                    </div>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#2457FF]" />
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-[#111111] mb-3 sm:mb-4 lg:mb-6">
                    {stage.title}
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-[#111111]/80 font-sans leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                    {stage.description}
                  </p>

                  {/* Deliverables Breakdown */}
                  <div className="border-t border-[#111111]/10 pt-6 sm:pt-8">
                    <div className="flex items-center gap-2 text-xs font-display text-[#2457FF] uppercase tracking-wider mb-3 sm:mb-4 font-bold">
                      <Layers className="w-4 h-4" />
                      <span>Key Deliverables</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {stage.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-xs sm:text-sm font-sans text-[#111111] font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2457FF]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
