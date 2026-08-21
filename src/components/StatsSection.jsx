import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { Sparkles, Users, Zap, Infinity as InfinityIcon } from 'lucide-react';

export default function StatsSection() {
  const { setCursor, resetCursor } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Selected Web Projects", value: "17+", icon: <Zap className="w-5 h-5 text-[#2457FF]" /> },
    { label: "People. One Unified Team.", value: "2", icon: <Users className="w-5 h-5 text-[#5B8266]" /> },
    { label: "Possibilities & Concepts", value: "∞", icon: <InfinityIcon className="w-5 h-5 text-[#111111]" /> }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#F5F3EE] border-t border-b border-[#111111]/10 z-10 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            onMouseEnter={() => setCursor('magnet')}
            onMouseLeave={resetCursor}
            className={`p-6 sm:p-8 rounded-3xl light-card border border-[#111111]/10 flex flex-col justify-between transition-all duration-500 hover:border-[#2457FF]/40 hover:-translate-y-1 bg-white ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-[#F5F3EE] border border-[#111111]/10">
                {stat.icon}
              </div>
              <Sparkles className="w-4 h-4 text-[#111111]/20" />
            </div>

            <div>
              <span className="font-display text-5xl md:text-6xl font-extrabold text-[#111111] tracking-tight block mb-2">
                {stat.value}
              </span>
              <span className="text-xs font-display text-[#6F6F6A] uppercase tracking-wider font-bold">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
