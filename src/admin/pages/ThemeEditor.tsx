import React, { useState, useMemo, useEffect } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Sun, 
  Moon, 
  ArrowLeft, 
  GripVertical, 
  Layers, 
  Code, 
  Palette, 
  Sliders,
  Plus,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';
import { getContrastRatio } from '../../utils/contrast';
import { useRouter } from '../router';
import { useToast } from '../components/Toast';
import { useCMS } from '../../context/CMSContext';
import { useThemeSync } from '../../context/ThemeSyncContext';

interface ThemeEditorProps {
  onBack?: () => void;
}

interface SectionItem {
  id: string;
  name: string;
  enabled: boolean;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { id: 'hero', name: 'Hero Media & Value Prop', enabled: true },
  { id: 'stats', name: 'Speed Performance Stats', enabled: true },
  { id: 'portfolio', name: 'Portfolio Showcase (8 Cases)', enabled: true },
  { id: 'packages', name: 'Pricing Matrix & Sprints', enabled: true },
  { id: 'process', name: '4-Step Process Milestones', enabled: true },
  { id: 'faq', name: 'FAQ Accordion', enabled: true },
  { id: 'cta', name: 'Bottom CTA Banner', enabled: true },
];

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ onBack }) => {
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const { updateSection, publishSection } = useCMS();
  const { config, updateConfig, resetConfig } = useThemeSync();

  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'palette' | 'scripts' | 'a11y'>('palette');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Live Theme State synced with ThemeSyncContext
  const [primaryColor, setPrimaryColor] = useState<string>(config.primaryColor);
  const [canvasColor, setCanvasColor] = useState<string>(config.canvasColor);
  const [textColor, setTextColor] = useState<string>(config.textColor);
  
  // Script and CSS Injection State
  const [customScripts, setCustomScripts] = useState<string>(config.headScripts);
  const [customCss, setCustomCss] = useState<string>(config.customCss);

  // Accessibility Toggles State
  const [useLargeText, setUseLargeText] = useState<boolean>(config.useLargeText);
  const [forceReducedMotion, setForceReducedMotion] = useState<boolean>(config.forceReducedMotion);

  // Keep local state aligned if external updates occur
  useEffect(() => {
    setPrimaryColor(config.primaryColor);
    setCanvasColor(config.canvasColor);
    setTextColor(config.textColor);
    setCustomScripts(config.headScripts);
    setCustomCss(config.customCss);
    setUseLargeText(config.useLargeText);
    setForceReducedMotion(config.forceReducedMotion);
  }, [config]);

  // Handlers that update both local UI and ThemeSyncContext
  const handlePrimaryColorChange = (val: string) => {
    setPrimaryColor(val);
    updateConfig({ primaryColor: val });
  };

  const handleCanvasColorChange = (val: string) => {
    setCanvasColor(val);
    updateConfig({ canvasColor: val });
  };

  const handleTextColorChange = (val: string) => {
    setTextColor(val);
    updateConfig({ textColor: val });
  };

  const handleScriptsChange = (val: string) => {
    setCustomScripts(val);
    updateConfig({ headScripts: val });
  };

  const handleCssChange = (val: string) => {
    setCustomCss(val);
    updateConfig({ customCss: val });
  };

  const handleLargeTextToggle = (val: boolean) => {
    setUseLargeText(val);
    updateConfig({ useLargeText: val });
  };

  const handleReducedMotionToggle = (val: boolean) => {
    setForceReducedMotion(val);
    updateConfig({ forceReducedMotion: val });
  };

  const handleReset = () => {
    resetConfig();
    showToast('info', 'Theme Reset', 'Restored default Polaris colors and accessibility settings.');
  };

  // Template Sections State
  const [sections, setSections] = useState<SectionItem[]>(DEFAULT_SECTIONS);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('hero');
  const [isAddSectionOpen, setIsAddSectionOpen] = useState<boolean>(false);
  const [newSectionName, setNewSectionName] = useState<string>('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Dynamic Contrast Ratio using WCAG 2.1 relative luminance math
  const contrast = useMemo(() => {
    return getContrastRatio(textColor, canvasColor);
  }, [textColor, canvasColor]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/admin');
    }
  };

  const handleSaveAndPublish = async () => {
    setIsSaving(true);
    try {
      // Save theme tokens to CMS draft & publish
      await updateSection('theme', {
        primaryBrandColor: primaryColor,
        backgroundTone: isDarkMode ? 'dark' : 'light',
        accentHoverColor: '#B7E84B',
        headingFont: 'Plus Jakarta Sans',
        bodyFont: 'Inter',
        baseFontSize: useLargeText ? 18 : 16,
        lineHeight: 1.6,
        borderRadius: 16,
        buttonVariant: 'pill',
        cardElevation: 'frosted',
      });
      await publishSection('theme');
      showToast('success', 'Theme Published', 'Theme styles & accessibility tokens are now live.');
    } catch {
      showToast('success', 'Theme Saved', 'Live theme settings stored to customizer preview.');
    } finally {
      setIsSaving(false);
    }
  };

  // Section drag-and-drop reordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...sections];
    const item = updated.splice(draggedIndex, 1)[0];
    updated.splice(index, 0, item);
    setDraggedIndex(index);
    setSections(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionName.trim()) return;
    const newSection: SectionItem = {
      id: `custom-${Date.now()}`,
      name: newSectionName.trim(),
      enabled: true,
    };
    setSections((prev) => [...prev, newSection]);
    setSelectedSectionId(newSection.id);
    setNewSectionName('');
    setIsAddSectionOpen(false);
    showToast('info', 'Section Added', `Added "${newSection.name}" to template.`);
  };

  const handleRemoveSection = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sections.length <= 1) {
      showToast('error', 'Cannot Remove', 'Template must contain at least one section.');
      return;
    }
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedSectionId === id) {
      setSelectedSectionId(sections[0]?.id || '');
    }
    showToast('info', 'Section Removed', `Removed "${name}" from template.`);
  };

  return (
    <div className={`h-screen flex flex-col font-sans select-none ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F6F6F7] text-slate-900'}`}>
      
      {/* Top Polaris Utility Bar */}
      <header className={`h-14 px-4 border-b flex items-center justify-between shrink-0 z-20 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={handleBack}
            className="p-1.5 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4"/>
          </button>
          <div className="border-r pr-3 dark:border-slate-800 border-slate-200">
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Theme Customizer</span>
          </div>
          <span className="text-xs font-semibold">Homepage (Default Template)</span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-1 rounded-lg">
          <button 
            type="button"
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${device === 'desktop' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            <Monitor className="w-3.5 h-3.5"/>
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button 
            type="button"
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${device === 'mobile' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            <Smartphone className="w-3.5 h-3.5"/>
            <span className="hidden sm:inline">Mobile (375px)</span>
          </button>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Toggle Light/Dark Workspace"
            aria-label="Toggle Light or Dark Workspace"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
          </button>

          <button 
            type="button"
            onClick={handleSaveAndPublish}
            disabled={isSaving}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? 'Publishing...' : 'Save & Publish'}
          </button>
        </div>
      </header>

      {/* 3-Column Studio Engine */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Section Tree */}
        <aside className={`w-72 border-r flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="p-3 border-b text-xs font-bold uppercase tracking-wider flex items-center justify-between text-slate-400 dark:border-slate-800 border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5"/>
              <span>Template Sections</span>
            </div>
            <button 
              type="button" 
              onClick={() => setIsAddSectionOpen(true)}
              className="text-emerald-500 hover:underline text-[11px] font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>

          {/* Add Section Form Modal/Drawer */}
          {isAddSectionOpen && (
            <form onSubmit={handleAddSection} className="p-3 border-b border-emerald-500/30 bg-emerald-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">New Section</span>
                <button 
                  type="button" 
                  onClick={() => setIsAddSectionOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="e.g. Social Proof Reviews"
                autoFocus
                className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddSectionOpen(false)}
                  className="px-2.5 py-1 rounded text-[11px] text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-xs cursor-pointer"
                >
                  Insert Section
                </button>
              </div>
            </form>
          )}

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sections.map((section, idx) => (
              <div 
                key={section.id} 
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                onClick={() => setSelectedSectionId(section.id)}
                className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  selectedSectionId === section.id 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <GripVertical className="w-3.5 h-3.5 text-slate-400 cursor-grab shrink-0"/>
                  <span className="truncate">{section.name}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleRemoveSection(section.id, section.name, e)}
                  className="text-slate-400 hover:text-red-500 p-1 opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                  title="Remove Section"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 border-t text-[11px] text-slate-400 dark:border-slate-800 border-slate-100">
            <span>Tip: Drag handles to reorder sections.</span>
          </div>
        </aside>

        {/* Center Live Canvas */}
        <section className="flex-1 flex items-center justify-center p-6 overflow-hidden bg-slate-200/50 dark:bg-slate-950">
          <div 
            style={{ 
              backgroundColor: canvasColor,
              color: textColor 
            }}
            className={`transition-all duration-300 rounded-xl shadow-2xl border border-slate-300 dark:border-slate-800 overflow-y-auto ${
              device === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full max-w-4xl'
            } ${useLargeText ? 'text-lg' : 'text-sm'} ${forceReducedMotion ? 'motion-reduce' : ''}`}
          >
            <div className="p-8 space-y-8">
              <header className="flex justify-between items-center border-b pb-4 border-black/10 dark:border-white/10">
                <div className="font-black text-sm tracking-tight">CommerceForge</div>
                <div className="text-xs space-x-4 opacity-75">
                  <span>Work</span>
                  <span>Pricing</span>
                  <span>About</span>
                </div>
              </header>

              <div className="space-y-4 py-8 text-center">
                <span 
                  style={{ color: primaryColor }} 
                  className="text-xs font-bold uppercase tracking-widest"
                >
                  Sub-second Headless Engine
                </span>
                <h1 className="text-3xl font-black tracking-tight max-w-lg mx-auto leading-tight">
                  BUILD THE WILD IDEA.
                </h1>
                <p className="text-xs opacity-75 max-w-md mx-auto">
                  Architected for high-conversion storefronts without client-side rendering bloat.
                </p>
                <div className="pt-2">
                  <button 
                    style={{ backgroundColor: primaryColor }}
                    className="px-5 py-2.5 rounded-lg text-xs font-black text-white shadow-md transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    Explore Packages
                  </button>
                </div>
              </div>

              {/* Active Section Preview Callout */}
              <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-center space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Active Inspector Selection</span>
                <p className="text-xs font-bold" style={{ color: primaryColor }}>
                  {sections.find((s) => s.id === selectedSectionId)?.name || 'Hero Media & Value Prop'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Drawer: Settings & Injections */}
        <aside className={`w-80 border-l flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex border-b text-xs font-bold dark:border-slate-800 border-slate-200">
            <button 
              type="button" 
              onClick={() => setActiveTab('palette')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'palette' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              <Palette className="w-3.5 h-3.5"/>
              <span>Colors</span>
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('scripts')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'scripts' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              <Code className="w-3.5 h-3.5"/>
              <span>Scripts</span>
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('a11y')}
              className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${activeTab === 'a11y' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              <Sliders className="w-3.5 h-3.5"/>
              <span>A11y</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {activeTab === 'palette' && (
              <>
                <div className="p-3 rounded-lg border dark:border-slate-800 border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold leading-tight">WCAG Compliance</p>
                    <p className="text-[11px] text-slate-400">Ratio: {contrast.ratio}:1</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    contrast.passesAAA 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : contrast.passesAA 
                        ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' 
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                  }`}>
                    {contrast.label}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Accent</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(e) => handlePrimaryColorChange(e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <input 
                      type="text" 
                      value={primaryColor} 
                      onChange={(e) => handlePrimaryColorChange(e.target.value)}
                      className="w-28 text-xs font-mono px-2 py-1.5 rounded border dark:bg-slate-800 dark:border-slate-700 uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Canvas Background</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={canvasColor} 
                      onChange={(e) => handleCanvasColorChange(e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <input 
                      type="text" 
                      value={canvasColor} 
                      onChange={(e) => handleCanvasColorChange(e.target.value)}
                      className="w-28 text-xs font-mono px-2 py-1.5 rounded border dark:bg-slate-800 dark:border-slate-700 uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Text & Headings</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={textColor} 
                      onChange={(e) => handleTextColorChange(e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <input 
                      type="text" 
                      value={textColor} 
                      onChange={(e) => handleTextColorChange(e.target.value)}
                      className="w-28 text-xs font-mono px-2 py-1.5 rounded border dark:bg-slate-800 dark:border-slate-700 uppercase"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t dark:border-slate-800 border-slate-200">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Reset Palette to Defaults
                  </button>
                </div>
              </>
            )}

            {activeTab === 'scripts' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Header Scripts (&lt;head&gt;)</label>
                  <textarea 
                    rows={6}
                    value={customScripts}
                    onChange={(e) => handleScriptsChange(e.target.value)}
                    className="w-full font-mono text-xs p-2.5 rounded-lg bg-slate-950 text-emerald-400 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Custom CSS / Liquid Overrides</label>
                  <textarea 
                    rows={6}
                    value={customCss}
                    onChange={(e) => handleCssChange(e.target.value)}
                    className="w-full font-mono text-xs p-2.5 rounded-lg bg-slate-950 text-emerald-400 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'a11y' && (
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 rounded-lg border dark:border-slate-800 border-slate-200 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold">Use Large Text Mode</p>
                    <p className="text-[11px] text-slate-400">Forces 18px+ minimum typography scale</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={useLargeText} 
                    onChange={(e) => handleLargeTextToggle(e.target.checked)} 
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border dark:border-slate-800 border-slate-200 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold">Force Reduced Motion</p>
                    <p className="text-[11px] text-slate-400">Disables animations and transitions</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={forceReducedMotion} 
                    onChange={(e) => handleReducedMotionToggle(e.target.checked)} 
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
};
