# Aditya Portfolio

A static Vite/React portfolio. Testimonials need no backend or Supabase.

## Development

Run npm install, then npm run dev. Build with npm run build; preview with npm run preview.

## Public testimonials without a backend

All visitors read public/testimonials.json, which is shipped with the website. It starts empty because no verified reviews were supplied and the previous review service was unreachable. No reviews were invented.

Visitors use Add a Review to prepare a message, then choose Send review on WhatsApp. Their draft is cached in localStorage on their device. This does not publish a review. You receive the message only if they actually send it.

After approving a real review, add an object to public/testimonials.json and redeploy:

```json
[
  {
    "id": "unique-review-id",
    "client_name": "Actual reviewer name",
    "company_role": "Actual company / role",
    "rating": 5,
    "message": "The actual approved review text."
  }
]
```

The example above is documentation only. Keep only real, approved reviews in the public file. Put newest reviews first and use a unique id for each one. Every visitor sees the published file; browser drafts are never included in the public list. Existing reviews from the old service must be exported and added here if available.

Automatic publication from visitor browsers requires shared writable storage or a third-party service. Browser localStorage cannot synchronize across visitors. This static workflow supports the existing Vercel deployment without a backend.

## Verification

Run node --test scripts/static-testimonials.test.mjs for public-file loading, private drafts, validation, and error checks. scripts/verify-portfolio.mjs runs browser checks when Vite is on port 5173 and Chrome remote debugging is on port 9223. It prepares test reviews without sending or publishing them.

## Project selection

The four highlighted projects lead the page. Additional existing projects remain available. The complete 71-repository snapshot lives in an expandable searchable archive; update public/github-repositories.json when refreshing the snapshot.
