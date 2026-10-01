# Portfolio v2 — Technical Architecture & React 19 Performance Guide

This document is the single source of truth for `portfolio_v2` technical architecture, React 19 App Router primitives, theming token systems, and performance boundaries.

---

## 1. Core Tech Stack & Build System

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack).
- **Tooling**: [Bun](https://bun.sh/) (`bun dev`, `bun run build`) + [Biome](https://biomejs.dev/) for formatting, linting, and import sorting (`biome.jsonc`).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) mapped to CSS variables (`@theme inline` in `app/globals.css`).
- **Theming**: [`next-themes`](https://github.com/pacocoursey/next-themes) with class-based (`.dark`) mode switching. Default theme is Dark Mode (`defaultTheme="dark"`, `enableSystem={false}`).

---

## 2. React 19 & Next.js App Router Architecture

### A. Strict Server vs. Client Component Boundaries
Interactive client-side logic is pushed to the leaves of the component tree to preserve `0 kB` client bundle size for static layouts:
- **`ContactSection.tsx` (Server Component)** renders static typography, headings, and outreach links on the server.
- **`ContactForm.tsx` (Client Component)** encapsulates strictly the interactive `<form>`.
- **`SkillsMarquee.tsx` (Server Component)** pre-renders static marquee items and categories; **`CategoryViewToggle.tsx` (Client Component)** encapsulates only the toggle state.
- **Dynamic Imports (`next/dynamic`)**: Heavy modal components (`ExperienceModal.tsx`, `AcademicModal.tsx`) and the client diagram renderer (`Mermaid.tsx`) are lazy-loaded via `dynamic(..., { ssr: false })` so charting and detail views download only on interaction.

### B. React 19 Form Actions & State Primitives
Form processing eliminates manual `useState` loading flags and `e.preventDefault()` handlers:
- **`useActionState`**: Used in `ContactForm.tsx` to bind form state and errors directly to server action `app/actions/contact.ts`.
- **`useFormStatus`**: Used in form submit buttons to reactively detect pending status and disable inputs without prop drilling.

### C. Automatic Memoization & Data Computation
- **No Manual Memoization**: Do not add `useMemo` or `useCallback` for standard component renders. The React 19 Compiler handles auto-memoization at build time.
- **Pre-computed Server Loops**: Complex category transformations or array looping (`SKILLS_DATA`, `INDUSTRY_EXPERIENCE`) are processed during SSG/RSC on the server.

### D. Hydration Safety with `useSyncExternalStore`
Client-only icons and interactive toggles prone to SSR/client discrepancies use `React.useSyncExternalStore` to cleanly prevent layout shifts (`CLS = 0`) without cascading re-render loops.

---

## 3. Theming & Semantic Color Tokens (`app/globals.css`)

Never hardcode arbitrary palette classes (e.g. `bg-zinc-900` or `text-gray-400`). Use semantic tokens mapped to CSS variables:

| Semantic Class | Light Mode (`:root`) | Dark Mode (`.dark`) | Purpose |
| :--- | :--- | :--- | :--- |
| `bg-bg-primary` | `#FAFAFA` (Clean off-white) | `#0A0D14` (Obsidian) | Root page and modal backdrops |
| `bg-bg-card` | `#FFFFFF` (Card surface) | `rgba(255,255,255,0.015)` | Card, input, button surfaces |
| `border-border-card` | `#E5E7EB` (Subtle gray) | `rgba(255,255,255,0.06)` | Borders and dividers |
| `text-text-primary` | `#111827` (Charcoal) | `#F8FAFC` (High-contrast white)| Primary titles and headings |
| `text-text-secondary` | `#4B5563` (Slate gray) | `#CBD5E1` (Soft slate) | Body copy and descriptions |
| `text-text-muted` | `#9CA3AF` (Muted gray) | `#64748B` (Muted slate) | Dates, index tags, metadata |
| `text-accent` / `bg-accent` | `#059669` (Editorial emerald) | `#34D399` (Vibrant emerald)| Primary CTAs and active states |
| `bg-accent-subtle` | `rgba(16,185,129,0.08)` | `rgba(16,185,129,0.08)` | Hover fills and badge backgrounds |

---

## 4. Single Source of Truth (`lib/data.ts`)

All public data, resume tracks, certifications, and project links live in `lib/data.ts` (typed via `lib/types.ts`):
- `HERO_DATA`: Headline, persona badge, and primary CTA URLs.
- `CERTIFICATIONS`: Credly URLs, badge images, and verification metadata.
- `FEATURED_PROJECTS`: Production systems (FinOps Agent, ML Platform, ArXiv SLM) displayed in Section 03.
- `SKILLS_DATA`: All category-grouped technologies.
- `INDUSTRY_EXPERIENCE` & `ACADEMIC_INSTITUTIONS`: Timeline cards and modal deep-dive contents.
- `SOCIAL_LINKS`: GitHub, LinkedIn, email, and Hugging Face handles.

---

## 5. Development & Verification Commands

```bash
# Start local development server (Turbopack) on http://localhost:3000
bun dev

# Run Biome lint & format check
npm run lint

# Write Biome formatting across JS/TS/JSON/CSS
npm run format

# Production build check
bun run build
```
