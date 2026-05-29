#!/usr/bin/env node
/**
 * Batch 1 location-page rewrites: unique, locally-specific body copy for the
 * 5 priority re-roofing suburbs (frankston, langwarrin, seaford, mornington,
 * mount-eliza).
 *
 * Replaces templated boilerplate with hand-written content modelled on the
 * already-strong roof-restoration-* pages. Targets GSC-confirmed demand:
 * roof restoration/re-roofing/repairs + repointing + Colorbond/roof painting +
 * gutters/roof plumbing, plus cost-factor guidance and helpful FAQs.
 *
 * Guardrails honoured: no fabricated stats/projects, real testimonials only
 * (the two already on-site), Australian spelling, no em dashes.
 *
 * Sets content + seoTitle + seoDescription. seoTitle kept <=40 chars because
 * the root layout appends " | Sandhurst Roofing" (20 chars) -> final <=60.
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

const pages = {
  frankston: {
    seoTitle: "Roof Restoration & Re-Roofing Frankston",
    seoDescription:
      "Roof restoration, re-roofing and repairs in Frankston. Sandhurst Roofing restores and replaces tile and metal roofs built for bayside conditions. Free quotes.",
    content: `
<h2><strong>Roof Restoration &amp; Re-Roofing in Frankston</strong></h2>
<p>Sandhurst Roofing is a family owned roofing business with more than 30 years of experience looking after homes right across Frankston. From a full <a href="/roof-restoration/">roof restoration</a> to a complete <a href="/re-roofing/">re-roof</a>, gutter replacement or a quick repair after a storm, we handle tile and metal roofs of every kind and back every job with honest advice and quality workmanship.</p>
<p>Frankston is our backyard, so we know what local roofs are up against, and we quote on it fairly. Call Steve on ${PHONE} for a free, no-obligation quote.</p>
${img("/images/wp/2018/10/roof-painting-and-re-pointing.jpg", "Roof painting and repointing on a Frankston home")}
${cta()}

<h2><strong>Roofs in Frankston: What We Commonly See</strong></h2>
<p>Frankston has a real mix of housing, from post-war weatherboards and 1960s to 80s brick-veneer homes to newer builds and apartments. A lot of those older homes still wear their original concrete tile roofs, which are now well past the point where the protective coating has worn away and the tiles have gone porous and faded.</p>
<p>Closer to the foreshore and around Olivers Hill, salty air off Port Phillip Bay speeds up rust on metal roofs, valley irons, flashings and gutters. The problems we are called out for most often are cracked and slipped ridge capping, brittle or broken tiles, rusted valleys and box gutters, and guttering that no longer drains properly. Catching these early is the difference between a restoration and a full roof replacement.</p>

<h2><strong>Re-Roofing &amp; Roof Replacement in Frankston</strong></h2>
<p>When a roof is too far gone for a restoration to be worthwhile, replacing it is the smarter long-term spend. We re-roof Frankston homes in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a>, which is light, durable and well suited to our coastal weather, and we convert tired tile roofs to metal where it makes sense for the home and the budget.</p>
<p>If your roof has widespread leaks, sagging, large numbers of broken tiles, old brittle fibre cement or badly rusted metal sheeting, talk to us about a re-roof before you keep paying for patch repairs. We will give you a straight answer on whether restoration or replacement is the better value.</p>
${img("/images/wp/2018/10/new-pergola-roof.jpg", "New metal roof installed on a Frankston property")}

<h2><strong>Roof Repairs, Repointing &amp; Gutters in Frankston</strong></h2>
<p>Not every job is a full restoration. Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> and tilers also handle leak detection and <a href="/roof-repairs/">roof repairs</a>, re-bedding and repointing of ridge capping, replacement of broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, rusted valley and <a href="/flat-metal-roofing/">flat metal roof</a> repairs, and <a href="/guttering/">guttering</a> repairs and replacement in COLORBOND&reg; steel. Flexible pointing on the ridge capping is one of the best-value jobs you can do, as it stops water tracking under the tiles long before it becomes an internal leak.</p>

<h2><strong>What Affects the Cost of Roofing in Frankston</strong></h2>
<p>Every roof is different, so we quote on what is actually in front of us rather than a one-size-fits-all price. The main things that move the cost are the size and pitch of the roof, whether it is tile or metal, how many tiles or sheets need replacing, the condition of the ridge capping and valleys, the amount of guttering involved, and how easy the roof is to access safely. We will walk you through exactly what your quote covers so there are no surprises.</p>

<h2><strong>Our Frankston Roofing Process</strong></h2>
<p>We start with a free on-site inspection and a written quote. For a restoration we high-pressure clean the roof, re-bed and repoint the ridge capping, replace any broken tiles and rusted valleys, carry out repairs, then finish with a three-coat protective membrane in the colour you choose. For a re-roof we strip the old roof and re-sheet in new COLORBOND&reg; steel. Either way we leave the site clean and tidy when we are done.</p>

<h2><strong>Why Frankston Locals Choose Sandhurst Roofing</strong></h2>
<p>We are fully licensed and insured, with registered roof tilers and roof plumbers on the team, so your job is done to standard and you are covered. As a local, family run business we treat your home the way we would treat our own, turn up when we say we will, and give honest advice rather than a hard sell. Browse the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a> to start picturing your new roof.</p>
${reviews("Frankston")}

<h2><strong>Frankston Roofing FAQs</strong></h2>
<h3>Should I restore or replace my Frankston roof?</h3>
<p>If the tiles or sheets are structurally sound and the issue is worn coating, pointing or a few broken tiles, a restoration is usually the best value. If there is widespread leaking, sagging or large-scale rust, a re-roof will cost less over time. We will tell you honestly which one your roof needs.</p>
<h3>Does living near the bay affect my roof?</h3>
<p>Yes. Salt air around the Frankston foreshore corrodes metal roofs, fixings and gutters faster than inland, so coastal homes benefit from regular checks and quality COLORBOND&reg; materials.</p>
<h3>How long does a roof restoration take?</h3>
<p>Most homes are completed in a few days, weather depending. We will give you a realistic timeframe with your quote.</p>

<h2><strong>Suburbs We Service Near Frankston</strong></h2>
<p>As well as Frankston we look after nearby homes in <a href="/frankston-north/">Frankston North</a>, <a href="/langwarrin/">Langwarrin</a>, <a href="/mount-eliza/">Mount Eliza</a>, <a href="/mornington/">Mornington</a>, <a href="/seaford/">Seaford</a> and <a href="/carrum-downs/">Carrum Downs</a>.</p>

<h2><strong>Get a Free Roofing Quote in Frankston</strong></h2>
<p>Ready to sort your roof? Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below and we will get back to you as soon as we can.</p>
${cta()}`,
  },

  langwarrin: {
    seoTitle: "Roof Restoration & Repairs Langwarrin",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Langwarrin. Sandhurst Roofing restores tile and metal roofs on Langwarrin's leafy blocks. Free quotes.",
    content: `
<h2><strong>Roof Restoration &amp; Repairs in Langwarrin</strong></h2>
<p>Sandhurst Roofing has been restoring and repairing roofs across Langwarrin for over 30 years. We are a family owned business offering everything from <a href="/roof-restoration/">roof restoration</a> and <a href="/re-roofing/">re-roofing</a> to <a href="/roof-repairs/">roof repairs</a> and guttering, on tile and metal roofs alike. Call Steve on ${PHONE} for a free quote.</p>
${img("/images/wp/2018/10/new-roof-3.jpg", "Restored tile roof on a Langwarrin home")}
${cta()}

<h2><strong>Roofs in Langwarrin: What We Commonly See</strong></h2>
<p>Langwarrin homes tend to sit on larger, leafy blocks, with plenty of 1970s to 90s brick homes under concrete tile alongside newer estate housing in <a href="/colorbond-roofing/">COLORBOND&reg;</a>. The mature gums the area is known for are great for shade but tough on roofs, dropping leaves and bark into gutters and valleys all year. That debris traps moisture against the roof and speeds up rust, rot and tile deterioration.</p>
<p>The jobs we are called out for most in Langwarrin are blocked and overflowing gutters, cracked and lifted ridge capping, faded and porous tiles, and the odd leak where a valley or flashing has given way. Being a little more sheltered inland helps, but our hot summers, winter rain and the occasional hailstorm still take their toll.</p>

<h2><strong>Re-Roofing &amp; Roof Replacement in Langwarrin</strong></h2>
<p>If your Langwarrin roof is leaking in several places, sagging, or carrying a lot of broken or brittle tiles, a re-roof can be better value than repeated repairs. We replace tile and metal roofs in COLORBOND&reg; steel and can convert an old tile roof to metal where it suits the home. We will give you a clear comparison of restoring versus replacing so you can make the right call.</p>

<h2><strong>Roof Repairs, Repointing &amp; Gutters in Langwarrin</strong></h2>
<p>Our team also takes care of the smaller jobs that protect your home: re-bedding and repointing ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a>, fixing leaks and rusted valleys, and repairing or replacing guttering. With so many tree-lined streets in Langwarrin, keeping gutters and valleys clear and well sealed is one of the best things you can do to avoid water damage.</p>
${img("/images/wp/2018/10/42406719_2249846578377760_8970816792935006208_n.jpg", "Roof and gutter work completed in Langwarrin")}

<h2><strong>What Affects the Cost of Roofing in Langwarrin</strong></h2>
<p>We price each roof on its own merits. The main cost factors are the roof's size and pitch, tile versus metal, how many tiles or sheets need replacing, the state of the ridge capping and valleys, the length of guttering involved, and safe access to the roof. You will get a written quote that spells out exactly what is included.</p>

<h2><strong>Our Langwarrin Roofing Process</strong></h2>
<p>It starts with a free inspection and a written quote. A restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, any repairs needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up properly before we leave.</p>

<h2><strong>Why Langwarrin Locals Choose Sandhurst Roofing</strong></h2>
<p>We are fully licensed and insured, with registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> on the team. As a local family business we give honest, no-pressure advice and quality workmanship, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>
${reviews("Langwarrin")}

<h2><strong>Langwarrin Roofing FAQs</strong></h2>
<h3>My gutters keep blocking with leaves. What can I do?</h3>
<p>With Langwarrin's tree cover this is common. Regular cleaning, quality COLORBOND&reg; guttering and well-sealed valleys all help, and we can advise on gutter guard during your quote.</p>
<h3>Can you restore an old concrete tile roof?</h3>
<p>In most cases yes. As long as the tiles are sound, a clean, re-point and re-coat can add years to the roof and transform how it looks.</p>
<h3>Do you offer free quotes in Langwarrin?</h3>
<p>Yes, every quote is free and there is no obligation. Call Steve on 0448 812 800 to book a time.</p>

<h2><strong>Suburbs We Service Near Langwarrin</strong></h2>
<p>We also work on roofs in nearby <a href="/frankston/">Frankston</a>, <a href="/mount-eliza/">Mount Eliza</a>, <a href="/mornington/">Mornington</a>, <a href="/seaford/">Seaford</a> and <a href="/devon-meadows/">Devon Meadows</a>.</p>

<h2><strong>Get a Free Roofing Quote in Langwarrin</strong></h2>
<p>Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below for your free Langwarrin roofing quote.</p>
${cta()}`,
  },

  seaford: {
    seoTitle: "Roof Restoration & Repairs Seaford",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Seaford. Sandhurst Roofing protects beachside roofs from salt-air corrosion. Free quotes, 30+ years local.",
    content: `
<h2><strong>Roof Restoration &amp; Re-Roofing in Seaford</strong></h2>
<p>Sandhurst Roofing has looked after beachside homes in Seaford for more than 30 years. We are a family owned business offering <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/guttering/">guttering</a> on tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>
${img("/images/wp/2019/11/roof-restoration-seaford.jpg", "Roof restoration on a Seaford beachside home")}
${cta()}

<h2><strong>Roofs in Seaford: What We Commonly See</strong></h2>
<p>Seaford sits right on the bay between Frankston and Carrum, and that beachside position is hard on roofs. Salt-laden air corrodes metal roofs, ridge capping fixings, valleys and gutters far faster than it does inland. Many of Seaford's older beach houses and post-war homes carry concrete tile or early metal roofs that have lost their protective coating and gone porous or rusty.</p>
<p>The problems we see most in Seaford are rusted gutters and valleys, lifted and cracked ridge capping, faded tiles, and leaks where corroded flashings have failed. With the wetlands and foreshore nearby, keeping water moving off and away from the roof matters more here than almost anywhere.</p>
${img("/images/wp/2019/11/gutter-repairs-seaford.jpg", "Gutter replacement on a Seaford home")}

<h2><strong>Re-Roofing &amp; Roof Replacement in Seaford</strong></h2>
<p>Salt air shortens the life of a roof, so for many Seaford homes a full re-roof in <a href="/colorbond-roofing/">COLORBOND&reg; steel</a> is the most cost-effective long-term fix. COLORBOND&reg; is built to handle coastal conditions, and we can replace tile or metal roofs and convert old tile roofs to metal. If your roof is rusting through, leaking in multiple spots or beyond economical repair, ask us about replacing it.</p>

<h2><strong>Roof Repairs, Repointing &amp; Gutters in Seaford</strong></h2>
<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> handle leak repairs, re-bedding and repointing of ridge capping, replacing broken <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tiles</a> and rusted <a href="/flat-metal-roofing/">metal sheeting</a>, and gutter repairs and replacement. In a salt-air suburb like Seaford, replacing rusted gutters and valleys with quality COLORBOND&reg; steel is one of the best ways to protect the home from water damage.</p>

<h2><strong>What Affects the Cost of Roofing in Seaford</strong></h2>
<p>We quote on each roof individually. Cost comes down to the size and pitch of the roof, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, how much guttering is involved, and safe access. Coastal corrosion can add to the work needed, and we will show you exactly what your quote covers.</p>

<h2><strong>Our Seaford Roofing Process</strong></h2>
<p>After a free inspection and written quote, a restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and corroded valleys, repairs as needed, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We clean up the site before we leave.</p>

<h2><strong>Why Seaford Locals Choose Sandhurst Roofing</strong></h2>
<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and we understand the demands the coast places on local roofs. As a family business we give honest advice and quality workmanship, and we can help you pick a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>
${reviews("Seaford")}

<h2><strong>Seaford Roofing FAQs</strong></h2>
<h3>Why do my gutters rust so quickly in Seaford?</h3>
<p>Salt air off the bay accelerates corrosion. Replacing old gutters with quality COLORBOND&reg; steel and keeping them clear of debris will get you a much longer life.</p>
<h3>Is COLORBOND&reg; better than tiles near the beach?</h3>
<p>For exposed coastal homes, COLORBOND&reg; steel is a strong choice because it is designed to resist salt and weather. Tiles can still work well when properly maintained and re-coated.</p>
<h3>How often should a coastal roof be checked?</h3>
<p>We recommend a check every couple of years for beachside homes, so small areas of rust or failed pointing are caught before they cause leaks.</p>

<h2><strong>Suburbs We Service Near Seaford</strong></h2>
<p>We also service nearby <a href="/frankston/">Frankston</a>, <a href="/carrum-downs/">Carrum Downs</a>, <a href="/chelsea-heights/">Chelsea Heights</a>, <a href="/patterson-lakes/">Patterson Lakes</a> and <a href="/langwarrin/">Langwarrin</a>.</p>

<h2><strong>Get a Free Roofing Quote in Seaford</strong></h2>
<p>Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below for your free Seaford roofing quote.</p>
${cta()}`,
  },

  mornington: {
    seoTitle: "Roof Restoration & Re-Roofing Mornington",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Mornington. Sandhurst Roofing restores terracotta, tile and metal roofs on the Peninsula. Free quotes.",
    content: `
<h2><strong>Roof Restoration &amp; Re-Roofing in Mornington</strong></h2>
<p>Sandhurst Roofing has been restoring and replacing roofs across Mornington and the Peninsula for over 30 years. Our family owned team handles <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and <a href="/gutter-repairs/">gutter repairs</a> on terracotta, concrete tile and metal roofs. Call Steve on ${PHONE} for a free quote.</p>
${img("/images/wp/2018/10/new-roof-with-gutters-and-downpipes.jpg", "New roof, gutters and downpipes on a Mornington home")}
${cta()}

<h2><strong>Roofs in Mornington: What We Commonly See</strong></h2>
<p>Mornington's roofs range from heritage <a href="/terracotta-tiles/">terracotta</a> and <a href="/cement-tiles/">concrete tile</a> on its older established homes through to <a href="/colorbond-roofing/">COLORBOND&reg;</a> on newer coastal builds and holiday homes. Exposed sites near the bay and the cliffs cop strong winds and salt spray, which lift and crack ridge capping, fade tile coatings and corrode metal fixings and gutters over time.</p>
<p>The work we are called out for most in Mornington is repointing loose ridge capping, replacing cracked or slipped tiles, fixing leaks around flashings and valleys, and replacing tired or rusted guttering. Keeping a roof well maintained here protects both the home and its street appeal, which matters in a sought-after coastal town.</p>

<h2><strong>Re-Roofing &amp; Roof Replacement in Mornington</strong></h2>
<p>When a Mornington roof is past restoring, we re-roof in COLORBOND&reg; steel, which stands up well to the Peninsula's wind and salt. We replace tile and metal roofs and can convert an old tile roof to metal where it suits the home. If you are dealing with repeated leaks, sagging or widespread tile damage, a re-roof is often the better long-term investment, and we will give you a frank comparison.</p>
${img("/images/wp/2018/10/new-roof-2.jpg", "Re-roofed Mornington home in COLORBOND steel")}

<h2><strong>Roof Repairs, Repointing &amp; Gutters in Mornington</strong></h2>
<p>Our registered roof tilers and <a href="/roof-plumber-melbourne/">roof plumbers</a> also handle the everyday jobs that keep a roof watertight: re-bedding and repointing ridge capping, replacing broken tiles, repairing leaks and rusted valleys, and <a href="/guttering/">guttering</a> repairs and replacement. Flexible repointing on exposed Mornington homes is especially worthwhile, as strong winds are quick to find any loose capping.</p>

<h2><strong>What Affects the Cost of Roofing in Mornington</strong></h2>
<p>We price every roof on what it needs. The main factors are the roof's size and pitch, the material, how many tiles or sheets need replacing, the condition of the ridge capping and valleys, the amount of guttering, and safe access. You will receive a clear written quote with no hidden extras.</p>

<h2><strong>Our Mornington Roofing Process</strong></h2>
<p>We begin with a free inspection and written quote. A restoration includes a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, repairs, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. The site is left clean and tidy.</p>

<h2><strong>Why Mornington Locals Choose Sandhurst Roofing</strong></h2>
<p>We are fully licensed and insured, with registered roof tilers and roof plumbers, and decades of experience on Peninsula roofs. As a family business we give honest advice, quality workmanship and a fair price, and we are happy to help you choose a colour from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>
${reviews("Mornington")}

<h2><strong>Mornington Roofing FAQs</strong></h2>
<h3>Can you restore a heritage terracotta roof?</h3>
<p>Yes. Terracotta roofs can be cleaned, re-pointed and repaired sympathetically, and broken tiles matched where possible, to keep the character of an older Mornington home.</p>
<h3>Does coastal wind really damage roofs?</h3>
<p>It does. Strong winds off the bay lift loose ridge capping and tiles, so regular repointing and secure flashings are well worth it on exposed sites.</p>
<h3>How long does a roof restoration take?</h3>
<p>Most homes are finished within a few days, weather permitting. We will confirm a timeframe with your quote.</p>

<h2><strong>Suburbs We Service Near Mornington</strong></h2>
<p>We also look after roofs in nearby <a href="/mount-eliza/">Mount Eliza</a>, <a href="/mount-martha/">Mount Martha</a>, <a href="/frankston/">Frankston</a> and <a href="/langwarrin/">Langwarrin</a>.</p>

<h2><strong>Get a Free Roofing Quote in Mornington</strong></h2>
<p>Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below for your free Mornington roofing quote.</p>
${cta()}`,
  },

  "mount-eliza": {
    seoTitle: "Roof Restoration & Repairs Mount Eliza",
    seoDescription:
      "Roof restoration, re-roofing, repairs and gutters in Mount Eliza. Sandhurst Roofing cares for leafy bayside roofs and clogged gutters. Free quotes, 30+ years.",
    content: `
<h2><strong>Roof Restoration &amp; Re-Roofing in Mount Eliza</strong></h2>
<p>Sandhurst Roofing has cared for homes across Mount Eliza for more than 30 years. Our family owned team offers <a href="/roof-restoration/">roof restoration</a>, <a href="/re-roofing/">re-roofing</a>, <a href="/roof-repairs/">repairs</a> and guttering on tile and metal roofs of all kinds. Call Steve on ${PHONE} for a free quote.</p>
${img("/images/wp/2018/10/Roof-painting-and-repointing.jpg", "Roof painting and repointing on a Mount Eliza home")}
${cta()}

<h2><strong>Roofs in Mount Eliza: What We Commonly See</strong></h2>
<p>Mount Eliza is known for large homes on leafy, established blocks, and that mature tree cover is a double-edged sword for roofs. Constant leaf litter clogs gutters, box gutters and valleys, holding water against the roof and leading to rust, rot and overflow into the eaves. Many homes here carry concrete tile or <a href="/terracotta-tiles/">terracotta</a> roofs from the 1960s to 90s where the coating has worn thin, alongside premium <a href="/colorbond-roofing/">COLORBOND&reg;</a> re-roofs.</p>
<p>The jobs we handle most in Mount Eliza are clearing and repairing overflowing gutters and valleys, repointing lifted ridge capping, replacing cracked tiles, and tracing leaks back to a failed flashing. On the bay side, salt air adds to the wear on metal roofs and fixings.</p>

<h2><strong>Re-Roofing &amp; Roof Replacement in Mount Eliza</strong></h2>
<p>For homes where the roof is leaking, sagging or carrying too many broken tiles to restore economically, a re-roof is the better long-term value. We replace tile and metal roofs in COLORBOND&reg; steel and can convert older tile roofs to metal. Given the larger roofs common in Mount Eliza, we will give you a clear, itemised comparison of restoring versus replacing.</p>
${img("/images/wp/2018/10/42272301_2245630332132718_8421541942369714176_n.jpg", "Completed roof work on a Mount Eliza property")}

<h2><strong>Roof Repairs, Repointing &amp; Gutters in Mount Eliza</strong></h2>
<p>Our registered <a href="/roof-plumber-melbourne/">roof plumbers</a> and tilers take care of leak repairs, re-bedding and repointing ridge capping, replacing broken <a href="/cement-tiles/">concrete</a> and terracotta tiles, repairing rusted valleys and <a href="/flat-metal-roofing/">metal sheeting</a>, and gutter repairs and replacement. With so many trees in Mount Eliza, keeping gutters, box gutters and valleys clear and well sealed is the single best way to prevent water damage.</p>

<h2><strong>What Affects the Cost of Roofing in Mount Eliza</strong></h2>
<p>We quote on each roof individually. The main cost factors are the roof's size and pitch, tile versus metal, the number of tiles or sheets to replace, the condition of the ridge capping and valleys, the amount of guttering and box guttering involved, and safe access on larger homes. Your written quote will set out exactly what is included.</p>

<h2><strong>Our Mount Eliza Roofing Process</strong></h2>
<p>We start with a free inspection and written quote. A restoration involves a high-pressure clean, re-bedding and repointing the ridge capping, replacing broken tiles and rusted valleys, any repairs, and a three-coat protective membrane in your chosen colour. A re-roof means stripping the old roof and re-sheeting in new COLORBOND&reg; steel. We always leave the site clean.</p>

<h2><strong>Why Mount Eliza Locals Choose Sandhurst Roofing</strong></h2>
<p>We are fully licensed and insured, with registered roof tilers and roof plumbers and decades of local experience. As a family run business we give honest, no-pressure advice and quality workmanship, and we can help you choose from the <a href="/colorbond-colour-chart/">COLORBOND&reg; colour chart</a>.</p>
${reviews("Mount Eliza")}

<h2><strong>Mount Eliza Roofing FAQs</strong></h2>
<h3>My gutters overflow whenever it rains. Why?</h3>
<p>In leafy Mount Eliza this is almost always leaf litter blocking the gutters, valleys or downpipes. We clear, repair or replace them and can advise on gutter guard to reduce future build-up.</p>
<h3>Can you work on large or steep roofs?</h3>
<p>Yes. We are set up to work safely on the larger, multi-level roofs common in Mount Eliza, and we factor safe access into every quote.</p>
<h3>Do you offer free quotes?</h3>
<p>Yes, all quotes are free and without obligation. Call Steve on 0448 812 800 to arrange a visit.</p>

<h2><strong>Suburbs We Service Near Mount Eliza</strong></h2>
<p>We also service nearby <a href="/mornington/">Mornington</a>, <a href="/mount-martha/">Mount Martha</a>, <a href="/frankston/">Frankston</a> and <a href="/langwarrin/">Langwarrin</a>.</p>

<h2><strong>Get a Free Roofing Quote in Mount Eliza</strong></h2>
<p>Call Steve on ${PHONE}, email <a href="mailto:info@sandhurstroofing.com.au">info@sandhurstroofing.com.au</a>, or fill out the form below for your free Mount Eliza roofing quote.</p>
${cta()}`,
  },
};

let count = 0;
for (const [slug, data] of Object.entries(pages)) {
  const full = path.join(DIR, `${slug}.json`);
  const json = JSON.parse(fs.readFileSync(full, "utf8"));
  json.content = data.content.replace(/\n{2,}/g, "\n").trim();
  json.seoTitle = data.seoTitle;
  json.seoDescription = data.seoDescription;
  fs.writeFileSync(full, JSON.stringify(json, null, 2));
  const words = data.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
  const h2s = (data.content.match(/<h2/g) || []).length;
  console.log(`✓ ${slug.padEnd(14)} ${words}w  ${h2s} H2s  | seoTitle: "${data.seoTitle}" (${data.seoTitle.length}+20=${data.seoTitle.length + 20})`);
  count++;
}
console.log(`\nRewrote ${count} location pages.`);
