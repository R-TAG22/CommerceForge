import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { usePublicTheme } from '../context/PublicThemeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CtaBannerProps {
  onCtaClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
  const { isDark } = usePublicTheme();
  const prefersReducedMotion = useReducedMotion();
  const ctaData = activeContent?.cta;

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      onCtaClick();
      return;
    }
    setSubmitted(true);
  };

  const isCustomText =
    ctaData?.headingPrefix &&
    !ctaData.headingPrefix.toLowerCase().includes('ready to build') &&
    !ctaData.headingPrefix.toLowerCase().includes('ready to give');

  const barText = isCustomText
    ? ctaData.headingPrefix
    : 'LOOKING FOR A DESIGN AND DEVELOPMENT PARTNER?';

  const buttonText =
    ctaData?.primaryCtaText &&
    ctaData.primaryCtaText !== 'GET YOUR FREE QUOTE' &&
    ctaData.primaryCtaText !== 'Talk to us'
      ? ctaData.primaryCtaText
      : "LET'S WORK TOGETHER";

  return (
    <motion.section
      id="contact"
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full bg-white dark:bg-[#0B0F17] py-6 sm:py-10 transition-colors duration-300"
      aria-label="Partner CTA Bar"
    >
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Email Subscription Frame (Same as before: dark obsidian/forest green container with white text) */}
        <div
          className={`w-full rounded-xl sm:rounded-2xl px-5 sm:px-8 py-4 sm:py-5 transition-all duration-300 border flex flex-col md:flex-row items-center justify-between gap-4 ${
            isDark
              ? 'bg-[#111620] border-white/10 text-white shadow-xl'
              : 'bg-[#12241A] border-[#1E3A2B]/40 text-white shadow-xl'
          }`}
        >
          {/* Left Side: Prominent Minimal Headline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B7E84B] border border-[#B7E84B]/40 animate-pulse shrink-0 hidden sm:block" />
            <h3 className="text-xs sm:text-[13px] md:text-sm font-extrabold tracking-[0.14em] uppercase text-white whitespace-nowrap">
              {barText}
            </h3>
          </div>

          {/* Right Side: Sleek Inline Email Input + Action Button */}
          <div className="w-full md:w-auto flex items-center justify-center md:justify-end">
            {submitted ? (
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-xs text-[#B7E84B] font-semibold py-1">
                <Check className="w-4 h-4 shrink-0 text-[#B7E84B]" />
                <span>
                  Thanks! We'll reach out to <strong>{email}</strong> within 4 hours.
                </span>
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="underline text-white/70 hover:text-white ml-1.5 text-[11px] cursor-pointer"
                >
                  Customize details →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 sm:w-60 md:w-64 lg:w-72">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    aria-label="Enter your email"
                    className="w-full h-10 px-3.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#B7E84B] focus:border-[#B7E84B] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  id="cta-work-together-btn"
                  className="h-10 px-5 sm:px-6 rounded-lg bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0B0F17] text-xs font-black uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0B0F17]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
