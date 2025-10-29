/**
 * Component Props type definitions
 */

import { Locale } from './index';

// Base component props
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

export interface SectionProps extends BaseComponentProps {
  locale: Locale;
}

// Feature entity
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesSectionProps extends SectionProps {
  features?: Feature[];
}

// Pricing entity
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
  description?: string;
}

export interface PricingSectionProps extends SectionProps {
  plans?: PricingPlan[];
}

// Testimonial entity
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface TestimonialsSectionProps extends SectionProps {
  testimonials?: Testimonial[];
}

// FAQ entity
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps extends SectionProps {
  faqs?: FAQ[];
}

// Layout components
export interface HeaderProps {
  locale: Locale;
  className?: string;
}

export interface FooterProps {
  locale: Locale;
  className?: string;
}

export interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

// Contact form
export interface ContactFormProps {
  locale: Locale;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: string) => void;
}
