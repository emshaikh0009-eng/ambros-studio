import { memo, useState } from 'react';

interface CaseStudyVisualProps {
  title: string;
  image?: string;
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
  const [imageError, setImageError] = useState(false);
  const isModal = size === 'modal';

  const showImage = Boolean(image && !imageError);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {showImage ? (
        <div className="relative w-full h-full overflow-hidden bg-[#181a1d]">
          <img
            src={image}
            alt={imageAlt || title}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center grayscale contrast-105 group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
          />

          {/* Soft grain overlay */}
          <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

          {/* Ambient gradient vignette at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent pointer-events-none" />

          {/* Top Tag badge if present */}
          {tag && (
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-[#0a0a0a]/85 backdrop-blur-md border border-[#6d8196]/40 text-[#FFFFE3] font-tech text-xs uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {tag}
              </span>
            </div>
          )}

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
        </div>
      ) : (
        /* CSS Gradient Fallback when image is missing or errors */
        <div
          className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center text-center select-none"
          style={{
            background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
          }}
        >
          {/* Corner Slate-Blue Radial Glow with subtle hover shift */}
          <div
            className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-2 group-hover:-translate-y-2"
            style={{
              background: 'radial-gradient(circle at 30% 20%, rgba(109, 129, 150, 0.25), transparent 60%)',
            }}
          />

          {/* Subtle Grid Overlay (5% opacity repeating grid lines) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-100"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 24px),
                repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 24px)
              `,
            }}
          />

          {/* Ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/30 pointer-events-none" />

          {/* Centered Typography & Eyebrow */}
          <div className="relative z-10 px-6 py-8 flex flex-col items-center justify-center max-w-lg transition-transform duration-500 group-hover:scale-[1.02]">
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

          {/* Deliverables badge row (for modal view) */}
          {deliverables && deliverables.length > 0 && (
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
      )}
    </div>
  );
});
