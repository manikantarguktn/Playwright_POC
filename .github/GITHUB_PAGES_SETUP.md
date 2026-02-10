# GitHub Pages Configuration - Essential Setup

## ⚠️ Critical: Repository Configuration Required

The workflows have been updated to use the official GitHub Pages deployment action. To make this work, you **MUST** configure your repository settings.

---

## 🔧 Step 1: Enable GitHub Pages (REQUIRED)

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under **Source**, select:
   - **Source:** "GitHub Actions" (from the dropdown)
5. Click **Save**

The page should now show: `Your site is live at: https://<username>.github.io/<repo-name>/`

**Important:** Do NOT select Deploy from a branch - select "GitHub Actions"

---

## 🔧 Step 2: Configure Workflow Permissions

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. In the left sidebar, click **Actions** → **General** (under "Code and automation")
4. Scroll to **Workflow permissions**
5. Select:
   - ☑️ **Read and write permissions**
   - ☑️ **Allow GitHub Actions to create and approve pull requests** (optional)
6. Click **Save**

---

## 🔧 Step 3: Configure Pages Build and Deployment

1. Go to **Settings** → **Pages** again
2. Under **Build and deployment**, verify:
   - **Source:** "GitHub Actions" is selected
   - The section shows it's ready to deploy

---

## ✅ How It Works Now

### Workflow Process:
1. Tests run and generate `playwright-report/` folder
2. Report is copied to `deploy/<run-number>/` structure
3. Report is uploaded as a GitHub Pages artifact
4. `actions/deploy-pages@v4` officially deploys it to GitHub Pages
5. Report becomes accessible at the public URL

### Report URL Format:
```
https://<github-username>.github.io/<repo-name>/<run-number>/index.html
```

**Example:**
```
https://manikantarguktn.github.io/Playwright_POC/12345/index.html
https://manikantarguktn.github.io/Playwright_POC/12346/index.html
```

---

## 🚀 First Run Checklist

- [ ] GitHub Pages enabled with "GitHub Actions" as source
- [ ] Workflow permissions set to "Read and write"
- [ ] Repository name is correct in the URL
- [ ] Workflows pushed to the repository

Then:
1. Go to **Actions** tab
2. Select "Run Playwright Tests" workflow
3. Click **Run workflow**
4. Monitor execution
5. After completion, check the report link in the workflow output

---

## ⏱️ Deployment Timing

After a workflow completes:
- Report artifact upload: **Immediate**
- GitHub Pages deployment: **1-2 minutes**
- Report accessible: **1-2 minutes after deployment**

If the link shows 404, **wait 2-3 minutes** and try again. GitHub Pages has a small cache delay.

---

## 🔍 Verify Deployment Status

In the workflow output, look for:

```
Deploy to GitHub Pages
...
✓ Deployment successful
or
✓ Pages deployment pending
```

The page may show "pending" initially - it will complete within 1-2 minutes.

---

## ❌ Troubleshooting

### Issue: "Deployment pending" status
**Solution:** This is normal. Wait 1-2 minutes and refresh the page.

### Issue: Error "Artifact not found"
**Solution:** 
- Ensure tests run successfully
- Check that `playwright-report/` folder is generated
- Verify the test step completed (`Run Playwright tests`)

### Issue: GitHub Pages settings showing "Deploy from a branch"
**Solution:**
1. Go to **Settings** → **Pages**
2. Change **Source** dropdown to "**GitHub Actions**"
3. Save

### Issue: Permission error in workflow
**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Change to "**Read and write permissions**"
3. Re-run the workflow

### Issue: 404 on report link
**Solution:**
1. Wait 2-3 minutes (GitHub Pages takes time to publish)
2. Clear browser cache
3. Verify the URL format is correct
4. Check workflow output for the actual URL

---

## 📋 Official GitHub Actions Used

- **actions/upload-artifact@v4** - Store test reports
- **actions/deploy-pages@v4** - Official GitHub Pages deployment (no permission issues!)
- This approach requires no personal access tokens or workarounds

---

## 🎯 What Changed from Previous Setup

| Aspect | Previous | Current |
|--------|----------|---------|
| Deployment Method | peaceiris/actions-gh-pages@v4 | Official actions/deploy-pages@v4 |
| Token Requirements | Manual GITHUB_TOKEN scope | Automatic via official action |
| Git Operations | Direct git push to gh-pages | Artifact-based deployment |
| Permission Issues | ⚠️ Common | ✅ Resolved |
| Official Status | Community maintained | Official GitHub action |

---

## ✨ Next Steps

1. **Configure GitHub Pages** (steps above)
2. **Commit and push** your updated workflows:
   ```bash
   git add .github/workflows/
   git commit -m "Update: Use official GitHub Pages deployment action"
   git push
   ```
3. **Run manual workflow** to test:
   - Actions → "Run Playwright Tests" → "Run workflow"
4. **Verify deployment** succeeds
5. **Access report** via the generated URL

---

**Your workflows will now work without permission errors!** 🎉
