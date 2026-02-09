You are working in a Playwright project that strictly follows Page Object Model.
 
Rules:
1. NEVER create locators or page actions inside test files
2. ALWAYS reuse existing page object methods if available
3. If an action already exists in a page class, DO NOT create a new method
4. Only suggest new page methods if no existing method matches the action
5. NEVER duplicate methods across page objects
6. Tests must only call page object methods
7. pages/ directory is the single source of truth