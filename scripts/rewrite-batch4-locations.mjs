#!/usr/bin/env node
/**
 * Batch 4 location-page rewrites: Tier 2 Frankston-corridor + bayside-south:
 * carrum, carrum-downs, bonbeach, edithvale, chelsea-heights, patterson-lakes,
 * frankston-north, frankston-south, langwarrin-south, skye.
 *
 * Same structure/quality bar as batches 1-3 (~650-800 words, 11 unique
 * suburb-tagged H2s each). Differentiated by real sub-character:
 *   - beachfront salt corrosion: carrum, bonbeach, edithvale
 *   - Patterson Lakes canal/waterfront estate
 *   - slightly inland (less salt, more heat/hail): carrum-downs, chelsea-heights, skye
 *   - ageing post-war affordable stock: frankston-north
 *   - leafy/hilly bush blocks, larger roofs + leaf litter: frankston-south
 *   - rural-residential, homes + sheds: langwarrin-south
 *
 * Guardrails: no fabricated stats/projects, real testimonials only, Australian
 * spelling, no em dashes. Defensible real geography/climate only.
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

const pages = {
  carrum: {
    seoTitle: "Roof Restoration & Repairs Carrum",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Carrum. Sandhurst Roofing protects beachside roofs from salt-air corrosion. Free quotes, 30+ years.",
    suburb: "Carrum",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Carrum",
      intro: `<p>Sandhurst Roofing has cared for beachside homes in Carrum for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2019/11/carrum-downs-full-roof-restoration.jpg", "Full tile roof restoration by Sandhurst Roofing in Carrum"],
      common: `<p>Carrum sits right on the bay at the mouth of the Patterson River, and that beachside position is hard on roofs. Salt-laden air corrodes metal roofs, ridge capping fixings, valleys and gutters far faster than it does inland. Many of Carrum's post-war and period beach homes carry concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs that have lost their coating and gone porous, or early metal roofs now rusting.</p>
<p>The problems we see most in Carrum are rusted gutters and valleys, lifted and cracked ridge capping, faded tiles, and leaks where corroded flashings have failed. Sitting low and close to the water, keeping a roof draining cleanly matters here.</p>`,
      reroof: `<p>Salt air shortens the life of a roof, so for many Carrum homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting through, leaking in multiple spots or beyond economical repair, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2019/11/carrum-downs-roof-restoration.jpg", "Re-roofed beachside home in COLORBOND steel"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a beachside suburb like Carrum, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to keep water out of the home.</p>`,
      imgGutter: ["/images/wp/2019/11/roof-re-spray-carrum-downs.jpg", "Roof respray and coating by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Coastal corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand what salt air does to beachside roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Why do my gutters rust so quickly in Carrum?</h3>
<p>Salt air off the bay accelerates corrosion. Replacing old gutters with quality COLORBOND&reg; steel and keeping them clear of debris will get you a much longer life.</p>
<h3>Should I restore or replace my roof?</h3>
<p>If the tiles or sheets are sound and the issue is worn coating or pointing, a restoration is usually best value. If there is widespread rust or leaking, a re-roof costs less over time.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/bonbeach/">Bonbeach</a>, <a href="/patterson-lakes/">Patterson Lakes</a>, <a href="/carrum-downs/">Carrum Downs</a>, <a href="/seaford/">Seaford</a>, <a href="/edithvale/">Edithvale</a> and <a href="/chelsea/">Chelsea</a>.</p>`,
    },
  },

  "carrum-downs": {
    seoTitle: "Roof Restoration & Repairs Carrum Downs",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Carrum Downs. Sandhurst Roofing restores home, estate and shed roofs. Free quotes, 30+ years.",
    suburb: "Carrum Downs",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Carrum Downs",
      intro: `<p>Sandhurst Roofing has looked after roofs across Carrum Downs for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2019/11/carrum-downs-full-roof-restoration.jpg", "Full roof restoration in Carrum Downs"],
      common: `<p>A few kilometres back from the bay, Carrum Downs is a real mix of established homes, newer estate housing and a sizeable industrial and commercial estate. The older homes mostly sit under concrete tile roofs now faded and porous after years of sun, while the newer estates are largely <a href="/colorbond-roofing/">COLORBOND&reg;</a>.</p>
<p>Sitting inland, the wear here comes more from heat, harsh UV and the south-east's hailstorms than from salt. The jobs we are called out for most in Carrum Downs are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and replacing tired guttering, plus re-sheeting and repairing larger commercial and shed roofs.</p>`,
      reroof: `<p>When an older Carrum Downs roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in COLORBOND&reg; steel is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet metal roofs on newer estate homes, sheds and commercial buildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2019/11/re-roof-carrum-downs-caravan-park.jpg", "Large metal re-roof in Carrum Downs"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes, sheds and commercial buildings.</p>`,
      imgGutter: ["/images/wp/2019/11/roof-re-spray-carrum-downs.jpg", "Roof respray and protective coating in Carrum Downs"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger shed and commercial roofs. We will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on homes, estate houses, sheds and commercial buildings. As a family business we give honest advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on both older homes and newer estate houses?</h3>
<p>Yes. We restore and re-roof the older concrete tile homes and repair and re-sheet the metal roofs common on Carrum Downs' newer estates.</p>
<h3>Do you do shed and commercial roofs?</h3>
<p>Yes. We re-sheet, restore and repair larger metal roofs on sheds, factories and commercial buildings, as well as homes.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/seaford/">Seaford</a>, <a href="/skye/">Skye</a>, <a href="/frankston-north/">Frankston North</a>, <a href="/langwarrin/">Langwarrin</a>, <a href="/carrum/">Carrum</a> and <a href="/sandhurst/">Sandhurst</a>.</p>`,
    },
  },

  bonbeach: {
    seoTitle: "Roof Restoration & Repairs Bonbeach",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Bonbeach. Sandhurst Roofing protects beachside tile and metal roofs from salt. Free quotes.",
    suburb: "Bonbeach",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Bonbeach",
      intro: `<p>Sandhurst Roofing has cared for beachside homes in Bonbeach for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/01/roof-restoration-bonbeach.jpg", "Roof restoration on a Bonbeach home"],
      common: `<p>Bonbeach is a narrow beachside strip between Carrum and Chelsea, and almost every home sits within easy reach of the sand. That close-to-the-water position means salt-laden air corrodes metal roofs, ridge capping fixings, valleys and gutters faster than inland. Many of its post-war and period homes carry concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs that have lost their coating, alongside metal roofs now showing rust.</p>
<p>The problems we see most in Bonbeach are rusted gutters and valleys, lifted and cracked ridge capping, faded tiles, and leaks where corroded flashings have failed.</p>`,
      reroof: `<p>Salt air shortens the life of a roof, so for many Bonbeach homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting through or leaking in multiple spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2023/01/colorbond-roofing-bonbeach.jpg", "COLORBOND steel roof on a Bonbeach home"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a beachside suburb like Bonbeach, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to protect the home.</p>`,
      imgGutter: ["/images/wp/2023/01/gutter-replacement-bonbeach-e1674198194720.jpg", "Gutter replacement on a Bonbeach home"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Coastal corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand what salt air does to beachside roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Does living a street back from the beach still affect my roof?</h3>
<p>Yes. Salt carries well inland on the breeze, so even homes a few streets from the sand in Bonbeach see faster corrosion of gutters, fixings and metal roofs.</p>
<h3>Should I restore or replace my roof?</h3>
<p>If the tiles or sheets are sound and the issue is worn coating or pointing, a restoration is usually best value. If there is widespread rust or leaking, a re-roof costs less over time.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/carrum/">Carrum</a>, <a href="/chelsea/">Chelsea</a>, <a href="/edithvale/">Edithvale</a> and <a href="/patterson-lakes/">Patterson Lakes</a>.</p>`,
    },
  },

  edithvale: {
    seoTitle: "Roof Restoration & Repairs Edithvale",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Edithvale. Sandhurst Roofing protects beachside roofs from salt-air corrosion. Free quotes.",
    suburb: "Edithvale",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Edithvale",
      intro: `<p>Sandhurst Roofing has cared for beachside homes in Edithvale for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2020/06/roof-restoration-hastings-pic-1-e1591699492946.jpg", "Tile roof restoration by Sandhurst Roofing in Edithvale"],
      common: `<p>Edithvale runs from the beach back to the Edithvale wetlands, a low-lying bayside suburb of mostly post-war and period homes. Its close-to-the-water position means salt-laden air corrodes metal roofs, ridge capping fixings, valleys and gutters faster than inland, while many of its older concrete and <a href="/terracotta-tiles/">terracotta</a> tile roofs have lost their protective coating and gone porous.</p>
<p>The problems we see most in Edithvale are rusted gutters and valleys, lifted and cracked ridge capping, faded tiles, and leaks where flashings have failed. Sitting low near the wetlands, keeping water moving cleanly off the roof matters here.</p>`,
      reroof: `<p>Salt air shortens the life of a roof, so for many Edithvale homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting through or leaking in multiple spots, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-4-e1591699867906.jpg", "Re-roofed beachside home in COLORBOND steel"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a low-lying beachside suburb like Edithvale, sound gutters and valleys are one of the best defences against water damage.</p>`,
      imgGutter: ["/images/wp/2020/06/roof-restoration-mornington-18-05-pic-3-e1591700021118.jpg", "Roof and gutter work completed by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Coastal corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand what salt air does to beachside roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Why do my gutters rust so quickly in Edithvale?</h3>
<p>Salt air off the bay accelerates corrosion. Replacing old gutters with quality COLORBOND&reg; steel and keeping them clear will get you a much longer life.</p>
<h3>Should I restore or replace my roof?</h3>
<p>If the tiles or sheets are sound and the issue is worn coating or pointing, a restoration is usually best value. If there is widespread rust or leaking, a re-roof costs less over time.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/chelsea/">Chelsea</a>, <a href="/bonbeach/">Bonbeach</a>, <a href="/chelsea-heights/">Chelsea Heights</a>, <a href="/roof-restoration-aspendale/">Aspendale</a> and <a href="/carrum/">Carrum</a>.</p>`,
    },
  },

  "chelsea-heights": {
    seoTitle: "Roof Restoration Chelsea Heights",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Chelsea Heights. Sandhurst Roofing restores tile and metal roofs near the bay. Free quotes.",
    suburb: "Chelsea Heights",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Chelsea Heights",
      intro: `<p>Sandhurst Roofing has restored and repaired roofs across Chelsea Heights for over 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2019/11/roof-restoration-chelsea-heights.jpg", "Roof restoration in Chelsea Heights"],
      common: `<p>Set just back from the bay near the wetlands, Chelsea Heights is a low-lying suburb of post-war brick homes and newer builds. Most of the older homes sit under concrete tile roofs that are faded and porous after years of sun, with the protective coating worn away.</p>
<p>Being a little inland softens the salt compared with the beachfront, but the breeze still carries it, and low-lying ground makes good drainage important. The jobs we are called out for most in Chelsea Heights are repointing cracked ridge capping, replacing broken tiles, clearing and repairing overflowing gutters, and fixing leaks where flashings or valleys have failed.</p>`,
      reroof: `<p>If a Chelsea Heights roof is leaking, sagging or carrying a lot of broken or brittle tiles, a re-roof can be better value than repeated repairs. We replace tile and metal roofs in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> and can convert an old tile roof to metal. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2019/11/colorbond-roofing-chelsea-heights.jpg", "COLORBOND roofing in Chelsea Heights"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On low-lying blocks like those in Chelsea Heights, sound gutters and valleys are one of the best defences against water damage.</p>`,
      imgGutter: ["/images/wp/2019/11/full-roof-restoration-chelsea-heights.jpg", "Full roof restoration in Chelsea Heights"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Should I restore or replace my Chelsea Heights roof?</h3>
<p>If the tiles are sound and the issue is worn coating, pointing or a few broken tiles, a restoration is usually best value. If there is widespread leaking or sagging, a re-roof costs less over time.</p>
<h3>My gutters overflow when it rains. Can you fix that?</h3>
<p>Yes. It is usually leaf litter or worn, undersized gutters. We clear, repair or replace them and can advise on gutter guard during your quote.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/chelsea/">Chelsea</a>, <a href="/edithvale/">Edithvale</a>, <a href="/bonbeach/">Bonbeach</a>, <a href="/carrum/">Carrum</a> and <a href="/patterson-lakes/">Patterson Lakes</a>.</p>`,
    },
  },

  "patterson-lakes": {
    seoTitle: "Roof Restoration Patterson Lakes",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Patterson Lakes. Sandhurst Roofing protects canal-estate roofs from salt air. Free quotes.",
    suburb: "Patterson Lakes",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Patterson Lakes",
      intro: `<p>Sandhurst Roofing has looked after homes across Patterson Lakes for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2019/11/roof-restoration-patterson-lakes.jpg", "Roof restoration on a Patterson Lakes home"],
      common: `<p>Patterson Lakes is a distinctive waterfront estate, built around canals and lakes that run off Port Phillip Bay, with many homes backing onto the water. That position, surrounded by water and open to the bay, means salt and moisture are constants, corroding metal roofs, ridge capping fixings, valleys and gutters faster than on a dry inland block.</p>
<p>Most homes here are brick under concrete tile or <a href="/colorbond-roofing/">COLORBOND&reg;</a> metal. The jobs we are called out for most in Patterson Lakes are rusted gutters and valleys, lifted and cracked ridge capping, faded tiles, and leaks where corroded flashings have failed on exposed waterfront homes.</p>`,
      reroof: `<p>With salt and moisture all around, a full re-roof in COLORBOND&reg; steel is often the most cost-effective long-term fix for a Patterson Lakes home. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting, leaking in multiple spots or beyond economical repair, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2019/11/full-roof-restoration-patterson-lakes.jpg", "Full roof restoration on a Patterson Lakes home"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and <a href="/terracotta-tiles/">terracotta tiles</a> and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On the waterfront homes of Patterson Lakes, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to keep water out.</p>`,
      imgGutter: ["/images/wp/2019/11/gutter-repairs-patterson-lakes.jpg", "Gutter repairs on a Patterson Lakes home"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Waterfront exposure and corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand what a waterfront, salt-exposed location does to roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Does backing onto the water speed up roof wear?</h3>
<p>Yes. Homes surrounded by canals and open to the bay get more salt and moisture, which corrodes gutters, fixings and metal roofs faster, so regular checks and quality materials pay off.</p>
<h3>Should I restore or replace my roof?</h3>
<p>If the tiles or sheets are sound and the issue is worn coating or pointing, a restoration is usually best value. If there is widespread rust or leaking, a re-roof costs less over time.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/carrum/">Carrum</a>, <a href="/bonbeach/">Bonbeach</a>, <a href="/seaford/">Seaford</a>, <a href="/chelsea/">Chelsea</a> and <a href="/carrum-downs/">Carrum Downs</a>.</p>`,
    },
  },

  "frankston-north": {
    seoTitle: "Roof Restoration Frankston North",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Frankston North. Sandhurst Roofing restores ageing post-war tile roofs. Free quotes, 30+ years.",
    suburb: "Frankston North",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Frankston North",
      intro: `<p>Sandhurst Roofing has looked after roofs across Frankston North for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2018/10/roof-painting-and-re-pointing.jpg", "Roof painting and repointing by Sandhurst Roofing in Frankston North"],
      common: `<p>Frankston North is a settled residential suburb built largely on post-war brick homes, most of them under concrete tile roofs that are now decades old. After years of sun and weather, the protective coating on those tiles has worn away and they have gone faded and porous, which is why there is so much restoration and re-roofing demand across the area.</p>
<p>A little back from the bay, the wear here is driven more by age, heat and the odd hailstorm than by salt. The jobs we are called out for most in Frankston North are repointing cracked ridge capping, replacing broken tiles, fixing leaks, and replacing tired guttering and valleys.</p>`,
      reroof: `<p>With so many ageing post-war roofs, re-roofing is common in Frankston North. When a roof is leaking, sagging or carrying widespread tile damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. We will give you a clear comparison of restoring versus replacing, and an honest answer on which suits your budget.</p>`,
      imgReroof: ["/images/wp/2018/10/new-pergola-roof.jpg", "New metal roof installed by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Repointing the ridge capping is one of the best-value jobs you can do, as it stops water tracking under the tiles before it becomes an internal leak.</p>`,
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We aim to give honest, fair pricing and will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest, no-pressure advice and fair pricing, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My post-war tile roof looks tired. Restore or replace?</h3>
<p>If the tiles are sound, a clean, re-point and re-coat can add years and transform the look. If it is leaking or sagging, a re-roof is better value. We will give you a straight, honest answer.</p>
<h3>Do you offer fair, upfront pricing?</h3>
<p>Yes. We quote on what your roof actually needs and explain exactly what is included, with no hard sell.</p>
<h3>Do you offer free quotes in Frankston North?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/frankston/">Frankston</a>, <a href="/carrum-downs/">Carrum Downs</a>, <a href="/seaford/">Seaford</a>, <a href="/langwarrin/">Langwarrin</a> and <a href="/skye/">Skye</a>.</p>`,
    },
  },

  "frankston-south": {
    seoTitle: "Roof Restoration Frankston South",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Frankston South. Sandhurst Roofing restores larger roofs on leafy bush blocks. Free quotes.",
    suburb: "Frankston South",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Frankston South",
      intro: `<p>Sandhurst Roofing has cared for homes across Frankston South for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on terracotta, tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2018/10/roof-painting-and-re-pointing.jpg", "Roof painting and repointing by Sandhurst Roofing in Frankston South"],
      common: `<p>Frankston South is the leafy, hilly side of Frankston, known for larger homes on generous, treed blocks running up towards Mount Eliza and Oliver's Hill. Roofs here are a mix of concrete and <a href="/terracotta-tiles/">terracotta</a> tile on established homes and <a href="/colorbond-roofing/">COLORBOND&reg;</a> on newer builds, often on larger, multi-level rooflines.</p>
<p>The mature gums the area is known for are great for shade but tough on roofs, dropping leaves and bark into gutters and valleys all year. Higher, more exposed blocks also catch the wind off the bay. The jobs we are called out for most in Frankston South are clearing and repairing overflowing gutters, repointing lifted ridge capping, replacing cracked tiles, and tracing leaks around flashings.</p>`,
      reroof: `<p>When a Frankston South roof is leaking, sagging or carrying widespread tile damage, a re-roof can be better value than repeated repairs. We re-roof in COLORBOND&reg; steel and can convert an old tile roof to metal. Because the homes here are often larger and multi-level, we give you a clear, itemised comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2018/10/new-pergola-roof.jpg", "Re-roof in COLORBOND steel by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. With so many gum trees in Frankston South, keeping gutters, box gutters and valleys clear and well sealed is the single best way to prevent water damage.</p>`,
      cost: `<p>We price each roof on what it needs. The main factors are the size and pitch of the roof, tile versus metal, how many tiles or sheets need replacing, the condition of the ridge capping and valleys, the amount of guttering, and safe access on larger, multi-level and elevated homes. Your written quote spells out exactly what is included.</p>`,
      process: `<p>We start with a free on-site inspection and a written quote. For a restoration we high-pressure clean the roof, re-bed and repoint the ridge capping, replace broken tiles and rusted valleys, carry out repairs, then finish with a three-coat protective membrane in your chosen colour. For a re-roof we strip the old roof and re-sheet in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and experience on the larger, multi-level roofs Frankston South is known for. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>My gutters keep blocking with gum leaves. What can I do?</h3>
<p>With Frankston South's tree cover this is common. Regular cleaning, quality COLORBOND&reg; guttering and well-sealed valleys all help, and we can advise on gutter guard during your quote.</p>
<h3>Can you work on large or multi-level roofs?</h3>
<p>Yes. We are set up to work safely on the larger, multi-level and elevated roofs common in Frankston South, and we factor safe access into every quote.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/frankston/">Frankston</a>, <a href="/mount-eliza/">Mount Eliza</a>, <a href="/langwarrin/">Langwarrin</a> and <a href="/mornington/">Mornington</a>.</p>`,
    },
  },

  "langwarrin-south": {
    seoTitle: "Roof Restoration Langwarrin South",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Langwarrin South. Sandhurst Roofing restores rural home and shed roofs. Free quotes.",
    suburb: "Langwarrin South",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Langwarrin South",
      intro: `<p>Sandhurst Roofing has looked after homes and rural properties across Langwarrin South for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2020/05/New-Roof-e1590820519327.jpg", "New roof installed by Sandhurst Roofing in Langwarrin South"],
      common: `<p>Langwarrin South is a semi-rural, rural-residential pocket of larger, treed blocks, with homes set among paddocks, sheds and outbuildings. Roofs here are a mix of concrete and <a href="/terracotta-tiles/">terracotta</a> tile on established homes and <a href="/colorbond-roofing/">COLORBOND&reg;</a> and other metal on newer homes, sheds and farm buildings.</p>
<p>The mature trees that give the area its character drop a lot of leaves and bark into gutters and valleys, and larger metal roofs and sheds need their own attention. The jobs we are called out for most in Langwarrin South are clearing and repairing gutters and valleys, repointing ridge capping, replacing cracked tiles, and repairing or re-sheeting rusted shed and home metal roofs.</p>`,
      reroof: `<p>When a Langwarrin South roof is leaking, sagging or carrying widespread tile or rust damage, a re-roof in COLORBOND&reg; steel is often better value than repeated repairs, and we can convert an old tile roof to metal. We also re-sheet larger metal roofs on sheds and outbuildings. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/01/reroof-at-Crib-Point-e1590896180358.jpg", "Metal re-roof on a rural property by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement on homes and sheds. On large, tree-lined rural blocks, keeping gutters and valleys clear is one of the best ways to avoid water damage.</p>`,
      imgGutter: ["/images/wp/2020/05/IMG_1516-e1590820455341.png", "Roof and gutter work completed by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access, which matters on larger homes and sheds. We will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on homes, sheds and rural buildings alike. As a family business we give honest advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you do shed and rural roofs?</h3>
<p>Yes. We re-sheet, restore and repair larger metal roofs on sheds, outbuildings and rural homes across Langwarrin South.</p>
<h3>My gutters keep blocking with leaves. What can I do?</h3>
<p>With Langwarrin South's tree cover this is common. Regular cleaning, quality COLORBOND&reg; guttering and well-sealed valleys all help, and we can advise on gutter guard.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/langwarrin/">Langwarrin</a>, <a href="/frankston/">Frankston</a>, <a href="/skye/">Skye</a>, <a href="/carrum-downs/">Carrum Downs</a> and <a href="/frankston-south/">Frankston South</a>.</p>`,
    },
  },

  skye: {
    seoTitle: "Roof Restoration & Repairs Skye",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Skye. Sandhurst Roofing restores established and estate-home roofs. Free quotes, 30+ years.",
    suburb: "Skye",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Skye",
      intro: `<p>Sandhurst Roofing has looked after roofs across Skye for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2020/01/mount-martha-pic-4-e1590735512627.jpg", "Roof restoration by Sandhurst Roofing in Skye"],
      common: `<p>Sitting between Frankston and Cranbourne, Skye is a real mix of established homes and newer growth-corridor estates. The older homes mostly sit under concrete tile roofs now faded and porous after years of sun, while the newer estates are largely <a href="/colorbond-roofing/">COLORBOND&reg;</a> with some tile.</p>
<p>Inland from the bay, the wear here comes more from heat, harsh UV and the south-east's hailstorms than from salt. The jobs we are called out for most in Skye are repointing cracked ridge capping, replacing broken tiles, storm and hail repairs, and replacing tired guttering and valleys on the older homes.</p>`,
      reroof: `<p>When an older Skye roof is leaking, sagging or carrying widespread tile or hail damage, a re-roof in COLORBOND&reg; steel is often better value than repeated repairs, and we can convert an old tile roof to metal. On newer estate homes we repair and re-sheet metal roofs as needed. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2020/05/full-restoration-of-tin-roof-5-e1590735911239.jpg", "Full metal roof restoration by Sandhurst Roofing"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak and storm repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. Repointing the ridge capping is one of the best-value jobs you can do, as it stops water tracking under the tiles before it becomes an internal leak.</p>`,
      imgGutter: ["/images/wp/2018/10/1111-e1590735579164.jpg", "Roof and gutter work completed by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the extent of any storm damage, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will walk you through exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, and we work on both established and newer estate homes. As a family business we give honest advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you work on both older homes and newer estate houses?</h3>
<p>Yes. We restore and re-roof the older concrete tile homes and repair and re-sheet the metal roofs common on Skye's newer estates.</p>
<h3>Can you repair hail and storm damage?</h3>
<p>Yes. We repair cracked tiles, dented metal and storm-related leaks, and can advise whether a re-roof is the better option after major damage.</p>
<h3>Do you offer free quotes in Skye?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/carrum-downs/">Carrum Downs</a>, <a href="/frankston-north/">Frankston North</a>, <a href="/langwarrin/">Langwarrin</a>, <a href="/frankston/">Frankston</a> and <a href="/sandhurst/">Sandhurst</a>.</p>`,
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
