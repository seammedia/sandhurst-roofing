#!/usr/bin/env node
/**
 * Localise duplicate / generic H2 headings across content/locations/*.json so
 * every location page has unique, suburb-specific H2s (better local SEO, no
 * "doorway page" duplicate-heading signal).
 *
 * Background: ~25 generic H2s were repeated across the 87 location pages. The
 * worst offender, "What Our Customers Say", appeared on 85 pages byte-identical.
 *
 * Strategy:
 *   - Walk every <h2>...</h2> block. Compute its normalised inner text.
 *   - If the text matches a known generic phrase, rewrite it to include the
 *     page's suburb (derived from `title`, stripping "Roof Restoration "/
 *     "Roof Plumber " prefixes). Wrapper markup + inline styles are PRESERVED
 *     (the testimonial H2 carries a white-text span on a dark section; rebuilding
 *     it would make the text invisible) by replacing only the inner text run.
 *   - roof-plumber-* pages that share a suburb with a plain suburb page get a
 *     "Roof Plumbing" qualifier so we don't create new cross-page duplicates.
 *   - The two "Near Me" pages use a service label instead of a suburb.
 *   - Empty <h2></h2> / <h2> </h2> tags are removed entirely.
 *
 * Idempotent + safe to re-run: rewritten headings no longer match any generic
 * phrase, so a second pass is a no-op. Set DRY=1 to preview without writing.
 */
import fs from "fs";
import path from "path";

const DIR = "content/locations";
const DRY = process.env.DRY === "1";

const stripTags = (s) => s.replace(/<[^>]+>/g, "");
const norm = (s) => stripTags(s).replace(/\s+/g, " ").trim();

function suburbOf(title) {
  return title
    .replace(/^Roof Restoration\s+/i, "")
    .replace(/^Roof Plumber\s+/i, "")
    .trim();
}

// Each rule: test(innerText, ctx) -> bool ; make(ctx) -> new inner text
const RULES = [
  {
    test: (t) => t === "What Our Customers Say",
    make: (ctx) => {
      if (ctx.s === "Near Me")
        return ctx.isPlumber
          ? "What Our Roof Plumbing Customers Say"
          : "What Our Roof Restoration Customers Say";
      return ctx.isPlumber
        ? `What Our ${ctx.s} Roof Plumbing Customers Say`
        : `What Our ${ctx.s} Customers Say`;
    },
  },
  {
    test: (t) => t === "Fully Licensed & Insured Roof Repair & Restoration",
    make: (ctx) => `Fully Licensed & Insured Roofing in ${ctx.s}`,
  },
  {
    test: (t) => t === "Fully Licensed & Insured Roof & Gutter Repairs",
    make: (ctx) => `Fully Licensed & Insured Roofing in ${ctx.s}`,
  },
  {
    test: (t) =>
      t === "Experience Comprehensive Roof and Gutter Repairs" ||
      t === "Experience Comprehensive Roof And Gutter Repairs",
    make: (ctx) => `Comprehensive Roof & Gutter Repairs in ${ctx.s}`,
  },
  {
    test: (t) =>
      t === "Quality Roof Repairs at a Competitive Price" ||
      t === "Quality Roof Repairs At A Competitive Price",
    make: (ctx) => `Quality Roof Repairs in ${ctx.s} at a Competitive Price`,
  },
  {
    test: (t) => t === "Offering Reliable & Quality Roof Repair & Restoration",
    make: (ctx) => `Reliable, Quality Roof Repair & Restoration in ${ctx.s}`,
  },
  {
    test: (t) =>
      t ===
      "Sandhurst Roofing – Providing Quality Gutter & Roof Repairs for Over 30 Years",
    make: (ctx) => `30+ Years of Quality Roof & Gutter Repairs in ${ctx.s}`,
  },
  {
    test: (t) => t === "More Than Just Roof Restoration",
    make: (ctx) => `More Than Just Roof Restoration in ${ctx.s}`,
  },
  {
    test: (t) => t === "What’s Involved in Our Roof Restoration Process",
    make: (ctx) => `Our ${ctx.s} Roof Restoration Process`,
  },
  {
    test: (t) => t === "Nearby Suburbs We Also Service",
    make: (ctx) => `Suburbs Near ${ctx.s} We Also Service`,
  },
  {
    test: (t) => t === "Experience Quality Roof Repair & Restoration",
    make: (ctx) => `Quality Roof Repair & Restoration in ${ctx.s}`,
  },
  // roof-plumber pages whose "Gutter Repairs <suburb>" collides with the
  // matching plain suburb page.
  {
    test: (t, ctx) => ctx.isPlumber && /^Gutter Repairs /.test(t),
    make: (ctx) => `${ctx.s} Gutter Repairs & Roof Plumbing`,
  },
];

let filesChanged = 0;
let h2sChanged = 0;
let emptiesRemoved = 0;
const warnings = [];
const samples = [];

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  const full = path.join(DIR, file);
  const data = JSON.parse(fs.readFileSync(full, "utf8"));
  if (!data.content) continue;

  const ctx = {
    file,
    s: suburbOf(data.title || ""),
    isPlumber: file.startsWith("roof-plumber-"),
  };

  let fileTouched = false;

  const newContent = data.content.replace(
    /<h2\b[^>]*>[\s\S]*?<\/h2>/gi,
    (block) => {
      const inner = norm(block);

      if (inner === "") {
        emptiesRemoved++;
        fileTouched = true;
        return "";
      }

      for (const rule of RULES) {
        if (rule.test(inner, ctx)) {
          const next = rule.make(ctx);
          if (next === inner) return block; // already localised
          if (!block.includes(inner)) {
            warnings.push(
              `${file}: could not splice "${inner}" (split by inline tags?) - skipped`
            );
            return block;
          }
          h2sChanged++;
          fileTouched = true;
          if (samples.length < 24) samples.push(`  ${file}: "${inner}" -> "${next}"`);
          return block.replace(inner, next);
        }
      }
      return block;
    }
  );

  if (fileTouched) {
    filesChanged++;
    if (!DRY) {
      data.content = newContent;
      fs.writeFileSync(full, JSON.stringify(data, null, 2));
    }
  }
}

console.log(
  `${DRY ? "[DRY RUN] " : ""}Files changed: ${filesChanged} | H2s localised: ${h2sChanged} | Empty H2s removed: ${emptiesRemoved}`
);
if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.forEach((w) => console.log("  " + w));
}
console.log("\nSample rewrites:");
samples.forEach((s) => console.log(s));
