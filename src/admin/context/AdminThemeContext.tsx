import React, { createContext, useContext, useState, useEffect } from 'react';

export type AdminTheme = 'dark' | 'light';

interface AdminThemeContextType {
  theme: AdminTheme;
  isDark: boolean;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'commerceforge_admin_theme';

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export const AdminThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AdminTheme>(() => {
    // Default to clean, high-contrast white card theme
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
      // Ensure dark mode from public website does not bleed into the admin panel
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('admin-dark');
      document.documentElement.classList.add('admin-light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, [theme]);

  const setTheme = (newTheme: AdminTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AdminThemeContext.Provider value={{ theme, isDark: theme === 'dark', setTheme, toggleTheme }}>
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
