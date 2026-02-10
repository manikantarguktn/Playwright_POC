# GitHub Pages Permission Fix Guide

## Issue: Permission Denied Error

When running the Playwright test workflow in GitHub Actions, you may encounter this error:

```
remote: Permission to <username>/<repo>.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/<username>/<repo>.git/': The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

## ✅ What Was Fixed

Your workflows have been updated with the following changes:

### 1. Added GitHub Token Permissions
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

This grants the required permissions for the GitHub Actions bot to:
- Read repository contents
- Write to GitHub Pages
- Use ID tokens for authentication

### 2. Updated peaceiris/actions-gh-pages Action
- **Old:** `peaceiris/actions-gh-pages@v3`
- **New:** `peaceiris/actions-gh-pages@v4`

Version 4 is more reliable and has better permission handling.

### 3. Added force_orphan Flag
```yaml
force_orphan: true
```

This ensures that each report is published independently without maintaining git history, which can sometimes cause permission issues.

### 4. Added destination_dir Configuration
```yaml
destination_dir: ${{ github.run_number }}
```

This creates a unique folder for each workflow run, allowing you to access previous reports.

---

## 🔧 Additional Setup Required

### Step 1: Verify Repository Settings
Go to your repository on GitHub and check the following:

1. **GitHub Pages Configuration:**
   - Go to **Settings** → **Pages**
   - Verify **Source** is set to "**GitHub Actions**"
   - The section should show "Your site is live" or similar message

2. **Actions Permissions:**
   - Go to **Settings** → **Actions** → **General**
   - Under "Workflow permissions", select:
     - ☑️ **Read and write permissions**
     - ☑️ **Allow GitHub Actions to create and approve pull requests**
   - Click **Save**

3. **Branch Protection Rules (if applicable):**
   - If you have branch protection rules on `main` or `develop`, ensure they allow GitHub Actions to push to the `gh-pages` branch

### Step 2: First Run Setup

1. Go to the **Actions** tab in your repository
2. Select one of the workflows:
   - "**Run Playwright Tests**" (for manual execution)
   - "**Auto Run Tests on Push**" (runs automatically)
3. The first run may take a few extra minutes as GitHub Pages is being set up

### Step 3: Verify GitHub Pages is Active

After the first workflow run completes successfully:

1. Go to **Settings** → **Pages**
2. You should see:
   - "Your site is live at: `https://<username>.github.io/<repo-name>/`"
   - Status showing the gh-pages branch is active

---

## 📋 Workflow Permission Details

### run-tests.yml Permissions
```yaml
permissions:
  contents: read      # Required to read code
  pages: write       # Required to deploy to GitHub Pages
  id-token: write    # Required for OIDC token
```

### auto-tests.yml Permissions
```yaml
permissions:
  contents: read      # Required to read code
  pages: write       # Required to deploy to GitHub Pages
  id-token: write    # Required for OIDC token
```

---

## 🔍 Troubleshooting

### Issue: "Permission denied" still appears
**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Change "Workflow permissions" to "**Read and write permissions**"
3. Save and re-run the workflow

### Issue: GitHub Pages not showing recent report
**Solution:**
1. Delete the `gh-pages` branch:
   ```bash
   git push origin --delete gh-pages
   ```
2. Run the workflow again - it will recreate the branch
3. Go to Settings → Pages and verify it's set to "GitHub Actions"

### Issue: "gh-pages branch not found"
**Solution:**
This is normal on the first run. The branch is created automatically during the first workflow execution. Just wait for the workflow to complete.

### Issue: Report URL is broken or 404
**Solution:**
1. Verify the correct URL format:
   ```
   https://<github-username>.github.io/<repo-name>/<run-number>/index.html
   ```
2. Wait 1-2 minutes after the workflow completes - GitHub Pages can take time to publish
3. Check the "Test Summary" section in the workflow output for the exact URL

---

## 📚 Related Documentation

- [peaceiris/actions-gh-pages - GitHub Repository](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Permissions Documentation](https://docs.github.com/en/actions/security-guides/permissions-for-github-token)

---

## ✨ Next Steps

1. **Commit the updated workflows:**
   ```bash
   git add .github/workflows/
   git commit -m "Fix: Add proper permissions for GitHub Pages deployment"
   git push
   ```

2. **Run a test manually:**
   - Go to Actions → "Run Playwright Tests"
   - Click "Run workflow"
   - Monitor the execution

3. **Verify the report:**
   - After successful completion, check the report link in the workflow output
   - Access it via the GitHub Pages URL

---

**Your workflows are now configured correctly for GitHub Pages publication!** 🎉
