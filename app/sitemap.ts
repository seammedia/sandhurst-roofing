import type { MetadataRoute } from "next";
import {
  getAllServices,
  getAllLocations,
  getAllPosts,
  getSiteData,
} from "@/lib/content";

const SITE_URL = "https://sandhurstroofing.com.au";

// Core pages (handled by app/[slug]/page.tsx) that aren't in services/locations/posts.
// Keep in sync with the RESERVED_SLUGS and core list in app/[slug]/page.tsx.
const CORE_PAGES: { slug: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { slug: "about-us", priority: 0.7, changeFrequency: "monthly" },
  { slug: "colorbond-colour-chart", priority: 0.5, changeFrequency: "yearly" },
  { slug: "colour-tools", priority: 0.5, changeFrequency: "yearly" },
  { slug: "colour-visualisation-tool", priority: 0.5, changeFrequency: "yearly" },
  { slug: "recent-jobs", priority: 0.7, changeFrequency: "monthly" },
  { slug: "reviews", priority: 0.7, changeFrequency: "monthly" },
  { slug: "service-areas", priority: 0.6, changeFrequency: "monthly" },
];

// Pages with their own routes (not loaded via [slug])
const ROUTED_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/contact/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog/", priority: 0.7, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const locations = getAllLocations();
  const posts = getAllPosts();
  // Validate site-data is reachable (used elsewhere in build); not strictly needed for sitemap entries.
  void getSiteData();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  });

  // Routed pages
  for (const p of ROUTED_PAGES) {
    entries.push({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    });
  }

  // Core pages (rendered by [slug])
  for (const p of CORE_PAGES) {
    entries.push({
      url: `${SITE_URL}/${p.slug}/`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    });
  }

  // Services - high SEO priority (main business pages)
  for (const s of services) {
    entries.push({
      url: `${SITE_URL}/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // Locations - high SEO priority (local SEO)
  for (const l of locations) {
    entries.push({
      url: `${SITE_URL}/${l.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Blog posts
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  return entries;
}
