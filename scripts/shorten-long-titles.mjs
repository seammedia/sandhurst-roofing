#!/usr/bin/env node
/**
 * Smart-truncate seoTitle fields so the final rendered title fits under 60 chars.
 *
 * Background: even after stripping the duplicated " | Sandhurst Roofing" suffix
 * from sources, 103 pages still render titles over 60 chars because the source
 * titles are genuinely long (e.g. "X | repetitive Y | Sandhurst Roofing" → 70-90 ch).
 *
 * Strategy:
 *   - Template appends " | Sandhurst Roofing" (20 chars), so source has 40 chars to work with.
 *   - If source already <= 40 chars, no change needed.
 *   - If source has multiple " | " sections, drop trailing sections that aren't the
 *     first (primary) keyword phrase. Most patterns repeat or pad the main term.
 *   - If even the first section is too long, hard-truncate to 40 chars and add "…".
 *
 * Safe to re-run. Idempotent on already-shortened titles.
 */
import fs from "fs";
import path from "path";

const BRAND_SUFFIX = " | Sandhurst Roofing";
const TARGET_TOTAL = 60;
const TARGET_SOURCE = TARGET_TOTAL - BRAND_SUFFIX.length; // 40

function shortenTitle(source) {
  if (!source) return { newValue: source, changed: false };
  // If already fits, no change
  if (source.length <= TARGET_SOURCE) return { newValue: source, changed: false };

  // Try keeping progressively fewer pipe sections
  const parts = source.split(/\s*\|\s*/).filter(Boolean);

  // Try first N parts joined with " | " until we fit
  for (let n = parts.length - 1; n >= 1; n--) {
    const candidate = parts.slice(0, n).join(" | ");
    if (candidate.length <= TARGET_SOURCE) {
      return { newValue: candidate, changed: candidate !== source };
    }
  }

  // Even just the first part is too long — hard truncate
  const first = parts[0] || source;
  if (first.length <= TARGET_SOURCE) {
    return { newValue: first, changed: first !== source };
  }
  // Truncate at last space before the limit, append ellipsis
  const truncated = first.substring(0, TARGET_SOURCE - 1).replace(/\s\S*$/, "") + "…";
  return { newValue: truncated, changed: truncated !== source };
}

const dirs = ["content/posts", "content/pages", "content/services", "content/locations"];
let changed = 0;
const samples = [];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const full = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(full, "utf8"));
    if (!data.seoTitle) continue;

    const result = shortenTitle(data.seoTitle);
    if (result.changed) {
      if (samples.length < 8) {
        samples.push(`  ${data.seoTitle.length}ch → ${result.newValue.length}ch (final ${result.newValue.length + BRAND_SUFFIX.length}ch)`);
        samples.push(`    OLD: ${data.seoTitle}`);
        samples.push(`    NEW: ${result.newValue}${BRAND_SUFFIX}`);
        samples.push(``);
      }
      data.seoTitle = result.newValue;
      fs.writeFileSync(full, JSON.stringify(data, null, 2));
      changed++;
    }
  }
}

console.log(`Shortened ${changed} seoTitle fields\n`);
console.log("Sample transformations:");
samples.forEach((s) => console.log(s));
