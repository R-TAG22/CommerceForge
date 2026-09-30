import React, { useState } from 'react';
import { Save, Megaphone, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CtaBannerContent } from '../../types/cms';
import { useToast } from '../components/Toast';

export const CtaEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [cta, setCta] = useState<CtaBannerContent>(
    JSON.parse(JSON.stringify(draftContent.cta))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('cta', cta);
      showToast('success', 'CTA Banner Draft Saved', 'Call-to-action banner updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('cta', cta);
      showToast('success', 'Published Live!', 'Call-to-action banner changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <Megaphone className="w-4 h-4" />
            <span>Conversion Finisher</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Call-To-Action Banner</h1>
          <p className="text-xs text-white/60">
            Configure the final bottom conversion section, free audit offer, and contact details
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

      {/* Headlines */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Headline & Value Proposition
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={cta.eyebrow}
              onChange={(e) => setCta({ ...cta, eyebrow: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Heading Prefix
            </label>
            <input
              type="text"
              value={cta.headingPrefix}
              onChange={(e) => setCta({ ...cta, headingPrefix: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
              Heading Highlight
            </label>
            <input
              type="text"
              value={cta.headingHighlight}
              onChange={(e) => setCta({ ...cta, headingHighlight: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
            Subheading
          </label>
          <textarea
            rows={2}
            value={cta.subheading}
            onChange={(e) => setCta({ ...cta, subheading: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white leading-relaxed"
          />
        </div>
      </div>

      {/* Button & Guarantee */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Primary Action & Guarantee
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Button Label
            </label>
            <input
              type="text"
              value={cta.buttonText}
              onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Action Target (#contact or email link)
            </label>
            <input
              type="text"
              value={cta.buttonUrl}
              onChange={(e) => setCta({ ...cta, buttonUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
            Guarantee Subtext
          </label>
          <input
            type="text"
            value={cta.guaranteeText}
            onChange={(e) => setCta({ ...cta, guaranteeText: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
          />
        </div>
      </div>

      {/* Contact Channels */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Direct Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Direct Contact Email
            </label>
            <input
              type="email"
              value={cta.contactEmail}
              onChange={(e) => setCta({ ...cta, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Turnaround Response Note
            </label>
            <input
              type="text"
              value={cta.turnaroundNote}
              onChange={(e) => setCta({ ...cta, turnaroundNote: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
