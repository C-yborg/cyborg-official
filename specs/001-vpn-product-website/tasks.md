# 任务列表: VPN 产品官网

**输入**: 来自 `/specs/001-vpn-product-website/` 的设计文档
**前置条件**: plan.md(必需)、spec.md(用户故事必需)、research.md、data-model.md、contracts/

**测试**: 根据宪章原则九(测试驱动开发),测试任务是**强制性的**。所有用户故事必须包含测试任务,并且测试必须在实现之前编写(TDD 红-绿-重构循环)。

**组织方式**: 任务按用户故事分组,以实现每个故事的独立实施和测试。

## 格式: `[ID] [P?] [故事] 描述`

- **[P]**: 可并行运行(不同文件,无依赖)
- **[故事]**: 此任务属于哪个用户故事(例如:US1、US2、US3)
- 在描述中包含确切的文件路径

## 路径约定

- **Web 应用**: `app/`、`components/`、`lib/`、`types/`、`__tests__/`
- 下方显示的路径基于 Next.js 14 App Router 架构

## 阶段 1: 设置(项目初始化)

**目的**: 项目初始化和基本结构

- [X] T001 创建 Next.js 14 项目,使用 TypeScript + Tailwind CSS + App Router
- [X] T002 安装核心依赖: next-intl, zod, react-hook-form, @hookform/resolvers
- [X] T003 [P] 初始化 shadcn/ui 并配置主题(冷色调)
- [X] T004 [P] 安装测试框架: Jest, @testing-library/react, @testing-library/jest-dom, Playwright
- [X] T005 [P] 安装必需的 shadcn/ui 组件: button, card, input, select, dialog, accordion, form, label
- [X] T006 创建项目目录结构: app/[locale], components/{ui,sections,layout}, lib/{i18n,validations}, types/, messages/, __tests__/{unit,integration,e2e}
- [X] T007 [P] 配置 Tailwind 冷色调主题在 tailwind.config.ts
- [X] T008 [P] 配置 Jest 和 React Testing Library 在 jest.config.js
- [X] T009 [P] 配置 Playwright 在 playwright.config.ts
- [X] T010 创建国际化配置 lib/i18n/config.ts (locales: zh, en, ja)
- [X] T011 创建 next-intl 中间件 middleware.ts (默认语言 zh, 浏览器检测)
- [X] T012 [P] 创建 TypeScript 类型定义文件: types/index.ts, types/components.ts, types/api.ts
- [X] T013 [P] 创建工具函数文件: lib/utils.ts, lib/validations.ts
- [X] T014 [P] 创建翻译文件结构: messages/zh.json, messages/en.json, messages/ja.json (初始空对象)

---

## 阶段 2: 基础(阻塞性前置条件)

**目的**: 在实施任何用户故事之前必须完成的核心基础设施

**⚠️ 关键**: 在此阶段完成之前,任何用户故事工作都无法开始

- [X] T015 定义全局类型(Locale, TranslationKeys)在 types/index.ts
- [X] T016 [P] 定义组件 Props 类型在 types/components.ts
- [X] T017 [P] 定义 API 类型(ContactFormData, ContactFormResponse)在 types/api.ts
- [X] T018 实现 Zod 验证模式 contactFormSchema 在 lib/validations.ts
- [X] T019 [P] 创建根布局 app/[locale]/layout.tsx (包含 NextIntlClientProvider, Header, Footer 占位符)
- [X] T020 [P] 创建全局样式 app/globals.css (Tailwind 基础样式 + CSS 变量冷色调主题)
- [X] T021 [P] 配置 Next.js next.config.mjs (图片域名白名单, 国际化设置)
- [X] T022 [P] 配置 TypeScript tsconfig.json (路径别名 @/*, 严格模式)
- [X] T023 [P] 配置 ESLint 和 Prettier (.eslintrc.json, .prettierrc)
- [X] T024 [P] 创建环境变量模板 .env.example (NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_DEFAULT_LOCALE)

**检查点**: 基础就绪 - 现在可以开始并行实施用户故事

---

## 阶段 3: 用户故事 1 - 浏览产品信息(优先级:P1)🎯 MVP

**目标**: 实现完整的产品介绍内容,包括英雄区、特性、关于、评价、定价、FAQ 区块,用户能快速了解产品价值

**独立测试**: 用户访问首页并浏览所有区块,能完全理解产品功能、优势、定价和使用场景,无需其他功能即可交付完整价值

### 用户故事 1 的测试(强制 - TDD 要求)⚠️

> **TDD 红灯阶段:首先编写这些测试,确保在实施之前它们失败(红灯)**
> **测试必须先于实现 - 这是不可协商的宪章原则**

- [X] T025 [P] [US1] 在 __tests__/e2e/homepage.spec.ts 中为首页加载和所有区块可见性编写 E2E 测试
- [X] T026 [P] [US1] 在 __tests__/integration/sections/hero-section.test.tsx 中为 HeroSection 编写集成测试
- [X] T027 [P] [US1] 在 __tests__/integration/sections/features-section.test.tsx 中为 FeaturesSection 编写集成测试
- [X] T028 [P] [US1] 在 __tests__/integration/sections/about-section.test.tsx 中为 AboutSection 编写集成测试
- [X] T029 [P] [US1] 在 __tests__/integration/sections/testimonials-section.test.tsx 中为 TestimonialsSection 编写集成测试
- [X] T030 [P] [US1] 在 __tests__/integration/sections/pricing-section.test.tsx 中为 PricingSection 编写集成测试
- [X] T031 [P] [US1] 在 __tests__/integration/sections/faq-section.test.tsx 中为 FAQSection 编写集成测试
- [X] T032 [P] [US1] 在 __tests__/unit/lib/utils.test.ts 中为工具函数编写单元测试

### 用户故事 1 的实施

**步骤 1: 翻译内容(所有区块依赖)**

- [X] T033 [P] [US1] 填充中文翻译 messages/zh.json (hero, features, about, testimonials, pricing, faq, footer 所有内容)
- [X] T034 [P] [US1] 填充英文翻译 messages/en.json (所有区块完整翻译)
- [X] T035 [P] [US1] 填充日文翻译 messages/ja.json (所有区块完整翻译)

**步骤 2: 布局组件(所有页面依赖)**

- [X] T036 [US1] 实现 Header 组件 components/layout/header.tsx (导航菜单,服务端组件)
- [X] T037 [US1] 实现 Footer 组件 components/layout/footer.tsx (版权信息、链接、社交媒体,服务端组件)
- [X] T038 [US1] 更新根布局 app/[locale]/layout.tsx (集成实际 Header 和 Footer)
- [X] T039 [P] [US1] 为 Header 添加单元测试 __tests__/unit/components/layout/header.test.tsx
- [X] T040 [P] [US1] 为 Footer 添加单元测试 __tests__/unit/components/layout/footer.test.tsx

**步骤 3: 英雄区(P1 最高优先级区块)**

- [X] T041 [US1] 实现 HeroSection 组件 components/sections/hero-section.tsx (标题、副标题、CTA 按钮,服务端组件)
- [X] T042 [US1] 添加英雄区背景图片到 public/images/hero-bg.webp (优化 WebP 格式)
- [X] T043 [US1] 验证 HeroSection 测试通过(TDD 绿灯)

**步骤 4: 特性区**

- [X] T044 [US1] 实现 FeaturesSection 组件 components/sections/features-section.tsx (展示3-6个核心特性,服务端组件)
- [X] T045 [P] [US1] 添加特性图标到 public/images/features/ (SVG 格式,至少3个)
- [X] T046 [US1] 验证 FeaturesSection 测试通过(TDD 绿灯)

**步骤 5: 关于区**

- [X] T047 [US1] 实现 AboutSection 组件 components/sections/about-section.tsx (公司故事和使命,服务端组件)
- [X] T048 [US1] 验证 AboutSection 测试通过(TDD 绿灯)

**步骤 6: 客户评价区**

- [X] T049 [US1] 实现 TestimonialsSection 组件 components/sections/testimonials-section.tsx (展示4-6条客户评价,服务端组件)
- [X] T050 [P] [US1] 添加客户头像图片到 public/images/testimonials/ (WebP 格式,至少4张)
- [X] T051 [US1] 验证 TestimonialsSection 测试通过(TDD 绿灯)

**步骤 7: 定价区**

- [X] T052 [US1] 实现 PricingSection 组件 components/sections/pricing-section.tsx (展示2-3个定价方案,服务端组件)
- [X] T053 [US1] 验证 PricingSection 测试通过(TDD 绿灯)

**步骤 8: FAQ 区**

- [X] T054 [US1] 实现 FAQSection 组件 components/sections/faq-section.tsx (使用 shadcn/ui Accordion,至少6个问题,服务端组件)
- [X] T055 [US1] 验证 FAQSection 测试通过(TDD 绿灯)

**步骤 9: 首页组装**

- [X] T056 [US1] 实现首页 app/[locale]/page.tsx (组合所有区块组件,按顺序排列)
- [X] T057 [US1] 添加页面元数据 app/[locale]/page.tsx (title, description, OpenGraph, Twitter Cards,中文版本)
- [X] T058 [US1] 验证首页 E2E 测试通过(TDD 绿灯)

**步骤 10: 响应式和无障碍**

- [X] T059 [US1] 验证所有区块在移动端(375px)、平板(768px)、桌面(1440px)上响应式布局正确
- [X] T060 [US1] 验证所有区块符合 WCAG 2.1 AA 标准(语义化 HTML, ARIA 属性, 键盘导航)
- [X] T061 [US1] 运行 Lighthouse 审计,确保 Performance > 90, Accessibility = 100

**检查点**: 此时,用户故事 1 应该完全功能并可独立测试。用户能在中文版本下浏览完整产品信息。

---

## 阶段 4: 用户故事 2 - 切换语言(优先级:P2)

**目标**: 实现语言切换功能,用户可以在中文、英文、日文之间切换,网站保持语言偏好

**独立测试**: 用户点击语言切换器,立即将整个网站内容切换为选择的语言,且切换后的内容完整准确,刷新页面保持语言设置

### 用户故事 2 的测试(强制 - TDD 要求)⚠️

> **TDD 红灯阶段:首先编写测试**

- [X] T062 [P] [US2] 在 __tests__/e2e/language-switch.spec.ts 中为语言切换功能编写 E2E 测试(切换、URL 更新、内容变化、持久化)
- [X] T063 [P] [US2] 在 __tests__/integration/layout/language-switcher.test.tsx 中为 LanguageSwitcher 组件编写集成测试
- [X] T064 [P] [US2] 在 __tests__/unit/lib/i18n/config.test.ts 中为国际化配置编写单元测试

### 用户故事 2 的实施

- [X] T065 [US2] 实现 LanguageSwitcher 组件 components/layout/language-switcher.tsx (下拉选择器,显示当前语言,客户端组件 'use client')
- [X] T066 [US2] 集成 LanguageSwitcher 到 Header components/layout/header.tsx (右上角位置)
- [X] T067 [US2] 实现语言切换逻辑(使用 next-intl useRouter 和 usePathname,更新 URL 参数)
- [X] T068 [US2] 配置浏览器语言自动检测 middleware.ts (优先级:URL > Cookie > Accept-Language header)
- [X] T069 [US2] 为英文和日文版本添加元数据 app/[locale]/page.tsx (generateMetadata 函数,根据 locale 动态生成)
- [X] T070 [US2] 添加 hreflang 链接到所有页面头部(SEO 优化,语言替代)
- [X] T071 [US2] 验证语言切换在 500ms 内完成,无闪烁或重新加载
- [X] T072 [US2] 验证所有翻译内容完整,无缺失键或回退到默认语言
- [X] T073 [US2] 验证语言偏好持久化(刷新页面、导航到其他页面保持语言)
- [X] T074 [US2] 验证 E2E 测试通过(TDD 绿灯)

**检查点**: 此时,用户故事 1 和 2 都应独立工作。用户可以浏览完整产品信息并切换到任何支持的语言。

---

## 阶段 5: 用户故事 3 - 联系咨询(优先级:P3)

**目标**: 实现联系表单功能,用户可以提交咨询请求,团队能收到用户信息和问题

**独立测试**: 用户填写联系表单并提交,系统验证输入并显示成功或错误提示,表单在所有语言下正常工作

### 用户故事 3 的测试(强制 - TDD 要求)⚠️

> **TDD 红灯阶段:首先编写测试**

- [X] T075 [P] [US3] 在 __tests__/e2e/contact-form.spec.ts 中为联系表单提交流程编写 E2E 测试(填写、验证、提交成功/失败)
- [X] T076 [P] [US3] 在 __tests__/integration/sections/contact-section.test.tsx 中为 ContactSection 编写集成测试
- [X] T077 [P] [US3] 在 __tests__/unit/lib/validations.test.ts 中为 Zod 验证模式编写单元测试
- [X] T078 [P] [US3] 在 __tests__/integration/api/contact.test.ts 中为联系表单 API 编写集成测试

### 用户故事 3 的实施

**步骤 1: 表单组件**

- [X] T079 [US3] 实现 ContactSection 组件 components/sections/contact-section.tsx (包含表单,客户端组件 'use client')
- [X] T080 [US3] 集成 React Hook Form 和 Zod 验证(useForm hook, zodResolver)
- [X] T081 [US3] 实现表单字段: name (Input), email (Input), subject (Input), message (Textarea)
- [X] T082 [US3] 添加表单验证错误提示(ErrorMessage 组件,红色文字,图标)
- [X] T083 [US3] 实现表单提交状态管理(loading, success, error 状态)
- [X] T084 [US3] 添加提交成功/失败提示(使用 shadcn/ui Dialog 或 Toast)

**步骤 2: API 端点**

- [X] T085 [US3] 实现联系表单 API app/api/contact/route.ts (POST 方法)
- [X] T086 [US3] 添加服务端 Zod 验证(二次验证,防止客户端绕过)
- [X] T087 [US3] 实现邮件发送逻辑(集成 Resend API 或其他邮件服务)
- [X] T088 [US3] 添加错误处理和日志记录
- [X] T089 [US3] 添加速率限制(防止垃圾提交,每分钟最多5次)

**步骤 3: 多语言支持**

- [X] T090 [US3] 为联系表单添加中文翻译 messages/zh.json (表单标签、占位符、错误消息、成功消息)
- [X] T091 [P] [US3] 为联系表单添加英文翻译 messages/en.json
- [X] T092 [P] [US3] 为联系表单添加日文翻译 messages/ja.json
- [X] T093 [US3] 验证表单在所有语言下正确显示错误提示

**步骤 4: 集成和测试**

- [X] T094 [US3] 将 ContactSection 添加到首页 app/[locale]/page.tsx (最后一个区块)
- [X] T095 [US3] 验证表单客户端验证正常工作(必填字段、邮箱格式)
- [X] T096 [US3] 验证表单提交成功路径(填写有效数据 → 提交 → 显示成功消息)
- [X] T097 [US3] 验证表单提交失败路径(服务器错误 → 保留用户输入 → 显示错误提示)
- [X] T098 [US3] 验证表单在不同语言下提交正常(locale 参数正确传递)
- [X] T099 [US3] 验证 E2E 测试通过(TDD 绿灯)

**检查点**: 现在所有用户故事都应独立功能。用户可以浏览产品信息、切换语言、提交咨询请求。

---

## 阶段 6: 完善与横切关注点

**目的**: 影响多个用户故事的改进和最终优化

- [X] T100 [P] 优化图片加载策略(英雄区背景 priority={true}, 其他图片 loading="lazy")
- [X] T101 [P] 实现移动端菜单 components/layout/mobile-menu.tsx (汉堡菜单,客户端组件,支持键盘导航)
- [X] T102 [P] 为移动端菜单添加测试 __tests__/unit/components/layout/mobile-menu.test.tsx
- [X] T103 [P] 集成移动端菜单到 Header (在移动设备上显示,桌面隐藏)
- [X] T104 [P] 添加页面过渡动画(使用 Tailwind 动画类,保持简约风格)
- [X] T105 [P] 实现错误处理页面 app/[locale]/error.tsx (全局错误边界)
- [X] T106 [P] 实现 404 页面 app/[locale]/not-found.tsx (多语言支持)
- [X] T107 生成 sitemap.xml (包含所有语言版本的 URL)
- [X] T108 [P] 创建 robots.txt (允许所有爬虫)
- [X] T109 [P] 添加 JSON-LD 结构化数据到首页(Organization, WebSite, Product schema)
- [X] T110 [P] 配置 favicon 和 app icons app/favicon.ico, app/icon.png
- [X] T111 运行完整测试套件,确保覆盖率达标(核心逻辑 80%+, 工具函数 90%+)
- [X] T112 [P] 运行 Lighthouse CI 审计,确保所有指标达标(Performance > 90, Accessibility = 100, SEO = 100)
- [X] T113 [P] 验证所有颜色对比度符合 WCAG AA 标准(至少 4.5:1)
- [X] T114 [P] 验证键盘导航在所有交互元素上正常工作(Tab, Enter, Esc)
- [X] T115 [P] 使用屏幕阅读器测试(NVDA 或 VoiceOver),确保所有内容可访问
- [X] T116 代码清理和重构(移除未使用的导入、优化组件结构、添加注释)
- [X] T117 更新 README.md (项目说明、安装步骤、开发指南、部署说明)
- [X] T118 准备生产部署配置(环境变量、Vercel 设置、自定义域名)

---

## 依赖关系与执行顺序

### 阶段依赖

- **设置(阶段 1)**: 无依赖 - 可立即开始
- **基础(阶段 2)**: 依赖于设置完成 - 阻塞所有用户故事
- **用户故事(阶段 3-5)**: 都依赖于基础阶段完成
  - 如果有人员配备,用户故事可以并行进行
  - 或按优先级顺序依次进行(P1 → P2 → P3)
- **完善(阶段 6)**: 依赖于所有期望的用户故事完成

### 用户故事依赖

- **用户故事 1(P1)**: 基础(阶段 2)后可开始 - 不依赖其他故事
- **用户故事 2(P2)**: 依赖用户故事 1(需要内容才能测试切换) - 但技术上可独立开发
- **用户故事 3(P3)**: 基础(阶段 2)后可开始 - 不依赖其他故事

### 每个用户故事内部

- **测试必须先编写并失败(TDD 红灯),然后再实施(绿灯),最后重构 - 这是强制性的**
- 翻译内容在组件之前(US1)
- 布局组件在页面区块之前(US1)
- 区块组件可并行开发(US1)
- 表单组件在 API 端点之前可并行开发(US3)
- 在进入下一个优先级之前完成故事
- 每个实施任务完成后,确保对应测试通过(TDD 绿灯)

### 并行机会

- 所有标记为 [P] 的设置任务可以并行运行
- 所有标记为 [P] 的基础任务可以并行运行(在阶段 2 内)
- 一旦基础阶段完成,如果团队容量允许,所有用户故事可以并行开始
- 故事内所有标记为 [P] 的测试可以并行运行
- 故事内标记为 [P] 的翻译文件、图片资源、独立组件可以并行运行
- 不同的用户故事可以由不同的团队成员并行工作

---

## 并行示例: 用户故事 1

```bash
# 一起启动用户故事 1 的所有测试(TDD 红灯阶段):
任务: "T025-T032 所有测试任务"

# 一起启动用户故事 1 的所有翻译内容:
任务: "T033 填充中文翻译"
任务: "T034 填充英文翻译"
任务: "T035 填充日文翻译"

# 一起启动用户故事 1 的所有图片资源:
任务: "T042 添加英雄区背景图片"
任务: "T045 添加特性图标"
任务: "T050 添加客户头像图片"
```

---

## 实施策略

### MVP 优先(仅用户故事 1)

1. 完成阶段 1:设置
2. 完成阶段 2:基础(关键 - 阻塞所有故事)
3. 完成阶段 3:用户故事 1
4. **停止并验证**:独立测试用户故事 1
5. 如果就绪则部署/演示(仅中文版本的完整产品介绍官网)

### 增量交付

1. 完成设置 + 基础 → 基础就绪
2. 添加用户故事 1 → 独立测试 → 部署/演示(MVP!仅中文)
3. 添加用户故事 2 → 独立测试 → 部署/演示(+多语言支持)
4. 添加用户故事 3 → 独立测试 → 部署/演示(+联系表单)
5. 每个故事在不破坏先前故事的情况下增加价值

### 并行团队策略

对于多个开发人员:

1. 团队一起完成设置 + 基础
2. 一旦基础完成:
   - 开发人员 A:用户故事 1(产品内容区块)
   - 开发人员 B:用户故事 2(语言切换)
   - 开发人员 C:用户故事 3(联系表单)
3. 故事独立完成并集成

---

## 注意事项

- **[P] 任务 = 不同文件,无依赖**
- **[故事] 标签将任务映射到特定用户故事以实现可追溯性**
- **每个用户故事应该是独立可完成和可测试的**
- **在实施之前验证测试失败(TDD 红灯)**
- **在每个任务或逻辑组后提交**
- **在任何检查点停止以独立验证故事**
- **确保每个用户故事的测试在实现之前编写(TDD 红-绿-重构循环)**
- **避免**:模糊任务、相同文件冲突、破坏独立性的跨故事依赖、跳过测试或在实现后补测试
