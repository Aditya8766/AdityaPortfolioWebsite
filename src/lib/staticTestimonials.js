const pageSize = 12;
const draftKey = 'aditya-review-draft';

export async function fetchReviews(signal, offset = 0, limit = pageSize) {
  if (!Number.isInteger(offset) || offset < 0 || !Number.isInteger(limit) || limit < 1) throw new Error('Review page is invalid.');
  let response;
  try { response = await fetch('/testimonials.json', { signal, cache: 'no-cache' }); }
  catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('Published reviews could not be loaded. Please check your connection and retry.');
  }
  if (!response.ok) throw new Error('Published reviews could not be loaded. Please try again later.');
  const reviews = await response.json();
  if (!Array.isArray(reviews) || reviews.some(review => !review.id || typeof review.client_name !== 'string' || typeof review.company_role !== 'string' || typeof review.message !== 'string' || !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5)) throw new Error('Published reviews are temporarily unavailable. Please try again later.');
  return reviews.slice(offset, offset + limit);
}

export function readReviewDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(draftKey));
    if (draft && typeof draft.client_name === 'string' && typeof draft.company_role === 'string' && typeof draft.message === 'string' && Number.isInteger(draft.rating)) return draft;
  } catch { /* Storage may be disabled; the form still works. */ }
  return null;
}

export function prepareReview(review) {
  const cleaned = { client_name: review.client_name.trim(), company_role: review.company_role.trim(), message: review.message.trim(), rating: review.rating };
  if (cleaned.client_name.length < 2 || cleaned.client_name.length > 80 || cleaned.company_role.length < 2 || cleaned.company_role.length > 120 || cleaned.message.length < 20 || cleaned.message.length > 2000 || !Number.isInteger(cleaned.rating) || cleaned.rating < 1 || cleaned.rating > 5) throw new Error('Enter a valid name, company / role, rating, and review.');
  try { localStorage.setItem(draftKey, JSON.stringify(cleaned)); } catch { /* Draft caching is optional. */ }
  const message = `Hi Aditya! I'd like to share a portfolio review for publication.\n\nName: ${cleaned.client_name}\nCompany / role: ${cleaned.company_role}\nRating: ${cleaned.rating}/5\n\n${cleaned.message}\n\nI agree to publish the name, company / role, rating, and review above on your portfolio.`;
  return `https://wa.me/918766971902?text=${encodeURIComponent(message)}`;
}
