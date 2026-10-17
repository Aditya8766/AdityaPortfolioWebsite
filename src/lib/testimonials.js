const url = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
export const reviewsConfigured = Boolean(url && key);
export const submissionsConfigured = reviewsConfigured && Boolean(turnstileSiteKey);

export async function fetchReviews(signal, offset = 0) {
  const response = await fetch(`${url}/rest/v1/testimonials?select=id,client_name,company_role,rating,message,created_at&status=eq.approved&order=created_at.desc,id.desc&limit=12&offset=${offset}`, {
    headers: { apikey: key }, signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]),
  });
  if (!response.ok) throw new Error("Reviews could not be loaded. Please try again.");
  return response.json();
}

export async function submitReview(review) {
  const response = await fetch(`${url}/functions/v1/submit-review`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key },
    body: JSON.stringify(review),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "Your review could not be submitted. Please try again.");
  }
}
