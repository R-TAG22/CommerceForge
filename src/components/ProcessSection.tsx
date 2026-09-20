import React from 'react';
import { Search, Compass, Code2, Rocket, ArrowRight, Zap, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ProcessSectionProps {
  onCtaClick: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
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
      icon: 'Search',
      title: 'Discovery & UX Audit',
      desc: 'We analyze your existing website, review customer drop-offs on mobile, and establish clear conversion goals before writing a single line of code.',
      deliverable: 'Strategy & section blueprint',
    },
    {
      num: '02',
      icon: 'Compass',
      title: 'Custom Mobile-First Design',
      desc: 'We design bespoke layouts specifically tailored to your brand identity, product lineup, and thumb-friendly touch interactions.',
      deliverable: 'Interactive high-fidelity wireframes',
    },
    {
      num: '03',
      icon: 'Code2',
      title: 'Handcrafted Clean Code',
      desc: 'Built with modern React, TypeScript, and clean Tailwind CSS. Zero slow drag-and-drop page builder bloat, zero unnecessary plugins.',
      deliverable: 'Sub-600ms page load speeds',
    },
    {
      num: '04',
      icon: 'Rocket',
      title: 'Cross-Device QA & Launch',
      desc: 'Rigorous testing on iOS, Android, and desktop screens. We configure your custom domain, hook up forms, and hand over full ownership.',
      deliverable: '100% code ownership & zero lock-in',
    },
  ];

  const steps = processData?.steps?.length ? processData.steps : defaultSteps;
  const eyebrow = processData?.eyebrow || 'OUR SIMPLE 4-STEP PROCESS';
  const heading = processData?.heading || 'How We Take You From';
  const headingHighlight = processData?.headingHighlight || 'Brief To Launch';
  const subheading = processData?.subheading || 'Clear milestones, proactive communication, and quick deliveries. No endless waiting or confusing technical jargon.';
  const ctaText = processData?.ctaText || 'START STEP 01: FREE DISCOVERY AUDIT';

  return (
    <section id="process" className="w-full py-16 sm:py-24 bg-[#F8FAF8] border-t border-[#1E3A2B]/10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A2B] tracking-tight uppercase">
            {heading} <span className="text-[#2D5A40]">{headingHighlight}</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A584E] mt-3 font-medium">
            {subheading}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = iconMap[step.icon] || Code2;
            const stepNum = (step as any).stepNumber || (step as any).num || `0${idx + 1}`;
            const stepDesc = (step as any).description || (step as any).desc || '';
            return (
              <div
                key={idx}
                className="relative rounded-3xl p-6 sm:p-7 bg-white border border-[#1E3A2B]/10 shadow-xs hover:shadow-md hover:border-[#B7E84B] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-[#EAF3E8] text-[#1E3A2B] group-hover:scale-110 group-hover:bg-[#B7E84B] group-hover:text-[#0F241A] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-black text-[#1E3A2B]/15 group-hover:text-[#2D5A40]/40 transition-colors">
                      {stepNum}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#1E3A2B] tracking-tight group-hover:text-[#2D5A40] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#4A584E] font-medium mt-2 leading-relaxed">
                    {stepDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E3A2B]/8 text-[11px] font-bold text-[#2D5A40] flex items-center justify-between">
                  <span>{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1E3A2B] text-white text-xs sm:text-sm font-bold tracking-[0.14em] uppercase border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B] transition-all shadow-md hover:scale-105"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[#B7E84B]" />
          </button>
        </div>
      </div>
    </section>
  );
};
