import { getCollection } from 'astro:content';

export const themes = [
  {
    name: 'Foundations',
    description: 'Core concepts that underpin the entire payments ecosystem.',
  },
  {
    name: 'Transaction Lifecycle',
    description: 'Follow a payment from initiation to final settlement.',
  },
  {
    name: 'Card Ecosystem',
    description: 'The networks, banks, and economics behind every card payment.',
  },
  {
    name: 'Non-Card Payments',
    description: 'Payment methods beyond plastic — from bank transfers to crypto.',
  },
  {
    name: 'Moving Money',
    description: 'How funds travel across borders, banks, and networks.',
  },
  {
    name: 'Products & Use Cases',
    description: 'Real-world applications built on payments infrastructure.',
  },
  {
    name: 'Trust & Compliance',
    description: 'The rules, risks, and safeguards that keep payments secure.',
  },
];

export const themeNames = themes.map((t) => t.name);

export async function getTopicsByTheme() {
  const allTopics = await getCollection('topics');
  const topicsByTheme = new Map<string, typeof allTopics>();

  for (const topic of allTopics) {
    const theme = topic.data.theme;
    if (!topicsByTheme.has(theme)) {
      topicsByTheme.set(theme, []);
    }
    topicsByTheme.get(theme)!.push(topic);
  }

  for (const [, topics] of topicsByTheme) {
    topics.sort((a, b) => a.data.order - b.data.order);
  }

  return { allTopics, topicsByTheme };
}
