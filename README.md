# AAIE Website (aaie-website)

AAIE (Association of AI Educators) ही मराठी AI शिक्षण संस्था आहे. We build and share practical AI education resources in Marathi, based in Pune, India.

This monorepo contains:
- `client` (React 18 + Vite + Tailwind CSS)
- `server` (Node.js + Express + MongoDB via MongoDB Atlas)

## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, React Router, Axios
- Backend: Express, Mongoose, JWT (for future admin features)
- Database: MongoDB Atlas
- Deployment:
  - Frontend: Vercel
  - Backend: Render

## Setup

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd aaie-website
   ```

2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Configure server environment:
   - Copy `server/.env.example` to `server/.env`
   - Fill in values like `MONGODB_URI`, `JWT_SECRET`, and email credentials.

4. Run in development:
   ```bash
   npm run dev
   ```

## Waitlist Setup (Supabase + Resend)

1. Create the `waitlist` table in Supabase SQL editor:
   ```sql
   CREATE TABLE waitlist (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT NOT NULL UNIQUE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     language TEXT DEFAULT 'en'
   );

   ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow public insert" ON waitlist
     FOR INSERT TO anon
     WITH CHECK (true);

   CREATE POLICY "Allow service role read" ON waitlist
     FOR SELECT TO service_role
     USING (true);
   ```

2. Add these env vars in `server/.env` and deployment environment:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`

## Available Scripts
- `npm run dev` - Runs both `client` and `server` concurrently
- `npm run client` - Runs only the frontend
- `npm run server` - Runs only the backend
- `npm run install-all` - Installs dependencies for root, client, and server

## Project Structure
```txt
aaie-website/
├── client/          (React frontend)
├── server/          (Express backend)
├── README.md
├── .gitignore
└── package.json    (root workspace scripts)
```

### Client (`client/src/`)
- `components/` Reusable UI components
- `pages/` Page-level components
- `assets/` Images and logos
- `utils/` Helper functions
- `api/` API call utilities
- `App.jsx` App entry component

### Server (`server/`)
- `config/` MongoDB connection
- `controllers/` Business logic
- `models/` Mongoose schemas
- `routes/` Express API routes
- `middleware/` Auth and error handling
- `utils/` Helpers

## Contributing
1. Create a feature branch.
2. Keep changes focused (frontend vs backend).
3. Add a short note in your PR about what you changed and why.

## Deployment
- Full production deployment runbook: `DEPLOYMENT.md`
- Includes:
  - Vercel frontend setup
  - Render backend setup
  - MongoDB Atlas setup
  - DNS/domain mapping
  - CI/CD workflow behavior
  - Monitoring and post-deploy checklist
