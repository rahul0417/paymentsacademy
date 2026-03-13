export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicQuiz {
  topicSlug: string;
  topicTitle: string;
  theme: string;
  questions: QuizQuestion[];
}

const quizzes: TopicQuiz[] = [
  {
    topicSlug: 'anatomy-of-a-swipe',
    topicTitle: 'Anatomy of a Swipe',
    theme: 'Foundations',
    questions: [
      {
        id: 'anatomy-of-a-swipe-q1',
        question: 'What happens during the authorization phase of a card payment?',
        options: [
          'Money is transferred from the cardholder\'s bank to the merchant\'s bank',
          'A hold is placed on funds but no money actually moves',
          'The merchant\'s bank collects interchange fees',
          'The card network verifies the merchant\'s identity',
        ],
        correctIndex: 1,
        explanation: 'Authorization is just a hold — no money moves. The issuer ring-fences the amount in your account (shown as "pending"), but actual fund transfer happens later during settlement.',
      },
      {
        id: 'anatomy-of-a-swipe-q2',
        question: 'What are the three acts of a card transaction, in order?',
        options: [
          'Clearing, Authorization, Settlement',
          'Authorization, Settlement, Clearing',
          'Authorization, Clearing, Settlement',
          'Verification, Authorization, Transfer',
        ],
        correctIndex: 2,
        explanation: 'Every card transaction follows three acts: Authorization (the real-time approval), Clearing (end-of-day confirmation of final amounts), and Settlement (actual money movement, usually next business day).',
      },
      {
        id: 'anatomy-of-a-swipe-q3',
        question: 'What is the BIN used for in a card transaction?',
        options: [
          'Encrypting the transaction data for security',
          'Calculating the interchange fee amount',
          'Identifying the issuing bank so the network can route the transaction',
          'Verifying the cardholder\'s identity',
        ],
        correctIndex: 2,
        explanation: 'The BIN (Bank Identification Number) is the first six digits of a card number. The card network uses it to look up which issuing bank to route the authorization request to.',
      },
      {
        id: 'anatomy-of-a-swipe-q4',
        question: 'Who receives the interchange fee on a card transaction?',
        options: [
          'The card network (Visa or Mastercard)',
          'The merchant\'s bank (acquirer)',
          'The cardholder\'s bank (issuer)',
          'The payment terminal manufacturer',
        ],
        correctIndex: 2,
        explanation: 'Interchange flows from the acquirer (merchant\'s bank) to the issuer (cardholder\'s bank). This fee largely funds credit card rewards programs like cashback.',
      },
    ],
  },
  {
    topicSlug: 'authorization',
    topicTitle: 'Authorization',
    theme: 'Transaction Lifecycle',
    questions: [
      {
        id: 'authorization-q1',
        question: 'What message format is used for card authorization requests?',
        options: [
          'JSON over HTTPS',
          'XML-based SOAP messages',
          'ISO 8583',
          'Protocol Buffers (protobuf)',
        ],
        correctIndex: 2,
        explanation: 'ISO 8583 has been the backbone of card payments since the 1980s. It\'s a compact, binary-encoded format designed for speed — processing thousands of transactions per second where every byte matters.',
      },
      {
        id: 'authorization-q2',
        question: 'What is the difference between a dual-message and single-message transaction?',
        options: [
          'Dual-message uses two card networks; single-message uses one',
          'Dual-message separates authorization and clearing; single-message combines them',
          'Dual-message requires two approvals; single-message requires one',
          'Dual-message is for online payments; single-message is for in-store',
        ],
        correctIndex: 1,
        explanation: 'In dual-message (credit cards), authorization and clearing are separate messages. In single-message (PIN debit), both happen at once — the money moves immediately and the transaction is final.',
      },
      {
        id: 'authorization-q3',
        question: 'What is a "soft decline" in card authorization?',
        options: [
          'A decline that the cardholder doesn\'t see on their statement',
          'A temporary rejection that might succeed if retried later',
          'A decline with a reduced transaction amount',
          'A decline that bypasses the card network',
        ],
        correctIndex: 1,
        explanation: 'A soft decline is temporary — caused by insufficient funds, issuer timeouts, or false fraud flags. The transaction might succeed later. Hard declines (stolen card, closed account) should never be retried.',
      },
      {
        id: 'authorization-q4',
        question: 'How long does a card network typically allow for an authorization response?',
        options: [
          'Under 100 milliseconds',
          'About 2–3 seconds',
          'Up to 30 seconds',
          'Up to 1 minute',
        ],
        correctIndex: 1,
        explanation: 'Card networks enforce a roughly 2–3 second response SLA. If the issuer doesn\'t respond in time, the network may generate a "stand-in" decision using its own fraud models.',
      },
    ],
  },
  {
    topicSlug: 'card-networks',
    topicTitle: 'Card Networks',
    theme: 'Card Ecosystem',
    questions: [
      {
        id: 'card-networks-q1',
        question: 'What is the primary difference between an open-loop and closed-loop card network?',
        options: [
          'Open-loop networks are faster than closed-loop networks',
          'Closed-loop networks work with many banks; open-loop networks work with one',
          'Open-loop networks work with many issuers and acquirers; closed-loop networks control both sides',
          'Open-loop networks only process credit; closed-loop only process debit',
        ],
        correctIndex: 2,
        explanation: 'Open-loop networks (Visa, Mastercard) connect thousands of separate issuers and acquirers. Closed-loop networks (Amex) traditionally act as issuer, network, and acquirer — controlling the entire transaction.',
      },
      {
        id: 'card-networks-q2',
        question: 'How do card networks like Visa primarily earn revenue?',
        options: [
          'By collecting interchange fees on every transaction',
          'By charging interest on cardholder balances',
          'By charging network assessment fees on every transaction that crosses their rails',
          'By selling card-issuing licenses to banks',
        ],
        correctIndex: 2,
        explanation: 'Card networks earn revenue from network assessment fees (typically 0.13%–0.15% per transaction), not interchange. Interchange flows from acquirer to issuer — the network just sets the rate and facilitates the transfer.',
      },
      {
        id: 'card-networks-q3',
        question: 'What does the Durbin Amendment require for debit cards?',
        options: [
          'All debit transactions must be processed as PIN transactions',
          'Debit cards must support at least two unaffiliated networks',
          'Banks must offer debit cards with no monthly fees',
          'Merchants cannot charge a surcharge on debit card transactions',
        ],
        correctIndex: 1,
        explanation: 'The Durbin Amendment requires every debit card to support at least two unaffiliated networks, giving merchants a choice of which network to route through — typically choosing the lowest-cost option.',
      },
    ],
  },
  {
    topicSlug: 'payments-ecosystem-overview',
    topicTitle: 'Payments Ecosystem Overview',
    theme: 'Foundations',
    questions: [
      {
        id: 'payments-ecosystem-q1',
        question: 'In the four-party model, which entity issues cards to consumers?',
        options: [
          'The acquirer',
          'The card network',
          'The issuer',
          'The payment processor',
        ],
        correctIndex: 2,
        explanation: 'The issuer is the bank that gives you your card — Chase, Capital One, etc. They approve or decline transactions and bear the credit risk for cardholders.',
      },
      {
        id: 'payments-ecosystem-q2',
        question: 'What role does the acquirer play in a card transaction?',
        options: [
          'Issues the card to the consumer',
          'Sets interchange rates for all transactions',
          'Handles card payments on behalf of the merchant',
          'Operates the card network infrastructure',
        ],
        correctIndex: 2,
        explanation: 'The acquirer is the merchant\'s bank or payment processor — their gateway into the card network. Companies like Chase Paymentech, Worldpay, or Stripe sit in this role.',
      },
      {
        id: 'payments-ecosystem-q3',
        question: 'Why are card networks sometimes called "rails"?',
        options: [
          'Because they physically transport money between banks',
          'Because they route transaction messages between issuers and acquirers, like a transportation system',
          'Because they were originally built on railroad company infrastructure',
          'Because they require a fixed monthly subscription fee',
        ],
        correctIndex: 1,
        explanation: 'Card networks are called "rails" because they serve as the transportation system for payment messages — routing authorization requests, clearing data, and settlement instructions between banks.',
      },
    ],
  },
  {
    topicSlug: 'clearing-and-settlement',
    topicTitle: 'Clearing & Settlement',
    theme: 'Transaction Lifecycle',
    questions: [
      {
        id: 'clearing-settlement-q1',
        question: 'What happens during the clearing phase of a card payment?',
        options: [
          'The cardholder\'s bank approves or declines the transaction',
          'The merchant confirms final transaction amounts and submits them for settlement',
          'Money is transferred between banks via Fedwire',
          'The card network calculates interchange fees',
        ],
        correctIndex: 1,
        explanation: 'Clearing is when the merchant batches up the day\'s approved transactions and submits final amounts. This is when "pending" charges become posted transactions — and amounts can differ from authorization (like adding a restaurant tip).',
      },
      {
        id: 'clearing-settlement-q2',
        question: 'Why might the clearing amount differ from the authorization amount?',
        options: [
          'Because exchange rates fluctuate during the day',
          'Because the card network adds a processing fee',
          'Because tips, adjustments, or partial purchases can change the final amount',
          'Because the merchant must pay interchange before clearing',
        ],
        correctIndex: 2,
        explanation: 'Restaurant tips, hotel incidentals, and gas station fill-ups are common scenarios where the final clearing amount differs from the original authorization hold.',
      },
      {
        id: 'clearing-settlement-q3',
        question: 'How do card networks settle transactions between banks efficiently?',
        options: [
          'Each transaction is settled individually in real time',
          'They net out amounts owed between banks and only transfer the difference',
          'They hold all funds for 30 days before releasing them',
          'They route all settlements through a single central bank',
        ],
        correctIndex: 1,
        explanation: 'Rather than settling billions of individual transactions, networks calculate net amounts: "Chase owes Bank of America $4.2M, and Bank of America owes Chase $3.8M, so just move the $400K difference."',
      },
    ],
  },
  {
    topicSlug: 'interchange-fees',
    topicTitle: 'Interchange Fees',
    theme: 'Card Ecosystem',
    questions: [
      {
        id: 'interchange-q1',
        question: 'Who pays interchange fees?',
        options: [
          'The cardholder pays the issuing bank',
          'The merchant pays the card network',
          'The acquirer pays the issuer',
          'The card network pays the acquirer',
        ],
        correctIndex: 2,
        explanation: 'Interchange flows from the acquirer (merchant\'s bank) to the issuer (cardholder\'s bank) on every card transaction. The merchant ultimately bears this cost through their merchant discount rate.',
      },
      {
        id: 'interchange-q2',
        question: 'Why are credit card interchange rates typically higher than debit card rates?',
        options: [
          'Credit transactions are faster to process',
          'The issuer bears more risk with credit (lending) and funds rewards programs',
          'Debit transactions are processed by cheaper networks',
          'Credit cards use more bandwidth on card networks',
        ],
        correctIndex: 1,
        explanation: 'Credit card issuers bear lending risk and use interchange to fund rewards programs. Debit is lower risk (real money, no lending), especially after the Durbin Amendment capped regulated debit interchange.',
      },
      {
        id: 'interchange-q3',
        question: 'What primarily funds credit card rewards like cashback and airline miles?',
        options: [
          'Annual card fees paid by cardholders',
          'Interest charged on revolving balances',
          'Interchange fees paid by merchants',
          'Network assessment fees collected by Visa/Mastercard',
        ],
        correctIndex: 2,
        explanation: 'Interchange is the primary funding source for credit card rewards. Every time you earn cashback, it\'s largely funded by the interchange fee the merchant\'s bank paid to your card\'s issuing bank.',
      },
    ],
  },
  {
    topicSlug: 'digital-wallets',
    topicTitle: 'Digital Wallets',
    theme: 'Non-Card Payments',
    questions: [
      {
        id: 'digital-wallets-q1',
        question: 'How do NFC mobile wallets like Apple Pay secure transactions?',
        options: [
          'By encrypting the card number with the merchant\'s public key',
          'By replacing the actual card number with a device-specific token and generating a one-time cryptogram',
          'By requiring the cardholder to enter their PIN on the phone',
          'By routing transactions through a separate, more secure network',
        ],
        correctIndex: 1,
        explanation: 'Apple Pay and Google Pay use tokenization — your real card number is never shared with the merchant. Each transaction also generates a unique cryptogram, making stolen data useless for future fraud.',
      },
      {
        id: 'digital-wallets-q2',
        question: 'What is the main difference between a pass-through wallet and a staged wallet?',
        options: [
          'Pass-through wallets are faster; staged wallets are more secure',
          'Pass-through wallets route to existing payment rails; staged wallets hold a stored balance',
          'Pass-through wallets work offline; staged wallets require internet',
          'Pass-through wallets are free; staged wallets charge fees',
        ],
        correctIndex: 1,
        explanation: 'Pass-through wallets (Apple Pay, Google Pay) simply route to your existing card\'s payment rails. Staged wallets (PayPal, Venmo) hold a balance or pull from a linked bank account — acting as an intermediary.',
      },
      {
        id: 'digital-wallets-q3',
        question: 'Why do merchants often prefer digital wallet payments?',
        options: [
          'Digital wallets always have lower interchange fees',
          'Tokenization and biometric auth lead to lower fraud and higher approval rates',
          'Digital wallets bypass the card networks entirely',
          'Customers spend less money when using digital wallets',
        ],
        correctIndex: 1,
        explanation: 'Digital wallets improve security through tokenization and biometric authentication, leading to lower fraud rates, fewer chargebacks, and higher authorization approval rates — all of which benefit merchants.',
      },
    ],
  },
  {
    topicSlug: 'fraud-and-risk',
    topicTitle: 'Fraud & Risk',
    theme: 'Trust & Compliance',
    questions: [
      {
        id: 'fraud-risk-q1',
        question: 'What is the difference between first-party fraud and third-party fraud?',
        options: [
          'First-party fraud involves the cardholder themselves; third-party fraud involves a stolen card or identity',
          'First-party fraud is online; third-party fraud is in-store',
          'First-party fraud is committed by merchants; third-party fraud is committed by consumers',
          'First-party fraud involves one transaction; third-party involves multiple',
        ],
        correctIndex: 0,
        explanation: 'First-party fraud (friendly fraud) is when the actual cardholder disputes a legitimate charge. Third-party fraud is the classic scenario — someone steals your card details and makes unauthorized purchases.',
      },
      {
        id: 'fraud-risk-q2',
        question: 'What is "velocity checking" in fraud detection?',
        options: [
          'Measuring how fast a card is swiped through the terminal',
          'Checking the internet speed of the device making the purchase',
          'Monitoring how many transactions a card attempts in a short time period',
          'Testing how quickly a merchant processes refunds',
        ],
        correctIndex: 2,
        explanation: 'Velocity checks monitor the rate of transactions — a burst of rapid-fire purchases is a classic fraud pattern. If a card attempts 10 transactions in 5 minutes across different merchants, that\'s a red flag.',
      },
      {
        id: 'fraud-risk-q3',
        question: 'What does 3D Secure (3DS) add to online card payments?',
        options: [
          'End-to-end encryption of the card number',
          'An additional authentication step between the cardholder and their issuing bank',
          'A three-day hold on all online transactions',
          'A direct connection between the merchant and the card network',
        ],
        correctIndex: 1,
        explanation: '3D Secure adds an authentication layer where the cardholder verifies their identity directly with their issuing bank (via SMS code, app approval, or biometrics) before the transaction is approved.',
      },
    ],
  },
  {
    topicSlug: 'chargebacks-and-disputes',
    topicTitle: 'Chargebacks & Disputes',
    theme: 'Transaction Lifecycle',
    questions: [
      {
        id: 'chargebacks-q1',
        question: 'What is a chargeback?',
        options: [
          'A fee charged by the card network for processing a transaction',
          'A reversal of a transaction initiated by the cardholder through their issuing bank',
          'A penalty for merchants who process too many transactions',
          'An automatic refund triggered when a card expires',
        ],
        correctIndex: 1,
        explanation: 'A chargeback is when a cardholder disputes a transaction with their bank, and the issuer reverses the charge — pulling the money back from the merchant through the same chain it originally traveled.',
      },
      {
        id: 'chargebacks-q2',
        question: 'What is "representment" in the chargeback process?',
        options: [
          'The cardholder re-submitting a declined transaction',
          'The merchant challenging a chargeback by presenting evidence',
          'The card network re-routing a transaction to a different processor',
          'The issuer re-authorizing a previously declined transaction',
        ],
        correctIndex: 1,
        explanation: 'Representment is the merchant\'s chance to fight back — they submit evidence (delivery confirmation, signed receipts, IP logs) to prove the transaction was legitimate and the chargeback should be reversed.',
      },
      {
        id: 'chargebacks-q3',
        question: 'Why do excessive chargebacks threaten a merchant\'s business?',
        options: [
          'Chargebacks are only processed on weekends',
          'High chargeback rates can lead to higher processing fees, fines, or losing the ability to accept cards entirely',
          'Chargebacks permanently freeze the merchant\'s bank account',
          'Each chargeback requires a mandatory government audit',
        ],
        correctIndex: 1,
        explanation: 'Card networks monitor chargeback ratios. Exceed their thresholds (typically 1% of transactions) and you face fines, higher processing fees, mandatory remediation programs, or being placed on the MATCH list — effectively blacklisted.',
      },
    ],
  },
  {
    topicSlug: 'issuer-processors',
    topicTitle: 'Issuer Processors',
    theme: 'Card Ecosystem',
    questions: [
      {
        id: 'issuer-processors-q1',
        question: 'What is the primary role of an issuer processor?',
        options: [
          'Manufacturing physical cards for banks',
          'Handling authorization, card management, and settlement technology on behalf of issuing banks',
          'Setting interchange rates for the card network',
          'Managing the merchant\'s point-of-sale terminal',
        ],
        correctIndex: 1,
        explanation: 'Issuer processors are the technology layer behind issuing banks — they connect to card networks, run authorization logic, manage card lifecycle (activation, blocking, limits), and handle settlement calculations.',
      },
      {
        id: 'issuer-processors-q2',
        question: 'Why have modern issuer processors like Marqeta disrupted traditional players like TSYS?',
        options: [
          'They offer lower interchange rates',
          'They provide API-first, cloud-native platforms enabling fintechs to launch card programs quickly',
          'They eliminated the need for card networks',
          'They process transactions without authorization',
        ],
        correctIndex: 1,
        explanation: 'Modern issuer processors offer developer-friendly APIs that let fintechs build and launch card programs in weeks instead of months. This API-first approach enabled companies like DoorDash, Square, and Affirm to create custom card products rapidly.',
      },
      {
        id: 'issuer-processors-q3',
        question: 'What happens if an issuer processor goes down during a transaction?',
        options: [
          'The transaction is automatically approved',
          'The card network may make a "stand-in" authorization decision',
          'The merchant must process the transaction offline',
          'The cardholder is charged a penalty fee',
        ],
        correctIndex: 1,
        explanation: 'When an issuer processor can\'t respond within the network\'s SLA (typically 2-3 seconds), the card network may perform "stand-in processing" — using its own fraud models and the cardholder\'s history to approve or decline.',
      },
    ],
  },
  {
    topicSlug: 'acquirer-processors',
    topicTitle: 'Acquirer Processors',
    theme: 'Card Ecosystem',
    questions: [
      {
        id: 'acquirer-processors-q1',
        question: 'What does an acquirer processor do?',
        options: [
          'Issues cards to consumers on behalf of banks',
          'Routes transaction data from merchants through card networks for authorization and settlement',
          'Sets the rules for how chargebacks are resolved',
          'Operates ATM networks for cash withdrawals',
        ],
        correctIndex: 1,
        explanation: 'Acquirer processors are the technology companies that handle the merchant side — formatting transaction messages, routing them through card networks, and managing the clearing and settlement process.',
      },
      {
        id: 'acquirer-processors-q2',
        question: 'What is a Payment Facilitator (PayFac) model?',
        options: [
          'A model where every merchant has their own merchant ID directly with the acquirer',
          'A model where a platform aggregates many merchants under its own master merchant account',
          'A model where payments are facilitated without any card network involvement',
          'A model used exclusively for cross-border transactions',
        ],
        correctIndex: 1,
        explanation: 'PayFacs like Stripe and Square aggregate many merchants under their own master merchant account, simplifying onboarding. Sub-merchants can start accepting payments in minutes instead of the days/weeks traditional merchant accounts require.',
      },
      {
        id: 'acquirer-processors-q3',
        question: 'Why is PCI DSS compliance critical for acquirer processors?',
        options: [
          'It allows them to set their own interchange rates',
          'It protects cardholder data and prevents breaches that could compromise millions of card numbers',
          'It enables them to process transactions without a card network',
          'It reduces the time needed for settlement',
        ],
        correctIndex: 1,
        explanation: 'Acquirer processors handle sensitive card data for potentially millions of merchants. PCI DSS compliance ensures this data is encrypted, access-controlled, and monitored — a breach could expose card numbers at massive scale.',
      },
    ],
  },
  {
    topicSlug: 'real-time-payments',
    topicTitle: 'Real-Time Payments',
    theme: 'Moving Money',
    questions: [
      {
        id: 'rtp-q1',
        question: 'What makes real-time payments different from traditional card payments?',
        options: [
          'They use card networks instead of bank networks',
          'Money moves instantly and irrevocably between bank accounts, 24/7/365',
          'They can only be used for small transactions under $100',
          'They require both parties to use the same bank',
        ],
        correctIndex: 1,
        explanation: 'Real-time payment systems (like FedNow, UPI, Pix) transfer money between bank accounts instantly — no batch processing, no waiting for business hours. Once sent, the payment is final and irrevocable.',
      },
      {
        id: 'rtp-q2',
        question: 'What is FedNow?',
        options: [
          'A new credit card network operated by the Federal Reserve',
          'The Federal Reserve\'s real-time gross settlement system for instant bank-to-bank payments',
          'A government-issued digital wallet',
          'A regulatory framework for cryptocurrency payments',
        ],
        correctIndex: 1,
        explanation: 'FedNow, launched by the Federal Reserve in 2023, enables instant bank-to-bank payments in the U.S., 24/7/365. It competes with The Clearing House\'s RTP network to bring real-time payments to American consumers and businesses.',
      },
      {
        id: 'rtp-q3',
        question: 'Why has India\'s UPI been so successful in driving real-time payment adoption?',
        options: [
          'The Indian government made cash transactions illegal',
          'UPI is free for consumers, works on basic phones via USSD, and uses simple identifiers like phone numbers',
          'UPI offers the highest interchange rates in the world',
          'India has fewer banks than other countries',
        ],
        correctIndex: 1,
        explanation: 'UPI\'s success comes from its accessibility — zero cost for consumers, works on basic phones (not just smartphones), uses familiar identifiers (phone numbers), and was backed by strong government support and merchant incentives.',
      },
    ],
  },
  {
    topicSlug: 'open-banking',
    topicTitle: 'Open Banking',
    theme: 'Non-Card Payments',
    questions: [
      {
        id: 'open-banking-q1',
        question: 'What is the core principle behind open banking?',
        options: [
          'Banks must make their source code open source',
          'Consumers can grant third-party apps secure access to their bank data and payment initiation',
          'All bank accounts must be publicly visible',
          'Banks must offer free checking accounts to all consumers',
        ],
        correctIndex: 1,
        explanation: 'Open banking gives consumers control over their financial data — they can authorize third-party apps to access account information or initiate payments through secure, standardized APIs, breaking banks\' monopoly on customer data.',
      },
      {
        id: 'open-banking-q2',
        question: 'What regulation drove open banking adoption in Europe?',
        options: [
          'GDPR (General Data Protection Regulation)',
          'Basel III banking requirements',
          'PSD2 (Payment Services Directive 2)',
          'MiFID II (Markets in Financial Instruments Directive)',
        ],
        correctIndex: 2,
        explanation: 'PSD2 (2018) required European banks to provide APIs for licensed third parties to access customer accounts (with consent). This regulatory mandate created the open banking ecosystem that has since spread globally.',
      },
      {
        id: 'open-banking-q3',
        question: 'How could open banking payments disrupt card networks?',
        options: [
          'Open banking uses faster card rails',
          'Bank-to-bank payments via open banking APIs bypass card networks entirely, eliminating interchange',
          'Open banking makes card networks process transactions for free',
          'Open banking replaces card numbers with biometric data',
        ],
        correctIndex: 1,
        explanation: 'Open banking enables direct bank-to-bank payments that completely bypass Visa/Mastercard rails and their associated interchange fees. This "pay by bank" model is especially attractive for merchants paying 2-3% on card transactions.',
      },
    ],
  },
  {
    topicSlug: 'kyc-and-identity',
    topicTitle: 'KYC & Identity',
    theme: 'Trust & Compliance',
    questions: [
      {
        id: 'kyc-q1',
        question: 'What does KYC stand for and what is its purpose?',
        options: [
          'Know Your Customer — verifying a customer\'s identity to prevent fraud and money laundering',
          'Keep Your Cash — a savings program mandated by regulators',
          'Key Yielding Cryptography — encryption standards for financial data',
          'Know Your Charges — transparency requirements for fee disclosure',
        ],
        correctIndex: 0,
        explanation: 'Know Your Customer (KYC) is the process of verifying a customer\'s identity when they open an account or initiate a financial relationship. It\'s a cornerstone of anti-money-laundering (AML) regulations worldwide.',
      },
      {
        id: 'kyc-q2',
        question: 'What are the typical levels of KYC verification?',
        options: [
          'Bronze, Silver, Gold, Platinum',
          'Simplified (name + DOB), Standard (ID document), Enhanced (source of funds)',
          'Level 1 (password), Level 2 (2FA), Level 3 (biometrics)',
          'Basic (email), Intermediate (phone), Advanced (in-person)',
        ],
        correctIndex: 1,
        explanation: 'KYC typically has tiered levels: Simplified due diligence (basic info for low-risk accounts), Standard (government ID verification), and Enhanced due diligence (source of funds/wealth investigation for high-risk customers).',
      },
      {
        id: 'kyc-q3',
        question: 'Why is KYC considered a friction point for fintech companies?',
        options: [
          'KYC verification requires physical branch visits in all cases',
          'Lengthy or complex KYC processes cause user drop-off during onboarding, reducing conversion',
          'KYC is only required for transactions over $1 million',
          'KYC eliminates the need for any other security measures',
        ],
        correctIndex: 1,
        explanation: 'Every step in the KYC process is a potential drop-off point. Fintechs invest heavily in making verification fast and frictionless (photo ID scanning, liveness checks, instant database lookups) to keep conversion rates high while meeting regulatory requirements.',
      },
    ],
  },
  {
    topicSlug: 'embedded-finance',
    topicTitle: 'Embedded Finance',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'embedded-finance-q1',
        question: 'What is embedded finance?',
        options: [
          'Financial services delivered only through bank branches',
          'Financial services integrated directly into non-financial platforms and apps',
          'A type of cryptocurrency built into hardware wallets',
          'Finance courses embedded in university curricula',
        ],
        correctIndex: 1,
        explanation: 'Embedded finance is when financial services (payments, lending, insurance, banking) are seamlessly integrated into non-financial platforms. Think Shopify offering business loans, or Uber letting drivers cash out instantly.',
      },
      {
        id: 'embedded-finance-q2',
        question: 'What makes Banking-as-a-Service (BaaS) essential for embedded finance?',
        options: [
          'BaaS eliminates the need for any banking licenses',
          'BaaS providers offer APIs that let non-banks embed regulated financial services without becoming a bank themselves',
          'BaaS makes all bank transactions free of charge',
          'BaaS replaces traditional banks entirely',
        ],
        correctIndex: 1,
        explanation: 'BaaS providers (like Treasury Prime, Unit, Bond) hold or partner with banking licenses and offer APIs. This lets any platform embed bank accounts, cards, or lending without navigating years of regulatory approvals.',
      },
      {
        id: 'embedded-finance-q3',
        question: 'Why is embedded lending attractive for e-commerce platforms?',
        options: [
          'It allows platforms to avoid payment processing fees',
          'It increases average order value and conversion by offering financing at the point of purchase',
          'It eliminates the need for credit checks',
          'It transfers all lending risk to the consumer',
        ],
        correctIndex: 1,
        explanation: 'Embedded lending (BNPL, merchant financing) at checkout reduces cart abandonment and increases average order sizes. The platform earns a commission while a lending partner handles the credit risk.',
      },
    ],
  },
  {
    topicSlug: 'buy-now-pay-later',
    topicTitle: 'Buy Now, Pay Later',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'bnpl-q1',
        question: 'How does a typical BNPL product work at checkout?',
        options: [
          'The customer pays the full amount upfront and gets reimbursed later',
          'The customer splits the purchase into installments, often interest-free, while the merchant gets paid in full immediately',
          'The merchant extends credit directly from their own funds',
          'The customer\'s bank automatically creates a loan for every purchase',
        ],
        correctIndex: 1,
        explanation: 'In a typical BNPL transaction, the BNPL provider (Klarna, Afterpay, Affirm) pays the merchant in full upfront, then collects installments from the consumer over time — often 4 interest-free payments over 6 weeks.',
      },
      {
        id: 'bnpl-q2',
        question: 'How do BNPL providers primarily make money on interest-free installment plans?',
        options: [
          'They charge consumers hidden fees on every transaction',
          'They charge merchants a fee (typically 3-6% of the transaction) for the increased conversion',
          'They earn interest on consumer deposits',
          'They sell consumer data to third-party advertisers',
        ],
        correctIndex: 1,
        explanation: 'For interest-free plans, BNPL providers charge the merchant a commission (typically 3-6%, higher than card interchange) in exchange for higher conversion rates and larger average order values.',
      },
      {
        id: 'bnpl-q3',
        question: 'What is a key regulatory concern with BNPL?',
        options: [
          'BNPL eliminates the need for card networks',
          'Consumers can accumulate debt across multiple BNPL providers without traditional credit checks or credit bureau reporting',
          'BNPL transactions are too slow to process',
          'BNPL is only available in the United States',
        ],
        correctIndex: 1,
        explanation: 'A major concern is that consumers can stack BNPL obligations across multiple providers (Klarna + Afterpay + Affirm) without each provider seeing the full picture, since many BNPL products historically didn\'t report to credit bureaus or perform hard credit checks.',
      },
    ],
  },
  {
    topicSlug: 'virtual-cards',
    topicTitle: 'Virtual Cards',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'virtual-cards-q1',
        question: 'What is a virtual card?',
        options: [
          'A plastic card with a computer chip embedded in it',
          'A digitally-generated card number that can be used for payments without a physical card',
          'A card that only works in virtual reality environments',
          'A prepaid gift card purchased online',
        ],
        correctIndex: 1,
        explanation: 'Virtual cards are card numbers generated digitally — they have a card number, expiration date, and CVV just like physical cards, but exist only in digital form. They can be created instantly and used for online or tap-to-pay transactions.',
      },
      {
        id: 'virtual-cards-q2',
        question: 'Why are single-use virtual cards valuable for B2B payments?',
        options: [
          'They are cheaper to produce than physical cards',
          'Each card is locked to a specific vendor, amount, and time window — preventing misuse and simplifying reconciliation',
          'They bypass the card networks entirely',
          'They automatically negotiate lower prices with vendors',
        ],
        correctIndex: 1,
        explanation: 'Single-use virtual cards can be locked to a specific supplier, exact dollar amount, and expiration date. If the number is compromised, it\'s worthless. And each transaction auto-reconciles because the card was purpose-built for that payment.',
      },
      {
        id: 'virtual-cards-q3',
        question: 'How do virtual cards help with expense management?',
        options: [
          'They eliminate the need for employee reimbursement',
          'They automatically file tax returns',
          'Managers can create cards with built-in spend controls (amount limits, merchant categories, expiration dates)',
          'They make all business purchases tax-deductible',
        ],
        correctIndex: 2,
        explanation: 'Virtual cards let finance teams issue purpose-specific cards with granular controls — spend limits, allowed merchant categories, auto-expiration dates. This eliminates shared card numbers, simplifies policy enforcement, and provides real-time visibility into spending.',
      },
    ],
  },
  {
    topicSlug: 'cross-border-payments',
    topicTitle: 'Cross-Border Payments',
    theme: 'Moving Money',
    questions: [
      {
        id: 'cross-border-q1',
        question: 'Why are cross-border payments significantly more expensive than domestic payments?',
        options: [
          'International internet connections are slower and more costly',
          'Multiple currency conversions, correspondent banking chains, and regulatory compliance add layers of cost',
          'Card networks charge 10x higher fees for international transactions',
          'Cross-border payments require physical transport of currency',
        ],
        correctIndex: 1,
        explanation: 'Cross-border payments involve FX conversion spreads, correspondent banking fees (each bank in the chain takes a cut), compliance screening costs, and often multiple intermediary banks — all adding up to fees of 3-7% for many corridors.',
      },
      {
        id: 'cross-border-q2',
        question: 'What is a correspondent banking relationship?',
        options: [
          'A direct connection between two consumers\' bank accounts',
          'An arrangement where banks hold accounts with each other to facilitate payments in different currencies/countries',
          'A partnership between a bank and a card network',
          'An email-based system for international wire transfers',
        ],
        correctIndex: 1,
        explanation: 'Correspondent banking is how banks without a presence in another country settle payments there. Your bank has an account at a foreign bank (nostro account), and that bank has an account at your bank (vostro account). Money moves by adjusting these balances.',
      },
      {
        id: 'cross-border-q3',
        question: 'How are fintechs like Wise (formerly TransferWise) disrupting traditional cross-border payments?',
        options: [
          'By creating their own global currency',
          'By matching payments in different countries to avoid actual cross-border fund movement',
          'By building faster undersea cables',
          'By eliminating currency exchange entirely',
        ],
        correctIndex: 1,
        explanation: 'Wise uses a peer-to-peer matching model: if someone in the US wants to send euros and someone in Europe wants to send dollars, Wise can match them — keeping money local in each country and avoiding expensive international wire transfers.',
      },
    ],
  },
  {
    topicSlug: 'compliance-and-regulation',
    topicTitle: 'Compliance & Regulation',
    theme: 'Trust & Compliance',
    questions: [
      {
        id: 'compliance-q1',
        question: 'What is PCI DSS?',
        options: [
          'A type of payment processing hardware',
          'A set of security standards for any organization that stores, processes, or transmits cardholder data',
          'A government regulation requiring banks to offer low-interest loans',
          'A certification program for payment terminal manufacturers',
        ],
        correctIndex: 1,
        explanation: 'PCI DSS (Payment Card Industry Data Security Standard) is a set of security requirements created by the major card networks. Any business that handles card data must comply — from encrypting data in transit to restricting physical access to systems.',
      },
      {
        id: 'compliance-q2',
        question: 'What is AML (Anti-Money Laundering) compliance designed to prevent?',
        options: [
          'Unauthorized card transactions at ATMs',
          'Criminals disguising illegally obtained money as legitimate funds through the financial system',
          'Banks from charging excessive fees',
          'Foreign currency manipulation by central banks',
        ],
        correctIndex: 1,
        explanation: 'AML regulations require financial institutions to detect and report suspicious activity that could indicate money laundering — the process of making "dirty" money from criminal activity appear legitimate by passing it through the financial system.',
      },
      {
        id: 'compliance-q3',
        question: 'What is a SAR (Suspicious Activity Report)?',
        options: [
          'A credit score report generated by a credit bureau',
          'A filing that financial institutions must submit to FinCEN when they detect potentially suspicious transactions',
          'A quarterly financial statement required by the SEC',
          'A merchant\'s annual compliance certification',
        ],
        correctIndex: 1,
        explanation: 'Financial institutions must file SARs with FinCEN (Financial Crimes Enforcement Network) when they identify transactions that may involve money laundering, fraud, or terrorist financing. Failure to file can result in severe penalties.',
      },
    ],
  },
  {
    topicSlug: 'neobanking',
    topicTitle: 'Neobanking',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'neobanking-q1',
        question: 'What distinguishes a neobank from a traditional bank?',
        options: [
          'Neobanks operate exclusively through digital channels with no physical branches',
          'Neobanks can only offer savings accounts',
          'Neobanks are not regulated by any financial authority',
          'Neobanks can only serve customers under 30',
        ],
        correctIndex: 0,
        explanation: 'Neobanks are digital-first (or digital-only) financial institutions that deliver banking services through mobile apps and websites, without maintaining physical branch networks. This lower cost structure enables features like fee-free accounts and higher APYs.',
      },
      {
        id: 'neobanking-q2',
        question: 'How do many neobanks operate without their own banking license?',
        options: [
          'They operate illegally until they receive a license',
          'They partner with chartered banks that provide the licensed banking infrastructure',
          'Banking licenses are not required for digital-only services',
          'They apply for special "digital bank" licenses that are easier to obtain',
        ],
        correctIndex: 1,
        explanation: 'Many neobanks partner with licensed banks (sponsor banks) through Banking-as-a-Service arrangements. The sponsor bank holds deposits, issues cards, and handles regulatory requirements, while the neobank builds the customer experience.',
      },
      {
        id: 'neobanking-q3',
        question: 'What is a common revenue challenge for neobanks?',
        options: [
          'They have too many customers to serve',
          'Many rely heavily on interchange revenue from debit cards, which can be thin and volatile',
          'Customers refuse to use mobile banking apps',
          'Neobanks cannot offer international payments',
        ],
        correctIndex: 1,
        explanation: 'Many neobanks offer fee-free accounts and rely primarily on debit card interchange for revenue. With Durbin-regulated rates of ~21 cents per transaction, achieving profitability requires massive transaction volume or diversifying into lending, subscriptions, or premium tiers.',
      },
    ],
  },
  {
    topicSlug: 'subscriptions-and-recurring',
    topicTitle: 'Subscriptions & Recurring Payments',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'subscriptions-q1',
        question: 'What is "account updater" and why is it important for subscription businesses?',
        options: [
          'A tool that lets customers change their email address',
          'A service that automatically updates stored card details when a card is replaced, preventing failed payments',
          'A dashboard for viewing subscription analytics',
          'A regulatory requirement for annual account reviews',
        ],
        correctIndex: 1,
        explanation: 'Account updater services (offered by card networks) automatically refresh stored card details when cards are reissued — new expiration dates, replacement card numbers. Without it, subscription businesses face involuntary churn from expired cards.',
      },
      {
        id: 'subscriptions-q2',
        question: 'What is "involuntary churn" in the context of subscriptions?',
        options: [
          'Customers who actively cancel their subscription',
          'Customers lost due to payment failures (expired cards, insufficient funds) rather than intentional cancellation',
          'Employees who leave the company involuntarily',
          'Merchants who lose their payment processing agreement',
        ],
        correctIndex: 1,
        explanation: 'Involuntary churn is when subscribers are lost not because they wanted to cancel, but because their payment method failed. Expired cards, bank-declined transactions, and insufficient funds can account for 20-40% of total churn for subscription businesses.',
      },
      {
        id: 'subscriptions-q3',
        question: 'Why is smart retry logic important for recurring billing?',
        options: [
          'It makes transactions process faster',
          'It retries declined transactions at optimal times (different day, time) based on decline reason codes',
          'It bypasses the card network for faster authorization',
          'It automatically upgrades customers to higher subscription tiers',
        ],
        correctIndex: 1,
        explanation: 'Smart retry logic analyzes decline reason codes to determine when and whether to retry. An "insufficient funds" decline might succeed on payday. A "stolen card" decline should never be retried. Timing retries strategically can recover 10-30% of failed payments.',
      },
    ],
  },
  {
    topicSlug: 'credit-cards-vs-debit-cards',
    topicTitle: 'Credit Cards vs. Debit Cards',
    theme: 'Card Ecosystem',
    questions: [
      {
        id: 'credit-vs-debit-q1',
        question: 'What is the fundamental difference between credit and debit cards?',
        options: [
          'Credit cards are always more expensive to use',
          'Debit cards pull money directly from your bank account; credit cards create a loan that you repay later',
          'Credit cards can only be used online; debit cards only in-store',
          'Debit cards earn more rewards than credit cards',
        ],
        correctIndex: 1,
        explanation: 'With a debit card, you spend your own money — it\'s deducted from your bank account. With a credit card, the issuer lends you the money and you repay it later (immediately or over time with interest).',
      },
      {
        id: 'credit-vs-debit-q2',
        question: 'Why does running a debit card as "credit" (no PIN) typically cost merchants more?',
        options: [
          'It requires more expensive terminal hardware',
          'It routes over credit card (signature) rails with higher interchange rates instead of PIN debit rails',
          'The card network charges a special surcharge',
          'It takes longer to settle, costing the merchant interest',
        ],
        correctIndex: 1,
        explanation: 'When a debit card runs as "credit" (signature), it uses Visa/Mastercard\'s dual-message credit rails with higher interchange rates. Running as "debit" (PIN) uses single-message PIN debit networks with lower, often Durbin-regulated interchange.',
      },
      {
        id: 'credit-vs-debit-q3',
        question: 'Why do credit cards generally offer stronger consumer protection than debit cards?',
        options: [
          'Credit card companies have more employees',
          'Federal regulations (Reg Z vs Reg E) give credit card holders broader dispute rights and limit liability to $50 for unauthorized charges',
          'Debit card issuers don\'t investigate fraud claims',
          'Credit cards use more advanced encryption',
        ],
        correctIndex: 1,
        explanation: 'Regulation Z (credit cards) limits unauthorized charge liability to $50 and gives 60 days to dispute billing errors. Regulation E (debit cards) has a sliding liability scale: $50 if reported within 2 days, $500 within 60 days, and unlimited after that.',
      },
    ],
  },
  {
    topicSlug: 'push-to-card',
    topicTitle: 'Push to Card',
    theme: 'Moving Money',
    questions: [
      {
        id: 'push-to-card-q1',
        question: 'What is a "push to card" payment?',
        options: [
          'A standard card purchase where money is pulled from the cardholder',
          'A payment that sends (pushes) funds directly to a recipient\'s debit card, often in real time',
          'A payment method exclusive to credit cards',
          'A way to add money to a prepaid card at a retail store',
        ],
        correctIndex: 1,
        explanation: 'Push to card reverses the normal card flow — instead of pulling money from a card (a purchase), it pushes money to a card. Visa Direct and Mastercard Send enable near-instant disbursements to any debit card.',
      },
      {
        id: 'push-to-card-q2',
        question: 'What is a common use case for push-to-card payments?',
        options: [
          'Paying for groceries at a supermarket',
          'Gig economy platforms paying drivers and freelancers instantly to their debit cards',
          'Making monthly mortgage payments',
          'Purchasing stocks through a brokerage',
        ],
        correctIndex: 1,
        explanation: 'Gig platforms (Uber, DoorDash, Lyft) use push-to-card to offer instant earnings cashout. Instead of waiting for ACH (2-3 days), drivers can get paid to their debit card within minutes — often for a small fee.',
      },
    ],
  },
  {
    topicSlug: 'bank-based-payments',
    topicTitle: 'Bank-Based Payments',
    theme: 'Non-Card Payments',
    questions: [
      {
        id: 'bank-payments-q1',
        question: 'What is ACH (Automated Clearing House)?',
        options: [
          'A real-time payment system that settles instantly',
          'A batch-based electronic payment system for bank-to-bank transfers in the U.S.',
          'A card network similar to Visa or Mastercard',
          'A system exclusively used for international wire transfers',
        ],
        correctIndex: 1,
        explanation: 'ACH is a batch-based system that processes bank-to-bank transfers in the U.S. — payroll direct deposits, bill payments, and bank transfers. It handles billions of transactions but processes in batches (not real-time), typically settling in 1-2 business days.',
      },
      {
        id: 'bank-payments-q2',
        question: 'What is the difference between ACH debit and ACH credit?',
        options: [
          'ACH debit uses debit cards; ACH credit uses credit cards',
          'ACH debit pulls money from an account; ACH credit pushes money to an account',
          'ACH debit is free; ACH credit has a fee',
          'ACH debit is for businesses; ACH credit is for consumers',
        ],
        correctIndex: 1,
        explanation: 'In ACH credit, the originator pushes money to a recipient\'s account (like direct deposit payroll). In ACH debit, the originator pulls money from an account (like an autopay bill payment). The direction of initiation determines the type.',
      },
      {
        id: 'bank-payments-q3',
        question: 'Why do wire transfers cost significantly more than ACH transfers?',
        options: [
          'Wire transfers use gold-backed currency',
          'Wire transfers are individually processed, settled in real-time, and irrevocable — providing certainty and speed',
          'Wire transfers are processed by more banks',
          'Wire transfers include automatic insurance coverage',
        ],
        correctIndex: 1,
        explanation: 'Wire transfers (via Fedwire) are processed individually in real-time with immediate finality — the recipient bank has guaranteed funds. This speed, certainty, and irrevocability justifies the higher cost ($15-45) compared to batch-processed ACH.',
      },
    ],
  },
  {
    topicSlug: 'liability',
    topicTitle: 'Liability',
    theme: 'Trust & Compliance',
    questions: [
      {
        id: 'liability-q1',
        question: 'What did the EMV liability shift change?',
        options: [
          'It made card networks responsible for all fraud losses',
          'It shifted fraud liability to whichever party (issuer or merchant) has less secure technology',
          'It eliminated all fraud liability for consumers',
          'It required all merchants to use contactless terminals',
        ],
        correctIndex: 1,
        explanation: 'The EMV liability shift (2015 in the U.S.) means that if a chip card is used at a non-chip terminal, the merchant bears the fraud liability. If a non-chip card is used at a chip terminal, the issuer bears it. Liability falls on the party that didn\'t upgrade.',
      },
      {
        id: 'liability-q2',
        question: 'Who typically bears the liability for a fraudulent card-not-present (online) transaction?',
        options: [
          'The cardholder in all cases',
          'The card network',
          'The merchant, unless 3D Secure or similar authentication was used',
          'The internet service provider',
        ],
        correctIndex: 2,
        explanation: 'For card-not-present (online) transactions, the merchant generally bears fraud liability. Using 3D Secure shifts liability to the issuer, since the bank authenticated the cardholder. This is a major incentive for merchants to implement 3DS.',
      },
    ],
  },
  {
    topicSlug: 'expense-management',
    topicTitle: 'Expense Management',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'expense-q1',
        question: 'How do modern expense management platforms improve on traditional employee reimbursement?',
        options: [
          'They eliminate all business expenses',
          'They issue company cards with real-time spend controls and automatic receipt matching, eliminating reimbursement cycles',
          'They require employees to use only cash',
          'They outsource all purchasing to a third party',
        ],
        correctIndex: 1,
        explanation: 'Modern platforms (Brex, Ramp, Navan) issue virtual or physical cards with built-in spend policies — amount limits, merchant category restrictions, approval workflows. Expenses are captured in real-time, eliminating the traditional submit-and-wait reimbursement cycle.',
      },
      {
        id: 'expense-q2',
        question: 'What is "spend management" and how does it differ from expense management?',
        options: [
          'Spend management only tracks travel expenses',
          'Spend management encompasses all company spending (cards, invoices, subscriptions, procurement) while expense management focuses on employee purchases',
          'Spend management is a government regulation',
          'There is no difference — they are the same thing',
        ],
        correctIndex: 1,
        explanation: 'Expense management traditionally focuses on employee purchases and reimbursement. Spend management is broader — it encompasses all company outflows including vendor payments, SaaS subscriptions, procurement, and corporate card spending in a unified view.',
      },
    ],
  },
  {
    topicSlug: 'b2b-payments',
    topicTitle: 'B2B Payments',
    theme: 'Moving Money',
    questions: [
      {
        id: 'b2b-q1',
        question: 'Why are B2B payments more complex than consumer payments?',
        options: [
          'Businesses use different internet protocols',
          'B2B involves invoicing, approval workflows, payment terms (net-30/60/90), tax compliance, and reconciliation at scale',
          'B2B payments can only be made by check',
          'Business bank accounts have lower transaction limits',
        ],
        correctIndex: 1,
        explanation: 'B2B payments involve purchase orders, multi-level approvals, trade credit terms (net-30 means pay within 30 days), three-way matching (PO, invoice, receipt), tax compliance across jurisdictions, and reconciliation of thousands of invoices — far more complex than a consumer card swipe.',
      },
      {
        id: 'b2b-q2',
        question: 'Why do many businesses still use paper checks for B2B payments?',
        options: [
          'Checks are the fastest payment method available',
          'Checks provide float (payment delay), leave a paper trail, and changing payment processes requires significant internal effort',
          'Electronic payments are illegal for B2B transactions',
          'Checks have lower fees than all electronic alternatives',
        ],
        correctIndex: 1,
        explanation: 'Despite inefficiency, checks persist in B2B because they provide float (money stays in the payer\'s account until the check clears), AP teams are familiar with the process, and migrating to electronic payments requires updating vendor records, internal systems, and approval workflows.',
      },
    ],
  },
  {
    topicSlug: 'marketplaces',
    topicTitle: 'Marketplaces',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'marketplaces-q1',
        question: 'What is the key payment challenge unique to marketplace platforms?',
        options: [
          'Processing transactions in multiple currencies',
          'Splitting payments between the platform and multiple sellers while handling compliance for money transmission',
          'Accepting cryptocurrency as payment',
          'Offering free shipping on all orders',
        ],
        correctIndex: 1,
        explanation: 'Marketplaces must split customer payments between multiple sellers (minus platform fees), handle seller onboarding/KYC, manage refunds across parties, and navigate money transmission regulations — since they\'re holding and distributing funds on behalf of others.',
      },
      {
        id: 'marketplaces-q2',
        question: 'Why do marketplace platforms often use a Payment Facilitator (PayFac) model?',
        options: [
          'PayFac eliminates all payment processing fees',
          'PayFac allows the platform to onboard sellers quickly under its own merchant account without each seller needing their own merchant agreement',
          'PayFac is required by law for all marketplaces',
          'PayFac provides free fraud protection',
        ],
        correctIndex: 1,
        explanation: 'The PayFac model lets marketplaces onboard sellers in minutes (instead of the days/weeks a traditional merchant account requires). The platform acts as the master merchant and takes responsibility for its sub-merchants\' compliance and risk.',
      },
    ],
  },
  {
    topicSlug: 'acceptance-environments',
    topicTitle: 'Acceptance Environments',
    theme: 'Foundations',
    questions: [
      {
        id: 'acceptance-q1',
        question: 'What is the difference between card-present (CP) and card-not-present (CNP) transactions?',
        options: [
          'CP transactions are faster; CNP transactions are slower',
          'CP transactions involve a physical card at a terminal; CNP transactions are remote (online, phone, mail)',
          'CP transactions are free; CNP transactions have fees',
          'CP and CNP are different card types, not transaction types',
        ],
        correctIndex: 1,
        explanation: 'Card-present (CP) means the physical card interacts with a terminal (tap, dip, swipe). Card-not-present (CNP) means the card is used remotely — e-commerce, phone orders, recurring charges. CNP has higher fraud risk and higher interchange rates.',
      },
      {
        id: 'acceptance-q2',
        question: 'Why do card-not-present transactions generally have higher interchange rates?',
        options: [
          'CNP transactions require more bandwidth',
          'CNP transactions carry higher fraud risk since the physical card isn\'t verified',
          'CNP merchants earn higher revenue per transaction',
          'Card networks prefer to process in-store transactions',
        ],
        correctIndex: 1,
        explanation: 'Without the physical card present, there\'s no chip cryptogram or PIN to verify — making CNP transactions riskier. Higher interchange compensates issuers for bearing this increased fraud risk. This is why online merchants pay more in processing fees.',
      },
    ],
  },
  {
    topicSlug: 'crypto-and-defi',
    topicTitle: 'Crypto & DeFi',
    theme: 'Non-Card Payments',
    questions: [
      {
        id: 'crypto-q1',
        question: 'How do crypto payment cards (like those from Coinbase or Crypto.com) work with traditional card networks?',
        options: [
          'They bypass card networks and send crypto directly to merchants',
          'They convert cryptocurrency to fiat currency at the time of purchase and settle through Visa/Mastercard as a normal card transaction',
          'They require merchants to accept cryptocurrency directly',
          'They use a separate blockchain-based card network',
        ],
        correctIndex: 1,
        explanation: 'Crypto cards sit on top of traditional card rails (usually Visa). When you pay, the card provider sells your crypto, converts it to fiat, and the transaction settles through the card network like any other card purchase. The merchant receives regular fiat currency.',
      },
      {
        id: 'crypto-q2',
        question: 'What are stablecoins and why are they relevant to payments?',
        options: [
          'Cryptocurrencies whose value is pegged to a stable asset (like USD), enabling crypto payments without price volatility',
          'Traditional currencies stored on a blockchain',
          'Cryptocurrencies that can only increase in value',
          'Government-issued digital currencies',
        ],
        correctIndex: 0,
        explanation: 'Stablecoins (USDC, USDT, etc.) maintain a 1:1 peg to fiat currencies, solving crypto\'s volatility problem for payments. They enable near-instant, low-cost transfers on blockchain rails while maintaining a stable value — making them practical for everyday payments and cross-border transfers.',
      },
    ],
  },
  {
    topicSlug: 'cash-and-atm',
    topicTitle: 'Cash & ATM',
    theme: 'Non-Card Payments',
    questions: [
      {
        id: 'cash-atm-q1',
        question: 'Why does cash remain important in the payments ecosystem despite digital alternatives?',
        options: [
          'Cash transactions are faster than card transactions',
          'Cash is universally accessible, doesn\'t require technology or bank accounts, and provides financial privacy',
          'Cash is more secure than digital payments',
          'Cash transactions have lower fees for merchants',
        ],
        correctIndex: 1,
        explanation: 'Cash serves the unbanked and underbanked populations who lack bank accounts or cards. It works without electricity, internet, or devices, provides transaction privacy, and settles instantly. Many jurisdictions have "right to pay cash" laws recognizing these benefits.',
      },
      {
        id: 'cash-atm-q2',
        question: 'Who earns revenue from ATM surcharge fees?',
        options: [
          'The card network that routes the transaction',
          'The ATM owner/operator charges the fee for providing cash access',
          'The cardholder\'s issuing bank',
          'The Federal Reserve',
        ],
        correctIndex: 1,
        explanation: 'ATM surcharges are set by and paid to the ATM owner/operator — which could be a bank, independent ATM deployer, or retailer. This fee (typically $2-4) compensates for the cost of maintaining the machine, cash replenishment, and connectivity.',
      },
    ],
  },
  {
    topicSlug: 'electronic-money-institutions',
    topicTitle: 'Electronic Money Institutions',
    theme: 'Non-Card Payments',
    questions: [
      {
        id: 'emi-q1',
        question: 'What distinguishes an Electronic Money Institution (EMI) from a traditional bank?',
        options: [
          'EMIs can issue electronic money and payment instruments but cannot lend or pay interest on deposits',
          'EMIs are unregulated financial entities',
          'EMIs can only operate in one country',
          'EMIs provide all the same services as banks with fewer requirements',
        ],
        correctIndex: 0,
        explanation: 'EMIs are licensed to issue electronic money (e-wallets, prepaid cards) and provide payment services, but unlike banks, they cannot lend customer funds or pay interest. Customer funds must be safeguarded (ring-fenced), not used for the EMI\'s own purposes.',
      },
    ],
  },
  {
    topicSlug: 'credit-card-as-a-service',
    topicTitle: 'Credit Card as a Service',
    theme: 'Products & Use Cases',
    questions: [
      {
        id: 'ccaas-q1',
        question: 'What is "Credit Card as a Service" (CCaaS)?',
        options: [
          'A way for consumers to share their credit cards with others',
          'A platform that enables companies to launch branded credit card programs without becoming a bank or building the infrastructure themselves',
          'A credit card with a monthly subscription fee instead of interest',
          'A government program providing credit cards to underserved populations',
        ],
        correctIndex: 1,
        explanation: 'CCaaS platforms provide the full stack needed to launch a credit card: issuer processor, bank partnership, compliance, underwriting, and servicing. Companies like airlines, retailers, or fintechs can launch branded credit cards using APIs rather than building from scratch.',
      },
    ],
  },
];

export function getQuizBySlug(slug: string): TopicQuiz | undefined {
  return quizzes.find((q) => q.topicSlug === slug);
}

export function getAllQuizSlugs(): string[] {
  return quizzes.map((q) => q.topicSlug);
}

export function getAllQuizzes(): TopicQuiz[] {
  return quizzes;
}
