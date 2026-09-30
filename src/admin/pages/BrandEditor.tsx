import React, { useState } from 'react';
import { Save, Award, Plus, Trash2, ArrowUp, ArrowDown, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AboutSectionContent, BrandValueItem } from '../../types/cms';
import { useToast } from '../components/Toast';

export const BrandEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [about, setAbout] = useState<AboutSectionContent>(
    JSON.parse(JSON.stringify(draftContent.about))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('about', about);
      showToast('success', 'Brand Draft Saved', 'Dev team standards updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('about', about);
      showToast('success', 'Published Live!', 'Brand and About changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddValue = () => {
    const newValue: BrandValueItem = {
      id: `val-${Date.now()}`,
      title: 'New Dev Team Standard',
      description: 'Standard description detailing our craft or engineering quality.',
      icon: 'ShieldCheck',
      sortOrder: about.values.length,
    };
    setAbout((prev) => ({ ...prev, values: [...prev.values, newValue] }));
  };

  const handleValueChange = (id: string, field: keyof BrandValueItem, val: unknown) => {
    setAbout((prev) => ({
      ...prev,
      values: prev.values.map((v) => (v.id === id ? { ...v, [field]: val } : v)),
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= about.values.length) return;

    const list = [...about.values];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((v, idx) => (v.sortOrder = idx));
    setAbout((prev) => ({ ...prev, values: list }));
  };

  const handleDelete = (id: string) => {
    setAbout((prev) => ({
      ...prev,
      values: prev.values.filter((v) => v.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <Award className="w-4 h-4" />
            <span>Dev Team Ethos & Standards</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Brand & About Section</h1>
          <p className="text-xs text-white/60">
            Configure dev team philosophy, engineering manifesto, and Core Web Vitals guarantees
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

      {/* Headlines & Badge */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Philosophy Headlines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={about.eyebrow}
              onChange={(e) => setAbout({ ...about, eyebrow: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Heading Prefix
            </label>
            <input
              type="text"
              value={about.headingPrefix}
              onChange={(e) => setAbout({ ...about, headingPrefix: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
              Heading Highlight
            </label>
            <input
              type="text"
              value={about.headingHighlight}
              onChange={(e) => setAbout({ ...about, headingHighlight: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            Performance Badge Callout
          </label>
          <input
            type="text"
            value={about.scoreBadge}
            onChange={(e) => setAbout({ ...about, scoreBadge: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/30 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Paragraph 1 (The Mission)
            </label>
            <textarea
              rows={4}
              value={about.paragraph1}
              onChange={(e) => setAbout({ ...about, paragraph1: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Paragraph 2 (The Craft)
            </label>
            <textarea
              rows={4}
              value={about.paragraph2}
              onChange={(e) => setAbout({ ...about, paragraph2: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Core Dev Team Standards / Values */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">4 Dev Team Pillars & Values</h2>
            <p className="text-xs text-white/50">Displayed in the right-side cards grid</p>
          </div>
          <button
            type="button"
            onClick={handleAddValue}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Pillar</span>
          </button>
        </div>

        <div className="space-y-3">
          {about.values.map((item, index) => (
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
                  disabled={index === about.values.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Pillar Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleValueChange(item.id, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleValueChange(item.id, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-white/40 hover:text-red-400 shrink-0 self-end sm:self-center"
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
