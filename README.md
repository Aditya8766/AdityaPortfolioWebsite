# Aditya Portfolio

A static Vite frontend with shared reviews stored in Supabase. No custom backend, Vercel configuration file, or Vercel environment variables are required. Public project connection details are in `src/lib/supabaseConfig.js`; the frontend calls the Supabase Data API directly.

## One-time database setup

1. Open https://supabase.com/dashboard/project/grikvmdrrqvyzunrjhsb/sql/new.
2. Copy all of `supabase/migrations/202610260001_portfolio_reviews.sql` into the SQL Editor and click Run.
3. Push the website changes to the branch connected to your existing Vercel project. Its existing Vite build deploys to your existing URL.
4. Submit a review and open the site in another browser to check that it appears there too.

The SQL creates `public.portfolio_reviews`, database validation, and row-level security. Visitors can read and insert reviews, but cannot update/delete them or choose their IDs/timestamps. Manage unwanted reviews in Supabase's Table Editor. The publishable key is intended for public browser code; never replace it with a secret/service-role key.

Reviews appear immediately after submission. Other open browsers refresh every 30 seconds while visible and when their window regains focus. Existing browser-only reviews are not automatically uploaded. Loading and saving show errors if Supabase is unavailable; there is no browser-only fallback that could falsely report a public submission as successful.

This is an anonymous public submission form: reviews publish immediately without moderation, authentication, CAPTCHA, or server-side rate limiting. Database constraints validate fields but do not prevent spam. Keep the Supabase project active and within its service limits.

## Development

Run `npm install`, then `npm run dev`. Run `npm run build` for the static production build in `dist`, and `npm run lint` for lint checks. No new package is needed: requests use the browser Fetch API.
