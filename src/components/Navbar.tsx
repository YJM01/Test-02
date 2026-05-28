import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Calendar, Globe } from 'lucide-react';
import { LOCATION_DATA } from '../types';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  selectedLocation: 'miami' | 'doral';
  onChangeLocation: (location: 'miami' | 'doral') => void;
}

export default function Navbar({ onNavigate, activeSection, selectedLocation, onChangeLocation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Our Menu', id: 'menu' },
    { name: 'Book a Table', id: 'book-table' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  const currentLoc = LOCATION_DATA[selectedLocation];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-limon-soft/90 backdrop-blur-md border-b border-limon-gold/10 py-3 shadow-premium'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo side */}
            <div 
              className="flex items-center gap-2 group"
              id="brand-logo"
            >
              <div 
                onClick={() => handleLinkClick('home')}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-limon-beige transition-all duration-500 group-hover:rotate-12 cursor-pointer border border-[#D4AF37]/20"
              >
                <span className="text-2xl select-none" role="img" aria-label="lemon">🍋</span>
                <div className="absolute -inset-0.5 rounded-full border border-limon-yellow/40 animate-pulse" />
              </div>

              {/* Dynamic Location trigger */}
              <div className="flex flex-col relative" onClick={(e) => e.stopPropagation()}>
                <span 
                  onClick={() => handleLinkClick('home')}
                  className="font-serif text-xl sm:text-2xl font-light tracking-[2px] uppercase text-limon-dark hover:text-limon-gold transition-colors duration-300 cursor-pointer"
                >
                  Limoncello
                </span>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#333333] font-bold -mt-1.5 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{currentLoc.name}</span>
                    <span className="text-[6px] transition-transform duration-300" style={{ transform: showDropdown ? 'rotate(180deg)' : 'none' }}>▼</span>
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-0 mt-1 bg-white/95 backdrop-blur-md rounded-xl p-2 border border-limon-gold/15 shadow-xl min-w-[140px] z-50 text-left"
                      >
                        <div className="text-[7px] text-neutral-400 tracking-[0.1em] uppercase px-3 py-1 font-bold">Select Branch</div>
                        <button
                          onClick={() => {
                            onChangeLocation('miami');
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider rounded-lg transition-colors ${selectedLocation === 'miami' ? 'bg-[#FCF4D4] text-[#333333]' : 'hover:bg-[#FAF9F6] text-neutral-600'}`}
                        >
                          Miami Beach
                        </button>
                        <button
                          onClick={() => {
                            onChangeLocation('doral');
                            setShowDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider rounded-lg transition-colors mt-1 ${selectedLocation === 'doral' ? 'bg-[#FCF4D4] text-[#333333]' : 'hover:bg-[#FAF9F6] text-neutral-600'}`}
                        >
                          Doral Estate
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Desktop Nav Desktop links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-limon-gold cursor-pointer ${
                    activeSection === link.id ? 'text-limon-gold font-semibold' : 'text-limon-dark/80'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-limon-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Direct Dial Call & Reservation CTA Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={`tel:${currentLoc.phoneRaw}`}
                className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-limon-olive hover:text-limon-gold transition-colors duration-300"
                id="call-nav-button"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{currentLoc.phone}</span>
              </a>

              <button
                onClick={() => handleLinkClick('book-table')}
                className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden text-xs font-semibold tracking-widest text-white uppercase transition-all duration-300 ease-out bg-limon-gold rounded-full hover:bg-limon-dark hover:scale-105 active:scale-95 shadow-premium hover:shadow-gold-heavy cursor-pointer group"
                id="cta-nav-button"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40" />
                <Calendar className="w-3.5 h-3.5 mr-2" />
                <span>Reserve Table</span>
              </button>
            </div>

            {/* Mobile Navigation Trigger Button */}
            <div className="flex items-center gap-3 md:hidden">
              <a
                href={`tel:${currentLoc.phoneRaw}`}
                className="p-2.5 rounded-full bg-limon-cream hover:bg-limon-yellow/20 text-limon-olive transition-colors cursor-pointer"
                id="mobile-phone-nav"
                aria-label="Call Restaurant"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-full bg-limon-beige text-limon-dark hover:text-limon-gold hover:bg-limon-cream transition-all cursor-pointer"
                id="mobile-menu-trigger"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5 animate-spin-once" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Menu overlay for Mobile devices */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-limon-dark/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-limon-soft p-6 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-16">
                <div className="flex items-center gap-2 mb-8 pb-4 border-b border-limon-beige">
                  <span className="text-3xl">🍋</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold">Limoncello</h3>
                    <p className="text-[8px] uppercase tracking-widest text-[#5f6b43]">{currentLoc.slogan}</p>
                  </div>
                </div>

                <div className="mb-6 bg-white p-3 rounded-xl border border-limon-gold/15">
                  <p className="text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Switch Location</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onChangeLocation('miami')}
                      className={`flex-1 py-1.5 rounded text-[9px] uppercase font-bold text-center border transition-all ${selectedLocation === 'miami' ? 'bg-[#FCF4D4] border-limon-gold text-limon-dark' : 'bg-transparent border-neutral-200 text-neutral-500'}`}
                    >
                      Miami
                    </button>
                    <button
                      onClick={() => onChangeLocation('doral')}
                      className={`flex-1 py-1.5 rounded text-[9px] uppercase font-bold text-center border transition-all ${selectedLocation === 'doral' ? 'bg-[#FCF4D4] border-limon-gold text-limon-dark' : 'bg-transparent border-neutral-200 text-neutral-500'}`}
                    >
                      Doral
                    </button>
                  </div>
                </div>

                <nav className="flex flex-col space-y-5">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left py-2 text-base font-medium tracking-wide border-b border-[#f5f2e6]/40 cursor-pointer ${
                        activeSection === link.id
                          ? 'text-limon-gold font-semibold pl-2 border-l-2 border-limon-gold'
                          : 'text-limon-dark/80 hover:text-limon-gold'
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 pb-10">
                <a
                  href={`tel:${currentLoc.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-[#5f6b43]/20 rounded-full text-sm font-semibold tracking-wider uppercase text-[#5f6b43] bg-limon-beige hover:bg-limon-cream transition-all"
                  id="mobile-drawer-call"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>Call {currentLoc.phone}</span>
                </a>

                <button
                  onClick={() => handleLinkClick('book-table')}
                  className="w-full py-3.5 bg-limon-gold hover:bg-limon-olive text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-premium hover:shadow-gold-heavy cursor-pointer transition-all duration-300"
                  id="mobile-drawer-reserve"
                >
                  Reserve A Table
                </button>

                <div className="text-center text-[10px] text-limon-muted tracking-widest mt-4 uppercase">
                  {currentLoc.address}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

