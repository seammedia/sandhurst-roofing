/**
 * Sanitize HTML content extracted from WordPress.
 *
 * Strips Draft.js markup, Divi inline styles, empty elements,
 * converts absolute URLs to relative, and removes excessive whitespace.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  let cleaned = html;

  // Strip Draft.js attributes
  cleaned = cleaned.replace(
    /\s*data-block="[^"]*"/g,
    ""
  );
  cleaned = cleaned.replace(
    /\s*data-editor="[^"]*"/g,
    ""
  );
  cleaned = cleaned.replace(
    /\s*data-offset-key="[^"]*"/g,
    ""
  );

  // Strip DraftStyleDefault classes
  cleaned = cleaned.replace(
    /\s*class="[^"]*DraftStyleDefault[^"]*"/g,
    ""
  );

  // Strip data-pm-slice attributes (ProseMirror)
  cleaned = cleaned.replace(
    /\s*data-pm-slice="[^"]*"/g,
    ""
  );

  // Strip Divi/WordPress inline style remnants
  // Remove style attributes with text-align center (keep content meaningful)
  cleaned = cleaned.replace(
    /\s*style="text-align:\s*center;?"/g,
    ""
  );
  // Remove color styles that set white text (invisible on white bg)
  cleaned = cleaned.replace(
    /\s*style="color:\s*#ffffff;?"/g,
    ""
  );
  // Remove text-decoration styles
  cleaned = cleaned.replace(
    /\s*style="text-decoration:\s*[^"]*"/g,
    ""
  );
  // Remove general inline color styles
  cleaned = cleaned.replace(
    /\s*style="color:\s*[^"]*"/g,
    ""
  );

  // Strip qowt (Google Docs) classes
  cleaned = cleaned.replace(
    /\s*class="[^"]*(?:style-scope|qowt-|x-scope)[^"]*"/g,
    ""
  );

  // Strip empty spans: <span></span> or <span> </span>
  cleaned = cleaned.replace(/<span>\s*<\/span>/g, "");

  // Strip empty divs (including nested): <div id="..."></div>
  cleaned = cleaned.replace(
    /<div[^>]*>\s*<\/div>/g,
    ""
  );

  // Strip wrapper divs that only contain other content (contentsContainer pattern)
  cleaned = cleaned.replace(
    /<div[^>]*id="contentsContainer"[^>]*>\s*/g,
    ""
  );
  cleaned = cleaned.replace(
    /<div[^>]*id="contents"[^>]*>\s*/g,
    ""
  );
  // Clean up the closing divs left behind
  cleaned = cleaned.replace(/<\/div>\s*<\/div>/g, "");
  cleaned = cleaned.replace(/<\/div>/g, "");

  // Strip empty headings: <h2></h2>, <h2> </h2>, <h2><strong></strong></h2>
  cleaned = cleaned.replace(
    /<h([1-6])[^>]*>\s*(?:<strong>\s*<\/strong>)?\s*<\/h\1>/g,
    ""
  );

  // Strip empty paragraphs: <p></p>, <p> </p>, <p>&nbsp;</p>
  cleaned = cleaned.replace(
    /<p>\s*(?:&nbsp;|\u00a0)?\s*<\/p>/g,
    ""
  );

  // Strip standalone non-breaking space paragraphs
  cleaned = cleaned.replace(/<p> <\/p>/g, "");

  // Convert absolute sandhurstroofing.com.au URLs to relative
  cleaned = cleaned.replace(
    /https?:\/\/(?:www\.)?sandhurstroofing\.com\.au\//g,
    "/"
  );

  // Remove excessive whitespace between tags
  cleaned = cleaned.replace(/>\s{2,}</g, "> <");

  // Remove carriage returns
  cleaned = cleaned.replace(/\r/g, "");

  // Trim
  cleaned = cleaned.trim();

  return cleaned;
}
