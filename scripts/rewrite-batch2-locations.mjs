#!/usr/bin/env node
/**
 * Batch 2 location-page rewrites: unique, locally-specific body copy for the
 * rest of Tier 1 (established, high re-roof demand) - the bayside + Peninsula
 * cluster: mount-martha, mentone, cheltenham, moorabbin, parkdale, mordialloc,
 * chelsea, hastings, black-rock, st-kilda.
 *
 * Same quality bar / structure as batch 1 (botanic-ridge model): ~700-900 words,
 * 11 unique suburb-tagged H2s each, re-roofing focus, real internal links,
 * cost-factor section, suburb FAQs, real testimonials only.
 *
 * Guardrails honoured: no fabricated stats/projects, real testimonials only,
 * Australian spelling, no em dashes. Local detail is defensible real geography
 * (bayside salt air, clifftop wind, Western Port port town, St Kilda heritage
 * stock + box gutters, Moorabbin commercial precinct).
 *
 * seoTitle kept <=40 chars (root layout appends " | Sandhurst Roofing", 20) ->
 * final <=60.
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

// Assemble the shared skeleton; per-suburb prose lives in `p`.
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
  "mount-martha": {
    seoTitle: "Roof Restoration & Repairs Mount Martha",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Mount Martha. Sandhurst Roofing protects Peninsula homes from coastal wind and salt. Free quotes.",
    suburb: "Mount Martha",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Mount Martha",
      intro: `<p>Sandhurst Roofing is a family owned business with more than 30 years of experience caring for homes across Mount Martha and the Mornington Peninsula. We handle <a href="/roof-restoration/">roof restoration</a>, full <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on terracotta, concrete tile and metal roofs alike. Call Steve on ${PHONE} for a free, no-obligation quote.</p>`,
      imgIntro: ["/images/wp/2020/01/mount-martha-pic-4-e1590735512627.jpg", "Roof restoration on a Mount Martha home"],
      common: `<p>Mount Martha is known for large, established homes on generous blocks, many of them carrying concrete tile or <a href="/terracotta-tiles/">terracotta</a> roofs that are now well past the point where the protective coating has worn away. Newer coastal builds and re-roofs in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> sit alongside them.</p>
<p>The town's bayside and clifftop position means strong winds and salt spray off Port Phillip Bay are a constant. That lifts and cracks ridge capping, fades and weakens tile coatings, and corrodes metal fixings, valleys and gutters over time. The jobs we are called out for most in Mount Martha are repointing lifted ridge capping, replacing slipped or broken tiles, tracing leaks around flashings, and replacing rusted guttering on exposed homes.</p>`,
      reroof: `<p>When a Mount Martha roof is too far gone to restore, we re-roof in COLORBOND&reg; steel, which is built to stand up to coastal wind and salt. We replace both tile and metal roofs and can convert an old tile roof to metal where it suits the home. Because the homes here are often large and multi-level, we will give you a clear, itemised comparison of restoring versus replacing so you can make the right call.</p>`,
      imgReroof: ["/images/wp/2020/05/full-restoration-of-tin-roof-5-e1590735911239.jpg", "Full metal roof restoration on a Mount Martha property"],
      repairs: `<p>Plenty of jobs do not need a full restoration. Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle re-bedding and repointing of ridge capping, replacing broken terracotta and <a href="/cement-tiles/">concrete tiles</a>, leak detection and repair, rusted valley and <a href="/flat-metal-roofing/">flat metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On wind-exposed Mount Martha homes, flexible repointing is especially worthwhile, as strong gusts are quick to find any loose capping.</p>`,
      imgGutter: ["/images/wp/2018/10/1111-e1590735579164.jpg", "Roof and gutter work completed in Mount Martha"],
      cost: `<p>Every roof is different, so we quote on what is actually in front of us. The main things that move the cost are the size and pitch of the roof, whether it is tile or metal, how many tiles or sheets need replacing, the condition of the ridge capping and valleys, the amount of guttering, and how easy the roof is to access safely on larger, multi-level and clifftop homes. Your written quote spells out exactly what is included.</p>`,
      process: `<p>We start with a free on-site inspection and a written quote. For a restoration we high-pressure clean the roof, re-bed and repoint the ridge capping, replace broken tiles and rusted valleys, carry out repairs, then finish with a three-coat protective membrane in the colour you choose. For a re-roof we strip the old roof and re-sheet in new COLORBOND&reg; steel. Either way we leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team and decades of experience on Peninsula roofs. As a local family business we give honest advice rather than a hard sell, turn up when we say we will, and treat your home like our own. Browse the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a> to start picturing your new roof.</p>`,
      faqs: `<h3>Does the wind and salt off the bay really damage Mount Martha roofs?</h3>
<p>Yes. Exposed bayside and clifftop homes cop strong winds that lift ridge capping and tiles, and salt air that corrodes metal fixings and gutters faster than inland. Regular checks and quality COLORBOND&reg; materials make a real difference.</p>
<h3>Can you restore a terracotta roof?</h3>
<p>In most cases yes. As long as the tiles are sound, terracotta roofs can be cleaned, re-pointed and repaired, with broken tiles matched where possible to keep the home's character.</p>
<h3>How long does a roof restoration take?</h3>
<p>Most homes are completed in a few days, weather depending. We will give you a realistic timeframe with your quote.</p>`,
      nearby: `<p>As well as Mount Martha we look after nearby homes in <a href="/mornington/">Mornington</a>, <a href="/mount-eliza/">Mount Eliza</a>, <a href="/roof-restoration-safety-beach/">Safety Beach</a>, <a href="/roof-restoration-dromana/">Dromana</a> and <a href="/frankston/">Frankston</a>.</p>`,
    },
  },

  mentone: {
    seoTitle: "Roof Restoration & Repairs Mentone",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Mentone. Sandhurst Roofing restores period and post-war tile roofs on the bayside. Free quotes.",
    suburb: "Mentone",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Mentone",
      intro: `<p>Sandhurst Roofing has been restoring and repairing roofs across Mentone for over 30 years. We are a family owned business offering <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2022/11/roof-restoration-mentone-1.jpg", "Roof restoration on a Mentone home"],
      common: `<p>Mentone has a lot of character housing, from interwar and Spanish Mission homes to solid post-war brick, much of it under concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs that have lost their protective coating and gone porous and faded. Newer <a href="/colorbond-roofing/">COLORBOND&reg;</a> roofs are mixed in among them.</p>
<p>Being close to the bay, Mentone gets salt in the air, and its leafy older streets drop plenty of debris into gutters and valleys. The problems we see most here are cracked and slipped ridge capping, broken tiles, blocked and overflowing gutters, and the occasional leak where a valley or flashing has failed. On period homes, matching tiles and pointing sympathetically matters.</p>`,
      reroof: `<p>If a Mentone roof is leaking in several places, sagging, or carrying a lot of broken or brittle tiles, a re-roof can be better value than repeated repairs. We replace tile and metal roofs in COLORBOND&reg; steel and can convert an old tile roof to metal where it suits the home. We will give you a clear comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2022/11/colorbond-roof-mentone-e1668398871789.jpg", "COLORBOND steel re-roof on a Mentone home"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> also take care of the smaller jobs that protect your home: re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles, fixing leaks and rusted valleys, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. With Mentone's mature street trees, keeping gutters and valleys clear and well sealed is one of the best ways to avoid water damage.</p>`,
      imgGutter: ["/images/wp/2022/11/gutter-replacement-mentone-1.jpg", "Gutter replacement on a Mentone home"],
      cost: `<p>We price each roof on its own merits. The main cost factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the state of the ridge capping and valleys, the length of guttering involved, and safe access. You will get a written quote that spells out exactly what is included.</p>`,
      process: `<p>It starts with a free inspection and a written quote. A restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, any repairs needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up properly before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest, no-pressure advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Can you match the tiles on a period Mentone home?</h3>
<p>In most cases yes. We source matching or close-matching tiles where we can, so repairs and repointing keep the look of an older home intact.</p>
<h3>Why are my gutters always full of leaves?</h3>
<p>Mentone's established street trees shed a lot. Regular cleaning, quality COLORBOND&reg; guttering and well-sealed valleys all help, and we can advise on gutter guard during your quote.</p>
<h3>Do you offer free quotes in Mentone?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800 to book a time.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/parkdale/">Parkdale</a>, <a href="/cheltenham/">Cheltenham</a>, <a href="/roof-restoration-beaumaris/">Beaumaris</a>, <a href="/mordialloc/">Mordialloc</a> and <a href="/roof-restoration-highett/">Highett</a>.</p>`,
    },
  },

  cheltenham: {
    seoTitle: "Roof Restoration & Repairs Cheltenham",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Cheltenham. Sandhurst Roofing restores post-war and period tile roofs near Southland. Free quotes.",
    suburb: "Cheltenham",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Cheltenham",
      intro: `<p>Sandhurst Roofing has looked after roofs across Cheltenham for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2022/11/roof-restoration-cheltenham-1-e1668424142504.jpg", "Roof restoration on a Cheltenham home"],
      common: `<p>Cheltenham is a mix of post-war brick-veneer homes, older period houses and a growing number of newer townhouses and units around the Southland and Kingston precinct. A lot of the established homes still wear their original concrete tile roofs, now faded and porous after decades of sun, with the protective coating long gone.</p>
<p>The work we are called out for most in Cheltenham is repointing cracked and slipped ridge capping, replacing broken tiles, fixing leaks around flashings and valleys, and replacing tired guttering. A sea breeze off the nearby bay adds a little salt to the mix, so coastal-side homes wear faster than you might expect.</p>`,
      reroof: `<p>When a Cheltenham roof has widespread leaks, sagging or large numbers of broken or brittle tiles, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often the smarter long-term spend than ongoing patch repairs. We replace tile and metal roofs and can convert old tile roofs to metal, on homes, townhouses and units alike. We will tell you honestly whether restoration or replacement is the better value.</p>`,
      imgReroof: ["/images/wp/2022/11/colorbond-roofing-cheltenham-1.jpg", "COLORBOND roofing on a Cheltenham home"],
      repairs: `<p>Not every job is a full restoration. Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> and tilers handle leak detection and repair, re-bedding and repointing of ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement in COLORBOND&reg; steel. Repointing the ridge capping is one of the best-value jobs you can do, as it stops water tracking under the tiles before it becomes an internal leak.</p>`,
      imgGutter: ["/images/wp/2022/11/gutter-replacement-cheltenham-2.jpg", "Gutter replacement on a Cheltenham home"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. We will walk you through exactly what your quote covers so there are no surprises.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team. As a local family business we give honest advice and quality workmanship, and we are happy to help you pick a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Should I restore or replace my Cheltenham roof?</h3>
<p>If the tiles are sound and the issue is worn coating, pointing or a few broken tiles, a restoration is usually best value. If there is widespread leaking, sagging or large-scale damage, a re-roof costs less over time. We will tell you honestly which one your roof needs.</p>
<h3>Do you work on townhouses and units?</h3>
<p>Yes. We work on homes, townhouses and unit developments across Cheltenham, both tile and metal roofs.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, all quotes are free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also service nearby <a href="/mentone/">Mentone</a>, <a href="/moorabbin/">Moorabbin</a>, <a href="/roof-restoration-highett/">Highett</a>, <a href="/roof-restoration-heatherton/">Heatherton</a> and <a href="/parkdale/">Parkdale</a>.</p>`,
    },
  },

  moorabbin: {
    seoTitle: "Roof Restoration & Repairs Moorabbin",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Moorabbin. Sandhurst Roofing handles home and commercial roofs across Moorabbin. Free quotes.",
    suburb: "Moorabbin",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Moorabbin",
      intro: `<p>Sandhurst Roofing has restored and replaced roofs across Moorabbin for over 30 years, on homes and commercial buildings alike. Our family owned team handles <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2022/11/roof-restoration-moorabbin-1-1.jpg", "Roof restoration on a Moorabbin home"],
      common: `<p>Moorabbin is a real mix of established 1950s and 60s post-war brick homes and a large commercial and industrial precinct of factories, warehouses and showrooms. The homes typically sit under concrete tile roofs that are now well past the life of their original coating, while many of the commercial buildings carry ageing <a href="/flat-metal-roofing/">flat metal roofs</a> and box gutters.</p>
<p>On homes, the jobs we see most are faded and porous tiles, cracked ridge capping, broken tiles and tired guttering. On commercial roofs it is rusting metal sheeting, leaking box gutters and worn flashings. We are set up to handle both.</p>`,
      reroof: `<p>For Moorabbin homes that are leaking, sagging or carrying widespread tile damage, a re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is often better value than repeated repairs, and we can convert an old tile roof to metal. For commercial buildings we re-sheet flat and pitched metal roofs and renew box gutters. Either way, we will give you a clear comparison so you can make the right call.</p>`,
      imgReroof: ["/images/wp/2022/11/colorbond-roof-moorabbin-1.jpg", "COLORBOND steel re-roof on a Moorabbin building"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> and tilers handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted metal and valley repairs, and <a href="/gutter-repairs/">gutter</a> and box gutter repairs and replacement. On Moorabbin's commercial buildings, keeping box gutters clear and watertight is critical to preventing expensive internal water damage.</p>`,
      imgGutter: ["/images/wp/2022/11/gutter-replacement-moorabbin-1-1.jpg", "Gutter replacement on a Moorabbin property"],
      cost: `<p>We price every roof on what it needs. The main factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the condition of the ridge capping, valleys and box gutters, the amount of guttering, and safe access, which matters on larger commercial roofs. You will receive a clear written quote with no hidden extras.</p>`,
      process: `<p>We begin with a free inspection and written quote. A restoration includes a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. The site is left clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and decades of experience on both homes and commercial buildings. As a family business we give honest advice, quality workmanship and a fair price, and we are happy to help you choose from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you do commercial and factory roofs in Moorabbin?</h3>
<p>Yes. As well as homes, we restore, re-sheet and repair flat and pitched metal roofs and box gutters on Moorabbin's factories, warehouses and showrooms.</p>
<h3>Should I restore or replace an old post-war tile roof?</h3>
<p>If the tiles are sound, a clean, re-point and re-coat can add years and transform the look. If it is leaking or sagging, a re-roof is better value. We will give you a straight answer.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, all quotes are free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also service nearby <a href="/cheltenham/">Cheltenham</a>, <a href="/roof-restoration-highett/">Highett</a>, <a href="/roof-restoration-heatherton/">Heatherton</a>, <a href="/roof-restoration-braeside/">Braeside</a> and <a href="/clarinda/">Clarinda</a>.</p>`,
    },
  },

  parkdale: {
    seoTitle: "Roof Restoration & Repairs Parkdale",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Parkdale. Sandhurst Roofing restores beachside tile and metal roofs. Free quotes, 30+ years.",
    suburb: "Parkdale",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Parkdale",
      intro: `<p>Sandhurst Roofing has cared for beachside homes in Parkdale for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2022/11/roof-restoration-parkdale-1.jpg", "Roof restoration on a Parkdale home"],
      common: `<p>Parkdale sits right on the bay between Mentone and Mordialloc, and that beachside position is hard on roofs. Salt-laden air corrodes metal roofs, ridge capping fixings, valleys and gutters faster than it does inland. Many of Parkdale's period and post-war homes carry concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs where the protective coating has worn away and the tiles have gone porous.</p>
<p>The problems we see most in Parkdale are rusted gutters and valleys, lifted and cracked ridge capping, faded tiles, and leaks where corroded flashings have failed. With mature trees along many streets, keeping gutters and valleys clear matters here too.</p>`,
      reroof: `<p>Salt air shortens the life of a roof, so for many Parkdale homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built to handle coastal conditions, and we can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting through, leaking in multiple spots or beyond economical repair, ask us about replacing it.</p>`,
      imgReroof: ["/images/wp/2022/11/colorbond-roofing-parkdale.jpg", "COLORBOND steel roof on a Parkdale home"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a beachside suburb like Parkdale, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to protect the home from water damage.</p>`,
      imgGutter: ["/images/wp/2022/11/gutter-replacement-parkdale-2.jpg", "Gutter replacement on a Parkdale home"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Coastal corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand what the coast does to local roofs. As a family business we give honest advice and quality workmanship, and we can help you pick a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Does living near the beach affect my Parkdale roof?</h3>
<p>Yes. Salt air off the bay corrodes metal roofs, fixings and gutters faster than inland, so beachside homes benefit from regular checks and quality COLORBOND&reg; materials.</p>
<h3>Can you restore an old tile roof?</h3>
<p>In most cases yes. As long as the tiles are sound, a clean, re-point and re-coat can add years to the roof and transform how it looks.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/mentone/">Mentone</a>, <a href="/mordialloc/">Mordialloc</a>, <a href="/roof-restoration-beaumaris/">Beaumaris</a> and <a href="/cheltenham/">Cheltenham</a>.</p>`,
    },
  },

  mordialloc: {
    seoTitle: "Roof Restoration & Repairs Mordialloc",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Mordialloc. Sandhurst Roofing protects bayside roofs from salt-air corrosion. Free quotes, 30+ years.",
    suburb: "Mordialloc",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Mordialloc",
      intro: `<p>Sandhurst Roofing has looked after roofs across Mordialloc for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2022/11/roof-restoration-mordialloc-1.jpg", "Roof restoration on a Mordialloc home"],
      common: `<p>Mordialloc is a bayside suburb wrapped around its creek and foreshore, with a mix of older beach cottages, period homes and post-war brick. Many carry concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs, or early metal roofs, that have lost their coating and gone porous or rusty after years near the water.</p>
<p>That close-to-the-bay position means salt air corrodes metal roofs, fixings, valleys and gutters faster than inland. The problems we are called out for most in Mordialloc are rusted gutters and valleys, lifted and cracked ridge capping, faded tiles, and leaks where flashings have failed.</p>`,
      reroof: `<p>Salt air shortens a roof's life, so for many Mordialloc homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. We can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting through, leaking in multiple spots or beyond economical repair, ask us about replacing it rather than paying for patch repairs.</p>`,
      imgReroof: ["/images/wp/2022/11/colorbond-roofing-mordialloc-e1668426426205.jpg", "COLORBOND steel roof on a Mordialloc home"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a bayside suburb like Mordialloc, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to protect your home.</p>`,
      imgGutter: ["/images/wp/2022/11/gutter-replacement-mordialloc-2.jpg", "Gutter replacement on a Mordialloc home"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Coastal corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand what salt air does to bayside roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Why do my gutters rust so quickly in Mordialloc?</h3>
<p>Salt air off the bay accelerates corrosion. Replacing old gutters with quality COLORBOND&reg; steel and keeping them clear of debris will get you a much longer life.</p>
<h3>Should I restore or replace my roof?</h3>
<p>If the tiles or sheets are sound and the issue is worn coating or pointing, a restoration is usually best value. If there is widespread rust or leaking, a re-roof costs less over time.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/parkdale/">Parkdale</a>, <a href="/roof-restoration-aspendale/">Aspendale</a>, <a href="/chelsea/">Chelsea</a>, <a href="/mentone/">Mentone</a> and <a href="/roof-restoration-braeside/">Braeside</a>.</p>`,
    },
  },

  chelsea: {
    seoTitle: "Roof Restoration & Repairs Chelsea",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Chelsea. Sandhurst Roofing restores beachside tile and metal roofs. Free quotes, 30+ years local.",
    suburb: "Chelsea",
    parts: {
      h1: "Roof Restoration &amp; Repairs in Chelsea",
      intro: `<p>Sandhurst Roofing has cared for beachside homes in Chelsea for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2020/03/Restoration-finished-in-Mornington-pic-4-e1590732993806.jpg", "Completed roof restoration by Sandhurst Roofing in Chelsea"],
      common: `<p>Chelsea is a flat, low-lying beachside suburb with a long stretch of foreshore, and its housing is mostly post-war brick and older period homes. Many still carry their original concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs, now faded and porous after decades of sun and salt, alongside newer metal re-roofs.</p>
<p>Being so close to the bay, salt air is a constant in Chelsea, corroding metal roofs, ridge capping fixings, valleys and gutters faster than inland. The jobs we see most here are rusted gutters and valleys, cracked and lifted ridge capping, faded tiles, and leaks where flashings have failed.</p>`,
      reroof: `<p>Salt air shortens a roof's life, so for many Chelsea homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built for coastal conditions, and we can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting, leaking in multiple spots or beyond economical repair, talk to us about replacing it.</p>`,
      imgReroof: ["/images/wp/2020/01/re-roof-seaford-4-e1590733067873.jpg", "Re-roofed beachside home in COLORBOND steel"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. In a beachside suburb like Chelsea, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to keep water out of the home.</p>`,
      imgGutter: ["/images/wp/2019/01/Full-roof-restoration-frankston-e1548290846125.png", "Full roof restoration completed by Sandhurst Roofing"],
      cost: `<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Coastal corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>`,
      process: `<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand what salt air does to beachside roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Why do my gutters rust so quickly in Chelsea?</h3>
<p>Salt air off the bay accelerates corrosion. Replacing old gutters with quality COLORBOND&reg; steel and keeping them clear of debris will get you a much longer life.</p>
<h3>Should I restore or replace my roof?</h3>
<p>If the tiles or sheets are sound and the issue is worn coating or pointing, a restoration is usually best value. If there is widespread rust or leaking, a re-roof costs less over time.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, every quote is free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/roof-restoration-aspendale/">Aspendale</a>, <a href="/bonbeach/">Bonbeach</a>, <a href="/edithvale/">Edithvale</a>, <a href="/mordialloc/">Mordialloc</a>, <a href="/chelsea-heights/">Chelsea Heights</a> and <a href="/carrum/">Carrum</a>.</p>`,
    },
  },

  hastings: {
    seoTitle: "Roof Restoration & Repairs Hastings",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Hastings. Sandhurst Roofing covers home, rural and commercial roofs on Western Port. Free quotes.",
    suburb: "Hastings",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Hastings",
      intro: `<p>Sandhurst Roofing has looked after roofs around Hastings and the Western Port side of the Peninsula for over 30 years, on homes, rural properties and commercial buildings. Our family owned team handles <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/01/roof-restoration-hastings-2.jpg", "Roof restoration on a Hastings home"],
      common: `<p>Hastings is a working port town on Western Port Bay, with a mix of older homes, newer estate housing, rural-residential properties and a sizeable industrial and commercial area. Plenty of homes carry concrete tile roofs past the life of their coating, while rural blocks and commercial sites often have large <a href="/flat-metal-roofing/">metal roofs</a> and sheds.</p>
<p>Being open to Western Port, Hastings cops wind and salt-laden air that lift ridge capping and corrode metal roofs, fixings and gutters. The jobs we are called out for most are repointing loose capping, replacing cracked tiles, repairing rusted metal and valleys, and replacing tired guttering on exposed homes and sheds.</p>`,
      reroof: `<p>When a Hastings roof is past restoring, we re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a>, which stands up well to Western Port's wind and salt. We replace tile and metal roofs on homes, re-sheet rural sheds and outbuildings, and handle commercial re-roofs. If you are dealing with repeated leaks, rust or widespread tile damage, a re-roof is often the better long-term investment, and we will give you a frank comparison.</p>`,
      imgReroof: ["/images/wp/2023/01/colorbond-roofing-in-hastings.png", "COLORBOND steel roof in Hastings"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted metal and valley repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On exposed Western Port homes and rural sheds, secure flashings and quality guttering make a real difference.</p>`,
      imgGutter: ["/images/wp/2023/01/gutter-replacement-hastings-e1674195958256.jpg", "Gutter replacement on a Hastings property"],
      cost: `<p>We price every roof on what it needs. The main factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the condition of the ridge capping and valleys, the amount of guttering, and safe access, which matters on large rural and commercial roofs. You will receive a clear written quote with no hidden extras.</p>`,
      process: `<p>We begin with a free inspection and written quote. A restoration includes a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. The site is left clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and experience across homes, rural properties and commercial buildings. As a family business we give honest advice, quality workmanship and a fair price, and we can help you choose from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Do you cover the Western Port side and Hastings industrial area?</h3>
<p>Yes. We work right across Hastings, including the township, rural-residential blocks and the commercial and industrial precinct on Western Port.</p>
<h3>Do you do rural and shed roofs?</h3>
<p>Yes. We re-sheet, restore and repair large metal roofs on rural properties, sheds and outbuildings, as well as homes.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, all quotes are free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also service nearby <a href="/crib-point/">Crib Point</a>, <a href="/tuerong/">Tuerong</a>, <a href="/red-hill-south/">Red Hill South</a> and <a href="/balnarring-beach/">Balnarring Beach</a>.</p>`,
    },
  },

  "black-rock": {
    seoTitle: "Roof Restoration & Repairs Black Rock",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Black Rock. Sandhurst Roofing protects clifftop bayside roofs from wind and salt. Free quotes.",
    suburb: "Black Rock",
    parts: {
      h1: "Roof Restoration &amp; Re-Roofing in Black Rock",
      intro: `<p>Sandhurst Roofing has cared for homes across Black Rock for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on terracotta, tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/01/roof-restoration-black-rock-e1674199660386.jpg", "Roof restoration on a Black Rock home"],
      common: `<p>Black Rock is an established bayside suburb set above the Red Bluff sandstone cliffs, with large period and mid-century homes on leafy blocks. Many carry concrete or <a href="/terracotta-tiles/">terracotta</a> tile roofs from decades ago, where the protective coating has worn thin, alongside premium <a href="/colorbond-roofing/">COLORBOND&reg;</a> re-roofs.</p>
<p>Its clifftop, bayside position means strong winds and salt spray off Port Phillip Bay are a constant, lifting ridge capping, fading tile coatings and corroding metal fixings, valleys and gutters. The jobs we are called out for most in Black Rock are repointing lifted capping, replacing cracked and slipped tiles, tracing leaks around flashings, and replacing rusted guttering on exposed homes.</p>`,
      reroof: `<p>When a Black Rock roof is too far gone to restore, we re-roof in COLORBOND&reg; steel, which is built to handle coastal wind and salt. We replace tile and metal roofs and can convert an old tile roof to metal where it suits the home. With the larger homes common here, we give you a clear, itemised comparison of restoring versus replacing.</p>`,
      imgReroof: ["/images/wp/2023/01/colourbond-roofing-black-rock.jpg", "COLORBOND steel re-roof on a Black Rock home"],
      repairs: `<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> handle re-bedding and repointing of ridge capping, replacing broken terracotta and <a href="/cement-tiles/">concrete tiles</a>, leak detection and repair, rusted valley and <a href="/flat-metal-roofing/">flat metal</a> repairs, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On wind-exposed clifftop homes, flexible repointing is especially worthwhile, as strong gusts quickly find any loose capping.</p>`,
      imgGutter: ["/images/wp/2023/01/gutter-replacement-black-rock.jpg", "Gutter replacement on a Black Rock home"],
      cost: `<p>Every roof is different, so we quote on what is in front of us. The main factors are the size and pitch of the roof, tile versus metal, how many tiles or sheets need replacing, the condition of the ridge capping and valleys, the amount of guttering, and safe access on larger and clifftop homes. Your written quote spells out exactly what is included.</p>`,
      process: `<p>We start with a free on-site inspection and a written quote. For a restoration we high-pressure clean the roof, re-bed and repoint the ridge capping, replace broken tiles and rusted valleys, carry out repairs, then finish with a three-coat protective membrane in your chosen colour. For a re-roof we strip the old roof and re-sheet in new COLORBOND&reg; steel. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand the demands the cliffs and the bay place on local roofs. As a family business we give honest advice and quality workmanship, and we can help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>`,
      faqs: `<h3>Does the clifftop wind and salt damage Black Rock roofs?</h3>
<p>Yes. Exposed clifftop and bayside homes cop strong winds that lift ridge capping and tiles, plus salt air that corrodes metal fixings and gutters faster than inland. Regular checks and quality materials make a real difference.</p>
<h3>Can you restore a terracotta roof?</h3>
<p>In most cases yes. As long as the tiles are sound, terracotta roofs can be cleaned, re-pointed and repaired, keeping the character of an older Black Rock home.</p>
<h3>How long does a roof restoration take?</h3>
<p>Most homes are completed in a few days, weather depending. We will confirm a timeframe with your quote.</p>`,
      nearby: `<p>We also work on roofs in nearby <a href="/roof-restoration-beaumaris/">Beaumaris</a>, <a href="/roof-restoration-hampton/">Hampton</a>, <a href="/mentone/">Mentone</a> and <a href="/cheltenham/">Cheltenham</a>.</p>`,
    },
  },

  "st-kilda": {
    seoTitle: "Roof Restoration & Repairs St Kilda",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in St Kilda. Sandhurst Roofing restores heritage, period and apartment roofs. Free quotes, 30+ years.",
    suburb: "St Kilda",
    parts: {
      h1: "Roof Restoration &amp; Repairs in St Kilda",
      intro: `<p>Sandhurst Roofing has worked on roofs across St Kilda for over 30 years, from heritage homes to apartment blocks. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile, metal and period roofs. Call Steve on ${PHONE} for a free quote.</p>`,
      imgIntro: ["/images/wp/2023/01/roof-restoration-st-kilda.jpg", "Roof restoration on a St Kilda home"],
      common: `<p>St Kilda has some of Melbourne's most distinctive housing, from grand Victorian and Edwardian homes and terraces to Art Deco apartment blocks, much of it under heritage overlays. Roofs here range from <a href="/terracotta-tiles/">terracotta</a> and slate to metal, often with parapet walls and box gutters that need careful attention.</p>
<p>Being inner-bayside, St Kilda gets salt in the air, and its older roofs face the usual wear of age: cracked and slipped tiles, worn pointing, and leaks where parapet flashings or box gutters have failed. On period buildings and apartments, blocked or undersized box gutters are a common cause of internal leaks. Working sympathetically with the original materials matters here.</p>`,
      reroof: `<p>Where a St Kilda roof is beyond restoring, we re-roof and re-sheet with materials chosen to suit the building, including <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> where it is appropriate, and we renew failed box gutters. On heritage and period buildings we work to keep the look in step with the original. If you are dealing with repeated leaks or failed flashings, we will give you a clear comparison of repair versus replacement.</p>`,
      imgReroof: ["/images/wp/2023/01/colorbond-roofing-st-kilda.jpg", "COLORBOND steel roofing on a St Kilda building"],
      repairs: `<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> and tilers handle the jobs period and apartment buildings need most: box gutter and parapet flashing repairs, slate and terracotta tile repairs, re-bedding and repointing ridge capping, leak detection, and <a href="/gutter-repairs/">gutter repairs</a> and replacement. On St Kilda's terraces and apartment blocks, keeping box gutters clear and watertight is the single best way to prevent internal water damage.</p>`,
      imgGutter: ["/images/wp/2023/01/gutter-replacement-st-kilda.jpg", "Gutter replacement on a St Kilda building"],
      cost: `<p>We quote on each roof individually. With St Kilda's period and apartment buildings, cost depends on the roof's size and pitch, the materials involved, the condition of the ridge capping, parapet flashings and box gutters, the amount of guttering, and safe access in dense inner-city streets. Your written quote sets out exactly what is included.</p>`,
      process: `<p>We start with a free inspection and a written quote. A restoration involves a high-pressure clean where suitable, re-bedding and repointing ridge capping, replacing broken or slipped tiles, repairing box gutters and flashings, and a protective coating where appropriate. A re-roof means removing the old roof and re-sheeting with the right material for the building. We leave the site clean and tidy.</p>`,
      why: `<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and experience on the period, heritage and apartment roofs St Kilda is full of. As a family business we give honest advice and careful workmanship, and we are happy to work with owners, renters' agents and bodies corporate. Browse the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a> if a metal re-roof suits your building.</p>`,
      faqs: `<h3>Do you work on heritage and period St Kilda homes?</h3>
<p>Yes. We are experienced with Victorian, Edwardian and Art Deco buildings, and we work sympathetically with slate, terracotta and original detailing wherever we can.</p>
<h3>My apartment block keeps getting box gutter leaks. Can you help?</h3>
<p>Yes. Blocked, corroded or undersized box gutters are a common cause of leaks on terraces and apartment blocks. We repair and renew them to stop water getting inside.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, all quotes are free and without obligation. Call Steve on 0448 812 800.</p>`,
      nearby: `<p>We also work on roofs elsewhere across bayside Melbourne, including <a href="/roof-restoration-hampton/">Hampton</a>, <a href="/black-rock/">Black Rock</a>, <a href="/roof-restoration-beaumaris/">Beaumaris</a> and <a href="/roof-restoration-highett/">Highett</a>.</p>`,
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
    `✓ ${slug.padEnd(13)} ${String(words).padStart(4)}w  ${h2s} H2s  | seoTitle "${data.seoTitle}" (${data.seoTitle.length}+20=${data.seoTitle.length + 20}) desc ${data.seoDescription.length}`
  );
  count++;
}
console.log(`\nRewrote ${count} location pages.`);
