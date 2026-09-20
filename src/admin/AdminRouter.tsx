import React from 'react';
import { useRouter } from './router';
import { useCMS } from '../context/CMSContext';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { HeaderEditor } from './pages/HeaderEditor';
import { HeroEditor } from './pages/HeroEditor';
import { StatisticsEditor } from './pages/StatisticsEditor';
import { PortfolioEditor } from './pages/PortfolioEditor';
import { PackagesEditor } from './pages/PackagesEditor';
import { ComparisonEditor } from './pages/ComparisonEditor';
import { ProcessEditor } from './pages/ProcessEditor';
import { BrandEditor } from './pages/BrandEditor';
import { FaqEditor } from './pages/FaqEditor';
import { CtaEditor } from './pages/CtaEditor';
import { FooterEditor } from './pages/FooterEditor';
import { MediaLibrary } from './pages/MediaLibrary';
import { SettingsPage } from './pages/SettingsPage';
import { SectionsEditor } from './pages/SectionsEditor';
import { AdminThemeProvider } from './context/AdminThemeContext';

export const AdminRouter: React.FC = () => {
  const { currentPath } = useRouter();
  const { currentUser, isLoading } = useCMS();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0E1B13] flex items-center justify-center text-white">
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

  // Render the matching editor within the AdminLayout shell
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/admin':
      case '/admin/dashboard':
        return <DashboardOverview />;
      case '/admin/header':
        return <HeaderEditor />;
      case '/admin/sections':
        return <SectionsEditor />;
      case '/admin/hero':
        return <HeroEditor />;
      case '/admin/statistics':
        return <StatisticsEditor />;
      case '/admin/portfolio':
        return <PortfolioEditor />;
      case '/admin/packages':
        return <PackagesEditor />;
      case '/admin/comparison':
        return <ComparisonEditor />;
      case '/admin/process':
        return <ProcessEditor />;
      case '/admin/brand':
        return <BrandEditor />;
      case '/admin/faq':
        return <FaqEditor />;
      case '/admin/cta':
        return <CtaEditor />;
      case '/admin/footer':
        return <FooterEditor />;
      case '/admin/media':
        return <MediaLibrary />;
      case '/admin/settings':
        return <SettingsPage />;
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
