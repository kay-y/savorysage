import { useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster, toast } from 'sonner';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { MenuSection } from '@/components/sections/MenuSection';
import { ReservationSection } from '@/components/sections/ReservationSection';
import { CareersSection } from '@/components/sections/CareersSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { Footer } from '@/components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Toast Tab integration - opens in new tab
  const handleOrderClick = useCallback(() => {
    toast.info('Opening Toast Tab...', {
      description: 'You\'ll be redirected to our online ordering system.',
      duration: 2000,
    });
    setTimeout(() => {
      window.open('https://order.toasttab.com', '_blank');
    }, 500);
  }, []);

  // Scroll to reservation section
  const handleBookClick = useCallback(() => {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Scroll to menu section
  const handleMenuClick = useCallback(() => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Cleanup ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#F4F2EE',
            border: '1px solid rgba(26, 26, 26, 0.1)',
            color: '#1A1A1A',
          },
        }}
      />

      {/* Navigation */}
      <Navigation 
        onMenuClick={handleMenuClick}
        onOrderClick={handleOrderClick}
        onBookClick={handleBookClick}
      />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection 
          onOrderClick={handleOrderClick}
          onBookClick={handleBookClick}
        />

        {/* Section 2: Small Plates */}
        <FeatureSection
          id="small-plates"
          title="START"
          titleLine2="LIGHT"
          description="Crudo, roasted vegetables, and bright salads—simple, produce-forward plates built to share (or keep to yourself)."
          ctaText="View Small Plates"
          ctaAction={handleMenuClick}
          imageSrc="/images/small_plates_bowl.jpg"
          imageAlt="Fresh grain bowl with roasted vegetables"
          layout="left-image"
          zIndex={20}
        />

        {/* Section 3: Fresh & Local */}
        <FeatureSection
          id="fresh-local"
          title="FROM THE"
          titleLine2="MARKET"
          description="We build the menu around what's fresh—local farms, sustainable seafood, and herbs picked the same day."
          ctaText="Meet Our Suppliers"
          ctaAction={handleMenuClick}
          imageSrc="/images/market_produce.jpg"
          imageAlt="Fresh produce from local farms"
          layout="right-image"
          zIndex={30}
        />

        {/* Section 4: Main Course */}
        <FeatureSection
          id="main-course"
          title="THE MAIN"
          titleLine2="EVENT"
          description="Hand-cut pastas, slow-roasted meats, and vegetables treated like the main attraction. Balanced, bold, and never overworked."
          ctaText="View Mains"
          ctaAction={handleMenuClick}
          imageSrc="/images/main_pasta.jpg"
          imageAlt="Handmade pasta with rich sauce"
          layout="left-image"
          zIndex={40}
        />

        {/* Section 5: Crafted with Care */}
        <FeatureSection
          id="crafted"
          title="MADE BY"
          titleLine2="HAND"
          description="Every sauce is stirred, every dough is rolled here. We prep small batches so the plate tastes like it was cooked for you."
          ctaText="See the Kitchen"
          ctaAction={handleMenuClick}
          imageSrc="/images/kitchen_prep.jpg"
          imageAlt="Chef carefully plating a dish"
          layout="right-image"
          zIndex={50}
        />

        {/* Section 6: Dessert */}
        <FeatureSection
          id="dessert"
          title="END ON A"
          titleLine2="SWEET NOTE"
          description="Seasonal fruit tarts, dark chocolate ganache, and light custards—desserts that finish the meal without weighing it down."
          ctaText="View Desserts"
          ctaAction={handleMenuClick}
          imageSrc="/images/dessert_slice.jpg"
          imageAlt="Beautiful layered cake with berries"
          layout="left-image"
          zIndex={60}
        />

        {/* Section 7: Interactive Menu */}
        <MenuSection onOrderClick={handleOrderClick} />

        {/* Section 8: Reservation */}
        <ReservationSection />

        {/* Section 9: Careers */}
        <CareersSection />

        {/* Section 10: Reviews */}
        <ReviewsSection />

        {/* Section 11: Footer */}
        <Footer 
          onMenuClick={handleMenuClick}
          onOrderClick={handleOrderClick}
          onBookClick={handleBookClick}
        />
      </main>
    </div>
  );
}

export default App;
