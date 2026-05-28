import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';

// Custom sub-component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import WineShowcase from './components/WineShowcase';
import Testimonials from './components/Testimonials';
import BookTable from './components/BookTable';
import InstagramGallery from './components/InstagramGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'book-table' | 'contact'>('home');

  // 1. SPLASH SCREEN DISPLAY TIMER (Pre-cooling animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // 2. SMOOTH PAGE NAVIGATION & TRANSITION SCROLLER
  const handleScrollToSection = (sectionId: string) => {
    // Map section/page IDs to target full page state
    let targetPage: 'home' | 'menu' | 'book-table' | 'contact' = 'home';
    
    if (sectionId === 'menu' || sectionId === 'wine-showcase') {
      targetPage = 'menu';
    } else if (sectionId === 'book-table') {
      targetPage = 'book-table';
    } else if (sectionId === 'contact' || sectionId === 'instagram') {
      targetPage = 'contact';
    } else {
      targetPage = 'home';
    }

    // Set the state representing different pages
    setCurrentPage(targetPage);

    // Scroll to section element or top of the page
    setTimeout(() => {
      if (sectionId === 'about') {
        const targetElement = document.getElementById('about');
        if (targetElement) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = targetElement.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return;
        }
      }
      
      // Default page transition scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 120);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* --- LUXURY BRANDED LOADING SCREEN --- */
          <motion.div
            key="splash-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#1e1f1a] flex flex-col items-center justify-center text-white"
          >
            <div className="relative flex flex-col items-center max-w-sm text-center px-6">
              
              {/* Rotating glowing lemon logo */}
              <motion.div
                initial={{ scale: 0.8, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="w-24 h-24 rounded-full bg-[#fbf6df]/10 border border-limon-yellow/40 flex items-center justify-center text-5xl mb-6 shadow-2xl relative"
              >
                <span className="select-none animate-pulse">🍋</span>
                {/* Outward orbits */}
                <div className="absolute inset-0 border border-dashed border-limon-yellow/20 rounded-full animate-[spin_10s_linear_infinite]" />
              </motion.div>

              {/* Title headings */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase mb-1 text-white"
              >
                Limoncello
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[10px] uppercase tracking-[0.35em] text-limon-yellow font-semibold mb-6"
              >
                Miami Beach Florida
              </motion.p>

              {/* Subtle gold loader bar */}
              <div className="w-40 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-limon-yellow to-transparent"
                />
              </div>

              <span className="text-[9px] text-[#faf5dd]/40 font-mono tracking-widest uppercase absolute bottom-[-40px]">
                Fine Italian Heritage
              </span>
            </div>
          </motion.div>
        ) : (
          /* --- FULL PREMIUM APP WITH ENHANCED FADE AND GLOW --- */
          <motion.div
            key="app-main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-limon-soft text-limon-dark font-sans overflow-x-hidden selection:bg-limon-yellow/30 selection:text-limon-dark"
          >
            {/* 1. Global Translucent Header */}
            <Navbar onNavigate={handleScrollToSection} activeSection={currentPage} />

            {/* Container for pages with dynamic slide & opacity page transitions */}
            <AnimatePresence mode="wait">
              {currentPage === 'home' && (
                <motion.div
                  key="home-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Cinematic Hero Screen */}
                  <Hero onNavigate={handleScrollToSection} />

                  {/* Mediterranean Storyteller */}
                  <About onNavigate={handleScrollToSection} />

                  {/* Critic and Guest Testimonials */}
                  <Testimonials />
                </motion.div>
              )}

              {currentPage === 'menu' && (
                <motion.div
                  key="menu-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="pt-24"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Interactive Deluxe Menu */}
                  <Menu />

                  {/* Custom Sommelier Cellar showcase carousel complements menus page */}
                  <WineShowcase />
                </motion.div>
              )}

              {currentPage === 'book-table' && (
                <motion.div
                  key="booking-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="pt-24"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Direct Table Reservation Form and confirmation details */}
                  <BookTable />
                </motion.div>
              )}

              {currentPage === 'contact' && (
                <motion.div
                  key="contact-page"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="pt-24"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Maps, Call Line and inquiries Contact details form */}
                  <Contact />

                  {/* Gorgeous Social Mosaic collage highlights */}
                  <InstagramGallery />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 10. Branded Sitemap and Newsletter Footer */}
            <Footer onNavigate={handleScrollToSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
