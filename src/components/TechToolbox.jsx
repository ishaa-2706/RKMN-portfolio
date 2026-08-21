import React, { useState } from 'react';
import { skillCategories } from '../data/skillsData';
import { useCursor } from '../hooks/useCursorContext';
import { Terminal, Sparkles } from 'lucide-react';
import MagneticHeading from './MagneticHeading';

export default function TechToolbox() {
  const { setCursor, resetCursor } = useCursor();
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div className="w-full md:max-w-2xl">
            {/* Pill-Style Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ENGINEERING TOOLBOX</span>
            </div>

            <MagneticHeading
              text="THE TOOLBOX"
              as="h2"
              className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold tracking-tight text-[#111111] leading-none"
            />
            <p className="font-serif italic text-[clamp(1.1rem,4vw,1.5rem)] text-[#2457FF] mt-2">
              technologies & frameworks we craft with
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#6F6F6A] font-display max-w-md font-semibold leading-relaxed">
            Production-tested languages, creative frameworks, motion physics engines, and design software.
          </p>
        </div>

        {/* Category Tabs — Increased Horizontal Padding (px-6 sm:px-7) */}
        <div className="w-full mb-10 sm:mb-12">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-1 border-b border-[#111111]/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(idx)}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className={`whitespace-nowrap shrink-0 px-6 sm:px-7 py-2.5 rounded-2xl text-xs font-display transition-all duration-300 ${
                  activeCategory === idx
                    ? 'bg-[#2457FF] text-white font-bold shadow-md'
                    : 'bg-white text-[#111111]/80 hover:bg-[#111111]/5 border border-[#111111]/12 font-semibold'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid — 1 col on mobile (320px–640px), 2 on tablet (640px–1024px), 4 on desktop (1024px+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {skillCategories[activeCategory].skills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => setCursor('magnet')}
              onMouseLeave={resetCursor}
              className="p-5 sm:p-6 rounded-2xl light-card border border-[#111111]/10 hover:border-[#2457FF]/50 transition-all duration-300 group flex flex-col justify-between bg-white shadow-xs"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-xl bg-[#F5F3EE] text-[#2457FF] border border-[#111111]/10 group-hover:scale-110 transition-transform">
                  <Terminal className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <span className="text-[10px] font-display px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                  {skill.level}
                </span>
              </div>

              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#2457FF] transition-colors mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs font-display font-semibold text-[#6F6F6A]">
                  Production Tested
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
