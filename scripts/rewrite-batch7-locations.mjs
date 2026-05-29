#!/usr/bin/env node
/**
 * Batch 7 location-page rewrites: established Casey suburbs + Narre Warren
 * cluster + Frankston edge:
 * narre-warren, narre-warren-north, narre-warren-south, berwick, beaconsfield,
 * endeavour-hills, hallam, hampton-park, karingal, sandhurst, devon-meadows.
 *
 * Same structure/quality bar as batches 1-6 (~650-720 words, 11 unique
 * suburb-tagged H2s each). Differentiated by real local character:
 *   - established hub, tile + metal mix: narre-warren
 *   - leafy semi-rural hills, larger blocks + sheds: narre-warren-north,
 *     beaconsfield, devon-meadows
 *   - estate housing (tile + metal): narre-warren-south, hampton-park,
 *     endeavour-hills
 *   - established leafy township + estates: berwick
 *   - older homes + industrial pocket, pergola/verandah work: hallam
 *   - established 1970s Frankston suburb: karingal
 *   - gated golf-course estate, prestige homes: sandhurst
 *
 * Inland angle: heat/UV and the south-east hail belt, not salt. Guardrails:
 * no fabricated stats/projects, real testimonials only, Australian spelling,
 * no em dashes. Defensible real geography/climate only. Images reuse each
 * page's existing photos with work-descriptive alt text.
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
  `<p>Sandhurst Roofing has looked after roofs across ${s} and Melbourne's south-east for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`;

const costStd = `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm or hail damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will show you exactly what your quote covers.</p>`;

const costRural = `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm or hail damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger and treed blocks. We will walk you through exactly what your quote covers.</p>`;

const processStd = `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`;

const faqQuote = `<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`;

const hailFaq = `<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>`;

const HM = ["/images/wp/2020/06/roof-restoration-hastings-pic-1-e1591699492946.jpg", "/images/wp/2020/06/roof-restoration-hastings-pic-2-e1591699524929.jpg", "/images/wp/2020/06/roof-restoration-mornington-18-05-pic-4-e1591699867906.jpg", "/images/wp/2020/06/roof-restoration-mornington-18-05-pic-3-e1591700021118.jpg"];
const CB = ["/images/wp/2020/05/carrum-downs-full-roof-restoration-e1590906243921.jpg", "/images/wp/2020/05/roof-restoration-mornington-gutters-pic-3-e1590906142674.jpg", "/images/wp/2020/05/monument-tin-roof-e1590908479834.jpg", "/images/wp/2020/05/re-roof-frankston-north-pic-2-e1590908392436.jpg"];

const pages = {
  "narre-warren": {
    seoTitle: "Roof Restoration & Repairs Narre Warren",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Narre Warren. Sandhurst Roofing restores tile and metal roofs. Free quotes, 30+ years.",
    suburb: "Narre Warren",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Narre Warren",
      intro: introStd("Narre Warren"),
      imgIntro: ["/images/wp/2020/06/new-slotted-gutter-and-rebedding-3-e1591697034396.jpg", "New slotted guttering and ridge re-bedding by Sandhurst Roofing in Narre Warren"],
      common: `<p>Narre Warren is one of the established hubs of the City of Casey, built out from the 1980s through the 2000s around the Fountain Gate town centre. That gives a real mix of roofs, from concrete tile on the older brick-veneer homes to <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel across the newer estates. Set well inland, the roofs here deal with heat, harsh UV and the south-east's hailstorms rather than salt.</p>
<p>The jobs we are called out for most in Narre Warren are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, restoring faded tile roofs, and replacing tired guttering and downpipes.</p>`,
      reroof: `<p>When an older Narre Warren tile roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer homes. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/06/gutters-and-downpipes-e1591696773253.jpg", "New gutters and downpipes by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on older and newer homes alike.</p>`,
      imgGutter: ["/images/wp/2020/06/new-gutter-and-downpipes-patterson-lakes-pic-5-e1591696642169.jpg", "New guttering and downpipes by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both the older tile homes and the metal roofs common across Narre Warren's newer estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on both tile and metal roofs?</h3>
<p>Yes. We restore and re-roof the older concrete tile homes and repair and re-sheet the metal roofs on Narre Warren's newer estates.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/narre-warren-north/">Narre Warren North</a>, <a href="/narre-warren-south/">Narre Warren South</a>, <a href="/berwick/">Berwick</a>, <a href="/endeavour-hills/">Endeavour Hills</a>, <a href="/hampton-park/">Hampton Park</a> and <a href="/hallam/">Hallam</a>.</p>`,
    },
  },

  "narre-warren-north": {
    seoTitle: "Roof Restoration Narre Warren North",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Narre Warren North. Sandhurst Roofing restores leafy acreage homes and shed roofs. Free quotes.",
    suburb: "Narre Warren North",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Narre Warren North",
      intro: introStd("Narre Warren North"),
      imgIntro: ["/images/wp/2023/02/re-roof-for-home-in-Narre-Warren-North.jpg", "Re-roof for a home in Narre Warren North by Sandhurst Roofing"],
      common: `<p>Narre Warren North is the leafy, semi-rural side of the area, where the housing thins out into larger blocks and rural-residential acreage on the hills toward Lysterfield. Homes here tend to be bigger and set among established gums and garden trees, often with a shed, studio or garage alongside. Set inland and well treed, the roofs deal with heat, harsh UV, the south-east's hailstorms and heavy gum-leaf litter rather than salt.</p>
<p>The jobs we are called out for most in Narre Warren North are clearing and replacing leaf-filled gutters and valleys, repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and restoring or re-sheeting larger home and shed roofs.</p>`,
      reroof: `<p>On a larger, treed block, a roof that is leaking, sagging or carrying widespread storm or hail damage is often better re-roofed in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> than repeatedly patched, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds and studios. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2023/02/re-roof-Narre-Warren-North-3.jpg", "Completed re-roof in Narre Warren North by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and studios. On treed acreage, keeping gutters and valleys clear and draining is a constant job.</p>`,
      imgGutter: ["/images/wp/2023/02/flat-metal-roofing-Narre-Warren-North-2.jpg", "Flat metal roofing in Narre Warren North by Sandhurst Roofing"],
      cost: costRural,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger homes, sheds and steeper, treed blocks. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My gutters keep filling with gum leaves. Can you help?</h3>
<p>Yes. We clear and replace gutters and valleys and can talk you through gutter guard options suited to heavily treed blocks.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/narre-warren/">Narre Warren</a>, <a href="/narre-warren-south/">Narre Warren South</a>, <a href="/endeavour-hills/">Endeavour Hills</a>, <a href="/berwick/">Berwick</a>, <a href="/beaconsfield/">Beaconsfield</a> and <a href="/hallam/">Hallam</a>.</p>`,
    },
  },

  "narre-warren-south": {
    seoTitle: "Roof Restoration Narre Warren South",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Narre Warren South. Sandhurst Roofing restores estate tile and metal roofs. Free quotes.",
    suburb: "Narre Warren South",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Narre Warren South",
      intro: introStd("Narre Warren South"),
      imgIntro: [CB[0], "Full tile roof restoration by Sandhurst Roofing in Narre Warren South"],
      common: `<p>Narre Warren South is largely estate housing, built out through the 1990s and 2000s around Casey Central and the Amberley Park and Strathaird estates. Most homes carry concrete tile or <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel roofs that are now old enough for the first round of maintenance and restoration. Set well inland, they deal with heat, harsh UV and the south-east's hailstorms rather than salt.</p>
<p>The jobs we are called out for most in Narre Warren South are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, restoring faded tile roofs, and replacing tired guttering and downpipes.</p>`,
      reroof: `<p>When a Narre Warren South roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert a tile roof to metal. We also re-sheet existing metal roofs. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: [CB[2], "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement.</p>`,
      imgGutter: [CB[1], "Roof restoration and new guttering by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both the tile and metal roofs common across Narre Warren South's estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My estate home is from the 1990s. Is my roof due for a restoration?</h3>
<p>Quite likely. Tile roofs of that age often have worn coating and cracked pointing. A restoration cleans, re-points and recoats the roof so it sheds water and looks new again.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/narre-warren/">Narre Warren</a>, <a href="/narre-warren-north/">Narre Warren North</a>, <a href="/hampton-park/">Hampton Park</a>, <a href="/berwick/">Berwick</a>, <a href="/endeavour-hills/">Endeavour Hills</a> and <a href="/cranbourne-north/">Cranbourne North</a>.</p>`,
    },
  },

  berwick: {
    seoTitle: "Roof Restoration & Repairs Berwick",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Berwick. Sandhurst Roofing restores established township and estate roofs. Free quotes.",
    suburb: "Berwick",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Berwick",
      intro: introStd("Berwick"),
      imgIntro: [HM[0], "Tile roof restoration by Sandhurst Roofing in Berwick"],
      common: `<p>Berwick blends a leafy, established township with newer estates spreading out around Berwick Springs and toward the hills. That gives a wide range of roofs, from older brick and period homes under concrete and <a href="/terracotta-tiles/">terracotta</a> tile through to <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel on the newer estates. With its mature street trees and elevated streets, Berwick roofs deal with heat, the south-east's hailstorms and steady leaf litter rather than salt.</p>
<p>The jobs we are called out for most in Berwick are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, clearing and replacing leaf-filled gutters, and restoring faded tile roofs.</p>`,
      reroof: `<p>When an older Berwick tile roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer estate homes. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: [HM[2], "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken terracotta and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on older and newer homes alike.</p>`,
      imgGutter: [HM[1], "Roof restoration and repointing by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both the older period and tile homes around the township and the metal roofs on Berwick's newer estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on older period homes as well as estate houses?</h3>
<p>Yes. We restore and re-roof the older tile and period homes around the township and repair and re-sheet the metal roofs on Berwick's newer estates.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/beaconsfield/">Beaconsfield</a>, <a href="/officer/">Officer</a>, <a href="/narre-warren/">Narre Warren</a>, <a href="/narre-warren-south/">Narre Warren South</a>, <a href="/endeavour-hills/">Endeavour Hills</a> and <a href="/pakenham/">Pakenham</a>.</p>`,
    },
  },

  beaconsfield: {
    seoTitle: "Roof Restoration & Repairs Beaconsfield",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Beaconsfield. Sandhurst Roofing restores leafy homes and acreage shed roofs. Free quotes.",
    suburb: "Beaconsfield",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Beaconsfield",
      intro: introStd("Beaconsfield"),
      imgIntro: [HM[1], "Tile roof restoration by Sandhurst Roofing in Beaconsfield"],
      common: `<p>Beaconsfield runs from an established township up into leafy, semi-rural blocks toward the Cardinia hills. Many homes here sit on larger, treed allotments, often with a shed or studio alongside, mixing older tile homes with newer <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel. Set inland at the foot of the ranges, the roofs deal with heat, the south-east's hailstorms and heavy gum-leaf litter rather than salt.</p>
<p>The jobs we are called out for most in Beaconsfield are clearing and replacing leaf-filled gutters and valleys, repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and restoring or re-sheeting larger home and shed roofs.</p>`,
      reroof: `<p>On a larger, treed Beaconsfield block, a roof that is leaking, sagging or carrying widespread storm or hail damage is often better re-roofed in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> than repeatedly patched, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds and studios. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: [HM[3], "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and studios. On treed blocks, keeping gutters and valleys clear and draining is a constant job.</p>`,
      imgGutter: [HM[0], "Roof restoration and new guttering by Sandhurst Roofing"],
      cost: costRural,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger homes, sheds and treed blocks. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My block is leafy and my gutters keep clogging. Can you help?</h3>
<p>Yes. We clear and replace gutters and valleys and can talk you through gutter guard options suited to heavily treed blocks.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/berwick/">Berwick</a>, <a href="/officer/">Officer</a>, <a href="/pakenham/">Pakenham</a>, <a href="/narre-warren/">Narre Warren</a>, <a href="/narre-warren-north/">Narre Warren North</a> and <a href="/endeavour-hills/">Endeavour Hills</a>.</p>`,
    },
  },

  "endeavour-hills": {
    seoTitle: "Roof Restoration Endeavour Hills",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Endeavour Hills. Sandhurst Roofing restores established tile and metal roofs. Free quotes.",
    suburb: "Endeavour Hills",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Endeavour Hills",
      intro: introStd("Endeavour Hills"),
      imgIntro: [HM[3], "Tile roof restoration by Sandhurst Roofing in Endeavour Hills"],
      common: `<p>Endeavour Hills is an established suburb built largely through the 1980s and 1990s on the rolling ground between Dandenong and the Dandenong Ranges foothills. Most homes are brick-veneer under concrete tile, with some metal roofs among the newer builds. Set inland on elevated, often steeper streets, the roofs here deal with heat, harsh UV and the south-east's hailstorms rather than salt.</p>
<p>The jobs we are called out for most in Endeavour Hills are repointing cracked ridge capping, replacing broken tiles, restoring faded and porous tile roofs, storm and hail repairs, and replacing tired guttering and downpipes.</p>`,
      reroof: `<p>When an Endeavour Hills tile roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet existing metal roofs. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: [HM[0], "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement.</p>`,
      imgGutter: [HM[2], "Roof restoration and repointing by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on the established tile homes and steeper streets common across Endeavour Hills. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My 1990s tile roof looks faded and patchy. Can you restore it?</h3>
<p>Yes. A restoration high-pressure cleans, re-points and recoats the roof with a three-coat protective membrane so it sheds water and looks new again.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/narre-warren/">Narre Warren</a>, <a href="/narre-warren-north/">Narre Warren North</a>, <a href="/hallam/">Hallam</a>, <a href="/berwick/">Berwick</a>, <a href="/dandenong-north/">Dandenong North</a> and <a href="/hampton-park/">Hampton Park</a>.</p>`,
    },
  },

  hallam: {
    seoTitle: "Roof Restoration & Repairs Hallam",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Hallam. Sandhurst Roofing restores homes, sheds and verandah roofs. Free quotes, 30+ years.",
    suburb: "Hallam",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Hallam",
      intro: introStd("Hallam"),
      imgIntro: ["/images/wp/2018/10/roof-painting-and-re-pointing.jpg", "Roof painting and repointing by Sandhurst Roofing in Hallam"],
      common: `<p>Hallam sits between Dandenong and Narre Warren, a mix of established homes and a sizeable industrial and commercial pocket along the highway and rail line. The homes mostly sit under concrete tile, the newer builds under <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel, and there are plenty of larger metal roofs on the factories and warehouses nearby. Set well inland, the roofs here deal with heat, harsh UV and the south-east's hailstorms rather than salt.</p>
<p>The jobs we are called out for most in Hallam are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, replacing tired guttering, repairing verandah and pergola roofs, and re-sheeting larger shed and commercial roofs.</p>`,
      reroof: `<p>When an older Hallam tile roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer homes, sheds and commercial buildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2018/10/new-pergola-roof.jpg", "New pergola roof by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, verandah and pergola roofing, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and commercial buildings.</p>`,
      imgGutter: null,
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm or hail damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger shed and commercial roofs. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on homes, verandahs and pergolas, sheds and commercial buildings. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you do verandah, pergola and shed roofs?</h3>
<p>Yes. As well as house roofs we re-sheet and repair verandahs, pergolas, carports and larger shed and commercial roofs.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/narre-warren/">Narre Warren</a>, <a href="/endeavour-hills/">Endeavour Hills</a>, <a href="/hampton-park/">Hampton Park</a>, <a href="/dandenong-south/">Dandenong South</a>, <a href="/noble-park/">Noble Park</a> and <a href="/lyndhurst/">Lyndhurst</a>.</p>`,
    },
  },

  "hampton-park": {
    seoTitle: "Roof Restoration & Repairs Hampton Park",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Hampton Park. Sandhurst Roofing restores established tile and metal roofs. Free quotes.",
    suburb: "Hampton Park",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Hampton Park",
      intro: introStd("Hampton Park"),
      imgIntro: [CB[0], "Full tile roof restoration by Sandhurst Roofing in Hampton Park"],
      common: `<p>Hampton Park is an established City of Casey suburb built out mostly through the 1980s and 1990s, sitting between Dandenong, Lynbrook and Cranbourne. Most homes are brick-veneer under concrete tile, with metal roofs among the newer builds. Set well inland, the roofs here deal with heat, harsh UV and the south-east's hailstorms rather than salt, and many tile roofs are now well overdue for restoration.</p>
<p>The jobs we are called out for most in Hampton Park are repointing cracked ridge capping, replacing broken tiles, restoring faded and porous tile roofs, storm and hail repairs, and replacing tired guttering and downpipes.</p>`,
      reroof: `<p>When a Hampton Park tile roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet existing metal roofs. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: [CB[3], "Completed metal re-roof by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement.</p>`,
      imgGutter: [CB[1], "Roof restoration and new guttering by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on the established tile homes that make up most of Hampton Park. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My tile roof is from the 1980s and looks tired. Can you restore it?</h3>
<p>Yes. A restoration high-pressure cleans, re-points and recoats the roof with a three-coat protective membrane so it sheds water and looks new again.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/lynbrook/">Lynbrook</a>, <a href="/lyndhurst/">Lyndhurst</a>, <a href="/narre-warren/">Narre Warren</a>, <a href="/narre-warren-south/">Narre Warren South</a>, <a href="/cranbourne-north/">Cranbourne North</a> and <a href="/hallam/">Hallam</a>.</p>`,
    },
  },

  karingal: {
    seoTitle: "Roof Restoration & Repairs Karingal",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Karingal. Sandhurst Roofing restores established Frankston-area roofs. Free quotes, 30+ years.",
    suburb: "Karingal",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Karingal",
      intro: introStd("Karingal"),
      imgIntro: ["/images/wp/2019/11/carrum-downs-full-roof-restoration.jpg", "Full tile roof restoration by Sandhurst Roofing in Karingal"],
      common: `<p>Karingal is an established residential pocket on the eastern side of Frankston, built out largely through the 1970s. Most homes are brick-veneer under concrete tile, with some metal roofs among later builds. Set a little inland from the bay, the roofs here deal more with age, heat and harsh UV than with heavy salt exposure, and many of the original tile roofs are now well overdue for restoration.</p>
<p>The jobs we are called out for most in Karingal are repointing cracked ridge capping, replacing broken tiles, restoring faded and porous tile roofs, storm repairs, and replacing tired guttering and downpipes.</p>`,
      reroof: `<p>When an older Karingal tile roof is leaking, sagging or beyond economical repair, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet existing metal roofs. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2019/11/carrum-downs-roof-restoration.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement.</p>`,
      imgGutter: ["/images/wp/2019/11/roof-re-spray-carrum-downs.jpg", "Roof respray and protective coating by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we have worked across Frankston and Karingal for decades. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My 1970s tile roof looks tired and faded. Can you restore it?</h3>
<p>Yes. A restoration high-pressure cleans, re-points and recoats the roof with a three-coat protective membrane so it sheds water and looks new again.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/frankston/">Frankston</a>, <a href="/frankston-south/">Frankston South</a>, <a href="/langwarrin/">Langwarrin</a>, <a href="/seaford/">Seaford</a>, <a href="/carrum-downs/">Carrum Downs</a> and <a href="/skye/">Skye</a>.</p>`,
    },
  },

  sandhurst: {
    seoTitle: "Roof Restoration & Repairs Sandhurst",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Sandhurst. Sandhurst Roofing services prestige estate tile and COLORBOND roofs. Free quotes.",
    suburb: "Sandhurst",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Sandhurst",
      intro: introStd("Sandhurst"),
      imgIntro: ["/images/wp/2019/11/roof-restoration-chelsea-heights.jpg", "Full roof restoration by Sandhurst Roofing in Sandhurst"],
      common: `<p>Sandhurst is the gated golf-course estate on the Skye and Carrum Downs border, a community of newer, larger homes built around the course over the past couple of decades. Most carry quality concrete or <a href="/terracotta-tiles/">terracotta</a> tile and <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel roofs, often on substantial two-storey homes. Set inland of the bay, these roofs deal more with heat, harsh UV and the south-east's hailstorms than with salt.</p>
<p>The jobs we are called out for most in Sandhurst are repointing ridge capping, replacing broken tiles, storm and hail repairs, restoring tile roofs, and replacing or upgrading guttering on larger homes.</p>`,
      reroof: `<p>When a Sandhurst roof is leaking, carrying storm or hail damage, or due for replacement, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> can be the best long-term option, and we can convert a tile roof to metal. We also re-sheet existing metal roofs and restore quality tile roofs to keep them looking their best. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2019/11/colorbond-roofing-chelsea-heights.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken terracotta and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on larger, often two-storey homes.</p>`,
      imgGutter: ["/images/wp/2019/11/full-roof-restoration-chelsea-heights.jpg", "Completed full roof restoration by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm or hail damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger two-storey homes. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger, often two-storey homes. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on larger two-storey estate homes?</h3>
<p>Yes. We set up safe access for larger and two-storey roofs and factor it into your quote up front.</p>
${hailFaq}
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/skye/">Skye</a>, <a href="/carrum-downs/">Carrum Downs</a>, <a href="/frankston-north/">Frankston North</a>, <a href="/langwarrin/">Langwarrin</a>, <a href="/seaford/">Seaford</a> and <a href="/karingal/">Karingal</a>.</p>`,
    },
  },

  "devon-meadows": {
    seoTitle: "Roof Restoration Devon Meadows",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Devon Meadows. Sandhurst Roofing restores rural homes and shed roofs. Free quotes, 30+ years.",
    suburb: "Devon Meadows",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Devon Meadows",
      intro: introStd("Devon Meadows"),
      imgIntro: [CB[0], "Full tile roof restoration by Sandhurst Roofing in Devon Meadows"],
      common: `<p>Devon Meadows is rural-residential country between Cranbourne and Pearcedale, a patchwork of market gardens, nurseries and acreage homes set among open paddocks. The homes here are typically on larger blocks, almost always with a shed, glasshouse or machinery building alongside the house. Set inland, the roofs deal with heat, harsh UV, the south-east's hailstorms and leaf litter rather than salt.</p>
<p>The jobs we are called out for most in Devon Meadows are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, clearing and replacing leaf-filled gutters, and restoring or re-sheeting larger home and shed roofs.</p>`,
      reroof: `<p>On a larger rural roof that is leaking, sagging or carrying widespread storm or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated patching, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds and outbuildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: [CB[2], "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and outbuildings. On acreage blocks, keeping gutters and valleys clear and draining is a constant job.</p>`,
      imgGutter: [CB[1], "Roof restoration and new guttering by Sandhurst Roofing"],
      cost: costRural,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger rural homes, sheds and outbuildings. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on sheds and outbuildings as well as the house?</h3>
<p>Yes. We re-sheet, restore and repair metal roofs on sheds, glasshouses and farm buildings, as well as home roofs.</p>
<h3>My acreage gutters keep filling with leaves. Can you help?</h3>
<p>Yes. We clear and replace gutters and valleys and can talk you through gutter guard options for treed, rural blocks.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/cranbourne-south/">Cranbourne South</a>, <a href="/cranbourne/">Cranbourne</a>, <a href="/cranbourne-east/">Cranbourne East</a>, <a href="/clyde/">Clyde</a>, <a href="/hastings/">Hastings</a> and <a href="/roof-restoration-botanic-ridge/">Botanic Ridge</a>.</p>`,
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
    `✓ ${slug.padEnd(20)} ${String(words).padStart(4)}w  ${h2s} H2s  | seoTitle ${data.seoTitle.length}+20=${data.seoTitle.length + 20}  desc ${data.seoDescription.length}`
  );
  count++;
}
console.log(`\nRewrote ${count} location pages.`);
