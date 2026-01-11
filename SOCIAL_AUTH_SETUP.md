# Social Authentication Setup Guide

This application now includes social login capabilities for Google and GitHub. Follow this guide to set up and configure these authentication providers.

## Prerequisites

- A Supabase project (https://supabase.com)
- Google Cloud Console account (for Google OAuth)
- GitHub Developer account (for GitHub OAuth)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

You can find these values in your Supabase project settings:
1. Go to Project Settings → API
2. Copy the Project URL and Publishable Key (anon key)

## Setting Up Google OAuth

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name and create
4. Wait for the project to be created

### Step 2: Enable the Google+ API

1. In Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Create OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" as User Type and click "Create"
3. Fill in the required fields:
   - App name: "NutriLife"
   - User support email: Your email
   - Developer contact information: Your email
4. Click "Save and Continue"
5. Skip the scopes section by clicking "Save and Continue"
6. Click "Save and Continue" on the summary page

### Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Select "Web application" as the Application type
4. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback?provider=google` (from Supabase)
   - `http://localhost:5173/auth/callback` (for local development)
5. Click "Create"
6. Copy the Client ID and Client Secret

### Step 5: Configure in Supabase

1. Go to your Supabase project → Authentication → Providers
2. Click on "Google"
3. Enable the provider
4. Paste your Google OAuth Client ID and Client Secret
5. Click "Save"

## Setting Up GitHub OAuth

### Step 1: Register a New OAuth App

1. Go to GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the following:
   - **Application name**: NutriLife
   - **Homepage URL**: `http://localhost:5173` (or your production URL)
   - **Authorization callback URL**: `https://your-project.supabase.co/auth/v1/callback?provider=github`
   - For development, also add: `http://localhost:5173/auth/callback`
4. Click "Register application"

### Step 2: Configure in Supabase

1. Go to your Supabase project → Authentication → Providers
2. Click on "GitHub"
3. Enable the provider
4. Copy the Client ID and Client Secret from your GitHub OAuth app
5. Paste them into Supabase
6. Click "Save"

## Authentication Routes

The application includes the following authentication routes:

- `/auth/login` - User login page with email/password and social options
- `/auth/signup` - User registration page with email/password and social options
- `/auth/callback` - OAuth callback handler (automatically used by Supabase)

## Using the Authentication System

### In Components

Use the `useAuth` hook to access authentication functions:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signIn, signUp, signInWithGoogle, signInWithGitHub, signOut } = useAuth();

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
```

### Available Auth Context Methods

- `user` - Current user object (null if not authenticated)
- `session` - Current session object
- `loading` - Boolean indicating if auth is still loading
- `signUp(email, password)` - Create a new account with email/password
- `signIn(email, password)` - Login with email/password
- `signInWithGoogle()` - Trigger Google OAuth flow
- `signInWithGitHub()` - Trigger GitHub OAuth flow
- `signOut()` - Sign out current user

## Protected Routes

To protect a route, you can wrap it with a component that checks `useAuth`:

```tsx
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" />;

  return children;
}
```

## Testing Locally

1. Set your Supabase redirect URL in both Google and GitHub OAuth settings to include:
   - `http://localhost:5173/auth/callback`

2. Update your `.env.local`:
   ```env
   VITE_SUPABASE_URL=your-local-supabase-url
   VITE_SUPABASE_PUBLISHABLE_KEY=your-key
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Navigate to http://localhost:5173/auth/signup or http://localhost:5173/auth/login

## Troubleshooting

### "Redirect URL mismatch" Error
- Make sure the redirect URL in your OAuth provider settings matches exactly
- For Google: Check both the authorized redirect URIs in Google Cloud Console
- For GitHub: Check the Authorization callback URL in OAuth app settings

### Social login redirects to blank page
- Ensure the `/auth/callback` route is properly configured
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set correctly

### Email confirmation issues
- For email/password signup, users need to confirm their email
- Configure email templates in Supabase → Authentication → Email Templates

## Production Deployment

When deploying to production:

1. Update redirect URLs in all OAuth providers to your production domain:
   - `https://yourdomain.com/auth/callback`

2. Update Supabase environment variables with production URL and key

3. Set up proper email templates in Supabase for production

4. Consider enabling additional security features like:
   - Email confirmation
   - Custom email templates
   - Rate limiting for auth endpoints

## Additional Resources

- [Supabase Authentication Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
