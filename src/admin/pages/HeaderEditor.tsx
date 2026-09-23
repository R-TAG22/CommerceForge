import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Compass, CheckCircle2, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { HeaderContent, NavigationItem } from '../../types/cms';
import { useToast } from '../components/Toast';

export const HeaderEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [header, setHeader] = useState<HeaderContent>(
    JSON.parse(JSON.stringify(draftContent.header))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('header', header);
      showToast('success', 'Header Draft Saved', 'Header settings updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('header', header);
      showToast('success', 'Published Live!', 'Header changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleNavItemChange = (id: string, field: keyof NavigationItem, val: unknown) => {
    setHeader((prev) => ({
      ...prev,
      navItems: prev.navItems.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const handleMoveNavItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= header.navItems.length) return;

    const updated = [...header.navItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-index sortOrder
    updated.forEach((item, i) => (item.sortOrder = i));
    setHeader((prev) => ({ ...prev, navItems: updated }));
  };

  const handleAddNavItem = () => {
    const newItem: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: 'NEW LINK',
      url: '#section',
      sectionId: 'section',
      sortOrder: header.navItems.length,
      visible: true,
    };
    setHeader((prev) => ({ ...prev, navItems: [...prev.navItems, newItem] }));
  };

  const handleDeleteNavItem = (id: string) => {
    setHeader((prev) => ({
      ...prev,
      navItems: prev.navItems.filter((i) => i.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Title & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <Compass className="w-4 h-4" />
            <span>Navigation Settings</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Header & Top Bar</h1>
          <p className="text-xs text-white/60">Configure dev team branding, links, and the top CTA button</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSaving || isPublishing}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#B7E84B]" />
            <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
          </button>
          <button
            type="button"
            onClick={handlePublishNow}
            disabled={isSaving || isPublishing}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isPublishing ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Brand Details */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Brand Name & Tagline
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Brand Primary Word
            </label>
            <input
              type="text"
              value={header.brandName}
              onChange={(e) => setHeader({ ...header, brandName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Brand Highlight Word (Green)
            </label>
            <input
              type="text"
              value={header.brandHighlight}
              onChange={(e) => setHeader({ ...header, brandHighlight: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Tagline Under Logo
            </label>
            <input
              type="text"
              value={header.brandTagline}
              onChange={(e) => setHeader({ ...header, brandTagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>
        </div>
      </div>

      {/* CTA Button Configuration */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Top Right Header CTA</h2>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
            <input
              type="checkbox"
              checked={header.ctaVisible}
              onChange={(e) => setHeader({ ...header, ctaVisible: e.target.checked })}
              className="rounded border-white/20 text-[#B7E84B] focus:ring-[#B7E84B]"
            />
            <span>Show CTA Button</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Button Label
            </label>
            <input
              type="text"
              value={header.ctaText}
              onChange={(e) => setHeader({ ...header, ctaText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Action Target
            </label>
            <input
              type="text"
              value={header.ctaAction}
              onChange={(e) => setHeader({ ...header, ctaAction: e.target.value })}
              placeholder="inquiry or #contact"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Menu Navigation Links</h2>
            <p className="text-xs text-white/50">Reorder or modify links appearing in desktop and mobile drawer</p>
          </div>
          <button
            type="button"
            onClick={handleAddNavItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {header.navItems.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#162C20] border border-white/10 flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMoveNavItem(index, 'up')}
                  className="p-1 rounded text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === header.navItems.length - 1}
                  onClick={() => handleMoveNavItem(index, 'down')}
                  className="p-1 rounded text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <input
                  type="text"
                  placeholder="Link Label"
                  value={item.label}
                  onChange={(e) => handleNavItemChange(item.id, 'label', e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
                <input
                  type="text"
                  placeholder="Section ID (#hero)"
                  value={item.url}
                  onChange={(e) => handleNavItemChange(item.id, 'url', e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
                <input
                  type="text"
                  placeholder="Active Key (hero)"
                  value={item.sectionId}
                  onChange={(e) => handleNavItemChange(item.id, 'sectionId', e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white/70">
                  <input
                    type="checkbox"
                    checked={item.visible}
                    onChange={(e) => handleNavItemChange(item.id, 'visible', e.target.checked)}
                    className="rounded border-white/20 text-[#B7E84B] focus:ring-[#B7E84B]"
                  />
                  <span>Visible</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleDeleteNavItem(item.id)}
                  className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
