import { contactFormSchema, type ContactFormInput } from '@/lib/validations';

describe('contactFormSchema', () => {
  describe('name validation', () => {
    test('should accept valid name', () => {
      const validData: ContactFormInput = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough.',
        locale: 'en',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('should reject name that is too short', () => {
      const invalidData = {
        name: 'A',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    test('should reject name that is too long', () => {
      const invalidData = {
        name: 'A'.repeat(51),
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    test('should reject missing name', () => {
      const invalidData = {
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('email validation', () => {
    test('should accept valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.user@example.co.uk',
        'user+tag@example.com',
        'user_name@sub.example.com',
      ];

      validEmails.forEach(email => {
        const data = {
          name: 'Test User',
          email,
          subject: 'Test Subject',
          message: 'This is a test message.',
          locale: 'en' as const,
        };

        const result = contactFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    test('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        'missing@domain',
        '@example.com',
        'user@',
        'user space@example.com',
      ];

      invalidEmails.forEach(email => {
        const data = {
          name: 'Test User',
          email,
          subject: 'Test Subject',
          message: 'This is a test message.',
          locale: 'zh',
        };

        const result = contactFormSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });

    test('should reject email that is too long', () => {
      const invalidData = {
        name: 'Test User',
        email: 'a'.repeat(90) + '@example.com', // > 100 chars
        subject: 'Test Subject',
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });

    test('should reject missing email', () => {
      const invalidData = {
        name: 'Test User',
        subject: 'Test Subject',
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('subject validation', () => {
    test('should accept valid subject', () => {
      const validData: ContactFormInput = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Valid Subject',
        message: 'This is a test message.',
        locale: 'en',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('should reject subject that is too short', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test',
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('subject');
      }
    });

    test('should reject subject that is too long', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'A'.repeat(101),
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('subject');
      }
    });

    test('should reject missing subject', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message.',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('message validation', () => {
    test('should accept valid message', () => {
      const validData: ContactFormInput = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a valid message that has enough characters.',
        locale: 'en',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('should reject message that is too short', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Short',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('message');
      }
    });

    test('should reject message that is too long', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'A'.repeat(1001),
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('message');
      }
    });

    test('should reject missing message', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('locale validation', () => {
    test('should accept valid locales', () => {
      const validLocales: Array<'zh' | 'en' | 'ja'> = ['zh', 'en', 'ja'];

      validLocales.forEach(locale => {
        const data: ContactFormInput = {
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'This is a test message.',
          locale,
        };

        const result = contactFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    test('should reject invalid locale', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
        locale: 'fr', // Invalid locale
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    test('should reject missing locale', () => {
      const invalidData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message.',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('complete form validation', () => {
    test('should validate complete valid form', () => {
      const validData: ContactFormInput = {
        name: '张三',
        email: 'zhangsan@example.com',
        subject: 'VPN服务咨询',
        message: '您好，我对贵公司的VPN服务很感兴趣，希望了解更多详细信息。',
        locale: 'zh',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should collect all validation errors', () => {
      const invalidData = {
        name: 'A',
        email: 'invalid',
        subject: 'Hi',
        message: 'Short',
        locale: 'invalid',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        // Should have multiple errors
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });

    test('should accept Unicode characters in all fields', () => {
      const unicodeData: ContactFormInput = {
        name: '田中太郎',
        email: 'tanaka@example.jp',
        subject: 'サービスについて質問があります',
        message: 'こんにちは、御社のVPNサービスに興味があります。詳細を教えていただけますか？',
        locale: 'ja',
      };

      const result = contactFormSchema.safeParse(unicodeData);
      expect(result.success).toBe(true);
    });
  });
});
