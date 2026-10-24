const storageKey = "aditya-portfolio-testimonials";
const pageSize = 12;

function readReviews() {
  let stored;
  try {
    stored = window.localStorage.getItem(storageKey);
  } catch {
    throw new Error("This browser does not allow access to local storage. Enable site storage and try again.");
  }

  if (stored === null) return [];

  let reviews;
  try {
    reviews = JSON.parse(stored);
  } catch {
    throw new Error("Saved reviews could not be read. Clear this site's review storage and try again.");
  }
  if (!Array.isArray(reviews) || reviews.some((review) => (
    !review
    || typeof review.id !== "string"
    || typeof review.client_name !== "string"
    || typeof review.company_role !== "string"
    || typeof review.message !== "string"
    || !Number.isInteger(review.rating)
    || review.rating < 1
    || review.rating > 5
    || typeof review.created_at !== "string"
  ))) {
    throw new Error("Saved reviews have an invalid format. Clear this site's review storage and try again.");
  }

  return reviews.sort((first, second) => second.created_at.localeCompare(first.created_at));
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

export async function fetchReviews(signal, offset = 0) {
  if (signal.aborted) throw signal.reason;
  if (!Number.isInteger(offset) || offset < 0) throw new Error("Review page is invalid.");
  return readReviews().slice(offset, offset + pageSize);
}

export async function submitReview(review) {
  const cleaned = validateReview(review);
  const savedReview = {
    ...cleaned,
    id: globalThis.crypto?.randomUUID?.() ?? `review-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    created_at: new Date().toISOString(),
  };
  const reviews = readReviews();

  try {
    window.localStorage.setItem(storageKey, JSON.stringify([savedReview, ...reviews]));
  } catch {
    throw new Error("Your review could not be saved. Browser storage may be disabled or full.");
  }
}
