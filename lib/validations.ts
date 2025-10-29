/**
 * Zod validation schemas
 */

import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: '姓名至少2个字符' })
    .max(50, { message: '姓名不超过50个字符' }),

  email: z
    .string()
    .email({ message: '请输入有效的邮箱地址' })
    .max(100, { message: '邮箱不超过100个字符' }),

  subject: z
    .string()
    .min(5, { message: '主题至少5个字符' })
    .max(100, { message: '主题不超过100个字符' }),

  message: z
    .string()
    .min(10, { message: '消息至少10个字符' })
    .max(1000, { message: '消息不超过1000个字符' }),

  locale: z.enum(['zh', 'en', 'ja']),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
