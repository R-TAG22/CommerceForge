import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useCMS } from '../context/CMSContext';

interface CraftBespokeFeatureCardProps {
  onLaunchProject?: () => void;
  onUnsnarlArchitecture?: () => void;
}

export const CraftBespokeFeatureCard: React.FC<CraftBespokeFeatureCardProps> = ({
  onLaunchProject,
  onUnsnarlArchitecture,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { activeContent } = useCMS();
  const bespokeData = activeContent?.packagesTerms?.craftBespoke;

  const title1 = bespokeData?.title1 || 'UNCOMPROMISING CRAFT';
  const desc1 = bespokeData?.desc1 || 'Fast, accessible, with clear communication.';
  const bullets1 = bespokeData?.bullets1 && bespokeData.bullets1.length > 0
    ? bespokeData.bullets1
    : [
        'Blazing <800ms Time-to-First-Byte',
        'Thumb-First Mobile Magic',
        'Full Code Ownership (We don’t hold it hostage)',
        'SEO-Ready Indexing (Google will find you)',
      ];

  const title2 = bespokeData?.title2 || 'BESPOKE E-COMMERCE';
  const desc2 = bespokeData?.desc2 || 'We build what monolithic platforms can’t.';
  const bullets2 = bespokeData?.bullets2 && bespokeData.bullets2.length > 0
    ? bespokeData.bullets2
    : [
        'Complex Multi-Vendor Architecture',
        'Bespoke Headless Systems',
        'Custom ERP and Logistics Sync',
        'Tailored wholesale tiering',
      ];

  return (
    <motion.section
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full my-8 sm:my-12"
      aria-label="What We Forge & Bespoke E-Commerce"
    >
      {/* Inner Card Container */}
      <div className="relative rounded-3xl lg:rounded-[36px] bg-[#0B1911] text-white p-8 sm:p-12 lg:p-16 overflow-hidden border border-[#1E3A2B]/60 shadow-2xl">
        
        {/* Background Accent: Subtle vector outline of global map and coordinate grid lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.08] text-[#86C99B]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="currentColor"
          >
            <g strokeWidth="0.6" strokeDasharray="4 6" opacity="0.7">
              <line x1="20" y1="250" x2="980" y2="250" />
              <line x1="20" y1="170" x2="980" y2="170" />
              <line x1="20" y1="330" x2="980" y2="330" />
              <line x1="20" y1="90" x2="980" y2="90" />
              <line x1="20" y1="410" x2="980" y2="410" />
              <line x1="500" y1="20" x2="500" y2="480" />
              <line x1="250" y1="20" x2="250" y2="480" />
              <line x1="750" y1="20" x2="750" y2="480" />
              <line x1="125" y1="20" x2="125" y2="480" />
              <line x1="375" y1="20" x2="375" y2="480" />
              <line x1="625" y1="20" x2="625" y2="480" />
              <line x1="875" y1="20" x2="875" y2="480" />
            </g>
          </svg>
        </div>

        {/* 2-Column Responsive Grid Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* LEFT COLUMN: UNCOMPROMISING CRAFT */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Top Pill Tag */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#D4F968] text-[#0A1A10] font-bold text-xs uppercase tracking-wider w-fit mb-4 select-none">
                WHAT WE FORGE (IN EVERY BUILD)
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold uppercase tracking-tight text-white leading-[1.08] mt-2 mb-3">
                {title1}
              </h2>

              {/* Subhead */}
              <p className="text-[#A3C8AF] text-base sm:text-lg mb-6 leading-relaxed font-medium">
                {desc1}
              </p>

              {/* Feature List (Green Checkmarks) */}
              <ul className="space-y-3.5 my-6">
                {bullets1.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                    <div className="w-5 h-5 rounded-full border border-[#D4F968] text-[#D4F968] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[2.8]" />
                    </div>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA Button */}
            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={onLaunchProject}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-[#D4F968] hover:bg-[#c2eb53] text-[#0A1A10] font-bold text-xs sm:text-[13px] uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>LAUNCH MY PROJECT TODAY →</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: BESPOKE E-COMMERCE */}
          <div className="flex flex-col justify-between h-full pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-[#1E3A2B]/40 md:pl-10 lg:pl-16">
            <div>
              {/* Top Pill Tag */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#D4F968] text-[#0A1A10] font-bold text-xs uppercase tracking-wider w-fit mb-4 select-none">
                BEYOND BORDERS (BESPOKE E-COMMERCE)
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold uppercase tracking-tight text-white leading-[1.08] mt-2 mb-3">
                {title2}
              </h2>

              {/* Subhead */}
              <p className="text-[#A3C8AF] text-base sm:text-lg mb-6 leading-relaxed font-medium">
                {desc2}
              </p>

              {/* Feature List (Muted Bullet Points / Dots) */}
              <ul className="space-y-3.5 my-6">
                {bullets2.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#D4F968] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA Button */}
            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={onUnsnarlArchitecture}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-[#D4F968] hover:bg-[#c2eb53] text-[#0A1A10] font-bold text-xs sm:text-[13px] uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>UNSNARL MY ARCHITECTURE →</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};
