import React from 'react';
import { motion } from 'motion/react';
import { usePublicTheme } from '../context/PublicThemeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useCMS } from '../context/CMSContext';

interface AboutSectionProps {
  onCtaClick?: () => void;
  onRequestRevenueClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onCtaClick,
  onRequestRevenueClick,
}) => {
  const { isDark } = usePublicTheme();
  const prefersReducedMotion = useReducedMotion();
  const { activeContent } = useCMS();
  const brandData = activeContent?.brand;

  const eyebrow = brandData?.eyebrow || 'WHO WE ARE';
  const headingPrefix = brandData?.headingPrefix || 'E-COMMERCE';
  const headingHighlight = brandData?.headingHighlight || 'PATHFINDERS.';
  const subHeading = brandData?.standardsTitle || 'SENIOR COMMERCE PATHFINDERS';
  const paragraphs = brandData?.descriptionParagraphs && brandData.descriptionParagraphs.length > 0
    ? brandData.descriptionParagraphs
    : [
        'Independent brands deserve agency-level quality, conversion-focused customer paths, and engineered performance free from bloat.',
        'Combining artisanal code with data-driven strategy, we ensure you OWN 100% OF YOUR CODEBASE AND ASSETS.',
      ];

  // Primary CTA (Button 1: "REQUEST A REVENUE PROJECTION")
  const revenueCtaText = brandData?.revenueCtaText || 'REQUEST A REVENUE PROJECTION';
  const revenueCtaUrl = brandData?.revenueCtaUrl || '#contact';

  // Secondary CTA (Button 2: "WORK WITH US")
  const primaryCta = brandData?.ctaText || 'WORK WITH US';
  const primaryCtaUrl = brandData?.ctaUrl || '#contact';

  // Transparent pricing / milestone terms line
  const pricingMilestoneText = brandData?.pricingMilestoneText || '🧮 Transparent 50/50 Milestone Terms & Pricing Regimen.';

  // Services section
  const servicesEyebrow = brandData?.servicesEyebrow || 'WHAT WE DO';
  const servicesHeading = brandData?.servicesHeading || 'OUR E-COMMERCE\nACCELERATION SERVICES';

  const defaultServices = [
    {
      title: 'HANDCRAFTED COMMERCE',
      desc: 'Custom, sub-second conversion-tuned stores.',
      type: 'chart',
    },
    {
      title: 'SCALABLE PLATFORMS',
      desc: 'Total codebase ownership, adaptable architecture.',
      type: 'lock',
    },
    {
      title: 'CONVERSION-FIRST UX',
      desc: 'Customer paths engineered for conversion.',
      type: 'phone',
    },
    {
      title: 'GLOBAL PERFORMANCE',
      desc: 'Built for domestic and international markets.',
      type: 'globe',
    },
  ];

  const serviceItems = brandData?.values && brandData.values.length > 0
    ? brandData.values.slice(0, 4).map((v, i) => ({
        title: v.title,
        desc: v.description,
        type: ['chart', 'lock', 'phone', 'globe'][i % 4],
      }))
    : defaultServices;

  const navigateTo = (url?: string) => {
    if (!url) return;
    if (url.startsWith('#')) {
      const el = document.getElementById(url.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (url.startsWith('/') || url.startsWith('http')) {
      window.location.href = url;
    }
  };

  const handleRevenueProjection = () => {
    if (onRequestRevenueClick) {
      onRequestRevenueClick();
    } else {
      navigateTo(revenueCtaUrl);
    }
  };

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigateTo(primaryCtaUrl);
    }
  };

  return (
    <motion.section
      id="about"
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative w-full py-4 sm:py-6 lg:py-8 px-4 sm:px-6 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0B0F17] text-white' : 'bg-[#F8FAF8] text-[#111827]'
      }`}
      aria-label="Who We Are and What We Do"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: WHO WE ARE                                                   */}
          {/* ========================================================================= */}
          <div className="flex flex-col justify-start">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#6B7280] dark:text-[#9CA3AF] mb-3 sm:mb-4">
              {eyebrow}
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight text-[#111827] dark:text-white leading-[1.05]">
              {headingPrefix}<br />
              {headingHighlight}
            </h2>

            <h3 className="mt-7 sm:mt-9 text-2xl sm:text-3xl lg:text-[32px] font-black uppercase tracking-tight text-[#111827] dark:text-gray-100 leading-[1.1]">
              {subHeading}
            </h3>

            <div className="mt-5 space-y-4 max-w-xl">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="text-base sm:text-[17px] text-[#4B5563] dark:text-gray-300 leading-relaxed font-normal">
                  {p}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8 pt-1">
              <button
                type="button"
                onClick={handleRevenueProjection}
                className="px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white bg-[#1D5C53] hover:bg-[#164942] shadow-[0_10px_25px_-5px_rgba(29,92,83,0.45)] hover:shadow-[0_16px_32px_-5px_rgba(29,92,83,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                {revenueCtaText}
              </button>

              <button
                type="button"
                onClick={handleCta}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#0F241A] bg-[#B7E84B] hover:bg-[#a6d93b] shadow-[0_10px_25px_-5px_rgba(183,232,75,0.45)] hover:shadow-[0_16px_32px_-5px_rgba(183,232,75,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>{primaryCta}</span>
                <span className="text-base font-black leading-none">➔</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: WHAT WE DO (2x2 Clean Cards Grid)                           */}
          {/* ========================================================================= */}
          <div className="flex flex-col justify-start">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#6B7280] dark:text-[#9CA3AF] mb-3 sm:mb-4">
              {servicesEyebrow}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#111827] dark:text-white leading-[1.08] whitespace-pre-line">
              {servicesHeading}
            </h2>

            {/* 2x2 Services Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6">
              {serviceItems.map((item, idx) => (
                <div key={idx} className="p-6 sm:p-7 rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white/95 dark:bg-[#121B29]/95 backdrop-blur-xs shadow-xs hover:shadow-md hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-start group">
                  <div className="w-12 h-10 flex items-center text-[#111827] dark:text-white mb-4">
                    {item.type === 'chart' && (
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5 mb-1.5 pl-0.5">
                          <span className="w-1 h-1 rounded-full bg-current" />
                          <span className="w-1 h-1 rounded-full bg-current" />
                          <span className="w-1 h-1 rounded-full bg-current" />
                        </div>
                        <svg viewBox="0 0 28 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <polyline points="2,15 9,9 15,12 25,2" />
                          <polyline points="18,2 25,2 25,9" />
                        </svg>
                      </div>
                    )}
                    {item.type === 'lock' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 transition-transform duration-300 group-hover:scale-105">
                        <rect x="4.5" y="10.5" width="15" height="11.5" rx="2.5" />
                        <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
                        <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
                        <path d="M12 16.7v2.3" strokeWidth="1.8" />
                      </svg>
                    )}
                    {item.type === 'phone' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-7 transition-transform duration-300 group-hover:scale-105">
                        <rect x="5.5" y="2" width="13" height="20" rx="2.8" />
                        <line x1="10" y1="5.5" x2="14" y2="5.5" strokeLinecap="round" />
                        <circle cx="12" cy="18" r="0.9" fill="currentColor" />
                      </svg>
                    )}
                    {item.type === 'globe' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10z" />
                        <path d="M12 2a15 15 0 0 0-4 10 15 15 0 0 0 4 10 15 15 0 0 0 4-10z" />
                      </svg>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-tight text-[#111827] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563] dark:text-gray-300 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Milestone Terms Footer Note */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-[#4B5563] dark:text-gray-400">
            <span>{pricingMilestoneText}</span>
          </p>
        </div>

      </div>
    </motion.section>
  );
};
