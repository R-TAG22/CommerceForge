import React, { useState } from 'react';
import {
  Settings,
  Database,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { initialWebsiteData } from '../../services/providers/mock/initialData';

export const SettingsPage: React.FC = () => {
  const { draftContent, updateSection, resetToPublished } = useCMS();
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
        // Save section by section
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
    const text = `FIREBASE CONNECTION CHECKLIST
1. Create a project at https://console.firebase.google.com
2. Enable Cloud Firestore in Production/Test mode
3. Enable Firebase Authentication (Email/Password provider)
4. Add your web credentials into src/services/providers/firebase/firebaseConfig.ts
5. Implement IContentService, IAuthService in src/services/providers/firebase/
6. Swap mock providers with Firebase providers in src/services/cms/contentService.ts`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    showToast('info', 'Copied Checklist', 'Checklist copied to clipboard.');
    setTimeout(() => setCopiedChecklist(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <Settings className="w-4 h-4" />
            <span>Infrastructure & Handoff</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">System Settings & Firebase</h1>
          <p className="text-xs text-white/60">
            Export backups, manage storage providers, and review your Firebase integration checklist
          </p>
        </div>
      </div>

      {/* Provider Architecture Banner */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-[#B7E84B]/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EAF3E8]/10 text-[#B7E84B]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Current Storage Adapter: Mock / LocalStorage Layer
              </h2>
              <p className="text-xs text-white/60">
                Data persists in your browser localStorage without requiring external API keys.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#B7E84B] text-[#0F241A] text-[10px] font-black uppercase">
            Active Provider
          </span>
        </div>
      </div>

      {/* Firebase Handoff Checklist */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold uppercase tracking-wider text-white">
                Firebase Connection Checklist
              </h2>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white/80">
                Self-Service Setup
              </span>
            </div>
            <p className="text-xs text-white/60 mt-1">
              Follow these exact steps when you are ready to connect your own Firebase Firestore & Auth project:
            </p>
          </div>

          <button
            type="button"
            onClick={copyToChecklist}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            {copiedChecklist ? <Check className="w-3.5 h-3.5 text-[#B7E84B]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedChecklist ? 'Copied' : 'Copy Checklist'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#162C20] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B7E84B] uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-[#B7E84B]/20 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Create Firebase Project</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Visit <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-[#B7E84B] underline">console.firebase.google.com</a> and click "Create a project". Choose your preferred project name and analytics settings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#162C20] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B7E84B] uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-[#B7E84B]/20 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Enable Cloud Firestore</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              In Firebase Console navigate to <strong>Build &gt; Firestore Database</strong>. Click "Create database" and choose your primary region. Collections: <code className="text-[#B7E84B]">website_content</code>, <code className="text-[#B7E84B]">media_assets</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#162C20] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B7E84B] uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-[#B7E84B]/20 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Enable Firebase Authentication</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              In Firebase Console navigate to <strong>Build &gt; Authentication</strong>. Click "Get Started", select "Email/Password" and enable it. Create your admin user under the "Users" tab.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#162C20] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B7E84B] uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-[#B7E84B]/20 flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Plug Credentials into Adapter</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Open the pre-built template in <code className="text-[#B7E84B]">src/services/providers/firebase/</code>. Replace placeholder credentials with your real keys.
            </p>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-white/60">
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
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B7E84B] hover:underline"
            >
              {copiedSnippet ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSnippet ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-[#8FA98F] overflow-x-auto p-2 leading-relaxed">
            {firebaseSnippet}
          </pre>
        </div>
      </div>

      {/* Backup, Export & Reset */}
      <div className="p-6 rounded-2xl bg-[#12241A] border border-white/10 space-y-6">
        <h2 className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
          Backup, Export & Maintenance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Export */}
          <div className="p-4 rounded-xl bg-[#162C20] border border-white/5 space-y-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#B7E84B]" />
              <span>Export Content JSON</span>
            </h3>
            <p className="text-xs text-white/60">
              Download your full website content as a structured JSON file.
            </p>
            <button
              type="button"
              onClick={handleExportJSON}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Download Backup
            </button>
          </div>

          {/* Import */}
          <div className="p-4 rounded-xl bg-[#162C20] border border-white/5 space-y-3">
            <h3 className="text-xs font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-[#B7E84B]" />
              <span>Import Content JSON</span>
            </h3>
            <p className="text-xs text-white/60">
              Upload a previous JSON backup to restore all sections.
            </p>
            <label className="block w-full text-center py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer">
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
          <div className="p-4 rounded-xl bg-[#162C20] border border-white/5 space-y-3">
            <h3 className="text-xs font-bold uppercase text-red-400 tracking-wider flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-red-400" />
              <span>Reset to Defaults</span>
            </h3>
            <p className="text-xs text-white/60">
              Clear local working storage and restore original website content.
            </p>
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Reset Storage
            </button>
          </div>
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
