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
  Image as ImageIcon,
  Users,
  Grid,
  Quote,
  Megaphone,
  Code,
  Check,
  Hash,
  AlertCircle,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAdminTheme } from '../context/AdminThemeContext';
import { useToast } from '../components/Toast';
import {
  CustomPageSection,
  CustomSectionItem,
  SectionTemplateType,
  SectionBackgroundStyle,
} from '../../types/cms';

type PageOption = 'all' | 'home' | 'about' | 'work' | 'packages' | 'faqs' | 'hire-us';

const PAGE_LABELS: Record<string, string> = {
  home: 'Home Page',
  about: 'About Page',
  work: 'Work Page',
  packages: 'Packages Page',
  faqs: 'FAQs Page',
  'hire-us': 'Hire Us Page',
};

interface PresetTemplateConfig {
  type: SectionTemplateType;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  defaultBg: SectionBackgroundStyle;
}

const SECTION_TEMPLATES: PresetTemplateConfig[] = [
  {
    type: 'rich-text-media',
    title: 'Rich Text & Media',
    subtitle: 'Split 50/50 Layout',
    description: 'Split 50/50 image and storytelling narrative with alt-text accessibility and CTA button.',
    icon: ImageIcon,
    badge: 'STORY & SHOWCASE',
    defaultBg: 'dark-studio',
  },
  {
    type: 'logo-cloud',
    title: 'Logo Cloud / Trust Grid',
    subtitle: 'Client Social Proof',
    description: 'Grid of recognized client partner logos or brand names to build instant credibility.',
    icon: Users,
    badge: 'SOCIAL PROOF',
    defaultBg: 'charcoal-glass',
  },
  {
    type: 'feature-cards',
    title: 'Feature Cards Grid',
    subtitle: '3 or 4 Column Cards',
    description: 'Multi-column cards with icons, benefit titles, and clear value proposition copy.',
    icon: Grid,
    badge: 'CAPABILITIES',
    defaultBg: 'dark-studio',
  },
  {
    type: 'testimonials',
    title: 'Testimonial / Review Carousel',
    subtitle: 'Client Reviews & Ratings',
    description: 'Verified quotes with 5-star ratings, author credentials, and company logos.',
    icon: Quote,
    badge: 'VERIFIED REVIEWS',
    defaultBg: 'forest-muted',
  },
  {
    type: 'cta-banner',
    title: 'Custom CTA Banner',
    subtitle: 'High-Impact Call to Action',
    description: 'Compelling headline, subtitle, 2 action buttons, and customizable background styles.',
    icon: Megaphone,
    badge: 'CONVERSION',
    defaultBg: 'dark-studio',
  },
  {
    type: 'raw-embed',
    title: 'Raw Embed / Custom Code',
    subtitle: 'HTML & Widget Block',
    description: 'Embed external forms, calendars, calculators, custom HTML, or third-party widgets.',
    icon: Code,
    badge: 'DEVELOPER EMBED',
    defaultBg: 'charcoal-glass',
  },
];

const BACKGROUND_STYLES: { id: SectionBackgroundStyle; label: string; desc: string }[] = [
  { id: 'dark-studio', label: 'Dark Dev', desc: 'Midnight Charcoal (#0B0F17) with glowing borders' },
  { id: 'crisp-light', label: 'Crisp Light', desc: 'Warm Tinted White (#FAFAF9) with deep forest text' },
  { id: 'forest-muted', label: 'Forest Green Muted', desc: 'Deep Organic Pine (#12241A) with dev team lime' },
  { id: 'charcoal-glass', label: 'Charcoal Glass', desc: 'Frosted Glassmorphism (bg-white/5, blur-md)' },
];

export const SectionsEditor: React.FC = () => {
  const { draftContent, updateSection } = useCMS();
  const { isDark } = useAdminTheme();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<PageOption>('all');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CustomPageSection | null>(null);

  const sections: CustomPageSection[] = draftContent?.customSections || [];

  const filteredSections = sections.filter((s) => {
    if (activeTab === 'all') return true;
    return s.page === activeTab;
  });

  // Open Template Selector Modal
  const handleOpenTemplateSelector = () => {
    setIsTemplateModalOpen(true);
  };

  // Select a Template and Initialize New Section
  const handleSelectTemplate = (template: PresetTemplateConfig) => {
    const pageToUse = activeTab !== 'all' ? (activeTab as any) : 'home';
    const timestamp = Date.now();

    const newSection: CustomPageSection = {
      id: `section-${timestamp}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      page: pageToUse,
      templateType: template.type,
      layout: template.type === 'feature-cards' ? 'cards' : template.type === 'cta-banner' ? 'banner' : 'cards',
      backgroundStyle: template.defaultBg,
      anchorId: template.type.replace(/[^a-z0-9]/gi, '-').toLowerCase(),
      title: `${template.title}`,
      subtitle: template.subtitle.toUpperCase(),
      badge: template.badge,
      content:
        template.type === 'rich-text-media'
          ? 'We rebuild sluggish, outdated websites into lightning-fast, mobile-responsive powerhouses with high conversion velocity.'
          : template.type === 'logo-cloud'
          ? 'Trusted by high-growth DTC brands, regional fitness centers, and modern retailers.'
          : template.type === 'testimonials'
          ? 'Real client transformations, performance benchmarks, and revenue outcomes.'
          : template.type === 'cta-banner'
          ? 'Ready to upgrade your store into a modern high-converting sales engine? Schedule your engineering review today.'
          : 'High-speed modern architecture designed to maximize user engagement and checkout conversion.',
      buttonText: 'GET A FREE QUOTE',
      buttonUrl: '/hire-us',
      buttonVariant: 'primary',
      secondaryButtonText: template.type === 'cta-banner' ? 'VIEW PACKAGES' : undefined,
      secondaryButtonUrl: template.type === 'cta-banner' ? '/packages' : undefined,
      sortOrder: sections.length + 1,
      published: true,
      mediaUrl:
        template.type === 'rich-text-media'
          ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80'
          : undefined,
      mediaAlt: template.type === 'rich-text-media' ? 'E-commerce performance metrics dashboard' : undefined,
      mediaPosition: 'right',
      logos:
        template.type === 'logo-cloud'
          ? [
              { id: '1', name: 'Gold & Grove' },
              { id: '2', name: 'Rosemira Organics' },
              { id: '3', name: 'HAOMA Earth' },
              { id: '4', name: 'Juice Beauty' },
              { id: '5', name: "Doctor's Select" },
              { id: '6', name: 'Coalition LA' },
            ]
          : undefined,
      testimonials:
        template.type === 'testimonials'
          ? [
              {
                id: 't-1',
                quote: 'CommerceForge rebuilt our checkout flow in 8 days. Our mobile conversion rate jumped by 180%!',
                author: 'Marcus Vance',
                role: 'Founder',
                company: 'Gold & Grove',
                rating: 5,
              },
              {
                id: 't-2',
                quote: 'PageSpeed went from 38 to 99 on mobile. Best engineering investment our brand made this year.',
                author: 'Elena Reyes',
                role: 'Growth Lead',
                company: 'Rosemira Organics',
                rating: 5,
              },
              {
                id: 't-3',
                quote: 'No bloated agency retainers. Clean code, responsive communication, and transparent delivery.',
                author: 'Tyler Chen',
                role: 'Co-Founder',
                company: 'HAOMA Earth',
                rating: 5,
              },
            ]
          : undefined,
      items:
        template.type === 'feature-cards' || template.type === 'rich-text-media'
          ? [
              {
                id: `item-${timestamp}-1`,
                title: 'Sub-Second Page Loads',
                description: 'Optimized server-side rendering and asset pipelines scoring 98+ on Google PageSpeed.',
                icon: 'Zap',
              },
              {
                id: `item-${timestamp}-2`,
                title: 'Mobile-First Ergonomics',
                description: 'Thumb-friendly touch targets, instant drawer navigations, and friction-free checkout.',
                icon: 'Sparkles',
              },
              {
                id: `item-${timestamp}-3`,
                title: 'Conversion Rate Engineering',
                description: 'Battle-tested checkout architectures engineered to recover lost cart revenue.',
                icon: 'ShoppingBag',
              },
            ]
          : [],
      embedCode:
        template.type === 'raw-embed'
          ? '<div class="p-8 text-center bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-emerald-300 font-mono text-xs">\n  <!-- Custom Embed / Widget Container -->\n  <p>Your custom script, widget, or form will render here.</p>\n</div>'
          : undefined,
    };

    setEditingSection(newSection);
    setIsTemplateModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleEditSection = (section: CustomPageSection) => {
    setEditingSection(JSON.parse(JSON.stringify(section)));
    setIsEditModalOpen(true);
  };

  const handleDuplicateSection = async (section: CustomPageSection) => {
    const duplicated: CustomPageSection = {
      ...JSON.parse(JSON.stringify(section)),
      id: `section-${Date.now()}`,
      title: `${section.title} (Copy)`,
      anchorId: `${section.anchorId || 'section'}-copy`,
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
      updated = sections.map((s) =>
        s.id === editingSection.id ? { ...editingSection, updatedAt: new Date().toISOString() } : s
      );
    } else {
      updated = [...sections, { ...editingSection, updatedAt: new Date().toISOString() }];
    }
    await updateSection('customSections', updated);
    setIsEditModalOpen(false);
    setEditingSection(null);
    showToast('success', 'Section Saved', 'Custom section changes saved to draft.');
  };

  // Sub-items management
  const handleAddItem = () => {
    if (!editingSection) return;
    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: 'New Value Proposition',
      description: 'Describe how this feature improves conversions or site performance.',
      icon: 'Zap',
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
      items: (editingSection.items || []).map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
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
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#B7E84B]/20 text-[#B7E84B]">
                <Layers className="w-5 h-5" />
              </span>
              <h1 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Dynamic Section Builder
              </h1>
            </div>
            <p className={`mt-1 text-sm ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
              Create, reorder, hide, and customize dynamic sections across any page with preset templates.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenTemplateSelector}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black text-xs uppercase tracking-wider hover:bg-[#a5d83a] transition-all shadow-md active:scale-95 cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus:outline-none"
            aria-label="Add new dynamic section to website"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Section</span>
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
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#B7E84B] text-[#0F241A] shadow-xs'
                    : isDark
                    ? 'text-zinc-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab === 'all' ? 'All Pages' : PAGE_LABELS[tab]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-black/20 text-[#0F241A]'
                      : isDark
                      ? 'bg-white/10 text-zinc-300'
                      : 'bg-slate-200 text-slate-700'
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
          <Layers className="w-12 h-12 mx-auto text-[#B7E84B] mb-3 opacity-80" />
          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            No dynamic sections configured for this view yet
          </h3>
          <p className={`text-xs mt-1 max-w-md mx-auto ${isDark ? 'text-zinc-300' : 'text-slate-500'}`}>
            Choose from 6 high-conversion preset templates: Rich Media, Logo Cloud, Feature Cards, Testimonials, CTA Banners, or Custom Embeds.
          </p>
          <button
            type="button"
            onClick={handleOpenTemplateSelector}
            className="mt-5 px-5 py-2.5 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black text-xs uppercase tracking-wider hover:bg-[#a5d83a] transition-all inline-flex items-center gap-2 shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus:outline-none"
          >
            <Plus className="w-4 h-4" />
            <span>Select Preset Template</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4" role="list" aria-label="Page dynamic sections">
          {filteredSections.map((section, idx) => {
            const template = SECTION_TEMPLATES.find((t) => t.type === (section.templateType || section.layout));
            const TemplateIcon = template?.icon || Layers;

            return (
              <div
                key={section.id}
                role="listitem"
                className={`p-5 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#12241A] border-[#1E3A2B] hover:border-[#B7E84B]/40'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Meta & Info */}
                  <div className="flex items-start gap-3.5">
                    {/* Accessible Up/Down Reorder Controls */}
                    <div className="flex flex-col gap-1 mt-1 shrink-0" role="group" aria-label="Reorder section">
                      <button
                        type="button"
                        role="button"
                        onClick={() => handleMoveOrder(section.id, 'up')}
                        disabled={idx === 0}
                        aria-label={`Move section "${section.title}" up`}
                        title="Move item up"
                        className="p-1.5 rounded-lg text-zinc-300 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        role="button"
                        onClick={() => handleMoveOrder(section.id, 'down')}
                        disabled={idx === filteredSections.length - 1}
                        aria-label={`Move section "${section.title}" down`}
                        title="Move item down"
                        className="p-1.5 rounded-lg text-zinc-300 hover:text-white disabled:opacity-20 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B7E84B]/20 text-[#B7E84B] border border-[#B7E84B]/30">
                          {PAGE_LABELS[section.page] || section.page}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            isDark ? 'bg-white/10 text-zinc-200' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <TemplateIcon className="w-3 h-3 text-[#B7E84B]" />
                          <span>{template?.title || section.layout}</span>
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isDark ? 'bg-white/10 text-zinc-200' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Style: {section.backgroundStyle || 'Custom'}
                        </span>
                        {section.anchorId && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            #{section.anchorId.replace(/^#/, '')}
                          </span>
                        )}
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
                        <p className={`text-xs uppercase font-semibold tracking-wider ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                          {section.subtitle}
                        </p>
                      )}
                      <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-zinc-300' : 'text-slate-600'} max-w-2xl`}>
                        {section.content}
                      </p>
                    </div>
                  </div>

                  {/* Right Action Controls */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(section.id)}
                      aria-label={section.published ? 'Hide section from public site' : 'Publish section to public site'}
                      title={section.published ? 'Hide Section' : 'Publish Section'}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                        section.published
                          ? isDark
                            ? 'bg-[#B7E84B]/10 text-[#B7E84B] border-[#B7E84B]/30 hover:bg-[#B7E84B]/20'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : isDark
                          ? 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                          : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-slate-800'
                      }`}
                    >
                      {section.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      <span className="text-[11px] uppercase font-bold">{section.published ? 'Published' : 'Draft'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicateSection(section)}
                      aria-label={`Duplicate section ${section.title}`}
                      title="Duplicate section"
                      className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                        isDark ? 'bg-white/5 border-white/10 text-zinc-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEditSection(section)}
                      aria-label={`Edit section ${section.title}`}
                      title="Edit Section"
                      className="px-3 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] text-xs font-bold uppercase tracking-wider hover:bg-[#a5d83a] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSection(section.id)}
                      aria-label={`Delete section ${section.title}`}
                      title="Delete Section"
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 1. PRESET TEMPLATES SELECTOR MODAL */}
      {isTemplateModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="template-modal-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        >
          <div
            className={`w-full max-w-4xl my-8 rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
              isDark ? 'bg-[#0E1B13] border-[#1E3A2B] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-200'}`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#B7E84B]/20 text-[#B7E84B]">
                    <Plus className="w-5 h-5" />
                  </span>
                  <h2 id="template-modal-heading" className="text-xl font-black uppercase tracking-tight">
                    Choose Section Preset Template
                  </h2>
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                  Select a pre-engineered conversion template. You can customize copy, images, colors, and layout afterward.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(false)}
                aria-label="Close template selector"
                className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Template Cards Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {SECTION_TEMPLATES.map((tmpl) => {
                const IconComp = tmpl.icon;
                return (
                  <div
                    key={tmpl.type}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`group p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isDark
                        ? 'bg-[#12241A]/70 border-[#1E3A2B] hover:border-[#B7E84B] hover:bg-[#12241A]'
                        : 'bg-slate-50 border-slate-200 hover:border-emerald-600 hover:bg-white shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-3 rounded-xl bg-[#B7E84B]/20 text-[#B7E84B] group-hover:scale-110 transition-transform">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-[#B7E84B] border border-[#B7E84B]/30">
                          {tmpl.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-black tracking-tight uppercase group-hover:text-[#B7E84B] transition-colors">
                        {tmpl.title}
                      </h3>
                      <span className="text-[11px] font-bold text-zinc-400 block mb-2">{tmpl.subtitle}</span>
                      <p className="text-xs text-zinc-300 leading-relaxed">{tmpl.description}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#B7E84B]">
                      <span>Use this template</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. EDIT / CONFIGURE SECTION MODAL */}
      {isEditModalOpen && editingSection && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-section-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        >
          <div
            className={`w-full max-w-3xl my-8 rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
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
                  <h2 id="edit-section-title" className="text-lg font-black uppercase tracking-tight">
                    Configure Section
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-slate-500'}`}>
                    Custom section template: <span className="text-[#B7E84B] font-bold">{editingSection.templateType || editingSection.layout}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close edit modal"
                className="text-zinc-400 hover:text-white text-sm p-1.5 rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Target Page & Anchor ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sec-target-page" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                    Target Page
                  </label>
                  <select
                    id="sec-target-page"
                    value={editingSection.page}
                    onChange={(e) => setEditingSection({ ...editingSection, page: e.target.value as any })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus:outline-none ${
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
                  <label htmlFor="sec-anchor-id" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-[#B7E84B]" />
                    <span>Section Anchor ID (for Navigation Links)</span>
                  </label>
                  <input
                    id="sec-anchor-id"
                    type="text"
                    value={editingSection.anchorId || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, anchorId: e.target.value.replace(/[^a-zA-Z0-9-_]/g, '') })}
                    placeholder="e.g. reviews or feature-guarantees"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-mono border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus:outline-none ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-[11px] text-zinc-400 mt-1 block">Links to #{editingSection.anchorId || 'section-id'}</span>
                </div>
              </div>

              {/* Background Style Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-200">
                  Background Style Preset
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BACKGROUND_STYLES.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setEditingSection({ ...editingSection, backgroundStyle: bg.id })}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                        editingSection.backgroundStyle === bg.id
                          ? 'border-[#B7E84B] bg-[#B7E84B]/15 text-white ring-1 ring-[#B7E84B]'
                          : isDark
                          ? 'border-[#1E3A2B] bg-[#12241A] text-zinc-300 hover:border-white/20'
                          : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block">{bg.label}</span>
                        <span className="text-[10px] opacity-75">{bg.desc}</span>
                      </div>
                      {editingSection.backgroundStyle === bg.id && (
                        <Check className="w-4 h-4 text-[#B7E84B] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title, Subtitle, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="sec-badge" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                    Badge / Eyebrow
                  </label>
                  <input
                    id="sec-badge"
                    type="text"
                    value={editingSection.badge || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, badge: e.target.value })}
                    placeholder="e.g. FEATURED BENCHMARK"
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="sec-title" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                    Section Title *
                  </label>
                  <input
                    id="sec-title"
                    type="text"
                    value={editingSection.title}
                    onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                    placeholder="e.g. Sub-Second Velocity Architecture"
                    className={`w-full px-3.5 py-2 rounded-xl text-sm font-bold border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sec-subtitle" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                  Subtitle / Supporting Tagline
                </label>
                <input
                  id="sec-subtitle"
                  type="text"
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  placeholder="e.g. BUILT FOR HIGH REVENUE AND MOBILE CONVERSION"
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                    isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Main Narrative Content */}
              <div>
                <label htmlFor="sec-content" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                  Section Content / Narrative Text
                </label>
                <textarea
                  id="sec-content"
                  rows={3}
                  value={editingSection.content}
                  onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                  placeholder="Detailed description or story for this section..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                    isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* TEMPLATE SPECIFIC: Rich Text Media */}
              {editingSection.templateType === 'rich-text-media' && (
                <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#B7E84B]" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      Media & Image Settings (50/50 Split)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sec-media-url" className="block text-xs font-bold mb-1 text-zinc-200">
                        Image / Media URL
                      </label>
                      <input
                        id="sec-media-url"
                        type="text"
                        value={editingSection.mediaUrl || ''}
                        onChange={(e) => setEditingSection({ ...editingSection, mediaUrl: e.target.value })}
                        placeholder="https://..."
                        className={`w-full px-3 py-2 rounded-xl text-xs border ${
                          isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label htmlFor="sec-media-pos" className="block text-xs font-bold mb-1 text-zinc-200">
                        Media Alignment
                      </label>
                      <select
                        id="sec-media-pos"
                        value={editingSection.mediaPosition || 'right'}
                        onChange={(e) => setEditingSection({ ...editingSection, mediaPosition: e.target.value as any })}
                        className={`w-full px-3 py-2 rounded-xl text-xs border ${
                          isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-300'
                        }`}
                      >
                        <option value="right">Media on Right (Text on Left)</option>
                        <option value="left">Media on Left (Text on Right)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sec-media-alt" className="block text-xs font-bold mb-1 text-zinc-200">
                      Alt Text (for WCAG Screen-Reader Accessibility) *
                    </label>
                    <input
                      id="sec-media-alt"
                      type="text"
                      value={editingSection.mediaAlt || ''}
                      onChange={(e) => setEditingSection({ ...editingSection, mediaAlt: e.target.value })}
                      placeholder="Describe this image for screen readers"
                      className={`w-full px-3 py-2 rounded-xl text-xs border ${
                        isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-300'
                      }`}
                    />
                    {editingSection.mediaUrl && (!editingSection.mediaAlt || !editingSection.mediaAlt.trim()) ? (
                      <div className="mt-2 p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2" role="alert">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-300" />
                        <span><strong>WCAG AA Warning:</strong> Image URL is provided without an Alt text description. Non-sighted visitors and screen readers will miss context.</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-zinc-400 mt-1 block">
                        Reminder: Describe this image for screen readers and search engines.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* TEMPLATE SPECIFIC: Raw Embed */}
              {editingSection.templateType === 'raw-embed' && (
                <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#B7E84B]" />
                    <span className="text-xs font-black uppercase tracking-wider">Raw HTML / Embed Code</span>
                  </div>
                  <textarea
                    rows={5}
                    value={editingSection.embedCode || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, embedCode: e.target.value })}
                    placeholder="<iframe ...> or <form ...>"
                    className="w-full font-mono text-xs p-3 rounded-xl bg-black/40 border border-white/10 text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  />
                </div>
              )}

              {/* Action Buttons (Primary & Secondary) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider block text-zinc-200">Primary Button</span>
                  <input
                    type="text"
                    value={editingSection.buttonText || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonText: e.target.value })}
                    placeholder="Primary Button Label (e.g. GET STARTED)"
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                  <input
                    type="text"
                    value={editingSection.buttonUrl || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonUrl: e.target.value })}
                    placeholder="Primary URL (e.g. /hire-us)"
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider block text-zinc-200">Secondary Button</span>
                  <input
                    type="text"
                    value={editingSection.secondaryButtonText || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, secondaryButtonText: e.target.value })}
                    placeholder="Secondary Button Label (Optional)"
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                  <input
                    type="text"
                    value={editingSection.secondaryButtonUrl || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, secondaryButtonUrl: e.target.value })}
                    placeholder="Secondary URL (e.g. /packages)"
                    className={`w-full px-3 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Repeatable Cards / Points */}
              {(editingSection.templateType === 'feature-cards' ||
                editingSection.templateType === 'cards' ||
                editingSection.templateType === 'rich-text-media') && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-200">
                      Feature Points & Highlights ({(editingSection.items || []).length})
                    </h4>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="px-3 py-1 rounded-lg bg-[#B7E84B]/20 text-[#B7E84B] hover:bg-[#B7E84B]/30 font-bold text-xs flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
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
                            isDark ? 'bg-[#12241A] border-white/10 text-white' : 'bg-white border-slate-300'
                          }`}
                        />
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                          placeholder="Feature Description"
                          className={`w-full px-2.5 py-1.5 rounded-lg text-xs border ${
                            isDark ? 'bg-[#12241A] border-white/10 text-white' : 'bg-white border-slate-300'
                          }`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        aria-label={`Delete feature item ${item.title}`}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className={`p-4 border-t flex items-center justify-between ${isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-zinc-200">
                  <input
                    type="checkbox"
                    checked={editingSection.published}
                    onChange={(e) => setEditingSection({ ...editingSection, published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#B7E84B] accent-[#B7E84B]"
                  />
                  <span>Publish to Website (Active)</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer ${
                    isDark ? 'bg-white/10 text-zinc-300 hover:text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveModal}
                  className="px-5 py-2.5 rounded-xl bg-[#B7E84B] text-[#0F241A] text-xs font-black uppercase tracking-wider hover:bg-[#a5d83a] transition-all flex items-center gap-1.5 shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Section Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
