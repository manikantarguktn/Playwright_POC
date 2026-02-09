// spec: specs/plan.md
// scenario: SCENARIO 1: Happy Path - Successful Signup with Valid Data

import { test, expect } from '@playwright/test';

test.describe('Gmail Signup Flow', () => {
  test('Happy Path - Successful Signup with Valid Data', async ({ page }) => {
    // 1. Navigate to gmail.com
    await page.goto('https://gmail.com');

    // 2. Click on "Create account" button on the Gmail login page
    await page.getByRole('button', { name: 'Create account' }).click();

    // 3. Select "For my personal use" from the dropdown menu
    await page.getByRole('menuitem', { name: 'For my personal use' }).click();

    // 4. Enter first name: "John"
    await page.getByRole('textbox', { name: 'First name' }).fill('John');

    // 5. Enter last name: "Doe"
    await page.getByRole('textbox', { name: 'Last name (optional)' }).fill('Doe');

    // 6. Click "Next" button
    await page.getByRole('button', { name: 'Next' }).click();

    // 7. Select month: "January" from the Month dropdown
    await page.getByRole('combobox', { name: 'Month' }).click();
    await page.getByRole('option', { name: 'January' }).click();

    // 8. Enter day: "15"
    await page.getByRole('textbox', { name: 'Day' }).fill('15');

    // 9. Enter year: "1990"
    await page.getByRole('textbox', { name: 'Year' }).fill('1990');

    // 10. Select gender: "Male"
    await page.getByRole('combobox', { name: 'Gender' }).click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();

    // 11. Click "Next" button
    await page.getByRole('button', { name: 'Next' }).click();

    // 12. Enter username: "johndoe.test123" (or any available username)
    // 13. If username is taken, select one of the suggested available usernames
    await page.getByRole('textbox', { name: 'Username' }).fill('johndoe.test123');
    await page.waitForTimeout(2000);

    // Wait for validation and check if username is taken
    const suggestedUsername = page.getByRole('button').first();
    const isUsernameTaken = await page.locator('text=That username is taken').isVisible().catch(() => false);
    
    if (isUsernameTaken) {
      // Click the first suggested username
      await suggestedUsername.click();
    }

    // 14. Click "Next" button
    await page.getByRole('button', { name: 'Next' }).click();

    // 15. Enter password: "TestPassword123!"
    await page.getByRole('textbox', { name: 'Password' }).fill('TestPassword123!');

    // 16. Confirm password: "TestPassword123!"
    await page.getByRole('textbox', { name: 'Confirm' }).fill('TestPassword123!');

    // 17. Click "Next" button
    await page.getByRole('button', { name: 'Next' }).click();

    // 18. Verify user is on the verification page with QR code displayed
    await expect(page).toHaveTitle(/Verify some info/);
    await expect(page.locator('text=Scan the QR code with your phone')).toBeVisible();
    await expect(page.locator('img[alt*="QR code"]')).toBeVisible();

    // Verify that all form steps were successfully completed
    expect(page.url()).toContain('signup/mophoneverification');
  });
});
