import { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle, Layers, TrendingUp, CreditCard, Sparkles, ShieldCheck, Compass, Palette, Rocket } from 'lucide-react';
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

  // Concise 1-line descriptions for service cards (Short. Human. Confident. No filler words.)
  const serviceSummaries: Record<string, string> = {
    'web-development': 'Bespoke, high-speed websites engineered to captivate visitors and convert them into clients.',
    'digital-ads': 'Targeted Meta campaigns built for qualified, high-ticket leads and measurable ROAS.',
    'digital-visiting-cards': 'Tap-to-connect NFC smart cards that instantly save your contact details to any phone.',
  };

  // 3 steps (Discover → Design → Deliver). One line each.
  const processSteps = [
    {
      step: '01',
      title: 'Discover',
      line: 'We analyze your business, audience, and market to define a clear growth roadmap.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Design',
      line: 'We build custom, high-converting interfaces and ad creatives tailored to your brand.',
      icon: Palette,
    },
    {
      step: '03',
      title: 'Deliver',
      line: 'We launch fast, test rigorously, and ensure flawless performance from day one.',
      icon: Rocket,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#cbcbcb] overflow-hidden w-full max-w-full">
      {/* ========================================================================= */}
      {/* SECTION 1 — 3D HERO (LAZY MOUNTED POST-INTRO & IDLE) */}
      {/* ========================================================================= */}
      <section
        id="hero-3d-section"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 md:px-12 overflow-hidden w-full max-w-full"
      >
        {/* Three.js Canvas Scene: Lazy mounted and paused out of viewport */}
        <ThreeHeroCanvas scrollY={scrollY} canStart={canLoad3D} />

        {/* Ambient Radial Vignette & CSS Grain (Zero 3D post-processing) */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60 pointer-events-none" />

        {/* Floating UI Chips in the corners — Desktop only */}
        <div className="hidden lg:block absolute top-32 left-12 z-20 pointer-events-auto">
          <div className="px-4 py-2 rounded-full glass-panel border border-[#6d8196]/30 text-xs text-[#FFFFE3] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6d8196] animate-pulse" />
            <span>Research → Wireframe → Production</span>
          </div>
        </div>

        <div className="hidden lg:block absolute top-36 right-12 z-20 pointer-events-auto">
          <div className="px-4 py-2 rounded-full glass-panel border border-[#6d8196]/30 text-xs text-[#cbcbcb] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
            <span className="text-[#FFFFE3]">8K Display Precision</span>
            <span className="text-[10px] text-[#6d8196]">Capped DPR 1.5</span>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-24 left-16 z-20 pointer-events-auto">
          <div className="px-4 py-2.5 rounded-xl glass-panel border border-[#4a4a4a]/60 text-xs shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="text-[10px] uppercase text-[#6d8196] block font-mono">
              ENGINEERING NOTE
            </span>
            <span className="text-[#FFFFE3]">No Bloat. No Templates.</span>
          </div>
        </div>

        <div className="hidden lg:block absolute bottom-24 right-16 z-20 pointer-events-auto">
          <div className="px-4 py-2.5 rounded-xl glass-panel border border-[#6d8196]/40 text-xs shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-3">
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
        <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center w-full px-2 sm:px-0">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full glass-panel border border-[#00a2ff]/40 mb-6 shadow-[0_0_20px_rgba(0,162,255,0.18)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#00a2ff] shadow-[0_0_8px_#00a2ff] animate-pulse" />
            <span className="text-xs md:text-sm uppercase tracking-[0.28em] text-[#FFFFE3] font-bold">
              AMBROSSTUDIO
            </span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hero-headline font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFFFE3] leading-[0.95] tracking-tight text-glow-cream max-w-4xl break-words"
          >
            Crafted With Purpose.
          </motion.h1>

          {/* Sub-headline: 1-2 lines max */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base sm:text-xl md:text-2xl text-[#cbcbcb] max-w-2xl mt-5 sm:mt-6 leading-relaxed px-2 font-normal"
          >
            We design, build, and grow digital experiences for businesses ready to scale.
          </motion.p>

          {/* Two CTAs — Full width on mobile (<640px / 375px), auto width on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto max-w-sm sm:max-w-none"
          >
            <div className="btn-mobile-full w-full sm:w-auto">
              <MagneticButton
                href={BRAND.whatsappUrl}
                isExternal
                variant="primary"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold"
                id="hero-start-project-cta"
              >
                <MessageCircle className="w-4 h-4 text-[#FFFFE3]" />
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            <div className="btn-mobile-full w-full sm:w-auto">
              <MagneticButton
                onClick={() => {
                  onNavigate('work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                variant="secondary"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold"
                id="hero-see-work-cta"
              >
                <span>See Our Work</span>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Founder Signature Footnote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 sm:mt-12 flex items-center gap-3 text-xs text-[#cbcbcb]/60 font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196]" />
            <span>Led by Anas Shaikh + 5 Specialized Creatives</span>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* IMPACT STATEMENT (No "How We Help" label — 2 lines max) */}
      {/* ========================================================================= */}
      <section
        id="statement-section"
        className="section-content-visibility py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-5xl mx-auto text-center relative z-10 overflow-hidden"
      >
        <blockquote className="section-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFFFE3] font-medium leading-snug max-w-4xl mx-auto">
          We build the digital foundation your business needs to scale — high-converting websites, profitable ad funnels, and smart digital identity.
        </blockquote>
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 text-xs text-[#cbcbcb]/70 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196]" />
          <span>Anas Shaikh — Founder & CEO</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CORE OFFERING CARDS (No "What We Do" heading — 3 cards, 1 line each) */}
      {/* ========================================================================= */}
      <section
        id="services-preview-section"
        className="section-content-visibility py-12 md:py-16 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden"
      >
        <div className="flex justify-end mb-8">
          <button
            type="button"
            onClick={() => {
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#6d8196] hover:text-[#FFFFE3] transition-colors"
          >
            <span>Explore All 3 Deep Services</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive grid: 1 col on mobile (375px), 2 cols on tablet (768px), 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => {
            const isLast = index === SERVICES.length - 1;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`glass-card rounded-2xl p-6 sm:p-8 md:p-10 border border-[#4a4a4a]/50 hover:border-[#6d8196] flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#181a1d] border border-[#4a4a4a] flex items-center justify-center group-hover:border-[#6d8196] transition-colors">
                      {getServiceIcon(service.id)}
                    </div>
                    <span className="font-bold text-3xl text-[#cbcbcb]/40 group-hover:text-[#6d8196] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="font-bold text-2xl md:text-3xl text-[#FFFFE3] group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#6d8196] mt-2 mb-3 uppercase tracking-wider font-semibold">
                    {service.tagline}
                  </p>
                  {/* One line description per card — Short. Human. Confident. */}
                  <p className="text-xs sm:text-sm text-[#cbcbcb]/80 leading-relaxed mb-6 font-normal">
                    {serviceSummaries[service.id] || service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#4a4a4a]/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#FFFFE3]">
                    {service.metrics[0].value}{' '}
                    <span className="text-[#cbcbcb]/60 text-[11px] font-normal">
                      {service.metrics[0].label}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#6d8196] group-hover:text-[#FFFFE3] transition-colors">
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRUST BAR — STRATEGIC ALLIES & PARTNERS (Moved BELOW What We Do cards) */}
      {/* ========================================================================= */}
      <section
        id="partners-trust-bar"
        className="section-content-visibility py-10 md:py-12 my-6 border-y border-[#4a4a4a]/40 bg-[#0a0a0a]/90 backdrop-blur-md relative z-10 overflow-hidden w-full max-w-full"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-3 flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#6d8196]" />
            <span className="text-xs uppercase tracking-widest text-[#cbcbcb]/60 font-medium">
              Trusted Collaboration Partners
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 md:gap-12 w-full">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="group flex flex-col items-center md:items-start transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base font-semibold text-[#FFFFE3] group-hover:text-white transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#6d8196]/20 text-[#6d8196] border border-[#6d8196]/30 font-medium">
                    {partner.badge}
                  </span>
                </div>
                <span className="text-[11px] text-[#cbcbcb]/60 mt-0.5 font-normal">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DISCOVER → DESIGN → DELIVER (No "How We Do It" heading — 3 steps, 1 line each) */}
      {/* ========================================================================= */}
      <section
        id="process-steps-section"
        className="section-content-visibility py-12 md:py-16 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden"
      >
        {/* Responsive grid: 1 col on mobile (375px), 2 cols on tablet (768px), 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === processSteps.length - 1;
            return (
              <motion.div
                key={step.step}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className={`glass-card rounded-2xl p-6 sm:p-8 md:p-10 border border-[#4a4a4a]/50 hover:border-[#6d8196] flex flex-col justify-between transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#181a1d] border border-[#4a4a4a] flex items-center justify-center group-hover:border-[#6d8196] transition-colors">
                      <Icon className="w-5 h-5 text-[#6d8196]" />
                    </div>
                    <span className="font-bold text-3xl text-[#cbcbcb]/40 group-hover:text-[#6d8196] transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-2xl md:text-3xl text-[#FFFFE3] group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-[#6d8196]/50 my-3" />
                  {/* One line per step — Short. Human. Confident. */}
                  <p className="text-xs sm:text-sm text-[#cbcbcb]/80 leading-relaxed font-normal">
                    {step.line}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#4a4a4a]/40 flex items-center justify-between text-xs text-[#6d8196]">
                  <span className="uppercase tracking-wider text-[11px] text-[#cbcbcb]/60 font-medium">Step {step.step} of 03</span>
                  <span className="text-[#FFFFE3] font-semibold">Active Sprint</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* WORK / PROJECT HORIZONTAL SLIDER (UNCHANGED) */}
      {/* ========================================================================= */}
      <div className="section-content-visibility overflow-hidden w-full max-w-full">
        <WorkProjectSlider />
      </div>

      {/* ========================================================================= */}
      {/* DIGITAL VISITING CARDS INTERACTIVE 3D SIMULATOR (UNCHANGED) */}
      {/* ========================================================================= */}
      <section className="section-content-visibility py-16 md:py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden">
        <DigitalCardPreview />
      </section>

      {/* ========================================================================= */}
      {/* TESTIMONIALS SLIDER (UNCHANGED) */}
      {/* ========================================================================= */}
      <div className="section-content-visibility overflow-hidden w-full max-w-full">
        <TestimonialsSlider />
      </div>

      {/* ========================================================================= */}
      {/* BIG FINAL CTA SECTION — ONE LINE + WHATSAPP BUTTON */}
      {/* ========================================================================= */}
      <section
        id="home-big-cta"
        className="section-content-visibility py-20 md:py-28 px-5 sm:px-8 md:px-12 relative overflow-hidden text-center bg-gradient-to-b from-[#0a0a0a] via-[#101317] to-[#0a0a0a] border-t border-[#4a4a4a]/40 w-full max-w-full"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[350px] bg-radial from-[#6d8196]/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-2">
          <span className="text-xs uppercase tracking-widest text-[#6d8196] block mb-4 font-semibold">
            Direct Founder Access
          </span>
          <h2 className="section-headline font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFFE3] leading-[0.98]">
            Ready to Build With Purpose?
          </h2>
          {/* One line subline */}
          <p className="text-sm sm:text-base md:text-lg text-[#cbcbcb] max-w-xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal">
            Connect directly with Anas Shaikh to map out your digital roadmap and launch.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8 sm:mt-10 w-full max-w-sm sm:max-w-none mx-auto">
            <div className="btn-mobile-full w-full sm:w-auto">
              <MagneticButton
                href={BRAND.whatsappUrl}
                isExternal
                variant="primary"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold"
                id="cta-whatsapp-primary"
              >
                <MessageCircle className="w-4 h-4 text-[#FFFFE3]" />
                <span>Start on WhatsApp ({BRAND.phone})</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            <div className="btn-mobile-full w-full sm:w-auto">
              <MagneticButton
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                variant="secondary"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold"
              >
                <span>Submit Project Brief</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
