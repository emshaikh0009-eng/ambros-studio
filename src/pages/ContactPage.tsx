import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUpRight, Mail, Phone, MapPin, Instagram, Facebook, Twitter, CheckCircle2, Send, HelpCircle, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND, FAQS } from '../data/agencyData';
import MagneticButton from '../components/MagneticButton';
import { PageId } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Design & Development',
    budget: '$3,000 - $8,000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6d8196', '#FFFFE3', '#cbcbcb', '#4a4a4a'],
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);

    // Build WhatsApp prefilled link
    const text = `*New Inquiry via AmbrosStudio Website*%0A%0A*Name:* ${encodeURIComponent(
      formData.name
    )}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(
      formData.phone || 'Not provided'
    )}%0A*Service:* ${encodeURIComponent(formData.service)}%0A*Budget:* ${encodeURIComponent(
      formData.budget
    )}%0A*Project Details:* ${encodeURIComponent(formData.message)}`;

    const waUrl = `${BRAND.whatsappUrl}?text=${text}`;

    // Auto open WhatsApp in new tab after 1.2s or allow user to click
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#cbcbcb] pt-32 pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-1/3 w-[800px] h-[400px] bg-radial from-[#6d8196]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#6d8196]" />
          <span>Direct Studio Channel</span>
        </div>
        <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FFFFE3] leading-[0.98] max-w-4xl">
          Start a Conversation.
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#cbcbcb] max-w-2xl mt-6 leading-relaxed">
          Tell us about your venture, your target timeline, and what you’re looking to build. We read and respond to every message within hours.
        </p>
      </section>

      {/* Split Layout: Left Details + Right Form */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Handwritten Intro Copy + Details + Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card rounded-2xl p-8 border border-[#4a4a4a]/50">
              <span className="font-tech text-xs uppercase tracking-widest text-[#6d8196] block mb-3">
                No Intermediaries
              </span>
              <h2 className="font-serif-luxury text-3xl text-[#FFFFE3] mb-4">
                Talk Directly With Anas Shaikh.
              </h2>
              <p className="font-sans text-sm text-[#cbcbcb] leading-relaxed mb-6">
                When you initiate a project with Ambros, you won’t be handed off to an account coordinator. Founder and CEO Anas Shaikh will personally review your brief and guide the architectural sprint.
              </p>

              {/* Direct Quick Channels */}
              <div className="space-y-4 pt-4 border-t border-[#4a4a4a]/40 text-sm">
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#6d8196]/15 hover:bg-[#6d8196]/25 border border-[#6d8196]/40 text-[#FFFFE3] transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#6d8196] flex items-center justify-center text-[#FFFFE3]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-tech text-xs uppercase tracking-wider text-[#FFFFE3]">
                      WhatsApp Direct (Fastest)
                    </div>
                    <div className="font-mono text-xs text-[#cbcbcb]">
                      {BRAND.phone}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-[#6d8196] group-hover:text-[#FFFFE3]" />
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#181a1d]/60 border border-[#4a4a4a]/30">
                  <div className="w-9 h-9 rounded-lg bg-[#181a1d] border border-[#4a4a4a] flex items-center justify-center text-[#6d8196]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-tech text-xs uppercase tracking-wider text-[#cbcbcb]/60">
                      Studio Email
                    </div>
                    <div className="font-mono text-xs text-[#FFFFE3]">
                      {BRAND.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#181a1d]/60 border border-[#4a4a4a]/30">
                  <div className="w-9 h-9 rounded-lg bg-[#181a1d] border border-[#4a4a4a] flex items-center justify-center text-[#6d8196]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-tech text-xs uppercase tracking-wider text-[#cbcbcb]/60">
                      Headquarters
                    </div>
                    <div className="font-sans text-xs text-[#cbcbcb]">
                      {BRAND.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connection Hub */}
            <div className="p-6 rounded-2xl glass-card border border-[#4a4a4a]/40">
              <span className="font-tech text-xs uppercase tracking-widest text-[#cbcbcb]/70 block mb-4">
                Social Channels & Updates
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#181a1d] hover:bg-[#1f2329] border border-[#4a4a4a]/50 text-center flex flex-col items-center gap-1.5 transition-all group"
                >
                  <Instagram className="w-5 h-5 text-[#6d8196] group-hover:text-[#FFFFE3]" />
                  <span className="font-tech text-[10px] text-[#cbcbcb]">Instagram</span>
                </a>
                <a
                  href={BRAND.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#181a1d] hover:bg-[#1f2329] border border-[#4a4a4a]/50 text-center flex flex-col items-center gap-1.5 transition-all group"
                >
                  <Twitter className="w-5 h-5 text-[#6d8196] group-hover:text-[#FFFFE3]" />
                  <span className="font-tech text-[10px] text-[#cbcbcb]">X / Twitter</span>
                </a>
                <a
                  href={BRAND.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#181a1d] hover:bg-[#1f2329] border border-[#4a4a4a]/50 text-center flex flex-col items-center gap-1.5 transition-all group"
                >
                  <Facebook className="w-5 h-5 text-[#6d8196] group-hover:text-[#FFFFE3]" />
                  <span className="font-tech text-[10px] text-[#cbcbcb]">Facebook</span>
                </a>
              </div>
            </div>

            {/* Embedded Region Preview Card (Ahmedabad Tech Hub) */}
            <div className="p-6 rounded-2xl glass-card border border-[#4a4a4a]/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="font-tech text-xs text-[#6d8196] uppercase tracking-widest">
                  Studio Location
                </span>
                <span className="font-mono text-[10px] text-[#FFFFE3] px-2 py-0.5 rounded bg-[#6d8196]/20 border border-[#6d8196]/40">
                  IST (UTC +5:30)
                </span>
              </div>
              <p className="font-sans text-xs text-[#cbcbcb] leading-relaxed">
                Operating globally from Ahmedabad, Gujarat with active clients spanning India, Dubai, Singapore, and the United Kingdom.
              </p>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#4a4a4a]/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#6d8196]/20 border border-[#6d8196] mx-auto flex items-center justify-center text-[#FFFFE3] shadow-[0_0_25px_rgba(109,129,150,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif-luxury text-4xl text-[#FFFFE3]">
                    Inquiry Received.
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#cbcbcb] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-[#FFFFE3] font-semibold">{formData.name}</span>. We’ve prepared your briefing package and opening WhatsApp for direct communication.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={`${BRAND.whatsappUrl}?text=${encodeURIComponent(
                        `Hi Anas, I just submitted an inquiry on AmbrosStudio for ${formData.service}. Looking forward to connecting!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-[#6d8196] text-[#FFFFE3] font-tech text-xs uppercase tracking-wider font-semibold flex items-center gap-2 hover:bg-[#5b6f84] transition-all shadow-[0_0_20px_rgba(109,129,150,0.4)]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open Chat On WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-full border border-[#4a4a4a] text-[#cbcbcb] hover:text-[#FFFFE3] font-tech text-xs uppercase tracking-wider"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="ambros-contact-form">
                  <div>
                    <span className="font-tech text-xs uppercase tracking-widest text-[#6d8196] block mb-2">
                      Brief Submission
                    </span>
                    <h3 className="font-serif-luxury text-3xl text-[#FFFFE3]">
                      Project Specifications
                    </h3>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-tech text-xs uppercase tracking-wider text-[#cbcbcb] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181a1d] border border-[#4a4a4a] text-[#FFFFE3] focus:border-[#6d8196] focus:outline-none font-sans text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs uppercase tracking-wider text-[#cbcbcb] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maya@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181a1d] border border-[#4a4a4a] text-[#FFFFE3] focus:border-[#6d8196] focus:outline-none font-sans text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp + Service Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-tech text-xs uppercase tracking-wider text-[#cbcbcb] mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 99984 41519"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181a1d] border border-[#4a4a4a] text-[#FFFFE3] focus:border-[#6d8196] focus:outline-none font-sans text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-xs uppercase tracking-wider text-[#cbcbcb] mb-2">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181a1d] border border-[#4a4a4a] text-[#FFFFE3] focus:border-[#6d8196] focus:outline-none font-sans text-sm transition-colors cursor-pointer"
                      >
                        <option value="Website Design & Development">
                          Website Design & Development
                        </option>
                        <option value="Digital Ads Campaigns (Meta)">
                          Digital Ads Campaigns (Meta)
                        </option>
                        <option value="Digital Visiting Cards">
                          Digital Visiting Cards
                        </option>
                        <option value="Full Strategic Agency Retainer">
                          Full Strategic Agency Retainer
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block font-tech text-xs uppercase tracking-wider text-[#cbcbcb] mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        'Under $3k',
                        '$3k - $6k',
                        '$6k - $12k',
                        'Enterprise ($12k+)',
                      ].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: tier })}
                          className={`py-2 px-3 rounded-lg font-tech text-xs uppercase tracking-wider border transition-all ${
                            formData.budget === tier
                              ? 'bg-[#6d8196] text-[#FFFFE3] border-[#6d8196] shadow-[0_0_12px_rgba(109,129,150,0.4)]'
                              : 'bg-[#181a1d] border-[#4a4a4a] text-[#cbcbcb] hover:border-[#6d8196]/50'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Brief */}
                  <div>
                    <label className="block font-tech text-xs uppercase tracking-wider text-[#cbcbcb] mb-2">
                      Project Goals & Context *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Briefly describe what problem your business wants to solve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#181a1d] border border-[#4a4a4a] text-[#FFFFE3] focus:border-[#6d8196] focus:outline-none font-sans text-sm transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#6d8196] hover:bg-[#5b6f84] text-[#FFFFE3] font-tech text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(109,129,150,0.4)] transition-all cursor-pointer"
                      id="contact-submit-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Brief & Open WhatsApp Chat</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <p className="font-sans text-[11px] text-center text-[#cbcbcb]/60 mt-3">
                      Instant response guaranteed within 24 hours. Your details are strictly confidential.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 pt-12 border-t border-[#4a4a4a]/40">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clarity First</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#FFFFE3]">
            Frequently Addressed Questions.
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-[#4a4a4a]/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-tech text-sm sm:text-base font-medium text-[#FFFFE3]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6d8196] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#FFFFE3]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-xs sm:text-sm font-sans text-[#cbcbcb]/80 leading-relaxed border-t border-[#4a4a4a]/30 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
