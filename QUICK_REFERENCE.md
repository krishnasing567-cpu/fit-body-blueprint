# Quick Reference Guide

## 🚀 Getting Started (Copy & Paste)

### 1. Setup Environment
```bash
cp .env.example .env.local
```

Add to `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Test Authentication
- **Sign Up**: http://localhost:5173/auth/signup
- **Sign In**: http://localhost:5173/auth/login
- **Profile**: http://localhost:5173/profile

---

## 📖 Common Tasks

### Check if User is Logged In
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { user, loading } = useAuth();

if (loading) return <div>Loading...</div>;
if (!user) return <div>Not logged in</div>;

return <div>Hello, {user.email}!</div>;
```

### Sign Out User
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { signOut } = useAuth();

const handleLogout = async () => {
  await signOut();
  // User is now logged out
};
```

### Protect a Route
```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Sign Up with Email/Password
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { signUp } = useAuth();

const handleSignUp = async (email: string, password: string) => {
  try {
    await signUp(email, password);
    console.log('Sign up successful!');
  } catch (error) {
    console.error('Sign up failed:', error);
  }
};
```

### Sign In with Email/Password
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { signIn } = useAuth();

const handleSignIn = async (email: string, password: string) => {
  try {
    await signIn(email, password);
    console.log('Sign in successful!');
  } catch (error) {
    console.error('Sign in failed:', error);
  }
};
```

### Sign In with Google
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { signInWithGoogle } = useAuth();

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error('Google sign in failed:', error);
  }
};
```

### Sign In with GitHub
```tsx
import { useAuth } from '@/contexts/AuthContext';

const { signInWithGitHub } = useAuth();

const handleGitHubSignIn = async () => {
  try {
    await signInWithGitHub();
  } catch (error) {
    console.error('GitHub sign in failed:', error);
  }
};
```

---

## 🔑 useAuth Hook Reference

### Methods
```tsx
const {
  user,                 // Current user object (null if not logged in)
  session,             // Current session object
  loading,             // Is auth still loading?
  signUp,              // (email, password) => Promise
  signIn,              // (email, password) => Promise
  signInWithGoogle,    // () => Promise
  signInWithGitHub,    // () => Promise
  signOut,             // () => Promise
} = useAuth();
```

---

## 📂 File Locations

| Feature | File |
|---------|------|
| Auth State | `src/contexts/AuthContext.tsx` |
| Login Page | `src/pages/Login.tsx` |
| Sign Up Page | `src/pages/SignUp.tsx` |
| Profile Page | `src/pages/UserProfile.tsx` |
| Route Protection | `src/components/ProtectedRoute.tsx` |
| Navigation | `src/components/Navbar.tsx` |

---

## 🔗 Available Routes

```
/                    → Home page (public)
/auth/login          → Login page
/auth/signup         → Sign up page
/auth/callback       → OAuth callback (automatic)
/profile             → User profile (protected)
```

---

## 📚 Documentation Files

| Document | Purpose | Read Time |
|----------|---------|-----------|
| `AUTH_SETUP_QUICK_START.md` | Quick 5-minute setup | 5 min |
| `SOCIAL_AUTH_SETUP.md` | Detailed OAuth setup | 20 min |
| `IMPLEMENTATION_SUMMARY.md` | Complete overview | 15 min |
| `ARCHITECTURE.md` | System design & flows | 20 min |
| `DEVELOPER_CHECKLIST.md` | Testing checklist | 30 min |
| `FILES_SUMMARY.md` | File index | 5 min |

---

## 🆘 Common Issues & Fixes

### Issue: "Cannot find module '@/contexts/AuthContext'"
**Solution**: Ensure TypeScript path aliases are configured in `tsconfig.json`

### Issue: "Redirect URL mismatch"
**Solution**: Update OAuth provider callback URLs to match your Supabase config

### Issue: Social buttons don't work
**Solution**: Configure OAuth providers in Supabase and update environment variables

### Issue: Session not persisting after refresh
**Solution**: Check localStorage is enabled in browser settings

### Issue: "user is null" even after login
**Solution**: Wait for `loading` to be `false` before checking user state

---

## 🏗️ Component Structure

```
App (with AuthProvider)
├── Navbar (shows user menu if logged in)
├── Routes
│   ├── / (Home)
│   ├── /auth/login (Login page)
│   ├── /auth/signup (Sign up page)
│   ├── /auth/callback (OAuth redirect)
│   └── /profile (ProtectedRoute)
└── Other pages
```

---

## ✅ Setup Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Supabase URL to `.env.local`
- [ ] Add Supabase key to `.env.local`
- [ ] Run `npm run dev`
- [ ] Test at `/auth/signup`
- [ ] Test at `/auth/login`
- [ ] Test profile page
- [ ] Configure Google OAuth (optional)
- [ ] Configure GitHub OAuth (optional)

---

## 🚀 Quick Setup Command

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Edit .env.local with your Supabase credentials
# (Use your favorite editor)

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 🔐 Environment Variables

```env
# Required
VITE_SUPABASE_URL=https://[PROJECT-ID].supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[ANON-KEY]

# Never commit .env.local to git!
```

Get these values from:
1. Go to Supabase Dashboard
2. Click your project
3. Go to Settings → API
4. Copy "Project URL" and "anon key"

---

## 🎨 UI Components Used

All auth pages use Shadcn UI components:
- `Button` - For action buttons
- `Input` - For form inputs
- `Label` - For form labels
- `Card` - For layout containers
- `Toaster` - For notifications

---

## 📱 Mobile Support

- ✅ Responsive signup page
- ✅ Responsive login page
- ✅ Mobile-friendly navbar
- ✅ Touch-optimized buttons
- ✅ Works on iOS and Android browsers

---

## 🔄 Auth Flow Diagrams

### Email/Password
```
User fills form
     ↓
Click "Sign Up" / "Sign In"
     ↓
useAuth hook called
     ↓
Supabase validates
     ↓
Success → Session created
Error → Toast message shown
```

### OAuth (Google/GitHub)
```
User clicks "Google"/"GitHub" button
     ↓
Redirect to provider login
     ↓
User logs in and authorizes
     ↓
Provider redirects to /auth/callback
     ↓
Supabase exchanges code for session
     ↓
Auto redirect to home page
     ↓
User logged in!
```

---

## 💡 Pro Tips

1. **Development**: Use email "test@example.com" for testing (Supabase allows any email in dev)
2. **Error Handling**: Always wrap auth calls in try/catch
3. **Loading States**: Check `loading` flag before rendering content
4. **Route Protection**: Use `ProtectedRoute` component for sensitive pages
5. **User Info**: Access user data from `useAuth()` hook, never localStorage directly

---

## 🎯 Next Steps

1. **Local Testing**: Follow setup checklist above
2. **OAuth Setup**: Read `SOCIAL_AUTH_SETUP.md`
3. **Deployment**: Check `DEVELOPER_CHECKLIST.md`
4. **Customization**: Modify styles in component files
5. **Enhancement**: Add features like password reset, 2FA, etc.

---

## 📞 Need Help?

- **Quick Questions**: Check this file first
- **Setup Issues**: See `AUTH_SETUP_QUICK_START.md`
- **OAuth Problems**: See `SOCIAL_AUTH_SETUP.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Testing**: See `DEVELOPER_CHECKLIST.md`

---

**Last Updated**: January 2026
**Status**: ✅ Complete and Ready
**Version**: 1.0.0
