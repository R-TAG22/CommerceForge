import React from 'react';
import { Shield, Sparkles, Heart, Award, ArrowRight, Code, Zap, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface AboutSectionProps {
  onCtaClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
  const brandData = activeContent?.brand;

  const iconMap: Record<string, any> = {
    Code,
    Shield,
    Heart,
    Award,
    Sparkles,
    Zap,
    CheckCircle2,
  };

  const defaultValues = [
    { icon: 'Code', title: 'No Generic Builders', desc: 'Clean handcrafted code without slow plugin bloat.' },
    { icon: 'Shield', title: 'Zero Lock-In', desc: 'You own 100% of your assets, domain, and codebase.' },
    { icon: 'Heart', title: 'Local Pride', desc: 'Built by passionate engineers in the Philippines.' },
  ];

  const defaultParagraphs = [
    'Too many small businesses are trapped between two frustrating extremes: paying tens of thousands of dollars to bloated traditional agencies, or wrestling with slow, broken DIY website builders that look terrible on mobile phones.',
    'We started CommerceForge with a clear purpose: build clean, handcrafted websites engineered for genuine conversions at honest, transparent rates starting at $159.',
    'Every project we build is written with modern code, optimized for thumb-friendly mobile screens, and delivered with 100% code ownership.',
  ];

  const paragraphs = brandData?.storyParagraphs?.length ? brandData.storyParagraphs : defaultParagraphs;
  const values = brandData?.values?.length ? brandData.values : defaultValues;
  const quote = brandData?.quote || '"A fast website is not an afterthought — it is the foundation of digital revenue."';
  const quoteAuthor = brandData?.quoteAuthor || 'CommerceForge Studio Engineering Lead';

  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-white border-t border-[#1E3A2B]/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Studio Mission & Story */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
                {brandData?.eyebrow || 'ABOUT THE STUDIO'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A2B] tracking-tight uppercase leading-tight">
              {brandData?.heading || 'Crafting Real Digital Homes For'}{' '}
              <span className="text-[#2D5A40]">{brandData?.headingHighlight || 'Independent Brands'}</span>
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#4A584E] font-medium leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#1E3A2B]/10">
              {values.map((val, i) => {
                const Icon = iconMap[val.icon] || Code;
                const valDesc = val.description || (val as any).desc || '';
                return (
                  <div key={i} className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#1E3A2B]/8">
                    <div className="p-2 w-fit rounded-xl bg-[#EAF3E8] text-[#1E3A2B] mb-2">
                      <Icon className="w-4 h-4 text-[#2D5A40]" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">{val.title}</h4>
                    <p className="text-[11px] text-[#4A584E] mt-1">{valDesc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B] transition-colors"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B7E84B]" />
              </button>
            </div>
          </div>

          {/* Right Column: Studio Card & Metrics Badge */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative rounded-3xl p-7 sm:p-8 bg-[#F8FAF8] border border-[#1E3A2B]/10 shadow-sm">
              <div className="flex items-center justify-between pb-6 border-b border-[#1E3A2B]/8">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D5A40]">
                    STUDIO STANDARDS
                  </span>
                  <h3 className="text-xl font-black text-[#1E3A2B] mt-0.5">
                    Production Standards
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#EAF3E8] text-[#1E3A2B] border border-[#B7E84B]/30 text-[11px] font-bold">
                  Verified 99+ Scores
                </div>
              </div>

              <div className="space-y-4 my-6">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#4A584E]">Google Core Web Vitals (Mobile)</span>
                  <span className="font-bold text-[#2D5A40]">PASS (100/100)</span>
                </div>
                <div className="w-full bg-[#1E3A2B]/8 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#B7E84B] h-full rounded-full w-[99%]" />
                </div>

                <div className="flex items-center justify-between text-xs font-medium pt-2">
                  <span className="text-[#4A584E]">Average First Contentful Paint</span>
                  <span className="font-bold text-[#1E3A2B]">480ms</span>
                </div>
                <div className="w-full bg-[#1E3A2B]/8 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E3A2B] h-full rounded-full w-[94%]" />
                </div>

                <div className="flex items-center justify-between text-xs font-medium pt-2">
                  <span className="text-[#4A584E]">Mobile Touch Targets & Contrast</span>
                  <span className="font-bold text-[#1E3A2B]">WCAG AA Certified</span>
                </div>
                <div className="w-full bg-[#1E3A2B]/8 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2D5A40] h-full rounded-full w-[100%]" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#1E3A2B]/8 mt-6">
                <div className="text-xs font-bold text-[#1E3A2B]">
                  {quote}
                </div>
                <div className="text-[11px] text-[#4A584E] mt-1 font-semibold">
                  {quoteAuthor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
