import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Sparkles,
  Layout,
  Palette,
  CheckCircle2,
  Save,
  ArrowRight,
  HelpCircle,
  Edit2,
  Copy,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAdminTheme } from '../context/AdminThemeContext';
import { useToast } from '../components/Toast';
import { CustomPageSection, CustomSectionItem } from '../../types/cms';

type PageOption = 'all' | 'home' | 'about' | 'work' | 'packages' | 'faqs' | 'hire-us';

const PAGE_LABELS: Record<string, string> = {
  home: 'Home Page',
  about: 'About Page',
  work: 'Work Page',
  packages: 'Packages Page',
  faqs: 'FAQs Page',
  'hire-us': 'Hire Us Page',
};

const LAYOUT_OPTIONS = [
  { id: 'cards', label: 'Feature Cards Grid', desc: 'Repeatable cards with icons and descriptions' },
  { id: 'banner', label: 'Full-Width Impact Banner', desc: 'Prominent headline, description, and primary CTA button' },
  { id: 'text-split', label: 'Two-Column Story', desc: 'Headline on the left, descriptive narrative on the right' },
  { id: 'callout', label: 'Bordered Callout Box', desc: 'Highlighted container for warranties, guarantees, or notices' },
  { id: 'features', label: 'Checklist / Highlights', desc: 'Clean bulleted list of guarantees or service specifications' },
];

const PRESET_TEXT_COLORS = [
  { label: 'Deep Forest', value: '#1E3A2B' },
  { label: 'Obsidian Black', value: '#0F172A' },
  { label: 'Pure White', value: '#FFFFFF' },
  { label: 'Muted Slate', value: '#64748B' },
  { label: 'Emerald Deep', value: '#064E3B' },
];

const PRESET_BG_COLORS = [
  { label: 'Crisp White', value: '#FFFFFF' },
  { label: 'Mint Fresh', value: '#EAF3E8' },
  { label: 'Studio Pale', value: '#F8FAF8' },
  { label: 'Midnight Dark', value: '#0E1B13' },
  { label: 'Deep Pine', value: '#12241A' },
  { label: 'Soft Slate', value: '#F1F5F9' },
];

const PRESET_ACCENT_COLORS = [
  { label: 'Studio Lime', value: '#B7E84B' },
  { label: 'Emerald Green', value: '#10B981' },
  { label: 'Amber Gold', value: '#F59E0B' },
  { label: 'Electric Blue', value: '#0EA5E9' },
];

export const SectionsEditor: React.FC = () => {
  const { draftContent, updateSection } = useCMS();
  const { isDark } = useAdminTheme();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<PageOption>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CustomPageSection | null>(null);

  const sections: CustomPageSection[] = draftContent?.customSections || [];

  const filteredSections = sections.filter((s) => {
    if (activeTab === 'all') return true;
    return s.page === activeTab;
  });

  const handleOpenCreateModal = (presetPage?: string) => {
    const pageToUse = (presetPage && presetPage !== 'all') ? (presetPage as any) : 'about';
    const newSection: CustomPageSection = {
      id: `section-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      page: pageToUse,
      title: 'New Custom Section',
      subtitle: 'OPTIONAL SUBTITLE',
      badge: 'FEATURED',
      content: 'Describe the key highlights, value propositions, or details for your visitors here.',
      layout: 'cards',
      textColor: '#1E3A2B',
      backgroundColor: '#EAF3E8',
      accentColor: '#B7E84B',
      buttonText: 'GET IN TOUCH',
      buttonUrl: '/hire-us',
      buttonVariant: 'primary',
      sortOrder: sections.length + 1,
      published: true,
      items: [
        {
          id: `item-${Date.now()}-1`,
          title: 'First Key Benefit',
          description: 'High-speed performance and modern architecture designed to maximize conversion.',
          icon: 'Zap',
        },
        {
          id: `item-${Date.now()}-2`,
          title: 'Second Key Benefit',
          description: 'Fully responsive mobile-friendly experience for all devices and screen sizes.',
          icon: 'Sparkles',
        },
      ],
    };
    setEditingSection(newSection);
    setIsModalOpen(true);
  };

  const handleEditSection = (section: CustomPageSection) => {
    setEditingSection(JSON.parse(JSON.stringify(section)));
    setIsModalOpen(true);
  };

  const handleDuplicateSection = async (section: CustomPageSection) => {
    const duplicated: CustomPageSection = {
      ...JSON.parse(JSON.stringify(section)),
      id: `section-${Date.now()}`,
      title: `${section.title} (Copy)`,
      sortOrder: sections.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...sections, duplicated];
    await updateSection('customSections', updated);
    showToast('success', 'Section Duplicated', 'Duplicated section added to working draft.');
  };

  const handleDeleteSection = async (id: string) => {
    const updated = sections.filter((s) => s.id !== id);
    await updateSection('customSections', updated);
    showToast('info', 'Section Removed', 'Section removed from working draft.');
  };

  const handleTogglePublish = async (id: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, published: !s.published } : s));
    await updateSection('customSections', updated);
    showToast('success', 'Status Updated', 'Section visibility status updated.');
  };

  const handleMoveOrder = async (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);

    // Reassign sort orders
    const reordered = newSections.map((item, idx) => ({ ...item, sortOrder: idx + 1 }));
    await updateSection('customSections', reordered);
  };

  const handleSaveModal = async () => {
    if (!editingSection) return;
    const exists = sections.some((s) => s.id === editingSection.id);
    let updated: CustomPageSection[];
    if (exists) {
      updated = sections.map((s) => (s.id === editingSection.id ? { ...editingSection, updatedAt: new Date().toISOString() } : s));
    } else {
      updated = [...sections, { ...editingSection, updatedAt: new Date().toISOString() }];
    }
    await updateSection('customSections', updated);
    setIsModalOpen(false);
    setEditingSection(null);
    showToast('success', 'Section Saved', 'Custom section changes saved to draft.');
  };

  // Sub-items management in modal
  const handleAddItem = () => {
    if (!editingSection) return;
    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: 'New Feature Item',
      description: 'Describe this feature or value point in detail.',
      icon: 'Sparkles',
    };
    setEditingSection({
      ...editingSection,
      items: [...(editingSection.items || []), newItem],
    });
  };

  const handleUpdateItem = (itemId: string, field: keyof CustomSectionItem, value: string) => {
    if (!editingSection) return;
    setEditingSection({
      ...editingSection,
      items: (editingSection.items || []).map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
    });
  };

  const handleDeleteItem = (itemId: string) => {
    if (!editingSection) return;
    setEditingSection({
      ...editingSection,
      items: (editingSection.items || []).filter((item) => item.id !== itemId),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-xs'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#B7E84B]/20 text-[#B7E84B]">
                <Layers className="w-5 h-5" />
              </span>
              <h1 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Page Sections & Custom Content
              </h1>
            </div>
            <p className={`mt-1 text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              Add, organize, and customize dedicated sections for each page. Customize typography colors, background tones, layout arrangements, and action buttons.
            </p>
          </div>

          <button
            onClick={() => handleOpenCreateModal(activeTab)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B7E84B] text-[#0F241A] font-bold text-xs uppercase tracking-wider hover:bg-[#a5d83a] transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Section</span>
          </button>
        </div>

        {/* Page Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 border-b border-black/10 dark:border-white/10 pb-3">
          {(['all', 'home', 'about', 'work', 'packages', 'faqs', 'hire-us'] as PageOption[]).map((tab) => {
            const count = sections.filter((s) => (tab === 'all' ? true : s.page === tab)).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#B7E84B] text-[#0F241A] shadow-xs'
                    : isDark
                    ? 'text-white/70 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab === 'all' ? 'All Pages' : PAGE_LABELS[tab]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-black/20 text-[#0F241A]' : isDark ? 'bg-white/10 text-white/60' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections List */}
      {filteredSections.length === 0 ? (
        <div
          className={`p-12 text-center rounded-2xl border border-dashed ${
            isDark ? 'bg-[#12241A]/50 border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
          }`}
        >
          <Layers className="w-12 h-12 mx-auto text-[#B7E84B] mb-3 opacity-60" />
          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            No custom sections for this page yet
          </h3>
          <p className={`text-xs mt-1 max-w-md mx-auto ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
            Enhance your page with custom feature grids, banners, storytelling callouts, or warranties.
          </p>
          <button
            onClick={() => handleOpenCreateModal(activeTab)}
            className="mt-4 px-4 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] font-bold text-xs uppercase tracking-wider hover:bg-[#a5d83a] transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Section</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredSections.map((section, idx) => (
            <div
              key={section.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-[#12241A] border-[#1E3A2B] hover:border-[#B7E84B]/40' : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Meta & Info */}
                <div className="flex items-start gap-3.5">
                  <div className="flex flex-col gap-1 mt-1">
                    <button
                      onClick={() => handleMoveOrder(section.id, 'up')}
                      disabled={idx === 0}
                      title="Move up"
                      className="p-1 rounded text-white/50 hover:text-white disabled:opacity-20 transition-opacity"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(section.id, 'down')}
                      disabled={idx === filteredSections.length - 1}
                      title="Move down"
                      className="p-1 rounded text-white/50 hover:text-white disabled:opacity-20 transition-opacity"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B7E84B]/20 text-[#B7E84B] border border-[#B7E84B]/30">
                        {PAGE_LABELS[section.page] || section.page}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isDark ? 'bg-white/10 text-white/70' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Layout: {section.layout}
                      </span>
                      {!section.published && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Draft (Hidden)
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {section.title}
                    </h3>
                    {section.subtitle && (
                      <p className={`text-xs uppercase font-semibold tracking-wider ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                        {section.subtitle}
                      </p>
                    )}
                    <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-white/60' : 'text-slate-600'} max-w-2xl`}>
                      {section.content}
                    </p>

                    {/* Color Swatches Info */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/40 dark:text-white/40 text-slate-500">Text:</span>
                        <div
                          className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                          style={{ backgroundColor: section.textColor || '#1E3A2B' }}
                        />
                        <span className="font-mono text-[10px] text-white/60 dark:text-white/60 text-slate-600">
                          {section.textColor || '#1E3A2B'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-white/40 dark:text-white/40 text-slate-500">Background:</span>
                        <div
                          className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                          style={{ backgroundColor: section.backgroundColor || '#EAF3E8' }}
                        />
                        <span className="font-mono text-[10px] text-white/60 dark:text-white/60 text-slate-600">
                          {section.backgroundColor || '#EAF3E8'}
                        </span>
                      </div>

                      {section.items && section.items.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-white/40 dark:text-white/40 text-slate-500">Cards:</span>
                          <span className="font-bold text-[#B7E84B]">{section.items.length} items</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => handleTogglePublish(section.id)}
                    title={section.published ? 'Hide Section' : 'Publish Section'}
                    className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      section.published
                        ? isDark
                          ? 'bg-[#B7E84B]/10 text-[#B7E84B] border-[#B7E84B]/30 hover:bg-[#B7E84B]/20'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : isDark
                        ? 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-slate-800'
                    }`}
                  >
                    {section.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-[11px] uppercase font-bold">{section.published ? 'Active' : 'Draft'}</span>
                  </button>

                  <button
                    onClick={() => handleDuplicateSection(section)}
                    title="Duplicate section"
                    className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                      isDark ? 'bg-white/5 border-white/10 text-white/70 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleEditSection(section)}
                    title="Edit Section"
                    className="px-3 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] text-xs font-bold uppercase tracking-wider hover:bg-[#a5d83a] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    title="Delete Section"
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Section Modal */}
      {isModalOpen && editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div
            className={`w-full max-w-3xl my-8 rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
              isDark ? 'bg-[#0E1B13] border-[#1E3A2B] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className={`p-5 border-b flex items-center justify-between ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#B7E84B]/20 text-[#B7E84B]">
                  <Layout className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-black">Configure Section</h2>
                  <p className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                    Target page, design tokens, typography, and card features
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/50 hover:text-white text-sm p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Target Page & Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    Target Page
                  </label>
                  <select
                    value={editingSection.page}
                    onChange={(e) => setEditingSection({ ...editingSection, page: e.target.value as any })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B] ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="home">Home Page</option>
                    <option value="about">About Page</option>
                    <option value="work">Work Page</option>
                    <option value="packages">Packages Page</option>
                    <option value="faqs">FAQs Page</option>
                    <option value="hire-us">Hire Us Page</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    Layout Style
                  </label>
                  <select
                    value={editingSection.layout}
                    onChange={(e) => setEditingSection({ ...editingSection, layout: e.target.value as any })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B] ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {LAYOUT_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title, Subtitle, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    Badge / Eyebrow
                  </label>
                  <input
                    type="text"
                    value={editingSection.badge || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, badge: e.target.value })}
                    placeholder="e.g. STUDIO PROMISE"
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B] ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    value={editingSection.title}
                    onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                    placeholder="e.g. Our Speed & Quality Guarantees"
                    className={`w-full px-3.5 py-2 rounded-xl text-sm font-bold border focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B] ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                  Subtitle / Supporting Pitch
                </label>
                <input
                  type="text"
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  placeholder="e.g. BUILT FOR HIGH REVENUE AND MOBILE CONVERSION"
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B] ${
                    isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Main Content Body */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                  Section Content / Narrative Text
                </label>
                <textarea
                  rows={3}
                  value={editingSection.content}
                  onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                  placeholder="Detailed description or story for this section..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-hidden focus:ring-2 focus:ring-[#B7E84B] ${
                    isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Color Styling Configuration */}
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-[#B7E84B]" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Visual Styling & Color Palette
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Text Color */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">
                      Text Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingSection.textColor || '#1E3A2B'}
                        onChange={(e) => setEditingSection({ ...editingSection, textColor: e.target.value })}
                        className="w-9 h-9 rounded-lg border cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={editingSection.textColor || '#1E3A2B'}
                        onChange={(e) => setEditingSection({ ...editingSection, textColor: e.target.value })}
                        className={`w-28 px-2 py-1.5 rounded-lg text-xs font-mono border ${
                          isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-300'
                        }`}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {PRESET_TEXT_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setEditingSection({ ...editingSection, textColor: c.value })}
                          className="w-5 h-5 rounded-full border border-black/20 hover:scale-110 transition-transform"
                          style={{ backgroundColor: c.value }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Background Color */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">
                      Background Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingSection.backgroundColor || '#EAF3E8'}
                        onChange={(e) => setEditingSection({ ...editingSection, backgroundColor: e.target.value })}
                        className="w-9 h-9 rounded-lg border cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={editingSection.backgroundColor || '#EAF3E8'}
                        onChange={(e) => setEditingSection({ ...editingSection, backgroundColor: e.target.value })}
                        className={`w-28 px-2 py-1.5 rounded-lg text-xs font-mono border ${
                          isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-300'
                        }`}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {PRESET_BG_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setEditingSection({ ...editingSection, backgroundColor: c.value })}
                          className="w-5 h-5 rounded-full border border-black/20 hover:scale-110 transition-transform"
                          style={{ backgroundColor: c.value }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={editingSection.buttonText || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonText: e.target.value })}
                    placeholder="e.g. GET STARTED"
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                    Button Link / URL
                  </label>
                  <input
                    type="text"
                    value={editingSection.buttonUrl || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonUrl: e.target.value })}
                    placeholder="e.g. /hire-us or /packages"
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
                    Button Style
                  </label>
                  <select
                    value={editingSection.buttonVariant || 'primary'}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonVariant: e.target.value as any })}
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="primary">Primary (Solid)</option>
                    <option value="secondary">Secondary (Dark)</option>
                    <option value="outline">Outline (Bordered)</option>
                  </select>
                </div>
              </div>

              {/* Repeatable Cards / Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    Feature Cards & Points ({(editingSection.items || []).length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-2.5 py-1 rounded-lg bg-[#B7E84B]/20 text-[#B7E84B] hover:bg-[#B7E84B]/30 font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Card</span>
                  </button>
                </div>

                {(editingSection.items || []).map((item, itemIdx) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      isDark ? 'bg-black/30 border-white/10' : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#B7E84B] text-[#0F241A] font-bold text-[11px] flex items-center justify-center shrink-0 mt-1">
                      {itemIdx + 1}
                    </span>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                        placeholder="Feature Title"
                        className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold border ${
                          isDark ? 'bg-[#12241A] border-white/10' : 'bg-white border-slate-300'
                        }`}
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        placeholder="Feature Description"
                        className={`w-full px-2.5 py-1.5 rounded-lg text-xs border ${
                          isDark ? 'bg-[#12241A] border-white/10' : 'bg-white border-slate-300'
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Live Preview Inside Modal */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10">
                <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 opacity-70">
                  Live Style Preview
                </span>
                <div
                  className="p-6 rounded-2xl border shadow-inner transition-colors"
                  style={{
                    backgroundColor: editingSection.backgroundColor || '#EAF3E8',
                    color: editingSection.textColor || '#1E3A2B',
                  }}
                >
                  {editingSection.badge && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#B7E84B] text-[#0F241A] mb-2">
                      {editingSection.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {editingSection.title || 'Untitled Section'}
                  </h3>
                  {editingSection.subtitle && (
                    <p className="text-xs font-bold uppercase tracking-wider opacity-80 mt-0.5">
                      {editingSection.subtitle}
                    </p>
                  )}
                  <p className="text-sm mt-2 opacity-90 leading-relaxed max-w-xl">
                    {editingSection.content}
                  </p>

                  {editingSection.buttonText && (
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3A2B] text-white">
                        {editingSection.buttonText}
                        <ArrowRight className="w-3.5 h-3.5 text-[#B7E84B]" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className={`p-4 border-t flex items-center justify-between ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSection.published}
                    onChange={(e) => setEditingSection({ ...editingSection, published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#B7E84B] accent-[#B7E84B]"
                  />
                  <span>Active & Visible on Public Page</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'bg-white/10 text-white/70 hover:text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveModal}
                  className="px-5 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] text-xs font-black uppercase tracking-wider hover:bg-[#a5d83a] transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Section</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
