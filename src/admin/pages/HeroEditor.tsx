import React, { useState } from 'react';
import { Save, Sparkles, Plus, Trash2, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { HeroContentData } from '../../types/cms';
import { useToast } from '../components/Toast';

export const HeroEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [hero, setHero] = useState<HeroContentData>(
    JSON.parse(JSON.stringify(draftContent.hero))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('hero', hero);
      showToast('success', 'Hero Draft Saved', 'Hero section updated in draft. Click "Publish Live" to push live.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('hero', hero);
      showToast('success', 'Published Live!', 'Hero section changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddGuarantee = () => {
    setHero((prev) => ({
      ...prev,
      guarantees: [
        ...prev.guarantees,
        { id: `g-${Date.now()}`, text: 'New Guarantee', icon: 'CheckCircle2' },
      ],
    }));
  };

  const handleRemoveGuarantee = (id: string) => {
    setHero((prev) => ({
      ...prev,
      guarantees: prev.guarantees.filter((g) => g.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Title & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Main Landing Area</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Hero Section</h1>
          <p className="text-xs text-white/60">Edit the primary headline, value proposition, badges, and CTAs</p>
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

      {/* Eyebrow & Price Badge */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Eyebrow & Anchor Price
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Eyebrow Badge Text
            </label>
            <input
              type="text"
              value={hero.eyebrowText}
              onChange={(e) => setHero({ ...hero, eyebrowText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Price Anchor (Highlighted Badge)
            </label>
            <input
              type="text"
              value={hero.priceAnchor}
              onChange={(e) => setHero({ ...hero, priceAnchor: e.target.value })}
              placeholder="$159"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>
        </div>
      </div>

      {/* Primary Headline Breakdown */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Display Headline Structure
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Line 1
            </label>
            <input
              type="text"
              value={hero.headlineLine1}
              onChange={(e) => setHero({ ...hero, headlineLine1: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Line 2
            </label>
            <input
              type="text"
              value={hero.headlineLine2}
              onChange={(e) => setHero({ ...hero, headlineLine2: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-2">
              Highlight Word (Green)
            </label>
            <input
              type="text"
              value={hero.headlineHighlight}
              onChange={(e) => setHero({ ...hero, headlineHighlight: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-bold focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Line 3
            </label>
            <input
              type="text"
              value={hero.headlineLine3}
              onChange={(e) => setHero({ ...hero, headlineLine3: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            Description Paragraph
          </label>
          <textarea
            rows={3}
            value={hero.description}
            onChange={(e) => setHero({ ...hero, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B] leading-relaxed"
          />
        </div>
      </div>

      {/* CTAs */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Call-To-Action Buttons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Primary CTA */}
          <div className="space-y-3 p-4 rounded-xl bg-[#162C20] border border-white/5">
            <span className="text-xs font-black text-[#B7E84B] uppercase tracking-wider block">
              Primary Button (Lime Filled)
            </span>
            <div>
              <label className="block text-[11px] font-bold text-white/60 mb-1 uppercase">Button Text</label>
              <input
                type="text"
                value={hero.primaryCtaText}
                onChange={(e) => setHero({ ...hero, primaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-white/60 mb-1 uppercase">Target URL or Anchor</label>
              <input
                type="text"
                value={hero.primaryCtaUrl}
                onChange={(e) => setHero({ ...hero, primaryCtaUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
              />
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="space-y-3 p-4 rounded-xl bg-[#162C20] border border-white/5">
            <span className="text-xs font-black text-white/80 uppercase tracking-wider block">
              Secondary Button (Outline)
            </span>
            <div>
              <label className="block text-[11px] font-bold text-white/60 mb-1 uppercase">Button Text</label>
              <input
                type="text"
                value={hero.secondaryCtaText}
                onChange={(e) => setHero({ ...hero, secondaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-white/60 mb-1 uppercase">Target URL or Anchor</label>
              <input
                type="text"
                value={hero.secondaryCtaUrl}
                onChange={(e) => setHero({ ...hero, secondaryCtaUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guarantees / Badges */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Trust Badges & Guarantees</h2>
            <p className="text-xs text-white/50">Displayed directly beneath the hero CTA buttons</p>
          </div>
          <button
            type="button"
            onClick={handleAddGuarantee}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Badge</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hero.guarantees.map((g) => (
            <div
              key={g.id}
              className="p-3 rounded-xl bg-[#162C20] border border-white/10 flex items-center justify-between gap-3"
            >
              <input
                type="text"
                value={g.text}
                onChange={(e) =>
                  setHero((prev) => ({
                    ...prev,
                    guarantees: prev.guarantees.map((item) =>
                      item.id === g.id ? { ...item, text: e.target.value } : item
                    ),
                  }))
                }
                className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
              />
              <button
                type="button"
                onClick={() => handleRemoveGuarantee(g.id)}
                className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
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
