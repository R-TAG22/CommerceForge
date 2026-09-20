import React, { useState, useEffect } from 'react';
import { ProjectInquiry } from '../types';
import { CheckCircle2, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, initialPackage }) => {
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

  if (!isOpen) return null;

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
    'PREMIUM ($810)',
    'STUDENT & CAPSTONE (₱4,000 / $75)',
    'CUSTOM REBUILD AUDIT',
  ];

  return (
    <div 
      id="inquiry-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="inquiry-modal-card"
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-[#1E3A2B]/12 overflow-hidden text-[#1E3A2B] max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Close Button */}
        <button
          id="btn-close-inquiry-modal"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#1E3A2B]/5 hover:bg-[#1E3A2B]/10 flex items-center justify-center text-[#1E3A2B] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-5 sm:mb-6 pr-8">
              <span className="text-[10.5px] uppercase tracking-[0.2em] font-extrabold text-[#2D5A40]">
                FREE PROJECT AUDIT & QUOTE
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-1 text-[#1E3A2B]">
                Let's Rebuild Your Website
              </h3>
              <p className="text-xs text-[#4A584E] mt-1 font-medium leading-relaxed">
                Tell us about your brand. We typically reply within 4 business hours with an audit proposal and exact delivery timeline.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF8] rounded-xl text-base sm:text-sm border border-[#1E3A2B]/12 focus:outline-none focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#B7E84B]/40 text-[#1E3A2B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maria@brand.com"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAF8] rounded-xl text-base sm:text-sm border border-[#1E3A2B]/12 focus:outline-none focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#B7E84B]/40 text-[#1E3A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] mb-1">
                  Current Website or Social Media Page (Optional)
                </label>
                <input
                  type="text"
                  value={formData.storeUrl}
                  onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                  placeholder="e.g. yourstore.com or instagram.com/brand"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF8] rounded-xl text-base sm:text-sm border border-[#1E3A2B]/12 focus:outline-none focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#B7E84B]/40 text-[#1E3A2B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] mb-1">
                  Selected Package
                </label>
                <select
                  value={formData.packageTier}
                  onChange={(e) => setFormData({ ...formData, packageTier: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF8] rounded-xl text-base sm:text-sm border border-[#1E3A2B]/12 focus:outline-none focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#B7E84B]/40 text-[#1E3A2B] font-semibold"
                >
                  {packagesList.map((pkg) => (
                    <option key={pkg} value={pkg}>
                      {pkg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A584E] mb-1">
                  Project Notes & Goals
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What is your business, what problems are you facing with your current site, or what are you looking to launch?"
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF8] rounded-xl text-base sm:text-sm border border-[#1E3A2B]/12 focus:outline-none focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#B7E84B]/40 text-[#1E3A2B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Request Free Quote & Audit</span>
                <ArrowRight className="w-4 h-4 text-[#B7E84B]" />
              </button>

              <div className="pt-3 border-t border-[#1E3A2B]/8 flex items-center justify-center gap-4 text-[11px] text-[#4A584E] font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D5A40]" />
                  <span>50% deposit upfront, 50% on completion</span>
                </span>
                <span>•</span>
                <span>No spam guarantee</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#EAF3E8] text-[#2D5A40] flex items-center justify-center mx-auto mb-4 border border-[#B7E84B]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#1E3A2B] tracking-tight">
              Inquiry Received!
            </h3>
            <p className="text-xs sm:text-sm text-[#4A584E] font-medium mt-2 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our engineering lead will review your project requirements for the <strong>{formData.packageTier}</strong> and send an audit proposal to <strong>{formData.email}</strong> within 4 business hours.
            </p>

            <button
              onClick={handleResetAndClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider border border-[#B7E84B]/40 hover:bg-[#0F241A] hover:border-[#B7E84B] transition-colors"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
