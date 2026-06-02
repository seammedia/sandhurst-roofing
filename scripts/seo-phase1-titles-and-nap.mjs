// SEO Phase 1: fix the 0488->0448 phone typo (NAP consistency + working tel:
// links) and optimise weak seoTitles/seoDescriptions on high-impression service
// pages. Low-risk, reversible on-page wins.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const RIGHT = "0448 812 800";
const WRONG = "0488 812 800";
const RIGHT_TEL = "0448812800";
const WRONG_TEL = "0488812800";

// ---- A. Phone-number typo fix (0488 -> 0448) across all affected files ----
const phoneFiles = [
  "content/services/rebedding-repointing.json",
  "content/pages/recent-jobs.json",
  "content/locations/roof-restoration-braeside.json",
  "content/locations/roof-restoration-beaumaris.json",
  "content/locations/roof-restoration-blairgowrie.json",
  "content/locations/roof-restoration-hampton.json",
  "content/locations/roof-restoration-dromana.json",
  "content/locations/roof-restoration-portsea.json",
  "content/locations/roof-restoration-clayton.json",
];

let phoneFixed = 0;
for (const rel of phoneFiles) {
  const full = path.join(ROOT, rel);
  let raw = fs.readFileSync(full, "utf8");
  const before = raw;
  raw = raw.split(WRONG_TEL).join(RIGHT_TEL).split(WRONG).join(RIGHT);
  if (raw !== before) {
    // validate it's still valid JSON before writing
    JSON.parse(raw);
    fs.writeFileSync(full, raw);
    phoneFixed++;
    console.log(`  phone fixed: ${rel}`);
  }
}
console.log(`Phone typo fixed in ${phoneFixed} files.\n`);

// ---- B. seoTitle / seoDescription / title optimisation ----
// title (=H1) only changed where it cleans up bad formatting.
const metaEdits = {
  "content/services/roof-painting.json": {
    seoTitle: "Roof Painting Melbourne",
  },
  "content/services/colorbond-roofing.json": {
    title: "COLORBOND® Steel Roofing",
    seoTitle: "COLORBOND® Roofing Melbourne",
    seoDescription:
      "COLORBOND® steel roofing in Melbourne. Durable, low-maintenance colour roofing for re-roofs and new builds. Call Sandhurst Roofing on 0448 812 800.",
  },
  "content/services/rebedding-repointing.json": {
    seoTitle: "Roof Repointing Melbourne",
    seoDescription:
      "Roof repointing and rebedding in Melbourne. Re-secure loose ridge caps and stop leaks with fresh flexible pointing. Call Sandhurst Roofing on 0448 812 800.",
  },
  "content/services/asbestos-roof-removal-and-replacement.json": {
    seoTitle: "Asbestos Roof Removal Melbourne",
  },
  "content/services/re-roofing.json": {
    seoTitle: "Re-Roofing & Roof Replacement",
    seoDescription:
      "Re-roofing and full roof replacement across Melbourne. 30+ years replacing tired tile and metal roofs in COLORBOND® steel. Call us on 0448 812 800.",
  },
};

for (const [rel, edits] of Object.entries(metaEdits)) {
  const full = path.join(ROOT, rel);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  for (const [k, v] of Object.entries(edits)) json[k] = v;
  fs.writeFileSync(full, JSON.stringify(json, null, 2));
  const st = edits.seoTitle ?? json.seoTitle;
  const sd = edits.seoDescription ?? json.seoDescription ?? "";
  console.log(
    `  ${path.basename(rel).padEnd(42)} seoTitle[${st.length}+20=${st.length + 20}]  desc[${sd.length}]`
  );
}
console.log("\nPhase 1 complete.");
