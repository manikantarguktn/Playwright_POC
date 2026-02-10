# GitHub Actions Workflow Documentation

## Workflows Summary

This project includes two GitHub Actions workflows for automated testing and reporting.

### 1. **Run Playwright Tests** (`run-tests.yml`)
**Type:** Manual Trigger Workflow  
**Trigger:** Manual via GitHub Actions UI

**Features:**
- ✅ Branch selection (main, develop, staging, or custom)
- ✅ Test execution options (all tests, single file, or folder)
- ✅ Customizable retries (text input)
- ✅ Customizable workers (text input)
- ✅ Headed mode toggle
- ✅ Automatic HTML report generation
- ✅ GitHub Pages publishing
- ✅ Video recording of failures

### 2. **Auto Run Tests on Push** (`auto-tests.yml`)
**Type:** Automatic Trigger Workflow  
**Trigger:** Push to `main` or `develop` branches

**Features:**
- ✅ Automatic test execution on branch push
- ✅ Fixed configuration (1 retry, 1 worker)
- ✅ HTML report generation
- ✅ GitHub Pages publishing
- ✅ Video recording of failures

---

## Quick Start Guide

### Step 1: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Save

### Step 2: Run Tests Manually
1. Go to Actions tab
2. Select "Run Playwright Tests"
3. Click "Run workflow"
4. Fill in the form:
   - **Branch:** main (or another branch)
   - **Test execution type:** all
   - **Retries:** 1
   - **Workers:** 1
   - **Headed mode:** unchecked
5. Click "Run workflow"

### Step 3: View Report
After workflow completes:
1. Go to Actions tab
2. Click the completed workflow
3. Scroll to "Test Summary" section
4. Copy the report URL

**Report URL Format:**
```
https://<username>.github.io/<repo-name>/<run-number>/index.html
```

---

## Workflow Inputs Explained

### Branch Selection
- **main:** Default main branch
- **develop:** Development branch
- **staging:** Staging branch
- **custom:** Enter your own branch name

### Test Execution Type
| Option | Purpose | Required Field |
|--------|---------|-----------------|
| `all` | Run all tests in `tests/` directory | None |
| `single_file` | Run one specific test file | Test file path |
| `folder` | Run all tests in a folder | Folder path |

**Examples:**
- Single file: `tests/example.spec.ts`
- Folder: `tests/` or `tests/auth/`

### Performance Configuration
| Input | Purpose | Default | Example |
|-------|---------|---------|---------|
| Retries | How many times to retry failed tests | 1 | 2, 3, 5 |
| Workers | Number of parallel test workers | 1 | 2, 4, 8 |

### Headed Mode
- **Unchecked:** Tests run in headless mode (no browser UI visible) - Recommended for CI/CD
- **Checked:** Shows browser UI during test execution - Useful for debugging

---

## Environment Variables Reference

These environment variables are automatically set by the workflows:

```yaml
PW_RETRIES: ${{ inputs.retries }}      # Set from workflow input
PW_WORKERS: ${{ inputs.workers }}      # Set from workflow input
PW_HEADED: ${{ inputs.headed_mode }}   # Set from workflow input
PW_VIDEO: 'true'                       # Always enabled in CI
CI: true                                # CI environment flag
```

---

## GitHub Pages Report Access

### Report Storage
- Each workflow run generates a unique report
- Reports are stored using the GitHub run number as directory
- Reports are retained for 30 days by default

### Accessing Previous Reports
```
https://<username>.github.io/<repo-name>/<run-number>/index.html
```

Replace:
- `<username>` with your GitHub username
- `<repo-name>` with repository name
- `<run-number>` with the specific workflow run ID

### Example
```
https://johndoe.github.io/Playwright_TypeScript/12345/index.html
https://johndoe.github.io/Playwright_TypeScript/12346/index.html
https://johndoe.github.io/Playwright_TypeScript/12347/index.html
```

---

## Common Scenarios

### Scenario 1: Run all tests with retry
1. Branch: main
2. Test type: all
3. Retries: 2
4. Workers: 1

### Scenario 2: Run a single failing test with debug
1. Branch: develop
2. Test type: single_file
3. Test file: `tests/example.spec.ts`
4. Retries: 1
5. Workers: 1
6. Headed mode: ✓ (checked)

### Scenario 3: Run tests in parallel
1. Branch: main
2. Test type: folder
3. Test folder: `tests/`
4. Retries: 1
5. Workers: 4

### Scenario 4: Automatic testing on push
- Push to `main` or `develop` branch
- Tests run automatically with fixed config (1 retry, 1 worker)
- Report published automatically to GitHub Pages

---

## Workflow Artifacts

Each workflow run generates the following artifacts:

| Artifact | Purpose | Retention |
|----------|---------|-----------|
| `playwright-report` | HTML test report | 30 days |
| `test-videos` | Video recordings of failed tests | 15 days |

Download artifacts:
1. Go to completed workflow run
2. Scroll to "Artifacts" section
3. Click to download

---

## Troubleshooting

### Workflow fails with "Test file not found"
- Verify the file path is correct
- Use forward slashes in paths
- Example correct path: `tests/example.spec.ts`

### GitHub Pages report not accessible
- Ensure GitHub Pages is enabled in Settings
- Wait 1-2 minutes after workflow completes
- Clear browser cache and try again

### Tests timeout
- Reduce worker count (increase workers can cause timeouts)
- Set workers to 1 for slower machines
- Increase retries if tests are flaky

### No videos in report
- Videos are only recorded for failed tests
- Video recording is automatically enabled in workflows
- Check test-videos artifact in workflow output

---

## Tips & Best Practices

1. **Use branch selection** - Test on specific branches before merging
2. **Start with 1 worker** - Increase if tests pass consistently
3. **Monitor reports** - Review failed test videos in HTML report
4. **Set up auto-testing** - Push to protected branches triggers automatic tests
5. **Save reports** - Download reports for historical analysis

---

For detailed configuration, see [README.md](../README.md).
