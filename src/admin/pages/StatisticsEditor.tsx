import React, { useState } from 'react';
import { Save, BarChart3, Plus, Trash2, ArrowUp, ArrowDown, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { StatisticsSectionContent, StatisticItem } from '../../types/cms';
import { useToast } from '../components/Toast';

export const StatisticsEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [statsContent, setStatsContent] = useState<StatisticsSectionContent>(
    JSON.parse(JSON.stringify(draftContent.statistics))
  );
  const [newBrandInput, setNewBrandInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('statistics', statsContent);
      showToast('success', 'Statistics Draft Saved', 'Metrics & brand ticker updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('statistics', statsContent);
      showToast('success', 'Published Live!', 'Statistics changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddStat = () => {
    const newStat: StatisticItem = {
      id: `stat-${Date.now()}`,
      value: '+100%',
      label: 'New Metric',
      description: 'Performance metric description',
      icon: 'TrendingUp',
      sortOrder: statsContent.stats.length,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setStatsContent((prev) => ({ ...prev, stats: [...prev.stats, newStat] }));
  };

  const handleStatChange = (id: string, field: keyof StatisticItem, val: unknown) => {
    setStatsContent((prev) => ({
      ...prev,
      stats: prev.stats.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    }));
  };

  const handleMoveStat = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= statsContent.stats.length) return;

    const list = [...statsContent.stats];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((s, idx) => (s.sortOrder = idx));
    setStatsContent((prev) => ({ ...prev, stats: list }));
  };

  const handleDeleteStat = (id: string) => {
    setStatsContent((prev) => ({
      ...prev,
      stats: prev.stats.filter((s) => s.id !== id),
    }));
  };

  const handleAddBrand = () => {
    const val = newBrandInput.trim();
    if (!val) return;
    setStatsContent((prev) => ({ ...prev, clientBrands: [...prev.clientBrands, val] }));
    setNewBrandInput('');
  };

  const handleRemoveBrand = (index: number) => {
    setStatsContent((prev) => ({
      ...prev,
      clientBrands: prev.clientBrands.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Title & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Metrics & Social Proof</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Statistics & Client Ticker</h1>
          <p className="text-xs text-white/60">Configure metric callouts, descriptions, and verified client brand list</p>
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

      {/* Repeatable Statistics */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Key Performance Metrics</h2>
            <p className="text-xs text-white/50">4 high-contrast metric callout cards</p>
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Stat</span>
          </button>
        </div>

        <div className="space-y-3">
          {statsContent.stats.map((item, index) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#162C20] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMoveStat(index, 'up')}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === statsContent.stats.length - 1}
                  onClick={() => handleMoveStat(index, 'down')}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Metric Value</label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleStatChange(item.id, 'value', e.target.value)}
                    placeholder="+310%"
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-black text-[#B7E84B] focus:outline-none focus:border-[#B7E84B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleStatChange(item.id, 'label', e.target.value)}
                    placeholder="Avg. Mobile Conversion"
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#B7E84B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleStatChange(item.id, 'description', e.target.value)}
                    placeholder="Sub-second first contentful paint"
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-[#B7E84B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white/70">
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={(e) => handleStatChange(item.id, 'active', e.target.checked)}
                    className="rounded border-white/20 text-[#B7E84B] focus:ring-[#B7E84B]"
                  />
                  <span>Active</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleDeleteStat(item.id)}
                  className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Brands Roster */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Trusted Client Brands Ticker
        </h2>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            Section Label
          </label>
          <input
            type="text"
            value={statsContent.trustedBrandsLabel}
            onChange={(e) => setStatsContent({ ...statsContent, trustedBrandsLabel: e.target.value })}
            className="w-full max-w-md px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            Brand Names in Carousel
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {statsContent.clientBrands.map((brand, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#162C20] border border-white/15 text-xs text-white font-medium"
              >
                <span>{brand}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveBrand(idx)}
                  className="text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-md">
            <input
              type="text"
              placeholder="Add client brand name..."
              value={newBrandInput}
              onChange={(e) => setNewBrandInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddBrand();
                }
              }}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
            />
            <button
              type="button"
              onClick={handleAddBrand}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
