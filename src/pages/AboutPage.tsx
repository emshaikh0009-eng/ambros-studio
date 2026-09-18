import { memo } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Instagram, Facebook, Twitter, ShieldCheck, Users } from 'lucide-react';
import { BRAND, FOUNDER_IMAGE, PARTNERS, TEAM_SPECIALISTS } from '../data/agencyData';
import TestimonialsSlider from '../components/TestimonialsSlider';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export default memo(function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#cbcbcb] pt-32 pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-[#6d8196]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#6d8196]" />
          <span>The Ambros Philosophy</span>
        </div>
        <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFFE3] leading-[0.98] max-w-5xl">
          Built to Solve. Crafted to Scale.
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#cbcbcb] max-w-3xl mt-6 leading-relaxed">
          We reject the bloated agency machine. No junior account managers, no generic template libraries, and no vanity metrics. Just five seasoned craftspeople and one founder dedicated to building digital flagships that create real enterprise value.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* FOUNDER SECTION — ANAS SHAIKH (FOUNDER & CEO) */}
      {/* ========================================================================= */}
      <section id="founder-section" className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Founder Photo Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            {/* Subtle slate-blue border glow and soft grain overlay */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#6d8196]/40 via-[#4a4a4a]/20 to-[#FFFFE3]/20 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-2xl overflow-hidden border border-[#6d8196]/40 bg-[#181a1d] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {/* Photo — WebP, 800w, <200KB, lazy loading & async decoding */}
              <img
                src={FOUNDER_IMAGE}
                alt="Anas Shaikh — Founder & CEO of AmbrosStudio"
                width={800}
                height={1071}
                loading="lazy"
                decoding="async"
                className="w-full h-[520px] object-cover object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Soft grain overlay */}
              <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

              {/* Gradient Vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90" />

              {/* Founder Title Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="font-tech text-xl font-bold text-[#FFFFE3]">
                    {BRAND.founder}
                  </h3>
                  <p className="font-serif-luxury text-sm text-[#6d8196] italic">
                    {BRAND.founderRole}
                  </p>
                </div>
                <div className="font-tech text-[10px] uppercase tracking-widest text-[#cbcbcb]/70 px-3 py-1 rounded-full bg-[#0a0a0a]/80 border border-[#4a4a4a]">
                  EXECUTIVE LEAD
                </div>
              </div>
            </div>
          </motion.div>

          {/* Founder Bio & Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6d8196]" />
              <span>A Letter From Our Founder</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FFFFE3] leading-tight">
              &ldquo;Ambition Deserves a Proper Foundation.&rdquo;
            </h2>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#cbcbcb]/90 leading-relaxed">
              <p>
                I started Ambros because I kept meeting brilliant business owners who were invisible online. Not because they lacked ambition — but because no one had built them the right digital foundation.
              </p>
              <p>
                I assembled a dedicated team of five specialists who do exactly that: design, develop, advertise, and grow. We operate as a high-velocity studio where code quality, visual prestige, and conversion psychology intersect.
              </p>
              <p>
                Every project we take on is crafted with purpose — because your business deserves nothing less than enduring excellence.
              </p>
            </div>

            {/* Social handles & Direct WhatsApp */}
            <div className="pt-6 border-t border-[#4a4a4a]/40 flex flex-wrap items-center gap-4">
              <span className="font-tech text-xs uppercase text-[#cbcbcb]/60">
                Connect Directly:
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#6d8196] text-[#FFFFE3] hover:bg-[#5b6f84] font-tech text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(109,129,150,0.4)]"
                  id="talk-to-anas-cta"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Talk to Anas</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TEAM SECTION — A TEAM OF 5 SPECIALISTS */}
      {/* ========================================================================= */}
      <section id="team-section" className="section-content-visibility max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Studio Structure</span>
            </div>
            <h2 className="font-serif-luxury text-4xl md:text-6xl text-[#FFFFE3]">
              A Team of 5 Specialists.
            </h2>
            <p className="font-sans text-sm text-[#cbcbcb]/70 mt-2">
              (Specialist profiles and roles shown below represent our dedicated core disciplines)
            </p>
          </div>
          <div className="font-tech text-xs text-[#6d8196] uppercase tracking-widest">
            Craftsmanship Over Headcount
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TEAM_SPECIALISTS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-xl p-6 border border-[#4a4a4a]/40 hover:border-[#6d8196] flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Avatar Badge */}
                <div className="w-14 h-14 rounded-full bg-[#181a1d] border border-[#6d8196]/40 flex items-center justify-center font-tech text-base font-semibold text-[#FFFFE3] mb-6 shadow-[0_0_15px_rgba(109,129,150,0.2)]">
                  {member.avatarText}
                </div>

                <span className="font-tech text-[10px] uppercase tracking-wider text-[#6d8196] block mb-1">
                  Role 0{index + 1}
                </span>
                <h3 className="font-tech text-base font-semibold text-[#FFFFE3]">
                  {member.name}
                </h3>
                <p className="font-sans text-xs text-[#cbcbcb] mt-1 font-medium">
                  {member.role}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#4a4a4a]/40 font-sans text-[11px] text-[#cbcbcb]/60">
                Focus: <span className="text-[#cbcbcb]">{member.focus}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PARTNERS SECTION */}
      {/* ========================================================================= */}
      <section className="section-content-visibility max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10 border-t border-[#4a4a4a]/30">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Strategic Agency Alliances</span>
          </div>
          <h2 className="font-serif-luxury text-3xl md:text-5xl text-[#FFFFE3]">
            Standing Alongside Great Partners.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl glass-card border border-[#4a4a4a]/50 flex flex-col justify-between"
            >
              <div>
                <span className="font-tech text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[#6d8196]/20 text-[#6d8196] border border-[#6d8196]/30 inline-block mb-4">
                  {partner.badge}
                </span>
                <h3 className="font-tech text-xl font-bold text-[#FFFFE3]">
                  {partner.name}
                </h3>
                <p className="font-tech text-xs text-[#cbcbcb]/70 mt-1">
                  {partner.category}
                </p>
                <p className="font-sans text-xs text-[#cbcbcb] mt-4 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TESTIMONIALS SLIDER ON ABOUT PAGE */}
      {/* ========================================================================= */}
      <div className="section-content-visibility">
        <TestimonialsSlider
          title="Reputation Earned In Production."
          subtitle="Feedback from founders who trusted Anas and our five specialists."
        />
      </div>
    </div>
  );
});
