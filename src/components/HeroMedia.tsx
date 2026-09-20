import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';

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

export const HeroMedia: React.FC = () => {
  // Slider position from 0 to 100 percent (defaults to 50%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTickPosRef = useRef<number>(50);

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
          // Slight sinusoidal oscillation: 50 -> 44 -> 56 -> 50
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
      className="w-full flex justify-center items-center select-none py-2"
    >
      {/* Outer Curved Container */}
      <div 
        id="hero-media-card"
        className="relative w-full max-w-[1300px] mx-auto rounded-[24px] sm:rounded-[36px] p-4 sm:p-6 md:p-8 lg:p-8 xl:p-10 pb-6 sm:pb-9 lg:pb-10 xl:pb-12 transition-all duration-300 border border-[#8FA98F]/30 shadow-[0_20px_60px_-15px_rgba(30,58,43,0.12)] overflow-hidden bg-[#EEF5EC]"
      >
        {/* Subtle Decorative Ambient Radial Glow */}
        <div 
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(183, 232, 75, 0.35) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(30, 58, 43, 0.15) 0%, transparent 70%)' }}
        />

        {/* 3-Device Viewport Flex / Grid:
            - Left: "Before on mobile"
            - Center: Interactive Desktop Split-Screen Slider
            - Right: "After on mobile"
        */}
        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-center gap-4 sm:gap-6 xl:gap-6 w-full">
          
          {/* ========================================================================= */}
          {/* LEFT DEVICE: Before on mobile                                             */}
          {/* ========================================================================= */}
          <figure 
            id="before-mobile-preview"
            className="hidden xl:flex flex-col items-center shrink-0 w-[145px] 2xl:w-[170px] transition-all duration-300"
          >
            <div 
              className="w-full overflow-hidden rounded-[18px] bg-white border border-[#1E3A2B]/10 shadow-[0_12px_32px_rgba(30,58,43,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              <img 
                src="/images/beforeandafter/palakolmobilebefore.jpg" 
                alt="Palakol's old site on mobile" 
                width="411" 
                height="896" 
                className="block w-full object-cover object-top select-none pointer-events-none"
                style={{ aspectRatio: '411 / 896' }}
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="mt-2.5 text-[12px] 2xl:text-[13px] text-center font-semibold text-[#4A584E] tracking-tight">
              Before on mobile
            </figcaption>
          </figure>

          {/* ========================================================================= */}
          {/* CENTER STAGE: Interactive Split-Screen Comparison Slider                   */}
          {/* ========================================================================= */}
          <div 
            className="relative w-full max-w-[880px] xl:max-w-[850px] 2xl:max-w-[950px] shrink-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="overflow-hidden rounded-[18px] sm:rounded-[22px] bg-white border border-[#1E3A2B]/12 shadow-[0_24px_64px_rgba(30,58,43,0.14)]"
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
                  src="/images/beforeandafter/palakoldesktopafter.jpg" 
                  alt="Palakol's website after rebuild" 
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
                    src="/images/beforeandafter/palakoldesktopbefore.jpg" 
                    alt="Palakol's website before rebuild" 
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
                  style={{ background: 'rgba(15, 36, 26, 0.85)', backdropFilter: 'blur(4px)' }}
                >
                  BEFORE
                </span>

                <span 
                  aria-hidden="true" 
                  className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 text-[9.5px] sm:text-[10.5px] font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md pointer-events-none select-none tracking-[0.1em] text-[#B7E84B] shadow-sm border border-[#B7E84B]/30"
                  style={{ background: '#1E3A2B' }}
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
                      stroke="#1E3A2B" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom-left Floating Store Badge */}
            <div 
              className="mt-3 sm:mt-0 sm:absolute sm:left-4 sm:-bottom-4 z-[3] inline-flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-[14px] sm:rounded-[16px] bg-white border border-[#1E3A2B]/10 shadow-[0_10px_28px_rgba(30,58,43,0.12)] backdrop-blur-md"
            >
              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0" 
                style={{ 
                  backgroundColor: '#B7E84B',
                  boxShadow: '0 0 0 4px rgba(183, 232, 75, 0.35)' 
                }} 
              />
              <span className="text-left">
                <span className="block text-[13px] sm:text-[14px] font-bold text-[#1E3A2B] tracking-tight leading-tight">
                  Palakol · Pickleball store
                </span>
                <span className="block text-[11px] sm:text-[12px] font-semibold text-[#4A584E]">
                  Drag to compare · rebuilt by CommerceForge
                </span>
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT DEVICE: After on mobile                                            */}
          {/* ========================================================================= */}
          <figure 
            id="after-mobile-preview"
            className="hidden xl:flex flex-col items-center shrink-0 w-[140px] 2xl:w-[165px] transition-all duration-300"
          >
            <div 
              className="w-full overflow-hidden rounded-[16px] bg-white border border-[#17172B]/10 shadow-[0_12px_32px_rgba(23,23,43,0.1)] transition-transform duration-300 hover:-translate-y-1"
            >
              <img 
                src="/images/beforeandafter/palakolmobileafter.jpg" 
                alt="Palakol's rebuilt site on mobile" 
                width="391" 
                height="857" 
                className="block w-full object-cover object-top select-none pointer-events-none"
                style={{ aspectRatio: '391 / 857' }}
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="mt-2.5 text-[12px] 2xl:text-[13px] text-center font-semibold text-[#5B5C70] tracking-tight">
              After on mobile
            </figcaption>
          </figure>

          {/* ========================================================================= */}
          {/* RESPONSIVE MOBILE PREVIEWS (Visible below xl screens so all devices show)  */}
          {/* ========================================================================= */}
          <div className="flex xl:hidden items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 w-full max-w-[420px]">
            <figure className="flex-1 flex flex-col items-center">
              <div className="w-full overflow-hidden rounded-[14px] bg-white border border-[#1E3A2B]/10 shadow-md">
                <img 
                  src="/images/beforeandafter/palakolmobilebefore.jpg" 
                  alt="Palakol's old site on mobile" 
                  className="block w-full object-cover object-top"
                  style={{ aspectRatio: '411 / 896' }}
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2 text-[11px] sm:text-[12px] text-center font-semibold text-[#4A584E]">
                Before on mobile
              </figcaption>
            </figure>

            <figure className="flex-1 flex flex-col items-center">
              <div className="w-full overflow-hidden rounded-[14px] bg-white border border-[#1E3A2B]/10 shadow-md">
                <img 
                  src="/images/beforeandafter/palakolmobileafter.jpg" 
                  alt="Palakol's rebuilt site on mobile" 
                  className="block w-full object-cover object-top"
                  style={{ aspectRatio: '391 / 857' }}
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2 text-[11px] sm:text-[12px] text-center font-semibold text-[#4A584E]">
                After on mobile
              </figcaption>
            </figure>
          </div>

        </div>
      </div>
    </div>
  );
};
