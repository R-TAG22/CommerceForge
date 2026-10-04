import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Share2, 
  Check, 
  Filter, 
  TrendingUp,
  Mail,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePublicTheme } from '../context/PublicThemeContext';

interface BlogPageProps {
  onHireClick?: () => void;
}

export interface BlogPostItem {
  id: string;
  category: string;
  categorySlug: 'all' | 'performance' | 'cro' | 'architecture' | 'case-studies';
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  metrics: { label: string; value: string }[];
  content: {
    intro: string;
    subheadings: {
      heading: string;
      body: string;
      bulletPoints?: string[];
    }[];
    conclusion: string;
  };
}

export const BLOG_POSTS_DATA: BlogPostItem[] = [
  {
    id: 'handcrafted-vs-builders',
    category: 'Speed & Performance',
    categorySlug: 'performance',
    readTime: '5 MIN READ',
    date: 'OCTOBER 2026',
    title: 'Why Handcrafted Code Beats Drag-and-Drop Builders for Store Conversions',
    excerpt: 'How stripping away 42 redundant WordPress/Shopify app scripts and migrating to clean custom code transformed a slow 4.2s mobile storefront into a 620ms instant sales engine.',
    image: `${import.meta.env.BASE_URL}screenshots/the-lean-company.png`,
    featured: true,
    author: {
      name: 'Russell T.',
      role: 'Founder & Lead Developer',
      avatar: `${import.meta.env.BASE_URL}images/team/RUSSELL T..jpg`,
    },
    metrics: [
      { label: 'Mobile LCP', value: '0.62s' },
      { label: 'Bounce Reduction', value: '-28%' },
      { label: 'Mobile Conversion', value: '+34%' },
    ],
    content: {
      intro: 'In modern e-commerce, the single biggest leak in any sales funnel is not ad copy or product photography—it is mobile latency. Every additional second a customer waits for a product page to render costs an estimated 7% to 12% in checkout completions.',
      subheadings: [
        {
          heading: '1. The Hidden Tax of Page Builders',
          body: 'Visual drag-and-drop builders generate nested div wrappers, redundant inline CSS styles, and uncompressed vendor bundles. While convenient for rapid wireframing, they force mobile processors to parse tens of thousands of lines of unused JavaScript before displaying the first product hero image.',
          bulletPoints: [
            'Excessive DOM depth exceeding 3,000 nodes creates severe layout thrashing.',
            'Script injection from multiple third-party apps blocks the primary browser thread.',
            'Cumulative Layout Shift (CLS) causes buttons to jump while customers attempt to tap Add to Cart.',
          ],
        },
        {
          heading: '2. The Handcrafted Engineering Approach',
          body: 'By rebuilding critical storefront pages with tailored React, TypeScript, and atomic CSS, we eliminate 85% of redundant HTTP requests. Images are pre-cached and served in next-gen WebP/AVIF formats with exact dimensional bounding boxes.',
          bulletPoints: [
            'Zero bloated plugins or unnecessary dependencies.',
            'Predictable typography cascades and native browser animations.',
            'Sub-600ms Time to First Byte (TTFB) and sub-second Largest Contentful Paint (LCP).',
          ],
        },
        {
          heading: '3. Measurable Financial Impact',
          body: 'When page loads become instantaneous, shopper friction drops to near zero. Shoppers view 2.4x more catalog items per session, bounce rates drop by 28%, and checkout completion rates increase by up to 34% within the first 30 days of launch.',
        },
      ],
      conclusion: 'Your website is your 24/7 digital flagship store. Investing in clean, handcrafted code ensures your brand delivers the uncompromising speed and premium experience your customers expect.',
    },
  },
  {
    id: 'the-700ms-rule',
    category: 'Conversion Rate Optimization',
    categorySlug: 'cro',
    readTime: '4 MIN READ',
    date: 'SEPTEMBER 2026',
    title: 'The 700ms Rule: How Milliseconds Multiply Real Checkout Revenue',
    excerpt: 'Discover why top direct-to-consumer brands benchmark page load times under 700 milliseconds, and how speed directly lowers customer acquisition costs (CAC).',
    image: `${import.meta.env.BASE_URL}screenshots/diyative.png`,
    author: {
      name: 'Russell T.',
      role: 'Founder & Lead Developer',
      avatar: `${import.meta.env.BASE_URL}images/team/RUSSELL T..jpg`,
    },
    metrics: [
      { label: 'Page Load Target', value: '< 700ms' },
      { label: 'CAC Efficiency', value: '+19%' },
      { label: 'Session Depth', value: '+2.4x' },
    ],
    content: {
      intro: 'Shopper patience on mobile devices has reached an all-time low. If a product gallery or checkout button takes longer than 1.5 seconds to respond to a finger tap, more than half of paid ad traffic bounces permanently.',
      subheadings: [
        {
          heading: '1. The Human Perception of Instantaneous Speed',
          body: 'Cognitive research indicates that actions occurring within 100ms feel immediate to the human brain. Delays between 100ms and 700ms feel responsive, while delays exceeding 1 second trigger conscious frustration and doubt in brand credibility.',
        },
        {
          heading: '2. Lowering Ad Spend Waste',
          body: 'If you spend $3,000 monthly on Meta or Google Ads with a 4-second loading store, approximately $1,200 of that ad budget is lost to bounces before visitors even see your product headline. Speed optimization is the highest-ROI marketing upgrade available.',
        },
      ],
      conclusion: 'Every millisecond saved is pure revenue gained. When your store operates at instant speed, you unlock maximum return on your paid advertising.',
    },
  },
  {
    id: 'zero-bloat-tech-stack',
    category: 'Headless Architecture',
    categorySlug: 'architecture',
    readTime: '6 MIN READ',
    date: 'AUGUST 2026',
    title: 'Zero-Bloat Modern Web Architecture for High-Growth Local Brands',
    excerpt: 'A practical guide for business owners: choosing the right tech stack between Shopify, custom React, and headless architectures without getting locked into exorbitant fees.',
    image: `${import.meta.env.BASE_URL}screenshots/skin-by-brownlee.png`,
    author: {
      name: 'Russell T.',
      role: 'Founder & Lead Developer',
      avatar: `${import.meta.env.BASE_URL}images/team/RUSSELL T..jpg`,
    },
    metrics: [
      { label: 'Bundle Size', value: '< 65kb' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Ownership', value: '100%' },
    ],
    content: {
      intro: 'Too many founders get talked into complex enterprise monoliths or fragile plugin mazes. Here is the modern stack that delivers maximum velocity, stability, and zero maintenance headaches.',
      subheadings: [
        {
          heading: '1. The Modern React & Tailwind Advantage',
          body: 'Modern static and edge-rendered architectures compile completely ahead of time. There are no databases to crash under flash sale traffic spikes and no PHP servers that require weekly security patches.',
        },
        {
          heading: '2. Complete Freedom of Code Ownership',
          body: 'When your codebase is clean, well-commented TypeScript and standard CSS, any competent developer in the world can maintain or extend it without being handcuffed to proprietary agency software.',
        },
      ],
      conclusion: 'Build on open, standards-based web technologies. Your brand retains 100% intellectual property ownership from day one.',
    },
  },
  {
    id: 'mobile-checkout-ergonomics',
    category: 'Conversion Rate Optimization',
    categorySlug: 'cro',
    readTime: '5 MIN READ',
    date: 'JULY 2026',
    title: 'Mobile Checkout Ergonomics: The Anatomy of a High-Converting Cart Drawer',
    excerpt: 'Thumb-zone reachability, sticky single-tap checkout triggers, and eliminating friction points that cause over 70% of mobile shoppers to abandon carts.',
    image: `${import.meta.env.BASE_URL}screenshots/willow-bath.png`,
    author: {
      name: 'Ryan B.',
      role: 'Co-Founder & UX Developer',
      avatar: `${import.meta.env.BASE_URL}images/team/RYAN B.jpg`,
    },
    metrics: [
      { label: 'Cart Completion', value: '+22%' },
      { label: 'Tap Latency', value: '350ms' },
      { label: 'Touch Accuracy', value: '99.4%' },
    ],
    content: {
      intro: 'Over 80% of direct-to-consumer traffic arrives on mobile smartphones. Yet the majority of e-commerce checkout drawers are designed on widescreen desktop monitors, resulting in microscopic tap targets and clunky scrolling.',
      subheadings: [
        {
          heading: '1. Designing for the Natural Thumb Zone',
          body: 'The primary checkout call-to-action button must always be anchored within the bottom 30% of the mobile viewport. Top-right buttons require two hands or an awkward thumb stretch, directly increasing cart abandonment.',
        },
        {
          heading: '2. Transparent Pricing Without Surprises',
          body: 'Always display estimated shipping rates, sales tax previews, and free shipping progress meters directly inside the cart drawer before the customer enters checkout.',
        },
      ],
      conclusion: 'Remove every millisecond of hesitation from your cart experience. An ergonomic drawer turns casual browsers into buyers.',
    },
  },
  {
    id: 'core-web-vitals-inp',
    category: 'Speed & Performance',
    categorySlug: 'performance',
    readTime: '7 MIN READ',
    date: 'JUNE 2026',
    title: 'Core Web Vitals 2026: Demystifying INP (Interaction to Next Paint)',
    excerpt: 'How Google’s new responsiveness metric directly influences search rankings and paid ad quality scores, and how to debug primary thread bottlenecks.',
    image: `${import.meta.env.BASE_URL}screenshots/canton-roast.png`,
    author: {
      name: 'Russell T.',
      role: 'Founder & Lead Developer',
      avatar: `${import.meta.env.BASE_URL}images/team/RUSSELL T..jpg`,
    },
    metrics: [
      { label: 'Target INP', value: '< 50ms' },
      { label: 'CLS Score', value: '0.01' },
      { label: 'CWV Pass Rate', value: '100%' },
    ],
    content: {
      intro: 'First Input Delay (FID) is officially retired. Google now measures Interaction to Next Paint (INP) across every single click, keypress, and tap throughout the entire shopper journey.',
      subheadings: [
        {
          heading: '1. What Triggers Bad INP in E-Commerce',
          body: 'Heavy third-party analytics pixels, live chat widgets, and bloated product review scripts monopolize the browser main thread. When a customer taps variant options or accordion tabs, the browser freezes while finishing long tasks.',
        },
        {
          heading: '2. Tactical Fixes for Green INP Scores',
          body: 'Offload heavy tracking scripts to web workers using Partytown or Google Tag Manager server-side containers. Debounce input handlers and leverage React 19 transition primitives.',
        },
      ],
      conclusion: 'A green Core Web Vitals score is no longer optional—it is a mandatory baseline for e-commerce search visibility and paid ad efficiency.',
    },
  },
  {
    id: 'woocommerce-to-react-migration',
    category: 'Case Studies',
    categorySlug: 'case-studies',
    readTime: '6 MIN READ',
    date: 'MAY 2026',
    title: 'From Crashing Monolith to Edge React: A Real Store Rebuild Teardown',
    excerpt: 'A complete behind-the-scenes teardown of replacing a crashing 65-plugin store installation with a blazing static React frontend backed by headless Shopify.',
    image: `${import.meta.env.BASE_URL}screenshots/the-lean-company-1.png`,
    author: {
      name: 'Jamez M.',
      role: 'Co-Founder & Infrastructure',
      avatar: `${import.meta.env.BASE_URL}images/team/JAMEZ M.jpg`,
    },
    metrics: [
      { label: 'Page Speed', value: '8.4s → 0.5s' },
      { label: 'Organic Traffic', value: '+41%' },
      { label: 'Hosting Savings', value: '$240/mo' },
    ],
    content: {
      intro: 'A prominent local lifestyle merchant was suffering repeated site crashes during high-volume holiday sales. Their legacy architecture was weighed down by 65 disparate plugins, each injecting unminified CSS and JavaScript.',
      subheadings: [
        {
          heading: '1. The Audit & Triage Phase',
          body: 'Our discovery audit revealed that 34 of the 65 installed plugins were redundant or completely inactive. Database queries during checkout were taking up to 4.8 seconds to resolve.',
        },
        {
          heading: '2. The 10-Day Rebuild Blueprint',
          body: 'We decoupled the frontend presentation layer into modern static React components hosted on global edge CDN networks. Order processing and inventory management remained safely connected through clean headless webhooks.',
        },
        {
          heading: '3. The Post-Launch Transformation',
          body: 'Server crash incidents dropped to exactly zero. Customer conversion jumped by 38% in the first week, and monthly server hosting costs fell from $280 to under $40.',
        },
      ],
      conclusion: 'Legacy technical debt is expensive. A clean modern storefront pays for itself in avoided downtime and recovered sales.',
    },
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Articles' },
  { id: 'performance', label: 'Speed & Performance' },
  { id: 'cro', label: 'Conversion Optimization' },
  { id: 'architecture', label: 'Headless Architecture' },
  { id: 'case-studies', label: 'Case Studies' },
];

export const BlogPage: React.FC<BlogPageProps> = ({ onHireClick }) => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<BlogPostItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Filtered Articles based on search & category
  const filteredArticles = useMemo(() => {
    return BLOG_POSTS_DATA.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.categorySlug === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        post.title.toLowerCase().includes(q) || 
        post.excerpt.toLowerCase().includes(q) || 
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured flagship article (if matching category/search, or default first)
  const featuredArticle = useMemo(() => {
    return filteredArticles.find((p) => p.featured) || filteredArticles[0] || BLOG_POSTS_DATA[0];
  }, [filteredArticles]);

  // Secondary grid articles (excluding the featured one if showing all)
  const gridArticles = useMemo(() => {
    if (searchQuery.trim()) {
      return filteredArticles;
    }
    return filteredArticles.filter((p) => p.id !== featuredArticle?.id);
  }, [filteredArticles, featuredArticle, searchQuery]);

  const handleCopyShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAF8] text-[#064E3B] transition-colors duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: BRAND JOURNAL HEADER                                     */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-10 sm:pt-16 pb-12 sm:pb-16 border-b border-[#064E3B]/10 overflow-hidden">
        {/* Ambient radial blur background */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#B7E84B]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#064E3B]/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#064E3B]/15 shadow-xs mb-4 select-none">
              <span className="w-2 h-2 rounded-full bg-[#B7E84B] shadow-[0_0_8px_#B7E84B]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#064E3B]">
                COMMERCEFORGE ENGINEERING JOURNAL
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] uppercase leading-tight text-[#064E3B]">
              Tactical Insights & <span className="text-[#047857]">Storefront Case Studies</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-[#064E3B]/80 max-w-2xl mx-auto leading-relaxed">
              Deep dives into sub-second page speed engineering, mobile conversion rate optimization, clean React architectures, and real store turnarounds.
            </p>

            {/* Quick Search & Filter Inputs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#064E3B]/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles (e.g. speed, conversion, INP)..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#064E3B]/20 rounded-full text-xs sm:text-sm font-medium text-[#064E3B] placeholder-[#064E3B]/40 focus:outline-none focus:ring-2 focus:ring-[#B7E84B] shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#064E3B]/50 hover:text-[#064E3B]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (Functional Buttons) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 select-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#064E3B] text-white shadow-sm'
                        : 'bg-white hover:bg-[#F3F7F3] text-[#064E3B]/80 border border-[#064E3B]/15 hover:border-[#064E3B]/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT: FEATURED ARTICLE & GRID                                  */}
      {/* ========================================================================= */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12 sm:py-16">
        
        {/* If no articles match the search */}
        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#064E3B]/5 border border-[#064E3B]/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#064E3B]/60" />
            </div>
            <h3 className="text-xl font-black uppercase text-[#064E3B]">No Articles Found</h3>
            <p className="mt-2 text-sm text-[#064E3B]/70 font-medium">
              We couldn’t find any articles matching "{searchQuery}". Try searching for terms like "speed", "conversion", or "React".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#047857] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* FEATURED FLAGSHIP ARTICLE (Shown when not filtering with specific text) */}
            {!searchQuery && featuredArticle && (
              <div className="mb-14 sm:mb-18">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Sparkles className="w-4 h-4 text-[#064E3B]" />
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#064E3B]">
                    Flagship Article
                  </span>
                </div>

                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 rounded-3xl border border-[#064E3B]/15 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Left: Big Media Frame */}
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-black/5">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                    
                    {/* Unboxed Metadata Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-white">
                      <div className="px-3 py-1 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/20 text-[#B7E84B]">
                        {featuredArticle.category}
                      </div>
                      <div className="px-3 py-1 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/20">
                        {featuredArticle.readTime}
                      </div>
                    </div>
                  </div>

                  {/* Right: Article Details */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#064E3B]/60 mb-2">
                        {featuredArticle.date}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-[#064E3B] group-hover:text-[#047857] transition-colors">
                        {featuredArticle.title}
                      </h2>

                      <p className="mt-4 text-xs sm:text-sm text-[#064E3B]/80 leading-relaxed font-medium">
                        {featuredArticle.excerpt}
                      </p>

                      {/* Performance Metric Highlights */}
                      <div className="mt-6 pt-5 border-t border-[#064E3B]/10 grid grid-cols-3 gap-2">
                        {featuredArticle.metrics.map((m, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-lg sm:text-xl font-black text-[#064E3B]">
                              {m.value}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#064E3B]/65">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Author & Read Action */}
                    <div className="mt-8 pt-5 border-t border-[#064E3B]/10 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#064E3B]/20"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#064E3B]">{featuredArticle.author.name}</span>
                          <span className="text-[10px] font-semibold text-[#064E3B]/60">{featuredArticle.author.role}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setReadingArticle(featuredArticle)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#064E3B] text-white hover:bg-[#047857] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* GRID OF ARTICLES */}
            <div>
              <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#064E3B]" />
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#064E3B]">
                    {searchQuery ? `Search Results (${filteredArticles.length})` : 'All Articles & Case Studies'}
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#064E3B]/60">
                  {gridArticles.length} Published Pieces
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridArticles.map((article, idx) => (
                  <motion.article
                    key={article.id}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="group flex flex-col justify-between rounded-3xl border border-[#064E3B]/15 bg-white shadow-xs hover:shadow-lg hover:border-[#064E3B]/40 transition-all duration-300 overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/5 select-none">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`;
                          }}
                        />

                        {/* Unboxed Metadata Tag on image */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-white">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/20 text-[#B7E84B]">
                            {article.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-[#0B0F17]/85 backdrop-blur-md border border-white/20">
                            {article.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#064E3B]/60 mb-2">
                          {article.date}
                        </div>

                        <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug text-[#064E3B] group-hover:text-[#047857] transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="mt-2.5 text-xs text-[#064E3B]/75 leading-relaxed line-clamp-3 font-medium">
                          {article.excerpt}
                        </p>

                        {/* Metric Bar */}
                        <div className="mt-4 pt-3 border-t border-[#064E3B]/10 grid grid-cols-3 gap-1">
                          {article.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="flex flex-col">
                              <span className="text-xs sm:text-sm font-black text-[#064E3B]">
                                {m.value}
                              </span>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#064E3B]/60 truncate">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-6 pt-0 flex items-center justify-between border-t border-[#064E3B]/10 mt-2">
                      <div className="flex items-center gap-2 pt-3">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#064E3B]/20"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className="text-[11px] font-bold text-[#064E3B]">{article.author.name}</span>
                      </div>

                      <button
                        onClick={() => setReadingArticle(article)}
                        className="pt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#064E3B] group-hover:text-[#047857] hover:underline cursor-pointer"
                      >
                        <span>Read</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* 3. NEWSLETTER / DISPATCH SUBSCRIPTION BANNER                              */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#064E3B] to-[#047857] text-white shadow-xl">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
              <Mail className="w-3.5 h-3.5 text-[#B7E84B]" />
              <span>THE PERFORMANCE DISPATCH</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Get Storefront Speed & CRO Breakdowns Bi-Weekly
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
              Actionable engineering teardowns, sub-second code benchmarks, and conversion experiments sent to over 1,200+ direct-to-consumer store operators. No spam, ever.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your work email address..."
                className="w-full sm:w-80 px-4 py-3 rounded-full text-xs font-medium bg-white text-[#064E3B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B7E84B]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#B7E84B] text-[#0B0F17] text-xs font-black uppercase tracking-wider hover:bg-[#a5d83a] transition-all cursor-pointer shadow-md shrink-0"
              >
                {newsletterSubscribed ? 'Subscribed ✓' : 'Subscribe Free'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. FULL ARTICLE READING MODAL / DRAWER                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {readingArticle && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            {/* Modal Backdrop click dismiss */}
            <div 
              className="fixed inset-0" 
              onClick={() => setReadingArticle(null)} 
            />

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#064E3B]/20 bg-white text-[#064E3B] shadow-2xl p-6 sm:p-9"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-[#064E3B]/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                  <BookOpen className="w-4 h-4 text-[#047857]" />
                  <span>{readingArticle.category}</span>
                  <span className="opacity-40">•</span>
                  <span className="text-[#064E3B]/60">{readingArticle.readTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyShare}
                    className={`p-2 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      copiedLink
                        ? 'bg-[#064E3B] text-white border-[#064E3B]'
                        : 'border-[#064E3B]/15 text-[#064E3B]/70 hover:text-[#064E3B] hover:bg-[#064E3B]/5'
                    }`}
                    title="Share Article Link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-bold">{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  <button
                    onClick={() => setReadingArticle(null)}
                    className="p-2 rounded-full border border-[#064E3B]/15 text-[#064E3B]/70 hover:text-[#064E3B] hover:bg-[#064E3B]/5 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Header */}
              <div className="mt-6">
                <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[#064E3B]">
                  {readingArticle.title}
                </h2>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={readingArticle.author.avatar}
                    alt={readingArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#064E3B]/20 shrink-0"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div>
                    <div className="text-xs font-black text-[#064E3B]">{readingArticle.author.name}</div>
                    <div className="text-[11px] font-semibold text-[#064E3B]/70">
                      {readingArticle.author.role} • {readingArticle.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image in Modal */}
              <div className="mt-6 rounded-2xl overflow-hidden aspect-[16/9] border border-[#064E3B]/15 bg-black/5">
                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`;
                  }}
                />
              </div>

              {/* Article Content */}
              <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed font-normal">
                <p className="font-semibold text-base sm:text-lg leading-relaxed text-[#064E3B]">
                  {readingArticle.content.intro}
                </p>

                {readingArticle.content.subheadings.map((section, idx) => (
                  <div key={idx} className="space-y-3 pt-2">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#047857]">
                      {section.heading}
                    </h3>
                    <p className="text-[#064E3B]/85">
                      {section.body}
                    </p>
                    {section.bulletPoints && (
                      <ul className="space-y-2 pl-2">
                        {section.bulletPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                            <span className="text-[#064E3B]/85">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="p-5 rounded-2xl border bg-[#EAF3E8] border-[#064E3B]/20 text-[#064E3B]">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#047857] block mb-1.5">
                    Bottom Line
                  </span>
                  <p className="text-sm font-medium italic">
                    "{readingArticle.content.conclusion}"
                  </p>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="mt-9 pt-6 border-t border-[#064E3B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">Ready to optimize your storefront?</div>
                  <div className="text-xs text-[#064E3B]/70">We provide fixed-price quotes and sub-600ms guarantees.</div>
                </div>

                <button
                  onClick={() => {
                    setReadingArticle(null);
                    if (onHireClick) onHireClick();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#064E3B] text-white hover:bg-[#047857] transition-all cursor-pointer shadow-md"
                >
                  Get A Free Quote
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
