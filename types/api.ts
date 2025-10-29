/**
 * API request/response type definitions
 */

import { Locale } from './index';

// Contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: Locale;
}

// Contact form response
export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
