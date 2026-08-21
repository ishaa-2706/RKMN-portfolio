import React, { useState } from 'react';
import { duoInfo } from '../data/duoData';
import { useCursor } from '../hooks/useCursorContext';
import { Github, Twitter, Linkedin, Mail, Code, Terminal, Sparkles } from 'lucide-react';
import MagneticHeading from './MagneticHeading';

export default function DuoSection() {
  const { setCursor, resetCursor } = useCursor();
  const [hoveredMember, setHoveredMember] = useState(null);

  const getIcon = (key) => {
    switch (key) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-36 px-3 sm:px-6 lg:px-8 xl:px-12 bg-[#F5F3EE] z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-8 border-b border-[#111111]/10 gap-4">
          <div className="w-full md:max-w-xl lg:max-w-2xl">
            {/* Pill-Style Section Eyebrow Badge — Placed strictly on its own line above heading */}
            <div className="mb-3 block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2457FF]/10 border border-[#2457FF]/30 text-[#2457FF] text-xs font-display font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CREATIVE TECHNOLOGY DUO</span>
              </div>
            </div>

            <MagneticHeading
              text="THE DUO"
              as="h2"
              noWrap={true}
              className="font-display text-[clamp(1.85rem,4.8vw,4.5rem)] xl:text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold tracking-tight text-[#111111] leading-none sm:whitespace-nowrap justify-start"
            />
            <p className="font-serif italic text-[clamp(1.1rem,4vw,1.5rem)] text-[#2457FF] mt-2 font-normal">
              two minds, one cohesive digital vision
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#6F6F6A] font-display max-w-xs md:max-w-sm lg:max-w-md font-semibold leading-relaxed shrink-0">
            Complementary mindsets operating in total sync. Engineering precision paired with aesthetic direction.
          </p>
        </div>

        {/* Duo Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative w-full">
          {/* Central Synergy Connector Icon (Desktop/XL Only) */}
          <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#2457FF]/40 items-center justify-center text-[#2457FF] font-display text-xl font-bold shadow-md pointer-events-none">
            ×
          </div>

          {duoInfo.members.map((member) => {
            const isRounak = member.id === 'rounak';
            const isSelfHovered = hoveredMember === member.id;
            const isPartnerHovered = hoveredMember && hoveredMember !== member.id;

            return (
              <div
                key={member.id}
                onMouseEnter={() => {
                  setHoveredMember(member.id);
                  setCursor('magnet');
                }}
                onMouseLeave={() => {
                  setHoveredMember(null);
                  resetCursor();
                }}
                className={`relative group rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 light-card flex flex-col justify-between overflow-hidden bg-white ${
                  isSelfHovered
                    ? 'border-[#2457FF]/60 scale-[1.01] shadow-2xl z-10'
                    : isPartnerHovered
                    ? `opacity-90 scale-[0.99] ${
                        isRounak ? 'translate-x-1 rotate-[0.5deg]' : '-translate-x-1 -rotate-[0.5deg]'
                      }`
                    : 'border-[#111111]/12'
                }`}
              >
                {/* Background Accent Glow */}
                <div
                  className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none transition-opacity duration-500 ${
                    isRounak ? 'bg-[#2457FF]' : 'bg-[#E06D53]'
                  } ${isSelfHovered ? 'opacity-25' : ''}`}
                />

                {/* Card Top: Full-Panel Actual Photograph Area */}
                <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-[#111111]/10 bg-[#F5F3EE] mb-8 shadow-sm group-hover:shadow-md transition-shadow">
                  {/* Actual High-Res Profile Photograph */}
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                      isRounak ? 'object-top' : 'object-center'
                    }`}
                  />

                  {/* Subtle Gradient Bottom Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Accessible Floating Role Label Pill */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#111111]/10 text-xs font-display text-[#111111] backdrop-blur-md flex items-center gap-2 font-bold shadow-sm">
                    {isRounak ? <Code className="w-3.5 h-3.5 text-[#2457FF]" /> : <Terminal className="w-3.5 h-3.5 text-[#E06D53]" />}
                    <span>{member.role}</span>
                  </div>
                </div>

                {/* Card Main Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111111] group-hover:text-[#2457FF] transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs font-display px-3 py-1 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-[#2457FF] font-bold">
                      0{member.id === 'rounak' ? '1' : '2'}
                    </span>
                  </div>

                  <p className="text-xs font-display uppercase tracking-wider text-[#2457FF] mb-4 font-bold">
                    {member.role}
                  </p>

                  <p className="text-sm font-sans text-[#6F6F6A] leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Quote in Playfair Display Italic */}
                  <blockquote className="p-4 rounded-xl bg-[#F5F3EE] border-l-2 border-[#2457FF] font-serif italic text-sm sm:text-base text-[#111111] mb-8">
                    "{member.quote}"
                  </blockquote>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg bg-[#F5F3EE] border border-[#111111]/10 text-xs font-display text-[#111111]/80 hover:border-[#2457FF]/40 transition-colors font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links Footer */}
                <div className="pt-6 border-t border-[#111111]/10 flex items-center justify-between">
                  <span className="text-xs font-display text-[#6F6F6A] font-semibold">Connect with {member.name}</span>
                  <div className="flex items-center gap-3">
                    {Object.entries(member.socials).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCursor('link')}
                        onMouseLeave={resetCursor}
                        className="p-2 rounded-lg bg-[#F5F3EE] hover:bg-[#2457FF] hover:text-white transition-all text-[#111111]"
                        aria-label={`${member.name} ${platform}`}
                      >
                        {getIcon(platform)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
