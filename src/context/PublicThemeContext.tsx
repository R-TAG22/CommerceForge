import React, { createContext, useContext, useEffect } from 'react';

export type PublicTheme = 'light';

interface PublicThemeContextType {
  theme: PublicTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: PublicTheme) => void;
}

const THEME_STORAGE_KEY = 'commerceforge_public_theme';

const PublicThemeContext = createContext<PublicThemeContextType | undefined>(undefined);

export const PublicThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(THEME_STORAGE_KEY);
      localStorage.removeItem('commerceforge_theme_config');
      const root = document.documentElement;
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
      document.body.style.backgroundColor = 'var(--bg-canvas, #FAFAF9)';
      document.body.style.color = 'var(--text-primary, #0F241A)';
    }
  }, []);

  const setTheme = () => {};
  const toggleTheme = () => {};

  return (
    <PublicThemeContext.Provider value={{ theme: 'light', isDark: false, toggleTheme, setTheme }}>
      {children}
    </PublicThemeContext.Provider>
  );
};

export const usePublicTheme = () => {
  const context = useContext(PublicThemeContext);
  if (!context) {
    throw new Error('usePublicTheme must be used within a PublicThemeProvider');
  }
  return context;
};
