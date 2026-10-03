import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Edit3, 
  Check, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { SectionMeta } from '../../types/cms';

export const HomepageEditor: React.FC = () => {
  const { activeContent, draftContent, updateSection, updateDraftContent, setPreviewMode } = useCMS();
  const { showToast } = useToast();

  const defaultHomeSections: SectionMeta[] = [
    { id: 'hero', name: 'Hero Showcase & Before/After Frame', type: 'hero', visible: true, sortOrder: 0 },
    { id: 'logos', name: 'Client Brand Logos Marquee', type: 'logos', visible: true, sortOrder: 1 },
    { id: 'comparison', name: 'Performance Comparison Table', type: 'comparison', visible: true, sortOrder: 2 },
    { id: 'process', name: '4-Step Rebuild Process', type: 'process', visible: true, sortOrder: 3 },
    { id: 'cta', name: 'Bottom Call To Action Banner', type: 'cta', visible: true, sortOrder: 4 },
  ];

  const sections: SectionMeta[] = (draftContent.pageSections?.home && draftContent.pageSections.home.length > 0)
    ? draftContent.pageSections.home
    : defaultHomeSections;

  // Active section currently open for detailed editing
  const [editingSectionId, setEditingSectionId] = useState<string | null>('hero');

  // Form states for sections
  const [heroForm, setHeroForm] = useState(draftContent.hero);
  const [comparisonForm, setComparisonForm] = useState(draftContent.comparison);
  const [processForm, setProcessForm] = useState(draftContent.process);
  const [ctaForm, setCtaForm] = useState(draftContent.cta);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ field: string; index?: number } | null>(null);

  // Sync state if draftContent changes externally
  React.useEffect(() => {
    setHeroForm(draftContent.hero);
    setComparisonForm(draftContent.comparison);
    setProcessForm(draftContent.process);
    setCtaForm(draftContent.cta);
  }, [draftContent]);

  // Section order & visibility updates
  const handleToggleVisibility = async (sectionId: string, currentVisible: boolean) => {
    const updated = sections.map((s) => s.id === sectionId ? { ...s, visible: !currentVisible } : s);
    await updateDraftContent({
      pageSections: {
        ...draftContent.pageSections,
        home: updated,
      },
    });
    showToast('success', 'Section Updated', `${sectionId} is now ${!currentVisible ? 'visible' : 'hidden'} on public site.`);
  };

  const handleMoveSection = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    const sorted = newSections.map((s, idx) => ({ ...s, sortOrder: idx }));

    await updateDraftContent({
      pageSections: {
        ...draftContent.pageSections,
        home: sorted,
      },
    });
    showToast('success', 'Homepage Reordered', 'Section order updated on public site.');
  };

  // Save specific sections
  const handleSaveHero = async () => {
    await updateSection('hero', heroForm);
    showToast('success', 'Hero Saved', 'Hero showcase text and buttons updated.');
  };

  const handleSaveComparison = async () => {
    await updateSection('comparison', comparisonForm);
    showToast('success', 'Comparison Saved', 'Performance comparison metrics updated.');
  };

  const handleSaveProcess = async () => {
    await updateSection('process', processForm);
    showToast('success', 'Process Saved', '4-Step rebuild process updated.');
  };

  const handleSaveCta = async () => {
    await updateSection('cta', ctaForm);
    showToast('success', 'CTA Banner Saved', 'Bottom call to action bar updated.');
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
            Homepage Editor
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            Control every section on your homepage in the exact order it appears to visitors.
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
            <span>View Homepage</span>
          </button>
        </div>
      </div>

      {/* Helpful tip card */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3 shadow-xs">
        <span className="text-xl">💡</span>
        <div className="text-xs text-blue-950 leading-relaxed font-medium">
          <strong className="font-black text-blue-900">Single Source of Truth:</strong> When you edit text, toggle visibility, or move sections up/down below, the public website updates immediately. Click <strong>Publish Changes</strong> in the top bar when you are ready to make changes live for all visitors.
        </div>
      </div>

      {/* Sections List in Visual Order */}
      <div className="space-y-5">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-600 px-1">
          Homepage Sections (Displayed in Top-to-Bottom Order)
        </h2>

        {sections.map((section, index) => {
          const isExpanded = editingSectionId === section.id;
          const isVisible = section.visible !== false;

          return (
            <div 
              key={section.id} 
              className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-sm ${
                isExpanded 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header Bar - Pure White */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-xs font-black text-slate-800">
                    {index + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        {section.name}
                      </h3>
                      {!isVisible && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                          Hidden
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      ID: #{section.id}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Reorder Buttons */}
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-xs">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveSection(index, 'up')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move section up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-300" />
                    <button
                      type="button"
                      disabled={index === sections.length - 1}
                      onClick={() => handleMoveSection(index, 'down')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move section down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(section.id, isVisible)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer shadow-xs ${
                      isVisible 
                        ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50' 
                        : 'border-rose-300 bg-rose-50 text-rose-700'
                    }`}
                    title={isVisible ? 'Hide section from public site' : 'Show section on public site'}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-rose-600" />}
                    <span className="hidden sm:inline">{isVisible ? 'Visible' : 'Hidden'}</span>
                  </button>

                  {/* Expand / Edit Toggle */}
                  <button
                    type="button"
                    onClick={() => setEditingSectionId(isExpanded ? null : section.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                      isExpanded 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#B7E84B] text-[#0E1B13] hover:bg-[#a6d93b]'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'Editing' : 'Edit'}</span>
                  </button>
                </div>
              </div>

              {/* Form Editor Body - White and Light Background with Dark Text */}
              {isExpanded && (
                <div className="p-5 sm:p-7 border-t border-slate-200 bg-slate-50/70">
                  {/* HERO SECTION FORM */}
                  {section.id === 'hero' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Headline Line 1
                          </label>
                          <input
                            type="text"
                            value={heroForm.headlineLine1 || ''}
                            onChange={(e) => setHeroForm({ ...heroForm, headlineLine1: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs"
                            placeholder="e.g. TURN VISITORS"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Headline Line 2
                          </label>
                          <input
                            type="text"
                            value={heroForm.headlineLine2 || ''}
                            onChange={(e) => setHeroForm({ ...heroForm, headlineLine2: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs"
                            placeholder="e.g. INTO"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Highlighted Word (Green accent)
                          </label>
                          <input
                            type="text"
                            value={heroForm.headlineHighlight || ''}
                            onChange={(e) => setHeroForm({ ...heroForm, headlineHighlight: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-emerald-700 font-black text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs"
                            placeholder="e.g. BUYERS"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                          Subheadline &amp; Story Pitch
                        </label>
                        <textarea
                          rows={3}
                          value={heroForm.description || ''}
                          onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs resize-y"
                          placeholder="e.g. We rebuild slow, outdated site into high-speed sales engines. Handcrafted, mobile-first and delivered in 7 days."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 block mb-3">
                            Primary CTA Button
                          </span>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Button Label
                              </label>
                              <input
                                type="text"
                                value={heroForm.primaryCtaText || ''}
                                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="GET A FREE QUOTE"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Destination / Action
                              </label>
                              <input
                                type="text"
                                value={heroForm.primaryCtaUrl || ''}
                                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaUrl: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="#contact or /hire-us"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-3">
                            Secondary Button
                          </span>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Button Label
                              </label>
                              <input
                                type="text"
                                value={heroForm.secondaryCtaText || ''}
                                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="VIEW PACKAGES"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Destination URL
                              </label>
                              <input
                                type="text"
                                value={heroForm.secondaryCtaUrl || ''}
                                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaUrl: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="/packages"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Micro-Trust Guarantees */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                            Subtle Micro-Trust Guarantees (Below Buttons)
                          </label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {(heroForm.guarantees || []).map((g, idx) => (
                            <div key={g.id || idx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={g.text}
                                onChange={(e) => {
                                  const updated = [...heroForm.guarantees];
                                  updated[idx] = { ...g, text: e.target.value };
                                  setHeroForm({ ...heroForm, guarantees: updated });
                                }}
                                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="e.g. ⚡ 7–10 Day Delivery"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={handleSaveHero}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save Hero Showcase</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CLIENT LOGOS SECTION */}
                  {section.id === 'logos' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-600 font-medium">
                        Brand logo marquee showcasing clients like Gold &amp; Grove, Premium Trends Shop, Sultans Fabrics, and Haoma Earth.
                      </p>
                      <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-2">
                          Marquee Brand Sub-Heading
                        </span>
                        <input
                          type="text"
                          defaultValue={draftContent.statistics?.trustedBrandsLabel || 'TRUSTED BY DIRECT-TO-CONSUMER FOUNDERS & SCALING BRANDS'}
                          onChange={(e) => {
                            updateSection('statistics', {
                              ...draftContent.statistics,
                              trustedBrandsLabel: e.target.value,
                            });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* COMPARISON TABLE FORM */}
                  {section.id === 'comparison' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Eyebrow Tag
                          </label>
                          <input
                            type="text"
                            value={comparisonForm.eyebrow || ''}
                            onChange={(e) => setComparisonForm({ ...comparisonForm, eyebrow: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="ENGINEERED ADVANTAGE"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Main Headline
                          </label>
                          <input
                            type="text"
                            value={comparisonForm.headingPrefix || ''}
                            onChange={(e) => setComparisonForm({ ...comparisonForm, headingPrefix: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="PERFORMANCE AS PRESTIGE"
                          />
                        </div>
                      </div>

                      {/* Comparison Items */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                            Comparison Metrics Rows ({comparisonForm.items?.length || 0})
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const newRow = {
                                id: `metric-${Date.now()}`,
                                aspect: 'Custom Metric',
                                oldWay: 'Slow / High Drop-off',
                                rebuildWay: 'Sub-second / High Lift',
                                sortOrder: (comparisonForm.items?.length || 0),
                                icon: 'Zap'
                              };
                              setComparisonForm({
                                ...comparisonForm,
                                items: [...(comparisonForm.items || []), newRow],
                              });
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg shadow-xs cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Row</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {(comparisonForm.items || []).map((item, idx) => (
                            <div key={item.id || idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                              <div>
                                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                                  Metric / Aspect
                                </label>
                                <input
                                  type="text"
                                  value={item.aspect}
                                  onChange={(e) => {
                                    const updated = [...comparisonForm.items];
                                    updated[idx] = { ...item, aspect: e.target.value };
                                    setComparisonForm({ ...comparisonForm, items: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-black text-rose-600 uppercase tracking-wider mb-1">
                                  Old Way (Red / Fail)
                                </label>
                                <input
                                  type="text"
                                  value={item.oldWay}
                                  onChange={(e) => {
                                    const updated = [...comparisonForm.items];
                                    updated[idx] = { ...item, oldWay: e.target.value };
                                    setComparisonForm({ ...comparisonForm, items: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-rose-300 bg-rose-50/30 text-rose-900 font-semibold text-xs outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <label className="block text-[11px] font-black text-emerald-700 uppercase tracking-wider mb-1">
                                    Rebuild Way (Green / Win)
                                  </label>
                                  <input
                                    type="text"
                                    value={item.rebuildWay}
                                    onChange={(e) => {
                                      const updated = [...comparisonForm.items];
                                      updated[idx] = { ...item, rebuildWay: e.target.value };
                                      setComparisonForm({ ...comparisonForm, items: updated });
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-emerald-300 bg-emerald-50/30 text-emerald-900 font-black text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = comparisonForm.items.filter((_, i) => i !== idx);
                                    setComparisonForm({ ...comparisonForm, items: updated });
                                  }}
                                  className="mt-5 p-2 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                                  title="Delete row"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={handleSaveComparison}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save Comparison Table</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 4-STEP PROCESS FORM */}
                  {section.id === 'process' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Process Eyebrow
                          </label>
                          <input
                            type="text"
                            value={processForm.eyebrow || ''}
                            onChange={(e) => setProcessForm({ ...processForm, eyebrow: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="HOW WE WORK"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Heading Highlight
                          </label>
                          <input
                            type="text"
                            value={processForm.headingHighlight || ''}
                            onChange={(e) => setProcessForm({ ...processForm, headingHighlight: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="FROM TIRED CODE TO SPEED ENGINE"
                          />
                        </div>
                      </div>

                      {/* Process Steps */}
                      <div className="space-y-4">
                        {(processForm.steps || []).map((step, idx) => (
                          <div key={step.id || idx} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                                Step {step.stepNumber || idx + 1}: {step.title}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                  Step Title
                                </label>
                                <input
                                  type="text"
                                  value={step.title}
                                  onChange={(e) => {
                                    const updated = [...processForm.steps];
                                    updated[idx] = { ...step, title: e.target.value };
                                    setProcessForm({ ...processForm, steps: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                  Deliverable Badge
                                </label>
                                <input
                                  type="text"
                                  value={step.deliverable || ''}
                                  onChange={(e) => {
                                    const updated = [...processForm.steps];
                                    updated[idx] = { ...step, deliverable: e.target.value };
                                    setProcessForm({ ...processForm, steps: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Description
                              </label>
                              <textarea
                                rows={2}
                                value={step.description}
                                onChange={(e) => {
                                  const updated = [...processForm.steps];
                                  updated[idx] = { ...step, description: e.target.value };
                                  setProcessForm({ ...processForm, steps: updated });
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs resize-y outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={handleSaveProcess}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save Process Steps</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM CTA FORM */}
                  {section.id === 'cta' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                          CTA Bar Headline
                        </label>
                        <input
                          type="text"
                          value={ctaForm.headingPrefix || ''}
                          onChange={(e) => setCtaForm({ ...ctaForm, headingPrefix: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                          placeholder="LOOKING FOR A DESIGN AND DEVELOPMENT PARTNER?"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Button Label
                          </label>
                          <input
                            type="text"
                            value={ctaForm.primaryCtaText || ''}
                            onChange={(e) => setCtaForm({ ...ctaForm, primaryCtaText: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="LET'S WORK TOGETHER"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Button Target
                          </label>
                          <input
                            type="text"
                            value={ctaForm.primaryCtaUrl || ''}
                            onChange={(e) => setCtaForm({ ...ctaForm, primaryCtaUrl: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="#contact or /hire-us"
                          />
                        </div>
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={handleSaveCta}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save Bottom CTA</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <MediaPickerModal
          isOpen={!!mediaPickerTarget}
          onClose={() => setMediaPickerTarget(null)}
          onSelect={(url) => {
            setMediaPickerTarget(null);
          }}
        />
      )}
    </div>
  );
};
