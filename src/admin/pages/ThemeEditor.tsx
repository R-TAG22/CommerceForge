import React, { useState, useEffect } from 'react';
import {
  Palette,
  Type,
  Sliders,
  Sparkles,
  Save,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  Check,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAdminTheme } from '../context/AdminThemeContext';
import { useToast } from '../components/Toast';
import { ThemeSettings } from '../../types/cms';

const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  primaryBrandColor: '#10B981',
  backgroundTone: 'dark',
  accentHoverColor: '#B7E84B',
  headingFont: 'Plus Jakarta Sans',
  bodyFont: 'Inter',
  baseFontSize: 16,
  lineHeight: 1.6,
  borderRadius: 16,
  buttonVariant: 'pill',
  cardElevation: 'frosted',
};

const COLOR_SWATCHES = [
  { label: 'Emerald Dev', hex: '#10B981' },
  { label: 'High-Vis Lime', hex: '#B7E84B' },
  { label: 'Deep Forest', hex: '#064E3B' },
  { label: 'Cyber Cyan', hex: '#06B6D4' },
  { label: 'Electric Indigo', hex: '#6366F1' },
  { label: 'Sunset Amber', hex: '#F59E0B' },
  { label: 'Crimson Surge', hex: '#EF4444' },
];

const HEADING_FONTS = [
  { name: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Modern & Clean)' },
  { name: 'Cabinet Grotesk', label: 'Cabinet Grotesk (Bold & Architectural)' },
  { name: 'Syne', label: 'Syne (Avant-Garde & Premium)' },
  { name: 'Space Grotesk', label: 'Space Grotesk (Tech & Engineered)' },
  { name: 'Outfit', label: 'Outfit (Friendly & Minimalist)' },
];

const BODY_FONTS = [
  { name: 'Inter', label: 'Inter (Industry Benchmark Readability)' },
  { name: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Balanced Body)' },
  { name: 'DM Sans', label: 'DM Sans (Contemporary Editorial)' },
  { name: 'System Sans', label: 'System UI (-apple-system, BlinkMacSystem)' },
];

export const ThemeEditor: React.FC = () => {
  const { draftContent, updateSection } = useCMS();
  const { isDark } = useAdminTheme();
  const { showToast } = useToast();

  const currentTheme = draftContent?.themeSettings || DEFAULT_THEME_SETTINGS;

  const [settings, setSettings] = useState<ThemeSettings>(currentTheme);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (draftContent?.themeSettings) {
      setSettings(draftContent.themeSettings);
    }
  }, [draftContent?.themeSettings]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateSection('themeSettings' as any, settings);
      showToast('success', 'Theme Settings Saved', 'Global brand styles updated in working draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_THEME_SETTINGS);
    showToast('info', 'Settings Reset', 'Restored default brand theme values.');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#B7E84B]/20 text-[#B7E84B]">
                <Palette className="w-5 h-5" />
              </span>
              <h1 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Global Theme & Brand Styler
              </h1>
            </div>
            <p className={`mt-1 text-sm ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
              Real-time design token controls for brand palette, typography hierarchy, shape geometry, and UI elevation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                isDark ? 'bg-white/5 border-white/10 text-zinc-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black text-xs uppercase tracking-wider hover:bg-[#a5d83a] transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus:outline-none"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Theme Tokens'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Design Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Brand Colors */}
          <div
            className={`p-6 rounded-2xl border ${
              isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-4 h-4 text-[#B7E84B]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-white dark:text-white">
                1. Brand Colors & Tones
              </h2>
            </div>

            <div className="space-y-5">
              {/* Primary Color Picker */}
              <div>
                <label htmlFor="primary-brand-color" className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-200">
                  Primary Brand Accent
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="primary-brand-color"
                    type="color"
                    value={settings.primaryBrandColor}
                    onChange={(e) => setSettings({ ...settings, primaryBrandColor: e.target.value })}
                    className="w-10 h-10 rounded-xl border cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={settings.primaryBrandColor}
                    onChange={(e) => setSettings({ ...settings, primaryBrandColor: e.target.value })}
                    className={`w-32 px-3 py-2 rounded-xl text-xs font-mono border ${
                      isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <div className="flex flex-wrap gap-1.5 ml-2">
                    {COLOR_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.hex}
                        type="button"
                        onClick={() => setSettings({ ...settings, primaryBrandColor: swatch.hex })}
                        title={swatch.label}
                        className="w-6 h-6 rounded-full border border-black/20 hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Accent Hover Glow */}
              <div>
                <label htmlFor="accent-hover-color" className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-200">
                  Accent Hover / Glow Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="accent-hover-color"
                    type="color"
                    value={settings.accentHoverColor}
                    onChange={(e) => setSettings({ ...settings, accentHoverColor: e.target.value })}
                    className="w-10 h-10 rounded-xl border cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={settings.accentHoverColor}
                    onChange={(e) => setSettings({ ...settings, accentHoverColor: e.target.value })}
                    className={`w-32 px-3 py-2 rounded-xl text-xs font-mono border ${
                      isDark ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Background Tone Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-200">
                  Default Background Tone
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Dark Dev', icon: Moon, desc: 'Midnight Charcoal (#0B0F17)' },
                    { id: 'light', label: 'Crisp Light', icon: Sun, desc: 'Warm Tinted White (#FAFAF9)' },
                    { id: 'system', label: 'System Mode', icon: Monitor, desc: 'Auto-adapts to visitor OS' },
                  ].map((mode) => {
                    const IconComp = mode.icon;
                    const isSelected = settings.backgroundTone === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSettings({ ...settings, backgroundTone: mode.id as any })}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                          isSelected
                            ? 'border-[#B7E84B] bg-[#B7E84B]/15 text-white ring-1 ring-[#B7E84B]'
                            : isDark
                            ? 'border-[#1E3A2B] bg-[#12241A] text-zinc-300 hover:border-white/20'
                            : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <IconComp className="w-4 h-4 text-[#B7E84B]" />
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#B7E84B]" />}
                        </div>
                        <span className="text-xs font-bold block">{mode.label}</span>
                        <span className="text-[10px] opacity-75 mt-0.5">{mode.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Typography Hierarchy */}
          <div
            className={`p-6 rounded-2xl border ${
              isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-4 h-4 text-[#B7E84B]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-white dark:text-white">
                2. Typography & Text Rhythm
              </h2>
            </div>

            <div className="space-y-5">
              {/* Heading Font */}
              <div>
                <label htmlFor="heading-font" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                  Heading Display Font
                </label>
                <select
                  id="heading-font"
                  value={settings.headingFont}
                  onChange={(e) => setSettings({ ...settings, headingFont: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                    isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {HEADING_FONTS.map((font) => (
                    <option key={font.name} value={font.name}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Body Font */}
              <div>
                <label htmlFor="body-font" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                  Body & UI Font
                </label>
                <select
                  id="body-font"
                  value={settings.bodyFont}
                  onChange={(e) => setSettings({ ...settings, bodyFont: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                    isDark ? 'bg-[#12241A] border-[#1E3A2B] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {BODY_FONTS.map((font) => (
                    <option key={font.name} value={font.name}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="font-size-slider" className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                    Base Body Font Size
                  </label>
                  <span className="text-xs font-mono font-bold text-[#B7E84B]">{settings.baseFontSize}px</span>
                </div>
                <input
                  id="font-size-slider"
                  type="range"
                  min="14"
                  max="20"
                  step="1"
                  value={settings.baseFontSize}
                  onChange={(e) => setSettings({ ...settings, baseFontSize: Number(e.target.value) })}
                  className="w-full accent-[#B7E84B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                  <span>14px (Compact)</span>
                  <span>16px (Standard)</span>
                  <span>20px (Spacious)</span>
                </div>
              </div>

              {/* Line Height Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="line-height-slider" className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                    Line Height Multiplier
                  </label>
                  <span className="text-xs font-mono font-bold text-[#B7E84B]">{settings.lineHeight}x</span>
                </div>
                <input
                  id="line-height-slider"
                  type="range"
                  min="1.4"
                  max="1.8"
                  step="0.05"
                  value={settings.lineHeight}
                  onChange={(e) => setSettings({ ...settings, lineHeight: Number(e.target.value) })}
                  className="w-full accent-[#B7E84B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                  <span>1.4 (Dense)</span>
                  <span>1.6 (Recommended)</span>
                  <span>1.8 (Open)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Shapes & Layout */}
          <div
            className={`p-6 rounded-2xl border ${
              isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-4 h-4 text-[#B7E84B]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-white dark:text-white">
                3. Shapes, Radii & Elevations
              </h2>
            </div>

            <div className="space-y-5">
              {/* Border Radius Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="border-radius-slider" className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                    Global Border Radius
                  </label>
                  <span className="text-xs font-mono font-bold text-[#B7E84B]">{settings.borderRadius}px</span>
                </div>
                <input
                  id="border-radius-slider"
                  type="range"
                  min="0"
                  max="24"
                  step="2"
                  value={settings.borderRadius}
                  onChange={(e) => setSettings({ ...settings, borderRadius: Number(e.target.value) })}
                  className="w-full accent-[#B7E84B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                  <span>0px (Sharp)</span>
                  <span>12px (Subtle)</span>
                  <span>24px (Soft Curved)</span>
                </div>
              </div>

              {/* Button Variant */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-200">
                  Button Geometry Variant
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'sharp', label: 'Sharp Corners', radius: '0px' },
                    { id: 'rounded', label: 'Curved (12px)', radius: '12px' },
                    { id: 'pill', label: 'Pill Shape', radius: '9999px' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setSettings({ ...settings, buttonVariant: btn.id as any })}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                        settings.buttonVariant === btn.id
                          ? 'border-[#B7E84B] bg-[#B7E84B]/15 text-white ring-1 ring-[#B7E84B]'
                          : isDark
                          ? 'border-[#1E3A2B] bg-[#12241A] text-zinc-300 hover:border-white/20'
                          : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div
                        className="w-16 h-6 mx-auto mb-2 border border-white/20 flex items-center justify-center text-[10px] font-bold bg-[#B7E84B] text-[#0F241A]"
                        style={{ borderRadius: btn.radius }}
                      >
                        Action
                      </div>
                      <span className="text-xs font-bold block">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Elevation Depth */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-200">
                  Card Elevation & Surface
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'flat', label: 'Flat Clean', desc: '1px clean stroke' },
                    { id: 'subtle', label: 'Soft Shadow', desc: 'Diffused depth' },
                    { id: 'frosted', label: 'Frosted Glass', desc: 'Blur & translucent' },
                  ].map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSettings({ ...settings, cardElevation: card.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                        settings.cardElevation === card.id
                          ? 'border-[#B7E84B] bg-[#B7E84B]/15 text-white ring-1 ring-[#B7E84B]'
                          : isDark
                          ? 'border-[#1E3A2B] bg-[#12241A] text-zinc-300 hover:border-white/20'
                          : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold block">{card.label}</span>
                      <span className="text-[10px] opacity-75 mt-0.5">{card.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Mini Preview Card */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B7E84B]" />
              <span className="text-xs font-black uppercase tracking-wider text-zinc-200">
                Live Real-Time Preview
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Auto-Synchronized
            </span>
          </div>

          {/* Interactive Preview Container */}
          <div
            className="p-6 sm:p-8 transition-all relative overflow-hidden border shadow-2xl"
            style={{
              backgroundColor: settings.backgroundTone === 'light' ? '#FAFAF9' : '#0B0F17',
              color: settings.backgroundTone === 'light' ? '#064E3B' : '#FFFFFF',
              borderRadius: `${settings.borderRadius}px`,
              borderColor: settings.backgroundTone === 'light' ? '#E2E8F0' : 'rgba(255, 255, 255, 0.15)',
            }}
          >
            {/* Ambient Radial Accent */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-2xl pointer-events-none"
              style={{ backgroundColor: settings.primaryBrandColor }}
              aria-hidden="true"
            />

            {/* Badge */}
            <div className="mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
                style={{
                  backgroundColor: settings.primaryBrandColor,
                  color: '#0F241A',
                }}
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>COMMERCEFORGE ARCHITECTURE</span>
              </span>
            </div>

            {/* Headline */}
            <h3
              className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight"
              style={{ fontFamily: settings.headingFont }}
            >
              Engineered for High-Velocity E-Commerce
            </h3>

            {/* Body Copy */}
            <p
              className="mt-3 opacity-85"
              style={{
                fontFamily: settings.bodyFont,
                fontSize: `${settings.baseFontSize}px`,
                lineHeight: settings.lineHeight,
              }}
            >
              We rebuild slow, outdated site into high-speed sales engines. Handcrafted, mobile-first and delivered in 7 days.
            </p>

            {/* Mini Card Preview */}
            <div
              className={`my-5 p-4 transition-all ${
                settings.cardElevation === 'frosted'
                  ? 'bg-white/10 backdrop-blur-md border border-white/15 shadow-lg'
                  : settings.cardElevation === 'subtle'
                  ? 'bg-black/20 shadow-xl border border-black/10'
                  : 'bg-black/10 border border-white/10'
              }`}
              style={{ borderRadius: `${Math.max(0, settings.borderRadius - 4)}px` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 block">
                    Speed Benchmark
                  </span>
                  <strong className="text-base font-black">99 / 100 Mobile PageSpeed</strong>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: settings.primaryBrandColor, color: '#0F241A' }}
                >
                  A+
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="px-6 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: settings.primaryBrandColor,
                  color: '#0F241A',
                  borderRadius:
                    settings.buttonVariant === 'sharp'
                      ? '0px'
                      : settings.buttonVariant === 'rounded'
                      ? '12px'
                      : '9999px',
                }}
              >
                <span>Hire Us Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                className="px-4 py-3 text-xs font-bold uppercase tracking-wider border border-current opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                style={{
                  borderRadius:
                    settings.buttonVariant === 'sharp'
                      ? '0px'
                      : settings.buttonVariant === 'rounded'
                      ? '12px'
                      : '9999px',
                }}
              >
                View Packages
              </button>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-xs leading-relaxed ${
              isDark ? 'bg-[#12241A] border-[#1E3A2B] text-zinc-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2 mb-1 font-bold text-white dark:text-white">
              <Shield className="w-4 h-4 text-[#B7E84B]" />
              <span>Publish Safeguard</span>
            </div>
            Changes here alter CSS design tokens across all website components when published live.
          </div>
        </div>
      </div>
    </div>
  );
};
