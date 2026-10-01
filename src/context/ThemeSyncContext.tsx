import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeConfig {
  primaryColor: string;
  canvasColor: string;
  textColor: string;
  headScripts: string;
  customCss: string;
  useLargeText: boolean;
  forceReducedMotion: boolean;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  primaryColor: '#15803D',
  canvasColor: '#FFFFFF',
  textColor: '#0F172A',
  headScripts: '<!-- Head Tracking / GTM -->\n<script>\n  console.log("Analytics Active");\n</script>',
  customCss: '/* Storefront Global CSS Overrides */\n:root {\n  --accent: #b7e84b;\n}',
  useLargeText: false,
  forceReducedMotion: false,
};

const STORAGE_KEY = 'commerceforge_theme_config';
const STYLE_TAG_ID = 'theme-sync-custom-css';

interface ThemeSyncContextType {
  config: ThemeConfig;
  updateConfig: (updates: Partial<ThemeConfig>) => void;
  resetConfig: () => void;
}

const ThemeSyncContext = createContext<ThemeSyncContextType>({
  config: DEFAULT_THEME_CONFIG,
  updateConfig: () => {},
  resetConfig: () => {},
});

export const useThemeSync = () => useContext(ThemeSyncContext);

export const ThemeSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...DEFAULT_THEME_CONFIG, ...JSON.parse(saved) } : DEFAULT_THEME_CONFIG;
      }
      return DEFAULT_THEME_CONFIG;
    } catch {
      return DEFAULT_THEME_CONFIG;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save theme configuration to localStorage', e);
    }

    // Apply CSS variables to root document
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', config.primaryColor);
    root.style.setProperty('--bg-canvas', config.canvasColor);
    root.style.setProperty('--text-primary', config.textColor);

    // Apply or remove typography scale class
    if (config.useLargeText) {
      root.classList.add('large-text-mode');
    } else {
      root.classList.remove('large-text-mode');
    }

    // Apply or remove reduced motion preference class
    if (config.forceReducedMotion) {
      root.classList.add('reduced-motion-mode');
    } else {
      root.classList.remove('reduced-motion-mode');
    }

    // Inject custom CSS overrides safely into head
    let customStyleTag = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
    if (config.customCss && config.customCss.trim()) {
      if (!customStyleTag) {
        customStyleTag = document.createElement('style');
        customStyleTag.id = STYLE_TAG_ID;
        document.head.appendChild(customStyleTag);
      }
      customStyleTag.textContent = config.customCss;
    } else if (customStyleTag) {
      customStyleTag.remove();
    }

    // Broadcast update via postMessage for preview iframes or cross-window sync
    try {
      window.postMessage({ type: 'COMMERCEFORGE_THEME_UPDATE', config }, '*');
    } catch {
      // Safe no-op
    }
  }, [config]);

  // Listen for external postMessage updates (e.g. from parent customizer or preview frame)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'COMMERCEFORGE_THEME_UPDATE' && event.data.config) {
        setConfig((prev) => ({ ...prev, ...event.data.config }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateConfig = (updates: Partial<ThemeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_THEME_CONFIG);
  };

  return (
    <ThemeSyncContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ThemeSyncContext.Provider>
  );
};
