import React, { useState } from 'react';
import { Save, PanelBottom, Plus, Trash2, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { FooterContent, SocialLinkItem } from '../../types/cms';
import { useToast } from '../components/Toast';

export const FooterEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [footer, setFooter] = useState<FooterContent>(
    JSON.parse(JSON.stringify(draftContent.footer))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('footer', footer);
      showToast('success', 'Footer Draft Saved', 'Footer settings updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('footer', footer);
      showToast('success', 'Published Live!', 'Footer changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddSocial = () => {
    const newSocial: SocialLinkItem = {
      id: `soc-${Date.now()}`,
      platform: 'Twitter',
      url: 'https://twitter.com',
      icon: 'Twitter',
      active: true,
    };
    setFooter((prev) => ({ ...prev, socialLinks: [...prev.socialLinks, newSocial] }));
  };

  const handleSocialChange = (id: string, field: keyof SocialLinkItem, val: unknown) => {
    setFooter((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    }));
  };

  const handleDeleteSocial = (id: string) => {
    setFooter((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((s) => s.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <PanelBottom className="w-4 h-4" />
            <span>Site Baseline</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Footer & Legal</h1>
          <p className="text-xs text-white/60">Configure bottom brand details, copyright, and social links</p>
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

      {/* Brand & Tagline */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Footer Branding & Description
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Brand Primary
            </label>
            <input
              type="text"
              value={footer.brandName}
              onChange={(e) => setFooter({ ...footer, brandName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Brand Highlight
            </label>
            <input
              type="text"
              value={footer.brandHighlight}
              onChange={(e) => setFooter({ ...footer, brandHighlight: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={footer.tagline}
              onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
            Studio Description
          </label>
          <textarea
            rows={2}
            value={footer.description}
            onChange={(e) => setFooter({ ...footer, description: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Copyright Notice
            </label>
            <input
              type="text"
              value={footer.copyrightText}
              onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={footer.contactEmail}
              onChange={(e) => setFooter({ ...footer, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Social Media Profiles</h2>
            <p className="text-xs text-white/50">External links for studio channels</p>
          </div>
          <button
            type="button"
            onClick={handleAddSocial}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Social Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {footer.socialLinks.map((soc) => (
            <div
              key={soc.id}
              className="p-3.5 rounded-xl bg-[#162C20] border border-white/10 flex items-center gap-4"
            >
              <div className="w-36">
                <input
                  type="text"
                  placeholder="Platform"
                  value={soc.platform}
                  onChange={(e) => handleSocialChange(soc.id, 'platform', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="URL"
                  value={soc.url}
                  onChange={(e) => handleSocialChange(soc.id, 'url', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={soc.active}
                  onChange={(e) => handleSocialChange(soc.id, 'active', e.target.checked)}
                  className="rounded border-white/20 text-[#B7E84B] focus:ring-[#B7E84B]"
                />
                <span>Active</span>
              </label>

              <button
                type="button"
                onClick={() => handleDeleteSocial(soc.id)}
                className="p-1.5 text-white/40 hover:text-red-400"
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
