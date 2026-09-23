import React from 'react';
import { Check, ArrowRight, Sparkles, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const { activeContent } = useCMS();
  const packagesData = activeContent?.packages;

  const defaultPackages = [
    {
      id: 'basic',
      name: 'BASIC',
      price: '$159',
      pricePeriod: 'starting rate',
      popular: false,
      turnaround: '7–10 business days',
      desc: 'Essential, high-converting digital presence for local service shops, bakeries, salons, and freelancers.',
      features: [
        'Up to 4 custom-crafted sections',
        '100% mobile-responsive layout',
        'Direct inquiry / contact form',
        'Google Maps & business hours integration',
        'Speed optimization (<800ms load)',
        'Basic SEO meta tags & indexing',
        '1 round of scope revisions',
      ],
      badge: 'Best for Small Businesses',
    },
    {
      id: 'standard',
      name: 'STANDARD',
      price: '$260',
      pricePeriod: 'starting rate',
      popular: true,
      turnaround: '10–15 business days',
      desc: 'Our most requested package. Tailored layouts, polished animations, and copywriting refinement for growing brands.',
      features: [
        'Up to 7 bespoke designed sections',
        'Custom layout & light micro-interactions',
        'Copywriting refinement & messaging polish',
        'Menu, service catalog, or portfolio grid',
        'High-performance asset compression',
        'Google Analytics & Search Console setup',
        'Social media share preview cards',
        '2 rounds of detailed revisions',
      ],
      badge: 'Most Popular',
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      price: '$810',
      pricePeriod: 'starting rate',
      popular: false,
      turnaround: '30–45 business days',
      desc: 'Comprehensive, full-stack website with backend functionality like e-commerce, custom booking, or dynamic catalogs.',
      features: [
        'Complete e-commerce or booking engine',
        'Custom product pages & cart / checkout flows',
        'Payment gateway integration (Stripe, GCash, Maya)',
        'Automated order / appointment notification emails',
        'Brand identity setup & custom graphic assets',
        'Sub-500ms global edge CDN acceleration',
        'Comprehensive CMS training & documentation',
        '30 days post-launch priority support',
      ],
      badge: 'For E-Commerce & Growth',
    },
    {
      id: 'student',
      name: 'STUDENT & CAPSTONE',
      price: '₱4,000',
      pricePeriod: 'or $75 USD',
      popular: false,
      turnaround: '5–7 business days',
      desc: 'Affordable web development package dedicated for IT, CS, and Multimedia Arts students or academic projects.',
      features: [
        'Working web prototype with modern UI',
        'Responsive mobile + desktop layout',
        'Clean, commented TypeScript/React code',
        'Documentation & architectural overview',
        'Local deployment or live hosting assistance',
      ],
      badge: 'Student Friendly',
    },
  ];

  const packages = (packagesData?.packages && packagesData.packages.length > 0)
    ? packagesData.packages.filter((p) => p.published !== false)
    : defaultPackages;

  const eyebrow = packagesData?.eyebrow || 'TRANSPARENT PRODUCTIZED PRICING';
  const heading = packagesData?.heading || 'Simple Packages.';
  const headingHighlight = packagesData?.headingHighlight || 'Fixed Scope.';
  const subheading = packagesData?.subheading || 'No surprise invoices, hidden hourly rates, or endless agency delays. You know exactly what you get, what it costs, and when it launches.';

  return (
    <motion.section 
      id="packages" 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full py-16 sm:py-24 bg-[#F8FAF8] border-t border-[#1E3A2B]/10"
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              {eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A2B] tracking-tight uppercase">
            {heading} <span className="text-[#2D5A40]">{headingHighlight}</span> Fast Delivery.
          </h2>
          <p className="text-sm sm:text-base text-[#4A584E] mt-3 font-medium">
            {subheading}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              id={`package-card-${pkg.id}`}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white border-2 border-[#1E3A2B] shadow-[0_20px_50px_-10px_rgba(30,58,43,0.18)] md:scale-[1.02] z-10 ring-1 ring-[#B7E84B]/40'
                  : 'bg-white border border-[#1E3A2B]/10 shadow-xs hover:border-[#B7E84B] hover:shadow-md'
              }`}
            >
              {/* Popular / Tier Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1E3A2B] text-[#B7E84B] text-[11px] font-extrabold uppercase tracking-widest shadow-sm border border-[#B7E84B]/40">
                  {pkg.badge}
                </div>
              )}

              <div>
                {!pkg.popular && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#4A584E] mb-2">
                    {pkg.badge}
                  </span>
                )}
                <h3 className="text-xl font-black text-[#1E3A2B] tracking-tight mt-1">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mt-3">
                  <span className="text-4xl font-black text-[#1E3A2B] tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-semibold text-[#4A584E]">
                    {pkg.pricePeriod}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-lg bg-[#EAF3E8] border border-[#B7E84B]/30 text-[11px] font-bold text-[#1E3A2B]">
                  <Clock className="w-3.5 h-3.5 text-[#2D5A40]" />
                  <span>{pkg.turnaround}</span>
                </div>

                <p className="text-xs text-[#4A584E] font-medium mt-3 pb-5 border-b border-[#1E3A2B]/8 leading-relaxed">
                  {pkg.desc}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 my-5 text-xs text-[#1E3A2B] font-medium">
                  {pkg.features.map((feat: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#2D5A40] shrink-0 mt-0.5" />
                      <span>{typeof feat === 'string' ? feat : feat?.text || ''}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackage(pkg.name)}
                className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 mt-4 ${
                  pkg.popular
                    ? 'bg-[#1E3A2B] text-white hover:bg-[#0F241A] border border-[#B7E84B]/40 hover:border-[#B7E84B] shadow-sm'
                    : 'bg-[#F8FAF8] text-[#1E3A2B] border border-[#1E3A2B]/12 hover:bg-[#1E3A2B] hover:text-[#B7E84B] hover:border-[#1E3A2B]'
                }`}
              >
                <span>Choose {pkg.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B7E84B]" />
              </button>
            </div>
          ))}
        </div>

        {/* Transparent Terms Banner */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-[#1E3A2B]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4A584E]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#EAF3E8] text-[#1E3A2B] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#2D5A40]" />
            </div>
            <div>
              <strong className="block text-[#1E3A2B] font-bold text-sm">Transparent Payment Terms</strong>
              <span>50% deposit upfront to begin work, and remaining 50% only before final launch & deployment.</span>
            </div>
          </div>
          <div className="text-center md:text-right shrink-0">
            <span className="font-semibold">Fast managed hosting available:</span>
            <strong className="text-[#1E3A2B] ml-1.5 font-bold">$14/mo or $140/yr</strong>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
