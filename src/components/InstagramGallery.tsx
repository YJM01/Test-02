import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Heart, MessageCircle, Eye, Share2, Sparkles } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data';
import { InstagramPost } from '../types';

export default function InstagramGallery() {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  return (
    <section id="instagram" className="py-24 sm:py-32 bg-limon-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Caption layout */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-limon-olive block">Social Footprints</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-limon-dark">
            #LimoncelloMiami
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-limon-gold to-transparent mx-auto" />
          <p className="text-xs sm:text-sm text-limon-muted font-light leading-relaxed">
            Witness the culinary spectacles, candlelit proposals, and dynamic spritz cocktail moments shared by our guests on South Beach.
          </p>
        </div>

        {/* --- GRID GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="insta-grid-collage">
          {INSTAGRAM_POSTS.map((post) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-premium border border-limon-cream cursor-pointer"
            >
              <img
                src={post.imageUrl}
                alt="Instagram Food Styling"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Overlay shading representing social interface */}
              <div className="absolute inset-0 bg-limon-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white" />

              {/* Social markers */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white z-10 pointer-events-none">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#f5f2e6] flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-limon-yellow" />
                    Limoncello
                  </span>
                  <Share2 className="w-3.5 h-3.5 text-white/80" />
                </div>

                {/* Engagement counts */}
                <div className="space-y-2">
                  <div className="flex gap-4 items-center">
                    <span className="flex items-center gap-1.5 text-xs font-semibold">
                      <Heart className="w-4 h-4 fill-limon-yellow text-limon-yellow" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold">
                      <MessageCircle className="w-4 h-4 fill-white text-white" />
                      {post.comments}
                    </span>
                  </div>
                  <p className="text-[10px] font-light text-neutral-200 line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- LIGHTBOX OVERLAY DIALOG MODAL --- */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-limon-dark/80 backdrop-blur-md"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-limon-cream relative grid grid-cols-1 md:grid-cols-12"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 text-limon-dark hover:text-limon-gold flex items-center justify-center font-bold shadow-lg cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                {/* Left image column */}
                <div className="md:col-span-7 bg-black aspect-square md:aspect-auto md:h-[480px]">
                  <img
                    src={selectedPost.imageUrl}
                    alt="Instagram Plating"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right commentary details column */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-limon-soft">
                  <div className="space-y-6">
                    {/* Brand header */}
                    <div className="flex gap-3 items-center border-b border-limon-beige pb-4">
                      <span className="text-2xl">🍋</span>
                      <div>
                        <h4 className="font-serif font-bold text-sm tracking-wide">limoncellomiami</h4>
                        <p className="text-[9px] uppercase tracking-widest text-limon-olive">Miami Beach, Florida</p>
                      </div>
                    </div>

                    {/* Description and hashtags */}
                    <div className="space-y-2">
                      <p className="text-xs text-limon-dark/90 leading-relaxed font-light">
                        {selectedPost.caption}
                      </p>
                      <p className="text-[10px] font-bold text-limon-gold font-mono">
                        #MiamiBeachFoodies #Limoncello #PositanoPlates
                      </p>
                    </div>
                  </div>

                  {/* Engagement specs card */}
                  <div className="border-t border-limon-beige pt-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex gap-3 items-center font-semibold">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          {selectedPost.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-limon-gold fill-limon-cream" />
                          {selectedPost.comments}
                        </span>
                      </div>
                      <span className="text-[9px] text-[#5f6b43] font-bold">Verified Moments</span>
                    </div>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-limon-dark text-white rounded-xl text-[10px] font-bold uppercase tracking-widest text-center block hover:bg-limon-gold transition-colors"
                    >
                      Follow @limoncellomiami
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
