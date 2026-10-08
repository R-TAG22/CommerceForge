import React, { createContext, useContext, useEffect } from 'react';

export type PublicTheme = 'light';

interface PublicThemeContextType {
  theme: PublicTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: PublicTheme) => void;
}

const THEME_STORAGE_KEY = 'commerceforge_public_theme';

const PublicThemeContext = createContext<PublicThemeContextType>({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const PublicThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Permanently enforce light theme across the entire site
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
      const root = document.documentElement;
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#F8FAF8';
      document.body.style.color = '#1E3A2B';
    }
  }, []);

  return (
    <PublicThemeContext.Provider
      value={{
        theme: 'light',
        isDark: false,
        toggleTheme: () => {},
        setTheme: () => {},
      }}
    >
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

