# Authentication System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     FitBodyBlueprint App                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  AuthProvider   │ (Wraps entire app)
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   ┌────────────┐      ┌──────────┐      ┌──────────────┐
   │ Navbar     │      │  Routes  │      │ useAuth Hook │
   │ (Updated)  │      │ (Updated)│      │              │
   └────────────┘      └──────────┘      └──────────────┘
        │
        ├─→ Login Link
        ├─→ Signup Link
        ├─→ Profile Link
        └─→ Logout Button
```

## Authentication Flow

### Email/Password Authentication

```
User Input (Email + Password)
            │
            ▼
    ┌───────────────┐
    │ SignUp/Login  │
    │   Component   │
    └───────┬───────┘
            │
            ▼
    ┌─────────────────────────┐
    │   useAuth() Hook        │
    │ (signUp/signIn methods) │
    └───────┬─────────────────┘
            │
            ▼
    ┌─────────────────────────┐
    │ Supabase Auth Client    │
    │ (supabase.auth)         │
    └───────┬─────────────────┘
            │
            ▼
    ┌─────────────────────────┐
    │  Supabase Backend       │
    │  (Validate credentials) │
    └───────┬─────────────────┘
            │
    ┌───────┴────────┐
    │                │
    ▼                ▼
Success          Error
    │                │
    ▼                ▼
User Session    Toast Error
Updated         Message
    │
    ▼
Navigate to
Dashboard/Home
```

### OAuth Authentication (Google/GitHub)

```
User Clicks OAuth Button
            │
            ▼
┌─────────────────────────────┐
│ signInWithGoogle() or        │
│ signInWithGitHub()           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Supabase OAuth Handler      │
│ (Redirect to provider)      │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Google/GitHub Login Page    │
│ (User authorizes)           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Provider Redirects to        │
│ Auth Callback URL           │
│ (with auth code)            │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ /auth/callback Page         │
│ (AuthCallback Component)    │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Supabase Exchanges Code     │
│ for Session Token           │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ AuthContext Updates State   │
│ (user + session)            │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Redirect to Home Page       │
│ (useEffect in callback)     │
└─────────────────────────────┘
```

## Component Hierarchy

```
App.tsx
│
├── HelmetProvider
│   │
│   └── QueryClientProvider
│       │
│       └── AuthProvider ◄─── Global Auth State
│           │
│           └── TooltipProvider
│               │
│               └── BrowserRouter
│                   │
│                   └── Routes
│                       ├── / (Index)
│                       │
│                       ├── /auth/login
│                       │   └── Login.tsx
│                       │       ├── Email Form
│                       │       ├── Google Button
│                       │       └── GitHub Button
│                       │
│                       ├── /auth/signup
│                       │   └── SignUp.tsx
│                       │       ├── Email Form
│                       │       ├── Google Button
│                       │       └── GitHub Button
│                       │
│                       ├── /auth/callback
│                       │   └── AuthCallback.tsx
│                       │       └── Loading State
│                       │
│                       ├── /profile
│                       │   └── ProtectedRoute
│                       │       └── UserProfile.tsx
│                       │
│                       ├── Navbar (Component)
│                       │   ├── Logo
│                       │   ├── Nav Links
│                       │   └── User Menu (if logged in)
│                       │
│                       └── * (NotFound)
```

## State Management Flow

```
┌──────────────────────────────────────┐
│      AuthContext.tsx                 │
│  (Global Authentication State)       │
├──────────────────────────────────────┤
│                                      │
│  State:                              │
│  ├── user: User | null               │
│  ├── session: Session | null         │
│  └── loading: boolean                │
│                                      │
│  Methods:                            │
│  ├── signUp(email, password)         │
│  ├── signIn(email, password)         │
│  ├── signInWithGoogle()              │
│  ├── signInWithGitHub()              │
│  └── signOut()                       │
│                                      │
│  Listeners:                          │
│  └── onAuthStateChange() ◄── Supabase
│                                      │
└──────────────────────────────────────┘
        │
        │ (via useAuth hook)
        │
        ├─► Navbar.tsx
        │   ├─► Show user email
        │   ├─► Profile dropdown
        │   └─► Logout button
        │
        ├─► Login.tsx
        │   ├─► Form submit
        │   └─► Social buttons
        │
        ├─► SignUp.tsx
        │   ├─► Form submit
        │   └─► Social buttons
        │
        ├─► AuthCallback.tsx
        │   └─► Auto redirect
        │
        └─► UserProfile.tsx
            ├─► Display user info
            └─► Logout option
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│ Browser (Client Side)                           │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ React Components                          │ │
│  ├───────────────────────────────────────────┤ │
│  │ ├─ Navbar.tsx                             │ │
│  │ ├─ Login.tsx                              │ │
│  │ ├─ SignUp.tsx                             │ │
│  │ ├─ UserProfile.tsx                        │ │
│  │ └─ AuthCallback.tsx                       │ │
│  └────────────┬────────────────────────────┬─┘ │
│               │                            │    │
│  ┌────────────▼──────────────────────────┐│    │
│  │ AuthContext (useAuth Hook)            ││    │
│  │ └─► Authentication State & Methods    ││    │
│  └────────────┬──────────────────────────┘│    │
│               │                            │    │
│  ┌────────────▼──────────────────────────┐│    │
│  │ localStorage                          ││    │
│  │ └─► Session Persistence              ││    │
│  └────────────┬──────────────────────────┘│    │
│               │                            │    │
└───────────────┼────────────────────────────┼────┘
                │                            │
                ▼                            ▼
     ┌──────────────────────┐    ┌─────────────────┐
     │ Supabase JS Client   │    │ OAuth Providers │
     │ (supabase-js)        │    │                 │
     └──────────┬───────────┘    │ ├─ Google       │
                │                │ └─ GitHub       │
                ▼                └─────────────────┘
     ┌──────────────────────┐
     │ Supabase Backend     │
     │ (Auth Service)       │
     └──────────┬───────────┘
                │
                ▼
     ┌──────────────────────┐
     │ Database             │
     │ (User Profiles)      │
     └──────────────────────┘
```

## File Dependencies

```
AuthContext.tsx
├── Depends on:
│   ├── supabase (from client.ts)
│   ├── React hooks
│   └── Supabase types
│
└── Used by:
    ├── App.tsx (AuthProvider wrapper)
    ├── Navbar.tsx (useAuth hook)
    ├── Login.tsx (useAuth hook)
    ├── SignUp.tsx (useAuth hook)
    ├── UserProfile.tsx (useAuth hook)
    └── Any component needing auth

App.tsx
├── Depends on:
│   ├── AuthContext (AuthProvider)
│   ├── Login.tsx
│   ├── SignUp.tsx
│   ├── AuthCallback.tsx
│   ├── UserProfile.tsx
│   └── React Router
│
└── Entry point of the app

Navbar.tsx
├── Depends on:
│   ├── useAuth hook (AuthContext)
│   ├── useNavigate (React Router)
│   └── UI Components
│
└── Used in:
    └── Every page (fixed header)

Login.tsx, SignUp.tsx
├── Depends on:
│   ├── useAuth hook
│   ├── useNavigate
│   ├── useToast
│   └── UI Components
│
└── Displayed at:
    ├── /auth/login
    └── /auth/signup

ProtectedRoute.tsx
├── Depends on:
│   ├── useAuth hook
│   ├── Navigate component
│   └── React
│
└── Wraps protected routes
    └── Like /profile

UserProfile.tsx
├── Depends on:
│   ├── useAuth hook
│   ├── useNavigate
│   ├── React Router
│   └── UI Components
│
└── Displayed at:
    └── /profile (protected)
```

## Security Flow

```
┌──────────────────────────────────────────┐
│ User Credentials / OAuth Token           │
└────────────────┬─────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Sent to Supabase via HTTPS │
    │ (Never stored in localStorage
    │  in plain text)             │
    └────────────┬───────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Supabase Validates         │
    │ ├─ OAuth with Provider     │
    │ ├─ Email/password hash     │
    │ └─ Returns session token   │
    └────────────┬───────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Session Token Stored in:   │
    │ ├─ localStorage (encrypted)│
    │ ├─ Auto-refreshes          │
    │ └─ Cleared on logout       │
    └────────────┬───────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ All API Calls Include Token│
    │ as Authorization Header    │
    └────────────────────────────┘
```

## Callback URL Flow

```
User Clicks "Sign in with Google"
            │
            ▼
Browser Redirects to Google Login
            │
            ▼
User Logs In & Authorizes App
            │
            ▼
Google Redirects to:
https://your-project.supabase.co/auth/v1/callback
?code=AUTH_CODE&state=STATE
            │
            ▼
Supabase Intercepts & Exchanges
Code for Session Token
            │
            ▼
Browser Redirected to:
http://localhost:5173/auth/callback
(or your configured callback URL)
            │
            ▼
AuthCallback Component Shows Loading
            │
            ▼
AuthContext Detects New Session
(via onAuthStateChange listener)
            │
            ▼
useEffect Triggers Navigation
to Home Page (/)
            │
            ▼
User is now Logged In!
```

This architecture ensures:
- ✅ Secure auth flow
- ✅ Global state management
- ✅ Easy component access to auth
- ✅ Proper session persistence
- ✅ Clean separation of concerns
