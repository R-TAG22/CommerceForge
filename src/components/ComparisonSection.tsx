import React from 'react';
import { Check, X, ArrowRight, Smartphone, Zap, Search, ShoppingBag, Layers, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ComparisonSectionProps {
  onCtaClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
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

  const newColumnHeading = comparisonData?.newColumnHeading || 'The Rebuilt Way (Handcrafted Studio Code)';
  const newColumnSubtitle = comparisonData?.newColumnSubtitle || 'Engineered for speed, trust & measurable conversions';
  const newColumnResult = comparisonData?.newColumnResult || 'Result: 3x+ more calls, inquiries, and orders.';

  return (
    <section id="comparison" className="w-full py-16 sm:py-24 bg-white border-t border-[#1E3A2B]/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A2B] tracking-tight uppercase">
            {headingPrefix} <span className="text-red-500">{headingLoss}</span>. Rebuilt Sites <span className="text-[#2D5A40]">{headingWin}</span>.
          </h2>
          <p className="text-sm sm:text-base text-[#4A584E] mt-3 font-medium">
            {subheading}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left: The Outdated Common Site */}
          <div className="rounded-3xl p-6 sm:p-8 bg-red-50/40 border border-red-200/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
                <X className="w-3.5 h-3.5" />
                <span>{oldColumnHeading}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E3A2B] tracking-tight mb-6">
                {oldColumnSubtitle}
              </h3>

              <div className="space-y-5">
                {comparisons.map((c, i) => {
                  const Icon = iconMap[c.icon] || Zap;
                  return (
                    <div key={i} className="flex items-start gap-3.5 pb-4 border-b border-red-200/40 last:border-0 last:pb-0">
                      <div className="p-2 rounded-xl bg-red-100/80 text-red-600 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-red-700">
                          {c.aspect}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4A584E] mt-1 leading-relaxed">
                          {c.oldWay}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-200/50 text-xs text-red-600 font-semibold">
              {oldColumnResult}
            </div>
          </div>

          {/* Right: The Rebuilt Studio Way */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#EAF3E8]/60 border-2 border-[#1E3A2B] shadow-[0_20px_50px_-15px_rgba(30,58,43,0.15)] ring-1 ring-[#B7E84B]/50 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2B] text-[#B7E84B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#B7E84B]/40">
                <Check className="w-3.5 h-3.5" />
                <span>{newColumnHeading}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E3A2B] tracking-tight mb-6">
                {newColumnSubtitle}
              </h3>

              <div className="space-y-5">
                {comparisons.map((c, i) => {
                  const Icon = iconMap[c.icon] || Zap;
                  return (
                    <div key={i} className="flex items-start gap-3.5 pb-4 border-b border-[#1E3A2B]/10 last:border-0 last:pb-0">
                      <div className="p-2 rounded-xl bg-[#1E3A2B] text-[#B7E84B] shrink-0 mt-0.5 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A2B]">
                          {c.aspect}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#1E3A2B]/90 font-medium mt-1 leading-relaxed">
                          {c.rebuildWay}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1E3A2B]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#1E3A2B] font-bold">
                {newColumnResult}
              </span>
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B] transition-colors"
              >
                Get a Free Audit →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
