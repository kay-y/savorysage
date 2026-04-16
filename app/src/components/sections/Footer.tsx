import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onMenuClick: () => void;
  onOrderClick: () => void;
  onBookClick: () => void;
}

export function Footer({ onMenuClick, onOrderClick, onBookClick }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.fromTo(
      footer,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-charcoal text-offwhite py-12 lg:py-20"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-10 lg:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl lg:text-2xl xl:text-3xl font-bold mb-4">
              Savor & Sage
            </h2>
            <p className="text-offwhite/70 mb-6 max-w-sm text-sm lg:text-base">
              Modern plates. Seasonal produce. Honest flavor. 
              Farm-to-table dining served simply.
            </p>
            <div className="space-y-2">
              <a 
                href="mailto:hello@savorandsage.com"
                className="flex items-center gap-2 text-offwhite/70 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                hello@savorandsage.com
              </a>
              <a 
                href="tel:+15550142230"
                className="flex items-center gap-2 text-offwhite/70 hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                (555) 014-2230
              </a>
              <div className="flex items-center gap-2 text-offwhite/70 text-sm">
                <MapPin className="w-4 h-4" />
                123 Market Street, Downtown
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="micro-label text-offwhite/50 mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <button
                  onClick={onMenuClick}
                  className="text-offwhite/70 hover:text-gold transition-colors text-sm"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={onOrderClick}
                  className="text-offwhite/70 hover:text-gold transition-colors text-sm"
                >
                  Order Online
                </button>
              </li>
              <li>
                <button
                  onClick={onBookClick}
                  className="text-offwhite/70 hover:text-gold transition-colors text-sm"
                >
                  Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('careers')}
                  className="text-offwhite/70 hover:text-gold transition-colors text-sm"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="micro-label text-offwhite/50 mb-4">FOLLOW US</h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 lg:w-10 lg:h-10 border border-offwhite/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              >
                <Instagram className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </div>
            <p className="text-offwhite/50 text-xs mt-4">
              Tag us @savorandsage to be featured
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-offwhite/10 pt-6 lg:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 lg:gap-4">
          <p className="text-offwhite/50 text-xs lg:text-sm">
            © 2026 Savor & Sage. All rights reserved.
          </p>
          <div className="flex gap-4 lg:gap-6">
            <button className="text-offwhite/50 text-xs lg:text-sm hover:text-offwhite transition-colors">
              Privacy Policy
            </button>
            <button className="text-offwhite/50 text-xs lg:text-sm hover:text-offwhite transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
