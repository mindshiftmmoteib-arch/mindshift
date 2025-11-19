# Fix Keystatic GitHub App Issue - Complete Steps

## Problem
Keystatic is trying to commit to wrong repository (`mindshiftmmoteib-arch/Moteib`) instead of the correct one (`mindshiftmmoteib-arch/mindshift`)

## Solution Steps

### Step 1: Update GitHub App OAuth Settings
1. Go to: https://github.com/settings/apps/moteib-keystatic-cms
2. Click "Edit" on your app
3. Update these URLs:
   - **Homepage URL**: Your actual site URL (e.g., `https://your-domain.vercel.app`)
   - **Callback URL**: `https://your-domain.vercel.app/api/keystatic/github/oauth/callback`
4. Click "Save changes"

### Step 2: Verify GitHub App Installation
1. Go to: https://github.com/settings/installations
2. Find "moteib-keystatic-cms"
3. Click "Configure"
4. Make sure:
   - `mindshiftmmoteib-arch/mindshift` is selected (NOT Moteib)
   - Permissions include:
     - Contents: Read and write
     - Metadata: Read
     - Pull requests: Read and write
5. Click "Save"

### Step 3: Update Vercel Environment Variables
1. Go to your Vercel project settings
2. Navigate to: Settings → Environment Variables
3. **DELETE** all existing Keystatic variables:
   - Any variable starting with `KEYSTATIC_`
   - Any variable with `GITHUB_APP`
4. Add the new variables from `vercel-env-vars.txt`
5. Make sure each variable is enabled for "Production"
6. Click "Save"

### Step 4: Clear Cache and Redeploy
1. In Vercel, go to your project dashboard
2. Click the "..." menu → "Redeploy"
3. Choose "Use existing Build Cache" option
4. Click "Redeploy"
5. Wait for deployment to complete

### Step 5: Test
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Visit: `https://your-site.vercel.app/keystatic`
3. Try to edit/delete an article
4. It should now work without the fork message!

## If Still Not Working

### Check Debug Info
Visit: `https://your-site.vercel.app/api/keystatic/debug`
This will show you what configuration Keystatic is using.

### Verify Repository Name
Run this locally to ensure the config is correct:
```bash
cd apps/client
grep -r "repo:" keystatic.config.tsx
```
Should show: `repo: 'mindshiftmmoteib-arch/mindshift'`

### Force Clean Rebuild
In Vercel:
1. Go to Settings → Functions
2. Click "Purge All" under "Purge Cache"
3. Redeploy without cache

## Common Issues

1. **Wrong repository in error**: Cache issue - follow Step 4
2. **403 Forbidden**: App not installed - follow Step 2
3. **OAuth error**: Callback URL mismatch - follow Step 1
4. **Can't authenticate**: Missing env vars - follow Step 3