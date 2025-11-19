# ✅ Correct Way to Setup Keystatic (No 404 Errors!)

## ⚠️ The Problem You're Experiencing:

Getting 404 error when clicking "Login with GitHub" on `/keystatic` page.

**Why:** You need to create the Keystatic GitHub App BEFORE deploying to production, not after.

---

## 🎯 The Correct Setup Process:

### Step 1: Run Keystatic Locally FIRST

You need to generate the GitHub App credentials on your local machine first.

**On your local machine:**

1. **Make sure you're on the client's repository:**
   ```bash
   git remote -v
   # Should show: github.com/mindshiftmmoteib-arch/mindshift.git
   ```

2. **Temporarily switch Keystatic to GitHub mode:**

   Edit `apps/client/keystatic.config.tsx`:
   ```typescript
   export default config({
     storage: {
       kind: 'github',
       repo: 'mindshiftmmoteib-arch/mindshift'
     },
     // ... rest of config
   ```

3. **Run the development server:**
   ```bash
   cd apps/client
   npm run dev
   ```

4. **Visit local Keystatic:**
   ```
   http://localhost:3000/keystatic
   ```

5. **Create GitHub App:**
   - Click "Create GitHub App" or "Connect to GitHub"
   - **IMPORTANT:** Sign in with CLIENT'S GitHub account (mindshiftmmoteib-arch)
   - Follow the wizard
   - Authorize the app
   - Select repository: `mindshift`

6. **Copy Generated Environment Variables:**

   After completing the wizard, check your local directory for a `.env` file.

   It will contain:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=Ov23...
   KEYSTATIC_GITHUB_CLIENT_SECRET=ghs_...
   KEYSTATIC_SECRET=abc123...
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
   ```

7. **IMPORTANT - Save these values!** You'll need them for Vercel.

8. **Restore local development config:**

   Edit `apps/client/keystatic.config.tsx` back to:
   ```typescript
   export default config({
     storage: process.env.NODE_ENV === 'production'
       ? {
           kind: 'github',
           repo: 'mindshiftmmoteib-arch/mindshift'
         }
       : {
           kind: 'local',
         },
     // ... rest of config
   ```

9. **Commit and push:**
   ```bash
   git add apps/client/keystatic.config.tsx
   git commit -m "Restore environment-based Keystatic storage"
   git push
   ```

---

### Step 2: Add Real Variables to Vercel

Now that you have REAL credentials:

1. **Go to Vercel → Settings → Environment Variables**

2. **Delete or Update the placeholder variables**

3. **Add the REAL values from the `.env` file:**

   ```
   KEYSTATIC_GITHUB_CLIENT_ID
   ```
   Value: (the `Ov23...` value from .env)

   ```
   KEYSTATIC_GITHUB_CLIENT_SECRET
   ```
   Value: (the `ghs_...` value from .env)

   ```
   KEYSTATIC_SECRET
   ```
   Value: (from .env - if it has special chars, regenerate):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   ```
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
   ```
   Value: (from .env)

   ```
   JWT_SECRET
   ```
   Value:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Save all variables**

---

### Step 3: Update GitHub App Callback URL

**CRITICAL:** Update the GitHub App to point to your production URL:

1. **On CLIENT'S GitHub account**, go to: https://github.com/settings/apps

2. **Find the Keystatic app** you just created

3. **Click "Edit"**

4. **Update "Callback URL"** to:
   ```
   https://YOUR_VERCEL_URL.vercel.app/api/keystatic/github/oauth/callback
   ```

   Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL.

5. **Save changes**

---

### Step 4: Redeploy on Vercel

1. Go to Vercel → Deployments
2. Click "Redeploy"
3. Wait 2-3 minutes

---

### Step 5: Test Production Keystatic

1. Visit: `https://YOUR_VERCEL_URL.vercel.app/keystatic`

2. Click "Sign in with GitHub"

3. Should redirect to GitHub ✅

4. Authorize ✅

5. Should redirect back to Keystatic dashboard ✅

6. You should see all 4 articles ✅

---

## 🔄 Alternative: Use Keystatic Cloud (Easier)

If the above is too complicated, you can use Keystatic Cloud mode which handles GitHub authentication for you:

### Change to Cloud Mode:

**Edit `apps/client/keystatic.config.tsx`:**

```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'mindshift-arabia/mindshift'
  },
  collections: {
    // ... your existing collections
  }
});
```

Then:
1. Sign up at https://keystatic.cloud/
2. Connect your GitHub repository
3. Much simpler OAuth flow
4. No environment variables needed

---

## 📋 Checklist for Success:

### Before Deploying to Vercel:
- [ ] Run Keystatic locally
- [ ] Create GitHub App via local Keystatic
- [ ] Save all 4 environment variables from `.env` file
- [ ] Note GitHub App name and ID

### In Vercel:
- [ ] Add all 4 real environment variables
- [ ] Add JWT_SECRET
- [ ] Deploy

### After Deployment:
- [ ] Update GitHub App callback URL to Vercel URL
- [ ] Test `/keystatic` page
- [ ] Test GitHub login
- [ ] Verify all articles appear

---

## 🆘 Troubleshooting:

### Still getting 404?
- Check GitHub App callback URL exactly matches Vercel URL
- Make sure all 4 Keystatic environment variables are set in Vercel
- Check Vercel build logs for errors
- Redeploy after adding variables

### "Application not found" error?
- GitHub App callback URL doesn't match
- Update callback URL in GitHub App settings

### Can't see articles in dashboard?
- Check articles are in `content/articles/` at repository root
- Verify all articles have `published: true`
- Check Vercel build logs

---

## ✅ Success Indicators:

When everything works:
- ✅ No 404 errors on `/keystatic`
- ✅ GitHub login redirects properly
- ✅ See Keystatic dashboard after login
- ✅ All 4 articles visible
- ✅ Can edit and save articles
- ✅ Changes appear on blog in 2-3 minutes

---

**Start with Step 1: Run Keystatic locally to generate the GitHub App!**
