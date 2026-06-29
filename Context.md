# Spotify Clone - Project Context

## Project Overview
This project is a full-stack, responsive, Spotify-inspired music streaming web application built with Next.js (App Router), Tailwind CSS v4, and TypeScript. The application is developed incrementally, using a strict sprint-based workflow.

Sprint.md and Context.md serve as the single source of truth for the codebase and architecture state.

---

## Technical Stack

* **Framework**: Next.js 16.2.9 (App Router, Turbopack)
* **Runtime / Compiler**: React 19.2.4 & TypeScript 5
* **Styling**: Tailwind CSS 4.0.0
* **Component Library**: shadcn/ui (powered by `@base-ui/react` primitives)
* **Authentication**: Clerk (`@clerk/nextjs`)
* **Iconography**: `lucide-react`
* **Formatting/Linting**: ESLint & Prettier

---

## Codebase Snapshot (Directory Structure)

```
c:\Users\ayesh\Desktop\Spotify clone
├── .next/                  # Next.js build output
├── node_modules/           # Node packages
├── public/                 # Static assets (icons, images)
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css     # Global styles & Spotify CSS variable definitions
│   │   ├── layout.tsx      # Global layout wrapped in <ClerkProvider>
│   │   ├── page.tsx        # Welcome home dashboard
│   │   ├── library/
│   │   │   └── page.tsx    # Library placeholder empty state (Protected Route)
│   │   ├── login/
│   │   │   └── [[...rest]]/
│   │   │       └── page.tsx # Clerk Sign In screen styled in Spotify dark theme
│   │   ├── signup/
│   │   │   └── [[...rest]]/
│   │   │       └── page.tsx # Clerk Sign Up screen styled in Spotify dark theme
│   │   └── search/
│   │       └── page.tsx    # Search page with mock search field
│   ├── components/
│   │   ├── header.tsx      # Top bar navigation & Clerk useUser/useClerk integration
│   │   ├── sidebar.tsx     # Navigation sidebar containing Home, Search, Library, Playlists
│   │   └── ui/
│   │       └── button.tsx  # Shadcn Button component configured for Tailwind v4
│   ├── lib/
│   │   └── utils.ts        # Tailwind merge class utility
│   └── proxy.ts            # Clerk route protection proxy
├── components.json         # shadcn/ui config
├── next.config.ts          # Next.js configurations
├── package.json            # Scripts & dependencies
├── postcss.config.mjs      # CSS post-processing
├── tsconfig.json           # TypeScript configuration
└── README.md
```

---

## UI Architecture & Layout Structure

The layout is established in `src/app/layout.tsx`. It provides a viewport-locked grid:

```
┌──────────────────────────────────────────────────────────────┐
│  Sidebar (width: 64)       │  Header (Sticky top panel)      │
│  (Hidden on mobile)        ├─────────────────────────────────┤
│  Home, Search Links        │                                 │
│  Your Library              │  Main Scrollable Content Area   │
│  Playlists Mockup          │  (Children pages: /, /search,  │
│  Podcasts Mockup           │   /library, /login, /signup)    │
│                            │                                 │
├────────────────────────────┴─────────────────────────────────┤
│  Reserved Bottom Mock Player Bar (height: 80px, fixed)       │
│  Track info (left) · Playback controls (center) · Vol (right)│
└──────────────────────────────────────────────────────────────┘
```

* **Colors**: Styled with strict Spotify dark theme tokens in `globals.css`:
  - Background: `#000000` (deep black)
  - Card/Panels: `#121212` (dark charcoal)
  - Hover: `#282828`
  - Accent: `#1db954` (Spotify Green)
* **Font**: Default Next.js Geist Sans font.

---

## Route & Page Implementation Status

### 1. Home Dashboard (`/`)
* **Implemented**: Welcomes the user, explains navigation options, and displays a clean visual mockup grid of playlists ("Jump Back In") featuring hover play actions.
* **Status**: Fully user-facing with zero debug strings.

### 2. Search Page (`/search`)
* **Implemented**: Mock search interface. Displays user-facing instructions and a styled, static search input bar (disabled).
* **Status**: Placeholder layout ready.

### 3. Library Page (`/library`)
* **Implemented**: Mock library dashboard. Includes responsive category filter chips (Playlists, Podcasts, Artists, Albums) and an empty library state container with a prompt to "Build your library".
* **Status**: Fully protected route; redirects to login if unauthenticated.

### 4. Login Page (`/login`)
* **Implemented**: Renders Clerk `<SignIn />` component with custom appearance properties overrides matching the Spotify Green and dark theme styles.
* **Status**: Fully functional authentication route.

### 5. Signup Page (`/signup`)
* **Implemented**: Renders Clerk `<SignUp />` component with customized appearance styles overrides.
* **Status**: Fully functional registration route.

### 6. Player Bar (Global footer)
* **Implemented**: Viewport bottom footer bar matching Spotify's look. Includes mock album art thumbnail, play/pause circle buttons, shuffle, repeat, prev/next arrows, a mock timeline scrubber bar, and a volume layout slider.
* **Status**: Completely static placeholder; all controls are visually interactive but set to disabled states.

---

## Sprint 3 User Authentication (Clerk Integration)

User Authentication is fully set up using Clerk. The SDK is wrapped around the root component inside `src/app/layout.tsx`.

* **Route Guards (`src/proxy.ts`)**:
  - Unauthenticated users trying to access `/library` are protected by the Clerk route matcher and prompted to log in.
  - Public routes: `/` (Home), `/search`, `/login`, `/signup`, and static asset endpoints.
* **Header Integration (`src/components/header.tsx`)**:
  - Uses Clerk's client-side react hooks (`useUser` and `useClerk`) to verify user session states.
  - If signed in: Shows user's name alongside the custom user profile button and displays a "Log out" action trigger.
  - If signed out: Shows "Sign up" and "Log in" action buttons that link to `/signup` and `/login`.

---

## Sprint 4 Database Prep (System Readiness)

To prepare for Sprint 4 (Database & Prisma Integration), we will link user profiles to user data schemas:

* **Planned Database Engine**: PostgreSQL (via Neon cloud database instance).
* **Planned ORM**: Prisma ORM with target tables:
  - `User`: Storing custom user metadata linked via Clerk `userId` mapping.
  - `Playlist`, `Song`, `Artist`, `Album`: Prepared structures for relational entities.
