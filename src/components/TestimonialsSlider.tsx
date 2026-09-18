import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/agencyData';

interface TestimonialsSliderProps {
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSlider({
  title = 'Real Founders. Real Scale.',
  subtitle = 'What happens when purpose meets digital precision.',
}: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  return (
    <section
      id="testimonials-slider-section"
      className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background soft ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial from-[#6d8196]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#6d8196]" />
            <span>Client Feedback & Impact</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-6xl text-[#FFFFE3]">
            {title}
          </h2>
          <p className="font-sans text-[#cbcbcb]/80 text-base md:text-lg mt-2 max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Magnetic Prev / Next Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-12 h-12 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d]/80 text-[#cbcbcb] hover:text-[#FFFFE3] hover:shadow-[0_0_20px_rgba(109,129,150,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-12 h-12 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d]/80 text-[#cbcbcb] hover:text-[#FFFFE3] hover:shadow-[0_0_20px_rgba(109,129,150,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Single-View Pop-in Testimonial Card */}
      <div className="relative min-h-[360px] md:min-h-[300px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{
              scale: 0.94,
              opacity: 0,
              y: 16,
              filter: 'blur(10px)',
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                type: 'spring',
                damping: 18,
                stiffness: 140,
                mass: 0.8,
              },
            }}
            exit={{
              scale: 0.96,
              opacity: 0,
              y: -12,
              filter: 'blur(6px)',
              transition: { duration: 0.3 },
            }}
            className="w-full glass-card rounded-2xl p-8 md:p-14 border border-[#4a4a4a]/50 hover:border-[#6d8196]/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
          >
            {/* Top Row: Stars + Metric Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-1.5 text-[#FFFFE3]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FFFFE3] text-[#FFFFE3] drop-shadow-[0_0_6px_rgba(255,255,227,0.4)]"
                  />
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6d8196]/15 border border-[#6d8196]/30 text-[#FFFFE3] font-tech text-xs uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196] animate-pulse" />
                <span>{current.metric}</span>
              </div>
            </div>

            {/* Quote in italic serif with blur-to-focus text typing visual */}
            <div className="relative mb-10">
              <Quote className="absolute -top-5 -left-4 w-10 h-10 text-[#6d8196]/20 pointer-events-none" />
              <motion.p
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-serif-luxury italic text-2xl md:text-3xl lg:text-4xl text-[#FFFFE3] leading-relaxed relative z-10"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.p>
            </div>

            {/* Client Signature & Meta */}
            <div className="flex items-center justify-between pt-6 border-t border-[#4a4a4a]/40 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Initials in Avatar Circle */}
                <div className="w-12 h-12 rounded-full bg-[#181a1d] border border-[#6d8196]/50 flex items-center justify-center font-tech text-sm font-semibold text-[#FFFFE3] shadow-[0_0_15px_rgba(109,129,150,0.3)]">
                  {current.initials}
                </div>
                <div>
                  <h3 className="font-tech text-base font-semibold text-[#FFFFE3]">
                    {current.client}
                  </h3>
                  <p className="font-sans text-xs text-[#cbcbcb]/70">
                    {current.role} · <span className="text-[#6d8196]">{current.company}</span>
                  </p>
                </div>
              </div>

              <div className="font-tech text-xs uppercase tracking-widest text-[#cbcbcb]/50">
                Service: <span className="text-[#cbcbcb]">{current.service}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-8 bg-[#6d8196] shadow-[0_0_10px_#6d8196]'
                : 'w-2 bg-[#4a4a4a] hover:bg-[#cbcbcb]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
