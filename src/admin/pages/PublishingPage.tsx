import React, { useState } from 'react';
import { 
  UploadCloud, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Upload, 
  Sparkles, 
  Clock, 
  Layers 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const PublishingPage: React.FC = () => {
  const { 
    hasUnpublishedChanges, 
    publishAll, 
    discardDrafts, 
    resetToDefaults, 
    draftContent, 
    updateDraftContent 
  } = useCMS();
  const { showToast } = useToast();

  const [isPublishing, setIsPublishing] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await publishAll();
      showToast('success', 'Website Published!', 'All draft updates are now visible to live visitors.');
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
      showToast('info', 'Drafts Discarded', 'Reverted draft back to current live website.');
    } catch (err: unknown) {
      showToast('error', 'Revert Failed', err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleReset = async () => {
    try {
      await resetToDefaults();
      setShowResetConfirm(false);
      showToast('info', 'Factory Reset Complete', 'All content restored to original blueprint.');
    } catch (err: unknown) {
      showToast('error', 'Reset Failed', err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draftContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `commerceforge-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('success', 'Backup Exported', 'JSON snapshot downloaded to your computer.');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && typeof json === 'object') {
          await updateDraftContent(json);
          showToast('success', 'Backup Restored', 'CMS loaded imported data into working draft.');
        }
      } catch (err) {
        showToast('error', 'Import Failed', 'Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const lastPublishedFormatted = new Date(draftContent.lastUpdated || Date.now()).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            Publishing &amp; Data
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Publishing &amp; Backups
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            Promote your working draft edits to the live public website or manage full JSON content backups.
          </p>
        </div>
      </div>

      {/* Status Card - Pure White */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all bg-white shadow-sm ${
        hasUnpublishedChanges
          ? 'border-amber-400'
          : 'border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`w-3.5 h-3.5 rounded-full ${
                hasUnpublishedChanges ? 'bg-amber-500 ring-4 ring-amber-500/20 animate-pulse' : 'bg-emerald-500 ring-4 ring-emerald-500/20'
              }`} />
              <h2 className="text-xl font-black text-slate-900">
                Website Status: {hasUnpublishedChanges ? 'Draft Edits Pending' : 'Live & Published'}
              </h2>
            </div>

            <p className="text-xs text-slate-600 flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Last Published: <strong className="text-slate-900">{lastPublishedFormatted}</strong></span>
            </p>

            <p className="text-xs text-slate-500 font-medium">
              {hasUnpublishedChanges
                ? 'You have unpublished changes in your working draft. Visitors will not see them until you click "Publish All Changes".'
                : 'All changes have been successfully published. The public website matches your CMS perfectly.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {hasUnpublishedChanges && (
              <button
                type="button"
                onClick={() => setShowDiscardConfirm(true)}
                className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-xs"
              >
                Discard Drafts
              </button>
            )}

            <button
              type="button"
              disabled={isPublishing || !hasUnpublishedChanges}
              onClick={handlePublish}
              className={`px-7 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-[#0E1B13] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                hasUnpublishedChanges
                  ? 'bg-[#B7E84B] hover:bg-[#a6d93b] hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isPublishing ? 'Publishing...' : 'Publish All Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* JSON Backup & Restore Card - Pure White */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900">
            Website Content Backup &amp; Restore
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Download a portable JSON file containing every text, image URL, project, package, and setting on your website.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Download Backup (.json)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer shadow-xs">
            <Upload className="w-4 h-4 text-blue-600" />
            <span>Restore Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-3">
        <h3 className="text-sm font-black text-rose-700 uppercase tracking-wider">
          Danger Zone
        </h3>
        <p className="text-xs text-slate-600 font-medium">
          Reset all website content back to the original CommerceForge agency defaults.
        </p>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-700 border border-rose-300 bg-white hover:bg-rose-50 cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Defaults</span>
        </button>
      </div>

      {/* Confirm Discard Dialog */}
      <ConfirmDialog
        isOpen={showDiscardConfirm}
        title="Discard Draft Changes?"
        message="Are you sure you want to discard your draft changes? All unpublished edits will be reverted back to the current live website."
        confirmLabel="Yes, Discard Drafts"
        variant="warning"
        onConfirm={handleDiscard}
        onCancel={() => setShowDiscardConfirm(false)}
      />

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset to Factory Defaults?"
        message="This will overwrite all current website copy, projects, packages, and sections with the initial agency template. This action cannot be undone unless you have an exported backup."
        confirmLabel="Yes, Reset Everything"
        variant="danger"
        onConfirm={handleReset}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
