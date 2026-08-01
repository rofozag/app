# ⚡ Rofiozag Chat — Next-Gen Messaging Infrastructure

> **Where Conversations Drive Creation & Commerce.**  
> A premium, production-ready landing page for **Rofiozag Chat**, designed for creators, digital businesses, and modern communities.

---

## 🚀 Overview

Rofiozag Chat unifies real-time messaging, native AI copilot tools, paid creator channels, ephemeral stories, and 1-click social crossposting into a single, sub-millisecond encrypted platform.

This repository contains the complete **Vite + React + Tailwind CSS + Framer Motion** codebase crafted with the design aesthetic of world-class SaaS leaders (*Linear, Stripe, Apple, Arc, Framer, Vercel, Telegram Premium*).

---

## ✨ Key Features & Highlights

- **Sub-10ms Global Latency**: Powered by distributed edge sync architecture.
- **Interactive Live Messaging Sandbox**: Real-time simulation of AI Copilot, Creator Paywalls, and Multi-Network Social Crossposting.
- **Interactive 3D Phone Mockup**: Animated voice note visualizer, live notification banners, story drops, and typing indicators.
- **Supabase Integration**: Full SDK implementation (`@supabase/supabase-js`) with automatic fallback to persistent `localStorage` if environment keys aren't provided.
- **Form Validation & Gamified Waitlist**: Powered by `react-hook-form` + `zod`, canvas confetti explosions, custom position assignment (`#14,892+`), and 1-click social sharing.
- **Micro-Interactions**: Ambient aurora glow mesh, fine noise overlay texture, top scroll progress indicator, custom cursor ring, and smooth spring accordions.
- **SEO & Accessibility**: Complete meta tags (`react-helmet-async`), Open Graph cards, Web Manifest, sitemap, semantic markup, and full ARIA keyboard navigation.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form + Zod
- **Backend & Persistence**: Supabase JS SDK (`@supabase/supabase-js`) + LocalStorage Fallback
- **Toasts & Feedback**: React Hot Toast + Canvas Confetti
- **SEO**: React Helmet Async

---

## 📂 Project Architecture

```
rofiozag-chat/
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── animations/
│   │   └── variants.js          # Motion animation presets
│   ├── components/
│   │   ├── Buttons/             # Gradient & Glow buttons
│   │   ├── Cards/               # Glassmorphism cards
│   │   ├── Common/              # Cursor, ScrollProgress, Noise, Aurora, TermsModal
│   │   ├── FAQ/                 # Searchable FAQ accordion
│   │   ├── Features/            # Bento grid feature cards & detail modals
│   │   ├── Footer/              # Footer with newsletter & operational status
│   │   ├── Hero/                # Hero layout & interactive Phone Mockup
│   │   ├── Integrations/        # Filterable ecosystem cards
│   │   ├── InteractiveDemo/     # Interactive messaging sandbox
│   │   ├── Navbar/              # Blur sticky navigation bar
│   │   ├── Pricing/             # Monthly/Yearly plans with discount toggle
│   │   ├── Sections/            # Backed/Featured trust logos
│   │   ├── Statistics/          # Live metric counters
│   │   ├── Testimonials/        # Creator quotes & revenue badges
│   │   └── Waitlist/            # React Hook Form waitlist & VIP success modal
│   ├── context/
│   │   └── AppContext.jsx       # Global application state
│   ├── hooks/
│   │   ├── useParallax.js       # Mouse movement parallax
│   │   ├── useScrollPosition.js # Scroll tracking & progress
│   │   └── useWaitlist.js       # Waitlist logic & confetti trigger
│   ├── lib/
│   │   ├── supabase.js          # Supabase client + fallback
│   │   └── utils.js             # Formatting & clipboard helpers
│   ├── pages/
│   │   └── Home.jsx             # Main landing page view
│   ├── utils/
│   │   └── analytics.js        # Analytics tracking logger
│   ├── constants.js             # Data & configuration constants
│   ├── App.jsx                  # Root App provider wrapper
│   ├── index.css                # Tailwind imports & scrollbar styles
│   └── main.jsx                 # Vite entry point
├── .env.example
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Quick Start & Installation

### 1. Install Dependencies
```bash
cd rofiozag-chat
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your Supabase URL and Anon Key if you wish to write to a live database:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
*Note: If no Supabase key is configured, Rofiozag Chat automatically operates in Local Storage persistence mode.*

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates a minified, optimized production bundle inside the `dist/` directory.

---

## 🗄 Supabase Database Setup (Optional)

If connecting to Supabase, run the following SQL query in your Supabase SQL Editor:

```sql
create table waitlist (
  id bigint generated by default as identity primary key,
  name text not null,
  email text unique not null,
  role text default 'Creator',
  referral_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table waitlist enable row level security;

-- Allow anonymous inserts for waitlist submissions
create policy "Allow public waitlist inserts" on waitlist
  for insert with check (true);
```

---

## 🚀 Deployment

### Vercel / Netlify
This project is deployment-ready for **Vercel**, **Netlify**, or **Cloudflare Pages**:
1. Connect your GitHub repository to Vercel/Netlify.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Add environment variables if using Supabase.

---

## 📄 License

Designed & Developed for **Rofiozag Chat**. All rights reserved.
