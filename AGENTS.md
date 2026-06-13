# AGENTS.md — halal-competitions

Briefing for AI agents working in this repo.

## What this app is

A Nuxt 4 SPA for tracking Islamic competition metrics (dhikr, mindful minutes, charity, fitness) with weekly leaderboards and personal dashboards. Users log in via Firebase Auth, increment counters on a dashboard, and compare scores with others.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Nuxt 4 (SPA — `ssr: false`) |
| State | Pinia 3 via `@pinia/nuxt` |
| Routing | Nuxt file-based routing (`pages/`) |
| Backend | Firebase 11 (modular Auth + Firestore + Analytics) |
| Styling | Tailwind CSS 3 via `@nuxtjs/tailwindcss` |
| UI | Headless UI, Heroicons |
| Deploy | Netlify static (`.output/public`, SPA redirect in `netlify.toml`) |
| PWA | `register-service-worker` via `plugins/pwa.client.js` (SW generation pending — see `UPGRADES-TODO.md`) |

**Do not upgrade major dependencies without explicit approval.** See `UPGRADES-TODO.md` for planned migrations.

## Commands

```bash
npm install          # install deps
npm run dev          # nuxt dev — dev server (hot reload)
npm run build        # nuxt generate — static output to .output/public
npm run preview      # nuxt preview — preview production build locally
npm run lint         # ESLint
npm run test:unit    # Vitest unit tests
```

Always run `npm run lint` after substantive changes. Run relevant tests when touching tested code.

## Project structure

```
pages/             # File-based routes (dashboard, stats, login, etc.)
layouts/           # App shell (default.vue wraps nav + page slot)
components/        # Reusable UI
  dashboard/       # Counter UI, carousel, tables
  leaderboards/    # Results/challenge tables
  nav/             # Navigation
  alerts/          # In-app alerts
  shared/          # BaseAlert*, shared primitives
  helpers/         # loader, page heading
  tabs/            # Competition tab switcher
stores/            # Pinia stores (user, logger, race, result, tab, nav)
composables/       # Composition API helpers (prefer for new logic)
plugins/           # Client plugins (firebase, auth, pwa)
middleware/        # Route middleware (auth, anon, close-menu.global)
service/           # Firestore service classes (Logger.js)
utils/             # firebase.js, LocalStorage wrapper, date helpers
data.js            # Static competition/counter definitions
nuxt.config.ts     # Nuxt config (modules, css, nitro preset)
app.vue            # Root: <NuxtLayout><NuxtPage /></NuxtLayout>
```

There is no `src/` directory. The `@/` alias resolves to the project root.

## Vue conventions

**Prefer Composition API** with `<script setup>` for new components and when significantly editing existing ones.

Pages are already on `<script setup>`. Some components still use Options API (`data`, `computed`, `mapStores`). When touching a file:

- New components → Composition API + composables
- Small edits to Options API files → OK to leave as-is unless refactoring that area
- Shared logic → extract to `composables/`

Nuxt auto-imports Vue APIs (`ref`, `computed`, `onMounted`), composables, components, and Pinia stores (`useLoggerStore`, etc.). Manual imports are fine where clarity helps; remove redundant ones when editing nearby code.

Existing Composition API examples: `IncrementButton.vue`, `IncrementSlide.vue`, `composables/isIncrement.js`.

## Pinia stores

| Store | File | Role |
|-------|------|------|
| `User` | `stores/user.js` | Firebase auth, login/register/logout |
| `Logger` | `stores/logger.js` | User's weekly counters, increment/save, UI prefs |
| `Race` | `stores/race.js` | All racers' scores for current week (leaderboard targets) |
| `Result` | `stores/result.js` | Last week's results, challenge totals |
| `Tab` | `stores/tab.js` | Active competition tab (`dhikr`, `mindful`, etc.) |
| `Nav` | `stores/nav.js` | Mobile menu state |

Usage: `useLoggerStore().loadDashboard()` in composables or `<script setup>` pages. Options API components may still use `mapStores(useLoggerStore)`.

Competition list: import `competitionsJSON` from `data.js` (not a store).

## Data model

### Static config (`data.js`)

- `competitionsJSON` — competition groups with counter definitions
- `competitionKeys` — flat lookup: counter id → `{ competition, title, arabic? }`

Competition ids: `dhikr`, `mindful`, `charity`, `fitness`.

### Firestore collections

| Collection | Purpose |
|------------|---------|
| `users` | `{ userid, username }` — created on register |
| `loggers` | Weekly log docs: `{ userid, username, loggers: { counterId: count }, created, lastUpdated }` |

Week boundaries use Monday–Sunday (`utils.js` → `dateRange()`, `dateRangeLastWeek()`).

### LocalStorage keys (`utils/LocalStorage.js`)

`increment-count`, `language`, `activeTabId`, `carousel-mode`

## Auth flow

1. Firebase initialized in `utils/firebase.js` (modular v9+ API); Analytics loaded in `plugins/firebase.client.js`
2. `plugins/auth.client.js` — `onAuthStateChanged` syncs user to Pinia, loads dashboard/stats on auth, redirects `/` → `/dashboard`
3. `middleware/auth.js` — protects routes; skips on server (`import.meta.server`); redirects unauthenticated users to `/login`
4. `middleware/anon.js` — redirects logged-in users away from login/register
5. Pages declare middleware via `definePageMeta({ middleware: 'auth' })` or `{ middleware: 'anon' }`

Protected routes: `/dashboard`, `/stats` (via `auth` middleware).

## Key user flows

- **Dashboard** — `loggerStore.loadDashboard()` → fetch/create weekly doc → increment counters (debounced save via `isIncrement` composable)
- **Stats** — `loggerStore.loadStats()` → all historical weekly docs for user
- **Results** — `resultStore.loadResults()` → last week's leaderboard
- **Challenges** — `resultStore.loadChallenges()` → current week totals

## Component naming

- PascalCase for multi-word components in imports
- Some legacy kebab-case in templates (`<competitions-tabs>`)
- `Base*` prefix for shared building blocks (`BaseIncrement`, `BaseAlert`)

## Coding principles for agents

1. **Minimize scope** — small, focused diffs; no drive-by refactors
2. **Match existing patterns** — Pinia store shape, Tailwind utility classes, `@/` path alias
3. **Reuse before creating** — check `components/shared/`, `composables/`, existing store actions
4. **Don't break the weekly cycle** — date range logic in `utils.js` affects queries across Logger, Race, Result
5. **Client-only Firebase** — auth middleware and Firebase plugins run client-side; guard with `import.meta.server` / `.client.js` suffix where needed
6. **Known TODOs in code** — duplicate username on register, auto-reset listener on new week (see inline comments)

## Firebase emulator (optional dev)

Not wired up yet. Emulator hooks lived in the old `main.js`; see `UPGRADES-TODO.md` to re-enable in `plugins/firebase.client.js`.

## Future work

Planned stack upgrades and tech debt are tracked in **`UPGRADES-TODO.md`**. Do not start upgrade work unless the user explicitly requests it.
