# OAuth Setup - Visual Walkthrough

## Summary of What's Happening

Your app has **3 components** that need to work together:

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Fitness App                         │
│           (http://localhost:5173/auth/login)                │
│                                                              │
│  [Continue with Google] [Continue with GitHub]              │
└─────────────────────────────────────────────────────────────┘
                    ↓                      ↓
        ┌──────────────────┐    ┌────────────────────┐
        │ Google Cloud     │    │ GitHub OAuth       │
        │ Console          │    │                    │
        │ (credentials)    │    │ (credentials)      │
        └──────────────────┘    └────────────────────┘
                    ↓                      ↓
        ┌──────────────────────────────────────────┐
        │         Supabase                         │
        │   (OAuth Provider Manager)               │
        │                                          │
        │  Google: [Enable] [Client ID] [Secret]  │
        │  GitHub: [Enable] [Client ID] [Secret]  │
        └──────────────────────────────────────────┘
                         ↓
        ┌──────────────────────────────────────────┐
        │  Your App /auth/callback                 │
        │  (receives user data & creates session)  │
        └──────────────────────────────────────────┘
```

---

## The Setup Process

### 1️⃣ Get Google Credentials (5 min)

```
Google Cloud Console
    ↓
Create Project → Enable Google+ API → Create OAuth Credentials
    ↓
Copy: Client ID + Client Secret
```

### 2️⃣ Get GitHub Credentials (3 min)

```
GitHub Settings → Developer Settings → OAuth Apps
    ↓
Create OAuth App
    ↓
Copy: Client ID + Client Secret
```

### 3️⃣ Register Credentials in Supabase (2 min)

```
Supabase Dashboard
    ↓
Authentication → Providers
    ↓
Google: Enable + Paste Credentials
GitHub: Enable + Paste Credentials
```

---

## Browser Flow When You Click "Continue with Google"

```
1. User clicks "Continue with Google"
   ↓
2. Your App sends request to Supabase with:
   - Provider: "google"
   - Redirect: "http://localhost:5173/auth/callback"
   ↓
3. Supabase redirects to Google Login using Client ID
   ↓
4. User logs in to Google
   ↓
5. Google redirects back to Supabase with auth code
   ↓
6. Supabase exchanges code for user data
   ↓
7. Supabase redirects to http://localhost:5173/auth/callback
   ↓
8. Your App detects session and redirects to /profile
```

---

## Environment Variables

Your `.env` file already has:

```env
VITE_SUPABASE_URL=https://nwtawfirunphqdzvqipb.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ These are correct! Your app knows where to reach Supabase.

---

## What If It Doesn't Work?

### Error: "OAuth configuration is incomplete"

→ **Solution**: Go to Supabase → Authentication → Providers → Google/GitHub → Make sure toggle is ON

### Error: "Invalid redirect_uri"

→ **Solution**: 
   - In Supabase URL Config, add: `http://localhost:5173/auth/callback`
   - In Google Cloud Console, add: `http://localhost:5173/auth/callback`
   - In GitHub OAuth app, make sure callback URL is correct

### Error: "Invalid client"

→ **Solution**: 
   - Check Client ID and Secret are correct
   - Make sure they're from the right provider
   - Make sure there are no extra spaces when copying

### Button clicks but nothing happens

→ **Solution**:
   1. Press F12 to open browser console
   2. Click the button
   3. Look for error messages in the console
   4. Screenshot and share the error

---

## Testing Checklist

Before each step, restart your dev server:
```bash
npm run dev
```

Then visit: http://localhost:5173/auth/login

And try both buttons:

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enable Google in Supabase | Google button works |
| 2 | Add Google credentials | Google login accepts credentials |
| 3 | Enable GitHub in Supabase | GitHub button works |
| 4 | Add GitHub credentials | GitHub login accepts credentials |

---

## Files I've Updated

Here's what I changed to make OAuth better:

### 1. **Supabase Client** (`src/integrations/supabase/client.ts`)
   - Added error validation
   - Added PKCE flow for security
   - Added console logging

### 2. **Auth Context** (`src/contexts/AuthContext.tsx`)
   - Better error messages
   - Added logging
   - Added OAuth parameters

### 3. **Auth Callback Page** (`src/pages/AuthCallback.tsx`)
   - Detects OAuth errors
   - Shows error messages
   - Redirects properly

### 4. **Documentation** 
   - `GOOGLE_GITHUB_LOGIN_SETUP.md` - This guide
   - `OAUTH_TROUBLESHOOTING.md` - Troubleshooting
   - `check-oauth.js` - Diagnostic tool

---

## Quick Wins

After setup, you should have:

✅ Users can click "Continue with Google"
✅ Users can click "Continue with GitHub"  
✅ Users are redirected to their OAuth provider
✅ Users are redirected back after login
✅ User session is created in your app
✅ User is logged in and can access /profile

---

## Need More Help?

1. **Run the diagnostic:**
   ```bash
   node check-oauth.js
   ```

2. **Check browser console:**
   - Press F12
   - Click a login button
   - Look for errors
   - Share the error message

3. **Check Supabase logs:**
   - Supabase Dashboard → Logs → Auth
   - Look for error entries

