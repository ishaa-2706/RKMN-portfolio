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
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-4">
          <div className="w-full md:max-w-2xl lg:max-w-3xl">
            {/* Pill-Style Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WORKFLOW & METHODOLOGY</span>
            </div>

            <MagneticHeading
              text="FROM IDEA → INTERNET"
              as="h2"
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] md:flex-nowrap whitespace-nowrap leading-none"
            />
            <p className="font-serif italic text-lg sm:text-xl text-[#2457FF] mt-2">
              from the first concept to the final interaction
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#6F6F6A] font-display max-w-md font-semibold leading-relaxed">
            Our 6-phase engineering pipeline designed to transform raw ambition into award-winning web products.
          </p>
        </div>

        {/* Timeline Grid Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Vertical Progress Line (Desktop) */}
          <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-[2px] bg-[#111111]/10 origin-top">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-[#2457FF] origin-top scale-y-0"
            />
          </div>

          {/* Left Column: Stage Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:pl-16">
            {timelineStages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 light-card flex items-center justify-between group ${
                    isActive
                      ? 'border-[#2457FF] bg-white shadow-md translate-x-2'
                      : 'border-[#111111]/10 hover:border-[#111111]/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-display text-sm font-bold ${
                        isActive ? 'text-[#2457FF]' : 'text-[#111111]/40'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={`font-display text-lg font-bold transition-colors ${
                        isActive ? 'text-[#111111]' : 'text-[#111111]/60 group-hover:text-[#111111]'
                      }`}
                    >
                      {stage.title}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? 'text-[#2457FF] translate-x-1' : 'text-[#111111]/30 group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Stage Detail Presentation Card */}
          <div className="lg:col-span-8 sticky top-28">
            {timelineStages.map((stage, idx) => {
              if (idx !== activeStage) return null;

              return (
                <div
                  key={stage.step}
                  className="rounded-3xl p-8 md:p-12 light-card border border-[#2457FF]/30 shadow-xl animate-fadeIn relative overflow-hidden bg-white"
                >
                  {/* Stage Number & Title */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1.5 rounded-full font-display text-xs font-bold text-white bg-[#2457FF]">
                        PHASE {stage.step}
                      </span>
                      <span className="text-xs font-serif italic text-[#6F6F6A] text-sm">
                        {stage.subtitle}
                      </span>
                    </div>
                    <Sparkles className="w-5 h-5 text-[#2457FF]" />
                  </div>

                  <h3 className="font-display text-3xl md:text-5xl font-extrabold text-[#111111] mb-6">
                    {stage.title}
                  </h3>

                  <p className="text-base md:text-lg text-[#111111]/80 font-sans leading-relaxed mb-10">
                    {stage.description}
                  </p>

                  {/* Deliverables Breakdown */}
                  <div className="border-t border-[#111111]/10 pt-8">
                    <div className="flex items-center gap-2 text-xs font-display text-[#2457FF] uppercase tracking-wider mb-4 font-bold">
                      <Layers className="w-4 h-4" />
                      <span>Key Deliverables</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stage.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 text-sm font-sans text-[#111111] font-medium"
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
