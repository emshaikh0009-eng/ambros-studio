import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { PageId } from './types';
import { BRAND } from './data/agencyData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import IntroSequence from './components/IntroSequence';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
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

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} />;
      case 'work':
        return <WorkPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#cbcbcb] relative selection:bg-[#6d8196]/30 selection:text-[#FFFFE3]">
      {/* Cinematic Custom Cursor */}
      <CustomCursor />

      {/* Mandatory Intro Sequence on first load */}
      {(!introCompleted || forceIntro) && (
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

      {/* Page Content with smooth transition */}
      <main id="main-content-stage" className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Main Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Action Buttons: Back-to-Top & Direct WhatsApp */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
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

        {/* Global WhatsApp CTA Button */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-13 h-13 rounded-full bg-[#6d8196] text-[#FFFFE3] flex items-center justify-center shadow-[0_0_25px_rgba(109,129,150,0.6)] border border-[#FFFFE3]/30 cursor-pointer group"
          aria-label="Chat with Anas on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFFFE3] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFFFE3]" />
          <MessageCircle className="w-6 h-6" />

          {/* Tooltip on hover */}
          <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#181a1d] text-[#FFFFE3] border border-[#6d8196]/40 text-xs font-tech tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Chat on WhatsApp
          </span>
        </motion.a>
      </div>
    </div>
  );
}
