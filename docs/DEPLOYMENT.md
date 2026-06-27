# 🚀 Deployment Guide

## 1. Deploy Worker

```bash
cd worker
npm install -g wrangler
wrangler login
wrangler deploy
```

Add secrets in Cloudflare Dashboard:
- `AI_API_KEY`
- `YOUTUBE_API_KEY`

## 2. Deploy Frontend

1. Push code to GitHub
2. Go to Cloudflare Dashboard → Workers & Pages
3. Create Application → Pages → Connect to Git
4. Select your repo
5. Settings:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Build output: `dist`
6. Add environment variable: `VITE_WORKER_URL`
7. Deploy!

Your site will be live at `your-project.pages.dev`
