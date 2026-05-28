import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Flame, Sparkles, CheckCircle2, Phone, HelpCircle } from 'lucide-react';
import { ReservationData } from '../types';

export default function BookTable() {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    partySize: 2,
    date: new Date().toISOString().split('T')[0],
    time: '7:30 PM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', 
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'partySize' ? parseInt(value) : value
    }));
    // Remove error highlights dynamically
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email.';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone contact number is required.';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      tempErrors.phone = 'Provide a valid phone number.';
    }
    if (!formData.date) tempErrors.date = 'Reservation date is required.';
    if (!formData.time) tempErrors.time = 'Preferred dinner slot is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulate luxury API gateway post/validate delay is 1500ms
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      partySize: 2,
      date: new Date().toISOString().split('T')[0],
      time: '7:30 PM',
      message: ''
    });
    setSuccess(false);
  };

  return (
    <section id="book-table" className="py-24 sm:py-32 bg-limon-soft relative overflow-hidden">
      
      {/* Decorative Mediterranean Lemon elements in background */}
      <div className="absolute top-[20%] left-[-15vw] w-[45vw] h-[45vw] rounded-full bg-limon-yellow/5 filter blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15vw] w-[35vw] h-[35vw] rounded-full bg-limon-olive/5 filter blur-[100px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title elements */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-limon-olive block">Reservations Lounge</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-limon-dark">
            Book a Table
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-limon-gold to-transparent mx-auto" />
          <p className="text-xs sm:text-sm text-limon-muted font-light leading-relaxed">
            Allow us to roll out the red carpet of Italian fine dining hospitality for your evening. Secure an exquisite reservation setting or table in our candlelit courtyard.
          </p>
        </div>

        {/* --- DUAL GRID PANELS: Text Info card + Booking Form card --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT COLUMN PANEL: Luxury Ambiance Card details */}
          <div className="lg:col-span-4 bg-limon-dark text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-gold-heavy min-h-[350px]">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
                alt="Courtyard"
                className="w-full h-full object-cover object-center opacity-10 filter sepia(0.2) grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-limon-dark/90 via-limon-dark to-limon-dark/95" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🍋</span>
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-wide">Limoncello</h3>
                  <p className="text-[8px] uppercase tracking-widest text-[#facc15] font-semibold">Fine Dining Miami</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div>
                  <h4 className="font-serif text-base font-bold text-limon-yellow italic">Dress Code</h4>
                  <p className="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed">
                    Smart-casual elegant. Active beachwear, tank tops, and generic athletic wear are restricted within main salons.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-limon-yellow italic">Larger Bookings</h4>
                  <p className="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed">
                    For groups larger than 10, call our concierge desk directly at <a href="tel:3053978226" className="font-semibold text-white hover:text-limon-gold hover:underline">(305) 397-8226</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/5 space-y-3">
              <p className="text-[10px] text-neutral-400 tracking-wider">
                📍 1334 Washington Ave, Miami Beach, FL 33139
              </p>
              <p className="text-[10px] text-neutral-400 tracking-wider">
                ⏰ Monday - Sunday: 12:00 PM - 11:45 PM
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN PANEL: Form container with success modal overlays */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 shadow-premium border border-limon-cream relative overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
              {!success ? (
                /* RESEVATION FORM SCREEN */
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookingSubmit}
                  className="space-y-6"
                  noValidate
                  id="restaurant-booking-form"
                >
                  <div className="flex justify-between items-center pb-4 border-b border-limon-beige">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-limon-dark">Table Configuration</h3>
                      <p className="text-[10px] text-limon-muted">Requesting real-time slot clearance (* fields required)</p>
                    </div>
                    <span className="text-[10px] bg-limon-cream text-limon-olive px-3 py-1 font-semibold tracking-wider rounded-full uppercase">
                      Direct Book
                    </span>
                  </div>

                  {/* 1. ROW: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="booking-name" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        name="name"
                        placeholder="e.g. Alessandro Rossi"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-[#fbfaf5]/50 border rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                            : 'border-limon-gold/20 focus:border-limon-gold focus:ring-limon-gold'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] font-medium text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="booking-email" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Email Address *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        name="email"
                        placeholder="e.g. alessandro@rossi.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-[#fbfaf5]/50 border rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                          errors.email
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                            : 'border-limon-gold/20 focus:border-limon-gold focus:ring-limon-gold'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] font-medium text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  {/* 2. ROW: Phone & Party Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="booking-phone" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Phone Number *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        placeholder="e.g. (305) 555-1234"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-[#fbfaf5]/50 border rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                          errors.phone
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                            : 'border-limon-gold/20 focus:border-limon-gold focus:ring-limon-gold'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] font-medium text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="booking-party" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Party Size
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-limon-gold w-4 h-4 pointer-events-none" />
                        <select
                          id="booking-party"
                          name="partySize"
                          value={formData.partySize}
                          onChange={handleInputChange}
                          className="w-full bg-[#fbfaf5]/50 border border-limon-gold/20 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-limon-gold focus:ring-1 focus:ring-limon-gold transition-all appearance-none"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5">5 People</option>
                          <option value="6">6 People</option>
                          <option value="8">8 People (Subject to Confirmation)</option>
                          <option value="10">10 People (Subject to Confirmation)</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-limon-gold font-bold pointer-events-none text-[10px]">▼</div>
                      </div>
                    </div>
                  </div>

                  {/* 3. ROW: Date & Time Select */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="booking-date" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Date *
                      </label>
                      <div className="relative">
                        <input
                          id="booking-date"
                          type="date"
                          name="date"
                          value={formData.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={handleInputChange}
                          className={`w-full bg-[#fbfaf5]/50 border rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                            errors.date
                              ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                              : 'border-limon-gold/20 focus:border-limon-gold focus:ring-limon-gold'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="booking-time" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Dinner Time *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-limon-gold w-4 h-4 pointer-events-none" />
                        <select
                          id="booking-time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full bg-[#fbfaf5]/50 border border-limon-gold/20 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-limon-gold focus:ring-1 focus:ring-limon-gold transition-all appearance-none"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-limon-gold font-bold pointer-events-none text-[10px]">▼</div>
                      </div>
                    </div>
                  </div>

                  {/* Message/Special request textbox */}
                  <div className="space-y-2">
                    <label htmlFor="booking-message" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                      Special Requests / Dietaries (Optional)
                    </label>
                    <textarea
                      id="booking-message"
                      name="message"
                      rows={3}
                      placeholder="Let us know if you are celebrating a special occasion, require a wheelchair accessible table, or have severe nut allergies..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-[#fbfaf5]/50 border border-limon-gold/20 rounded-xl py-3 px-4 text-xs font-normal focus:outline-none focus:border-limon-gold focus:ring-1 focus:ring-limon-gold transition-all resize-none"
                    />
                  </div>

                  {/* Consent parameters labels */}
                  <p className="text-[10px] text-limon-muted italic font-light">
                    Fields marked with an * are required. Table hold time is exactly 15 minutes past the reserved slot.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-limon-gold hover:bg-limon-dark hover:shadow-gold-heavy rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 relative shadow-premium overflow-hidden"
                    id="submit-booking-button"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Verifying table clearances...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4 text-limon-yellow animate-pulse" />
                        <span>Confirm Reservation Setting</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* RESEVATION SUCCESS SCREEN SCREEN OVERLAY */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-10 space-y-6"
                  id="booking-success-screen"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-limon-beige flex items-center justify-center text-limon-gold border border-limon-gold shadow-gold-heavy relative"
                  >
                    <CheckCircle2 className="w-12 h-12 text-limon-gold fill-white" />
                    <div className="absolute inset-0 rounded-full bg-limon-gold/20 animate-ping -z-10" />
                  </motion.div>

                  <div className="space-y-2">
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-limon-olive block">Tavola Riservata!</span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-limon-dark">
                      Table Confirmed
                    </h3>
                    <p className="text-xs text-limon-muted max-w-md mx-auto leading-relaxed">
                      Grazie, Alessandro. Your premium dining alignment has been secured at. A digital clearance confirmation and SMS pass have been dispatched to your email address.
                    </p>
                  </div>

                  {/* Summary ticket mockup layout */}
                  <div className="w-full max-w-sm bg-limon-soft border border-limon-gold/20 rounded-2xl p-5 text-left font-sans space-y-4 shadow-premium relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-limon-yellow via-limon-gold to-limon-yellow" />
                    
                    <div className="grid grid-cols-2 gap-4 pb-3 border-b border-limon-beige/60">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-limon-muted block">Guest’s Name</span>
                        <strong className="text-xs font-semibold text-limon-dark block truncate">{formData.name}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-limon-muted block">Contact Phone</span>
                        <strong className="text-xs font-semibold text-limon-dark block truncate">{formData.phone}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-limon-muted block">Party Size</span>
                        <strong className="text-xs font-semibold text-limon-dark block">{formData.partySize} Guests</strong>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-limon-muted block">Reserved Date</span>
                        <strong className="text-xs font-semibold text-limon-dark block truncate">{formData.date}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-limon-muted block">Reserved Time</span>
                        <strong className="text-xs font-semibold text-limon-gold block">{formData.time}</strong>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-limon-beige/60 flex justify-between items-center bg-[#fbf6df]/10 p-2.5 rounded-lg border border-dashed border-limon-gold/20">
                      <span className="text-[9px] text-[#5f6b43] font-bold">Confirmation Reference Key:</span>
                      <span className="text-xs text-limon-dark font-mono font-bold tracking-widest">LC-99522</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3.5 bg-limon-gold text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-premium cursor-pointer"
                    >
                      Book another Dinner Session
                    </button>
                    <button
                      onClick={() => {
                        const target = document.getElementById('menu');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 bg-limon-dark text-white font-semibold text-xs uppercase tracking-widest rounded-full cursor-pointer transition-colors"
                    >
                      Browse Menu offerings
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
