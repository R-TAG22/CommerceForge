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
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as AdminTheme;
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark'; // Default to studio dark emerald theme
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('admin-dark');
        document.documentElement.classList.remove('admin-light');
      } else {
        document.documentElement.classList.add('admin-light');
        document.documentElement.classList.remove('admin-dark');
      }
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
