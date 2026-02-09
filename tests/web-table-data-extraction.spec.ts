import { test, expect } from '@playwright/test';
import { WebTablePage } from '../pages/WebTablePage';

test.describe('Web Table Example', () => {
  let webTablePage: WebTablePage;

  test.beforeEach(async ({ page }) => {
    webTablePage = new WebTablePage(page);
    await webTablePage.navigateToAutomationPractice();
  });

  test('should retrieve all table headers', async () => {
    const headers = await webTablePage.getTableHeaders();
    
    expect(headers).toEqual(['Instructor', 'Course', 'Price']);
    expect(headers.length).toBe(3);
  });

  test('should get correct count of table rows', async () => {
    const rowCount = await webTablePage.getTableRowCount();
    
    expect(rowCount).toBeGreaterThan(0);
    console.log(`Total table rows: ${rowCount}`);
  });

  test('should retrieve all table data as objects', async () => {
    const allData = await webTablePage.getAllTableData();

    // Verify data is not empty
    expect(allData.length).toBeGreaterThan(0);

    // Verify each row has the expected properties
    allData.forEach((row) => {
      expect(row).toHaveProperty('Instructor');
      expect(row).toHaveProperty('Course');
      expect(row).toHaveProperty('Price');

      // Verify data is not empty
      expect(row['Instructor']).not.toBe('');
      expect(row['Course']).not.toBe('');
      expect(row['Price']).not.toBe('');
    });

    // Print table data in console
    console.log('\n=== ALL TABLE DATA ===');
    console.table(allData);
  });

  test('should retrieve specific row data', async () => {
    const firstRowData = await webTablePage.getRowData(0);

    // Verify structure
    expect(firstRowData).toHaveProperty('Instructor');
    expect(firstRowData).toHaveProperty('Course');
    expect(firstRowData).toHaveProperty('Price');

    // Log the first row
    console.log('\n=== FIRST ROW DATA ===');
    console.table([firstRowData]);

    // Verify it contains valid data
    expect(firstRowData['Instructor']).toBeTruthy();
    expect(firstRowData['Course']).toBeTruthy();
    expect(firstRowData['Price']).toBeTruthy();
  });

  test('should retrieve all data for specific column (Instructor)', async () => {
    const instructorColumn = await webTablePage.getColumnData('Instructor');

    expect(instructorColumn.length).toBeGreaterThan(0);
    expect(instructorColumn.every((value) => value.length > 0)).toBe(true);

    console.log('\n=== INSTRUCTOR COLUMN DATA ===');
    console.log(instructorColumn);
  });

  test('should retrieve all data for specific column (Course)', async () => {
    const courseColumn = await webTablePage.getColumnData('Course');

    expect(courseColumn.length).toBeGreaterThan(0);
    expect(courseColumn.every((value) => value.length > 0)).toBe(true);

    console.log('\n=== COURSE COLUMN DATA ===');
    console.log(courseColumn);
  });

  test('should retrieve all data for specific column (Price)', async () => {
    const priceColumn = await webTablePage.getColumnData('Price');

    expect(priceColumn.length).toBeGreaterThan(0);
    expect(priceColumn.every((value) => value.length > 0)).toBe(true);

    console.log('\n=== PRICE COLUMN DATA ===');
    console.log(priceColumn);
  });

  test('should print formatted table data', async () => {
    await webTablePage.printTableData();
  });

  test('should perform assertions on table data', async () => {
    const allData = await webTablePage.getAllTableData();
    const headers = await webTablePage.getTableHeaders();

    // Assertions
    expect(headers).toContain('Instructor');
    expect(headers).toContain('Course');
    expect(headers).toContain('Price');

    // Verify each row has instructor "Rahul Shetty"
    allData.forEach((row) => {
      expect(row['Instructor']).toContain('Rahul Shetty');
    });

    // Verify price column contains numeric values
    const prices = await webTablePage.getColumnData('Price');
    prices.forEach((price) => {
      expect(!isNaN(Number(price))).toBe(true);
    });

    console.log('\n=== ASSERTIONS PASSED ===');
    console.log(`✓ All rows contain instructor: Rahul Shetty`);
    console.log(`✓ All prices are numeric values`);
  });
});
