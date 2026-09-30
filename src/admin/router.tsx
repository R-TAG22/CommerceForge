import React from 'react';
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  isAdminRoute: boolean;
}

const RouterContext = React.createContext<RouterContextType | undefined>(undefined);

const RouterBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const routerNavigate = useNavigate();

  // Normalize path from HashRouter (e.g. '/' or '/about' or '/admin')
  const currentPath = location.pathname || '/';
  const isAdminRoute = currentPath.startsWith('/admin');

  const navigate = React.useCallback(
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
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider (HashRouter)');
  }
  return context;
};
