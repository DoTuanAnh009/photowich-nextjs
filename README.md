# SEO Photo CMS - Frontend

Website dịch vụ chụp ảnh chuyên nghiệp, tối ưu SEO, CMS-driven.

## 🎯 Tổng quan dự án

| Thuộc tính | Giá trị |
|------------|---------|
| **Stack** | Next.js 16 + React 19 + TypeScript + Tailwind CSS |
| **CMS** | Strapi (Headless CMS) |
| **Mục tiêu** | SEO-first, Lead generation |
| **Thị trường** | US / Global |
| **Kiến trúc** | CMS-driven, Server Components |

---

## 📁 Cấu trúc thư mục

```
frontend/
├── 📄 .env.local              # Biến môi trường (secrets - không commit)
├── 📄 .env.example            # Template biến môi trường (commit được)
├── 📄 .gitignore              # Files không commit lên git
├── 📄 eslint.config.mjs       # Cấu hình ESLint (code quality)
├── 📄 next.config.ts          # Cấu hình Next.js
├── 📄 next-env.d.ts           # TypeScript definitions cho Next.js
├── 📄 package.json            # Dependencies và scripts
├── 📄 postcss.config.mjs      # Cấu hình PostCSS (cho Tailwind)
├── 📄 tsconfig.json           # Cấu hình TypeScript
├── 📄 README.md               # File này
│
├── 📁 public/                 # Static assets (robots.txt, favicon...)
│
└── 📁 src/                    # Source code chính
    ├── 📁 app/                # Next.js App Router (pages + layouts)
    ├── 📁 components/         # React components
    ├── 📁 lib/                # Utilities, helpers, API clients
    └── 📁 types/              # TypeScript type definitions
```

---

## 📄 Chi tiết từng file

### 🔐 Environment Files

#### `.env.local`
```bash
# Strapi API Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=

# Site Configuration  
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

| Biến | Mô tả | Prefix |
|------|-------|--------|
| `NEXT_PUBLIC_STRAPI_URL` | URL của Strapi API | `NEXT_PUBLIC_` = Có thể dùng ở client |
| `STRAPI_API_TOKEN` | API token để authenticate | Không prefix = Chỉ server |
| `NEXT_PUBLIC_SITE_URL` | URL của website frontend | `NEXT_PUBLIC_` = Có thể dùng ở client |

> ⚠️ **KHÔNG BAO GIỜ commit `.env.local`** - chứa secrets

#### `.env.example`
Template cho team members. Copy thành `.env.local` và điền giá trị thật.

---

### ⚙️ Config Files

#### `next.config.ts`
```typescript
// Cấu hình Next.js
{
  reactStrictMode: true,      // Bật strict mode để phát hiện bugs
  
  images: {
    remotePatterns: [...]     // Whitelist domains cho next/image
  },
  
  logging: {
    fetches: { fullUrl: true } // Log đầy đủ URL khi fetch (debug)
  }
}
```
**Mục đích:** 
- Cho phép load images từ Strapi server
- Cấu hình build/runtime behaviors

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]      // Import alias: @/lib/strapi thay vì ../../lib/strapi
    }
  }
}
```
**Mục đích:** TypeScript compiler settings, path aliases

#### `eslint.config.mjs`
**Mục đích:** Quy tắc code quality, bắt lỗi trước khi chạy

#### `postcss.config.mjs`
**Mục đích:** PostCSS plugins, cần thiết để Tailwind CSS hoạt động

#### `package.json`
```json
{
  "scripts": {
    "dev": "next dev",        // Chạy development server
    "build": "next build",    // Build production
    "start": "next start",    // Chạy production server
    "lint": "eslint"          // Kiểm tra code quality
  }
}
```

---

## 📁 src/app/ - App Router

Next.js App Router sử dụng **file-system routing**.

```
src/app/
├── 📄 layout.tsx      # Root layout (wrapper cho tất cả pages)
├── 📄 page.tsx        # Homepage (route: /)
├── 📄 globals.css     # Global styles (Tailwind imports)
└── 📄 favicon.ico     # Website icon
```

### `layout.tsx` - Root Layout

```typescript
// Chạy ở: SERVER
// Mục đích: Wrapper HTML cho toàn bộ website

export const metadata: Metadata = {
  title: {
    template: "%s | Your Site Name",  // Format title cho mọi page
    default: "Your Site Name",
  },
  // ... SEO defaults
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>      {/* Mọi page render vào đây */}
    </html>
  );
}
```

**Tại sao cần?**
- Định nghĩa HTML structure chung
- SEO metadata mặc định
- Font loading
- Global providers (nếu cần)

### `page.tsx` - Homepage

```typescript
// Chạy ở: SERVER
// Route: /
// Mục đích: Fetch data từ Strapi, render homepage

async function getHomepage() {
  // Gọi Strapi API trên server
  const { data } = await fetchStrapi<Homepage>({...});
  return data;
}

export async function generateMetadata() {
  // SEO metadata từ CMS
}

export default async function HomePage() {
  const homepage = await getHomepage();
  return <DynamicZone sections={homepage.sections} />;
}
```

**Pattern quan trọng:**
1. `async function` - Fetch data trên server
2. `generateMetadata()` - SEO metadata động từ CMS
3. `DynamicZone` - Render sections dựa trên CMS data

---

## 📁 src/lib/ - Utilities

```
src/lib/
├── 📄 strapi.ts       # Strapi API client
└── 📄 seo.ts          # SEO utilities
```

### `strapi.ts` - API Client

```typescript
// Mục đích: Centralized fetch cho Strapi API

export async function fetchStrapi<T>({
  endpoint,      // "/homepage", "/services"
  query,         // { populate: "deep" }
  tags,          // ["homepage"] - cho cache invalidation
  revalidate,    // 60 - cache 60 giây
}): Promise<StrapiResponse<T>>

export function getStrapiMediaUrl(url: string): string
// Chuyển relative URL thành absolute URL cho images
```

**Tại sao cần file riêng?**
- **DRY** - Không lặp lại logic fetch ở mỗi page
- **Centralized** - Thay đổi 1 chỗ, áp dụng toàn app
- **Type-safe** - Generic `<T>` cho TypeScript
- **Caching** - Next.js cache config tập trung

### `seo.ts` - SEO Utilities

```typescript
// Mục đích: Generate metadata chuẩn SEO

export function generatePageMetadata({
  title,
  description,
  canonicalUrl,
  ogImage,
  pathname,
}): Metadata

export function generateOrganizationSchema(...)  // JSON-LD
export function generateServiceSchema(...)       // JSON-LD
```

**Tại sao cần?**
- Metadata format nhất quán
- Không quên canonical, og:image...
- Hỗ trợ JSON-LD structured data

---

## 📁 src/components/ - React Components

```
src/components/
├── 📁 dynamic-zone/
│   └── 📄 index.tsx       # Dynamic Zone renderer
│
└── 📁 ui/
    └── 📄 StrapiImage.tsx # Image wrapper cho Strapi media
```

### `dynamic-zone/index.tsx` - Core Pattern

```typescript
// Mục đích: Map __component từ Strapi → React component

const componentRegistry = {
  'sections.hero': Hero,
  'sections.cta': CTA,
  // Thêm components ở đây
};

export function DynamicZone({ sections }) {
  return sections.map((section) => {
    const Component = componentRegistry[section.__component];
    return <Component key={section.id} data={section} />;
  });
}
```

**Đây là CORE của CMS-driven architecture:**
```
Strapi Dynamic Zone → __component field → React component
```

### `ui/StrapiImage.tsx` - Image Component

```typescript
// Mục đích: Wrapper cho Next.js Image + Strapi media

export function StrapiImage({
  media,           // Strapi media object
  variant,         // 'thumbnail' | 'small' | 'medium' | 'large' | 'original'
  fill,            // Fill container mode
  priority,        // LCP optimization
}) {
  // Xử lý URL transformation
  // Xử lý responsive formats
  // Fallback nếu media null
}
```

**Tại sao không dùng `<Image>` trực tiếp?**
- Strapi trả về relative URL → cần transform
- Strapi có formats (thumbnail, small...) → cần logic chọn
- Null-safe handling
- Alt text từ Strapi

---

## 📁 src/types/ - TypeScript Definitions

```
src/types/
└── 📄 strapi.ts       # Types cho Strapi API responses
```

### `strapi.ts` - Type Definitions

```typescript
// Base types
interface StrapiMedia { id, url, alternativeText, formats... }
interface StrapiSEO { title, description, canonicalUrl... }

// Dynamic Zone components
interface HeroComponent { __component: 'sections.hero', title, subtitle... }
interface CTAComponent { __component: 'sections.cta', buttonText... }

// Content types
interface Homepage { id, seo, sections: DynamicZoneComponent[] }
interface ServicePage { id, slug, title, seo, sections... }
```

**Tại sao quan trọng?**
- **IDE autocomplete** - Không cần nhớ field names
- **Compile-time errors** - Bắt lỗi trước khi chạy
- **Documentation** - Types là docs sống
- **Refactoring** - Rename an toàn

---

## 🔄 Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   STRAPI    │────▶│  NEXT.JS    │────▶│   BROWSER   │
│   (CMS)     │     │  (Server)   │     │   (Client)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
   Content            Fetch data           Receive
   Editor             + Render             HTML
       │                   │                   │
       ▼                   ▼                   ▼
   Dynamic Zone     Server Component      SEO-ready
   + SEO fields     + generateMetadata    Full content
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Configure .env.local với Strapi URL + Token

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

---

## 📋 Checklist khi thêm feature mới

### Thêm page mới (vd: `/services`)
- [ ] Tạo `src/app/service/page.tsx`
- [ ] Tạo fetch function
- [ ] Thêm `generateMetadata()`
- [ ] Update types nếu cần

### Thêm section component mới
- [ ] Tạo component trong `src/components/sections/`
- [ ] Thêm type trong `src/types/strapi.ts`
- [ ] Register trong `dynamic-zone/index.tsx`

### Thêm API endpoint mới
- [ ] Thêm function trong `src/lib/strapi.ts`
- [ ] Thêm types tương ứng

---

## 🎯 Nguyên tắc code

1. **Server Components mặc định** - Chỉ dùng "use client" khi cần tương tác
2. **CMS là single source of truth** - Không hardcode content
3. **Defensive coding** - Luôn handle null/undefined
4. **Type everything** - Không dùng `any`
5. **SEO-first** - Mọi page đều có metadata
