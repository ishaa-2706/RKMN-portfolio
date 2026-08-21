import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../hooks/useCursorContext';
import { Sparkles, Play, Volume2 } from 'lucide-react';
import MagneticHeading from './MagneticHeading';

export default function Playground() {
  const { setCursor, resetCursor } = useCursor();
  const [activeTab, setActiveTab] = useState('fluid');

  // Fluid Canvas State
  const canvasRef = useRef(null);
  const [particleColor, setParticleColor] = useState('#2457FF');

  // Typo Distorter State
  const [typoText, setTypoText] = useState('ROUNAK × MANISHA');
  const [fontWeight, setFontWeight] = useState(800);
  const [letterSpacing, setLetterSpacing] = useState(2);

  // Audio Synth Tone Trigger
  const playTone = (freq) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log('Web Audio disabled');
    }
  };

  // Render Fluid Particle Sandbox
  useEffect(() => {
    if (activeTab !== 'fluid') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 360);

    let mouse = { x: width / 2, y: height / 2 };
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 4 + 2,
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', onMove);

    const loop = () => {
      ctx.fillStyle = 'rgba(245, 243, 238, 0.3)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Magnet force to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= (dx / dist) * 2;
          p.y -= (dy / dist) * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      canvas?.removeEventListener('mousemove', onMove);
    };
  }, [activeTab, particleColor]);

  return (
    <section id="playground" className="relative py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-12 bg-[#F5F3EE] border-t border-[#111111]/10 z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
          <div className="w-full md:max-w-2xl lg:max-w-3xl">
            {/* Coral/Orange Eyebrow Badge matching Vercel reference */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E06D53]/10 border border-[#E06D53]/30 text-[#E06D53] text-xs font-display font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LABORATORY & EXPERIMENTAL SHADERS</span>
            </div>

            <MagneticHeading
              text="THE PLAYGROUND"
              as="h2"
              className="font-display text-[clamp(2.2rem,6vw,5.2rem)] font-extrabold tracking-tight text-[#111111] leading-none whitespace-nowrap md:flex-nowrap"
            />
            <p className="font-serif italic text-[clamp(1.1rem,4vw,1.5rem)] text-[#E06D53] mt-2 font-normal">
              experimental code & spatial explorations
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#6F6F6A] font-display max-w-md font-semibold leading-relaxed">
            Mini creative code experiments, audio synthesizers, and canvas physics toys built in our design lab.
          </p>
        </div>

        {/* Experiment Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
          <button
            onClick={() => setActiveTab('fluid')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className={`whitespace-nowrap shrink-0 px-5 py-2.5 rounded-2xl font-display text-xs transition-all ${
              activeTab === 'fluid'
                ? 'bg-[#2457FF] text-white font-bold shadow-md'
                : 'bg-white text-[#111111]/80 hover:bg-[#111111]/5 border border-[#111111]/12 font-semibold'
            }`}
          >
            01 — Fluid Wave Shader
          </button>
          <button
            onClick={() => setActiveTab('typo')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className={`whitespace-nowrap shrink-0 px-5 py-2.5 rounded-2xl font-display text-xs transition-all ${
              activeTab === 'typo'
                ? 'bg-[#E06D53] text-white font-bold shadow-md'
                : 'bg-white text-[#111111]/80 hover:bg-[#111111]/5 border border-[#111111]/12 font-semibold'
            }`}
          >
            02 — Kinetic Typographic Lab
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
            className={`whitespace-nowrap shrink-0 px-5 py-2.5 rounded-2xl font-display text-xs transition-all ${
              activeTab === 'audio'
                ? 'bg-[#111111] text-white font-bold shadow-md'
                : 'bg-white text-[#111111]/80 hover:bg-[#111111]/5 border border-[#111111]/12 font-semibold'
            }`}
          >
            03 — Ambient Synthesizer
          </button>
        </div>

        {/* Playground Active Sandbox Window */}
        <div className="rounded-2xl sm:rounded-3xl light-card border border-[#111111]/15 p-4 sm:p-8 md:p-10 relative overflow-hidden min-h-[440px] flex flex-col justify-between bg-white shadow-xl w-full">
          {/* TAB 1: Fluid Canvas */}
          {activeTab === 'fluid' && (
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-display text-[#6F6F6A] font-semibold">Move cursor across canvas to repel fluid particles</span>
                <div className="flex items-center gap-2">
                  {['#2457FF', '#E06D53', '#5B8266', '#111111'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setParticleColor(c)}
                      className="w-5 h-5 rounded-full border border-[#111111]/20 transition-transform hover:scale-125"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#111111]/10 relative bg-[#F5F3EE]">
                <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
              </div>
            </div>
          )}

          {/* TAB 2: Kinetic Typo Distorter */}
          {activeTab === 'typo' && (
            <div className="flex flex-col justify-between h-full py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">Input Custom Text</label>
                  <input
                    type="text"
                    value={typoText}
                    onChange={(e) => setTypoText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5F3EE] border border-[#111111]/15 text-[#111111] font-display text-sm focus:border-[#2457FF] outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">Font Weight ({fontWeight})</label>
                    <input
                      type="range"
                      min="300"
                      max="900"
                      step="50"
                      value={fontWeight}
                      onChange={(e) => setFontWeight(Number(e.target.value))}
                      className="w-full accent-[#2457FF]"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-display text-[#6F6F6A] mb-2 uppercase font-bold">Letter Spacing ({letterSpacing}px)</label>
                    <input
                      type="range"
                      min="-2"
                      max="16"
                      step="1"
                      value={letterSpacing}
                      onChange={(e) => setLetterSpacing(Number(e.target.value))}
                      className="w-full accent-[#2457FF]"
                    />
                  </div>
                </div>
              </div>

              <div className="my-auto py-8 sm:py-12 text-center rounded-2xl bg-[#F5F3EE] border border-[#111111]/10 overflow-hidden">
                <h3
                  className="font-display text-3xl sm:text-5xl md:text-7xl text-[#111111] transition-all duration-150 select-none break-words"
                  style={{
                    fontWeight: fontWeight,
                    letterSpacing: `${letterSpacing}px`,
                  }}
                >
                  {typoText || 'ROUNAK × MANISHA'}
                </h3>
              </div>
            </div>
          )}

          {/* TAB 3: Ambient Synth */}
          {activeTab === 'audio' && (
            <div className="flex flex-col justify-between h-full py-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-display text-[#6F6F6A] flex items-center gap-2 font-semibold">
                  <Volume2 className="w-4 h-4 text-[#2457FF]" />
                  <span>Click pads to synthesize pentatonic frequency harmonics</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-auto">
                {[
                  { name: 'C4 — Ground', freq: 261.63, color: '#2457FF' },
                  { name: 'E4 — Resonance', freq: 329.63, color: '#E06D53' },
                  { name: 'G4 — Atmosphere', freq: 392.00, color: '#5B8266' },
                  { name: 'B4 — Sparkle', freq: 493.88, color: '#111111' },
                ].map((note) => (
                  <button
                    key={note.name}
                    onClick={() => playTone(note.freq)}
                    onMouseEnter={() => setCursor('magnet')}
                    onMouseLeave={resetCursor}
                    className="p-6 sm:p-8 rounded-2xl light-card border border-[#111111]/10 hover:border-[#111111]/30 flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 group bg-[#F5F3EE]"
                  >
                    <Play className="w-6 sm:w-8 h-6 sm:h-8 mb-3 transition-transform group-hover:scale-125" style={{ color: note.color }} />
                    <span className="font-display text-xs font-bold text-[#111111]">{note.name}</span>
                    <span className="text-[10px] font-display text-[#6F6F6A] mt-1 font-semibold">{note.freq} Hz</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
