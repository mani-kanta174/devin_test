import { validateEmail } from './validation';

describe('validateEmail', () => {
  it.each([
    ['user@example.com', true],
    ['a.b@c.io', true],
    ['no-at-sign', false],
    ['user@nodot', false],
    ['', false],
  ])('%s -> %s', (email, expected) => {
    expect(validateEmail(email)).toBe(expected);
  });
});
