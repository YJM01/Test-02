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
  const [custom404, setCustom404] = useState(false);
  const [countdown, setCountdown] = useState(8);

  // SPLASH SCREEN DISPLAY TIMER
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const syncRouteWithUrl = (path: string) => {
    const cleanPath = path || '/';

    if (cleanPath === '/' || cleanPath === '/select-location') {
      setSelectedLocation(null);
      setCurrentPage('home');
      setCustom404(false);
      return;
    }

    if (cleanPath === '/miami-beach') {
      setSelectedLocation('miami');
      setCurrentPage('home');
      setCustom404(false);
      sessionStorage.setItem('limon_session_location', 'miami');
      return;
    }

    if (cleanPath === '/doral') {
      setSelectedLocation('doral');
      setCurrentPage('home');
      setCustom404(false);
      sessionStorage.setItem('limon_session_location', 'doral');
      return;
    }

    if (cleanPath === '/menu') {
      const saved = sessionStorage.getItem('limon_session_location') || 'miami';
      setSelectedLocation(saved as 'miami' | 'doral');
      sessionStorage.setItem('limon_session_location', saved);
      setCurrentPage('menu');
      setCustom404(false);
      return;
    }

    if (cleanPath === '/book-table') {
      const saved = sessionStorage.getItem('limon_session_location') || 'miami';
      setSelectedLocation(saved as 'miami' | 'doral');
      sessionStorage.setItem('limon_session_location', saved);
      setCurrentPage('book-table');
      setCustom404(false);
      return;
    }

    if (cleanPath === '/contact') {
      const saved = sessionStorage.getItem('limon_session_location') || 'miami';
      setSelectedLocation(saved as 'miami' | 'doral');
      sessionStorage.setItem('limon_session_location', saved);
      setCurrentPage('contact');
      setCustom404(false);
      return;
    }

    // Invalid path -> show custom elegant 404
    setCustom404(true);
  };

  // Sync state on mount and monitor popped browser back/forward buttons
  useEffect(() => {
    syncRouteWithUrl(window.location.pathname);

    const handlePopState = () => {
      syncRouteWithUrl(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle auto redirect 404 countdown timer
  useEffect(() => {
    if (!custom404) return;
    setCountdown(8);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.history.pushState(null, '', '/select-location');
          syncRouteWithUrl('/select-location');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [custom404]);

  const handleSelectLocation = (loc: 'miami' | 'doral') => {
    sessionStorage.setItem('limon_session_location', loc);
    setSelectedLocation(loc);
    const path = loc === 'miami' ? '/miami-beach' : '/doral';
    window.history.pushState(null, '', path);
    setCurrentPage('home');
    setCustom404(false);
  };

  const handleClearLocation = () => {
    sessionStorage.removeItem('limon_session_location');
    setSelectedLocation(null);
    window.history.pushState(null, '', '/select-location');
    setCurrentPage('home');
    setCustom404(false);
  };

  // SMOOTH PAGE NAVIGATION & TRANSITION SCROLLER & LOCATION PERSISTENCE
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

    // Update URL path accordingly without breaking SPA
    let targetPath = '/select-location';
    if (targetPage === 'menu') {
      targetPath = '/menu';
    } else if (targetPage === 'book-table') {
      targetPath = '/book-table';
    } else if (targetPage === 'contact') {
      targetPath = '/contact';
    } else if (selectedLocation === 'miami') {
      targetPath = '/miami-beach';
    } else if (selectedLocation === 'doral') {
      targetPath = '/doral';
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

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
        ) : custom404 ? (
          /* --- CUSTOM ELEGANT 404 PAGE --- */
          <motion.div
            key="custom-404"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-white relative px-6 overflow-hidden select-none"
          >
            {/* Elegant Background Accents */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/10 blur-3xl rounded-full" />
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-500/10 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-md text-center p-8 bg-zinc-900/30 rounded-2xl border border-white/5 backdrop-blur-md shadow-premium">
              {/* Spinning/pulsating glowing lemon icon */}
              <motion.div
                initial={{ scale: 0.9, rotate: -15 }}
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full bg-[#fbf6df]/5 border border-[#D4AF37]/35 flex items-center justify-center text-4xl mb-6 shadow-2xl relative"
              >
                <span className="select-none filter drop-shadow-md">🍋</span>
                <span className="absolute -top-1 -right-1 text-sm text-[#D4AF37] animate-bounce">✨</span>
                {/* Dashed outer orbit */}
                <div className="absolute -inset-2 border border-dashed border-[#D4AF37]/15 rounded-full animate-[spin_15s_linear_infinite]" />
              </motion.div>

              {/* Headings */}
              <h1 className="font-serif text-4xl sm:text-5xl font-extralight tracking-[0.15em] text-white uppercase mb-4">
                404
              </h1>
              <div className="w-16 h-[1px] bg-[#D4AF37]/50 mb-4" />
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-3">
                Citrus Grove Lost
              </h2>
              <p className="text-neutral-400 font-light text-xs tracking-wider leading-relaxed mb-8 max-w-xs">
                The direct path you requested has dissolved into our coastal verandas. Let us guide you back to our location selection.
              </p>

              {/* Dynamic Redirect Progress Banner */}
              <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm text-[10px] uppercase tracking-[0.15em] font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#FAD13B] animate-ping" />
                Returning to salons in <span className="text-[#FAD13B] font-bold">{countdown}s</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  window.history.pushState(null, '', '/select-location');
                  syncRouteWithUrl('/select-location');
                }}
                className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden text-[10px] font-bold tracking-[0.2em] text-[#111111] uppercase transition-all duration-300 ease-out bg-[#D4AF37] hover:bg-[#FAD13B] rounded-full hover:scale-105 active:scale-95 shadow-premium cursor-pointer group"
              >
                Return to Home
              </button>
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
            {/* Elegant Minimalist Header Overlay */}
            <div className="absolute top-12 left-0 right-0 z-40 flex justify-center pointer-events-none">
              <span className="font-serif text-3.5xl sm:text-4.5xl tracking-[0.35em] font-extralight text-white uppercase select-none">
                Limoncello
              </span>
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
