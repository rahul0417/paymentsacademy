const STORAGE_KEY = 'fa-progress';

export interface QuizResult {
  score: number;
  total: number;
  completedAt: number;
  passed: boolean;
}

export interface MicroLearningResult {
  completedAt: number;
  quizScore: number;
  quizTotal: number;
}

export interface ProgressState {
  version: 1;
  topicsRead: Record<string, number>;
  quizResults: Record<string, QuizResult>;
  microLearningCompleted: Record<string, MicroLearningResult>;
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastVisitDate: string; // "YYYY-MM-DD"
  };
}

export function createDefaultProgress(): ProgressState {
  return {
    version: 1,
    topicsRead: {},
    quizResults: {},
    microLearningCompleted: {},
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastVisitDate: '',
    },
  };
}

export function formatDayKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function todayString(): string {
  const d = new Date();
  return formatDayKey(d);
}

function yesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDayKey(d);
}

function migrateProgress(raw: unknown): ProgressState {
  if (!raw || typeof raw !== 'object') {
    return createDefaultProgress();
  }

  const parsed = raw as Partial<ProgressState> & {
    microLessonsCompleted?: Record<string, number>;
  };

  if (parsed.version !== 1) {
    return createDefaultProgress();
  }

  const state = createDefaultProgress();
  state.topicsRead = parsed.topicsRead ?? {};
  state.quizResults = parsed.quizResults ?? {};
  state.streak = {
    currentStreak: parsed.streak?.currentStreak ?? 0,
    longestStreak: parsed.streak?.longestStreak ?? 0,
    lastVisitDate: parsed.streak?.lastVisitDate ?? '',
  };

  if (parsed.microLearningCompleted) {
    state.microLearningCompleted = parsed.microLearningCompleted;
  } else if (parsed.microLessonsCompleted) {
    state.microLearningCompleted = Object.fromEntries(
      Object.entries(parsed.microLessonsCompleted).map(([slug, completedAt]) => [
        slug,
        { completedAt, quizScore: 0, quizTotal: 0 },
      ]),
    );
  }

  return state;
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultProgress();
    return migrateProgress(JSON.parse(raw));
  } catch {
    return createDefaultProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable or full — silently fail
  }
}

export function updateStreak(state: ProgressState): ProgressState {
  const today = todayString();
  const yesterday = yesterdayString();

  if (state.streak.lastVisitDate === today) {
    return state; // already visited today
  }

  if (state.streak.lastVisitDate === yesterday) {
    state.streak.currentStreak += 1;
  } else {
    state.streak.currentStreak = 1;
  }

  if (state.streak.currentStreak > state.streak.longestStreak) {
    state.streak.longestStreak = state.streak.currentStreak;
  }

  state.streak.lastVisitDate = today;
  return state;
}

export function markTopicRead(slug: string): void {
  const state = loadProgress();
  if (!state.topicsRead[slug]) {
    state.topicsRead[slug] = Date.now();
  }
  updateStreak(state);
  saveProgress(state);
}

export function saveQuizResult(slug: string, score: number, total: number): void {
  const state = loadProgress();
  state.quizResults[slug] = {
    score,
    total,
    completedAt: Date.now(),
    passed: score / total >= 0.6,
  };
  updateStreak(state);
  saveProgress(state);
}

export function saveMicroLearningResult(slug: string, quizScore: number, quizTotal: number): void {
  const state = loadProgress();
  state.microLearningCompleted[slug] = {
    completedAt: Date.now(),
    quizScore,
    quizTotal,
  };
  updateStreak(state);
  saveProgress(state);
}
