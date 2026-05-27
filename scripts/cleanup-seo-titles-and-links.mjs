#!/usr/bin/env node
/**
 * Two cleanups for the Screaming Frog audit:
 *
 * 1) DEDUPE TITLES — Many seoTitle fields end with " | Sandhurst Roofing"
 *    AND the metadata template ALSO appends " | Sandhurst Roofing", so pages
 *    end up titled e.g. "About | ... | Sandhurst Roofing | Sandhurst Roofing".
 *    Fix: strip the trailing brand from source data so the template adds it
 *    cleanly once.
 *
 * 2) FIX INTERNAL LINKS TO REDIRECTS — Content body links sometimes point at
 *    URLs that hit our own redirect map (e.g., old WP slug → /blog/[slug]/),
 *    causing 18 "Internal Redirection 3xx" warnings. Resolve them: replace
 *    each link's href with the redirect's destination so they go straight
 *    to the canonical URL.
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

// Load redirect map dynamically (it's TS, so we re-import its data via a small shim)
// For simplicity, hand-extract the source→destination pairs from the TS source.
const redirectsTs = fs.readFileSync(path.join(ROOT, "lib/redirects.ts"), "utf8");
const redirects = new Map();
for (const match of redirectsTs.matchAll(
  /\{\s*source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g
)) {
  redirects.set(match[1], match[2]);
}
console.log(`Loaded ${redirects.size} redirects from lib/redirects.ts\n`);

const BRAND_SUFFIX_RE = /\s*[|–-]\s*Sandhurst\s+Roofing\s*$/i;

function dedupeTitle(seoTitle) {
  if (!seoTitle) return { newValue: seoTitle, changed: false };
  // Strip ONE trailing brand suffix (template will re-add it)
  const cleaned = seoTitle.replace(BRAND_SUFFIX_RE, "").trim();
  if (cleaned === seoTitle) return { newValue: seoTitle, changed: false };
  return { newValue: cleaned, changed: true };
}

function fixLinks(html) {
  if (!html || typeof html !== "string") return { newValue: html, changed: 0 };
  let count = 0;
  let newHtml = html;

  // Match href="..." in any <a>
  newHtml = newHtml.replace(
    /href="(https:\/\/sandhurstroofing\.com\.au)?([/][^"]*)"/g,
    (full, host, urlPath) => {
      const destination = redirects.get(urlPath);
      if (destination) {
        count++;
        return `href="${host || ""}${destination}"`;
      }
      return full;
    }
  );

  return { newValue: newHtml, changed: count };
}

let titlesFixed = 0;
let linksFixed = 0;
const filesChanged = new Set();

const dirs = ["content/posts", "content/pages", "content/services", "content/locations"];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const full = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(full, "utf8"));
    let dirty = false;

    // 1) seoTitle dedupe
    if (data.seoTitle) {
      const { newValue, changed } = dedupeTitle(data.seoTitle);
      if (changed) {
        data.seoTitle = newValue;
        titlesFixed++;
        dirty = true;
      }
    }

    // 2) content link redirects
    if (data.content) {
      const { newValue, changed } = fixLinks(data.content);
      if (changed > 0) {
        data.content = newValue;
        linksFixed += changed;
        dirty = true;
      }
    }

    if (dirty) {
      fs.writeFileSync(full, JSON.stringify(data, null, 2));
      filesChanged.add(full);
    }
  }
}

console.log(`\nResults:`);
console.log(`  Titles dedupe'd:        ${titlesFixed}`);
console.log(`  Internal links resolved: ${linksFixed}`);
console.log(`  Files changed:           ${filesChanged.size}`);
