# Keystatic CMS Setup Guide

This project uses Keystatic CMS for managing blog articles with bilingual support (English and Arabic).

## ⚠️ CRITICAL: You Must Run Local Setup First!

**Do NOT manually create a GitHub OAuth App!** Keystatic has its own GitHub App creation flow that must be used.

## Local Development & GitHub App Creation

1. **Run the project locally:**
   ```bash
   cd apps/client
   npm run dev
   ```

2. **Visit Keystatic UI:**
   ```
   http://localhost:3000/keystatic
   ```

3. **Create GitHub App through Keystatic:**
   - Click "Connect to GitHub" or "Create new GitHub App"
   - Keystatic will guide you through the GitHub App creation process
   - Authorize the app when prompted
   - Select the `Moteib-` repository for access

4. **Keystatic auto-generates `.env` file:**
   - After authorization, check `apps/client/.env`
   - It will contain all required variables:
     ```
     KEYSTATIC_GITHUB_CLIENT_ID=...
     KEYSTATIC_GITHUB_CLIENT_SECRET=...
     KEYSTATIC_SECRET=...
     NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
     ```

## Production Setup (Vercel + GitHub)

For production, Keystatic needs to use GitHub as the storage backend since Vercel's filesystem is read-only.

### Step 1: Use the Generated Environment Variables

After running the local setup above, you'll have a `.env` file. Copy ALL the variables from it.

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Paste the entire contents of your `.env` file
   - Vercel will parse it automatically
4. **OR** add them individually:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=<from .env file>
   KEYSTATIC_GITHUB_CLIENT_SECRET=<from .env file>
   KEYSTATIC_SECRET=<from .env file>
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=<from .env file>
   ```

**CRITICAL NOTES:**
- Use the EXACT values from the `.env` file Keystatic generated
- Do NOT use manually created OAuth App credentials
- The GitHub App created by Keystatic has specific permissions that a manual OAuth App doesn't have

### Step 3: Deploy

After adding the environment variables, redeploy your Vercel application.

### Step 4: Access Keystatic in Production

1. Visit `https://your-domain.vercel.app/keystatic`
2. Click "Sign in with GitHub"
3. Authorize the OAuth app
4. You can now create and edit articles in production!

## How It Works

- **Development**: Articles are stored in `content/articles/` locally
- **Production**: When you create/edit articles via Keystatic, it creates a Pull Request in your GitHub repository
- After merging the PR, Vercel automatically rebuilds and deploys with the new content

## Content Structure

Each article is stored in `content/articles/[slug]/` with:
- `entry.yaml` - Article metadata (titles, excerpts, publish status, date)
- `contentEn.mdoc` - English content in Markdoc format
- `contentAr.mdoc` - Arabic content in Markdoc format

## Troubleshooting

### 500 Error when trying to create articles in production

This means the environment variables are not set correctly. Double-check:
1. All three environment variables are added in Vercel
2. The OAuth callback URL matches exactly
3. You've redeployed after adding the variables

### GitHub OAuth not working

Make sure the callback URL in GitHub OAuth settings matches your production domain exactly.
