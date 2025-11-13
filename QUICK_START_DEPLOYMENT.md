# Quick Start: Deploy Agent Worker in 5 Minutes

## Fastest Way: Render.com (Free)

### Step 1: Push to GitHub (2 minutes)
```bash
cd "D:\MindshiftArabia\Phase3"
git init
git add .
git commit -m "Initial commit with agent worker"
git remote add origin https://github.com/YOUR_USERNAME/your-repo.git
git push -u origin main
```

### Step 2: Deploy on Render (3 minutes)

1. Go to https://render.com → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name**: `agent-worker`
   - **Root Directory**: `agent-worker`
   - **Environment**: `Docker`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   ```
   LIVEKIT_URL=wss://travcoies-9h1ntokz.livekit.cloud
   LIVEKIT_API_KEY=APIJ3p9EvfKirbr
   LIVEKIT_API_SECRET=VZMtypNewY4UVjb6DWEyqFz3GdDjfzhmVTneLfQcARVA
   GOOGLE_API_KEY=AIzaSyAj-SGLoneB87aHsSx3tUPwKWhdASJnenw
   CARTESIA_API_KEY=sk_car_6mCMiBXvFnPMo9VskKP937
   ```

6. Click "Create Web Service"
7. Wait 3-5 minutes for deployment

### Step 3: Configure Your App

Create `apps/client/.env.local`:
```env
LIVEKIT_URL=https://travcoies-9h1ntokz.livekit.cloud
LIVEKIT_API_KEY=APIJ3p9EvfKirbr
LIVEKIT_API_SECRET=VZMtypNewY4UVjb6DWEyqFz3GdDjfzhmVTneLfQcARVA
NEXT_PUBLIC_LIVEKIT_URL=wss://travcoies-9h1ntokz.livekit.cloud
```

### Step 4: Test

1. Start your app: `cd apps/client && npm run dev`
2. Go to a voice room
3. Click "Start Agent"
4. Start speaking - translation should work!

## That's It! 🎉

For detailed troubleshooting, see `AGENT_WORKER_DEPLOYMENT.md`

