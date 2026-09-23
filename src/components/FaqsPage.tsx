import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Search, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { DynamicSectionRenderer } from './DynamicSectionRenderer';

interface FaqsPageProps {
  onCtaClick: () => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ onCtaClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { activeContent } = useCMS();
  const faqData = activeContent?.faq;

  const defaultFaqs = [
    {
      q: 'How much does a website cost?',
      a: 'We offer straightforward, productized pricing so you never deal with surprise invoices. Our Basic Package starts at $159 (perfect for local service shops), the Standard Package is $260 (our most popular for growing brands), and our full E-Commerce Premium Package is $810. We also offer a ₱4,000 / $75 tier for students and academic capstones.',
      category: 'pricing',
    },
    {
      q: 'What are your payment terms?',
      a: 'We believe in mutual trust and skin in the game: 50% deposit upfront to begin design and architecture, and the remaining 50% only when the website is completed, reviewed, and approved before final live launch.',
      category: 'process',
    },
    {
      q: 'How long does it take to build and launch?',
      a: 'Our Basic Package launches in 7–10 business days. The Standard Package takes 10–15 business days, and complete Premium E-Commerce stores typically take 30–45 business days. We agree on deadlines before starting and stick to them.',
      category: 'timeline',
    },
    {
      q: 'Do I own the website and the code?',
      a: 'Yes, 100%. You own your domain, your assets, your copy, and your codebase. We never trap you in proprietary systems or hold your website hostage.',
      category: 'ownership',
    },
    {
      q: 'What about hosting and domain names?',
      a: 'If you already own a domain (e.g. from GoDaddy or Namecheap), we will connect it for free. For hosting, we offer fast managed global edge hosting starting at $14/month ($140/year), or we can deploy to your own preferred hosting account.',
      category: 'tech',
    },
    {
      q: 'What if I need changes or revisions?',
      a: 'Every package includes structured revision rounds to polish layouts, typography, imagery, and text. We make sure you are 100% happy with your site before we flip the switch to go live.',
      category: 'process',
    },
    {
      q: 'Can I update the website myself after launch?',
      a: 'Absolutely. We provide lightweight content management setups or clean guides so you or your staff can easily update menus, photos, business hours, and prices without needing to code.',
      category: 'tech',
    },
    {
      q: 'Do you work with clients outside the Philippines?',
      a: 'Yes! While our dev team is proudly headquartered in the Philippines, we work with direct-to-consumer brands, local clinics, restaurants, and ecommerce entrepreneurs across the United States, Australia, UK, and Southeast Asia.',
      category: 'process',
    },
  ];

  const rawList = faqData?.faqs || (faqData as any)?.items || [];
  const allFaqs = rawList.length > 0
    ? rawList.filter((f: any) => f.published !== false).map((f: any) => ({
        q: f.question,
        a: f.answer,
        category: 'general',
      }))
    : defaultFaqs;

  const filteredFaqs = allFaqs.filter((item: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query);
  });

  return (
    <div className="w-full">
      {/* Top Hero Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-14 pb-10"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              TRANSPARENCY FIRST
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1E3A2B]">
            FREQUENTLY ASKED QUESTIONS.
          </h1>

          <p className="mt-4 text-[#4A584E] text-base sm:text-lg leading-relaxed">
            Got questions before we collaborate? Here is everything you need to know about our productized rates, delivery timelines, codebase ownership, and guarantees.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8FA98F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search answers (e.g. pricing, revisions, ownership)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#1E3A2B]/15 text-sm text-[#1E3A2B] placeholder:text-[#4A584E]/50 focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B] shadow-xs"
              aria-label="Search FAQs"
            />
          </div>
        </div>
      </motion.section>

      {/* Accordion Section */}
      <motion.section 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#1E3A2B]/10 p-8">
            <HelpCircle className="w-10 h-10 mx-auto text-[#B7E84B] mb-2" />
            <h3 className="text-base font-bold text-[#1E3A2B]">No matching questions found</h3>
            <p className="text-xs text-[#4A584E] mt-1">
              Have a specific question? Feel free to ask us directly.
            </p>
            <button
              onClick={onCtaClick}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider"
            >
              Ask Us Directly
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq: any, idx: number) => {
              const isOpen = openIndex === idx;
              const headingId = `faq-heading-${idx}`;
              const panelId = `faq-panel-${idx}`;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? 'bg-white border-[#B7E84B] shadow-md ring-1 ring-[#B7E84B]/40'
                      : 'bg-white border-[#1E3A2B]/10 hover:border-[#1E3A2B]/20'
                  }`}
                >
                  <button
                    id={headingId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#B7E84B] rounded-2xl cursor-pointer"
                  >
                    <span className="font-bold text-base sm:text-lg text-[#1E3A2B] pr-2">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-[#B7E84B] text-[#0F241A] rotate-180'
                          : 'bg-[#EAF3E8] text-[#1E3A2B]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      className="px-5 sm:px-6 pb-6 pt-1 text-[#4A584E] text-sm sm:text-base leading-relaxed border-t border-[#1E3A2B]/5"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </motion.section>

      {/* Dynamic Sections configured in CMS for FAQs Page */}
      <DynamicSectionRenderer page="faqs" onHireClick={onCtaClick} />

      {/* Still Have Questions Contact Box */}
      <motion.section 
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12"
      >
        <div className="bg-[#EAF3E8] rounded-3xl p-8 sm:p-12 border border-[#B7E84B]/40 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#1E3A2B] text-[#B7E84B] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#1E3A2B]">
            Still have questions about your store?
          </h2>
          <p className="mt-2 text-[#4A584E] text-sm leading-relaxed">
            We are glad to answer questions regarding custom stacks, migrations, or project timelines before you commit to anything.
          </p>
          <div className="mt-6">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1E3A2B] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0F241A] shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <span>SEND US A MESSAGE</span>
              <ArrowRight className="w-4 h-4 text-[#B7E84B]" />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
