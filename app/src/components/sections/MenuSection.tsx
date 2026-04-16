import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ShoppingBag, Leaf, Wheat, Nut, Flame, Check } from 'lucide-react';
import { menuItems } from '@/data/menu';
import type { MenuItem, DietaryTag } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface MenuSectionProps {
  onOrderClick: () => void;
}

const dietaryIcons: Record<DietaryTag, React.ReactNode> = {
  'GF': <Wheat className="w-3 h-3" />,
  'Gluten-Free': <Wheat className="w-3 h-3" />,
  'Vegan': <Leaf className="w-3 h-3" />,
  'Vegetarian': <Leaf className="w-3 h-3" />,
  'Nut-Free': <Nut className="w-3 h-3" />,
  'Dairy-Free': <Check className="w-3 h-3" />,
  'Spicy': <Flame className="w-3 h-3" />,
};

export function MenuSection({ onOrderClick }: MenuSectionProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'small-plates' | 'mains' | 'desserts'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const signatureItems = menuItems.filter(item => item.isSignature);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Minimal fade-in animation
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
      id="menu"
      className="relative bg-offwhite py-20 lg:py-28"
    >
      <div className="w-full px-6 lg:px-12" ref={contentRef}>
        {/* Header */}
        <div className="mb-12">
          <span className="micro-label text-gold mb-4 block">OUR MENU</span>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            SEASONAL OFFERINGS
          </h2>
          <p className="body-text text-charcoal/70 max-w-xl">
            Every dish tells a story of local farms, careful preparation, and honest flavors. 
            Click any item to explore ingredients and dietary information.
          </p>
        </div>

        {/* Chef's Specials */}
        <div className="mb-12">
          <h3 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span>
            Chef&apos;s Specials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {signatureItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group text-left bg-white border border-charcoal/10 hover:border-gold/50 transition-all duration-300 hover:shadow-card overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 lg:p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-display text-base lg:text-lg text-charcoal group-hover:text-gold transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-gold font-medium">{item.price}</span>
                  </div>
                  <p className="text-sm text-charcoal/60 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.dietaryTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-charcoal/5 text-charcoal/60 text-xs"
                      >
                        {dietaryIcons[tag]}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'All Items' },
            { key: 'small-plates', label: 'Small Plates' },
            { key: 'mains', label: 'Mains' },
            { key: 'desserts', label: 'Desserts' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gold text-white'
                  : 'bg-white text-charcoal border border-charcoal/20 hover:border-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group text-left bg-white border border-charcoal/10 hover:border-gold/50 transition-all duration-300 hover:shadow-card overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 lg:p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-display text-sm lg:text-base text-charcoal group-hover:text-gold transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <span className="text-gold font-medium text-sm">{item.price}</span>
                </div>
                <p className="text-xs lg:text-sm text-charcoal/60 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Order CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOrderClick}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Order Online
          </button>
        </div>
      </div>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white border-none max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <div className="aspect-video overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 lg:p-6">
                <DialogHeader>
                  <div className="flex justify-between items-start mb-2">
                    <DialogTitle className="font-display text-xl lg:text-2xl text-charcoal">
                      {selectedItem.name}
                    </DialogTitle>
                    <span className="text-gold text-lg lg:text-xl font-medium">{selectedItem.price}</span>
                  </div>
                </DialogHeader>
                
                <p className="text-charcoal/70 mb-4 text-sm lg:text-base">
                  {selectedItem.description}
                </p>

                {/* Flavor Profile */}
                <div className="mb-4">
                  <span className="micro-label text-charcoal/50 mb-2 block">FLAVOR PROFILE</span>
                  <p className="text-sm text-charcoal/80 italic">
                    &ldquo;{selectedItem.flavorProfile}&rdquo;
                  </p>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <span className="micro-label text-charcoal/50 mb-2 block">INGREDIENTS</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-charcoal/5 text-charcoal/70 text-xs lg:text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dietary Tags */}
                <div className="mb-6">
                  <span className="micro-label text-charcoal/50 mb-2 block">DIETARY INFO</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.dietaryTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2 lg:px-3 py-1 lg:py-1.5 bg-gold/10 text-gold text-xs lg:text-sm font-medium"
                      >
                        {dietaryIcons[tag]}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      onOrderClick();
                    }}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order This Item
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-3 border border-charcoal/20 text-charcoal hover:bg-charcoal/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
