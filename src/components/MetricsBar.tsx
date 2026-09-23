import React from 'react';
import { Zap, TrendingUp, Clock, ShieldCheck, Award, Heart, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { usePublicTheme } from '../context/PublicThemeContext';

export const MetricsBar: React.FC = () => {
  const { activeContent } = useCMS();
  const { isDark } = usePublicTheme();
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
    <motion.section 
      id="metrics-bar-section" 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`w-full py-8 sm:py-14 border-y transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0B0F17]/60 border-[#B7E84B]/15 backdrop-blur-md' 
          : 'bg-white/80 border-[#064E3B]/10 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-10 xl:px-12">
        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx}
                className={`p-3.5 sm:p-6 rounded-2xl border transition-all duration-300 group ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:border-[#B7E84B] hover:shadow-[0_0_25px_rgba(183,232,75,0.15)] backdrop-blur-md'
                    : 'bg-[#FAFAF9] border-[#064E3B]/10 hover:border-[#059669] hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-xl transition-all shrink-0 group-hover:scale-110 ${
                    isDark
                      ? 'bg-[#064E3B] text-[#B7E84B] group-hover:bg-[#B7E84B] group-hover:text-[#0B0F17]'
                      : 'bg-[#EAF3E8] text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white'
                  }`}>
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-xl sm:text-3xl lg:text-4xl font-black tracking-tight truncate ${
                    isDark ? 'text-white' : 'text-[#064E3B]'
                  }`}>
                    {m.value}
                  </span>
                </div>
                <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#064E3B]'
                }`}>
                  {m.label}
                </h4>
                <p className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 font-medium leading-tight ${
                  isDark ? 'text-white/60' : 'text-[#064E3B]/70'
                }`}>
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Client Brands Row */}
        <div className={`mt-8 sm:mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-white/10' : 'border-[#064E3B]/10'
        }`}>
          <span className={`text-[11px] uppercase tracking-[0.2em] font-bold shrink-0 ${
            isDark ? 'text-[#B7E84B]' : 'text-[#064E3B]/70'
          }`}>
            Trusted by growing local brands:
          </span>
          <div className={`flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-xs sm:text-sm font-bold ${
            isDark ? 'text-white/80' : 'text-[#064E3B]/80'
          }`}>
            {clientNames.map((name, i) => (
              <span key={i} className={`transition-colors cursor-default ${
                isDark ? 'hover:text-[#B7E84B]' : 'hover:text-[#059669]'
              }`}>
                {name}
                {i < clientNames.length - 1 && (
                  <span className={`ml-6 select-none ${isDark ? 'text-white/20' : 'text-[#064E3B]/20'}`}>
                    •
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

