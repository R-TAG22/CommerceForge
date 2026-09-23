import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { usePublicTheme } from '../context/PublicThemeContext';

interface ComparisonSectionProps {
  onCtaClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
  const { isDark } = usePublicTheme();
  const comparisonData = activeContent?.comparison;

  const defaultItems = [
    {
      id: 'metric-lcp',
      aspect: 'Largest Contentful Paint (LCP)',
      oldWay: '2.8s (Poor)',
      rebuildWay: '0.8s (Good)',
      sortOrder: 0,
    },
    {
      id: 'metric-fid',
      aspect: 'First Input Delay (FID)',
      oldWay: '150ms (Needs Improvement)',
      rebuildWay: '15ms (Good)',
      sortOrder: 1,
    },
    {
      id: 'metric-cls',
      aspect: 'Cumulative Layout Shift (CLS)',
      oldWay: '0.25 (Poor)',
      rebuildWay: '0.03 (Good)',
      sortOrder: 2,
    },
    {
      id: 'metric-bounce',
      aspect: 'Bounce Rate',
      oldWay: '+35%',
      rebuildWay: '-15%',
      sortOrder: 3,
    },
    {
      id: 'metric-conv',
      aspect: 'Checkout Conversion',
      oldWay: '-20%',
      rebuildWay: '+25%',
      sortOrder: 4,
    },
  ];

  // If CMS items are the legacy ones (e.g. aspect === 'Mobile Usability'), fallback to the engineered metrics
  const hasLegacyAspect = comparisonData?.items?.some(it => it.aspect === 'Mobile Usability');
  const items = (!hasLegacyAspect && comparisonData?.items && comparisonData.items.length > 0)
    ? comparisonData.items
    : defaultItems;

  const headline = (comparisonData?.headingPrefix && comparisonData.headingPrefix.includes('PERFORMANCE AS PRESTIGE'))
    ? comparisonData.headingPrefix
    : 'PERFORMANCE AS PRESTIGE: THE ENGINEERED ADVANTAGE';

  const subheading = comparisonData?.subheading?.includes('streamlined breakdown')
    ? comparisonData.subheading
    : 'A streamlined breakdown of traditional builds vs. our engineering-first infrastructure.';

  const oldColumnTitle = comparisonData?.oldColumnHeading?.includes('TRADITIONAL BUILD')
    ? comparisonData.oldColumnHeading
    : 'TRADITIONAL BUILD (DESIGN-FIRST)';

  const newColumnTitle = comparisonData?.newColumnHeading?.includes('ENGINEERED BUILD')
    ? comparisonData.newColumnHeading
    : 'ENGINEERED BUILD (INFRASTRUCTURE-FIRST)';

  const ctaButtonText = comparisonData?.ctaText || 'REQUEST A TECH AUDIT';

  const renderValueWithStatus = (text: string, isEngineered: boolean) => {
    // Matches expressions like "2.8s (Poor)" or "150ms (Needs Improvement)"
    const match = text.match(/^(.*?)\s*(\([A-Za-z\s]+\))$/);
    if (match) {
      const val = match[1];
      const status = match[2];
      return (
        <span className="font-bold">
          <span className={isDark ? 'text-white' : 'text-[#12241A]'}>{val} </span>
          <span className={isEngineered ? (isDark ? 'text-[#B7E84B]' : 'text-emerald-700') : (isDark ? 'text-red-400' : 'text-red-600')}>
            {status}
          </span>
        </span>
      );
    }

    // Direct percentage like +35% or -20%
    return (
      <span className={`font-bold ${
        isEngineered 
          ? isDark ? 'text-[#B7E84B]' : 'text-emerald-700' 
          : isDark ? 'text-red-400' : 'text-red-600'
      }`}>
        {text}
      </span>
    );
  };

  return (
    <motion.section 
      id="comparison" 
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`w-full py-16 sm:py-24 border-t transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0B0F17] border-white/10' 
          : 'bg-[#F4F8F3] border-[#064E3B]/10'
      }`}
      aria-label="Performance as Prestige: The Engineered Advantage"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black uppercase tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-[#12241A]'
          }`}>
            {headline}
          </h2>
          <p className={`text-sm sm:text-base md:text-lg mt-2.5 sm:mt-3 font-medium leading-relaxed ${
            isDark ? 'text-white/70' : 'text-[#12241A]/80'
          }`}>
            {subheading}
          </p>
        </div>

        {/* Comparison Dual Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Card: Traditional Build (Design-First) */}
          <div 
            className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border flex flex-col justify-between transition-all duration-300 shadow-sm ${
              isDark 
                ? 'bg-white/[0.02] border-white/10 hover:border-white/20' 
                : 'bg-white/95 border-[#064E3B]/15 hover:border-[#064E3B]/30'
            }`}
          >
            <div>
              {/* Column Title */}
              <h3 className={`text-sm sm:text-base md:text-lg font-black uppercase tracking-wider ${
                isDark ? 'text-white' : 'text-[#12241A]'
              }`}>
                {oldColumnTitle}
              </h3>

              {/* Thin Divider Line */}
              <div className={`w-full border-b mt-3 sm:mt-4 mb-5 sm:mb-6 ${
                isDark ? 'border-white/10' : 'border-[#064E3B]/10'
              }`} />

              {/* Items List */}
              <ul className="space-y-4 sm:space-y-5">
                {items.map((item) => (
                  <li 
                    key={`old-${item.id || item.aspect}`} 
                    className="flex items-center gap-3 sm:gap-3.5 text-xs sm:text-sm md:text-base leading-relaxed"
                  >
                    {/* Red Circular Icon with Cross */}
                    <div 
                      className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center shrink-0 border ${
                        isDark 
                          ? 'bg-red-950/60 border-red-800/60 text-red-400' 
                          : 'bg-red-100/90 border-red-200 text-red-600'
                      }`}
                      aria-hidden="true"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Metric Text */}
                    <div className="flex-1">
                      <span className={isDark ? 'text-white/90' : 'text-[#12241A]'}>
                        {item.aspect}:{' '}
                      </span>
                      {renderValueWithStatus(item.oldWay, false)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Card: Engineered Build (Infrastructure-First) */}
          <div 
            className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 border flex flex-col justify-between transition-all duration-300 shadow-sm ${
              isDark 
                ? 'bg-white/[0.02] border-white/10 hover:border-[#B7E84B]/40' 
                : 'bg-white/95 border-[#064E3B]/15 hover:border-[#064E3B]/30'
            }`}
          >
            <div>
              {/* Column Title */}
              <h3 className={`text-sm sm:text-base md:text-lg font-black uppercase tracking-wider ${
                isDark ? 'text-white' : 'text-[#12241A]'
              }`}>
                {newColumnTitle}
              </h3>

              {/* Thin Divider Line */}
              <div className={`w-full border-b mt-3 sm:mt-4 mb-5 sm:mb-6 ${
                isDark ? 'border-white/10' : 'border-[#064E3B]/10'
              }`} />

              {/* Items List */}
              <ul className="space-y-4 sm:space-y-5">
                {items.map((item) => (
                  <li 
                    key={`new-${item.id || item.aspect}`} 
                    className="flex items-center gap-3 sm:gap-3.5 text-xs sm:text-sm md:text-base leading-relaxed"
                  >
                    {/* Green Circular Icon with Checkmark */}
                    <div 
                      className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center shrink-0 border ${
                        isDark 
                          ? 'bg-emerald-950/60 border-emerald-800/60 text-[#B7E84B]' 
                          : 'bg-emerald-100/90 border-emerald-200 text-[#064E3B]'
                      }`}
                      aria-hidden="true"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Metric Text */}
                    <div className="flex-1">
                      <span className={isDark ? 'text-white/90' : 'text-[#12241A]'}>
                        {item.aspect}:{' '}
                      </span>
                      {renderValueWithStatus(item.rebuildWay, true)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Centered Bottom CTA Button */}
        <div className="mt-8 sm:mt-11 flex justify-center">
          <button
            type="button"
            onClick={onCtaClick}
            className={`group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-[0.14em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer ${
              isDark
                ? 'bg-[#0B0F17] text-white border-2 border-[#B7E84B]/70 hover:border-[#B7E84B] hover:shadow-[0_0_25px_rgba(183,232,75,0.35)]'
                : 'bg-[#0E2016] text-white border-2 border-[#1E4D32] hover:border-[#B7E84B] hover:bg-[#143223] hover:shadow-[0_12px_28px_-6px_rgba(14,32,22,0.35)]'
            }`}
          >
            <span>{ctaButtonText}</span>
          </button>
        </div>

      </div>
    </motion.section>
  );
};
