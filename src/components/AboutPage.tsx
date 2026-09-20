import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Globe2, 
  ShoppingBag, 
  Sliders, 
  BarChart2, 
  CheckCircle2, 
  Layers, 
  Volume2, 
  VolumeX, 
  X,
  ExternalLink,
  ChevronRight,
  Activity,
  Camera,
  User,
  Code2
} from 'lucide-react';

interface AboutPageProps {
  onHireClick?: () => void;
}

// Gentle synthetic tactile audio feedback using Web Audio API
const playTactileTone = (freq = 900, duration = 0.05, type: OscillatorType = 'sine') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio context errors if uninitialized
  }
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isFounder: boolean;
  specializations: string[];
  bio: string;
  image?: string;
  initials: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'russell-t',
    name: 'Russell T.',
    role: 'Founder',
    isFounder: true,
    specializations: ['Web Developer', 'E-commerce Operations', 'Photo Video Editor'],
    bio: 'Leads engineering architecture, custom storefront builds, high-converting digital shelves, and photo/video media production.',
    initials: 'RT',
  },
  {
    id: 'ryan-b',
    name: 'Ryan B.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads responsive frontend development, merchant inventory synchronization, and sub-second checkout ergonomics.',
    initials: 'RB',
  },
  {
    id: 'nhina-p',
    name: 'Nhina P.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads client component architectures, conversion rate optimization, and automated catalog operations.',
    initials: 'NP',
  },
  {
    id: 'james-m',
    name: 'James M.',
    role: 'Co-Founder',
    isFounder: false,
    specializations: ['Web Developer', 'E-commerce Operation'],
    bio: 'Co-leads backend integrations, API pipelines, scalable storefront hosting, and merchant technical support.',
    initials: 'JM',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onHireClick }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false);

  // Interactive Card 1 State (Store Architecture)
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStats, setAuditStats] = useState<{ ttfb: number; lcp: number; score: number } | null>(null);

  // Interactive Card 2 State (Multichannel Acceleration)
  const [activeChannel, setActiveChannel] = useState<'meta' | 'google' | 'tiktok'>('meta');

  // Interactive Card 3 State (Merchant Optimization)
  const [forecastRange, setForecastRange] = useState<'30D' | '90D' | '1Y'>('90D');
  const [growthMultiplier, setGrowthMultiplier] = useState<number>(38);

  const triggerHaptic = (freq = 880) => {
    if (soundEnabled) playTactileTone(freq);
  };

  const runArchitectureAudit = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic(1100);
    setIsAuditing(true);
    setAuditStats(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditStats({
        ttfb: 18,
        lcp: 420,
        score: 99
      });
      triggerHaptic(1400);
    }, 550);
  };

  return (
    <div className="w-full">
      {/* Top Page Header & Interactive Showcase Section */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-14 pb-12 sm:pb-16">
        <motion.div 
          id="about-page-container"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-[#1E3A2B] relative"
        >
          {/* Sound Toggle Floating Header Control */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
                ABOUT COMMERCEFORGE STUDIO
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playTactileTone(800);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#1E3A2B]/12 hover:border-[#B7E84B] text-[10px] font-extrabold uppercase tracking-wider text-[#4A584E] hover:text-[#1E3A2B] transition-all shadow-xs cursor-pointer"
              title="Toggle Sensory Audio Feedback"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#2D5A40]" />
                  <span className="hidden sm:inline">Audio Haptics: ON</span>
                  <span className="sm:hidden">Audio ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                  <span className="hidden sm:inline">Audio Haptics: OFF</span>
                  <span className="sm:hidden">Audio OFF</span>
                </>
              )}
            </button>
          </div>

          {/* Main Grid: Left Column Dark Forest Card (48%) + Right Column 3-Card Stack (52%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch w-full min-h-0">
            
            {/* ========================================================================= */}
            {/* LEFT COLUMN: Large Forest Green Card with Circuit Board Traces & Bold Copy */}
            {/* ========================================================================= */}
            <motion.div 
              id="about-hero-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 xl:col-span-5 bg-[#0F241A] text-white rounded-3xl sm:rounded-[32px] p-6 sm:p-7 md:p-8 lg:p-7 xl:p-9 flex flex-col justify-between relative overflow-hidden shadow-xl border border-[#1E3A2B]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#B7E84B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1A3D2A]/60 rounded-full blur-2xl pointer-events-none" />

          {/* Glowing Animated Electronic Circuit Board Etchings on Right & Bottom */}
          <svg 
            className="absolute right-0 top-0 bottom-0 h-full w-2/3 pointer-events-none opacity-40 md:opacity-50 overflow-visible"
            viewBox="0 0 320 540" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circuit Traces */}
            <path d="M320 60 H220 L180 100 H140 L110 130 V210 L80 240 H40" stroke="#3D684C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M320 180 H260 L220 220 H170 L140 250 V340 L100 380 H20" stroke="#3D684C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M320 300 H240 L210 330 V420 L180 450 H90 L60 480 H0" stroke="#3D684C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M320 400 H280 L250 430 H190 L160 460 V530" stroke="#3D684C" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Accent Glowing Green Circuit Lines with animated dash */}
            <motion.path 
              d="M320 120 H250 L210 160 H160 L130 190 V280 L100 310 H50" 
              stroke="#B7E84B" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="12 12"
              animate={{ strokeDashoffset: [0, -48] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <motion.path 
              d="M320 240 H270 L230 280 H180 L150 310 V390 L120 420 H30" 
              stroke="#B7E84B" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              strokeDasharray="8 8"
              animate={{ strokeDashoffset: [0, -32] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
            />

            {/* Circuit Contact Nodes / Vias */}
            <circle cx="220" cy="60" r="3" fill="#B7E84B" />
            <circle cx="180" cy="100" r="3" fill="#3D684C" />
            <circle cx="110" cy="130" r="3.5" fill="#B7E84B" />
            <circle cx="40" cy="240" r="3" fill="#B7E84B" />
            <circle cx="260" cy="180" r="3" fill="#3D684C" />
            <circle cx="140" cy="250" r="4" fill="#B7E84B" />
            <circle cx="20" cy="380" r="3.5" fill="#B7E84B" />
            <circle cx="240" cy="300" r="3" fill="#3D684C" />
            <circle cx="90" cy="450" r="3.5" fill="#B7E84B" />
            <circle cx="280" cy="400" r="3" fill="#B7E84B" />
            <circle cx="160" cy="460" r="3.5" fill="#3D684C" />

            {/* Glowing Pulse Rings */}
            <circle cx="140" cy="250" r="8" stroke="#B7E84B" strokeWidth="1" opacity="0.6" className="animate-ping" />
            <circle cx="90" cy="450" r="6" stroke="#B7E84B" strokeWidth="1" opacity="0.5" className="animate-ping" />
          </svg>

          {/* Top Badge: Studio Mission */}
          <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B7E84B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B7E84B] shadow-[0_0_8px_#B7E84B]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8FA98F]">
                COMMERCEFORGE STUDIO
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#8FA98F]/70 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              EST. 2026
            </span>
          </div>

          {/* Central Massive Headline (matching image exactly) */}
          <div className="relative z-10 my-auto py-2 sm:py-3 space-y-3 sm:space-y-4">
            <h1 
              id="about-left-headline"
              className="font-black tracking-[-0.03em] uppercase text-white text-2xl sm:text-3xl md:text-3xl lg:text-[29px] xl:text-[36px] leading-[1.05]"
            >
              WE FORGE<br />
              DIGITAL SHELVES<br />
              THAT CONVERT.<br />
              ENGINEERING<br />
              GROWTH FOR<br />
              E-COMMERCE<br />
              MERCHANTS.
            </h1>

            {/* Subtitle matching image */}
            <p className="text-xs sm:text-sm lg:text-xs xl:text-[13.5px] text-[#A3B8A8] max-w-md font-medium leading-relaxed">
              From digital shelf architecture to multichannel performance.
            </p>
          </div>

          {/* Bottom Interactive CTA Button matching image */}
          <div className="relative z-10 mt-5 sm:mt-6 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <button
              id="about-view-capabilities-btn"
              type="button"
              onClick={() => {
                triggerHaptic(1200);
                setIsCapabilitiesOpen(true);
              }}
              className="group inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-[#B7E84B] text-[#0F241A] font-black text-xs sm:text-[13px] tracking-wider uppercase hover:bg-[#c6f857] active:scale-95 transition-all shadow-[0_4px_16px_rgba(183,232,75,0.35)] cursor-pointer"
            >
              <span>VIEW OUR CAPABILITIES</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Live Metrics Tag */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8FA98F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]"></span>
              <span>100% Bespoke Code</span>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: 3 Horizontal Cards Stack (Store Architecture, Multichannel, Merchant) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between gap-3 sm:gap-3.5 md:gap-3.5 lg:gap-4">
          
          {/* ----------------------------------------------------------------------- */}
          {/* CARD 1: STORE ARCHITECTURE: OPTIMIZED BUILDS for speed & conversion    */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div 
            id="about-card-architecture"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setSelectedCard(selectedCard === 1 ? null : 1);
              triggerHaptic(950);
            }}
            className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 md:p-4 lg:p-4.5 border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md overflow-hidden ${
              selectedCard === 1
                ? 'bg-[#F9FCF8] border-[#B7E84B] ring-2 ring-[#B7E84B]/25'
                : 'bg-gradient-to-r from-white via-white to-[#F6FAF6] border-[#8FA98F]/25 hover:border-[#B7E84B]/70'
            }`}
          >
            {/* Subtle Green Corner Accent matching image */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-[#B7E84B]/25 to-transparent rounded-full pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5">
              
              {/* Left Illustration: Isometric Boxes, Fast Load Screen, Watch */}
              <div className="w-full sm:w-44 md:w-40 lg:w-44 shrink-0 flex items-center justify-center p-2 rounded-xl bg-[#F0F6F0]/80 border border-[#8FA98F]/20 relative">
                <svg viewBox="0 0 160 100" className="w-full h-20 sm:h-22 drop-shadow-xs" fill="none">
                  {/* Isometric Base Grid Shadow */}
                  <ellipse cx="80" cy="85" rx="65" ry="12" fill="#1E3A2B" fillOpacity="0.08" />

                  {/* Cardboard Box 1 (Brown/Tan) */}
                  <g transform="translate(18, 25)">
                    {/* Top */}
                    <path d="M24 0 L48 10 L24 20 L0 10 Z" fill="#D8B18A" />
                    {/* Tape */}
                    <path d="M18 7.5 L30 12.5 L24 15 L12 10 Z" fill="#C49B72" />
                    {/* Left */}
                    <path d="M0 10 L24 20 V44 L0 34 Z" fill="#C29B72" />
                    {/* Right */}
                    <path d="M24 20 L48 10 V34 L24 44 Z" fill="#B0865C" />
                    {/* Shipping Label */}
                    <rect x="28" y="16" width="12" height="8" rx="1" fill="#F8FAF8" transform="skewY(-12)" />
                  </g>

                  {/* Green Branded Box with Snowflake / Logo */}
                  <g transform="translate(10, 48)">
                    {/* Top */}
                    <path d="M16 0 L32 7 L16 14 L0 7 Z" fill="#88C244" />
                    {/* Left */}
                    <path d="M0 7 L16 14 V30 L0 23 Z" fill="#6EA82D" />
                    {/* Right */}
                    <path d="M16 14 L32 7 V23 L16 30 Z" fill="#588D20" />
                    {/* Brand mark */}
                    <circle cx="16" cy="7" r="3" fill="#FFFFFF" fillOpacity="0.8" />
                  </g>

                  {/* Smaller Cardboard Box in front */}
                  <g transform="translate(48, 52)">
                    <path d="M18 0 L36 8 L18 16 L0 8 Z" fill="#E2BC94" />
                    <path d="M0 8 L18 16 V32 L0 24 Z" fill="#CCA27A" />
                    <path d="M18 16 L36 8 V24 L18 32 Z" fill="#B78B62" />
                  </g>

                  {/* Desktop Monitor with Rising Chart & 'Fast load' Tag */}
                  <g transform="translate(74, 12)">
                    {/* Monitor frame */}
                    <rect x="6" y="0" width="56" height="38" rx="4" fill="#2A3830" />
                    <rect x="9" y="3" width="50" height="32" rx="2" fill="#FFFFFF" />
                    {/* Stand */}
                    <path d="M30 38 V48 H38 V38 Z" fill="#2A3830" />
                    <path d="M20 48 H48 V51 H20 Z" fill="#2A3830" />
                    {/* Rising green graph line */}
                    <path d="M14 26 L26 20 L38 23 L48 10" stroke="#B7E84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M48 10 L43 10 M48 10 L48 15" stroke="#B7E84B" strokeWidth="2" strokeLinecap="round" />
                    {/* "Fast load" badge on screen */}
                    <rect x="14" y="24" width="28" height="7" rx="2" fill="#1E3A2B" />
                    <text x="17" y="29" fill="#B7E84B" fontSize="4.5" fontFamily="monospace" fontWeight="bold">Fast load</text>
                  </g>

                  {/* Modern Luxury Wristwatch sitting on base */}
                  <g transform="translate(100, 56)">
                    {/* Strap */}
                    <path d="M14 0 H26 V28 H14 Z" fill="#44554A" rx="2" />
                    {/* Watch Case */}
                    <circle cx="20" cy="14" r="11" fill="#1E3A2B" stroke="#B7E84B" strokeWidth="1.5" />
                    <circle cx="20" cy="14" r="8" fill="#F8FAF8" />
                    {/* Hands */}
                    <line x1="20" y1="14" x2="20" y2="9" stroke="#1E3A2B" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="20" y1="14" x2="24" y2="14" stroke="#B7E84B" strokeWidth="1.2" strokeLinecap="round" />
                  </g>
                </svg>

                {/* Interactive Benchmark Button on image */}
                <button
                  type="button"
                  onClick={runArchitectureAudit}
                  className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#1E3A2B] text-[#B7E84B] text-[8.5px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-xs hover:scale-105 transition-transform"
                >
                  <Zap className="w-2.5 h-2.5" />
                  <span>{isAuditing ? 'Testing...' : 'Audit'}</span>
                </button>
              </div>

              {/* Text Information matching image */}
              <div className="flex-1 flex flex-col justify-center text-left">
                <h3 className="font-black text-sm sm:text-base md:text-sm lg:text-[15.5px] text-[#1E3A2B] tracking-tight uppercase flex items-center gap-2">
                  <span>STORE ARCHITECTURE:</span>
                </h3>
                <div className="font-extrabold text-xs sm:text-sm md:text-xs lg:text-[13px] text-[#1E3A2B] uppercase tracking-wide mt-0.5">
                  OPTIMIZED BUILDS
                </div>
                <p className="text-[11px] sm:text-xs md:text-[11px] lg:text-[11.5px] text-[#4A584E] font-medium leading-tight mt-0.5">
                  for speed & conversion
                </p>

                {/* Audit Result or Key Indicators */}
                {auditStats ? (
                  <div className="mt-2 flex items-center gap-2 text-[9.5px] font-mono bg-[#1E3A2B] text-white px-2.5 py-1 rounded-lg">
                    <span className="text-[#B7E84B] font-bold">TTFB: {auditStats.ttfb}ms</span>
                    <span className="text-white/40">•</span>
                    <span>LCP: {auditStats.lcp}ms</span>
                    <span className="text-white/40">•</span>
                    <span className="text-[#B7E84B] font-bold">Score: {auditStats.score}/100</span>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-[#8FA98F] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]"></span>
                    <span>Sub-850ms Edge SLA • Zero App Bloat</span>
                  </div>
                )}
              </div>

              {/* Right Floating Accessory: Wireframe Shopping Cart with Delivery Boxes */}
              <div className="hidden md:flex items-center justify-center pr-2 shrink-0">
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <svg viewBox="0 0 64 64" className="w-12 h-12 lg:w-14 lg:h-14" fill="none">
                    {/* Wireframe Cart Body */}
                    <path d="M10 14 H16 L22 42 H48 L54 22 H18" stroke="#3D7B80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Grid lines on cart */}
                    <line x1="24" y1="28" x2="50" y2="28" stroke="#5FA4A8" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="26" y1="35" x2="47" y2="35" stroke="#5FA4A8" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="28" y1="22" x2="28" y2="40" stroke="#5FA4A8" strokeWidth="1.2" />
                    <line x1="36" y1="22" x2="36" y2="40" stroke="#5FA4A8" strokeWidth="1.2" />
                    <line x1="44" y1="22" x2="44" y2="40" stroke="#5FA4A8" strokeWidth="1.2" />
                    {/* Wheels */}
                    <circle cx="26" cy="48" r="4" fill="#2A4B4E" stroke="#5FA4A8" strokeWidth="1.5" />
                    <circle cx="44" cy="48" r="4" fill="#2A4B4E" stroke="#5FA4A8" strokeWidth="1.5" />
                    {/* Mini Parcel Boxes inside Cart */}
                    <rect x="22" y="16" width="12" height="12" rx="1.5" fill="#D8B18A" stroke="#B0865C" strokeWidth="1" transform="rotate(-6 22 16)" />
                    <rect x="32" y="18" width="14" height="11" rx="1.5" fill="#88C244" stroke="#6EA82D" strokeWidth="1" transform="rotate(8 32 18)" />
                  </svg>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 2: MULTICHANNEL ACCELERATION: FEED MANAGEMENT & SOCIAL COMMERCE   */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div 
            id="about-card-multichannel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setSelectedCard(selectedCard === 2 ? null : 2);
              triggerHaptic(1020);
            }}
            className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 md:p-4 lg:p-4.5 border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md overflow-hidden ${
              selectedCard === 2
                ? 'bg-[#F9FCF8] border-[#B7E84B] ring-2 ring-[#B7E84B]/25'
                : 'bg-white border-[#8FA98F]/25 hover:border-[#B7E84B]/70'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5">
              
              {/* Left Illustration: Globe with Orbiting Social Icons */}
              <div className="w-full sm:w-44 md:w-40 lg:w-44 shrink-0 flex items-center justify-center p-2 rounded-xl bg-[#F0F6F5]/80 border border-[#8FA98F]/20 relative">
                <svg viewBox="0 0 160 100" className="w-full h-20 sm:h-22 drop-shadow-xs" fill="none">
                  {/* Outer Orbit Rings */}
                  <ellipse cx="80" cy="50" rx="60" ry="34" stroke="#8FA98F" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <ellipse cx="80" cy="50" rx="44" ry="44" stroke="#8FA98F" strokeWidth="0.8" opacity="0.3" />

                  {/* 3D Planet Earth Sphere */}
                  <g transform="translate(56, 26)">
                    <circle cx="24" cy="24" r="23" fill="#4B90E2" />
                    {/* Continents (Green) */}
                    <path d="M12 12 Q20 8 28 14 Q32 20 28 26 Q22 30 16 26 Z" fill="#66BB6A" />
                    <path d="M26 24 Q36 22 40 30 Q38 40 30 42 Q24 38 26 30 Z" fill="#66BB6A" />
                    <path d="M8 26 Q14 30 12 38 Q6 40 4 34 Z" fill="#66BB6A" />
                    {/* Latitude grid lines */}
                    <ellipse cx="24" cy="24" rx="23" ry="10" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" />
                    <ellipse cx="24" cy="24" rx="10" ry="23" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" />
                  </g>

                  {/* Orbiting Social Media Badges matching image */}
                  {/* Facebook (Blue) */}
                  <g transform="translate(18, 38)">
                    <circle cx="10" cy="10" r="9" fill="#3B5998" />
                    <text x="7.5" y="14" fill="#FFFFFF" fontSize="10" fontWeight="bold">f</text>
                  </g>

                  {/* WhatsApp (Green) */}
                  <g transform="translate(24, 66)">
                    <circle cx="8" cy="8" r="8" fill="#25D366" />
                    <path d="M5 8 Q8 5 11 8 Q11 11 8 11 Z" fill="#FFFFFF" />
                  </g>

                  {/* Twitter / X (Cyan/Dark) */}
                  <g transform="translate(36, 82)">
                    <circle cx="8" cy="8" r="8" fill="#1DA1F2" />
                    <path d="M5 6 L11 10 M11 6 L5 10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  </g>

                  {/* Instagram (Gradient Pink/Orange) */}
                  <g transform="translate(120, 36)">
                    <rect x="0" y="0" width="18" height="18" rx="5" fill="#E1306C" />
                    <circle cx="9" cy="9" r="4.5" stroke="#FFFFFF" strokeWidth="1.4" />
                    <circle cx="14" cy="4" r="1.2" fill="#FFFFFF" />
                  </g>

                  {/* LinkedIn (Blue) */}
                  <g transform="translate(126, 64)">
                    <circle cx="8" cy="8" r="8" fill="#0077B5" />
                    <text x="5.5" y="11.5" fill="#FFFFFF" fontSize="8" fontWeight="bold">in</text>
                  </g>

                  {/* TikTok / Center Bottom */}
                  <g transform="translate(80, 84)">
                    <circle cx="8" cy="8" r="8" fill="#000000" />
                    <path d="M7 6 V10 Q7 12 9 12 Q11 12 11 10 V8 Q12 9 13 9" stroke="#00F2FE" strokeWidth="1" fill="none" />
                  </g>
                </svg>

                {/* Channel Quick Toggle on badge */}
                <div className="absolute -top-1.5 -right-1.5 flex items-center bg-[#1E3A2B] rounded-full p-0.5 text-[8px] font-bold text-white shadow-xs">
                  <span className="px-1.5 py-0.2 text-[#B7E84B]">Meta • TikTok</span>
                </div>
              </div>

              {/* Text Information matching image */}
              <div className="flex-1 flex flex-col justify-center text-left">
                <h3 className="font-black text-sm sm:text-base md:text-sm lg:text-[15.5px] text-[#1E3A2B] tracking-tight uppercase flex items-center gap-2">
                  <span>MULTICHANNEL ACCELERATION:</span>
                </h3>
                <div className="font-extrabold text-xs sm:text-sm md:text-xs lg:text-[13px] text-[#1E3A2B] uppercase tracking-wide mt-0.5">
                  FEED MANAGEMENT & SOCIAL COMMERCE
                </div>
                <p className="text-[11px] sm:text-xs md:text-[11px] lg:text-[11.5px] text-[#4A584E] font-medium leading-tight mt-0.5">
                  across Meta, Google, TikTok
                </p>

                <div className="mt-2 flex items-center gap-2 text-[10px] text-[#8FA98F] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]"></span>
                  <span>Automated SKU Ingestion • Dynamic Catalogs</span>
                </div>
              </div>

              {/* Right Floating Accessory: Social Commerce Feed Cards (Watch with heart, Sneaker with like counts) */}
              <div className="hidden md:flex items-center justify-center pr-1 shrink-0">
                <div className="relative flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                  {/* Card 1: Watch with Heart */}
                  <div className="w-12 bg-white rounded-lg p-1 border border-[#8FA98F]/30 shadow-xs flex flex-col items-center">
                    <div className="w-8 h-8 rounded bg-[#F8FAF8] flex items-center justify-center border border-[#8FA98F]/15">
                      <div className="w-5 h-5 rounded-full border border-[#1E3A2B] bg-[#1E3A2B]/10 flex items-center justify-center">
                        <span className="text-[6px] font-bold text-[#1E3A2B]">⌚</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full mt-0.5 px-0.5">
                      <span className="text-[7px] text-red-500">❤️ 9.4k</span>
                    </div>
                  </div>

                  {/* Card 2: Sneaker with Like Badge */}
                  <div className="w-14 bg-white rounded-lg p-1 border border-[#8FA98F]/30 shadow-xs flex flex-col items-center -mt-2 ml-4">
                    <div className="w-10 h-7 rounded bg-[#FFF7F2] flex items-center justify-center border border-amber-200/50">
                      <span className="text-[9px]">👟</span>
                    </div>
                    <div className="flex items-center gap-0.5 w-full mt-0.5 px-0.5">
                      <span className="text-[6.5px] font-bold text-[#1E3A2B]">Verified</span>
                      <span className="text-[6px] text-[#8FA98F] ml-auto">12k</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 3: MERCHANT OPTIMIZATION: CATALOG OPERATIONS & PERFORMANCE TRACKING */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div 
            id="about-card-merchant"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setSelectedCard(selectedCard === 3 ? null : 3);
              triggerHaptic(1100);
            }}
            className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 md:p-4 lg:p-4.5 border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md overflow-hidden ${
              selectedCard === 3
                ? 'bg-[#FDFBFA] border-[#B7E84B] ring-2 ring-[#B7E84B]/25'
                : 'bg-gradient-to-r from-white via-white to-[#FDF9F6] border-[#8FA98F]/25 hover:border-[#B7E84B]/70'
            }`}
          >
            {/* Subtle Warm Bronze/Peach Glow at bottom left matching image */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-[#E6AF82]/30 to-transparent rounded-full pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5">
              
              {/* Left Illustration: Multi-Monitor Dashboard with Bar & Pie Charts */}
              <div className="w-full sm:w-44 md:w-40 lg:w-44 shrink-0 flex items-center justify-center p-2 rounded-xl bg-[#FAF5F0]/80 border border-[#8FA98F]/20 relative">
                <svg viewBox="0 0 160 100" className="w-full h-20 sm:h-22 drop-shadow-xs" fill="none">
                  {/* Background Monitor (Large) */}
                  <g transform="translate(16, 10)">
                    <rect x="0" y="0" width="70" height="48" rx="4" fill="#2A3830" />
                    <rect x="3" y="3" width="64" height="42" rx="2" fill="#FFFFFF" />
                    {/* Header bar */}
                    <rect x="3" y="3" width="64" height="7" fill="#E8EFE8" />
                    <circle cx="7" cy="6.5" r="1.5" fill="#FF5F56" />
                    <circle cx="12" cy="6.5" r="1.5" fill="#FFBD2E" />
                    <circle cx="17" cy="6.5" r="1.5" fill="#27C93F" />
                    {/* Rising green area & bar charts */}
                    <rect x="8" y="30" width="5" height="11" rx="1" fill="#88C244" />
                    <rect x="16" y="24" width="5" height="17" rx="1" fill="#88C244" />
                    <rect x="24" y="27" width="5" height="14" rx="1" fill="#88C244" />
                    <rect x="32" y="18" width="5" height="23" rx="1" fill="#588D20" />
                    <rect x="40" y="14" width="5" height="27" rx="1" fill="#B7E84B" />
                    {/* Growth line */}
                    <path d="M10 28 L18 22 L26 25 L34 16 L42 12" stroke="#1E3A2B" strokeWidth="1.8" strokeLinecap="round" />
                  </g>

                  {/* Foreground Monitor with Pie Chart & Analytics */}
                  <g transform="translate(72, 30)">
                    <rect x="0" y="0" width="60" height="44" rx="4" fill="#1E3A2B" />
                    <rect x="2.5" y="2.5" width="55" height="39" rx="2" fill="#FFFFFF" />
                    {/* Donut / Pie Chart */}
                    <circle cx="18" cy="22" r="10" stroke="#E0ECE0" strokeWidth="4" />
                    <circle cx="18" cy="22" r="10" stroke="#88C244" strokeWidth="4" strokeDasharray="38 60" />
                    <circle cx="18" cy="22" r="10" stroke="#B7E84B" strokeWidth="4" strokeDasharray="18 60" strokeDashoffset="-38" />
                    {/* Data lines */}
                    <rect x="33" y="14" width="20" height="3" rx="1" fill="#1E3A2B" />
                    <rect x="33" y="19" width="16" height="3" rx="1" fill="#88C244" />
                    <rect x="33" y="24" width="18" height="3" rx="1" fill="#B7E84B" />
                    <rect x="33" y="29" width="12" height="3" rx="1" fill="#8FA98F" />
                  </g>

                  {/* Green Dollar Currency Badge Coin */}
                  <g transform="translate(108, 14)">
                    <circle cx="12" cy="12" r="11" fill="#B7E84B" stroke="#1E3A2B" strokeWidth="1.5" />
                    <text x="8.5" y="16.5" fill="#1E3A2B" fontSize="13" fontWeight="900">$</text>
                  </g>
                </svg>

                {/* Multiplier Tag */}
                <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#1E3A2B] text-[#B7E84B] text-[8.5px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span>+{growthMultiplier}% AOV</span>
                </div>
              </div>

              {/* Text Information matching image */}
              <div className="flex-1 flex flex-col justify-center text-left">
                <h3 className="font-black text-sm sm:text-base md:text-sm lg:text-[15.5px] text-[#1E3A2B] tracking-tight uppercase flex items-center gap-2">
                  <span>MERCHANT OPTIMIZATION:</span>
                </h3>
                <div className="font-extrabold text-xs sm:text-sm md:text-xs lg:text-[13px] text-[#1E3A2B] uppercase tracking-wide mt-0.5">
                  CATALOG OPERATIONS & PERFORMANCE TRACKING
                </div>
                <p className="text-[11px] sm:text-xs md:text-[11px] lg:text-[11.5px] text-[#4A584E] font-medium leading-tight mt-0.5">
                  with predictive analysis
                </p>

                <div className="mt-2 flex items-center gap-2 text-[10px] text-[#8FA98F] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]"></span>
                  <span>Automated Margin Auditing • Churn Intelligence</span>
                </div>
              </div>

              {/* Right Floating Accessory: Price Tag Badge, Cap Icon, KPI Sparkline Widget */}
              <div className="hidden md:flex items-center justify-center pr-1 shrink-0">
                <div className="relative flex flex-col items-end gap-1 group-hover:scale-105 transition-transform duration-300">
                  {/* Price Tag with Barcode */}
                  <div className="bg-white rounded-md p-1 border border-[#8FA98F]/30 shadow-xs flex items-center gap-1">
                    <div className="w-4 h-6 rounded bg-[#F8FAF8] border border-[#8FA98F]/30 flex flex-col items-center justify-between p-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]"></div>
                      <div className="w-3 h-2 bg-[#1E3A2B] flex flex-col gap-0.5 py-0.5">
                        <div className="w-full h-px bg-white"></div>
                        <div className="w-full h-px bg-white"></div>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono font-bold text-[#1E3A2B]">$98</span>
                  </div>

                  {/* KPI Mini Widget Card */}
                  <div className="bg-white rounded-lg p-1.5 border border-[#8FA98F]/30 shadow-xs flex items-center gap-2 -mt-1">
                    <span className="text-[10px]">🧢</span>
                    <div className="flex flex-col">
                      <span className="text-[6.5px] font-mono text-[#8FA98F]">LIVE SALES</span>
                      <span className="text-[8px] font-black text-[#1E3A2B] font-mono">34.6K</span>
                    </div>
                    <svg className="w-6 h-3 text-[#B7E84B]" viewBox="0 0 24 12" fill="none">
                      <path d="M0 10 L6 6 L12 8 L18 2 L24 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* MEET THE TEAM SECTION (Clean & Responsive 4 Columns)                      */}
      {/* ========================================================================= */}
      <section id="meet-the-team" className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16 sm:py-24 border-t border-[#1E3A2B]/10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              CORE STUDIO LEADERSHIP
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#1E3A2B]">
            MEET THE TEAM
          </h2>

          <p className="mt-4 text-[#4A584E] text-base sm:text-lg leading-relaxed">
            The dedicated developers, operations specialists, and digital artisans behind every high-performance CommerceForge storefront.
          </p>
        </div>

        {/* 4 Responsive Columns for Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl border border-[#1E3A2B]/10 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#B7E84B] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Frame / Image Slot ready for later picture addition */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#EAF3E8] via-[#F4F8F3] to-[#DFEADF] border border-[#1E3A2B]/10 flex flex-col items-center justify-center group-hover:border-[#B7E84B]/60 transition-all mb-5">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      {/* Stylized Monogram Initials Avatar Badge */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#1E3A2B] text-[#B7E84B] flex items-center justify-center text-2xl sm:text-3xl font-black font-mono shadow-md group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(183,232,75,0.3)] transition-all">
                        {member.initials}
                      </div>

                      {/* Photo Slot Notice */}
                      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-mono font-bold text-[#4A584E] border border-[#1E3A2B]/10 shadow-xs">
                        <Camera className="w-3 h-3 text-[#2D5A40]" />
                        <span>Photo Slot</span>
                      </div>
                    </div>
                  )}

                  {/* Founder / Co-Founder Badge on Photo Frame */}
                  <div className="absolute top-3 right-3">
                    <span 
                      className={`px-3 py-1 rounded-full text-[9.5px] font-mono font-black uppercase tracking-wider shadow-xs ${
                        member.isFounder
                          ? 'bg-[#1E3A2B] text-[#B7E84B] border border-[#B7E84B]/40'
                          : 'bg-white/95 text-[#1E3A2B] border border-[#1E3A2B]/10'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Member Identity & Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1E3A2B]">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#2D5A40]">
                    {member.role}
                  </p>

                  {/* Specializations & Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {member.specializations.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-[#F1F6F0] text-[#1E3A2B] text-[11px] font-semibold border border-[#1E3A2B]/8"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs sm:text-[13px] text-[#4A584E] leading-relaxed pt-3 font-medium">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="pt-4 mt-5 border-t border-[#1E3A2B]/8 flex items-center justify-between text-[11px] font-semibold text-[#4A584E]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
                  <span>Available for Sprints</span>
                </div>
                <span className="text-[10px] font-mono text-[#8FA98F]">CommerceForge</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STUDIO CRAFT PRINCIPLES                                                   */}
      {/* ========================================================================= */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pb-16 sm:pb-24">
        <div className="bg-[#12241A] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#B7E84B] text-[#0F241A] mb-3 inline-block">
              OUR STUDIO ETHOS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
              WHY COMMERCEFORGE BUILDS DIFFERENTLY.
            </h2>
            <p className="mt-3 text-white/70 text-sm leading-relaxed">
              We reject bulky generic themes and heavy agency retainers. We build custom, lean storefronts optimized for real-world merchant conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#B7E84B] text-[#0F241A] flex items-center justify-center font-black text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold uppercase text-white mb-2">Sub-Second Speed</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Every millisecond shaved off load time directly elevates conversion and reduces bounce rates, especially on mobile shopping traffic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#B7E84B] text-[#0F241A] flex items-center justify-center font-black text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold uppercase text-white mb-2">100% Code Ownership</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                You own your complete repository, domain, and assets with zero proprietary builder lock-in and zero mandatory monthly retainers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-[#B7E84B] text-[#0F241A] flex items-center justify-center font-black text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold uppercase text-white mb-2">Direct Founder Collaboration</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Work directly with the founders and engineers building your website — no account managers, no communication games, just fast delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CAPABILITIES DEEP-DIVE MODAL (Triggered by 'VIEW OUR CAPABILITIES →')     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCapabilitiesOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F241A]/75 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#8FA98F]/30 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  triggerHaptic(800);
                  setIsCapabilitiesOpen(false);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F0F6F0] hover:bg-[#1E3A2B] hover:text-[#B7E84B] text-[#1E3A2B] flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#8FA98F] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B7E84B]" />
                <span>STUDIO CAPABILITIES</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1E3A2B] leading-tight mb-2">
                FULL-STACK DIGITAL SHELF ARCHITECTURE
              </h2>

              <p className="text-xs sm:text-[13px] text-[#4A584E] leading-relaxed mb-6 font-medium">
                We replace generic Shopify templates and app-bloated stores with custom headless builds, tactile WebGL product stages, and multichannel social feeds.
              </p>

              {/* 3 Core Capability Pillars */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#8FA98F]/25 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A2B] text-[#B7E84B] flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-[#1E3A2B]">
                      1. Headless Store Architecture & Sub-850ms Speed
                    </h4>
                    <p className="text-[11.5px] text-[#4A584E] mt-1 leading-relaxed">
                      Built with Hydrogen, Next.js, and edge workers. Instantaneous page switches with sub-30ms global TTFB, generating a direct +28% to +42% lift in mobile checkout completion.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#8FA98F]/25 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A2B] text-[#B7E84B] flex items-center justify-center shrink-0 mt-0.5">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-[#1E3A2B]">
                      2. Automated Multichannel Catalog Feeds
                    </h4>
                    <p className="text-[11.5px] text-[#4A584E] mt-1 leading-relaxed">
                      Real-time inventory synchronization across Meta Shop, Google Merchant Center, TikTok Shop, and Amazon. Dynamic feed optimization to maximize paid ad ROAS.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#8FA98F]/25 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1E3A2B] text-[#B7E84B] flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase text-[#1E3A2B]">
                      3. Predictive Merchant Analytics & Conversion Lift
                    </h4>
                    <p className="text-[11.5px] text-[#4A584E] mt-1 leading-relaxed">
                      Continuous CRO sprints, real-time cohort tracking, and automated margin protection. Every deployment is measured directly by AOV, LTV, and customer retention.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="mt-6 pt-4 border-t border-[#8FA98F]/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A2B]">
                  <CheckCircle2 className="w-4 h-4 text-[#B7E84B]" />
                  <span>Accepting Select Brand Sprints for Q3 2026</span>
                </div>

                {onHireClick && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCapabilitiesOpen(false);
                      onHireClick();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A2B] text-[#B7E84B] text-xs font-black uppercase tracking-wider hover:bg-[#15271d] transition-all cursor-pointer"
                  >
                    <span>Hire Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
