import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ProjectInquiry } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<ProjectInquiry>({
    name: '',
    email: '',
    storeUrl: '',
    packageTier: initialPackage || 'STANDARD ($260)',
    message: '',
  });

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({ ...prev, packageTier: initialPackage }));
    }
  }, [initialPackage]);

  // Focus trap and ESC key listener
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key closes modal
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab trap - keep focus within modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Focus first focusable element
    const timer = setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 50);

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const packagesList = [
    'BASIC ($159)',
    'STANDARD ($260)',
    'PRO ($500)',
    'PREMIUM ($810)',
    'ENTERPRISE',
    'STUDENT & CAPSTONE (₱4,000 / $75)',
    'CUSTOM REBUILD AUDIT',
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto pointer-events-none">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.95, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: prefersReducedMotion ? 0 : 20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="pointer-events-auto relative w-full max-w-lg bg-white dark:bg-[#0B0F17] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#1E3A2B]/12 dark:border-white/10 overflow-hidden text-[#1E3A2B] dark:text-white max-h-[92vh] flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header / Close Button */}
              <div className="sticky top-0 flex items-center justify-between p-5 sm:p-6 border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-sm z-10">
                <div>
                  <span className="text-[10.5px] uppercase tracking-[0.2em] font-extrabold text-[#064E3B] dark:text-[#B7E84B]">
                    FREE PROJECT AUDIT & QUOTE
                  </span>
                  <h2 id="modal-title" className="text-xl sm:text-2xl font-black tracking-tight text-[#1E3A2B] dark:text-white mt-0.5">
                    {submitted ? 'Inquiry Received!' : 'Get a Free Quote'}
                  </h2>
                </div>
                <button
                  ref={firstFocusableRef}
                  onClick={onClose}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#B7E84B] cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-5 sm:p-6 overflow-y-auto">
                {!submitted ? (
                  <div>
                    <p className="text-xs text-[#4A584E] dark:text-white/70 mb-5 font-medium leading-relaxed">
                      Tell us about your brand. We typically reply within 4 business hours with an audit proposal and exact delivery timeline.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="package-select"
                          className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] dark:text-white/80 mb-1.5"
                        >
                          Select Package
                        </label>
                        <select
                          id="package-select"
                          value={formData.packageTier}
                          onChange={(e) => setFormData({ ...formData, packageTier: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF8] dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B7E84B] text-sm text-[#1E3A2B] dark:text-white font-semibold transition-colors"
                        >
                          {packagesList.map((pkg) => (
                            <option key={pkg} value={pkg} className="bg-white dark:bg-[#0B0F17] text-black dark:text-white">
                              {pkg}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label
                            htmlFor="inquiry-name"
                            className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] dark:text-white/80 mb-1.5"
                          >
                            Your Name *
                          </label>
                          <input
                            id="inquiry-name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Maria Santos"
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF8] dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B7E84B] text-sm text-[#1E3A2B] dark:text-white transition-colors"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="inquiry-email"
                            className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] dark:text-white/80 mb-1.5"
                          >
                            Email Address *
                          </label>
                          <input
                            id="inquiry-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="maria@brand.com"
                            className="w-full px-3.5 py-2.5 bg-[#F8FAF8] dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B7E84B] text-sm text-[#1E3A2B] dark:text-white transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-store-url"
                          className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] dark:text-white/80 mb-1.5"
                        >
                          Current Website or Social Page (Optional)
                        </label>
                        <input
                          id="inquiry-store-url"
                          type="text"
                          value={formData.storeUrl}
                          onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                          placeholder="e.g. yourstore.com or instagram.com/brand"
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF8] dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B7E84B] text-sm text-[#1E3A2B] dark:text-white transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-notes"
                          className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] dark:text-white/80 mb-1.5"
                        >
                          Project Notes & Goals
                        </label>
                        <textarea
                          id="inquiry-notes"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="What is your business, what problems are you facing with your current site, or what are you looking to launch?"
                          className="w-full px-3.5 py-2.5 bg-[#F8FAF8] dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B7E84B] text-sm text-[#1E3A2B] dark:text-white transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 bg-[#B7E84B] text-[#0B0F17] font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl hover:bg-[#a3d438] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B7E84B] focus:ring-offset-2 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Submit Inquiry</span>
                        <ArrowRight className="w-4 h-4 text-[#0B0F17]" />
                      </button>

                      <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-center gap-3 text-[11px] text-[#4A584E] dark:text-white/60 font-medium">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#064E3B] dark:text-[#B7E84B]" />
                          <span>50% deposit upfront, 50% on completion</span>
                        </span>
                        <span>•</span>
                        <span>No spam guarantee</span>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#EAF3E8] dark:bg-white/10 text-[#064E3B] dark:text-[#B7E84B] flex items-center justify-center mx-auto mb-4 border border-[#B7E84B]/40">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-[#1E3A2B] dark:text-white tracking-tight">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A584E] dark:text-white/70 font-medium mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name || 'Friend'}</strong>. Our engineering lead will review your project requirements for <strong>{formData.packageTier}</strong> and send an audit proposal to <strong>{formData.email}</strong> within 4 business hours.
                    </p>

                    <button
                      onClick={handleResetAndClose}
                      className="mt-6 px-6 py-2.5 rounded-full bg-[#064E3B] dark:bg-[#B7E84B] text-white dark:text-[#0B0F17] text-xs font-bold uppercase tracking-wider hover:bg-[#0F241A] dark:hover:bg-[#a3d438] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B7E84B] cursor-pointer"
                    >
                      Back to Website
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
