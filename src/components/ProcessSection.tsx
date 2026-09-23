import React from 'react';
import { Search, Compass, Code2, Rocket, ArrowRight, Zap, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { usePublicTheme } from '../context/PublicThemeContext';

interface ProcessSectionProps {
  onCtaClick: () => void;
}

const STEP_IMAGE_MAP: Record<string, string> = {
  '01': 'process-01-audit.jpeg',
  '02': 'process-02-mobile-design.jpeg',
  '03': 'process-03-clean-code.jpeg',
  '04': 'process-04-qa-launch.jpeg',
  '1': 'process-01-audit.jpeg',
  '2': 'process-02-mobile-design.jpeg',
  '3': 'process-03-clean-code.jpeg',
  '4': 'process-04-qa-launch.jpeg',
};

const DEFAULT_IMAGES = [
  'process-01-audit.jpeg',
  'process-02-mobile-design.jpeg',
  'process-03-clean-code.jpeg',
  'process-04-qa-launch.jpeg',
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
  const { isDark } = usePublicTheme();
  const processData = activeContent?.process;

  const iconMap: Record<string, any> = {
    Search,
    Compass,
    Code2,
    Rocket,
    Zap,
    CheckCircle2,
    ShieldCheck,
    Heart,
    Sparkles,
  };

  const defaultSteps = [
    {
      num: '01',
      stepNumber: '01',
      icon: 'Search',
      title: 'Discovery & UX Audit',
      desc: 'We analyze your existing website, review customer drop-offs on mobile, and establish clear conversion goals before writing a single line of code.',
      deliverable: 'Strategy & section blueprint',
      image: 'process-01-audit.jpeg',
    },
    {
      num: '02',
      stepNumber: '02',
      icon: 'Compass',
      title: 'Custom Mobile-First Design',
      desc: 'We design bespoke layouts specifically tailored to your brand identity, product lineup, and thumb-friendly touch interactions.',
      deliverable: 'Interactive high-fidelity wireframes',
      image: 'process-02-mobile-design.jpeg',
    },
    {
      num: '03',
      stepNumber: '03',
      icon: 'Code2',
      title: 'Handcrafted Clean Code',
      desc: 'Built with modern React, TypeScript, and clean Tailwind CSS. Zero slow drag-and-drop page builder bloat, zero unnecessary plugins.',
      deliverable: 'Sub-600ms page load speeds',
      image: 'process-03-clean-code.jpeg',
    },
    {
      num: '04',
      stepNumber: '04',
      icon: 'Rocket',
      title: 'Cross-Device QA & Launch',
      desc: 'Rigorous testing on iOS, Android, and desktop screens. We configure your custom domain, hook up forms, and hand over full ownership.',
      deliverable: '100% code ownership & zero lock-in',
      image: 'process-04-qa-launch.jpeg',
    },
  ];

  const steps = processData?.steps?.length ? processData.steps : defaultSteps;
  const eyebrow = processData?.eyebrow || 'OUR SIMPLE 4-STEP PROCESS';
  const heading = processData?.heading || (processData as any)?.headingPrefix || 'How We Take You From';
  const headingHighlight = processData?.headingHighlight || 'Brief To Launch';
  const subheading = processData?.subheading || 'Clear milestones, proactive communication, and quick deliveries. No endless waiting or confusing technical jargon.';
  const ctaText = processData?.ctaText || 'START STEP 01: FREE DISCOVERY AUDIT';

  const getStepImage = (step: any, idx: number): string => {
    if (step.image) return step.image;
    const num = (step.stepNumber || step.num || '').toString().padStart(2, '0');
    if (STEP_IMAGE_MAP[num]) return STEP_IMAGE_MAP[num];
    return DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length];
  };

  return (
    <motion.section 
      id="process" 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`w-full py-16 sm:py-24 border-t transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0A0F17] border-white/10 text-white' 
          : 'bg-[#F8FAF8] border-[#1E3A2B]/10 text-[#1E3A2B]'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 border ${
            isDark ? 'bg-white/5 border-[#B7E84B]/30' : 'bg-[#EAF3E8] border-[#B7E84B]/40'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
            <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
              isDark ? 'text-[#B7E84B]' : 'text-[#1E3A2B]'
            }`}>
              {eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            {heading}{' '}
            <span className={isDark ? 'text-[#B7E84B]' : 'text-[#2D5A40]'}>
              {headingHighlight}
            </span>
          </h2>
          <p className={`text-sm sm:text-base mt-3 font-medium ${
            isDark ? 'text-gray-300' : 'text-[#4A584E]'
          }`}>
            {subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = iconMap[step.icon] || Code2;
            const stepNum = (step as any).stepNumber || (step as any).num || `0${idx + 1}`;
            const stepDesc = (step as any).description || (step as any).desc || '';
            const imageFilename = getStepImage(step, idx);

            return (
              <div
                key={idx}
                className={`relative rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-xl ${
                  isDark
                    ? 'bg-[#121B29] border-white/10 hover:border-[#B7E84B]/60 shadow-lg'
                    : 'bg-white border-[#1E3A2B]/10 hover:border-[#B7E84B] shadow-xs'
                }`}
              >
                {/* 1. Image */}
                <div className={`w-full aspect-[4/3] sm:aspect-square overflow-hidden relative border-b ${
                  isDark ? 'bg-[#0B111A] border-white/10' : 'bg-[#F4F6F4] border-[#1E3A2B]/8'
                }`}>
                  <img
                    src={`${import.meta.env.BASE_URL}assets/process/${imageFilename}`}
                    alt={step.title}
                    className="w-full h-full object-cover object-center rounded-t-3xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Card Content: [Step Number/Icon] -> [Title] -> [Description] -> [Footer text] */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* 2. Step Number / Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-2xl group-hover:scale-110 transition-all duration-300 ${
                        isDark
                          ? 'bg-white/10 text-[#B7E84B] group-hover:bg-[#B7E84B] group-hover:text-[#0F241A]'
                          : 'bg-[#EAF3E8] text-[#1E3A2B] group-hover:bg-[#B7E84B] group-hover:text-[#0F241A]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-3xl font-black font-mono transition-colors ${
                        isDark ? 'text-white/20 group-hover:text-[#B7E84B]/60' : 'text-[#1E3A2B]/15 group-hover:text-[#2D5A40]/40'
                      }`}>
                        {stepNum}
                      </span>
                    </div>

                    {/* 3. Title */}
                    <h3 className={`text-lg font-black tracking-tight transition-colors ${
                      isDark ? 'text-white group-hover:text-[#B7E84B]' : 'text-[#1E3A2B] group-hover:text-[#2D5A40]'
                    }`}>
                      {step.title}
                    </h3>

                    {/* 4. Description */}
                    <p className={`text-xs sm:text-[13px] font-medium mt-2.5 leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-[#4A584E]'
                    }`}>
                      {stepDesc}
                    </p>
                  </div>

                  {/* 5. Footer text */}
                  <div className={`mt-6 pt-4 border-t text-[11px] font-bold flex items-center justify-between ${
                    isDark ? 'border-white/10 text-[#B7E84B]' : 'border-[#1E3A2B]/8 text-[#2D5A40]'
                  }`}>
                    <span>{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onCtaClick}
            className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all shadow-md hover:scale-105 cursor-pointer ${
              isDark
                ? 'bg-[#B7E84B] text-[#0F241A] hover:bg-[#a6d83b] border border-[#B7E84B]'
                : 'bg-[#1E3A2B] text-white hover:bg-[#0F241A] border border-[#B7E84B]/40 hover:border-[#B7E84B]'
            }`}
          >
            <span>{ctaText}</span>
            <ArrowRight className={`w-4 h-4 ${isDark ? 'text-[#0F241A]' : 'text-[#B7E84B]'}`} />
          </button>
        </div>
      </div>
    </motion.section>
  );
};
