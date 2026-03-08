export interface PathStep {
  slug: string;
  title: string;
  readingTime: string;
}

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  numeral: string; // Roman numeral
  icon: string; // SVG path data for a small icon
  steps: PathStep[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'how-a-payment-works',
    title: 'How a Payment Works',
    subtitle: 'The fundamentals',
    description: 'Follow a payment from the moment a card is swiped to when money lands in the merchant\'s account. You\'ll understand every player, every step, and every fee.',
    difficulty: 'Beginner',
    estimatedMinutes: 57,
    numeral: 'I',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', // layers icon
    steps: [
      { slug: 'anatomy-of-a-swipe', title: 'Anatomy of a Swipe', readingTime: '8 min' },
      { slug: 'payments-ecosystem-overview', title: 'The Payments Ecosystem', readingTime: '7 min' },
      { slug: 'authorization', title: 'Authorization', readingTime: '8 min' },
      { slug: 'clearing-and-settlement', title: 'Clearing & Settlement', readingTime: '7 min' },
      { slug: 'card-networks', title: 'Card Networks', readingTime: '8 min' },
      { slug: 'interchange-fees', title: 'Interchange Fees', readingTime: '9 min' },
      { slug: 'chargebacks-and-disputes', title: 'Chargebacks & Disputes', readingTime: '9 min' },
    ],
  },
  {
    id: 'cards-and-infrastructure',
    title: 'Cards & Infrastructure',
    subtitle: 'The machinery',
    description: 'Dive into the technology and business models behind card payments — processors, card types, virtual cards, and how modern platforms enable anyone to issue cards.',
    difficulty: 'Intermediate',
    estimatedMinutes: 70,
    numeral: 'II',
    icon: 'M3 10h18M3 6h18M3 14h18M3 18h18', // server/stack icon approx
    steps: [
      { slug: 'credit-cards-vs-debit-cards', title: 'Credit Cards vs. Debit Cards', readingTime: '11 min' },
      { slug: 'acceptance-environments', title: 'Acceptance Environments', readingTime: '7 min' },
      { slug: 'acquirer-processors', title: 'Acquirer Processors', readingTime: '7 min' },
      { slug: 'issuer-processors', title: 'Issuer Processors', readingTime: '12 min' },
      { slug: 'virtual-cards', title: 'Virtual Cards', readingTime: '6 min' },
      { slug: 'credit-card-as-a-service', title: 'Credit Card as a Service', readingTime: '10 min' },
      { slug: 'embedded-finance', title: 'Embedded Finance & BaaS', readingTime: '10 min' },
      { slug: 'expense-management', title: 'Expense Management', readingTime: '7 min' },
    ],
  },
  {
    id: 'beyond-cards',
    title: 'Beyond Cards',
    subtitle: 'Alternative rails',
    description: 'Not everything runs on Visa and Mastercard. Explore bank transfers, real-time payments, digital wallets, BNPL, open banking, and crypto — the expanding universe of non-card payments.',
    difficulty: 'Intermediate',
    estimatedMinutes: 79,
    numeral: 'III',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // shield/globe path
    steps: [
      { slug: 'bank-based-payments', title: 'Bank-Based Payments', readingTime: '9 min' },
      { slug: 'real-time-payments', title: 'Real-Time Payments', readingTime: '9 min' },
      { slug: 'cross-border-payments', title: 'Cross-Border Payments', readingTime: '9 min' },
      { slug: 'digital-wallets', title: 'Digital Wallets', readingTime: '8 min' },
      { slug: 'buy-now-pay-later', title: 'Buy Now, Pay Later', readingTime: '10 min' },
      { slug: 'open-banking', title: 'Open Banking', readingTime: '18 min' },
      { slug: 'push-to-card', title: 'Push-to-Card', readingTime: '6 min' },
      { slug: 'crypto-and-defi', title: 'Crypto & DeFi', readingTime: '6 min' },
      { slug: 'cash-and-atm', title: 'Cash & ATM', readingTime: '5 min' },
    ],
  },
  {
    id: 'trust-and-regulation',
    title: 'Trust & Regulation',
    subtitle: 'The guardrails',
    description: 'Payments only work because people trust them. Learn how identity verification, fraud prevention, licensing, compliance, and the rise of neobanks and EMIs keep the system honest.',
    difficulty: 'Advanced',
    estimatedMinutes: 78,
    numeral: 'IV',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', // shield
    steps: [
      { slug: 'kyc-and-identity', title: 'KYC & Identity Verification', readingTime: '7 min' },
      { slug: 'fraud-and-risk', title: 'Fraud & Risk', readingTime: '8 min' },
      { slug: 'liability', title: 'Liability', readingTime: '6 min' },
      { slug: 'compliance-and-regulation', title: 'Compliance & Regulation', readingTime: '9 min' },
      { slug: 'electronic-money-institutions', title: 'Electronic Money Institutions', readingTime: '12 min' },
      { slug: 'neobanking', title: 'Neobanking & Digital Banking', readingTime: '11 min' },
      { slug: 'marketplaces', title: 'Marketplaces', readingTime: '8 min' },
      { slug: 'b2b-payments', title: 'B2B Payments', readingTime: '7 min' },
      { slug: 'subscriptions-and-recurring', title: 'Subscriptions & Recurring', readingTime: '8 min' },
    ],
  },
];

// Quick-start mini path (subset of Path I)
export const quickStart: LearningPath = {
  id: 'quick-start',
  title: 'Quick Start',
  subtitle: 'The essentials in 22 minutes',
  description: 'Short on time? These three articles give you the core mental model for how payments work.',
  difficulty: 'Beginner',
  estimatedMinutes: 22,
  numeral: '\u2192',
  icon: 'M13 7l5 5m0 0l-5 5m5-5H6', // arrow right
  steps: [
    { slug: 'anatomy-of-a-swipe', title: 'Anatomy of a Swipe', readingTime: '8 min' },
    { slug: 'payments-ecosystem-overview', title: 'The Payments Ecosystem', readingTime: '7 min' },
    { slug: 'card-networks', title: 'Card Networks', readingTime: '8 min' },
  ],
};

export function getPathForSlug(slug: string): { path: LearningPath; stepIndex: number } | null {
  for (const path of learningPaths) {
    const stepIndex = path.steps.findIndex(s => s.slug === slug);
    if (stepIndex !== -1) return { path, stepIndex };
  }
  return null;
}

export function getTotalReadingTime(): number {
  return learningPaths.reduce((sum, p) => sum + p.estimatedMinutes, 0);
}
