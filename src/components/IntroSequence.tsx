import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroSequenceProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export default function IntroSequence({ onComplete, forceShow = false }: IntroSequenceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const letters = 'AMBROS'.split('');

  useEffect(() => {
    // Check session storage
    if (!forceShow) {
      const hasSeen = sessionStorage.getItem('ambros_intro_seen');
      if (hasSeen === 'true') {
        setIsVisible(false);
        onComplete();
        return;
      }
    }

    // Auto complete after ~2.6s
    const timer = setTimeout(() => {
      handleFinish();
    }, 2800);

    return () => clearTimeout(timer);
  }, [forceShow, onComplete]);

  const handleFinish = () => {
    sessionStorage.setItem('ambros_intro_seen', 'true');
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 600); // Allow fade-out animation to complete
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="intro-sequence-overlay"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden select-none cursor-pointer"
          onClick={handleFinish}
        >
          {/* Subtle noise grain texture */}
          <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

          {/* Radial glow that pulses behind the logo once */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.45, 0.2],
              scale: [0.6, 1.3, 1.1],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.55, 1],
              ease: 'easeOut',
            }}
            className="absolute w-[440px] h-[440px] rounded-full bg-radial from-[#6d8196]/35 via-[#FFFFE3]/10 to-transparent blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* AMBROS letter-by-letter reveal (~60ms stagger) */}
            <div className="flex items-center overflow-hidden">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.65,
                    delay: 0.25 + index * 0.065,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-tech font-black text-6xl md:text-8xl lg:text-9xl text-[#FFFFE3] tracking-[0.14em] leading-none select-none drop-shadow-[0_0_35px_rgba(255,255,227,0.3)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Signature Electric Blue / Cyan line draws itself left to right beneath */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ originX: 0 }}
              className="w-full h-[3px] md:h-[4px] mt-4 mb-3 bg-[#00a2ff] shadow-[0_0_15px_#00a2ff,0_0_30px_rgba(0,162,255,0.5)]"
            />

            {/* CRAFTED WITH PURPOSE with wide letter-spacing */}
            <motion.div
              initial={{ opacity: 0, y: 12, letterSpacing: '0.25em' }}
              animate={{ opacity: 0.95, y: 0, letterSpacing: '0.38em' }}
              transition={{
                duration: 0.9,
                delay: 1.05,
                ease: 'easeOut',
              }}
              className="font-tech text-xs md:text-sm lg:text-base font-bold uppercase text-white/95 text-center pl-1"
            >
              CRAFTED WITH PURPOSE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
