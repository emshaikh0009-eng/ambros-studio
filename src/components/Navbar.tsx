import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { PageId } from '../types';
import { BRAND } from '../data/agencyData';
import AmbrosLogo from './AmbrosLogo';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<PageId | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; index: string }[] = [
    { id: 'home', label: 'Home', index: '01' },
    { id: 'about', label: 'About', index: '02' },
    { id: 'services', label: 'Services', index: '03' },
    { id: 'work', label: 'Work', index: '04' },
    { id: 'contact', label: 'Contact', index: '05' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="main-navigation-bar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-[#2d3239]/60 shadow-[0_12px_40px_rgba(0,0,0,0.65)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo Lockup featuring official Ambros logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center text-left focus:outline-none transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            aria-label="AmbrosStudio Home"
            id="nav-brand-logo-btn"
          >
            <AmbrosLogo size="sm" showTagline={true} className="py-1" />
          </button>

          {/* Bespoke Desktop Navigation Dock: Floating Capsule Pill */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#121417]/85 border border-[#323842]/70 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)]"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              const isHovered = hoveredNav === link.id;

              return (
                <button
                  key={link.id}
                  id={`nav-btn-${link.id}`}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  onMouseEnter={() => setHoveredNav(link.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-tech text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'text-[#FFFFE3]'
                      : 'text-[#9da5b0] hover:text-[#FFFFE3]'
                  }`}
                >
                  {/* Active Sliding Glowing Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00a2ff]/15 via-[#6d8196]/25 to-[#00a2ff]/15 border border-[#00a2ff]/50 shadow-[0_0_16px_rgba(0,162,255,0.25)] pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Subtle Pill Highlight */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full bg-white/[0.04] border border-white/10 pointer-events-none"
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Micro Index Indicator */}
                  <span
                    className={`relative z-10 font-mono text-[9px] tracking-tight transition-colors ${
                      isActive
                        ? 'text-[#00a2ff] font-bold'
                        : 'text-[#6d8196]/60 group-hover:text-[#6d8196]'
                    }`}
                  >
                    {link.index}
                  </span>

                  {/* Label */}
                  <span className="relative z-10">{link.label}</span>

                  {/* Pulsing Micro Dot for Active Page */}
                  {isActive && (
                    <span className="relative z-10 w-1 h-1 rounded-full bg-[#00a2ff] shadow-[0_0_6px_#00a2ff]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Book a Call (WhatsApp link) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 font-tech text-xs uppercase tracking-[0.16em] font-bold px-5 py-2.5 rounded-full bg-[#181d24] text-[#FFFFE3] hover:text-white border border-[#3b434e] hover:border-[#00a2ff]/60 hover:shadow-[0_0_25px_rgba(0,162,255,0.3)] transition-all duration-300"
              id="nav-book-call-cta"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shadow-[0_0_6px_#25D366] animate-pulse" />
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Book a Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00a2ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#161a20] border border-[#363e49] text-[#FFFFE3] shadow-[0_0_12px_rgba(0,0,0,0.5)]"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#161a20] border border-[#363e49] text-[#FFFFE3] hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu with bespoke high-end cards */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#0a0a0a]/98 backdrop-blur-3xl flex flex-col justify-between p-7 pt-24 md:hidden overflow-y-auto"
          >
            {/* Top Brand Mark */}
            <div className="flex items-center justify-between pb-6 border-b border-[#2a2f38]">
              <AmbrosLogo size="sm" showTagline={true} />
              <span className="text-[10px] font-mono tracking-widest text-[#00a2ff] uppercase px-2 py-1 rounded-md bg-[#00a2ff]/10 border border-[#00a2ff]/30">
                Menu
              </span>
            </div>

            {/* Nav list with bespoke luxury card layout */}
            <div className="flex flex-col space-y-3 py-6">
              {navLinks.map((link, index) => {
                const isActive = currentPage === link.id;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * (index + 1), duration: 0.3 }}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00a2ff]/15 to-[#161d27] border-[#00a2ff]/60 shadow-[0_0_20px_rgba(0,162,255,0.2)]'
                        : 'bg-[#121417]/80 border-[#2a2f38] hover:border-[#4a5260]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded ${
                          isActive
                            ? 'bg-[#00a2ff] text-black font-bold'
                            : 'bg-[#1e232b] text-[#6d8196]'
                        }`}
                      >
                        {link.index}
                      </span>
                      <span
                        className={`font-serif-luxury text-2xl tracking-wide ${
                          isActive ? 'text-[#FFFFE3]' : 'text-[#cbcbcb]'
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#00a2ff] shadow-[0_0_8px_#00a2ff]" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Actions on mobile */}
            <div className="pt-6 border-t border-[#2a2f38] space-y-4">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 font-tech text-xs uppercase tracking-wider font-bold py-4 rounded-full bg-gradient-to-r from-[#00a2ff] to-[#0082cc] text-white shadow-[0_0_30px_rgba(0,162,255,0.4)]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book a Call via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between font-tech text-[11px] text-[#cbcbcb]/60 pt-2">
                <span>{BRAND.phone}</span>
                <span>{BRAND.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
