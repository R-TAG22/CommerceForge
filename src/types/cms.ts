export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  sectionId: string;
  sortOrder: number;
  visible: boolean;
}

export interface HeaderContent extends BaseEntity {
  published: boolean;
  brandName: string;
  brandHighlight: string;
  brandTagline: string;
  logoUrl?: string;
  ctaText: string;
  ctaAction: string;
  ctaVisible: boolean;
  navItems: NavigationItem[];
}

export interface HeroContentData extends BaseEntity {
  published: boolean;
  eyebrowText: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineHighlight: string;
  headlineLine3: string;
  description: string;
  priceAnchor: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  guarantees: {
    id: string;
    text: string;
    icon: string;
  }[];
}

export interface StatisticItem extends BaseEntity {
  value: string;
  label: string;
  description: string;
  icon: string;
  sortOrder: number;
  active: boolean;
}

export interface StatisticsSectionContent extends BaseEntity {
  published: boolean;
  trustedBrandsLabel: string;
  clientBrands: string[];
  stats: StatisticItem[];
}

export interface PortfolioProject extends BaseEntity {
  title: string;
  category: 'ecommerce' | 'beauty' | 'sustainable' | 'wellness' | 'fashion';
  categoryLabel: string;
  tagline: string;
  rebuildHighlight: string;
  url: string;
  displayUrl: string;
  previewImage: string;
  thumbnailUrl?: string;
  buttonText: string;
  clientName: string;
  metricsLabel: string;
  metricsValue: string;
  speedScore: string;
  accentColor: string;
  stack: string[];
  deliverables: string[];
  beforeProblems: string[];
  afterSolutions: string[];
  sortOrder: number;
  published: boolean;
}

export interface PackageFeature {
  id: string;
  text: string;
  included: boolean;
}

export interface PricingPackage extends BaseEntity {
  name: string;
  price: string;
  currency: string;
  billingPeriodText: string;
  description: string;
  turnaroundTime: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
  featured: boolean;
  badge: string;
  sortOrder: number;
  published: boolean;
}

export interface PackagesSectionContent extends BaseEntity {
  published: boolean;
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  packages: PricingPackage[];
}

export interface ComparisonItem {
  id: string;
  aspect: string;
  icon: string;
  oldWay: string;
  rebuildWay: string;
  sortOrder: number;
}

export interface ComparisonSectionContent extends BaseEntity {
  published: boolean;
  eyebrow: string;
  headingPrefix: string;
  headingLoss: string;
  headingWin: string;
  subheading: string;
  oldColumnHeading: string;
  oldColumnSubtitle: string;
  oldColumnResult: string;
  newColumnHeading: string;
  newColumnSubtitle: string;
  newColumnResult: string;
  ctaText?: string;
  items: ComparisonItem[];
}

export interface ProcessStepItem extends BaseEntity {
  stepNumber: string;
  title: string;
  description: string;
  deliverable: string;
  icon: string;
  image?: string;
  duration?: string;
  sortOrder: number;
  active: boolean;
}

export interface ProcessSectionContent extends BaseEntity {
  published: boolean;
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subheading: string;
  ctaText: string;
  steps: ProcessStepItem[];
}

export interface BrandValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder?: number;
}

export interface BrandSectionContent extends BaseEntity {
  published: boolean;
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  descriptionParagraphs: string[];
  values: BrandValueItem[];
  ctaText: string;
  standardsBadge: string;
  standardsTitle: string;
  vitalsScoreLabel: string;
  vitalsScoreValue: string;
  vitalsBarPercent: number;
  loadSpeedLabel: string;
  loadSpeedValue: string;
  accessibilityLabel: string;
  accessibilityValue: string;
}

export interface FAQItem extends BaseEntity {
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
}

export interface FAQSectionContent extends BaseEntity {
  published: boolean;
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  subheading: string;
  stillQuestionsTitle: string;
  stillQuestionsText: string;
  ctaText: string;
  faqs: FAQItem[];
}

export interface CTASectionContent extends BaseEntity {
  published: boolean;
  eyebrow: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  supportEmail: string;
  backgroundImage?: string;
  guarantees: string[];
}

export interface FooterLink {
  id: string;
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLinkItem {
  id?: string;
  platform: string;
  url: string;
  icon?: string;
  active?: boolean;
}

export interface FooterContentData extends BaseEntity {
  published: boolean;
  brandName: string;
  brandHighlight: string;
  brandTagline: string;
  description: string;
  originBadge: string;
  contactEmail: string;
  contactPhone?: string;
  contactAddress?: string;
  copyrightText: string;
  socialLinks: SocialLinkItem[];
  columns: FooterColumn[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
}

export type SectionTemplateType =
  | 'rich-text-media'
  | 'logo-cloud'
  | 'feature-cards'
  | 'testimonials'
  | 'cta-banner'
  | 'raw-embed'
  | 'cards'
  | 'banner'
  | 'text-split'
  | 'callout'
  | 'features';

export type SectionBackgroundStyle =
  | 'dark-studio'
  | 'crisp-light'
  | 'forest-muted'
  | 'charcoal-glass'
  | 'custom';

export interface CustomPageSection extends BaseEntity {
  page: 'home' | 'about' | 'work' | 'packages' | 'faqs' | 'hire-us';
  title: string;
  subtitle?: string;
  badge?: string;
  content: string;
  layout: 'cards' | 'banner' | 'text-split' | 'callout' | 'features';
  templateType?: SectionTemplateType;
  backgroundStyle?: SectionBackgroundStyle;
  anchorId?: string;
  textColor?: string;
  backgroundColor?: string;
  accentColor?: string;
  buttonText?: string;
  buttonUrl?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  mediaUrl?: string;
  mediaAlt?: string;
  mediaPosition?: 'left' | 'right';
  embedCode?: string;
  logos?: { id: string; name: string; logoUrl?: string; text?: string }[];
  testimonials?: {
    id: string;
    quote: string;
    author: string;
    role: string;
    company?: string;
    rating?: number;
    avatarUrl?: string;
  }[];
  items?: CustomSectionItem[];
  sortOrder: number;
  published: boolean;
}

export interface ThemeSettings {
  primaryBrandColor: string;
  backgroundTone: 'dark' | 'slate' | 'pure-dark';
  accentHoverColor: string;
  headingFont: 'Inter' | 'Plus Jakarta Sans' | 'DM Sans' | 'Outfit' | 'Roboto Mono';
  bodyFont: 'Inter' | 'Plus Jakarta Sans' | 'DM Sans' | 'Outfit' | 'Roboto Mono';
  baseFontSize: number;
  lineHeight: number;
  borderRadius: number;
  buttonVariant: 'pill' | 'rounded-rectangle' | 'sharp-box' | 'glow';
  cardElevation: 'solid' | 'frosted';
}

export interface WebsiteContent {
  header: HeaderContent;
  hero: HeroContentData;
  statistics: StatisticsSectionContent;
  portfolio: PortfolioProject[];
  packages: PackagesSectionContent;
  comparison: ComparisonSectionContent;
  process: ProcessSectionContent;
  brand: BrandSectionContent;
  faq: FAQSectionContent;
  cta: CTASectionContent;
  footer: FooterContentData;
  customSections?: CustomPageSection[];
  themeSettings?: ThemeSettings;
  lastUpdated: string;
  version: number;
}

export interface MediaAsset extends BaseEntity {
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  altText: string;
  width?: number;
  height?: number;
  uploadedBy: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
  lastLogin?: string;
}

// Aliases for editor component compatibility
export type AboutSectionContent = BrandSectionContent;
export type CtaBannerContent = CTASectionContent;
export type FaqSectionContent = FAQSectionContent;
export type FaqItem = FAQItem;
export type FooterContent = FooterContentData;
export type MediaItem = MediaAsset;

