import React, { useState } from 'react';
import { 
  Globe, 
  PanelBottom, 
  Megaphone, 
  Mail, 
  Check, 
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';

interface GlobalContentEditorProps {
  initialTab?: 'header' | 'footer' | 'cta' | 'contact';
}

export const GlobalContentEditor: React.FC<GlobalContentEditorProps> = ({ initialTab = 'header' }) => {
  const { draftContent, updateSection, setPreviewMode } = useCMS();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'header' | 'footer' | 'cta' | 'contact'>(initialTab);

  const [headerForm, setHeaderForm] = useState(draftContent.header);
  const [footerForm, setFooterForm] = useState(draftContent.footer);
  const [ctaForm, setCtaForm] = useState(draftContent.cta);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  React.useEffect(() => {
    setHeaderForm(draftContent.header);
    setFooterForm(draftContent.footer);
    setCtaForm(draftContent.cta);
  }, [draftContent]);

  const handleSaveHeader = async () => {
    await updateSection('header', headerForm);
    showToast('success', 'Header Saved', 'Brand name and logo settings saved.');
  };

  const handleSaveFooter = async () => {
    await updateSection('footer', footerForm);
    showToast('success', 'Footer Saved', 'Footer columns, copyright, and links saved.');
  };

  const handleSaveCta = async () => {
    await updateSection('cta', ctaForm);
    showToast('success', 'CTA Saved', 'Global buttons and bottom CTA bar saved.');
  };

  const handleSaveContact = async () => {
    await updateSection('footer', {
      ...footerForm,
      contactEmail: footerForm.contactEmail,
      contactPhone: footerForm.contactPhone,
      contactAddress: footerForm.contactAddress,
    });
    await updateSection('cta', {
      ...ctaForm,
      supportEmail: footerForm.contactEmail,
    });
    showToast('success', 'Contact Saved', 'Global contact information saved.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            Global Content
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Global Content Editor
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            Edit content that appears across every page of your website: Header, Footer, CTAs, and Contact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setPreviewMode(true);
              window.open('#/', '_blank');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Preview Website</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('header')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'header'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Header &amp; Branding
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'footer'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Footer &amp; Links
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cta')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'cta'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Buttons / CTAs
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'contact'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Contact Information
        </button>
      </div>

      {/* TAB 1: HEADER */}
      {activeTab === 'header' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={headerForm.brandName || ''}
                onChange={(e) => setHeaderForm({ ...headerForm, brandName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="Commerce"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Brand Highlight (Green accent)
              </label>
              <input
                type="text"
                value={headerForm.brandHighlight || ''}
                onChange={(e) => setHeaderForm({ ...headerForm, brandHighlight: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-emerald-700 text-xs font-black shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="Forge"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Brand Sub-Tagline
            </label>
            <input
              type="text"
              value={headerForm.brandTagline || ''}
              onChange={(e) => setHeaderForm({ ...headerForm, brandTagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="E-COMMERCE AGENCY"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveHeader}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Header Branding</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: FOOTER */}
      {activeTab === 'footer' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Footer Description
            </label>
            <textarea
              rows={2}
              value={footerForm.description || ''}
              onChange={(e) => setFooterForm({ ...footerForm, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="We rebuild sluggish storefronts into high-converting revenue drivers..."
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Copyright Notice Line
            </label>
            <input
              type="text"
              value={footerForm.copyrightText || ''}
              onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="Proudly crafted by CommerceForge Dev Team. High-performance eCommerce storefronts."
            />
          </div>

          {/* Footer Columns */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Footer Navigation Columns ({footerForm.columns?.length || 0})
            </label>
            <div className="space-y-4">
              {(footerForm.columns || []).map((col, cIdx) => (
                <div key={col.id || cIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={col.title}
                      onChange={(e) => {
                        const updated = [...footerForm.columns];
                        updated[cIdx] = { ...col, title: e.target.value };
                        setFooterForm({ ...footerForm, columns: updated });
                      }}
                      className="px-2.5 py-1 rounded border border-slate-300 bg-white text-xs font-black uppercase text-emerald-700 shadow-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    {(col.links || []).map((link, lIdx) => (
                      <div key={link.id || lIdx} className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => {
                            const updatedCols = [...footerForm.columns];
                            const updatedLinks = [...col.links];
                            updatedLinks[lIdx] = { ...link, label: e.target.value };
                            updatedCols[cIdx] = { ...col, links: updatedLinks };
                            setFooterForm({ ...footerForm, columns: updatedCols });
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 font-semibold shadow-xs"
                          placeholder="Label"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => {
                            const updatedCols = [...footerForm.columns];
                            const updatedLinks = [...col.links];
                            updatedLinks[lIdx] = { ...link, url: e.target.value };
                            updatedCols[cIdx] = { ...col, links: updatedLinks };
                            setFooterForm({ ...footerForm, columns: updatedCols });
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-700 shadow-xs"
                          placeholder="/page or #section"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveFooter}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Footer Content</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: CTAS */}
      {activeTab === 'cta' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Bottom Bar Callout Headline
            </label>
            <input
              type="text"
              value={ctaForm.headingPrefix || ''}
              onChange={(e) => setCtaForm({ ...ctaForm, headingPrefix: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="LOOKING FOR A DESIGN AND DEVELOPMENT PARTNER?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Primary Button Label
              </label>
              <input
                type="text"
                value={ctaForm.primaryCtaText || ''}
                onChange={(e) => setCtaForm({ ...ctaForm, primaryCtaText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="LET'S WORK TOGETHER"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Primary Button Destination
              </label>
              <input
                type="text"
                value={ctaForm.primaryCtaUrl || ''}
                onChange={(e) => setCtaForm({ ...ctaForm, primaryCtaUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="#contact or /hire-us"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveCta}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save CTAs</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: CONTACT INFO */}
      {activeTab === 'contact' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={footerForm.contactEmail || ''}
                onChange={(e) => setFooterForm({ ...footerForm, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="contact@commerceforge.agency"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Support Phone / WhatsApp
              </label>
              <input
                type="text"
                value={footerForm.contactPhone || ''}
                onChange={(e) => setFooterForm({ ...footerForm, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="+1 (555) 019-2834"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Office / Operating Hours Note
            </label>
            <input
              type="text"
              value={footerForm.contactAddress || ''}
              onChange={(e) => setFooterForm({ ...footerForm, contactAddress: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="Monday–Friday, 9am–6pm EST. Rapid 24hr proposal turnaround."
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveContact}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Contact Information</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
