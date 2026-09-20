export type NavSection = 'hero' | 'work' | 'packages' | 'comparison' | 'process' | 'about' | 'faq';
export type NavItem = 'HOME' | 'WORK' | 'PACKAGES' | 'PROCESS' | 'ABOUT' | 'FAQ';

export interface ProjectInquiry {
  name: string;
  email: string;
  storeUrl?: string;
  packageTier?: string;
  message: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  metrics: string;
  description: string;
  tags: string[];
}
