import type { NextConfig } from "next";
import { redirectMap } from "./lib/redirects";

// Baseline security headers — applied to every response.
// Audited by Screaming Frog post-launch; these address the four missing-header
// warnings (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
//
// CSP is intentionally permissive enough to keep working with:
//   - Google Tag / Google Ads (gtag.js, gstatic, doubleclick)
//   - Google Fonts (CSS + woff2 hosted on fonts.googleapis.com / gstatic.com)
//   - Vercel's own analytics + image optimisation pipeline
// Tighten further only after auditing actual third-party calls — too strict and
// the conversion tag stops firing, which is worse than a slightly broad CSP.
const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.google.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://region1.google-analytics.com",
      "frame-src 'self' https://www.google.com https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Match WordPress URL format exactly - every page ends with `/`.
  // This is critical for SEO continuity (Google has indexed every URL with
  // a trailing slash for years) and for the migration redirect rules in
  // lib/redirects.ts (whose `source` paths all end with `/`).
  // Without this, Next.js auto-redirects /foo/ → /foo BEFORE checking the
  // redirect map, breaking every redirect whose source has a trailing slash.
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return redirectMap;
  },
  async headers() {
    return [
      {
        // Apply to ALL routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
