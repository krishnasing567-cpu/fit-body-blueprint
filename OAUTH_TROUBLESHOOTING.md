# Google & GitHub Login Troubleshooting Guide

## Current Status

Your Supabase project is configured with:
- **Project ID**: nwtawfirunphqdzvqipb
- **URL**: https://nwtawfirunphqdzvqipb.supabase.co
- **Publishable Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

## Why OAuth Login Isn't Working

The OAuth providers (Google & GitHub) are **not enabled** in your Supabase project. You need to:

1. ✅ Enable each provider in Supabase Authentication settings
2. ✅ Provide OAuth credentials from Google Cloud and GitHub
3. ✅ Configure the correct redirect URLs

## Step-by-Step Setup

### Step 1: Go to Supabase Dashboard

1. Visit: https://app.supabase.com
2. Select your project: **nwtawfirunphqdzvqipb**
3. Go to: **Authentication → Providers**

---

## Set Up Google OAuth

### In Google Cloud Console:

1. Go to: https://console.cloud.google.com/
2. Create a new project named "NutriLife"
3. Enable **Google+ API**:
   - APIs & Services → Library
   - Search "Google+ API"
   - Click Enable

4. Create OAuth Credentials:
   - APIs & Services → Credentials
   - Click "+ Create Credentials" → OAuth 2.0 Client ID
   - Choose "Web application"
   - Add URIs:
     ```
     Authorized redirect URIs:
     https://nwtawfirunphqdzvqipb.supabase.co/auth/v1/callback?provider=google
     http://localhost:5173/auth/callback
     ```
   - Create and copy the **Client ID** and **Client Secret**

### In Supabase:

1. Go to: Authentication → Providers → Google
2. Enable the provider (toggle ON)
3. Paste:
   - **Client ID**: (from Google Cloud Console)
   - **Client Secret**: (from Google Cloud Console)
4. Click "Save"

---

## Set Up GitHub OAuth

### In GitHub:

1. Go to: https://github.com/settings/developers
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: NutriLife
   - **Homepage URL**: http://localhost:5173
   - **Authorization callback URL**: 
     ```
     https://nwtawfirunphqdzvqipb.supabase.co/auth/v1/callback?provider=github
     ```
4. Register and copy **Client ID** and **Client Secret**

### In Supabase:

1. Go to: Authentication → Providers → GitHub
2. Enable the provider (toggle ON)
3. Paste:
   - **Client ID**: (from GitHub)
   - **Client Secret**: (from GitHub)
4. Click "Save"

---

## Verify Your Setup

### In Supabase Authentication Settings:

1. Go to: **Authentication → URL Configuration**
2. Make sure these are correct:
   - **Site URL**: `http://localhost:5173`
   - **Redirect URLs**: 
     ```
     http://localhost:5173/auth/callback
     http://localhost:5173
     ```

3. Go to: **Authentication → Providers**
4. Check that both Google ✅ and GitHub ✅ show as enabled

---

## Test the Login

1. Start your app: `npm run dev`
2. Go to: http://localhost:5173/auth/login
3. Click "Continue with Google" or "Continue with GitHub"
4. You should be redirected to the OAuth login page

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Invalid client" error | Check Client ID & Secret are correct |
| Redirect URL mismatch | Ensure `http://localhost:5173/auth/callback` is added to both Google Cloud and GitHub settings |
| Button doesn't respond | Check browser console for errors (F12) |
| Still on login page after OAuth | Check if `/auth/callback` route exists |

---

## Quick Checklist

- [ ] Google OAuth Client ID & Secret obtained
- [ ] GitHub OAuth Client ID & Secret obtained
- [ ] Google OAuth enabled in Supabase with credentials
- [ ] GitHub OAuth enabled in Supabase with credentials
- [ ] Redirect URLs configured in Supabase
- [ ] Redirect URLs configured in Google Cloud Console
- [ ] Redirect URLs configured in GitHub
- [ ] Site URL in Supabase matches your dev URL
- [ ] Tested login with Google
- [ ] Tested login with GitHub

---

## Getting Help

If it still doesn't work:

1. **Check browser console** (F12 → Console tab):
   - Look for error messages
   - Screenshot and share any errors

2. **Check Supabase logs**:
   - In Supabase dashboard → Logs → Auth
   - Look for authentication failures

3. **Check environment variables**:
   - Verify `.env` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`

