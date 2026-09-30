import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';
import { useRouter } from '../admin/router';
import { usePublicTheme } from '../context/PublicThemeContext';

interface FooterProps {
  onNavigate?: (id: string) => void;
  onOpenInquiry?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const { navigate } = useRouter();
  const { isDark } = usePublicTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (path: string) => {
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '');
      if (onNavigate) {
        onNavigate(sectionId);
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return;
    }
    navigate(path);
  };

  const contactEmail = 'contact@commerceforge.agency';

  return (
    <footer
      id="main-footer"
      className={`w-full pt-14 pb-10 transition-colors duration-300 border-t ${
        isDark
          ? 'bg-[#080C14] text-gray-300 border-white/10'
          : 'bg-[#0B1711] text-emerald-50/90 border-[#1E3A2B]/50'
      }`}
      aria-label="Site Footer"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* 4 Clean Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-14">
          
          {/* COLUMN 1: REACH OUT */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-white mb-3.5 sm:mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
              <span>REACH OUT</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/hire-us')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Contact Us
                </button>
              </li>
              {onOpenInquiry && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                  >
                    Request a Proposal
                  </button>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block truncate"
                >
                  Email Us Directly
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/faqs')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  FAQs & Support
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: OUR SERVICES */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-white mb-3.5 sm:mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
              <span>OUR SERVICES</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/packages')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Handcrafted E-Commerce
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/work')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Performance & Speed Rebuilds
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/work')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  User-Centric UX Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/packages')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Scalable Headless Platforms
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: ABOUT US */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-white mb-3.5 sm:mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
              <span>ABOUT US</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/about')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  About the Dev Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/work')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Portfolio & Case Studies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/#process')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Our Rebuild Process
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/#comparison')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Why Rebuild (Old vs New)
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: PRODUCTS */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-white mb-3.5 sm:mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E84B]" />
              <span>PRODUCTS</span>
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/packages')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Basic Rebuild — $159
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/packages')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Standard Website — $260
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/packages')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Premium E-Commerce — $810
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/packages')}
                  className="text-emerald-100/70 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer text-left block"
                >
                  Student & Capstone — ₱4,000
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Minimalist Social Icons Row */}
        <div className="flex items-center justify-center gap-5 sm:gap-6 py-6 border-t border-emerald-900/40 dark:border-white/10">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-emerald-200/60 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter X"
            className="text-emerald-200/60 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-emerald-200/60 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* Code / Web */}
          <a
            href="https://wordpress.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WordPress / Open Source"
            className="text-emerald-200/60 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.99 3.656 9.126 8.435 9.877L6.2 10.3h2.3l2.46 7.15 2.22-7.15h2.3l-4.23 11.577C18.344 21.126 22 16.99 22 12c0-5.523-4.477-10-10-10zm-1.8 17.79l-4.14-11.3h2.3l2.84 8.75 1.7-5.5-1.2-3.25h2.3l2.6 8.3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-emerald-200/60 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* RSS / Updates */}
          <button
            type="button"
            onClick={() => handleNav('/work')}
            aria-label="Case Studies & Updates"
            className="text-emerald-200/60 dark:text-gray-400 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 1 1-2.18 2.18 2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27Zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93Z" />
            </svg>
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-emerald-200/50 dark:text-gray-500 text-center sm:text-left">
          <p className="leading-relaxed">
            Proudly crafted by CommerceForge Dev Team. High-performance eCommerce storefronts.
          </p>

          <div className="flex items-center gap-5 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer"
              title="Open CMS Admin Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#B7E84B] dark:hover:text-[#B7E84B] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
