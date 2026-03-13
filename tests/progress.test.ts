import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createDefaultProgress,
  formatDayKey,
  loadProgress,
  saveMicroLearningResult,
  updateStreak,
} from '../src/data/progress.ts';

function installLocalStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem(key: string) {
        return store.has(key) ? store.get(key)! : null;
      },
      setItem(key: string, value: string) {
        store.set(key, value);
      },
      removeItem(key: string) {
        store.delete(key);
      },
      clear() {
        store.clear();
      },
    },
  });

  return store;
}

test('loadProgress migrates legacy microLessonsCompleted data', () => {
  installLocalStorage({
    'fa-progress': JSON.stringify({
      version: 1,
      topicsRead: {},
      quizResults: {},
      microLessonsCompleted: { authorization: 123 },
      streak: { currentStreak: 0, longestStreak: 0, lastVisitDate: '' },
    }),
  });

  const state = loadProgress();
  assert.deepEqual(state.microLearningCompleted.authorization, {
    completedAt: 123,
    quizScore: 0,
    quizTotal: 0,
  });
});

test('updateStreak increments consecutive-day visits', () => {
  const state = createDefaultProgress();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  state.streak.lastVisitDate = formatDayKey(yesterday);

  updateStreak(state);

  assert.equal(state.streak.currentStreak, 1);
  assert.equal(state.streak.longestStreak, 1);
});

test('saveMicroLearningResult stores completion metadata', () => {
  const store = installLocalStorage();

  saveMicroLearningResult('authorization', 3, 4);

  const saved = JSON.parse(store.get('fa-progress') ?? '{}');
  assert.equal(saved.microLearningCompleted.authorization.quizScore, 3);
  assert.equal(saved.microLearningCompleted.authorization.quizTotal, 4);
});
