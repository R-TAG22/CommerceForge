import React, { createContext, useContext, useEffect } from 'react';

export type AdminTheme = 'light';

interface AdminThemeContextType {
  theme: AdminTheme;
  isDark: boolean;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'commerceforge_admin_theme';

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export const AdminThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(THEME_STORAGE_KEY);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('admin-dark');
      document.documentElement.classList.add('admin-light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, []);

  const setTheme = () => {};
  const toggleTheme = () => {};

  return (
    <AdminThemeContext.Provider value={{ theme: 'light', isDark: false, setTheme, toggleTheme }}>
      {children}
    </AdminThemeContext.Provider>
  );
};

export const useAdminTheme = () => {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error('useAdminTheme must be used within an AdminThemeProvider');
  }
  return context;
};
