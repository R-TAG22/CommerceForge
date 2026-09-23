import React, { useState } from 'react';
import { Save, ArrowLeftRight, Plus, Trash2, ArrowUp, ArrowDown, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { ComparisonSectionContent, ComparisonItem } from '../../types/cms';
import { useToast } from '../components/Toast';

export const ComparisonEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [comparison, setComparison] = useState<ComparisonSectionContent>(
    JSON.parse(JSON.stringify(draftContent.comparison))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('comparison', comparison);
      showToast('success', 'Comparison Draft Saved', 'Comparison section updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('comparison', comparison);
      showToast('success', 'Published Live!', 'Comparison changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddItem = () => {
    const newItem: ComparisonItem = {
      id: `comp-item-${Date.now()}`,
      aspect: 'New Aspect',
      icon: 'Zap',
      oldWay: 'The outdated approach description.',
      rebuildWay: 'Our handcrafted modern solution.',
      sortOrder: comparison.items.length,
    };
    setComparison((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleItemChange = (id: string, field: keyof ComparisonItem, val: unknown) => {
    setComparison((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === id ? { ...it, [field]: val } : it)),
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= comparison.items.length) return;

    const list = [...comparison.items];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((it, idx) => (it.sortOrder = idx));
    setComparison((prev) => ({ ...prev, items: list }));
  };

  const handleDeleteItem = (id: string) => {
    setComparison((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <ArrowLeftRight className="w-4 h-4" />
            <span>Value Justification</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Why Rebuild / Comparison</h1>
          <p className="text-xs text-white/60">
            Compare outdated DIY page builders with high-octane handcrafted dev team code
          </p>
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

      {/* Intro Copy */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Section Headlines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Eyebrow
            </label>
            <input
              type="text"
              value={comparison.eyebrow}
              onChange={(e) => setComparison({ ...comparison, eyebrow: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Heading Prefix
            </label>
            <input
              type="text"
              value={comparison.headingPrefix}
              onChange={(e) => setComparison({ ...comparison, headingPrefix: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-red-400 mb-1">
              Loss Text (Red/Strikethrough)
            </label>
            <input
              type="text"
              value={comparison.headingLoss}
              onChange={(e) => setComparison({ ...comparison, headingLoss: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-red-500/30 text-xs text-red-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
              Win Text (Green)
            </label>
            <input
              type="text"
              value={comparison.headingWin}
              onChange={(e) => setComparison({ ...comparison, headingWin: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
            Subheading
          </label>
          <input
            type="text"
            value={comparison.subheading}
            onChange={(e) => setComparison({ ...comparison, subheading: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            Bottom CTA Button Text
          </label>
          <input
            type="text"
            value={comparison.ctaText || 'REQUEST A TECH AUDIT'}
            onChange={(e) => setComparison({ ...comparison, ctaText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            placeholder="REQUEST A TECH AUDIT"
          />
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Outdated Column */}
        <div className="p-6 rounded-2xl bg-[#1A1212] border border-red-500/30 space-y-4">
          <span className="text-xs font-black uppercase text-red-400 tracking-wider block">
            Left Column: The Outdated Way
          </span>
          <div>
            <label className="block text-[11px] font-bold text-white/70 mb-1">Heading</label>
            <input
              type="text"
              value={comparison.oldColumnHeading}
              onChange={(e) => setComparison({ ...comparison, oldColumnHeading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-white/70 mb-1">Subtitle</label>
            <input
              type="text"
              value={comparison.oldColumnSubtitle}
              onChange={(e) => setComparison({ ...comparison, oldColumnSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-white/70 mb-1">Bottom Result Callout</label>
            <input
              type="text"
              value={comparison.oldColumnResult}
              onChange={(e) => setComparison({ ...comparison, oldColumnResult: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>

        {/* Rebuilt Column */}
        <div className="p-6 rounded-2xl bg-[#12241A] border border-[#B7E84B]/40 space-y-4">
          <span className="text-xs font-black uppercase text-[#B7E84B] tracking-wider block">
            Right Column: The Rebuilt Dev Team Way
          </span>
          <div>
            <label className="block text-[11px] font-bold text-white/70 mb-1">Heading</label>
            <input
              type="text"
              value={comparison.newColumnHeading}
              onChange={(e) => setComparison({ ...comparison, newColumnHeading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-white/70 mb-1">Subtitle</label>
            <input
              type="text"
              value={comparison.newColumnSubtitle}
              onChange={(e) => setComparison({ ...comparison, newColumnSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-white/70 mb-1">Bottom Result Callout</label>
            <input
              type="text"
              value={comparison.newColumnResult}
              onChange={(e) => setComparison({ ...comparison, newColumnResult: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* Comparison Items */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Comparison Aspects</h2>
            <p className="text-xs text-white/50">Aspects evaluated side-by-side (Speed, Usability, SEO, etc.)</p>
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Aspect</span>
          </button>
        </div>

        <div className="space-y-3">
          {comparison.items.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#162C20] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="flex sm:flex-col items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === comparison.items.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Aspect Title</label>
                  <input
                    type="text"
                    value={item.aspect}
                    onChange={(e) => handleItemChange(item.id, 'aspect', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-red-400 mb-1">The Old Way</label>
                  <textarea
                    rows={2}
                    value={item.oldWay}
                    onChange={(e) => handleItemChange(item.id, 'oldWay', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-red-500/20 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#B7E84B] mb-1">The Rebuild Way</label>
                  <textarea
                    rows={2}
                    value={item.rebuildWay}
                    onChange={(e) => handleItemChange(item.id, 'rebuildWay', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-[#B7E84B]/30 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                className="p-2 text-white/40 hover:text-red-400 shrink-0 self-end sm:self-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
