import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Autoplay intervals
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-limon-beige/30 relative overflow-hidden">
      {/* Decorative radial background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#c4a04d_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Caption */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-limon-olive block">Guest Experiences</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-limon-dark">
            What Guests Say
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-limon-gold to-transparent mx-auto" />
        </div>

        {/* --- CAROUSEL DISPLAY LAYER --- */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white rounded-3xl p-8 sm:p-14 shadow-premium border border-limon-cream max-w-4xl w-full relative"
              id={`testimonial-card-${activeIdx}`}
            >
              {/* Double quotation watermark background */}
              <Quote className="absolute right-8 top-8 w-24 h-24 text-limon-cream/35 rotate-180 pointer-events-none hidden sm:block" />

              <div className="space-y-6">
                
                {/* 5 Golden Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(TESTIMONIALS[activeIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-limon-yellow text-limon-yellow" />
                  ))}
                </div>

                {/* Review Text block */}
                <blockquote className="font-serif text-lg sm:text-2xl text-limon-dark leading-relaxed italic pr-4">
                  {TESTIMONIALS[activeIdx].text}
                </blockquote>

                {/* Author Credentials */}
                <div className="flex items-center gap-4 pt-4 border-t border-limon-beige/60">
                  <div className="w-12 h-12 rounded-full bg-limon-cream/60 flex items-center justify-center font-bold font-serif text-limon-gold border border-limon-yellow/20">
                    {TESTIMONIALS[activeIdx].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-limon-dark">{TESTIMONIALS[activeIdx].name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-[#5f6b43] font-bold mt-0.5">{TESTIMONIALS[activeIdx].role}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- DOTS INDICATORS AND MANUAL JUMP ARROWS --- */}
        <div className="flex justify-between items-center mt-8 w-full max-w-xs mx-auto">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white hover:bg-limon-gold hover:text-white border border-[#f5f2e6] text-limon-dark shadow-md cursor-pointer transition-colors"
            id="testimonial-prev"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Bullet buttons */}
          <div className="flex gap-2.5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIdx === idx ? 'bg-limon-gold px-3' : 'bg-limon-beige hover:bg-limon-yellow'
                }`}
                aria-label={`Jump to review ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white hover:bg-limon-gold hover:text-white border border-[#f5f2e6] text-limon-dark shadow-md cursor-pointer transition-colors"
            id="testimonial-next"
            aria-label="Next Review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
