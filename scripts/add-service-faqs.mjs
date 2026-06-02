// Insert tailored FAQ sections (h3/p format -> FAQPage schema) into head-term
// service pages that currently have none, targeting real question/cost queries.
// Low-risk: inserts before the existing reviews block, leaves other content intact.
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "services");
const PHONE = '<a href="tel:0448812800"><strong>0448 812 800</strong></a>';
const REVIEWS_ANCHOR =
  '<h2 style="text-align: center;"><strong><span style="color: #ffffff;">What Our Customers Say</span></strong></h2>';

const FAQS = {
  "colorbond-roofing.json": `<h2><strong>COLORBOND® Roofing FAQs</strong></h2>
<h3>How long does a COLORBOND® steel roof last?</h3>
<p>Looked after, a COLORBOND® steel roof lasts for decades. The steel is tested in harsh Australian conditions and needs very little maintenance compared with an older tiled roof.</p>
<h3>Can you replace my tile roof with COLORBOND® steel?</h3>
<p>Yes. A <a href="https://sandhurstroofing.com.au/tile-to-tin-roof/">tile-to-tin conversion</a> swaps heavy tiles for lightweight COLORBOND® steel, which reduces the load on your home and gives you a fresh, modern roof.</p>
<h3>How much does a COLORBOND® roof cost?</h3>
<p>It depends on the size and pitch of the roof, how easy it is to access, and whether the old roof needs removing. We quote on the actual job. See our <a href="https://sandhurstroofing.com.au/blog/colorbond-roof-painting-cost/">COLORBOND® cost guide</a> or call ${PHONE} for a free quote.</p>
<h3>What colours are available?</h3>
<p>The full COLORBOND® range of 22 colours. Use our <a href="https://sandhurstroofing.com.au/colorbond-colour-chart/">colour chart</a> to find one that suits your home.</p>`,

  "roof-repairs.json": `<h2><strong>Roof Repair FAQs</strong></h2>
<h3>What roof repairs do you do?</h3>
<p>We handle tile replacement, ridge cap repairs, repointing and re-bedding, valley and flashing repairs, leaks, storm damage, and replacing rusted sheets on metal roofs.</p>
<h3>Can you fix a leaking roof?</h3>
<p>Yes. We trace the leak back to its real source, usually a cracked tile, failed pointing or a worn flashing, and fix it properly rather than just patching the ceiling. See our guide to the <a href="https://sandhurstroofing.com.au/blog/5-most-common-causes-for-a-leaking-roof/">most common causes of a leaking roof</a>.</p>
<h3>Do you repair both tile and metal roofs?</h3>
<p>Yes, we repair concrete and terracotta tile roofs as well as COLORBOND® and other metal roofs.</p>
<h3>Should I repair or restore my roof?</h3>
<p>If the roof is otherwise sound and the problem is localised, a repair is all you need. If it is tired across the whole roof, a <a href="https://sandhurstroofing.com.au/roof-restoration/">restoration</a> may be better value. We will give you an honest recommendation.</p>`,

  "roof-painting.json": `<h2><strong>Roof Painting FAQs</strong></h2>
<h3>How much does it cost to paint a roof?</h3>
<p>It depends on the size and condition of the roof, how easy it is to access, and any repairs needed first. We quote on the actual job. See our <a href="https://sandhurstroofing.com.au/blog/how-much-does-it-cost-to-paint-a-roof/">roof painting cost guide</a> or call ${PHONE} for a free quote.</p>
<h3>Can you paint a COLORBOND® roof?</h3>
<p>Yes. A faded COLORBOND® or metal roof can be re-coated to look like new, in the same colour or a fresh one from the <a href="https://sandhurstroofing.com.au/colorbond-colour-chart/">COLORBOND® range</a>. It is not a safe DIY job, so leave it to the team.</p>
<h3>How long does roof painting last?</h3>
<p>A quality multi-coat roof paint system on a sound, properly prepared roof lasts many years and protects the roof while it does, far cheaper than a full replacement.</p>
<h3>Can you paint both tile and metal roofs?</h3>
<p>Yes, we paint concrete and terracotta tile roofs as well as COLORBOND® and other metal roofs, with colours that can also match your gutters, fascia and walls.</p>`,
};

let n = 0;
for (const [file, faq] of Object.entries(FAQS)) {
  const full = path.join(DIR, file);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  if (!json.content.includes(REVIEWS_ANCHOR)) {
    console.log(`! ${file}: reviews anchor not found, skipped`);
    continue;
  }
  if (/Roofing FAQs|Roof Repair FAQs|Roof Painting FAQs/.test(json.content)) {
    console.log(`= ${file}: FAQ already present, skipped`);
    continue;
  }
  json.content = json.content.replace(REVIEWS_ANCHOR, `${faq}\n${REVIEWS_ANCHOR}`);
  fs.writeFileSync(full, JSON.stringify(json, null, 2));
  const wc = json.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
  const h3 = (json.content.match(/<h3/g) || []).length;
  console.log(`✓ ${file.padEnd(22)} now ${wc}w, ${h3} h3 (FAQ added)`);
  n++;
}
console.log(`\nAdded FAQ sections to ${n} service pages.`);
