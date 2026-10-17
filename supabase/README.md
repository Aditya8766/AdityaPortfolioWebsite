# Client testimonials setup

This feature uses Supabase Postgres + a serverless Edge Function. No running application server or additional frontend dependency is needed. Until configured, the portfolio remains usable and submissions are disabled. No demo reviews are presented as real clients.

## Configure

1. Create a Supabase project. Run `supabase login`, then `supabase link --project-ref YOUR_PROJECT_REF` from this repository using the Supabase CLI. Run `supabase db push` to apply `supabase/migrations/202610170001_testimonials.sql`. Alternatively, execute that migration once in the Dashboard SQL Editor.
2. Create a Cloudflare Turnstile **managed** widget, allowing your production hostname and `localhost` for development. Copy its public site key and private secret. Use real keys for production; testing keys do not protect against spam.
3. Copy `.env.example` to `.env.local`. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (the Supabase publishable key, never a secret/service-role key), and `VITE_TURNSTILE_SITE_KEY`. Restart Vite. Configure those same public variables in your frontend host and rebuild when deploying.
4. Set these **Edge Function secrets only**, using Dashboard → Edge Functions → Secrets:

   | Secret | Example |
   | --- | --- |
   | `TURNSTILE_SECRET_KEY` | Private Turnstile widget secret |
   | `ALLOWED_ORIGINS` | `https://your-portfolio.com,http://localhost:5173` |
   | `TURNSTILE_HOSTNAMES` | `your-portfolio.com,localhost` |

   Origins must match exactly, with scheme and port and no trailing slash. Hostnames have no scheme or port. Include every production/preview domain you intend to support in both settings and the Turnstile widget. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are supplied automatically to hosted Supabase Edge Functions; never copy them into frontend configuration.
5. Run `supabase functions deploy submit-review` from this repository. The tracked `config.toml` disables JWT verification for this anonymous endpoint; the function itself requires server-verified, single-use Turnstile tokens with matching action and hostname. CORS alone is not spam protection. RLS blocks all direct visitor writes.

## Moderate

Use the Supabase Dashboard Table Editor → `testimonials`. New rows have `status = pending`. Review the content and change status to `approved` to publish or `rejected` to hide. Edit/delete abusive content there. Dashboard access is your admin interface; no admin credentials or browser moderation endpoint are included.

Visitors fetch approved reviews on page load, in batches of 12. Refresh after approving to see changes. Pending and rejected records are blocked by RLS even if a visitor changes the REST query. CAPTCHA tokens are never stored. Reviews are rendered as plain React text, not HTML.

## Verify before launch

- Submit valid content after verification; confirm success and a pending row that does not appear publicly.
- Approve the row in Dashboard, reload, and confirm it appears. Reject it and confirm it disappears.
- With only the public key, query pending reviews (expect `[]`); attempt direct insert/update/delete (expect denied or no changes).
- POST invalid lengths/ratings or a missing/invalid/reused CAPTCHA token to the function; confirm rejection and no new row. Adding `status: "approved"` to a valid submission must still create a pending row.
- Test CAPTCHA expiration, failed network requests, mobile dialog scrolling, keyboard navigation, and loading/retry states.
- If reads fail, check the migration and public key. If submissions fail, check deployed function, secrets, exact allowed origin, and Turnstile hostname settings. Allow `https://challenges.cloudflare.com` in CSP script/frame/connect policies if your host uses a CSP.

The code can be built without backend configuration. Actual persistence, CAPTCHA, and RLS require a configured Supabase project and must be verified there before launch.

References: [Supabase function authentication](https://supabase.com/docs/guides/functions/auth), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
