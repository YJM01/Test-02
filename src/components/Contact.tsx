import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { LOCATION_DATA } from '../types';

interface ContactProps {
  selectedLocation?: 'miami' | 'doral';
}

export default function Contact({ selectedLocation = 'miami' }: ContactProps) {
  const currentLoc = LOCATION_DATA[selectedLocation];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captchaInput: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateContact = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim()) tempErrors.message = 'Please type a brief feedback message.';
    
    // Captcha validation check "6 + 11 = 17"
    if (!formData.captchaInput) {
      tempErrors.captchaInput = 'Captcha challenge response is required.';
    } else if (formData.captchaInput.trim() !== '17') {
      tempErrors.captchaInput = 'Incorrect answer. Hint: 6 + 11 is 17.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSendMessageSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    setLoading(true);

    // Simulate luxury API gateway dispatch
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        captchaInput: ''
      });
    }, 1200);
  };

  const hoursList = selectedLocation === 'miami' ? [
    { day: 'Mon - Thu', hours: '5:00 PM – 10:30 PM' },
    { day: 'Friday', hours: '5:00 PM – 11:30 PM' },
    { day: 'Saturday', hours: '5:00 PM – 11:30 PM' },
    { day: 'Sunday', hours: '5:00 PM – 10:30 PM' }
  ] : [
    { day: 'Mon - Thu', hours: '4:30 PM – 10:00 PM' },
    { day: 'Friday', hours: '4:30 PM – 11:00 PM' },
    { day: 'Saturday', hours: '4:30 PM – 11:00 PM' },
    { day: 'Sunday', hours: '4:30 PM – 10:00 PM' }
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-limon-beige/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-limon-olive block font-sans">Reach our Salons</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-limon-dark">
            Our Location & Contact
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-limon-gold to-transparent mx-auto" />
          <p className="text-xs sm:text-sm text-limon-muted font-light leading-relaxed">
            Planning a visit to our {currentLoc.fullName}? View our opening hours, send a concierge message, or get directions.
          </p>
        </div>

        {/* --- MAIN COLLAGE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-collage-grid">
          
          {/* LEFT 5 COLS: Contact details, Opening hours, interactive styled Google Map */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* STYLISH DETAILS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                
                {/* Card 1: Address */}
                <div className="bg-white rounded-2xl p-5 border border-limon-cream shadow-premium flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-limon-cream text-limon-gold flex-shrink-0 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-limon-dark">Located at</h4>
                    <p className="text-xs font-light text-limon-muted leading-relaxed mt-1">
                      {currentLoc.address}
                    </p>
                  </div>
                </div>

                {/* Card 2: Phone & Email */}
                <div className="bg-white rounded-2xl p-5 border border-limon-cream shadow-premium flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-limon-cream text-limon-gold flex-shrink-0 flex items-center justify-center">
                    <Phone className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-limon-dark">Direct Lines</h4>
                    <p className="text-xs font-semibold text-limon-dark mt-1">
                      <a href={`tel:${currentLoc.phoneRaw}`} className="hover:text-limon-gold transition-colors">{currentLoc.phone}</a>
                    </p>
                    <p className="text-[10px] text-limon-muted mt-0.5">
                      <a href={`mailto:concierge@limoncello${selectedLocation}.com`} className="hover:underline">concierge@limoncello{selectedLocation}.com</a>
                    </p>
                  </div>
                </div>

              </div>

              {/* TIMINGS SCHEDULE LIST */}
              <div className="bg-white rounded-2xl p-6 border border-limon-cream shadow-premium space-y-4">
                <h4 className="font-serif font-bold text-sm tracking-wide text-limon-dark flex items-center gap-2">
                  <Clock className="w-4 h-4 text-limon-gold" />
                  Salons Opening Hours
                </h4>
                <div className="space-y-2 border-t border-limon-beige/60 pt-3">
                  {hoursList.map((slot) => (
                    <div key={slot.day} className="flex justify-between text-xs tracking-wide">
                      <span className="font-bold text-limon-dark">{slot.day}</span>
                      <span className="text-limon-muted font-mono">{slot.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* STYLISH GOOGLE MAP IFRAME CONTAINER */}
            <div className="rounded-2xl overflow-hidden border border-limon-cream shadow-premium h-64 relative group">
              <iframe
                title="Limoncello Italian Restaurant Google Map Location"
                src={selectedLocation === 'miami' 
                  ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5188806253457!2d-80.13327668497858!3d25.784813583626245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b48f9dcba1bf%3A0xe5f9b96495db3793!2s1334%20Washington%20Ave%2C%20Miami%20Beach%2C%20FL%2033139!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.222302302345!2d-80.33924772497746!3d25.806622833621455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9be7cd05809bb%3A0xe758dfa73ecd831d!2s8700%20NW%2036th%20St%2C%20Doral%2C%20FL%2033166!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                }
                className="w-full h-full border-0 grayscale saturate-50 contrast-125 focus:outline-none"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-[#1e1f1a]/95 text-white px-3 py-1.5 rounded-lg text-[9px] tracking-widest uppercase font-semibold border border-white/10 pointer-events-none group-hover:scale-95 transition-transform duration-300">
                🗺️ {selectedLocation === 'miami' ? 'Washington Avenue Parking Available' : 'Ample Estate Valet & Parking'}
              </div>
            </div>

          </div>

          {/* RIGHT 7 COLS: Elegant Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-premium border border-limon-cream flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex justify-between items-baseline border-b border-limon-beige pb-4">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-limon-dark">Send an Inquiry</h3>
                  <p className="text-[10px] text-limon-muted mt-1">Our concierge desk acts promptly on client notes</p>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#5f6b43] font-bold">Inquire Directly</span>
              </div>

              <AnimatePresence mode="wait">
                {!success ? (
                  /* INQUIRY FORM */
                  <form onSubmit={handleSendMessageSubmit} className="space-y-5" noValidate id="contact-inquiry-form">
                    
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Your Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="e.g. Isabella Vianelli"
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

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="e.g. isabella@vianelli.com"
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

                    {/* Message input */}
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">
                        How can we accommodate you? We hear you
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="Type your general inquiries, customized venue requests, food prep notes..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full bg-[#fbfaf5]/50 border rounded-xl py-3 px-4 text-xs font-medium focus:outline-none focus:ring-1 transition-all ${
                          errors.message
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                            : 'border-limon-gold/20 focus:border-limon-gold focus:ring-limon-gold'
                        }`}
                      />
                      {errors.message && <p className="text-[10px] font-medium text-red-500">{errors.message}</p>}
                    </div>

                    {/* Simple math captcha: "6 + 11 =" */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-limon-beige/40 p-4 rounded-xl border border-limon-cream">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-limon-dark block">Human Check Verification</span>
                        <p className="text-[10px] text-limon-muted mt-1 leading-relaxed">
                          Preventing spam filings. Solve this basic calculus:
                        </p>
                        <span className="text-sm font-bold text-limon-olive block mt-2 font-mono">
                          6 + 11 = ?
                        </span>
                      </div>
                      <div className="space-y-1">
                        <input
                          type="text"
                          name="captchaInput"
                          placeholder="Your Answer"
                          value={formData.captchaInput}
                          onChange={handleInputChange}
                          className={`w-full bg-white border rounded-lg py-2.5 px-3.5 text-xs text-center font-mono font-extrabold focus:outline-none transition-all ${
                            errors.captchaInput
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-limon-gold/20 focus:border-limon-gold'
                          }`}
                        />
                        {errors.captchaInput && <p className="text-[10px] font-medium text-red-500 text-center">{errors.captchaInput}</p>}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-limon-gold hover:bg-limon-dark rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-premium"
                      id="submit-inquiry-button"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Dispatching code packets...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message to Concierge</span>
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  /* RECOGNITION POPUP SCREEN */
                  <motion.div
                    key="message-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 space-y-4 text-center"
                    id="inquiry-success-screen"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#fae8ff]/5 border border-limon-gold bg-limon-cream flex items-center justify-center text-limon-gold animate-bounce">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-serif text-lg font-bold text-limon-dark">Message Dispatched!</h4>
                      <p className="text-xs text-limon-muted max-w-sm mx-auto leading-relaxed">
                        Grazie mille. Your message has landed securely in Limoncello’s booking terminal. Rest assured, our host will write back to you within 2 business hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-5 py-2 rounded-full border border-limon-gold/30 hover:bg-limon-beige text-xs font-semibold uppercase text-limon-dark tracking-wider"
                    >
                      Write another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
