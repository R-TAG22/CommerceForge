import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isAdminRoute: boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function getCleanPath(): string {
  if (typeof window === 'undefined') return '/';
  
  // Check hash first (e.g. #/admin/portfolio or #/about)
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return window.location.hash.slice(1);
  }

  // Then check pathname
  const pathname = window.location.pathname;
  if (pathname.includes('/admin')) {
    const adminIndex = pathname.indexOf('/admin');
    return pathname.slice(adminIndex);
  }

  if (pathname && pathname !== '/') {
    const clean = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    return clean;
  }

  return '/';
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(getCleanPath());

  const handleLocationChange = useCallback(() => {
    setCurrentPath(getCleanPath());
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [handleLocationChange]);

  const navigate = useCallback((path: string) => {
    // Normalise
    const target = path.startsWith('/') ? path : `/${path}`;
    try {
      window.history.pushState({}, '', target.startsWith('/admin') ? `#${target}` : target);
    } catch {
      window.location.hash = target;
    }
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <RouterContext.Provider value={{ currentPath, navigate, isAdminRoute }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
