import type { NextConfig } from "next";
import { redirectMap } from "./lib/redirects";

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
};

export default nextConfig;
