import {
  WebsiteContent,
  PortfolioProject,
  PricingPackage,
  ProcessStepItem,
  FAQItem,
} from '../../../types/cms';
import {
  IContentService,
  IPortfolioService,
  IPackageService,
  IProcessService,
  IFAQService,
} from '../../cms/types';
import { INITIAL_WEBSITE_CONTENT } from './initialData';

const DRAFT_STORAGE_KEY = 'commerceforge_cms_draft_v4';
const PUBLISHED_STORAGE_KEY = 'commerceforge_cms_published_v4';

export class MockContentProvider implements IContentService, IPortfolioService, IPackageService, IProcessService, IFAQService {
  private draftContent: WebsiteContent;
  private publishedContent: WebsiteContent;

  constructor() {
    this.publishedContent = this.loadFromStorage(PUBLISHED_STORAGE_KEY) || JSON.parse(JSON.stringify(INITIAL_WEBSITE_CONTENT));
    this.draftContent = this.loadFromStorage(DRAFT_STORAGE_KEY) || JSON.parse(JSON.stringify(this.publishedContent));
  }

  private loadFromStorage(key: string): WebsiteContent | null {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_WEBSITE_CONTENT,
        ...parsed,
        header: { ...INITIAL_WEBSITE_CONTENT.header, ...(parsed.header || {}) },
        hero: { ...INITIAL_WEBSITE_CONTENT.hero, ...(parsed.hero || {}) },
        statistics: { ...INITIAL_WEBSITE_CONTENT.statistics, ...(parsed.statistics || {}) },
        portfolio: Array.isArray(parsed.portfolio) && parsed.portfolio.length > 0 ? parsed.portfolio : INITIAL_WEBSITE_CONTENT.portfolio,
        packages: { ...INITIAL_WEBSITE_CONTENT.packages, ...(parsed.packages || {}) },
        comparison: { ...INITIAL_WEBSITE_CONTENT.comparison, ...(parsed.comparison || {}) },
        process: { ...INITIAL_WEBSITE_CONTENT.process, ...(parsed.process || {}) },
        brand: { ...INITIAL_WEBSITE_CONTENT.brand, ...(parsed.brand || {}) },
        faq: { ...INITIAL_WEBSITE_CONTENT.faq, ...(parsed.faq || {}) },
        cta: { ...INITIAL_WEBSITE_CONTENT.cta, ...(parsed.cta || {}) },
        footer: { ...INITIAL_WEBSITE_CONTENT.footer, ...(parsed.footer || {}) },
        customSections: Array.isArray(parsed.customSections) ? parsed.customSections : INITIAL_WEBSITE_CONTENT.customSections,
      };
    } catch {
      return null;
    }
  }

  private persist(isDraft: boolean = true) {
    if (typeof window === 'undefined') return;
    try {
      if (isDraft) {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(this.draftContent));
      } else {
        localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(this.publishedContent));
      }
    } catch (e) {
      console.warn('Mock storage write failed:', e);
    }
  }

  // --- IContentService ---

  async getWebsiteContent(previewDraft: boolean = false): Promise<WebsiteContent> {
    const source = previewDraft ? this.draftContent : this.publishedContent;
    return JSON.parse(JSON.stringify(source));
  }

  async updateWebsiteContent(content: Partial<WebsiteContent>): Promise<WebsiteContent> {
    this.draftContent = {
      ...this.draftContent,
      ...content,
      lastUpdated: new Date().toISOString(),
    };
    this.persist(true);
    return JSON.parse(JSON.stringify(this.draftContent));
  }

  async getSection<K extends keyof WebsiteContent>(sectionKey: K, previewDraft: boolean = false): Promise<WebsiteContent[K]> {
    const source = previewDraft ? this.draftContent : this.publishedContent;
    return JSON.parse(JSON.stringify(source[sectionKey]));
  }

  async updateSection<K extends keyof WebsiteContent>(sectionKey: K, data: WebsiteContent[K]): Promise<WebsiteContent[K]> {
    this.draftContent[sectionKey] = JSON.parse(JSON.stringify(data));
    this.draftContent.lastUpdated = new Date().toISOString();
    this.persist(true);
    return JSON.parse(JSON.stringify(this.draftContent[sectionKey]));
  }

  async publishAll(): Promise<WebsiteContent> {
    this.publishedContent = JSON.parse(JSON.stringify(this.draftContent));
    this.publishedContent.version = (this.publishedContent.version || 1) + 1;
    this.publishedContent.lastUpdated = new Date().toISOString();
    this.draftContent = JSON.parse(JSON.stringify(this.publishedContent));
    this.persist(false);
    this.persist(true);
    return JSON.parse(JSON.stringify(this.publishedContent));
  }

  async discardDrafts(): Promise<WebsiteContent> {
    this.draftContent = JSON.parse(JSON.stringify(this.publishedContent));
    this.persist(true);
    return JSON.parse(JSON.stringify(this.draftContent));
  }

  async resetToDefaults(): Promise<WebsiteContent> {
    this.publishedContent = JSON.parse(JSON.stringify(INITIAL_WEBSITE_CONTENT));
    this.draftContent = JSON.parse(JSON.stringify(INITIAL_WEBSITE_CONTENT));
    this.persist(false);
    this.persist(true);
    return JSON.parse(JSON.stringify(this.publishedContent));
  }

  // --- IPortfolioService ---

  async getPortfolioProjects(includeDrafts: boolean = false): Promise<PortfolioProject[]> {
    const source = includeDrafts ? this.draftContent.portfolio : this.publishedContent.portfolio;
    return JSON.parse(JSON.stringify(source)).sort((a: PortfolioProject, b: PortfolioProject) => a.sortOrder - b.sortOrder);
  }

  async createPortfolioProject(project: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<PortfolioProject> {
    const newProject: PortfolioProject = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sortOrder: this.draftContent.portfolio.length,
    };
    this.draftContent.portfolio.push(newProject);
    this.persist(true);
    return JSON.parse(JSON.stringify(newProject));
  }

  async updatePortfolioProject(id: string, project: Partial<PortfolioProject>): Promise<PortfolioProject> {
    const index = this.draftContent.portfolio.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Portfolio project ${id} not found`);
    this.draftContent.portfolio[index] = {
      ...this.draftContent.portfolio[index],
      ...project,
      updatedAt: new Date().toISOString(),
    };
    this.persist(true);
    return JSON.parse(JSON.stringify(this.draftContent.portfolio[index]));
  }

  async deletePortfolioProject(id: string): Promise<void> {
    this.draftContent.portfolio = this.draftContent.portfolio.filter((p) => p.id !== id);
    this.persist(true);
  }

  async duplicatePortfolioProject(id: string): Promise<PortfolioProject> {
    const existing = this.draftContent.portfolio.find((p) => p.id === id);
    if (!existing) throw new Error(`Project ${id} not found`);
    const copy: PortfolioProject = {
      ...JSON.parse(JSON.stringify(existing)),
      id: `project-${Date.now()}`,
      title: `${existing.title} (Copy)`,
      sortOrder: this.draftContent.portfolio.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.draftContent.portfolio.push(copy);
    this.persist(true);
    return JSON.parse(JSON.stringify(copy));
  }

  async reorderPortfolioProjects(orderedIds: string[]): Promise<PortfolioProject[]> {
    const map = new Map(this.draftContent.portfolio.map((p) => [p.id, p]));
    const reordered: PortfolioProject[] = [];
    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.sortOrder = idx;
        reordered.push(item);
      }
    });
    this.draftContent.portfolio = reordered;
    this.persist(true);
    return JSON.parse(JSON.stringify(reordered));
  }

  // --- IPackageService ---

  async getPackages(includeDrafts: boolean = false): Promise<PricingPackage[]> {
    const source = includeDrafts ? this.draftContent.packages.packages : this.publishedContent.packages.packages;
    return JSON.parse(JSON.stringify(source)).sort((a: PricingPackage, b: PricingPackage) => a.sortOrder - b.sortOrder);
  }

  async createPackage(pkg: Omit<PricingPackage, 'id' | 'createdAt' | 'updatedAt'>): Promise<PricingPackage> {
    const newPkg: PricingPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sortOrder: this.draftContent.packages.packages.length,
    };
    this.draftContent.packages.packages.push(newPkg);
    this.persist(true);
    return JSON.parse(JSON.stringify(newPkg));
  }

  async updatePackage(id: string, pkg: Partial<PricingPackage>): Promise<PricingPackage> {
    const index = this.draftContent.packages.packages.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Package ${id} not found`);
    this.draftContent.packages.packages[index] = {
      ...this.draftContent.packages.packages[index],
      ...pkg,
      updatedAt: new Date().toISOString(),
    };
    this.persist(true);
    return JSON.parse(JSON.stringify(this.draftContent.packages.packages[index]));
  }

  async deletePackage(id: string): Promise<void> {
    this.draftContent.packages.packages = this.draftContent.packages.packages.filter((p) => p.id !== id);
    this.persist(true);
  }

  async duplicatePackage(id: string): Promise<PricingPackage> {
    const existing = this.draftContent.packages.packages.find((p) => p.id === id);
    if (!existing) throw new Error(`Package ${id} not found`);
    const copy: PricingPackage = {
      ...JSON.parse(JSON.stringify(existing)),
      id: `pkg-${Date.now()}`,
      name: `${existing.name} (Copy)`,
      sortOrder: this.draftContent.packages.packages.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.draftContent.packages.packages.push(copy);
    this.persist(true);
    return JSON.parse(JSON.stringify(copy));
  }

  async reorderPackages(orderedIds: string[]): Promise<PricingPackage[]> {
    const map = new Map(this.draftContent.packages.packages.map((p) => [p.id, p]));
    const reordered: PricingPackage[] = [];
    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.sortOrder = idx;
        reordered.push(item);
      }
    });
    this.draftContent.packages.packages = reordered;
    this.persist(true);
    return JSON.parse(JSON.stringify(reordered));
  }

  // --- IProcessService ---

  async getProcessSteps(): Promise<ProcessStepItem[]> {
    return JSON.parse(JSON.stringify(this.draftContent.process.steps)).sort(
      (a: ProcessStepItem, b: ProcessStepItem) => a.sortOrder - b.sortOrder
    );
  }

  async createProcessStep(step: Omit<ProcessStepItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProcessStepItem> {
    const newStep: ProcessStepItem = {
      ...step,
      id: `step-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sortOrder: this.draftContent.process.steps.length,
    };
    this.draftContent.process.steps.push(newStep);
    this.persist(true);
    return JSON.parse(JSON.stringify(newStep));
  }

  async updateProcessStep(id: string, step: Partial<ProcessStepItem>): Promise<ProcessStepItem> {
    const index = this.draftContent.process.steps.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Process step ${id} not found`);
    this.draftContent.process.steps[index] = {
      ...this.draftContent.process.steps[index],
      ...step,
      updatedAt: new Date().toISOString(),
    };
    this.persist(true);
    return JSON.parse(JSON.stringify(this.draftContent.process.steps[index]));
  }

  async deleteProcessStep(id: string): Promise<void> {
    this.draftContent.process.steps = this.draftContent.process.steps.filter((s) => s.id !== id);
    this.persist(true);
  }

  async reorderProcessSteps(orderedIds: string[]): Promise<ProcessStepItem[]> {
    const map = new Map(this.draftContent.process.steps.map((s) => [s.id, s]));
    const reordered: ProcessStepItem[] = [];
    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.sortOrder = idx;
        reordered.push(item);
      }
    });
    this.draftContent.process.steps = reordered;
    this.persist(true);
    return JSON.parse(JSON.stringify(reordered));
  }

  // --- IFAQService ---

  async getFAQs(includeDrafts: boolean = false): Promise<FAQItem[]> {
    const source = includeDrafts ? this.draftContent.faq.faqs : this.publishedContent.faq.faqs;
    return JSON.parse(JSON.stringify(source)).sort((a: FAQItem, b: FAQItem) => a.sortOrder - b.sortOrder);
  }

  async createFAQ(faq: Omit<FAQItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQItem> {
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sortOrder: this.draftContent.faq.faqs.length,
    };
    this.draftContent.faq.faqs.push(newFaq);
    this.persist(true);
    return JSON.parse(JSON.stringify(newFaq));
  }

  async updateFAQ(id: string, faq: Partial<FAQItem>): Promise<FAQItem> {
    const index = this.draftContent.faq.faqs.findIndex((f) => f.id === id);
    if (index === -1) throw new Error(`FAQ ${id} not found`);
    this.draftContent.faq.faqs[index] = {
      ...this.draftContent.faq.faqs[index],
      ...faq,
      updatedAt: new Date().toISOString(),
    };
    this.persist(true);
    return JSON.parse(JSON.stringify(this.draftContent.faq.faqs[index]));
  }

  async deleteFAQ(id: string): Promise<void> {
    this.draftContent.faq.faqs = this.draftContent.faq.faqs.filter((f) => f.id !== id);
    this.persist(true);
  }

  async reorderFAQs(orderedIds: string[]): Promise<FAQItem[]> {
    const map = new Map(this.draftContent.faq.faqs.map((f) => [f.id, f]));
    const reordered: FAQItem[] = [];
    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        item.sortOrder = idx;
        reordered.push(item);
      }
    });
    this.draftContent.faq.faqs = reordered;
    this.persist(true);
    return JSON.parse(JSON.stringify(reordered));
  }
}

export const mockContentProvider = new MockContentProvider();
