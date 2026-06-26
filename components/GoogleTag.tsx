import Script from "next/script";

/**
 * Site-wide Google tag (gtag.js).
 *
 * Loads the Google tag once for the whole site so Google Ads can:
 *   - build remarketing audiences from every visitor (not just converters),
 *   - record phone-call conversions on any page (see CallTracking.tsx),
 *   - feed GA4 if a measurement ID is provided.
 *
 * The /thank-you/ page no longer loads the library itself - it just fires the
 * conversion event into the dataLayer this component sets up.
 *
 * Env vars (set in Vercel project settings, all optional):
 *   - NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID   e.g. "AW-123456789"  (enables the tag)
 *   - NEXT_PUBLIC_GA4_ID                      e.g. "G-XXXXXXXXXX"  (optional GA4)
 *
 * If the Ads conversion ID is missing, nothing is injected (graceful no-op),
 * so local/dev builds and un-configured deploys stay clean.
 */

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function GoogleTag() {
  // The Ads ID is the trigger. GA4 alone is handled below if you ever want it
  // without Ads, but the common case here is Ads (+ optional GA4).
  const primaryId = ADS_ID || GA4_ID;
  if (!primaryId) return null;

  const configs = [
    ADS_ID ? `gtag('config', '${ADS_ID}');` : "",
    GA4_ID ? `gtag('config', '${GA4_ID}');` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configs}
        `}
      </Script>
    </>
  );
}
