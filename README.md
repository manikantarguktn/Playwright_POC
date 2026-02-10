# Playwright TypeScript Test Automation Framework

A comprehensive Playwright test automation framework with GitHub Actions integration for continuous testing and reporting.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests Locally](#running-tests-locally)
- [GitHub Actions Setup](#github-actions-setup)
- [HTML Reporting](#html-reporting)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Overview

This framework provides a robust Playwright test automation solution with:
- **Page Object Model (POM)** architecture for maintainable tests
- **GitHub Actions Integration** for CI/CD automation
- **Interactive HTML Reporting** with video recordings
- **Flexible Test Execution** (single file, folder, or all tests)
- **Customizable Configuration** (retries, workers, headed mode, video recording)
- **GitHub Pages Publishing** for test reports

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: For version control
- **GitHub Account**: For GitHub Actions and GitHub Pages

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Playwright_TypeScript
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Project Structure

```
Playwright_TypeScript/
├── .github/
│   └── workflows/
│       ├── run-tests.yml          # Manual test execution workflow
│       └── auto-tests.yml         # Automatic test execution on push
├── pages/                          # Page Object Model classes
│   ├── index.ts
│   ├── WebTablePage.ts
│   └── commands.md
├── tests/                          # Test specifications
│   ├── example.spec.ts
│   └── seed.spec.ts
├── test-results/                   # Test execution results
├── playwright-report/              # Generated HTML reports
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## Running Tests Locally

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (show browser):
```bash
npm run test:headed
```

### Run specific test file:
```bash
npx playwright test tests/example.spec.ts
```

### Run tests from a folder:
```bash
npx playwright test tests/
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### View HTML report:
```bash
npm run test:report
```

### Custom configuration for local runs:
```bash
# Run with custom retries and workers
PW_RETRIES=2 PW_WORKERS=4 npm test

# Run in headed mode
PW_HEADED=true npm test

# Disable video recording
PW_VIDEO=false npm test
```

## GitHub Actions Setup

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Set **Source** to `GitHub Actions`
4. Save the settings

### 2. Run Tests Manually via GitHub Actions

#### Trigger Manual Test Execution:

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Select **"Run Playwright Tests"** workflow
4. Click **"Run workflow"**
5. Configure the following options:

   - **Branch**: Select the branch to run tests on
     - `main` (default)
     - `develop`
     - `staging`
     - `custom` (enter custom branch name)

   - **Test execution type**:
     - `all` - Run all tests (default)
     - `single_file` - Run a specific test file
     - `folder` - Run tests from a specific folder

   - **Test file** (if single_file is selected):
     - Example: `tests/example.spec.ts`

   - **Test folder** (if folder is selected):
     - Example: `tests`

   - **Retries** (default: 1):
     - Number of retries for failed tests
     - Example: `2`, `3`, etc.

   - **Workers** (default: 1):
     - Number of parallel workers
     - Example: `2`, `4`, etc.

   - **Headed mode** (optional):
     - Check to run tests with visible browser UI
     - Unchecked by default

6. Click **"Run workflow"**
7. Monitor the workflow execution

### 3. Automatic Test Execution on Branch Push

The workflow automatically runs tests when you push to:
- `main` branch
- `develop` branch

**Automatic Configuration:**
- Retries: 1
- Workers: 1
- Video Recording: Enabled
- Headed Mode: Disabled

#### To add more branches:

Edit `.github/workflows/auto-tests.yml` and add branches to the `on.push.branches` section:

```yaml
on:
  push:
    branches:
      - main
      - develop
      - staging        # Add this line for staging
      - production     # Add this line for production
```

### 4. Single Test File Execution via GitHub Actions

1. Open **"Run Playwright Tests"** workflow
2. Click **"Run workflow"**
3. Configure as follows:
   - **Branch**: Select desired branch
   - **Test execution type**: `single_file`
   - **Test file**: Enter path (e.g., `tests/example.spec.ts`)
   - **Retries**: Set as needed
   - **Workers**: Set as needed
4. Click **Run workflow**

### 5. Folder-based Test Execution via GitHub Actions

1. Open **"Run Playwright Tests"** workflow
2. Click **"Run workflow"**
3. Configure as follows:
   - **Branch**: Select desired branch
   - **Test execution type**: `folder`
   - **Test folder**: Enter path (e.g., `tests`)
   - **Retries**: Set as needed
   - **Workers**: Set as needed
4. Click **Run workflow**

## HTML Reporting

### Report Generation

The Playwright HTML report is automatically generated after each test execution (whether local or via GitHub Actions).

### Accessing Reports

#### Local Machine:
```bash
npm run test:report
```

This opens the HTML report in your default browser.

#### GitHub Actions Generated Reports:

After a workflow completes, the HTML report is published to GitHub Pages.

**Report URL Format:**
```
https://<github-username>.github.io/<repository-name>/<run-number>/index.html
```

**Example:**
```
https://myusername.github.io/Playwright_TypeScript/12345/index.html
```

#### Find Your Report:

1. Go to the **Actions** tab in your repository
2. Click on the completed workflow run
3. Scroll to the bottom of the workflow summary
4. You'll see the complete report URL in the "Test Summary" section
5. Each run is stored with its unique run number, allowing you to access any previous report

### Report Contents:

- **Test Results**: Pass/Fail status for each test
- **Test Timeline**: Execution time for each test
- **Error Details**: Stack traces for failed tests
- **Video Recordings**: Automatic video playback of failed test execution
- **Screenshots**: Captured screenshots during test execution
- **System Information**: Browser, platform, and other system details

### Retaining Historical Reports:

Reports are stored in GitHub Pages for 30 days by default (configurable in workflows). This allows you to:
- Compare test results across runs
- Investigate failures from past executions
- Maintain a test execution history

## Configuration

### Playwright Configuration File

Edit `playwright.config.ts` to customize:

```typescript
// Number of retries for failed tests
retries: process.env.PW_RETRIES ? parseInt(process.env.PW_RETRIES) : (process.env.CI ? 1 : 0),

// Number of parallel workers
workers: process.env.PW_WORKERS ? parseInt(process.env.PW_WORKERS) : (process.env.CI ? 1 : undefined),

// Video recording (set to 'true' to enable)
video: process.env.PW_VIDEO !== 'false' ? 'retain-on-failure' : 'off',

// Headed mode (set to 'true' to show browser)
headless: process.env.PW_HEADED !== 'true',

// Trace collection
trace: 'on-first-retry',
```

### Environment Variables

Configure test execution using environment variables:

| Variable | Values | Default | Description |
|----------|--------|---------|-------------|
| `PW_RETRIES` | Integer | 1 (CI) / 0 (local) | Number of retries for failed tests |
| `PW_WORKERS` | Integer | 1 (CI) / undefined (local) | Number of parallel workers |
| `PW_HEADED` | `true` / `false` | `false` | Run in headed mode |
| `PW_VIDEO` | `true` / `false` | `true` | Record videos of failed tests |
| `CI` | `true` / `false` | Not set locally | CI/CD environment flag |

### Browser Configuration

Currently configured browsers:
- **Chromium** (enabled by default)

To enable additional browsers, uncomment in `playwright.config.ts`:
- Firefox
- WebKit
- Microsoft Edge
- Google Chrome
- Mobile viewports

## Advanced Topics

### Custom Test Configuration

Set environment variables before running tests:

```bash
# Run with 3 retries and 4 workers
PW_RETRIES=3 PW_WORKERS=4 npm test

# Run in headed mode with video disabled
PW_HEADED=true PW_VIDEO=false npm test
```

### Page Object Model Usage

Create page objects in the `pages/` directory:

```typescript
// pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('<url>');
  }

  async login(username: string, password: string) {
    await this.page.fill('[name="username"]', username);
    await this.page.fill('[name="password"]', password);
    await this.page.click('[type="submit"]');
  }
}
```

Use in tests:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user', 'pass');
  await expect(page).toHaveTitle('Dashboard');
});
```

## Troubleshooting

### Tests failing locally but passing in GitHub Actions

- Check browser versions: Run `npx playwright --version`
- Update Playwright: `npm install @playwright/test@latest`
- Clear cache: `rm -rf node_modules && npm install`

### GitHub Pages report not generating

- Verify GitHub Pages is enabled in repository settings
- Check workflow permissions: Settings → Actions → General
- Ensure `GITHUB_TOKEN` permissions include `pages: write`

### Timeout issues

- Increase worker count: Set `PW_WORKERS` to fewer workers
- Increase test timeout in `playwright.config.ts`
- Check network connectivity and target application status

### Video not recording

Verify `PW_VIDEO` is not set to `false` and ensure disk space is available for recordings.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Write tests for new features
3. Run tests locally: `npm test`
4. Commit changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature/your-feature`
6. Create a Pull Request

## License

ISC

## Support

For issues or questions:
1. Check the [Playwright Documentation](https://playwright.dev)
2. Review workflow execution logs in GitHub Actions
3. Check the HTML report for test details
4. Create an issue in the repository

---

**Happy Testing! 🎭**
