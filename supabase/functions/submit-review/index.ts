import { validateReview } from "./validation.ts";

Deno.serve(async (request: Request) => {
  const origins = (Deno.env.get("ALLOWED_ORIGINS") || "").split(",").map((value) => value.trim()).filter(Boolean);
  const origin = request.headers.get("Origin") || "";
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origins.includes(origin) ? origin : "null",
    "Access-Control-Allow-Headers": "apikey, content-type, authorization, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers });

  if (!origin || !origins.includes(origin)) return reply(403, { error: "This website is not allowed to submit reviews." });
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST") return reply(405, { error: "Use POST to submit a review." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return reply(503, { error: "Review submissions are temporarily unavailable." });
  }
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return reply(415, { error: "Send a JSON review." });
  }

  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, { error: "A review is required." });
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return reply(413, { error: "Your review is too large." });
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    let body: unknown;
    try {
      body = JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      return reply(400, { error: "Invalid review format." });
    }

    const review = validateReview(body);
    if (!review) {
      return reply(400, { error: "Enter a valid name, company / role, rating, and review." });
    }

    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const clientIp = request.headers.get("cf-connecting-ip")
      || request.headers.get("x-real-ip")
      || forwardedFor.split(",").at(-1)?.trim();
    if (!clientIp) {
      return reply(503, { error: "Review submissions are temporarily unavailable." });
    }
    const hmacKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(serviceKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const hash = await crypto.subtle.sign("HMAC", hmacKey, new TextEncoder().encode(clientIp));
    const ipHash = Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const limitResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/consume_review_submission_limit`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_ip_hash: ipHash }),
      signal: AbortSignal.timeout(10000),
    });
    if (!limitResponse.ok) {
      console.error("Review rate limit check failed:", limitResponse.status, await limitResponse.text());
      return reply(503, { error: "Review submissions are temporarily unavailable." });
    }
    if (await limitResponse.json() !== true) {
      return reply(429, { error: "Too many reviews have been submitted from this connection. Please try again later." });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/testimonials`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        client_name: review.client_name,
        company_role: review.company_role,
        message: review.message,
        rating: review.rating,
        status: "pending",
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error("Review insert failed:", response.status, await response.text());
      return reply(503, { error: "Your review could not be saved. Please try again shortly." });
    }
    return reply(201, { status: "pending" });
  } catch (error) {
    console.error("Review submission failed:", error);
    return reply(503, { error: "Review submissions are temporarily unavailable. Please try again shortly." });
  }
});
