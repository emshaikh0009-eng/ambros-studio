import { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle, Layers, TrendingUp, CreditCard, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import ThreeHeroCanvas from '../components/ThreeHeroCanvas';
import WorkProjectSlider from '../components/WorkProjectSlider';
import TestimonialsSlider from '../components/TestimonialsSlider';
import DigitalCardPreview from '../components/DigitalCardPreview';
import MagneticButton from '../components/MagneticButton';
import { BRAND, PARTNERS, SERVICES } from '../data/agencyData';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  canLoad3D?: boolean;
}

export default memo(function HomePage({ onNavigate, canLoad3D = true }: HomePageProps) {
  const [scrollY, setScrollY] = useState(0);

  // Throttled scroll listener via requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'web-development':
        return <Layers className="w-5 h-5 text-[#6d8196]" />;
      case 'digital-ads':
        return <TrendingUp className="w-5 h-5 text-[#FFFFE3]" />;
      case 'digital-visiting-cards':
        return <CreditCard className="w-5 h-5 text-[#6d8196]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#6d8196]" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#cbcbcb] overflow-hidden">
      {/* ========================================================================= */}
      {/* SECTION 1 — 3D HERO (LAZY MOUNTED POST-INTRO & IDLE) */}
      {/* ========================================================================= */}
      <section
        id="hero-3d-section"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden"
      >
        {/* Three.js Canvas Scene: Lazy mounted and paused out of viewport */}
        <ThreeHeroCanvas scrollY={scrollY} canStart={canLoad3D} />

        {/* Ambient Radial Vignette & CSS Grain (Zero 3D post-processing) */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60 pointer-events-none" />

        {/* Floating UI Chips in the corners */}
        <div className="hidden lg:block absolute top-32 left-12 z-20 pointer-events-auto">
          <div className="px-4 py-2 rounded-full glass-panel border border-[#6d8196]/30 text-xs font-tech text-[#FFFFE3] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6d8196] animate-pulse" />
            <span>Research → Wireframe → Production</span>
          </div>
        </div>

        <div className="hidden lg:block absolute top-36 right-12 z-20 pointer-events-auto">
          <div className="px-4 py-2 rounded-full glass-panel border border-[#6d8196]/30 text-xs font-tech text-[#cbcbcb] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
            <span className="text-[#FFFFE3]">8K Display Precision</span>
            <span className="text-[10px] text-[#6d8196]">Capped DPR 1.5</span>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-24 left-16 z-20 pointer-events-auto">
          <div className="px-4 py-2.5 rounded-xl glass-panel border border-[#4a4a4a]/60 text-xs font-tech shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="text-[10px] uppercase text-[#6d8196] block font-mono">
              ENGINEERING NOTE
            </span>
            <span className="text-[#FFFFE3]">No Bloat. No Templates.</span>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-24 right-16 z-20 pointer-events-auto">
          <div className="px-4 py-2.5 rounded-xl glass-panel border border-[#6d8196]/40 text-xs font-tech shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#6d8196]/20 flex items-center justify-center text-[#FFFFE3]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[#FFFFE3] font-semibold text-sm">3.4× Avg. ROAS</div>
              <div className="text-[10px] text-[#cbcbcb]/70 uppercase">Meta Ads Scaling</div>
            </div>
          </div>
        </div>

        {/* Central Hero Typography & CTAs */}
        <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel border border-[#00a2ff]/40 mb-6 shadow-[0_0_20px_rgba(0,162,255,0.18)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#00a2ff] shadow-[0_0_8px_#00a2ff] animate-pulse" />
            <span className="font-tech text-xs md:text-sm uppercase tracking-[0.28em] text-[#FFFFE3] font-bold">
              AMBROSSTUDIO
            </span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-luxury text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFFFE3] leading-[0.95] tracking-tight text-glow-cream max-w-4xl"
          >
            Crafted With Purpose.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-sans text-lg sm:text-xl md:text-2xl text-[#cbcbcb] max-w-2xl mt-6 leading-relaxed"
          >
            We design, build, and grow digital experiences for businesses ready to scale.
          </motion.p>

          {/* Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
          >
            <MagneticButton
              href={BRAND.whatsappUrl}
              isExternal
              variant="primary"
              className="w-full sm:w-auto px-8 py-4 text-sm"
              id="hero-start-project-cta"
            >
              <MessageCircle className="w-4 h-4 text-[#FFFFE3]" />
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              onClick={() => {
                onNavigate('work');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant="secondary"
              className="w-full sm:w-auto px-8 py-4 text-sm"
              id="hero-see-work-cta"
            >
              <span>See Our Work</span>
            </MagneticButton>
          </motion.div>

          {/* Founder Signature Footnote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 flex items-center gap-3 font-tech text-xs text-[#cbcbcb]/60"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196]" />
            <span>Led by Anas Shaikh + 5 Specialized Creatives</span>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRUST BAR — STRATEGIC ALLIES & PARTNERS (Optimized off-screen rendering) */}
      {/* ========================================================================= */}
      <section
        id="partners-trust-bar"
        className="section-content-visibility py-12 border-y border-[#4a4a4a]/40 bg-[#0a0a0a]/90 backdrop-blur-md relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#6d8196]" />
            <span className="font-tech text-xs uppercase tracking-widest text-[#cbcbcb]/60">
              Trusted Collaboration Partners
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 md:gap-12 w-full">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="group flex flex-col items-center md:items-start transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-tech text-sm md:text-base font-semibold text-[#FFFFE3] group-hover:text-white transition-colors">
                    {partner.name}
                  </span>
                  <span className="font-tech text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#6d8196]/20 text-[#6d8196] border border-[#6d8196]/30">
                    {partner.badge}
                  </span>
                </div>
                <span className="font-sans text-[11px] text-[#cbcbcb]/60 mt-0.5">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MISSION CALLOUT */}
      {/* ========================================================================= */}
      <section className="section-content-visibility py-24 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <span className="font-tech text-xs uppercase tracking-widest text-[#6d8196] block mb-4">
          Why Ambros Exists
        </span>
        <blockquote className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FFFFE3] leading-snug">
          &ldquo;{BRAND.mission}&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3 font-tech text-xs text-[#cbcbcb]/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196]" />
          <span>Anas Shaikh — Founder & CEO</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICES PREVIEW — 3 CARDS */}
      {/* ========================================================================= */}
      <section id="services-preview-section" className="section-content-visibility py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#6d8196]" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="font-serif-luxury text-4xl md:text-6xl text-[#FFFFE3]">
              What We Do Best.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-[#6d8196] hover:text-[#FFFFE3] transition-colors"
          >
            <span>Explore All 3 Deep Services</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glass-card rounded-2xl p-8 md:p-10 border border-[#4a4a4a]/50 hover:border-[#6d8196] flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#181a1d] border border-[#4a4a4a] flex items-center justify-center group-hover:border-[#6d8196] transition-colors">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="font-serif-luxury text-3xl text-[#cbcbcb]/40 group-hover:text-[#6d8196] transition-colors">
                    {service.number}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#FFFFE3] group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="font-tech text-xs text-[#6d8196] mt-2 mb-4 uppercase tracking-wider">
                  {service.tagline}
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#cbcbcb]/80 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8 font-sans text-xs text-[#cbcbcb]">
                  {service.deliverables.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6d8196] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[#4a4a4a]/40 flex items-center justify-between">
                <span className="font-tech text-xs text-[#FFFFE3]">
                  {service.metrics[0].value}{' '}
                  <span className="text-[#cbcbcb]/60 text-[11px] font-normal">
                    {service.metrics[0].label}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 font-tech text-xs uppercase tracking-wider text-[#6d8196] group-hover:text-[#FFFFE3] transition-colors">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* WORK / PROJECT HORIZONTAL SLIDER */}
      {/* ========================================================================= */}
      <div className="section-content-visibility">
        <WorkProjectSlider />
      </div>

      {/* ========================================================================= */}
      {/* DIGITAL VISITING CARDS INTERACTIVE 3D SIMULATOR */}
      {/* ========================================================================= */}
      <section className="section-content-visibility py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <DigitalCardPreview />
      </section>

      {/* ========================================================================= */}
      {/* TESTIMONIALS SLIDER */}
      {/* ========================================================================= */}
      <div className="section-content-visibility">
        <TestimonialsSlider />
      </div>

      {/* ========================================================================= */}
      {/* BIG FINAL CTA SECTION */}
      {/* ========================================================================= */}
      <section
        id="home-big-cta"
        className="section-content-visibility py-28 px-6 md:px-12 relative overflow-hidden text-center bg-gradient-to-b from-[#0a0a0a] via-[#101317] to-[#0a0a0a] border-t border-[#4a4a4a]/40"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-[#6d8196]/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="font-tech text-xs uppercase tracking-widest text-[#6d8196] block mb-4">
            Direct Founder Access
          </span>
          <h2 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFFE3] leading-[0.98]">
            Ready to Build With Purpose?
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#cbcbcb] max-w-xl mx-auto mt-6 leading-relaxed">
            Skip the middle managers and bureaucratic wait times. Connect directly with Anas Shaikh to map out your digital roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <MagneticButton
              href={BRAND.whatsappUrl}
              isExternal
              variant="primary"
              className="px-8 py-4 text-sm"
              id="cta-whatsapp-primary"
            >
              <MessageCircle className="w-4 h-4 text-[#FFFFE3]" />
              <span>Start On WhatsApp ({BRAND.phone})</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant="secondary"
              className="px-8 py-4 text-sm"
            >
              <span>Submit Project Brief</span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
});
