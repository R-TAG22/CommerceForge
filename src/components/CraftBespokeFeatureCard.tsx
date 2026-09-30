import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CraftBespokeFeatureCardProps {
  onLaunchProject?: () => void;
  onUnsnarlArchitecture?: () => void;
}

export const CraftBespokeFeatureCard: React.FC<CraftBespokeFeatureCardProps> = ({
  onLaunchProject,
  onUnsnarlArchitecture,
}) => {
  const prefersReducedMotion = useReducedMotion();

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
            {/* Coordinate Graticule Grid */}
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

            {/* Continents & Landmass Vector Paths */}
            <g strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.04">
              {/* North America */}
              <path d="M80 65 L130 55 L180 60 L230 45 L280 50 L310 75 L300 110 L260 120 L235 145 L255 175 L235 205 L205 225 L190 255 L175 265 L155 235 L145 185 L115 155 L75 105 Z" />
              {/* Greenland */}
              <path d="M335 35 L385 40 L400 70 L385 100 L345 95 L325 65 Z" />
              {/* South America */}
              <path d="M215 265 L260 275 L290 305 L310 345 L300 395 L270 445 L250 455 L235 400 L225 350 L210 300 Z" />
              {/* Europe */}
              <path d="M465 95 L515 85 L555 90 L565 125 L525 145 L485 155 L455 135 L465 115 Z" />
              {/* British Isles */}
              <path d="M435 100 L450 95 L445 120 L430 115 Z" />
              {/* Africa */}
              <path d="M460 165 L530 165 L570 205 L590 255 L570 325 L530 375 L490 375 L465 305 L435 235 L445 185 Z" />
              {/* Madagascar */}
              <path d="M595 315 L610 325 L600 365 L585 345 Z" />
              {/* Asia */}
              <path d="M565 95 L645 75 L745 65 L835 80 L875 115 L845 165 L795 185 L755 235 L695 235 L665 195 L625 185 L575 145 Z" />
              {/* India */}
              <path d="M665 195 L710 205 L700 265 L670 245 Z" />
              {/* Japan */}
              <path d="M850 135 L870 145 L860 180 L845 170 Z" />
              {/* Southeast Asia & Islands */}
              <path d="M740 245 L770 255 L760 295 L730 275 Z" />
              <path d="M770 285 L815 290 L805 310 L765 305 Z" />
              {/* Australia */}
              <path d="M765 335 L850 325 L880 375 L860 415 L800 425 L755 385 Z" />
              {/* New Zealand */}
              <path d="M890 405 L910 415 L900 445 L885 435 Z" />
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
                UNCOMPROMISING<br />CRAFT
              </h2>

              {/* Subhead */}
              <p className="text-[#A3C8AF] text-base sm:text-lg mb-6 leading-relaxed font-medium">
                Fast, accessible, with clear communication.
              </p>

              {/* Feature List (Green Checkmarks) */}
              <ul className="space-y-3.5 my-6">
                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <div className="w-5 h-5 rounded-full border border-[#D4F968] text-[#D4F968] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.8]" />
                  </div>
                  <span>Blazing &lt;800ms Time-to-First-Byte</span>
                </li>

                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <div className="w-5 h-5 rounded-full border border-[#D4F968] text-[#D4F968] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.8]" />
                  </div>
                  <span>Thumb-First Mobile Magic</span>
                </li>

                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <div className="w-5 h-5 rounded-full border border-[#D4F968] text-[#D4F968] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.8]" />
                  </div>
                  <span>Full Code Ownership (We don’t hold it hostage)</span>
                </li>

                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <div className="w-5 h-5 rounded-full border border-[#D4F968] text-[#D4F968] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.8]" />
                  </div>
                  <span>SEO-Ready Indexing (Google will find you)</span>
                </li>
              </ul>
            </div>

            {/* Bottom CTA Button (Aligned horizontally with right column button) */}
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
                BESPOKE<br />E-COMMERCE
              </h2>

              {/* Subhead */}
              <p className="text-[#A3C8AF] text-base sm:text-lg mb-6 leading-relaxed font-medium">
                We build what monolithic platforms can’t.
              </p>

              {/* Feature List (Muted Bullet Points / Dots) */}
              <ul className="space-y-3.5 my-6">
                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#D4F968] shrink-0" />
                  <span>Complex Multi-Vendor Architecture</span>
                </li>

                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#D4F968] shrink-0" />
                  <span>Bespoke Headless Systems</span>
                </li>

                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#D4F968] shrink-0" />
                  <span>Custom ERP and Logistics Sync</span>
                </li>

                <li className="flex items-center gap-3 text-[#E5E7EB] text-sm sm:text-[15px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#D4F968] shrink-0" />
                  <span>Tailored wholesale tiering</span>
                </li>
              </ul>
            </div>

            {/* Bottom CTA Button (Aligned horizontally with left column button) */}
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
