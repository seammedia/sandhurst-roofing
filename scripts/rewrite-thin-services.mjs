// Rebuild the genuinely thin service pages with specific, useful content +
// FAQ sections (which now emit FAQPage schema). Differentiates the two
// near-duplicate gutter pages to avoid keyword cannibalisation:
//   guttering          -> overview hub ("guttering melbourne")
//   gutter-replacement -> deep on replacement ("gutter replacement melbourne")
//   rebedding-repointing -> deep on repointing ("roof repointing")
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "services");
const PHONE = '<a href="tel:0448812800"><strong>0448 812 800</strong></a>';
const cta = (label = "Get a Free Quote!") => `<a href="/contact/" class="btn">${label}</a>`;
const img = (src, alt, w, h) =>
  `<img src="${src}" alt="${alt}" width="${w}" height="${h}" loading="lazy">`;

const reviewsGutter = `<h2 style="text-align: center;"><strong><span style="color: #ffffff;">What Our Customers Say</span></strong></h2>\n<blockquote><p>Wonderful service. Prompt and professional. Highly recommended and thank you Steve.</p><cite>Samantha Shaw</cite></blockquote>★★★★★\n<blockquote><p>Best service ever. Great team and a trouble free experience. Give these guys a go. Brilliant.</p><cite>Steve Wood</cite></blockquote>★★★★★\n<a href="/reviews/" class="btn">View All Reviews</a>`;

const reviewsTile = `<h2 style="text-align: center;"><strong><span style="color: #ffffff;">What Our Customers Say</span></strong></h2>\n<blockquote><p>Matt and his guys did a great job restoring our tile roof. Great communication from start to finish. Great result and very reasonable price.</p><cite>Ben Prout</cite></blockquote>★★★★★\n<blockquote><p>An excellent job with dedicated staff. Steve was most helpful and assisted where possible.</p><cite>Steve Perera</cite></blockquote>★★★★★\n<a href="/reviews/" class="btn">View All Reviews</a>`;

// Gutter photos (real, with correct dimensions).
const GP1 = img("/images/wp/2018/07/guttering-pic5-e1532576013787.jpg", "New COLORBOND steel gutters installed by Sandhurst Roofing", 539, 360);
const GP2 = img("/images/wp/2018/07/guttering-pic2-e1532576127740.png", "Replacement guttering and downpipes by Sandhurst Roofing", 995, 710);
const GP3 = img("/images/wp/2018/08/IMG_2709.png", "New gutters and fascia capping by Sandhurst Roofing", 605, 448);
const GP4 = img("/images/wp/2019/01/Dark-gutter-and-downpipe-e1548293342200.png", "Dark COLORBOND gutter and downpipe installation", 510, 382);
const TP1 = img("/images/wp/2020/04/terracotta-tile-roof-restoration-pic-2-e1588148123494.jpg", "Re-bedded and re-pointed terracotta tile roof ridge capping", 271, 128);
const TP2 = img("/images/wp/2020/04/terracotta-tile-roof-restoration-pic-8-e1588148167519.jpg", "Flexible pointing on restored tile roof ridge line", 268, 128);

const PAGES = {};

// ---------------- gutter-replacement (priority: 5.2k imp @ 26) -------------
PAGES["gutter-replacement.json"] = {
  seoTitle: "Gutter Replacement Melbourne",
  seoDescription:
    "Gutter replacement in Melbourne. We remove old, rusted gutters and install new COLORBOND® steel guttering, downpipes and fascia. Call 0448 812 800.",
  content: `
<h2><strong>Gutter Replacement Melbourne</strong></h2>
<p>Old, rusted or sagging gutters stop doing their job, and once water spills behind them it rots fascia, stains walls and finds its way into your roof. Sandhurst Roofing replaces worn-out guttering across Melbourne's south-east, bayside and the Mornington Peninsula with new COLORBOND® steel. Call Steve on ${PHONE} for honest advice and a competitive, fixed quote.</p>
${GP1}${GP2}${cta()}
<h2><strong>Signs It's Time to Replace Your Gutters</strong></h2>
<p>A repair will fix a small problem, but once gutters reach the end of their life a full replacement is the cheaper option over time. We recommend replacement when we see:</p>
<ul>
<li>Rust holes, flaking paint or rust staining down the fascia and walls</li>
<li>Gutters sagging or pulling away from the roofline</li>
<li>Water overflowing the front edge every time it rains, even when the gutters are clear</li>
<li>Cracked or split seams and joints that keep leaking after repair</li>
<li>Rotten or soft timber fascia behind the gutter</li>
<li>Several patched sections along an ageing run, where one more repair is throwing good money after bad</li>
</ul>
${GP3}
<h2><strong>Our Gutter Replacement Process</strong></h2>
<p>Every job starts with an on-site inspection so we can measure up, check the fascia and downpipe layout, and quote accurately. From there we:</p>
<ul>
<li>Remove the old guttering cleanly and take it away, with no mess left behind</li>
<li>Check and, where needed, replace or cap rotten fascia so the new gutter has a sound fixing</li>
<li>Install new COLORBOND® steel gutters set to the correct fall so water runs to the downpipes</li>
<li>Fit or replace downpipes and connect them to your stormwater</li>
<li>Test the run and clean up before we leave</li>
</ul>
${GP4}${cta()}
<h2><strong>COLORBOND® Steel Gutters &amp; Colours</strong></h2>
<p>We replace gutters in COLORBOND® steel because it stands up to Melbourne's weather far better than old galvanised guttering and lasts for years. It comes in the full COLORBOND® range, so we can match your gutters to your roof, fascia and downpipes. See the <a href="https://sandhurstroofing.com.au/colorbond-colour-chart/">COLORBOND® colour chart</a> for the options, and our <a href="https://sandhurstroofing.com.au/colorbond-roofing/">COLORBOND® roofing</a> page if you are updating the roof at the same time.</p>
<h2><strong>What Affects the Cost of Gutter Replacement</strong></h2>
<p>No two homes are the same, so we always quote on the actual job. The main things that affect the price are:</p>
<ul>
<li>The total length of guttering and number of downpipes</li>
<li>Single or double storey, and how easy the roof is to access</li>
<li>The gutter profile (quad, half-round, fascia or box gutter)</li>
<li>Whether any fascia needs replacing or capping</li>
<li>Removal and disposal of the old guttering</li>
</ul>
<p>We give you a clear, fixed price up front so there are no surprises.</p>
<h2><strong>Gutter Replacement FAQs</strong></h2>
<h3>How long does a gutter replacement take?</h3>
<p>Most homes are done in a single day. Larger or two-storey homes, or jobs that include fascia replacement, can take a little longer. We give you a timeframe when we quote.</p>
<h3>Can you replace just the gutters, or the fascia too?</h3>
<p>Both. If the timber fascia behind the gutter has rotted we can replace it or cap it in COLORBOND® so the new guttering has a sound, long-lasting fixing.</p>
<h3>Should I repair or replace my gutters?</h3>
<p>If the guttering is sound and the problem is a single leak or blockage, a repair is fine. Once there is widespread rust, sagging or repeated leaks, replacement is the better value. We will give you an honest recommendation.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes. Every quote is free and without obligation. Call Steve on ${PHONE}.</p>
${reviewsGutter}
<h2><strong>Replace Your Gutters with Sandhurst Roofing</strong></h2>
<p>For gutter replacement anywhere across Melbourne's south-east and the Peninsula, call Steve on ${PHONE} or fill out the form below for your free quote. If you only need a repair, see our <a href="https://sandhurstroofing.com.au/gutter-repairs/">gutter repairs</a> page.</p>
${cta()}`,
};

// ---------------- guttering (overview hub) -------------------------------
PAGES["guttering.json"] = {
  seoTitle: "Guttering Melbourne",
  seoDescription:
    "Guttering Melbourne: new gutter installation, downpipes and fascia in COLORBOND® steel, plus repairs and replacement. Call us on 0448 812 800.",
  content: `
<h2><strong>Guttering Melbourne</strong></h2>
<p>Your gutters, downpipes and fascia carry water away from your home and protect it from leaks, rot and damp. Sandhurst Roofing installs, repairs and replaces guttering across Melbourne's south-east, bayside and the Mornington Peninsula, all in durable COLORBOND® steel. Call Steve on ${PHONE} for advice and a competitive quote.</p>
${GP1}${GP2}${cta()}
<h2><strong>Our Guttering Services</strong></h2>
<p>We handle every part of your roof's drainage, whether it is a new home, an extension or an ageing system that needs work:</p>
<ul>
<li><strong>New gutter installation</strong> for new builds, extensions and pergolas</li>
<li><strong><a href="https://sandhurstroofing.com.au/gutter-replacement/">Gutter replacement</a></strong> when old guttering has rusted or worn out</li>
<li><strong><a href="https://sandhurstroofing.com.au/gutter-repairs/">Gutter repairs</a></strong> for leaks, sagging, blockages and split joints</li>
<li><strong>Downpipes</strong> sized and connected to your stormwater</li>
<li><strong>Fascia</strong> repair, replacement and COLORBOND® capping</li>
</ul>
${GP3}
<h2><strong>Why Guttering Matters</strong></h2>
<p>When gutters fail, water does not just run to waste. It overflows behind the fascia, pools against the footings and works its way into the eaves and roof cavity, leading to leaks, mould, rotten timber and staining. Well-fitted guttering set to the right fall keeps that water moving safely to the downpipes and away from the structure of your home, and it tidies up the look of the roofline at the same time.</p>
${GP4}${cta()}
<h2><strong>COLORBOND® Steel Guttering</strong></h2>
<p>We use COLORBOND® steel for guttering and downpipes because it is tough, low-maintenance and lasts for years in Melbourne's conditions. It comes in the full colour range, so your gutters can match or complement your roof and fascia. See the <a href="https://sandhurstroofing.com.au/colorbond-colour-chart/">COLORBOND® colour chart</a> for the options.</p>
<h2><strong>Guttering FAQs</strong></h2>
<h3>What gutter material do you use?</h3>
<p>We install COLORBOND® steel guttering and downpipes, which resist rust and last far longer than older galvanised systems, in a colour to suit your home.</p>
<h3>Do you install gutter guard or leaf protection?</h3>
<p>Yes, we can fit gutter guard, which is well worth considering if your home backs onto trees and you are constantly clearing leaves from the gutters.</p>
<h3>Do you do both installation and repairs?</h3>
<p>Yes. We install new guttering, replace worn-out systems and carry out repairs. If you are not sure which you need, we will inspect and give you an honest recommendation.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on ${PHONE}.</p>
${reviewsGutter}
<h2><strong>Specialists in Gutters, Downpipes &amp; Fascia</strong></h2>
<p>For any guttering enquiry across Melbourne's south-east and the Peninsula, call Steve on ${PHONE} or fill out the form below and we will be in touch shortly.</p>
${cta()}`,
};

// ---------------- rebedding-repointing (5.4k imp @ 26 "roof repointing") ----
PAGES["rebedding-repointing.json"] = {
  seoTitle: "Roof Repointing Melbourne",
  seoDescription:
    "Roof repointing and rebedding in Melbourne. Re-secure loose ridge caps and stop leaks with fresh flexible pointing. Call Sandhurst Roofing on 0448 812 800.",
  content: `
<h2><strong>Roof Repointing &amp; Rebedding Melbourne</strong></h2>
<p>The ridge caps along the top and edges of a tiled roof are held in place by bedding and sealed with pointing. Over time that mortar cracks and crumbles, the caps work loose and the roof starts to leak. Sandhurst Roofing re-beds and re-points tiled roofs across Melbourne's south-east, bayside and the Mornington Peninsula. Call Steve on ${PHONE} for expert advice and a competitive quote.</p>
${TP1}${TP2}${cta()}
<h2><strong>What Are Rebedding and Repointing?</strong></h2>
<p>They are two related parts of the same job on a tiled roof:</p>
<ul>
<li><strong>Bedding</strong> is the mortar bed the ridge caps sit on, along the ridge lines, hips and gable ends. <strong>Rebedding</strong> means lifting the caps and laying a fresh mortar bed where the old one has failed.</li>
<li><strong>Pointing</strong> is the layer over the bedding that seals and finishes the caps. <strong>Repointing</strong> means applying fresh flexible pointing over sound bedding to re-secure the caps and seal out water.</li>
</ul>
<p>If the bedding is still solid we can often repoint over it. If the bedding itself has broken down, the caps need rebedding first, then repointing.</p>
<h2><strong>Signs Your Roof Needs Repointing</strong></h2>
<ul>
<li>Cracked, crumbling or missing mortar along the ridge caps</li>
<li>Loose or slipped ridge caps, or caps you can rock by hand</li>
<li>Bits of grey mortar washing into the gutters</li>
<li>Leaks or damp patches in the ceiling below a ridge line</li>
<li>A roof that is otherwise sound but looks tired along the ridges</li>
</ul>
${cta()}
<h2><strong>Why Use Flexible Pointing</strong></h2>
<p>We finish with flexible pointing rather than old-style cement mortar. A tiled roof moves and expands with heat and weather, and rigid cement cracks again as it flexes. Flexible pointing moves with the roof, so it stays watertight far longer and is the standard for quality repointing work. It also comes in a range of colours to suit your roof.</p>
<h2><strong>Repointing as Part of a Roof Restoration</strong></h2>
<p>Repointing is often done on its own to stop a leak, but it is also a core part of a full <a href="https://sandhurstroofing.com.au/roof-restoration/">roof restoration</a>, alongside cleaning, repairs and re-coating. If your whole roof is tired, ask us about restoration. If you just have a leak or loose caps, repointing on its own may be all you need. We also handle general <a href="https://sandhurstroofing.com.au/roof-repairs/">roof repairs</a>.</p>
<h2><strong>Roof Repointing FAQs</strong></h2>
<h3>What is the difference between rebedding and repointing?</h3>
<p>Rebedding re-lays the mortar bed the ridge caps sit on. Repointing applies fresh flexible pointing over the top to re-secure and seal the caps. If the bedding is sound we can repoint over it; if it has failed, the caps are rebedded first.</p>
<h3>How long does repointing last?</h3>
<p>Quality flexible pointing on a sound roof typically lasts many years, far longer than old rigid cement, because it moves with the roof instead of cracking.</p>
<h3>Will repointing stop my roof leaking?</h3>
<p>If the leak is coming from failed pointing or loose ridge caps, yes. If it is caused by cracked tiles or flashing, we will identify that during the inspection and sort it as part of the repair.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on ${PHONE}.</p>
${reviewsTile}
<h2><strong>Book Roof Repointing with Sandhurst Roofing</strong></h2>
<p>For roof repointing and rebedding across Melbourne's south-east, bayside and the Peninsula, call Steve on ${PHONE} or fill out the form below for a free quote.</p>
${cta()}`,
};

// ---- write loop ----
let n = 0;
for (const [file, data] of Object.entries(PAGES)) {
  const full = path.join(DIR, file);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  json.content = data.content.replace(/\n{2,}/g, "\n").trim();
  json.seoTitle = data.seoTitle;
  json.seoDescription = data.seoDescription;
  fs.writeFileSync(full, JSON.stringify(json, null, 2));
  const wc = json.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
  const h2 = (json.content.match(/<h2/g) || []).length;
  const h3 = (json.content.match(/<h3/g) || []).length;
  console.log(`✓ ${file.padEnd(26)} ${String(wc).padStart(4)}w  ${h2}h2 ${h3}h3  seoT[${data.seoTitle.length}+20=${data.seoTitle.length + 20}]  desc[${data.seoDescription.length}]`);
  n++;
}
console.log(`\nRebuilt ${n} thin service pages.`);
