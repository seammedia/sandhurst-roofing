// Extract FAQ question/answer pairs from a page's stored HTML so the [slug]
// template can emit FAQPage JSON-LD structured data. Returns [] when there is
// no usable FAQ section, in which case the caller skips the schema entirely.

export interface FaqItem {
  question: string;
  answer: string;
}

function decodeAndStrip(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&reg;/g, "®")
    .replace(/&(?:rsquo|#8217|#x2019);/g, "’")
    .replace(/&(?:lsquo|#8216|#x2018);/g, "‘")
    .replace(/&(?:rdquo|#8221);/g, "”")
    .replace(/&(?:ldquo|#8220);/g, "“")
    .replace(/&(?:ndash|#8211);/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&(?:#39|apos);/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFaqs(html: string): FaqItem[] {
  if (!html) return [];

  // Split the content into sections at each <h2> and find the FAQ section.
  const sections = html.split(/(?=<h2\b)/i);
  const faqSection = sections.find((s) => {
    const head = /<h2\b[^>]*>([\s\S]*?)<\/h2>/i.exec(s);
    return head
      ? /FAQ|Frequently Asked|Common Questions/i.test(decodeAndStrip(head[1]))
      : false;
  });
  if (!faqSection) return extractFaqItemBlocks(html);

  // Body of the FAQ section, after its heading.
  const body = faqSection.replace(/<h2\b[\s\S]*?<\/h2>/i, "");
  const items: FaqItem[] = [];

  // Style A (majority): <h3>Question</h3> followed by an answer in <p> or <div>
  // (some pages wrap answers as <div class="faq-item"><h3>Q</h3><div>A</div>).
  const h3re = /<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<(?:p|div)\b[^>]*>([\s\S]*?)<\/(?:p|div)>/gi;
  let m: RegExpExecArray | null;
  while ((m = h3re.exec(body)) !== null) {
    const question = decodeAndStrip(m[1]);
    const answer = decodeAndStrip(m[2]);
    if (question && answer) items.push({ question, answer });
  }

  // Style B (a few pages): <p><strong>Question?</strong><br>Answer</p>
  if (items.length === 0) {
    const pre = /<p\b[^>]*>\s*<strong>([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?([\s\S]*?)<\/p>/gi;
    while ((m = pre.exec(body)) !== null) {
      const question = decodeAndStrip(m[1]);
      const answer = decodeAndStrip(m[2]);
      if (question && answer) items.push({ question, answer });
    }
  }

  // Fallback for pages whose FAQ heading was matched but whose Q&A use the
  // <div class="faq-item"> structure that the section scan missed.
  if (items.length < 2) {
    const blocks = extractFaqItemBlocks(html);
    if (blocks.length > items.length) return blocks;
  }

  return items;
}

// Some service pages wrap each Q&A in <div class="faq-item"><h3>Q</h3>...A...>
// without an FAQ-labelled <h2>. Extract those directly, anywhere on the page.
function extractFaqItemBlocks(html: string): FaqItem[] {
  const items: FaqItem[] = [];
  const re =
    /<div\s+class="faq-item"[^>]*>\s*<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<(?:div|p)\b[^>]*>([\s\S]*?)<\/(?:div|p)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const question = decodeAndStrip(m[1]);
    const answer = decodeAndStrip(m[2]);
    if (question && answer) items.push({ question, answer });
  }
  return items;
}
