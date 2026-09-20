import React, { useState } from 'react';
import {
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Sparkles,
  BarChart3,
  Briefcase,
  Layers,
  ArrowLeftRight,
  GitCommit,
  Building2,
  HelpCircle,
  Megaphone,
  PanelBottom,
  Image as ImageIcon,
  Settings as SettingsIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  RotateCcw,
  UploadCloud,
  Compass,
  Sun,
  Moon,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useAdminTheme } from './context/AdminThemeContext';
import { useRouter } from './router';
import { CommerceForgeLogo } from '../components/CommerceForgeLogo';
import { useToast } from './components/Toast';
import { ConfirmDialog } from './components/ConfirmDialog';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    currentUser,
    hasUnpublishedChanges,
    publishAll,
    discardDrafts,
    isPreviewMode,
    setPreviewMode,
    logout,
  } = useCMS();
  const { currentPath, navigate } = useRouter();
  const { showToast } = useToast();
  const { theme, isDark, toggleTheme } = useAdminTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Protected route check
  if (!currentUser) {
    navigate('/admin/login');
    return null;
  }

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await publishAll();
      showToast('success', 'Published Successfully', 'All CMS changes are now live on the public website.');
      setIsPublishDialogOpen(false);
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDiscard = async () => {
    try {
      await discardDrafts();
      showToast('info', 'Drafts Discarded', 'Reverted all unpublished draft changes back to live website values.');
      setIsDiscardDialogOpen(false);
    } catch (err: unknown) {
      showToast('error', 'Revert Failed', err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('info', 'Signed Out', 'You have been safely signed out.');
    navigate('/admin/login');
  };

  const navGroups = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Website Sections',
      items: [
        { label: 'Header & Navigation', path: '/admin/header', icon: Compass },
        { label: 'Page Sections & Layouts', path: '/admin/sections', icon: Layers },
        { label: 'Hero Section', path: '/admin/hero', icon: Sparkles },
        { label: 'Statistics & Clients', path: '/admin/statistics', icon: BarChart3 },
        { label: 'Portfolio Projects', path: '/admin/portfolio', icon: Briefcase },
        { label: 'Packages & Rates', path: '/admin/packages', icon: Layers },
        { label: 'Why Rebuild / Comparison', path: '/admin/comparison', icon: ArrowLeftRight },
        { label: '4-Step Process', path: '/admin/process', icon: GitCommit },
        { label: 'Brand & Mission', path: '/admin/brand', icon: Building2 },
        { label: 'Frequently Asked Questions', path: '/admin/faq', icon: HelpCircle },
        { label: 'Bottom CTA Banner', path: '/admin/cta', icon: Megaphone },
        { label: 'Footer & Links', path: '/admin/footer', icon: PanelBottom },
      ],
    },
    {
      group: 'Assets & Media',
      items: [
        { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
      ],
    },
    {
      group: 'System',
      items: [
        { label: 'Settings & Firebase', path: '/admin/settings', icon: SettingsIcon },
      ],
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-colors duration-200 ${
      isDark ? 'bg-[#0E1B13] text-white' : 'bg-[#F8FAF9] text-slate-900'
    }`}>
      {/* Top Banner if in Preview Mode */}
      {isPreviewMode && (
        <div className="bg-[#B7E84B] text-[#0F241A] px-4 py-2 text-xs font-bold flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Draft Preview Active — Viewing unpublished working copy</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(false)}
              className="underline hover:text-black cursor-pointer"
            >
              Exit Preview Mode
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-2.5 py-1 rounded bg-[#0F241A] text-white text-[11px] font-black uppercase tracking-wider cursor-pointer"
            >
              View Public Site
            </button>
          </div>
        </div>
      )}

      {/* Main Top Header */}
      <header className={`h-16 px-4 sm:px-6 flex items-center justify-between shrink-0 z-40 sticky top-0 transition-colors border-b ${
        isDark ? 'bg-[#12241A] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo & Brand */}
          <div
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs border border-black/10">
              <CommerceForgeLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <span className={`font-black text-sm tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Commerce<span className="text-[#B7E84B]">Forge</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-[#B7E84B]/20 text-[#B7E84B] border border-[#B7E84B]/30">
                CMS
              </span>
            </div>
          </div>
        </div>

        {/* Status Bar & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status badge */}
          {hasUnpublishedChanges ? (
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unpublished Drafts</span>
              <span className="sm:hidden">Draft</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#B7E84B]/10 border border-[#B7E84B]/30 text-[#B7E84B] text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Changes Live</span>
              <span className="sm:hidden">Live</span>
            </div>
          )}

          {/* Discard changes if dirty */}
          {hasUnpublishedChanges && (
            <button
              onClick={() => setIsDiscardDialogOpen(true)}
              title="Revert draft changes to live"
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Discard</span>
            </button>
          )}

          {/* Live Preview Toggle */}
          <button
            onClick={() => {
              setPreviewMode(true);
              navigate('/');
            }}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'bg-white/10 hover:bg-white/15 text-white border-white/15' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#B7E84B]" />
            <span className="hidden md:inline">Preview</span>
          </button>

          {/* Publish All Button */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all duration-200 shadow-md ${
              hasUnpublishedChanges
                ? 'bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] shadow-[0_0_20px_rgba(183,232,75,0.4)] cursor-pointer ring-2 ring-[#B7E84B]/50'
                : 'bg-[#B7E84B]/80 hover:bg-[#B7E84B] text-[#0F241A] cursor-pointer'
            }`}
            title="Publish all working draft changes directly to the live public website"
          >
            <UploadCloud className={`w-3.5 h-3.5 ${isPublishing ? 'animate-bounce' : ''}`} />
            <span>{isPublishing ? 'Publishing...' : hasUnpublishedChanges ? 'Publish Live' : 'Re-Publish'}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            role="switch"
            aria-checked={!isDark}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-[#B7E84B] border-white/15'
                : 'bg-slate-100 hover:bg-slate-200 text-amber-600 border-slate-300'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User profile dropdown / sign out */}
          <div className={`h-5 w-px mx-0.5 hidden sm:block ${isDark ? 'bg-white/15' : 'bg-slate-300'}`} />

          <div className="flex items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${
              isDark ? 'bg-[#1E3A2B] border-[#B7E84B]/40 text-[#B7E84B]' : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}>
              {currentUser.name.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-white/50 hover:text-red-400 hover:bg-white/5' : 'text-slate-400 hover:text-red-600 hover:bg-slate-100'
              }`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-16 left-0 z-30 w-72 flex flex-col transition-all duration-200 lg:translate-x-0 border-r ${
            isDark ? 'bg-[#102016] border-[#1E3A2B]' : 'bg-white border-slate-200 shadow-sm'
          } ${
            isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {navGroups.map((grp) => (
              <div key={grp.group}>
                <h4 className={`px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2 ${
                  isDark ? 'text-white/40' : 'text-slate-400'
                }`}>
                  {grp.group}
                </h4>
                <div className="space-y-1">
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-150 text-left cursor-pointer ${
                          isActive
                            ? 'bg-[#B7E84B] text-[#0F241A] shadow-md shadow-[#B7E84B]/10 font-black'
                            : isDark
                            ? 'text-white/70 hover:text-white hover:bg-white/5'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0F241A]' : 'text-[#B7E84B]'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className={`p-4 border-t ${isDark ? 'border-[#1E3A2B] bg-[#0C1911]' : 'border-slate-200 bg-slate-50'}`}>
            <button
              onClick={() => navigate('/')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#B7E84B]" />
                <span>Visit Public Site</span>
              </div>
              <span className="text-[10px] opacity-40">/</span>
            </button>
            <div className={`mt-2.5 px-3 flex items-center justify-between text-[10px] font-medium ${
              isDark ? 'text-white/40' : 'text-slate-400'
            }`}>
              <span>Logged in as: {currentUser.name}</span>
              <span className="text-[#B7E84B] font-bold">Theme: {theme}</span>
            </div>
          </div>
        </aside>

        {/* Sidebar Overlay for mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-2xs"
          />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-colors ${
          isDark ? 'bg-[#0A160F]' : 'bg-[#F8FAF9]'
        }`}>
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={isPublishDialogOpen}
        title="Publish All Changes Live"
        message="This will immediately push all your draft content, images, and section changes to the public website. Are you sure?"
        confirmLabel="Publish To Live"
        onConfirm={handlePublish}
        onCancel={() => setIsPublishDialogOpen(false)}
      />

      <ConfirmDialog
        isOpen={isDiscardDialogOpen}
        title="Discard Draft Changes"
        message="Are you sure you want to revert all unpublished working drafts back to the current live published version? Any unsaved edits will be lost."
        confirmLabel="Discard & Revert"
        isDestructive={true}
        onConfirm={handleDiscard}
        onCancel={() => setIsDiscardDialogOpen(false)}
      />
    </div>
  );
};
