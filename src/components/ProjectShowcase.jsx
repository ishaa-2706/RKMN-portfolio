import React from 'react';
import { ArrowUpRight, ExternalLink, Monitor, BookOpen } from 'lucide-react';
import { useCursor } from '../hooks/useCursorContext';

export default function ProjectShowcase({ project, index, onOpenModal }) {
  const { setCursor, resetCursor } = useCursor();
  const formattedIndex = String(index + 1).padStart(2, '0');

  const liveUrl = project.liveUrl || project.link || '#';

  return (
    <article
      onClick={() => onOpenModal(project)}
      onMouseEnter={() => setCursor('view', 'VIEW')}
      onMouseLeave={resetCursor}
      className="group relative w-full max-w-[1300px] mx-auto rounded-2xl sm:rounded-3xl md:rounded-[32px] light-card border border-[#111111]/12 bg-white p-4 sm:p-8 md:p-12 transition-all duration-500 hover:border-[#2457FF]/60 hover:shadow-2xl cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header Row: Project Index, Category & Year */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-4 border-b border-[#111111]/10 w-full">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="font-display font-black text-xs text-[#2457FF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/20">
            PROJECT {formattedIndex}
          </span>
          <span className="font-display text-xs font-bold text-[#6F6F6A] uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <span className="self-start sm:self-auto font-display text-xs font-bold text-[#111111]/60 px-3 py-1 rounded-full bg-[#F5F3EE] border border-[#111111]/10">
          {project.year}
        </span>
      </div>

      {/* Large Clash Display Bold Title & Editorial Accent Tagline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div className="max-w-4xl">
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-tight group-hover:text-[#2457FF] transition-colors break-words">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#2457FF] mt-1 font-normal leading-snug">
              {project.tagline}
            </p>
          )}
        </div>

        {/* Quick Launch Live Showcase Icon Button */}
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setCursor('link')}
          onMouseLeave={resetCursor}
          className="hidden sm:flex w-12 h-12 rounded-full bg-[#F5F3EE] border border-[#111111]/10 items-center justify-center text-[#111111] hover:bg-[#2457FF] hover:text-white transition-all duration-300 hover:rotate-45 shrink-0 shadow-sm"
          title="Open Live Website"
          aria-label={`Open ${project.title} Live Website in new tab`}
        >
          <ArrowUpRight className="w-6 h-6" />
        </a>
      </div>

      {/* Full Website Screenshot Container — 100% Uncropped (object-contain) */}
      <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#111111]/12 bg-[#F5F3EE] p-2 sm:p-4 md:p-6 mb-6 sm:mb-8 shadow-sm group-hover:shadow-md transition-shadow">
        {/* Browser Mockup Top Bar with LIVE SHOWCASE Accessible Link */}
        <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#111111]/10 rounded-xl mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="px-3 sm:px-4 py-1 rounded-full bg-[#F5F3EE] hover:bg-[#2457FF]/10 text-[10px] sm:text-[11px] font-display text-[#6F6F6A] hover:text-[#2457FF] font-semibold flex items-center gap-1.5 max-w-[200px] sm:max-w-xs truncate transition-colors"
          >
            <Monitor className="w-3 h-3 text-[#2457FF] shrink-0" />
            <span className="truncate">{liveUrl}</span>
          </a>

          {/* Accessible LIVE SHOWCASE Badge Button */}
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="px-3 py-1 rounded-full bg-[#2457FF]/10 hover:bg-[#2457FF] text-[#2457FF] hover:text-white border border-[#2457FF]/30 text-[10px] sm:text-[11px] font-display font-bold flex items-center gap-1 transition-all shadow-xs"
          >
            <span>LIVE SHOWCASE</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Complete Uncropped Image Display */}
        <div className="w-full flex items-center justify-center overflow-hidden rounded-lg bg-white border border-[#111111]/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[380px] sm:max-h-[560px] md:max-h-[780px] object-contain rounded-md transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
        </div>
      </div>

      {/* Bottom Information Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-[#111111]/10 w-full">
        {/* Description Copy */}
        <p className="text-xs sm:text-sm md:text-base text-[#6F6F6A] font-sans leading-relaxed max-w-2xl">
          {project.description}
        </p>

        {/* Right Side: Technologies & LIVE SHOWCASE + CASE STUDY Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mr-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-[#F5F3EE] border border-[#111111]/10 text-[10px] sm:text-xs font-display text-[#111111]/80 font-bold"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start mt-2 sm:mt-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#F5F3EE] hover:bg-[#111111] text-[#111111] hover:text-white border border-[#111111]/15 font-display font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-300"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>CASE STUDY</span>
            </button>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#2457FF] hover:bg-[#111111] text-white font-display font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>LIVE SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
