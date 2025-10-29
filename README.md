# Cyborg VPN Product Website

A modern, multi-language VPN product website built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🎯 Project Status

**Foundation Setup**: ✅ Complete (Phases 1-2: Tasks T001-T024)

The project foundation has been fully configured and is ready for feature implementation.

## 🏗️ Technology Stack

### Core Framework
- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript 5+** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### Key Libraries
- **next-intl** - Internationalization (i18n) for Chinese, English, Japanese
- **shadcn/ui** - High-quality React components
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library

### Testing
- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Installation

Install dependencies using your preferred package manager:

```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

## 🚀 Getting Started

### Development Server

```bash
# Start development server
pnpm dev

# Open browser
# http://localhost:3000/zh (Chinese)
# http://localhost:3000/en (English)
# http://localhost:3000/ja (Japanese)
```

### Build for Production

```bash
# Build
pnpm build

# Start production server
pnpm start
```

### Testing

```bash
# Run unit and integration tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run E2E tests in UI mode
pnpm test:e2e:ui
```

### Code Quality

```bash
# Lint code
pnpm lint

# Format code
pnpm format
```

## 📁 Project Structure

```
cyborg-official/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Internationalized routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── api/                # API routes
│   └── globals.css         # Global styles
│
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections (Hero, Features, etc.)
│   └── layout/             # Layout components (Header, Footer)
│
├── lib/                    # Utility functions
│   ├── i18n/               # i18n configuration
│   ├── utils.ts            # Utility functions
│   └── validations.ts      # Zod schemas
│
├── messages/               # Translation files
│   ├── zh.json             # Chinese
│   ├── en.json             # English
│   └── ja.json             # Japanese
│
├── public/                 # Static assets
│   └── images/             # Image files
│
├── types/                  # TypeScript type definitions
│   ├── index.ts            # Global types
│   ├── components.ts       # Component Props types
│   └── api.ts              # API types
│
├── __tests__/              # Test files
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/                # End-to-end tests
│
└── specs/                  # Project specifications
    └── 001-vpn-product-website/
        ├── spec.md         # Feature specification
        ├── plan.md         # Implementation plan
        ├── tasks.md        # Task breakdown
        ├── data-model.md   # Data models
        ├── research.md     # Technical decisions
        └── quickstart.md   # Quick start guide
```

## 🌍 Internationalization

The website supports three languages:
- 🇨🇳 Chinese (zh) - Default
- 🇺🇸 English (en)
- 🇯🇵 Japanese (ja)

Language switching is handled via URL parameters (`/zh`, `/en`, `/ja`) and automatically detects user browser preferences.

## 🎨 Design System

The project uses a **minimalist cold color palette**:
- Primary: Deep Blue (#1e3a8a - blue-900)
- Secondary: Slate (#475569 - slate-600)
- Accent: Sky Blue (#0ea5e9 - sky-500)
- Background: Very Dark Slate (#0f172a - slate-900)
- Foreground: Light Slate (#e2e8f0 - slate-200)

All components follow the **shadcn/ui** design system for consistency.

## 📋 Implementation Progress

### ✅ Completed (24/118 tasks)

**Phase 1: Setup** (T001-T014) - ✅ Complete
- [x] T001: Next.js 14 project structure
- [x] T002: Core dependencies (package.json)
- [x] T003-T005: shadcn/ui setup (pending component installation)
- [x] T006: Directory structure
- [x] T007: Tailwind cold color theme
- [x] T008: Jest configuration
- [x] T009: Playwright configuration
- [x] T010: i18n configuration
- [x] T011: next-intl middleware
- [x] T012: TypeScript types setup
- [x] T013: Utility functions
- [x] T014: Translation files (initial structure)

**Phase 2: Foundation** (T015-T024) - ✅ Complete
- [x] T015: Global types
- [x] T016: Component Props types
- [x] T017: API types
- [x] T018: Zod validation schemas
- [x] T019: Root layout with NextIntlClientProvider
- [x] T020: Global styles with cold color theme
- [x] T021: Next.js configuration
- [x] T022: TypeScript configuration
- [x] T023: ESLint and Prettier configuration
- [x] T024: Environment variable template

### 📝 Next Steps (94 remaining tasks)

**Phase 3: User Story 1 - Product Information (P1)** (T025-T061) - 37 tasks
- Product content sections (Hero, Features, About, Testimonials, Pricing, FAQ)
- Layout components (Header, Footer)
- Responsive design and accessibility
- TDD implementation (tests before implementation)

**Phase 4: User Story 2 - Language Switching (P2)** (T062-T074) - 13 tasks
- Language switcher component
- Multi-language metadata
- Language persistence

**Phase 5: User Story 3 - Contact Form (P3)** (T075-T099) - 25 tasks
- Contact form with validation
- API endpoint
- Email integration

**Phase 6: Polish** (T100-T118) - 19 tasks
- Mobile menu
- Error pages
- SEO optimization
- Final testing and deployment

## 🧪 Testing Strategy

This project follows **Test-Driven Development (TDD)**:

1. **Red**: Write failing tests first
2. **Green**: Implement minimum code to pass
3. **Refactor**: Optimize while keeping tests green

### Test Coverage Goals
- Core business logic: 80%+
- Public APIs: 100%
- Utility functions: 90%+
- UI component interactions: Key paths tested

## 📖 Development Workflow

### TDD Cycle Example

```bash
# 1. Write a failing test
# __tests__/unit/components/sections/hero-section.test.tsx

# 2. Run tests (should fail - RED)
pnpm test

# 3. Implement component
# components/sections/hero-section.tsx

# 4. Run tests (should pass - GREEN)
pnpm test

# 5. Refactor if needed
# Optimize code while keeping tests green

# 6. Commit
git add .
git commit -m "feat: implement hero section with tests"
```

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS + theme
- `tsconfig.json` - TypeScript compiler options
- `jest.config.js` - Jest test configuration
- `playwright.config.ts` - Playwright E2E configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `middleware.ts` - next-intl middleware
- `i18n/request.ts` - i18n configuration

## 🌐 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=zh
# CONTACT_EMAIL_TO=contact@cyborg-vpn.com
# RESEND_API_KEY=re_xxxxx
```

## 📚 Documentation

Detailed project documentation is available in `specs/001-vpn-product-website/`:
- `spec.md` - Feature requirements and user stories
- `plan.md` - Technical architecture and decisions
- `tasks.md` - Complete task breakdown (118 tasks)
- `data-model.md` - Data structures and types
- `research.md` - Technology research and decisions
- `quickstart.md` - Quick start development guide

## 🚦 Quality Standards

All code must meet these standards:
- ✅ TypeScript compilation (no errors)
- ✅ ESLint passing (no violations)
- ✅ All tests passing
- ✅ Test coverage meets thresholds
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ WCAG 2.1 AA accessibility
- ✅ Lighthouse score > 90 (Performance, Accessibility, SEO)

## 🤝 Contributing

1. Follow the task list in `specs/001-vpn-product-website/tasks.md`
2. Implement TDD (tests before code)
3. Ensure all quality checks pass
4. Follow the established project structure
5. Write clear commit messages

## 📄 License

Private project for Cyborg VPN.

---

**Ready to implement!** Start with Phase 3 (User Story 1) to build the MVP product information pages.
