import { memo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, MessageCircle, Layers, TrendingUp, CreditCard, Sparkles, ShieldAlert } from 'lucide-react';
import { SERVICES, BRAND } from '../data/agencyData';
import DigitalCardPreview from '../components/DigitalCardPreview';
import MagneticButton from '../components/MagneticButton';
import { PageId } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export default memo(function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#cbcbcb] pt-32 pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/4 w-[700px] h-[350px] bg-radial from-[#6d8196]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#6d8196]" />
          <span>Disciplines & Capabilities</span>
        </div>
        <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFFE3] leading-[0.98] max-w-4xl">
          Three Focused Offerings. Zero Fluff.
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#cbcbcb] max-w-2xl mt-6 leading-relaxed">
          We don’t do 50 mediocre things. We do three critical things with surgical execution: custom digital flagships, high-ROAS Meta advertising funnels, and executive smart visiting cards.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* THREE DEEP SERVICE SECTIONS */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 relative z-10">
        {SERVICES.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <motion.section
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 border border-[#4a4a4a]/50 relative overflow-hidden"
            >
              {/* Subtle accent glow */}
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ backgroundColor: service.accent }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Col: Big Number + Headline + Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif-luxury text-6xl md:text-8xl text-[#6d8196]/40 leading-none">
                      {service.number}
                    </span>
                    <span className="font-tech text-xs uppercase tracking-widest text-[#6d8196]">
                      Core Capability 0{index + 1}
                    </span>
                  </div>

                  <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FFFFE3]">
                    {service.title}
                  </h2>

                  <p className="font-serif-luxury italic text-xl md:text-2xl text-[#FFFFE3]/90">
                    &ldquo;{service.tagline}&rdquo;
                  </p>

                  <p className="font-sans text-sm sm:text-base text-[#cbcbcb] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Quantitative Benchmarks: No overlap, min-width 0, wrapped labels, 22px values on mobile */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#4a4a4a]/30">
                    {service.metrics.map((m, idx) => (
                      <div key={idx} className="min-w-0" style={{ minWidth: 0 }}>
                        <div className="font-serif-luxury text-[22px] sm:text-3xl text-[#FFFFE3] leading-none">
                          {m.value}
                        </div>
                        <div className="font-tech text-[10px] uppercase text-[#cbcbcb]/60 tracking-wider mt-1 break-words whitespace-normal leading-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mini CTA linking to WhatsApp with prefilled service name */}
                  <div className="pt-4">
                    <a
                      href={`${BRAND.whatsappUrl}?text=${encodeURIComponent(
                        `Hi Anas, I would like to discuss ${service.title} for my business.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full bg-[#6d8196] text-[#FFFFE3] hover:bg-[#5b6f84] transition-all shadow-[0_0_20px_rgba(109,129,150,0.4)]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Start {service.title.split(' ')[0]} Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Col: Deliverables Checklist */}
                <div className="lg:col-span-5 bg-[#181a1d]/80 rounded-2xl p-6 sm:p-8 border border-[#4a4a4a]/50">
                  <div className="font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-6 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Included Deliverables</span>
                  </div>

                  <ul className="space-y-4">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#6d8196] flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-xs sm:text-sm text-[#cbcbcb]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-[#4a4a4a]/40 font-tech text-[11px] text-[#cbcbcb]/60 flex items-center justify-between">
                    <span>Guaranteed SLA & Hand-off</span>
                    <span className="text-[#FFFFE3]">100% Code Ownership</span>
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Interactive Digital Visiting Card Showcase */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24 relative z-10">
        <DigitalCardPreview />
      </section>

      {/* Mini Conversion Banner */}
      <section className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <h3 className="font-serif-luxury text-3xl md:text-4xl text-[#FFFFE3]">
          Unsure which service matches your current growth stage?
        </h3>
        <p className="font-sans text-sm text-[#cbcbcb] mt-2 mb-6">
          Schedule a straightforward 15-minute roadmap audit with Anas Shaikh.
        </p>
        <MagneticButton
          href={BRAND.whatsappUrl}
          isExternal
          variant="cream"
          className="px-8 py-4 text-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask Anas on WhatsApp</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </MagneticButton>
      </section>
    </div>
  );
});
