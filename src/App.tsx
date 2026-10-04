import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from './hooks/useReducedMotion';
import { RouterProvider, useRouter } from './admin/router';
import { CMSProvider, useCMS } from './context/CMSContext';
import { ToastProvider } from './admin/components/Toast';
import { AdminRouter } from './admin/AdminRouter';
import { Header } from './components/Header';
import { HeroContent } from './components/HeroContent';
import { HeroMedia } from './components/HeroMedia';
import { MetricsBar } from './components/MetricsBar';
import { ComparisonSection } from './components/ComparisonSection';
import { ProcessSection } from './components/ProcessSection';
import { BlogFaqSection } from './components/BlogFaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { PublicThemeProvider, usePublicTheme } from './context/PublicThemeContext';
import { ThemeSyncProvider } from './context/ThemeSyncContext';

// Dedicated Separate Pages
import { AboutPage } from './components/AboutPage';
import { WorkPage } from './components/WorkPage';
import { PackagesPage } from './components/PackagesPage';
import { FaqsPage } from './components/FaqsPage';
import { HireUsPage } from './components/HireUsPage';
import { BlogPage } from './components/BlogPage';
import { DynamicSectionRenderer } from './components/DynamicSectionRenderer';

function PublicWebsite() {
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('STANDARD ($260)');
  const { activeContent, isPreviewMode, setIsPreviewMode } = useCMS();
  const { currentPath, navigate } = useRouter();
  const { isDark } = usePublicTheme();
  const prefersReducedMotion = useReducedMotion();
  const heroData = activeContent?.hero;

  // Structured Data (JSON-LD) for SEO and Rich Snippets
  useEffect(() => {
    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://r-tag22.github.io/CommerceForge';

    const normalizedBase = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/';
    const logoUrl = `${origin}${normalizedBase.startsWith('/') ? '' : '/'}${normalizedBase}LOGO.png`;
    const siteUrl = `${origin}${normalizedBase.startsWith('/') ? '' : '/'}${normalizedBase}`;

    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CommerceForge',
      url: siteUrl,
      logo: logoUrl,
      description: 'High-performance e-commerce design and optimization agency',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Sales',
        email: 'hello@commerceforge.com',
      },
    };

    // LocalBusiness Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'CommerceForge',
      image: logoUrl,
      description: 'E-commerce optimization agency',
      url: siteUrl,
      telephone: '+1-800-555-0199',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.id = 'schema-org-organization';
    script1.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.id = 'schema-org-localbusiness';
    script2.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.head.contains(script2)) {
        document.head.removeChild(script2);
      }
    };
  }, []);

  // Scroll to targeted section
  const scrollToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle hash scrolling on page navigation or reload
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace(/^#\/?/, '').replace(/^#/, '');
      if (hashId) {
        const timer = setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPath]);

  // SEO Page Title updates
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'CommerceForge — Web Design & Performance Dev Team',
      '/about': 'About Our Dev Team & Craft — CommerceForge',
      '/work': 'Selected Work & Rebuild Case Studies — CommerceForge',
      '/packages': 'Productized Packages & Rates — CommerceForge',
      '/blog': 'Blog & Engineering Insights — CommerceForge',
      '/blogs': 'Blog & Engineering Insights — CommerceForge',
      '/faqs': 'Frequently Asked Questions — CommerceForge',
      '/faq': 'Frequently Asked Questions — CommerceForge',
      '/hire-us': 'Hire Us & Start a Project — CommerceForge',
      '/contact': 'Hire Us & Start a Project — CommerceForge',
    };
    document.title = titles[currentPath] || 'CommerceForge — Web Performance Dev Team';
  }, [currentPath]);

  const handleOpenInquiryWithPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsInquiryOpen(true);
  };

  // Render content based on current route
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/about':
        return (
          <>
            <AboutPage onHireClick={() => setIsInquiryOpen(true)} />
            <DynamicSectionRenderer page="about" onHireClick={() => setIsInquiryOpen(true)} />
            <CtaBanner onCtaClick={() => setIsInquiryOpen(true)} />
          </>
        );

      case '/work':
        return (
          <>
            <WorkPage onHireClick={() => setIsInquiryOpen(true)} />
            <DynamicSectionRenderer page="work" onHireClick={() => setIsInquiryOpen(true)} />
            <CtaBanner onCtaClick={() => setIsInquiryOpen(true)} />
          </>
        );

      case '/packages':
        return (
          <>
            <PackagesPage 
              onSelectPackage={handleOpenInquiryWithPackage} 
              onHireClick={() => setIsInquiryOpen(true)} 
            />
            <CtaBanner onCtaClick={() => setIsInquiryOpen(true)} />
          </>
        );

      case '/faqs':
      case '/faq':
        return (
          <>
            <FaqsPage onCtaClick={() => setIsInquiryOpen(true)} />
            <CtaBanner onCtaClick={() => setIsInquiryOpen(true)} />
          </>
        );

      case '/hire-us':
      case '/contact':
        return (
          <>
            <HireUsPage />
            <CtaBanner onCtaClick={() => setIsInquiryOpen(true)} />
          </>
        );

      case '/blog':
      case '/blogs':
        return (
          <>
            <BlogPage onHireClick={() => setIsInquiryOpen(true)} />
            <DynamicSectionRenderer page="blog" onHireClick={() => setIsInquiryOpen(true)} />
            <CtaBanner onCtaClick={() => setIsInquiryOpen(true)} />
          </>
        );

      case '/':
      default: {
        const defaultHomeSections = [
          { id: 'hero', name: 'Hero Showcase & Before/After Frame', type: 'hero', visible: true, sortOrder: 0 },
          { id: 'logos', name: 'Client Brand Logos Marquee', type: 'logos', visible: true, sortOrder: 1 },
          { id: 'comparison', name: 'Performance Comparison Table', type: 'comparison', visible: true, sortOrder: 2 },
          { id: 'process', name: '4-Step Rebuild Process', type: 'process', visible: true, sortOrder: 3 },
          { id: 'blog-faq', name: 'Blog Insights & FAQs', type: 'blog-faq', visible: true, sortOrder: 4 },
          { id: 'cta', name: 'Bottom Call To Action Banner', type: 'cta', visible: true, sortOrder: 5 },
        ];

        let homeSections = (activeContent?.pageSections?.home && activeContent.pageSections.home.length > 0)
          ? [...activeContent.pageSections.home]
          : defaultHomeSections;

        // Ensure Blog & FAQs section is always present directly below the Process section
        if (!homeSections.some((s) => s.id === 'blog-faq' || s.type === 'blog-faq' || s.id === 'blog')) {
          const processIdx = homeSections.findIndex((s) => s.id === 'process' || s.type === 'process');
          const blogFaqSection = { id: 'blog-faq', name: 'Blog Insights & FAQs', type: 'blog-faq', visible: true, sortOrder: 3.5 };
          if (processIdx !== -1) {
            homeSections.splice(processIdx + 1, 0, blogFaqSection);
          } else {
            homeSections.push(blogFaqSection);
          }
        }

        const visibleSections = [...homeSections]
          .filter((s) => s.visible !== false)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

        return (
          <>
            {visibleSections.map((section) => {
              switch (section.type || section.id) {
                case 'hero':
                  return (
                    <motion.section 
                      key={section.id}
                      id="hero"
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.65,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-3 sm:pt-6 pb-12 lg:pb-16"
                      aria-label="Hero Showcase"
                    >
                      {/* TOP: Concise Headline & Subheadline */}
                      <div className="w-full max-w-3xl mx-auto mb-4 sm:mb-6">
                        <HeroContent onCtaClick={() => setIsInquiryOpen(true)} />
                      </div>

                      {/* CENTERPIECE: Interactive Before & After Feature Frame */}
                      <div className="w-full max-w-[1480px] mx-auto">
                        <HeroMedia />
                      </div>

                      {/* BOTTOM OF HERO: Action Buttons & Micro-Trust Line */}
                      <div className="mt-7 sm:mt-9 flex flex-col items-center justify-center w-full max-w-xl mx-auto text-center px-4">
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
                          <button
                            id="hero-primary-cta-btn"
                            onClick={() => {
                              const targetUrl = heroData?.primaryCtaUrl || '#contact';
                              if (targetUrl === '#contact' || targetUrl.toLowerCase().includes('inquiry')) {
                                setIsInquiryOpen(true);
                              } else {
                                navigate(targetUrl);
                              }
                            }}
                            className={`group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-[0.08em] uppercase border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#B7E84B]/30 cursor-pointer shadow-lg ${
                              isDark
                                ? 'bg-[#B7E84B] text-[#0B0F17] border-[#B7E84B] hover:bg-[#a3d438] hover:shadow-[0_0_25px_rgba(183,232,75,0.4)]'
                                : 'bg-gradient-to-r from-[#064E3B] to-[#047857] text-white border-[#B7E84B]/40 hover:from-[#059669] hover:to-[#064E3B] hover:shadow-[0_12px_28px_-6px_rgba(6,78,59,0.3)]'
                            }`}
                          >
                            <span>{heroData?.primaryCtaText || 'GET A FREE QUOTE'}</span>
                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 ${
                              isDark ? 'text-[#0B0F17]' : 'text-[#B7E84B]'
                            }`} />
                          </button>

                          <button
                            id="hero-packages-cta-btn"
                            onClick={() => navigate(heroData?.secondaryCtaUrl || '/packages')}
                            className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-[0.08em] uppercase border transition-all duration-200 shadow-xs cursor-pointer ${
                              isDark
                                ? 'bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-[#B7E84B]'
                                : 'bg-white text-[#064E3B] border-[#064E3B]/15 hover:border-[#059669] hover:text-[#064E3B] hover:bg-[#FAFAF9]'
                            }`}
                          >
                            <span>{heroData?.secondaryCtaText || 'VIEW PACKAGES'}</span>
                          </button>
                        </div>

                        {/* Subtle Micro-Trust Line */}
                        <div className={`mt-3 sm:mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold tracking-wide transition-colors ${
                          isDark ? 'text-white/70' : 'text-[#064E3B]/80'
                        }`}>
                          {heroData?.guarantees && heroData.guarantees.length > 0 ? (
                            heroData.guarantees.map((g, idx) => (
                              <React.Fragment key={g.id || idx}>
                                {idx > 0 && <span className="opacity-40">•</span>}
                                <span>{g.text}</span>
                              </React.Fragment>
                            ))
                          ) : (
                            <>
                              <span className="flex items-center gap-1.5">⚡ 7–10 Day Delivery</span>
                              <span className="opacity-40">•</span>
                              <span>Starting at $159</span>
                              <span className="opacity-40">•</span>
                              <span>100% Handcrafted Code</span>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.section>
                  );

                case 'logos':
                  return <MetricsBar key={section.id} />;

                case 'comparison':
                  return <ComparisonSection key={section.id} onCtaClick={() => setIsInquiryOpen(true)} />;

                case 'process':
                  return <ProcessSection key={section.id} onCtaClick={() => setIsInquiryOpen(true)} />;

                case 'blog-faq':
                case 'blog':
                case 'faq':
                  return <BlogFaqSection key={section.id} onCtaClick={() => setIsInquiryOpen(true)} />;

                case 'cta':
                  return <CtaBanner key={section.id} onCtaClick={() => setIsInquiryOpen(true)} />;

                default:
                  return null;
              }
            })}

            {/* Dynamic Sections configured for Home Page in CMS */}
            <DynamicSectionRenderer page="home" onHireClick={() => setIsInquiryOpen(true)} />
          </>
        );
      }
    }
  };

  return (
    <div 
      id="scrollable-team-website"
      className={`min-h-screen w-full relative selection:bg-[#B7E84B]/40 selection:text-[#0F241A] transition-colors duration-300 flex flex-col ${
        isDark ? 'bg-[#0B0F17] text-white' : 'bg-[#F8FAF8] text-[#064E3B]'
      }`}
    >
      {/* WCAG 2.1 AA Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#B7E84B] focus:text-[#0F241A] focus:font-black focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-xl focus:shadow-2xl focus:ring-4 focus:ring-emerald-400 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Discreet Preview Mode Status Bar */}
      {isPreviewMode && (
        <div className="sticky top-0 z-50 bg-[#0E1F16] border-b border-[#B7E84B]/40 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-ping" />
            <span className="font-bold text-[#B7E84B]">CMS Preview Mode</span>
            <span className="text-white/60 hidden sm:inline">• Viewing current draft changes before publishing</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="px-3 py-1 rounded-full bg-[#B7E84B] text-[#0F241A] font-bold text-[11px] uppercase tracking-wider hover:bg-[#a5d83a] transition-all cursor-pointer"
            >
              Return to Admin
            </button>
            <button
              onClick={() => setIsPreviewMode(false)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 font-medium text-[11px] uppercase tracking-wider transition-all cursor-pointer"
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

      {/* Ambient Radial Accents */}
      <div 
        className={`fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-80 blur-3xl -z-10 transition-opacity duration-500 ${
          isDark 
            ? 'bg-radial from-[#B7E84B]/10 via-[#064E3B]/10 to-transparent' 
            : 'bg-radial from-[#B7E84B]/15 via-[#8FA98F]/5 to-transparent'
        }`} 
      />
      <div 
        className={`fixed -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none rounded-full blur-3xl -z-10 transition-opacity duration-500 ${
          isDark 
            ? 'bg-radial from-[#064E3B]/15 to-transparent' 
            : 'bg-radial from-[#064E3B]/8 to-transparent'
        }`} 
      />

      {/* 1. Sticky Navigation Header */}
      <Header
        onNavigate={scrollToSection}
        onHireClick={() => setIsInquiryOpen(true)}
      />

      {/* Main Content Area Landmark */}
      <main id="main-content" role="main" tabIndex={-1} className="outline-none flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Dev Team Footer */}
      <Footer 
        onNavigate={scrollToSection} 
        onOpenInquiry={() => setIsInquiryOpen(true)} 
      />

      {/* Project Inquiry & Quote Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialPackage={selectedPackage}
      />
    </div>
  );
}

function MainAppShell() {
  const { isAdminRoute } = useRouter();

  if (isAdminRoute) {
    return <AdminRouter />;
  }

  return <PublicWebsite />;
}

export default function App() {
  return (
    <RouterProvider>
      <CMSProvider>
        <ThemeSyncProvider>
          <PublicThemeProvider>
            <ToastProvider>
              <MainAppShell />
            </ToastProvider>
          </PublicThemeProvider>
        </ThemeSyncProvider>
      </CMSProvider>
    </RouterProvider>
  );
}
