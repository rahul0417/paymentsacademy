export type SlideType = 'intro' | 'concept' | 'diagram' | 'terms' | 'quiz';

interface BaseSlide {
  type: SlideType;
}

export interface IntroSlide extends BaseSlide {
  type: 'intro';
  title: string;
  description: string;
  objectives: string[];
}

export interface ConceptSlide extends BaseSlide {
  type: 'concept';
  label: string;
  title: string;
  content: string; // HTML content
}

export interface DiagramSlide extends BaseSlide {
  type: 'diagram';
  label: string;
  title: string;
  mermaidCode: string;
  caption?: string;
}

export interface TermsSlide extends BaseSlide {
  type: 'terms';
  terms: { term: string; definition: string }[];
}

export interface QuizSlide extends BaseSlide {
  type: 'quiz';
  questionIndex: number;
}

export type Slide = IntroSlide | ConceptSlide | DiagramSlide | TermsSlide | QuizSlide;

export interface TopicMicroLesson {
  topicSlug: string;
  topicTitle: string;
  theme: string;
  slides: Slide[];
}

const microLessons: TopicMicroLesson[] = [
  {
    topicSlug: 'anatomy-of-a-swipe',
    topicTitle: 'Anatomy of a Swipe',
    theme: 'Foundations',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Anatomy of a Swipe',
        description:
          'What really happens when you tap your card at a coffee shop? In just 2 seconds, your payment crosses half a dozen entities, triggers fraud checks, and places a hold on your funds — all before you pick up your latte.',
        objectives: [
          'Identify the key players in a card transaction (cardholder, merchant, acquirer, network, issuer + processors)',
          'Trace the three-act flow: Authorization → Clearing → Settlement',
          'Understand why authorization is just a hold — no money moves',
          'Explain how interchange fees fund the card ecosystem',
          'Know the role of the BIN in routing transactions',
        ],
      },

      // Slide 2: The Big Picture
      {
        type: 'concept',
        label: 'Overview',
        title: 'The Big Picture',
        content: `<p>When you tap your card at a terminal, your payment crosses <strong>6 or more entities</strong> in roughly <strong>2 seconds</strong>. It feels instant, but a lot is happening behind the scenes.</p>
<p>The full lifecycle of a card transaction plays out in <strong>three acts</strong>:</p>
<ul>
  <li><strong>Authorization</strong> — the real-time approval (or decline) that happens at the point of sale</li>
  <li><strong>Clearing</strong> — the end-of-day process where final amounts are confirmed</li>
  <li><strong>Settlement</strong> — the actual movement of money between banks, usually the next business day</li>
</ul>
<div class="slide-callout">From tap to settlement, the full journey takes <strong>2–3 business days</strong> — even though you see "approved" in 2 seconds.</div>`,
      },

      // Slide 3: The Players
      {
        type: 'concept',
        label: 'Key Parties',
        title: 'The Players',
        content: `<p>Every card transaction involves <strong>5 key parties</strong>, plus 2 behind-the-scenes processors:</p>
<ul>
  <li><strong>Cardholder</strong> — you, the person tapping or swiping the card</li>
  <li><strong>Merchant</strong> — the business accepting your payment</li>
  <li><strong>Acquirer</strong> — the bank or financial institution that handles card payments on behalf of the merchant</li>
  <li><strong>Card Network</strong> — Visa, Mastercard, etc. — the rails that connect acquirers and issuers</li>
  <li><strong>Issuer</strong> — the bank that issued your card and decides whether to approve or decline</li>
</ul>
<p>Working behind the scenes are two more players:</p>
<ul>
  <li><strong>Acquirer Processor</strong> — handles the tech for the acquirer (gateway, terminal comms)</li>
  <li><strong>Issuer Processor</strong> — handles the tech for the issuer (fraud scoring, balance checks)</li>
</ul>
<div class="slide-callout">This is called the <strong>four-party model</strong>: cardholder, merchant, acquirer, and issuer — with the network in the middle.</div>`,
      },

      // Slide 4: How the Players Connect (diagram)
      {
        type: 'diagram',
        label: 'Four-Party Model',
        title: 'How the Players Connect',
        mermaidCode: `graph LR
  A[Cardholder] -->|Pays| B[Merchant]
  B -->|Routes via| C[Acquirer]
  C -->|Tech| D[Acquirer Processor]
  D <-->|Transaction| E[Card Network]
  E <-->|Tech| F[Issuer Processor]
  F <-->|Approves| G[Issuer]`,
        caption:
          'The four-party model with processors. The cardholder pays the merchant, who routes through the acquirer side. The card network sits in the middle, connecting to the issuer side for approval.',
      },

      // Slide 5: Act 1 — Authorization
      {
        type: 'concept',
        label: 'Act 1',
        title: 'Authorization',
        content: `<p>Authorization is the <strong>real-time</strong> part — it happens in about 2 seconds while you stand at the terminal.</p>
<p>Here's what happens step by step:</p>
<ul>
  <li>The terminal reads your card data. If you use chip or tap, a <strong>one-time cryptographic code</strong> is generated, making it much harder to counterfeit.</li>
  <li>The request travels from the merchant's terminal through the <strong>acquirer processor</strong> to the <strong>card network</strong>.</li>
  <li>The network reads the <strong>BIN</strong> (the first 6 digits of your card number) to figure out which issuer to route the request to.</li>
  <li>The <strong>issuer</strong> checks three things: Is the card valid? Are there sufficient funds? Does this look like fraud?</li>
  <li>The issuer sends back an <strong>approved or declined</strong> response, which travels back the same path to the terminal.</li>
</ul>
<div class="slide-callout">Critical insight: Authorization is <strong>just a hold</strong>. No money moves yet. The issuer ring-fences the amount in your account (you see it as "pending"), but the actual transfer happens days later.</div>`,
      },

      // Slide 6: The Authorization Flow (diagram)
      {
        type: 'diagram',
        label: 'Act 1 Flow',
        title: 'The Authorization Flow',
        mermaidCode: `sequenceDiagram
  participant C as Cardholder
  participant M as Merchant Terminal
  participant AP as Acquirer Processor
  participant N as Card Network
  participant IP as Issuer Processor
  participant I as Issuing Bank
  C->>M: Tap / Dip / Swipe
  M->>AP: Authorization request
  AP->>N: Route via BIN
  N->>IP: Forward to issuer
  IP->>I: Authorize?
  I->>IP: Check funds, fraud, card status
  IP-->>N: Approved
  N-->>AP: Approved
  AP-->>M: Approved
  M-->>C: Approved on screen`,
      },

      // Slide 7: Act 2 — Clearing
      {
        type: 'concept',
        label: 'Act 2',
        title: 'Clearing',
        content: `<p>Clearing happens at the <strong>end of the business day</strong>, long after you've left the store.</p>
<p>The merchant bundles up all approved transactions from the day into a <strong>clearing file</strong> (also called a batch) and sends it to the acquirer.</p>
<p>Why is clearing separate from authorization? Because <strong>final amounts can change</strong>:</p>
<ul>
  <li>You might add a <strong>tip</strong> at a restaurant after the initial authorization</li>
  <li>A hotel might adjust the final charge after you check out</li>
  <li>A gas station pre-authorizes a set amount, then clears the actual pump total</li>
</ul>
<p>The acquirer forwards the clearing data through the <strong>card network</strong> to the <strong>issuer</strong>. At this point, your "pending" charge becomes a <strong>posted</strong> transaction on your statement.</p>
<div class="slide-callout">Clearing is the confirmation step — it locks in the final amount and tells the issuer exactly how much to settle.</div>`,
      },

      // Slide 8: Act 3 — Settlement
      {
        type: 'concept',
        label: 'Act 3',
        title: 'Settlement',
        content: `<p>Settlement is when <strong>money actually moves</strong> between banks. This typically happens the <strong>next business day</strong>.</p>
<p>The card network calculates <strong>net amounts</strong> between all issuers and acquirers. Instead of sending thousands of individual payments, they use <strong>netting</strong> — offsetting what banks owe each other and only transferring the difference.</p>
<p>The actual money moves via bank transfer systems like <strong>Fedwire</strong>.</p>
<div class="slide-callout">The merchant doesn't get the full transaction amount. Fees are deducted before the merchant receives their funds — which brings us to who takes a cut.</div>`,
      },

      // Slide 9: Who Takes a Cut
      {
        type: 'concept',
        label: 'Fees',
        title: 'Who Takes a Cut',
        content: `<p>Let's break down the fees on a <strong>$5 coffee</strong>:</p>
<ul>
  <li><strong>Interchange fee (~$0.12)</strong> — goes to the <strong>issuer</strong> (your bank). This is the biggest slice and it's what funds your credit card rewards, cashback, and points.</li>
  <li><strong>Network assessment fee (~$0.007)</strong> — goes to <strong>Visa or Mastercard</strong> for maintaining the network rails.</li>
  <li><strong>Acquirer markup (~$0.015)</strong> — goes to the <strong>acquirer/processor</strong> for handling the merchant's payment processing.</li>
</ul>
<p>Total fees on that $5 coffee: roughly <strong>$0.12–$0.15</strong>.</p>
<p>The merchant nets about <strong>$4.85–$4.88</strong>.</p>
<div class="slide-callout">Interchange is the engine of the card ecosystem. It's why issuers want you to use your card — every swipe earns them a fee, which they share back with you as rewards.</div>`,
      },

      // Slide 10: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'BIN',
            definition:
              'Bank Identification Number — the first six digits of a card number that identify the issuing bank for routing.',
          },
          {
            term: 'ISO 8583',
            definition:
              'The international standard messaging format used for all card transaction communications.',
          },
          {
            term: 'Interchange',
            definition:
              "A fee paid by the merchant's bank (acquirer) to the cardholder's bank (issuer) on each card transaction — largely funds credit card rewards.",
          },
          {
            term: 'Authorization',
            definition:
              'A real-time hold placed on funds when you tap/dip/swipe — no money moves yet.',
          },
          {
            term: 'Clearing',
            definition:
              'The end-of-day process where merchants confirm final transaction amounts and submit them for settlement.',
          },
          {
            term: 'Settlement',
            definition:
              'The actual transfer of funds between banks, usually the next business day via systems like Fedwire.',
          },
          {
            term: 'Issuer',
            definition:
              'The bank that issued your card and decides whether to approve or decline.',
          },
          {
            term: 'Acquirer',
            definition:
              'The bank or processor that handles card payments on behalf of the merchant.',
          },
        ],
      },

      // Slides 11-14: Quiz
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
      { type: 'quiz', questionIndex: 3 },
    ],
  },

  // ──────────────────────────────────────────────
  // 1. AUTHORIZATION
  // ──────────────────────────────────────────────
  {
    topicSlug: 'authorization',
    topicTitle: 'Authorization',
    theme: 'Transaction Lifecycle',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Authorization',
        description:
          'The first act of every card payment — what happens in the split second between tapping your card and seeing "Approved" on the screen. We\'ll unpack the message format, the checks the issuer runs, and why some declines are permanent while others can be retried.',
        objectives: [
          'Understand the ISO 8583 message format and the key data elements in an authorization request',
          'Explain the difference between dual-message and single-message transaction flows',
          'Trace the full authorization flow from terminal to issuer and back',
          'Distinguish between hard declines and soft declines',
          'Know what authorization holds and pre-authorizations are and why they matter',
        ],
      },

      // Slide 2: The Two-Second Decision
      {
        type: 'concept',
        label: 'Overview',
        title: 'The Two-Second Decision',
        content: `<p>Every card transaction starts with a simple question: <strong>should this payment be approved?</strong></p>
<p>That question gets answered in about <strong>2 seconds</strong>. But in those 2 seconds, a structured message travels across multiple entities, undergoes a battery of checks, and returns with a verdict.</p>
<p>Authorization is the <strong>fastest and most consequential</strong> step in the payment lifecycle:</p>
<ul>
  <li>Approve a fraudulent transaction — and the issuer eats the loss</li>
  <li>Decline a legitimate one — and the merchant loses a sale</li>
</ul>
<div class="slide-callout">Authorization is just a <strong>hold on funds</strong> — no money actually moves yet. That happens later during settlement.</div>`,
      },

      // Slide 3: ISO 8583 — The Language of Authorization
      {
        type: 'concept',
        label: 'Message Format',
        title: 'ISO 8583 — The Language',
        content: `<p>Every authorization request is built on a standard called <strong>ISO 8583</strong> — a compact, binary format designed for speed since the 1980s.</p>
<p>Key data elements in the message:</p>
<ul>
  <li><strong>PAN</strong> — the card number (or token representing it)</li>
  <li><strong>Transaction amount</strong> — in the currency's smallest unit (e.g., cents)</li>
  <li><strong>MCC</strong> — Merchant Category Code telling the issuer the business type</li>
  <li><strong>Point-of-service entry mode</strong> — how the card was read (chip, tap, swipe, e-commerce)</li>
  <li><strong>Cryptogram</strong> — for chip/tap, a one-time code proving the physical card was present</li>
</ul>
<div class="slide-callout">The MCC matters more than you'd think — issuers use it for fraud rules, spending restrictions, and interchange rate calculations.</div>`,
      },

      // Slide 4: Dual-Message vs. Single-Message
      {
        type: 'concept',
        label: 'Transaction Models',
        title: 'Dual-Message vs. Single-Message',
        content: `<p>Not all authorizations work the same way. There are two fundamentally different models:</p>
<ul>
  <li><strong>Dual-message</strong> — authorization is the first message, clearing comes separately later (usually end of day). This is how <strong>credit card</strong> transactions work. You see "pending" charges because there's a gap between auth and clearing.</li>
  <li><strong>Single-message</strong> — authorization and clearing happen in one shot. This is how <strong>PIN debit</strong> transactions work. The money moves immediately.</li>
</ul>
<div class="slide-callout">Dual-message allows adjustments (like adding a tip), but settles slower. Single-message is final immediately and costs merchants less in interchange.</div>`,
      },

      // Slide 5: The Authorization Flow (diagram)
      {
        type: 'diagram',
        label: 'Auth Flow',
        title: 'The Authorization Flow',
        mermaidCode: `sequenceDiagram
  participant C as Cardholder
  participant T as Terminal
  participant AP as Acquirer Processor
  participant N as Card Network
  participant IP as Issuer Processor
  C->>T: Tap card
  T->>AP: ISO 8583 auth request
  AP->>N: Forward to network
  N->>IP: Route via BIN lookup
  IP->>IP: Check card, balance, fraud
  IP-->>N: Approved or Declined
  N-->>AP: Forward response
  AP-->>T: Forward response
  T-->>C: Display result`,
        caption:
          'The full authorization round trip — from card tap to response — must complete within about 2-3 seconds.',
      },

      // Slide 6: What the Issuer Checks
      {
        type: 'concept',
        label: 'Issuer Checks',
        title: 'What the Issuer Checks',
        content: `<p>The issuer processor runs through several checks in <strong>under 100 milliseconds</strong>:</p>
<ul>
  <li><strong>Card status</strong> — Is the card active? Reported lost or stolen? Account closed?</li>
  <li><strong>Available funds</strong> — Enough money (debit) or credit available? This accounts for existing authorization holds.</li>
  <li><strong>Fraud rules</strong> — Geographic velocity (Chicago then Miami in 20 min?), amount patterns, merchant risk scoring, device analysis</li>
  <li><strong>Velocity checks</strong> — Too many transactions in a short period? A burst of rapid-fire attempts is a classic fraud pattern.</li>
  <li><strong>Program restrictions</strong> — Corporate cards might only allow certain MCCs; teen cards might have daily limits.</li>
</ul>
<div class="slide-callout">If the issuer doesn't respond within ~3 seconds, the card network may make a "stand-in" decision on the issuer's behalf.</div>`,
      },

      // Slide 7: Holds and Pre-Authorizations
      {
        type: 'concept',
        label: 'Holds',
        title: 'Authorization Holds and Pre-Auths',
        content: `<p>When a transaction is approved, the issuer creates an <strong>authorization hold</strong> — a reservation of funds on the cardholder's account.</p>
<p>This is why your bank shows two numbers:</p>
<ul>
  <li><strong>Available balance</strong> — subtracts holds (drops immediately)</li>
  <li><strong>Current balance</strong> — only reflects posted transactions</li>
</ul>
<p><strong>Pre-authorizations</strong> are used when the final amount isn't known yet:</p>
<ul>
  <li><strong>Gas stations</strong> — pre-auth $1 or $100-$150, then clear the actual pump amount</li>
  <li><strong>Hotels</strong> — pre-auth for estimated stay + incidentals</li>
  <li><strong>Car rentals</strong> — pre-auth at pickup, final charge at return</li>
</ul>
<div class="slide-callout">Holds expire after 7-8 days (Visa) if clearing never comes — a common reason "pending" charges disappear without a refund.</div>`,
      },

      // Slide 8: Hard Declines vs. Soft Declines
      {
        type: 'concept',
        label: 'Decline Types',
        title: 'Hard Declines vs. Soft Declines',
        content: `<p>Not all declines are the same. The distinction matters enormously for retry logic:</p>
<ul>
  <li><strong>Hard decline</strong> — the transaction should <strong>not</strong> be retried. The card is stolen, the account is closed, or the card number is invalid. Retrying may trigger network fines.</li>
  <li><strong>Soft decline</strong> — the transaction <strong>might</strong> succeed later. Insufficient funds right now, issuer timeout, or a false fraud flag. Subscription merchants retry soft declines on a schedule.</li>
</ul>
<p>The issuer communicates this through <strong>response codes</strong> in the ISO 8583 message. Code "05" (Do Not Honor) is deliberately vague. Code "14" (Invalid Card Number) is clear and permanent.</p>
<div class="slide-callout">Authorization rate — the percentage of transactions approved — is one of the most watched metrics. Issuers target 85-90% for card-present and 70-80% for e-commerce.</div>`,
      },

      // Slide 9: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'ISO 8583',
            definition:
              'The international standard messaging format for card transaction communications — compact, binary, and designed for speed.',
          },
          {
            term: 'Dual-Message',
            definition:
              'A flow where authorization and clearing are separate messages — typical of credit cards.',
          },
          {
            term: 'Single-Message',
            definition:
              'A flow where authorization and clearing happen in one combined message — typical of PIN debit.',
          },
          {
            term: 'Authorization Hold',
            definition:
              'A temporary freeze on funds after an approved authorization. No money moves — it just reserves the amount until clearing.',
          },
          {
            term: 'Pre-Authorization',
            definition:
              'An authorization for an estimated amount before the final charge is known — common at hotels, gas stations, and car rentals.',
          },
          {
            term: 'Hard Decline',
            definition:
              'A permanent rejection that should not be retried — closed account, stolen card, or invalid number.',
          },
          {
            term: 'Soft Decline',
            definition:
              'A temporary rejection that may succeed if retried — insufficient funds, issuer timeout, or temporary fraud flag.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
      { type: 'quiz', questionIndex: 3 },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. CARD NETWORKS
  // ──────────────────────────────────────────────
  {
    topicSlug: 'card-networks',
    topicTitle: 'Card Networks',
    theme: 'Card Ecosystem',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Card Networks',
        description:
          'Visa, Mastercard, Amex, Discover — the invisible rails under every card payment. They don\'t hold your money or issue your card, but nothing moves without them.',
        objectives: [
          'Understand what card networks actually do: set rules, route transactions, guarantee settlement',
          'Explain the difference between open-loop and closed-loop networks',
          'Know how card networks make money (assessment fees, not interchange)',
          'Understand the Durbin Amendment and its impact on debit network competition',
        ],
      },

      // Slide 2: What Card Networks Do
      {
        type: 'concept',
        label: 'Core Functions',
        title: 'What Card Networks Actually Do',
        content: `<p>Card networks are the <strong>air traffic control</strong> of payments. Banks hold the money, merchants handle the customers — but without the network, nothing gets off the ground.</p>
<p>Card networks perform three essential functions:</p>
<ul>
  <li><strong>Set the rules</strong> — Visa's rulebook is hundreds of pages. It governs how transactions are processed, how disputes work, and what happens when things go wrong.</li>
  <li><strong>Route transactions</strong> — when a terminal sends an auth request, the network figures out which issuer to send it to and delivers the message in milliseconds.</li>
  <li><strong>Guarantee settlement</strong> — after transactions clear, the network calculates what each bank owes and orchestrates fund movement. If a bank fails to settle, the network steps in.</li>
</ul>
<div class="slide-callout">Visa's VisaNet processes over <strong>65,000 transaction messages per second</strong> at peak capacity.</div>`,
      },

      // Slide 3: Open-Loop vs. Closed-Loop
      {
        type: 'concept',
        label: 'Network Models',
        title: 'Open-Loop vs. Closed-Loop',
        content: `<p>There are two fundamentally different models for how card networks operate:</p>
<ul>
  <li><strong>Open-loop</strong> (Visa, Mastercard) — works with thousands of banks. Any bank can join as issuer or acquirer. Cards accepted at 100+ million merchant locations worldwide. Scales brilliantly because the network doesn't do customer acquisition.</li>
  <li><strong>Closed-loop</strong> (Amex, historically Discover) — one company plays all roles: issuer, acquirer, and network. Sees both sides of every transaction for better fraud detection and richer data. But smaller acceptance footprint.</li>
</ul>
<div class="slide-callout">The lines have blurred: Amex now lets other banks issue Amex-branded cards, and Discover partners with networks worldwide for international acceptance.</div>`,
      },

      // Slide 4: Open-Loop vs Closed-Loop (diagram)
      {
        type: 'diagram',
        label: 'Network Models',
        title: 'Open-Loop vs. Closed-Loop',
        mermaidCode: `graph TD
  subgraph OL["Open-Loop (Visa, Mastercard)"]
    CH1[Cardholder] --> ISS[Issuing Bank]
    ISS <--> CN[Card Network]
    CN <--> ACQ[Acquiring Bank]
    ACQ --> M1[Merchant]
  end
  subgraph CL["Closed-Loop (Amex)"]
    CH2[Cardholder] --> AMEX[Amex: Issuer + Network + Acquirer]
    AMEX --> M2[Merchant]
  end`,
        caption:
          'Open-loop networks connect separate issuers and acquirers. Closed-loop networks control both sides of the transaction.',
      },

      // Slide 5: The Big Four
      {
        type: 'concept',
        label: 'Major Networks',
        title: 'The Big Four Networks',
        content: `<p>Four networks dominate card payments globally:</p>
<ul>
  <li><strong>Visa</strong> — ~60% of U.S. card volume. Purely infrastructure and rules. Extraordinary margins because it doesn't issue cards or make loans.</li>
  <li><strong>Mastercard</strong> — ~25-30% of U.S. volume. Nearly identical model to Visa. Slightly more aggressive in data analytics and services.</li>
  <li><strong>American Express</strong> — primarily closed-loop. Premium positioning with higher-spending cardholders. Also earns from annual fees and interest — revenue Visa/MC don't have.</li>
  <li><strong>Discover</strong> — smallest of the four. Started as closed-loop (launched by Sears in 1985). Known for no annual fees and cash-back rewards.</li>
</ul>
<div class="slide-callout">Capital One's acquisition of Discover (announced 2024) will reshape this competitive landscape significantly.</div>`,
      },

      // Slide 6: How Networks Make Money
      {
        type: 'concept',
        label: 'Revenue Model',
        title: 'How Networks Make Money',
        content: `<p>Here's a common misconception: card networks do <strong>not</strong> earn interchange. Interchange flows from acquirer to issuer — the network just sets the rate.</p>
<p>The network's revenue comes from <strong>network assessment fees</strong> — small fees (typically 0.13%-0.15%) charged on every transaction crossing their rails.</p>
<p>On a $100 transaction, Visa might collect about <strong>$0.14</strong> total in assessments. Sounds tiny — but multiply by hundreds of billions of transactions per year:</p>
<ul>
  <li>Visa earns <strong>$35+ billion</strong> in annual revenue</li>
  <li>Minimal credit risk, almost no physical infrastructure</li>
  <li>Among the most profitable companies on Earth</li>
</ul>
<div class="slide-callout">Networks also earn from cross-border fees, data analytics products, consulting services, and licensing fees.</div>`,
      },

      // Slide 7: Durbin Amendment and PIN Debit
      {
        type: 'concept',
        label: 'Regulation',
        title: 'The Durbin Amendment',
        content: `<p>The Durbin Amendment (2010) did two major things to debit cards:</p>
<ul>
  <li><strong>Capped interchange</strong> for large banks (>$10B assets) at roughly 21 cents + 0.05% per transaction. Before Durbin, average debit interchange was ~44 cents.</li>
  <li><strong>Required dual-network support</strong> — every debit card must support at least two unaffiliated networks, giving merchants a choice of routing to the cheapest one.</li>
</ul>
<p>This created fierce competition among PIN debit networks (Interlink, STAR, PULSE, NYCE) for routing priority. Merchants like Walmart aggressively route to the lowest-cost network.</p>
<div class="slide-callout">Visa owns <strong>Interlink</strong>, Mastercard owned <strong>Maestro</strong>, Discover owns <strong>PULSE</strong> — each competing for debit transaction routing.</div>`,
      },

      // Slide 8: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Card Network',
            definition:
              'The payment rail (Visa, Mastercard) that connects issuers and acquirers and routes transactions between them.',
          },
          {
            term: 'Open-Loop Network',
            definition:
              'A network like Visa or Mastercard that works with many issuers and acquirers — cards accepted almost anywhere.',
          },
          {
            term: 'Closed-Loop Network',
            definition:
              'A network like Amex that acts as issuer, acquirer, and network — controlling both sides of the transaction.',
          },
          {
            term: 'Network Assessment Fee',
            definition:
              'A small fee (0.13%-0.15%) charged by the card network on every transaction for using their rails — the network\'s primary revenue.',
          },
          {
            term: 'PIN Debit Network',
            definition:
              'Secondary networks (Interlink, STAR, PULSE) used for PIN-authenticated debit transactions with lower interchange.',
          },
          {
            term: 'Durbin Amendment',
            definition:
              'U.S. regulation capping debit interchange for large banks and requiring debit cards support at least two unaffiliated networks.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. PAYMENTS ECOSYSTEM OVERVIEW
  // ──────────────────────────────────────────────
  {
    topicSlug: 'payments-ecosystem-overview',
    topicTitle: 'Payments Ecosystem Overview',
    theme: 'Foundations',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Payments Ecosystem Overview',
        description:
          'Why does it take so many companies to move $5 from your bank to a coffee shop? This lesson maps the entire payments landscape — the key players, how they connect, and why each layer exists.',
        objectives: [
          'Identify the five core parties in the four-party model (cardholder, merchant, issuer, acquirer, card network)',
          'Understand the difference between open-loop and closed-loop networks',
          'Know the role of processors, PSPs, and PayFacs in the ecosystem',
          'Explain why information and money travel at different speeds',
        ],
      },

      // Slide 2: The Four-Party Model
      {
        type: 'concept',
        label: 'Core Model',
        title: 'The Four-Party Model',
        content: `<p>The backbone of modern card payments is the <strong>four-party model</strong>. Despite the name, there are actually five entities:</p>
<ul>
  <li><strong>Cardholder</strong> — you, the person with the card</li>
  <li><strong>Merchant</strong> — the business accepting payment</li>
  <li><strong>Issuing Bank (Issuer)</strong> — the bank that gave you the card. They approve or decline every transaction.</li>
  <li><strong>Acquiring Bank (Acquirer)</strong> — the bank that has a relationship with the merchant. On the hook if the merchant goes bust.</li>
  <li><strong>Card Network</strong> — Visa, Mastercard. The routing layer and rules engine connecting issuers and acquirers.</li>
</ul>
<div class="slide-callout">This is an <strong>open-loop</strong> model — any bank can join as an issuer or acquirer. That's why Visa and Mastercard cards are accepted at 100+ million locations worldwide.</div>`,
      },

      // Slide 3: Open-Loop vs. Closed-Loop
      {
        type: 'concept',
        label: 'Network Types',
        title: 'Open-Loop vs. Closed-Loop',
        content: `<p>Not every card network uses the four-party model:</p>
<ul>
  <li><strong>Open-loop</strong> (Visa, Mastercard) — separate issuers and acquirers connected by the network. Scales massively because thousands of banks do the distribution.</li>
  <li><strong>Closed-loop</strong> (American Express) — one company plays all roles: issuer, acquirer, and network. Better data and fraud detection, but harder to scale.</li>
</ul>
<p>Closed-loop networks see both sides of every transaction, which means richer analytics. But they have to sign up every merchant and every cardholder themselves — which is why Amex has a smaller acceptance footprint than Visa.</p>
<div class="slide-callout">Even closed-loop networks have opened up: Amex now lets other banks issue Amex-branded cards through its GNS program.</div>`,
      },

      // Slide 4: The Full Ecosystem (diagram)
      {
        type: 'diagram',
        label: 'Ecosystem Map',
        title: 'The Full Payments Ecosystem',
        mermaidCode: `graph LR
  CH[Cardholder] -->|Pays| M[Merchant]
  M -->|Sends txn| PSP[PSP / PayFac]
  PSP -->|Routes to| AP[Acquirer Processor]
  AP -->|Connects to| ACQ[Acquiring Bank]
  ACQ <-->|Messages via| CN[Card Network]
  CN <-->|Messages via| ISS[Issuing Bank]
  ISS <-->|Tech by| IP[Issuer Processor]`,
        caption:
          'The full ecosystem from cardholder to issuer, with processors and intermediaries at every step.',
      },

      // Slide 5: Processors
      {
        type: 'concept',
        label: 'Processors',
        title: 'The Invisible Infrastructure',
        content: `<p>Banks set the rules, but most don't run the technology. That job falls to <strong>processors</strong>:</p>
<ul>
  <li><strong>Issuer processors</strong> — sit behind the issuing bank. They receive the auth message, check the balance, run fraud rules, and send back approve/decline. Companies: TSYS, Marqeta, Galileo, i2c.</li>
  <li><strong>Acquirer processors</strong> — sit behind the acquiring bank. They capture transactions from the terminal, format ISO 8583 messages, and route to the network. Companies: Fiserv/First Data, Worldpay, Global Payments.</li>
</ul>
<div class="slide-callout">Your bank makes the business decisions (what cards to offer, what limits to set). The processor executes those decisions in real time, thousands of times per second.</div>`,
      },

      // Slide 6: PSPs and PayFacs
      {
        type: 'concept',
        label: 'Merchant Layer',
        title: 'PSPs and PayFacs',
        content: `<p>If you're a small business, you don't call JPMorgan to accept cards. You sign up with Stripe, Square, or similar:</p>
<ul>
  <li><strong>PSP</strong> (Payment Service Provider) — gives merchants tools to accept payments: APIs, checkout pages, dashboards. Partners with an acquirer behind the scenes.</li>
  <li><strong>PayFac</strong> (Payment Facilitator) — holds one master merchant account and aggregates smaller merchants underneath. This is why you can start accepting payments on Stripe in minutes.</li>
</ul>
<p>The trade-off: the PayFac takes on the risk. If a sub-merchant is fraudulent, the PayFac is liable.</p>
<div class="slide-callout">Stripe, Square, Adyen, and PayPal all blend the PSP and PayFac models — abstracting away the complexity of the acquiring side.</div>`,
      },

      // Slide 7: Information vs. Money Flow
      {
        type: 'concept',
        label: 'Two Flows',
        title: 'Information vs. Money',
        content: `<p>One of the most important concepts in payments: <strong>information and money travel at different speeds</strong>.</p>
<ul>
  <li><strong>Information flow</strong> — happens in real time during authorization. Terminal to acquirer to network to issuer and back in under 2 seconds.</li>
  <li><strong>Money flow</strong> — happens later, typically next business day. After clearing, the network calculates net positions and actual funds move via systems like Fedwire.</li>
</ul>
<p>Between authorization and settlement, the merchant has a <strong>promise</strong> of payment but not cash. The acquirer fills this gap by funding the merchant early (T+1).</p>
<div class="slide-callout">This gap between information and money is where much of the economics live — it's why acquirers charge fees and why merchants care about settlement timing.</div>`,
      },

      // Slide 8: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Four-Party Model',
            definition:
              'The standard card payment structure: cardholder, merchant, issuing bank, acquiring bank — with a card network in the middle.',
          },
          {
            term: 'Open-Loop Network',
            definition:
              'A card network like Visa where any bank can participate as issuer or acquirer.',
          },
          {
            term: 'Closed-Loop Network',
            definition:
              'A network like Amex where one company acts as issuer, acquirer, and network.',
          },
          {
            term: 'PSP',
            definition:
              'Payment Service Provider — gives merchants the tech and services to accept payments (APIs, gateways, dashboards).',
          },
          {
            term: 'PayFac',
            definition:
              'Payment Facilitator — aggregates merchants under one master account for fast onboarding. Stripe and Square are examples.',
          },
          {
            term: 'Issuer Processor',
            definition:
              'The company running the technology behind the issuing bank — handling auth decisions, balance checks, and fraud scoring in real time.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. CLEARING AND SETTLEMENT
  // ──────────────────────────────────────────────
  {
    topicSlug: 'clearing-and-settlement',
    topicTitle: 'Clearing & Settlement',
    theme: 'Transaction Lifecycle',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Clearing & Settlement',
        description:
          'Authorization is just a promise. After you leave the store, the real financial plumbing kicks in — merchants confirm final amounts, fees are extracted, and actual money moves between banks.',
        objectives: [
          'Understand what happens during clearing and why it is separate from authorization',
          'Know how settlement works through net positions rather than individual transactions',
          'Break down the fee stack: interchange, network assessment, and acquirer markup',
          'Explain T+1 settlement timelines and why merchants care about funding speed',
        ],
      },

      // Slide 2: Clearing — Confirming the Final Bill
      {
        type: 'concept',
        label: 'Clearing',
        title: 'Clearing: Confirming the Final Bill',
        content: `<p><strong>Clearing</strong> is the merchant saying "here's what actually happened today — please process these transactions for real."</p>
<p>At end of day, the merchant bundles approved transactions into a <strong>batch</strong> and submits it to the acquirer, which forwards it through the network to the issuer.</p>
<p>Why not just use the authorization amount? Because <strong>final amounts can change</strong>:</p>
<ul>
  <li><strong>Restaurants</strong> — you authorized $50, then added a $10 tip. Clearing amount: $60.</li>
  <li><strong>Hotels</strong> — pre-authorized $500, final bill was $423. Clearing reflects the real amount.</li>
  <li><strong>Gas stations</strong> — pre-authorized $100, you pumped $37.50.</li>
</ul>
<div class="slide-callout">If clearing never comes (voided sale, system glitch), the authorization hold expires after 7-8 days and the "pending" charge disappears.</div>`,
      },

      // Slide 3: Settlement — Moving the Money
      {
        type: 'concept',
        label: 'Settlement',
        title: 'Settlement: Moving the Money',
        content: `<p>Once clearing files are exchanged, actual money needs to move. But the network doesn't settle transaction by transaction — that would be impossibly expensive.</p>
<p>Instead, the network calculates <strong>net positions</strong>:</p>
<ul>
  <li>Think of it like a poker game — at the end of the night, you settle the net difference, not every individual hand.</li>
  <li>A large bank might owe $50M to the settlement pool and be owed $30M. Net result: wire $20M.</li>
</ul>
<p>These transfers happen through <strong>Fedwire</strong> — the Federal Reserve's real-time gross settlement system with immediate finality.</p>
<div class="slide-callout">Fedwire doesn't operate on weekends or holidays, so Friday transactions don't settle until Monday — creating longer funding gaps.</div>`,
      },

      // Slide 4: Clearing and Settlement Flow (diagram)
      {
        type: 'diagram',
        label: 'Settlement Flow',
        title: 'How Clearing and Settlement Work',
        mermaidCode: `sequenceDiagram
  participant M as Merchant
  participant AP as Acquirer Processor
  participant N as Card Network
  participant IP as Issuer Processor
  participant FW as Fedwire
  M->>AP: End-of-day batch
  AP->>N: Submit clearing data
  N->>IP: Forward transaction details
  Note over N: Calculate net positions
  N->>FW: Settlement instructions
  FW->>IP: Debit issuing bank
  FW->>AP: Credit acquiring bank
  AP->>M: Deposit funds to merchant`,
        caption:
          'The merchant submits the batch, the network calculates who owes what, and Fedwire moves the net amounts.',
      },

      // Slide 5: The Fee Stack
      {
        type: 'concept',
        label: 'Fee Stack',
        title: 'The Fee Stack: Who Gets Paid',
        content: `<p>Before the merchant gets their money, three layers of fees are extracted. On a <strong>$100 credit card purchase</strong>:</p>
<ul>
  <li><strong>Interchange fee (~$1.80)</strong> — goes to the <strong>issuing bank</strong>. The largest fee. Funds your rewards, fraud protection, and customer service.</li>
  <li><strong>Network assessment (~$0.14)</strong> — goes to <strong>Visa/Mastercard</strong>. Covers the routing infrastructure and settlement system.</li>
  <li><strong>Acquirer markup (~$0.40)</strong> — goes to the <strong>acquirer/processor</strong>. Covers the terminal, gateway, reporting, and support.</li>
</ul>
<p>Total fees: <strong>~$2.34</strong>. Merchant receives: <strong>~$97.66</strong>.</p>
<div class="slide-callout">On a $5 coffee the fees are ~$0.12-$0.15. On a $1,000 purchase they can be $20-$25. The percentage stays roughly constant.</div>`,
      },

      // Slide 6: Settlement Timelines
      {
        type: 'concept',
        label: 'Timelines',
        title: 'Settlement Timelines',
        content: `<p>How fast does the merchant get their money? The industry uses <strong>T+N</strong> notation:</p>
<ul>
  <li><strong>T+1</strong> — merchant receives funds one business day after the transaction. Standard for most U.S. card networks.</li>
  <li><strong>T+2</strong> — common for smaller merchants, certain processors, or cross-border transactions.</li>
  <li><strong>Instant/next-morning</strong> — offered by Stripe, Square for an additional fee. They advance funds before inter-bank settlement completes.</li>
</ul>
<p>For <strong>cardholders</strong>, the timeline looks different: your available balance drops immediately at authorization, but the "posted" balance updates at T+1 or T+2.</p>
<div class="slide-callout">The gap between "available" and "current" balance on your bank account? That's your outstanding authorization holds.</div>`,
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Clearing',
            definition:
              'The process where merchants confirm final transaction details and submit them to the network — locking in amounts before money moves.',
          },
          {
            term: 'Settlement',
            definition:
              'The actual transfer of funds between banks, calculated as net positions by the network and executed through Fedwire.',
          },
          {
            term: 'Batch Processing',
            definition:
              "Bundling a day's worth of approved transactions into a single file for submission — typically done at end of business day.",
          },
          {
            term: 'Fedwire',
            definition:
              "The Federal Reserve's real-time gross settlement system used by U.S. banks to transfer funds with immediate finality.",
          },
          {
            term: 'T+1 Settlement',
            definition:
              'Settlement one business day after the transaction. T+2 means two business days.',
          },
          {
            term: 'Network Assessment Fee',
            definition:
              'A fee charged by Visa/Mastercard on every transaction for operating the routing and settlement infrastructure.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 5. INTERCHANGE FEES
  // ──────────────────────────────────────────────
  {
    topicSlug: 'interchange-fees',
    topicTitle: 'Interchange Fees',
    theme: 'Card Ecosystem',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Interchange Fees',
        description:
          'The hidden fee behind every card transaction. Interchange is the economic engine of the entire card ecosystem — it funds your rewards, pays for fraud protection, and is the most debated topic in payments.',
        objectives: [
          'Understand who pays interchange and who receives it',
          'Know the key factors that determine interchange rates (card type, MCC, transaction type)',
          'Explain how the Durbin Amendment reshaped debit economics',
          'Compare interchange-plus vs. blended pricing models for merchants',
          'Understand why interchange matters for fintech business models',
        ],
      },

      // Slide 2: Who Pays Whom
      {
        type: 'concept',
        label: 'Money Flow',
        title: 'Who Pays Whom',
        content: `<p>Interchange flows in one direction: from the <strong>acquirer</strong> (merchant's bank) to the <strong>issuer</strong> (cardholder's bank) on every card transaction.</p>
<p>On a <strong>$100 credit card purchase</strong>, here's how fees are split:</p>
<ul>
  <li><strong>Interchange (~$1.80)</strong> — goes to the issuing bank</li>
  <li><strong>Network assessment (~$0.14)</strong> — goes to Visa/Mastercard</li>
  <li><strong>Acquirer markup (~$0.40)</strong> — goes to the acquirer/processor</li>
</ul>
<p>The merchant receives <strong>~$97.66</strong>. Many merchants just see a blended rate like "2.9% + $0.30" and don't realize how the money is split behind the scenes.</p>
<div class="slide-callout">Common misconception: card networks do <strong>not</strong> earn interchange. They just set the rate and facilitate the transfer. Their revenue comes from assessment fees.</div>`,
      },

      // Slide 3: How Rates Are Set
      {
        type: 'concept',
        label: 'Rate Factors',
        title: 'How Interchange Rates Are Set',
        content: `<p>Interchange isn't a single rate — Visa and Mastercard publish tables with <strong>hundreds of different rates</strong>. The main variables:</p>
<ul>
  <li><strong>Card type</strong> — the biggest driver. Basic consumer credit: ~1.51% + $0.10. Premium rewards (Visa Signature): ~2.10% + $0.10. That's nearly 40% more.</li>
  <li><strong>MCC (Merchant Category Code)</strong> — grocery stores get lower rates than general retailers. Supermarkets negotiated favorable rates due to volume and thin margins.</li>
  <li><strong>Transaction type</strong> — card-present (chip at terminal) has lower interchange than card-not-present (online). Lower fraud = lower issuer risk = lower rate.</li>
  <li><strong>Data quality</strong> — B2B transactions with enhanced line-item data qualify for lower rates.</li>
</ul>
<div class="slide-callout">A regulated debit transaction at a supermarket might cost $0.24. A Visa Infinite credit card used online could cost $2.40 on the same $100 purchase — a <strong>10x difference</strong>.</div>`,
      },

      // Slide 4: Fee Flow Diagram
      {
        type: 'diagram',
        label: 'Fee Waterfall',
        title: 'The Interchange Fee Waterfall',
        mermaidCode: `sequenceDiagram
  participant M as Merchant
  participant ACQ as Acquirer
  participant NET as Card Network
  participant ISS as Issuing Bank
  Note over M,ISS: $100 purchase
  M->>ACQ: Submits $100 transaction
  ACQ->>NET: Routes via network
  NET->>ISS: Authorization + clearing
  Note over NET: Settlement calculates fees
  ISS-->>ACQ: Interchange ~$1.80 retained
  NET-->>NET: Assessment ~$0.14 retained
  ACQ-->>ACQ: Markup ~$0.40 retained
  ACQ->>M: Deposits $97.66`,
        caption:
          'On a $100 credit card transaction: the issuer keeps ~$1.80, the network keeps ~$0.14, the acquirer keeps ~$0.40.',
      },

      // Slide 5: The Durbin Amendment
      {
        type: 'concept',
        label: 'Regulation',
        title: 'The Durbin Amendment',
        content: `<p>The Durbin Amendment (2010) fundamentally changed debit card economics:</p>
<ul>
  <li>Capped debit interchange for banks with <strong>>$10B in assets</strong> at ~21 cents + 0.05% per transaction (down from ~44 cents average)</li>
  <li>Banks <strong>below $10B</strong> are exempt — their debit interchange can be 3-4x higher</li>
</ul>
<p>This exemption created a structural incentive in fintech: neobanks like Chime and Cash App deliberately partner with <strong>small, Durbin-exempt banks</strong> because the higher interchange revenue is critical to their business model.</p>
<div class="slide-callout">The exemption creates a "cliff effect" — a bank approaching $10B in assets faces a sharp drop in debit interchange revenue upon crossing the threshold.</div>`,
      },

      // Slide 6: Merchant Pricing Models
      {
        type: 'concept',
        label: 'Pricing',
        title: 'How Merchants Pay',
        content: `<p>Merchants encounter interchange through one of two pricing models:</p>
<ul>
  <li><strong>Interchange-plus</strong> — transparent. The merchant pays the actual interchange rate + a fixed processor markup (e.g., interchange + 0.20% + $0.10). Cost varies by card type but you see exactly what you're paying. Large merchants prefer this.</li>
  <li><strong>Blended pricing</strong> — simplified. One flat rate regardless of card type (e.g., 2.9% + $0.30). This is what Stripe and Square use. Simple and predictable, but merchants overpay on cheap cards and underpay on expensive ones.</li>
</ul>
<div class="slide-callout">For small businesses, blended pricing simplicity is worth the cost. For large businesses processing millions, the overpayment is significant — which is why they negotiate interchange-plus deals.</div>`,
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Interchange',
            definition:
              "A fee paid by the acquirer (merchant's bank) to the issuer (cardholder's bank) on each card transaction.",
          },
          {
            term: 'MCC',
            definition:
              'Merchant Category Code — a four-digit code classifying business type, which affects interchange rates.',
          },
          {
            term: 'Durbin Amendment',
            definition:
              'U.S. regulation capping debit interchange for banks over $10B in assets at roughly 21 cents + 0.05%.',
          },
          {
            term: 'Interchange Plus',
            definition:
              'A transparent pricing model where merchants pay the actual interchange fee plus a fixed processor markup.',
          },
          {
            term: 'Blended Pricing',
            definition:
              'A simplified pricing model where merchants pay one flat rate regardless of card type — usually more expensive overall.',
          },
          {
            term: 'Private Label Card',
            definition:
              "A store-branded card (like Macy's card) that only works at that retailer — no network interchange applies.",
          },
          {
            term: 'Co-Brand Card',
            definition:
              'A card branded by both a retailer and a network (like Amazon Visa) — uses network rails but with negotiated custom economics.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 6. DIGITAL WALLETS
  // ──────────────────────────────────────────────
  {
    topicSlug: 'digital-wallets',
    topicTitle: 'Digital Wallets',
    theme: 'Non-Card Payments',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Digital Wallets',
        description:
          'From Apple Pay to Alipay — "digital wallet" covers two fundamentally different things. Understanding the distinction explains why the West and East evolved radically different payment ecosystems.',
        objectives: [
          'Distinguish between pass-through wallets and staged wallets',
          'Understand how Apple Pay uses network tokenization (DPAN) to secure transactions',
          'Know the major staged wallets globally: PayPal, Alipay, WeChat Pay, M-PESA',
          'Explain the economic implications of each wallet type for card networks and merchants',
        ],
      },

      // Slide 2: Two Types of Wallets
      {
        type: 'concept',
        label: 'Overview',
        title: 'Two Wallets, Two Worlds',
        content: `<p>Apple Pay and Alipay are both called "digital wallets," but underneath they work in <strong>completely different ways</strong>:</p>
<ul>
  <li><strong>Pass-through wallet</strong> (Apple Pay, Google Pay, Samsung Pay) — stores your card credentials and routes transactions over the <strong>existing card network rails</strong>. The wallet is a convenience layer, not a financial intermediary.</li>
  <li><strong>Staged wallet</strong> (Alipay, WeChat Pay, PayPal, M-PESA) — holds <strong>actual money</strong> in a stored balance. Users load funds via bank transfer, card, or cash. Transactions don't necessarily touch card networks at all.</li>
</ul>
<div class="slide-callout">This distinction shapes economics globally: pass-through wallets preserve card interchange. Staged wallets can bypass card networks entirely.</div>`,
      },

      // Slide 3: Pass-Through vs. Staged (diagram)
      {
        type: 'diagram',
        label: 'Wallet Types',
        title: 'Pass-Through vs. Staged Wallets',
        mermaidCode: `graph TD
  subgraph PT["Pass-Through (Apple Pay)"]
    U1[User adds card] --> T1[Wallet stores DPAN token]
    T1 --> P1[Tap to pay at terminal]
    P1 --> N1[Routes over Visa/MC rails]
    N1 --> S1[Issuing bank settles normally]
  end
  subgraph ST["Staged (Alipay)"]
    U2[User loads balance] --> T2[Wallet holds funds]
    T2 --> P2[Scan QR code to pay]
    P2 --> N2[Wallet settles with merchant]
    N2 --> S2[No card network involved]
  end`,
        caption:
          'Pass-through wallets ride on existing card rails. Staged wallets hold their own funds and settle directly.',
      },

      // Slide 4: How Apple Pay Works
      {
        type: 'concept',
        label: 'Pass-Through',
        title: 'How Apple Pay Works',
        content: `<p>When you add a Visa card to Apple Pay, your <strong>actual card number never touches the phone</strong>. Instead, Visa issues a <strong>DPAN</strong> (Device PAN) — a unique token tied to that specific device.</p>
<p>When you tap to pay:</p>
<ul>
  <li>You authenticate with Face ID, Touch ID, or passcode</li>
  <li>The phone transmits the DPAN + a one-time cryptogram via NFC</li>
  <li>The terminal routes it to the acquirer, then to Visa</li>
  <li>Visa maps the DPAN back to your real card number and forwards to your issuer</li>
  <li>Your issuer approves or declines just like any card transaction</li>
</ul>
<p>Apple charges issuers ~0.15% per transaction for the privilege of being in Apple's wallet.</p>
<div class="slide-callout">The entire transaction flows over existing card network rails. Interchange, assessments, and acquirer markup all still apply.</div>`,
      },

      // Slide 5: Staged Wallets — The Global Giants
      {
        type: 'concept',
        label: 'Staged Wallets',
        title: 'Alipay, WeChat Pay, and M-PESA',
        content: `<p>Staged wallets hold actual money and evolved to fill gaps where card infrastructure was weak:</p>
<ul>
  <li><strong>Alipay</strong> — started as escrow for Alibaba's Taobao in 2004. Grew into a full financial platform with investing, credit scoring, and lending. Over 1 billion users. QR code payments revolutionized Chinese commerce.</li>
  <li><strong>WeChat Pay</strong> — piggy-backed on WeChat's 1B+ messaging users. The 2014 digital "red envelope" campaign linked millions of bank accounts in days — one of fintech's greatest growth hacks.</li>
  <li><strong>M-PESA</strong> — launched in Kenya in 2007 for the unbanked. Works on basic feature phones via SMS. Users deposit cash at agent shops. 50M+ active users across Africa.</li>
</ul>
<div class="slide-callout">In China, Alipay and WeChat Pay handle <strong>90%+ of mobile transactions</strong>. Neither requires a card network.</div>`,
      },

      // Slide 6: The Global Divergence
      {
        type: 'concept',
        label: 'Geography',
        title: 'The Global Divergence',
        content: `<p>Payment wallet types split geographically:</p>
<ul>
  <li><strong>The West</strong> (US, Europe) — pass-through wallets dominate. Apple Pay, Google Pay sit on top of mature card infrastructure. They add convenience and security but don't change the payment flow.</li>
  <li><strong>Asia</strong> (China, India, SE Asia) — staged wallets and QR codes dominate. Alipay, WeChat Pay, Paytm built their own ecosystems because card infrastructure was less developed.</li>
  <li><strong>Africa</strong> — mobile money (M-PESA) leapfrogged both cards and smartphones, serving populations with no existing financial infrastructure.</li>
</ul>
<div class="slide-callout">An American tapping their iPhone in London uses the same card rails as a physical card. A Chinese tourist scanning a QR code in Shanghai uses a completely separate system that never touches Visa.</div>`,
      },

      // Slide 7: Economics
      {
        type: 'concept',
        label: 'Economics',
        title: 'The Economic Implications',
        content: `<p>The wallet type determines who captures the economics:</p>
<ul>
  <li><strong>Pass-through wallets</strong> preserve existing card economics. Interchange still flows to issuers. Network assessments still flow to Visa/MC. Merchants pay the same costs whether the customer taps Apple Pay or inserts a plastic card.</li>
  <li><strong>Staged wallets</strong> disrupt those economics entirely. When someone pays with their Alipay balance, no card network is involved. No interchange is generated. Alipay charges merchants ~0.6% — far less than card interchange.</li>
</ul>
<div class="slide-callout">This is why Visa and Mastercard partner aggressively with pass-through wallets (keeping their rails relevant) while viewing staged wallets with concern. Tokenization is an existential priority for card networks.</div>`,
      },

      // Slide 8: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Pass-Through Wallet',
            definition:
              'A wallet like Apple Pay that stores card credentials and routes transactions over existing card network rails.',
          },
          {
            term: 'Staged Wallet',
            definition:
              'A wallet like PayPal or Alipay that holds its own balance of funds, with users loading money via bank transfer or card.',
          },
          {
            term: 'DPAN',
            definition:
              'Device PAN — a token issued by the card network that replaces the actual card number on a specific device.',
          },
          {
            term: 'Network Tokenization',
            definition:
              'Card networks issuing device-specific tokens (DPANs) so the real card number is never stored on a device or shared with merchants.',
          },
          {
            term: 'QR Code Payment',
            definition:
              'A payment method where users scan a QR code to initiate payment — dominant in China and India via Alipay, WeChat Pay, and UPI.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 7. FRAUD AND RISK
  // ──────────────────────────────────────────────
  {
    topicSlug: 'fraud-and-risk',
    topicTitle: 'Fraud & Risk',
    theme: 'Trust & Compliance',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Fraud & Risk',
        description:
          'Payment fraud is broader and stranger than most people realize. There are three distinct types, three detection checkpoints, and a fundamental paradox: the optimal fraud rate is not zero.',
        objectives: [
          'Identify the three types of payment fraud: friendly fraud, account takeover, and true fraud',
          'Understand the three detection checkpoints: merchant-side, network/acquirer, and issuer',
          'Explain the false decline problem and the fraud paradox',
          'Know how EMV shifted fraud from card-present to card-not-present channels',
        ],
      },

      // Slide 2: The Three Types of Fraud
      {
        type: 'concept',
        label: 'Fraud Types',
        title: 'The Three Flavors of Fraud',
        content: `<p>Not all payment fraud is the same. Each type requires a fundamentally different approach to detect and prevent:</p>
<ul>
  <li><strong>Friendly fraud</strong> — a legitimate cardholder disputes a charge they actually made. Sometimes genuine confusion (unrecognized billing descriptor), sometimes intentional abuse ("cyber-shoplifting"). Estimated <strong>60-80% of all chargebacks</strong>.</li>
  <li><strong>Account takeover (ATO)</strong> — a fraudster gains access to a real user's account through stolen passwords, phishing, or SIM swapping. Especially dangerous because they inherit the victim's trust signals.</li>
  <li><strong>True fraud</strong> — classic scenario: stolen card data from a breach or dark web marketplace ($5-20 for a card number with CVV) used to make unauthorized purchases.</li>
</ul>
<div class="slide-callout">Friendly fraud is the hardest to fight — the cardholder is real, the card isn't stolen, and authentication checks pass. The fraud only shows up when the dispute is filed.</div>`,
      },

      // Slide 3: Three Detection Points (diagram)
      {
        type: 'diagram',
        label: 'Detection Points',
        title: 'Three Fraud Detection Checkpoints',
        mermaidCode: `graph LR
  subgraph PRE["1. Merchant Side"]
    P1[Device Fingerprinting]
    P2[Behavioral Analytics]
    P3[Velocity Checks]
  end
  subgraph AUTH["2. Network / Acquirer"]
    A1[AVS Check]
    A2[CVV Verification]
    A3[3D Secure]
  end
  subgraph ISS["3. Issuer Decision"]
    I1[Spending Patterns]
    I2[ML Fraud Models]
    I3[Approve or Decline]
  end
  PRE --> AUTH --> ISS`,
        caption:
          'Fraud detection happens at three checkpoints: before submission, during authorization, and at the issuer.',
      },

      // Slide 4: Merchant-Side Detection
      {
        type: 'concept',
        label: 'Detection Point 1',
        title: 'Merchant-Side Detection',
        content: `<p>Before a transaction reaches the card network, the merchant evaluates it using their own fraud tools:</p>
<ul>
  <li><strong>Device fingerprinting</strong> — collects signals (screen resolution, browser plugins, timezone, OS) to create a unique device identifier. A "new customer" on a device linked to 15 chargebacks? Red flag.</li>
  <li><strong>Behavioral analytics</strong> — how fast is the user typing? Copy-pasting a card number (reading from stolen data) vs. typing manually? Fraudsters tend to skip browsing and move fast.</li>
  <li><strong>Velocity checks</strong> — five transactions in two minutes from the same IP, or ten cards from the same device in an hour. Legitimate customers don't behave this way.</li>
</ul>
<div class="slide-callout">Third-party platforms like Kount, Sift, and Riskified maintain massive databases of known fraudulent devices and use ML models trained on billions of transactions.</div>`,
      },

      // Slide 5: Network and Issuer Checks
      {
        type: 'concept',
        label: 'Detection Points 2-3',
        title: 'Network and Issuer Checks',
        content: `<p>After the merchant, additional verification happens at the network and issuer level:</p>
<ul>
  <li><strong>AVS (Address Verification)</strong> — compares submitted billing address against what's on file. Full match = positive signal. Complete mismatch = red flag.</li>
  <li><strong>CVV verification</strong> — the 3-digit code on the back. Fraudsters from database breaches often don't have it. Merchants are prohibited from storing CVV.</li>
  <li><strong>3D Secure 2.0</strong> — passes 100+ data elements to the issuer behind the scenes. Low-risk transactions flow through silently; high-risk trigger a one-time code. Also shifts fraud liability from merchant to issuer.</li>
</ul>
<p>The <strong>issuer</strong> is the final gatekeeper, running ML models against the cardholder's spending patterns, geography, and merchant categories in milliseconds.</p>
<div class="slide-callout">Modern issuer fraud models evaluate <strong>hundreds of signals in milliseconds</strong> and can send real-time notifications: "Did you just make a $500 purchase at Best Buy?"</div>`,
      },

      // Slide 6: The False Decline Problem
      {
        type: 'concept',
        label: 'False Declines',
        title: 'The False Decline Paradox',
        content: `<p>Here's the uncomfortable math: blocking more fraud also means <strong>blocking more legitimate transactions</strong>.</p>
<p>A <strong>false decline</strong> occurs when a legitimate transaction is incorrectly rejected. The numbers are striking:</p>
<ul>
  <li>For every <strong>$1 of actual fraud</strong>, merchants lose <strong>$13-30 in false declines</strong></li>
  <li><strong>33% of consumers</strong> who experience a false decline never shop with that merchant again</li>
  <li>Common triggers: traveling abroad, buying gifts at a different address, unusually large purchases</li>
</ul>
<div class="slide-callout"><strong>The fraud paradox:</strong> a system with zero fraud is not a good system. The optimal fraud rate is the point where the cost of preventing one more dollar of fraud equals the cost of the false declines you create.</div>`,
      },

      // Slide 7: The EMV Shift
      {
        type: 'concept',
        label: 'EMV Impact',
        title: 'The EMV Shift and Fraud Migration',
        content: `<p>EMV chip cards (liability shift October 2015) dramatically reduced card-present fraud — chip cryptograms make counterfeiting virtually impossible.</p>
<p>But fraud doesn't disappear — <strong>it migrates</strong>:</p>
<ul>
  <li>Card-not-present (CNP) fraud has roughly <strong>doubled</strong> since EMV</li>
  <li>CNP fraud (online shopping, phone orders) now accounts for the <strong>vast majority</strong> of card fraud</li>
  <li>Global card fraud exceeds <strong>$32 billion annually</strong> and is growing</li>
</ul>
<p>The fraud ecosystem is industrialized: one group steals data, another packages it, a third uses it for purchases, a fourth launders the goods.</p>
<div class="slide-callout">This is the "whack-a-mole" dynamic: every security improvement in one channel pushes fraud to less-protected channels.</div>`,
      },

      // Slide 8: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Friendly Fraud',
            definition:
              'When a legitimate cardholder disputes a charge they actually made — due to confusion or intentional abuse of the chargeback system.',
          },
          {
            term: 'Account Takeover',
            definition:
              'When a fraudster gains access to a legitimate account through stolen credentials, phishing, or social engineering.',
          },
          {
            term: 'False Decline',
            definition:
              'A legitimate transaction incorrectly blocked by fraud detection — often more costly than actual fraud.',
          },
          {
            term: 'Velocity Check',
            definition:
              'A fraud rule that flags or blocks transactions when too many occur in a short time period from the same card or account.',
          },
          {
            term: 'AVS',
            definition:
              'Address Verification Service — checks if the billing address provided matches the address on file with the card issuer.',
          },
          {
            term: 'CVV',
            definition:
              'Card Verification Value — the 3-digit security code on the back of a card, proving the cardholder has the physical card.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 8. CHARGEBACKS AND DISPUTES
  // ──────────────────────────────────────────────
  {
    topicSlug: 'chargebacks-and-disputes',
    topicTitle: 'Chargebacks & Disputes',
    theme: 'Trust & Compliance',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Chargebacks & Disputes',
        description:
          'When a cardholder says "I didn\'t authorize that," money gets pulled back from the merchant before anyone investigates. Chargebacks are a powerful consumer protection — and a $40+ billion annual cost for U.S. merchants.',
        objectives: [
          'Understand what a chargeback is and how it differs from a refund',
          'Trace the full chargeback lifecycle from dispute to representment to arbitration',
          'Know the legal foundation (Reg E, Reg Z) and liability rules',
          'Explain why friendly fraud accounts for 60-80% of chargebacks',
          'Understand the true cost of chargebacks and the 1% threshold',
        ],
      },

      // Slide 2: What Is a Chargeback
      {
        type: 'concept',
        label: 'The Basics',
        title: 'What Is a Chargeback?',
        content: `<p>A <strong>chargeback</strong> is a forced reversal of a card transaction, initiated by the cardholder's bank. The merchant doesn't get a choice — the money is taken first, and they can argue later.</p>
<p>How it differs from a refund:</p>
<ul>
  <li><strong>Refund</strong> — the customer asks the merchant directly, and the merchant voluntarily returns the money</li>
  <li><strong>Chargeback</strong> — the customer goes to their bank, bypassing the merchant entirely. The bank pulls the money back through the card network.</li>
</ul>
<p>U.S. merchants lose an estimated <strong>$40+ billion per year</strong> to chargebacks.</p>
<div class="slide-callout">Chargebacks were designed as consumer protection — and they work well for that purpose. But they've also become one of the most expensive aspects of card payments.</div>`,
      },

      // Slide 3: The Legal Foundation
      {
        type: 'concept',
        label: 'Legal Basis',
        title: 'The Legal Foundation',
        content: `<p>Chargebacks exist because of federal law, not network generosity:</p>
<ul>
  <li><strong>Regulation Z</strong> (Truth in Lending Act) — covers credit cards. Caps consumer liability for unauthorized charges at $50. In practice, virtually every major issuer offers <strong>zero liability</strong>.</li>
  <li><strong>Regulation E</strong> (Electronic Fund Transfer Act) — covers debit cards. Report within 2 business days: $50 max liability. Between 2-60 days: $500. After 60 days: potentially unlimited.</li>
</ul>
<p>Card networks layer their own rules on top — extending dispute windows, standardizing the process, and creating arbitration frameworks.</p>
<div class="slide-callout">These regulations give cardholders enormous power. The system is deliberately tilted in the consumer's favor — by design.</div>`,
      },

      // Slide 4: The Chargeback Flow (diagram)
      {
        type: 'diagram',
        label: 'Lifecycle',
        title: 'The Chargeback Lifecycle',
        mermaidCode: `sequenceDiagram
  participant CH as Cardholder
  participant I as Issuing Bank
  participant N as Card Network
  participant A as Acquiring Bank
  participant M as Merchant
  CH->>I: I did not make this charge
  I->>CH: Issue provisional credit
  I->>N: File chargeback with reason code
  N->>A: Forward chargeback
  A->>M: Debit merchant + chargeback fee
  Note over M: 30-45 days to respond
  M->>A: Submit representment evidence
  A->>N: Forward representment
  N->>I: Issuer reviews evidence
  Note over I: Accept or reject evidence`,
        caption:
          'The cardholder gets money back immediately via provisional credit. The merchant must then prove the transaction was legitimate.',
      },

      // Slide 5: Reason Codes and Representment
      {
        type: 'concept',
        label: 'Fighting Back',
        title: 'Reason Codes and Representment',
        content: `<p>Every chargeback comes with a <strong>reason code</strong> categorizing the dispute:</p>
<ul>
  <li><strong>Fraud</strong> — "I didn't make this transaction"</li>
  <li><strong>Merchandise not received</strong> — "I paid but never got the product"</li>
  <li><strong>Not as described</strong> — "What I received was different"</li>
  <li><strong>Duplicate processing</strong> — "I was charged twice"</li>
</ul>
<p>To fight back, merchants use <strong>representment</strong> — submitting evidence the transaction was legitimate (delivery confirmation, signed receipts, IP logs, 3D Secure proof).</p>
<div class="slide-callout">Merchants win representment only about <strong>20-30% of the time</strong>. This is why chargeback <strong>prevention</strong> is almost always more cost-effective than fighting chargebacks after the fact.</div>`,
      },

      // Slide 6: Friendly Fraud
      {
        type: 'concept',
        label: 'Friendly Fraud',
        title: 'The Friendly Fraud Problem',
        content: `<p>Not all chargebacks are legitimate. <strong>Friendly fraud</strong> is when the actual cardholder files a dispute for a transaction they genuinely made.</p>
<ul>
  <li><strong>Intentional</strong> — buy an item, receive it, then claim it never arrived. Get both the product and the refund.</li>
  <li><strong>Unintentional</strong> — don't recognize the billing descriptor, forgot about a subscription, or a family member made the purchase.</li>
</ul>
<p>Friendly fraud is estimated to account for <strong>60-80% of all chargebacks</strong>. It's the hardest to fight because "I didn't authorize this" is difficult to disprove.</p>
<div class="slide-callout">Merchants combat friendly fraud with clearer billing descriptors, explicit cancellation policies, proactive customer communication, and detailed record-keeping.</div>`,
      },

      // Slide 7: The True Cost
      {
        type: 'concept',
        label: 'True Cost',
        title: 'The True Cost of Chargebacks',
        content: `<p>A chargeback costs far more than just the transaction amount. The full cost stacks up:</p>
<ul>
  <li>The <strong>purchase price</strong> — refunded to cardholder</li>
  <li>The <strong>lost merchandise</strong> — customer keeps it</li>
  <li>A <strong>chargeback fee</strong> — $25-$35 per incident, regardless of outcome</li>
  <li><strong>Non-refunded processing fees</strong></li>
  <li><strong>Staff time</strong> spent on representment</li>
</ul>
<p>Industry estimates: the true cost is <strong>2-3x the original transaction</strong>. A $100 chargeback might cost $200-$300.</p>
<div class="slide-callout">If a merchant's chargeback rate exceeds <strong>~1% of transactions</strong> (Visa's threshold), they enter monitoring programs with fines and risk losing the ability to accept cards entirely.</div>`,
      },

      // Slide 8: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Chargeback',
            definition:
              "A forced reversal of a card transaction initiated by the cardholder's bank — pulling funds back from the merchant through the card network.",
          },
          {
            term: 'Provisional Credit',
            definition:
              'A temporary credit issued to the cardholder while a dispute is investigated — the consumer gets money back before fault is determined.',
          },
          {
            term: 'Representment',
            definition:
              "The process where a merchant challenges a chargeback by submitting evidence the transaction was legitimate — literally 're-presenting' the charge.",
          },
          {
            term: 'Reason Code',
            definition:
              'A standardized code assigned to a chargeback categorizing the dispute — fraud, merchandise not received, duplicate processing, etc.',
          },
          {
            term: 'Regulation Z',
            definition:
              'Federal regulation covering credit card transactions. Caps consumer liability for unauthorized charges at $50.',
          },
          {
            term: 'Regulation E',
            definition:
              'Federal regulation covering debit card transactions. Defines consumer liability limits and dispute resolution timelines.',
          },
          {
            term: 'Friendly Fraud',
            definition:
              'A chargeback filed by a cardholder who actually made the purchase — whether intentionally or due to confusion about the charge.',
          },
          {
            term: '3D Secure',
            definition:
              'An authentication protocol for online card payments that adds a verification step to shift fraud liability from merchant to issuer.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 1. Issuer Processors ───────────────────────────────────────────
  {
    topicSlug: 'issuer-processors',
    topicTitle: 'Issuer Processors',
    theme: 'Card Ecosystem',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Issuer Processors',
        description:
          'When you tap your card and see "Approved," your bank probably didn\'t make that decision. An issuer processor did. These invisible technology companies are the brains behind every card transaction — handling authorization, fraud checks, and balance management in milliseconds.',
        objectives: [
          'Understand what an issuer processor does and why banks outsource to them',
          'Distinguish between legacy processors (FIS, Fiserv) and modern API-first processors (Marqeta, Galileo, Lithic)',
          'Explain how JIT Funding works and why it matters for fintechs',
          'Know the BaaS stack that lets non-banks issue cards',
        ],
      },

      // Slide 2: What Is an Issuer Processor?
      {
        type: 'concept',
        label: 'Core Concept',
        title: 'What Is an Issuer Processor?',
        content: `<p>An <strong>issuer processor</strong> is the technology company that sits between the issuing bank and the card network. It does the actual work of running a card program.</p>
<p>When you tap your Chime debit card at a store, a company called <strong>Galileo</strong> receives the authorization request, checks your balance, runs fraud rules, and sends back the approval. The bank is barely involved.</p>
<ul>
  <li><strong>Transaction authorization</strong> — approve or decline in milliseconds</li>
  <li><strong>Card management</strong> — issue cards, set PINs, handle replacements, tokenize for Apple Pay</li>
  <li><strong>Fraud screening</strong> — execute rules and ML models in real time</li>
  <li><strong>Ledger management</strong> — maintain your real-time balance</li>
  <li><strong>Clearing &amp; settlement</strong> — reconcile transactions and move money at end of day</li>
</ul>
<div class="slide-callout">If the issuing bank is the legal entity on the card, the issuer processor is the <strong>brain</strong> that makes it all work.</div>`,
      },

      // Slide 3: Legacy vs. Modern Processors
      {
        type: 'concept',
        label: 'Market Landscape',
        title: 'Legacy vs. Modern Processors',
        content: `<p>The issuer processing market is split into two camps:</p>
<p><strong>Legacy processors</strong> (FIS/TSYS, Fiserv) were built on mainframes decades ago. They still handle <strong>87% of all credit card transactions globally</strong> — about $8 trillion per year. They are rock-solid reliable, but slow to integrate (12–18 months to launch) and use old-school batch files instead of real-time APIs.</p>
<p><strong>Modern API-first processors</strong> (Marqeta, Galileo, Lithic, Highnote, i2c) are cloud-native and developer-friendly. They offer launch times of 1–12 weeks, real-time webhooks, and self-service controls.</p>
<div class="slide-callout">Despite every advantage of modern processors, <strong>legacy systems still dominate</strong>. TSYS alone handled 35 billion transactions per year before the FIS acquisition. The incumbents' installed base is enormous.</div>`,
      },

      // Slide 4: The Hardware Connection
      {
        type: 'concept',
        label: 'Infrastructure',
        title: 'MIP, VIP, and Why Banks Outsource',
        content: `<p>Connecting to Visa or Mastercard isn't a matter of calling an API. Card networks require processors to install <strong>dedicated hardware</strong> in certified data centers.</p>
<ul>
  <li><strong>MIP</strong> (Mastercard Interface Processor) — physical hardware connecting to Mastercard's Banknet</li>
  <li><strong>VIP</strong> (VisaNet Integrated Payment) — dedicated hardware connecting to VisaNet</li>
</ul>
<p>Maintaining this infrastructure costs <strong>tens of millions of dollars</strong>. It only makes economic sense if you process billions of transactions per year across many clients.</p>
<div class="slide-callout">This hardware requirement is the key reason most banks don't process transactions themselves. The cost of MIP/VIP infrastructure, certifications, and 24/7 operations is prohibitive.</div>`,
      },

      // Slide 5: JIT Funding
      {
        type: 'concept',
        label: 'Key Innovation',
        title: 'Just-in-Time (JIT) Funding',
        content: `<p><strong>JIT Funding</strong>, pioneered by Marqeta, is one of the most important innovations in modern card processing.</p>
<p>In the traditional model, a prepaid or debit card holds a pre-loaded balance. JIT Funding flips this: the card holds <strong>$0</strong>. When a transaction comes in, the processor sends a real-time webhook to the fintech asking "do you approve this $47.50 charge?" The fintech decides and funds it instantly.</p>
<p>Two variants exist:</p>
<ul>
  <li><strong>Gateway JIT</strong> — the fintech gets every transaction for a real-time decision (full custom control)</li>
  <li><strong>Managed JIT</strong> — the processor handles decisions based on pre-set rules (simpler to implement)</li>
</ul>
<div class="slide-callout">JIT Funding is why Chime can offer fee-free overdraft, why Cash App gives instant access to deposits, and why corporate expense cards can enforce per-merchant spending limits in real time.</div>`,
      },

      // Slide 6: The BaaS Stack (diagram)
      {
        type: 'diagram',
        label: 'BaaS Stack',
        title: 'How Fintechs Launch Card Programs',
        mermaidCode: `graph TD
  A[Fintech App] -->|Uses| B[Program Manager]
  B -->|Coordinates| C[Issuer Processor]
  B -->|Partners with| D[Sponsor Bank]
  B -->|Integrates| E[KYC Provider]
  C -->|Connects to| F[Card Networks]
  D -->|Provides| G[Banking License and BIN]`,
        caption:
          'The BaaS stack: a fintech needs a program manager, issuer processor, sponsor bank, and KYC provider to issue cards. The processor is the central nervous system.',
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Issuer Processor',
            definition:
              'A technology company that handles transaction authorization, card management, and settlement on behalf of the issuing bank.',
          },
          {
            term: 'MIP / VIP',
            definition:
              'Dedicated hardware connecting a processor to Mastercard (MIP) or Visa (VIP) networks — required for all processors.',
          },
          {
            term: 'JIT Funding',
            definition:
              'Just-in-Time Funding — cards hold $0 until a transaction occurs, then the fintech funds it in real time.',
          },
          {
            term: 'Sponsor Bank',
            definition:
              'A chartered bank that provides its banking license and BIN to enable fintechs to issue cards.',
          },
          {
            term: 'Program Manager',
            definition:
              'The entity managing day-to-day card program operations — compliance, customer service, vendor coordination.',
          },
          {
            term: 'Card-as-a-Service',
            definition:
              'A model where processors provide the full stack for issuing cards — from BIN sponsorship to processing — as a managed service.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 2. Acquirer Processors ─────────────────────────────────────────
  {
    topicSlug: 'acquirer-processors',
    topicTitle: 'Acquirer Processors',
    theme: 'Card Ecosystem',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Acquirer Processors',
        description:
          'When you tap your card at a coffee shop, the terminal doesn\'t connect directly to Visa. An acquirer processor handles the heavy lifting — formatting the message, routing it to the right network, and making sure the merchant gets paid. They\'re the technology backbone on the merchant side of every card transaction.',
        objectives: [
          'Understand the difference between an acquirer (bank) and an acquirer processor (technology)',
          'Know the core functions: transaction routing, terminal management, settlement, and chargeback handling',
          'Distinguish between acquirer processors and PayFacs (Stripe, Square)',
          'Understand the interchange-plus pricing model',
        ],
      },

      // Slide 2: Acquirer vs. Acquirer Processor
      {
        type: 'concept',
        label: 'Key Distinction',
        title: 'Acquirer vs. Acquirer Processor',
        content: `<p>This distinction trips up a lot of people:</p>
<ul>
  <li><strong>Acquirer (acquiring bank)</strong> — the financial institution that holds the merchant's account and takes on the financial risk of processing card payments</li>
  <li><strong>Acquirer processor</strong> — the technology company that runs the infrastructure: formatting messages, routing to networks, managing terminals, processing settlements</li>
</ul>
<p>Sometimes they're the same company (Chase Paymentech = bank + processor). Often they're separate — a small bank might outsource all technology to Fiserv's First Data.</p>
<div class="slide-callout">The acquiring bank owns the <strong>merchant relationship and financial risk</strong>. The acquirer processor owns the <strong>technology and network connections</strong>.</div>`,
      },

      // Slide 3: Core Functions
      {
        type: 'concept',
        label: 'Core Functions',
        title: 'What an Acquirer Processor Does',
        content: `<p>The acquirer processor handles everything on the merchant's side of a card transaction:</p>
<ul>
  <li><strong>Transaction routing</strong> — formats ISO 8583 messages and sends them to the correct card network (Visa, Mastercard, Amex). For debit cards, it chooses between multiple debit networks based on cost (Durbin Amendment).</li>
  <li><strong>Terminal management</strong> — deploys encryption keys, pushes software updates, certifies terminals for EMV chip and contactless payments</li>
  <li><strong>Settlement</strong> — collects authorized transactions into batch files, submits to networks, and deposits merchant proceeds (minus fees)</li>
  <li><strong>Chargeback management</strong> — receives dispute notifications, alerts merchants, collects representment documents, tracks deadlines</li>
</ul>
<div class="slide-callout">For a processor managing <strong>millions of terminals</strong> across thousands of merchants, terminal management alone is a massive operational undertaking.</div>`,
      },

      // Slide 4: Transaction Flow (diagram)
      {
        type: 'diagram',
        label: 'Transaction Flow',
        title: 'How a Transaction Flows on the Acquiring Side',
        mermaidCode: `sequenceDiagram
  participant M as Merchant Terminal
  participant PG as Payment Gateway
  participant AP as Acquirer Processor
  participant N as Card Network
  M->>PG: Card data + amount
  PG->>AP: Authorization request
  AP->>N: Route to correct network
  N-->>AP: Approved / Declined
  AP-->>PG: Response
  PG-->>M: Display result`,
        caption:
          'The acquiring-side transaction flow. For in-store transactions, the terminal may connect directly to the processor, bypassing the gateway. For e-commerce, a payment gateway is always involved.',
      },

      // Slide 5: PayFacs vs. Processors
      {
        type: 'concept',
        label: 'Common Misconception',
        title: 'Stripe and Square Are NOT Acquirer Processors',
        content: `<p><strong>Stripe, Square, and PayPal are Payment Facilitators (PayFacs)</strong>, not acquirer processors. The difference matters:</p>
<ul>
  <li>A traditional acquirer processor gives each merchant its <strong>own merchant ID (MID)</strong> and a direct relationship with an acquiring bank. Onboarding takes days or weeks.</li>
  <li>A PayFac aggregates many sub-merchants under its <strong>own master MID</strong>. That's why Stripe can onboard you in minutes. The trade-off: higher fees for the convenience.</li>
</ul>
<p>The key point: <strong>PayFacs still use acquirer processors underneath</strong>. Stripe routes most US transactions through Fiserv's First Data. Square uses Chase Paymentech.</p>
<div class="slide-callout">A coffee shop doing $50K/month is well-served by a PayFac. A retailer doing $50M/month typically works directly with an acquirer processor for lower fees.</div>`,
      },

      // Slide 6: Business Model
      {
        type: 'concept',
        label: 'Economics',
        title: 'How Acquirer Processors Make Money',
        content: `<p>Acquirer processors earn through several fee types:</p>
<ul>
  <li><strong>Per-transaction markup (Interchange Plus)</strong> — the merchant pays the actual interchange fee plus a fixed processor markup (e.g., 0.10% + $0.05). On a $100 purchase at 1.80% interchange, the processor keeps about $0.15.</li>
  <li><strong>Terminal fees</strong> — monthly rental fees of $20–$100+ per device</li>
  <li><strong>PCI compliance fees</strong> — $80–$200/year for helping merchants meet security standards</li>
  <li><strong>Chargeback fees</strong> — $15–$25 per dispute, regardless of outcome</li>
</ul>
<p><strong>ISOs</strong> (Independent Sales Organizations) are licensed resellers who sign up merchants on behalf of processors. They earn a cut of the transaction markup.</p>
<div class="slide-callout">Interchange Plus is the most transparent pricing model. The merchant sees exactly what the network charges and what the processor adds on top.</div>`,
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Acquirer Processor',
            definition:
              'A technology platform that routes transaction data from merchants through card networks for authorization and settlement.',
          },
          {
            term: 'Payment Gateway',
            definition:
              'Software that captures card data from merchants (especially online) and passes it to the acquirer processor.',
          },
          {
            term: 'PayFac',
            definition:
              'Payment Facilitator — aggregates sub-merchants under its own merchant ID for fast onboarding (e.g., Stripe, Square).',
          },
          {
            term: 'ISO',
            definition:
              'Independent Sales Organization — a licensed reseller of merchant acquiring services.',
          },
          {
            term: 'Interchange Plus',
            definition:
              'A transparent pricing model where merchants pay the actual interchange fee plus a fixed processor markup.',
          },
          {
            term: 'MID',
            definition:
              'Merchant ID — a unique identifier assigned to a merchant for processing card transactions.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 3. Real-Time Payments ──────────────────────────────────────────
  {
    topicSlug: 'real-time-payments',
    topicTitle: 'Real-Time Payments',
    theme: 'Non-Card Payments',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Real-Time Payments',
        description:
          'A street vendor in Mumbai gets paid in 2 seconds via UPI. A freelancer in Brazil receives money instantly via Pix. Meanwhile, Americans are still waiting 1–3 business days for a bank transfer. How did much of the world leapfrog ahead — and what does this mean for the future of payments?',
        objectives: [
          'Define the four characteristics that make a payment system "real-time"',
          'Compare UPI (India), Pix (Brazil), Faster Payments (UK), and FedNow/RTP (US)',
          'Understand why the US has been slow to adopt instant payments',
          'Explain why real-time payments could challenge card networks',
        ],
      },

      // Slide 2: What Makes It Real-Time?
      {
        type: 'concept',
        label: 'Definition',
        title: 'What Makes a Payment "Real-Time"?',
        content: `<p>Not every fast payment is a real-time payment. To qualify, a system needs <strong>four characteristics</strong>:</p>
<ul>
  <li><strong>Instant</strong> — funds available to the recipient within seconds, not minutes or hours</li>
  <li><strong>Always on</strong> — operates 24/7/365. No cutoff times, no holidays, no business-day limitations</li>
  <li><strong>Irrevocable</strong> — once confirmed, the payment is final. No chargebacks, no recall rights</li>
  <li><strong>Push-based</strong> — the sender initiates and authorizes the payment. Nobody can pull money from your account without your action</li>
</ul>
<div class="slide-callout">Push-only design eliminates entire categories of fraud that plague pull-based systems like ACH and card payments. The sender is always in control.</div>`,
      },

      // Slide 3: UPI — India's Revolution
      {
        type: 'concept',
        label: 'Case Study',
        title: 'UPI: India\'s Payment Revolution',
        content: `<p>India's <strong>UPI</strong> (Unified Payments Interface) is the most successful real-time payment system ever built, processing <strong>12+ billion transactions per month</strong> — more than Visa and Mastercard combined in India.</p>
<p>Key design choices that drove adoption:</p>
<ul>
  <li><strong>Virtual Payment Address (VPA)</strong> — users create an alias like "rahul@okaxis" instead of sharing bank account numbers</li>
  <li><strong>QR codes</strong> — a street vendor can print a free QR code and accept digital payments with zero hardware and zero fees</li>
  <li><strong>Zero cost</strong> for small merchants — radically different from 2–3% card processing fees</li>
  <li><strong>App-based</strong> — PhonePe, Google Pay, and Paytm are interfaces to UPI, not middlemen holding funds</li>
</ul>
<div class="slide-callout">UPI processed over <strong>$2 trillion</strong> in transaction value in 2023. It's so successful that other countries are licensing the UPI architecture.</div>`,
      },

      // Slide 4: Pix & Faster Payments
      {
        type: 'concept',
        label: 'Global Systems',
        title: 'Pix (Brazil) and Faster Payments (UK)',
        content: `<p><strong>Pix</strong> is the fastest-adopted payment system in history. Launched in November 2020, it reached <strong>62% of adult Brazilians within one year</strong>. Over 150 million people now use it regularly.</p>
<ul>
  <li>Free for consumers, just 0.22% for businesses</li>
  <li>The central bank <strong>mandated participation</strong> for all banks with 500K+ accounts</li>
  <li>Has cannibalized cash, debit cards, and Brazil's legacy boleto payment system</li>
</ul>
<p><strong>UK Faster Payments</strong> launched in 2008, processing payments in seconds 24/7. It handles over 4 billion transactions per year and proved that real-time bank transfers work at national scale.</p>
<div class="slide-callout">Brazil's Pix shows what happens when a central bank <strong>mandates</strong> participation and makes the system <strong>free for consumers</strong> — adoption explodes.</div>`,
      },

      // Slide 5: The US Situation
      {
        type: 'concept',
        label: 'US Market',
        title: 'Why the US Is Late to the Party',
        content: `<p>The US has <strong>two competing</strong> real-time payment systems, and neither has achieved widespread adoption:</p>
<ul>
  <li><strong>RTP</strong> (The Clearing House, 2017) — push-only, 24/7, costs just $0.045 per transaction. Reaches ~65% of US deposit accounts.</li>
  <li><strong>FedNow</strong> (Federal Reserve, 2023) — similar capabilities. Every US bank already has a Fed relationship, making onboarding potentially easier.</li>
</ul>
<p>Why hasn't it taken off?</p>
<ul>
  <li><strong>Card dominance</strong> — Americans love credit card rewards. No incentive to switch.</li>
  <li><strong>Misaligned bank incentives</strong> — large banks earn billions from interchange. Free instant payments cannibalize that revenue.</li>
  <li><strong>Fragmentation</strong> — two competing systems means neither has universal reach</li>
</ul>
<div class="slide-callout">In India and Brazil, real-time payments filled a vacuum. In the US, they're trying to displace an entrenched, well-loved card system.</div>`,
      },

      // Slide 6: Global Timeline (diagram)
      {
        type: 'diagram',
        label: 'Timeline',
        title: 'The Global March Toward Instant Payments',
        mermaidCode: `graph LR
  A[1973: Japan Zengin] --> B[2008: UK Faster Payments]
  B --> C[2010: India IMPS]
  C --> D[2016: India UPI]
  D --> E[2017: US RTP]
  E --> F[2020: Brazil Pix]
  F --> G[2023: US FedNow]`,
        caption:
          'Japan pioneered real-time interbank payments in 1973. The US didn\'t get a central-bank-operated instant payment system until FedNow launched 50 years later.',
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'UPI',
            definition:
              'Unified Payments Interface — India\'s real-time payment system enabling instant bank-to-bank transfers via mobile, processing 12+ billion transactions monthly.',
          },
          {
            term: 'Pix',
            definition:
              'Brazil\'s instant payment system launched in 2020 — free for consumers, available 24/7, adopted by 62% of Brazilians within a year.',
          },
          {
            term: 'RTP',
            definition:
              'Real-Time Payments — The Clearing House\'s US instant payment network, push-only, available 24/7. Costs $0.045 per transaction.',
          },
          {
            term: 'FedNow',
            definition:
              'The Federal Reserve\'s instant payment service launched in 2023, competing with RTP to bring real-time payments to all US banks.',
          },
          {
            term: 'VPA',
            definition:
              'Virtual Payment Address — the human-readable identifier used in UPI (like username@bank) instead of account numbers.',
          },
          {
            term: 'Push-Based Payment',
            definition:
              'A payment where the sender initiates and authorizes the transfer. Nobody can pull money from your account without your action.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 4. Open Banking ────────────────────────────────────────────────
  {
    topicSlug: 'open-banking',
    topicTitle: 'Open Banking',
    theme: 'Non-Card Payments',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Open Banking',
        description:
          'For decades, banks held your financial data hostage. Open banking changed that — regulators forced banks to share data via secure APIs, creating an entirely new ecosystem of third-party financial services. From budgeting apps to pay-by-bank checkout, open banking is reshaping how money moves.',
        objectives: [
          'Understand the core principle: customers own their financial data',
          'Know the key participants — AISPs, PISPs, and ASPSPs',
          'Explain how Pay by Bank threatens card networks',
          'Compare regulatory approaches across the UK, EU, US, and emerging markets',
          'Understand Variable Recurring Payments (VRPs) and Open Finance',
        ],
      },

      // Slide 2: The Core Principle
      {
        type: 'concept',
        label: 'Fundamentals',
        title: 'You Own Your Financial Data',
        content: `<p>Before open banking, if a budgeting app wanted your transaction data, it had to <strong>screen scrape</strong> — you'd hand over your bank login credentials and the app would pretend to be you browsing the bank's website. Fragile, insecure, and risky.</p>
<p><strong>Open banking</strong> fixes this with a simple principle: customers own their financial data and should be able to share it with authorized third parties via <strong>secure, standardized APIs</strong> — not by sharing passwords.</p>
<p>This was forced by regulators — banks had no incentive to open their data to competitors:</p>
<ul>
  <li><strong>PSD2</strong> (EU, 2018) — mandated banks provide APIs for account data and payment initiation</li>
  <li><strong>CMA Order</strong> (UK, 2018) — ordered the 9 largest UK banks to adopt common API standards</li>
  <li><strong>Section 1033</strong> (US, 2024) — CFPB rule (currently in flux) for personal financial data rights</li>
</ul>
<div class="slide-callout">By 2025, there were <strong>183 million</strong> open banking users globally, projected to reach 645 million by 2029.</div>`,
      },

      // Slide 3: The Participants
      {
        type: 'concept',
        label: 'Key Players',
        title: 'AISPs, PISPs, and ASPSPs',
        content: `<p>Open banking has three types of participants:</p>
<ul>
  <li><strong>ASPSP (Bank)</strong> — Account Servicing Payment Service Provider. The bank that holds your account. Must provide API access to authorized third parties — regulation compels them.</li>
  <li><strong>AISP</strong> — Account Information Service Provider. Has <strong>read-only</strong> access to account data (balances, transactions). Think: budgeting apps like Emma or Yolt that aggregate your accounts.</li>
  <li><strong>PISP</strong> — Payment Initiation Service Provider. Can <strong>initiate payments</strong> from your bank account. When a merchant offers "Pay by Bank," a PISP is orchestrating it.</li>
</ul>
<p>All third parties must be <strong>licensed by regulators</strong> and registered in a trust framework. Access requires <strong>explicit customer consent</strong> via Strong Customer Authentication (SCA).</p>
<div class="slide-callout">The customer never shares bank credentials with a third party. They authenticate directly with their bank — the third party only receives a scoped, time-limited token.</div>`,
      },

      // Slide 4: Pay by Bank
      {
        type: 'concept',
        label: 'Disruptor',
        title: 'Pay by Bank: The Card Network Threat',
        content: `<p><strong>Pay by Bank</strong> lets customers pay merchants directly from their bank account at checkout — bypassing card networks entirely.</p>
<p>Why merchants want it:</p>
<ul>
  <li><strong>Lower fees</strong> — no interchange, no card network assessments. Up to 40–85% savings vs. credit cards.</li>
  <li><strong>Irrevocable payments</strong> — no chargebacks</li>
  <li><strong>Real-time settlement</strong> — funds in seconds, not T+2 days</li>
  <li><strong>No card data to secure</strong> — reduces PCI compliance burden</li>
</ul>
<p>Why consumer adoption is slow:</p>
<ul>
  <li><strong>No rewards</strong> — credit cards offer cash back and points</li>
  <li><strong>No credit</strong> — bank payments draw from available funds</li>
  <li><strong>Unfamiliar</strong> — 56% of US consumers cite security concerns</li>
</ul>
<div class="slide-callout">Card networks are adapting by <strong>acquiring</strong> open banking companies. Visa bought Tink for $2.2B. Mastercard acquired Finicity and Aiia.</div>`,
      },

      // Slide 5: VRPs and Open Finance
      {
        type: 'concept',
        label: 'What\'s Next',
        title: 'VRPs and Open Finance',
        content: `<p><strong>Variable Recurring Payments (VRPs)</strong> solve a key limitation of open banking: every payment previously required separate authentication. VRPs let customers set up long-lived consents for recurring payments with variable amounts within defined limits.</p>
<ul>
  <li><strong>Sweeping VRP</strong> — moving money between your own accounts (e.g., auto-save excess balance)</li>
  <li><strong>Commercial VRP</strong> — paying third parties (subscriptions, utilities). Launching in the UK in 2026.</li>
</ul>
<p><strong>Open Finance</strong> extends open banking beyond bank accounts to all financial products — insurance, pensions, investments, mortgages. Brazil leads globally, having expanded to cover insurance, investments, and foreign exchange.</p>
<div class="slide-callout">VRPs account for ~16% of UK open banking transactions, and total open banking payment volumes grew <strong>53% year-on-year</strong> in 2025.</div>`,
      },

      // Slide 6: Open Banking Ecosystem (diagram)
      {
        type: 'diagram',
        label: 'Ecosystem',
        title: 'How Open Banking Connects the Players',
        mermaidCode: `graph LR
  C[Customer] -->|Gives consent| TPP[Third Party Provider]
  TPP -->|Registered in| DIR[Trust Framework]
  DIR -->|Verified| BANK[Bank - ASPSP]
  AISP[AISP: Read Data] -->|GET /accounts| BANK
  PISP[PISP: Initiate Payment] -->|POST /payments| BANK
  BANK -->|Data or Confirmation| TPP
  TPP -->|Service delivered| C`,
        caption:
          'Customers consent to third-party providers accessing their bank via regulated APIs. AISPs read data; PISPs initiate payments. All participants are verified through a trust framework.',
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'PSD2',
            definition:
              'Payment Services Directive 2 — the EU regulation (2018) that mandated banks provide APIs for account data and payment initiation to licensed third parties.',
          },
          {
            term: 'AISP',
            definition:
              'Account Information Service Provider — a regulated entity authorized to read bank account data (balances, transactions) with customer consent.',
          },
          {
            term: 'PISP',
            definition:
              'Payment Initiation Service Provider — a regulated entity authorized to initiate payments directly from a customer\'s bank account.',
          },
          {
            term: 'SCA',
            definition:
              'Strong Customer Authentication — PSD2 requirement for two-factor authentication using knowledge, possession, and/or inherence.',
          },
          {
            term: 'VRP',
            definition:
              'Variable Recurring Payments — allows customers to authorize a provider to make multiple future payments with variable amounts within set limits.',
          },
          {
            term: 'Screen Scraping',
            definition:
              'The pre-open-banking method of accessing bank data by storing customer login credentials and navigating the bank\'s website — insecure and now largely banned.',
          },
          {
            term: 'Open Finance',
            definition:
              'The extension of open banking principles beyond bank accounts to insurance, pensions, investments, and other financial products.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 5. KYC & Identity Verification ─────────────────────────────────
  {
    topicSlug: 'kyc-and-identity',
    topicTitle: 'KYC & Identity Verification',
    theme: 'Trust & Compliance',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'KYC & Identity Verification',
        description:
          'Every financial institution must answer one question before letting you transact: who are you, really? KYC (Know Your Customer) is the legal requirement to verify identity — and getting it right is the difference between blocking bad actors and locking out the people who need financial services most.',
        objectives: [
          'Understand why KYC exists and what regulations drive it',
          'Walk through the verification flow: data collection, database checks, risk scoring, and step-ups',
          'Explain Progressive KYC and why it improves the user experience',
          'Recognize the thin-file problem and who it affects',
          'Know the difference between KYC (individuals) and KYB (businesses)',
        ],
      },

      // Slide 2: Why KYC Exists
      {
        type: 'concept',
        label: 'Background',
        title: 'Why KYC Exists',
        content: `<p><strong>KYC</strong> (Know Your Customer) exists to prevent fraud, money laundering, and terrorist financing. It's the law — not optional.</p>
<ul>
  <li>The <strong>Bank Secrecy Act (1970)</strong> required banks to report suspicious transactions</li>
  <li>The <strong>USA PATRIOT Act (post-9/11)</strong> dramatically expanded identity verification requirements</li>
  <li>The <strong>FATF</strong> (Financial Action Task Force) sets global AML/KYC standards adopted by 200+ countries</li>
</ul>
<p>In the US, KYC typically requires <strong>four pieces of information</strong>: full legal name, date of birth, Social Security Number, and physical address.</p>
<div class="slide-callout">A country that doesn't comply with FATF standards gets grey-listed or black-listed, effectively locking its banks out of international finance.</div>`,
      },

      // Slide 3: The Verification Flow
      {
        type: 'concept',
        label: 'Process',
        title: 'How Identity Verification Works',
        content: `<p>When a user signs up for a fintech app, here's what happens behind the scenes:</p>
<ul>
  <li><strong>Step 1: Collect data</strong> — name, DOB, SSN, address (plus phone and email)</li>
  <li><strong>Step 2: Database checks</strong> — KYC providers (Alloy, Persona, Socure) cross-reference data against credit bureaus, DMV records, OFAC sanctions lists, and proprietary datasets</li>
  <li><strong>Step 3: Risk scoring</strong> — not a simple pass/fail but a nuanced assessment. Perfect match = pass. Partial match = review. No match = likely denial.</li>
  <li><strong>Step 4: Decision</strong> — approve, deny, or request a step-up (additional verification)</li>
</ul>
<p><strong>Step-ups</strong> include uploading a photo ID, taking a selfie for biometric matching, answering knowledge-based questions, or phone OTP verification.</p>
<div class="slide-callout">Modern KYC stitches together <strong>20+ data providers</strong>. No single provider has a complete picture — the art is in orchestrating the right combination of checks.</div>`,
      },

      // Slide 4: Progressive KYC
      {
        type: 'concept',
        label: 'Smart Approach',
        title: 'Progressive KYC',
        content: `<p><strong>Progressive KYC</strong> means starting with minimal friction and escalating verification as the user's activity and risk level increase.</p>
<p>Not every transaction carries the same risk:</p>
<ul>
  <li>A $50 prepaid gift card? Minimal risk — no full KYC needed.</li>
  <li>A reloadable card with direct deposit? That looks like a bank account — full KYC required.</li>
</ul>
<p>The progressive approach works in tiers:</p>
<ul>
  <li><strong>Tier 1</strong> — name + email + phone = limited access (low limits)</li>
  <li><strong>Tier 2</strong> — add SSN + DOB + address + database verification = standard access</li>
  <li><strong>Tier 3</strong> — additional documents (proof of income, etc.) = full access</li>
</ul>
<div class="slide-callout">The goal: only add friction when the risk warrants it. Let users in with minimal barriers, then escalate intelligently as they use more features.</div>`,
      },

      // Slide 5: The Thin-File Problem
      {
        type: 'concept',
        label: 'Challenge',
        title: 'The Thin-File Problem',
        content: `<p>KYC works best for people who already have extensive records in the financial system — and worst for the people who need financial services the most.</p>
<p>A <strong>thin file</strong> means minimal or no presence in credit bureaus and identity databases. This includes:</p>
<ul>
  <li><strong>Recent immigrants</strong> — valid home-country documentation but no US credit history</li>
  <li><strong>Young adults</strong> — never had a credit card or utility bill in their name</li>
  <li><strong>Formerly incarcerated</strong> individuals re-entering society</li>
  <li><strong>1.4 billion unbanked adults</strong> globally</li>
</ul>
<p>This creates a vicious cycle: you need financial services to build a financial identity, but you need a financial identity to access financial services.</p>
<div class="slide-callout">Some companies tackle this with <strong>alternative data</strong> — utility payments, rent history, mobile phone records — to verify people traditional databases miss.</div>`,
      },

      // Slide 6: KYC Flow (diagram)
      {
        type: 'diagram',
        label: 'Verification Flow',
        title: 'Progressive KYC in Action',
        mermaidCode: `graph TD
  A[User Signs Up] --> B[Name + Email + Phone]
  B --> C[Tier 1: Limited Access]
  C --> D{Wants higher limits?}
  D -->|Yes| E[Collect SSN + DOB + Address]
  E --> F{Database Verification}
  F -->|Pass| G[Tier 2: Standard Access]
  F -->|Partial Match| H[Step-Up: Photo ID + Selfie]
  H -->|Pass| G
  H -->|Fail| I[Manual Review or Deny]
  D -->|No| C`,
        caption:
          'Progressive KYC starts with minimal friction and escalates verification only when the user wants higher limits or their risk profile warrants it.',
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'KYC',
            definition:
              'Know Your Customer — the process of verifying identity before allowing someone to open accounts or transact.',
          },
          {
            term: 'KYB',
            definition:
              'Know Your Business — verifying company registration, ownership, and beneficial owners. Each UBO also goes through individual KYC.',
          },
          {
            term: 'AML',
            definition:
              'Anti-Money Laundering — regulations requiring financial institutions to monitor transactions and report suspicious activity.',
          },
          {
            term: 'FATF',
            definition:
              'Financial Action Task Force — the international body setting global AML/KYC standards adopted by 200+ countries.',
          },
          {
            term: 'Thin File',
            definition:
              'A person with minimal credit history or documentation — common among immigrants, young adults, and the unbanked.',
          },
          {
            term: 'Progressive KYC',
            definition:
              'Gradually requesting more verification as a user\'s transaction volume or risk level increases, rather than demanding everything upfront.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 6. Embedded Finance & BaaS ─────────────────────────────────────
  {
    topicSlug: 'embedded-finance',
    topicTitle: 'Embedded Finance & Banking-as-a-Service',
    theme: 'Products & Use Cases',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Embedded Finance & BaaS',
        description:
          'Imagine your business software offers you a checking account, a branded debit card, and a loan — all without visiting a bank. That\'s embedded finance. Behind the scenes, Banking-as-a-Service (BaaS) infrastructure makes it possible for any software platform to become a financial services provider.',
        objectives: [
          'Understand what embedded finance is and why software platforms are adding financial products',
          'Know the three layers of the BaaS stack: sponsor bank, middleware, and platform',
          'Identify the three core products: deposit accounts, card issuing, and lending',
          'Recognize the risks, including the Synapse collapse cautionary tale',
        ],
      },

      // Slide 2: The SaaS Evolution
      {
        type: 'concept',
        label: 'Why Now',
        title: 'From Software to Financial Platform',
        content: `<p>Software platforms are evolving their relationship with money in three stages:</p>
<ul>
  <li><strong>SaaS 1.0: Software only</strong> — charge $99/month for the tool. Revenue = subscription fees only.</li>
  <li><strong>SaaS 2.0: Software + payments</strong> — integrate payment processing. A restaurant doing $50K/month in cards generates ~$1,250/month in payment fees — more than 10x the subscription.</li>
  <li><strong>SaaS 3.0: Software + financial services</strong> — add accounts, cards, lending, insurance. Revenue per customer can reach $2,000–5,000/month.</li>
</ul>
<p>Each stage represents a deeper economic relationship. That's the gravity pulling every vertical SaaS platform toward embedded finance.</p>
<div class="slide-callout">A software platform that adds financial services can increase its <strong>revenue per customer by 2–5x</strong>. The financial products often generate more revenue than the software subscription itself.</div>`,
      },

      // Slide 3: The BaaS Stack
      {
        type: 'concept',
        label: 'Architecture',
        title: 'The Three Layers of BaaS',
        content: `<p>Offering financial products requires a banking license. BaaS solves this with a three-layer architecture:</p>
<ul>
  <li><strong>Layer 1: Sponsor Bank</strong> — a chartered, regulated bank (Evolve, Cross River, Column) providing the license, FDIC insurance, and payment rail access. Ultimately responsible for compliance.</li>
  <li><strong>Layer 2: BaaS Middleware</strong> — companies like Unit, Treasury Prime, or Stripe Treasury that build the API layer. Opening an account = a POST request. Issuing a card = another API call.</li>
  <li><strong>Layer 3: Platform / Brand</strong> — the software company (Shopify, Toast) that the customer interacts with. The bank's name appears only in fine print.</li>
</ul>
<div class="slide-callout">Think of BaaS like AWS for financial services. Just as AWS lets any company build a web app without owning data centers, BaaS lets any platform offer banking products without owning a bank.</div>`,
      },

      // Slide 4: Key Products
      {
        type: 'concept',
        label: 'Products',
        title: 'Deposit Accounts, Cards, and Lending',
        content: `<p>BaaS enables three core financial products:</p>
<p><strong>Deposit Accounts</strong> — real bank accounts with FDIC insurance up to $250K, integrated into the platform. The platform earns from the interest spread and associated card interchange.</p>
<p><strong>Card Issuing</strong> — branded debit or prepaid cards (virtual or physical). Each swipe generates interchange revenue (1–1.8% for debit). A business spending $20K/month = $200–360/month in interchange.</p>
<p><strong>Lending</strong> — this is where platform data shines. A restaurant management platform knows daily covers, ticket sizes, and seasonal patterns — vastly more data than a bank gets from a loan application. Revenue-based advances (like Shopify Capital) repay as a % of daily sales.</p>
<div class="slide-callout">Toast Capital offers loans to restaurants using real-time sales data — underwriting businesses that traditional banks would reject because they lack conventional credit files.</div>`,
      },

      // Slide 5: Risks — The Synapse Warning
      {
        type: 'concept',
        label: 'Cautionary Tale',
        title: 'The Synapse Collapse and BaaS Risks',
        content: `<p>The BaaS model carries real risks. The most sobering lesson: the <strong>2024 Synapse collapse</strong>.</p>
<p>Synapse was a BaaS middleware provider managing ledgers for millions of end users. When it filed for bankruptcy, a devastating problem emerged: <strong>ledger records tracking which users owned which funds were unreliable</strong>. Tens of thousands of people couldn't access their money for months.</p>
<p>Key lessons for any platform entering embedded finance:</p>
<ul>
  <li><strong>Avoid vendor lock-in</strong> — build modular architecture that allows switching providers</li>
  <li><strong>Understand the regulatory chain</strong> — "we relied on our BaaS provider" is not acceptable when things go wrong</li>
  <li><strong>Custody matters</strong> — know where customer funds are held and how to reconcile independently</li>
  <li><strong>Due diligence on partners</strong> — evaluate financial health and regulatory standing of your BaaS provider and sponsor bank</li>
</ul>
<div class="slide-callout">FDIC insurance protects against <strong>bank failure</strong>, not <strong>middleware failure</strong>. The Synapse collapse exposed a critical gap in the BaaS architecture.</div>`,
      },

      // Slide 6: BaaS Stack (diagram)
      {
        type: 'diagram',
        label: 'BaaS Architecture',
        title: 'The BaaS Stack',
        mermaidCode: `graph TD
  P[Software Platform] --> API[BaaS Middleware]
  API --> SB[Sponsor Bank]
  SB --> V[Visa / Mastercard]
  SB --> ACH[ACH Network]
  SB --> FDIC[FDIC Insurance]
  P -.->|Brand and UX| USER[End Customer]
  SB -.->|Fine print only| USER`,
        caption:
          'The end customer interacts with the software platform. The sponsor bank appears only in fine print but provides the regulated foundation — banking license, FDIC insurance, and payment rail access.',
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Embedded Finance',
            definition:
              'The integration of financial services (payments, lending, insurance, accounts) directly into non-financial software platforms.',
          },
          {
            term: 'Banking-as-a-Service (BaaS)',
            definition:
              'A model where licensed banks expose their infrastructure through APIs, allowing non-bank companies to offer financial products.',
          },
          {
            term: 'Sponsor Bank',
            definition:
              'A chartered bank that provides its license, compliance framework, and settlement capabilities to enable fintech partnerships.',
          },
          {
            term: 'Core Banking System',
            definition:
              'The back-end software processing daily banking transactions — account management, ledgering, interest calculations, and regulatory reporting.',
          },
          {
            term: 'Revenue-Based Advance',
            definition:
              'A lending product where repayment is a fixed percentage of daily sales — the business pays more when sales are strong and less when they\'re slow.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 7. Buy Now, Pay Later ──────────────────────────────────────────
  {
    topicSlug: 'buy-now-pay-later',
    topicTitle: 'Buy Now, Pay Later',
    theme: 'Products & Use Cases',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Buy Now, Pay Later',
        description:
          'Split a $200 purchase into 4 interest-free payments of $50. Sounds like a payment method, but BNPL is actually a credit product wearing a payments mask. Understanding how it really works — the merchant fees, the credit risk, and why it threatens credit cards — is essential for anyone in fintech.',
        objectives: [
          'Understand the standard BNPL "Pay in 4" model and money flow',
          'Know why merchants pay 4–8% fees (higher than cards) and still want BNPL',
          'Distinguish between merchant-side BNPL and issuer-side installments',
          'Explain how BNPL uses virtual cards to work at any merchant',
          'Recognize why BNPL threatens traditional credit cards',
        ],
      },

      // Slide 2: How It Works
      {
        type: 'concept',
        label: 'Mechanics',
        title: 'How BNPL Works',
        content: `<p>The standard <strong>"Pay in 4"</strong> model:</p>
<ul>
  <li>Consumer selects BNPL at checkout for a $200 purchase</li>
  <li>BNPL provider does a <strong>soft credit check</strong> (doesn't affect credit score) and approves in seconds</li>
  <li>Consumer pays <strong>$50 immediately</strong>; remaining 3 installments charged every 2 weeks</li>
</ul>
<p>Here's the key: the <strong>BNPL provider pays the merchant upfront</strong>. The merchant gets $200 minus the BNPL fee within 1–3 days. The provider then collects from the consumer over 6 weeks.</p>
<p>If the consumer defaults, <strong>the merchant keeps the money</strong>. The BNPL provider absorbs the loss.</p>
<div class="slide-callout">Every "Pay in 4" plan is an <strong>unsecured loan</strong>, even if it's not marketed that way. The provider pays the merchant today and hopes to collect from the consumer over six weeks.</div>`,
      },

      // Slide 3: The Economics
      {
        type: 'concept',
        label: 'Economics',
        title: 'Who Pays What?',
        content: `<p>BNPL economics are unusual compared to cards:</p>
<ul>
  <li><strong>Merchant fees: 4–8%</strong> of transaction value — substantially higher than the 2–3% for card acceptance</li>
  <li><strong>Consumer pays nothing</strong> (if on time). Late fees of $7–10 per missed payment apply.</li>
</ul>
<p>Why would merchants pay more? Because BNPL drives <strong>conversion</strong>:</p>
<ul>
  <li>Average order value increases <strong>30–50%</strong></li>
  <li>Conversion rates improve <strong>20–30%</strong></li>
  <li>A customer who might abandon a $200 cart completes the purchase when they see $50 today</li>
</ul>
<div class="slide-callout">BNPL's primary revenue comes from <strong>merchants, not consumers</strong>. That's the opposite of credit cards, where issuers earn from consumer interest and merchants pay interchange.</div>`,
      },

      // Slide 4: BNPL Payment Flow (diagram)
      {
        type: 'diagram',
        label: 'Money Flow',
        title: 'How Money Moves in BNPL',
        mermaidCode: `sequenceDiagram
  participant C as Consumer
  participant M as Merchant
  participant B as BNPL Provider
  C->>M: Selects BNPL at checkout
  M->>B: Sends order details
  B->>B: Soft credit check
  B->>M: Pays merchant upfront minus fee
  B->>C: Charges installment 1 immediately
  Note over B,C: Every 2 weeks
  B->>C: Charges installment 2
  B->>C: Charges installment 3
  B->>C: Charges installment 4`,
        caption:
          'The BNPL provider pays the merchant upfront (minus a 4–8% fee), then collects 4 installments from the consumer over 6 weeks. The provider bears all the credit risk.',
      },

      // Slide 5: Virtual Cards and BNPL 2.0
      {
        type: 'concept',
        label: 'Evolution',
        title: 'Virtual Cards and BNPL 2.0',
        content: `<p>BNPL providers use a clever trick to work at <strong>any merchant</strong>: virtual cards.</p>
<p>When Affirm approves a purchase at a merchant without a direct integration, it generates a <strong>single-use virtual Visa card</strong>, funds it, and the consumer checks out over standard Visa rails. The merchant sees a normal card payment.</p>
<p><strong>BNPL 2.0</strong> takes this further — shifting from a checkout feature to a consumer financial tool:</p>
<ul>
  <li><strong>Affirm Debit+</strong> — a physical debit card that lets consumers decide per-transaction whether to pay in full or split into installments</li>
  <li><strong>Klarna's app</strong> — now includes price comparison, deal discovery, and package tracking. More shopping super app than payment option.</li>
</ul>
<div class="slide-callout">BNPL 2.0 is about <strong>owning the consumer relationship</strong> directly, rather than renting it from merchants at checkout.</div>`,
      },

      // Slide 6: Why BNPL Threatens Credit Cards
      {
        type: 'concept',
        label: 'Disruption',
        title: 'The Credit Card Unbundling',
        content: `<p>A credit card bundles together: a line of credit, installment option, fraud protection, rewards, and a payment credential. <strong>BNPL unbundles the installment financing function</strong> into a standalone product that's simpler and more transparent.</p>
<p>The market being disrupted is huge:</p>
<ul>
  <li>US consumer credit: <strong>~$8 trillion</strong></li>
  <li>Credit card interest charges: <strong>$121 billion/year</strong></li>
  <li>Average credit card APR: <strong>~24%</strong></li>
</ul>
<p>There's a generational dimension: post-2008, younger consumers grew up <strong>"fundamentally suspicious of credit."</strong> BNPL offers purchasing flexibility without open-ended revolving debt.</p>
<p>Card issuers have responded with their own installment products: Chase "My Chase Plan," Amex "Plan It," Citi "Flex Pay."</p>
<div class="slide-callout">Even if standalone BNPL providers struggle to profit, they've <strong>permanently changed consumer expectations</strong> about how purchases should be financed.</div>`,
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'BNPL',
            definition:
              'Buy Now, Pay Later — a financing option letting consumers split purchases into installments, typically interest-free.',
          },
          {
            term: 'Merchant-Side BNPL',
            definition:
              'BNPL offered at checkout by providers like Klarna or Affirm — the merchant pays a 4–8% fee, the consumer pays in installments.',
          },
          {
            term: 'Issuer-Side Installments',
            definition:
              'Installment plans offered by the card issuer (common in Latin America) where purchases are automatically split into monthly payments on the credit card statement.',
          },
          {
            term: 'Open Invoice',
            definition:
              'Klarna\'s original model — buy now, receive an invoice, pay within 14–30 days. Culturally aligned with Scandinavian commerce.',
          },
          {
            term: 'Virtual Card (BNPL)',
            definition:
              'A single-use card number generated by BNPL providers to process transactions over standard card network rails at any merchant.',
          },
          {
            term: 'Soft Credit Check',
            definition:
              'A credit inquiry that doesn\'t affect the consumer\'s credit score — used by BNPL providers for instant approval decisions.',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ─── 8. Virtual Cards ───────────────────────────────────────────────
  {
    topicSlug: 'virtual-cards',
    topicTitle: 'Virtual Cards',
    theme: 'Products & Use Cases',
    slides: [
      // Slide 1: Intro
      {
        type: 'intro',
        title: 'Virtual Cards',
        description:
          'A full payment card generated in milliseconds through an API call — no plastic, no waiting, no physical mail. Virtual cards aren\'t just digital versions of credit cards. They\'re programmable spending instruments with built-in controls, limits, and lifecycle rules. And they\'re being generated by the billions.',
        objectives: [
          'Understand how virtual cards are issued via API through issuer processors',
          'Distinguish between single-use and multi-use virtual cards',
          'Know the major use cases: expense management, B2B payments, BNPL, rewards, and subscription management',
          'Explain the built-in security advantages over physical cards',
        ],
      },

      // Slide 2: How Virtual Cards Are Issued
      {
        type: 'concept',
        label: 'Mechanics',
        title: 'How Virtual Cards Are Issued',
        content: `<p>A company partners with an <strong>issuer processor</strong> (Marqeta, Lithic, Highnote) and a <strong>sponsor bank</strong> that holds the banking license and BIN range.</p>
<p>When a new card is needed, it's a single <strong>API call</strong>:</p>
<ul>
  <li>The processor generates a unique card number from the BIN range</li>
  <li>Assigns an expiry date and CVV</li>
  <li>Returns the full card credentials in the API response</li>
  <li>The entire process takes <strong>milliseconds</strong></li>
</ul>
<p>Compare this to physical cards: manufacturing, personalization, packaging, and shipping takes <strong>5–10 business days</strong>.</p>
<div class="slide-callout">Virtual cards can also be <strong>pushed to Apple Pay or Google Pay</strong> via mobile wallet provisioning, enabling tap-to-pay at any NFC terminal — no plastic needed.</div>`,
      },

      // Slide 3: Single-Use vs. Multi-Use
      {
        type: 'concept',
        label: 'Card Types',
        title: 'Single-Use vs. Multi-Use',
        content: `<p>Virtual cards come in two fundamental flavors:</p>
<p><strong>Single-use cards</strong> are generated for exactly one transaction. Once charged, the card number automatically deactivates. Even if compromised, it's worthless. Perfect for:</p>
<ul>
  <li>One-time supplier payments</li>
  <li>Security-sensitive purchases</li>
  <li>BNPL checkout transactions</li>
</ul>
<p><strong>Multi-use cards</strong> persist across multiple transactions with programmable controls. Example: an employee card for SaaS subscriptions with a $500/month limit, restricted to software merchants.</p>
<div class="slide-callout">A physical card is <strong>always</strong> multi-use — you can't make it self-destruct after one purchase. The ability to choose single-use or multi-use <strong>programmatically</strong> is what makes virtual cards fundamentally different.</div>`,
      },

      // Slide 4: Use Cases
      {
        type: 'concept',
        label: 'Use Cases',
        title: 'Where Virtual Cards Shine',
        content: `<p>Virtual cards have found product-market fit across a wide range of scenarios:</p>
<ul>
  <li><strong>Corporate expense management</strong> — Brex, Ramp, and Divvy issue unique cards per department, employee, or purchase category. Instant deactivation when someone leaves.</li>
  <li><strong>B2B supplier payments</strong> — generate a single-use card for the exact invoice amount. The buyer earns interchange revenue on the payment.</li>
  <li><strong>Rewards and incentives</strong> — send a $100 prize instantly via virtual card. Used by insurance companies for instant claim payouts.</li>
  <li><strong>BNPL checkout</strong> — BNPL providers generate virtual cards to enable installment payments at any merchant accepting cards.</li>
  <li><strong>Subscription management</strong> — assign a unique card per subscription. Want to cancel Netflix? Deactivate that specific card.</li>
</ul>
<div class="slide-callout">For B2B payments, virtual cards turn accounts payable into a <strong>revenue generator</strong>. A company paying $10M/month to suppliers via virtual card at 1.5% interchange earns $150K/month.</div>`,
      },

      // Slide 5: Security
      {
        type: 'concept',
        label: 'Security',
        title: 'Built-In Security Advantages',
        content: `<p>Virtual cards are inherently more secure than physical cards. All controls are enforced at <strong>authorization time</strong> — the moment a transaction is attempted:</p>
<ul>
  <li><strong>Spending limits</strong> — set a max of $50, $500, or $5,000. The card physically cannot exceed it.</li>
  <li><strong>Merchant restrictions</strong> — lock a card to specific merchant category codes (MCCs). A travel card works at airlines but declines at electronics stores.</li>
  <li><strong>Time windows</strong> — cards valid for 24 hours, one month, or until a project ends. Auto-deactivates after.</li>
  <li><strong>Geographic restrictions</strong> — limit to specific countries. A domestic card can't be used internationally.</li>
  <li><strong>Instant deactivation</strong> — suspect fraud? Kill the card via API in milliseconds. Generate a new one and move on.</li>
</ul>
<div class="slide-callout">This is fundamentally different from post-transaction expense policies, where violations are discovered during monthly reviews. Virtual card controls are <strong>preventive, not detective</strong>.</div>`,
      },

      // Slide 6: Virtual Card Issuance (diagram)
      {
        type: 'diagram',
        label: 'Issuance Flow',
        title: 'How a Virtual Card Is Created and Used',
        mermaidCode: `sequenceDiagram
  participant APP as Application
  participant PROC as Issuer Processor
  participant BANK as Sponsor Bank
  participant NET as Card Network
  APP->>PROC: Create virtual card with controls
  PROC->>BANK: Provision from BIN range
  BANK-->>PROC: Card provisioned
  PROC-->>APP: Card number, CVV, expiry
  Note over APP: Ready in milliseconds
  APP->>NET: First transaction
  NET->>BANK: Authorization request
  BANK-->>NET: Approved
  NET-->>APP: Confirmed`,
        caption:
          'An API call generates a fully functional card number in milliseconds. The card transacts over standard Visa/Mastercard rails just like any physical card.',
      },

      // Slide 7: Key Terms
      {
        type: 'terms',
        terms: [
          {
            term: 'Virtual Card',
            definition:
              'A digital-only card number generated instantly via API, usable for online purchases or mobile wallets — no physical plastic needed.',
          },
          {
            term: 'Single-Use Card',
            definition:
              'A virtual card valid for one transaction only, then automatically deactivated — maximizing security.',
          },
          {
            term: 'Multi-Use Card',
            definition:
              'A virtual card that persists across multiple transactions with programmable spending controls, limits, and restrictions.',
          },
          {
            term: 'BIN Range',
            definition:
              'A block of card numbers assigned to an issuer by the card network, used to generate virtual cards programmatically.',
          },
          {
            term: 'Push Provisioning',
            definition:
              'The process of pushing a virtual card directly to a mobile wallet (Apple Pay, Google Pay) for in-store tap-to-pay.',
          },
          {
            term: 'MCC Restriction',
            definition:
              'Merchant Category Code restriction — locking a virtual card so it only works at specific types of merchants (e.g., airlines, software vendors).',
          },
        ],
      },

      // Quiz slides
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 1. Cross-Border Payments
  // ──────────────────────────────────────────────
  {
    topicSlug: 'cross-border-payments',
    topicTitle: 'Cross-Border Payments',
    theme: 'Moving Money',
    slides: [
      {
        type: 'intro',
        title: 'Cross-Border Payments',
        description:
          'Sending money internationally costs 10-20x more than domestic transfers and takes days instead of seconds. Understanding why means unpacking correspondent banking, SWIFT messaging, FX markups, and the modern alternatives trying to fix it all.',
        objectives: [
          'Understand the difference between local acquiring and cross-border acquiring',
          'Explain how SWIFT messaging works and why it does not actually move money',
          'Trace how correspondent banking chains add cost and delay',
          'Identify why FX markups are the biggest hidden cost in international transfers',
          'Know how modern solutions like Wise, SWIFT gpi, and stablecoins are improving cross-border payments',
        ],
      },
      {
        type: 'concept',
        label: 'The Problem',
        title: 'Why International Payments Are Painful',
        content: `<p>Sending $1,000 from New York to Lagos might cost <strong>$40 in fees</strong>, take <strong>3-5 business days</strong>, and lose another <strong>$30 to unfavorable exchange rates</strong>. Sending that same $1,000 across the street via Zelle is free and instant.</p>
<p>Cross-border payments represent roughly <strong>$150 trillion</strong> in annual flows, yet the average cost of sending a $200 remittance is about <strong>6.2%</strong> — more than triple the UN's target of 3%.</p>
<div class="slide-callout">The problem isn't technology — it's the tangled web of intermediaries, regulations, and legacy infrastructure that money must navigate when crossing a national border.</div>`,
      },
      {
        type: 'concept',
        label: 'Card Payments',
        title: 'Local vs. Cross-Border Acquiring',
        content: `<p>When a Japanese tourist taps their Visa card in Paris, the payment system has to figure out: <strong>where is the merchant's acquirer?</strong></p>
<ul>
  <li><strong>Local acquiring</strong> — the merchant's acquirer is in the same country as the merchant. This is the default and works well.</li>
  <li><strong>Cross-border acquiring</strong> — the acquirer is in a different country. This happens often with global e-commerce companies routing all transactions through one country.</li>
</ul>
<p>The consequences are measurable:</p>
<ul>
  <li>Authorization rates <strong>drop 5-15%</strong> for cross-border transactions</li>
  <li>Additional <strong>0.40-1.00%</strong> in cross-border assessment fees</li>
</ul>
<div class="slide-callout">This is why sophisticated global merchants invest in local acquiring in every country they sell to — it directly improves approval rates and lowers costs.</div>`,
      },
      {
        type: 'concept',
        label: 'SWIFT',
        title: 'The Messaging Network That Doesn\'t Move Money',
        content: `<p>Here's a fact that surprises most people: <strong>SWIFT doesn't move money</strong>. Not a single dollar, euro, or yen flows through SWIFT. It's a <strong>messaging network</strong> — it sends standardized instructions between banks.</p>
<p>Founded in 1973, SWIFT connects over <strong>11,000 financial institutions</strong> in more than 200 countries. When you initiate a wire transfer, your bank sends a SWIFT message (typically an MT103) to the receiving bank with sender details, recipient details, amount, and currency.</p>
<p>The actual money movement happens separately, through <strong>correspondent banking</strong> and domestic clearing systems.</p>
<div class="slide-callout">SWIFT's speed is just the messaging speed — seconds. The delays come from the money movement layer: correspondent banking.</div>`,
      },
      {
        type: 'concept',
        label: 'Correspondent Banking',
        title: 'The Chain That Slows Everything Down',
        content: `<p>Most banks don't have direct relationships with most other banks. So how does money get from Nairobi to Sao Paulo? Through <strong>correspondent banking</strong> — intermediary banks that act as bridges.</p>
<p>It works through <strong>nostro/vostro accounts</strong>:</p>
<ul>
  <li><strong>Nostro</strong> = "our account at your bank"</li>
  <li><strong>Vostro</strong> = "your account at our bank"</li>
</ul>
<p>Each bank in the chain:</p>
<ul>
  <li>Takes a fee — typically <strong>$15-30</strong> per intermediary</li>
  <li>Runs its own <strong>compliance checks</strong> (AML, sanctions, KYC)</li>
  <li>Operates on its own <strong>business hours</strong></li>
</ul>
<div class="slide-callout">A payment touching 3-4 banks can take 3-5 business days and lose $40-60 in fees. The sender often doesn't know the final cost upfront.</div>`,
      },
      {
        type: 'diagram',
        label: 'Correspondent Chain',
        title: 'How Money Moves Through Intermediary Banks',
        mermaidCode: `sequenceDiagram
  participant S as Sender Bank<br/>Nairobi
  participant C1 as Correspondent 1<br/>London
  participant C2 as Correspondent 2<br/>New York
  participant R as Recipient Bank<br/>Sao Paulo
  S->>C1: SWIFT MT103 + debit nostro
  Note over C1: Compliance check + fee
  C1->>C2: Forward with SWIFT
  Note over C2: Compliance check + FX + fee
  C2->>R: Credit recipient
  Note over S,R: Each hop: 1-2 days + fees deducted`,
        caption:
          'Correspondent banking chain: money moves through intermediary banks, each adding time, cost, and compliance checks.',
      },
      {
        type: 'concept',
        label: 'Hidden Costs',
        title: 'Why It Costs So Much',
        content: `<p>The cost of sending money internationally is the accumulation of charges at <strong>every layer</strong>:</p>
<ul>
  <li><strong>FX markups (1-3%)</strong> — the biggest and least transparent cost. Banks don't give you the mid-market rate you see on Google.</li>
  <li><strong>SWIFT messaging fees</strong> — a few dollars per message, passed through with markup.</li>
  <li><strong>Correspondent bank fees ($15-30 each)</strong> — each intermediary takes a cut.</li>
  <li><strong>Compliance costs</strong> — billions invested in AML/KYC infrastructure, passed to customers.</li>
  <li><strong>Trapped liquidity</strong> — banks must pre-fund nostro accounts globally. Over <strong>$5 trillion</strong> sits idle in these accounts worldwide.</li>
</ul>
<div class="slide-callout">On a $10,000 transfer, a 2% FX markup alone costs $200 — far more than any explicit wire fee.</div>`,
      },
      {
        type: 'concept',
        label: 'Modern Solutions',
        title: 'Rethinking the Plumbing',
        content: `<p>Several companies are attacking different parts of the cross-border problem:</p>
<ul>
  <li><strong>Wise</strong> — matches flows domestically (pounds stay in the UK, rupees stay in India) so no money actually crosses borders. Fees: 0.5-1.5%.</li>
  <li><strong>SWIFT gpi</strong> — adds transparency and speed to existing correspondent banking. Same-day processing, transparent fees, end-to-end tracking.</li>
  <li><strong>Stablecoins (USDC/USDT)</strong> — becoming a meaningful rail for cross-border transfers, especially in emerging markets.</li>
  <li><strong>Linked real-time systems</strong> — India's UPI and Singapore's PayNow are now connected for instant cross-border transfers.</li>
</ul>
<div class="slide-callout">No single technology solves all cross-border challenges simultaneously. The winners will abstract complexity away from the end user.</div>`,
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'SWIFT',
            definition:
              'Society for Worldwide Interbank Financial Telecommunication — a messaging network connecting 11,000+ banks, but it does not move money itself.',
          },
          {
            term: 'Correspondent Banking',
            definition:
              'A system where intermediary banks act as bridges for international payments between banks that lack direct relationships.',
          },
          {
            term: 'Nostro/Vostro Account',
            definition:
              'Accounts banks hold with each other for cross-border transfers — nostro (our account at your bank) and vostro (your account at our bank).',
          },
          {
            term: 'Local Acquiring',
            definition:
              'When a merchant uses an acquirer in the same country, yielding better authorization rates and lower fees.',
          },
          {
            term: 'Cross-Border Acquiring',
            definition:
              'When a merchant\'s acquirer is in a different country, resulting in higher fees and lower approval rates.',
          },
          {
            term: 'DCC (Dynamic Currency Conversion)',
            definition:
              'When a merchant offers to charge in the cardholder\'s home currency, usually at unfavorable exchange rates of 3-8% over mid-market.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. Compliance & Regulation
  // ──────────────────────────────────────────────
  {
    topicSlug: 'compliance-and-regulation',
    topicTitle: 'Compliance & Regulation',
    theme: 'Trust & Compliance',
    slides: [
      {
        type: 'intro',
        title: 'Compliance & Regulation',
        description:
          'In payments, the most important product decisions are often compliance decisions in disguise. Understanding the regulatory landscape — from Reg E and Reg Z to PSD2 and money transmission licensing — is the foundation everything else sits on.',
        objectives: [
          'Identify the four categories of payment regulation: safety, transparency, fairness, and policy preferences',
          'Understand the key differences between Regulation E (debit) and Regulation Z (credit)',
          'Explain how PSD2 and Strong Customer Authentication changed European payments',
          'Know why money transmission licensing is so complex in the US',
          'Recognize how scheme compliance (card network rules) creates an additional regulatory layer',
        ],
      },
      {
        type: 'concept',
        label: 'The Big Picture',
        title: 'Four Categories of Payment Regulation',
        content: `<p>Payment regulation falls into <strong>four broad categories</strong>, each serving a different purpose:</p>
<ul>
  <li><strong>Safety</strong> — ensures institutions holding your money are sound (bank chartering, capital requirements, FDIC insurance, fund segregation)</li>
  <li><strong>Transparency</strong> — demands visibility into financial flows (AML/KYC, Suspicious Activity Reports, Currency Transaction Reports)</li>
  <li><strong>Fairness</strong> — protects consumers (disclosure requirements, dispute resolution rights, fee caps)</li>
  <li><strong>Policy preferences</strong> — uses the financial system to advance government objectives (sanctions, embargoes)</li>
</ul>
<div class="slide-callout">The US can effectively cut any person or company off from the global financial system by adding them to the OFAC sanctions list — because nearly all international transactions touch US dollar clearing.</div>`,
      },
      {
        type: 'concept',
        label: 'US: Debit Rules',
        title: 'Regulation E — Debit and Electronic Transfers',
        content: `<p><strong>Regulation E</strong> implements the Electronic Fund Transfer Act and governs debit cards, ACH, ATM withdrawals, and other electronic transfers.</p>
<p>Key provisions:</p>
<ul>
  <li><strong>Error resolution:</strong> consumers can dispute unauthorized transactions. The bank must investigate within 10 business days.</li>
  <li><strong>Liability limits:</strong> report within 2 days = $50 max. 2-60 days = $500. After 60 days = no cap.</li>
  <li><strong>Disclosure requirements:</strong> fees, terms, and conditions must be clearly disclosed.</li>
</ul>
<div class="slide-callout">Every Reg E dispute triggers an investigation with strict timelines — regardless of how small the fintech team or how early-stage the startup.</div>`,
      },
      {
        type: 'concept',
        label: 'US: Credit Rules',
        title: 'Regulation Z — Credit and Truth in Lending',
        content: `<p><strong>Regulation Z</strong> implements the Truth in Lending Act and covers credit card transactions. It's generally <strong>more consumer-friendly</strong> than Reg E:</p>
<ul>
  <li><strong>Liability cap:</strong> $50 maximum for unauthorized charges — period. No time limit games. Most issuers waive even this.</li>
  <li><strong>Billing disputes:</strong> creditor must acknowledge within 30 days and resolve within two billing cycles.</li>
  <li><strong>Disclosure:</strong> APR, fees, grace periods, and penalty rates must be clearly disclosed.</li>
</ul>
<div class="slide-callout">Credit cards offer stronger consumer protections than debit cards — one reason many financial advisors recommend credit cards for purchases when possible.</div>`,
      },
      {
        type: 'concept',
        label: 'Europe',
        title: 'PSD2 and Strong Customer Authentication',
        content: `<p><strong>PSD2</strong> (Payment Services Directive 2) is the EU's landmark payment regulation with two major innovations:</p>
<ul>
  <li><strong>Open Banking:</strong> banks must provide APIs allowing authorized third parties to access account data and initiate payments (with customer consent).</li>
  <li><strong>Strong Customer Authentication (SCA):</strong> two-factor authentication required for most electronic payments — something you know, have, or are.</li>
</ul>
<p>SCA dramatically impacted e-commerce — checkout abandonment spiked 20-30% in some markets. Exemptions exist for low-value transactions, trusted merchants, and low-fraud-rate acquirers.</p>
<div class="slide-callout">PSD3, agreed in November 2025, merges EMI and payment institution licenses, mandates Verification of Payee, and sets mandatory API performance standards.</div>`,
      },
      {
        type: 'concept',
        label: 'Licensing',
        title: 'Money Transmission Licensing in the US',
        content: `<p>If your business holds, transfers, or transmits money on behalf of others in the US, you generally need a <strong>money transmission license</strong>. The catch: there's no single federal license.</p>
<ul>
  <li>Up to <strong>49 individual state applications</strong> (plus DC, Puerto Rico, etc.)</li>
  <li>Surety bonds ranging from <strong>$25,000 to $7 million</strong></li>
  <li>Process takes <strong>12-24 months</strong> and costs <strong>$1-5 million</strong></li>
</ul>
<p>This is why most fintech startups don't get their own licenses. Instead, they partner with licensed banks or existing money transmitters.</p>
<div class="slide-callout">This is also why the "neobank" model in the US almost always involves a bank partner — companies like Chime and Cash App don't hold bank charters.</div>`,
      },
      {
        type: 'diagram',
        label: 'Regulation Framework',
        title: 'The Four Pillars of Payment Regulation',
        mermaidCode: `graph TD
  R[Payment Regulation] --> S[Safety]
  R --> T[Transparency]
  R --> F[Fairness]
  R --> P[Policy Preferences]
  S --> S1[Bank Chartering]
  S --> S2[Capital Requirements]
  T --> T1[AML / KYC]
  T --> T2[Suspicious Activity Reports]
  F --> F1[Disclosure Requirements]
  F --> F2[Dispute Resolution Rights]
  P --> P1[Sanctions]
  P --> P2[Embargoes]`,
        caption:
          'The four pillars of payment regulation: each category serves a different purpose in protecting the financial system.',
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'Regulation E',
            definition:
              'US federal regulation protecting consumers in electronic fund transfers, including debit card transactions and ACH.',
          },
          {
            term: 'Regulation Z',
            definition:
              'US federal regulation governing credit card disclosures, billing practices, and consumer dispute rights.',
          },
          {
            term: 'PSD2',
            definition:
              'Payment Services Directive 2 — EU regulation requiring Strong Customer Authentication and mandating Open Banking APIs.',
          },
          {
            term: 'SCA',
            definition:
              'Strong Customer Authentication — PSD2 requirement for two-factor authentication on electronic payments in Europe.',
          },
          {
            term: 'CFPB',
            definition:
              'Consumer Financial Protection Bureau — US agency overseeing consumer financial product regulation.',
          },
          {
            term: 'Money Transmission License',
            definition:
              'A state-level US license required for businesses that hold, transfer, or transmit money on behalf of others.',
          },
          {
            term: 'Durbin Amendment',
            definition:
              'Part of Dodd-Frank that capped debit interchange fees for large banks at roughly 21 cents + 0.05% per transaction.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. Neobanking & Digital Banking
  // ──────────────────────────────────────────────
  {
    topicSlug: 'neobanking',
    topicTitle: 'Neobanking & Digital Banking',
    theme: 'Products & Use Cases',
    slides: [
      {
        type: 'intro',
        title: 'Neobanking & Digital Banking',
        description:
          'Over 300 neobanks operate globally, but the vast majority fail. Understanding how neobanks are built, licensed, and scaled — and why most don\'t survive — reveals the fundamental tensions between technology ambition and financial regulation.',
        objectives: [
          'Distinguish between traditional banks with digital channels, challenger banks, and neobanks',
          'Understand the three-phase licensing strategy: BaaS, EMI, full banking license',
          'Identify the top reasons neobanks fail (unclear value prop, bad unit economics, licensing delays)',
          'Explain why lending is the key to neobank profitability',
        ],
      },
      {
        type: 'concept',
        label: 'Definitions',
        title: 'Three Types of Digital Banking',
        content: `<p>The term "neobank" gets used loosely. There are actually <strong>three distinct categories</strong>:</p>
<ul>
  <li><strong>Traditional banks with digital channels</strong> — incumbents like Chase or HSBC that built mobile apps on top of legacy systems. Digital facades on analog processes.</li>
  <li><strong>Challenger banks</strong> — newer entrants that hold their <strong>own banking licenses</strong> and operate primarily through digital channels (Monzo, Starling). Legally structured as banks from day one.</li>
  <li><strong>Neobanks</strong> — fully digital-only with <strong>no physical branches</strong>. Many don't hold their own license initially — they partner with a licensed bank through BaaS. The customer's money sits at the partner bank.</li>
</ul>
<div class="slide-callout">This distinction matters because it determines what a company can legally do with your money, how it's regulated, and where the risk sits.</div>`,
      },
      {
        type: 'concept',
        label: 'The Gap',
        title: 'Why Neobanks Exist',
        content: `<p>Neobanks emerged because traditional banks <strong>systematically underserve</strong> large segments of the population:</p>
<ul>
  <li><strong>Diaspora communities</strong> — painful cross-border fees, no understanding of dual-country financial life</li>
  <li><strong>SMEs</strong> — slow account opening, manual reconciliation, opaque credit decisions</li>
  <li><strong>Gig workers</strong> — irregular income, multiple payment sources, need for instant access to earnings</li>
  <li><strong>The unbanked</strong> — 1.4 billion adults globally lack access to formal banking services</li>
</ul>
<div class="slide-callout">Each underserved segment is a wedge opportunity: a focused neobank can serve it better than any incumbent.</div>`,
      },
      {
        type: 'diagram',
        label: 'Licensing Journey',
        title: 'The Three-Phase Licensing Strategy',
        mermaidCode: `graph LR
  A[Phase 1: BaaS Foundation<br/>6-12 months] --> B[Phase 2: EMI License<br/>12-24 months]
  B --> C[Phase 3: Full Banking License<br/>18-36 months]
  A --- A1[Partner with licensed bank]
  A --- A2[Launch MVP, validate fit]
  B --- B1[Own customer deposits]
  B --- B2[Build compliance infrastructure]
  C --- C1[Launch lending products]
  C --- C2[Path to profitability]`,
        caption:
          'The three-phase neobank licensing journey. Each phase takes progressively longer but unlocks new revenue streams.',
      },
      {
        type: 'concept',
        label: 'EMI License',
        title: 'The EMI Stepping Stone',
        content: `<p>An <strong>EMI (Electronic Money Institution) license</strong> is a lighter-weight regulatory path. It allows a company to issue e-money and provide payment services, but <strong>not lending</strong>.</p>
<p>Capital requirements are much lower:</p>
<ul>
  <li>Full EMI license: <strong>EUR 350,000</strong> minimum capital</li>
  <li>Small EMI license: just <strong>EUR 50,000</strong></li>
  <li>Full banking license: <strong>EUR 5 million+</strong></li>
</ul>
<p>Key constraint: customer funds must be <strong>100% safeguarded</strong> in segregated accounts. EMIs cannot use customer funds for lending — which ultimately drives successful EMIs toward seeking a full banking license.</p>
<div class="slide-callout">Revolut operated under an EMI license for nearly a decade before getting its UK banking license in September 2024.</div>`,
      },
      {
        type: 'concept',
        label: 'Failure Modes',
        title: 'Why Most Neobanks Fail',
        content: `<p>With 300+ neobanks globally, the failure rate is staggeringly high. Common failure modes:</p>
<ul>
  <li><strong>Unclear value proposition</strong> — "We're a better bank" is not enough. Generic products attract low-engagement users who park minimal funds.</li>
  <li><strong>Unsustainable unit economics</strong> — if CAC is $50 and ARPU is $3/month, breakeven takes 17+ months before servicing costs.</li>
  <li><strong>Licensing delays</strong> — stuck in strategic limbo, unable to lend (the path to profitability), burning capital.</li>
  <li><strong>Over-reliance on a single BaaS partner</strong> — the Synapse collapse in 2024 froze customer funds across multiple neobanks.</li>
  <li><strong>Compliance gaps</strong> — a single major AML/KYC failure can be a death sentence for a thinly capitalized neobank.</li>
</ul>
<div class="slide-callout">It's extraordinarily difficult to build a profitable neobank without lending. Deposits and payments alone generate thin margins.</div>`,
      },
      {
        type: 'concept',
        label: 'Success Patterns',
        title: 'What Successful Neobanks Get Right',
        content: `<p>Across neobanks that have survived and scaled, several patterns emerge:</p>
<ul>
  <li><strong>Segment focus before scale</strong> — Nubank started with credit cards for Brazilian millennials. Chime started with early paycheck access for paycheck-to-paycheck Americans.</li>
  <li><strong>Prove unit economics first</strong> — obsess over per-customer economics, not vanity metrics like total users or app downloads.</li>
  <li><strong>Hire compliance leaders early</strong> — senior compliance officers shape the product roadmap, not just file reports.</li>
  <li><strong>Embed compliance in culture</strong> — every engineer and PM understands why compliance matters and how their work connects to regulatory requirements.</li>
</ul>
<div class="slide-callout">The neobanks that succeed start with a laser focus on one underserved segment and build a product that's genuinely 10x better for that group.</div>`,
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'Neobank',
            definition:
              'A fully digital-only bank with no physical branches, often initially operating through a BaaS partner rather than its own license.',
          },
          {
            term: 'BaaS (Banking-as-a-Service)',
            definition:
              'A model where a licensed bank provides regulatory umbrella, deposit holding, and core banking via APIs to a fintech partner.',
          },
          {
            term: 'EMI License',
            definition:
              'Electronic Money Institution license — allows issuing e-money and payment services, but not lending. Requires less capital than a full banking license.',
          },
          {
            term: 'Unit Economics',
            definition:
              'Revenue and cost metrics per customer — CAC (Customer Acquisition Cost), LTV (Lifetime Value), and ARPU (Average Revenue Per User).',
          },
          {
            term: 'Involuntary Churn (Neobank context)',
            definition:
              'Customers lost due to payment failures or platform disruptions, not deliberate cancellation.',
          },
          {
            term: 'Safeguarding',
            definition:
              '100% of EMI customer funds must be ring-fenced in segregated accounts, separate from the company\'s operating funds.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. Subscriptions & Recurring Payments
  // ──────────────────────────────────────────────
  {
    topicSlug: 'subscriptions-and-recurring',
    topicTitle: 'Subscriptions & Recurring Payments',
    theme: 'Products & Use Cases',
    slides: [
      {
        type: 'intro',
        title: 'Subscriptions & Recurring Payments',
        description:
          'Behind every seamless subscription is a constant battle against payment failure. Cards expire, banks reissue, accounts run low. Understanding involuntary churn, account updaters, retry strategies, and dunning is how the $300B+ subscription economy keeps subscribers paying.',
        objectives: [
          'Understand involuntary churn and why it accounts for 20-40% of all subscription churn',
          'Explain how Account Updater services silently recover failed payments',
          'Design an effective retry strategy for soft vs. hard declines',
          'Know the CIT/MIT framework and why it matters for recurring billing',
        ],
      },
      {
        type: 'concept',
        label: 'The Hidden Problem',
        title: 'Involuntary Churn',
        content: `<p>You probably subscribe to a dozen services. Each charges your card monthly without you lifting a finger. But underneath that seamless experience is a <strong>constant battle against payment failure</strong>.</p>
<p>Cards expire every 3 years. Banks reissue cards after fraud. Customers change banks. Accounts run low before payday.</p>
<p><strong>Involuntary churn</strong> — subscribers lost to payment failures, not dissatisfaction — accounts for <strong>20-40% of all subscription churn</strong>.</p>
<div class="slide-callout">For a subscription business doing $100M in annual recurring revenue, involuntary churn might silently drain $3-5 million per year. That's not a rounding error.</div>`,
      },
      {
        type: 'concept',
        label: 'Card Lifecycle',
        title: 'Why Stored Cards Stop Working',
        content: `<p>The fundamental challenge: the payment credential you stored today <strong>might not work tomorrow</strong>.</p>
<p>In a portfolio of 1 million subscribers:</p>
<ul>
  <li>Roughly <strong>28,000 cards expire every month</strong></li>
  <li>Banks regularly <strong>reissue millions of cards</strong> after data breaches</li>
  <li>Customers <strong>switch banks</strong> or report cards lost/stolen</li>
</ul>
<p>Each event creates a new card number the merchant doesn't have. Most customers <strong>won't proactively update</strong> their card — they won't even notice the subscription lapsed until weeks later.</p>
<div class="slide-callout">This is where Account Updater services become essential — they silently fix the problem before it causes a failed payment.</div>`,
      },
      {
        type: 'concept',
        label: 'Account Updater',
        title: 'The Silent Savior',
        content: `<p><strong>Account Updater</strong> services from card networks (Visa VAU, Mastercard ABU) automatically update stored card credentials when cards are replaced.</p>
<p>Two flavors:</p>
<ul>
  <li><strong>Batch mode</strong> — merchant submits their card portfolio periodically; the network returns updated credentials.</li>
  <li><strong>Real-time mode</strong> — when a charge is declined, the processor queries for updated credentials and retries immediately.</li>
</ul>
<p>Account Updater recovers <strong>10-20% of otherwise-failed payments</strong>. Stripe reports its automatic updater recovers <strong>billions of dollars annually</strong> across its platform.</p>
<div class="slide-callout">The subscriber never knows it happened. Their card was replaced, the merchant got the new number automatically, and the next charge went through seamlessly.</div>`,
      },
      {
        type: 'diagram',
        label: 'Retry Flow',
        title: 'The Retry Decision Tree',
        mermaidCode: `graph TD
  A[Recurring charge attempt] --> B{Approved?}
  B -->|Yes| C[Payment successful]
  B -->|No| D{Decline type?}
  D -->|Hard decline| E[Do not retry<br/>Flag for dunning]
  D -->|Soft decline| F{Account Updater<br/>has new credentials?}
  F -->|Yes| G[Retry with new card]
  G --> B
  F -->|No| H[Schedule retry]
  H --> I[Retry 1: Wait 2-3 days]
  I -->|Declined| J[Retry 2: Wait 5-7 days]
  J -->|Declined| K[Retry 3: Align with payday]
  K -->|Declined| L[Final: Cancel or dunning]`,
        caption:
          'Different decline types get different handling. Hard declines are never retried. Soft declines follow an escalating schedule, ideally aligned with payday cycles.',
      },
      {
        type: 'concept',
        label: 'Retry Strategy',
        title: 'The Art of the Second Attempt',
        content: `<p>Not all declines are equal:</p>
<ul>
  <li><strong>Hard decline</strong> — card permanently invalid (closed, stolen, invalid number). Retrying is <strong>pointless and can trigger penalties</strong>.</li>
  <li><strong>Soft decline</strong> — temporary reason (insufficient funds, issuer unavailable). <strong>Worth retrying</strong>.</li>
</ul>
<p>Timing matters enormously:</p>
<ul>
  <li>A decline for insufficient funds on the 28th might succeed on the <strong>1st (payday)</strong></li>
  <li>Payday-aware retries have <strong>20-30% higher success rates</strong></li>
  <li>Visa limits merchants to <strong>15 retry attempts within 30 days</strong></li>
</ul>
<div class="slide-callout">Excessive retries trigger network monitoring programs and can result in fines. The card networks impose limits because retries cost processing capacity.</div>`,
      },
      {
        type: 'concept',
        label: 'CIT/MIT',
        title: 'The CIT/MIT Framework',
        content: `<p>Visa classifies every transaction as either a <strong>CIT</strong> (Cardholder-Initiated Transaction) or <strong>MIT</strong> (Merchant-Initiated Transaction).</p>
<ul>
  <li><strong>CIT</strong> — the customer is actively present (signing up, entering card details). May require SCA authentication in Europe.</li>
  <li><strong>MIT</strong> — merchant initiates without cardholder present (recurring charges, installments). Exempt from SCA.</li>
</ul>
<p>The first payment must be a properly authenticated CIT. Every subsequent recurring charge must reference the original CIT and be flagged as a MIT.</p>
<div class="slide-callout">Getting CIT/MIT classification wrong can result in higher decline rates, lost chargeback disputes, and network fines.</div>`,
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'Involuntary Churn',
            definition:
              'Subscribers lost due to payment failures (expired card, insufficient funds) rather than deliberate cancellation.',
          },
          {
            term: 'Account Updater',
            definition:
              'Card network services (Visa VAU, Mastercard ABU) that automatically update expired or replaced card credentials with merchants.',
          },
          {
            term: 'Hard Decline',
            definition:
              'A permanent decline — closed account, stolen card, invalid number. Should not be retried.',
          },
          {
            term: 'Soft Decline',
            definition:
              'A temporary decline — insufficient funds, issuer unavailable. Worth retrying on a schedule.',
          },
          {
            term: 'CIT/MIT Framework',
            definition:
              'Visa framework classifying transactions as Cardholder-Initiated (CIT) or Merchant-Initiated (MIT), determining authentication and liability rules.',
          },
          {
            term: 'Dunning',
            definition:
              'The process of contacting customers about failed payments and asking them to update their payment method.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 5. Credit Cards vs Debit Cards
  // ──────────────────────────────────────────────
  {
    topicSlug: 'credit-cards-vs-debit-cards',
    topicTitle: 'Credit Cards vs. Debit Cards',
    theme: 'Card Ecosystem',
    slides: [
      {
        type: 'intro',
        title: 'Credit Cards vs. Debit Cards',
        description:
          'They look identical and work the same way at checkout, but credit and debit cards are two fundamentally different financial products. One spends your money; the other lends you money. That single distinction drives massive differences in economics, regulation, and consumer protection.',
        objectives: [
          'Understand the fundamental difference: good funds model (debit) vs. lending model (credit)',
          'Explain how signature debit vs. PIN debit routing affects merchant costs',
          'Compare consumer protections under Regulation E (debit) and Regulation Z (credit)',
          'Know why banks push credit and merchants prefer debit',
        ],
      },
      {
        type: 'concept',
        label: 'The Core Difference',
        title: 'Your Money vs. Their Money',
        content: `<p>A <strong>debit card</strong> operates on the <strong>good funds model</strong>. The issuer checks whether you have enough money in your checking account. You're spending money you already have.</p>
<p>A <strong>credit card</strong> operates on a <strong>lending model</strong>. The issuer has extended you a credit line — say, $10,000. When you make a purchase, they check if you're within your limit and effectively lend you the money. You don't pay back until your statement arrives, 20-30 days later.</p>
<div class="slide-callout">This distinction — your money versus a short-term loan — is the root of everything else that differs between these two products.</div>`,
      },
      {
        type: 'concept',
        label: 'Authorization',
        title: 'Same Flow, Different Logic',
        content: `<p>The transaction flow is <strong>architecturally identical</strong>: terminal to acquirer to network to issuer. Same message format (ISO 8583), same two-second response time.</p>
<p>But the <strong>decision logic</strong> is different:</p>
<ul>
  <li><strong>Debit:</strong> "Is there $47.50 in the checking account right now?" A hold is placed and available balance drops in real time.</li>
  <li><strong>Credit:</strong> "Is $47.50 within the available credit line?" The amount is added to the outstanding balance.</li>
</ul>
<div class="slide-callout">Same message format. Same network routing. Same speed. But the decision engine is checking fundamentally different things — a bank balance versus a credit limit.</div>`,
      },
      {
        type: 'concept',
        label: 'Debit Routing',
        title: 'Two Ways to Route a Debit Card',
        content: `<p>A debit card has <strong>two processing paths</strong> with very different economics:</p>
<ul>
  <li><strong>Signature debit</strong> — routes over Visa/Mastercard credit rails. No PIN required. Dual-message flow (auth now, clear later). Higher interchange: ~0.80-1.05%.</li>
  <li><strong>PIN debit</strong> — routes over PIN debit networks (Interlink, STAR, PULSE). PIN required. Single-message flow (auth + clear together). Lower interchange: ~0.30-0.50%.</li>
</ul>
<p>When the terminal asks "Debit or Credit?" it's not asking what card type you have — it's asking <strong>which network rail</strong> to use.</p>
<div class="slide-callout">Walmart aggressively routes all debit to PIN networks, saving hundreds of millions per year. They were a key advocate for the Durbin Amendment's dual-network routing requirement.</div>`,
      },
      {
        type: 'diagram',
        label: 'Routing Paths',
        title: 'Signature Debit vs. PIN Debit',
        mermaidCode: `graph TD
  DC[Debit Card at Checkout] --> Q{How is it routed?}
  Q -->|Run as Credit| SIG[Signature Debit<br/>Visa/MC Rails]
  Q -->|Enter PIN| PIN[PIN Debit<br/>Interlink/STAR/PULSE]
  SIG --> HI[Higher Interchange<br/>~0.80-1.05%]
  SIG --> DM[Dual-Message Flow]
  PIN --> LI[Lower Interchange<br/>~0.30-0.50%]
  PIN --> SM[Single-Message Flow]`,
        caption:
          'The same debit card can take two very different paths, with very different costs for the merchant.',
      },
      {
        type: 'concept',
        label: 'The Interchange Gap',
        title: 'Why the Cost Difference Is Massive',
        content: `<p>On a <strong>$100 purchase</strong>, the interchange cost varies dramatically:</p>
<ul>
  <li><strong>Premium credit card:</strong> ~$2.50 (2.0-3.0%)</li>
  <li><strong>Signature debit:</strong> ~$0.90 (0.80-1.05%)</li>
  <li><strong>Regulated debit (Durbin):</strong> ~$0.26 (21 cents + 0.05%)</li>
  <li><strong>Exempt debit (small bank):</strong> ~$0.80 (0.70-1.00%)</li>
</ul>
<p>For a grocery store operating at 1-2% net margin, the difference between a $2.50 credit card fee and a $0.26 regulated debit fee can be the difference between <strong>profit and loss</strong> on a transaction.</p>
<div class="slide-callout">This gap is the single biggest reason merchants have strong preferences about which cards their customers use.</div>`,
      },
      {
        type: 'concept',
        label: 'Consumer Protection',
        title: 'Reg E vs. Reg Z',
        content: `<p>The legal protections differ significantly:</p>
<ul>
  <li><strong>Credit (Reg Z):</strong> Max liability $50 (waived in practice to $0). Dispute charges <strong>before paying</strong>. You keep your money during investigation.</li>
  <li><strong>Debit (Reg E):</strong> Liability depends on reporting speed: $50 (within 2 days), $500 (2-60 days), <strong>unlimited</strong> (after 60 days). Money is <strong>already gone</strong> from your account.</li>
</ul>
<p>This is why security-conscious consumers prefer credit cards for online purchases and travel. If your credit card is stolen, you dispute and never pay. If your debit card is stolen, money vanishes and you wait days or weeks to get it back.</p>
<div class="slide-callout">With debit fraud, you could miss rent or other bills while waiting for the bank to investigate and return your funds.</div>`,
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'Good Funds Model',
            definition:
              'The debit card model — money must be in your account before you can spend it.',
          },
          {
            term: 'Credit Line',
            definition:
              'The maximum amount a credit card issuer will lend you, checked during each authorization.',
          },
          {
            term: 'Signature Debit',
            definition:
              'When a debit transaction routes over Visa/MC credit rails using signature verification — higher interchange.',
          },
          {
            term: 'PIN Debit',
            definition:
              'When a debit transaction routes over PIN debit networks using PIN verification — lower interchange.',
          },
          {
            term: 'Durbin Amendment',
            definition:
              'Capped debit interchange at ~21 cents for banks over $10B in assets and mandated dual-network routing.',
          },
          {
            term: 'Reward Points',
            definition:
              'Incentives funded by interchange revenue that credit card issuers offer to encourage card usage — typically 1-2% back.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 6. Push-to-Card
  // ──────────────────────────────────────────────
  {
    topicSlug: 'push-to-card',
    topicTitle: 'Push to Card',
    theme: 'Moving Money',
    slides: [
      {
        type: 'intro',
        title: 'Push to Card',
        description:
          'Every card payment you\'ve ever made pulls money from your account. Push-to-card reverses the flow — sending money instantly to any debit card without needing bank account details. It\'s quietly become one of the most important payment innovations of the last decade.',
        objectives: [
          'Understand how push-to-card reverses the normal card payment flow',
          'Explain the Original Credit Transaction (OCT) mechanism',
          'Compare Visa Direct and Mastercard Send platforms',
          'Identify the key use cases: gig payouts, insurance claims, P2P transfers, and lending disbursements',
        ],
      },
      {
        type: 'concept',
        label: 'The Reverse Swipe',
        title: 'Push vs. Pull',
        content: `<p>Every card payment you've made works the same way: money gets <strong>pulled</strong> from your account. You tap, the merchant pulls funds through the card network. That's a pull payment.</p>
<p><strong>Push-to-card</strong> flips this on its head. Instead of merchants pulling money from cardholders, senders <strong>push money to cardholders</strong>. Your card number becomes a <strong>destination address</strong> for funds, not just a source.</p>
<div class="slide-callout">The technical elegance is that push-to-card rides on existing card network infrastructure. No new rails needed — it just reverses the flow.</div>`,
      },
      {
        type: 'concept',
        label: 'How It Works',
        title: 'The Original Credit Transaction (OCT)',
        content: `<p>Under the hood, push-to-card uses an <strong>Original Credit Transaction (OCT)</strong>. The name reveals its origin — it's essentially a <strong>refund without an original purchase</strong>.</p>
<p>When a store processes a return, it sends a credit back to your card. An OCT is the same thing, except there was no original purchase.</p>
<p>The process:</p>
<ul>
  <li>Sender submits recipient's debit card number, amount, and details to their processor</li>
  <li>Processor formats an OCT and sends it through the card network</li>
  <li>Network routes it to the issuing bank, which credits the account</li>
  <li>Funds available in <strong>minutes</strong> (typically under 30 minutes)</li>
</ul>
<div class="slide-callout">The same Visa and Mastercard networks that process billions of purchases can also push money to any card on their network. The plumbing was already there.</div>`,
      },
      {
        type: 'diagram',
        label: 'Push-to-Card Flow',
        title: 'How Funds Are Pushed to a Debit Card',
        mermaidCode: `sequenceDiagram
  participant S as Sender<br/>e.g. Lyft
  participant P as Payment Processor
  participant N as Card Network<br/>Visa Direct / MC Send
  participant I as Issuing Bank
  participant R as Recipient
  S->>P: Push $150 to card 4821
  P->>N: OCT request
  N->>I: Route to issuing bank
  Note over I: Validate card, credit account
  I-->>N: Approval
  N-->>P: Confirmation
  Note over R: Funds available in minutes`,
        caption:
          'Push-to-card flow: the sender initiates an OCT that travels through the card network in reverse, crediting the recipient\'s debit card.',
      },
      {
        type: 'concept',
        label: 'Why It Matters',
        title: 'Reach, Speed, and Simplicity',
        content: `<p>The killer feature isn't just speed — it's <strong>reach and simplicity</strong>:</p>
<ul>
  <li><strong>~80% of American adults</strong> have a debit card. It's a universal credential people already carry.</li>
  <li><strong>Simpler enrollment</strong> — just a card number. No routing numbers, no account digits, no micro-deposit verification that takes days.</li>
  <li><strong>Fixed, predictable cost</strong> — typically $0.25-0.50 per transaction, regardless of amount. Cheaper than wires ($25-30).</li>
  <li><strong>Works without a bank account</strong> — prepaid debit cards work too, reaching underbanked populations.</li>
</ul>
<div class="slide-callout">Compare to ACH: requires routing + account numbers, takes 1-3 days, and has meaningful return rates from incorrect account info. Push-to-card is faster, simpler, and more reliable.</div>`,
      },
      {
        type: 'concept',
        label: 'Use Cases',
        title: 'Where Push-to-Card Shines',
        content: `<p>Push-to-card has found its strongest fit in <strong>disbursements</strong> — any situation where a company sends money to many individuals quickly:</p>
<ul>
  <li><strong>Gig economy payouts</strong> — Lyft, Uber, DoorDash offer instant cashout to debit cards instead of waiting for weekly ACH.</li>
  <li><strong>Insurance claim disbursements</strong> — instant payouts instead of mailing checks (7-14 days). Dramatically higher satisfaction scores.</li>
  <li><strong>Marketplace seller payments</strong> — eBay, Etsy sellers receive proceeds instantly instead of waiting for ACH.</li>
  <li><strong>P2P transfers</strong> — Venmo and Cash App "instant deposit" often uses push-to-card underneath.</li>
  <li><strong>Lending disbursements</strong> — personal loan or BNPL funds pushed to debit card instantly.</li>
</ul>
<div class="slide-callout">For the specific problem of "send $50-$5,000 to an individual with a debit card, today" — push-to-card is unmatched.</div>`,
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'Push Payment',
            definition:
              'A payment initiated by the sender that pushes funds to the recipient — the opposite of a pull payment like a card charge.',
          },
          {
            term: 'OCT (Original Credit Transaction)',
            definition:
              'The technical mechanism for push-to-card — essentially a credit/refund without an original purchase.',
          },
          {
            term: 'Visa Direct',
            definition:
              'Visa\'s platform for pushing funds to Visa debit cards and bank accounts in real time. Reaches 3+ billion credentials worldwide.',
          },
          {
            term: 'Mastercard Send',
            definition:
              'Mastercard\'s platform for pushing funds to Mastercard debit and prepaid cards. Reaches 2+ billion credentials globally.',
          },
          {
            term: 'Tabapay',
            definition:
              'A payment processor that handles both pull (card charges) and push (push-to-card) from the same credential in a single integration.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
    ],
  },

  // ──────────────────────────────────────────────
  // 7. Bank-Based Payments
  // ──────────────────────────────────────────────
  {
    topicSlug: 'bank-based-payments',
    topicTitle: 'Bank-Based Payments',
    theme: 'Non-Card Payments',
    slides: [
      {
        type: 'intro',
        title: 'Bank-Based Payments',
        description:
          'Card networks get the headlines, but bank-to-bank transfers move far more money. ACH handles 82% of US electronic payments. Your paycheck, rent, utility bills, and tax refund all travel over bank-based rails — not card networks.',
        objectives: [
          'Understand the difference between push and pull payments',
          'Trace how an ACH transaction flows from originator through ODFI, ACH operator, and RDFI',
          'Compare ACH (US), SEPA (Europe), and BACS (UK) systems',
          'Explain how Open Banking and Pay by Bank are changing bank-based payments',
          'Know why bank transfers are dramatically cheaper than card payments',
        ],
      },
      {
        type: 'concept',
        label: 'Fundamentals',
        title: 'Push vs. Pull Payments',
        content: `<p>Before diving into specific systems, understand the two basic directions money can move:</p>
<ul>
  <li><strong>Push payments</strong> — initiated by the <strong>sender</strong>. You tell your bank to send money. Wire transfers and direct deposits are push payments.</li>
  <li><strong>Pull payments</strong> — initiated by the <strong>receiver</strong>. You authorize a company to withdraw money. Direct debits for your gym or utility bill are pull payments.</li>
</ul>
<p>This distinction matters for <strong>fraud risk</strong> and <strong>consumer protection</strong>:</p>
<ul>
  <li>Push payments are harder to reverse — the sender authorized explicitly</li>
  <li>Pull payments come with stronger protections — you're trusting someone else to take the right amount</li>
</ul>
<div class="slide-callout">In most systems, consumers can dispute and reverse unauthorized pull payments. Push payments are much harder to claw back.</div>`,
      },
      {
        type: 'concept',
        label: 'ACH',
        title: 'How America Moves Money',
        content: `<p><strong>ACH</strong> (Automated Clearing House) is the dominant bank-to-bank system in the US, processing over <strong>31 billion transactions in 2023</strong>.</p>
<p>It handles direct deposits, bill payments, B2B transfers, tax refunds, and the underlying transfers behind Venmo, PayPal, and Cash App.</p>
<p>Key characteristics:</p>
<ul>
  <li>Governed by <strong>NACHA</strong> (National Automated Clearing House Association)</li>
  <li>Operated by the <strong>Federal Reserve (FedACH)</strong> and <strong>The Clearing House (EPN)</strong></li>
  <li>Processed in <strong>batches</strong>, not real time — typically 1-3 day settlement</li>
  <li><strong>Same-Day ACH</strong> (since 2015) enables same-business-day settlement</li>
  <li>Cost: <strong>$0.20-$0.50</strong> per transaction vs. 2-3% for cards</li>
</ul>
<div class="slide-callout">When you link a bank account to Venmo, the actual money movement between banks happens over ACH. Venmo provides the real-time experience by fronting the money.</div>`,
      },
      {
        type: 'diagram',
        label: 'ACH Flow',
        title: 'How an ACH Transaction Works',
        mermaidCode: `sequenceDiagram
  participant S as Originator<br/>e.g. Employer
  participant O as ODFI<br/>Sender Bank
  participant A as ACH Operator<br/>Fed or EPN
  participant R as RDFI<br/>Receiver Bank
  participant E as Receiver<br/>e.g. Employee
  S->>O: Submit NACHA file
  O->>A: Forward batch
  Note over A: Sort and route transactions
  A->>R: Deliver entries
  R->>E: Credit account
  Note over S,E: Settlement: 1-3 days or same day`,
        caption:
          'ACH transaction flow: the originator submits a NACHA file through their bank (ODFI), which is routed by the ACH operator to the receiving bank (RDFI).',
      },
      {
        type: 'concept',
        label: 'Europe & UK',
        title: 'SEPA and BACS',
        content: `<p><strong>SEPA</strong> (Single Euro Payments Area) is Europe's bank transfer system with a twist — it works across <strong>36 countries</strong>. A transfer from Germany to France uses the same rails as a domestic German transfer.</p>
<ul>
  <li>SEPA transfers are <strong>free or near-free</strong> for consumers, by regulation</li>
  <li><strong>SEPA Instant</strong> (since 2017) enables transfers in <strong>under 10 seconds, 24/7</strong></li>
</ul>
<p><strong>BACS</strong> (Bankers' Automated Clearing Services) is the UK's batch system:</p>
<ul>
  <li>Handles <strong>4+ billion transactions per year</strong></li>
  <li>Notable for a <strong>3-day settlement cycle</strong> (input, processing, settlement)</li>
  <li>The UK's <strong>Direct Debit Guarantee</strong> gives consumers immediate refund rights</li>
</ul>
<div class="slide-callout">BACS' slow speed led to the UK creating Faster Payments in 2008 — a real-time alternative for time-sensitive transfers.</div>`,
      },
      {
        type: 'concept',
        label: 'Open Banking',
        title: 'Pay by Bank and Variable Recurring Payments',
        content: `<p><strong>Open Banking</strong> is fundamentally changing bank-based payments. Regulators require banks to open APIs for third-party access to account data and payment initiation.</p>
<p><strong>Pay by Bank</strong> — the consumer-facing application:</p>
<ul>
  <li>Select "Pay by Bank" at checkout, choose your bank, authenticate in your banking app</li>
  <li>Fees: ~<strong>0.5%</strong> vs. 2-3% for cards (no interchange, no scheme fees)</li>
  <li>Growing fastest for bill payments, rent, and high-value purchases</li>
</ul>
<p><strong>Variable Recurring Payments (VRP)</strong> — a UK innovation:</p>
<ul>
  <li>Customer grants ongoing consent within agreed parameters (max amount, max frequency)</li>
  <li>Authenticate once; subsequent payments are automatic</li>
  <li>A potential challenger to the decades-old direct debit system</li>
</ul>
<div class="slide-callout">The trade-off: cards offer rewards and purchase protection. Pay by Bank offers neither — but the cost savings for merchants are enormous.</div>`,
      },
      {
        type: 'concept',
        label: 'Cost Advantage',
        title: 'Why Bank Transfers Are Cheaper Than Cards',
        content: `<p>The cost difference is dramatic:</p>
<ul>
  <li><strong>ACH:</strong> $0.20-$0.50 per transaction</li>
  <li><strong>SEPA:</strong> often free</li>
  <li><strong>Card payment:</strong> 2-3% of transaction value</li>
</ul>
<p>Why? Card transactions involve interchange fees, assessment fees, and processor markups — multiple intermediaries each taking a cut. Bank transfers go bank-to-bank with the clearing system in between.</p>
<p>A company processing $100 million saves roughly <strong>$2 million annually</strong> by shifting from cards to ACH.</p>
<div class="slide-callout">This economic reality is driving growth of bank payment acceptance. But bank transfers have trade-offs: slower speed, fewer consumer protections, no rewards, and no global interoperability.</div>`,
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'ACH',
            definition:
              'Automated Clearing House — the US batch system for bank-to-bank transfers, handling 82% of US electronic payments.',
          },
          {
            term: 'SEPA',
            definition:
              'Single Euro Payments Area — the EU system for cross-border euro bank transfers across 36 countries.',
          },
          {
            term: 'BACS',
            definition:
              'Bankers\' Automated Clearing Services — the UK system for direct debits and bank credits with a 3-day settlement cycle.',
          },
          {
            term: 'NACHA',
            definition:
              'The organization governing ACH rules and file formats in the US.',
          },
          {
            term: 'ODFI / RDFI',
            definition:
              'Originating and Receiving Depository Financial Institutions — the sender\'s and receiver\'s banks in an ACH transaction.',
          },
          {
            term: 'Direct Debit',
            definition:
              'A pull-based payment where the payee initiates the withdrawal from the payer\'s bank account.',
          },
          {
            term: 'Open Banking',
            definition:
              'Regulatory mandates requiring banks to provide APIs for third-party access to account data and payment initiation.',
          },
          {
            term: 'VRP (Variable Recurring Payments)',
            definition:
              'A UK Open Banking innovation allowing merchants to initiate recurring payments within customer-agreed parameters.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
      { type: 'quiz', questionIndex: 2 },
    ],
  },

  // ──────────────────────────────────────────────
  // 8. Liability
  // ──────────────────────────────────────────────
  {
    topicSlug: 'liability',
    topicTitle: 'Liability',
    theme: 'Trust & Compliance',
    slides: [
      {
        type: 'intro',
        title: 'Liability',
        description:
          'When fraud happens, one question dominates: who pays? The liability framework determines whether the merchant, the issuer, or the consumer bears the cost — and it drives every security investment decision in the payments industry.',
        objectives: [
          'Understand the core principle: liability falls on the party with the weakest security',
          'Explain the EMV liability shift and why it drove chip terminal adoption',
          'Know that merchants bear default liability for card-not-present fraud',
          'Understand how 3D Secure shifts CNP liability to the issuer',
        ],
      },
      {
        type: 'concept',
        label: 'The Core Principle',
        title: 'Liability Falls on the Weakest Security',
        content: `<p>The card networks designed the liability framework deliberately: <strong>liability falls on the party with the weakest security</strong>.</p>
<p>This creates financial incentives for every participant to invest in fraud prevention. The framework allocates cost based on:</p>
<ul>
  <li>The <strong>type of transaction</strong> (card-present vs. card-not-present)</li>
  <li>The <strong>security measures</strong> in place (chip, PIN, 3D Secure)</li>
  <li>The <strong>card network rules</strong> and applicable regulations</li>
</ul>
<div class="slide-callout">Every security feature, every authentication protocol, every fraud model in payments exists because someone's balance sheet is on the line.</div>`,
      },
      {
        type: 'concept',
        label: 'Card-Present',
        title: 'The EMV Liability Shift',
        content: `<p>The <strong>EMV liability shift</strong> took effect in the US in October 2015 and changed everything:</p>
<ul>
  <li><strong>Chip card + chip terminal</strong> = issuer bears liability. The merchant did everything right.</li>
  <li><strong>Chip card + swipe-only terminal</strong> = merchant bears liability. They chose not to invest in chip-capable hardware.</li>
</ul>
<p>EMV chips generate a <strong>unique cryptogram for each transaction</strong>, making counterfeit cards nearly impossible. If fraud still occurs on a chip-authenticated transaction, it's the issuer's problem.</p>
<div class="slide-callout">This economic lever drove massive EMV terminal adoption. Within a few years, chip-ready terminals went from a minority to the vast majority. Nobody wanted to hold the bag for counterfeit fraud.</div>`,
      },
      {
        type: 'concept',
        label: 'Card-Not-Present',
        title: 'Online Fraud: The Merchant\'s Burden',
        content: `<p>In card-not-present (CNP) transactions — online, phone, mail-order — the <strong>merchant bears liability by default</strong>.</p>
<p>There's no chip to read online. No way to physically verify the cardholder. The merchant accepted the order based on a card number, expiration date, and CVV — all of which could have been stolen.</p>
<p>Every fraudulent online transaction comes directly out of the merchant's revenue, <strong>plus</strong>:</p>
<ul>
  <li>Chargeback processing fees ($20-100 per dispute)</li>
  <li>Lost merchandise (already shipped)</li>
  <li>Potential network monitoring penalties for high chargeback rates</li>
</ul>
<div class="slide-callout">This is why CNP fraud is such a massive problem for e-commerce. It's also why merchants invest heavily in fraud detection tools — every prevented fraud is money saved.</div>`,
      },
      {
        type: 'concept',
        label: '3D Secure',
        title: 'Shifting CNP Liability with 3D Secure',
        content: `<p><strong>3D Secure</strong> is the merchant's escape valve in the online world. When a transaction is successfully authenticated by the issuing bank (via OTP, biometric, or banking app), <strong>liability shifts to the issuer</strong>.</p>
<p>But it creates a genuine dilemma:</p>
<ul>
  <li><strong>Pro:</strong> shifts fraud liability away from the merchant</li>
  <li><strong>Con:</strong> adds friction to checkout, potentially causing cart abandonment</li>
</ul>
<p>The art is in <strong>selective application</strong>. Many merchants use 3D Secure only on transactions their fraud models flag as medium-to-high risk, while letting low-risk transactions flow through without authentication.</p>
<div class="slide-callout">The logic mirrors EMV: the merchant invested in better security. If authenticated fraud still occurs, the issuer — who performed the authentication — bears the cost.</div>`,
      },
      {
        type: 'concept',
        label: 'Consumer Protection',
        title: 'Zero Liability for Consumers',
        content: `<p>From the consumer's perspective, the picture is much simpler:</p>
<ul>
  <li><strong>Visa/Mastercard Zero Liability</strong> — consumers are not responsible for unauthorized transactions. Period.</li>
  <li><strong>Regulation Z (credit):</strong> liability capped at $50. Every major issuer waives even this amount.</li>
  <li><strong>Regulation E (debit):</strong> $50 if reported within 2 days, $500 within 60 days, no cap after 60 days.</li>
</ul>
<p>The key insight: <strong>consumers are largely shielded</strong>. The cost gets allocated between merchants and issuers, depending on the acceptance environment and security measures.</p>
<div class="slide-callout">This consumer protection is a feature, not a bug — it's what gives people the confidence to use cards in the first place.</div>`,
      },
      {
        type: 'diagram',
        label: 'Liability Map',
        title: 'Who Bears Liability in Each Scenario',
        mermaidCode: `graph TD
  A[Transaction Type] --> B[Card-Present]
  A --> C[Card-Not-Present]
  B --> D{Chip Used?}
  D -->|Yes| E[Issuer bears liability]
  D -->|No| F[Merchant bears liability]
  C --> G{3D Secure Used?}
  G -->|Yes| H[Issuer bears liability]
  G -->|No| I[Merchant bears liability]
  A --> J[Consumer]
  J --> K[Credit: $0 in practice]
  J --> L[Debit: $50-$500 depending on timing]`,
        caption:
          'The liability spectrum: who pays depends on the transaction type and security measures in place.',
      },
      {
        type: 'terms',
        terms: [
          {
            term: 'Liability Shift',
            definition:
              'The transfer of fraud liability from one party to another based on which party has weaker security.',
          },
          {
            term: 'EMV Liability Shift',
            definition:
              'Since October 2015, if a merchant doesn\'t accept chip cards and fraud occurs, the merchant bears liability instead of the issuer.',
          },
          {
            term: 'CNP Liability',
            definition:
              'In card-not-present (online) transactions, the merchant bears fraud liability by default unless 3D Secure is used.',
          },
          {
            term: 'Zero Liability',
            definition:
              'Card network policies protecting consumers from unauthorized transactions — the consumer owes nothing for fraud.',
          },
          {
            term: 'Merchant of Record',
            definition:
              'The entity listed as the seller in a transaction — bears primary liability for disputes, refunds, and chargebacks.',
          },
          {
            term: '3D Secure',
            definition:
              'An authentication protocol for online card payments that shifts fraud liability from merchant to issuer when successfully completed.',
          },
        ],
      },
      { type: 'quiz', questionIndex: 0 },
      { type: 'quiz', questionIndex: 1 },
    ],
  },

  // ─── EXPENSE MANAGEMENT ───────────────────────────────────────────
  {
    topicSlug: 'expense-management',
    topicTitle: 'Expense Management',
    theme: 'Products & Use Cases',
    slides: [
      {
        type: 'intro',
        title: 'Expense Management',
        description:
          'How modern corporate cards killed the expense report. Real-time spend controls, automatic categorization, and the payments infrastructure that makes it all work.',
        objectives: [
          'Understand why the traditional expense report process was broken',
          'Learn how real-time spend controls enforce policy at the point of purchase',
          'Know the infrastructure stack behind modern expense platforms (issuer processor, sponsor bank, card network)',
          'Compare interchange-based vs SaaS revenue models',
        ],
      },
      {
        type: 'concept',
        label: 'The Problem',
        title: 'The Old Way Was Painful',
        content: `<p>Traditional expense management was universally hated. Here is what it looked like:</p>
<ul>
  <li>Employee pays with their <strong>personal card</strong></li>
  <li>Collects and photographs receipts manually</li>
  <li>Submits an expense report days later</li>
  <li>Manager reviews, then finance audits</li>
  <li>Reimbursement arrives <strong>14-21 days</strong> after the purchase</li>
</ul>
<div class="slide-callout">The core problem: policy was enforced <strong>after</strong> the money was spent, not before.</div>`,
      },
      {
        type: 'concept',
        label: 'The New Model',
        title: 'Controlled Spending at the Swipe',
        content: `<p>Companies like <strong>Brex, Ramp, and Divvy</strong> flipped the model. Instead of reimbursing employees, they issue corporate cards with <strong>real-time controls</strong>.</p>
<p>When an employee swipes, a decision engine evaluates spend rules in <strong>50-100 milliseconds</strong>:</p>
<ul>
  <li><strong>Amount limits</strong> — per-transaction, daily, or monthly caps</li>
  <li><strong>Merchant category restrictions</strong> — only allow specific MCCs</li>
  <li><strong>Time-based controls</strong> — cards active only during business hours or trip dates</li>
  <li><strong>Geographic restrictions</strong> — limit to specific countries</li>
</ul>
<div class="slide-callout">Policy is now enforced <strong>before</strong> the money leaves the account — a fundamental architectural change.</div>`,
      },
      {
        type: 'concept',
        label: 'Receipts',
        title: 'Solving the Receipt Problem',
        content: `<p>Receipts were the bane of expense management. Modern platforms attack this from multiple angles:</p>
<ul>
  <li><strong>Push notifications</strong> — prompt employees to snap a photo immediately after swiping</li>
  <li><strong>Level III data</strong> — some transactions include itemized line items directly in the transaction data</li>
  <li><strong>OCR and auto-matching</strong> — machine learning parses receipt photos and matches them to transactions</li>
  <li><strong>Auto-categorization</strong> — transactions are mapped to expense categories based on merchant codes</li>
</ul>
<div class="slide-callout">Capture rates jump dramatically when the receipt prompt arrives in real time, not days later.</div>`,
      },
      {
        type: 'concept',
        label: 'Revenue Models',
        title: 'Interchange vs SaaS',
        content: `<p>Expense management companies make money in two different ways:</p>
<p><strong>Interchange-based (Brex, Ramp, Divvy)</strong> — No subscription fee. Revenue comes from <strong>interchange fees</strong> earned each time an employee swipes the card. They even offer cashback to customers.</p>
<p><strong>SaaS-based (Concur, Expensify)</strong> — Charge <strong>$8-15 per employee per month</strong>. Revenue comes from software subscriptions.</p>
<div class="slide-callout">The interchange model is winning. A 1,000-employee company can save $500,000+ per year by switching from SaaS to interchange-based platforms.</div>`,
      },
      {
        type: 'diagram',
        label: 'Infrastructure',
        title: 'The Expense Management Stack',
        mermaidCode: `graph TD
    A[Expense Platform<br/>Brex / Ramp / Divvy] --> B[Issuer Processor<br/>Marqeta / Lithic]
    A --> C[Sponsor Bank<br/>Sutton / Celtic Bank]
    A --> D[Card Network<br/>Visa / Mastercard]
    A --> E[Accounting Integration<br/>QuickBooks / NetSuite]
    B --> F[Card Issuance &<br/>Spend Controls]
    C --> G[Banking License &<br/>BIN Range]
    D --> H[80M+ Merchant<br/>Acceptance Network]`,
        caption: 'Every modern expense platform relies on an issuer processor, sponsor bank, card network, and accounting integrations working together.',
      },
      {
        type: 'terms',
        terms: [
          { term: 'Spend Controls', definition: 'Real-time rules on corporate cards — limiting spending by amount, merchant category, time, or geography per card.' },
          { term: 'MCC (Merchant Category Code)', definition: 'A four-digit code assigned to every merchant by their acquirer, identifying the type of business (e.g., 5812 for restaurants).' },
          { term: 'JIT Funding', definition: 'Just-in-Time funding — corporate cards are funded at the exact moment of each transaction rather than pre-loaded.' },
          { term: 'Track 3 / Level III Data', definition: 'Receipt-level transaction detail including itemized line items, captured at the point of sale.' },
          { term: 'Issuer Processor', definition: 'The company (Marqeta, Lithic) providing core card issuance, transaction processing, and webhook delivery.' },
          { term: 'Sponsor Bank', definition: 'A licensed bank that sits as the legal issuer of cards, since fintech companies cannot issue cards directly.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
      {
        type: 'quiz',
        questionIndex: 1,
      },
    ],
  },

  // ─── B2B PAYMENTS ─────────────────────────────────────────────────
  {
    topicSlug: 'b2b-payments',
    topicTitle: 'B2B Payments',
    theme: 'Moving Money',
    slides: [
      {
        type: 'intro',
        title: 'B2B Payments',
        description:
          'How businesses pay each other — the $127 trillion market of invoices, wire transfers, virtual cards, and ERP integrations that keeps the global economy running.',
        objectives: [
          'Understand how B2B payments differ from consumer payments',
          'Compare the four major B2B payment methods: checks, ACH, wires, and virtual cards',
          'Learn why reconciliation and duplicate prevention are critical challenges',
          'Know why B2B payment modernization has been slow despite the massive market',
        ],
      },
      {
        type: 'concept',
        label: 'Scale',
        title: 'The Biggest Market Nobody Talks About',
        content: `<p>B2B payments move roughly <strong>$127 trillion per year globally</strong>, projected to reach $200 trillion by 2028. Consumer payments are a rounding error by comparison.</p>
<p>Every supplier payment, raw material purchase, and invoice settlement is a B2B payment. Yet this market remains <strong>stubbornly manual and inefficient</strong>.</p>
<div class="slide-callout">In a world where you can send $50 to a friend instantly, paying a $50,000 invoice still involves emailing PDFs, manual data entry, and waiting days.</div>`,
      },
      {
        type: 'concept',
        label: 'Key Differences',
        title: 'B2B vs Consumer Payments',
        content: `<p>B2B payments look nothing like consumer payments:</p>
<ul>
  <li><strong>Larger amounts</strong> — $500 to $5 million per transaction; mistakes are costly</li>
  <li><strong>Approval workflows</strong> — Purchase orders, three-way matching, multi-level sign-offs</li>
  <li><strong>Net terms</strong> — Buyers pay on terms (Net 30, 60, 90 days), not at point of purchase</li>
  <li><strong>Remittance data</strong> — Suppliers need to know which invoices a payment covers for reconciliation</li>
</ul>
<div class="slide-callout">These complexities explain why modernization has been so much slower than in consumer payments.</div>`,
      },
      {
        type: 'concept',
        label: 'Payment Methods',
        title: 'The Four Ways Businesses Pay',
        content: `<p>B2B payments span four major methods, from legacy to modern:</p>
<ul>
  <li><strong>Checks</strong> — Still ~40% of US B2B payments. Slow (5-10 days) and costly ($4-20 each), but persistent due to inertia</li>
  <li><strong>ACH</strong> — Most common electronic method. Cheap ($0.20-1.50), settles in 1-3 days, batch-processed</li>
  <li><strong>Wire transfers</strong> — For large/urgent payments. Same-day, irrevocable, but expensive ($15-50)</li>
  <li><strong>Virtual cards</strong> — Fastest-growing (30%+ annually). Buyer earns interchange; supplier gets fast settlement</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'AP Automation',
        title: 'The Accounts Payable Problem',
        content: `<p>AP is where invoices go to die. The traditional process has seven manual steps — from receiving an invoice to recording the payment in the ERP. Average processing time: <strong>10-15 days per invoice</strong>.</p>
<p>Modern AP automation platforms (Bill.com, Tipalti, Coupa) attack every step:</p>
<ul>
  <li><strong>OCR + ML</strong> extract invoice data automatically</li>
  <li><strong>Rules engines</strong> perform three-way matching (PO, invoice, receiving report)</li>
  <li><strong>Digital workflows</strong> replace email approval chains</li>
  <li><strong>Auto-sync</strong> reconciles payments back to the ERP</li>
</ul>
<div class="slide-callout">AP automation cuts invoice processing costs from $15-40 (manual) to $2-5 (automated) and reduces errors by 80%+.</div>`,
      },
      {
        type: 'concept',
        label: 'Idempotency',
        title: 'Preventing the Double Pay',
        content: `<p>Duplicate payments are one of the most expensive B2B errors. Industry estimates: <strong>0.1-0.5% of all payments are duplicates</strong>.</p>
<p>For a company paying $100 million per year, that is $100,000-$500,000 in errors.</p>
<p>Modern systems prevent this with:</p>
<ul>
  <li><strong>Idempotency keys</strong> — unique identifiers ensuring a payment instruction only executes once</li>
  <li><strong>Duplicate detection rules</strong> — same vendor + same amount + same date = flagged</li>
  <li><strong>ML pattern matching</strong> — catching vendor name variations and subtle duplicates</li>
</ul>`,
      },
      {
        type: 'diagram',
        label: 'Flow',
        title: 'B2B Invoice-to-Payment Flow',
        mermaidCode: `sequenceDiagram
    participant S as Supplier
    participant AP as Buyer AP Team
    participant ERP as ERP System
    participant PAY as Payment Rail
    S->>AP: Sends invoice (email/PDF/EDI)
    AP->>ERP: Enter & match to PO
    ERP->>ERP: Three-way match (PO + Invoice + Receipt)
    ERP->>AP: Route for approval
    AP->>PAY: Execute payment (ACH/Wire/Virtual Card)
    PAY->>S: Funds + remittance data
    PAY->>ERP: Auto-reconcile`,
        caption: 'The B2B invoice lifecycle: from supplier invoice through three-way matching, approval, payment, and reconciliation.',
      },
      {
        type: 'terms',
        terms: [
          { term: 'B2B Payments', definition: 'Business-to-business payments — transactions between companies, typically larger and more complex than consumer payments.' },
          { term: 'ERP', definition: 'Enterprise Resource Planning — systems like SAP, Oracle, and NetSuite that manage business operations including accounts payable/receivable.' },
          { term: 'Accounts Payable (AP)', definition: 'The department or process responsible for paying a company\'s bills and invoices to suppliers.' },
          { term: 'Reconciliation', definition: 'Matching payment records to invoices and accounting entries — a major operational challenge in B2B payments.' },
          { term: 'Idempotency', definition: 'Ensuring a payment instruction can only be executed once, even if submitted multiple times — critical for preventing duplicate payments.' },
          { term: 'Net Terms', definition: 'Payment timing agreements (Net 30, Net 60) specifying how many days after invoicing the buyer must pay.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
      {
        type: 'quiz',
        questionIndex: 1,
      },
    ],
  },

  // ─── MARKETPLACES ─────────────────────────────────────────────────
  {
    topicSlug: 'marketplaces',
    topicTitle: 'Marketplaces',
    theme: 'Products & Use Cases',
    slides: [
      {
        type: 'intro',
        title: 'Marketplaces',
        description:
          'The four payment challenges every marketplace must solve — pay-in, splitting, pay-out, and seller onboarding — and the infrastructure behind platforms like Uber, Airbnb, and Etsy.',
        objectives: [
          'Understand the four core marketplace payment challenges: pay-in, splitting, pay-out, and seller onboarding',
          'Learn how payment splitting handles multi-seller orders, refunds, and ledger integrity',
          'Know the different payout methods: ACH, push-to-card, issued debit cards, and wallet balance',
          'Understand the regulatory complexity of money transmission for marketplaces',
        ],
      },
      {
        type: 'concept',
        label: 'The Challenge',
        title: 'Why Marketplace Payments Are Hard',
        content: `<p>Accepting a payment is a solved problem. But marketplaces need to do something much harder:</p>
<ul>
  <li>Split that payment — <strong>20% to the platform, 80% to a seller</strong> you have never met</li>
  <li>Verify the seller is not a sanctioned entity or money launderer</li>
  <li>Pay the seller quickly (ideally instantly)</li>
</ul>
<div class="slide-callout">Every marketplace must solve four interconnected challenges: <strong>pay-in, splitting, pay-out, and seller onboarding</strong>. Get any one wrong, and the marketplace breaks.</div>`,
      },
      {
        type: 'concept',
        label: 'Splitting',
        title: 'Dividing the Money',
        content: `<p>Payment splitting sounds simple, but real-world complexity is enormous:</p>
<ul>
  <li><strong>Multi-seller orders</strong> — A DoorDash order from a restaurant + convenience store must split across sellers, driver, and platform</li>
  <li><strong>Refunds and adjustments</strong> — Partial refunds must be allocated correctly across all parties</li>
  <li><strong>Tax withholding</strong> — Platforms must withhold taxes and issue 1099-K forms for sellers over $600/year</li>
  <li><strong>Ledger integrity</strong> — Every dollar must balance perfectly across seller ledgers, platform fees, held funds, and pending payouts</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'Payouts',
        title: 'Getting Money to Sellers',
        content: `<p>Sellers care intensely about how fast they get paid. Common payout methods:</p>
<ul>
  <li><strong>ACH</strong> — Cheapest ($0.10-0.30), but takes 1-3 business days</li>
  <li><strong>Push-to-card</strong> — Visa Direct or Mastercard Send delivers funds in minutes. Drivers overwhelmingly prefer this</li>
  <li><strong>Issued debit cards</strong> — DoorDash's DasherDirect card pays after every delivery and earns the platform interchange</li>
  <li><strong>Wallet balance</strong> — Sellers hold earnings on platform (Amazon default), reducing payout costs</li>
</ul>
<div class="slide-callout">Instant payouts are a powerful retention tool — sellers are less likely to switch platforms when their cash flow is tied to a platform-issued card.</div>`,
      },
      {
        type: 'concept',
        label: 'Compliance',
        title: 'The Regulatory Minefield',
        content: `<p>Marketplace payments touch one of the most complex areas of financial regulation: <strong>money transmission</strong>.</p>
<p>In the US, holding or transmitting funds on behalf of others requires a Money Transmission License — issued at the <strong>state level</strong>. That means:</p>
<ul>
  <li>Separate licenses in <strong>48 states</strong> plus DC and territories</li>
  <li><strong>12-24 months</strong> and <strong>$1-5 million</strong> in legal and licensing fees</li>
</ul>
<div class="slide-callout">This is why Stripe Connect and Adyen for Platforms exist — they handle fund-holding and regulatory complexity so the marketplace does not need its own licenses.</div>`,
      },
      {
        type: 'diagram',
        label: 'Flow',
        title: 'Marketplace Payment Flow',
        mermaidCode: `sequenceDiagram
    participant C as Customer
    participant M as Marketplace Platform
    participant L as Internal Ledger
    participant S as Seller
    C->>M: Pays $100 (card/wallet)
    M->>L: Record payment
    L->>L: Split: $20 platform fee + $80 seller share
    L->>L: Hold funds per payout schedule
    M->>S: Payout $80 (ACH / Push-to-card)
    Note over M,S: Seller onboarding (KYC/KYB) must happen before first payout`,
        caption: 'Simplified marketplace payment flow: customer pays in, the platform splits funds via internal ledgers, then disburses to verified sellers.',
      },
      {
        type: 'terms',
        terms: [
          { term: 'Payment Splitting', definition: 'Dividing a single customer payment between multiple recipients — the platform commission and each seller\'s share.' },
          { term: 'Payment Facilitator (PayFac)', definition: 'A model where the marketplace aggregates many sellers under a single merchant account, simplifying seller onboarding.' },
          { term: 'Push-to-Card', definition: 'Instant payout via Visa Direct or Mastercard Send that delivers funds to a seller\'s debit card within minutes.' },
          { term: 'Seller Onboarding', definition: 'The KYC/KYB process of verifying seller identity and legitimacy before allowing them to receive payments.' },
          { term: 'Money Transmission License', definition: 'A US state-level license required to hold or transmit funds on behalf of others — a major compliance requirement for marketplaces.' },
          { term: 'Ledger', definition: 'An internal accounting system that tracks every dollar across seller balances, platform fees, held funds, and payouts.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
      {
        type: 'quiz',
        questionIndex: 1,
      },
    ],
  },

  // ─── ACCEPTANCE ENVIRONMENTS ──────────────────────────────────────
  {
    topicSlug: 'acceptance-environments',
    topicTitle: 'Acceptance Environments',
    theme: 'Foundations',
    slides: [
      {
        type: 'intro',
        title: 'Acceptance Environments',
        description:
          'POS terminals, online checkouts, mobile wallets — the different ways merchants accept card payments, and why each comes with different rules, risks, and costs.',
        objectives: [
          'Distinguish card-present (CP) from card-not-present (CNP) transactions',
          'Understand the three generations of in-store technology: magnetic stripe, EMV chip, and contactless NFC',
          'Learn why CNP transactions have higher fraud rates and interchange costs',
          'Know how tokenization and 3D Secure reduce risk in different acceptance environments',
        ],
      },
      {
        type: 'concept',
        label: 'The Big Idea',
        title: 'Not All Card Payments Are Equal',
        content: `<p>Tapping your phone at a coffee shop and typing your card number into an online checkout are both "paying by card." But from the payments system's perspective, they are <strong>fundamentally different</strong>.</p>
<p>The <strong>acceptance environment</strong> — how a card payment is captured — determines:</p>
<ul>
  <li>The <strong>fraud rate</strong> of the transaction</li>
  <li>The <strong>interchange cost</strong> the merchant pays</li>
  <li>The <strong>security mechanism</strong> protecting the payment</li>
  <li><strong>Who bears the loss</strong> if fraud occurs</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'Card-Present',
        title: 'The Physical World: Swipe, Dip, Tap',
        content: `<p>Card-present transactions happen when the physical card (or device) is at the point of sale. Three generations of technology:</p>
<ul>
  <li><strong>Magnetic stripe (swipe)</strong> — Static data that never changes. Easy to clone with a skimmer. Being phased out by 2033</li>
  <li><strong>EMV chip (dip)</strong> — Generates a <strong>unique cryptogram</strong> for each transaction. Reduced US counterfeit fraud by 75%+</li>
  <li><strong>Contactless NFC (tap)</strong> — Same security as EMV but under 1 second. Adoption exploded during COVID-19</li>
</ul>
<div class="slide-callout">EMV was enforced via a liability shift: merchants without chip terminals bear fraud losses for counterfeit chip cards.</div>`,
      },
      {
        type: 'concept',
        label: 'Card-Not-Present',
        title: 'The Digital World: Online, Phone, In-App',
        content: `<p>Card-not-present (CNP) transactions happen when card details are provided remotely — online checkout, phone orders, in-app payments, or recurring billing.</p>
<p>The critical difference: <strong>fraud rates are dramatically higher</strong> for CNP transactions. Over <strong>70% of all card fraud losses</strong> come from CNP, even though CNP is a smaller share of total volume.</p>
<p>CNP channels include:</p>
<ul>
  <li><strong>E-commerce</strong> — Customer types card number into a payment form</li>
  <li><strong>MOTO</strong> — Mail order / telephone order (the original CNP channel)</li>
  <li><strong>In-app / recurring</strong> — Stored card charged without re-entry (Uber, Netflix)</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'Security',
        title: 'Tokenization and 3D Secure',
        content: `<p><strong>Tokenization</strong> replaces your real card number with a device-specific or merchant-specific token. If a database is breached, stolen tokens are useless elsewhere. Tokenized transactions get <strong>lower interchange</strong> and <strong>higher approval rates</strong>.</p>
<p><strong>3D Secure (3DS 2.0)</strong> adds authentication for online payments. It analyzes dozens of data points and only challenges suspicious transactions. The key benefit:</p>
<div class="slide-callout">When a transaction is authenticated via 3D Secure, <strong>fraud liability shifts from the merchant to the issuer</strong> — the same concept as the EMV liability shift but for online payments.</div>`,
      },
      {
        type: 'concept',
        label: 'Liability',
        title: 'Who Pays When Fraud Happens?',
        content: `<p>The acceptance environment determines the liability framework:</p>
<ul>
  <li><strong>EMV chip (card-present)</strong> — Issuer bears liability. Cryptographic authentication is strong</li>
  <li><strong>No EMV terminal</strong> — Merchant bears liability (they chose not to upgrade)</li>
  <li><strong>CNP without 3D Secure</strong> — Merchant bears liability for chargebacks</li>
  <li><strong>CNP with 3D Secure</strong> — Issuer bears liability (they verified the cardholder)</li>
  <li><strong>Mobile wallets (Apple Pay)</strong> — Lowest fraud rates of any method. Issuer bears liability</li>
</ul>`,
      },
      {
        type: 'diagram',
        label: 'Risk Spectrum',
        title: 'Fraud Risk by Acceptance Environment',
        mermaidCode: `graph LR
    subgraph Low["Lower Risk / Lower Cost"]
      A[EMV Chip Dip]
      B[Contactless NFC Tap]
      C[Mobile Wallet<br/>Apple Pay / Google Pay]
    end
    subgraph Med["Medium Risk"]
      D[MOTO<br/>Phone / Mail Order]
      E[Recurring Billing]
    end
    subgraph High["Higher Risk / Higher Cost"]
      F[E-Commerce<br/>Manual Card Entry]
      G[Card on File<br/>No Authentication]
    end
    A --> D
    B --> D
    C --> D
    D --> F
    E --> F`,
        caption: 'Fraud risk and interchange cost increase as you move from card-present to card-not-present environments.',
      },
      {
        type: 'terms',
        terms: [
          { term: 'Card-Present (CP)', definition: 'A transaction where the physical card is present at the point of sale — chip dip, contactless tap, or magnetic stripe swipe.' },
          { term: 'Card-Not-Present (CNP)', definition: 'A transaction where the card is not physically present — online purchases, phone orders, in-app payments.' },
          { term: 'EMV', definition: 'The chip card standard (Europay/Mastercard/Visa) that generates unique cryptograms per transaction, reducing counterfeit fraud.' },
          { term: 'NFC', definition: 'Near-Field Communication — the wireless technology behind contactless tap-to-pay using cards or mobile wallets.' },
          { term: 'Tokenization', definition: 'Replacing the actual card number with a unique token for each device or merchant, reducing data breach risk.' },
          { term: 'PCI DSS', definition: 'Payment Card Industry Data Security Standard — security requirements for any entity that stores or transmits card data.' },
          { term: '3D Secure', definition: 'An authentication protocol for online card payments that shifts fraud liability from merchant to issuer when used.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
      {
        type: 'quiz',
        questionIndex: 1,
      },
    ],
  },

  // ─── CRYPTO & DEFI ────────────────────────────────────────────────
  {
    topicSlug: 'crypto-and-defi',
    topicTitle: 'Crypto & DeFi',
    theme: 'Non-Card Payments',
    slides: [
      {
        type: 'intro',
        title: 'Crypto & DeFi',
        description:
          'Bitcoin, stablecoins, and decentralized finance — how cryptocurrency intersects with the traditional payments ecosystem, and where it actually matters.',
        objectives: [
          'Understand why Bitcoin has limitations as an everyday payment method',
          'Learn how stablecoins solve the volatility problem and enable real payment use cases',
          'Know what smart contracts and DeFi bring to payments (programmable money)',
          'Understand how crypto-to-fiat cards bridge digital assets and traditional card rails',
        ],
      },
      {
        type: 'concept',
        label: 'Bitcoin Limits',
        title: 'Bitcoin as a Payment Method',
        content: `<p>Bitcoin was designed as "peer-to-peer electronic cash," but it has <strong>significant limitations</strong> for everyday payments:</p>
<ul>
  <li><strong>Speed</strong> — 10 minutes per block, 20-60 minutes for confirmation vs 2 seconds for a card</li>
  <li><strong>Cost</strong> — Fees fluctuate from $0.50 to $50+ during congestion</li>
  <li><strong>Volatility</strong> — Price can swing 5-10% in a single day</li>
  <li><strong>Irreversibility</strong> — No chargebacks, good for merchants but risky for consumers</li>
</ul>
<div class="slide-callout">The <strong>Lightning Network</strong> (a layer-2 protocol) addresses speed and cost — enabling near-instant, near-free transactions off-chain.</div>`,
      },
      {
        type: 'concept',
        label: 'Stablecoins',
        title: 'The Bridge Between Crypto and Fiat',
        content: `<p>Stablecoins are where crypto becomes genuinely useful for payments. They maintain a <strong>1:1 peg with a fiat currency</strong> (usually USD).</p>
<p>The two dominant stablecoins:</p>
<ul>
  <li><strong>USDT (Tether)</strong> — Most widely traded, market cap over $100 billion</li>
  <li><strong>USDC (Circle)</strong> — Regulated US company, reserves in Treasury securities with third-party attestations</li>
</ul>
<p>Real-world use cases:</p>
<ul>
  <li><strong>Cross-border remittances</strong> — $500 transfer costs under $1, arrives in minutes (vs $15-25 and days via traditional rails)</li>
  <li><strong>B2B settlement</strong> — Faster, cheaper cross-border supplier payments</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'Smart Contracts',
        title: 'Programmable Money',
        content: `<p>Smart contracts are self-executing programs on a blockchain that automatically enforce agreement terms. For payments, they introduce a genuinely new capability:</p>
<ul>
  <li><strong>Escrow without an escrow agent</strong> — Hold funds until both parties confirm completion</li>
  <li><strong>Automated revenue splitting</strong> — 70% to creator, 20% to platform, 10% to contributor — on every transaction, in real time</li>
  <li><strong>Conditional payments</strong> — Release payment only when a shipment shows delivered</li>
</ul>
<div class="slide-callout">These capabilities have no direct equivalents in traditional payment systems, where splitting, escrow, and conditional release all require manual processes.</div>`,
      },
      {
        type: 'concept',
        label: 'Crypto Cards',
        title: 'Where Crypto Meets Traditional Payments',
        content: `<p>The most practical intersection today is <strong>crypto-to-fiat cards</strong> from Coinbase, Crypto.com, and others.</p>
<p>How they work:</p>
<ul>
  <li>User taps their Visa/Mastercard at a merchant</li>
  <li>Card provider <strong>sells crypto from the user's account</strong> and converts to fiat</li>
  <li>Transaction settles through <strong>normal card network rails</strong></li>
  <li>Merchant receives dollars — never touches crypto</li>
</ul>
<div class="slide-callout">This model uses crypto as a funding source but does not change the underlying payment rails. The transaction still flows through Visa, acquirers, and issuers.</div>`,
      },
      {
        type: 'diagram',
        label: 'Comparison',
        title: 'Traditional vs Stablecoin Cross-Border Payment',
        mermaidCode: `graph TD
    subgraph Traditional["Traditional Cross-Border"]
      A1[Sender Bank] --> A2[Correspondent Bank 1]
      A2 --> A3[Correspondent Bank 2]
      A3 --> A4[Receiver Bank]
      A4 --> A5["3-5 days, $25-50 fees"]
    end
    subgraph Stablecoin["Stablecoin Transfer"]
      B1[Sender buys USDC] --> B2[Sends on blockchain]
      B2 --> B3[Receiver gets USDC]
      B3 --> B4["Minutes, under $1 fee"]
    end`,
        caption: 'Cross-border payments via traditional correspondent banking vs stablecoin transfer: dramatically different in speed and cost.',
      },
      {
        type: 'terms',
        terms: [
          { term: 'Stablecoin', definition: 'A cryptocurrency pegged to a fiat currency (like USDC or USDT) — designed to maintain stable value for payments use.' },
          { term: 'Smart Contract', definition: 'Self-executing code on a blockchain that automatically enforces agreement terms — the building block of DeFi.' },
          { term: 'Lightning Network', definition: 'A layer-2 protocol on top of Bitcoin enabling near-instant, low-fee transactions by processing off-chain.' },
          { term: 'DeFi', definition: 'Decentralized Finance — financial services (lending, trading, payments) built on blockchain without traditional intermediaries.' },
          { term: 'CBDC', definition: 'Central Bank Digital Currency — a digital currency issued by a central bank, combining blockchain efficiency with government trust.' },
          { term: 'Crypto-to-Fiat Card', definition: 'A Visa or Mastercard linked to a crypto account that converts digital assets to fiat at the moment of purchase.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
      {
        type: 'quiz',
        questionIndex: 1,
      },
    ],
  },

  // ─── CASH & ATM ───────────────────────────────────────────────────
  {
    topicSlug: 'cash-and-atm',
    topicTitle: 'Cash & ATM Transactions',
    theme: 'Non-Card Payments',
    slides: [
      {
        type: 'intro',
        title: 'Cash & ATM Transactions',
        description:
          'Cash is not dead — how cash payments, ATM networks, and cash-based digital payment methods still serve billions of people worldwide.',
        objectives: [
          'Understand why cash persists despite digital payment growth',
          'Learn how ATM networks work, including reverse interchange and surcharge-free networks',
          'Know the role of cash-on-delivery and cash vouchers (Boleto) in emerging markets',
          'See how cash top-ups bridge the cash economy to the digital economy',
        ],
      },
      {
        type: 'concept',
        label: 'Still Alive',
        title: 'Cash Is Far From Dead',
        content: `<p>In developed markets, the narrative is that cash is dying. But the global picture is very different:</p>
<ul>
  <li><strong>1.4 billion adults</strong> worldwide remain unbanked — no bank account, no card, no wallet</li>
  <li>In India, cash is over <strong>60% of consumer transactions</strong> by volume</li>
  <li>In the US, cash is still the most common method for transactions <strong>under $10</strong></li>
  <li>Cash accounts for roughly <strong>20% of all US transactions</strong> — remarkably stable</li>
</ul>
<div class="slide-callout">Cash requires no infrastructure, no internet, no bank account, no electricity. For billions of people, it is the only option.</div>`,
      },
      {
        type: 'concept',
        label: 'ATM Networks',
        title: 'How ATM Withdrawals Work',
        content: `<p>When you use an ATM that is not your bank's, a network of relationships makes it work:</p>
<ul>
  <li><strong>Plus</strong> (Visa) and <strong>Cirrus</strong> (Mastercard) are the global ATM networks</li>
  <li>The economics are the <strong>opposite</strong> of card purchases: the cardholder's bank pays the ATM owner (<strong>reverse interchange</strong>)</li>
  <li>The ATM operator may also charge a <strong>surcharge</strong> ($2-3) directly to the consumer</li>
  <li>Your issuing bank may add its own out-of-network fee on top</li>
</ul>
<div class="slide-callout">Neobanks like Chime and Varo partner with surcharge-free networks (Allpoint: 45,000 ATMs, MoneyPass: 32,000) to offer fee-free cash access.</div>`,
      },
      {
        type: 'concept',
        label: 'Emerging Markets',
        title: 'Cash-on-Delivery and Boleto',
        content: `<p><strong>Cash-on-Delivery (COD)</strong> remains critical in emerging market e-commerce:</p>
<ul>
  <li>In India, COD was ~50% of e-commerce orders (UPI is reducing this)</li>
  <li>In Saudi Arabia and Egypt, COD is the dominant online payment method</li>
  <li>Reason: consumers do not trust prepaying for goods they have not seen</li>
</ul>
<p><strong>Boleto Bancario</strong> (Brazil) bridges digital commerce and cash:</p>
<ul>
  <li>Consumer generates a voucher online, then pays at a bank branch or convenience store in cash</li>
  <li>Processes billions of transactions annually despite the growth of Pix</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'Cash Top-Ups',
        title: 'Bridging Cash and Digital',
        content: `<p>Cash top-ups are the on-ramp connecting the cash economy to the digital economy:</p>
<ul>
  <li><strong>M-PESA agents</strong> — 600,000+ locations in East Africa where consumers hand over cash to credit a mobile wallet</li>
  <li><strong>Japan konbini</strong> — Convenience stores where consumers pay for online purchases with cash</li>
  <li><strong>OXXO (Mexico)</strong> — 20,000+ stores where consumers pay bills, top up wallets, and settle e-commerce orders in cash</li>
</ul>
<div class="slide-callout">Without cash-in points, billions of people who earn in cash would be locked out of digital services entirely.</div>`,
      },
      {
        type: 'diagram',
        label: 'ATM Flow',
        title: 'ATM Withdrawal Transaction Flow',
        mermaidCode: `sequenceDiagram
    participant CH as Cardholder
    participant ATM as ATM Operator
    participant NET as ATM Network<br/>Plus / Cirrus
    participant ISS as Issuing Bank
    CH->>ATM: Insert card, request $200
    ATM->>NET: Route withdrawal request
    NET->>ISS: Forward to cardholder bank
    ISS->>ISS: Check balance, approve
    ISS-->>NET: Approval + settlement
    Note over ISS,ATM: Reverse interchange: issuer pays ATM owner
    NET-->>ATM: Dispense authorized
    ATM->>CH: Cash dispensed
    Note over CH,ATM: Consumer may also pay surcharge fee`,
        caption: 'ATM withdrawal flow: unlike card purchases, the issuing bank pays the ATM owner (reverse interchange).',
      },
      {
        type: 'terms',
        terms: [
          { term: 'Reverse Interchange', definition: 'In ATM transactions, the issuing bank pays the ATM owner — the opposite direction of card purchase interchange.' },
          { term: 'ATM Network', definition: 'Networks like Plus (Visa), Cirrus (Mastercard), MoneyPass, and Allpoint that enable cross-bank ATM access.' },
          { term: 'Cash-on-Delivery (COD)', definition: 'A payment method where consumers pay in cash when goods are delivered — still common in emerging market e-commerce.' },
          { term: 'Boleto Bancario', definition: 'A Brazilian payment method where consumers generate a voucher online and pay at banks or convenience stores in cash.' },
          { term: 'Surcharge-Free Network', definition: 'ATM networks (Allpoint, MoneyPass) where consumers can withdraw cash without paying a surcharge fee.' },
          { term: 'M-PESA', definition: 'A mobile money service in East Africa with 600,000+ agent locations that bridge cash and digital wallets.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
      {
        type: 'quiz',
        questionIndex: 1,
      },
    ],
  },

  // ─── ELECTRONIC MONEY INSTITUTIONS ────────────────────────────────
  {
    topicSlug: 'electronic-money-institutions',
    topicTitle: 'Electronic Money Institutions (EMIs)',
    theme: 'Products & Use Cases',
    slides: [
      {
        type: 'intro',
        title: 'Electronic Money Institutions (EMIs)',
        description:
          'What EMIs are, how they differ from banks, and why they matter as the regulatory backbone of digital payments and neobanking in Europe and beyond.',
        objectives: [
          'Understand what electronic money is and how it differs from a bank deposit',
          'Know what EMIs can and cannot do compared to banks',
          'Learn how safeguarding protects customer funds without deposit insurance',
          'See why EMIs are the launchpad for fintechs like Revolut, Wise, and Monzo',
          'Understand the EMI licensing process and the upcoming PSD3 changes',
        ],
      },
      {
        type: 'concept',
        label: 'What Is an EMI?',
        title: 'The License Behind the Fintech Revolution',
        content: `<p>An <strong>Electronic Money Institution (EMI)</strong> is a regulated entity authorized to issue electronic money — a digital representation of fiat currency stored electronically.</p>
<p>When you load funds into a Revolut account or top up a PayPal balance in Europe, that money becomes <strong>e-money</strong>. It is denominated in real currency, can be used for payments, and can be transferred.</p>
<div class="slide-callout">The critical distinction: <strong>e-money is not a bank deposit</strong>. It is a claim on the issuer, not protected by deposit insurance. Think of it as a regulated prepaid account at massive scale.</div>`,
      },
      {
        type: 'concept',
        label: 'Can vs Cannot',
        title: 'What EMIs Can and Cannot Do',
        content: `<p><strong>EMIs can:</strong></p>
<ul>
  <li>Issue e-money (wallets, prepaid cards, stored-value accounts)</li>
  <li>Provide payment services (transfers, remittances)</li>
  <li>Issue debit cards, virtual cards, and virtual IBANs</li>
  <li>Offer multi-currency accounts and FX services</li>
</ul>
<p><strong>EMIs cannot:</strong></p>
<ul>
  <li><strong>Accept deposits</strong> in the legal banking sense</li>
  <li><strong>Lend money</strong> or extend credit (the biggest limitation)</li>
  <li><strong>Pay interest</strong> on e-money balances</li>
  <li><strong>Use customer funds</strong> for their own operations</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'EMI vs Bank',
        title: 'Three Types of Licensed Entities',
        content: `<p>The payments landscape has three tiers of regulation:</p>
<ul>
  <li><strong>Banks</strong> — Full license. Can lend, pay interest, accept insured deposits. Capital: 5M+ euros. Timeline: 12-36 months</li>
  <li><strong>EMIs</strong> — Middle ground. Issue e-money and payment services, but no lending. Capital: 350K euros. Timeline: 6-15 months</li>
  <li><strong>Payment Institutions (PIs)</strong> — Lightest. Payment services only, cannot hold funds beyond transaction execution. Capital: 20K-125K euros</li>
</ul>
<div class="slide-callout">The trade-off: EMIs are faster and cheaper to launch but cannot generate revenue from lending — the primary profit engine of banking.</div>`,
      },
      {
        type: 'concept',
        label: 'Safeguarding',
        title: 'How EMIs Protect Your Money',
        content: `<p>Since e-money is not covered by deposit insurance, the entire framework for protecting customer funds rests on <strong>safeguarding</strong>.</p>
<p>Three permitted methods:</p>
<ul>
  <li><strong>Segregation</strong> (most common) — Customer funds deposited in a ring-fenced account at a separate bank by T+1</li>
  <li><strong>Insurance or guarantee</strong> — A policy or bank guarantee covering the full value</li>
  <li><strong>Low-risk asset investment</strong> — Funds invested in government bonds or liquid instruments</li>
</ul>
<p>Universal requirements: <strong>100% backing</strong> (no fractional reserve), <strong>daily reconciliation</strong>, and <strong>annual audit</strong>.</p>`,
      },
      {
        type: 'concept',
        label: 'Notable EMIs',
        title: 'The Biggest Names Started Here',
        content: `<p>Many of the most prominent fintechs operate (or started) as EMIs:</p>
<ul>
  <li><strong>Revolut</strong> — EMI license from Lithuania (2018), served 40M+ customers before getting UK banking license in 2024</li>
  <li><strong>Wise</strong> — Deliberately chose to remain an EMI; multi-billion-dollar business without a banking license</li>
  <li><strong>Monzo</strong> — Launched as EMI in 2016, obtained UK banking license in 2017</li>
  <li><strong>Stripe & PayPal</strong> — Hold EMI licenses in Europe to power their payment platforms</li>
</ul>
<div class="slide-callout">The EMI license created the regulatory space for an entire generation of fintech innovation.</div>`,
      },
      {
        type: 'diagram',
        label: 'Safeguarding',
        title: 'EMI Safeguarding Flow',
        mermaidCode: `graph LR
    A[Customer loads funds] --> B[EMI receives funds]
    B --> C[Issues e-money to customer]
    B --> D[Deposits funds by T+1]
    D --> E[Segregated Account<br/>at Partner Bank]
    E --> F[Ring-fenced from<br/>EMI creditors]
    E --> G[Daily reconciliation<br/>1:1 backing]
    B -.- H[EMI Corporate Funds<br/>Completely Separate]`,
        caption: 'Customer funds are deposited into a segregated account at a partner bank, ring-fenced from the EMI operations. The EMI cannot use customer money for corporate purposes.',
      },
      {
        type: 'terms',
        terms: [
          { term: 'Electronic Money (E-Money)', definition: 'A digital representation of fiat currency stored electronically — a claim on the issuer, not a bank deposit.' },
          { term: 'Safeguarding', definition: 'The requirement for EMIs to hold 100% of e-money value in segregated accounts, ring-fenced from the EMI\'s own operations and creditors.' },
          { term: 'EMD2', definition: 'The second Electronic Money Directive (2009) — the EU regulation that established the framework for EMIs.' },
          { term: 'Small EMI', definition: 'A lighter-weight registration for firms with under 5M euros in outstanding e-money — lower capital but no cross-border passporting.' },
          { term: 'Passporting', definition: 'The ability for an EU-licensed EMI to offer services across all 30 EEA countries without separate licenses in each.' },
          { term: 'PSD3', definition: 'The upcoming EU regulation that will merge EMI and Payment Institution licenses into a single unified authorization framework.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
    ],
  },

  // ─── CREDIT CARD AS A SERVICE ─────────────────────────────────────
  {
    topicSlug: 'credit-card-as-a-service',
    topicTitle: 'Credit Card as a Service (CCaaS)',
    theme: 'Products & Use Cases',
    slides: [
      {
        type: 'intro',
        title: 'Credit Card as a Service (CCaaS)',
        description:
          'How fintech platforms enable any brand to launch a co-branded credit card — from the history of co-brands to modern API-driven card programs.',
        objectives: [
          'Understand the traditional co-branded credit card model and its limitations',
          'Learn how CCaaS makes credit card issuance modular and API-driven',
          'Know how CCaaS differs from BaaS and debit card platforms',
          'See the market opportunity and ethical considerations of expanding credit access',
        ],
      },
      {
        type: 'concept',
        label: 'Co-Brand Basics',
        title: 'How Co-Branded Credit Cards Work',
        content: `<p>A co-branded card involves three parties:</p>
<ul>
  <li><strong>The brand</strong> (Delta, Amazon, Costco) — provides its name, customers, and loyalty program</li>
  <li><strong>The issuing bank</strong> (Amex, Synchrony, Citi) — extends credit, manages risk, handles compliance</li>
  <li><strong>The card network</strong> (Visa, Mastercard) — provides the acceptance infrastructure</li>
</ul>
<p>The economics center on <strong>interchange revenue sharing</strong>. When the card is swiped, the issuing bank earns interchange and shares a portion with the brand partner.</p>
<div class="slide-callout">American Express reportedly pays Delta roughly <strong>$7 billion per year</strong> in revenue sharing — more than Delta earns from economy-class seats.</div>`,
      },
      {
        type: 'concept',
        label: 'The Problem',
        title: 'Why the Legacy Model Is Broken',
        content: `<p>Traditional co-brand programs have significant limitations:</p>
<ul>
  <li><strong>Rebuilds from scratch each time</strong> — Each new brand partner requires custom integration and compliance setup</li>
  <li><strong>Fragmented experience</strong> — Customers manage cards on a separate bank portal, disconnected from the brand</li>
  <li><strong>Long timelines</strong> — 12-24 months to launch a program</li>
  <li><strong>High entry bar</strong> — Traditional issuers (Synchrony, Comenity) only want partners with massive customer bases</li>
</ul>
<div class="slide-callout">If you are a mid-market SaaS platform with 50,000 users, you are too small for the legacy co-brand model. CCaaS changes that.</div>`,
      },
      {
        type: 'concept',
        label: 'What CCaaS Changes',
        title: 'API-Driven Credit Card Issuance',
        content: `<p>CCaaS makes card issuance <strong>modular, API-driven, and accessible</strong> to a much wider range of brands:</p>
<ul>
  <li><strong>API integration</strong> — Card applications, account management, rewards — all programmable. Pilot in weeks, not years</li>
  <li><strong>Modular infrastructure</strong> — Built once, configured many times. Adding a new brand does not rebuild compliance</li>
  <li><strong>Brand controls the experience</strong> — Application and management live in the brand's own app. Consumer never leaves</li>
  <li><strong>Faster launch</strong> — Some providers advertise 8-12 weeks for a basic program</li>
</ul>`,
      },
      {
        type: 'concept',
        label: 'CCaaS vs BaaS',
        title: 'Why Credit Is Different From Debit',
        content: `<p>Most BaaS platforms (Marqeta, Stripe Issuing) focus on <strong>debit and prepaid cards</strong> that draw from funded accounts. Credit cards are fundamentally different:</p>
<ul>
  <li><strong>Capital requirements</strong> — Someone must fund the loans when consumers carry balances</li>
  <li><strong>Underwriting</strong> — Deciding who qualifies, at what limit and APR, requires credit modeling and portfolio management</li>
  <li><strong>Heavy regulation</strong> — Truth in Lending (TILA), Regulation Z, fair lending, credit reporting obligations</li>
</ul>
<div class="slide-callout">CCaaS is not just card-issuing infrastructure. It is the <strong>full stack of credit issuance</strong>: capital, underwriting, compliance, and processing bundled into an API-accessible platform.</div>`,
      },
      {
        type: 'concept',
        label: 'Ethics',
        title: 'More Credit Is Not Always Better',
        content: `<p>Any honest discussion of CCaaS must address the risks:</p>
<ul>
  <li>~37% of Americans carry a credit card balance at <strong>20%+ APR</strong></li>
  <li>Total US credit card debt exceeds <strong>$1 trillion</strong></li>
  <li>More card programs could mean more opportunities for consumers to take on unmanageable debt</li>
</ul>
<p>But there is a counter-argument: <strong>alternative underwriting</strong> can extend credit to immigrants, young adults, and gig workers excluded by traditional FICO scores — using cash flow, employment, and platform data instead.</p>
<div class="slide-callout">The technology exists. Whether it serves consumers or extracts value from them depends on the choices of platforms and regulators.</div>`,
      },
      {
        type: 'diagram',
        label: 'Architecture',
        title: 'CCaaS Architecture',
        mermaidCode: `graph LR
    A[Brand / Platform] -->|APIs| B[CCaaS Provider]
    B -->|Program Management| C[Sponsor Bank]
    C -->|BIN + Settlement| D[Card Network<br/>Visa / Mastercard]
    B --- E[Underwriting Engine]
    B --- F[Compliance and KYC]
    B --- G[Card Management APIs]
    B --- H[Rewards and Loyalty]`,
        caption: 'The brand integrates via APIs while the CCaaS provider manages bank relationships, underwriting, compliance, and network connectivity.',
      },
      {
        type: 'terms',
        terms: [
          { term: 'Credit Card as a Service (CCaaS)', definition: 'A fintech model providing the infrastructure, bank partnerships, underwriting, and compliance for non-bank brands to launch credit card programs via APIs.' },
          { term: 'Co-Branded Card', definition: 'A credit card carrying both a payment network logo and a partner brand\'s logo, with rewards tied to the brand ecosystem.' },
          { term: 'White-Label Card', definition: 'A card product built by one company but branded and distributed by another, with the provider invisible to the consumer.' },
          { term: 'Alternative Underwriting', definition: 'Credit assessment beyond FICO scores — using transaction history, platform activity, or cash flow to evaluate risk.' },
          { term: 'Sponsor Bank', definition: 'A licensed bank that provides the banking charter, BIN range, and regulatory backing for a CCaaS program.' },
          { term: 'Interchange Revenue Sharing', definition: 'The economic model where the issuing bank shares a portion of merchant interchange fees with the co-brand partner.' },
        ],
      },
      {
        type: 'quiz',
        questionIndex: 0,
      },
    ],
  },
];

const microLessonsBySlug = new Map(microLessons.map((ml) => [ml.topicSlug, ml]));

export function getMicroLessonBySlug(slug: string): TopicMicroLesson | undefined {
  return microLessonsBySlug.get(slug);
}

export function getAllMicroLessonSlugs(): string[] {
  return Array.from(microLessonsBySlug.keys());
}

export function getAllMicroLessons(): TopicMicroLesson[] {
  return microLessons;
}
