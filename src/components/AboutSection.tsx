import React from 'react';
import { Shield, Sparkles, Heart, Award, ArrowRight, Code, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { usePublicTheme } from '../context/PublicThemeContext';

interface AboutSectionProps {
  onCtaClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
  const { isDark } = usePublicTheme();
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
  const quoteAuthor = brandData?.quoteAuthor || 'CommerceForge Dev Team Lead';

  return (
    <motion.section 
      id="about" 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`w-full py-12 sm:py-20 transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0B0F17] text-white' 
          : 'bg-transparent text-[#1E3A2B]'
      }`}
      aria-label="About the Dev Team"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Dev Team Mission & Story */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 border ${
              isDark 
                ? 'bg-white/5 border-white/15 text-[#B7E84B]' 
                : 'bg-[#EAF3E8] border-[#B7E84B]/40 text-[#1E3A2B]'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                {brandData?.eyebrow || 'ABOUT THE DEV TEAM'}
              </span>
            </div>
            
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight ${
              isDark ? 'text-white' : 'text-[#1E3A2B]'
            }`}>
              {brandData?.heading || 'Crafting Real Digital Homes For'}{' '}
              <span className={isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'}>
                {brandData?.headingHighlight || 'Independent Brands'}
              </span>
            </h2>

            <div className={`mt-6 space-y-4 text-sm sm:text-base font-medium leading-relaxed ${
              isDark ? 'text-white/70' : 'text-[#4A584E]'
            }`}>
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Core Values Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t ${
              isDark ? 'border-white/10' : 'border-[#1E3A2B]/10'
            }`}>
              {values.map((val, i) => {
                const Icon = iconMap[val.icon] || Code;
                const valDesc = val.description || (val as any).desc || '';
                return (
                  <div 
                    key={i} 
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/[0.03] border-white/10 hover:border-[#B7E84B]/30' 
                        : 'bg-[#F8FAF8] border-[#1E3A2B]/8 hover:border-[#1E3A2B]/20'
                    }`}
                  >
                    <div className={`p-2 w-fit rounded-xl mb-2 ${
                      isDark ? 'bg-white/10 text-[#B7E84B]' : 'bg-[#EAF3E8] text-[#1E3A2B]'
                    }`}>
                      <Icon className="w-4 h-4 text-[#2D5A40] dark:text-[#B7E84B]" />
                    </div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-white' : 'text-[#1E3A2B]'
                    }`}>
                      {val.title}
                    </h4>
                    <p className={`text-[11px] mt-1 ${
                      isDark ? 'text-white/60' : 'text-[#4A584E]'
                    }`}>
                      {valDesc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onCtaClick}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md ${
                  isDark
                    ? 'bg-[#0B0F17] text-white border-2 border-[#B7E84B]/70 hover:border-[#B7E84B] hover:shadow-[0_0_20px_rgba(183,232,75,0.4)]'
                    : 'bg-[#1E3A2B] text-white border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B]'
                }`}
              >
                <span>Work With Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B7E84B]" />
              </button>
            </div>
          </div>

          {/* Right Column: Dev Team Card & Metrics Badge */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className={`relative rounded-3xl p-7 sm:p-8 border shadow-sm transition-all duration-300 ${
              isDark 
                ? 'bg-white/[0.03] border-white/10' 
                : 'bg-[#F8FAF8] border-[#1E3A2B]/10'
            }`}>
              <div className={`flex items-center justify-between pb-6 border-b ${
                isDark ? 'border-white/10' : 'border-[#1E3A2B]/8'
              }`}>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                    isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'
                  }`}>
                    DEV TEAM STANDARDS
                  </span>
                  <h3 className={`text-xl font-black mt-0.5 ${
                    isDark ? 'text-white' : 'text-[#1E3A2B]'
                  }`}>
                    Production Standards
                  </h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                  isDark 
                    ? 'bg-[#B7E84B]/10 text-[#B7E84B] border-[#B7E84B]/30' 
                    : 'bg-[#EAF3E8] text-[#1E3A2B] border-[#B7E84B]/30'
                }`}>
                  Verified 99+ Scores
                </div>
              </div>

              <div className="space-y-4 my-6">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className={isDark ? 'text-white/70' : 'text-[#4A584E]'}>Google Core Web Vitals (Mobile)</span>
                  <span className={`font-bold ${isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'}`}>PASS (100/100)</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/10' : 'bg-[#1E3A2B]/8'
                }`}>
                  <div className="bg-[#B7E84B] h-full rounded-full w-[99%]" />
                </div>

                <div className="flex items-center justify-between text-xs font-medium pt-2">
                  <span className={isDark ? 'text-white/70' : 'text-[#4A584E]'}>Average First Contentful Paint</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#1E3A2B]'}`}>480ms</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/10' : 'bg-[#1E3A2B]/8'
                }`}>
                  <div className={`${isDark ? 'bg-white' : 'bg-[#1E3A2B]'} h-full rounded-full w-[94%]`} />
                </div>

                <div className="flex items-center justify-between text-xs font-medium pt-2">
                  <span className={isDark ? 'text-white/70' : 'text-[#4A584E]'}>Mobile Touch Targets & Contrast</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#1E3A2B]'}`}>WCAG AA Certified</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/10' : 'bg-[#1E3A2B]/8'
                }`}>
                  <div className="bg-[#2D5A40] dark:bg-[#B7E84B] h-full rounded-full w-[100%]" />
                </div>
              </div>

              <div className={`p-4 rounded-2xl border mt-6 ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-[#1E3A2B]/8'
              }`}>
                <div className={`text-xs font-bold ${
                  isDark ? 'text-white' : 'text-[#1E3A2B]'
                }`}>
                  {quote}
                </div>
                <div className={`text-[11px] mt-1 font-semibold ${
                  isDark ? 'text-white/60' : 'text-[#4A584E]'
                }`}>
                  {quoteAuthor}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};
