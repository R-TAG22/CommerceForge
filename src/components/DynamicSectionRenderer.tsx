import React from 'react';
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
};

interface DynamicSectionRendererProps {
  page: 'home' | 'about' | 'work' | 'packages' | 'faqs' | 'hire-us';
  onHireClick?: () => void;
}

export const DynamicSectionRenderer: React.FC<DynamicSectionRendererProps> = ({ page, onHireClick }) => {
  const { activeContent } = useCMS();
  const { navigate } = useRouter();

  const customSections = activeContent?.customSections || [];
  const pageSections = customSections
    .filter((s: CustomPageSection) => s.page === page && s.published !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  if (pageSections.length === 0) {
    return null;
  }

  const handleCta = (url?: string) => {
    if (!url) {
      if (onHireClick) onHireClick();
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

  return (
    <div className="w-full space-y-12 my-12">
      {pageSections.map((section: CustomPageSection) => {
        const bg = section.backgroundColor || '#EAF3E8';
        const text = section.textColor || '#1E3A2B';
        const accent = section.accentColor || '#B7E84B';

        return (
          <section
            key={section.id}
            id={section.id}
            className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12"
            aria-labelledby={`heading-${section.id}`}
          >
            <div
              className="w-full rounded-3xl p-8 sm:p-12 lg:p-16 border border-black/5 shadow-xs transition-all relative overflow-hidden"
              style={{
                backgroundColor: bg,
                color: text,
              }}
            >
              {/* Subtle background ambient ring */}
              <div
                className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-10 blur-2xl pointer-events-none"
                style={{ backgroundColor: accent }}
              />

              {/* Layout: CARDS */}
              {section.layout === 'cards' && (
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
                        const IconComp = (item.icon && ICON_MAP[item.icon]) ? ICON_MAP[item.icon] : Sparkles;
                        return (
                          <div
                            key={item.id || idx}
                            className="p-6 rounded-2xl bg-white/70 backdrop-blur-xs border border-black/10 shadow-xs hover:shadow-md transition-all hover:translate-y-[-2px]"
                            style={{ color: '#1E3A2B' }}
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-xs"
                              style={{ backgroundColor: accent, color: '#0F241A' }}
                            >
                              <IconComp className="w-5 h-5" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#1E3A2B]">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm text-[#4A584E] leading-relaxed">
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
                        onClick={() => handleCta(section.buttonUrl)}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                        style={{
                          backgroundColor: '#1E3A2B',
                          color: '#FFFFFF',
                        }}
                      >
                        <span>{section.buttonText}</span>
                        <ArrowRight className="w-4 h-4" style={{ color: accent }} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Layout: BANNER */}
              {section.layout === 'banner' && (
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="max-w-2xl">
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.16em] mb-3"
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
                    <p className="mt-4 text-base sm:text-lg opacity-90 leading-relaxed">
                      {section.content}
                    </p>
                  </div>

                  {section.buttonText && (
                    <div className="shrink-0">
                      <button
                        onClick={() => handleCta(section.buttonUrl)}
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
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

              {/* Layout: TEXT-SPLIT */}
              {section.layout === 'text-split' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-3">
                    {section.badge && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
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
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                      {section.content}
                    </p>

                    {section.items && section.items.length > 0 && (
                      <div className="space-y-3">
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
                      <div>
                        <button
                          onClick={() => handleCta(section.buttonUrl)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105"
                          style={{
                            backgroundColor: '#1E3A2B',
                            color: '#FFFFFF',
                          }}
                        >
                          <span>{section.buttonText}</span>
                          <ArrowRight className="w-4 h-4" style={{ color: accent }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Layout: CALLOUT or FEATURES default */}
              {(section.layout === 'callout' || section.layout === 'features') && (
                <div className="border-2 border-black/15 rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      {section.badge && (
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-1.5"
                          style={{
                            backgroundColor: accent,
                            color: '#0F241A',
                          }}
                        >
                          {section.badge}
                        </span>
                      )}
                      <h2 id={`heading-${section.id}`} className="text-xl sm:text-2xl font-black uppercase">
                        {section.title}
                      </h2>
                    </div>

                    {section.buttonText && (
                      <button
                        onClick={() => handleCta(section.buttonUrl)}
                        className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105"
                        style={{
                          backgroundColor: '#1E3A2B',
                          color: '#FFFFFF',
                        }}
                      >
                        {section.buttonText}
                      </button>
                    )}
                  </div>

                  <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                    {section.content}
                  </p>

                  {section.items && section.items.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {section.items.map((item, idx) => (
                        <div key={item.id || idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                          <span className="font-semibold">{item.title}:</span>
                          <span className="opacity-80">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};
