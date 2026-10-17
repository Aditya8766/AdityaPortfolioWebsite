import { useEffect, useRef, useState } from "react";
import { Alert, Box } from "@mui/material";
import { turnstileSiteKey } from "../lib/testimonials";

let scriptPromise;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => { script.remove(); scriptPromise = undefined; reject(new Error("Verification could not load.")); };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export default function ReviewCaptcha({ onToken }) {
  const container = useRef(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let disposed = false;
    let widget;
    loadTurnstile().then((turnstile) => {
      if (disposed) return;
      widget = turnstile.render(container.current, {
        sitekey: turnstileSiteKey, theme: "dark", size: "flexible", action: "submit-review",
        callback: (token) => { setError(false); onToken(token); },
        "expired-callback": () => onToken(""),
        "error-callback": () => { onToken(""); setError(true); },
      });
    }).catch(() => { if (!disposed) setError(true); });
    return () => { disposed = true; if (widget !== undefined) window.turnstile?.remove(widget); };
  }, [onToken]);
  return <Box><Box ref={container} sx={{ minHeight: 65 }} />{error && <Alert severity="warning">Verification is unavailable. Check your connection or reopen this form to retry.</Alert>}</Box>;
}
