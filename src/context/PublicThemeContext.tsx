import React, { createContext, useContext, useState, useEffect } from 'react';

export type PublicTheme = 'light' | 'dark';

interface PublicThemeContextType {
  theme: PublicTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: PublicTheme) => void;
}

const THEME_STORAGE_KEY = 'commerceforge_public_theme';

const PublicThemeContext = createContext<PublicThemeContextType | undefined>(undefined);

export const PublicThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<PublicTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as PublicTheme;
      if (saved === 'light' || saved === 'dark') return saved;
      // Also check system preference if no previous selection
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light'; // Default to light mode (#FAFAF9) as specified
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        document.body.style.backgroundColor = '#0B0F17';
        document.body.style.color = '#F3F4F6';
      } else {
        root.classList.remove('dark');
        document.body.style.backgroundColor = '#FAFAF9';
        document.body.style.color = '#064E3B';
      }
    }
  }, [theme]);

  const setTheme = (newTheme: PublicTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <PublicThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setTheme }}>
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
