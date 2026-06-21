export type Language = 'en' | 'it' | 'zh' | 'fr' | 'de' | 'es';

// Safe multilingual generic wrapper that enforces the baseline English translation
// while keeping other target languages optional for smooth dynamic fallback logic
export type LRecord<T = string> = Partial<Record<Language, T>> & { en: T };

export interface WikiItem {
  id: string;
  slug: string;
  title: LRecord<string>;
  definition: LRecord<string>;
  application: LRecord<string>;
  caseStudy: LRecord<string>;
  faqQuestion: LRecord<string>;
  faqAnswer: LRecord<string>;
  relatedKeywords: string[];
}

export interface PromptItem {
  id: string;
  category: LRecord<string>;
  title: LRecord<string>;
  promptText: LRecord<string>;
  usageContext: LRecord<string>;
  recommendedModel: string;
}

export interface CaseStudyItem {
  id: string;
  industry: string;
  title: LRecord<string>;
  challenge: LRecord<string>;
  solution: LRecord<string>;
  roi: LRecord<string>;
  visitorCount: string;
  conversionBoost: string;
  flowSteps: LRecord<string[]>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LRecord<string>;
  description: LRecord<string>;
  category: string;
  readingTime: string;
  publishedTime: string;
  author: string;
  authorRole: string;
  keywords: string[];
  content: LRecord<string>;
  relatedIds?: string[];
}

export interface FaqItem {
  id: string;
  category: string;
  question: LRecord<string>;
  answer: LRecord<string>;
}

export interface DocCategory {
  id: string;
  title: LRecord<string>;
  docs: DocItem[];
}

export interface DocItem {
  id: string;
  title: LRecord<string>;
  content: LRecord<string>;
}

export interface SaaSCompareItem {
  featureName: LRecord<string>;
  modauiHas: boolean;
  shopifyHas: boolean | 'partial';
  stripeHas: boolean | 'partial';
  squareHas: boolean | 'partial';
  odooHas: boolean | 'partial';
  description: LRecord<string>;
}

export interface CommerceTemplate {
  id: string;
  title: LRecord<string>;
  category: string;
  rating: number;
  downloads: number;
  description: LRecord<string>;
  metrics: { label: LRecord<string>; value: string };
  features: LRecord<string[]>;
}

export interface DownloadKit {
  id: string;
  name: LRecord<string>;
  fileSize: string;
  fileType: 'JSON' | 'ZIP' | 'XLSX' | 'PDF';
  tag: LRecord<string>;
  downloads: number;
  description: LRecord<string>;
}

export interface SitemapPage {
  url: string;
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  lastmod: string;
  title: string;
}
