import { useEffect, useRef, useState } from "react";
import { Alert, Avatar, Box, Button, Card, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Rating, Skeleton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { fetchReviews, reviewsConfigured, submissionsConfigured, submitReview } from "../lib/testimonials";

const initialForm = { client_name: "", company_role: "", rating: 0, message: "" };
const glass = {
  p: { xs: 3, md: 4 }, borderRadius: 6, backdropFilter: "blur(20px)",
  background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(255,64,129,0.08))",
  border: "1px solid rgba(0,229,255,0.2)",
};

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(reviewsConfigured);
  const [loadError, setLoadError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [reload, setReload] = useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!reviewsConfigured) return;
    const controller = new AbortController();
    fetchReviews(controller.signal).then((data) => {
      setReviews(data); setHasMore(data.length === 12); setLoadError("");
    }).catch((error) => { if (!controller.signal.aborted) setLoadError(error.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [reload]);

  async function loadMore() {
    setLoading(true); setLoadError("");
    try {
      const data = await fetchReviews(AbortSignal.timeout(15000), reviews.length);
      setReviews((previous) => [...new Map([...previous, ...data].map((review) => [review.id, review])).values()]);
      setHasMore(data.length === 12);
    } catch (error) { setLoadError(error.message); }
    finally { setLoading(false); }
  }

  function close() { if (!inFlight.current) setOpen(false); }
  async function handleSubmit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    const cleaned = { ...form, client_name: form.client_name.trim(), company_role: form.company_role.trim(), message: form.message.trim() };
    const next = {};
    if (cleaned.client_name.length < 2 || cleaned.client_name.length > 80) next.client_name = "Enter 2–80 characters.";
    if (cleaned.company_role.length < 2 || cleaned.company_role.length > 120) next.company_role = "Enter 2–120 characters.";
    if (!Number.isInteger(cleaned.rating) || cleaned.rating < 1 || cleaned.rating > 5) next.rating = "Choose a rating from 1 to 5.";
    if (cleaned.message.length < 20 || cleaned.message.length > 2000) next.message = "Write between 20 and 2,000 characters.";
    setErrors(next);
    if (Object.keys(next).length || !submissionsConfigured) return;
    inFlight.current = true; setSending(true); setSubmitError("");
    try {
      await submitReview(cleaned);
      setSuccess(true); setForm(initialForm);
      setReload((value) => value + 1);
    } catch (error) { setSubmitError(error.name === "TimeoutError" ? "The request timed out. Please try again shortly." : error.message); }
    finally { inFlight.current = false; setSending(false); }
  }

  return (
    <Container component="section" maxWidth="lg" id="testimonials" aria-labelledby="testimonials-title" sx={{ py: { xs: 3, md: 5 }, scrollMarginTop: 100 }}>
      <Stack alignItems="center" spacing={2} sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="overline" color="primary" sx={{ letterSpacing: 3 }}>Client perspectives</Typography>
        <Typography id="testimonials-title" variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "3rem" }, background: "linear-gradient(45deg, #00e5ff, #ff4081)", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Client Testimonials</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 520 }}>Thoughts from the people I’ve worked with. Have we built something together? I’d love to hear about your experience.</Typography>
        <Button variant="outlined" startIcon={<RateReviewOutlinedIcon />} onClick={() => { setSuccess(false); setSubmitError(""); setErrors({}); setOpen(true); }} sx={{ px: 3, py: 1.25 }}>Add a Review</Button>
      </Stack>
      {!reviewsConfigured && <Alert severity="info" sx={{ mb: 3 }}>Reviews are not connected yet. Configure Supabase to load or submit shared reviews.</Alert>}
      {loadError && <Alert severity="error" sx={{ mb: 3 }} action={<Button color="inherit" onClick={() => { if (reviews.length) loadMore(); else { setLoading(true); setReload((value) => value + 1); } }} disabled={loading}>Retry</Button>}>{loadError}</Alert>}
      <Box aria-busy={loading} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>
        {reviews.map((review) => <Card key={review.id} component="article" sx={{ ...glass, display: "flex", flexDirection: "column", transition: "transform .25s, box-shadow .25s", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 16px 40px #00e5ff18" }, "@media (prefers-reduced-motion: reduce)": { transition: "none", "&:hover": { transform: "none" } } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center"><Rating readOnly value={review.rating} aria-label={`${review.rating} out of 5 stars`} /><FormatQuoteIcon sx={{ color: "primary.main", opacity: 0.5, fontSize: 36 }} /></Stack>
          <Typography component="blockquote" sx={{ m: 0, my: 3, flexGrow: 1, lineHeight: 1.85, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{review.message}</Typography>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ pt: 2, borderTop: "1px solid #ffffff15" }}><Avatar sx={{ bgcolor: "#00e5ff20", color: "primary.main" }} aria-hidden="true">{review.client_name.slice(0, 1).toUpperCase()}</Avatar><Box sx={{ minWidth: 0, overflowWrap: "anywhere" }}><Typography fontWeight={700}>{review.client_name}</Typography><Typography variant="body2" color="text.secondary">{review.company_role}</Typography></Box></Stack>
        </Card>)}
        {loading && [0, 1, 2].map((item) => <Box key={item} sx={glass} role="status" aria-label="Loading reviews"><Skeleton width="45%" /><Skeleton height={100} /><Skeleton width="65%" /></Box>)}
      </Box>
      {!loading && !loadError && reviews.length === 0 && reviewsConfigured && <Box sx={{ ...glass, textAlign: "center", py: 6 }}><FormatQuoteIcon color="primary" sx={{ fontSize: 42, mb: 1 }} /><Typography variant="h6">Every collaboration has a story</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>No reviews have been published yet. Be the first to share your experience.</Typography></Box>}
      {hasMore && <Box sx={{ textAlign: "center", mt: 3 }}><Button onClick={loadMore} disabled={loading}>Load more reviews</Button></Box>}
      <Dialog open={open} onClose={close} fullWidth maxWidth="sm" aria-labelledby="review-dialog-title" slotProps={{ paper: { sx: { bgcolor: "#101b29", backgroundImage: "none", border: "1px solid #00e5ff30", borderRadius: 4 } } }}>
        <DialogTitle id="review-dialog-title" sx={{ pr: 7 }}>Share your experience<IconButton aria-label="Close review form" disabled={sending} onClick={close} sx={{ position: "absolute", top: 12, right: 12 }}><CloseIcon /></IconButton></DialogTitle>
        {success ? <><DialogContent><Alert severity="success" role="status">Thank you! Your review was submitted and is pending approval before it appears publicly.</Alert></DialogContent><DialogActions><Button onClick={close}>Done</Button></DialogActions></> : <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogContent><Stack spacing={2.5}>
            <Typography variant="body2" color="text.secondary">Your name, company / role, rating, and message will be public once approved. Please avoid sharing private information.</Typography>
            {!reviewsConfigured && <Alert severity="info">Review submissions are unavailable until the site is connected to Supabase.</Alert>}
            {submitError && <Alert severity="error">{submitError}</Alert>}
            {[['client_name', 'Client name', 80], ['company_role', 'Company / role', 120], ['message', 'Your review', 2000]].map(([name, label, maxLength]) => <TextField key={name} name={name} label={label} required fullWidth autoFocus={name === 'client_name'} disabled={sending} value={form[name]} onChange={(event) => setForm((previous) => ({ ...previous, [name]: event.target.value }))} error={Boolean(errors[name])} helperText={errors[name] || (name === 'message' ? `${form.message.length}/2000 · Minimum 20 characters` : undefined)} multiline={name === 'message'} minRows={name === 'message' ? 4 : undefined} slotProps={{ htmlInput: { maxLength } }} />)}
            <Box><Typography id="review-rating-label" component="p" sx={{ mb: 1 }}>Star rating *</Typography><Rating name="review-rating" value={form.rating} onChange={(_, value) => setForm((previous) => ({ ...previous, rating: value || 0 }))} disabled={sending} size="large" aria-labelledby="review-rating-label" />{errors.rating && <Typography color="error" variant="caption" display="block" role="alert">{errors.rating}</Typography>}</Box>
          </Stack></DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, flexWrap: "wrap", gap: 1 }}><Button disabled={sending} onClick={close}>Cancel</Button><Button type="submit" variant="contained" disabled={sending || !submissionsConfigured} startIcon={sending ? <CircularProgress size={16} color="inherit" /> : null}>{sending ? "Submitting…" : "Submit for approval"}</Button></DialogActions>
        </Box>}
      </Dialog>
    </Container>
  );
}
