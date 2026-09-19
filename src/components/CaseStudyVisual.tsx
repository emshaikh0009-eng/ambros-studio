import { memo, useState, useEffect, useRef } from 'react';

interface CaseStudyVisualProps {
  title: string;
  image?: string;
  altText?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  eyebrow?: string;
  tag?: string;
  category?: string;
  deliverables?: string[];
  className?: string;
  size?: 'card' | 'modal' | 'large';
}

export default memo(function CaseStudyVisual({
  title,
  image,
  altText,
  imageAlt,
  width = 1200,
  height = 800,
  eyebrow = 'CASE STUDY',
  tag,
  category,
  deliverables,
  className = '',
  size = 'card',
}: CaseStudyVisualProps) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);
  const resolvedAlt = altText || imageAlt || title;
  const isModal = size === 'modal';

  const handleToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapRef.current < 300) return;
    lastTapRef.current = now;
    setIsActive((prev) => !prev);
  };

  // Tap outside dismisses the active color state
  useEffect(() => {
    if (!isActive) return;
    const handleOutside = (e: MouseEvent | TouchEvent | PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    window.addEventListener('pointerdown', handleOutside);
    window.addEventListener('touchstart', handleOutside);
    return () => {
      window.removeEventListener('pointerdown', handleOutside);
      window.removeEventListener('touchstart', handleOutside);
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handleToggle}
      onTouchStart={handleToggle}
      className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-center text-center select-none transition-all duration-500 cursor-pointer ${
        isActive ? 'is-active glow-on-active' : ''
      } ${className}`}
      style={{
        background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
      }}
    >
      {/* Corner Slate-Blue Radial Glow with subtle hover shift (base background glow) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-2 group-hover:-translate-y-2 z-0"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(109, 129, 150, 0.25), transparent 60%)',
        }}
      />

      {/* Subtle Grid Overlay (5% opacity repeating grid lines) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 24px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 24px)
          `,
        }}
      />

      {/* Real Image Tag: unconditionally rendered, sits behind title text, grayscale hover & tap effect */}
      <img
        src={image}
        alt={resolvedAlt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full object-cover contrast-105 transition-all duration-700 ease-out group-hover:scale-105 z-0 ${
          isActive
            ? 'grayscale-0'
            : 'grayscale contrast-105 group-hover:grayscale-0 group-active:grayscale-0'
        }`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Soft grain overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30 z-[1]" />

      {/* Subtle dark overlay / vignette to ensure text stays readable on top of image */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-[#0a0a0a]/30 pointer-events-none z-[1]" />

      {/* Title, category, eyebrow text sitting on top with relative z-10 */}
      <div className="relative z-10 px-6 py-8 flex flex-col items-center justify-center max-w-lg transition-transform duration-500 group-hover:scale-[1.02]">
        {/* Small uppercase eyebrow label */}
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196] shadow-[0_0_8px_#6d8196]" />
          <span className="font-tech text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#6d8196] font-semibold">
            {eyebrow}
          </span>
          {category && !isModal && (
            <>
              <span className="text-[#4a4a4a]">·</span>
              <span className="font-tech text-[10px] uppercase tracking-wider text-[#cbcbcb]/60 hidden sm:inline">
                {category}
              </span>
            </>
          )}
        </div>

        {/* Project Title in large serif font, cream color #FFFFE3 with soft glow hover */}
        <h3
          className={`font-serif-luxury text-[#FFFFE3] leading-[1.08] tracking-tight transition-all duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_25px_rgba(255,255,227,0.55)] ${
            isModal
              ? 'text-3xl sm:text-4xl md:text-5xl max-w-xl'
              : 'text-2xl sm:text-3xl md:text-4xl'
          }`}
        >
          {title}
        </h3>
      </div>

      {/* Optional deliverables badge row (for modal view) */}
      {deliverables && deliverables.length > 0 && isModal && (
        <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap gap-2 justify-center pointer-events-none">
          {deliverables.slice(0, 4).map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-[#0a0a0a]/85 backdrop-blur-md border border-[#6d8196]/40 text-[#FFFFE3] font-tech text-xs shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Top Tag badge if present */}
      {tag && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#0a0a0a]/85 backdrop-blur-md border border-[#6d8196]/40 text-[#FFFFE3] font-tech text-xs uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {tag}
          </span>
        </div>
      )}
    </div>
  );
});
