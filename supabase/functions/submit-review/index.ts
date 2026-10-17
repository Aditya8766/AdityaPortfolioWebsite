import { validateReview } from "./validation.ts";

Deno.serve(async (request: Request) => {
  const origins = (Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map((value) => value.trim()).filter(Boolean);
  const origin = request.headers.get("Origin") || "";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origins.includes(origin) ? origin : "null",
    "Access-Control-Allow-Headers": "apikey, content-type, authorization, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store", Vary: "Origin",
  };
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers });
  if (!origin || !origins.includes(origin)) return reply(403, { error: "This website is not allowed to submit reviews." });
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST") return reply(405, { error: "Use POST to submit a review." });
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  const hostnames = (Deno.env.get("TURNSTILE_HOSTNAMES") || "").split(",").map((value) => value.trim()).filter(Boolean);
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!secret || !hostnames.length || !supabaseUrl || !serviceKey) return reply(503, { error: "Review submissions are temporarily unavailable." });
  if (!request.headers.get("content-type")?.includes("application/json")) return reply(415, { error: "Send a JSON review." });
  try {
    // Bound streamed input, including requests with missing/incorrect Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply(400, { error: "A review is required." });
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return reply(413, { error: "Your review is too large." }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    let body;
    try { body = JSON.parse(new TextDecoder().decode(bytes)); }
    catch { return reply(400, { error: "Invalid review format." }); }
    const review = validateReview(body);
    if (!review) return reply(400, { error: "Enter a name (2–80 characters), company / role (2–120), rating (1–5), and review (20–2,000), then complete verification." });
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: review.captcha_token }),
      signal: AbortSignal.timeout(10000),
    });
    if (!verification.ok) return reply(503, { error: "Verification is unavailable. Please try again." });
    const result = await verification.json();
    if (!result.success || result.action !== "submit-review" || !hostnames.includes(result.hostname)) return reply(400, { error: "Verification expired or failed. Please verify again." });
    // Explicit allowlist: never accept status, IDs, or timestamps from the caller.
    const response = await fetch(`${supabaseUrl}/rest/v1/testimonials`, {
      method: "POST",
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ client_name: review.client_name, company_role: review.company_role, message: review.message, rating: review.rating, status: "pending" }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return reply(503, { error: "Your review could not be saved. Please try again shortly." });
    return reply(201, { status: "pending" });
  } catch {
    return reply(503, { error: "Review submissions are temporarily unavailable. Please try again shortly." });
  }
});
