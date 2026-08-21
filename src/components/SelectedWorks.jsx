import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { useCursor } from '../hooks/useCursorContext';
import { Filter, Sparkles } from 'lucide-react';
import ProjectShowcase from './ProjectShowcase';
import ProjectModal from './ProjectModal';
import MagneticHeading from './MagneticHeading';

export default function SelectedWorks() {
  const { setCursor, resetCursor } = useCursor();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = [
    'All',
    'E-Commerce / Creative Web Design',
    'Creative Agency / Personal Branding',
    'Creative Technology',
    'Design System'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div className="w-full md:max-w-3xl">
            {/* Pill-Style Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            
            {/* Single Horizontal Heading Row on Desktop/Laptop */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 flex-wrap">
              <MagneticHeading
                text="SELECTED WORKS"
                as="h2"
                className="font-display text-[clamp(2.2rem,6vw,5.2rem)] font-extrabold tracking-tight text-[#111111] leading-none whitespace-nowrap -ml-1 sm:ml-0"
              />
              <span className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#2457FF] whitespace-nowrap">
                from idea → internet
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#6F6F6A] font-display max-w-md font-semibold leading-relaxed">
            Every project commands equal visual importance in a full-width case-study showcase.
          </p>
        </div>

        {/* Category Filter Bar — Horizontally Scrollable on Mobile without Overflowing Page */}
        <div className="w-full mb-12 md:mb-16">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 border-b border-[#111111]/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
            <div className="flex items-center gap-2 text-xs font-display text-[#6F6F6A] shrink-0 mr-2 font-bold">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => setCursor('link')}
                onMouseLeave={resetCursor}
                className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs font-display transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#2457FF] text-white font-bold shadow-md'
                    : 'bg-white text-[#111111]/80 hover:bg-[#111111]/5 border border-[#111111]/12 font-semibold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Full-Width Vertical Stack of Large Horizontal Showcases */}
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-24 w-full">
          {filteredProjects.map((project, idx) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
