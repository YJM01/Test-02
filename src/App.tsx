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
  const [selectedLocation, setSelectedLocation] = useState<'miami' | 'doral' | null>(null);
  const [hoveredPanel, setHoveredPanel] = useState<'miami' | 'doral' | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'book-table' | 'contact'>('home');

  // SPLASH SCREEN DISPLAY TIMER
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Always reset to select-location on hard reload or initial visit
  useEffect(() => {
    setSelectedLocation(null);
    window.history.replaceState(null, '', '/select-location');

    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/miami-beach') {
        setSelectedLocation('miami');
      } else if (path === '/doral') {
        setSelectedLocation('doral');
      } else {
        setSelectedLocation(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectLocation = (loc: 'miami' | 'doral') => {
    setSelectedLocation(loc);
    const path = loc === 'miami' ? '/miami-beach' : '/doral';
    window.history.pushState(null, '', path);
    setCurrentPage('home');
  };

  const handleClearLocation = () => {
    setSelectedLocation(null);
    window.history.pushState(null, '', '/select-location');
    setCurrentPage('home');
  };

  // SMOOTH PAGE NAVIGATION & TRANSITION SCROLLER
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
            exit={{ opacity: 0, scale: 0.96 }}
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
                Fine Italian Dining
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
        ) : !selectedLocation ? (
          /* --- LUXURY LOCATION SELECTOR LANDING SCREEN --- */
          <motion.div
            key="location-picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-[#111111] flex flex-col relative overflow-hidden"
          >
            {/* Elegant Header Overlay */}
            <div className="absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent pt-12 pb-24 px-6 pointer-events-none">
              <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-3">
                <motion.div
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex items-center gap-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FAD13B] animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#FCF4D4] font-mono">Select Location</span>
                </motion.div>
                <motion.h1
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-serif text-3.5xl sm:text-5.5xl font-extralight tracking-[0.25em] text-white uppercase"
                >
                  Limoncello
                </motion.h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="w-24 h-[1px] bg-[#D4AF37]/40"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-xs sm:text-sm text-neutral-300 font-light tracking-[0.08em] max-w-md mt-1"
                >
                  Step into our culinary theater. Please select a salon to begin your journey.
                </motion.p>
              </div>
            </div>

            {/* Split Panels Container */}
            <div className="flex-1 flex flex-col md:flex-row min-h-screen relative w-full overflow-hidden">
              
              {/* PANEL 1: MIAMI BEACH */}
              <div
                onMouseEnter={() => setHoveredPanel('miami')}
                onMouseLeave={() => setHoveredPanel(null)}
                onClick={() => handleSelectLocation('miami')}
                style={{
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`group cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center p-8 h-[50vh] md:h-auto ${
                  hoveredPanel === 'miami' ? 'md:w-[56%]' : hoveredPanel === 'doral' ? 'md:w-[44%]' : 'md:w-1/2'
                } w-full`}
              >
                {/* Background image & overlays */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/35 transition-colors duration-500" />
                  {/* Gentle golden bloom on hover */}
                  <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200"
                    alt="Limoncello Miami Beach"
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-out filter brightness-[0.8]"
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 text-white flex flex-col items-center space-y-4">
                  <h2 className="font-serif text-3.5xl sm:text-5xl md:text-6xl font-light tracking-[0.1em] text-white group-hover:text-[#FAD13B] transition-colors duration-500 uppercase">
                    Miami Beach
                  </h2>
                  <div className="w-12 h-[1px] bg-[#D4AF37]/50 group-hover:w-28 transition-all duration-700" />
                  <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 group-hover:text-white transition-colors duration-500">
                    Enter Salon
                  </span>
                </div>
              </div>

              {/* PANEL 2: DORAL ESTATE */}
              <div
                onMouseEnter={() => setHoveredPanel('doral')}
                onMouseLeave={() => setHoveredPanel(null)}
                onClick={() => handleSelectLocation('doral')}
                style={{
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`group cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center p-8 h-[50vh] md:h-auto border-t md:border-t-0 md:border-l border-white/10 ${
                  hoveredPanel === 'doral' ? 'md:w-[56%]' : hoveredPanel === 'miami' ? 'md:w-[44%]' : 'md:w-1/2'
                } w-full`}
              >
                {/* Background image & overlays */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/35 transition-colors duration-500" />
                  {/* Gentle golden bloom on hover */}
                  <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200"
                    alt="Limoncello Doral"
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-out filter brightness-[0.8]"
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 text-white flex flex-col items-center space-y-4">
                  <h2 className="font-serif text-3.5xl sm:text-5xl md:text-6xl font-light tracking-[0.1em] text-white group-hover:text-[#FAD13B] transition-colors duration-500 uppercase">
                    Doral
                  </h2>
                  <div className="w-12 h-[1px] bg-[#D4AF37]/50 group-hover:w-28 transition-all duration-700" />
                  <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 group-hover:text-white transition-colors duration-500">
                    Enter Salon
                  </span>
                </div>
              </div>

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
            <Navbar 
              onNavigate={handleScrollToSection} 
              activeSection={currentPage} 
              selectedLocation={selectedLocation} 
              onChangeLocation={handleSelectLocation} 
            />

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
                  <Hero onNavigate={handleScrollToSection} selectedLocation={selectedLocation} />

                  {/* Mediterranean Storyteller */}
                  <About onNavigate={handleScrollToSection} selectedLocation={selectedLocation} />

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
                  <BookTable selectedLocation={selectedLocation} />
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
                  <Contact selectedLocation={selectedLocation} />

                  {/* Gorgeous Social Mosaic collage highlights */}
                  <InstagramGallery selectedLocation={selectedLocation} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 10. Branded Sitemap and Newsletter Footer */}
            <Footer onNavigate={handleScrollToSection} selectedLocation={selectedLocation} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
