#!/usr/bin/env node
/**
 * One-shot content cleanup: enhance every raw <img> tag in content JSON files.
 *
 * For each <img> tag found inside a JSON `content` field:
 *   - Adds alt="..." derived from the filename if missing
 *   - Adds width="..." height="..." read from the actual file via sharp (CLS fix)
 *   - Adds loading="lazy" if missing (LCP improvement for offscreen images)
 *
 * Why: Screaming Frog audit (May 27, 2026) flagged 50+ images missing alt
 * attributes and 104+ missing size attributes. Those raw <img> tags are
 * rendered via dangerouslySetInnerHTML in [slug]/page.tsx and blog/[slug]/page.tsx,
 * so the fix is to enhance them in the JSON source files.
 *
 * Safe to re-run: only enhances tags that are missing the attributes (idempotent).
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();

function altFromSrc(src) {
  // /images/wp/2019/11/colorbond-roofing-chelsea-heights.jpg → 'colorbond roofing chelsea heights'
  const base = path.basename(src, path.extname(src));
  return base
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\d+x\d+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function getDimensions(src) {
  // src might start with / or not
  const cleaned = src.replace(/^\//, "");
  const filePath = path.join(ROOT, "public", cleaned);
  if (!fs.existsSync(filePath)) return null;
  try {
    const meta = await sharp(filePath).metadata();
    if (meta.width && meta.height) return { width: meta.width, height: meta.height };
  } catch (e) {
    // ignore
  }
  return null;
}

async function processFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);
  if (!data.content) return 0;

  let newContent = data.content;
  let changeCount = 0;

  // Match img tags. Content is a JSON-string so quotes are not escaped here
  // (we've already parsed it), use simple double-quote regex.
  const imgRegex = /<img\b([^>]*?)>/g;
  const matches = [...newContent.matchAll(imgRegex)];

  for (const match of matches) {
    const fullTag = match[0];
    let attrs = match[1];

    const srcMatch = attrs.match(/src="([^"]+)"/);
    if (!srcMatch) continue;
    const src = srcMatch[1];

    let changed = false;

    if (!/\salt\s*=/.test(attrs)) {
      const alt = altFromSrc(src);
      attrs = attrs + ` alt="${alt}"`;
      changed = true;
    }

    if (!/\swidth\s*=/.test(attrs)) {
      const dims = await getDimensions(src);
      if (dims) {
        attrs = attrs + ` width="${dims.width}" height="${dims.height}"`;
        changed = true;
      }
    }

    if (!/\sloading\s*=/.test(attrs)) {
      attrs = attrs + ` loading="lazy"`;
      changed = true;
    }

    if (changed) {
      const newTag = `<img${attrs}>`;
      // Replace exactly one occurrence at a time
      newContent = newContent.replace(fullTag, newTag);
      changeCount++;
    }
  }

  if (changeCount > 0) {
    data.content = newContent;
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
  return changeCount;
}

const dirs = ["content/posts", "content/pages", "content/services", "content/locations"];
let total = 0;
let filesChanged = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const full = path.join(dir, file);
    const count = await processFile(full);
    if (count > 0) {
      console.log(`  ${full}: ${count} <img> tag(s) enhanced`);
      total += count;
      filesChanged++;
    }
  }
}

console.log(`\nTotal: ${total} <img> tags enhanced across ${filesChanged} files`);
