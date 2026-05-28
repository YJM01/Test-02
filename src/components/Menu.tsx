import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, SlidersHorizontal, Eye, Heart } from 'lucide-react';
import { FOOD_MENU, BEVERAGES_MENU, HAPPY_HOUR_MENU } from '../data';
import { MenuItem } from '../types';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'food' | 'beverage' | 'happyhour'>('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Subcategories configuration based on data structures
  const subCategories = useMemo(() => {
    if (activeTab === 'food') {
      return [
        { name: 'All Dishes', id: 'all' },
        { name: 'Appetizers', id: 'appetizers' },
        { name: 'Chef Recommendations', id: 'recommendations' },
        { name: 'Handcrafted Pastas', id: 'pasta' },
        { name: 'Elegant Mains', id: 'main' },
        { name: 'Fresh Salads', id: 'salads' },
        { name: 'Blistered Pizzas', id: 'pizza' },
        { name: 'Artisanal Sides', id: 'sides' }
      ];
    } else if (activeTab === 'beverage') {
      return [
        { name: 'All Liquids', id: 'all' },
        { name: 'Soft Beverages', id: 'beverages' },
        { name: 'Signature Cocktails', id: 'cocktails' }
      ];
    } else {
      return [
        { name: 'Sip & Savor (Happy Hour)', id: 'all' }
      ];
    }
  }, [activeTab]);

  // Reset subcategory selection when switching primary tabs
  const handleTabChange = (tab: 'food' | 'beverage' | 'happyhour') => {
    setActiveTab(tab);
    setSelectedSubCategory('all');
    setSearchQuery('');
  };

  // Extract relevant menu items list based on selected active category
  const sourceMenu = useMemo(() => {
    if (activeTab === 'food') return FOOD_MENU;
    if (activeTab === 'beverage') return BEVERAGES_MENU;
    return HAPPY_HOUR_MENU;
  }, [activeTab]);

  // Process filters dynamically
  const filteredMenuItems = useMemo(() => {
    return sourceMenu.filter((item) => {
      // 1. Filter by category pill
      if (selectedSubCategory !== 'all' && item.category !== selectedSubCategory) {
        return false;
      }
      // 2. Filter by popularity toggle
      if (showPopularOnly && !item.isPopular && !item.tags?.includes('Signature')) {
        return false;
      }
      // 3. Filter by search query text
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [sourceMenu, selectedSubCategory, showPopularOnly, searchQuery]);

  return (
    <section id="menu" className="py-24 sm:py-32 bg-limon-beige/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#c4a04d_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-limon-olive block">Exquisite Offerings</span>
          <h2 className="font-serif text-4xl sm:text-6.5xl font-bold tracking-tight text-limon-dark" id="menu-header-title">
            Our Menu
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-limon-gold to-transparent mx-auto" />
          <p className="text-limon-muted text-sm sm:text-base font-light leading-relaxed">
            “From classic pasta dishes bursting with Mediterranean charm to succulent seafood specialties, each plate is culinary poetry crafted with care, sun, and passion.”
          </p>
        </div>

        {/* --- MAIN TABS SWITCHER (Food, beverages, happyhour) --- */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/70 p-1.5 rounded-full border border-limon-gold/20 shadow-premium">
            <button
              onClick={() => handleTabChange('food')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase cursor-pointer transition-all ${
                activeTab === 'food'
                  ? 'bg-limon-gold text-white shadow-premium'
                  : 'text-limon-dark hover:text-limon-gold'
              }`}
              id="menu-tab-food"
            >
              🍝 Food
            </button>
            <button
              onClick={() => handleTabChange('beverage')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase cursor-pointer transition-all ${
                activeTab === 'beverage'
                  ? 'bg-limon-gold text-white shadow-premium'
                  : 'text-limon-dark hover:text-limon-gold'
              }`}
              id="menu-tab-beverages"
            >
              🍷 Beverages
            </button>
            <button
              onClick={() => handleTabChange('happyhour')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase cursor-pointer transition-all ${
                activeTab === 'happyhour'
                  ? 'bg-limon-gold text-white shadow-premium font-sans'
                  : 'text-limon-dark hover:text-limon-gold'
              }`}
              id="menu-tab-happy-hour"
            >
              ☀️ Happy Hour
            </button>
          </div>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-premium border border-limon-gold/15 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input field */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-limon-gold w-4 h-4" />
              <input
                type="text"
                placeholder="Search menu (e.g. 'truffle', 'burrata', 'mussels')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fbfaf5]/50 border border-limon-gold/20 rounded-full py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-limon-yellow focus:ring-1 focus:ring-limon-yellow transition-all"
                id="menu-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider font-semibold text-limon-olive hover:text-limon-dark"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular/Signature Highlight Toggle key */}
            <div className="flex items-center gap-3 self-center sm:self-auto">
              <label 
                className="relative inline-flex items-center cursor-pointer select-none"
                id="popular-only-checkbox"
              >
                <input
                  type="checkbox"
                  checked={showPopularOnly}
                  onChange={(e) => setShowPopularOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-[#f5f2e6] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-limon-gold"></div>
                <span className="ml-3 text-xs font-semibold tracking-wider uppercase text-limon-dark flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-limon-gold" />
                  Signatures Only
                </span>
              </label>
            </div>
          </div>

          {/* Sub-categories Pills (e.g. Appetizers, Pasta, Pizzas) */}
          {subCategories.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-limon-beige/60 justify-center">
              {subCategories.map((subCat) => (
                <button
                  key={subCat.id}
                  onClick={() => setSelectedSubCategory(subCat.id)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedSubCategory === subCat.id
                      ? 'bg-limon-dark text-white shadow-premium'
                      : 'bg-limon-soft hover:bg-limon-cream text-limon-dark/80 hover:text-limon-gold'
                  }`}
                >
                  {subCat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- GRID OF PRODUCTS (Filtered dynamically) --- */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          id="menu-items-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenuItems.map((item) => {
              const matchesHighlights = item.isPopular || item.tags?.includes('Signature') || item.tags?.includes('Michelin Favorite');
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-500 group relative flex flex-col justify-between ${
                    matchesHighlights
                      ? 'border-limon-yellow/40 shadow-gold-heavy hover:ring-2 hover:ring-limon-yellow/40'
                      : 'border-limon-beige hover:border-limon-gold/30 hover:rounded-2xl shadow-premium hover:shadow-gold-heavy'
                  }`}
                >
                  <div>
                    {/* MenuItem Header Image (Lazy aspect ratio) */}
                    {item.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden bg-limon-beige">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                        
                        {/* Overlay tags badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                          {item.tags?.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase bg-limon-yellow text-limon-dark rounded-full shadow-premium"
                            >
                              ✨ {tag}
                            </span>
                          ))}
                          {item.isPopular && (
                            <span className="px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase bg-limon-gold text-white rounded-full shadow-premium">
                              ⭐ Popular
                            </span>
                          )}
                        </div>

                        {/* Interactive magnifying glass hover */}
                        <div 
                          onClick={() => setSelectedItem(item)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 pointer-events-auto"
                        >
                          <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-xs text-limon-dark font-semibold tracking-wider shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform">
                            <Eye className="w-3.5 h-3.5 text-limon-gold" />
                            View details
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Minimal text-only top highlight when image is absent */
                      <div className="p-1 pl-6 pt-5 bg-gradient-to-r from-limon-cream to-transparent h-2.5" />
                    )}

                    {/* Meta info wrapper */}
                    <div className="p-6">
                      <div className="flex items-baseline justify-between mb-2 gap-3">
                        <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-limon-dark group-hover:text-limon-gold transition-colors duration-300">
                          {item.name}
                        </h3>
                        <span className="font-serif text-lg font-bold text-limon-gold shrink-0">
                          {item.price}
                        </span>
                      </div>

                      {/* Description and detail summary */}
                      <p className="text-xs text-limon-muted leading-relaxed font-light line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Standard Card Footer with direct details button & lemon flower details */}
                  <div className="p-6 pt-0 flex items-center justify-between border-t border-limon-beige/30 mt-auto">
                    <span className="text-[9px] uppercase tracking-widest text-[#5f6b43] font-medium block">
                      Category: {item.category}
                    </span>
                    
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="text-xs font-semibold text-limon-gold group-hover:text-limon-dark hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      Recipe details &rarr;
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Prompt fallback */}
        {filteredMenuItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-limon-cream p-12 max-w-lg mx-auto"
          >
            <span className="text-4xl block mb-4">🍋</span>
            <h4 className="font-serif text-xl font-bold text-limon-dark mb-2">No delicacies found</h4>
            <p className="text-xs text-limon-muted mb-6 leading-relaxed">
              We couldn't locate any matches for "{searchQuery}". Kindly try searching other terms such as "pasta", "burrata", "spritz" or "meatballs".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubCategory('all');
                setShowPopularOnly(false);
              }}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-limon-gold text-white rounded-full transition-transform hover:scale-105"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Dynamic Booking Invitation Banner card layout */}
        <div className="mt-20 bg-gradient-to-br from-limon-beige to-white rounded-3xl p-8 sm:p-12 border border-limon-gold/20 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-limon-olive block">Dining Special</span>
            <h3 className="font-serif text-2xl sm:text-3.5xl font-bold tracking-tight text-limon-dark">
              Are you planning a Private Gathering?
            </h3>
            <p className="text-xs text-limon-muted max-w-xl font-light leading-relaxed">
              From business receptions on Washington Ave to intimate Italian family birthday meals, Limoncello accommodates custom curated menus and reserved luxury lounge areas.
            </p>
          </div>
          <button
            onClick={() => {
              const target = document.getElementById('book-table');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full md:w-auto shrink-0 px-8 py-4 bg-limon-dark hover:bg-limon-gold text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-premium"
          >
            Reach our Booking Coordinator
          </button>
        </div>

      </div>

      {/* --- FLOATING DETAIL OVERLAY MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-limon-dark/70 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-limon-soft rounded-3xl overflow-hidden max-w-2xl w-full shadow-gold-heavy border border-limon-yellow/20 relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-limon-dark hover:text-limon-gold shadow-md flex items-center justify-center font-bold cursor-pointer transition-colors"
                aria-label="Close details"
              >
                ✕
              </button>

              {selectedItem.image && (
                <div className="aspect-[16/9] w-full relative">
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-limon-soft via-transparent to-transparent" />
                </div>
              )}

              <div className="p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#5f6b43] font-bold block mb-1">
                      {selectedItem.category} // {selectedItem.menuType} Offerings
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-limon-dark">
                      {selectedItem.name}
                    </h3>
                  </div>
                  <span className="font-serif text-2xl font-bold text-limon-gold bg-white px-4 py-1 rounded-xl shadow-premium">
                    {selectedItem.price}
                  </span>
                </div>

                <p className="text-sm font-light text-limon-dark/80 leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                {/* Craftsmanship ingredients description block */}
                <div className="bg-white rounded-2xl p-4 border border-limon-beige space-y-3 mb-6 shadow-premium">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-limon-dark flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-limon-gold" />
                    Fine Dining Spec Sheet
                  </h4>
                  <ul className="text-xs text-limon-muted space-y-1.5 font-light leading-relaxed pl-5 list-disc">
                    <li>Authentic Italian D.O.P. or local farm-harvested organic ingredients.</li>
                    <li>Prepared fresh in-kitchen strictly around ordering times.</li>
                    <li>For custom allergens or nutritional variations, inform our sommelier contextually.</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      const target = document.getElementById('book-table');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-3.5 bg-limon-gold hover:bg-[#b5923f] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all text-center cursor-pointer"
                  >
                    Order as dinner setting (Pre-book Now)
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-3.5 border border-limon-gold/30 hover:bg-limon-beige rounded-full text-xs font-bold uppercase tracking-widest text-limon-dark cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
