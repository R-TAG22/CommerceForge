import {
  WebsiteContent,
  PortfolioProject,
  PricingPackage,
  ProcessStepItem,
  FAQItem,
  MediaAsset,
  AdminUser,
} from '../../types/cms';

export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AdminUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AdminUser | null>;
  sendPasswordResetEmail(email: string): Promise<void>;
}

export interface IContentService {
  getWebsiteContent(previewDraft?: boolean): Promise<WebsiteContent>;
  updateWebsiteContent(content: Partial<WebsiteContent>): Promise<WebsiteContent>;
  getSection<K extends keyof WebsiteContent>(sectionKey: K, previewDraft?: boolean): Promise<WebsiteContent[K]>;
  updateSection<K extends keyof WebsiteContent>(sectionKey: K, data: WebsiteContent[K]): Promise<WebsiteContent[K]>;
  publishAll(): Promise<WebsiteContent>;
  discardDrafts(): Promise<WebsiteContent>;
}

export interface IPortfolioService {
  getPortfolioProjects(includeDrafts?: boolean): Promise<PortfolioProject[]>;
  createPortfolioProject(project: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<PortfolioProject>;
  updatePortfolioProject(id: string, project: Partial<PortfolioProject>): Promise<PortfolioProject>;
  deletePortfolioProject(id: string): Promise<void>;
  duplicatePortfolioProject(id: string): Promise<PortfolioProject>;
  reorderPortfolioProjects(orderedIds: string[]): Promise<PortfolioProject[]>;
}

export interface IPackageService {
  getPackages(includeDrafts?: boolean): Promise<PricingPackage[]>;
  createPackage(pkg: Omit<PricingPackage, 'id' | 'createdAt' | 'updatedAt'>): Promise<PricingPackage>;
  updatePackage(id: string, pkg: Partial<PricingPackage>): Promise<PricingPackage>;
  deletePackage(id: string): Promise<void>;
  duplicatePackage(id: string): Promise<PricingPackage>;
  reorderPackages(orderedIds: string[]): Promise<PricingPackage[]>;
}

export interface IProcessService {
  getProcessSteps(): Promise<ProcessStepItem[]>;
  createProcessStep(step: Omit<ProcessStepItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProcessStepItem>;
  updateProcessStep(id: string, step: Partial<ProcessStepItem>): Promise<ProcessStepItem>;
  deleteProcessStep(id: string): Promise<void>;
  reorderProcessSteps(orderedIds: string[]): Promise<ProcessStepItem[]>;
}

export interface IFAQService {
  getFAQs(includeDrafts?: boolean): Promise<FAQItem[]>;
  createFAQ(faq: Omit<FAQItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQItem>;
  updateFAQ(id: string, faq: Partial<FAQItem>): Promise<FAQItem>;
  deleteFAQ(id: string): Promise<void>;
  reorderFAQs(orderedIds: string[]): Promise<FAQItem[]>;
}

export interface IMediaService {
  getMedia(): Promise<MediaAsset[]>;
  uploadMedia(file: File, metadata?: { altText?: string }): Promise<MediaAsset>;
  updateMediaAltText?(id: string, altText: string): Promise<MediaAsset>;
  deleteMedia(id: string): Promise<void>;
}
