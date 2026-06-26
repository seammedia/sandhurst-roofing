import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPage } from "@/lib/content";
import { sanitizeHtml } from "@/lib/sanitize";

/**
 * /thank-you/ - shown after a successful contact form submission.
 *
 * This page is the conversion event for Google Ads / GA4. Loading this page
 * means a user successfully submitted the form. The Google Ads conversion
 * snippet below MUST stay on this page (or the Primary conversion will not fire).
 *
 * Env vars (set in Vercel):
 *   - NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID    e.g. "AW-123456789"
 *   - NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL e.g. "ABCdefGhIJKlmnoPQRsT"
 *
 * If either env var is missing, the conversion tag is omitted gracefully.
 * Get the exact ID + label from Google Ads → Goals → Conversions → "Thank you page"
 * → Tag setup → Use Google tag.
 */

const CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

export const metadata: Metadata = {
  title: "Thank You For Your Roofing Enquiry",
  description:
    "We appreciate that you've taken this opportunity to seek out our services regarding your roofing needs. We'll be in touch soon. Sandhurst Roofing",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/thank-you/",
  },
};

export default function ThankYouPage() {
  // Pull the original WP thank-you copy from the CMS so wording stays consistent.
  let content = "";
  try {
    content = getPage("thank-you").content;
  } catch {
    // Fallback if content file is missing
    content =
      "<h2>Thank You For Your Enquiry</h2><p>We'll be in touch soon.</p>";
  }

  return (
    <main>
      <Navbar />

      {CONVERSION_ID && CONVERSION_LABEL ? (
        // The gtag.js library + base config load site-wide via <GoogleTag /> in
        // the root layout. Here we ONLY fire the conversion event so the library
        // isn't loaded twice (which would double-count GA pageviews). Pushing to
        // the shared dataLayer is safe even if this runs before the library
        // finishes loading - gtag.js processes the queued event on init.
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('event', 'conversion', {
              'send_to': '${CONVERSION_ID}/${CONVERSION_LABEL}',
              'event_callback': function() {}
            });
          `}
        </Script>
      ) : null}

      <section className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#7cda24]">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-heading text-4xl uppercase text-white md:text-5xl lg:text-6xl">
            Thank You
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            We&apos;ve received your enquiry and will be in touch soon.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:uppercase prose-a:text-[#7cda24] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:0448812800"
              className="inline-flex items-center gap-2 bg-black px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
            >
              Call Now: 0448 812 800
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-4 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
