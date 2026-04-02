import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

// --- Types ---

export interface PageData {
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string | null;
}

export interface ServiceData {
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string | null;
}

export interface PostData {
  title: string;
  slug: string;
  date: string;
  categories: string[];
  content: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string | null;
  excerpt: string;
}

export interface LocationData {
  title: string;
  slug: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string | null;
}

export interface SiteServiceRef {
  title: string;
  slug: string;
}

export interface SiteLocationRef {
  title: string;
  slug: string;
}

export interface SiteData {
  title: string;
  description: string;
  url: string;
  phone: string;
  address: string;
  brandColor: string;
  services: SiteServiceRef[];
  locations: SiteLocationRef[];
  blogCategories: string[];
  postCount: number;
  pageCount: number;
}

// --- Helpers ---

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function listJsonSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

// --- Public API ---

export function getPage(slug: string): PageData {
  return readJson<PageData>(path.join(CONTENT_DIR, "pages", `${slug}.json`));
}

export function getService(slug: string): ServiceData {
  return readJson<ServiceData>(
    path.join(CONTENT_DIR, "services", `${slug}.json`)
  );
}

export function getPost(slug: string): PostData {
  return readJson<PostData>(path.join(CONTENT_DIR, "posts", `${slug}.json`));
}

export function getLocation(slug: string): LocationData {
  return readJson<LocationData>(
    path.join(CONTENT_DIR, "locations", `${slug}.json`)
  );
}

export function getAllServices(): ServiceData[] {
  const dir = path.join(CONTENT_DIR, "services");
  return listJsonSlugs(dir).map((slug) =>
    readJson<ServiceData>(path.join(dir, `${slug}.json`))
  );
}

export function getAllPosts(): PostData[] {
  const dir = path.join(CONTENT_DIR, "posts");
  return listJsonSlugs(dir)
    .map((slug) => readJson<PostData>(path.join(dir, `${slug}.json`)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllLocations(): LocationData[] {
  const dir = path.join(CONTENT_DIR, "locations");
  return listJsonSlugs(dir).map((slug) =>
    readJson<LocationData>(path.join(dir, `${slug}.json`))
  );
}

export function getSiteData(): SiteData {
  return readJson<SiteData>(path.join(CONTENT_DIR, "site-data.json"));
}
