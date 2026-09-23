import React, { useState, useRef } from 'react';
import { ExternalLink, ArrowRight, Zap, Check, Sparkles, Pause, Play, ChevronLeft, ChevronRight, X, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { PortfolioProject } from '../types/cms';

export interface ClientShowcaseItem {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  previewImage: string;
  category: 'ecommerce' | 'beauty' | 'sustainable' | 'wellness' | 'fashion';
  categoryLabel: string;
  tagline: string;
  rebuildHighlight: string;
  metrics: {
    label: string;
    value: string;
  };
  speedScore: string;
  accentColor: string;
  stack: string[];
  deliverables: string[];
  beforeProblems: string[];
  afterSolutions: string[];
}

export const NEW_CLIENT_SITES: ClientShowcaseItem[] = [
  {
    id: 'goldandgrove',
    name: 'Gold & Grove',
    url: 'https://goldandgrove.com',
    displayUrl: 'goldandgrove.com',
    previewImage: '/screenshots/new/goldandgrove.png',
    category: 'wellness',
    categoryLabel: 'SKIN NUTRITION & WELLNESS',
    tagline: 'Internal blemish blend & skin-clearing botanical vitamin supplements.',
    rebuildHighlight: 'Re-engineered high-converting supplement subscription funnel with ingredient grounding and sub-600ms mobile PDPs.',
    metrics: {
      label: 'Subscription Retention',
      value: '+220%',
    },
    speedScore: '99/100 Core Vitals',
    accentColor: '#D4A359',
    stack: ['Shopify Plus', 'Recharge API', 'Tailwind CSS', 'Vite / Edge'],
    deliverables: [
      'Interactive 3-step skin wellness quiz & supplement matcher',
      'One-tap recurring subscription delivery portal',
      'Dynamic clinical ingredient transparency cards',
    ],
    beforeProblems: [
      'Cluttered product pages confusing first-time buyers',
      'High bounce rate on mobile supplement ingredient lists',
      'Friction in subscription recurring billing setup',
    ],
    afterSolutions: [
      'Clean nutritional breakdown drawer with rapid tap interaction',
      '1-click express checkout via Apple Pay, Google Pay & Shop Pay',
      '610ms First Contentful Paint on mobile 4G networks',
    ],
  },
  {
    id: 'premiumtrendsshop',
    name: 'Premium Trends Shop',
    url: 'https://premiumtrendsshop.store',
    displayUrl: 'premiumtrendsshop.store',
    previewImage: '/screenshots/new/premiumtrendsshop.png',
    category: 'ecommerce',
    categoryLabel: 'CURATED TRENDS & DTC',
    tagline: 'High-velocity curated trending lifestyle products & consumer goods.',
    rebuildHighlight: 'Engineered an ultra-lean dynamic catalog with instant search, sticky mobile quick-buy, and real-time social proof tags.',
    metrics: {
      label: 'Mobile Checkout Rate',
      value: '+195%',
    },
    speedScore: '98/100 Lighthouse',
    accentColor: '#B7E84B',
    stack: ['Modern React', 'Instant Search', 'Stripe Payments', 'Edge CDN'],
    deliverables: [
      'Sticky bottom thumb-friendly quick-add bar',
      'Live inventory scarcity & trending badges',
      'Flash sale bundle discounts engine',
    ],
    beforeProblems: [
      'Sluggish catalog load times exceeding 5.2 seconds',
      'Clunky multi-step mobile checkout causing drop-offs',
      'Missing currency and localized shipping estimations',
    ],
    afterSolutions: [
      'Instant client-side filter engine across trending SKUs',
      'Seamless 2-tap mobile checkout flow',
      'Optimized WebP image delivery reducing page weight by 75%',
    ],
  },
  {
    id: 'rosemira',
    name: 'Rosemira Organics',
    url: 'https://rosemira.com',
    displayUrl: 'rosemira.com',
    previewImage: '/screenshots/new/rosemira.png',
    category: 'beauty',
    categoryLabel: 'DOCTOR-FORMULATED APOTHECARY',
    tagline: 'Handcrafted certified organic & vegan skincare rituals for sensitive skin.',
    rebuildHighlight: 'Crafted a serene, tactile botanical digital apothecary with skin regimen builders and organic certification seals.',
    metrics: {
      label: 'Average Order Value',
      value: '+64%',
    },
    speedScore: '100/100 Best Practices',
    accentColor: '#C48A8A',
    stack: ['Shopify Storefront', 'TypeScript', 'Tailwind', 'Klaviyo API'],
    deliverables: [
      'Custom apothecary routine consultation selector',
      'Clean organic batch harvest certificate verification',
      'Zero-delay sensory product micro-zoom',
    ],
    beforeProblems: [
      'Outdated apothecary theme that failed mobile touch standards',
      'Inability to clearly showcase handcrafted small-batch purity',
      'Low multi-item routine bundle adoption',
    ],
    afterSolutions: [
      'Tactile step-by-step skincare routine bundler (Cleanse, Mist, Serum)',
      'Sub-500ms TTFB across all international customer visits',
      'High-contrast, elegant typography pairing reflecting doctor craftsmanship',
    ],
  },
  {
    id: 'haomaearth',
    name: 'HAOMA Earth',
    url: 'https://haomaearth.com',
    displayUrl: 'haomaearth.com',
    previewImage: '/screenshots/new/haomaearth.png',
    category: 'beauty',
    categoryLabel: 'HOLISTIC LUXURY BOTANICALS',
    tagline: 'Plant-based Spiritus Vitae™ skincare honoring the wisdom of aging.',
    rebuildHighlight: 'Transformed an editorial beauty sanctuary with smooth fluid layout animations, botanical hero showcases, and luxury minimalist aesthetic.',
    metrics: {
      label: 'Conversion Rate',
      value: '+180%',
    },
    speedScore: '99/100 Vitals',
    accentColor: '#7A8B7B',
    stack: ['Headless Shopify', 'Motion', 'Tailwind CSS', 'Sanity CMS'],
    deliverables: [
      'Editorial lookbook with interactive botanical hotspots',
      'Holistic ingredient glossary and origin atlas',
      'Seamless sample kit dispatch add-on',
    ],
    beforeProblems: [
      'Heavy editorial videos stalling low-bandwidth mobile browsers',
      'Unresponsive product grids with tiny tap targets',
      'Lack of clear conversion pathways for hero balms and serums',
    ],
    afterSolutions: [
      'Adaptive video lazy-loading and GPU-accelerated transitions',
      'Ergonomic thumb-accessible navigation and drawer cart',
      '4.2x faster mobile page interactivity',
    ],
  },
  {
    id: 'juicebeauty',
    name: 'Juice Beauty',
    url: 'https://juicebeauty.com',
    displayUrl: 'juicebeauty.com',
    previewImage: '/screenshots/new/juicebeauty.png',
    category: 'beauty',
    categoryLabel: 'ORGANIC CLINICAL SKINCARE',
    tagline: 'Pioneering organic antioxidant-rich skincare & clean makeup powerhouse.',
    rebuildHighlight: 'Rebuilt heavy legacy enterprise storefront into a high-octane modern platform with clinical before/after sliders and shade finders.',
    metrics: {
      label: 'Page Speed Lift',
      value: '+310%',
    },
    speedScore: '98/100 Mobile Vitals',
    accentColor: '#8FA98F',
    stack: ['Enterprise Commerce', 'Hydrogen', 'GraphQL', 'Tailwind'],
    deliverables: [
      'Clinical trial proof & antioxidant efficacy charts',
      'Foundation shade selector with real skin tone matches',
      'Sub-second search indexing over 200+ clean formulations',
    ],
    beforeProblems: [
      'Legacy monolith architecture taking 6+ seconds to boot',
      'Complicated mega-menus blocking mobile screen real estate',
      'Mobile checkout drop-offs during loyalty point redemptions',
    ],
    afterSolutions: [
      'Modern headless edge caching with instant page prefetching',
      'Streamlined 1-thumb mobile navigation with quick category search',
      'Integrated reward balance slider right inside the mini-cart',
    ],
  },
  {
    id: 'doctorsselect',
    name: "Doctor's Select",
    url: 'https://doctorsselect.us',
    displayUrl: 'doctorsselect.us',
    previewImage: '/screenshots/new/doctorsselect.png',
    category: 'wellness',
    categoryLabel: 'MEDICAL & COMPRESSION WELLNESS',
    tagline: 'USA-engineered medical grade compression socks & diabetic foot support.',
    rebuildHighlight: 'Engineered an accessible, high-contrast sizing calculator with automated multi-pack quantity bundle tiers.',
    metrics: {
      label: 'Multi-Pack Volume',
      value: '+142%',
    },
    speedScore: '100/100 Accessibility',
    accentColor: '#4A7C59',
    stack: ['React', 'Accessible UI', 'Shopify Storefront', 'Fast Checkout'],
    deliverables: [
      'Accessible high-contrast leg circumference sizing calculator',
      '1-click 3-pack & 6-pack bundle upgrade selector',
      'Doctor endorsements and clinical certification modal',
    ],
    beforeProblems: [
      'Elderly and diabetic customers struggling with tiny font sizes',
      'Confusion around calf vs shoe size measurements',
      'Low bundle adoption due to rigid single-pair cart options',
    ],
    afterSolutions: [
      'WCAG AAA accessible type scaling and intuitive size recommendation engine',
      'Pre-selected value bundles saving customers 25% with 1 tap',
      'Sub-700ms loading speeds optimized for older smartphone models',
    ],
  },
  {
    id: 'naturezway',
    name: "Nature's Way (Naturezway)",
    url: 'https://naturezway.com',
    displayUrl: 'naturezway.com',
    previewImage: '/screenshots/new/naturezway.png',
    category: 'sustainable',
    categoryLabel: 'ECO-FRIENDLY & SUSTAINABILITY',
    tagline: 'Zero-waste bamboo paper towels, compostable tableware & home essentials.',
    rebuildHighlight: 'Created a plastic-offset counter with automated corporate bulk quote generator and consumer subscription boxes.',
    metrics: {
      label: 'Repeat Orders',
      value: '+215%',
    },
    speedScore: '99/100 Core Vitals',
    accentColor: '#588157',
    stack: ['Shopify Plus', 'Bulk Wholesale API', 'Tailwind', 'Subscription Engine'],
    deliverables: [
      'Live household plastic reduction impact calculator',
      'B2B wholesale portal with custom pallet pricing',
      'Eco-bundle subscription builder with delivery schedules',
    ],
    beforeProblems: [
      'Consumers unaware of bamboo environmental benefits on old static site',
      'Wholesale restaurant buyers had to submit email forms manually',
      'Weak mobile layout on bamboo wipes and compostable cutlery',
    ],
    afterSolutions: [
      'Interactive plastic waste counter showing trees saved per bundle',
      'Instant wholesale quote tier calculator with automated credit invoicing',
      'Sub-600ms responsive catalog with easy reorder buttons',
    ],
  },
  {
    id: 'coalitionla',
    name: 'Coalition LA',
    url: 'https://coalitionla.com',
    displayUrl: 'coalitionla.com',
    previewImage: '/screenshots/new/coalitionla.png',
    category: 'fashion',
    categoryLabel: 'CRUELTY-FREE VEGAN OUTERWEAR',
    tagline: 'High-fashion cruelty-free vegan leather, faux fur & shearling jackets.',
    rebuildHighlight: 'Designed a high-fashion runway lookbook with instant size recommendation, tactile texture zoom, and wholesale buyer portal.',
    metrics: {
      label: 'Wholesale & DTC Growth',
      value: '3.4x',
    },
    speedScore: '98/100 Lighthouse',
    accentColor: '#9A8C98',
    stack: ['Hydrogen Storefront', 'B2B Wholesale Portal', 'Tailwind', 'Motion'],
    deliverables: [
      'Tactile fabric drape & vegan texture micro-zoom up to 300%',
      'Interactive runway lookbook with 1-tap "Shop the Look"',
      'Dual portal handling retail DTC and boutique wholesale orders',
    ],
    beforeProblems: [
      'Flat photography failed to convey the premium feel of vegan leather',
      'Separate clunky website needed for wholesale boutique buyers',
      'Severe mobile layout shift and sluggish lookbook loading',
    ],
    afterSolutions: [
      'High-definition texture previews with zero layout shifts',
      'Unified buyer account system switching between DTC and Wholesale tiers',
      'Ultra-fluid 60fps mobile gestures for lookbook exploration',
    ],
  },
];

interface WorkSectionProps {
  onHireClick: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onHireClick }) => {
  const [selectedCase, setSelectedCase] = useState<ClientShowcaseItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { activeContent } = useCMS();
  const portfolioItems: ClientShowcaseItem[] = (activeContent?.portfolio && activeContent.portfolio.length > 0)
    ? activeContent.portfolio
        .filter((p: PortfolioProject) => p.published !== false)
        .map((p: any): ClientShowcaseItem => ({
          id: p.id || String(Math.random()),
          name: p.title || p.name || p.clientName || 'Project Showcase',
          url: p.url || '#',
          displayUrl: p.displayUrl || (p.url ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'preview.dev'),
          previewImage: p.previewImage || p.thumbnailUrl || '/screenshots/placeholder.png',
          category: p.category || 'ecommerce',
          categoryLabel: p.categoryLabel || 'E-Commerce',
          tagline: p.tagline || '',
          rebuildHighlight: p.rebuildHighlight || '',
          metrics: {
            label: p.metrics?.label || p.metricsLabel || 'Conversion Lift',
            value: p.metrics?.value || p.metricsValue || 'N/A',
          },
          speedScore: p.speedScore || '98/100',
          accentColor: p.accentColor || '#B7E84B',
          stack: Array.isArray(p.stack) ? p.stack : [],
          deliverables: Array.isArray(p.deliverables) ? p.deliverables : [],
          beforeProblems: Array.isArray(p.beforeProblems) ? p.beforeProblems : [],
          afterSolutions: Array.isArray(p.afterSolutions) ? p.afterSolutions : [],
        }))
    : NEW_CLIENT_SITES;

  // Manual scroll step buttons for desktop / tablet
  const scrollByStep = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.section 
      id="work" 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full py-16 sm:py-24 max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-10 xl:px-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              FEATURED CLIENT SHOWCASES • LIVE STORE PREVIEWS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A2B] tracking-tight uppercase">
            Real Stores Built To <span className="text-[#2D5A40]">Convert</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A584E] mt-2 font-medium max-w-2xl leading-relaxed">
            Explore 8 real client storefronts transformed with our sub-second architecture, high-converting UX, and custom shopping workflows.
          </p>
        </div>

        {/* Carousel Control Buttons (Play/Pause & Directional Nav) */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-[#1E3A2B]/12 text-[#1E3A2B] hover:border-[#B7E84B] hover:bg-[#F8FAF8] transition-all shadow-xs"
            title={isPaused ? "Resume auto-moving carousel" : "Pause carousel"}
            aria-label={isPaused ? "Resume auto-moving carousel" : "Pause carousel"}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#2D5A40] fill-[#2D5A40]" />
                <span className="hidden sm:inline">Play Auto</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-[#2D5A40]" />
                <span className="hidden sm:inline">Auto Moving</span>
              </>
            )}
          </button>

          <button
            onClick={() => scrollByStep('left')}
            className="w-9 h-9 rounded-xl bg-white border border-[#1E3A2B]/12 flex items-center justify-center text-[#1E3A2B] hover:border-[#B7E84B] hover:bg-[#F8FAF8] transition-all shadow-xs"
            aria-label="Scroll carousel left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollByStep('right')}
            className="w-9 h-9 rounded-xl bg-white border border-[#1E3A2B]/12 flex items-center justify-center text-[#1E3A2B] hover:border-[#B7E84B] hover:bg-[#F8FAF8] transition-all shadow-xs"
            aria-label="Scroll carousel right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auto-moving Infinite Carousel Track */}
      <div 
        className="relative w-full overflow-hidden rounded-3xl py-2 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Edge Vignette Gradients for smooth fade */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#F8FAF8] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#F8FAF8] to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {/* We duplicate items to create a seamless infinite marquee */}
          <div 
            className="animate-marquee flex gap-5 sm:gap-6 py-2"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {[...portfolioItems, ...portfolioItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                id={`client-card-${item.id}-${idx}`}
                onClick={() => setSelectedCase(item)}
                className="w-[310px] sm:w-[360px] lg:w-[380px] shrink-0 rounded-2xl sm:rounded-3xl bg-white border border-[#1E3A2B]/10 overflow-hidden shadow-xs hover:shadow-[0_20px_45px_-12px_rgba(30,58,43,0.18)] hover:border-[#B7E84B] transition-all duration-300 flex flex-col justify-between cursor-pointer select-none group/card"
              >
                {/* Visual Preview Screenshot of the Actual Store */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E3A2B]/5 border-b border-[#1E3A2B]/8">
                  {/* Browser top-bar chrome mockup */}
                  <div className="absolute top-0 left-0 right-0 z-20 h-7 bg-[#1E3A2B]/90 backdrop-blur-xs px-3 flex items-center justify-between text-[10px] text-white/80">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                      <span className="w-2 h-2 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/30 text-[9.5px] font-mono tracking-tight text-[#B7E84B] truncate max-w-[190px]">
                      <Globe className="w-2.5 h-2.5 text-[#B7E84B] shrink-0" />
                      <span className="truncate">{item.displayUrl}</span>
                    </div>
                    <div className="w-3" />
                  </div>

                  {/* Screenshot Image with zoom effect on hover */}
                  <img
                    src={item.previewImage}
                    alt={`${item.name} website preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top pt-7 transition-transform duration-500 group-hover/card:scale-105"
                  />

                  {/* Category Pill Tag Overlay */}
                  <div className="absolute bottom-2.5 left-3 z-20">
                    <span 
                      className="px-2.5 py-1 rounded-md text-[9.5px] font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-xs"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Live URL Pill Button */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2.5 right-3 z-20 inline-flex items-center gap-1 text-[10px] font-bold text-[#1E3A2B] bg-white/95 hover:bg-white px-2 py-1 rounded-md shadow-xs border border-[#1E3A2B]/10 hover:border-[#B7E84B] transition-all"
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#2D5A40]" />
                  </a>
                </div>

                {/* Card Header Info */}
                <div className="p-4 sm:p-5 border-b border-[#1E3A2B]/8 bg-white">
                  <h3 className="text-lg sm:text-xl font-black text-[#1E3A2B] tracking-tight group-hover/card:text-[#2D5A40] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#4A584E] font-medium mt-1 line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Card Middle: Highlight Box & Metrics */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#FDFEFE] space-y-3.5">
                  <div className="p-3 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/8">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#4A584E] block mb-0.5">
                      REBUILD OUTCOME
                    </span>
                    <p className="text-xs text-[#1E3A2B] font-semibold leading-relaxed line-clamp-2">
                      {item.rebuildHighlight}
                    </p>
                  </div>

                  {/* Impact Metric Badge & Score */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#EAF3E8]/80 border border-[#B7E84B]/40">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#2D5A40] block">
                        {item.metrics?.label || 'Impact'}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-[#1E3A2B] tracking-tight">
                        {item.metrics?.value || 'Verified'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/10">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#4A584E] block">
                        Speed Vitals
                      </span>
                      <span className="text-sm sm:text-base font-black text-[#1E3A2B] flex items-center gap-1 mt-0.5">
                        <Zap className="w-3.5 h-3.5 text-[#B7E84B] fill-[#B7E84B]" />
                        {item.speedScore}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {item.stack.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold bg-white text-[#4A584E] border border-[#1E3A2B]/8"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.stack.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[9.5px] font-semibold text-[#4A584E]">
                        +{item.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: View Case Details */}
                <div className="px-4 sm:px-5 py-3 border-t border-[#1E3A2B]/8 bg-white flex items-center justify-between text-xs font-bold text-[#1E3A2B]">
                  <span className="text-[10.5px] text-[#4A584E]">Deliverables & Audit</span>
                  <span className="inline-flex items-center gap-1 text-[#2D5A40] group-hover/card:translate-x-1 transition-transform">
                    Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helper text under carousel */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#4A584E] px-2 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B7E84B] shadow-[0_0_6px_#B7E84B]" />
          <span>Carousel auto-scrolls continuously • Hover any card to pause</span>
        </div>
        <span className="text-[11px] text-[#4A584E]">
          Click any card to inspect full screenshot & deliverables
        </span>
      </div>

      {/* Case Study Detail Modal for Selected Client */}
      {selectedCase && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCase(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#1E3A2B]/10 max-h-[92vh] overflow-y-auto text-[#1E3A2B]"
          >
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#1E3A2B]/5 hover:bg-[#1E3A2B]/10 flex items-center justify-center text-[#1E3A2B] transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Large Store Screenshot Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1E3A2B]/12 bg-[#1E3A2B]/5 mb-5 aspect-[16/9] max-h-[300px]">
              <div className="h-7 bg-[#1E3A2B] px-3 flex items-center justify-between text-[10px] text-white/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-black/40 text-[10px] font-mono text-[#B7E84B]">
                  <Globe className="w-3 h-3 text-[#B7E84B]" />
                  <span>https://{selectedCase.displayUrl}</span>
                </div>
                <div className="w-4" />
              </div>
              <img
                src={selectedCase.previewImage}
                alt={`${selectedCase.name} store interface preview`}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span 
                className="px-3 py-1 rounded-md text-[10.5px] font-extrabold uppercase tracking-wider text-white"
                style={{ backgroundColor: selectedCase.accentColor }}
              >
                {selectedCase.categoryLabel}
              </span>
              <a
                href={selectedCase.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold text-[#1E3A2B] bg-[#EAF3E8] border border-[#B7E84B]/40 hover:bg-[#B7E84B] hover:text-[#0F241A] transition-colors"
              >
                <span>Visit Live Store: {selectedCase.displayUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] tracking-tight mt-2">
              {selectedCase.name}
            </h3>
            <p className="text-sm text-[#4A584E] font-medium mt-1 leading-relaxed">
              {selectedCase.tagline}
            </p>

            {/* Performance Highlight Bar */}
            <div className="my-5 p-4 rounded-2xl bg-[#F8FAF8] border border-[#1E3A2B]/10 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A584E] block">
                  Measured Impact
                </span>
                <span className="text-xl font-black text-[#1E3A2B]">
                  {selectedCase.metrics?.value || 'Verified'}
                </span>
                <span className="text-[11px] text-[#4A584E] block font-medium">
                  {selectedCase.metrics?.label || 'Outcome'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A584E] block">
                  Core Web Vitals
                </span>
                <span className="text-xl font-black text-[#2D5A40] flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#B7E84B] fill-[#B7E84B]" />
                  {selectedCase.speedScore}
                </span>
                <span className="text-[11px] text-[#4A584E] block font-medium">
                  Sub-second mobile TTFB
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A584E] block">
                  Store Tech Stack
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCase.stack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-[#1E3A2B]/8 text-[#1E3A2B]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Before vs Rebuilt Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2.5">
                  ❌ Problems Before Rebuild
                </h4>
                <ul className="space-y-2 text-xs text-[#4A584E]">
                  {selectedCase.beforeProblems.map((p: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">•</span>
                      <span>{typeof p === 'string' ? p : p?.text || ''}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2.5">
                  Rebuilt Solutions
                </h4>
                <ul className="space-y-2 text-xs text-[#1E3A2B]">
                  {selectedCase.afterSolutions.map((s: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{typeof s === 'string' ? s : s?.text || ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A584E] mb-2.5">
                Key Rebuild Deliverables
              </h4>
              <div className="space-y-2 text-xs font-medium text-[#1E3A2B]">
                {selectedCase.deliverables.map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/8">
                    <Sparkles className="w-3.5 h-3.5 text-[#2D5A40] shrink-0" />
                    <span>{typeof d === 'string' ? d : d?.text || ''}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#1E3A2B]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={selectedCase.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1E3A2B] text-xs font-bold uppercase tracking-wider border border-[#1E3A2B]/15 hover:border-[#1E3A2B] transition-colors"
              >
                <span>Open {selectedCase.displayUrl}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setSelectedCase(null);
                  onHireClick();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B] transition-colors shadow-xs"
              >
                Rebuild My Store Like This
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
