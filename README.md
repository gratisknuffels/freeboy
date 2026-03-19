# ♟ Freeboy Chess — Vercel Deployment Guide

A real-time multiplayer chess game hosted on Vercel, powered by Pusher for live game sync.

---

## Step 1 — Get free Pusher credentials (2 min)

1. Go to **https://pusher.com** and create a free account
2. Click **"Create app"**
3. Give it a name (e.g. `freeboy-chess`), choose a **Cluster** close to you (e.g. `eu`, `us2`, `ap2`)
4. Once created, open your app and go to **App Keys**
5. Note down these 4 values:
   - `app_id`
   - `key`
   - `secret`
   - `cluster`

---

## Step 2 — Deploy to Vercel

### Option A — Vercel CLI (recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# From this folder, deploy
vercel

# Follow the prompts, then add env vars:
vercel env add PUSHER_APP_ID
vercel env add PUSHER_KEY
vercel env add PUSHER_SECRET
vercel env add PUSHER_CLUSTER

# Redeploy with env vars
vercel --prod
```

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a GitHub repo
2. Go to **https://vercel.com** → New Project → Import your repo
3. In **Environment Variables**, add:
   - `PUSHER_APP_ID` = your app id
   - `PUSHER_KEY` = your key
   - `PUSHER_SECRET` = your secret
   - `PUSHER_CLUSTER` = your cluster (e.g. `eu`)
4. Click **Deploy**

---

## Step 3 — Play!

1. Open your Vercel URL
2. Click **Create Game** — copy the share link
3. Send the link to your opponent
4. They open it and you're connected instantly

---

## Project Structure

```
freeboy-chess/
├── public/
│   └── index.html       # Full chess game frontend
├── api/
│   └── game.js          # Vercel serverless function (Pusher relay)
├── package.json
├── vercel.json
└── README.md
```

## Local Testing

If you want to test locally before deploying:

```bash
npm install
npx vercel dev
```

Then open http://localhost:3000 in two browser tabs.
