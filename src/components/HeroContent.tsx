import React, { useState } from 'react';
import { Star, Users, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { usePublicTheme } from '../context/PublicThemeContext';

interface HeroContentProps {
  onCtaClick?: () => void;
  onExplorePackages?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onCtaClick }) => {
  const { activeContent } = useCMS();
  const { isDark } = usePublicTheme();
  const [showReviewsModal, setShowReviewsModal] = useState<boolean>(false);
  const heroData = activeContent?.hero;

  const headlineLine1 = heroData?.headlineLine1 || 'THE DIGITAL';
  const headlineLine2 = heroData?.headlineLine2 || 'HOME FOR';
  const headlineHighlight = heroData?.headlineHighlight || 'LOCAL';
  const headlineLine3 = heroData?.headlineLine3 || 'BUSINESSES.';
  const description = heroData?.description || 'We rebuild sluggish, outdated websites into lightning-fast, mobile-responsive powerhouses. Professional quality, thumb-friendly design, and transparent pricing starting at $159.';

  // Customer avatars for miniature stack
  const clientAvatars = [
    {
      name: 'Marco S.',
      business: 'Palakol Pickleball',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      initials: 'MS',
      rating: 5,
      review: 'Orders jumped 185% in month one. The 0.6s load time completely transformed our customer checkout.',
    },
    {
      name: 'David K.',
      business: 'IronForge Athletics',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      initials: 'DK',
      rating: 5,
      review: 'Our mobile bounce dropped from 71% to 28%. Member trial bookings doubled within 2 weeks of launching.',
    },
    {
      name: 'Elena R.',
      business: 'Rosemira Organics',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      initials: 'ER',
      rating: 5,
      review: 'Sub-second mobile speed with an apothecary feel. Customer praise on the clean design has been constant.',
    },
    {
      name: 'Chloe T.',
      business: 'Haoma Earth',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      initials: 'CT',
      rating: 5,
      review: 'Incredible craftsmanship. Fast, tactile, and completely elevated our brand above competitors.',
    },
  ];

  return (
    <div 
      id="hero-content-column" 
      className="flex flex-col justify-center items-center text-center z-20 w-full max-w-3xl mx-auto py-1 px-2 sm:px-4"
    >
      {/* 1. Interactive Social Proof Badge with Miniature Avatar Stacks */}
      <div className="relative mb-2.5 sm:mb-3">
        <button
          type="button"
          id="hero-social-proof-badge"
          onClick={() => setShowReviewsModal(true)}
          aria-label="View customer reviews and rating breakdown"
          className={`group inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs ${
            isDark
              ? 'bg-[#0B0F17]/80 hover:bg-[#0B0F17] border-[#B7E84B]/40 hover:border-[#B7E84B] shadow-[0_0_15px_rgba(183,232,75,0.12)] text-white'
              : 'bg-white hover:bg-[#FAFAF9] border-[#064E3B]/15 hover:border-[#059669] shadow-xs text-[#064E3B]'
          }`}
        >
          {/* Miniature Customer Avatar Stacks */}
          <div className="flex items-center -space-x-1.5 shrink-0" aria-hidden="true">
            {clientAvatars.slice(0, 3).map((client, idx) => (
              <div
                key={client.name}
                className={`relative w-5 h-5 rounded-full overflow-hidden border transition-transform duration-200 group-hover:translate-x-0.5 ${
                  isDark ? 'border-[#0B0F17]' : 'border-white'
                }`}
                style={{ zIndex: 10 - idx }}
              >
                <img
                  src={client.img}
                  alt={client.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>

          {/* Social Proof Text & Star Rating */}
          <div className="flex items-center gap-1.5 text-left">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>

            <div className="flex items-center gap-1 text-[11px] sm:text-xs tracking-tight">
              <span className={`font-black ${isDark ? 'text-[#B7E84B]' : 'text-[#064E3B]'}`}>
                4.9/5
              </span>
              <span className={isDark ? 'text-white/40' : 'text-[#064E3B]/40'}>•</span>
              <span className={`font-bold ${isDark ? 'text-white/90' : 'text-[#064E3B]'}`}>
                40+ Rebuilds
              </span>
            </div>
          </div>

          {/* Click hint */}
          <span 
            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full transition-colors ${
              isDark 
                ? 'bg-white/10 text-white/70 group-hover:bg-[#B7E84B] group-hover:text-[#0B0F17]' 
                : 'bg-[#064E3B]/5 text-[#064E3B]/70 group-hover:bg-[#064E3B] group-hover:text-white'
            }`}
          >
            Reviews ↗
          </span>
        </button>

        {/* Modal / Popup for Social Proof Breakdown */}
        <AnimatePresence>
          {showReviewsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border relative overflow-hidden text-left ${
                  isDark
                    ? 'bg-[#0B0F17] border-[#B7E84B]/30 text-white shadow-[0_0_50px_rgba(183,232,75,0.15)]'
                    : 'bg-white border-[#064E3B]/15 text-[#064E3B] shadow-2xl'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-black/10 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className={`text-sm font-black ml-1.5 ${isDark ? 'text-[#B7E84B]' : 'text-[#064E3B]'}`}>
                        4.9 out of 5.0
                      </span>
                    </div>
                    <h3 className={`text-base font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-[#064E3B]'}`}>
                      Client Satisfaction & Track Record
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                      Based on 42 audited client rebuilds across retail, fitness, dining & services.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowReviewsModal(false)}
                    aria-label="Close reviews popup"
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Review quotes stack */}
                <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {clientAvatars.map((client) => (
                    <div
                      key={client.name}
                      className={`p-3.5 rounded-2xl border text-left transition-colors ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAFAF9] border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={client.img}
                            alt={client.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <span className={`block text-xs font-bold ${isDark ? 'text-white' : 'text-[#064E3B]'}`}>
                              {client.name}
                            </span>
                            <span className={`block text-[10px] ${isDark ? 'text-[#B7E84B]' : 'text-[#059669]'}`}>
                              {client.business}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-white/80' : 'text-slate-600'}`}>
                        "{client.review}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer action */}
                <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#059669]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B7E84B]" />
                    <span>100% Verified Local Client Reviews</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewsModal(false);
                      onCtaClick?.();
                    }}
                    className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                      isDark
                        ? 'bg-[#B7E84B] text-[#0B0F17] hover:bg-[#a3d438]'
                        : 'bg-[#064E3B] text-white hover:bg-[#059669]'
                    }`}
                  >
                    Start Your Rebuild
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Punchy Clean Headline Across Top */}
      <h1 
        id="hero-main-headline"
        className={`font-black tracking-[-0.03em] uppercase select-none transition-all w-full leading-[1.06] ${
          isDark ? 'text-white' : 'text-[#064E3B]'
        }`}
        style={{
          fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
        }}
      >
        <span>{headlineLine1} {headlineLine2} </span>
        <span className={`inline-block underline decoration-[#B7E84B] decoration-3 underline-offset-4 ${
          isDark ? 'text-[#B7E84B]' : 'text-[#059669]'
        }`}>
          {headlineHighlight}
        </span>
        <span> {headlineLine3}</span>
      </h1>

      {/* Clean Concise Descriptive Copy */}
      <p 
        id="hero-subheadline" 
        className={`mt-2.5 sm:mt-3 font-medium text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto transition-colors ${
          isDark ? 'text-white/70' : 'text-[#064E3B]/80'
        }`}
      >
        {description}
      </p>
    </div>
  );
};

