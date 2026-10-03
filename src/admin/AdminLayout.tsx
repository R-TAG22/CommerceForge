import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Menu, 
  X, 
  LogOut, 
  ExternalLink, 
  Home, 
  Users, 
  Briefcase, 
  Layers, 
  HelpCircle, 
  Compass, 
  PanelBottom, 
  Megaphone, 
  Mail, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  UploadCloud, 
  Eye, 
  ChevronRight
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useRouter } from './router';
import { useToast } from './components/Toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { 
    currentUser, 
    hasUnpublishedChanges, 
    publishAll, 
    setPreviewMode, 
    logout 
  } = useCMS();
  const { currentPath, navigate } = useRouter();
  const { showToast } = useToast();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Force clean white-card and high-contrast styling on document root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('admin-dark');
      document.documentElement.classList.add('admin-light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, []);

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
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('info', 'Signed Out', 'You have been safely signed out.');
    navigate('/admin/login');
  };

  const navSections = [
    {
      heading: null,
      items: [
        { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      heading: 'Website Pages',
      items: [
        { label: 'Homepage', path: '/admin/pages/home', icon: Home },
        { label: 'About', path: '/admin/pages/about', icon: Users },
        { label: 'Work', path: '/admin/pages/work', icon: Briefcase },
        { label: 'Packages', path: '/admin/pages/packages', icon: Layers },
        { label: 'FAQ', path: '/admin/pages/faq', icon: HelpCircle },
      ],
    },
    {
      heading: 'Navigation',
      items: [
        { label: 'Navigation Menu', path: '/admin/navigation', icon: Compass },
      ],
    },
    {
      heading: 'Global Content',
      items: [
        { label: 'Header', path: '/admin/global/header', icon: Compass },
        { label: 'Footer', path: '/admin/global/footer', icon: PanelBottom },
        { label: 'Buttons / CTAs', path: '/admin/global/cta', icon: Megaphone },
        { label: 'Contact Information', path: '/admin/global/contact', icon: Mail },
      ],
    },
    {
      heading: 'Media',
      items: [
        { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
      ],
    },
    {
      heading: 'Settings',
      items: [
        { label: 'Website Settings', path: '/admin/settings', icon: SettingsIcon },
        { label: 'Publishing', path: '/admin/publishing', icon: UploadCloud },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex antialiased bg-[#F8FAFC] text-slate-900 admin-cms">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation - Pure Crisp White */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r bg-white border-slate-200 text-slate-900 transition-transform duration-200 lg:static lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand / Logo */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B7E84B] flex items-center justify-center text-[#0E1B13] font-black text-sm shadow-xs border border-emerald-600/20">
              CF
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight leading-none text-slate-900">
                COMMERCEFORGE
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase text-emerald-700 mt-0.5">
                ADMIN CMS
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 bg-white">
          {navSections.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.heading && (
                <div className="px-3 pb-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  {group.heading}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path || 
                  (item.path === '/admin' && currentPath === '/admin/dashboard');

                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#B7E84B] text-[#0E1B13] shadow-xs font-black'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0E1B13]' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>

                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-[#0E1B13]" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer with Live Link & Logout */}
        <div className="p-4 border-t border-slate-200 bg-white space-y-2">
          <button
            type="button"
            onClick={() => {
              setPreviewMode(false);
              window.open('#/', '_blank');
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Visit Live Website</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Top Navbar - Pure White Header */}
        <header className="h-16 px-4 sm:px-8 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <span className={`w-2.5 h-2.5 rounded-full ${hasUnpublishedChanges ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'}`} />
              <span className="hidden sm:inline">
                {hasUnpublishedChanges ? 'Unpublished Draft Changes' : 'All Changes Published & Live'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Preview Button */}
            <button
              type="button"
              onClick={() => {
                setPreviewMode(true);
                window.open('#/', '_blank');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            {/* Publish Changes Button */}
            <button
              type="button"
              disabled={isPublishing || !hasUnpublishedChanges}
              onClick={handlePublish}
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-[#0E1B13] transition-all cursor-pointer shadow-xs ${
                hasUnpublishedChanges
                  ? 'bg-[#B7E84B] hover:bg-[#a6d93b] hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{isPublishing ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main id="admin-main-content" className="flex-1 p-4 sm:p-8 overflow-y-auto bg-[#F8FAFC] text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};
