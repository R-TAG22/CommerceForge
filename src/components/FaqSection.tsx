import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

interface FaqSectionProps {
  onCtaClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onCtaClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { activeContent } = useCMS();
  const faqData = activeContent?.faq;

  const defaultFaqs = [
    {
      q: 'How much does a website cost?',
      a: 'We offer straightforward, productized pricing so you never deal with surprise invoices. Our Basic Package starts at $159 (perfect for local service shops), the Standard Package is $260 (our most popular for growing brands), and our full E-Commerce Premium Package is $810. We also offer a ₱4,000 / $75 tier for students and academic capstones.',
    },
    {
      q: 'What are your payment terms?',
      a: 'We believe in mutual trust and skin in the game: 50% deposit upfront to begin design and architecture, and the remaining 50% only when the website is completed, reviewed, and approved before final live launch.',
    },
    {
      q: 'How long does it take to build and launch?',
      a: 'Our Basic Package launches in 7–10 business days. The Standard Package takes 10–15 business days, and complete Premium E-Commerce stores typically take 30–45 business days. We agree on deadlines before starting and stick to them.',
    },
    {
      q: 'Do I own the website and the code?',
      a: 'Yes, 100%. You own your domain, your assets, your copy, and your codebase. We never trap you in proprietary systems or hold your website hostage.',
    },
    {
      q: 'What about hosting and domain names?',
      a: 'If you already own a domain (e.g. from GoDaddy or Namecheap), we will connect it for free. For hosting, we offer fast managed global edge hosting starting at $14/month ($140/year), or we can deploy to your own preferred hosting account.',
    },
    {
      q: 'What if I need changes or revisions?',
      a: 'Every package includes structured revision rounds to polish layouts, typography, imagery, and text. We make sure you are 100% happy with your site before we flip the switch to go live.',
    },
    {
      q: 'Can I update the website myself after launch?',
      a: 'Absolutely. We provide lightweight content management setups or clean guides so you or your staff can easily update menus, photos, business hours, and prices without needing to code.',
    },
  ];

  const faqList = faqData?.faqs || (faqData as any)?.items || [];
  const faqs = faqList.length > 0
    ? faqList.filter((f: any) => f.published !== false).map((f: any) => ({ q: f.question, a: f.answer }))
    : defaultFaqs;

  const eyebrow = faqData?.eyebrow || 'FREQUENTLY ASKED QUESTIONS';
  const heading = faqData?.headingPrefix || (faqData as any)?.heading || 'Everything You Need';
  const headingHighlight = faqData?.headingHighlight || 'To Know';
  const subheading = faqData?.subheading || 'Got questions before we begin? Here are transparent answers to the most common questions our clients ask.';

  return (
    <motion.section 
      id="faq" 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full py-16 sm:py-24 bg-[#F8FAF8] border-t border-[#1E3A2B]/10"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A2B] tracking-tight uppercase">
            {heading} <span className="text-[#2D5A40]">{headingHighlight}</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A584E] mt-3 font-medium">
            {subheading}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen 
                    ? 'border-[#B7E84B] ring-1 ring-[#B7E84B]/50 shadow-xs' 
                    : 'border-[#1E3A2B]/10 hover:border-[#1E3A2B]/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#1E3A2B] tracking-tight">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 bg-[#EAF3E8] text-[#1E3A2B]' : 'bg-[#F8FAF8] text-[#4A584E]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#4A584E] font-medium leading-relaxed pt-1 border-t border-[#1E3A2B]/8">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#4A584E] font-medium">
            Have a custom requirement or specific question not covered here?
          </p>
          <button
            onClick={onCtaClick}
            className="mt-3 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2D5A40] hover:text-[#1E3A2B] hover:underline"
          >
            <span>Ask us directly & get a reply within 4 hours →</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
};
