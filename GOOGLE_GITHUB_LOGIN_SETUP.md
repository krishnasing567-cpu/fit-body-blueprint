# Google & GitHub Login - Complete Setup Guide

## 🎯 The Problem

The Google and GitHub login buttons don't work because:
1. **OAuth providers aren't enabled** in your Supabase project
2. **Client credentials aren't configured** (Client ID & Secret from Google/GitHub)
3. **Redirect URLs aren't set up** in Google Cloud Console and GitHub

## ✅ What I've Fixed

I've updated your authentication system with:
- **Better error messages** - You'll see what went wrong
- **Improved OAuth flow** - PKCE flow for better security
- **Better session detection** - Automatically detects OAuth callbacks
- **Error handling** - Gracefully handles authentication failures
- **Comprehensive documentation** - Step-by-step setup guides

## 📝 Step-by-Step Setup (15 minutes)

### Part 1: Enable Supabase OAuth

1. Go to: **https://app.supabase.com**
2. Select your project: **nwtawfirunphqdzvqipb**
3. Click **Authentication** in the left sidebar
4. Click **Providers**
5. You should see Google and GitHub - they're currently DISABLED

---

### Part 2: Set Up Google OAuth

#### In Google Cloud Console:

1. Visit: https://console.cloud.google.com/
2. Click the **Project** dropdown at the top
3. Click **New Project**
4. Enter project name: `NutriLife`
5. Click **Create** and wait for it to load

6. **Enable Google+ API:**
   - In the search bar, search: `Google+ API`
   - Click on it and press **Enable**

7. **Create OAuth Credentials:**
   - Click the **Profile** icon → **Manage all accounts**
   - Go to: **APIs & Services** → **Credentials**
   - Click **+ Create Credentials**
   - Select **OAuth 2.0 Client ID**
   - Click **Configure Consent Screen** (if prompted)
   - Select **External** → **Create**
   - Fill in:
     - **App name**: `NutriLife`
     - **User support email**: Your email
     - **Developer contact**: Your email
   - Click **Save and Continue** (skip scopes)
   - Click **Back to Credentials**

   - Click **+ Create Credentials** again
   - Select **OAuth 2.0 Client ID**
   - Select **Web application**
   - Under **Authorized redirect URIs**, add:
     ```
     https://nwtawfirunphqdzvqipb.supabase.co/auth/v1/callback?provider=google
     http://localhost:5173/auth/callback
     ```
   - Click **Create**
   - **Copy both:**
     - **Client ID**
     - **Client Secret**

#### In Supabase:

1. Go to: **Authentication** → **Providers**
2. Click on **Google**
3. Toggle the switch **ON** (enable it)
4. Paste:
   - **Client ID**: (from Google Cloud)
   - **Client Secret**: (from Google Cloud)
5. Click **Save**

---

### Part 3: Set Up GitHub OAuth

#### In GitHub:

1. Visit: https://github.com/settings/developers
2. Click **OAuth Apps** in the left sidebar
3. Click **New OAuth App**
4. Fill in:
   - **Application name**: `NutriLife`
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: 
     ```
     https://nwtawfirunphqdzvqipb.supabase.co/auth/v1/callback?provider=github
     ```
5. Click **Register application**
6. **Copy both:**
   - **Client ID**
   - **Client Secret** (click "Generate a new client secret")

#### In Supabase:

1. Go to: **Authentication** → **Providers**
2. Click on **GitHub**
3. Toggle the switch **ON** (enable it)
4. Paste:
   - **Client ID**: (from GitHub)
   - **Client Secret**: (from GitHub)
5. Click **Save**

---

### Part 4: Verify Supabase Settings

1. Go to: **Authentication** → **URL Configuration**
2. Make sure:
   - **Site URL**: `http://localhost:5173`
   - **Redirect URLs** includes:
     ```
     http://localhost:5173/auth/callback
     http://localhost:5173
     ```
3. If not, add them

---

## 🧪 Test Your Setup

1. Start your app:
   ```bash
   npm run dev
   ```

2. Go to: **http://localhost:5173/auth/login**

3. Test both buttons:
   - Click **"Continue with Google"**
   - Should redirect to Google login
   - After login, should redirect back to your app

   - Click **"Continue with GitHub"**
   - Should redirect to GitHub login
   - After login, should redirect back to your app

---

## 🐛 Troubleshooting

### Issue: "Invalid Client" Error

**Solution:**
- Verify Client ID and Secret are correct
- Check they're copied from the right provider (Google Cloud or GitHub)
- Make sure you enabled the provider in Supabase (toggle should be ON)

### Issue: Redirect URL Mismatch

**Solution:**
- In Google Cloud, add: `http://localhost:5173/auth/callback`
- In GitHub, set callback to: `https://nwtawfirunphqdzvqipb.supabase.co/auth/v1/callback?provider=github`
- In Supabase URL Config, add: `http://localhost:5173/auth/callback`

### Issue: Button Doesn't Respond / Page Doesn't Change

**Solution:**
1. Open browser console (**F12** → **Console** tab)
2. Click the login button
3. Look for error messages
4. Share the error with me

### Issue: Still On Login Page After OAuth

**Solution:**
- The `/auth/callback` route may not exist
- Your session isn't being detected
- Check browser console for errors

---

## 📊 Quick Checklist

Before testing, verify:

- [ ] Google OAuth enabled in Supabase (Provider shows ON)
- [ ] GitHub OAuth enabled in Supabase (Provider shows ON)
- [ ] Google Client ID & Secret added to Supabase
- [ ] GitHub Client ID & Secret added to Supabase
- [ ] Redirect URLs added to Google Cloud Console
- [ ] Redirect URLs added to GitHub OAuth app
- [ ] Site URL configured in Supabase
- [ ] Redirect URLs configured in Supabase
- [ ] `.env` file has VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY

---

## 🆘 Still Not Working?

1. **Check console errors:**
   - Press **F12**
   - Click the login button
   - Screenshot any red errors
   - Send me the error message

2. **Check Supabase logs:**
   - Go to **Authentication** → **Logs**
   - Look for authentication failures
   - Check what error message appears

3. **Verify credentials:**
   - Double-check Client ID and Secret are correct
   - Make sure you didn't accidentally add spaces
   - Verify the credentials are from the right provider

---

## 📚 Additional Resources

- [OAUTH_TROUBLESHOOTING.md](./OAUTH_TROUBLESHOOTING.md) - Troubleshooting guide
- [SOCIAL_AUTH_SETUP.md](./SOCIAL_AUTH_SETUP.md) - Detailed instructions
- [AUTH_SETUP_QUICK_START.md](./AUTH_SETUP_QUICK_START.md) - 5-minute overview

---

## 💡 Need Help?

After following these steps:
1. Test the login buttons
2. If they still don't work, open browser console (**F12**)
3. Click the button and capture any error messages
4. Share the error message with me

**I've added better error messages**, so you should see exactly what's wrong!

