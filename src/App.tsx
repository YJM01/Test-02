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
  
  // Dynamic persistent branch choice
  const [selectedLocation, setSelectedLocation] = useState<'miami' | 'doral' | null>(() => {
    const saved = localStorage.getItem('limon_location');
    return (saved === 'miami' || saved === 'doral') ? saved : null;
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'book-table' | 'contact'>('home');

  // SPLASH SCREEN DISPLAY TIMER
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectLocation = (loc: 'miami' | 'doral') => {
    localStorage.setItem('limon_location', loc);
    setSelectedLocation(loc);
  };

  const handleClearLocation = () => {
    localStorage.removeItem('limon_location');
    setSelectedLocation(null);
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
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between items-center py-12 px-4 relative overflow-hidden"
          >
            {/* Decorative faint background graphics */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-limon-yellow/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-limon-gold/5 blur-3xl pointer-events-none" />

            {/* Header / Intro */}
            <div className="text-center max-w-xl mx-auto space-y-4 relative z-10 pt-4">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-limon-gold/15 shadow-premium group cursor-pointer"
              >
                <span className="text-3xl select-none group-hover:rotate-12 transition-transform duration-300">🍋</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-3.5xl sm:text-5xl font-light tracking-[0.25em] text-limon-dark uppercase"
              >
                Limoncello
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[10px] uppercase tracking-[0.35em] text-limon-olive font-bold"
              >
                An Authentic Italian Dining Experience
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-16 h-[1px] bg-limon-gold/30 mx-auto"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xs text-limon-muted font-light tracking-wide max-w-sm mx-auto"
              >
                Choose your preferred branch to preview the exclusive culinary assemblies, somatic cellars, and reservation books.
              </motion.p>
            </div>

            {/* Options container */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 my-10 relative z-10">
              
              {/* OPTION 1: MIAMI BEACH */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => handleSelectLocation('miami')}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-limon-gold/15 shadow-premium hover:shadow-gold-heavy transition-all duration-500 flex flex-col justify-between h-[360px] relative"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200" 
                    alt="Miami Beach Location" 
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-700 opacity-20 group-hover:opacity-30 filter sepia-[0.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/10" />
                </div>

                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-limon-gold bg-limon-soft border border-limon-gold/10 px-2.5 py-1 rounded">Oceanfront Salon</span>
                      <span className="text-xl">🌴</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-limon-dark mt-6 tracking-wide group-hover:text-limon-gold transition-colors duration-300">
                      Miami Beach
                    </h2>
                    <p className="text-xs text-limon-muted font-light mt-2 max-w-xs leading-relaxed">
                      Nestled in the historic Art Deco heart of Washington Avenue. Elegant seaside breezes, vibrant coastal energy, and late-night alfresco garden spirits.
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-mono uppercase text-limon-olive tracking-widest mb-3">
                      📍 1334 Washington Ave, Miami Beach, FL
                    </p>
                    <div className="w-full py-3.5 bg-limon-gold text-white font-semibold text-xs uppercase tracking-[2px] rounded-full text-center group-hover:bg-limon-dark transition-colors duration-300 shadow-premium">
                      Enter Miami Beach Salon
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* OPTION 2: DORAL ESTATE */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => handleSelectLocation('doral')}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-limon-gold/15 shadow-premium hover:shadow-gold-heavy transition-all duration-500 flex flex-col justify-between h-[360px] relative"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200" 
                    alt="Doral Estate Location" 
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-700 opacity-20 group-hover:opacity-30 filter sepia-[0.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/10" />
                </div>

                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-limon-gold bg-limon-soft border border-limon-gold/10 px-2.5 py-1 rounded">Resort Country Club</span>
                      <span className="text-xl">⛳</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-limon-dark mt-6 tracking-wide group-hover:text-limon-gold transition-colors duration-300">
                      Doral Estate
                    </h2>
                    <p className="text-xs text-limon-muted font-light mt-2 max-w-xs leading-relaxed">
                      Overlooking luxurious resort garden verandas. A stately country club atmosphere, premium private dinner reserves, and family lounge tranquility.
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-mono uppercase text-limon-olive tracking-widest mb-3">
                      📍 8700 NW 36th St, Doral, FL 33166
                    </p>
                    <div className="w-full py-3.5 bg-limon-gold text-white font-semibold text-xs uppercase tracking-[2px] rounded-full text-center group-hover:bg-limon-dark transition-colors duration-300 shadow-premium">
                      Enter Doral Estate Salon
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Branded footer */}
            <div className="text-center relative z-10 pt-2 pb-2">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#A69F88]">
                Limoncello Authentic Italian fine dining • Michelin Level Hospitality
              </p>
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
