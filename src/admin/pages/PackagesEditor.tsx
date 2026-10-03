import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  ExternalLink,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { PricingPackage, PackagesPageTerms } from '../../types/cms';

export const PackagesEditor: React.FC = () => {
  const { draftContent, updateSection, updateDraftContent, setPreviewMode } = useCMS();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'tiers' | 'intro' | 'terms'>('tiers');

  const [packagesData, setPackagesData] = useState(draftContent.packages);
  const [packagesList, setPackagesList] = useState<PricingPackage[]>(draftContent.packages?.packages || []);
  const [termsData, setTermsData] = useState<PackagesPageTerms>(draftContent.packagesTerms || {
    id: 'pkg-terms',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    milestoneTitle: 'Transparent 50/50 Milestone Terms',
    milestoneText: '50% deposit upfront to begin architecture & design, and the remaining 50% only before final launch & domain deployment.',
    hostingTitle: 'Fast managed edge hosting:',
    hostingPrice: '$14/mo or $140/yr',
    hostingDetails: 'Includes global CDN, SSL, & automated backups',
    craftBespoke: {
      title1: '100% BESPOKE HANDCRAFTED CODE',
      desc1: 'We write clean, high-performance TypeScript & modern CSS tailored strictly to your store.',
      bullets1: ['Zero bulky unused plugins', 'Sub-800ms Time-To-First-Byte', 'Core Web Vitals 98+'],
      title2: 'FULL CODEBASE & ASSET OWNERSHIP',
      desc2: 'You own your store, your domain, and your code from day one.',
      bullets2: ['No recurring vendor lock-in', 'Direct GitHub repo transfer', 'Free domain DNS setup'],
    }
  });

  const [editingPkg, setEditingPkg] = useState<{ index: number; data: PricingPackage } | null>(null);

  React.useEffect(() => {
    if (draftContent.packages) {
      setPackagesData(draftContent.packages);
      setPackagesList(draftContent.packages.packages || []);
    }
    if (draftContent.packagesTerms) {
      setTermsData(draftContent.packagesTerms);
    }
  }, [draftContent]);

  const handleSaveTiers = async (updated: PricingPackage[]) => {
    setPackagesList(updated);
    await updateSection('packages', {
      ...packagesData,
      packages: updated,
    });
    showToast('success', 'Packages Saved', 'Pricing tiers updated on public site.');
  };

  const handleSaveIntro = async () => {
    await updateSection('packages', {
      ...packagesData,
      packages: packagesList,
    });
    showToast('success', 'Intro Saved', 'Rates headline and subheading saved.');
  };

  const handleSaveTerms = async () => {
    await updateDraftContent({ packagesTerms: termsData });
    showToast('success', 'Terms Saved', 'Milestone terms and hosting pricing saved.');
  };

  const handleAddTier = () => {
    const newTier: PricingPackage = {
      id: `pkg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: 'NEW TIER',
      price: '$450',
      currency: '$',
      billingPeriodText: 'starting rate',
      description: 'Ideal package for scaling direct-to-consumer businesses needing advanced features.',
      turnaroundTime: '15–20 business days',
      features: [
        'Custom interactive product customizer',
        'Sub-800ms speed guarantee',
        'Mobile-first conversion funnel',
        'Full codebase ownership',
      ],
      ctaText: 'START THIS PROJECT',
      ctaUrl: '#inquiry',
      featured: false,
      badge: 'Popular for DTC Brands',
      sortOrder: packagesList.length,
      published: true,
    };
    const updated = [...packagesList, newTier];
    handleSaveTiers(updated);
    setEditingPkg({ index: packagesList.length, data: newTier });
  };

  const handleMoveTier = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= packagesList.length) return;
    const updated = [...packagesList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const sorted = updated.map((p, idx) => ({ ...p, sortOrder: idx }));
    handleSaveTiers(sorted);
  };

  const handleDeleteTier = (index: number) => {
    if (window.confirm(`Delete package "${packagesList[index].name}"?`)) {
      const updated = packagesList.filter((_, i) => i !== index);
      handleSaveTiers(updated);
      if (editingPkg?.index === index) {
        setEditingPkg(null);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            Page Editor
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Packages &amp; Rates Editor
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            Control productized pricing packages, milestone terms, and hosting rates ({packagesList.length} packages).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddTier}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pricing Tier</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPreviewMode(true);
              window.open('#/packages', '_blank');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>View Packages</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('tiers')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'tiers'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Pricing Packages ({packagesList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('intro')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'intro'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Rates Intro
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'terms'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. 50/50 Milestones &amp; Hosting
        </button>
      </div>

      {/* TAB 1: TIERS */}
      {activeTab === 'tiers' && (
        <div className="space-y-4">
          {packagesList.map((pkg, index) => (
            <div
              key={pkg.id || index}
              className={`p-5 rounded-2xl border transition-all duration-200 bg-white shadow-sm ${
                pkg.featured
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-xs font-black text-slate-800">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">
                      {pkg.name}
                    </h3>
                    <span className="text-base font-black text-emerald-700 font-mono">
                      {pkg.price}
                    </span>
                    {pkg.featured && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-300">
                        Most Popular
                      </span>
                    )}
                    {pkg.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-1 font-medium">
                    {pkg.description}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
                    <span>⚡ Turnaround: <strong>{pkg.turnaroundTime || '7–10 days'}</strong></span>
                    <span>•</span>
                    <span>{pkg.features?.length || 0} Features Included</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-xs">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveTier(index, 'up')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === packagesList.length - 1}
                      onClick={() => handleMoveTier(index, 'down')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditingPkg({ index, data: { ...pkg } })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-[#B7E84B] text-[#0E1B13] hover:bg-[#a6d93b] cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteTier(index)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Delete package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: INTRO */}
      {activeTab === 'intro' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Eyebrow
              </label>
              <input
                type="text"
                value={packagesData.eyebrow || ''}
                onChange={(e) => setPackagesData({ ...packagesData, eyebrow: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Headline
              </label>
              <input
                type="text"
                value={packagesData.heading || ''}
                onChange={(e) => setPackagesData({ ...packagesData, heading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Subheading
            </label>
            <textarea
              rows={3}
              value={packagesData.subheading || ''}
              onChange={(e) => setPackagesData({ ...packagesData, subheading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveIntro}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Rates Intro</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: TERMS & HOSTING */}
      {activeTab === 'terms' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700">
              50/50 Milestone Terms
            </h3>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Terms Headline
              </label>
              <input
                type="text"
                value={termsData.milestoneTitle}
                onChange={(e) => setTermsData({ ...termsData, milestoneTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Terms Description
              </label>
              <textarea
                rows={2}
                value={termsData.milestoneText}
                onChange={(e) => setTermsData({ ...termsData, milestoneText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700">
              Fast Managed Edge Hosting
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Hosting Title
                </label>
                <input
                  type="text"
                  value={termsData.hostingTitle}
                  onChange={(e) => setTermsData({ ...termsData, hostingTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Hosting Price
                </label>
                <input
                  type="text"
                  value={termsData.hostingPrice}
                  onChange={(e) => setTermsData({ ...termsData, hostingPrice: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-black text-emerald-700 shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Hosting Details / Inclusions
              </label>
              <input
                type="text"
                value={termsData.hostingDetails}
                onChange={(e) => setTermsData({ ...termsData, hostingDetails: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveTerms}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Milestone &amp; Hosting Terms</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Tier Drawer / Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Edit Package: {editingPkg.data.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPkg(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Package Name
                  </label>
                  <input
                    type="text"
                    value={editingPkg.data.name}
                    onChange={(e) => setEditingPkg({
                      ...editingPkg,
                      data: { ...editingPkg.data, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Price (e.g. $260)
                  </label>
                  <input
                    type="text"
                    value={editingPkg.data.price}
                    onChange={(e) => setEditingPkg({
                      ...editingPkg,
                      data: { ...editingPkg.data, price: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={editingPkg.data.turnaroundTime || ''}
                    onChange={(e) => setEditingPkg({
                      ...editingPkg,
                      data: { ...editingPkg.data, turnaroundTime: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="10–15 business days"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Audience Badge
                  </label>
                  <input
                    type="text"
                    value={editingPkg.data.badge || ''}
                    onChange={(e) => setEditingPkg({
                      ...editingPkg,
                      data: { ...editingPkg.data, badge: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="Best for Growing Brands"
                  />
                </div>
              </div>

              <div>
                <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.data.featured}
                    onChange={(e) => setEditingPkg({
                      ...editingPkg,
                      data: { ...editingPkg.data, featured: e.target.checked }
                    })}
                    className="rounded text-emerald-600"
                  />
                  <span>Mark as "Most Popular" (Highlighted Card)</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingPkg.data.description}
                  onChange={(e) => setEditingPkg({
                    ...editingPkg,
                    data: { ...editingPkg.data, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              {/* Features List */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-700">
                    Included Features List
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPkg({
                        ...editingPkg,
                        data: {
                          ...editingPkg.data,
                          features: [...(editingPkg.data.features || []), 'New feature item'],
                        }
                      });
                    }}
                    className="text-[11px] font-black uppercase text-emerald-700 hover:underline cursor-pointer"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {(editingPkg.data.features || []).map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...(editingPkg.data.features || [])];
                          updated[fIdx] = e.target.value;
                          setEditingPkg({
                            ...editingPkg,
                            data: { ...editingPkg.data, features: updated }
                          });
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingPkg.data.features.filter((_, i) => i !== fIdx);
                          setEditingPkg({
                            ...editingPkg,
                            data: { ...editingPkg.data, features: updated }
                          });
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingPkg(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = [...packagesList];
                  updated[editingPkg.index] = editingPkg.data;
                  handleSaveTiers(updated);
                  setEditingPkg(null);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-black uppercase bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
