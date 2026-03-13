# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fintech Academy (payments-academy) — a static educational site about the payments ecosystem, built with Astro 5 + MDX + Tailwind CSS 4. Hosted at `https://fintechacademy.panasatech.com`.

## Commands

- `npm run dev` — Start dev server at localhost:4321
- `npm run build` — Production build to `./dist/` (automatically runs Pagefind indexing via `postbuild`)
- `npm run preview` — Preview production build locally
- `npm run ingest` — Extract text from PDFs/DOCX/PPTX/EPUB in `Source/` directory to `Source/extracted/`

## Architecture

### Content System

Topics are MDX files in `src/content/topics/`. The content collection is defined in `src/content.config.ts` with a Zod schema requiring: `title`, `description`, `theme` (one of 7 enum values), `readingTime`, `order`, and optional `relatedTopics[]` and `glossaryTerms[]`.

The 7 themes (defined in `src/data/themes.ts`): Foundations, Transaction Lifecycle, Card Ecosystem, Non-Card Payments, Moving Money, Products & Use Cases, Trust & Compliance. Topics are sorted by `order` within each theme.

### Navigation & Discovery

- **Learning paths** (`src/data/learning-paths.ts`): 4 curated sequences + a quick-start path. `getPathForSlug()` maps a topic slug to its path context for prev/next navigation.
- **Glossary** (`src/data/glossary.json`): 137+ fintech terms with definitions and topic links, rendered with client-side search/filtering.
- **Search**: Pagefind (static search index generated at build time, no backend).

### Routing

- `/` — Homepage topics grid
- `/topics/[...slug]` — Dynamic SSG routes from MDX content collection
- `/learn` — Learning paths overview
- `/glossary` — Searchable glossary

### Layouts & Components

`BaseLayout.astro` wraps all pages (header/footer). `TopicLayout.astro` extends it with sidebar navigation, article styling, and path nav.

Key components: `MermaidDiagram.astro` (Mermaid.js with fullscreen expand), `Search.astro` (Pagefind modal, `/` to open), `ThemeToggle.astro` (dark/light mode via `data-theme` attribute on `<html>`, persisted to localStorage), `Sidebar.astro` (collapsible topic tree by theme), `PathNav.astro` (prev/next within learning path).

### Styling

Tailwind CSS 4 with `@tailwindcss/typography`. Design tokens in `src/styles/global.css`: Racing Green (#063622), Pale Mint, Peach color palette. Fonts: Plus Jakarta Sans (headings), Inter (body). Dark mode uses `data-theme="dark"` attribute, not Tailwind's `dark:` class.

### Ingest Pipeline

`scripts/ingest.mjs` extracts text from source documents in `Source/` using pdf-parse, mammoth, and adm-zip. Hash-based change detection skips unchanged files. Output goes to `Source/extracted/` with a `manifest.json` tracker.
