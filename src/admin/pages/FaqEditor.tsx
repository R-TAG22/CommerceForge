import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  ExternalLink,
  Search,
  MessageSquare
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { FAQItem } from '../../types/cms';

export const FaqEditor: React.FC = () => {
  const { draftContent, updateSection, updateDraftContent, setPreviewMode } = useCMS();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'questions' | 'header' | 'cta'>('questions');

  const [faqData, setFaqData] = useState(draftContent.faq);
  const [faqList, setFaqList] = useState<FAQItem[]>(draftContent.faq?.faqs || []);
  const [pageConfig, setPageConfig] = useState(draftContent.faqsPageConfig || {
    id: 'faqs-config',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    searchPlaceholder: 'Search answers (e.g. pricing, revisions, ownership)...',
    heroBadge: 'TRANSPARENCY FIRST',
    heroHeading: 'FREQUENTLY ASKED QUESTIONS.',
    heroSubheading: 'Got questions before we collaborate? Here is everything you need to know about our productized rates, delivery timelines, codebase ownership, and guarantees.',
    notFoundTitle: 'No matching questions found',
    notFoundText: 'Have a specific question? Feel free to ask us directly.',
    notFoundButtonText: 'Ask Us Directly',
  });

  const [editingFaq, setEditingFaq] = useState<{ index: number; data: FAQItem } | null>(null);

  React.useEffect(() => {
    if (draftContent.faq) {
      setFaqData(draftContent.faq);
      setFaqList(draftContent.faq.faqs || []);
    }
    if (draftContent.faqsPageConfig) {
      setPageConfig(draftContent.faqsPageConfig);
    }
  }, [draftContent]);

  const handleSaveFaqs = async (updated: FAQItem[]) => {
    setFaqList(updated);
    await updateSection('faq', {
      ...faqData,
      faqs: updated,
    });
    showToast('success', 'FAQs Saved', 'Questions updated on public FAQ page.');
  };

  const handleSaveHeader = async () => {
    await updateSection('faq', {
      ...faqData,
      eyebrow: pageConfig.heroBadge || faqData.eyebrow,
      subheading: pageConfig.heroSubheading || faqData.subheading,
      faqs: faqList,
    });
    await updateDraftContent({ faqsPageConfig: pageConfig });
    showToast('success', 'FAQ Header Saved', 'Hero text and search placeholder updated.');
  };

  const handleSaveCta = async () => {
    await updateSection('faq', {
      ...faqData,
      faqs: faqList,
    });
    showToast('success', 'FAQ CTA Saved', 'Bottom question card updated.');
  };

  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      question: 'New Question Title?',
      answer: 'Detailed answer explaining your process, rates, or guarantees clearly.',
      sortOrder: faqList.length,
      published: true,
    };
    const updated = [...faqList, newFaq];
    handleSaveFaqs(updated);
    setEditingFaq({ index: faqList.length, data: newFaq });
  };

  const handleMoveFaq = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqList.length) return;
    const updated = [...faqList];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const sorted = updated.map((f, idx) => ({ ...f, sortOrder: idx }));
    handleSaveFaqs(sorted);
  };

  const handleDeleteFaq = (index: number) => {
    if (window.confirm(`Delete question "${faqList[index].question}"?`)) {
      const updated = faqList.filter((_, i) => i !== index);
      handleSaveFaqs(updated);
      if (editingFaq?.index === index) {
        setEditingFaq(null);
      }
    }
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
            FAQ Page Editor
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            Manage frequently asked questions, answers, and search placeholder ({faqList.length} items).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddFaq}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPreviewMode(true);
              window.open('#/faqs', '_blank');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>View FAQ Page</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'questions'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          1. Questions &amp; Answers ({faqList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('header')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'header'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          2. Hero &amp; Search Bar
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cta')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
            activeTab === 'cta'
              ? 'border-emerald-600 text-emerald-700 font-black'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          3. Still Have Questions Card
        </button>
      </div>

      {/* TAB 1: QUESTIONS */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div
              key={faq.id || index}
              className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-xs font-black text-slate-800 shrink-0 mt-0.5">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2 font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-xs">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveFaq(index, 'up')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === faqList.length - 1}
                      onClick={() => handleMoveFaq(index, 'down')}
                      className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditingFaq({ index, data: { ...faq } })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-[#B7E84B] text-[#0E1B13] hover:bg-[#a6d93b] cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(index)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Delete question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: HERO & SEARCH */}
      {activeTab === 'header' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Eyebrow Badge
              </label>
              <input
                type="text"
                value={pageConfig.heroBadge || ''}
                onChange={(e) => setPageConfig({ ...pageConfig, heroBadge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
                Heading
              </label>
              <input
                type="text"
                value={pageConfig.heroHeading || ''}
                onChange={(e) => setPageConfig({ ...pageConfig, heroHeading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Subheading
            </label>
            <textarea
              rows={3}
              value={pageConfig.heroSubheading || ''}
              onChange={(e) => setPageConfig({ ...pageConfig, heroSubheading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Search Input Placeholder
            </label>
            <input
              type="text"
              value={pageConfig.searchPlaceholder}
              onChange={(e) => setPageConfig({ ...pageConfig, searchPlaceholder: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveHeader}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save FAQ Hero</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: STILL HAVE QUESTIONS CTA */}
      {activeTab === 'cta' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Card Title
            </label>
            <input
              type="text"
              value={faqData.stillQuestionsTitle || ''}
              onChange={(e) => setFaqData({ ...faqData, stillQuestionsTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Card Explanation
            </label>
            <textarea
              rows={2}
              value={faqData.stillQuestionsText || ''}
              onChange={(e) => setFaqData({ ...faqData, stillQuestionsText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Button Text
            </label>
            <input
              type="text"
              value={faqData.ctaText || ''}
              onChange={(e) => setFaqData({ ...faqData, ctaText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSaveCta}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Bottom Card</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit FAQ Drawer / Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Edit FAQ #{editingFaq.index + 1}
              </h3>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={editingFaq.data.question}
                  onChange={(e) => setEditingFaq({
                    ...editingFaq,
                    data: { ...editingFaq.data, question: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Answer
                </label>
                <textarea
                  rows={4}
                  value={editingFaq.data.answer}
                  onChange={(e) => setEditingFaq({
                    ...editingFaq,
                    data: { ...editingFaq.data, answer: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs leading-relaxed font-medium shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = [...faqList];
                  updated[editingFaq.index] = editingFaq.data;
                  handleSaveFaqs(updated);
                  setEditingFaq(null);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-black uppercase bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
