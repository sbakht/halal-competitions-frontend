# AGENTS.md — halal-competitions

Briefing for AI agents working in this repo.

## What this app is

A Vue 3 web app for tracking Islamic competition metrics (dhikr, mindful minutes, charity, fitness) with weekly leaderboards and personal dashboards. Users log in via Firebase Auth, increment counters on a dashboard, and compare scores with others.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Vue 3 (Vite) |
| State | Vuex 4 (modular) |
| Routing | Vue Router 4 |
| Backend | Firebase 8 (Auth + Firestore + Analytics) |
| Styling | Tailwind CSS 3 |
| UI | Headless UI, Heroicons |
| Deploy | Netlify (SPA redirect in `netlify.toml`) |
| PWA | Service worker via `registerServiceWorker.js` |

**Do not upgrade major dependencies without explicit approval.** See `UPGRADES-TODO.md` for planned migrations.

## Commands

```bash
npm install          # install deps
npm run dev          # dev server (hot reload)
npm run build        # production build
npm run preview      # preview production build locally
npm run lint         # ESLint
npm run test:unit    # Vitest unit tests
```

Always run `npm run lint` after substantive changes. Run relevant tests when touching tested code.

## Project structure

```
src/
  views/           # Route-level pages (Dashboard, Stats, Login, etc.)
  components/      # Reusable UI
    dashboard/     # Counter UI, carousel, tables
    leaderboards/  # Results/challenge tables
    nav/           # Navigation
    alerts/        # In-app alerts
    shared/        # BaseAlert*, shared primitives
    helpers/       # loader, page heading
    tabs/          # Competition tab switcher
  store/           # Vuex modules (User, Logger, Race, Result, Tab, Nav)
  composables/     # Composition API helpers (prefer for new logic)
  service/         # Firestore service classes (Logger.js)
  utils/           # LocalStorage wrapper, date helpers
  data.js          # Static competition/counter definitions
  router/          # Routes + auth guards
  main.js          # App bootstrap + Firebase init
```

## Vue conventions

**Prefer Composition API** for new components and when significantly editing existing ones. Use `<script setup>` where practical.

Existing code is mostly Options API (`data`, `computed`, `mapGetters`). When touching a file:

- New components → Composition API + composables
- Small edits to Options API files → OK to leave as-is unless refactoring that area
- Shared logic → extract to `src/composables/`

Existing Composition API examples: `IncrementButton.vue`, `IncrementSlide.vue`, `composables/isIncrement.js`.

## Vuex modules

| Module | Namespaced | Role |
|--------|------------|------|
| `User` | no | Firebase auth, login/register/logout |
| `Logger` | yes | User's weekly counters, increment/save, UI prefs |
| `Race` | no | All racers' scores for current week (leaderboard targets) |
| `Result` | no | Last week's results, challenge totals |
| `Tab` | yes | Active competition tab (`dhikr`, `mindful`, etc.) |
| `Nav` | yes | Mobile menu state |

Dispatch pattern: `this.$store.dispatch('Logger/loadDashboard')` or `store.dispatch(...)` in composables.

Root getter: `competitions` → `competitionsJSON` from `data.js`.

## Data model

### Static config (`src/data.js`)

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

1. Firebase initialized in `main.js` with client config (public keys — normal for Firebase web apps)
2. `onAuthStateChanged` syncs user to Vuex, loads dashboard/stats data, redirects `/` → `/dashboard`
3. Router `beforeEach` checks `meta.authRequired` and `meta.anonOnly`
4. Protected routes: `/dashboard`, `/stats`

## Key user flows

- **Dashboard** — `Logger/loadDashboard` → fetch/create weekly doc → increment counters (debounced save via `isIncrement` composable)
- **Stats** — `Logger/loadStats` → all historical weekly docs for user
- **Results** — `Result/loadResults` → last week's leaderboard
- **Challenges** — `Result/loadChallenges` → current week totals

## Component naming

- PascalCase for multi-word components in imports
- Some legacy kebab-case in templates (`<competitions-tabs>`)
- `Base*` prefix for shared building blocks (`BaseIncrement`, `BaseAlert`)

## Coding principles for agents

1. **Minimize scope** — small, focused diffs; no drive-by refactors
2. **Match existing patterns** — Vuex module shape, Tailwind utility classes, `@/` path alias
3. **Reuse before creating** — check `components/shared/`, `composables/`, existing store actions
4. **Don't break the weekly cycle** — date range logic in `utils.js` affects queries across Logger, Race, Result
5. **Known TODOs in code** — duplicate username on register, auto-reset listener on new week (see inline comments)

## Firebase emulator (optional dev)

Commented out in `main.js`:

```js
// db.useEmulator("localhost", 8083);
// firebase.auth().useEmulator('http://localhost:8081/');
```

## Future work

Planned stack upgrades and tech debt are tracked in **`UPGRADES-TODO.md`**. Do not start upgrade work unless the user explicitly requests it.
