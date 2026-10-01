import React, { createContext, useContext, useCallback } from 'react';
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';
import { ThemeEditor } from './pages/ThemeEditor';
import { AdminRouter } from './AdminRouter';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isAdminRoute: boolean;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/admin',
  navigate: () => {},
  isAdminRoute: true,
});

const RouterBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const routerNavigate = useNavigate();

  // Normalize path from HashRouter (e.g. '/' or '/about' or '/admin' or '/admin/theme')
  const currentPath = location.pathname || '/';
  const isAdminRoute = currentPath.startsWith('/admin');

  const navigate = useCallback(
    (path: string) => {
      // Normalize target
      const target = path.startsWith('/') ? path : `/${path}`;
      routerNavigate(target);
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [routerNavigate]
  );

  return (
    <RouterContext.Provider value={{ currentPath, navigate, isAdminRoute }}>
      {children}
    </RouterContext.Provider>
  );
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HashRouter>
      <RouterBridge>{children}</RouterBridge>
    </HashRouter>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider (HashRouter)');
  }
  return context;
};

// Re-export ThemeEditor and AdminRouter for unified routing entry
export { AdminRouter, ThemeEditor };

