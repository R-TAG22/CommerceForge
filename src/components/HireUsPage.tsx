import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles, Send, Clock, Mail } from 'lucide-react';
import { DynamicSectionRenderer } from './DynamicSectionRenderer';

export const HireUsPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('STANDARD ($260)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeUrl: '',
    timeline: 'Flexible',
    budget: '$250–$500',
    message: '',
  });

  const packagesList = [
    { id: 'basic', label: 'BASIC ($159)', turnaround: '7–10 days' },
    { id: 'standard', label: 'STANDARD ($260)', turnaround: '10–15 days' },
    { id: 'premium', label: 'PREMIUM ($810)', turnaround: '30–45 days' },
    { id: 'capstone', label: 'STUDENT / CAPSTONE (₱4,000)', turnaround: '5–7 days' },
    { id: 'custom', label: 'ENTERPRISE / CUSTOM AUDIT', turnaround: 'Tailored' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Top Hero Banner */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-14 pb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3E8] border border-[#B7E84B]/40 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7E84B] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1E3A2B]">
              START A PROJECT
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1E3A2B]">
            LET’S REBUILD YOUR DIGITAL STOREFRONT.
          </h1>

          <p className="mt-4 text-[#4A584E] text-base sm:text-lg leading-relaxed">
            Tell us about your brand, current challenges, and goals. We analyze your website and reply with a breakdown, speed audit, and recommended scope within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#1E3A2B]/10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#EAF3E8] border border-[#B7E84B] text-[#1E3A2B] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#B7E84B]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1E3A2B]">
                  INQUIRY RECEIVED!
                </h2>
                <p className="text-[#4A584E] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our team will review your website details and email you a tailored audit and roadmap at <strong>{formData.email}</strong> within 1 business day.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0F241A] transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-2">
                    1. Select Your Target Package Tier *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {packagesList.map((pkg) => {
                      const isSelected = selectedPackage === pkg.label;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPackage(pkg.label)}
                          className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-md ring-2 ring-[#B7E84B]'
                              : 'bg-[#F8FAF8] text-[#1E3A2B] border-[#1E3A2B]/10 hover:border-[#1E3A2B]/30'
                          }`}
                        >
                          <div className="font-bold text-xs">{pkg.label}</div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#B7E84B]' : 'text-[#4A584E]'}`}>
                            Turnaround: {pkg.turnaround}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/15 text-sm text-[#1E3A2B] focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      Your Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@yourbrand.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/15 text-sm text-[#1E3A2B] focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                    Current Website or Store URL (If applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.storeUrl}
                    onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                    placeholder="e.g. https://yourstore.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/15 text-sm text-[#1E3A2B] focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      Desired Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/15 text-sm text-[#1E3A2B] focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B]"
                    >
                      <option value="ASAP (within 1-2 weeks)">ASAP (within 1-2 weeks)</option>
                      <option value="Next 3-4 weeks">Next 3-4 weeks</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/15 text-sm text-[#1E3A2B] focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B]"
                    >
                      <option value="$150–$300">$150–$300 (Basic / Standard)</option>
                      <option value="$300–$850">$300–$850 (Standard / Full Store)</option>
                      <option value="$1,000+">$1,000+ (Enterprise / Bespoke)</option>
                      <option value="₱4,000">₱4,000 (Student / Capstone)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B] mb-1.5">
                    What does your business do, and what would you like improved?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand, current speed or design issues, and the features you need..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAF8] border border-[#1E3A2B]/15 text-sm text-[#1E3A2B] focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-[#1E3A2B] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 hover:bg-[#0F241A] transition-all hover:scale-[1.01] shadow-lg cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#B7E84B]" />
                    <span>SUBMIT INQUIRY & GET FREE AUDIT</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Trust & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#12241A] text-white rounded-3xl p-6 sm:p-8 space-y-6">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#B7E84B] text-[#0F241A] inline-block">
                STUDIO PROMISES
              </span>

              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                WHY LOCAL BUSINESSES TRUST COMMERCEFORGE
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 text-[#B7E84B] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">50/50 Transparent Payments</h3>
                    <p className="text-xs text-white/70 mt-0.5">
                      50% deposit to begin, final 50% only when you approve the site before launch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 text-[#B7E84B] shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Sub-Second Load Times</h3>
                    <p className="text-xs text-white/70 mt-0.5">
                      Every rebuild is engineered to load under 800ms for maximal mobile conversion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 text-[#B7E84B] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">24-Hour Response Time</h3>
                    <p className="text-xs text-white/70 mt-0.5">
                      Direct developer communication via email, WhatsApp, or scheduled video call.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Mail className="w-4 h-4 text-[#B7E84B]" />
                  <span>Direct inquiries: contact@commerceforge.agency</span>
                </div>
              </div>
            </div>

            {/* Student note */}
            <div className="bg-[#EAF3E8] border border-[#B7E84B]/40 rounded-3xl p-6 text-[#1E3A2B]">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1E3A2B] bg-white px-2.5 py-0.5 rounded-full border border-black/10 inline-block mb-2">
                ACADEMIC & CAPSTONE TIER
              </span>
              <h3 className="text-base font-black uppercase tracking-tight">
                Working on your final thesis or capstone?
              </h3>
              <p className="text-xs text-[#4A584E] mt-1 leading-relaxed">
                We offer special ₱4,000 packages for IT & Computer Science students to build polished web apps, defend their prototypes, and get full documented code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections configured in CMS for Hire Us Page */}
      <DynamicSectionRenderer page="hire-us" />
    </div>
  );
};
