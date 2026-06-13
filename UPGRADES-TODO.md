# Upgrades & tech debt

Tracked work for later — **do not start these unless explicitly requested.**

## Major stack upgrades

- [x] **Vue CLI 4 → Vite** — migrated to `vite.config.js`, root `index.html`, `import.meta.env`
- [ ] **Firebase 8 → modular v9+** — replace `import firebase from "firebase/app"` with tree-shakeable imports; update all Auth/Firestore calls in `main.js`, `stores/user.js`, `stores/result.js`, `service/Logger.js`
- [x] **Tailwind PostCSS 7 compat → Tailwind 3+** — done as part of Vite migration
- [x] **Vuex 4 → Pinia** — migrated to `src/stores/` with `defineStore`
- [ ] **axios 0.21 → current** — if still needed after Firebase migration (audit usage first)
- [x] **core-js 2 → 3** — removed; Vite targets modern browsers

## Composition API migration

- [ ] Migrate `views/` from Options API to `<script setup>` (Dashboard, Stats, Login, Register, etc.)
- [ ] Migrate remaining `components/` still on Options API
- [ ] Extract repeated Pinia usage into composables (e.g. `useLogger`, `useAuth`)
- [ ] Add composables for date/week logic currently in `utils.js` + store getters

## Firebase & data

- [ ] Move Firebase config to env vars (`VITE_FIREBASE_*`) — still client-side but easier per-environment
- [ ] Prevent duplicate usernames on register (`stores/user.js` TODO)
- [ ] Auto-reset / new-week listener for loggers (`stores/logger.js` TODO)
- [ ] Clean up commented debug code in `stores/result.js`
- [ ] Re-enable or document Firebase emulator workflow for local dev

## Testing & quality

- [ ] Expand unit test coverage beyond `tests/unit/example.spec.js`
- [ ] Add component tests for increment flow and auth guards
- [ ] Consider E2E (Playwright/Cypress) for login → dashboard → increment → save

## PWA

- [ ] Add `vite-plugin-pwa` to generate `service-worker.js` (registration exists in `registerServiceWorker.js` but no SW is built today)

## UX & features (product backlog)

- [ ] Password reset flow
- [ ] Profile / username edit
- [ ] Offline support improvements (PWA already registered)

## Notes

- Upgrade order recommendation: **Firebase modular** next
- Each upgrade should be its own PR with app verified via `npm run dev`, `lint`, and `test:unit`
- Composition API migration can happen incrementally alongside feature work — no big-bang required
