import React from 'react';
import { CommerceForgeLogo } from './CommerceForgeLogo';
import { ArrowUp, Lock } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useRouter } from '../admin/router';

interface FooterProps {
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { activeContent } = useCMS();
  const { navigate } = useRouter();
  const footerData = activeContent?.footer;
  const brandData = activeContent?.brand;
  const headerData = activeContent?.header;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterNav = (target: string) => {
    const routeMap: Record<string, string> = {
      packages: '/packages',
      work: '/work',
      about: '/about',
      faq: '/faqs',
      faqs: '/faqs',
      contact: '/hire-us',
      'hire-us': '/hire-us',
    };
    if (routeMap[target]) {
      navigate(routeMap[target]);
    } else if (onNavigate) {
      onNavigate(target);
    }
  };

  const copyrightText = footerData?.copyrightText || `© ${new Date().getFullYear()} CommerceForge Studio. All rights reserved. Transparent web design for local businesses.`;
  const email = footerData?.contactEmail || (footerData as any)?.email || 'contact@commerceforge.agency';
  const locationText = footerData?.locationText || 'Built with pride in the Philippines 🇵🇭';

  return (
    <footer id="main-footer" className="w-full bg-[#0B1711] text-white pt-16 pb-12 border-t border-[#1E3A2B]/40">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Studio Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white p-1">
                <CommerceForgeLogo className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white">
                  {headerData?.brandName || 'CommerceForge'}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B7E84B]/70 font-bold -mt-0.5">
                  {headerData?.tagline || 'WEB PERFORMANCE STUDIO'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed font-medium">
              We rebuild outdated, sluggish websites into high-converting, mobile-first digital storefronts for growing local businesses and independent brands.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-white/50 font-medium">
              <span>{locationText}</span>
            </div>
          </div>

          {/* Column 2: Packages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white/40 mb-4">
              Packages & Rates
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-white/80">
              <li>
                <button 
                  onClick={() => handleFooterNav('packages')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Basic Rebuild — $159
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('packages')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Standard Website — $260
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('packages')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Premium E-Commerce — $810
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('packages')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Student & Capstone — ₱4,000
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Work & Case Studies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white/40 mb-4">
              Selected Work
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-white/80">
              <li>
                <button 
                  onClick={() => handleFooterNav('work')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Gold & Grove
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('work')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Juice Beauty
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('work')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Coalition LA
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('work')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Rosemira Organics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio & Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-white/40 mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-white/80">
              <li>
                <button 
                  onClick={() => handleFooterNav('about')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  About the Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('packages')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Packages & Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('work')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Case Studies & Work
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('faq')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('hire-us')}
                  className="hover:text-[#B7E84B] transition-colors cursor-pointer font-bold text-[#B7E84B]"
                >
                  Hire Us & Project Inquiry →
                </button>
              </li>
              <li>
                <a 
                  href={`mailto:${email}`}
                  className="hover:text-[#B7E84B] transition-colors text-white/60"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            {copyrightText}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#B7E84B] transition-colors text-[11px] font-medium cursor-pointer"
              title="Open CMS Admin Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
