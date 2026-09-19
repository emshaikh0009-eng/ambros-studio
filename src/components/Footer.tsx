import { memo } from 'react';
import { PageId } from '../types';
import { BRAND, PARTNERS } from '../data/agencyData';
import { ArrowUpRight, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import AmbrosLogo from './AmbrosLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default memo(function Footer({ onNavigate }: FooterProps) {
  const explorationLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer id="ambros-main-footer" className="section-content-visibility bg-[#0a0a0a] border-t border-[#4a4a4a]/40 relative overflow-hidden w-full max-w-full">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#6d8196]/40 to-transparent pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-0 md:px-12 py-4 md:py-16">
        {/* 3 Columns Layout: Desktop 3 cols; Mobile (<768px) stacks vertically in order: Strategic Partners → Connect with Ambros → Exploration */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-0 md:gap-8 lg:gap-12">
          
          {/* COLUMN 1: Strategic Partners (32px vertical, 24px horizontal padding on mobile) */}
          <div className="py-8 px-6 md:py-0 md:px-0 border-b border-[#4a4a4a]/25 md:border-b-0 flex flex-col justify-start text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#6d8196] font-semibold mb-4">
              Strategic Partners
            </h4>
            <ul className="space-y-3 w-full">
              {PARTNERS.map((partner, idx) => (
                <li
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#14171c]/80 border border-[#4a4a4a]/40 hover:border-[#6d8196]/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#FFFFE3]">
                      {partner.name}
                    </span>
                    <span className="text-[10px] text-[#6d8196] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-[#6d8196]/15 border border-[#6d8196]/30">
                      {partner.badge}
                    </span>
                  </div>
                  <p className="text-[#cbcbcb]/70 text-xs mt-1">
                    {partner.category}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: Connect with Ambros (32px vertical, 24px horizontal padding on mobile) */}
          <div className="py-8 px-6 md:py-0 md:px-0 border-b border-[#4a4a4a]/25 md:border-b-0 flex flex-col justify-start text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#6d8196] font-semibold mb-4">
              Connect with Ambros
            </h4>
            <p className="text-xs text-[#cbcbcb]/70 mb-4">
              Follow our latest releases, insights, and behind-the-scenes engineering.
            </p>
            {/* Social Icons — minimum 44x44px circular tap targets */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={BRAND.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Twitter"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Direct"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#6d8196]/60 bg-[#6d8196]/20 text-[#FFFFE3] hover:bg-[#6d8196]/30 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-4">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#6d8196] hover:text-[#FFFFE3] transition-colors py-2"
              >
                <span>Direct WhatsApp: {BRAND.phone}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2">
              <p className="text-xs text-[#cbcbcb]/70 leading-relaxed">
                214, VIP Galleria, Alpha Bazar, Althan, Surat, Gujarat – 395017
              </p>
            </div>
          </div>

          {/* COLUMN 3: Exploration (32px vertical, 24px horizontal padding on mobile) */}
          <div className="py-8 px-6 md:py-0 md:px-0 flex flex-col justify-start text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#6d8196] font-semibold mb-3">
              Exploration
            </h4>
            <ul className="flex flex-col space-y-1">
              {explorationLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="min-h-[44px] w-full text-left py-2.5 text-sm text-[#cbcbcb] hover:text-[#FFFFE3] transition-colors flex items-center"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Small Bottom Bar: Logo and copyright centered at very bottom on mobile */}
        <div className="pt-8 mt-6 px-6 md:px-0 border-t border-[#4a4a4a]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#cbcbcb]/60 text-center md:text-left">
          <div className="order-2 md:order-1 w-full md:w-auto text-center md:text-left">
            © 2025 AmbrosStudio. Crafted With Purpose.
          </div>
          <div className="order-1 md:order-2 flex items-center justify-center w-full md:w-auto">
            <AmbrosLogo size="sm" showTagline={false} />
          </div>
        </div>
      </div>
    </footer>
  );
});
