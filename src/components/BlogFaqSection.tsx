import React, { useState } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  X, 
  MessageSquare,
  Share2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePublicTheme } from '../context/PublicThemeContext';
import { useRouter } from '../admin/router';

interface BlogFaqSectionProps {
  onCtaClick?: () => void;
}

interface BlogPost {
  id: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
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

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'handcrafted-vs-builders',
    category: 'E-COMMERCE PERFORMANCE',
    readTime: '5 MIN READ',
    date: 'OCTOBER 2026',
    title: 'Why Handcrafted Code Beats Drag-and-Drop Builders for Store Conversions',
    excerpt: 'How stripping away 42 redundant WordPress/Shopify app scripts and migrating to clean custom code transformed a slow 4.2s mobile storefront into a 620ms instant sales engine.',
    image: `${import.meta.env.BASE_URL}screenshots/the-lean-company.png`,
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
    category: 'CONVERSION SCIENCE',
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
    category: 'ARCHITECTURAL GUIDE',
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
];

const FAQS_LIST = [
  {
    q: 'How fast will our new store actually load?',
    a: 'We architect every storefront from the ground up using clean React, TypeScript, and atomic Tailwind CSS—strictly zero slow drag-and-drop builders or heavy plugins. Our rebuilds consistently score 95–100 on Google PageSpeed Insights and load in under 600ms on real 4G mobile connections.',
  },
  {
    q: 'What is your typical turnaround timeline?',
    a: 'Our Basic Package launches in 7–10 business days. Standard storefront rebuilds take 10–15 business days, and full-scale bespoke e-commerce platforms take 30–45 business days. Delivery dates are agreed upon before starting and guaranteed in writing.',
  },
  {
    q: 'Do I completely own the code and my domain?',
    a: 'Yes, 100%. You receive complete ownership of your code, repository, assets, design files, and domain. We never lock you into proprietary platforms, hostage hosting, or mandatory monthly agency retainers.',
  },
  {
    q: 'What are your payment terms and milestones?',
    a: 'We work on a transparent 50/50 milestone: a 50% initial deposit to begin strategic planning and custom design, and the final 50% only after you thoroughly test, review, and approve the completed storefront before live deployment.',
  },
  {
    q: 'Can my team manage products, prices, and copy after launch?',
    a: 'Absolutely. We provide an intuitive content management setup and a custom recorded video walkthrough so your staff can update menus, inventory, photos, business hours, and prices without touching code.',
  },
  {
    q: 'Do you handle domain configuration and hosting migration?',
    a: 'Yes. We configure DNS records, edge caching (Cloudflare, Vercel, or Shopify), SSL certificates, and transactional email deliverability completely free of charge, ensuring zero downtime for your existing store customers.',
  },
];

export const BlogFaqSection: React.FC<BlogFaqSectionProps> = ({ onCtaClick }) => {
  const { isDark } = usePublicTheme();
  const prefersReducedMotion = useReducedMotion();
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [readingModalOpen, setReadingModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const activePost = BLOG_POSTS[0];

  const handleCopyShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section 
      id="blog" 
      className={`relative w-full py-12 sm:py-16 lg:py-20 transition-colors duration-300 border-t ${
        isDark 
          ? 'bg-[#0B0F17] border-white/10 text-white' 
          : 'bg-[#F8FAF8] border-[#064E3B]/10 text-[#064E3B]'
      }`}
      aria-label="Blog & Frequently Asked Questions"
    >
      {/* Anchor identifier for FAQs direct links */}
      <span id="faqs" className="sr-only" aria-hidden="true" />
      <span id="faq" className="sr-only" aria-hidden="true" />

      {/* Ambient background glow accents */}
      <div 
        className={`absolute top-1/4 left-0 w-96 h-96 pointer-events-none rounded-full blur-3xl -z-10 opacity-50 ${
          isDark ? 'bg-[#B7E84B]/5' : 'bg-[#B7E84B]/15'
        }`} 
      />
      <div 
        className={`absolute bottom-10 right-0 w-96 h-96 pointer-events-none rounded-full blur-3xl -z-10 opacity-50 ${
          isDark ? 'bg-[#064E3B]/10' : 'bg-[#064E3B]/5'
        }`} 
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* 2-Column Grid: Left Blog Card | Right FAQs Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: CARD FOR BLOG ================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B7E84B]" />
                <span className={`text-xs font-black tracking-[0.16em] uppercase ${
                  isDark ? 'text-white/90' : 'text-[#064E3B]'
                }`}>
                  Featured Article
                </span>
              </div>
              <span className={`text-[11px] font-bold tracking-wider uppercase ${
                isDark ? 'text-white/50' : 'text-[#064E3B]/60'
              }`}>
                {activePost.date}
              </span>
            </div>

            {/* Main Featured Blog Card */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className={`group rounded-3xl border overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl ${
                isDark 
                  ? 'bg-[#111722]/90 border-white/10 hover:border-[#B7E84B]/50 shadow-black/40' 
                  : 'bg-white border-[#064E3B]/15 hover:border-[#B7E84B] shadow-emerald-950/5'
              }`}
            >
              {/* Card Image Banner */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/10 select-none">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to a clean placeholder
                    e.currentTarget.src = `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`;
                  }}
                />
                
                {/* Image Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark 
                    ? 'from-[#111722] via-[#111722]/30 to-transparent' 
                    : 'from-white/95 via-transparent to-transparent'
                }`} />

                {/* Quiet Unboxed Metadata on image (Zero-Pill discipline) */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-white drop-shadow-md">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0B0F17]/80 backdrop-blur-md border border-white/15">
                    <Sparkles className="w-3 h-3 text-[#B7E84B]" />
                    <span className="text-[#B7E84B] font-extrabold">{activePost.category}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0B0F17]/80 backdrop-blur-md border border-white/15">
                    <Clock className="w-3 h-3 text-white/70" />
                    <span>{activePost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug transition-colors group-hover:text-[#B7E84B] ${
                    isDark ? 'text-white' : 'text-[#064E3B]'
                  }`}>
                    {activePost.title}
                  </h3>

                  <p className={`mt-3 text-xs sm:text-sm line-clamp-3 leading-relaxed font-medium ${
                    isDark ? 'text-white/70' : 'text-[#064E3B]/80'
                  }`}>
                    {activePost.excerpt}
                  </p>

                  {/* Highlight Metrics Bar */}
                  <div className={`mt-5 pt-4 border-t grid grid-cols-3 gap-2 ${
                    isDark ? 'border-white/10' : 'border-[#064E3B]/10'
                  }`}>
                    {activePost.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-[#B7E84B]">
                          {m.value}
                        </span>
                        <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-white/60' : 'text-[#064E3B]/70'
                        }`}>
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Author Info & Read Article CTA */}
                <div className={`mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
                  isDark ? 'border-white/10' : 'border-[#064E3B]/10'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <img
                      src={activePost.author.avatar}
                      alt={activePost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#B7E84B]/40 shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold leading-tight ${
                        isDark ? 'text-white' : 'text-[#064E3B]'
                      }`}>
                        {activePost.author.name}
                      </span>
                      <span className={`text-[10px] font-semibold ${
                        isDark ? 'text-white/50' : 'text-[#064E3B]/60'
                      }`}>
                        {activePost.author.role}
                      </span>
                    </div>
                  </div>

                  <button
                    id="btn-read-blog-post"
                    onClick={() => setReadingModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B7E84B] text-[#0B0F17] hover:bg-[#a5d83a] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: FAQS ACCORDION ================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#B7E84B]" />
                <span className={`text-xs font-black tracking-[0.16em] uppercase ${
                  isDark ? 'text-white/90' : 'text-[#064E3B]'
                }`}>
                  Frequently Asked Questions
                </span>
              </div>
              <button
                id="btn-view-more-questions-top"
                onClick={() => {
                  navigate('/faqs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer shadow-xs ${
                  isDark
                    ? 'bg-white/5 border-white/15 text-[#B7E84B] hover:bg-[#B7E84B] hover:text-[#0B0F17] hover:border-[#B7E84B]'
                    : 'bg-white border-[#064E3B]/20 text-[#064E3B] hover:bg-[#064E3B] hover:text-white hover:border-[#064E3B]'
                }`}
              >
                <span>View More Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Accordion Container */}
            <div className="space-y-3">
              {FAQS_LIST.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    id={`home-faq-item-${idx}`}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: idx * 0.05 }}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? isDark
                          ? 'bg-[#131A26] border-[#B7E84B]/80 ring-1 ring-[#B7E84B]/30 shadow-lg'
                          : 'bg-white border-[#B7E84B] ring-1 ring-[#B7E84B]/40 shadow-md'
                        : isDark
                          ? 'bg-[#111722]/60 border-white/10 hover:border-white/20'
                          : 'bg-white/90 border-[#064E3B]/10 hover:border-[#064E3B]/20'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer select-none"
                      aria-expanded={isOpen}
                      aria-controls={`home-faq-answer-${idx}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#B7E84B] text-[#0B0F17]'
                            : isDark ? 'bg-white/10 text-white/70' : 'bg-[#064E3B]/10 text-[#064E3B]'
                        }`}>
                          {idx + 1}
                        </span>
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                          isOpen 
                            ? 'text-[#B7E84B]' 
                            : isDark ? 'text-white hover:text-white/90' : 'text-[#064E3B] hover:text-[#047857]'
                        }`}>
                          {faq.q}
                        </h4>
                      </div>

                      <div className={`p-1 rounded-full shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#B7E84B]' : isDark ? 'text-white/40' : 'text-[#064E3B]/40'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`home-faq-answer-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className={`px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm font-medium leading-relaxed border-t ${
                            isDark 
                              ? 'border-white/5 text-white/80' 
                              : 'border-[#064E3B]/5 text-[#064E3B]/85'
                          }`}>
                            <p>{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* View More Questions Button */}
            <button
              id="btn-view-more-questions"
              onClick={() => {
                navigate('/faqs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full py-3.5 px-6 rounded-2xl border text-xs sm:text-sm font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-xs ${
                isDark
                  ? 'bg-[#131A26] border-white/10 text-white hover:border-[#B7E84B] hover:text-[#B7E84B] hover:bg-[#182232]'
                  : 'bg-white border-[#064E3B]/15 text-[#064E3B] hover:border-[#064E3B] hover:bg-[#F3F7F3]'
              }`}
            >
              <span>View More Questions</span>
              <ArrowRight className="w-4 h-4 text-[#B7E84B]" />
            </button>

            {/* Bottom Inquiries Callout Card */}
            <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
              isDark 
                ? 'bg-gradient-to-r from-[#111722] to-[#15201A] border-[#B7E84B]/20' 
                : 'bg-gradient-to-r from-white to-[#EAF3E8]/80 border-[#064E3B]/15'
            }`}>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#B7E84B]/15 border border-[#B7E84B]/40 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#B7E84B]" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-black uppercase tracking-wider ${
                    isDark ? 'text-white' : 'text-[#064E3B]'
                  }`}>
                    Have a specific question about your store?
                  </h4>
                  <p className={`text-[11px] sm:text-xs font-medium mt-0.5 ${
                    isDark ? 'text-white/60' : 'text-[#064E3B]/70'
                  }`}>
                    We analyze your current URL and provide a transparent, fixed-price quote with zero obligation.
                  </p>
                </div>
              </div>

              <button
                id="btn-faq-ask-directly"
                onClick={onCtaClick}
                className={`w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm ${
                  isDark
                    ? 'bg-[#B7E84B] text-[#0B0F17] hover:bg-[#a5d83a]'
                    : 'bg-[#064E3B] text-white hover:bg-[#047857]'
                }`}
              >
                <span>Ask Us Directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FULL ARTICLE READING MODAL / DRAWER ================= */}
      <AnimatePresence>
        {readingModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            {/* Modal Backdrop click dismiss */}
            <div 
              className="fixed inset-0" 
              onClick={() => setReadingModalOpen(false)} 
            />

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className={`relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-9 ${
                isDark 
                  ? 'bg-[#0E1520] border-white/15 text-white' 
                  : 'bg-white border-[#064E3B]/15 text-[#064E3B]'
              }`}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B]">
                  <BookOpen className="w-4 h-4" />
                  <span>{activePost.category}</span>
                  <span className="opacity-40">•</span>
                  <span className={isDark ? 'text-white/60' : 'text-[#064E3B]/60'}>{activePost.readTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyShare}
                    className={`p-2 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      copiedLink
                        ? 'bg-[#B7E84B] text-[#0B0F17] border-[#B7E84B]'
                        : isDark
                          ? 'border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                          : 'border-[#064E3B]/15 text-[#064E3B]/70 hover:text-[#064E3B] hover:bg-[#064E3B]/5'
                    }`}
                    title="Share Article Link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-bold">{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  <button
                    onClick={() => setReadingModalOpen(false)}
                    className={`p-2 rounded-full border transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                        : 'border-[#064E3B]/15 text-[#064E3B]/70 hover:text-[#064E3B] hover:bg-[#064E3B]/5'
                    }`}
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Header */}
              <div className="mt-6">
                <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  {activePost.title}
                </h2>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={activePost.author.avatar}
                    alt={activePost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#B7E84B]/40 shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="text-xs font-black">{activePost.author.name}</div>
                    <div className={`text-[11px] font-semibold ${isDark ? 'text-white/60' : 'text-[#064E3B]/70'}`}>
                      {activePost.author.role} • {activePost.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image in Modal */}
              <div className="mt-6 rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 bg-black/10">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.src = `${import.meta.env.BASE_URL}assets/process/process-03-clean-code.jpeg`;
                  }}
                />
              </div>

              {/* Article Content */}
              <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed font-normal">
                <p className={`font-semibold text-base sm:text-lg leading-relaxed ${
                  isDark ? 'text-white/95' : 'text-[#064E3B]'
                }`}>
                  {activePost.content.intro}
                </p>

                {activePost.content.subheadings.map((section, idx) => (
                  <div key={idx} className="space-y-3 pt-2">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#B7E84B]">
                      {section.heading}
                    </h3>
                    <p className={isDark ? 'text-white/80' : 'text-[#064E3B]/85'}>
                      {section.body}
                    </p>
                    {section.bulletPoints && (
                      <ul className="space-y-2 pl-2">
                        {section.bulletPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#B7E84B] shrink-0 mt-0.5" />
                            <span className={isDark ? 'text-white/80' : 'text-[#064E3B]/85'}>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className={`p-5 rounded-2xl border ${
                  isDark 
                    ? 'bg-[#15201A] border-[#B7E84B]/30 text-white/90' 
                    : 'bg-[#EAF3E8] border-[#064E3B]/20 text-[#064E3B]'
                }`}>
                  <span className="font-bold text-xs uppercase tracking-wider text-[#B7E84B] block mb-1.5">
                    Bottom Line
                  </span>
                  <p className="text-sm font-medium italic">
                    "{activePost.content.conclusion}"
                  </p>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="mt-9 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-bold uppercase tracking-wider">Ready to optimize your storefront?</div>
                  <div className={`text-xs ${isDark ? 'text-white/60' : 'text-[#064E3B]/70'}`}>We offer a free performance audit and turnaround quote.</div>
                </div>

                <button
                  onClick={() => {
                    setReadingModalOpen(false);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#B7E84B] text-[#0B0F17] hover:bg-[#a5d83a] transition-all cursor-pointer shadow-md"
                >
                  Get A Free Quote
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
