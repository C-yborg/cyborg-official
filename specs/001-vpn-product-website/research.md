# 技术研究: VPN 产品官网

**日期**: 2025-10-29
**功能**: VPN 产品官网多语言营销网站
**状态**: 已完成

## 研究概述

本文档记录了 VPN 产品官网实施前的技术调研成果,重点关注国际化(i18n)方案、性能优化策略、无障碍访问最佳实践以及测试策略。

## 决策记录

### 1. 国际化(i18n)方案

**决策**: 使用 `next-intl` 库实现多语言支持

**理由**:
- next-intl 是 Next.js App Router 官方推荐的国际化解决方案
- 完美支持服务端渲染和静态生成,符合宪章"服务端优先"原则
- 提供类型安全的翻译函数,与 TypeScript 深度集成
- 支持动态路由 `[locale]` 模式,SEO 友好(每种语言独立 URL)
- 支持浏览器语言自动检测和语言偏好持久化
- 零客户端 JavaScript 负担(翻译在服务端完成)

**已评估的替代方案**:
- **next-i18next**: 为 Pages Router 设计,App Router 支持不佳,官方已推荐迁移到 next-intl
- **react-intl**: 需要更多客户端 JavaScript,不符合服务端优先原则,配置复杂
- **自定义方案**: 开发成本高,缺少类型安全和最佳实践,维护负担重

**实施要点**:
- 使用 `app/[locale]/` 动态路由结构
- 翻译文件存储在 `messages/{locale}.json`
- 配置中间件实现语言检测和重定向
- 使用 `useTranslations` hook 和 `getTranslations` 函数

### 2. 表单管理与验证

**决策**: React Hook Form + Zod 组合

**理由**:
- React Hook Form 性能优异,减少不必要的重新渲染
- Zod 提供类型安全的验证模式,与 TypeScript 完美集成
- shadcn/ui 官方推荐组合,文档齐全,示例丰富
- 支持服务端和客户端双重验证,安全性高
- 表单状态管理轻量级,不依赖全局状态

**已评估的替代方案**:
- **Formik + Yup**: 较老的方案,性能不如 React Hook Form,Bundle 体积更大
- **原生表单 + HTML5 验证**: 缺少类型安全,用户体验不佳,难以自定义错误提示
- **React Hook Form + Joi**: Joi 主要面向 Node.js,浏览器 Bundle 体积较大

**实施要点**:
- 在 `lib/validations.ts` 定义 Zod 模式
- 联系表单字段: name(必填)、email(必填+格式验证)、subject(必填)、message(必填)
- 支持多语言错误提示(错误消息存储在翻译文件中)
- 服务端 API Route 二次验证,防止客户端绕过

### 3. 样式系统与主题

**决策**: Tailwind CSS + CSS 变量实现冷色调主题

**理由**:
- Tailwind CSS 是宪章强制要求,工具类优先符合原则四
- 使用 CSS 变量(`--primary`, `--secondary`, `--accent`)实现主题色管理
- shadcn/ui 基于 Tailwind + CSS 变量,天然支持主题定制
- 冷色调配色方案:
  - 主色: 深蓝 `#1e3a8a` (blue-900)
  - 辅色: 灰蓝 `#475569` (slate-600)
  - 强调色: 天蓝 `#0ea5e9` (sky-500)
  - 背景: 深灰 `#0f172a` (slate-900)
  - 文字: 浅灰 `#e2e8f0` (slate-200)

**已评估的替代方案**:
- **CSS-in-JS (Emotion/Styled-components)**: 违反宪章原则四,增加运行时开销,已排除
- **传统 CSS/SCSS**: 不符合宪章要求,无工具类约束,难以保持一致性

**实施要点**:
- 在 `tailwind.config.ts` 中定义自定义颜色主题
- 使用 `globals.css` 定义 CSS 变量
- 确保所有颜色符合 WCAG AA 对比度标准(至少 4.5:1)

### 4. 图片优化策略

**决策**: Next.js Image 组件 + WebP/AVIF + 懒加载

**理由**:
- Next.js Image 组件自动优化,符合宪章原则六
- 自动生成多种尺寸响应式图片
- 支持 WebP 和 AVIF 现代格式,大幅减小文件体积
- 内置懒加载(Intersection Observer),提升首屏性能
- 自动防止布局偏移(CLS 优化)

**图片资源规划**:
- 英雄区背景: 1920x1080, WebP, ~200KB
- 特性图标: SVG 格式(矢量,体积小,无需优化)
- 客户头像: 80x80, WebP, ~10KB
- 产品截图: 800x600, WebP, ~150KB
- 所有图片使用 `<Image>` 组件,指定 `priority` 或 `loading="lazy"`

**实施要点**:
- 在 `next.config.mjs` 配置图片域名白名单(如使用外部图片)
- 提供 `alt` 文本支持无障碍访问
- 为关键图片(英雄区)设置 `priority={true}` 避免 LCP 延迟

### 5. 性能优化策略

**决策**: 服务端渲染 + 静态生成混合模式

**理由**:
- 所有语言版本页面预先生成(ISR),首屏速度极快
- 服务端组件默认,JavaScript 负载最小化
- 代码拆分和动态导入延迟加载非关键组件
- 字体子集化和预加载减少阻塞时间

**性能预算**:
- 首屏 JavaScript: < 100KB (gzip 后)
- 首屏 CSS: < 50KB (gzip 后)
- 首屏总体积: < 500KB
- LCP(Largest Contentful Paint): < 2.5s
- FID(First Input Delay): < 100ms
- CLS(Cumulative Layout Shift): < 0.1

**实施要点**:
- 使用 `generateStaticParams` 预生成所有语言版本
- 移动端菜单、语言切换器、表单交互使用客户端组件(最小化范围)
- 使用 `next/font` 优化字体加载
- 通过 Lighthouse CI 监控性能得分

### 6. 无障碍访问(a11y)实践

**决策**: 语义化 HTML + ARIA + 键盘导航

**理由**:
- 宪章原则五强制要求 WCAG 2.1 AA 级标准
- 语义化 HTML5 元素提供原生无障碍支持
- ARIA 属性补充增强交互元素的可访问性
- 键盘导航确保无鼠标操作可用性

**关键实施点**:
- **语义化标签**: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **表单**: `<label>` 与输入框关联,错误提示使用 `aria-invalid` 和 `aria-describedby`
- **语言切换器**: `role="combobox"`, `aria-label="选择语言"`, `aria-expanded`
- **移动菜单**: `role="dialog"`, `aria-modal="true"`, 焦点陷阱(focus trap)
- **跳转链接**: "跳到主内容" 链接支持键盘用户快速导航
- **颜色对比**: 所有文字与背景对比度 ≥ 4.5:1
- **焦点指示器**: 清晰的 `:focus-visible` 样式

**测试工具**:
- axe DevTools (浏览器扩展)
- Lighthouse 无障碍审计
- NVDA/JAWS 屏幕阅读器测试

### 7. 测试策略

**决策**: Jest + React Testing Library + Playwright 三层测试

**理由**:
- 宪章原则九强制要求 TDD 流程和多层级测试
- Jest + RTL 是 React 生态标准,shadcn/ui 官方推荐
- Playwright 支持跨浏览器 E2E 测试,性能优于 Cypress
- 三层测试覆盖: 单元(逻辑)、集成(组件协作)、E2E(用户流程)

**测试覆盖率目标**:
- 工具函数(lib/): 90%+
- UI 组件(components/ui/): 关键交互路径 100%
- 区块组件(components/sections/): 80%+
- 表单验证逻辑: 100%
- E2E 关键流程: 语言切换、表单提交、导航

**TDD 工作流**:
1. **红灯**: 先写失败测试(描述预期行为)
2. **绿灯**: 实现最简代码使测试通过
3. **重构**: 优化代码结构,测试保持通过

**实施要点**:
- 为每个组件编写测试文件(如 `hero-section.test.tsx`)
- 使用 `testing-library/user-event` 模拟用户交互
- Playwright 测试覆盖多语言切换、表单提交、响应式布局
- 集成 CI/CD 自动运行测试,覆盖率门槛阻止合并

### 8. SEO 优化策略

**决策**: 静态元数据 + 动态 JSON-LD + Sitemap

**理由**:
- 宪章原则七要求完整元数据和结构化数据
- 静态生成页面天然 SEO 友好,爬虫可直接读取 HTML
- 每种语言独立 URL(`/zh`, `/en`, `/ja`)利于搜索引擎索引
- JSON-LD 结构化数据提升搜索结果展示(富片段)

**元数据清单**:
- **基础**: `<title>`, `<meta name="description">`
- **OpenGraph**: `og:title`, `og:description`, `og:image`, `og:url`, `og:locale`
- **Twitter Cards**: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **语言替代**: `<link rel="alternate" hreflang="...">`
- **JSON-LD**: Organization, WebSite, Product 模式

**实施要点**:
- 在 `app/[locale]/layout.tsx` 中导出 `metadata` 对象
- 使用 `generateMetadata` 函数根据语言动态生成
- 生成 `sitemap.xml` 和 `robots.txt`
- 确保每种语言有唯一的规范 URL(canonical)

## 风险与缓解

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 语言切换性能不达标(> 500ms) | 中 | 低 | 使用服务端渲染,避免客户端重新获取数据;预生成所有语言版本 |
| 首屏加载时间超出目标 | 高 | 中 | 严格控制 JavaScript Bundle 大小,使用代码拆分和懒加载;监控 Lighthouse 得分 |
| 无障碍测试覆盖不全 | 中 | 中 | 集成 axe 自动化测试到 CI;手动屏幕阅读器测试;定期审计 |
| 翻译内容不完整或错误 | 中 | 中 | 建立翻译审核流程;使用专业翻译服务;在翻译文件中标记缺失项 |
| 表单提交失败率过高 | 中 | 低 | 服务端双重验证;清晰错误提示;保留用户输入;提供重试机制 |

## 技术债务记录

**当前无已知技术债务** - 所有技术选择都符合宪章要求和行业最佳实践。

**潜在未来优化**:
- 如用户增长,可考虑引入 CDN 加速静态资源分发
- 如需 A/B 测试,可集成 Vercel Analytics 或 Google Optimize
- 如需内容频繁更新,可考虑引入 Headless CMS(如 Sanity, Contentful)

## 参考资料

- [Next.js 14 App Router 文档](https://nextjs.org/docs/app)
- [next-intl 国际化库](https://next-intl-docs.vercel.app/)
- [shadcn/ui 组件库](https://ui.shadcn.com/)
- [React Hook Form 文档](https://react-hook-form.com/)
- [Zod 验证库](https://zod.dev/)
- [Playwright 测试框架](https://playwright.dev/)
- [WCAG 2.1 无障碍标准](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev 性能优化指南](https://web.dev/performance/)
