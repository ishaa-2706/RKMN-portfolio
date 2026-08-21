import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticHeading({
  text,
  as: Component = 'h2',
  className = '',
  accentChar = '×',
  accentColor = '#2457FF',
  strength = 0.35,
  radius = 160,
  noWrap = false,
}) {
  const containerRef = useRef(null);
  const charRefs = useRef([]);

  // Split text into words & characters
  const words = text ? text.split(' ') : [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const chars = charRefs.current.filter(Boolean);
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      // Create GSAP quickTo setters for 60 FPS interpolation using canonical properties
      const setters = chars.map((char) => ({
        x: gsap.quickTo(char, 'x', { duration: 0.4, ease: 'power2.out' }),
        y: gsap.quickTo(char, 'y', { duration: 0.4, ease: 'power2.out' }),
        rotation: gsap.quickTo(char, 'rotation', { duration: 0.4, ease: 'power2.out' }),
        scaleX: gsap.quickTo(char, 'scaleX', { duration: 0.4, ease: 'power2.out' }),
        scaleY: gsap.quickTo(char, 'scaleY', { duration: 0.4, ease: 'power2.out' }),
      }));

      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        chars.forEach((char, idx) => {
          const charRect = char.getBoundingClientRect();
          const charCenterX = charRect.left + charRect.width / 2;
          const charCenterY = charRect.top + charRect.height / 2;

          const deltaX = mouseX - charCenterX;
          const deltaY = mouseY - charCenterY;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (dist < radius) {
            const factor = 1 - dist / radius;
            const moveX = deltaX * factor * strength;
            const moveY = deltaY * factor * strength;
            const rotateDeg = (deltaX / radius) * 6 * factor;
            const scaleVal = 1 + factor * 0.08;

            setters[idx].x(moveX);
            setters[idx].y(moveY);
            setters[idx].rotation(rotateDeg);
            setters[idx].scaleX(scaleVal);
            setters[idx].scaleY(scaleVal);
          } else {
            setters[idx].x(0);
            setters[idx].y(0);
            setters[idx].rotation(0);
            setters[idx].scaleX(1);
            setters[idx].scaleY(1);
          }
        });
      };

      const handleMouseLeave = () => {
        chars.forEach((_, idx) => {
          setters[idx].x(0);
          setters[idx].y(0);
          setters[idx].rotation(0);
          setters[idx].scaleX(1);
          setters[idx].scaleY(1);
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }, container);

    return () => {
      ctx.revert();
    };
  }, [text, strength, radius]);

  let globalIndex = 0;

  return (
    <Component
      ref={containerRef}
      className={`inline-flex items-center gap-x-[0.22em] sm:gap-x-[0.3em] gap-y-[0.1em] cursor-default select-none ${
        noWrap ? 'flex-wrap sm:flex-nowrap sm:whitespace-nowrap' : 'flex-wrap'
      } ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex items-center whitespace-nowrap">
          {word.split('').map((char, charIdx) => {
            const currentIdx = globalIndex++;
            const isAccent = char === accentChar;

            return (
              <span
                key={charIdx}
                ref={(el) => (charRefs.current[currentIdx] = el)}
                className={`inline-block transition-colors duration-300 will-change-transform ${
                  isAccent ? 'font-black' : ''
                }`}
                style={{ color: isAccent ? accentColor : undefined }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
