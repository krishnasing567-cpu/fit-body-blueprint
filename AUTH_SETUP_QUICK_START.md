# Social Login Implementation - Quick Start Guide

## What's Been Added

This fitness application now includes a complete authentication system with social login capabilities for Google and GitHub. Here's what has been implemented:

### New Components & Pages
- ✅ **AuthContext** (`src/contexts/AuthContext.tsx`) - Global auth state management
- ✅ **Login Page** (`src/pages/Login.tsx`) - Email/password + social login
- ✅ **Sign Up Page** (`src/pages/SignUp.tsx`) - Email/password + social signup
- ✅ **Auth Callback** (`src/pages/AuthCallback.tsx`) - OAuth redirect handler
- ✅ **User Profile** (`src/pages/UserProfile.tsx`) - User dashboard
- ✅ **Updated Navbar** - User menu with profile & logout

### Features
- Email/password authentication
- Google OAuth 2.0 login
- GitHub OAuth login
- User session management
- Protected routes support
- Responsive design (mobile & desktop)
- Toast notifications for feedback

## Quick Setup (5 minutes)

### 1. Create Environment File
```bash
cp .env.example .env.local
```

### 2. Add Supabase Credentials
Edit `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### 3. Run the Application
```bash
npm run dev
# or
yarn dev
```

### 4. Test Authentication
- Navigate to: `http://localhost:5173/auth/signup`
- Try signing up with email/password
- Test social login buttons (will work once providers are configured)

## Detailed Setup

For complete setup instructions including Google and GitHub OAuth configuration, see [SOCIAL_AUTH_SETUP.md](./SOCIAL_AUTH_SETUP.md)

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Auth state & functions
├── pages/
│   ├── Login.tsx                # Login page
│   ├── SignUp.tsx               # Sign up page
│   ├── AuthCallback.tsx         # OAuth callback handler
│   └── UserProfile.tsx          # User profile page
└── components/
    └── Navbar.tsx               # Updated with user menu
```

## How to Use in Your Components

```tsx
import { useAuth } from '@/contexts/AuthContext';

export function MyComponent() {
  const { user, signIn, signOut } = useAuth();

  if (!user) {
    return <button onClick={() => navigate('/auth/login')}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
```

## Authentication Routes

| Route | Purpose |
|-------|---------|
| `/auth/login` | User login |
| `/auth/signup` | User registration |
| `/auth/callback` | OAuth redirect handler |
| `/profile` | User profile & settings |

## Testing the Auth Flow

### Email/Password Flow
1. Go to `/auth/signup`
2. Enter email and password
3. Click "Sign Up"
4. Check email for confirmation link (in development/testing)
5. After confirmation, login with credentials at `/auth/login`

### Google OAuth Flow (once configured)
1. Go to `/auth/signup` or `/auth/login`
2. Click "Google" button
3. You'll be redirected to Google login
4. After approval, you're automatically logged in

### GitHub OAuth Flow (once configured)
1. Go to `/auth/signup` or `/auth/login`
2. Click "GitHub" button
3. You'll be redirected to GitHub login
4. After approval, you're automatically logged in

## Key Files to Know

### AuthContext.tsx
- Manages all authentication state and logic
- Provides `useAuth()` hook for components
- Handles OAuth and email/password auth
- Persists session using localStorage

### Navbar.tsx
- Shows user email when logged in
- Dropdown menu with Profile & Logout
- Links to auth pages when not logged in
- Responsive on mobile

### Login/SignUp Pages
- Clean, modern UI with social buttons
- Form validation and error handling
- Loading states during auth
- Toast notifications for user feedback

## Important Environment Variables

Never commit `.env.local` to version control! Keep it in `.gitignore`:

```
.env.local
```

Store real secrets securely in your deployment platform (Vercel, Netlify, etc.)

## Next Steps

1. **Complete Setup** → Follow [SOCIAL_AUTH_SETUP.md](./SOCIAL_AUTH_SETUP.md)
2. **Configure Providers** → Set up Google & GitHub OAuth
3. **Test Locally** → Run `npm run dev` and test the auth flows
4. **Protect Routes** → Use `useAuth()` to protect sensitive pages
5. **Deploy** → Update OAuth URLs for your production domain

## Troubleshooting

**Q: Social buttons don't work?**
- A: Configure the OAuth providers and update Supabase settings (see SOCIAL_AUTH_SETUP.md)

**Q: Getting redirect URL mismatch error?**
- A: Update callback URL in Google Cloud Console and GitHub app settings

**Q: Email/password signup not working?**
- A: Check Supabase email templates are configured properly

**Q: Session not persisting after page refresh?**
- A: Ensure localStorage is enabled in your browser

## Need Help?

- Check [SOCIAL_AUTH_SETUP.md](./SOCIAL_AUTH_SETUP.md) for detailed OAuth setup
- Review component code in `src/pages/` and `src/contexts/`
- Check Supabase documentation: https://supabase.com/docs/guides/auth

## What's Next?

Consider adding:
- Email verification
- Password reset functionality
- Two-factor authentication
- User profile customization
- Social profile data sync
- Rate limiting for auth endpoints
