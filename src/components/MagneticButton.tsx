import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'cream';
  isExternal?: boolean;
  id?: string;
}

export default function MagneticButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  isExternal = false,
  id,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate magnetic offset (subtle, max ~12px)
    const deltaX = (clientX - centerX) * 0.22;
    const deltaY = (clientY - centerY) * 0.22;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#6d8196] text-[#FFFFE3] hover:bg-[#5b6f84] hover:shadow-[0_0_24px_rgba(109,129,150,0.5)] border border-[#6d8196]/40';
      case 'cream':
        return 'bg-[#FFFFE3] text-[#0a0a0a] hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,227,0.4)] border border-[#FFFFE3]';
      case 'secondary':
        return 'bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] hover:border-[#6d8196] border border-[#4a4a4a]/60 hover:shadow-[0_0_20px_rgba(109,129,150,0.25)]';
      case 'ghost':
        return 'bg-transparent text-[#cbcbcb] hover:text-[#FFFFE3] border border-transparent hover:border-[#4a4a4a]';
      default:
        return 'bg-[#6d8196] text-[#FFFFE3]';
    }
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
      className={`inline-flex items-center justify-center font-tech text-xs tracking-wider uppercase font-medium rounded-full px-6 py-3 cursor-pointer transition-all duration-300 select-none ${getVariantStyles()} ${className}`}
      id={id}
    >
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent p-0 border-0">
      {content}
    </button>
  );
}
