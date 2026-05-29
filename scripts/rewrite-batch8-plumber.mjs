// Batch 8 (final): rewrite the 4 roof-plumber cluster pages with unique,
// plumbing-focused suburb copy. Different skeleton to the restoration build():
// gutters, downpipes, fascia, leaks, flashings, valleys, box gutters, storm.
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "locations");

const PHONE = '<a href="tel:0448812800"><strong>0448 812 800</strong></a>';
const cta = (label = "Get a Free Quote!") => `<a href="/contact/" class="btn">${label}</a>`;
const imgD = (src, alt, w, h) =>
  `<img src="${src}" alt="${alt}" width="${w}" height="${h}" loading="lazy">`;

// Real, gutter/roof-plumbing-specific testimonials already published on the
// plumber pages. Preserved verbatim (white-text styling intact).
const reviewsSuburb = (s) => `\n<h2 style="text-align: center;"><strong><span style="color: #ffffff;">What Our ${s} Roof Plumbing Customers Say</span></strong></h2>\n<blockquote><p>Steve and his team did a fabulous job, I was away working whilst the work was in process, but saw the progress for each of the first two days in the evening and on the third day the final touches were done. The work looks first rate and all of the old gutter was removed very neatly without any drama or mess. It was a pleasure to deal with Steve who was very friendly and accommodating, plus the price was considerably cheaper than that quoted by a rival company. I'm now just waiting for it to rain!</p><cite>Kim C</cite></blockquote>★★★★★\n<blockquote><p>Just wanted to say a massive thank you for all you outstanding work regarding our roof. What a tremendous team you are, professional in every single way, which is extremely rare these days. Right from the start, I knew that your company was the right company to go with due to your professionalism, constant communication and keeping us in the loop every step of the way. We will certainly be highly recommending your company and have already done so.</p><cite>Kaz Howard &amp; Tony Orchard</cite></blockquote>★★★★★\n<a href="/reviews/" class="btn">View All Reviews</a>`;

const reviewsNearMe = `\n<h2 style="text-align: center;"><strong><span style="color: #ffffff;">What Our Roof Plumbing Customers Say</span></strong></h2>\n<blockquote><p>Wonderful service. Prompt and professional. Highly recommended and thank you Steve.</p><cite>Samantha Shaw</cite></blockquote>★★★★★\n<blockquote><p>Best service ever. Great team and a trouble free experience. Give these guys a go. Brilliant.</p><cite>Steve Wood</cite></blockquote>★★★★★\n<a href="/reviews/" class="btn">View All Reviews</a>`;

const QUOTE = (s) =>
  `<h2><strong>Get a Free Roof Plumbing Quote in ${s}</strong></h2>\n<p>Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below for your free ${s} roof plumbing quote. We will explain exactly what needs doing and give you an honest, fixed price before any work starts.</p>\n${cta()}`;

// Shared images for the three suburb plumber pages.
const G1 = imgD("/images/wp/2020/07/mornington-gutters-in-monument-pic-1.jpg", "New COLORBOND gutters in Monument installed by Sandhurst Roofing", 960, 443);
const G2 = imgD("/images/wp/2020/07/mornington-gutters-in-monument-pic-2.jpg", "Replacement guttering and fascia capping by Sandhurst Roofing", 960, 443);
const G3 = imgD("/images/wp/2019/01/Dark-gutter-and-downpipe-e1548293342200.png", "Dark COLORBOND gutter and downpipe installation", 510, 382);

// Roof plumber suburb-page skeleton (10 body H2s + template CTA H2 = 11).
function build(s, p) {
  return `
<h2><strong>Roof Plumbing Services in ${s}</strong></h2>\n${p.intro}\n${G1}\n${cta()}
<h2><strong>Common Roof Plumbing Problems We See in ${s}</strong></h2>\n${p.common}\n${G2}
<h2><strong>Gutters, Downpipes &amp; Fascia in ${s}</strong></h2>\n${p.gutters}
<h2><strong>Roof Leaks, Flashings &amp; Valley Repairs in ${s}</strong></h2>\n${p.leaks}\n${G3}
<h2><strong>Box Gutters &amp; Rainwater Systems in ${s}</strong></h2>\n${p.box}
<h2><strong>Storm Damage &amp; Emergency Roof Plumbing in ${s}</strong></h2>\n${p.storm}
<h2><strong>Why ${s} Locals Choose Sandhurst Roofing</strong></h2>\n${p.why}\n${reviewsSuburb(s)}
<h2><strong>${s} Roof Plumbing FAQs</strong></h2>\n${p.faqs}
<h2><strong>Suburbs We Service Near ${s}</strong></h2>\n${p.nearby}
${QUOTE(s)}`;
}

// Standard licensed-plumber paragraph reused (slightly varied per page intro).
const licensed = `Every job is carried out by a registered, fully licensed and insured roof plumber, so you have peace of mind that the work meets Australian Standards and is done right the first time.`;

// ----- Per-page content -----------------------------------------------------
const PAGES = [];

// ---- Berwick: established leafy township + newer estates, mature trees ----
PAGES.push({
  slug: "roof-plumber-berwick",
  seoTitle: "Roof Plumber & Gutters Berwick",
  seoDescription: "Need a roof plumber in Berwick? Sandhurst Roofing handles gutters, downpipes, leaks, flashings and storm repairs. Call Steve on 0448 812 800.",
  build: (s) => build(s, {
    intro: `<p>Looking for a reliable roof plumber in ${s}? Sandhurst Roofing is a family-owned and operated business with over 30 years of experience looking after roofs right across Melbourne's south-east. From leaking gutters and broken downpipes to flashing repairs and full rainwater systems, our team handles every part of your roof's drainage. ${licensed}</p>\n<p>${s} is a mix of established homes around the old village and a growing number of newer estates, and each comes with its own plumbing needs. Whatever the age of your home, we will find the solution that suits it best and give you honest advice along the way.</p>`,
    common: `<p>The most common issue we are called out for in ${s} is overflowing or blocked gutters. The suburb's mature gum trees and elms drop a steady load of leaves and seed, and that debris quickly clogs gutters and valleys, especially on the older streets near Berwick village. Once water cannot drain away it backs up under the tiles and into the eaves.</p>\n<p>On period and post-war homes we also see rusted-out quad gutters, perished downpipe joints and timber fascia that has started to rot where old guttering has been leaking for years. On the newer estate homes the problems are usually poorly sealed joints, undersized downpipes or storm-related damage rather than age.</p>`,
    gutters: `<p>Gutters, downpipes and fascia are the backbone of your roof's drainage, carrying water away from the structure to prevent leaks, sagging, rot and mould. We repair and replace all of these using COLORBOND® steel, one of the most durable materials available, so your new guttering does its job well and lasts for decades.</p>\n<p>Whether you need a single damaged section replaced, new fascia capping to protect timber, or a complete re-gutter with matching downpipes, we will quote it clearly and finish the job neatly. We remove the old guttering cleanly and leave no mess behind.</p>`,
    leaks: `<p>A roof leak in ${s} rarely starts where the water shows up inside. More often the real cause is failed flashing around a chimney, skylight or wall abutment, or a valley that has rusted or filled with debris. Our roof plumbers trace the leak back to its source rather than just patching the ceiling stain.</p>\n<p>We re-seal and replace flashings, clear and reline valleys, and re-bed and repoint ridge capping where water is getting in. Catching a leak early saves you from far more expensive timber and plaster repairs down the track.</p>`,
    box: `<p>Many of the larger and two-storey homes in ${s} have box gutters or internal gutters, which need careful sizing and fall to work properly. When they overflow the water goes straight inside, so we make sure box gutters, rainheads and overflow points are correct and free-flowing.</p>\n<p>We also connect and repair rainwater tank systems, charged downpipes and stormwater connections, so the water your roof collects ends up where it should rather than pooling against your home's footings.</p>`,
    storm: `<p>Melbourne's south-east cops its share of heavy storms, and ${s}'s tree-lined streets mean branches and debris often come down with them. After a storm we are regularly called out for dislodged tiles, torn flashings, fallen downpipes and gutters that have been overwhelmed by sudden downpours.</p>\n<p>If you have water coming in, call us as soon as you can. We will make your roof safe and watertight quickly, then talk you through any permanent repairs needed once the weather clears.</p>`,
    why: `<p>${s} locals choose Sandhurst Roofing because we turn up when we say we will, do quality work and charge a fair, competitive price. We are a registered roofing and roof plumbing business, fully licensed and insured, and we take the time to explain what is happening every step of the way.</p>\n<p>From the first call to the final clean-up, you deal with a team that genuinely cares about getting your roof right.</p>`,
    faqs: `<p><strong>Do I need a licensed roof plumber for gutter work in ${s}?</strong><br>Yes. Roof plumbing, including guttering, downpipes and rainwater systems, must be carried out by a registered roof plumber to meet Australian Standards. Every Sandhurst Roofing tradesperson is fully licensed.</p>\n<p><strong>How often should gutters be cleaned in ${s}?</strong><br>With ${s}'s mature trees we recommend at least twice a year, and more often if you back onto bushland. Regular cleaning prevents the overflow and rust that lead to bigger repairs.</p>\n<p><strong>Can you match my existing gutter colour?</strong><br>Yes. We work in the full COLORBOND® range and will match new guttering and downpipes to your home's existing colours wherever possible.</p>`,
    nearby: `<p>As well as ${s} we provide roof plumbing services across the south-east, including <a href="https://sandhurstroofing.com.au/roof-plumber-cranbourne/">Cranbourne</a> and <a href="https://sandhurstroofing.com.au/roof-plumber-frankston/">Frankston</a>, plus nearby suburbs such as Beaconsfield, Officer, Pakenham and Narre Warren. If you are searching for a <a href="https://sandhurstroofing.com.au/roof-plumber-near-me/">roof plumber near me</a>, we have you covered.</p>`,
  }),
});

// ---- Cranbourne: flat sandy Casey growth corridor, estates + tanks ----
PAGES.push({
  slug: "roof-plumber-cranbourne",
  seoTitle: "Roof Plumber & Gutters Cranbourne",
  seoDescription: "Roof plumber in Cranbourne for gutters, downpipes, leaks, rainwater tanks and storm repairs. Reliable and fully licensed. Call 0448 812 800.",
  build: (s) => build(s, {
    intro: `<p>Searching for a qualified roof plumber in ${s}? Sandhurst Roofing has a team of experienced, fully certified roof plumbers who handle every part of your roof's drainage, from gutter and downpipe repairs to connecting rainwater tanks and fixing stubborn leaks. ${licensed}</p>\n<p>${s} has grown quickly, with large new estates sitting alongside the older township. New homes come with COLORBOND® guttering and rainwater tanks, while the established streets often have ageing gutters that are due for replacement. We look after both.</p>`,
    common: `<p>Because ${s} sits on flat, low-lying ground, drainage really matters here. The most common call-outs are gutters and downpipes that cannot move water away fast enough during heavy rain, leading to overflow against the house and pooling in the yard.</p>\n<p>${s} also sits in Melbourne's south-east hail belt, so we regularly repair gutters dented or split by hail and storms. On older township homes we see rusted eaves gutters and perished downpipes, while on newer builds the issues are usually undersized or poorly connected stormwater and tank plumbing.</p>`,
    gutters: `<p>Your gutters, downpipes and fascia carry water away from the structure of your home, preventing leaks, rot, sagging and mould. We repair and replace all of them in durable COLORBOND® steel so they keep doing their job for years to come, even under ${s}'s strong summer sun.</p>\n<p>From replacing a hail-damaged run of guttering to fitting larger downpipes that cope with sudden downpours, we engineer a solution that fits your home and your budget, and we leave the site clean when we are done.</p>`,
    leaks: `<p>When a ${s} home springs a leak, the cause is often a failed flashing, a rusted valley or a downpipe that has come away rather than the roof sheets themselves. Our roof plumbers track the water back to its true source and fix it properly.</p>\n<p>We re-seal flashings around vents, skylights and walls, clear and replace valleys, and re-point ridge capping on tiled roofs. Sorting a small leak early is far cheaper than repairing water-damaged ceilings and insulation later on.</p>`,
    box: `<p>Many newer ${s} homes are built with rainwater tanks plumbed into the roof drainage, which is now standard on a lot of estate builds. We install, connect and repair tank systems, charged downpipes and stormwater connections so your collected water is used and drained correctly.</p>\n<p>On larger and commercial-style buildings we also handle box gutters and rainheads, making sure they are correctly sized and have the right fall so they never overflow inside.</p>`,
    storm: `<p>Storms and hail are a fact of life in ${s}, and they take a heavy toll on gutters and downpipes. After a storm we are called out for dented and split guttering, blocked downpipes, dislodged tiles and water coming in around damaged flashings.</p>\n<p>If your roof is leaking after a storm, give us a call. We will make it safe and watertight quickly, then walk you through the permanent repairs and help with insurance documentation where needed.</p>`,
    why: `<p>${s} locals choose Sandhurst Roofing because we are reliable, punctual and efficient, and we treat your home with respect. We are a family-owned business that is fully licensed and insured, and every roof plumber on our team is registered.</p>\n<p>We give honest advice and a clear, competitive quote, so you always know what is happening and what it will cost before we start.</p>`,
    faqs: `<p><strong>Are rainwater tanks required on new homes in ${s}?</strong><br>Many new builds in the area include a rainwater tank plumbed into the roof drainage. We install and connect tank systems and make sure they meet plumbing requirements.</p>\n<p><strong>Can you repair hail-damaged gutters?</strong><br>Yes. Hail damage is common in ${s}. We repair or replace dented and split guttering and can document the damage for insurance claims.</p>\n<p><strong>How quickly can you come out?</strong><br>We aim to respond promptly, and for leaks and storm damage we prioritise getting your roof watertight as fast as we can. Call ${PHONE} to arrange a visit.</p>`,
    nearby: `<p>Beyond ${s} we look after roof plumbing across the south-east, including <a href="https://sandhurstroofing.com.au/roof-plumber-berwick/">Berwick</a> and <a href="https://sandhurstroofing.com.au/roof-plumber-frankston/">Frankston</a>, plus surrounding suburbs such as Clyde, Cranbourne East, Lynbrook, Lyndhurst and Pakenham. If you are looking for a <a href="https://sandhurstroofing.com.au/roof-plumber-near-me/">roof plumber near me</a>, we are local to you.</p>`,
  }),
});

// ---- Frankston: bayside, salt-laden air, post-war homes ----
PAGES.push({
  slug: "roof-plumber-frankston",
  seoTitle: "Roof Plumber & Gutters Frankston",
  seoDescription: "Roof plumber in Frankston for gutters, downpipes, leaks and storm repairs. We'll have your roof plumbing sorted fast. Call 0448 812 800 today.",
  build: (s) => build(s, {
    intro: `<p>Need a roof plumber in ${s}? Sandhurst Roofing has been sorting roof plumbing across the bayside and Mornington Peninsula for over 30 years. No job is too big or too small, from a single leaking downpipe to a full re-gutter, and we will have your roof plumbing sorted as soon as possible. ${licensed}</p>\n<p>Being right on the bay, ${s} homes face a constant battle with salt-laden air, which is hard on gutters, downpipes and metal fixings. We know exactly what the coast does to a roof and we build for it.</p>`,
    common: `<p>The biggest issue we see in ${s} is corrosion. The salt air off Port Phillip Bay eats away at older galvanised gutters, downpipes and fasteners, so we are regularly called out to replace guttering that has rusted through, often on the post-war and weatherboard homes the area is known for.</p>\n<p>We also see plenty of blocked and overflowing gutters, perished joints and leaks around flashings. In elevated Frankston South the exposure to wind-driven rain adds to the load, while the flatter coastal streets need downpipes and drainage that can shift water quickly.</p>`,
    gutters: `<p>Gutters, downpipes and fascia keep water away from your home, preventing leaks, rot, sagging and mould. In a coastal suburb like ${s} that job is even more important, so we replace old, rusted guttering with COLORBOND® steel, which stands up far better to the salt air and lasts for years.</p>\n<p>Whether it is replacing corroded quad gutters, fitting new fascia capping over rotted timber, or installing fresh downpipes, we do the job properly and clean up after ourselves so your home is left tidy.</p>`,
    leaks: `<p>Leaks in ${s} homes often trace back to failed flashings, rusted valleys or corroded gutters rather than the roof sheets. Our roof plumbers find the real source of the water before fixing it, so the leak is gone for good.</p>\n<p>We re-seal and replace flashings, clear and reline valleys, and on tiled roofs we re-bed and repoint ridge capping. With salt accelerating corrosion here, catching leaks early is especially important.</p>`,
    box: `<p>Some of the older and larger ${s} homes, along with commercial buildings, have box gutters that need the right size and fall to cope with heavy rain. We repair and reline box gutters, fit rainheads and overflows, and make sure water cannot back up inside.</p>\n<p>We also connect and repair rainwater tanks, charged downpipes and stormwater systems so the water from your roof is drained or stored correctly, well away from your footings.</p>`,
    storm: `<p>Bayside storms can be fierce, and ${s} gets the wind and rain straight off the water. After a storm we are called out for torn flashings, dislodged tiles, fallen downpipes and gutters overwhelmed by heavy rain.</p>\n<p>If water is getting into your home, call us straight away. We will make the roof safe and watertight quickly, then explain the permanent repairs needed once conditions allow.</p>`,
    why: `<p>${s} locals choose Sandhurst Roofing because we are quick to respond, do quality work and stand behind it. We are a family-owned, fully licensed and insured business, and every roof plumber on our team is registered.</p>\n<p>We give you honest advice, a competitive quote and clear communication from start to finish, so there are never any surprises.</p>`,
    faqs: `<p><strong>Why do gutters rust so quickly in ${s}?</strong><br>The salt-laden air off the bay accelerates corrosion, especially on older galvanised guttering. Replacing with COLORBOND® steel gives far better resistance and a much longer life.</p>\n<p><strong>Can you replace just the rusted section of gutter?</strong><br>Sometimes, but if the rest of the run is the same age it is often more cost-effective to replace it all at once. We will give you honest advice on the best option for your home.</p>\n<p><strong>Do you handle emergency leaks?</strong><br>Yes. For leaks and storm damage we prioritise getting your roof watertight as fast as possible. Call ${PHONE}.</p>`,
    nearby: `<p>As well as ${s} we provide roof plumbing across the bayside and south-east, including <a href="https://sandhurstroofing.com.au/roof-plumber-berwick/">Berwick</a> and <a href="https://sandhurstroofing.com.au/roof-plumber-cranbourne/">Cranbourne</a>, plus Frankston South, Seaford, Carrum Downs, Langwarrin and Karingal. Searching for a <a href="https://sandhurstroofing.com.au/roof-plumber-near-me/">roof plumber near me</a>? We are local to the whole area.</p>`,
  }),
});

// ---- Roof Plumber Near Me: Melbourne south-east + Peninsula hub page ----
const nearMeImgs = {
  i1: imgD("/images/wp/2023/03/re-roof-including-gutters-and-downpipes-roof-plumber-near-me.jpg", "Re-roof including new gutters and downpipes by Sandhurst Roofing", 450, 340),
  i2: imgD("/images/wp/2023/03/re-roof-frankston-including-new-gutters-roof-plumber-near-me.jpg", "Re-roof in Frankston including new gutters by Sandhurst Roofing", 450, 337),
  i3: imgD("/images/wp/2023/03/new-gutters-surfmist-roof-plumber-near-me-1.jpg", "New Surfmist COLORBOND gutters installed by Sandhurst Roofing", 912, 700),
  i4: imgD("/images/wp/2023/03/new-gutters-surfmist-roof-plumber-near-me-3.jpg", "New Surfmist COLORBOND guttering and downpipes by Sandhurst Roofing", 912, 700),
};

PAGES.push({
  slug: "roof-plumber-near-me",
  seoTitle: "Roof Plumber Near Me | Melbourne SE",
  seoDescription: "Roof plumber near me? Sandhurst Roofing covers Melbourne's south-east and the Peninsula for gutters, leaks and storm repairs. Call 0448 812 800.",
  build: () => {
    const im = nearMeImgs;
    return `
<h2><strong>Searching for a Roof Plumber Near Me?</strong></h2>\n<p>If you have typed "roof plumber near me" into Google, you are in the right place. Sandhurst Roofing is a family-owned and operated business with over 30 years of experience, providing qualified, fully licensed roof plumbers right across Melbourne's south-east and the Mornington Peninsula. Whether it is leaking gutters, broken downpipes, a roof leak or storm damage, we have the local team to sort it quickly.</p>\n${im.i1}\n${cta()}
<h2><strong>The Roof Plumbing Services We Provide</strong></h2>\n<p>Our roof plumbers handle every part of your roof's drainage system. That includes <a href="https://sandhurstroofing.com.au/guttering/">gutter</a> repairs and replacement, downpipes, fascia and eaves, flashings, valleys, box gutters, rainheads and rainwater tank connections. Every job is carried out by a registered roof plumber to Australian Standards, and we are fully licensed and insured.</p>\n<p>We also work alongside our <a href="https://sandhurstroofing.com.au/roof-repairs/">roof repair</a> and <a href="https://sandhurstroofing.com.au/roof-restoration/">restoration</a> teams, so if your drainage problem turns out to be part of a bigger roof issue, we can handle the lot.</p>
<h2><strong>Common Roof Plumbing Problems We Fix</strong></h2>\n<p>The most common reasons people search for a roof plumber are overflowing or blocked gutters, leaking downpipes, rusted-through guttering and roof leaks that show up as stains on the ceiling. Often the real cause is a failed flashing, a debris-filled valley or a downpipe that has come away, rather than the roof itself.</p>\n<p>Whatever the symptom, we trace it back to the source and fix it properly so the problem does not come straight back.</p>\n${im.i2}
<h2><strong>Gutters, Downpipes &amp; Fascia</strong></h2>\n<p>Your gutters, downpipes and fascia carry water away from your home, preventing leaks, rot, sagging and mould. We repair and replace all of them in durable COLORBOND® steel, which lasts for years and comes in the full colour range so we can match your home.</p>\n<p>From a single damaged section to a complete re-gutter with matching downpipes, we quote it clearly and leave your property clean and tidy when we are finished.</p>\n${im.i3}
<h2><strong>Storm Damage &amp; Emergency Roof Plumbing</strong></h2>\n<p>When a storm hits Melbourne, gutters overflow, downpipes break and flashings tear loose. If you have water coming into your home, call us as soon as you can. We will make your roof safe and watertight quickly, then talk you through any permanent repairs and help with insurance documentation where it is needed.</p>\n${im.i4}
<h2><strong>Why Choose Sandhurst Roofing</strong></h2>\n<p>People keep coming back to Sandhurst Roofing because we turn up when we say we will, do quality work and charge a fair, competitive price. We are fully licensed and insured, every tradesperson is a registered roof plumber, and we take the time to explain what is happening at every step.</p>\n${reviewsNearMe}
<h2><strong>Roof Plumber Near Me FAQs</strong></h2>\n<p><strong>What areas do you cover?</strong><br>We cover Melbourne's south-east and the Mornington Peninsula, including Frankston, Cranbourne, Berwick and surrounding suburbs. Call ${PHONE} to check we service your street.</p>\n<p><strong>Do I really need a licensed roof plumber?</strong><br>Yes. Guttering, downpipes and rainwater systems are roof plumbing work and must be done by a registered roof plumber to meet Australian Standards. Every Sandhurst Roofing tradesperson is licensed.</p>\n<p><strong>How fast can you respond to a leak?</strong><br>For leaks and storm damage we prioritise getting your roof watertight as quickly as possible. Call us and we will arrange the soonest visit we can.</p>
<h2><strong>Suburbs We Service</strong></h2>\n<p>We provide roof plumbing across the south-east and bayside, including <a href="https://sandhurstroofing.com.au/roof-plumber-frankston/">Frankston</a>, <a href="https://sandhurstroofing.com.au/roof-plumber-cranbourne/">Cranbourne</a> and <a href="https://sandhurstroofing.com.au/roof-plumber-berwick/">Berwick</a>, plus Pakenham, Officer, Narre Warren, Mornington, Hastings and the wider Peninsula.</p>
<h2><strong>Get a Free Roof Plumbing Quote</strong></h2>\n<p>Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below for your free roof plumbing quote. We will explain exactly what needs doing and give you an honest, fixed price before any work starts.</p>\n${cta()}`;
  },
});

// ----- Write loop -----------------------------------------------------------
let count = 0;
for (const page of PAGES) {
  const full = path.join(DIR, `${page.slug}.json`);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  const suburb = json.title.replace(/^Roof Plumber\s*/i, "").trim();
  const content = page.build(suburb).replace(/\n{2,}/g, "\n").trim();
  json.content = content;
  json.seoTitle = page.seoTitle;
  json.seoDescription = page.seoDescription;
  fs.writeFileSync(full, JSON.stringify(json, null, 2));

  const words = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
  const h2s = (content.match(/<h2/g) || []).length;
  console.log(
    `✓ ${page.slug.padEnd(22)} ${String(words).padStart(4)}w  ${h2s} H2s  | seoTitle ${page.seoTitle.length}+20=${page.seoTitle.length + 20}  desc ${page.seoDescription.length}`
  );
  count++;
}
console.log(`\nRewrote ${count} roof-plumber pages.`);
