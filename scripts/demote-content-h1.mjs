#!/usr/bin/env node
/**
 * Demote every <h1> inside content JSON to <h2>.
 *
 * Background: the dynamic [slug] and blog/[slug] pages both render a template
 * <h1> from data.title at the top of the page. If the content body ALSO has
 * <h1> tags (legacy from the WordPress rich-text editor), the page ends up
 * with multiple <h1>s — flagged by Screaming Frog as 25+ "H1: Multiple" warnings.
 *
 * Fix: rewrite every <h1>...</h1> in content fields to <h2>...</h2>. Preserves
 * the heading text and styling intent (it's still a top-level body heading),
 * but maintains correct H1-once-per-page document structure.
 *
 * Safe to re-run (idempotent — converts whatever is left).
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

function processFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);
  if (!data.content || typeof data.content !== "string") return 0;

  const before = data.content;
  const after = data.content
    // Open tag with optional attrs: <h1 ...> → <h2 ...>
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    // Close tag: </h1> → </h2>
    .replace(/<\/h1>/gi, "</h2>");

  if (after === before) return 0;

  data.content = after;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  // Count how many demotions happened
  const matches = before.match(/<h1\b/gi) || [];
  return matches.length;
}

const dirs = ["content/posts", "content/pages", "content/services", "content/locations"];
let total = 0;
let filesChanged = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const full = path.join(dir, file);
    const count = processFile(full);
    if (count > 0) {
      console.log(`  ${full}: demoted ${count} <h1> → <h2>`);
      total += count;
      filesChanged++;
    }
  }
}

console.log(`\nTotal: ${total} <h1> tags demoted across ${filesChanged} files`);
