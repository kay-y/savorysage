import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Calendar, ShoppingBag } from 'lucide-react';

interface HeroSectionProps {
  onOrderClick: () => void;
  onBookClick: () => void;
}

export function HeroSection({ onOrderClick, onBookClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Minimal fade-in animation on load only
    gsap.fromTo(
      content.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-offwhite overflow-hidden"
    >
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex items-center px-6 lg:px-12 xl:px-20 py-24 lg:py-0">
          <div ref={contentRef} className="max-w-lg">
            {/* Micro Label */}
            <span className="micro-label text-charcoal/60 mb-4 block">
              EST. 2016 • SEASONAL KITCHEN
            </span>

            {/* Headline */}
            <div className="relative mb-6">
              {/* Gold background block - behind text */}
              <div className="absolute -left-4 lg:-left-8 -top-4 lg:-top-6 w-[120%] lg:w-[140%] h-[120%] bg-gold -z-0" />
              <h1 className="heading-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white relative z-10 leading-[0.9]">
                <span className="block">SAVOR</span>
                <span className="block">& SAGE</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="body-text text-charcoal/80 text-lg mb-8 max-w-sm">
              Farm-to-table dining, served simply.
            </p>

            {/* CTAs - Stack on mobile, side by side on larger screens */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onBookClick}
                className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Book a Table
              </button>
              <button
                onClick={onOrderClick}
                className="btn-secondary flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                Order Online
              </button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
          <img
            src="/images/hero_plate.jpg"
            alt="Signature roasted chicken dish"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
