import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { PageId } from './types';
import { BRAND } from './data/agencyData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BrandedPreloader from './components/BrandedPreloader';
import IntroSequence from './components/IntroSequence';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [preloaderCompleted, setPreloaderCompleted] = useState(false);
  const [introCompleted, setIntroCompleted] = useState<boolean>(() => {
    return sessionStorage.getItem('ambros_intro_seen') === 'true';
  });
  const [forceIntro, setForceIntro] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'about', 'services', 'work', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [showMobileWhatsApp, setShowMobileWhatsApp] = useState(true);
  const lastScrollY = useRef(0);

  // Throttled scroll listener via requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setShowBackToTop(currentY > 400);

          // Mobile WhatsApp button: Hides when scrolling down, appears when scrolling up
          if (currentY <= 60) {
            setShowMobileWhatsApp(true);
          } else if (currentY > lastScrollY.current + 8) {
            setShowMobileWhatsApp(false);
          } else if (currentY < lastScrollY.current - 8) {
            setShowMobileWhatsApp(true);
          }
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 3D scene only allowed AFTER preloader AND intro sequence complete
  const canLoad3D = useMemo(() => {
    return preloaderCompleted && introCompleted && !forceIntro;
  }, [preloaderCompleted, introCompleted, forceIntro]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} canLoad3D={canLoad3D} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} />;
      case 'work':
        return <WorkPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} canLoad3D={canLoad3D} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#cbcbcb] relative selection:bg-[#6d8196]/30 selection:text-[#FFFFE3]">
      {/* High-Performance Custom Cursor (Pure transform/opacity) */}
      <CustomCursor />

      {/* Branded Preloader: Black screen → Ambros logo → Thin slate-blue progress bar → Fades out */}
      {!preloaderCompleted && (
        <BrandedPreloader
          onComplete={() => {
            setPreloaderCompleted(true);
          }}
        />
      )}

      {/* Intro Sequence after preloader */}
      {preloaderCompleted && (!introCompleted || forceIntro) && (
        <IntroSequence
          forceShow={forceIntro}
          onComplete={() => {
            setIntroCompleted(true);
            setForceIntro(false);
          }}
        />
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Page Content with smooth GPU-accelerated transition */}
      <main id="main-content-stage" className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Main Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Desktop Floating Action Buttons: Back-to-Top & Direct WhatsApp (>=768px only) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-center gap-3">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-[#181a1d]/90 border border-[#4a4a4a] text-[#cbcbcb] hover:text-[#FFFFE3] hover:border-[#6d8196] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all cursor-pointer backdrop-blur-md"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Global Desktop WhatsApp CTA Button */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-full bg-[#25D366]/90 hover:bg-[#25D366] text-black font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span>WhatsApp</span>
        </motion.a>
      </div>

      {/* Mobile Floating WhatsApp Button (<768px): Fixed bottom-right 56px circle, hides scrolling down, appears scrolling up */}
      <div
        className={`md:hidden fixed bottom-5 right-5 z-40 transition-all duration-300 ${
          showMobileWhatsApp
            ? 'translate-y-0 opacity-100'
            : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <a
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-full bg-[#25D366] text-black shadow-[0_4px_25px_rgba(37,211,102,0.5)] flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-black text-[#25D366]" />
        </a>
      </div>
    </div>
  );
}
