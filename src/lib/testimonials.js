import { supabaseUrl, supabasePublishableKey } from "./supabaseConfig";

const pageSize = 12;

async function requestReviews(query, options = {}) {
  let response;
  try {
    response = await fetch(`${supabaseUrl}/rest/v1/portfolio_reviews${query}`, {
      ...options,
      signal: options.signal
        ? AbortSignal.any([options.signal, AbortSignal.timeout(15000)])
        : AbortSignal.timeout(15000),
      headers: {
        apikey: supabasePublishableKey,
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: "no-store",
    });
  } catch (error) {
    if (error.name === "AbortError" || error.name === "TimeoutError") throw error;
    throw new Error("Could not connect to reviews. Check your connection and try again.");
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (error.code === "PGRST205" || error.code === "42P01") {
      throw new Error("Reviews are not available yet. Please try again later.");
    }
    if (response.status === 429) throw new Error("Too many requests. Please try again shortly.");
    throw new Error("Reviews could not be loaded or saved. Please try again shortly.");
  }
  return response;
}

function validateReview(review) {
  const client_name = review.client_name.trim();
  const company_role = review.company_role.trim();
  const message = review.message.trim();
  if (client_name.length < 2 || client_name.length > 80
    || company_role.length < 2 || company_role.length > 120
    || message.length < 20 || message.length > 2000
    || !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
    throw new Error("Enter a valid name, company / role, rating, and review before saving.");
  }
  return { client_name, company_role, message, rating: review.rating };
}

export async function fetchReviews(signal, offset = 0, limit = pageSize) {
  if (!Number.isInteger(offset) || offset < 0
    || !Number.isInteger(limit) || limit < 1) throw new Error("Review page is invalid.");
  const query = new URLSearchParams({
    select: "id,client_name,company_role,message,rating,created_at",
    order: "created_at.desc,id.desc",
    offset: String(offset),
    limit: String(limit),
  });
  const response = await requestReviews(`?${query}`, { signal });
  return response.json();
}

export async function submitReview(review) {
  await requestReviews("", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(validateReview(review)),
  });
}
