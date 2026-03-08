# FintechAcademy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static Astro knowledge base site for learning payments fundamentals, with ~25 topic articles, visual diagrams, glossary, and search.

**Architecture:** Astro static site with MDX content collections for topics and glossary. Tailwind CSS for styling with a warm editorial design. Mermaid.js for payment flow diagrams. Pagefind for client-side search. Deployed via GitHub Pages.

**Tech Stack:** Astro 5, MDX, Tailwind CSS 4, Mermaid.js, Pagefind, GitHub Actions

**Approach:** Build one complete vertical slice first (scaffold + one topic + all components), get user approval on look & feel, then batch remaining content and features.

---

## Phase 1: Proof of Concept (Single Topic, Full Stack)

Build everything needed to see ONE complete topic page end-to-end: project setup, layouts, components, homepage stub, and the "Anatomy of a Swipe" article with diagram, glossary tooltips, and related topics.

### Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/pages/index.astro`
- Create: `.gitignore`

**Step 1: Scaffold Astro project**

```bash
cd /Users/rahulchandra/01_Work/Projects/FintechAcademy
npm create astro@latest . -- --template minimal --no-install --no-git
```

**Step 2: Install dependencies**

```bash
npm install
npm install @astrojs/mdx @astrojs/tailwind tailwindcss @tailwindcss/typography mermaid
```

**Step 3: Configure Astro integrations in `astro.config.mjs`**

**Step 4: Verify dev server starts**

```bash
npm run dev
```

**Step 5: Commit**

---

### Task 2: Design System & Base Layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

Use `frontend-design` skill for this task. Build:
- Global styles: warm color palette (stone/amber tones), editorial typography, generous whitespace
- BaseLayout: HTML shell with head, header, main, footer
- Header: site title "FintechAcademy", nav links (Home, Glossary), search placeholder
- Footer: simple attribution

**Commit after completion.**

---

### Task 3: Content Collection & Topic Layout

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/topics/` (directory)
- Create: `src/layouts/TopicLayout.astro`
- Create: `src/components/Sidebar.astro`
- Create: `src/components/RelatedTopics.astro`
- Create: `src/components/GlossaryTerm.astro`
- Create: `src/components/MermaidDiagram.astro`
- Create: `src/pages/topics/[...slug].astro`

Build the topic page experience:
- Content collection schema (title, description, theme, readingTime, order, relatedTopics, glossaryTerms)
- TopicLayout: sidebar + reading time badge + TL;DR callout + article body + related topics cards
- Sidebar: all topics grouped by theme, current page highlighted
- RelatedTopics: 3-4 cards at bottom linking to related articles
- GlossaryTerm: inline dotted-underline with hover tooltip
- MermaidDiagram: client-side Mermaid renderer styled to match the site
- Dynamic route for topic pages

**Commit after completion.**

---

### Task 4: Write "Anatomy of a Swipe" Article

**Files:**
- Create: `src/content/topics/anatomy-of-a-swipe.mdx`

The flagship "Start Here" article, synthesized from both books + augmented:
- **TL;DR:** Every card payment is a 3-act play: authorization (the ask), clearing (the confirmation), settlement (the money moves). It all happens in seconds.
- **What is it:** The complete journey of a card payment from tap to funds landing
- **How it works:** Step-by-step with Mermaid sequence diagram showing Cardholder → Merchant → Acquirer → Card Network → Issuer and back
- **The three stages:** Authorization (hold, ISO 8583, 3-second window), Clearing (end-of-day batch, tip adjustments), Settlement (next-day Fedwire, fee extraction)
- **Why it matters:** This is the foundation — every other payments topic connects back here
- **Key terms:** Authorization, Clearing, Settlement, BIN, Issuer, Acquirer, Card Network, Interchange
- **Related topics:** Payments Ecosystem Overview, Card Networks, Chargebacks & Disputes

**Commit after completion.**

---

### Task 5: Build Homepage Stub

**Files:**
- Create/modify: `src/pages/index.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/TopicCard.astro`

- Hero: "FintechAcademy" title, "Understand how money moves" tagline, "Start Here" CTA button
- Topic grid: shows the one available topic, with placeholder structure for future themes
- Should look complete even with just one topic

**Commit after completion.**

---

### Task 6: Review Checkpoint

**STOP HERE. Show the user the running site.**

```bash
npm run dev
```

Walk through: homepage → click "Start Here" → read the topic page → check diagram → hover glossary terms → see related topics section.

**User decides:** approve the look & feel, or request changes before scaling up.

---

## Phase 2: Scale Content (after approval)

Batch-write all remaining topic articles. These can be done in parallel by subagents since the layout/components are already built.

### Task 7: Foundation & Transaction Lifecycle Articles (4 articles)

- `payments-ecosystem-overview.mdx` — Four-party model, key players, ecosystem map diagram
- `authorization.mdx` — ISO 8583, dual-message vs single-message, holds, the 3-second window
- `clearing-and-settlement.mdx` — End-of-day batches, Fedwire, fee breakdown diagram
- `chargebacks-and-disputes.mdx` — Reg E/Z, chargeback flow diagram, EMV liability shift, 3DS, friendly fraud

**Commit after completion.**

---

### Task 8: Card Ecosystem Articles (5 articles)

- `card-networks.mdx` — Open vs closed networks, Visa/MC/AmEx/Discover, PIN debit sub-networks
- `issuing-vs-acquiring-banks.mdx` — Roles, BINs, neo-banks and sponsor banks, Durbin Amendment
- `credit-cards-vs-debit-cards.mdx` — Good funds vs credit model, interchange differences, consumer preferences
- `interchange-fees.mdx` — How interchange is calculated, MCC, card type, Durbin caps, private label vs co-brand
- `acceptance-environments.mdx` — POS/online/mobile, EMV/NFC/tokenization, PCI, 3D Secure

**Commit after completion.**

---

### Task 9: Non-Card Payments Articles (5 articles)

- `bank-based-payments.mdx` — ACH/SEPA/BACS, direct debit, online banking, open banking
- `digital-wallets.mdx` — Pass-through (Apple Pay) vs staged (PayPal, Alipay, mPesa), network tokenization
- `buy-now-pay-later.mdx` — Issuer-side installments vs merchant-side BNPL (Klarna/Affirm), mechanics
- `cash-and-atm.mdx` — Cash-on-delivery, Boleto, cash top-ups, ATM networks
- `crypto-and-defi.mdx` — Bitcoin, Ethereum, stablecoins, Lightning Network, regulatory landscape

**Commit after completion.**

---

### Task 10: Moving Money Articles (3 articles)

- `cross-border-payments.mdx` — Local vs cross-border acquiring, SWIFT, correspondent banking, DCC
- `push-to-card.mdx` — Visa Direct, Mastercard Send, OCT, instant payouts
- `real-time-payments.mdx` — UPI (India), Pix (Brazil), RTP (US), Faster Payments (UK), global RTP table

**Commit after completion.**

---

### Task 11: Products & Use Cases Articles (5 articles)

- `virtual-cards.mdx` — Instant issuance, use cases (incentives, testing, rewards)
- `expense-management.mdx` — Traditional vs modern (Brex/Divvy), real-time controls, Track 3 data
- `subscriptions-and-recurring.mdx` — Billing engines, voluntary vs involuntary churn, retry strategies, Account Updater
- `marketplaces.mdx` — Pay-in, splitting, pay-out, seller onboarding, regulatory (MTL/e-money)
- `b2b-payments.mdx` — ACH/wire/RTP for business, ERP integration, reconciliation, global RTP systems

**Commit after completion.**

---

### Task 12: Trust & Compliance Articles (4 articles)

- `kyc-and-identity.mdx` — KYC/KYB/AML, FATF, progressive verification, thin-file individuals
- `compliance-and-regulation.mdx` — Reg E/Z, Dodd-Frank/Durbin, PSD2/SCA, safety/transparency/fairness framework
- `fraud-and-risk.mdx` — Friendly fraud, ATO, "fraudy fraud", detection points, false declines
- `liability.mdx` — EMV liability shift, CNP liability, 3DS shift, merchant vs issuer responsibility

**Commit after completion.**

---

## Phase 3: Glossary, Search & Polish

### Task 13: Build Glossary Page

**Files:**
- Create: `src/data/glossary.json`
- Create: `src/pages/glossary.astro`

Compile ~50-60 terms from both books into a searchable alphabetical glossary page. Each term links to its relevant topic page.

**Commit after completion.**

---

### Task 14: Add Pagefind Search

**Files:**
- Modify: `package.json` (postbuild script)
- Create: `src/components/Search.astro`
- Modify: `src/components/Header.astro`

Client-side search via Pagefind, styled to match the site. Prominent search bar in header.

**Commit after completion.**

---

### Task 15: Dark Mode Toggle

**Files:**
- Create: `src/components/ThemeToggle.astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/Header.astro`

Toggle in header, persists to localStorage, uses Tailwind `dark:` classes.

**Commit after completion.**

---

### Task 16: Mobile Responsive Polish

Sidebar collapses to hamburger/drawer on mobile. Topic pages readable on narrow screens. Diagrams scale gracefully.

**Commit after completion.**

---

## Phase 4: Deploy

### Task 17: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

GitHub Pages deployment via Actions on push to main.

**Commit after completion.**

---

### Task 18: Final Review & Launch

Build locally, verify all pages/search/diagrams/links work, push to GitHub, enable Pages.
