import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';
import CaseStudyModal from './CaseStudyModal';

export default function WorkProjectSlider() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 420;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="work-project-slider-section" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[350px] bg-radial from-[#6d8196]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#6d8196]" />
            <span>Selected Case Studies</span>
          </div>
          <h2 className="font-serif-luxury text-4xl md:text-6xl text-[#FFFFE3]">
            Engineered To Convert.
          </h2>
          <p className="font-sans text-[#cbcbcb]/80 text-base md:text-lg mt-2 max-w-xl">
            A glimpse into recent digital transformations delivered across web, performance ads, and smart networking hardware.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll projects left"
            className="w-12 h-12 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d]/80 text-[#cbcbcb] hover:text-[#FFFFE3] hover:shadow-[0_0_20px_rgba(109,129,150,0.4)] flex items-center justify-center transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll projects right"
            className="w-12 h-12 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d]/80 text-[#cbcbcb] hover:text-[#FFFFE3] hover:shadow-[0_0_20px_rgba(109,129,150,0.4)] flex items-center justify-center transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Snap Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CASE_STUDIES.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.01 }}
            onClick={() => setSelectedCaseStudy(study)}
            className="group flex-shrink-0 w-[320px] sm:w-[380px] md:w-[440px] snap-center cursor-pointer rounded-2xl glass-card border border-[#4a4a4a]/50 hover:border-[#6d8196] transition-all duration-500 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            {/* Visual Header Image with 3D depth and subtle zoom */}
            <div className="relative h-64 md:h-72 w-full overflow-hidden bg-[#181a1d]">
              <img
                src={study.image}
                alt={study.altText}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

              {/* Tag Pill */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-[#6d8196]/40 text-[#FFFFE3] font-tech text-xs uppercase tracking-wider">
                  {study.tag}
                </span>
              </div>

              {/* Hover inspect overlay icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#6d8196]/30 backdrop-blur-md border border-[#6d8196]/60 flex items-center justify-center text-[#FFFFE3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
              <div>
                <span className="font-tech text-xs uppercase tracking-widest text-[#6d8196]">
                  {study.category}
                </span>
                <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#FFFFE3] mt-1 group-hover:text-white transition-colors">
                  {study.title}
                </h3>
                <p className="font-sans text-xs text-[#cbcbcb]/70 mt-2 line-clamp-2">
                  {study.brief}
                </p>
              </div>

              {/* Primary Stat Pill + CTA link */}
              <div className="pt-6 mt-6 border-t border-[#4a4a4a]/40 flex items-center justify-between">
                <div>
                  <div className="font-serif-luxury text-2xl text-[#FFFFE3] font-normal leading-none">
                    {study.stats[0].value}
                  </div>
                  <div className="font-tech text-[10px] uppercase tracking-wider text-[#cbcbcb]/60 mt-1">
                    {study.stats[0].label}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 font-tech text-xs uppercase tracking-wider text-[#6d8196] group-hover:text-[#FFFFE3] transition-colors">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
}
