# 🔧 Vercel Build Error - Quick Fix

## ⚠️ Error You're Seeing:
```
Failed to collect page data for /api/keystatic/[...params]
```

## 🎯 The Problem:
Keystatic API routes are trying to access environment variables that don't exist yet, causing the build to fail.

## ✅ The Solution: Add Placeholder Environment Variables

### Quick Fix - Add These to Vercel NOW (Before Deploying):

Go to your Vercel project → Settings → Environment Variables

Add these **temporary placeholder** variables:

```
KEYSTATIC_GITHUB_CLIENT_ID
```
Value:
```
placeholder_will_update_after_deployment
```

```
KEYSTATIC_GITHUB_CLIENT_SECRET
```
Value:
```
placeholder_will_update_after_deployment
```

```
KEYSTATIC_SECRET
```
Value (use this exact alphanumeric string):
```
temporarysecretforbuildonlyreplacelater123456
```

```
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
```
Value:
```
placeholder
```

```
JWT_SECRET
```
Value (generate with this command):
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 64))"
```

Or use this:
```
temporaryJWTsecretforbuildonlyreplacelater123456789012345678
```

### Now Deploy Again:

1. Click "Deploy" or "Redeploy"
2. Build should succeed this time
3. Note your deployment URL

---

## 🔄 After Successful Deployment - Update Variables

### Step 1: Create Real Keystatic GitHub App

1. Visit: `https://YOUR_VERCEL_URL.vercel.app/keystatic`

2. Click "Create GitHub App" / "Connect to GitHub"

3. Follow the wizard - it will generate a `.env` file with real values:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=Ov23...
   KEYSTATIC_GITHUB_CLIENT_SECRET=ghs_...
   KEYSTATIC_SECRET=abc123...
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
   ```

### Step 2: Replace Placeholder Variables

1. Go to Vercel → Settings → Environment Variables

2. **Edit each variable** (click the pencil icon):
   - Replace `KEYSTATIC_GITHUB_CLIENT_ID` with real value from `.env`
   - Replace `KEYSTATIC_GITHUB_CLIENT_SECRET` with real value from `.env`
   - Replace `KEYSTATIC_SECRET` with real value from `.env`
   - Replace `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` with real value from `.env`

3. **IMPORTANT:** If the real `KEYSTATIC_SECRET` contains special characters (+, /, =), generate a new one:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Step 3: Redeploy

1. Go to Deployments
2. Click "Redeploy"
3. Wait 2-3 minutes
4. Test `/keystatic` - should work now!

---

## 📋 Complete Environment Variables List

Here's what you should have in Vercel:

### Required for Build (Placeholders OK):
- `KEYSTATIC_GITHUB_CLIENT_ID` ← Update after first deploy
- `KEYSTATIC_GITHUB_CLIENT_SECRET` ← Update after first deploy
- `KEYSTATIC_SECRET` ← Update after first deploy
- `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` ← Update after first deploy
- `JWT_SECRET` ← Can keep temporary or generate real one

### Optional (If Using Database):
- `DATABASE_URL` ← Only if you need database

---

## 🚀 Quick Summary of Steps:

1. ✅ Add placeholder environment variables to Vercel
2. ✅ Deploy - build should succeed
3. ✅ Visit `/keystatic` on deployed site
4. ✅ Create GitHub App through wizard
5. ✅ Copy real values from generated `.env` file
6. ✅ Update environment variables in Vercel with real values
7. ✅ Redeploy
8. ✅ Test - everything should work!

---

## 🆘 If Build Still Fails:

### Check the Build Logs for Specific Error

**Common issues:**

1. **Root Directory not set:**
   - Make sure `Root Directory` = `apps/client`

2. **Missing dependencies:**
   - Build should auto-install, but check logs

3. **TypeScript errors:**
   - Should not happen - code was working
   - Check if all environment variables are set

---

## ✅ Success Checklist

After following the fix:

- [ ] Build completes successfully
- [ ] Site is accessible at Vercel URL
- [ ] Homepage loads
- [ ] Blog pages load
- [ ] `/keystatic` loads (may ask to sign in)
- [ ] After updating real variables and redeploying:
  - [ ] Can sign into Keystatic with GitHub
  - [ ] See all 4 articles in dashboard
  - [ ] Can edit articles

---

**START HERE:** Add the placeholder environment variables above to Vercel, then click "Redeploy"!
