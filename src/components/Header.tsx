import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { CommerceForgeLogo } from './CommerceForgeLogo';
import { useCMS } from '../context/CMSContext';
import { useRouter } from '../admin/router';

interface HeaderProps {
  activeNav?: NavItem;
  onNavClick?: (item: NavItem) => void;
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onHireClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeNav, 
  onNavClick, 
  activeSection, 
  onNavigate, 
  onHireClick 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeContent } = useCMS();
  const { currentPath, navigate } = useRouter();
  const headerData = activeContent?.header;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = (headerData?.navItems
    ? headerData.navItems.filter((i) => i.visible).map((i) => i.label as NavItem)
    : ['HOME', 'ABOUT', 'WORK', 'PACKAGES', 'FAQ']) as NavItem[];

  const brandName = headerData?.brandName || 'Commerce';
  const brandHighlight = headerData?.brandHighlight || 'Forge';
  const brandTagline = headerData?.brandTagline || 'E-COMMERCE AGENCY';
  const ctaText = headerData?.ctaText || 'HIRE US';
  const ctaVisible = headerData?.ctaVisible !== false;

  const PAGE_ROUTES: Record<string, string> = {
    HOME: '/',
    ABOUT: '/about',
    WORK: '/work',
    PACKAGES: '/packages',
    FAQ: '/faqs',
  };

  const handleNav = (item: NavItem) => {
    if (onNavClick) {
      onNavClick(item);
    }
    const targetRoute = PAGE_ROUTES[item];
    if (targetRoute) {
      navigate(targetRoute);
      return;
    }

    const sectionMap: Record<string, string> = {
      HOME: 'hero',
      WORK: 'work',
      PACKAGES: 'packages',
      PROCESS: 'process',
      ABOUT: 'about',
      FAQ: 'faq',
    };
    const targetId = sectionMap[item] || item.toLowerCase();
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine which nav item is active based on current URL path
  const getIsActive = (item: NavItem) => {
    if (currentPath === '/' && item === 'HOME') return true;
    if (currentPath === '/about' && item === 'ABOUT') return true;
    if (currentPath === '/work' && item === 'WORK') return true;
    if (currentPath === '/packages' && item === 'PACKAGES') return true;
    if ((currentPath === '/faqs' || currentPath === '/faq') && item === 'FAQ') return true;

    if (activeNav) return activeNav === item;
    return false;
  };

  const handleHireClick = () => {
    navigate('/hire-us');
    if (onHireClick) onHireClick();
  };

  return (
    <>
      {/* Accessibility Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[#1E3A2B] text-white font-bold text-xs rounded-xl shadow-lg border border-[#B7E84B] focus:outline-none focus:ring-2 focus:ring-[#B7E84B]"
      >
        Skip to main content
      </a>

      <div 
        id="main-header-wrapper" 
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-200 ${
          isScrolled 
            ? 'bg-[#F8FAF8]/95 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(30,58,43,0.08)] border-b border-[#1E3A2B]/10 py-2.5 sm:py-3' 
            : 'bg-[#F8FAF8]/90 backdrop-blur-sm border-b border-[#8FA98F]/20 py-3 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 lg:px-10 xl:px-12 select-none">
          <header id="main-header" className="w-full flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo & Title */}
            <button 
              id="header-logo-btn"
              onClick={() => handleNav('HOME')}
              className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none transition-transform active:scale-95 text-left shrink-0 cursor-pointer"
              aria-label="CommerceForge Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-105 rounded-xl bg-white/80 p-1 border border-[#8FA98F]/30 shadow-xs shrink-0">
                <CommerceForgeLogo className="w-full h-full object-contain filter drop-shadow-xs" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center tracking-tight">
                  <span className="font-black text-lg sm:text-xl md:text-2xl tracking-[-0.03em]">
                    <span className="text-[#1E3A2B]">{brandName}</span>
                    <span className="text-[#B7E84B]/90 group-hover:text-[#B7E84B] transition-colors duration-300">{brandHighlight}</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B] ml-1 sm:ml-1.5 mb-0.5 shadow-[0_0_8px_#B7E84B]"></span>
                </div>
                <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#4A584E] font-bold -mt-0.5">
                  {brandTagline}
                </span>
              </div>
            </button>

            {/* Center Navigation Links (Desktop & Tablet) */}
            <nav id="header-nav" className="hidden md:flex items-center gap-6 lg:gap-9 xl:gap-11" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = getIsActive(item);
                return (
                  <button
                    key={item}
                    id={`nav-link-${item.toLowerCase()}`}
                    onClick={() => handleNav(item)}
                    className={`relative py-1 text-xs lg:text-sm font-bold tracking-[0.16em] lg:tracking-[0.18em] transition-all duration-200 uppercase cursor-pointer ${
                      isActive 
                        ? 'text-[#1E3A2B]' 
                        : 'text-[#4A584E] hover:text-[#1E3A2B] hover:tracking-[0.20em]'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-[#B7E84B] rounded-full shadow-[0_0_8px_rgba(183,232,75,0.7)]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right CTA Button */}
            {ctaVisible && (
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  id="btn-hire-us"
                  onClick={handleHireClick}
                  className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-7 py-2 sm:py-2.5 rounded-full bg-[#1E3A2B] text-white text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase border border-transparent hover:border-[#B7E84B] hover:shadow-[0_0_20px_rgba(183,232,75,0.4)] hover:scale-[1.03] active:scale-[0.97] hover:bg-[#162C20] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B7E84B]/60 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B] group-hover:scale-125 transition-transform shadow-[0_0_6px_#B7E84B]"></span>
                  <span>{ctaText}</span>
                </button>
              </div>
            )}
          </header>

        {/* Mobile Navigation Links Row (Horizontally scrollable if needed with zero scrollbar) */}
        <nav 
          id="mobile-header-nav" 
          className="flex md:hidden items-center justify-start sm:justify-center gap-4 sm:gap-6 pt-2.5 pb-0.5 overflow-x-auto no-scrollbar scroll-smooth" 
          aria-label="Mobile Navigation"
        >
          {navItems.map((item) => {
            const isActive = getIsActive(item);
            return (
              <button
                key={item}
                id={`mobile-nav-link-${item.toLowerCase()}`}
                onClick={() => handleNav(item)}
                className={`relative shrink-0 py-1 px-1 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-200 ${
                  isActive 
                    ? 'text-[#1E3A2B] font-extrabold' 
                    : 'text-[#4A584E] hover:text-[#1E3A2B]'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#B7E84B] rounded-full shadow-[0_0_6px_rgba(183,232,75,0.7)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
    </>
  );
};

