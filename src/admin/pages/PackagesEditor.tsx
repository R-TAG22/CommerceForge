import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Save,
  X,
  Star,
  CheckCircle2,
  UploadCloud,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { PackagesSectionContent, PricingPackage } from '../../types/cms';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const PackagesEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [sectionData, setSectionData] = useState<PackagesSectionContent>(
    JSON.parse(JSON.stringify(draftContent.packages))
  );
  const [editingPackage, setEditingPackage] = useState<PricingPackage | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [featuresText, setFeaturesText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (updated?: PackagesSectionContent) => {
    const toSave = updated || sectionData;
    setIsSaving(true);
    try {
      await updateSection('packages', toSave);
      showToast('success', 'Packages Draft Saved', 'Pricing packages updated in draft. Click "Publish Live" to push live.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async (updated?: PackagesSectionContent) => {
    const toSave = updated || sectionData;
    setIsPublishing(true);
    try {
      await publishSection('packages', toSave);
      showToast('success', 'Published Live!', 'Pricing packages are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleOpenEdit = (pkg: PricingPackage) => {
    setEditingPackage(JSON.parse(JSON.stringify(pkg)));
    setFeaturesText(pkg.features?.join('\n') || '');
  };

  const handleSaveEditModal = (publishImmediately = false) => {
    if (!editingPackage) return;
    const updatedPkg: PricingPackage = {
      ...editingPackage,
      features: featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
      updatedAt: new Date().toISOString(),
    };

    const nextPackages = sectionData.packages.map((p) => (p.id === updatedPkg.id ? updatedPkg : p));
    const nextData = { ...sectionData, packages: nextPackages };
    setSectionData(nextData);
    setEditingPackage(null);
    if (publishImmediately) {
      handlePublishNow(nextData);
    } else {
      handleSave(nextData);
    }
  };

  const handleAddNewPackage = () => {
    const newPkg: PricingPackage = {
      id: `pkg-${Date.now()}`,
      name: 'NEW TIER',
      price: '$450',
      currency: '$',
      billingPeriodText: 'starting rate',
      turnaroundTime: '14 business days',
      description: 'Custom package description for business expansion.',
      features: [
        'Custom modern layout',
        'Mobile responsive design',
        'Fast edge deployment',
      ],
      ctaText: 'CHOOSE TIER ($450)',
      ctaUrl: '#contact',
      featured: false,
      badge: 'Specialized',
      sortOrder: sectionData.packages.length,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextData = {
      ...sectionData,
      packages: [...sectionData.packages, newPkg],
    };
    setSectionData(nextData);
    handleOpenEdit(newPkg);
  };

  const handleDuplicate = (pkg: PricingPackage) => {
    const copy: PricingPackage = {
      ...JSON.parse(JSON.stringify(pkg)),
      id: `pkg-${Date.now()}`,
      name: `${pkg.name} (Copy)`,
      sortOrder: sectionData.packages.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const nextData = {
      ...sectionData,
      packages: [...sectionData.packages, copy],
    };
    setSectionData(nextData);
    handleSave(nextData);
    showToast('info', 'Package Duplicated', `Created copy of ${pkg.name}`);
  };

  const handleDeleteConfirm = () => {
    if (!isDeletingId) return;
    const nextPackages = sectionData.packages.filter((p) => p.id !== isDeletingId);
    const nextData = { ...sectionData, packages: nextPackages };
    setSectionData(nextData);
    setIsDeletingId(null);
    handleSave(nextData);
    showToast('info', 'Package Deleted', 'Pricing package removed.');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sectionData.packages.length) return;

    const list = [...sectionData.packages];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((p, idx) => (p.sortOrder = idx));

    const nextData = { ...sectionData, packages: list };
    setSectionData(nextData);
    handleSave(nextData);
  };

  const handleTogglePublished = (id: string) => {
    const nextPackages = sectionData.packages.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    const nextData = { ...sectionData, packages: nextPackages };
    setSectionData(nextData);
    handleSave(nextData);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Save */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <Layers className="w-4 h-4" />
            <span>Pricing Architecture</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Packages & Rates</h1>
          <p className="text-xs text-white/60">
            Configure productized tiers, turnaround commitments, and feature checklists
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving || isPublishing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#B7E84B]" />
            <span>{isSaving ? 'Saving...' : 'Save Drafts'}</span>
          </button>
          <button
            type="button"
            onClick={() => handlePublishNow()}
            disabled={isSaving || isPublishing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Live'}</span>
          </button>
          <button
            type="button"
            onClick={handleAddNewPackage}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/15 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#B7E84B]" />
            <span>Add Package</span>
          </button>
        </div>
      </div>

      {/* Section Headlines */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Section Intro Headlines</h2>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="text-xs font-bold text-[#B7E84B] hover:underline"
          >
            {isSaving ? 'Saving...' : 'Save Intro Changes'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={sectionData.eyebrow}
              onChange={(e) => setSectionData({ ...sectionData, eyebrow: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Heading Prefix
            </label>
            <input
              type="text"
              value={sectionData.heading}
              onChange={(e) => setSectionData({ ...sectionData, heading: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
              Heading Highlight (Green)
            </label>
            <input
              type="text"
              value={sectionData.headingHighlight}
              onChange={(e) => setSectionData({ ...sectionData, headingHighlight: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-bold focus:outline-none focus:border-[#B7E84B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
            Subheading
          </label>
          <input
            type="text"
            value={sectionData.subheading}
            onChange={(e) => setSectionData({ ...sectionData, subheading: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
          />
        </div>
      </div>

      {/* Packages List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white">Configured Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionData.packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                pkg.featured
                  ? 'bg-gradient-to-b from-[#162C20] to-[#12241A] border-[#B7E84B]/50 ring-1 ring-[#B7E84B]/30'
                  : 'bg-[#12241A] border-white/10'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight text-white uppercase">{pkg.name}</span>
                    {pkg.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-[#B7E84B] text-[#0F241A] text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                    {pkg.badge && !pkg.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-[9px] font-bold uppercase">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === sectionData.packages.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price & Turnaround */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-black text-[#B7E84B] tracking-tight">{pkg.price}</span>
                  <span className="text-xs text-white/50">{pkg.billingPeriodText}</span>
                </div>

                <div className="text-xs font-semibold text-white/80 mb-3">
                  ⏱ Turnaround: <span className="text-white">{pkg.turnaroundTime}</span>
                </div>

                <p className="text-xs text-white/60 leading-relaxed mb-4">{pkg.description}</p>

                {/* Features Preview */}
                <div className="space-y-1.5 pt-3 border-t border-white/10 mb-6">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B7E84B] shrink-0 mt-0.5" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                  {pkg.features.length > 4 && (
                    <span className="text-[11px] text-white/40 block pt-1">
                      +{pkg.features.length - 4} more deliverables
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleTogglePublished(pkg.id)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider ${
                    pkg.published ? 'bg-[#EAF3E8]/10 text-[#B7E84B]' : 'bg-white/5 text-white/40'
                  }`}
                >
                  {pkg.published ? 'Live' : 'Draft'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDuplicate(pkg)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(pkg)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    <Edit2 className="w-3 h-3 text-[#B7E84B]" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeletingId(pkg.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Package Modal */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#12241A] border border-[#B7E84B]/30 rounded-3xl max-w-2xl w-full my-8 p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Edit Package Tier</h3>
                <p className="text-xs text-white/60">Configure pricing, deliverables, and badges</p>
              </div>
              <button
                onClick={() => setEditingPackage(null)}
                className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Package Name
                </label>
                <input
                  type="text"
                  value={editingPackage.name}
                  onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
                  Price String (e.g. $159 or ₱4,000)
                </label>
                <input
                  type="text"
                  value={editingPackage.price}
                  onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Billing Period / Subtext
                </label>
                <input
                  type="text"
                  value={editingPackage.billingPeriodText}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, billingPeriodText: e.target.value })
                  }
                  placeholder="starting rate or or $75 USD"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Turnaround Time
                </label>
                <input
                  type="text"
                  value={editingPackage.turnaroundTime}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, turnaroundTime: e.target.value })
                  }
                  placeholder="7–10 business days"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Card Badge (e.g. Most Popular)
                </label>
                <input
                  type="text"
                  value={editingPackage.badge}
                  onChange={(e) => setEditingPackage({ ...editingPackage, badge: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={editingPackage.ctaText}
                  onChange={(e) => setEditingPackage({ ...editingPackage, ctaText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#162C20] border border-white/10">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-white font-bold">
                <input
                  type="checkbox"
                  checked={editingPackage.featured}
                  onChange={(e) => setEditingPackage({ ...editingPackage, featured: e.target.checked })}
                  className="rounded border-white/20 text-[#B7E84B] focus:ring-[#B7E84B]"
                />
                <span>Set as Featured / Most Popular Highlight</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                Package Description
              </label>
              <textarea
                rows={2}
                value={editingPackage.description}
                onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                Included Features & Deliverables (1 item per line)
              </label>
              <textarea
                rows={6}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveEditModal(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10"
              >
                Save to Draft
              </button>
              <button
                type="button"
                onClick={() => handleSaveEditModal(true)}
                className="px-6 py-2 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider shadow-md transition-colors"
              >
                Save & Publish Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!isDeletingId}
        title="Delete Pricing Package"
        message="Are you sure you want to remove this package tier? It will be removed from the pricing section."
        confirmLabel="Delete Package"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeletingId(null)}
      />
    </div>
  );
};
