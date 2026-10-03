import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Image as ImageIcon, 
  ExternalLink,
  Edit3,
  HelpCircle,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { TeamMemberItem, BrandValueItem } from '../../types/cms';

const DEFAULT_ACCELERATION_SERVICES: BrandValueItem[] = [
  {
    id: 'service-1',
    title: 'HANDCRAFTED COMMERCE',
    description: 'Custom, sub-second conversion-tuned stores.',
    icon: 'chart',
  },
  {
    id: 'service-2',
    title: 'SCALABLE PLATFORMS',
    description: 'Total codebase ownership, adaptable architecture.',
    icon: 'lock',
  },
  {
    id: 'service-3',
    title: 'CONVERSION-FIRST UX',
    description: 'Customer paths engineered for conversion.',
    icon: 'phone',
  },
  {
    id: 'service-4',
    title: 'GLOBAL PERFORMANCE',
    description: 'Built for domestic and international markets.',
    icon: 'globe',
  },
];

export const AboutEditor: React.FC = () => {
  const { draftContent, updateSection, updateDraftContent, setPreviewMode } = useCMS();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'mission' | 'promise' | 'team' | 'services'>('mission');

  // Prepare brandForm with all guaranteed defaults
  const getInitialBrandForm = () => {
    const b = draftContent.brand || {} as any;
    
    // Ensure all 4 acceleration services exist
    let servicesList = Array.isArray(b.values) ? [...b.values] : [];
    if (servicesList.length < 4) {
      for (let i = servicesList.length; i < 4; i++) {
        servicesList.push({ ...DEFAULT_ACCELERATION_SERVICES[i] });
      }
    }

    return {
      ...b,
      eyebrow: b.eyebrow || 'WHO WE ARE',
      headingPrefix: b.headingPrefix || 'E-COMMERCE',
      headingHighlight: b.headingHighlight || 'PATHFINDERS.',
      standardsTitle: b.standardsTitle || 'SENIOR COMMERCE PATHFINDERS',
      descriptionParagraphs: Array.isArray(b.descriptionParagraphs) && b.descriptionParagraphs.length > 0
        ? b.descriptionParagraphs
        : [
            'Independent brands deserve agency-level quality, conversion-focused customer paths, and engineered performance free from bloat.',
            'Combining artisanal code with data-driven strategy, we ensure you OWN 100% OF YOUR CODEBASE AND ASSETS.',
          ],
      // Primary Button ("REQUEST A REVENUE PROJECTION")
      revenueCtaText: b.revenueCtaText || 'REQUEST A REVENUE PROJECTION',
      revenueCtaUrl: b.revenueCtaUrl || '#contact',
      // Secondary Button ("WORK WITH US")
      ctaText: b.ctaText || 'WORK WITH US',
      ctaUrl: b.ctaUrl || '#contact',
      // Milestone Terms line
      pricingMilestoneText: b.pricingMilestoneText || '🧮 Transparent 50/50 Milestone Terms & Pricing Regimen.',
      // Acceleration Services header
      servicesEyebrow: b.servicesEyebrow || 'WHAT WE DO',
      servicesHeading: b.servicesHeading || 'OUR E-COMMERCE ACCELERATION SERVICES',
      values: servicesList,
      // Team Section header
      teamEyebrow: b.teamEyebrow || 'CORE DEV TEAM LEADERSHIP',
      teamHeading: b.teamHeading || 'MEET THE TEAM',
      teamDescription: b.teamDescription || 'The dedicated developers, operations specialists, and digital artisans behind every high-performance CommerceForge storefront.',
    };
  };

  const [brandForm, setBrandForm] = useState(getInitialBrandForm());

  // Promise form
  const [promiseForm, setPromiseForm] = useState(draftContent.promiseSection || {
    id: 'promise-section',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    badge: 'THE COMMERCEFORGE PROMISE',
    heading: 'ARCHITECTED FOR REAL-WORLD MERCHANT CONVERSION.',
    description: "We build modern Next.js/Vite storefronts that don't crack under load. Adhering to Core Web Vitals, optimized for sub-second TTFB, and verified accessibility standards — all with full code ownership. No bulky themes, just fast delivery.",
    cards: [
      { id: 'p1', icon: 'Zap', title: 'SUB-800MS PAGE LOADS', description: 'Optimized asset delivery and edge caching ensure customers never bounce.' },
      { id: 'p2', icon: 'Accessibility', title: 'FULL WCAG ACCESSIBILITY', description: 'High contrast and semantic landmarks for inclusive shopping.' },
      { id: 'p3', icon: 'Smartphone', title: 'MOBILE-FIRST CHECKOUT', description: 'Engineered thumb-friendly buttons and lightning-fast express flows.' },
    ],
    ctaText: 'SEE OUR WORK',
    ctaUrl: '/work',
    visible: true,
  });

  // Team members list
  const [teamList, setTeamList] = useState<TeamMemberItem[]>(draftContent.teamMembers || []);

  // Media Picker state
  const [mediaPickerTarget, setMediaPickerTarget] = useState<{ memberIndex?: number } | null>(null);

  // Editing single team member modal
  const [editingMember, setEditingMember] = useState<{ index: number; member: TeamMemberItem } | null>(null);

  useEffect(() => {
    setBrandForm(getInitialBrandForm());
    if (draftContent.promiseSection) {
      setPromiseForm(draftContent.promiseSection);
    }
    if (draftContent.teamMembers) {
      setTeamList(draftContent.teamMembers);
    }
  }, [draftContent]);

  // Save Brand / Intro
  const handleSaveBrand = async () => {
    await updateSection('brand', brandForm);
    showToast('success', 'About Page Content Saved', 'All hero, buttons, pricing line, and services updated.');
  };

  // Save Promise
  const handleSavePromise = async () => {
    await updateDraftContent({ promiseSection: promiseForm });
    showToast('success', 'Promise Section Saved', 'The CommerceForge Promise card updated.');
  };

  // Team Member actions
  const handleSaveTeamList = async (updated: TeamMemberItem[]) => {
    setTeamList(updated);
    await updateDraftContent({ teamMembers: updated });
    showToast('success', 'Team Updated', 'Team member changes saved.');
  };

  const handleAddTeamMember = () => {
    const newMember: TeamMemberItem = {
      id: `member-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: 'New Developer',
      role: 'Full-Stack Engineer',
      isFounder: false,
      specializations: ['Web Developer', 'E-commerce Operations'],
      bio: 'Crafts responsive UI components, optimized catalog systems, and high-conversion storefronts.',
      image: `${import.meta.env.BASE_URL}images/team/RUSSELL T.jpg`,
      sortOrder: teamList.length,
      visible: true,
    };
    const updated = [...teamList, newMember];
    handleSaveTeamList(updated);
    setEditingMember({ index: teamList.length, member: newMember });
  };

  const handleMoveMember = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= teamList.length) return;
    const updated = [...teamList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const sorted = updated.map((m, idx) => ({ ...m, sortOrder: idx }));
    handleSaveTeamList(sorted);
  };

  const handleDeleteMember = (index: number) => {
    if (window.confirm(`Delete team member "${teamList[index].name}"?`)) {
      const updated = teamList.filter((_, i) => i !== index);
      handleSaveTeamList(updated);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 admin-cms text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            Page Editor
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            About Page Editor
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            100% of visible public About page content is controlled here: Hero, Buttons, Acceleration Services, Promise &amp; Team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setPreviewMode(true);
              window.open('#/about', '_blank');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>View About Page</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('mission')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'mission'
              ? 'border-emerald-600 text-emerald-800 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Hero &amp; Mission Story
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'services'
              ? 'border-emerald-600 text-emerald-800 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Acceleration Services (What We Do)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'team'
              ? 'border-emerald-600 text-emerald-800 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. Dev Team Members ({teamList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('promise')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'promise'
              ? 'border-emerald-600 text-emerald-800 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          4. The CommerceForge Promise
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: HERO & MISSION STORY                                               */}
      {/* ========================================================================= */}
      {activeTab === 'mission' && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
              Hero Headlines &amp; Story Pitch
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Controls the main left-hand hero text and mission paragraphs on the public About page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Eyebrow Badge
              </label>
              <input
                type="text"
                value={brandForm.eyebrow || ''}
                onChange={(e) => setBrandForm({ ...brandForm, eyebrow: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="WHO WE ARE"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Headline Line 1
              </label>
              <input
                type="text"
                value={brandForm.headingPrefix || ''}
                onChange={(e) => setBrandForm({ ...brandForm, headingPrefix: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="E-COMMERCE"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Headline Line 2
              </label>
              <input
                type="text"
                value={brandForm.headingHighlight || ''}
                onChange={(e) => setBrandForm({ ...brandForm, headingHighlight: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="PATHFINDERS."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Subheading / Credo
            </label>
            <input
              type="text"
              value={brandForm.standardsTitle || ''}
              onChange={(e) => setBrandForm({ ...brandForm, standardsTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="SENIOR COMMERCE PATHFINDERS"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                Story Paragraphs
              </label>
              <button
                type="button"
                onClick={() => {
                  setBrandForm({
                    ...brandForm,
                    descriptionParagraphs: [...(brandForm.descriptionParagraphs || []), 'New story paragraph.'],
                  });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg cursor-pointer hover:bg-emerald-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Paragraph</span>
              </button>
            </div>

            <div className="space-y-3">
              {(brandForm.descriptionParagraphs || []).map((p: string, idx: number) => (
                <div key={idx} className="flex gap-2 items-start">
                  <textarea
                    rows={2}
                    value={p}
                    onChange={(e) => {
                      const updated = [...(brandForm.descriptionParagraphs || [])];
                      updated[idx] = e.target.value;
                      setBrandForm({ ...brandForm, descriptionParagraphs: updated });
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = brandForm.descriptionParagraphs.filter((_: any, i: number) => i !== idx);
                      setBrandForm({ ...brandForm, descriptionParagraphs: updated });
                    }}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Remove paragraph"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ITEM 1: HERO CTA BUTTONS (Primary + Work With Us)                         */}
          {/* ========================================================================= */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Hero Call To Action Buttons
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Button 1: REQUEST A REVENUE PROJECTION */}
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                    Primary CTA Button
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Dark Green Button
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={brandForm.revenueCtaText || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, revenueCtaText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="REQUEST A REVENUE PROJECTION"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Destination / Link Action
                  </label>
                  <input
                    type="text"
                    value={brandForm.revenueCtaUrl || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, revenueCtaUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium font-mono text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="#contact or /#contact"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Use <code>#contact</code> to smooth-scroll or a page route like <code>/packages</code>.
                  </span>
                </div>
              </div>

              {/* Button 2: WORK WITH US */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Secondary CTA Button (Work With Us)
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#B7E84B] text-[#0E1B13] border border-emerald-600/30">
                    Neon Lime Button
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={brandForm.ctaText || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, ctaText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="WORK WITH US"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Destination / Link Action
                  </label>
                  <input
                    type="text"
                    value={brandForm.ctaUrl || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, ctaUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium font-mono text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="#contact"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Destination action triggered when visitors click Work With Us.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ITEM 3: TRANSPARENT PRICING / MILESTONE TERMS LINE                         */}
          {/* ========================================================================= */}
          <div className="border-t border-slate-100 pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                TRANSPARENT PRICING / MILESTONE TERMS
              </label>
              <span className="text-[10px] font-bold uppercase text-slate-500">
                Centered Hero Footnote
              </span>
            </div>

            <input
              type="text"
              value={brandForm.pricingMilestoneText || ''}
              onChange={(e) => setBrandForm({ ...brandForm, pricingMilestoneText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="🧮 Transparent 50/50 Milestone Terms & Pricing Regimen."
            />
            <p className="text-[11px] text-slate-500 font-medium">
              Displays directly beneath the hero section and acceleration service cards on the public About page.
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveBrand}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Hero &amp; Mission</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ACCELERATION SERVICES (WHAT WE DO)                                 */}
      {/* ========================================================================= */}
      {activeTab === 'services' && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
                What We Do — Acceleration Services (2×2 Cards Grid)
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Controls the 2×2 services quadrant on the right side of the public About page hero.
            </p>
          </div>

          {/* Section Eyebrow & Heading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Section Eyebrow
              </label>
              <input
                type="text"
                value={brandForm.servicesEyebrow || ''}
                onChange={(e) => setBrandForm({ ...brandForm, servicesEyebrow: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="WHAT WE DO"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Default: WHAT WE DO</span>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Section Heading
              </label>
              <input
                type="text"
                value={brandForm.servicesHeading || ''}
                onChange={(e) => setBrandForm({ ...brandForm, servicesHeading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="OUR E-COMMERCE ACCELERATION SERVICES"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Default: OUR E-COMMERCE ACCELERATION SERVICES</span>
            </div>
          </div>

          {/* 4 Service Cards in 2x2 Layout */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-3">
              All 4 Service Cards (2×2 Grid)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((idx) => {
                const card = brandForm.values?.[idx] || DEFAULT_ACCELERATION_SERVICES[idx];
                const cardPositionLabels = [
                  'Top-Left Quadrant (Handcrafted Commerce)',
                  'Top-Right Quadrant (Scalable Platforms)',
                  'Bottom-Left Quadrant (Conversion-First UX)',
                  'Bottom-Right Quadrant (Global Performance)',
                ];

                return (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        Service Card #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {cardPositionLabels[idx]}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Card #{idx + 1} Title
                      </label>
                      <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => {
                          const updated = [...(brandForm.values || DEFAULT_ACCELERATION_SERVICES)];
                          updated[idx] = { ...card, title: e.target.value };
                          setBrandForm({ ...brandForm, values: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                        placeholder={`Service Card #${idx + 1} Title`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Card #{idx + 1} Description
                      </label>
                      <textarea
                        rows={2}
                        value={card.description || ''}
                        onChange={(e) => {
                          const updated = [...(brandForm.values || DEFAULT_ACCELERATION_SERVICES)];
                          updated[idx] = { ...card, description: e.target.value };
                          setBrandForm({ ...brandForm, values: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                        placeholder={`Service Card #${idx + 1} Description`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveBrand}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Acceleration Services</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DEV TEAM MEMBERS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          {/* Section Header Controls */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
                Meet The Team — Section Heading
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Controls the introduction header centered above the team member photo cards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                  Section Eyebrow
                </label>
                <input
                  type="text"
                  value={brandForm.teamEyebrow || ''}
                  onChange={(e) => setBrandForm({ ...brandForm, teamEyebrow: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  placeholder="CORE DEV TEAM LEADERSHIP"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                  Section Title
                </label>
                <input
                  type="text"
                  value={brandForm.teamHeading || ''}
                  onChange={(e) => setBrandForm({ ...brandForm, teamHeading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  placeholder="MEET THE TEAM"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Section Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={brandForm.teamDescription || ''}
                onChange={(e) => setBrandForm({ ...brandForm, teamDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                placeholder="The dedicated developers, operations specialists, and digital artisans behind every high-performance CommerceForge storefront."
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSaveBrand}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save Section Header</span>
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Team Profiles ({teamList.length} Members)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Add, reorder, delete, and edit photo slots, bios, and specializations.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddTeamMember}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Team Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamList.map((member, index) => (
              <div 
                key={member.id || index}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}images/team/RUSSELL T.jpg`;
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900 truncate">
                        {member.name}
                      </h3>
                      {member.isFounder && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-emerald-800 mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-xs">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveMember(index, 'up')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === teamList.length - 1}
                      onClick={() => handleMoveMember(index, 'down')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingMember({ index, member: { ...member } })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-[#B7E84B] text-[#0E1B13] hover:bg-[#a6d93b] cursor-pointer shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Member</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(index)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Member Drawer / Modal */}
          {editingMember && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-slate-900">
                    Edit Team Member: {editingMember.member.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editingMember.member.name}
                        onChange={(e) => setEditingMember({
                          ...editingMember,
                          member: { ...editingMember.member, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        value={editingMember.member.role}
                        onChange={(e) => setEditingMember({
                          ...editingMember,
                          member: { ...editingMember.member, role: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <input
                      type="checkbox"
                      id="isFounder"
                      checked={editingMember.member.isFounder || false}
                      onChange={(e) => setEditingMember({
                        ...editingMember,
                        member: { ...editingMember.member, isFounder: e.target.checked }
                      })}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <label htmlFor="isFounder" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Mark as Founder / Partner (Displays badge on photo frame)
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Photo URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingMember.member.image}
                        onChange={(e) => setEditingMember({
                          ...editingMember,
                          member: { ...editingMember.member, image: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-mono shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setMediaPickerTarget({ memberIndex: editingMember.index })}
                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold uppercase cursor-pointer"
                      >
                        Media
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Short Bio
                    </label>
                    <textarea
                      rows={3}
                      value={editingMember.member.bio}
                      onChange={(e) => setEditingMember({
                        ...editingMember,
                        member: { ...editingMember.member, bio: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...teamList];
                      updated[editingMember.index] = editingMember.member;
                      handleSaveTeamList(updated);
                      setEditingMember(null);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-black uppercase bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
                  >
                    Save Member
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: THE COMMERCEFORGE PROMISE                                          */}
      {/* ========================================================================= */}
      {activeTab === 'promise' && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
                The CommerceForge Promise Section
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Displays the high-performance commitment card, 3 core pillars, and portfolio link.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Visibility:</span>
              <button
                type="button"
                onClick={() => setPromiseForm({ ...promiseForm, visible: !promiseForm.visible })}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                  promiseForm.visible !== false
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-rose-50 text-rose-700 border-rose-300'
                }`}
              >
                {promiseForm.visible !== false ? 'Visible' : 'Hidden'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Badge
              </label>
              <input
                type="text"
                value={promiseForm.badge || ''}
                onChange={(e) => setPromiseForm({ ...promiseForm, badge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Heading
              </label>
              <input
                type="text"
                value={promiseForm.heading || ''}
                onChange={(e) => setPromiseForm({ ...promiseForm, heading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Promise Description
            </label>
            <textarea
              rows={3}
              value={promiseForm.description || ''}
              onChange={(e) => setPromiseForm({ ...promiseForm, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          {/* 3 Pillars */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
              Three Core Promise Cards
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(promiseForm.cards || []).map((card: any, idx: number) => (
                <div key={card.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 shadow-xs">
                  <span className="text-[11px] font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    Pillar #{idx + 1}
                  </span>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...promiseForm.cards];
                        updated[idx] = { ...card, title: e.target.value };
                        setPromiseForm({ ...promiseForm, cards: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => {
                        const updated = [...promiseForm.cards];
                        updated[idx] = { ...card, description: e.target.value };
                        setPromiseForm({ ...promiseForm, cards: updated });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={promiseForm.ctaText || ''}
                onChange={(e) => setPromiseForm({ ...promiseForm, ctaText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                CTA Button Destination
              </label>
              <input
                type="text"
                value={promiseForm.ctaUrl || ''}
                onChange={(e) => setPromiseForm({ ...promiseForm, ctaUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs font-mono shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSavePromise}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save The Promise</span>
            </button>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      {mediaPickerTarget && (
        <MediaPickerModal
          isOpen={!!mediaPickerTarget}
          onClose={() => setMediaPickerTarget(null)}
          onSelect={(url) => {
            if (mediaPickerTarget.memberIndex !== undefined && editingMember) {
              setEditingMember({
                ...editingMember,
                member: { ...editingMember.member, image: url }
              });
            }
            setMediaPickerTarget(null);
          }}
        />
      )}
    </div>
  );
};
