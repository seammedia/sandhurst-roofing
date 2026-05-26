import type { NextConfig } from "next";
import { redirectMap } from "./lib/redirects";

const nextConfig: NextConfig = {
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
