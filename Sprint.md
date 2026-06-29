# Spotify Clone - Sprint Plan

This document tracks the goals, tasks, and completion status of each development sprint for the Spotify Clone application.

---

## Sprint 1 – Project Initialization

**Status**: Completed

**Goal**:
Initialize the Next.js application, configure toolchains, and build the initial codebase structure.

**Tasks**:
* [x] Initialize Next.js with TypeScript and Tailwind CSS.
* [x] Configure Prettier and ESLint rules.
* [x] Establish initial project folder hierarchy (`src/app`, `src/components`, `src/lib`).
* [x] Add Tailwind CSS v4 support.
* [x] Verify project runs successfully.

---

## Sprint 2 – Application Layout & UI Foundation

**Status**: Completed

**Goal**:
Build the global layout, navigation sidebar, header, placeholder pages, and mock music player bar with dark Spotify-inspired colors.

**Tasks**:
* [x] Initialize shadcn/ui and configure integration with Tailwind CSS v4.
* [x] Install and configure the shadcn `Button` component.
* [x] Configure global dark colors and theme variables in `globals.css` (primary green `#1db954`, black `#000000`, card backgrounds `#121212`, etc.).
* [x] Create Root Layout with a responsive sidebar and a top-level content layout.
* [x] Build Sidebar component with Home, Search, and Your Library links utilizing path-aware highlights.
* [x] Build Header component with browser-like navigation arrows and a profile button action.
* [x] Build user-facing Home dashboard, Search mockup page (with mock search input), and Your Library page (with mock filter chips and an empty library state visual).
* [x] Create a static mock player bottom bar (height: 80px) representing mock track information, media controls, and volume control layout in a disabled state.
* [x] Run verification tests and resolve all linter warnings.

---

## Sprint 3 – User Authentication

**Status**: Completed

**Goal**:
Integrate authentication services to support signups, logins, signouts, and protected route redirects.

**Tasks**:
* [x] Configure Clerk authentication provider.
* [x] Create custom Login (`/login`) page using Clerk SignIn component.
* [x] Create custom Signup (`/signup`) page using Clerk SignUp component.
* [x] Implement secure route guards (redirect unauthenticated users to `/login` when trying to access `/library`).
* [x] Integrate Header with Clerk session hooks (`useUser` and `useClerk`) to show dynamic username and log out actions.
* [x] Migrate middleware to Next.js 16 proxy convention (`src/proxy.ts`).
* [x] Verify auth flow compiles and builds cleanly.

---

## Sprint 4 – Database & Prisma Integration
**Status**: Pending

## Sprint 5 – Home Page (Dynamic Data)
**Status**: Pending

## Sprint 6 – Music Player (Audio Playback)
**Status**: Pending

## Sprint 7 – Search Functionality
**Status**: Pending

## Sprint 8 – Albums & Artists
**Status**: Pending

## Sprint 9 – Playlists Management
**Status**: Pending

## Sprint 10 – User Library
**Status**: Pending

## Sprint 11 – Polish & Responsiveness
**Status**: Pending

## Sprint 12 – Deployment
**Status**: Pending
