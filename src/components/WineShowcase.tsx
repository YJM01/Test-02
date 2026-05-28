import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, Percent, Award, Globe, HelpCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { WINE_SHOWCASE_DATA } from '../data';

export default function WineShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeCategory = WINE_SHOWCASE_DATA[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % WINE_SHOWCASE_DATA.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + WINE_SHOWCASE_DATA.length) % WINE_SHOWCASE_DATA.length);
  };

  return (
    <section id="wine-showcase" className="py-24 sm:py-32 bg-limon-dark text-white relative overflow-hidden">
      {/* Absolute Grape vines soft graphic background elements */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1920"
          alt="Vintage Wine Cellar"
          className="w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-limon-dark via-limon-dark/95 to-limon-dark" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header container */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-limon-yellow block">The Sommelier’s Vault</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            La Selezione dei Vini
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-limon-gold to-transparent mx-auto" />
          <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Curated carefully under our master sommelier’s guidance. Vintage reserves, pristine bubbly spumantes, and bold oak-aged reds imported directly from esteemed Italian territories.
          </p>
        </div>

        {/* --- CAROUSEL CATEGORY SELECTOR TABS --- */}
        <div className="relative mb-12 flex justify-center">
          <div className="hidden lg:flex flex-wrap gap-2 justify-center bg-[#1e1f1a]/80 p-2 rounded-full border border-white/5 max-w-4xl">
            {WINE_SHOWCASE_DATA.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-limon-gold text-white shadow-premium'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                🍷 {sec.title}
              </button>
            ))}
          </div>

          {/* Mobile responsive carousel controls */}
          <div className="flex lg:hidden items-center justify-between w-full max-w-md bg-[#1e1f1a]/95 rounded-2xl p-4 border border-white/5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-limon-yellow cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="font-serif text-base font-semibold text-white tracking-wide text-center">
              {activeCategory.title}
            </span>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-limon-yellow cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- DYNAMIC DISPLAY AREA WITH CARDS GRID --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Category description labels */}
            <div className="text-center md:text-left md:flex justify-between items-baseline border-b border-white/5 pb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3.5xl font-bold italic text-limon-gold leading-none">
                  {activeCategory.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1.5">{activeCategory.subtitle}</p>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#5f6b43] font-bold hidden md:block">
                Region-exclusive certification
              </span>
            </div>

            {/* Wine Cards grid layout with bottle shapes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="wine-cards-container">
              {activeCategory.items.map((item, key) => (
                <div
                  key={key}
                  className="bg-[#1a1b15]/60 hover:bg-[#1e2018]/90 border border-white/5 rounded-2xl p-6 sm:p-8 transition-all duration-300 relative group flex items-start gap-5 hover:border-limon-gold/30 hover:shadow-gold-heavy hover:translate-y-[-2px] overflow-hidden"
                >
                  {/* Glowing vertical lines for visual decoration */}
                  <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-limon-gold/0 to-limon-gold/0 group-hover:to-limon-gold/70 transition-all duration-500" />

                  {/* Bottle Icon backdrop representing product placement */}
                  <div className="w-16 h-28 rounded-xl bg-limon-dark/95 border border-white/5 flex flex-col items-center justify-center relative shrink-0">
                    <span className="text-3xl filter saturate-[0.8] brightness-[0.9]">🍾</span>
                    {item.vintage && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-widest text-limon-gold/80 bg-black/60 px-1 rounded-sm">
                        {item.vintage}
                      </span>
                    )}
                  </div>

                  {/* Wine details content */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-limon-yellow transition-colors duration-300">
                        {item.name}
                      </h4>
                      
                      {/* Price indicator badges */}
                      <div className="flex gap-2 shrink-0 items-center mt-1 sm:mt-0">
                        {item.priceGlass && (
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-limon-gold/10 text-limon-gold border border-limon-gold/30 px-2 py-0.5 rounded-full">
                            Glass {item.priceGlass}
                          </span>
                        )}
                        <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-400 text-neutral-950 px-2 py-0.5 rounded-full shadow-md">
                          Bt. {item.priceBottle}
                        </span>
                      </div>
                    </div>

                    {/* Wine origin descriptors */}
                    {item.region && (
                      <p className="text-[10px] italic tracking-wider text-limon-yellow flex items-center gap-1.5 font-light">
                        <Globe className="w-3 h-3" />
                        {item.region}
                      </p>
                    )}

                    {/* Detailed Sommelier taste description */}
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* --- PREMIUM CELLAR FOOTER SIGNAGE --- */}
        <div className="mt-16 text-center border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-limon-gold/10 flex items-center justify-center border border-limon-gold/30">
              <Award className="w-5 h-5 text-limon-yellow" />
            </div>
            <div className="text-left">
              <h5 className="font-serif text-sm font-semibold">Decanter World Wine Award Reseller</h5>
              <p className="text-[9px] uppercase tracking-widest text-[#5f6b43]">Cellar ID: MB-994226</p>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 max-w-xl font-light text-center md:text-right leading-relaxed">
            * Reserve corkage service is hosted at a standard $45 fee. Wine selections are subject to natural seasonal and vintage updates without prior public notification.
          </p>
        </div>

      </div>
    </section>
  );
}
