export function validateReview(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const input = body as Record<string, unknown>;
  const text = (key: string, min: number, max: number) => {
    if (typeof input[key] !== "string") return null;
    const value = input[key].trim();
    if (value.length < min || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) return null;
    return value;
  };
  const client_name = text("client_name", 2, 80);
  const company_role = text("company_role", 2, 120);
  const message = text("message", 20, 2000);
  const rating = input.rating;
  if (!client_name || !company_role || !message || typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) return null;
  return { client_name, company_role, message, rating };
}
