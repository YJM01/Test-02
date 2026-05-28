import { motion } from 'motion/react';
import { Sparkles, Award, Heart, Shield } from 'lucide-react';
import { LOCATION_DATA } from '../types';

interface AboutProps {
  onNavigate: (sectionId: string) => void;
  selectedLocation?: 'miami' | 'doral';
}

export default function About({ onNavigate, selectedLocation = 'miami' }: AboutProps) {
  const currentLoc = LOCATION_DATA[selectedLocation];

  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-limon-gold" />,
      title: 'Handmade Daily',
      text: 'Every noodle, ravioli, and gnocchi is rolled in-house at dawn under the supervision of Chef Cellini.'
    },
    {
      icon: <Award className="w-5 h-5 text-limon-gold" />,
      title: 'Michelin Standards',
      text: 'Leveraging genuine DOP ingredients imported weekly from the sun-drenched fields of Puglia and Sicily.'
    },
    {
      icon: <Heart className="w-5 h-5 text-limon-gold" />,
      title: 'Mediterranean Love',
      text: `Uniting traditional recipes passed through centuries with modern aesthetics and ${currentLoc.name} vitality.`
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-limon-soft relative overflow-hidden">
      {/* Decorative vertical background texts */}
      <div className="absolute right-0 top-1/4 select-none opacity-[0.02] transform rotate-90 origin-right pointer-events-none hidden lg:block">
        <span className="font-serif text-[120px] font-bold text-limon-dark tracking-widest uppercase">ITALIA</span>
      </div>
      <div className="absolute left-4 bottom-10 select-none opacity-[0.02] pointer-events-none hidden lg:block">
        <span className="font-serif text-[120px] font-bold text-limon-dark tracking-widest uppercase">AMALFI</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: Cinematic Images Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 relative">
              {/* Back Soft yellow decorative block */}
              <div className="absolute -inset-4 bg-limon-cream/30 rounded-3xl -z-10 filter blur-xl transform -rotate-1" />

              {/* Main image: Pasta Rolling */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="col-span-8 overflow-hidden rounded-2xl shadow-premium aspect-[4/5] relative group"
                id="about-img-primary"
              >
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
                  alt="Artisanal Pasta Preparation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-limon-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] uppercase tracking-widest text-[#fbd64d] font-bold">In Our Kitchen</p>
                  <h4 className="font-serif text-base font-semibold">Rolling Fresh Pasta daily</h4>
                </div>
              </motion.div>

              {/* Offset Image: Lemon Citruses/Ambiance */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="col-span-4 self-center space-y-4"
              >
                <div className="overflow-hidden rounded-xl shadow-premium aspect-square group relative" id="about-img-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=600"
                    alt="Burrata and Tomatoes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-premium aspect-[3/4] group relative" id="about-img-tertiary">
                  <img
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600"
                    alt="Mediterranean Ingredients"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-limon-olive/10 mix-blend-multiply" />
                </div>
              </motion.div>
            </div>

            {/* Overlap Badges */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -bottom-6 -right-6 md:right-12 bg-white p-6 rounded-2xl shadow-gold-heavy border border-limon-cream max-w-[200px] text-center hidden sm:block"
            >
              <span className="text-4xl block mb-2 font-serif font-bold text-limon-gold">100%</span>
              <span className="text-xs font-semibold tracking-wider uppercase text-limon-dark block">D.O.P Certified</span>
              <span className="text-[10px] text-limon-muted block mt-1">Imported Italian Ingredients</span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Premium Storytelling Text */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-limon-olive block">Our Heritage</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-limon-dark leading-tight" id="about-title">
                The Romance of the South, <br />
                <span className="italic text-limon-gold font-medium">Breathed in {currentLoc.name}</span>
              </h2>
              <div className="w-16 h-1 bg-limon-gold/40 rounded" />
            </div>

            <p className="text-limon-dark/80 text-base leading-relaxed font-light">
              Founded on the belief that fine dining is a theater of senses, <strong className="font-semibold text-limon-dark">Limoncello</strong> brings Amalfi’s legendary culinary romance directly to {currentLoc.fullName}. We marry authentic flavors of Campania and Apulia with the vibrant energy of coastal Florida.
            </p>

            <blockquote className="border-l-4 border-limon-gold pl-4 italic text-limon-muted py-2 font-serif text-lg bg-limon-beige/40 rounded-r-xl pr-3">
              “Mediterranean sunshine in every bite, coastal breeze in every pour. We don’t just serve recipes, we recreate family memories.”
              <span className="block text-right text-xs font-semibold uppercase tracking-widest text-limon-dark mt-2 font-sans">— Chef Cellini, Executive Chef</span>
            </blockquote>

            {/* Structured Value Props */}
            <div className="space-y-6 pt-2">
              {values.map((val, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-limon-beige/60 flex items-center justify-center border border-limon-gold/15">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-limon-dark">{val.title}</h3>
                    <p className="text-xs text-limon-muted mt-1 leading-relaxed">{val.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('menu')}
                className="px-6 py-3.5 bg-limon-gold hover:bg-[#b5923f] text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all shadow-premium hover:shadow-gold-heavy cursor-pointer"
                id="about-menu-button"
              >
                View Our Culinary Offerings
              </button>
              
              <button
                onClick={() => onNavigate('book-table')}
                className="px-6 py-3.5 bg-transparent border border-limon-gold/40 hover:border-limon-dark hover:bg-limon-beige text-limon-dark font-semibold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer"
                id="about-reserve-button"
              >
                Book A Dinner Experience
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
