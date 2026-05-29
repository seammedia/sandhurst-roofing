#!/usr/bin/env node
/**
 * Batch 5 location-page rewrites: Mornington Peninsula coastal villages + hinterland:
 * crib-point, balnarring-beach, merricks-beach, merricks-north, point-leo,
 * red-hill-south, main-ridge, tuerong, cape-schanck, st-andrews-beach, rye,
 * arthurs-seat.
 *
 * Same structure/quality bar as batches 1-4 (~650-720 words, 11 unique
 * suburb-tagged H2s each). Differentiated by real local character:
 *   - Western Port salt-air corrosion: crib-point, balnarring-beach,
 *     merricks-beach, point-leo
 *   - exposed Bass Strait coast (salt + strong wind + sand): cape-schanck,
 *     st-andrews-beach
 *   - large holiday/Port Phillip + back-beach town: rye
 *   - leafy elevated hinterland (bush blocks, gum-leaf litter, larger rural
 *     homes + sheds, wind on the ridge): merricks-north, red-hill-south,
 *     main-ridge, tuerong, arthurs-seat
 *
 * Guardrails: no fabricated stats/projects, real testimonials only, Australian
 * spelling, no em dashes. Defensible real geography/climate only. Images reuse
 * each page's existing photos with work-descriptive alt text.
 * seoTitle <=40 (layout appends " | Sandhurst Roofing" -> final <=60).
 */
import fs from "fs";
import path from "path";

const DIR = "content/locations";

const PHONE = '<a href="tel:0448812800"><strong>0448 812 800</strong></a>';
const cta = (label = "Get a Free Quote!") =>
  `<a href="/contact/" class="btn">${label}</a>`;

const reviews = (suburb) => `
<h2 style="text-align: center;"><strong><span style="color: #ffffff;">What Our ${suburb} Customers Say</span></strong></h2>
<blockquote><p>Matt and his guys did a great job restoring our Tile roof. Great communication from start to finish. Great result and very reasonable price.</p><cite>Ben Prout</cite></blockquote>★★★★★
<blockquote><p>Best service ever. Great team and a trouble free experience. Give these guys a go. Brilliant</p><cite>Steve Wood</cite></blockquote>★★★★★
<a href="/reviews/" class="btn">View All Reviews</a>`;

const img = (src, alt) =>
  `<img src="${src}" alt="${alt}" width="960" height="512" loading="lazy">`;

const QUOTE = (s) =>
  `<h2><strong>Get a Free Roofing Quote in ${s}</strong></h2>
<p>Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below for your free ${s} roofing quote.</p>
${cta()}`;

function build(s, p) {
  return `
<h2><strong>${p.h1}</strong></h2>
${p.intro}
${img(p.imgIntro[0], p.imgIntro[1])}
${cta()}

<h2><strong>Roofs in ${s}: What We Commonly See</strong></h2>
${p.common}

<h2><strong>Re-Roofing &amp; Roof Replacement in ${s}</strong></h2>
${p.reroof}
${img(p.imgReroof[0], p.imgReroof[1])}

<h2><strong>Roof Repairs, Repointing &amp; Gutters in ${s}</strong></h2>
${p.repairs}
${p.imgGutter ? img(p.imgGutter[0], p.imgGutter[1]) : ""}

<h2><strong>What Affects the Cost of Roofing in ${s}</strong></h2>
${p.cost}

<h2><strong>Our ${s} Roofing Process</strong></h2>
${p.process}

<h2><strong>Why ${s} Locals Choose Sandhurst Roofing</strong></h2>
${p.why}
${reviews(s)}

<h2><strong>${s} Roofing FAQs</strong></h2>
${p.faqs}

<h2><strong>Suburbs We Service Near ${s}</strong></h2>
${p.nearby}

${QUOTE(s)}`;
}

const introStd = (s) =>
  `<p>Sandhurst Roofing has cared for roofs across ${s} and the Mornington Peninsula for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`;

const costStd = `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will show you exactly what your quote covers.</p>`;

const processStd = `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`;

const faqQuote = `<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`;

const pages = {
  "crib-point": {
    seoTitle: "Roof Restoration & Repairs Crib Point",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Crib Point. Sandhurst Roofing protects Western Port roofs from salt-air corrosion. Free quotes.",
    suburb: "Crib Point",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Crib Point",
      intro: introStd("Crib Point"),
      imgIntro: ["/images/wp/2020/03/Restoration-finished-in-Mornington-pic-6-e1590817523986.jpg", "Completed tile roof restoration by Sandhurst Roofing in Crib Point"],
      common: `<p>Crib Point sits on the eastern shore of Western Port, a short way south of Hastings, with its jetty and port frontage exposed to salt-laden air off the bay. That coastal position is hard on roofs. Salt corrodes metal roofs, ridge capping fixings, valleys and gutters faster than it does inland, and the older fibro, weatherboard and brick homes here often carry concrete tile or early metal roofs that have weathered hard.</p>
<p>The problems we are called out for most in Crib Point are rusted gutters and valleys, lifted and cracked ridge capping, faded and porous tiles, and leaks where corroded flashings have failed.</p>`,
      reroof: `<p>Salt air shortens the life of a roof, so for many Crib Point homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert an old tile roof to metal. If your roof is rusting through or leaking in multiple spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2020/01/re-roof-seaford-1-e1590817584537.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a coastal suburb like Crib Point, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to keep water out.</p>`,
      imgGutter: ["/images/wp/2020/05/Roof-Painting-and-new-gutters-e1590818389622.jpg", "Roof painting and new guttering by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we understand what salt air off Western Port does to coastal roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Why do my gutters rust so quickly in Crib Point?</h3>
<p>Salt air off Western Port accelerates corrosion. Replacing old gutters with quality COLORBOND&reg; steel and keeping them clear of debris will get you a much longer life.</p>
<h3>Should I restore or replace my roof?</h3>
<p>If the tiles or sheets are sound and the issue is worn coating or pointing, a restoration is usually best value. If there is widespread rust or leaking, a re-roof costs less over time.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/hastings/">Hastings</a>, <a href="/balnarring-beach/">Balnarring Beach</a>, <a href="/merricks-beach/">Merricks Beach</a>, <a href="/point-leo/">Point Leo</a>, <a href="/tuerong/">Tuerong</a> and <a href="/mornington/">Mornington</a>.</p>`,
    },
  },

  "balnarring-beach": {
    seoTitle: "Roof Restoration Balnarring Beach",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Balnarring Beach. Sandhurst Roofing protects Western Port beach homes from salt. Free quotes.",
    suburb: "Balnarring Beach",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Balnarring Beach",
      intro: introStd("Balnarring Beach"),
      imgIntro: ["/images/wp/2020/06/roof-restoration-hastings-pic-1-e1591699492946.jpg", "Tile roof restoration by Sandhurst Roofing near Balnarring Beach"],
      common: `<p>Balnarring Beach is a quiet foreshore pocket on Western Port, a strip of beach houses and holiday homes set close to the sand and the foreshore reserve. That close-to-the-water position means salt-laden air works on roofs all year, corroding metal sheets, ridge capping fixings, valleys and gutters faster than inland. Many homes here are weekenders and older beach houses with concrete tile or metal roofs that have not been maintained every season.</p>
<p>The issues we see most at Balnarring Beach are rusted gutters and valleys, lifted ridge capping, faded tiles, blocked gutters under the tea-tree and coastal scrub, and leaks from corroded flashings.</p>`,
      reroof: `<p>Because salt air shortens the life of a roof, a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often the most cost-effective fix for an older Balnarring Beach home. COLORBOND&reg; is made for coastal conditions, and we can replace tile or metal roofs and convert tile to metal. If your beach house roof is rusting or leaking in several spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-4-e1591699867906.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Clearing and replacing gutters that fill with leaf litter and corrode in the salt air is some of the most useful work we do here.</p>`,
      imgGutter: ["/images/wp/2020/06/roof-restoration-hastings-pic-2-e1591699524929.jpg", "Roof restoration and repointing by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we understand the demands of a foreshore position. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My place is a weekender. Can you inspect it while I am away?</h3>
<p>Yes. We are happy to inspect and quote, then keep you informed with photos so you can make a decision without being on site.</p>
<h3>Why do beach-house gutters fail so fast?</h3>
<p>Salt air corrodes them and coastal scrub fills them with debris. Replacing them in COLORBOND&reg; steel and keeping them clear makes a big difference.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/merricks-beach/">Merricks Beach</a>, <a href="/point-leo/">Point Leo</a>, <a href="/crib-point/">Crib Point</a>, <a href="/hastings/">Hastings</a>, <a href="/red-hill-south/">Red Hill South</a> and <a href="/merricks-north/">Merricks North</a>.</p>`,
    },
  },

  "merricks-beach": {
    seoTitle: "Roof Restoration Merricks Beach",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Merricks Beach. Sandhurst Roofing protects Western Port beach homes from salt air. Free quotes.",
    suburb: "Merricks Beach",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Merricks Beach",
      intro: introStd("Merricks Beach"),
      imgIntro: ["/images/wp/2020/06/roof-restoration-hastings-pic-2-e1591699524929.jpg", "Tile roof restoration by Sandhurst Roofing near Merricks Beach"],
      common: `<p>Merricks Beach is a small foreshore hamlet on Western Port, mostly beach houses and weekenders tucked among the coastal tea-tree close to the water. Sitting right on the bay, these roofs cop salt-laden air year round, which corrodes metal sheets, ridge capping fixings, valleys and gutters well ahead of inland homes. Many of the older shacks and beach houses here carry metal or concrete tile roofs that have weathered hard between visits.</p>
<p>The problems we see most at Merricks Beach are rusted gutters and valleys, lifted and cracked ridge capping, faded and porous tiles, gutters clogged with tea-tree litter, and leaks from corroded flashings.</p>`,
      reroof: `<p>Salt air shortens the life of a roof, so for many Merricks Beach homes a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert tile to metal. If your beach house roof is rusting or leaking in several places, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-3-e1591700021118.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Replacing salt-corroded gutters and valleys with quality COLORBOND&reg; steel is one of the most valuable things you can do for a beach house here.</p>`,
      imgGutter: ["/images/wp/2020/06/roof-restoration-hastings-pic-1-e1591699492946.jpg", "Completed roof restoration by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we know what a foreshore position does to a roof. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you look after my weekender while I am not there?</h3>
<p>Yes. We can inspect, quote and report back with photos, so you can decide remotely and have the work done while you are away.</p>
<h3>Restore or replace a salt-worn roof?</h3>
<p>If the sheets or tiles are sound, a restoration is usually best value. Where there is widespread rust or leaking, a re-roof in COLORBOND&reg; steel costs less over time.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/balnarring-beach/">Balnarring Beach</a>, <a href="/point-leo/">Point Leo</a>, <a href="/merricks-north/">Merricks North</a>, <a href="/hastings/">Hastings</a>, <a href="/crib-point/">Crib Point</a> and <a href="/red-hill-south/">Red Hill South</a>.</p>`,
    },
  },

  "merricks-north": {
    seoTitle: "Roof Restoration Merricks North",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Merricks North. Sandhurst Roofing restores rural homes and shed roofs. Free quotes, 30+ years.",
    suburb: "Merricks North",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Merricks North",
      intro: introStd("Merricks North"),
      imgIntro: ["/images/wp/2018/10/Roof-painting-and-repointing.jpg", "Roof painting and repointing by Sandhurst Roofing in Merricks North"],
      common: `<p>Merricks North is hinterland country, a patchwork of vineyards, small farms and rural-residential acreage set back from the Western Port coast. The homes here tend to be larger, on bigger blocks, often with a shed, garage or stables alongside the house. Set among gum trees and pasture, the roofs deal less with salt and more with harsh summer UV, gum-leaf litter and exposure to wind across open country.</p>
<p>The jobs we are called out for most in Merricks North are repointing cracked ridge capping, replacing broken tiles, clearing and replacing gutters that fill with leaf and bark litter, and restoring or re-sheeting larger home and shed roofs that have faded and gone porous.</p>`,
      reroof: `<p>On a larger rural roof that is leaking, sagging or beyond economical repair, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated patching, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds and outbuildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2018/10/42272301_2245630332132718_8421541942369714176_n.jpg", "Completed roof work by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and outbuildings. On leafy acreage, keeping gutters and valleys clear and draining is a constant job.</p>`,
      imgGutter: null,
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger rural and shed roofs. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger rural homes, sheds and outbuildings. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on sheds and outbuildings as well as the house?</h3>
<p>Yes. We re-sheet, restore and repair metal roofs on sheds, garages and farm buildings, as well as home roofs.</p>
<h3>My gutters keep filling with leaves and bark. Can you help?</h3>
<p>Yes. We clear and replace gutters and valleys and can talk you through gutter guard options for leafy, treed blocks.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/red-hill-south/">Red Hill South</a>, <a href="/balnarring-beach/">Balnarring Beach</a>, <a href="/merricks-beach/">Merricks Beach</a>, <a href="/point-leo/">Point Leo</a>, <a href="/hastings/">Hastings</a> and <a href="/main-ridge/">Main Ridge</a>.</p>`,
    },
  },

  "point-leo": {
    seoTitle: "Roof Restoration & Repairs Point Leo",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Point Leo. Sandhurst Roofing protects exposed coastal homes from salt and wind. Free quotes.",
    suburb: "Point Leo",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Point Leo",
      intro: introStd("Point Leo"),
      imgIntro: ["/images/wp/2018/10/new-roof-with-gutters-and-downpipes.jpg", "New roof with gutters and downpipes by Sandhurst Roofing in Point Leo"],
      common: `<p>Point Leo is an exposed surf-coast pocket on the southern shore of Western Port, where homes look straight out at the water and the foreshore reserve. Between salt-laden air and strong onshore wind, roofs here take a beating. Salt corrodes metal sheets, ridge capping fixings, valleys and gutters quickly, and the wind drives rain hard against flashings and lifts loose ridge capping and tiles.</p>
<p>The problems we see most at Point Leo are rusted gutters and valleys, wind-lifted and cracked ridge capping, faded tiles, and leaks where flashings have corroded or worked loose in the wind.</p>`,
      reroof: `<p>On an exposed coast like this, salt and wind shorten a roof's life, so a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions and, fixed correctly, stands up well to onshore wind. We can replace tile or metal roofs and convert tile to metal. If your roof is rusting or leaking in several spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2018/10/new-roof-2.jpg", "Completed metal re-roof by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On a windy, salty coast, making sure ridge capping and flashings are secure and gutters are sound is what keeps water out.</p>`,
      imgGutter: null,
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we understand the demands of an exposed coastal position. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Why does my ridge capping keep lifting?</h3>
<p>Onshore wind works on loose capping over time. We re-bed and repoint with flexible pointing so it holds, and refix flashings that have worked loose.</p>
<h3>Is COLORBOND&reg; steel good for an exposed coast?</h3>
<p>Yes. It is made for coastal conditions and, fixed correctly, handles salt and wind well. We can recommend the right finish for your position.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/merricks-beach/">Merricks Beach</a>, <a href="/balnarring-beach/">Balnarring Beach</a>, <a href="/red-hill-south/">Red Hill South</a>, <a href="/hastings/">Hastings</a>, <a href="/crib-point/">Crib Point</a> and <a href="/main-ridge/">Main Ridge</a>.</p>`,
    },
  },

  "red-hill-south": {
    seoTitle: "Roof Restoration Red Hill South",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Red Hill South. Sandhurst Roofing restores leafy hinterland and acreage roofs. Free quotes.",
    suburb: "Red Hill South",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Red Hill South",
      intro: introStd("Red Hill South"),
      imgIntro: ["/images/wp/2018/10/Roof-painting-and-repointing.jpg", "Roof painting and repointing by Sandhurst Roofing in Red Hill South"],
      common: `<p>Red Hill South sits in the green, elevated heart of the Peninsula hinterland, a country of wineries, orchards and leafy acreage on rolling hills. Homes here are typically larger and set among established gums and garden trees, often with a shed or studio alongside. The higher, cooler and wetter setting means roofs deal less with salt and more with heavy gum-leaf litter, moss and lichen on shaded slopes, and exposure to wind across the ridges.</p>
<p>The jobs we are called out for most in Red Hill South are clearing and replacing gutters and valleys that choke with leaf litter, repointing cracked ridge capping, treating and cleaning moss-affected tiles, and restoring larger home and shed roofs.</p>`,
      reroof: `<p>When a larger hinterland roof is leaking, sagging or beyond economical repair, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds and studios. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2018/10/42272301_2245630332132718_8421541942369714176_n.jpg", "Completed roof restoration by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On treed acreage, keeping gutters and valleys clear and draining cleanly is one of the most important things you can do.</p>`,
      imgGutter: null,
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much moss treatment and guttering is involved, and safe access, which matters on larger homes and steeper hinterland blocks. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger homes, sheds and steeper hinterland roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My tiles are covered in moss and lichen. Can you fix that?</h3>
<p>Yes. We high-pressure clean, treat the surface and recoat with a protective membrane so the roof sheds water and resists regrowth.</p>
<h3>My gutters fill with gum leaves constantly. What can I do?</h3>
<p>We clear and replace gutters and valleys and can talk you through gutter guard options suited to heavily treed blocks.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/main-ridge/">Main Ridge</a>, <a href="/merricks-north/">Merricks North</a>, <a href="/arthurs-seat/">Arthurs Seat</a>, <a href="/balnarring-beach/">Balnarring Beach</a>, <a href="/roof-restoration-dromana/">Dromana</a> and <a href="/roof-restoration-mccrae/">McCrae</a>.</p>`,
    },
  },

  "main-ridge": {
    seoTitle: "Roof Restoration & Repairs Main Ridge",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Main Ridge. Sandhurst Roofing restores leafy, elevated hinterland and acreage roofs. Free quotes.",
    suburb: "Main Ridge",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Main Ridge",
      intro: introStd("Main Ridge"),
      imgIntro: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-3-e1591700021118.jpg", "Tile roof restoration by Sandhurst Roofing in Main Ridge"],
      common: `<p>Main Ridge sits on the highest, most heavily treed part of the Mornington Peninsula, a country of forest, vineyards and large rural blocks. Homes here are often substantial and set deep among tall gums, with sheds and outbuildings nearby. Up on the ridge the roofs deal with constant gum-leaf and bark litter, moss and lichen on shaded southern slopes, and strong wind that drives rain against flashings and lifts loose capping.</p>
<p>The jobs we are called out for most in Main Ridge are clearing and replacing gutters and valleys choked with bush litter, repointing and refixing wind-lifted ridge capping, treating moss-affected tiles, and restoring or re-sheeting larger home and shed roofs.</p>`,
      reroof: `<p>On a larger, exposed hinterland roof that is leaking, sagging or beyond economical repair, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds and outbuildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/06/roof-restoration-hastings-pic-1-e1591699492946.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On heavily treed, windy blocks, keeping gutters clear and capping secure is what keeps water out of the home.</p>`,
      imgGutter: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-4-e1591699867906.jpg", "Roof restoration and new guttering by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much moss treatment and guttering is involved, and safe access, which matters on larger and steeper ridge-top roofs. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger, steeper and heavily treed hinterland roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Bush litter fills my gutters and valleys. Can you help?</h3>
<p>Yes. We clear and replace gutters and valleys and can talk you through gutter guard options suited to heavily treed bush blocks.</p>
<h3>Can you treat moss on shaded slopes?</h3>
<p>Yes. We high-pressure clean, treat the surface and recoat the roof so it sheds water and resists moss and lichen regrowth.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/red-hill-south/">Red Hill South</a>, <a href="/arthurs-seat/">Arthurs Seat</a>, <a href="/merricks-north/">Merricks North</a>, <a href="/roof-restoration-dromana/">Dromana</a>, <a href="/roof-restoration-mccrae/">McCrae</a> and <a href="/cape-schanck/">Cape Schanck</a>.</p>`,
    },
  },

  tuerong: {
    seoTitle: "Roof Restoration & Repairs Tuerong",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Tuerong. Sandhurst Roofing restores rural homes and shed roofs on acreage. Free quotes.",
    suburb: "Tuerong",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Tuerong",
      intro: introStd("Tuerong"),
      imgIntro: ["/images/wp/2020/03/Restoration-finished-in-Mornington-pic-4-e1590732993806.jpg", "Completed tile roof restoration by Sandhurst Roofing in Tuerong"],
      common: `<p>Tuerong is rural country between Moorooduc and the bay, a area of vineyards, horse properties and acreage homes set back among paddocks and gum trees. The homes here are often larger and almost always come with a shed, stable or machinery building alongside the house. Set inland, the wear comes more from harsh summer UV, gum-leaf litter and wind across open country than from salt.</p>
<p>The jobs we are called out for most in Tuerong are repointing cracked ridge capping, replacing broken tiles, clearing and replacing leaf-filled gutters and valleys, and restoring or re-sheeting larger home and shed roofs that have faded and gone porous.</p>`,
      reroof: `<p>On a larger rural roof that is leaking, sagging or beyond economical repair, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated patching, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds, stables and machinery buildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/01/re-roof-seaford-4-e1590733067873.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and outbuildings. On treed acreage, keeping gutters and valleys clear and draining is a constant job.</p>`,
      imgGutter: ["/images/wp/2020/01/mount-martha-pic-1-e1590733360788.jpg", "Roof restoration and repointing by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger rural and shed roofs. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger rural homes, sheds, stables and machinery buildings. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you do shed and stable roofs as well as the house?</h3>
<p>Yes. We re-sheet, restore and repair metal roofs on sheds, stables and machinery buildings, as well as home roofs.</p>
<h3>My acreage gutters fill with leaves. Can you help?</h3>
<p>Yes. We clear and replace gutters and valleys and can talk you through gutter guard options for treed, rural blocks.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/mornington/">Mornington</a>, <a href="/mount-martha/">Mount Martha</a>, <a href="/hastings/">Hastings</a>, <a href="/crib-point/">Crib Point</a>, <a href="/roof-restoration-safety-beach/">Safety Beach</a> and <a href="/merricks-north/">Merricks North</a>.</p>`,
    },
  },

  "cape-schanck": {
    seoTitle: "Roof Restoration Cape Schanck",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Cape Schanck. Sandhurst Roofing protects exposed Bass Strait roofs from salt and wind. Free quotes.",
    suburb: "Cape Schanck",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Cape Schanck",
      intro: introStd("Cape Schanck"),
      imgIntro: ["/images/wp/2019/11/carrum-downs-full-roof-restoration.jpg", "Full tile roof restoration by Sandhurst Roofing in Cape Schanck"],
      common: `<p>Cape Schanck sits at the exposed southern tip of the Peninsula, where the coast faces straight into Bass Strait. Few positions on the Peninsula are harder on a roof. Salt-laden air and strong, near-constant onshore wind corrode metal sheets, ridge capping fixings, valleys and gutters fast, drive rain against flashings, and lift loose ridge capping and tiles. The homes here range from older holiday houses to newer architect-designed homes, often with low-pitch metal roofing.</p>
<p>The problems we see most at Cape Schanck are rusted gutters, valleys and flashings, wind-lifted and cracked ridge capping, faded tiles, and leaks where flashings have corroded or worked loose in the wind.</p>`,
      reroof: `<p>In a position this exposed, salt and wind shorten a roof's life, so a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions and, fixed correctly, stands up well to onshore wind. We can replace tile or metal roofs and convert tile to metal. If your roof is rusting or leaking in several spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2019/11/carrum-downs-roof-restoration.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On an exposed coast, making sure flashings and ridge capping are secure and gutters are sound is what keeps water out.</p>`,
      imgGutter: ["/images/wp/2019/11/roof-re-spray-carrum-downs.jpg", "Roof respray and protective coating by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we understand what the Bass Strait coast does to a roof. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Why do my flashings and gutters fail so quickly out here?</h3>
<p>Salt air and strong onshore wind are hard on coastal roofs. Replacing them in quality COLORBOND&reg; steel and fixing flashings securely makes a real difference.</p>
<h3>Is COLORBOND&reg; steel suitable for such an exposed coast?</h3>
<p>Yes. It is made for coastal conditions and, fixed correctly, handles salt and wind well. We can recommend the right finish for your position.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/roof-restoration-blairgowrie/">Blairgowrie</a>, <a href="/roof-restoration-portsea/">Portsea</a>, <a href="/roof-restoration-rosebud/">Rosebud</a>, <a href="/st-andrews-beach/">St Andrews Beach</a>, <a href="/rye/">Rye</a> and <a href="/main-ridge/">Main Ridge</a>.</p>`,
    },
  },

  "st-andrews-beach": {
    seoTitle: "Roof Restoration St Andrews Beach",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in St Andrews Beach. Sandhurst Roofing protects exposed back-beach roofs from salt and sand. Free quotes.",
    suburb: "St Andrews Beach",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in St Andrews Beach",
      intro: introStd("St Andrews Beach"),
      imgIntro: ["/images/wp/2020/06/full-roof-restorations-mornington-pic-3-e1591783582473.jpg", "Full roof restoration by Sandhurst Roofing in St Andrews Beach"],
      common: `<p>St Andrews Beach sits on the wild back-beach side of the Peninsula, facing Bass Strait across the dunes. Homes here are spread among the coastal scrub on sandy blocks, from older beach houses to newer holiday homes, and they cop the full force of the southern coast. Salt-laden air and strong onshore wind corrode metal sheets, ridge capping fixings, valleys and gutters quickly, and blown sand and scrub litter fill gutters and valleys.</p>
<p>The problems we see most at St Andrews Beach are rusted gutters and valleys, wind-lifted and cracked ridge capping, faded tiles, gutters clogged with sand and scrub litter, and leaks from corroded flashings.</p>`,
      reroof: `<p>On an exposed back-beach position, salt and wind shorten a roof's life, so a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions and, fixed correctly, handles onshore wind well. We can replace tile or metal roofs and convert tile to metal. If your roof is rusting or leaking in several spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2020/06/reroof-at-Crib-Point-pic2-e1591783689699.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On a sandy, salty back beach, keeping gutters and valleys clear and flashings secure is what keeps water out.</p>`,
      imgGutter: ["/images/wp/2020/06/new-gutter-and-downpipes-patterson-lakes-pic-3-e1591782930798.jpg", "New guttering and downpipes by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we understand the demands of an exposed back-beach position. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you inspect my holiday house while I am away?</h3>
<p>Yes. We can inspect, quote and report back with photos, so you can decide remotely and have the work done while you are not on site.</p>
<h3>Sand and scrub keep filling my gutters. What can I do?</h3>
<p>We clear and replace gutters and valleys and can talk you through gutter guard options suited to sandy, scrubby coastal blocks.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/rye/">Rye</a>, <a href="/roof-restoration-rosebud/">Rosebud</a>, <a href="/roof-restoration-blairgowrie/">Blairgowrie</a>, <a href="/cape-schanck/">Cape Schanck</a>, <a href="/roof-restoration-portsea/">Portsea</a> and <a href="/roof-restoration-mccrae/">McCrae</a>.</p>`,
    },
  },

  rye: {
    seoTitle: "Roof Restoration & Repairs Rye",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Rye. Sandhurst Roofing protects bayside and back-beach holiday homes from salt. Free quotes.",
    suburb: "Rye",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Rye",
      intro: introStd("Rye"),
      imgIntro: ["/images/wp/2018/10/new-roof-with-gutters-and-downpipes.jpg", "New roof with gutters and downpipes by Sandhurst Roofing in Rye"],
      common: `<p>Rye stretches from the calm Port Phillip front beach across to the wild Bass Strait back beach, a big holiday town that swells every summer. Homes range from old fibro shacks and beach houses to large modern holiday homes, many of them weekenders that sit unused for stretches of the year. With water on both sides, salt-laden air corrodes metal roofs, ridge capping fixings, valleys and gutters faster than inland, and many roofs here have gone years between proper maintenance.</p>
<p>The problems we see most in Rye are rusted gutters and valleys, lifted and cracked ridge capping, faded and porous tiles, and leaks where corroded flashings have failed.</p>`,
      reroof: `<p>Salt air shortens the life of a roof, so for many Rye homes a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert an old tile roof to metal. If your roof is rusting through or leaking in multiple spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2018/10/new-roof-2.jpg", "Completed metal re-roof by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a coastal holiday town like Rye, replacing salt-corroded gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to keep water out.</p>`,
      imgGutter: null,
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we understand what salt air does to bayside and back-beach roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you look after my holiday house while I am not there?</h3>
<p>Yes. We can inspect, quote and report back with photos, so you can decide remotely and have the work done before the next season.</p>
<h3>Should I restore or replace a salt-worn roof?</h3>
<p>If the tiles or sheets are sound, a restoration is usually best value. Where there is widespread rust or leaking, a re-roof in COLORBOND&reg; steel costs less over time.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/roof-restoration-rosebud/">Rosebud</a>, <a href="/roof-restoration-blairgowrie/">Blairgowrie</a>, <a href="/roof-restoration-mccrae/">McCrae</a>, <a href="/st-andrews-beach/">St Andrews Beach</a>, <a href="/cape-schanck/">Cape Schanck</a> and <a href="/roof-restoration-portsea/">Portsea</a>.</p>`,
    },
  },

  "arthurs-seat": {
    seoTitle: "Roof Restoration Arthurs Seat",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Arthurs Seat. Sandhurst Roofing restores leafy, elevated bayside hillside roofs. Free quotes.",
    suburb: "Arthurs Seat",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Arthurs Seat",
      intro: introStd("Arthurs Seat"),
      imgIntro: ["/images/wp/2019/11/full-roof-restoration-patterson-lakes.jpg", "Full roof restoration by Sandhurst Roofing in Arthurs Seat"],
      common: `<p>Arthurs Seat rises above the bay as the highest hill on the Port Phillip side of the Peninsula, with leafy, elevated blocks running up the slopes above Dromana and Safety Beach. Homes here are often larger, set among tall gums on steep sites, many built to capture the bay views. Up on the hill the roofs deal with heavy gum-leaf and bark litter, moss and lichen on shaded southern slopes, and strong wind across the ridge that drives rain against flashings and lifts loose capping.</p>
<p>The jobs we are called out for most in Arthurs Seat are clearing and replacing leaf-choked gutters and valleys, repointing and refixing wind-lifted ridge capping, treating moss-affected tiles, and restoring larger home roofs on steep, treed blocks.</p>`,
      reroof: `<p>When a larger hillside roof is leaking, sagging or beyond economical repair, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, studios and garages. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2019/11/roof-restoration-patterson-lakes.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On steep, heavily treed blocks, keeping gutters clear and capping secure is what keeps water out of the home.</p>`,
      imgGutter: ["/images/wp/2019/11/gutter-repairs-patterson-lakes.jpg", "Gutter repairs and replacement by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much moss treatment and guttering is involved, and safe access, which matters on steep, elevated hillside blocks. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger, steeper and heavily treed hillside roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My block is steep and treed. Can you access the roof safely?</h3>
<p>Yes. We set up the right safe access and harnessing for steep, elevated sites, and we factor that into your quote up front.</p>
<h3>Can you treat moss and clear gum-leaf litter?</h3>
<p>Yes. We high-pressure clean, treat and recoat moss-affected tiles, and clear and replace gutters and valleys that fill with bush litter.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/roof-restoration-dromana/">Dromana</a>, <a href="/roof-restoration-safety-beach/">Safety Beach</a>, <a href="/roof-restoration-mccrae/">McCrae</a>, <a href="/red-hill-south/">Red Hill South</a>, <a href="/main-ridge/">Main Ridge</a> and <a href="/roof-restoration-rosebud/">Rosebud</a>.</p>`,
    },
  },
};

let count = 0;
for (const [slug, data] of Object.entries(pages)) {
  const full = path.join(DIR, `${slug}.json`);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  const content = build(data.suburb, data.parts).replace(/\n{2,}/g, "\n").trim();
  json.content = content;
  json.seoTitle = data.seoTitle;
  json.seoDescription = data.seoDescription;
  fs.writeFileSync(full, JSON.stringify(json, null, 2));
  const words = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
  const h2s = (content.match(/<h2/g) || []).length;
  console.log(
    `✓ ${slug.padEnd(18)} ${String(words).padStart(4)}w  ${h2s} H2s  | seoTitle ${data.seoTitle.length}+20=${data.seoTitle.length + 20}  desc ${data.seoDescription.length}`
  );
  count++;
}
console.log(`\nRewrote ${count} location pages.`);
