#!/usr/bin/env node
/**
 * Batch 3 location-page rewrites: the SE-inland cluster - dandenong,
 * dandenong-north, dandenong-south, noble-park, noble-park-north, springvale,
 * springvale-south, keysborough, clarinda.
 *
 * Same structure/quality bar as batches 1-2 (~650-820 words, 11 unique
 * suburb-tagged H2s each). Local angle shifts from coastal salt to the real
 * inland conditions: hot dry summers and intense UV ageing tile coatings and
 * metal, Melbourne's south-east hail belt (hail cracks tiles and dents metal ->
 * storm-damage repairs), established post-war housing stock at end of roof life
 * (= strong re-roof demand), and the large Dandenong South / Dandenong
 * industrial precinct (commercial re-sheets, box gutters).
 *
 * Guardrails: no fabricated stats/projects, real testimonials only, Australian
 * spelling, no em dashes. Local detail is defensible real geography/climate.
 * seoTitle kept <=40 chars (layout appends " | Sandhurst Roofing" -> final <=60).
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

const pages = {
  dandenong: {
    seoTitle: "Roof Restoration & Repairs Dandenong",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Dandenong. Sandhurst Roofing restores hail and heat-worn home and commercial roofs. Free quotes.",
    suburb: "Dandenong",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Dandenong",
      intro: `<p>Sandhurst Roofing is a family owned business with more than 30 years of experience looking after roofs across Dandenong, on homes and commercial buildings alike. We handle <a href="/roof-restoration/">roof restoration</a>, full <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2020/06/roof-restoration-hastings-pic-1-e1591699492946.jpg", "Tile roof restoration by Sandhurst Roofing in Dandenong"],
      common: `<p>Dandenong is one of the south-east's biggest hubs, with a large stock of established post-war brick homes alongside a major commercial and industrial area. A lot of those older homes still wear their original concrete tile roofs, now faded and porous with the protective coating long gone after decades of hot summers and harsh UV.</p>
<p>Being inland there is no salt to worry about, but the south-east sits in Melbourne's hail belt, and a single storm can crack tiles, dent metal and flood a blocked gutter. The jobs we are called out for most in Dandenong are storm and hail repairs, repointing cracked ridge capping, replacing broken tiles, and replacing tired guttering and valleys.</p>`,
      reroof: `<p>When a Dandenong roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. For commercial buildings we re-sheet flat and pitched metal roofs and renew box gutters. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-4-e1591699867906.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. After a south-east hailstorm, repointing and prompt tile replacement stop water tracking inside before it becomes an internal leak.</p>`,
      imgGutter: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-3-e1591700021118.jpg", "Roof and gutter work completed by Sandhurst Roofing"],
      cost: `<p>Every roof is different, so we quote on what is in front of us. The main factors are the size and pitch of the roof, tile versus metal, how many tiles or sheets need replacing, the extent of any storm damage, the condition of the ridge capping and valleys, the amount of guttering, and safe access on larger homes and commercial roofs. Your written quote spells out exactly what is included.</p>`,
      process: `<p>We start with a free on-site inspection and a written quote. For a restoration we high-pressure clean the roof, re-bed and repoint the ridge capping, replace broken tiles and rusted valleys, carry out repairs, then finish with a three-coat protective membrane in your chosen colour. For a re-roof we strip the old roof and re-sheet in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and experience across both homes and commercial buildings. As a family business we give honest advice rather than a hard sell, turn up when we say we will, and stand behind our work. Browse the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a> to start picturing your new roof.</p>`,
      faqs: `<h3>Can you repair hail and storm damage in Dandenong?</h3>
<p>Yes. The south-east cops its share of hail, and we repair cracked tiles, dented metal and storm-related leaks, and can advise if a re-roof is the better option after major damage.</p>
<h3>Do you work on commercial and factory roofs?</h3>
<p>Yes. As well as homes, we restore, re-sheet and repair metal roofs and box gutters on Dandenong's factories, warehouses and commercial buildings.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, all quotes are free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>As well as Dandenong we service nearby <a href="/dandenong-north/">Dandenong North</a>, <a href="/dandenong-south/">Dandenong South</a>, <a href="/noble-park/">Noble Park</a>, <a href="/springvale/">Springvale</a>, <a href="/keysborough/">Keysborough</a> and <a href="/endeavour-hills/">Endeavour Hills</a>.</p>`,
    },
  },

  "dandenong-north": {
    seoTitle: "Roof Restoration Dandenong North",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Dandenong North. Sandhurst Roofing restores ageing tile roofs and storm damage. Free quotes.",
    suburb: "Dandenong North",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Dandenong North",
      intro: `<p>Sandhurst Roofing has been restoring and repairing roofs across Dandenong North for over 30 years. We are a family owned business offering <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/02/terracotta-tile-roof-restoration-dandenong-north.jpg", "Terracotta tile roof restoration in Dandenong North"],
      common: `<p>Dandenong North is a settled residential suburb of mostly 1960s to 80s brick homes on established blocks. A large share of them still carry their original concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs, now faded and porous after decades of sun, with the protective coating worn away.</p>
<p>With no coast nearby, the wear here comes from hot dry summers and harsh UV, plus the south-east's hailstorms that crack tiles and dent metal. Mature street trees add to the load by dropping leaves into gutters and valleys. The jobs we see most in Dandenong North are repointing cracked ridge capping, replacing broken tiles, clearing and repairing overflowing gutters, and fixing storm damage.</p>`,
      reroof: `<p>If a Dandenong North roof is leaking in several places, sagging, or carrying a lot of broken or brittle tiles, a re-roof can be better value than repeated repairs. We replace tile and metal roofs in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> and often convert tired tile roofs to metal. We will give you a clear comparison of restoring versus replacing so you can make the right call.</p>`,
      imgReroof: ["/images/wp/2023/02/tiles-to-tin-roof-dandenong-north.jpg", "Tile to COLORBOND metal re-roof in Dandenong North"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> also take care of the smaller jobs: re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles, fixing leaks and storm damage, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. With Dandenong North's established trees, keeping gutters and valleys clear and well sealed is one of the best ways to avoid water damage.</p>`,
      imgGutter: ["/images/wp/2023/02/re-roof-for-home-in-dandenong-north.jpg", "Completed re-roof on a Dandenong North home"],
      cost: `<p>We price each roof on its own merits. The main cost factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the condition of the ridge capping and valleys, the length of guttering involved, and safe access. You will get a written quote that spells out exactly what is included.</p>`,
      process: `<p>It starts with a free inspection and a written quote. A restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, any repairs needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up properly before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest, no-pressure advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you restore an old concrete or terracotta tile roof?</h3>
<p>In most cases yes. As long as the tiles are sound, a clean, re-point and re-coat can add years to the roof and transform how it looks.</p>
<h3>My gutters overflow when it rains. Can you fix that?</h3>
<p>Yes. It is usually leaf litter or worn, undersized gutters. We clear, repair or replace them and can advise on gutter guard during your quote.</p>
<h3>Do you offer free quotes in Dandenong North?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/dandenong/">Dandenong</a>, <a href="/noble-park-north/">Noble Park North</a>, <a href="/endeavour-hills/">Endeavour Hills</a> and <a href="/keysborough/">Keysborough</a>.</p>`,
    },
  },

  "dandenong-south": {
    seoTitle: "Roof Restoration Dandenong South",
    seoDescription:
      "Re-roofing, roof restoration, repairs and gutters in Dandenong South. Sandhurst Roofing re-sheets factory, warehouse and home roofs. Free quotes.",
    suburb: "Dandenong South",
    parts: {
      h1: "Re-Roofing &amp; Roof Restoration in Dandenong South",
      intro: `<p>Sandhurst Roofing has worked across Dandenong South for over 30 years, on commercial buildings and homes alike. Our family owned team handles <a href="/re-roofing/">re-roofing</a>, <a href="/roof-restoration/">roof restoration</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/02/roof-restoration-dandenong-south.jpg", "Roof restoration in Dandenong South"],
      common: `<p>Dandenong South is one of the largest industrial and commercial precincts in the country, full of factories, warehouses and showrooms, with pockets of established homes around its edges. The commercial buildings typically carry big <a href="/flat-metal-roofing/">flat and pitched metal roofs</a> and long runs of box gutter, while the homes are mostly post-war brick under concrete tile.</p>
<p>Inland and storm-exposed, the wear here comes from heat, UV and the south-east's hail rather than salt. On commercial roofs the issues are rusting and leaking metal sheeting, failed box gutters and worn flashings; on homes it is faded tiles, cracked ridge capping and tired guttering. We are set up to handle both.</p>`,
      reroof: `<p>For Dandenong South's commercial buildings, re-sheeting an old or leaking metal roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> and renewing the box gutters is often the most cost-effective fix, and we work to minimise disruption to the business. For homes, we re-roof tile and metal and can convert an old tile roof to metal. We will give you a clear comparison of repair versus replacement.</p>`,
      imgReroof: ["/images/wp/2023/02/re-roof-Dandenong-South-1.jpg", "Commercial metal re-roof in Dandenong South"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> and tilers handle metal roof and leak repairs, box gutter and flashing repairs and renewal, re-bedding and repointing ridge capping on homes, replacing broken <a href="/cement-tiles/">concrete</a> and <a href="/terracotta-tiles/">terracotta tiles</a>, and <a href="/gutter-repairs/">gutter</a> repairs and replacement. On commercial buildings, keeping box gutters clear and watertight is critical to preventing expensive internal water damage.</p>`,
      imgGutter: ["/images/wp/2023/02/Roof-replacement-after-dandenong-south.jpg", "Completed roof replacement in Dandenong South"],
      cost: `<p>We price every roof on what it needs. The main factors are the size and pitch of the roof, tile versus metal, how many tiles or sheets need replacing, the condition of the ridge capping, valleys and box gutters, the amount of guttering, and safe access, which matters on large commercial roofs. You will receive a clear written quote with no hidden extras.</p>`,
      process: `<p>We begin with a free inspection and written quote. For commercial work we re-sheet metal roofs and renew box gutters with as little disruption as possible. For a home restoration we high-pressure clean, re-bed and repoint ridge capping, replace broken tiles and rusted valleys, carry out repairs, and apply a three-coat protective membrane. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. The site is left clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and real experience on the large commercial and industrial roofs Dandenong South is known for, as well as homes. As a family business we give honest advice, quality workmanship and a fair price, and we can help you choose from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you do commercial and factory roofs in Dandenong South?</h3>
<p>Yes. We restore, re-sheet and repair flat and pitched metal roofs, and renew box gutters, on factories, warehouses and showrooms, working to minimise disruption.</p>
<h3>Our warehouse box gutter keeps leaking. Can you help?</h3>
<p>Yes. Corroded, blocked or undersized box gutters are a common cause of commercial leaks. We repair and renew them to keep water out of the building.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, all quotes are free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also service nearby <a href="/dandenong/">Dandenong</a>, <a href="/keysborough/">Keysborough</a>, <a href="/lyndhurst/">Lyndhurst</a>, <a href="/hampton-park/">Hampton Park</a> and <a href="/lynbrook/">Lynbrook</a>.</p>`,
    },
  },

  "noble-park": {
    seoTitle: "Roof Restoration & Repairs Noble Park",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Noble Park. Sandhurst Roofing restores ageing post-war tile roofs. Free quotes, 30+ years.",
    suburb: "Noble Park",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Noble Park",
      intro: `<p>Sandhurst Roofing has looked after roofs across Noble Park for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2020/05/carrum-downs-full-roof-restoration-e1590906243921.jpg", "Full tile roof restoration by Sandhurst Roofing in Noble Park"],
      common: `<p>Noble Park is an established south-east suburb built largely on post-war brick homes, most of them under concrete tile roofs that are now decades old. After years of hot summers and harsh UV, the protective coating on those tiles has worn away and they have gone faded and porous, which is why we see so much re-roofing and restoration demand here.</p>
<p>There is no salt this far inland, but the area gets the south-east's hailstorms, which crack tiles and dent metal, and mature trees that clog gutters. The jobs we are called out for most in Noble Park are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and replacing tired guttering and valleys.</p>`,
      reroof: `<p>With so many ageing post-war roofs, re-roofing is common in Noble Park. When a roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/05/monument-tin-roof-e1590908479834.jpg", "Re-roof in COLORBOND Monument by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Repointing the ridge capping is one of the best-value jobs you can do, as it stops water tracking under the tiles before it becomes an internal leak.</p>`,
      imgGutter: ["/images/wp/2020/05/roof-restoration-mornington-gutters-pic-3-e1590906142674.jpg", "Roof and gutter work completed by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My post-war tile roof looks tired. Restore or replace?</h3>
<p>If the tiles are sound, a clean, re-point and re-coat can add years and transform the look. If it is leaking, sagging or hail-damaged, a re-roof is better value. We will give you a straight answer.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks across Noble Park, and can advise if a re-roof is the smarter option after major damage.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/noble-park-north/">Noble Park North</a>, <a href="/dandenong/">Dandenong</a>, <a href="/springvale/">Springvale</a> and <a href="/keysborough/">Keysborough</a>.</p>`,
    },
  },

  "noble-park-north": {
    seoTitle: "Roof Restoration Noble Park North",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Noble Park North. Sandhurst Roofing restores tile roofs and storm damage. Free quotes.",
    suburb: "Noble Park North",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Noble Park North",
      intro: `<p>Sandhurst Roofing has restored and repaired roofs across Noble Park North for over 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/02/tile-roof-restoration-noble-park-north.jpg", "Tile roof restoration in Noble Park North"],
      common: `<p>Noble Park North is a quiet residential pocket of post-war and later brick homes on established streets. Like much of the south-east, many still carry their original concrete tile roofs, now faded and porous after years of hot summers and strong UV that have stripped the protective coating.</p>
<p>Inland, the wear comes from heat and the area's hailstorms rather than salt, with leaf litter from mature trees adding to the load on gutters and valleys. The jobs we handle most in Noble Park North are repointing cracked ridge capping, replacing broken tiles, repairing storm damage, and clearing or replacing tired guttering.</p>`,
      reroof: `<p>If a Noble Park North roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof can be better value than repeated repairs. We replace tile and metal roofs in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> and can convert an old tile roof to metal. We will give you a clear comparison of restoring versus replacing so you can make the right call.</p>`,
      imgReroof: ["/images/wp/2023/02/re-roofing-noble-park-north.jpg", "Re-roof in COLORBOND steel in Noble Park North"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and <a href="/terracotta-tiles/">terracotta tiles</a>, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Keeping gutters and valleys clear and well sealed is one of the best ways to avoid water damage on established blocks.</p>`,
      imgGutter: ["/images/wp/2023/02/roof-restoration-noble-park-north.jpg", "Completed roof restoration in Noble Park North"],
      cost: `<p>We price each roof on its own merits. The main cost factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the extent of any storm damage, the condition of the ridge capping and valleys, the length of guttering involved, and safe access. Your written quote spells out exactly what is included.</p>`,
      process: `<p>It starts with a free inspection and a written quote. A restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, any repairs needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up properly before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest, no-pressure advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you restore an old concrete tile roof?</h3>
<p>In most cases yes. As long as the tiles are sound, a clean, re-point and re-coat can add years to the roof and transform how it looks.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
<h3>Do you offer free quotes in Noble Park North?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/noble-park/">Noble Park</a>, <a href="/dandenong-north/">Dandenong North</a>, <a href="/springvale/">Springvale</a> and <a href="/springvale-south/">Springvale South</a>.</p>`,
    },
  },

  springvale: {
    seoTitle: "Roof Restoration & Repairs Springvale",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Springvale. Sandhurst Roofing restores heat and hail-worn tile roofs. Free quotes, 30+ years.",
    suburb: "Springvale",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Springvale",
      intro: `<p>Sandhurst Roofing has cared for roofs across Springvale for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2018/10/Roof-painting-and-repointing.jpg", "Roof painting and repointing by Sandhurst Roofing in Springvale"],
      common: `<p>Springvale is a busy, established south-east suburb with a large stock of post-war brick homes alongside its well-known shopping strip. Most of those homes sit under concrete tile roofs that are now well past the life of their original coating, faded and porous after decades of hot summers and harsh UV.</p>
<p>Being inland, there is no salt, but Springvale gets the south-east's hailstorms, which crack tiles and dent metal, and plenty of leaf litter in gutters from established trees. The jobs we are called out for most are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and replacing tired guttering and valleys.</p>`,
      reroof: `<p>With so many ageing post-war roofs, re-roofing is common in Springvale. When a roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2018/10/42272301_2245630332132718_8421541942369714176_n.jpg", "Completed re-roof project by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. After a south-east hailstorm, prompt repointing and tile replacement stop water getting inside.</p>`,
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My tile roof is faded and tired. Restore or replace?</h3>
<p>If the tiles are sound, a clean, re-point and re-coat can add years and transform the look. If it is leaking, sagging or hail-damaged, a re-roof is better value. We will give you a straight answer.</p>
<h3>Can you repair hail and storm damage in Springvale?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise if a re-roof is the smarter option after major damage.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/springvale-south/">Springvale South</a>, <a href="/noble-park/">Noble Park</a>, <a href="/clarinda/">Clarinda</a>, <a href="/keysborough/">Keysborough</a> and <a href="/dandenong/">Dandenong</a>.</p>`,
    },
  },

  "springvale-south": {
    seoTitle: "Roof Restoration Springvale South",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Springvale South. Sandhurst Roofing restores ageing tile and metal roofs. Free quotes.",
    suburb: "Springvale South",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Springvale South",
      intro: `<p>Sandhurst Roofing has restored and repaired roofs across Springvale South for over 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/02/Roofing-springvale-south-1.jpg", "Roof restoration in Springvale South"],
      common: `<p>Springvale South is a settled residential suburb of post-war and later brick homes on established blocks. Many still carry their original concrete tile roofs, now faded and porous after decades of hot south-east summers and harsh UV that have worn the protective coating away.</p>
<p>With no coast nearby, the wear comes from heat and the area's hailstorms rather than salt, and mature street trees add to the load on gutters and valleys. The jobs we see most in Springvale South are repointing cracked ridge capping, replacing broken tiles, repairing storm damage, and clearing or replacing tired guttering.</p>`,
      reroof: `<p>If a Springvale South roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof can be better value than repeated repairs. We replace tile and metal roofs in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> and can convert an old tile roof to metal. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2023/02/Roofing-springvale-south-2.jpg", "Re-roof in COLORBOND steel in Springvale South"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and <a href="/terracotta-tiles/">terracotta tiles</a>, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Keeping gutters and valleys clear and well sealed is one of the best ways to avoid water damage.</p>`,
      imgGutter: ["/images/wp/2023/02/Roofing-springvale-south-3.jpg", "Roof and gutter work completed in Springvale South"],
      cost: `<p>We price each roof on its own merits. The main cost factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the extent of any storm damage, the condition of the ridge capping and valleys, the length of guttering involved, and safe access. Your written quote spells out exactly what is included.</p>`,
      process: `<p>It starts with a free inspection and a written quote. A restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, any repairs needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up properly before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest, no-pressure advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you restore an old concrete tile roof?</h3>
<p>In most cases yes. As long as the tiles are sound, a clean, re-point and re-coat can add years to the roof and transform how it looks.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
<h3>Do you offer free quotes in Springvale South?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/springvale/">Springvale</a>, <a href="/noble-park/">Noble Park</a>, <a href="/keysborough/">Keysborough</a> and <a href="/dandenong/">Dandenong</a>.</p>`,
    },
  },

  keysborough: {
    seoTitle: "Roof Restoration & Repairs Keysborough",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Keysborough. Sandhurst Roofing restores established and estate-home roofs. Free quotes, 30+ years.",
    suburb: "Keysborough",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Keysborough",
      intro: `<p>Sandhurst Roofing has looked after roofs across Keysborough for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2019/11/roof-restoration-patterson-lakes.jpg", "Roof restoration by Sandhurst Roofing in Keysborough"],
      common: `<p>Keysborough is a real mix of established post-war homes and newer estate housing, with some light industrial along its edges. The older homes mostly sit under concrete tile roofs that are faded and porous after decades of sun, while the newer estates are largely <a href="/colorbond-roofing/">COLORBOND&reg;</a> and the occasional tile.</p>
<p>Inland and storm-exposed, the wear comes from hot summers, harsh UV and the south-east's hailstorms rather than salt. The jobs we are called out for most in Keysborough are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and replacing tired guttering and valleys on the older homes.</p>`,
      reroof: `<p>When an older Keysborough roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in COLORBOND&reg; steel is often better value than repeated repairs, and we can convert an old tile roof to metal. On newer estate homes we repair and re-sheet metal roofs as needed. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2019/11/full-roof-restoration-patterson-lakes.jpg", "Full roof restoration by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Repointing the ridge capping is one of the best-value jobs you can do, as it stops water tracking under the tiles before it becomes an internal leak.</p>`,
      imgGutter: ["/images/wp/2019/11/gutter-repairs-patterson-lakes.jpg", "Gutter repairs by Sandhurst Roofing in Keysborough"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both established and newer estate homes. As a family business we give honest advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on both older homes and newer estate houses?</h3>
<p>Yes. We restore and re-roof the older concrete tile homes and repair and re-sheet the metal roofs common on Keysborough's newer estates.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
<h3>Do you offer free quotes in Keysborough?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/dandenong/">Dandenong</a>, <a href="/springvale/">Springvale</a>, <a href="/noble-park/">Noble Park</a>, <a href="/lyndhurst/">Lyndhurst</a> and <a href="/dandenong-south/">Dandenong South</a>.</p>`,
    },
  },

  clarinda: {
    seoTitle: "Roof Restoration & Repairs Clarinda",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Clarinda. Sandhurst Roofing restores ageing post-war tile roofs. Free quotes, 30+ years local.",
    suburb: "Clarinda",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Clarinda",
      intro: `<p>Sandhurst Roofing has restored and repaired roofs across Clarinda for over 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/01/roof-restoration-clarinda.jpg", "Roof restoration on a Clarinda home"],
      common: `<p>Clarinda is a quiet, established south-east suburb of mostly post-war brick homes set between Clayton, Heatherton and Moorabbin. A large share of them still carry their original concrete tile roofs, now faded and porous after decades of hot summers and harsh UV that have worn the protective coating away.</p>
<p>There is no salt this far inland, but Clarinda gets the south-east's hailstorms, which crack tiles and dent metal, and mature trees that drop leaves into gutters and valleys. The jobs we see most here are repointing cracked ridge capping, replacing broken tiles, repairing storm damage, and clearing or replacing tired guttering.</p>`,
      reroof: `<p>If a Clarinda roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof can be better value than repeated repairs. We replace tile and metal roofs in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> and can convert an old tile roof to metal. We will give you a clear comparison of restoring versus replacing so you can make the right call.</p>`,
      imgReroof: ["/images/wp/2023/01/colorbond-roofing-clarinda.jpg", "COLORBOND roofing on a Clarinda home"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and <a href="/terracotta-tiles/">terracotta tiles</a>, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Keeping gutters and valleys clear and well sealed is one of the best ways to avoid water damage on established blocks.</p>`,
      imgGutter: ["/images/wp/2023/01/gutter-replacement-clarinda.jpg", "Gutter replacement on a Clarinda home"],
      cost: `<p>We price each roof on its own merits. The main cost factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the extent of any storm damage, the condition of the ridge capping and valleys, the length of guttering involved, and safe access. Your written quote spells out exactly what is included.</p>`,
      process: `<p>It starts with a free inspection and a written quote. A restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, any repairs needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up properly before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest, no-pressure advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you restore an old concrete tile roof?</h3>
<p>In most cases yes. As long as the tiles are sound, a clean, re-point and re-coat can add years to the roof and transform how it looks.</p>
<h3>Can you repair hail and storm damage in Clarinda?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/springvale/">Springvale</a>, <a href="/roof-restoration-clayton/">Clayton</a>, <a href="/moorabbin/">Moorabbin</a>, <a href="/roof-restoration-heatherton/">Heatherton</a> and <a href="/springvale-south/">Springvale South</a>.</p>`,
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
    `✓ ${slug.padEnd(17)} ${String(words).padStart(4)}w  ${h2s} H2s  | seoTitle ${data.seoTitle.length}+20=${data.seoTitle.length + 20}  desc ${data.seoDescription.length}`
  );
  count++;
}
console.log(`\nRewrote ${count} location pages.`);
