import React, { useState, useEffect } from 'react';
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
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';

// Dedicated Separate Pages
import { AboutPage } from './components/AboutPage';
import { WorkPage } from './components/WorkPage';
import { PackagesPage } from './components/PackagesPage';
import { FaqsPage } from './components/FaqsPage';
import { HireUsPage } from './components/HireUsPage';
import { DynamicSectionRenderer } from './components/DynamicSectionRenderer';

function PublicWebsite() {
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('STANDARD ($260)');
  const { isPreviewMode, setIsPreviewMode } = useCMS();
  const { currentPath, navigate } = useRouter();

  // Scroll to targeted section
  const scrollToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SEO Page Title updates
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'CommerceForge — Web Design & Performance Studio',
      '/about': 'About Our Studio & Craft — CommerceForge',
      '/work': 'Selected Work & Rebuild Case Studies — CommerceForge',
      '/packages': 'Productized Packages & Rates — CommerceForge',
      '/faqs': 'Frequently Asked Questions — CommerceForge',
      '/faq': 'Frequently Asked Questions — CommerceForge',
      '/hire-us': 'Hire Us & Start a Project — CommerceForge',
      '/contact': 'Hire Us & Start a Project — CommerceForge',
    };
    document.title = titles[currentPath] || 'CommerceForge — Web Performance Studio';
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

      case '/':
      default:
        return (
          <>
            {/* 2. Home Page Hero Section: Headline at TOP, Before & After Feature BELOW and BIG */}
            <section 
              id="hero"
              className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-10 pb-16 lg:pb-24"
              aria-label="Hero Showcase"
            >
              {/* TOP: Headline, Subheadline, CTAs & Guarantees */}
              <div className="w-full max-w-4xl mx-auto mb-10 lg:mb-14">
                <HeroContent 
                  onCtaClick={() => setIsInquiryOpen(true)} 
                  onExplorePackages={() => navigate('/packages')}
                />
              </div>

              {/* BELOW: Interactive Before & After Feature (Enlarged) */}
              <div className="w-full max-w-[1340px] mx-auto">
                <HeroMedia />
              </div>
            </section>

            {/* 3. Performance & Trust Metrics Bar */}
            <MetricsBar />

            {/* 4. Why Rebuild? Old Way vs New Way Comparison */}
            <ComparisonSection onCtaClick={() => setIsInquiryOpen(true)} />

            {/* 7. The 4-Step Rebuild Process */}
            <ProcessSection onCtaClick={() => setIsInquiryOpen(true)} />

            {/* 8. Dynamic Sections configured for Home Page in CMS */}
            <DynamicSectionRenderer page="home" onHireClick={() => setIsInquiryOpen(true)} />

            {/* 9. About the Studio Teaser */}
            <AboutSection onCtaClick={() => setIsInquiryOpen(true)} />

            {/* 10. Frequently Asked Questions */}
            <FaqSection onCtaClick={() => setIsInquiryOpen(true)} />

            {/* 11. Bottom High-Impact Call to Action Banner */}
            <CtaBanner onCtaClick={() => setIsInquiryOpen(true)} />
          </>
        );
    }
  };

  return (
    <div 
      id="scrollable-studio-website"
      className="min-h-screen w-full bg-[#F8FAF8] text-[#1E3A2B] relative selection:bg-[#B7E84B]/40 selection:text-[#0F241A] overflow-x-hidden"
    >
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

      {/* Studio Background Ambient Radial Accents */}
      <div 
        className="fixed top-0 right-0 w-[600px] h-[600px] bg-radial from-[#B7E84B]/15 via-[#8FA98F]/5 to-transparent pointer-events-none opacity-80 blur-3xl -z-10" 
      />
      <div 
        className="fixed -bottom-20 -left-20 w-[500px] h-[500px] bg-radial from-[#1E3A2B]/8 to-transparent pointer-events-none rounded-full blur-3xl -z-10" 
      />

      {/* 1. Sticky Navigation Header */}
      <Header
        onNavigate={scrollToSection}
        onHireClick={() => setIsInquiryOpen(true)}
      />

      {/* Main Content Area Landmark */}
      <main id="main-content" role="main" tabIndex={-1} className="outline-none">
        {renderCurrentPage()}
      </main>

      {/* Studio Footer */}
      <Footer onNavigate={scrollToSection} />

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
        <ToastProvider>
          <MainAppShell />
        </ToastProvider>
      </CMSProvider>
    </RouterProvider>
  );
}
