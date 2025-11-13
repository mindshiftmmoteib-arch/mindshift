# Agent Worker Deployment Guide - Step by Step

This guide will help you deploy the translation agent worker for FREE and make your app work.

## Prerequisites

- GitHub account (free)
- Render.com account (free tier available)
- Your LiveKit credentials (already have them)
- Google API key (already have it)
- Cartesia API key (already have it)

---

## Part 1: Prepare Your Local Environment

### Step 1: Create/Update Local Environment File

1. Navigate to your project root: `D:\MindshiftArabia\Phase3`

2. Create or update `apps/client/.env.local` file with these variables:

```env
## Client
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

## Server (for Next.js API routes)
LIVEKIT_URL=https://travcoies-9h1ntokz.livekit.cloud
LIVEKIT_API_KEY=APIJ3p9EvfKirbr
LIVEKIT_API_SECRET=VZMtypNewY4UVjb6DWEyqFz3GdDjfzhmVTneLfQcARVA
GOOGLE_API_KEY=AIzaSyAj-SGLoneB87aHsSx3tUPwKWhdASJnenw
CARTESIA_API_KEY=sk_car_6mCMiBXvFnPMo9VskKP937

## App
NEXT_PUBLIC_APP_NAME=NeuroCanvas
NEXT_PUBLIC_ENV=development
APP_URL=http://localhost:3000

## LiveKit (Client-side)
NEXT_PUBLIC_LIVEKIT_URL=wss://travcoies-9h1ntokz.livekit.cloud
```

**Important:** The `LIVEKIT_URL` for server-side (API routes) must use HTTPS, while `NEXT_PUBLIC_LIVEKIT_URL` uses WSS for client-side.

---

## Part 2: Deploy Agent Worker to Render.com (FREE)

### Step 2: Push Agent Worker to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd "D:\MindshiftArabia\Phase3"
   git init
   git add .
   git commit -m "Add translation agent worker"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name it: `travvoices-phase3` (or any name)
   - Choose **Private** (free)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/travvoices-phase3.git
   git branch -M main
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your GitHub username)

### Step 3: Create Render.com Account

1. Go to https://render.com
2. Sign up with GitHub (free)
3. Connect your GitHub account

### Step 4: Deploy Agent Worker on Render

1. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `travvoices-phase3`
   - Select the repository

2. **Configure the Service**:
   - **Name**: `travvoices-agent-worker`
   - **Region**: Choose closest to you (e.g., `Oregon (US West)`)
   - **Branch**: `main`
   - **Root Directory**: `agent-worker`
   - **Environment**: `Docker`
   - **Instance Type**: `Free` (512 MB RAM, 0.5 vCPU)

3. **Add Environment Variables**:
   Click "Advanced" and add these environment variables:

   ```
   LIVEKIT_URL=wss://travcoies-9h1ntokz.livekit.cloud
   LIVEKIT_API_KEY=APIJ3p9EvfKirbr
   LIVEKIT_API_SECRET=VZMtypNewY4UVjb6DWEyqFz3GdDjfzhmVTneLfQcARVA
   GOOGLE_API_KEY=AIzaSyAj-SGLoneB87aHsSx3tUPwKWhdASJnenw
   CARTESIA_API_KEY=sk_car_6mCMiBXvFnPMo9VskKP937
   ```

   **Important:** For Render, use `wss://` (WebSocket Secure) for `LIVEKIT_URL`, not `https://`

4. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically:
     - Build the Docker image
     - Start your agent worker
     - Keep it running 24/7 (free tier spins down after 15 min inactivity, but will auto-start on demand)

5. **Check Logs**:
   - Once deployed, go to "Logs" tab
   - You should see: `"Starting interpreter agent..."` when a job is dispatched
   - If you see connection errors, double-check your environment variables

---

## Part 3: Configure Your Next.js App

### Step 5: Update Production Environment Variables

If you're deploying your Next.js app (Vercel, Netlify, etc.), add these to your hosting platform:

**For Vercel/Netlify:**
1. Go to your project settings → Environment Variables
2. Add these (mark as "Server-side" or "Build-time" for sensitive ones):

```
LIVEKIT_URL=https://travcoies-9h1ntokz.livekit.cloud
LIVEKIT_API_KEY=APIJ3p9EvfKirbr
LIVEKIT_API_SECRET=VZMtypNewY4UVjb6DWEyqFz3GdDjfzhmVTneLfQcARVA
NEXT_PUBLIC_LIVEKIT_URL=wss://travcoies-9h1ntokz.livekit.cloud
```

**Note:** `GOOGLE_API_KEY` and `CARTESIA_API_KEY` are NOT needed in Next.js - only in the agent worker.

### Step 6: Test Locally

1. **Start your Next.js app**:
   ```bash
   cd apps/client
   npm run dev
   ```

2. **Verify Agent Worker is Running**:
   - Check Render dashboard → Logs
   - You should see the agent connecting to LiveKit

3. **Test Translation**:
   - Open your app: http://localhost:3000
   - Navigate to a voice room
   - You should see the "Real-time Translation" section
   - Select two languages (e.g., Arabic and French)
   - Click "Start Agent"
   - Wait 5-10 seconds for the agent to join
   - Start speaking in one language - it should translate to the other!

---

## Part 4: Troubleshooting

### Issue: "Agent not dispatching" or 500 error

**Solutions:**
1. Check `apps/client/.env.local` has `LIVEKIT_URL` (HTTPS, not WSS)
2. Check Next.js API route logs in terminal
3. Verify Render agent worker logs show it's connected

### Issue: "Agent dispatched but not joining room"

**Solutions:**
1. Check Render logs - agent should show connection attempts
2. Verify all environment variables in Render are correct
3. Make sure `LIVEKIT_URL` in Render uses `wss://` format
4. Check that agent worker service is running (not sleeping)

### Issue: "Translation not working"

**Solutions:**
1. Check Render logs for agent activity
2. Verify Google API key is valid
3. Verify Cartesia API key is valid
4. Check browser console for errors

### Issue: "Render service keeps sleeping"

**Render Free Tier Behavior:**
- Services spin down after 15 minutes of inactivity
- They auto-start when a request comes in (may take 30-60 seconds)
- For production, consider upgrading to "Starter" plan ($7/month for always-on)

**Workaround:**
- Use a free uptime monitoring service (like UptimeRobot) to ping your Render service every 10 minutes

---

## Part 5: Alternative Free Deployment (Railway.app)

If Render doesn't work, try Railway.app:

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Add environment variables (same as Render)
6. Set root directory to `agent-worker`
7. Railway auto-detects Docker and deploys

---

## Quick Checklist

- [ ] Created `apps/client/.env.local` with all variables
- [ ] Pushed code to GitHub
- [ ] Created Render.com account
- [ ] Deployed agent worker on Render
- [ ] Added all 5 environment variables to Render
- [ ] Verified agent worker is running (check logs)
- [ ] Tested translation feature in your app
- [ ] Translation works! 🎉

---

## Cost Summary

- **Render.com**: FREE (agent worker)
- **GitHub**: FREE (code hosting)
- **LiveKit**: Already have (free tier)
- **Google Gemini**: FREE tier available
- **Cartesia TTS**: FREE tier available

**Total Cost: $0/month** ✅

---

## Next Steps After Deployment

1. **Monitor Agent Worker**: Check Render logs regularly
2. **Test with Real Users**: Have users join rooms and test translation
3. **Scale if Needed**: If you get more traffic, upgrade Render plan
4. **Add More Languages**: Edit `interpreter.py` to add more language options

---

## Support

If you encounter issues:
1. Check Render logs first
2. Check Next.js terminal output
3. Check browser console for errors
4. Verify all environment variables are correct

Good luck! 🚀

