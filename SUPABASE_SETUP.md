# Supabase Setup Instructions

## Configuration Complete

Your NeuroCanvas application has been configured with the following Supabase credentials:

- **Project URL**: `https://wwvqkgnqcplzsxvlthib.supabase.co`
- **Anon Key**: Configured in environment files

## Next Steps

### 1. Apply Database Schema

You need to run the SQL schema in your Supabase project:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/wwvqkgnqcplzsxvlthib
2. Navigate to **SQL Editor** in the left sidebar
3. Create a new query
4. Copy the contents of `supabase/schema.sql` file
5. Paste it into the SQL editor
6. Click **Run** to execute the schema

This will create the following tables:
- `users` - User profiles linked to auth.users
- `maps` - Mindmap data
- `map_versions` - Version history for maps
- `templates` - Mindmap templates
- `rooms` - Voice collaboration rooms

### 2. Configure Authentication Providers

#### Email Authentication (Magic Link)
Already enabled by default in Supabase.

#### OAuth Providers (Optional)

**For Google OAuth:**
1. Go to **Authentication > Providers** in Supabase dashboard
2. Enable Google provider
3. Add your Google OAuth credentials (Client ID and Client Secret)
4. Set redirect URL: `https://wwvqkgnqcplzsxvlthib.supabase.co/auth/v1/callback`

**For GitHub OAuth:**
1. Go to **Authentication > Providers** in Supabase dashboard
2. Enable GitHub provider
3. Add your GitHub OAuth credentials
4. Set redirect URL: `https://wwvqkgnqcplzsxvlthib.supabase.co/auth/v1/callback`

### 3. Configure Email Templates (Optional)

Customize the magic link email template:
1. Go to **Authentication > Email Templates**
2. Edit the "Magic Link" template
3. Add your branding and customize the message

### 4. Environment Files

Your environment files have been configured:

**Client (.env.local):**
```
NEXT_PUBLIC_LIVEKIT_URL=wss://travcoies-9h1ntokz.livekit.cloud
LIVEKIT_API_KEY=APIJ3p9EvfKirbr
LIVEKIT_API_SECRET=VZMtypNewY4UVjb6DWEyqFz3GdDjfzhmVTneLfQcARVA

NEXT_PUBLIC_SUPABASE_URL=https://wwvqkgnqcplzsxvlthib.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Server (.env):**
```
PORT=4000
SUPABASE_URL=https://wwvqkgnqcplzsxvlthib.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
AI_PROVIDER=mock
```

### 5. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/signup` to create a test account
3. Check your email for the confirmation link
4. After confirming, log in at `/login`
5. Visit `/rooms` to create your first voice room
6. Join a room to test the voice functionality

## Features Implemented

### Authentication
- ✅ Email magic link authentication
- ✅ OAuth support (Google, GitHub)
- ✅ Password-based signup
- ✅ Auth callback handling
- ✅ Session persistence
- ✅ Protected routes

### Room Management
- ✅ Create voice rooms
- ✅ List user's rooms
- ✅ Join rooms with authentication
- ✅ Room access control via RLS
- ✅ LiveKit integration for voice

### Database Structure
- ✅ User profiles
- ✅ Mindmaps storage
- ✅ Version control for maps
- ✅ Templates system
- ✅ Rooms table with owner tracking
- ✅ Row Level Security (RLS) policies

## API Endpoints

### Room API
- `POST /api/rooms/create` - Create a new voice room
- `GET /api/rooms/list` - List user's rooms
- `GET /api/livekit/token` - Get LiveKit access token

## Security Notes

- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Rooms are visible to authenticated users but only owners can modify them
- LiveKit tokens are generated per session with proper scoping

## Troubleshooting

### "Supabase is not configured" Error
- Ensure environment variables are set correctly
- Restart the development server after changing .env files

### Authentication Issues
- Check that the schema has been applied to your Supabase project
- Verify the Supabase URL and anon key are correct
- Check browser console for detailed error messages

### Room Creation Issues
- Ensure you're logged in
- Check that the user profile exists (automatically created on first room creation)
- Verify the database schema includes the rooms table

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [LiveKit Documentation](https://docs.livekit.io)
- [Next.js Documentation](https://nextjs.org/docs)

