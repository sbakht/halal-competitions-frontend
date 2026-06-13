# Upgrades & tech debt

Tracked work for later — **do not start these unless explicitly requested.**

## Major stack upgrades

- [x] **Vue CLI 4 → Vite** — migrated to `vite.config.js`, root `index.html`, `import.meta.env`
- [x] **Vue 3 + Vite → Nuxt 4 (SPA)** — `ssr: false`, file-based routing in `pages/`, Pinia via `@pinia/nuxt`, Tailwind via `@nuxtjs/tailwindcss`, static deploy to `.output/public`
- [x] **Firebase 8 → modular v9+** — migrated to Firebase 11 modular API; tree-shakeable imports in `utils/firebase.js`, `plugins/`, `stores/user.js`, `stores/result.js`, `service/Logger.js`, `utils.js`
- [x] **Tailwind PostCSS 7 compat → Tailwind 3+** — done as part of Vite migration; now wired via `@nuxtjs/tailwindcss`
- [x] **Vuex 4 → Pinia** — migrated to `stores/` with `defineStore` (Pinia 3 via `@pinia/nuxt`)
- [x] **axios 0.21 → current** — audited; zero usage; removed from dependencies
- [x] **core-js 2 → 3** — removed; modern browser targets

## Post-Nuxt migration (do next)

Cleanup and Nuxt-native patterns now that the app no longer uses `src/`, Vue Router, or Vite directly.

### Docs & config

- [x] Update `AGENTS.md` and `.cursor/rules/` — replace `src/` paths, Vue Router guards, `main.js`, and Vite commands with Nuxt layout (`pages/`, `plugins/`, `middleware/`, `nuxt dev` / `nuxt generate`)
- [ ] Move Firebase config to env vars (`NUXT_PUBLIC_FIREBASE_*` in `.env` + `runtimeConfig` in `nuxt.config.ts`) — replace hardcoded keys in `plugins/firebase.client.js`
- [ ] Replace hand-rolled ESLint Nuxt globals in `package.json` with `@nuxt/eslint` (or `@nuxt/eslint-module`)

### Nuxt conventions

- [ ] Lean on auto-imports — remove redundant manual imports of `components/`, `composables/`, and `stores/` where Nuxt already provides them
- [x] Migrate `pages/` from Options API (+ dual `<script setup>` blocks) to `<script setup>` (Dashboard, Stats, Login, Register, etc.)
- [ ] Extract auth logic into composables — e.g. `useAuth()` wrapping `pendingAuth`, login/logout, and route guards; reduce duplication between `plugins/auth.client.js` and `middleware/auth.js`
- [ ] Replace `mounted()` data fetching in pages with composables or, when SSR is enabled later, `useAsyncData` / `await useAsyncData`
- [ ] Rename middleware to `.global.ts` / client-only patterns consistently; document that Firebase middleware must skip on server (`import.meta.server`)

### Firebase & bundle

- [x] Centralize Firebase init — single `utils/firebase.js` imported by plugins/stores instead of scattered `import firebase from 'firebase/app'`
- [ ] Code-split Firebase — dynamic-import auth/firestore in plugins to address the ~770 kB client chunk from the static build
- [ ] Re-enable or document Firebase emulator workflow (`plugins/firebase.client.js` — emulator hooks were in old `main.js`)

### Testing

- [ ] Add `@nuxt/test-utils` and configure Vitest with the Nuxt test environment
- [ ] Add component tests for increment flow and auth middleware (`auth`, `anon`)
- [ ] Consider E2E (Playwright) for login → dashboard → increment → save

### PWA

- [ ] Add `@vite-pwa/nuxt` (replaces old `vite-plugin-pwa` plan) — `plugins/pwa.client.js` registers a SW but none is generated yet
- [ ] Remove `register-service-worker` dependency once `@vite-pwa/nuxt` handles registration

### Deploy & SSR (later)

- [ ] Verify Netlify build: publish `.output/public`, keep SPA fallback redirect in `netlify.toml`
- [ ] **SSR / hybrid rendering** (separate effort) — enable per-route SSR, guard Firebase/localStorage with `import.meta.client`, switch to `@netlify/nuxt` or edge adapter, add loading states for client-fetched data

## Composition API migration

- [ ] Migrate `pages/` from Options API to `<script setup>` (Dashboard, Stats, Login, Register, etc.)
- [ ] Migrate remaining `components/` still on Options API
- [ ] Extract repeated Pinia usage into composables (e.g. `useLogger`, `useAuth`)
- [ ] Add composables for date/week logic currently in `utils.js` + store getters

## Firebase & data

- [ ] Move Firebase config to env vars (`NUXT_PUBLIC_FIREBASE_*`) — still client-side but easier per-environment
- [ ] Prevent duplicate usernames on register (`stores/user.js` TODO)
- [ ] Auto-reset / new-week listener for loggers (`stores/logger.js` TODO)
- [ ] Clean up commented debug code in `stores/result.js`
- [ ] Re-enable or document Firebase emulator workflow for local dev

## Testing & quality

- [ ] Expand unit test coverage beyond `tests/unit/example.spec.js`
- [ ] Add component tests for increment flow and auth guards
- [ ] Consider E2E (Playwright/Cypress) for login → dashboard → increment → save

## PWA

- [ ] Add `@vite-pwa/nuxt` to generate `service-worker.js` (registration in `plugins/pwa.client.js` but no SW is built today)

## UX & features (product backlog)

- [ ] Password reset flow
- [ ] Profile / username edit
- [ ] Offline support improvements (PWA already registered)

## Notes

- Upgrade order recommendation: **Firebase env vars + modular v9** next, then Composition API / composables cleanup
- Each upgrade should be its own PR with app verified via `npm run dev`, `lint`, and `test:unit`
- Composition API migration can happen incrementally alongside feature work — no big-bang required
- Nuxt migration is SPA-only (`ssr: false`); SSR is explicitly deferred — see Post-Nuxt migration → Deploy & SSR
