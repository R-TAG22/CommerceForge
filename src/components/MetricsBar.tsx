import React from 'react';
import { Zap, TrendingUp, Clock, ShieldCheck, Award, Heart, Sparkles, Star } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const MetricsBar: React.FC = () => {
  const { activeContent } = useCMS();
  const statsData = activeContent?.statistics;

  const iconMap: Record<string, any> = {
    TrendingUp,
    Zap,
    Clock,
    ShieldCheck,
    Award,
    Heart,
    Sparkles,
    Star,
  };

  const defaultMetrics = [
    {
      icon: TrendingUp,
      value: '+310%',
      label: 'Avg. Mobile Conversion',
      desc: 'Thumb-friendly touch targets & instant loading',
    },
    {
      icon: Zap,
      value: '<600ms',
      label: 'Edge Load Speed',
      desc: 'Sub-second first contentful paint',
    },
    {
      icon: Clock,
      value: '7–10 Days',
      label: 'Rapid Turnaround',
      desc: 'Fixed scope, zero delays, fast delivery',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Code Ownership',
      desc: 'Zero lock-in, clean code, no monthly builder fees',
    },
  ];

  const defaultClients = [
    'Gold & Grove',
    'Premium Trends Shop',
    'Rosemira Organics',
    'HAOMA Earth',
    'Juice Beauty',
    "Doctor's Select",
    "Nature's Way",
    'Coalition LA',
  ];

  const metrics = statsData?.stats
    ? statsData.stats
        .filter((s) => s.active !== false)
        .map((s) => ({
          icon: iconMap[s.icon] || TrendingUp,
          value: s.value,
          label: s.label,
          desc: s.desc,
        }))
    : defaultMetrics;

  const clientNames = statsData?.clientBrands?.length
    ? statsData.clientBrands
    : defaultClients;

  return (
    <section id="metrics-bar-section" className="w-full py-8 sm:py-14 border-y border-[#1E3A2B]/10 bg-white/70 backdrop-blur-xs">
      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-10 xl:px-12">
        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx}
                className="p-3.5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-[#1E3A2B]/10 hover:border-[#B7E84B] hover:shadow-sm transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#EAF3E8] text-[#1E3A2B] group-hover:scale-110 group-hover:bg-[#B7E84B] group-hover:text-[#0F241A] transition-all shrink-0">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-xl sm:text-3xl lg:text-4xl font-black text-[#1E3A2B] tracking-tight truncate">
                    {m.value}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1E3A2B] tracking-tight">{m.label}</h4>
                <p className="text-[11px] sm:text-xs text-[#4A584E] mt-0.5 sm:mt-1 font-medium leading-tight">{m.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Client Brands Row */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-[#1E3A2B]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#4A584E] shrink-0">
            Trusted by growing local brands:
          </span>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-[#1E3A2B]/80">
            {clientNames.map((name, i) => (
              <span key={i} className="hover:text-[#2D5A40] transition-colors cursor-default">
                {name}
                {i < clientNames.length - 1 && <span className="text-[#1E3A2B]/20 ml-6 select-none">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
