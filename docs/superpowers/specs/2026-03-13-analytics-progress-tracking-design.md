# Analytics & Individual Progress Tracking — Design Spec

## Context

FintechAcademy is a static Astro site deployed on Vercel. All learner progress is currently stored in the browser's `localStorage` under the key `fa-progress`. There is no backend, no auth, and no way for an admin to see how individual learners are progressing or how the site is being used.

**Goal:** Add PostHog for usage analytics and Supabase for individual progress tracking, so the site owner can see per-person completion data and cohort-level usage patterns — without disrupting the existing anonymous browsing experience.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Learner audience | Small known cohort (<50) | Internal team / training participants |
| Auth method | Magic link via email | No passwords, Supabase handles email delivery |
| Admin view | PostHog dashboards + Supabase table viewer | No custom admin UI to build or maintain |
| Anonymous access | Site works fully without login | Login is optional; localStorage still works for anonymous users |
| Sync direction | One-way: localStorage → Supabase | Simpler; cross-device sync can be added later |

## Architecture

### PostHog (Usage Analytics)

PostHog is installed via the `posthog-js` npm package (not a raw script tag) for better Astro/Vite integration. It is initialized in `src/lib/posthog.ts` and loaded lazily from a `<script>` in `BaseLayout.astro`. It auto-captures page views, sessions, device info, and referrers for every visitor.

Custom events are fired from `progress.ts` when learners take actions:

| Event | Properties | Triggered by | When |
|---|---|---|---|
| `topic_read` | `slug` | `markTopicRead()` | Only on first read (when the slug is new to `topicsRead`) |
| `quiz_completed` | `slug`, `score`, `total`, `passed` | `saveQuizResult()` | Every attempt (retakes are intentional engagement data) |
| `micro_learning_completed` | `slug`, `quizScore`, `quizTotal` | `saveMicroLearningResult()` | Every completion (retakes are intentional) |

The `topic_read` event is guarded by the existing `if (!state.topicsRead[slug])` check — it only fires on first visit, not on re-reads. Quiz and micro learning events fire on every completion since retake data is valuable for engagement analysis.

When a user logs in via Supabase, `posthog.identify(email)` is called to link their anonymous session to their identity.

**Admin dashboards (built in PostHog UI, no code):**
- Page views per page, unique visitors, session duration, bounce rate
- Custom funnels (e.g., topic_read → micro_learning_completed)
- Cohort overview (% of users who completed N quizzes this week)
- Drop-off analysis (which topics/quizzes have lowest completion)

### Supabase Auth (Magic Link)

**Flow:**
1. "Sign in" button in the site header (next to theme toggle). On mobile, it also appears in the mobile menu.
2. Click opens a modal with email input and "Send magic link" button
3. Supabase sends the email with a redirect URL pointing back to the site root (`https://fintechacademy.panasatech.com/`). Supabase's JS SDK automatically reads the auth token from the URL hash on page load — no dedicated callback route needed.
4. Header shows email and "Sign out" option
5. Auth state persisted by Supabase client SDK (survives page refreshes)

**Access control:**
- An `allowed_users` table in Supabase contains pre-approved emails
- Client-side check: after Supabase authenticates the user, the client queries `allowed_users` to verify the email exists. If not found, the client signs the user out immediately and shows a "not authorized" message. This is enforced by RLS: the `user_progress` table's insert/update policy requires the user's email to exist in `allowed_users`, so even if someone bypasses the client check, they cannot write progress data.
- The site itself remains fully accessible without login — auth is optional

**Astro SSG note:** `AuthButton.astro` renders a static HTML shell (button + modal markup). A `<script>` tag in the component handles all auth logic client-side at runtime — no framework component or `client:load` directive needed. This follows the same pattern used by other interactive components in the codebase (Quiz, MicroLearningDeck).

### Progress Sync to Supabase

**Database schema — `user_progress` table:**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | Supabase auth user ID |
| `email` | text | User's email |
| `progress` | jsonb | Full `ProgressState` object |
| `updated_at` | timestamptz | Auto-updated on upsert |
| `created_at` | timestamptz | Auto-set on insert |

One row per user. The `progress` JSONB column stores the same shape as localStorage: `topicsRead`, `quizResults`, `microLearningCompleted`, `streak`.

**Sync mechanism:**
- `progress.ts` gains a `syncToSupabase()` function
- Each existing save function (`markTopicRead`, `saveQuizResult`, `saveMicroLearningResult`) calls `syncToSupabase()` after the localStorage write
- `syncToSupabase()` checks for a Supabase session. If none (anonymous user), it returns immediately
- If logged in, it upserts the full `ProgressState` to the `user_progress` table
- Fire-and-forget: network failures are silently ignored; localStorage always has the data

**Row Level Security (RLS):**
- Each user can only read/write their own row
- Admin sees all rows via Supabase dashboard

### Admin Visibility

**PostHog (usage patterns + cohort analysis):**
- Auto-captured page analytics
- Custom event funnels and retention charts
- Cohort-level completion metrics

**Supabase table viewer (per-person progress):**
- Open `user_progress` table in Supabase dashboard
- See every logged-in user: email, last update, full progress JSON
- Filter: "users with <10 topics read", "users inactive for 7+ days"
- Click a row to see exactly which topics read, quizzes passed/failed, streak data

## File Changes

### New Files

| File | Purpose |
|---|---|
| `src/lib/supabase.ts` | Supabase client initialization (project URL + anon key from env vars) |
| `src/lib/posthog.ts` | PostHog helpers: `trackEvent()` wrapper, `identifyUser()` |
| `src/components/AuthButton.astro` | Sign in/out button with magic link modal |
| `src/lib/sync.ts` | `syncToSupabase()` — upserts progress for logged-in users. Imported by `progress.ts`. |

### Modified Files

| File | Change |
|---|---|
| `src/layouts/BaseLayout.astro` | Add PostHog `<script>` snippet |
| `src/components/Header.astro` | Add `<AuthButton />` next to theme toggle |
| `src/data/progress.ts` | Add `trackEvent()` call in each save function; call `syncToSupabase()` after localStorage write |

### Unchanged

Quiz.astro, MicroLearningDeck.astro, TopicLayout.astro, ProgressDashboard.astro, and all other components remain unchanged. Integration flows through `progress.ts` which they already call.

### External Setup (not code)

1. Create PostHog project → get API key
2. Create Supabase project → get URL + anon key
3. Create `user_progress` table with schema above
4. Create `allowed_users` table: `email` (text, primary key, unique), `name` (text, optional, for admin context), `added_at` (timestamptz, default `now()`)
5. Set up RLS policies on `user_progress` (require user's email to exist in `allowed_users` for insert/update)
7. Add env vars to Vercel: `PUBLIC_POSTHOG_KEY`, `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`

## Environment Variables

| Variable | Source | Sensitive? |
|---|---|---|
| `PUBLIC_POSTHOG_KEY` | PostHog project settings | No (public API key) |
| `PUBLIC_SUPABASE_URL` | Supabase project settings | No (public URL) |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings | No (public anon key, RLS enforces security) |

All three are safe for client-side use. Security is enforced by PostHog's project isolation and Supabase's Row Level Security — not by keeping these keys secret.

## Verification

1. **Anonymous browsing:** Visit the site without logging in. All features work. Progress saves to localStorage. PostHog captures page views (anonymous).
2. **Login flow:** Click "Sign in" → enter approved email → receive magic link → click → redirected back, now logged in. Header shows email.
3. **Unapproved email:** Enter an email not in `allowed_users` → get "not authorized" message. Site still fully usable.
4. **Progress sync:** Log in → read a topic → check Supabase `user_progress` table → row appears with correct progress JSON.
5. **PostHog events:** Read a topic, complete a quiz, finish micro learning → check PostHog → custom events appear with correct properties. After login, events are linked to email identity.
6. **PostHog dashboards:** Build a funnel in PostHog UI (topic_read → quiz_completed) → data populates correctly.
7. **Supabase admin view:** Open `user_progress` table → see all logged-in users' progress. Filter by JSON fields works.
8. **Sign out:** Click "Sign out" → header reverts to "Sign in". Progress still works via localStorage but no longer syncs to Supabase.
9. **Build:** `npm run build` passes with no errors. Site deploys to Vercel successfully.
