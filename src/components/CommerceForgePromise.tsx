import React from 'react';
import { motion } from 'motion/react';
import { Zap, Accessibility, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useRouter } from '../admin/router';

interface CommerceForgePromiseProps {
  onSeeOurWork?: () => void;
}

export const CommerceForgePromise: React.FC<CommerceForgePromiseProps> = ({ onSeeOurWork }) => {
  const prefersReducedMotion = useReducedMotion();
  const { navigate } = useRouter();

  const handleCta = () => {
    if (onSeeOurWork) {
      onSeeOurWork();
    } else {
      navigate('/work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const cards = [
    {
      id: 'sub-800ms',
      icon: <Zap className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />,
      title: 'SUB-800MS PAGE LOADS',
      description: 'Optimized asset delivery and edge caching ensure customers never bounce.',
    },
    {
      id: 'wcag-accessibility',
      icon: <Accessibility className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />,
      title: 'FULL WCAG ACCESSIBILITY',
      description: 'High contrast and semantic landmarks for inclusive shopping.',
    },
    {
      id: 'mobile-checkout',
      icon: (
        <svg 
          className="w-6 h-6 stroke-current fill-none" 
          viewBox="0 0 24 24" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <line x1="10" y1="5" x2="14" y2="5" />
          <circle cx="10" cy="15.5" r="0.8" fill="currentColor" />
          <circle cx="14" cy="15.5" r="0.8" fill="currentColor" />
          <path d="M8.5 10.5h1.2l1 3.5h3.6l1-2.5H10" />
        </svg>
      ),
      title: 'MOBILE-FIRST CHECKOUT',
      description: 'Engineered thumb-friendly buttons and lightning-fast express flows.',
    },
  ];

  return (
    <motion.section
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full bg-white dark:bg-[#0B0F17] py-14 sm:py-20 lg:py-24 transition-colors duration-300"
      aria-label="The CommerceForge Promise"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Green-white translucent rounded-corner frame (like DEV Team Promise) */}
        <div className="relative rounded-3xl sm:rounded-4xl p-8 sm:p-12 lg:p-16 border border-[#2D5A3E]/15 dark:border-white/10 bg-[#EAF3E8]/85 dark:bg-[#12241A]/90 backdrop-blur-md shadow-xl shadow-[#1E3A2B]/5 overflow-hidden text-center flex flex-col items-center">
          
          {/* Subtle Decorative Ambient Glows */}
          <div 
            className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-[#B7E84B] opacity-20 blur-3xl pointer-events-none select-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-[#2D5A3E] opacity-15 blur-3xl pointer-events-none select-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center w-full">
            {/* Top Pill Tag */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#B7E84B] text-[#0A1810] font-black text-xs uppercase tracking-wider mb-5 sm:mb-6 shadow-xs select-none">
              THE COMMERCEFORGE PROMISE
            </div>

            {/* Main Heading */}
            <h2 className="text-[#12241A] dark:text-white font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12] max-w-4xl mx-auto mb-4 uppercase select-none">
              ARCHITECTED FOR REAL-WORLD MERCHANT CONVERSION.
            </h2>

            {/* Subheadline Copy */}
            <p className="text-[#2D5A3E]/90 dark:text-[#9EB3A6] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-12 sm:mb-14 font-medium">
              We build modern Next.js/Vite storefronts that don't crack under load. Adhering to Core Web Vitals, optimized for sub-second TTFB, and verified accessibility standards — all with full code ownership. No bulky themes, just fast delivery.
            </p>

            {/* Feature Cards Grid (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mb-12 sm:mb-14">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white/95 dark:bg-[#0B1510]/85 backdrop-blur-xs border border-[#2D5A3E]/15 dark:border-white/10 rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#2D5A3E]/35 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div>
                    {/* Icon Badge */}
                    <div className="w-12 h-12 rounded-xl bg-[#B7E84B] flex items-center justify-center text-[#0A1810] mb-5 shadow-xs group-hover:scale-105 transition-transform duration-300">
                      {card.icon}
                    </div>

                    {/* Card Title */}
                    <h3 className="text-[#12241A] dark:text-white font-black text-lg uppercase tracking-wide mb-2.5 leading-snug">
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-[#4A5D50] dark:text-[#8FA899] text-sm leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action CTA Button */}
            <div>
              <button
                type="button"
                onClick={handleCta}
                className="bg-[#B7E84B] hover:bg-[#a3db40] text-[#0A1810] font-black text-sm tracking-wide px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-md hover:shadow-[0_0_24px_rgba(183,232,75,0.4)] cursor-pointer"
              >
                <span>SEE OUR WORK</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
