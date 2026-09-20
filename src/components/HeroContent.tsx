import React from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface HeroContentProps {
  onCtaClick: () => void;
  onExplorePackages: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onCtaClick, onExplorePackages }) => {
  const { activeContent } = useCMS();
  const heroData = activeContent?.hero;

  const eyebrowText = heroData?.eyebrowText || 'Web Design & Performance Studio';
  const headlineLine1 = heroData?.headlineLine1 || 'THE DIGITAL';
  const headlineLine2 = heroData?.headlineLine2 || 'HOME FOR';
  const headlineHighlight = heroData?.headlineHighlight || 'LOCAL';
  const headlineLine3 = heroData?.headlineLine3 || 'BUSINESSES.';
  const description = heroData?.description || 'We rebuild sluggish, outdated websites into lightning-fast, mobile-responsive powerhouses. Professional quality, thumb-friendly design, and transparent pricing starting at $159.';
  const primaryCtaText = heroData?.primaryCtaText || 'GET A FREE QUOTE';
  const secondaryCtaText = heroData?.secondaryCtaText || 'VIEW PACKAGES';
  const guarantees = heroData?.guarantees || [
    { id: 'g-1', text: 'Starting at $159', icon: 'CheckCircle2' },
    { id: 'g-2', text: '7–10 Business Days', icon: 'Zap' },
    { id: 'g-3', text: '100% Responsive', icon: 'CheckCircle2' },
    { id: 'g-4', text: 'Made in Philippines', icon: 'Dot' },
  ];

  return (
    <div 
      id="hero-content-column" 
      className="flex flex-col justify-center items-center text-center z-20 w-full max-w-4xl mx-auto py-2 md:py-4 px-2 sm:px-4"
    >
      {/* Studio Category Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-4 sm:mb-6 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse shadow-[0_0_8px_#B7E84B]" />
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
          {eyebrowText}
        </span>
      </div>

      {/* Massive Bold Headline Across Top */}
      <h1 
        id="hero-main-headline"
        className="font-black tracking-[-0.04em] uppercase select-none transition-all w-full text-[#1E3A2B] leading-[0.95]"
        style={{
          fontSize: 'clamp(2.2rem, 5.8vw, 5.2rem)',
        }}
      >
        <span>{headlineLine1} {headlineLine2} </span>
        <span className="text-[#2D5A40] inline-block underline decoration-[#B7E84B] decoration-4 underline-offset-4">
          {headlineHighlight}
        </span>
        <span> {headlineLine3}</span>
      </h1>

      {/* Clean Descriptive Copy Centered */}
      <p 
        id="hero-subheadline" 
        className="mt-4 sm:mt-6 text-[#4A584E] font-medium text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto"
      >
        {description}
      </p>

      {/* Action Buttons: Primary Quote + Explore Packages */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
        <button
          id="hero-primary-cta-btn"
          onClick={onCtaClick}
          className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#1E3A2B] text-white text-xs sm:text-sm font-bold tracking-[0.12em] uppercase border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B] hover:shadow-[0_12px_28px_-6px_rgba(183,232,75,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#B7E84B]/30 cursor-pointer"
        >
          <span>{primaryCtaText}</span>
          <ArrowRight className="w-4 h-4 text-[#B7E84B] transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>

        <button
          id="hero-packages-cta-btn"
          onClick={onExplorePackages}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-[#1E3A2B] text-xs sm:text-sm font-bold tracking-[0.12em] uppercase border border-[#1E3A2B]/15 hover:border-[#2D5A40] hover:text-[#1E3A2B] hover:bg-[#EAF3E8] transition-all duration-200 shadow-xs cursor-pointer"
        >
          <span>{secondaryCtaText}</span>
        </button>
      </div>

      {/* Key Guarantees & Proof Badges */}
      <div className="mt-7 sm:mt-8 pt-6 border-t border-[#1E3A2B]/10 w-full max-w-xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-semibold text-[#4A584E]">
        {guarantees.map((item: any, idx: number) => {
          const text = typeof item === 'string' ? item : item?.text || '';
          const icon = typeof item === 'object' && item?.icon ? item.icon : null;
          const key = (typeof item === 'object' && item?.id) ? item.id : `hero-guarantee-${idx}`;

          return (
            <div key={key} className="flex items-center gap-1.5">
              {icon === 'Dot' || idx === 3 ? (
                <span className="inline-block w-2 h-2 rounded-full bg-[#B7E84B] shadow-[0_0_6px_#B7E84B] shrink-0" />
              ) : icon === 'Zap' || (idx % 2 !== 0 && icon !== 'CheckCircle2') ? (
                <Zap className="w-4 h-4 text-[#2D5A40] shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#2D5A40] shrink-0" />
              )}
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
