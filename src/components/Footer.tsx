import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Send, Sparkles, Check, Phone, Shield } from 'lucide-react';
import { LOCATION_DATA } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  selectedLocation?: 'miami' | 'doral';
}

export default function Footer({ onNavigate, selectedLocation = 'miami' }: FooterProps) {
  const currentLoc = LOCATION_DATA[selectedLocation];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubscribeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Our Menu', id: 'menu' },
    { name: 'Book a Table', id: 'book-table' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <footer className="bg-limon-dark text-white pt-20 pb-8 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP LEVEL: Branding + Nav Lists + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5 items-start">
          
          {/* BRAND COL (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group inline-flex"
            >
              <span className="text-3xl transition-transform duration-500 group-hover:rotate-12 select-none">🍋</span>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-wider text-white">Limoncello</h3>
                <p className="text-[9px] uppercase tracking-widest text-[#f5f2e6]/50">{currentLoc.slogan}</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Limoncello recreates heritage Italian recipe collections, marrying Amalfi coast luxury with the oceanfront vitality of Miami Beach.
            </p>

            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-limon-gold hover:text-white border border-white/10 text-neutral-300 flex items-center justify-center transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            
            {/* Sitemap column */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold tracking-wider text-limon-yellow">Nostra Casa</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onNavigate(link.id)}
                      className="text-xs text-neutral-400 hover:text-limon-gold cursor-pointer transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inquire column */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold tracking-wider text-limon-yellow">Inquiries</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:3053978226"
                    className="text-xs text-neutral-400 hover:text-limon-gold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Concierge</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="text-xs text-neutral-400 hover:text-limon-gold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* NEWSLETTER (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-limon-yellow flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Inscriviti ai Pranzi (Join Tasting List)
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Stay updated on weekly sommelier reserves, private garden dinner menus, and closed truffle tastings on Miami Beach.
            </p>

            <form onSubmit={handleSubscribeSubmit} className="relative max-w-sm" id="newsletter-subscription">
              <input
                type="email"
                placeholder="Submit your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full bg-[#1e1f1a] text-xs text-white placeholder-neutral-500 rounded-full py-3.5 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-limon-gold border border-white/10"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 w-10 h-10 rounded-full bg-limon-gold hover:bg-amber-400 text-white hover:text-neutral-900 transition-colors flex items-center justify-center cursor-pointer disabled:bg-emerald-600"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-emerald-400 font-semibold"
                >
                  ✓ Grazie, you have been added to our secret tasting book.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* BOTTOM LEVEL: Copyright & Location codes */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-4">
          <div className="flex items-center gap-1.5">
            <span>© 🍋 Limoncello Miami 2026. All rights preserved.</span>
          </div>

          <div className="flex gap-4">
            <span>{currentLoc.address}</span>
            <span>•</span>
            <a href={`tel:${currentLoc.phoneRaw}`} className="hover:text-white transition-colors">{currentLoc.phone}</a>
          </div>
        </div>

      </div>

      {/* --- PRIVACY POLICY POPOVER MODAL --- */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-limon-dark/80 backdrop-blur-sm"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-limon-dark rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-limon-cream relative"
            >
              <button
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#fbfaf5] text-limon-dark hover:text-[#c4a04d] flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold border-b border-limon-beige pb-3">Privacy Rules & Policies</h3>
                <p className="text-xs text-limon-muted leading-relaxed">
                  Limoncello Miami operates strictly around protecting guest records. Any details, phone numbers, or email listings submitted through our Table Booker or Newsletter interfaces are logged in client credentials databases and never distributed to third party resellers.
                </p>
                <p className="text-xs text-limon-muted leading-relaxed">
                  Bookings logs are stored encrypted for standard reservation tracking and contact updates on Washington Ave. No browser cookies or location coordinates are read without your explicit click clearances.
                </p>
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setShowPrivacy(false)}
                    className="px-6 py-2 bg-limon-gold hover:bg-limon-dark text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
