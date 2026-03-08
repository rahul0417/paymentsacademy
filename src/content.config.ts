import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topics = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    theme: z.enum([
      'Foundations',
      'Transaction Lifecycle',
      'Card Ecosystem',
      'Non-Card Payments',
      'Moving Money',
      'Products & Use Cases',
      'Trust & Compliance',
    ]),
    readingTime: z.string(),
    order: z.number(),
    relatedTopics: z.array(z.string()).optional(),
    glossaryTerms: z.array(z.object({
      term: z.string(),
      definition: z.string(),
    })).optional(),
  }),
});

export const collections = { topics };
