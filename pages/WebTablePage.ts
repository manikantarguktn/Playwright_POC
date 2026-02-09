import { Page, Locator } from '@playwright/test';

export class WebTablePage {
  readonly page: Page;
  private webTableLocator: Locator | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Find and cache the correct web table
   */
  private async findWebTable(): Promise<Locator> {
    if (this.webTableLocator) {
      return this.webTableLocator;
    }

    // Get all tables on the page
    const allTables = this.page.locator('table');
    const tableCount = await allTables.count();

    // Find the table with "Instructor", "Course", "Price" headers
    for (let i = 0; i < tableCount; i++) {
      const table = allTables.nth(i);
      // Look for th tags anywhere in the table (not just thead)
      const headers = await table.locator('th').allTextContents();
      const headerTexts = headers.map(h => h.trim()).filter(h => h.length > 0);

      if (
        headerTexts.includes('Instructor') &&
        headerTexts.includes('Course') &&
        headerTexts.includes('Price')
      ) {
        this.webTableLocator = table;
        return table;
      }
    }

    throw new Error('Web table with "Instructor", "Course", "Price" headers not found');
  }

  /**
   * Navigate to the AutomationPractice page
   */
  async navigateToAutomationPractice() {
    await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  }

  /**
   * Get all table columns headers
   */
  async getTableHeaders(): Promise<string[]> {
    const table = await this.findWebTable();
    // Get all th tags in the first row
    const headers = await table.locator('tr:first-child th').allTextContents();
    return headers.map(h => h.trim()).filter(h => h.length > 0);
  }

  /**
   * Get the count of rows in the table (excluding header)
   */
  async getTableRowCount(): Promise<number> {
    const table = await this.findWebTable();
    const allRows = await table.locator('tr').count();
    // Subtract 1 for the header row
    return Math.max(0, allRows - 1);
  }

  /**
   * Get all table data as array of objects
   */
  async getAllTableData(): Promise<Array<{ [key: string]: string }>> {
    const headers = await this.getTableHeaders();
    const rowCount = await this.getTableRowCount();
    const tableData: Array<{ [key: string]: string }> = [];

    for (let i = 0; i < rowCount; i++) {
      const row: { [key: string]: string } = {};
      // Data rows start from index 2 (row 1 is header)
      const rowIndex = i + 2;

      for (let j = 0; j < headers.length; j++) {
        const table = await this.findWebTable();
        const cellLocator = table.locator(`tr:nth-child(${rowIndex}) td:nth-child(${j + 1})`);
        const cellText = await cellLocator.textContent();
        row[headers[j]] = cellText?.trim() || '';
      }

      tableData.push(row);
    }

    return tableData;
  }

  /**
   * Get specific row data by row index (0-based)
   */
  async getRowData(rowIndex: number): Promise<{ [key: string]: string }> {
    const headers = await this.getTableHeaders();
    const row: { [key: string]: string } = {};
    const table = await this.findWebTable();
    // Data rows start from index 2 (row 1 is header)
    const tableRowIndex = rowIndex + 2;

    for (let j = 0; j < headers.length; j++) {
      const cellLocator = table.locator(`tr:nth-child(${tableRowIndex}) td:nth-child(${j + 1})`);
      const cellText = await cellLocator.textContent();
      row[headers[j]] = cellText?.trim() || '';
    }

    return row;
  }

  /**
   * Get all values for a specific column by header name
   */
  async getColumnData(columnName: string): Promise<string[]> {
    const headers = await this.getTableHeaders();
    const columnIndex = headers.indexOf(columnName);

    if (columnIndex === -1) {
      throw new Error(`Column "${columnName}" not found in table headers. Available headers: ${headers.join(', ')}`);
    }

    const rowCount = await this.getTableRowCount();
    const columnData: string[] = [];
    const table = await this.findWebTable();

    for (let i = 0; i < rowCount; i++) {
      // Data rows start from index 2 (row 1 is header)
      const tableRowIndex = i + 2;
      const cellLocator = table.locator(
        `tr:nth-child(${tableRowIndex}) td:nth-child(${columnIndex + 1})`
      );
      const cellText = await cellLocator.textContent();
      columnData.push(cellText?.trim() || '');
    }

    return columnData;
  }

  /**
   * Print table data to console in a formatted way
   */
  async printTableData(): Promise<void> {
    const headers = await this.getTableHeaders();
    const allData = await this.getAllTableData();

    console.log('\n=== WEB TABLE DATA ===');
    console.log('Headers:', headers);
    console.log('Total Rows:', allData.length);
    console.log('\nData:');
    console.table(allData);
  }
}
