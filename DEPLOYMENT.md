# AAIE Production Deployment Guide

This guide deploys:
- Frontend (`client`) to Vercel
- Backend (`server`) to Render
- Database on MongoDB Atlas
- CI on GitHub Actions

## 1) Pre-deployment

1. Ensure code is committed and pushed to GitHub (`main` branch).
2. Keep monorepo structure:
   - `client/` (Vite React)
   - `server/` (Express API)
3. Confirm these files exist:
   - `.github/workflows/ci.yml`
   - `vercel.json`
   - `render.yaml`

## 2) MongoDB Atlas

1. Create Atlas project and M0 cluster.
2. Create DB user with strong password.
3. Network access:
   - Production-safe: add Render static egress IP (if using paid plan)
   - Quick start: allow `0.0.0.0/0`
4. Get connection string and set database name (`aaie`).

Screenshot checkpoints:
- Atlas cluster overview
- Database access user created
- Network access rule

## 3) Backend deploy (Render)

### Option A: `render.yaml` Blueprint (recommended)
1. Render -> New -> Blueprint.
2. Select GitHub repo branch `main`.
3. Confirm service detected from `render.yaml`.
4. Set secret env vars in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
5. Deploy.

### Option B: Manual web service
1. New -> Web Service.
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Region: Singapore
6. Add env vars from `server/.env.example` + production values.

After deploy:
- Hit `https://<your-render-service>.onrender.com/api/health`

Screenshot checkpoints:
- Render service settings (build/start/rootDir)
- Environment variable screen
- Successful deploy logs
- `/api/health` response

## 4) Backend custom domain (optional but recommended)

1. Render service -> Settings -> Custom Domains.
2. Add `api.aaie.org.in`.
3. In GoDaddy DNS add CNAME:
   - `api` -> `<your-render-service>.onrender.com`
4. Wait for SSL provisioning and verification in Render.

## 5) Frontend deploy (Vercel)

1. Vercel -> New Project -> Import GitHub repo.
2. Framework preset: Vite
3. Build command: `npm run build --workspace client`
4. Output directory: `client/dist`
5. Install command: `npm install`

Set env vars:
- `VITE_API_URL=https://api.aaie.org.in`
- `VITE_SITE_URL=https://aaie.org.in`

Deploy.

Screenshot checkpoints:
- Vercel import project screen
- Build settings screen
- Environment variables screen
- Deployment success screen

## 6) Domain setup (GoDaddy + Vercel)

For `aaie.org.in` in Vercel:
1. Add domain in Vercel project settings.
2. GoDaddy DNS:
   - A record: `@` -> `76.76.21.21`
   - CNAME: `www` -> `cname.vercel-dns.com`
3. In Vercel, enable redirect `www` -> apex (or reverse, your preference).
4. SSL is automatic. Enforce HTTPS in Vercel.

For `aaitoai.com` redirect:
1. Add `aaitoai.com` and `www.aaitoai.com` in same Vercel project.
2. `vercel.json` already contains 308 permanent redirects to `https://aaie.org.in`.

Screenshot checkpoints:
- Vercel Domains tab
- GoDaddy DNS records
- SSL/HTTPS status

## 7) CI/CD behavior

- GitHub Actions (`.github/workflows/ci.yml`)
  - Runs on push to `main` and pull requests.
  - Builds client and syntax-checks server entry.
- Vercel
  - Auto-preview deployments on PRs.
  - Auto-production deploy on merge to `main`.
  - Rollback from Deployments tab.
- Render
  - Auto-deploy on new commit to `main`.
  - Rollback using deploy history.

## 8) Monitoring setup

1. Enable Vercel Web Analytics (Project -> Analytics).
2. Add Sentry:
   - Frontend: `@sentry/react` in `client`
   - Backend: `@sentry/node` in `server`
3. UptimeRobot:
   - Monitor `https://aaie.org.in`
   - Monitor `https://api.aaie.org.in/api/health`

## 9) Post-deployment checklist

- [ ] Frontend loads on `https://aaie.org.in`
- [ ] HTTPS working
- [ ] Backend API responding
- [ ] Email signup works end-to-end
- [ ] Welcome email received
- [ ] Dark mode persists
- [ ] All sections render correctly
- [ ] Mobile responsive
- [ ] Forms submit successfully
- [ ] Analytics tracking
- [ ] Search Console verified
- [ ] Sitemap submitted
- [ ] `robots.txt` accessible
- [ ] Lighthouse score 95+

## 10) Verification commands

```bash
# Health
curl https://api.aaie.org.in/api/health

# Public stats
curl https://api.aaie.org.in/api/stats

# Subscribe test
curl -X POST https://api.aaie.org.in/api/subscribe \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"source\":\"hero\"}"
```

