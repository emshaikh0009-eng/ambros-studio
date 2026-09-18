import { useEffect, useState, memo } from 'react';
import { motion } from 'motion/react';

export default memo(function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const target = e.target as HTMLElement | null;

      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: clientX, y: clientY });
          if (!isVisible) setIsVisible(true);

          if (target) {
            const interactive = target.closest(
              'button, a, input, textarea, select, [role="button"], .hover-trigger'
            );
            setIsHovered(!!interactive);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Inner precise dot — purely transform & opacity */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full bg-[#FFFFE3] shadow-[0_0_8px_#FFFFE3]"
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.1,
        }}
      />

      {/* Trailing slate-glow ring — fixed 32px size, scale via transform (NO width/height animation) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 rounded-full border border-[#6d8196]/60 bg-[#6d8196]/10 backdrop-blur-[1px]"
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovered ? 1.75 : 1,
          borderColor: isHovered ? 'rgba(255, 255, 227, 0.8)' : 'rgba(109, 129, 150, 0.5)',
          backgroundColor: isHovered ? 'rgba(109, 129, 150, 0.18)' : 'rgba(109, 129, 150, 0.05)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 250,
          mass: 0.2,
        }}
      />
    </>
  );
});
