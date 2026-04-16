import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Users, User, Phone, Mail, MessageSquare, Check } from 'lucide-react';
import type { ReservationFormData } from '@/types';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function ReservationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<ReservationFormData>({
    date: '',
    time: '',
    partySize: '2',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const partySizes = ['1', '2', '3', '4', '5', '6', '7', '8+'];

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.fromTo(
      content.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('Reservation request submitted! We\'ll confirm shortly.');
  };

  const handleChange = (field: keyof ReservationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <section
        ref={sectionRef}
        id="reservation"
        className="relative bg-offwhite py-20 lg:py-28"
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-center min-h-[50vh]">
          <div className="text-center max-w-md">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-6 h-6 lg:w-8 lg:h-8 text-gold" />
            </div>
            <h2 className="heading-display text-2xl lg:text-3xl text-charcoal mb-4">
              Reservation Received
            </h2>
            <p className="body-text text-charcoal/70 mb-6 text-sm lg:text-base">
              Thank you, {formData.name}. We&apos;ve received your request for {formData.partySize} guests on {formData.date} at {formData.time}. 
              A confirmation email has been sent to {formData.email}.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  date: '', time: '', partySize: '2', name: '', phone: '', email: '', notes: ''
                });
              }}
              className="btn-secondary"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="reservation"
      className="relative bg-offwhite py-20 lg:py-28"
    >
      <div className="w-full px-6 lg:px-12">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column - Text */}
          <div>
            <span className="micro-label text-gold mb-4 block">RESERVATIONS</span>
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6">
              BOOK YOUR TABLE
            </h2>
            <p className="body-text text-charcoal/70 mb-8 max-w-md">
              Dinner service starts at 5pm. Reservations are recommended, 
              especially for weekends. Walk-ins are always welcome at the bar.
            </p>
            
            <div className="hairline-h w-full max-w-md mb-8"></div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-charcoal/80 text-sm lg:text-base">Tuesday – Sunday: 5pm – 10pm</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-charcoal/80 text-sm lg:text-base">(555) 014-2230</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-charcoal/80 text-sm lg:text-base">reservations@savorandsage.com</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white border border-charcoal/10 p-5 lg:p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {/* Date */}
                <div>
                  <label className="micro-label text-charcoal/50 mb-1.5 lg:mb-2 block text-xs">
                    DATE
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full pl-9 lg:pl-10 pr-2 lg:pr-3 py-2.5 lg:py-3 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="micro-label text-charcoal/50 mb-1.5 lg:mb-2 block text-xs">
                    TIME
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className="w-full pl-9 lg:pl-10 pr-2 lg:pr-3 py-2.5 lg:py-3 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none transition-colors appearance-none bg-white"
                    >
                      <option value="">Select</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Party Size */}
              <div>
                <label className="micro-label text-charcoal/50 mb-1.5 lg:mb-2 block text-xs">
                  PARTY SIZE
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                  <select
                    required
                    value={formData.partySize}
                    onChange={(e) => handleChange('partySize', e.target.value)}
                    className="w-full pl-9 lg:pl-10 pr-2 lg:pr-3 py-2.5 lg:py-3 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none transition-colors appearance-none bg-white"
                  >
                    {partySizes.map(size => (
                      <option key={size} value={size}>
                        {size} {size === '1' ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="micro-label text-charcoal/50 mb-1.5 lg:mb-2 block text-xs">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full pl-9 lg:pl-10 pr-2 lg:pr-3 py-2.5 lg:py-3 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-charcoal/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {/* Phone */}
                <div>
                  <label className="micro-label text-charcoal/50 mb-1.5 lg:mb-2 block text-xs">
                    PHONE
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full pl-9 lg:pl-10 pr-2 lg:pr-3 py-2.5 lg:py-3 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-charcoal/40"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="micro-label text-charcoal/50 mb-1.5 lg:mb-2 block text-xs">
                    EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full pl-9 lg:pl-10 pr-2 lg:pr-3 py-2.5 lg:py-3 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-charcoal/40"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="micro-label text-charcoal/50 mb-1.5 lg:mb-2 block text-xs">
                  SPECIAL REQUESTS (OPTIONAL)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-charcoal/40" />
                  <textarea
                    rows={3}
                    placeholder="Allergies, special occasions..."
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full pl-9 lg:pl-10 pr-2 lg:pr-3 py-2.5 lg:py-3 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none transition-colors placeholder:text-charcoal/40 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Check Availability
                  </>
                )}
              </button>

              <p className="text-xs text-charcoal/50 text-center">
                By submitting, you agree to receive confirmation via email and SMS.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
