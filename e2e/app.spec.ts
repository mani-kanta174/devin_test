import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('page loads with all sections', async ({ page }) => {
  await expect(page).toHaveTitle('Devin Test UI');
  for (const name of ['Counter', 'Todo list', 'Login form']) {
    await expect(page.getByRole('heading', { name })).toBeVisible();
  }
});

test('counter increments and resets', async ({ page }) => {
  await page.getByLabel('increment').click();
  await page.getByLabel('increment').click();
  await expect(page.getByLabel('count', { exact: true })).toHaveText('2');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByLabel('count', { exact: true })).toHaveText('0');
});

test('todo add, complete, filter, delete', async ({ page }) => {
  const input = page.getByLabel('new todo');
  await input.fill('Buy milk');
  await input.press('Enter');
  await input.fill('Ship PR');
  await input.press('Enter');
  await expect(page.getByTestId('remaining')).toHaveText('2 items left');

  await page.getByRole('checkbox', { name: 'Buy milk' }).check();
  await expect(page.getByTestId('remaining')).toHaveText('1 item left');

  await page.getByRole('button', { name: 'completed' }).click();
  await expect(page.getByRole('list', { name: 'todos' }).getByRole('listitem')).toHaveText(['Buy milkx']);

  await page.getByRole('button', { name: 'all' }).click();
  await page.getByRole('button', { name: 'delete Ship PR' }).click();
  await expect(page.getByRole('list', { name: 'todos' }).getByRole('listitem')).toHaveCount(1);
});

test('login validation and success', async ({ page }) => {
  await page.getByLabel('Email').fill('nope');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('alert')).toContainText('valid email');

  await page.getByLabel('Email').fill('dev@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Welcome' })).toHaveText('Welcome, dev@example.com!');
});
