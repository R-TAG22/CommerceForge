import React, { useState } from 'react';
import { Save, GitCommit, Plus, Trash2, ArrowUp, ArrowDown, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { ProcessSectionContent, ProcessStepItem } from '../../types/cms';
import { useToast } from '../components/Toast';

export const ProcessEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [processData, setProcessData] = useState<ProcessSectionContent>(
    JSON.parse(JSON.stringify(draftContent.process))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('process', processData);
      showToast('success', 'Process Draft Saved', '4-step process updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('process', processData);
      showToast('success', 'Published Live!', '4-step process changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddStep = () => {
    const num = (processData.steps.length + 1).toString().padStart(2, '0');
    const newStep: ProcessStepItem = {
      id: `step-${Date.now()}`,
      stepNumber: num,
      title: 'New Milestone Step',
      description: 'Milestone description detailing client deliverables and timelines.',
      deliverable: 'Delivered asset',
      image: `process-${num}.jpeg`,
      icon: 'Rocket',
      sortOrder: processData.steps.length,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProcessData((prev) => ({ ...prev, steps: [...prev.steps, newStep] }));
  };

  const handleStepChange = (id: string, field: keyof ProcessStepItem, val: unknown) => {
    setProcessData((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= processData.steps.length) return;

    const list = [...processData.steps];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((s, idx) => (s.sortOrder = idx));
    setProcessData((prev) => ({ ...prev, steps: list }));
  };

  const handleDelete = (id: string) => {
    setProcessData((prev) => ({
      ...prev,
      steps: prev.steps.filter((s) => s.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <GitCommit className="w-4 h-4" />
            <span>Delivery Workflow</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">4-Step Process</h1>
          <p className="text-xs text-white/60">Configure project phases from initial discovery to live deployment</p>
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

      {/* Intro Copy */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Section Headlines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={processData.eyebrow}
              onChange={(e) => setProcessData({ ...processData, eyebrow: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Heading Prefix
            </label>
            <input
              type="text"
              value={processData.headingPrefix}
              onChange={(e) => setProcessData({ ...processData, headingPrefix: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
              Heading Highlight
            </label>
            <input
              type="text"
              value={processData.headingHighlight}
              onChange={(e) => setProcessData({ ...processData, headingHighlight: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Subheading
            </label>
            <input
              type="text"
              value={processData.subheading}
              onChange={(e) => setProcessData({ ...processData, subheading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Bottom CTA Button Label
            </label>
            <input
              type="text"
              value={processData.ctaText}
              onChange={(e) => setProcessData({ ...processData, ctaText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Process Milestones</h2>
            <p className="text-xs text-white/50">Sequential steps with deliverables</p>
          </div>
          <button
            type="button"
            onClick={handleAddStep}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="space-y-3">
          {processData.steps.map((step, index) => (
            <div
              key={step.id}
              className="p-4 rounded-xl bg-[#162C20] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="flex sm:flex-col items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === processData.steps.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <div className="w-12 shrink-0">
                <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Step</label>
                <input
                  type="text"
                  value={step.stepNumber}
                  onChange={(e) => handleStepChange(step.id, 'stepNumber', e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-black text-[#B7E84B] text-center"
                />
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleStepChange(step.id, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Deliverable</label>
                  <input
                    type="text"
                    value={step.deliverable}
                    onChange={(e) => handleStepChange(step.id, 'deliverable', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#B7E84B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Image Filename</label>
                  <input
                    type="text"
                    value={step.image || ''}
                    placeholder="e.g. process-01-audit.jpeg"
                    onChange={(e) => handleStepChange(step.id, 'image', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">Description</label>
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleStepChange(step.id, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white/70">
                  <input
                    type="checkbox"
                    checked={step.active}
                    onChange={(e) => handleStepChange(step.id, 'active', e.target.checked)}
                    className="rounded border-white/20 text-[#B7E84B] focus:ring-[#B7E84B]"
                  />
                  <span>Active</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleDelete(step.id)}
                  className="p-1.5 text-white/40 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
