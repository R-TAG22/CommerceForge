import React from 'react';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface CtaBannerProps {
  onCtaClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
  const ctaData = activeContent?.cta;

  const eyebrow = ctaData?.eyebrow || 'ACCEPTING NEW CLIENTS FOR THIS MONTH';
  const headline = ctaData?.headingPrefix || (ctaData as any)?.headline || 'Ready To Give Your Business A';
  const headlineHighlight = ctaData?.headingHighlight || 'Real Digital Home';
  const description = ctaData?.description || 'Get a free site audit and transparent proposal within 24 hours. No pushy sales calls, no obligation, just honest architectural advice and clear pricing.';
  const primaryButtonText = ctaData?.primaryCtaText || (ctaData as any)?.primaryButtonText || 'GET YOUR FREE QUOTE';
  const secondaryButtonText = ctaData?.secondaryCtaText || (ctaData as any)?.secondaryButtonText || 'EMAIL US DIRECTLY';
  const secondaryButtonEmail = ctaData?.supportEmail || (ctaData as any)?.secondaryButtonEmail || 'contact@commerceforge.agency';
  const features = ctaData?.guarantees || (ctaData as any)?.features || [
    'Zero obligation quote',
    '50/50 transparent payments',
    '7–10 day turnaround',
  ];

  return (
    <section id="contact" className="w-full py-14 sm:py-20 max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-10 xl:px-12">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E3A2B] via-[#162C20] to-[#0E1F16] text-white p-6 sm:p-12 lg:p-16 shadow-[0_24px_60px_-15px_rgba(30,58,43,0.35)]">
        {/* Glow acccents */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial from-[#B7E84B]/20 to-transparent pointer-events-none blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-[350px] h-[350px] bg-radial from-[#B7E84B]/15 to-transparent pointer-events-none blur-2xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-[#B7E84B] text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight uppercase leading-tight">
            {headline} <span className="text-[#B7E84B]">{headlineHighlight}</span>?
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/80 font-medium leading-relaxed max-w-2xl">
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <button
              id="cta-banner-btn-quote"
              onClick={onCtaClick}
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-[#B7E84B] hover:bg-[#a5d83a] text-[#0F241A] text-xs sm:text-sm font-black tracking-[0.14em] uppercase shadow-lg hover:shadow-[0_0_30px_rgba(183,232,75,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>{primaryButtonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href={`mailto:${secondaryButtonEmail}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-bold tracking-[0.12em] uppercase border border-white/15 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>{secondaryButtonText}</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/70 font-medium">
            {features.map((feat: any, i: number) => {
              const text = typeof feat === 'string' ? feat : feat?.text || '';
              return (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7E84B]" />
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
