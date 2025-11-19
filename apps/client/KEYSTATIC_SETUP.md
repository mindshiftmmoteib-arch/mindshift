# Keystatic CMS Setup Guide

This project uses Keystatic CMS for managing blog articles with bilingual support (English and Arabic).

## Local Development

In development, Keystatic uses local file storage. Simply access the CMS at:
```
http://localhost:3000/keystatic
```

## Production Setup (Vercel + GitHub)

For production, Keystatic needs to use GitHub as the storage backend since Vercel's filesystem is read-only.

### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Moteib CMS (or any name you prefer)
   - **Homepage URL**: `https://your-domain.vercel.app`
   - **Authorization callback URL**: `https://your-domain.vercel.app/api/keystatic/github/oauth/callback`
4. Click "Register application"
5. Note down the **Client ID**
6. Click "Generate a new client secret" and note it down

### Step 2: Configure Vercel Environment Variables

In your Vercel project settings, add these environment variables:

```
KEYSTATIC_GITHUB_CLIENT_ID=Ov23lirU4vSdTWNP6Bgq
KEYSTATIC_GITHUB_CLIENT_SECRET=513d9b1f6c2dfbead9fd7afae639ebc9e1b68893
KEYSTATIC_SECRET=8AxMdV7iv4/+OPja+S4IH8oAdzX/ltuWyphTQGLIT2k=
```

**Important:** Make sure your GitHub OAuth App callback URL is set to:
```
https://moteib-client.vercel.app/api/keystatic/github/oauth/callback
```

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
