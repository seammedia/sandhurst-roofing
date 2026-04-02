import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPage } from "@/lib/content";
import FaqAccordion from "@/components/FaqAccordion";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPage("faq");
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || "",
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

function parseFaqItems(html: string): FaqItem[] {
  const items: FaqItem[] = [];
  const faqRegex =
    /<div[^>]*class="faq-item"[^>]*>[^<]*<h3>([^<]*(?:<[^/][^>]*>[^<]*)*)<\/h3>[^<]*<div>([\s\S]*?)<\/div>[^<]*<\/div>/g;

  let match;
  while ((match = faqRegex.exec(html)) !== null) {
    const question = match[1].replace(/<[^>]*>/g, "").trim();
    const answer = match[2].replace(/<[^>]*>/g, "").trim();
    if (question && answer) {
      items.push({ question, answer });
    }
  }

  return items;
}

export default function FaqPage() {
  const page = getPage("faq");
  const faqItems = parseFaqItems(page.content);

  return (
    <main>
      <Navbar />

      <section className="bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-4xl uppercase text-white md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Get answers to common roofing questions.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faqItems} />

          {/* CTA */}
          <div className="mt-12 rounded-lg bg-gray-50 p-8 text-center">
            <h2 className="font-heading mb-2 text-2xl uppercase">
              Still Have Questions?
            </h2>
            <p className="mb-6 text-gray-600">
              Give us a call or send us a message. We are happy to help.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:0448812800"
                className="inline-flex items-center gap-2 bg-[#7cda24] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6bc11e]"
              >
                Call 0448 812 800
              </a>
              <a
                href="/contact/"
                className="inline-flex items-center gap-2 border border-gray-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-gray-800 transition-colors hover:border-[#7cda24] hover:text-[#7cda24]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
