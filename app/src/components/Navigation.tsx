import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Calendar } from 'lucide-react';

interface NavigationProps {
  onMenuClick: () => void;
  onOrderClick: () => void;
  onBookClick: () => void;
}

export function Navigation({ onMenuClick, onOrderClick, onBookClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-offwhite/95 backdrop-blur-md shadow-soft py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-display text-xl lg:text-2xl font-bold tracking-tight text-charcoal hover:text-gold transition-colors"
          >
            Savor & Sage
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={onMenuClick}
              className="text-sm font-medium text-charcoal hover:text-gold transition-colors tracking-wide"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('reservation')}
              className="text-sm font-medium text-charcoal hover:text-gold transition-colors tracking-wide"
            >
              Reservations
            </button>
            <button
              onClick={() => scrollToSection('careers')}
              className="text-sm font-medium text-charcoal hover:text-gold transition-colors tracking-wide"
            >
              Careers
            </button>
            
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={onOrderClick}
                className="flex items-center gap-2 px-4 py-2 border border-charcoal text-charcoal text-sm font-medium hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                Order Online
              </button>
              <button
                onClick={onBookClick}
                className="flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                Book a Table
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-offwhite transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={onMenuClick}
            className="text-2xl font-display font-semibold text-charcoal hover:text-gold transition-colors"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('reservation')}
            className="text-2xl font-display font-semibold text-charcoal hover:text-gold transition-colors"
          >
            Reservations
          </button>
          <button
            onClick={() => scrollToSection('careers')}
            className="text-2xl font-display font-semibold text-charcoal hover:text-gold transition-colors"
          >
            Careers
          </button>
          
          <div className="flex flex-col gap-4 mt-8 w-full px-12">
            <button
              onClick={onOrderClick}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-charcoal text-charcoal font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              Order Online
            </button>
            <button
              onClick={onBookClick}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-white font-medium"
            >
              <Calendar className="w-5 h-5" />
              Book a Table
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
