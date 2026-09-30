import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePublicTheme } from '../context/PublicThemeContext';

interface EcommerceAcceleratorBannerProps {
  onRequestProjection?: () => void;
  onTalkToStrategist?: () => void;
}

export const EcommerceAcceleratorBanner: React.FC<EcommerceAcceleratorBannerProps> = ({
  onRequestProjection,
  onTalkToStrategist,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = usePublicTheme();

  const features = [
    { label: 'Fast Loading (< 0.5s)' },
    { label: 'More Sales per Customer' },
    { label: 'Easy Mobile Checkout' },
    { label: 'Proven SEO Mastery' },
    { label: 'Full ERP & Tool Sync' },
    { label: 'Built to Your Needs' },
  ];

  return (
    <motion.section
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`w-full py-16 sm:py-24 my-8 sm:my-12 rounded-3xl sm:rounded-4xl overflow-hidden shadow-xl border transition-colors duration-300 ${
        isDark
          ? 'bg-[#111620] text-white border-white/10'
          : 'bg-[#12241A] text-white border-[#1E3A2B]/40'
      }`}
      aria-label="Ecommerce Accelerator"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* 2. Badge: Top pill badge matching website electric lime theme */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#B7E84B] text-[#0B0F17] font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-xs mb-6 sm:mb-8 select-none">
          ECOMMERCE ACCELERATOR
        </div>

        {/* 3. Typography: Main Header & Subhead */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none select-none">
          FORGE A RETAIL EMPIRE
        </h2>

        <p className="mt-3.5 sm:mt-4 text-base sm:text-lg sm:text-xl font-medium text-white/85 max-w-2xl leading-relaxed">
          Scale fast with built-to-order high-performance e-commerce stores.
        </p>

        {/* 4. Feature Grid */}
        <div className="w-full mt-8 sm:mt-10">
          <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#B7E84B] mb-5 sm:mb-6">
            HOW WE HELP YOU GROW
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-3.5 sm:gap-y-4 max-w-lg mx-auto text-left">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full border border-[#B7E84B]/60 bg-[#B7E84B]/10 text-[#B7E84B] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.8]" />
                </div>
                <span className="text-xs sm:text-sm text-white/90 font-medium tracking-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Action Buttons matching website theme */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-xl mx-auto">
          <button
            type="button"
            onClick={onRequestProjection}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#B7E84B] text-[#0B0F17] font-bold text-xs sm:text-[13px] uppercase tracking-wider hover:bg-[#a6d83b] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-[0_0_24px_rgba(183,232,75,0.4)] cursor-pointer"
          >
            REQUEST A REVENUE PROJECTION
          </button>

          <button
            type="button"
            onClick={onTalkToStrategist}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#B7E84B] text-[#0B0F17] font-bold text-xs sm:text-[13px] uppercase tracking-wider hover:bg-[#a6d83b] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_24px_rgba(183,232,75,0.35)] cursor-pointer"
          >
            TALK TO A COMMERCE STRATEGIST →
          </button>
        </div>
      </div>
    </motion.section>
  );
};
