import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Globe2, 
  Check, 
  Zap, 
  X, 
  CheckCircle2, 
  TrendingUp,
  ShieldCheck,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { DynamicSectionRenderer } from './DynamicSectionRenderer';

interface WorkPageProps {
  onHireClick?: () => void;
}

export interface ClientSite {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  industry: string;
  category: string;
  tagline: string;
  headline: string;
  metrics: {
    label: string;
    value: string;
    sub: string;
  };
  speed: string;
  vitals: string;
  stack: string[];
  image: string;
  accentHex: string;
  summary: string;
  highlights: string[];
  beforeProblems?: string[];
  afterSolutions?: string[];
}

export const CLIENT_SITES: ClientSite[] = [
  {
    id: 'willow-bath',
    name: 'Willow Bath and Vanity',
    url: 'https://www.willowbathandvanity.com',
    displayUrl: 'willowbathandvanity.com',
    industry: 'LUXURY BATH & HOME DTC',
    category: 'ecommerce',
    tagline: 'High-AOV bathroom vanities, freestanding tubs & smart LED mirrors.',
    headline: 'Sub-700ms headless store with dynamic 3D configuration.',
    metrics: {
      label: 'AOV Expansion',
      value: '+54%',
      sub: 'Lift across custom vanity configurations'
    },
    speed: '680ms TTFB',
    vitals: '99/100 Vitals',
    stack: ['Shopify Plus', 'Hydrogen', 'Tailwind CSS', '3D Configurator', 'Sanity CMS'],
    image: '/screenshots/willow-bath.png',
    accentHex: '#B7E84B',
    summary: 'Engineered a bespoke high-AOV headless store with real-time marble and finish configurators, dynamic freight delivery calculation, and sub-700ms mobile checkout.',
    highlights: [
      'Real-time marble, hardware & finish 3D visualizer',
      'Dynamic LTL freight delivery & dispatch calculator',
      'Zero-delay mobile cart with instant Apple Pay'
    ],
    beforeProblems: [
      'High bounce rate on custom marble vanity option selectors',
      'Sluggish catalog load times exceeding 4.8 seconds on mobile',
      'Friction in calculating freight shipping rates for oversize items'
    ],
    afterSolutions: [
      'Modular 3D configurator with sub-50ms reactive state changes',
      '680ms TTFB edge caching across global North American CDN nodes',
      'Automated freight delivery estimation directly in the cart drawer'
    ]
  },
  {
    id: 'sultans-fabrics',
    name: "Sultan's Fine Fabrics",
    url: 'https://www.sultansfinefabrics.com',
    displayUrl: 'sultansfinefabrics.com',
    industry: 'HERITAGE BESPOKE TEXTILES',
    category: 'heritage',
    tagline: 'World-renowned merchant of European cashmere, Italian suitings & silks.',
    headline: 'Tactile digital shelf with micro-zoom & swatch sample dispatch.',
    metrics: {
      label: 'Mobile Sales',
      value: '+128%',
      sub: 'Swatch sample requests tripled in 60 days'
    },
    speed: '540ms TTFB',
    vitals: '100/100 Vitals',
    stack: ['Next.js 15', 'Sanity CMS', 'Algolia Search', 'Stripe', 'Tailwind'],
    image: '/screenshots/sultans-fabrics.png',
    accentHex: '#E2B176',
    summary: 'Digital shelf modernization for an elite textile house. Features tactile high-res micro-texture zoom, dynamic yardage calculations, and instant fabric sample kits.',
    highlights: [
      'High-fidelity weave texture zoom up to 400%',
      'Fractional yardage & bolt availability engine',
      'Instant swatch sample kit ordering workflow'
    ],
    beforeProblems: [
      'Clients hesitant to purchase luxury fabrics without inspecting weave textures',
      'Manual yardage inquiries overwhelming sales staff over email',
      'Zero mobile-responsive sampling flow'
    ],
    afterSolutions: [
      'Tactile 400% zoom engine with instant WebP tile loading',
      'Direct fractional bolt ordering calculator with live inventory counts',
      'One-tap sample swatch box builder with expedited dispatch'
    ]
  },
  {
    id: 'canton-roast',
    name: 'Canton Roast',
    url: 'https://www.cantonroast.com',
    displayUrl: 'cantonroast.com',
    industry: 'ARTISAN CULINARY & CATERING',
    category: 'culinary',
    tagline: 'Traditional Cantonese roast meats & high-velocity digital ordering.',
    headline: 'Frictionless 18-second mobile order-to-dispatch pipeline.',
    metrics: {
      label: 'Order Speed',
      value: '-62%',
      sub: 'Checkout time reduced to 18 seconds'
    },
    speed: '490ms TTFB',
    vitals: '98/100 Vitals',
    stack: ['Next.js 15', 'Edge Caching', 'Square API', 'Dynamic Menus', 'Tailwind'],
    image: '/screenshots/canton-roast.png',
    accentHex: '#FF7A45',
    summary: 'Instantaneous online ordering and catering portal with automated kitchen ticket dispatch, dynamic pickup timeslots, and frictionless Apple/Google Pay.',
    highlights: [
      'Real-time kitchen POS & thermal ticket synchronization',
      'Dynamic rush-hour pickup timeslot throttling',
      'One-tap zero-scroll checkout for return patrons'
    ],
    beforeProblems: [
      'Phone lines jammed during lunch and dinner rushes',
      'Third-party delivery apps taking 30% commissions on repeat customers',
      'Sluggish menu ordering experience on mobile devices'
    ],
    afterSolutions: [
      'Direct-to-kitchen ordering pipeline with zero commission fees',
      'Sub-500ms menu browsing with categorized instant filters',
      'Express Apple Pay and Google Pay integration cutting order time to 18s'
    ]
  },
  {
    id: 'the-lean-company',
    name: 'The Lean Company',
    url: 'https://www.theleancompany.ie',
    displayUrl: 'theleancompany.ie',
    industry: 'OPERATIONAL EXCELLENCE',
    category: 'consulting',
    tagline: 'European enterprise transformation, Lean manufacturing & leadership systems.',
    headline: 'Interactive Lean Maturity engine qualifying enterprise C-level prospects.',
    metrics: {
      label: 'Inquiry Velocity',
      value: '3.8x',
      sub: 'Enterprise consultation leads'
    },
    speed: '460ms TTFB',
    vitals: '100/100 Vitals',
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'HubSpot API', 'Vite'],
    image: '/screenshots/the-lean-company.png',
    accentHex: '#B7E84B',
    summary: 'Architected an authoritative European enterprise portal featuring an interactive Lean maturity self-audit engine that qualifies and routes enterprise C-level prospects.',
    highlights: [
      'Interactive 3-minute Lean Maturity audit scorecard',
      'Automated personalized executive PDF benchmark report',
      'Real-time CRM lead routing with qualified scoring'
    ],
    beforeProblems: [
      'Static brochure website failing to capture enterprise director interest',
      'Vague contact form with poor lead qualification data',
      'Slow mobile page performance diminishing corporate credibility'
    ],
    afterSolutions: [
      'Interactive self-assessment tool generating executive scorecards',
      'Automated CRM integration routing qualified leads directly to senior consultants',
      '100/100 Core Web Vitals score establishing immediate enterprise authority'
    ]
  },
  {
    id: 'diyative',
    name: 'Diyative',
    url: 'https://diyative.com/',
    displayUrl: 'diyative.com',
    industry: 'MAKER HARDWARE & CNC TOOLS',
    category: 'tools',
    tagline: 'Precision laser engravers, CNC cutters & creative craft machinery.',
    headline: 'High-conversion hardware showcase with interactive bundle builders.',
    metrics: {
      label: 'Cart Completion',
      value: '+82%',
      sub: 'Bundle attachment rate increased'
    },
    speed: '590ms TTFB',
    vitals: '99/100 Vitals',
    stack: ['Shopify Liquid 2.0', 'Hydrogen', 'Klaviyo', '3D Model Viewer', 'Tailwind'],
    image: '/screenshots/diyative.png',
    accentHex: '#4CC9F0',
    summary: 'Engineered a high-conversion hardware showcase with interactive machine comparison matrices, accessory cross-sell bundles, and community project showcases.',
    highlights: [
      'Side-by-side technical machine comparison tool',
      'Dynamic material compatibility & laser wattage guide',
      'Interactive accessory & spare part bundle builder'
    ],
    beforeProblems: [
      'Customers overwhelmed by technical laser specifications and wattage options',
      'Low attachment rate for essential ventilation and safety accessories',
      'High return rate due to mismatched material expectations'
    ],
    afterSolutions: [
      'Intuitive machine comparison matrix with visual material guide',
      'One-click bundle builder packaging safety gear and replacement lenses',
      '590ms load times across heavy 3D asset galleries'
    ]
  },
  {
    id: 'skin-by-brownlee',
    name: 'Skin By Brownlee & Co.',
    url: 'https://www.skinbybrownleeandco.com/',
    displayUrl: 'skinbybrownleeandco.com',
    industry: 'CLINICAL SKINCARE DTC',
    category: 'beauty',
    tagline: 'Aesthetician-formulated blemish prevention & targeted skin barrier health.',
    headline: 'Personalized 60-second skincare quiz driving recurring subscription ARR.',
    metrics: {
      label: 'Recurring ARR',
      value: '+94%',
      sub: 'Subscription retention lift'
    },
    speed: '510ms TTFB',
    vitals: '99/100 Vitals',
    stack: ['Shopify Plus', 'Recharge Subscriptions', 'Tailwind', 'Quiz Engine'],
    image: '/screenshots/skin-by-brownlee.png',
    accentHex: '#F78DA7',
    summary: 'Clinical beauty digital flagship with an intuitive 60-second skin consultation quiz, automated regimen subscription refills, and verified dermatologist social proof.',
    highlights: [
      'Dynamic 60-second skin diagnostic questionnaire',
      'Automated replenishment subscriptions via Recharge',
      'Interactive clinical before & after regimen slider'
    ],
    beforeProblems: [
      'First-time visitors uncertain which serum suited their skin barrier type',
      'High churn on single-purchase clinical acne treatments',
      'Sluggish mobile browsing with heavy uncompressed beauty imagery'
    ],
    afterSolutions: [
      'Interactive 60-second diagnostic quiz prescribing tailored 3-step routines',
      'Automated replenishment subscriptions driving predictable recurring ARR',
      '510ms TTFB with responsive modern image formats'
    ]
  },
  {
    id: 'goldandgrove',
    name: 'Gold & Grove',
    url: 'https://goldandgrove.com',
    displayUrl: 'goldandgrove.com',
    industry: 'SKIN NUTRITION & WELLNESS',
    category: 'beauty',
    tagline: 'Internal blemish blend & skin-clearing botanical vitamin supplements.',
    headline: 'Sub-600ms supplement subscription funnel with ingredient transparency.',
    metrics: {
      label: 'Subscription Retention',
      value: '+220%',
      sub: 'Increase in 90-day repeat subscription orders'
    },
    speed: '610ms TTFB',
    vitals: '99/100 Vitals',
    stack: ['Shopify Plus', 'Recharge Subscriptions', 'Tailwind CSS', 'Vite / Edge'],
    image: '/screenshots/new/goldandgrove.png',
    accentHex: '#D4A359',
    summary: 'Re-engineered high-converting supplement subscription funnel with ingredient grounding, responsive nutritional drawers, and sub-600ms mobile PDPs.',
    highlights: [
      'Interactive 3-step skin wellness quiz & supplement matcher',
      'One-tap recurring subscription delivery portal',
      'Dynamic clinical ingredient transparency cards'
    ],
    beforeProblems: [
      'Cluttered product pages confusing first-time buyers',
      'High bounce rate on mobile supplement ingredient lists',
      'Friction in subscription recurring billing setup'
    ],
    afterSolutions: [
      'Clean nutritional breakdown drawer with rapid tap interaction',
      '1-click express checkout via Apple Pay & Shop Pay',
      '610ms First Contentful Paint on mobile networks'
    ]
  },
  {
    id: 'premiumtrendsshop',
    name: 'Premium Trends Shop',
    url: 'https://premiumtrendsshop.store',
    displayUrl: 'premiumtrendsshop.store',
    industry: 'CURATED DTC & LIFESTYLE',
    category: 'ecommerce',
    tagline: 'High-velocity curated trending lifestyle products & consumer goods.',
    headline: 'Ultra-lean catalog with instant search and sticky thumb checkout.',
    metrics: {
      label: 'Mobile Checkout',
      value: '+195%',
      sub: 'Lift in mobile conversion completion rate'
    },
    speed: '520ms TTFB',
    vitals: '98/100 Vitals',
    stack: ['Modern React', 'Instant Search', 'Stripe Payments', 'Edge CDN'],
    image: '/screenshots/new/premiumtrendsshop.png',
    accentHex: '#B7E84B',
    summary: 'Engineered an ultra-lean dynamic catalog with instant search, sticky mobile quick-buy, and real-time social proof tags.',
    highlights: [
      'Sticky bottom thumb-friendly quick-add bar',
      'Live inventory scarcity & trending badges',
      'Flash sale bundle discounts engine'
    ],
    beforeProblems: [
      'Sluggish catalog load times exceeding 5.2 seconds',
      'Clunky multi-step mobile checkout causing drop-offs',
      'Missing currency and localized shipping estimations'
    ],
    afterSolutions: [
      'Instant client-side filter engine across trending SKUs',
      'Seamless 2-tap mobile checkout flow',
      'Optimized WebP image delivery reducing page weight by 75%'
    ]
  },
  {
    id: 'rosemira',
    name: 'Rosemira Organics',
    url: 'https://rosemira.com',
    displayUrl: 'rosemira.com',
    industry: 'ORGANIC BOTANICAL SKINCARE',
    category: 'beauty',
    tagline: 'Certified organic, medical-grade artisan skin serums & elixirs.',
    headline: 'Sensory beauty boutique with botanical regimen advisor.',
    metrics: {
      label: 'Average Order Value',
      value: '+74%',
      sub: 'Routine bundle kit attachment increased'
    },
    speed: '530ms TTFB',
    vitals: '100/100 Vitals',
    stack: ['Shopify Plus', 'Hydrogen', 'Tailwind', 'Klaviyo'],
    image: '/screenshots/new/rosemira.png',
    accentHex: '#D48C70',
    summary: 'Handcrafted apothecary digital storefront with dynamic regimen routines, ingredient harvest certifications, and sensory texture photography.',
    highlights: [
      'Interactive 4-step botanical skin regimen builder',
      'Dynamic ingredient origin map & harvest certificates',
      'Custom luxury gift packaging checkout module'
    ],
    beforeProblems: [
      'Legacy theme failed to showcase artisan medical certifications',
      'Low attachment rate for complementary day/night serums',
      'Slow mobile page speeds causing bounce on mobile ad traffic'
    ],
    afterSolutions: [
      'Tactile routine bundle builder boosting AOV by 74%',
      'Direct-to-cart express checkout for serum refills',
      '100/100 Core Web Vitals score across all product pages'
    ]
  },
  {
    id: 'coalitionla',
    name: 'Coalition LA',
    url: 'https://coalitionla.com',
    displayUrl: 'coalitionla.com',
    industry: 'CRUELTY-FREE VEGAN OUTERWEAR',
    category: 'heritage',
    tagline: 'High-fashion cruelty-free vegan leather, faux fur & shearling jackets.',
    headline: 'High-fashion runway lookbook with dual retail & wholesale portal.',
    metrics: {
      label: 'Wholesale & DTC',
      value: '3.4x',
      sub: 'Boutique wholesale order volume increase'
    },
    speed: '500ms TTFB',
    vitals: '98/100 Vitals',
    stack: ['Hydrogen Storefront', 'B2B Wholesale Portal', 'Tailwind', 'Motion'],
    image: '/screenshots/new/coalitionla.png',
    accentHex: '#9A8C98',
    summary: 'Designed a high-fashion runway lookbook with instant size recommendation, tactile texture zoom, and integrated boutique wholesale buyer portal.',
    highlights: [
      'Tactile fabric drape & vegan texture micro-zoom up to 300%',
      'Interactive runway lookbook with 1-tap "Shop the Look"',
      'Dual portal handling retail DTC and boutique wholesale orders'
    ],
    beforeProblems: [
      'Flat photography failed to convey the premium feel of vegan leather',
      'Separate clunky website needed for wholesale boutique buyers',
      'Severe mobile layout shift and sluggish lookbook loading'
    ],
    afterSolutions: [
      'High-definition texture previews with zero layout shifts',
      'Unified buyer account system switching between DTC and Wholesale tiers',
      'Ultra-fluid 60fps mobile gestures for lookbook exploration'
    ]
  }
];

export const WorkPage: React.FC<WorkPageProps> = ({ onHireClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSite, setSelectedSite] = useState<ClientSite | null>(null);
  const [isAutoMoving, setIsAutoMoving] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [scrollSpeed, setScrollSpeed] = useState<number>(0.9); // pixels per frame

  const carouselTrackRef = React.useRef<HTMLDivElement | null>(null);
  const animationFrameId = React.useRef<number | null>(null);

  const { activeContent } = useCMS();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ecommerce', label: 'E-Commerce DTC' },
    { id: 'beauty', label: 'Clinical Beauty' },
    { id: 'culinary', label: 'Culinary & Dining' },
    { id: 'heritage', label: 'Luxury & Bespoke' },
    { id: 'consulting', label: 'Enterprise & Advisory' },
    { id: 'tools', label: 'Hardware & Tools' },
  ];

  const filteredSites = CLIENT_SITES.filter((site) => {
    if (selectedCategory === 'all') return true;
    return site.category === selectedCategory;
  });

  // Calculate repeated items for seamless infinite auto-moving carousel
  const repeatCount = Math.max(3, Math.ceil(9 / Math.max(1, filteredSites.length)));
  const carouselItems = React.useMemo(() => {
    return Array.from({ length: repeatCount }, () => filteredSites).flat();
  }, [filteredSites, repeatCount]);

  // Smooth continuous auto-moving loop using requestAnimationFrame
  React.useEffect(() => {
    if (viewMode !== 'carousel') return;

    const track = carouselTrackRef.current;
    if (!track) return;

    const animate = () => {
      if (track && isAutoMoving && !isHovered) {
        track.scrollLeft += scrollSpeed;

        // Wrap around seamlessly when reaching 1 full repeated segment
        const singleSetWidth = track.scrollWidth / repeatCount;
        if (singleSetWidth > 0 && track.scrollLeft >= singleSetWidth * 2) {
          track.scrollLeft -= singleSetWidth;
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isAutoMoving, isHovered, viewMode, scrollSpeed, repeatCount]);

  // Manual scroll step buttons (Left / Right)
  const handleScrollStep = (direction: 'left' | 'right') => {
    const track = carouselTrackRef.current;
    if (!track) return;
    const cardStep = 410; // Card width + gap
    track.scrollBy({
      left: direction === 'left' ? -cardStep : cardStep,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full">
      {/* Clean & Neat Page Hero Header */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-14 pb-8"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              SELECTED WORK &amp; CASE STUDIES
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1E3A2B]">
            REAL CLIENT REBUILDS. PROVEN METRICS.
          </h1>

          <p className="mt-4 text-[#4A584E] text-base sm:text-lg leading-relaxed">
            Every storefront we engineer is designed for sub-second speed, intuitive mobile ergonomics, and verified conversion lift.
          </p>

          {/* Clean Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1E3A2B] text-white shadow-sm'
                      : 'bg-white text-[#4A584E] border border-[#1E3A2B]/10 hover:border-[#1E3A2B]/30 hover:text-[#1E3A2B]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Carousel Control Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pb-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#1E3A2B]/10 shadow-xs">
          {/* Left: Project Count & Active Category Badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3E8] text-[#1E3A2B] text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#2D5A40]" />
              <span>{filteredSites.length} SHOWCASE PROJECTS</span>
            </span>
            <span className="hidden sm:inline-block text-xs text-[#4A584E] font-medium">
              Hover over any card to inspect details
            </span>
          </div>

          {/* Right: Carousel Controls (Auto-Moving Toggle, Navigation, View Mode) */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle: Auto Carousel vs Grid */}
            <div className="hidden sm:flex items-center bg-[#F1F6F0] p-1 rounded-xl border border-[#1E3A2B]/10">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-[#1E3A2B] text-white shadow-xs'
                    : 'text-[#4A584E] hover:text-[#1E3A2B]'
                }`}
                title="View as continuous auto-moving carousel"
              >
                Auto Carousel
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#1E3A2B] text-white shadow-xs'
                    : 'text-[#4A584E] hover:text-[#1E3A2B]'
                }`}
                title="View as neat catalog grid"
              >
                Grid View
              </button>
            </div>

            {viewMode === 'carousel' && (
              <>
                {/* Auto-moving Toggle Button */}
                <button
                  onClick={() => setIsAutoMoving(!isAutoMoving)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    isAutoMoving
                      ? 'bg-[#EAF3E8] border-[#B7E84B] text-[#1E3A2B]'
                      : 'bg-white border-[#1E3A2B]/15 text-[#4A584E] hover:text-[#1E3A2B]'
                  }`}
                  title={isAutoMoving ? 'Pause auto-moving carousel' : 'Start auto-moving carousel'}
                  aria-label={isAutoMoving ? 'Pause auto-moving carousel' : 'Start auto-moving carousel'}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAutoMoving ? 'bg-[#2D5A40] animate-pulse' : 'bg-gray-400'
                    }`}
                  />
                  <span>{isAutoMoving ? 'Auto-Moving' : 'Paused'}</span>
                </button>

                {/* Speed Toggle (Normal / Fast) */}
                <button
                  onClick={() => setScrollSpeed(scrollSpeed === 0.9 ? 1.6 : 0.9)}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-white border border-[#1E3A2B]/12 text-[#1E3A2B] hover:border-[#B7E84B] transition-all cursor-pointer"
                  title="Toggle carousel gliding speed"
                >
                  {scrollSpeed === 0.9 ? '1x Speed' : '1.8x Fast'}
                </button>

                {/* Manual Directional Step Arrows */}
                <div className="flex items-center gap-1 pl-1">
                  <button
                    onClick={() => handleScrollStep('left')}
                    className="w-8 h-8 rounded-xl bg-white border border-[#1E3A2B]/12 flex items-center justify-center text-[#1E3A2B] hover:border-[#B7E84B] hover:bg-[#EAF3E8] transition-all cursor-pointer shadow-xs"
                    aria-label="Scroll carousel backward"
                    title="Previous project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleScrollStep('right')}
                    className="w-8 h-8 rounded-xl bg-white border border-[#1E3A2B]/12 flex items-center justify-center text-[#1E3A2B] hover:border-[#B7E84B] hover:bg-[#EAF3E8] transition-all cursor-pointer shadow-xs"
                    aria-label="Scroll carousel forward"
                    title="Next project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.section>

      {/* Auto-Moving Carousel Section */}
      {viewMode === 'carousel' ? (
        <motion.section 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full relative py-6 overflow-hidden"
        >
          {/* Subtle Side Vignettes for smooth edge fade */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#F8FAF8] via-[#F8FAF8]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#F8FAF8] via-[#F8FAF8]/80 to-transparent z-20 pointer-events-none" />

          {/* Smooth Continuous Scroll Container */}
          <div
            ref={carouselTrackRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-12 py-4 cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {carouselItems.map((site, index) => (
              <div
                key={`${site.id}-${index}`}
                className="w-[320px] sm:w-[380px] lg:w-[400px] shrink-0 bg-white rounded-3xl border border-[#1E3A2B]/10 overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#B7E84B] transition-all duration-300 flex flex-col justify-between group select-none"
              >
                <div>
                  {/* Browser Chrome Header */}
                  <div className="h-9 bg-[#F1F6F0] border-b border-[#1E3A2B]/10 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-[#1E3A2B]/10 text-[10.5px] font-mono text-[#1E3A2B] font-semibold truncate max-w-[190px]">
                      <Globe2 className="w-3 h-3 text-[#2D5A40] shrink-0" />
                      <span className="truncate">{site.displayUrl}</span>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#2D5A40]">
                      {site.speed}
                    </span>
                  </div>

                  {/* Visual Snapshot Preview */}
                  <div
                    onClick={() => setSelectedSite(site)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E3A2B]/5 border-b border-[#1E3A2B]/8 cursor-pointer"
                  >
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                      <span className="px-4 py-2 rounded-full bg-white text-[#1E3A2B] text-xs font-bold uppercase tracking-wider shadow-lg inline-flex items-center gap-1.5">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#2D5A40]" />
                      </span>
                    </div>

                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 text-[9.5px] font-bold uppercase tracking-wider text-[#1E3A2B] shadow-xs">
                        {site.industry}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1E3A2B] text-[#B7E84B] text-[9.5px] font-mono font-bold shadow-xs">
                        {site.metrics.value} {site.metrics.label}
                      </span>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1E3A2B]">
                      {site.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2D5A40] mt-0.5">
                      {site.tagline}
                    </p>
                    <p className="text-sm text-[#4A584E] mt-3 leading-relaxed line-clamp-2 font-medium">
                      {site.summary}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {site.stack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#F1F6F0] text-[#1E3A2B] text-[10.5px] font-medium border border-[#1E3A2B]/8"
                        >
                          {tech}
                        </span>
                      ))}
                      {site.stack.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-[#F1F6F0] text-[#4A584E] text-[10.5px] font-bold">
                          +{site.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-3 border-t border-[#1E3A2B]/6">
                  <button
                    onClick={() => setSelectedSite(site)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0F241A] transition-all cursor-pointer text-center"
                  >
                    Case Study
                  </button>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-[#1E3A2B]/15 text-[#1E3A2B] hover:bg-[#EAF3E8] hover:border-[#2D5A40] transition-all cursor-pointer"
                    title={`Open live site: ${site.name}`}
                    aria-label={`Open live site: ${site.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      ) : (
        /* Clean & Neat Card Grid Option */
        <motion.section 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-3xl border border-[#1E3A2B]/10 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#B7E84B] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Browser Chrome Header */}
                  <div className="h-9 bg-[#F1F6F0] border-b border-[#1E3A2B]/10 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-[#1E3A2B]/10 text-[10.5px] font-mono text-[#1E3A2B] font-semibold truncate max-w-[200px]">
                      <Globe2 className="w-3 h-3 text-[#2D5A40] shrink-0" />
                      <span className="truncate">{site.displayUrl}</span>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#2D5A40]">
                      {site.speed}
                    </span>
                  </div>

                  {/* Visual Snapshot Preview */}
                  <div
                    onClick={() => setSelectedSite(site)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E3A2B]/5 border-b border-[#1E3A2B]/8 cursor-pointer"
                  >
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                      <span className="px-4 py-2 rounded-full bg-white text-[#1E3A2B] text-xs font-bold uppercase tracking-wider shadow-lg inline-flex items-center gap-1.5">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#2D5A40]" />
                      </span>
                    </div>

                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 text-[9.5px] font-bold uppercase tracking-wider text-[#1E3A2B] shadow-xs">
                        {site.industry}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#1E3A2B] text-[#B7E84B] text-[9.5px] font-mono font-bold shadow-xs">
                        {site.metrics.value} {site.metrics.label}
                      </span>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1E3A2B]">
                      {site.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#2D5A40] mt-0.5">
                      {site.tagline}
                    </p>
                    <p className="text-sm text-[#4A584E] mt-3 leading-relaxed line-clamp-3 font-medium">
                      {site.summary}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {site.stack.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#F1F6F0] text-[#1E3A2B] text-[10.5px] font-medium border border-[#1E3A2B]/8"
                        >
                          {tech}
                        </span>
                      ))}
                      {site.stack.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-[#F1F6F0] text-[#4A584E] text-[10.5px] font-bold">
                          +{site.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-3 border-t border-[#1E3A2B]/6">
                  <button
                    onClick={() => setSelectedSite(site)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0F241A] transition-all cursor-pointer text-center"
                  >
                    Case Study
                  </button>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-[#1E3A2B]/15 text-[#1E3A2B] hover:bg-[#EAF3E8] hover:border-[#2D5A40] transition-all cursor-pointer"
                    title={`Open live site: ${site.name}`}
                    aria-label={`Open live site: ${site.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Dynamic Sections configured for Work Page in CMS */}
      <DynamicSectionRenderer page="work" onHireClick={onHireClick} />

      {/* Clean Detail Modal when a Case Study is clicked */}
      {selectedSite && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
          onClick={() => setSelectedSite(null)}
        >
          <div
            className="relative w-full max-w-3xl my-8 bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#1E3A2B]/15 text-[#1E3A2B] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSite(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F1F6F0] text-[#1E3A2B] hover:bg-[#1E3A2B] hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B7E84B] text-[#0F241A]">
                  {selectedSite.industry}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#EAF3E8] text-[#1E3A2B]">
                  {selectedSite.speed}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#1E3A2B] text-white">
                  {selectedSite.vitals}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1E3A2B]">
                {selectedSite.name}
              </h2>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2D5A40] mt-1">
                {selectedSite.headline}
              </p>
            </div>

            {/* Modal Image Preview */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-[#1E3A2B]/10 shadow-sm aspect-[16/9]">
              <img
                src={selectedSite.image}
                alt={selectedSite.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Core Impact Metric */}
            <div className="mt-6 p-4 rounded-2xl bg-[#EAF3E8] border border-[#B7E84B]/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A584E]">
                  Verified Rebuild Impact
                </span>
                <p className="text-sm font-bold text-[#1E3A2B]">
                  {selectedSite.metrics.sub}
                </p>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-[#1E3A2B]">
                {selectedSite.metrics.value}
              </span>
            </div>

            {/* Narrative & Key Highlights */}
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#1E3A2B]">
                Project Overview &amp; Architecture
              </h3>
              <p className="text-sm text-[#4A584E] leading-relaxed">
                {selectedSite.summary}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A2B] pt-2">
                Delivered Engineering Features
              </h4>
              <ul className="space-y-2">
                {selectedSite.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#2D3A31]">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A40] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problems Solved */}
            {selectedSite.beforeProblems && selectedSite.afterSolutions && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1E3A2B]/10">
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                  <h4 className="text-xs font-bold uppercase text-red-900 mb-2">Legacy Problems</h4>
                  <ul className="space-y-1.5 text-xs text-red-800">
                    {selectedSite.beforeProblems.map((prob, idx) => (
                      <li key={idx}>• {prob}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="text-xs font-bold uppercase text-emerald-900 mb-2">Rebuild Solutions</h4>
                  <ul className="space-y-1.5 text-xs text-emerald-800">
                    {selectedSite.afterSolutions.map((sol, idx) => (
                      <li key={idx}>• {sol}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mt-6 pt-4 border-t border-[#1E3A2B]/10">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-2">
                Technology Stack:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedSite.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#F1F6F0] text-xs font-semibold text-[#1E3A2B] border border-[#1E3A2B]/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-[#1E3A2B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={selectedSite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0F241A] transition-all cursor-pointer"
              >
                <span>VISIT LIVE STOREFRONT</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B7E84B]" />
              </a>

              <button
                onClick={() => {
                  setSelectedSite(null);
                  if (onHireClick) onHireClick();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#B7E84B] text-[#0F241A] text-xs font-black uppercase tracking-wider hover:bg-[#a5d83a] transition-all cursor-pointer"
              >
                REBUILD MY STORE LIKE THIS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
