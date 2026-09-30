import React, { useState } from 'react';
import { Save, HelpCircle, Plus, Trash2, ArrowUp, ArrowDown, UploadCloud } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { FaqSectionContent, FaqItem } from '../../types/cms';
import { useToast } from '../components/Toast';

export const FaqEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [faqData, setFaqData] = useState<FaqSectionContent>(
    JSON.parse(JSON.stringify(draftContent.faq))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSection('faq', faqData);
      showToast('success', 'FAQ Draft Saved', 'FAQ section updated in draft.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    try {
      await publishSection('faq', faqData);
      showToast('success', 'Published Live!', 'FAQ changes are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question: 'New Frequently Asked Question?',
      answer: 'Clear, direct answer explaining our process, technical details, or policies.',
      sortOrder: faqData.faqs.length,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setFaqData((prev) => ({ ...prev, faqs: [...prev.faqs, newFaq] }));
  };

  const handleFaqChange = (id: string, field: keyof FaqItem, val: unknown) => {
    setFaqData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, [field]: val } : f)),
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= faqData.faqs.length) return;

    const list = [...faqData.faqs];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((f, idx) => (f.sortOrder = idx));
    setFaqData((prev) => ({ ...prev, faqs: list }));
  };

  const handleDelete = (id: string) => {
    setFaqData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Customer Clarification</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Frequently Asked Questions</h1>
          <p className="text-xs text-white/60">Manage questions and answers shown in the interactive accordion</p>
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

      {/* Headlines & Support Note */}
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
              value={faqData.eyebrow}
              onChange={(e) => setFaqData({ ...faqData, eyebrow: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Heading Prefix
            </label>
            <input
              type="text"
              value={faqData.heading}
              onChange={(e) => setFaqData({ ...faqData, heading: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
              Heading Highlight
            </label>
            <input
              type="text"
              value={faqData.headingHighlight}
              onChange={(e) => setFaqData({ ...faqData, headingHighlight: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-bold"
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
              value={faqData.subheading}
              onChange={(e) => setFaqData({ ...faqData, subheading: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              Support Note / Email Invitation
            </label>
            <input
              type="text"
              value={faqData.supportNote}
              onChange={(e) => setFaqData({ ...faqData, supportNote: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Interactive Q&A Items</h2>
            <p className="text-xs text-white/50">Questions expand and collapse for visitors</p>
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span>Add Question</span>
          </button>
        </div>

        <div className="space-y-4">
          {faqData.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="p-4 rounded-xl bg-[#162C20] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#B7E84B] font-bold">
                    Q{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === faqData.faqs.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-white/70">
                    <input
                      type="checkbox"
                      checked={faq.published}
                      onChange={(e) => handleFaqChange(faq.id, 'published', e.target.checked)}
                      className="rounded border-white/20 text-[#B7E84B] focus:ring-[#B7E84B]"
                    />
                    <span>Live</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDelete(faq.id)}
                    className="p-1.5 text-white/40 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(faq.id, 'question', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-white/50 mb-1">
                  Answer
                </label>
                <textarea
                  rows={3}
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(faq.id, 'answer', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-[#B7E84B] leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
