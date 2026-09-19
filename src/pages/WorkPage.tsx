import { useState, memo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Eye, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy, PageId } from '../types';
import CaseStudyModal from '../components/CaseStudyModal';
import CaseStudyVisual from '../components/CaseStudyVisual';
import MagneticButton from '../components/MagneticButton';
import { BRAND } from '../data/agencyData';

interface WorkPageProps {
  onNavigate: (page: PageId) => void;
}

export default memo(function WorkPage({ onNavigate }: WorkPageProps) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'ads' | 'cards'>('all');

  const filteredStudies = CASE_STUDIES.filter((study) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return study.tag.toLowerCase().includes('web');
    if (activeFilter === 'ads') return study.tag.toLowerCase().includes('ads');
    if (activeFilter === 'cards') return study.tag.toLowerCase().includes('cards');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#cbcbcb] pt-32 pb-24 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-24 left-1/3 w-[700px] h-[350px] bg-radial from-[#6d8196]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#6d8196]" />
          <span>Selected Case Studies</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFFE3] leading-[0.98]">
              Proof in Production.
            </h1>
            <p className="font-sans text-lg md:text-xl text-[#cbcbcb] max-w-2xl mt-6 leading-relaxed">
              Every project is an engineered synthesis of visual prestige and measurable ROI. Click any case study to review the complete brief, approach, and verified outcomes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#181a1d] border border-[#4a4a4a]/50">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full font-tech text-xs uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#6d8196] text-[#FFFFE3] shadow-[0_0_12px_rgba(109,129,150,0.5)]'
                  : 'text-[#cbcbcb] hover:text-[#FFFFE3]'
              }`}
            >
              All Projects
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('web')}
              className={`px-4 py-2 rounded-full font-tech text-xs uppercase tracking-wider transition-all ${
                activeFilter === 'web'
                  ? 'bg-[#6d8196] text-[#FFFFE3] shadow-[0_0_12px_rgba(109,129,150,0.5)]'
                  : 'text-[#cbcbcb] hover:text-[#FFFFE3]'
              }`}
            >
              Web Flagships
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ads')}
              className={`px-4 py-2 rounded-full font-tech text-xs uppercase tracking-wider transition-all ${
                activeFilter === 'ads'
                  ? 'bg-[#6d8196] text-[#FFFFE3] shadow-[0_0_12px_rgba(109,129,150,0.5)]'
                  : 'text-[#cbcbcb] hover:text-[#FFFFE3]'
              }`}
            >
              Meta Ads
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('cards')}
              className={`px-4 py-2 rounded-full font-tech text-xs uppercase tracking-wider transition-all ${
                activeFilter === 'cards'
                  ? 'bg-[#6d8196] text-[#FFFFE3] shadow-[0_0_12px_rgba(109,129,150,0.5)]'
                  : 'text-[#cbcbcb] hover:text-[#FFFFE3]'
              }`}
            >
              Digital Cards
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies 2x2 Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {filteredStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCaseStudy(study)}
              className="group glass-card rounded-2xl border border-[#4a4a4a]/50 hover:border-[#6d8196] overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.7)]"
            >
              {/* Pure CSS Visual with dark gradient, slate-blue radial glow, and grid overlay */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#181a1d]">
                <CaseStudyVisual
                  title={study.title}
                  image={study.image}
                  altText={study.altText}
                  imageAlt={study.altText}
                  width={study.width}
                  height={study.height}
                  eyebrow={`CASE STUDY 0${index + 1}`}
                  tag={study.tag}
                  category={study.category}
                />

                <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-[#6d8196]/30 backdrop-blur-md border border-[#6d8196]/60 flex items-center justify-center text-[#FFFFE3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Card Meta & Verified Statistics */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <p className="font-sans text-xs sm:text-sm text-[#cbcbcb]/80 leading-relaxed mb-6">
                  {study.brief}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#4a4a4a]/40 mb-6">
                  <div>
                    <div className="font-serif-luxury text-3xl text-[#FFFFE3]">
                      {study.stats[0].value}
                    </div>
                    <div className="font-tech text-[10px] text-[#cbcbcb]/60 uppercase tracking-wider">
                      {study.stats[0].label}
                    </div>
                  </div>
                  <div>
                    <div className="font-serif-luxury text-3xl text-[#FFFFE3]">
                      {study.stats[1].value}
                    </div>
                    <div className="font-tech text-[10px] text-[#cbcbcb]/60 uppercase tracking-wider">
                      {study.stats[1].label}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {study.deliverables.slice(0, 2).map((d, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#181a1d] text-[11px] text-[#cbcbcb]/70 border border-[#4a4a4a]/40"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 font-tech text-xs uppercase tracking-wider text-[#6d8196] group-hover:text-[#FFFFE3] transition-colors">
                    <span>Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Bottom Conversion CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-28 text-center">
        <h3 className="font-serif-luxury text-4xl md:text-5xl text-[#FFFFE3]">
          Want your venture featured in our next case study?
        </h3>
        <p className="font-sans text-sm sm:text-base text-[#cbcbcb] mt-3 mb-8">
          Every partnership starts with a candid conversation with founder Anas Shaikh.
        </p>
        <MagneticButton
          href={BRAND.whatsappUrl}
          isExternal
          variant="primary"
          className="px-8 py-4 text-xs"
        >
          <span>Connect On WhatsApp (+91 9998441519)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </MagneticButton>
      </section>
    </div>
  );
});
