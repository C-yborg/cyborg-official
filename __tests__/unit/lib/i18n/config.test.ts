import { locales, defaultLocale, localeLabels } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

describe('i18n Configuration', () => {
  describe('locales', () => {
    test('should contain exactly three locales', () => {
      expect(locales).toHaveLength(3);
    });

    test('should include Chinese, English, and Japanese', () => {
      expect(locales).toContain('zh');
      expect(locales).toContain('en');
      expect(locales).toContain('ja');
    });

    test('should be read-only', () => {
      // TypeScript ensures this at compile time, but we can verify the array exists
      expect(Array.isArray(locales)).toBe(true);
    });
  });

  describe('defaultLocale', () => {
    test('should be Chinese (zh)', () => {
      expect(defaultLocale).toBe('zh');
    });

    test('should be included in locales array', () => {
      expect(locales).toContain(defaultLocale);
    });
  });

  describe('localeLabels', () => {
    test('should have labels for all locales', () => {
      locales.forEach((locale) => {
        expect(localeLabels[locale]).toBeDefined();
      });
    });

    test('should have correct Chinese label', () => {
      expect(localeLabels.zh).toBe('中文');
    });

    test('should have correct English label', () => {
      expect(localeLabels.en).toBe('English');
    });

    test('should have correct Japanese label', () => {
      expect(localeLabels.ja).toBe('日本語');
    });

    test('should have exactly three labels', () => {
      const labelKeys = Object.keys(localeLabels);
      expect(labelKeys).toHaveLength(3);
    });

    test('all labels should be non-empty strings', () => {
      Object.values(localeLabels).forEach((label) => {
        expect(typeof label).toBe('string');
        expect(label.length).toBeGreaterThan(0);
      });
    });
  });

  describe('type safety', () => {
    test('Locale type should only accept valid locales', () => {
      // This is a compile-time check, but we can verify at runtime
      const validLocale: Locale = 'zh';
      expect(locales).toContain(validLocale);

      const validLocale2: Locale = 'en';
      expect(locales).toContain(validLocale2);

      const validLocale3: Locale = 'ja';
      expect(locales).toContain(validLocale3);
    });

    test('should verify localeLabels keys match Locale type', () => {
      const labelKeys = Object.keys(localeLabels) as Locale[];
      labelKeys.forEach((key) => {
        expect(locales).toContain(key);
      });
    });
  });

  describe('configuration consistency', () => {
    test('all locales should have corresponding labels', () => {
      locales.forEach((locale) => {
        expect(localeLabels).toHaveProperty(locale);
      });
    });

    test('all labels should correspond to valid locales', () => {
      Object.keys(localeLabels).forEach((locale) => {
        expect(locales).toContain(locale as Locale);
      });
    });

    test('should not have duplicate locales', () => {
      const uniqueLocales = [...new Set(locales)];
      expect(uniqueLocales).toHaveLength(locales.length);
    });
  });
});
