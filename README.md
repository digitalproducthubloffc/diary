# Personal Web Diary SaaS V2

A fully-fledged MVP SaaS application for personal journaling. Built with a robust authentication system and a strict multi-tenant MongoDB architecture to ensure your thoughts remain completely private and secure.

## Key Features

- 🔐 **Secure Authentication**: Full login and registration system powered by Auth.js and bcrypt password hashing.
- 🗄️ **MongoDB Architecture**: All entries are safely stored in a cloud-ready MongoDB database with strict tenant isolation (`userId` enforcement).
- 🚀 **Server Actions**: Say goodbye to slow REST APIs. This app uses Next.js 15 Server Actions for instant, secure database mutations.
- 🔍 **Instant Full-Text Search**: Powered by MongoDB text indexes (`{ title: "text", content: "text", tags: "text" }`), allowing you to search through thousands of entries instantly.
- 🛡️ **Rate Limiting & Security**: MongoDB TTL-based rate limiting on authentication routes prevents brute force and spam.
- 🔀 **Smart Slugs**: Automatic unique URL generation scoped strictly to your user profile (e.g. `/my-day` and `/my-day-2`).
- 💾 **Versioned Backups**: Every time you save an entry, a secure backup is created in the database, capping at 10 rolling versions per entry.
- 📝 **Split-View Editor**: Write Markdown on the left, see a live preview on the right.
- 📊 **Smart Tracking**: Live Word Count, estimated Reading Time tracking, Streak tracking, and Mood Selection.
- 📌 **Favorites & Pinning**: Pin or favorite your most important entries to keep them organized on your Dashboard.
- 🌒 **Premium Dark Aesthetics**: Sleek design featuring deep blacks, emerald green accents, and typography optimized for focus.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Vanilla CSS
- **Backend**: MongoDB Atlas, Mongoose
- **Authentication**: Auth.js (Credentials Provider)
- **Deployment Target**: Vercel

## Folder Structure

```text
diary/
├── src/
│   ├── actions/             # Next.js Server Actions (CRUD & Auth)
│   ├── app/                 # Next.js App Router Pages
│   │   ├── dashboard/       # Protected Dashboard area
│   │   ├── entry/[slug]/    # Protected Entry Viewer
│   │   ├── login/           # Auth login page
│   │   ├── register/        # Auth registration page
│   │   ├── settings/        # Protected User Settings
│   │   ├── write/           # Protected Editor
│   │   └── page.tsx         # Public Landing Page
│   ├── components/          # Reusable UI (Editor, EntryCard, SearchBar)
│   ├── lib/                 # Core logic (MongoDB connection, Auth config)
│   └── models/              # Mongoose Schemas (User, Entry, Backup)
└── .env.local               # Environment variables (DB URI, Auth Secret)
```

## Getting Started

First, ensure you have your environment variables set up in `.env.local`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/diary_saas
AUTH_SECRET=your_secure_random_string
NEXTAUTH_URL=http://localhost:3000
```
*(If you are deploying to Vercel, use your MongoDB Atlas connection string.)*

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser, register a new account, and start journaling securely!
