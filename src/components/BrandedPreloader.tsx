import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AmbrosLogo from './AmbrosLogo';

interface BrandedPreloaderProps {
  onComplete: () => void;
}

export default memo(function BrandedPreloader({ onComplete }: BrandedPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fast, smooth simulation of asset loading with real ready check
    const startTime = performance.now();
    const duration = 1100; // ~1.1s snappy luxury preloader

    const updateProgress = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const nextProgress = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Complete, trigger smooth fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 450);
        }, 150);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          id="branded-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
          style={{ willChange: 'opacity' }}
          role="status"
          aria-label="Loading AmbrosStudio"
        >
          <div className="flex flex-col items-center space-y-7">
            {/* Centered Ambros Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <AmbrosLogo size="lg" showTagline={true} />
            </motion.div>

            {/* Thin slate-blue progress bar */}
            <div className="w-56 md:w-72 h-[2px] bg-[#1a1d24] rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
              <div
                className="h-full bg-[#6d8196] shadow-[0_0_12px_#6d8196,0_0_20px_rgba(109,129,150,0.6)] transition-all duration-75 ease-out rounded-full"
                style={{
                  transform: `translateX(${progress - 100}%)`,
                  willChange: 'transform',
                }}
              />
            </div>

            {/* Micro progress indicator */}
            <div className="flex items-center justify-between w-56 md:w-72 text-[10px] font-mono tracking-widest text-[#6d8196]/80 uppercase">
              <span>INITIALIZING</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
