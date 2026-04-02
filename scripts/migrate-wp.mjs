#!/usr/bin/env node
/**
 * WordPress to Next.js Migration Script
 * Parses WP XML export, strips Divi shortcodes, extracts clean content,
 * downloads images, and generates JSON content files.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';
import https from 'https';
import http from 'http';

const XML_FILE = '/Users/heathmaes/Downloads/sandhurstroofing.WordPress.2026-04-02.xml';
const OUTPUT_DIR = join(process.cwd(), 'content');
const PUBLIC_DIR = join(process.cwd(), 'public');
const IMAGES_DIR = join(PUBLIC_DIR, 'images', 'wp');

// ─── XML Parsing Helpers ───────────────────────────────────────────

function extractItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    items.push(match[1]);
  }
  return items;
}

function getTag(item, tag) {
  // Handle namespaced tags like wp:post_type
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<${escapedTag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${escapedTag}>`, 'i');
  let match = regex.exec(item);
  if (match) return match[1];

  const regex2 = new RegExp(`<${escapedTag}>([^<]*)<\\/${escapedTag}>`, 'i');
  match = regex2.exec(item);
  if (match) return match[1].trim();

  return '';
}

function getPostMeta(item) {
  const meta = {};
  const metaRegex = /<wp:postmeta>\s*<wp:meta_key>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/wp:meta_key>\s*<wp:meta_value>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/wp:meta_value>\s*<\/wp:postmeta>/g;
  let match;
  while ((match = metaRegex.exec(item)) !== null) {
    meta[match[1]] = match[2];
  }
  return meta;
}

function getCategories(item) {
  const cats = [];
  const catRegex = /<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g;
  let match;
  while ((match = catRegex.exec(item)) !== null) {
    cats.push(match[1]);
  }
  return cats;
}

// ─── Divi Shortcode Stripping ──────────────────────────────────────

function stripDiviShortcodes(content) {
  if (!content) return '';

  let text = content;

  // Remove Divi section/row/column wrappers (keep inner content)
  const wrapperTags = [
    'et_pb_section', 'et_pb_row', 'et_pb_row_inner',
    'et_pb_column', 'et_pb_column_inner',
    'et_pb_text', 'et_pb_code',
  ];
  for (const tag of wrapperTags) {
    // Remove opening tags with attributes
    text = text.replace(new RegExp(`\\[${tag}[^\\]]*\\]`, 'g'), '');
    // Remove closing tags
    text = text.replace(new RegExp(`\\[\\/${tag}\\]`, 'g'), '');
  }

  // Extract content from et_pb_toggle (FAQ accordions)
  // [et_pb_toggle title="Question" ...]Answer[/et_pb_toggle]
  text = text.replace(/\[et_pb_toggle\s+title="([^"]*)"[^\]]*\]([\s\S]*?)\[\/et_pb_toggle\]/g, (_, title, answer) => {
    return `<div class="faq-item"><h3>${title}</h3><div>${answer}</div></div>`;
  });

  // Extract from et_pb_blurb (icon cards)
  text = text.replace(/\[et_pb_blurb\s+title="([^"]*)"[^\]]*\]([\s\S]*?)\[\/et_pb_blurb\]/g, (_, title, body) => {
    return `<div class="blurb"><h3>${title}</h3><div>${body}</div></div>`;
  });

  // Extract image URLs from et_pb_image
  text = text.replace(/\[et_pb_image\s+[^\]]*src="([^"]*)"[^\]]*\]\[\/et_pb_image\]/g, (_, src) => {
    return `<img src="${src}" />`;
  });
  // Self-closing variant
  text = text.replace(/\[et_pb_image\s+[^\]]*src="([^"]*)"[^\]]*\/\]/g, (_, src) => {
    return `<img src="${src}" />`;
  });

  // Extract buttons
  text = text.replace(/\[et_pb_button\s+[^\]]*button_text="([^"]*)"[^\]]*button_url="([^"]*)"[^\]]*\]\[\/et_pb_button\]/g, (_, btnText, url) => {
    return `<a href="${url}" class="btn">${btnText}</a>`;
  });
  // Reverse order of attributes
  text = text.replace(/\[et_pb_button\s+[^\]]*button_url="([^"]*)"[^\]]*button_text="([^"]*)"[^\]]*\]\[\/et_pb_button\]/g, (_, url, btnText) => {
    return `<a href="${url}" class="btn">${btnText}</a>`;
  });

  // Extract testimonials
  text = text.replace(/\[et_pb_testimonial\s+author="([^"]*)"[^\]]*\]([\s\S]*?)\[\/et_pb_testimonial\]/g, (_, author, body) => {
    return `<blockquote><p>${body.trim()}</p><cite>${author}</cite></blockquote>`;
  });

  // Extract slider content
  text = text.replace(/\[et_pb_slide\s+heading="([^"]*)"[^\]]*\]([\s\S]*?)\[\/et_pb_slide\]/g, (_, heading, body) => {
    return `<div class="slide"><h2>${heading}</h2><div>${body}</div></div>`;
  });

  // Remove remaining Divi shortcodes we don't need
  const removeTags = [
    'et_pb_fullwidth_slider', 'et_pb_slider', 'et_pb_sidebar',
    'et_pb_divider', 'et_pb_contact_form', 'et_pb_contact_field',
    'et_pb_fullwidth_header', 'et_pb_fullwidth_image',
    'et_pb_fullwidth_menu', 'et_pb_counters', 'et_pb_counter',
    'et_pb_video', 'et_pb_gallery', 'et_pb_tabs', 'et_pb_tab',
  ];
  for (const tag of removeTags) {
    text = text.replace(new RegExp(`\\[${tag}[^\\]]*\\]([\\s\\S]*?)\\[\\/${tag}\\]`, 'g'), '$1');
    text = text.replace(new RegExp(`\\[${tag}[^\\]]*\\/\\]`, 'g'), '');
    text = text.replace(new RegExp(`\\[${tag}[^\\]]*\\]`, 'g'), '');
    text = text.replace(new RegExp(`\\[\\/${tag}\\]`, 'g'), '');
  }

  // Remove third-party shortcodes (keep nothing)
  text = text.replace(/\[(?:dropcap|bafg|trustindex|instagram-feed|logoshowcase|saswp_divi_faqblock)[^\]]*\]/g, '');
  text = text.replace(/\[\/dropcap\]/g, '');

  // Remove any remaining shortcodes we missed
  text = text.replace(/\[et_pb_[^\]]*\]/g, '');
  text = text.replace(/\[\/et_pb_[^\]]*\]/g, '');

  // Clean up HTML
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&#8217;/g, "'");
  text = text.replace(/&#8216;/g, "'");
  text = text.replace(/&#8220;/g, '"');
  text = text.replace(/&#8221;/g, '"');
  text = text.replace(/&#8211;/g, '-');
  text = text.replace(/&#8212;/g, '-');
  text = text.replace(/&#038;/g, '&');
  text = text.replace(/&nbsp;/g, ' ');

  // Remove excessive whitespace/newlines
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
}

// ─── Extract plain text from HTML (for descriptions) ───────────────

function htmlToText(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Collect image URLs from content ───────────────────────────────

function collectImageUrls(content) {
  const urls = new Set();
  // From img src
  const imgRegex = /src="(https?:\/\/sandhurstroofing\.com\.au\/wp-content\/uploads\/[^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    urls.add(match[1]);
  }
  // From Divi background_image
  const bgRegex = /background_image="(https?:\/\/sandhurstroofing\.com\.au\/wp-content\/uploads\/[^"]+)"/g;
  while ((match = bgRegex.exec(content)) !== null) {
    urls.add(match[1]);
  }
  return [...urls];
}

// ─── Download image ────────────────────────────────────────────────

import { createWriteStream } from 'fs';

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = createWriteStream(destPath);
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

// ─── Rewrite image URLs to local paths ─────────────────────────────

function rewriteImageUrls(content) {
  return content.replace(
    /https?:\/\/sandhurstroofing\.com\.au\/wp-content\/uploads\/([^"'\s)]+)/g,
    '/images/wp/$1'
  );
}

// ─── Main ──────────────────────────────────────────────────────────

async function main() {
  console.log('Reading WordPress XML export...');
  const xml = readFileSync(XML_FILE, 'utf-8');
  console.log(`File size: ${(xml.length / 1024 / 1024).toFixed(1)} MB`);

  const items = extractItems(xml);
  console.log(`Found ${items.length} items total`);

  // Categorize items
  const pages = [];
  const posts = [];
  const attachments = [];
  const bafgItems = [];
  const navMenuItems = [];
  const allImageUrls = new Set();

  for (const item of items) {
    const postType = getTag(item, 'wp:post_type');
    const status = getTag(item, 'wp:status');
    const title = getTag(item, 'title');
    const slug = getTag(item, 'wp:post_name');
    const content = getTag(item, 'content:encoded');
    const postId = getTag(item, 'wp:post_id');
    const postDate = getTag(item, 'wp:post_date');
    const meta = getPostMeta(item);

    // Collect image URLs from all content
    if (content) {
      collectImageUrls(content).forEach(url => allImageUrls.add(url));
    }

    if (postType === 'attachment') {
      const attachUrl = getTag(item, 'wp:attachment_url');
      if (attachUrl) {
        attachments.push({ postId, title, url: attachUrl, meta });
        if (attachUrl.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
          allImageUrls.add(attachUrl);
        }
      }
      continue;
    }

    if (status !== 'publish') continue;

    if (postType === 'page') {
      const parentId = getTag(item, 'wp:post_parent');
      pages.push({
        id: postId,
        title,
        slug,
        content: stripDiviShortcodes(content),
        rawContent: content,
        parentId,
        meta,
        seoTitle: meta['_yoast_wpseo_title'] || '',
        seoDesc: meta['_yoast_wpseo_metadesc'] || '',
        thumbnailId: meta['_thumbnail_id'] || '',
      });
    } else if (postType === 'post') {
      const categories = getCategories(item);
      posts.push({
        id: postId,
        title,
        slug,
        date: postDate,
        content: stripDiviShortcodes(content),
        rawContent: content,
        categories,
        meta,
        seoTitle: meta['_yoast_wpseo_title'] || '',
        seoDesc: meta['_yoast_wpseo_metadesc'] || '',
        thumbnailId: meta['_thumbnail_id'] || '',
      });
    } else if (postType === 'bafg') {
      bafgItems.push({
        id: postId,
        title,
        meta,
        beforeImage: meta['bafg_before_image'] || '',
        afterImage: meta['bafg_after_image'] || '',
        description: meta['bafg_slider_description'] || '',
      });
      if (meta['bafg_before_image']) allImageUrls.add(meta['bafg_before_image']);
      if (meta['bafg_after_image']) allImageUrls.add(meta['bafg_after_image']);
    } else if (postType === 'nav_menu_item') {
      navMenuItems.push({
        id: postId,
        title,
        url: meta['_menu_item_url'] || '',
        objectId: meta['_menu_item_object_id'] || '',
        parentId: meta['_menu_item_menu_item_parent'] || '0',
        menuOrder: getTag(item, 'wp:menu_order'),
        objectType: meta['_menu_item_object'] || '',
        type: meta['_menu_item_type'] || '',
      });
    }
  }

  // Create attachment lookup (postId -> URL)
  const attachmentLookup = {};
  for (const att of attachments) {
    attachmentLookup[att.postId] = att.url;
  }

  // Resolve featured images
  for (const page of pages) {
    if (page.thumbnailId && attachmentLookup[page.thumbnailId]) {
      page.featuredImage = attachmentLookup[page.thumbnailId];
      allImageUrls.add(page.featuredImage);
    }
  }
  for (const post of posts) {
    if (post.thumbnailId && attachmentLookup[post.thumbnailId]) {
      post.featuredImage = attachmentLookup[post.thumbnailId];
      allImageUrls.add(post.featuredImage);
    }
  }

  console.log(`\nContent extracted:`);
  console.log(`  Pages: ${pages.length}`);
  console.log(`  Posts: ${posts.length}`);
  console.log(`  Attachments: ${attachments.length}`);
  console.log(`  Before/After Gallery: ${bafgItems.length}`);
  console.log(`  Nav Menu Items: ${navMenuItems.length}`);
  console.log(`  Unique image URLs: ${allImageUrls.size}`);

  // ─── Classify pages ────────────────────────────────────────────

  // Known service page slugs
  const serviceSlugs = new Set([
    'roof-repairs', 'colorbond-roofing', 'terracotta-tiles', 'cement-tiles',
    'guttering', 'flat-metal-roofing', 'roof-restoration', 're-roofing',
    'roof-painting', 'roof-plumber-melbourne', 'gutter-repairs',
    'gutter-replacement', 'rebedding-repointing',
    'asbestos-roof-removal-and-replacement', 'tile-to-tin-roof', 'pergola',
  ]);

  // Known core page slugs
  const coreSlugs = new Set([
    'home', 'about-us', 'faq', 'reviews', 'contact', 'blog',
    'thank-you', 'covid-19', 'recent-jobs', 'service-areas',
    'colour-tools', 'colorbond-colour-chart', 'colour-visualisation-tool',
  ]);

  // Known location-specific slugs (roof-plumber-X, roof-restoration-near-me)
  const specialLocationSlugs = new Set([
    'roof-plumber-berwick', 'roof-plumber-cranbourne', 'roof-plumber-frankston',
    'roof-plumber-melbourne', 'roof-plumber-near-me', 'roof-restoration-near-me',
  ]);

  const servicePages = [];
  const corePages = [];
  const locationPages = [];

  for (const page of pages) {
    if (serviceSlugs.has(page.slug)) {
      servicePages.push(page);
    } else if (coreSlugs.has(page.slug)) {
      corePages.push(page);
    } else if (specialLocationSlugs.has(page.slug)) {
      locationPages.push(page);
    } else {
      // Assume remaining pages are location/suburb pages
      locationPages.push(page);
    }
  }

  console.log(`\nPage classification:`);
  console.log(`  Core pages: ${corePages.length}`);
  console.log(`  Service pages: ${servicePages.length}`);
  console.log(`  Location pages: ${locationPages.length}`);

  // ─── Write output ──────────────────────────────────────────────

  // Create directories
  const dirs = [
    join(OUTPUT_DIR, 'pages'),
    join(OUTPUT_DIR, 'services'),
    join(OUTPUT_DIR, 'posts'),
    join(OUTPUT_DIR, 'locations'),
    join(OUTPUT_DIR, 'gallery'),
  ];
  for (const dir of dirs) {
    mkdirSync(dir, { recursive: true });
  }

  // Write core pages
  for (const page of corePages) {
    const data = {
      title: page.title,
      slug: page.slug,
      content: rewriteImageUrls(page.content),
      seoTitle: page.seoTitle,
      seoDescription: page.seoDesc,
      featuredImage: page.featuredImage ? rewriteImageUrls(page.featuredImage) : null,
    };
    writeFileSync(
      join(OUTPUT_DIR, 'pages', `${page.slug}.json`),
      JSON.stringify(data, null, 2)
    );
  }
  console.log(`\nWrote ${corePages.length} core page files`);

  // Write service pages
  for (const page of servicePages) {
    const data = {
      title: page.title,
      slug: page.slug,
      content: rewriteImageUrls(page.content),
      seoTitle: page.seoTitle,
      seoDescription: page.seoDesc,
      featuredImage: page.featuredImage ? rewriteImageUrls(page.featuredImage) : null,
    };
    writeFileSync(
      join(OUTPUT_DIR, 'services', `${page.slug}.json`),
      JSON.stringify(data, null, 2)
    );
  }
  console.log(`Wrote ${servicePages.length} service page files`);

  // Write blog posts
  for (const post of posts) {
    const data = {
      title: post.title,
      slug: post.slug,
      date: post.date,
      categories: post.categories,
      content: rewriteImageUrls(post.content),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDesc,
      featuredImage: post.featuredImage ? rewriteImageUrls(post.featuredImage) : null,
      excerpt: htmlToText(post.content).substring(0, 200),
    };
    writeFileSync(
      join(OUTPUT_DIR, 'posts', `${post.slug}.json`),
      JSON.stringify(data, null, 2)
    );
  }
  console.log(`Wrote ${posts.length} blog post files`);

  // Write location pages
  for (const page of locationPages) {
    const data = {
      title: page.title,
      slug: page.slug,
      content: rewriteImageUrls(page.content),
      seoTitle: page.seoTitle,
      seoDescription: page.seoDesc,
      featuredImage: page.featuredImage ? rewriteImageUrls(page.featuredImage) : null,
    };
    writeFileSync(
      join(OUTPUT_DIR, 'locations', `${page.slug}.json`),
      JSON.stringify(data, null, 2)
    );
  }
  console.log(`Wrote ${locationPages.length} location page files`);

  // Write gallery items
  for (const item of bafgItems) {
    const data = {
      id: item.id,
      title: item.title,
      description: item.description,
      beforeImage: item.beforeImage ? rewriteImageUrls(item.beforeImage) : null,
      afterImage: item.afterImage ? rewriteImageUrls(item.afterImage) : null,
    };
    writeFileSync(
      join(OUTPUT_DIR, 'gallery', `${item.id}.json`),
      JSON.stringify(data, null, 2)
    );
  }
  console.log(`Wrote ${bafgItems.length} gallery items`);

  // Write navigation structure
  const navData = navMenuItems
    .sort((a, b) => parseInt(a.menuOrder) - parseInt(b.menuOrder))
    .map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      parentId: item.parentId,
      menuOrder: parseInt(item.menuOrder),
      objectType: item.objectType,
    }));
  writeFileSync(
    join(OUTPUT_DIR, 'navigation.json'),
    JSON.stringify(navData, null, 2)
  );
  console.log(`Wrote navigation.json`);

  // Write image URL manifest
  const imageList = [...allImageUrls].filter(url =>
    url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)
  );
  writeFileSync(
    join(OUTPUT_DIR, 'image-manifest.json'),
    JSON.stringify(imageList, null, 2)
  );
  console.log(`\nWrote image manifest with ${imageList.length} images`);

  // Write site metadata
  const siteData = {
    title: 'Sandhurst Roofing',
    description: 'Roof Restoration & Repairs - Frankston & Mornington Peninsula',
    url: 'https://sandhurstroofing.com.au',
    phone: '0448 812 800',
    address: '10 Duiker Crt, Langwarrin VIC',
    brandColor: '#7cda24',
    services: servicePages.map(p => ({ title: p.title, slug: p.slug })),
    locations: locationPages.map(p => ({ title: p.title, slug: p.slug })),
    blogCategories: [...new Set(posts.flatMap(p => p.categories))].sort(),
    postCount: posts.length,
    pageCount: pages.length,
  };
  writeFileSync(
    join(OUTPUT_DIR, 'site-data.json'),
    JSON.stringify(siteData, null, 2)
  );
  console.log(`Wrote site-data.json`);

  // ─── Download images ───────────────────────────────────────────

  if (process.argv.includes('--download-images')) {
    console.log(`\nDownloading ${imageList.length} images...`);
    let downloaded = 0;
    let failed = 0;

    for (const url of imageList) {
      const relativePath = url.replace(/https?:\/\/sandhurstroofing\.com\.au\/wp-content\/uploads\//, '');
      const destPath = join(IMAGES_DIR, relativePath);
      const destDir = join(destPath, '..');

      if (existsSync(destPath)) {
        downloaded++;
        continue;
      }

      mkdirSync(destDir, { recursive: true });

      try {
        await downloadImage(url, destPath);
        downloaded++;
        if (downloaded % 20 === 0) {
          console.log(`  Downloaded ${downloaded}/${imageList.length}...`);
        }
      } catch (err) {
        failed++;
        console.error(`  Failed: ${basename(url)} - ${err.message}`);
      }

      // Rate limit
      await new Promise(r => setTimeout(r, 100));
    }

    console.log(`\nImage download complete: ${downloaded} downloaded, ${failed} failed`);
  } else {
    console.log(`\nSkipping image download. Run with --download-images to download.`);
  }

  console.log('\nMigration complete!');
}

main().catch(console.error);
