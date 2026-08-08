# UI Refresh Baseline Audit

Audit date: 2026-08-08

## Repository Baseline

- Repository: `https://github.com/zhengyong/life-operating-system.git`
- Remote: `origin`
- Default branch: `main`
- Base commit: `def1bf480401331782c4c8de8cbb1cc6e2d26e9e`
- Base commit subject: `Add SEO topic hubs and unify canonical domain`
- Working branch: `ui-refresh/figma-2026`
- Starting status: clean

This checkout was created from the current formal `main` branch. No code, route, content migration, CSS, component, or QA artifact from the previous `redesign/figma-2026` branch is part of this baseline.

## Stack

- Framework: Next.js 14.2 App Router with static export
- UI runtime: React 18.3
- Language: TypeScript 5.7
- Styling: existing Tailwind CSS 3.4 plus `app/globals.css`
- Icons: Lucide React
- Content: bilingual Markdown articles, JSON book previews, and typed TypeScript data modules
- Search: generated static index at `public/search-index.json`
- SEO: Next metadata, canonical and language alternates, sitemap, robots, OpenGraph, Twitter metadata, RSS, and JSON-LD
- URL policy: trailing slash enabled

## Primary Navigation

The primary navigation is defined in `components/Header.tsx` and localized by `messages/zh.json` and `messages/en.json`.

| Order | Chinese | English | Route |
| --- | --- | --- | --- |
| 1 | 首页 | Home | `/{locale}/` |
| 2 | 关于 | About | `/{locale}/about/` |
| 3 | 框架 | Framework | `/{locale}/books/` |
| 4 | 人生 | Life | `/{locale}/life/` |
| 5 | 职场 | Career | `/{locale}/career/` |
| 6 | 教育 | Education | `/{locale}/education/` |
| 7 | 人物 | People | `/{locale}/people/` |
| 8 | 公司 | Companies | `/{locale}/companies/` |
| 9 | 文章 | Articles | `/{locale}/articles/` |
| 10 | 分类 | Categories | `/{locale}/categories/` |
| 11 | 标签 | Tags | `/{locale}/tags/` |
| 12 | 联系 | Contact | `/{locale}/contact/` |

Search and the `ZH` / `EN` locale switch are separate header actions. The footer also links to Privacy and selected external company sites.

## Core URLs

The following Chinese routes all exist and must retain their current paths:

- `/zh/`
- `/zh/about/`
- `/zh/books/`
- `/zh/life/`
- `/zh/career/`
- `/zh/education/`
- `/zh/people/`
- `/zh/companies/`
- `/zh/articles/`
- `/zh/topics/`
- `/zh/categories/`
- `/zh/tags/`
- `/zh/contact/`
- `/zh/privacy/`

The same route set exists under `/en/`. The root `/` redirects to the Chinese homepage.

Dynamic route families that must be preserved:

- `/{locale}/articles/{slug}/`
- `/{locale}/articles/page/{page}/`
- `/{locale}/categories/{slug}/`
- `/{locale}/tags/{slug}/`
- `/{locale}/topics/{slug}/`
- `/{locale}/people/{slug}/`
- `/{locale}/people/{slug}/lessons/{lesson}/`
- `/{locale}/companies/{slug}/`
- `/{locale}/companies/{slug}/timeline/`
- `/{locale}/books/recommendations/{slug}/`
- `/{locale}/books/recommendations/{slug}/preview/{chapter}/`

At the audited base commit, `app/sitemap.ts` produces 1,207 URLs.

## Page Types

The repository contains all requested page types:

- Home
- About
- Framework / Books
- Life
- Career
- Education
- Contact
- People index and person detail
- Person lesson
- Companies index, company detail, and company timeline
- Categories index and category detail
- Tags index and tag detail
- Articles index, pagination, and article detail
- Topics index and topic detail
- Book recommendation and book preview chapter
- Search overlay
- Responsive navigation and footer
- Privacy

## Content Inventory

| Content type | Chinese | English | Total / notes |
| --- | ---: | ---: | --- |
| Published articles | 264 | 264 | 528 files, 264 bilingual pairs |
| Categories | 11 | 11 | 11 declared category keys |
| Tags | 168 | 168 | Derived from article metadata |
| SEO Topics | 5 | 5 | 5 bilingual topic definitions |
| People | 8 | 8 | All 8 are public |
| Companies | 8 | 8 | All 8 are public |
| Person lessons | 24 | 24 | All 24 are public |
| Book architecture nodes | 10 | 10 | Recommendation routes |
| Book preview manuscripts | 6 | 6 | 62 chapters per language |

The six book preview manuscripts are Life Operating System, Cognitive Mindset, Knowledge Foundation, World Models, Breakthrough Methods, and Productivity Tools. The repository also exposes seven book entries in the general content model.

## Primary Page Structure

The UI refresh must preserve every existing content block and its order. The primary long-form landing pages currently expose:

- Life: 9 top-level sections: philosophy, awareness, relationships, family, wealth, health, decisions, cases, review.
- Career: 8 top-level sections: philosophy, path, growth, company, entrepreneurship, model, cases, review.
- Education: 6 top-level sections: philosophy, framework, stages, practice, cases, resources.
- About: hero/profile, facts, core competencies, professional experience, education/research, values, and contact.
- Home: hero, introduction, knowledge system, focused topics, latest articles, and footer.

The professional experience period is stored as `2019 - 2025` in `lib/about.ts` and must remain unchanged in meaning and dates.

## UI-Only Protection Rules

The following are frozen against `main` for this project:

- Navigation labels, order, and destinations
- Existing route patterns, slugs, canonical URLs, and trailing-slash behavior
- Article files, titles, metadata, categories, topics, and tags
- People, company, lesson, and book data
- Life, Career, and Education section counts and source order
- Content loaders, search indexing, sitemap, robots, RSS, metadata, OpenGraph, and JSON-LD behavior
- Chinese and English page relationships

Allowed changes are visual presentation and responsive layout: typography, colors, spacing, grids, component styling, navigation behavior, stacking, gaps, padding, and card widths.

## Source-of-Truth Rule

- Content, structure, URL, taxonomy, and SEO conflicts: current repository wins.
- Visual styling, layout, responsive behavior, and component appearance conflicts: the supplied Figma file wins.
- Figma sample copy does not replace repository copy. The current repository already uses `Build Your Life Operating System` as the Chinese and English home hero title, so that text is valid to retain.
