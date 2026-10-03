import React, { useState } from 'react';
import {
  Settings,
  Database,
  Download,
  Upload,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const SettingsPage: React.FC = () => {
  const { draftContent, updateSection } = useCMS();
  const { showToast } = useToast();

  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draftContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `commerceforge-cms-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('success', 'Export Complete', 'Downloaded CMS content backup JSON file.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.header || !parsed.hero || !parsed.portfolio) {
          throw new Error('Invalid CommerceForge schema');
        }
        for (const [key, val] of Object.entries(parsed)) {
          if (key !== 'lastUpdated' && key !== 'publishedAt') {
            await updateSection(key as any, val as any);
          }
        }
        showToast('success', 'Import Successful', 'Imported CMS content successfully.');
        window.location.reload();
      } catch (err: unknown) {
        showToast('error', 'Import Failed', err instanceof Error ? err.message : 'Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToFactory = async () => {
    try {
      localStorage.removeItem('commerceforge_cms_draft_v1');
      localStorage.removeItem('commerceforge_cms_published_v1');
      showToast('info', 'Reset Complete', 'Restored original initial website content.');
      setTimeout(() => window.location.reload(), 800);
    } catch (err: unknown) {
      showToast('error', 'Reset Failed', err instanceof Error ? err.message : 'Reset failed');
    }
  };

  const firebaseSnippet = `// src/services/providers/firebase/firebaseConfig.ts
// Replace with your real Firebase Web App configuration:
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);`;

  const copyToChecklist = () => {
    const text = `Firebase Setup Checklist:
1. Create Firebase project at console.firebase.google.com
2. Enable Cloud Firestore in Production/Test mode
3. Enable Email/Password Auth under Authentication
4. Enter credentials in src/services/providers/firebase/firebaseConfig.ts`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    showToast('info', 'Checklist Copied', 'Checklist copied to clipboard.');
    setTimeout(() => setCopiedChecklist(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Infrastructure &amp; Backups</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            System Settings &amp; Data
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Export JSON backups, manage storage adapters, and review production deployment notes.
          </p>
        </div>
      </div>

      {/* Storage Adapter Card - Pure White */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Current Storage Provider: LocalStorage Persistence Layer
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                All changes persist instantly in your browser storage without requiring external API keys.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase border border-emerald-200">
              Active Provider
            </span>
          </div>
        </div>
      </div>

      {/* Backup, Export & Reset - Pure White Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
            Backup, Export &amp; Reset
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Download your CMS content as JSON or restore original defaults at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Export */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Export Content JSON</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Download your full website content as a structured JSON file.
            </p>
            <button
              type="button"
              onClick={handleExportJSON}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
            >
              Download Backup
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-700" />
              <span>Import Content JSON</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Upload a previous JSON backup to restore all sections.
            </p>
            <label className="block w-full text-center py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs">
              Choose File
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
            <h3 className="text-xs font-black uppercase text-rose-800 tracking-wider flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-600" />
              <span>Reset to Defaults</span>
            </h3>
            <p className="text-xs text-rose-700 font-medium leading-relaxed">
              Clear local working storage and restore original website content.
            </p>
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              Reset Storage
            </button>
          </div>
        </div>
      </div>

      {/* Optional Firebase Checklist - Pure White Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black uppercase tracking-wider text-slate-900">
                Firebase Firestore Integration
              </h2>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200">
                Optional Backend
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Follow these steps when you are ready to connect a cloud Firebase Firestore &amp; Auth database:
            </p>
          </div>

          <button
            type="button"
            onClick={copyToChecklist}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer border border-slate-200 shadow-2xs"
          >
            {copiedChecklist ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedChecklist ? 'Copied' : 'Copy Checklist'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-800 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Create Firebase Project</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Visit <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-semibold">console.firebase.google.com</a> and click "Create a project".
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-800 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Enable Cloud Firestore</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Navigate to <strong>Build &gt; Firestore Database</strong>. Collections: <code className="text-emerald-800 font-mono">website_content</code>, <code className="text-emerald-800 font-mono">media_assets</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-800 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Enable Firebase Authentication</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Navigate to <strong>Build &gt; Authentication</strong>. Enable "Email/Password" and add your authorized dev credentials.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-800 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Configure Firebase Adapter</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Fill in credentials inside <code className="text-emerald-800 font-mono">src/services/providers/firebase/firebaseConfig.ts</code>.
            </p>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-300">
              Template: src/services/providers/firebase/firebaseConfig.ts
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(firebaseSnippet);
                setCopiedSnippet(true);
                showToast('info', 'Copied', 'Config snippet copied.');
                setTimeout(() => setCopiedSnippet(false), 2000);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B7E84B] hover:underline cursor-pointer"
            >
              {copiedSnippet ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSnippet ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-emerald-300 overflow-x-auto p-2 leading-relaxed">
            {firebaseSnippet}
          </pre>
        </div>
      </div>

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Reset All CMS Content?"
        message="This will clear your local draft and restore the original initial website copy. Are you sure you want to proceed?"
        confirmLabel="Reset Everything"
        isDestructive={true}
        onConfirm={handleResetToFactory}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
