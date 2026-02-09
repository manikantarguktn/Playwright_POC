# Page Object Model (POM) - Pages Directory

This directory contains all Page Object classes that abstract page interactions and locators from test files.

## Rules

1. **NEVER** create locators or page actions inside test files
2. **ALWAYS** reuse existing page object methods if available
3. Only suggest new page methods if no existing method matches the action
4. **NEVER** duplicate methods across page objects
5. Tests must only call page object methods
6. This directory is the single source of truth

## Current Page Objects

### WebTablePage
Location: `WebTablePage.ts`

**Purpose:** Handle interactions with web table elements.

**Methods:**
- `navigateToAutomationPractice()` - Navigate to the AutomationPractice page
- `getTableHeaders()` - Get all table column headers
- `getTableRowCount()` - Get the count of data rows in the table
- `getAllTableData()` - Get all table data as an array of objects
- `getRowData(rowIndex)` - Get specific row data by index
- `getColumnData(columnName)` - Get all values for a specific column
- `printTableData()` - Print formatted table data to console

**Example Usage:**
```typescript
const webTablePage = new WebTablePage(page);
await webTablePage.navigateToAutomationPractice();
const allData = await webTablePage.getAllTableData();
console.log(allData);
```

## Best Practices

- Page object classes should be named after the page or section they represent (e.g., `WebTablePage`, `LoginPage`)
- All methods should have clear, descriptive names that indicate their purpose
- Methods should accept parameters for flexibility and reusability
- Locators should be kept private or encapsulated within the class
- Return types should be clear (strings, objects, arrays, or Locator)


