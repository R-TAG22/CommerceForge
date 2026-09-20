import React from 'react';
import { Check, ArrowRight, Sparkles, Clock, ShieldCheck, HelpCircle, CheckCircle2, Zap } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { DynamicSectionRenderer } from './DynamicSectionRenderer';

interface PackagesPageProps {
  onSelectPackage: (packageName: string) => void;
  onHireClick?: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onSelectPackage, onHireClick }) => {
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
        'Full custom CMS integration (edit text/images)',
        'E-commerce shopping cart or booking system',
        'Stripe / PayPal / GCash payment integration',
        'Advanced performance tuning & image optimization',
        'Interactive before/after or 3D showcase',
        'Priority 30-day post-launch support & bug fixes',
        'Unlimited revision rounds during design stage',
      ],
      badge: 'For Scaling Operations',
    },
    {
      id: 'capstone',
      name: 'STUDENT / CAPSTONE',
      price: '₱4,000',
      pricePeriod: 'starting rate (~$70)',
      popular: false,
      turnaround: '5–7 business days',
      desc: 'Accessible pricing for student capstone systems, portfolio thesis defense, and academic web prototypes.',
      features: [
        'Working responsive web prototype',
        'Clean, commented source code',
        'Deployment on free tier (Vercel / Netlify)',
        'Basic database setup assistance',
        'Presentation walkthrough & documentation guide',
      ],
      badge: 'Student Friendly',
    },
  ];

  const packagesList = packagesData?.packages && packagesData.packages.length > 0
    ? packagesData.packages.map((pkg: any) => {
        const rawPrice = String(pkg.price || '');
        const formattedPrice = rawPrice.startsWith('$') || rawPrice.startsWith('₱')
          ? rawPrice
          : `${pkg.currency || '$'}${rawPrice}`;

        return {
          id: pkg.id,
          name: pkg.name,
          price: formattedPrice,
          pricePeriod: pkg.billingPeriodText || 'starting rate',
          popular: pkg.featured || false,
          turnaround: pkg.turnaroundTime || '7–10 business days',
          desc: pkg.description || '',
          features: Array.isArray(pkg.features) ? pkg.features : [],
          badge: pkg.badge || (pkg.featured ? 'Most Popular' : ''),
        };
      })
    : defaultPackages;

  return (
    <div className="w-full">
      {/* Page Hero Header */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-14 pb-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              TRANSPARENT PRODUCTIZED RATES
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1E3A2B]">
            PRICING THAT RESPECTS YOUR BUSINESS.
          </h1>

          <p className="mt-4 text-[#4A584E] text-base sm:text-lg leading-relaxed">
            No surprise invoices, hidden retainer fees, or bloated agency markups. Every project is scoped, guaranteed, and delivered on a milestone payment model.
          </p>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs font-semibold text-[#1E3A2B]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D5A40]" />
              <span>50/50 Milestone Payments</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D5A40]" />
              <span>100% Mobile Responsive</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D5A40]" />
              <span>Sub-800ms Speed Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {packagesList.map((pkg: any) => {
            const isStandard = pkg.popular || pkg.name === 'STANDARD';

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isStandard
                    ? 'border-2 border-[#1E3A2B] shadow-[0_20px_45px_-10px_rgba(30,58,43,0.18)] ring-2 ring-[#B7E84B] md:-translate-y-2 z-10'
                    : 'border border-[#1E3A2B]/10 shadow-xs hover:border-[#B7E84B] hover:shadow-md'
                }`}
              >
                {/* Popular / Tier Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap shadow-xs ${
                        isStandard
                          ? 'bg-[#1E3A2B] text-[#B7E84B] border border-[#B7E84B]/40'
                          : 'bg-[#EAF3E8] text-[#1E3A2B] border border-[#1E3A2B]/10'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#1E3A2B]">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#2D5A40] font-semibold bg-[#F1F6F0] px-2 py-0.5 rounded-md border border-[#1E3A2B]/8">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{pkg.turnaround}</span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-[#4A584E] font-medium min-h-[36px]">
                    {pkg.desc}
                  </p>

                  {/* Price */}
                  <div className="mt-4 pb-4 border-b border-[#1E3A2B]/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#1E3A2B]">
                        {pkg.price}
                      </span>
                      <span className="text-xs font-semibold text-[#4A584E]">
                        / {pkg.pricePeriod}
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="mt-5 space-y-2.5">
                    {pkg.features.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-medium text-[#2D3A31]">
                        <Check className="w-4 h-4 text-[#2D5A40] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E3A2B]/8">
                  <button
                    onClick={() => onSelectPackage(`${pkg.name} (${pkg.price})`)}
                    className={`w-full py-3.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs ${
                      isStandard
                        ? 'bg-[#1E3A2B] text-white hover:bg-[#0F241A] border border-[#B7E84B]/50 hover:shadow-[0_8px_20px_-4px_rgba(183,232,75,0.4)]'
                        : 'bg-[#F1F6F0] text-[#1E3A2B] hover:bg-[#1E3A2B] hover:text-[#B7E84B] border border-[#1E3A2B]/10'
                    }`}
                  >
                    <span>SELECT {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B7E84B]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Terms Banner */}
        <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-white border border-[#1E3A2B]/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#4A584E]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-[#EAF3E8] text-[#1E3A2B] shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#2D5A40]" />
            </div>
            <div>
              <strong className="block text-[#1E3A2B] font-bold text-sm sm:text-base">
                Transparent 50/50 Milestone Terms
              </strong>
              <span className="text-xs sm:text-[13px] text-[#4A584E] mt-0.5 block">
                50% deposit upfront to begin architecture & design, and the remaining 50% only before final launch & domain deployment.
              </span>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0 bg-[#F1F6F0] px-4 py-3 rounded-2xl border border-[#1E3A2B]/8">
            <span className="font-semibold block text-[#4A584E]">Fast managed edge hosting:</span>
            <strong className="text-[#1E3A2B] font-bold text-sm">$14/mo or $140/yr</strong>
            <span className="text-[10px] text-[#6A786E] block mt-0.5">Includes global CDN, SSL, & automated backups</span>
          </div>
        </div>
      </section>

      {/* Process & Transparency Checklist */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8">
        <div className="bg-[#12241A] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#B7E84B] text-[#0F241A] mb-3 inline-block">
              WHAT’S INCLUDED IN EVERY BUILD
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              NO MATTER THE PACKAGE, OUR CRAFT STANDARDS NEVER WAIVER.
            </h2>
            <p className="mt-3 text-white/70 text-sm leading-relaxed">
              Every CommerceForge project receives our signature performance compression, accessibility standards, responsive mobile tuning, and direct developer communication.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7E84B] shrink-0" />
                <span>Sub-800ms TTFB edge caching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7E84B] shrink-0" />
                <span>100% full source code ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7E84B] shrink-0" />
                <span>Thumb-friendly mobile ergonomics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7E84B] shrink-0" />
                <span>Google Search Console & SEO indexing</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectPackage('STANDARD ($260)')}
            className="px-8 py-4 rounded-full bg-[#B7E84B] text-[#0F241A] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#a5d83a] transition-transform hover:scale-105 shadow-xl shrink-0 cursor-pointer"
          >
            START YOUR PROJECT TODAY
          </button>
        </div>
      </section>

      {/* Scope & Pricing FAQs */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1E3A2B]">
              Frequently Asked Questions About Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#4A584E] mt-1">
              Have questions about deliverables, revisions, or payment security?
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-[#1E3A2B]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#1E3A2B]">
                Are there any hidden costs or recurring mandatory fees?
              </h3>
              <p className="text-xs sm:text-sm text-[#4A584E] mt-2 leading-relaxed">
                Zero. We quote a fixed price for agreed-upon deliverables. You only pay for your own domain name and hosting (which you own 100%). We do not charge recurring retainers unless you explicitly request ongoing monthly maintenance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#1E3A2B]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#1E3A2B]">
                How does the 50/50 payment milestone work?
              </h3>
              <p className="text-xs sm:text-sm text-[#4A584E] mt-2 leading-relaxed">
                You pay a 50% deposit to lock in your sprint schedule and begin architectural design. We build the store on a staging link where you can test everything. The remaining 50% balance is only invoiced once you have approved the build prior to final launch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#1E3A2B]/10 shadow-xs">
              <h3 className="text-sm font-bold text-[#1E3A2B]">
                What if I need custom functionality not listed in these packages?
              </h3>
              <p className="text-xs sm:text-sm text-[#4A584E] mt-2 leading-relaxed">
                We provide custom estimates for bespoke integrations such as 3D visualizers, proprietary booking workflows, or custom ERP synchronization. Select any package or contact us directly to request a custom quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections configured in CMS for Packages Page */}
      <DynamicSectionRenderer page="packages" onHireClick={onHireClick} />
    </div>
  );
};
