import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Briefcase, 
  Layers, 
  HelpCircle, 
  Compass, 
  UploadCloud, 
  Eye, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../router';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const DashboardOverview: React.FC = () => {
  const { 
    hasUnpublishedChanges, 
    publishAll, 
    discardDrafts, 
    draftContent, 
    setPreviewMode 
  } = useCMS();
  const { navigate } = useRouter();
  const { showToast } = useToast();

  const [isPublishing, setIsPublishing] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await publishAll();
      showToast('success', 'Changes Published!', 'All CMS updates are now live on your website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDiscard = async () => {
    try {
      await discardDrafts();
      setShowDiscardConfirm(false);
      showToast('info', 'Drafts Discarded', 'Reverted draft back to the live website state.');
    } catch (err: unknown) {
      showToast('error', 'Discard Failed', err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const lastPublishedFormatted = new Date(draftContent.lastUpdated || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const quickEditPages = [
    {
      title: 'Homepage',
      description: 'Hero, Client Logos, Comparison Table, 4-Step Process & Bottom CTA',
      path: '/admin/pages/home',
      icon: Home,
    },
    {
      title: 'About',
      description: 'Dev Team Mission, Meet The Team, The Promise & Services',
      path: '/admin/pages/about',
      icon: Users,
    },
    {
      title: 'Work',
      description: 'Portfolio Projects, Case Studies, Speed Scores & Conversion Metrics',
      path: '/admin/pages/work',
      icon: Briefcase,
    },
    {
      title: 'Packages',
      description: 'Productized Rates, Feature Checklists, 50/50 Milestones & Hosting',
      path: '/admin/pages/packages',
      icon: Layers,
    },
    {
      title: 'FAQ',
      description: 'Frequently Asked Questions, Answers & Search Bar',
      path: '/admin/pages/faq',
      icon: HelpCircle,
    },
    {
      title: 'Navigation Menu',
      description: 'Top Navbar Links, Sort Order & Header CTA Button',
      path: '/admin/navigation',
      icon: Compass,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Banner & Status - Pure White Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
              COMMERCEFORGE CMS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Website Overview
            </h1>
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black border ${
              hasUnpublishedChanges
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${
                hasUnpublishedChanges ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
              }`} />
              <span>{hasUnpublishedChanges ? 'Draft Edits In Progress' : 'Published & Live'}</span>
            </div>
          </div>
        </div>

        {/* Status Metrics Line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Website Status
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-base font-black ${hasUnpublishedChanges ? 'text-amber-600' : 'text-emerald-700'}`}>
                ● {hasUnpublishedChanges ? 'Draft Changes Pending' : 'Published'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {hasUnpublishedChanges 
                ? 'You have edits in working draft waiting to be published.'
                : 'The public website matches your CMS perfectly.'}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Last Published
            </span>
            <div className="text-base font-black text-slate-900">
              {lastPublishedFormatted}
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              All public visitors currently see this release.
            </p>
          </div>
        </div>

        {/* Draft Actions Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold">
            {hasUnpublishedChanges ? (
              <span className="text-amber-700 font-bold">
                ⚠️ You have unpublished draft changes
              </span>
            ) : (
              <span className="text-emerald-700 font-bold">
                ✓ Everything is up to date
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {hasUnpublishedChanges && (
              <button
                type="button"
                onClick={() => setShowDiscardConfirm(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-xs"
              >
                Discard Drafts
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setPreviewMode(true);
                window.open('#/', '_blank');
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>Preview Website</span>
            </button>

            <button
              type="button"
              disabled={isPublishing || !hasUnpublishedChanges}
              onClick={handlePublish}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-[#0E1B13] transition-all cursor-pointer shadow-sm ${
                hasUnpublishedChanges
                  ? 'bg-[#B7E84B] hover:bg-[#a6d93b] hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isPublishing ? 'Publishing...' : 'Publish Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK EDIT PAGES - Pure White Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-600 px-1">
            Quick Edit — Choose A Page To Edit
          </h2>
          <span className="text-xs text-slate-500 font-medium">Click any page to begin editing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickEditPages.map((page) => {
            const Icon = page.icon;
            return (
              <button
                key={page.path}
                type="button"
                onClick={() => navigate(page.path)}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all duration-200 hover:shadow-md group flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-[#B7E84B] group-hover:text-[#0E1B13] transition-colors shrink-0 border border-slate-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                      {page.description}
                    </p>
                  </div>
                </div>

                <span className="p-1 rounded-lg text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discard confirmation dialog */}
      <ConfirmDialog
        isOpen={showDiscardConfirm}
        title="Discard Working Draft?"
        message="Are you sure you want to discard your draft changes? Any edits you made since the last publish will be reverted."
        confirmLabel="Yes, Discard Draft"
        variant="warning"
        onConfirm={handleDiscard}
        onCancel={() => setShowDiscardConfirm(false)}
      />
    </div>
  );
};
