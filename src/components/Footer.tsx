import { memo } from 'react';
import { PageId } from '../types';
import { BRAND, PARTNERS } from '../data/agencyData';
import { ArrowUpRight, MessageCircle, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';
import AmbrosLogo from './AmbrosLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default memo(function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="ambros-main-footer" className="section-content-visibility bg-[#0a0a0a] border-t border-[#4a4a4a]/40 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#6d8196]/50 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col items-start">
              <button
                type="button"
                onClick={() => {
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left focus:outline-none"
              >
                <AmbrosLogo size="md" showTagline={true} />
              </button>
            </div>

            <p className="font-tech text-xs uppercase tracking-widest text-[#6d8196]">
              {BRAND.tagline}
            </p>

            {/* Verbatim Mission copy */}
            <p className="font-sans text-sm text-[#cbcbcb]/90 leading-relaxed max-w-md">
              &ldquo;{BRAND.mission}&rdquo;
            </p>

            {/* Direct WhatsApp Quick Chat */}
            <div className="pt-2">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider font-semibold px-5 py-3 rounded-full bg-[#6d8196] text-[#FFFFE3] hover:bg-[#5b6f84] hover:shadow-[0_0_25px_rgba(109,129,150,0.5)] transition-all"
                id="footer-whatsapp-cta"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({BRAND.phone})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-tech text-xs uppercase tracking-widest text-[#6d8196]">
              Exploration
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#cbcbcb] hover:text-[#FFFFE3] transition-colors"
                >
                  Home Flagship
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#cbcbcb] hover:text-[#FFFFE3] transition-colors"
                >
                  About & Founder (Anas Shaikh)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#cbcbcb] hover:text-[#FFFFE3] transition-colors"
                >
                  Core Capabilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('work');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#cbcbcb] hover:text-[#FFFFE3] transition-colors"
                >
                  Portfolio & Case Studies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#cbcbcb] hover:text-[#FFFFE3] transition-colors"
                >
                  Direct Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Strategic Partners & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="font-tech text-xs uppercase tracking-widest text-[#6d8196] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Strategic Partners & Allies</span>
              </h4>
              <ul className="space-y-2.5 font-sans text-xs">
                {PARTNERS.map((partner, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-lg bg-[#181a1d]/60 border border-[#4a4a4a]/40 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-tech font-semibold text-[#FFFFE3]">
                        {partner.name}
                      </span>
                      <span className="font-tech text-[10px] text-[#6d8196] uppercase tracking-wider">
                        {partner.badge}
                      </span>
                    </div>
                    <span className="text-[#cbcbcb]/70 text-[11px] mt-0.5">
                      {partner.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="font-tech text-xs uppercase tracking-widest text-[#cbcbcb]/60 block mb-3">
                Connect With Ambros
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(109,129,150,0.4)]"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(109,129,150,0.4)]"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Twitter"
                  className="w-10 h-10 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(109,129,150,0.4)]"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Direct"
                  className="w-10 h-10 rounded-full border border-[#6d8196]/60 bg-[#6d8196]/20 text-[#FFFFE3] flex items-center justify-center transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(109,129,150,0.6)]"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#4a4a4a]/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-xs text-[#cbcbcb]/60">
          <div>
            © {new Date().getFullYear()} AmbrosStudio. All Rights Reserved. Crafted With Purpose.
          </div>
          <div className="flex items-center gap-6">
            <span>Founder & CEO: Anas Shaikh</span>
            <span>{BRAND.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
});
