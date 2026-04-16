import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  title: string;
  titleLine2?: string;
  description: string;
  ctaText: string;
  ctaAction?: () => void;
  imageSrc: string;
  imageAlt: string;
  layout: 'left-image' | 'right-image';
  zIndex: number;
}

export function FeatureSection({
  id,
  title,
  titleLine2,
  description,
  ctaText,
  ctaAction,
  imageSrc,
  imageAlt,
  layout,
  zIndex,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isLeftImage = layout === 'left-image';

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Minimal fade-in animation when section enters viewport
    gsap.fromTo(
      content,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
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
      id={id}
      className="relative bg-offwhite overflow-hidden"
      style={{ zIndex }}
    >
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        {/* Image - Order changes based on layout */}
        <div
          className={`w-full lg:w-1/2 h-[50vh] lg:h-screen relative ${
            isLeftImage ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className={`w-full lg:w-1/2 flex items-center px-6 lg:px-12 xl:px-20 py-16 lg:py-0 ${
            isLeftImage ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div ref={contentRef} className="max-w-lg">
            {/* Title with gold background */}
            <div className="relative mb-6">
              <div className="absolute -left-4 lg:-left-8 -top-3 lg:-top-4 w-[110%] lg:w-[130%] h-[110%] bg-gold -z-0" />
              <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white relative z-10 leading-[0.9]">
                <span className="block">{title}</span>
                {titleLine2 && <span className="block">{titleLine2}</span>}
              </h2>
            </div>

            {/* Description */}
            <p className="body-text text-charcoal/80 mb-6">
              {description}
            </p>

            {/* CTA */}
            <button
              onClick={ctaAction}
              className="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-gold transition-colors group"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
