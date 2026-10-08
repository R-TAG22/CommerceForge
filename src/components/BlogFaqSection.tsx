import React, { useState } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  HelpCircle, 
  MessageSquare,
  BookOpen,
  ArrowUpRight,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useRouter } from '../admin/router';
import { useCMS } from '../context/CMSContext';
import { BLOG_POSTS_DATA } from './BlogPage';

interface BlogFaqSectionProps {
  onCtaClick?: () => void;
}

const DEFAULT_FAQS = [
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
  const prefersReducedMotion = useReducedMotion();
  const { navigate } = useRouter();
  const { activeContent } = useCMS();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Allow CMS FAQs if configured, otherwise use default curated list
  const cmsFaqList = activeContent?.faq?.faqs || (activeContent?.faq as any)?.items || [];
  const faqs = cmsFaqList.length > 0
    ? cmsFaqList
        .filter((f: any) => f.published !== false)
        .map((f: any) => ({ q: f.question, a: f.answer }))
    : DEFAULT_FAQS;

  // Selected top blog posts to display in the side-by-side view
  const featuredArticles = BLOG_POSTS_DATA.slice(0, 3);

  const handleNavigateToFaqs = () => {
    navigate('/faqs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBlog = (articleId?: string) => {
    if (articleId) {
      navigate(`/blog/${articleId}`);
    } else {
      navigate('/blog');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="faq" 
      className="relative w-full py-16 sm:py-20 lg:py-24 transition-colors duration-300 border-t bg-[#F8FAF8] border-[#064E3B]/10 text-[#064E3B]"
      aria-label="Blog and Frequently Asked Questions"
    >
      {/* Anchor identifiers for direct hash navigation */}
      <span id="faqs" className="sr-only" aria-hidden="true" />
      <span id="blog" className="sr-only" aria-hidden="true" />

      {/* Ambient background glow accents */}
      <div 
        className="absolute top-1/4 left-10 w-96 h-96 pointer-events-none rounded-full blur-3xl -z-10 opacity-40 bg-[#B7E84B]/15" 
      />
      <div 
        className="absolute bottom-10 right-10 w-96 h-96 pointer-events-none rounded-full blur-3xl -z-10 opacity-40 bg-[#064E3B]/5" 
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Main Eyebrow & Headline Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.16em] border bg-[#064E3B]/5 border-[#064E3B]/20 text-[#064E3B]">
              <Sparkles className="w-3 h-3 text-[#B7E84B]" />
              Knowledge & Insights
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight text-[#064E3B]">
            Engineering <span className="text-[#047857]">Journal</span> & FAQs
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl text-[#064E3B]/75">
            Explore our deep-dive performance teardowns, conversion case studies, and transparent answers to how we build sub-second custom e-commerce stores.
          </p>
        </div>

        {/* ================================================================ */}
        {/* SIDE BY SIDE GRID CONTAINER: Left Blog Cards | Right FAQ Accordion */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN (5 of 12 cols): LATEST BLOG & ARTICLES             */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header for Blog Column */}
            <div className="flex items-center justify-between pb-3 border-b border-[#064E3B]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-[#064E3B]/10 border-[#064E3B]/20 text-[#064E3B]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#064E3B]">
                    Latest Insights & Articles
                  </h3>
                  <span className="text-[11px] font-semibold text-[#064E3B]/60">
                    Speed benchmarks & CRO blueprints
                  </span>
                </div>
              </div>

              <button
                id="btn-goto-blog-page-top"
                onClick={() => handleNavigateToBlog()}
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer border-[#064E3B]/20 bg-white text-[#064E3B] hover:bg-[#064E3B] hover:text-white"
              >
                <span>All Articles</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Featured Blog Highlight Card (Top 1) */}
            {featuredArticles[0] && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35 }}
                onClick={() => handleNavigateToBlog(featuredArticles[0].id)}
                className="group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg bg-white border-[#064E3B]/15 hover:border-[#064E3B]/40"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B7E84B]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#B7E84B] text-[#0B0F17]">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured Teardown
                    </span>
                    <span className="text-[11px] font-bold flex items-center gap-1 text-[#064E3B]/60">
                      <Clock className="w-3 h-3" />
                      {featuredArticles[0].readTime}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-black tracking-tight leading-snug uppercase transition-colors group-hover:text-[#047857] text-[#064E3B]">
                    {featuredArticles[0].title}
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-sm font-medium line-clamp-3 leading-relaxed text-[#064E3B]/75">
                    {featuredArticles[0].excerpt}
                  </p>

                  {/* Impact metrics row */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-[#064E3B]/10">
                    {featuredArticles[0].metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-sm font-black text-[#047857]">
                          {m.value}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider truncate text-[#064E3B]/60">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 flex items-center justify-between border-t border-[#064E3B]/10">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredArticles[0].author.avatar}
                      alt={featuredArticles[0].author.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#064E3B]/20"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-xs font-bold text-[#064E3B]">
                      {featuredArticles[0].author.name}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#064E3B] group-hover:text-[#047857] group-hover:translate-x-0.5 transition-transform">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            )}

            {/* List of Other Top Articles */}
            <div className="space-y-3">
              {featuredArticles.slice(1).map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, delay: (idx + 1) * 0.05 }}
                  onClick={() => handleNavigateToBlog(article.id)}
                  className="group p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 bg-white border-[#064E3B]/10 hover:border-[#064E3B]/30 hover:bg-[#F3F7F3]"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-[#064E3B]/5 text-[#047857]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#047857]">
                          {article.category}
                        </span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[10px] font-medium text-[#064E3B]/60">
                          {article.readTime}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold tracking-tight line-clamp-1 uppercase group-hover:text-[#047857] transition-colors text-[#064E3B]">
                        {article.title}
                      </h5>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg shrink-0 transition-transform group-hover:translate-x-0.5 text-[#064E3B]/40 group-hover:text-[#064E3B]">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Read More Blogs Callout */}
            <button
              id="btn-view-all-blog-posts"
              onClick={() => handleNavigateToBlog()}
              className="w-full py-3 px-4 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs bg-white border-[#064E3B]/15 text-[#064E3B] hover:border-[#064E3B] hover:bg-[#F3F7F3]"
            >
              <span>Explore All Engineering Articles</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#047857]" />
            </button>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN (7 of 12 cols): FREQUENTLY ASKED QUESTIONS       */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Header for FAQ Column */}
            <div className="flex items-center justify-between pb-3 border-b border-[#064E3B]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-[#064E3B]/10 border-[#064E3B]/20 text-[#064E3B]">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#064E3B]">
                    Frequently Asked Questions
                  </h3>
                  <span className="text-[11px] font-semibold text-[#064E3B]/60">
                    Clear answers about deliverables, pricing, and timelines
                  </span>
                </div>
              </div>

              {/* View More Questions Button */}
              <button
                id="btn-view-more-questions-top"
                onClick={handleNavigateToFaqs}
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer border-[#064E3B]/20 bg-white text-[#064E3B] hover:bg-[#064E3B] hover:text-white"
              >
                <span>Full FAQ Page</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-3 sm:space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    id={`home-faq-item-${idx}`}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: idx * 0.04 }}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-[#B7E84B] ring-1 ring-[#B7E84B]/40 shadow-md'
                        : 'bg-white/90 border-[#064E3B]/10 hover:border-[#064E3B]/20'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer select-none"
                      aria-expanded={isOpen}
                      aria-controls={`home-faq-answer-${idx}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#B7E84B] text-[#0B0F17]'
                            : 'bg-[#064E3B]/10 text-[#064E3B]'
                        }`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                          isOpen 
                            ? 'text-[#047857]' 
                            : 'text-[#064E3B] hover:text-[#047857]'
                        }`}>
                          {faq.q}
                        </h4>
                      </div>

                      <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#047857]' : 'text-[#064E3B]/40'
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
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm font-medium leading-relaxed border-t border-[#064E3B]/5 text-[#064E3B]/85">
                            <p>{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Inquiries Callout Card under FAQs */}
            <div className="p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors bg-gradient-to-r from-white to-[#EAF3E8]/80 border-[#064E3B]/15">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#B7E84B]/15 border border-[#B7E84B]/40 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#064E3B]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#064E3B]">
                    Have a specific question about your store?
                  </h4>
                  <p className="text-[11px] sm:text-xs font-medium mt-0.5 text-[#064E3B]/70">
                    We analyze your current URL and provide a transparent, fixed-price quote with zero obligation.
                  </p>
                </div>
              </div>

              <button
                id="btn-faq-ask-directly"
                onClick={onCtaClick}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm bg-[#064E3B] text-white hover:bg-[#047857]"
              >
                <span>Ask Us Directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
