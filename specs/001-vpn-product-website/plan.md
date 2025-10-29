# 实施计划: VPN 产品官网

**分支**: `001-vpn-product-website` | **日期**: 2025-10-29 | **规格说明**: [spec.md](./spec.md)
**输入**: 来自 `specs/001-vpn-product-website/spec.md` 的功能规格说明

## 摘要

实现一个面向 VPN 用户群体的产品介绍官网,采用简约冷色调设计风格,支持中文(默认)、英文、日文三种语言切换。网站包含完整的产品介绍内容(英雄区、特性展示、定价方案、客户评价、常见问题、联系表单),确保在移动端和桌面端都有出色的性能和用户体验,同时满足无障碍访问和 SEO 优化要求。

## 技术上下文

**语言/版本**: TypeScript 5+
**主要依赖**:
  - Next.js 14+ (App Router 架构)
  - React 18+
  - shadcn/ui (组件库)
  - Tailwind CSS (样式系统)
  - next-intl (国际化 i18n 支持)
  - Zod (表单验证)
  - React Hook Form (表单管理)

**存储**: 不适用 (静态内容通过代码管理,联系表单提交可选集成第三方服务或 API Routes)
**测试**:
  - Jest + React Testing Library (单元/集成测试)
  - Playwright (E2E 测试)

**目标平台**: Web (响应式设计,支持移动端、平板、桌面浏览器)
**项目类型**: 单页应用 (SPA) / 多页营销网站 - 采用 Next.js App Router 静态生成(SSG)和服务端渲染(SSR)混合模式
**性能目标**:
  - 首屏加载时间: 3G 网络 < 3s, 4G 网络 < 1.5s
  - Lighthouse 性能得分 > 90
  - 语言切换 < 500ms
  - Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

**约束条件**:
  - 必须遵循宪章定义的所有九项核心原则
  - 简约冷色调视觉风格(蓝、灰、深色系)
  - 所有组件默认服务端渲染,客户端组件需明确标记
  - 必须通过 TDD 流程开发
  - 必须通过 WCAG 2.1 AA 级无障碍标准

**规模/范围**:
  - 单页官网包含 8 个主要区块(英雄区、特性、关于、评价、定价、FAQ、联系、页脚)
  - 3 种语言版本,每种语言约 500-1000 词静态内容
  - 预计 10-15 个页面组件,30-40 个可复用 UI 组件
  - 目标支持 1000+ 并发用户访问

## 宪章检查

*门控:必须在阶段 0 研究之前通过。阶段 1 设计后重新检查。*

**TDD 测试策略**:
- [x] 已定义测试框架和工具链(Jest + React Testing Library / Playwright)
- [x] 已规划测试层级(单元/集成/E2E)及覆盖率目标
- [x] 已确认 TDD 红-绿-重构循环将被遵循
- [x] 已识别需要测试的关键用户流程和业务逻辑

**其他宪章检查**:
- [x] **原则一 - 服务端优先**: 所有区块组件默认服务端渲染,仅语言切换器、表单交互、移动端菜单需客户端组件
- [x] **原则二 - TypeScript 类型安全**: 所有组件、函数、工具模块都将使用 TypeScript 完整类型定义
- [x] **原则三 - 设计系统一致性**: 使用 shadcn/ui 组件(Button, Card, Input, Select, Dialog 等),遵循其设计模式
- [x] **原则四 - 样式规范**: 仅使用 Tailwind CSS 工具类,移动端优先响应式设计
- [x] **原则五 - 无障碍访问**: 语义化 HTML5,ARIA 属性,键盘导航,屏幕阅读器兼容
- [x] **原则六 - 性能优化**: Next.js Image 组件,WebP/AVIF 格式,懒加载,代码拆分,性能预算监控
- [x] **原则七 - SEO 元数据**: 每个语言版本完整元数据,OpenGraph, Twitter Cards, JSON-LD 结构化数据
- [x] **原则八 - 单一职责**: 组件拆分清晰(布局/区块/UI),每个组件单一职责,文件 < 200 行
- [x] **原则九 - TDD 流程**: 所有组件和功能先写测试,红-绿-重构循环,覆盖率达标

**门控评估**: ✅ 通过 - 所有宪章原则已评估且可满足,无冲突或违规。

## 项目结构

### 文档(此功能)

```text
specs/001-vpn-product-website/
├── plan.md              # 本文件(实施计划)
├── spec.md              # 功能规格说明
├── research.md          # 阶段 0 研究成果
├── data-model.md        # 阶段 1 数据模型
├── quickstart.md        # 阶段 1 快速开始指南
├── contracts/           # 阶段 1 API 契约
│   └── contact-form.yaml # 联系表单 API 契约
└── checklists/          # 质量检查清单
    └── requirements.md  # 需求完整性检查清单
```

### 源代码(代码仓库根目录)

```text
cyborg-official/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # 国际化路由
│   │   ├── layout.tsx             # 根布局(Header + Footer)
│   │   ├── page.tsx               # 首页(包含所有区块)
│   │   └── error.tsx              # 错误处理页面
│   ├── api/                       # API Routes
│   │   └── contact/               # 联系表单 API
│   │       └── route.ts
│   ├── favicon.ico
│   └── globals.css                # 全局样式
│
├── components/
│   ├── ui/                        # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── sections/                  # 页面区块组件
│   │   ├── hero-section.tsx       # 英雄区
│   │   ├── features-section.tsx   # 特性展示
│   │   ├── about-section.tsx      # 关于我们
│   │   ├── testimonials-section.tsx # 客户评价
│   │   ├── pricing-section.tsx    # 定价方案
│   │   ├── faq-section.tsx        # 常见问题
│   │   └── contact-section.tsx    # 联系表单
│   └── layout/                    # 布局组件
│       ├── header.tsx             # 页头(导航+语言切换)
│       ├── footer.tsx             # 页脚
│       ├── language-switcher.tsx  # 语言切换器
│       └── mobile-menu.tsx        # 移动端菜单
│
├── lib/                           # 工具函数
│   ├── utils.ts                   # 通用工具(cn, 格式化等)
│   ├── validations.ts             # Zod 验证模式
│   └── i18n/                      # 国际化配置
│       ├── config.ts
│       └── request.ts
│
├── messages/                      # 翻译文件
│   ├── zh.json                    # 中文
│   ├── en.json                    # 英文
│   └── ja.json                    # 日文
│
├── public/                        # 静态资源
│   ├── images/                    # 优化后图片
│   │   ├── hero-bg.webp
│   │   ├── features/
│   │   ├── testimonials/
│   │   └── ...
│   └── fonts/                     # 字体文件(如需自定义)
│
├── types/                         # TypeScript 类型
│   ├── index.ts                   # 全局类型定义
│   ├── components.ts              # 组件 Props 类型
│   └── api.ts                     # API 请求/响应类型
│
├── __tests__/                     # 测试文件
│   ├── unit/                      # 单元测试
│   │   ├── components/
│   │   └── lib/
│   ├── integration/               # 集成测试
│   │   ├── sections/
│   │   └── forms/
│   └── e2e/                       # E2E 测试
│       ├── homepage.spec.ts
│       ├── language-switch.spec.ts
│       └── contact-form.spec.ts
│
├── next.config.mjs                # Next.js 配置
├── tailwind.config.ts             # Tailwind 配置
├── tsconfig.json                  # TypeScript 配置
├── jest.config.js                 # Jest 配置
├── playwright.config.ts           # Playwright 配置
├── package.json
└── .env.local                     # 环境变量
```

**结构决策**:
- 采用 Next.js 14 App Router 架构,利用 `[locale]` 动态路由实现国际化
- 组件按职责分层:UI 基础组件(ui/)、业务区块(sections/)、布局组件(layout/)
- 国际化使用 next-intl 库,翻译文件集中在 messages/ 目录
- 测试文件独立目录,镜像源代码结构便于维护
- 静态资源优化后放置在 public/ 目录,使用 Next.js Image 组件加载

## 复杂度跟踪

> **本项目无宪章违规** - 所有技术选择都符合宪章要求。

| 违规项 | 为何需要 | 为何拒绝更简单的替代方案 |
|--------|----------|------------------------|
| N/A | N/A | N/A |

**说明**: 项目完全遵循宪章定义的技术栈和原则,无额外依赖或复杂架构模式引入。国际化库 next-intl 是 Next.js 生态推荐方案,表单管理 React Hook Form + Zod 是行业标准组合,不构成复杂度违规。

## 设计后宪章重新评估

*阶段 1 设计完成后的宪章合规性复核*

**重新评估结果**: ✅ 完全合规 - 所有设计决策符合宪章要求

**详细检查**:

### 技术选择验证

| 技术/库 | 宪章要求 | 实际选择 | 合规性 |
|---------|----------|----------|--------|
| 框架 | Next.js 14+ App Router | Next.js 14+ App Router | ✅ 完全符合 |
| UI 库 | React 18+ | React 18+ | ✅ 完全符合 |
| 类型系统 | TypeScript 5+ | TypeScript 5+ | ✅ 完全符合 |
| 组件库 | shadcn/ui | shadcn/ui | ✅ 完全符合 |
| 样式系统 | Tailwind CSS | Tailwind CSS | ✅ 完全符合 |
| 测试框架 | Jest + RTL / Playwright | Jest + RTL + Playwright | ✅ 完全符合 |
| 国际化 | (无强制要求) | next-intl (推荐方案) | ✅ 合理扩展 |
| 表单管理 | (无强制要求) | React Hook Form + Zod | ✅ 行业标准 |

### 原则遵循验证

- ✅ **原则一**: 所有区块组件设计为服务端组件,仅语言切换器、表单、移动菜单标记为客户端组件
- ✅ **原则二**: 所有数据模型定义了完整 TypeScript 类型,无 `any` 使用
- ✅ **原则三**: 所有 UI 组件基于 shadcn/ui,设计令牌和样式变量统一
- ✅ **原则四**: 100% 使用 Tailwind CSS 工具类,无内联样式或 CSS-in-JS
- ✅ **原则五**: 设计包含完整的 ARIA 属性、语义化 HTML 和键盘导航支持
- ✅ **原则六**: 使用 Next.js Image 组件、WebP/AVIF 格式、懒加载、代码拆分
- ✅ **原则七**: 每种语言版本都有独立元数据、OpenGraph、Twitter Cards、JSON-LD
- ✅ **原则八**: 组件按单一职责拆分(ui/sections/layout),每个文件预计 < 200 行
- ✅ **原则九**: TDD 工作流已在 quickstart.md 中详细定义,测试覆盖率目标明确

### 架构合规性

- ✅ **目录结构**: 完全遵循宪章定义的项目结构(`/app`, `/components`, `/lib`, `/__tests__`)
- ✅ **命名约定**: 组件 PascalCase, 函数 camelCase, 常量 UPPER_SNAKE_CASE
- ✅ **测试组织**: 独立 `__tests__` 目录,镜像源代码结构,单元/集成/E2E 分层

### 性能与质量目标

- ✅ **性能预算**: 首屏 JS < 100KB, CSS < 50KB, 总体积 < 500KB
- ✅ **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- ✅ **测试覆盖率**: 核心逻辑 80%+, 公共 API 100%, 工具函数 90%+
- ✅ **无障碍标准**: WCAG 2.1 AA 级,颜色对比度 ≥ 4.5:1

**结论**: 设计阶段所有技术决策和架构选择均符合项目宪章 v1.2.0 的九项核心原则。无违规项,无需复杂度说明,可以进入实施阶段。

## 下一步: 任务生成

运行以下命令生成详细的实施任务列表:

```bash
/speckit.tasks
```

任务列表将按用户故事优先级组织,遵循 TDD 流程,确保每个任务独立可测试且符合宪章要求。
