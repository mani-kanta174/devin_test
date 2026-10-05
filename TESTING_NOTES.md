# Testing notes

## Test scenarios

### Unit / component (Vitest + RTL): 15 tests
- `Counter`: initial value; increment/decrement/reset; min/max bounds disable buttons
- `TodoList`: add + blank input ignored; toggle + remaining count; active/completed filters; delete
- `LoginForm`: invalid email error; short password error; success welcome message
- `validateEmail`: 5 table-driven cases

### E2E (Playwright, Chromium): 4 tests
- Page loads with title and all three section headings
- Counter increments and resets
- Todo add, complete, filter, delete
- Login validation error, then successful login

## Results

| Check | Result |
|-------|--------|
| `npm run lint` | pass (0 problems) |
| `npm run typecheck` | pass |
| `npm test` | 15/15 pass |
| `npm run test:e2e` | 4/4 pass |
| `npm run build` | pass |

## Issues found and fixed during development

1. **Wrong assumption in a test.** The first version of the TodoList test expected the input to be cleared after a blank (whitespace-only) submit. The component, by design, only clears the input after a todo is actually added. I fixed the test to check that the input clears after a successful add.
2. **Playwright strict-mode violations.**
   - `getByLabel('count')` also matched the `<section>` labelled "Counter", because label matching is case-insensitive and matches substrings. Fixed with `{ exact: true }`.
   - `<output>` has an implicit ARIA `status` role, so `getByRole('status')` matched both the counter and the login welcome message. Fixed by filtering on `hasText: 'Welcome'`.
3. **Lint warning** (`react-refresh/only-export-components`): `validateEmail` was exported from a component file. Moved to `src/utils/validation.ts`.
4. **Type-check config.** `tsc -b --noEmit` is rejected by TypeScript (TS5094). `noEmit` is set in the tsconfigs instead. `@types/node` was added for `process` in `playwright.config.ts`.

## Limitations

- E2E runs only on Chromium; Firefox and WebKit are not configured.
- State is in memory only (no persistence or backend), so there are no API or network tests.
- The login form is client-side validation only, with no real authentication.
- No visual regression or accessibility (axe) checks.
- `npm audit` reports advisories in dev-only transitive dependencies. They were left as-is to keep pinned, stable major versions.
