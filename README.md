# FintechAcademy

FintechAcademy is an Astro-powered learning site for payments and fintech concepts. It combines long-form topic pages, quizzes, and micro-learning review decks to help readers build structured domain knowledge.

## Stack

- Astro 5
- MDX content collections
- Tailwind CSS 4
- Pagefind for client-side search

## Project layout

```text
src/
  components/    UI building blocks
  content/       MDX topic content
  data/          Static datasets and client-side progress helpers
  layouts/       Shared page shells
  pages/         Route entrypoints
scripts/
  ingest.mjs     Source document extraction pipeline
tests/
  *.test.ts      Lightweight regression tests
```

## Getting started

```sh
npm install
npm run dev
```

## Validation

```sh
npm run check
npm run test
npm run build
```

Or run the full validation sequence:

```sh
npm run validate
```

## Content and search

- Topic content lives in `src/content/topics/*.mdx`.
- Search is generated at build time by Pagefind during `postbuild`.
- Quizzes and micro-learning decks are defined in `src/data/`.

## Source ingestion

The ingestion pipeline scans `Source/` for supported source documents and writes extracted text into `Source/extracted/`.

```sh
npm run ingest
```

Supported inputs:

- `.pdf`
- `.docx`
- `.pptx`
- `.epub`
- `.txt`

## Progress storage

Reader progress is stored locally in the browser under the `fa-progress` key. The shared helpers for progress reads, writes, and migrations live in `src/data/progress.ts`.
