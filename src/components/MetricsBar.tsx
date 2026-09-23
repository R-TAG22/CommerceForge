import React from 'react';
import { motion } from 'motion/react';
import { usePublicTheme } from '../context/PublicThemeContext';

export interface ClientLogoItem {
  id: string;
  name: string;
  category: string;
  renderLogo: (isDark: boolean) => React.ReactNode;
}

export const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    id: 'goldandgrove',
    name: 'Gold & Grove',
    category: 'Skin Nutrition & Wellness',
    renderLogo: (isDark: boolean) => (
      <div className="flex items-center gap-3">
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M12 21C12 21 13 14 18 11C23 8 26 8 26 8C26 8 24 14 20 17C16 20 12 21 12 21Z" fill="currentColor" fillOpacity="0.9" />
          <path d="M13 19C15 15 19 13 22 12" stroke={isDark ? '#0B0F17' : '#FFFFFF'} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-serif font-black tracking-[0.2em] text-sm sm:text-base leading-none">
            GOLD &amp; GROVE
          </span>
          <span className="text-[9px] tracking-[0.25em] font-semibold opacity-60 uppercase mt-0.5">
            Skin Nutrition
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'premiumtrendsshop',
    name: 'Premium Trends Shop',
    category: 'Curated DTC & Lifestyle',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <polygon points="14,4 24,11 14,24 4,11" stroke="currentColor" strokeWidth="1.8" />
          <line x1="4" y1="11" x2="24" y2="11" stroke="currentColor" strokeWidth="1.5" />
          <line x1="14" y1="4" x2="14" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black tracking-[0.14em] text-xs sm:text-sm uppercase leading-none">
            PREMIUM TRENDS
          </span>
          <span className="text-[8.5px] tracking-[0.28em] font-bold opacity-60 uppercase mt-0.5">
            Curated DTC
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'rosemira',
    name: 'Rosemira Organics',
    category: 'Doctor-Formulated Apothecary',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M16 9C13 13 13 17 16 21C19 17 19 13 16 9Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M9 16C13 13 17 13 21 16C17 19 13 19 9 16Z" fill="currentColor" fillOpacity="0.85" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-serif font-bold tracking-[0.16em] text-xs sm:text-sm leading-none">
            ROSEMIRA
          </span>
          <span className="text-[8px] tracking-[0.3em] font-black opacity-60 uppercase mt-0.5">
            ORGANICS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'haomaearth',
    name: 'HAOMA Earth',
    category: 'Regenerative Skincare',
    renderLogo: () => (
      <div className="flex items-center gap-3">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="14" cy="14" r="4.5" fill="currentColor" />
          <line x1="14" y1="1" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="24" x2="14" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="flex items-center gap-1.5 text-left">
          <span className="font-sans font-black tracking-[0.24em] text-xs sm:text-sm leading-none">
            HAOMA
          </span>
          <span className="font-sans font-normal tracking-[0.2em] text-[10px] sm:text-xs opacity-70 leading-none">
            EARTH
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'juicebeauty',
    name: 'Juice Beauty',
    category: 'Organic Clinical Beauty',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 4C14 4 21 13 21 17.5C21 21.6 17.9 25 14 25C10.1 25 7 21.6 7 17.5C7 13 14 4 14 4Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 11V21M10.5 15L14 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <div className="flex items-baseline gap-1 text-left">
          <span className="font-sans font-bold tracking-[0.06em] text-sm sm:text-base leading-none lowercase">
            juice
          </span>
          <span className="font-sans font-light tracking-[0.2em] text-xs sm:text-sm opacity-80 uppercase leading-none">
            BEAUTY
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'doctorsselect',
    name: "Doctor's Select",
    category: 'Nutraceutical Formulations',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M14 4L23 8V15C23 20.5 14 25 14 25C14 25 5 20.5 5 15V8L14 4Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 9V19M9 14H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-sans font-black tracking-[0.1em] text-xs sm:text-sm uppercase leading-none">
            DOCTOR&apos;S
          </span>
          <span className="text-[8.5px] tracking-[0.26em] font-extrabold opacity-60 uppercase mt-0.5">
            SELECT
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'naturezway',
    name: "Nature's Way",
    category: 'Botanical Herbal Remedies',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M6 24C10 14 19 9 27 7C25 17 19 23 9 25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M11 20C16 18 21 14 23 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <div className="flex items-baseline gap-1 text-left">
          <span className="font-serif italic font-black tracking-[0.04em] text-sm sm:text-base leading-none">
            Nature&apos;s
          </span>
          <span className="font-sans font-black tracking-[0.16em] text-[10px] sm:text-xs opacity-80 uppercase leading-none">
            WAY
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'coalitionla',
    name: 'Coalition LA',
    category: 'Los Angeles Fashion & Streetwear',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="4" y="5" width="20" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <text x="7" y="18" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="900" fill="currentColor">
            C
          </text>
          <circle cx="19" cy="14" r="2" fill="currentColor" />
        </svg>
        <div className="flex items-baseline gap-1 text-left">
          <span className="font-sans font-black tracking-[0.14em] text-xs sm:text-sm uppercase leading-none">
            COALITION
          </span>
          <span className="font-sans font-extrabold tracking-[0.22em] text-[9.5px] opacity-70 uppercase leading-none">
            LA
          </span>
        </div>
      </div>
    ),
  },
];

export const MetricsBar: React.FC = () => {
  const { isDark } = usePublicTheme();

  // Repeating array to create a seamless infinite marquee loop
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <motion.section 
      id="client-logos-marquee" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={`w-full py-5 sm:py-7 border-y relative overflow-hidden select-none transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0B0F17]/90 border-white/10 text-white/70' 
          : 'bg-[#FAFAF9] border-[#064E3B]/10 text-[#064E3B]/75'
      }`}
      aria-label="Client Brand Logos"
    >
      {/* Left Gradient Fade Mask */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none transition-colors ${
          isDark 
            ? 'bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/80 to-transparent' 
            : 'bg-gradient-to-r from-[#FAFAF9] via-[#FAFAF9]/80 to-transparent'
        }`} 
      />

      {/* Right Gradient Fade Mask */}
      <div 
        className={`absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none transition-colors ${
          isDark 
            ? 'bg-gradient-to-l from-[#0B0F17] via-[#0B0F17]/80 to-transparent' 
            : 'bg-gradient-to-l from-[#FAFAF9] via-[#FAFAF9]/80 to-transparent'
        }`} 
      />

      {/* Infinite Continuous Scrolling Track */}
      <div className="flex items-center overflow-hidden">
        <div className="animate-marquee flex items-center shrink-0">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className={`flex items-center justify-center px-6 sm:px-10 lg:px-12 py-1.5 transition-all duration-300 shrink-0 cursor-default group ${
                isDark 
                  ? 'hover:text-[#B7E84B] hover:opacity-100 opacity-70' 
                  : 'hover:text-[#064E3B] hover:opacity-100 opacity-75'
              }`}
              title={`${brand.name} — ${brand.category}`}
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                {brand.renderLogo(isDark)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
