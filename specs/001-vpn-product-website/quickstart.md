# 快速开始: VPN 产品官网

**日期**: 2025-10-29
**功能**: VPN 产品官网开发和部署指南
**前置条件**: Node.js 18+, pnpm 8+, Git

## 项目初始化

### 1. 创建 Next.js 项目

```bash
# 使用 Next.js 14 App Router 模板创建项目
npx create-next-app@latest cyborg-official --typescript --tailwind --app --src-dir=false --import-alias="@/*"

cd cyborg-official
```

### 2. 安装核心依赖

```bash
# 安装主要依赖
pnpm add next-intl zod react-hook-form @hookform/resolvers

# 安装 shadcn/ui CLI
pnpm add -D @shadcn/ui

# 初始化 shadcn/ui
npx shadcn-ui@latest init
# 选择: TypeScript, Tailwind CSS, CSS variables主题
```

### 3. 安装必需的 shadcn/ui 组件

```bash
# 安装项目所需的 UI 组件
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add form
npx shadcn-ui@latest add label
```

### 4. 安装测试框架

```bash
# Jest + React Testing Library
pnpm add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

# Playwright (E2E 测试)
pnpm add -D @playwright/test
npx playwright install
```

### 5. 配置国际化

创建 `lib/i18n/config.ts`:

```typescript
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['zh', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

创建 `middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales } from './lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale: 'zh',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### 6. 创建翻译文件结构

```bash
mkdir -p messages
touch messages/zh.json messages/en.json messages/ja.json
```

`messages/zh.json` 初始内容:

```json
{
  "common": {
    "siteTitle": "Cyborg VPN",
    "siteDescription": "安全、快速、私密的 VPN 服务"
  },
  "nav": {
    "home": "首页",
    "features": "特性",
    "pricing": "定价",
    "about": "关于",
    "faq": "常见问题",
    "contact": "联系"
  }
}
```

### 7. 配置 Tailwind 冷色调主题

修改 `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#1e3a8a', // blue-900
          foreground: '#e2e8f0',
        },
        secondary: {
          DEFAULT: '#475569', // slate-600
          foreground: '#f1f5f9',
        },
        accent: {
          DEFAULT: '#0ea5e9', // sky-500
          foreground: '#f0f9ff',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 8. 创建项目结构

```bash
# 创建目录结构
mkdir -p app/\[locale\]
mkdir -p app/api/contact
mkdir -p components/{ui,sections,layout}
mkdir -p lib/i18n
mkdir -p types
mkdir -p public/images/{features,testimonials}
mkdir -p __tests__/{unit,integration,e2e}

# 创建类型文件
touch types/index.ts types/components.ts types/api.ts

# 创建工具文件
touch lib/utils.ts lib/validations.ts
```

## 开发工作流

### 1. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000/zh` 查看中文版本

### 2. TDD 开发流程

对于每个新组件,遵循 **红-绿-重构** 循环:

**示例: 开发 Hero Section 组件**

**步骤 1: 红灯** - 先写失败测试

创建 `__tests__/unit/components/sections/hero-section.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/hero-section';
import { NextIntlClientProvider } from 'next-intl';

describe('HeroSection', () => {
  const messages = {
    hero: {
      title: '保护您的在线隐私',
      subtitle: '企业级加密',
      ctaPrimary: '免费试用',
    },
  };

  it('renders hero title', () => {
    render(
      <NextIntlClientProvider locale="zh" messages={messages}>
        <HeroSection />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('保护您的在线隐私')).toBeInTheDocument();
  });
});
```

运行测试(应该失败):

```bash
pnpm test
```

**步骤 2: 绿灯** - 实现最简代码

创建 `components/sections/hero-section.tsx`:

```typescript
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section>
      <h1>{t('title')}</h1>
    </section>
  );
}
```

再次运行测试(应该通过):

```bash
pnpm test
```

**步骤 3: 重构** - 优化代码

添加完整样式和功能,测试保持通过:

```typescript
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8">
          {t('subtitle')}
        </p>
        <Button size="lg" className="bg-sky-500 hover:bg-sky-600">
          {t('ctaPrimary')}
        </Button>
      </div>
    </section>
  );
}
```

**步骤 4: 重复** - 为每个新需求重复此循环

### 3. 运行测试

```bash
# 单元测试和集成测试
pnpm test

# 测试覆盖率报告
pnpm test --coverage

# E2E 测试
pnpm exec playwright test

# E2E 测试(UI 模式)
pnpm exec playwright test --ui
```

### 4. 代码质量检查

```bash
# TypeScript 类型检查
pnpm tsc --noEmit

# ESLint 检查
pnpm lint

# 格式化代码
pnpm format
```

## 关键实施步骤

### 步骤 1: 实现根布局和语言切换

`app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import '@/app/globals.css';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 步骤 2: 实现首页(所有区块)

`app/[locale]/page.tsx`:

```typescript
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { AboutSection } from '@/components/sections/about-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { FAQSection } from '@/components/sections/faq-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
```

### 步骤 3: 实现联系表单 API

`app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 服务端验证
    const validatedData = contactFormSchema.parse(body);

    // TODO: 发送邮件通知(使用 Resend 或其他服务)
    // await sendEmail(validatedData);

    return NextResponse.json({
      success: true,
      message: '感谢您的咨询,我们会尽快回复您!'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: '表单验证失败',
          errors: error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: '提交失败,请稍后重试'
      },
      { status: 500 }
    );
  }
}
```

## 部署

### Vercel 部署(推荐)

```bash
# 安装 Vercel CLI
pnpm add -g vercel

# 登录
vercel login

# 部署
vercel

# 生产部署
vercel --prod
```

### 环境变量配置(Vercel Dashboard)

```
NEXT_PUBLIC_SITE_URL=https://cyborg-vpn.com
NEXT_PUBLIC_DEFAULT_LOCALE=zh
CONTACT_EMAIL_TO=contact@cyborg-vpn.com
RESEND_API_KEY=re_xxxxx (如使用 Resend 发送邮件)
```

### 自定义域名

在 Vercel Dashboard 中添加自定义域名:
- 主域名: `cyborg-vpn.com`
- 中文: `cyborg-vpn.com/zh`
- 英文: `cyborg-vpn.com/en`
- 日文: `cyborg-vpn.com/ja`

## 性能验证

### Lighthouse 审计

```bash
# 安装 Lighthouse CI
pnpm add -D @lhci/cli

# 运行 Lighthouse
pnpm exec lhci autorun
```

**目标得分**:
- Performance: > 90
- Accessibility: 100
- Best Practices: > 95
- SEO: 100

### Core Web Vitals 监控

使用 Vercel Analytics 或 Google Search Console 监控:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## 常见问题

### Q: 如何添加新的翻译键?

A: 在所有三个语言文件(`messages/zh.json`, `messages/en.json`, `messages/ja.json`)中添加相同的键路径,确保内容完整。

### Q: 如何测试多语言切换?

A: 访问不同的语言 URL 或在浏览器中切换语言设置,检查自动检测是否正常。

### Q: 如何优化图片?

A: 使用 `next/image` 组件,将原始图片放在 `public/images/` 目录,Next.js 自动优化为 WebP/AVIF。

### Q: 如何调试测试失败?

A: 使用 `screen.debug()` 打印渲染的 DOM,或使用 Playwright UI 模式查看 E2E 测试执行过程。

## 下一步

1. 运行 `/speckit.tasks` 生成详细任务列表
2. 遵循 TDD 流程逐个实现任务
3. 确保所有测试通过且覆盖率达标
4. 部署到 Vercel 并验证性能指标
