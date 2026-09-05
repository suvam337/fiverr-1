export interface GigPackage {
  name: string;
  tagline: string;
  description: string;
  deliveryDays: number;
  revisions: string;
  price: number;
  features: string[];
}

export interface GigFAQ {
  question: string;
  answer: string;
}

export interface GigRequirement {
  prompt: string;
  type: 'free_text' | 'file_upload' | 'multiple_choice';
  required: boolean;
  options?: string[];
}

export interface GigExtra {
  title: string;
  description: string;
  additionalDays: number;
  price: number;
}

export interface ThumbnailBrief {
  mainHeadline: string;
  subHeadline: string;
  colorPalette: { name: string; hex: string }[];
  visualElements: string[];
  canvaLayoutTips: string;
  aiPrompt: string;
}

export interface GigData {
  id: string;
  title: string;
  niche: string;
  category: string;
  subcategory: string;
  serviceType: string;
  searchTags: string[];
  packages: {
    basic: GigPackage;
    standard: GigPackage;
    premium: GigPackage;
  };
  extras: GigExtra[];
  description: string;
  faqs: GigFAQ[];
  requirements: GigRequirement[];
  thumbnailBrief: ThumbnailBrief;
  seoKeywords: string[];
  proTips: string[];
  auditScore: number;
}

export interface GenerateGigParams {
  niche: string;
  skills: string;
  targetAudience?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  pricingStrategy?: 'competitive' | 'balanced' | 'premium';
  language?: string;
  additionalDetails?: string;
}
