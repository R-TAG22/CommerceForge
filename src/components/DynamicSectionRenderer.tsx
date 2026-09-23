import React from 'react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { CustomPageSection } from '../types/cms';
import { useRouter } from '../admin/router';
import {
  Zap,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  Layers,
  Code,
  Quote,
  ExternalLink,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Star,
  Award,
  Layers,
  Code,
  Quote,
};

interface DynamicSectionRendererProps {
  page?: 'home' | 'about' | 'work' | 'packages' | 'faqs' | 'hire-us' | string;
  pageSlug?: string;
  onCtaClick?: () => void;
  onHireClick?: () => void;
}

export const DynamicSectionRenderer: React.FC<DynamicSectionRendererProps> = ({
  page,
  pageSlug,
  onCtaClick,
  onHireClick,
}) => {
  const { activeContent } = useCMS();
  const { navigate } = useRouter();

  const targetPage = pageSlug || page;
  const customSections = activeContent?.customSections || [];
  const pageSections = customSections
    .filter((s: CustomPageSection) => (targetPage ? s.page === targetPage : true) && s.published !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  if (pageSections.length === 0) {
    return null;
  }

  const handleCta = (url?: string) => {
    if (!url) {
      if (onHireClick) onHireClick();
      else if (onCtaClick) onCtaClick();
      return;
    }
    if (url.startsWith('/')) {
      navigate(url);
    } else if (url.startsWith('#')) {
      const el = document.getElementById(url.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getBackgroundStyles = (section: CustomPageSection) => {
    switch (section.backgroundStyle) {
      case 'dark-studio':
        return {
          bgClass: 'bg-[#0B0F17] text-white border-white/10 shadow-2xl',
          defaultText: '#FFFFFF',
          defaultAccent: '#10B981',
          isGlass: false,
        };
      case 'crisp-light':
        return {
          bgClass: 'bg-[#FAFAF9] text-[#064E3B] border-black/10 shadow-md',
          defaultText: '#064E3B',
          defaultAccent: '#059669',
          isGlass: false,
        };
      case 'forest-muted':
        return {
          bgClass: 'bg-[#12241A] text-white border-white/10 shadow-xl',
          defaultText: '#FFFFFF',
          defaultAccent: '#B7E84B',
          isGlass: false,
        };
      case 'charcoal-glass':
        return {
          bgClass: 'bg-white/5 backdrop-blur-md text-white border-white/10 shadow-2xl',
          defaultText: '#FFFFFF',
          defaultAccent: '#10B981',
          isGlass: true,
        };
      default:
        // custom or legacy
        return {
          bgClass: 'border-black/5 shadow-xs',
          defaultText: section.textColor || '#1E3A2B',
          defaultAccent: section.accentColor || '#B7E84B',
          customBg: section.backgroundColor || '#EAF3E8',
          isGlass: false,
        };
    }
  };

  return (
    <div className="w-full space-y-12 my-12">
      {pageSections.map((section: CustomPageSection) => {
        const bgConf = getBackgroundStyles(section);
        const accent = section.accentColor || bgConf.defaultAccent;
        const textColor = section.textColor || bgConf.defaultText;
        const anchorId = section.anchorId ? section.anchorId.replace(/^#/, '') : section.id;
        const template = section.templateType || section.layout || 'cards';

        return (
          <motion.section
            key={section.id}
            id={anchorId}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 scroll-mt-24"
            aria-labelledby={`heading-${section.id}`}
          >
            <div
              className={`w-full rounded-3xl p-8 sm:p-12 lg:p-16 border transition-all relative overflow-hidden ${bgConf.bgClass}`}
              style={{
                backgroundColor: bgConf.customBg,
                color: textColor,
              }}
            >
              {/* Decorative radial blur in corner */}
              <div
                className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />

              {/* 1. TEMPLATE: RICH TEXT & MEDIA (split 50/50 image & text) */}
              {template === 'rich-text-media' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      section.mediaPosition === 'left' ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xs"
                        style={{ backgroundColor: accent, color: '#0F241A' }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2
                      id={`heading-${section.id}`}
                      className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight"
                    >
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-80">
                        {section.subtitle}
                      </p>
                    )}
                    <p className="text-base sm:text-lg opacity-90 leading-relaxed max-w-xl">
                      {section.content}
                    </p>

                    {section.items && section.items.length > 0 && (
                      <div className="space-y-3 pt-2">
                        {section.items.map((item, idx) => (
                          <div key={item.id || idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                            <div>
                              <strong className="block text-sm font-bold">{item.title}</strong>
                              <span className="text-xs opacity-80">{item.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.buttonText && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleCta(section.buttonUrl)}
                          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                          style={{
                            backgroundColor: accent,
                            color: '#0F241A',
                          }}
                        >
                          <span>{section.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className={`lg:col-span-6 ${
                      section.mediaPosition === 'left' ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 aspect-video sm:aspect-4/3 flex items-center justify-center group">
                      {section.mediaUrl ? (
                        <img
                          src={section.mediaUrl}
                          alt={section.mediaAlt || section.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-white/50">
                          <Layers className="w-12 h-12 mb-3 text-emerald-400" />
                          <span className="text-xs uppercase font-bold tracking-wider">
                            Media Asset Placeholder
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TEMPLATE: LOGO CLOUD / CLIENT TRUST GRID */}
              {template === 'logo-cloud' && (
                <div className="space-y-8 text-center max-w-5xl mx-auto">
                  <div>
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-3 shadow-xs"
                        style={{ backgroundColor: accent, color: '#0F241A' }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2
                      id={`heading-${section.id}`}
                      className="text-2xl sm:text-4xl font-black uppercase tracking-tight"
                    >
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-75 mt-1">
                        {section.subtitle}
                      </p>
                    )}
                    {section.content && (
                      <p className="mt-3 text-sm sm:text-base opacity-80 max-w-2xl mx-auto">
                        {section.content}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4">
                    {(section.logos && section.logos.length > 0
                      ? section.logos
                      : [
                          { id: '1', name: 'Gold & Grove' },
                          { id: '2', name: 'Rosemira' },
                          { id: '3', name: 'HAOMA Earth' },
                          { id: '4', name: 'Juice Beauty' },
                          { id: '5', name: "Doctor's Select" },
                          { id: '6', name: 'Coalition LA' },
                        ]
                    ).map((logo) => (
                      <div
                        key={logo.id}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center text-center group hover:bg-white/10"
                      >
                        {logo.logoUrl ? (
                          <img
                            src={logo.logoUrl}
                            alt={logo.name}
                            className="max-h-8 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                          />
                        ) : (
                          <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase opacity-80 group-hover:opacity-100">
                            {logo.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {section.buttonText && (
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => handleCta(section.buttonUrl)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                        style={{ backgroundColor: accent, color: '#0F241A' }}
                      >
                        <span>{section.buttonText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. TEMPLATE: FEATURE CARDS GRID */}
              {(template === 'feature-cards' || template === 'cards') && (
                <div className="space-y-8">
                  <div className="max-w-3xl">
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.16em] mb-3 shadow-xs"
                        style={{
                          backgroundColor: accent,
                          color: '#0F241A',
                        }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2
                      id={`heading-${section.id}`}
                      className="text-2xl sm:text-4xl font-black uppercase tracking-tight"
                    >
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-75 mt-1">
                        {section.subtitle}
                      </p>
                    )}
                    {section.content && (
                      <p className="mt-4 text-base sm:text-lg opacity-90 leading-relaxed max-w-2xl">
                        {section.content}
                      </p>
                    )}
                  </div>

                  {section.items && section.items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                      {section.items.map((item, idx) => {
                        const IconComp =
                          item.icon && ICON_MAP[item.icon] ? ICON_MAP[item.icon] : Sparkles;
                        return (
                          <div
                            key={item.id || idx}
                            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 shadow-xs hover:shadow-lg transition-all hover:translate-y-[-2px]"
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-xs"
                              style={{ backgroundColor: accent, color: '#0F241A' }}
                              aria-hidden="true"
                            >
                              <IconComp className="w-5 h-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm opacity-85 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {section.buttonText && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleCta(section.buttonUrl)}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                        style={{
                          backgroundColor: accent,
                          color: '#0F241A',
                        }}
                      >
                        <span>{section.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 4. TEMPLATE: TESTIMONIAL / REVIEW CAROUSEL */}
              {template === 'testimonials' && (
                <div className="space-y-8 max-w-6xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto">
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-3 shadow-xs"
                        style={{ backgroundColor: accent, color: '#0F241A' }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2
                      id={`heading-${section.id}`}
                      className="text-2xl sm:text-4xl font-black uppercase tracking-tight"
                    >
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-75 mt-1">
                        {section.subtitle}
                      </p>
                    )}
                    {section.content && (
                      <p className="mt-3 text-sm sm:text-base opacity-85">{section.content}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {(section.testimonials && section.testimonials.length > 0
                      ? section.testimonials
                      : [
                          {
                            id: 't1',
                            quote:
                              'CommerceForge rebuilt our store in 8 days. Our conversion rate instantly leaped from 1.4% to 3.8%!',
                            author: 'Marcus Vance',
                            role: 'Founder',
                            company: 'Gold & Grove',
                            rating: 5,
                          },
                          {
                            id: 't2',
                            quote:
                              'Our mobile bounce rate dropped by 42%. The engineering quality and transparency were top tier.',
                            author: 'Elena Reyes',
                            role: 'Head of Growth',
                            company: 'Rosemira Organics',
                            rating: 5,
                          },
                          {
                            id: 't3',
                            quote:
                              'No bloated agencies or retainer nonsense. Just rapid, ultra-performant e-commerce delivery.',
                            author: 'Tyler Chen',
                            role: 'Co-Founder',
                            company: 'HAOMA Earth',
                            rating: 5,
                          },
                        ]
                    ).map((rev) => (
                      <div
                        key={rev.id}
                        className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between hover:border-white/30 transition-all shadow-md"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <p className="text-sm sm:text-base italic leading-relaxed opacity-90">
                            "{rev.quote}"
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                            style={{ backgroundColor: accent, color: '#0F241A' }}
                          >
                            {rev.author.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold">{rev.author}</h4>
                            <span className="text-[11px] opacity-70 block">
                              {rev.role} {rev.company ? `• ${rev.company}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {section.buttonText && (
                    <div className="text-center pt-4">
                      <button
                        type="button"
                        onClick={() => handleCta(section.buttonUrl)}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                        style={{ backgroundColor: accent, color: '#0F241A' }}
                      >
                        <span>{section.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 5. TEMPLATE: CUSTOM CTA BANNER (2 action buttons, guarantees) */}
              {(template === 'cta-banner' || template === 'banner') && (
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="max-w-2xl space-y-3">
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.16em]"
                        style={{
                          backgroundColor: accent,
                          color: '#0F241A',
                        }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2
                      id={`heading-${section.id}`}
                      className="text-2xl sm:text-4xl font-black uppercase tracking-tight"
                    >
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-75">
                        {section.subtitle}
                      </p>
                    )}
                    <p className="mt-4 text-base sm:text-lg opacity-90 leading-relaxed">
                      {section.content}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {section.buttonText && (
                      <button
                        type="button"
                        onClick={() => handleCta(section.buttonUrl)}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                        style={{
                          backgroundColor: accent,
                          color: '#0F241A',
                        }}
                      >
                        <span>{section.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {section.secondaryButtonText && (
                      <button
                        type="button"
                        onClick={() => handleCta(section.secondaryButtonUrl)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                      >
                        <span>{section.secondaryButtonText}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 6. TEMPLATE: RAW EMBED / CUSTOM CODE BLOCK */}
              {template === 'raw-embed' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      {section.badge && (
                        <span
                          className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-2"
                          style={{ backgroundColor: accent, color: '#0F241A' }}
                        >
                          {section.badge}
                        </span>
                      )}
                      <h2
                        id={`heading-${section.id}`}
                        className="text-xl sm:text-3xl font-black uppercase"
                      >
                        {section.title}
                      </h2>
                    </div>
                    <div className="p-2 rounded-xl bg-white/10 text-white/70">
                      <Code className="w-5 h-5" />
                    </div>
                  </div>

                  {section.content && (
                    <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  {section.embedCode ? (
                    <div
                      className="w-full rounded-2xl overflow-hidden p-6 bg-black/40 border border-white/10 text-white text-sm"
                      dangerouslySetInnerHTML={{ __html: section.embedCode }}
                    />
                  ) : (
                    <div className="p-8 rounded-2xl bg-black/30 border border-white/10 text-center text-white/50 text-xs uppercase font-mono">
                      [Raw Embed / Code Frame: Configure code in CMS]
                    </div>
                  )}
                </div>
              )}

              {/* Legacy fallback: TEXT-SPLIT */}
              {template === 'text-split' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-3">
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
                        style={{ backgroundColor: accent, color: '#0F241A' }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2
                      id={`heading-${section.id}`}
                      className="text-2xl sm:text-4xl font-black uppercase tracking-tight"
                    >
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider opacity-75">
                        {section.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                      {section.content}
                    </p>

                    {section.buttonText && (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleCta(section.buttonUrl)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer"
                          style={{ backgroundColor: accent, color: '#0F241A' }}
                        >
                          <span>{section.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
};
