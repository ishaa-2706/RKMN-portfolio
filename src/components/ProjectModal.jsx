import React, { useEffect } from 'react';
import { X, ExternalLink, Github, BarChart3, Layers } from 'lucide-react';
import { useCursor } from '../hooks/useCursorContext';

export default function ProjectModal({ project, onClose }) {
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    // Pause Lenis smooth scroll engine so modal receives 100% native wheel/trackpad events
    if (window.lenis) {
      window.lenis.stop();
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow || 'auto';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [onClose]);

  if (!project) return null;

  const cs = project.fullCaseStudy || {};

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-20 sm:pt-24 pb-6 px-4 sm:px-6 md:px-8 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Bounded Card — Spacious 92vw max-w-[1450px] container */}
      <div
        data-lenis-prevent
        className="relative w-[92vw] max-w-[1450px] max-h-[calc(100vh-110px)] sm:max-h-[calc(100vh-125px)] bg-[#F5F3EE] border border-[#111111]/20 rounded-3xl overflow-y-auto overscroll-contain shadow-2xl text-[#111111] p-6 sm:p-10 md:p-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Floating Close Button — Zero white gradient overlay or horizontal bar */}
        <div className="sticky top-0 right-0 z-30 flex justify-end pb-2 pointer-events-none">
          <button
            onClick={onClose}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className="pointer-events-auto p-3 rounded-full bg-[#111111] text-white hover:bg-[#2457FF] transition-all border border-[#111111]/20 shadow-lg"
            aria-label="Close Case Study Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Top Header */}
        <div className="mb-6 -mt-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3.5 py-1 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-xs font-display text-[#2457FF] uppercase font-bold">
              {project.category}
            </span>
            <span className="text-xs font-display text-[#6F6F6A] font-bold">{project.year}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#111111] mb-2 leading-tight">
            {project.title}
          </h2>

          {project.tagline && (
            <p className="font-serif italic text-lg sm:text-xl text-[#2457FF] font-normal">
              {project.tagline}
            </p>
          )}
        </div>

        {/* Full-width Uncropped Screenshot Showcase — 100% Clean Image, No White Bars */}
        {project.image && (
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#111111]/12 mb-8 bg-white p-2 sm:p-4 shadow-sm">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[750px] object-contain mx-auto rounded-xl"
            />
          </div>
        )}

        {/* Client Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-white border border-[#111111]/10 mb-8 font-display text-xs shadow-sm">
          <div>
            <span className="block text-[#6F6F6A] mb-1 font-display font-semibold">CLIENT</span>
            <span className="font-bold text-[#111111]">{cs.client || 'Internal Product'}</span>
          </div>
          <div>
            <span className="block text-[#6F6F6A] mb-1 font-display font-semibold">ROLE</span>
            <span className="font-bold text-[#2457FF]">{cs.role || 'Design & Engineering Duo'}</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-[#6F6F6A] mb-1 font-display font-semibold">TIMELINE</span>
            <span className="font-bold text-[#111111]">{cs.timeline || '6 Weeks'}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-8">
          <h3 className="text-xs font-display text-[#2457FF] uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
            <Layers className="w-4 h-4" />
            <span>Project Overview</span>
          </h3>
          <p className="text-sm sm:text-base text-[#111111]/80 font-sans leading-relaxed max-w-4xl">
            {cs.overview || project.description}
          </p>
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white border border-red-200 shadow-sm">
            <h4 className="font-display text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              THE CHALLENGE
            </h4>
            <p className="text-xs sm:text-sm text-[#111111]/80 font-sans leading-relaxed">
              {cs.challenge}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm">
            <h4 className="font-display text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              OUR SOLUTION
            </h4>
            <p className="text-xs sm:text-sm text-[#111111]/80 font-sans leading-relaxed">
              {cs.solution}
            </p>
          </div>
        </div>

        {/* Tech Architecture & Performance Metrics */}
        {cs.metrics && (
          <div className="mb-8">
            <h3 className="text-xs font-display text-[#2457FF] uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
              <BarChart3 className="w-4 h-4" />
              <span>Performance & Impact Metrics</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cs.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-xl bg-white border border-[#111111]/10 text-center shadow-sm">
                  <span className="block font-display text-2xl font-bold text-[#2457FF]">{m.value}</span>
                  <span className="text-[11px] font-display text-[#6F6F6A] font-semibold">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Links Footer */}
        <div className="pt-6 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-white border border-[#111111]/10 text-xs font-display text-[#111111]/80 font-bold">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={project.github || '#'}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white border border-[#111111]/15 hover:bg-[#111111] hover:text-white text-[#111111] font-display text-xs flex items-center gap-2 transition-colors font-bold"
            >
              <Github className="w-4 h-4" />
              <span>Repository</span>
            </a>

            {(project.liveUrl || (project.link && project.link !== '#')) && (
              <a
                href={project.liveUrl || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#2457FF] text-white font-display font-bold text-xs flex items-center gap-2 hover:bg-[#111111] shadow-md transition-colors"
              >
                <span>VISIT LIVE SITE</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
