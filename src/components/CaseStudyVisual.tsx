import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2, TrendingUp, Sparkles, MessageCircle } from 'lucide-react';
import { CaseStudy } from '../types';
import { BRAND } from '../data/agencyData';
import CaseStudyVisual from './CaseStudyVisual';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default memo(function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#0e1014] border border-[#4a4a4a] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden my-auto max-h-[90vh] flex flex-col will-change-transform"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-[#4a4a4a]/40 bg-[#0a0a0a]/60 backdrop-blur-sm sticky top-0 z-20">
            <div>
              <span className="font-tech text-xs uppercase tracking-widest text-[#6d8196]">
                {caseStudy.tag} · {caseStudy.year}
              </span>
              <h2 className="font-serif-luxury text-2xl md:text-3xl text-[#FFFFE3]">
                {caseStudy.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-10">
            {/* Visual Header CSS Design with subtle dark gradient, slate-blue radial glow, and grid overlay */}
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-[#4a4a4a]/60 group">
              <CaseStudyVisual
                title={caseStudy.title}
                image={caseStudy.image}
                altText={caseStudy.altText}
                imageAlt={caseStudy.altText}
                width={caseStudy.width}
                height={caseStudy.height}
                eyebrow={caseStudy.tag}
                category={caseStudy.category}
                deliverables={caseStudy.deliverables}
                size="modal"
              />
            </div>

            {/* Performance Stats Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#181a1d]/70 border border-[#4a4a4a]/40 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2 text-[#6d8196] mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-tech text-xs uppercase tracking-wider text-[#cbcbcb]/70">
                      Metric 0{idx + 1}
                    </span>
                  </div>
                  <div className="font-serif-luxury text-3xl md:text-4xl text-[#FFFFE3] font-normal">
                    {stat.value}
                  </div>
                  <div className="font-sans text-xs text-[#cbcbcb]/80 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Editorial 3-Column Narrative: Brief, Approach, Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#4a4a4a]/30">
              <div>
                <h3 className="font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196]" />
                  The Brief
                </h3>
                <p className="font-sans text-sm text-[#cbcbcb] leading-relaxed">
                  {caseStudy.brief}
                </p>
              </div>

              <div>
                <h3 className="font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196]" />
                  The Approach
                </h3>
                <p className="font-sans text-sm text-[#cbcbcb] leading-relaxed">
                  {caseStudy.approach}
                </p>
              </div>

              <div>
                <h3 className="font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFE3]" />
                  The Outcome
                </h3>
                <p className="font-sans text-sm text-[#FFFFE3] leading-relaxed">
                  {caseStudy.outcome}
                </p>
              </div>
            </div>

            {/* Testimonial Quote if available */}
            {caseStudy.testimonial && (
              <div className="p-6 rounded-xl bg-radial from-[#6d8196]/10 to-[#181a1d] border border-[#6d8196]/30">
                <p className="font-serif-luxury italic text-lg md:text-xl text-[#FFFFE3]">
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </p>
                <div className="mt-3 font-tech text-xs text-[#cbcbcb]">
                  — {caseStudy.testimonial.author},{' '}
                  <span className="text-[#6d8196]">{caseStudy.testimonial.role}</span>
                </div>
              </div>
            )}

            {/* Footer Action */}
            <div className="pt-6 border-t border-[#4a4a4a]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-sans text-xs text-[#cbcbcb]/60">
                Ready to achieve similar outcomes for your venture?
              </span>
              <a
                href={`${BRAND.whatsappUrl}?text=${encodeURIComponent(
                  `Hi Anas, I saw the ${caseStudy.title} case study on AmbrosStudio and want to discuss a similar project for my business.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full bg-[#6d8196] text-[#FFFFE3] hover:bg-[#5b6f84] transition-all shadow-[0_0_20px_rgba(109,129,150,0.4)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss A Project Like This</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
