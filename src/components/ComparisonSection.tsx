import React from 'react';
import { Check, X, ArrowRight, Smartphone, Zap, Search, ShoppingBag, Layers, ShieldCheck } from 'lucide-react';
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

  const iconMap: Record<string, any> = {
    Smartphone,
    Zap,
    ShoppingBag,
    Search,
    Layers,
    ShieldCheck,
  };

  const defaultComparisons = [
    {
      aspect: 'Mobile Usability',
      icon: 'Smartphone',
      oldWay: 'Clipped menus, microscopic text, overlapping logos, and horizontal scrollbars.',
      rebuildWay: 'Thumb-friendly touch targets, responsive drawer navigation, and clean typography on every screen.',
    },
    {
      aspect: 'Page Load Speed',
      icon: 'Zap',
      oldWay: '4.5s – 8s slow load due to heavy WordPress/Wix plugins, losing over 50% of mobile visitors.',
      rebuildWay: 'Sub-600ms first contentful paint with optimized static code and edge caching.',
    },
    {
      aspect: 'Visitor Conversion',
      icon: 'ShoppingBag',
      oldWay: 'Unclear call-to-action buttons, buried contact details, and broken inquiry forms.',
      rebuildWay: 'High-contrast 1-tap WhatsApp, phone, booking, or checkout buttons right where customers expect them.',
    },
    {
      aspect: 'Search & Google Presence',
      icon: 'Search',
      oldWay: 'Missing OpenGraph social cards, unconfigured meta tags, and poor Core Web Vitals rankings.',
      rebuildWay: '100/100 Lighthouse SEO setup, clean OpenGraph share previews, and rich structured metadata.',
    },
  ];

  const comparisons = comparisonData?.items?.length
    ? comparisonData.items
    : defaultComparisons;

  const eyebrow = comparisonData?.eyebrow || 'WHY A REBUILD MATTERS';
  const headingPrefix = comparisonData?.headingPrefix || 'Old Outdated Sites';
  const headingLoss = comparisonData?.headingLoss || 'Lose Customers';
  const headingWin = comparisonData?.headingWin || 'Win Them';
  const subheading = comparisonData?.subheading || 'Most local businesses lose half their traffic before the first paragraph even loads. Here is how our modern rebuilds change everything.';

  const oldColumnHeading = comparisonData?.oldColumnHeading || 'The Outdated Way (DIY Builders & Templates)';
  const oldColumnSubtitle = comparisonData?.oldColumnSubtitle || 'Costing you credibility & daily revenue';
  const oldColumnResult = comparisonData?.oldColumnResult || 'Result: High bounce rates, wasted ad budget, lost client trust.';

  const newColumnHeading = comparisonData?.newColumnHeading || 'The Rebuilt Way (Handcrafted Dev Team Code)';
  const newColumnSubtitle = comparisonData?.newColumnSubtitle || 'Engineered for speed, trust & measurable conversions';
  const newColumnResult = comparisonData?.newColumnResult || 'Result: 3x+ more calls, inquiries, and orders.';

  return (
    <motion.section 
      id="comparison" 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`w-full py-16 sm:py-24 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0B0F17] border-white/10' : 'bg-white border-[#064E3B]/10'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-3 ${
            isDark ? 'bg-white/5 border-[#B7E84B]/30 text-[#B7E84B]' : 'bg-[#EAF3E8] border-[#B7E84B]/40 text-[#064E3B]'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
              {eyebrow}
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase ${
            isDark ? 'text-white' : 'text-[#064E3B]'
          }`}>
            {headingPrefix} <span className="text-red-500">{headingLoss}</span>. Rebuilt Sites <span className={isDark ? 'text-[#B7E84B]' : 'text-[#059669]'}>{headingWin}</span>.
          </h2>
          <p className={`text-sm sm:text-base mt-3 font-medium ${
            isDark ? 'text-white/70' : 'text-[#064E3B]/80'
          }`}>
            {subheading}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left: The Outdated Common Site */}
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-xs flex flex-col justify-between transition-colors ${
            isDark 
              ? 'bg-red-950/20 border-red-800/40 text-red-200' 
              : 'bg-red-50/40 border-red-200/60'
          }`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                isDark ? 'bg-red-900/40 text-red-300' : 'bg-red-100 text-red-700'
              }`}>
                <X className="w-3.5 h-3.5" />
                <span>{oldColumnHeading}</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-6 ${
                isDark ? 'text-white' : 'text-[#064E3B]'
              }`}>
                {oldColumnSubtitle}
              </h3>

              <div className="space-y-5">
                {comparisons.map((c, i) => {
                  const Icon = iconMap[c.icon] || Zap;
                  return (
                    <div key={i} className={`flex items-start gap-3.5 pb-4 border-b last:border-0 last:pb-0 ${
                      isDark ? 'border-red-900/40' : 'border-red-200/40'
                    }`}>
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isDark ? 'bg-red-900/40 text-red-300' : 'bg-red-100/80 text-red-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${
                          isDark ? 'text-red-400' : 'text-red-700'
                        }`}>
                          {c.aspect}
                        </h4>
                        <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                          isDark ? 'text-white/70' : 'text-[#064E3B]/80'
                        }`}>
                          {c.oldWay}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t text-xs font-semibold ${
              isDark ? 'border-red-900/40 text-red-400' : 'border-red-200/50 text-red-600'
            }`}>
              {oldColumnResult}
            </div>
          </div>

          {/* Right: The Rebuilt Dev Team Way */}
          <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-2xl flex flex-col justify-between transition-colors ${
            isDark
              ? 'bg-white/5 border-[#B7E84B]/60 shadow-[0_0_40px_rgba(183,232,75,0.15)] ring-1 ring-[#B7E84B]/40 backdrop-blur-md'
              : 'bg-[#EAF3E8]/60 border-[#064E3B] shadow-[0_20px_50px_-15px_rgba(6,78,59,0.15)] ring-1 ring-[#B7E84B]/50'
          }`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
                isDark 
                  ? 'bg-[#064E3B] text-[#B7E84B] border-[#B7E84B]/40' 
                  : 'bg-[#064E3B] text-[#B7E84B] border-[#B7E84B]/40'
              }`}>
                <Check className="w-3.5 h-3.5" />
                <span>{newColumnHeading}</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-6 ${
                isDark ? 'text-white' : 'text-[#064E3B]'
              }`}>
                {newColumnSubtitle}
              </h3>

              <div className="space-y-5">
                {comparisons.map((c, i) => {
                  const Icon = iconMap[c.icon] || Zap;
                  return (
                    <div key={i} className={`flex items-start gap-3.5 pb-4 border-b last:border-0 last:pb-0 ${
                      isDark ? 'border-white/10' : 'border-[#064E3B]/10'
                    }`}>
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 shadow-xs ${
                        isDark ? 'bg-[#064E3B] text-[#B7E84B]' : 'bg-[#064E3B] text-[#B7E84B]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${
                          isDark ? 'text-[#B7E84B]' : 'text-[#064E3B]'
                        }`}>
                          {c.aspect}
                        </h4>
                        <p className={`text-xs sm:text-sm font-medium mt-1 leading-relaxed ${
                          isDark ? 'text-white/90' : 'text-[#064E3B]'
                        }`}>
                          {c.rebuildWay}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDark ? 'border-white/10' : 'border-[#064E3B]/15'
            }`}>
              <span className={`text-xs font-bold ${
                isDark ? 'text-[#B7E84B]' : 'text-[#064E3B]'
              }`}>
                {newColumnResult}
              </span>
              <button
                onClick={onCtaClick}
                className={`w-full sm:w-auto px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#B7E84B] text-[#0B0F17] border-[#B7E84B] hover:bg-[#a3d438]'
                    : 'bg-[#064E3B] text-white border-[#B7E84B]/40 hover:bg-[#059669]'
                }`}
              >
                Get a Free Audit →
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

