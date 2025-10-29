/**
 * Global type definitions for the VPN product website
 */

// Supported locales
export type Locale = 'zh' | 'en' | 'ja';

// Translation keys structure (will be extended as we add more content)
export interface TranslationKeys {
  common: {
    siteTitle: string;
    siteDescription: string;
    learnMore: string;
    contactUs: string;
    getStarted: string;
  };
  nav: {
    home: string;
    features: string;
    pricing: string;
    about: string;
    faq: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  pricing: {
    sectionTitle: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      features: string[];
      cta: string;
      popular?: boolean;
    }>;
  };
  testimonials: {
    sectionTitle: string;
    items: Array<{
      name: string;
      role: string;
      content: string;
      rating: number;
    }>;
  };
  faq: {
    sectionTitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    sectionTitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    socialMedia: string;
  };
}
