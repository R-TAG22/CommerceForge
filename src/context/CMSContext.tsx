import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { WebsiteContent, AdminUser } from '../types/cms';
import { contentService } from '../services/cms/contentService';
import { authService } from '../services/cms/authService';
import { AuthCredentials } from '../services/cms/types';
import { INITIAL_WEBSITE_CONTENT } from '../services/providers/mock/initialData';
import { mockContentProvider } from '../services/providers/mock/mockContentProvider';

interface CMSContextType {
  content: WebsiteContent;
  draftContent: WebsiteContent;
  activeContent: WebsiteContent;
  isLoading: boolean;
  isPreviewMode: boolean;
  hasUnpublishedChanges: boolean;
  currentUser: AdminUser | null;
  refreshContent: () => Promise<void>;
  updateSection: <K extends keyof WebsiteContent>(sectionKey: K, data: WebsiteContent[K]) => Promise<void>;
  updateDraftContent: (partial: Partial<WebsiteContent>) => Promise<void>;
  publishAll: () => Promise<void>;
  publishSection: <K extends keyof WebsiteContent>(sectionKey: K, data?: WebsiteContent[K]) => Promise<void>;
  discardDrafts: () => Promise<void>;
  resetToPublished: () => Promise<void>;
  setPreviewMode: (enabled: boolean) => void;
  setIsPreviewMode: (enabled: boolean) => void;
  login: (credentials: AuthCredentials) => Promise<AdminUser>;
  logout: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContent>(INITIAL_WEBSITE_CONTENT);
  const [draftContent, setDraftContent] = useState<WebsiteContent>(INITIAL_WEBSITE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  const checkIfDirty = useCallback((draft: WebsiteContent, published: WebsiteContent) => {
    return JSON.stringify(draft) !== JSON.stringify(published);
  }, []);

  const refreshContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const [published, draft, user] = await Promise.all([
        contentService.getWebsiteContent(false),
        contentService.getWebsiteContent(true),
        authService.getCurrentUser(),
      ]);
      setContent(published);
      setDraftContent(draft);
      setHasUnpublishedChanges(checkIfDirty(draft, published));
      setCurrentUser(user);
    } catch (e) {
      console.error('Failed to load CMS content:', e);
    } finally {
      setIsLoading(false);
    }
  }, [checkIfDirty]);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const updateSection = async <K extends keyof WebsiteContent>(sectionKey: K, data: WebsiteContent[K]) => {
    const updatedDraftSection = await contentService.updateSection(sectionKey, data);
    setDraftContent((prev) => {
      const next = { ...prev, [sectionKey]: updatedDraftSection, lastUpdated: new Date().toISOString() };
      setHasUnpublishedChanges(checkIfDirty(next, content));
      return next;
    });
  };

  const updateDraftContent = async (partial: Partial<WebsiteContent>) => {
    const updated = await contentService.updateWebsiteContent(partial);
    setDraftContent(updated);
    setHasUnpublishedChanges(checkIfDirty(updated, content));
  };

  const publishAll = async () => {
    const published = await contentService.publishAll();
    setContent(published);
    setDraftContent(published);
    setHasUnpublishedChanges(false);
  };

  const publishSection = async <K extends keyof WebsiteContent>(sectionKey: K, data?: WebsiteContent[K]) => {
    if (data) {
      await contentService.updateSection(sectionKey, data);
    }
    const published = await contentService.publishAll();
    setContent(published);
    setDraftContent(published);
    setHasUnpublishedChanges(false);
  };

  const discardDrafts = async () => {
    const reverted = await contentService.discardDrafts();
    setDraftContent(reverted);
    setHasUnpublishedChanges(false);
  };

  const setPreviewMode = (enabled: boolean) => {
    setIsPreviewMode(enabled);
  };

  const login = async (credentials: AuthCredentials): Promise<AdminUser> => {
    const user = await authService.login(credentials);
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const resetToDefaults = async () => {
    const reset = await mockContentProvider.resetToDefaults();
    setContent(reset);
    setDraftContent(reset);
    setHasUnpublishedChanges(false);
  };

  // The active content shown on the public site:
  // If previewMode is true, use draftContent; otherwise use published content
  const activeContent = isPreviewMode ? draftContent : content;

  return (
    <CMSContext.Provider
      value={{
        content: activeContent,
        draftContent,
        activeContent,
        isLoading,
        isPreviewMode,
        hasUnpublishedChanges,
        currentUser,
        refreshContent,
        updateSection,
        updateDraftContent,
        publishAll,
        publishSection,
        discardDrafts,
        resetToPublished: discardDrafts,
        setPreviewMode,
        setIsPreviewMode: setPreviewMode,
        login,
        logout,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
