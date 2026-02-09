import { test } from '@playwright/test';

test('debug table structure', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // Get all tables
  const tables = await page.locator('table').count();
  console.log(`\nTotal tables found: ${tables}`);

  // Inspect each table
  for (let i = 0; i < tables; i++) {
    const table = page.locator('table').nth(i);
    const headers = await table.locator('th').allTextContents();
    const headerTexts = headers.map(h => h.trim()).filter(h => h.length > 0);
    const rowCount = await table.locator('tbody tr').count();

    console.log(`\nTable ${i + 1}:`);
    console.log(`  Headers: ${headerTexts.join(', ')}`);
    console.log(`  Row count: ${rowCount}`);

    // Log first row data if available
    if (rowCount > 0) {
      const firstRowCells = await table.locator('tbody tr:first-child td').allTextContents();
      console.log(`  First row: ${firstRowCells.map(c => c.trim()).join(' | ')}`);
    }
  }

  // Check the HTML structure of the first table
  console.log('\n\nFirst table HTML inspection:');
  const firstTableHtml = await page.locator('table').first().innerHTML();
  console.log(firstTableHtml.substring(0, 500));
});
