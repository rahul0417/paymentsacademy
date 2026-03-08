# FintechAcademy — Payments Knowledge Base Design

## Overview

A static Astro site deployed via GitHub Pages. A reference-style knowledge base where beginners and business/finance professionals can look up payments concepts with visual diagrams and a comprehensive glossary.

## Core Goal

Maximize time-on-site and drive continuous reading. Every design decision serves this: people arrive, understand quickly, and keep exploring.

## Source Material

Two EPUB books extracted and used as foundation, augmented with broader knowledge:

1. **The Anatomy of the Swipe: Making Money Move** — Ahmed Siddiqui & Nicholas Straight (2020)
2. **The Field Guide to Global Payments** — Sophia Goldberg (2022)

## Target Audience

- Complete beginners with zero payments knowledge
- Business/finance professionals in fintech

## Content Architecture

### Topic Pages (~25-30 articles)

Each topic page structure:
- Reading time estimate (e.g. "5 min read")
- TL;DR — 2-3 sentence summary at the top
- "What is X?" — plain-language explanation
- "How it works" — deeper mechanics with flow diagrams
- "Why it matters" — business context
- Key terms (linked to glossary with hover tooltips)
- Related Topics cards (3-4 links)

### Topics by Theme

| Theme | Topics |
|-------|--------|
| **Foundations** | Start Here: Anatomy of a Swipe, The Payments Ecosystem Overview |
| **The Transaction Lifecycle** | Authorization, Clearing & Settlement, Chargebacks & Disputes |
| **Card Ecosystem** | Card Networks (Visa/MC/Amex), Issuing Banks vs Acquiring Banks, Credit Cards vs Debit Cards, Interchange Fees, Acceptance Environments (POS/Online/Mobile) |
| **Non-Card Payments** | Bank-Based Payments (ACH/Wire/SEPA), Digital Wallets, Buy Now Pay Later, Cash & ATM, Crypto & DeFi |
| **Moving Money** | Cross-Border Payments, Push-to-Card, Real-Time Payments |
| **Products & Use Cases** | Virtual Cards, Expense Management, Subscriptions & Recurring, Marketplaces, B2B Payments |
| **Trust & Compliance** | KYC & Identity Verification, Compliance & Regulation, Fraud & Risk, Liability |

### Glossary Page

Alphabetical, searchable, each term links to its topic page.

### Homepage

Hero with "Start Here" CTA + browsable topic grid grouped by theme.

## Design & UX Decisions

- **Single-column editorial layout** with generous whitespace and strong typography
- **Warm, approachable color palette** — not cold fintech blue
- **Persistent sidebar nav** on topic pages (collapsible on mobile) grouped by theme
- **Client-side search** (Pagefind) — prominent on every page
- **Dark mode toggle**
- **Mobile-first responsive**
- **Progressive disclosure** — start simple, reveal depth
- **Cross-linking** — every topic links to related concepts (wiki rabbit hole effect)
- **Reading time indicators** on every article
- **Glossary hover tooltips** — key terms show definitions on hover
- **Related Topics cards** at bottom of every page (3-4 links)
- **Mermaid.js diagrams** inline in content

## Tech Stack

- Astro + MDX content collections
- Tailwind CSS
- Mermaid.js for diagrams
- Pagefind for search
- GitHub Pages + GitHub Actions

## Excluded (YAGNI)

- No user accounts, progress tracking, or gamification
- No comments or community features
- No code samples or API references
- No certifications
- No multi-language support
