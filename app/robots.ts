import type { MetadataRoute } from "next";

const SITE_URL = "https://sandhurstroofing.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/thank-you/",
          // Paid-traffic landing pages - kept out of organic so they don't
          // compete with or duplicate the /re-roofing/ and /guttering/ pages.
          "/re-roofing-quote/",
          "/guttering-quote/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
