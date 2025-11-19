# Keystatic Authorization Troubleshooting

## Current Issue: "Authorization failed" after clicking "Login with GitHub"

### Environment Check ✅
The health check shows all environment variables are set:
- `KEYSTATIC_GITHUB_CLIENT_ID`: Ov23lirU4v...
- `KEYSTATIC_GITHUB_CLIENT_SECRET`: Set ✅
- `KEYSTATIC_SECRET`: Set ✅

### Likely Causes

#### 1. GitHub OAuth App Configuration Issues

**Check your GitHub OAuth App settings:**

Go to: https://github.com/settings/developers

Find the OAuth App with Client ID: `Ov23lirU4vSdTWNP6Bgq`

Verify these settings EXACTLY:

```
Application name: (any name is fine)
Homepage URL: https://moteib-client.vercel.app
Authorization callback URL: https://moteib-client.vercel.app/api/keystatic/github/oauth/callback
```

**CRITICAL:** The callback URL must be EXACTLY as shown above:
- No trailing slash
- Must use `https://`
- Must match your production domain exactly

#### 2. KEYSTATIC_SECRET Contains Special Characters ⚠️

**CRITICAL:** If your `KEYSTATIC_SECRET` contains `/`, `+`, or `=` characters, it will cause authorization failures!

The original secret `8AxMdV7iv4/+OPja+S4IH8oAdzX/ltuWyphTQGLIT2k=` contains special characters that break URL encoding.

**Fix:**
1. Go to Vercel → Environment Variables
2. Update `KEYSTATIC_SECRET` to: `4f85fb09f3cb5585be3e8dcaa1fa466dbf47888867b5d6296b3ce13586eadddc`
3. Save and redeploy

Use only alphanumeric characters (letters and numbers) for the secret!

#### 3. Client Secret Issue

The Client Secret format you provided looks like it might be incorrect or outdated.

**To regenerate the Client Secret:**

1. Go to your OAuth App settings: https://github.com/settings/developers
2. Find your app (Client ID: Ov23lirU4vSdTWNP6Bgq)
3. Click "Generate a new client secret"
4. **IMPORTANT:** Copy the new secret immediately (you won't be able to see it again!)
5. Update the `KEYSTATIC_GITHUB_CLIENT_SECRET` in Vercel with the new value
6. Redeploy

Modern GitHub OAuth secrets should look something like:
```
gho_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

If yours looks different (like a SHA hash), it might be incorrect.

#### 3. Repository Access

Make sure:
- The GitHub account you're logging in with has **write access** to the `autonomyowner/Moteib-` repository
- The OAuth App is owned by the `autonomyowner` account
- You're not trying to log in with a different GitHub account

#### 4. OAuth App Permissions

After creating the OAuth App, you need to:
1. Try logging in once
2. GitHub will ask you to authorize the app
3. Make sure to grant access to the `Moteib-` repository when prompted

### Step-by-Step Fix

1. **Regenerate Client Secret:**
   - Go to https://github.com/settings/developers
   - Find your OAuth App
   - Click "Generate a new client secret"
   - Copy the new secret (starts with `gho_` or `ghs_`)

2. **Update Vercel:**
   - Go to your Vercel project settings
   - Find `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - Replace with the NEW client secret
   - Save

3. **Verify Callback URL:**
   - In GitHub OAuth App settings
   - Make sure callback URL is: `https://moteib-client.vercel.app/api/keystatic/github/oauth/callback`
   - No extra spaces, slashes, or characters

4. **Wait for Deployment:**
   - Vercel will automatically redeploy
   - Wait 2-3 minutes

5. **Test Again:**
   - Go to https://moteib-client.vercel.app/keystatic
   - Click "Sign in with GitHub"
   - You should be redirected to GitHub
   - Authorize the app
   - You should be redirected back and logged in

### Still Not Working?

If you still get "Authorization failed" after following all steps:

1. Check browser console for errors (F12 → Console tab)
2. Check Vercel logs for any errors
3. Try logging in with a different browser or incognito mode
4. Make sure you're logged into GitHub with the correct account (autonomyowner)

### Common Mistakes

❌ Callback URL has a trailing slash: `...callback/`
✅ Correct: `...callback`

❌ Using HTTP instead of HTTPS: `http://...`
✅ Correct: `https://...`

❌ Using the wrong domain
✅ Correct: `moteib-client.vercel.app`

❌ Old/invalid client secret
✅ Regenerate and use fresh client secret

❌ Trying to log in with a GitHub account that doesn't have repo access
✅ Use the `autonomyowner` account or one with write access
