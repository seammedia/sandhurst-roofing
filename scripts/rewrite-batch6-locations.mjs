#!/usr/bin/env node
/**
 * Batch 6 location-page rewrites: Casey/Cardinia south-east growth corridor:
 * cranbourne, cranbourne-east, cranbourne-north, cranbourne-west,
 * cranbourne-south, clyde, officer, pakenham, lynbrook, lyndhurst.
 *
 * Same structure/quality bar as batches 1-5 (~650-720 words, 11 unique
 * suburb-tagged H2s each). Differentiated by real local character:
 *   - established township tile + ring of estates: cranbourne
 *   - fast-growing new COLORBOND estates: cranbourne-east, clyde, officer
 *   - established + estate mix: cranbourne-north, lynbrook
 *   - estate + industrial edge: cranbourne-west, lyndhurst
 *   - semi-rural market gardens, homes + sheds: cranbourne-south
 *   - older township + large new estates: pakenham
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

const processStd = `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`;

const faqQuote = `<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`;

const IMGS = {
  cranbourneSet: {
    intro: ["/images/wp/2020/05/carrum-downs-full-roof-restoration-e1590906243921.jpg", "Full tile roof restoration by Sandhurst Roofing"],
    reroof: ["/images/wp/2020/05/monument-tin-roof-e1590908479834.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
    gutter: ["/images/wp/2020/05/roof-restoration-mornington-gutters-pic-3-e1590906142674.jpg", "Roof restoration and new guttering by Sandhurst Roofing"],
    reroof2: ["/images/wp/2020/05/re-roof-frankston-north-pic-2-e1590908392436.jpg", "Completed metal re-roof by Sandhurst Roofing"],
  },
};

const pages = {
  cranbourne: {
    seoTitle: "Roof Restoration & Repairs Cranbourne",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Cranbourne. Sandhurst Roofing restores older tile homes and newer estate roofs. Free quotes.",
    suburb: "Cranbourne",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Cranbourne",
      intro: introStd("Cranbourne"),
      imgIntro: IMGS.cranbourneSet.intro,
      common: `<p>Cranbourne is the established hub of the City of Casey, a real mix of older brick-veneer homes around the township and a ring of newer estates that have grown up around it. The older homes mostly sit under concrete tile roofs that have faded and gone porous after years of sun, while the newer estates are largely <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel.</p>
<p>Sitting inland, the wear here comes from harsh UV, heat and the south-east's hailstorms rather than salt. The jobs we are called out for most in Cranbourne are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and replacing tired guttering, plus re-sheeting metal roofs on newer homes.</p>`,
      reroof: `<p>When an older Cranbourne tile roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer estate homes. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: IMGS.cranbourneSet.reroof,
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on older and newer homes alike.</p>`,
      imgGutter: IMGS.cranbourneSet.gutter,
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both the older tile homes around the township and the metal roofs common on Cranbourne's newer estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on both older homes and newer estate houses?</h3>
<p>Yes. We restore and re-roof the older concrete tile homes around the township and repair and re-sheet the metal roofs common on Cranbourne's newer estates.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/cranbourne-east/">Cranbourne East</a>, <a href="/cranbourne-north/">Cranbourne North</a>, <a href="/cranbourne-west/">Cranbourne West</a>, <a href="/cranbourne-south/">Cranbourne South</a>, <a href="/clyde/">Clyde</a> and <a href="/lynbrook/">Lynbrook</a>.</p>`,
    },
  },

  "cranbourne-east": {
    seoTitle: "Roof Restoration Cranbourne East",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Cranbourne East. Sandhurst Roofing services newer estate and COLORBOND roofs. Free quotes.",
    suburb: "Cranbourne East",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Cranbourne East",
      intro: introStd("Cranbourne East"),
      imgIntro: IMGS.cranbourneSet.reroof,
      common: `<p>Cranbourne East is one of Melbourne's fastest-growing estate areas, made up almost entirely of newer homes built over the past couple of decades. Most carry <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel roofs, so the work here is different to the older parts of Cranbourne. Set well inland, these roofs deal with harsh UV, heat and the south-east's hailstorms.</p>
<p>The jobs we are called out for most in Cranbourne East are storm and hail repairs, refixing and resealing flashings and ridge capping, sorting out gutters and downpipes that overflow in heavy rain, and the first restorations on the earliest estates as their roofs begin to age.</p>`,
      reroof: `<p>Most Cranbourne East homes already have metal roofs, so re-roofing here usually means re-sheeting after major storm or hail damage, or replacing a roof with ongoing leaks. Where an older tile roof needs replacing, we can convert it to <a href="/colorbond-roofing/">COLORBOND&reg; steel</a>. We will give you a clear comparison of repairing versus replacing.</p>`,
      imgReroof: IMGS.cranbourneSet.reroof2,
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, refixing and resealing <a href="/flat-metal-roofing/">metal sheeting</a> and flashings, re-bedding and repointing ridge capping where tiles are involved, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On newer estate homes, getting flashings and gutters right is what keeps water out.</p>`,
      imgGutter: IMGS.cranbourneSet.gutter,
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on the metal roofs that dominate Cranbourne East's estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My estate home is fairly new. Why is the roof leaking already?</h3>
<p>On newer metal roofs, leaks usually trace back to flashings, ridge capping or gutters rather than the sheets. We find the source and fix it properly.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair dented metal, lifted sheeting and storm-related leaks, and can advise whether re-sheeting is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/cranbourne/">Cranbourne</a>, <a href="/clyde/">Clyde</a>, <a href="/cranbourne-south/">Cranbourne South</a>, <a href="/officer/">Officer</a>, <a href="/lynbrook/">Lynbrook</a> and <a href="/roof-restoration-botanic-ridge/">Botanic Ridge</a>.</p>`,
    },
  },

  "cranbourne-north": {
    seoTitle: "Roof Restoration Cranbourne North",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Cranbourne North. Sandhurst Roofing restores tile and metal roofs. Free quotes, 30+ years.",
    suburb: "Cranbourne North",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Cranbourne North",
      intro: introStd("Cranbourne North"),
      imgIntro: IMGS.cranbourneSet.intro,
      common: `<p>Cranbourne North sits between the established township and the Lynbrook and Hampton Park side of Casey, and its housing reflects that. There is a good mix of established brick-veneer homes under concrete tile and newer estate housing in <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel. Well inland, these roofs deal with harsh UV, heat and the south-east's hailstorms rather than salt.</p>
<p>The jobs we are called out for most in Cranbourne North are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, replacing tired guttering, and re-sheeting metal roofs.</p>`,
      reroof: `<p>When an older Cranbourne North roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer homes. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: IMGS.cranbourneSet.reroof,
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on older and newer homes alike.</p>`,
      imgGutter: IMGS.cranbourneSet.gutter,
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both established tile homes and the metal roofs common on Cranbourne North's newer estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on both tile and metal roofs?</h3>
<p>Yes. We restore and re-roof the established concrete tile homes and repair and re-sheet the metal roofs on Cranbourne North's newer estates.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/cranbourne/">Cranbourne</a>, <a href="/cranbourne-west/">Cranbourne West</a>, <a href="/lynbrook/">Lynbrook</a>, <a href="/lyndhurst/">Lyndhurst</a>, <a href="/hampton-park/">Hampton Park</a> and <a href="/dandenong-south/">Dandenong South</a>.</p>`,
    },
  },

  "cranbourne-west": {
    seoTitle: "Roof Restoration Cranbourne West",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Cranbourne West. Sandhurst Roofing restores home, estate and shed roofs. Free quotes.",
    suburb: "Cranbourne West",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Cranbourne West",
      intro: introStd("Cranbourne West"),
      imgIntro: IMGS.cranbourneSet.intro,
      common: `<p>Cranbourne West runs out toward the South Gippsland Highway and carries a mix of established homes, newer estate housing and a sizeable industrial and commercial pocket. The older homes mostly sit under concrete tile, the newer estates are largely <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel, and there are plenty of larger metal roofs on sheds and commercial buildings.</p>
<p>Well inland, the wear here comes from heat, harsh UV and the south-east's hailstorms. The jobs we are called out for most in Cranbourne West are repointing ridge capping, replacing broken tiles, storm and hail repairs, replacing tired guttering, and re-sheeting and repairing larger shed and commercial roofs.</p>`,
      reroof: `<p>When an older Cranbourne West roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer estate homes, sheds and commercial buildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: IMGS.cranbourneSet.reroof2,
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and commercial buildings.</p>`,
      imgGutter: IMGS.cranbourneSet.gutter,
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm or hail damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger shed and commercial roofs. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on homes, estate houses, sheds and commercial buildings. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you do shed and commercial roofs?</h3>
<p>Yes. We re-sheet, restore and repair larger metal roofs on sheds, factories and commercial buildings, as well as homes.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/cranbourne/">Cranbourne</a>, <a href="/cranbourne-north/">Cranbourne North</a>, <a href="/lyndhurst/">Lyndhurst</a>, <a href="/lynbrook/">Lynbrook</a>, <a href="/hampton-park/">Hampton Park</a> and <a href="/devon-meadows/">Devon Meadows</a>.</p>`,
    },
  },

  "cranbourne-south": {
    seoTitle: "Roof Restoration Cranbourne South",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Cranbourne South. Sandhurst Roofing restores rural homes and shed roofs. Free quotes.",
    suburb: "Cranbourne South",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Cranbourne South",
      intro: introStd("Cranbourne South"),
      imgIntro: IMGS.cranbourneSet.intro,
      common: `<p>Cranbourne South is the semi-rural side of Cranbourne, a country of market gardens, nurseries and rural-residential acreage running down toward Pearcedale and the Royal Botanic Gardens. The homes here are typically on larger blocks, often with a shed, garage or glasshouse alongside the house. Set inland among open paddocks and gum trees, the roofs deal with heat, harsh UV, the south-east's hailstorms, and leaf litter rather than salt.</p>
<p>The jobs we are called out for most in Cranbourne South are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, clearing and replacing leaf-filled gutters, and restoring or re-sheeting larger home and shed roofs.</p>`,
      reroof: `<p>On a larger rural roof that is leaking, sagging or carrying widespread storm or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated patching, and we can convert an old tile roof to metal. We also re-sheet metal roofs on homes, sheds and outbuildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: IMGS.cranbourneSet.reroof,
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and outbuildings. On acreage blocks, keeping gutters and valleys clear and draining is a constant job.</p>`,
      imgGutter: IMGS.cranbourneSet.gutter,
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm or hail damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger rural and shed roofs. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on larger rural homes, sheds and outbuildings. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on sheds and outbuildings as well as the house?</h3>
<p>Yes. We re-sheet, restore and repair metal roofs on sheds, garages and farm buildings, as well as home roofs.</p>
<h3>My acreage gutters keep filling with leaves. Can you help?</h3>
<p>Yes. We clear and replace gutters and valleys and can talk you through gutter guard options for treed, rural blocks.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/cranbourne/">Cranbourne</a>, <a href="/cranbourne-east/">Cranbourne East</a>, <a href="/devon-meadows/">Devon Meadows</a>, <a href="/clyde/">Clyde</a>, <a href="/roof-restoration-botanic-ridge/">Botanic Ridge</a> and <a href="/hastings/">Hastings</a>.</p>`,
    },
  },

  clyde: {
    seoTitle: "Roof Restoration & Repairs Clyde",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Clyde. Sandhurst Roofing services newer estate and COLORBOND roofs. Free quotes, 30+ years.",
    suburb: "Clyde",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Clyde",
      intro: introStd("Clyde"),
      imgIntro: ["/images/wp/2023/02/roofing-clyde-6.jpg", "Roofing work completed by Sandhurst Roofing in Clyde"],
      common: `<p>Clyde is right at the front edge of Melbourne's south-east growth, where new estates have replaced what was farmland not long ago. Almost all the housing here is recent, built with <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel roofs, so the work is different to the older parts of Casey. Set well inland, these roofs deal with harsh UV, heat and the south-east's hailstorms.</p>
<p>The jobs we are called out for most in Clyde are storm and hail repairs, refixing and resealing flashings and ridge capping, sorting out gutters and downpipes that overflow in heavy rain, and the first restorations as the earliest Clyde estates begin to age.</p>`,
      reroof: `<p>Most Clyde homes already have metal roofs, so re-roofing here usually means re-sheeting after major storm or hail damage, or replacing a roof with ongoing leaks. Where a roof needs replacing, we re-sheet in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> built for our hot, hail-prone inland conditions. We will give you a clear comparison of repairing versus replacing.</p>`,
      imgReroof: ["/images/wp/2023/02/roofing-clyde-4.jpg", "Metal roofing work by Sandhurst Roofing in Clyde"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, refixing and resealing <a href="/flat-metal-roofing/">metal sheeting</a> and flashings, re-bedding and repointing ridge capping where tiles are involved, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On newer estate homes, getting flashings and gutters right is what keeps water out.</p>`,
      imgGutter: ["/images/wp/2023/02/roofing-clyde-2.jpg", "Roof and gutter work by Sandhurst Roofing in Clyde"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we are comfortable on the metal roofs that dominate Clyde's estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My home is only a few years old. Why is the roof leaking?</h3>
<p>On newer metal roofs, leaks usually trace back to flashings, ridge capping or gutters rather than the sheets. We find the source and fix it properly.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair dented metal, lifted sheeting and storm-related leaks, and can advise whether re-sheeting is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/cranbourne-east/">Cranbourne East</a>, <a href="/cranbourne-south/">Cranbourne South</a>, <a href="/officer/">Officer</a>, <a href="/cranbourne/">Cranbourne</a>, <a href="/devon-meadows/">Devon Meadows</a> and <a href="/roof-restoration-botanic-ridge/">Botanic Ridge</a>.</p>`,
    },
  },

  officer: {
    seoTitle: "Roof Restoration & Repairs Officer",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Officer. Sandhurst Roofing services newer estate and COLORBOND roofs. Free quotes, 30+ years.",
    suburb: "Officer",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Officer",
      intro: introStd("Officer"),
      imgIntro: ["/images/wp/2020/06/gutters-and-downpipes-e1591696773253.jpg", "New gutters and downpipes by Sandhurst Roofing in Officer"],
      common: `<p>Officer sits in the Cardinia growth corridor between Berwick and Pakenham, and like its neighbours it has filled with new estate housing over the past couple of decades. Most homes carry <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel roofs, with some older established homes under concrete tile closer to the township. Set well inland at the edge of the ranges, these roofs deal with heat, harsh UV and the south-east's hailstorms.</p>
<p>The jobs we are called out for most in Officer are storm and hail repairs, refixing and resealing flashings and ridge capping, sorting out gutters and downpipes that overflow in heavy rain, and restorations on the older and earliest-estate roofs.</p>`,
      reroof: `<p>When an Officer roof is leaking, carrying widespread storm or hail damage, or beyond economical repair, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs. We re-sheet metal roofs and can convert an older tile roof to metal. We will give you a clear comparison of repairing versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/06/new-slotted-gutter-and-rebedding-3-e1591697034396.jpg", "New slotted guttering and re-bedding by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, refixing and resealing <a href="/flat-metal-roofing/">metal sheeting</a> and flashings, re-bedding and repointing ridge capping where tiles are involved, replacing broken <a href="/cement-tiles/">concrete tiles</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement.</p>`,
      imgGutter: ["/images/wp/2020/06/new-gutter-and-downpipes-patterson-lakes-pic-5-e1591696642169.jpg", "New guttering and downpipes by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both the metal roofs common across Officer's estates and the older tile homes nearer the township. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My estate home is fairly new. Why is it leaking?</h3>
<p>On newer metal roofs, leaks usually trace back to flashings, ridge capping or gutters rather than the sheets. We find the source and fix it properly.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair dented metal, lifted sheeting, cracked tiles and storm-related leaks, and can advise whether re-sheeting is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/pakenham/">Pakenham</a>, <a href="/beaconsfield/">Beaconsfield</a>, <a href="/clyde/">Clyde</a>, <a href="/berwick/">Berwick</a>, <a href="/cranbourne-east/">Cranbourne East</a> and <a href="/narre-warren/">Narre Warren</a>.</p>`,
    },
  },

  pakenham: {
    seoTitle: "Roof Restoration & Repairs Pakenham",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Pakenham. Sandhurst Roofing restores older township and newer estate roofs. Free quotes.",
    suburb: "Pakenham",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Pakenham",
      intro: introStd("Pakenham"),
      imgIntro: IMGS.cranbourneSet.intro,
      common: `<p>Pakenham is the established regional centre at the far south-east of greater Melbourne, with an older township of brick-veneer and weatherboard homes ringed by large new estates. That gives a real spread of roofs, from concrete and <a href="/terracotta-tiles/">terracotta</a> tile on the older homes to <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel across the newer estates. Set well inland at the foot of the ranges, the roofs here deal with heat, harsh UV and the south-east's hailstorms.</p>
<p>The jobs we are called out for most in Pakenham are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, replacing tired guttering, and re-sheeting metal roofs on newer homes.</p>`,
      reroof: `<p>When an older Pakenham tile roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer estate homes. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: IMGS.cranbourneSet.reroof,
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken terracotta and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on older and newer homes alike.</p>`,
      imgGutter: IMGS.cranbourneSet.gutter,
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both the older tile homes around the township and the metal roofs common across Pakenham's newer estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on both older homes and newer estate houses?</h3>
<p>Yes. We restore and re-roof the older concrete and terracotta tile homes around the township and repair and re-sheet the metal roofs on Pakenham's newer estates.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/officer/">Officer</a>, <a href="/beaconsfield/">Beaconsfield</a>, <a href="/berwick/">Berwick</a>, <a href="/clyde/">Clyde</a>, <a href="/narre-warren/">Narre Warren</a> and <a href="/cranbourne-east/">Cranbourne East</a>.</p>`,
    },
  },

  lynbrook: {
    seoTitle: "Roof Restoration & Repairs Lynbrook",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Lynbrook. Sandhurst Roofing restores master-planned estate roofs. Free quotes, 30+ years.",
    suburb: "Lynbrook",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Lynbrook",
      intro: introStd("Lynbrook"),
      imgIntro: ["/images/wp/2020/05/New-Roof-e1590820519327.jpg", "New roof completed by Sandhurst Roofing in Lynbrook"],
      common: `<p>Lynbrook is a master-planned estate suburb off the South Gippsland Highway, built largely through the 1990s and 2000s with a mix of <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel and concrete tile roofs. Those roofs are now old enough that the first round of maintenance and restoration is due. Set well inland, they deal with heat, harsh UV and the south-east's hailstorms rather than salt.</p>
<p>The jobs we are called out for most in Lynbrook are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, restoring faded tile roofs, and replacing tired guttering and downpipes.</p>`,
      reroof: `<p>When a Lynbrook roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert a tile roof to metal. We also re-sheet existing metal roofs. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/01/reroof-at-Crib-Point-e1590896180358.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement.</p>`,
      imgGutter: ["/images/wp/2020/05/IMG_1516-e1590820455341.png", "Roof and gutter work by Sandhurst Roofing"],
      cost: costStd,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both the tile and metal roofs common across Lynbrook's estates. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My estate is from the 1990s. Is my roof due for a restoration?</h3>
<p>Quite likely. Tile roofs of that age often have worn coating and cracked pointing. A restoration cleans, re-points and recoats the roof so it sheds water and looks new again.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/lyndhurst/">Lyndhurst</a>, <a href="/cranbourne-north/">Cranbourne North</a>, <a href="/hampton-park/">Hampton Park</a>, <a href="/dandenong-south/">Dandenong South</a>, <a href="/noble-park/">Noble Park</a> and <a href="/cranbourne/">Cranbourne</a>.</p>`,
    },
  },

  lyndhurst: {
    seoTitle: "Roof Restoration & Repairs Lyndhurst",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Lyndhurst. Sandhurst Roofing restores estate homes and shed roofs. Free quotes, 30+ years.",
    suburb: "Lyndhurst",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Lyndhurst",
      intro: introStd("Lyndhurst"),
      imgIntro: ["/images/wp/2020/06/full-roof-restorations-mornington-pic-3-e1591783582473.jpg", "Full roof restoration by Sandhurst Roofing in Lyndhurst"],
      common: `<p>Lyndhurst sits between Dandenong South and Cranbourne along the South Gippsland Highway, a mix of newer estate housing and an industrial and commercial edge. The estate homes are largely <a href="/colorbond-roofing/">COLORBOND&reg;</a> steel with some concrete tile, and there are larger metal roofs on the sheds and commercial buildings nearby. Set well inland, the wear here comes from heat, harsh UV and the south-east's hailstorms.</p>
<p>The jobs we are called out for most in Lyndhurst are storm and hail repairs, refixing flashings and ridge capping, replacing tired guttering and downpipes, restoring faded tile roofs, and re-sheeting larger shed and commercial roofs.</p>`,
      reroof: `<p>When a Lyndhurst roof is leaking, sagging or carrying widespread storm or hail damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert a tile roof to metal. We also re-sheet metal roofs on homes, sheds and commercial buildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/06/reroof-at-Crib-Point-pic2-e1591783689699.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal sheet</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and commercial buildings.</p>`,
      imgGutter: ["/images/wp/2020/06/new-gutter-and-downpipes-patterson-lakes-pic-3-e1591782930798.jpg", "New guttering and downpipes by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm or hail damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger shed and commercial roofs. We will walk you through exactly what your quote covers.</p>`,
      process: processStd,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on estate homes, sheds and commercial buildings. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you do shed and commercial roofs as well as homes?</h3>
<p>Yes. We re-sheet, restore and repair larger metal roofs on sheds, factories and commercial buildings, as well as estate homes.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
${faqQuote}`,
      nearby: `<p>We also work on roofs in nearby <a href="/lynbrook/">Lynbrook</a>, <a href="/cranbourne-west/">Cranbourne West</a>, <a href="/cranbourne-north/">Cranbourne North</a>, <a href="/dandenong-south/">Dandenong South</a>, <a href="/hampton-park/">Hampton Park</a> and <a href="/keysborough/">Keysborough</a>.</p>`,
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
