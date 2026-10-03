import React, { useState, useEffect } from 'react';
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
  Image as ImageIcon,
  Search,
  Compass,
  Code2,
  Rocket,
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { SectionMeta, ClientLogoItem, ProcessStepItem, ComparisonItem } from '../../types/cms';

const DEFAULT_CLIENT_LOGOS: ClientLogoItem[] = [
  { id: 'goldandgrove', name: 'Gold & Grove', category: 'Skin Nutrition & Wellness', sortOrder: 0, visible: true },
  { id: 'premiumtrendsshop', name: 'Premium Trends Shop', category: 'Curated DTC & Lifestyle', sortOrder: 1, visible: true },
  { id: 'rosemira', name: 'Rosemira Organics', category: 'Doctor-Formulated Apothecary', sortOrder: 2, visible: true },
  { id: 'haomaearth', name: 'HAOMA Earth', category: 'Regenerative Skincare', sortOrder: 3, visible: true },
  { id: 'juicebeauty', name: 'Juice Beauty', category: 'Organic Clinical Beauty', sortOrder: 4, visible: true },
  { id: 'doctorsselect', name: "Doctor's Select", category: 'Nutraceutical Formulations', sortOrder: 5, visible: true },
  { id: 'naturezway', name: "Nature's Way", category: 'Botanical Herbal Remedies', sortOrder: 6, visible: true },
  { id: 'coalitionla', name: 'Coalition LA', category: 'Los Angeles Fashion & Streetwear', sortOrder: 7, visible: true },
];

const AVAILABLE_STEP_ICONS = [
  { value: 'Search', label: 'Search (Audit & Analysis)' },
  { value: 'Compass', label: 'Compass (UI/UX Design)' },
  { value: 'Code2', label: 'Code2 (Clean Engineering)' },
  { value: 'Rocket', label: 'Rocket (Launch & QA)' },
  { value: 'Zap', label: 'Zap (Lightning Speed)' },
  { value: 'ShieldCheck', label: 'ShieldCheck (Ownership & Security)' },
  { value: 'CheckCircle2', label: 'CheckCircle (Milestone Completion)' },
  { value: 'Sparkles', label: 'Sparkles (Polished Craft)' },
];

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
  const [comparisonForm, setComparisonForm] = useState({
    ...draftContent.comparison,
    eyebrow: draftContent.comparison?.eyebrow || 'ENGINEERED ADVANTAGE',
    headingPrefix: draftContent.comparison?.headingPrefix || 'PERFORMANCE AS PRESTIGE: THE ENGINEERED ADVANTAGE',
    subheading: draftContent.comparison?.subheading || 'A streamlined breakdown of traditional builds vs. our engineering-first infrastructure.',
    oldColumnHeading: draftContent.comparison?.oldColumnHeading || 'TRADITIONAL BUILD (DESIGN-FIRST)',
    newColumnHeading: draftContent.comparison?.newColumnHeading || 'ENGINEERED BUILD (INFRASTRUCTURE-FIRST)',
    ctaText: draftContent.comparison?.ctaText || 'REQUEST A TECH AUDIT',
    ctaUrl: draftContent.comparison?.ctaUrl || '#contact',
    items: draftContent.comparison?.items || [],
  });

  const [processForm, setProcessForm] = useState({
    ...draftContent.process,
    eyebrow: draftContent.process?.eyebrow || 'OUR SIMPLE 4-STEP PROCESS',
    headingPrefix: (draftContent.process as any)?.headingPrefix || draftContent.process?.heading || 'How We Take You From',
    headingHighlight: draftContent.process?.headingHighlight || 'Brief To Launch',
    subheading: draftContent.process?.subheading || 'Clear milestones, proactive communication, and quick deliveries. No endless waiting or confusing technical jargon.',
    steps: draftContent.process?.steps || [],
  });

  const [ctaForm, setCtaForm] = useState(draftContent.cta);

  // Marquee Brands & Headers State
  const [logosList, setLogosList] = useState<ClientLogoItem[]>(() => {
    if (draftContent.clientLogos && draftContent.clientLogos.length > 0) {
      return draftContent.clientLogos;
    }
    return DEFAULT_CLIENT_LOGOS;
  });

  const [logosConfig, setLogosConfig] = useState({
    subheading: draftContent.clientLogosConfig?.subheading || draftContent.statistics?.trustedBrandsLabel || '',
  });

  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ 
    type: 'process' | 'logo'; 
    index: number;
  } | null>(null);

  // Sync state if draftContent changes externally
  useEffect(() => {
    setHeroForm(draftContent.hero);
    setComparisonForm({
      ...draftContent.comparison,
      eyebrow: draftContent.comparison?.eyebrow || 'ENGINEERED ADVANTAGE',
      headingPrefix: draftContent.comparison?.headingPrefix || 'PERFORMANCE AS PRESTIGE: THE ENGINEERED ADVANTAGE',
      subheading: draftContent.comparison?.subheading || 'A streamlined breakdown of traditional builds vs. our engineering-first infrastructure.',
      oldColumnHeading: draftContent.comparison?.oldColumnHeading || 'TRADITIONAL BUILD (DESIGN-FIRST)',
      newColumnHeading: draftContent.comparison?.newColumnHeading || 'ENGINEERED BUILD (INFRASTRUCTURE-FIRST)',
      ctaText: draftContent.comparison?.ctaText || 'REQUEST A TECH AUDIT',
      ctaUrl: draftContent.comparison?.ctaUrl || '#contact',
      items: draftContent.comparison?.items || [],
    });
    setProcessForm({
      ...draftContent.process,
      eyebrow: draftContent.process?.eyebrow || 'OUR SIMPLE 4-STEP PROCESS',
      headingPrefix: (draftContent.process as any)?.headingPrefix || draftContent.process?.heading || 'How We Take You From',
      headingHighlight: draftContent.process?.headingHighlight || 'Brief To Launch',
      subheading: draftContent.process?.subheading || 'Clear milestones, proactive communication, and quick deliveries. No endless waiting or confusing technical jargon.',
      steps: draftContent.process?.steps || [],
    });
    setCtaForm(draftContent.cta);

    if (draftContent.clientLogos && draftContent.clientLogos.length > 0) {
      setLogosList(draftContent.clientLogos);
    }
    setLogosConfig({
      subheading: draftContent.clientLogosConfig?.subheading || draftContent.statistics?.trustedBrandsLabel || '',
    });
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

  // Save Handlers
  const handleSaveHero = async () => {
    await updateSection('hero', heroForm);
    showToast('success', 'Hero Saved', 'Hero showcase text, guarantees, and CTAs updated.');
  };

  const handleSaveLogos = async () => {
    await updateDraftContent({
      clientLogos: logosList,
      clientLogosConfig: logosConfig,
      statistics: {
        ...draftContent.statistics,
        trustedBrandsLabel: logosConfig.subheading,
      },
    });
    showToast('success', 'Marquee Saved', 'Client brand logos marquee updated.');
  };

  const handleSaveComparison = async () => {
    await updateSection('comparison', comparisonForm);
    showToast('success', 'Comparison Saved', 'Performance comparison table content and CTA updated.');
  };

  const handleSaveProcess = async () => {
    await updateSection('process', processForm);
    showToast('success', 'Process Saved', '4-Step rebuild process steps, icons, and images updated.');
  };

  const handleSaveCta = async () => {
    await updateSection('cta', ctaForm);
    showToast('success', 'CTA Banner Saved', 'Bottom call to action bar updated.');
  };

  // Brand items actions
  const handleMoveBrand = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= logosList.length) return;
    const updated = [...logosList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setLogosList(updated.map((item, idx) => ({ ...item, sortOrder: idx })));
  };

  const handleToggleBrandVisibility = (index: number) => {
    const updated = [...logosList];
    updated[index] = { ...updated[index], visible: updated[index].visible === false ? true : false };
    setLogosList(updated);
  };

  const handleDeleteBrand = (index: number) => {
    const updated = logosList.filter((_, idx) => idx !== index);
    setLogosList(updated.map((item, idx) => ({ ...item, sortOrder: idx })));
  };

  const handleAddBrand = () => {
    const newBrand: ClientLogoItem = {
      id: `brand-${Date.now()}`,
      name: 'New Client Brand',
      category: 'E-commerce & Lifestyle',
      logoUrl: '',
      sortOrder: logosList.length,
      visible: true,
    };
    setLogosList([...logosList, newBrand]);
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
            Control every piece of visible content on your homepage in the exact order it appears to visitors.
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
          <strong className="font-black text-blue-900">Single Source of Truth:</strong> When you edit text, toggle visibility, upload media, or reorder sections below, changes are saved to your working draft. Click <strong>Publish Changes</strong> in the top bar to push everything live for all public visitors.
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
                  
                  {/* ========================================================= */}
                  {/* 1. HERO SECTION FORM                                      */}
                  {/* ========================================================= */}
                  {section.id === 'hero' && (
                    <div className="space-y-6">
                      
                      {/* Social Proof Metric Badge */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-3">
                          Top Social Proof Badge (Reviews Modal Trigger)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Rating Score
                            </label>
                            <input
                              type="text"
                              value={heroForm.socialProofRating || '4.9/5'}
                              onChange={(e) => setHeroForm({ ...heroForm, socialProofRating: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                              placeholder="e.g. 4.9/5"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Rebuild Count Text
                            </label>
                            <input
                              type="text"
                              value={heroForm.socialProofCount || '40+ Rebuilds'}
                              onChange={(e) => setHeroForm({ ...heroForm, socialProofCount: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                              placeholder="e.g. 40+ Rebuilds"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Main Headline */}
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
                            Highlighted Word (Green Accent)
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

                      {/* Subheadline */}
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

                      {/* CTA Buttons */}
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

                  {/* ========================================================= */}
                  {/* 2. CLIENT BRAND LOGOS MARQUEE                             */}
                  {/* ========================================================= */}
                  {section.id === 'logos' && (
                    <div className="space-y-6">
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Manage the infinite scrolling client brand logos marquee shown on the public Homepage. Every displayed brand name, category subtitle, logo image, and order is customizable below.
                      </p>

                      {/* Marquee Sub-Heading */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase">
                          Marquee Sub-Heading
                        </label>
                        <input
                          type="text"
                          value={logosConfig.subheading}
                          onChange={(e) => setLogosConfig({ subheading: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                          placeholder="e.g. TRUSTED BY DIRECT-TO-CONSUMER FOUNDERS & SCALING BRANDS"
                        />
                      </div>

                      {/* Client Brands List */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                            Displayed Client Brands ({logosList.length})
                          </label>
                          <button
                            type="button"
                            onClick={handleAddBrand}
                            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg shadow-xs cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Brand</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {logosList.map((brand, idx) => (
                            <div 
                              key={brand.id || idx} 
                              className={`p-4 rounded-xl border transition-all bg-white shadow-xs space-y-3 ${
                                brand.visible === false ? 'opacity-60 border-slate-200 bg-slate-50/50' : 'border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-black flex items-center justify-center text-slate-700">
                                    {idx + 1}
                                  </span>
                                  <span className="text-xs font-black text-slate-900">
                                    {brand.name || 'Untitled Brand'}
                                  </span>
                                  {brand.visible === false && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                                      Hidden
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                  {/* Reorder Buttons */}
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => handleMoveBrand(idx, 'up')}
                                    className="p-1 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                                    title="Move brand left/earlier in marquee"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === logosList.length - 1}
                                    onClick={() => handleMoveBrand(idx, 'down')}
                                    className="p-1 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                                    title="Move brand right/later in marquee"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Visibility Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleBrandVisibility(idx)}
                                    className="p-1 hover:bg-slate-100 text-slate-600 rounded ml-1"
                                    title={brand.visible !== false ? 'Hide from public marquee' : 'Show in public marquee'}
                                  >
                                    {brand.visible !== false ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-rose-500" />}
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteBrand(idx)}
                                    className="p-1 hover:bg-rose-50 text-rose-500 hover:text-rose-700 rounded ml-1"
                                    title="Delete brand"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                    Client / Brand Name
                                  </label>
                                  <input
                                    type="text"
                                    value={brand.name}
                                    onChange={(e) => {
                                      const updated = [...logosList];
                                      updated[idx] = { ...brand, name: e.target.value };
                                      setLogosList(updated);
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="e.g. Gold & Grove"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                    Category / Subtitle
                                  </label>
                                  <input
                                    type="text"
                                    value={brand.category || ''}
                                    onChange={(e) => {
                                      const updated = [...logosList];
                                      updated[idx] = { ...brand, category: e.target.value };
                                      setLogosList(updated);
                                    }}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="e.g. Skin Nutrition & Wellness"
                                  />
                                </div>
                              </div>

                              {/* Brand Logo / Image */}
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                  Custom Brand Logo Image (Optional — uses built-in signature icon if blank)
                                </label>
                                <div className="flex items-center gap-2">
                                  {brand.logoUrl ? (
                                    <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                      <img src={brand.logoUrl} alt={brand.name} className="w-full h-full object-contain" />
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                      <ImageIcon className="w-4 h-4" />
                                    </div>
                                  )}
                                  <input
                                    type="text"
                                    value={brand.logoUrl || ''}
                                    onChange={(e) => {
                                      const updated = [...logosList];
                                      updated[idx] = { ...brand, logoUrl: e.target.value };
                                      setLogosList(updated);
                                    }}
                                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="Image URL or pick from Media Library"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setMediaPickerTarget({ type: 'logo', index: idx })}
                                    className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer shrink-0 border border-slate-200"
                                  >
                                    Pick Media
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={handleSaveLogos}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save Client Brand Logos</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* 3. PERFORMANCE COMPARISON TABLE                           */}
                  {/* ========================================================= */}
                  {section.id === 'comparison' && (
                    <div className="space-y-6">
                      
                      {/* Eyebrow & Main Headline */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Eyebrow / Tag
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
                            placeholder="PERFORMANCE AS PRESTIGE: THE ENGINEERED ADVANTAGE"
                          />
                        </div>
                      </div>

                      {/* Section Description / Subheading */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                          Section Description / Subheading
                        </label>
                        <textarea
                          rows={2}
                          value={comparisonForm.subheading || ''}
                          onChange={(e) => setComparisonForm({ ...comparisonForm, subheading: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs resize-y"
                          placeholder="A streamlined breakdown of traditional builds vs. our engineering-first infrastructure."
                        />
                      </div>

                      {/* Dual Column Headings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                          <label className="block text-[11px] font-black text-rose-600 uppercase tracking-wider mb-1.5">
                            Traditional Build Column Heading
                          </label>
                          <input
                            type="text"
                            value={comparisonForm.oldColumnHeading || ''}
                            onChange={(e) => setComparisonForm({ ...comparisonForm, oldColumnHeading: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="TRADITIONAL BUILD (DESIGN-FIRST)"
                          />
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                          <label className="block text-[11px] font-black text-emerald-700 uppercase tracking-wider mb-1.5">
                            Engineered Build Column Heading
                          </label>
                          <input
                            type="text"
                            value={comparisonForm.newColumnHeading || ''}
                            onChange={(e) => setComparisonForm({ ...comparisonForm, newColumnHeading: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="ENGINEERED BUILD (INFRASTRUCTURE-FIRST)"
                          />
                        </div>
                      </div>

                      {/* CTA Button: REQUEST A TECH AUDIT */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 block mb-3">
                          Section Bottom CTA Button
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Button Label
                            </label>
                            <input
                              type="text"
                              value={comparisonForm.ctaText || 'REQUEST A TECH AUDIT'}
                              onChange={(e) => setComparisonForm({ ...comparisonForm, ctaText: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                              placeholder="REQUEST A TECH AUDIT"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Destination Link / Action
                            </label>
                            <input
                              type="text"
                              value={comparisonForm.ctaUrl || '#contact'}
                              onChange={(e) => setComparisonForm({ ...comparisonForm, ctaUrl: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                              placeholder="#contact or /hire-us"
                            />
                          </div>
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
                              const newRow: ComparisonItem = {
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
                                  Old Way (Traditional / Fail)
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
                                    Rebuild Way (Engineered / Win)
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

                  {/* ========================================================= */}
                  {/* 4. 4-STEP REBUILD PROCESS                                  */}
                  {/* ========================================================= */}
                  {section.id === 'process' && (
                    <div className="space-y-6">
                      
                      {/* Eyebrow & Main Headline */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Section Eyebrow / Label
                          </label>
                          <input
                            type="text"
                            value={processForm.eyebrow || ''}
                            onChange={(e) => setProcessForm({ ...processForm, eyebrow: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="OUR SIMPLE 4-STEP PROCESS"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Main Headline Prefix
                          </label>
                          <input
                            type="text"
                            value={processForm.headingPrefix || ''}
                            onChange={(e) => setProcessForm({ ...processForm, headingPrefix: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="How We Take You From"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                            Main Headline Highlight
                          </label>
                          <input
                            type="text"
                            value={processForm.headingHighlight || ''}
                            onChange={(e) => setProcessForm({ ...processForm, headingHighlight: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-emerald-700 font-black text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
                            placeholder="Brief To Launch"
                          />
                        </div>
                      </div>

                      {/* Section Description / Subheading */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                          Section Description / Subheading
                        </label>
                        <textarea
                          rows={2}
                          value={processForm.subheading || ''}
                          onChange={(e) => setProcessForm({ ...processForm, subheading: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none shadow-xs resize-y"
                          placeholder="Clear milestones, proactive communication, and quick deliveries. No endless waiting or confusing technical jargon."
                        />
                      </div>

                      {/* Process Steps */}
                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-wider text-slate-800 block">
                          Process Steps Cards ({processForm.steps?.length || 0})
                        </label>

                        {(processForm.steps || []).map((step, idx) => (
                          <div key={step.id || idx} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                                Step {step.stepNumber || `0${idx + 1}`}: {step.title}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                  Step Number (e.g. 01)
                                </label>
                                <input
                                  type="text"
                                  value={step.stepNumber || `0${idx + 1}`}
                                  onChange={(e) => {
                                    const updated = [...processForm.steps];
                                    updated[idx] = { ...step, stepNumber: e.target.value };
                                    setProcessForm({ ...processForm, steps: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                />
                              </div>

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
                                  Small Footer Deliverable Label
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

                            {/* Icon & Description */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                  Card Icon
                                </label>
                                <select
                                  value={step.icon || 'Code2'}
                                  onChange={(e) => {
                                    const updated = [...processForm.steps];
                                    updated[idx] = { ...step, icon: e.target.value };
                                    setProcessForm({ ...processForm, steps: updated });
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                >
                                  {AVAILABLE_STEP_ICONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                  Step Description
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

                            {/* Step Image */}
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                                Step Card Image
                              </label>
                              <div className="flex items-center gap-3">
                                {step.image ? (
                                  <div className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-100 overflow-hidden shrink-0">
                                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                    <ImageIcon className="w-5 h-5" />
                                  </div>
                                )}
                                <input
                                  type="text"
                                  value={step.image || ''}
                                  onChange={(e) => {
                                    const updated = [...processForm.steps];
                                    updated[idx] = { ...step, image: e.target.value };
                                    setProcessForm({ ...processForm, steps: updated });
                                  }}
                                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                                  placeholder="Image URL or pick from Media Library"
                                />
                                <button
                                  type="button"
                                  onClick={() => setMediaPickerTarget({ type: 'process', index: idx })}
                                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer shrink-0 border border-slate-200"
                                >
                                  Pick Media
                                </button>
                              </div>
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

                  {/* ========================================================= */}
                  {/* 5. BOTTOM CALL TO ACTION BANNER                           */}
                  {/* ========================================================= */}
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
            if (mediaPickerTarget.type === 'process') {
              const updated = [...processForm.steps];
              updated[mediaPickerTarget.index] = {
                ...updated[mediaPickerTarget.index],
                image: url,
              };
              setProcessForm({ ...processForm, steps: updated });
            } else if (mediaPickerTarget.type === 'logo') {
              const updated = [...logosList];
              updated[mediaPickerTarget.index] = {
                ...updated[mediaPickerTarget.index],
                logoUrl: url,
              };
              setLogosList(updated);
            }
            setMediaPickerTarget(null);
          }}
        />
      )}
    </div>
  );
};
