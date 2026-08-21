import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { useCursor } from '../hooks/useCursorContext';
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import MagneticHeading from './MagneticHeading';

export default function Testimonials() {
  const { setCursor, resetCursor } = useCursor();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const t = testimonialsData[currentIndex];

  return (
    <section className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Pill-Style Section Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENDORSEMENTS & COLLABORATION</span>
          </div>

          <MagneticHeading
            text="WHAT PEOPLE SAY"
            as="h2"
            className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold tracking-tight text-[#111111] leading-none"
          />
          <p className="font-serif italic text-[clamp(1.1rem,4vw,1.5rem)] text-[#2457FF] mt-2 font-normal">
            endorsements from clients and engineering partners
          </p>
        </div>

        {/* Testimonial Quote Card */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 light-card border border-[#111111]/12 overflow-hidden text-center shadow-xl bg-white w-full">
          <Quote className="w-10 sm:w-12 h-10 sm:h-12 text-[#2457FF]/30 mx-auto mb-4 sm:mb-6" />

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mb-4 sm:mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#2457FF] text-[#2457FF]" />
            ))}
          </div>

          <p className="text-base sm:text-xl md:text-2xl font-serif italic text-[#111111] leading-relaxed font-normal mb-8 sm:mb-10 max-w-3xl mx-auto">
            "{t.quote}"
          </p>

          {/* Author Details */}
          <div className="flex flex-col items-center">
            <img
              src={t.avatar}
              alt={t.author}
              className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border-2 border-[#2457FF] object-cover mb-3 shadow-md"
            />
            <h3 className="font-display text-base sm:text-lg font-bold text-[#111111]">
              {t.author}
            </h3>
            <span className="text-xs font-display text-[#6F6F6A] font-semibold">
              {t.role} — <span className="text-[#2457FF] font-bold">{t.company}</span>
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between absolute inset-y-0 left-2 sm:left-4 right-2 sm:right-4 pointer-events-none">
            <button
              onClick={prevTestimonial}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-[#F5F3EE] hover:bg-[#2457FF] hover:text-white border border-[#111111]/10 transition-colors text-[#111111] shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-[#F5F3EE] hover:bg-[#2457FF] hover:text-white border border-[#111111]/10 transition-colors text-[#111111] shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
