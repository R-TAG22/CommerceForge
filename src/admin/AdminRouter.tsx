import React from 'react';
import { useRouter } from './router';
import { useCMS } from '../context/CMSContext';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { HomepageEditor } from './pages/HomepageEditor';
import { AboutEditor } from './pages/AboutEditor';
import { WorkEditor } from './pages/WorkEditor';
import { PackagesEditor } from './pages/PackagesEditor';
import { FaqEditor } from './pages/FaqEditor';
import { NavigationEditor } from './pages/NavigationEditor';
import { GlobalContentEditor } from './pages/GlobalContentEditor';
import { MediaLibrary } from './pages/MediaLibrary';
import { SettingsPage } from './pages/SettingsPage';
import { PublishingPage } from './pages/PublishingPage';
import { ThemeEditor } from './pages/ThemeEditor';
import { AdminThemeProvider } from './context/AdminThemeContext';

export const AdminRouter: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { currentUser, isLoading } = useCMS();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0E1520] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#B7E84B] border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/60">Loading CMS...</span>
        </div>
      </div>
    );
  }

  // If not logged in, render login screen
  if (!currentUser || currentPath === '/admin/login') {
    return (
      <AdminThemeProvider>
        <AdminLogin />
      </AdminThemeProvider>
    );
  }

  // Optional full viewport theme customizer
  if (currentPath === '/admin/theme') {
    return (
      <AdminThemeProvider>
        <ThemeEditor onBack={() => navigate('/admin')} />
      </AdminThemeProvider>
    );
  }

  // Render the matching editor within the AdminLayout shell
  const renderCurrentPage = () => {
    switch (currentPath) {
      // 1. Dashboard
      case '/admin':
      case '/admin/dashboard':
        return <DashboardOverview />;

      // 2. Website Pages
      case '/admin/pages/home':
      case '/admin/hero':
      case '/admin/comparison':
      case '/admin/process':
      case '/admin/sections':
        return <HomepageEditor />;

      case '/admin/pages/about':
      case '/admin/brand':
        return <AboutEditor />;

      case '/admin/pages/work':
      case '/admin/portfolio':
        return <WorkEditor />;

      case '/admin/pages/packages':
        return <PackagesEditor />;

      case '/admin/pages/faq':
      case '/admin/faq':
        return <FaqEditor />;

      // 3. Navigation
      case '/admin/navigation':
      case '/admin/header':
        return <NavigationEditor />;

      // 4. Global Content
      case '/admin/global/header':
        return <GlobalContentEditor initialTab="header" />;
      case '/admin/global/footer':
      case '/admin/footer':
        return <GlobalContentEditor initialTab="footer" />;
      case '/admin/global/cta':
      case '/admin/cta':
        return <GlobalContentEditor initialTab="cta" />;
      case '/admin/global/contact':
        return <GlobalContentEditor initialTab="contact" />;

      // 5. Media
      case '/admin/media':
        return <MediaLibrary />;

      // 6. Settings
      case '/admin/settings':
        return <SettingsPage />;

      case '/admin/publishing':
        return <PublishingPage />;

      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminThemeProvider>
      <AdminLayout>{renderCurrentPage()}</AdminLayout>
    </AdminThemeProvider>
  );
};
