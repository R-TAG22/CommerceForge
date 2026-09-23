import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Dumbbell, Utensils, Briefcase, Zap, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { usePublicTheme } from '../context/PublicThemeContext';

// Web Audio API tactile audio click for subtle slider feedback
const playTickTone = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(820, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {
    // Audio Context blocked or unavailable
  }
};

type ClientNiche = 'ecommerce' | 'fitness' | 'restaurant' | 'services';

interface NicheData {
  id: ClientNiche;
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  clientName: string;
  category: string;
  desktopBefore: string;
  desktopAfter: string;
  mobileBefore: string;
  mobileAfter: string;
  metrics: {
    pageSpeed: { before: number; after: number };
    bounceRate: string;
    conversion: { label: string; value: string };
    loadTime: { before: string; after: string };
  };
  highlight: string;
}

const NICHES: NicheData[] = [
  {
    id: 'ecommerce',
    label: 'E-commerce',
    badge: 'Pickleball & Sports Retail',
    icon: ShoppingBag,
    clientName: 'Palakol',
    category: 'Sporting Goods Store',
    desktopBefore: '/images/beforeandafter/palakoldesktopbefore.jpg',
    desktopAfter: '/images/beforeandafter/palakoldesktopafter.jpg',
    mobileBefore: '/images/beforeandafter/palakolmobilebefore.jpg',
    mobileAfter: '/images/beforeandafter/palakolmobileafter.jpg',
    metrics: {
      pageSpeed: { before: 38, after: 99 },
      bounceRate: '-42%',
      conversion: { label: 'Checkout Conversion', value: '+185%' },
      loadTime: { before: '4.8s', after: '0.6s' },
    },
    highlight: 'Replaced multi-step sluggish theme with instant 2-tap checkout.',
  },
  {
    id: 'fitness',
    label: 'Gyms & Fitness',
    badge: 'Athletic Club & CrossFit',
    icon: Dumbbell,
    clientName: 'IronForge Athletics',
    category: 'Performance Fitness Center',
    desktopBefore: '/images/beforeandafter/palakoldesktopbefore-1.jpg',
    desktopAfter: '/images/beforeandafter/palakoldesktopafter-1.jpg',
    mobileBefore: '/images/beforeandafter/palakolmobilebefore-1.jpg',
    mobileAfter: '/images/beforeandafter/palakolmobileafter-1.jpg',
    metrics: {
      pageSpeed: { before: 42, after: 98 },
      bounceRate: '-48%',
      conversion: { label: 'Trial Pass Signups', value: '+210%' },
      loadTime: { before: '5.2s', after: '0.7s' },
    },
    highlight: 'Instant interactive class schedule and zero-friction member pass booking.',
  },
  {
    id: 'restaurant',
    label: 'Restaurants',
    badge: 'Artisan Dining & Bistro',
    icon: Utensils,
    clientName: 'Trattoria Bella',
    category: 'Italian Bistro & Bar',
    desktopBefore: '/images/beforeandafter/palakoldesktopbefore.jpg',
    desktopAfter: '/images/beforeandafter/palakoldesktopafter.jpg',
    mobileBefore: '/images/beforeandafter/palakolmobilebefore.jpg',
    mobileAfter: '/images/beforeandafter/palakolmobileafter.jpg',
    metrics: {
      pageSpeed: { before: 31, after: 100 },
      bounceRate: '-54%',
      conversion: { label: 'Table Reservations', value: '+165%' },
      loadTime: { before: '6.1s', after: '0.5s' },
    },
    highlight: 'Replaced blurry PDF menu with thumb-friendly visual dish ordering.',
  },
  {
    id: 'services',
    label: 'Services & Trade',
    badge: 'Operations & Lean Advisory',
    icon: Briefcase,
    clientName: 'The Lean Company',
    category: 'Management & Operations Consulting',
    desktopBefore: '/screenshots/the-lean-company.png',
    desktopAfter: '/screenshots/the-lean-company-1.png',
    mobileBefore: '/images/beforeandafter/palakolmobilebefore-1.jpg',
    mobileAfter: '/images/beforeandafter/palakolmobileafter-1.jpg',
    metrics: {
      pageSpeed: { before: 34, after: 99 },
      bounceRate: '-45%',
      conversion: { label: 'Consultation Inquiries', value: '+175%' },
      loadTime: { before: '4.8s', after: '0.6s' },
    },
    highlight: 'Instant appointment booking and lightning-fast mobile consultation funnel.',
  },
];

export const HeroMedia: React.FC = () => {
  const { isDark } = usePublicTheme();
  const [selectedNiche, setSelectedNiche] = useState<ClientNiche>('ecommerce');

  // Slider position from 0 to 100 percent (defaults to 50%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTickPosRef = useRef<number>(50);

  const activeNicheData = NICHES.find((n) => n.id === selectedNiche) || NICHES[0];

  // Update slider position based on pointer X
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (rawX / rect.width) * 100));
    setSliderPos(percentage);

    // Subtle tick tone every ~6% movement
    if (Math.abs(percentage - lastTickPosRef.current) >= 6) {
      playTickTone();
      lastTickPosRef.current = percentage;
    }
  }, []);

  // Pointer event handlers for drag tracking
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
    playTickTone();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture release safeguard
      }
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
      playTickTone();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
      playTickTone();
    }
  };

  // Gentle initial teaser drift when entering page, pauses once interacted
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let frameId: number;
    let startTime: number | null = null;
    let hasInteracted = false;

    if (isDragging || isHovered) {
      hasInteracted = true;
      return;
    }

    // Subtle gentle hint wiggle after 800ms
    timeoutId = setTimeout(() => {
      if (hasInteracted) return;
      const animateHint = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / 1000;
        if (progress < 1.4 && !isDragging && !isHovered) {
          const offset = Math.sin(progress * Math.PI * 2) * 6;
          setSliderPos(50 + offset);
          frameId = requestAnimationFrame(animateHint);
        } else {
          setSliderPos(50);
        }
      };
      frameId = requestAnimationFrame(animateHint);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [isDragging, isHovered]);

  return (
    <div 
      id="hero-media-showcase" 
      className="w-full flex flex-col justify-center items-center select-none py-0 sm:py-1"
    >
      {/* ========================================================================= */}
      {/* Outer Showcase Container Card with Modern Theme Styling (Enlarged +10%)   */}
      {/* ========================================================================= */}
      <div 
        id="hero-media-card"
        className={`relative w-full max-w-[1460px] mx-auto rounded-[24px] sm:rounded-[36px] p-3.5 sm:p-6 md:p-7 lg:p-8 xl:p-10 pb-5 sm:pb-8 lg:pb-9 xl:pb-10 transition-all duration-300 border overflow-hidden ${
          isDark
            ? 'bg-[#0B0F17] border-[#B7E84B]/30 shadow-[0_0_55px_rgba(183,232,75,0.14)]'
            : 'bg-[#EEF5EC] border-[#064E3B]/15 shadow-[0_22px_65px_-15px_rgba(6,78,59,0.14)]'
        }`}
      >
        {/* Subtle Decorative Ambient Radial Glow */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-60"
          style={{ background: isDark ? 'radial-gradient(circle, rgba(183, 232, 75, 0.25) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(183, 232, 75, 0.35) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-50"
          style={{ background: isDark ? 'radial-gradient(circle, rgba(5, 150, 105, 0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(6, 78, 59, 0.15) 0%, transparent 70%)' }}
        />

        {/* ========================================================================= */}
        {/* Dynamic Metric Badges Directly on Showcase Header (Requirement 2)         */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#B7E84B] shadow-[0_0_8px_#B7E84B]' : 'bg-[#059669]'}`} />
            <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#064E3B]'}`}>
              {activeNicheData.clientName} · {activeNicheData.badge}
            </span>
          </div>

          {/* Dynamic Metrics Overlay Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* PageSpeed Tag */}
            <div 
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                isDark 
                  ? 'bg-white/5 border-[#B7E84B]/40 text-[#B7E84B]' 
                  : 'bg-white border-[#064E3B]/15 text-[#064E3B] shadow-xs'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#B7E84B]" />
              <span>PageSpeed:</span>
              <span className="line-through opacity-60 font-semibold">{activeNicheData.metrics.pageSpeed.before}</span>
              <span className="font-black text-[#B7E84B] bg-[#064E3B] px-1.5 py-0.2 rounded">
                → {activeNicheData.metrics.pageSpeed.after}
              </span>
            </div>

            {/* Bounce Rate Tag */}
            <div 
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white' 
                  : 'bg-white border-[#064E3B]/15 text-[#064E3B] shadow-xs'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Bounce Rate:</span>
              <span className="font-black text-emerald-500">{activeNicheData.metrics.bounceRate}</span>
            </div>

            {/* Conversion Impact Tag */}
            <div 
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                isDark 
                  ? 'bg-[#B7E84B]/10 border-[#B7E84B]/30 text-[#B7E84B]' 
                  : 'bg-[#EAF3E8] border-[#B7E84B]/40 text-[#064E3B]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{activeNicheData.metrics.conversion.label}:</span>
              <span className="font-black">{activeNicheData.metrics.conversion.value}</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3-Device Viewport: Left Mobile Before, Center Desktop Slider, Right Mobile After */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-center gap-4 sm:gap-6 xl:gap-6 w-full">
          
          {/* ========================================================================= */}
          {/* LEFT DEVICE: Before on mobile (Enlarged +10%)                             */}
          {/* ========================================================================= */}
          <figure 
            id="before-mobile-preview"
            className="hidden xl:flex flex-col items-center shrink-0 w-[160px] 2xl:w-[188px] transition-all duration-300"
          >
            <div 
              className={`w-full overflow-hidden rounded-[20px] border transition-transform duration-300 hover:-translate-y-1 ${
                isDark 
                  ? 'bg-[#0B0F17] border-white/10 shadow-[0_14px_36px_rgba(0,0,0,0.55)]' 
                  : 'bg-white border-[#064E3B]/10 shadow-[0_14px_36px_rgba(6,78,59,0.1)]'
              }`}
            >
              <img 
                src={activeNicheData.mobileBefore} 
                alt={`${activeNicheData.clientName} old site on mobile`} 
                width="411" 
                height="896" 
                className="block w-full object-cover object-top select-none pointer-events-none"
                style={{ aspectRatio: '411 / 896' }}
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className={`mt-2.5 text-[12px] 2xl:text-[13px] text-center font-semibold tracking-tight ${
              isDark ? 'text-white/60' : 'text-[#064E3B]/70'
            }`}>
              Before on mobile
            </figcaption>
          </figure>

          {/* ========================================================================= */}
          {/* CENTER STAGE: Interactive Split-Screen Comparison Slider (Enlarged +10%)  */}
          {/* ========================================================================= */}
          <div 
            className="relative w-full max-w-[980px] xl:max-w-[960px] 2xl:max-w-[1060px] shrink-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className={`overflow-hidden rounded-[18px] sm:rounded-[22px] border ${
                isDark
                  ? 'bg-[#0B0F17] border-[#B7E84B]/30 shadow-[0_24px_64px_rgba(0,0,0,0.6)]'
                  : 'bg-white border-[#064E3B]/15 shadow-[0_24px_64px_rgba(6,78,59,0.14)]'
              }`}
            >
              <div 
                ref={containerRef}
                role="slider"
                tabIndex={0}
                aria-label="Reveal more of before or after"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(sliderPos)}
                aria-valuetext={`${Math.round(sliderPos)}% before`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onKeyDown={handleKeyDown}
                className="relative select-none overflow-hidden cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-[#B7E84B]/60"
                style={{ touchAction: 'none' }}
              >
                {/* 1. Base Layer: Redesigned "After" Desktop Screenshot */}
                <img 
                  src={activeNicheData.desktopAfter} 
                  alt={`${activeNicheData.clientName} after rebuild`} 
                  className="block w-full object-cover object-top select-none pointer-events-none"
                  style={{ aspectRatio: '16 / 9' }}
                  draggable={false}
                  loading="eager"
                  decoding="async"
                />

                {/* 2. Overlaid Clipped Layer: Legacy "Before" Desktop Screenshot */}
                <div 
                  className="absolute inset-0 select-none pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img 
                    src={activeNicheData.desktopBefore} 
                    alt={`${activeNicheData.clientName} before rebuild`} 
                    className="block w-full object-cover object-top select-none pointer-events-none"
                    style={{ aspectRatio: '16 / 9' }}
                    draggable={false}
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* 3. Top Badges: BEFORE (Dark) & AFTER (Forest Green + Lime) */}
                <span 
                  aria-hidden="true" 
                  className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 text-[9.5px] sm:text-[10.5px] font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md pointer-events-none select-none tracking-[0.1em] text-white shadow-sm"
                  style={{ background: 'rgba(11, 15, 23, 0.85)', backdropFilter: 'blur(4px)' }}
                >
                  BEFORE
                </span>

                <span 
                  aria-hidden="true" 
                  className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 text-[9.5px] sm:text-[10.5px] font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md pointer-events-none select-none tracking-[0.1em] text-[#B7E84B] shadow-sm border border-[#B7E84B]/30"
                  style={{ background: '#064E3B' }}
                >
                  AFTER
                </span>

                {/* 4. Draggable Center Divider Line */}
                <div 
                  className="absolute inset-y-0 pointer-events-none select-none transition-none"
                  style={{
                    left: `${sliderPos}%`,
                    width: '2px',
                    background: '#FFFFFF',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.18), 0 0 10px rgba(0,0,0,0.3)',
                  }}
                />

                {/* 5. Circular Draggable Handle Thumb */}
                <div 
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-ew-resize transition-transform duration-100 active:scale-95 after:content-[''] after:absolute after:-inset-3"
                  style={{
                    left: `${sliderPos}%`,
                    width: '40px',
                    height: '40px',
                    borderRadius: '999px',
                    background: '#FFFFFF',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.28), 0 0 0 2px rgba(255,255,255,0.85)',
                  }}
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    aria-hidden="true"
                    className="select-none pointer-events-none"
                  >
                    <path 
                      d="M8 6l-3 4 3 4M12 6l3 4-3 4" 
                      stroke="#064E3B" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Floating Store Badge with Client Highlight */}
            <div 
              className={`mt-3 sm:mt-0 sm:absolute sm:left-4 sm:-bottom-4 z-[3] inline-flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-[14px] sm:rounded-[16px] border backdrop-blur-md transition-colors ${
                isDark
                  ? 'bg-[#0B0F17]/95 border-[#B7E84B]/30 text-white shadow-[0_10px_28px_rgba(0,0,0,0.4)]'
                  : 'bg-white/95 border-[#064E3B]/15 text-[#064E3B] shadow-[0_10px_28px_rgba(6,78,59,0.12)]'
              }`}
            >
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0" 
                style={{ 
                  backgroundColor: '#B7E84B',
                  boxShadow: '0 0 0 4px rgba(183, 232, 75, 0.35)' 
                }} 
              />
              <span className="text-left">
                <span className={`block text-[13px] sm:text-[14px] font-bold tracking-tight leading-tight ${
                  isDark ? 'text-white' : 'text-[#064E3B]'
                }`}>
                  {activeNicheData.clientName} · {activeNicheData.category}
                </span>
                <span className={`block text-[11px] sm:text-[12px] font-semibold ${
                  isDark ? 'text-white/60' : 'text-[#064E3B]/70'
                }`}>
                  {activeNicheData.highlight}
                </span>
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT DEVICE: After on mobile (Enlarged +10%)                              */}
          {/* ========================================================================= */}
          <figure 
            id="after-mobile-preview"
            className="hidden xl:flex flex-col items-center shrink-0 w-[155px] 2xl:w-[182px] transition-all duration-300"
          >
            <div 
              className={`w-full overflow-hidden rounded-[18px] border transition-transform duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0B0F17] border-white/10 shadow-[0_14px_36px_rgba(0,0,0,0.55)]'
                  : 'bg-white border-[#064E3B]/10 shadow-[0_14px_36px_rgba(6,78,59,0.12)]'
              }`}
            >
              <img 
                src={activeNicheData.mobileAfter} 
                alt={`${activeNicheData.clientName} rebuilt on mobile`} 
                width="391" 
                height="857" 
                className="block w-full object-cover object-top select-none pointer-events-none"
                style={{ aspectRatio: '391 / 857' }}
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className={`mt-2.5 text-[12px] 2xl:text-[13px] text-center font-semibold tracking-tight ${
              isDark ? 'text-white/60' : 'text-[#064E3B]/70'
            }`}>
              After on mobile
            </figcaption>
          </figure>

          {/* ========================================================================= */}
          {/* RESPONSIVE MOBILE PREVIEWS (Visible below xl screens so all devices show)  */}
          {/* ========================================================================= */}
          <div className="flex xl:hidden items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 w-full max-w-[460px]">
            <figure className="flex-1 flex flex-col items-center">
              <div className={`w-full overflow-hidden rounded-[14px] border shadow-md ${
                isDark ? 'bg-[#0B0F17] border-white/10' : 'bg-white border-[#064E3B]/10'
              }`}>
                <img 
                  src={activeNicheData.mobileBefore} 
                  alt={`${activeNicheData.clientName} old site on mobile`} 
                  className="block w-full object-cover object-top"
                  style={{ aspectRatio: '411 / 896' }}
                  loading="lazy"
                />
              </div>
              <figcaption className={`mt-2 text-[11px] sm:text-[12px] text-center font-semibold ${
                isDark ? 'text-white/60' : 'text-[#064E3B]/70'
              }`}>
                Before on mobile
              </figcaption>
            </figure>

            <figure className="flex-1 flex flex-col items-center">
              <div className={`w-full overflow-hidden rounded-[14px] border shadow-md ${
                isDark ? 'bg-[#0B0F17] border-white/10' : 'bg-white border-[#064E3B]/10'
              }`}>
                <img 
                  src={activeNicheData.mobileAfter} 
                  alt={`${activeNicheData.clientName} rebuilt on mobile`} 
                  className="block w-full object-cover object-top"
                  style={{ aspectRatio: '391 / 857' }}
                  loading="lazy"
                />
              </div>
              <figcaption className={`mt-2 text-[11px] sm:text-[12px] text-center font-semibold ${
                isDark ? 'text-white/60' : 'text-[#064E3B]/70'
              }`}>
                After on mobile
              </figcaption>
            </figure>
          </div>

        </div>
      </div>
    </div>
  );
};
