# GitHub Pages (gh-pages Branch) Setup Guide

## ✅ Workflow Updated

Your workflows have been updated to use the **gh-pages branch** approach for GitHub Pages. This is more reliable than the official `actions/deploy-pages@v4` action as it uses standard git operations.

---

## 📋 How It Works

1. **Tests run** and generate `playwright-report/` folder
2. **Report is copied** to `gh-pages-deploy/<run-number>/` structure
3. **Git operations** create/update the gh-pages branch
4. **Reports are published** at: `https://<username>.github.io/<repo-name>/<run-number>/index.html`
5. **Each run has its own folder**, so you can access historical reports

---

## 🚀 Repository Setup (Required)

### Step 1: Enable GitHub Pages with gh-pages Branch

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under **Source**, select:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
5. Click **Save**

The page should show: `Your site is live at: https://<username>.github.io/<repo-name>/`

### Step 2: Enable Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ☑️ **Read and write permissions**
3. Click **Save**

This allows GitHub Actions to push to the gh-pages branch.

### Step 3: Push Updated Workflows

```bash
git add .github/workflows/
git commit -m "Update: Use gh-pages branch for GitHub Pages deployment"
git push origin main
```

---

## 🧪 First Run Verification

1. Go to **Actions** tab in your repository
2. Select **"Run Playwright Tests"** workflow
3. Click **"Run workflow"** with default settings
4. Monitor execution

### Expected Behavior:

✅ Tests run and generate reports  
✅ `Deploy to GitHub Pages` step creates/pushes to gh-pages branch  
✅ Deployment completes in seconds (no "pending" status)  
✅ Report available immediately at the URL shown

### Check the Results:

1. After workflow completes, check the **Test Summary** output
2. Copy the report URL
3. Wait 1-2 minutes for GitHub Pages to cache
4. Open the URL in your browser
5. You should see the Playwright HTML report

---

## 📊 Report Access

### URL Format:
```
https://<github-username>.github.io/<repo-name>/<run-number>/index.html
```

### Examples:
```
https://manikantarguktn.github.io/Playwright_POC/12345/index.html
https://manikantarguktn.github.io/Playwright_POC/12346/index.html
https://manikantarguktn.github.io/Playwright_POC/12347/index.html
```

Each workflow run creates a new numbered folder, allowing you to maintain a history of all reports.

---

## 🔍 Troubleshooting

### Issue: "Deploy to GitHub Pages" step fails with permission error

**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Verify **Workflow permissions** is set to "**Read and write permissions**"
3. If changed, wait 30 seconds then re-run the workflow

### Issue: Deployment completes but report shows 404

**Solution:**
1. Verify GitHub Pages is set to use `gh-pages` branch (Settings → Pages)
2. Wait 2-3 minutes for GitHub Pages cache to update
3. Clear browser cache and try again
4. Check the gh-pages branch exists: `git branch -a | grep gh-pages`

### Issue: gh-pages branch not appearing

**Solution:**
1. The branch is created automatically on first workflow run
2. Ensure workflow completed without errors
3. In GitHub, go to **Code** tab and check branches
4. If missing, the branch will be created on next workflow run

### Issue: Report URL shows 404

**Solution:**
1. Verify report was generated (check artifact in workflow)
2. Ensure GitHub Pages source is set to `gh-pages` branch
3. Wait 1-2 minutes and try again
4. Try accessing the home page: `https://<username>.github.io/<repo-name>/`

### Issue: Cannot push to gh-pages branch

**Solution:**
1. Verify workflow permissions are set to "Read and write"
2. Repository should not have branch protection on gh-pages
3. Check that gh-pages branch is not locked
4. Try running workflow again

---

## 📁 Directory Structure on gh-pages Branch

After first deployment:

```
gh-pages branch:
├── 12345/
│   ├── index.html
│   ├── assets/
│   └── ...
├── 12346/
│   ├── index.html
│   ├── assets/
│   └── ...
└── index.html  (optional root index)
```

Each run number creates a separate folder containing the full HTML report.

---

## 🔄 Workflow Details

### run-tests.yml (Manual Execution)
- Triggered manually via GitHub Actions UI
- Allows customization: branch, test type, retries, workers
- Deploys to gh-pages with run number folder

### auto-tests.yml (Automatic on Push)
- Triggered on push to `main` and `develop` branches
- Fixed configuration: 1 retry, 1 worker
- Deploys to gh-pages with run number folder

### Both workflows:
- Create/update gh-pages branch
- Push test reports to numbered folders
- Maintain historical reports

---

## 💡 Best Practices

1. **Keep gh-pages separate** - Don't manually edit gh-pages branch
2. **Use workflow inputs** - Customize test execution from UI
3. **Monitor reports** - Review failed test videos in HTML report
4. **Clean up old reports** - Reports are retained, can manually delete old runs
5. **Check permissions** - Ensure "Read and write" permissions are enabled

---

## 📚 Next Steps

1. ✅ Verify GitHub Pages is set to `gh-pages` branch
2. ✅ Ensure workflow permissions are "Read and write"
3. ✅ Push updated workflows
4. ✅ Run first workflow manually
5. ✅ Access the report via the provided URL

---

## 🎯 Summary

| Aspect | Details |
|--------|---------|
| **Approach** | Git-based push to gh-pages branch |
| **Initial Setup** | 2 settings changes (no 3rd party tools needed) |
| **Report Location** | Individual folders per run number |
| **Reliability** | High (uses standard git commands) |
| **Permission Issues** | Resolved (uses write permission for git) |
| **Historical Reports** | Yes (each run is numbered and preserved) |
| **Complex Setup** | No (straightforward branch-based approach) |

---

**Your GitHub Pages setup is now configured!** 🎉 Follow the steps above to complete the setup and verify it works.
