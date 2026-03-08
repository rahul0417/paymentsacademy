# FintechAcademy Updates Design

## 1. Branding Update — Panasa Tech Palette

**Colors:**
- Racing Green: #0D4D2B (primary — headings, dark backgrounds, nav, buttons)
- Pale Mint: #E8F5E9 (secondary — light backgrounds, cards, hover states)
- Candlelight Peach: #FFDAB3 (accent — CTAs, highlights, badges, interactive elements)
- White: #FFFFFF (base background)

**Fonts:** Modern SaaS — clean, geometric sans-serifs with high contrast.

**Apply to:** global.css, Header, Footer, Hero, TopicCard, Sidebar, TopicLayout, GlossaryTerm, all components.

## 2. Content Update — Issuer & Acquirer Processors

- Add "Issuer Processors" and "Acquirer Processors" topics to Card Ecosystem theme
- Update "Anatomy of a Swipe" article to include processors in transaction flow
- Update homepage coming-soon list

## 3. Source Ingestion Pipeline

- scripts/ingest.mjs — extracts text from PDF/DOCX/PPTX/EPUB
- Source/extracted/ — output directory
- npm run ingest command
