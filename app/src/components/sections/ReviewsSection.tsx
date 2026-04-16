import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Star } from 'lucide-react';
import { reviews } from '@/data/menu';

gsap.registerPlugin(ScrollTrigger);

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative bg-offwhite py-20 lg:py-28"
    >
      <div className="w-full px-6 lg:px-12">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Image */}
          <div className="relative overflow-hidden">
            <img
              src="/images/interior_detail.jpg"
              alt="Elegant restaurant interior"
              className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]"
            />
          </div>

          {/* Right - Content */}
          <div>
            <span className="micro-label text-gold mb-4 block">TESTIMONIALS</span>
            <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-6 lg:mb-8">
              WHAT GUESTS SAY
            </h2>

            {/* Review Cards */}
            <div className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 lg:p-5 bg-white border-t border-charcoal/10"
                >
                  <div className="flex gap-1 mb-2 lg:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-charcoal/80 italic mb-2 text-sm lg:text-base">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <span className="text-xs lg:text-sm text-charcoal/50">— {review.author}</span>
                </div>
              ))}
            </div>

            {/* Visit Us */}
            <div className="border-t border-charcoal/10 pt-6">
              <h3 className="font-display text-lg lg:text-xl text-charcoal mb-4">Visit Us</h3>
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 lg:w-5 h-4 lg:h-5 text-gold flex-shrink-0" />
                  <span className="text-charcoal/80 text-sm lg:text-base">123 Market Street, Downtown</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 lg:w-5 h-4 lg:h-5 text-gold flex-shrink-0" />
                  <span className="text-charcoal/80 text-sm lg:text-base">Tuesday – Sunday: 5pm – 10pm</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 lg:w-5 h-4 lg:h-5 text-gold flex-shrink-0" />
                  <span className="text-charcoal/80 text-sm lg:text-base">(555) 014-2230</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
