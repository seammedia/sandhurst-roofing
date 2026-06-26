"use client";

import { useEffect } from "react";

/**
 * Fires a Google Ads "call from website" conversion whenever a visitor taps any
 * tel: link (the "Call Now" buttons sitewide). For a roofing business most paid
 * leads phone rather than fill in a form, so without this the campaign is blind
 * to its biggest conversion channel and smart bidding optimises for the wrong thing.
 *
 * Uses event delegation on the document so it covers every tel: link on every
 * page, including ones rendered after load, with zero per-button wiring.
 *
 * Env vars (set in Vercel, both required for this to fire):
 *   - NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID    e.g. "AW-123456789"
 *   - NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL       label of the "Calls" conversion action
 *
 * Create the conversion action in Google Ads:
 *   Goals -> Conversions -> New -> "Phone calls" -> "Calls from a website"
 * then paste its label into NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL.
 *
 * Renders nothing. Graceful no-op if env vars are missing.
 */

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL;

export default function CallTracking() {
  useEffect(() => {
    if (!ADS_ID || !CALL_LABEL) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a[href^="tel:"]');
      if (!link) return;

      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
        .gtag;
      if (typeof gtag === "function") {
        gtag("event", "conversion", {
          send_to: `${ADS_ID}/${CALL_LABEL}`,
        });
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
