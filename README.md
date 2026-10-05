# Devin Test UI

A small React + TypeScript app built to exercise Devin end-to-end: scaffolding a project, writing unit and E2E tests, running them, and opening a PR.

## Stack

- [Vite 5](https://vitejs.dev/) + React 18 + TypeScript
- [Vitest](https://vitest.dev/) + React Testing Library (unit/component tests, jsdom)
- [Playwright](https://playwright.dev/) (browser E2E tests, Chromium)
- ESLint 9 (flat config) + typescript-eslint
- GitHub Actions CI (`.github/workflows/ci.yml`)

## Features under test

| Component | Behavior |
|-----------|----------|
| `Counter` | increment / decrement / reset, min & max bounds disable buttons |
| `TodoList` | add (blank input ignored), toggle complete, filter all/active/completed, delete, "N items left" |
| `LoginForm` | email format + password length (>= 8) validation, welcome message on success |

## Getting started

Requires Node 20 (see `.nvmrc`).

```bash
npm ci
npx playwright install --with-deps chromium   # first time only
npm run dev            # http://localhost:5173
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b` |
| `npm test` | Vitest unit/component tests |
| `npm run test:coverage` | Vitest with v8 coverage |
| `npm run test:e2e` | Playwright E2E (starts the dev server automatically) |
| `npm run build` | Type-check and production build |

## Layout

```
src/
  components/   Counter, TodoList, LoginForm + *.test.tsx
  utils/        validation.ts + test
  test/setup.ts jest-dom matchers
e2e/app.spec.ts Playwright scenarios
```

See [TESTING_NOTES.md](./TESTING_NOTES.md) for the test results, issues found, and limitations.
