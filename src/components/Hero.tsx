import { motion } from 'motion/react';
import { Calendar, UtensilsCrossed, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Config for the floating lemons
  const floatingLemons = [
    { id: 1, scale: 0.8, x: '-20%', y: '15%', delay: 0, rotate: -15, size: 'text-5xl sm:text-7xl' },
    { id: 2, scale: 1.1, x: '85%', y: '25%', delay: 1.5, rotate: 35, size: 'text-6xl sm:text-8xl' },
    { id: 3, scale: 0.9, x: '10%', y: '70%', delay: 0.8, rotate: 12, size: 'text-5xl sm:text-6xl' },
    { id: 4, scale: 0.7, x: '75%', y: '65%', delay: 2.2, rotate: -25, size: 'text-4xl sm:text-5xl' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-limon-dark py-20"
    >
      {/* Cinematic Ambiance Image Background with Darken & Warm gold overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920"
          alt="Limoncello Dinner Ambiance"
          className="w-full h-full object-cover object-center opacity-45 scale-105"
          style={{ filter: 'contrast(1.05) brightness(0.85) sepia(0.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-limon-dark/80 via-limon-dark/65 to-limon-soft" />
        <div className="absolute inset-0 bg-gradient-to-r from-limon-dark/50 via-transparent to-limon-dark/50" />
        
        {/* Soft floating warm ambient gold radial lights to build Michelin vibe */}
        <div className="absolute top-[30%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-limon-yellow/5 filter blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-limon-gold/5 filter blur-[100px] mix-blend-screen animate-pulse" />
      </div>

      {/* Floating interactive lemons (bobbing, drifting, glowing) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {floatingLemons.map((lemon) => (
          <motion.div
            key={lemon.id}
            initial={{ 
              x: lemon.x, 
              y: lemon.y, 
              rotate: lemon.rotate,
              opacity: 0 
            }}
            animate={{ 
              y: [ 'calc(' + lemon.y + ' - 20px)', 'calc(' + lemon.y + ' + 20px)', 'calc(' + lemon.y + ' - 20px)' ],
              rotate: [lemon.rotate - 10, lemon.rotate + 10, lemon.rotate - 10],
              opacity: [0.65, 0.85, 0.65]
            }}
            transition={{
              duration: 7 + lemon.id * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: lemon.delay,
            }}
            className={`absolute ${lemon.size} glow-lemon select-none`}
            style={{ transformOrigin: 'center center' }}
          >
            🍋
          </motion.div>
        ))}
      </div>

      {/* Hero content card */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12 sm:mt-16">
        {/* Lemon Icon Ring with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="inline-flex items-center justify-center mb-6 w-16 h-16 rounded-full bg-[#fae8ff]/5 border border-limon-yellow/30 bg-limon-cream/20 shadow-premium"
        >
          <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)]">🍋</span>
        </motion.div>

        {/* Small subtitle tag */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.4em] text-limon-yellow font-bold mb-4"
        >
          Miami Beach Fine Dining
        </motion.p>

        {/* Huge Headline: Limoncello */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-3"
          id="hero-header-title"
          style={{ lineHeight: '0.9' }}
        >
          Limoncello
        </motion.h1>

        {/* Brand secondary headline */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-limon-cream tracking-wide italic mb-6 font-light opacity-90"
        >
          An Authentic Italian Experience in the heart of Miami Beach.
        </motion.h2>

        {/* Horizontal gold separator line with diamonds */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '120px', opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-limon-gold to-transparent mx-auto relative mb-6"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-limon-yellow rotate-45" />
        </motion.div>

        {/* Description line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-neutral-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Experience the true taste of Italy in the heart of Miami Beach. Masterfully crafted handmade pastas, hand-poured wines, and Mediterranean breeze.
        </motion.p>

        {/* Action Button Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => onNavigate('menu')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-limon-cream hover:border-limon-yellow text-limon-cream font-medium text-sm uppercase tracking-widest rounded-full hover:bg-limon-cream hover:text-limon-dark transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group shadow-premium"
            id="hero-menu-cta"
          >
            <UtensilsCrossed className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Explore Menu</span>
          </button>

          <button
            onClick={() => onNavigate('book-table')}
            className="w-full sm:w-auto px-8 py-4 bg-limon-gold hover:bg-[#b5923f] text-white font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-gold-heavy hover:scale-105 active:scale-95 group"
            id="hero-book-cta"
          >
            <Calendar className="w-4 h-4" />
            <span>Book A Table</span>
          </button>
        </motion.div>

        {/* Scroll indicator banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
          className="mt-16 sm:mt-24 cursor-pointer inline-flex flex-col items-center gap-1"
          onClick={() => onNavigate('about')}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-light">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5 text-limon-gold" />
        </motion.div>
      </div>

      {/* Decorative Mediterranean bottom border vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-limon-soft to-transparent z-10 pointer-events-none" />
    </section>
  );
}
