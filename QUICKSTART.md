# Quick Start Guide

## Get Up and Running in 5 Minutes

### Step 1: Apply Database Schema (2 minutes)

1. Go to your Supabase project: https://supabase.com/dashboard/project/wwvqkgnqcplzsxvlthib
2. Click **SQL Editor** in the sidebar
3. Create a new query
4. Copy ALL contents from `supabase/schema.sql`
5. Paste and click **Run**

✅ You should see "Success. No rows returned"

### Step 2: Enable OAuth Providers (Optional - 3 minutes)

**For Email Only:**
Skip this step - email auth is already enabled!

**For Google/GitHub OAuth:**
1. Go to **Authentication > Providers**
2. Enable your desired provider
3. Add OAuth credentials from Google/GitHub Console
4. Save changes

### Step 3: Start Your App (30 seconds)

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### Step 4: Test It Out!

1. Open http://localhost:3000
2. Click **Sign up** in the header
3. Create an account with your email
4. Check your email for confirmation link
5. Click the link to confirm
6. Navigate to **Rooms** in the header
7. Click **Create Room**
8. Fill in room details and create
9. You'll be taken to the voice room!

---

## What You Just Set Up

### Authentication ✅
- Email/password signup
- Magic link login
- OAuth (Google, GitHub)
- Session persistence

### Room Management ✅
- Create voice rooms
- List your rooms
- Join rooms
- Room ownership tracking

### Voice Chat ✅
- LiveKit integration
- High-quality audio
- Noise suppression
- Echo cancellation

---

## Common Commands

```bash
# Start dev server (client + server)
npm run dev

# Start only client
cd apps/client && npm run dev

# Start only server
cd apps/server && npm run dev

# Build for production
npm run build
```

---

## URLs to Bookmark

- **Local App**: http://localhost:3000
- **Supabase Dashboard**: https://supabase.com/dashboard/project/wwvqkgnqcplzsxvlthib
- **Signup Page**: http://localhost:3000/signup
- **Login Page**: http://localhost:3000/login
- **Rooms Page**: http://localhost:3000/rooms

---

## Quick Troubleshooting

**Can't sign up?**
- Check that schema was applied correctly
- Look for errors in Supabase dashboard logs

**Not receiving emails?**
- Check spam folder
- Verify email settings in Supabase > Authentication > Email Templates

**Room creation fails?**
- Make sure you're logged in
- Check browser console for errors
- Verify schema includes rooms table

**Voice not working?**
- Check microphone permissions
- Verify LiveKit credentials in .env.local
- Test with a different browser

---

## Next Steps

1. **Customize**: Update branding, colors, and text
2. **Integrate**: Connect mindmaps with voice rooms
3. **Deploy**: Push to Vercel or your hosting platform
4. **Scale**: Add more features from CONFIGURATION_SUMMARY.md

---

## Need Help?

Check these files for detailed information:
- `SUPABASE_SETUP.md` - Detailed Supabase configuration
- `CONFIGURATION_SUMMARY.md` - Complete technical documentation
- `README.md` - Project overview

---

## You're All Set! 🎉

Your MINDSHIFT ARABIA app is now configured with:
- ✅ Full authentication system
- ✅ Room management
- ✅ Voice chat capabilities
- ✅ Secure database with RLS
- ✅ Beautiful UI

Start creating rooms and collaborating!

