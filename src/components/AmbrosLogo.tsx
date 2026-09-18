import React from 'react';

interface AmbrosLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'mono';
}

export default function AmbrosLogo({
  size = 'md',
  showTagline = true,
  className = '',
}: AmbrosLogoProps) {
  // Dimensions & typography scaling according to size
  const configs = {
    sm: {
      titleSize: 'text-xl tracking-wider',
      lineHeight: 'h-[1.5px] my-1',
      taglineSize: 'text-[7px] tracking-[0.32em]',
    },
    md: {
      titleSize: 'text-2xl md:text-3xl tracking-widest',
      lineHeight: 'h-[2px] my-1.5',
      taglineSize: 'text-[8.5px] md:text-[9.5px] tracking-[0.35em]',
    },
    lg: {
      titleSize: 'text-4xl md:text-5xl tracking-widest',
      lineHeight: 'h-[2.5px] my-2',
      taglineSize: 'text-xs md:text-sm tracking-[0.38em]',
    },
    xl: {
      titleSize: 'text-6xl sm:text-7xl md:text-8xl tracking-widest',
      lineHeight: 'h-[3px] md:h-[4px] my-3 md:my-4',
      taglineSize: 'text-xs sm:text-sm md:text-base tracking-[0.42em]',
    },
  };

  const config = configs[size];

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      role="img"
      aria-label="AmbrosStudio — Crafted With Purpose"
    >
      {/* AMBROS Wordmark in bold geometric sans display */}
      <div className="w-full flex items-center justify-center">
        <span
          className={`font-tech font-extrabold uppercase text-[#FFFFE3] leading-none ${config.titleSize}`}
          style={{
            letterSpacing: '0.14em',
            textShadow: '0 0 20px rgba(255, 255, 227, 0.25)',
          }}
        >
          AMBROS
        </span>
      </div>

      {/* Signature Electric Blue / Cyan Divider Line matching logo specification */}
      <div
        className={`w-full ${config.lineHeight} bg-[#00a2ff] shadow-[0_0_10px_#00a2ff,0_0_20px_rgba(0,162,255,0.4)] transition-all duration-300`}
      />

      {/* CRAFTED WITH PURPOSE in tracked uppercase */}
      {showTagline && (
        <div className="w-full flex items-center justify-between overflow-hidden">
          <span
            className={`w-full text-center font-tech font-semibold uppercase text-white/90 leading-tight ${config.taglineSize}`}
            style={{
              letterSpacing: size === 'sm' ? '0.3em' : '0.36em',
            }}
          >
            CRAFTED WITH PURPOSE
          </span>
        </div>
      )}
    </div>
  );
}
