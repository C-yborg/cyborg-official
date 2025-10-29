# 数据模型: VPN 产品官网

**日期**: 2025-10-29
**功能**: VPN 产品官网数据结构定义
**状态**: 已完成

## 概述

本文档定义 VPN 产品官网所需的数据实体、类型定义和验证规则。由于官网主要为静态内容展示,大部分数据以硬编码或翻译文件形式存在,仅联系表单涉及动态数据交互。

## 核心实体

### 1. 翻译内容(Translation)

**用途**: 存储多语言静态文本内容

**数据源**: `messages/{locale}.json` 文件

**结构**(TypeScript 类型):

```typescript
// types/index.ts
export type Locale = 'zh' | 'en' | 'ja';

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
```

**示例数据**(zh.json 片段):

```json
{
  "common": {
    "siteTitle": "Cyborg VPN - 安全、快速、私密",
    "siteDescription": "企业级 VPN 服务,保护您的在线隐私",
    "learnMore": "了解更多",
    "contactUs": "联系我们",
    "getStarted": "立即开始"
  },
  "hero": {
    "title": "保护您的在线隐私",
    "subtitle": "企业级加密,全球节点,极速连接",
    "ctaPrimary": "免费试用",
    "ctaSecondary": "查看定价"
  }
}
```

### 2. 产品特性(Feature)

**用途**: 展示 VPN 产品核心功能和优势

**数据源**: `messages/{locale}.json` 中的 `features.items`

**TypeScript 类型**:

```typescript
// types/components.ts
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon 组件名称或 SVG 路径
}

export interface FeaturesSectionProps {
  features: Feature[];
  locale: Locale;
}
```

**验证规则**:
- `id`: 必填,唯一标识符
- `title`: 必填,1-50 字符
- `description`: 必填,10-200 字符
- `icon`: 必填,有效的图标名称

**示例数据**:

```typescript
const features: Feature[] = [
  {
    id: 'feature-1',
    title: '军事级加密',
    description: 'AES-256 加密算法,确保数据传输绝对安全',
    icon: 'Shield'
  },
  {
    id: 'feature-2',
    title: '全球节点',
    description: '50+ 国家,100+ 服务器,智能选择最快节点',
    icon: 'Globe'
  },
  {
    id: 'feature-3',
    title: '零日志政策',
    description: '不记录任何用户活动,保护您的隐私',
    icon: 'Lock'
  }
];
```

### 3. 定价方案(PricingPlan)

**用途**: 展示不同服务套餐和价格信息

**数据源**: `messages/{locale}.json` 中的 `pricing.plans`

**TypeScript 类型**:

```typescript
// types/components.ts
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string; // '月', 'month', '月'
  features: string[];
  cta: string;
  popular?: boolean;
  description?: string;
}

export interface PricingSectionProps {
  plans: PricingPlan[];
  locale: Locale;
}
```

**验证规则**:
- `id`: 必填,唯一标识符
- `name`: 必填,套餐名称
- `price`: 必填,价格字符串(如 "¥99", "$9.99")
- `period`: 必填,计费周期
- `features`: 至少1项功能
- `popular`: 可选,是否推荐套餐

**示例数据**:

```typescript
const plans: PricingPlan[] = [
  {
    id: 'plan-basic',
    name: '基础版',
    price: '¥49',
    period: '月',
    features: ['单设备连接', '50+ 服务器', '标准速度'],
    cta: '选择基础版'
  },
  {
    id: 'plan-pro',
    name: '专业版',
    price: '¥99',
    period: '月',
    features: ['5设备连接', '100+ 服务器', '极速连接', '优先支持'],
    cta: '选择专业版',
    popular: true
  }
];
```

### 4. 客户评价(Testimonial)

**用途**: 展示用户反馈和推荐

**数据源**: `messages/{locale}.json` 中的 `testimonials.items`

**TypeScript 类型**:

```typescript
// types/components.ts
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number; // 1-5
  avatar?: string; // 头像图片 URL
}

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  locale: Locale;
}
```

**验证规则**:
- `id`: 必填,唯一标识符
- `name`: 必填,用户名(1-50 字符)
- `role`: 可选,用户职位/角色
- `content`: 必填,评价内容(10-500 字符)
- `rating`: 必填,1-5 的整数
- `avatar`: 可选,头像 URL

**示例数据**:

```typescript
const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: '张三',
    role: '自由职业者',
    content: '速度快,稳定性好,客服响应及时,非常满意!',
    rating: 5,
    avatar: '/images/testimonials/user-1.webp'
  }
];
```

### 5. 常见问题(FAQ)

**用途**: 展示用户常问问题及解答

**数据源**: `messages/{locale}.json` 中的 `faq.items`

**TypeScript 类型**:

```typescript
// types/components.ts
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  faqs: FAQ[];
  locale: Locale;
}
```

**验证规则**:
- `id`: 必填,唯一标识符
- `question`: 必填,问题文本(5-200 字符)
- `answer`: 必填,答案文本(10-1000 字符)
- `category`: 可选,问题分类

**示例数据**:

```typescript
const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'VPN 会影响网速吗?',
    answer: '我们的服务器采用高速网络,通常不会显著影响速度。部分情况下甚至能绕过运营商限速,提升访问速度。',
    category: '性能'
  }
];
```

### 6. 联系表单(ContactForm)

**用途**: 用户咨询请求数据

**数据源**: 用户提交的表单数据

**TypeScript 类型**:

```typescript
// types/api.ts
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: Locale; // 表单提交时的语言
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
```

**Zod 验证模式**:

```typescript
// lib/validations.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: '姓名至少2个字符' })
    .max(50, { message: '姓名不超过50个字符' }),

  email: z.string()
    .email({ message: '请输入有效的邮箱地址' })
    .max(100, { message: '邮箱不超过100个字符' }),

  subject: z.string()
    .min(5, { message: '主题至少5个字符' })
    .max(100, { message: '主题不超过100个字符' }),

  message: z.string()
    .min(10, { message: '消息至少10个字符' })
    .max(1000, { message: '消息不超过1000个字符' }),

  locale: z.enum(['zh', 'en', 'ja'])
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
```

**验证规则**:
- **name**: 必填,2-50 字符,允许中文、英文、日文
- **email**: 必填,有效邮箱格式,最多100字符
- **subject**: 必填,5-100 字符
- **message**: 必填,10-1000 字符
- **locale**: 必填,枚举值(`zh`, `en`, `ja`)

**状态转换**:

```
[待提交] ──(用户填写)──> [验证中] ──(验证通过)──> [提交中] ──(API成功)──> [已提交]
                              │                        │
                              └──(验证失败)──> [错误]  └──(API失败)──> [错误]
```

## 组件 Props 类型

### 通用 Props

```typescript
// types/components.ts
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

export interface SectionProps extends BaseComponentProps {
  locale: Locale;
}
```

### 特定组件 Props

```typescript
// Header 组件
export interface HeaderProps {
  locale: Locale;
  className?: string;
}

// Footer 组件
export interface FooterProps {
  locale: Locale;
  className?: string;
}

// LanguageSwitcher 组件
export interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

// ContactForm 组件
export interface ContactFormProps {
  locale: Locale;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: string) => void;
}
```

## 环境变量

```typescript
// .env.local
NEXT_PUBLIC_SITE_URL=https://cyborg-vpn.com
NEXT_PUBLIC_DEFAULT_LOCALE=zh

// 联系表单提交(可选,如使用第三方服务)
CONTACT_EMAIL_TO=contact@cyborg-vpn.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=secret

// 环境变量类型定义
// types/env.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_DEFAULT_LOCALE: Locale;
      CONTACT_EMAIL_TO?: string;
      SMTP_HOST?: string;
      SMTP_PORT?: string;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
    }
  }
}

export {};
```

## 数据持久化

**翻译内容**: 静态 JSON 文件,无需持久化

**联系表单提交**: 有以下选项(在实施阶段确定):
1. **发送邮件**: 通过 SMTP 或第三方服务(SendGrid, Resend)发送到指定邮箱
2. **存储数据库**: 可选,如需后续分析可集成数据库(但规格说明未要求)
3. **第三方表单服务**: 如 Formspree, Typeform(简化实现)

**推荐方案**: 使用 Resend API 发送邮件通知,无需数据库,符合简约原则。

## 类型导出清单

```typescript
// types/index.ts
export type { Locale, TranslationKeys } from './types/index';
export type {
  Feature,
  PricingPlan,
  Testimonial,
  FAQ,
  FeaturesSectionProps,
  PricingSectionProps,
  TestimonialsSectionProps,
  FAQSectionProps,
  HeaderProps,
  FooterProps,
  LanguageSwitcherProps,
  ContactFormProps
} from './types/components';
export type {
  ContactFormData,
  ContactFormResponse,
  ContactFormInput
} from './types/api';
```

## 数据迁移

**初始化**: 创建三种语言的完整翻译文件(`messages/zh.json`, `messages/en.json`, `messages/ja.json`)

**版本控制**: 所有翻译文件纳入 Git 版本控制,代码审查时验证翻译完整性

**未来扩展**: 如需添加新语言,只需:
1. 创建新语言翻译文件(如 `messages/ko.json` 韩语)
2. 在 `lib/i18n/config.ts` 中添加语言配置
3. 更新 `Locale` 类型枚举

## 测试数据

**开发环境**: 使用模拟数据填充所有区块,确保内容丰富度(每个特性至少3项,定价方案至少2个,评价至少4条,FAQ至少6个)

**测试环境**: 使用真实数据的子集,验证多语言切换和表单提交

**生产环境**: 最终审校的完整多语言内容
