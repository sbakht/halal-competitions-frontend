# Upgrades & tech debt

Tracked work for later — **do not start these unless explicitly requested.**

## Major stack upgrades

- [ ] **Vue CLI 4 → Vite** — faster dev/build; requires config migration (`vue.config.js` → `vite.config.js`), env var renames (`VUE_APP_*` → `VITE_*`), index.html move to root
- [ ] **Firebase 8 → modular v9+** — replace `import firebase from "firebase/app"` with tree-shakeable imports; update all Auth/Firestore calls in `main.js`, `User.js`, `Result.js`, `service/Logger.js`
- [ ] **Tailwind PostCSS 7 compat → Tailwind 3+** — drop `@tailwindcss/postcss7-compat`, update `tailwind.config.js` and PostCSS setup
- [ ] **Vuex 4 → Pinia** — optional; would simplify state for Composition API; migrate module-by-module (`User`, `Logger`, `Race`, `Result`, `Tab`, `Nav`)
- [ ] **axios 0.21 → current** — if still needed after Firebase migration (audit usage first)
- [ ] **core-js 2 → 3** — likely resolved by Vite migration and modern browserslist

## Composition API migration

- [ ] Migrate `views/` from Options API to `<script setup>` (Dashboard, Stats, Login, Register, etc.)
- [ ] Migrate remaining `components/` still on Options API
- [ ] Extract repeated Vuex `mapGetters`/`mapActions` into composables (e.g. `useLogger`, `useAuth`)
- [ ] Add composables for date/week logic currently in `utils.js` + store getters

## Firebase & data

- [ ] Move Firebase config to env vars (`VITE_FIREBASE_*`) — still client-side but easier per-environment
- [ ] Prevent duplicate usernames on register (`User.js` TODO)
- [ ] Auto-reset / new-week listener for loggers (`Logger.js` TODO)
- [ ] Clean up commented debug code in `Result.js`
- [ ] Re-enable or document Firebase emulator workflow for local dev

## Testing & quality

- [ ] Expand unit test coverage beyond `tests/unit/example.spec.js`
- [ ] Add component tests for increment flow and auth guards
- [ ] Consider E2E (Playwright/Cypress) for login → dashboard → increment → save

## UX & features (product backlog)

- [ ] Password reset flow
- [ ] Profile / username edit
- [ ] Offline support improvements (PWA already registered)

## Notes

- Upgrade order recommendation: **Vite first** (tooling), then **Firebase modular**, then **Tailwind 3**, then **Pinia** (if desired)
- Each upgrade should be its own PR with app verified via `npm run serve`, `lint`, and `test:unit`
- Composition API migration can happen incrementally alongside feature work — no big-bang required
